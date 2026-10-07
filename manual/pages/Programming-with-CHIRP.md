> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Programming-with-CHIRP/).

# Programming with CHIRP

This page explains how to use `CHIRP` with the dedicated driver included with each firmware release.

> [!WARNING]
> Use the `CHIRP` driver from the same firmware release as the one installed on your radio.
> Do not use Quansheng CPS.
> Do not use a generic `UV-K5` driver or a driver from another firmware release.

## Compatibility

The dedicated `v6.1.0` driver supports every official `v6.1.0` edition on:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer`, and `Labs`

It is not for:

* `UV-K5 V1 / V2`
* other Quansheng models
* unrelated firmware families

Because this firmware uses its own memory and settings layout, another driver can read or write the wrong data. Always match the driver version to the firmware version, even when moving between official editions.

Do not assume that the older `v6.0.0` driver is interchangeable with the `v6.1.0` driver.

## Before you start

* make sure the radio runs the matching F4HWN release
* locate the included driver file in that release package
* be ready to save a backup of the radio image before editing anything

> [!NOTE]
> `CHIRP` may show this driver as experimental. That is expected.

## Upgrading to v6.1.0

Before updating from an earlier firmware generation:

1. Download the radio with the driver matching the currently installed firmware.
1. Save that image and optionally export the memory channels to CSV.
1. Back up the radio calibration with [UV Studio](./UV-Studio#calibration).
1. Flash the chosen `v6.1.0` edition.
1. If required by the version you are migrating from, enter the hidden menu and perform `RESET ALL`.
1. Load the dedicated `v6.1.0` CHIRP driver and download a fresh image from the updated radio.
1. Copy and paste the old channels into that fresh image, then upload it.

> [!WARNING]
> Do not directly import an old CSV over the complete new radio image. Copy and paste the channel rows into a freshly downloaded image so the new version's settings layout remains intact.

## Load the dedicated driver in CHIRP

1. Open `CHIRP`.
2. If `File > Load Module...` is not available, enable CHIRP `Help > Developer Mode` features first (Help menu), then restart `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Use `File > Load Module...` and select the `f4hwn.fusion.chirp...py` file included with the firmware release.
4. Once the module is loaded, `CHIRP` should offer the `UV-K1 & UV-K5 V3 (F4HWN Fusion)` model entry.

> [!NOTE]
> The module filename and CHIRP model label retain the historical `Fusion` name. The `v6.1.0` module is nevertheless the shared driver for all four official editions.

## Download from the radio

1. Turn the radio on.
1. Connect the radio with either a compatible `USB-C` cable or a compatible double-jack programming cable on the `mic/spkr` connector.
1. Make sure the connector is firmly inserted.
1. In `CHIRP`, choose `Radio > Download From Radio...`
1. Select the correct serial port.
1. Select `Vendor`: `Quansheng`.
1. Select `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Start the download and wait until the radio image has been fully read.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> If communication fails, disconnect the cable, turn the radio on first, then reconnect the cable. The dedicated driver warns that some setups may fail if the radio was powered on with the cable already attached.

## Show the extra fields

After the download, enable `View > Show Extra Fields` in `CHIRP` (View menu).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

This is important because the dedicated driver exposes several channel-specific fields through the `Extra` group. Without `Show Extra Fields`, some firmware-specific parameters remain hidden in the channel editor.

Typical examples include:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Edit and upload

You can then edit memories, names, and the supported settings.

When you are ready:

1. Review your changes.
1. In `CHIRP`, choose `Radio > Upload To Radio...`
1. Use the same port, vendor, and model.
1. Wait until the upload is fully complete before touching the cable or turning the radio off.

> [!WARNING]
> Leave calibration-related or advanced items alone unless you know exactly what they do.

## Beacon identification

The independent Beacon application uses the CHIRP `Message Line 1` setting as its callsign. The dedicated driver accepts up to `12 characters` in this field.

When Beacon transmits in `CALL` mode, the firmware converts letters to uppercase, keeps letters, digits, and `/`, removes unsupported characters, and appends ` MOE`. If the resulting callsign is empty, it transmits `MOE`.

After changing `Message Line 1`, upload the settings to the radio before starting Beacon. See [Beacon](./Beacon) for transmission behavior and safety information.

## Good practice

* always use the driver included with the same firmware release
* always download first, then save a backup
* after a firmware update, reload the newer driver module from that release
* use `CHIRP` for bulk programming, not Quansheng CPS

## If something looks wrong

Check these points:

1. the radio is really a `UV-K1` or `UV-K5 V3`
1. the radio runs the expected F4HWN version and edition
1. `CHIRP` loaded the driver from that same release, not another `UV-K5` module
1. the cable is fully inserted
1. the selected serial port is the correct one

## Related pages

* [Getting started](./Getting-started)
* [Radio operation](./Radio-operation)
* [Beacon](./Beacon)
* [Troubleshooting](./Troubleshooting)
