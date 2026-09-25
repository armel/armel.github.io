> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/FM-broadcast-radio-receiver/).

# FM broadcast receiver

The radio can receive broadcast FM from `76` to `108 MHz`. It uses a separate chip (`BK1080`) for this. RDS is not supported.

_During normal broadcast listening, the active VFO still has priority. Reception on the active VFO temporarily disables broadcast audio; at the end of VFO reception, the radio switches back to broadcast. While a manual or automatic FM station scan is actively running, `v5.9.0` temporarily ignores main-channel reception so the station scan can finish without being interrupted._

> [!NOTE]
> Where this page mentions `UP` / `DOWN`, use the equivalent `LEFT` / `RIGHT` keys on UV-K1. The active navigation layout follows `SetNav`.

> [!NOTE]
> - the active VFO has priority during normal broadcast listening, but not during an active FM station scan
> - auto scan overwrites all `48` FM memories

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Basic operations

* `F` + `0 FM`, long-pressing `0 FM`, or a [custom button function](./Button-functions#custom-button-functions) starts broadcast reception
* `EXIT`, or using the same start command again while the radio is in FM mode, ends broadcast reception
* `F` + `3 VFO/MR`, or long-pressing `3 VFO/MR`, changes between VFO mode and memory mode

### Set a frequency in FM-VFO mode

Simply typing a frequency tunes the receiver. The resolution is `100 kHz`, so entering `929` tunes to `92.9 MHz`. Use the arrow keys to change in `100 kHz` steps.

### Change the FM broadcast range

If you cannot tune the station you expect, you may simply be in the wrong FM broadcast range.

While FM broadcast reception is active, long-press `1 BAND` to cycle through the available FM ranges:

* `87.5` to `108 MHz`
* `76` to `108 MHz`
* `76` to `90 MHz`
* `64` to `76 MHz`

The currently selected range is shown at the bottom-left of the FM screen, for example `87.5-108M`.

Direct tuning, manual scan, auto scan, and FM memories only work inside the currently selected range. If a station or saved FM memory is outside that range, switch to another FM band first.

### Store in memory from FM-VFO mode

Pressing `M` in VFO mode allows you to store the current frequency in a memory channel. Use the arrow keys to select the memory, then confirm with `M`. There are `48` memories available.

### Select a memory

In MR mode, entering `01` to `48` selects a memory channel. Use `UP` / `DOWN` to step through memory channels.

### Delete a stored memory

In MR mode, pressing `M` allows you to delete that memory channel.

## Scanning for stations from FM-VFO

### Auto scan

Start with `F` + `* Scan` or by long-pressing `* Scan`.
The radio scans for stations and stores the first `48` stations in memory. Scanning starts at the low side of the band. Starting auto scan deletes previously stored channels. `EXIT` ends auto scan.

While auto scan is running, an incoming signal detected on the main transceiver channel does not interrupt the FM scan. Normal main-channel priority is restored as soon as FM scanning stops.

### Manual scan

A short press on `* Scan` starts manual scan. The radio scans upward from the current frequency until a station is received. You can continue scanning in either direction using the arrow keys. `EXIT` stops scan mode.

The same temporary main-channel exception applies during manual scan. Once the scan stops on a station or is cancelled, ordinary broadcast listening again yields to reception on the active VFO.

## Button functions

* `1 BAND` - long press, switch FM broadcast ranges
* `3 VFO/MR` - switch frequency/memory mode
* `* SCAN`
   * short press - start single scan
   * long press - start auto scan (all memory channels will be deleted and replaced with scan result)

## Related pages

* [Getting started](./Getting-started)
* [Button functions](./Button-functions)
* [Radio operation](./Radio-operation)
* [Troubleshooting](./Troubleshooting)
