// Constants - same as Python version
const VERSION = '2.0';
const BAUDRATE = 38400;
const WIDTH = 128;
const HEIGHT = 64;
const FRAME_SIZE = 1024;

// Protocol
const HEADER = new Uint8Array([0xAA, 0x55]);
const TYPE_SCREENSHOT = 0x01;
const TYPE_DIFF = 0x02;

// Color sets 
const COLOR_SETS = {
    'g': ['color_grey', '#000000', '#CACACA'],
    'o': ['color_orange', '#000000', '#FFC125'], 
    'b': ['color_blue', '#000000', '#1C86E4'],
    'w': ['color_white', '#000000', '#FFFFFF']
};

let DEFAULT_COLOR = 'g';

// State variables
let framebuffer = new Uint8Array(FRAME_SIZE);
let port = null;
let reader = null;
let writer = null;
let isConnected = false;
let pixelSize = 5;
let pixelLcd = 0;
let invertLcd = 0;
let currentColorKey = DEFAULT_COLOR;
let frameCount = 0;
let frameLost = 0;
let lastTime = performance.now();
let keepaliveInterval = null;
let currentLanguage = 'en';
let isDarkTheme = false;

// DOM elements
const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const notifications = document.getElementById('notifications');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');
const fKeyIndicator  = document.getElementById('fKeyIndicator');
const lockIndicator  = document.getElementById('lockIndicator');

// Load local storage
const pixelSizeLocal = parseInt(localStorage.getItem('pixelSize'), 10);
if (!isNaN(pixelSizeLocal) && pixelSizeLocal >= 3 && pixelSizeLocal <= 12) {
    pixelSize = pixelSizeLocal;
}

const pixelLcdLocal = parseInt(localStorage.getItem('pixelLcd'), 10);
if (!isNaN(pixelLcdLocal)) {
    pixelLcd = pixelLcdLocal;
}

const currentColorKeyLocal = localStorage.getItem('currentColorKey');
if (currentColorKeyLocal && currentColorKeyLocal in COLOR_SETS) {
    currentColorKey = currentColorKeyLocal;
}

const invertLcdLocal = parseInt(localStorage.getItem('invertLcd'), 10);
if (!isNaN(invertLcdLocal)) {
    invertLcd = invertLcdLocal;
}

const currentLanguageLocal = localStorage.getItem('currentLanguage');
if (currentLanguageLocal && currentLanguageLocal in TRANSLATIONS) {
    currentLanguage = currentLanguageLocal;
    languageSelect.value = currentLanguage;
}

const isDarkThemeLocal = localStorage.getItem('isDarkTheme');
if (isDarkThemeLocal !== null) {
    isDarkTheme = isDarkThemeLocal === 'true';
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.textContent = isDarkTheme ? '◑' : '◐';
}

// Initialize canvas
updateCanvasSize();

// Translation functions
function t(key, params = {}) {
    let text = TRANSLATIONS[currentLanguage][key] || TRANSLATIONS['en'][key] || key;
    
    // Replace parameters in text
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    
    return text;
}

function updateUI() {
    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (key) element.setAttribute('title', t(key));
    });

    // Update status
    if (!isConnected) {
        updateStatus(t('ready_to_connect'));
    }
}

function changeLanguage(lang) {
    if (lang in TRANSLATIONS) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        updateUI();
        localStorage.setItem('currentLanguage', currentLanguage);
    }
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.textContent = isDarkTheme ? '◑' : '◐';
    localStorage.setItem('isDarkTheme', isDarkTheme);
}

function updateCanvasSize() {
    canvas.width = WIDTH * (pixelSize - 1);
    canvas.height = HEIGHT * pixelSize;
    drawFrame();
}

function showNotification(key, params = {}, type = 'info') {
    const div = document.createElement('div');
    div.className = `notification ${type}`;
    div.textContent = t(key, params);
    
    // Add to notifications container
    notifications.appendChild(div);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (div.parentNode) {
            div.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => div.remove(), 300);
        }
    }, 4000);
    
    // Keep only last 5 notifications
    const notificationElements = notifications.querySelectorAll('.notification');
    if (notificationElements.length > 5) {
        notificationElements[0].remove();
    }
}

function updateStatus(text) {
    const statusSpan = status.querySelector('span');
    statusSpan.textContent = text;
    
    if (isConnected) {
        status.classList.add('connected');
    } else {
        status.classList.remove('connected');
    }
}

function showModal() {
    helpModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    helpModal.classList.remove('show');
    document.body.style.overflow = '';
}

async function connectSerial() {
    try {
        if (!('serial' in navigator)) {
            throw new Error(t('web_serial_not_supported'));
        }
        
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: BAUDRATE });
        
        reader = port.readable.getReader();
        writer = port.writable.getWriter();
        
        isConnected = true;
        lastPort = port;
        lastPortInfo = port.getInfo();
        userDisconnected = false;
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        updateKeyboardState();
        
        updateStatus(t('connected_waiting'));
        showNotification('serial_established', {}, 'success');
        
        // Start keepalive
        keepaliveInterval = setInterval(sendKeepalive, 1000);
        
        // Start reading frames
        readFrames();
        
    } catch (error) {
        showNotification('connection_error', { error: error.message }, 'error');
        console.error('Connection error:', error);
    }
}

async function disconnectSerial() {
    try {
        isConnected = false;
        userDisconnected = true;
        autoReconnecting = false;
        clearTimeout(reconnectTimer);
        
        if (keepaliveInterval) {
            clearInterval(keepaliveInterval);
            keepaliveInterval = null;
        }
        
        if (reader) {
            await reader.cancel();
            reader.releaseLock();
            reader = null;
        }
        
        if (writer) {
            await writer.close();
            writer = null;
        }
        
        if (port) {
            await port.close();
            port = null;
        }
        
        connectBtn.disabled = false;
        disconnectBtn.disabled = true;
        updateKeyboardState();
        
        updateStatus(t('disconnected'));
        showNotification('disconnected_success', {}, 'success');
        
    } catch (error) {
        showNotification('disconnection_error', { error: error.message }, 'error');
        console.error('Disconnection error:', error);
    }
}

async function sendKeepalive() {
    if (!writer || !isConnected) return;
    
    try {
        const keepalive = new Uint8Array([0x55, 0xAA, 0x00, 0x00]);
        await writer.write(keepalive);
    } catch (error) {
        console.error('Keepalive error:', error);
    }
}

async function readFrames() {
    const buffer = new Uint8Array(4096);
    let bufferPos = 0;

    while (isConnected && reader) {
        try {
            const { value, done } = await reader.read();
            if (done) break;
            
            // Add new data to buffer
            if (bufferPos + value.length > buffer.length) {
                buffer.copyWithin(0, bufferPos);
                bufferPos = 0;
            }
            buffer.set(value, bufferPos);
            bufferPos += value.length;

            // Process frames in buffer
            let processed = 0;
            while (processed < bufferPos - 4) {
                // Check for version marker (new format)
                let isNewFormat = false;
                let headerStart = processed;

                if (buffer[processed] === 0xFF) {
                    // New format: version marker present
                    isNewFormat = true;
                    headerStart = processed + 1;
                }

                // Now check for standard header
                if (headerStart + 4 < bufferPos &&
                    buffer[headerStart] === HEADER[0] &&
                    buffer[headerStart + 1] === HEADER[1]) {

                    const type = buffer[headerStart + 2];
                    const size = (buffer[headerStart + 3] << 8) | buffer[headerStart + 4];

                    // Calculate total frame size: marker(if new) + header + payload + end
                    const markerSize = isNewFormat ? 1 : 0;
                    const totalSize = markerSize + 5 + size + 1;

                    if (processed + totalSize <= bufferPos) {
                        const payloadStart = headerStart + 5;
                        const payload = buffer.slice(payloadStart, payloadStart + size);

                        if (type === TYPE_SCREENSHOT && size === FRAME_SIZE) {
                            framebuffer = new Uint8Array(payload);
                            drawFrame();
                            updateFPS();
                        } else if (type === TYPE_DIFF && size % 9 === 0) {
                            // Apply diff with format awareness
                            applyDiff(payload, isNewFormat);
                            drawFrame();
                            updateFPS();
                        }

                        processed += totalSize;
                    } else {
                        break; // Not enough data for complete frame
                    }
                } else {
                    processed++;
                }
            }

            // Remove processed data from buffer
            if (processed > 0) {
                buffer.copyWithin(0, processed);
                bufferPos -= processed;
            }

        } catch (error) {
            if (isConnected) {
                console.error('Read error:', error);
                if (userDisconnected) {
                    showNotification('serial_read_error', {}, 'error');
                    await disconnectSerial();
                }
                // Hardware disconnect: the 'disconnect' event will handle cleanup + auto-reconnect
            }
            break;
        }
    }
}

// Updated applyDiff with format parameter
function applyDiff(diffPayload, isNewFormat) {
    let i = 0;

    if (isNewFormat) {
        // New format: chunk_index (0-127) maps directly to framebuffer[chunk*8...]
        while (i + 9 <= diffPayload.length) {
            const chunkIndex = diffPayload[i];
            i++;

            if (chunkIndex >= 128) break;

            const startPos = chunkIndex * 8;
            for (let j = 0; j < 8; j++) {
                if (startPos + j < framebuffer.length) {
                    framebuffer[startPos + j] = diffPayload[i + j];
                }
            }
            i += 8;
        }
    } else {
        // Old format: block_index (0-127) with special packing
        while (i + 9 <= diffPayload.length) {
            const blockIndex = diffPayload[i];
            i++;
            if (blockIndex >= 128) break;

            const startPos = blockIndex * 8;
            for (let j = 0; j < 8; j++) {
                if (startPos + j < framebuffer.length) {
                    framebuffer[startPos + j] = diffPayload[i + j];
                }
            }
            i += 8;
        }
    }
}

function getBit(bitIdx) {
    const byteIdx = Math.floor(bitIdx / 8);
    const bitPos = bitIdx % 8;
    if (byteIdx < framebuffer.length) {
        return (framebuffer[byteIdx] >> bitPos) & 0x01;
    }
    return 0;
}

function drawFrame() {
    const [, originalFg, originalBg] = COLOR_SETS[currentColorKey];
    
    // Apply invert if necessary
    const fgColor = invertLcd ? originalBg : originalFg;
    const bgColor = invertLcd ? originalFg : originalBg;
    
    // Clear canvas with background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate off-pixel color (subtle blend toward foreground) for LCD effect
    let offColor = null;
    if (pixelLcd) {
        offColor = blendColors(bgColor, fgColor, 0.04);
    }
    
    // Draw pixels
    let bitIndex = 0;
    
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const px = x * (pixelSize - 1);
            const py = y * pixelSize;
            const width = pixelSize - 1 - pixelLcd;
            const height = pixelSize - pixelLcd;
            
            if (getBit(bitIndex)) {
                // Pixel ON
                ctx.fillStyle = fgColor;
                ctx.fillRect(px, py, width, height);
            } else if (pixelLcd && offColor) {
                // Pixel OFF but visible (LCD effect)
                ctx.fillStyle = offColor;
                ctx.fillRect(px, py, width, height);
            }
            bitIndex++;
        }
    }

    detectFKey();
    detectKeyLock();
}

// Detect the F key indicator (video-inverse block) in the status bar
// gFontF is displayed at x >= 69 in the status line (framebuffer bytes 0-127)
// When active, several consecutive bytes in that range will be high (>= 0x70)

function detectFKey() {
    // gFontF from bitmaps.c - each byte = one column, bits 0-7 = rows 0-7
    const FONT_F = [0x7F, 0x00, 0x76, 0x76, 0x76, 0x76, 0x7E, 0x7F];

    // Reconstruct column bytes from display pixels via getBit, then pattern-match
    for (let baseX = 60; baseX <= 100 - FONT_F.length; baseX++) {
        let match = true;
        for (let col = 0; col < FONT_F.length && match; col++) {
            const x = baseX + col;
            let colValue = 0;
            for (let y = 0; y < 8; y++) {
                colValue |= getBit(y * WIDTH + x) << y;
            }
            if (colValue !== FONT_F[col]) match = false;
        }
        if (match) {
            fKeyIndicator.classList.add('visible');
            clearTimeout(longPressIndicatorTimer);
            longPressIndicator.classList.remove('visible');
            return;
        }
    }
    fKeyIndicator.classList.remove('visible');
}

function detectKeyLock() {
    // gFontKeyLock from bitmaps.c
    const FONT_LOCK = [0x7c, 0x46, 0x45, 0x45, 0x45, 0x45, 0x45, 0x46, 0x7c];

    for (let baseX = 60; baseX <= 100 - FONT_LOCK.length; baseX++) {
        let match = true;
        for (let col = 0; col < FONT_LOCK.length && match; col++) {
            const x = baseX + col;
            let colValue = 0;
            for (let y = 0; y < 8; y++) {
                colValue |= getBit(y * WIDTH + x) << y;
            }
            if (colValue !== FONT_LOCK[col]) match = false;
        }
        if (match) {
            lockIndicator.classList.add('visible');
            return;
        }
    }
    lockIndicator.classList.remove('visible');
}
function blendColors(color1, color2, ratio) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
    
    return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function updateFPS() {
    frameCount++;
    const now = performance.now();

    // First real frame after auto-reconnect
    if (firstFrameAfterReconnect) {
        firstFrameAfterReconnect = false;
        showNotification('serial_reconnected', {}, 'success');
    }
    
    if (now - lastTime >= 1000) {
        const fps = Math.ceil(frameCount / ((now - lastTime) / 1000));
        updateStatus(t('connected_fps', { fps: fps.toFixed(1) }));
        frameCount = 0;
        lastTime = now;
        frameLost = 0;
    }
}

function handleNoData() {
    frameLost = Math.min(frameLost + 1, 5);
    if (frameLost === 5) {
        updateStatus(t('connected_no_data'));
    }
}

function saveScreenshot() {
    const link = document.createElement('a');
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').split('T');
    const filename = `screenshot_${timestamp[0]}_${timestamp[1].split('.')[0]}.png`;
    
    link.download = filename;
    link.href = canvas.toDataURL();
    link.click();
    
    showNotification('screenshot_saved', { filename }, 'success');
}

function toggleColors() {
    invertLcd = 1 - invertLcd;
    drawFrame();
    showNotification('colors_inverted', {}, 'info');
    localStorage.setItem('invertLcd', invertLcd);
}

function changePixelSize(delta) {
    const newSize = pixelSize + delta;
    if (newSize >= 3 && newSize <= 12) {
        pixelSize = newSize;
        updateCanvasSize();
        showNotification('pixel_size', { size: pixelSize - 2}, 'info');
    }
}

function changeColorSet(key) {
    if (key in COLOR_SETS) {
        currentColorKey = key;
        const [labelKey] = COLOR_SETS[key];
        const name = t(labelKey);
        showNotification('color_changed', { color: name }, 'info');
        drawFrame();
    }
}

// Event listeners
connectBtn.addEventListener('click', connectSerial);
disconnectBtn.addEventListener('click', disconnectSerial);
themeToggle.addEventListener('click', toggleTheme);
helpBtn.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);

// Close modal when clicking outside
helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        hideModal();
    }
});

// Close modal with Escape key
// PC keyboard mapping (event.code = layout-independent)
// 1-9 (physical)    → digit short press
// Shift+1-9         → digit long press
// Enter / M         → MENU short press
// Shift+Enter / M   → MENU long press
// Ctrl              → # (KEY_F alias)
// Arrows            → radio UP/DOWN (short press only)
// Shift+↑/↓         → zoom in/out
// Esc/Backspace     → EXIT
// F1/F2             → SIDE1/SIDE2
// Space             → screenshot
// P                 → toggle LCD pixel effect
// I                 → toggle invert
// Q                 → disconnect
// G/O/B/W           → color scheme
// H/?               → help

const PC_CODE_MAP = {
    'Digit0': 0x00, 'Digit1': 0x01, 'Digit2': 0x02, 'Digit3': 0x03,
    'Digit4': 0x04, 'Digit5': 0x05, 'Digit6': 0x06, 'Digit7': 0x07,
    'Digit8': 0x08, 'Digit9': 0x09,
    'Enter':  0x0A, // MENU
    'KeyM':   0x0A, // MENU (alias)
};

const PC_KEY_MAP = {
    'escape':     0x0D, // EXIT
    'backspace':  0x0D, // EXIT
    'f1':         0x12, // SIDE1
    'f2':         0x11, // SIDE2
    '*': 0x0E, // STAR
    '#': 0x0F, // F
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && helpModal.classList.contains('show')) {
        hideModal();
        return;
    }
});

document.addEventListener('keydown', (event) => {
    if (helpModal.classList.contains('show')) return;
    if (event.repeat) return;

    const key  = event.key;
    const kl   = key.toLowerCase();
    const long = event.shiftKey && !event.ctrlKey && !event.altKey;

    // ── +/- → zoom ──────────────────────────────────────────────
    if (!event.ctrlKey && !event.altKey) {
        if (key === '+' || key === '=' || event.code === 'NumpadAdd') {
            event.preventDefault();
            changePixelSize(1);
            localStorage.setItem('pixelSize', pixelSize);
            return;
        }
        if (key === '-' || event.code === 'NumpadSubtract') {
            event.preventDefault();
            changePixelSize(-1);
            localStorage.setItem('pixelSize', pixelSize);
            return;
        }
    }

    // ── Arrows → radio (short press only, no long press in firmware) ────
    // UV-K1 (◀ ▶): only Left/Right arrows are active
    // UV-K5 (▲ ▼): only Up/Down arrows are active
    if (!event.shiftKey && !event.ctrlKey && !event.altKey) {
        if (kbdModel === 'K5' && (key === 'ArrowUp' || key === 'ArrowDown')) {
            event.preventDefault();
            if (isConnected) {
                const code = (key === 'ArrowUp')
                    ? parseInt(btnUp.dataset.key, 16)
                    : parseInt(btnDown.dataset.key, 16);
                sendKey(code, false);
            }
            return;
        }
        if (kbdModel === 'K1' && key === 'ArrowLeft') {
            event.preventDefault();
            if (isConnected) sendKey(parseInt(btnUp.dataset.key, 16), false);
            return;
        }
        if (kbdModel === 'K1' && key === 'ArrowRight') {
            event.preventDefault();
            if (isConnected) sendKey(parseInt(btnDown.dataset.key, 16), false);
            return;
        }
    }

    // ── Ctrl alone → send # (KEY_F alias) ────────────────────
    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        event.preventDefault();
        if (isConnected) sendKey(0x0F, shiftHeld);
        return;
    }

    // ── Digit keys + MENU → radio ──────────────────────────────
    // Plain      → short press
    // Shift+     → long press
    if (!event.altKey && !event.ctrlKey) {
        // Use event.key for M to handle AZERTY (Shift+M gives event.code='Semicolon')
        const isMKey = event.key === 'm' || event.key === 'M';
        const code = isMKey ? 0x0A : PC_CODE_MAP[event.code];
        if (code !== undefined) {
            event.preventDefault();
            if (isConnected) sendKey(code, long);
            return;
        }
    }

    // ── Fixed radio keys (Enter, Esc, F1, F2, *, #) ───────────
    // No shiftKey guard here — * and # require Shift on AZERTY keyboards
    if (isConnected && !event.ctrlKey && !event.altKey) {
        const code = PC_KEY_MAP[kl] ?? PC_KEY_MAP[key];
        if (code !== undefined) {
            event.preventDefault();
            sendKey(code, long);
            return;
        }
    }

    // ── UI shortcuts ───────────────────────────────────────────
    if (event.ctrlKey || event.shiftKey || event.altKey) return;
    switch (kl) {
        case ' ':
            event.preventDefault();
            saveScreenshot();
            break;
        case 'p':
            pixelLcd = 1 - pixelLcd;
            drawFrame();
            showNotification('lcd_effect', { status: pixelLcd ? t('lcd_on') : t('lcd_off') }, 'info');
            localStorage.setItem('pixelLcd', pixelLcd);
            break;
        case 'i':
            toggleColors();
            localStorage.setItem('invertLcd', invertLcd);
            break;
        case 'q':
            if (isConnected) disconnectSerial();
            break;
        case 'g': case 'o': case 'b': case 'w':
            changeColorSet(kl);
            localStorage.setItem('currentColorKey', currentColorKey);
            break;
        case 'h': case '?':
            showModal();
            break;
    }
});

// Initialize language detection
function detectLanguage() {
    const browserLang = navigator.language.substring(0, 2);
    if (browserLang in TRANSLATIONS) {
        currentLanguage = browserLang;
        languageSelect.value = browserLang;
    }
}

languageSelect.addEventListener('change', (event) => {
    changeLanguage(event.target.value);
});

// Check Web Serial API support
if (!('serial' in navigator)) {
    showNotification('web_serial_not_supported', {}, 'error');
    connectBtn.disabled = true;
} else {
    // Show initial notification only if Web Serial is supported
    showNotification('app_loaded', {}, 'info');
}

// Initialize app
//detectLanguage();
updateUI();
drawFrame();


// ─── UV-K1 Virtual Keyboard ──────────────────────────────────
const TYPE_KEY      = 0x03;
const TYPE_KEY_LONG = 0x04;
const k1Keyboard = document.getElementById('k1Keyboard');
const keyboardToggle = document.getElementById('keyboardToggle');

// Send a key event to the radio via serial
async function sendKey(keyCode, long = false) {
    if (!writer || !isConnected) return;
    try {
        const type   = long ? TYPE_KEY_LONG : TYPE_KEY;
        const packet = new Uint8Array([0xAA, 0x55, type, keyCode]);
        await writer.write(packet);
    } catch (error) {
        console.error('Key send error:', error);
    }
}

// Attach events to all k1 buttons
function initKeyboard() {
    document.querySelectorAll('.k1-btn[data-key]').forEach(btn => {
        let longPressTimer = null;
        let wasLong = false;

        function startPress(e) {
            e.preventDefault();
            btn.classList.add('pressed');
            wasLong = false;
            longPressTimer = setTimeout(() => {
                wasLong = true;
                btn.classList.add('long');
                sendKey(parseInt(btn.dataset.key, 16), true);
            }, 500);
        }

        function endPress() {
            btn.classList.remove('pressed', 'long');
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            if (!wasLong) {
                sendKey(parseInt(btn.dataset.key, 16), false);
            }
            wasLong = false;
        }

        // Mouse
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('mouseup',   endPress);

        // Touch (mobile)
        btn.addEventListener('touchstart',  startPress, { passive: false });
        btn.addEventListener('touchend',    endPress);
        btn.addEventListener('touchcancel', endPress);
    });
}

// Toggle keyboard visibility from header button
const keyboardToggleBtn = document.getElementById('keyboardToggleBtn');

function toggleKeyboard() {
    const hidden = k1Keyboard.classList.toggle('hidden');
    keyboardToggleBtn.style.opacity = hidden ? '0.4' : '1';
    localStorage.setItem('keyboardHidden', hidden);
}

keyboardToggleBtn.addEventListener('click', toggleKeyboard);

// Show/hide LONG PRESS / LOCK indicator when Shift/Ctrl is held
const longPressIndicator = document.getElementById('longPressIndicator');
let longPressIndicatorTimer = null;

function updateShiftIndicator(shiftDown) {
    clearTimeout(longPressIndicatorTimer);
    longPressIndicator.classList.remove('visible');
    if (shiftDown) {
        longPressIndicatorTimer = setTimeout(() => {
            if (!fKeyIndicator.classList.contains('visible')) {
                longPressIndicator.classList.add('visible');
            }
        }, 150);
    }
}

let shiftHeld = false;
let ctrlHeld  = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') { shiftHeld = true;  updateShiftIndicator(shiftHeld); }
    if (e.key === 'Control') { ctrlHeld = true;  updateShiftIndicator(shiftHeld); }
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift')   { shiftHeld = false; updateShiftIndicator(shiftHeld); }
    if (e.key === 'Control') { ctrlHeld  = false; updateShiftIndicator(shiftHeld); }
});
// Also hide if window loses focus
window.addEventListener('blur', () => {
    shiftHeld = false;
    ctrlHeld  = false;
    updateShiftIndicator(false);
});

// Restore visibility state
const keyboardHiddenLocal = localStorage.getItem('keyboardHidden');
if (keyboardHiddenLocal === 'true') {
    k1Keyboard.classList.add('hidden');
    keyboardToggleBtn.style.opacity = '0.4';
}

// Model toggle: UV-K1 (◀ ▶) vs UV-K5 (▲ ▼)
const tabK1  = document.getElementById('tabK1');
const tabK5  = document.getElementById('tabK5');

let kbdModel = localStorage.getItem('kbdModel') || 'K1';

function applyKbdModel(model) {
    if (model === 'K1') {
        btnUp.querySelector('.k1-btn-label').textContent   = '◀';
        btnDown.querySelector('.k1-btn-label').textContent = '▶';
        btnUp.dataset.key   = '0x0B';
        btnDown.dataset.key = '0x0C';
        tabK1.classList.add('active');
        tabK5.classList.remove('active');
    } else {
        btnUp.querySelector('.k1-btn-label').textContent   = '▲';
        btnDown.querySelector('.k1-btn-label').textContent = '▼';
        btnUp.dataset.key   = '0x0B';
        btnDown.dataset.key = '0x0C';
        tabK1.classList.remove('active');
        tabK5.classList.add('active');
    }
}

tabK1.addEventListener('click', () => { kbdModel = 'K1'; localStorage.setItem('kbdModel', kbdModel); applyKbdModel(kbdModel); });
tabK5.addEventListener('click', () => { kbdModel = 'K5'; localStorage.setItem('kbdModel', kbdModel); applyKbdModel(kbdModel); });

applyKbdModel(kbdModel);

// Sync keyboard enabled/disabled with connection state
function updateKeyboardState() {
    if (isConnected) {
        k1Keyboard.classList.remove('disabled');
    } else {
        k1Keyboard.classList.add('disabled');
    }
}

// ─── Auto-reconnect on USB disconnect/reconnect ──────────────
let autoReconnecting    = false;
let reconnectTimer      = null;
let lastPort            = null;
let lastPortInfo        = null;   // { usbVendorId, usbProductId }
let userDisconnected    = false;
let firstFrameAfterReconnect = false;

navigator.serial.addEventListener('disconnect', (event) => {
    if (userDisconnected) return;
    if (event.target !== lastPort) return;

    isConnected = false;

    if (keepaliveInterval) { clearInterval(keepaliveInterval); keepaliveInterval = null; }
    if (reader) { try { reader.cancel(); } catch(_) {} reader = null; }
    if (writer) { try { writer.close(); } catch(_) {} writer = null; }

    connectBtn.disabled = true;
    disconnectBtn.disabled = true;
    updateKeyboardState();

    autoReconnecting = true;
    updateStatus(t('reconnecting'));
    showNotification('serial_disconnected_auto', {}, 'warning');
});

navigator.serial.addEventListener('connect', async (event) => {
    if (!autoReconnecting) return;
    if (!lastPortInfo) return;

    // Check if the reconnected port matches the one we lost
    const info = event.target.getInfo();
    if (info.usbVendorId  !== lastPortInfo.usbVendorId ||
        info.usbProductId !== lastPortInfo.usbProductId) return;

    // It's our port — wait a bit for the OS to finish enumeration
    await new Promise(r => setTimeout(r, 500));

    try {
        port = event.target;
        await port.open({ baudRate: BAUDRATE });

        reader = port.readable.getReader();
        writer = port.writable.getWriter();

        isConnected = true;
        autoReconnecting = false;
        userDisconnected = false;
        lastPort = port;
        connectBtn.disabled = true;
        disconnectBtn.disabled = false;
        updateKeyboardState();

        firstFrameAfterReconnect = true;
        updateStatus(t('reconnecting'));

        keepaliveInterval = setInterval(sendKeepalive, 1000);
        readFrames();

    } catch (error) {
        console.error('Auto-reconnect failed:', error);
    }
});

// ─────────────────────────────────────────────────────────────