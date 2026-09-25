# Erweiterte Funktionen

Diese Seite behandelt spezielle oder optionale Funktionen, die für den grundlegenden Funkbetrieb nicht benötigt werden: BEAM, RF-Log, RescueOps, UV Studio, den Wiederaufnahmemodus, das eingebaute Spiel und das forschungsorientierte TX-Entsperrverfahren. AirCopy, FoxHunt, Beacon, Multiboot und Overlay-Apps haben ihre eigenen detaillierten Seiten.

Für die tägliche Funknutzung siehe [Radiobetrieb](./Radio-operation). Für scanbezogene Funktionen siehe [Scannen](./Scanning).

> [!NOTE]
> Wenn diese Seite `UP` / `DOWN` erwähnt, verwenden Sie die entsprechenden `LEFT` / `RIGHT`-Schlüssel auf UV-K1. Das aktive Navigationslayout folgt `SetNav`.

## AirCopy

AirCopy überträgt Speicherbanken und Einstellungen zwischen kompatiblen Funkgeräten. `v6.0.0` fügte bestätigte Blöcke, Wiederholungen, doppelte Handhabung und `All (Mem+Set)` hinzu. `v6.1.0` fügt Multi-Block-Rahmen, Vergleich und Überspringen identischer Blöcke, Kabeltransport und geschütztes externes Flash-Klonen in der Transfer-Edition hinzu.

Siehe [AirCopy](./AirCopy) für Editionsverfügbarkeit, Steuerelemente, Protokollkompatibilität, Funkübertragungen, `CABLE COPY` und `Flash 2M` Sicherheitsinformationen.

## Multiboot, Multiconfig und Overlay-Apps

`v6.0.0` fügt zwei größere Plattformen hinzu, die separat dokumentiert sind:

* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig) erklärt `Main` plus vier Firmware-Slots, den Startup-Selektor, unabhängige Konfigurationsbanken, `SetCfg` und UV Studio Slot Management.
* [Overlay-Apps](./Overlay-apps) erklärt die `.app`-Plattform, die Installation über UV Studio, den `F + 7`-Launcher, Kompatibilitätsprüfungen und App-Entwicklung.

## BEAM Übertragungsmodus

BEAM ist ein optionaler Direktübertragungsmodus für einen VFO oder Speicherkanal. Im Gegensatz zu [AirCopy](./AirCopy), das Speicherbänke oder Einstellungsabschnitte überträgt, ist BEAM dafür gedacht, das aktuell ausgewählte Setup schnell mit einem anderen kompatiblen Radio zu teilen.

Weisen Sie `BEAM` einer der anpassbaren Verknüpfungen (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long`) zu und lösen Sie diese Verknüpfung dann aus, um den BEAM-Modus zu öffnen.

Im BEAM-Modus:

* `UP` / `DOWN` wechselt zwischen `BEAM TX` und `BEAM RX`
* `M` startet die ausgewählte Operation
* `EXIT` verlässt BEAM-Modus

`BEAM TX` sendet die aktuelle VFO- oder Speicherkanalkonfiguration, einschließlich Frequenz, Offset, Töne, Modulation, Bandbreite, Leistung, Scanlistenzuweisung, Kompander, DTMF-bezogene Einstellungen, wenn aktiviert, und Kanalname.

`BEAM RX` wartet auf ein BEAM-Paket von einem anderen Radio und speichert es auf dem ersten freien Speicherkanal. Wenn der Speicher voll ist, zeigt der Status `MEM FULL` an.

Siehe [Tastenfunktionen](./Button-functions#beam-action) für die Details der Verknüpfungsebene.

## FoxHunt

[FoxHunt](./Fox-Hunt) ist eine reine Signalstärke- und Richtungsfindungsanwendung. Seit `v6.0.0` hat es seine eigene `FOX HUNT`-Shortcut-Aktion. Es befindet sich in FieldOps und ist als installierbare Overlay-App in Labs verfügbar.

## Beacon

[Beacon](./Beacon) ist eine separate Morse-Übertragungsanwendung im ARDF-Stil mit eigener `BEACON`-Verknüpfung und Sicherheitsanforderungen. Es ist in FieldOps ansässig und als separate installierbare Overlay-App in Labs verfügbar.

## RF-Log

Builds mit RX/TX-Protokollierung fügen eine `RF LOG`-Verknüpfungsaktion hinzu. Weisen Sie es `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long` zu und lösen Sie dann diese Verknüpfung aus, um den Verlaufsbildschirm zu öffnen.

Die RF-Protokolldatensätze empfangen, überwachen und übertragen Sitzungen zu externen Flash. Es ist nützlich, um die jüngsten Aktivitäten nach dem Scannen zu überprüfen, einen unbeaufsichtigten Kanal zu überwachen oder Übertragungen während der Feldnutzung zu überprüfen.

Jeder protokollierte Traffic-Eintrag speichert:

* Frequenz oder die Speicherkanalreferenz, wenn die Sitzung von einem gespeicherten Kanal kam
* RX- oder TX-Richtung
* Sitzungsdauer
* Spitzenpegel des RX-S-Meters für empfangene Sitzungen oder TX-Leistungspegel für gesendete Sitzungen
* niedrigste Batteriespannung während der Sitzung gemessen

Die Log-Ansicht zeigt zuerst die neuesten Einträge und zeigt bis zu 512 Traffic-Einträge. Wenn der `ALL`-Filter ausgewählt ist, markieren horizontale Trennlinien den Neustart des Radios.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Steuerelemente auf dem RF-Logscreen:

* `UP` / `DOWN`: Blättern Sie durch Einträge
* `F` + `UP`: Sprung zum neuesten Eintrag
* `F` + `DOWN`: Sprung zum ältesten sichtbaren Eintrag
* `M`: Zyklus des Filters zwischen `ALL`, `RX` und `TX`
* `* SCAN`: Zyklus der rechten Seite Detailabzeichen zwischen Dauer, S-Meter / TX-Leistung und niedrigste Batteriespannung
* Long-Presse `M`: Öffnen Sie die eindeutige Bestätigung; Long-Presse `M` erneut auf `CLEAR LOG / SURE?`, um das Protokoll zu löschen
* `EXIT`: Verlassen Sie den RF-Protokollbildschirm oder stornieren Sie die eindeutige Bestätigung

Das Protokoll wird in einem reservierten externen Flash-Bereich gespeichert, so dass es normale Leistungszyklen übersteht. Das Löschen des Protokolls löscht diesen reservierten Bereich.

Siehe [Tastenfunktionen](./Button-functions#rf-log-action) für die Details der Verknüpfungsebene.

## RescueOps

### Disclaimer

Ich möchte klarstellen, dass ich kein Experte für Notdienste bin; diese Besonderheit wurde jedoch mit der Absicht entwickelt, den Kommunikationsbedürfnissen der Ersthelfer so effektiv wie möglich gerecht zu werden. Ich bin offen für Verbesserungsvorschläge von Fachleuten, innerhalb der Grenzen meiner Fähigkeiten, der mir zur Verfügung stehenden Zeit und der technischen Fähigkeiten des Transceivers.

### Übersicht

Die RescueOps-Funktion wurde speziell für die Integration in ein Kommunikationssystem für Ersthelfer (Feuerwehrleute usw.) entwickelt. Es fügt eingeschränkte Feldsteuerungen und verbessertes Flashlight-Verhalten hinzu, das auf feste, blinkende oder SOS-Modi eingestellt werden kann. Das `SetKey`-Menü wählt den Startschlüssel aus, der mit `PTT` verwendet wird, um den RescueOps-Modus zu betreten oder zu verlassen. Standardmäßig ist der Schlüssel `MENU`, kann aber auch `UP`, `DOWN`, `EXIT` oder `* SCAN` sein.

In der offiziellen `v6.0.0`-Familie ist RescueOps in `FieldOps` und `Labs` enthalten. AirCopy ist eine separate Funktion, die von `Transfer` und `Labs` bereitgestellt wird; RescueOps zu aktivieren, aktiviert AirCopy nicht von selbst.

### Verwendung

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), Mitglied der [Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco) hat [Dokumentation](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) speziell für die Verwendung der RescueOps-Funktion geschrieben. Vielen Dank an ihn.

Standardmäßig funktioniert der Transceiver wie jede andere Firmware-Version und ermöglicht den Zugriff auf Menüs (und versteckte Menüs), lange Drücke oder `F`-Tastenkombinationen, um verschiedene Funktionen direkt von der Tastatur aus zu aktivieren (z. B.: um einen Scan zu starten oder die Sendeleistung anzupassen, sowie Abkürzungen.

Wenn der Transceiver jedoch eingeschaltet ist, während er sowohl den `PTT` als auch die im `SetKey`-Menü konfigurierte Taste drückt, wechselt er in den RescueOps-Modus und löst die folgenden Änderungen aus:

* Das Menü ist gesperrt
* lange Drücke und `F` Tastenkombinationen sind deaktiviert (außer `A/B` und Tastaturschloss)
* Neustart im versteckten Menü-Modus ist blockiert
* Die Tastatur kann nur verwendet werden, um Speicherkanäle zu ändern, genau wie die `UP`- und `DOWN`-Tasten

Kurze und lange Pressen auf `F1` und `F2` sowie lange Pressen auf `M` bleiben für Abkürzungen verfügbar. Diese Konfiguration liegt in der Verantwortung der Person, die für die Einrichtung des Transceivers verantwortlich ist. Wenn Verknüpfungen nicht gewünscht sind, können sie einfach auf die Aktion `NONE` gesetzt werden.

Beachten Sie, dass die RescueOps-Funktion zwei neue Aktionen bietet:

* `POWER HIGH`, mit dem Sie bei Bedarf schnell auf die maximale Leistung von `5 W` umschalten können
* `REMOVE OFFSET`, um den Offset eines Speicherkanals vorübergehend zu entfernen, falls vorhanden

Diese 2 Aktionen wurden auf Wunsch von Rettungskräften hinzugefügt und entsprechen den Bedürfnissen vor Ort.

Einmal im RescueOps-Modus hält jeder normale Start den Transceiver in diesem Modus. Um in den Standardmodus mit Zugriff auf Menüs und versteckte Menüs zurückzukehren, wiederholen Sie einfach den Startvorgang, während Sie sowohl die `PTT` als auch die im `SetKey`-Menü konfigurierte Taste drücken.

## Spiel

Diese Firmware enthält ein kleines Breakout-Spiel.

* In Builds ohne Overlay-Apps drücken Sie `F+7`, um das Resident-Spiel zu starten.
* In der `Labs`-Edition öffnet `F+7` den [Overlay-App Launcher](./Overlay-apps); installieren und wählen Sie dort `Breakout` oder ein anderes Spiel aus.
* Zum Beenden drücken Sie `EXIT`
* Sie können das Spiel mit `M` anhalten
* Bewegen Sie das Paddel mit `4` oder `UP` nach links und `0` oder `DOWN` nach rechts.

Dieses Spiel hat keinen Ehrgeiz jenseits von Spaß. Die Idee war einfach zu erkunden, was auf dem Quansheng K5 neben seinen Funkfunktionen möglich ist. Betrachten Sie es als eine spielerische Anspielung auf die Nokia 3310-Ära.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## Wiederaufnahmemodus

Ihr Transceiver wird in dem Zustand neu gestartet, in dem er sich befand, bevor er ausgeschaltet wurde. Wenn es sich also im Bandscope-Modus befand, UKW-Sendungen hört oder scannt, wird dieser Zustand beim nächsten Start automatisch wieder aufgenommen.

## TX auf allen Bändern

### Warnung

**Diese Modifikation ist UNTESTED und dient NUR der FORSCHUNG, um die Fähigkeiten des Geräts und seines Chipsatzes zu erkunden. Sende nicht auf illegalen Frequenzen. Verwenden Sie eine Dummy Load. Die Autoren und Mitwirkenden dieses Repositorys haften NICHT für Schäden, Rechtsstreitigkeiten oder andere Folgen des Missbrauchs dieser Forschungsfirmware und akzeptieren keine Schuld. Durch die Installation einer Firmware aus diesem Repository übernehmen Sie die volle Verantwortung für etwaige Konsequenzen und verzichten auf das Recht, rechtliche Schritte gegen den/die Autor(en) einzuleiten.**

Diese Option erlaubt es Ihnen nicht, in einer anderen Modulation als FM zu übertragen; Dies ist eine Hardwarebeschränkung. Der Wechsel zu AM oder SSB ändert nur den AF-Audioausgabemodus des RF-ICs. Es schaltet nicht den gesamten IC in den AM / SSB-Modus. Dies ist nur zum Zuhören. Diese Firmware ist auch mit einer zusätzlichen Sperre ausgestattet, die TX blockiert, wenn AM oder SSB aktiviert ist.

Als Beispiel dafür, warum dies nicht für die eigentliche Kommunikation verwendet werden sollte, betrachten Sie die folgende Tabelle für die Übertragungsleistung bei `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 Mikrowatt**
* `54 MHz` -> 2,4 Milliwatt
* `81 MHz` -> 230 Milliwatt
* `109 MHz` -> 558 Milliwatt
* `136 MHz` -> 412 Milliwatt
* `163 MHz` -> 122 Milliwatt
* `190 MHz` -> 14,8 Milliwatt
* `218 MHz` -> 2 Milliwatt
* `245 MHz` -> 2,6 Milliwatt

Credits: [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### So entsperren Sie TX auf allen Bändern

1. Gehen Sie zum [versteckten Menü](./Menu#hidden-menu)
1. Menü eingeben `F Lock`
1. Wählen Sie Option `UNLOCK ALL`
1. Wiederholen Sie die Schritte 2-3 **3 mal **. Tun Sie es vorsichtig. Wenn Sie eine andere Option im Prozess bestätigen, wird der Zähler zurückgesetzt und Sie müssen den Vorgang erneut wiederholen.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Funkbetrieb](./Radio-operation)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menü](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-Apps](./Overlay-apps)
* [Tastenfunktionen](./Button-functions)
* [Fehlerbehebung](./Troubleshooting)
