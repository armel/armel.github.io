# Neuere Änderungen

Diese Seite fasst die neueste stabile `v6.1.0`-Version und die wichtigsten vom Benutzer sichtbaren Änderungen in früheren Versionen zusammen.

Das offizielle Veröffentlichungsarchiv finden Sie auf der [GitHub-Veröffentlichungsseite](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## Höhepunkte der v6.1.0

`v6.1.0` ist das neueste stabile Release. Es konzentriert sich auf schnellere und sicherere Datenübertragung, den neuen `MIX`-Scanlistenmodus, erweiterte Labs-Wartung durch UV Studio und mehrere Zuverlässigkeitskorrekturen.

### Freigabepaket

Laden Sie Firmware und begleitende Dateien von der [v6.1.0 Release Page](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0) herunter. Die Version bietet die vier offiziellen Editionen `Fusion`, `FieldOps`, `Transfer` und `Labs` sowie den passenden gemeinsamen CHIRP-Treiber. Wählen Sie die Edition nach Fähigkeiten, anstatt Fusion als Paket mit allen speziellen Funktionen zu behandeln.

### Upgrade von v6.0.0

1. Wenn die alte Firmware noch installiert ist, laden Sie das Radio mit dem passenden CHIRP-Treiber herunter und speichern Sie dieses Bild. Optional exportieren Sie die Speicherkanalzeilen nach CSV.
1. Sichern Sie die gerätespezifische Kalibrierung des Radios mit [UV Studio](./UV-Studio#calibration).
1. Flashen Sie die gewählte `v6.1.0` Edition. Führen Sie ein Werksreset nur dann durch, wenn die Freigabeanweisungen oder der Migrationspfad von Ihrer installierten Version dies ausdrücklich erfordern.
1. Laden Sie den dedizierten `v6.1.0` CHIRP-Treiber und laden Sie ein neues Bild aus dem aktualisierten Radio herunter.
1. Kopieren Sie die alten Kanalzeilen in das neue Bild, anstatt das komplette alte Einstellungsbild hochzuladen.
1. Wählen Sie in Labs `v6.1.0` im versionierten App-Katalog von UV Studio aus. Ersetzen Sie eine Overlay-App, die der Loader als inkompatibel meldet.
1. Aktualisieren Sie vor der Verwendung von AirCopy beide Funkgeräte auf die kompatible `v6.1.0`-Firmware; das optimierte Funkprotokoll ist nicht drahtkompatibel mit früheren Versionen.

Für eine zusätzliche Sicherheitskopie nach der Installation von `v6.1.0` Labs kann UV Studio den kompletten externen Flash speichern. Siehe [Auswahl des richtigen Backups oder der richtigen Kopie](./UV-Studio#choosing-the-right-backup-or-copy).

### AirCopy-Leistung und Kabelklonen

Das `v6.1.0` AirCopy-Protokoll sendet bis zu drei `64-byte`-Blöcke in einem FSK-Rahmen, reduziert den Turnaround-Overhead und macht Funkübertragungen etwa doppelt so schnell. Es vergleicht CRC32-Hashes in Gruppen von bis zu `24`-Blöcken und sendet nur Blöcke, die sich vom Ziel unterscheiden.

Die `Transfer`-Edition fügt auch `CABLE COPY` over UART und eine reine Kabel-`Flash 2M`-Auswahl zum Klonen von externem Flash hinzu, wobei der gerätespezifische Kalibrierungssektor ausgeschlossen wird. Sender- und Empfängerauswahlen werden validiert, bevor Daten geschrieben werden.

Dies ist ein neues Protokoll: Beide Radios müssen die gleiche kompatible Firmware ausführen. Siehe [AirCopy](./AirCopy#v610-improvements).

### MIX-Scanliste

Der neue `MIX`-Modus scannt eine gespeicherte Auswahl von Listen `01` bis `24` als ein kombiniertes Set. Wählen Sie `MIX` in `ScList`, drücken Sie `M`, um den Editor zu öffnen, schalten Sie Listen mit `M` um und speichern Sie mit `EXIT`. Der Editor zeigt die Anzahl der ausgewählten Listen an und mindestens eine Liste muss aktiviert bleiben.

Während eines aktiven Speicherscans wählt die Eingabe von `25` `MIX` aus; `00` wählt weiterhin `ALL` aus. Siehe [Scannen](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` fügt vollständiges `2 MiB`-External-Flash-Backup und Wiederherstellung für Labs hinzu. Die Wiederherstellung bewahrt den gerätespezifischen Kalibriersektor, überspringt identische `4 KiB`-Sektoren mit CRC32, wenn sie unterstützt werden, überprüft jeden geschriebenen Sektor und startet das Radio neu, wenn es fertig ist.

Eine neue geführte Factory-Software-Wiederherstellung überprüft gebündelte Bilder nach Größe und SHA-256, stellt ein rekonstruiertes externes Flash-Bild wieder her, während die Kalibrierung erhalten bleibt. Fordert dann den DFU-Modus auf und installiert die passende UV-K1- oder UV-K5 V3-Firmware. Die Schnittstelle gruppiert auch Kalibrierungs- und Boot-Logo-Operationen in klareren Backup- / Wiederherstellungs- oder Download- / Upload-Ansichten.

Diese externen Flash-Tools erfordern `v6.1.0` Labs. Siehe [UV Studio](./UV-Studio#version-status), [externes Flash-Backup und Wiederherstellung](./UV-Studio#external-flash-backup-and-restore-v160) und [Fabriksoftwarewiederherstellung](./UV-Studio#factory-software-restoration-v160).

### Andere v6.1.0 Änderungen

Die Version ergänzt außerdem die Overlay-Spiele [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll) und [`Space Impact`](./Overlay-applications#space-impact). Hinzu kommen Korrekturen für das RF Log über Konfigurationsbanken hinweg, den Overlay-App-Speicher, die Wobbelkalibrierung und die Behandlung des DCS-Squelch-Nachlaufs.

## Höhepunkte der v6.0.0

`v6.0.0` wurde am 10. September 2026 veröffentlicht. Es führte vier offizielle Editionen ein, Multiboot und Multiconfig, die Labs-Overlay-App-Plattform, zuverlässige AirCopy und unabhängige FoxHunt- und Beacon-Anwendungen.

### Vier offizielle Ausgaben

| Edition | Vorgesehene Verwendung | Zusätzliche Merkmale |
| --- | --- | --- |
| `Fusion` | Alltagsgebrauch | ausgewogene Referenzedition; empfohlen für die meisten Benutzer |
| `FieldOps` | Feld- und Ersthelferarbeit | RescueOps, Resident FoxHunt und Resident Beacon |
| `Transfer` | Funk-zu-Funk-Datenübertragung | AirCopy und Resident Beam |
| `Labs` | Versuche | RescueOps, AirCopy und Overlay-Apps einschließlich FoxHunt, Beacon und Beam |

Fusion `v6.0.0` enthält nicht mehr die spezialisierten Funktionen v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon oder Breakout. Wählen Sie die entsprechende Spezialedition, wenn eine dieser Fähigkeiten erforderlich ist.

### Unabhängige FoxHunt- und Beacon-Anwendungen

Die ehemalige kombinierte `FOX HUNT / BEACON`-Aktion wurde vor dem `v6.0.0`-Release aufgeteilt. `FOX HUNT` und `BEACON` sind separate programmierbare Aktionen, separate Resident-Anwendungen in FieldOps und separate Overlay-Apps in Labs.

Siehe [FoxHunt](./Fox-Hunt) und [Beacon](./Beacon).

### Multiboot

Kompatible Editionen können vier zusätzliche F4HWN-Firmware-Images in externen Flash speichern. Halten Sie `M` (`MENU`) selbst, während Sie das Radio einschalten, um den Startauswahlschalter zu öffnen, die gespeicherten Bilder zu validieren und `Main` oder den Slot `1` auf `4` wiederherzustellen.

Die Firmware schützt das normalerweise geblinkte Bild automatisch als `Main`, überprüft den vollständigen CRC eines Slots vor dem Löschen des internen Flash und zeichnet seinen aktiven Zustand redundant auf. Die `Firmware Slots`-Ansicht von UV Studio installiert, überprüft, benennt und löscht die vier Benutzersteckplätze, während sich das Radio im normalen Modus befindet.

Nur multibootfähige `v6.0.0`- oder neuere F4HWN-Bilder sollten in diesen Slots installiert werden. Siehe [Multiboot und Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig und SetCfg

Jeder Firmware-Slot wählt standardmäßig eine separate Konfigurationsbank aus. Speicherkanäle, Kanalnamen, VFOs, Scanlisten und Funkeinstellungen bleiben daher beim Umschalten von Editionen isoliert. Kalibrierung, das Boot-Logo, Firmware/App-Slots, Multiboot-Status und RF-Log bleiben geteilt.

Das neue `SetCfg`-Menü kann die laufende Firmware bewusst mit einer anderen Bank koppeln. `SysInf` zeigt unabhängige `SLOT`- und `CFG`-Badges, und UV Studio kann die Konfiguration eines Benutzerslots zurücksetzen, ohne die Firmware zu löschen.

Siehe [Multiboot und Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) und [Menü](./Menu).

### Zuverlässiges AirCopy mit Bestätigungen

Air Copy wartet nun nach jedem Block auf eine Bestätigung. Der Empfänger überprüft das Paket vor dem Schreiben und kann einen erneuten Versand anfordern; der Absender wiederholt verlorene, beschädigte oder nicht bestätigte Blöcke bis zu dreimal. Doppelte Blöcke werden sicher erkannt, so dass ein verlorenes ACK die Übertragung nicht mehr desynchronisiert.

Eine neue `All (Mem+Set)`-Option überträgt alle acht 128-Kanal-Banken und Einstellungen in einem kontinuierlichen Lauf. Der Bildschirm meldet den Fortschritt von `TX`/`RX` plus Wiederholungs- oder Fehlerzählungen.

Siehe [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Overlay-Apps in Labs

Die experimentelle `Labs`-Edition kann kleine `.app`-Programme in externem Flash installieren und von einem überprüften `4 KiB`-RAM-Overlay ausführen. Die `Apps`-Ansicht von UV Studio mit der Bezeichnung `Labs only` installiert, verifiziert, listet und entfernt Apps; `F + 7` öffnet den On-Radio-Launcher.

Der Loader validiert das App-Format, die ABI/API-Kompatibilität, die erforderlichen Funktionen, die RAM-Adresse, die Größe und den Code CRC vor der Ausführung. Zu den verfügbaren Apps gehören Funktools wie Broadcast FM, FoxHunt, Beacon und Beam sowie Breakout, Tetris, Cube3D und Plasma.

Siehe [Overlay-Apps](./Overlay-apps) für die Installation und Kompatibilität und [Overlay-Anwendungen](./Overlay-applications) für den Zweck und die Steuerung jeder App.

### Beacon-Tastmodus (TONE / CARR)

Beacon erhält eine Keying-Mode-Einstellung für Schlüssel `4`. `TONE` (Standard) ist das vorherige Verhalten - ein kontinuierlicher FM-Träger mit dem `1000 Hz`-Ton für jedes Morse-Element (MCW / F2A). `CARR` unterbricht den Träger selbst für jedes Element und reproduziert das vom Träger unterbrochene Muster, das viele ARDF-Füchse im Feld verwenden: Das Signal verschwindet zwischen Elementen, wodurch die Richtung schwieriger wird und ein einfacher AM-Empfänger es kopieren kann. Die Einstellung ist in AirCopy-Übertragungen gespeichert und enthalten und sowohl im Resident- als auch im Overlay-Beacon verfügbar. Siehe [Beacon](./Beacon#timing-and-keying).

## Höhepunkte der v5.9.0

Diese Änderungen wurden nach `v5.8.0` entwickelt und in `v5.9.0` veröffentlicht.

### Kategorisierter Menübrowser

Fusion-Entwicklungs-Builds öffnen das Menü auf einem Kategoriebildschirm, anstatt sofort die ursprüngliche flache Liste anzuzeigen. Die verfügbaren Kategorien sind `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` und `DTMF`. Das Hidden-Menü-Startup fügt auch eine `Service`-Kategorie hinzu.

Die `All`-Kategorie behält die ursprüngliche Flat-Menü-Order und die globale Nummerierung bei. Die Eingabe einer Menünummer direkt aus dem Kategoriebildschirm wechselt auch zu `All`, so dass bestehende nummerierte Menükombinationen weiterhin funktionieren. Die Firmware merkt sich die zuletzt ausgewählte Kategorie und das letzte Element, das in jeder Kategorie für die aktuelle Sitzung verwendet wurde.

Siehe [Menü](./Menu#categorized-menu-browser).

### Aktionsauswahl für Seitentasten

Nachdem Sie `F` gedrückt haben, halten Sie beide Seitentasten gedrückt, um eine temporäre Aktionsauswahl zu öffnen. Verwenden Sie `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1, um die verfügbaren kompilierten Verknüpfungsaktionen zu durchsuchen und `M` zu drücken, um die hervorgehobene Aktion auszuführen. `EXIT` oder `F` storniert den Picker; das Drücken von `PTT` schließt ihn und setzt die normale Sendeverarbeitung fort.

Der Picker schließt automatisch nach etwa fünf Sekunden oder wenn der Empfang beginnt. Jeder Seitenknopf erinnert sich an seine letzte Auswahl, bis das Radio neu gestartet wird. Ein normaler kurzer `F` + Seitenknopfdruck behält sein bestehendes Step-up / Step-down-Verhalten bei.

Siehe [Tastenfunktionen](./Button-functions#side-key-action-picker).

### Fox Hunt / Beacon Verbesserungen

Fox Hunt fügt zwei tiefere Front-End-Gain-Schritte nach den ursprünglichen `ATT 0`, `ATT 6`, `ATT 15` und `ATT 27`-Einstellungen hinzu. Sie werden als `BYP` und `BYP+` gezeigt; Diese Namen beschreiben bequeme Nahbereichsmodi, keine wörtliche Hardware-Bypass. Die Navigationstasten (`UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1) ändern nun die Dämpfung direkt.

Nach einer Verstärkungsänderung lässt die Firmware den RSSI-Detektor kurz abrechnen und setzt dann die Peak-, Minimum-, Trend- und Signalhistorie-Referenzen zurück. Dies vermeidet abgestandene Spitzen und künstliche Sprünge beim Bewegen zwischen Gewinnbereichen.

Das Halten von `F` für etwa 0,5 Sekunden schaltet eine temporäre Tastatursperre um, die von Fox Hunt und Beacon geteilt wird. In Fox Hunt bleiben die Navigationsschlüssel für die Dämpfung verfügbar, während sie gesperrt sind. In Beacon werden alle normalen Bedienelemente blockiert, bis der gleiche lange Drücker die Tastatur entsperrt, auch während einer aktiven Übertragung.

Fox Hunt und Beacon ignorieren nun beide den normalen `SetOff`-Inaktivitäts-Timer und bleiben aktiv, bis sie explizit beendet werden. Ihre gewöhnlichen Backlight-Timeouts und Batterie-Updates funktionieren weiterhin.

Siehe [Fox Hunt und Beacon](./Fox-Hunt-and-Beacon).

### Korrekturen für Scan und FM-Rundfunk

Während des Speicherscans hält das Ändern der aktiven Scanliste die Scanwiederaufnahme vorübergehend aufrecht, während der Scanlistenname tatsächlich angezeigt wird. Dadurch wird der versteckte Fortschrittsmesser und die Scanposition synchronisiert. Frequenz- und Range-Scans werden nicht angehalten, da sie die Namensüberlagerung nicht anzeigen.

Ein aktiver UKW-Scan ignoriert nun ein auf dem Hauptfunkkanal detektiertes eingehendes Signal, so dass der UKW-Scan nicht unterbrochen wird. Normales FM-Hören führt nach wie vor zum Hauptkanalempfang.

Siehe [Scannen](./Scanning#changing-the-scan-list-during-scan) und [FM Broadcast Receiver](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## Höhepunkte der v5.8.0

Diese Änderungen basieren auf Commits nach dem `v5.7.0`-Tag in `feature_update_v5`.

### Fox Hunt / Beacon

Fusion-Builds fügen eine programmierbare `FOX HUNT / BEACON`-Aktion mit zwei komplementären Modi hinzu:

* Fox Hunt bietet ein kalibriertes `dBm`-Display, S-Meter- und Peak-Messwerte, einen Signaltrend von einer Sekunde, eine wählbare Dämpfung, Audio im Geiger-Stil oder eine Empfangsstation, und eine Auswahl zwischen einer Treppenlehre und einer Signalhistorie von etwa 18 Sekunden.
* Beacon verwendet den aktiven TX VFO, um eine ARDF-Kennung oder `<CALLSIGN> MOE` in Morse zu übertragen, mit einstellbaren `5` zu `60-second` TX-Fenstern und `5` zu `240-second` stillen Intervallen.

Beacon nimmt sein Rufzeichen von CHIRP `Message Line 1` und beginnt seine erste Übertragung sofort, wenn ausgewählt. Vor jedem Burst überprüft die Firmware die entsprechende TX-Frequenzsperre, per VFO `TXLock`, den Batteriezustand und die Modulationsbeschränkung.

Die Dämpfung, das Messgerät, der Audiomodus und das Beacon-Intervall werden im externen Flash gespeichert und sind in Air Copy `Settings`-Übertragungen enthalten.

Siehe die historische [Fox Hunt / Beacon Kompatibilitätsseite](./Fox-Hunt-and-Beacon). Verwenden Sie für aktuelle Firmware die separaten Seiten [FoxHunt](./Fox-Hunt) und [Beacon](./Beacon).

## Höhepunkte der v5.7.0

Diese Änderungen basieren auf Commits nach dem `v5.6.1`-Tag in `feature_update_v5`.

### UV Studio


Es bietet Live-Bildschirmspiegelung und Nicht-TX-Tastatursteuerung, kompatible RF-Log-Anzeige und Analyse, RF-Log-CSV-Export, Firmware-Flashing, Kalibrierungs-Backup / Wiederherstellung und benutzerdefiniertes Boot-Logo-Management. Es läuft lokal über `Web Serial` ohne Installation, Server oder Konto.


### RF-Log

Builds mit RX/TX-Protokollierung fügen eine programmierbare `RF LOG`-Verknüpfungsaktion hinzu.

Die RF-Protokolldatensätze empfangen, überwachen und senden Sitzungen im externen Flash und zeigen sie dann in einer neuesten ersten Historienansicht. Jeder Eintrag kann den Kanalnamen oder die Frequenz, die RX / TX-Richtung, die Dauer, den RX S-Meter oder den TX-Leistungspegel und die niedrigste Batteriespannung während der Sitzung anzeigen.

Der Logscreen unterstützt:

* `ALL`, `RX` und `TX` Filter
* bis zu 512 sichtbare Verkehrseinträge
* jump-to-newest und jump-to-oldest Verknüpfungen mit `F` plus die Navigationsschlüssel (`UP` / `DOWN` auf UV-K5, oder `LEFT` / `RIGHT` auf UV-K1)
* ein eindeutiger Bestätigungsfluss vor dem Löschen des Logs

Siehe [Erweiterte Funktionen](./Advanced-features#rf-log) und [Tastenfunktionen](./Button-functions#rf-log-action).

### Ausschlüsse von ScanRange

`ScnRng` kann jetzt bis zu `64` vorübergehend ausgeschlossene Frequenzen statt `32` beibehalten.

Wie zuvor ist die Liste kreisförmig, wird nicht in den Speicher geschrieben und wird gelöscht, wenn das Radio neu gestartet wird oder wenn sich die Entfernungsidentität ändert.

Siehe [Scannen](./Scanning#excluding-frequencies-in-scnrng).

### SetLck Sperrumfang

`SetLck` hat jetzt vier statt zwei Möglichkeiten:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` deckt die programmierbaren Verknüpfungen ab, die den beiden Seitentasten und `M Long` zugeordnet sind. Dies ermöglicht es, diese Abkürzungen während des Verriegelns der vorderen Tastatur verfügbar zu halten oder sie als Teil des Schlosses zu deaktivieren. `PTT` kann unabhängig voneinander gesperrt werden, um eine versehentliche Übertragung zu verhindern.

Siehe [Menü](./Menu#main-menu) und [Tastenfunktionen](./Button-functions#keypad-lock-and-setlck).

### UV Studio Wartung

Der Firmware-Side-Screen-Streaming-Code wurde intern vom Screenshot-Handling in das UV Studio-Handling umbenannt. Builds, die die optionale RX/TX-log UV Studio-Brücke aktivieren, können auch aktuelle RF-Log-Zeilen in kompatible Viewer-Tools streamen.

Siehe [Erweiterte Funktionen](./Advanced-features#k5-viewer).

## Höhepunkte der v5.6.0

Diese Änderungen basieren auf den Post-`v5.5.0`-Commits in `feature_update_v5`.

### SetSav Bildschirmschoner

Builds mit Bildschirmschoner-Unterstützung fügen das `SetSav`-Menü hinzu.

Verfügbare Modi:

* `OFF`: Kein Bildschirmschoner
* `LOGO`: das gespeicherte Boot-Logo als Leerlaufbildschirm anzeigen
* `LOGO+`: das gespeicherte Boot-Logo mit einem Scrollen-Effekt anzeigen
* `MATRIX`: Zeigen Sie einen matrixartigen animierten Leerlaufbildschirm

`SetSav` ist an das Backlight-Timeout gebunden. Es kann auf dem Hauptbildschirm und dem UKW-Broadcast-Bildschirm angezeigt werden, wenn das Radio im Leerlauf ist, und es ist während des RX-, TX-, PTT-, BEAM- und aktiven UKW-Scans ausgesetzt.

Siehe [Funkbetrieb](./Radio-operation#screen-saver-and-backlight-timeout) und [Menü](./Menu#main-menu).

Da `SetSav` vor dem versteckten Menü eingefügt wird, bewegen sich versteckte Menüindizes in `v5.6.0` um eins: `F Lock` beginnt bei `72` anstelle von `71`.

### Startton des Boot-Logos

Beim `POnMsg = LOGO` kann der Start-Logo-Modus immer noch das normale Start-Piep-Verhalten beibehalten.

Siehe [Menü](./Menu#main-menu) und [UV Studio](./UV-Studio#boot-logo).

### Scan RSSI-Indikator

Schnelle Scan-Builds können beim Scannen eine kleine RSSI-Sparkline anzeigen. Es gibt eine kompakte Ansicht der letzten RSSI-Proben, so dass starke Kandidaten visuell hervorstechen, während der Scan läuft.

Siehe [Scannen](./Scanning#scan-indicators-and-detection).

### Unterhörbare Abtastbereichserkennung

`ScnRng` kann CTCSS / DCS erkennen, während ein empfangenes Signal gestoppt wird. Der erfasste subaudible Code wird in der Scan-UI angezeigt, wenn er verfügbar ist.

Siehe [Scannen](./Scanning#scan-indicators-and-detection).

### Frequenzkopie UI

Der `F+4`-Frequenzkopierbildschirm trennt nun den Suchzustand und das Ergebnis deutlicher:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* erkannte `Freq:` und `Tone:` Details

Siehe [Scannen](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### Aktualisierungen für UV Studio und Bildschirmfotos

Bildschirmschoner-Frames werden mit UV Studio synchronisiert, und die Screenshot-Handhabung wurde optimiert, um die RAM-Auslastung zu reduzieren und veraltete Brocken zu vermeiden.

Siehe [Erweiterte Funktionen](./Advanced-features#k5-viewer).

### Korrekturen und Verbesserungen

Diese Version enthielt auch mehrere Verhaltenskorrekturen und UI-Verfeinerungen:

* Bandscope / Spektrum Frequenzrundung für `8.33 kHz`-Schritte
* AM-to-FM Dual-Watch RX-Rekonfiguration
* VFO Lock Icon Platzierung beim Scannen
* Bildschirmschoner Wake/Sleep Edge Cases
* hohlen manuellen Hintergrundbeleuchtung Symbol, wenn manuelles Licht ausgeschaltet ist

## Höhepunkte der v5.5.0

### Schnellere Scan-Engine

Aktuelle Builds können die neuere `FAST`-Scan-Engine für den Speicherscan und `ScnRng` verwenden.

Das `SetScn`-Menü wählt zwischen:

* `NORMAL`: der konservative Scanpfad
* `FAST`: ein schnellerer Pfad, der Kanäle oder Range-Schritte mit RSSI vorab überprüft, bevor er die vollständige Empfangseinrichtung durchführt

Unter günstigen Bedingungen kann `ScnRng` im `FAST`-Modus etwa `150+`-Frequenzen pro Sekunde scannen.

Siehe [Scannen](./Scanning#scan-engine-mode-normal-vs-fast) und [Menü](./Menu#main-menu).

### Vorübergehende Ausschlüsse aus Messbereich

Während ein `ScnRng`-Scan auf einer empfangenen Frequenz gestoppt wird, drücken Sie lange `MENU`, um diese Frequenz vom aktuellen Bereichsscan auszuschließen.

Dies wurde mit `32`-Slots in `v5.5.0` eingeführt; aktuelle Post-`v5.6.1`-Builds erlauben `64` temporäre Ausschlüsse. Diese Ausschlüsse werden gelöscht, wenn das Radio neu gestartet wird oder wenn sich die Reichweitenidentität ändert.

Siehe [Scannen](./Scanning#excluding-frequencies-in-scnrng).

### BEAM Übertragungsmodus

Builds mit BEAM-Unterstützung können die aktuelle VFO- oder Speicherkanalkonfiguration an ein anderes Radio senden oder ein BEAM-Paket empfangen und auf dem ersten freien Speicherkanal speichern.

BEAM wird durch eine programmierbare Shortcut-Aktion geöffnet.

Siehe [Erweiterte Funktionen](./Advanced-features#beam-transfer-mode) und [Tastenfunktionen](./Button-functions#beam-action).

### Benutzerdefiniertes Boot-Logo

Builds mit Logo-Unterstützung können beim Start ein benutzerdefiniertes `128x64` monochromes Boot-Logo anzeigen.

Laden Sie das Logo mit UV Studio hoch oder laden Sie es herunter und wählen Sie dann `LOGO` im `POnMsg`-Menü aus.

Siehe [UV Studio](./UV-Studio#boot-logo), [Menü](./Menu#main-menu) und [Fehlerbehebung](./Troubleshooting#my-custom-boot-logo-does-not-show).

### DCS / CTCSS Display Verbesserungen

Die Menüs `RxDCS`, `TxDCS`, `RxCTCS` und `TxCTCS` zeigen nun sowohl die ausgewählte Einstiegsposition als auch den homologierten Index an, wenn einer existiert.

Dies erleichtert die Unterscheidung von normaler Listenposition, PMR446-homologierten Einträgen, Extratönen und invertierten DCS-Einträgen.

Siehe [Menü](./Menu#main-menu).

### Bearbeitung von Channel-Namen

Die `ChName`-Bearbeitung wurde durch Multi-Tap-Eingabe, Groß-/Kleinbuchstabenschaltung, direkte numerische Eingabe mit langen Tastendrücken und klareres `EXIT`-Verhalten verbessert.

Siehe [Menü](./Menu#main-menu).

### Persistenz des Spektrumanalysators

Der Spektrumanalysator speichert jetzt mehr Einstellungen, wenn Sie den Sweep-Bildschirm mit `EXIT` verlassen, einschließlich Triggermodus, automatisches Empfindlichkeitsprofil, manuelle Skala und Triggerpegel.

Das Starten des Analysators von `ScnRng` überschreibt nicht mehr die gespeicherte Scan-Schritt- oder Balkenzähleinstellung.

Siehe [Spectrum Analyzer](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf und Build-Informationen

`SysInf` wird jetzt in aktuellen Builds paginiert. Abhängig von Build-Optionen können Identität, Build-Datum/-Uhrzeit, Commit-Kennung, Batterieinformationen, Speichernutzung und QR-Code-Projektlinks angezeigt werden.

Siehe [Menü](./Menu#main-menu).

### Air Copy-Einstellungen

Air Copy `Settings`-Übertragungen enthalten jetzt den VFO-Bereich, der von Funktionen wie `ScnRng` verwendet wird, so dass Scan-Range-Grenzfrequenzen beim Kopieren von Einstellungen repliziert werden.

Siehe [AirCopy](./AirCopy).

## Aktuelle v5.x Änderungen auch wissenswert

Die folgenden Änderungen landeten kurz vor `v5.5.0` und sind im Wiki dokumentiert, weil sie sich auf den täglichen Gebrauch auswirken:

* `SetRxA` wählt verschiedene RX-Audioprofile für `FM` und `AM` aus; in `AM` kann es zwischen `SHARP`, `STOCK` und `OPEN` wechseln.
* Scanlisten unterstützen kurze Namen, und der Speicherscan kann während des Scannens zwischen gültigen nicht leeren Listen wechseln.
* `SysInf`, FM Broadcast Radio und das Spektrum Analyzer UI wurden in den letzten Builds verfeinert.
* Das versteckte `SetNav`-Menü ermöglicht die gleiche Dokumentation für `UV-K1`- und `UV-K5 V3`-Navigationsstile.

Siehe [Menü](./Menu), [Scannen](./Scanning), [Radiobetrieb](./Radio-operation) und [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver).

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-Apps](./Overlay-apps)
* [Überlagerungsanwendungen](./Overlay-applications)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Tastenfunktionen](./Button-functions)
* [Erweiterte Funktionen](./Advanced-features)
* [Spectrumanalysator](./Spectrum-analyzer)
* [Menü](./Menu)
