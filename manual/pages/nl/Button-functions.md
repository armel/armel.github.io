> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Button-functions/).

# Knopfuncties

Knoppen kunnen functies op twee manieren activeren:

1. Druk eerst op de knop `F #`en vervolgens op de doelknop (hieronder aangeduid als`F+`).
2. Houd de doelknop direct ingedrukt.

In veel gevallen dupliceert de lange druk de actie van `F+`, maar sommige knoppen hebben een ander gedrag bij een lange druk.

## Snelle herinneringen

* `F+`betekent: druk op`F #` en druk vervolgens op de doelknop
* De navigatielabels kunnen `UP`/`DOWN`of`LEFT`/`RIGHT`zijn, afhankelijk van het model en`SetNav`
* De programmeerbare sneltoetsen staan vermeld in [Aangepaste knopfuncties](#custom-button-functions)
* Geïntroduceerd in Fusion `v5.9.0`en beschikbaar in de huidige v6-versies: door op`F` te drukken en vervolgens een zijknop ingedrukt te houden, wordt de [side-key action picker](#side-key-action-picker) geopend.

## Toetsenbord aan de voorzijde

### `M`
* kort indrukken - menu openen
* Kort indrukken tijdens het scannen van kanalen/frequenties - het laatst gevonden kanaal blijft op het scherm behouden
* Lang indrukken tijdens het scannen van kanalen - tijdelijk een geheugenkanaal uitschakelen (werkt niet met `* SCAN ALL`)
* lang indrukken - door de gebruiker programmeerbaar in het menu: `M Long`
### `EXIT`
* Kort indrukken - verlaat het huidige menu/de huidige functie, verwijdert één cijfer in een invoerveld
* Lang indrukken - verwijdert alle invoer, sluit het DTMF-invoervak, sluit de monitormodus, sluit `ScnRng`
### `UP`en`DOWN`
* Navigeer omhoog en omlaag in menu's, frequentie, instellingen en andere lijsten
* `F+` - verhoogt of verlaagt de squelchwaarde.
### `1 BAND`
* `F+`
  * In **frequentiemodus** schakelt de frequentieband `1`over naar`7`; er is ook band `7+`voor frequenties boven`1 GHz`
  * in **kanaalmodus** worden de kanaalinstellingen naar de frequentiemodus gekopieerd
* lang indrukken
  * in **normale radiomodus** - hetzelfde
  * in **FM-uitzendmodus** - schakelt tussen de FM-uitzendfrequentiebereiken; zie [FM-radio-ontvanger](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+`- schakelt de hoofd-VFO boven/onder (aangeduid met`►`)
* lang indrukken - hetzelfde
### `3 VFO/MR`
* `F+` - schakelt tussen frequentiemodus en kanaalmodus
* lang indrukken - hetzelfde
### `4 FC`
* `F+`- schakelt de frequentie- en CTCSS-kopieermodus in. Begin met zenden met de andere radio en de frequentie en CTCSS-code worden gedetecteerd. U kunt deze instellingen opslaan met de`M`-knop.
* lang indrukken - hetzelfde
### `5 NOAA`
* `F+` - schakelt de spectrumanalysator in
* lang indrukken
   * in **kanaalmodus** - doorloopt het geselecteerde geheugenkanaal de toewijzing in de scanlijst: `OFF`, `1`tot`24`, vervolgens `ALL`
   * in **frequentiemodus** - activeert de [scanbereikfunctie](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - schakelt de vermogensniveaus voor het huidige kanaal in of uit
* lang indrukken - hetzelfde
### `7 VOX`
* `F+`
  * in de `Labs`-editie - opent de [overlay-app launcher](./Overlay-apps)
  * In builds met het in-game spel en zonder overlay-app-loader start Breakout.
* Lang indrukken - schakelt de VOX-modus in/uit wanneer VOX is ingeschakeld
### `8 R`
* `F+` - maakt handmatig beheer van de achtergrondverlichting mogelijk en schakelt de achtergrondverlichting in of uit
* Lang indrukken - schakelt de omgekeerde modus in voor kanalen met een ingestelde frequentie-offset. De zendfrequentie wordt vervangen door de ontvangstfrequentie.
### `9 Call`
* `F+` - schakelt handmatig beheer van de achtergrondverlichting uit
* Lang indrukken - schakelt het huidige kanaal over naar het `1-Call`-kanaal dat op de radio is ingesteld.
### `0 FM`
* `F+` - schakelt de FM-radio in
* lang indrukken - hetzelfde
### `* SCAN`
* Kort indrukken - schakelt over naar de DTMF-invoermodus
* `F+` - schakelt de DCS/CTCSS-scanner in voor de huidige frequentie
* lang indrukken
   * in **kanaalmodus** - schakelt de kanaalscanner in
   * in **frequentiemodus** - schakelt de frequentiescanner in (kan de [scanbereikfunctie](./Scanning#scan-frequency-range-function) gebruiken)
* Tijdens een geheugenscan schakelt u met `F+`of door`* SCAN` lang ingedrukt te houden over naar de volgende geldige, niet-lege scanlijst.
### `F # 🗝`
* Kort indrukken - schakelt de `F+`-functiemodifier in of uit
* Lang indrukken - schakelt de toetsenbordvergrendeling in of uit; het menu `SetLck`selecteert of de vergrendeling ook programmeerbare sneltoetsacties en/of`PTT` omvat.

### Toetsenbordvergrendeling en SetLck

De toetsenblokkering schakelt het voorste toetsenblok altijd uit, behalve dat het lang indrukken van `F #`de mogelijkheid biedt om de radio te ontgrendelen. Het menu`SetLck` breidt de blokkering uit naar andere bedieningselementen:

* `KEYS`: de twee sneltoetsen voor de zijknop, `M Long`en`PTT`, blijven beschikbaar
* `KEYS + ACTIONS`: de programmeerbare sneltoetsen die zijn toegewezen aan `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`en`M Long`worden ook uitgeschakeld;`PTT` blijft beschikbaar
* `KEYS + PTT`:`PTT` is ook uitgeschakeld om onbedoelde verzending te voorkomen; programmeerbare sneltoetsen blijven beschikbaar
* `KEYS + ACTIONS + PTT`: het toetsenbord aan de voorzijde, programmeerbare sneltoetsen en `PTT` zijn allemaal uitgeschakeld

## Zijknoppen

### `PTT`
* Push-to-Talk-knop. Er zijn 2 modi: CLASSIC en ONEPUSH (zie menu `SetPTT`)
  * KLASSIEK - PTT werkt zoals gebruikelijk. Druk op de PTT om te beginnen met zenden en laat los om te stoppen.
  * ONEPUSH - PTT werkt als een schakelaar. Druk op de PTT om te beginnen met zenden en laat hem los wanneer je wilt. De transmissie blijft actief. Druk opnieuw op de PTT wanneer je wilt en laat hem dan los om te stoppen met zenden. Het werkt net als op de OpenGD77 (als je die kent).

* Wanneer deze knop wordt gebruikt om het scannen van kanalen/frequenties te stoppen, blijft het laatst gevonden kanaal op het scherm behouden.
* in combinatie met `Side button 2️⃣`, zendt de `1750 Hz` toon uit
* Als u deze knop tegelijk met een van de toetsen op het voorste toetsenbord ingedrukt houdt, worden DTMF-codes verzonden.

### `Side button 1️⃣`
* korte druk - door de gebruiker programmeerbaar in het menu: `F1Shrt`
* lang indrukken - door de gebruiker programmeerbaar in het menu: `F1Long`
* `F` en vervolgens kort indrukken - verhoogt de stapwaarde in de VFO-modus
* `F` ingedrukt houden - opent de zijtoetsactiekiezer

### `Side button 2️⃣`
* korte druk - door de gebruiker programmeerbaar in het menu: `F2Shrt`
* lang indrukken - door de gebruiker programmeerbaar in het menu: `F2Long`
* Deze knop kan ook worden gebruikt om de toon `1750 Hz`te verzenden door hem tegelijk met de`PTT`-knop ingedrukt te houden.
* `F` en vervolgens kort indrukken - verlaagt de stapwaarde in de VFO-modus
* `F` ingedrukt houden - opent de zijtoetsactiekiezer

### Actiekiezer voor zijtoetsen

De actiekiezer voert een beschikbare sneltoets uit zonder de functies te wijzigen die zijn opgeslagen in `F1Shrt`, `F1Long`, `F2Shrt`of`F2Long`.

Vanaf het normale radioscherm:

1. Druk kort op `F`zodat de indicator`F` verschijnt.
1. Houd zijknop 1️⃣ of zijknop 2️⃣ ingedrukt totdat de grijper opengaat.
1. Gebruik `UP`/`DOWN` om een actie te markeren.
1. Druk op `M` om het direct uit te voeren.

Het scherm toont de vorige, geselecteerde en volgende actie. `EXIT`of`F`annuleert zonder iets uit te voeren. Door op`PTT` te drukken, wordt de picker gesloten en wordt de normale PTT-afhandeling voortgezet, zodat een urgente verzending niet wordt geblokkeerd.

De selectieknop sluit ook automatisch na ongeveer vijf seconden, wanneer de ontvangst begint, als het toetsenbord vergrendeld raakt of wanneer een ander scherm de controle overneemt. Elke zijknop onthoudt de laatst geselecteerde actie voor de huidige sessie; de selecties worden gereset wanneer de radio opnieuw opstart.

De selectielijst toont dezelfde gecompileerde acties als hieronder beschreven, met uitzondering van `NONE`. De normale actiebeperkingen blijven van kracht: een actie die niet beschikbaar is in de huidige radiostatus wordt geweigerd met de gebruikelijke foutmelding.

## Externe microfoon
### `PTT`
* Push-to-Talk-knop.
* De `PTT on the external microphone`werkt anders dan de interne knop`PTT`.

> [!NOTE]
> Bij sommige hardwareversies gedraagt de externe microfoon `PTT` zich anders:
> - Bij het indrukken van de PTT-knop wacht de zender totdat er geen ontvangstsignaal meer is (_waargenomen met radio-PCB-revisie V1.4 en OK met V1.6_). Dit werkt goed met de interne `PTT`
> - een DTMF-toon ( `key press`) of een toon van 1750 Hz (`function button`) kan binnen een seconde worden afgesneden. Dit werkt goed samen met de interne`PTT`

## Aangepaste knopfuncties
In het menu kunnen vijf sneltoetsacties worden aangepast:
* `F1Shrt` - zijknop 1️⃣, kort indrukken
* `F1Long` - zijknop 1️⃣, lang indrukken
* `F2Shrt` - zijknop 2️⃣, kort indrukken
* `F2Long` - zijknop 2️⃣, lang indrukken
* `M Long` - menuknop, lang indrukken

Beschikbare functies:
* GEEN - geen actie
* ZAKLAMP - schakel naar de volgende zaklampfunctie: AAN / UIT
* POWER - schakel het uitgangsvermogen van de radio tussen [LAAG 1 / LAAG 2 / LAAG 3 / LAAG 4 / LAAG 5 / MIDDEN / HOOG]
* MONITOR - schakel de monitormodus AAN/UIT
* SCAN - start het scannen van kanalen/frequenties
* VOX - schakel de spraakactiveringsfunctie AAN/UIT
* FM-RADIO - zet de FM-radio AAN/UIT
* `1750 Hz`- verzend de`1750 Hz` toonstoot
* TOETSENBORD VERGRENDELEN - vergrendel/ontgrendel het toetsenbord
* VFO A VFO B - verander de hoofd-VFO naar boven/onder
* VFO MEM - wijzig de huidige VFO-modus, frequentiemodus of geheugenkanaalmodus
* MODE - schakel naar de volgende demodulatiemodus tussen [FM / AM / USB]
* RX-MODUS - schakel de weergavemodus tussen [DW / DWR / XB / MO]
* ALLEEN HOOFD - schakel de weergavemodus tussen [DW / DWR / XB] en MO
* PTT - schakel de PTT-modus tussen KLASSIEK en ONEPUSH
* BREED EN SMAL - schakel tussen BREED en SMAL
* MUTE - dempt het luidsprekervolume
* RxA - schakel het RX-audioprofiel voor de huidige modulatie: in `FM`,`FLAT`/`CLEAN`/`MID`/`BOOST`/`MAX`; in`AM`,`SHARP`/`STOCK`/`OPEN`
* HOOG VERMOGEN - schakel tijdelijk over naar het maximale vermogen van `5 W`
* OFFSET VERWIJDEREN - verwijder tijdelijk de offset van een geheugenkanaal, indien aanwezig
* BEAM - opent de BEAM-overdrachtmodus wanneer deze in de build is ingeschakeld. Met BEAM kunnen de huidige VFO-/geheugenkanaalinstellingen naar een andere radio worden verzonden of instellingen van een andere radio worden ontvangen.
* FOX HUNT - opent de applicatie voor het ontvangen van signalen, indien deze is geïnstalleerd of beschikbaar is als Labs-app.
* BEACON - opent de onafhankelijke Morse-bakenapplicatie, indien deze aanwezig is of beschikbaar is als geïnstalleerde Labs-app.
* RF LOG - opent het RX/TX-geschiedenislogboek, indien ingeschakeld in de build. Het logboek toont recente ontvangst-, monitoring- en verzendsessies die zijn opgeslagen in het externe flashgeheugen.

### BEAM-actie

Wijs `BEAM`toe aan een van de aanpasbare sneltoetsen (`F1Shrt`,`F1Long`,`F2Shrt`,`F2Long`of`M Long` ) en activeer vervolgens die sneltoets om de BEAM-modus te openen.

In BEAM-modus:

* `UP`/`DOWN`schakelt tussen`BEAM TX`en`BEAM RX`
* `M` start de geselecteerde bewerking
* `EXIT` verlaat de BEAM-modus

`BEAM TX` verzendt de huidige VFO- of geheugenkanaalconfiguratie. Het pakket bevat de RX-frequentie, TX-offset, RX/TX DCS- of CTCSS-instellingen, modulatie, bandbreedte, uitgangsvermogen, scanlijsttoewijzing, compander, DTMF-gerelateerde instellingen (indien ingeschakeld) en de kanaalnaam.

`BEAM RX`wacht op een BEAM-pakket van een andere radio. Wanneer een geldig pakket is ontvangen, slaat de radio dit op in het eerste vrije geheugenkanaal. Als het geheugen vol is, wordt de status`MEM FULL`weergegeven. Door na een succesvolle ontvangst op`EXIT` te drukken, schakelt de radio over naar het zojuist opgeslagen kanaal; anders wordt de vorige VFO/kanaalstatus hersteld.

### Vossenjacht actie

Wijs `FOX HUNT`toe aan een van de aanpasbare sneltoetsen (`F1Shrt`,`F1Long`,`F2Shrt`,`F2Long`of`M Long` ) en activeer vervolgens die sneltoets om FoxHunt te openen op de geselecteerde VFO.

In de Fox Hunt-modus:

* `1` schakelt tussen de S-meter trap en de grafiek met recente signaalgeschiedenis
* `2` schakelt tussen een stille pieptoon (Geiger-stijl) en het ontvangen audiosignaal van het station.
* `3`doorloopt de volgende cyclus:`ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP`en`BYP+`
* `UP`/`DOWN` wijzigt de demping van de ontvanger direct
* `M` reset de piek-, minimum- en signaaltrendreferenties
* Door `F` ongeveer 0,5 seconde ingedrukt te houden, worden de FoxHunt-bedieningselementen vergrendeld of ontgrendeld; de verzwakkingspijlen blijven beschikbaar terwijl de bediening vergrendeld is.
* `EXIT` verlaat FoxHunt

Zie [FoxHunt](./Fox-Hunt) voor de schermweergave, versterkingsinstellingen, bedieningselementen en richtingsbepalingsinstructies.

### BEACON-actie

Wijs `BEACON` toe aan een van de aanpasbare sneltoetsen en activeer die sneltoets vervolgens om de onafhankelijke Beacon-applicatie te starten. Beacon start direct met zijn eerste transmissie.

Met de toetsen `1`, `2`, `3`en`4` kunt u het TX-venster, het stille interval, de fox-identificatie en de keying-modus (`TONE`/`CARR`) aanpassen. Door `F`ongeveer 0,5 seconde ingedrukt te houden, worden alle Beacon-functies vergrendeld of ontgrendeld, ook tijdens een actieve transmissie.`M`stopt de huidige transmissie en start een nieuw inactief interval;`EXIT` stopt veilig en verlaat Beacon.

Zie [Beacon](./Beacon) voor identificatie, timing, zendbeveiliging, opgeslagen instellingen en veiligheidsinformatie.

### RF LOG-actie

Wijs `RF LOG`toe aan een van de aanpasbare sneltoetsen (`F1Shrt`,`F1Long`,`F2Shrt`,`F2Long`of`M Long` ) en activeer vervolgens die sneltoets om het RX/TX-geschiedenislogboek te openen.

Het logboek registreert ontvangst-, monitoring- en verzendsessies in het externe flashgeheugen. Elke verkeersregel toont:

* de kanaalnaam, wanneer de invoer afkomstig is van een geheugenkanaal; anders de frequentie
* of het nu om `RX`of`TX` ging
* een indexbadge met de nieuwste items eerst
* een detailbadge die de duur, het signaal/vermogen of de batterijspanning kan weergeven

Op het `RF LOG`-scherm:

* `UP`/`DOWN` bladert door het logboek, waarbij de nieuwste vermeldingen eerst worden weergegeven.
* `F`+`UP` springt naar de nieuwste invoer
* `F`+`DOWN` springt naar de oudste zichtbare invoer
* Door kort op `M`te drukken, schakelt u tussen de filters:`ALL`, `RX`, `TX`
* Door kort op `* SCAN` te drukken, wordt het detailbadge opnieuw weergegeven: duur, RX S-meter / TX-vermogensniveau, laagste batterijspanning tijdens de sessie
* Houd `M`ingedrukt om bevestiging te vragen voor het wissen van het logboek; houd`M`nogmaals ingedrukt wanneer`CLEAR LOG / SURE?` verschijnt om het logboek te wissen.
* `EXIT` verlaat het logscherm of annuleert de bevestiging.

De radio houdt maximaal 512 verkeersvermeldingen zichtbaar in de logboekweergave. Sessiescheidingslijnen markeren herstarts van de radio wanneer het `ALL`-filter actief is.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Menu](./Menu)
* [Radiobediening](./Radio-operation)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Geavanceerde functies](./Advanced-features)
* [Overlay-apps](./Overlay-apps)
* [Overlay-toepassingen](./Overlay-applications)
* [Probleemoplossing](./Troubleshooting)
