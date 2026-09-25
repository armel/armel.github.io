> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/)。

# 关于此固件

此固件是 [F4HWN 自定义固件](https://github.com/armel/uv-k5-firmware-custom) 的一个分支。它扩展了最初为 UV-K5 V1（DP32G030 MCU）所做的工作，并将其适配到基于 PY32F071 MCU 的新型 UV-K1 和 UV-K5 V3。它是 [@muzkr](https://github.com/muzkr) 和 [@armel](https://github.com/armel) 共同努力的成果。非常感谢 [@mrkusypl](https://github.com/mrkusypl) 的宝贵帮助，以及所有为该项目做出贡献的人。

从`v6.0.0`开始，固件以四个官方版本发布，它们共享相同的核心，但针对不同的用途。`Fusion`是推荐的日常使用平衡版本；`FieldOps`增加了RescueOps、FoxHunt和Beacon功能；`Transfer`增加了AirCopy和Beam功能；`Labs`增加了实验性的叠加应用平台。

如果您刚开始使用此固件，建议依次阅读：[入门指南](./Getting-started)、[使用 CHIRP 编程](./Programming-with-CHIRP)（如果您通过计算机管理对讲机）、[对讲机操作](./Radio-operation)、[扫描](./Scanning)、[菜单](./Menu)，然后阅读[按钮功能](./Button-functions)。如果您更喜欢视频演示，请参阅[视频和教程](./Videos-and-tutorials)。

如果您是从早期版本升级，请参阅 [最近的更改](./Recent-changes) 以了解最新的稳定版本 `v6.1.0`的更改和早期版本`v6.0.0` 的亮点。

> [!WARNING]
> 此固件没有真正的智能系统。请使用您自己的智能系统。
> 使用此固件的风险完全由您自行承担。我们绝对不保证它能以任何方式在您的收音机上正常工作。它甚至可能导致您的收音机变砖，在这种情况下，您需要购买一台新的收音机。
>
> 警告完毕。
> 话虽如此，祝你玩得开心。

## 从这里开始

* 固件新用户：[入门指南](./Getting-started)
* 从早期 v5.x 版本升级：[最近更改](./Recent-changes)
* 推荐观看视频教程：[视频和教程](./Videos-and-tutorials)
* 想要查看或控制收音机、刷新固件、管理 Multiboot 或 Labs 应用、备份校准、检查射频活动，或使用 `v1.6.0` 恢复工具：[UV Studio](./UV-Studio)
* 想通过电脑对收音机进行编程：[使用 CHIRP 进行编程](./Programming-with-CHIRP)
* 想了解扫描：[扫描](./Scanning#memory-channels-scanning)
* 想了解状态栏：[无线电操作](./Radio-operation#status-bar)
* 想找到发射器：[FoxHunt](./Fox-Hunt)
* 想运行一个莫尔斯电码信标：[信标](./Beacon)
* 想要复制频道、设置或兼容的无线电数据：[AirCopy](./AirCopy)
* 希望在一台无线电设备上保留多个固件版本和不同的配置：[多重启动和多重配置](./Multiboot-and-Multiconfig)
* 想要安装实验性实验室应用：[叠加应用](./Overlay-apps)
* 想了解每个实验室应用程序的功能以及如何控制它们吗？[叠加应用程序](./Overlay-applications)
* 想探索更多专业功能：[高级功能](./Advanced-features)
* 查找隐藏设置：[菜单](./Menu#hidden-menu)
* 遇到问题：[故障排除](./Troubleshooting)

## 视频

您还可以使用 [F4HWN YouTube 频道](https://www.youtube.com/@f4hwn) 作为本维基的补充。

许多视频是法语的，但通常可以启用字幕，有些视频也可能提供英语配音。有关如何使用该频道的简要说明以及书面文档，请参阅[视频和教程](./Videos-and-tutorials)。

## 章节

* [入门指南](./Getting-started)
* [近期更改](./Recent-changes)
* [视频和教程](./Videos-and-tutorials)
* [UV Studio](./UV-Studio)
* [使用 CHIRP 进行编程](./Programming-with-CHIRP)
* [故障排除](./Troubleshooting)
* [无线电操作](./Radio-operation)
* [扫描](./Scanning)
* [菜单](./Menu)
* [按钮功能](./Button-functions)
* [高级功能](./Advanced-features)
* [FoxHunt](./Fox-Hunt)
* [信标](./Beacon)
* [AirCopy](./AirCopy)
* [多重启动和多重配置](./Multiboot-and-Multiconfig)
* [叠加应用](./Overlay-apps)
* [叠加应用](./Overlay-applications)
* [光谱分析仪](./Spectrum-analyzer)
* [FM广播收音机接收器](./FM-broadcast-radio-receiver)
