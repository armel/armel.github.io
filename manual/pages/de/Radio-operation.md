# Funkbetrieb

Diese Seite behandelt den täglichen Betrieb des Transceivers: Umschalten zwischen VFO und Speichermodus, Lesen der Statusleiste, Verständnis von TX-Einschränkungen und Verwalten des Schlafverhaltens.

Für scanbezogene Funktionen siehe [Scannen](./Scanning). Für browserbasierte Live-Anzeige und Wartung siehe [UV Studio](./UV-Studio). Zum Radio-Radio-Kopieren siehe [AirCopy](./AirCopy). Für RescueOps, den Wiederaufnahmemodus, das eingebaute Spiel und das forschungsorientierte TX-Entsperrverfahren siehe [Erweiterte Funktionen](./Advanced-features).

> [!WARNING]
> Verwenden Sie kein Quansheng CPS. Es überschreibt benutzerdefinierte Einstellungen.

## Auf dieser Seite

* [Grundlegende Bedienung & Konfiguration](#basic-operation--configuration)
* [Statusleiste](#status-bar)
* [Anzeige, Typ und Kalibrierung der Batterie](#battery-display-type-and-calibration)
* [Über die `F Lock` und `TXLock` Menüs](#about-the-f-lock-and-txlock-menus)
* [Bildschirmschoner und Zeitlimit der Hintergrundbeleuchtung](#screen-saver-and-backlight-timeout)
* [Über das SetOff-Menü](#about-the-setoff-menu)
* [1750 Hz Ton Burst für Repeater-Zugriff](#1750-hz-tone-burst-for-repeater-access)
* [Verwandte Seiten](#related-pages)

> [!TIP]
> Allgemeine Schnellkontrollen:
> Quansheng CPS überschrieben benutzerdefinierte Einstellungen
> - die Frequenz liegt außerhalb des ausgewählten `F Lock`-Plans
> `TXLock` ist immer noch `ON`
> - `AM` oder `USB` wird anstelle von `FM` ausgewählt
>
> Siehe [Fehlerbehebung](./Troubleshooting) für die Kurzversion.

## Grundlegende Bedienung und Konfiguration

Das Radiodisplay wird in einen oberen VFO und einen unteren VFO aufgeteilt. Sie können die obere / untere Auswahl ändern, indem Sie `F` + `2 A/B` drücken (oder indem Sie `2 A/B` lang drücken).

Jeder VFO kann entweder im Frequenzmodus oder im Kanalmodus unabhängig arbeiten. Um die Modi zu wechseln, wählen Sie den gewünschten VFO und drücken Sie `F` + `3 VFO/MR` (oder lange `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

In `frequency mode` geben Sie die Frequenz manuell mit der Tastatur ein. Sie können auch verschiedene Optionen für diesen VFO im Menü ändern (die ersten 13 Menüeinträge). Sobald der VFO eingerichtet ist, können die Einstellungen in einem Speicherkanal gespeichert werden, indem Sie in das `ChSave`-Menü gehen und den Zielspeicherkanal auswählen.

In `channel mode` können Sie zwischen gespeicherten Speicherkanälen wechseln. Speicherkanäle können wie oben erwähnt manuell hinzugefügt oder von einem Computer aus programmiert werden, wobei der `CHIRP`-Treiber bei jeder Firmware-Version bereitgestellt wird. Siehe [Programmieren mit CHIRP](./Programming-with-CHIRP) für den dedizierten F4HWN-Workflow.

Für Frequenz-Scan, Speicher-Scan, `ScnRng` und DCS / CTCSS-Scan, siehe [Scannen](./Scanning).

## Statusleiste

Oben auf dem Bildschirm, in der ersten Zeile, befindet sich die Statusleiste. Es zeigt viele Informationen an. Hier einige Beispiele:

| Bildschirmfoto&nbsp;des&nbsp;Quansheng&nbsp;K5&nbsp;mit&nbsp;F4HWN-Firmware | Beschreibung |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR bedeutet, dass RxMode auf DUAL RX RESPOND eingestellt ist, OP bedeutet, dass PTT auf ONEPUSH gesetzt ist, das F-Symbol bedeutet, dass die `F`-Taste gedrückt wurde und Sie die Batteriespannung sehen. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS bedeutet, dass Power Save aktiviert ist, DW bedeutet, dass RxMode auf MAIN TX / DUAL RX eingestellt ist, VX bedeutet, dass VOX aktiviert ist, CL bedeutet, dass PTT auf CLASSIC eingestellt ist, das Sperrsymbol bedeutet, dass die Tastatur gesperrt ist, und Sie sehen die Batteriespannung. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS bedeutet, dass Power Save aktiviert ist, MO bedeutet, dass RxMode auf MAIN ONLY eingestellt ist, OP bedeutet, dass PTT auf ONEPUSH eingestellt ist, und Sie sehen den Batterieanteil. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO bedeutet, dass RxMode auf MAIN ONLY eingestellt ist, OP bedeutet, dass PTT auf ONEPUSH eingestellt ist, das Light-Symbol bedeutet, dass die manuelle Hintergrundbeleuchtung aktiviert ist und Sie den Batterieanteil sehen. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | Der RX-Timer auf der linken Seite zeigt an, wie lange es her ist, seit Sie ein Signal erhalten haben, OP bedeutet, dass PTT auf ONEPUSH eingestellt ist, das Lichtsymbol bedeutet, dass die manuelle Hintergrundbeleuchtung aktiviert ist und Sie den Batterieanteil sehen. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | Das kleine `PMR` in Reverse Video und `><` bedeutet, dass Sie derzeit die Liste `PMR` scannen, CL bedeutet, dass PTT auf CLASSIC eingestellt ist, das Lichtsymbol bedeutet, dass die manuelle Hintergrundbeleuchtung aktiviert ist und Sie den Batterieanteil sehen. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | Das `ALL`-Symbol und `><` bedeuten, dass Sie derzeit alle aufgeführten Kanäle scannen, OP bedeutet, dass PTT auf ONEPUSH eingestellt ist, das Light-Symbol bedeutet, dass die manuelle Hintergrundbeleuchtung aktiviert ist und Sie den Batterieanteil sehen. |

> [!NOTE]
> Über `RxMode` bedeutet `MO` NUR MAIN, `DW` bedeutet MAIN TX / DUAL RX, `DWR` bedeutet DUAL RX RESPOND und `XB` bedeutet CROSS BAND.

## Anzeige, Typ und Kalibrierung der Batterie

Die Firmware trennt drei verschiedene batteriebezogene Dinge:

* die gemessene Batteriespannung
* geschätzter Batterieanteil
* das Schlaf- / Stromsparverhalten

Batterieinformationen auf dem Bildschirm:

* `BatTxt` fügt `VOLTAGE` oder `PERCENT` zur Statusleiste hinzu oder versteckt sie mit `NONE`
* `SysInf` zeigt die korrigierte Batteriespannung, den geschätzten Batterieanteil und die Firmware-Version

Damit der Batterieprozentsatz sinnvoll ist, sind zwei versteckte Menüelemente wichtig:

* `BatCal` kalibriert die angezeigte Batteriespannung
* `BatTyp` wählt die Entladungskurve aus, die für die Schätzung des Batterieprozentsatzes verwendet wird

Wichtiger Unterschied:

* `BatCal` verändert den Spannungswert
* `BatTyp` ändert die `%`-Berechnung, nicht die gemessene Spannung selbst

Aktuelle `BatTyp`-Optionen sind:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Wie bei jeder spannungsbasierten Schätzung ist der Batterieanteil nur ungefähr. Es hängt vom gewählten Batterieprofil, dem Batteriezustand und der aktuellen Last ab.

### Kalibrierung der Batteriespannung mit einem Multimeter

1. Stellen Sie sicher, dass das Radio nicht über `USB-C` aufgeladen wird.
1. Lass das Radio für einen Moment im Leerlauf bleiben. Kalibrieren Sie nicht während der Übertragung.
1. Messen Sie die Batteriespannung mit einem Multimeter an den Batteriekontakten auf der Rückseite des Radios / Akkupacks.
1. Öffnen Sie das versteckte Menü und gehen Sie zu `BatCal`.
1. Stellen Sie `BatCal` so lange ein, bis die vom Radio angezeigte Spannung dem Multimeter so genau wie möglich entspricht.
1. Bestätigen Sie `M`.

> [!TIP]
> Wenn die Spannung korrekt ist, aber der Prozentsatz sich immer noch falsch anfühlt, ist `BatCal` wahrscheinlich in Ordnung und `BatTyp` ist die Einstellung, die überprüft werden soll.

## Über die `F Lock` und `TXLock` Menüs

In der Vergangenheit gab es einige Bandpläne im `F Lock`-Menü, um verschiedene Anfragen zu erfüllen: PMR 446, FRS / GMRS / MURS usw. Das Hinzufügen neuer `F Lock`-Optionen nahm jedoch immer viel Speicher in Anspruch: neue Optionen im `F Lock`-Menü, Speicherfrequenzen (für Spezialisten sind dies jedes Mal `uint32_t`, so dass sie sehr speicheraufwendig sind) usw.

Nun muss erkannt werden, dass es kompliziert, wenn nicht gar unmöglich war, Bandpläne anzubieten, die alle Erwartungen abdecken und erfüllen konnten. Es gibt zu viele Unterschiede zwischen den einzelnen Ländern. Darüber hinaus ist nichts für die Kombination mehrerer Frequenzpläne aus dem `F Lock`-Menü geplant. Zum Beispiel das Öffnen sowohl der PMR 446- als auch der LPD-Bänder. Zusammenfassend ist `F Lock` zu begrenzt und nicht skalierbar.

Hier ist die Lösung:

1. Wählen Sie den am besten geeigneten Bandplan aus dem `F Lock`-Menü. Wenn Sie beispielsweise ein Rufzeichen haben und in Europa leben, wählen Sie CE HAM. Wenn Sie kein Rufzeichen haben und nur eine SWL sind, wählen Sie DISABLE ALL, was sicherer ist.
1. Wenn Sie weiterhin auf einem Speicherkanal übertragen möchten, der durch den Bandplan nicht geöffnet ist, gehen Sie zum `TXLock`-Menü und wählen `OFF`. Dies schafft eine Ausnahme und ermöglicht die Übertragung auf diesem Kanal.

Kurz gesagt:

* Wenn sich die Frequenz innerhalb des in `F Lock` ausgewählten Bandplans befindet, können Sie
* wenn die Frequenz außerhalb des in `F Lock` ausgewählten Bandplans liegt:
  * Sie können nur übertragen, wenn `TXLock` `OFF` ist
  * Sie können nicht übertragen, wenn `TXLock` `ON` ist

Wenn sich ein Speicherkanal oder VFO außerhalb des ausgewählten Bandplans befindet und `TXLock` `ON` ist, befindet sich links vom Namen ein kleines Vorhängeschloss.

Für das forschungsorientierte `UNLOCK ALL`-Verfahren siehe [Erweiterte Funktionen](./Advanced-features#tx-on-all-bands).

## Bildschirmschoner und Backlight Timeout

Builds mit Bildschirmschoner-Unterstützung fügen das `SetSav`-Menü hinzu.

`SetSav` arbeitet mit `BLTime` zusammen: Wenn das Radio im Leerlauf ist und die Hintergrundbeleuchtung abläuft, kann der Bildschirmschoner den normalen Bildschirm ersetzen, anstatt das Display einfach unverändert zu lassen.

Verfügbare Modi sind:

* `OFF`: Kein Bildschirmschoner
* `LOGO`: Zeigen Sie das benutzerdefinierte Boot-Logo als Leerlaufbildschirm
* `LOGO+`: Zeigen Sie das benutzerdefinierte Boot-Logo mit einem Scrollen-Effekt
* `MATRIX`: Zeigen Sie einen matrixartigen animierten Leerlaufbildschirm

Die Logomodi verwenden das gleiche `128x64`-Logo, das mit [UV Studio](./UV-Studio#boot-logo) hochgeladen wurde.

Der Bildschirmschoner wird absichtlich während der aktiven Funkarbeit ausgesetzt: RX, TX, PTT, BEAM und aktives FM-Scannen. Es kann auf dem Hauptradiobildschirm und dem UKW-Broadcast-Bildschirm angezeigt werden, wenn das Radio im Leerlauf ist. Das Drücken einer Taste weckt den normalen Bildschirm.

Wenn `BLTime` anstelle einer Zeitdauer auf einen Always-Off- oder Always-On-Style-Wert eingestellt ist, übernimmt `SetSav` das Display nicht.

## Über das SetOff-Menü

Mit dem `SetOff`-Menü können Sie ein Timeout konfigurieren, bevor Ihr Radio in den Schlafmodus wechselt. Diese Verzögerung kann zwischen 1 Minute und 2 Stunden eingestellt werden. Wenn `SetOff` `OFF` ist, ist der Schlafmodus deaktiviert.

Zum Beispiel, wenn Sie die Verzögerung auf 5 Minuten einstellen und während dieser Zeit gibt es:

* kein Empfang
* keine Übertragung
* kein Knopfdruck

dann wird Ihr Radio automatisch in den Schlafmodus wechseln. Sie werden 10 Sekunden vorher mit einem blinkenden Bildschirm benachrichtigt.

Beachten Sie, dass der Schlafmodus auch beim Scannen aktiviert wird, solange kein Empfang erfolgt.

FoxHunt und Beacon sind bewusste Ausnahmen: Während beide Anwendungen aktiv sind, ignoriert das Radio `SetOff`, bis Sie es explizit verlassen. Der normale Backlight-Timeout funktioniert immer noch. Siehe [FoxHunt](./Fox-Hunt) und [Beacon](./Beacon).

Einmal im Schlafmodus:

* Der Bildschirm ist komplett ausgeschaltet
* die rote LED an der Basis der Antenne blinkt
* Das BK4819-Modul geht in den Tiefschlafmodus und wacht regelmäßig auf:
  * 2 Sekunden, wenn `BatSav` auf `1:1` gesetzt ist
  * 4 Sekunden, wenn `BatSav` auf `1:2` gesetzt ist
  * 6 Sekunden, wenn `BatSav` auf `1:3` eingestellt ist
  * 8 Sekunden, wenn `BatSav` auf `1:4` eingestellt ist
  * 10 Sekunden, wenn `BatSav` auf `1:5` eingestellt ist

Um den Schlafmodus zu beenden, müssen Sie nur:

* Empfangen eines Signals während der periodischen Aufwachphase BK4819
* Initiieren einer Übertragung durch Drücken der PTT-Taste
* oder einen anderen Knopf drücken

Als Beispiel habe ich den Schlafmodus auf zwei K5(8)-Funkgeräten mit kalibrierten und voll aufgeladenen Batterien getestet, wobei die gleichen Einstellungen, Frequenzen, der Modus (`DWR`) und `BatSav` auf `1:5` eingestellt waren. Der einzige Unterschied war, dass ein Radio den Schlafmodus aktiviert hatte, während das andere nicht. Nach 36 Betriebsstunden hatte das Radio ohne Schlafmodus nur noch 20% Batterie übrig, während das mit Schlafmodus noch 60% Batterie hatte.

## 1750 Hz Tonburst für Repeater-Zugriff

Wenn `PTT` gedrückt wird, kann der 1750 Hz-Ton durch Drücken von [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3) aktiviert werden.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programmierung mit CHIRP](./Programming-with-CHIRP)
* [Scannen](./Scanning)
* [Menü](./Menu)
* [Tastenfunktionen](./Button-functions)
* [Erweiterte Funktionen](./Advanced-features)
* [Fehlerbehebung](./Troubleshooting)
