# Fehlerbehebung

Diese seite sammelt die häufigsten "etwas ist falsch" -situationen, die bereits an anderer stelle im wiki behandelt wurden, so dass sie schnell den richtigen check finden können.

## Ich kann empfangen, aber ich kann nicht senden

Überprüfen Sie zuerst diese Punkte:

1. Stellen Sie sicher, dass `Mode` auf `FM` eingestellt ist.
1. Überprüfen Sie den ausgewählten `F Lock`-Plan.
1. Wenn die Frequenz außerhalb dieses Plans liegt, prüfen Sie, ob `TXLock` auf `OFF` eingestellt ist.
1. Suchen Sie nach einem kleinen Vorhängeschloss neben dem Kanal oder VFO-Namen.

Wichtige Erinnerungen:

* `AM` und `USB` sind nur zum Zuhören
* `UNLOCK ALL` hat noch ein zusätzliches Entsperrverfahren

Siehe auch: [Radiobetrieb](./Radio-operation#about-the-f-lock-and-txlock-menus) und [Erweiterte Funktionen](./Advanced-features#tx-on-all-bands).

## Meine benutzerdefinierten Einstellungen verschwanden oder änderten sich unerwartet

Verwenden Sie kein Quansheng CPS. Es überschreibt benutzerdefinierte Einstellungen.

Verwenden Sie stattdessen den `CHIRP`-Treiber, der mit jeder Firmware-Version bereitgestellt wird, oder ein anderes kompatibles Programmierwerkzeug.

Siehe auch: [Programmieren mit CHIRP](./Programming-with-CHIRP), [Anfang](./Getting-started) und [Radiobetrieb](./Radio-operation#basic-operation--configuration).

## Mein benutzerdefiniertes Boot-Logo wird nicht angezeigt

Überprüfen Sie diese Punkte:

1. Stellen Sie sicher, dass Ihr Firmware-Build Logo-Unterstützung enthält
1. Laden Sie das Logo mit [UV Studio](./UV-Studio#boot-logo) hoch, während das Radio normal gestartet wird
1. Öffnen Sie das Menü `POnMsg` und wählen Sie `LOGO`
1. Neustart des Radios nach Änderung der Einstellung

Wenn das Logo zu dunkel, zu hell oder umgekehrt aussieht, laden Sie es erneut von UV Studio hoch und passen Sie `Threshold` oder `Invert colors` an, bevor Sie es ins Radio schreiben.

## Ich habe eine Speicherkanaleinstellung geändert, aber sie blieb nicht gespeichert

Einige kanalspezifische Änderungen betreffen nur die aktuelle temporäre Kopie dieses Speicherkanals.

Wenn Sie eine Einstellung pro Kanal wie `Step`, `Power` oder einen anderen Kanalparameter ändern und diese dauerhaft beibehalten möchten, speichern Sie den Kanal erneut mit `ChSave`, um die aktualisierten Einstellungen in diesen Speicherplatz zurückzuschreiben.

Andernfalls ist die Änderung nur vorübergehend und kann verschwinden, wenn Sie den Kanal wechseln, den Modus wechseln oder das Radio neu starten.

Siehe auch: [Radio Operation](./Radio-operation#basic-operation--configuration) und [Menü](./Menu#main-menu).

## Memory Scan findet nichts

Überprüfen Sie diese Punkte:

1. Stellen Sie sicher, dass Sie in `channel mode` sind, nicht `frequency mode`.
1. Stellen Sie sicher, dass der Kanal einer Scan-Liste mit `ScList` oder durch langes Drücken von `5 NOAA` zugewiesen ist.
1. Stellen Sie sicher, dass die derzeit aktive Scan-Liste nicht leer ist.
1. Wechseln Sie bei Bedarf während des Scannens zu einer anderen gültigen Scanliste.

Die Firmware unterstützt `24`-Scanlisten plus `ALL`. Wenn die angeforderte Liste leer oder ungültig ist, springt das Radio zur nächsten gültigen, nicht leeren Liste.

Siehe auch: [Scannen](./Scanning#memory-channels-scanning) und [Tastenfunktionen](./Button-functions#front-keypad).

## Ich kann den FM-Sender, den ich will, nicht stimmen

Sie können einfach die falsche fm-broadcast-reichweite verwenden.

Während der FM-Broadcast-Empfang aktiv ist, drücken Sie lange `1 BAND`, um die verfügbaren FM-Bereiche zu durchlaufen:

* `87.5` bis `108 MHz`
* `76` bis `108 MHz`
* `76` bis `90 MHz`
* `64` bis `76 MHz`

Der aktuell ausgewählte Bereich wird unten links auf dem FM-Bildschirm angezeigt, beispielsweise `87.5-108M`.

Direktabstimmung, manueller Scan, Auto-Scan und UKW-Speicher funktionieren nur innerhalb des aktuell ausgewählten Bereichs.

Siehe auch: [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## FM-Radio hält an

Dies ist in der Regel erwartetes Verhalten.

Während des Broadcast-FM-Empfangs hat der aktive VFO weiterhin Priorität. Wenn Aktivität auf dem aktiven VFO empfangen wird, schaltet das Radio vorübergehend zum VFO-Empfang zurück und kehrt dann zum Broadcast-FM zurück, wenn dieser Empfang endet.

Siehe auch: [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver).

## AM Empfang klingt zu hart, verzerrt oder zu gedämpft

Versuchen Sie, das `SetRxA`-Profil zu ändern, während sich das Radio im `AM`-Modus befindet.

In `AM`, `SetRxA` und dem `RxA` Key Action Cycle zwischen:

* `SHARP`: schmaler und selektiver, mit besserer Nachbarkanalabstoßung
* `STOCK`: am nächsten zum Aktienfirmware-Verhalten
* `OPEN`: breiter und offener, oft netter bei schwachen Signalen

Wenn ein AM-Empfang in `SHARP` zu hart klingt, versuchen Sie `STOCK` oder `OPEN`. Wenn es in `OPEN` zu weich oder zu breit klingt, versuchen Sie `SHARP`.

Siehe auch: [Menü](./Menu#main-menu) und [Tastenfunktionen](./Button-functions#custom-button-functions).

## Ich höre nur einige aeronautische UKW-Kanäle, wenn ich den Monitor in `AM 8.33 kHz` öffne

Dies ist oft kein Empfindlichkeitsproblem. Es ist normalerweise eine Verwechslung zwischen dem `channel designator` (manchmal `channel number` oder `published channel` genannt) und der Betriebsfrequenz.

Einige Luftfahrtdokumente, Websites oder Apps veröffentlichen das `channel designator`, das wie eine normale Frequenz aussieht, aber nicht immer die Betriebsfrequenz ist. Dedizierte 8.33-fähige Luftfahrt-VHF-Funkgeräte übersetzen diesen veröffentlichten Kanalbezeichner automatisch. Diese Firmware führt diese Korrektur auch aus, wenn Sie den Wert direkt im Radio eingeben, aber `CHIRP` speichert den Wert, den Sie als Betriebsfrequenz eingegeben haben.

### Fall 1: Paris-Orly

Für **Paris-Orly (LFPO)** veröffentlicht die **SIA-Dokumentation **ATIS ORLY 126.505 (FR)**, mit **131.355 (EN)** für den englischsprachigen Dienst.

Die **[ICAO-Korrespondenztabelle](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** zeigt, dass der veröffentlichte 8,33-Kanal-Bezeichner **126,505** dem Betrieb entspricht. Frequenz **126,5000 MHz**. Mit anderen Worten:

* **Service:** ATIS ORLY (FR)
* **Kanalkennung:** 126.505
* **Betriebsfrequenz:** 126,5000 MHz

Wichtiger Unterschied:

* Wenn Sie `126.5050` direkt im Radio eingeben, korrigiert die Firmware es auf die passende Betriebsfrequenz, hier `126.5000 MHz`
* Wenn Sie `126.5050` in `CHIRP` eingeben, wird genau dieser Wert gespeichert und verwendet, so dass der Tuning-Fehler erhalten bleibt.

### Fall 2: Brüssel

Für **Brüssel-National (EBBR)** ist die veröffentlichte 8.33-Kanalkennung für **Brüssel-Boden (Süden)** in den konsultierten Listen **121.880**.

Die **[ICAO-Korrespondenztabelle](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** zeigt, dass der veröffentlichte 8,33-Kanalbezeichner **121.880** dem Betrieb entspricht. Frequenz **121,8750 MHz**. Mit anderen Worten:

* **Service:** Brüsseler Boden (Süden)
* **Kanalkennung:** 121.880
* **Betriebsfrequenz:** 121,8750 MHz

Wichtiger Unterschied:

* Wenn Sie `121.8800` direkt im Radio eingeben, korrigiert die Firmware es auf die passende Betriebsfrequenz, hier `121.8750 MHz`
* Wenn Sie `121.8800` in `CHIRP` eingeben, wird genau dieser Wert gespeichert und verwendet, so dass der Tuning-Fehler erhalten bleibt.

Kurz gesagt, wenn die in `CHIRP` eingegebene Frequenz die **Kanalkennung** und nicht die Betriebsfrequenz ist, scheint es, dass der Monitor in `AM 8.33 kHz` geöffnet wird, um den Empfang wiederherzustellen, Das eigentliche Problem ist jedoch, dass der veröffentlichte Kanalbezeichner als Betriebsfrequenz interpretiert wurde.

Wenn ein von einem Kanalbezeichner programmierter Dienst erst hörbar wird, wenn Sie den Monitor in `AM 8.33 kHz` öffnen, versuchen Sie zuerst die entsprechende Betriebsfrequenz, insbesondere wenn der veröffentlichte Wert mit `...005`, `...010`, `...255` endet. `...505`, `...755` oder ähnliche 8,33-Kanal-Bezeichner.

Siehe auch: 

[Ofcom: 8,33-kHz-Frequenzen und Kanalnummern verstehen](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Hören Sie auf, Ihrem Radio oder Ihrer Firmware die Schuld zu geben. Sehen Sie sich dieses Video auf meinem Youtube-Kanal an:
[Aviation Frequencies and MONITOR ✈️: Channel ≠ Frequency (der Fehler, der alles verändert)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Batterieprozentsatz oder Spannung sieht falsch aus

Überprüfen Sie diese Punkte:

1. Stellen Sie sicher, dass das Radio nicht über `USB-C` aufgeladen wird, während Sie es überprüfen
1. `BatTxt = VOLTAGE` verwenden oder `SysInf` öffnen
1. Stellen Sie sicher, dass `BatTyp` mit dem von Ihnen verwendeten Akkupack übereinstimmt
1. Vergleichen Sie die angezeigte Spannung mit einem Multimeter
1. bei Bedarf `BatCal` neu einstellen

Wichtige Erinnerung:

* `BatCal` beeinflusst den Spannungswert
* `BatTyp` beeinflusst die Schätzung des Batterieprozentsatzes

Siehe auch: [Radio Operation](./Radio-operation#battery-display-type-and-calibration) und [Menü](./Menu#hidden-menu).

## Das externe Mikrofon PTT verhält sich anders

Dies ist ein bekanntes Verhalten bei einigen Hardware-Revisionen.

Dokumentierte Unterschiede umfassen:

* TX kann warten, bis RX klar ist, bevor Sie senden
* DTMF-Töne oder der 1750-Hz-Ton können schnell abgeschnitten werden

Die interne Seite `PTT` zeigt diese Probleme in den dokumentierten Fällen nicht an.

Siehe auch: [Tastenfunktionen](./Button-functions#external-microphone).

## Das Radio geht unerwartet schlafen

Überprüfen Sie diese Menüs:

* `SetOff`: Tiefschlaf nach einer Periode der Inaktivität
* `BatSav`: Verhältnis Aktiv/Schlaf im Normalbetrieb

Wenn `SetOff` nicht `OFF` ist, kann das Radio nach Inaktivität sogar während des Scannens in den Schlafmodus wechseln, solange kein Empfang stattfindet.

FoxHunt und Beacon ignorieren absichtlich `SetOff`. Wenn das Radio in beiden Anwendungen wach bleibt, lassen Sie es mit `EXIT`, bevor Sie den Inaktivitäts-Timer diagnostizieren. Seit `v6.0.0` sind sie unabhängige Anwendungen.

Siehe auch: [Radio Operation](./Radio-operation#about-the-setoff-menu).

## Navigation scheint sich in die falsche Richtung zu bewegen

Wenn sich die Menünavigation oder einige Steuerelemente in die falsche Richtung zu bewegen scheinen, überprüfen Sie zuerst das versteckte Menüelement `SetNav`.

Diese Firmware kann selbst nicht zuverlässig erkennen, ob sie auf einem `UV-K1` oder einem `UV-K5` läuft. Aus diesem Grund musste der Navigationsstil als Menüeinstellung angezeigt werden.

Mit `SetNav` können Sie zwischen:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Das ändert nichts am Feature selbst. Es ändert nur den Navigationsstil, der von der Firmware verwendet wird, und daher, wie die Steuerelemente auf Ihrem Radio gelesen werden sollten.

Siehe auch: [Erste Schritte](./Getting-started#model-differences) und [Menü](./Menu#hidden-menu).

## Knöpfe tun nicht, was ich erwarte

Überprüfen Sie diese Möglichkeiten:

1. Tastensperre kann aktiviert sein
1. `SetLck` kann auch die programmierbare Seitentaste / `M Long`-Aktionen, die `PTT` oder beide sperren
1. RescueOps-Modus deaktiviert die meisten langen Drücke und `F` Tastenkombinationen
1. Einige Aktionen unterscheiden sich zwischen `F+` und Long Press
1. `F`, gefolgt von einem kurzen Seitenknopfdruck, stellt Schritt ein, während `F`, gefolgt vom Halten dieser Seitentaste, den Action-Picker in aktuellen v6-Editionen öffnet

Siehe auch: [Tastenfunktionen](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon) und [Erweiterte Funktionen](./Advanced-features#rescueops).

## Power und SetPwr verstehen: TX-Leistung pro Kanal und global

Das Power-Menü bestimmt die Sendeleistung, die vom aktuellen Kanal oder VFO verwendet wird. Verfügbare Werte sind LOW1 bis LOW5, MID, HIGH oder USER. Diese Einstellung wird daher lokal pro Kanal gespeichert.

Das SetPwr-Menü wählt nicht direkt die Leistung für einen bestimmten Kanal aus. Es definiert nur, welche tatsächliche Leistungsstufe dem USER-Modus zugewiesen wird, indem zwischen LOW1 bis LOW5, MID oder HIGH gewählt wird. Diese Einstellung ist global für das gesamte Radio.

Dadurch verwenden alle Kanäle, deren Power-Einstellung auf USER eingestellt ist, automatisch den aktuell in SetPwr definierten Wert.

Dieser Mechanismus ermöglicht es, die effektive Leistung mehrerer auf USER eingestellter Kanäle auf einmal zu ändern, ohne jeden Kanal einzeln bearbeiten zu müssen.

## Wohin Sie als nächstes gehen

* [Erste Schritte](./Getting-started)
* [Programmierung mit CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Funkbetrieb](./Radio-operation)
* [Scannen](./Scanning)
* [Erweiterte Funktionen](./Advanced-features)
* [Menü](./Menu)
* [Tastenfunktionen](./Button-functions)
