;(function(){
// js/flash.js
// UV-K5 Web Flasher core logic (Web Serial + protocol)
// Adds: 
// - Auto-load of firmware from URL param ?firmwareURL=... (or ?fw=...)
// - Uses the shared UV Studio i18n runtime (window.uvStudioI18n).
// - Refreshes dynamic tool labels after the shared language changes.
// - Shows progress bar during flashing, hides it after successful completion.
// - Percentage text is centered via #progressLabel overlay.
// - Dump and restore
// - RF Log CSV export

'use strict';

// ========== CONSTANTS ==========
const BAUDRATE = 38400;

// Message types
const MSG_NOTIFY_DEV_INFO = 0x0518;
const MSG_NOTIFY_BL_VER = 0x0530;
const MSG_PROG_FW = 0x0519;
const MSG_PROG_FW_RESP = 0x051A;
const MSG_DEV_INFO_REQ = 0x0514;
const MSG_DEV_INFO_RESP = 0x0515;
const MSG_READ_EEPROM = 0x051B;
const MSG_READ_EEPROM_RESP = 0x051C;
const MSG_WRITE_EEPROM = 0x051D;
const MSG_WRITE_EEPROM_RESP = 0x051E;
const MSG_REBOOT = 0x05DD;

const OBFUS_TBL = new Uint8Array([
  0x16, 0x6c, 0x14, 0xe6, 0x2e, 0x91, 0x0d, 0x40,
  0x21, 0x35, 0xd5, 0x40, 0x13, 0x03, 0xe9, 0x80
]);

// Calibration memory layout
const CALIB_SIZE = 512; // bytes
const CHUNK_SIZE = 16;
let CALIB_OFFSET = 0x1E00; // Default for firmware < v5.0.0

// Boot logo memory layout (mirrors firmware App/ui/welcome.c)
// Layout in flash sector starting at PY25Q16 0x011000, exposed via EEPROM
// compat at 0x00C000:
//   [0x00..0x07] 8-byte magic header "F4HWNLGO"
//   [0x08..0x407] 1024-byte bitmap, ST7565-native column-major LSB-top
const LOGO_EEPROM_OFFSET = 0xC000;
const LOGO_HEADER_SIZE = 8;
const LOGO_BITMAP_SIZE = 1024;
const LOGO_TOTAL_SIZE = LOGO_HEADER_SIZE + LOGO_BITMAP_SIZE; // 1032
// Padded to a CHUNK_SIZE multiple so we can stream by 16-byte chunks like calib.
const LOGO_PADDED_SIZE = Math.ceil(LOGO_TOTAL_SIZE / CHUNK_SIZE) * CHUNK_SIZE; // 1040
const LOGO_MAGIC = new Uint8Array([0x46, 0x34, 0x48, 0x57, 0x4E, 0x4C, 0x47, 0x4F]); // "F4HWNLGO"
const LOGO_WIDTH = 128;
const LOGO_HEIGHT = 64;

// RF Log export timings. History pages are emitted by the firmware at most
// once per display/update cycle, normally every 500 ms.
const RF_LOG_KEEPALIVE_INTERVAL_MS = 200;
const RF_LOG_INITIAL_TIMEOUT_MS = 5000;
const RF_LOG_HISTORY_IDLE_MS = 1500;
const RF_LOG_EXPORT_TIMEOUT_MS = 20000;

// ========== STATE ==========
let port = null;
let reader = null;
let writer = null;
let firmwareData = null;
let firmwareFileName = 'firmware.bin';
// Out-of-order guard: only the most recent selection may commit firmwareData.
let firmwareLoadSeq = 0;
let firmwareLoadAbort = null;
// Version of the CHIRP driver currently offered for download, or null when none.
let chirpDriverVersion = null;
let calibData = null;
let activeOperationToken = null;
let activeToolsView = 'flash';
let readBuffer = [];
let serialReadRevision = 0;
const serialReadWaiters = new Set();
let isReading = false;
let toolsSerialSession = 0;
let rfLogDownloadUrl = null;
const serialSupported = 'serial' in navigator;

// Firmware Slots state
let slotImage = null;   // Uint8Array of the selected .bin
let slotMeta = { name: '', fwVersion: '' };
// Out-of-order guard for the slot image picker (catalog or local file).
let slotImageLoadSeq = 0;
let slotImageLoadAbort = null;
let slotAutoReconnecting = false;
let slotReconnectTimer = null;
let slotReconnectInProgress = false;
let slotLastPortInfo = null;
let slotHardwareDisconnectPromise = null;
let slotRefreshPending = false;

// Logo state
let logoSourceImage = null;       // HTMLImageElement of the user-picked file
let logoBitmap = null;            // Uint8Array(1024) ST7565-native, after threshold/invert

// ========== UI ELEMENTS ==========
const flashBtn = document.getElementById('flashBtn');
const dumpBtn = document.getElementById('dumpBtn');
const restoreBtn = document.getElementById('restoreBtn');
const firmwareFileInput = document.getElementById('firmwareFile');
const calibFileInput = document.getElementById('calibFile');
const labelFwFileEl = document.getElementById('labelFirmwareFile');
const labelCalibFileEl = document.getElementById('labelCalibFile');
const logDiv = document.getElementById('log');
const infoBoxEl = document.getElementById('infoBox');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const logToggle = document.getElementById('logToggle');
const languageSelect = document.getElementById('languageSelect');
const dumpDownload = document.getElementById('dumpDownload');
const dumpLink = document.getElementById('dumpLink');
const chirpDriverDownload = document.getElementById('chirpDriverDownload');
const chirpDriverLink = document.getElementById('chirpDriverLink');
const chirpDriverText = document.getElementById('chirpDriverText');

// File input labels
const fileLabel = document.getElementById('fileLabel');
const fileName = document.getElementById('fileName');
const fileButton = document.getElementById('fileButton');
const calibFileLabel = document.getElementById('calibFileLabel');
const calibFileName = document.getElementById('calibFileName');
const calibFileButton = document.getElementById('calibFileButton');

// Logo UI
const logoFileInput = document.getElementById('logoFile');
const logoFileLabel = document.getElementById('logoFileLabel');
const logoFileName = document.getElementById('logoFileName');
const logoFileButton = document.getElementById('logoFileButton');
const logoControls = document.getElementById('logoControls');
const logoThresholdInput = document.getElementById('logoThreshold');
const logoThresholdValue = document.getElementById('logoThresholdValue');
const logoInvertInput = document.getElementById('logoInvert');
const logoPreviewCanvas = document.getElementById('logoPreviewCanvas');
const logoUploadBtn = document.getElementById('logoUploadBtn');
const logoDumpBtn = document.getElementById('logoDumpBtn');
const logoDumpResult = document.getElementById('logoDumpResult');
const logoDumpedCanvas = document.getElementById('logoDumpedCanvas');
const logoDumpLink = document.getElementById('logoDumpLink');

// Firmware Slots (multiboot) UI
const slotFileInput = document.getElementById('slotFile');
const slotFileLabel = document.getElementById('slotFileLabel');
const slotFileName = document.getElementById('slotFileName');
const slotFileButton = document.getElementById('slotFileButton');
const slotTargetSelect = document.getElementById('slotTarget');
const slotNameInput = document.getElementById('slotName');
const slotWriteBtn = document.getElementById('slotWriteBtn');
const slotsRefreshBtn = document.getElementById('slotsRefreshBtn');
const slotsTableBody = document.getElementById('slotsTableBody');
const slotMetaEl = document.getElementById('slotMeta');
const rfLogExportBtn = document.getElementById('rfLogExportBtn');
const rfLogDownload = document.getElementById('rfLogDownload');
const rfLogLink = document.getElementById('rfLogLink');

// ========== VERSION COMPARISON ==========
function isBootloaderCompatible(version, minVersion) {
  // Parse version strings (e.g., "7.02.02")
  const parseVersion = (v) => {
    const parts = v.split('.').map(p => parseInt(p, 10) || 0);
    while (parts.length < 3) parts.push(0);
    return parts;
  };
  
  const current = parseVersion(version);
  const required = parseVersion(minVersion);
  
  // Compare major.minor.patch
  for (let i = 0; i < 3; i++) {
    if (current[i] > required[i]) return true;
    if (current[i] < required[i]) return false;
  }
  
  return true; // Equal versions are compatible
}

// ========== i18n HELPER ==========
function t(key, ...args) {
  return window.uvStudioI18n ? window.uvStudioI18n.t(key, ...args) : key;
}

// ========== UI UPDATE ==========
function refreshLocalizedToolsState() {
  if (labelFwFileEl) labelFwFileEl.textContent = t('labelFirmwareFile');
  if (labelCalibFileEl) labelCalibFileEl.textContent = t('labelCalibFile');

  // Update info box based on active tab
  updateInfoBox();
  
  if (flashBtn) flashBtn.textContent = t('flashBtn');
  if (dumpBtn) dumpBtn.textContent = t('dumpBtn');
  if (restoreBtn) restoreBtn.textContent = t('restoreBtn');
  if (fileButton) fileButton.textContent = t('fileChoose');
  if (calibFileButton) calibFileButton.textContent = t('fileChoose');

  // Description
  const dumpDesc = document.getElementById('dumpDescription');
  const downloadText = document.getElementById('downloadText');
  if (dumpDesc) dumpDesc.textContent = t('dumpDescription');
  if (downloadText) downloadText.textContent = t('downloadText');

  // RF Log labels
  const rfLogDescription = document.getElementById('rfLogDescription');
  const rfLogDownloadText = document.getElementById('rfLogDownloadText');
  if (rfLogDescription) rfLogDescription.textContent = t('rfLogDescription');
  if (rfLogDownloadText) rfLogDownloadText.textContent = t('rfLogDownloadText');
  if (rfLogExportBtn) rfLogExportBtn.textContent = t('rfLogExportBtn');

  // Logo labels
  const labelLogoFile = document.getElementById('labelLogoFile');
  const labelLogoThreshold = document.getElementById('labelLogoThreshold');
  const labelLogoInvert = document.getElementById('labelLogoInvert');
  const labelLogoPreview = document.getElementById('labelLogoPreview');
  const logoUploadDesc = document.getElementById('logoUploadDescription');
  const logoDumpDesc = document.getElementById('logoDumpDescription');
  const logoDumpedLabel = document.getElementById('logoDumpedLabel');
  const logoDumpDownloadText = document.getElementById('logoDumpDownloadText');
  if (labelLogoFile) labelLogoFile.textContent = t('labelLogoFile');
  if (labelLogoThreshold) labelLogoThreshold.textContent = t('labelLogoThreshold');
  if (labelLogoInvert) labelLogoInvert.textContent = t('labelLogoInvert');
  if (labelLogoPreview) labelLogoPreview.textContent = t('labelLogoPreview');
  if (logoUploadDesc) logoUploadDesc.textContent = t('logoUploadDescription');
  if (logoDumpDesc) logoDumpDesc.textContent = t('logoDumpDescription');
  if (logoDumpedLabel) logoDumpedLabel.textContent = t('logoDumpedLabel');
  if (logoDumpDownloadText) logoDumpDownloadText.textContent = t('logoDumpDownloadText');
  if (logoUploadBtn) logoUploadBtn.textContent = t('logoUploadBtn');
  if (logoDumpBtn) logoDumpBtn.textContent = t('logoDumpBtn');
  if (logoFileButton) logoFileButton.textContent = t('fileChoose');
  if (logoFileName && !logoSourceImage) {
    logoFileName.textContent = t('fileNoFile');
    logoFileName.classList.remove('has-file');
    if (logoFileLabel) logoFileLabel.classList.remove('has-file');
  }

  // Log toggle
  if (logToggle) {
    const visible = logDiv && logDiv.classList.contains('visible');
    logToggle.textContent = visible ? t('logHide') : t('logShow');
    logToggle.setAttribute('aria-expanded', visible ? 'true' : 'false');
  }

  // File names
  if (fileName && !firmwareData) {
    fileName.textContent = t('fileNoFile');
    fileName.classList.remove('has-file');
    if (fileLabel) fileLabel.classList.remove('has-file');
  }

  if (calibFileName && !calibData) {
    calibFileName.textContent = t('fileNoFile');
    calibFileName.classList.remove('has-file');
    if (calibFileLabel) calibFileLabel.classList.remove('has-file');
  }

  if (chirpDriverText && chirpDriverVersion) {
    chirpDriverText.textContent = t('flash_chirp_driver_download', chirpDriverVersion);
  }

  if (languageSelect && window.uvStudioI18n) {
    languageSelect.value = window.uvStudioI18n.lang;
  }
}

// Update info box based on active tab
function updateInfoBox() {
  if (!infoBoxEl) return;

  const tabName = activeToolsView;

  if (tabName === 'flash') {
    infoBoxEl.innerHTML = t('infoBox');
  } else if (tabName === 'rf-log') {
    infoBoxEl.innerHTML = t('infoBoxRfLog');
  } else if (tabName === 'logo-upload' || tabName === 'logo-dump') {
    infoBoxEl.innerHTML = t('infoBoxLogo');
  } else if (tabName === 'slots') {
    infoBoxEl.innerHTML = t('infoBoxSlots');
  } else if (tabName === 'apps') {
    infoBoxEl.innerHTML = t('infoBoxApps');
  } else {
    infoBoxEl.innerHTML = t('infoBoxDump');
  }
}

// Refresh dynamic tool labels after the shared language changes.
window.addEventListener('uvstudio:languagechange', () => {
  refreshLocalizedToolsState();
  slotLocalize();
});

window.addEventListener('uvstudio:toolviewchange', event => {
  const nextView = event.detail?.view || 'flash';
  const leavingSlots = activeToolsView === 'slots' && nextView !== 'slots';
  activeToolsView = nextView;
  updateInfoBox();
  if (leavingSlots && !activeOperationToken && toolsSerial.isOwner()) {
    void toolsSerial.release('navigation');
  }
});

// Initial i18n sync
(async () => {
  if (window.uvStudioI18nReady) await window.uvStudioI18nReady;
  refreshLocalizedToolsState();
  await maybeLoadFirmwareFromQuery();
})();

// ========== LOG VISIBILITY ==========
if (logToggle) {
  logToggle.addEventListener('click', () => {
    if (!logDiv) return;
    logDiv.classList.toggle('visible');
    logToggle.textContent = logDiv.classList.contains('visible') ? t('logHide') : t('logShow');
    logToggle.setAttribute('aria-expanded', logDiv.classList.contains('visible') ? 'true' : 'false');
  });
}

// ========== FIRMWARE FILE INPUT ==========
if (firmwareFileInput) {
  firmwareFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const seq = beginFirmwareLoad('local');
    const fr = new FileReader();
    fr.onload = (ev) => { if (seq === firmwareLoadSeq) setFirmwareBuffer(ev.target.result, file.name); };
    fr.readAsArrayBuffer(file);
  });
}

// Start a new firmware selection: bump the generation so any earlier in-flight
// load is ignored on completion, cancel a pending download, and keep the two
// sources (catalog vs local file) mutually exclusive.
function beginFirmwareLoad(source) {
  const seq = ++firmwareLoadSeq;
  if (firmwareLoadAbort) { try { firmwareLoadAbort.abort(); } catch (e) {} firmwareLoadAbort = null; }
  // The previous firmware is no longer current: make it unavailable so Flash is
  // disabled until the new selection has finished loading.
  firmwareData = null;
  updateFlashButton();
  if (source === 'url' && firmwareFileInput) firmwareFileInput.value = '';
  window.dispatchEvent(new CustomEvent('uvstudio:firmwareselect', { detail: { source } }));
  return seq;
}

function clearFirmware() {
  firmwareData = null;
  if (fileName) { fileName.textContent = t('fileNoFile'); fileName.classList.remove('has-file'); }
  if (fileLabel) fileLabel.classList.remove('has-file');
  updateFlashButton();
}

function setFirmwareBuffer(buf, name = 'firmware.bin') {
  firmwareData = new Uint8Array(buf);
  firmwareFileName = name;
  hideChirpDriverOffer();
  if (fileName) {
    fileName.textContent = name;
    fileName.classList.add('has-file');
  }
  if (fileLabel) fileLabel.classList.add('has-file');
  log(t('firmwareLoaded', name, firmwareData.length), 'success');
  updateFlashButton();
}

// ---------- CHIRP driver offer ----------
// All stable F4HWN editions share the matching CHIRP driver release asset named
// f4hwn.fusion.chirp.v<version>.py (one driver covers Fusion, FieldOps, Transfer,
// Max, UV-K1 and UV-K5 V3). After a successful flash, resolve the driver
// for the flashed version and offer it.
const CHIRP_DRIVER_REPO = 'armel/uv-k1-k5v3-firmware-custom';

function hideChirpDriverOffer() {
  chirpDriverVersion = null;
  if (chirpDriverDownload) chirpDriverDownload.style.display = 'none';
}

function showChirpDriverOffer(version, url) {
  if (!chirpDriverDownload || !chirpDriverLink) return;
  chirpDriverVersion = version;
  chirpDriverLink.href = url;
  if (chirpDriverText) chirpDriverText.textContent = t('flash_chirp_driver_download', version);
  chirpDriverDownload.style.display = 'block';
  log(t('chirpDriverAvailable', version), 'success');
}

// Best-effort: resolve and offer the CHIRP driver for the flashed firmware.
// Never throws — a missing driver or network hiccup must not disturb the flash.
async function maybeOfferChirpDriver(fname) {
  try {
    const parse = window.UVStudioFlashCatalog?.parseFirmwareName;
    const info = parse ? parse(fname) : null;
    const hasSharedDriver = window.UVStudioFlashCatalog?.hasSharedChirpDriver;
    if (!hasSharedDriver || !hasSharedDriver(info)) return;

    const tag = `v${info.version}`;
    const apiUrl =
      `https://api.github.com/repos/${CHIRP_DRIVER_REPO}/releases/tags/${encodeURIComponent(tag)}`;
    const res = await fetch(apiUrl, { cache: 'no-cache', mode: 'cors' });
    if (!res.ok) return; // no release for this version → nothing to offer

    const release = await res.json();
    const asset = (release.assets || []).find(
      a => /chirp/i.test(a.name) && /\.py$/i.test(a.name)
    );
    if (!asset || !asset.browser_download_url) return;

    showChirpDriverOffer(info.version, asset.browser_download_url);
  } catch (e) {
    // Swallowed on purpose: the driver offer is a bonus, never a failure path.
  }
}

// ---------- Auto-load firmware from URL ----------

function normalizeFirmwareDownloadURL(url) {
  const urlObj = new URL(url);

  if (urlObj.protocol !== 'https:') {
    throw new Error(t('urlHttpNotHttps'));
  }

  // GitHub convenience: github.com/.../raw/... → raw.githubusercontent.com/...
  if (urlObj.hostname === 'github.com' && urlObj.pathname.includes('/raw/')) {
    const parts = urlObj.pathname.split('/').filter(Boolean);
    const i = parts.indexOf('raw');
    if (i > 1 && i < parts.length - 1) {
      const user = parts[0];
      const repo = parts[1];
      const branch = parts[i + 1];
      const rest = parts.slice(i + 2).join('/');
      urlObj.hostname = 'raw.githubusercontent.com';
      urlObj.pathname = `/${user}/${repo}/${branch}/${rest}`;
    }
  }

  return urlObj;
}

async function loadFirmwareFromURL(url) {
  const seq = beginFirmwareLoad('url');
  const controller = new AbortController();
  firmwareLoadAbort = controller;
  try {
    log(t('loadingFromUrl', url), 'info');

    const urlObj = normalizeFirmwareDownloadURL(url);

    const res = await fetch(urlObj.toString(), { cache: 'no-cache', mode: 'cors', signal: controller.signal });
    if (!res.ok) {
      throw new Error(`${t('urlFetchError')} HTTP ${res.status}`);
    }

    const buf = await res.arrayBuffer();
    if (seq !== firmwareLoadSeq) return; // superseded by a newer selection

    const fname = (urlObj.pathname.split('/').pop() || 'firmware.bin').split('?')[0];

    setFirmwareBuffer(buf, fname);

    // Clean URL so refresh does not re-trigger auto-load
    const clean = new URL(window.location.href);
    clean.searchParams.delete('firmwareURL');
    clean.searchParams.delete('fw');
    window.history.replaceState({}, '', clean.toString());
  } catch (err) {
    if (err && err.name === 'AbortError') return; // cancelled by a newer selection
    log(`${t('urlFetchError')} ${err?.message ?? String(err)}`, 'error');
    if (seq === firmwareLoadSeq) clearFirmware();
  } finally {
    if (firmwareLoadAbort === controller) firmwareLoadAbort = null;
  }
}

async function maybeLoadFirmwareFromQuery() {
  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('firmwareURL') || params.get('fw');
    if (!param) return;
    await loadFirmwareFromURL(decodeURIComponent(param));
  } catch (e) {
    log(t('urlInvalid'), 'error');
  }
}

// Minimal entry point so the firmware catalog picker can reuse the URL loader.
window.UVStudioFlash = Object.freeze({
  loadFirmwareFromURL,
  loadSlotFirmwareFromURL,
  hasFirmware: () => Boolean(firmwareData)
});

function updateFlashButton() {
  updateActionButtons();
}

// ========== CALIBRATION FILE INPUT ==========
if (calibFileInput) {
  calibFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = (ev) => {
      const buf = new Uint8Array(ev.target.result);
      if (buf.length !== CALIB_SIZE) {
        log(t('calibInvalidSize', buf.length), 'error');
        return;
      }
      calibData = buf;
      if (calibFileName) {
        calibFileName.textContent = file.name;
        calibFileName.classList.add('has-file');
      }
      if (calibFileLabel) calibFileLabel.classList.add('has-file');
      log(t('calibLoaded', file.name, calibData.length), 'success');
      updateRestoreButton();
    };
    fr.readAsArrayBuffer(file);
  });
}

function updateRestoreButton() {
  updateActionButtons();
}

// ========== SERIAL CONNECTION ==========
async function connect() {
  try {
    stopSlotAutoReconnect({ forgetPort: true });
    await toolsSerial.acquire({ source: 'tools' });
    if (!toolsSerial.isOwner()) {
      throw Object.assign(new Error(t('tools_disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
    }
    log(t('requestingPort'), 'info');
    port = await navigator.serial.requestPort();
    if (!toolsSerial.isOwner()) {
      throw Object.assign(new Error(t('tools_disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
    }
    log(t('openingPort'), 'info');
    await port.open({ baudRate: BAUDRATE, bufferSize: 65536 });
    if (!toolsSerial.isOwner()) {
      try { await port.close(); } catch {}
      port = null;
      throw Object.assign(new Error(t('tools_disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
    }

    log(t('gettingReader'), 'info');
    reader = port.readable.getReader();
    log(t('gettingWriter'), 'info');
    writer = port.writable.getWriter();
    toolsSerialSession++;
    slotLastPortInfo = port.getInfo();

    log(t('startingRead'), 'info');
    startReading();

    log(t('waiting500ms'), 'info');
    await sleep(500);
    if (!toolsSerial.isOwner()) {
      throw Object.assign(new Error(t('tools_disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
    }

    log(t('connected'), 'success');
    toolsSerial.setState('connected', { reason: 'connection-established' });
  } catch (e) {
    if (toolsSerial.isOwner()) {
      await toolsSerial.release('connection-error');
    } else {
      await disconnectPort({ reason: 'connection-cancelled' });
    }
    if (e?.code !== 'UVSTUDIO_SERIAL_RELEASED') {
      log(t('connectionError', e?.message ?? String(e)), 'error');
    }
    throw e;
  }
}

async function disconnectPort(context = {}) {
  const hardwareDisconnect = context.reason === 'hardware-disconnect';
  if (!hardwareDisconnect) stopSlotAutoReconnect({ forgetPort: true });
  isReading = false;
  const activeReader = reader;
  const activeWriter = writer;
  const activePort = port;
  reader = null;
  writer = null;
  port = null;
  if (activeReader || activeWriter || activePort) toolsSerialSession++;
  notifySerialRead();

  await window.UVStudioSerial.closeResources({
    reader: activeReader,
    writer: activeWriter,
    port: activePort
  });
  if (context.reason === 'operation-complete' || context.reason === 'user') {
    log(t('tools_disconnected'), 'info');
  }
}

const toolsSerial = window.UVStudioSerial.register('tools', {
  disconnect: disconnectPort
});

function updateActionButtons() {
  const busy = Boolean(activeOperationToken) || slotAutoReconnecting || slotReconnectInProgress;
  const slotNameValid = Boolean(slotNormalizeName(slotNameInput?.value ?? slotMeta.name));
  if (flashBtn) flashBtn.disabled = !serialSupported || busy || !firmwareData;
  if (dumpBtn) dumpBtn.disabled = !serialSupported || busy;
  if (restoreBtn) restoreBtn.disabled = !serialSupported || busy || !calibData;
  if (logoUploadBtn) logoUploadBtn.disabled = !serialSupported || busy || !logoBitmap;
  if (logoDumpBtn) logoDumpBtn.disabled = !serialSupported || busy;
  if (rfLogExportBtn) rfLogExportBtn.disabled = !serialSupported || busy;
  if (slotNameInput) slotNameInput.disabled = busy || !slotImage;
  if (slotWriteBtn) slotWriteBtn.disabled = !serialSupported || busy || !slotImage || !slotNameValid;
  if (slotsRefreshBtn) slotsRefreshBtn.disabled = !serialSupported || busy;
  if (slotsTableBody) slotsTableBody.querySelectorAll('button').forEach(b => { b.disabled = !serialSupported || busy; });
}

function beginToolsOperation(name, critical) {
  if (activeOperationToken) return null;
  const token = toolsSerial.beginOperation(name, { critical });
  if (!token) return null;
  activeOperationToken = token;
  updateActionButtons();
  return token;
}

function endToolsOperation(token) {
  if (!token || token !== activeOperationToken) return;
  toolsSerial.endOperation(token);
  activeOperationToken = null;
  updateActionButtons();
  runPendingSlotRefresh();
}

window.addEventListener('beforeunload', event => {
  const operation = toolsSerial.getSnapshot().operation;
  if (!operation?.critical) return;
  event.preventDefault();
  event.returnValue = '';
});

async function disconnect() {
  return toolsSerial.release('operation-complete');
}

function startReading() {
  if (!reader || isReading) return;
  isReading = true;
  readLoop().catch(e => {
    if (isReading) log(t('loopError', e?.message ?? String(e)), 'error');
  });
}

async function readLoop() {
  log(t('startReading'), 'info');
  let unexpectedlyClosed = false;
  try {
    while (isReading && reader) {
      const { value, done } = await reader.read();
      if (done) {
        log(t('streamClosed'), 'info');
        unexpectedlyClosed = isReading;
        break;
      }
      if (value?.length) {
        readBuffer.push(...value);
        if (activeToolsView !== 'slots') log(t('rxData', value.length, readBuffer.length), 'info');
        notifySerialRead();
      }
    }
  } catch (e) {
    if (isReading) {
      unexpectedlyClosed = true;
      log(t('readError', e?.message ?? String(e)), 'error');
    }
  }
  log(t('readComplete'), 'info');
  if (unexpectedlyClosed) void handleSlotHardwareDisconnect();
}

// ========== FIRMWARE SLOTS AUTO-RECONNECT ==========
function sameSlotPort(candidate) {
  if (!candidate || !slotLastPortInfo) return false;
  const info = candidate.getInfo();
  return info.usbVendorId === slotLastPortInfo.usbVendorId &&
    info.usbProductId === slotLastPortInfo.usbProductId;
}

function stopSlotAutoReconnect(options = {}) {
  slotAutoReconnecting = false;
  clearTimeout(slotReconnectTimer);
  slotReconnectTimer = null;
  slotRefreshPending = false;
  if (options.forgetPort) slotLastPortInfo = null;
  updateActionButtons();
}

async function handleSlotHardwareDisconnect() {
  if (slotHardwareDisconnectPromise) return slotHardwareDisconnectPromise;
  if (activeToolsView !== 'slots' || !port || !toolsSerial.isOwner() || !slotLastPortInfo) return;

  slotHardwareDisconnectPromise = (async () => {
    await disconnectPort({ reason: 'hardware-disconnect' });
    if (activeToolsView !== 'slots' || !toolsSerial.isOwner()) return;

    slotAutoReconnecting = true;
    toolsSerial.setState('reconnecting', { reason: 'hardware-disconnect' });
    log(t('serial_disconnected_auto'), 'info');
    updateActionButtons();
    scheduleSlotReconnectProbe();
  })();

  try {
    await slotHardwareDisconnectPromise;
  } finally {
    slotHardwareDisconnectPromise = null;
  }
}

function scheduleSlotReconnectProbe() {
  if (slotReconnectTimer || !slotAutoReconnecting) return;
  slotReconnectTimer = setTimeout(async () => {
    slotReconnectTimer = null;
    if (!slotAutoReconnecting || !slotLastPortInfo) return;

    try {
      const ports = await navigator.serial.getPorts();
      for (const candidate of ports.filter(sameSlotPort)) {
        await reconnectSlotPort(candidate);
        if (!slotAutoReconnecting) break;
      }
    } catch (error) {
      console.warn('Unable to enumerate serial ports during slot reconnect:', error);
    }
    if (slotAutoReconnecting) scheduleSlotReconnectProbe();
  }, 500);
}

async function reconnectSlotPort(candidate) {
  if (!slotAutoReconnecting || slotReconnectInProgress || !sameSlotPort(candidate)) return;
  slotReconnectInProgress = true;
  updateActionButtons();

  await sleep(500);
  if (!slotAutoReconnecting || activeToolsView !== 'slots' || !toolsSerial.isOwner()) {
    slotReconnectInProgress = false;
    updateActionButtons();
    return;
  }

  try {
    port = candidate;
    await port.open({ baudRate: BAUDRATE, bufferSize: 65536 });
    if (!slotAutoReconnecting || activeToolsView !== 'slots' || !toolsSerial.isOwner()) {
      await disconnectPort({ reason: 'hardware-disconnect' });
      return;
    }

    reader = port.readable.getReader();
    writer = port.writable.getWriter();
    toolsSerialSession++;
    startReading();

    slotAutoReconnecting = false;
    clearTimeout(slotReconnectTimer);
    slotReconnectTimer = null;
    toolsSerial.setState('connected', { reason: 'auto-reconnect' });
    log(t('serial_reconnected'), 'success');
    slotRefreshPending = true;
  } catch (error) {
    console.warn('Firmware Slots auto-reconnect failed:', error);
    await disconnectPort({ reason: 'hardware-disconnect' });
  } finally {
    slotReconnectInProgress = false;
    updateActionButtons();
    runPendingSlotRefresh();
  }
}

function runPendingSlotRefresh() {
  if (!slotRefreshPending || activeOperationToken || activeToolsView !== 'slots' ||
      !port || !writer || !toolsSerial.isOwner()) return;
  slotRefreshPending = false;
  void slotRefreshFlow();
}

if (serialSupported) {
  navigator.serial.addEventListener('disconnect', event => {
    if (port && event.target === port) void handleSlotHardwareDisconnect();
  });
  navigator.serial.addEventListener('connect', event => {
    void reconnectSlotPort(event.target);
  });
}

// ========== PROTOCOL HELPERS ==========
function notifySerialRead() {
  serialReadRevision++;
  const waiters = Array.from(serialReadWaiters);
  serialReadWaiters.clear();
  for (const wake of waiters) wake();
}

function waitForSerialRead(afterRevision, timeoutMs) {
  if (serialReadRevision !== afterRevision) return Promise.resolve(true);
  return new Promise(resolve => {
    let timer = null;
    const wake = () => {
      clearTimeout(timer);
      resolve(true);
    };
    serialReadWaiters.add(wake);
    timer = setTimeout(() => {
      serialReadWaiters.delete(wake);
      resolve(false);
    }, timeoutMs);
  });
}

function createMessage(msgType, dataLen) {
  const msg = new Uint8Array(4 + dataLen);
  const view = new DataView(msg.buffer);
  view.setUint16(0, msgType, true);
  view.setUint16(2, dataLen, true);
  return msg;
}

async function sendMessage(msg) {
  const packet = makePacket(msg);
  await writer.write(packet);
}

function makePacket(msg) {
  let msgLen = msg.length;
  if (msgLen % 2 !== 0) msgLen++;
  const buf = new Uint8Array(8 + msgLen);
  const view = new DataView(buf.buffer);

  view.setUint16(0, 0xCDAB, true);
  view.setUint16(2, msgLen, true);
  view.setUint16(6 + msgLen, 0xBADC, true);

  for (let i = 0; i < msg.length; i++) buf[4 + i] = msg[i];

  const crc = calcCRC(buf, 4, msgLen);
  view.setUint16(4 + msgLen, crc, true);

  obfuscate(buf, 4, 2 + msgLen);
  return buf;
}

function fetchMessage(buf) {
  if (buf.length < 8) return null;

  let packBegin = -1;
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0xab && buf[i + 1] === 0xcd) {
      packBegin = i;
      break;
    }
  }
  if (packBegin === -1) {
    if (buf.length > 0 && buf[buf.length - 1] === 0xab) buf.splice(0, buf.length - 1);
    else buf.length = 0;
    return null;
  }
  if (buf.length - packBegin < 8) return null;

  const msgLen = (buf[packBegin + 3] << 8) | buf[packBegin + 2];
  const packEnd = packBegin + 6 + msgLen;
  if (buf.length < packEnd + 2) return null;

  if (buf[packEnd] !== 0xdc || buf[packEnd + 1] !== 0xba) {
    buf.splice(0, packBegin + 2);
    return null;
  }

  const msgBuf = new Uint8Array(msgLen + 2);
  for (let i = 0; i < msgLen + 2; i++) msgBuf[i] = buf[packBegin + 4 + i];
  obfuscate(msgBuf, 0, msgLen + 2);

  const view = new DataView(msgBuf.buffer);
  const msgType = view.getUint16(0, true);
  const data = msgBuf.slice(4);

  buf.splice(0, packEnd + 2);
  return { msgType, data, rawData: msgBuf };
}

function obfuscate(buf, off, size) {
  for (let i = 0; i < size; i++) buf[off + i] ^= OBFUS_TBL[i % OBFUS_TBL.length];
}

function calcCRC(buf, off, size) {
  let CRC = 0;
  for (let i = 0; i < size; i++) {
    const b = buf[off + i] & 0xff;
    CRC ^= b << 8;
    for (let j = 0; j < 8; j++) {
      if (CRC & 0x8000) CRC = ((CRC << 1) ^ 0x1021) & 0xffff;
      else CRC = (CRC << 1) & 0xffff;
    }
  }
  return CRC;
}

function arrayToHex(arr) {
  return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join(' ');
}

// ========== FLASH FIRMWARE (from original flash.js) ==========
flashBtn.addEventListener('click', async () => {
  if (!firmwareData) return;
  // Snapshot the buffer so a download finishing mid-flash cannot swap it out.
  const fw = firmwareData;
  const operation = beginToolsOperation('flash-firmware', true);
  if (!operation) return;
  try {
    if (!port) await connect();
    await flashFirmware(fw);
  } catch (e) {
    log(t('flashError', e?.message ?? String(e)), 'error');
  } finally {
    if (port) await disconnect();
    endToolsOperation(operation);
  }
});

async function flashFirmware(fw) {
  hideChirpDriverOffer();
  if (progressContainer) progressContainer.style.display = 'block';
  updateProgress(0);

  readBuffer = [];
  log(t('bufferEmpty'), 'info');
  await sleep(1000);
  log(t('bufferContains', readBuffer.length), 'info');

  log(t('establishing'), 'info');
  const devInfo = await waitForDeviceInfo();
  log(t('uidLabel', arrayToHex(devInfo.uid)), 'info');
  log(t('blVersionLabel', devInfo.blVersion), 'info');

  // Check bootloader version compatibility
  const minVersion = '7.00.07';
  if (!isBootloaderCompatible(devInfo.blVersion, minVersion)) {
    log('==============================================', 'error');
    log('❌ INCOMPATIBLE BOOTLOADER VERSION', 'error');
    log(`   Detected: ${devInfo.blVersion}`, 'error');
    log(`   Required: ${minVersion} or higher`, 'error');
    log('', 'error');
    log('This radio does not seem compatible with this firmware.', 'error');
    log('Please open an issue on GitHub:', 'error');
    log('https://github.com/armel/uv-k1-k5v3-firmware-custom', 'error');
    log('Please, include your bootloader version in the issue:', 'error');
    log(`   Bootloader: ${devInfo.blVersion}`, 'error');
    log('==============================================', 'error');
    throw new Error('Bootloader version too old');
  }
  log(t('deviceDetected'), 'success');

  log(t('handshake'), 'info');
  await performHandshake(devInfo.blVersion);
  log(t('handshakeComplete'), 'success');

  await programFirmware(fw);

  updateProgress(100);
  log(t('programmingComplete'), 'success');

  // Global community counter: a firmware was successfully flashed.
  // Best-effort — never blocks or fails the flash.
  try { window.UVStudioFlashCounter?.increment(); } catch (e) {}

  // Offer the matching CHIRP driver for download. Best-effort, never blocks.
  maybeOfferChirpDriver(firmwareFileName);

  setTimeout(() => {
    if (progressContainer) progressContainer.style.display = 'none';
    updateProgress(0);
  }, 800);
}

async function waitForDeviceInfo() {
  let lastTimestamp = 0, acc = 0, timeout = 0;
  log(t('waiting'), 'info');

  while (timeout < 500) {
    await sleep(10);
    timeout++;

    const msg = fetchMessage(readBuffer);
    if (!msg) continue;

    log(t('messageReceived', msg.msgType.toString(16).padStart(4, '0')), 'info');

    if (msg.msgType === MSG_NOTIFY_DEV_INFO) {
      const now = Date.now();
      const dt = now - lastTimestamp;
      log(t('interval', dt, acc), 'info');
      lastTimestamp = now;

      if (lastTimestamp > 0 && dt >= 5 && dt <= 1000) {
        acc++;
        log(t('validMessage', acc), 'success');
        if (acc >= 5) {
          const uid = msg.data.slice(0, 16);
          let blVersionEnd = -1;
          for (let i = 16; i < 32; i++) {
            if (msg.data[i] === 0) {
              blVersionEnd = i;
              break;
            }
          }
          if (blVersionEnd === -1) blVersionEnd = 32;
          const blVersion = new TextDecoder().decode(msg.data.slice(16, blVersionEnd));
          return { uid, blVersion };
        }
      } else {
        if (dt < 5 || dt > 1000) log(t('invalidInterval', dt), 'error');
        acc = 0;
      }
    }
  }
  throw new Error(t('timeoutNoDevice'));
}

async function performHandshake(blVersion) {
  let acc = 0;

  while (acc < 3) {
    await sleep(50);
    const msg = fetchMessage(readBuffer);
    if (msg && msg.msgType === MSG_NOTIFY_DEV_INFO) {
      if (acc === 0) log(t('sendingBlVersion'), 'info');

      const blMsg = createMessage(MSG_NOTIFY_BL_VER, 4);
      const blBytes = new TextEncoder().encode(blVersion.substring(0, 4));
      for (let i = 0; i < Math.min(blBytes.length, 4); i++) blMsg[4 + i] = blBytes[i];
      await sendMessage(blMsg);
      acc++;
      await sleep(50);
    }
  }

  log(t('waitingStop'), 'info');
  await sleep(200);

  while (readBuffer.length > 0) {
    const msg = fetchMessage(readBuffer);
    if (!msg) break;
    if (msg.msgType === MSG_NOTIFY_DEV_INFO) log(t('devInfoIgnored'), 'info');
    else log(t('messageReceived', msg.msgType.toString(16)), 'info');
  }
  log(t('bufferCleaned', readBuffer.length), 'info');
}

async function programFirmware(fw) {
  const pageCount = Math.ceil(fw.length / 256);
  const timestamp = Date.now() & 0xffffffff;
  log(t('programming', pageCount), 'info');

  let pageIndex = 0, retryCount = 0;
  const MAX_RETRIES = 3;

  while (pageIndex < pageCount) {
    updateProgress((pageIndex / pageCount) * 100);

    const msg = createMessage(MSG_PROG_FW, 268);
    const view = new DataView(msg.buffer);
    view.setUint32(4, timestamp, true);
    view.setUint16(8, pageIndex, true);
    view.setUint16(10, pageCount, true);

    const offset = pageIndex * 256;
    const len = Math.min(256, fw.length - offset);
    for (let i = 0; i < len; i++) msg[16 + i] = fw[offset + i];

    await sendMessage(msg);

    let gotResponse = false;
    for (let i = 0; i < 300 && !gotResponse; i++) {
      await sleep(10);
      const resp = fetchMessage(readBuffer);
      if (!resp) continue;
      if (resp.msgType === MSG_NOTIFY_DEV_INFO) continue;

      if (resp.msgType === MSG_PROG_FW_RESP) {
        const dv = new DataView(resp.data.buffer);
        const respPageIndex = dv.getUint16(4, true);
        const err = dv.getUint16(6, true);

        if (respPageIndex !== pageIndex) {
          log(t('pageWrongResponse', pageIndex + 1, pageCount, respPageIndex), 'error');
          continue;
        }
        if (err !== 0) {
          log(t('pageError', pageIndex + 1, pageCount, err), 'error');
          retryCount++;
          if (retryCount > MAX_RETRIES) throw new Error(t('tooManyErrors', pageIndex));
          break;
        }

        gotResponse = true;
        retryCount = 0;
        if ((pageIndex + 1) % 10 === 0 || pageIndex === pageCount - 1)
          log(t('pageOk', pageIndex + 1, pageCount), 'success');
      }
    }

    if (gotResponse) {
      pageIndex++;
    } else {
      log(t('pageTimeout', pageIndex + 1, pageCount), 'error');
      retryCount++;
      if (retryCount > MAX_RETRIES) throw new Error(t('tooManyTimeouts', pageIndex));
    }
  }
}

// ========== DUMP CALIBRATION ==========
dumpBtn.addEventListener('click', async () => {
  const operation = beginToolsOperation('dump-calibration', false);
  if (!operation) return;
  progressContainer.style.display = 'block';
  updateProgress(0);
  dumpDownload.style.display = 'none';

  try {
    if (!port) await connect();
    readBuffer = [];
    await sleep(1000);

    const devInfo = await requestDeviceInfo();
    log(t('dumpingData'), 'info');

    const dumpedData = new Uint8Array(CALIB_SIZE);
    let offset = CALIB_OFFSET;

    for (let i = 0; i < CALIB_SIZE; i += CHUNK_SIZE) {
      const pct = Math.round((i / CALIB_SIZE) * 100);
      updateProgress(pct);

      const msg = createMessage(MSG_READ_EEPROM, 8);
      const view = new DataView(msg.buffer);
      view.setUint16(4, offset, true);
      view.setUint16(6, CHUNK_SIZE, true);
      view.setUint32(8, devInfo.timestamp, true);
      await sendMessage(msg);

      let gotResponse = false;
      for (let attempt = 0; attempt < 300 && !gotResponse; attempt++) {
        await sleep(10);
        const resp = fetchMessage(readBuffer);
        if (!resp) continue;

        if (resp.msgType === MSG_READ_EEPROM_RESP) {
          const dv = new DataView(resp.data.buffer);
          const respOffset = dv.getUint16(0, true);
          const respSize = resp.data[2];

          if (respOffset === offset && respSize === CHUNK_SIZE) {
            for (let j = 0; j < CHUNK_SIZE; j++) {
              dumpedData[i + j] = resp.data[4 + j];
            }
            gotResponse = true;
            offset += CHUNK_SIZE;
          }
        }
      }

      if (!gotResponse) {
        throw new Error(t('eepromError', offset.toString(16)));
      }
    }

    updateProgress(100);
    log(t('dumpComplete'), 'success');

    const blob = new Blob([dumpedData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    dumpLink.href = url;
    dumpLink.download = 'calibration.dat';
    dumpDownload.style.display = 'block';
    log(t('dumpSaved'), 'success');

    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none';
      updateProgress(0);
    }, 800);
  } catch (e) {
    log(t('error', e?.message ?? String(e)), 'error');
  } finally {
    if (port) await disconnect();
    endToolsOperation(operation);
  }
});

// ========== RESTORE CALIBRATION ==========
restoreBtn.addEventListener('click', async () => {
  if (!calibData) return;
  const operation = beginToolsOperation('restore-calibration', true);
  if (!operation) return;
  progressContainer.style.display = 'block';
  updateProgress(0);

  try {
    if (!port) await connect();
    readBuffer = [];
    await sleep(1000);

    const devInfo = await requestDeviceInfo();
    log(t('restoringData'), 'info');

    let offset = CALIB_OFFSET;

    for (let i = 0; i < CALIB_SIZE; i += CHUNK_SIZE) {
      const pct = Math.round((i / CALIB_SIZE) * 100);
      updateProgress(pct);

      const msg = createMessage(MSG_WRITE_EEPROM, 24);
      const view = new DataView(msg.buffer);
      view.setUint16(4, offset, true);
      view.setUint16(6, CHUNK_SIZE, true);
      msg[7] = 1;
      view.setUint32(8, devInfo.timestamp, true);
      
      for (let j = 0; j < CHUNK_SIZE; j++) {
        msg[12 + j] = calibData[i + j];
      }
      
      await sendMessage(msg);

      let gotResponse = false;
      for (let attempt = 0; attempt < 300 && !gotResponse; attempt++) {
        await sleep(10);
        const resp = fetchMessage(readBuffer);
        if (!resp) continue;

        if (resp.msgType === MSG_WRITE_EEPROM_RESP) {
          const dv = new DataView(resp.data.buffer);
          const respOffset = dv.getUint16(0, true);

          if (respOffset === offset) {
            gotResponse = true;
            offset += CHUNK_SIZE;
          }
        }
      }

      if (!gotResponse) {
        throw new Error(t('eepromError', offset.toString(16)));
      }
    }

    updateProgress(100);
    log(t('restoreComplete'), 'success');

    log(t('rebooting'), 'info');
    const rebootMsg = createMessage(MSG_REBOOT, 0);
    await sendMessage(rebootMsg);
    await sleep(500);
    log(t('rebootComplete'), 'success');

    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none';
      updateProgress(0);
    }, 800);
  } catch (e) {
    log(t('error', e?.message ?? String(e)), 'error');
  } finally {
    if (port) await disconnect();
    endToolsOperation(operation);
  }
});

// ========== REQUEST DEVICE INFO (for dump/restore) ==========
async function requestDeviceInfo() {
  log(t('establishing'), 'info');
  
  const ts = Date.now() & 0xffffffff;
  const msg = createMessage(MSG_DEV_INFO_REQ, 4);
  new DataView(msg.buffer).setUint32(4, ts, true);
  await sendMessage(msg);
  
  for (let timeout = 0; timeout < 500; timeout++) {
    await sleep(10);
    const resp = fetchMessage(readBuffer);
    if (!resp) continue;
    
    log(t('messageReceived', resp.msgType.toString(16).padStart(4, '0')), 'info');
    
    if (resp.msgType === MSG_DEV_INFO_RESP) {
      // Log raw device info data
      logDeviceInfo(resp.data);
      log(t('deviceDetected'), 'success');
      return { timestamp: ts };
    }
  }
  throw new Error(t('timeoutNoDevice'));
}

// Helper to display device info response
function logDeviceInfo(data) {
  // Extract ASCII string from device info
  let deviceInfoStr = '';
  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    if (c === 0x00 || c === 0xFF) break; // Stop at null or padding
    if (c >= 32 && c < 127) {
      deviceInfoStr += String.fromCharCode(c);
    }
  }
  
  if (deviceInfoStr) {
    log(`Device: ${deviceInfoStr}`, 'success');
    
    // The canonical version is everything numeric after "v": v50 and
    // dotted forms such as v5.0.0 are both valid.
    const versionMatch = deviceInfoStr.match(/v(\d+(?:\.\d+)*)/i);
    if (versionMatch) {
      const version = versionMatch[1];
      const [major, minor, patch] = version.split('.').map(Number);
      
      // Set CALIB_OFFSET based on version
      if (major >= 5) {
        CALIB_OFFSET = 0xB000;
        log(`Firmware v${version} detected: CALIB_OFFSET = 0xB000`, 'info');
      } else {
        CALIB_OFFSET = 0x1E00;
        log(`Firmware v${version} detected: CALIB_OFFSET = 0x1E00`, 'info');
      }
    }
  } else {
    // Fallback to hex dump if no ASCII found
    let hexStr = 'Device Info (hex): ';
    for (let i = 0; i < Math.min(data.length, 40); i++) {
      hexStr += data[i].toString(16).padStart(2, '0').toUpperCase() + ' ';
    }
    log(hexStr, 'info');
  }
}

// ========== LOGO: IMAGE -> BITMAP CONVERSION ==========
// Render the source image into a 128x64 canvas using "fit" (preserve ratio,
// white letterboxing). Then apply threshold + optional invert and pack into
// the ST7565-native column-major LSB-top layout (1024 bytes).
function imageToLogoBitmap(image, threshold, invert) {
  // Step 1: render image fitted in a 128x64 white canvas
  const canvas = document.createElement('canvas');
  canvas.width = LOGO_WIDTH;
  canvas.height = LOGO_HEIGHT;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, LOGO_WIDTH, LOGO_HEIGHT);

  const srcRatio = image.naturalWidth / image.naturalHeight;
  const dstRatio = LOGO_WIDTH / LOGO_HEIGHT;
  let drawW, drawH, drawX, drawY;
  if (srcRatio > dstRatio) {
    // Source wider than 2:1 -> fit to width
    drawW = LOGO_WIDTH;
    drawH = Math.round(LOGO_WIDTH / srcRatio);
    drawX = 0;
    drawY = Math.round((LOGO_HEIGHT - drawH) / 2);
  } else {
    // Source taller than 2:1 -> fit to height
    drawH = LOGO_HEIGHT;
    drawW = Math.round(LOGO_HEIGHT * srcRatio);
    drawX = Math.round((LOGO_WIDTH - drawW) / 2);
    drawY = 0;
  }
  ctx.drawImage(image, drawX, drawY, drawW, drawH);

  // Step 2: read pixels and pack into ST7565 native layout
  const imgData = ctx.getImageData(0, 0, LOGO_WIDTH, LOGO_HEIGHT).data;
  const bitmap = new Uint8Array(LOGO_BITMAP_SIZE);

  for (let page = 0; page < 8; page++) {
    for (let x = 0; x < LOGO_WIDTH; x++) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit++) {
        const y = page * 8 + bit;
        const idx = (y * LOGO_WIDTH + x) * 4;
        // Convert RGBA to luminance (Rec. 601)
        const lum = 0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2];
        // Pixel is "on" (LCD pixel lit, dark on screen) if luminance < threshold
        let on = lum < threshold;
        if (invert) on = !on;
        if (on) byte |= (1 << bit);
      }
      bitmap[page * LOGO_WIDTH + x] = byte;
    }
  }

  return bitmap;
}

// Render a 1024-byte ST7565-native bitmap onto a 128x64 canvas (each "on" bit
// becomes a black pixel, "off" stays white).
function bitmapToCanvas(bitmap, canvas) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(LOGO_WIDTH, LOGO_HEIGHT);
  for (let page = 0; page < 8; page++) {
    for (let x = 0; x < LOGO_WIDTH; x++) {
      const byte = bitmap[page * LOGO_WIDTH + x];
      for (let bit = 0; bit < 8; bit++) {
        const y = page * 8 + bit;
        const on = (byte >> bit) & 1;
        const idx = (y * LOGO_WIDTH + x) * 4;
        const v = on ? 0 : 255;
        imgData.data[idx] = v;
        imgData.data[idx + 1] = v;
        imgData.data[idx + 2] = v;
        imgData.data[idx + 3] = 255;
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

// Refresh preview canvas from current source image + slider/checkbox state.
function refreshLogoPreview() {
  if (!logoSourceImage) return;
  const threshold = parseInt(logoThresholdInput.value, 10);
  const invert = logoInvertInput.checked;
  logoBitmap = imageToLogoBitmap(logoSourceImage, threshold, invert);
  if (logoPreviewCanvas) bitmapToCanvas(logoBitmap, logoPreviewCanvas);
  updateLogoUploadButton();
}

function updateLogoUploadButton() {
  updateActionButtons();
}

// ========== LOGO: FILE INPUT + LIVE PREVIEW ==========
if (logoFileInput) {
  logoFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        logoSourceImage = img;
        if (logoFileName) {
          logoFileName.textContent = file.name;
          logoFileName.classList.add('has-file');
        }
        if (logoFileLabel) logoFileLabel.classList.add('has-file');
        if (logoControls) logoControls.hidden = false;
        log(t('logoLoaded', file.name), 'success');
        refreshLogoPreview();
      };
      img.onerror = () => log(t('logoDecodeError'), 'error');
      img.src = ev.target.result;
    };
    fr.readAsDataURL(file);
  });
}

if (logoThresholdInput) {
  logoThresholdInput.addEventListener('input', () => {
    if (logoThresholdValue) logoThresholdValue.textContent = logoThresholdInput.value;
    refreshLogoPreview();
  });
}

if (logoInvertInput) {
  logoInvertInput.addEventListener('change', refreshLogoPreview);
}

// ========== LOGO: UPLOAD ==========
if (logoUploadBtn) {
  logoUploadBtn.addEventListener('click', async () => {
    if (!logoBitmap) return;
    const operation = beginToolsOperation('upload-logo', true);
    if (!operation) return;
    if (progressContainer) progressContainer.style.display = 'block';
    updateProgress(0);

    try {
      if (!port) await connect();
      readBuffer = [];
      await sleep(1000);

      const devInfo = await requestDeviceInfo();
      log(t('logoUploading'), 'info');

      // Build full payload: 8-byte magic + 1024-byte bitmap, padded to 16-byte chunks.
      const payload = new Uint8Array(LOGO_PADDED_SIZE);
      payload.fill(0xFF);
      payload.set(LOGO_MAGIC, 0);
      payload.set(logoBitmap, LOGO_HEADER_SIZE);

      let offset = LOGO_EEPROM_OFFSET;
      for (let i = 0; i < LOGO_PADDED_SIZE; i += CHUNK_SIZE) {
        const pct = Math.round((i / LOGO_PADDED_SIZE) * 100);
        updateProgress(pct);

        const msg = createMessage(MSG_WRITE_EEPROM, 24);
        const view = new DataView(msg.buffer);
        view.setUint16(4, offset, true);
        view.setUint16(6, CHUNK_SIZE, true);
        msg[7] = 1;
        view.setUint32(8, devInfo.timestamp, true);

        for (let j = 0; j < CHUNK_SIZE; j++) {
          msg[12 + j] = payload[i + j];
        }

        await sendMessage(msg);

        let gotResponse = false;
        for (let attempt = 0; attempt < 300 && !gotResponse; attempt++) {
          await sleep(10);
          const resp = fetchMessage(readBuffer);
          if (!resp) continue;
          if (resp.msgType === MSG_WRITE_EEPROM_RESP) {
            const dv = new DataView(resp.data.buffer);
            const respOffset = dv.getUint16(0, true);
            if (respOffset === offset) {
              gotResponse = true;
              offset += CHUNK_SIZE;
            }
          }
        }

        if (!gotResponse) {
          throw new Error(t('eepromError', offset.toString(16)));
        }
      }

      updateProgress(100);
      log(t('logoUploadComplete'), 'success');

      log(t('rebooting'), 'info');
      const rebootMsg = createMessage(MSG_REBOOT, 0);
      await sendMessage(rebootMsg);
      await sleep(500);
      log(t('rebootComplete'), 'success');

      setTimeout(() => {
        if (progressContainer) progressContainer.style.display = 'none';
        updateProgress(0);
      }, 800);
    } catch (e) {
      log(t('error', e?.message ?? String(e)), 'error');
    } finally {
      if (port) await disconnect();
      endToolsOperation(operation);
    }
  });
}

// ========== LOGO: DUMP ==========
if (logoDumpBtn) {
  logoDumpBtn.addEventListener('click', async () => {
    const operation = beginToolsOperation('dump-logo', false);
    if (!operation) return;
    if (progressContainer) progressContainer.style.display = 'block';
    updateProgress(0);
    if (logoDumpResult) logoDumpResult.hidden = true;

    try {
      if (!port) await connect();
      readBuffer = [];
      await sleep(1000);

      const devInfo = await requestDeviceInfo();
      log(t('logoDumping'), 'info');

      const dumped = new Uint8Array(LOGO_PADDED_SIZE);
      let offset = LOGO_EEPROM_OFFSET;

      for (let i = 0; i < LOGO_PADDED_SIZE; i += CHUNK_SIZE) {
        const pct = Math.round((i / LOGO_PADDED_SIZE) * 100);
        updateProgress(pct);

        const msg = createMessage(MSG_READ_EEPROM, 8);
        const view = new DataView(msg.buffer);
        view.setUint16(4, offset, true);
        view.setUint16(6, CHUNK_SIZE, true);
        view.setUint32(8, devInfo.timestamp, true);
        await sendMessage(msg);

        let gotResponse = false;
        for (let attempt = 0; attempt < 300 && !gotResponse; attempt++) {
          await sleep(10);
          const resp = fetchMessage(readBuffer);
          if (!resp) continue;
          if (resp.msgType === MSG_READ_EEPROM_RESP) {
            const dv = new DataView(resp.data.buffer);
            const respOffset = dv.getUint16(0, true);
            const respSize = resp.data[2];
            if (respOffset === offset && respSize === CHUNK_SIZE) {
              for (let j = 0; j < CHUNK_SIZE; j++) {
                dumped[i + j] = resp.data[4 + j];
              }
              gotResponse = true;
              offset += CHUNK_SIZE;
            }
          }
        }

        if (!gotResponse) {
          throw new Error(t('eepromError', offset.toString(16)));
        }
      }

      updateProgress(100);

      // Verify magic header (informational only, do not abort if missing).
      let magicOk = true;
      for (let i = 0; i < LOGO_HEADER_SIZE; i++) {
        if (dumped[i] !== LOGO_MAGIC[i]) { magicOk = false; break; }
      }
      log(magicOk ? t('logoMagicOk') : t('logoMagicMissing'), magicOk ? 'success' : 'info');

      // Extract bitmap and render
      const bitmap = dumped.slice(LOGO_HEADER_SIZE, LOGO_HEADER_SIZE + LOGO_BITMAP_SIZE);
      if (logoDumpedCanvas) {
        bitmapToCanvas(bitmap, logoDumpedCanvas);
        logoDumpedCanvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          if (logoDumpLink) {
            logoDumpLink.href = url;
            logoDumpLink.download = 'logo.png';
          }
        }, 'image/png');
      }
      if (logoDumpResult) logoDumpResult.hidden = false;
      log(t('logoDumpComplete'), 'success');

      setTimeout(() => {
        if (progressContainer) progressContainer.style.display = 'none';
        updateProgress(0);
      }, 800);
    } catch (e) {
      log(t('error', e?.message ?? String(e)), 'error');
    } finally {
      if (port) await disconnect();
      endToolsOperation(operation);
    }
  });
}

// ========== EXPORT RF LOG ==========
async function collectRfLogRows() {
  const rf = window.UVTOOLS_RF_LOG;
  if (!rf) throw new Error(t('rfLogProtocolUnavailable'));

  const rows = new Map();
  let firstMainAt = 0;
  let lastHistoryAt = 0;
  let gotHistory = false;
  let lastKeepaliveAt = 0;
  const startedAt = Date.now();
  const deadline = Date.now() + RF_LOG_EXPORT_TIMEOUT_MS;

  await writer.write(rf.featureKeepalive(true));
  lastKeepaliveAt = Date.now();

  while (Date.now() < deadline) {
    const now = Date.now();
    if (now - lastKeepaliveAt >= RF_LOG_KEEPALIVE_INTERVAL_MS) {
      await writer.write(rf.featureKeepalive(!firstMainAt));
      lastKeepaliveAt = Date.now();
    }

    let frame = rf.takeViewerFrame(readBuffer);
    while (frame) {
      if (frame.type === rf.TYPE_RF_LOG) {
        let packet;
        try {
          packet = rf.parseMainPacket(frame.payload);
        } catch (error) {
          if (error.code === 'RF_LOG_VERSION') throw new Error(t('rfLogVersionUnsupported'));
          throw error;
        }

        if (packet.disabled) throw new Error(t('rfLogDisabled'));
        if (packet.full) {
          if (!firstMainAt) firstMainAt = Date.now();
          if (!packet.hasTraffic) return [];
          rf.mergeRows(rows, packet.rows);
          const trafficCount = Array.from(rows.values())
            .filter(row => (row.flags & rf.FLAG_SESSION) === 0).length;
          updateProgress(Math.min(99, (trafficCount / rf.VISIBLE_TRAFFIC_COUNT) * 100));
          if (packet.rows.length < rf.ROW_COUNT) {
            return rf.limitVisibleRows(rows.values());
          }
        }
      } else if (frame.type === rf.TYPE_RF_LOG_HISTORY) {
        const page = rf.parseHistoryPacket(frame.payload);
        gotHistory = true;
        lastHistoryAt = Date.now();
        rf.mergeRows(rows, page);

        const trafficCount = Array.from(rows.values())
          .filter(row => (row.flags & rf.FLAG_SESSION) === 0).length;
        updateProgress(Math.min(99, (trafficCount / rf.VISIBLE_TRAFFIC_COUNT) * 100));
        log(t('rfLogProgress', trafficCount), 'info');

        if (page.length < rf.ROW_COUNT || trafficCount >= rf.VISIBLE_TRAFFIC_COUNT) {
          return rf.limitVisibleRows(rows.values());
        }
      }

      frame = rf.takeViewerFrame(readBuffer);
    }

    const quietSince = gotHistory ? lastHistoryAt : firstMainAt;
    if (quietSince && Date.now() - quietSince >= RF_LOG_HISTORY_IDLE_MS) {
      return rf.limitVisibleRows(rows.values());
    }
    if (!firstMainAt && Date.now() - startedAt >= RF_LOG_INITIAL_TIMEOUT_MS) {
      throw new Error(t('rfLogTimeout'));
    }
    await sleep(25);
  }

  throw new Error(t('rfLogTimeout'));
}

if (rfLogExportBtn) {
  rfLogExportBtn.addEventListener('click', async () => {
    const operation = beginToolsOperation('export-rf-log', false);
    if (!operation) return;
    if (progressContainer) progressContainer.style.display = 'block';
    updateProgress(0);
    if (rfLogDownload) rfLogDownload.style.display = 'none';
    let completed = false;

    try {
      if (!port) await connect();
      readBuffer = [];
      log(t('rfLogReading'), 'info');

      const rows = await collectRfLogRows();
      const trafficCount = rows.filter(row =>
        (row.flags & window.UVTOOLS_RF_LOG.FLAG_SESSION) === 0).length;
      if (trafficCount === 0) throw new Error(t('rfLogEmpty'));

      const csv = window.UVTOOLS_RF_LOG.rowsToCsv(rows);
      if (rfLogDownloadUrl) URL.revokeObjectURL(rfLogDownloadUrl);
      rfLogDownloadUrl = URL.createObjectURL(
        new Blob([csv], { type: 'text/csv;charset=utf-8' })
      );
      if (rfLogLink) {
        rfLogLink.href = rfLogDownloadUrl;
        rfLogLink.download = 'rf-log.csv';
      }
      if (rfLogDownload) rfLogDownload.style.display = 'block';

      updateProgress(100);
      log(t('rfLogComplete', trafficCount), 'success');
      completed = true;
      setTimeout(() => {
        if (progressContainer) progressContainer.style.display = 'none';
        updateProgress(0);
      }, 800);
    } catch (e) {
      log(t('error', e?.message ?? String(e)), 'error');
    } finally {
      if (!completed) {
        if (progressContainer) progressContainer.style.display = 'none';
        updateProgress(0);
      }
      if (port) await disconnect();
      endToolsOperation(operation);
    }
  });
}

// ========== UI HELPERS ==========
function log(message, type = '') {
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  if (logDiv) {
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
  } else {
    console.log(message);
  }
}

function updateProgress(percent) {
  const rounded = Math.round(percent);
  const label = `${rounded}%`;
  const changed = progressFill
    ? progressFill.style.width !== label
    : Boolean(progressLabel && progressLabel.textContent !== label);
  if (progressFill) progressFill.style.width = label;
  if (progressLabel) progressLabel.textContent = label;
  const bar = document.querySelector('.progress-bar');
  if (bar) bar.setAttribute('aria-valuenow', String(rounded));
  return changed;
}

function waitForProgressPaint() {
  if (document.visibilityState !== 'visible') return Promise.resolve();
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ========== FIRMWARE SLOTS (multiboot) ==========
const SLOT_COUNT = 4;             // user slots shown in UV Studio (1..4)
const SLOT_FIRST = 1;             // firmware index of the first user slot; slot 0 is the
                                  // firmware-managed base backup (hidden here, write-protected)
const SLOT_END = SLOT_FIRST + SLOT_COUNT;  // exclusive upper bound (5)
const SLOT_IMG_OFFSET = 0x1000;   // image starts after the header sector
const SLOT_IMG_MAX = 0x1D800;     // 118 KiB application region
// Wire command = 8 (frame) + 4 (msg hdr) + 12 (prefix) + chunk. The firmware VCP
// RX ring is only 256 B (VCP_RX_BUF_SIZE) with no overflow guard, so keep the whole
// command well under that: 128 -> 152 B command, ~104 B of headroom.
const SLOT_WRITE_CHUNK = 128;
const SLOT_HDR_SIZE = 64;
const SLOT_MAGIC = 0x31424D46;    // "FMB1"
const SLOT_HDR_VERSION = 1;
const SLOT_FLAG_COMMITTED = 1;
const slotStatuses = [null, null, null, null, null]; // last known MB_ERR_* per firmware slot (index 0 = base backup, unused here)

const MSG_SLOT_INFO = 0x0720, MSG_SLOT_INFO_RESP = 0x0721;
const MSG_SLOT_ERASE = 0x0722, MSG_SLOT_ERASE_RESP = 0x0723;
const MSG_SLOT_WRITE = 0x0724, MSG_SLOT_WRITE_RESP = 0x0725;
const MSG_SLOT_VALIDATE = 0x0726, MSG_SLOT_VALIDATE_RESP = 0x0727;
const MSG_PROFILE_ERASE = 0x0728, MSG_PROFILE_ERASE_RESP = 0x0729;

// Firmware MB_ERR_* codes (0..8) -> i18n status keys.
const SLOT_STATUS_KEY = ['slotStateValid', 'slotStateEmpty', 'slotStateNewHdr',
  'slotStateIncomplete', 'slotStateBadSize', 'slotStateCrc', 'slotStateSpi',
  'slotStateBadSlot', 'slotStateAuth'];
function slotStatusText(code) { return t(SLOT_STATUS_KEY[code] || 'slotStateError'); }

// CRC-32 (zlib/PNG, poly 0xEDB88320) — must match the firmware mb_crc32_update.
function slotCrc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xEDB88320 & -(crc & 1));
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Derive the edition from the canonical f4hwn.<preset>.bin filename. Model and
// version suffixes remain supported, without maintaining a preset allowlist.
function slotEditionFromFilename(filename) {
  if (!filename) return '';
  const match = filename.match(
    /^f4hwn[._-](?:(?:k1|k5v3)[._-])?([a-z][a-z0-9-]*)(?:[._-].*)?\.bin$/i
  );
  if (!match) return '';
  // FieldOps is the only current edition with an internal capital letter.
  return match[1]
    .split('-')
    .filter(Boolean)
    .map(token => token.toLowerCase() === 'fieldops'
      ? 'FieldOps'
      : token.charAt(0).toUpperCase() + token.slice(1).toLowerCase())
    .join(' ')
    .slice(0, 15);
}

function slotVersionFromFilename(filename) {
  if (!filename) return '';
  const match = filename.match(/[._-]v(\d+(?:\.\d+)*)\.bin$/i);
  return match ? `v${match[1]}`.slice(0, 15) : '';
}

// Pull canonical metadata from the filename, with an embedded-version fallback
// for older filenames which do not carry a final .v<version> component.
function slotExtractMeta(bytes, filename) {
  let text = '';
  for (let i = 0; i < bytes.length; i++) {
    const c = bytes[i];
    text += (c >= 32 && c < 127) ? String.fromCharCode(c) : '\n';
  }
  let fwVersion = slotVersionFromFilename(filename);
  // Author token (no '+') + a canonical numeric version. This accepts compact
  // versions such as "RADIO v50" as well as "F4HWN v5.9.0".
  const vm = text.match(/[A-Za-z0-9]+ v\d+(?:\.\d+)*/i);
  if (!fwVersion && vm) fwVersion = vm[0];
  const name = slotEditionFromFilename(filename);
  return { name, fwVersion: fwVersion.slice(0, 15) };
}

// The radio's multiboot font/header are ASCII-only and reserve one byte for
// NUL. Transliterate common accented names and keep at most 15 visible bytes.
function slotNormalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 15);
}

function slotBuildHeader(imageSize, crc, meta) {
  const h = new Uint8Array(SLOT_HDR_SIZE);
  const dv = new DataView(h.buffer);
  dv.setUint32(0, SLOT_MAGIC, true);
  dv.setUint16(4, SLOT_HDR_VERSION, true);
  dv.setUint16(6, SLOT_FLAG_COMMITTED, true);
  dv.setUint32(8, imageSize, true);
  dv.setUint32(12, crc, true);
  const putStr = (off, len, s) => { for (let i = 0; i < len; i++) h[off + i] = i < s.length ? (s.charCodeAt(i) & 0x7f) : 0; };
  putStr(16, 16, meta.name || '');
  putStr(32, 16, meta.fwVersion || '');
  return h;
}

function slotParseHeader(b) {
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const readStr = (off, len) => { let s = ''; for (let i = 0; i < len; i++) { const c = b[off + i]; if (!c) break; s += String.fromCharCode(c); } return s; };
  return {
    magic: dv.getUint32(0, true),
    imageSize: dv.getUint32(8, true),
    imageCrc32: dv.getUint32(12, true),
    name: readStr(16, 16),
    fwVersion: readStr(32, 16)
  };
}

// Send one slot command and wait for its matching response; returns data bytes.
async function slotCommand(msgType, dataBytes, respType, timeoutMs) {
  const session = toolsSerialSession;
  readBuffer = [];
  const msg = createMessage(msgType, dataBytes.length);
  msg.set(dataBytes, 4);
  await sendMessage(msg);

  let revision = serialReadRevision;
  const deadline = performance.now() + timeoutMs;
  for (;;) {
    if (session !== toolsSerialSession) {
      throw Object.assign(new Error(t('tools_disconnected')), { code: 'UVSTUDIO_SERIAL_SESSION_CHANGED' });
    }
    for (;;) {
      const buffered = readBuffer.length;
      const resp = fetchMessage(readBuffer);
      if (resp && resp.msgType === respType) return resp.data;
      if (resp === null && readBuffer.length === buffered) break;
    }

    const remaining = deadline - performance.now();
    if (remaining <= 0) break;
    const received = await waitForSerialRead(revision, remaining);
    revision = serialReadRevision;
    if (!received) break;
  }
  throw new Error(t('slotsTimeout'));
}

async function slotInfo(slot) {
  const data = await slotCommand(MSG_SLOT_INFO, Uint8Array.of(slot), MSG_SLOT_INFO_RESP, 3000);
  return { slot, status: data[1], hdr: slotParseHeader(data.subarray(2, 2 + SLOT_HDR_SIZE)) };
}

async function slotErase(slot, ts) {
  const d = new Uint8Array(6);
  d[0] = slot;
  new DataView(d.buffer).setUint32(2, ts, true);
  const data = await slotCommand(MSG_SLOT_ERASE, d, MSG_SLOT_ERASE_RESP, 30000);
  return data[1];
}

async function slotProfileErase(slot, ts) {
  const d = new Uint8Array(6);
  d[0] = slot;
  new DataView(d.buffer).setUint32(2, ts, true);
  const data = await slotCommand(MSG_PROFILE_ERASE, d, MSG_PROFILE_ERASE_RESP, 30000);
  return data[1];
}

async function slotWriteChunk(slot, offset, ts, chunk) {
  const d = new Uint8Array(12 + chunk.length);
  const dv = new DataView(d.buffer);
  d[0] = slot;
  dv.setUint32(2, offset, true);
  dv.setUint16(6, chunk.length, true);
  dv.setUint32(8, ts, true);
  d.set(chunk, 12);
  const data = await slotCommand(MSG_SLOT_WRITE, d, MSG_SLOT_WRITE_RESP, 1500);
  return data[1];
}

// Programming the same bytes onto already-erased (or matching) NOR flash is
// idempotent, so a lost/garbled reply can be recovered by re-sending the chunk.
async function slotWriteChunkRetry(slot, offset, ts, chunk) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await slotWriteChunk(slot, offset, ts, chunk);
    } catch (e) {
      if (attempt >= 4) throw e;
      log(t('slotRetry', offset), 'info');
      await sleep(60);
    }
  }
}

async function slotValidate(slot) {
  const data = await slotCommand(MSG_SLOT_VALIDATE, Uint8Array.of(slot), MSG_SLOT_VALIDATE_RESP, 20000);
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  return { crc: dv.getUint32(0, true) >>> 0, status: data[5] };
}

function slotRenderRow(slot, info) {
  slotStatuses[slot] = info ? info.status : null;
  if (!slotsTableBody) return;
  const row = slotsTableBody.querySelector(`tr[data-slot="${slot}"]`);
  if (!row) return;
  const valid = info && info.status === 0;
  const committed = info && (info.status === 0 || info.status === 5); // header present (CRC may be bad)
  const hdr = info && info.hdr;
  row.querySelector('.slot-name').textContent = committed ? (hdr.name || '—') : '—';
  row.querySelector('.slot-version').textContent = committed ? (hdr.fwVersion || '—') : '—';
  row.querySelector('.slot-size').textContent = committed ? `${Math.round(hdr.imageSize / 1024)} KB` : '—';
  const stateCell = row.querySelector('.slot-state');
  stateCell.textContent = info ? slotStatusText(info.status) : '—';
  stateCell.className = 'slot-state ' + (valid ? 'ok' : (info && info.status === 1 ? 'empty' : 'bad'));
}

function slotBuildTable() {
  if (!slotsTableBody) return;
  slotsTableBody.innerHTML = '';
  for (let s = SLOT_FIRST; s < SLOT_END; s++) {
    const tr = document.createElement('tr');
    tr.dataset.slot = String(s);
    tr.innerHTML =
      `<td class="slot-idx">${s}</td>` +
      `<td class="slot-name">—</td>` +
      `<td class="slot-version">—</td>` +
      `<td class="slot-size">—</td>` +
      `<td><span class="slot-state">—</span></td>` +
      `<td class="slot-actions"></td>`;
    const eraseBtn = document.createElement('button');
    eraseBtn.type = 'button';
    eraseBtn.className = 'slot-act-erase';
    eraseBtn.textContent = t('slotEraseFw');
    eraseBtn.addEventListener('click', () => { void slotEraseFlow(s); });
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'slot-act-reset';
    resetBtn.textContent = t('slotResetConfig');
    resetBtn.addEventListener('click', () => { void slotResetConfigFlow(s); });
    const actions = tr.querySelector('.slot-actions');
    actions.appendChild(eraseBtn);
    actions.appendChild(resetBtn);
    slotsTableBody.appendChild(tr);
  }
}

// Re-localize the static slot labels after a language change.
function slotLocalize() {
  if (slotsTableBody) {
    slotsTableBody.querySelectorAll('.slot-act-erase').forEach(b => { b.textContent = t('slotEraseFw'); });
    slotsTableBody.querySelectorAll('.slot-act-reset').forEach(b => { b.textContent = t('slotResetConfig'); });
  }
  if (slotImage && slotMetaEl) {
    slotMetaEl.textContent = t('slotDetected', slotMeta.name || '?', slotMeta.fwVersion || '?', Math.round(slotImage.length / 1024));
  }
}

async function finishSlotOperation(op) {
  try {
    if (activeToolsView !== 'slots' && toolsSerial.isOwner()) await disconnect();
  } finally {
    endToolsOperation(op);
  }
}

// Smart default target: first empty slot (no FMB1 header), else the first user slot.
function slotPickDefaultTarget() {
  if (!slotTargetSelect) return;
  let target = SLOT_FIRST;
  for (let s = SLOT_FIRST; s < SLOT_END; s++) {
    if (slotStatuses[s] === 1) { target = s; break; }
  }
  slotTargetSelect.value = String(target);
}

async function slotRefreshFlow() {
  const op = beginToolsOperation('slots-refresh', false);
  if (!op) return;
  try {
    if (!port) await connect();
    log(t('slotsScanning'), 'info');
    for (let s = SLOT_FIRST; s < SLOT_END; s++) {
      try { slotRenderRow(s, await slotInfo(s)); }
      catch (e) {
        if (e?.code === 'UVSTUDIO_SERIAL_SESSION_CHANGED' || !port) throw e;
        slotRenderRow(s, { slot: s, status: 6, hdr: null });
      }
    }
    slotPickDefaultTarget();
    log(t('slotsScanDone'), 'success');
  } catch (e) {
    log(t('slotsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishSlotOperation(op);
  }
}

async function slotEraseFlow(slot) {
  const op = beginToolsOperation('slots-erase', true);
  if (!op) return;
  try {
    if (!port) await connect();
    readBuffer = [];
    await sleep(500);
    const dev = await requestDeviceInfo();
    log(t('slotErasing', slot), 'info');
    const st = await slotErase(slot, dev.timestamp);
    if (st !== 0) throw new Error(slotStatusText(st));
    log(t('slotErased', slot), 'success');
    slotRenderRow(slot, await slotInfo(slot));
  } catch (e) {
    log(t('slotsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishSlotOperation(op);
  }
}

// Reset a slot's config profile (channels/settings). The firmware slot image is
// untouched; the next boot on that slot re-seeds factory defaults.
async function slotResetConfigFlow(slot) {
  const op = beginToolsOperation('slots-reset-config', true);
  if (!op) return;
  try {
    if (!port) await connect();
    readBuffer = [];
    await sleep(500);
    const dev = await requestDeviceInfo();
    log(t('slotConfigResetting', slot), 'info');
    const st = await slotProfileErase(slot, dev.timestamp);
    if (st !== 0) throw new Error(slotStatusText(st));
    log(t('slotConfigReset', slot), 'success');
  } catch (e) {
    log(t('slotsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishSlotOperation(op);
  }
}

async function slotWriteFlow() {
  if (!slotImage) return;
  const slot = slotTargetSelect ? parseInt(slotTargetSelect.value, 10) : SLOT_FIRST;
  if (!(slot >= SLOT_FIRST && slot < SLOT_END)) return;
  if (slotImage.length > SLOT_IMG_MAX) { log(t('slotTooBig'), 'error'); return; }
  const displayName = slotNormalizeName(slotNameInput?.value ?? slotMeta.name);
  if (!displayName) return;
  if (slotNameInput) slotNameInput.value = displayName;

  const op = beginToolsOperation('slots-write', true);
  if (!op) return;
  if (progressContainer) progressContainer.style.display = 'block';
  updateProgress(0);
  try {
    if (!port) await connect();
    readBuffer = [];
    await sleep(500);
    const dev = await requestDeviceInfo();
    const ts = dev.timestamp;
    const image = slotImage;
    const crc = slotCrc32(image);

    log(t('slotErasing', slot), 'info');
    let st = await slotErase(slot, ts);
    if (st !== 0) throw new Error('erase: ' + slotStatusText(st));

    log(t('slotWriting', slot), 'info');
    for (let off = 0; off < image.length; off += SLOT_WRITE_CHUNK) {
      const chunk = image.subarray(off, Math.min(off + SLOT_WRITE_CHUNK, image.length));
      st = await slotWriteChunkRetry(slot, SLOT_IMG_OFFSET + off, ts, chunk);
      if (st !== 0) throw new Error('write @' + off + ': ' + slotStatusText(st));
      const progressChanged = updateProgress(((off + chunk.length) / image.length) * 95);
      if (progressChanged) await waitForProgressPaint();
    }

    const hdr = slotBuildHeader(image.length, crc, { ...slotMeta, name: displayName });
    st = await slotWriteChunkRetry(slot, 0, ts, hdr);
    if (st !== 0) throw new Error('header: ' + slotStatusText(st));

    updateProgress(97);
    await waitForProgressPaint();
    log(t('slotVerifying', slot), 'info');
    const v = await slotValidate(slot);
    if (v.status !== 0 || v.crc !== crc) throw new Error('verify: ' + slotStatusText(v.status));
    updateProgress(100);
    log(t('slotWriteOk', slot), 'success');
    slotRenderRow(slot, await slotInfo(slot));
    slotPickDefaultTarget();
    setTimeout(() => { if (progressContainer) progressContainer.style.display = 'none'; }, 1200);
  } catch (e) {
    log(t('slotsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishSlotOperation(op);
  }
}

function clearSlotImage() {
  slotImage = null;
  slotMeta = { name: '', fwVersion: '' };
  if (slotNameInput) slotNameInput.value = '';
  if (slotFileName) {
    slotFileName.setAttribute('data-i18n', 'fileNoFile');
    slotFileName.textContent = t('fileNoFile');
    slotFileName.classList.remove('has-file');
  }
  if (slotFileLabel) slotFileLabel.classList.remove('has-file');
  if (slotMetaEl) slotMetaEl.textContent = '';
  updateActionButtons();
}

// Start a new slot-image selection and keep the catalog and local picker
// mutually exclusive. Any older in-flight download or FileReader completion is
// ignored, so a quick second choice always wins.
function beginSlotImageLoad(source) {
  const seq = ++slotImageLoadSeq;
  if (slotImageLoadAbort) {
    try { slotImageLoadAbort.abort(); } catch (e) {}
    slotImageLoadAbort = null;
  }
  clearSlotImage();
  if (source === 'url' && slotFileInput) slotFileInput.value = '';
  window.dispatchEvent(new CustomEvent('uvstudio:slotfirmwareselect', { detail: { source } }));
  return seq;
}

function setSlotImageBuffer(buf, name = 'firmware.bin') {
  slotImage = new Uint8Array(buf);
  slotMeta = slotExtractMeta(slotImage, name);
  if (slotNameInput) slotNameInput.value = slotMeta.name;
  if (slotFileName) {
    slotFileName.removeAttribute('data-i18n');
    slotFileName.textContent = name;
    slotFileName.classList.add('has-file');
  }
  if (slotFileLabel) slotFileLabel.classList.add('has-file');
  if (slotMetaEl) {
    slotMetaEl.textContent = t(
      'slotDetected',
      slotMeta.name || '?',
      slotMeta.fwVersion || '?',
      Math.round(slotImage.length / 1024)
    );
  }
  log(t('slotFileLoaded', name), 'success');
  updateActionButtons();
}

async function loadSlotFirmwareFromURL(url) {
  const seq = beginSlotImageLoad('url');
  const controller = new AbortController();
  slotImageLoadAbort = controller;
  try {
    log(t('loadingFromUrl', url), 'info');
    const urlObj = normalizeFirmwareDownloadURL(url);
    const res = await fetch(urlObj.toString(), {
      cache: 'no-cache',
      mode: 'cors',
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`${t('urlFetchError')} HTTP ${res.status}`);

    const buf = await res.arrayBuffer();
    if (seq !== slotImageLoadSeq) return;
    const fname = (urlObj.pathname.split('/').pop() || 'firmware.bin').split('?')[0];
    setSlotImageBuffer(buf, fname);
  } catch (err) {
    if (err && err.name === 'AbortError') return;
    log(`${t('urlFetchError')} ${err?.message ?? String(err)}`, 'error');
    if (seq === slotImageLoadSeq) clearSlotImage();
  } finally {
    if (slotImageLoadAbort === controller) slotImageLoadAbort = null;
  }
}

if (slotFileInput) {
  slotFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const seq = beginSlotImageLoad('local');
    const fr = new FileReader();
    fr.onload = (ev) => {
      if (seq === slotImageLoadSeq) setSlotImageBuffer(ev.target.result, file.name);
    };
    fr.readAsArrayBuffer(file);
  });
}
if (slotNameInput) slotNameInput.addEventListener('input', updateActionButtons);
if (slotWriteBtn) slotWriteBtn.addEventListener('click', () => { void slotWriteFlow(); });
if (slotsRefreshBtn) slotsRefreshBtn.addEventListener('click', () => { void slotRefreshFlow(); });
slotBuildTable();

// ========== OVERLAY APPS ==========
// Parallels the firmware-slots feature, targeting the external-flash "Apps"
// region via the 0x073x command family. A .app file already carries its 64-byte
// header (built by pack_app.py), so we just split header/code and write both.
const APP_SLOT_COUNT = 16;        // firmware capacity (0..15)
const APP_SLOT_FIRST = 0;         // physical slot indices used here: 0..7
const APP_SLOT_LAST = 7;          // shown to the user as 1..8 (label = index + 1)
const appSlotLabel = (s) => String(s + 1);   // physical slot -> user-facing number
const APP_IMG_OFFSET = 0x1000;    // code starts after the header sector
const APP_HDR_SIZE = 64;
const APP_MAGIC = 0x31504146;     // "FAP1"
const APP_FLAG_COMMITTED = 1;
const APP_WRITE_CHUNK = 128;      // keep the whole command under the 256 B VCP ring

const MSG_APP_INFO = 0x0730, MSG_APP_INFO_RESP = 0x0731;
const MSG_APP_ERASE = 0x0732, MSG_APP_ERASE_RESP = 0x0733;
const MSG_APP_WRITE = 0x0734, MSG_APP_WRITE_RESP = 0x0735;
const MSG_APP_VALIDATE = 0x0736, MSG_APP_VALIDATE_RESP = 0x0737;

// APP_ERR_* (0..8) -> i18n status keys.
const APP_STATUS_KEY = ['appStateValid', 'appStateBadSlot', 'appStateEmpty', 'appStateAbi',
  'appStateIncomplete', 'appStateBadSize', 'appStateCrc', 'appStateVma', 'appStateAuth'];
function appStatusText(code) { return t(APP_STATUS_KEY[code] || 'slotStateError'); }

const appFileInput   = document.getElementById('appFile');
const appFileLabel   = document.getElementById('appFileLabel');
const appFileName    = document.getElementById('appFileName');
const appTargetSelect = document.getElementById('appTarget');
const appInstallBtn  = document.getElementById('appInstallBtn');
const appsRefreshBtn = document.getElementById('appsRefreshBtn');
const appsTableBody  = document.getElementById('appsTableBody');
const appMetaEl      = document.getElementById('appMeta');

let appImage = null;   // full .app bytes (header + code)
let appMeta  = { name: '', version: '', codeSize: 0 };

function appParseHeader(b) {
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const readStr = (off, len) => { let s = ''; for (let i = 0; i < len; i++) { const c = b[off + i]; if (!c) break; s += String.fromCharCode(c); } return s; };
  // app_header_t: magic@0 hdr@4 abi@6 codeSize@8 crc@12 entry@16 flags@18
  //               name@20 version@36 linkVma@52 (differs from the firmware header).
  return {
    magic: dv.getUint32(0, true),
    abiVersion: dv.getUint16(6, true),
    codeSize: dv.getUint32(8, true),
    codeCrc32: dv.getUint32(12, true),
    name: readStr(20, 16),
    version: readStr(36, 16),
    linkVma: dv.getUint32(52, true) >>> 0
  };
}

async function appInfo(slot) {
  const data = await slotCommand(MSG_APP_INFO, Uint8Array.of(slot), MSG_APP_INFO_RESP, 3000);
  return { slot, status: data[1], hdr: appParseHeader(data.subarray(2, 2 + APP_HDR_SIZE)) };
}
async function appErase(slot, ts) {
  const d = new Uint8Array(6); d[0] = slot; new DataView(d.buffer).setUint32(2, ts, true);
  return (await slotCommand(MSG_APP_ERASE, d, MSG_APP_ERASE_RESP, 30000))[1];
}
async function appWriteChunk(slot, offset, ts, chunk) {
  const d = new Uint8Array(12 + chunk.length); const dv = new DataView(d.buffer);
  d[0] = slot; dv.setUint32(2, offset, true); dv.setUint16(6, chunk.length, true); dv.setUint32(8, ts, true);
  d.set(chunk, 12);
  return (await slotCommand(MSG_APP_WRITE, d, MSG_APP_WRITE_RESP, 1500))[1];
}
async function appWriteChunkRetry(slot, offset, ts, chunk) {
  for (let attempt = 0; ; attempt++) {
    try { return await appWriteChunk(slot, offset, ts, chunk); }
    catch (e) { if (attempt >= 4) throw e; await sleep(60); }
  }
}
async function appValidate(slot) {
  return (await slotCommand(MSG_APP_VALIDATE, Uint8Array.of(slot), MSG_APP_VALIDATE_RESP, 20000))[1];
}

function appRenderRow(slot, info) {
  if (!appsTableBody) return;
  const row = appsTableBody.querySelector(`tr[data-slot="${slot}"]`);
  if (!row) return;
  const valid = info && info.status === 0;
  const hdr = info && info.hdr;
  row.querySelector('.slot-name').textContent = valid ? (hdr.name || '—') : '—';
  row.querySelector('.slot-version').textContent = valid ? (hdr.version || '—') : '—';
  row.querySelector('.slot-size').textContent = valid ? `${(hdr.codeSize / 1024).toFixed(1)} KB` : '—';
  const stateCell = row.querySelector('.slot-state');
  stateCell.textContent = info ? appStatusText(info.status) : '—';
  stateCell.className = 'slot-state ' + (valid ? 'ok' : (info && info.status === 2 ? 'empty' : 'bad'));
  const del = row.querySelector('.app-act-delete');
  if (del) del.disabled = !valid;
}

function appBuildTable() {
  if (!appsTableBody) return;
  appsTableBody.innerHTML = '';
  for (let s = APP_SLOT_FIRST; s <= APP_SLOT_LAST; s++) {
    const tr = document.createElement('tr');
    tr.dataset.slot = String(s);
    tr.innerHTML =
      `<td class="slot-idx">${appSlotLabel(s)}</td>` +
      `<td class="slot-name">—</td>` +
      `<td class="slot-version">—</td>` +
      `<td class="slot-size">—</td>` +
      `<td><span class="slot-state">—</span></td>` +
      `<td class="slot-actions"></td>`;
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'app-act-delete';
    del.textContent = t('appDelete');
    del.disabled = true;
    del.addEventListener('click', () => { void appDeleteFlow(s); });
    tr.querySelector('.slot-actions').appendChild(del);
    appsTableBody.appendChild(tr);
  }
  if (appTargetSelect && !appTargetSelect.options.length) {
    for (let s = APP_SLOT_FIRST; s <= APP_SLOT_LAST; s++) {
      const o = document.createElement('option'); o.value = String(s); o.textContent = appSlotLabel(s);
      appTargetSelect.appendChild(o);
    }
  }
}

async function finishAppOperation(op) {
  try { if (activeToolsView !== 'apps' && toolsSerial.isOwner()) await disconnect(); }
  finally { endToolsOperation(op); updateAppButtons(); }
}

async function appRefreshFlow() {
  const op = beginToolsOperation('apps-refresh', false);
  if (!op) return;
  try {
    if (!port) await connect();
    log(t('appsScanning'), 'info');
    for (let s = APP_SLOT_FIRST; s <= APP_SLOT_LAST; s++) {
      try { appRenderRow(s, await appInfo(s)); }
      catch (e) {
        if (e?.code === 'UVSTUDIO_SERIAL_SESSION_CHANGED' || !port) throw e;
        appRenderRow(s, { slot: s, status: 6, hdr: null });
      }
    }
    log(t('appsScanDone'), 'success');
  } catch (e) {
    log(t('appsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishAppOperation(op);
  }
}

async function appDeleteFlow(slot) {
  const op = beginToolsOperation('apps-delete', true);
  if (!op) return;
  try {
    if (!port) await connect();
    readBuffer = []; await sleep(500);
    const dev = await requestDeviceInfo();
    log(t('appErasing', appSlotLabel(slot)), 'info');
    const st = await appErase(slot, dev.timestamp);
    if (st !== 0) throw new Error(appStatusText(st));
    log(t('appErased', appSlotLabel(slot)), 'success');
    appRenderRow(slot, await appInfo(slot));
  } catch (e) {
    log(t('appsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishAppOperation(op);
  }
}

async function appInstallFlow() {
  if (!appImage) return;
  const slot = appTargetSelect ? parseInt(appTargetSelect.value, 10) : APP_SLOT_FIRST;
  if (!(slot >= APP_SLOT_FIRST && slot <= APP_SLOT_LAST)) return;
  const code = appImage.subarray(APP_HDR_SIZE);
  const header = appImage.subarray(0, APP_HDR_SIZE);
  if (code.length > 0x1000) { log(t('appTooBig'), 'error'); return; }

  const op = beginToolsOperation('apps-install', true);
  if (!op) return;
  if (progressContainer) progressContainer.style.display = 'block';
  updateProgress(0);
  try {
    if (!port) await connect();
    readBuffer = []; await sleep(500);
    const dev = await requestDeviceInfo();
    const ts = dev.timestamp;

    log(t('appErasing', appSlotLabel(slot)), 'info');
    let st = await appErase(slot, ts);
    if (st !== 0) throw new Error('erase: ' + appStatusText(st));

    log(t('appInstalling', appSlotLabel(slot)), 'info');
    for (let off = 0; off < code.length; off += APP_WRITE_CHUNK) {
      const chunk = code.subarray(off, Math.min(off + APP_WRITE_CHUNK, code.length));
      st = await appWriteChunkRetry(slot, APP_IMG_OFFSET + off, ts, chunk);
      if (st !== 0) throw new Error('write @' + off + ': ' + appStatusText(st));
      const changed = updateProgress(((off + chunk.length) / code.length) * 95);
      if (changed) await waitForProgressPaint();
    }
    // header last: it carries the committed flag, so a partial write never validates
    st = await appWriteChunkRetry(slot, 0, ts, header);
    if (st !== 0) throw new Error('header: ' + appStatusText(st));

    updateProgress(97); await waitForProgressPaint();
    log(t('appVerifying', appSlotLabel(slot)), 'info');
    const vs = await appValidate(slot);
    if (vs !== 0) throw new Error('verify: ' + appStatusText(vs));
    updateProgress(100);
    log(t('appInstalled', appSlotLabel(slot)), 'success');
    appRenderRow(slot, await appInfo(slot));
    setTimeout(() => { if (progressContainer) progressContainer.style.display = 'none'; }, 1200);
  } catch (e) {
    log(t('appsError', e?.message ?? String(e)), 'error');
  } finally {
    await finishAppOperation(op);
  }
}

function updateAppButtons() {
  const busy = !!activeOperationToken;
  if (appInstallBtn) appInstallBtn.disabled = !serialSupported || busy || !appImage;
  if (appsRefreshBtn) appsRefreshBtn.disabled = !serialSupported || busy;
  if (appsTableBody) appsTableBody.querySelectorAll('button').forEach(b => { if (busy) b.disabled = true; });
}

function clearAppImage() {
  appImage = null;
  appMeta = { name: '', version: '', codeSize: 0 };
  if (appFileName) { appFileName.setAttribute('data-i18n', 'fileNoFile'); appFileName.textContent = t('fileNoFile'); appFileName.classList.remove('has-file'); }
  if (appFileLabel) appFileLabel.classList.remove('has-file');
  if (appMetaEl) appMetaEl.textContent = '';
  updateAppButtons();
}

function setAppImageBuffer(buf, name) {
  const bytes = new Uint8Array(buf);
  if (bytes.length <= APP_HDR_SIZE) { log(t('appBadFile'), 'error'); clearAppImage(); return; }
  const hdr = appParseHeader(bytes);
  if (hdr.magic !== APP_MAGIC) { log(t('appBadFile'), 'error'); clearAppImage(); return; }
  appImage = bytes;
  appMeta = { name: hdr.name, version: hdr.version, codeSize: hdr.codeSize };
  if (appFileName) { appFileName.removeAttribute('data-i18n'); appFileName.textContent = name; appFileName.classList.add('has-file'); }
  if (appFileLabel) appFileLabel.classList.add('has-file');
  if (appMetaEl) appMetaEl.textContent = t('appDetected', hdr.name || '?', hdr.version || '?', (hdr.codeSize / 1024).toFixed(1));
  updateAppButtons();
}

if (appFileInput) {
  appFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = (ev) => setAppImageBuffer(ev.target.result, file.name);
    fr.readAsArrayBuffer(file);
  });
}
if (appInstallBtn) appInstallBtn.addEventListener('click', () => { void appInstallFlow(); });
if (appsRefreshBtn) appsRefreshBtn.addEventListener('click', () => { void appRefreshFlow(); });
appBuildTable();

// Refresh the app list on entering the Apps view; release serial on leaving.
window.addEventListener('uvstudio:toolviewchange', event => {
  const nextView = event.detail?.view || 'flash';
  if (nextView === 'apps') { updateAppButtons(); void appRefreshFlow(); }
});
window.addEventListener('uvstudio:languagechange', () => {
  if (appsTableBody) appsTableBody.querySelectorAll('.app-act-delete').forEach(b => { b.textContent = t('appDelete'); });
  if (appImage && appMetaEl) appMetaEl.textContent = t('appDetected', appMeta.name || '?', appMeta.version || '?', (appMeta.codeSize / 1024).toFixed(1));
});

// ========== CAPABILITY CHECK ==========
if (!('serial' in navigator)) {
  log(t('webSerialNotSupported'), 'error');
  updateActionButtons();
}

updateActionButtons();

})();
