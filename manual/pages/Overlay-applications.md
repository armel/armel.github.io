> 🌐 **Translate**  
> Automatic translation is available via Google Translate: [Open translated version](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Overlay-applications/).

# Overlay applications

This page describes the eleven applications currently available for the `Labs` edition: what they do and how to control them. For installation, compatibility, and developer information, see [Overlay apps](./Overlay-apps).

> [!NOTE]
> Navigation keys depend on the radio and the `SetNav` setting: `UP` / `DOWN` on UV-K5, or `LEFT` / `RIGHT` on UV-K1. In the tables below, `UP/LEFT` and `DOWN/RIGHT` refer to these equivalent keys.

## Starting an application

1. Install a compatible `.app` file with [UV Studio](./UV-Studio#apps-labs).
1. From the normal radio screen, press `F`, then `7 VOX`.
1. Select an installed application with `UP/LEFT` or `DOWN/RIGHT`.
1. Press `M` to launch it.

In most applications, `EXIT` closes the application and returns to the launcher or normal radio screen. Some radio applications can also be assigned directly to a programmable key through the normal action picker.

## Application summary

| Application | Purpose |
| --- | --- |
| `Broadcast FM` | Full-featured broadcast FM receiver with VFO, memories, and station scanning |
| `FoxHunt` | Signal-strength and direction-finding aid with history, attenuation, and audio guidance |
| `Beacon` | Repeating ARDF-style Morse beacon using the selected transmit VFO |
| `Beam` | Transfer one channel configuration between compatible radios over the air |
| `Breakout` | Brick-breaking game |
| `Tetris` | Falling-block game with scoring, levels, and a saved best score |
| `Cube3D` | Animated 3D shape viewer |
| `Plasma` | Animated demoscene-style patterns |
| `Snake` | Classic grid-based snake game with a saved best score |
| `Rapid Roll` | Platform game where a rolling ball must keep descending past hazards |
| `Space Impact` | Side-scrolling space shooter with automatic fire, missiles, and bosses |

## Broadcast FM

`Broadcast FM` is a complete BK1080 broadcast receiver. It provides frequency and memory modes, four broadcast bands, manual seek, automatic station discovery, and 48 FM memories shared with the resident FM radio.

While this application is running, the normal BK4819 receive and dual-watch functions are suspended. Changes to FM memories are committed safely when the application exits.

| Key | Action |
| --- | --- |
| `0`–`9` | Enter a frequency in VFO mode, or a two-digit memory number in MR/save mode |
| `UP/LEFT` or `DOWN/RIGHT` | Tune one step in VFO mode; select the previous/next stored station in MR mode; choose a save slot; change seek direction while scanning |
| `*` | Start manual seek; stop an active scan |
| `F`, then `*` or hold `*` | Start automatic scanning and rebuild the FM memory list |
| `M` in VFO mode | Open `SAVE?`; press `M` again to save in the selected slot |
| `M` in MR mode | Open `DEL?`; press `M` again to delete the selected memory |
| `F`, then `1` or hold `1` | Select the next broadcast band |
| `F`, then `3` or hold `3` | Switch between VFO and MR modes |
| `F`, then `0` or hold `0` | Exit the application |
| `EXIT` | Erase the last entered digit, cancel a save/delete prompt, or exit |

> [!WARNING]
> Automatic scanning clears and rebuilds the FM memory list before storing the stations it finds.

## FoxHunt

`FoxHunt` helps locate a transmitter using the selected receive VFO. It shows corrected signal strength in dBm, an IARU-style S-meter, peak and minimum levels, trend information, and either a bar graph or signal history. Selectable attenuation extends the useful range close to a strong transmitter.

| Key | Action |
| --- | --- |
| `1` | Toggle between the bar graph and signal history |
| `2` | Select the next audio mode: off, strength beeps, or continuous station audio |
| `3` | Increase attenuation |
| `F`, then `2` | Select the previous audio mode |
| `F`, then `3` | Decrease attenuation |
| `UP/LEFT` or `DOWN/RIGHT` | Increase/decrease attenuation directly |
| `M` | Reset the peak, minimum, and trend reference values |
| Hold `F` | Lock or unlock the application keypad |
| `EXIT` | Exit while the keypad is unlocked |

The graph, audio mode, and attenuation setting are saved for the next launch. The two navigation keys remain available while the application keypad is locked.

## Beacon

`Beacon` repeatedly transmits an ARDF-style Morse identifier on the selected transmit VFO. It alternates between a configurable transmit window and idle period. Available identifiers are `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO`, and `CALL`; `CALL` sends the configured callsign followed by `MOE`.

| Key | Action |
| --- | --- |
| `1` | Increase the transmit duration in 5-second steps (`5`–`60` seconds) |
| `2` | Increase the idle duration in 5-second steps (`5`–`240` seconds) |
| `3` | Select the next identifier |
| `4` | Toggle `TONE` / `CARR` keying |
| `F`, then `1` / `2` / `3` / `4` | Change the corresponding setting in the reverse direction |
| `M` during transmission | Stop the current transmit window and begin the idle period |
| `M` while idle | Restart the complete idle countdown |
| Hold `F` | Lock or unlock all application controls |
| `EXIT` | Stop safely and exit while controls are unlocked |

The first transmission starts immediately. Duration, idle time, identifier, and keying mode are saved for the next launch. If the resident firmware refuses transmission, the application displays `TX OFF` and does not transmit.

> [!WARNING]
> Beacon transmits automatically. Check the selected VFO, frequency, power, antenna, callsign, duty cycle, and local regulations before launching it.

## Beam

`Beam` transfers the selected VFO or memory-channel configuration between compatible radios. The sending radio transmits the channel data over the air; the receiving radio stores a valid packet in the first free memory.

| Key | Action |
| --- | --- |
| `UP/LEFT` or `DOWN/RIGHT` | Toggle between transmit (`BEAM TX`) and receive (`BEAM RX`) modes; also stop an active receive operation |
| `M` in TX mode | Send the selected channel configuration |
| `M` in RX mode | Start waiting for a Beam packet |
| `EXIT` | Stop receiving or exit the application |

The display reports `SENT`, `RECEIVED`, `MEM FULL`, or `ERROR` as appropriate. Only one received channel is committed per launch; exit and reopen Beam before receiving another.

## Breakout

`Breakout` is a compact brick-breaking game with 18 bricks, five starting balls, score, and level tracking. Clearing the wall starts the next level and awards an extra ball.

| Key | Action |
| --- | --- |
| `4` or `UP/LEFT` | Move the paddle left |
| `0` or `DOWN/RIGHT` | Move the paddle right |
| `M` | Pause or resume; after `GAME OVER`, start the prepared new game |
| `EXIT` | Exit the application |

Game progress is not retained after leaving the application.

## Tetris

`Tetris` uses a 16 × 16 visible well, a shuffled seven-piece bag, ghost piece, next-piece preview, score, lines, and levels. The best score is saved between launches.

| Key | Action |
| --- | --- |
| `4` or `UP/LEFT` | Move left |
| `6` or `DOWN/RIGHT` | Move right |
| `M` or `2` | Rotate the piece |
| `8` | Soft drop |
| `*` or `0` | Hard drop |
| `F` | Pause or resume |
| `M`, `*`, or `0` after game over | Start a new game |
| `EXIT` | Exit the application |

Movement and soft drop repeat while their keys are held.

## Cube3D

`Cube3D` renders rotating solid or wireframe shapes. Eight shapes are available: cube, octahedron, tetrahedron, diamond, icosahedron, cuboctahedron, hexagonal prism, and pentagonal gem.

| Key | Action |
| --- | --- |
| `UP/LEFT` or `DOWN/RIGHT` | Increase/decrease rotation speed (`1`–`16`) |
| `1`–`8` | Select a shape directly |
| `*` | Select the next shape |
| `F` | Toggle wireframe/solid rendering |
| `M` | Pause or resume |
| `EXIT` | Exit the application |

## Plasma

`Plasma` displays animated full-screen demoscene-style patterns with either bands or stippled rendering.

| Key | Action |
| --- | --- |
| `UP/LEFT` or `DOWN/RIGHT` | Increase/decrease animation speed (`1`–`8`) |
| `1`–`5` | Select a pattern and disable automatic cycling |
| `*` | Toggle bands/stippled rendering |
| `F` | Enable or disable automatic pattern cycling |
| `M` | Pause or resume |
| `EXIT` | Exit the application |

## Snake

`Snake` is a classic Nokia-style game played on a `31 × 13` grid. Eat the food to grow the snake and score `10` points. Hitting the border or the snake's own body ends the game. The best score is saved between launches.

| Key | Action |
| --- | --- |
| `2` or `3` | Move up |
| `4` or `5` | Move left |
| `6` or `0` | Move right |
| `8` or `9` | Move down |
| `F` | Pause or resume |
| `M`, `*`, or `0` after game over | Start a new game |
| `EXIT` | Exit the application |

Holding a direction key repeats it. The application refuses an immediate reversal into the snake's own body. If the screen saver activates during a game, Snake pauses and resumes after wake-up.

## Rapid Roll

`Rapid Roll` is a platform game in which the platforms rise toward a spiked ceiling. Move the ball sideways and drop from one safe platform to the next. Spiked platforms, the ceiling, and the bottom of the screen cost a life; crumbling platforms begin to appear from level 3. Hearts award `50` points and restore one life, up to a maximum of five.

| Key | Action |
| --- | --- |
| `4` or `UP/LEFT` | Roll left |
| `6` or `DOWN/RIGHT` | Roll right |
| `F` | Pause or resume |
| `M` after game over | Start a new game |
| `EXIT` | Exit the application |

The game starts with three lives and becomes faster as the level increases. Safe platforms become narrower at higher levels. Progress is not retained after leaving the application. If the screen saver activates during a game, Rapid Roll pauses and resumes after wake-up.

## Space Impact

`Space Impact` is a side-scrolling shooter. The ship fires its main gun automatically, leaving the controls free for vertical movement. Enemy waves use several movement and attack patterns, followed by a boss with a visible health bar at the end of each level.

| Key | Action |
| --- | --- |
| `2` or `UP/LEFT` | Move the ship up |
| `8` or `DOWN/RIGHT` | Move the ship down |
| `5` or `M` | Launch a piercing missile |
| `F` | Pause or resume |
| `M` after game over | Start a new game |
| `EXIT` | Exit the application |

The game starts with three lives and three missiles. The main gun fires automatically. Every 16 enemy kills awards another missile, up to nine. Defeating a boss awards an extra life and missile when below their respective limits. Progress is not retained after leaving the application. If the screen saver activates during a game, Space Impact pauses and resumes after wake-up.

## Related pages

* [Overlay apps](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Button functions](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [FM broadcast radio receiver](./FM-broadcast-radio-receiver)
