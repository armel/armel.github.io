/* UV Studio — global "firmwares flashed" counter.
   Reads and increments a Cloudflare Worker + KV counter, and shows the
   running total in the top bar. Entirely best-effort: any network or CORS
   failure is swallowed silently and never blocks or delays a flash. */
(function () {
    "use strict";

    // Cloudflare Worker endpoint (GET = read total, POST = +1 on success).
    const ENDPOINT = "https://uvstudio-counter.armel-fauveau.workers.dev";

    const pill = document.getElementById("flashCounter");
    const valueEl = document.getElementById("flashCounterValue");
    if (!pill || !valueEl) return;

    let lastCount = null;

    function currentLang() {
        return window.uvStudioI18n ? window.uvStudioI18n.lang : "en";
    }

    function t(key) {
        return window.uvStudioI18n ? window.uvStudioI18n.t(key) : key;
    }

    function render(count) {
        if (typeof count !== "number" || !isFinite(count)) return;
        lastCount = count;
        let formatted;
        try {
            formatted = count.toLocaleString(currentLang());
        } catch (e) {
            formatted = String(count);
        }
        valueEl.textContent = formatted;
        pill.title = t("studio_flash_counter_title");
        pill.hidden = false;
    }

    function apply(response) {
        if (response && typeof response.count === "number") render(response.count);
    }

    function refresh() {
        fetch(ENDPOINT, { method: "GET" })
            .then(r => (r.ok ? r.json() : null))
            .then(apply)
            .catch(() => {});
    }

    function increment() {
        fetch(ENDPOINT, { method: "POST" })
            .then(r => (r.ok ? r.json() : null))
            .then(apply)
            .catch(() => {});
    }

    // Re-format the number (thousands separators are locale-specific) and
    // refresh the tooltip when the interface language changes.
    window.addEventListener("uvstudio:languagechange", () => {
        if (lastCount !== null) render(lastCount);
    });

    window.UVStudioFlashCounter = { refresh, increment };

    refresh();
})();
