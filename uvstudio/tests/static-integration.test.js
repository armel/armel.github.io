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
const viewerSource = fs.readFileSync(path.join(root, 'js', 'k5viewer.js'), 'utf8');
const serialSource = fs.readFileSync(path.join(root, 'js', 'studio-serial.js'), 'utf8');
const studioSource = fs.readFileSync(path.join(root, 'js', 'studio.js'), 'utf8');
const appCatalogSource = fs.readFileSync(path.join(root, 'js', 'app-catalog.js'), 'utf8');
const studioCss = fs.readFileSync(path.join(root, 'css', 'studio.css'), 'utf8');
const toolsCss = fs.readFileSync(path.join(root, 'css', 'tools.css'), 'utf8');
const coreCss = fs.readFileSync(path.join(root, 'css', 'core.css'), 'utf8');

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

test('reconnects every runtime tool and refreshes device inventories', () => {
  assert.ok(flashSource.includes("navigator.serial.addEventListener('disconnect'"));
  assert.ok(serialSource.includes('navigator.serial.addEventListener("connect"'));
  assert.ok(serialSource.includes('navigator.serial.getPorts()'));
  assert.ok(flashSource.includes("toolsSerial.setState('reconnecting'"));
  assert.ok(flashSource.includes("toolsRefreshPending = activeToolsView === 'slots' || activeToolsView === 'apps'"));
  assert.ok(flashSource.includes('void slotRefreshFlow()'));
  assert.ok(flashSource.includes('void appRefreshFlow()'));
  assert.match(flashSource, /function toolsViewUsesRuntimeSerial[\s\S]*return view !== 'flash'/);
  assert.match(flashSource, /UVStudioSerial\.createReconnectManager/);
  assert.match(viewerSource, /UVStudioSerial\.createReconnectManager/);
  assert.doesNotMatch(flashSource, /slotAutoReconnecting|reconnectSlotPort|handleSlotHardwareDisconnect/);
  assert.match(html, /class="slots-list-toolbar">\s*<button[^>]+id="slotsRefreshBtn"[^>]+class="btn primary compact-toolbar-action slots-refresh"/);
  assert.match(toolsCss, /\.compact-toolbar-action\s*\{[^}]*height:\s*32px[^}]*font-size:\s*11px/s);
});

test('loads the shared RF Log protocol before both consumers', () => {
  const runtime = html.indexOf('js/runtime-protocol.js');
  const rf = html.indexOf('js/rf-log.js');
  const viewer = html.indexOf('js/k5viewer.js');
  const tools = html.indexOf('js/flash.js');
  assert.ok(runtime > 0 && runtime < rf && rf < viewer && viewer < tools);
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

test('exposes 64 app slots for v7 while retaining earlier capacities', () => {
  assert.match(flashSource, /const APP_SLOT_COUNT = 64/);
  assert.match(flashSource, /const APP_V6_SLOT_COUNT = 48/);
  assert.match(flashSource, /const APP_LEGACY_SLOT_COUNT = 16/);
  assert.match(flashSource, /appCompareVersions\(version, '7\.0\.0'\) >= 0/);
  assert.match(flashSource, /appCompareVersions\(version, '6\.1\.0'\) > 0/);
  assert.match(html, /class="slots-table-wrap apps-table-wrap">\s*<table class="slots-table" id="appsTable"/);
  assert.match(toolsCss, /\.apps-table-wrap\s*\{[^}]*max-height:\s*442px[^}]*overflow:\s*auto/s);
  assert.match(toolsCss, /\.apps-table-wrap \.slots-table thead th\s*\{[^}]*position:\s*sticky/s);
  assert.match(toolsCss, /\.apps-table-wrap \.slots-table tbody tr\s*\{[^}]*height:\s*50px/s);
  assert.match(toolsCss, /\.apps-table-wrap \.slots-table tbody td\s*\{[^}]*height:\s*50px[^}]*padding-top:\s*8px/s);
});

test('provides a catalog and compact installed-app manager without new firmware commands', () => {
  assert.match(html, /id="appInstalledTab"/);
  assert.match(html, /id="appCatalogTab"/);
  assert.doesNotMatch(html, /id="appShowEmptySlots"/);
  assert.match(html, /class="btn primary compact-toolbar-action app-refresh-button" id="appRefreshBtn"[^>]+data-i18n="appsRefresh"/);
  assert.match(html, /class="btn danger compact-toolbar-action" id="appDeleteAllBtn"[^>]+data-i18n="appDeleteAll"[^>]+disabled/);
  assert.match(html, /id="appDeleteAllModal"[^>]+role="dialog"[^>]+aria-modal="true"/);
  assert.ok(html.indexOf('id="appRenumberBtn"') < html.indexOf('id="appRefreshBtn"'));
  assert.ok(html.indexOf('id="appOrderActions"') < html.indexOf('id="appRefreshBtn"'));
  assert.doesNotMatch(html, /id="appEmptyCatalogBtn"/);
  assert.match(html, /id="appCatalogSearch"/);
  assert.ok(html.indexOf('id="appCatalogLocalBuild"') < html.indexOf('id="appCatalogVersionSelect"'));
  assert.match(html, /id="appCatalogLocalBuildButton">Custom<\/button>/);
  assert.doesNotMatch(html, /id="appCatalogLocalBuildButton"[^>]+data-i18n/);
  assert.match(html, /id="appCatalogLocalBuildChange"[^>]+data-i18n="appLocalBuildChange"[^>]+hidden/);
  assert.match(appCatalogSource, /localBuildButton\.textContent = t\('appLocalBuild'\)/);
  assert.doesNotMatch(appCatalogSource, /t\('appLocalBuildFolder'/);
  assert.match(html, /id="appCategoryFilters"/);
  assert.match(html, /data-category="other"[^>]*hidden/);
  assert.match(appCatalogSource, /APP_DETAILS\[id\] \|\| \['other'/);
  assert.match(appCatalogSource, /indexedDB\.open\(LOCAL_DIRECTORY_DB, 1\)/);
  assert.match(appCatalogSource, /store\.put\(handle, LOCAL_DIRECTORY_KEY\)/);
  assert.doesNotMatch(appCatalogSource, /versions\.push\(LOCAL_VERSION\)/);
  assert.match(appCatalogSource, /localBuildChangeButton\.addEventListener\('click'.*scanLocalBuild\(true\)/s);
  assert.match(flashSource, /appSelectFirstEmptySlot/);
  assert.match(flashSource, /appSlotStatuses\.size !== appActiveSlotCount/);
  assert.match(flashSource, /detail: \{ ready, installed, free, apps \}/);
  assert.doesNotMatch(flashSource, /appEmptyCatalogBtn/);
  assert.match(flashSource, /updateAppFromURL,/);
  assert.match(flashSource, /deleteAppSlot,/);
  assert.match(flashSource, /async function appDeleteAllFlow\(\)/);
  assert.match(flashSource, /await confirmAppDeleteAll\(slots\.length\)/);
  assert.match(flashSource, /for \(let index = 0; index < slots\.length; index\+\+\)/);
  assert.match(flashSource, /appDeleteAllBtn\.disabled = !serialSupported \|\| busy \|\| orderDirty \|\| !installed/);
  assert.match(flashSource, /class="slot-size"><span class="slot-code-size">—<\/span><span class="slot-asset-size"><\/span>/);
  assert.match(flashSource, /appSizeCode.*appFormatBytes\(Number\(row\.dataset\.appCodeSize\)\)/s);
  assert.match(flashSource, /appSizeAssets.*appFormatBytes\(Number\(row\.dataset\.appAssetSize\)\)/s);
  assert.match(appCatalogSource, /catalogAppState\(installed, metadata\)/);
  assert.match(appCatalogSource, /` \(\+\$\{formatByteSize\(metadata\.assetSize\)\}\)`/);
  assert.match(appCatalogSource, /appSizeAssets.*formatByteSize\(metadata\.assetSize\)/s);
  assert.match(toolsCss, /\.app-catalog-meta\s*\{[^}]*height:\s*14px[^}]*white-space:\s*nowrap/s);
  assert.match(appCatalogSource, /flash\.updateAppFromURL\(installed\.slot/);
  assert.match(appCatalogSource, /flash\.deleteAppSlot\(installed\.slot\)/);
  assert.match(appCatalogSource, /className = 'btn app-catalog-action app-catalog-install'/);
  assert.match(appCatalogSource, /setCatalogActionContent\(install, 'install', t\('appInstallBtn'\), actionSizers\)/);
  assert.match(appCatalogSource, /setCatalogActionContent\(update, 'update', `\$\{t\('appUpdateShort'\)\} → \$\{updateVersion\}`, actionSizers\)/);
  assert.match(appCatalogSource, /const actionSizers = \[\s*t\('appInstallBtn'\),\s*t\('appDelete'\),\s*`\$\{t\('appUpdateShort'\)\} → \$\{longestVersion\}`/);
  assert.match(toolsCss, /\.app-catalog-action-sizer\s*\{\s*visibility:\s*hidden/);
  assert.match(appCatalogSource, /update\.title = t\('appUpdateAction', updateVersion\)/);
  assert.match(appCatalogSource, /card\.appendChild\(createCatalogProgress\(progressState\.shown\)\)/);
  assert.doesNotMatch(appCatalogSource, /primarySlot|secondarySlot/);
  assert.match(appCatalogSource, /setCatalogActionContent\(remove, 'delete', t\('appDelete'\), actionSizers\)/);
  assert.match(html, /id="appOrderNotice"[^>]*hidden data-i18n="appOrderApplyFirst"/);
  assert.ok(html.indexOf('id="appCatalogTab"') < html.indexOf('id="appOrderNotice"'));
  assert.ok(html.indexOf('id="appOrderNotice"') < html.indexOf('id="appInstalledPanel"'));
  assert.match(toolsCss, /\.app-manager-tabs-row\s*\{[^}]*display:\s*flex/);
  assert.match(flashSource, /appCatalogTab\.addEventListener\('click', \(\) => \{\s*if \(appOrderIsDirty\(\)\) \{\s*if \(appOrderNotice\) appOrderNotice\.hidden = false;\s*return;/);
  assert.match(flashSource, /if \(appOrderNotice && !dirty\) appOrderNotice\.hidden = true/);
  assert.match(flashSource, /async function installAppFromURL\([^)]*\) \{\s*if \(appOrderIsDirty\(\)\)/);
  assert.doesNotMatch(appCatalogSource, /orderPending|uvstudio:apporder/);
  assert.match(toolsCss, /\.app-catalog-card \.app-catalog-action svg\s*\{[^}]*width:\s*17px[^}]*stroke-width:\s*2/s);
  assert.match(toolsCss, /\.app-catalog-progress\s*\{[^}]*position:\s*absolute[^}]*right:\s*14px[^}]*bottom:\s*6px[^}]*left:\s*14px/s);
  assert.match(toolsCss, /\.app-catalog-card\s*\{[^}]*position:\s*relative[^}]*grid-template-columns:\s*38px minmax\(0, 1fr\) auto/s);
  assert.match(toolsCss, /\.app-catalog-actions\s*\{[^}]*flex-direction:\s*column/s);
  assert.match(toolsCss, /\.app-catalog-description\s*\{[^}]*height:\s*calc\(2 \* 1\.45em\)[^}]*-webkit-line-clamp:\s*2/s);
  assert.doesNotMatch(toolsCss, /\.app-catalog-delete\.btn\s*\{[^}]*linear-gradient/s);
  assert.match(toolsCss, /\.app-catalog-icon\s*\{[^}]*color:\s*var\(--text-secondary\)[^}]*background:\s*color-mix\(in oklab, currentColor 5%/s);
  assert.match(toolsCss, /\.app-catalog-card\[data-category="radio"\]\s*\{\s*--app-category-color:\s*#3b82f6/);
  assert.match(toolsCss, /\.app-catalog-card\[data-category="games"\]\s*\{\s*--app-category-color:\s*#f59e0b/);
  assert.match(toolsCss, /\.app-catalog-tag\s*\{[^}]*color:\s*color-mix\(in oklab, var\(--app-category-color\) 78%[^}]*background:\s*color-mix\(in oklab, var\(--app-category-color\) 12%/s);
  assert.match(toolsCss, /\.app-category\.btn\[data-category="radio"\]\s*\{\s*--app-category-color:\s*#3b82f6/);
  assert.match(toolsCss, /\.app-category\.btn\.active\s*\{[^}]*var\(--app-category-color\) 84%[^}]*var\(--app-category-color\) 14%/s);
  assert.match(appCatalogSource, /catalogTabEl\.addEventListener\('click'.*if \(!loaded && !loading\) void load\(\)/s);
  assert.match(toolsCss, /\.apps-table-wrap tr\.app-slot-empty\s*\{\s*display:\s*none/);
  assert.doesNotMatch(html, /id="appEmptyReadBtn"/);
  assert.match(flashSource, /appRefreshBtn\.disabled = !serialSupported \|\| busy \|\| orderDirty/);
  assert.match(flashSource, /appRefreshBtn\.addEventListener\('click', \(\) => \{ void appRefreshFlow\(\); \}\)/);
  assert.doesNotMatch(flashSource, /MSG_APP_(?:ORDER|MOVE|SWAP)/);
});

test('reorders complete app slots through the existing raw flash protocol', () => {
  assert.match(html, /id="appOrderActions" hidden/);
  assert.match(html, /id="appOrderCancelBtn"[^>]+data-i18n="appOrderCancel"/);
  assert.match(html, /id="appOrderApplyBtn"[^>]+data-i18n="appOrderApply"/);
  assert.match(html, /id="appRenumberBtn"[^>]+data-i18n="appRenumber"[^>]+hidden/);
  assert.match(flashSource, /const APP_REGION_BASE = 0x102000/);
  assert.match(flashSource, /const APP_SLOT_STRIDE = 0x2000/);
  assert.match(flashSource, /async function appReadSlotImage/);
  assert.match(flashSource, /async function appWriteSlotImage/);
  assert.match(flashSource, /function appOrderDragStart\(slot, event\)/);
  assert.match(flashSource, /function appOrderDragOver\(targetSlot, event\)/);
  assert.match(flashSource, /appOrderDraft\.splice\(appOrderDropIndex, 0, slot\)/);
  assert.match(flashSource, /appsTableWrap\.scrollTop \+= 14/);
  assert.match(flashSource, /row\.draggable = visible && !busy/);
  assert.match(flashSource, /await readExternalFlashChunk\(base \+ offset, length, timestamp\)/);
  assert.match(flashSource, /await eraseExternalFlashSector\(address, timestamp\)/);
  assert.match(flashSource, /await appVerifySlotSector\(sector, address, timestamp, crcSupported\)/);
  assert.match(flashSource, /for \(const target of validateTargets\)[\s\S]*await appValidate\(target\)/);
  assert.ok(flashSource.indexOf('images.set(slot, await appReadSlotImage') <
    flashSource.indexOf('await appWriteSlotImage(move.target'));
  assert.match(toolsCss, /\.app-order-actions\[hidden\]\s*\{\s*display:\s*none/);
  assert.match(toolsCss, /\.app-renumber-button\[hidden\]\s*\{\s*display:\s*none/);
  assert.match(toolsCss, /\.apps-table-wrap\s*\{[^}]*overflow-anchor:\s*none/s);
  assert.match(toolsCss, /tr\.app-order-drop-before td\s*\{[^}]*box-shadow/s);
  assert.match(html, /css\/tools\.css\?v=59/);
  assert.match(html, /js\/flash\.js\?v=99/);
  assert.doesNotMatch(flashSource, /app-order-(?:up|down)/);
  assert.doesNotMatch(flashSource, /function appMoveInOrder/);

  const start = flashSource.indexOf('function appOrderIsDirty');
  const end = flashSource.indexOf('\n\nfunction appCanReorder', start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.moves = appOrderMoves;`,
    context
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(context.moves([0, 4, 9], [4, 9, 0]))),
    [{ target: 0, source: 4 }, { target: 4, source: 9 }, { target: 9, source: 0 }]
  );

  const renumberStart = flashSource.indexOf('function appRenumberMoves');
  const renumberEnd = flashSource.indexOf('\n\nfunction appCanRenumber', renumberStart);
  const renumberContext = {};
  vm.runInNewContext(
    `${flashSource.slice(renumberStart, renumberEnd)}; this.moves = appRenumberMoves;`,
    renumberContext
  );
  assert.deepEqual(
    JSON.parse(JSON.stringify(renumberContext.moves([0, 1, 3, 4, 5]))),
    [
      { target: 2, source: 3 },
      { target: 3, source: 4 },
      { target: 4, source: 5 },
      { target: 5, source: 2 }
    ]
  );
});

test('offers one-click updates for outdated multiboot firmware slots', () => {
  const slotsStart = html.indexOf('id="slotsTable"');
  const slotsEnd = html.indexOf('</table>', slotsStart);
  const slotsTable = html.slice(slotsStart, slotsEnd);
  assert.doesNotMatch(slotsTable, /data-i18n="appColUpdate"/);
  assert.ok(slotsTable.indexOf('data-i18n="slotColState"') < slotsTable.indexOf('data-i18n="appColActions"'));
  assert.match(flashSource, /className = 'btn table-icon-action is-primary slot-update-button'/);
  assert.match(flashSource, /eraseBtn\.hidden = true/);
  assert.match(flashSource, /resetBtn\.hidden = true/);
  assert.match(flashSource, /button\.hidden = !committed/);
  assert.match(flashSource, /actions\.appendChild\(updateBtn\);\s*actions\.appendChild\(eraseBtn\);\s*actions\.appendChild\(resetBtn\);/);
  assert.match(flashSource, /class="slot-actions"><div class="slot-actions-group"><\/div><\/td>/);
  assert.match(flashSource, /async function slotUpdateFlow/);
  assert.match(flashSource, /await slotWriteFlow\(\)/);
  assert.match(flashSource, /uvstudio:slotcatalogversions/);
  assert.match(toolsCss, /\.slot-update-button/);
});

test('marks an installed app only when the catalog has a newer version', () => {
  const start = flashSource.indexOf('function appVersionParts');
  const end = flashSource.indexOf('\n\nfunction appCatalogKey', start);
  assert.ok(start >= 0 && end > start);
  const context = {};
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.compare = appCompareVersions;`,
    context
  );

  assert.ok(context.compare('1.2.9', '1.3.0') < 0);
  assert.equal(context.compare('v1.3', '1.3.0'), 0);
  assert.ok(context.compare('2.0.0', '1.9.9') > 0);
  assert.equal(context.compare('development', '1.0.0'), null);
  assert.match(flashSource, /uvstudio:appcatalogversions/);
  assert.match(flashSource, /className = 'btn table-icon-action is-primary app-update-button'/);
  assert.match(flashSource, /className = 'btn table-icon-action is-danger app-act-delete'/);
  assert.match(flashSource, /className = 'btn table-icon-action is-danger slot-act-erase'/);
  assert.match(flashSource, /actions\.appendChild\(update\);\s*actions\.appendChild\(del\);/);
  assert.match(flashSource, /setTableActionIcon\(button, 'update', detail, targetVersion\)/);
  assert.match(flashSource, /await appInstallFlow\(\)/);
  const appsTable = html.slice(html.indexOf('id="appsTable"'), html.indexOf('</table>', html.indexOf('id="appsTable"')));
  assert.doesNotMatch(appsTable, /data-i18n="appColUpdate"/);
  assert.ok(appsTable.indexOf('data-i18n="slotColState"') < appsTable.indexOf('data-i18n="appColActions"'));
  assert.match(toolsCss, /\.app-update-button/);
  assert.match(toolsCss, /\.slot-actions\s*\{[^}]*width:\s*1%[^}]*text-align:\s*right/s);
  assert.match(toolsCss, /\.slot-actions-group\s*\{[^}]*display:\s*inline-flex/s);
  assert.match(toolsCss, /button\.table-icon-action\s*\{[^}]*width:\s*32px[^}]*background:\s*transparent/s);
  assert.match(toolsCss, /button\.table-icon-action svg\s*\{[^}]*width:\s*20px[^}]*stroke-width:\s*1\.9/s);
  assert.match(toolsCss, /button\.table-icon-action\.has-detail\s*\{[^}]*width:\s*auto[^}]*gap:\s*5px/s);
  assert.match(toolsCss, /\.table-action-detail\s*\{[^}]*font-family:\s*var\(--font-mono\)/s);
  assert.doesNotMatch(toolsCss, /table-icon-action\.is-(?:primary|danger)\s*\{\s*color:/);
  assert.match(flashSource, /function tableActionVersionLabel\(version\)/);
  assert.match(flashSource, /querySelector\('\.slot-version'\)\.textContent = committed \? \(tableActionVersionLabel\(hdr\.fwVersion\) \|\| '—'\)/);
  const labelStart = flashSource.indexOf('function tableActionVersionLabel');
  const labelEnd = flashSource.indexOf('\n\nfunction setTableActionIcon', labelStart);
  const labelContext = {};
  vm.runInNewContext(
    `${flashSource.slice(labelStart, labelEnd)}; this.label = tableActionVersionLabel;`,
    labelContext
  );
  assert.equal(labelContext.label('v1.8'), '1.8');
  assert.equal(labelContext.label('1.8'), '1.8');
  assert.match(flashSource, /update: '<svg class="table-action-update-icon"[^']+M21 12a9 9 0 1 1-3-6\.7[^']+M21 4v6h-6/);
  assert.match(toolsCss, /svg\.table-action-update-icon,\s*[^\{]*svg\.table-action-reset-icon\s*\{[^}]*stroke-width:\s*2/s);
  assert.match(flashSource, /reset: '<svg class="table-action-reset-icon"[^']+m7 21-4\.3-4\.3[^']+m5 11 9 9[^']+M7 21h15/);
  assert.match(flashSource, /delete: '<svg[^']+<path d="M3 6h18"/);
  assert.doesNotMatch(flashSource, /class="(?:app|slot)-update-cell"/);
});

test('checks installed apps against the detected Labs catalog', () => {
  const start = flashSource.indexOf('function appVersionParts');
  const end = flashSource.indexOf('\n\nconst appFileInput', start);
  assert.ok(start >= 0 && end > start);
  const context = {
    APP_SLOT_COUNT: 64,
    APP_V6_SLOT_COUNT: 48,
    APP_LEGACY_SLOT_COUNT: 16
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.extract = appFirmwareVersionFromName; this.slotCount = appSlotCountForFirmware;`,
    context
  );

  assert.equal(context.extract('F4HWN Labs v6.0.0'), '6.0.0');
  assert.equal(context.extract('F4HWN Labs v6.0'), '6.0.0');
  assert.equal(context.extract('F4HWN v6.1.0 beta'), '6.1.0');
  assert.equal(context.extract('unknown firmware'), '');
  assert.equal(context.slotCount('F4HWN Labs v6.1.0'), 16);
  assert.equal(context.slotCount('F4HWN Fusion v6.1.1'), 48);
  assert.equal(context.slotCount('F4HWN Fusion v6.2.0'), 48);
  assert.equal(context.slotCount('F4HWN Fusion v6.99.0'), 48);
  assert.equal(context.slotCount('F4HWN Fusion v7.0'), 64);
  assert.equal(context.slotCount('F4HWN Fusion v7.0.0'), 64);
  assert.equal(context.slotCount('F4HWN Fusion v7.1.0'), 64);
  assert.equal(context.slotCount('unknown firmware'), 16);
  assert.match(flashSource, /uvstudio:appfirmwareversion/);
  assert.match(flashSource, /uvstudio:appcatalogcompatibility/);
  assert.match(flashSource, /appStateFirmwareMismatch/);
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
      return true;
    },
    clearAppImage() {},
    log() {},
    t: key => key
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.load = loadAppFromURL;`,
    context
  );

  const loadedOk = await context.load(
    'https://example.test/archive/apps/v6.0.0/Beacon.app',
    'Beacon.app'
  );
  assert.deepEqual(Array.from(loaded.bytes), Array.from(expected));
  assert.equal(loaded.name, 'Beacon.app');
  assert.equal(loadedOk, true);
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
  assert.equal((html.match(/class="tag" data-i18n="studio_nav_labs_only" hidden/g) || []).length, 3);
  assert.match(studioCss, /\.nav-item-labs\s*\{[^}]*gap:\s*8px/);
  assert.match(studioCss, /\.nav-item-labs \.tag\s*\{[^}]*margin-left:\s*auto/);
  assert.match(studioCss, /\.nav-item-labs \.tag\s*\{[^}]*margin-right:\s*0/);
  assert.match(studioCss, /\.nav-item:disabled > svg,\s*\.nav-item:disabled \.nav-item-label\s*\{[^}]*opacity:\s*0\.5/s);
  assert.match(studioCss, /\.nav-item:disabled \.tag\s*\{[^}]*opacity:\s*1[^}]*filter:\s*none/s);
  assert.match(html, /css\/studio\.css\?v=28/);
});

test('adapts tool badges to the connected firmware generation', () => {
  const start = flashSource.indexOf('function firmwareUsesServiceNavigation');
  const end = flashSource.indexOf('\n\n// ========== UI UPDATE ==========', start);
  assert.ok(start >= 0 && end > start);

  const makeTag = () => ({
    hidden: false,
    textContent: '',
    setAttribute(name, value) { this[name] = value; }
  });
  const makeItem = () => ({
    dataset: {},
    title: '',
    setAttribute(name, value) { this[name] = value; },
    removeAttribute(name) { delete this[name]; }
  });
  const events = [];
  const context = {
    connectedFirmwareName: '',
    firmwareNavigationConnected: false,
    navigationCapabilities: null,
    appsNavigationTag: makeTag(),
    externalFlashNavigationTag: makeTag(),
    factoryResetNavigationTag: makeTag(),
    appsNavigationItem: makeItem(),
    externalFlashNavigationItem: makeItem(),
    factoryResetNavigationItem: makeItem(),
    t(key) { return key; },
    CustomEvent: class CustomEvent { constructor(type) { this.type = type; } },
    window: { dispatchEvent(event) { events.push(event.type); } }
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.applyPolicy = applyFirmwareNavigationPolicy; this.applyCapabilities = applyNavigationCapabilities; this.isService = firmwareUsesServiceNavigation; this.keepProfile = shouldKeepFirmwareNavigationProfile; this.clearOnSerialState = shouldClearFirmwareNavigationOnSerialState;`,
    context
  );

  assert.equal(context.isService('F4HWN v6.9.9'), false);
  assert.equal(context.isService('F4HWN v50'), false);
  assert.equal(context.isService('F4HWN v7.0.0'), true);
  assert.equal(context.isService('F4HWN v70'), true);
  assert.equal(context.isService('unknown'), false);
  assert.equal(context.keepProfile({ reason: 'navigation', nextOwner: 'viewer' }), true);
  assert.equal(context.keepProfile({ reason: 'handoff', nextOwner: 'tools' }), true);
  assert.equal(context.keepProfile({ reason: 'navigation', nextOwner: null }), false);
  assert.equal(context.keepProfile({ reason: 'user', nextOwner: 'viewer' }), false);
  assert.equal(context.clearOnSerialState({ state: 'disconnected', previousOwner: 'viewer', reason: 'navigation', nextOwner: 'tools' }), false);
  assert.equal(context.clearOnSerialState({ state: 'disconnected', previousOwner: 'viewer', reason: 'user' }), true);
  assert.equal(context.clearOnSerialState({ state: 'reconnecting', owner: 'viewer', reason: 'hardware-disconnect' }), true);

  context.applyPolicy('', false);
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);

  context.applyPolicy('F4HWN v6.9.9');
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);
  context.applyCapabilities({ apps: true, externalFlash: true });
  assert.equal(context.appsNavigationItem.dataset.capabilityKnown, 'true');
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityKnown, 'true');
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityKnown, 'true');
  assert.equal(context.appsNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);
  context.applyCapabilities({ apps: true, externalFlash: false });
  assert.equal(context.appsNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.appsNavigationTag.hidden, false);
  assert.equal(context.appsNavigationTag['data-i18n'], 'studio_nav_labs_only');
  assert.equal(context.externalFlashNavigationTag.hidden, false);
  assert.equal(context.externalFlashNavigationTag['data-i18n'], 'studio_nav_labs_only');
  assert.equal(context.factoryResetNavigationTag.hidden, false);
  assert.equal(context.factoryResetNavigationTag['data-i18n'], 'studio_nav_labs_only');
  context.applyCapabilities({ apps: false, externalFlash: true });
  assert.equal(context.appsNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityDisabled, 'true');
  context.applyCapabilities(null);
  assert.equal(context.appsNavigationItem.dataset.capabilityKnown, 'false');
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityKnown, 'false');
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityKnown, 'false');
  events.length = 0;

  context.applyPolicy('F4HWN v7.0.0');
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);
  context.applyCapabilities({ apps: true, externalFlash: false });
  assert.equal(context.appsNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.externalFlashNavigationTag.hidden, false);
  assert.equal(context.externalFlashNavigationTag['data-i18n'], 'studio_nav_service_only');
  assert.equal(context.factoryResetNavigationTag.hidden, false);
  assert.equal(context.factoryResetNavigationTag['data-i18n'], 'studio_nav_service_only');
  assert.equal(context.externalFlashNavigationItem['data-i18n-title'], 'studio_nav_unavailable_edition');
  assert.deepEqual(events, ['uvstudio:navigationcapabilitieschange']);
  context.applyCapabilities({ apps: false, externalFlash: true });
  assert.equal(context.appsNavigationItem.dataset.capabilityDisabled, 'true');
  assert.equal(context.appsNavigationTag.hidden, false);
  assert.equal(context.appsNavigationTag['data-i18n'], 'studio_nav_fusion_only');
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);
  context.applyCapabilities(null);
  assert.equal(context.externalFlashNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.factoryResetNavigationItem.dataset.capabilityDisabled, undefined);
  assert.equal(context.appsNavigationTag.hidden, true);
  assert.equal(context.externalFlashNavigationTag.hidden, true);
  assert.equal(context.factoryResetNavigationTag.hidden, true);
  assert.match(flashSource, /await requestDeviceInfo\(\{ timeoutMs: 1500 \}\)/);
  assert.match(flashSource, /const name = logDeviceInfo\(resp\.data\);\s+applyFirmwareNavigationPolicy\(name\)/);
  assert.match(flashSource, /appInfo\(APP_SLOT_FIRST, NAVIGATION_PROBE_TIMEOUT_MS\)/);
  assert.match(flashSource, /deviceInfo\.timestamp, NAVIGATION_PROBE_TIMEOUT_MS, 0/);
  assert.match(studioSource, /item\.dataset\.capabilityDisabled === "true"/);
  assert.match(studioSource, /uvstudio:navigationcapabilitieschange/);

  const localeDir = path.join(root, 'locales');
  fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file)).forEach(file => {
    const localeContext = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), localeContext);
    const dictionary = localeContext.window.UVSTUDIO_LOCALES[file.slice(0, 2)];
    assert.ok(dictionary.studio_nav_service_only, `${file}: service-only badge`);
    assert.ok(dictionary.studio_nav_fusion_only, `${file}: Fusion-only badge`);
    assert.ok(dictionary.studio_nav_unavailable_edition, `${file}: unavailable edition title`);
  });
});

test('detects the firmware profile when Live Viewer owns the serial port', () => {
  assert.match(html, /js\/runtime-protocol\.js\?v=2/);
  assert.match(html, /js\/k5viewer\.js\?v=37/);
  assert.match(viewerSource, /PROFILE_MSG_DEVICE_INFO_REQUEST = 0x0514/);
  assert.match(viewerSource, /PROFILE_MSG_APP_INFO = 0x0730/);
  assert.match(viewerSource, /PROFILE_MSG_EXTERNAL_FLASH_READ = 0x0738/);
  assert.match(viewerSource, /void detectViewerFirmwareProfile\(connectionSession\)/);
  assert.match(viewerSource, /if \(reconnected\) \{\s*firstFrameAfterReconnect = false;\s*void detectViewerFirmwareProfile\(serialSession\)/);
  assert.doesNotMatch(viewerSource, /setState\('connected', \{ reason: 'auto-reconnect' \}\);\s*void detectViewerFirmwareProfile/);
  assert.match(viewerSource, /new CustomEvent\('uvstudio:firmwareprofiledetected'/);
  assert.match(flashSource, /addEventListener\('uvstudio:firmwareprofiledetected'/);
  assert.match(flashSource, /snapshot\?\.owner !== 'viewer'/);
  assert.match(flashSource, /applyFirmwareNavigationPolicy\(detail\.name, true\)/);
  assert.match(flashSource, /applyNavigationCapabilities\(detail\.capabilities\)/);
});

test('keeps edition-mismatched navigation disabled across serial state changes', () => {
  const start = studioSource.indexOf('function applyNavigationDisabledState');
  const end = studioSource.indexOf('\n\n    function applyBranding', start);
  assert.ok(start >= 0 && end > start);

  const makeItem = (unavailable, route) => {
    const classes = new Set();
    return {
      dataset: Object.assign({ route, capabilityKnown: 'true' }, unavailable ? { capabilityDisabled: 'true' } : {}),
      disabled: false,
      classList: {
        toggle(name, force) { if (force) classes.add(name); else classes.delete(name); },
        contains(name) { return classes.has(name); }
      },
      setAttribute(name, value) { this[name] = value; },
      removeAttribute(name) { delete this[name]; }
    };
  };
  const unavailable = makeItem(true, 'apps');
  const current = makeItem(false, 'firmware-slots');
  const other = makeItem(false, 'external-flash');
  const context = {
    items: [unavailable, current, other],
    currentItem: current,
    lastSerialSnapshot: { state: 'disconnected', operation: null },
    editionSensitiveRoutes: new Set(['apps', 'external-flash', 'factory-reset']),
    renderEditionContentState() {}
  };
  vm.runInNewContext(
    `${studioSource.slice(start, end)}; this.applyDisabledState = applyNavigationDisabledState;`,
    context
  );

  context.applyDisabledState();
  assert.equal(unavailable.disabled, true);
  assert.equal(current.disabled, false);
  assert.equal(other.disabled, false);
  assert.equal(unavailable.classList.contains('is-edition-disconnected'), true);
  assert.equal(current.classList.contains('is-edition-disconnected'), false);
  assert.equal(other.classList.contains('is-edition-disconnected'), true);

  context.lastSerialSnapshot = { state: 'connected', operation: { name: 'test' } };
  context.applyDisabledState();
  assert.equal(unavailable.disabled, true);
  assert.equal(current.disabled, false);
  assert.equal(other.disabled, true);
  assert.equal(unavailable.classList.contains('is-edition-disconnected'), false);
  assert.equal(other.classList.contains('is-edition-disconnected'), false);

  delete other.dataset.capabilityKnown;
  context.lastSerialSnapshot = { state: 'connected', operation: null };
  context.applyDisabledState();
  assert.equal(other.disabled, false);
  assert.equal(other.classList.contains('is-edition-disconnected'), true);
});

test('replaces stale edition-sensitive content with an inline connection state', () => {
  assert.match(html, /id="edition-state-content"[^>]+role="status"[^>]+aria-live="polite"/);
  assert.match(toolsCss, /#pane-tools \.edition-state\.active\s*\{[^}]*display:\s*flex/s);
  assert.match(toolsCss, /#pane-tools\.showing-edition-state \.log-container/);

  const start = studioSource.indexOf('function showToolView');
  const end = studioSource.indexOf('\n\n    async function ensureRuntimeSerial', start);
  assert.ok(start >= 0 && end > start);

  const makeClassList = initial => {
    const classes = new Set(initial || []);
    return {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      toggle(name, force) { if (force) classes.add(name); else classes.delete(name); },
      contains(name) { return classes.has(name); }
    };
  };
  const appsView = {
    id: 'apps-content', hidden: false, classList: makeClassList(['active'])
  };
  const editionStateView = {
    id: 'edition-state-content', hidden: true, dataset: {}, classList: makeClassList()
  };
  const paneTools = { classList: makeClassList() };
  const currentItem = {
    dataset: {
      app: 'tools', route: 'apps', toolView: 'apps', capabilityKnown: 'true', capabilityDisabled: 'true'
    }
  };
  const context = {
    toolViews: [appsView, editionStateView],
    paneTools,
    editionStateView,
    editionStateTitle: { textContent: '' },
    editionStateBody: { textContent: '' },
    currentItem,
    lastSerialSnapshot: { state: 'connected' },
    editionSensitiveRoutes: new Set(['apps', 'external-flash', 'factory-reset']),
    activateToolAction() {},
    translate(key) { return key; }
  };
  vm.runInNewContext(
    `${studioSource.slice(start, end)}; this.renderEditionState = renderEditionContentState;`,
    context
  );

  context.renderEditionState();
  assert.equal(appsView.hidden, true);
  assert.equal(editionStateView.hidden, false);
  assert.equal(editionStateView.dataset.state, 'unavailable');
  assert.equal(context.editionStateTitle.textContent, 'studio_nav_unavailable_edition');
  assert.equal(context.editionStateBody.textContent, 'studio_edition_unavailable_body');
  assert.equal(paneTools.classList.contains('showing-edition-state'), true);

  context.lastSerialSnapshot = { state: 'disconnected' };
  context.renderEditionState();
  assert.equal(editionStateView.dataset.state, 'disconnected');
  assert.equal(context.editionStateTitle.textContent, 'studio_serial_disconnected');
  assert.equal(context.editionStateBody.textContent, 'appManagerConnectHint');

  delete currentItem.dataset.capabilityDisabled;
  context.lastSerialSnapshot = { state: 'connected' };
  context.renderEditionState();
  assert.equal(appsView.hidden, false);
  assert.equal(editionStateView.hidden, true);
  assert.equal(paneTools.classList.contains('showing-edition-state'), false);

  delete currentItem.dataset.capabilityKnown;
  context.renderEditionState();
  assert.equal(editionStateView.dataset.state, 'disconnected');
  assert.equal(editionStateView.hidden, false);
});

test('keeps compact app and firmware controls usable on narrow screens', () => {
  assert.match(toolsCss, /@media \(max-width:\s*640px\)[\s\S]*\.slots-table tbody tr[\s\S]*grid-template-areas/);
  assert.match(toolsCss, /\.apps-table-wrap \.slots-table tbody tr\.app-slot-pending[^{]*\{\s*display:\s*none/);
  assert.match(html, /<aside class="info-box" id="infoBox">/);
  assert.doesNotMatch(html, /<summary[^>]*data-i18n="studio_about_compatibility"/);
  assert.doesNotMatch(viewerSource, /showNotification\('app_loaded'/);
  assert.match(coreCss, /\[data-theme="dark"\] \.btn\.danger\s*\{[^}]*background:[^}]*#dc2626/s);
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
  const end = flashSource.indexOf('\n\n// Safety gate for External Flash', start);
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

test('keeps app management and catalog descriptions translated in every locale', () => {
  const localeDir = path.join(root, 'locales');
  const files = fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file));
  const dictionaries = Object.fromEntries(files.map(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    return [file.slice(0, 2), context.window.UVSTUDIO_LOCALES[file.slice(0, 2)]];
  }));
  const english = dictionaries.en;
  const languageInvariants = { de: new Set(['appColName']) };
  const required = [
    'appsDescription', 'appColName', 'appFileLabel', 'appTargetLabel',
    'appInstallBtn', 'appDelete', 'appDetected', 'appTooBig', 'appBadFile',
    'appsScanning', 'appsScanDone', 'appsError', 'appInstalling', 'appInstalled',
    'appInstalledIncompatible', 'appErasing', 'appErased', 'appVerifying',
    'appStateValid', 'appStateBadSlot', 'appStateEmpty', 'appStateAbi',
    'appStateIncomplete', 'appStateBadSize', 'appStateCrc', 'appStateVma',
    'appStateAuth', 'appStateCap', 'infoBoxApps', 'appManagerEyebrow',
    'appManagerRadioPending', 'appManagerConnectHint', 'appManagerTabsLabel',
    'appManagerInstalled', 'appManagerCatalog', 'appManagerOnRadio',
    'appManagerInstalledHint', 'appManagerCategories', 'appCategoryAll',
    'appCategoryRadio', 'appCategoryTools', 'appCategoryGames', 'appCategoryDemos',
    'appManagerSearch', 'appManagerNoResults', 'appManagerLocalInstall',
    'appManagerNoInstalled', 'appManagerInstalledCount', 'appManagerCapacity',
    'appManagerCheckingCompatibility', 'appManagerCatalogCompatible',
    'appManagerCatalogUnavailable', 'appManagerResultCount', 'appManagerForFirmware',
    'appManagerScanBeforeInstall', 'appManagerNoFreeSlot',
    ...Object.keys(english).filter(key => key.startsWith('appDescription_'))
  ];
  Object.entries(dictionaries).forEach(([language, dictionary]) => {
    if (language === 'en') return;
    required.forEach(key => {
      assert.ok(dictionary[key], `${language}:${key}`);
      if (!languageInvariants[language]?.has(key))
        assert.notEqual(dictionary[key], english[key], `${language}:${key} still English`);
    });
    Object.keys(english).forEach(key => {
      const placeholders = value => [...String(value).matchAll(/\{[^}]+\}/g)].map(match => match[0]).sort();
      assert.deepEqual(placeholders(dictionary[key]), placeholders(english[key]), `${language}:${key} placeholders`);
    });
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
    'studio_serial_connected',
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
  assert.match(html, /id="studioSerialDisconnect"[^>]*\bhidden\b[^>]*data-i18n-title="disconnect"/);
  assert.match(html, /data-i18n-aria-label="radio_led_state"/);
});

test('requires one reusable runtime connection for every menu except Flash and About', () => {
  assert.match(studioSource, /const isFirmwareFlash = app === "tools" && toolView === "flash"/);
  assert.match(studioSource, /const requiresRuntimeSerial = Boolean\(serialOwner\) && !isFirmwareFlash/);
  assert.match(studioSource, /activate\(item, \{ ensureSerial: true \}\)/);
  assert.match(studioSource, /await ensureRuntimeSerial\("tools"\)/);
  assert.match(viewerSource, /uvstudio:serialrequired/);
  assert.match(flashSource, /uvstudio:serialrequired/);
  assert.match(flashSource, /connect\(\{ reuse: false, remember: false \}\)/);
  assert.match(flashSource, /hardwareDisconnect && activePort\) toolsSerial\.forgetPort\(activePort\)/);
  assert.match(viewerSource, /if \(port\) viewerSerial\.forgetPort\(port\)/);
  assert.match(flashSource, /nextView === 'slots' && port && writer &&[\s\S]{0,80}void slotRefreshFlow\(\)/);
  assert.match(serialSource, /ports\.filter\(matches\)/);
  assert.match(flashSource, /view === 'apps' && navigationCapabilities\?\.apps === true/);
  assert.match(flashSource, /canAttempt: \(\) => toolsViewUsesRuntimeSerial\(\) &&[\s\S]{0,100}!activeOperationToken/);

  const calibrationDump = flashSource.slice(
    flashSource.indexOf("beginToolsOperation('dump-calibration'"),
    flashSource.indexOf('\nfunction flashAddress')
  );
  assert.doesNotMatch(calibrationDump, /await disconnect\(\)/);
});

function loadToolsHardwareDisconnect(state) {
  const start = flashSource.indexOf('async function handleToolsHardwareDisconnect');
  const end = flashSource.indexOf('\n\nasync function reconnectToolsPort', start);
  assert.ok(start >= 0 && end > start);
  const calls = [];
  const context = Object.assign({
    activeToolsView: 'apps',
    port: {},
    toolsLastPortInfo: {},
    toolsHardwareDisconnectPromise: null,
    toolsRefreshPending: false,
    toolsViewUsesRuntimeSerial() { return context.activeToolsView !== 'flash'; },
    async disconnectPort(details) {
      calls.push(['disconnect', details.reason]);
      context.port = null;
    },
    toolsReconnect: {
      start(info) { calls.push(['start', info]); }
    },
    log() {},
    t(key) { return key; }
  }, state);
  context.toolsSerial = {
    isOwner: () => true,
    async release(reason) { calls.push(['release', reason]); context.port = null; },
    setState(nextState) { calls.push(['state', nextState]); }
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.run = handleToolsHardwareDisconnect;`,
    context
  );
  return { run: context.run, calls };
}

function loadDisconnectPort() {
  const start = flashSource.indexOf('async function disconnectPort');
  const end = flashSource.indexOf('\n\nconst toolsSerial', start);
  assert.ok(start >= 0 && end > start);
  const lostPort = {};
  const calls = [];
  const context = {
    port: lostPort,
    reader: {},
    writer: {},
    isReading: true,
    toolsSerialSession: 0,
    toolsSerial: {
      forgetPort(value) { calls.push(['forget', value]); }
    },
    stopToolsReconnect() { calls.push(['stop']); },
    shouldKeepFirmwareNavigationProfile(context) {
      return (context?.reason === 'navigation' || context?.reason === 'handoff') &&
        (context?.nextOwner === 'tools' || context?.nextOwner === 'viewer');
    },
    clearFirmwareNavigationProfile() {
      calls.push(['policy', '', false], ['capabilities', null]);
    },
    notifySerialRead() {},
    log() {},
    t(key) { return key; },
    window: {
      UVStudioSerial: {
        async closeResources(resources) { calls.push(['close', resources.port]); }
      }
    }
  };
  vm.runInNewContext(
    `${flashSource.slice(start, end)}; this.run = disconnectPort;`,
    context
  );
  return { run: context.run, calls, lostPort };
}

test('forgets a reusable runtime port when the USB device is physically removed', async () => {
  const { run, calls, lostPort } = loadDisconnectPort();
  await run({ reason: 'hardware-disconnect' });
  assert.deepEqual(calls, [
    ['forget', lostPort],
    ['close', lostPort],
    ['policy', '', false],
    ['capabilities', null]
  ]);
});

test('keeps the detected edition while handing the runtime port to UV Viewer', async () => {
  const { run, calls, lostPort } = loadDisconnectPort();
  await run({ reason: 'navigation', nextOwner: 'viewer' });
  assert.deepEqual(calls, [
    ['stop'],
    ['close', lostPort]
  ]);
});

test('keeps UV Tools ownership and starts one reconnect loop after a runtime disconnect', async () => {
  const { run, calls } = loadToolsHardwareDisconnect();
  await Promise.all([run(), run()]);   // disconnect event + read loop ending
  assert.deepEqual(calls, [
    ['disconnect', 'hardware-disconnect'],
    ['state', 'reconnecting'],
    ['start', {}]
  ]);
});

test('uses the same reconnect path for Apps and Firmware Slots but excludes firmware flashing', async () => {
  const slots = loadToolsHardwareDisconnect({ activeToolsView: 'slots' });
  await slots.run();
  assert.deepEqual(slots.calls, [
    ['disconnect', 'hardware-disconnect'],
    ['state', 'reconnecting'],
    ['start', {}]
  ]);

  const flash = loadToolsHardwareDisconnect({ activeToolsView: 'flash' });
  await flash.run();
  assert.deepEqual(flash.calls, [['release', 'hardware-disconnect']]);
});

test('keeps compatibility gates silent and before destructive confirmations', () => {
  const localeDir = path.join(root, 'locales');
  fs.readdirSync(localeDir).filter(file => /^[a-z]{2}\.js$/.test(file)).forEach(file => {
    const context = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(localeDir, file), 'utf8'), context);
    const dictionary = context.window.UVSTUDIO_LOCALES[file.slice(0, 2)];
    assert.ok(dictionary.studio_edition_unavailable_body, `${file}:inline unavailable state`);
    assert.equal('labsRequiredTitle' in dictionary, false, `${file}:obsolete modal title`);
    assert.equal('labsRequiredBody' in dictionary, false, `${file}:obsolete modal body`);
    assert.doesNotMatch(dictionary.flashUnsupported, /Labs|Fusion|Service/i, `${file}:generic guard log`);
  });
  assert.doesNotMatch(html, /id="labsRequiredModal"/);
  assert.doesNotMatch(flashSource, /showLabsRequiredModal|labsRequiredBody/);

  // Destructive restores ask for confirmation only once support is known.
  const gateThen = (from, confirm) => {
    const start = flashSource.indexOf(from);
    assert.ok(start >= 0, from);
    const gate = flashSource.indexOf('hasExternalFlashSupport(', start);
    const ask = flashSource.indexOf(confirm, start);
    assert.ok(gate > start && ask > gate, `${from}: gate before ${confirm}`);
  };
  gateThen('async function runFactoryReset', "showFactoryResetModal('confirm'");
  gateThen("beginToolsOperation('restore-flash'", 'confirmExternalFlashRestore()');
});
