# AirCopy

AirCopy überträgt Speicherkanäle und Funkeinstellungen zwischen kompatiblen Funkgeräten. Es verwendet FSK über die Luft und kann, beginnend mit `v6.1.0`, auch eine direkte serielle Kabelverbindung verwenden.

> [!IMPORTANT]
> AirCopy ist in den Editionen `Transfer` und `Labs` enthalten. Es ist nicht Teil der Standard `Fusion` oder `FieldOps` Editionen.

> [!WARNING]
> AirCopy ist nicht dazu gedacht, im Gegensatz zu Firmware-Layouts kompatibel zu machen. Verwenden Sie die gleiche Firmware-Generation auf beiden Funkgeräten und wählen Sie den gleichen Datenabschnitt auf Sender und Empfänger aus. Das optimierte `v6.1.0`-Protokoll ist nicht drahtkompatibel mit früheren AirCopy-Versionen.

## Start AirCopy

1. Schalten Sie das Radio aus.
1. Halten Sie `PTT` + `SIDE BUTTON 2️⃣`, während Sie es einschalten.
1. Geben Sie alle Tasten frei, wenn der AirCopy-Bildschirm erscheint.

Die Standard-Over-the-Air-Frequenz ist `434.000 MHz` bei sehr niedriger Leistung. Sie können eine andere erlaubte Frequenz mit der Tastatur eingeben, bevor Sie mit der Übertragung beginnen.

Verwenden Sie die Navigationsschlüssel, um den gleichen Abschnitt in beiden Funkgeräten auszuwählen:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Dann starten Sie das Ziel vor der Quelle:

1. Im empfangenden Radio drücken Sie `EXIT`.
1. Im sendenden Radio drücken Sie `M`.
1. Warten Sie auf `AIR COPY OK` auf beiden Radios.

Jede Speicherauswahl überträgt `128`-Kanäle, einschließlich Kanalnamen und Attribute. `Settings` enthält Funkeinstellungen, Scanlistennamen, den von `ScnRng` verwendeten VFO-Bereich, die `MIX`-Scanlistenauswahl und die gespeicherten FoxHunt- und Beacon-Einstellungen. `All (Mem+Set)` überträgt alle acht Speicherbanken und Einstellungen in einem Durchlauf.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Zuverlässiges Protokoll in v6.0.0

`v6.0.0` führte ein anerkanntes Übertragungsprotokoll ein:

* Der Empfänger validiert Framing, Offset und CRC vor dem Speichern von Daten
* der Empfänger bestätigt gültige Daten und weist beschädigte oder unerwartete Daten zurück
* Der Absender wiederholt einen nicht bestätigten oder abgelehnten Block bis zu dreimal
* doppelte Daten werden bestätigt, ohne zweimal geschrieben zu werden, wodurch eine verlorene Bestätigung sicher wiederhergestellt wird
* Der Bildschirm meldet den Fortschritt, die Anzahl der Wiederholungen (`RT`) und die Anzahl der Empfängerfehler (`ER`)

Eine Speicherbank enthält `68` AirCopy-Blöcke von `64 bytes`; `Settings` enthält `12`-Blöcke. Da der Empfänger Quittungen sendet, senden beide Funkgeräte kurz auf der ausgewählten Frequenz.

## v6.1.0 Verbesserungen

### Schnellere Funkübertragungen

Das neue Protokoll trägt bis zu drei `64-byte`-Blöcke in einem FSK-Datenrahmen. Dies reduziert den Fixed Turnaround und Quittierungs-Overhead und macht eine vollständige Übertragung unter ähnlichen Funkbedingungen etwa doppelt so schnell.

Vor dem Senden von Daten stellt die Quelle CRC32-Hashes für Gruppen von bis zu `24`-Blöcken bereit. Das Ziel vergleicht diese Hashes mit seinen lokalen Daten und fordert nur die Blöcke an, die sich unterscheiden. Ein Backup zu wiederholen oder zwei nahezu identische Funkgeräte zu synchronisieren, kann daher viel schneller sein, als jeden Block erneut zu kopieren.

Der Fortschrittsmesser unterscheidet Daten, die bereits identisch waren, von Daten, die tatsächlich kopiert wurden. Das Protokoll bestätigt auch, dass Sender und Empfänger den gleichen logischen Datenabschnitt ausgewählt haben; eine Fehlanpassung schlägt fehl, anstatt versehentlich eine andere Karte zu schreiben.

### Kabelkopie

Die `Transfer` Edition fügt `CABLE COPY` über UART hinzu. Drücken Sie auf dem fertigen Bildschirm `* SCAN`, um zwischen Funk- und Kabeltransport zu wechseln. Der Kabelmodus verwendet die gleichen Vergleichs-, Bestätigungs-, Wiederholungs- und Auswahlprüfungen wie der Funkmodus, verwendet jedoch keine HF-Frequenz.

Die Implementierung erhöht die serielle Rate für die Übertragung und stellt die normale Rate danach wieder her. Beide Funkgeräte müssen eine passende Kabelkopier-Firmware ausführen und eine kompatible direkte serielle Verbindung verwenden.

### Klonen mit externem Blitz

Wenn `CABLE COPY` in der `Transfer`-Edition aktiv ist, kann eine zusätzliche `Flash 2M`-Auswahl den externen Flash des Radios klonen. Es vergleicht `4 KiB`-Sektoren mit CRC32 und schreibt nur verschiedene Sektoren. Der gerätespezifische Kalibriersektor wird bewusst ausgeschlossen.

> [!WARNING]
> Das externe Flash-Klonen kann Firmware-Slots, Konfigurationsbanken, Apps, Protokolle, Logos und andere gemeinsame externe Flash-Daten im empfangenden Radio ersetzen. Sichern Sie zuerst wichtige Daten, überprüfen Sie die Richtung sorgfältig und trennen Sie während des Betriebs weder das Funkgerät noch schalten Sie es aus.

## Fehlerbehebung

Wenn eine Übertragung fehlschlägt:

* bestätigen, dass beide Funkgeräte dieselbe kompatible Firmware-Version verwenden
* bestätigen, dass beide Radios die gleiche Auswahl und Transport zeigen
* Empfang mit `EXIT` starten, bevor die Übertragung mit `M` gestartet wird
* für Funkübertragung, verringern Sie die Entfernung oder entfernen Sie sich von Störungen
* für die Kabelübertragung, überprüfen Sie die direkte serielle Verbindung und verbinden Sie beide Funkgeräte wieder
* Wiederholen, ohne die Auswahl zu ändern

## Verwandte Seiten

* [Aktuelle Änderungen](./Recent-changes)
* [Erweiterte Funktionen](./Advanced-features)
* [Scannen](./Scanning)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Fehlerbehebung](./Troubleshooting)
