> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Multiboot-and-Multiconfig/).

# Multiboot and Multiconfig

Starting with `v6.0.0`, compatible editions can keep several F4HWN firmware images in the radio's external Flash and restore one from a selector at startup. Each firmware slot has its own configuration bank by default, so trying another edition does not overwrite the channels and settings used by the other slots.

Multiboot is included in the four official `v6.0.0` editions: `Fusion`, `FieldOps`, `Transfer`, and `Labs`. Firmware slots are managed with [UV Studio](./UV-Studio#firmware-slots) while the radio is running normally.

> [!IMPORTANT]
> Only put a `v6.0.0` or newer F4HWN image with Multiboot support in a firmware slot. A `v5.x`, stock, or other non-Multiboot firmware may run after being restored, but it cannot open the startup selector to return to another slot.

## Firmware slots

The radio keeps five Multiboot entries:

| Radio label | Purpose | Managed by |
| --- | --- | --- |
| `M` | `Main`, an automatic backup of the firmware installed through the normal flashing procedure | firmware |
| `1` to `4` | additional F4HWN firmware images | UV Studio |

`Main` is protected from host writes. On the first boot of a Multiboot-capable firmware installed through the normal `Flash Firmware` procedure, the radio displays `Init Main` and copies the running firmware into `M`. Do not switch the radio off during this initialization.

The four user slots live only in external Flash until selected. Installing or erasing one in UV Studio does not immediately replace the firmware currently running from internal Flash.

## Installing a firmware in a slot

1. Start the radio normally with a Multiboot-enabled firmware.
1. Connect it to a desktop browser with a supported USB data connection.
1. Open [UV Studio](https://armel.github.io/uvstudio/) and select `Firmware Slots`.
1. Select a compatible stable `v6.x` F4HWN build from the catalog, or choose a compatible local `.bin` file.
1. Choose slot `1`, `2`, `3`, or `4` and optionally edit its display name.
1. Select `Write to slot`, confirm, and wait for the erase, write, and verification steps to finish.

Each slot accepts an application image up to `118 KiB`. UV Studio writes the image to external Flash, stores its size and CRC, then asks the radio to verify the complete image.

`Erase FW` removes the external firmware image from that user slot. It does not erase the slot's configuration bank and does not affect a copy of that firmware already running in internal Flash.

## Selecting a firmware at startup

1. Switch the radio off.
1. Hold `M` (`MENU`) by itself while switching the radio on. Do not hold `PTT`.
1. Release the key when the `F4HWN MULTIBOOT` screen appears.
1. Wait while the radio scans and validates the slots.
1. Use `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1, to select `M` or slot `1` to `4`. The active layout follows `SetNav`.
1. Press `M` to select it, then press `M` again on `Restore ...?` to confirm.
1. Do not switch the radio off during `Writing / Verify`. The radio restarts automatically with the selected firmware.

Press `EXIT` from the slot list to cancel and continue starting the firmware already installed. Invalid, incomplete, oversized, or CRC-failing slots are displayed but cannot be restored.

The selector initially highlights the slot from which the running firmware came. It is also mirrored in UV Studio when that support is available.

## Multiconfig: one configuration bank per slot

By default, selecting firmware slot `N` also selects configuration bank `N`:

| Firmware | Default configuration | Contents kept in that bank |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | memory channels, names, VFOs, scan lists, and radio settings |
| slot `1` | `CFG 1` | its own copy of the same configuration areas |
| slot `2` | `CFG 2` | its own copy of the same configuration areas |
| slot `3` | `CFG 3` | its own copy of the same configuration areas |
| slot `4` | `CFG 4` | its own copy of the same configuration areas |

Calibration data, the boot logo, Multiboot metadata, firmware/app slots, and the RF log are shared rather than duplicated in each bank.

An unused configuration bank starts with factory defaults the first time it is used. This separation is useful when editions have different settings or when you want to test a firmware without modifying the normal `Main` configuration.

## Using SetCfg

The `SetCfg` menu lets the running firmware use a different configuration bank without changing firmware. For example, `SLOT 2 / CFG 4` means that the firmware restored from slot 2 is currently using the channels and settings stored in bank 4.

1. Open the normal menu and select `SetCfg`.
1. Choose `CFG M`, `CFG 1`, `CFG 2`, `CFG 3`, or `CFG 4`.
1. Press `M`, then press `M` again at `SURE?`.
1. The radio restarts and maps the selected bank.

Confirming the bank already in use is a no-op and does not restart the radio. The `SysInf` identity page shows separate `SLOT` and `CFG` badges so you can always check the current combination.

> [!CAUTION]
> `SetCfg` deliberately allows configurations to be shared across firmware editions and versions. Compatibility is your responsibility. Back up important channel/settings data before opening a bank with firmware that may use a different data layout.

In UV Studio, `Reset config` erases the configuration bank associated with user slot `1` to `4` without erasing its firmware. The next boot using that bank recreates default settings. `CFG M` is protected from this command; use the firmware's normal factory-reset procedure for the Main configuration.

## Recovery and safety notes

* Every slot is fully CRC-checked before internal Flash is erased.
* The active slot/config state is stored redundantly and verified before a restore begins.
* `DO NOT POWER OFF` means that internal Flash is being rewritten. Interrupting this stage can make the application unbootable and require normal DFU recovery.
* If a normal firmware flash replaces the internal image, the next Multiboot-capable boot detects the change and adopts that image as the new `Main` backup with `CFG M`.
* If the radio reports `STATE ERROR` or `Flash state unknown`, restart it. The firmware stops there deliberately rather than risk writing through an uncertain configuration mapping.

## Related pages

* [UV Studio](./UV-Studio#firmware-slots)
* [Recent changes](./Recent-changes)
* [Menu](./Menu)
* [Overlay apps](./Overlay-apps)
* [Troubleshooting](./Troubleshooting)
