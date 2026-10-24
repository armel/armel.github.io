'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'js', 'runtime-protocol.js'),
  'utf8'
);

function loadProtocol() {
  const context = { window: {} };
  vm.runInNewContext(source, context);
  return context.window.UVStudioRuntimeProtocol;
}

function makeFirmwareReply(protocol, messageType, data) {
  const packet = protocol.createPacket(messageType, data);
  const messageLength = packet[2] | (packet[3] << 8);
  const crcOffset = 4 + messageLength;
  const obfuscation = [
    0x16, 0x6c, 0x14, 0xe6, 0x2e, 0x91, 0x0d, 0x40,
    0x21, 0x35, 0xd5, 0x40, 0x13, 0x03, 0xe9, 0x80
  ];
  packet[crcOffset] = obfuscation[messageLength % 16] ^ 0xff;
  packet[crcOffset + 1] = obfuscation[(messageLength + 1) % 16] ^ 0xff;
  return packet;
}

test('frames and parses runtime commands', () => {
  const protocol = loadProtocol();
  const data = Uint8Array.of(0x78, 0x56, 0x34, 0x12);
  const packet = protocol.createPacket(0x0514, data);

  assert.deepEqual(Array.from(packet.slice(0, 4)), [0xab, 0xcd, 0x08, 0x00]);
  const parsed = protocol.parsePacketAt(packet, 0, packet.length);
  assert.equal(parsed.consumed, packet.length);
  assert.equal(parsed.message.type, 0x0514);
  assert.deepEqual(Array.from(parsed.message.data), Array.from(data));
});

test('waits for a complete runtime packet', () => {
  const protocol = loadProtocol();
  const packet = protocol.createPacket(0x0730, Uint8Array.of(0));

  const parsed = protocol.parsePacketAt(packet, 0, packet.length - 1);
  assert.equal(parsed.incomplete, true);
  assert.equal(parsed.consumed, 0);
});

test('accepts the firmware reply marker in place of a calculated CRC', () => {
  const protocol = loadProtocol();
  const data = Uint8Array.from(Buffer.from('F4HWN v7.0.0\0', 'ascii'));
  const packet = makeFirmwareReply(protocol, 0x0515, data);

  const parsed = protocol.parsePacketAt(packet, 0, packet.length);
  assert.equal(parsed.message.type, 0x0515);
  assert.deepEqual(Array.from(parsed.message.data), Array.from(data));
});

test('rejects a runtime packet with a damaged payload', () => {
  const protocol = loadProtocol();
  const packet = protocol.createPacket(0x0738, new Uint8Array(10));
  packet[8] ^= 0x01;

  const parsed = protocol.parsePacketAt(packet, 0, packet.length);
  assert.equal(parsed.invalid, true);
  assert.equal(parsed.consumed, packet.length);
});
