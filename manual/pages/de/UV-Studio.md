# UV Studio

UV Studio ist der browserbasierte Begleiter für kompatible F4HWN-Firmware auf UV-K1 und UV-K5 V3. Es kombiniert Live-Display- und Remote-Tastaturfunktionen, Firmware-Installation, Funkwartung, Multiboot-Management und Labs-App-Management in einer Schnittstelle.

Öffnen Sie es hier:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio kommuniziert direkt mit dem Radio über die `Web Serial` API. Funkdaten werden lokal im Browser verarbeitet; es ist keine Anwendungsinstallation, kein Serverkonto oder kein Cloud-Upload erforderlich.

> [!IMPORTANT]
> UV Studio ist nicht auf die Fusion Edition beschränkt. Die allgemeinen Tools arbeiten mit kompatiblen F4HWN-Editionen, während einige Ansichten eine bestimmte Firmware-Fähigkeit erfordern. Insbesondere das Overlay-App-Management und die externen Flash-Tools sind für Labs.

## Versionsstatus

UV Studio `v1.6.0` begleitet die stabile Firmware `v6.1.0`. Zusätzlich zum v6-Firmware-Katalog, dem Multiboot-Slot-Management und dem versionierten offiziellen Overlay-App-Katalog fügt er hinzu:

* Eine reorganisierte Schnittstelle, die Kalibrierung Backup / Wiederherstellung und Boot-Logo Download / Upload gruppiert
* `2 MiB` External-Flash-Backup und Wiederherstellung für kompatible Labs-Builds
* CRC32 Vergleich und Verifizierung für eine schnellere, sicherere Wiederherstellung von externem Flash
* geführte Wiederherstellung des rekonstruierten werkseitigen externen Flash gefolgt von der richtigen Lagerfirmware für UV-K1 oder UV-K5 V3

## Anforderungen

Sie benötigen:

* eine kompatible Quansheng UV-K1 oder UV-K5 V3 mit der PY32F071 MCU
* eine datenfähige `USB-C`-Verbindung oder ein kompatibles USB-zu-Serienkabel im Baofeng/Kenwood-Stil
* ein Desktop-Browser mit `Web Serial`-Unterstützung wie Chrome, Brave, Edge, Opera oder Firefox 151+

Eine heruntergeladene Kopie des vollständigen UV Studio-Quellbaums kann auch lokal geöffnet werden. Es ist eine statische HTML / CSS / JavaScript-Anwendung und erfordert keinen Build-Schritt oder lokalen Webserver.

## Merkmals- und Funkmodus-Zusammenfassung

| Werkzeug | Erforderlicher Funkstaat | Firmware-Anforderung |
| --- | --- | --- |
| Live Viewer und Live RF Log | Normalstart | kompatible Viewer/RF Log-Unterstützung |
| Flash Firmware | `DFU` / Flash-Modus | UV-K1 oder UV-K5 V3 Bootloader |
| Kalibrierung, Boot Logo, RF Log Export | Normalstart | Kompatible F4HWN Firmware |
| Firmware Slots | Normalstart | Multiboot-fähiges `v6.0.0` oder neuer |
| Apps | Normalstart | Labs mit Overlay-App-Unterstützung |
| Externes Flash-Backup / Wiederherstellung | Normalstart | `v6.1.0` Labs mit externem Flash-Zugang |
| Restaurierung von Fabriksoftware | normales Labs-Startup, dann DFU, wenn Sie aufgefordert werden | `v6.1.0` Labs für die erste Stufe |

Um in den `DFU`-Modus zu gelangen, schalten Sie das Radio aus, halten Sie `PTT` und schalten Sie es ein, während Sie `PTT` weiterhin halten. Geben Sie `PTT` frei und schließen Sie dann das Datenkabel an oder schließen Sie es wieder an. Es ist kein Seitenschlüssel erforderlich.

## Was UV Studio kann

UV Studio bietet:

* eine Echtzeit-`128x64`-Radioanzeige
* virtuelle UV-K1- und UV-K5-Tastaturen mit kurzen und langen Drucken
* ein abnehmbares Tastaturfenster und eine Funk-Neustartsteuerung
* Radio-Screenshots und einstellbares LCD-Rendering
* Live-RF-Aktivität, Sitzungsmarker, Filter und Analysen
* Export der gespeicherten RF-Log-Aktivität in CSV
* Firmware-Installation aus dem offiziellen Katalog, dem Rolling Development Build oder einer lokalen `.bin`-Datei
* Direkter Download des passenden CHIRP-Treibers für stabil versionierte F4HWN-Firmware
* Installation, Validierung, Benennung, Löschung und Konfigurations-Reset von Multiboot Firmware Slots
* Installation und Entfernung von Labs-Overlay-Apps aus einem versionierten offiziellen Katalog oder lokalen `.app`-Dateien
* Kalibrierungs-Backup und Wiederherstellung
* Custom Boot-Logo Download, Vorschau, Konvertierung und Upload
* Backup, Wiederherstellung und geführte Factory-Software-Wiederherstellung in `v1.6.0`
* helle und dunkle Themen und Übersetzungen in zehn Sprachen

UV Studio besitzt die serielle Verbindung weltweit. Es verhindert, dass zwei Operationen gleichzeitig den Port verwenden, und behält oder stellt die Verbindung beim Wechsel zwischen kompatiblen Normalmodus-Tools wieder her.

## Live-Ansicht

Der Live Viewer spiegelt das Radiodisplay und bietet passende virtuelle UV-K1- und UV-K5-Tastaturen.

1. Starten Sie das Radio normal.
1. Verbinden Sie das Radio mit dem Computer.
1. Öffnen Sie `Live Viewer`, wählen Sie die entsprechende Tastatur und klicken Sie auf `Connect`.
1. Wählen Sie den seriellen Radio-Port.
1. Verwenden Sie die virtuelle Tastatur oder Computertastatur.
1. Klicken Sie auf `Disconnect`, bevor Sie das Kabel ausziehen.

Die Symbolleiste kann das angeschlossene Radio neu starten, einen Screenshot aufnehmen, das simulierte LCD-Erscheinungsbild ändern und die Tastatur in einem schwebenden Fenster trennen. Das eingebaute `Help`-Panel listet alle Tastenkombinationen auf; Gemeinsame Bedienelemente umfassen Pfeiltasten für die Navigation, Ziffern für kurze Drücke, `Shift` plus eine Taste für eine lange Drücke, `Enter` oder `M` für Menü, `Esc` für Ausstieg, und `F1` / `F2` für die Seitentasten.

> [!IMPORTANT]
> Die Zuschauersteuerung kann eine Übertragung nicht starten. Das angezeigte `PTT` ist nicht verfügbar und UV Studio ist kein Remote-TX-Tool.

## RF-Log

Wenn die laufende Firmware RF Log und die Viewer Bridge unterstützt, zeigt UV Studio Live-RX- und TX-Sitzungen mit:

* Richtung, Frequenz und Kanalinformationen
* Sitzungsdauer
* RX-Signalpegel oder TX-Leistung
* Batteriespannung
* `ALL`, `RX` und `TX` Filter
* Aktivität, Sendezeit, Frequenz, Sitzung und Batterieanalyse

Das separate `Export RF Log`-Tool liest bis zu den neuesten `512` gespeicherten Aktivitäten und Power-On-Markern und erstellt `rf-log.csv`. Halten Sie das Radio im normalen Modus. Wenn Kanalnamen oder Konfigurationsbankinformationen falsch sind, aktualisieren Sie auf eine Firmware, die die neuesten v6-RF-Log-Fixes enthält.

## Flash Firmware

> [!WARNING]
> Das blinken eines inkompatiblen oder beschädigten bildes kann das radio unbrauchbar machen. Bestätigen Sie die Modell- und Bootloader-Kompatibilität, erstellen Sie ein Kalibrierungs-Backup und halten Sie das Kabel verbunden, bis der Vorgang abgeschlossen ist.

Der Firmware-Katalog gruppiert aktuelle stabile F4HWN-Builds nach Edition, enthält den rollenden Fusion-Entwicklungs-Build und kann auch kompatible Stock-Images anbieten. Eine lokale `.bin`-Datei bleibt verfügbar, wenn der Katalog nicht geladen werden kann oder wenn ein benutzerdefinierter Build verwendet wird.

1. Starten Sie das Radio im `DFU`-Modus.
1. Öffnen Sie `Flash Firmware`.
1. Wählen Sie den richtigen Katalogeintrag oder wählen Sie eine kompatible lokale `.bin`-Datei.
1. Klicken Sie auf `Flash firmware` und wählen Sie den seriellen Port aus.
1. Warten Sie, bis der Fortschrittsvorgang abgeschlossen ist und das Radio neu gestartet wird.

Wenn ein stabiler versionierter F4HWN-Build ausgewählt ist, bietet UV Studio den freigegebenen CHIRP-Treiber, der für diese Firmware-Version veröffentlicht wurde. Die Rolling Development und Stock Builds verwenden diese automatische Treiberverbindung nicht.

## Firmware-Steckplätze

Alle vier offiziellen `v6.0.0` Editionen unterstützen Multiboot. UV Studio verwaltet Benutzer-Slots `1` bis `4` in externen Flash. Das geschützte `Main`-Backup wird von der Firmware gepflegt und absichtlich nicht als beschreibbarer Slot ausgesetzt.

So installieren Sie eine weitere Edition:

1. Starten Sie ein Multiboot-fähiges Radio normal.
1. Öffnen Sie `Firmware Slots` und aktualisieren Sie den Tisch.
1. Wählen Sie ein kompatibles stabiles `v6.x` F4HWN-Image aus dem Katalog oder laden Sie eine lokale `.bin`-Datei.
1. Wählen Sie Slot `1` bis `4` und geben Sie optional einen Anzeigenamen mit bis zu `15`-Zeichen ein.
1. Wählen Sie `Write to slot`, bestätigen und warten Sie auf Löschen, Schreiben und vollständige CRC-Verifizierung.

Der Slot-Katalog schließt die Original-Firmware, v5-Firmware und das laufend aktualisierte Entwicklungs-Image bewusst aus, da bei diesen Einträgen die Rückkehr zur Multiboot-Auswahl nicht gewährleistet ist.

Jeder bevölkerte Slot hat zwei unabhängige Wartungsaktionen:

* `Erase FW` entfernt das gespeicherte Firmware-Image, setzt jedoch die Konfigurationsbank dieses Slots nicht zurück.
* `Reset config` löscht die mit diesem Slot verbundenen Kanäle und Einstellungen, lässt jedoch das Firmware-Image installiert.

Siehe [Multiboot und Multiconfig](./Multiboot-and-Multiconfig) für `Main`, Slotauswahl, Konfigurationsbanken, `SetCfg` und Wiederherstellungsverhalten.

## Apps (Labs)

Die `Apps`-Ansicht verwaltet die acht experimentellen Overlay-App-Slots der Labs-Edition.

1. Starten Sie Labs normal und öffnen Sie `Apps`.
1. Aktualisieren Sie die App-Slot-Tabelle.
1. Wählen Sie die Firmware-Version, dann eine offizielle App aus dem versionierten Katalog; alternativ laden Sie eine lokale `.app`-Datei.
1. Wählen Sie den Ziel-Slot und wählen Sie `Install app`.
1. Verwenden Sie im Radio `F + 7`, wählen Sie die App aus und drücken Sie `M`.

UV Studio zeigt den App-Namen, Version, Größe und Validierungsstatus an. Das Löschen einer App löscht nur diesen App-Slot.

> [!IMPORTANT]
> Overlay-Apps sind an die Firmware ABI, API-Ebene, RAM-Adresse und Fähigkeiten gebunden. Wählen Sie die App-Katalogversion aus, die zur installierten Firmware passt. Installieren Sie kompatible Apps bei Bedarf nach einem Firmware-Update neu.

Siehe [Overlay-Apps](./Overlay-apps) für Loader-Kompatibilität und [Overlay-Anwendungen](./Overlay-applications) für den Zweck und die Steuerelemente jeder App.

## Wählen Sie das richtige Backup oder Kopie

Diese Operationen schützen oder kopieren verschiedene Teile des Radios und sind nicht austauschbar:

| Betrieb | Was es enthält | Bester Nutzen | Kalibrierverhalten |
| --- | --- | --- | --- |
| UV Studio `Calibration` | Gerätespezifische RF und Hardware-Kalibrierung | Sicherheits-Backup für ein Funkgerät | Ausdrücklich liest oder stellt die Kalibrierung wieder her; nur mit dem gleichen Radio verwenden |
| CHIRP Funkbild | Kanäle plus Einstellungen, die von dieser Treiberversion verstanden werden | Bearbeiten und Migrieren von Speichern/Einstellungen | Kein Ersatz für ein Kalibrierungs-Backup |
| UV Studio `External Flash` | `2 MiB` External-Flash-Rohbild, einschließlich Konfigurationen, Slots, Apps, Logs, Logo und Kalibrierungsdaten in der Backup-Datei | vollständiges Datei-Backup und Wiederherstellung | Wiederherstellung bewahrt bewusst die bereits auf dem Zielradio vorhandene Kalibrierung |
| AirCopy Speicher oder `Settings` | ausgewählte Speicherbänke und/oder kompatible Funkeinstellungen | Synchronisieren ausgewählter Daten zwischen zwei Funkgeräten | keine Hardwarekalibrierung kopieren |
| AirCopy `Flash 2M` | Flash direkt über ein Kabel geklont | Machen eines anderen Radios gemeinsamen externen Flash-Zustand passen die Quelle | Ausschließt und bewahrt den Kalibriersektor des Zielradios |

Machen Sie für Routine-Upgrades mindestens ein Kalibrierungs-Backup und ein CHIRP-Image. Verwenden Sie das vollständige externe Flash-Backup, bevor Sie mit Multiboot, App-Slots, Factory Recovery oder Low-Level-Speicher experimentieren.

## Externes Flash-Backup und Wiederherstellung (v1.6.0)

Dieses Tool benötigt die externen Flash-Befehle von `v6.1.0` Labs. Es ist nicht in `v6.0.0` verfügbar.

Die `External Flash`-Ansicht liest oder stellt den vollständigen externen `2 MiB` PY25Q16-SPI-Flash nach physischer Adresse wieder her. Dazu gehören Konfigurationsbanken, Firmware-Slots, App-Slots, das RF-Log, der Multiboot-Status, das Boot-Logo und andere gemeinsame Daten.

### Zurück nach oben

1. Starten Sie einen kompatiblen Labs Build normal.
1. Öffnen Sie `External Flash` und wählen Sie `Back up`.
1. Klicken Sie auf `Read external flash` und wählen Sie den seriellen Port.
1. Warten Sie, bis der gesamte Chip gelesen wird; dies kann mehrere Minuten dauern.
1. Download `external-flash.bin`.

Das Backup ist genau `2 MiB`. Speichern Sie es sicher: Es enthält Funkkonfiguration und gerätespezifische Kalibrierungsdaten.

### Wiederherstellung

1. Starten Sie einen kompatiblen Labs Build normal.
1. Öffnen Sie `External Flash` und wählen Sie `Restore`.
1. Wählen Sie ein vollständiges `2 MiB`-Backup, das von diesem Tool erstellt wurde.
1. Klicken Sie auf `Restore external flash` und bestätigen Sie die destruktive Operation.
1. Halten Sie das Radio eingeschaltet und angeschlossen, bis die Überprüfung abgeschlossen ist und das Radio neu gestartet wird.

UV Studio lehnt Dateien ab, die nicht genau `2 MiB` sind. Es funktioniert Sektor für Sektor in `4 KiB`-Einheiten und löscht oder schreibt niemals den gerätespezifischen Kalibrierungssektor. Mit der aktuellen Firmware vergleicht sie CRC32-Werte, überspringt bereits identische Sektoren, schreibt nur die verbleibenden Sektoren und überprüft jeden einzelnen. Es fällt auf einen direkten Byte-Vergleich zurück, wenn der CRC-Befehl nicht verfügbar ist.

> [!WARNING]
> Die Wiederherstellung ersetzt fast alle externen Flash-Inhalte, einschließlich Einstellungen, Protokolle, Logo, Apps, Firmware-Slots und Multiboot-Status. Der Kalibriersektor des empfangenden Radios bleibt erhalten, so dass ein vollständiges Backup von einem Radio keine Methode zum Kopieren der Kalibrierung dieses Radios in ein anderes ist.

Eine direkte Radio-Radio-Kopie von externem Flash finden Sie in der separaten `Flash 2M`-Funktion für Kabel in [AirCopy](./AirCopy#external-flash-cloning).

## Restaurierung von Fabriksoftware (v1.6.0)

Die `Factory reset`-Ansicht ist eine geführte zweistufige Wiederherstellung für die Rückgabe eines UV-K1 oder UV-K5 V3 an die passende Quansheng-Software:

1. Starten Sie `v6.1.0` Labs normal.
1. Öffnen Sie `Factory reset` und wählen Sie das genaue Modell aus: `UV-K1` oder `UV-K5 V3`.
1. Bestätige die Warnung. UV Studio lädt das passende rekonstruierte Factory-External-Flash-Image und die Stock-Firmware, überprüft dann ihre Größe und SHA-256, bevor Sie etwas schreiben.
1. UV Studio stellt den externen Flash wieder her und überprüft ihn, während der gerätespezifische Kalibrierungssektor erhalten bleibt.
1. Wenn Sie dazu aufgefordert werden, schalten Sie das Radio aus und gehen Sie in den `DFU`-Modus. Starten Sie es nicht normalerweise zwischen den beiden Phasen.
1. Wählen Sie `Continue in DFU`; UV Studio installiert die passende Stock Firmware automatisch.

Die gebündelten Aktienziele sind UV-K1 `v7.03.01` und UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Dies ist eine destruktive Softwarewiederherstellung. Es entfernt F4HWN-Einstellungen, Multiboot-Status, Firmware-Slots, Overlay-Apps, RF-Logs und das benutzerdefinierte Logo. Das äußere Bild ist ein rekonstruierter Fabrikzustand, keine unberührte physische Müllhalde. Wählen Sie das richtige Modell und unterbrechen Sie keine der beiden Phasen.

## Kalibrierung

Die Kalibrierung ist gerätespezifisch. Erstellen Sie ein Backup vor Firmware-Experimenten oder Wartung auf niedriger Ebene und benennen Sie die Datei mit dem Funkmodell oder der Seriennummer, damit Backups nicht zwischen Geräten gemischt werden.

Um es zu unterstützen:

1. Starten Sie das Radio normal.
1. Öffnen Sie `Calibration` und wählen Sie `Back up`.
1. Klicke auf `Read calibration data`.
1. Download `calibration.dat`.

Um es wiederherzustellen:

1. Starten Sie das gleiche Radio normal.
1. Öffnen Sie `Calibration` und wählen Sie `Restore`.
1. Wählen Sie seine `calibration.dat`-Datei.
1. Klicken Sie auf `Restore calibration data` und warten Sie auf die Fertigstellung.

> [!WARNING]
> Stellen Sie nur die Kalibrierung dieses Radios wieder her, es sei denn, Sie verstehen die Konsequenzen vollständig.

## Boot-Logo

Kompatible Builds können ein benutzerdefiniertes `128x64`-Monochrombild beim Start oder als Bildschirmschoner verwenden.

Um ein Logo hochzuladen:

1. Starten Sie das Radio normal.
1. Öffnen Sie `Boot Logo` und wählen Sie `Upload`.
1. Wählen Sie ein Bild in einem gemeinsamen Format wie PNG, JPEG oder BMP.
1. Passen Sie `Threshold` und `Invert colors` an, während Sie die Vorschau überprüfen.
1. Wählen Sie `Upload logo to radio`.
1. Wählen Sie `LOGO` in `POnMsg` oder einen kompatiblen Logo-Modus in `SetSav`.

Die Registerkarte `Download` liest das aktuelle Bild, zeigt es an und speichert es als `logo.png`.

## Fehlerbehebung

Wenn UV Studio nicht mit dem Radio kommunizieren kann:

* Bestätigen Sie, dass die ausgewählte Operation den korrekten normalen oder DFU-Startmodus verwendet
* Trennen Sie das Kabel, starten Sie das Radio in diesem Modus neu, verbinden Sie es wieder und wählen Sie den seriellen Port erneut aus
* Schließen Sie andere Programme oder Browser-Tabs, die möglicherweise den seriellen Port besitzen
* Überprüfen Sie, ob das Kabel Daten trägt und vollständig eingefügt ist
* Verwenden Sie eine Firmware-Edition und -Version, die die erforderlichen Funktionen freigibt
* Überprüfen Sie bei Apps oder externem Flash, ob Labs anstelle von Fusion, FieldOps oder Transfer ausgeführt wird

Das erweiterbare `Console` zeichnet Protokoll- und Betriebsdetails auf, die helfen können, einen nicht unterstützten Befehl, ein Timeout, einen Validierungsfehler oder eine falsche Datei zu identifizieren.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Aktuelle Änderungen](./Recent-changes)
* [Programmierung mit CHIRP](./Programming-with-CHIRP)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-Apps](./Overlay-apps)
* [Überlagerungsanwendungen](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menü](./Menu)
* [Erweiterte Funktionen](./Advanced-features)
* [Fehlerbehebung](./Troubleshooting)
