/* UVTools2 — global "firmwares flashed" counter.
   Shares the SAME Cloudflare Worker + KV counter as UV Studio (both live on
   armel.github.io, so the displayed total is combined across the two apps).
   Entirely best-effort: any network or CORS failure is swallowed silently and
   never blocks or delays a flash. */
(function () {
  "use strict";

  // Cloudflare Worker endpoint (GET = read total, POST = +1 on success).
  const ENDPOINT = "https://uvstudio-counter.armel-fauveau.workers.dev";

  const pill = document.getElementById("flashCounter");
  const valueEl = document.getElementById("flashCounterValue");
  const unitEl = document.getElementById("flashCounterUnit");
  if (!pill || !valueEl) return;

  let lastCount = null;

  function lang() {
    return window.i18n && window.i18n.lang ? window.i18n.lang : "en";
  }
  function t(key) {
    return window.i18n && window.i18n.t ? window.i18n.t(key) : key;
  }

  function render(count) {
    if (typeof count === "number" && isFinite(count)) lastCount = count;
    if (lastCount === null) return;
    let formatted;
    try {
      formatted = lastCount.toLocaleString(lang());
    } catch (e) {
      formatted = String(lastCount);
    }
    valueEl.textContent = formatted;
    if (unitEl) unitEl.textContent = t("flash_counter_unit");
    pill.title = t("flash_counter_title");
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

  // Re-render number formatting + label when the language changes.
  // Called from updateUI() (UVTools2's translation refresh entry point).
  function updateLabel() {
    if (lastCount !== null) render();
  }

  window.UVToolsFlashCounter = { refresh, increment, updateLabel };

  if (window.i18nReady && typeof window.i18nReady.then === "function") {
    window.i18nReady.then(refresh);
  } else {
    refresh();
  }
})();
