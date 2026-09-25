> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Radio-operation/)。

# 无线电操作

本页涵盖收发器的日常操作：在 VFO 和存储模式之间切换、读取状态栏、了解 TX 限制以及管理睡眠行为。

有关扫描相关功能，请参阅[扫描](./Scanning)。有关基于浏览器的实时查看和维护，请参阅[UV Studio](./UV-Studio)。有关无线电对无线电复制，请参阅[AirCopy](./AirCopy)。有关救援操作、恢复模式、内置游戏以及面向研究的发射机解锁程序，请参阅[高级功能](./Advanced-features)。

> [!WARNING]
> 请勿使用全盛CPS。它会覆盖自定义设置。

## 本页内容

* [基本操作与配置](#basic-operation--configuration)
* [状态栏](#status-bar)
* [电池显示、类型和校准](#battery-display-type-and-calibration)
* [关于 `F Lock`和`TXLock` 菜单](#about-the-f-lock-and-txlock-menus)
* [屏幕保护程序和背光超时](#screen-saver-and-backlight-timeout)
* [关于 SetOff 菜单](#about-the-setoff-menu)
* [用于中继器接入的 1750 Hz 音频脉冲串](#1750-hz-tone-burst-for-repeater-access)
* [相关页面](#related-pages)

> [!TIP]
> 常见快速检查：
> - Quansheng CPS 覆盖了自定义设置
> - 该频率超出所选的`F Lock`计划范围
> - `TXLock`仍然是`ON`
> - 选择的是 `AM`或`USB`而不是`FM`
>
> 有关简短版本，请参阅[故障排除](./Troubleshooting)。

## 基本操作和配置

收音机显示屏分为上VFO和下VFO。您可以通过按`F`+`2 A/B`（或长按`2 A/B`）来切换上/下选择。

每个 VFO 都可以在频率模式或通道模式下独立运行。要切换模式，请选择所需的 VFO，然后按 `F`+`3 VFO/MR`（或长按 `3 VFO/MR`）。

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

在`frequency mode`中，您可以使用键盘手动输入频率。您也可以在菜单中更改该VFO的不同选项（前13个菜单项）。VFO设置完成后，可以通过进入`ChSave`菜单并选择目标存储通道，将设置保存到存储通道。

在 `channel mode`中，您可以切换已保存的内存通道。内存通道可以如上所述手动添加，也可以使用每个固件版本随附的`CHIRP` 驱动程序通过计算机进行编程。有关 F4HWN 专用工作流程，请参阅 [使用 CHIRP 进行编程](./Programming-with-CHIRP)。

对于频率扫描、存储器扫描、`ScnRng` 和 DCS / CTCSS 扫描，请参阅 [扫描](./Scanning) 。

## 状态栏

屏幕顶部第一行是状态栏，它会显示很多信息。以下是一些示例：

| 运行 F4HWN 固件的全盛 K5 的屏幕截图 | 描述 |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR 表示接收模式设置为双接收响应，OP 表示 PTT 设置为一键按下，F 图标表示 `F` 键已被按下，并且您看到的是电池电压。 |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS 表示省电模式已激活，DW 表示接收模式设置为主发射/双接收，VX 表示声控模式已激活，CL 表示按键通话模式设置为经典模式，锁定图标表示键盘已锁定，并且您可以看到电池电压。 |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS 表示省电模式已激活，MO 表示接收模式设置为仅主模式，OP 表示按键通话模式设置为一键模式，并且您可以看到电池电量百分比。 |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO 表示接收模式设置为仅主模式，OP 表示 PTT 设置为单键模式，灯光图标表示手动背光控制已激活，并且您可以看到电池百分比。 |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | 左侧的 RX 计时器显示距离上次接收信号的时间，OP 表示 PTT 设置为 ONEPUSH，灯光图标表示手动背光控制已激活，并且您可以看到电池电量百分比。 |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | 倒放视频中的小图标 `PMR`和`><`表示您当前正在扫描列表`PMR`，CL 表示 PTT 设置为 CLASSIC，灯光图标表示手动背光控制已激活，您可以看到电池百分比。 |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | `ALL`图标和`><` 图标表示您当前正在扫描所有列出的频道，OP 表示 PTT 设置为 ONEPUSH，灯光图标表示手动背光控制已激活，并且您可以看到电池百分比。 |

> [!NOTE]
> 关于 `RxMode`、`MO` 表示仅主发射，`DW` 表示主发射/双接收，`DWR` 表示双接收响应，`XB` 表示跨频段。

## 电池显示、类型和校准

固件将三种不同的电池相关功能分开：

* 测得的电池电压
* 预计电池电量百分比
* 睡眠/节能行为

屏幕上会显示电池信息：

* `BatTxt`将`VOLTAGE`或`PERCENT`添加到状态栏，或使用`NONE` 将其隐藏。
* `SysInf` 显示校正后的电池电压、估计的电池电量百分比和固件版本

要使电池百分比显示有意义，有两个隐藏菜单项很重要：

* `BatCal` 校准显示的电池电压
* `BatTyp` 选择用于电池百分比估算的放电曲线

重要区别：

* `BatCal` 改变电压读数
* `BatTyp`改变的是`%` 的计算方式，而不是测量电压本身。

当前可选的`BatTyp`产品有：

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

与任何基于电压的估算一样，电池电量百分比只是一个近似值。它取决于所选的电池模式、电池状况和当前负载。

### 使用万用表校准电池电压

1. 确保收音机没有通过 `USB-C` 充电。
1. 让收音机保持空闲状态片刻。发射时请勿进行校准。
1. 使用万用表测量收音机/电池组背面电池触点上的电池电压。
1. 打开隐藏菜单，然后转到`BatCal`。
1. 调整 `BatCal`，直到收音机显示的电压与万用表显示的电压尽可能接近。
1. 与`M`确认。

> [!TIP]
> 如果电压正确，但百分比仍然感觉不对劲，`BatCal` 可能没问题，`BatTyp` 是需要检查的设置。

## 关于 `F Lock`和`TXLock` 菜单

过去，`F Lock`菜单中有一些频段方案以满足各种需求：PMR 446、FRS/GMRS/MURS 等。然而，添加新的`F Lock`选项总是占用大量内存：在`F Lock`菜单中添加新选项、存储频率（对于专家来说，每次都是`uint32_t`，因此非常消耗内存）等等。

现在必须承认，要提供能够涵盖并满足所有期望的频段方案，即使不是不可能，也是非常复杂的。各国之间的差异实在太大。此外，目前也没有计划将`F Lock`菜单中的多个频段方案组合起来使用。例如，同时开放PMR 446和LPD频段。总之，`F Lock`的功能过于有限，无法扩展。

解决方案如下：

1. 从`F Lock`菜单中选择最合适的频段方案。例如，如果您有呼号并且居住在欧洲，请选择“CE HAM”。如果您没有呼号并且只是短波收听者，请选择“全部禁用”，这样更安全。
1. 如果您仍然想在频段计划未开放的存储信道上进行传输，请转到 `TXLock`菜单并选择`OFF`。这将创建一个例外，并允许在该信道上进行传输。

简而言之：

* 如果频率在`F Lock`中选择的频段方案内，则可以传输
* 如果频率超出`F Lock`中选择的频段方案：
  * 只有当`TXLock`为`OFF`时，才能进行传输
  * 如果`TXLock`为`ON`，则无法传输

如果存储频道或 VFO 位于所选频段计划之外，并且 `TXLock`为`ON`，则名称左侧会出现一个小挂锁。

对于研究导向的`UNLOCK ALL`程序，请参阅[高级功能](./Advanced-features#tx-on-all-bands)。

## 屏幕保护程序和背光超时

支持屏幕保护程序的版本会添加 `SetSav` 菜单。

`SetSav`与`BLTime` 配合使用：当收音机处于空闲状态且背光超时到期时，屏幕保护程序可以替换正常屏幕，而不是简单地保持显示不变。

可用模式有：

* `OFF`：无屏幕保护程序
* `LOGO`：在待机屏幕上显示自定义启动徽标
* `LOGO+`：显示带有滚动效果的自定义启动徽标
* `MATRIX` : 显示矩阵风格的动画待机画面

标志模式使用与 [UV Studio](./UV-Studio#boot-logo) 上传的 `128x64` 标志相同。

在进行无线电操作（接收、发射、PTT、BEAM 和 FM 扫描）时，屏幕保护程序会暂停运行。当收音机处于空闲状态时，屏幕保护程序会显示在主屏幕和 FM 广播屏幕上。按下任意键即可唤醒屏幕保护程序。

如果将 `BLTime`设置为始终关闭或始终开启的样式值，而不是定时持续时间，则`SetSav` 不会接管显示。

## 关于 SetOff 菜单

`SetOff`菜单允许您配置收音机进入睡眠模式前的超时时间。此延迟时间可设置为 1 分钟到 2 小时。如果`SetOff`为`OFF`，则睡眠模式将被禁用。

例如，如果您将延迟时间设置为 5 分钟，并且在此期间发生了以下情况：

* 无信号
* 无传输
* 无需按按钮

之后，您的收音机将自动进入睡眠模式。屏幕会在10秒前闪烁提示您。

请注意，即使您正在扫描，只要没有接收到信号，睡眠模式也会被激活。

FoxHunt 和 Beacon 是特意设置的例外：当这两个应用程序处于活动状态时，无线电会忽略 `SetOff`，直到您明确退出为止。正常的背光超时仍然有效。请参阅 [FoxHunt](./Fox-Hunt) 和 [Beacon](./Beacon) 。

进入睡眠模式后：

* 屏幕完全关闭
* 天线底部的红色LED指示灯闪烁
* BK4819 模块进入深度睡眠模式，并每隔一段时间唤醒一次：
  * 如果 `BatSav`设置为`1:1`，则为 2 秒
  * 如果 `BatSav`设置为`1:2`，则为 4 秒
  * 如果 `BatSav`设置为`1:3`，则为 6 秒
  * 如果 `BatSav`设置为`1:4`，则为 8 秒
  * 如果 `BatSav`设置为`1:5`，则为 10 秒

要退出睡眠模式，您只需：

* 在 BK4819 周期性唤醒阶段接收信号
* 按下PTT按钮即可发起传输
* 或按任何其他按钮

例如，我使用两台经过校准且电池已充满电的K5(8)对讲机测试了睡眠模式，设置相同，包括频率、模式（`DWR`）以及`BatSav`设置为`1:5`。唯一的区别在于一台对讲机启用了睡眠模式，而另一台则没有。运行36小时后，未启用睡眠模式的对讲机仅剩余20%的电量，而启用睡眠模式的对讲机仍有60%的电量。

## 用于中继器接入的 1750 Hz 音频脉冲

按下 `PTT` 时，按下 [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3) 即可激活 1750 Hz 音调。

## 相关页面

* [入门指南](./Getting-started)
* [UV Studio](./UV-Studio)
* [使用 CHIRP 进行编程](./Programming-with-CHIRP)
* [扫描](./Scanning)
* [菜单](./Menu)
* [按钮功能](./Button-functions)
* [高级功能](./Advanced-features)
* [故障排除](./Troubleshooting)
