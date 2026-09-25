# Overlay-Apps

Overlay-Apps sind kleine `.app`-Programme, die in externem Flash gespeichert und nur beim Start in einen dedizierten `4 KiB`-RAM-Arbeitsbereich geladen werden. Sie lassen die experimentelle `Labs`-Edition Tools, Radiomodi, visuelle Demos und Spiele hinzufügen, ohne jede App dauerhaft in den internen Flash der Firmware einzufügen.

> [!WARNING]
> Overlay-Apps sind eine experimentelle `v6.0.0`-Funktion. Derzeit enthält nur die `Labs` Edition den App-Loader. Apps sind an eine Firmware-ABI, API-Ebene, RAM-Adresse und optionale Resident-Funktionen gebunden; aktualisieren oder installieren Sie eine App neu, wenn das Radio einen Kompatibilitätsfehler meldet.

## Wie die Plattform funktioniert

Das Funkgerät bietet `8` App-Slots im externen Flash-Speicher. Jeder Slot enthält einen Header sowie höchstens `4 KiB` App-Code. Bevor eine App ausgeführt wird, prüft der Loader:

* App-Datei/Header-Format und Commited State
* die erforderliche ABI und minimale API-Ebene
* Codegröße und RAM-Link-Adresse
* Die App benötigt Resident Firmware Fähigkeiten
* ein CRC-32 des Codes, nachdem er in den RAM geladen wurde

Die interne Firmware Flash wird nie neu geschrieben, wenn eine App installiert, gestartet oder gelöscht wird. Eine schlechte oder inkompatible App wird sauber abgelehnt, anstatt ausgeführt zu werden.

Der aktuelle Katalog enthält elf Apps: Funktools wie `Broadcast FM`, `FoxHunt`, `Beacon` und `Beam` sowie `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` und `Space Impact`. Siehe [Overlay-Anwendungen](./Overlay-applications) für die dokumentierten Apps und deren Steuerelemente. Die Verfügbarkeit hängt von den App-Binärdateien ab, die für die ausgewählte Firmware-Version verteilt sind, und von den Funktionen, die in der laufenden Labs-Firmware zusammengefasst sind.

## Installieren einer App mit UV Studio

1. Starten Sie das Radio normal mit der `Labs` Edition.
1. Verbinden Sie es mit einem Desktop-Browser mit einer unterstützten USB-Datenverbindung.
1. Öffnen Sie [UV Studio](https://armel.github.io/uvstudio/) und wählen Sie `Apps` (`Labs only`).
1. Wählen Sie die Firmware-Version und eine kompatible App aus dem offiziellen Katalog oder wählen Sie eine lokale `.app`-Datei aus.
1. Wählen Sie den Ziel-App-Slot.
1. Wählen Sie `Install app` und warten Sie, bis das Schreiben und die Verifizierung abgeschlossen sind.

UV Studio kann die Slot-Tabelle aktualisieren, den Namen, die Version, die Größe und den Status jeder App anzeigen und eine App löschen, ohne den Rest des Radios zu berühren.

Die App-Slots sind in UV Studio und im On-Radio `F + 7` Launcher `1` bis `8` nummeriert.

## Starten einer App

1. Vom normalen Radiobildschirm drücken Sie `F`, dann `7 VOX`.
1. Verwenden Sie `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1, um einen der acht angezeigten Slots auszuwählen. Das aktive Layout folgt `SetNav`.
1. Drücken Sie `M`, um die ausgewählte App auszuführen.
1. Verwenden Sie die von dieser App angezeigten Steuerelemente; In den meisten Apps kehrt `EXIT` zum App-Launcher oder zum normalen Radiobildschirm zurück.

Leere Slots bleiben im Launcher sichtbar. Die ausgewählte Slot- und Scroll-Position wird gespeichert, bis das Radio neu gestartet wird. Der Launcher und kompatible Apps sind in UV Studio gespiegelt.

Einige Apps können auch eine der normalen programmierbaren Aktionen bewerben: `FM RADIO`, `FOX HUNT`, `BEACON` oder `BEAM`. Wenn die passende app installiert und gültig ist, kann diese aktion sie direkt von einem zugewiesenen schlüssel oder dem side-key-action-picker starten. Wenn mehr als eine installierte app die gleiche aktion ankündigt, wird der kompatible slot mit der niedrigsten nummer verwendet.

## Kompatibilitätsmeldungen

| Funknachricht | Bedeutung / Handlung |
| --- | --- |
| `UPDATE APP` | das App-Format, die ABI, die Größe oder die Linkadresse älter oder inkompatibel ist; Installieren Sie eine passende App |
| `UPDATE FIRMWARE` | Die App benötigt eine neuere App-API; Aktualisieren der Labs-Firmware |
| `REINSTALL APP` | das Schreiben ist unvollständig oder der Code CRC ist falsch; installieren Sie die `.app`-Datei erneut |
| `NOT SUPPORTED` | Die App benötigt eine Resident-Funktion, die dieser Labs-Build nicht enthält |
| `NO APP` | Der ausgewählte slot ist leer oder hat keinen gültigen app-header. |

Nach dem Beenden einer App stellt der Loader den ausgewählten VFO, das Empfangen / Dual-Watch-Tuning, das Handling mit Hintergrundbeleuchtung und den externen Flash-Cache wieder her. Apps, die unterstützte freigegebene Daten ändern, wie z. B. Broadcast FM-Presets oder Beam-Kanaldaten, bitten die ansässige Firmware, sie zu begehen, nachdem der Overlay-Code nicht mehr ausgeführt wird.

## Erstellen von Apps aus der Quelle

Entwickler können die im Firmware-Repository vorhandenen Apps erstellen mit:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Generierte `.app`-Dateien werden in `build/Apps/` abgelegt. Jede App wird unter der konfigurierten Overlay-Adresse der Firmware verknüpft und mit Metadaten und CRC gepackt. Erstellen Sie Apps neu, wenn sich die ABI, die API, die erforderlichen Funktionen oder die Überlagerungsadresse ändern.

## Verwandte Seiten

* [Überlagerungsanwendungen](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot und Multiconfig](./Multiboot-and-Multiconfig)
* [Tastenfunktionen](./Button-functions)
* [Aktuelle Änderungen](./Recent-changes)
* [Erweiterte Funktionen](./Advanced-features)
