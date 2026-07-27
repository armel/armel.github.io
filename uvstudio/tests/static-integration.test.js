'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

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

test('maps every maintenance route directly to an existing tool view', () => {
  const views = [...html.matchAll(/data-tool-view="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(views, ['flash', 'dump', 'restore', 'logo-upload', 'logo-dump', 'rf-log']);
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
