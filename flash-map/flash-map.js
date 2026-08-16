"use strict";

/*
 * F4HWN external-flash map.
 *
 * Maintenance rule: physical ranges are inclusive. Update FLASH_MAP.meta.updated,
 * the constants/ranges below, and the bilingual labels together. The UI, sizes,
 * slot boundaries and overview proportions are generated from this data.
 */

const FLASH_MAP = {
  meta: {
    updated: "2026-08-16",
    flashSize: 0x200000,
    eraseSize: 0x1000,
    programSize: 0x100,
  },
  multiboot: {
    slotBase: 0x020000,
    slotStride: 0x020000,
    slotCount: 4,
    imageOffset: 0x001000,
    maxImageSize: 0x01D800,
    headerSize: 64,
    internalDestination: 0x08002800,
  },
  overview: [
    { id: "shared", start: 0x000000, end: 0x011FFF, kind: "shared", target: "radio-data", short: { fr: "Radio", en: "Radio" } },
    { id: "gap-low", start: 0x012000, end: 0x01FFFF, kind: "free", target: "unused", short: { fr: "Libre", en: "Free" } },
    { id: "slot-0", start: 0x020000, end: 0x03FFFF, kind: "slot", target: "slots", short: { fr: "S0", en: "S0" } },
    { id: "slot-1", start: 0x040000, end: 0x05FFFF, kind: "slot", target: "slots", short: { fr: "S1", en: "S1" } },
    { id: "slot-2", start: 0x060000, end: 0x07FFFF, kind: "slot", target: "slots", short: { fr: "S2", en: "S2" } },
    { id: "slot-3", start: 0x080000, end: 0x09FFFF, kind: "slot", target: "slots", short: { fr: "S3", en: "S3" } },
    { id: "gap-mid", start: 0x0A0000, end: 0x14BFFF, kind: "free", target: "unused", short: { fr: "Non attribué", en: "Unallocated" } },
    { id: "voice", start: 0x14C000, end: 0x1DFFFF, kind: "voice", target: "voice-log", short: { fr: "Voix", en: "Voice" } },
    { id: "log", start: 0x1E0000, end: 0x1E7FFF, kind: "log", target: "voice-log", short: { fr: "Log", en: "Log" } },
    { id: "gap-high", start: 0x1E8000, end: 0x1FFFFF, kind: "free", target: "unused", short: { fr: "Libre", en: "Free" } },
  ],
  sections: [
    {
      id: "radio-data", wide: true, range: [0x000000, 0x00FFFF],
      title: { fr: "Données radio partagées", en: "Shared radio data" },
      rows: [
        [0x000000, 0x003FFF, { fr: "1024 canaux mémoire × 16 octets", en: "1024 memory channels × 16 bytes" }],
        [0x004000, 0x007FFF, { fr: "Noms des 1024 canaux × 16 octets ; 10 caractères utilisés", en: "1024 channel names × 16 bytes; 10 characters used" }],
        [0x008000, 0x00880D, { fr: "Attributs de 1024 canaux + 7 VFO × 2 octets : bande, compander, listes de scan…", en: "Attributes for 1024 channels + 7 VFOs × 2 bytes: band, compander, scan lists…" }],
        [0x00880E, 0x00886D, { fr: "Noms des 24 listes de scan × 4 caractères", en: "Names of 24 scan lists × 4 characters" }],
        [0x00886E, 0x008FFF, { fr: "Non attribué dans le mapping actuel", en: "Unallocated in the current mapping" }],
        [0x009000, 0x0090DF, { fr: "7 bandes × 2 VFO × 16 octets", en: "7 bands × 2 VFOs × 16 bytes" }],
        [0x0090E0, 0x0090E6, { fr: "Configuration Fox Hunt", en: "Fox Hunt configuration" }],
        [0x0090E7, 0x009FFF, { fr: "Non attribué", en: "Unallocated" }],
        [0x00A000, 0x00A16F, { fr: "Paramètres F4HWN détaillés ci-dessous", en: "F4HWN settings detailed below" }],
        [0x00A170, 0x00FFFF, { fr: "Non attribué / réserve", en: "Unallocated / reserved" }],
      ],
      record: [
        ["+00…03", { fr: "Fréquence RX", en: "RX frequency" }],
        ["+04…07", { fr: "Offset TX", en: "TX offset" }],
        ["+08", { fr: "Code RX", en: "RX code" }],
        ["+09", { fr: "Code TX", en: "TX code" }],
        ["+0A", { fr: "Types de codes", en: "Code types" }],
        ["+0B", { fr: "Modulation / shift", en: "Modulation / shift" }],
        ["+0C", { fr: "Puissance / BW / locks", en: "Power / BW / locks" }],
        ["+0D…0F", { fr: "DTMF / pas / réserve", en: "DTMF / step / reserved" }],
      ],
      recordTitle: { fr: "Structure d’un canal mémoire (16 octets)", en: "Memory-channel record layout (16 bytes)" },
    },
    {
      id: "settings", range: [0x00A000, 0x00AFFF],
      title: { fr: "Paramètres F4HWN", en: "F4HWN settings" },
      rows: [
        [0x00A000, 0x00A00F, { fr: "Audio, SQL, TOT, locks, VOX, rétroéclairage, dual watch, état courant…", en: "Audio, SQL, TOT, locks, VOX, backlight, dual watch, current state…" }],
        [0x00A010, 0x00A01F, { fr: "Index des canaux/VFO affichés pour A et B, index NOAA", en: "Displayed channel/VFO indexes for A and B, NOAA indexes" }],
        [0x00A020, 0x00A027, { fr: "État du récepteur FM", en: "FM receiver state" }],
        [0x00A028, 0x00A087, { fr: "48 mémoires FM × 2 octets", en: "48 FM memories × 2 bytes" }],
        [0x00A088, 0x00A0A7, { fr: "Réservé", en: "Reserved" }],
        [0x00A0A8, 0x00A0C7, { fr: "Touches, scan, mot de passe, voix, correction RSSI, alarmes, Roger, VFO TX…", en: "Keys, scan, password, voice, RSSI correction, alarms, Roger, TX VFO…" }],
        [0x00A0C8, 0x00A0E7, { fr: "Deux lignes d’accueil de 16 octets ; la première sert aussi d’indicatif Fox Hunt", en: "Two 16-byte welcome lines; the first is also used as the Fox Hunt callsign" }],
        [0x00A0E8, 0x00A0F7, { fr: "Réglages et temporisations DTMF", en: "DTMF settings and timings" }],
        [0x00A0F8, 0x00A12F, { fr: "ANI, kill/revive et séquences DTMF up/down", en: "ANI, kill/revive and DTMF up/down sequences" }],
        [0x00A130, 0x00A137, { fr: "Liste de scan active, priorités, canal d’appel", en: "Active scan list, priorities, call channel" }],
        [0x00A138, 0x00A147, { fr: "Clé AES personnalisée", en: "Custom AES key" }],
        [0x00A148, 0x00A14F, { fr: "Réglages Spectrum", en: "Spectrum settings" }],
        [0x00A150, 0x00A157, { fr: "Restrictions TX, DTMF live, batterie, barre micro, rétroéclairage RX/TX", en: "TX restrictions, live DTMF, battery, microphone bar, RX/TX backlight" }],
        [0x00A158, 0x00A15F, { fr: "Options de build et paramètres spécifiques F4HWN", en: "Build options and F4HWN-specific settings" }],
        [0x00A160, 0x00A16F, { fr: "Chaîne de version du firmware", en: "Firmware version string" }],
      ],
      note: { fr: "Le reste du secteur 0x00A000 est actuellement réservé.", en: "The remainder of sector 0x00A000 is currently reserved." },
    },
    {
      id: "calibration-logo", range: [0x010000, 0x011FFF],
      title: { fr: "Calibration et logo", en: "Calibration and logo" },
      rows: [
        [0x010000, 0x0100BF, { fr: "Tables de squelch UHF et VHF", en: "UHF and VHF squelch tables" }],
        [0x0100C0, 0x0100CF, { fr: "Calibration RSSI", en: "RSSI calibration" }],
        [0x0100D0, 0x01013F, { fr: "Calibration de puissance TX : 7 bandes × 16 octets (low/mid/high + réserve)", en: "TX power calibration: 7 bands × 16 bytes (low/mid/high + spare)" }],
        [0x010140, 0x01014B, { fr: "Calibration batterie", en: "Battery calibration" }],
        [0x010150, 0x010163, { fr: "Seuils VOX1, niveaux 0 à 9", en: "VOX1 thresholds, levels 0 to 9" }],
        [0x010168, 0x01017B, { fr: "Seuils VOX0, niveaux 0 à 9", en: "VOX0 thresholds, levels 0 to 9" }],
        [0x010188, 0x01018F, { fr: "Correction quartz, valeurs BK4819, gains volume et DAC", en: "Crystal correction, BK4819 values, volume and DAC gains" }],
        [0x011000, 0x011007, { fr: "En-tête du logo, réservé", en: "Reserved logo header" }],
        [0x011008, 0x011407, { fr: "Bitmap 128 × 64 monochrome au format ST7565", en: "128 × 64 monochrome bitmap in ST7565 format" }],
        [0x011408, 0x011FFF, { fr: "Reste du secteur logo, réservé", en: "Remainder of the logo sector, reserved" }],
      ],
      note: { fr: "Fenêtre de calibration réservée : 0x010000–0x0101FF (512 octets).", en: "Reserved calibration window: 0x010000–0x0101FF (512 bytes)." },
    },
    {
      id: "slots", wide: true, range: [0x020000, 0x09FFFF],
      title: { fr: "Slots firmware multiboot", en: "Multiboot firmware slots" },
      slotSection: true,
      rows: [
        ["slot + 0x0000", "0x003F", { fr: "En-tête FMB1 de 64 octets : magic, version, flags, taille, CRC32, nom et version", en: "64-byte FMB1 header: magic, version, flags, size, CRC32, name and version" }],
        ["slot + 0x1000", "0x1E7FF", { fr: "Image binaire, 118 Kio maximum, destinée à la Flash interne 0x08002800", en: "Binary image, up to 118 KiB, targeting internal Flash at 0x08002800" }],
        ["slot + 0x1E800", "0x1FFFF", { fr: "Marge de 6 Kio après l’image maximale", en: "6 KiB spare area after the maximum image" }],
      ],
    },
    {
      id: "voice-log", range: [0x14C000, 0x1E7FFF],
      title: { fr: "Voix et journal", en: "Voice data and log" },
      rows: [
        [0x14C000, 0x14C7FF, { fr: "Index des clips vocaux chinois", en: "Chinese voice-clip index" }],
        [0x14C800, 0x14CFFF, { fr: "Index des clips vocaux anglais", en: "English voice-clip index" }],
        [0x14D000, 0x1DFFFF, { fr: "Zone des données audio référencées par les index", en: "Audio data area referenced by the indexes" }],
        [0x1E0000, 0x1E7FFF, { fr: "Journal circulaire RX/TX : 1024 entrées × 32 octets", en: "Circular RX/TX log: 1024 entries × 32 bytes" }],
      ],
    },
    {
      id: "unused", range: [0x012000, 0x1FFFFF],
      title: { fr: "Zones non attribuées", en: "Unallocated areas" },
      rows: [
        [0x012000, 0x01FFFF, { fr: "Non attribué", en: "Unallocated" }],
        [0x0A0000, 0x14BFFF, { fr: "Non attribué par F4HWN", en: "Unallocated by F4HWN" }],
        [0x1E8000, 0x1FFFFF, { fr: "Non attribué", en: "Unallocated" }],
      ],
      note: { fr: "« Non attribué » décrit le code F4HWN actuel ; un autre firmware peut employer ces adresses.", en: "“Unallocated” describes the current F4HWN code; another firmware may use these addresses." },
    },
  ],
};

const I18N = {
  fr: {
    eyebrow: "F4HWN · Référence développeur",
    title: "Carte de la Flash externe",
    subtitle: "PY25Q16 · 2 Mio · offsets physiques 0x000000 à 0x1FFFFF",
    overviewTitle: "Vue globale",
    overviewSubtitle: "Effacement par secteurs de 4 Kio · programmation par pages de 256 octets",
    updated: "Mise à jour :",
    sourceTitle: "Sources :",
    sourceIntro: "cette carte est dérivée des constantes et des accès physiques du firmware.",
    mappingWarning: "Les paramètres, canaux, calibrations et logo sont partagés ; les slots multiboot ne contiennent que les images de firmware et leurs métadonnées.",
    address: "Adresses inclusives",
    size: "Taille",
    content: "Contenu",
    record: "Enregistrement",
    slot: "Slot",
    header: "Secteur header",
    image: "Image",
    spare: "Réserve",
    legend: { shared: "Données partagées", slot: "Images multiboot", voice: "Données vocales", log: "Journal RX/TX", free: "Non attribué / réservé" },
  },
  en: {
    eyebrow: "F4HWN · Developer reference",
    title: "External Flash map",
    subtitle: "PY25Q16 · 2 MiB · physical offsets 0x000000 to 0x1FFFFF",
    overviewTitle: "Overview",
    overviewSubtitle: "4 KiB erase sectors · 256-byte program pages",
    updated: "Updated:",
    sourceTitle: "Sources:",
    sourceIntro: "this map is derived from the firmware constants and physical accesses.",
    mappingWarning: "Settings, channels, calibration and logo are shared; multiboot slots contain only firmware images and their metadata.",
    address: "Inclusive addresses",
    size: "Size",
    content: "Contents",
    record: "Record",
    slot: "Slot",
    header: "Header sector",
    image: "Image",
    spare: "Spare",
    legend: { shared: "Shared data", slot: "Multiboot images", voice: "Voice data", log: "RX/TX log", free: "Unallocated / reserved" },
  },
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const text = (value, language) => typeof value === "string" ? value : value[language];
const rangeSize = (start, end) => end - start + 1;

function hex(value, width = 6) {
  if (typeof value === "string") return value;
  return `0x${value.toString(16).toUpperCase().padStart(width, "0")}`;
}

function formatSize(bytes, language) {
  if (bytes >= 1024 && bytes % 1024 === 0) return `${bytes / 1024} ${language === "fr" ? "Kio" : "KiB"}`;
  return `${bytes} ${language === "fr" ? "o" : bytes === 1 ? "byte" : "bytes"}`;
}

function make(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined) element.textContent = content;
  return element;
}

function getInitialLanguage() {
  const query = new URLSearchParams(window.location.search).get("lang");
  if (query === "fr" || query === "en") return query;
  let stored = null;
  try {
    stored = window.localStorage.getItem("f4hwn-flash-map-language");
  } catch (_) {
    // Some browsers restrict storage for file:// pages; language selection still works.
  }
  if (stored === "fr" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
}

function validateFlashMap() {
  let expectedStart = 0;
  for (const zone of FLASH_MAP.overview) {
    if (zone.start !== expectedStart || zone.end < zone.start) {
      throw new Error(`Invalid overview range near ${zone.id}: expected ${hex(expectedStart)}, found ${hex(zone.start)}–${hex(zone.end)}`);
    }
    expectedStart = zone.end + 1;
  }
  if (expectedStart !== FLASH_MAP.meta.flashSize) {
    throw new Error(`Overview covers ${hex(expectedStart)} bytes instead of ${hex(FLASH_MAP.meta.flashSize)}`);
  }
}

function renderOverview(language) {
  const bar = $("#memory-bar");
  bar.replaceChildren();
  for (const zone of FLASH_MAP.overview) {
    const bytes = rangeSize(zone.start, zone.end);
    const button = make("button", `memory-segment kind-${zone.kind}`);
    button.type = "button";
    button.style.flexGrow = String(bytes);
    button.dataset.target = zone.target;
    button.title = `${text(zone.short, language)} · ${hex(zone.start)}–${hex(zone.end)} · ${formatSize(bytes, language)}`;
    button.append(make("strong", "", text(zone.short, language)), make("span", "", formatSize(bytes, language)));
    bar.append(button);
  }

  const legend = $("#map-legend");
  legend.replaceChildren();
  for (const kind of ["shared", "slot", "voice", "log", "free"]) {
    const item = make("span", "legend-item");
    item.append(make("i", `legend-swatch kind-${kind}`), document.createTextNode(I18N[language].legend[kind]));
    legend.append(item);
  }
}

function renderTable(section, language) {
  const table = make("table", "map-table");
  const head = document.createElement("thead");
  const headRow = document.createElement("tr");
  for (const label of [I18N[language].address, I18N[language].size, I18N[language].content]) {
    headRow.append(make("th", "", label));
  }
  head.append(headRow);
  table.append(head);

  const body = document.createElement("tbody");
  for (const [start, end, description] of section.rows) {
    const row = document.createElement("tr");
    row.append(make("td", "mono", `${hex(start)}–${hex(end)}`));
    row.append(make("td", "", typeof start === "number" ? formatSize(rangeSize(start, end), language) : "—"));
    row.append(make("td", "", text(description, language)));
    body.append(row);
  }
  table.append(body);
  return table;
}

function renderSlots(panel, language) {
  const slots = make("div", "slot-grid");
  const mb = FLASH_MAP.multiboot;
  for (let index = 0; index < mb.slotCount; index += 1) {
    const start = mb.slotBase + index * mb.slotStride;
    const headerEnd = start + mb.imageOffset - 1;
    const imageStart = start + mb.imageOffset;
    const imageEnd = imageStart + mb.maxImageSize - 1;
    const end = start + mb.slotStride - 1;
    const card = make("article", "slot-card");
    card.append(make("h4", "", `${I18N[language].slot} ${index} · ${hex(start)}–${hex(end)}`));
    const list = document.createElement("dl");
    for (const [label, value] of [
      [I18N[language].header, `${hex(start)}–${hex(headerEnd)}`],
      [I18N[language].image, `${hex(imageStart)}–${hex(imageEnd)}`],
      [I18N[language].spare, `${hex(imageEnd + 1)}–${hex(end)}`],
    ]) {
      list.append(make("dt", "", `${label}:`), make("dd", "", value));
    }
    card.append(list);
    slots.append(card);
  }
  panel.append(slots);
}

function renderRecord(panel, section, language) {
  panel.append(make("p", "panel-note", text(section.recordTitle, language)));
  const layout = make("div", "record-layout");
  for (const [offset, description] of section.record) {
    const field = make("div", "record-field");
    field.append(make("b", "", offset), document.createTextNode(text(description, language)));
    layout.append(field);
  }
  panel.append(layout);
}

function renderSections(language) {
  const container = $("#detail-sections");
  container.replaceChildren();
  for (const section of FLASH_MAP.sections) {
    const panel = make("section", `detail-panel${section.wide ? " wide" : ""}`);
    panel.id = section.id;

    const heading = make("div", "panel-heading");
    const titleGroup = make("div", "");
    titleGroup.append(make("h3", "", text(section.title, language)));
    heading.append(titleGroup, make("span", "panel-range", `${hex(section.range[0])}–${hex(section.range[1])}`));
    panel.append(heading);

    if (section.slotSection) renderSlots(panel, language);
    panel.append(renderTable(section, language));
    if (section.record) renderRecord(panel, section, language);
    if (section.note) panel.append(make("p", "panel-note", text(section.note, language)));
    container.append(panel);
  }
}

function bindSegmentNavigation() {
  $$(".memory-segment").forEach((segment) => {
    segment.addEventListener("click", () => {
      $$(".detail-panel").forEach((panel) => panel.classList.remove("focused"));
      const target = document.getElementById(segment.dataset.target);
      if (!target) return;
      target.classList.add("focused");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => target.classList.remove("focused"), 1800);
    });
  });
}

function applyTranslations(language) {
  document.documentElement.lang = language;
  document.title = language === "fr" ? "Carte de la Flash externe F4HWN" : "F4HWN External Flash Map";
  $$('[data-i18n]').forEach((element) => {
    element.textContent = I18N[language][element.dataset.i18n];
  });
  $$("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  $("#map-updated").dateTime = FLASH_MAP.meta.updated;
  $("#map-updated").textContent = FLASH_MAP.meta.updated;
}

function render(language) {
  applyTranslations(language);
  renderOverview(language);
  renderSections(language);
  bindSegmentNavigation();
}

let language = getInitialLanguage();
validateFlashMap();
render(language);

$$("[data-language]").forEach((button) => {
  button.addEventListener("click", () => {
    language = button.dataset.language;
    try {
      window.localStorage.setItem("f4hwn-flash-map-language", language);
    } catch (_) {
      // Keep the selected language for this page even if persistence is unavailable.
    }
    render(language);
  });
});
