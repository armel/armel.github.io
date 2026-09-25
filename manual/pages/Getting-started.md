> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Getting-started/).

# Getting started

This page is a quick orientation guide for first-time users of the firmware. It does not replace the full documentation, but it should help you find the right page faster and avoid the most common mistakes.

## First 5 minutes

If you only want to program a frequency, test the radio, and save it:

1. Select the active VFO with `F` + `2 A/B`.
1. Switch that VFO to `frequency mode` with `F` + `3 VFO/MR`.
1. Enter a frequency with the keypad.
1. Open the menu with `M`, choose `Channels` (or `All`), and adjust the basic items you need (`Step`, `Power`, tones, offset, bandwidth, `Mode`, `TXLock`).
1. Save the setup with `ChSave` if you want to keep it as a memory channel.
1. Switch back to `channel mode` with `F` + `3 VFO/MR` when you want to browse saved channels.

If you need to view or control the radio from a browser, inspect RF activity, flash firmware, back up calibration, or upload a custom boot logo, use [UV Studio](./UV-Studio). If you prefer programming memories from a computer, use the dedicated `CHIRP` driver provided with each firmware release. See [Programming with CHIRP](./Programming-with-CHIRP) for the complete workflow.

If you already know the firmware, see [Recent changes](./Recent-changes) for the latest stable `v6.1.0` changes and the earlier `v6.0.0` highlights.

> [!WARNING]
> Do not use Quansheng CPS. It overwrites custom settings.

## Choose an edition

The latest stable `v6.1.0` release has four official editions:

| Edition | Best for | Additional capabilities |
| --- | --- | --- |
| `Fusion` | most users and everyday operation | balanced reference feature set |
| `FieldOps` | field and first-responder use | RescueOps, resident FoxHunt, resident Beacon |
| `Transfer` | copying data between radios | AirCopy and resident Beam |
| `Labs` | experimentation | RescueOps, AirCopy, and installable overlay apps |

FoxHunt and Beacon are independent applications since `v6.0.0`. In FieldOps they are resident; in Labs they are installed and launched separately as overlay apps.

For most users, start with Fusion and choose a specialized edition only when you need its additional capabilities. Multiboot lets you keep several editions and isolated configurations on the same radio.

## Common tasks

### Start scanning frequencies

1. Switch a VFO to `frequency mode`.
1. Set the starting frequency.
1. Set the frequency step with menu `Step`.
1. Long-press `* SCAN`.

For a limited scan range, load the lower and upper limits into the two VFOs, long-press `5 NOAA` to enable `ScnRng`, then long-press `* SCAN`.

For the full scan behavior, scan lists, priority scan, and DCS / CTCSS scan, see [Scanning](./Scanning).

### Start scanning memory channels

1. Switch to `channel mode`.
1. Assign channels to a scan list with menu `ScList`, or by long-pressing `5 NOAA`.
1. Long-press `* SCAN`.

The current `v6.1.0` firmware supports `24` scan lists, `ALL`, and a configurable `MIX` mode that scans several selected lists together.

See [Scanning](./Scanning) for the full scan-list behavior.

### If you cannot transmit

Check these items first:

1. Make sure `Mode` is `FM` and not `AM` or `USB`.
1. Check whether the frequency is inside the selected `F Lock` plan.
1. If the frequency is outside the selected band plan, check whether `TXLock` is set to `OFF`.
1. Look for a small padlock next to the channel or VFO name.

If that still does not explain it, see [Troubleshooting](./Troubleshooting).

### Save battery

The two main menus to know are:

* `BatSav` for the active/sleep ratio during normal operation
* `SetOff` for deep sleep after a period of inactivity

See [Radio operation](./Radio-operation#battery-display-type-and-calibration) for battery display, battery type, and calibration, and [Radio operation](./Radio-operation#about-the-setoff-menu) for the detailed behavior of sleep mode.

## Model differences

This firmware targets the `UV-K1` and `UV-K5 V3`.

The most visible day-to-day difference in the documentation is navigation:

* `UV-K5`: navigation is usually described with `UP` / `DOWN`
* `UV-K1`: navigation is usually described with `LEFT` / `RIGHT`

The hidden-menu option `SetNav` controls this navigation style.

Some screenshots and examples use UV-K5 terminology first, but the same feature usually exists on UV-K1 with the equivalent navigation keys.

## Core concepts

These terms appear throughout the wiki:

* `VFO mode`: you type frequencies directly and adjust live settings before saving them
* `Channel mode` / `memory mode`: you browse saved memory channels
* `Main VFO`: the active upper or lower line, marked by `►`
* `Menu category`: the categorized first menu level introduced in Fusion `v5.9.0` and used by the current v6 editions; `All` restores the original flat order and global numbering
* `F Lock`: the main TX band plan
* `TXLock`: an extra per-channel TX permission when a frequency is outside the selected `F Lock` plan
* `Scan list`: one of the `24` memory-scan groups, or `ALL`
* `MIX`: a `v6.1.0` scan mode that combines a saved selection of lists `01` to `24`
* `ScnRng`: scans only between the frequencies currently loaded into the two VFOs
* `SetOff`: inactivity timeout before deep sleep
* `POnMsg`: startup display mode, including the optional custom boot logo
* `Multiboot`: keeps `Main` plus four additional v6-compatible firmware images in external Flash
* `Config bank`: the isolated channels/settings profile paired with a Multiboot slot by default
* `SetCfg`: changes the config bank without changing the running firmware slot
* `Overlay app`: a small Labs-only `.app` program loaded from external Flash into RAM when launched
* `MO`, `DW`, `DWR`, `XB`: `RxMode` abbreviations shown in the status bar

## Where to go next

* [Radio operation](./Radio-operation) for VFO/channel usage, status bar, `F Lock`, `TXLock`, and sleep behavior
* [Recent changes](./Recent-changes) for the main user-visible changes in recent releases
* [UV Studio](./UV-Studio) for live viewing, RF activity, firmware flashing, Multiboot slots, Labs apps, calibration, boot logos, and the `v1.6.0` external-Flash recovery tools
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig) for firmware slots, the startup selector, configuration banks, and `SetCfg`
* [Overlay apps](./Overlay-apps) for installing and launching experimental Labs apps
* [Programming with CHIRP](./Programming-with-CHIRP) for computer programming with the dedicated driver included in each release
* [Scanning](./Scanning) for frequency scan, memory scan, `ScnRng`, and DCS / CTCSS scanning
* [Menu](./Menu) for every menu item and the hidden menu
* [Button functions](./Button-functions) for shortcuts, long presses, and programmable keys
* [FoxHunt](./Fox-Hunt) for receive-only signal-strength-assisted direction finding
* [Beacon](./Beacon) for the independent periodic Morse transmitter
* [AirCopy](./AirCopy) for radio-to-radio memory/settings transfer and the `v6.1.0` improvements
* [Advanced features](./Advanced-features) for RescueOps, Resume Mode, the built-in game, and TX-on-all-bands research features
* [Spectrum analyzer](./Spectrum-analyzer) for bandscope-style scanning
* [FM broadcast radio receiver](./FM-broadcast-radio-receiver) for the broadcast FM feature
* [Troubleshooting](./Troubleshooting) for common problems and quick checks
