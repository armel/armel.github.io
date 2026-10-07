> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/AirCopy/).

# AirCopy

AirCopy transfers memory channels and radio settings between compatible radios. It uses FSK over the air and, starting with `v6.1.0`, can also use a direct serial cable connection.

> [!IMPORTANT]
> AirCopy is included in the `Transfer` and `Labs` editions. It is not part of the standard `Fusion` or `FieldOps` editions.

> [!WARNING]
> AirCopy is not intended to make unlike firmware layouts compatible. Use the same firmware generation on both radios and select the same data section on the sender and receiver. The optimized `v6.1.0` protocol is not wire-compatible with earlier AirCopy versions.

## Starting AirCopy

1. Switch the radio off.
1. Hold `PTT` + `SIDE BUTTON 2️⃣` while switching it on.
1. Release all keys when the AirCopy screen appears.

The default over-the-air frequency is `434.000 MHz` at very low power. You can enter another permitted frequency with the keypad before starting the transfer.

Use the navigation keys to select the same section on both radios:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Then start the target before the source:

1. On the receiving radio, press `EXIT`.
1. On the sending radio, press `M`.
1. Wait for `AIR COPY OK` on both radios.

Each memory selection transfers `128` channels, including channel names and attributes. `Settings` includes radio settings, scan-list names, the VFO area used by `ScnRng`, the `MIX` scan-list selection, and the saved FoxHunt and Beacon preferences. `All (Mem+Set)` transfers all eight memory banks and Settings in one run.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Reliable protocol in v6.0.0

`v6.0.0` introduced an acknowledged transfer protocol:

* the receiver validates framing, offset, and CRC before storing data
* the receiver acknowledges valid data and rejects damaged or unexpected data
* the sender retries an unacknowledged or rejected block up to three times
* duplicate data is acknowledged without being written twice, recovering safely from a lost acknowledgement
* the screen reports progress, retry count (`RT`), and receive-error count (`ER`)

A memory bank contains `68` AirCopy blocks of `64 bytes`; `Settings` contains `12` blocks. Because the receiver sends acknowledgements, both radios transmit briefly on the selected frequency.

## v6.1.0 improvements

### Faster radio transfers

The new protocol carries up to three `64-byte` blocks in one FSK data frame. This reduces the fixed turnaround and acknowledgement overhead and makes a full transfer approximately twice as fast under similar radio conditions.

Before sending data, the source provides CRC32 hashes for groups of up to `24` blocks. The target compares those hashes with its local data and requests only the blocks that differ. Repeating a backup or synchronizing two nearly identical radios can therefore be much faster than copying every block again.

The progress gauge distinguishes data that was already identical from data that was actually copied. The protocol also validates that sender and receiver selected the same logical data section; a mismatch fails instead of writing a different map by mistake.

### Cable Copy

The `Transfer` edition adds `CABLE COPY` over UART. On the ready screen, press `* SCAN` to switch between radio and cable transport. Cable mode uses the same comparison, acknowledgement, retry, and selection checks as radio mode, but does not use an RF frequency.

The implementation raises the serial rate for the transfer and restores the normal rate afterward. Both radios must run matching cable-copy firmware and use a compatible direct serial connection.

### External-Flash cloning

When `CABLE COPY` is active in the `Transfer` edition, an additional `Flash 2M` selection can clone the radio's external Flash. It compares `4 KiB` sectors by CRC32 and writes only different sectors. The device-specific calibration sector is deliberately excluded.

> [!WARNING]
> External-Flash cloning can replace firmware slots, configuration banks, apps, logs, logos, and other shared external-Flash data on the receiving radio. Back up important data first, verify the direction carefully, and do not disconnect or power off either radio during the operation.

## Troubleshooting

If a transfer fails:

* confirm that both radios use the same compatible firmware version
* confirm that both radios show the same selection and transport
* start reception with `EXIT` before starting transmission with `M`
* for radio transfer, reduce the distance or move away from interference
* for cable transfer, check the direct serial connection and reconnect both radios
* retry without changing the selection

## Related pages

* [Recent changes](./Recent-changes)
* [Advanced features](./Advanced-features)
* [Scanning](./Scanning)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Troubleshooting](./Troubleshooting)
