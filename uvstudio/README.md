# UV Studio

UV Studio is a unified browser-based workspace for compatible Quansheng UV-K1
and UV-K5 radios. It combines the live display and remote control features of
K5Viewer with the firmware and maintenance tools of UVTools2 in one interface.
Communication with the radio is performed directly through the Web Serial API.
No installation, server, dependency, or build step is required.

[Open UV Studio](https://armel.github.io/uvstudio/)

## Features

- Real-time 128 × 64 radio display
- Virtual UV-K1 and UV-K5 keypads with short- and long-press support
- RF activity log with live entries, session markers, and analytics
- Firmware flashing from a local binary file or a URL
- Back up and restore radio calibration data
- Upload and download custom 128 × 64 boot logos
- Export the latest RF Log activities as CSV
- Light and dark themes
- Global serial connection and operation status
- Interface translations for ten languages
- A single consistent interface for viewing, control, and maintenance

## Requirements

- A compatible Quansheng UV-K1 or UV-K5 radio
- A data-capable USB serial cable
- A desktop browser with Web Serial support, such as Chrome, Brave, Edge, Opera, or Firefox 151+

## Safety

Flashing an incompatible or corrupted firmware image may leave the radio
unusable. Verify that the firmware matches the radio model and bootloader,
back up the calibration data first, and keep the cable connected until every
write operation is complete.

## Usage

### Live Viewer and RF Log

1. Connect the radio to the computer with the USB serial cable.
2. Open UV Studio and select Live Viewer.
3. Select Connect and choose the radio serial port.
4. Use the on-screen keypad or keyboard to control the radio.
5. Open RF Log to inspect live activity or analytics when supported by the firmware.
6. Select Disconnect before unplugging the cable.

### Firmware and maintenance tools

Use the navigation sidebar to flash firmware, dump or restore calibration data,
upload or download a boot logo, or export the RF Log. Follow the instructions
shown for the selected operation. Keep the radio in normal mode for maintenance
operations and use DFU mode only when flashing firmware.

## Run locally

UV Studio is a static HTML, CSS, and JavaScript application. Open index.html
directly in a compatible browser. A local web server is not required.

## Project structure

- index.html — unified application markup
- css/core.css — shared design tokens, controls, and overlays
- css/studio.css — UV Studio shell and integration styles
- css/viewer.css — scoped live viewer, keypad, RF Log, and analytics styles
- css/tools.css — scoped firmware and maintenance tool styles
- js/studio-version.js — single public UV Studio version
- js/studio-preferences.js — resilient local and in-memory preference storage
- js/studio.js — navigation and application coordination
- js/studio-serial.js — exclusive serial-port ownership, operation locking, and connection state
- js/k5viewer.js — serial display protocol, keypad, RF Log, and analytics
- js/flash.js — firmware, calibration, and boot logo operations
- js/rf-log.js — RF Log packet parsing and CSV generation
- js/studio-i18n.js — shared translation engine and language preference
- locales/ — unified dictionaries for Studio, K5Viewer, and UVTools2
- tests/ — Node.js protocol, controller, locale, and static integration tests

Run the local test suite with `node --test tests/*.test.js`.

## Origin and attribution

UV Studio incorporates K5Viewer and UVTools2. Their original attribution notices
are retained in [NOTICE](NOTICE).

## License

Copyright 2026 Armel FAUVEAU.

UV Studio is licensed under the [Apache License 2.0](LICENSE). See
[NOTICE](NOTICE) for attribution information.
