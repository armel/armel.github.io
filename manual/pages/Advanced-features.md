> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Advanced-features/).

# Advanced features

This page covers specialized or optional features that are not needed for basic radio operation: BEAM, RF log, RescueOps, UV Studio, Resume Mode, the built-in game, and the research-oriented TX unlock procedure. AirCopy, FoxHunt, Beacon, Multiboot, and overlay apps have their own detailed pages.

For day-to-day radio usage, see [Radio operation](./Radio-operation). For scan-related features, see [Scanning](./Scanning).

> [!NOTE]
> Where this page mentions `UP` / `DOWN`, use the equivalent `LEFT` / `RIGHT` keys on UV-K1. The active navigation layout follows `SetNav`.

## On this page

* [AirCopy](#aircopy)
* [Multiboot, Multiconfig, and overlay apps](#multiboot-multiconfig-and-overlay-apps)
* [BEAM transfer mode](#beam-transfer-mode)
* [FoxHunt](#foxhunt)
* [Beacon](#beacon)
* [RF log](#rf-log)
* [RescueOps](#rescueops)
* [Game](#game)
* [UV Studio](#uv-studio)
* [Resume Mode](#resume-mode)
* [TX on all bands](#tx-on-all-bands)
* [Related pages](#related-pages)

## AirCopy

AirCopy transfers memory banks and settings between compatible radios. `v6.0.0` added acknowledged blocks, retries, duplicate handling, and `All (Mem+Set)`. `v6.1.0` adds multi-block frames, comparison and skipping of identical blocks, cable transport, and protected external-Flash cloning in the Transfer edition.

See [AirCopy](./AirCopy) for edition availability, controls, protocol compatibility, radio transfers, `CABLE COPY`, and `Flash 2M` safety information.

## Multiboot, Multiconfig, and overlay apps

`v6.0.0` adds two larger platforms documented separately:

* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig) explains `Main` plus four firmware slots, the startup selector, independent configuration banks, `SetCfg`, and UV Studio slot management.
* [Overlay apps](./Overlay-apps) explains the experimental Labs-only `.app` platform, installation through UV Studio, the `F + 7` launcher, compatibility checks, and app development.

## BEAM transfer mode

BEAM is an optional direct transfer mode for one VFO or memory channel. Unlike [AirCopy](./AirCopy), which transfers memory banks or settings sections, BEAM is meant for quickly sharing the currently selected setup with another compatible radio.

Assign `BEAM` to one of the customizable shortcuts (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`), then trigger that shortcut to open BEAM mode.

In BEAM mode:

* `UP` / `DOWN` toggles between `BEAM TX` and `BEAM RX`
* `M` starts the selected operation
* `EXIT` leaves BEAM mode

`BEAM TX` sends the current VFO or memory-channel configuration, including frequency, offset, tones, modulation, bandwidth, power, scan-list assignment, compander, DTMF-related settings when enabled, and channel name.

`BEAM RX` waits for a BEAM packet from another radio and saves it to the first free memory channel. If memory is full, the status shows `MEM FULL`.

See [Button functions](./Button-functions#beam-action) for the shortcut-level details.

## FoxHunt

[FoxHunt](./Fox-Hunt) is a receive-only signal-strength and direction-finding application. Since `v6.0.0`, it has its own `FOX HUNT` shortcut action. It is resident in FieldOps and available as an installable overlay app in Labs.

## Beacon

[Beacon](./Beacon) is a separate ARDF-style Morse transmitting application with its own `BEACON` shortcut action and safety requirements. It is resident in FieldOps and available as a separate installable overlay app in Labs.

## RF log

Builds with RX/TX logging add an `RF LOG` shortcut action. Assign it to `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`, then trigger that shortcut to open the history screen.

The RF log records receive, monitor, and transmit sessions to external flash. It is useful for checking recent activity after scanning, monitoring an unattended channel, or reviewing transmissions made during field use.

Each logged traffic entry stores:

* frequency, or the memory channel reference when the session came from a saved channel
* RX or TX direction
* session duration
* peak RX S-meter level for received sessions, or TX power level for transmitted sessions
* lowest battery voltage measured during the session

The log view shows the latest entries first and exposes up to 512 traffic entries. When the `ALL` filter is selected, horizontal separator lines mark radio restarts.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Controls on the RF log screen:

* `UP` / `DOWN`: scroll through entries
* `F` + `UP`: jump to the newest entry
* `F` + `DOWN`: jump to the oldest visible entry
* `M`: cycle the filter between `ALL`, `RX`, and `TX`
* `* SCAN`: cycle the right-side detail badge between duration, S-meter / TX power, and lowest battery voltage
* long-press `M`: open the clear confirmation; long-press `M` again on `CLEAR LOG / SURE?` to erase the log
* `EXIT`: leave the RF log screen, or cancel the clear confirmation

The log is stored in a reserved external-flash area, so it survives normal power cycles. Clearing the log erases that reserved area.

See [Button functions](./Button-functions#rf-log-action) for the shortcut-level details.

## RescueOps

### Disclaimer

I would like to clarify that I am not an expert in emergency services; however, this special feature has been developed with the intent to meet the communication needs of first responders as effectively as possible. I am open to improvement suggestions from professionals, within the limits of my abilities, the time available to me, and the technical capabilities of the transceiver.

### Overview

The RescueOps feature has been specifically developed to integrate into a communication system designed for first responders (firefighters, etc.). It adds restricted field controls and enhanced Flashlight behavior, which can be set to fixed, blinking, or SOS modes. The `SetKey` menu selects the startup key used with `PTT` to enter or leave RescueOps mode. By default the key is `MENU`, but it can also be `UP`, `DOWN`, `EXIT`, or `* SCAN`.

In the official `v6.0.0` family, RescueOps is included in `FieldOps` and `Labs`. AirCopy is a separate capability provided by `Transfer` and `Labs`; enabling RescueOps does not by itself enable AirCopy.

### Usage

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), a member of the “[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”, has written [documentation](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) specifically dedicated to the use of the RescueOps feature. Many thanks to him.

By default, the transceiver functions like any other firmware version, allowing access to menus (and hidden menus), long presses, or `F` key combinations to activate various functions directly from the keyboard (for example, to start a scan or adjust transmission power), as well as shortcuts.

However, if the transceiver is turned on while pressing both the `PTT` and the key configured in the `SetKey` menu, it will switch to RescueOps mode, triggering the following changes:

* the menu is locked
* long presses and `F` key combinations are disabled (except `A/B` and keypad lock)
* restart in hidden-menu mode is blocked
* the keypad can only be used to change memory channels, just like the `UP` and `DOWN` keys

Short and long presses on `F1` and `F2`, as well as long presses on `M`, remain available for shortcuts. This configuration is the responsibility of the person in charge of setting up the transceiver. If shortcuts are not desired, they can simply be set to the action `NONE`.

Note that the RescueOps feature offers 2 new actions:

* `POWER HIGH`, which lets you quickly switch temporarily to the maximum power of `5 W` if required
* `REMOVE OFFSET`, to temporarily remove the offset of a memory channel if present

These 2 actions were added at the request of rescue professionals and correspond to needs in the field.

Once in RescueOps mode, each normal startup keeps the transceiver in this mode. To return to the default mode, with access to menus and hidden menus, simply repeat the startup operation while pressing both the `PTT` and the key configured in the `SetKey` menu.

## Game

This firmware includes a small breakout game.

* In builds without overlay apps, press `F+7` to start the resident game.
* In the `Labs` edition, `F+7` opens the [overlay-app launcher](./Overlay-apps); install and select `Breakout` or another game there.
* To exit, press `EXIT`
* You can pause the game with `M`
* Move the paddle using `4` or `UP` to go left, and `0` or `DOWN` to go right

This game has no ambition beyond fun. The idea was simply to explore what is possible on the Quansheng K5 alongside its radio features. Think of it as a playful nod to the Nokia 3310 era.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## UV Studio

[UV Studio](./UV-Studio) is the unified browser-based companion for this firmware:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

It provides the radio's browser-based viewing, control, maintenance, and recovery workflows:

* live `128x64` screen mirroring
* virtual UV-K1 and UV-K5 keypads with supported short and long presses
* compatible RF-log streaming, analytics, and CSV export
* firmware flashing from stable edition catalogs, the rolling development build, or a local file
* Multiboot firmware-slot and Labs overlay-app management
* calibration backup and restore
* custom boot-logo upload and download
* in `v1.6.0`, Labs-only external-Flash backup/restore and guided factory-software recovery

It uses `Web Serial` and runs locally in a compatible desktop browser without an installation, server, or account.

> [!IMPORTANT]
> Viewer key control does not provide remote TX. UV Studio cannot start a transmission, and its on-screen `PTT` does not transmit.

See [UV Studio](./UV-Studio) for version status, edition requirements, radio modes, safety information, and the complete workflows.

## Resume Mode

Your transceiver will restart in the same state it was in before being turned off. So, if it was in Bandscope mode, listening to FM broadcast, or scanning, it will automatically resume that state upon the next startup.

## TX on all bands

### Warning

**This modification is UNTESTED and is for RESEARCH PURPOSES ONLY, to explore the capabilities of the device and its chipset. DO NOT transmit on illegal frequencies. DO use a dummy load. The author(s) and contributor(s) of this repository are NOT liable for any damages, litigation, or other consequences of the misuse of this research firmware and do not accept any culpability. By installing any firmware from this repository, you accept full responsibility for any consequences that may arise and waive the right to pursue legal action against the author(s).**

This option will not allow you to transmit in any modulation other than FM; this is a hardware limitation. Switching to AM or SSB only changes the AF audio output mode of the RF IC. It does not switch the whole IC into AM / SSB mode. This is for listening only. This firmware is also built with an additional lock that blocks TX when AM or SSB is enabled.

As an example of why this should not be used for actual communications, consider the following chart for transmission power at `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 microwatts**
* `54 MHz` -> 2.4 milliwatts
* `81 MHz` -> 230 milliwatts
* `109 MHz` -> 558 milliwatts
* `136 MHz` -> 412 milliwatts
* `163 MHz` -> 122 milliwatts
* `190 MHz` -> 14.8 milliwatts
* `218 MHz` -> 2 milliwatts
* `245 MHz` -> 2.6 milliwatts

Credits: [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### How to unlock TX on all bands

1. Go to the [hidden menu](./Menu#hidden-menu)
1. Enter menu `F Lock`
1. Choose option `UNLOCK ALL`
1. Repeat steps 2-3 **3 times**. Do it carefully. If you confirm any other option in the process, the counter is reset and you will have to repeat the procedure again.

## Related pages

* [Getting started](./Getting-started)
* [Radio operation](./Radio-operation)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [Button functions](./Button-functions)
* [Troubleshooting](./Troubleshooting)
