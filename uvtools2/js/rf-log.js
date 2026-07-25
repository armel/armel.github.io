// RF Log protocol and CSV helpers shared by the Web Serial UI and tests.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVTOOLS_RF_LOG = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const TYPE_RF_LOG = 0x05;
  const TYPE_RF_LOG_HISTORY = 0x06;
  const FEATURE_RF_LOG = 0x01;
  const FEATURE_RF_LOG_HISTORY = 0x02;
  const FEATURE_RF_LOG_RESTART = 0x80;
  const PACKET_VERSION = 2;
  const CHANNEL_NAME_LENGTH = 10;
  const ROW_SIZE = 15 + CHANNEL_NAME_LENGTH;
  const ROW_COUNT = 64;
  const VISIBLE_TRAFFIC_COUNT = 512;
  const STATUS_PACKET_SIZE = 4;
  const PACKET_SIZE = STATUS_PACKET_SIZE + (ROW_SIZE * (ROW_COUNT + 1));
  const HISTORY_PACKET_SIZE = ROW_SIZE * ROW_COUNT;
  const STATUS_HAS_TRAFFIC = 1 << 1;
  const STATUS_DISABLED = 1 << 3;
  const FLAG_TX = 1 << 0;
  const FLAG_SESSION = 1 << 3;
  const CHANNEL_NONE = 0xFFFF;
  const BATT_UNKNOWN = 0xFF;
  const BATT_OFFSET = 600;
  const POWER_LABELS = ['USER', 'LOW1', 'LOW2', 'LOW3', 'LOW4', 'LOW5', 'MID', 'HIGH'];
  const MAX_VIEWER_FRAME_SIZE = 8192;

  function protocolError(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  // Extract one AA 55 framed K5Viewer packet from a mutable byte array.
  // Unrelated display frames are returned too so the caller can discard them.
  function takeViewerFrame(buffer) {
    while (buffer.length >= 2) {
      let header = -1;
      for (let i = 0; i < buffer.length - 1; i++) {
        if (buffer[i] === 0xAA && buffer[i + 1] === 0x55) {
          header = i;
          break;
        }
      }

      if (header < 0) {
        const keepTrailingHeaderByte = buffer[buffer.length - 1] === 0xAA;
        buffer.splice(0, buffer.length - (keepTrailingHeaderByte ? 1 : 0));
        return null;
      }

      if (header > 0) buffer.splice(0, header);
      if (buffer.length < 5) return null;

      const type = buffer[2];
      const size = (buffer[3] << 8) | buffer[4];
      if (size > MAX_VIEWER_FRAME_SIZE) {
        buffer.shift();
        continue;
      }

      const totalSize = 5 + size + 1;
      if (buffer.length < totalSize) return null;
      if (buffer[totalSize - 1] !== 0x0A) {
        buffer.shift();
        continue;
      }

      const payload = new Uint8Array(buffer.slice(5, 5 + size));
      buffer.splice(0, totalSize);
      return { type, payload };
    }

    return null;
  }

  function parseChannelName(view, offset) {
    let name = '';
    const nameOffset = offset + 15;
    for (let i = 0; i < CHANNEL_NAME_LENGTH; i++) {
      const code = view.getUint8(nameOffset + i);
      if (code === 0) break;
      if (code >= 32 && code <= 126) name += String.fromCharCode(code);
    }
    return name.trim();
  }

  function parseRow(view, offset) {
    return {
      frequency: view.getUint32(offset, true),
      sequence: view.getUint32(offset + 4, true),
      durationSeconds: view.getUint16(offset + 8, true),
      channel: view.getUint16(offset + 10, true),
      flags: view.getUint8(offset + 12),
      meter: view.getUint8(offset + 13),
      battVolt: view.getUint8(offset + 14),
      channelName: parseChannelName(view, offset)
    };
  }

  function isStoredRow(row) {
    return row.frequency > 0 || (row.flags & FLAG_SESSION) !== 0;
  }

  function parseMainPacket(payload) {
    if (payload.length !== PACKET_SIZE && payload.length !== STATUS_PACKET_SIZE) {
      throw protocolError('RF_LOG_PACKET_SIZE', 'Unexpected RF Log packet size');
    }

    const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
    const version = view.getUint8(0);
    if (version !== PACKET_VERSION) {
      throw protocolError('RF_LOG_VERSION', `Unsupported RF Log packet version ${version}`);
    }

    const statusFlags = view.getUint8(1);
    const result = {
      version,
      statusFlags,
      disabled: (statusFlags & STATUS_DISABLED) !== 0,
      hasTraffic: (statusFlags & STATUS_HAS_TRAFFIC) !== 0,
      full: payload.length === PACKET_SIZE,
      rows: []
    };
    if (!result.full) return result;

    const rowCount = Math.min(view.getUint8(2), ROW_COUNT);
    let offset = STATUS_PACKET_SIZE + ROW_SIZE; // Skip the non-persistent live row.
    for (let i = 0; i < rowCount; i++, offset += ROW_SIZE) {
      const row = parseRow(view, offset);
      if (isStoredRow(row)) result.rows.push(row);
    }
    return result;
  }

  function parseHistoryPacket(payload) {
    if (payload.length !== HISTORY_PACKET_SIZE) {
      throw protocolError('RF_LOG_HISTORY_SIZE', 'Unexpected RF Log history packet size');
    }

    const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
    const rows = [];
    for (let i = 0, offset = 0; i < ROW_COUNT; i++, offset += ROW_SIZE) {
      const row = parseRow(view, offset);
      if (isStoredRow(row)) rows.push(row);
    }
    return rows;
  }

  function mergeRows(target, rows) {
    rows.forEach(row => target.set(row.sequence, row));
  }

  // Match K5Viewer's visible-window semantics: 512 traffic entries plus the
  // power-on markers that fall inside the same sequence window.
  function limitVisibleRows(rows) {
    const sorted = Array.from(rows).sort((a, b) => b.sequence - a.sequence);
    const traffic = sorted
      .filter(row => (row.flags & FLAG_SESSION) === 0)
      .slice(0, VISIBLE_TRAFFIC_COUNT);
    if (traffic.length === 0) return [];

    const oldestTrafficSequence = traffic[traffic.length - 1].sequence;
    return sorted.filter(row =>
      (row.flags & FLAG_SESSION) === 0
        ? row.sequence >= oldestTrafficSequence
        : row.sequence > oldestTrafficSequence
    );
  }

  function formatMeter(row) {
    if (row.meter === 0xFF) return '';
    if ((row.flags & FLAG_TX) !== 0) {
      return POWER_LABELS[row.meter] || `P${row.meter}`;
    }

    const meter = Math.max(1, row.meter);
    return meter > 9 ? `S9+${String(meter - 9).padStart(2, '0')}` : `S${meter}`;
  }

  function spreadsheetSafe(value) {
    const text = String(value ?? '');
    return /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  }

  function csvCell(value) {
    const text = spreadsheetSafe(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function rowsToCsv(rows) {
    const headers = [
      'sequence',
      'event',
      'frequency_mhz',
      'frequency_10hz',
      'duration_seconds',
      'channel',
      'channel_name',
      'signal_or_power',
      'battery_volts'
    ];

    const lines = [headers.join(',')];
    Array.from(rows)
      .sort((a, b) => a.sequence - b.sequence)
      .forEach(row => {
        const session = (row.flags & FLAG_SESSION) !== 0;
        const values = [
          row.sequence,
          session ? 'POWER_ON' : ((row.flags & FLAG_TX) !== 0 ? 'TX' : 'RX'),
          session || !row.frequency ? '' : (row.frequency / 100000).toFixed(5),
          session ? '' : row.frequency,
          session ? '' : row.durationSeconds,
          session || row.channel === CHANNEL_NONE ? '' : row.channel + 1,
          session ? '' : row.channelName,
          session ? '' : formatMeter(row),
          session || row.battVolt === BATT_UNKNOWN
            ? ''
            : ((BATT_OFFSET + row.battVolt) / 100).toFixed(2)
        ];
        lines.push(values.map(csvCell).join(','));
      });

    // UTF-8 BOM makes accented channel names open correctly in desktop Excel.
    return '\uFEFF' + lines.join('\r\n') + '\r\n';
  }

  function featureKeepalive(restart) {
    let features = FEATURE_RF_LOG | FEATURE_RF_LOG_HISTORY;
    if (restart) features |= FEATURE_RF_LOG_RESTART;
    return new Uint8Array([0x55, 0xAA, TYPE_RF_LOG, features]);
  }

  return {
    TYPE_RF_LOG,
    TYPE_RF_LOG_HISTORY,
    ROW_COUNT,
    VISIBLE_TRAFFIC_COUNT,
    STATUS_DISABLED,
    FLAG_SESSION,
    PACKET_SIZE,
    HISTORY_PACKET_SIZE,
    takeViewerFrame,
    parseMainPacket,
    parseHistoryPacket,
    mergeRows,
    limitVisibleRows,
    rowsToCsv,
    featureKeepalive
  };
});
