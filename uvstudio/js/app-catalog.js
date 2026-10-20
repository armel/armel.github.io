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
  // main, or the development branch when the hidden developer switch is on.
  const BRANCH = (typeof globalThis !== 'undefined' && globalThis.UVStudioPreferences &&
    typeof globalThis.UVStudioPreferences.catalogBranch === 'function')
    ? globalThis.UVStudioPreferences.catalogBranch()
    : 'main';
  const APPS_PATH = 'archive/apps';
  const API_ROOT = `https://api.github.com/repos/${REPO}/contents`;
  const RAW_ROOT = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
  const FALLBACK_VERSION = {
    version: '6.1.0',
    directory: 'v6.1.0',
    path: 'archive/apps/v6.1.0'
  };
  const FALLBACK_APP_FILES = [
    ['ACARSRX.app', 4516], ['APRSDIGI.app', 3960],
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
    acarsrx:     ['radio', 'Receive and decode ACARS aircraft messages.'],
    aisrx:       ['radio', 'Receive AIS ship reports: name, position, speed, course, destination and Inland data.'],
    aprsdigi:    ['radio', 'Relay APRS packets as a digipeater.'],
    aprsedit:    ['radio', 'Edit the APRS TX beacon: callsign, position, symbol and comment.'],
    aprsrx:      ['radio', 'Receive and decode APRS packets.'],
    aprstx:      ['radio', 'Transmit APRS beacons from the radio.'],
    atisrx:      ['radio', 'Identify inland-waterway boats from their ATIS signal.'],
    beacon:      ['radio', 'Send a configurable radio beacon.'],
    beam:        ['tools', 'Transfer a channel between compatible radios.'],
    breakout:    ['games', 'A compact version of the classic arcade game.'],
    broadcastfm: ['radio', 'Listen to broadcast FM stations.'],
    cwdecode:    ['radio', 'Decode Morse code in real time.'],
    cwkeyer:     ['radio', "Morse keyer using the radio's PTT and side keys."],
    cwusb:       ['radio', 'Morse keyer for an external paddle connected through USB-C.'],
    cube3d:      ['demos', 'Animated 3D graphics demonstration.'],
    epirb406:    ['radio', 'Analyze and decode 406 MHz beacon frames.'],
    flashmap:    ['tools', 'Browse the external flash map: firmware slots, apps, active state and a hex viewer.'],
    foxhunt:     ['radio', 'Assist with radio direction finding.'],
    hellmaze:    ['games', 'First-person shooter in a demon-haunted maze.'],
    minesweeper: ['games', 'The classic mine-clearing puzzle.'],
    plasma:      ['demos', 'Animated plasma graphics demonstration.'],
    pocsagrx:    ['radio', 'Receive POCSAG pager messages (DAPNET).'],
    rapidroll:   ['games', 'Fast vertical arcade game.'],
    resistor:    ['tools', 'Read resistor color codes: value, tolerance and temperature coefficient (3 to 6 bands).'],
    sigfinder:   ['radio', 'Find signal direction and strength.'],
    snake:       ['games', 'Classic Snake for the radio keypad.'],
    sokoban:     ['games', 'The classic box-pushing puzzle.'],
    sondem10:    ['radio', 'Decode Meteomodem M10 radiosondes: ID, position, altitude, temperature.'],
    sondem20:    ['radio', 'Decode Meteomodem M20 radiosondes: ID, position, altitude, temperature.'],
    sonders41:   ['radio', 'Decode Vaisala RS41 radiosondes: ID, position, altitude, vertical speed, satellite count.'],
    spaceimpact: ['games', 'Side-scrolling space arcade game.'],
    spectrum3d:  ['radio', 'Experimental 3D spectrum visualization.'],
    sstv:        ['radio', 'Receive SSTV images on the radio display.'],
    systeminfo:  ['tools', 'Inspect firmware, memory and device information.'],
    tetris:      ['games', 'The classic falling-block puzzle.'],
    tonecall:    ['radio', 'Send configurable ZVEI or CCIR selective calling tone sequences.']
  };
  const APP_DISPLAY_NAMES = {
    acarsrx: 'ACARS RX', aisrx: 'AIS RX', aprsdigi: 'APRS DIGI', aprsedit: 'APRS Edit',
    aprsrx: 'APRS RX', aprstx: 'APRS TX', atisrx: 'ATIS RX', broadcastfm: 'Broadcast FM',
    cwdecode: 'CW Decode', cwkeyer: 'CW Keyer', cwusb: 'CW USB', cube3d: 'Cube 3D',
    epirb406: 'EPIRB 406', flashmap: 'Flash Map', hellmaze: 'Hell Maze', pocsagrx: 'POCSAG RX', sigfinder: 'Signal Finder', sondem10: 'Sonde M10', sondem20: 'Sonde M20', sonders41: 'Sonde RS41',
    spaceimpact: 'Space Impact',
    spectrum3d: 'Spectrum 3D', systeminfo: 'System Info', tonecall: 'ToneCall'
  };
  const APP_ACTION_ICONS = {
    install: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    update: '<path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v6h-6"/>',
    delete: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/>'
  };
  const APP_ICONS = {
    acarsrx: '<path d="M12 3v16m0-11 7 5v1.5l-7-2.5m0-4-7 5v1.5l7-2.5m-3 8.5 3-1.5 3 1.5"/>',
    aisrx: '<path d="M9 18 12 9l3 9-3-1.6zM12 9V3.5M8.7 4.5a4.5 4.5 0 0 0 0 6M15.3 4.5a4.5 4.5 0 0 1 0 6M3 21.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/>',
    aprsdigi: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M15 14V4m-2 2.5 2-2.5 2 2.5M19.5 4v10m-2-2.5 2 2.5 2-2.5"/>',
    aprsedit: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M19.5 4 21 5.5l-5 5-2 .5.5-2zM14 14h7"/>',
    aprsrx: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M17.5 4v10m-3-3 3 3 3-3"/>',
    aprstx: '<path d="M8 20v-8m-3 8h6m-5-4 2-4 2 4M3.5 12a4.8 4.8 0 0 1 9 0M17.5 14V4m-3 3 3-3 3 3"/>',
    atisrx: '<path d="M3 13.5h18l-2.5 4.5h-13zM7.5 13.5v-4h6l2.5 4M10.5 9.5V4.5M13.5 3.5a3.5 3.5 0 0 1 0 4M16 2a6.5 6.5 0 0 1 0 7M3 21.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0"/>',
    beacon: '<path d="M12 20V10m-4 10h8m-6-4 2-6 2 6M8.2 9a5.2 5.2 0 0 1 7.6 0M5.5 6.5a9 9 0 0 1 13 0"/><circle cx="12" cy="7.5" r="1.2"/>',
    beam: '<rect x="3.5" y="6" width="5" height="12" rx="1.2"/><rect x="15.5" y="6" width="5" height="12" rx="1.2"/><path d="M5 9h2m10 0h2M10 10h4m-2-2 2 2-2 2m2 2h-4m2 2-2-2 2-2"/>',
    breakout: '<rect x="3" y="4" width="4.5" height="3" rx=".4"/><rect x="9.75" y="4" width="4.5" height="3" rx=".4"/><rect x="16.5" y="4" width="4.5" height="3" rx=".4"/><rect x="6.4" y="9" width="4.5" height="3" rx=".4"/><rect x="13.1" y="9" width="4.5" height="3" rx=".4"/><circle cx="12" cy="15" r="1.2"/><path d="M7.5 20h9v-2h-9z"/>',
    broadcastfm: '<rect x="3.5" y="7.5" width="17" height="11.5" rx="2"/><path d="m7 7.5 9-4M7 11h7m-7 3h5"/><circle cx="17" cy="13" r="2.2"/><path d="M17 16.5v.1"/>',
    cwdecode: '<circle cx="4" cy="5.5" r="1"/><path d="M7 5.5h4"/><circle cx="14" cy="5.5" r="1"/><path d="M17 5.5h4M12 9v4m-2-2 2 2 2-2M5 16h14M7 19h10M9 22h6"/>',
    cwkeyer: '<path d="M3 20h18M10 20v-6M6 11.5l12 2M17.5 20v-5"/><circle cx="4.5" cy="11.2" r="1.7"/><circle cx="10" cy="14" r="1.15"/><circle cx="17.5" cy="14" r=".8"/>',
    cwusb: '<path d="M3 20h18M10 20v-6M6 11.5l12 2M17.5 20v-5"/><circle cx="4.5" cy="11.2" r="1.7"/><circle cx="10" cy="14" r="1.15"/><circle cx="17.5" cy="14" r=".8"/><path d="M9.6 6h11M13.3 6l3.2-3.2h.4M13.3 6l3.2 3.2h1.3"/><circle cx="8.2" cy="6" r="1.45" fill="currentColor" stroke="none"/><circle cx="18" cy="2.8" r="1.1" fill="currentColor" stroke="none"/><rect x="17.8" y="8.1" width="2.2" height="2.2" rx=".15" fill="currentColor" stroke="none"/><path d="m23 6-3-2v4z" fill="currentColor" stroke="none"/>',
    cube3d: '<path d="m12 3.5 7 4v8l-7 4-7-4v-8zm0 0v8m7-4-7 4-7-4m7 4v8"/>',
    epirb406: '<path d="M12 6V2M8.5 7.5A5.5 5.5 0 0 0 6 11m9.5-3.5A5.5 5.5 0 0 1 18 11M10 7h4l2 5v5a4 4 0 0 1-8 0v-5zM8 13h8M10 10h4M4 21c1.3-1 2.7-1 4 0s2.7 1 4 0 2.7-1 4 0 2.7 1 4 0"/>',
    flashmap: '<rect x="4" y="3" width="10" height="18" rx="1.5"/><path d="M4 8h10M4 12.5h10M4 16.5h10M17 5.5h3.5M17 10.2h2.5M17 14.5h3.5M17 18.8h2"/><path d="M6 5h6v1.4H6zM6 14.1h6v.9H6z" fill="currentColor" stroke="none"/>',
    foxhunt: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 2.5v3m0 13v3m-9.5-9.5h3m13 0h3m-7-2.5L18 6l-3.5 3.5z"/>',
    hellmaze: '<path d="M4 16V4h16M20 8v12H4M8 4v8m4-4h8m-8 0v8m-4 0h8m0-4v8"/>',
    minesweeper: '<path d="M4.5 4.5h15v15h-15zm5 0v15m5-15v15m-10-10h15m-15 5h15"/><circle cx="12" cy="12" r="1.65"/><path d="M12 8.8v1m0 4.4v1m-3.2-3.2h1m4.4 0h1"/>',
    plasma: '<path d="M3 7c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 5 21 6M3 12c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 10 21 11M3 17c2.2-3 4.5-3 6.7 0s4.5 3 6.7 0S20 15 21 16"/>',
    pocsagrx: '<rect x="3.5" y="9" width="17" height="11.5" rx="2"/><rect x="6.5" y="11.5" width="11" height="4" rx=".6"/><path d="M7 18h2.5m2 0h2.5M17 18h.1M8.8 6.2a4.6 4.6 0 0 1 6.4 0M6.3 3.6a8.2 8.2 0 0 1 11.4 0"/>',
    rapidroll: '<circle cx="12" cy="5.5" r="2.2"/><path d="M3.5 10.5h7m3 4h7m-13 4h8M10 9l2 2 2-2"/>',
    resistor: '<path d="M1.5 12h2m17 0h2"/><path d="M3.5 10A2.5 2.5 0 0 1 6 7.5h1.5L9 9h6l1.5-1.5H18a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5h-1.5L15 15H9l-1.5 1.5H6A2.5 2.5 0 0 1 3.5 14z"/><path d="M6.5 7.5v9m4-7.5v6m2.5-6v6m4.5-7.5v9"/>',
    sigfinder: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v2m0 13v2m-8.5-8.5h2m13 0h2M12 5l2 7-2 7-2-7z"/><path d="m12 5 2 7h-4z" fill="currentColor" stroke="none"/>',
    snake: '<path d="M5 17h5a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2h3"/><circle cx="18.3" cy="8" r="1.9"/><circle cx="18.8" cy="7.5" r=".3" fill="currentColor" stroke="none"/><path d="M5 17l-1.5-1.5M5 17l-1.5 1.5"/>',
    sokoban: '<circle cx="6.8" cy="5.9" r="1.8"/><path d="M6.3 8.2 5 14l-2 5.5M5 14l2.6 5.5M6 10.5l4.5 1.3"/><rect x="10.5" y="9.5" width="10" height="10" rx=".8"/><rect x="13.25" y="12.25" width="4.5" height="4.5" rx=".4"/>',
    sondem10: '<path d="M12 2.5A4.5 4.5 0 0 1 16.5 7c0 2.7-2.6 4.6-4.5 5.5-1.9-.9-4.5-2.8-4.5-5.5A4.5 4.5 0 0 1 12 2.5zm0 10v4"/><rect x="10" y="16.5" width="4" height="4" rx=".5"/><path d="M16.5 16a3 3 0 0 1 0 5M19 14.5a6 6 0 0 1 0 8M7.5 16a3 3 0 0 0 0 5M5 14.5a6 6 0 0 0 0 8"/>',
    sondem20: '<path d="M12 2.5A4.5 4.5 0 0 1 16.5 7c0 2.7-2.6 4.6-4.5 5.5-1.9-.9-4.5-2.8-4.5-5.5A4.5 4.5 0 0 1 12 2.5zm0 10v4"/><rect x="10" y="16.5" width="4" height="4" rx=".5"/><path d="M16.5 16a3 3 0 0 1 0 5M19 14.5a6 6 0 0 1 0 8M7.5 16a3 3 0 0 0 0 5M5 14.5a6 6 0 0 0 0 8"/>',
    sonders41: '<path d="M12 2.5A4.5 4.5 0 0 1 16.5 7c0 2.7-2.6 4.6-4.5 5.5-1.9-.9-4.5-2.8-4.5-5.5A4.5 4.5 0 0 1 12 2.5zm0 10v4"/><rect x="10" y="16.5" width="4" height="4" rx=".5"/><path d="M16.5 16a3 3 0 0 1 0 5M19 14.5a6 6 0 0 1 0 8M7.5 16a3 3 0 0 0 0 5M5 14.5a6 6 0 0 0 0 8"/>',
    spaceimpact: '<path d="M3.5 12 9 8.2l7 .8 4.5 3-4.5 3-7 .8zM9 8.2 7 5.5m2 10.3L7 18.5M16 9v6"/><path d="M2.5 8h2m-2 8h2"/>',
    spectrum3d: '<path d="m4 18 5 2 11-5-5-2zM6 16V9m3 8V6m3 9V4m3 10V8m3 7v-5M4 18l5 2m0 0 11-5"/>',
    sstv: '<rect x="3.5" y="7" width="17" height="12" rx="2"/><path d="m8 7-3-4m11 4 3-4M7 16l3-3 2.5 2 2.5-3 2 2.5M8 21h8"/><circle cx="16.5" cy="10.5" r="1"/>',
    systeminfo: '<rect x="7" y="7" width="10" height="10" rx="1.2"/><rect x="10" y="10" width="4" height="4" rx=".5"/><path d="M9 3v4m3-4v4m3-4v4M9 17v4m3-4v4m3-4v4M3 9h4m-4 3h4m-4 3h4m10-6h4m-4 3h4m-4 3h4"/>',
    tetris: '<path d="M5 5h4v4H5zm4 0h4v4H9zm0 4h4v4H9zm4 4h4v4h-4zm4 0h4v4h-4zm-4 4h4v4h-4z"/>',
    tonecall: '<rect x="3.5" y="4" width="9" height="16" rx="1.5"/><path d="M6 7h4M6 17h4M15 8.5c2 1.8 2 5.2 0 7M18 5.5c4 3.5 4 9.5 0 13"/><circle cx="8" cy="12" r="1.5"/>'
  };

  function appCatalogId(filename) {
    return String(filename).replace(/\.app$/i, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  }

  function appIconSVG(id) {
    return APP_ICONS[String(id)] || '';
  }

  // `sizers` are every label an action button can show in the current
  // language, stacked invisibly under the real one: all buttons then share the
  // width of the longest label, so the action column is identical on every card.
  function setCatalogActionContent(button, icon, label, sizers = []) {
    button.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${APP_ACTION_ICONS[icon] || ''}</svg>`;
    const labels = document.createElement('span');
    labels.className = 'app-catalog-action-label';
    const text = document.createElement('span');
    text.textContent = label;
    labels.appendChild(text);
    sizers.forEach(value => {
      const sizer = document.createElement('span');
      sizer.className = 'app-catalog-action-sizer';
      sizer.setAttribute('aria-hidden', 'true');
      sizer.textContent = value;
      labels.appendChild(sizer);
    });
    button.appendChild(labels);
  }

  // Apps listed in APP_DETAILS are by DEFAULT_APP_AUTHOR unless stated here;
  // unknown apps get no author rather than a guessed one.
  const DEFAULT_APP_AUTHOR = 'armel';
  const APP_AUTHORS = {
    cwusb:       'jdenoy',
    epirb406:    'jdenoy',
    hellmaze:    'jdenoy',
    minesweeper: 'Sarijen',
    sigfinder:   'jdenoy',
    snake:       'mrkusypl',
    sokoban:     'BI8SYN',
    sondem20:    'laurentneg',
    tonecall:    'jdenoy'
  };

  function appDetails(filename) {
    const id = appCatalogId(filename);
    const detail = APP_DETAILS[id] || ['other', 'Overlay app for F4HWN Labs.'];
    return {
      id,
      category: detail[0],
      description: detail[1],
      descriptionKey: APP_DETAILS[id] ? `appDescription_${id}` : 'appDescription_other',
      author: APP_AUTHORS[id] || (APP_DETAILS[id] ? DEFAULT_APP_AUTHOR : ''),
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

  function formatByteSize(size) {
    const bytes = Number.isFinite(size) && size > 0 ? size : 0;
    return bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`;
  }

  // The listing's file size counts header + code + assets; the binary is the
  // header's code_size alone, so sizes wait for the parsed header.
  function formatAppLabel(app, metadata) {
    if (!Number.isFinite(metadata?.codeSize)) return app.label;
    return `${app.label} · ${formatByteSize(metadata.codeSize)}`;
  }

  function parseAppHeader(buffer) {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    if (bytes.byteLength < 64) return null;
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
    return {
      name: readString(20, 16),
      version: readString(36, 16),
      codeSize: view.getUint32(8, true),
      assetSize: view.getUint16(60, true)
    };
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
    const localBuildEl = document.getElementById('appCatalogLocalBuild');
    const localBuildButton = document.getElementById('appCatalogLocalBuildButton');
    const localBuildChangeButton = document.getElementById('appCatalogLocalBuildChange');
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
    let catalogProgress = null;   // { id, percent, shown, ... } while a card installs/updates
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

    async function runCatalogOperation(operation, progressApp) {
      if (catalogOperationPending) return;
      catalogOperationPending = true;
      const progressId = progressApp ? appCatalogId(progressApp.name) : '';
      const installedSnapshot = progressId ? installedApps.get(progressId) : null;
      catalogProgress = progressApp ? {
        id: progressId,
        percent: 0,
        shown: 0,
        installedSnapshot: installedSnapshot ? { ...installedSnapshot } : null,
        operationDone: false,
        fillDone: false,
        holdTimer: 0
      } : null;
      renderCatalogCards();
      let succeeded = false;
      try {
        await operation();
        succeeded = true;
      } finally {
        const progress = catalogProgress;
        if (!succeeded || !progress || progress.percent !== 100) {
          catalogProgress = null;
          catalogOperationPending = false;
        } else {
          progress.operationDone = true;
          finishCatalogProgress(progress);
        }
        renderCatalogCards();
      }
    }

    function setCatalogProgressValue(bar, percent) {
      bar.setAttribute('aria-valuenow', String(Math.round(percent)));
      bar.firstElementChild.style.width = `${percent}%`;
    }

    function createCatalogProgress(percent) {
      const bar = document.createElement('div');
      bar.className = 'app-catalog-progress';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
      bar.appendChild(document.createElement('div')).className = 'app-catalog-progress-fill';
      setCatalogProgressValue(bar, percent);
      return bar;
    }

    // Apps are written in well under a second and cards are rebuilt during an
    // operation (inventory events), so the displayed value is eased here rather
    // than with a CSS transition: it survives rebuilds and always fills steadily.
    const CATALOG_PROGRESS_FILL_MS = 900;
    const CATALOG_PROGRESS_HOLD_MS = 700;

    function finishCatalogProgress(progress) {
      if (!progress.operationDone || !progress.fillDone || progress.holdTimer) return;
      progress.holdTimer = setTimeout(() => {
        if (catalogProgress !== progress) return;
        catalogProgress = null;
        catalogOperationPending = false;
        renderCatalogCards();
      }, CATALOG_PROGRESS_HOLD_MS);
    }

    function animateCatalogProgress(progress, last) {
      requestAnimationFrame(now => {
        if (catalogProgress !== progress) return;
        const step = ((now - last) / CATALOG_PROGRESS_FILL_MS) * 100;
        progress.shown = Math.min(progress.percent, progress.shown + Math.max(0, step));
        const bar = cardsEl?.querySelector('.app-catalog-progress');
        if (bar) setCatalogProgressValue(bar, progress.shown);
        if (progress.shown >= 100) {
          progress.animating = false;
          progress.fillDone = true;
          finishCatalogProgress(progress);
        } else if (progress.shown < progress.percent) {
          animateCatalogProgress(progress, now);
        } else {
          progress.animating = false;
        }
      });
    }

    function updateCatalogProgress(percent) {
      const progress = catalogProgress;
      if (!progress) return;
      progress.percent = percent;
      if (progress.animating || progress.shown >= percent) return;
      progress.animating = true;
      animateCatalogProgress(progress, performance.now());
    }

    function selectCatalogApp(app) {
      const option = [...appSelect.options].find(item => item.value === app.url);
      if (option) appSelect.value = app.url;
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.installAppFromURL === 'function') {
        void runCatalogOperation(
          () => flash.installAppFromURL(app.url, app.name, { onProgress: updateCatalogProgress }),
          app
        );
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
      const longestVersion = currentApps
        .map(app => String(currentMetadata.get(appCatalogId(app.name))?.version || '').replace(/^v/i, ''))
        .reduce((longest, version) => (version.length > longest.length ? version : longest), '0.0');
      const actionSizers = [
        t('appInstallBtn'),
        t('appDelete'),
        `${t('appUpdateShort')} → ${longestVersion}`
      ];
      currentApps.forEach(app => {
        const appId = appCatalogId(app.name);
        const metadata = currentMetadata.get(appId);
        const progressState = catalogProgress?.id === appId ? catalogProgress : null;
        const installed = progressState
          ? progressState.installedSnapshot
          : installedApps.get(appId);
        const state = catalogAppState(installed, metadata);
        const card = document.createElement('article');
        card.className = 'app-catalog-card';
        card.dataset.category = app.category;
        card.dataset.state = state;
        const translatedDescription = t(app.descriptionKey);
        const descriptionText = translatedDescription === app.descriptionKey
          ? app.description
          : translatedDescription;
        card.dataset.search = `${app.label} ${descriptionText} ${app.description} ${app.category} ${app.author ? '@' + app.author : ''}`.toLocaleLowerCase();

        const icon = createAppIcon(app);

        const content = document.createElement('div');
        content.className = 'app-catalog-content';
        const title = document.createElement('div');
        title.className = 'app-catalog-title';
        const name = document.createElement('strong');
        name.textContent = app.label;
        name.title = app.label;
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
        description.title = descriptionText;
        const meta = document.createElement('div');
        meta.className = 'app-catalog-meta';
        const version = document.createElement('span');
        version.textContent = installed?.version && metadata?.version && state === 'update'
          ? `v${installed.version.replace(/^v/i, '')} → v${metadata.version.replace(/^v/i, '')}`
          : (metadata?.version ? `v${metadata.version.replace(/^v/i, '')}` : currentVersionEntry?.version || '—');
        const size = document.createElement('span');
        size.className = 'app-catalog-size';
        const hasCode = Number.isFinite(metadata?.codeSize);
        const hasAssets = Number.isFinite(metadata?.assetSize) && metadata.assetSize > 0;
        const assets = hasAssets ? ` (+${formatByteSize(metadata.assetSize)})` : '';
        size.textContent = hasCode ? `${formatByteSize(metadata.codeSize)}${assets}` : '—';
        version.title = t('slotColVersion');
        size.title = hasCode
          ? [t('appSizeCode', formatByteSize(metadata.codeSize)),
             hasAssets ? t('appSizeAssets', formatByteSize(metadata.assetSize)) : ''
            ].filter(Boolean).join(' · ')
          : t('appColSize');
        meta.append(version, size);
        if (app.author) {
          const author = document.createElement('span');
          author.className = 'app-catalog-author';
          author.textContent = `@${app.author}`;
          author.title = t('studio_about_author');
          meta.appendChild(author);
        }
        const actions = document.createElement('div');
        actions.className = 'app-catalog-actions';
        if (!installed) {
          const install = document.createElement('button');
          install.type = 'button';
          install.className = 'btn app-catalog-action app-catalog-install';
          setCatalogActionContent(install, 'install', t('appInstallBtn'), actionSizers);
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
            const updateVersion = metadata.version.replace(/^v/i, '');
            setCatalogActionContent(update, 'update', `${t('appUpdateShort')} → ${updateVersion}`, actionSizers);
            update.title = t('appUpdateAction', updateVersion);
            update.disabled = catalogOperationPending || !inventoryReady;
            update.addEventListener('click', () => {
              const flash = window.UVStudioFlash;
              if (flash && typeof flash.updateAppFromURL === 'function') {
                void runCatalogOperation(
                  () => flash.updateAppFromURL(installed.slot, app.url, app.name, { onProgress: updateCatalogProgress }),
                  app
                );
              }
            });
            actions.appendChild(update);
          }
          const remove = document.createElement('button');
          remove.type = 'button';
          remove.className = 'btn app-catalog-action app-catalog-delete';
          setCatalogActionContent(remove, 'delete', t('appDelete'), actionSizers);
          remove.disabled = catalogOperationPending || !inventoryReady;
          remove.addEventListener('click', () => {
            const flash = window.UVStudioFlash;
            if (flash && typeof flash.deleteAppSlot === 'function') {
              void runCatalogOperation(() => flash.deleteAppSlot(installed.slot));
            }
          });
          actions.appendChild(remove);
        }
        content.append(title, description, meta);
        card.append(icon, content, actions);
        // Same layout for every state: the gauge rides the card's bottom edge.
        if (progressState) {
          card.classList.add('is-busy');
          card.appendChild(createCatalogProgress(progressState.shown));
        }
        cardsEl.appendChild(card);
      });
      if (catalogTabCountEl) catalogTabCountEl.textContent = String(currentApps.length);
      if (firmwareHintEl) firmwareHintEl.textContent = currentVersionEntry
        ? t('appManagerForFirmware', currentVersionEntry.version)
        : '';
      applyCatalogFilter();
    }

    // Developer mode: a local build folder (build/Apps) offered separately
    // from released versions, so freshly compiled apps install without a push.
    const LOCAL_VERSION = { version: 'local', directory: 'local', path: '', local: true };
    const LOCAL_DIRECTORY_DB = 'uvstudio-app-catalog';
    const LOCAL_DIRECTORY_STORE = 'directories';
    const LOCAL_DIRECTORY_KEY = 'local-build';
    let localDirectory = null;
    let localItems = [];

    function openLocalDirectoryDB() {
      if (!window.indexedDB) return Promise.resolve(null);
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(LOCAL_DIRECTORY_DB, 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(LOCAL_DIRECTORY_STORE)) {
            request.result.createObjectStore(LOCAL_DIRECTORY_STORE);
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async function localDirectoryStore(mode, operation) {
      const db = await openLocalDirectoryDB();
      if (!db) return null;
      try {
        return await new Promise((resolve, reject) => {
          const transaction = db.transaction(LOCAL_DIRECTORY_STORE, mode);
          const request = operation(transaction.objectStore(LOCAL_DIRECTORY_STORE));
          request.onsuccess = () => resolve(request.result || null);
          request.onerror = () => reject(request.error);
          transaction.onabort = () => reject(transaction.error);
        });
      } finally {
        db.close();
      }
    }

    function restoreLocalDirectory() {
      return localDirectoryStore('readonly', store => store.get(LOCAL_DIRECTORY_KEY))
        .then(handle => { localDirectory = handle; updateLocalBuildButton(); })
        .catch(() => {});
    }

    function rememberLocalDirectory(handle) {
      return localDirectoryStore('readwrite', store => store.put(handle, LOCAL_DIRECTORY_KEY))
        .catch(() => {});
    }

    async function allowLocalDirectory(handle, requestAccess) {
      if (!handle || typeof handle.queryPermission !== 'function') return true;
      const options = { mode: 'read' };
      let permission = await handle.queryPermission(options);
      if (permission !== 'granted' && requestAccess && typeof handle.requestPermission === 'function') {
        permission = await handle.requestPermission(options);
      }
      return permission === 'granted';
    }

    function updateLocalBuildButton(active = currentVersionEntry?.local === true) {
      if (!localBuildButton) return;
      localBuildButton.textContent = t('appLocalBuild');
      localBuildButton.classList.toggle('active', active);
      if (localBuildChangeButton) localBuildChangeButton.hidden = !localDirectory;
    }

    async function fetchApps(versionEntry) {
      if (versionEntry.local) return listApps(localItems);
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
          refreshAppOptionLabels();
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

    function refreshAppOptionLabels() {
      appSelect.querySelectorAll('option[data-app-name]').forEach(option => {
        const app = currentApps.find(item => item.name === option.dataset.appName);
        if (app) option.textContent = formatAppLabel(app, currentMetadata.get(appCatalogId(app.name)));
      });
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

    // Read (again) every .app of the chosen folder; File objects are snapshots,
    // so each scan picks up the latest build.
    async function scanLocalBuild(choose) {
      if (choose || !localDirectory) {
        localDirectory = await window.showDirectoryPicker({ id: 'uvstudio-apps', mode: 'read' });
        await rememberLocalDirectory(localDirectory);
      } else if (!await allowLocalDirectory(localDirectory, true)) {
        throw new Error('Local build folder access was not granted');
      }
      updateLocalBuildButton();
      const items = [];
      for await (const entry of localDirectory.values()) {
        if (entry.kind !== 'file' || !/\.app$/i.test(entry.name)) continue;
        const file = await entry.getFile();
        items.push({ type: 'file', name: entry.name, size: file.size,
                     download_url: URL.createObjectURL(file) });
      }
      localItems.forEach(item => URL.revokeObjectURL(item.download_url));
      localItems = items;
      metadataCache.delete(LOCAL_VERSION.version);
      if (!loaded) await load();
      versionSelect.value = '';
      const flash = window.UVStudioFlash;
      if (flash && typeof flash.clearAppFromCatalog === 'function') flash.clearAppFromCatalog();
      const apps = await loadApps(LOCAL_VERSION);
      updateLocalBuildButton(true);
      showCatalog();
      if (apps) void publishLatestAppVersions(LOCAL_VERSION, apps);
    }

    const preferences = window.UVStudioPreferences;
    if (preferences && typeof preferences.devCatalog === 'function' && preferences.devCatalog() &&
        typeof window.showDirectoryPicker === 'function' && localBuildEl && localBuildButton && localBuildChangeButton) {
      localBuildEl.hidden = false;
      localBuildButton.title = 'Rescan the selected local build folder.';
      localBuildChangeButton.title = 'Choose another local build folder.';
      const localRestore = restoreLocalDirectory();
      localBuildButton.addEventListener('click', () => {
        localRestore.then(() => scanLocalBuild(false)).catch(error => {
          if (!error || error.name !== 'AbortError') console.error('Local build folder:', error);
        });
      });
      localBuildChangeButton.addEventListener('click', () => {
        localRestore.then(() => scanLocalBuild(true)).catch(error => {
          if (!error || error.name !== 'AbortError') console.error('Local build folder:', error);
        });
      });
    }

    versionSelect.addEventListener('change', () => {
      const selected = versions.find(entry => entry.directory === versionSelect.value);
      if (!selected) return;
      updateLocalBuildButton(false);
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
        // A radio scan must not take the developer away from the local build.
        if (matching && versionSelect.value !== matching.directory && !currentVersionEntry?.local) {
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
      updateLocalBuildButton();
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
    formatByteSize,
    fallbackApps,
    listApps,
    listVersions,
    parseAppHeader,
    parseVersionDirectory,
    readAppMetadata
  };
});
