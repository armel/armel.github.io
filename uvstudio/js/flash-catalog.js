// Firmware catalog: lists stable archive/ files from the main branch and the
// optional rolling development build from feature_update_v5 through the GitHub
// Contents API. Selected builds feed into the existing flash pipeline
// (window.UVStudioFlash.loadFirmwareFromURL). Pure helpers are exported for Node
// tests; the browser runtime is guarded and self-boots.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVStudioFlashCatalog = api;

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => api.boot());
    } else {
      api.boot();
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const REPO = 'armel/uv-k1-k5v3-firmware-custom';
  const ARCHIVE_PATH = 'archive';
  const STABLE_BRANCH = 'main';
  const API_URL =
    `https://api.github.com/repos/${REPO}/contents/${ARCHIVE_PATH}` +
    `?ref=${encodeURIComponent(STABLE_BRANCH)}`;
  const DEVELOPMENT_BRANCH = 'feature_update_v5';
  const DEVELOPMENT_FILENAME = 'f4hwn.fusion.development.bin';
  const DEVELOPMENT_API_URL =
    `https://api.github.com/repos/${REPO}/contents/${ARCHIVE_PATH}/${DEVELOPMENT_FILENAME}` +
    `?ref=${encodeURIComponent(DEVELOPMENT_BRANCH)}`;

  // Only current firmwares are offered: v5.0 and newer, no beta or SA818 builds.
  const MIN_MAJOR_VERSION = 5;

  // Group labels are technical terms shared across every language.
  const GROUP_ORDER = ['fusion', 'development', 'fusion_k1', 'fusion_k5v3', 'stock'];
  const GROUP_LABELS = {
    fusion: 'F4HWN Fusion (stable)',
    development: 'F4HWN Fusion (dev, unstable)',
    fusion_k1: 'F4HWN Fusion · K1',
    fusion_k5v3: 'F4HWN Fusion · K5v3',
    stock: 'Quansheng (stock)'
  };

  // ========== PURE HELPERS (Node-testable) ==========

  // Parse an archive filename into a structured entry, or null when the file is
  // not a flashable firmware image (logos and other assets are ignored).
  function parseFirmwareName(name) {
    if (typeof name !== 'string') return null;
    const lower = name.toLowerCase();
    if (!lower.endsWith('.bin')) return null;

    const isBeta = /\.beta\b/.test(lower);
    const isSa818 = /\.sa818\b/.test(lower);
    const isDevelopment = lower === DEVELOPMENT_FILENAME;
    const versionMatch = lower.match(/v(\d+(?:\.\d+)+)/);
    const version = versionMatch ? versionMatch[1] : '';

    let brand;
    let group;
    let model = '';

    if (isDevelopment) {
      brand = 'f4hwn';
      group = 'development';
    } else if (lower.startsWith('quansheng')) {
      brand = 'stock';
      group = 'stock';
      if (lower.includes('.k1.')) model = 'K1';
      else if (lower.includes('.k5v3.')) model = 'K5v3';
    } else {
      brand = 'f4hwn';
      if (lower.includes('.k1.')) { group = 'fusion_k1'; model = 'K1'; }
      else if (lower.includes('.k5v3.')) { group = 'fusion_k5v3'; model = 'K5v3'; }
      else { group = 'fusion'; model = ''; }
    }

    return { name, brand, group, model, version, isBeta, isSa818, isDevelopment };
  }

  // Descending semantic comparison so v5.10.0 correctly outranks v5.9.0.
  function compareVersionDesc(a, b) {
    const pa = String(a).split('.').map(Number);
    const pb = String(b).split('.').map(Number);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
      const da = pa[i] || 0;
      const db = pb[i] || 0;
      if (da !== db) return db - da;
    }
    return 0;
  }

  function majorVersion(version) {
    const major = parseInt(String(version).split('.')[0], 10);
    return Number.isFinite(major) ? major : -1;
  }

  // Keep only current, stable, non-SA818 firmware images (v5.0 and newer).
  function isOffered(entry) {
    return entry.isDevelopment ||
      (!entry.isBeta && !entry.isSa818 && majorVersion(entry.version) >= MIN_MAJOR_VERSION);
  }

  function normalizeFile(file) {
    return {
      name: file && file.name,
      size: file && file.size,
      download_url: file && file.download_url
    };
  }

  // Stable listings never supply the rolling entry. Its canonical source is the
  // development branch, even if a stale copy happens to exist on main.
  function mergeCatalogFiles(stableFiles, developmentFile) {
    const files = (Array.isArray(stableFiles) ? stableFiles : [])
      .filter(file => file && file.name !== DEVELOPMENT_FILENAME)
      .map(normalizeFile);
    if (developmentFile && developmentFile.name === DEVELOPMENT_FILENAME) {
      files.push(normalizeFile(developmentFile));
    }
    return files;
  }

  // Group GitHub file entries ({ name, size, download_url }) into an ordered map
  // of firmware families, newest version first within each family.
  function categorize(files) {
    const groups = new Map();
    GROUP_ORDER.forEach(id => groups.set(id, []));

    (Array.isArray(files) ? files : []).forEach(file => {
      const parsed = parseFirmwareName(file && file.name);
      if (!parsed || !groups.has(parsed.group) || !isOffered(parsed)) return;
      groups.get(parsed.group).push(Object.assign(parsed, {
        size: file.size,
        url: file.download_url
      }));
    });

    groups.forEach(list => list.sort((a, b) => compareVersionDesc(a.version, b.version)));
    return groups;
  }

  // Compact option label, e.g. "v5.7.0 · 58 KB" or "K1 v7.03.01 · 61 KB".
  function formatOptionLabel(entry) {
    const parts = [];
    if (entry.group === 'stock' && entry.model) parts.push(entry.model);
    // Kept in English like the other technical tags (stable / dev / stock).
    if (entry.isDevelopment) parts.push('⚠ Development · unstable');
    else parts.push(entry.version ? `v${entry.version}` : entry.name);
    let label = parts.join(' ');
    if (Number.isFinite(entry.size)) label += ` · ${Math.round(entry.size / 1024)} KB`;
    return label;
  }

  const pureApi = {
    parseFirmwareName,
    compareVersionDesc,
    categorize,
    formatOptionLabel,
    isOffered,
    mergeCatalogFiles
  };

  // ========== BROWSER RUNTIME ==========

  function boot() {
    const select = document.getElementById('firmwareCatalogSelect');
    const section = document.getElementById('firmwareCatalogSection');
    const divider = document.getElementById('firmwareCatalogOr');
    if (!select) return; // Not the flash view / markup absent.

    // Purge the obsolete persistent listing cache written by earlier versions.
    if (window.UVStudioPreferences) {
      try { window.UVStudioPreferences.remove('uvstudio.firmwareCatalog'); } catch (e) {}
    }

    // Kept only in memory for the lifetime of the page. When the listing cannot be
    // fetched (no connection), the whole picker stays hidden and only the local
    // file input remains — exactly the pre-catalog experience.
    let groups = null;
    let loaded = false;
    let loading = false;
    let retryUntil = 0; // epoch ms before which we must not re-hit a rate-limited API

    function t(key) {
      return window.uvStudioI18n ? window.uvStudioI18n.t(key) : key;
    }

    function showCatalog(visible) {
      if (section) section.hidden = !visible;
      if (divider) divider.hidden = !visible;
    }

    async function fetchDevelopmentFile() {
      try {
        const response = await fetch(DEVELOPMENT_API_URL, { cache: 'no-cache' });
        if (!response.ok) return null;
        const item = await response.json();
        return {
          name: item.name,
          size: item.size,
          download_url: item.download_url
        };
      } catch (error) {
        return null;
      }
    }

    // Build the menu and return how many firmware options it holds.
    function render() {
      if (!groups) return;
      const previous = select.value;
      select.textContent = '';

      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = t('flash_catalog_placeholder');
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);

      let optionCount = 0;
      GROUP_ORDER.forEach(id => {
        const entries = groups.get(id) || [];
        if (!entries.length) return;

        const optgroup = document.createElement('optgroup');
        optgroup.label = GROUP_LABELS[id];
        entries.forEach(entry => {
          const option = document.createElement('option');
          option.value = entry.url;
          option.textContent = formatOptionLabel(entry);
          optgroup.appendChild(option);
          optionCount += 1;
        });
        select.appendChild(optgroup);
      });

      // Preserve the current choice across a re-render (e.g. language change).
      if (previous && select.querySelector(`option[value="${CSS.escape(previous)}"]`)) {
        select.value = previous;
      }
      return optionCount;
    }

    async function load() {
      if (loading || loaded || Date.now() < retryUntil) return;
      loading = true;
      try {
        const response = await fetch(API_URL, { cache: 'no-cache' });
        if (!response.ok) {
          // Rate limited: back off until GitHub's window resets so we stop
          // hammering the API on every Flash-view open.
          const remaining = response.headers.get('x-ratelimit-remaining');
          const reset = Number(response.headers.get('x-ratelimit-reset'));
          if ((response.status === 403 || response.status === 429) && remaining === '0' && reset) {
            retryUntil = reset * 1000;
          }
          throw new Error(`HTTP ${response.status}`);
        }
        const stableFiles = await response.json();
        const developmentFile = await fetchDevelopmentFile();
        const files = mergeCatalogFiles(stableFiles, developmentFile);
        groups = categorize(files);
        const count = render();
        showCatalog(count > 0);
        loaded = count > 0;
      } catch (error) {
        // No connection, or the API is unreachable / rate limited: keep the whole
        // picker hidden so only the local-file input remains — same as offline.
        // loaded stays false, so reopening the view (or coming back online, once
        // any rate-limit window has passed) retries the fetch.
        groups = null;
        showCatalog(false);
      } finally {
        loading = false;
      }
    }

    select.addEventListener('change', () => {
      const url = select.value;
      if (!url) return;
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.loadFirmwareFromURL === 'function') {
        flash.loadFirmwareFromURL(url);
      }
    });

    // Re-localize the placeholder and option groups when the language changes.
    window.addEventListener('uvstudio:languagechange', () => {
      if (groups) render();
    });

    // Mutual exclusivity: when a local file is picked, drop the catalog selection
    // back to its placeholder so only one firmware source ever looks selected.
    window.addEventListener('uvstudio:firmwareselect', event => {
      if (event.detail && event.detail.source === 'local' && select.options.length) {
        select.selectedIndex = 0;
      }
    });

    // Lazily fetch the catalog the first time the Flash view is opened, so users
    // who never flash do not spend a GitHub API call.
    window.addEventListener('uvstudio:toolviewchange', event => {
      if (event.detail && event.detail.view === 'flash') load();
    });

    // Retry once connectivity comes back after a failed load.
    window.addEventListener('online', () => { if (!loaded) load(); });

    // Load immediately only when Flash is the view actually shown on arrival
    // (flash-content is "active" by default, so also require the tools pane to be
    // the visible one — otherwise Live Viewer users would trigger a needless call).
    const paneTools = document.getElementById('pane-tools');
    const flashView = document.getElementById('flash-content');
    if (paneTools && paneTools.classList.contains('active') &&
        flashView && flashView.classList.contains('active')) {
      load();
    }
  }

  return Object.assign({}, pureApi, { boot });
});
