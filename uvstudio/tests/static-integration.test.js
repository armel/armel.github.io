'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const studioVersionSource = fs.readFileSync(path.join(root, 'js', 'studio-version.js'), 'utf8');
const flashSource = fs.readFileSync(path.join(root, 'js', 'flash.js'), 'utf8');

test('derives any multiboot edition from the canonical firmware filename', () => {
  const start = flashSource.indexOf('function slotEditionFromFilename');
  const end = flashSource.indexOf('\n\nfunction slotVersionFromFilename', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.extractEdition = slotEditionFromFilename;`,
    context
  );

  assert.equal(context.extractEdition('f4hwn.fusion.bin'), 'Fusion');
  assert.equal(context.extractEdition('f4hwn.extended.bin'), 'Extended');
  assert.equal(context.extractEdition('f4hwn.expedition.bin'), 'Expedition');
  assert.equal(context.extractEdition('f4hwn.future-profile.bin'), 'Future Profile');
  assert.equal(context.extractEdition('f4hwn.k1.fusion.v5.9.0.bin'), 'Fusion');
  assert.equal(context.extractEdition('f4hwn.compact.usb.v50.bin'), 'Compact');
  assert.equal(context.extractEdition('unrelated-firmware.bin'), '');
});

test('accepts compact and dotted versions in multiboot firmware metadata', () => {
  const start = flashSource.indexOf('function slotEditionFromFilename');
  const end = flashSource.indexOf('\n\nfunction slotBuildHeader', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.extractMeta = slotExtractMeta;`,
    context
  );

  const compact = context.extractMeta(
    Array.from(Buffer.from('\0RADIO v50\0', 'ascii')),
    'f4hwn.compact.usb.v50.bin'
  );
  assert.equal(compact.name, 'Compact');
  assert.equal(compact.fwVersion, 'v50');

  const dotted = context.extractMeta(
    Array.from(Buffer.from('\0F4HWN v5.9.0\0', 'ascii')),
    'f4hwn.fusion.v5.9.0.bin'
  );
  assert.equal(dotted.name, 'Fusion');
  assert.equal(dotted.fwVersion, 'v5.9.0');

  const legacy = context.extractMeta(
    Array.from(Buffer.from('\0F4HWN v5.9.0\0', 'ascii')),
    'f4hwn.fusion.bin'
  );
  assert.equal(legacy.name, 'Fusion');
  assert.equal(legacy.fwVersion, 'F4HWN v5.9.0');
});

test('stores a custom display name in the multiboot header', () => {
  const start = flashSource.indexOf('function slotNormalizeName');
  const end = flashSource.indexOf('\n\nfunction slotParseHeader', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `const SLOT_HDR_SIZE = 64;
     const SLOT_MAGIC = 0x31424D46;
     const SLOT_HDR_VERSION = 1;
     const SLOT_FLAG_COMMITTED = 1;
     ${flashSource.slice(start, end)};
     this.normalizeName = slotNormalizeName;
     this.buildHeader = slotBuildHeader;`,
    context
  );

  assert.equal(context.normalizeName('  Été   France  '), 'Ete France');
  assert.equal(context.normalizeName('12345678901234567890'), '123456789012345');
  const header = context.buildHeader(1234, 0xAABBCCDD, { name: 'France', fwVersion: 'v5.9.0' });
  const name = Buffer.from(header.slice(16, 32)).toString('ascii').replace(/\0.*$/, '');
  assert.equal(name, 'France');
});

test('offers the custom slot name before writing', () => {
  assert.match(html, /id="slotName"[^>]*maxlength="15"[^>]*disabled/);
  assert.ok(html.indexOf('id="slotName"') < html.indexOf('id="slotWriteBtn"'));
});

test('keeps the public version and its cache key aligned', () => {
  const version = studioVersionSource.match(/UVSTUDIO_VERSION = "([^"]+)"/)?.[1];
  assert.ok(version);
  assert.match(html, new RegExp(`js/studio-version\\.js\\?v=${version.replaceAll('.', '\\.')}`));
});

test('reconnects Firmware Slots and refreshes them after the serial port returns', () => {
  assert.ok(flashSource.includes("navigator.serial.addEventListener('disconnect'"));
  assert.ok(flashSource.includes("navigator.serial.addEventListener('connect'"));
  assert.ok(flashSource.includes('navigator.serial.getPorts()'));
  assert.ok(flashSource.includes("toolsSerial.setState('reconnecting'"));
  assert.ok(flashSource.includes('slotRefreshPending = true'));
  assert.ok(flashSource.includes('void slotRefreshFlow()'));
});

test('loads the shared RF Log protocol before both consumers', () => {
  const rf = html.indexOf('js/rf-log.js');
  const viewer = html.indexOf('js/k5viewer.js');
  const tools = html.indexOf('js/flash.js');
  assert.ok(rf > 0 && rf < viewer && viewer < tools);
});

test('loads resilient preferences before i18n and application consumers', () => {
  const preferences = html.indexOf('js/studio-preferences.js');
  const i18n = html.indexOf('js/studio-i18n.js');
  const viewer = html.indexOf('js/k5viewer.js');
  const studio = html.indexOf('js/studio.js');
  assert.ok(preferences > 0 && preferences < i18n && i18n < viewer && viewer < studio);
});

test('keeps live-view-only controls out of the RF Log toolbar', () => {
  ['keyboardToggleBtn', 'keyboardDetachBtn', 'helpBtn'].forEach(id => {
    assert.match(html, new RegExp(`class="[^"]*viewer-live-only[^"]*" id="${id}"`));
  });
  assert.match(html, /id="pane-viewer" data-viewer-mode="live"/);
});

test('exposes the responsive sidebar toggle to assistive technologies', () => {
  assert.match(html, /id="hamburgerMenu"[^>]*data-i18n-aria-label="toggle_menu"/);
  assert.match(html, /id="hamburgerMenu"[^>]*aria-controls="studioSidebar"/);
  assert.match(html, /id="hamburgerMenu"[^>]*aria-expanded="true"/);
  assert.match(html, /<aside class="sidebar" id="studioSidebar">/);
});

test('maps every maintenance route directly to an existing tool view', () => {
  const views = [...html.matchAll(/data-tool-view="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(views, ['flash', 'slots', 'dump', 'restore', 'logo-upload', 'logo-dump', 'rf-log']);
  views.forEach(view => assert.match(html, new RegExp(`id="${view}-content"`)));
  assert.doesNotMatch(html, /class="tabs"|class="tab btn"/);
});

test('keeps all local script and stylesheet resources resolvable', () => {
  const resources = [
    ...html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)="([^"]+)"/g)
  ].map(match => match[1].split('?')[0]).filter(resource => !resource.startsWith('data:'));
  resources.forEach(resource => {
    assert.equal(fs.existsSync(path.join(root, resource)), true, resource);
  });
});

test('keeps locale dictionaries on the same key set', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const dictionaries = files.map(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    return { file, dictionary: context.window.UVSTUDIO_LOCALES[file.slice(0, 2)] };
  });
  const expected = Object.keys(dictionaries[0].dictionary).sort();
  dictionaries.forEach(({ file, dictionary }) => {
    assert.deepEqual(Object.keys(dictionary).sort(), expected, file);
  });
});

test('translates radio help and exposes every global serial status label', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const required = [
    'radio_navigate_k1_desc',
    'radio_short_desc',
    'radio_long_desc',
    'radio_led_state',
    'radio_ptt_unavailable',
    'studio_serial_disconnected',
    'studio_serial_connected_viewer',
    'studio_operation_flash',
    'studio_operation_restore_calibration'
  ];
  files.forEach(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    const dictionary = context.window.UVSTUDIO_LOCALES[file.slice(0, 2)];
    required.forEach(key => assert.ok(dictionary[key], `${file}:${key}`));
    if (file !== 'en.js') {
      assert.notEqual(dictionary.radio_short_desc, 'Digit short press', file);
      assert.notEqual(dictionary.radio_long_desc, 'Digit long press', file);
    }
  });
  assert.match(html, /id="studioSerialStatus"/);
  assert.match(html, /data-i18n-aria-label="radio_led_state"/);
});
