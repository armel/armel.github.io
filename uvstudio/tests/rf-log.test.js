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
}

test('shares status, live-row and history parsing with K5Viewer', () => {
  const payload = new Uint8Array(rf.PACKET_SIZE);
  payload[0] = 2;
  payload[1] = rf.STATUS_ACTIVE | rf.STATUS_HAS_TRAFFIC;
  payload[2] = 1;
  writeRow(payload, 4, { frequency: 14550000, sequence: 100 });
  writeRow(payload, 29, { frequency: 43350000, sequence: 99 });

  const packet = rf.parseMainPacket(payload);
  assert.equal(packet.active, true);
  assert.equal(packet.clearing, false);
  assert.equal(packet.liveRow.trafficSeq, 100);
  assert.equal(packet.rows[0].sequence, 99);
  assert.equal(packet.rows[0].trafficSeq, 99);
});

test('keeps session markers without consuming the 512-traffic window', () => {
  const rows = [];
  for (let sequence = 1; sequence <= 520; sequence++) {
    rows.push({ frequency: 14500000, sequence, flags: 0 });
  }
  rows.push({ frequency: 0, sequence: 8.5, flags: rf.FLAG_SESSION });
  rows.push({ frequency: 0, sequence: 9.5, flags: rf.FLAG_SESSION });

  const visible = rf.limitVisibleRows(rows);
  assert.equal(visible.filter(row => (row.flags & rf.FLAG_SESSION) === 0).length, 512);
  assert.equal(visible.some(row => row.sequence === 8.5), false);
  assert.equal(visible.some(row => row.sequence === 9.5), true);
});

test('preserves power-on markers when no traffic has been recorded yet', () => {
  const marker = { frequency: 0, sequence: 7, flags: rf.FLAG_SESSION };
  assert.deepEqual(rf.limitVisibleRows([marker]), [marker]);
});
