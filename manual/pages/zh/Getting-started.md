> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Getting-started/)。

# 入门

本页面是为固件初次使用者提供的快速入门指南。它不能替代完整的文档，但可以帮助您更快地找到所需页面并避免最常见的错误。

## 前5分钟

如果您只想设置一个频率，请测试收音机并保存：

1. 使用 `F`+`2 A/B` 选择激活的 VFO。
1. 将 VFO 切换至 `frequency mode`，同时使用 `F`+`3 VFO/MR`。
1. 使用键盘输入频率。
1. 使用 `M`打开菜单，选择`Channels`（或 `All`），并调整所需的基本项目（`Step`、`Power`、色调、偏移、带宽、`Mode`、`TXLock`）。
1. 如果要将设置保留为记忆通道，请使用 `ChSave` 保存设置。
1. 当您想要浏览已保存的频道时，请切换回 `channel mode`和`F`+`3 VFO/MR`。

如果您需要通过浏览器查看或控制收音机、检查射频活动、刷新固件、备份校准或上传自定义启动徽标，请使用 [UV Studio](./UV-Studio)。如果您更喜欢通过计算机对存储器进行编程，请使用每个固件版本随附的专用驱动程序 `CHIRP`。有关完整的工作流程，请参阅 [使用 CHIRP 进行编程](./Programming-with-CHIRP)。

如果您已经了解固件，请参阅 [最近的更改](./Recent-changes) 以了解最新的稳定版本 `v6.1.0`的更改和之前的`v6.0.0` 的亮点。

> [!WARNING]
> 请勿使用全盛CPS。它会覆盖自定义设置。

## 选择版本

最新稳定版`v6.1.0`共有四个官方版本：

| 版本 | 最适合 | 附加功能 |
| --- | --- | --- |
| `Fusion` | 大多数用户和日常操作 | 均衡的参考功能集 |
| `FieldOps` | 现场和急救人员使用 | RescueOps、常驻 FoxHunt、常驻 Beacon |
| `Transfer` | 无线电模块间数据复制 | AirCopy 和驻留光束 |
| `Labs` | 实验 | RescueOps、AirCopy 和可安装的叠加应用程序 |

FoxHunt 和 Beacon 自 `v6.0.0` 起成为独立的应用程序。在 FieldOps 中，它们是驻留的；在 Labs 中，它们作为叠加应用单独安装和启动。

对于大多数用户来说，从 Fusion 版本开始，只有在需要其额外功能时才选择专业版本。Multiboot 功能允许您在同一台收音机上保存多个版本和独立的配置。

## 常见任务

### 开始扫描频率

1. 将 VFO 切换到 `frequency mode` 。
1. 设置起始频率。
1. 使用菜单`Step`设置频率步长。
1. 长按 `* SCAN` 。

对于有限的扫描范围，将下限和上限加载到两个 VFO 中，长按 `5 NOAA`以启用`ScnRng`，然后长按 `* SCAN`。

有关完整的扫描行为、扫描列表、优先级扫描和 DCS / CTCSS 扫描，请参阅 [扫描](./Scanning) 。

### 开始扫描存储通道

1. 切换到`channel mode`。
1. 使用菜单 `ScList`或长按`5 NOAA` 将频道分配给扫描列表。
1. 长按 `* SCAN` 。

当前 `v6.1.0`固件支持`24` 扫描列表、`ALL`以及可配置的`MIX` 模式，该模式可同时扫描多个选定的列表。

有关完整的扫描列表行为，请参阅 [扫描](./Scanning)。

### 如果您无法传输

请先检查以下项目：

1. 确保`Mode`是`FM`，而不是`AM`或`USB`。
1. 检查频率是否在所选的`F Lock`计划内。
1. 如果频率不在选定的频段计划内，请检查`TXLock`是否设置为`OFF`。
1. 在频道或 VFO 名称旁边查找小挂锁。

如果这仍然无法解释，请参阅[故障排除](./Troubleshooting)。

### 节省电池电量

需要了解的两个主要菜单是：

* `BatSav` 用于正常运行期间的活动/睡眠比率
* `SetOff` 有助于在一段时间不活动后进入深度睡眠

有关电池显示、电池类型和校准，请参阅[无线电操作](./Radio-operation#battery-display-type-and-calibration)；有关睡眠模式的详细行为，请参阅[无线电操作](./Radio-operation#about-the-setoff-menu)。

## 模型差异

此固件针对`UV-K1`和`UV-K5 V3`。

文档中最明显的日常差异在于导航：

* `UV-K5`：导航通常用 `UP`/`DOWN` 描述
* `UV-K1`：导航通常用 `LEFT`/`RIGHT` 表示

隐藏菜单选项`SetNav`控制此导航样式。

有些截图和示例首先使用了 UV-K5 的术语，但 UV-K1 通常也具有相同的功能，并配有相应的导航键。

## 核心概念

这些术语在维基百科中反复出现：

* `VFO mode`：您可以直接输入频率，并在保存前调整实时设置。
* `Channel mode`/`memory mode`：您可以浏览已保存的内存通道
* `Main VFO`：激活的上部或下部线条，由 `►` 标记
* `Menu category`：Fusion `v5.9.0` 中引入的分类一级菜单，并被当前 v6 版本使用；`All` 恢复了原始的扁平化顺序和全局编号。
* `F Lock`：主发射频段方案
* `TXLock`：当频率超出所选 `F Lock` 方案时，每个通道额外授予一次发射许可
* `Scan list`：`24`内存扫描组之一，或`ALL`
* `MIX`：一种 `v6.1.0`扫描模式，它将已保存的列表`01`到`24` 的选择组合在一起
* `ScnRng`：仅在当前加载到两个VFO中的频率之间进行扫描
* `SetOff`：深度睡眠前的非活动超时
* `POnMsg`：启动显示模式，包括可选的自定义启动徽标
* `Multiboot`：将 `Main` 以及另外四个与 v6 兼容的固件映像保存在外部闪存中
* `Config bank`：默认情况下与多重启动插槽配对的隔离通道/设置配置文件
* `SetCfg`：在不更改运行固件插槽的情况下更改配置库
* `Overlay app`：一个仅供实验室使用的小型程序，`.app` 在启动时从外部闪存加载到 RAM 中
* `MO`、`DW`、`DWR`、`XB`和`RxMode` 是状态栏中显示的缩写

## 接下来该去哪里？## 下一步该去哪里

* [无线电操作](./Radio-operation) 用于 VFO/频道使用、状态栏、`F Lock`、`TXLock` 和睡眠行为
* [近期变更](./Recent-changes) 指近期版本中用户可见的主要变更
* [UV Studio](./UV-Studio) 用于实时查看、射频活动、固件刷新、多启动插槽、实验室应用程序、校准、启动徽标以及 `v1.6.0` 外部闪存恢复工具
* [固件插槽的多启动和多配置](./Multiboot-and-Multiconfig)、启动选择器、配置库和 `SetCfg`
* [用于安装和启动实验性实验室应用的叠加应用](./Overlay-apps)
* [使用 CHIRP](./Programming-with-CHIRP) 进行编程，该软件适用于计算机编程，每个版本都包含专用驱动程序
* [正在扫描](./Scanning) 以进行频率扫描、内存扫描、`ScnRng` 和 DCS / CTCSS 扫描
* [菜单](./Menu) 适用于所有菜单项和隐藏菜单
* [按钮功能](./Button-functions) 用于快捷键、长按和可编程按键
* [FoxHunt](./Fox-Hunt) 用于接收信号强度辅助测向
* [独立周期性莫尔斯电码发射器的信标](./Beacon)
* [AirCopy](./AirCopy) 用于收音机之间的内存/设置传输以及 `v6.1.0` 的改进
* [救援行动、恢复模式、内置游戏和全频段发射研究功能的高级功能](./Advanced-features)
* [光谱分析仪](./Spectrum-analyzer) 用于带状示波器式扫描
* [FM广播收音机接收器](./FM-broadcast-radio-receiver)，用于FM广播功能
* [故障排除](./Troubleshooting) 常见问题及快速检查
