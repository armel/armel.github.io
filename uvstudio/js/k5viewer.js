;(function(){
// Constants
const BAUDRATE = 38400;
const preferences = window.UVStudioPreferences;
const WIDTH = 128;
const HEIGHT = 64;
const FRAME_SIZE = 1024;

// Protocol
const HEADER = new Uint8Array([0xAA, 0x55]);
const TYPE_SCREENSHOT = 0x01;
const TYPE_DIFF = 0x02;
const RF_LOG = window.UVTOOLS_RF_LOG;
const TYPE_RF_LOG = RF_LOG.TYPE_RF_LOG;
const TYPE_RF_LOG_HISTORY = RF_LOG.TYPE_RF_LOG_HISTORY;
const RF_LOG_STATUS_PACKET_SIZE = RF_LOG.STATUS_PACKET_SIZE;
const RF_LOG_PACKET_SIZE = RF_LOG.PACKET_SIZE;
const RF_LOG_HISTORY_PACKET_SIZE = RF_LOG.HISTORY_PACKET_SIZE;
const RF_LOG_STATUS_ACTIVE = RF_LOG.STATUS_ACTIVE;
const RF_LOG_STATUS_HAS_TRAFFIC = RF_LOG.STATUS_HAS_TRAFFIC;
const RF_LOG_STATUS_CLEARING = RF_LOG.STATUS_CLEARING;
const RF_LOG_FLAG_TX = RF_LOG.FLAG_TX;
const RF_LOG_FLAG_SESSION = RF_LOG.FLAG_SESSION;
const RXTX_LOG_CHANNEL_NONE = RF_LOG.CHANNEL_NONE;
const RF_LOG_BATT_UNKNOWN = RF_LOG.BATT_UNKNOWN;
const RF_LOG_BATT_OFFSET = RF_LOG.BATT_OFFSET;
const RF_LOG_POWER_LABELS = RF_LOG.POWER_LABELS;
const PROTOCOL_LEGACY_MARKER = 0xFF;
const PROTOCOL_FLAGS_MARKER_MASK = 0xF0;
const PROTOCOL_FLAGS_MASK = 0x0F;
const PROTOCOL_FLAG_DEEP_SLEEP = 1 << 0;
const PROTOCOL_FLAG_LED_RED = 1 << 1;
const PROTOCOL_FLAG_LED_GREEN = 1 << 2;

// Keepalive ping period. The firmware grants a budget of 15 frames per
// ping received, so the max frame rate is 15 / (KEEPALIVE_INTERVAL_MS / 1000).
// 200 ms -> up to 75 FPS, the real rate is then bound by the radio UI redraws.
const KEEPALIVE_INTERVAL_MS = 200;

const pixelState = new Float32Array(WIDTH * HEIGHT); 

// LCD Ghosting

const COLOR_TRANSITION_SPEED = 0.15;
const LCD_RISE_DEFAULT = 0.25;
const LCD_FALL_DEFAULT = 0.05;

let LCD_RISE = LCD_RISE_DEFAULT;
let LCD_FALL = LCD_FALL_DEFAULT;

let lcdAnimating = false;

// Color sets 
const COLOR_SETS = {
    'x': ['color_olive', '#000000', '#394d2d'],
    'g': ['color_grey', '#2a213f', '#e5e0ec'],
    'o': ['color_orange', '#41310a', '#FFC125'], 
    'b': ['color_blue', '#07223a', '#1C86E4'],
    'w': ['color_white', '#000000', '#FFFFFF']
};

let currentDisplayBg = { r: 202, g: 202, b: 202 };
let currentDisplayFg = { r: 0, g: 0, b: 0 };

let DEFAULT_COLOR = 'g';

const offColors = hexToRgb(COLOR_SETS['x'][2]);
currentDisplayBg = { ...offColors };


// State variables
let framebuffer = new Uint8Array(FRAME_SIZE);
let port = null;
let reader = null;
let writer = null;
let isConnected = false;
let pixelSize = 5;
let pixelLcd = 0;
let tempInvertLcd = 0;
let invertLcd = 0;
let tempColorKey = 'x';
let currentColorKey = DEFAULT_COLOR;
let frameCount = 0;
let frameLost = 0;
let lastTime = performance.now();
let keepaliveInterval = null;
let isDarkTheme = false;
let shiftHeld = false;
let ctrlHeld  = false;
let radioDeepSleep = false;
let radioLedState = { red: false, green: false };

// DOM elements
const canvas = document.getElementById('display');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');
const connectionBtn = document.getElementById('connectionBtn');
const notifications = document.getElementById('notifications');
const themeToggle = document.getElementById('themeToggle');
const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeModal = document.getElementById('closeModal');
const fKeyIndicator  = document.getElementById('fKeyIndicator');
const lockIndicator  = document.getElementById('lockIndicator');
const radioLedRed = document.getElementById('radioLedRed');
const radioLedGreen = document.getElementById('radioLedGreen');
const rfLogPanel = document.getElementById('rfLogPanel');
const rfLogState = document.getElementById('rfLogState');
const rfLogRows = document.getElementById('rfLogRows');
const rfLogTableView = document.getElementById('rfLogTableView');
const rfAnalyticsView = document.getElementById('rfAnalyticsView');
const rfAnalyticsCaption = document.getElementById('rfAnalyticsCaption');
const rfStatCount = document.getElementById('rfStatCount');
const rfStatSplit = document.getElementById('rfStatSplit');
const rfStatDuration = document.getElementById('rfStatDuration');
const rfStatAverage = document.getElementById('rfStatAverage');
const rfStatFrequencies = document.getElementById('rfStatFrequencies');
const rfStatChannels = document.getElementById('rfStatChannels');
const rfBatteryMeta = document.getElementById('rfBatteryMeta');
const rfBatteryChart = document.getElementById('rfBatteryChart');
const rfSessions = document.getElementById('rfSessions');
const rfSessionsToggle = document.getElementById('rfSessionsToggle');
const rfTopFrequenciesLabel = document.getElementById('rfTopFrequenciesLabel');
const rfTopFrequencies = document.getElementById('rfTopFrequencies');
const rfDistributions = document.getElementById('rfDistributions');
let rfLogCache = new Map();
let rfLogLiveRow = null;
let rfLogStatusFlags = 0;
let rfLogRestartPending = true;
let rfAnalyticsFilter = 'all';
let rfSessionsExpanded = false;
let rfAnalyticsResizeFrame = null;
let serialSession = 0;

document.querySelectorAll('[data-rf-view]').forEach(button => {
    button.addEventListener('click', () => setRfLogView(button.dataset.rfView));
});

document.querySelectorAll('[data-rf-filter]').forEach(button => {
    button.addEventListener('click', () => {
        rfAnalyticsFilter = button.dataset.rfFilter;
        document.querySelectorAll('[data-rf-filter]').forEach(item => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        updateRfAnalytics();
    });
});

if (rfSessionsToggle) {
    rfSessionsToggle.addEventListener('click', () => {
        rfSessionsExpanded = !rfSessionsExpanded;
        updateRfAnalytics();
    });
}

// Load local storage
const pixelSizeLocal = parseInt(preferences.get('pixelSize', ''), 10);
if (!isNaN(pixelSizeLocal) && pixelSizeLocal >= 3 && pixelSizeLocal <= 12) {
    pixelSize = pixelSizeLocal;
}

const pixelLcdLocal = parseInt(preferences.get('pixelLcd', ''), 10);
if (!isNaN(pixelLcdLocal)) {
    pixelLcd = pixelLcdLocal;
}

const currentColorKeyLocal = preferences.get('currentColorKey', '');
if (currentColorKeyLocal && currentColorKeyLocal in COLOR_SETS) {
    currentColorKey = currentColorKeyLocal;
}

const invertLcdLocal = parseInt(preferences.get('invertLcd', ''), 10);
if (!isNaN(invertLcdLocal)) {
    invertLcd = invertLcdLocal;
}

const lcdRiseLocal = parseFloat(preferences.get('LCD_RISE', ''));
const lcdFallLocal = parseFloat(preferences.get('LCD_FALL', ''));
if ((lcdRiseLocal === LCD_RISE_DEFAULT || lcdRiseLocal === 1) &&
    (lcdFallLocal === LCD_FALL_DEFAULT || lcdFallLocal === 1)) {
    LCD_RISE = lcdRiseLocal;
    LCD_FALL = lcdFallLocal;
}

const isDarkThemeLocal = preferences.get('isDarkTheme', null);
if (isDarkThemeLocal !== null) {
    isDarkTheme = isDarkThemeLocal === 'true';
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
}

// Live-sync the theme when another same-origin tab changes it (the toggle icon
// follows data-theme via CSS, so setting the attribute is enough).
window.addEventListener('storage', (e) => {
    if (e.key !== 'isDarkTheme') return;
    isDarkTheme = preferences.get('isDarkTheme', 'false') === 'true';
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
});

// Update Connect/Disconnect button
function updateConnectionButtonState(state) {
    if (!connectionBtn) return;
    
    if (state === 'connected') {
        connectionBtn.disabled = false;
        connectionBtn.className = 'btn danger';
        connectionBtn.setAttribute('data-i18n', 'disconnect');
        connectionBtn.textContent = t('disconnect');
    } else if (state === 'disconnected') {
        connectionBtn.disabled = false;
        connectionBtn.className = 'btn primary';
        connectionBtn.setAttribute('data-i18n', 'connect');
        connectionBtn.textContent = t('connect');
    } else if (state === 'disabled') {
        connectionBtn.disabled = true;
    }
}


// Initialize canvas
updateCanvasSize();

// Translation functions
function t(key, params = {}) {
    return window.uvStudioI18n ? window.uvStudioI18n.t(key, params) : key;
}

function refreshLocalizedViewerState() {
    if (!isConnected) {
        updateStatus(t('ready_to_connect'));
    }

    updateRfLogPanel();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    preferences.set('isDarkTheme', isDarkTheme);
}

function updateCanvasSize() {
    canvas.width = WIDTH * (pixelSize - 1);
    canvas.height = HEIGHT * pixelSize;
    startLcdAnimation();
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

const MODAL_FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');
let helpFocusOrigin = null;

function getHelpFocusableElements() {
    return Array.from(helpModal.querySelectorAll(MODAL_FOCUSABLE_SELECTOR))
        .filter(element => element.offsetParent !== null && element.getAttribute('aria-hidden') !== 'true');
}

function showModal() {
    if (helpModal.classList.contains('show')) return;
    const activeElement = document.activeElement;
    helpFocusOrigin = activeElement && activeElement !== document.body && typeof activeElement.focus === 'function'
        ? activeElement
        : helpBtn;
    helpModal.classList.add('show');
    helpModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeModal.focus());
}

function hideModal() {
    if (!helpModal.classList.contains('show')) return;
    const focusTarget = helpFocusOrigin;
    helpFocusOrigin = null;
    helpModal.classList.remove('show');
    document.body.style.overflow = '';
    if (focusTarget && document.contains(focusTarget)) {
        focusTarget.focus({ preventScroll: true });
    }
    helpModal.setAttribute('aria-hidden', 'true');
}

function handleHelpModalKeydown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        hideModal();
        return;
    }
    if (event.key !== 'Tab') return;

    const focusable = getHelpFocusableElements();
    if (focusable.length === 0) {
        event.preventDefault();
        closeModal.focus();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
}

async function connectSerial() {
    try {
        if (!('serial' in navigator)) {
            throw new Error(t('web_serial_not_supported'));
        }

        await viewerSerial.acquire({ source: 'viewer' });
        if (!viewerSerial.isOwner()) {
            throw Object.assign(new Error(t('disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
        }
        port = await navigator.serial.requestPort();
        if (!viewerSerial.isOwner()) {
            throw Object.assign(new Error(t('disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
        }
        await port.open({ baudRate: BAUDRATE });
        if (!viewerSerial.isOwner()) {
            try { await port.close(); } catch (_) {}
            port = null;
            throw Object.assign(new Error(t('disconnected')), { code: 'UVSTUDIO_SERIAL_RELEASED' });
        }
        
        reader = port.readable.getReader();
        writer = port.writable.getWriter();
        
        isConnected = true;
        radioDeepSleep = false;
        updateRadioLeds(false, false);
        tempColorKey = currentColorKey;
        tempInvertLcd = invertLcd;
        startLcdAnimation();
        lastPortInfo = port.getInfo();
        userDisconnected = false;
        updateConnectionButtonState('connected');
        updateKeyboardState();
        resetRfLogPanel();
        
        updateStatus(t('connected_waiting'));
        showNotification('serial_established', {}, 'success');
        
        // Start keepalive
        keepaliveInterval = setInterval(sendKeepalive, KEEPALIVE_INTERVAL_MS);
        
        // Start reading frames
        readFrames(++serialSession);
        viewerSerial.setState('connected', { reason: 'connection-established' });
        
    } catch (error) {
        if (viewerSerial.isOwner()) {
            await viewerSerial.release('connection-error');
        } else {
            await disconnectSerial({ reason: 'connection-cancelled' });
        }
        if (error.code !== 'UVSTUDIO_SERIAL_RELEASED') {
            showNotification('connection_error', { error: error.message }, 'error');
            console.error('Connection error:', error);
        }
    }
}

async function closeSerialResources() {
    const activeReader = reader;
    const activeWriter = writer;
    const activePort = port;
    reader = null;
    writer = null;
    port = null;

    return window.UVStudioSerial.closeResources({
        reader: activeReader,
        writer: activeWriter,
        port: activePort
    });
}

async function disconnectSerial(context = {}) {
    isConnected = false;
    serialSession++;
    radioDeepSleep = false;
    updateRadioLeds(false, false);
    userDisconnected = true;
    autoReconnecting = false;
    clearTimeout(reconnectTimer);
    reconnectTimer = null;

    if (keepaliveInterval) {
        clearInterval(keepaliveInterval);
        keepaliveInterval = null;
    }

    const disconnectError = await closeSerialResources();

    updateConnectionButtonState('disconnected');
    updateKeyboardState();
    resetRfLogPanel();

    tempColorKey = 'x';
    tempInvertLcd = 0;
    startLcdAnimation();

    updateStatus(t('disconnected'));
    if (context.reason === 'user' && !disconnectError) {
        showNotification('disconnected_success', {}, 'success');
    } else if (context.reason === 'user' && disconnectError) {
        const error = disconnectError;
        showNotification('disconnection_error', { error: error.message }, 'error');
        console.error('Disconnection error:', error);
    }
}

const viewerSerial = window.UVStudioSerial.register('viewer', {
    disconnect: disconnectSerial
});

async function sendKeepalive() {
    if (!writer || !isConnected) return;
    
    try {
        const keepalive = new Uint8Array([0x55, 0xAA, 0x00, 0x00]);
        const featureKeepalive = RF_LOG.featureKeepalive(rfLogRestartPending);
        await writer.write(keepalive);
        await writer.write(featureKeepalive);
        rfLogRestartPending = false;
    } catch (error) {
        console.error('Keepalive error:', error);
        handleHardwareDisconnect();
    }
}

function parseRfLogPacket(payload) {
    let packet;
    try {
        packet = RF_LOG.parseMainPacket(payload);
    } catch (error) {
        return;
    }

    if (packet.disabled) {
        resetRfLogPanel(false);
        return;
    }
    if (!packet.full) return;

    // A valid enabled packet proves the firmware exposes the RF log stream.
    if (rfLogPanel) rfLogPanel.hidden = false;

    const statusFlags = packet.statusFlags;
    const rows = packet.rows;
    rfLogStatusFlags = statusFlags;
    rfLogLiveRow = packet.liveRow;

    if ((statusFlags & RF_LOG_STATUS_CLEARING) !== 0 ||
        (statusFlags & RF_LOG_STATUS_HAS_TRAFFIC) === 0) {
        rfLogCache.clear();
    } else if (isDifferentRfLog(rows)) {
        rfLogCache = new Map();
        rfLogRestartPending = true;
    }
    mergeRfLogRows(rows);
    updateRfLogPanel();
}

function isDifferentRfLog(rows) {
    if (rfLogCache.size === 0 || rows.length === 0) return false;
    if (rows.length < 3 && rfLogCache.size > rows.length) return true;

    let matches = 0;
    for (const row of rows) {
        const cached = rfLogCache.get(row.trafficSeq);
        if (cached &&
            cached.frequency === row.frequency &&
            cached.durationSeconds === row.durationSeconds &&
            cached.channel === row.channel &&
            cached.flags === row.flags &&
            cached.meter === row.meter &&
            cached.battVolt === row.battVolt &&
            ++matches >= Math.min(3, rows.length, rfLogCache.size)) {
            return false;
        }
    }

    return true;
}

function parseRfLogHistoryPacket(payload) {
    let rows;
    try {
        rows = RF_LOG.parseHistoryPacket(payload);
    } catch (error) {
        return;
    }

    mergeRfLogRows(rows);
    updateRfLogPanel();
}

function mergeRfLogRows(rows) {
    RF_LOG.mergeRows(rfLogCache, rows);
    const newest = RF_LOG.limitVisibleRows(rfLogCache.values());
    rfLogCache = new Map(newest.map(row => [row.trafficSeq, row]));
}

function setRfLogView(view) {
    const analytics = view === 'analytics';
    if (rfLogTableView) rfLogTableView.classList.toggle('active', !analytics);
    if (rfAnalyticsView) rfAnalyticsView.classList.toggle('active', analytics);
    document.querySelectorAll('[data-rf-view]').forEach(button => {
        const active = button.dataset.rfView === view;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
    });
    if (analytics) updateRfAnalytics();
}

function updateRfAnalytics() {
    // The analytics view re-renders on every serial packet: skip the whole
    // pass while the log table is the visible view, the switch recomputes.
    if (!rfAnalyticsView || !rfAnalyticsView.classList.contains('active')) return;

    const allRows = Array.from(rfLogCache.values()).sort((a, b) => b.trafficSeq - a.trafficSeq);
    const traffic = allRows.filter(row => (row.flags & RF_LOG_FLAG_SESSION) === 0);
    const rows = traffic.filter(row => rfAnalyticsFilter === 'all' ||
        (rfAnalyticsFilter === 'tx') === ((row.flags & RF_LOG_FLAG_TX) !== 0));
    const rxCount = rows.filter(row => (row.flags & RF_LOG_FLAG_TX) === 0).length;
    const txCount = rows.length - rxCount;
    const totalDuration = rows.reduce((sum, row) => sum + row.durationSeconds, 0);
    const averageDuration = rows.length ? Math.round(totalDuration / rows.length) : 0;
    const frequencyCount = new Set(rows.map(row => row.frequency)).size;
    const channelCount = RF_LOG.countDistinctMemoryChannels(rows);

    if (rfAnalyticsCaption) {
        rfAnalyticsCaption.textContent = rfAnalyticsFilter === 'all'
            ? t('rf_last_activities', { count: traffic.length })
            : t('rf_filtered_activities', { count: rows.length, total: traffic.length });
    }
    if (rfStatCount) rfStatCount.textContent = rows.length;
    if (rfStatSplit) rfStatSplit.textContent = `${rxCount}RX · ${txCount}TX`;
    if (rfStatDuration) rfStatDuration.textContent = formatRfDuration(totalDuration);
    if (rfStatAverage) rfStatAverage.textContent = t('rf_average', { duration: formatRfDuration(averageDuration) });
    if (rfStatFrequencies) rfStatFrequencies.textContent = frequencyCount;
    if (rfStatChannels) rfStatChannels.textContent = t(channelCount === 1 ? 'rf_channel_count' : 'rf_channels_count', { count: channelCount });

    renderRfBattery(allRows);
    renderRfSessions(allRows);
    renderRfTopFrequencies(rows);
    renderRfDistributions(rows);
}

function scheduleRfAnalyticsResize() {
    if (!rfAnalyticsView || !rfAnalyticsView.classList.contains('active')) return;
    if (rfAnalyticsResizeFrame !== null) cancelAnimationFrame(rfAnalyticsResizeFrame);
    rfAnalyticsResizeFrame = requestAnimationFrame(() => {
        rfAnalyticsResizeFrame = null;
        updateRfAnalytics();
    });
}

window.addEventListener('resize', scheduleRfAnalyticsResize);

// Battery voltage over the whole cached log. Power-on boundaries remain
// visible, but the curve stays continuous because a reboot is not missing
// measurement data. The direction filter does not apply to battery data.
function renderRfBattery(allRows) {
    if (!rfBatteryChart || !rfBatteryMeta) return;

    const points = [];
    const boundaries = [];
    for (let i = allRows.length - 1; i >= 0; i--) {
        const row = allRows[i];
        if ((row.flags & RF_LOG_FLAG_SESSION) !== 0) {
            if (points.length && boundaries[boundaries.length - 1] !== points.length)
                boundaries.push(points.length);
            continue;
        }
        if (row.battVolt === RF_LOG_BATT_UNKNOWN) continue;
        points.push((RF_LOG_BATT_OFFSET + row.battVolt) / 100);
    }
    while (boundaries.length && boundaries[boundaries.length - 1] >= points.length)
        boundaries.pop();

    if (points.length === 0) {
        rfBatteryMeta.textContent = '--';
        rfBatteryChart.innerHTML = `<div class="rf-analytics-empty">${t('rf_no_data')}</div>`;
        return;
    }

    const minVolt = Math.min(...points);
    const maxVolt = Math.max(...points);
    rfBatteryMeta.textContent = `${minVolt.toFixed(2)}–${maxVolt.toFixed(2)} V`;

    const width = Math.max(rfBatteryChart.clientWidth, 120);
    const height = 44;
    const padY = 4;
    const span = Math.max(maxVolt - minVolt, 0.05);
    const x = i => points.length === 1 ? width / 2 : 1 + (i / (points.length - 1)) * (width - 2);
    const y = v => height - padY - ((v - minVolt) / span) * (height - 2 * padY);

    let svg = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" aria-label="${t('rf_battery_chart_aria')}">`;
    svg += `<line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" stroke="var(--rf-hairline)" stroke-width="1"/>`;
    const coords = points.map((point, i) => `${x(i).toFixed(1)},${y(point).toFixed(1)}`);
    if (points.length > 1) {
        svg += `<polygon points="${x(0).toFixed(1)},${height - 1} ${coords.join(' ')} ${x(points.length - 1).toFixed(1)},${height - 1}" fill="var(--rf-batt)" opacity="0.1"/>`;
        svg += `<polyline points="${coords.join(' ')}" fill="none" stroke="var(--rf-batt)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    }
    boundaries.forEach(boundary => {
        const bx = ((x(boundary - 1) + x(boundary)) / 2).toFixed(1);
        svg += `<line x1="${bx}" y1="0" x2="${bx}" y2="${height}" stroke="var(--rf-hairline)" stroke-width="1"><title>${t('rf_power_on')}</title></line>`;
    });
    const last = points.length - 1;
    svg += '</svg>';
    rfBatteryChart.innerHTML = svg;
}

function renderRfSessions(allRows) {
    if (!rfSessions || !rfSessionsToggle) return;
    const sessions = RF_LOG.groupRowsBySession(allRows);
    if (sessions.length === 0) {
        rfSessions.innerHTML = `<div class="rf-analytics-empty">${t('rf_no_activity')}</div>`;
        rfSessionsToggle.hidden = true;
        return;
    }

    const visibleSessions = rfSessionsExpanded ? sessions : sessions.slice(0, 3);
    rfSessionsToggle.hidden = sessions.length <= 3;
    rfSessionsToggle.textContent = t(rfSessionsExpanded
        ? 'rf_sessions_show_less'
        : 'rf_sessions_show_all');
    rfSessionsToggle.setAttribute('aria-expanded', String(rfSessionsExpanded));

    const allSessionVoltages = sessions.flatMap(session => session.rows
        .filter(row => row.battVolt !== RF_LOG_BATT_UNKNOWN)
        .map(row => (RF_LOG_BATT_OFFSET + row.battVolt) / 100));
    let voltageScaleMin = allSessionVoltages.length ? Math.min(...allSessionVoltages) : 0;
    let voltageScaleMax = allSessionVoltages.length ? Math.max(...allSessionVoltages) : 0;
    if (voltageScaleMax - voltageScaleMin < 0.05) {
        const middle = (voltageScaleMin + voltageScaleMax) / 2;
        voltageScaleMin = middle - 0.025;
        voltageScaleMax = middle + 0.025;
    }

    rfSessions.innerHTML = visibleSessions.map((session, index) => {
        const rows = session.rows;
        const rxRows = rows.filter(row => (row.flags & RF_LOG_FLAG_TX) === 0);
        const txRows = rows.filter(row => (row.flags & RF_LOG_FLAG_TX) !== 0);
        const rxDuration = rxRows.reduce((sum, row) => sum + row.durationSeconds, 0);
        const txDuration = txRows.reduce((sum, row) => sum + row.durationSeconds, 0);
        const totalDuration = rxDuration + txDuration;
        const rxWidth = totalDuration ? (rxDuration / totalDuration) * 100 : 0;
        const txWidth = totalDuration ? (txDuration / totalDuration) * 100 : 0;
        const frequencies = new Map();
        rows.forEach(row => {
            const duration = frequencies.get(row.frequency) || 0;
            frequencies.set(row.frequency, duration + row.durationSeconds);
        });
        const mostUsedRx = findMostUsedRfFrequency(rxRows);
        const mostUsedTx = findMostUsedRfFrequency(txRows);

        const voltages = rows
            .filter(row => row.battVolt !== RF_LOG_BATT_UNKNOWN)
            .map(row => (RF_LOG_BATT_OFFSET + row.battVolt) / 100);
        let battery = '--';
        if (voltages.length > 0) {
            const start = voltages[0];
            const end = voltages[voltages.length - 1];
            const delta = end - start;
            const sign = delta < 0 ? '−' : '+';
            battery = `${start.toFixed(2)} V → ${end.toFixed(2)} V · ${sign}${Math.abs(delta).toFixed(2)} V`;
        }

        const label = index === 0
            ? t('rf_session_current')
            : t('rf_session_ago', { count: index });
        const partial = session.partial
            ? `<span class="rf-session-badge">${t('rf_session_partial')}</span>`
            : '';
        const mostUsedDirections = [
            mostUsedRx !== null
                ? `${t('rf_session_rx_most_active')} <span class="rf-session-mono">${formatRfFrequency(mostUsedRx)} MHz</span>`
                : '',
            mostUsedTx !== null
                ? `${t('rf_session_tx_most_used')} <span class="rf-session-mono">${formatRfFrequency(mostUsedTx)} MHz</span>`
                : ''
        ].filter(Boolean);
        const mostUsedText = mostUsedDirections.length
            ? mostUsedDirections.join(' · ')
            : t('rf_no_activity');
        const batteryChart = renderRfSessionBattery(
            voltages, voltageScaleMin, voltageScaleMax, battery);

        return `<section class="rf-session-row" role="listitem">
            <div class="rf-session-title">
                <span><strong>${label}</strong> / ${t('rf_session_activity_count', { count: rows.length })}${partial}</span>
                <span class="rf-session-battery-summary">${battery}</span>
            </div>
            <div class="rf-session-body">
                <div class="rf-session-data">
                    <div class="rf-session-traffic">
                        <span class="rx">RX <b>${rxRows.length}</b> · ${formatRfDuration(rxDuration)}</span>
                        <span class="rf-session-track">
                            ${rxWidth ? `<i class="rx" style="width:${rxWidth.toFixed(1)}%"></i>` : ''}
                            ${txWidth ? `<i class="tx" style="width:${txWidth.toFixed(1)}%"></i>` : ''}
                        </span>
                        <span class="tx">TX <b>${txRows.length}</b> · ${formatRfDuration(txDuration)}</span>
                    </div>
                    <div class="rf-session-meta">
                        <span><span class="rf-session-mono">${frequencies.size}</span> ${t('rf_frequencies')} · ${mostUsedText}</span>
                    </div>
                </div>
                <div class="rf-session-battery">
                    ${batteryChart}
                </div>
            </div>
        </section>`;
    }).join('');
}

function findMostUsedRfFrequency(rows) {
    const airtimeByFrequency = new Map();
    rows.forEach(row => {
        airtimeByFrequency.set(
            row.frequency,
            (airtimeByFrequency.get(row.frequency) || 0) + row.durationSeconds
        );
    });
    const mostUsed = Array.from(airtimeByFrequency.entries())
        .sort((a, b) => b[1] - a[1])[0];
    return mostUsed ? mostUsed[0] : null;
}

function renderRfSessionBattery(voltages, scaleMin, scaleMax, tooltip) {
    if (voltages.length === 0) {
        return '<div class="rf-session-battery-empty">--</div>';
    }

    const width = 112;
    const height = 38;
    const pad = 2;
    const span = Math.max(0.05, scaleMax - scaleMin);
    const x = index => voltages.length === 1
        ? width / 2
        : pad + (index / (voltages.length - 1)) * (width - pad * 2);
    const y = voltage => height - pad -
        ((voltage - scaleMin) / span) * (height - pad * 2);
    const coords = voltages.map((voltage, index) =>
        `${x(index).toFixed(1)},${y(voltage).toFixed(1)}`);

    let svg = `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="${escapeRfHtml(t('rf_battery_chart_aria'))}"><title>${escapeRfHtml(tooltip)}</title>`;
    svg += `<line x1="0" y1="${height - 0.5}" x2="${width}" y2="${height - 0.5}" class="rf-session-battery-base"></line>`;
    if (voltages.length > 1) {
        svg += `<polygon points="${x(0).toFixed(1)},${height - 1} ${coords.join(' ')} ${x(voltages.length - 1).toFixed(1)},${height - 1}" class="rf-session-battery-area"></polygon>`;
        svg += `<polyline points="${coords.join(' ')}" class="rf-session-battery-line"></polyline>`;
    } else {
        const level = y(voltages[0]).toFixed(1);
        svg += `<polygon points="${pad},${height - 1} ${pad},${level} ${width - pad},${level} ${width - pad},${height - 1}" class="rf-session-battery-area"></polygon>`;
        svg += `<line x1="${pad}" y1="${level}" x2="${width - pad}" y2="${level}" class="rf-session-battery-line"></line>`;
    }
    svg += '</svg>';
    return svg;
}

function renderRfTopFrequencies(rows) {
    if (!rfTopFrequencies) return;
    const groups = new Map();

    rows.forEach(row => {
        const key = `${row.frequency}:${row.channel}`;
        let group = groups.get(key);
        if (!group) {
            group = { row, count: 0, rxCount: 0, txCount: 0, duration: 0, rxDuration: 0, txDuration: 0, rxMeterTotal: 0, rxMeterCount: 0 };
            groups.set(key, group);
        }
        const tx = (row.flags & RF_LOG_FLAG_TX) !== 0;
        group.count++;
        group.duration += row.durationSeconds;
        if (tx) {
            group.txCount++;
            group.txDuration += row.durationSeconds;
        } else {
            group.rxCount++;
            group.rxDuration += row.durationSeconds;
            if (row.meter !== 0xFF) {
                group.rxMeterTotal += row.meter;
                group.rxMeterCount++;
            }
        }
    });

    const top = Array.from(groups.values()).sort((a, b) => b.duration - a.duration).slice(0, 20);
    if (rfTopFrequenciesLabel) {
        rfTopFrequenciesLabel.textContent = t('rf_top_frequencies', { count: top.length });
    }
    if (top.length === 0) {
        rfTopFrequencies.innerHTML = `<div class="rf-analytics-empty">${t('rf_no_activity')}</div>`;
        return;
    }

    const maxDuration = Math.max(1, ...top.map(group => group.duration));
    rfTopFrequencies.innerHTML = top.map(group => {
        const channel = formatRfChannel(group.row);
        const frequency = formatRfFrequency(group.row.frequency);
        const name = channel === '-' ? '—' : channel;
        let signal = '';
        if (group.rxMeterCount) {
            const avg = Math.round(group.rxMeterTotal / group.rxMeterCount);
            signal = formatRfMeter(0, avg);
        }
        const rxWidth = (group.rxDuration / maxDuration) * 100;
        const txWidth = (group.txDuration / maxDuration) * 100;
        const activityCounts = [
            group.rxCount ? `${group.rxCount} RX` : '',
            group.txCount ? `${group.txCount} TX` : ''
        ].filter(Boolean).join(' · ');
        const tip = `${channel === '-' ? '' : `${channel} · `}${frequency} MHz — ` +
            t(group.count === 1 ? 'rf_activity_tooltip' : 'rf_activities_tooltip', {
                count: group.count,
                rx: formatRfDuration(group.rxDuration),
                tx: formatRfDuration(group.txDuration)
            });
        return `<div class="rf-top-row" title="${escapeRfHtml(tip)}">
            <div class="rf-top-line">
                <span class="rf-top-name">${escapeRfHtml(name)}</span>
                <span class="rf-top-freq">${frequency}</span>
                <span class="rf-top-count">${activityCounts}</span>
                <span class="rf-top-signal">${signal}</span>
                <span class="rf-top-time">${formatRfDuration(group.duration)}</span>
            </div>
            <div class="rf-top-track">
                ${rxWidth > 0 ? `<i class="rx" style="width:${rxWidth.toFixed(1)}%"></i>` : ''}
                ${txWidth > 0 ? `<i class="tx" style="width:${txWidth.toFixed(1)}%"></i>` : ''}
            </div>
        </div>`;
    }).join('');
}

function renderRfDistributions(rows) {
    if (!rfDistributions) return;
    const sections = [];
    if (rfAnalyticsFilter !== 'tx') {
        sections.push(renderRfDistSection(t('rf_rx_signal'),
            rows.filter(row => (row.flags & RF_LOG_FLAG_TX) === 0), false));
    }
    if (rfAnalyticsFilter !== 'rx') {
        sections.push(renderRfDistSection(t('rf_tx_power'),
            rows.filter(row => (row.flags & RF_LOG_FLAG_TX) !== 0), true));
    }
    rfDistributions.innerHTML = sections.join('');
}

function renderRfDistSection(title, source, txMode) {
    if (!txMode) {
        return renderRfSignalDistribution(title, source);
    }

    let buckets;
    buckets = RF_LOG_POWER_LABELS.map((label, meter) => ({
        label,
        value: source.filter(row => row.meter === meter).length
    })).filter(bucket => bucket.value > 0);

    let body;
    if (source.length === 0 || buckets.length === 0) {
        body = `<div class="rf-analytics-empty">${t('rf_no_data')}</div>`;
    } else {
        const max = Math.max(1, ...buckets.map(bucket => bucket.value));
        body = `<div class="rf-dist-rows">${buckets.map(bucket => `<div class="rf-dist-row">
            <span>${bucket.label}</span>
            <span class="rf-dist-track"><i class="rf-dist-fill${txMode ? ' tx' : ''}" style="width:${Math.round((bucket.value / max) * 100)}%"></i></span>
            <span class="rf-dist-value">${bucket.value}</span>
        </div>`).join('')}</div>`;
    }

    return `<section>
        <div class="rf-analytics-head"><span>${title}</span></div>
        ${body}
    </section>`;
}

function renderRfSignalDistribution(title, source) {
    const labels = [
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
        'S9+01–10', 'S9+11–20', 'S9+21–30', 'S9+31–40'
    ];
    const axisLabels = [
        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9',
        'S9<small>+10</small>', 'S9<small>+20</small>',
        'S9<small>+30</small>', 'S9<small>+40</small>'
    ];
    const counts = new Array(labels.length).fill(0);
    source.forEach(row => {
        if (row.meter === 0xFF) return;
        // Keep S1..S9 exact, then group the 40 dB above S9 by 10 dB.
        const meter = Math.min(49, Math.max(1, row.meter));
        const bucket = meter <= 9 ? meter - 1 : 9 + Math.min(3, Math.floor((meter - 10) / 10));
        counts[bucket]++;
    });

    const total = counts.reduce((sum, count) => sum + count, 0);
    let body;
    if (total === 0) {
        body = `<div class="rf-analytics-empty">${t('rf_no_data')}</div>`;
    } else {
        const max = Math.max(...counts);
        const bars = counts.map((count, index) => {
            const height = count ? Math.max(4, Math.round((count / max) * 100)) : 0;
            return `<i style="height:${height}%" title="${labels[index]} · ${count}"></i>`;
        }).join('');
        body = `<div class="rf-signal-histogram">
            <div class="rf-signal-bars">${bars}</div>
            <div class="rf-signal-axis">${axisLabels.map(label => `<span>${label}</span>`).join('')}</div>
        </div>`;
    }

    return `<section class="rf-signal-section">
        <div class="rf-analytics-head"><span>${title}</span><span>${total}</span></div>
        ${body}
    </section>`;
}

function updateRfLogPanel() {
    if (!rfLogRows || !rfLogState) return;

    const statusFlags = rfLogStatusFlags;
    const isClearing = (statusFlags & RF_LOG_STATUS_CLEARING) !== 0;
    const isActive = (statusFlags & RF_LOG_STATUS_ACTIVE) !== 0;
    const hasTraffic = (statusFlags & RF_LOG_STATUS_HAS_TRAFFIC) !== 0;

    rfLogState.textContent = isClearing ? t('rf_clear') : (isActive ? t('rf_live') : (hasTraffic ? t('rf_idle') : t('rf_no_log')));
    rfLogState.className = `rf-log-state${isActive ? ' active' : ''}${isClearing ? ' clearing' : ''}`;

    const displayRows = [];
    if (isActive && rfLogLiveRow) {
        displayRows.push({ ...rfLogLiveRow, live: true });
    }
    Array.from(rfLogCache.values())
        .sort((a, b) => b.trafficSeq - a.trafficSeq)
        .forEach(row => displayRows.push({ ...row, live: false }));

    updateRfAnalytics();

    if (displayRows.length === 0) {
        rfLogRows.innerHTML = '<tr class="rf-log-empty"><td colspan="6">--</td></tr>';
        return;
    }

    rfLogRows.innerHTML = displayRows.map(row => renderRfLogRow(row)).join('');
}

function resetRfLogPanel(requestRestart = true) {
    // Hide until the firmware reports an enabled RF log again.
    if (rfLogPanel) rfLogPanel.hidden = true;
    if (rfLogState) {
        rfLogState.textContent = '--';
        rfLogState.className = 'rf-log-state';
    }
    if (rfLogRows) {
        rfLogRows.innerHTML = '<tr class="rf-log-empty"><td colspan="6">--</td></tr>';
    }
    rfLogCache = new Map();
    rfLogLiveRow = null;
    rfLogStatusFlags = 0;
    rfLogRestartPending = requestRestart;
    updateRfAnalytics();
}

// The channel name comes straight from the radio: escape it before it
// lands in innerHTML or a title attribute, printable ASCII still
// includes '<', '>', '&' and '"'.
function escapeRfHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderRfLogRow(row) {
    // Session markers render as the radio does: a separator line between
    // two power-on sessions instead of a traffic row.
    if ((row.flags & RF_LOG_FLAG_SESSION) !== 0) {
        return `<tr class="rf-log-session"><td colspan="6"><svg class="rf-log-session-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v10"></path><path d="M6.4 5.6a8 8 0 1 0 11.2 0"></path></svg><span>${t('rf_power_on')}</span></td></tr>`;
    }

    const direction = (row.flags & RF_LOG_FLAG_TX) ? 'TX' : 'RX';
    const rowClass = row.live ? ' class="rf-log-live"' : '';

    return `<tr${rowClass}>
        <td><span class="rf-direction-badge ${direction.toLowerCase()}">${direction}</span></td>
        <td>${formatRfFrequency(row.frequency)}</td>
        <td>${escapeRfHtml(formatRfChannel(row))}</td>
        <td>${formatRfDuration(row.durationSeconds)}</td>
        <td>${formatRfMeter(row.flags, row.meter)}</td>
        <td>${formatRfVoltage(row.battVolt)}</td>
    </tr>`;
}

function formatRfFrequency(frequency) {
    if (!frequency) return '-';

    const mhz = Math.floor(frequency / 100000);
    const frac = String(frequency % 100000).padStart(5, '0');
    return `${mhz}.${frac}`;
}

function formatRfChannel(row) {
    if (row.channelName) return row.channelName;
    if (row.channel === RXTX_LOG_CHANNEL_NONE) return '-';
    return `M${String(row.channel + 1).padStart(3, '0')}`;
}

function formatRfDuration(seconds) {
    if (!seconds) return '00:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatRfMeter(flags, meter) {
    if (meter === 0xFF) return '-';

    if (flags & RF_LOG_FLAG_TX) {
        return RF_LOG_POWER_LABELS[meter] || `P${meter}`;
    }

    const normalizedMeter = Math.max(1, meter);
    if (normalizedMeter > 9) {
        return `S9+${String(normalizedMeter - 9).padStart(2, '0')}`;
    }

    return `S${normalizedMeter}`;
}

function formatRfVoltage(battVolt) {
    if (battVolt === RF_LOG_BATT_UNKNOWN) return '-';

    const centivolts = RF_LOG_BATT_OFFSET + battVolt;
    return `${Math.floor(centivolts / 100)}.${String(centivolts % 100).padStart(2, '0')}`;
}

async function readFrames(session) {
    // Hold a display frame, the live RF snapshot and one history page even
    // when Web Serial coalesces them into the same read burst.
    const buffer = new Uint8Array(8192);
    const activeReader = reader;
    let bufferPos = 0;

    while (isConnected && session === serialSession && activeReader) {
        try {
            const { value, done } = await activeReader.read();
            if (session !== serialSession || !isConnected) break;
            if (done) {
                handleHardwareDisconnect();
                break;
            }
            
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
                // Check for version marker and optional state flags.
                let isNewFormat = false;
                let frameFlags = 0;
                let headerStart = processed;

                if (buffer[processed] === PROTOCOL_LEGACY_MARKER) {
                    isNewFormat = true;
                    headerStart = processed + 1;
                } else if ((buffer[processed] & PROTOCOL_FLAGS_MARKER_MASK) === PROTOCOL_FLAGS_MARKER_MASK) {
                    isNewFormat = true;
                    frameFlags = buffer[processed] & PROTOCOL_FLAGS_MASK;
                    headerStart = processed + 1;
                }

                if (headerStart + 4 >= bufferPos) {
                    break;
                }

                // Now check for standard header
                if (buffer[headerStart] === HEADER[0] &&
                    buffer[headerStart + 1] === HEADER[1]) {

                    const type = buffer[headerStart + 2];
                    const size = (buffer[headerStart + 3] << 8) | buffer[headerStart + 4];

                    // Calculate total frame size: marker(if new) + header + payload + end
                    const markerSize = isNewFormat ? 1 : 0;
                    const totalSize = markerSize + 5 + size + 1;

                    if (processed + totalSize <= bufferPos) {
                        if (buffer[processed + totalSize - 1] !== 0x0A) {
                            processed++;
                            continue;
                        }

                        const payloadStart = headerStart + 5;
                        const payload = buffer.slice(payloadStart, payloadStart + size);

                        if (type === TYPE_SCREENSHOT && size === FRAME_SIZE) {
                            framebuffer = new Uint8Array(payload);
                            applyFrameFlags(frameFlags);
                            startLcdAnimation();
                            updateFPS();
                        } else if (type === TYPE_DIFF && size % 9 === 0) {
                            // Apply diff with format awareness
                            applyDiff(payload, isNewFormat);
                            applyFrameFlags(frameFlags);
                            startLcdAnimation();
                            updateFPS();
                        } else if (type === TYPE_RF_LOG &&
                                   (size === RF_LOG_PACKET_SIZE || size === RF_LOG_STATUS_PACKET_SIZE)) {
                            parseRfLogPacket(payload);
                        } else if (type === TYPE_RF_LOG_HISTORY && size === RF_LOG_HISTORY_PACKET_SIZE) {
                            parseRfLogHistoryPacket(payload);
                        }

                        detectFKey();
                        detectKeyLock();

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
            if (session === serialSession && isConnected) {
                console.error('Read error:', error);
                handleHardwareDisconnect();
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

function applyFrameFlags(flags) {
    const deepSleep = !!(flags & PROTOCOL_FLAG_DEEP_SLEEP);
    updateRadioLeds(
        !!(flags & PROTOCOL_FLAG_LED_RED),
        !!(flags & PROTOCOL_FLAG_LED_GREEN)
    );

    if (radioDeepSleep === deepSleep) return;

    radioDeepSleep = deepSleep;
    if (radioDeepSleep) {
        tempColorKey = 'x';
        tempInvertLcd = 0;
        updateStatus(t('connected_deep_sleep'));
    } else {
        tempColorKey = currentColorKey;
        tempInvertLcd = invertLcd;
    }
}

function updateRadioLeds(redOn, greenOn) {
    if (radioLedState.red === redOn && radioLedState.green === greenOn) return;

    radioLedState = { red: redOn, green: greenOn };
    radioLedRed.classList.toggle('on', redOn);
    radioLedGreen.classList.toggle('on', greenOn);
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
    const theme = COLOR_SETS[tempColorKey];
    const fgColor = hexToRgb(tempInvertLcd ? theme[2] : theme[1]);
    const bgColor = hexToRgb(tempInvertLcd ? theme[1] : theme[2]);

    let stillAnimating = false;

    ['r', 'g', 'b'].forEach(c => {
        const diffFg = (fgColor[c] - currentDisplayFg[c]) * COLOR_TRANSITION_SPEED;
        const diffBg = (bgColor[c] - currentDisplayBg[c]) * COLOR_TRANSITION_SPEED;
        
        if (Math.abs(diffFg) > 0.1) { currentDisplayFg[c] += diffFg; stillAnimating = true; }
        if (Math.abs(diffBg) > 0.1) { currentDisplayBg[c] += diffBg; stillAnimating = true; }
    });

    ctx.fillStyle = `rgb(${currentDisplayBg.r|0},${currentDisplayBg.g|0},${currentDisplayBg.b|0})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const px = x * (pixelSize - 1);
            const py = y * pixelSize;
            const width = pixelSize - 1 - pixelLcd;
            const height = pixelSize - pixelLcd;
            
            const idx = y * WIDTH + x;

            const diff = getBit(idx) - pixelState[idx];
            if (Math.abs(diff) > 0.01) {
                pixelState[idx] += diff * (diff > 0 ? LCD_RISE : LCD_FALL);
                stillAnimating = true;
            } else {
                pixelState[idx] = getBit(idx);
            }

            const alpha = Math.max(pixelState[idx], pixelLcd ? 0.05 : 0);
            if (alpha > 0.01) {
                ctx.fillStyle = blendColors(currentDisplayBg, currentDisplayFg, alpha);
                ctx.fillRect(px, py, width, height);
            }
        }
    }

    return stillAnimating;
}

function startLcdAnimation() {
    if (lcdAnimating) return;
    lcdAnimating = true;
    
    const animate = () => {
        if (drawFrame()) {
            requestAnimationFrame(animate);
        } else {
            lcdAnimating = false;
        }
    };
    requestAnimationFrame(animate);
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
    const r = (color1.r + (color2.r - color1.r) * ratio) | 0;
    const g = (color1.g + (color2.g - color1.g) * ratio) | 0;
    const b = (color1.b + (color2.b - color1.b) * ratio) | 0;
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
        if (radioDeepSleep) {
            updateStatus(t('connected_deep_sleep'));
            frameCount = 0;
            lastTime = now;
            frameLost = 0;
            return;
        }

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

    if (isConnected && !radioDeepSleep) {
        tempInvertLcd = invertLcd;
        startLcdAnimation();
    }
    
    showNotification('colors_inverted', { status: invertLcd == 0 ? t('lcd_off') : t('lcd_on')}, 'info');
    preferences.set('invertLcd', invertLcd);
}

function toggleGhosting() {
    if (LCD_RISE == 1) {
        LCD_RISE = LCD_RISE_DEFAULT;
        LCD_FALL = LCD_FALL_DEFAULT;
    }
    else {
        LCD_RISE = 1;
        LCD_FALL = 1;
    }

    preferences.set('LCD_RISE', LCD_RISE);
    preferences.set('LCD_FALL', LCD_FALL);
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
        preferences.set('currentColorKey', key);
        
        const [labelKey] = COLOR_SETS[key];
        const name = t(labelKey);
        showNotification('color_changed', { color: name }, 'info');

        if (isConnected && !radioDeepSleep) {
            tempColorKey = key;
            startLcdAnimation();
        }
    }
}

// Event listeners
themeToggle.addEventListener('click', toggleTheme);
helpBtn.addEventListener('click', showModal);
closeModal.addEventListener('click', hideModal);
connectionBtn.addEventListener('click', (event) => {
    // A pointer click should not leave the global keyboard shortcuts trapped
    // behind the focused connection button. Keep focus for keyboard activation.
    if (event.detail > 0) {
        connectionBtn.blur();
    }

    if (viewerSerial.isOwner()) {
        void viewerSerial.release('user');
    } else {
        void connectSerial();
    }
});

// Close modal when clicking outside
helpModal.addEventListener('click', (e) => {
    if (e.target === helpModal) {
        hideModal();
    }
});
helpModal.addEventListener('keydown', handleHelpModalKeydown);

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
// K                 → toggle LCD ghosting effect
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
    'µ': 0x0E, // STAR with Shift on AZERTY
    '#': 0x0F, // F
};

document.addEventListener('keydown', (event) => {
    if (helpModal.classList.contains('show')) return;
    if (event.repeat) return;

    const eventTarget = event.target instanceof Element ? event.target : null;
    if (eventTarget?.closest('input, select, textarea, [contenteditable="true"]')) {
        return;
    }
    if (eventTarget?.closest('button, a') &&
        (event.key === 'Enter' || event.key === ' ')) {
        return;
    }

    const key  = event.key;
    const kl   = key.toLowerCase();
    const long = event.shiftKey && !event.ctrlKey && !event.altKey;

    // ── +/- → zoom ──────────────────────────────────────────────
    if (!event.ctrlKey && !event.altKey) {
        if (key === '+' || key === '=' || event.code === 'NumpadAdd') {
            event.preventDefault();
            changePixelSize(1);
            preferences.set('pixelSize', pixelSize);
            return;
        }
        if (key === '-' || event.code === 'NumpadSubtract') {
            event.preventDefault();
            changePixelSize(-1);
            preferences.set('pixelSize', pixelSize);
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

    // ── Ctrl / F → send # (KEY_F alias) ──────────────────────
    // Shift+Ctrl or Shift+F → long press
    if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        event.preventDefault();
        if (isConnected) sendKey(0x0F, shiftHeld);
        return;
    }
    if ((event.key === 'f' || event.key === 'F') && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        if (isConnected) sendKey(0x0F, event.shiftKey);
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
        const code = PC_KEY_MAP[kl] ?? PC_KEY_MAP[key]
            ?? (event.code === 'NumpadMultiply' ? 0x0E : undefined);
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
            startLcdAnimation();
            showNotification('lcd_effect', { status: pixelLcd ? t('lcd_on') : t('lcd_off') }, 'info');
            preferences.set('pixelLcd', pixelLcd);
            break;
        case 'i':
            toggleColors();
            break;
        case 'q':
            if (viewerSerial.isOwner()) void viewerSerial.release('user');
            break;
        case 'g': case 'o': case 'b': case 'w': case 'x':
            changeColorSet(kl);
            break;
        case 'h': case '?':
            showModal();
            break;
        case 'k':
            toggleGhosting();
            startLcdAnimation();
            showNotification('ghosting_changed', { status: LCD_FALL == 1 ? t('lcd_off') : t('lcd_on')}, 'info');
            break;
    }
});

window.addEventListener('uvstudio:languagechange', refreshLocalizedViewerState);

// Check Web Serial API support
if (!('serial' in navigator)) {
    showNotification('web_serial_not_supported', {}, 'error');
    if (connectionBtn) connectionBtn.disabled = true;
} else {
    // Show initial notification only if Web Serial is supported
    showNotification('app_loaded', {}, 'info');
}

// Initialize app
refreshLocalizedViewerState();
startLcdAnimation();


// ─── UV-K1 Virtual Keyboard ──────────────────────────────────
const TYPE_KEY      = 0x03;
const TYPE_KEY_LONG = 0x04;
const k1Keyboard = document.getElementById('k1Keyboard');

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
        let activePointerId = null;
        let keyboardPressed = false;

        function startPress() {
            if (btn.disabled) return;
            btn.classList.add('pressed');
            wasLong = false;
            longPressTimer = setTimeout(() => {
                wasLong = true;
                btn.classList.add('long');
                void sendKey(parseInt(btn.dataset.key, 16), true);
            }, 500);
        }

        function endPress(sendShort) {
            btn.classList.remove('pressed', 'long');
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }
            if (sendShort && !wasLong && !btn.disabled) {
                void sendKey(parseInt(btn.dataset.key, 16), false);
            }
            wasLong = false;
        }

        btn.addEventListener('pointerdown', event => {
            if (activePointerId !== null || btn.disabled) return;
            event.preventDefault();
            activePointerId = event.pointerId;
            btn.setPointerCapture?.(event.pointerId);
            startPress();
        });
        btn.addEventListener('pointerup', event => {
            if (event.pointerId !== activePointerId) return;
            activePointerId = null;
            endPress(true);
        });
        btn.addEventListener('pointercancel', event => {
            if (event.pointerId !== activePointerId) return;
            activePointerId = null;
            endPress(false);
        });
        btn.addEventListener('lostpointercapture', () => {
            if (activePointerId === null) return;
            activePointerId = null;
            endPress(false);
        });
        btn.addEventListener('keydown', event => {
            if ((event.key !== 'Enter' && event.key !== ' ') || event.repeat || keyboardPressed) return;
            event.preventDefault();
            keyboardPressed = true;
            startPress();
        });
        btn.addEventListener('keyup', event => {
            if ((event.key !== 'Enter' && event.key !== ' ') || !keyboardPressed) return;
            event.preventDefault();
            keyboardPressed = false;
            endPress(true);
        });
        btn.addEventListener('blur', () => {
            if (!keyboardPressed) return;
            keyboardPressed = false;
            endPress(false);
        });
    });
}

// Toggle keyboard visibility from header button
const keyboardToggleBtn = document.getElementById('keyboardToggleBtn');

function toggleKeyboard() {
    const hidden = k1Keyboard.classList.toggle('hidden');
    keyboardToggleBtn.style.opacity = hidden ? '0.4' : '1';
    keyboardToggleBtn.setAttribute('aria-expanded', String(!hidden));
    preferences.set('keyboardHidden', hidden);
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
const keyboardHiddenLocal = preferences.get('keyboardHidden', null);
if (keyboardHiddenLocal === 'true') {
    k1Keyboard.classList.add('hidden');
    keyboardToggleBtn.style.opacity = '0.4';
    keyboardToggleBtn.setAttribute('aria-expanded', 'false');
}

// Model toggle: UV-K1 (◀ ▶) vs UV-K5 (▲ ▼)
const tabK1  = document.getElementById('tabK1');
const tabK5  = document.getElementById('tabK5');

let kbdModel = preferences.get('kbdModel', 'K1');

function applyKbdModel(model) {
    const isK1 = model === 'K1';
    tabK1.setAttribute('aria-pressed', String(isK1));
    tabK5.setAttribute('aria-pressed', String(!isK1));
    if (isK1) {
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

tabK1.addEventListener('click', () => { kbdModel = 'K1'; preferences.set('kbdModel', kbdModel); applyKbdModel(kbdModel); });
tabK5.addEventListener('click', () => { kbdModel = 'K5'; preferences.set('kbdModel', kbdModel); applyKbdModel(kbdModel); });

applyKbdModel(kbdModel);

// Sync keyboard enabled/disabled with connection state
function updateKeyboardState() {
    k1Keyboard.classList.toggle('disabled', !isConnected);
    // Scope to the keyboard node (not document) so this still works when the
    // keypad is detached into a Picture-in-Picture window.
    k1Keyboard.querySelectorAll('.k1-btn[data-key]').forEach(button => {
        button.disabled = !isConnected;
    });
}

// ─── Auto-reconnect on USB disconnect/reconnect ──────────────
let autoReconnecting    = false;
let reconnectTimer      = null;
let lastPortInfo        = null;   // { usbVendorId, usbProductId }
let userDisconnected    = false;
let firstFrameAfterReconnect = false;
let reconnectWasDeepSleep = false;
let reconnectInProgress = false;
let hardwareDisconnectPromise = null;

async function handleHardwareDisconnect() {
    if (hardwareDisconnectPromise) return hardwareDisconnectPromise;
    if (userDisconnected) return;
    if (!isConnected) return;

    hardwareDisconnectPromise = (async () => {
        reconnectWasDeepSleep = radioDeepSleep;
        isConnected = false;
        serialSession++;
        if (reconnectWasDeepSleep) {
            tempColorKey = 'x';
            tempInvertLcd = 0;
        }
        startLcdAnimation();

        if (keepaliveInterval) { clearInterval(keepaliveInterval); keepaliveInterval = null; }
        await closeSerialResources();
        if (userDisconnected || !viewerSerial.isOwner()) return;

        updateConnectionButtonState('disabled');
        updateKeyboardState();
        resetRfLogPanel();

        autoReconnecting = true;
        viewerSerial.setState('reconnecting', { reason: 'hardware-disconnect' });
        updateStatus(t('reconnecting'));
        showNotification('serial_disconnected_auto', {}, 'warning');
        scheduleReconnectProbe();
    })();

    try {
        await hardwareDisconnectPromise;
    } finally {
        hardwareDisconnectPromise = null;
    }
}

if ('serial' in navigator) {
    navigator.serial.addEventListener('disconnect', () => {
        void handleHardwareDisconnect();
    });
}

function scheduleReconnectProbe() {
    if (reconnectTimer || !autoReconnecting) return;
    reconnectTimer = setTimeout(async () => {
        reconnectTimer = null;
        if (!autoReconnecting || !lastPortInfo) return;

        try {
            const ports = await navigator.serial.getPorts();
            const candidates = ports.filter(candidatePort => {
                const info = candidatePort.getInfo();
                return info.usbVendorId === lastPortInfo.usbVendorId &&
                       info.usbProductId === lastPortInfo.usbProductId;
            });

            for (const candidate of candidates) {
                await reconnectPort(candidate);
                if (!autoReconnecting) break;
            }
        } catch (error) {
            console.warn('Unable to enumerate serial ports during reconnect:', error);
        }
        if (autoReconnecting) scheduleReconnectProbe();
    }, 500);
}

async function reconnectPort(candidate) {
    if (!autoReconnecting) return;
    if (!lastPortInfo) return;
    if (reconnectInProgress) return;

    // Check if the reconnected port matches the one we lost
    const info = candidate.getInfo();
    if (info.usbVendorId  !== lastPortInfo.usbVendorId ||
        info.usbProductId !== lastPortInfo.usbProductId) return;
    reconnectInProgress = true;

    // It's our port — wait a bit for the OS to finish enumeration
    await new Promise(r => setTimeout(r, 500));
    if (!autoReconnecting || !viewerSerial.isOwner()) {
        reconnectInProgress = false;
        return;
    }

    try {
        port = candidate;
        await port.open({ baudRate: BAUDRATE });
        if (!autoReconnecting || !viewerSerial.isOwner()) {
            await closeSerialResources();
            return;
        }

        reader = port.readable.getReader();
        writer = port.writable.getWriter();
        if (!autoReconnecting || !viewerSerial.isOwner()) {
            await closeSerialResources();
            return;
        }

        isConnected = true;
        radioDeepSleep = reconnectWasDeepSleep;
        if (radioDeepSleep) {
            tempColorKey = 'x';
            tempInvertLcd = 0;
        } else {
            tempColorKey = currentColorKey;
            tempInvertLcd = invertLcd;
        }
        startLcdAnimation();
        autoReconnecting = false;
        userDisconnected = false;
        updateConnectionButtonState('connected');
        updateKeyboardState();
        resetRfLogPanel();

        firstFrameAfterReconnect = true;
        updateStatus(radioDeepSleep ? t('connected_deep_sleep') : t('reconnecting'));

        keepaliveInterval = setInterval(sendKeepalive, KEEPALIVE_INTERVAL_MS);
        readFrames(++serialSession);
        viewerSerial.setState('connected', { reason: 'auto-reconnect' });

    } catch (error) {
        console.error('Auto-reconnect failed:', error);
        await closeSerialResources();
    } finally {
        reconnectInProgress = false;
    }
}

if ('serial' in navigator) {
    navigator.serial.addEventListener('connect', async (event) => {
        if (isConnected && lastPortInfo) {
            const info = event.target.getInfo();
            if (info.usbVendorId === lastPortInfo.usbVendorId &&
                info.usbProductId === lastPortInfo.usbProductId) {
                await handleHardwareDisconnect();
            }
        }
        await reconnectPort(event.target);
    });
}

// ─────────────────────────────────────────────────────────────

initKeyboard();
updateKeyboardState();
})();
