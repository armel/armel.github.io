// js/i18n.js
// Very light i18n loader with JSON files (lazy-load per language).
// Adds: window.i18nReady (Promise) and dispatches "i18n:ready" event.
// If locale fetch fails, a friendly error is shown in #infoBox.
// All comments in English.

(function () {
  const DEFAULT_LANG = localStorage.getItem('uv-k5-flasher-lang') || 'en';
  const supported = ['en', 'fr', 'zh']; // add other codes (it, es, de) when files exist

  // Load a locale JSON file, throws on file:// or fetch errors
  async function loadLocale(lang) {
    // Guard against file:// origin which blocks fetch
    if (location.protocol === 'file:') {
      throw new Error(
        'This page is opened via file://. Serve it over http://localhost or HTTPS so JSON fetch & Web Serial work.'
      );
    }

    const res = await fetch(`./locales/${lang}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load locale: ${lang}`);
    return res.json();
  }

  const i18n = {
    lang: DEFAULT_LANG,
    dict: {},
    // Initialize i18n: load default language, set selector, bind change handler
    async init() {
      await this.setLanguage(this.lang);
      const sel = document.getElementById('languageSelect');
      if (sel) sel.value = this.lang;
      this.bindSelector();
      // Broadcast ready so other modules can initialize safely
      window.dispatchEvent(new CustomEvent('i18n:ready', { detail: { lang: this.lang } }));
    },
    bindSelector() {
      const sel = document.getElementById('languageSelect');
      if (!sel) return;
      sel.addEventListener('change', async (e) => {
        const lang = e.target.value;
        try {
          await this.setLanguage(lang);
          localStorage.setItem('uv-k5-flasher-lang', this.lang);
          // Let the app refresh texts
          if (window.updateUI) window.updateUI();
        } catch (err) {
          console.error('Failed to switch language:', err);
          const el = document.getElementById('infoBox');
          if (el) el.innerHTML = `<strong>Error loading language:</strong> ${err.message}`;
        }
      });
    },
    // Translate helper with simple {0} substitution
    t(key, ...args) {
      const base = this.dict && this.dict[key] ? this.dict[key] : key;
      return args.reduce((acc, val, idx) => acc.replace(`{${idx}}`, val), base);
    },
    async setLanguage(lang) {
      this.lang = supported.includes(lang) ? lang : 'en';
      this.dict = await loadLocale(this.lang);
      document.documentElement.lang = this.lang;
    }
  };

  // Expose globally
  window.i18n = i18n;

  // Expose a promise others can await before touching translations
  window.i18nReady = i18n.init().catch((err) => {
    console.error('i18n init error:', err);
    const el = document.getElementById('infoBox');
    if (el) el.innerHTML = `<strong>Error:</strong> ${err.message}`;
    // resolve anyway to avoid blocking app; UI will display keys if needed
    return Promise.resolve();
  });
})();
