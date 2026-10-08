'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const logoEditor = require('../js/logo-editor.js');

test('packs edited pixels into the radio native bitmap layout', () => {
  const pixels = new Uint8Array(128 * 64);
  pixels[0] = 1;                       // x=0, y=0
  pixels[7 * 128] = 1;               // x=0, y=7
  pixels[8 * 128] = 1;               // x=0, y=8
  pixels[(63 * 128) + 127] = 1;      // x=127, y=63

  const bitmap = logoEditor.pixelsToBitmap(pixels);

  assert.equal(bitmap.length, 1024);
  assert.equal(bitmap[0], 0x81);
  assert.equal(bitmap[128], 0x01);
  assert.equal(bitmap[1023], 0x80);
});

test('unpacks the radio native bitmap layout into editable pixels', () => {
  assert.equal(typeof logoEditor.bitmapToPixels, 'function');
  const bitmap = new Uint8Array(1024);
  bitmap[0] = 0x81;
  bitmap[128] = 0x01;
  bitmap[1023] = 0x80;

  const pixels = logoEditor.bitmapToPixels(bitmap);

  assert.equal(pixels[0], 1);
  assert.equal(pixels[7 * 128], 1);
  assert.equal(pixels[8 * 128], 1);
  assert.equal(pixels[(63 * 128) + 127], 1);
  assert.equal(pixels[1], 0);
});

test('draws a one-pixel Bresenham line including both endpoints', () => {
  assert.equal(typeof logoEditor.createModel, 'function');
  const model = logoEditor.createModel();

  model.drawLine(1, 1, 4, 4, true);

  assert.deepEqual(
    [[1, 1], [2, 2], [3, 3], [4, 4]].map(([x, y]) => model.getPixel(x, y)),
    [true, true, true, true]
  );
  assert.equal(model.getPixel(2, 1), false);
});

test('draws thick strokes for lines, rectangles and ellipses', () => {
  const line = logoEditor.createModel();
  line.drawLine(4, 4, 8, 4, true, 3);
  assert.equal(line.getPixel(6, 3), true);
  assert.equal(line.getPixel(6, 4), true);
  assert.equal(line.getPixel(6, 5), true);
  assert.equal(line.getPixel(6, 2), false);

  const rectangle = logoEditor.createModel();
  rectangle.drawRectangle(10, 10, 16, 16, true, 3);
  assert.equal(rectangle.getPixel(13, 9), true);
  assert.equal(rectangle.getPixel(13, 10), true);
  assert.equal(rectangle.getPixel(13, 11), true);
  assert.equal(rectangle.getPixel(13, 13), false);

  const ellipse = logoEditor.createModel();
  ellipse.drawEllipse(20, 20, 30, 26, true, 3);
  assert.equal(ellipse.getPixel(25, 19), true);
  assert.equal(ellipse.getPixel(25, 20), true);
  assert.equal(ellipse.getPixel(25, 21), true);
  assert.equal(ellipse.getPixel(25, 23), false);
});

test('draws an outline rectangle without filling its interior', () => {
  const model = logoEditor.createModel();

  model.drawRectangle(2, 3, 5, 6, true);

  assert.equal(model.getPixel(2, 3), true);
  assert.equal(model.getPixel(5, 6), true);
  assert.equal(model.getPixel(3, 3), true);
  assert.equal(model.getPixel(2, 5), true);
  assert.equal(model.getPixel(3, 4), false);
});

test('draws an outline ellipse through each side of its bounding box', () => {
  const model = logoEditor.createModel();

  model.drawEllipse(2, 3, 8, 7, true);

  assert.equal(model.getPixel(5, 3), true);
  assert.equal(model.getPixel(8, 5), true);
  assert.equal(model.getPixel(5, 7), true);
  assert.equal(model.getPixel(2, 5), true);
  assert.equal(model.getPixel(5, 5), false);
});

test('flood fill stays inside a closed boundary', () => {
  const model = logoEditor.createModel();
  model.drawRectangle(1, 1, 5, 5, true);

  model.floodFill(3, 3, true);

  assert.equal(model.getPixel(3, 3), true);
  assert.equal(model.getPixel(2, 4), true);
  assert.equal(model.getPixel(0, 0), false);
  assert.equal(model.getPixel(6, 3), false);
});

test('groups a drag gesture into one undoable action and restores it with redo', () => {
  const model = logoEditor.createModel();
  model.beginAction();
  model.drawLine(1, 1, 4, 1, true);
  model.drawLine(4, 1, 4, 4, true);
  model.commitAction();

  assert.equal(model.getPixel(4, 4), true);
  assert.equal(model.canUndo(), true);
  assert.equal(model.undo(), true);
  assert.equal(model.getPixel(1, 1), false);
  assert.equal(model.getPixel(4, 4), false);
  assert.equal(model.canRedo(), true);
  assert.equal(model.redo(), true);
  assert.equal(model.getPixel(1, 1), true);
  assert.equal(model.getPixel(4, 4), true);
});

test('imports a native bitmap as an undoable editor state', () => {
  const model = logoEditor.createModel();
  const bitmap = new Uint8Array(1024);
  bitmap[0] = 0x05;

  model.loadBitmap(bitmap);

  assert.equal(model.getPixel(0, 0), true);
  assert.equal(model.getPixel(0, 1), false);
  assert.equal(model.getPixel(0, 2), true);
  assert.deepEqual(model.toBitmap(), bitmap);
  model.undo();
  assert.equal(model.getPixel(0, 0), false);
  assert.equal(model.getPixel(0, 2), false);
});

test('inverts the entire canvas as one undoable action', () => {
  const model = logoEditor.createModel();
  model.setPixel(0, 0, true);

  model.invert();

  assert.equal(model.getPixel(0, 0), false);
  assert.equal(model.getPixel(1, 0), true);
  assert.equal(model.getPixel(127, 63), true);
  model.undo();
  assert.equal(model.getPixel(0, 0), true);
  assert.equal(model.getPixel(1, 0), false);
});

test('clears every pixel as one undoable action', () => {
  const model = logoEditor.createModel();
  model.drawLine(0, 0, 127, 63, true);

  model.clear();

  assert.equal(model.getPixel(0, 0), false);
  assert.equal(model.getPixel(127, 63), false);
  model.undo();
  assert.equal(model.getPixel(0, 0), true);
  assert.equal(model.getPixel(127, 63), true);
});

test('turns a pencil drag into one continuous undoable gesture', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);

  interaction.pointerDown(1, 2);
  interaction.pointerMove(4, 2);
  interaction.pointerUp(4, 4);

  assert.equal(model.getPixel(1, 2), true);
  assert.equal(model.getPixel(4, 2), true);
  assert.equal(model.getPixel(4, 4), true);
  model.undo();
  assert.equal(model.getPixel(1, 2), false);
  assert.equal(model.getPixel(4, 4), false);
});

test('applies the selected stroke width to pencil and eraser gestures', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  interaction.setStrokeWidth(3);

  interaction.pointerDown(5, 5);
  interaction.pointerUp(7, 5);
  assert.equal(model.getPixel(6, 4), true);
  assert.equal(model.getPixel(6, 5), true);
  assert.equal(model.getPixel(6, 6), true);

  interaction.setTool('eraser');
  interaction.pointerDown(6, 5);
  interaction.pointerUp(6, 5);
  assert.equal(model.getPixel(6, 4), false);
  assert.equal(model.getPixel(6, 5), false);
  assert.equal(model.getPixel(6, 6), false);
});

test('preserves explicit pencil and eraser edits when the source bitmap changes', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  const firstSource = new Uint8Array(1024);
  firstSource[0] = 0x01;
  model.loadSourceBitmap(firstSource);

  interaction.pointerDown(0, 0);
  interaction.pointerUp(0, 0);
  interaction.setTool('eraser');
  interaction.pointerDown(1, 0);
  interaction.pointerUp(1, 0);

  const nextSource = new Uint8Array(1024);
  nextSource[1] = 0x01;
  nextSource[2] = 0x01;
  model.rebaseSourceBitmap(nextSource);

  assert.equal(model.getPixel(0, 0), true);
  assert.equal(model.getPixel(1, 0), false);
  assert.equal(model.getPixel(2, 0), true);
  model.undo();
  assert.equal(model.getPixel(0, 0), true);
  assert.equal(model.getPixel(1, 0), false);
  assert.equal(model.getPixel(2, 0), false);
});

test('applies eraser, line, rectangle and fill tools through the same interaction', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  model.drawRectangle(1, 1, 6, 6, true);

  interaction.setTool('fill');
  interaction.pointerDown(3, 3);
  assert.equal(model.getPixel(3, 3), true);

  interaction.setTool('eraser');
  interaction.pointerDown(1, 1);
  interaction.pointerUp(1, 1);
  assert.equal(model.getPixel(1, 1), false);

  interaction.setTool('line');
  interaction.pointerDown(10, 10);
  interaction.pointerUp(12, 10);
  assert.equal(model.getPixel(11, 10), true);

  interaction.setTool('rectangle');
  interaction.pointerDown(20, 20);
  interaction.pointerUp(22, 22);
  assert.equal(model.getPixel(21, 20), true);
  assert.equal(model.getPixel(21, 21), false);
});

test('previews a line while dragging and commits only the final endpoint', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  interaction.setTool('line');

  interaction.pointerDown(1, 1);
  interaction.pointerMove(4, 1);
  assert.equal(model.getPixel(3, 1), true);
  assert.equal(model.canUndo(), false);

  interaction.pointerMove(1, 4);
  assert.equal(model.getPixel(3, 1), false);
  assert.equal(model.getPixel(1, 3), true);

  interaction.pointerUp(1, 4);
  assert.equal(model.canUndo(), true);
  model.undo();
  assert.equal(model.getPixel(1, 3), false);
});

test('previews a rectangle while dragging without leaving stale edges', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  interaction.setTool('rectangle');

  interaction.pointerDown(10, 10);
  interaction.pointerMove(14, 14);
  assert.equal(model.getPixel(14, 12), true);

  interaction.pointerMove(12, 12);
  assert.equal(model.getPixel(14, 12), false);
  assert.equal(model.getPixel(12, 11), true);

  interaction.pointerUp(12, 12);
  assert.equal(model.canUndo(), true);
});

test('previews an ellipse and constrains it to a circle while Shift is held', () => {
  const model = logoEditor.createModel();
  const interaction = logoEditor.createInteraction(model);
  interaction.setTool('ellipse');

  interaction.pointerDown(10, 10);
  interaction.pointerMove(18, 14);
  assert.equal(model.getPixel(18, 12), true);
  assert.equal(model.canUndo(), false);

  interaction.pointerMove(18, 14, { constrain: true });
  assert.equal(model.getPixel(18, 12), false);
  assert.equal(model.getPixel(14, 12), true);

  interaction.pointerUp(18, 14, { constrain: true });
  assert.equal(model.canUndo(), true);
  model.undo();
  assert.equal(model.getPixel(14, 12), false);
});

test('encodes a device-ready 1032-byte logo file with its magic header', () => {
  const bitmap = new Uint8Array(1024);
  bitmap[0] = 0x81;
  bitmap[1023] = 0x40;

  const file = logoEditor.encodeLogoFile(bitmap);

  assert.equal(file.length, 1032);
  assert.deepEqual(Array.from(file.slice(0, 8)), [70, 52, 72, 87, 78, 76, 71, 79]);
  assert.equal(file[8], 0x81);
  assert.equal(file[1031], 0x40);
});

test('decodes device-ready and headerless logo files', () => {
  const bitmap = new Uint8Array(1024);
  bitmap[12] = 0x55;
  const encoded = new Uint8Array(1032);
  encoded.set([70, 52, 72, 87, 78, 76, 71, 79]);
  encoded.set(bitmap, 8);

  assert.deepEqual(logoEditor.decodeLogoFile(encoded), bitmap);
  assert.deepEqual(logoEditor.decodeLogoFile(bitmap), bitmap);
});

test('rejects binary logo files with an invalid size or magic header', () => {
  assert.throws(() => logoEditor.decodeLogoFile(new Uint8Array(1000)), /1024 or 1032/);
  assert.throws(() => logoEditor.decodeLogoFile(new Uint8Array(1032)), /F4HWNLGO/);
});

test('clears the previous upload payload before reporting an invalid file', async () => {
  let payload = 'previous-logo';
  const errors = [];
  const loader = logoEditor.createLogoFileLoader({
    decodeImage: async () => ({ tag: 'image' }),
    onStart: () => { payload = null; },
    onSuccess: source => { payload = source; },
    onError: error => { errors.push(error.message); }
  });

  const loaded = await loader.load({
    name: 'invalid.bin',
    arrayBuffer: async () => new ArrayBuffer(1000)
  });

  assert.equal(loaded, false);
  assert.equal(payload, null);
  assert.deepEqual(errors, ['Expected a 1024 or 1032 byte logo file']);
});

test('ignores an older file that finishes decoding after a newer selection', async () => {
  let finishFirst;
  const accepted = [];
  const loader = logoEditor.createLogoFileLoader({
    decodeImage: file => file.name === 'first.png'
      ? new Promise(resolve => { finishFirst = resolve; })
      : Promise.resolve({ tag: file.name }),
    onStart: () => {},
    onSuccess: (source, file) => { accepted.push([file.name, source.image.tag]); },
    onError: error => { throw error; }
  });

  const firstLoad = loader.load({ name: 'first.png' });
  const secondLoad = loader.load({ name: 'second.png' });
  assert.equal(await secondLoad, true);
  finishFirst({ tag: 'first.png' });
  assert.equal(await firstLoad, false);

  assert.deepEqual(accepted, [['second.png', 'second.png']]);
});
