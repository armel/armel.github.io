// "Propose an app to the community": checks a .app the way the radio's loader
// does, captures its screen from the radio while it runs, shows the card
// as the catalog will draw it, then opens a GitHub issue of the community
// repository already written: the author only clicks Create there. The issue
// is the one the repository's submission form makes, with the app and the
// screen inline, so its submission check reads both alike.
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.UVStudioAppSubmit = api;

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => api.boot());
    } else {
      api.boot();
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SUBMIT_REPO = 'armel/fusion-community';
  const NEW_ISSUE_URL = `https://github.com/${SUBMIT_REPO}/issues/new`;
  // GitHub answers 414 above about 8 KiB of URL. Keep room for its sign-in
  // redirect, which carries the whole URL along.
  const URL_LIMIT = 7800;
  // What the current firmware accepts. tools/firmware.json of the community
  // repository holds the same limits for its submission check.
  const FIRMWARE = {
    abiMajor: 1,
    apiLevel: 4,
    linkVma: 0x20000280,
    codeMax: 4096,
    assetMax: 3840,
    caps: { FM: 0x01, SYSINFO: 0x08, BEAM2: 0x10, CFG_PROXY: 0x20, SERIAL: 0x40 }
  };
  const APP_MAGIC = 0x31504146; // "FAP1"
  const APP_HDR_SIZE = 64;
  const SCREEN_BYTES = 1024;
  const DESCRIPTION_MAX = 140;
  const AUTHOR_PREFERENCE = 'uvstudio.submitAuthor';
  const CATEGORY_LABELS = {
    Radio: 'appCategoryRadio',
    Tools: 'appCategoryTools',
    Games: 'appCategoryGames',
    Demos: 'appCategoryDemos'
  };

  let crcTable = null;
  function crc32(bytes) {
    if (!crcTable) {
      crcTable = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
        crcTable[n] = c >>> 0;
      }
    }
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) crc = crcTable[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  // A header string: printable ASCII up to its NUL, '' otherwise.
  function headerText(bytes, offset) {
    let text = '';
    for (let i = offset; i < offset + 16 && bytes[i]; i++) {
      if (bytes[i] < 0x20 || bytes[i] > 0x7E) return '';
      text += String.fromCharCode(bytes[i]);
    }
    return text;
  }

  // The checks of the radio's loader (app_read_validated_header) and of the
  // installer. { app, error }: error is [i18n key, ...values] or null.
  function checkApp(bytes, fw = FIRMWARE) {
    const refuse = (...error) => ({ app: null, error });
    if (!(bytes instanceof Uint8Array) || bytes.length < APP_HDR_SIZE) return refuse('appSubmitNotApp');
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (view.getUint32(0, true) !== APP_MAGIC || view.getUint16(4, true) !== 1) return refuse('appSubmitNotApp');
    const codeSize = view.getUint32(8, true);
    const entry = view.getUint16(16, true);
    const assetSize = view.getUint16(60, true);
    const app = {
      name: headerText(bytes, 20),
      version: headerText(bytes, 36),
      api: bytes[7],
      caps: view.getUint32(56, true),
      codeSize,
      assetSize
    };
    app.id = app.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const known = Object.values(fw.caps).reduce((all, bit) => all | bit, 0);
    const unknown = (app.caps & ~known) >>> 0;
    if (bytes[6] !== fw.abiMajor) return refuse('appSubmitAbi', bytes[6]);
    if (app.api < 1 || app.api > fw.apiLevel) return refuse('appSubmitTooNew', app.api, fw.apiLevel);
    if (unknown) return refuse('appSubmitCaps', unknown.toString(16).toUpperCase());
    const damaged = detail => refuse('appSubmitDamaged', detail);
    if (!app.version || !app.id) return damaged('name, version');
    if (view.getUint32(52, true) !== fw.linkVma) return damaged('link address');
    if (codeSize < 2 || codeSize > fw.codeMax) return damaged('code size');
    if ((entry & 1) || entry > codeSize - 2) return damaged('entry point');
    if (assetSize > fw.assetMax) return damaged('asset size');
    if (bytes.length !== APP_HDR_SIZE + codeSize + assetSize) return damaged('file size');
    const code = bytes.subarray(APP_HDR_SIZE, APP_HDR_SIZE + codeSize);
    if (crc32(code) !== view.getUint32(12, true)) return damaged('code CRC');
    if ((crc32(bytes.subarray(APP_HDR_SIZE + codeSize)) & 0xFFFF) !== view.getUint16(62, true)) return damaged('asset CRC');
    return { app, error: null };
  }

  function base64url(bytes) {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // Raw deflate by the browser itself (CompressionStream, also on file://).
  async function deflateRaw(bytes) {
    const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream('deflate-raw'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }

  // The inline form of a file in the issue: "uvstudio-app:1:<base64url>".
  async function encodePayload(kind, bytes, deflate = deflateRaw) {
    return `uvstudio-${kind}:1:${base64url(await deflate(bytes))}`;
  }

  function oneLine(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  // The issue the submission form would make. Its text stays in English: the
  // community repository is read by everyone.
  function buildIssue(fields, app, appPayload, screenPayload) {
    const section = (label, value) => `### ${label}\n\n${value}`;
    const body = [
      section('App name', app.name),
      section('Author', oneLine(fields.author)),
      section('Category', fields.category),
      section('Description', oneLine(fields.description)),
      section('Firmware tested', oneLine(fields.firmware).slice(0, 40) || '_No response_'),
      section('Source code', oneLine(fields.source) || '_No response_'),
      section('Screenshot', '```text\n' + screenPayload + '\n```'),
      section('App binary', '```text\n' + appPayload + '\n```'),
      section('Checks', [
        '- [x] I tested this app on my radio.',
        '- [x] I may distribute this app and agree to its redistribution through UV Studio.',
        '- [x] I understand that the app can be removed from the catalog at any time.'
      ].join('\n'))
    ].join('\n\n');
    return { title: `[App] ${app.name} ${app.version}`, body: `${body}\n` };
  }

  // The GitHub page opening the issue: all of it in the link when it fits,
  // otherwise the title only, the body being pasted by the author.
  function issueLink(issue) {
    const full = `${NEW_ISSUE_URL}?${new URLSearchParams({ title: issue.title, body: issue.body })}`;
    if (full.length <= URL_LIMIT) return { url: full, paste: null };
    return { url: `${NEW_ISSUE_URL}?${new URLSearchParams({ title: issue.title })}`, paste: issue.body };
  }

  function boot() {
    const form = document.getElementById('appSubmitForm');
    if (!form || form.dataset.ready) return;
    form.dataset.ready = 'true';
    const $ = id => document.getElementById(id);
    const fileInput = $('appSubmitFile');
    const fileLabel = $('appSubmitFileLabel');
    const fileName = $('appSubmitFileName');
    const appStatus = $('appSubmitAppStatus');
    const captureButton = $('appSubmitCapture');
    const screenStatus = $('appSubmitScreenStatus');
    const author = $('appSubmitAuthor');
    const category = $('appSubmitCategory');
    const description = $('appSubmitDescription');
    const descriptionCount = $('appSubmitDescriptionCount');
    const source = $('appSubmitSource');
    const previewSection = $('appSubmitPreviewSection');
    const preview = $('appSubmitPreview');
    const status = $('appSubmitStatus');
    const paste = $('appSubmitPaste');
    const preferences = window.UVStudioPreferences;
    const catalog = window.UVStudioAppCatalog;

    // Messages are kept as [key, ...values] to follow a language change.
    const state = {
      app: null, appMessage: null, appPayload: '', appSeq: 0,
      frame: null, screenMessage: null, screenPayload: '', screenSeq: 0,
      message: null
    };

    function t(key, ...values) {
      return window.uvStudioI18n ? window.uvStudioI18n.t(key, ...values) : key;
    }

    // Words between ** are set in bold: the step the author must not miss.
    function say(element, message, kind) {
      element.textContent = '';
      if (message) {
        t(...message).split(/\*\*(.+?)\*\*/).forEach((part, index) => {
          if (!part) return;
          if (index % 2) element.appendChild(document.createElement('strong')).textContent = part;
          else element.appendChild(document.createTextNode(part));
        });
      }
      element.dataset.kind = message ? kind : '';
    }

    function setFileName(name, label, file, emptyKey) {
      name.textContent = file ? file.name : t(emptyKey);
      if (file) name.removeAttribute('data-i18n');
      else name.setAttribute('data-i18n', emptyKey);
      name.classList.toggle('has-file', Boolean(file));
      label.classList.toggle('has-file', Boolean(file));
    }

    function lcdColors() {
      const style = getComputedStyle(document.documentElement);
      return {
        ink: style.getPropertyValue('--k5-lcd-fg').trim() || '#2a213f',
        paper: style.getPropertyValue('--k5-lcd-bg').trim() || '#e5e0ec'
      };
    }

    // The card as the catalog draws it, with the author's own words.
    function renderPreview() {
      const app = state.app;
      previewSection.hidden = !app;
      preview.textContent = '';
      if (!app) return;
      const card = document.createElement('article');
      card.className = 'app-catalog-card';
      card.dataset.category = category.value.toLowerCase();
      const icon = document.createElement('div');
      icon.className = 'app-catalog-icon';
      const words = app.name.trim().split(/\s+/);
      icon.textContent = (words.length > 1 ? words[0][0] + words[1][0] : app.name.replace(/\s/g, '').slice(0, 2)).toUpperCase();
      const content = document.createElement('div');
      content.className = 'app-catalog-content';
      const title = document.createElement('div');
      title.className = 'app-catalog-title';
      const name = document.createElement('strong');
      name.textContent = app.name;
      const tag = document.createElement('span');
      tag.className = 'app-catalog-tag';
      tag.textContent = t(CATEGORY_LABELS[category.value] || 'appCategoryTools');
      title.append(name, tag);
      const text = document.createElement('p');
      text.className = 'app-catalog-description';
      text.textContent = oneLine(description.value) || '—';
      const meta = document.createElement('div');
      meta.className = 'app-catalog-meta';
      const version = document.createElement('span');
      version.textContent = `v${app.version.replace(/^v/i, '')}`;
      const size = document.createElement('span');
      size.className = 'app-catalog-size';
      const bytes = value => (catalog && catalog.formatByteSize ? catalog.formatByteSize(value) : `${value} B`);
      size.textContent = bytes(app.codeSize) + (app.assetSize ? ` (+${bytes(app.assetSize)})` : '');
      meta.append(version, size);
      if (oneLine(author.value)) {
        const by = document.createElement('span');
        by.className = 'app-catalog-author';
        by.textContent = `@${oneLine(author.value)}`;
        meta.appendChild(by);
      }
      content.append(title, text, meta);
      const actions = document.createElement('div');
      actions.className = 'app-catalog-actions';
      const install = document.createElement('button');
      install.type = 'button';
      install.className = 'btn app-catalog-action app-catalog-install';
      install.disabled = true;
      install.textContent = t('appInstallBtn');
      actions.appendChild(install);
      const screen = document.createElement('div');
      screen.className = 'app-catalog-screen';
      const pixels = document.createElement('canvas');
      pixels.className = 'app-catalog-screen-pixels';
      if (state.frame && catalog && catalog.paintAppScreen) {
        pixels.width = catalog.APP_SCREEN_WIDTH;
        pixels.height = catalog.APP_SCREEN_HEIGHT;
        pixels.setAttribute('role', 'img');
        pixels.setAttribute('aria-label', t('appScreenshotAlt', app.name));
        const colors = lcdColors();
        catalog.paintAppScreen(pixels, state.frame, colors.ink, colors.paper);
      } else {
        screen.classList.add('is-empty');
      }
      screen.appendChild(pixels);
      card.append(icon, content, actions, screen);
      preview.appendChild(card);
    }

    function refresh() {
      say(appStatus, state.appMessage, state.app ? 'ok' : 'error');
      say(screenStatus, state.screenMessage || ['appSubmitScreenHint'],
        state.frame ? 'ok' : (state.screenMessage ? 'error' : 'hint'));
      say(status, state.message, state.message && /^appSubmitNeed/.test(state.message[0]) ? 'error' : 'ok');
      descriptionCount.textContent = `${oneLine(description.value).length}/${DESCRIPTION_MAX}`;
      renderPreview();
    }

    fileInput.addEventListener('change', async () => {
      const seq = ++state.appSeq;
      const file = fileInput.files && fileInput.files[0];
      Object.assign(state, { app: null, appMessage: null, appPayload: '', message: null });
      paste.hidden = true;
      setFileName(fileName, fileLabel, file, 'fileNoFile');
      if (file) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        let { app, error } = checkApp(bytes);
        if (app && catalog && catalog.isOfficialApp && catalog.isOfficialApp(app.id)) {
          error = ['appSubmitTaken', app.name];
          app = null;
        }
        const payload = app ? await encodePayload('app', bytes) : '';
        if (seq !== state.appSeq) return;
        Object.assign(state, {
          app,
          appPayload: payload,
          appMessage: error || ['appSubmitAppOk', app.name, app.version, app.api]
        });
      }
      refresh();
    });

    async function setFrame(frame, message) {
      const seq = ++state.screenSeq;
      const payload = frame ? await encodePayload('screen', frame) : '';
      if (seq !== state.screenSeq) return;
      Object.assign(state, { frame, screenPayload: payload, screenMessage: message, message: null });
      refresh();
    }

    // The radio connected in the tools answers directly; while the Live Viewer
    // holds it instead, its current screen is taken from there.
    async function captureScreen() {
      const flash = window.UVStudioFlash;
      const viewer = window.UVStudioViewer;
      if (flash && flash.radioConnected && flash.radioConnected()) {
        const result = await flash.captureScreen();
        if (result.frame) return { frame: result.frame };
        return { error: [result.error === 'busy' ? 'appSubmitRadioBusy' : 'appSubmitCaptureFailed'] };
      }
      const frame = viewer && viewer.connected && viewer.connected() ? viewer.lastFrame() : null;
      return frame ? { frame } : { error: ['appSubmitNoRadio'] };
    }

    captureButton.addEventListener('click', async () => {
      captureButton.disabled = true;
      try {
        const result = await captureScreen();
        await setFrame(result.frame || null, result.frame ? ['appSubmitScreenOk'] : result.error);
      } catch (error) {
        await setFrame(null, ['appSubmitCaptureFailed']);
      } finally {
        captureButton.disabled = false;
      }
    });

    author.value = preferences ? preferences.get(AUTHOR_PREFERENCE, '') : '';
    author.addEventListener('input', () => {
      if (preferences) preferences.set(AUTHOR_PREFERENCE, oneLine(author.value));
      renderPreview();
    });
    [category, description].forEach(input => input.addEventListener('input', refresh));

    // Copy while the click still counts as the author's gesture; the text
    // also stays on screen, selected, in case the browser refused.
    function copy(text) {
      paste.value = text;
      paste.hidden = false;
      paste.focus();
      paste.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
      if (!copied && navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    }

    // Native validation has checked the fields. Copy, then open the window,
    // in the same gesture and before any await, or the browser refuses.
    form.addEventListener('submit', event => {
      event.preventDefault();
      paste.hidden = true;
      if (!state.app || !state.appPayload) {
        state.message = ['appSubmitNeedApp'];
        refresh();
        fileInput.focus();
        return;
      }
      if (!state.frame || !state.screenPayload) {
        state.message = ['appSubmitNeedScreen'];
        refresh();
        captureButton.focus();
        return;
      }
      // The firmware is the one UV Studio read from the radio, if any.
      const flash = window.UVStudioFlash;
      const issue = buildIssue({
        author: author.value,
        category: category.value,
        description: description.value,
        firmware: flash && flash.radioFirmwareName ? flash.radioFirmwareName() : '',
        source: source.value
      }, state.app, state.appPayload, state.screenPayload);
      const link = issueLink(issue);
      if (link.paste) copy(link.paste);
      window.open(link.url, '_blank', 'noopener');
      state.message = [link.paste ? 'appSubmitCopied' : 'appSubmitOpened'];
      refresh();
    });

    window.addEventListener('uvstudio:lcdcolors', renderPreview);
    window.addEventListener('uvstudio:languagechange', refresh);
    refresh();
  }

  return {
    boot,
    buildIssue,
    checkApp,
    crc32,
    encodePayload,
    issueLink,
    FIRMWARE,
    URL_LIMIT
  };
});
