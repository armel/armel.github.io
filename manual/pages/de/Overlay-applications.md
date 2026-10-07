# Überlagerungsanträge

Diese Seite beschreibt die elf Anwendungen, die derzeit für die `Labs`-Edition verfügbar sind: Was sie tun und wie man sie kontrolliert. Installations-, Kompatibilitäts- und Entwicklerinformationen finden Sie unter [Overlay-Apps](./Overlay-apps).

> [!NOTE]
> Die Navigationsschlüssel hängen vom Radio und der `SetNav`-Einstellung ab: `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1. In den folgenden Tabellen beziehen sich `UP/LEFT` und `DOWN/RIGHT` auf diese äquivalenten Schlüssel.

## Einleitung eines Antrags

1. Installieren Sie eine kompatible `.app`-Datei mit [UV Studio](./UV-Studio#apps-labs).
1. Vom normalen Radiobildschirm drücken Sie `F`, dann `7 VOX`.
1. Wählen Sie eine installierte Anwendung mit `UP/LEFT` oder `DOWN/RIGHT` aus.
1. Drücken Sie `M`, um es zu starten.

In den meisten Anwendungen schließt `EXIT` die Anwendung und kehrt zum Launcher oder normalen Radiobildschirm zurück. Einige Funkanwendungen können auch direkt einem programmierbaren Schlüssel über den normalen Aktionswähler zugewiesen werden.

## Zusammenfassung des Antrags

| Antragstellung | Zweck |
| --- | --- |
| `Broadcast FM` | Voll ausgestatteter Broadcast-FM-Empfänger mit VFO, Speichern und Stationsscanning |
| `FoxHunt` | Signalstärke und Orientierungshilfe mit Historie, Dämpfung und Audioführung |
| `Beacon` | Wiederholtes Morse-Beacon im ARDF-Stil mit dem ausgewählten Sende-VFO |
| `Beam` | Transfer Ein-Kanal-Konfiguration zwischen kompatiblen Funkgeräten über die Luft |
| `Breakout` | Brick-Breaking Spiel |
| `Tetris` | Falling-Block-Spiel mit Scoring, Levels und einer gespeicherten besten Punktzahl |
| `Cube3D` | Animierter 3D-Shape Viewer |
| `Plasma` | Animierte Demoszenen-Muster |
| `Snake` | Klassisches Grid-basiertes Schlangenspiel mit gespeicherter bester Punktzahl |
| `Rapid Roll` | Plattformspiel, bei dem ein rollender Ball an Gefahren vorbei absteigen muss |
| `Space Impact` | Side-Scrolling Space Shooter mit automatischem Feuer, Raketen und Bossen |

## Broadcast FM

`Broadcast FM` ist ein kompletter BK1080 Broadcast Receiver. Es bietet Frequenz- und Speichermodi, vier Sendebänder, manuelle Suche, automatische Stationserkennung und 48 FM-Speicher, die mit dem ansässigen UKW-Radio geteilt werden.

Während diese Anwendung ausgeführt wird, sind die normalen BK4819-Empfangs- und Dual-Watch-Funktionen ausgesetzt. Änderungen an FM-Speichern werden sicher begangen, wenn die Anwendung beendet wird.

| Schlüssel | Aktion |
| --- | --- |
| `0`–`9` | Geben Sie eine Frequenz im VFO-Modus oder eine zweistellige Speichernummer im MR/Save-Modus ein |
| `UP/LEFT` oder `DOWN/RIGHT` | Tunen Sie einen Schritt im VFO-Modus; wählen Sie die vorherige / nächste gespeicherte Station im MR-Modus; wählen Sie einen Speicherplatz; ändern Sie die Suchrichtung beim Scannen |
| `*` | Manuelle Suche starten; aktiver Scan stoppen |
| `F`, dann `*` oder halten `*` | Starten Sie das automatische Scannen und Neuaufbauen der FM-Speicherliste |
| `M` im VFO-Modus | `SAVE?` öffnen; `M` erneut drücken, um im ausgewählten Slot zu speichern |
| `M` im MR-Modus | `DEL?` öffnen; `M` erneut drücken, um den ausgewählten Speicher zu löschen |
| `F`, dann `1` oder halten `1` | Wählen Sie das nächste Broadcast-Band |
| `F`, dann `3` oder halten `3` | Wechsel zwischen VFO- und MR-Modus |
| `F`, dann `0` oder halten `0` | Anwendung beenden |
| `EXIT` | Löschen Sie die zuletzt eingegebene Ziffer, stornieren Sie eine Speicher- / Löschaufforderung oder verlassen Sie |

> [!WARNING]
> Automatisches Scannen löscht und baut die FM-Speicherliste wieder auf, bevor die gefundenen Stationen gespeichert werden.

## FoxHunt

`FoxHunt` hilft, einen Sender mit dem ausgewählten Empfangs-VFO zu finden. Es zeigt korrigierte Signalstärke in dBm, ein IARU-S-Meter, Spitzen- und Minimalwerte, Trendinformationen und entweder einen Balkengraphen oder eine Signalhistorie. Auswählbare Dämpfung erweitert den Nutzbereich in der Nähe eines starken Senders.

| Schlüssel | Aktion |
| --- | --- |
| `1` | Wechsel zwischen Balkengraph und Signalhistorie |
| `2` | Wählen Sie den nächsten Audio-Modus aus: aus, Stärke piepst oder kontinuierliche Station Audio |
| `3` | Dämpfung erhöhen |
| `F`, dann `2` | Wählen Sie den vorherigen Audiomodus aus |
| `F`, dann `3` | Verringerung der Dämpfung |
| `UP/LEFT` oder `DOWN/RIGHT` | Erhöhen/Verringern der Dämpfung direkt |
| `M` | Zurücksetzen der Peak-, Minimum- und Trend-Referenzwerte |
| Halten `F` | Sperren oder Entsperren der Anwendungs-Tastatur |
| `EXIT` | Ausstieg, während die Tastatur entsperrt ist |

Der Graph, der Audiomodus und die Dämpfungseinstellung werden für den nächsten Start gespeichert. Die beiden Navigationsschlüssel bleiben verfügbar, während die Anwendungs-Tastatur gesperrt ist.

## Beacon

`Beacon` überträgt wiederholt eine ARDF-artige Morse-Kennung auf dem ausgewählten Sende-VFO. Sie wechselt zwischen einem konfigurierbaren Sendefenster und einer Ruhezeit. Verfügbare Identifikatoren sind `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` und `CALL`; `CALL` sendet das konfigurierte Rufzeichen gefolgt von `MOE`.

| Schlüssel | Aktion |
| --- | --- |
| `1` | Erhöhen Sie die Sendedauer in 5-Sekunden-Schritten (`5`-`60`-Sekunden) |
| `2` | Erhöhen Sie die Leerlaufdauer in 5-Sekunden-Schritten (`5`-`240`-Sekunden) |
| `3` | Wählen Sie den nächsten Bezeichner |
| `4` | `TONE` / `CARR` Keying |
| `F`, dann `1` / `2` / `3` / `4` | Ändern Sie die entsprechende Einstellung in umgekehrter Richtung |
| `M` während der Übertragung | Stoppen Sie das aktuelle Sendefenster und beginnen Sie die Ruhezeit |
| `M` im Leerlauf | Starten Sie den kompletten Leerlauf-Countdown |
| Halten `F` | Sperren oder Entsperren aller Anwendungskontrollen |
| `EXIT` | Sicher anhalten und aussteigen, während die Steuerelemente entsperrt sind |

Die erste Übertragung beginnt sofort. Dauer, Leerlaufzeit, Kennung und Keying-Modus werden für den nächsten Start gespeichert. Wenn die residente Firmware die Übertragung ablehnt, zeigt die Anwendung `TX OFF` an und sendet nicht.

> [!WARNING]
> Beacon sendet automatisch. Überprüfen Sie die ausgewählten VFO, Frequenz, Leistung, Antenne, Rufzeichen, Duty Cycle und lokalen Vorschriften, bevor Sie es starten.

## Beam

`Beam` überträgt die ausgewählte VFO- oder Speicherkanalkonfiguration zwischen kompatiblen Funkgeräten. Das sendende Radio sendet die Kanaldaten über die Luft; das empfangende Radio speichert ein gültiges Paket im ersten freien Speicher.

| Schlüssel | Aktion |
| --- | --- |
| `UP/LEFT` oder `DOWN/RIGHT` | Umschalten zwischen Sende- (`BEAM TX`) und Empfangsmodus (`BEAM RX`); Stoppen Sie auch einen aktiven Empfangsvorgang |
| `M` im TX-Modus | Senden der ausgewählten Kanalkonfiguration |
| `M` im RX-Modus | Warten auf ein Beam-Paket |
| `EXIT` | Erhalten oder Beenden der Anwendung |

Die Anzeige meldet `SENT`, `RECEIVED`, `MEM FULL` oder `ERROR`. Pro Start wird nur ein empfangener Kanal zugewiesen; Beenden und erneutes Öffnen von Beam, bevor ein anderer empfangen wird.

## Breakout

`Breakout` ist ein kompaktes Steinbruchspiel mit 18 Steinen, fünf Startbällen, Punktzahl und Level-Tracking. Das Freigeben der Wand beginnt das nächste Level und verleiht einen zusätzlichen Ball.

| Schlüssel | Aktion |
| --- | --- |
| `4` oder `UP/LEFT` | Bewegen Sie das Paddel nach links |
| `0` oder `DOWN/RIGHT` | Bewegen Sie das Paddel rechts |
| `M` | Pause oder Wiederaufnahme; nach `GAME OVER` starten Sie das vorbereitete neue Spiel |
| `EXIT` | Anwendung beenden |

Der Spielfortschritt wird nach dem Verlassen der Anwendung nicht beibehalten.

## Tetris

`Tetris` verwendet einen 16 × 16 sichtbaren Brunnen, eine gemischte siebenteilige Tasche, ein Geisterstück, eine Vorschau, eine Partitur, Linien und Ebenen. Die beste Punktzahl wird zwischen den Starts gespeichert.

| Schlüssel | Aktion |
| --- | --- |
| `4` oder `UP/LEFT` | Bewegung nach links |
| `6` oder `DOWN/RIGHT` | Nach rechts bewegen |
| `M` oder `2` | Drehen Sie das Stück |
| `8` | Weicher Tropfen |
| `*` oder `0` | Harter Tropfen |
| `F` | Pausieren oder fortsetzen |
| `M`, `*` oder `0` nach dem Spiel | Starten Sie ein neues Spiel |
| `EXIT` | Anwendung beenden |

Bewegung und Soft Drop wiederholen sich, während ihre Schlüssel gehalten werden.

## Cube3D

`Cube3D` stellt rotierende feste oder Drahtrahmenformen dar. Acht Formen sind verfügbar: Würfel, Oktaeder, Tetraeder, Diamant, Ikosaeder, Cuboctaeder, hexagonales Prisma und fünfeckiges Juwel.

| Schlüssel | Aktion |
| --- | --- |
| `UP/LEFT` oder `DOWN/RIGHT` | Erhöhung/Verringerung der Drehzahl (`1`–`16`) |
| `1`–`8` | Wählen Sie eine Form direkt |
| `*` | Wählen Sie die nächste Form |
| `F` | Wechselt zwischen Drahtgitter- und Vollflächendarstellung |
| `M` | Pausieren oder fortsetzen |
| `EXIT` | Anwendung beenden |

## Plasma

`Plasma` zeigt animierte Vollbild-Demoszenen-Muster mit entweder Bands oder gestipptem Rendering.

| Schlüssel | Aktion |
| --- | --- |
| `UP/LEFT` oder `DOWN/RIGHT` | Steigerung/Verringerung der Animationsgeschwindigkeit (`1`–`8`) |
| `1`–`5` | Wählen Sie ein Muster und deaktivieren Sie den automatischen Zyklus |
| `*` | Wechselt zwischen Band- und Punktdarstellung |
| `F` | Automatisches Pattern Cycling aktivieren oder deaktivieren |
| `M` | Pausieren oder fortsetzen |
| `EXIT` | Anwendung beenden |

## Snake

`Snake` ist ein klassisches Nokia-Spiel, das auf einem `31 × 13`-Raster gespielt wird. Essen Sie das Essen, um die Schlange zu wachsen und `10`-Punkte zu erzielen. Das Schlagen der Grenze oder des eigenen Körpers der Schlange beendet das Spiel. Die beste Punktzahl wird zwischen den Starts gespeichert.

| Schlüssel | Aktion |
| --- | --- |
| `2` oder `3` | Aufwärtsbewegung |
| `4` oder `5` | Bewegung nach links |
| `6` oder `0` | Nach rechts bewegen |
| `8` oder `9` | Nach unten bewegen |
| `F` | Pausieren oder fortsetzen |
| `M`, `*` oder `0` nach dem Spiel | Starten Sie ein neues Spiel |
| `EXIT` | Anwendung beenden |

Einen Richtungsschlüssel halten wiederholt es. Die Anwendung lehnt eine sofortige Umkehr in den eigenen Körper der Schlange ab. Wenn der Bildschirmschoner während eines Spiels aktiviert wird, pausiert Snake und wird nach dem Aufwachen wieder aufgenommen.

## Rapid Roll

`Rapid Roll` ist ein Plattformspiel, bei dem die Plattformen zu einer mit Stacheln versehenen Decke aufsteigen. Bewege den Ball seitlich und lasse ihn von einer sicheren Plattform zur nächsten hinabfallen. Plattformen mit Stacheln, die Decke und der untere Bildschirmrand kosten ein Leben; ab Level 3 erscheinen bröckelnde Plattformen. Herzen bringen `50` Punkte und stellen ein Leben wieder her, bis zu einem Maximum von fünf.

| Schlüssel | Aktion |
| --- | --- |
| `4` oder `UP/LEFT` | Nach links rollen |
| `6` oder `DOWN/RIGHT` | Nach rechts rollen |
| `F` | Pausieren oder fortsetzen |
| `M` nach Spielende | Neues Spiel starten |
| `EXIT` | Anwendung beenden |

Das Spiel beginnt mit drei Leben und wird mit steigendem Level schneller. Sichere Plattformen werden in höheren Levels schmaler. Der Fortschritt bleibt nach dem Beenden der Anwendung nicht erhalten. Wird während eines Spiels der Bildschirmschoner aktiviert, pausiert Rapid Roll und wird nach dem Aufwecken fortgesetzt.

## Space Impact

`Space Impact` ist ein seitlich scrollender Weltraum-Shooter. Das Raumschiff feuert seine Hauptwaffe automatisch ab, sodass die Steuerung für vertikale Bewegungen frei bleibt. Die Gegnerwellen verwenden verschiedene Bewegungs- und Angriffsmuster; am Ende jedes Levels folgt ein Boss mit sichtbarer Lebensanzeige.

| Schlüssel | Aktion |
| --- | --- |
| `2` oder `UP/LEFT` | Raumschiff nach oben bewegen |
| `8` oder `DOWN/RIGHT` | Raumschiff nach unten bewegen |
| `5` oder `M` | Durchschlagende Rakete abfeuern |
| `F` | Pausieren oder fortsetzen |
| `M` nach Spielende | Neues Spiel starten |
| `EXIT` | Anwendung beenden |

Das Spiel beginnt mit drei Leben und drei Raketen. Die Hauptwaffe feuert automatisch. Für jeweils 16 besiegte Gegner gibt es eine weitere Rakete, bis zu einem Maximum von neun. Das Besiegen eines Bosses bringt ein zusätzliches Leben und eine Rakete, sofern die jeweiligen Höchstwerte noch nicht erreicht sind. Der Fortschritt bleibt nach dem Beenden der Anwendung nicht erhalten. Wird während eines Spiels der Bildschirmschoner aktiviert, pausiert Space Impact und wird nach dem Aufwecken fortgesetzt.

## Verwandte Seiten

* [Overlay-Apps](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Tastenfunktionen](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [FM Broadcast Radio Receiver](./FM-broadcast-radio-receiver)
