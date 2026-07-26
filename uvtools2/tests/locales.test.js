'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const localeDirectory = path.join(__dirname, '..', 'locales');
const expectedLanguages = ['de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'ru', 'zh'];

function loadLocales() {
  const context = { window: {} };
  vm.createContext(context);

  for (const language of expectedLanguages) {
    const source = fs.readFileSync(path.join(localeDirectory, `${language}.js`), 'utf8');
    vm.runInContext(source, context, { filename: `${language}.js` });
  }

  return context.window.UVTOOLS_LOCALES;
}

function placeholders(value) {
  return (value.match(/\{\d+\}/g) || []).sort();
}

function htmlTags(value) {
  return (value.match(/<\/?[a-z]+>/gi) || []).sort();
}

const locales = loadLocales();

test('all supported locale dictionaries are present and complete', () => {
  assert.deepEqual(Object.keys(locales).sort(), expectedLanguages);

  const englishKeys = Object.keys(locales.en).sort();
  for (const language of expectedLanguages) {
    assert.deepEqual(
      Object.keys(locales[language]).sort(),
      englishKeys,
      `${language} must contain exactly the English locale keys`
    );
  }
});

test('translated strings preserve placeholders and HTML markup', () => {
  for (const language of expectedLanguages) {
    for (const [key, englishValue] of Object.entries(locales.en)) {
      const translatedValue = locales[language][key];
      assert.deepEqual(
        placeholders(translatedValue),
        placeholders(englishValue),
        `${language}.${key} must preserve placeholders`
      );
      assert.deepEqual(
        htmlTags(translatedValue),
        htmlTags(englishValue),
        `${language}.${key} must preserve HTML tags`
      );
    }
  }
});
