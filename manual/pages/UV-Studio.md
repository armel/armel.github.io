> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/UV-Studio/).

# UV Studio

UV Studio is the browser-based companion for compatible F4HWN firmware on the UV-K1 and UV-K5 V3. It combines live display and remote keypad functions, firmware installation, radio maintenance, Multiboot management, and Labs app management in one interface.

Open it here:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio communicates directly with the radio through the `Web Serial` API. Radio data is handled locally in the browser; no application installation, server account, or cloud upload is required.

> [!IMPORTANT]
> UV Studio is not limited to the Fusion edition. Its general tools work with compatible F4HWN editions, while some views require a specific firmware capability. In particular, overlay-app management and the external-Flash tools are for Labs.

## Version status

UV Studio `v1.6.0` accompanies the stable firmware `v6.1.0`. In addition to the v6 firmware catalog, Multiboot slot management, and versioned official overlay-app catalog, it adds:

* a reorganized interface that groups calibration backup/restore and boot-logo download/upload
* full `2 MiB` external-Flash backup and restore for compatible Labs builds
* CRC32 comparison and verification for faster, safer external-Flash restoration
* guided restoration of the reconstructed factory external Flash followed by the correct stock firmware for UV-K1 or UV-K5 V3

## Requirements

You need:

* a compatible Quansheng UV-K1 or UV-K5 V3 with the PY32F071 MCU
* a data-capable `USB-C` connection or compatible Baofeng/Kenwood-style double-jack USB-to-Serial cable
* a desktop browser with `Web Serial` support, such as Chrome, Brave, Edge, Opera, or Firefox 151+

A downloaded copy of the complete UV Studio source tree can also be opened locally. It is a static HTML/CSS/JavaScript application and does not require a build step or local web server.

## Feature and radio-mode summary

| Tool | Required radio state | Firmware requirement |
| --- | --- | --- |
| Live Viewer and live RF Log | normal startup | compatible Viewer/RF Log support |
| Flash Firmware | `DFU` / flash mode | UV-K1 or UV-K5 V3 bootloader |
| Calibration, Boot Logo, RF Log export | normal startup | compatible F4HWN firmware |
| Firmware Slots | normal startup | Multiboot-capable `v6.0.0` or newer |
| Apps | normal startup | Labs with overlay-app support |
| External Flash backup/restore | normal startup | `v6.1.0` Labs with external-Flash access |
| Factory software restoration | normal Labs startup, then DFU when prompted | `v6.1.0` Labs for the first stage |

To enter `DFU` mode, switch the radio off, hold `PTT`, and switch it on while continuing to hold `PTT`. Release `PTT`, then connect or reconnect the data cable. No side key is required.

## What UV Studio can do

UV Studio provides:

* a real-time `128x64` radio display
* virtual UV-K1 and UV-K5 keypads with short and long presses
* a detachable keypad window and a radio restart control
* radio-screen screenshots and adjustable LCD rendering
* live RF activity, session markers, filters, and analytics
* export of stored RF Log activity to CSV
* firmware installation from the official catalog, the rolling development build, or a local `.bin` file
* direct download of the matching CHIRP driver for stable versioned F4HWN firmware
* installation, validation, naming, erasure, and configuration reset of Multiboot firmware slots
* installation and removal of Labs overlay apps from a versioned official catalog or local `.app` files
* calibration backup and restore
* custom boot-logo download, preview, conversion, and upload
* external-Flash backup, restore, and guided factory-software recovery in `v1.6.0`
* light and dark themes and translations in ten languages

UV Studio owns the serial connection globally. It prevents two operations from using the port at the same time and keeps or re-establishes the connection when switching between compatible normal-mode tools.

## Live Viewer

The Live Viewer mirrors the radio display and provides matching UV-K1 and UV-K5 virtual keypads.

1. Start the radio normally.
1. Connect the radio to the computer.
1. Open `Live Viewer`, select the appropriate keypad, and click `Connect`.
1. Choose the radio serial port.
1. Use the virtual keypad or computer keyboard.
1. Click `Disconnect` before unplugging the cable.

The toolbar can restart the connected radio, capture a screenshot, change the simulated LCD appearance, and detach the keypad into a floating window. The built-in `Help` panel lists all keyboard shortcuts; common controls include arrow keys for navigation, digits for short presses, `Shift` plus a key for a long press, `Enter` or `M` for Menu, `Esc` for Exit, and `F1` / `F2` for the side buttons.

> [!IMPORTANT]
> Viewer control cannot start a transmission. The displayed `PTT` is unavailable and UV Studio is not a remote-TX tool.

## RF Log

When the running firmware supports RF Log and the Viewer bridge, UV Studio displays live RX and TX sessions with:

* direction, frequency, and channel information
* session duration
* RX signal level or TX power
* battery voltage
* `ALL`, `RX`, and `TX` filters
* activity, airtime, frequency, session, and battery analytics

The separate `Export RF Log` tool reads up to the latest `512` stored activities and power-on markers and creates `rf-log.csv`. Keep the radio in normal mode. If channel names or configuration-bank information are wrong, update to a firmware containing the latest v6 RF Log fixes.

## Flash Firmware

> [!WARNING]
> Flashing an incompatible or corrupted image can leave the radio unusable. Confirm the model and bootloader compatibility, make a calibration backup, and keep the cable connected until the operation finishes.

The firmware catalog groups current stable F4HWN builds by edition, includes the rolling Fusion development build, and can also offer compatible stock images. A local `.bin` file remains available when the catalog cannot be loaded or when using a custom build.

1. Start the radio in `DFU` mode.
1. Open `Flash Firmware`.
1. Select the correct catalog entry or choose a compatible local `.bin` file.
1. Click `Flash firmware` and select the serial port.
1. Wait for the progress operation to finish and for the radio to restart.

When a stable versioned F4HWN build is selected, UV Studio offers the shared CHIRP driver published for that firmware version. The rolling development and stock builds do not use that automatic driver link.

## Firmware Slots

All four official `v6.0.0` editions support Multiboot. UV Studio manages user slots `1` to `4` in external Flash. The protected `Main` backup is maintained by the firmware and is intentionally not exposed as a writable slot.

To install another edition:

1. Start a Multiboot-capable radio normally.
1. Open `Firmware Slots` and refresh the table.
1. Select a compatible stable `v6.x` F4HWN image from the catalog or load a local `.bin` file.
1. Choose slot `1` to `4` and optionally enter a display name of up to `15` characters.
1. Select `Write to slot`, confirm, and wait for erase, write, and full CRC verification.

The slot catalog intentionally excludes stock firmware, v5 firmware, and the rolling development image because those entries are not guaranteed to return to the Multiboot selector.

Each populated slot has two independent maintenance actions:

* `Erase FW` removes the stored firmware image but does not reset that slot's configuration bank.
* `Reset config` erases the channels and settings bank associated with that slot but leaves its firmware image installed.

See [Multiboot and Multiconfig](./Multiboot-and-Multiconfig) for `Main`, slot selection, configuration banks, `SetCfg`, and recovery behavior.

## Apps (Labs)

The `Apps` view manages the eight experimental overlay-app slots in the Labs edition.

1. Start Labs normally and open `Apps`.
1. Refresh the app-slot table.
1. Select the firmware version, then an official app from its versioned catalog; alternatively, load a local `.app` file.
1. Select the target slot and choose `Install app`.
1. On the radio, use `F + 7`, select the app, and press `M`.

UV Studio shows the app name, version, size, and validation status. Deleting an app erases only that app slot.

> [!IMPORTANT]
> Overlay apps are tied to the firmware ABI, API level, RAM address, and capabilities. Select the app catalog version matching the installed firmware. Reinstall compatible apps after a firmware update when required.

See [Overlay apps](./Overlay-apps) for loader compatibility and [Overlay applications](./Overlay-applications) for each app's purpose and controls.

## Choosing the right backup or copy

These operations protect or copy different parts of the radio and are not interchangeable:

| Operation | What it contains | Best use | Calibration behavior |
| --- | --- | --- | --- |
| UV Studio `Calibration` | device-specific RF and hardware calibration | essential safety backup for one radio | explicitly reads or restores calibration; use only with the same radio |
| CHIRP radio image | channels plus settings understood by that driver version | editing and migrating memories/settings | not a replacement for a calibration backup |
| UV Studio `External Flash` | raw `2 MiB` external-Flash image, including configurations, slots, apps, logs, logo, and calibration data in the backup file | complete file backup and recovery | restoration deliberately preserves the calibration already present on the target radio |
| AirCopy memory or `Settings` | selected memory banks and/or compatible radio settings | synchronizing selected data between two radios | does not copy hardware calibration |
| AirCopy `Flash 2M` | external Flash cloned directly over a cable | making another radio's shared external-Flash state match the source | excludes and preserves the target radio's calibration sector |

For routine upgrades, make at least a calibration backup and a CHIRP image. Use the full external-Flash backup before experimenting with Multiboot, app slots, factory recovery, or low-level storage.

## External Flash backup and restore (v1.6.0)

This tool requires the external-Flash commands provided by `v6.1.0` Labs. It is not available in `v6.0.0`.

The `External Flash` view reads or restores the complete `2 MiB` PY25Q16 external SPI Flash by physical address. This includes configuration banks, firmware slots, app slots, the RF log, Multiboot state, boot logo, and other shared data.

### Back up

1. Start a compatible Labs build normally.
1. Open `External Flash` and select `Back up`.
1. Click `Read external flash` and choose the serial port.
1. Wait for the complete chip to be read; this can take several minutes.
1. Download `external-flash.bin`.

The backup is exactly `2 MiB`. Store it safely: it contains radio configuration and device-specific calibration data.

### Restore

1. Start a compatible Labs build normally.
1. Open `External Flash` and select `Restore`.
1. Choose a complete `2 MiB` backup created by this tool.
1. Click `Restore external flash` and confirm the destructive operation.
1. Keep the radio powered and connected until verification completes and the radio reboots.

UV Studio refuses files that are not exactly `2 MiB`. It works sector by sector in `4 KiB` units and never erases or writes the device-specific calibration sector. With current firmware it compares CRC32 values, skips sectors that are already identical, writes only the remaining sectors, and verifies each one. It falls back to a direct byte comparison when the CRC command is unavailable.

> [!WARNING]
> Restoration replaces almost all external-Flash content, including settings, logs, logo, apps, firmware slots, and Multiboot state. The calibration sector of the receiving radio is preserved, so a full backup from one radio is not a method for copying that radio's calibration to another.

For a direct radio-to-radio copy of external Flash, see the separate cable-only `Flash 2M` function in [AirCopy](./AirCopy#external-flash-cloning).

## Factory software restoration (v1.6.0)

The `Factory reset` view is a guided two-stage recovery for returning a UV-K1 or UV-K5 V3 to matching Quansheng software:

1. Start `v6.1.0` Labs normally.
1. Open `Factory reset` and select the exact model: `UV-K1` or `UV-K5 V3`.
1. Confirm the warning. UV Studio loads the matching reconstructed factory external-Flash image and stock firmware, then verifies their size and SHA-256 before writing anything.
1. UV Studio restores and verifies the external Flash while preserving the device-specific calibration sector.
1. When prompted, switch the radio off and enter `DFU` mode. Do not start it normally between the two stages.
1. Select `Continue in DFU`; UV Studio installs the matching stock firmware automatically.

The bundled stock targets are UV-K1 `v7.03.01` and UV-K5 V3 `v7.00.11`.

> [!WARNING]
> This is a destructive software restoration. It removes F4HWN settings, Multiboot state, firmware slots, overlay apps, RF logs, and the custom logo. The external image is a reconstructed factory state, not an untouched physical dump. Select the correct model and do not interrupt either stage.

## Calibration

Calibration is device-specific. Create a backup before firmware experiments or low-level maintenance, and name the file with the radio model or serial number so backups are not mixed between devices.

To back it up:

1. Start the radio normally.
1. Open `Calibration` and select `Back up`.
1. Click `Read calibration data`.
1. Download `calibration.dat`.

To restore it:

1. Start the same radio normally.
1. Open `Calibration` and select `Restore`.
1. Choose its `calibration.dat` file.
1. Click `Restore calibration data` and wait for completion.

> [!WARNING]
> Restore only the calibration belonging to that radio unless you fully understand the consequences.

## Boot Logo

Compatible builds can use a custom `128x64` monochrome image at startup or as a screen saver.

To upload a logo:

1. Start the radio normally.
1. Open `Boot Logo` and select `Upload`.
1. Choose an image in a common format such as PNG, JPEG, or BMP.
1. Adjust `Threshold` and `Invert colors` while checking the preview.
1. Select `Upload logo to radio`.
1. Choose `LOGO` in `POnMsg`, or a compatible logo mode in `SetSav`.

The `Download` tab reads the current image, previews it, and saves it as `logo.png`.

## Troubleshooting

If UV Studio cannot communicate with the radio:

* confirm that the selected operation uses the correct normal or DFU startup mode
* disconnect the cable, restart the radio in that mode, reconnect it, and select the serial port again
* close other programs or browser tabs that may own the serial port
* verify that the cable carries data and is fully inserted
* use a firmware edition and version that exposes the required capability
* for Apps or external Flash, check that Labs is running rather than Fusion, FieldOps, or Transfer

The expandable `Console` records protocol and operation details that can help identify an unsupported command, timeout, validation failure, or wrong file.

## Related pages

* [Getting started](./Getting-started)
* [Recent changes](./Recent-changes)
* [Programming with CHIRP](./Programming-with-CHIRP)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Advanced features](./Advanced-features)
* [Troubleshooting](./Troubleshooting)
