// js/flash.js
// UV-K5 Web Flasher core logic (Web Serial + protocol)
// - Requires i18n.js to be loaded first (window.i18nReady).
// - Defines window.updateUI() to (re)apply translations to the DOM.
// - Shows progress bar during flashing, hides it after successful completion.
// - Percentage text is centered via #progressLabel overlay.
// - Comments in English.

'use strict';

// ---------- Constants ----------
const BAUDRATE = 38400;
const MSG_NOTIFY_DEV_INFO = 0x0518;
const MSG_NOTIFY_BL_VER   = 0x0530;
const MSG_PROG_FW         = 0x0519;
const MSG_PROG_FW_RESP    = 0x051A;
const OBFUS_TBL = new Uint8Array([0x16,0x6c,0x14,0xe6,0x2e,0x91,0x0d,0x40,0x21,0x35,0xd5,0x40,0x13,0x03,0xe9,0x80]);

// ---------- State ----------
let port = null, reader = null, writer = null;
let firmwareData = null;
let isFlashing = false;
let readBuffer = [];
let isReading = false;

// ---------- UI elements ----------
const flashBtn          = document.getElementById('flashBtn');
const blVersionInput    = document.getElementById('blVersion');
const firmwareFileInput = document.getElementById('firmwareFile');
const titleEl           = document.getElementById('title');
const subtitleEl        = document.getElementById('subtitle');
const labelBlVersionEl  = document.getElementById('labelBlVersion');
const labelFwFileEl     = document.getElementById('labelFirmwareFile');
const logDiv            = document.getElementById('log');
const logTitleEl        = document.getElementById('logTitle');
const infoBoxEl         = document.getElementById('infoBox');
const progressContainer = document.getElementById('progressContainer');
const progressFill      = document.getElementById('progressFill');
const progressLabel     = document.getElementById('progressLabel'); // centered percentage text
const logToggle         = document.getElementById('logToggle');
const fileLabel         = document.getElementById('fileLabel');
const fileName          = document.getElementById('fileName');
const fileButton        = document.getElementById('fileButton');
const languageSelect    = document.getElementById('languageSelect');

// ---------- i18n helper ----------
function t(key, ...args) { return window.i18n && window.i18n.t ? window.i18n.t(key, ...args) : key; }

// ---------- Translations application ----------
// This function safely updates all user-visible strings using i18n.t()
window.updateUI = function updateUI() {
  // Core headings and labels
  if (titleEl)          titleEl.textContent = t('title');
  if (subtitleEl)       subtitleEl.textContent = t('subtitle');
  if (labelBlVersionEl) labelBlVersionEl.textContent = t('labelBlVersion');
  if (labelFwFileEl)    labelFwFileEl.textContent = t('labelFirmwareFile');
  if (logTitleEl)       logTitleEl.textContent = t('logTitle');

  // Info box can contain inline HTML (e.g., <strong>Note:</strong>)
  if (infoBoxEl)        infoBoxEl.innerHTML = t('infoBox');

  // Buttons and dynamic labels
  if (flashBtn)         flashBtn.textContent = t('flashBtn');
  if (fileButton)       fileButton.textContent = t('fileChoose');

  // Log toggle text depends on current state
  if (logToggle) {
    const visible = logDiv && logDiv.classList.contains('visible');
    logToggle.textContent = visible ? t('logHide') : t('logShow');
    logToggle.setAttribute('aria-expanded', visible ? 'true' : 'false');
  }

  // File name placeholder when nothing is selected
  if (fileName && !firmwareData) {
    fileName.textContent = t('fileNoFile');
    fileName.classList.remove('has-file');
    if (fileLabel) fileLabel.classList.remove('has-file');
  }

  // Keep language selector in sync with current i18n language
  if (languageSelect && window.i18n && window.i18n.lang) {
    languageSelect.value = window.i18n.lang;
  }
};

// Re-apply UI when i18n signals readiness (first load or any future re-init)
window.addEventListener('i18n:ready', () => {
  if (window.updateUI) window.updateUI();
});

// Also perform an initial application after i18nReady resolves
(async () => {
  if (window.i18nReady) {
    await window.i18nReady;
  }
  if (window.updateUI) window.updateUI();
})();

// ---------- Log visibility toggle ----------
if (logToggle) {
  logToggle.addEventListener('click', () => {
    if (!logDiv) return;
    logDiv.classList.toggle('visible');
    logToggle.textContent = logDiv.classList.contains('visible') ? t('logHide') : t('logShow');
    logToggle.setAttribute('aria-expanded', logDiv.classList.contains('visible') ? 'true' : 'false');
  });
}

// ---------- Firmware file input ----------
if (firmwareFileInput) {
  firmwareFileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fr = new FileReader();
    fr.onload = (ev) => {
      firmwareData = new Uint8Array(ev.target.result);
      if (fileName) {
        fileName.textContent = file.name;
        fileName.classList.add('has-file');
      }
      if (fileLabel) fileLabel.classList.add('has-file');
      log(t('firmwareLoaded', file.name, firmwareData.length), 'success');
      updateFlashButton();
    };
    fr.readAsArrayBuffer(file);
  });
}

// ---------- Flash button ----------
if (flashBtn) {
  flashBtn.addEventListener('click', async () => {
    if (!firmwareData) return;
    try {
      if (!port) await connect();
      await flashFirmware(); // will show progress; hides it on success
    } catch (e) {
      log(t('flashError', e?.message ?? String(e)), 'error');
      isFlashing = false;
      updateFlashButton();
      // Keep the progress visible on failure for debugging
    } finally {
      if (port) await disconnect();
    }
  });
}

// ---------- Serial connection ----------
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
  if (reader) { try { await reader.cancel(); } catch {} try { reader.releaseLock(); } catch {} reader = null; }
  if (writer) { try { await writer.close(); } catch {} writer = null; }
  if (port)   { try { await port.close(); } catch {} port = null; }
  log(t('disconnected'), 'info');
}

function startReading() {
  if (!reader || isReading) return;
  isReading = true;
  readLoop().catch(e => { if (isReading) log(t('loopError', e?.message ?? String(e)), 'error'); });
}

async function readLoop() {
  log(t('startReading'), 'info');
  try {
    while (isReading && reader) {
      const { value, done } = await reader.read();
      if (done) { log(t('streamClosed'), 'info'); break; }
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

// ---------- Flash workflow ----------
function updateFlashButton() { if (flashBtn) flashBtn.disabled = !firmwareData || isFlashing; }

async function flashFirmware() {
  isFlashing = true;
  updateFlashButton();

  // Show and reset the progress bar (0%)
  if (progressContainer) progressContainer.style.display = 'block';
  updateProgress(0);

  // Reset buffer; give device some time to spam DEV_INFO
  readBuffer = [];
  log(t('bufferEmpty'), 'info');
  await sleep(1000);
  log(t('bufferContains', readBuffer.length), 'info');

  try {
    log(t('establishing'), 'info');
    const devInfo = await waitForDeviceInfo();
    log(t('uidLabel', arrayToHex(devInfo.uid)), 'info');
    log(t('blVersionLabel', devInfo.blVersion), 'info');

    // Optional BL version check (user text input)
    const expectedBl = blVersionInput?.value?.trim?.() ?? '';
    if (expectedBl !== '*' && expectedBl !== '?' && expectedBl !== '' && devInfo.blVersion !== expectedBl) {
      log(t('blWarning', expectedBl, devInfo.blVersion), 'error');
    }
    log(t('deviceDetected'), 'success');

    // Handshake with reported BL version
    log(t('handshake'), 'info');
    await performHandshake(devInfo.blVersion);
    log(t('handshakeComplete'), 'success');

    // Program firmware pages
    await programFirmware();

    // Done: set to 100% and hide the progress gauge after a short delay
    updateProgress(100);
    log(t('programmingComplete'), 'success');

    setTimeout(() => {
      if (progressContainer) progressContainer.style.display = 'none'; // hide gauge after success
      updateProgress(0); // reset for next session
    }, 800);
  } finally {
    isFlashing = false;
    updateFlashButton();
  }
}

async function waitForDeviceInfo() {
  let lastTimestamp = 0, acc = 0, timeout = 0;
  log(t('waiting'), 'info');

  while (timeout < 500) { // ~5s total (500 * 10ms)
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
          for (let i = 16; i < 32; i++) { if (msg.data[i] === 0) { blVersionEnd = i; break; } }
          if (blVersionEnd === -1) blVersionEnd = 32;
          const blVersion = new TextDecoder().decode(msg.data.slice(16, blVersionEnd));
          return { uid, blVersion };
        }
      } else {
        if (dt < 5 || dt > 1000) log(t('invalidInterval', dt), 'error');
        acc = 0; // reset accumulator if timing is off
      }
    }
  }
  throw new Error(t('timeoutNoDevice'));
}

async function performHandshake(blVersion) {
  let acc = 0;

  // Send BL version 3 times (robust against noise)
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

  // Wait and drain any remaining messages
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
  log(t('programming'), 'info');

  let pageIndex = 0, retryCount = 0;
  const MAX_RETRIES = 3;

  while (pageIndex < pageCount) {
    updateProgress((pageIndex / pageCount) * 100);

    // Build MSG_PROG_FW packet (268 bytes data)
    const msg = createMessage(MSG_PROG_FW, 268);
    const view = new DataView(msg.buffer);
    view.setUint32(4, timestamp, true);
    view.setUint16(8, pageIndex, true);
    view.setUint16(10, pageCount, true);

    const offset = pageIndex * 256;
    const len = Math.min(256, firmwareData.length - offset);
    for (let i = 0; i < len; i++) msg[16 + i] = firmwareData[offset + i];

    await sendMessage(msg);

    // Await response for this page
    let gotResponse = false;
    for (let i = 0; i < 300 && !gotResponse; i++) { // up to ~3s
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
          break; // retry same page
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
      // else retry same page
    }
  }
}

// ---------- Protocol helpers ----------
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
    if (buf[i] === 0xab && buf[i + 1] === 0xcd) { packBegin = i; break; }
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

// ---------- UI helpers ----------
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
  if (progressFill)  progressFill.style.width = `${rounded}%`;
  if (progressLabel) progressLabel.textContent = `${rounded}%`;
  const bar = document.querySelector('.progress-bar');
  if (bar) bar.setAttribute('aria-valuenow', String(rounded));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ---------- Capability check ----------
if (!('serial' in navigator)) {
  log(t('webSerialNotSupported'), 'error');
  if (flashBtn) flashBtn.disabled = true;
}
