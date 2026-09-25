> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Troubleshooting/).

# Troubleshooting

This page gathers the most common “something is wrong” situations already covered elsewhere in the wiki, so you can find the right check quickly.

## I can receive, but I cannot transmit

Check these points first:

1. Make sure `Mode` is set to `FM`.
1. Check the selected `F Lock` plan.
1. If the frequency is outside that plan, check whether `TXLock` is set to `OFF`.
1. Look for a small padlock next to the channel or VFO name.

Important reminders:

* `AM` and `USB` are for listening only
* `UNLOCK ALL` still has an additional unlock procedure

See also: [Radio operation](./Radio-operation#about-the-f-lock-and-txlock-menus) and [Advanced features](./Advanced-features#tx-on-all-bands).

## My custom settings disappeared or changed unexpectedly

Do not use Quansheng CPS. It overwrites custom settings.

Use the `CHIRP` driver provided with each firmware release, or another compatible programming tool instead.

See also: [Programming with CHIRP](./Programming-with-CHIRP), [Getting started](./Getting-started), and [Radio operation](./Radio-operation#basic-operation--configuration).

## My custom boot logo does not show

Check these points:

1. make sure your firmware build includes logo support
1. upload the logo with [UV Studio](./UV-Studio#boot-logo) while the radio is started normally
1. open menu `POnMsg` and select `LOGO`
1. restart the radio after changing the setting

If the logo looks too dark, too light, or inverted, upload it again from UV Studio and adjust `Threshold` or `Invert colors` before writing it to the radio.

## I changed a memory channel setting, but it did not stay saved

Some channel-specific changes only affect the current temporary copy of that memory channel.

If you change a per-channel setting such as `Step`, `Power`, or another channel parameter and want to keep it permanently, save the channel again with `ChSave` to write the updated settings back to that memory slot.

Otherwise, the change is only temporary and may disappear when you switch channel, switch mode, or restart the radio.

See also: [Radio operation](./Radio-operation#basic-operation--configuration) and [Menu](./Menu#main-menu).

## Memory scan does not find anything

Check these points:

1. Make sure you are in `channel mode`, not `frequency mode`.
1. Make sure the channel is assigned to a scan list with `ScList` or by long-pressing `5 NOAA`.
1. Make sure the currently active scan list is not empty.
1. If needed, switch to another valid scan list while scanning.

The firmware supports `24` scan lists plus `ALL`. If the requested list is empty or invalid, the radio jumps to the next valid non-empty list.

See also: [Scanning](./Scanning#memory-channels-scanning) and [Button functions](./Button-functions#front-keypad).

## I cannot tune the FM broadcast station I want

You may simply be using the wrong FM broadcast range.

While FM broadcast reception is active, long-press `1 BAND` to cycle through the available FM ranges:

* `87.5` to `108 MHz`
* `76` to `108 MHz`
* `76` to `90 MHz`
* `64` to `76 MHz`

The currently selected range is shown at the bottom-left of the FM screen, for example `87.5-108M`.

Direct tuning, manual scan, auto scan, and FM memories only work inside the currently selected range.

See also: [FM broadcast radio receiver](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## FM broadcast radio keeps stopping

This is usually expected behavior.

During broadcast FM reception, the active VFO still has priority. If activity is received on the active VFO, the radio temporarily switches back to VFO reception, then returns to broadcast FM when that reception ends.

See also: [FM broadcast radio receiver](./FM-broadcast-radio-receiver).

## AM reception sounds too harsh, distorted, or too muffled

Try changing the `SetRxA` profile while the radio is in `AM` mode.

In `AM`, `SetRxA` and the `RxA` key action cycle between:

* `SHARP`: narrower and more selective, with better adjacent-channel rejection
* `STOCK`: closest to the stock firmware behavior
* `OPEN`: wider and more open, often nicer on weak signals

If one AM reception sounds too harsh in `SHARP`, try `STOCK` or `OPEN`. If it sounds too soft or too wide in `OPEN`, try `SHARP`.

See also: [Menu](./Menu#main-menu) and [Button functions](./Button-functions#custom-button-functions).

## I only hear some aeronautical VHF channels when I open monitor in `AM 8.33 kHz`

This is often not a sensitivity problem. It is usually a confusion between the `channel designator` (sometimes called `channel number` or `published channel`) and the operating frequency.

Some aeronautical documents, websites, or apps publish the `channel designator`, which looks like a normal frequency but is not always the operating frequency. Dedicated 8.33-capable aeronautical VHF radios translate that published channel designator automatically. This firmware also performs that correction when you type the value directly on the radio, but `CHIRP` stores the value you entered as an operating frequency.

### Case 1: Paris-Orly

For **Paris-Orly (LFPO)**, the **SIA documentation** does indeed publish **ATIS ORLY 126.505 (FR)**, with **131.355 (EN)** for the English-language service.

The **[ICAO correspondence table](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** shows that the published 8.33 channel designator **126.505** corresponds to the operating frequency **126.5000 MHz**. In other words:

* **Service:** ATIS ORLY (FR)
* **Channel designator:** 126.505
* **Operating frequency:** 126.5000 MHz

Important difference:

* if you enter `126.5050` directly on the radio, the firmware corrects it to the matching operating frequency, here `126.5000 MHz`
* if you enter `126.5050` in `CHIRP`, that exact value is stored and used as-is, so the tuning error remains

### Case 2: Brussels

For **Brussels-National (EBBR)**, the published 8.33 channel designator for **Brussels Ground (South)** is **121.880** in the consulted listings.

The **[ICAO correspondence table](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** shows that the published 8.33 channel designator **121.880** corresponds to the operating frequency **121.8750 MHz**. In other words:

* **Service:** Brussels Ground (South)
* **Channel designator:** 121.880
* **Operating frequency:** 121.8750 MHz

Important difference:

* if you enter `121.8800` directly on the radio, the firmware corrects it to the matching operating frequency, here `121.8750 MHz`
* if you enter `121.8800` in `CHIRP`, that exact value is stored and used as-is, so the tuning error remains

In short, if the frequency entered in `CHIRP` is the **channel designator** rather than the operating frequency, forcing monitor open in `AM 8.33 kHz` may appear to restore reception, but the real problem is that the published channel designator was interpreted as the operating frequency.

If a service programmed from a channel designator only becomes audible when you open monitor in `AM 8.33 kHz`, try the corresponding operating frequency first, especially when the published value ends with `...005`, `...010`, `...255`, `...505`, `...755`, or similar 8.33-style channel designators.

See also: 

[Ofcom: understanding 8.33 kHz frequencies and channel numbers](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Stop blaming your radio or firmware. Watch this video on my Youtube channel:
[Aviation Frequencies and MONITOR ✈️: Channel ≠ Frequency (the mistake that changes everything)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Battery percentage or voltage looks wrong

Check these points:

1. make sure the radio is not charging through `USB-C` while you check it
1. use `BatTxt = VOLTAGE` or open `SysInf`
1. make sure `BatTyp` matches the battery pack you are using
1. compare the displayed voltage with a multimeter
1. if needed, readjust `BatCal`

Important reminder:

* `BatCal` affects the voltage reading
* `BatTyp` affects the battery percentage estimate

See also: [Radio operation](./Radio-operation#battery-display-type-and-calibration) and [Menu](./Menu#hidden-menu).

## The external microphone PTT behaves differently

This is a known behavior on some hardware revisions.

Documented differences include:

* TX may wait until RX is clear before transmitting
* DTMF tones or the 1750 Hz tone may be cut off quickly

The internal side `PTT` does not show those issues in the documented cases.

See also: [Button functions](./Button-functions#external-microphone).

## The radio goes to sleep unexpectedly

Check these menus:

* `SetOff`: deep sleep after a period of inactivity
* `BatSav`: active/sleep ratio during normal operation

If `SetOff` is not `OFF`, the radio can enter sleep mode after inactivity even while scanning, as long as no reception occurs.

FoxHunt and Beacon intentionally ignore `SetOff`. If the radio remains awake in either application, leave it with `EXIT` before diagnosing the inactivity timer. Since `v6.0.0`, they are independent applications.

See also: [Radio operation](./Radio-operation#about-the-setoff-menu).

## Navigation seems to move in the wrong direction

If menu navigation or some controls seem to move in the wrong direction, check the hidden-menu item `SetNav` first.

This firmware cannot reliably detect by itself whether it is running on a `UV-K1` or a `UV-K5`. Because of that, the navigation style had to be exposed as a menu setting.

`SetNav` lets you choose between:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

This does not change the feature itself. It only changes the navigation style used by the firmware, and therefore how the controls should be read on your radio.

See also: [Getting started](./Getting-started#model-differences) and [Menu](./Menu#hidden-menu).

## Buttons do not do what I expect

Check these possibilities:

1. keypad lock may be enabled
1. `SetLck` may also lock the programmable side-button / `M Long` actions, the `PTT`, or both
1. RescueOps mode disables most long presses and `F` key combinations
1. some actions differ between `F+` and long press
1. `F` followed by a short side-button press adjusts Step, while `F` followed by holding that side button opens the action picker in current v6 editions

See also: [Button functions](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon), and [Advanced features](./Advanced-features#rescueops).

## Understanding Power and SetPwr: Per-Channel vs Global TX Power

The Power menu determines the transmit power used by the current channel or VFO. Available values are LOW1 to LOW5, MID, HIGH, or USER. This setting is therefore stored locally, on a per-channel basis.

The SetPwr menu does not directly select the power for a specific channel. It only defines which actual power level is assigned to the USER mode, choosing from LOW1 to LOW5, MID, or HIGH. This setting is global for the entire radio.

As a result, all channels whose Power setting is set to USER will automatically use the value currently defined in SetPwr.

This mechanism makes it possible to change the effective power of multiple channels set to USER in one go, without having to edit each channel individually.

## Where to go next

* [Getting started](./Getting-started)
* [Programming with CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Radio operation](./Radio-operation)
* [Scanning](./Scanning)
* [Advanced features](./Advanced-features)
* [Menu](./Menu)
* [Button functions](./Button-functions)
