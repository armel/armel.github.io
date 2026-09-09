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

test('targets the stable versioned apps archive on GitHub', () => {
  assert.equal(
    catalog.contentsURL('archive/apps/v6.0.0'),
    'https://api.github.com/repos/armel/uv-k1-k5v3-firmware-custom/contents/archive/apps/v6.0.0?ref=main'
  );
});
