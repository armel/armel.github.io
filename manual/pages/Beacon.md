> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Beacon/).

# Beacon

Beacon is a transmitting ARDF-style Morse application. It repeatedly sends a selected identifier on the active TX VFO, alternating between a configurable transmit window and silent interval.

Since `v6.0.0`, Beacon and [FoxHunt](./Fox-Hunt) are separate applications and separate programmable actions. Beacon starts directly in its transmit cycle; it does not open through FoxHunt.

Beacon is resident in the `FieldOps` edition. In `Labs`, install the `Beacon` overlay app with [UV Studio](./UV-Studio#apps-labs). The `BEACON` shortcut launches the resident application or the matching installed overlay app, depending on the edition.

> [!WARNING]
> Beacon starts its first transmission immediately. Before launching it, verify the active TX VFO, frequency, power, antenna, `F Lock`, `TXLock`, callsign and identification requirements, duty cycle, and local regulations. Do not leave an unattended beacon transmitting where autonomous or periodic transmissions are prohibited.

## Starting Beacon

Assign `BEACON` to `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`, then trigger that shortcut. In Labs you can also launch `Beacon` from the `F + 7` app selector.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identifiers

| Setting | Message | Purpose |
| --- | --- | --- |
| `MOE` to `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | five standard IARU ARDF fox identifiers |
| `MO` | `MO` | finish/home identifier |
| `CALL` | configured callsign followed by `MOE` | identified amateur-band beacon |

The callsign comes from CHIRP `Message Line 1`. Letters are converted to uppercase; letters, digits, and `/` are supported. See [Programming with CHIRP](./Programming-with-CHIRP#beacon-identification).

The identifier uses a `1000 Hz` tone at approximately `12 WPM`.

## Timing and keying

* `TX`: `5` to `60 seconds`, in `5-second` steps; default `30 seconds`
* `IDLE`: `5` to `240 seconds`, in `5-second` steps; default `30 seconds`

For classic five-fox timing, use `TX = 60 s` and `IDLE = 240 s`.

| Mode | Behavior |
| --- | --- |
| `TONE` | Keeps the FM carrier active for the complete TX window and keys the `1000 Hz` tone |
| `CARR` | Keys the carrier and tone together for each Morse element, so the signal disappears in the gaps |

`TONE` is the cleaner default. `CARR` more closely reproduces carrier-interrupted ARDF transmitters, but direct carrier keying can produce small clicks and additional spectral spread.

## Controls

| Control | Action |
| --- | --- |
| `1` | Cycle the `TX` duration |
| `2` | Cycle the `IDLE` duration |
| `3` | Cycle the identifier |
| `4` | Toggle `TONE` / `CARR` |
| `F`, then `1`, `2`, `3`, or `4` | Step the corresponding setting backwards |
| hold `F` for about 0.5 seconds | Lock or unlock all Beacon controls |
| `M` during TX | Stop the current transmission and begin a fresh idle interval |
| `M` while idle | Restart the full idle countdown |
| `EXIT` | Stop safely and exit Beacon |

Before every burst, Beacon checks the normal TX-frequency restrictions, per-channel `TXLock`, battery state, and modulation. If transmission is refused, it shows the corresponding radio status and waits before trying the next scheduled burst.

## Saved settings

Beacon saves its identifier, `TX` duration, `IDLE` duration, and `TONE` / `CARR` mode. These settings are restored at the next launch and are included in an AirCopy `Settings` transfer. The temporary application lock is not saved.

## Related pages

* [FoxHunt](./Fox-Hunt)
* [Button functions](./Button-functions#beacon-action)
* [Programming with CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Radio operation](./Radio-operation)
