# F4HWN external Flash map

This directory contains a dependency-free, bilingual (French/English) map of
the 2 MiB PY25Q16 external Flash used by F4HWN.

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
