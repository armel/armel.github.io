> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Overlay-apps/)。

# 叠加应用

叠加应用是存储在外部闪存中的小型 `.app` 程序，仅在启动时加载到专用的 `4 KiB` RAM 工作区。它们让实验性的 `Labs` 版本能够添加工具、无线电模式、视觉演示和游戏，而无需将每个应用永久装入固件的内部闪存。

> [!WARNING]
> 叠加应用是一项实验性功能（`v6.0.0`）。目前，只有（`Labs`）版本包含应用加载器。应用与固件 ABI、API 级别、RAM 地址和可选的驻留功能相关联；如果无线电报告兼容性错误，请更新或重新安装应用。

## 平台工作原理

该无线电模块提供 `8`外部 Flash 应用插槽。每个插槽包含一个头部以及最多`4 KiB` 长度的应用代码。应用运行前，加载器会检查：

* 应用程序文件/头文件的格式和已提交状态
* 所需的 ABI 和最低 API 级别
* 代码大小和 RAM 链接地址
* 该应用程序所需的驻留固件功能
* 将代码加载到 RAM 后，对其进行 CRC-32 校验

安装、启动或删除应用程序时，内部固件 Flash 不会被重写。损坏或不兼容的应用程序会被干净利落地拒绝，而不会被执行。

当前目录包含 11 个应用程序：无线电工具，例如 `Broadcast FM`、`FoxHunt`、`Beacon`和`Beam`，以及 `Breakout`、`Tetris`、`Cube3D`、`Plasma`、`Snake`、`Rapid Roll`和`Space Impact`。有关已记录的应用程序及其控件，请参阅 [叠加应用程序](./Overlay-applications)。可用性取决于为所选固件版本分发的应用程序二进制文件以及编译到正在运行的 Labs 固件中的功能。

## 使用 UV Studio 安装应用程序

1. 使用 `Labs` 版本正常启动收音机。
1. 将其连接到支持 USB 数据连接的桌面浏览器。
1. 打开 [UV Studio](https://armel.github.io/uvstudio/) 并选择 `Apps`(`Labs only` )。
1. 从官方目录中选择固件版本和兼容的应用程序，或者选择本地 `.app` 文件。
1. 选择目标应用槽位。
1. 选择 `Install app` 并等待写入和验证完成。

UV Studio 可以刷新插槽表，显示每个应用程序的名称、版本、大小和状态，并且可以在不影响收音机其他部分的情况下删除应用程序。

在 UV Studio 和对讲机的 `F + 7` 启动器中，应用插槽编号为 `1` 到 `8`。

## 启动应用

1. 在普通收音机屏幕上，按`F`，然后按`7 VOX`。
1. 在 UV-K5 上使用 `UP`/`DOWN`，或在 UV-K1 上使用 `LEFT`/`RIGHT`，选择八个显示的插槽之一。活动布局如下 `SetNav`。
1. 按 `M` 运行所选应用程序。
1. 使用该应用程序显示的控件；在大多数应用程序中，`EXIT` 返回应用程序启动器或普通收音机屏幕。

启动器中仍会显示空槽位。选定的槽位和滚动位置会被记住，直到收音机重启。启动器和兼容的应用会在 UV Studio 中镜像显示。

某些应用还可以声明以下常规可编程操作之一：`FM RADIO`、`FOX HUNT`、`BEACON`或`BEAM`。当匹配的应用已安装且有效时，即可通过已分配的按键或侧键操作选择器直接启动该应用。如果多个已安装的应用声明了相同的操作，则使用编号最小的兼容插槽。

## 兼容性消息

| 无线电广播 | 含义/行动 |
| --- | --- |
| `UPDATE APP` | 应用格式、ABI、大小或链接地址过旧或不兼容；请安装匹配的应用版本 |
| `UPDATE FIRMWARE` | 该应用需要更新的应用 API；请更新 Labs 固件 |
| `REINSTALL APP`| 写入不完整或 CRC 校验码错误；请重新安装`.app` 文件 |
| `NOT SUPPORTED` | 该应用需要一种驻留功能，而此 Labs 版本不包含此功能 |
| `NO APP` | 所选插槽为空或没有有效的应用程序标头 |

应用程序退出后，加载程序会恢复选定的VFO、接收/双频守听调谐、背光处理和外部闪存缓存。修改受支持的共享数据（例如广播调频预设或Beam频道数据）的应用程序，会在覆盖代码停止运行后，请求驻留固件提交更改。

## 从源代码构建应用程序

开发者可以使用以下命令构建固件库中的应用程序：

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

生成的 `.app`文件放置在`build/Apps/` 目录中。每个应用程序都链接到固件配置的覆盖地址，并与其元数据和 CRC 校验码一起打包。当 ABI、API、所需功能或覆盖地址发生更改时，需要重新构建应用程序。

## 相关页面

* [叠加应用](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [多重启动和多重配置](./Multiboot-and-Multiconfig)
* [按钮功能](./Button-functions)
* [近期更改](./Recent-changes)
* [高级功能](./Advanced-features)
