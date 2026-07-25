'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const rf = require('../js/rf-log.js');

function writeRow(target, offset, row) {
  const view = new DataView(target.buffer, target.byteOffset, target.byteLength);
  view.setUint32(offset, row.frequency ?? 0, true);
  view.setUint32(offset + 4, row.sequence ?? 0, true);
  view.setUint16(offset + 8, row.durationSeconds ?? 0, true);
  view.setUint16(offset + 10, row.channel ?? 0xFFFF, true);
  view.setUint8(offset + 12, row.flags ?? 0);
  view.setUint8(offset + 13, row.meter ?? 0xFF);
  view.setUint8(offset + 14, row.battVolt ?? 0xFF);
  const name = Buffer.from(row.channelName ?? '', 'ascii');
  target.set(name.subarray(0, 10), offset + 15);
}

function viewerFrame(type, payload) {
  const frame = new Uint8Array(5 + payload.length + 1);
  frame.set([0xAA, 0x55, type, payload.length >> 8, payload.length & 0xFF]);
  frame.set(payload, 5);
  frame[frame.length - 1] = 0x0A;
  return frame;
}

test('extracts chunked viewer frames while discarding unrelated bytes', () => {
  const payload = new Uint8Array([1, 2, 3]);
  const encoded = viewerFrame(rf.TYPE_RF_LOG_HISTORY, payload);
  const buffer = [0xF0, 0x00, ...encoded.subarray(0, 4)];

  assert.equal(rf.takeViewerFrame(buffer), null);
  buffer.push(...encoded.subarray(4));

  const frame = rf.takeViewerFrame(buffer);
  assert.equal(frame.type, rf.TYPE_RF_LOG_HISTORY);
  assert.deepEqual(Array.from(frame.payload), [1, 2, 3]);
  assert.equal(buffer.length, 0);
});

test('parses persisted rows from the main packet and skips the live row', () => {
  const payload = new Uint8Array(rf.PACKET_SIZE);
  payload[0] = 2;
  payload[1] = 2;
  payload[2] = 2;
  writeRow(payload, 4, { frequency: 14550000, sequence: 99 });
  writeRow(payload, 29, {
    frequency: 14552500,
    sequence: 42,
    durationSeconds: 75,
    channel: 0,
    flags: 0,
    meter: 9,
    battVolt: 142,
    channelName: 'REPEATER'
  });
  writeRow(payload, 54, { sequence: 41, flags: 8 });

  const packet = rf.parseMainPacket(payload);
  assert.equal(packet.hasTraffic, true);
  assert.equal(packet.rows.length, 2);
  assert.equal(packet.rows[0].sequence, 42);
  assert.equal(packet.rows[0].channelName, 'REPEATER');
  assert.equal(packet.rows[1].flags, 8);
});

test('recognizes disabled status packets and builds the feature keepalive', () => {
  const packet = rf.parseMainPacket(new Uint8Array([2, 8, 0, 0]));
  assert.equal(packet.disabled, true);
  assert.equal(packet.full, false);
  assert.deepEqual(Array.from(rf.featureKeepalive(true)), [0x55, 0xAA, 0x05, 0x83]);
  assert.deepEqual(Array.from(rf.featureKeepalive(false)), [0x55, 0xAA, 0x05, 0x03]);
});

test('CSV is chronological, Excel-safe, and preserves RF units', () => {
  const rows = [
    {
      frequency: 43350000,
      sequence: 11,
      durationSeconds: 3,
      channel: 4,
      flags: 1,
      meter: 7,
      battVolt: 130,
      channelName: '=CALL'
    },
    {
      frequency: 0,
      sequence: 10,
      durationSeconds: 0,
      channel: 0xFFFF,
      flags: 8,
      meter: 0xFF,
      battVolt: 0xFF,
      channelName: ''
    }
  ];

  const csv = rf.rowsToCsv(rows);
  assert.equal(csv.charCodeAt(0), 0xFEFF);
  const lines = csv.slice(1).trim().split('\r\n');
  assert.match(lines[1], /^10,POWER_ON,/);
  assert.match(lines[2], /^11,TX,433\.50000,43350000,3,5,'=CALL,HIGH,7\.30$/);
  assert.equal(lines[0], 'sequence,event,frequency_mhz,frequency_10hz,duration_seconds,channel,channel_name,signal_or_power,battery_volts');
});

test('visible window retains 512 traffic rows and only in-window markers', () => {
  const rows = [];
  for (let sequence = 1; sequence <= 520; sequence++) {
    rows.push({
      frequency: 14500000,
      sequence,
      durationSeconds: 1,
      channel: 0xFFFF,
      flags: 0,
      meter: 1,
      battVolt: 100,
      channelName: ''
    });
  }
  rows.push({ frequency: 0, sequence: 8.5, flags: 8 });
  rows.push({ frequency: 0, sequence: 9.5, flags: 8 });

  const visible = rf.limitVisibleRows(rows);
  const traffic = visible.filter(row => (row.flags & rf.FLAG_SESSION) === 0);
  assert.equal(traffic.length, 512);
  assert.equal(visible.some(row => row.sequence === 8.5), false);
  assert.equal(visible.some(row => row.sequence === 9.5), true);
});
