# Programmierung mit CHIRP

Auf dieser Seite wird erläutert, wie Sie `CHIRP` mit dem dedizierten Treiber verwenden, der in jeder Firmware-Version enthalten ist.

> [!WARNING]
> Verwenden Sie den `CHIRP`-Treiber aus der gleichen Firmware-Version wie die auf Ihrem Radio installierte.
> Verwenden Sie kein Quansheng CPS.
> Verwenden Sie keinen generischen `UV-K5`-Treiber oder einen Treiber aus einer anderen Firmware-Version.

## Vereinbarkeit

Der dedizierte `v6.1.0`-Treiber unterstützt jede offizielle `v6.1.0`-Edition auf:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` und `Labs`

Es ist nicht für:

* `UV-K5 V1 / V2`
* andere Quansheng Modelle
* nicht verwandte Firmware-Familien

Da diese Firmware ein eigenes Speicher- und Einstellungslayout verwendet, kann ein anderer Treiber die falschen Daten lesen oder schreiben. Passen Sie die Treiberversion immer der Firmware-Version an, auch wenn Sie zwischen offiziellen Editionen wechseln.

Gehen Sie nicht davon aus, dass der ältere `v6.0.0`-Treiber mit dem `v6.1.0`-Treiber austauschbar ist.

## Bevor Sie anfangen

* Stellen Sie sicher, dass das Radio die passende F4HWN-Version ausführt
* Suchen Sie die enthaltene Treiberdatei in diesem Releasepaket
* Seien Sie bereit, ein Backup des Radiobildes zu speichern, bevor Sie etwas bearbeiten

> [!NOTE]
> `CHIRP` kann diesen Treiber als experimentell anzeigen. Das ist zu erwarten.

## Upgrade auf v6.1.0

Vor dem Update von einer früheren Firmware-Generation:

1. Laden Sie das Radio mit dem Treiber herunter, der der aktuell installierten Firmware entspricht.
1. Speichern Sie dieses Bild und exportieren Sie optional die Speicherkanäle in CSV.
1. Sichern Sie die Funkkalibrierung mit [UV Studio](./UV-Studio#calibration).
1. Flashen Sie die gewählte `v6.1.0` Edition.
1. Wenn dies von der Version verlangt wird, aus der Sie migrieren, geben Sie das versteckte Menü ein und führen Sie `RESET ALL` aus.
1. Laden Sie den dedizierten `v6.1.0` CHIRP-Treiber und laden Sie ein neues Bild aus dem aktualisierten Radio herunter.
1. Kopieren und fügen Sie die alten Kanäle in das neue Bild ein und laden Sie es dann hoch.

> [!WARNING]
> Importieren Sie nicht direkt einen alten CSV über das komplette neue Radiobild. Kopieren und fügen Sie die Kanalzeilen in ein frisch heruntergeladenes Bild ein, damit das Einstellungslayout der neuen Version intakt bleibt.

## Laden Sie den dedizierten Treiber in CHIRP

1. Öffnen Sie `CHIRP`.
2. Wenn `File > Load Module...` nicht verfügbar ist, aktivieren Sie zuerst die CHIRP `Help > Developer Mode`-Funktionen (Hilfemenü), und starten Sie `CHIRP` neu.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Verwenden Sie `File > Load Module...` und wählen Sie die `f4hwn.fusion.chirp...py`-Datei aus, die in der Firmware-Version enthalten ist.
4. Sobald das Modul geladen ist, sollte `CHIRP` den `UV-K1 & UV-K5 V3 (F4HWN Fusion)`-Modelleintrag anbieten.

> [!NOTE]
> Der Moduldateiname und das CHIRP-Modelllabel behalten den historischen `Fusion`-Namen bei. Das `v6.1.0`-Modul ist dennoch der gemeinsame Treiber für alle vier offiziellen Editionen.

## Download aus dem Radio

1. Schalten Sie das Radio ein.
1. Verbinden Sie das Radio entweder mit einem kompatiblen `USB-C`-Kabel oder einem kompatiblen Doppelbuchsen-Programmierkabel am `mic/spkr`-Anschluss.
1. Stellen Sie sicher, dass der Stecker fest eingesetzt ist.
1. Wählen Sie in `CHIRP` `Radio > Download From Radio...`
1. Wählen Sie den richtigen seriellen Port.
1. Wählen Sie `Vendor`: `Quansheng`.
1. Wählen Sie `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Starten Sie den Download und warten Sie, bis das Radiobild vollständig gelesen wurde.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Wenn die Kommunikation fehlschlägt, trennen Sie das Kabel, schalten Sie zuerst das Radio ein und schließen Sie dann das Kabel wieder an. Der dedizierte Treiber warnt, dass einige Setups fehlschlagen könnten, wenn das Radio mit dem bereits angeschlossenen Kabel eingeschaltet wurde.

## Zeigen Sie die zusätzlichen Felder

Aktivieren Sie nach dem Download `View > Show Extra Fields` in `CHIRP` (Menü anzeigen).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Dies ist wichtig, da der dedizierte Treiber mehrere kanalspezifische Felder durch die `Extra`-Gruppe freigibt. Ohne `Show Extra Fields` bleiben einige Firmware-spezifische Parameter im Channel-Editor verborgen.

Typische Beispiele sind:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Edit und Upload

Sie können dann Speicher, Namen und die unterstützten Einstellungen bearbeiten.

Wenn Sie bereit sind:

1. Überprüfen Sie Ihre Änderungen.
1. Wählen Sie in `CHIRP` `Radio > Upload To Radio...`
1. Verwenden Sie den gleichen Port, Verkäufer und Modell.
1. Warten Sie, bis der Upload vollständig abgeschlossen ist, bevor Sie das Kabel berühren oder das Radio ausschalten.

> [!WARNING]
> Lassen Sie kalibrierungsbezogene oder erweiterte Elemente in Ruhe, es sei denn, Sie wissen genau, was sie tun.

## Beacon-Kennzeichnung

Die unabhängige Beacon-Anwendung verwendet die CHIRP `Message Line 1`-Einstellung als Rufzeichen. Der dedizierte Treiber akzeptiert in diesem Feld bis zu `12 characters`.

Wenn Beacon im `CALL`-Modus überträgt, konvertiert die Firmware Buchstaben in Großbuchstaben, behält Buchstaben, Ziffern und `/`, entfernt nicht unterstützte Zeichen und fügt ` MOE` hinzu. Wenn das resultierende Rufzeichen leer ist, überträgt es `MOE`.

Nachdem Sie `Message Line 1` geändert haben, laden Sie die Einstellungen in das Radio hoch, bevor Sie Beacon starten. Siehe [Beacon](./Beacon) für Übertragungsverhalten und Sicherheitsinformationen.

## Gute Praxis

* Verwenden Sie immer den Treiber, der mit derselben Firmware-Version enthalten ist
* Immer zuerst herunterladen, dann ein Backup speichern
* Nach einem Firmware-Update laden Sie das neuere Treibermodul von diesem Release neu
* `CHIRP` für die Massenprogrammierung verwenden, nicht Quansheng CPS

## Wenn etwas falsch aussieht

Überprüfen Sie diese Punkte:

1. Das Radio ist wirklich ein `UV-K1` oder `UV-K5 V3`
1. das Radio läuft die erwartete F4HWN Version und Edition
1. `CHIRP` hat den Treiber aus demselben Release geladen, nicht ein anderes `UV-K5`-Modul
1. Das Kabel ist vollständig eingelegt
1. Der ausgewählte serielle Port ist der richtige

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Funkbetrieb](./Radio-operation)
* [Beacon](./Beacon)
* [Fehlerbehebung](./Troubleshooting)
