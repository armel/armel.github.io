// Very light i18n loader with JSON files (lazy-load per language)
(function () {
  const DEFAULT_LANG = localStorage.getItem('uv-k5-flasher-lang') || 'en';
  const supported = ['en', 'fr']; // add 'it', 'es', 'de' when files exist

  function getLang() {
    const ui = document.getElementById('languageSelect');
    if (!ui) return DEFAULT_LANG;
    const val = ui.value || DEFAULT_LANG;
    return supported.includes(val) ? val : 'en';
  }

  async function loadLocale(lang) {
    const res = await fetch(`./locales/${lang}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load locale: ${lang}`);
    return res.json();
  }

  const i18n = {
    lang: DEFAULT_LANG,
    dict: {},
    async init() {
      await this.setLanguage(DEFAULT_LANG);
      const sel = document.getElementById('languageSelect');
      if (sel) sel.value = this.lang;
      this.bindSelector();
    },
    bindSelector() {
      const sel = document.getElementById('languageSelect');
      if (!sel) return;
      sel.addEventListener('change', async (e) => {
        const lang = e.target.value;
        await this.setLanguage(lang);
        if (window.updateUI) window.updateUI(); // let app refresh text
      });
    },
    t(key, ...args) {
      const base = this.dict[key] ?? key;
      return args.reduce((acc, val, idx) => acc.replace(`{${idx}}`, val), base);
    },
    async setLanguage(lang) {
      this.lang = supported.includes(lang) ? lang : 'en';
      localStorage.setItem('uv-k5-flasher-lang', this.lang);
      this.dict = await loadLocale(this.lang);
      document.documentElement.lang = this.lang;
    }
  };

  window.i18n = i18n;
  i18n.init().catch(console.error);
})();
