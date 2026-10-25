// Firmware package: a release .bin may carry the firmware assets (fonts, menu
// texts, QR codes) after the firmware image. The image is flashed through the
// bootloader as before; the asset pack is then written over the serial link
// into the asset zone of the firmware slot. Binary-only firmwares (older
// releases, stock, other editions) have no trailer and are returned unchanged.
//
// Layout (all little endian), built by cmake/pack_fw_assets.py:
//   [firmware image][asset pack = FWA1 header (32 B) + payload][trailer (16 B)]
//   FWA1 header: magic "FWA1", u16 version, u16 header size, u32 payload size,
//                u32 payload CRC-32, u8[16] firmware build id
//   trailer:     magic "FWAT", u32 image size, u32 pack size, u32 CRC-32 of
//                image + pack
// Pure helpers are exported for Node tests.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVStudioFirmwarePackage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const TRAILER_MAGIC = 0x54415746;   // "FWAT"
  const TRAILER_SIZE = 16;
  const PACK_MAGIC = 0x31415746;      // "FWA1"
  const PACK_VERSION = 1;
  const PACK_HEADER_SIZE = 32;
  const BUILD_ID_SIZE = 16;
  const ZONE_SIZE = 0x4000;           // 16 KiB asset zone per firmware slot
  const IMAGE_MAX = 0x1D800;          // 118 KiB application region

  // CRC-32 (zlib/PNG), the same as the firmware MB_Crc32Bytes.
  function crc32(bytes) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) {
      crc ^= bytes[i];
      for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function toHex(bytes) {
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }

  function invalid(message) {
    return Object.assign(new Error(message), { code: 'UVSTUDIO_FIRMWARE_PACKAGE_INVALID' });
  }

  // Parse and check an FWA1 asset pack (header + payload).
  function parseAssetPack(pack) {
    if (!(pack instanceof Uint8Array) || pack.length < PACK_HEADER_SIZE) {
      throw invalid('asset pack too short');
    }
    const dv = new DataView(pack.buffer, pack.byteOffset, pack.byteLength);
    if (dv.getUint32(0, true) !== PACK_MAGIC) throw invalid('bad asset pack magic');
    if (dv.getUint16(4, true) !== PACK_VERSION) throw invalid('unsupported asset pack version');
    if (dv.getUint16(6, true) !== PACK_HEADER_SIZE) throw invalid('bad asset pack header size');
    const payloadSize = dv.getUint32(8, true);
    if (payloadSize === 0 || PACK_HEADER_SIZE + payloadSize !== pack.length) {
      throw invalid('bad asset pack size');
    }
    if (pack.length > ZONE_SIZE) throw invalid('asset pack larger than its zone');
    const payloadCrc = dv.getUint32(12, true) >>> 0;
    if (crc32(pack.subarray(PACK_HEADER_SIZE)) !== payloadCrc) throw invalid('asset pack CRC mismatch');
    return {
      payloadSize,
      payloadCrc,
      buildId: toHex(pack.subarray(16, 16 + BUILD_ID_SIZE))
    };
  }

  // Split a firmware file into its image and its asset pack (null when the
  // file is a plain binary). Throws on a damaged package.
  function splitFirmwarePackage(bytes) {
    const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    if (data.length < TRAILER_SIZE) return { image: data, pack: null, info: null };
    const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
    const tail = data.length - TRAILER_SIZE;
    if (dv.getUint32(tail, true) !== TRAILER_MAGIC) return { image: data, pack: null, info: null };

    const imageSize = dv.getUint32(tail + 4, true);
    const packSize = dv.getUint32(tail + 8, true);
    if (imageSize === 0 || imageSize > IMAGE_MAX || imageSize + packSize !== tail) {
      throw invalid('bad firmware package layout');
    }
    if (crc32(data.subarray(0, tail)) !== (dv.getUint32(tail + 12, true) >>> 0)) {
      throw invalid('firmware package CRC mismatch');
    }
    const image = data.subarray(0, imageSize);
    const pack = data.subarray(imageSize, tail);
    return { image, pack, info: parseAssetPack(pack) };
  }

  return Object.freeze({
    TRAILER_MAGIC,
    TRAILER_SIZE,
    PACK_MAGIC,
    PACK_HEADER_SIZE,
    BUILD_ID_SIZE,
    ZONE_SIZE,
    IMAGE_MAX,
    crc32,
    toHex,
    parseAssetPack,
    splitFirmwarePackage
  });
});
