# UV Manual

Static documentation interface for the F4HWN custom firmware. The deployed application reads the Markdown files in `pages/` and renders them with a UV Studio-inspired interface.

## Updating the content

Run `../scripts/release-manual.sh` from the `armel.github.io` repository. The script copies the selected pages from the adjacent `uv-k1-k5v3-firmware-custom.wiki` checkout.

The page order, navigation labels, and supported languages are defined in `js/manual.js`. Localized Markdown pages live under `pages/<language>/`; the release script bundles French, Italian, Spanish, German, Portuguese, Russian, Polish, Simplified Chinese, and Dutch into `js/content-<language>.js`.
