> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Fox-Hunt/).

# FoxHunt

FoxHunt is a receive-only signal-strength application for Amateur Radio Direction Finding (ARDF). It helps the operator approach a hidden transmitter by showing calibrated `dBm`, S-meter, peak, minimum, trend, and recent signal history.

Since `v6.0.0`, FoxHunt and [Beacon](./Beacon) are separate applications and separate programmable actions. FoxHunt does not transmit and does not switch into Beacon.

FoxHunt is resident in the `FieldOps` edition. In `Labs`, install the `FoxHunt` overlay app with [UV Studio](./UV-Studio#apps-labs). The `FOX HUNT` shortcut launches the resident application or the matching installed overlay app, depending on the edition.

## Starting FoxHunt

Assign `FOX HUNT` to `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`, then trigger that shortcut on the VFO you want to monitor. In Labs you can also launch `FoxHunt` from the `F + 7` app selector.

> [!NOTE]
> Navigation uses `UP` / `DOWN` on UV-K5 and `LEFT` / `RIGHT` on UV-K1. The active layout follows `SetNav`.

## Display and controls

The signal scale runs from `S0` to `S9+40`. The main gauge can show either a 13-level staircase or an approximately 18-second scrolling history. The trend compares the current signal with the level measured roughly one second earlier.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Control | Action |
| --- | --- |
| `1` | Toggle the staircase and signal-history displays |
| `2` | Cycle silent, Geiger-style beep, and received-station audio |
| `3` | Cycle `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP`, and `BYP+` |
| navigation keys | Increase or decrease attenuation directly |
| `F`, then `2` or `3` | Step the corresponding setting backwards |
| `M` | Reset peak, minimum, and trend references |
| hold `F` for about 0.5 seconds | Lock or unlock the FoxHunt controls |
| `EXIT` | Exit FoxHunt |

While locked, only the navigation keys for attenuation and another long press of `F` remain available.

## Direction-finding tips

* Increase attenuation as the signal becomes strong so the meter stays away from full scale.
* Reset the references with `M` before each comparison or body scan.
* Hold the radio against your chest and rotate slowly; your body often creates a useful signal minimum in the direction away from the transmitter.
* Use peak (`PK`) and minimum (`MN`) to compare a complete rotation.
* Use the history graph to see signal valleys and the trend indicator while walking a bearing.

`BYP` and `BYP+` are close-range gain settings, not a literal hardware bypass. The displayed absolute `dBm` value changes with the gain step, so compare readings while staying on the same step.

## Saved settings

FoxHunt saves its attenuation, gauge, and audio mode. These settings are restored at the next launch and are included in an AirCopy `Settings` transfer. The temporary application lock is not saved.

## Related pages

* [Beacon](./Beacon)
* [Button functions](./Button-functions#fox-hunt-action)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Advanced features](./Advanced-features)
