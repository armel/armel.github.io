// js/flash.js
// UV-K5 Web Flasher core logic (Web Serial + protocol)
// Adds: 
// - Auto-load of firmware from URL param ?firmwareURL=... (or ?fw=...)
// - Requires i18n.js to be loaded first (window.i18nReady).
// - Defines window.updateUI() to (re)apply translations to the DOM.
// - Shows progress bar during flashing, hides it after successful completion.
// - Percentage text is centered via #progressLabel overlay.
// - Dump and restore

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

// ========== STATE ==========
let port = null;
let reader = null;
let writer = null;
let firmwareData = null;
let calibData = null;
let isFlashing = false;
let isDumping = false;
let isRestoring = false;
let readBuffer = [];
let isReading = false;

// ========== UI ELEMENTS ==========
const flashBtn = document.getElementById('flashBtn');
const dumpBtn = document.getElementById('dumpBtn');
const restoreBtn = document.getElementById('restoreBtn');
const blVersionInput = document.getElementById('blVersion');
const firmwareFileInput = document.getElementById('firmwareFile');
const calibFileInput = document.getElementById('calibFile');
const titleEl = document.getElementById('title');
const subtitleEl = document.getElementById('subtitle');
const labelBlVersionEl = document.getElementById('labelBlVersion');
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
const baselineDev = document.getElementById("baseline-developed");

// File input labels
const fileLabel = document.getElementById('fileLabel');
const fileName = document.getElementById('fileName');
const fileButton = document.getElementById('fileButton');
const calibFileLabel = document.getElementById('calibFileLabel');
const calibFileName = document.getElementById('calibFileName');
const calibFileButton = document.getElementById('calibFileButton');

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
  return window.i18n && window.i18n.t ? window.i18n.t(key, ...args) : key;
}

// ========== UI UPDATE ==========
window.updateUI = function updateUI() {
  if (titleEl) titleEl.textContent = t('title');
  if (subtitleEl) subtitleEl.textContent = t('subtitle');
  if (labelBlVersionEl) labelBlVersionEl.textContent = t('labelBlVersion');
  if (labelFwFileEl) labelFwFileEl.textContent = t('labelFirmwareFile');
  if (labelCalibFileEl) labelCalibFileEl.textContent = t('labelCalibFile');
  if (baselineDev) baselineDev.textContent = t('baselineDeveloped');

  // Update info box based on active tab
  updateInfoBox();
  
  if (flashBtn) flashBtn.textContent = t('flashBtn');
  if (dumpBtn) dumpBtn.textContent = t('dumpBtn');
  if (restoreBtn) restoreBtn.textContent = t('restoreBtn');
  if (fileButton) fileButton.textContent = t('fileChoose');
  if (calibFileButton) calibFileButton.textContent = t('fileChoose');

  // Tabs
  const tabFlash = document.getElementById('tabFlash');
  const tabDump = document.getElementById('tabDump');
  const tabRestore = document.getElementById('tabRestore');
  if (tabFlash) tabFlash.textContent = t('tabFlash');
  if (tabDump) tabDump.textContent = t('tabDump');
  if (tabRestore) tabRestore.textContent = t('tabRestore');

  // Description
  const dumpDesc = document.getElementById('dumpDescription');
  const downloadText = document.getElementById('downloadText');
  if (dumpDesc) dumpDesc.textContent = t('dumpDescription');
  if (downloadText) downloadText.textContent = t('downloadText');

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

  if (languageSelect && window.i18n && window.i18n.lang) {
    languageSelect.value = window.i18n.lang;
  }
};

// Update info box based on active tab
function updateInfoBox() {
  if (!infoBoxEl) return;
  
  const activeTab = document.querySelector('.tab.active');
  const tabName = activeTab ? activeTab.dataset.tab : 'flash';
  
  if (tabName === 'flash') {
    infoBoxEl.innerHTML = t('infoBox');
  } else {
    infoBoxEl.innerHTML = t('infoBoxDump');
  }
}

// Re-apply UI when i18n signals readiness
window.addEventListener('i18n:ready', () => {
  if (window.updateUI) window.updateUI();
});

// Initial i18n sync
(async () => {
  if (window.i18nReady) await window.i18nReady;
  if (window.updateUI) window.updateUI();
  await maybeLoadFirmwareFromQuery();
})();

// ========== TABS ==========
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab + '-content').classList.add('active');
    
    // Update info box when tab changes
    updateInfoBox();
  });
});

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
    const fr = new FileReader();
    fr.onload = (ev) => setFirmwareBuffer(ev.target.result, file.name);
    fr.readAsArrayBuffer(file);
  });
}

function setFirmwareBuffer(buf, name = 'firmware.bin') {
  firmwareData = new Uint8Array(buf);
  if (fileName) {
    fileName.textContent = name;
    fileName.classList.add('has-file');
  }
  if (fileLabel) fileLabel.classList.add('has-file');
  log(t('firmwareLoaded', name, firmwareData.length), 'success');
  updateFlashButton();
}

// ---------- Auto-load firmware from URL ----------

async function loadFirmwareFromURL(url) {
  try {
    log(t('loadingFromUrl', url), 'info');

    const urlObj = new URL(url);

    // Only HTTPS
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

    const res = await fetch(urlObj.toString(), { cache: 'no-cache', mode: 'cors' });
    if (!res.ok) {
      throw new Error(`${t('urlFetchError')} HTTP ${res.status}`);
    }

    const buf = await res.arrayBuffer();
    const fname = (urlObj.pathname.split('/').pop() || 'firmware.bin').split('?')[0];

    setFirmwareBuffer(buf, fname);

    // Clean URL so refresh does not re-trigger auto-load
    const clean = new URL(window.location.href);
    clean.searchParams.delete('firmwareURL');
    clean.searchParams.delete('fw');
    window.history.replaceState({}, '', clean.toString());
  } catch (err) {
    log(`${t('urlFetchError')} ${err?.message ?? String(err)}`, 'error');
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

function updateFlashButton() {
  if (flashBtn) flashBtn.disabled = !firmwareData || isFlashing;
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
  if (restoreBtn) restoreBtn.disabled = !calibData || isRestoring;
}

// ========== SERIAL CONNECTION ==========
async function connect() {
  try {
    log(t('requestingPort'), 'info');
    port = await navigator.serial.requestPort();
    log(t('openingPort'), 'info');
    await port.open({ baudRate: BAUDRATE });

    log(t('gettingReader'), 'info');
    reader = port.readable.getReader();
    log(t('gettingWriter'), 'info');
    writer = port.writable.getWriter();

    log(t('startingRead'), 'info');
    startReading();

    log(t('waiting500ms'), 'info');
    await sleep(500);

    log(t('connected'), 'success');
  } catch (e) {
    log(t('connectionError', e?.message ?? String(e)), 'error');
    throw e;
  }
}

async function disconnect() {
  isReading = false;
  if (reader) {
    try { await reader.cancel(); } catch {}
    try { reader.releaseLock(); } catch {}
    reader = null;
  }
  if (writer) {
    try { await writer.close(); } catch {}
    writer = null;
  }
  if (port) {
    try { await port.close(); } catch {}
    port = null;
  }
  log(t('disconnected'), 'info');
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
  try {
    while (isReading && reader) {
      const { value, done } = await reader.read();
      if (done) {
        log(t('streamClosed'), 'info');
        break;
      }
      if (value?.length) {
        readBuffer.push(...value);
        log(t('rxData', value.length, readBuffer.length), 'info');
      }
    }
  } catch (e) {
    if (isReading) log(t('readError', e?.message ?? String(e)), 'error');
  }
  log(t('readComplete'), 'info');
}

// ========== PROTOCOL HELPERS ==========
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
  if (!firmwareData || isFlashing) return;
  try {
    if (!port) await connect();
    await flashFirmware();
  } catch (e) {
    log(t('flashError', e?.message ?? String(e)), 'error');
    isFlashing = false;
    updateFlashButton();
  } finally {
    if (port) await disconnect();
  }
});

async function flashFirmware() {
  isFlashing = true;
  updateFlashButton();

  if (progressContainer) progressContainer.style.display = 'block';
  updateProgress(0);

  readBuffer = [];
  log(t('bufferEmpty'), 'info');
  await sleep(1000);
  log(t('bufferContains', readBuffer.length), 'info');

  try {
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

    const expectedBl = blVersionInput?.value?.trim?.() ?? '';
    if (expectedBl !== '*' && expectedBl !== '?' && expectedBl !== '' && devInfo.blVersion !== expectedBl) {
      log(t('blWarning', expectedBl, devInfo.blVersion), 'error');
    }
    log(t('deviceDetected'), 'success');

    log(t('handshake'), 'info');
    await performHandshake(devInfo.blVersion);
    log(t('handshakeComplete'), 'success');

    await programFirmware();

    updateProgress(100);
    log(t('programmingComplete'), 'success');

    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none';
      updateProgress(0);
    }, 800);
  } finally {
    isFlashing = false;
    updateFlashButton();
  }
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

async function programFirmware() {
  const pageCount = Math.ceil(firmwareData.length / 256);
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
    const len = Math.min(256, firmwareData.length - offset);
    for (let i = 0; i < len; i++) msg[16 + i] = firmwareData[offset + i];

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
  if (isDumping) return;
  isDumping = true;
  dumpBtn.disabled = true;
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
    isDumping = false;
    dumpBtn.disabled = false;
    if (port) await disconnect();
  }
});

// ========== RESTORE CALIBRATION ==========
restoreBtn.addEventListener('click', async () => {
  if (!calibData || isRestoring) return;
  isRestoring = true;
  restoreBtn.disabled = true;
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
    isRestoring = false;
    updateRestoreButton();
    if (port) await disconnect();
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
    
    // Extract version from string (e.g., "F4HWN v4.3.3" -> "4.3.3")
    const versionMatch = deviceInfoStr.match(/v(\d+\.\d+\.\d+)/);
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
  if (progressFill) progressFill.style.width = `${rounded}%`;
  if (progressLabel) progressLabel.textContent = `${rounded}%`;
  const bar = document.querySelector('.progress-bar');
  if (bar) bar.setAttribute('aria-valuenow', String(rounded));
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ========== CAPABILITY CHECK ==========
if (!('serial' in navigator)) {
  log(t('webSerialNotSupported'), 'error');
  if (flashBtn) flashBtn.disabled = true;
  if (dumpBtn) dumpBtn.disabled = true;
  if (restoreBtn) restoreBtn.disabled = true;
}

// ========== AUTO TAB SELECT VIA ?mode=flash|dump|restore ==========

(function () {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode") || "flash";

  const modeMap = {
    flash: "tabFlash",
    dump: "tabDump",
    restore: "tabRestore"
  };

  const tabId = modeMap[mode];
  if (tabId) {
    const el = document.getElementById(tabId);
    if (el) el.click();
  }
})();

// ========== Version ==========

document.addEventListener("DOMContentLoaded", () => {
  fetch("locales/version.json")
    .then(r => r.json())
    .then(v => {
      const bl = document.getElementById("uvtools-baseline-version");
      if (bl) bl.textContent = `UVTools2 v${v.version}`;
    })
    .catch(() => console.warn("Impossible to load version.json"));
});