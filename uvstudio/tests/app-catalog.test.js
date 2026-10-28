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
  assert.deepEqual(catalog.appDetails('CWMem.app'), {
    id: 'cwmem',
    category: 'radio',
    description: 'Send reusable Morse messages from CW Keyer or CW USB.',
    descriptionKey: 'appDescription_cwmem',
    author: 'jdenoy',
    label: 'CW Mem'
  });
  assert.deepEqual(catalog.appDetails('CWMemEdit.app'), {
    id: 'cwmemedit',
    category: 'radio',
    description: 'Edit the callsign and custom messages used by CW Mem.',
    descriptionKey: 'appDescription_cwmemedit',
    author: 'jdenoy',
    label: 'CW Mem Edit'
  });
  assert.deepEqual(catalog.appDetails('CWTrainer.app'), {
    id: 'cwtrainer',
    category: 'radio',
    description: 'Learn and practice Morse code: free keying with live decoding, copy drills and listen-and-repeat exercises.',
    descriptionKey: 'appDescription_cwtrainer',
    author: 'lemiller-dev',
    label: 'CW Trainer'
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
  assert.deepEqual(catalog.appDetails('SondeMRZ.app'), {
    id: 'sondemrz',
    category: 'radio',
    description: 'Decode MRZ-N1 / MP3-H1 radiosondes: ID, position, altitude, temperature, humidity, speed and heading.',
    descriptionKey: 'appDescription_sondemrz',
    author: 'armel',
    label: 'Sonde MRZ'
  });
  assert.deepEqual(catalog.appDetails('SondeRS41.app'), {
    id: 'sonders41',
    category: 'radio',
    description: 'Decode Vaisala RS41 radiosondes: ID, position, altitude, vertical speed, satellite count.',
    descriptionKey: 'appDescription_sonders41',
    author: 'armel',
    label: 'Sonde RS41'
  });
  assert.equal(catalog.appIconSVG('sondemrz'), catalog.appIconSVG('sondem10'));
  assert.equal(catalog.appIconSVG('sonders41'), catalog.appIconSVG('sondem10'));
  assert.deepEqual(catalog.appDetails('ToneCall.app'), {
    id: 'tonecall',
    category: 'radio',
    description: 'Send configurable ZVEI or CCIR selective calling tone sequences.',
    descriptionKey: 'appDescription_tonecall',
    author: 'jdenoy',
    label: 'Tone Call'
  });
  assert.deepEqual(catalog.appDetails('ATISDSCRX.app'), {
    id: 'atisdscrx',
    category: 'radio',
    description: 'Receive marine DSC calls on channel 70: distress, urgency, sender and position.',
    descriptionKey: 'appDescription_atisdscrx',
    author: 'jdenoy',
    label: 'ATIS DSC RX'
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
  assert.deepEqual(catalog.appDetails('GeoNav.app'), {
    id: 'geonav',
    category: 'tools',
    description: 'Azimuth, distance and elevation from the APRS position to a radiosonde, opened from Sonde M10, M20, MRZ or RS41.',
    descriptionKey: 'appDescription_geonav',
    author: 'armel'
  });
  assert.deepEqual(catalog.appDetails('QRMap.app'), {
    id: 'qrmap',
    category: 'tools',
    description: 'Show a position received from another app as a QR code that a phone can scan to open it on a map.',
    descriptionKey: 'appDescription_qrmap',
    author: 'jdenoy',
    label: 'QR Map'
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
    'acarsrx', 'aisrx', 'aprsdigi', 'aprsedit', 'aprsrx', 'aprstx', 'atisdscrx', 'atisrx', 'beacon', 'beam', 'breakout', 'broadcastfm',
    'cwdecode', 'cwkeyer', 'cwmem', 'cwmemedit', 'cwtrainer', 'cwusb', 'cube3d', 'epirb406', 'flashmap', 'foxhunt', 'hellmaze', 'minesweeper',
    'plasma', 'pocsagrx', 'qrmap', 'rapidroll', 'resistor', 'sigfinder', 'snake', 'sokoban', 'sondem10', 'sondem20', 'sondemrz', 'sonders41', 'spaceimpact',
    'spectrum3d', 'sstv', 'systeminfo', 'tetris', 'tonecall'
  ].forEach(id => {
    assert.match(catalog.appIconSVG(id), /<(?:path|circle)/);
  });
  assert.ok(catalog.appIconSVG('cwusb').startsWith(catalog.appIconSVG('cwkeyer')));
  assert.equal(catalog.appIconSVG('futureapp'), '');
});

test('decodes the raw catalog screens and draws their lit pixels', () => {
  require('../js/app-screens.js');
  const ids = Object.keys(globalThis.UVStudioAppScreens);
  assert.ok(ids.length > 40);
  ids.forEach(id => {
    const frame = catalog.appScreenFrame(id);
    assert.equal(frame.length, 1024, id);
    assert.ok(frame.some(byte => byte), `${id} is blank`);
  });
  ['foxhunt', 'geonav', 'breakout', 'systeminfo', 'sigfinder', 'broadcastfm', 'beam'].forEach(id => {
    assert.ok(ids.includes(id), id);
  });
  // No picture: the card keeps its footprint with the app icon.
  assert.equal(catalog.appScreenFrame('futureapp'), null);

  // Bit 2 of byte 3 of page 1 is the pixel (3, 10): the Live Viewer pixel
  // view, 6 x 7 cells drawn 5 x 6, unlit pixels at 5 % of the ink.
  const frame = new Uint8Array(1024);
  frame[128 + 3] = 0x04;
  const passes = [];
  const context = {
    fillRect() {},
    beginPath() { passes.push({ color: this.fillStyle, rects: [] }); },
    rect(...rect) { passes[passes.length - 1].rects.push(rect); },
    fill() {}
  };
  catalog.paintAppScreen({ getContext: () => context }, frame, '#000000', '#ffffff');
  assert.deepEqual(passes.map(pass => pass.color), ['rgb(242, 242, 242)', '#000000']);
  assert.equal(passes[0].rects.length, 128 * 64 - 1);
  assert.deepEqual(passes[1].rects, [[18, 70, 5, 6]]);
});

test('lists the community apps of apps.json, never in place of an official one', () => {
  assert.equal(catalog.COMMUNITY_MANIFEST_URL, 'https://raw.githubusercontent.com/armel/fusion-community/main/apps.json');
  const screen = Buffer.alloc(1024, 0x11).toString('base64');
  const entry = (id, more = {}) => ({
    id, name: 'Sky Watch', version: '1.2', file: `apps/${id}/1.2/SkyWatch.app`, size: 1500, codeSize: 1200,
    assetSize: 236, sha256: 'a'.repeat(64), category: 'tools', author: 'F4XYZ', owner: 'f4xyz',
    description: 'Track satellite passes.', source: 'https://github.com/f4xyz/skywatch', screen, ...more
  });
  const apps = catalog.listCommunityApps({ format: 1, apps: [
    entry('skywatch'),
    entry('alpha', { name: 'Alpha', file: 'apps/alpha/0.1/Alpha.app', category: 'weird', source: 'javascript:alert(1)' }),
    entry('foxhunt', { file: 'apps/foxhunt/1.2/FoxHunt.app' }),   // an official id
    entry('bad', { file: '../../etc/passwd' }),
    entry('nohash', { file: 'apps/nohash/1.2/NoHash.app', sha256: 'xyz' }),
    null
  ] });
  assert.deepEqual(apps.map(app => app.id), ['alpha', 'skywatch']);
  const [alpha, sky] = apps;
  assert.equal(alpha.category, 'other');
  assert.equal(alpha.source, '');
  assert.deepEqual({ ...sky, screen: undefined }, {
    id: 'skywatch', name: 'SkyWatch.app', label: 'Sky Watch',
    url: 'https://raw.githubusercontent.com/armel/fusion-community/main/apps/skywatch/1.2/SkyWatch.app',
    size: 1500, category: 'tools', description: 'Track satellite passes.', descriptionKey: '', author: 'F4XYZ',
    source: 'https://github.com/f4xyz/skywatch', sha256: 'a'.repeat(64), screen: undefined, community: true,
    metadata: { name: 'Sky Watch', version: '1.2', codeSize: 1200, assetSize: 236 }
  });
  // The installed copy of a community app is found by the same id.
  assert.equal(catalog.appCatalogId(sky.name), sky.id);
  assert.equal(catalog.catalogAppState({ version: '1.1' }, sky.metadata), 'update');
  assert.deepEqual(catalog.listCommunityApps({ format: 2, apps: [entry('skywatch')] }), []);
  assert.deepEqual(catalog.listCommunityApps(null), []);
});
