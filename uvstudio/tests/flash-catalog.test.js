'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const catalog = require('../js/flash-catalog.js');
const {
  parseFirmwareName,
  compareVersionDesc,
  categorize,
  formatOptionLabel,
  isOffered,
  mergeCatalogFiles
} = catalog;

// Real filenames from armel/uv-k1-k5v3-firmware-custom/archive.
const SAMPLE = [
  { name: 'f4hwn.fusion.development.bin', size: 104000, download_url: 'https://x/f4hwn.fusion.development.bin' },
  { name: 'f4hwn.fusion.v5.7.0.bin', size: 85708, download_url: 'https://x/f4hwn.fusion.v5.7.0.bin' },
  { name: 'f4hwn.fusion.v5.7.0.sa818.bin', size: 85708, download_url: 'https://x/f4hwn.fusion.v5.7.0.sa818.bin' },
  { name: 'f4hwn.fusion.v5.0.1.beta.bin', size: 84304, download_url: 'https://x/f4hwn.fusion.v5.0.1.beta.bin' },
  { name: 'f4hwn.fusion.v5.10.0.bin', size: 86000, download_url: 'https://x/f4hwn.fusion.v5.10.0.bin' },
  { name: 'f4hwn.k1.fusion.v4.3.2.bin', size: 84000, download_url: 'https://x/f4hwn.k1.fusion.v4.3.2.bin' },
  { name: 'f4hwn.k5v3.fusion.v4.3.bin', size: 84000, download_url: 'https://x/f4hwn.k5v3.fusion.v4.3.bin' },
  { name: 'quansheng.k1.stock.firmware.v7.03.01.bin', size: 62000, download_url: 'https://x/quansheng.k1.stock.firmware.v7.03.01.bin' },
  { name: 'quansheng.k5v3.stock.firmware.v7.00.11.bin', size: 62000, download_url: 'https://x/quansheng.k5v3.stock.firmware.v7.00.11.bin' },
  { name: 'f4hwn.logo.v1.png', size: 1024, download_url: 'https://x/f4hwn.logo.v1.png' },
  { name: 'quansheng.stock.logo.png', size: 1024, download_url: 'https://x/quansheng.stock.logo.png' }
];

test('ignores non-firmware assets such as boot logos', () => {
  assert.equal(parseFirmwareName('f4hwn.logo.v1.png'), null);
  assert.equal(parseFirmwareName('quansheng.stock.logo.png'), null);
  assert.equal(parseFirmwareName(null), null);
});

test('classifies the general Fusion line and its variants', () => {
  assert.deepEqual(parseFirmwareName('f4hwn.fusion.v5.7.0.bin'), {
    name: 'f4hwn.fusion.v5.7.0.bin', brand: 'f4hwn', group: 'fusion', model: '',
    version: '5.7.0', isBeta: false, isSa818: false, isDevelopment: false
  });
  assert.equal(parseFirmwareName('f4hwn.fusion.v5.0.1.beta.bin').isBeta, true);
  assert.equal(parseFirmwareName('f4hwn.fusion.v5.7.0.sa818.bin').isSa818, true);
});

test('recognizes only the rolling Fusion development filename', () => {
  const development = parseFirmwareName('f4hwn.fusion.development.bin');
  assert.equal(development.group, 'development');
  assert.equal(development.isDevelopment, true);
  assert.equal(development.version, '');
  assert.equal(parseFirmwareName('f4hwn.fusion.preview.bin').isDevelopment, false);
});

test('takes the rolling build only from the development branch response', () => {
  const staleMain = {
    name: 'f4hwn.fusion.development.bin',
    size: 100000,
    download_url: 'https://x/main/development.bin'
  };
  const currentDevelopment = {
    name: 'f4hwn.fusion.development.bin',
    size: 104000,
    download_url: 'https://x/feature_update_v5/development.bin'
  };
  const stable = SAMPLE.filter(item => item.name !== staleMain.name);
  const merged = mergeCatalogFiles([...stable, staleMain], currentDevelopment);
  const development = merged.filter(item => item.name === staleMain.name);

  assert.equal(development.length, 1);
  assert.equal(development[0].download_url, currentDevelopment.download_url);
});

test('routes model-specific and stock firmwares to their groups', () => {
  assert.equal(parseFirmwareName('f4hwn.k1.fusion.v4.3.2.bin').group, 'fusion_k1');
  assert.equal(parseFirmwareName('f4hwn.k1.fusion.v4.3.2.bin').model, 'K1');
  assert.equal(parseFirmwareName('f4hwn.k5v3.fusion.v4.3.bin').group, 'fusion_k5v3');
  const stock = parseFirmwareName('quansheng.k1.stock.firmware.v7.03.01.bin');
  assert.equal(stock.group, 'stock');
  assert.equal(stock.brand, 'stock');
  assert.equal(stock.model, 'K1');
});

test('sorts versions numerically, not alphabetically', () => {
  assert.ok(compareVersionDesc('5.10.0', '5.9.0') < 0);  // 5.10 is newer
  assert.ok(compareVersionDesc('5.9.0', '5.10.0') > 0);
  assert.equal(compareVersionDesc('4.3', '4.3.0'), 0);
});

test('offers only current stable builds: v5+ without beta or SA818', () => {
  assert.equal(isOffered(parseFirmwareName('f4hwn.fusion.development.bin')), true);
  assert.equal(isOffered(parseFirmwareName('f4hwn.fusion.v5.7.0.bin')), true);
  assert.equal(isOffered(parseFirmwareName('quansheng.k1.stock.firmware.v7.03.01.bin')), true);
  assert.equal(isOffered(parseFirmwareName('f4hwn.fusion.v5.0.1.beta.bin')), false); // beta
  assert.equal(isOffered(parseFirmwareName('f4hwn.fusion.v5.7.0.sa818.bin')), false); // SA818
  assert.equal(isOffered(parseFirmwareName('f4hwn.k1.fusion.v4.3.2.bin')), false); // legacy < 5
});

test('groups offered entries newest-first and drops everything else', () => {
  const groups = categorize(SAMPLE);
  assert.deepEqual([...groups.keys()], ['fusion', 'development', 'fusion_k1', 'fusion_k5v3', 'stock']);

  assert.deepEqual(groups.get('development').map(e => e.name), ['f4hwn.fusion.development.bin']);
  const fusion = groups.get('fusion');
  // Newest first: v5.10.0 must precede v5.7.0 despite the string order.
  assert.equal(fusion[0].version, '5.10.0');
  // Only stable v5+ remain: v5.10.0 and v5.7.0 (beta, sa818 and legacy dropped).
  assert.deepEqual(fusion.map(e => e.version), ['5.10.0', '5.7.0']);
  // Legacy v4.3 model-specific lines are filtered out entirely.
  assert.equal(groups.get('fusion_k1').length, 0);
  assert.equal(groups.get('fusion_k5v3').length, 0);
  assert.equal(groups.get('stock').length, 2);
});

test('formats compact, human option labels', () => {
  const development = parseFirmwareName('f4hwn.fusion.development.bin');
  development.size = 104000;
  assert.match(formatOptionLabel(development), /^⚠ Development · unstable · \d+ KB$/);

  const fusion = { group: 'fusion', model: '', version: '5.7.0', size: 59542 };
  assert.match(formatOptionLabel(fusion), /^v5\.7\.0 · \d+ KB$/);

  const stock = { group: 'stock', model: 'K1', version: '7.03.01', size: 62000 };
  assert.match(formatOptionLabel(stock), /^K1 v7\.03\.01 · \d+ KB$/);
});
