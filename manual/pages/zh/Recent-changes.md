> 🌐 **翻译**
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Recent-changes/)。

# 近期变化

本页面总结了最新的稳定版 `v6.1.0` 以及早期版本中用户可见的主要变化。

有关官方发布存档，请参阅[GitHub 发布页面](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases)。

## v6.1.0 版本亮点

`v6.1.0`是最新的稳定版本。它着重于更快更安全的数据传输、新的`MIX` 扫描列表模式、通过 UV Studio 扩展的实验室维护以及多项可靠性修复。

### 发布包

请从[v6.1.0 发布页面](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0)下载固件及相关文件。此版本提供四个官方版本——`Fusion`、`FieldOps`、`Transfer`和`Labs`——以及配套的共享 CHIRP 驱动程序。请根据所需功能选择版本，而不是将 Fusion 视为包含所有专用功能的软件包。

### 从 v6.0.0 升级

1. 在旧固件仍然安装的情况下，使用匹配的 CHIRP 驱动程序下载无线电固件并保存镜像。可以选择将存储通道行导出为 CSV 文件。
1. 使用 [UV Studio](./UV-Studio#calibration) 备份收音机的设备特定校准。
1. 刷入选定的`v6.1.0`版本。仅当发行说明或从已安装版本迁移的路径明确要求时，才执行恢复出厂设置。
1. 加载专用的`v6.1.0` CHIRP 驱动程序，并从更新后的收音机下载新的映像。
1. 将旧频道行复制到新镜像中，而不是上传完整的旧设置镜像。
1. 在 Labs 中，从 UV Studio 的版本化应用程序目录中选择 `v6.1.0`。替换加载器报告为不兼容的任何叠加应用程序。
1. 使用 AirCopy 之前，请将两个无线电更新到兼容的 `v6.1.0` 固件；其优化的无线电协议与早期版本不兼容。

安装 `v6.1.0` Labs 后，UV Studio 可以保存完整的外部闪存数据，以创建额外的安全备份。请参阅 [选择正确的备份或副本](./UV-Studio#choosing-the-right-backup-or-copy)。

### AirCopy 性能和线缆克隆

`v6.1.0` AirCopy 协议可在一个 FSK 帧中发送最多三个 `64-byte` 数据块，从而降低往返开销，使无线传输速度大约提高一倍。它会以最多 `24` 个数据块为一组比较 CRC32 哈希值，并且只发送与目标端不同的数据块。

`Transfer`版本还新增了通过 UART 传输数据`CABLE COPY`的功能，以及仅通过线缆传输数据`Flash 2M` 的功能，用于克隆外部闪存，同时排除设备特定的校准扇区。发送方和接收方的选择会在数据写入前进行验证。

这是一个新协议：两个无线电必须运行相同的兼容固件。参见[AirCopy](./AirCopy#v610-improvements)。

### MIX 扫描列表

新的`MIX`模式会将已保存的列表`01`至`24`作为一个组合集进行扫描。在`ScList`中选择`MIX`，按下`M`打开编辑器，使用`M`切换列表，然后按下`EXIT`保存。编辑器会显示已选列表的数量，并且必须至少启用一个列表。

在进行内存扫描期间，输入`25` 会选择`MIX`；输入`00` 会继续选择`ALL`。参见[扫描](./Scanning#mix-scan-list-v610)。

### UV Studio v1.6.0

UV Studio `v1.6.0`为实验室添加了完整的`2 MiB`外部闪存备份和恢复功能。恢复过程会保留设备特定的校准扇区，在支持的情况下使用 CRC32 跳过相同的`4 KiB` 扇区，验证每个写入的扇区，并在完成后重启无线电设备。

全新的引导式工厂软件恢复功能会根据镜像文件的大小和 SHA-256 校验码验证镜像文件，在保留校准信息的同时恢复重建的外部闪存镜像，然后提示进入 DFU 模式并安装匹配的 UV-K1 或 UV-K5 V3 原厂固件。此外，界面还将校准和启动徽标操作分组，以更清晰的方式呈现备份/恢复或下载/上传视图。

这些外部闪存工具需要 `v6.1.0` Labs。请参阅 [UV Studio](./UV-Studio#version-status) 、 [外部闪存备份和恢复](./UV-Studio#external-flash-backup-and-restore-v160) 和 [工厂软件恢复](./UV-Studio#factory-software-restoration-v160) 。

### v6.1.0 的其他变更

该版本还添加了 [`Snake`](./Overlay-applications#snake) , [`Rapid Roll`](./Overlay-applications#rapid-roll) , 和 [`Space Impact`](./Overlay-applications#space-impact) 叠加游戏，以及涉及跨配置库的 RF 日志、叠加应用程序存储、擦除校准和 DCS 静噪尾部处理的修复。

## v6.0.0 版本亮点

`v6.0.0` 于 2026 年 9 月 10 日发布。它引入了四个官方版本、Multiboot 和 Multiconfig、Labs overlay-app 平台、可靠的 AirCopy 以及独立的 FoxHunt 和 Beacon 应用程序。

### 四个官方版本

| 版本 | 预期用途 | 附加功能 |
| --- | --- | --- |
| `Fusion` | 日常使用 | 均衡参考版；推荐给大多数用户 |
| `FieldOps` | 现场和急救人员工作 | 救援行动、常驻猎狐队和常驻灯塔队 |
| `Transfer` | 无线电数据传输 | AirCopy 和驻留光束 |
| `Labs` | 实验 | RescueOps、AirCopy 和叠加应用程序，包括 FoxHunt、Beacon 和 Beam |

Fusion `v6.0.0` 不再包含 v5.x 版本的 AirCopy、Beam、RescueOps、Fox Hunt / Beacon 或 Breakout 等专用功能。如果需要这些功能，请选择相应的专用版本。

### 独立的 FoxHunt 和 Beacon 应用程序

原先的合并操作 `FOX HUNT / BEACON`在`v6.0.0` 版本发布之前已拆分。`FOX HUNT`和`BEACON` 是独立的可编程操作，是 FieldOps 中的独立驻留应用程序，也是 Labs 中的独立叠加应用程序。

请参阅 [FoxHunt](./Fox-Hunt) 和 [Beacon](./Beacon) 。

### 多重启动

兼容版本可以在外部闪存中存储四个额外的 F4HWN 固件映像。在打开收音机的同时，单独按住 `M`(`MENU`) 以打开启动选择器，验证存储的映像，并将`Main`或插槽`1`恢复到`4` 。

固件会自动保护正常刷写的镜像文件`Main`，在擦除内部闪存之前验证插槽的完整CRC校验码，并冗余地记录其激活状态。UV Studio的`Firmware Slots`视图会在无线电处于正常模式时安装、验证、命名并擦除四个用户插槽。

这些插槽中只能安装支持多启动的`v6.0.0`或更新的F4HWN镜像。请参阅[多启动和多配置](./Multiboot-and-Multiconfig)。

### 多配置和 SetCfg

每个固件插槽默认选择一个独立的配置库。因此，切换版本时，存储通道、通道名称、VFO、扫描列表和无线电设置保持独立。校准、启动徽标、固件/应用程序插槽、多启动状态和射频日志则保持共享。

新的`SetCfg`菜单可以手动将正在运行的固件与其他存储区配对。`SysInf`显示独立的`SLOT`和`CFG`徽章，UV Studio可以在不擦除固件的情况下重置用户插槽的配置。

请参阅 [Multiboot 和 Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) 和 [Menu](./Menu) 。

### 可靠的 AirCopy，带致谢功能

Air Copy 现在会在发送每个数据块后等待确认。接收方会在写入数据包前进行验证，并可以请求重发；发送方最多会重试丢失、损坏或未确认的数据块三次。重复的数据块也会被安全地确认，因此丢失 ACK 不再会导致传输不同步。

新增的`All (Mem+Set)`选项可一次性连续传输所有八个128通道库及其设置。屏幕会显示`TX`/`RX`进度以及重试次数或错误次数。

请参阅 [AirCopy](./AirCopy#reliable-protocol-in-v600) 。

### 实验室中的叠加应用

实验版`Labs`可以将小型`.app`程序安装到外部闪存中，并从已选中的`4 KiB` RAM覆盖层执行它们。UV Studio的`Apps`视图（标记为`Labs only`）可以安装、验证、列出和删除应用程序；`F + 7`会打开车载启动器。

加载器会在执行前验证应用程序格式、ABI/API 兼容性、所需功能、RAM 地址、大小和 CRC 校验码。可用的应用程序包括广播工具，例如 Broadcast FM、FoxHunt、Beacon 和 Beam，以及 Breakout、Tetris、Cube3D 和 Plasma。

有关安装和兼容性，请参阅 [Overlay apps](./Overlay-apps)，有关每个应用程序的用途和控制，请参阅 [Overlay applications](./Overlay-applications)。

### 信标键控模式（TONE / CARR）

信标在按键`4`上获得键控模式设置。`TONE`（默认）是之前的行为——连续的FM载波，`1000 Hz`音调根据每个莫尔斯电码元素进行键控（MCW/F2A）。`CARR`在每个元素之间中断载波，重现了许多ARDF狐狸在野外使用的载波中断模式：信号在元素之间消失，使测向更加困难，并允许普通的AM接收机接收信号。此设置会被保存并包含在AirCopy传输中，并且在驻留信标和叠加信标中均可用。参见[信标](./Beacon#timing-and-keying)。

## v5.9.0 版本亮点

这些变化是在`v5.8.0`之后开发的，并在`v5.9.0`中发布。

### 分类菜单浏览器

Fusion 开发版本会在类别屏幕上打开菜单，而不是立即显示原始的扁平列表。可用类别包括 `Channels`、`Scan`、`Keys`、`Power`、`Display`、`Timers`、`Audio`、`Radio`和`DTMF`。隐藏菜单启动时还会添加 `Service` 类别。

`All`类别保留了原有的平面菜单顺序和全局编号。直接从类别屏幕输入菜单编号也会切换到`All`，因此现有的编号菜单快捷方式仍然有效。固件会记住当前会话中最后选择的类别以及每个类别中最后使用的项目。

请参阅[菜单](./Menu#categorized-menu-browser)。

### 侧键操作选择器

按下`F`后，按住任一侧键即可打开临时动作选择器。在UV-K5上使用`UP`/`DOWN`，或在UV-K1上使用`LEFT`/`RIGHT`，浏览已编译的快捷动作，然后按下`M`运行高亮显示的动作。按下`EXIT`或`F`可取消选择器；按下`PTT`可关闭选择器并继续进行正常的传输处理。

选择器会在大约五秒钟后或开始接收信号时自动关闭。每个侧键都会记住上次的选择，直到收音机重启。短按`F` + 侧键可保持其原有的升压/降压功能。

请参阅[按钮功能](./Button-functions#side-key-action-picker)。

### 猎狐/信标改进

Fox Hunt 在原有的 `ATT 0`、`ATT 6`、`ATT 15`和`ATT 27`设置之后，增加了两个更深的前端增益档位，分别显示为`BYP`和`BYP+`；这些名称描述的是方便的近距离模式，并非实际的硬件旁路。导航键（UV-K5 上的 `UP`/`DOWN`，或 UV-K1 上的 `LEFT`/`RIGHT`）现在可以直接调节衰减。

增益调整后，固件会短暂地让RSSI检测器稳定下来，然后重置峰值、最小值、趋势和信号历史参考值。这样可以避免在不同增益范围之间切换时出现过时的峰值和人为的跳变。

按住`F`约0.5秒可切换Fox Hunt和Beacon共享的临时键盘锁定状态。在Fox Hunt中，锁定状态下导航键仍可用于衰减。在Beacon中，所有常规控制键均被锁定，直到再次长按该键解锁键盘，即使在传输过程中也是如此。

Fox Hunt 和 Beacon 现在都忽略了正常的 `SetOff` 不活动计时器，并保持激活状态，直到被明确退出。它们的常规背光超时和电池更新功能仍然有效。

参见[Fox Hunt and Beacon](./Fox-Hunt-and-Beacon)。

### 扫描和调频广播修复

在内存扫描期间，更改活动扫描列表会暂时暂停扫描恢复，同时显示扫描列表名称。这样可以保持隐藏的进度条和扫描位置同步。频率扫描和范围扫描不会暂停，因为它们不显示名称叠加层。

现在，正在进行的调频广播电台扫描会忽略主频道上检测到的传入信号，因此调频扫描不会中断。正常的调频收听仍然会像以前一样优先接收主频道。

请参阅 [扫描](./Scanning#changing-the-scan-list-during-scan) 和 [FM 广播接收器](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo) 。

## v5.8.0 版本亮点

这些更改基于 `feature_update_v5`中`v5.7.0` 标签之后的提交。

### 猎狐/灯塔

Fusion 构建增加了一个可编程的 `FOX HUNT / BEACON` 动作，具有两种互补模式：

* Fox Hunt 提供校准的 `dBm` 显示屏、S 表和峰值读数、一秒信号趋势、可选衰减、盖革式或接收站音频，以及阶梯式仪表和大约 18 秒信号历史记录之间的选择。
* 信标使用活动 TX VFO 以莫尔斯电码发送 ARDF 标识符或 `<CALLSIGN> MOE`，具有可调节的 `5`至`60-second`TX 窗口和`5`至`240-second` 静默间隔。

信标的呼号取自 CHIRP `Message Line 1`，并在被选中后立即开始首次传输。每次脉冲串开始前，固件都会检查适用的发射频率锁定、每个 VFO `TXLock`、电池状态和调制限制。

衰减、仪表、音频模式和信标间隔保存在外部闪存中，并包含在 Air Copy `Settings` 传输中。

请参阅历史 [Fox Hunt / Beacon 兼容性页面](./Fox-Hunt-and-Beacon) 。有关当前固件，请使用单独的 [FoxHunt](./Fox-Hunt) 和 [Beacon](./Beacon) 页面。

## v5.7.0 版本亮点

这些更改基于 `feature_update_v5`中`v5.6.1` 标签之后的提交。

### UV Studio

[UV Studio](./UV-Studio) 提供统一的基于浏览器的界面，用于无线电查看、控制、维护和恢复。

它提供实时屏幕镜像和非发射键盘控制、兼容的射频日志查看和分析、射频日志 CSV 文件导出、固件刷新、校准备份/恢复以及自定义启动徽标管理。它无需安装、服务器或帐户，即可通过 `Web Serial` 在本地运行。

UV Studio 是 Fusion 固件的浏览器配套软件。

### 射频日志

带有 RX/TX 日志记录的构建版本添加了一个可编程的 `RF LOG` 快捷操作。

射频日志会将接收、监控和发送会话记录到外部闪存中，然后以最新记录优先的历史记录视图显示它们。每个条目可以显示信道名称或频率、接收/发送方向、持续时间、接收信号强度表或发送功率级别，以及会话期间的最低电池电压。

日志界面支持：

* `ALL`、`RX`和`TX` 滤光片
* 最多可显示 512 个交通入口
* 使用 `F`和导航键（UV-K5 上为`UP`/`DOWN`，UV-K1 上为 `LEFT`/`RIGHT`）可跳转到最新和最旧页面。
* 删除日志前需有清晰的确认流程

请参阅[高级功能](./Advanced-features#rf-log)和[按钮功能](./Button-functions#rf-log-action)。

### 扫描范围排除项

`ScnRng`现在可以保持`64`临时排除频率，而不是`32` 。

与以前一样，该列表是循环的，不会写入内存，并且在无线电重新启动或范围标识更改时会被清除。

参见[扫描](./Scanning#excluding-frequencies-in-scnrng)。

### 设置锁定范围

`SetLck` 现在有四个选项，而不是两个：

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS`覆盖了分配给两个侧键和`M Long` 的可编程快捷键。这样，在锁定前面板键盘时，这些快捷键仍然可用，或者也可以在锁定时禁用它们。`PTT` 可以独立锁定，以防止意外传输。

请参阅 [菜单](./Menu#main-menu) 和 [按钮功能](./Button-functions#keypad-lock-and-setlck) 。

### UV Studio维护

固件端的屏幕流处理代码已在内部重命名，从屏幕截图处理代码改为 UV Studio 处理代码。启用可选的 RX/TX-log UV Studio 桥接功能的版本还可以将最新的 RF 日志行流式传输到兼容的查看器工具。

请参阅[高级功能](./Advanced-features#k5-viewer)。

## v5.6.0 版本亮点

这些更改基于 `feature_update_v5`中的`v5.5.0` 提交。

### 设置屏幕保护程序

支持屏幕保护程序的版本会添加 `SetSav` 菜单。

可用模式：

* `OFF` : 无屏幕保护程序
* `LOGO`：将存储的启动徽标显示为空闲屏幕
* `LOGO+`：以滚动效果显示已存储的启动徽标
* `MATRIX` : 显示矩阵风格的动画待机屏幕

`SetSav` 与背光超时相关。当收音机处于空闲状态时，它可以显示在主屏幕和 FM 广播屏幕上；在接收 (RX)、发送 (TX)、PTT、BEAM 和 FM 扫描期间，它会被暂停显示。

请参阅[无线电操作](./Radio-operation#screen-saver-and-backlight-timeout)和[菜单](./Menu#main-menu)。

因为 `SetSav`插入在隐藏菜单之前，所以隐藏菜单索引在`v5.6.0` 中移动 1：`F Lock`从`72`开始，而不是从`71` 开始。

### 开机标志启动音

当 `POnMsg = LOGO` 时，启动徽标模式仍可保持正常的启动哔声行为。

请参阅 [菜单](./Menu#main-menu) 和 [UV 工作室](./UV-Studio#boot-logo) 。

### 扫描 RSSI 指标

快速扫描构建可以在扫描过程中显示一个小型 RSSI 迷你图。它以简洁的方式呈现最近的 RSSI 样本，使高潜力候选目标在扫描运行时更加醒目。

参见[扫描](./Scanning#scan-indicators-and-detection)。

### 扫描范围亚音频检测

`ScnRng` 可在接收到信号并停止扫描时检测 CTCSS / DCS。检测到的亚音频代码（如有）将显示在扫描界面中。

参见[扫描](./Scanning#scan-indicators-and-detection)。

### 频率复制用户界面

`F+4` 频率复印扫描仪屏幕现在更清晰地区分了搜索状态和结果：

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* 检测到 `Freq:`和`Tone:` 的详细信息

参见[扫描](./Scanning#frequency-copy-and-dcs--ctcss-scanning)。

### UV Studio 和屏幕截图更新

屏幕保护程序帧与 UV Studio 同步，屏幕截图处理已得到优化，以减少 RAM 使用量并避免出现过时的数据块。

请参阅[高级功能](./Advanced-features#k5-viewer)。

### 修复和改进

该版本还包含多项行为修复和用户界面改进：

* `8.33 kHz` 步进的频带/频谱频率舍入
* AM 转 FM 双频接收重新配置
* 扫描时 VFO 锁定图标的位置
* 屏幕保护程序唤醒/睡眠边缘保护壳
* 手动背光关闭时，图标为空心。

## v5.5.0 版本亮点

### 更快的扫描引擎

当前版本可以使用较新的`FAST`扫描引擎进行内存扫描，以及`ScnRng`扫描引擎。

`SetScn` 菜单用于选择：

* `NORMAL`：保守扫描路径
* `FAST`：一种更快的路径，可在进行完整的接收设置之前，使用 RSSI 预先检查信道或距离步长。

在有利条件下，`ScnRng`在`FAST`模式下每秒可扫描约`150+` 个频率。

请参阅 [扫描](./Scanning#scan-engine-mode-normal-vs-fast) 和 [菜单](./Menu#main-menu) 。

### 临时扫描范围排除

当 `ScnRng`扫描停止在接收到的频率上时，长按`MENU` 可将该频率从当前范围扫描中排除。

此功能在 `v5.5.0`版本中通过`32`插槽引入；当前`v5.6.1`版本之后的构建允许`64` 临时排除。这些排除项会在无线电重启或范围标识更改时被清除。

参见[扫描](./Scanning#excluding-frequencies-in-scnrng)。

### 光束传输模式

支持 BEAM 的版本可以将当前的 VFO 或存储通道配置发送到另一台收音机，或者接收 BEAM 数据包并将其保存到第一个空闲的存储通道。

BEAM 可通过可编程快捷操作打开。

请参阅[高级功能](./Advanced-features#beam-transfer-mode)和[按钮功能](./Button-functions#beam-action)。

### 自定义靴子标志

支持徽标的版本可以在启动时显示自定义的`128x64`单色启动徽标。

使用 UV Studio 上传或下载徽标，然后在 `POnMsg`菜单中选择`LOGO`。

请参阅 [UV Studio](./UV-Studio#boot-logo) , [Menu](./Menu#main-menu) , 和 [Troubleshooting](./Troubleshooting#my-custom-boot-logo-does-not-show) 。

### DCS/CTCSS 显示改进

`RxDCS`、`TxDCS`、`RxCTCS`和`TxCTCS` 菜单现在会同时显示选定的条目位置和同源索引（如果存在）。

这样更容易区分正常列表位置、PMR446 同源条目、额外音调和倒置 DCS 条目。

请参阅[菜单](./Menu#main-menu)。

### 频道名称编辑

`ChName`编辑功能得到了改进，支持多点输入、大小写切换、长按直接数字输入，以及更清晰的`EXIT` 行为。

请参阅[菜单](./Menu#main-menu)。

### 频谱分析仪的余辉

现在，当使用 `EXIT` 离开扫描屏幕时，频谱分析仪会保存更多设置，包括触发模式、自动灵敏度配置文件、手动刻度和触发级别。

从`ScnRng`启动分析仪不再覆盖已保存的扫描步骤或条形计数首选项。

参见[光谱分析仪](./Spectrum-analyzer#saving-settings-on-exit)。

### 系统信息和构建信息

`SysInf` 现在在当前版本中已启用分页。根据构建选项，它可以显示标识、构建日期/时间、提交标识符、电池信息、内存使用情况和二维码项目链接。

请参阅[菜单](./Menu#main-menu)。

### Air Copy 设置覆盖范围

Air Copy `Settings`传输现在包括`ScnRng` 等功能使用的 VFO 区域，因此在复制设置时会复制扫描范围边界频率。

请参阅 [AirCopy](./AirCopy) 。

## 近期 v5.x 版本更新也值得了解

以下变更在 `v5.5.0` 版本之前不久生效，并已记录在维基百科中，因为它们会影响日常使用：

* `SetRxA`为`FM`和`AM`选择不同的 RX 音频配置文件；在`AM`中，它可以在`SHARP`、`STOCK`和`OPEN` 之间切换。
* 扫描列表支持短名称，内存扫描可以在扫描过程中在有效的非空列表之间切换。
* `SysInf` 、FM 广播电台和频谱分析仪用户界面在最近的版本中得到了改进。
* 隐藏的 `SetNav`菜单允许相同的文档适用于`UV-K1`和`UV-K5 V3` 导航样式。

请参阅 [菜单](./Menu) , [扫描](./Scanning) , [收音机操作](./Radio-operation) , 和 [FM 广播收音机接收器](./FM-broadcast-radio-receiver) 。

## 相关页面

* [入门指南](./Getting-started)
* [UV Studio](./UV-Studio)
* [多重启动和多重配置](./Multiboot-and-Multiconfig)
* [叠加应用](./Overlay-apps)
* [叠加应用](./Overlay-applications)
* [扫描](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [信标](./Beacon)
* [AirCopy](./AirCopy)
* [按钮功能](./Button-functions)
* [高级功能](./Advanced-features)
* [光谱分析仪](./Spectrum-analyzer)
* [菜单](./Menu)
