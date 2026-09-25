# Beacon

Beacon ist eine übertragende ARDF-ähnliche Morse-Anwendung. Es sendet wiederholt eine ausgewählte Kennung auf dem aktiven TX VFO, abwechselnd zwischen einem konfigurierbaren Sendefenster und einem stillen Intervall.

Da `v6.0.0`, Beacon und [FoxHunt](./Fox-Hunt) separate Anwendungen und separate programmierbare Aktionen sind. Beacon startet direkt in seinem Sendezyklus; es öffnet sich nicht durch FoxHunt.

Beacon befindet sich in der `FieldOps` Edition. Installieren Sie in `Labs` die `Beacon`-Overlay-App mit [UV Studio](./UV-Studio#apps-labs). Die `BEACON`-Verknüpfung startet die residente Anwendung oder die passende installierte Overlay-App, abhängig von der Edition.

> [!WARNING]
> Beacon startet sofort seine erste Übertragung. Bevor Sie es starten, überprüfen Sie die aktive TX VFO, Frequenz, Leistung, Antenne, `F Lock`, `TXLock`, Rufzeichen und Identifikationsanforderungen, Duty Cycle und lokale Vorschriften. Lassen Sie kein unbeaufsichtigtes Leuchtfeuer senden, bei dem autonome oder periodische Übertragungen verboten sind.

## Start Beacon

Weisen Sie `BEACON` `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` oder `M Long` zu und lösen Sie dann diese Verknüpfung aus. In Labs können Sie `Beacon` auch über den `F + 7`-App-Selektor starten.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Kennungen

| Einstellung | Nachricht | Zweck |
| --- | --- | --- |
| `MOE` bis `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | 5 Standard IARU ARDF fox identifiers |
| `MO` | `MO` | End-/Hauskennung |
| `CALL` | Konfiguriertes Rufzeichen gefolgt von `MOE` | Amateur-Band Beacon identifiziert |

Das Rufzeichen stammt von CHIRP `Message Line 1`. Buchstaben werden in Großbuchstaben konvertiert; Buchstaben, Ziffern und `/` werden unterstützt. Siehe [Programmierung mit CHIRP](./Programming-with-CHIRP#beacon-identification).

Die Kennung verwendet einen `1000 Hz`-Ton bei ungefähr `12 WPM`.

## Zeitsteuerung und Tastung

* `TX`: `5` bis `60 seconds`, in `5-second`-Schritten; Standard `30 seconds`
* `IDLE`: `5` bis `240 seconds`, in `5-second`-Schritten; Standard `30 seconds`

Für das klassische Fünf-Fox-Timing verwenden Sie `TX = 60 s` und `IDLE = 240 s`.

| Modus | Verhalten |
| --- | --- |
| `TONE` | Hält den FM-Carrier für das komplette TX-Fenster aktiv und tastet den `1000 Hz`-Ton |
| `CARR` | Tasten Träger und Ton zusammen für jedes Morse-Element, so dass das Signal in den Lücken verschwindet |

`TONE` ist der sauberere Standard. `CARR` reproduziert Carrier-unterbrochene ARDF-Sender, aber direkte Carrier-Tastatur kann kleine Klicks und zusätzliche spektrale Ausbreitung erzeugen.

## Kontrollen

| Kontrolle | Aktion |
| --- | --- |
| `1` | Zyklus der `TX` Dauer |
| `2` | Zyklus der `IDLE` Dauer |
| `3` | Zyklus des Identifikators |
| `4` | Wechselt zwischen `TONE` und `CARR` |
| `F`, dann `1`, `2`, `3` oder `4` | Schritt die entsprechende Einstellung rückwärts |
| Halten Sie `F` für etwa 0,5 Sekunden | Alle Beacon-Steuerelemente sperren oder entsperren |
| `M` während TX | Stoppen Sie die Stromübertragung und beginnen Sie ein neues Ruheintervall |
| `M` im Leerlauf | Starten Sie den Full Leerlauf Countdown |
| `EXIT` | Sicher anhalten und Beacon verlassen |

Vor jedem Burst überprüft Beacon die normalen TX-Frequenzbeschränkungen pro Kanal `TXLock`, Batteriezustand und Modulation. Wenn die Übertragung abgelehnt wird, zeigt sie den entsprechenden Funkstatus an und wartet, bevor der nächste geplante Burst versucht wird.

## Gespeicherte Einstellungen

Beacon speichert seine Kennung, `TX`-Dauer, `IDLE`-Dauer und `TONE` / `CARR`-Modus. Diese Einstellungen werden beim nächsten Start wiederhergestellt und sind in einem AirCopy `Settings`-Transfer enthalten. Die temporäre Anwendungssperre wird nicht gespeichert.

## Verwandte Seiten

* [FoxHunt](./Fox-Hunt)
* [Tastenfunktionen](./Button-functions#beacon-action)
* [Programmierung mit CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Overlay-Apps](./Overlay-apps)
* [Überlagerungsanwendungen](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Funkbetrieb](./Radio-operation)
