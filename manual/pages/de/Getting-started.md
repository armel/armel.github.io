# Beginnen Sie

Diese Seite ist eine schnelle Orientierungshilfe für erstmalige Benutzer der Firmware. Es ersetzt nicht die vollständige Dokumentation, aber es sollte Ihnen helfen, die richtige Seite schneller zu finden und die häufigsten Fehler zu vermeiden.

## Erste 5 Minuten

Wenn Sie nur eine Frequenz programmieren möchten, testen Sie das Radio und speichern Sie es:

1. Wählen Sie den aktiven VFO mit `F` + `2 A/B`.
1. Wechseln Sie diesen VFO zu `frequency mode` mit `F` + `3 VFO/MR`.
1. Geben Sie eine Frequenz mit der Tastatur ein.
1. Öffnen Sie das Menü mit `M`, wählen Sie `Channels` (oder `All`) und passen Sie die grundlegenden Elemente an, die Sie benötigen (`Step`, `Power`, Töne, Offset, Bandbreite, `Mode`, `TXLock`).
1. Speichern Sie das Setup mit `ChSave`, wenn Sie es als Speicherkanal beibehalten möchten.
1. Wechseln Sie mit `F` + `3 VFO/MR` zurück zu `channel mode`, wenn Sie gespeicherte Kanäle durchsuchen möchten.

Wenn Sie das Radio von einem Browser aus anzeigen oder steuern, die RF-Aktivität überprüfen, Firmware flashen, die Kalibrierung sichern oder ein benutzerdefiniertes Boot-Logo hochladen müssen, verwenden Sie [UV Studio](./UV-Studio). Wenn Sie Programmierspeicher von einem Computer bevorzugen, verwenden Sie den dedizierten `CHIRP`-Treiber, der bei jeder Firmware-Version bereitgestellt wird. Siehe [Programmieren mit CHIRP](./Programming-with-CHIRP) für den kompletten Workflow.

Wenn Sie die Firmware bereits kennen, lesen Sie [Aktuelle Änderungen](./Recent-changes) für die neuesten stabilen `v6.1.0`-Änderungen und die früheren `v6.0.0`-Highlights.

> [!WARNING]
> Verwenden Sie kein Quansheng CPS. Es überschreibt benutzerdefinierte Einstellungen.

## Wählen Sie eine Edition

Die neueste stabile `v6.1.0`-Version hat vier offizielle Editionen:

| Edition | Am besten für | Zusätzliche Fähigkeiten |
| --- | --- | --- |
| `Fusion` | Die meisten Benutzer und der tägliche Betrieb | ausgewogenes Bezugsmerkmal |
| `FieldOps` | Feld- und Ersthelfernutzung | RescueOps, ansässig FoxHunt, ansässig Beacon |
| `Transfer` | Kopieren von Daten zwischen Funkgeräten | AirCopy und Resident Beam |
| `Labs` | Versuche | RescueOps, AirCopy und installierbare Overlay-Apps |

FoxHunt und Beacon sind seit `v6.0.0` unabhängige Anwendungen. In FieldOps sind sie resident; in Labs werden sie separat als Overlay-Apps installiert und gestartet.

Beginnen Sie für die meisten Benutzer mit Fusion und wählen Sie eine spezielle Edition nur, wenn Sie zusätzliche Funktionen benötigen. Mit Multiboot können Sie mehrere Editionen und isolierte Konfigurationen im selben Radio aufbewahren.

## Gemeinsame Aufgaben

### Beginn der Abtastfrequenzen

1. Wechseln Sie einen VFO zu `frequency mode`.
1. Legen Sie die Startfrequenz fest.
1. Stellen Sie den Frequenzschritt mit dem Menü `Step` ein.
1. Langpresse `* SCAN`.

Für einen begrenzten Scanbereich laden Sie die unteren und oberen Grenzen in die beiden VFOs, lange `5 NOAA` drücken, um `ScnRng` zu aktivieren, dann lange `* SCAN` drücken.

Für das vollständige Scanverhalten, Scanlisten, Prioritätsscan und DCS / CTCSS-Scan siehe [Scannen](./Scanning).

### Starten des Scannens von Speicherkanälen

1. Wechseln Sie zu `channel mode`.
1. Weisen Sie Kanäle einer Scanliste mit dem Menü `ScList` oder durch langes Drücken von `5 NOAA` zu.
1. Langpresse `* SCAN`.

Die aktuelle `v6.1.0`-Firmware unterstützt `24`-Scanlisten, `ALL` und einen konfigurierbaren `MIX`-Modus, der mehrere ausgewählte Listen zusammen scannt.

Siehe [Scannen](./Scanning) für das vollständige Scanlistenverhalten.

### Wenn Sie nicht senden können

Überprüfen Sie diese Elemente zuerst:

1. Stellen Sie sicher, dass `Mode` `FM` ist und nicht `AM` oder `USB`.
1. Überprüfen Sie, ob sich die Frequenz im ausgewählten `F Lock`-Plan befindet.
1. Wenn die Frequenz außerhalb des ausgewählten Bandplans liegt, prüfen Sie, ob `TXLock` auf `OFF` eingestellt ist.
1. Suchen Sie nach einem kleinen Vorhängeschloss neben dem Kanal oder VFO-Namen.

Wenn das immer noch nicht erklärt, siehe [Fehlerbehebung](./Troubleshooting).

### Speichern Sie Batterie

Die beiden wichtigsten Menüs zu wissen sind:

* `BatSav` für das Verhältnis Aktiv/Schlaf im Normalbetrieb
* `SetOff` für tiefen Schlaf nach einer Periode der Inaktivität

Siehe [Radiobetrieb](./Radio-operation#battery-display-type-and-calibration) für Batterieanzeige, Batterietyp und Kalibrierung und [Radiobetrieb](./Radio-operation#about-the-setoff-menu) für das detaillierte Verhalten des Schlafmodus.

## Modellunterschiede

Diese Firmware zielt auf `UV-K1` und `UV-K5 V3` ab.

Der sichtbarste Unterschied in der täglichen Dokumentation ist die Navigation:

* `UV-K5`: Navigation wird normalerweise mit `UP` / `DOWN` beschrieben
* `UV-K1`: Navigation wird normalerweise mit `LEFT` / `RIGHT` beschrieben

Die Hidden-Menü-Option `SetNav` steuert diesen Navigationsstil.

Einige Screenshots und Beispiele verwenden zuerst die UV-K5-Terminologie, aber die gleiche Funktion existiert normalerweise auf UV-K1 mit den entsprechenden Navigationsschlüsseln.

## Kernkonzepte

Diese Begriffe erscheinen im gesamten Wiki:

* `VFO mode`: Sie geben Frequenzen direkt ein und passen die Live-Einstellungen an, bevor Sie sie speichern
* `Channel mode` / `memory mode`: Sie durchsuchen gespeicherte Speicherkanäle
* `Main VFO`: die aktive obere oder untere Linie, gekennzeichnet durch `►`
* `Menu category`: die kategorisierte erste Menüebene, die in Fusion `v5.9.0` eingeführt und von den aktuellen v6-Editionen verwendet wird; `All` stellt die ursprüngliche flache Reihenfolge und globale Nummerierung wieder her
* `F Lock`: der Haupt-TX-Band-Plan
* `TXLock`: eine zusätzliche TX-Berechtigung pro Kanal, wenn eine Frequenz außerhalb des ausgewählten `F Lock`-Plans liegt
* `Scan list`: eine der `24` Memory-Scan-Gruppen oder `ALL`
* `MIX`: ein `v6.1.0`-Scan-Modus, der eine gespeicherte Auswahl von Listen `01` bis `24` kombiniert
* `ScnRng`: Scans nur zwischen den Frequenzen, die derzeit in die beiden VFOs geladen werden
* `SetOff`: Inaktivität Timeout vor dem Tiefschlaf
* `POnMsg`: Startanzeigemodus, einschließlich des optionalen benutzerdefinierten Boot-Logos
* `Multiboot`: hält `Main` plus vier zusätzliche v6-kompatible Firmware-Images in externen Flash
* `Config bank`: das isolierte Kanal-/Einstellungsprofil, das standardmäßig mit einem Multiboot-Slot gepaart ist
* `SetCfg`: ändert die Konfigurationsbank, ohne den laufenden Firmware-Slot zu ändern
* `Overlay app`: ein kleines Labs-Only-`.app`-Programm, das beim Start von externem Flash in RAM geladen wird
* `MO`, `DW`, `DWR`, `XB`: `RxMode`-Abkürzungen in der Statusleiste

## Wohin Sie als nächstes gehen

* [Funkbetrieb](./Radio-operation) für VFO/Kanal-Nutzung, Statusleiste, `F Lock`, `TXLock` und Schlafverhalten
* [Aktuelle Änderungen](./Recent-changes) für die wichtigsten benutzersichtlichen Änderungen in den letzten Releases
* [UV Studio](./UV-Studio) für Live-Viewing, RF-Aktivität, Firmware-Flashing, Multiboot-Slots, Labs-Apps, Kalibrierung, Boot-Logos und die `v1.6.0`-External-Flash-Wiederherstellungstools
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig) für Firmware-Slots, die Startauswahl, Konfigurationsbanken und `SetCfg`
* [Overlay-Apps](./Overlay-apps) zum Installieren und Starten experimenteller Labs Apps
* [Programmieren mit CHIRP](./Programming-with-CHIRP) für die Computerprogrammierung mit dem in jedem Release enthaltenen dedizierten Treiber
* [Scannen](./Scanning) für Frequenzscan, Speicherscan, `ScnRng` und DCS / CTCSS-Scan
* [Menü](./Menu) für jeden Menüpunkt und das versteckte Menü
* [Tastenfunktionen](./Button-functions) für Verknüpfungen, lange Drücke und programmierbare Tasten
* [FoxHunt](./Fox-Hunt) für nur empfangssignalstärkegestützte Richtungsfindung
* [Beacon](./Beacon) für den unabhängigen periodischen Morse-Sender
* [AirCopy](./AirCopy) für die Übertragung von Funk-zu-Radio-Speicher/Einstellungen und die `v6.1.0`-Verbesserungen
* [Erweiterte Funktionen](./Advanced-features) für RescueOps, den Wiederaufnahmemodus, das eingebaute Spiel und die TX-on-all-bands-Forschungsfunktionen
* [Spectrum-Analysator](./Spectrum-analyzer) für Bandscope-Scanning
* [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver) für die Broadcast FM-Funktion
* [Fehlerbehebung](./Troubleshooting) für häufige Probleme und schnelle Überprüfungen
