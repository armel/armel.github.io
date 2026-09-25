> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Button-functions/).

# Button functions

Buttons can trigger functions in two ways:

1. press the `F #` button first, then the target button (written below as `F+`)
2. long-press the target button directly

In many cases, the long press duplicates the `F+` action, but some buttons have a different long-press behavior.

## Quick reminders

* `F+` means: press `F #`, then press the target button
* navigation labels may be `UP` / `DOWN` or `LEFT` / `RIGHT`, depending on the model and `SetNav`
* the programmable shortcuts are listed in [Custom button functions](#custom-button-functions)
* introduced in Fusion `v5.9.0` and available in the current v6 editions, pressing `F` and then **holding** a side button opens the [side-key action picker](#side-key-action-picker)

## Front keypad

### `M`
* short press - enter menu
* short press while channel/frequency scanning - last found channel is preserved on the screen
* long press while channel scanning - temporarily exclude a memory channel (not working with `* SCAN ALL`)
* long press - user programmable in the menu: `M Long`
### `EXIT`
* short press - exits current menu/function, deletes one digit in an input box
* long press - deletes all input, exits DTMF input box, exits monitor mode, exits `ScnRng`
### `UP` and `DOWN`
* move up and down in menus, frequency, settings, and other lists
* `F+` - increases or decreases the Squelch value.
### `1 BAND`
* `F+`
  * in **frequency mode** - switches frequency bands `1` to `7`; there is also band `7+` for frequencies above `1 GHz`
  * in **channel mode** - channel settings are copied to frequency mode
* long press
  * in **normal radio mode** - same
  * in **FM broadcast mode** - cycles the FM broadcast frequency ranges; see [FM broadcast radio receiver](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - switches main VFO upper/lower (marked by `►`)
* long press - same
### `3 VFO/MR`
* `F+` - switches between frequency mode and channel mode
* long press - same
### `4 FC`
* `F+` - turns on frequency and CTCSS copy mode. Start transmitting with the other radio and the frequency and CTCSS code will be detected. You can save those settings with the `M` button
* long press - same
### `5 NOAA`
* `F+` - turns on spectrum analyzer
* long press
   * in **channel mode** - cycles the selected memory channel through its scan-list assignment: `OFF`, `1` to `24`, then `ALL`
   * in **frequency mode** - activates the [scan range function](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - toggles power levels for current channel
* long press - same
### `7 VOX`
* `F+`
  * in the `Labs` edition - opens the [overlay-app launcher](./Overlay-apps)
  * in builds with the resident game and no overlay-app loader - starts Breakout
* long press - turns VOX mode on/off when VOX is enabled
### `8 R`
* `F+` - enables manual backlight management and switches the backlight on or off
* long press - turns on reverse mode for channels that have a frequency offset set. It replaces the TX frequency with the RX frequency
### `9 Call`
* `F+` - disables manual backlight management
* long press - switches current channel to the `1-Call` channel set in the radio.
### `0 FM`
* `F+` - turns on FM radio
* long press - same
### `* SCAN`
* short press - enters DTMF input mode
* `F+` - turns on the DCS / CTCSS scanner for the current frequency
* long press
   * in **channel mode** - turns on channel scanner
   * in **frequency mode** - turns on frequency scanner (can use the [scan range feature](./Scanning#scan-frequency-range-function))
* while memory scan is in progress, `F+` or long-press `* SCAN` switches to the next valid non-empty scan list
### `F # 🗝`
* short press - toggles the `F+` function modifier
* long press - turns the keypad lock on or off; the `SetLck` menu selects whether the lock also covers programmable shortcut actions and/or `PTT`

### Keypad lock and SetLck

The keypad lock always disables the front keypad, except that long-pressing `F #` remains available to unlock the radio. The `SetLck` menu extends the lock to other controls:

* `KEYS`: the two side-button shortcuts, `M Long`, and `PTT` remain available
* `KEYS + ACTIONS`: the programmable shortcuts assigned to `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, and `M Long` are also disabled; `PTT` remains available
* `KEYS + PTT`: `PTT` is also disabled to prevent accidental transmission; programmable shortcuts remain available
* `KEYS + ACTIONS + PTT`: the front keypad, programmable shortcuts, and `PTT` are all disabled

## Side buttons

### `PTT`
* Push-To-Talk button. There are 2 modes: CLASSIC and ONEPUSH (see menu `SetPTT`)
  * CLASSIC - PTT works as usual. Press the PTT to start transmitting and release it to stop.
  * ONEPUSH - PTT works like a switch. Press the PTT to start transmitting, and release it whenever you like. The transmission is still active. Press the PTT again when you want, then release it to stop transmitting. It works like on OpenGD77 (if you know it).

* when this button is used to stop channel/frequency scanning, the last found channel is preserved on the screen
* held together with `Side button 2️⃣`, transmits the `1750 Hz` tone
* held together with any of the front keypad buttons transmits DTMF codes

### `Side button 1️⃣`
* short press - user programmable in the menu: `F1Shrt`
* long press - user programmable in the menu: `F1Long`
* `F` then short press - increases the Step value in VFO mode
* `F` then hold - opens the side-key action picker

### `Side button 2️⃣`
* short press - user programmable in the menu: `F2Shrt`
* long press - user programmable in the menu: `F2Long`
* this button can also be used to send the `1750 Hz` tone by holding it together with the `PTT` button
* `F` then short press - decreases the Step value in VFO mode
* `F` then hold - opens the side-key action picker

### Side-key action picker

The action picker runs an available shortcut without changing the functions saved in `F1Shrt`, `F1Long`, `F2Shrt`, or `F2Long`.

From the normal radio screen:

1. Short-press `F` so the `F` indicator appears.
1. Hold side button 1️⃣ or side button 2️⃣ until the picker opens.
1. Use `UP` / `DOWN` to highlight an action.
1. Press `M` to run it immediately.

The screen shows the previous, selected, and next action. `EXIT` or `F` cancels without running anything. Pressing `PTT` closes the picker and continues with normal PTT handling, so it does not block an urgent transmission.

The picker also closes automatically after approximately five seconds, when reception begins, if the keypad becomes locked, or when another screen takes over. Each side button remembers its last highlighted picker action for the current session; the selections reset when the radio restarts.

The picker lists the same compiled actions documented below, except `NONE`. Normal action restrictions still apply: an action that is unavailable in the current radio state is refused with the usual error beep.

## External microphone
### `PTT`
* Push-To-Talk button.
* The `PTT on the external microphone` works differently than the internal side `PTT` button.

> [!NOTE]
> On some hardware revisions, the external microphone `PTT` behaves differently:
> - when pressing the PTT, TX waits until no RX signal is received (_observed with radio PCB revision V1.4 and OK with V1.6_). This works well with the internal `PTT`
> - a DTMF tone (`key press`) or 1750 Hz tone (`function button`) can be cut off within a second. This works well with the internal `PTT`

## Custom button functions
Five shortcut actions can be customized in the menu:
* `F1Shrt` - side button 1️⃣, short press
* `F1Long` - side button 1️⃣, long press
* `F2Shrt` - side button 2️⃣, short press
* `F2Long` - side button 2️⃣, long press
* `M Long` - menu button, long press

Available functions:
* NONE - no action
* FLASH LIGHT - switch to the next flashlight function: ON / OFF
* POWER - switch radio output power between [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITOR - switch monitor mode ON / OFF
* SCAN - start channels/frequency scanning
* VOX - turn voice activation function ON / OFF
* FM RADIO - turn FM radio ON / OFF
* `1750 Hz` - send the `1750 Hz` tone burst
* LOCK KEYPAD - lock / unlock the keypad
* VFO A VFO B - change main VFO to upper/lower
* VFO MEM - change current VFO mode, frequency mode or memory channel mode
* MODE - switch to the next demodulation mode between [FM / AM / USB]
* RX MODE - switch display mode between [DW / DWR / XB / MO]
* MAIN ONLY - switch display mode between [DW / DWR / XB] and MO
* PTT - switch PTT mode CLASSIC / ONEPUSH
* WIDE NARROW - switch between WIDE and NARROW
* MUTE - mutes speaker volume
* RxA - switch the RX audio profile for the current modulation: in `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; in `AM`, `SHARP` / `STOCK` / `OPEN`
* POWER HIGH - temporarily switch to the maximum power of `5 W`
* REMOVE OFFSET - temporarily remove the offset of a memory channel, if present
* BEAM - opens BEAM transfer mode, when enabled in the build. BEAM can send the current VFO/memory-channel settings to another radio or receive settings from another radio.
* FOX HUNT - opens the receive-only direction-finding application, when resident or available as an installed Labs app.
* BEACON - opens the independent Morse beacon application, when resident or available as an installed Labs app.
* RF LOG - opens the RX/TX history log, when enabled in the build. The log shows recent receive, monitor, and transmit sessions stored in external flash.

### BEAM action

Assign `BEAM` to one of the customizable shortcuts (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`), then trigger that shortcut to open BEAM mode.

In BEAM mode:

* `UP` / `DOWN` toggles between `BEAM TX` and `BEAM RX`
* `M` starts the selected operation
* `EXIT` leaves BEAM mode

`BEAM TX` sends the current VFO or memory-channel configuration. The packet includes the RX frequency, TX offset, RX/TX DCS or CTCSS settings, modulation, bandwidth, output power, scan-list assignment, compander, DTMF-related settings when enabled, and the channel name.

`BEAM RX` waits for a BEAM packet from another radio. When a valid packet is received, the radio saves it to the first free memory channel. If memory is full, the status shows `MEM FULL`. Pressing `EXIT` after a successful receive switches to the newly saved channel; otherwise it restores the previous VFO/channel state.

### FOX HUNT action

Assign `FOX HUNT` to one of the customizable shortcuts (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`), then trigger that shortcut to open FoxHunt on the selected VFO.

In Fox Hunt mode:

* `1` toggles between the S-meter staircase and recent signal-history graph
* `2` cycles between silent, Geiger-style beep, and received-station audio
* `3` cycles through `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP`, and `BYP+`
* `UP` / `DOWN` changes the receiver attenuation directly
* `M` resets the peak, minimum, and signal-trend references
* holding `F` for approximately 0.5 seconds locks or unlocks the FoxHunt controls; attenuation arrows remain available while locked
* `EXIT` leaves FoxHunt

See [FoxHunt](./Fox-Hunt) for the screen readings, gain settings, controls, and direction-finding guidance.

### BEACON action

Assign `BEACON` to one of the customizable shortcuts, then trigger that shortcut to start the independent Beacon application. Beacon starts its first transmission immediately.

Keys `1`, `2`, `3`, and `4` adjust the TX window, silent interval, fox identifier, and keying mode (`TONE` / `CARR`). Holding `F` for approximately 0.5 seconds locks or unlocks all Beacon controls, including during an active transmission. `M` stops the current transmission and starts a fresh idle interval; `EXIT` stops safely and leaves Beacon.

See [Beacon](./Beacon) for identification, timing, transmit protections, saved settings, and safety information.

### RF LOG action

Assign `RF LOG` to one of the customizable shortcuts (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, or `M Long`), then trigger that shortcut to open the RX/TX history log.

The log records receive, monitor, and transmit sessions in external flash. Each traffic row shows:

* the channel name, when the entry comes from a memory channel; otherwise the frequency
* whether the entry was `RX` or `TX`
* a newest-first index badge
* a detail badge that can show duration, signal/power, or battery voltage

On the `RF LOG` screen:

* `UP` / `DOWN` scrolls through the log, newest entries first
* `F` + `UP` jumps to the newest entry
* `F` + `DOWN` jumps to the oldest visible entry
* short-press `M` cycles the filter: `ALL`, `RX`, `TX`
* short-press `* SCAN` cycles the detail badge: duration, RX S-meter / TX power level, lowest battery voltage during the session
* long-press `M` asks for log clearing confirmation; long-press `M` again on `CLEAR LOG / SURE?` clears the log
* `EXIT` leaves the log screen, or cancels the clear confirmation

The radio keeps up to 512 traffic entries visible in the log view. Session separator lines mark radio restarts when the `ALL` filter is active.

## Related pages

* [Getting started](./Getting-started)
* [Menu](./Menu)
* [Radio operation](./Radio-operation)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Advanced features](./Advanced-features)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [Troubleshooting](./Troubleshooting)
