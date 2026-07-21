# RF Log — Flash wear explainer

Interactive, self-contained explainer of how RF Log journals RX/TX events to
the external SPI NOR flash (PY25Q16HB) without wearing it out.

## Usage

Open `index.html` in any browser. No build step, no network access required
(all styles, scripts and icons are local/inline). Light and dark themes follow
the OS preference.

## Contents

| File              | Purpose                                                        |
|-------------------|----------------------------------------------------------------|
| `index.html`      | Page markup and the three tabs (Animation, Pitch FR, Pitch EN) |
| `css/rf_log.css`  | Styling and theme variables                                    |
| `js/rf_log.js`    | The animated ring simulation and the flash-wear gauge          |

## Notes

The figures and behavior mirror the F4HWN Edition Fusion 🔥 firmware source in
`App/app/rxtx_log.c`:

- 8 sectors of 4 KiB = 1024 slots of 32 bytes each.
- Append-only writes into blank (`0xFF`) slots: two program commands, no erase.
- One erase per sector only when the ring wraps back onto it.
- Endurance: `100000 x 1024 = 102,400,000` entries.
- Power-on markers consume a slot but are not counted as traffic.

This is a documentation aid only; it does not talk to the radio.
