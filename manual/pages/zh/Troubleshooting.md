> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Troubleshooting/)。

# 故障排除

本页汇总了维基百科其他部分已涵盖的最常见的“出了问题”情况，以便您可以快速找到正确的检查。

## 我可以接收，但无法发送

请先检查以下几点：

1. 确保 `Mode`设置为`FM` 。
1. 检查选定的`F Lock`方案。
1. 如果频率不在该计划范围内，请检查`TXLock`是否设置为`OFF`。
1. 在频道或 VFO 名称旁边查找小挂锁。

重要提示：

* `AM`和`USB` 仅供收听
* `UNLOCK ALL` 仍需额外解锁程序

另请参阅：[无线电操作](./Radio-operation#about-the-f-lock-and-txlock-menus)和[高级功能](./Advanced-features#tx-on-all-bands)。

## 我的自定义设置意外消失或更改了

请勿使用全盛CPS。它会覆盖自定义设置。

请使用每个固件版本提供的`CHIRP`驱动程序，或者使用其他兼容的编程工具。

另请参阅：[使用 CHIRP 进行编程](./Programming-with-CHIRP)、[入门](./Getting-started) 和 [无线电操作](./Radio-operation#basic-operation--configuration)。

## 我的自定义启动标志不显示

请检查以下几点：

1. 请确保您的固件版本包含徽标支持
1. 在收音机正常启动的情况下，使用 [UV Studio](./UV-Studio#boot-logo) 上传徽标
1. 打开菜单 `POnMsg`并选择`LOGO`
1. 更改设置后，请重新启动收音机

如果徽标看起来太暗、太亮或反转，请从 UV Studio 重新上传，并在将其写入收音机之前调整 `Threshold`或`Invert colors`。

## 我更改了内存通道设置，但更改没有保存。

某些通道特定的更改只会影响该内存通道的当前临时副本。

如果您更改了诸如 `Step`、`Power`之类的通道设置，或者其他通道参数，并且想要永久保留它，请使用`ChSave` 再次保存该通道，将更新后的设置写回该内存插槽。

否则，这种变化只是暂时的，当您切换频道、切换模式或重新启动收音机时，这种变化可能会消失。

另请参阅：[无线电操作](./Radio-operation#basic-operation--configuration)和[菜单](./Menu#main-menu)。

## 内存扫描未发现任何问题

请检查以下几点：

1. 请确保您在 `channel mode`中，而不是`frequency mode` 中。
1. 确保频道已通过 `ScList`或长按`5 NOAA` 分配到扫描列表。
1. 确保当前活动的扫描列表不为空。
1. 如有需要，可在扫描过程中切换到另一个有效的扫描列表。

固件支持`24`扫描列表和`ALL`扫描列表。如果请求的列表为空或无效，无线电将跳转到下一个有效的非空列表。

另请参阅：[扫描](./Scanning#memory-channels-scanning)和[按钮功能](./Button-functions#front-keypad)。

## 我无法调到我想收听的FM广播电台。

您可能只是使用了错误的调频广播频段。

在 FM 广播接收开启的情况下，长按 `1 BAND` 可在可用的 FM 频段之间循环切换：

* `87.5`至`108 MHz`
* `76`至`108 MHz`
* `76`至`90 MHz`
* `64`至`76 MHz`

当前选定的范围显示在 FM 屏幕的左下角，例如 `87.5-108M` 。

直接调谐、手动扫描、自动扫描和 FM 记忆功能仅在当前选定的范围内有效。

另请参阅：[FM广播收音机接收器](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)。

## 调频广播电台总是停止

这通常是预期行为。

在接收广播调频信号时，当前激活的VFO仍具有优先权。如果当前激活的VFO接收到信号，收音机会暂时切换回VFO接收模式，并在该信号接收结束后恢复到广播调频模式。

另请参阅：[FM广播收音机接收器](./FM-broadcast-radio-receiver)。

## AM接收声音听起来太刺耳、失真或太闷

尝试在收音机处于 `AM`模式时更改`SetRxA` 配置文件。

在`AM`、`SetRxA`和`RxA`之间的关键动作循环中：

* `SHARP`：更窄、更具选择性，邻道抑制性能更佳
* `STOCK`：最接近原厂固件的行为
* `OPEN`：更宽广、更开放，在弱信号下通常效果更好

如果在`SHARP`中听到的AM接收声音太刺耳，请尝试`STOCK`或`OPEN`。如果在`OPEN`中听到的声音太柔和或太宽，请尝试`SHARP`。

另请参阅：[菜单](./Menu#main-menu) 和 [按钮功能](./Button-functions#custom-button-functions) 。

## 当我打开监听器时，只能听到一些航空甚高频频道 `AM 8.33 kHz`

这通常不是灵敏度问题。通常是将`channel designator`（有时称为`channel number`或`published channel`）与工作频率混淆所致。

一些航空文件、网站或应用程序会发布 `channel designator`，这看起来像是一个普通的频率，但并非总是实际工作频率。专用的 8.33 版本航空甚高频 (VHF) 无线电会自动转换该频道标识符。此固件也会在您直接在无线电上输入值时进行校正，但 `CHIRP` 会将您输入的值存储为实际工作频率。

### 案例 1：巴黎-奥利机场

对于 **巴黎奥利机场 (LFPO)**，**SIA 文档** 确实发布了 **ATIS ORLY 126.505 (FR)**，英语服务为 **131.355 (EN)**。

**[ICAO 对照表](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** 显示，公布的 8.33 信道标识符 **126.505** 对应工作频率 **126.5000 MHz**。换句话说：

* **服务：** ATIS ORLY (FR)
* **频道标识符：** 126.505
* **工作频率：** 126.5000 MHz

重要区别：

* 如果您直接在收音机上输入`126.5050`，固件会将其校正为匹配的工作频率，即`126.5000 MHz`
* 如果在 `CHIRP`中输入`126.5050`，则该值将被存储并按原样使用，因此调谐误差仍然存在。

### 案例二：布鲁塞尔

在查阅的节目单中，**布鲁塞尔国家电视台 (EBBR)** 公布的 8.33 频道中，**布鲁塞尔地面（南）** 的频道号为 **121.880**。

**[ICAO 对照表](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** 显示，公布的 8.33 信道标识符 **121.880** 对应工作频率 **121.8750 MHz**。换句话说：

* **服务：** 布鲁塞尔地面站（南）
* **频道标识符：** 121.880
* **工作频率：** 121.8750 MHz

重要区别：

* 如果您直接在收音机上输入`121.8800`，固件会将其校正为匹配的工作频率，即`121.8750 MHz`
* 如果在 `CHIRP`中输入`121.8800`，则该值将原样存储和使用，因此调谐误差仍然存在。

简而言之，如果在 `CHIRP`中输入的频率是**频道标识符**而不是工作频率，则强制打开`AM 8.33 kHz` 中的监视器可能看起来恢复了接收，但真正的问题是，公布的频道标识符被解释为工作频率。

如果从频道标识符编程的服务仅在您打开 `AM 8.33 kHz`中的监视器时才可听见，请先尝试相应的运行频率，特别是当公布的值以`...005`、`...010`、`...255`、`...505`、`...755` 或类似的 8.33 风格的频道标识符结尾时。

参见：

[Ofcom：了解 8.33 kHz 频率和频道号](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879)。

别再责怪你的收音机或固件了。请观看我 YouTube 频道上的这段视频：
[航空频率和监控✈️：频道≠频率（这个错误会改变一切）！](https://www.youtube.com/watch?v=Dpf3QzkDdaQ)。

## 电池电量百分比或电压显示错误

请检查以下几点：

1. 检查时请确保收音机没有通过 `USB-C` 充电。
1. 使用 `BatTxt = VOLTAGE`或打开`SysInf`
1. 请确保 `BatTyp` 与您使用的电池组匹配。
1. 将显示的电压与万用表进行比较
1. 如有需要，请重新调整 `BatCal`

重要提醒：

* `BatCal` 影响电压读数
* `BatTyp` 会影响电池电量百分比估算

另请参阅：[无线电操作](./Radio-operation#battery-display-type-and-calibration)和[菜单](./Menu#hidden-menu)。

## 外置麦克风的PTT功能表现不同

这是某些硬件版本上的已知现象。

已记录的差异包括：

* TX可能会等到RX信号清晰后再进行传输。
* DTMF音调或1750 Hz音调可能会快速切断。

内部侧面`PTT`在已记录的案例中没有出现这些问题。

另请参阅：[按钮功能](./Button-functions#external-microphone)。

## 收音机突然进入睡眠模式

请查看以下菜单：

* `SetOff`：长时间不活动后的深度睡眠
* `BatSav`：正常运行期间的活动/睡眠比率

如果 `SetOff`不是`OFF`，则即使在扫描过程中，只要没有接收信号，收音机在不活动后也可以进入睡眠模式。

FoxHunt 和 Beacon 会故意忽略 `SetOff`。如果无线电在任一应用程序中保持唤醒状态，请在诊断不活动计时器之前，将其置于 `EXIT`状态。自`v6.0.0` 起，它们是独立的应用程序。

另请参阅：[无线电操作](./Radio-operation#about-the-setoff-menu)。

## 导航似乎朝着错误的方向移动。

如果菜单导航或某些控件似乎朝错误的方向移动，请先检查隐藏菜单项`SetNav`。

该固件无法可靠地自行检测其运行在 `UV-K1`还是`UV-K5` 上。因此，导航方式必须作为菜单设置公开。

`SetNav` 可让您在以下选项中选择：

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

这不会改变功能本身，只会改变固件使用的导航方式，因此也会改变收音机上控制按钮的读取方式。

另请参阅：[入门指南](./Getting-started#model-differences) 和 [菜单](./Menu#hidden-menu) 。

## 按钮没有达到我的预期效果

请考虑以下可能性：

1. 可启用键盘锁
1. `SetLck`也可能锁定可编程侧键 /`M Long` 操作、`PTT` 或两者。
1. RescueOps 模式会禁用大多数长按和 `F` 组合键。
1. `F+` 和长按操作之间存在一些差异
1. 按`F`后短按侧键可调整步长，而按`F`后长按该侧键可在当前v6版本中打开操作选择器。

另请参阅：[按钮功能](./Button-functions)，[FoxHunt](./Fox-Hunt)，[Beacon](./Beacon)，以及[高级功能](./Advanced-features#rescueops)。

## 理解功率和 SetPwr：单通道发射功率与全局发射功率

“功率”菜单用于设置当前通道或VFO的发射功率。可用值包括LOW1至LOW5、MID、HIGH和USER。因此，此设置会以通道为单位存储在本地。

“设置功率”菜单并不直接选择特定频道的功率，它仅定义分配给用户模式的实际功率级别，选项包括 LOW1 至 LOW5、MID 和 HIGH。此设置对整个收音机都是全局性的。

因此，所有功率设置设为 USER 的通道将自动使用 SetPwr 中当前定义的值。

该机制可以一次性更改设置为 USER 的多个通道的有效功率，而无需单独编辑每个通道。

## 接下来该去哪里？## 下一步该去哪里

* [入门指南](./Getting-started)
* [使用 CHIRP 进行编程](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [无线电操作](./Radio-operation)
* [扫描](./Scanning)
* [高级功能](./Advanced-features)
* [菜单](./Menu)
* [按钮功能](./Button-functions)
