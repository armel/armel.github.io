/* ══════════════════════════════════════════════════════════════
   Shared theme toggle — F4HWN web tools
   Manages data-theme on <body> and persists the choice under the
   "isDarkTheme" key, shared origin-wide so the light/dark preference
   follows the user across k5viewer, uvtools2, …

   Requires a button with id="themeToggle" in the page.
   Load this AFTER <body> exists (e.g. at the end of the document).
══════════════════════════════════════════════════════════════ */
(function () {
    const KEY = 'isDarkTheme';
    const GLYPH = { dark: '◑', light: '◐' };

    let isDark = localStorage.getItem(KEY) === 'true';

    function apply() {
        document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
        const btn = document.getElementById('themeToggle');
        if (btn) btn.textContent = isDark ? GLYPH.dark : GLYPH.light;
    }

    apply();

    function bind() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        btn.textContent = isDark ? GLYPH.dark : GLYPH.light;
        btn.addEventListener('click', function () {
            isDark = !isDark;
            localStorage.setItem(KEY, isDark);
            apply();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
