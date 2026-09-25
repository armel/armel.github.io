> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Beacon/)。

# 灯塔

Beacon 是一款发射 ARDF 式莫尔斯电码的应用。它会在活动的 TX VFO 上反复发送选定的标识符，在可配置的发射窗口和静默间隔之间交替进行。

由于`v6.0.0`，Beacon和[FoxHunt](./Fox-Hunt)是独立的应用程序和独立的程序操作。Beacon直接在其发射周期中启动；它不通过FoxHunt打开。

Beacon 内置于 `FieldOps`版本中。在`Labs`版本中，使用 [UV Studio](./UV-Studio#apps-labs) 安装`Beacon` 叠加应用。`BEACON` 快捷方式会根据版本启动内置应用程序或相应的已安装叠加应用。

> [!WARNING]
> 信标会立即开始首次传输。发射前，请确认已激活的发射VFO、频率、功率、天线、`F Lock`、`TXLock`、呼号和识别要求、占空比以及当地法规。请勿在禁止自主或周期性传输的区域让无人值守的信标持续传输。

## 启动信标

将 `BEACON`分配给`F1Shrt`、`F1Long`、`F2Shrt`、`F2Long`或`M Long`，然后触发该快捷方式。在 Labs 中，您还可以从 `F + 7`应用选择器启动`Beacon`。

![信标发射周期屏幕](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## 标识符

| 设置 | 信息 | 目的 |
| --- | --- | --- |
| `MOE`至`MO5`|`MOE`、`MOI`、`MOS`、`MOH`、`MO5` | 五个标准的 IARU ARDF 狐狸标识符 |
| `MO`|`MO` | 饰面/家居标识 |
| `CALL`| 配置的呼号，后接`MOE` | 已识别的业余无线电频段信标 |

呼号来自 CHIRP `Message Line 1`。字母转换为大写；支持字母、数字和 `/`。参见 [使用 CHIRP](./Programming-with-CHIRP#beacon-identification) 进行编程。

该标识符使用 `1000 Hz`色调，大约为`12 WPM` 。

## 时序和键控

* `TX`:`5`至`60 seconds`，步长为 `5-second`；默认值为 `30 seconds`
* `IDLE`:`5`至`240 seconds`，步长为 `5-second`；默认值为 `30 seconds`

对于经典的五狐计时，请使用`TX = 60 s`和`IDLE = 240 s`。

| 模式 | 行为 |
| --- | --- |
| `TONE`| 在整个发射窗口期间保持 FM 载波激活，并发出`1000 Hz` 音调 |
| `CARR` | 将每个莫尔斯电码元素的载波和音调键合在一起，使信号在间隙中消失 |

`TONE` 是更清晰的默认设置。`CARR` 能更精确地再现载波中断式自动定向仪 (ARDF) 发射机，但直接载波键控可能会产生轻微的咔嗒声和额外的频谱扩展。

## 控制

| 控制 | 操作 |
| --- | --- |
| `1`| 循环`TX` 持续时间 |
| `2`| 循环`IDLE` 持续时间 |
| `3` | 循环标识符 |
| `4`| 切换`TONE`/`CARR` |
| 如果选择 `F`，则选择 `1`、`2`、`3`或`4` | 将相应的设置向后调整 |
| 按住`F`约0.5秒 | 锁定或解锁所有信标控制 |
| `M` TX 期间 | 停止当前传输并开始新的空闲间隔 |
| `M` 空闲时 | 重新启动完整空闲倒计时 |
| `EXIT` | 安全停车并离开信标 |

每次脉冲串发射前，Beacon 都会检查正常的发射频率限制、每个信道的 `TXLock` 设置、电池状态和调制方式。如果发射被拒绝，它会显示相应的无线电状态，并在尝试下一次预定脉冲串发射前等待一段时间。

## 已保存的设置

Beacon 会保存其标识符、持续时间（`TX`）、持续时间（`IDLE`）以及模式（`TONE`/`CARR`）。这些设置在下次启动时会恢复，并包含在 AirCopy 传输中（`Settings`）。临时应用程序锁定不会被保存。

## 相关页面

* [FoxHunt](./Fox-Hunt)
* [按钮功能](./Button-functions#beacon-action)
* [使用 CHIRP 进行编程](./Programming-with-CHIRP#beacon-identification)
* [叠加应用](./Overlay-apps)
* [叠加应用](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [无线电操作](./Radio-operation)
