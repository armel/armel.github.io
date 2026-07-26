'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'i18n.js'), 'utf8');

function createRuntime(initialStorage) {
  const storage = new Map(Object.entries(initialStorage));
  const listeners = {};
  const languageSelect = {
    value: '',
    addEventListener(type, listener) {
      listeners[type] = listener;
    }
  };
  let updateCount = 0;

  const context = {
    console,
    CustomEvent: class CustomEvent {
      constructor(type, options) {
        this.type = type;
        this.detail = options?.detail;
      }
    },
    document: {
      documentElement: { lang: 'en' },
      getElementById(id) {
        return id === 'languageSelect' ? languageSelect : null;
      }
    },
    localStorage: {
      getItem(key) {
        return storage.has(key) ? storage.get(key) : null;
      },
      setItem(key, value) {
        storage.set(key, String(value));
      }
    },
    window: {
      UVTOOLS_LOCALES: {
        en: { sample: 'English' },
        fr: { sample: 'Français' },
        de: { sample: 'Deutsch' }
      },
      dispatchEvent() {},
      updateUI() {
        updateCount++;
      }
    }
  };

  vm.createContext(context);
  vm.runInContext(source, context, { filename: 'i18n.js' });

  return {
    context,
    languageSelect,
    listeners,
    storage,
    getUpdateCount: () => updateCount
  };
}

test('migrates the former UVTools2 language preference to the shared key', async () => {
  const runtime = createRuntime({ 'uv-k5-flasher-lang': 'fr' });
  await runtime.context.window.i18nReady;

  assert.equal(runtime.context.window.i18n.lang, 'fr');
  assert.equal(runtime.context.document.documentElement.lang, 'fr');
  assert.equal(runtime.languageSelect.value, 'fr');
  assert.equal(runtime.storage.get('currentLanguage'), 'fr');
});

test('prefers and updates the language key shared with K5Viewer', async () => {
  const runtime = createRuntime({
    currentLanguage: 'de',
    'uv-k5-flasher-lang': 'fr'
  });
  await runtime.context.window.i18nReady;

  assert.equal(runtime.context.window.i18n.lang, 'de');
  assert.equal(runtime.languageSelect.value, 'de');

  await runtime.listeners.change({ target: { value: 'fr' } });

  assert.equal(runtime.storage.get('currentLanguage'), 'fr');
  assert.equal(runtime.storage.get('uv-k5-flasher-lang'), 'fr');
  assert.equal(runtime.getUpdateCount(), 1);
});
