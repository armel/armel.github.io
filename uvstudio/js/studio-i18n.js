/* UV Studio shared internationalization runtime.
   Uses local JavaScript dictionaries so index.html remains file:// friendly. */
;(function () {
    "use strict";

    const STORAGE_KEY = "uvstudio.language";
    const LEGACY_STORAGE_KEYS = ["currentLanguage", "uv-k5-flasher-lang"];
    const SUPPORTED_LANGUAGES = ["en", "fr", "it", "es", "de", "pt", "ru", "pl", "zh", "nl"];
    const dictionaries = window.UVSTUDIO_LOCALES || {};
    const preferences = window.UVStudioPreferences;

    function readStoredLanguage() {
        const keys = [STORAGE_KEY].concat(LEGACY_STORAGE_KEYS);
        for (const key of keys) {
            const value = preferences.get(key, "");
            if (value) return value;
        }
        return "en";
    }

    function storeLanguage(language) {
        preferences.set(STORAGE_KEY, language);
    }

    function normalizeLanguage(language) {
        return SUPPORTED_LANGUAGES.includes(language) ? language : "en";
    }

    function interpolate(template, values) {
        let result = String(template);
        if (values.length === 1 && values[0] && typeof values[0] === "object" && !Array.isArray(values[0])) {
            Object.entries(values[0]).forEach(([name, value]) => {
                result = result.split(`{${name}}`).join(String(value));
            });
            return result;
        }
        values.forEach((value, index) => {
            result = result.split(`{${index}}`).join(String(value));
        });
        return result;
    }

    const i18n = {
        lang: normalizeLanguage(readStoredLanguage()),
        dict: {},

        t(key, ...values) {
            const current = this.dict[key];
            const fallback = dictionaries.en && dictionaries.en[key];
            const template = current !== undefined ? current : (fallback !== undefined ? fallback : key);
            return interpolate(template, values);
        },

        apply(root) {
            const scope = root || document;
            scope.querySelectorAll("[data-i18n]").forEach(element => {
                element.textContent = this.t(element.getAttribute("data-i18n"));
            });
            scope.querySelectorAll("[data-i18n-title]").forEach(element => {
                const key = element.getAttribute("data-i18n-title");
                if (key) element.setAttribute("title", this.t(key));
            });
            scope.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
                const key = element.getAttribute("data-i18n-aria-label");
                if (key) element.setAttribute("aria-label", this.t(key));
            });
        },

        setLanguage(language, options) {
            const settings = Object.assign({ persist: true, announce: true }, options);
            this.lang = normalizeLanguage(language);
            this.dict = dictionaries[this.lang] || dictionaries.en || {};
            document.documentElement.lang = this.lang;

            const selector = document.getElementById("languageSelect");
            if (selector) selector.value = this.lang;
            if (settings.persist) storeLanguage(this.lang);

            this.apply(document);
            if (settings.announce) {
                window.dispatchEvent(new CustomEvent("uvstudio:languagechange", {
                    detail: { lang: this.lang }
                }));
            }
        },

        init() {
            this.setLanguage(this.lang, { persist: false, announce: false });
            storeLanguage(this.lang);

            const selector = document.getElementById("languageSelect");
            if (selector) {
                selector.addEventListener("change", event => {
                    this.setLanguage(event.target.value);
                });
            }

            window.dispatchEvent(new CustomEvent("i18n:ready", {
                detail: { lang: this.lang }
            }));
        }
    };

    window.uvStudioI18n = i18n;
    try {
        i18n.init();
        window.uvStudioI18nReady = Promise.resolve(i18n);
    } catch (error) {
        console.error("UV Studio i18n initialization failed:", error);
        window.uvStudioI18nReady = Promise.resolve(i18n);
    }
})();
