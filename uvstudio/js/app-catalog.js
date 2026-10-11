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
  const RAW_ROOT = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
  const FALLBACK_VERSION = {
    version: '6.1.0',
    directory: 'v6.1.0',
    path: 'archive/apps/v6.1.0'
  };
  const FALLBACK_APP_FILES = [
    ['APRSRX.app', 7987], ['APRSTX.app', 7373], ['Beacon.app', 2970],
    ['Beam.app', 1434], ['Breakout.app', 3072], ['BroadcastFM.app', 2458],
    ['Cube3D.app', 3789], ['CWDecode.app', 4608], ['CWKeyer.app', 3789],
    ['EPIRB406.app', 4608], ['FoxHunt.app', 2662], ['Minesweeper.app', 3891],
    ['Plasma.app', 2355], ['RapidRoll.app', 3584], ['SigFinder.app', 3584],
    ['Snake.app', 3072], ['SpaceImpact.app', 4506], ['Spectrum3D.app', 4096],
    ['SSTV.app', 5734], ['SystemInfo.app', 5325], ['Tetris.app', 3891]
  ];

  // Presentation metadata deliberately lives in UV Studio, not in the radio or
  // the FAP1 binary header. It can later be replaced by a generated catalog
  // manifest without changing the firmware protocol.
  const APP_DETAILS = {
    aprsrx:      ['radio', 'Receive and decode APRS packets.'],
    aprstx:      ['radio', 'Transmit APRS beacons from the radio.'],
    beacon:      ['radio', 'Send a configurable radio beacon.'],
    beam:        ['tools', 'Transfer a channel between compatible radios.'],
    breakout:    ['games', 'A compact version of the classic arcade game.'],
    broadcastfm: ['radio', 'Listen to broadcast FM stations.'],
    cwdecode:    ['radio', 'Decode Morse code in real time.'],
    cwkeyer:     ['radio', 'Morse keyer with adjustable speed and tone.'],
    cube3d:      ['demos', 'Animated 3D graphics demonstration.'],
    epirb406:    ['radio', 'Analyze and decode 406 MHz beacon frames.'],
    foxhunt:     ['radio', 'Assist with radio direction finding.'],
    minesweeper: ['games', 'The classic mine-clearing puzzle.'],
    plasma:      ['demos', 'Animated plasma graphics demonstration.'],
    rapidroll:   ['games', 'Fast vertical arcade game.'],
    sigfinder:   ['radio', 'Find signal direction and strength.'],
    snake:       ['games', 'Classic Snake for the radio keypad.'],
    spaceimpact: ['games', 'Side-scrolling space arcade game.'],
    spectrum3d:  ['radio', 'Experimental 3D spectrum visualization.'],
    sstv:        ['radio', 'Receive SSTV images on the radio display.'],
    systeminfo:  ['tools', 'Inspect firmware, memory and device information.'],
    tetris:      ['games', 'The classic falling-block puzzle.']
  };
  const APP_DESCRIPTIONS_FR = {
    aprsrx: 'Réception et décodage des paquets APRS.',
    aprstx: 'Émission de balises APRS depuis la radio.',
    beacon: 'Émission d’une balise radio configurable.',
    beam: 'Transfert d’un canal entre radios compatibles.',
    breakout: 'Une version compacte du jeu d’arcade classique.',
    broadcastfm: 'Écoute des stations de radiodiffusion FM.',
    cwdecode: 'Décodage du Morse en temps réel.',
    cwkeyer: 'Manipulateur Morse à vitesse et tonalité réglables.',
    cube3d: 'Démonstration graphique 3D animée.',
    epirb406: 'Analyse et décodage des trames de balises 406 MHz.',
    foxhunt: 'Assistance à la radiogoniométrie.',
    minesweeper: 'Le classique jeu de déminage.',
    plasma: 'Démonstration graphique plasma animée.',
    rapidroll: 'Jeu d’arcade vertical rapide.',
    sigfinder: 'Recherche de la direction et du niveau d’un signal.',
    snake: 'Le classique Snake adapté au clavier de la radio.',
    spaceimpact: 'Jeu d’arcade spatial à défilement horizontal.',
    spectrum3d: 'Visualisation expérimentale du spectre en 3D.',
    sstv: 'Réception d’images SSTV sur l’écran de la radio.',
    systeminfo: 'Informations sur le firmware, la mémoire et la radio.',
    tetris: 'Le classique jeu de blocs qui tombent.'
  };
  const APP_DISPLAY_NAMES = {
    aprsrx: 'APRS RX', aprstx: 'APRS TX', broadcastfm: 'Broadcast FM',
    cwdecode: 'CW Decode', cwkeyer: 'CW Keyer', cube3d: 'Cube 3D',
    epirb406: 'EPIRB 406', sigfinder: 'Signal Finder', spaceimpact: 'Space Impact',
    spectrum3d: 'Spectrum 3D', systeminfo: 'System Info'
  };
  const APP_ACTION_ICONS = {
    install: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    update: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v6h-6"/>',
    delete: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/>'
  };
  const APP_ICONS = {
    aprsrx: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M17.5 4v10m-3-3 3 3 3-3"/>',
    aprstx: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M17.5 14V4m-3 3 3-3 3 3"/>',
    beacon: '<path d="M12 20V10m-4 10h8m-6-4 2-6 2 6M8.2 9a5.2 5.2 0 0 1 7.6 0M5.5 6.5a9 9 0 0 1 13 0"/><circle cx="12" cy="7.5" r="1.2"/>',
    beam: '<rect x="3.5" y="6" width="5" height="12" rx="1.2"/><rect x="15.5" y="6" width="5" height="12" rx="1.2"/><path d="M5 9h2m10 0h2M10 10h4m-2-2 2 2-2 2m2 2h-4m2 2-2-2 2-2"/>',
    breakout: '<rect x="3" y="4" width="4.5" height="3" rx=".4"/><rect x="9.75" y="4" width="4.5" height="3" rx=".4"/><rect x="16.5" y="4" width="4.5" height="3" rx=".4"/><rect x="6.4" y="9" width="4.5" height="3" rx=".4"/><rect x="13.1" y="9" width="4.5" height="3" rx=".4"/><circle cx="12" cy="15" r="1.2"/><path d="M7.5 20h9v-2h-9z"/>',
    broadcastfm: '<rect x="3.5" y="7.5" width="17" height="11.5" rx="2"/><path d="m7 7.5 9-4M7 11h7m-7 3h5"/><circle cx="17" cy="13" r="2.2"/><path d="M17 16.5v.1"/>',
    cwdecode: '<circle cx="4" cy="5.5" r="1"/><path d="M7 5.5h4"/><circle cx="14" cy="5.5" r="1"/><path d="M17 5.5h4M12 9v4m-2-2 2 2 2-2M5 16h14M7 19h10M9 22h6"/>',
    cwkeyer: '<path d="M3 20h18M10 20v-6M6 11.5l12 2M17.5 20v-5"/><circle cx="4.5" cy="11.2" r="1.7"/><circle cx="10" cy="14" r="1.15"/><circle cx="17.5" cy="14" r=".8"/>',
    cube3d: '<path d="m12 3.5 7 4v8l-7 4-7-4v-8zm0 0v8m7-4-7 4-7-4m7 4v8"/>',
    epirb406: '<path d="M12 6V2M8.5 7.5A5.5 5.5 0 0 0 6 11m9.5-3.5A5.5 5.5 0 0 1 18 11M10 7h4l2 5v5a4 4 0 0 1-8 0v-5zM8 13h8M10 10h4M4 21c1.3-1 2.7-1 4 0s2.7 1 4 0 2.7-1 4 0 2.7 1 4 0"/>',
    foxhunt: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 2.5v3m0 13v3m-9.5-9.5h3m13 0h3m-7-2.5L18 6l-3.5 3.5z"/>',
    minesweeper: '<path d="M4.5 4.5h15v15h-15zm5 0v15m5-15v15m-10-10h15m-15 5h15"/><circle cx="12" cy="12" r="1.65"/><path d="M12 8.8v1m0 4.4v1m-3.2-3.2h1m4.4 0h1"/>',
    plasma: '<path d="M3 7c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 5 21 6M3 12c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 10 21 11M3 17c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 15 21 16"/>',
    rapidroll: '<circle cx="12" cy="5.5" r="2.2"/><path d="M3.5 10.5h7m3 4h7m-13 4h8M10 9l2 2 2-2"/>',
    sigfinder: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v2m0 13v2m-8.5-8.5h2m13 0h2M12 5l2 7-2 7-2-7z"/><path d="m12 5 2 7h-4z" fill="currentColor" stroke="none"/>',
    snake: '<path d="M5 17h5a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2h3"/><circle cx="18.3" cy="8" r="1.9"/><circle cx="18.8" cy="7.5" r=".3" fill="currentColor" stroke="none"/><path d="M5 17l-1.5-1.5M5 17l-1.5 1.5"/>',
    spaceimpact: '<path d="M3.5 12 9 8.2l7 .8 4.5 3-4.5 3-7 .8zM9 8.2 7 5.5m2 10.3L7 18.5M16 9v6"/><path d="M2.5 8h2m-2 8h2"/>',
    spectrum3d: '<path d="m4 18 5 2 11-5-5-2zM6 16V9m3 8V6m3 9V4m3 10V8m3 7v-5M4 18l5 2m0 0 11-5"/>',
    sstv: '<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="m8 7-3-4m11 4 3-4M7 16l3-3 2.5 2 2.5-3 2 2.5M8 21h8"/><circle cx="16.5" cy="10.5" r="1"/>',
    systeminfo: '<rect x="7" y="7" width="10" height="10" rx="1.2"/><rect x="10" y="10" width="4" height="4" rx=".5"/><path d="M9 3v4m3-4v4m3-4v4M9 17v4m3-4v4m3-4v4M3 9h4m-4 3h4m-4 3h4m10-6h4m-4 3h4m-4 3h4"/>',
    tetris: '<path d="M5 5h4v4H5zm4 0h4v4H9zm0 4h4v4H9zm4 4h4v4h-4zm4 0h4v4h-4zm-4 4h4v4h-4z"/>'
  };

  function appCatalogId(filename) {
    return String(filename).replace(/\.app$/i, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  }

  function appIconSVG(id) {
    return APP_ICONS[String(id)] || '';
  }

  function setCatalogActionContent(button, icon, label) {
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${APP_ACTION_ICONS[icon] || ''}</svg>`;
    const text = document.createElement('span');
    text.textContent = label;
    button.appendChild(text);
  }

  function appDetails(filename) {
    const id = appCatalogId(filename);
    const detail = APP_DETAILS[id] || ['other', 'Overlay app for F4HWN Labs.'];
    return {
      id,
      category: detail[0],
      description: detail[1],
      descriptionFr: APP_DESCRIPTIONS_FR[id] || '',
      ...(APP_DISPLAY_NAMES[id] ? { label: APP_DISPLAY_NAMES[id] } : {})
    };
  }

  function contentsURL(path) {
    const encodedPath = String(path).split('/').map(encodeURIComponent).join('/');
    return `${API_ROOT}/${encodedPath}?ref=${encodeURIComponent(BRANCH)}`;
  }

  function fallbackApps(versionEntry = FALLBACK_VERSION) {
    if (versionEntry.version !== FALLBACK_VERSION.version) return [];
    return listApps(FALLBACK_APP_FILES.map(([name, size]) => ({
      type: 'file',
      name,
      size,
      download_url: `${RAW_ROOT}/${versionEntry.path}/${encodeURIComponent(name)}`
    })));
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

  function compareAppVersions(current, available) {
    const parse = value => String(value || '')
      .replace(/^v/i, '')
      .split(/[.-]/)
      .map(part => {
        const match = part.match(/^(\d+)(.*)$/);
        return match ? { number: Number(match[1]), suffix: match[2] } : { number: 0, suffix: part };
      });
    if (!current || !available) return null;
    const left = parse(current);
    const right = parse(available);
    const length = Math.max(left.length, right.length);
    for (let index = 0; index < length; index++) {
      const a = left[index] || { number: 0, suffix: '' };
      const b = right[index] || { number: 0, suffix: '' };
      if (a.number !== b.number) return a.number < b.number ? -1 : 1;
      if (a.suffix !== b.suffix) {
        if (!a.suffix) return 1;
        if (!b.suffix) return -1;
        return a.suffix.localeCompare(b.suffix, undefined, { numeric: true });
      }
    }
    return 0;
  }

  function catalogAppState(installed, available) {
    if (!installed) return 'install';
    const comparison = compareAppVersions(installed.version, available?.version);
    return comparison !== null && comparison < 0 ? 'update' : 'current';
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
        url: item.download_url,
        ...appDetails(item.name)
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
    const cardsEl = document.getElementById('appCatalogCards');
    const searchEl = document.getElementById('appCatalogSearch');
    const filtersEl = document.getElementById('appCategoryFilters');
    const resultCountEl = document.getElementById('appCatalogResultCount');
    const firmwareHintEl = document.getElementById('appCatalogFirmwareHint');
    const emptyEl = document.getElementById('appCatalogEmpty');
    const catalogTabEl = document.getElementById('appCatalogTab');
    const catalogTabCountEl = document.getElementById('appCatalogTabCount');
    if (!section || !versionSelect || !appSelect) return;

    let versions = [];
    let loaded = false;
    let loading = false;
    let appLoadSeq = 0;
    let metadataLoadSeq = 0;
    let compatibilityLoadSeq = 0;
    let requestedFirmwareVersion = '';
    let currentVersionEntry = null;
    let currentApps = [];
    let activeCategory = 'all';
    let currentMetadata = new Map();
    let inventoryReady = false;
    let freeSlots = 0;
    let installedApps = new Map();
    let catalogOperationPending = false;
    const metadataCache = new Map();

    function t(key, ...values) {
      return window.uvStudioI18n ? window.uvStudioI18n.t(key, ...values) : key;
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

    function categoryLabel(category) {
      return t({
        radio: 'appCategoryRadio',
        tools: 'appCategoryTools',
        games: 'appCategoryGames',
        demos: 'appCategoryDemos',
        other: 'appCategoryOther'
      }[category] || 'appCategoryTools');
    }

    function appMonogram(label) {
      const words = String(label).trim().split(/\s+/).filter(Boolean);
      if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
      return String(label).replace(/\s/g, '').slice(0, 2).toUpperCase();
    }

    function createAppIcon(app) {
      const icon = document.createElement('div');
      icon.className = 'app-catalog-icon';
      const graphic = appIconSVG(app.id);
      if (!graphic) {
        icon.textContent = appMonogram(app.label);
        return icon;
      }
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.innerHTML = graphic;
      icon.classList.add('has-svg');
      icon.appendChild(svg);
      return icon;
    }

    function applyCatalogFilter() {
      if (!cardsEl) return;
      const query = String(searchEl?.value || '').trim().toLocaleLowerCase();
      let visible = 0;
      cardsEl.querySelectorAll('.app-catalog-card').forEach(card => {
        const categoryMatches = activeCategory === 'all' || card.dataset.category === activeCategory;
        const queryMatches = !query || String(card.dataset.search || '').includes(query);
        card.hidden = !(categoryMatches && queryMatches);
        if (!card.hidden) visible++;
      });
      if (resultCountEl) resultCountEl.textContent = t('appManagerResultCount', visible);
      if (emptyEl) emptyEl.hidden = visible !== 0;
    }

    async function runCatalogOperation(operation) {
      if (catalogOperationPending) return;
      catalogOperationPending = true;
      renderCatalogCards();
      try {
        await operation();
      } finally {
        catalogOperationPending = false;
        renderCatalogCards();
      }
    }

    function selectCatalogApp(app) {
      const option = [...appSelect.options].find(item => item.value === app.url);
      if (option) appSelect.value = app.url;
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.installAppFromURL === 'function') {
        void runCatalogOperation(() => flash.installAppFromURL(app.url, app.name));
      } else if (flash && typeof flash.loadAppFromURL === 'function') {
        flash.loadAppFromURL(app.url, app.name);
      }
    }

    function renderCatalogCards() {
      if (!cardsEl) return;
      const otherFilter = filtersEl?.querySelector('[data-category="other"]');
      const hasOtherApps = currentApps.some(app => app.category === 'other');
      if (otherFilter) otherFilter.hidden = !hasOtherApps;
      if (!hasOtherApps && activeCategory === 'other') {
        activeCategory = 'all';
        filtersEl?.querySelectorAll('[data-category]').forEach(item => {
          item.classList.toggle('active', item.dataset.category === 'all');
        });
      }
      cardsEl.textContent = '';
      currentApps.forEach(app => {
        const metadata = currentMetadata.get(appCatalogId(app.name));
        const installed = installedApps.get(appCatalogId(app.name));
        const state = catalogAppState(installed, metadata);
        const card = document.createElement('article');
        card.className = 'app-catalog-card';
        card.dataset.category = app.category;
        card.dataset.state = state;
        const descriptionText = window.uvStudioI18n?.lang === 'fr' && app.descriptionFr
          ? app.descriptionFr
          : app.description;
        card.dataset.search = `${app.label} ${app.description} ${app.descriptionFr || ''} ${app.category}`.toLocaleLowerCase();

        const icon = createAppIcon(app);

        const content = document.createElement('div');
        content.className = 'app-catalog-content';
        const title = document.createElement('div');
        title.className = 'app-catalog-title';
        const name = document.createElement('strong');
        name.textContent = app.label;
        const tag = document.createElement('span');
        tag.className = 'app-catalog-tag';
        tag.textContent = categoryLabel(app.category);
        title.append(name, tag);
        if (installed && state === 'current') {
          const installedTag = document.createElement('span');
          installedTag.className = 'app-catalog-status';
          installedTag.textContent = t('updateCurrent');
          title.appendChild(installedTag);
        }
        const description = document.createElement('p');
        description.className = 'app-catalog-description';
        description.textContent = descriptionText;
        const meta = document.createElement('div');
        meta.className = 'app-catalog-meta';
        const version = document.createElement('span');
        version.textContent = installed?.version && metadata?.version && state === 'update'
          ? `v${installed.version.replace(/^v/i, '')} → v${metadata.version.replace(/^v/i, '')}`
          : (metadata?.version ? `v${metadata.version.replace(/^v/i, '')}` : currentVersionEntry?.version || '—');
        const size = document.createElement('span');
        size.textContent = Number.isFinite(app.size) ? `${(app.size / 1024).toFixed(1)} KB` : '—';
        meta.append(version, size);
        content.append(title, description, meta);

        const actions = document.createElement('div');
        actions.className = 'app-catalog-actions';
        if (!installed) {
          const install = document.createElement('button');
          install.type = 'button';
          install.className = 'btn app-catalog-action app-catalog-install';
          setCatalogActionContent(install, 'install', t('appInstallBtn'));
          install.disabled = catalogOperationPending || !inventoryReady || freeSlots === 0;
          install.title = !inventoryReady
            ? t('appManagerScanBeforeInstall')
            : (freeSlots === 0 ? t('appManagerNoFreeSlot') : '');
          install.addEventListener('click', () => selectCatalogApp(app));
          actions.appendChild(install);
        } else {
          if (state === 'update') {
            const update = document.createElement('button');
            update.type = 'button';
            update.className = 'btn app-catalog-action app-catalog-update';
            setCatalogActionContent(update, 'update', t('appUpdateAction', metadata.version.replace(/^v/i, '')));
            update.disabled = catalogOperationPending || !inventoryReady;
            update.addEventListener('click', () => {
              const flash = window.UVStudioFlash;
              if (flash && typeof flash.updateAppFromURL === 'function') {
                void runCatalogOperation(() => flash.updateAppFromURL(installed.slot, app.url, app.name));
              }
            });
            actions.appendChild(update);
          }
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.className = 'btn app-catalog-action app-catalog-delete';
          setCatalogActionContent(remove, 'delete', t('appDelete'));
          remove.disabled = catalogOperationPending || !inventoryReady;
          remove.addEventListener('click', () => {
            const flash = window.UVStudioFlash;
            if (flash && typeof flash.deleteAppSlot === 'function') {
              void runCatalogOperation(() => flash.deleteAppSlot(installed.slot));
            }
          });
          actions.appendChild(remove);
        }
        card.append(icon, content, actions);
        cardsEl.appendChild(card);
      });
      if (catalogTabCountEl) catalogTabCountEl.textContent = String(currentApps.length);
      if (firmwareHintEl) firmwareHintEl.textContent = currentVersionEntry
        ? t('appManagerForFirmware', currentVersionEntry.version)
        : '';
      applyCatalogFilter();
    }

    async function fetchApps(versionEntry) {
      try {
        const response = await fetch(contentsURL(versionEntry.path), { cache: 'no-cache' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return listApps(await response.json());
      } catch (error) {
        const fallback = fallbackApps(versionEntry);
        if (fallback.length) return fallback;
        throw error;
      }
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
        if (currentVersionEntry?.version === versionEntry.version) {
          currentMetadata = new Map(metadata.map(app => [appCatalogId(app.filename || app.name), app]));
          renderCatalogCards();
        }
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
      currentVersionEntry = versionEntry;
      currentApps = apps;
      currentMetadata = new Map();
      apps.forEach(app => {
        const option = document.createElement('option');
        option.value = app.url;
        option.dataset.appName = app.name;
        option.textContent = formatAppLabel(app);
        appSelect.appendChild(option);
      });
      appSelect.disabled = apps.length === 0;
      renderCatalogCards();
      return apps;
    }

    async function load() {
      if (loading || loaded) return;
      loading = true;
      try {
        try {
          const response = await fetch(contentsURL(APPS_PATH), { cache: 'no-cache' });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          versions = listVersions(await response.json());
          if (!versions.length) throw new Error('No app versions');
        } catch (error) {
          versions = [{ ...FALLBACK_VERSION }];
        }

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
      loadApps(selected).then(apps => {
        if (apps) void publishLatestAppVersions(selected, apps);
      }).catch(() => {
        resetSelect(appSelect, 'app_catalog_app_placeholder');
        appSelect.disabled = true;
      });
    });

    if (searchEl) searchEl.addEventListener('input', applyCatalogFilter);
    if (catalogTabEl) catalogTabEl.addEventListener('click', () => {
      if (!loaded && !loading) void load();
    });
    if (filtersEl) filtersEl.addEventListener('click', event => {
      const button = event.target.closest('[data-category]');
      if (!button) return;
      activeCategory = button.dataset.category || 'all';
      filtersEl.querySelectorAll('[data-category]').forEach(item => {
        item.classList.toggle('active', item === button);
      });
      applyCatalogFilter();
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

    window.addEventListener('uvstudio:appinventory', event => {
      inventoryReady = event.detail?.ready === true;
      freeSlots = Number(event.detail?.free || 0);
      const apps = Array.isArray(event.detail?.apps) ? event.detail.apps : [];
      installedApps = new Map(apps
        .filter(app => app && Number.isInteger(app.slot) && app.name)
        .map(app => [appCatalogId(app.name), app]));
      renderCatalogCards();
    });

    window.addEventListener('uvstudio:appfirmwareversion', event => {
      requestedFirmwareVersion = String(event.detail?.firmwareVersion || '');
      if (loaded) {
        const matching = versions.find(entry => entry.version === requestedFirmwareVersion);
        if (matching && versionSelect.value !== matching.directory) {
          versionSelect.value = matching.directory;
          loadApps(matching).then(apps => {
            if (apps) void publishLatestAppVersions(matching, apps);
          }).catch(() => {});
        }
        void publishCompatibleAppVersions();
      }
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
      renderCatalogCards();
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
    appCatalogId,
    appDetails,
    appIconSVG,
    catalogAppState,
    compareAppVersions,
    compareVersionsDesc,
    contentsURL,
    displayAppName,
    formatAppLabel,
    fallbackApps,
    listApps,
    listVersions,
    parseAppHeader,
    parseVersionDirectory,
    readAppMetadata
  };
});
