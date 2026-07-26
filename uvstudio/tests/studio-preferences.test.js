'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadPreferences(localStorage) {
  const context = { localStorage, window: {} };
  const source = fs.readFileSync(
    path.join(__dirname, '..', 'js', 'studio-preferences.js'),
    'utf8'
  );
  vm.runInNewContext(source, context);
  return context.window.UVStudioPreferences;
}

test('persists values when localStorage is available', () => {
  const values = new Map();
  const preferences = loadPreferences({
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, value); },
    removeItem(key) { values.delete(key); }
  });

  assert.equal(preferences.get('theme', 'light'), 'light');
  assert.equal(preferences.set('theme', 'dark'), true);
  assert.equal(preferences.get('theme', 'light'), 'dark');
  assert.equal(preferences.remove('theme'), true);
  assert.equal(preferences.get('theme', 'light'), 'light');
});

test('falls back to session memory when storage access is denied', () => {
  const denied = new Error('storage denied');
  const preferences = loadPreferences({
    getItem() { throw denied; },
    setItem() { throw denied; },
    removeItem() { throw denied; }
  });

  assert.equal(preferences.get('kbdModel', 'K1'), 'K1');
  assert.equal(preferences.set('kbdModel', 'K5'), false);
  assert.equal(preferences.get('kbdModel', 'K1'), 'K5');
  assert.equal(preferences.remove('kbdModel'), false);
  assert.equal(preferences.get('kbdModel', 'K1'), 'K1');
});
