> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Beacon/).

# Baken

Beacon is een ARDF-achtige morse-applicatie voor het verzenden van signalen. Het zendt herhaaldelijk een geselecteerde identificatiecode uit via de actieve TX VFO, afwisselend met een instelbaar zendvenster en een stil interval.

Aangezien `v6.0.0`, Beacon en [FoxHunt](./Fox-Hunt) aparte applicaties en aparte programmeerbare acties zijn. Beacon start direct in zijn zendcyclus; het wordt niet geopend via FoxHunt.

Beacon is standaard aanwezig in de `FieldOps`-editie. In `Labs`installeer je de`Beacon`overlay-app met [UV Studio](./UV-Studio#apps-labs). De`BEACON` snelkoppeling start de standaardtoepassing of de bijbehorende geïnstalleerde overlay-app, afhankelijk van de editie.

> [!WARNING]
> De baken start onmiddellijk met zijn eerste uitzending. Controleer vóór het lanceren de actieve TX VFO, frequentie, vermogen, antenne, `F Lock`,`TXLock`, roepnaam en identificatievereisten, duty cycle en lokale regelgeving. Laat een baken niet onbeheerd uitzenden op plaatsen waar autonome of periodieke uitzendingen verboden zijn.

## Startbaken

Wijs `BEACON`toe aan`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`of`M Long`en activeer vervolgens die snelkoppeling. In Labs kunt u`Beacon`ook starten via de app-selector`F + 7`.

![Scherm met bakenzendcyclus](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identificaties

| Instellingen | Bericht | Doel |
| --- | --- | --- |
| `MOE`tot`MO5`|`MOE`,`MOI`,`MOS`,`MOH`,`MO5` | vijf standaard IARU ARDF vossenidentificaties |
| `MO`|`MO` | afwerking/thuis-identificatie |
| `CALL`| geconfigureerde roepnaam gevolgd door`MOE` | geïdentificeerde amateurbandbaken |

De roepnaam is afkomstig van CHIRP `Message Line 1`. Letters worden omgezet naar hoofdletters; letters, cijfers en `/` worden ondersteund. Zie [Programmeren met CHIRP](./Programming-with-CHIRP#beacon-identification).

De identificatiecode gebruikt een `1000 Hz`-toon op ongeveer `12 WPM`.

## Timing en toonsoort

* `TX`:`5`tot`60 seconds`, in`5-second`stappen; standaard`30 seconds`
* `IDLE`:`5`tot`240 seconds`, in`5-second`stappen; standaard`30 seconds`

Voor klassieke vijfvossen-timing, gebruik `TX = 60 s`en`IDLE = 240 s`.

| Modus | Gedrag |
| --- | --- |
| `TONE`| Houdt de FM-draaggolf actief gedurende het volledige zendvenster en activeert de`1000 Hz`-toon |
| `CARR` | Schakelt de draaggolf en toon voor elk Morse-element samen, zodat het signaal in de tussenruimtes verdwijnt |

`TONE`is de schonere standaardinstelling.`CARR` reproduceert draaggolfonderbroken ARDF-zenders nauwkeuriger, maar directe draaggolfmodulatie kan kleine klikjes en extra spectrale spreiding veroorzaken.

## Bedieningselementen

| Bediening | Actie |
| --- | --- |
| `1`| Herhaal de`TX` duur |
| `2`| Herhaal de`IDLE` duur |
| `3` | Herhaal de identificatiecode |
| `4`| Schakel`TONE`/`CARR` in/uit |
| `F`, vervolgens`1`,`2`,`3`, of`4` | Zet de bijbehorende instelling terug |
| Houd `F` ongeveer 0,5 seconden ingedrukt | Vergrendel of ontgrendel alle Beacon-bedieningselementen |
| `M` tijdens TX | Stop de huidige transmissie en start een nieuw stationair interval |
| `M` tijdens inactiviteit | Start het volledige inactiviteitsaftellen opnieuw |
| `EXIT` | Stop veilig en verlaat Beacon |

Voor elke burst controleert Beacon de normale TX-frequentiebeperkingen, de per-kanaal `TXLock`-instellingen, de batterijstatus en de modulatie. Als de transmissie wordt geweigerd, toont het de bijbehorende radiostatus en wacht het voordat de volgende geplande burst wordt geprobeerd.

## Opgeslagen instellingen

Beacon slaat zijn identificatiecode, de duur (`TX`), de duur (`IDLE`) en de modus (`TONE`/`CARR`) op. Deze instellingen worden bij de volgende keer opstarten hersteld en worden meegenomen in een AirCopy-overdracht (`Settings`). De tijdelijke applicatievergrendeling wordt niet opgeslagen.

## Gerelateerde pagina's

* [FoxHunt](./Fox-Hunt)
* [Knopfuncties](./Button-functions#beacon-action)
* [Programmeren met CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Overlay-apps](./Overlay-apps)
* [Overlay-toepassingen](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Radiobediening](./Radio-operation)
