# Scannen

Diese Seite gruppiert alle scanbezogenen Funktionen: Frequenzscan, Speicherscan, Scanlisten, `ScnRng`, Frequenzkopie und DCS / CTCSS-Scan.

Für den täglichen VFO-/Kanalbetrieb siehe [Radiobetrieb](./Radio-operation). Für Spektrum Sweep Nutzung, siehe [Spectrum Analyzer](./Spectrum-analyzer).

## Auf dieser Seite

* [Frequenzscanning](#frequency-scanning)
* [Speicherkanäle scannen](#memory-channels-scanning)
* [MIX-Scanliste](#mix-scan-list-v610)
* [Motormodus scannen: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Scan Indikatoren und Erkennung](#scan-indicators-and-detection)
* [Frequenzkopie und DCS / CTCSS-Scanning](#frequency-copy-and-dcs--ctcss-scanning)
* [Verwandte Seiten](#related-pages)

> [!TIP]
> Wenn der Speicherscan defekt erscheint, ist die häufigste Ursache eine leere aktive Scan-Liste. Siehe [Fehlerbehebung](./Troubleshooting) für die Schnellprüfungen.

## Frequenzabtastung

Um einen Frequenzscan zu starten, schalten Sie einen VFO in den Frequenzmodus. Setzen Sie eine Startfrequenz. Stellen Sie einen Frequenzschritt ein (Menü `Step`). Starten Sie das Scannen mit einer [Benutzerdefinierte Scan-Taste Funktion](./Button-functions#custom-button-functions) oder durch langes Drücken der `* Scan`-Taste.

### Scanfrequenzbereichsfunktion

* Umschalten in den Frequenzmodus
* Setzen Sie die oberen und unteren VFO-Frequenzen auf die Scan-Bereichsgrenzen
* `5 NOAA` lange drücken; das `ScnRng`-Label sollte erscheinen
* Starten Sie den Scan durch langes Drücken von `* Scan`
* Das Radio scannt zwischen den ausgewählten Grenzen
* `5 NOAA` oder `EXIT` langdrücken oder VFOs wechseln, um den `ScnRng`-Modus zu verlassen

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

Die `ScnRng`-Funktion wird auch vom Spektrumanalysator unterstützt. Wenn Sie `ScnRng` bereits aktiviert haben, starten Sie einfach den [Spektrumanalysator](./Spectrum-analyzer).

Wenn Sie [AirCopy](./AirCopy) verwenden und `Settings` übertragen, ist der VFO-Bereich enthalten. Dies kopiert auch die aktuellen `ScnRng`-Grenzfrequenzen des Quellradios auf das Zielradio.

### Ausgenommen Frequenzen in ScnRng

Während ein `ScnRng`-Scan auf einer empfangenen Frequenz gestoppt wird, drücken Sie lange `MENU`, um diese Frequenz vom aktuellen Bereichsscan auszuschließen.

Bis zu **64** Reichweiten-Frequenzen können ausgeschlossen werden. Die Liste ist kreisförmig: Nach 64 Ausschlüssen ersetzt das Hinzufügen eines weiteren den ältesten gespeicherten Ausschluss.

Diese Ausnahmen sind vorübergehend. Sie werden nur für das aktive `ScnRng`-Setup aufbewahrt und nicht in den Speicher geschrieben. Sie werden gelöscht, wenn das Radio neu gestartet wird, und sie werden auch gelöscht, wenn sich die Entfernungsidentität ändert: Startfrequenz, Stoppfrequenz oder Scanschritt.

## Abtasten von Speicherkanälen

Memory-Scan lässt das Radio gespeicherte Speicherkanäle scannen, anstatt durch Frequenzen zu treten.

Um es zu verwenden, schalten Sie den VFO in den **Speichermodus ** und starten Sie dann den Scan mit einer programmierten Scantaste oder durch langes Drücken von `* Scan`.

### Scanlisten

Das Radio bietet **24 Scanlisten **. Jeder Speicherkanal kann zugeordnet sein:

* `OFF`: Der Kanal ist von Scanlisten ausgeschlossen
* `1` bis `24`: Der Kanal gehört zu einer bestimmten Scan-Liste
* `ALL`: Der Kanal ist in allen Scanlisten enthalten

Ein Speicherkanal kann jeweils nur zu einem dieser Zustände gehören.

`MIX` ist ein aktiver Scan-Modus, keine weitere pro-Kanal-Zuweisung. Es kombiniert mehrere der nummerierten Listen; siehe [MIX-Scanliste](#mix-scan-list-v610).

### Zuweisung eines Kanals zu einer Scan-Liste

Um die Scanlistenzuordnung des aktuellen Speicherkanals zu ändern:

* Öffnen Sie das `ScList` Menü
* oder Long-Presse `5 NOAA` für die schnelle Zuordnung Shortcut

Die Quick Shortcut zyklisiert den Kanal durch:

* `OFF`
* `1` bis `24`
* `ALL`

Die aktuelle Zuordnung wird rechts neben dem Kanalnamen angezeigt.

### Benannte Scanlisten

Scan-Listen können kurze Namen haben.

Wenn eine Liste einen Namen hat, zeigt das Radio den **3-Zeichennamen** anstelle der numerischen Listennummer an, wenn möglich:

* in scanbezogenen Statusindikatoren
* in Listenauswahlmenüs
* im Channel List-Assignment Display

Wenn eine Liste keinen Namen hat, zeigt das Radio stattdessen die Listennummer an.

### Aktive Scan-Liste

Memory Scan verwendet immer eine **aktive Scan-Liste**.

Die aktuell aktive Liste wird oben links auf dem Bildschirm beim Scannen angezeigt:

* `01` bis `24` für eine nummerierte Liste
* `MIX` für die gespeicherte Kombination ausgewählter Listen, beginnend mit `v6.1.0`
* `ALL` für alle aufgeführten Kanäle

Wenn die ausgewählte Liste einen Namen hat, wird dieser Kurzname anstelle der Nummer angezeigt.

Wenn die ausgewählte Liste leer oder ungültig ist, wechselt das Radio automatisch zur nächsten gültigen, nicht leeren Liste.

### Starten des Memory Scans

Sobald Kanäle Listen zugewiesen wurden, starten Sie den Speicherscan mit:

* Verwenden eines Schlüssels, der der Scan-Funktion zugewiesen ist
* oder Langdruck `* Scan`

Das Radio scannt dann die Speicherkanäle, die zur aktuell aktiven Scan-Liste gehören.

### Ändern der Scan-Liste während des Scans

Die aktive Scan-Liste kann geändert werden, ohne den Scan zu stoppen.

* `* Scan`: Wechsel zur nächsten gültigen, nicht leeren Scan-Liste
* `F + navigation key`: Durchsuchen von Scanlisten während des Scannens (`UP` / `DOWN` auf UV-K5, `LEFT` / `RIGHT` auf UV-K1)
* direkter Zugang zur Tastatur:
  * `01` bis `24`: Wählen Sie diese Scan-Liste direkt aus
  * `25`: Wählen Sie `MIX`, beginnend mit `v6.1.0`
  * `00`: Wählen Sie `ALL`

Wenn die angeforderte Liste leer ist, piept das Radio und springt zur nächsten gültigen, nicht leeren Liste.

Wenn ein Speicherscan Listen wechselt, ersetzt der Listenname vorübergehend den Fortschrittsmesser. In `v5.9.0` wird die Scan-Wiederaufnahme gehalten, während dieser Name tatsächlich sichtbar ist, so dass die versteckte Anzeige und die aktuelle Scan-Position nicht auseinander driften und dann nach vorne springen können, wenn die Anzeige zurückkehrt.

Dieser kurze Halt gilt nur für den Memory-Scan. Frequenz-Scan und `ScnRng` können immer noch den gleichen Overlay-Countdown durch ihre Steuerelemente aktivieren, aber sie zeigen keinen Scanlistennamen an und fahren daher ohne eine ungeklärte Pause fort.

### MIX-Scanliste (v6.1.0)

`MIX` scannt mehrere nummerierte Listen als eine kombinierte Menge, ohne die Liste eines Kanals zu ändern. Ein Kanal ist enthalten, wenn:

* es gehört zu einer der nummerierten Listen, die im `MIX`-Editor aktiviert sind, oder
* Seine Kanalzuweisung ist `ALL`

`OFF` zugewiesene Kanäle bleiben ausgeschlossen. Ein Kanal hat immer noch nur eine Zuweisung (`OFF`, `01` bis `24` oder `ALL`); `MIX` speichert eine separate Auswahlmaske, die beschreibt, welche nummerierten Listen kombiniert werden sollen.

So konfigurieren Sie `MIX`:

1. Öffnen Sie `ScList`.
1. Wählen Sie `MIX` und drücken Sie `M`.
1. Verwenden Sie die Navigationstasten, um durch die Listen `01` bis `24` zu gehen, oder geben Sie eine zweistellige Listennummer ein, um direkt zu ihr zu springen.
1. Drücken Sie `M`, um die hervorgehobene Liste `ON` umzuschalten oder auszuschalten.
1. Drücken Sie `EXIT`, um die Auswahl zu speichern, und machen Sie `MIX` zum aktiven Scanmodus.

Der Editor zeigt die Anzahl der ausgewählten Listen als `NN/24` an. Mindestens eine Liste muss aktiviert bleiben; der Versuch, die zuletzt ausgewählte Liste zu deaktivieren, erzeugt einen Fehlerpiepton.

Die normale Scanlistensequenz wird `01` bis `24`, dann `MIX`, dann `ALL`. Geben Sie während eines aktiven Speicherscans `25` ein, um `MIX` direkt auszuwählen, oder `00`, um `ALL` auszuwählen. Wenn das resultierende `MIX` keinen gültigen scannbaren Kanal enthält, piept das Radio und wechselt zum nächsten gültigen Modus.

Die gespeicherte `MIX`-Maske ist Teil der Funkeinstellungen und ist in einer [AirCopy](./AirCopy) `Settings`-Übertragung enthalten.

### Scanrichtung ändern

Drücken Sie beim Scannen eine Navigationstaste:

* `UP` / `DOWN` auf UV-K5
* `LEFT` / `RIGHT` auf UV-K1

Dadurch wird die Richtung umgekehrt, in der Speicherkanäle in der aktuellen Scan-Liste durchlaufen werden.

### Prioritätsscan

Das Radio unterstützt zwei prioritäre Kanäle:

* `PriCh1`
* `PriCh2`

Diese werden im Menü konfiguriert und durch die `ScPri`-Einstellung gesteuert.

#### Wie es funktioniert

Wenn der Prioritätsscan aktiviert ist, scannt das Radio nicht einfach Kanäle in Listenreihenfolge. Stattdessen fügt er die Prioritätskanäle wiederholt in den Scan-Zyklus ein.

Die Scansequenz wird:

1. `PriCh1`
1. `PriCh2`
1. nächster regulärer Kanal aus der aktiven Scan-Liste

Dieser Zyklus wiederholt sich dann kontinuierlich.

Dadurch kann das Radio die beiden Prioritätskanäle häufiger als normale Kanäle überprüfen, so dass die Aktivität auf ihnen schneller erkannt wird.

#### Wichtiges Verhalten

Wenn der Prioritätsscan aktiviert ist:

* Prioritätskanäle werden getrennt vom normalen Listenscannen behandelt
* Wenn ein Prioritätskanal auch zur aktiven Scan-Liste gehört, wird er aus dem regulären Scan-Pfad entfernt, um ein zweimaliges Scannen zu vermeiden.
* Prioritätskanäle können auch dann noch überprüft werden, wenn sie außerhalb des normalen Listenverlaufs liegen

### Verhalten beim Anhalten und Fortsetzen des Scans

Wenn der Scanner Aktivität auf einem Kanal findet, hängt das, was als nächstes passiert, von der `ScnRev`-Einstellung ab.

Abhängig von dieser Einstellung kann das Radio:

* Scannen automatisch nach einer Verzögerung fortsetzen
* Bleiben Sie auf dem aktiven Kanal gestoppt, bis der Scan manuell neu gestartet wird

Das Verhalten von Pause und Resume wird daher vom Scan-Resume-Modus gesteuert, nicht von der Scan-Liste selbst.

### Ausschließen eines Kanals während des Scans

Während der Speicherscan auf einem empfangenen Speicherkanal gestoppt wird, drücken Sie lange `MENU`, um diesen Kanal von zukünftigen Speicherscans auszuschließen.

#### Wichtiger Hinweis

Dieser Ausschluss ist vorübergehend.

Der Kanal bleibt bis zum nächsten Neustart des Transceivers ausgeschlossen.

### Scan-Wiederaufnahme

Wenn Sie den Transceiver während des Scannens ausschalten, wird der Scan beim nächsten Neustart automatisch fortgesetzt.

### Gemeinsame Frequenz-/Kanal-Scanfunktionen

Die folgenden Kontrollen gelten sowohl für die Frequenzabtastung als auch für die Speicherabtastung:

* Drücken Sie beim Scannen eine Navigationstaste, um die Scanrichtung umzukehren (`UP` / `DOWN` auf UV-K5, `LEFT` / `RIGHT` auf UV-K1)
* Drücken Sie `EXIT`, um den Scan zu stoppen und zu der Frequenz oder dem Kanal zurückzukehren, die vor Beginn des Scans ausgewählt wurde
* Drücken Sie `PTT` oder `MENU`, um den Scan zu stoppen und die letzte Frequenz oder den letzten Kanal beizubehalten, in dem die Aktivität gefunden wurde

## Scan-Motor-Modus: NORMAL vs. FAST

Builds mit schneller Scan-Unterstützung fügen das `SetScn`-Menü hinzu. Es wählt die Scan-Engine aus, die von Memory Scan und `ScnRng` verwendet wird.

### NORMAL

`NORMAL` verwendet den Standard-Scanpfad. Jeder Frequenz- oder Speicherkanal wird vollständig auf das Radio angewendet, mit normaler VFO-Konfiguration, Squelch / Output-Power-Setup, Empfängerregister-Setup und dem üblichen Scan-Pausen-Timing.

Dieser Modus ist die konservativste Wahl. Es ist nützlich, wenn Sie das ältere Scan-Verhalten bevorzugen oder Ergebnisse mit dem schnellen Motor vergleichen möchten.

### SCHNELL

`FAST` ist der Standardmodus in aktuellen Builds. Es fügt eine leichte RSSI-Vorprüfung vor dem vollständigen Empfangs-Setup hinzu:

* für Speicher-Scan, prüft die Firmware die nächste Kanalfrequenz und überspringt sie schnell, wenn es deutlich leise ist
* Für `ScnRng` prüft die Firmware eine kleine Charge von Entfernungsschritten, bevor sie eine vollständige Abstimmung durchführt
* leise Chargen werden schneller übersprungen, so dass das Scannen weniger Zeit mit leerem Spektrum verbringt
* mögliche Signale werden zurück zum normalen vollen Empfangspfad befördert, so dass Squelch und normales Scan-Resume-Verhalten immer noch entscheiden, was als nächstes passiert
* In `ScnRng` können feine Schritte um einen Kandidaten herum verfeinert werden, so dass der Scan näher am stärksten nahe gelegenen Signal landet
* Wenn die Scanschleife nach Ablauf der normalen `ScnRev`-Pause zum Stillstand kommt, nimmt ein kurzer Watchdog das Scannen wieder auf

Die schnelle Vorprüfung lernt einen lokalen RSSI-Rauschpegel und vergleicht jede Sonde mit dieser Etage und dem konfigurierten Squelch-Schwellenwert. Wenn Squelch vollständig geöffnet ist oder wenn der schnelle Pfad einen Kanal nicht sicher vorab überprüfen kann, fällt die Firmware für diesen Schritt wieder auf die normale volle Einstellung zurück.

> [!NOTE]
> Im `ScnRng`-Modus kann der `FAST`-Modus unter günstigen Bedingungen über 150+ Frequenzen pro Sekunde scannen, insbesondere wenn der größte Teil der Reichweite ruhig ist und der Scan stille Chargen überspringen kann, ohne für jeden Schritt eine vollständige Empfangseinrichtung durchzuführen.

Plain-Frequenz-Scan außerhalb von `ScnRng` immer noch einen Frequenzschritt zu einer Zeit; `SetScn = FAST` ändert hauptsächlich Speicher-Scan und Scan-Range-Verhalten.

## Scan Indikatoren und Erkennung

Aktuelle Fast-Scan-Builds können beim Scannen eine kleine RSSI-Sparkline anzeigen. Es ist eine kompakte Geschichte der jüngsten RSSI-Proben; ruhige Proben bleiben niedrig, während stärkere Kandidaten als größere Markierungen hervorstechen.

Während des Speicherscans zeigt der Scanlistenindikator weiterhin die aktive Liste an:

* `01` bis `24`
* `MIX`, beginnend mit `v6.1.0`
* `ALL`
* den 3-stelligen Scanlistennamen, wenn die Liste einen

Wenn der Prioritätsscan aktiviert ist, wird ein `+` an die Scanlistenanzeige angehängt.

Während `ScnRng` können Builds mit unterhörbarer Scan-Range-Unterstützung CTCSS / DCS erkennen, während das Radio auf einem empfangenen Signal gestoppt wird. Wenn ein Code gefunden wird, kann die Scan-UI den erkannten Ton oder DCS-Code zusammen mit der empfangenen Frequenz anzeigen.

Das Scan-Display verfeinert auch die Platzierung des VFO-Lock-Indikators während des Scannens, so dass der Zustand TX-Lock sichtbar bleibt, ohne die aktiven Scan-Informationen zu überlappen.

## Frequenzkopie und DCS / CTCSS-Scanning

Mit dieser Funktion können Sie Frequenz- und Codierungseinstellungen erkennen und kopieren. Die Frequenzsuche funktioniert nur für starke Signale, so dass das sendende Radio nah sein muss. Um die Frequenzkopie (`FC`) zu starten, verwenden Sie die Schaltfläche `4 FC`-Funktion. Der Scannerbildschirm öffnet sich. Drücken und halten Sie die PTT-Taste auf dem anderen Radio. Warten Sie einige Sekunden, bis die Frequenz und der Code (falls verwendet) auf dem Bildschirm erscheinen. Die Einstellungen können mit dem `MENU`-Button gespeichert werden. Sie werden entweder auf einem Kanal oder auf dem Haupt-VFO gespeichert, je nachdem, in welchem Modus Sie den Scan gestartet haben.

In aktuellen Builds macht der Scannerbildschirm den Zustand expliziter:

* `Search Freq`: Frequenzsuche läuft
* `Search Tone`: Subaudible tone/code search läuft
* `Scan Complete`: ein Ergebnis wurde gefunden
* `Scan Failed`: Es wurde kein verwertbares Ergebnis gefunden
* `Freq:` zeigt die detektierte Frequenz
* `Tone:` / `CTCSS:` / `DCS:` zeigt die erfasste unterhörbare Einstellung an, wenn eine gefunden wird

Sie können auch nur nach dem DCS / CTCSS-Code für eine auf dem Haupt-VFO eingestellte Frequenz suchen. Wählen Sie die gewünschte Frequenz oder den gewünschten Kanal und drücken Sie `F` + `* SCAN`. Der gleiche Bildschirm erscheint, aber die Frequenzsuche wird weggelassen; stattdessen wird die Frequenz des Haupt-VFO verwendet. Warten Sie, bis ein Signal erscheint, oder drücken Sie den PTT auf dem anderen Radio. Es dauert 1 bis 2 Sekunden, bis der Code gefunden wird. Das Save-Verfahren ist das gleiche wie oben.

Es gibt eine andere Möglichkeit, nach einem DCS / CTCSS-Code zu suchen. Wählen Sie die gewünschte Frequenz oder den gewünschten Kanal. Gehen Sie zum `RxDCS` oder `RxCTCS` Menü. Geben Sie die Menüoption ein und drücken Sie die `* SCAN`-Taste. Ein `SCAN`-Label wird erscheinen. Warten Sie auf ein Funksignal oder drücken Sie die PTT-Taste auf dem anderen Radio. Wenn der Code gefunden wird, verschwindet das `SCAN`-Label. Um es zu speichern, bestätigen Sie die Option mit dem `MENU`-Button. Es spielt keine Rolle, von welchem der beiden Menüpunkte Sie starten: Sowohl DCS als auch CTCSS können gefunden werden, und der Menüeintrag wird in den richtigen geändert.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Funkbetrieb](./Radio-operation)
* [Tastenfunktionen](./Button-functions)
* [Spectrumanalysator](./Spectrum-analyzer)
* [Erweiterte Funktionen](./Advanced-features)
* [AirCopy](./AirCopy)
* [Fehlerbehebung](./Troubleshooting)
