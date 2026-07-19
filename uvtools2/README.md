# UVTools2

UVTools2 is a browser-based firmware flasher and maintenance tool for the
Quansheng UV-K5 V3 and UV-K1. It communicates directly with the radio through
the Web Serial API at 38,400 baud.

[Open UVTools2](https://armel.github.io/uvtools2/)

## Features

- Flash firmware from a local binary file or a URL
- Back up and restore the 512-byte radio calibration data
- Upload a custom 128 × 64 boot logo with threshold and inversion controls
- Download the current boot logo as a PNG image
- Display operation progress and a detailed console log
- English, French, and Chinese interfaces

## Requirements

- A compatible Quansheng UV-K5 V3 or UV-K1 radio
- A data-capable USB serial cable
- A desktop browser with Web Serial support: Chrome, Edge, Opera, or Firefox 151+

## Safety

Flashing an incompatible or corrupted firmware image may leave the radio
unusable. Verify that the firmware matches the radio model and bootloader,
back up the calibration data first, and keep the cable connected until each
write operation is complete.

## Usage

### Flash firmware

1. Put the radio into DFU mode.
2. Open UVTools2 in a supported desktop browser.
3. Select the firmware binary file.
4. Select **Flash firmware** and choose the serial port.
5. Wait for the operation to complete before disconnecting the radio.

### Calibration and boot logo

Keep the radio in normal mode when backing up or restoring calibration data,
or when uploading or downloading a boot logo. Use the corresponding tab and
follow the on-screen instructions.

## Run locally

UVTools2 is a static web application with no dependencies or build step.
Open index.html directly in a supported browser.

## URL parameters

- firmwareURL or fw — load a firmware image automatically from a URL
- mode — open flash, dump, restore, logo-upload, or logo-dump directly

## Project structure

- index.html — application markup
- css/style.css — application layout and theme
- js/flash.js — Web Serial protocol, firmware flashing, calibration, and logos
- js/i18n.js — translation loader
- locales/ — local JavaScript translations and application version
- img/ — icons and favicons

## License

Copyright 2025 Armel FAUVEAU.

The UVTools2 source code is licensed under the [Apache License 2.0](LICENSE).
See [NOTICE](NOTICE) for attribution information.
