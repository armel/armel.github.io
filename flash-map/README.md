# F4HWN external Flash map

This directory contains a dependency-free, bilingual (French/English) map of
the 2 MiB PY25Q16 external Flash used by F4HWN.

The map also records the coordinated interoperability allocation with Sonic 4K:
F4HWN stops at `0x1DDFFF`, and Sonic 4K owns `0x1DE000` through `0x1FFFFF`.
Since v7, the last F4HWN area before it, `0x1CA000` through `0x1DDFFF`, holds
the firmware assets (fonts, menu texts, QR codes): one 16 KiB zone per
multiboot slot. The 64 overlay-app slots end at `0x181FFF`; the app region is
capped at 100 slots, so its expansion reserve stops at `0x1C9FFF`.

In the low shared area, `0x012000` through `0x017FFF` remains unallocated. The
RX/TX log occupies `0x018000` through `0x01FFFF`, immediately before the Main
firmware slot. Firmware v6.1.0 and earlier used `0x1E0000` through `0x1E7FFF`.

Open `index.html` directly, or serve the repository locally:

```sh
python3 -m http.server
```

Then open `http://localhost:8000/flash-map/`.

## Updating the map

All addresses, multiboot constants, descriptions and translations are kept in
`FLASH_MAP` and `I18N` at the top of `flash-map.js`.

1. Check the source files listed in the page footer.
2. Update the affected ranges and both `fr`/`en` descriptions.
3. Update `FLASH_MAP.meta.updated`.
4. Run `node --check flash-map/flash-map.js`.
5. Open the page and verify both languages at desktop and mobile widths.

Ranges are inclusive. Sizes, slot boundaries and overview proportions are
calculated by JavaScript, so they should not be duplicated manually in the
HTML or CSS.
