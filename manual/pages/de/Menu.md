# Bedienung des Menüs

Das Menü kann mit dem `M`-Button  (Kurzdruck)  aufgerufen werden.

> [!NOTE]
> Navigation verwendet `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1. Das aktive Layout folgt der Hidden-Menü-Option `SetNav`.

Der in Fusion `v5.9.0` eingeführte Kategoriebrowser wird in den offiziellen `v6.0.0`- und `v6.1.0`-Editionen verwendet. Wählen Sie eine Kategorie mit `UP` / `DOWN` aus und drücken Sie dann `M`, um die Artikelliste zu öffnen. Das ausgewählte Element wird auf der linken Seite des Bildschirms und sein aktueller Wert auf der rechten Seite angezeigt.

Um ein Menüelement zu finden, durchsuchen Sie dessen Kategorie oder wählen Sie `All`, um das ursprüngliche flache Menü zu verwenden. Sie können auch die **globale Menüpunktnummer** vom Kategoriebildschirm eingeben; Geben Sie beispielsweise `52` ein, um auf `SysInf` zuzugreifen. Direkte Nummerneingabe wechselt zu `All`. Fusion `v5.9.0` verwendet `01` zu `77`; Multiboot-fähiges `v6.0.0` fügt `SetCfg` hinzu und erweitert die vollständige Liste auf `78`.

Sobald der gewünschte Menüpunkt hervorgehoben ist, gibt das Drücken der `M`-Taste diesen Menüpunkt ein.

Sobald das Menüelement ausgewählt ist, passt das Drücken der Pfeiltasten `UP` und `DOWN` die Einstellung für dieses Element an. Um die Auswahl zu bestätigen, drücken Sie die `M`-Taste. Um die Auswahl abzubrechen, drücken Sie `EXIT`.

Aus einer Artikelliste drücken Sie kurz `EXIT`, um zum Kategoriebrowser zurückzukehren. Kurzdrücken Sie `EXIT` erneut, um das Menü zu verlassen und zum Radiobildschirm zurückzukehren.

![Menü](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Kategorisierter Menübrowser

Der Fusion-Kategoriebildschirm zeigt links die vorherige, aktuelle und nächste Kategorie an. Die rechte Seite zeigt an, wie viele Elemente die hervorgehobene Kategorie enthält.

| Kategorie | Fusion-Positionen | Inhalt |
| --- | ---: | --- |
| `Channels` | 21 in v6 | Frequenzsprung, Leistung, Töne, Offset, Bandbreite, Kanal- und Speichereinstellungen plus `SetCfg` |
| `Scan` | 6 | Scanliste, Prioritätskanäle, Lebenslaufmodus und Scan-Engine |
| `Keys` | 10 | Programmierbare Verknüpfungen, Tastatursperre, PTT-Modus und Anrufkanal |
| `Power` | 4 | Batterieschoner/-display, Inaktivitäts-Timeout und Bildschirmschoner |
| `Display` | 11 | Kanalanzeige, Startbildschirm, Hintergrundbeleuchtung und UI-Einstellungen |
| `Timers` | 4 | TX Timeout, EOT und RX/TX Timer Einstellungen |
| `Audio` | 5 | Mikrofon-, Tastatur-, Lautstärke- und RX-Audioprofile |
| `Radio` | 6 | Squelch, STE, Roger Beep, VOX und RX Mode |
| `DTMF` | 5 | Up/Down-Codes, Seitenton, Preload und Live-Decoder |
| `Service` | 6 | versteckte Startmenüs; nur sichtbar nach der Boot-Geste des versteckten Menüs |
| `All` | 72 normalerweise in v6, 78 mit Service | Original-Flat-Menü-Bestellung und globale Nummerierung |

Der Elementzähler innerhalb einer gefilterten Kategorie ist lokal für diese Kategorie. Verwenden Sie `All` oder geben Sie eine Zahl aus dem Kategoriebildschirm ein, wenn Sie die unten aufgeführten globalen Zahlen wünschen.

Die Firmware speichert die letzte ausgewählte Kategorie und das letzte hervorgehobene Element in jeder Kategorie für die aktuelle Sitzung. Diese Navigationspositionen werden bei einem Neustart nicht gespeichert.

## Schnelle Tipps

* In `All` sind die ersten 13 Elemente die wichtigsten Live-VFO / Channel-Einstellungen
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` und `ScnRev` sind die wichtigsten Scan-bezogenen Elemente
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` und `M Long` steuern anpassbare Verknüpfungen
* Das versteckte Menü ist nur beim Start mit `PTT` + `SIDE BUTTON 1️⃣` verfügbar

## Hauptmenü

Die Nummer vor jeder Menüpunktbeschreibung ist die ** menu-Artikelnummer **, die für eine schnelle Auswahl verwendet werden kann.
1. `Step` - Schritt der Frequenz (in kHz), `UP` und `DOWN`-Tasten ändern die Frequenz um diesen Wert, auch können Sie nur eine Frequenz einstellen, die ein Vielfaches von der Hälfte dieses Wertes ist.
1. `Power` - Funkausgangsleistung (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH / USER). Beachten Sie, dass die USER-Leistung über das `SetPower`-Menü abgestimmt werden kann.
1. `RxDCS` - Empfänger Digital-Coded Squelch. Wenn Sie dies aktivieren, wird squelch nur dann freigeschaltet, wenn dieser Code empfangen wird. Sie können einen DCS/CTCSS-Scan starten, während Sie sich in dieser Menüoption befinden, indem Sie die `* SCAN`-Taste drücken.
1. `RxCTCS` - Empfänger Continuous Tone-Coded Squelch System. Squelch wird nur freigeschaltet, wenn dieser code empfangen wird. Sie können einen DCS/CTCSS-Scan starten, während Sie sich in dieser Menüoption befinden, indem Sie die `* SCAN`-Taste drücken.
1. `TxDCS` - Sender Digital-Coded Squelch, Radio sendet gegebenen Code während der Übertragung
1. `TxCTCS` - Sender Continuous Tone-Coded Squelch System, Radio sendet gegebenen Code während der Übertragung

   In den Untermenüs `RxDCS`, `TxDCS`, `RxCTCS` und `TxCTCS` zeigt das obere rechte Abzeichen den ausgewählten Eintrag und seinen homologierten Index an:

   * für CTCSS: `NN/HH`, wobei `NN` die Position in der vollständigen 50-Ton-Liste und `HH` die homologierte Tonzahl ist. `--` bedeutet, dass der gewählte Ton einer der zusätzlichen, nicht-homologierten Töne ist.
   * für DCS: `NNN/HH`, wobei `NNN` die Position in der vollständigen DCS-Liste und `HH` die homologierte DCS-Nummer ist. `--` bedeutet, dass der ausgewählte DCS-Eintrag nicht in der homologierten PMR446-Liste enthalten ist.
   * `OFF` wird als `00/00` für CTCSS und `000/00` für DCS angezeigt.
   * DCS-Werte, die mit `N` enden, sind normale Codes; Werte, die mit `I` enden, sind invertierte Codes. Die invertierten DCS-Einträge werden in der vollständigen Liste angezeigt, erhalten aber keinen homologierten Index und zeigen daher `--`.

1. `TxODir` - Senderfrequenz-Offsetrichtung
1. `TxOffs` - Senderfrequenz-Offsetwert
1. `W/N` - vom Transceiver genutzte Bandbreite
   * WIDE - `25 kHz`
   * NARROW - `12.5 kHz`
1. `BusyCL` - Besetzte Kanalsperre, blockiert Radio von der Übertragung, wenn Signal empfangen wird
1. `Compnd` - Kompander (Kompressor / Expander), ermöglicht die Übertragung von Signalen mit einem großen Dynamikbereich über Einrichtungen mit einem kleineren Dynamikbereich, verbessert die Audioqualität, beide Radios sollten diese Option verwenden
1. `Mode` - Demodulationsmodus, Standard ist FM, AM / USB kann nur zum Hören verwendet werden
1. `TXLock` - Aktivieren oder Deaktivieren des Sendemodus des Kanals (wenn er nicht vom `F Lock`-Plan abgedeckt ist)
1. `ChList` - Speicherkanal-Scanliste auswählen
1. `ChSave` - Speichern Sie die aktuelle Einstellung auf einem Speicherkanal
1. `ChDele` - Speicherkanal löschen
1. `ChName` - Speicherkanalname ändern
   * Verwenden Sie die Schaltflächen `UP` und `DOWN`, um einen Kanal zum Bearbeiten auszuwählen
   * Drücken Sie die `M`-Taste erneut, um den Namensmodus zu bearbeiten
   * Verwenden Sie die Zahlentasten im Multi-Tap-Modus, um das aktuelle Zeichen zu bearbeiten, wie bei älteren Mobiltelefonen
     * Drücken Sie die gleiche Taste erneut, um die ihm zugewiesenen Buchstaben und Zahlen zu durchlaufen (`2` = `a`, `b`, `c`, `2` usw.)
     * Lange drücken Sie eine Zahlentaste, um die entsprechende Zahl direkt einzugeben
     * Kurzdruck `F` zum Umschalten zwischen Klein- und Großbuchstaben (`abc` / `ABC`)
     * Long-Press `F` für `#`
     * `* SCAN` kurz drücken, um `-` einzugeben, oder lange drücken, um `*` einzugeben
     * Short-Drücken Sie `0`, um ein Leerzeichen zu betreten, und drücken Sie es erneut, um `0` einzugeben
   * Sie können weiterhin die `UP`- und `DOWN`-Tasten verwenden, um die verfügbaren Zeichen manuell zu durchlaufen.
   * Drücken Sie die `M`-Taste, um zur nächsten Zeichenposition zu gelangen
   * Wiederholen Sie über zwei Schritte, bis Sie das Ende erreichen
   * Wenn "Sicher?" erscheint, drücken Sie die `M`-Taste zum Speichern oder Exit zum Abbrechen
   * Kurz-`EXIT` drücken, um ein Zeichen zurück zu bewegen; von der ersten Zeichenposition, es verlässt Namensbearbeitung
   * Lange `EXIT` drücken, um die Bearbeitung abzubrechen und zum Hauptmenü zurückzukehren.
1. `ScList` - wählt die Scan-Liste aus, die für das Channel-Scannen verwendet wird: `01` bis `24`, `ALL` und, beginnend mit `v6.1.0`, `MIX`.
   * `MIX` kombiniert eine gespeicherte Auswahl von nummerierten Listen, ohne die jedem Kanal zugewiesene Liste zu ändern.
   * Wählen Sie `MIX` und drücken Sie `M`, um den Editor zu öffnen.
   * Verwenden Sie die Navigationstasten oder geben Sie `01` zu `24` ein, um eine Liste auszuwählen, und drücken Sie dann `M`, um sie umzuschalten.
   * Drücken Sie `EXIT` zum Speichern. Mindestens eine Liste muss ausgewählt bleiben.
   * Siehe [MIX-Scanliste](./Scanning#mix-scan-list-v610) für vollständiges Verhalten.
1. `ScPri` ermöglicht/deaktiviert die Prioritätskanalunterstützung während des Scannens.
1. `PriCh1` - Setzt Priorität Kanal 1️
1. `PriCh2` - Setzt Priorität Kanal 2️
1. `ScnRev` - Scan-Wiederaufnahmemodus
   * CARRIER - nach dem Signal verschwindet, Pause für [250 Millisekunden bis 20 Sekunden] vor der Wiederaufnahme des Scannens
   * STOP - nach dem Empfang eines Signals, stoppen Sie den Scan
   * TIMEOUT - Wiederaufnahme des Scans nach [5 Sekunden bis 2 Minuten] Pause
1. `F1Shrt` - `SIDE BUTTON 1️⃣` Kurzdruckfunktion
1. `F1Long` - `SIDE BUTTON 1️⃣` lange Druckfunktion
1. `F2Shrt` - `SIDE BUTTON 2️⃣` Kurzdruckfunktion
1. `F2Long` - `SIDE BUTTON 2️⃣` lange Druckfunktion
1. `M Long` - `M` Taste lange Druckfunktion
1. `KeyLck` - Option zum automatischen Schließen der Tastatur (AUS oder 15 Sekunden bis 10 Minuten vor dem automatischen Schließen der Tastatur)
1. `TxTOut` - max Übertragungszeitlimit
1. `BatSav` - Batteriespeicheroption, eine Rate zwischen Aktivzeit und Schlafzeit (OFF, 1:1 bis 1:5)
1. `BatTxt` - zusätzlicher Batteriewert in der Statusleiste (`NONE`, `VOLTAGE` oder `PERCENT`)
1. `Mic` - Mikrofonempfindlichkeit
1. `MicBar` - Mikrofonleiste, die beim Senden erscheint 
1. `ChDisp` - Kanalanzeigestil
1. `POnMsg` - Startanzeigemodus
   * `ALL`: Zeigen Sie die konfigurierte Begrüßungsnachricht, Spannung und Firmware-/Versionsinformationen an
   * `SOUND`: Halten Sie das normale Start-Sound-Verhalten ohne Willkommensbildschirm
   * `MESSAGE`: Zeigen Sie nur die konfigurierte Willkommensnachricht an
   * `VOLTAGE`: Batteriespannung und geschätzter Prozentsatz
   * `LOGO`: Zeigen Sie das benutzerdefinierte 128x64 Boot-Logo hochgeladen mit [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: Startanzeige überspringen
1. `BLTime` - Dauer der Hintergrundbeleuchtung
1. `BLMin` - minimale Backlight-Helligkeit, wenn die Bildschirm-Hintergrundbeleuchtung ausgeschaltet wird, wird sie auf diesen Wert dimmen
1. `BLMax` - maximale Helligkeit der Hintergrundbeleuchtung, wenn sich die Bildschirmhintergrundbeleuchtung einschaltet, wird sie auf diesen Wert hell.
1. `BLTxRx` - Hintergrundbeleuchtung auf TX oder RX
1. `Beep` - Tastendruck-Piepton
1. `Roger` - Roger Piep am Ende der Übertragung
1. `STE` - Squelch Tail Eliminator, eliminiert Geräusche am Ende einer Übertragung
1. `RP STE` - Repeater Squelch Tail Eliminator
1. `1 Call` - Ein-Key-Call-Kanal; lässt Sie schnell mit der `9 Call`-Taste zu diesem Kanal wechseln
1. `UPCode` - DTMF-Code, der zu Beginn der Übertragung gesendet wird
1. `DWCode` - DTMF-Code, der am Ende einer Übertragung gesendet wird
1. `PTT ID` - stellt fest, ob `UPCode` und / oder `DWCode` übertragen werden sollen
1. `D ST` - DTMF-Seitentonschalter; lässt Sie übertragene Töne über den Radiolautsprecher hören
1. `D Prel` - DTMF-Vorladezeit
1. `D Live` - zeigt DTMF-Codes, die per Funk in der Mitte des Bildschirms empfangen werden
1. `VOX` - Sprachaktivierte TX-Empfindlichkeit
1. `SysInf` - Systeminformationen. In aktuellen F4HWN-Builds wird dieses Element in einer fortlaufenden Reihenfolge angezeigt: Geben Sie es mit `M` ein und verwenden Sie dann `UP` / `DOWN`, um zwischen den Seiten zu wechseln.
   * Identität: Firmware Author, Version und Edition
   * `BUILD`: Build Date, Build Time und Commit Identifier
   * `BATTERY`: gemessene Batteriespannung, geschätzter Batterieanteil und ausgewählter Batterietyp/-profil
   * `MEMORY`: FLASH- und SRAM-Nutzung, wenn die Speicherseite im Build aktiviert ist
   * `CODE` / `WIKI`: QR-Codes für Projektlinks, wenn QR-Code-Seiten im Build aktiviert sind
1. `RxMode` - stellt fest, wie die obere und untere Frequenz verwendet wird
   * MAIN ONLY - sendet und hört immer auf der Hauptfrequenz (`MO`)
   * DUAL RX RESPOND - hört beide Frequenzen, wenn das Signal auf der Sekundärfrequenz empfangen wird, sperrt es für ein paar Sekunden, damit Sie auf den Anruf antworten können (`DWR`)
   * CROSS BAND - sendet immer auf der Primär- und hört auf der Sekundärfrequenz (`XB`)
   * MAIN TX DUAL RX - sendet immer auf der Primärseite, hört beide (`DW`)
1. `Sql` - Squelch-Empfindlichkeit
1. `SetPwr` - Sets USER Power
   * LOW 1 (< ~20 mW)
   * LOW 2 (~125 mW)
   * LOW 3 (~250 mW)
   * LOW 4 (~500 mW, obere Grenze unter PMR-Band...)
   * LOW 5 (~1 W)
   * MID (~2 W)
   * HIGH (~5 W)
1. `SetPTT` - Setzt PTT-Nutzung
   * KLASSE
   * ONEPUSCH
1. `SetTOT` - Setzt TOT Alarm
   * AUS
   * SOUND
   * VISUELL
   * ALLE ( VISUAL + SOUND )
1. `SetEOT` - Setzt EOT Alarm (nützlich für Pausen zwischen 2 Übertragungen)
   * AUS
   * SOUND
   * VISUELL
   * ALLE ( VISUAL + SOUND )
1. `SetCtr` - setzt LCD-Kontrast
1. `SetInv` - setzt LCD invertiert (am besten für Nachtsicht)
1. `SetLck` - wählt aus, was deaktiviert ist, während die Tastatursperre aktiv ist
   * `KEYS`: Fronttastatur sperren; programmierbare Shortcut-Aktionen und `PTT` bleiben verfügbar
   * `KEYS + ACTIONS`: Sperren Sie auch die programmierbaren Aktionen, die den beiden Seitentasten zugeordnet sind, und `M Long`; `PTT` bleibt verfügbar
   * `KEYS + PTT`: auch `PTT` sperren, um eine versehentliche Übertragung zu verhindern; programmierbare Shortcut-Aktionen bleiben verfügbar
   * `KEYS + ACTIONS + PTT`: Sperren Sie die Fronttastatur, programmierbare Shortcut-Aktionen und `PTT`

   In jedem Modus, lange `F #` drücken, um das Radio zu entsperren. Siehe [Tastenfunktionen](./Button-functions#keypad-lock-and-setlck) für Details.
1. `SetMet` - Sets S-Meter Design
   * KLASSE
   * TINY (wie zum Beispiel beim Yaesu FT4 oder FT-65)
1. `SetGUI` - Sets GUI Design
   * CLASSIC (größere Schriftart, weniger angezeigte Informationen)
   * TINY (kleinere Schriftart, mehr Informationen gezeigt)
1. `SetRxA` – legt das RX-Audioprofil für die aktuelle Modulation fest

   `FM`-Profile:

   - `FLAT`: Geringster Output Gain (BK4829-safe). Am neutralsten, am besten für ruhige Umgebungen.
   - `CLEAN`: Standardmäßig ausgeglichenes Profil. Komfortables Audio mit moderatem Gewinn.
   - `MID`: Höherer Gewinn als CLEAN ohne die Aggressivität von BOOST.
   - `BOOST`: Voice-Forward-Profil für schwache Signale / laute Umgebungen. Höhere Verstärkung, mehr "Gegenwart" Audio.
   - `MAX`: Maximale Leistungsverstärkung (kann bei starken Signalen oder kleinen Lautsprechern verzerren). Am besten geeignet für einen externen Lautsprecher.

   `AM`-Profile:

   - `SHARP`: Schmaler IF-Filter mit geringer Verstärkung. Selektiver, mit besserer Nachbarkanalabweisung. Es kann bei starken Signalen härter oder etwas verzerrt klingen, bleibt aber klar.
   - `STOCK`: Beabsichtigt, so nah wie möglich am Aktien-Firmware-Verhalten zu bleiben.
   - `OPEN`: Breiterer IF-Filter mit höherer Verstärkung. Offener und angenehmer bei schwachen Signalen, aber einige Empfänge können ein wenig gedämpft klingen, insbesondere ATC.
1. `SetTmr` - stellt fest, ob RX- und TX-Timer angezeigt werden
1. `SetOff` - stellt die Verzögerung ein, bevor der Transceiver in den Tiefschlaf geht (AUS oder 1 Minute bis 2 Stunden)
1. `SetNFM` - Setzt schmale FM auf schmal oder schmal
1. `SetVol` - Setzt die Audio-Volume Gain auf Feinabstimmung Lautsprecherausgang
1. `SetKey` - Setzt den Schlüssel, um den RescueOps-Modus beim Start des Transceivers zu aktivieren
1. `SetScn` - stellt den [Scan-Motormodus](./Scanning#scan-engine-mode-normal-vs-fast) ein.
   * `NORMAL`: verwendet den Standard-Scanpfad.
   * `FAST`: verwendet den neueren schnellen Scan-Pfad. Die Firmware überprüft mehrere Frequenzen/Kanäle mit RSSI vorab, bevor sie die vollständige Empfangseinrichtung durchführt, überspringt leise Batches schneller, verfeinert enge Kandidaten bei feinen Schritten und verwendet einen kleinen Watchdog, um fortzufahren, wenn die Scanschleife zum Stillstand kommt.
1. `SetSav` - stellt den [Bildschirmschoner](./Radio-operation#screen-saver-and-backlight-timeout) ein, der nach dem Timeout der Hintergrundbeleuchtung verwendet wird, wenn er im Build aktiviert ist.
   * `OFF`: Kein Bildschirmschoner
   * `LOGO`: Zeigen Sie das benutzerdefinierte Boot-Logo als Leerlaufbildschirm
   * `LOGO+`: Zeigen Sie das benutzerdefinierte Boot-Logo mit einem Scrollen-Effekt
   * `MATRIX`: Zeigen Sie einen matrixartigen animierten Leerlaufbildschirm

   `SetSav` ist nur aktiv, wenn `BLTime` eine zeitgesteuerte Hintergrundbeleuchtungsdauer verwendet. Es wird während des RX-, TX-, PTT-, BEAM- und aktiven FM-Scans ausgesetzt.
1. `SetCfg` - wählt die Konfigurationsbank aus, die von der laufenden Firmware in Multiboot-fähigen `v6.0.0`-Builds verwendet wird.
   * `CFG M`: Hauptkonfigurationsbank
   * `CFG 1` bis `CFG 4`: Konfigurationsbanken für Firmware-Slots 1 bis 4

   Drücken Sie `M` zweimal, um eine andere Bank zu bestätigen. Das Radio wird neu gestartet, so dass die Bank abgebildet wird, bevor Kanäle oder Einstellungen geladen werden. Der Firmware-Slot ändert sich nicht. Die Bestätigung der bereits verwendeten Bank ist ein No-Op. Siehe [Multiboot und Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Verstecktes Menü

Das versteckte Menü wird aktiviert, indem Sie `PTT` + `SIDE BUTTON 1️⃣` halten, während Sie das Radio einschalten und dann alle Tasten loslassen.

73. `F Lock` - legt den TX-Frequenzbandplan fest.
    * DEFAULT+ (137-174, 400-470) - ermöglicht TX auf Standardbändern, plus Optionen `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * DISABLE ALL - deaktiviert TX auf allen Frequenzen
    * UNLOCK ALL - ermöglicht TX auf allen Bands. Es hat eine zusätzliche Sperre; siehe [wie man das einschaltet](./Advanced-features#tx-on-all-bands).
74. `350 En` - ermöglicht RX auf `350 MHz`
75. `BatCal` - Batteriespannungskalibrierung. Vergleichen Sie die angezeigte Spannung mit einem Multimeter und passen Sie sie an, bis sie so genau wie möglich übereinstimmen
76. `BatTyp` - Batterietyp / Entladekurve, die für die Berechnung des Batterieprozentsatzes verwendet wird. Es beeinflusst `%`, nicht die gemessene Spannung selbst
77. `SetNav` - konfiguriert den Navigationstyp (UP/DOWN für UV-K5, LEFT/RIGHT für UV-K1)
78. `Reset` - setzt die Funkkonfigurationseinstellungen zurück
   * VFO - entfernt nur Kanaleinstellungen
   * ALL - setzt alle zurück (Kanal- und Radioeinstellungen)

Auf dem kategorisierten Menübildschirm erscheinen diese sechs Einträge in der `Service`-Kategorie. Sie sind auch an `All` angehängt, wo ein Multiboot-fähiger `v6.0.0`-Build durch `78/78` läuft. Auf `v5.9.0`, das kein `SetCfg` hat, behalten die versteckten Einträge die Nummern `72` bis `77`.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [UV Studio](./UV-Studio)
* [Funkbetrieb](./Radio-operation)
* [Scannen](./Scanning)
* [Tastenfunktionen](./Button-functions)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [Erweiterte Funktionen](./Advanced-features)
* [Fehlerbehebung](./Troubleshooting)
