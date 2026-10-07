> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Spectrum-analyzer/).

# Spectrumanalysator

## Spectrum Sweep-scherm

Druk op `F`+`5 NOAA` om de **spectrumanalysator** in te schakelen.
De huidige VFO- of geheugenfrequentie is de **middenfrequentie_** van de spectrumsweep.

![Spectrumanalysator 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrumanalysator 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

De spectrumanalysator kan ook worden gebruikt met [**ScnRng**-modus](./Scanning#scan-frequency-range-function).

> [!NOTE]
> Navigatie maakt gebruik van `UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT`op UV-K1. De actieve lay-out volgt`SetNav`.

> [!NOTE]
> - `PTT` opent detailbewaking voor de laatst ontvangen frequentie
> - met `ScnRng` is de zwarte lijst beperkt tot 15 frequenties

> [!IMPORTANT]
> **De spectrumanalysator werkt niet overal hetzelfde op alle radioapparatuur.**
> De **V1/V2**-radio's zijn gebouwd rond de **BK4819**-ontvanger, terwijl de
> **V3 (K5v3)** gebruikt de **BK4829**. Dit zijn verschillende ontvangerchips, met een
> verschillende front-end, LNA/PGA-versterkingstrappen, AGC-gedrag en RSSI-schaling.
>
> Het resultaat:
> - De **ruisvloer**, de absolute **dBm/S-meter**-waarden en de ** `LNAs`/`LNA`/`PGA` **-waarden zijn **niet direct vergelijkbaar** tussen een V1/V2 en een V3 — een niveau- of versterkingsinstelling die er "goed" uitziet op een V2 hoeft niet per se hetzelfde te betekenen op een V3;
> - De spectrumanalysator is **aanzienlijk herzien** om beide platforms te ondersteunen, dus verwacht niet dat een V3 exact hetzelfde resultaat oplevert als een oudere V1/V2;
> - Een hoge of instabiele ruisvloer wordt grotendeels veroorzaakt door de front-end van de ontvanger en de lokale RF-omgeving, niet door een fout in de analyzer. Als **AUTO** geen stabiele ruisvloer in uw omgeving kan vinden, schakel dan over naar **MANUAL** en stel de trigger zelf in — daarvoor is de MANUAL-modus precies bedoeld.

### Activeringsmodi: AUTO vs. HANDMATIG

Druk kort op `M` om te schakelen tussen de **AUTO** en **MANUAL** triggerstanden. De indicator linksboven geeft de actieve stand aan:

- ** `A:NORM`** / **`A:WEAK`** / **`A:STRG` ** — AUTO-modus. Het squelch-triggerniveau volgt de gemeten ruisvloer met behulp van een gevoeligheidsprofiel:
  - `WEAK` — +12 dB boven de ruisvloer (minst gevoelig, minder valse openingen)
  - `NORM` — +8 dB (standaard)
  - `STRG` — +5 dB (meest gevoelig)
  
Aan het label is een richtingpijl toegevoegd om de huidige veegrichting aan te geven:
  - `>` — veegbeweging van links naar rechts
  - `<` — veegbeweging van rechts naar links
  
Voorbeeld: `A:NORM>` betekent AUTO / Normale gevoeligheid, naar rechts vegen.

- ** `M <rssi>/<trig>`** — HANDMATIGE modus. U stelt zelf het niveau van de squelch-trigger in met`*`/`F`en de verticale schaal (`dbMax`) met`3`/`9`. De trigger verandert in voorspelbare`1 dB` stappen.

Houd `M` lang ingedrukt om **de spectrumanalysator terug te zetten naar de standaardinstellingen**.

### Instellingen opslaan bij afsluiten

Wanneer u het scherm **Spectrum Sweep** verlaat met `EXIT`, schrijft de spectrumanalysator zijn permanente instellingen naar het flashgeheugen. De volgende keer dat u de analysator opent, worden deze waarden hersteld:

- frequentiestap tussen balken ( `1`/`7` )
- aantal balken / kanalen ( `4` )
- bandbreedte van de ontvanger die wordt gebruikt tijdens het monitoren van een signaal ( `6` )
- triggermodus, **AUTO** of **MANUAL** ( `M` kort)
- AUTO-gevoeligheidsprofiel, **ZWAK** / **NORM** / **STRG** ( `3`/`9` in AUTO-modus)
- squelch-triggerniveau ( `*`/`F` ) — wordt hersteld in de **MANUAL**-modus; in de **AUTO**-modus wordt de trigger telkens opnieuw berekend op basis van de ruisvloer wanneer u de analyzer opent.

Deze persistentie werd uitgebreid na `v5.4.0`: oudere versies bewaarden alleen de scanstap, het aantal balken en de bandbreedte van de ontvanger. In de huidige versies overschrijft het starten van de spectrumanalysator vanuit de `ScnRng`-modus niet langer de opgeslagen voorkeur voor de scanstap of het aantal balken; het actieve scanbereik definieert nog steeds de sweepspan.

De verticale schaal ( `dbMax`,`3`/`9`in HANDMATIG) wordt **niet** opgeslagen: deze wordt elke keer dat de analyzer wordt geopend, teruggezet naar het standaardweergavevenster. De huidige sweepfrequentie/venster, de`UP`/`DOWN`scrollstap, het modulatietype, de achtergrondverlichting, de tijdelijke blacklist en de aanpassingen van het detailmonitorregister (`LNAs`,`LNA`,`PGA`) worden ook niet opgeslagen door deze`EXIT`actie. Als u zich op het scherm **Detail Monitor** bevindt, keert u met`EXIT`eerst terug naar het sweepscherm; druk daar nogmaals op`EXIT` om op te slaan en de analyzer te verlaten.

De huidige builds verbeteren ook de afronding van de `8.33 kHz`-frequentie in bandscope-/spectrumworkflows, waardoor de weergegeven en afgestemde frequenties voorspelbaarder op één lijn blijven bij stappen in de luchtvaartstijl.

### Knopfuncties

| Sleutel | Functie |
| --- | --- |
| `1`/`7` | Frequentiestap tussen balken verhogen/verlagen |
| `2`/`8`| Verhoog/verlaag de frequentiestap die wordt gebruikt bij het scrollen met`UP`/`DOWN` |
| `3`/`9`| In HANDMATIG: pas`dbMax`(verticale schaal) aan · In AUTOMATISCH: wissel tussen gevoeligheidsprofielen (`WEAK`↔`NORM`↔`STRG` ) |
| `4` | Het aantal balken (kanalen) in de grafiek in- of uitschakelen |
| `5`| Frequentie-ingang voor de lagere sweepfrequentie (waarde in **MHz**,`*` = decimale punt) |
| `6` | Ontvangerbandbreedte in-/uitschakelen |
| `0` | Modulatietype wisselen (FM / AM / USB) |
| `*`/`F`| Verhoog/verlaag het squelch-triggerniveau in stappen van`1 dB` — dit treedt in werking in **MANUAL**; in **AUTO** overschrijft de autotracker dit bij de volgende sweep |
| `M` kort | Schakel tussen AUTO/MANUELE triggermodus |
| `M` lang | Spectrumanalysator terugzetten naar standaardinstellingen |
| `UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT` op UV-K1 | Verschuif het sweepvenster omhoog/omlaag in frequentie · **Tijdens RX**: stop de ontvangst en hervat de sweep in de gekozen richting |
| `Side button 1️⃣` | Sluit de huidige frequentie uit van de spectrumscan |
| `Side button 2️⃣` | Achtergrondverlichting in-/uitschakelen |
| `PTT` | Schakel over naar **gedetailleerde monitoring** van de laatst ontvangen frequentie |
| `EXIT` | Sla de permanente spectruminstellingen op en ga vervolgens terug naar het vorige scherm/de vorige functie |

> [!TIP]
> De sweep wisselt van richting tijdens elke volledige cyclus om richtingsafwijkingen te verminderen. De indicator `<`/`>`naast`A:xxxx` laat u in één oogopslag zien welke helft van de sweep momenteel actief is.

> [!NOTE]
> In de handmatige modus wordt de spectrumcurve getekend zonder cosmetische gladmaking. Hierdoor komen smalle pieken beter overeen met de ruwe RSSI die door de squelchdetector wordt gebruikt.

## Detailmonitor scherm
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Knopfuncties
* `M`- bladert door de parameters die onderaan het scherm worden weergegeven en die kunnen worden aangepast met de knoppen`UP`en`DOWN`
   * LNA's - Korte ruisarme versterker
   * LNA - Low Noise Amplifier
   * PGA - Programmeerbare versterkingsversterker
* `Side button 1️⃣` - schakel de **monitormodus** in/uit (dwingt de squelch open zodat u de afgestemde frequentie continu kunt horen)
* `EXIT` - keert terug naar het vorige scherm van de spectrumanalysator

> [!NOTE]
> `LNAs`/`LNA`/`PGA` zijn **live diagnostische waarden**, geen opgeslagen instellingen. Ze worden aangestuurd door de AGC van de ontvanger en worden niet bewaard bij het afsluiten. De beschikbare stappen en hun betekenis verschillen tussen de **BK4819** (V1/V2) en de **BK4829** (V3), waardoor ze niet één op één vergelijkbaar zijn tussen de verschillende platformen.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Scannen](./Scanning)
* [Knopfuncties](./Button-functions)
* [Radiobediening](./Radio-operation)
* [Probleemoplossing](./Troubleshooting)
