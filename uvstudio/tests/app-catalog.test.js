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
  assert.equal(catalog.formatAppLabel(apps[0]), 'Beacon · 1.0 KB');
});

test('adds presentation metadata without changing the app binary format', () => {
  assert.deepEqual(catalog.appDetails('CWDecode.app'), {
    id: 'cwdecode',
    category: 'radio',
    description: 'Decode Morse code in real time.',
    descriptionFr: 'Décodage du Morse en temps réel.',
    label: 'CW Decode'
  });
  assert.equal(catalog.appDetails('Tetris.app').category, 'games');
  assert.equal(catalog.appDetails('Spectrum3D.app').category, 'radio');
  assert.equal(catalog.appDetails('FoxHunt.app').category, 'radio');
  assert.equal(catalog.appDetails('EPIRB406.app').category, 'radio');
  assert.equal(catalog.appDetails('SigFinder.app').category, 'radio');
  assert.equal(catalog.appDetails('FutureApp.app').category, 'other');
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
  assert.equal(apps.length, 21);
  assert.equal(apps[0].label, 'APRS RX');
  assert.match(apps[0].url, /raw\.githubusercontent\.com\/.*\/v6\.1\.0\/APRSRX\.app$/);
  assert.deepEqual(catalog.fallbackApps({ version: '6.0.0', path: 'archive/apps/v6.0.0' }), []);
});

test('reads the app identity and version from a FAP1 header', () => {
  const header = Buffer.alloc(64);
  header.writeUInt32LE(0x31504146, 0);
  header.write('Beacon', 20, 'ascii');
  header.write('1.4.2', 36, 'ascii');

  assert.deepEqual(catalog.parseAppHeader(header), {
    name: 'Beacon',
    version: '1.4.2'
  });
  assert.equal(catalog.parseAppHeader(Buffer.alloc(64)), null);
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
    'aprsrx', 'aprstx', 'beacon', 'beam', 'breakout', 'broadcastfm',
    'cwdecode', 'cwkeyer', 'cube3d', 'epirb406', 'foxhunt', 'minesweeper',
    'plasma', 'rapidroll', 'sigfinder', 'snake', 'spaceimpact', 'spectrum3d',
    'sstv', 'systeminfo', 'tetris'
  ].forEach(id => {
    assert.match(catalog.appIconSVG(id), /<(?:path|circle)/);
  });
  assert.equal(catalog.appIconSVG('futureapp'), '');
});
