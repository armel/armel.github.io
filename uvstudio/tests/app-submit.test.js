'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const zlib = require('node:zlib');

const submit = require('../js/app-submit.js');

function makeApp({
  name = 'Sky Watch', version = '1.0', code = Buffer.alloc(1200, 0xbf), assets = Buffer.from('asset'.repeat(20)),
  abi = 1, api = 3, caps = 0, entry = 0, vma = 0x20000280, codeCrc = null
} = {}) {
  const header = Buffer.alloc(64);
  header.writeUInt32LE(0x31504146, 0);
  header.writeUInt16LE(1, 4);
  header[6] = abi;
  header[7] = api;
  header.writeUInt32LE(code.length, 8);
  header.writeUInt32LE(codeCrc === null ? submit.crc32(code) : codeCrc, 12);
  header.writeUInt16LE(entry, 16);
  header.writeUInt16LE(1, 18);
  header.write(name, 20, 'latin1');
  header.write(version, 36, 'latin1');
  header.writeUInt32LE(vma, 52);
  header.writeUInt32LE(caps, 56);
  header.writeUInt16LE(assets.length, 60);
  header.writeUInt16LE(submit.crc32(assets) & 0xFFFF, 62);
  return new Uint8Array(Buffer.concat([header, code, assets]));
}

// A box around the screen, a diagonal and a filled block, in LCD pages.
function sampleFrame() {
  const frame = new Uint8Array(1024);
  const set = (x, y) => { frame[(y >> 3) * 128 + x] |= 1 << (y & 7); };
  for (let x = 0; x < 128; x++) { set(x, 0); set(x, 63); }
  for (let y = 0; y < 64; y++) { set(0, y); set(127, y); set((y * 2) % 128, y); }
  for (let y = 20; y < 30; y++) for (let x = 90; x < 110; x++) set(x, y);
  return frame;
}

const deflate = async bytes => new Uint8Array(zlib.deflateRawSync(Buffer.from(bytes), { level: 9 }));

test('computes the CRC32 the radio and the community check use', () => {
  assert.equal(submit.crc32(Buffer.from('123456789')), 0xCBF43926);
});

test('accepts a well-built app and reads its header', () => {
  const { app, error } = submit.checkApp(makeApp({ caps: 0x21, api: 4 }));
  assert.equal(error, null);
  assert.deepEqual(app, { name: 'Sky Watch', version: '1.0', api: 4, caps: 0x21, codeSize: 1200, assetSize: 100, id: 'skywatch' });
});

test('refuses an app the radio would refuse, with a translatable reason', () => {
  const cases = [
    [new Uint8Array(10), ['appSubmitNotApp']],
    [new Uint8Array(64), ['appSubmitNotApp']],
    [makeApp({ abi: 2 }), ['appSubmitAbi', 2]],
    [makeApp({ api: 5 }), ['appSubmitTooNew', 5, 4]],
    [makeApp({ api: 0 }), ['appSubmitTooNew', 0, 4]],
    [makeApp({ caps: 0x84 }), ['appSubmitCaps', '84']],
    [makeApp({ name: '' }), ['appSubmitDamaged', 'name, version']],
    [makeApp({ vma: 0x20000000 }), ['appSubmitDamaged', 'link address']],
    [makeApp({ code: Buffer.alloc(4098) }), ['appSubmitDamaged', 'code size']],
    [makeApp({ entry: 3 }), ['appSubmitDamaged', 'entry point']],
    [makeApp({ assets: Buffer.alloc(3841) }), ['appSubmitDamaged', 'asset size']],
    [makeApp().subarray(0, 1300), ['appSubmitDamaged', 'file size']],
    [makeApp({ codeCrc: 1 }), ['appSubmitDamaged', 'code CRC']]
  ];
  cases.forEach(([bytes, error]) => {
    assert.deepEqual(submit.checkApp(bytes), { app: null, error }, error.join(' '));
  });
});

test('takes the Live Viewer screen in the catalog LCD layout', () => {
  // The radio sends row-major bits (k5viewer.js getBit); the catalog keeps pages.
  const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'k5viewer.js'), 'utf8');
  const block = source.match(/let viewerFrameReceived = false;\nwindow\.UVStudioViewer = \{[\s\S]*?\n\};/)[0];
  const pages = sampleFrame();
  const rows = new Uint8Array(1024);
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 128; x++) {
      if (pages[(y >> 3) * 128 + x] >> (y & 7) & 1) rows[(y * 128 + x) >> 3] |= 1 << ((y * 128 + x) & 7);
    }
  }
  const context = { window: {}, Uint8Array, FRAME_SIZE: 1024, WIDTH: 128, HEIGHT: 64,
    getBit: index => (rows[index >> 3] >> (index & 7)) & 1 };
  vm.runInNewContext(`${block}\nthis.before = window.UVStudioViewer.lastFrame();\nviewerFrameReceived = true;`, context);
  assert.equal(context.before, null);
  assert.deepEqual(context.window.UVStudioViewer.lastFrame(), pages);
});

test('rebuilds the radio screen from the K5Viewer frames of the tools connection', () => {
  // flash.js keeps these two functions next to its serial read loop.
  const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'flash.js'), 'utf8');
  const code = ['K5VIEWER_FULL_FRAME', 'function trackScreenBytes', 'function screenPagesFromRows'].map(start => {
    const at = source.indexOf(start);
    return start.startsWith('function') ? source.slice(at, source.indexOf('\n}\n', at) + 2) : source.slice(source.lastIndexOf('const', at), source.indexOf('\n', at));
  }).join('\n');
  const context = { Uint8Array, toolsSerialSession: 1 };
  vm.runInNewContext(`${code}\nthis.track = trackScreenBytes; this.pages = screenPagesFromRows;`, context);
  const pages = sampleFrame();
  const rows = new Uint8Array(1024);
  for (let y = 0; y < 64; y++) {
    for (let x = 0; x < 128; x++) {
      if (pages[(y >> 3) * 128 + x] >> (y & 7) & 1) rows[(y * 128 + x) >> 3] |= 1 << ((y * 128 + x) & 7);
    }
  }
  const frame = chunks => [0xF0, 0xAA, 0x55, 0x02, (chunks.length * 9) >> 8, (chunks.length * 9) & 0xFF,
    ...chunks.flatMap(index => [index, ...rows.subarray(index * 8, index * 8 + 8)]), 0x0A];
  const full = frame([...Array(128).keys()]);
  const screenTrack = { session: 1, rows: new Uint8Array(1024), known: new Uint8Array(128), bytes: [], full: false };
  vm.runInNewContext('screenTrack = shared', Object.assign(context, { shared: screenTrack }));
  // Split across reads, with tools traffic in front.
  context.track(Uint8Array.of(0xAB, 0xCD, 0x01, ...full.slice(0, 500)));
  assert.equal(screenTrack.full, false);
  context.track(Uint8Array.from(full.slice(500)));
  assert.equal(screenTrack.full, true);
  assert.deepEqual(context.pages(screenTrack.rows), pages);
  assert.equal(screenTrack.bytes.length, 0);
  // A later diff changes only its chunks.
  rows.fill(0xFF, 5 * 8, 6 * 8);
  screenTrack.full = false;
  context.track(Uint8Array.from(frame([5])));
  assert.equal(screenTrack.full, false);
  assert.deepEqual(screenTrack.rows, rows);
});

test('writes files inline as raw deflate in base64url, as the community check reads them', async () => {
  const bytes = makeApp();
  const payload = await submit.encodePayload('app', bytes, deflate);
  const match = payload.match(/^uvstudio-app:1:([A-Za-z0-9_-]+)$/);
  assert.ok(match, payload.slice(0, 40));
  const packed = Buffer.from(match[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  assert.deepEqual(new Uint8Array(zlib.inflateRawSync(packed)), bytes);
});

test('writes the issue the submission form makes', async () => {
  const { app } = submit.checkApp(makeApp());
  const issue = submit.buildIssue(
    { author: '  F4XYZ ', category: 'Tools', description: 'Track satellite\npasses and show the next one.', firmware: 'v7.0.0 Fusion', source: '' },
    app, 'uvstudio-app:1:AAAA', 'uvstudio-screen:1:BBBB'
  );
  assert.equal(issue.title, '[App] Sky Watch 1.0');
  const labels = [...issue.body.matchAll(/^### (.+)$/gm)].map(match => match[1]);
  // The labels of .github/ISSUE_TEMPLATE/submit-app.yml in the community repository.
  assert.deepEqual(labels, ['App name', 'Author', 'Category', 'Description', 'Firmware tested', 'Source code',
    'Screenshot', 'App binary', 'Checks']);
  assert.match(issue.body, /### Author\n\nF4XYZ\n/);
  assert.match(issue.body, /### Description\n\nTrack satellite passes and show the next one\.\n/);
  assert.match(issue.body, /### Firmware tested\n\nv7\.0\.0 Fusion\n/);
  assert.match(issue.body, /### Source code\n\n_No response_\n/);
  // No radio read: the firmware stays unanswered, as an empty form field.
  const offline = submit.buildIssue({ author: 'F4XYZ', category: 'Tools', description: 'Some app.', firmware: '', source: '' },
    app, 'uvstudio-app:1:AAAA', 'uvstudio-screen:1:BBBB');
  assert.match(offline.body, /### Firmware tested\n\n_No response_\n/);
  assert.match(issue.body, /### App binary\n\n```text\nuvstudio-app:1:AAAA\n```/);
  assert.equal(issue.body.match(/^- \[x\] /gm).length, 3);
});

test('puts the whole issue in the link when it fits, otherwise asks to paste it', async () => {
  const { app } = submit.checkApp(makeApp());
  const fields = { author: 'F4XYZ', category: 'Games', description: 'A compact puzzle game for the radio.', firmware: 'v7.0.0', source: '' };
  const small = submit.issueLink(submit.buildIssue(fields, app, 'uvstudio-app:1:' + 'A'.repeat(5000), 'uvstudio-screen:1:BBBB'));
  assert.equal(small.paste, null);
  assert.ok(small.url.length <= submit.URL_LIMIT);
  const url = new URL(small.url);
  assert.equal(url.origin + url.pathname, 'https://github.com/armel/fusion-community/issues/new');
  assert.match(url.searchParams.get('body'), /uvstudio-app:1:A{5000}/);
  const large = submit.issueLink(submit.buildIssue(fields, app, 'uvstudio-app:1:' + 'A'.repeat(9000), 'uvstudio-screen:1:BBBB'));
  assert.match(large.paste, /uvstudio-app:1:A{9000}/);
  assert.equal(new URL(large.url).searchParams.get('body'), null);
  assert.equal(new URL(large.url).searchParams.get('title'), '[App] Sky Watch 1.0');
});
