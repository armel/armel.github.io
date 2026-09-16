'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const studioVersionSource = fs.readFileSync(path.join(root, 'js', 'studio-version.js'), 'utf8');
const flashSource = fs.readFileSync(path.join(root, 'js', 'flash.js'), 'utf8');
const studioCss = fs.readFileSync(path.join(root, 'css', 'studio.css'), 'utf8');

test('derives any multiboot edition from the canonical firmware filename', () => {
  const start = flashSource.indexOf('function slotEditionFromFilename');
  const end = flashSource.indexOf('\n\nfunction slotVersionFromFilename', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.extractEdition = slotEditionFromFilename;`,
    context
  );

  assert.equal(context.extractEdition('f4hwn.fusion.bin'), 'Fusion');
  assert.equal(context.extractEdition('f4hwn.expedition.bin'), 'Expedition');
  assert.equal(context.extractEdition('f4hwn.fieldops.bin'), 'FieldOps');
  assert.equal(context.extractEdition('f4hwn.future-profile.bin'), 'Future Profile');
  assert.equal(context.extractEdition('f4hwn.k1.fusion.v5.9.0.bin'), 'Fusion');
  assert.equal(context.extractEdition('f4hwn.compact.usb.v50.bin'), 'Compact');
  assert.equal(context.extractEdition('unrelated-firmware.bin'), '');
});

test('accepts compact and dotted versions in multiboot firmware metadata', () => {
  const start = flashSource.indexOf('function slotEditionFromFilename');
  const end = flashSource.indexOf('\n\nfunction slotBuildHeader', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.extractMeta = slotExtractMeta;`,
    context
  );

  const compact = context.extractMeta(
    Array.from(Buffer.from('\0RADIO v50\0', 'ascii')),
    'f4hwn.compact.usb.v50.bin'
  );
  assert.equal(compact.name, 'Compact');
  assert.equal(compact.fwVersion, 'v50');

  const dotted = context.extractMeta(
    Array.from(Buffer.from('\0F4HWN v5.9.0\0', 'ascii')),
    'f4hwn.fusion.v5.9.0.bin'
  );
  assert.equal(dotted.name, 'Fusion');
  assert.equal(dotted.fwVersion, 'v5.9.0');

  const legacy = context.extractMeta(
    Array.from(Buffer.from('\0F4HWN v5.9.0\0', 'ascii')),
    'f4hwn.fusion.bin'
  );
  assert.equal(legacy.name, 'Fusion');
  assert.equal(legacy.fwVersion, 'v5.9.0');

  const compactFallback = context.extractMeta(
    Array.from(Buffer.from('\0RADIO v50\0', 'ascii')),
    'f4hwn.compact.bin'
  );
  assert.equal(compactFallback.fwVersion, 'v50');
});

test('stores a custom display name in the multiboot header', () => {
  const start = flashSource.indexOf('function slotNormalizeName');
  const end = flashSource.indexOf('\n\nfunction slotParseHeader', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `const SLOT_HDR_SIZE = 64;
     const SLOT_MAGIC = 0x31424D46;
     const SLOT_HDR_VERSION = 1;
     const SLOT_FLAG_COMMITTED = 1;
     ${flashSource.slice(start, end)};
     this.normalizeName = slotNormalizeName;
     this.buildHeader = slotBuildHeader;`,
    context
  );

  assert.equal(context.normalizeName('  Été   France  '), 'Ete France');
  assert.equal(context.normalizeName('12345678901234567890'), '123456789012345');
  const header = context.buildHeader(1234, 0xAABBCCDD, { name: 'France', fwVersion: 'v5.9.0' });
  const name = Buffer.from(header.slice(16, 32)).toString('ascii').replace(/\0.*$/, '');
  assert.equal(name, 'France');
});

test('offers the custom slot name before writing', () => {
  assert.match(html, /id="slotName"[^>]*maxlength="15"[^>]*disabled/);
  assert.ok(html.indexOf('id="slotName"') < html.indexOf('id="slotWriteBtn"'));
});

test('keeps the public version and its cache key aligned', () => {
  const version = studioVersionSource.match(/UVSTUDIO_VERSION = "([^"]+)"/)?.[1];
  assert.ok(version);
  assert.match(html, new RegExp(`js/studio-version\\.js\\?v=${version.replaceAll('.', '\\.')}`));
});

test('reconnects Firmware Slots and refreshes them after the serial port returns', () => {
  assert.ok(flashSource.includes("navigator.serial.addEventListener('disconnect'"));
  assert.ok(flashSource.includes("navigator.serial.addEventListener('connect'"));
  assert.ok(flashSource.includes('navigator.serial.getPorts()'));
  assert.ok(flashSource.includes("toolsSerial.setState('reconnecting'"));
  assert.ok(flashSource.includes('slotRefreshPending = true'));
  assert.ok(flashSource.includes('void slotRefreshFlow()'));
});

test('loads the shared RF Log protocol before both consumers', () => {
  const rf = html.indexOf('js/rf-log.js');
  const viewer = html.indexOf('js/k5viewer.js');
  const tools = html.indexOf('js/flash.js');
  assert.ok(rf > 0 && rf < viewer && viewer < tools);
});

test('loads the app catalog after the installer API and exposes both selectors', () => {
  const flash = html.indexOf('js/flash.js');
  const catalog = html.indexOf('js/app-catalog.js');
  assert.ok(flash > 0 && catalog > flash);
  assert.match(html, /id="appCatalogVersionSelect"/);
  assert.match(html, /id="appCatalogSelect"/);
  assert.match(flashSource, /loadAppFromURL,/);
  assert.match(flashSource, /uvstudio:appselect/);
});

test('downloads a catalog app and forwards its filename to the installer', async () => {
  const start = flashSource.indexOf('async function loadAppFromURL');
  const end = flashSource.indexOf('\n\nif (appFileInput)', start);
  assert.ok(start >= 0 && end > start);
  const expected = Uint8Array.from([0x46, 0x41, 0x50, 0x31]);
  const loaded = {};
  const context = {
    AbortController,
    URL,
    fetch: async url => {
      assert.equal(String(url), 'https://example.test/archive/apps/v6.0.0/Beacon.app');
      return { ok: true, arrayBuffer: async () => expected.buffer };
    },
    beginAppImageLoad: source => {
      assert.equal(source, 'catalog');
      return 1;
    },
    appImageLoadSeq: 1,
    appImageLoadAbort: null,
    setAppImageBuffer: (buf, name) => {
      loaded.bytes = new Uint8Array(buf);
      loaded.name = name;
    },
    clearAppImage() {},
    log() {},
    t: key => key
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.load = loadAppFromURL;`,
    context
  );

  await context.load(
    'https://example.test/archive/apps/v6.0.0/Beacon.app',
    'Beacon.app'
  );
  assert.deepEqual(Array.from(loaded.bytes), Array.from(expected));
  assert.equal(loaded.name, 'Beacon.app');
});

test('loads resilient preferences before i18n and application consumers', () => {
  const preferences = html.indexOf('js/studio-preferences.js');
  const i18n = html.indexOf('js/studio-i18n.js');
  const viewer = html.indexOf('js/k5viewer.js');
  const studio = html.indexOf('js/studio.js');
  assert.ok(preferences > 0 && preferences < i18n && i18n < viewer && viewer < studio);
});

test('keeps live-view-only controls out of the RF Log toolbar', () => {
  ['keyboardToggleBtn', 'keyboardDetachBtn', 'helpBtn'].forEach(id => {
    assert.match(html, new RegExp(`class="[^"]*viewer-live-only[^"]*" id="${id}"`));
  });
  assert.match(html, /id="pane-viewer" data-viewer-mode="live"/);
});

test('exposes the responsive sidebar toggle to assistive technologies', () => {
  assert.match(html, /id="hamburgerMenu"[^>]*data-i18n-aria-label="toggle_menu"/);
  assert.match(html, /id="hamburgerMenu"[^>]*aria-controls="studioSidebar"/);
  assert.match(html, /id="hamburgerMenu"[^>]*aria-expanded="true"/);
  assert.match(html, /<aside class="sidebar" id="studioSidebar">/);
});

test('groups paired maintenance actions into resource views', () => {
  const views = [...html.matchAll(/data-tool-view="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(views, ['flash', 'slots', 'apps', 'external-flash', 'factory-reset', 'calibration', 'logo', 'rf-log']);
  views.forEach(view => assert.match(html, new RegExp(`id="${view}-content"`)));
  ['dump', 'restore', 'logo-upload', 'logo-dump', 'flash-dump', 'flash-restore'].forEach(action => {
    assert.match(html, new RegExp(`id="${action}-content"[^>]+data-action-panel=`));
  });
});

test('keeps Labs-only tools together in the sidebar', () => {
  const apps = html.indexOf('data-route="apps"');
  const externalFlash = html.indexOf('data-route="external-flash"');
  const factoryReset = html.indexOf('data-route="factory-reset"');
  const calibration = html.indexOf('data-route="calibration"');
  assert.ok(apps >= 0 && externalFlash > apps && factoryReset > externalFlash && calibration > factoryReset);
  assert.match(html, /class="nav-item nav-item-labs" data-route="apps"[^>]+data-name="Apps \(Labs only\)"/);
  assert.match(html, /class="nav-item nav-item-labs" data-route="external-flash"[^>]+data-name="External Flash \(Labs only\)"/);
  assert.match(html, /class="nav-item nav-item-labs" data-route="factory-reset"[^>]+data-name="Factory Reset \(Labs only\)"/);
  assert.equal((html.match(/class="tag" data-i18n="studio_nav_labs_only"/g) || []).length, 3);
  assert.match(studioCss, /\.nav-item-labs\s*\{[^}]*gap:\s*8px/);
  assert.match(studioCss, /\.nav-item-labs \.tag\s*\{[^}]*margin-left:\s*auto/);
  assert.match(studioCss, /\.nav-item-labs \.tag\s*\{[^}]*margin-right:\s*0/);
});

test('orders logo actions from radio read to radio write', () => {
  assert.match(html, /data-tool-view="logo" data-default-action="download"/);
  const start = html.indexOf('id="logo-content"');
  const end = html.indexOf('id="external-flash-content"', start);
  const routes = [...html.slice(start, end).matchAll(/class="btn action-tab[^"]*"[^>]*data-route="([^"]+)"/g)]
    .map(match => match[1]);
  assert.deepEqual(routes, ['download-logo', 'upload-logo']);
});

test('keeps generated-file downloads beside their read actions', () => {
  [
    ['dumpBtn', 'dumpDownload'],
    ['logoDumpBtn', 'logoDumpDownload'],
    ['flashDumpBtn', 'flashDumpDownload']
  ].forEach(([buttonId, downloadId]) => {
    assert.match(html, new RegExp(
      `<div class="output-actions">\\s*<button id="${buttonId}"[^>]*>[\\s\\S]*?</button>\\s*<div class="download-link" id="${downloadId}"`
    ));
  });
});

test('keeps full external flash transfers responsive and retryable', () => {
  const start = flashSource.indexOf('async function waitForExternalFlashResponse');
  const end = flashSource.indexOf('\n\nasync function requireExternalFlashSupport', start);
  assert.ok(start >= 0 && end > start);
  const helpers = flashSource.slice(start, end);
  assert.match(helpers, /await waitForSerialRead\(/);
  assert.doesNotMatch(helpers, /await sleep\(5\)/);
  assert.match(helpers, /retries = FLASH_COMMAND_RETRIES/);
  assert.match(helpers, /attempt <= retries/);
  assert.match(flashSource, /activeOperationName === 'dump-flash'/);
  assert.match(flashSource, /activeOperationName === 'restore-flash'/);
});

test('uses sector CRC32 to skip matching flash and accelerate verification', () => {
  assert.match(flashSource, /const MSG_CRC_FLASH = 0x073E/);
  assert.match(flashSource, /const MSG_CRC_FLASH_RESP = 0x073F/);
  assert.match(flashSource, /await detectExternalFlashCrcSupport\(devInfo\.timestamp\)/);
  assert.match(flashSource, /await externalFlashSectorMatches\(data, sector, sectorEnd/);
  assert.match(flashSource, /await verifyExternalFlashSector\(/);

  const start = flashSource.indexOf('function crc32Bytes');
  const end = flashSource.indexOf('\n}', start) + 2;
  assert.ok(start >= 0 && end > start);
  const context = { Uint8Array };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.crc32 = crc32Bytes;`,
    context
  );
  assert.equal(context.crc32(new Uint8Array(Buffer.from('123456789'))), 0xCBF43926);
});

test('uses the shared modal UI to confirm external flash restoration', () => {
  assert.match(html, /id="flashRestoreConfirmModal"[^>]+role="dialog"[^>]+aria-modal="true"/);
  assert.match(html, /id="flashRestoreCancelBtn"[^>]+data-i18n="flashRestoreCancel"/);
  assert.match(html, /class="btn danger" id="flashRestoreConfirmBtn"/);
  assert.match(flashSource, /await confirmExternalFlashRestore\(\)/);
  assert.doesNotMatch(flashSource, /window\.confirm\(t\('flashRestoreConfirm'\)\)/);
});

test('provides verified two-stage factory restore workflows for UV-K1 and UV-K5 V3', () => {
  assert.match(html, /class="nav-item nav-item-labs"[^>]+data-route="factory-reset"[^>]+data-tool-view="factory-reset"/);
  assert.match(html, /data-section-i18n="studio_nav_factory_reset"[\s\S]+data-i18n="studio_nav_labs_only"/);
  assert.match(html, /id="factory-reset-content"[^>]+role="region"/);
  assert.doesNotMatch(html, /id="factory-reset-tab"/);
  assert.match(html, /class="factory-reset-actions"/);
  assert.match(html, /id="factoryResetK1Btn"[^>]+data-factory-reset-target="k1"/);
  assert.match(html, /id="factoryResetK5V3Btn"[^>]+data-factory-reset-target="k5v3"/);
  assert.match(html, /id="factoryResetModal"[^>]+role="dialog"[^>]+aria-modal="true"/);
  assert.match(flashSource, /factoryResetButtons\.forEach\(button => \{ button\.disabled = busy; \}\)/);
  assert.match(flashSource, /showFactoryResetModal\('unsupported', target\)/);
  assert.match(flashSource, /const FACTORY_STATE_A = 0x100000/);
  assert.match(flashSource, /const FACTORY_STATE_B = 0x101000/);
  assert.match(flashSource, /label: 'UV-K1'[\s\S]+K1_External_Flash_Factory_Reconstructed\.bin[\s\S]+quansheng\.k1\.stock\.firmware\.v7\.03\.01\.bin/);
  assert.match(flashSource, /label: 'UV-K5 V3'[\s\S]+K5V3_External_Flash_Factory_Reconstructed\.bin[\s\S]+quansheng\.k5v3\.stock\.firmware\.v7\.00\.11\.bin/);
  assert.match(flashSource, /for \(let address = 0; address < FLASH_TOTAL_SIZE; address \+= FLASH_SECTOR_SIZE\)/);
  assert.match(flashSource, /address === FLASH_CALIBRATION_SECTOR/);
  assert.match(flashSource, /regularSectors\.concat\(\[FACTORY_STATE_A, FACTORY_STATE_B\]\)/);
  assert.match(flashSource, /await restoreFactoryExternalFlash\(factoryFlash, devInfo\.timestamp, crcSupported\)/);
  assert.match(flashSource, /fetchVerifiedBinary\(target\.flashUrl, FACTORY_FLASH_SIZE, target\.flashSha256\)/);
  assert.match(flashSource, /fetchVerifiedBinary\(target\.firmwareUrl, target\.firmwareSize, target\.firmwareSha256\)/);
  assert.match(flashSource, /await showFactoryResetModal\('dfu'\)/);
  assert.match(flashSource, /await flashFirmware\(stockFirmware, \{ count: false, offerChirpDriver: false \}\)/);
  const factoryWorkflow = flashSource.slice(
    flashSource.indexOf('// ========== GUIDED FACTORY SOFTWARE RESTORE'),
    flashSource.indexOf('// ========== DUMP FULL EXTERNAL FLASH')
  );
  assert.doesNotMatch(factoryWorkflow, /MSG_REBOOT/);
});

test('ships the verified UV-K1 and UV-K5 V3 factory recovery images', () => {
  const factoryFlash = fs.readFileSync(path.join(root, 'assets', 'factory', 'K1_External_Flash_Factory_Reconstructed.bin'));
  const factoryK5V3Flash = fs.readFileSync(path.join(root, 'assets', 'factory', 'K5V3_External_Flash_Factory_Reconstructed.bin'));
  const factoryLogo = fs.readFileSync(path.join(root, 'assets', 'factory', 'quansheng.stock.logo.png'));
  const stockFirmware = fs.readFileSync(path.join(root, 'assets', 'factory', 'quansheng.k1.stock.firmware.v7.03.01.bin'));
  const stockK5V3Firmware = fs.readFileSync(path.join(root, 'assets', 'factory', 'quansheng.k5v3.stock.firmware.v7.00.11.bin'));
  const sha256 = data => crypto.createHash('sha256').update(data).digest('hex');

  assert.equal(factoryFlash.length, 0x200000);
  assert.equal(sha256(factoryFlash), 'a2383aa050dc0963fee7b7c99692b8330d9455a6bbb2bb7498b2bba4174c9d55');
  assert.equal(sha256(factoryFlash.subarray(0, 0x10000)), '43b9b51e73bc793cfa921806d2a9d68cab3c4d7fafb1f3e555ee2d0bf92f6e43');
  assert.equal(sha256(factoryFlash.subarray(0x100000, 0x197000)), '415ea5e819c718db34d163751a10c6eaaabc498facf7dd48f9d342ed9948c017');
  assert.ok(factoryFlash.subarray(0x010000, 0x011000).every(byte => byte === 0xff));
  assert.equal(factoryFlash.readUInt32LE(0x011000), 0x9abc5a5a);
  assert.equal(factoryFlash.readUInt16LE(0x011004), 1024);
  assert.equal(factoryFlash.readUInt16LE(0x011006), 0);
  assert.equal(sha256(factoryFlash.subarray(0x011008, 0x011408)), '333fa3713f45bdcc5d375795dceeebf561e8a4ee8729fef7fe898fcfa5b8cbf7');
  assert.ok(factoryFlash.subarray(0x011408, 0x100000).every(byte => byte === 0xff));
  assert.ok(factoryFlash.subarray(0x197000).every(byte => byte === 0xff));

  assert.equal(factoryK5V3Flash.length, 0x200000);
  assert.equal(sha256(factoryK5V3Flash), 'b85c8066a1b0885d1cf3e430533f45c9c8ea91c8b936a94aba99221fd1bff79b');
  assert.equal(sha256(factoryLogo), 'a5b4277efb5f78986bcdb22e4132b62b68aee5f4637a1798164ecc230a935848');
  assert.equal(factoryFlash.subarray(0x7030, 0x7040).toString('ascii').replace(/\0+$/, ''), 'UV-K1');
  assert.equal(factoryK5V3Flash.subarray(0x7030, 0x7040).toString('ascii').replace(/\0+$/, ''), 'UV-K5');
  const k1WithoutModel = Buffer.from(factoryFlash);
  const k5WithoutModel = Buffer.from(factoryK5V3Flash);
  k1WithoutModel.fill(0, 0x7030, 0x7040);
  k5WithoutModel.fill(0, 0x7030, 0x7040);
  assert.deepEqual(k5WithoutModel, k1WithoutModel);

  assert.equal(stockFirmware.length, 71268);
  assert.equal(sha256(stockFirmware), '55ec0daffc5668bdb41dcc118475d7e6e23ad953d70f57a9bca64a6202734ba0');
  assert.equal(stockK5V3Firmware.length, 71712);
  assert.equal(sha256(stockK5V3Firmware), 'f4e5264a6f9a5436a6c75f7b217c60ba002cec04928f247392b9968c5c9458cb');
});

test('provides an equivalent on-demand file protocol fallback', () => {
  const source = fs.readFileSync(path.join(root, 'assets', 'factory', 'factory-assets.js'), 'utf8');
  const context = { window: {} };
  vm.runInNewContext(source, context);

  for (const [url, filename] of [
    ['assets/factory/K1_External_Flash_Factory_Reconstructed.bin', 'K1_External_Flash_Factory_Reconstructed.bin'],
    ['assets/factory/K5V3_External_Flash_Factory_Reconstructed.bin', 'K5V3_External_Flash_Factory_Reconstructed.bin'],
    ['assets/factory/quansheng.k1.stock.firmware.v7.03.01.bin', 'quansheng.k1.stock.firmware.v7.03.01.bin'],
    ['assets/factory/quansheng.k5v3.stock.firmware.v7.00.11.bin', 'quansheng.k5v3.stock.firmware.v7.00.11.bin']
  ]) {
    const expected = fs.readFileSync(path.join(root, 'assets', 'factory', filename));
    const decoded = Buffer.from(context.window.UVStudioFactoryAssets[url], 'base64');
    assert.deepEqual(decoded, expected);
  }

  assert.match(flashSource, /window\.location\.protocol === 'file:'/);
  assert.match(flashSource, /script\.src = 'assets\/factory\/factory-assets\.js'/);
});

test('retries an external flash command after transient response timeouts', async () => {
  const start = flashSource.indexOf('async function waitForExternalFlashResponse');
  const end = flashSource.indexOf('\n\nasync function readExternalFlashChunk', start);
  assert.ok(start >= 0 && end > start);
  const context = { Uint8Array, DataView, performance: { now: () => 0 } };
  vm.runInNewContext(
    `const FLASH_COMMAND_RETRIES = 3;
     let toolsSerialSession = 1;
     let serialReadRevision = 0;
     let readBuffer = [];
     let sends = 0;
     const t = key => key;
     async function sendMessage() {
       sends++;
       if (sends === 3) {
         const data = new Uint8Array(4);
         new DataView(data.buffer).setUint32(0, 0x1234, true);
         readBuffer.push({ msgType: 0x0739, data });
       }
     }
     function fetchMessage(buffer) { return buffer.length ? buffer.shift() : null; }
     async function waitForSerialRead() { return false; }
     ${flashSource.slice(start, end)};
     this.exchange = () => exchangeExternalFlashMessage(
       new Uint8Array(), 0x0739, 0x1234, 2000
     );
     this.sendCount = () => sends;`,
    context
  );

  const response = await context.exchange();
  assert.equal(response.msgType, 0x0739);
  assert.equal(context.sendCount(), 3);
});

test('keeps all local script and stylesheet resources resolvable', () => {
  const resources = [
    ...html.matchAll(/<(?:script|link)\b[^>]+(?:src|href)="([^"]+)"/g)
  ].map(match => match[1].split('?')[0]).filter(resource => !resource.startsWith('data:'));
  resources.forEach(resource => {
    assert.equal(fs.existsSync(path.join(root, resource)), true, resource);
  });
});

test('keeps locale dictionaries on the same key set', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const dictionaries = files.map(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    return { file, dictionary: context.window.UVSTUDIO_LOCALES[file.slice(0, 2)] };
  });
  const expected = Object.keys(dictionaries[0].dictionary).sort();
  dictionaries.forEach(({ file, dictionary }) => {
    assert.deepEqual(Object.keys(dictionary).sort(), expected, file);
  });
});

test('uses one consistent vocabulary for maintenance actions in every locale', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const legacyDumpKeys = [
    'tabDump',
    'labelCalibFile',
    'dumpBtn',
    'dumpDescription',
    'dumpingData',
    'dumpProgress',
    'dumpComplete',
    'studio_nav_dump_calib',
    'studio_nav_dump_flash',
    'flashDumpDescription',
    'flashDumpBtn',
    'dumpingFlash',
    'flashDumpComplete'
  ];

  files.forEach(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    const dictionary = context.window.UVSTUDIO_LOCALES[file.slice(0, 2)];

    assert.equal(dictionary.tabDump, dictionary.studio_nav_dump_flash, `${file}: backup action`);
    assert.equal(dictionary.tabRestore, dictionary.studio_nav_restore_flash, `${file}: restore action`);
    assert.equal(dictionary.tabLogoDump, dictionary.studio_nav_download_logo, `${file}: logo download action`);
    assert.equal(dictionary.tabLogoUpload, dictionary.studio_nav_upload_logo, `${file}: logo upload action`);
    assert.notEqual(dictionary.dumpBtn, dictionary.downloadText, `${file}: calibration read vs download`);
    assert.notEqual(dictionary.logoDumpBtn, dictionary.logoDumpDownloadText, `${file}: logo read vs download`);
    assert.notEqual(dictionary.flashDumpBtn, dictionary.flashDumpDownloadText, `${file}: flash read vs download`);
    assert.doesNotMatch(dictionary.studio_nav_apps, /Labs/, `${file}: compact Apps label`);
    assert.doesNotMatch(dictionary.studio_nav_external_flash, /Labs/, `${file}: compact flash label`);
    assert.match(dictionary.studio_nav_labs_only, /Labs/, `${file}: Labs-only badge`);
    assert.notEqual(dictionary.studio_nav_labs_only, 'Labs', `${file}: explicit Labs restriction`);
    assert.equal('factoryResetBtn' in dictionary, false, `${file}: obsolete single-model action`);
    assert.ok(dictionary.factoryResetK1Btn, `${file}: UV-K1 factory action`);
    assert.ok(dictionary.factoryResetK5V3Btn, `${file}: UV-K5 V3 factory action`);
    [
      'factoryResetTitle',
      'factoryResetConfirm',
      'factoryResetDfuTitle',
      'factoryResetDfuBody',
      'factoryResetDownloading',
      'factoryResetRestoringExternal',
      'factoryResetExternalComplete',
      'factoryResetWaitingDfu',
      'factoryResetComplete'
    ].forEach(key => assert.match(dictionary[key], /\{0\}/, `${file}:${key} model placeholder`));
    legacyDumpKeys.forEach(key => {
      assert.doesNotMatch(dictionary[key], /\bdump(?:ed|ing)?\b/i, `${file}:${key}`);
    });
  });
});

test('translates radio help and exposes every global serial status label', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const required = [
    'radio_navigate_k1_desc',
    'radio_short_desc',
    'radio_long_desc',
    'radio_led_state',
    'radio_ptt_unavailable',
    'studio_serial_disconnected',
    'studio_serial_connected_viewer',
    'studio_operation_flash',
    'studio_operation_restore_calibration',
    'studio_operation_dump_flash',
    'studio_operation_restore_flash',
    'studio_operation_factory_reset',
    'studio_nav_factory_reset',
    'factoryResetConfirm',
    'factoryResetDfuBody',
    'factoryResetUnsupported'
  ];
  files.forEach(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    const dictionary = context.window.UVSTUDIO_LOCALES[file.slice(0, 2)];
    required.forEach(key => assert.ok(dictionary[key], `${file}:${key}`));
    if (file !== 'en.js') {
      assert.notEqual(dictionary.radio_short_desc, 'Digit short press', file);
      assert.notEqual(dictionary.radio_long_desc, 'Digit long press', file);
    }
  });
  assert.match(html, /id="studioSerialStatus"/);
  assert.match(html, /data-i18n-aria-label="radio_led_state"/);
});
