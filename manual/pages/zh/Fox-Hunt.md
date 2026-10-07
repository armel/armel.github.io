> 🌐 **翻译**  
> 可通过 Google 翻译进行自动翻译：[打开翻译版本](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Fox-Hunt/)。

# 猎狐

FoxHunt 是一款仅用于接收信号的业余无线电测向 (ARDF) 应用。它通过显示校准后的 `dBm`、S 表、峰值、最小值、趋势和近期信号历史记录，帮助操作员接近隐藏的发射机。

由于`v6.0.0`，FoxHunt 和 [Beacon](./Beacon) 是独立的应用程序和独立的程序操作。FoxHunt 不会发送信号，也不会切换到 Beacon 模式。

FoxHunt 内置于 `FieldOps`版本中。在`Labs`版本中，使用 [UV Studio](./UV-Studio#apps-labs) 安装`FoxHunt` 叠加应用。`FOX HUNT` 快捷方式会启动内置应用程序或相应的已安装叠加应用，具体取决于版本。

## 开始猎狐

将 `FOX HUNT`分配给`F1Shrt`、`F1Long`、`F2Shrt`、`F2Long`或`M Long`，然后在要监听的 VFO 上触发该快捷键。在 Labs 中，您还可以从 `F + 7`应用程序选择器启动`FoxHunt`。

> [!NOTE]
> 导航在 UV-K5 上使用 `UP`/`DOWN`，在 UV-K1 上使用 `LEFT`/`RIGHT`。活动布局遵循 `SetNav`。

## 显示和控制

信号刻度范围从`S0`到`S9+40`。主仪表可以显示13级阶梯图或大约18秒的滚动历史记录。趋势图将当前信号与大约一秒前测量的水平进行比较。

![FoxHunt 信号强度屏幕](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| 控制 | 操作 |
| --- | --- |
| `1` | 切换楼梯和信号历史记录显示 |
| `2` | 循环静音、盖革式蜂鸣声和接收站音频 |
| `3`| 循环`ATT 0`、`ATT 6`、`ATT 15`、`ATT 27`、`BYP`和`BYP+` |
| 导航键 | 直接增加或减少衰减 |
| 如果选择 `F`，则选择 `2`或`3` | 将相应的设置向后调整 |
| `M` | 重置峰值、最低值和趋势参考值 |
| 按住`F`约0.5秒 | 锁定或解锁FoxHunt控制 |
| `EXIT` | 退出 FoxHunt |

锁定后，只有衰减导航键和再次长按`F`仍然可用。

## 辨别方向的技巧

* 随着信号变强，增加衰减，使仪表远离满量程。
* 在每次比较或身体扫描之前，使用 `M` 重置参考值。
* 将收音机贴在胸前并缓慢旋转；你的身体通常会在远离发射器的方向上产生有效的最小信号。
* 使用峰值（`PK`）和最小值（`MN`）来比较一个完整的旋转。
* 在沿方位行走时，利用历史图表查看信号谷值和趋势指标。

`BYP`和`BYP+`是近距离增益设置，并非硬件旁路。显示的绝对值`dBm` 会随增益步长而变化，因此请保持在同一步长下比较读数。

## 已保存的设置

FoxHunt 会保存其衰减、指示器和音频模式。这些设置在下次启动时会恢复，并包含在 AirCopy `Settings` 传输中。临时应用程序锁定不会被保存。

## 相关页面

* [信标](./Beacon)
* [按钮功能](./Button-functions#fox-hunt-action)
* [叠加应用](./Overlay-apps)
* [叠加应用](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [高级功能](./Advanced-features)
