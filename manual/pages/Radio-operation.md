> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Radio-operation/).

# Radio operation

This page covers the day-to-day operation of the transceiver: switching between VFO and memory mode, reading the status bar, understanding TX restrictions, and managing sleep behavior.

For scan-related features, see [Scanning](./Scanning). For browser-based live viewing and maintenance, see [UV Studio](./UV-Studio). For radio-to-radio copying, see [AirCopy](./AirCopy). For RescueOps, Resume Mode, the built-in game, and the research-oriented TX unlock procedure, see [Advanced features](./Advanced-features).

> [!WARNING]
> Do not use Quansheng CPS. It overwrites custom settings.

## On this page

* [Basic operation & configuration](#basic-operation--configuration)
* [Status bar](#status-bar)
* [Battery display, type, and calibration](#battery-display-type-and-calibration)
* [About the `F Lock` and `TXLock` menus](#about-the-f-lock-and-txlock-menus)
* [Screen saver and backlight timeout](#screen-saver-and-backlight-timeout)
* [About the SetOff menu](#about-the-setoff-menu)
* [1750 Hz tone burst for repeater access](#1750-hz-tone-burst-for-repeater-access)
* [Related pages](#related-pages)

> [!TIP]
> Common quick checks:
> - Quansheng CPS overwrote custom settings
> - the frequency is outside the selected `F Lock` plan
> - `TXLock` is still `ON`
> - `AM` or `USB` is selected instead of `FM`
>
> See [Troubleshooting](./Troubleshooting) for the short version.

## Basic operation & configuration

The radio display is split into an upper VFO and a lower VFO. You can change upper/lower selection by pressing `F` + `2 A/B` (or by long-pressing `2 A/B`).

Each VFO can operate independently in either frequency mode or channel mode. To switch modes, select the desired VFO and press `F` + `3 VFO/MR` (or long-press `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

In `frequency mode`, you manually enter the frequency with the keypad. You can also change different options for that VFO in the menu (the first 13 menu entries). Once the VFO is set up, the settings can be saved to a memory channel by going into the `ChSave` menu and choosing the target memory channel.

In `channel mode`, you can switch between saved memory channels. Memory channels can be added manually as mentioned above or programmed from a computer with the `CHIRP` driver provided with each firmware release. See [Programming with CHIRP](./Programming-with-CHIRP) for the dedicated F4HWN workflow.

For frequency scan, memory scan, `ScnRng`, and DCS / CTCSS scanning, see [Scanning](./Scanning).

## Status bar

At the top of the screen, on the first line, is the status bar. It displays a lot of information. Here are some examples:

| Screenshot&nbsp;of&nbsp;the&nbsp;Quansheng&nbsp;K5&nbsp;running&nbsp;the&nbsp;F4HWN&nbsp;firmware                | Description |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR means RxMode is set to DUAL RX RESPOND, OP means PTT is set to ONEPUSH, the F icon means the `F` key has been pressed, and you see the battery voltage. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS means Power Save is activated, DW means RxMode is set to MAIN TX / DUAL RX, VX means VOX is activated, CL means PTT is set to CLASSIC, the lock icon means the keypad is locked, and you see the battery voltage. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS means Power Save is activated, MO means RxMode is set to MAIN ONLY, OP means PTT is set to ONEPUSH, and you see the battery percentage. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO means RxMode is set to MAIN ONLY, OP means PTT is set to ONEPUSH, the Light icon means the manual Backlight control is activated, and you see the battery percentage. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | The RX timer on the left indicates how long it has been since you received a signal, OP means PTT is set to ONEPUSH, the Light icon means the manual Backlight control is activated and you see the battery percentage. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | The small `PMR` in reverse video and `><` mean you are currently scanning list `PMR`, CL means PTT is set to CLASSIC, the Light icon means the manual Backlight control is activated, and you see the battery percentage. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | The `ALL` icon and `><` mean you are currently scanning all listed channels, OP means PTT is set to ONEPUSH, the Light icon means the manual Backlight control is activated, and you see the battery percentage. |

> [!NOTE]
> About `RxMode`, `MO` means MAIN ONLY, `DW` means MAIN TX / DUAL RX, `DWR` means DUAL RX RESPOND, and `XB` means CROSS BAND.

## Battery display, type, and calibration

The firmware separates three different battery-related things:

* the measured battery voltage
* the estimated battery percentage
* the sleep / power-saving behavior

For battery information on screen:

* `BatTxt` adds `VOLTAGE` or `PERCENT` to the status bar, or hides it with `NONE`
* `SysInf` shows the corrected battery voltage, the estimated battery percentage, and the firmware version

For battery percentage to make sense, two hidden-menu items matter:

* `BatCal` calibrates the displayed battery voltage
* `BatTyp` selects the discharge curve used for battery percentage estimation

Important difference:

* `BatCal` changes the voltage reading
* `BatTyp` changes the `%` calculation, not the measured voltage itself

Current `BatTyp` choices are:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

As with any voltage-based estimate, the battery percentage is only approximate. It depends on the selected battery profile, the battery condition, and the current load.

### Calibrate the battery voltage with a multimeter

1. Make sure the radio is not charging through `USB-C`.
1. Let the radio stay idle for a moment. Do not calibrate while transmitting.
1. Measure the battery voltage with a multimeter on the battery contacts at the back of the radio / battery pack.
1. Open the hidden menu and go to `BatCal`.
1. Adjust `BatCal` until the voltage shown by the radio matches the multimeter as closely as possible.
1. Confirm with `M`.

> [!TIP]
> If the voltage is correct but the percentage still feels wrong, `BatCal` is probably fine and `BatTyp` is the setting to review.

## About the `F Lock` and `TXLock` menus

In the past, there were a few band plans in the `F Lock` menu to meet various requests: PMR 446, FRS/GMRS/MURS, etc. However, adding new `F Lock` options always took up a lot of memory: new options in the `F Lock` menu, storing frequencies (for specialists, these are `uint32_t` each time, so they are very memory-consuming), etc.

Now, it must be recognized that it was complicated, if not impossible, to offer band plans that could cover and meet all expectations. There are too many variations from one country to another. Additionally, nothing is planned for combining multiple frequency plans from the `F Lock` menu. For example, opening both the PMR 446 and LPD bands. In summary, `F Lock` is too limited and not scalable.

Here is the solution:

1. Select the most suitable band plan from the `F Lock` menu. For example, if you have a callsign and live in Europe, select CE HAM. If you do not have a callsign and are just an SWL, select DISABLE ALL, which is safer.
1. If you still want to transmit on a memory channel that is not open by the band plan, go to the `TXLock` menu and choose `OFF`. This creates an exception and allows transmission on that channel.

In a nutshell:

* if the frequency is inside the band plan selected in `F Lock`, you can transmit
* if the frequency is outside the band plan selected in `F Lock`:
  * you can transmit only if `TXLock` is `OFF`
  * you cannot transmit if `TXLock` is `ON`

If a memory channel or VFO is outside the selected band plan and `TXLock` is `ON`, there will be a small padlock to the left of the name.

For the research-oriented `UNLOCK ALL` procedure, see [Advanced features](./Advanced-features#tx-on-all-bands).

## Screen saver and backlight timeout

Builds with screen-saver support add the `SetSav` menu.

`SetSav` works together with `BLTime`: when the radio is idle and the backlight timeout expires, the screen saver can replace the normal screen instead of simply leaving the display unchanged.

Available modes are:

* `OFF`: no screen saver
* `LOGO`: show the custom boot logo as an idle screen
* `LOGO+`: show the custom boot logo with a scrolling effect
* `MATRIX`: show a matrix-style animated idle screen

The logo modes use the same `128x64` logo uploaded with [UV Studio](./UV-Studio#boot-logo).

The screen saver is intentionally suspended during active radio work: RX, TX, PTT, BEAM, and active FM scanning. It can display on the main radio screen and FM broadcast screen when the radio is idle. Pressing a key wakes the normal screen.

If `BLTime` is set to an always-off or always-on style value instead of a timed duration, `SetSav` does not take over the display.

## About the SetOff menu

The `SetOff` menu allows you to configure a timeout before your radio enters sleep mode. This delay can be set between 1 minute and 2 hours. If `SetOff` is `OFF`, sleep mode is disabled.

For example, if you set the delay to 5 minutes and during this time there is:

* no reception
* no transmission
* no button press

then your radio will automatically enter sleep mode. You will be notified 10 seconds before with a blinking screen.

Note that sleep mode will be activated even if you are scanning, as long as no reception occurs.

FoxHunt and Beacon are deliberate exceptions: while either application is active, the radio ignores `SetOff` until you explicitly leave it. The normal backlight timeout still operates. See [FoxHunt](./Fox-Hunt) and [Beacon](./Beacon).

Once in sleep mode:

* the screen is completely off
* the red LED at the base of the antenna blinks
* the BK4819 module goes into deep sleep mode and wakes up periodically every:
  * 2 seconds if `BatSav` is set to `1:1`
  * 4 seconds if `BatSav` is set to `1:2`
  * 6 seconds if `BatSav` is set to `1:3`
  * 8 seconds if `BatSav` is set to `1:4`
  * 10 seconds if `BatSav` is set to `1:5`

To exit sleep mode, you simply need to:

* receive a signal during the BK4819 periodic wake-up phase
* initiate a transmission by pressing the PTT button
* or press any other button

As an example, I tested sleep mode on two K5(8) radios with calibrated and fully charged batteries, using the same settings, frequencies, mode (`DWR`), and `BatSav` set to `1:5`. The only difference was that one radio had sleep mode enabled while the other did not. After 36 hours of operation, the radio without sleep mode had only 20% battery remaining, while the one with sleep mode still had 60% battery.

## 1750 Hz tone burst for repeater access

When `PTT` is pressed, the 1750 Hz tone can be activated by pressing [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Related pages

* [Getting started](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programming with CHIRP](./Programming-with-CHIRP)
* [Scanning](./Scanning)
* [Menu](./Menu)
* [Button functions](./Button-functions)
* [Advanced features](./Advanced-features)
* [Troubleshooting](./Troubleshooting)
