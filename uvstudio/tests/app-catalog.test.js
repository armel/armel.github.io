'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const catalog = require('../js/app-catalog.js');

test('discovers only semantic v-prefixed app archive directories', () => {
  const versions = catalog.listVersions([
    { type: 'dir', name: 'v6.0.0', path: 'archive/apps/v6.0.0' },
    { type: 'dir', name: 'v6.10.0', path: 'archive/apps/v6.10.0' },
    { type: 'dir', name: 'draft', path: 'archive/apps/draft' },
    { type: 'file', name: 'v7.0.0', path: 'archive/apps/v7.0.0' }
  ]);

  assert.deepEqual(versions, [
    { version: '6.10.0', directory: 'v6.10.0', path: 'archive/apps/v6.10.0' },
    { version: '6.0.0', directory: 'v6.0.0', path: 'archive/apps/v6.0.0' }
  ]);
});

test('lists app files alphabetically and ignores unrelated archive entries', () => {
  const apps = catalog.listApps([
    { type: 'file', name: 'FoxHunt.app', size: 2112, download_url: 'https://x/FoxHunt.app' },
    { type: 'file', name: 'Beacon.app', size: 1024, download_url: 'https://x/Beacon.app' },
    { type: 'file', name: 'notes.txt', size: 10, download_url: 'https://x/notes.txt' },
    { type: 'dir', name: 'Breakout.app', size: 0, download_url: null }
  ]);

  assert.deepEqual(apps.map(app => app.label), ['Beacon', 'Fox Hunt']);
  // The listing size counts header + code + assets: no size until the header is parsed.
  assert.equal(catalog.formatAppLabel(apps[0]), 'Beacon');
  assert.equal(catalog.formatAppLabel(apps[0], { codeSize: 3584, assetSize: 384 }), 'Beacon · 3.5 KB');
});

test('adds presentation metadata without changing the app binary format', () => {
  assert.deepEqual(catalog.appDetails('CWDecode.app'), {
    id: 'cwdecode',
    category: 'radio',
    description: 'Decode Morse code in real time.',
    descriptionKey: 'appDescription_cwdecode',
    author: 'armel',
    label: 'CW Decode'
  });
  assert.equal(catalog.appDetails('Tetris.app').category, 'games');
  assert.equal(catalog.appDetails('Spectrum3D.app').category, 'radio');
  assert.equal(catalog.appDetails('FoxHunt.app').category, 'radio');
  assert.equal(catalog.appDetails('EPIRB406.app').category, 'radio');
  assert.equal(catalog.appDetails('SigFinder.app').category, 'radio');
  assert.equal(catalog.appDetails('FutureApp.app').category, 'other');
  assert.equal(catalog.appDetails('FutureApp.app').author, '');
  assert.equal(catalog.appDetails('Snake.app').author, 'mrkusypl');
  assert.equal(catalog.appDetails('Minesweeper.app').author, 'Sarijen');
  assert.equal(catalog.appDetails('EPIRB406.app').author, 'jdenoy');
  assert.equal(catalog.appDetails('SigFinder.app').author, 'jdenoy');
  assert.deepEqual(catalog.appDetails('CWKeyer.app'), {
    id: 'cwkeyer',
    category: 'radio',
    description: "Morse keyer using the radio's PTT and side keys.",
    descriptionKey: 'appDescription_cwkeyer',
    author: 'armel',
    label: 'CW Keyer'
  });
  assert.deepEqual(catalog.appDetails('CWUSB.app'), {
    id: 'cwusb',
    category: 'radio',
    description: 'Morse keyer for an external paddle connected through USB-C.',
    descriptionKey: 'appDescription_cwusb',
    author: 'jdenoy',
    label: 'CW USB'
  });
  assert.deepEqual(catalog.appDetails('SondeM10.app'), {
    id: 'sondem10',
    category: 'radio',
    description: 'Decode Meteomodem M10 radiosondes: ID, position, altitude, temperature.',
    descriptionKey: 'appDescription_sondem10',
    author: 'armel',
    label: 'Sonde M10'
  });
  assert.deepEqual(catalog.appDetails('SondeRS41.app'), {
    id: 'sonders41',
    category: 'radio',
    description: 'Decode Vaisala RS41 radiosondes: ID, position, altitude, vertical speed, satellite count.',
    descriptionKey: 'appDescription_sonders41',
    author: 'armel',
    label: 'Sonde RS41'
  });
  assert.equal(catalog.appIconSVG('sonders41'), catalog.appIconSVG('sondem10'));
  assert.deepEqual(catalog.appDetails('ToneCall.app'), {
    id: 'tonecall',
    category: 'radio',
    description: 'Send configurable ZVEI or CCIR selective calling tone sequences.',
    descriptionKey: 'appDescription_tonecall',
    author: 'jdenoy',
    label: 'Tone Call'
  });
  assert.equal(catalog.appDetails('ACARSRX.app').author, 'armel');
  assert.deepEqual(catalog.appDetails('FlashMap.app'), {
    id: 'flashmap',
    category: 'tools',
    description: 'Browse the external flash map: firmware slots, apps, active state and a hex viewer.',
    descriptionKey: 'appDescription_flashmap',
    author: 'armel',
    label: 'Flash Map'
  });
  assert.equal(catalog.appDetails('APRSDIGI.app').label, 'APRS DIGI');
  assert.equal(catalog.appCatalogId('Spectrum-3D.app'), 'spectrum3d');
});

test('targets the stable versioned apps archive on GitHub', () => {
  assert.equal(
    catalog.contentsURL('archive/apps/v6.0.0'),
    'https://api.github.com/repos/armel/uv-k1-k5v3-firmware-custom/contents/archive/apps/v6.0.0?ref=main'
  );
});

test('keeps the current app catalog available when the GitHub API is unavailable', () => {
  const apps = catalog.fallbackApps();
  assert.equal(apps.length, 23);
  assert.equal(apps[0].label, 'ACARS RX');
  assert.match(apps[0].url, /raw\.githubusercontent\.com\/.*\/v6\.1\.0\/ACARSRX\.app$/);
  assert.deepEqual(catalog.fallbackApps({ version: '6.0.0', path: 'archive/apps/v6.0.0' }), []);
});

test('reads the app identity and version from a FAP1 header', () => {
  const header = Buffer.alloc(64);
  header.writeUInt32LE(0x31504146, 0);
  header.writeUInt32LE(3584, 8);
  header.write('Beacon', 20, 'ascii');
  header.write('1.4.2', 36, 'ascii');
  header.writeUInt16LE(384, 60);

  assert.deepEqual(catalog.parseAppHeader(header), {
    name: 'Beacon',
    version: '1.4.2',
    codeSize: 3584,
    assetSize: 384
  });
  assert.equal(catalog.parseAppHeader(Buffer.alloc(64)), null);
});

test('formats catalog asset sizes without rounding small assets to zero', () => {
  assert.equal(catalog.formatByteSize(240), '240 B');
  assert.equal(catalog.formatByteSize(1536), '1.5 KB');
});

test('derives catalog actions from the installed and available versions', () => {
  assert.equal(catalog.catalogAppState(null, { version: '1.2.0' }), 'install');
  assert.equal(
    catalog.catalogAppState({ version: '1.1.0' }, { version: '1.2.0' }),
    'update'
  );
  assert.equal(
    catalog.catalogAppState({ version: '1.2.0' }, { version: '1.2.0' }),
    'current'
  );
  assert.equal(
    catalog.catalogAppState({ version: '1.3.0' }, { version: '1.2.0' }),
    'current'
  );
});

test('compares app versions numerically and treats a release as newer than its prerelease', () => {
  assert.equal(catalog.compareAppVersions('0.9', '0.10'), -1);
  assert.equal(catalog.compareAppVersions('1.0-rc1', '1.0'), -1);
  assert.equal(catalog.compareAppVersions('1.0', '1.0.0'), 0);
});

test('provides dedicated SVG pictograms for every catalog app and keeps a monogram fallback', () => {
  [
    'acarsrx', 'aisrx', 'aprsdigi', 'aprsedit', 'aprsrx', 'aprstx', 'atisrx', 'beacon', 'beam', 'breakout', 'broadcastfm',
    'cwdecode', 'cwkeyer', 'cwusb', 'cube3d', 'epirb406', 'flashmap', 'foxhunt', 'hellmaze', 'minesweeper',
    'plasma', 'pocsagrx', 'rapidroll', 'resistor', 'sigfinder', 'snake', 'sokoban', 'sondem10', 'sondem20', 'sonders41', 'spaceimpact',
    'spectrum3d', 'sstv', 'systeminfo', 'tetris', 'tonecall'
  ].forEach(id => {
    assert.match(catalog.appIconSVG(id), /<(?:path|circle)/);
  });
  assert.ok(catalog.appIconSVG('cwusb').startsWith(catalog.appIconSVG('cwkeyer')));
  assert.equal(catalog.appIconSVG('futureapp'), '');
});
