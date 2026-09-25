> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Advanced-features/)。

# 高级功能

本页面涵盖基本无线电操作不需要的特殊或可选功能：BEAM、RF 日志、RescueOps、UV Studio、恢复模式、内置游戏以及用于研究的发射机解锁程序。AirCopy、FoxHunt、Beacon、Multiboot 和叠加应用程序均有各自的详细介绍页面。

有关日常无线电使用，请参阅[无线电操作](./Radio-operation)。有关扫描相关功能，请参阅[扫描](./Scanning)。

> [!NOTE]
> 本页中提及`UP`/`DOWN`的地方，请使用UV-K1上的等效按键`LEFT`/`RIGHT`。活动导航布局如下`SetNav`。

## 本页内容

* [AirCopy](#aircopy)
* [多重启动、多重配置和叠加应用](#multiboot-multiconfig-and-overlay-apps)
* [光束传输模式](#beam-transfer-mode)
* [猎狐](#foxhunt)
* [Beacon](#beacon)
* [射频日志](#rf-log)
* [救援行动](#rescueops)
* [游戏](#game)
* [UV Studio](#uv-studio)
* [恢复模式](#resume-mode)
* [在所有频段上发送 TX](#tx-on-all-bands)
* [相关页面](#related-pages)

## AirCopy

AirCopy 可在兼容的无线电设备之间传输存储库和设置。`v6.0.0` 新增了已确认块、重试、重复处理功能，`All (Mem+Set)`和`v6.1.0` 则在传输版中新增了多块帧、相同块的比较和跳过、电缆传输以及受保护的外部闪存克隆功能。

有关版本可用性、控制、协议兼容性、无线电传输、`CABLE COPY`和`Flash 2M` 安全信息，请参阅 [AirCopy](./AirCopy)。

## 多启动、多配置和叠加应用

`v6.0.0` 新增了两个单独的文档中记录的大型平台：

* [多重启动和多重配置](./Multiboot-and-Multiconfig) 解释了 `Main` 以及四个固件插槽、启动选择器、独立配置库、`SetCfg` 和 UV Studio 插槽管理。
* [叠加应用](./Overlay-apps) 解释了仅限实验室使用的实验性 `.app` 平台、通过 UV Studio 进行安装、`F + 7` 启动器、兼容性检查和应用程序开发。

## 光束传输模式

BEAM 是一种可选的直接传输模式，用于传输单个 VFO 或存储通道。与传输存储库或设置部分的 [AirCopy](./AirCopy) 不同，BEAM 旨在快速地将当前选定的设置共享给另一台兼容的收音机。

将 `BEAM` 分配给一个可自定义的快捷键（`F1Shrt`、`F1Long`、`F2Shrt`、`F2Long`或`M Long`），然后触发该快捷键以打开 BEAM 模式。

在光束模式下：

* `UP`/`DOWN`在`BEAM TX`和`BEAM RX` 之间切换
* `M` 启动所选操作
* `EXIT` 离开光束模式

`BEAM TX` 发送当前 VFO 或存储通道配置，包括频率、偏移、音调、调制、带宽、功率、扫描列表分配、压扩器、启用时与 DTMF 相关的设置以及通道名称。

`BEAM RX`等待来自另一个无线电的 BEAM 数据包，并将其保存到第一个空闲的存储信道中。如果内存已满，则状态显示`MEM FULL` 。

有关快捷键级别的详细信息，请参阅 [按钮功能](./Button-functions#beam-action)。

## 猎狐

[FoxHunt](./Fox-Hunt) 是一款仅接收信号强度和测向的应用程序。自 `v6.0.0`起，它拥有自己的`FOX HUNT` 快捷操作。它驻留在 FieldOps 中，也可作为 Labs 中的可安装叠加应用程序使用。

## 灯塔

[Beacon](./Beacon) 是一个独立的 ARDF 式莫尔斯电码发射应用程序，具有自己的 `BEACON` 快捷操作和安全要求。它驻留在 FieldOps 中，也可作为 Labs 中的独立可安装叠加应用程序使用。

## 射频日志

启用 RX/TX 日志记录的版本会添加一个 `RF LOG`快捷操作。将其分配给`F1Shrt`、`F1Long`、`F2Shrt`、`F2Long`或`M Long`，然后触发该快捷操作即可打开历史记录屏幕。

射频日志会将接收、监控和发送会话记录到外部闪存中。它可用于在扫描后检查近期活动、监控无人值守信道或回顾现场使用期间的传输记录。

每个已记录的流量条目存储：

* 频率，或者当会话来自已保存的通道时，存储通道的引用
* RX 或 TX 方向
* 会话时长
* 接收会话的峰值 RX S 表电平，或发射会话的 TX 功率电平
* 会话期间测得的最低电池电压

日志视图首先显示最新条目，最多显示 512 条流量条目。选中 `ALL` 过滤器后，水平分隔线会标记无线电重启事件。

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

射频日志屏幕上的控制选项：

* `UP`/`DOWN`：滚动浏览条目
* `F`+`UP`：跳转至最新条目
* `F`+`DOWN`：跳转至最早可见的条目
* `M`：在`ALL`、`RX`和`TX`之间循环切换滤镜
* `* SCAN`：循环切换右侧详细信息徽章，显示持续时间、S表/发射功率和最低电池电压。
* 长按 `M`：打开清除确认；再次长按 `M`和`CLEAR LOG / SURE?` 可清除日志
* `EXIT`：离开射频日志屏幕，或取消清除确认

日志存储在预留的外部闪存区域中，因此即使正常断电重启后也能保留数据。清除日志会擦除该预留区域。

有关快捷键级别的详细信息，请参阅 [按钮功能](./Button-functions#rf-log-action)。

## 救援行动

### 免责声明

我想澄清一下，我并非应急服务领域的专家；然而，这项特殊功能的开发旨在尽可能有效地满足一线救援人员的通信需求。我乐于接受专业人士的改进建议，但会在我的能力范围、可用时间和收发器技术性能允许的范围内进行调整。

### 概述

RescueOps 功能专为集成到面向急救人员（消防员等）的通信系统中而开发。它增加了受限的现场控制功能和增强的手电筒行为，手电筒可设置为固定、闪烁或 SOS 模式。`SetKey`菜单用于选择与`PTT`配合使用的启动键，以进入或退出 RescueOps 模式。默认按键为`MENU`，但也可以是 `UP`、`DOWN`、`EXIT`或`* SCAN`。

在官方的`v6.0.0`系列中，RescueOps包含在`FieldOps`和`Labs`中。AirCopy是由`Transfer`和`Labs`提供的独立功能；启用RescueOps本身并不会启用AirCopy。

### 用法

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi) 是“[意大利国家消防队（Corpo nazionale dei Vigili del fuoco）](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”的一员，他编写了专门介绍 RescueOps 功能的[文档](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki)。非常感谢他。

默认情况下，收发器的功能与其他固件版本一样，允许访问菜单（和隐藏菜单）、长按或 `F` 组合键，以直接从键盘激活各种功能（例如，开始扫描或调整发射功率），以及快捷方式。

但是，如果在按下 `PTT`和`SetKey` 菜单中配置的按键的同时打开收发器，它将切换到 RescueOps 模式，并触发以下更改：

* 菜单已锁定
* 长按和`F`组合键已禁用（`A/B`和键盘锁定除外）
* 已阻止在隐藏菜单模式下重启
* 该键盘只能用于更改内存通道，就像 `UP`和`DOWN` 键一样。

短按和长按`F1`和`F2`，以及长按`M`，均可用作快捷键。此配置由收发器设置负责人负责。如果不需要快捷键，可以将其设置为`NONE`。

请注意，救援行动功能提供了 2 个新操作：

* `POWER HIGH`，可让您根据需要快速临时切换到 `5 W` 的最大功率。
* `REMOVE OFFSET`，用于临时移除内存通道的偏移量（如果存在）。

这两项措施是应救援专业人员的要求而添加的，符合现场需求。

进入救援操作模式后，每次正常启动都会将收发器保持在此模式。要返回默认模式（可访问菜单和隐藏菜单），只需在启动时同时按下`PTT`和`SetKey`菜单中配置的按键即可。

## 游戏

此固件包含一个小型打砖块游戏。

* 在没有叠加应用的版本中，按 `F+7` 启动驻留游戏。
* 在 `Labs` 版本中，`F+7`打开 [overlay-app launcher](./Overlay-apps) ; 安装并选择`Breakout` 或其他游戏。
* 要退出，请按`EXIT`
* 您可以使用 `M` 暂停游戏
* 使用`4`或`UP`向左移动拨片，使用`0`或`DOWN`向右移动拨片。

这款游戏纯粹是为了娱乐，并无其他目的。其初衷很简单，就是探索全胜K5手机及其收音机功能所能实现的极限。你可以把它看作是对诺基亚3310时代的一种轻松致敬。

![游戏](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## UV Studio

[UV Studio](./UV-Studio) 是此固件的统一浏览器配套软件：

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

它提供基于浏览器的收音机查看、控制、维护和恢复工作流程：

* 实时 `128x64` 屏幕镜像
* 支持短按和长按的虚拟 UV-K1 和 UV-K5 键盘
* 兼容射频日志流、分析和 CSV 导出
* 从稳定版目录、滚动开发版本或本地文件刷写固件
* 多启动固件插槽和 Labs 叠加应用管理
* 校准备份和恢复
* 自定义启动徽标上传和下载
* 在 `v1.6.0` 中，仅限实验室使用的外部闪存备份/恢复和引导式工厂软件恢复

它使用 `Web Serial`，无需安装、服务器或帐户，即可在兼容的桌面浏览器中本地运行。

> [!IMPORTANT]
> 查看器按键控制不提供远程发射功能。UV Studio 无法启动传输，其屏幕上的 `PTT` 也无法传输。

有关版本状态、版本要求、无线电模式、安全信息和完整工作流程，请参阅 [UV Studio](./UV-Studio)。

## 恢复模式

您的收发器将以关机前的状态重新启动。因此，如果它之前处于频段扫描模式、收听调频广播或扫描模式，则下次启动时将自动恢复到该状态。

## 所有频段均已发送

### 警告

**此修改未经测试，仅供研究用途，旨在探索设备及其芯片组的功能。请勿在非法频率上进行传输。请务必使用假负载。本仓库的作者和贡献者对因误用此研究固件而造成的任何损害、诉讼或其他后果概不负责，也不承担任何责任。安装本仓库中的任何固件，即表示您接受由此可能产生的任何后果的全部责任，并放弃对作者提起法律诉讼的权利。**

此选项不允许您使用除 FM 以外的任何调制方式进行发射；这是硬件限制。切换到 AM 或 SSB 仅更改射频 IC 的音频输出模式，并不会将整个 IC 切换到 AM/SSB 模式。此功能仅用于收听。此外，此固件还内置了一个额外的锁定机制，当启用 AM 或 SSB 时，该机制会阻止发射。

举例说明为什么不应该将此用于实际通信，请考虑以下`27.254 MHz`处的发射功率图表：

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 微瓦**
* `54 MHz` -> 2.4 毫瓦
* `81 MHz` -> 230 毫瓦
* `109 MHz` -> 558 毫瓦
* `136 MHz` -> 412 毫瓦
* `163 MHz` -> 122 毫瓦
* `190 MHz` -> 14.8 毫瓦
* `218 MHz` -> 2 毫瓦
* `245 MHz` -> 2.6 毫瓦

鸣谢：[Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### 如何解锁所有频段的TX

1. 进入[隐藏菜单](./Menu#hidden-menu)
1. 进入菜单 `F Lock`
1. 选择选项 `UNLOCK ALL`
1. 重复步骤 2-3 **3 次**。请务必仔细操作。如果在操作过程中确认了任何其他选项，计数器将被重置，您将需要重新执行该步骤。

## 相关页面

* [入门指南](./Getting-started)
* [无线电操作](./Radio-operation)
* [扫描](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [信标](./Beacon)
* [AirCopy](./AirCopy)
* [菜单](./Menu)
* [UV Studio](./UV-Studio)
* [多重启动和多重配置](./Multiboot-and-Multiconfig)
* [叠加应用](./Overlay-apps)
* [按钮功能](./Button-functions)
* [故障排除](./Troubleshooting)
