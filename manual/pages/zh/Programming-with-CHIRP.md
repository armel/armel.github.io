> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Programming-with-CHIRP/)。

# 使用 CHIRP 进行编程

本页解释了如何将 `CHIRP` 与每个固件版本附带的专用驱动程序一起使用。

> [!WARNING]
> 使用与收音机上安装的固件版本相同的 `CHIRP` 驱动程序。
> 请勿使用全盛CPS。
> 请勿使用通用的 `UV-K5` 驱动程序或来自其他固件版本的驱动程序。

## 兼容性

专用驱动程序 `v6.1.0`支持所有官方`v6.1.0` 版本：

* `UV-K1`
* `UV-K5 V3`
* `Fusion`、`FieldOps`、`Transfer`和`Labs`

它不适用于：

* `UV-K5 V1 / V2`
* 其他泉生型号
* 无关的固件系列

由于此固件使用其自身的内存和设置布局，其他驱动程序可能会读取或写入错误的数据。即使在官方版本之间切换，也务必确保驱动程序版本与固件版本匹配。

不要认为旧款 `v6.0.0`驱动器与`v6.1.0` 驱动器可以互换。

## 开始之前

* 确保电台运行的是匹配的 F4HWN 版本
* 在该发行包中找到包含的驱动程序文件
* 在编辑任何内容之前，请务必保存收音机图像的备份。

> [!NOTE]
> `CHIRP` 可能将此驱动程序显示为实验性驱动程序。这是预期行为。

## 升级到 v6.1.0

从早期固件版本更新之前：

1. 下载与当前已安装固件匹配的无线电驱动程序。
1. 保存该图像，并可选择将内存通道导出为 CSV 文件。
1. 使用 [UV Studio](./UV-Studio#calibration) 备份无线电校准。
1. 刷写所选的 `v6.1.0` 版本。
1. 如果要迁移的版本需要，请进入隐藏菜单并执行`RESET ALL`。
1. 加载专用的`v6.1.0` CHIRP 驱动程序，并从更新后的收音机下载新的映像。
1. 将旧频道复制粘贴到新镜像中，然后上传。

> [!WARNING]
> 请勿直接将旧的 CSV 文件导入到全新的电台镜像中。请将频道行复制粘贴到新下载的镜像中，以确保新版本的设置布局保持不变。

## 在 CHIRP 中加载专用驱动程序

1. 打开 `CHIRP` 。
2. 如果 `File > Load Module...`不可用，请先启用 CHIRP`Help > Developer Mode`功能（帮助菜单），然后重新启动`CHIRP` 。

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. 使用 `File > Load Module...`并选择固件版本中包含的`f4hwn.fusion.chirp...py` 文件。
4. 模块加载完成后，`CHIRP`应提供`UV-K1 & UV-K5 V3 (F4HWN Fusion)` 模型条目。

> [!NOTE]
> 模块文件名和 CHIRP 型号标签保留了历史名称 `Fusion`。然而，`v6.1.0` 模块是所有四个官方版本共享的驱动程序。

## 从广播电台下载

1. 打开收音机。
1. 将收音机与兼容的`USB-C`电缆或兼容的双插孔编程电缆连接到`mic/spkr`连接器上。
1. 确保连接器已牢固插入。
1. 在 `CHIRP`中，选择`Radio > Download From Radio...`
1. 选择正确的串口。
1. 选择 `Vendor`:`Quansheng` 。
1. 选择 `Model`:`UV-K1 & UV-K5 V3 (F4HWN Fusion)` 。
1. 开始下载，并等待收音机图像完全读取完毕。

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> 如果通信失败，请断开电缆，先打开收音机，然后再重新连接电缆。专用驱动程序警告说，如果在连接电缆的情况下打开收音机，某些设置可能会失败。

## 显示额外字段

下载完成后，在 `CHIRP`中启用`View > Show Extra Fields`（查看菜单）。

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

这一点很重要，因为专用驱动程序通过 `Extra`组公开了几个特定于通道的字段。如果没有`Show Extra Fields`，一些特定于固件的参数在通道编辑器中仍会隐藏。

典型例子包括：

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## 编辑和上传

然后您可以编辑记忆、名称和支持的设置。

准备好了就行：

1. 检查你的更改。
1. 在 `CHIRP`中，选择`Radio > Upload To Radio...`
1. 使用相同的端口、供应商和型号。
1. 上传完全完成后再触摸电缆或关闭收音机。

> [!WARNING]
> 除非你完全了解校准相关或高级项目的作用，否则不要随意操作。

## 信标识别

独立的信标应用程序使用 CHIRP `Message Line 1`设置作为其呼号。专用驱动程序在此字段中最多可接受`12 characters`。

当信标以`CALL`模式传输时，固件会将字母转换为大写，保留字母、数字和`/`，删除不支持的字符，并附加` MOE`。如果生成的呼号为空，则传输`MOE`。

更改 `Message Line 1` 后，请在启动 Beacon 之前将设置上传到无线电。有关传输行为和安全信息，请参阅 [Beacon](./Beacon)。

## 良好做法

* 始终使用同一固件版本附带的驱动程序
* 务必先下载，然后再保存备份。
* 固件更新后，请重新加载该版本中的新驱动程序模块。
* 请使用`CHIRP`进行批量编程，而非全盛CPS。

## 如果发现有什么不对劲

请检查以下几点：

1. 这台收音机实际上是`UV-K1`或`UV-K5 V3`
1. 该收音机运行的是预期的 F4HWN 版本和版本。
1. `CHIRP`从同一版本加载了驱动程序，而不是另一个`UV-K5` 模块。
1. 电缆已完全插入
1. 选择的串口是正确的。

## 相关页面

* [入门指南](./Getting-started)
* [无线电操作](./Radio-operation)
* [信标](./Beacon)
* [故障排除](./Troubleshooting)
