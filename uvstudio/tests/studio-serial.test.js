'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadController() {
  const events = [];
  const serialListeners = new Map();
  let authorizedPorts = [];
  class CustomEvent {
    constructor(type, options = {}) {
      this.type = type;
      this.detail = options.detail;
    }
  }
  const context = {
    CustomEvent,
    clearTimeout,
    document: { documentElement: { dataset: {} } },
    navigator: {
      serial: {
        addEventListener(type, listener) { serialListeners.set(type, listener); },
        async getPorts() { return authorizedPorts; }
      }
    },
    setTimeout,
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
  return {
    controller: context.window.UVStudioSerial,
    events,
    setAuthorizedPorts(ports) { authorizedPorts = ports; },
    emitSerial(type, target) { serialListeners.get(type)?.({ target }); }
  };
}

test('hands the serial owner over only after the previous client disconnects', async () => {
  const { controller } = loadController();
  const calls = [];
  const viewer = controller.register('viewer', {
    async disconnect({ reason, nextOwner }) {
      calls.push(`viewer:${reason}:${nextOwner}`);
    }
  });
  const tools = controller.register('tools', {
    async disconnect({ reason }) {
      calls.push(`tools:${reason}`);
    }
  });

  await viewer.acquire();
  const runtimePort = {};
  viewer.rememberPort(runtimePort);
  viewer.setState('connected');
  await tools.acquire();

  assert.deepEqual(calls, ['viewer:handoff:tools']);
  assert.equal(controller.getSnapshot().owner, 'tools');
  assert.equal(controller.getSnapshot().state, 'connecting');
  assert.equal(tools.getReusablePort(), runtimePort);
});

test('identifies the next owner during a navigation handoff', async () => {
  const { controller, events } = loadController();
  let transition = null;
  const tools = controller.register('tools', {
    async disconnect(context) { transition = context; }
  });

  await tools.acquire();
  tools.setState('connected');
  await controller.releaseFor('viewer');

  assert.deepEqual(
    JSON.parse(JSON.stringify(transition)),
    { nextOwner: 'viewer', reason: 'navigation', previousOwner: 'tools' }
  );
  const finalEvent = events.at(-1);
  assert.equal(finalEvent.detail.state, 'disconnected');
  assert.equal(finalEvent.detail.nextOwner, 'viewer');
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

test('global disconnect releases whichever client holds the port', async () => {
  const { controller } = loadController();
  const calls = [];
  const tools = controller.register('tools', {
    async disconnect({ reason }) { calls.push(`tools:${reason}`); }
  });

  await tools.acquire();
  tools.rememberPort({});
  tools.setState('connected');
  await controller.releaseCurrent('user');

  assert.deepEqual(calls, ['tools:user']);
  assert.equal(controller.getSnapshot().owner, null);
  assert.equal(controller.getSnapshot().state, 'disconnected');
  assert.equal(tools.getReusablePort(), null);
});

test('keeps the runtime port available across navigation and DFU operations', async () => {
  const { controller } = loadController();
  const runtimePort = {};
  const tools = controller.register('tools', { async disconnect() {} });

  await tools.acquire();
  tools.rememberPort(runtimePort);
  tools.setState('connected');
  await controller.releaseFor(null);

  assert.equal(tools.getReusablePort(), runtimePort);
  await tools.acquire();
  await tools.release('operation-complete');
  assert.equal(tools.getReusablePort(), runtimePort);
});

test('global disconnect is refused while an operation is active', async () => {
  const { controller } = loadController();
  let disconnected = false;
  const tools = controller.register('tools', {
    async disconnect() { disconnected = true; }
  });

  await tools.acquire();
  tools.setState('connected');
  const token = tools.beginOperation('restore-flash', { critical: true });
  await controller.releaseCurrent('user');

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

test('shares port matching and retry orchestration between serial clients', async () => {
  const { controller, setAuthorizedPorts } = loadController();
  const matching = { getInfo: () => ({ usbVendorId: 0x1209, usbProductId: 0x0001 }) };
  const other = { getInfo: () => ({ usbVendorId: 0x1209, usbProductId: 0x0002 }) };
  const attempts = [];
  setAuthorizedPorts([other, matching]);

  const reconnect = controller.createReconnectManager({
    retryDelayMs: 1,
    canAttempt: () => true,
    async reconnect(port) {
      attempts.push(port);
      return true;
    }
  });
  reconnect.start({ usbVendorId: 0x1209, usbProductId: 0x0001 });
  await new Promise(resolve => setTimeout(resolve, 15));

  assert.deepEqual(attempts, [matching]);
  assert.equal(reconnect.isActive(), false);
  assert.equal(controller.portMatchesInfo(matching, matching.getInfo()), true);
  assert.equal(controller.portMatchesInfo(other, matching.getInfo()), false);
});

test('discards a pending reconnect attempt when the expected radio changes', async () => {
  const { controller } = loadController();
  const first = { getInfo: () => ({ usbVendorId: 0x1209, usbProductId: 0x0001 }) };
  const attempts = [];
  const reconnect = controller.createReconnectManager({
    retryDelayMs: 5,
    canAttempt: () => true,
    async reconnect(port) {
      attempts.push(port);
      return true;
    }
  });

  reconnect.start(first.getInfo());
  const pending = reconnect.tryPort(first);
  reconnect.start({ usbVendorId: 0x1209, usbProductId: 0x0002 });
  assert.equal(await pending, false);
  reconnect.stop({ forgetPortInfo: true });

  assert.deepEqual(attempts, []);
});
