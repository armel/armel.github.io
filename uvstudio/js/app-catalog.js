// Overlay-app catalog: discovers versioned .app archives from
// archive/apps/v<firmware-version>/ on the main firmware repository.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVStudioAppCatalog = api;

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
  const BRANCH = 'main';
  const APPS_PATH = 'archive/apps';
  const API_ROOT = `https://api.github.com/repos/${REPO}/contents`;

  function contentsURL(path) {
    const encodedPath = String(path).split('/').map(encodeURIComponent).join('/');
    return `${API_ROOT}/${encodedPath}?ref=${encodeURIComponent(BRANCH)}`;
  }

  function compareVersionsDesc(a, b) {
    const pa = String(a).split('.').map(Number);
    const pb = String(b).split('.').map(Number);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
      const delta = (pb[i] || 0) - (pa[i] || 0);
      if (delta) return delta;
    }
    return 0;
  }

  function parseVersionDirectory(item) {
    if (!item || item.type !== 'dir' || typeof item.name !== 'string') return null;
    const match = item.name.match(/^v(\d+(?:\.\d+){2})$/i);
    if (!match) return null;
    return {
      version: match[1],
      directory: item.name,
      path: item.path || `${APPS_PATH}/${item.name}`
    };
  }

  function listVersions(items) {
    return (Array.isArray(items) ? items : [])
      .map(parseVersionDirectory)
      .filter(Boolean)
      .sort((a, b) => compareVersionsDesc(a.version, b.version));
  }

  function displayAppName(filename) {
    return String(filename)
      .replace(/\.app$/i, '')
      .replace(/[_-]+/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  function listApps(items) {
    return (Array.isArray(items) ? items : [])
      .filter(item => item && item.type === 'file' && /\.app$/i.test(item.name) && item.download_url)
      .map(item => ({
        name: item.name,
        label: displayAppName(item.name),
        size: item.size,
        url: item.download_url
      }))
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));
  }

  function formatAppLabel(app) {
    if (!Number.isFinite(app.size)) return app.label;
    return `${app.label} · ${(app.size / 1024).toFixed(1)} KB`;
  }

  function parseAppHeader(buffer) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (bytes.byteLength < 52) return null;
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (view.getUint32(0, true) !== 0x31504146) return null; // "FAP1"
    const readString = (offset, length) => {
      let value = '';
      for (let i = 0; i < length; i++) {
        const char = bytes[offset + i];
        if (!char) break;
        value += String.fromCharCode(char);
      }
      return value;
    };
    return { name: readString(20, 16), version: readString(36, 16) };
  }

  async function readAppMetadata(app) {
    const response = await fetch(app.url, {
      cache: 'no-cache',
      headers: { Range: 'bytes=0-63' }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const header = parseAppHeader(await response.arrayBuffer());
    if (!header || !header.name || !header.version) throw new Error('Invalid app header');
    return { ...header, url: app.url, filename: app.name };
  }

  function boot() {
    const section = document.getElementById('appCatalogSection');
    const divider = document.getElementById('appCatalogOr');
    const versionSelect = document.getElementById('appCatalogVersionSelect');
    const appSelect = document.getElementById('appCatalogSelect');
    if (!section || !versionSelect || !appSelect) return;

    let versions = [];
    let loaded = false;
    let loading = false;
    let appLoadSeq = 0;
    let metadataLoadSeq = 0;
    let compatibilityLoadSeq = 0;
    let requestedFirmwareVersion = '';
    const metadataCache = new Map();

    function t(key) {
      return window.uvStudioI18n ? window.uvStudioI18n.t(key) : key;
    }

    function resetSelect(select, key) {
      select.textContent = '';
      const option = document.createElement('option');
      option.value = '';
      option.disabled = true;
      option.selected = true;
      option.textContent = t(key);
      select.appendChild(option);
    }

    function hideCatalog() {
      section.hidden = true;
      if (divider) divider.hidden = true;
    }

    function showCatalog() {
      section.hidden = false;
      if (divider) divider.hidden = false;
    }

    async function fetchApps(versionEntry) {
      const response = await fetch(contentsURL(versionEntry.path), { cache: 'no-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return listApps(await response.json());
    }

    function loadAppMetadata(versionEntry, knownApps) {
      if (metadataCache.has(versionEntry.version)) return metadataCache.get(versionEntry.version);
      const request = (async () => {
        const apps = knownApps || await fetchApps(versionEntry);
        const settled = await Promise.allSettled(apps.map(readAppMetadata));
        if (settled.some(result => result.status === 'rejected')) {
          throw new Error('Incomplete app metadata');
        }
        return settled
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
      })();
      metadataCache.set(versionEntry.version, request);
      request.catch(() => { metadataCache.delete(versionEntry.version); });
      return request;
    }

    async function publishLatestAppVersions(versionEntry, knownApps) {
      const seq = ++metadataLoadSeq;
      try {
        const metadata = await loadAppMetadata(versionEntry, knownApps);
        if (seq !== metadataLoadSeq) return;
        window.dispatchEvent(new CustomEvent('uvstudio:appcatalogversions', {
          detail: { firmwareVersion: versionEntry.version, apps: metadata }
        }));
      } catch (error) {
        // Update information is supplementary; keep the catalog usable.
      }
    }

    async function publishCompatibleAppVersions() {
      const requested = requestedFirmwareVersion;
      if (!requested) return;
      const seq = ++compatibilityLoadSeq;
      const versionEntry = versions.find(entry => entry.version === requested);
      if (!versionEntry) {
        window.dispatchEvent(new CustomEvent('uvstudio:appcatalogcompatibility', {
          detail: { firmwareVersion: requested, found: false, apps: [] }
        }));
        return;
      }
      try {
        const metadata = await loadAppMetadata(versionEntry);
        if (seq !== compatibilityLoadSeq || requested !== requestedFirmwareVersion) return;
        window.dispatchEvent(new CustomEvent('uvstudio:appcatalogcompatibility', {
          detail: { firmwareVersion: requested, found: true, apps: metadata }
        }));
      } catch (error) {
        // Compatibility information is supplementary; keep the radio scan usable.
      }
    }

    async function loadApps(versionEntry) {
      const seq = ++appLoadSeq;
      resetSelect(appSelect, 'app_catalog_app_placeholder');
      appSelect.disabled = true;
      const apps = await fetchApps(versionEntry);
      if (seq !== appLoadSeq) return;
      apps.forEach(app => {
        const option = document.createElement('option');
        option.value = app.url;
        option.dataset.appName = app.name;
        option.textContent = formatAppLabel(app);
        appSelect.appendChild(option);
      });
      appSelect.disabled = apps.length === 0;
      return apps;
    }

    async function load() {
      if (loading || loaded) return;
      loading = true;
      try {
        const response = await fetch(contentsURL(APPS_PATH), { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        versions = listVersions(await response.json());
        if (!versions.length) throw new Error('No app versions');

        resetSelect(versionSelect, 'app_catalog_version_placeholder');
        versions.forEach(entry => {
          const option = document.createElement('option');
          option.value = entry.directory;
          option.textContent = entry.version;
          versionSelect.appendChild(option);
        });
        versionSelect.value = versions[0].directory;
        const latestApps = await loadApps(versions[0]);
        showCatalog();
        loaded = true;
        void publishLatestAppVersions(versions[0], latestApps);
        void publishCompatibleAppVersions();
      } catch (error) {
        hideCatalog();
      } finally {
        loading = false;
      }
    }

    versionSelect.addEventListener('change', () => {
      const selected = versions.find(entry => entry.directory === versionSelect.value);
      if (!selected) return;
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.clearAppFromCatalog === 'function') flash.clearAppFromCatalog();
      loadApps(selected).catch(() => {
        resetSelect(appSelect, 'app_catalog_app_placeholder');
        appSelect.disabled = true;
      });
    });

    appSelect.addEventListener('change', () => {
      const option = appSelect.options[appSelect.selectedIndex];
      const url = appSelect.value;
      if (!url || !option) return;
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.loadAppFromURL === 'function') {
        flash.loadAppFromURL(url, option.dataset.appName || 'application.app');
      }
    });

    window.addEventListener('uvstudio:appselect', event => {
      if (event.detail && event.detail.source === 'local' && appSelect.options.length) {
        appSelect.selectedIndex = 0;
      }
    });

    window.addEventListener('uvstudio:appfirmwareversion', event => {
      requestedFirmwareVersion = String(event.detail?.firmwareVersion || '');
      if (loaded) void publishCompatibleAppVersions();
    });

    window.addEventListener('uvstudio:languagechange', () => {
      const selectedVersion = versionSelect.value;
      const selectedApp = appSelect.value;
      const versionPlaceholder = versionSelect.options[0];
      const appPlaceholder = appSelect.options[0];
      if (versionPlaceholder) versionPlaceholder.textContent = t('app_catalog_version_placeholder');
      if (appPlaceholder) appPlaceholder.textContent = t('app_catalog_app_placeholder');
      if (selectedVersion) versionSelect.value = selectedVersion;
      if (selectedApp) appSelect.value = selectedApp;
    });

    window.addEventListener('uvstudio:toolviewchange', event => {
      if (event.detail && event.detail.view === 'apps') load();
    });
    window.addEventListener('online', () => { if (!loaded) load(); });

    const paneTools = document.getElementById('pane-tools');
    const appsView = document.getElementById('apps-content');
    if (paneTools && paneTools.classList.contains('active') &&
        appsView && appsView.classList.contains('active')) {
      load();
    }
  }

  return {
    boot,
    compareVersionsDesc,
    contentsURL,
    displayAppName,
    formatAppLabel,
    listApps,
    listVersions,
    parseAppHeader,
    parseVersionDirectory,
    readAppMetadata
  };
});
