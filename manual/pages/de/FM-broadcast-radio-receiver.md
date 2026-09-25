# FM Rundfunkempfänger

Das Radio kann Broadcast FM von `76` nach `108 MHz` empfangen. Es verwendet einen separaten Chip (`BK1080`) dafür. RDS wird nicht unterstützt.

Während des normalen Broadcast-Hörens hat der aktive VFO immer noch Priorität. Der Empfang auf dem aktiven VFO deaktiviert vorübergehend Broadcast-Audio; am Ende des VFO-Empfangs schaltet das Radio wieder auf Broadcast um. Während ein manueller oder automatischer FM-Station-Scan aktiv ausgeführt wird, ignoriert `v5.9.0` vorübergehend den Hauptkanalempfang, so dass der Stationsscan ohne Unterbrechung beendet werden kann.

> [!NOTE]
> Wenn diese Seite `UP` / `DOWN` erwähnt, verwenden Sie die entsprechenden `LEFT` / `RIGHT`-Schlüssel auf UV-K1. Das aktive Navigationslayout folgt `SetNav`.

> [!NOTE]
> - der aktive VFO hat Priorität beim normalen Rundfunkhören, aber nicht während eines aktiven UKW-Scans
> Auto-Scan überschreibt alle `48` FM-Speicher

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Basisoperationen

* `F` + `0 FM`, langes Drücken von `0 FM` oder eine [benutzerdefinierte Tastenfunktion](./Button-functions#custom-button-functions) startet den Rundfunkempfang
* `EXIT`, oder mit dem gleichen Startbefehl wieder, während das Radio im FM-Modus ist, beendet Broadcast-Empfang
* `F` + `3 VFO/MR` oder `3 VFO/MR` mit langem Drücken wechselt zwischen VFO-Modus und Speichermodus

### Frequenz im FM-VFO-Modus einstellen

Einfach eine Frequenz einzugeben, stimmt den Empfänger ab. Die Auflösung ist `100 kHz`, so dass die Eingabe `929` Melodien zu `92.9 MHz`. Verwenden Sie die Pfeiltasten, um in `100 kHz`-Schritten zu ändern.

### Ändern Sie die FM Broadcast Range

Wenn Sie die Station, die Sie erwarten, nicht stimmen können, befinden Sie sich möglicherweise in der falschen UKW-Sendebereich.

Während der FM-Broadcast-Empfang aktiv ist, drücken Sie lange `1 BAND`, um die verfügbaren FM-Bereiche zu durchlaufen:

* `87.5` bis `108 MHz`
* `76` bis `108 MHz`
* `76` bis `90 MHz`
* `64` bis `76 MHz`

Der aktuell ausgewählte Bereich wird unten links auf dem FM-Bildschirm angezeigt, beispielsweise `87.5-108M`.

Direktabstimmung, manueller Scan, Auto-Scan und UKW-Speicher funktionieren nur innerhalb des aktuell ausgewählten Bereichs. Wenn sich eine Station oder ein gespeicherter FM-Speicher außerhalb dieses Bereichs befindet, wechseln Sie zuerst zu einem anderen FM-Band.

### Speichern Sie im Speicher aus dem FM-VFO-Modus

Durch Drücken von `M` im VFO-Modus können Sie die aktuelle Frequenz in einem Speicherkanal speichern. Verwenden Sie die Pfeiltasten, um den Speicher auszuwählen, und bestätigen Sie dann mit `M`. `48`-Erinnerungen stehen zur Verfügung.

### Wählen Sie ein Gedächtnis

Im MR-Modus wählt die Eingabe von `01` in `48` einen Speicherkanal aus. Verwenden Sie `UP` / `DOWN`, um durch Speicherkanäle zu treten.

### Löschen eines gespeicherten Speichers

Im MR-Modus können Sie mit `M` diesen Speicherkanal löschen.

## Scannen nach Stationen von FM-VFO

### Auto-Scan

Beginnen Sie mit `F` + `* Scan` oder durch langes Drücken von `* Scan`.
Das Radio scannt nach Stationen und speichert die ersten `48`-Stationen im Speicher. Das Scannen beginnt an der unteren Seite des Bandes. Das Starten des Auto-Scans löscht zuvor gespeicherte Kanäle. `EXIT` beendet den Auto-Scan.

Während der Auto-Scan ausgeführt wird, unterbricht ein auf dem Haupt-Transceiver-Kanal detektiertes eingehendes Signal den FM-Scan nicht. Die normale Hauptkanalpriorität wird wiederhergestellt, sobald das FM-Scannen aufhört.

### Manueller Scan

Ein kurzer Druck auf `* Scan` startet den manuellen Scan. Das Radio scannt von der aktuellen Frequenz nach oben, bis eine Station empfangen wird. Sie können in beiden Richtungen mit den Pfeiltasten weiter scannen. `EXIT` stoppt den Scan-Modus

Die gleiche temporäre Hauptkanalausnahme gilt während des manuellen Scans. Sobald der Scan auf einer Station stoppt oder abgebrochen wird, wird das normale Rundfunkhören wieder auf den Empfang auf dem aktiven VFO übertragen.

## Tastenfunktionen

* `1 BAND` - lange Presse, Switch FM Broadcast-Bereiche
* `3 VFO/MR` - Schaltfrequenz/Speichermodus
* `* SCAN`
   * Short Press - Single Scan starten
   * lange Drücken - Auto-Scan starten (alle Speicherkanäle werden gelöscht und durch Scan-Ergebnis ersetzt)

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Tastenfunktionen](./Button-functions)
* [Funkbetrieb](./Radio-operation)
* [Fehlerbehebung](./Troubleshooting)
