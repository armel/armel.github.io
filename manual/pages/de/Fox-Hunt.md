# FoxHunt

FoxHunt ist eine reine Signalstärke-Empfangsanwendung für Amateur Radio Direction Finding (ARDF). Es hilft dem Bediener, sich einem versteckten Sender zu nähern, indem es kalibrierte `dBm`, S-Meter, Peak, Minimum, Trend und aktuelle Signalhistorie anzeigt.

Da `v6.0.0`, FoxHunt und [Beacon](./Beacon) separate Anwendungen und separate programmierbare Aktionen sind. FoxHunt sendet nicht und wechselt nicht in Beacon.

FoxHunt befindet sich in der `FieldOps` Edition. Installieren Sie in `Labs` die `FoxHunt`-Overlay-App mit [UV Studio](./UV-Studio#apps-labs). Die `FOX HUNT`-Verknüpfung startet die residente Anwendung oder die passende installierte Overlay-App, abhängig von der Edition.

## Start FoxHunt

Weisen Sie `FOX HUNT` `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long` zu und lösen Sie dann die Verknüpfung für den VFO aus, den Sie überwachen möchten. In Labs können Sie `FoxHunt` auch über den `F + 7`-App-Selektor starten.

> [!NOTE]
> Navigation verwendet `UP` / `DOWN` auf UV-K5 und `LEFT` / `RIGHT` auf UV-K1. Das aktive Layout folgt `SetNav`.

## Anzeige und Bedienelemente

Die Signalskala läuft von `S0` bis `S9+40`. Die Hauptlehre kann entweder eine 13-stufige Treppe oder eine etwa 18-Sekunden-Scrolling-Historie anzeigen. Der Trend vergleicht das aktuelle Signal mit dem etwa eine Sekunde zuvor gemessenen Pegel.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Kontrolle | Aktion |
| --- | --- |
| `1` | Umschalten der Treppe und Signalhistorieanzeigen |
| `2` | Cycle Silent, Geiger-Style Piepton und Received-Station Audio |
| `3` | Zyklus `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` und `BYP+` |
| Navigationsschlüssel | Erhöhen oder verringern Sie die Dämpfung direkt |
| `F`, dann `2` oder `3` | Schritt die entsprechende Einstellung rückwärts |
| `M` | Reset Peak, Minimum und Trendreferenzen |
| Halten Sie `F` für etwa 0,5 Sekunden | Sperren oder Entsperren der FoxHunt-Steuerelemente |
| `EXIT` | Ausfahrt FoxHunt |

Während sie gesperrt sind, bleiben nur die Navigationstasten für die Dämpfung und ein weiterer langer `F`-Druck verfügbar.

## Hinweise zur Richtungsfindung

* Erhöhen Sie die Dämpfung, wenn das Signal stark wird, so dass das Messgerät vom vollen Maßstab entfernt bleibt.
* Setzen Sie die Referenzen vor jedem Vergleich oder Bodyscan mit `M` zurück.
* Halten Sie das Radio gegen Ihre Brust und drehen Sie sich langsam; Ihr Körper erzeugt oft ein nützliches Signalminimum in Richtung weg vom Sender.
* Verwenden Sie Peak (`PK`) und Minimum (`MN`), um eine vollständige Rotation zu vergleichen.
* Verwenden Sie den Verlaufsgraphen, um Signaltäler und den Trendindikator beim Laufen zu sehen.

`BYP` und `BYP+` sind Nahbereichsverstärkungseinstellungen, kein buchstäblicher Hardware-Bypass. Der angezeigte absolute `dBm`-Wert ändert sich mit dem Verstärkungsschritt, also vergleichen Sie die Messwerte, während Sie auf dem gleichen Schritt bleiben.

## Gespeicherte Einstellungen

FoxHunt speichert seinen Dämpfungs-, Messgerät- und Audiomodus. Diese Einstellungen werden beim nächsten Start wiederhergestellt und sind in einem AirCopy `Settings`-Transfer enthalten. Die temporäre Anwendungssperre wird nicht gespeichert.

## Verwandte Seiten

* [Beacon](./Beacon)
* [Tastenfunktionen](./Button-functions#fox-hunt-action)
* [Overlay-Apps](./Overlay-apps)
* [Überlagerungsanwendungen](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Erweiterte Funktionen](./Advanced-features)
