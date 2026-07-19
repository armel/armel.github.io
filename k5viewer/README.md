# K5Viewer

K5Viewer is a browser-based display and remote control for compatible
Quansheng UV-K1 and UV-K5 radio firmware. It connects directly to the radio
through the Web Serial API; no installation or build step is required.

[Open K5Viewer](https://armel.github.io/k5viewer/)

## Features

- Real-time 128 × 64 radio display over a 38,400-baud serial connection
- Virtual UV-K1 and UV-K5 keypads with short- and long-press support
- LCD color, inversion, pixel, and ghosting effects
- PNG screenshots of the radio display
- Automatic reconnection after a temporary USB disconnect
- Light and dark themes
- Interface translations for ten languages
- RF activity log and analytics when supported by the connected firmware

## Requirements

- A Quansheng UV-K1 or UV-K5 with compatible K5Viewer-enabled firmware
- A data-capable USB serial cable
- A desktop browser with Web Serial support: Chrome, Brave, Edge, Opera or Firefox 151+

## Usage

1. Connect the radio to the computer with the USB serial cable.
2. Open K5Viewer in a compatible browser.
3. Select **Connect** and choose the radio's serial port.
4. Use the on-screen keypad or the keyboard to control the radio.
5. Select **Disconnect** before unplugging the cable.

The in-app **Help** panel lists all keyboard shortcuts. Common display
shortcuts include:

| Key | Action |
| --- | --- |
| `Space` | Save a screenshot |
| `P` | Toggle the LCD pixel effect |
| `K` | Toggle LCD ghosting |
| `I` | Invert the display colors |
| `+` / `-` | Adjust the pixel size |
| `G`, `O`, `B`, `W`, `X` | Select a display color scheme |
| `H` / `?` | Open Help |
| `Q` | Disconnect |

## Run locally

K5Viewer is a static web application with no dependencies or build step.
Open `index.html` directly in a compatible browser.

## Project structure

- `index.html` — application markup
- `css/k5viewer.css` — layout and themes
- `js/k5viewer.js` — serial protocol, display rendering, and controls
- `js/translation.js` — interface translations
- `img/` — icons and favicons

## License

Copyright 2025 Armel FAUVEAU.

Licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for
attribution information.
