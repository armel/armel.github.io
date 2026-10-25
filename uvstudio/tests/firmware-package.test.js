'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const zlib = require('node:zlib');

const pkg = require('../js/firmware-package.js');

function u32(value) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(value >>> 0);
  return b;
}

// Same layout as cmake/pack_fw_assets.py in the firmware repository.
function buildPackage(image, payload, buildId = Buffer.alloc(16, 0xA5)) {
  const header = Buffer.alloc(32);
  header.writeUInt32LE(pkg.PACK_MAGIC, 0);
  header.writeUInt16LE(1, 4);
  header.writeUInt16LE(32, 6);
  header.writeUInt32LE(payload.length, 8);
  header.writeUInt32LE(zlib.crc32(payload), 12);
  buildId.copy(header, 16);
  const pack = Buffer.concat([header, payload]);
  const body = Buffer.concat([image, pack]);
  const trailer = Buffer.concat([u32(pkg.TRAILER_MAGIC), u32(image.length), u32(pack.length), u32(zlib.crc32(body))]);
  return new Uint8Array(Buffer.concat([body, trailer]));
}

test('matches the zlib CRC-32 used by the firmware', () => {
  const data = Buffer.from('UV Studio firmware assets');
  assert.equal(pkg.crc32(new Uint8Array(data)), zlib.crc32(data));
});

test('returns a plain binary unchanged', () => {
  const image = new Uint8Array(1000).fill(0x42);
  const result = pkg.splitFirmwarePackage(image);
  assert.equal(result.pack, null);
  assert.equal(result.image.length, 1000);
});

test('splits a firmware package into image and asset pack', () => {
  const image = Buffer.alloc(110000, 0x11);
  const payload = Buffer.alloc(5600, 0x22);
  const result = pkg.splitFirmwarePackage(buildPackage(image, payload));
  assert.equal(result.image.length, image.length);
  assert.equal(result.pack.length, 32 + payload.length);
  assert.equal(result.info.payloadSize, payload.length);
  assert.equal(result.info.buildId, 'a5'.repeat(16));
  assert.equal(result.pack[0], 0x46); // "F" of FWA1
});

test('rejects a damaged package instead of flashing it as a binary', () => {
  const bytes = buildPackage(Buffer.alloc(4096, 1), Buffer.alloc(512, 2));
  bytes[100] ^= 0xFF;
  assert.throws(() => pkg.splitFirmwarePackage(bytes), { code: 'UVSTUDIO_FIRMWARE_PACKAGE_INVALID' });
});

test('rejects an asset pack larger than its 16 KiB zone', () => {
  const bytes = buildPackage(Buffer.alloc(4096, 1), Buffer.alloc(pkg.ZONE_SIZE, 2));
  assert.throws(() => pkg.splitFirmwarePackage(bytes), /zone/);
});
