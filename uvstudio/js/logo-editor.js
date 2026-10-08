// Pure 128x64 boot-logo editing primitives shared by UV Studio and Node tests.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVStudioLogoEditor = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const WIDTH = 128;
  const HEIGHT = 64;
  const BITMAP_SIZE = 1024;
  const LOGO_MAGIC_TEXT = 'F4HWNLGO';
  const LOGO_MAGIC = Uint8Array.from(LOGO_MAGIC_TEXT, character => character.charCodeAt(0));

  function encodeLogoFile(bitmap) {
    if (!bitmap || bitmap.length !== BITMAP_SIZE) {
      throw new RangeError('Expected 1024 logo bitmap bytes');
    }
    const file = new Uint8Array(LOGO_MAGIC.length + BITMAP_SIZE);
    file.set(LOGO_MAGIC);
    file.set(bitmap, LOGO_MAGIC.length);
    return file;
  }

  function decodeLogoFile(data) {
    const bytes = data instanceof Uint8Array
      ? data
      : ArrayBuffer.isView(data)
        ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
        : data instanceof ArrayBuffer
          ? new Uint8Array(data)
          : null;
    if (!bytes || (bytes.length !== BITMAP_SIZE && bytes.length !== BITMAP_SIZE + LOGO_MAGIC.length)) {
      throw new RangeError('Expected a 1024 or 1032 byte logo file');
    }
    if (bytes.length === BITMAP_SIZE) return bytes.slice();
    for (let i = 0; i < LOGO_MAGIC.length; i++) {
      if (bytes[i] !== LOGO_MAGIC[i]) {
        throw new Error(`Invalid logo header; expected ${LOGO_MAGIC_TEXT}`);
      }
    }
    return bytes.slice(LOGO_MAGIC.length);
  }

  function createLogoFileLoader(options = {}) {
    if (typeof options.decodeImage !== 'function') {
      throw new TypeError('Expected an image decoder');
    }
    const onStart = typeof options.onStart === 'function' ? options.onStart : function () {};
    const onSuccess = typeof options.onSuccess === 'function' ? options.onSuccess : function () {};
    const onError = typeof options.onError === 'function' ? options.onError : function () {};
    let revision = 0;

    async function load(file) {
      const currentRevision = ++revision;
      const kind = /\.bin$/i.test(file.name) ? 'bitmap' : 'image';
      onStart(file, kind);
      try {
        const source = kind === 'bitmap'
          ? { kind, bitmap: decodeLogoFile(new Uint8Array(await file.arrayBuffer())) }
          : { kind, image: await options.decodeImage(file) };
        if (currentRevision !== revision) return false;
        onSuccess(source, file);
        return true;
      } catch (error) {
        if (currentRevision !== revision) return false;
        onError(error, file, kind);
        return false;
      }
    }

    return { load };
  }

  function pixelsToBitmap(pixels) {
    if (!pixels || pixels.length !== WIDTH * HEIGHT) {
      throw new RangeError('Expected 8192 logo pixels');
    }
    const bitmap = new Uint8Array(BITMAP_SIZE);
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (pixels[(y * WIDTH) + x]) {
          bitmap[(Math.floor(y / 8) * WIDTH) + x] |= 1 << (y % 8);
        }
      }
    }
    return bitmap;
  }

  function bitmapToPixels(bitmap) {
    if (!bitmap || bitmap.length !== BITMAP_SIZE) {
      throw new RangeError('Expected 1024 logo bitmap bytes');
    }
    const pixels = new Uint8Array(WIDTH * HEIGHT);
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const byte = bitmap[(Math.floor(y / 8) * WIDTH) + x];
        pixels[(y * WIDTH) + x] = (byte >> (y % 8)) & 1;
      }
    }
    return pixels;
  }

  function createModel(options = {}) {
    const pixels = new Uint8Array(WIDTH * HEIGHT);
    const sourcePixels = new Uint8Array(WIDTH * HEIGHT);
    const overrides = new Int8Array(WIDTH * HEIGHT);
    overrides.fill(-1);
    const historyLimit = Math.max(1, Number(options.historyLimit) || 50);
    const undoStack = [];
    const redoStack = [];
    let actionBase = null;
    let actionManual = false;

    function inBounds(x, y) {
      return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
    }

    function rawSetPixel(x, y, on) {
      x = Math.round(x);
      y = Math.round(y);
      if (!inBounds(x, y)) return;
      const index = (y * WIDTH) + x;
      const value = on ? 1 : 0;
      pixels[index] = value;
      if (actionManual) overrides[index] = value;
      else sourcePixels[index] = value;
    }

    function snapshot() {
      return {
        pixels: pixels.slice(),
        sourcePixels: sourcePixels.slice(),
        overrides: overrides.slice()
      };
    }

    function restoreSnapshot(state) {
      pixels.set(state.pixels);
      sourcePixels.set(state.sourcePixels);
      overrides.set(state.overrides);
    }

    function beginAction(options = {}) {
      if (actionBase) return false;
      actionBase = snapshot();
      actionManual = options.manual === true;
      return true;
    }

    function samePixels(left, right) {
      for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) return false;
      }
      return true;
    }

    function sameState(left, right) {
      return samePixels(left.pixels, right.pixels)
        && samePixels(left.sourcePixels, right.sourcePixels)
        && samePixels(left.overrides, right.overrides);
    }

    function commitAction() {
      if (!actionBase) return false;
      const before = actionBase;
      actionBase = null;
      actionManual = false;
      if (sameState(before, snapshot())) return false;
      undoStack.push(before);
      if (undoStack.length > historyLimit) undoStack.shift();
      redoStack.length = 0;
      return true;
    }

    function restoreAction() {
      if (!actionBase) return false;
      restoreSnapshot(actionBase);
      return true;
    }

    function mutate(callback, options = {}) {
      const ownsAction = !actionBase;
      if (ownsAction) beginAction(options);
      callback();
      if (ownsAction) commitAction();
    }

    function setPixel(x, y, on) {
      mutate(() => rawSetPixel(x, y, on));
    }

    function getPixel(x, y) {
      x = Math.round(x);
      y = Math.round(y);
      return inBounds(x, y) ? pixels[(y * WIDTH) + x] === 1 : false;
    }

    function normalizeStrokeWidth(strokeWidth) {
      return Math.max(1, Math.min(8, Math.round(Number(strokeWidth) || 1)));
    }

    function rawStamp(x, y, on, strokeWidth) {
      const width = normalizeStrokeWidth(strokeWidth);
      const firstOffset = -Math.floor(width / 2);
      const lastOffset = firstOffset + width - 1;
      for (let offsetY = firstOffset; offsetY <= lastOffset; offsetY++) {
        for (let offsetX = firstOffset; offsetX <= lastOffset; offsetX++) {
          rawSetPixel(x + offsetX, y + offsetY, on);
        }
      }
    }

    function rawDrawLine(x0, y0, x1, y1, on, strokeWidth = 1) {
      x0 = Math.round(x0);
      y0 = Math.round(y0);
      x1 = Math.round(x1);
      y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0);
      const sx = x0 < x1 ? 1 : -1;
      const dy = -Math.abs(y1 - y0);
      const sy = y0 < y1 ? 1 : -1;
      let error = dx + dy;
      while (true) {
        rawStamp(x0, y0, on, strokeWidth);
        if (x0 === x1 && y0 === y1) break;
        const twiceError = error * 2;
        if (twiceError >= dy) {
          error += dy;
          x0 += sx;
        }
        if (twiceError <= dx) {
          error += dx;
          y0 += sy;
        }
      }
    }

    function drawLine(x0, y0, x1, y1, on, strokeWidth = 1) {
      mutate(() => rawDrawLine(x0, y0, x1, y1, on, strokeWidth));
    }

    function drawRectangle(x0, y0, x1, y1, on, strokeWidth = 1) {
      const left = Math.min(Math.round(x0), Math.round(x1));
      const right = Math.max(Math.round(x0), Math.round(x1));
      const top = Math.min(Math.round(y0), Math.round(y1));
      const bottom = Math.max(Math.round(y0), Math.round(y1));
      mutate(() => {
        rawDrawLine(left, top, right, top, on, strokeWidth);
        rawDrawLine(right, top, right, bottom, on, strokeWidth);
        rawDrawLine(right, bottom, left, bottom, on, strokeWidth);
        rawDrawLine(left, bottom, left, top, on, strokeWidth);
      });
    }

    function drawEllipse(x0, y0, x1, y1, on, strokeWidth = 1) {
      const left = Math.min(Math.round(x0), Math.round(x1));
      const right = Math.max(Math.round(x0), Math.round(x1));
      const top = Math.min(Math.round(y0), Math.round(y1));
      const bottom = Math.max(Math.round(y0), Math.round(y1));
      mutate(() => {
        if (left === right || top === bottom) {
          rawDrawLine(left, top, right, bottom, on, strokeWidth);
          return;
        }
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;
        const radiusX = (right - left) / 2;
        const radiusY = (bottom - top) / 2;
        let steps = Math.max(16, Math.ceil(Math.PI * 4 * Math.max(radiusX, radiusY)));
        steps += (4 - (steps % 4)) % 4;
        let previousX = right;
        let previousY = Math.round(centerY);
        for (let step = 1; step <= steps; step++) {
          const angle = (Math.PI * 2 * step) / steps;
          const nextX = Math.round(centerX + radiusX * Math.cos(angle));
          const nextY = Math.round(centerY + radiusY * Math.sin(angle));
          rawDrawLine(previousX, previousY, nextX, nextY, on, strokeWidth);
          previousX = nextX;
          previousY = nextY;
        }
      });
    }

    function floodFill(startX, startY, on) {
      startX = Math.round(startX);
      startY = Math.round(startY);
      if (!inBounds(startX, startY)) return;
      const replacement = on ? 1 : 0;
      const startIndex = (startY * WIDTH) + startX;
      const target = pixels[startIndex];
      if (target === replacement) return;

      mutate(() => {
        const queue = new Int32Array(WIDTH * HEIGHT);
        let head = 0;
        let tail = 0;
        queue[tail++] = startIndex;
        rawSetPixel(startX, startY, on);
        while (head < tail) {
          const index = queue[head++];
          const x = index % WIDTH;
          const y = Math.floor(index / WIDTH);
          const neighbours = [
            x > 0 ? index - 1 : -1,
            x + 1 < WIDTH ? index + 1 : -1,
            y > 0 ? index - WIDTH : -1,
            y + 1 < HEIGHT ? index + WIDTH : -1
          ];
          for (const next of neighbours) {
            if (next >= 0 && pixels[next] === target) {
              rawSetPixel(next % WIDTH, Math.floor(next / WIDTH), on);
              queue[tail++] = next;
            }
          }
        }
      });
    }

    function canUndo() {
      return undoStack.length > 0;
    }

    function canRedo() {
      return redoStack.length > 0;
    }

    function undo() {
      if (!canUndo() || actionBase) return false;
      redoStack.push(snapshot());
      restoreSnapshot(undoStack.pop());
      return true;
    }

    function redo() {
      if (!canRedo() || actionBase) return false;
      undoStack.push(snapshot());
      restoreSnapshot(redoStack.pop());
      return true;
    }

    function loadBitmap(bitmap) {
      const nextPixels = bitmapToPixels(bitmap);
      mutate(() => {
        sourcePixels.set(nextPixels);
        overrides.fill(-1);
        pixels.set(nextPixels);
      });
    }

    function loadSourceBitmap(bitmap) {
      loadBitmap(bitmap);
    }

    function rebaseSourceBitmap(bitmap) {
      const nextPixels = bitmapToPixels(bitmap);
      mutate(() => {
        sourcePixels.set(nextPixels);
        for (let index = 0; index < pixels.length; index++) {
          pixels[index] = overrides[index] < 0 ? sourcePixels[index] : overrides[index];
        }
      });
    }

    function toBitmap() {
      return pixelsToBitmap(pixels);
    }

    function invert() {
      mutate(() => {
        for (let i = 0; i < pixels.length; i++) sourcePixels[i] = pixels[i] ? 0 : 1;
        overrides.fill(-1);
        pixels.set(sourcePixels);
      });
    }

    function clear() {
      mutate(() => {
        for (let y = 0; y < HEIGHT; y++) {
          for (let x = 0; x < WIDTH; x++) rawSetPixel(x, y, false);
        }
      });
    }

    return {
      getPixel,
      setPixel,
      drawLine,
      drawRectangle,
      drawEllipse,
      floodFill,
      beginAction,
      commitAction,
      restoreAction,
      canUndo,
      canRedo,
      undo,
      redo,
      loadBitmap,
      loadSourceBitmap,
      rebaseSourceBitmap,
      toBitmap,
      invert,
      clear
    };
  }

  function createInteraction(model, onChange = function () {}) {
    const tools = new Set(['pencil', 'eraser', 'line', 'rectangle', 'ellipse', 'fill']);
    let tool = 'pencil';
    let active = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let strokeWidth = 1;

    function setTool(nextTool) {
      if (!tools.has(nextTool)) throw new RangeError(`Unknown logo tool: ${nextTool}`);
      tool = nextTool;
    }

    function setStrokeWidth(nextStrokeWidth) {
      strokeWidth = Math.max(1, Math.min(8, Math.round(Number(nextStrokeWidth) || 1)));
    }

    function pointerDown(x, y) {
      if (tool === 'fill') {
        model.beginAction({ manual: true });
        model.floodFill(x, y, true);
        model.commitAction();
        onChange();
        return;
      }
      active = true;
      startX = lastX = x;
      startY = lastY = y;
      model.beginAction({ manual: true });
      if (tool === 'pencil' || tool === 'eraser') {
        model.drawLine(x, y, x, y, tool === 'pencil', strokeWidth);
        onChange();
      }
    }

    function ellipseEndPoint(x, y, options) {
      if (!options?.constrain) return { x, y };
      const deltaX = Math.round(x) - Math.round(startX);
      const deltaY = Math.round(y) - Math.round(startY);
      const size = Math.min(Math.abs(deltaX), Math.abs(deltaY));
      return {
        x: Math.round(startX) + (deltaX < 0 ? -size : size),
        y: Math.round(startY) + (deltaY < 0 ? -size : size)
      };
    }

    function drawShape(x, y, options) {
      if (tool === 'line') model.drawLine(startX, startY, x, y, true, strokeWidth);
      else if (tool === 'rectangle') model.drawRectangle(startX, startY, x, y, true, strokeWidth);
      else if (tool === 'ellipse') {
        const end = ellipseEndPoint(x, y, options);
        model.drawEllipse(startX, startY, end.x, end.y, true, strokeWidth);
      }
    }

    function pointerMove(x, y, options = {}) {
      if (!active) return;
      if (tool === 'pencil' || tool === 'eraser') {
        model.drawLine(lastX, lastY, x, y, tool === 'pencil', strokeWidth);
        lastX = x;
        lastY = y;
        onChange();
      } else if (tool === 'line' || tool === 'rectangle' || tool === 'ellipse') {
        model.restoreAction();
        drawShape(x, y, options);
        onChange();
      }
    }

    function pointerUp(x, y, options = {}) {
      if (!active) return;
      if (tool === 'pencil' || tool === 'eraser') {
        model.drawLine(lastX, lastY, x, y, tool === 'pencil', strokeWidth);
      } else if (tool === 'line' || tool === 'rectangle' || tool === 'ellipse') {
        model.restoreAction();
        drawShape(x, y, options);
      }
      active = false;
      model.commitAction();
      onChange();
    }

    return { setTool, setStrokeWidth, pointerDown, pointerMove, pointerUp };
  }

  return {
    WIDTH,
    HEIGHT,
    BITMAP_SIZE,
    LOGO_MAGIC,
    encodeLogoFile,
    decodeLogoFile,
    createLogoFileLoader,
    pixelsToBitmap,
    bitmapToPixels,
    createModel,
    createInteraction
  };
});
