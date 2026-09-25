> 🌐 **Translate**
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Recent-changes/).

# Recent changes

This page summarizes the latest stable `v6.1.0` release and the main user-visible changes in earlier versions.

For the official release archive, see the [GitHub releases page](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## v6.1.0 highlights

`v6.1.0` is the latest stable release. It focuses on faster and safer data transfer, the new `MIX` scan-list mode, expanded Labs maintenance through UV Studio, and several reliability fixes.

### Release package

Download firmware and accompanying files from the [v6.1.0 release page](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). The release provides the four official editions—`Fusion`, `FieldOps`, `Transfer`, and `Labs`—plus the matching shared CHIRP driver. Choose the edition by capability rather than treating Fusion as a package containing every specialized feature.

### Upgrading from v6.0.0

1. With the old firmware still installed, download the radio using its matching CHIRP driver and save that image. Optionally export the memory-channel rows to CSV.
1. Back up the radio's device-specific calibration with [UV Studio](./UV-Studio#calibration).
1. Flash the chosen `v6.1.0` edition. Perform a factory reset only if the release instructions or the migration path from your installed version explicitly requires it.
1. Load the dedicated `v6.1.0` CHIRP driver and download a fresh image from the updated radio.
1. Copy the old channel rows into that fresh image instead of uploading the complete old settings image.
1. In Labs, select `v6.1.0` in UV Studio's versioned app catalog. Replace any overlay app that the loader reports as incompatible.
1. Before using AirCopy, update both radios to compatible `v6.1.0` firmware; its optimized radio protocol is not wire-compatible with earlier versions.

For an additional safety copy after installing `v6.1.0` Labs, UV Studio can save the complete external Flash. See [Choosing the right backup or copy](./UV-Studio#choosing-the-right-backup-or-copy).

### AirCopy performance and cable cloning

The `v6.1.0` AirCopy protocol sends up to three `64-byte` blocks in one FSK frame, reducing turnaround overhead and making radio transfers approximately twice as fast. It compares CRC32 hashes in groups of up to `24` blocks and sends only blocks that differ on the target.

The `Transfer` edition also adds `CABLE COPY` over UART and a cable-only `Flash 2M` selection for cloning external Flash while excluding the device-specific calibration sector. Sender and receiver selections are validated before data is written.

This is a new protocol: both radios must run the same compatible firmware. See [AirCopy](./AirCopy#v610-improvements).

### MIX scan list

The new `MIX` mode scans a saved selection of lists `01` to `24` as one combined set. Select `MIX` in `ScList`, press `M` to open the editor, toggle lists with `M`, and save with `EXIT`. The editor displays the number of selected lists, and at least one list must remain enabled.

During an active memory scan, entering `25` selects `MIX`; `00` continues to select `ALL`. See [Scanning](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` adds complete `2 MiB` external-Flash backup and restore for Labs. Restoration preserves the device-specific calibration sector, skips identical `4 KiB` sectors using CRC32 when supported, verifies every written sector, and reboots the radio when finished.

A new guided factory-software recovery verifies bundled images by size and SHA-256, restores a reconstructed external-Flash image while preserving calibration, then prompts for DFU mode and installs the matching UV-K1 or UV-K5 V3 stock firmware. The interface also groups calibration and boot-logo operations into clearer backup/restore or download/upload views.

These external-Flash tools require `v6.1.0` Labs. See [UV Studio](./UV-Studio#version-status), [external-Flash backup and restore](./UV-Studio#external-flash-backup-and-restore-v160), and [factory software restoration](./UV-Studio#factory-software-restoration-v160).

### Other v6.1.0 changes

The release also adds the [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll), and [`Space Impact`](./Overlay-applications#space-impact) overlay games, plus fixes involving RF Log across configuration banks, overlay-app storage, wiped calibration, and DCS squelch tail handling.

## v6.0.0 highlights

`v6.0.0` was released on 10 September 2026. It introduced four official editions, Multiboot and Multiconfig, the Labs overlay-app platform, reliable AirCopy, and independent FoxHunt and Beacon applications.

### Four official editions

| Edition | Intended use | Additional features |
| --- | --- | --- |
| `Fusion` | everyday use | balanced reference edition; recommended for most users |
| `FieldOps` | field and first-responder work | RescueOps, resident FoxHunt, and resident Beacon |
| `Transfer` | radio-to-radio data transfer | AirCopy and resident Beam |
| `Labs` | experimentation | RescueOps, AirCopy, and overlay apps including FoxHunt, Beacon, and Beam |

Fusion `v6.0.0` no longer includes the specialized v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon, or Breakout features. Choose the appropriate specialized edition when one of those capabilities is required.

### Independent FoxHunt and Beacon applications

The former combined `FOX HUNT / BEACON` action was split before the `v6.0.0` release. `FOX HUNT` and `BEACON` are separate programmable actions, separate resident applications in FieldOps, and separate overlay apps in Labs.

See [FoxHunt](./Fox-Hunt) and [Beacon](./Beacon).

### Multiboot

Compatible editions can store four additional F4HWN firmware images in external Flash. Hold `M` (`MENU`) by itself while switching on the radio to open the startup selector, validate the stored images, and restore `Main` or slot `1` to `4`.

The firmware automatically protects the normally flashed image as `Main`, verifies the complete CRC of a slot before erasing internal Flash, and records its active state redundantly. UV Studio's `Firmware Slots` view installs, verifies, names, and erases the four user slots while the radio is in normal mode.

Only Multiboot-capable `v6.0.0` or newer F4HWN images should be installed in these slots. See [Multiboot and Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig and SetCfg

Each firmware slot selects a separate configuration bank by default. Memory channels, channel names, VFOs, scan lists, and radio settings therefore remain isolated when switching editions. Calibration, the boot logo, firmware/app slots, Multiboot state, and RF log remain shared.

The new `SetCfg` menu can deliberately pair the running firmware with another bank. `SysInf` shows independent `SLOT` and `CFG` badges, and UV Studio can reset a user slot's configuration without erasing its firmware.

See [Multiboot and Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) and [Menu](./Menu).

### Reliable AirCopy with acknowledgements

Air Copy now waits for an acknowledgement after every block. The receiver verifies the packet before writing it and can request a resend; the sender retries lost, damaged, or unacknowledged blocks up to three times. Duplicate blocks are acknowledged safely, so a lost ACK no longer desynchronizes the transfer.

A new `All (Mem+Set)` choice transfers all eight 128-channel banks and Settings in one continuous run. The screen reports `TX`/`RX` progress plus retry or error counts.

See [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Overlay apps in Labs

The experimental `Labs` edition can install small `.app` programs in external Flash and execute them from a checked `4 KiB` RAM overlay. UV Studio's `Apps` view, marked `Labs only`, installs, verifies, lists, and removes apps; `F + 7` opens the on-radio launcher.

The loader validates the app format, ABI/API compatibility, required capabilities, RAM address, size, and code CRC before execution. Available apps include radio tools such as Broadcast FM, FoxHunt, Beacon, and Beam, plus Breakout, Tetris, Cube3D, and Plasma.

See [Overlay apps](./Overlay-apps) for installation and compatibility, and [Overlay applications](./Overlay-applications) for the purpose and controls of each app.

### Beacon keying mode (TONE / CARR)

Beacon gains a keying-mode setting on key `4`. `TONE` (default) is the previous behaviour — a continuous FM carrier with the `1000 Hz` tone keyed for each Morse element (MCW / F2A). `CARR` interrupts the carrier itself for every element, reproducing the carrier-interrupted pattern many ARDF foxes use in the field: the signal disappears between elements, making direction finding harder and letting a plain AM receiver copy it. The setting is saved and included in AirCopy transfers, and is available in both the resident and overlay Beacon. See [Beacon](./Beacon#timing-and-keying).

## v5.9.0 highlights

These changes were developed after `v5.8.0` and released in `v5.9.0`.

### Categorized menu browser

Fusion development builds open the menu on a category screen instead of immediately showing the original flat list. The available categories are `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio`, and `DTMF`. The hidden-menu startup also adds a `Service` category.

The `All` category keeps the original flat-menu order and global numbering. Entering a menu number directly from the category screen also switches to `All`, so existing numbered-menu shortcuts continue to work. The firmware remembers the last selected category and the last item used in each category for the current session.

See [Menu](./Menu#categorized-menu-browser).

### Side-key action picker

After pressing `F`, hold either side button to open a temporary action picker. Use `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1, to browse the available compiled shortcut actions and press `M` to run the highlighted action. `EXIT` or `F` cancels the picker; pressing `PTT` closes it and continues with normal transmit handling.

The picker closes automatically after approximately five seconds or when reception starts. Each side button remembers its last picker selection until the radio restarts. A normal short `F` + side-button press keeps its existing Step-up / Step-down behavior.

See [Button functions](./Button-functions#side-key-action-picker).

### Fox Hunt / Beacon improvements

Fox Hunt adds two deeper front-end-gain steps after the original `ATT 0`, `ATT 6`, `ATT 15`, and `ATT 27` settings. They are shown as `BYP` and `BYP+`; these names describe convenient close-range modes, not a literal hardware bypass. The navigation keys (`UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1) now change attenuation directly.

After a gain change, the firmware briefly lets the RSSI detector settle and then resets the peak, minimum, trend, and signal-history references. This avoids stale peaks and artificial jumps when moving between gain ranges.

Holding `F` for approximately 0.5 seconds toggles a temporary keypad lock shared by Fox Hunt and Beacon. In Fox Hunt, the navigation keys remain available for attenuation while locked. In Beacon, all normal controls are blocked until the same long press unlocks the keypad, including during an active transmission.

Fox Hunt and Beacon now both ignore the normal `SetOff` inactivity timer and remain active until explicitly exited. Their ordinary backlight timeout and battery updates continue to operate.

See [Fox Hunt and Beacon](./Fox-Hunt-and-Beacon).

### Scan and FM broadcast fixes

During memory scan, changing the active scan list temporarily holds scan resumption while the scan-list name is actually displayed. This keeps the hidden progress gauge and the scan position synchronized. Frequency and range scans are not paused because they do not show the name overlay.

An active FM broadcast station scan now ignores an incoming signal detected on the main radio channel, so the FM scan is not interrupted. Normal FM listening still yields to main-channel reception as before.

See [Scanning](./Scanning#changing-the-scan-list-during-scan) and [FM broadcast receiver](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## v5.8.0 highlights

These changes are based on commits after the `v5.7.0` tag in `feature_update_v5`.

### Fox Hunt / Beacon

Fusion builds add a programmable `FOX HUNT / BEACON` action with two complementary modes:

* Fox Hunt provides a calibrated `dBm` display, S-meter and peak readings, a one-second signal trend, selectable attenuation, Geiger-style or received-station audio, and a choice between a staircase gauge and an approximately 18-second signal history.
* Beacon uses the active TX VFO to transmit an ARDF identifier or `<CALLSIGN> MOE` in Morse, with adjustable `5` to `60-second` TX windows and `5` to `240-second` silent intervals.

Beacon takes its callsign from CHIRP `Message Line 1` and begins its first transmission immediately when selected. Before every burst, the firmware checks the applicable TX frequency lock, per-VFO `TXLock`, battery state, and modulation restriction.

The attenuation, gauge, audio mode, and Beacon interval are saved in external flash and are included in Air Copy `Settings` transfers.

See the historical [Fox Hunt / Beacon compatibility page](./Fox-Hunt-and-Beacon). For current firmware, use the separate [FoxHunt](./Fox-Hunt) and [Beacon](./Beacon) pages.

## v5.7.0 highlights

These changes are based on commits after the `v5.6.1` tag in `feature_update_v5`.

### UV Studio

[UV Studio](./UV-Studio) provides a unified browser-based interface for radio viewing, control, maintenance, and recovery.

It provides live screen mirroring and non-TX keypad control, compatible RF-log viewing and analytics, RF-log CSV export, firmware flashing, calibration backup/restore, and custom boot-logo management. It runs locally through `Web Serial` without an installation, server, or account.

UV Studio is the browser-based companion for the Fusion firmware.

### RF log

Builds with RX/TX logging add a programmable `RF LOG` shortcut action.

The RF log records receive, monitor, and transmit sessions in external flash, then shows them in a newest-first history view. Each entry can show the channel name or frequency, RX/TX direction, duration, RX S-meter or TX power level, and lowest battery voltage seen during the session.

The log screen supports:

* `ALL`, `RX`, and `TX` filters
* up to 512 visible traffic entries
* jump-to-newest and jump-to-oldest shortcuts with `F` plus the navigation keys (`UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1)
* a clear confirmation flow before erasing the log

See [Advanced features](./Advanced-features#rf-log) and [Button functions](./Button-functions#rf-log-action).

### ScanRange exclusions

`ScnRng` can now keep up to `64` temporary excluded frequencies, instead of `32`.

As before, the list is circular, is not written to memory, and is cleared when the radio restarts or when the range identity changes.

See [Scanning](./Scanning#excluding-frequencies-in-scnrng).

### SetLck lock scope

`SetLck` now has four choices instead of two:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` covers the programmable shortcuts assigned to the two side buttons and `M Long`. This makes it possible to keep those shortcuts available while locking the front keypad, or to disable them as part of the lock. `PTT` can be locked independently to prevent accidental transmission.

See [Menu](./Menu#main-menu) and [Button functions](./Button-functions#keypad-lock-and-setlck).

### UV Studio maintenance

The firmware-side screen streaming code has been renamed internally from screenshot handling to UV Studio handling. Builds that enable the optional RX/TX-log UV Studio bridge can also stream recent RF-log rows to compatible viewer tooling.

See [Advanced features](./Advanced-features#k5-viewer).

## v5.6.0 highlights

These changes are based on the post-`v5.5.0` commits in `feature_update_v5`.

### SetSav screen saver

Builds with screen-saver support add the `SetSav` menu.

Available modes:

* `OFF`: no screen saver
* `LOGO`: show the stored boot logo as an idle screen
* `LOGO+`: show the stored boot logo with a scrolling effect
* `MATRIX`: show a matrix-style animated idle screen

`SetSav` is tied to the backlight timeout. It can display on the main screen and FM broadcast screen when the radio is idle, and it is suspended during RX, TX, PTT, BEAM, and active FM scanning.

See [Radio operation](./Radio-operation#screen-saver-and-backlight-timeout) and [Menu](./Menu#main-menu).

Because `SetSav` is inserted before the hidden menu, hidden-menu indices move by one in `v5.6.0`: `F Lock` starts at `72` instead of `71`.

### Boot logo startup sound

When `POnMsg = LOGO`, the startup logo mode can still keep the normal boot beep behavior.

See [Menu](./Menu#main-menu) and [UV Studio](./UV-Studio#boot-logo).

### Scan RSSI indicator

Fast scan builds can display a small RSSI sparkline while scanning. It gives a compact view of recent RSSI samples so strong candidates stand out visually while the scan is running.

See [Scanning](./Scanning#scan-indicators-and-detection).

### Scan-range subaudible detection

`ScnRng` can detect CTCSS / DCS while stopped on a received signal. The detected subaudible code is shown in the scan UI when available.

See [Scanning](./Scanning#scan-indicators-and-detection).

### Frequency copy UI

The `F+4` frequency-copy scanner screen now separates the search state and the result more clearly:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* detected `Freq:` and `Tone:` details

See [Scanning](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### UV Studio and screenshot updates

Screen-saver frames are synchronized to UV Studio, and screenshot handling has been optimized to reduce RAM usage and avoid stale chunks.

See [Advanced features](./Advanced-features#k5-viewer).

### Fixes and refinements

That release also included several behavior fixes and UI refinements:

* bandscope / spectrum frequency rounding for `8.33 kHz` steps
* AM-to-FM dual-watch RX reconfiguration
* VFO lock icon placement while scanning
* screen-saver wake/sleep edge cases
* hollow manual-backlight icon when manual light is off

## v5.5.0 highlights

### Faster scan engine

Current builds can use the newer `FAST` scan engine for memory scan and `ScnRng`.

The `SetScn` menu selects between:

* `NORMAL`: the conservative scan path
* `FAST`: a faster path that pre-checks channels or range steps with RSSI before doing the full receive setup

In favorable conditions, `ScnRng` in `FAST` mode can scan around `150+` frequencies per second.

See [Scanning](./Scanning#scan-engine-mode-normal-vs-fast) and [Menu](./Menu#main-menu).

### Temporary scan-range exclusions

While a `ScnRng` scan is stopped on a received frequency, long-press `MENU` to exclude that frequency from the current range scan.

This was introduced with `32` slots in `v5.5.0`; current post-`v5.6.1` builds allow `64` temporary exclusions. These exclusions are cleared when the radio restarts or when the range identity changes.

See [Scanning](./Scanning#excluding-frequencies-in-scnrng).

### BEAM transfer mode

Builds with BEAM support can send the current VFO or memory-channel configuration to another radio, or receive a BEAM packet and save it to the first free memory channel.

BEAM is opened through a programmable shortcut action.

See [Advanced features](./Advanced-features#beam-transfer-mode) and [Button functions](./Button-functions#beam-action).

### Custom boot logo

Builds with logo support can display a custom `128x64` monochrome boot logo at startup.

Upload or download the logo with UV Studio, then select `LOGO` in the `POnMsg` menu.

See [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu), and [Troubleshooting](./Troubleshooting#my-custom-boot-logo-does-not-show).

### DCS / CTCSS display improvements

The `RxDCS`, `TxDCS`, `RxCTCS`, and `TxCTCS` menus now show both the selected entry position and the homologated index when one exists.

This makes it easier to distinguish normal list position, PMR446-homologated entries, extra tones, and inverted DCS entries.

See [Menu](./Menu#main-menu).

### Channel-name editing

`ChName` editing has been improved with multi-tap input, uppercase/lowercase switching, direct numeric entry with long key presses, and clearer `EXIT` behavior.

See [Menu](./Menu#main-menu).

### Spectrum analyzer persistence

The spectrum analyzer now saves more settings when leaving the sweep screen with `EXIT`, including trigger mode, automatic sensitivity profile, manual scale, and trigger level.

Starting the analyzer from `ScnRng` no longer overwrites the saved scan step or bar-count preference.

See [Spectrum analyzer](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf and build information

`SysInf` is now paginated in current builds. Depending on build options, it can show identity, build date/time, commit identifier, battery information, memory usage, and QR-code project links.

See [Menu](./Menu#main-menu).

### Air Copy settings coverage

Air Copy `Settings` transfers now include the VFO area used by features such as `ScnRng`, so scan-range boundary frequencies are replicated when copying settings.

See [AirCopy](./AirCopy).

## Recent v5.x changes also worth knowing

The following changes landed shortly before `v5.5.0` and are documented in the wiki because they affect daily use:

* `SetRxA` selects different RX audio profiles for `FM` and `AM`; in `AM`, it can switch between `SHARP`, `STOCK`, and `OPEN`.
* scan lists support short names, and memory scan can switch between valid non-empty lists while scanning.
* `SysInf`, FM broadcast radio, and the spectrum analyzer UI were refined across recent builds.
* the hidden `SetNav` menu lets the same documentation work for `UV-K1` and `UV-K5 V3` navigation styles.

See [Menu](./Menu), [Scanning](./Scanning), [Radio operation](./Radio-operation), and [FM broadcast radio receiver](./FM-broadcast-radio-receiver).

## Related pages

* [Getting started](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Button functions](./Button-functions)
* [Advanced features](./Advanced-features)
* [Spectrum analyzer](./Spectrum-analyzer)
* [Menu](./Menu)
