> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Overlay-apps/).

# Overlay apps

Overlay apps are small `.app` programs stored in external Flash and loaded into a dedicated `4 KiB` RAM workspace only when launched. They let the experimental `Labs` edition add tools, radio modes, visual demos, and games without permanently fitting every app into the firmware's internal Flash.

> [!WARNING]
> Overlay apps are an experimental `v6.0.0` feature. At present, only the `Labs` edition contains the app loader. Apps are tied to a firmware ABI, API level, RAM address, and optional resident capabilities; update or reinstall an app if the radio reports a compatibility error.

## How the platform works

The radio provides `8` external-Flash app slots. Each slot contains a header plus app code of at most `4 KiB`. Before an app runs, the loader checks:

* the app file/header format and committed state
* the required ABI and minimum API level
* the code size and RAM link address
* the app's required resident firmware capabilities
* a CRC-32 of the code after it has been loaded into RAM

The internal firmware Flash is never rewritten when an app is installed, launched, or deleted. A bad or incompatible app is refused cleanly instead of being executed.

The current catalog contains eleven apps: radio tools such as `Broadcast FM`, `FoxHunt`, `Beacon`, and `Beam`, plus `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll`, and `Space Impact`. See [Overlay applications](./Overlay-applications) for the documented apps and their controls. Availability depends on the app binaries distributed for the selected firmware version and on the capabilities compiled into the running Labs firmware.

## Installing an app with UV Studio

1. Start the radio normally with the `Labs` edition.
1. Connect it to a desktop browser with a supported USB data connection.
1. Open [UV Studio](https://armel.github.io/uvstudio/) and select `Apps` (`Labs only`).
1. Select the firmware version and a compatible app from the official catalog, or choose a local `.app` file.
1. Choose the target app slot.
1. Select `Install app` and wait for writing and verification to complete.

UV Studio can refresh the slot table, show each app's name, version, size, and status, and delete an app without touching the rest of the radio.

The app slots are numbered `1` to `8` in UV Studio and in the on-radio `F + 7` launcher.

## Launching an app

1. From the normal radio screen, press `F`, then `7 VOX`.
1. Use `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1, to select one of the eight displayed slots. The active layout follows `SetNav`.
1. Press `M` to run the selected app.
1. Use the controls shown by that app; in most apps, `EXIT` returns to the app launcher or normal radio screen.

Empty slots remain visible in the launcher. The selected slot and scroll position are remembered until the radio restarts. The launcher and compatible apps are mirrored in UV Studio.

Some apps can also advertise one of the normal programmable actions: `FM RADIO`, `FOX HUNT`, `BEACON`, or `BEAM`. When the matching app is installed and valid, that action can launch it directly from an assigned key or the side-key action picker. If more than one installed app advertises the same action, the lowest-numbered compatible slot is used.

## Compatibility messages

| Radio message | Meaning / action |
| --- | --- |
| `UPDATE APP` | the app format, ABI, size, or link address is older or incompatible; install a matching app build |
| `UPDATE FIRMWARE` | the app requires a newer app API; update the Labs firmware |
| `REINSTALL APP` | the write is incomplete or the code CRC is wrong; install the `.app` file again |
| `NOT SUPPORTED` | the app needs a resident capability that this Labs build does not include |
| `NO APP` | the selected slot is empty or has no valid app header |

After an app exits, the loader restores the selected VFO, receive/dual-watch tuning, backlight handling, and external-Flash cache. Apps that modify supported shared data, such as Broadcast FM presets or Beam channel data, ask the resident firmware to commit it after the overlay code has stopped running.

## Building apps from source

Developers can build the apps present in the firmware repository with:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Generated `.app` files are placed in `build/Apps/`. Each app is linked at the firmware's configured overlay address and packed with its metadata and CRC. Rebuild apps when the ABI, API, required capabilities, or overlay address changes.

## Related pages

* [Overlay applications](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [Button functions](./Button-functions)
* [Recent changes](./Recent-changes)
* [Advanced features](./Advanced-features)
