> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Menu/).

# Menu operation

The menu can be accessed with the `M` button _(short press)_.

> [!NOTE]
> Navigation uses `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1. The active layout follows the hidden-menu option `SetNav`.

Introduced in Fusion `v5.9.0`, the category browser is used throughout the official `v6.0.0` and `v6.1.0` editions. Select a category with `UP` / `DOWN`, then press `M` to open its item list. The selected item is displayed on the left-hand side of the screen and its current value is shown on the right.

To find a menu item, browse its category or select `All` to use the original flat menu. You can also enter the **global menu item number** from the category screen; for instance, enter `52` to access `SysInf`. Direct number entry switches to `All`. Fusion `v5.9.0` uses `01` to `77`; Multiboot-capable `v6.0.0` adds `SetCfg` and extends the complete list to `78`.

Once the desired menu item is highlighted, pressing the `M` button enters that menu item.

Once the menu item is selected, pressing the `UP` and `DOWN` arrow buttons adjusts the setting for that item. To confirm the selection, press the `M` button. To cancel the selection, press `EXIT`.

From an item list, short-press `EXIT` to return to the category browser. Short-press `EXIT` again to leave the menu and return to the radio screen.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Categorized menu browser

The Fusion category screen shows the previous, current, and next category on the left. The right side shows how many items the highlighted category contains.

| Category | Fusion items | Contents |
| --- | ---: | --- |
| `Channels` | 21 in v6 | frequency step, power, tones, offset, bandwidth, channel and memory settings, plus `SetCfg` |
| `Scan` | 6 | scan list, priority channels, resume mode and scan engine |
| `Keys` | 10 | programmable shortcuts, keypad lock, PTT mode and call channel |
| `Power` | 4 | battery saver/display, inactivity timeout and screen saver |
| `Display` | 11 | channel display, startup screen, backlight and UI settings |
| `Timers` | 4 | TX timeout, EOT and RX/TX timer settings |
| `Audio` | 5 | microphone, keypad beep, volume and RX audio profiles |
| `Radio` | 6 | squelch, STE, roger beep, VOX and RX mode |
| `DTMF` | 5 | up/down codes, side tone, preload and live decoder |
| `Service` | 6 | hidden startup menus; only visible after the hidden-menu boot gesture |
| `All` | 72 normally in v6, 78 with Service | original flat-menu order and global numbering |

The item counter inside a filtered category is local to that category. Use `All`, or enter a number from the category screen, when you want the global numbers listed below.

The firmware remembers the last selected category and the last highlighted item in each category for the current session. These navigation positions are not saved across a restart.

## Quick tips

* in `All`, the first 13 items are the main live VFO/channel settings
* `ScList`, `ScPri`, `PriCh1`, `PriCh2`, and `ScnRev` are the key scan-related items
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, and `M Long` control customizable shortcuts
* the hidden menu is only available at startup with `PTT` + `SIDE BUTTON 1️⃣`

## Main menu

The number in front of each menu item description is the **_menu item number_** that can be used for quick selection.
1. `Step` - step of the frequency (in kHz), `UP` and `DOWN` buttons change frequency by this value, also you can only set a frequency that is multiple of half of this value.
1. `Power` - radio output power (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH / USER). Note that USER power can be tuned via the `SetPower` menu.
1. `RxDCS` - receiver Digital-Coded Squelch. If you enable this, squelch will only unlock if this code is being received. You can start a DCS/CTCSS scan while you are in this menu option by pressing the `* SCAN` button.
1. `RxCTCS` - receiver Continuous Tone-Coded Squelch System. Squelch will only unlock if this code is being received. You can start a DCS/CTCSS scan while you are in this menu option by pressing the `* SCAN` button.
1. `TxDCS` - transmitter Digital-Coded Squelch, radio will send given code while transmitting
1. `TxCTCS` - transmitter Continuous Tone-Coded Squelch System, radio will send given code while transmitting

   In the `RxDCS`, `TxDCS`, `RxCTCS`, and `TxCTCS` submenus, the top-right badge shows the selected entry and its homologated index:

   * for CTCSS: `NN/HH`, where `NN` is the position in the full 50-tone list and `HH` is the homologated tone number. `--` means the selected tone is one of the extra, non-homologated tones.
   * for DCS: `NNN/HH`, where `NNN` is the position in the full DCS list and `HH` is the homologated DCS number. `--` means the selected DCS entry is not in the homologated PMR446 list.
   * `OFF` is displayed as `00/00` for CTCSS and `000/00` for DCS.
   * DCS values ending in `N` are normal codes; values ending in `I` are inverted codes. The inverted DCS entries are shown in the full list, but they do not receive a homologated index and therefore show `--`.

1. `TxODir` - transmitter frequency offset direction
1. `TxOffs` - transmitter frequency offset value
1. `W/N` - bandwidth used by transceiver
   * WIDE - `25 kHz`
   * NARROW - `12.5 kHz`
1. `BusyCL` - busy channel lockout, blocks radio from transmitting when signal is being received
1. `Compnd` - compander (compressor / expander), allows signals with a large dynamic range to be transmitted over facilities that have a smaller dynamic range capability, improves audio quality, both radios should use this option
1. `Mode` - demodulation mode, default is FM, AM / USB can be used for listening only
1. `TXLock` - enable or disable the channel's transmit mode (if it is not covered by the `F Lock` plan)
1. `ChList` - select memory channel scan list
1. `ChSave` - save current setting to a memory channel
1. `ChDele` - delete memory channel
1. `ChName` - modify memory channel name
   * Use `UP` and `DOWN` buttons to select a channel to edit
   * Press the `M` button again to enter edit name mode
   * Use the number keys in multi-tap mode to edit the current character, like on older mobile phones
     * press the same key again to cycle through the letters and number assigned to it (`2` = `a`, `b`, `c`, `2`, etc.)
     * long-press a number key to enter the corresponding number directly
     * short-press `F` to switch between lowercase and uppercase (`abc` / `ABC`)
     * long-press `F` to enter `#`
     * short-press `* SCAN` to enter `-`, or long-press it to enter `*`
     * short-press `0` to enter a space, then press it again to enter `0`
   * You can still use the `UP` and `DOWN` buttons to cycle through the available characters manually
   * Press the `M` button to move to the next character position
   * Repeat above two steps till you reach the end
   * When "Sure?" pops up, press `M` button to save, or Exit to cancel
   * Short-press `EXIT` to move back one character; from the first character position, it exits name editing
   * Long-press `EXIT` to cancel the edit and return to the main menu.
1. `ScList` - selects the scan list used for channel scanning: `01` to `24`, `ALL`, and, starting with `v6.1.0`, `MIX`.
   * `MIX` combines a saved selection of numbered lists without changing the list assigned to each channel.
   * Select `MIX` and press `M` to open its editor.
   * Use the navigation keys or enter `01` to `24` to select a list, then press `M` to toggle it.
   * Press `EXIT` to save. At least one list must remain selected.
   * See [MIX scan list](./Scanning#mix-scan-list-v610) for complete behavior.
1. `ScPri` - enables/disables priority-channel support during scanning.
1. `PriCh1` - sets priority channel 1️⃣
1. `PriCh2` - sets priority channel 2️⃣
1. `ScnRev` - scan resume mode
   * CARRIER - after signal disappears, pause for [250 milliseconds to 20 seconds] before resuming scanning
   * STOP - after receiving a signal, stop the scan
   * TIMEOUT - resuming scanning after [5 seconds to 2 minutes] pause
1. `F1Shrt` - `SIDE BUTTON 1️⃣` short press function
1. `F1Long` - `SIDE BUTTON 1️⃣` long press function
1. `F2Shrt` - `SIDE BUTTON 2️⃣` short press function
1. `F2Long` - `SIDE BUTTON 2️⃣` long press function
1. `M Long` - `M` button long press function
1. `KeyLck` - auto keypad lock option (OFF or 15 seconds to 10 minutes before automatic keypad locking)
1. `TxTOut` - max transmission time limit
1. `BatSav` - battery save option, a rate between active time and sleep time (OFF, 1:1 to 1:5)
1. `BatTxt` - additional battery value on the status bar (`NONE`, `VOLTAGE`, or `PERCENT`)
1. `Mic` - microphone sensitivity
1. `MicBar` - microphone bar that appears while transmitting 
1. `ChDisp` - channel display style
1. `POnMsg` - startup display mode
   * `ALL`: show the configured welcome message, voltage, and firmware/version information
   * `SOUND`: keep the normal startup sound behavior with no welcome screen
   * `MESSAGE`: show the configured welcome message only
   * `VOLTAGE`: show the battery voltage and estimated percentage
   * `LOGO`: show the custom 128x64 boot logo uploaded with [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: skip the startup display
1. `BLTime` - backlight duration
1. `BLMin` - minimal backlight brightness, when the screen backlight turns OFF it will go dim to this value
1. `BLMax` - maximal backlight brightness, when the screen backlight turns ON it will turn bright to this value
1. `BLTxRx` - backlight activation on TX or RX
1. `Beep` - keypad press beep sound
1. `Roger` - roger beep at the end of transmission
1. `STE` - squelch tail eliminator, eliminates noise at the end of a transmission
1. `RP STE` - repeater squelch tail eliminator
1. `1 Call` - one-key call channel; lets you quickly switch to that channel with the `9 Call` button
1. `UPCode` - DTMF code that is sent at the beginning of transmission
1. `DWCode` - DTMF code that is sent at the end of a transmission
1. `PTT ID` - sets if `UPCode` and/or `DWCode` should be transmitted
1. `D ST` - DTMF side-tone switch; lets you hear transmitted tones through the radio speaker
1. `D Prel` - DTMF pre-load time
1. `D Live` - displays DTMF codes received by radio in the middle of the screen
1. `VOX` - voice-activated TX sensitivity level
1. `SysInf` - system information. In current F4HWN builds this item is paginated: enter it with `M`, then use `UP` / `DOWN` to move between pages.
   * identity: firmware author, version, and edition
   * `BUILD`: build date, build time, and commit identifier
   * `BATTERY`: measured battery voltage, estimated battery percentage, and selected battery type/profile
   * `MEMORY`: FLASH and SRAM usage, when the memory page is enabled in the build
   * `CODE` / `WIKI`: QR codes for project links, when QR-code pages are enabled in the build
1. `RxMode` - sets how the upper and lower frequency is used
   * MAIN ONLY - always transmits and listens on the main frequency (`MO`)
   * DUAL RX RESPOND - listens to both frequencies, if signal is received on the secondary frequency it locks to it for a couple of seconds so you can respond to the call (`DWR`)
   * CROSS BAND - always transmits on the primary and listens on the secondary frequency (`XB`)
   * MAIN TX DUAL RX - always transmits on the primary, listens to both (`DW`)
1. `Sql` - squelch sensitivity level
1. `SetPwr` - sets USER Power
   * LOW 1 (< ~20 mW)
   * LOW 2 (~125 mW)
   * LOW 3 (~250 mW)
   * LOW 4 (~500 mW, upper limit under PMR band...)
   * LOW 5 (~1 W)
   * MID (~2 W)
   * HIGH (~5 W)
1. `SetPTT` - sets PTT usage
   * CLASSIC
   * ONEPUSH
1. `SetTOT` - sets TOT alert
   * OFF
   * SOUND
   * VISUAL
   * ALL (_VISUAL + SOUND_)
1. `SetEOT` - sets EOT alert (useful for pauses between 2 transmissions)
   * OFF
   * SOUND
   * VISUAL
   * ALL (_VISUAL + SOUND_)
1. `SetCtr` - sets LCD contrast
1. `SetInv` - sets LCD inverted (best for night vision)
1. `SetLck` - selects what is disabled while the keypad lock is active
   * `KEYS`: lock the front keypad; programmable shortcut actions and `PTT` remain available
   * `KEYS + ACTIONS`: also lock the programmable actions assigned to the two side buttons and `M Long`; `PTT` remains available
   * `KEYS + PTT`: also lock `PTT` to prevent accidental transmission; programmable shortcut actions remain available
   * `KEYS + ACTIONS + PTT`: lock the front keypad, programmable shortcut actions, and `PTT`

   In every mode, long-press `F #` to unlock the radio. See [Button functions](./Button-functions#keypad-lock-and-setlck) for details.
1. `SetMet` - sets S-Meter design
   * CLASSIC
   * TINY (as on the Yaesu FT4 or FT-65, for example)
1. `SetGUI` - sets GUI design
   * CLASSIC (larger font, less information shown)
   * TINY (smaller font, more information shown)
1. `SetRxA` – sets the RX audio profile for the current modulation

   `FM` profiles:

   - `FLAT`: Lowest output gain (BK4829-safe). Most neutral, best for quiet environments.
   - `CLEAN`: Default balanced profile. Comfortable audio with moderate gain.
   - `MID`: Higher gain than CLEAN without the aggressiveness of BOOST.
   - `BOOST`: Voice-forward profile for weak signals / noisy environments. Higher gain, more "present" audio.
   - `MAX`: Maximum output gain (may distort on strong signals or small speakers). Best suited for an external speaker.

   `AM` profiles:

   - `SHARP`: Narrow IF filter with low gain. More selective, with better adjacent-channel rejection. It can sound harsher or a bit distorted on strong signals, but it stays clear.
   - `STOCK`: Intended to stay as close as possible to the stock firmware behavior.
   - `OPEN`: Wider IF filter with higher gain. More open and pleasant on weak signals, but some receptions can sound a bit muffled, especially ATC.
1. `SetTmr` - sets whether RX and TX timers are displayed
1. `SetOff` - sets the delay before the transceiver goes into deep sleep (OFF or 1 minute to 2 hours)
1. `SetNFM` - sets Narrow FM to Narrow or Narrower
1. `SetVol` - sets the audio volume gain to fine-tune speaker output
1. `SetKey` - sets key to activate RescueOps mode upon startup of the transceiver
1. `SetScn` - sets the [scan engine mode](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL`: uses the standard scan path.
   * `FAST`: uses the newer fast scan path. The firmware pre-checks several frequencies/channels with RSSI before doing the full receive setup, skips quiet batches faster, refines close candidates on fine steps, and uses a small watchdog to resume if the scan loop stalls.
1. `SetSav` - sets the [screen saver](./Radio-operation#screen-saver-and-backlight-timeout) used after the backlight timeout, when enabled in the build.
   * `OFF`: no screen saver
   * `LOGO`: show the custom boot logo as an idle screen
   * `LOGO+`: show the custom boot logo with a scrolling effect
   * `MATRIX`: show a matrix-style animated idle screen

   `SetSav` is active only when `BLTime` uses a timed backlight duration. It is suspended during RX, TX, PTT, BEAM, and active FM scanning.
1. `SetCfg` - selects the configuration bank used by the running firmware in Multiboot-capable `v6.0.0` builds.
   * `CFG M`: Main configuration bank
   * `CFG 1` to `CFG 4`: configuration banks associated with firmware slots 1 to 4

   Press `M` twice to confirm a different bank. The radio restarts so the bank is mapped before any channels or settings are loaded. The firmware slot does not change. Confirming the bank already in use is a no-op. See [Multiboot and Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Hidden menu

The hidden menu is activated by holding `PTT` + `SIDE BUTTON 1️⃣` while turning on the radio, then releasing all keys.

73. `F Lock` - sets the TX frequency band plan.
    * DEFAULT+ (137-174, 400-470) - allows TX on default bands, plus options `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * DISABLE ALL - disables TX on all frequencies
    * UNLOCK ALL - enables TX on all bands. It has an additional lock; see [how to turn that on](./Advanced-features#tx-on-all-bands).
74. `350 En` - enables RX on `350 MHz`
75. `BatCal` - battery voltage calibration. Compare the displayed voltage with a multimeter and adjust it until they match as closely as possible
76. `BatTyp` - battery type / discharge curve used for the battery percentage calculation. It affects `%`, not the measured voltage itself
77. `SetNav` - configures the navigation type (UP/DOWN for UV-K5, LEFT/RIGHT for UV-K1)
78. `Reset` - resets radio configuration settings
   * VFO - removes only channel settings
   * ALL - resets all (channel and radio settings)

On the categorized menu screen, these six entries appear in the `Service` category. They are also appended to `All`, where a Multiboot-capable `v6.0.0` build runs through `78/78`. On `v5.9.0`, which has no `SetCfg`, the hidden entries retain numbers `72` to `77`.

## Related pages

* [Getting started](./Getting-started)
* [UV Studio](./UV-Studio)
* [Radio operation](./Radio-operation)
* [Scanning](./Scanning)
* [Button functions](./Button-functions)
* [Multiboot and Multiconfig](./Multiboot-and-Multiconfig)
* [Advanced features](./Advanced-features)
* [Troubleshooting](./Troubleshooting)
