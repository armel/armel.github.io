# Spektralanalysator

## Spektrumsuchlauf

Drücken Sie `F` + `5 NOAA`, um den **Spectrum-Analysator** einzuschalten.
Die aktuelle VFO- oder Speicherfrequenz ist die ** center frequency ** des Spektrums.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

Der Spektrumanalysator kann auch mit [**ScnRng**-Modus](./Scanning#scan-frequency-range-function) verwendet werden.

> [!NOTE]
> Navigation verwendet `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1. Das aktive Layout folgt `SetNav`.

> [!NOTE]
> `PTT` öffnet Detailüberwachung für die zuletzt empfangene Frequenz
> - mit `ScnRng` ist die Blacklist auf 15 Frequenzen begrenzt

> [!IMPORTANT]
> **Der Spektrumanalysator verhält sich nicht gleich über Funk-Hardware.**
> Die **V1 / V2 ** Radios sind um den **BK4819 ** Empfänger herum gebaut, während die
> **V3 (K5v3)** verwendet den **BK4829**. Dies sind verschiedene Empfängerchips, mit einem
> verschiedene Frontend-, LNA/PGA-Verstärkungsstufen, AGC-Verhalten und RSSI-Skalierung.
>
> Als Ergebnis:
> - der ** Rauschboden**, die absoluten ** dBm / S-Meter**-Messwerte und die ** `LNAs` / `LNA` / `PGA`**-Werte sind **nicht direkt vergleichbar** zwischen einer V1/V2 und einer V3 - eine Pegel- oder Verstärkungseinstellung, die auf einer V2 "richtig" aussieht, hat keinen Grund zu bedeuten das gleiche auf einem V3;
> - der Spektrumanalysator wurde ** wesentlich überarbeitet **, um beide Plattformen zu unterstützen, also erwarten Sie nicht, dass ein V3 Wert für Wert reproduziert, was Sie auf einem älteren V1/V2 beobachtet haben;
> - Ein hoher oder instabiler Rauschpegel wird weitgehend vom Empfänger-Front-End und der lokalen HF-Umgebung und nicht von einem Fehler im Analysator angetrieben. Wenn sich **AUTO** nicht in Ihrem lokalen Stockwerk niederlassen kann, wechseln Sie zu **MANUAL** und stellen Sie den Auslöser selbst ein - genau dafür ist der MANUAL-Modus geeignet.

### Trigger-Modi: AUTO vs MANUAL

Kurzdrücken Sie `M`, um zwischen **AUTO** und **MANUAL** Triggermodi umzuschalten. Die obere linke Anzeige zeigt den aktiven Modus an:

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — AUTO-Modus. Der Squelch-Triggerpegel verfolgt den gemessenen Rauschpegel mit einem Empfindlichkeitsprofil:
  - `WEAK` — +12 dB über dem Lärmpegel (am wenigsten empfindlich, weniger falsche Öffnungen)
  - `NORM` — +8 dB (Standard)
  - `STRG` — +5 dB (am empfindlichsten)
  
  Ein Richtungspfeil wird an das Etikett angehängt, um die aktuelle Sweep-Richtung anzuzeigen:
  - `>` - Sweep nach links → rechts
  - `<` - Sweep nach rechts → links
  
  Beispiel: `A:NORM>` bedeutet AUTO / Normale Empfindlichkeit, nach rechts fegend.

- **`M <rssi>/<trig>`** — MANUELLER Modus. Sie stellen den Squelch-Triggerpegel selbst mit `*` / `F` und die vertikale Skala (`dbMax`) mit `3` / `9` ein. Der Trigger ändert sich in vorhersehbaren `1 dB`-Schritten.

Lange `M` drücken, um den Spektrumanalysator auf seine Standardeinstellungen zurückzusetzen **.

### Speichereinstellungen beim Ausstieg

Wenn Sie den Bildschirm **Spektrumsuchlauf** mit `EXIT` verlassen, speichert der Spektrumanalysator seine dauerhaften Einstellungen im Flash-Speicher. Beim nächsten Öffnen werden diese Werte wiederhergestellt:

- Frequenzsprung zwischen Balken (`1` / `7`)
- Anzahl der Balken / Kanäle (`4`)
- Empfängerbandbreite während der Überwachung eines Signals (`6`)
- Triggermodus, **AUTO** oder **MANUAL** (`M` kurz)
- AUTO Empfindlichkeitsprofil, **WEAK** / **NORM** / **STRG** (`3` / `9` im AUTO-Modus)
- Squelch-Triggerpegel (`*` / `F`) - wiederhergestellt im **MANUAL**-Modus; in **AUTO** wird der Trigger jedes Mal, wenn Sie den Analysator öffnen, aus dem Rauschpegel neu berechnet

Diese Persistenz wurde nach `v5.4.0` erweitert: Ältere Builds speicherten nur den Scanschritt, die Baranzahl und die Empfängerbandbreite. In aktuellen Builds überschreibt das Starten des Spektrumanalysators aus dem `ScnRng`-Modus nicht mehr die gespeicherte Scan-Schritt- oder Balkenzählpräferenz; Der aktive Scanbereich definiert immer noch die Sweep-Spanne.

Die vertikale Skala (`dbMax`, `3` / `9` in MANUAL) wird **nicht** fortgesetzt: Sie wird jedes Mal, wenn der Analysator geöffnet wird, auf das Standard-Anzeigefenster zurückgesetzt. Die aktuelle Sweep-Frequenz / Fenster, der `UP` / `DOWN`-Scrollschritt, Modulationstyp, Hintergrundbeleuchtungsschalter, temporäre Blacklist und Detailmonitor-Registeranpassungen (`LNAs`, `LNA`, `PGA`) werden ebenfalls nicht durch diese `EXIT`-Aktion gespeichert. Wenn Sie sich auf dem Bildschirm **Detail Monitor** befinden, kehrt `EXIT` zuerst zum Sweep-Bildschirm zurück; drücken Sie von dort erneut `EXIT`, um den Analysator zu speichern und zu verlassen.

Aktuelle Builds verbessern auch die `8.33 kHz`-Frequenzrundung in Bandscope / Spektrum-Workflows, so dass angezeigte und abgestimmte Frequenzen auf Schritten im Luftfahrtstil vorhersehbarer ausgerichtet bleiben.

### Tastenfunktionen

| Schlüssel | Funktion |
| --- | --- |
| `1` / `7` | Erhöhen / Erniedrigen Frequenzschritt zwischen Bars |
| `2` / `8` | Erhöhen / Verringern Sie den beim Scrollen mit `UP` / `DOWN` verwendeten Frequenzschritt |
| `3` / `9` | In MANUAL: `dbMax` anpassen (vertikale Skala) · In AUTO: Zyklusempfindlichkeitsprofil (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Umschalten der Anzahl der Balken (Kanäle) im Graphen |
| `5` | Frequenzeingang für die niedrigere Sweep-Frequenz (Wert in **MHz**, `*` = Dezimalpunkt) |
| `6` | Empfängerbandbreite umschalten |
| `0` | Typ der Umschaltmodulation (FM / AM / USB) |
| `*` / `F` | Squelch-Triggerpegel erhöhen / verringern in `1 dB`-Schritten - wirkt in ** MANUAL **; in **AUTO ** überschreibt der Auto-Tracker ihn beim nächsten Sweep |
| `M` kurz | AUTO / MANUELLER Triggermodus umschalten |
| `M` lang | Zurücksetzen des Spektrumanalysators auf Standardwerte |
| `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1 | Verschieben Sie das Sweep-Fenster in der Frequenz nach oben / unten · **Während RX **: Empfang stoppen und den Sweep in die gewählte Richtung fortsetzen |
| `Side button 1️⃣` | Die aktuelle Frequenz aus dem Spektrum-Scan ausschließen |
| `Side button 2️⃣` | Hintergrundbeleuchtung umschalten |
| `PTT` | Umschalten auf **Detailüberwachung** der zuletzt empfangenen Frequenz |
| `EXIT` | Speichern Sie persistente Spektrumeinstellungen und kehren Sie dann zum vorherigen Bildschirm / zur vorherigen Funktion zurück |

> [!TIP]
> Der Sweep wechselt die Richtung bei jedem vollen Zyklus, um die Richtungsvorspannung zu reduzieren. Mit dem `<` / `>`-Indikator neben `A:xxxx` können Sie auf einen Blick sehen, welche Hälfte des Sweeps gerade aktiv ist.

> [!NOTE]
> Im MANUAL-Modus wird die Spektrumskurve ohne kosmetische Glättung gezeichnet. Dies macht schmale Peaks enger mit dem rohen RSSI aus, der vom Squelch-Detektor verwendet wird.

## Detail Monitor Bildschirm
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Tastenfunktionen
* `M` - scrollt durch die unten auf dem Bildschirm angezeigten Parameter, die mit den Schaltflächen `UP` und `DOWN` angepasst werden können
   * LNAs - Short Low Noise Verstärker
   * LNA - Low Noise Verstärker
   * PGA - Programmable Gain Verstärker
* `Seitentaste 1️⃣` - schaltet den **Monitormodus** um (öffnet die Rauschsperre, damit Sie die eingestellte Frequenz kontinuierlich hören können)
* `EXIT` - Exits zum vorherigen Bildschirm des Spektrumanalysators

> [!NOTE]
> `LNAs` / `LNA` / `PGA` sind **live Diagnosewerte **, nicht gespeicherte Einstellungen. Sie werden vom AGC des Empfängers angetrieben und bleiben beim Ausstieg nicht bestehen. Ihre verfügbaren Schritte und ihre Bedeutung unterscheiden sich zwischen dem **BK4819** (V1/V2) und dem **BK4829** (V3), so dass sie nicht plattformübergreifend mit Wert für Wert verglichen werden können.

## Verwandte Seiten

* [Erste Schritte](./Getting-started)
* [Scannen](./Scanning)
* [Tastenfunktionen](./Button-functions)
* [Funkbetrieb](./Radio-operation)
* [Fehlerbehebung](./Troubleshooting)
