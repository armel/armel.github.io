> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Spectrum-analyzer/).

# Spectrum analyzer

## Spectrum Sweep screen

Press `F` + `5 NOAA` to turn on the **Spectrum analyzer**.
The current VFO or memory frequency will be the **_center frequency_** of the spectrum sweep.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

The spectrum analyzer can also be used with [**ScnRng** mode](./Scanning#scan-frequency-range-function).

> [!NOTE]
> Navigation uses `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1. The active layout follows `SetNav`.

> [!NOTE]
> - `PTT` opens detail monitoring for the last received frequency
> - with `ScnRng`, the blacklist is limited to 15 frequencies

> [!IMPORTANT]
> **The spectrum analyzer does not behave identically across radio hardware.**
> The **V1 / V2** radios are built around the **BK4819** receiver, while the
> **V3 (K5v3)** uses the **BK4829**. These are different receiver chips, with a
> different front-end, LNA/PGA gain stages, AGC behaviour and RSSI scaling.
>
> As a result:
> - the **noise floor**, the absolute **dBm / S-meter** readings and the **`LNAs` / `LNA` / `PGA`** values are **not directly comparable** between a V1/V2 and a V3 — a level or gain setting that looks "right" on a V2 has no reason to mean the same thing on a V3;
> - the spectrum analyzer was **substantially reworked** to support both platforms, so do not expect a V3 to reproduce, value for value, what you observed on an older V1/V2;
> - a high or unstable noise floor is largely driven by the receiver front-end and the local RF environment, not by a bug in the analyzer. When **AUTO** cannot settle on your local floor, switch to **MANUAL** and set the trigger yourself — that is exactly what MANUAL mode is for.

### Trigger modes: AUTO vs MANUAL

Short-press `M` to toggle between **AUTO** and **MANUAL** trigger modes. The top-left indicator shows the active mode:

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — AUTO mode. The squelch trigger level tracks the measured noise floor using a sensitivity profile:
  - `WEAK` — +12 dB above noise floor (least sensitive, fewer false openings)
  - `NORM` — +8 dB (default)
  - `STRG` — +5 dB (most sensitive)
  
  A direction arrow is appended to the label to show the current sweep direction:
  - `>` — sweep going left → right
  - `<` — sweep going right → left
  
  Example: `A:NORM>` means AUTO / Normal sensitivity, sweeping to the right.

- **`M <rssi>/<trig>`** — MANUAL mode. You set the squelch trigger level yourself with `*` / `F`, and the vertical scale (`dbMax`) with `3` / `9`. The trigger changes in predictable `1 dB` steps.

Long-press `M` to **reset the spectrum analyzer to its default settings**.

### Saving settings on exit

When you leave the **Spectrum Sweep** screen with `EXIT`, the spectrum analyzer writes its persistent settings to flash. The next time you open the analyzer, these values are restored:

- frequency step between bars (`1` / `7`)
- number of bars / channels (`4`)
- receiver bandwidth used while monitoring a signal (`6`)
- trigger mode, **AUTO** or **MANUAL** (`M` short)
- AUTO sensitivity profile, **WEAK** / **NORM** / **STRG** (`3` / `9` in AUTO mode)
- squelch trigger level (`*` / `F`) — restored in **MANUAL** mode; in **AUTO** the trigger is recomputed from the noise floor each time you open the analyzer

This persistence was expanded after `v5.4.0`: older builds saved only the scan step, bar count, and receiver bandwidth. In current builds, starting the spectrum analyzer from `ScnRng` mode no longer overwrites the saved scan step or bar-count preference; the active scan range still defines the sweep span.

The vertical scale (`dbMax`, `3` / `9` in MANUAL) is **not** persisted: it is reset to the default display window every time the analyzer is opened. The current sweep frequency/window, the `UP` / `DOWN` scrolling step, modulation type, backlight toggle, temporary blacklist, and detail-monitor register adjustments (`LNAs`, `LNA`, `PGA`) are also not saved by this `EXIT` action. If you are on the **Detail Monitor** screen, `EXIT` first returns to the sweep screen; press `EXIT` again from there to save and leave the analyzer.

Current builds also improve `8.33 kHz` frequency rounding in bandscope / spectrum workflows, so displayed and tuned frequencies stay aligned more predictably on aviation-style steps.

### Button functions

| Key | Function |
| --- | --- |
| `1` / `7` | Increase / decrease frequency step between bars |
| `2` / `8` | Increase / decrease the frequency step used when scrolling with `UP` / `DOWN` |
| `3` / `9` | In MANUAL: adjust `dbMax` (vertical scale) · In AUTO: cycle sensitivity profile (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Toggle the number of bars (channels) in the graph |
| `5` | Frequency input for the lower sweep frequency (value in **MHz**, `*` = decimal point) |
| `6` | Toggle receiver bandwidth |
| `0` | Toggle modulation type (FM / AM / USB) |
| `*` / `F` | Increase / decrease squelch trigger level in `1 dB` steps — takes effect in **MANUAL**; in **AUTO** the auto-tracker overrides it on the next sweep |
| `M` short | Toggle AUTO / MANUAL trigger mode |
| `M` long | Reset spectrum analyzer to defaults |
| `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1 | Shift the sweep window up / down in frequency · **During RX**: stop reception and resume the sweep in the chosen direction |
| `Side button 1️⃣` | Exclude the current frequency from the spectrum scan |
| `Side button 2️⃣` | Toggle backlight |
| `PTT` | Switch to **detail monitoring** of the last received frequency |
| `EXIT` | Save persistent spectrum settings, then return to the previous screen / function |

> [!TIP]
> The sweep alternates direction on each full cycle to reduce directional bias. The `<` / `>` indicator next to `A:xxxx` lets you see at a glance which half of the sweep is currently active.

> [!NOTE]
> In MANUAL mode, the spectrum curve is drawn without cosmetic smoothing. This makes narrow peaks line up more closely with the raw RSSI used by the squelch detector.

## Detail Monitor screen
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Button functions
* `M` - scrolls through the parameters displayed at the bottom of the screen, which can be adjusted with the `UP` and `DOWN` buttons
   * LNAs - Short Low Noise Amplifier
   * LNA - Low Noise Amplifier
   * PGA - Programmable Gain Amplifier
* `Side button 1️⃣` - toggle **monitor mode** (forces the squelch open so you can hear the tuned frequency continuously)
* `EXIT` - exits to the previous screen of the spectrum analyzer

> [!NOTE]
> `LNAs` / `LNA` / `PGA` are **live diagnostic values**, not saved settings. They are driven by the receiver's AGC and are not persisted on exit. Their available steps and their meaning differ between the **BK4819** (V1/V2) and the **BK4829** (V3), so they cannot be compared value for value across platforms.

## Related pages

* [Getting started](./Getting-started)
* [Scanning](./Scanning)
* [Button functions](./Button-functions)
* [Radio operation](./Radio-operation)
* [Troubleshooting](./Troubleshooting)
