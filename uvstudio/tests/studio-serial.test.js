'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadController() {
  const events = [];
  class CustomEvent {
    constructor(type, options = {}) {
      this.type = type;
      this.detail = options.detail;
    }
  }
  const context = {
    CustomEvent,
    document: { documentElement: { dataset: {} } },
    window: {
      dispatchEvent(event) {
        events.push(event);
      }
    }
  };
  const source = fs.readFileSync(
    path.join(__dirname, '..', 'js', 'studio-serial.js'),
    'utf8'
  );
  vm.runInNewContext(source, context);
  return { controller: context.window.UVStudioSerial, events };
}

test('hands the serial owner over only after the previous client disconnects', async () => {
  const { controller } = loadController();
  const calls = [];
  const viewer = controller.register('viewer', {
    async disconnect({ reason }) {
      calls.push(`viewer:${reason}`);
    }
  });
  const tools = controller.register('tools', {
    async disconnect({ reason }) {
      calls.push(`tools:${reason}`);
    }
  });

  await viewer.acquire();
  viewer.setState('connected');
  await tools.acquire();

  assert.deepEqual(calls, ['viewer:handoff']);
  assert.equal(controller.getSnapshot().owner, 'tools');
  assert.equal(controller.getSnapshot().state, 'connecting');
});

test('allows only one operation and exposes its critical state to navigation', () => {
  const { controller } = loadController();
  const tools = controller.register('tools');

  const token = tools.beginOperation('flash-firmware', { critical: true });
  assert.ok(token);
  assert.equal(tools.beginOperation('dump-calibration'), null);
  assert.equal(controller.isNavigationBlocked(), true);
  assert.deepEqual(
    JSON.parse(JSON.stringify(controller.getSnapshot().operation)),
    { owner: 'tools', name: 'flash-firmware', critical: true }
  );

  assert.equal(tools.endOperation(token), true);
  assert.equal(controller.isNavigationBlocked(), false);
  assert.equal(controller.getSnapshot().operation, null);
});

test('does not hand the port to another client while an operation is active', async () => {
  const { controller } = loadController();
  let disconnected = false;
  const tools = controller.register('tools', {
    async disconnect() { disconnected = true; }
  });
  const viewer = controller.register('viewer');

  await tools.acquire();
  const token = tools.beginOperation('restore-calibration', { critical: true });
  await controller.releaseFor('viewer');
  await viewer.acquire();

  assert.equal(disconnected, false);
  assert.equal(controller.getSnapshot().owner, 'tools');
  tools.endOperation(token);
});

test('ignores an operation token that does not own the active operation', () => {
  const { controller } = loadController();
  const tools = controller.register('tools');
  const token = tools.beginOperation('export-rf-log');

  assert.equal(tools.endOperation({ id: token.id, owner: token.owner }), false);
  assert.equal(controller.isNavigationBlocked(), true);
  assert.equal(tools.endOperation(token), true);
});

test('closes streams in order and always releases both locks', async () => {
  const { controller } = loadController();
  const calls = [];
  const error = await controller.closeResources({
    reader: {
      async cancel() { calls.push('reader.cancel'); },
      releaseLock() { calls.push('reader.releaseLock'); }
    },
    writer: {
      async close() { calls.push('writer.close'); },
      releaseLock() { calls.push('writer.releaseLock'); }
    },
    port: {
      async close() { calls.push('port.close'); }
    }
  });

  assert.equal(error, null);
  assert.deepEqual(calls, [
    'reader.cancel',
    'reader.releaseLock',
    'writer.close',
    'writer.releaseLock',
    'port.close'
  ]);
});

test('still releases locks and closes the port after stream errors', async () => {
  const { controller } = loadController();
  const calls = [];
  const expected = new Error('cancel failed');
  const error = await controller.closeResources({
    reader: {
      async cancel() { calls.push('reader.cancel'); throw expected; },
      releaseLock() { calls.push('reader.releaseLock'); }
    },
    writer: {
      async close() { calls.push('writer.close'); throw new Error('close failed'); },
      releaseLock() { calls.push('writer.releaseLock'); }
    },
    port: {
      async close() { calls.push('port.close'); }
    }
  });

  assert.equal(error, expected);
  assert.deepEqual(calls, [
    'reader.cancel',
    'reader.releaseLock',
    'writer.close',
    'writer.releaseLock',
    'port.close'
  ]);
});
