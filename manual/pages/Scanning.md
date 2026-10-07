> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Scanning/).

# Scanning

This page groups all scan-related features: frequency scan, memory scan, scan lists, `ScnRng`, frequency copy, and DCS / CTCSS scanning.

For day-to-day VFO/channel operation, see [Radio operation](./Radio-operation). For spectrum sweep usage, see [Spectrum analyzer](./Spectrum-analyzer).

## On this page

* [Frequency scanning](#frequency-scanning)
* [Memory channels scanning](#memory-channels-scanning)
* [MIX scan list](#mix-scan-list-v610)
* [Scan engine mode: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Scan indicators and detection](#scan-indicators-and-detection)
* [Frequency copy and DCS / CTCSS scanning](#frequency-copy-and-dcs--ctcss-scanning)
* [Related pages](#related-pages)

> [!TIP]
> If memory scan seems broken, the most common cause is an empty active scan list. See [Troubleshooting](./Troubleshooting) for the quick checks.

## Frequency scanning

To start a frequency scan, switch a VFO to frequency mode. Set a start frequency. Set a frequency step (menu `Step`). Start scanning with a [custom scan button function](./Button-functions#custom-button-functions) or by long-pressing the `* Scan` button.

### Scan frequency range function

* switch to frequency mode
* set the upper and lower VFO frequencies to the scan range boundaries
* long-press `5 NOAA`; the `ScnRng` label should appear
* start the scan by long-pressing `* Scan`
* the radio will scan between the selected boundaries
* long-press `5 NOAA` or `EXIT`, or switch VFOs, to exit `ScnRng` mode

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

The `ScnRng` function is also supported by the spectrum analyzer. If you have already enabled `ScnRng`, just start the [spectrum analyzer](./Spectrum-analyzer).

If you use [AirCopy](./AirCopy) and transfer `Settings`, the VFO area is included. This also copies the source radio's current `ScnRng` boundary frequencies to the target radio.

### Excluding frequencies in ScnRng

While a `ScnRng` scan is stopped on a received frequency, long-press `MENU` to exclude that frequency from the current range scan.

Up to **64** range-scan frequencies can be excluded. The list is circular: after 64 exclusions, adding another one replaces the oldest stored exclusion.

These exclusions are temporary. They are kept only for the active `ScnRng` setup and are not written to memory. They are cleared if the radio is restarted, and they are also cleared when the range identity changes: start frequency, stop frequency, or scan step.

## Memory channels scanning

Memory scan lets the radio scan saved memory channels instead of stepping through frequencies.

To use it, switch the VFO to **Memory mode**, then start scan with a programmed scan key or by long-pressing `* Scan`.

### Scan Lists

The radio provides **24 scan lists**. Each memory channel can be assigned to:

* `OFF`: the channel is excluded from scan lists
* `1` to `24`: the channel belongs to one specific scan list
* `ALL`: the channel is included in all scan lists

A memory channel can belong to only one of these states at a time.

`MIX` is an active scan mode, not another per-channel assignment. It combines several of the numbered lists; see [MIX scan list](#mix-scan-list-v610).

### Assigning a Channel to a Scan List

To change the scan-list assignment of the current memory channel:

* open the `ScList` menu
* or long-press `5 NOAA` for the quick assignment shortcut

The quick shortcut cycles the channel through:

* `OFF`
* `1` to `24`
* `ALL`

The current assignment is shown to the right of the channel name.

### Named Scan Lists

Scan lists can have short names.

When a list has a name, the radio shows that **3-character name** instead of the numeric list number where possible:

* in scan-related status indicators
* in list selection menus
* in the channel list-assignment display

If a list has no name, the radio shows the list number instead.

### Active Scan List

Memory scan always uses one **active scan list**.

The currently active list is shown at the top-left of the screen while scanning:

* `01` to `24` for a numbered list
* `MIX` for the saved combination of selected lists, starting with `v6.1.0`
* `ALL` for all listed channels

If the selected list has a name, that short name is displayed instead of the number.

If the selected list is empty or invalid, the radio automatically switches to the next valid, non-empty list.

### Starting Memory Scan

Once channels have been assigned to lists, start memory scan by:

* using a key assigned to the scan function
* or long-pressing `* Scan`

The radio then scans the memory channels that belong to the currently active scan list.

### Changing the Scan List During Scan

The active scan list can be changed without stopping the scan.

* long-press `* Scan`: switch to the next valid non-empty scan list
* `F + navigation key`: browse through scan lists while scanning (`UP` / `DOWN` on UV-K5, `LEFT` / `RIGHT` on UV-K1)
* keypad direct entry:
  * `01` to `24`: select that scan list directly
  * `25`: select `MIX`, starting with `v6.1.0`
  * `00`: select `ALL`

If the requested list is empty, the radio beeps and jumps to the next valid, non-empty list.

When a memory scan switches lists, the list name temporarily replaces the progress gauge. In `v5.9.0`, scan resumption is held while that name is actually visible, so the hidden gauge and the current scan position cannot drift apart and then jump forward when the gauge returns.

This short hold applies only to memory scan. Frequency scan and `ScnRng` may still arm the same overlay countdown through their controls, but they do not display a scan-list name and therefore continue without an unexplained pause.

### MIX scan list (v6.1.0)

`MIX` scans several numbered lists as one combined set without changing the list assigned to any channel. A channel is included when:

* it belongs to one of the numbered lists enabled in the `MIX` editor, or
* its channel assignment is `ALL`

Channels assigned to `OFF` remain excluded. A channel still has only one assignment (`OFF`, `01` to `24`, or `ALL`); `MIX` stores a separate selection mask describing which numbered lists should be combined.

To configure `MIX`:

1. Open `ScList`.
1. Select `MIX` and press `M`.
1. Use the navigation keys to move through lists `01` to `24`, or enter a two-digit list number to jump directly to it.
1. Press `M` to toggle the highlighted list `ON` or off.
1. Press `EXIT` to save the selection and make `MIX` the active scan mode.

The editor shows the selected-list count as `NN/24`. At least one list must remain enabled; attempting to disable the last selected list produces an error beep.

The normal scan-list sequence becomes `01` through `24`, then `MIX`, then `ALL`. During an active memory scan, enter `25` to select `MIX` directly or `00` to select `ALL`. If the resulting `MIX` contains no valid scannable channel, the radio beeps and advances to the next valid mode.

The saved `MIX` mask is part of the radio settings and is included in an [AirCopy](./AirCopy) `Settings` transfer.

### Changing Scan Direction

While scanning, press a navigation key:

* `UP` / `DOWN` on UV-K5
* `LEFT` / `RIGHT` on UV-K1

This reverses the direction used to step through memory channels in the current scan list.

### Priority Scan

The radio supports two priority channels:

* `PriCh1`
* `PriCh2`

These are configured in the menu and controlled by the `ScPri` setting.

#### How it works

When priority scan is enabled, the radio does not simply scan channels in list order. Instead, it repeatedly inserts the priority channels into the scan cycle.

The scan sequence becomes:

1. `PriCh1`
1. `PriCh2`
1. next regular channel from the active scan list

This cycle then repeats continuously.

This allows the radio to check the two priority channels more often than regular channels, so activity on them is detected faster.

#### Important behavior

When priority scan is enabled:

* priority channels are handled separately from normal list scanning
* if a priority channel also belongs to the active scan list, it is removed from the regular scan path to avoid being scanned twice
* priority channels can still be checked even if they are outside the normal list progression

### Scan Stop and Resume Behavior

When the scanner finds activity on a channel, what happens next depends on the `ScnRev` setting.

Depending on this setting, the radio may:

* resume scanning automatically after a delay
* remain stopped on the active channel until scan is restarted manually

Pause and resume behavior are therefore controlled by the scan resume mode, not by the scan list itself.

### Excluding a Channel During Scan

While memory scan is stopped on a received memory channel, long-press `MENU` to exclude that channel from future memory scans.

#### Important note

This exclusion is temporary.

The channel remains excluded until the next restart of the transceiver.

### Scan resume

If you switch off the transceiver while it is scanning, the scan will automatically resume the next time you restart it.

### Common frequency / channel scanning features

The following controls apply to both frequency scan and memory scan:

* press a navigation key while scanning to reverse the scan direction (`UP` / `DOWN` on UV-K5, `LEFT` / `RIGHT` on UV-K1)
* press `EXIT` to stop scan and return to the frequency or channel that was selected before scan began
* press `PTT` or `MENU` to stop scan and keep the last frequency or channel where activity was found

## Scan engine mode: NORMAL vs FAST

Builds with fast scan support add the `SetScn` menu. It selects the scan engine used by memory scan and `ScnRng`.

### NORMAL

`NORMAL` uses the standard scan path. Each frequency or memory channel is fully applied to the radio, with normal VFO configuration, squelch/output-power setup, receiver register setup, and the usual scan pause timing.

This mode is the most conservative choice. It is useful if you prefer the older scan behavior or want to compare results against the fast engine.

### FAST

`FAST` is the default mode in current builds. It adds a lightweight RSSI pre-check before the full receive setup:

* for memory scan, the firmware probes the next channel frequency and skips it quickly if it is clearly quiet
* for `ScnRng`, the firmware probes a small batch of range steps before doing a full tune
* quiet batches are skipped faster, so scanning spends less time on empty spectrum
* possible signals are promoted back to the normal full receive path, so squelch and normal scan-resume behavior still decide what happens next
* in `ScnRng`, fine steps can be refined around a candidate so the scan lands closer to the strongest nearby signal
* if the scan loop stalls after the normal `ScnRev` pause has expired, a short watchdog resumes scanning

The fast pre-check learns a local RSSI noise floor and compares each probe against that floor and the configured squelch threshold. If squelch is fully open, or if the fast path cannot safely pre-check a channel, the firmware falls back to the normal full tune for that step.

> [!NOTE]
> In `ScnRng`, `FAST` mode can scan around **150+ frequencies per second** in favorable conditions, especially when most of the range is quiet and the scan can skip silent batches without doing a full receive setup for every step.

Plain frequency scan outside `ScnRng` still advances one frequency step at a time; `SetScn = FAST` mainly changes memory scan and scan-range behavior.

## Scan indicators and detection

Current fast-scan builds can show a small RSSI sparkline while scanning. It is a compact history of recent RSSI samples; quiet samples stay low, while stronger candidates stand out as taller marks.

During memory scan, the scan-list indicator keeps showing the active list:

* `01` to `24`
* `MIX`, starting with `v6.1.0`
* `ALL`
* the 3-character scan-list name, when the list has one

When priority scan is enabled, a `+` is appended to the scan-list indicator.

During `ScnRng`, builds with subaudible scan-range support can detect CTCSS / DCS while the radio is stopped on a received signal. If a code is found, the scan UI can show the detected tone or DCS code together with the received frequency.

The scan display also refines the placement of the VFO lock indicator while scanning, so TX-lock state remains visible without overlapping the active scan information.

## Frequency copy and DCS / CTCSS scanning

This function lets you detect and copy frequency and coding settings. The frequency search works only for strong signals, so the transmitting radio has to be close. To start frequency copy (`FC`), use the `4 FC` function button. The scanner screen will open. Push and hold the PTT button on the other radio. Wait a couple of seconds until the frequency and code (if used) appear on the screen. The settings can be saved with the `MENU` button. They will be saved either to a channel or to the main VFO, depending on which mode you started the scan in.

In current builds, the scanner screen makes the state more explicit:

* `Search Freq`: frequency search is running
* `Search Tone`: subaudible tone/code search is running
* `Scan Complete`: a result was found
* `Scan Failed`: no usable result was found
* `Freq:` shows the detected frequency
* `Tone:` / `CTCSS:` / `DCS:` shows the detected subaudible setting when one is found

You can also search only for the DCS / CTCSS code for a frequency set on the main VFO. Choose the desired frequency or channel and press `F` + `* SCAN`. The same screen will appear, but the frequency search will be omitted; the frequency of the main VFO will be used instead. Wait for a signal to appear or press the PTT on the other radio. It takes 1 to 2 seconds for the code to be found. The save procedure is the same as above.

There is another way to scan for a DCS / CTCSS code. Choose the desired frequency or channel. Go to the `RxDCS` or `RxCTCS` menu. Enter the menu option and press the `* SCAN` button. A `SCAN` label will appear. Wait for a radio signal or press the PTT button on the other radio. When the code is found, the `SCAN` label will disappear. To save it, confirm the option with the `MENU` button. It does not matter which of the two menu items you start from: both DCS and CTCSS can be found, and the menu entry will be changed to the correct one.

## Related pages

* [Getting started](./Getting-started)
* [Radio operation](./Radio-operation)
* [Button functions](./Button-functions)
* [Spectrum analyzer](./Spectrum-analyzer)
* [Advanced features](./Advanced-features)
* [AirCopy](./AirCopy)
* [Troubleshooting](./Troubleshooting)
