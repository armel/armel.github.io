# Tastenfunktionen

Buttons können Funktionen auf zwei Arten auslösen:

1. Drücken Sie zuerst die `F #`-Taste, dann die Zieltaste (unten als `F+` geschrieben)
2. Langes Drücken der Zieltaste direkt

In vielen Fällen dupliziert die lange Presse die `F+`-Aktion, aber einige Tasten haben ein anderes Langpressverhalten.

## Schnelle Erinnerungen

* `F+` bedeutet: `F #` drücken und dann die Zieltaste drücken
* Navigationsetiketten können `UP` / `DOWN` oder `LEFT` / `RIGHT` sein, abhängig vom Modell und `SetNav`
* die programmierbaren Verknüpfungen sind in [Benutzerdefinierte Tastenfunktionen](#custom-button-functions) aufgeführt
* eingeführt in Fusion `v5.9.0` und verfügbar in den aktuellen v6-Editionen, drücken `F` und dann ** Halten ** eine Seitentaste öffnet die [Seitentaste Aktionsauswahl](#side-key-action-picker)

## Vordere Tastatur

### `M`
* Kurzpresse - Enter Menü
* Kurzpresse während Kanal/Frequenz-Scanning - zuletzt gefundener Kanal bleibt auf dem Bildschirm erhalten
* langes Drücken während des Kanalscans - vorübergehend einen Speicherkanal ausschließen (nicht mit `* SCAN ALL` arbeiten)
* lange Presse - Benutzer programmierbar im Menü: `M Long`
### `EXIT`
* Kurzdruck - verlässt aktuelles Menü / Funktion, löscht eine Ziffer in einem Eingabefeld
* lange Drücken - löscht alle Eingaben, Ausgänge DTMF-Eingabebox, Ausgänge Monitor-Modus, Ausgänge `ScnRng`
### `UP` und `DOWN`
* Bewegen Sie sich in Menüs, Häufigkeit, Einstellungen und anderen Listen auf und ab
* `F+` - erhöht oder verringert den Squelch-Wert.
### `1 BAND`
* `F+`
  * im **Frequenzmodus** - wechselt Frequenzbänder `1` zu `7`; es gibt auch Band `7+` für Frequenzen über `1 GHz`
  * im **Kanalmodus** - Kanaleinstellungen werden in den Frequenzmodus kopiert
* Langpresse
  * im **normalen Funkmodus** - gleich
  * im **FM-Broadcast-Modus** - zyklisiert die FM-Broadcast-Frequenzbereiche; siehe [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - schaltet Haupt-VFO oben / unten (gekennzeichnet durch `►`)
* Lange Presse - gleich
### `3 VFO/MR`
* `F+` - Wechsel zwischen Frequenzmodus und Kanalmodus
* Lange Presse - gleich
### `4 FC`
* `F+` - schaltet Frequenz und CTCSS-Kopiermodus ein. Beginnen Sie die Übertragung mit dem anderen Radio und die Frequenz und der CTCSS-Code werden erkannt. Sie können diese Einstellungen mit dem `M`-Button speichern
* Lange Presse - gleich
### `5 NOAA`
* `F+` - schaltet Spektrumanalysator ein
* Langpresse
   * im **Kanal-Modus** - zyklisiert den ausgewählten Speicherkanal durch seine Scanlistenzuordnung: `OFF`, `1` zu `24`, dann `ALL`
   * im **Frequenzmodus** - aktiviert die [Abtastbereichsfunktion](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - schaltet die Leistungspegel für den aktuellen Kanal um
* Lange Presse - gleich
### `7 VOX`
* `F+`
  * in der `Labs` Edition - öffnet den [Overlay-App Launcher](./Overlay-apps)
  * in Builds mit dem Resident-Spiel und ohne Overlay-App-Loader - startet Breakout
* Long Press - schaltet den VOX-Modus ein/aus, wenn VOX aktiviert ist
### `8 R`
* `F+` - ermöglicht manuelles Backlight Management und schaltet die Backlight ein oder aus
* lange Presse - schaltet den Reverse-Modus für Kanäle ein, die einen Frequenzversatz haben. Es ersetzt die TX-Frequenz mit der RX-Frequenz
### `9 Call`
* `F+` - Deaktiviert manuelles Backlight Management
* lange Presse - schaltet den aktuellen Kanal auf den im Radio eingestellten `1-Call`-Kanal um.
### `0 FM`
* `F+` - schaltet UKW-Radio ein
* Lange Presse - gleich
### `* SCAN`
* short press - tritt in den DTMF-Eingangsmodus ein
* `F+` - schaltet den DCS / CTCSS Scanner für die aktuelle Frequenz ein
* Langpresse
   * im **Kanal-Modus** - schaltet Kanalscanner ein
   * im **Frequenzmodus** - schaltet Frequenzscanner ein (kann die Funktion [Scan-Reichweite](./Scanning#scan-frequency-range-function) verwenden)
* Während der Speicher-Scan läuft, wechselt `F+` oder Long-Press `* SCAN` zur nächsten gültigen, nicht leeren Scan-Liste
### `F # 🗝`
* short press - schaltet den `F+`-Funktionsmodifikator um
* langes Drücken - schaltet die Tastatursperre ein oder aus; das `SetLck`-Menü wählt aus, ob die Sperre auch programmierbare Verknüpfungsaktionen abdeckt und / oder `PTT`

### Tastaturschloss und SetLck

Die Tastatursperre deaktiviert immer die Fronttastatur, mit der Ausnahme, dass `F #` mit langem Drücken verfügbar bleibt, um das Radio zu entsperren. Das `SetLck`-Menü erweitert die Sperre auf andere Steuerelemente:

* `KEYS`: Die beiden Side-Button-Verknüpfungen `M Long` und `PTT` bleiben verfügbar
* `KEYS + ACTIONS`: Die programmierbaren Verknüpfungen, die `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` und `M Long` zugewiesen sind, sind ebenfalls deaktiviert; `PTT` bleibt verfügbar
* `KEYS + PTT`: `PTT` ist auch deaktiviert, um eine versehentliche Übertragung zu verhindern; programmierbare Verknüpfungen bleiben verfügbar
* `KEYS + ACTIONS + PTT`: die Fronttastatur, programmierbare Verknüpfungen und `PTT` sind alle deaktiviert

## Seitenknöpfe

### `PTT`
* Push-To-Talk-Button. Es gibt 2 Modi: CLASSIC und ONEPUSH (siehe Menü `SetPTT`)
  * CLASSIC - PTT funktioniert wie gewohnt. Drücken Sie den PTT, um mit dem Senden zu beginnen, und geben Sie ihn zum Stoppen frei.
  * ONEPUSH - PTT funktioniert wie ein Switch. Drücken Sie den PTT, um mit dem Senden zu beginnen, und geben Sie ihn frei, wann immer Sie möchten. Die Übertragung ist weiterhin aktiv. Drücken Sie den PTT erneut, wenn Sie möchten, und lassen Sie ihn dann los, um die Übertragung zu stoppen. Es funktioniert wie auf OpenGD77 (wenn Sie es wissen).

* Wenn diese Taste zum Stoppen des Kanal-/Frequenz-Scans verwendet wird, bleibt der zuletzt gefundene Kanal auf dem Bildschirm erhalten
* zusammengehalten mit `Side button 2️⃣`, überträgt den `1750 Hz`-Ton
* Zusammengehalten mit einer der vorderen Tasten der Tastatur überträgt DTMF-Codes

### `Side button 1️⃣`
* Kurzpresse - Benutzer programmierbar im Menü: `F1Shrt`
* lange Presse - Benutzer programmierbar im Menü: `F1Long`
* `F` dann kurz drücken - erhöht den Step-Wert im VFO-Modus
* `F` dann halten - öffnet den Side-Key-Action-Picker

### `Side button 2️⃣`
* Kurzpresse - Benutzer programmierbar im Menü: `F2Shrt`
* lange Presse - Benutzer programmierbar im Menü: `F2Long`
* Diese Taste kann auch verwendet werden, um den `1750 Hz`-Ton zu senden, indem Sie ihn mit der `PTT`-Taste zusammenhalten
* `F` dann kurz drücken - verringert den Step-Wert im VFO-Modus
* `F` dann halten - öffnet den Side-Key-Action-Picker

### Aktionsauswahl für Seitentasten

Der Action-Picker führt eine verfügbare Verknüpfung aus, ohne die in `F1Shrt`, `F1Long`, `F2Shrt` oder `F2Long` gespeicherten Funktionen zu ändern.

Vom normalen Radiobildschirm:

1. Kurz drücken Sie `F`, so dass der `F`-Indikator erscheint.
1. Halten Sie den Seitenknopf 1️� oder den Seitenknopf 2️� gedrückt, bis sich der Picker öffnet.
1. Verwenden Sie `UP` / `DOWN`, um eine Aktion hervorzuheben.
1. Drücken Sie `M`, um es sofort auszuführen.

Der Bildschirm zeigt die vorherige, ausgewählte und nächste Aktion an. `EXIT` oder `F` bricht ab, ohne etwas auszuführen. Das Drücken von `PTT` schließt den Picker und setzt die normale PTT-Handhabung fort, so dass eine dringende Übertragung nicht blockiert wird.

Der Picker schließt auch automatisch nach etwa fünf Sekunden, wenn der Empfang beginnt, wenn die Tastatur gesperrt wird oder wenn ein anderer Bildschirm übernimmt. Jede Seitentaste erinnert sich an die letzte hervorgehobene Picker-Aktion für die aktuelle Sitzung; die Auswahl wird zurückgesetzt, wenn das Radio neu gestartet wird.

Der Picker listet die gleichen kompilierten Aktionen auf, die unten dokumentiert sind, außer `NONE`. Es gelten weiterhin normale Aktionsbeschränkungen: Eine Aktion, die im aktuellen Funkzustand nicht verfügbar ist, wird mit dem üblichen Fehlerpiepton abgelehnt.

## Außenmikrofon
### `PTT`
* Push-To-Talk-Button.
* Die `PTT-Taste am externen Mikrofon` funktioniert anders als die interne seitliche `PTT`-Taste.

> [!NOTE]
> Bei einigen Hardware-Revisionen verhält sich das externe Mikrofon `PTT` anders:
> - beim Drücken des PTT wartet TX, bis kein RX-Signal empfangen wird ( observed mit Radio PCB Revision V1.4 und OK mit V1.6 ). Das funktioniert gut mit dem internen `PTT`
> - ein DTMF-Ton (`key press`) oder 1750 Hz-Ton (`function button`) kann innerhalb einer Sekunde abgeschnitten werden. Das funktioniert gut mit dem internen `PTT`

## Benutzerdefinierte Tastenfunktionen
Fünf Shortcut-Aktionen können im Menü angepasst werden:
* `F1Shrt` - Seitenknopf 1️�, Kurzdruck
* `F1Long` - Seitenknopf 1️�, lange Presse
* `F2Shrt` - Seitenknopf 2️�, Kurzdruck
* `F2Long` - Seitenknopf 2️�, lange Presse
* `M Long` - Menü-Button, lange Presse

verfügbare Funktionen:
* NONE - keine Aktion
* FLASH LIGHT - Wechsel zur nächsten Taschenlampenfunktion: ON / OFF
* POWER - Funkausgangsleistung zwischen [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITOR - Monitormodus ein-/ausschalten
* SCAN - Startkanäle/Frequenzscanning
* VOX - Turn Voice Aktivierungsfunktion EIN / AUS
* FM RADIO - FM-Radio einschalten / ausschalten
* `1750 Hz` - Senden Sie den `1750 Hz` Ton Burst
* LOCK KEYPAD - sperren / entsperren Sie die Tastatur
* VFO A VFO B - Haupt-VFO nach oben / unten ändern
* VFO MEM - Änderung des aktuellen VFO-Modus, des Frequenzmodus oder des Speicherkanalmodus
* MODE - Wechsel zum nächsten Demodulationsmodus zwischen [FM / AM / USB]
* RX MODE - Schalten Sie den Anzeigemodus zwischen [DW / DWR / XB / MO]
* MAIN ONLY - Schalten Sie den Anzeigemodus zwischen [DW / DWR / XB] und MO
* PTT - Switch PTT Mode CLASSIC / ONEPUSH
* WIDE NARROW - Wechsel zwischen WIDE und NARROW
* MUTE - stummes Lautsprechervolumen
* RxA - schalten Sie das RX-Audioprofil für die aktuelle Modulation: in `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; in `AM`, `SHARP` / `STOCK` / `OPEN`
* POWER HIGH - vorübergehend auf die maximale Leistung von `5 W` umschalten
* OFFSET REMOVE - Entfernen Sie vorübergehend den Offset eines Speicherkanals, falls vorhanden
* BEAM - öffnet den BEAM-Übertragungsmodus, wenn er im Build aktiviert ist. BEAM kann die aktuellen VFO/Speicherkanaleinstellungen an ein anderes Radio senden oder Einstellungen von einem anderen Radio empfangen.
* FOX HUNT - öffnet die Nur-Empfangs-Richtungsfindungsanwendung, wenn sie wohnhaft oder als installierte Labs-App verfügbar ist.
* BEACON - öffnet die unabhängige Morse Beacon-Anwendung, wenn sie resident oder als installierte Labs-App verfügbar ist.
* RF LOG - öffnet das RX/TX History Log, wenn es im Build aktiviert ist. Das Protokoll zeigt die letzten Empfangs-, Überwachungs- und Sendesitzungen, die in einem externen Flash gespeichert sind.

### BEAM-Aktion

Weisen Sie `BEAM` einer der anpassbaren Verknüpfungen (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long`) zu und lösen Sie diese Verknüpfung dann aus, um den BEAM-Modus zu öffnen.

Im BEAM-Modus:

* `UP` / `DOWN` wechselt zwischen `BEAM TX` und `BEAM RX`
* `M` startet die ausgewählte Operation
* `EXIT` verlässt BEAM-Modus

`BEAM TX` sendet die aktuelle VFO- oder Speicherkanalkonfiguration. Das Paket enthält die Einstellungen RX-Frequenz, TX-Offset, RX/TX DCS oder CTCSS, Modulation, Bandbreite, Ausgangsleistung, Scanlistenzuweisung, Compander, DTMF-bezogene Einstellungen, wenn aktiviert, und den Kanalnamen.

`BEAM RX` wartet auf ein BEAM-Paket von einem anderen Radio. Wenn ein gültiges Paket empfangen wird, speichert das Radio es auf dem ersten freien Speicherkanal. Wenn der Speicher voll ist, zeigt der Status `MEM FULL` an. Durch Drücken von `EXIT` nach einem erfolgreichen Empfang wird auf den neu gespeicherten Kanal umgeschaltet; andernfalls wird der vorherige VFO/Kanal-Zustand wiederhergestellt.

### FOX HUNT Aktion

Weisen Sie `FOX HUNT` einer der anpassbaren Verknüpfungen (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long`) zu und lösen Sie diese Verknüpfung aus, um FoxHunt auf dem ausgewählten VFO zu öffnen.

Im Fox Hunt-Modus:

* `1` wechselt zwischen der S-Meter-Treppe und dem aktuellen Signalhistorie-Graphen
* `2`-Zyklen zwischen leisem, Geiger-ähnlichem Piepton und Audio der Empfangsstation
* `3` durchläuft `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` und `BYP+`
* `UP` / `DOWN` ändert die Empfängerdämpfung direkt
* `M` setzt Peak-, Minimum- und Signaltrend-Referenzen zurück
* Halten `F` für etwa 0,5 Sekunden sperrt oder entriegelt die FoxHunt-Steuerelemente; Dämpfungspfeile bleiben verfügbar, während sie gesperrt sind
* `EXIT` verlässt FoxHunt

Siehe [FoxHunt](./Fox-Hunt) für die Bildschirmlesungen, Verstärkungseinstellungen, Steuerungen und Richtungsfindungsführung.

### BEACON-Aktion

Weisen Sie `BEACON` einer der anpassbaren Verknüpfungen zu und lösen Sie diese Verknüpfung aus, um die unabhängige Beacon-Anwendung zu starten. Beacon startet sofort seine erste Übertragung.

Die Tasten `1`, `2`, `3` und `4` passen das TX-Fenster, das stille Intervall, die Fuchskennung und den Tastenmodus (`TONE` / `CARR`) an. Das Halten von `F` für etwa 0,5 Sekunden sperrt oder entsperrt alle Beacon-Steuerelemente, auch während einer aktiven Übertragung. `M` stoppt die aktuelle Übertragung und startet ein neues Leerlaufintervall; `EXIT` stoppt sicher und verlässt Beacon.

Siehe [Beacon](./Beacon) für Identifikation, Timing, Übertragungsschutz, gespeicherte Einstellungen und Sicherheitsinformationen.

### RF-LOG-Aktion

Weisen Sie `RF LOG` einer der anpassbaren Verknüpfungen (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long`) zu und lösen Sie diese Verknüpfung aus, um das RX/TX-Verlaufprotokoll zu öffnen.

Die Protokolldatensätze empfangen, überwachen und senden Sitzungen in externem Flash. Jede Verkehrszeile zeigt:

* den Kanalnamen, wenn der Eintrag von einem Speicherkanal kommt; andernfalls die Frequenz
* ob der Eintrag `RX` oder `TX` war
* Neuestes Index-Abzeichen
* ein Detailabzeichen, das Dauer, Signal/Leistung oder Batteriespannung anzeigen kann

Auf dem `RF LOG` Bildschirm:

* `UP` / `DOWN` scrollt durch das Protokoll, neueste Einträge zuerst
* `F` + `UP` springt zum neuesten Eintrag
* `F` + `DOWN` springt zum ältesten sichtbaren Eintrag
* Kurzdruck `M` zyklisiert den Filter: `ALL`, `RX`, `TX`
* Short-Press-`* SCAN`-Zyklen das Detail-Badge: Dauer, RX S-Meter / TX-Leistungspegel, niedrigste Batteriespannung während der Sitzung
* Long-Press `M` fragt nach Log-Clearing-Bestätigung; Long-Press `M` erneut auf `CLEAR LOG / SURE?` löscht das Protokoll
* `EXIT` verlässt den Protokollbildschirm oder storniert die eindeutige Bestätigung

Das Radio hält bis zu 512 Verkehrseinträge in der Log-Ansicht sichtbar. Sitzungstrennzeilen markieren Radioneustarts, wenn der `ALL`-Filter aktiv ist.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Menü](./Menu)
* [Funkbetrieb](./Radio-operation)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Erweiterte Funktionen](./Advanced-features)
* [Overlay-Apps](./Overlay-apps)
* [Überlagerungsanwendungen](./Overlay-applications)
* [Fehlerbehebung](./Troubleshooting)
