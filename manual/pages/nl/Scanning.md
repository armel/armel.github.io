> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Scanning/).

# Scannen

Deze pagina groepeert alle scan-gerelateerde functies: frequentiescan, geheugenscan, scanlijsten, `ScnRng`, frequentiekopie en DCS/CTCSS-scanning.

Voor de dagelijkse bediening van de VFO/het kanaal, zie [Radiobediening](./Radio-operation). Voor het gebruik van de spectrumanalysator, zie [Spectrumanalysator](./Spectrum-analyzer).

## Op deze pagina

* [Frequentiescanning](#frequency-scanning)
* [Geheugenkanalen scannen](#memory-channels-scanning)
* [MIX scanlijst](#mix-scan-list-v610)
* [Scanmodus: NORMAAL vs SNEL](#scan-engine-mode-normal-vs-fast)
* [Scanindicatoren en detectie](#scan-indicators-and-detection)
* [Frequentie kopiëren en DCS/CTCSS-scannen](#frequency-copy-and-dcs--ctcss-scanning)
* [Gerelateerde pagina's](#related-pages)

> [!TIP]
> Als de geheugenscan niet lijkt te werken, is de meest voorkomende oorzaak een lege lijst met actieve scans. Zie [Probleemoplossing](./Troubleshooting) voor snelle controles.

## Frequentiescanning

Om een frequentiescan te starten, schakelt u een VFO over naar de frequentiemodus. Stel een startfrequentie en een frequentiestap in (menu `Step`). Start het scannen met een [aangepaste scanknopfunctie](./Button-functions#custom-button-functions) of door de knop `* Scan` lang ingedrukt te houden.

### Scan frequentiebereikfunctie

* overschakelen naar frequentiemodus
* Stel de boven- en ondergrens van de VFO-frequentie in op de grenzen van het scanbereik.
* Druk lang op `5 NOAA`; het label `ScnRng` moet verschijnen
* Start de scan door lang op `* Scan` te drukken
* De radio scant het gebied tussen de geselecteerde grenzen.
* Houd `5 NOAA`of`EXIT`lang ingedrukt, of schakel tussen VFO's, om de`ScnRng`-modus te verlaten.

![Scanbereik](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

De `ScnRng`-functie wordt ook ondersteund door de spectrumanalysator. Als u `ScnRng` al hebt ingeschakeld, start dan gewoon de [spectrumanalysator](./Spectrum-analyzer).

Als u [AirCopy](./AirCopy) en overdracht `Settings`gebruikt, wordt het VFO-gebied meegenomen. Dit kopieert ook de huidige`ScnRng` grensfrequenties van de bronradio naar de doelradio.

### Frequentiebereiken uitsluiten in ScnRng

Als een `ScnRng`-scan is gestopt op een ontvangen frequentie, houd dan `MENU` ingedrukt om die frequentie uit te sluiten van de huidige bereikscan.

Er kunnen maximaal **64** bereikscanfrequenties worden uitgesloten. De lijst is circulair: na 64 uitsluitingen vervangt het toevoegen van een nieuwe uitsluiting de oudste opgeslagen uitsluiting.

Deze uitsluitingen zijn tijdelijk. Ze worden alleen bewaard voor de actieve `ScnRng`-configuratie en worden niet in het geheugen opgeslagen. Ze worden gewist als de radio opnieuw wordt opgestart, en ook wanneer de bereikidentificatie verandert: startfrequentie, stopfrequentie of scanstap.

## Scannen van geheugenkanalen

Met de geheugenscanfunctie kan de radio de opgeslagen geheugenkanalen doorzoeken in plaats van door de frequenties te bladeren.

Om het te gebruiken, schakelt u de VFO over naar **Geheugenmodus** en start u vervolgens de scan met een geprogrammeerde scantoets of door `* Scan` lang ingedrukt te houden.

### Lijsten scannen

De radio biedt **24 scanlijsten**. Elk geheugenkanaal kan worden toegewezen aan:

* `OFF`: het kanaal is uitgesloten van de scanlijsten
* `1`tot`24`: het kanaal behoort tot een specifieke scanlijst
* `ALL`: het kanaal is opgenomen in alle scanlijsten

Een geheugenkanaal kan slechts tot één van deze toestanden tegelijk behoren.

`MIX` is een actieve scanmodus, geen aparte toewijzing per kanaal. Deze combineert verschillende genummerde lijsten; zie [MIX scanlijst](#mix-scan-list-v610).

### Een kanaal toewijzen aan een scanlijst

Om de scanlijsttoewijzing van het huidige geheugenkanaal te wijzigen:

* open het `ScList` menu
* of houd `5 NOAA` lang ingedrukt voor de sneltoets voor toewijzing.

Met deze sneltoets kunt u door de kanalen bladeren:

* `OFF`
* `1`tot`24`
* `ALL`

De huidige toewijzing wordt rechts van de kanaalnaam weergegeven.

### Benoemde scanlijsten

Scanlijsten kunnen korte namen hebben.

Als een lijst een naam heeft, toont de radioknop, indien mogelijk, die **naam van 3 tekens** in plaats van het numerieke lijstnummer:

* in scan-gerelateerde statusindicatoren
* in lijstselectiemenu's
* in de weergave van de kanaallijsttoewijzing

Als een lijst geen naam heeft, toont het keuzeradiobutton in plaats daarvan het lijstnummer.

### Actieve scanlijst

Een geheugenscan gebruikt altijd één **actieve scanlijst**.

De momenteel actieve lijst wordt tijdens het scannen linksboven in het scherm weergegeven:

* `01`tot`24` voor een genummerde lijst
* `MIX`voor de opgeslagen combinatie van geselecteerde lijsten, beginnend met`v6.1.0`
* `ALL` voor alle vermelde kanalen

Als de geselecteerde lijst een naam heeft, wordt die korte naam weergegeven in plaats van het nummer.

Als de geselecteerde lijst leeg of ongeldig is, schakelt de radio automatisch over naar de volgende geldige, niet-lege lijst.

### Geheugenscan starten

Zodra de kanalen aan de lijsten zijn toegewezen, start u de geheugenscan door:

* gebruikmakend van een toets die is toegewezen aan de scanfunctie
* of lang indrukken `* Scan`

De radio scant vervolgens de geheugenkanalen die behoren tot de momenteel actieve scanlijst.

### De scanlijst wijzigen tijdens het scannen

De actieve scanlijst kan worden gewijzigd zonder de scan te onderbreken.

* Houd `* Scan` lang ingedrukt: ga naar de volgende geldige, niet-lege scanlijst
* `F + navigation key`: blader door scanlijsten tijdens het scannen ( `UP`/`DOWN`op UV-K5,`LEFT`/`RIGHT` op UV-K1)
* Directe invoer via toetsenbord:
  * `01`tot`24`: selecteer die scanlijst direct
  * `25`: selecteer`MIX`, beginnend met `v6.1.0`
  * `00`: selecteer`ALL`

Als de gevraagde lijst leeg is, geeft de radio een piepje en springt naar de volgende geldige, niet-lege lijst.

Wanneer een geheugenscan van lijst wisselt, vervangt de lijstnaam tijdelijk de voortgangsindicator. In `v5.9.0` wordt het hervatten van de scan vastgehouden zolang die naam daadwerkelijk zichtbaar is, zodat de verborgen indicator en de huidige scanpositie niet uit elkaar kunnen lopen en vervolgens vooruit kunnen springen wanneer de indicator terugkeert.

Deze korte pauze geldt alleen voor de geheugenscan. Bij de frequentiescan en `ScnRng` kan de overlay-aftelling nog steeds via de bedieningselementen worden geactiveerd, maar er wordt geen scanlijstnaam weergegeven en daarom wordt de scan zonder onverklaarbare pauze voortgezet.

### MIX scanlijst (v6.1.0)

`MIX` scant meerdere genummerde lijsten als één gecombineerde set zonder de lijst die aan een kanaal is toegewezen te wijzigen. Een kanaal wordt opgenomen wanneer:

* het behoort tot een van de genummerde lijsten die zijn ingeschakeld in de `MIX`-editor, of
* De kanaaltoewijzing is `ALL`

Kanalen die zijn toegewezen aan `OFF`blijven uitgesloten. Een kanaal heeft nog steeds slechts één toewijzing (`OFF`,`01`tot`24`, of`ALL`);`MIX` slaat een apart selectiemasker op dat beschrijft welke genummerde lijsten moeten worden gecombineerd.

Om `MIX` te configureren:

1. Open `ScList`.
1. Selecteer `MIX`en druk op`M`.
1. Gebruik de navigatietoetsen om door de lijsten `01`tot en met`24` te navigeren, of voer een tweecijferig lijstnummer in om er direct naartoe te springen.
1. Druk op `M`om de gemarkeerde lijst`ON` in of uit te schakelen.
1. Druk op `EXIT`om de selectie op te slaan en`MIX` als actieve scanmodus in te stellen.

De editor geeft het aantal geselecteerde lijsten weer als `NN/24`. Er moet minstens één lijst ingeschakeld blijven; als u probeert de laatst geselecteerde lijst uit te schakelen, klinkt er een foutmelding.

De normale scanlijstvolgorde is `01`tot en met`24`, vervolgens `MIX`en daarna`ALL`. Tijdens een actieve geheugenscan kunt u `25`invoeren om direct`MIX`te selecteren of`00`om`ALL`te selecteren. Als de resulterende`MIX` geen geldig scanbaar kanaal bevat, geeft de radio een pieptoon en schakelt over naar de volgende geldige modus.

Het opgeslagen `MIX`-masker maakt deel uit van de radio-instellingen en wordt opgenomen in een [AirCopy](./AirCopy) `Settings`-overdracht.

### Scanrichting wijzigen

Druk tijdens het scannen op een navigatietoets:

* `UP`/`DOWN` op UV-K5
* `LEFT`/`RIGHT` op UV-K1

Dit keert de richting om waarin de geheugenkanalen in de huidige scanlijst worden doorlopen.

### Prioriteitsscan

De radio ondersteunt twee prioriteitskanalen:

* `PriCh1`
* `PriCh2`

Deze instellingen worden geconfigureerd in het menu en beheerd door de instelling `ScPri`.

#### Hoe het werkt

Wanneer prioriteitsscannen is ingeschakeld, scant de radio de kanalen niet simpelweg in de lijstvolgorde. In plaats daarvan voegt hij de prioriteitskanalen herhaaldelijk toe aan de scancyclus.

De scanvolgorde wordt als volgt:

1. `PriCh1`
1. `PriCh2`
1. het volgende reguliere kanaal uit de actieve scanlijst

Deze cyclus herhaalt zich vervolgens continu.

Hierdoor kan de radio de twee prioriteitskanalen vaker controleren dan de reguliere kanalen, waardoor activiteit op deze kanalen sneller wordt gedetecteerd.

#### Belangrijk gedrag

Wanneer prioriteitsscannen is ingeschakeld:

* Prioriteitskanalen worden apart behandeld van normale lijstscans.
* Als een prioriteitskanaal ook in de actieve scanlijst staat, wordt het uit het reguliere scanpad verwijderd om te voorkomen dat het dubbel wordt gescand.
* Prioriteitskanalen kunnen nog steeds worden gecontroleerd, zelfs als ze buiten de normale lijstweergave vallen.

### Scan Stop- en Hervatgedrag

Als de scanner activiteit op een kanaal detecteert, hangt wat er vervolgens gebeurt af van de instelling `ScnRev`.

Afhankelijk van deze instelling kan de radio het volgende doen:

* Hervat het scannen automatisch na een vertraging
* Blijft gestopt op het actieve kanaal totdat de scan handmatig opnieuw wordt gestart

Het pauzeren en hervatten van de scan wordt daarom geregeld door de scanhervatmodus, niet door de scanlijst zelf.

### Een kanaal uitsluiten tijdens een scan

Als de geheugenscan op een ontvangen geheugenkanaal is gestopt, houd dan `MENU` ingedrukt om dat kanaal uit te sluiten van toekomstige geheugenscans.

#### Belangrijke opmerking

Deze uitzondering is tijdelijk.

Het kanaal blijft uitgesloten tot de volgende herstart van de zendontvanger.

### Scan cv

Als u de zendontvanger uitschakelt terwijl deze aan het scannen is, wordt de scan automatisch hervat wanneer u deze de volgende keer weer inschakelt.

### Algemene frequentie-/kanaalscanfuncties

De volgende instellingen gelden voor zowel frequentiescans als geheugenscans:

* Druk tijdens het scannen op een navigatietoets om de scanrichting om te keren ( `UP`/`DOWN`op UV-K5,`LEFT`/`RIGHT` op UV-K1)
* Druk op `EXIT` om de scan te stoppen en terug te keren naar de frequentie of het kanaal dat was geselecteerd voordat de scan begon.
* Druk op `PTT`of`MENU` om de scan te stoppen en de laatst gevonden frequentie of het laatst gevonden kanaal te behouden.

## Scanmodus: NORMAAL versus SNEL

Builds met snelle scanondersteuning voegen het menu `SetScn`toe. Hiermee wordt de scanengine geselecteerd die wordt gebruikt voor geheugenscans en`ScnRng`.

### NORMAAL

`NORMAL` gebruikt het standaard scanpad. Elke frequentie of geheugenkanaal wordt volledig toegepast op de radio, met normale VFO-configuratie, squelch-/uitgangsvermogensinstelling, ontvangerregisterinstelling en de gebruikelijke scanpauze-timing.

Deze modus is de meest conservatieve keuze. Hij is handig als u de voorkeur geeft aan het oudere scangedrag of als u de resultaten wilt vergelijken met die van de snelle engine.

### SNEL

`FAST` is de standaardmodus in de huidige builds. Deze voegt een lichte RSSI-voorcontrole toe vóór de volledige ontvangstconfiguratie:

* Bij een geheugenscan test de firmware de volgende kanaalfrequentie en slaat deze snel over als deze duidelijk stil is.
* Voor `ScnRng` test de firmware een kleine reeks bereikstappen voordat een volledige afstelling wordt uitgevoerd.
* Stille batches worden sneller overgeslagen, waardoor er minder tijd wordt besteed aan het scannen van een leeg spectrum.
* Mogelijke signalen worden teruggezet naar het normale volledige ontvangstpad, waardoor squelch en het normale scan-resume-gedrag nog steeds bepalen wat er vervolgens gebeurt.
* In `ScnRng` kunnen fijne stappen rond een kandidaat worden verfijnd, zodat de scan dichter bij het sterkste nabijgelegen signaal terechtkomt.
* Als de scanlus vastloopt nadat de normale pauze `ScnRev` is verstreken, hervat een korte watchdog het scannen.

De snelle voorcontrole leert een lokale RSSI-ruisvloer en vergelijkt elke probe met die vloer en de geconfigureerde squelch-drempel. Als de squelch volledig open staat, of als het snelle pad een kanaal niet veilig kan voorcontroleren, schakelt de firmware voor die stap terug naar de normale volledige afstemming.

> [!NOTE]
> In de `ScnRng`-modus kan de `FAST`-modus onder gunstige omstandigheden meer dan **150 frequenties per seconde** scannen, vooral wanneer het grootste deel van het bereik stil is en de scan stille frequenties kan overslaan zonder voor elke stap een volledige ontvangstconfiguratie uit te voeren.

Bij een eenvoudige frequentiescan buiten `ScnRng`wordt nog steeds één frequentiestap tegelijk vooruitgegaan;`SetScn = FAST` wijzigt voornamelijk het gedrag van de geheugenscan en het scanbereik.

## Scanindicatoren en detectie

Bij de huidige snelle scans kan een kleine RSSI-sparkline worden weergegeven tijdens het scannen. Dit is een compacte weergave van recente RSSI-waarden; rustige waarden blijven laag, terwijl sterkere kandidaten opvallen als hogere waarden.

Tijdens een geheugenscan blijft de scanlijstindicator de actieve lijst weergeven:

* `01`tot`24`
* `MIX`, beginnend met`v6.1.0`
* `ALL`
* de naam van de scanlijst van 3 tekens, indien de lijst er een bevat

Wanneer prioriteitsscannen is ingeschakeld, wordt een `+` toegevoegd aan de indicator van de scanlijst.

Tijdens `ScnRng` kunnen builds met ondersteuning voor een scanbereik onder het hoorbare niveau CTCSS/DCS detecteren terwijl de radio stilstaat op een ontvangen signaal. Als een code wordt gevonden, kan de scaninterface de gedetecteerde toon of DCS-code samen met de ontvangen frequentie weergeven.

De scanweergave verfijnt ook de plaatsing van de VFO-vergrendelingsindicator tijdens het scannen, zodat de TX-vergrendelingsstatus zichtbaar blijft zonder de actieve scaninformatie te overlappen.

## Frequentiekopie en DCS/CTCSS-scanning

Met deze functie kunt u frequentie- en code-instellingen detecteren en kopiëren. De frequentiezoekfunctie werkt alleen bij sterke signalen, dus de zendende radio moet dichtbij zijn. Om het kopiëren van de frequentie te starten (`FC`), gebruikt u de functietoets `4 FC`. Het scannerscherm wordt geopend. Houd de PTT-knop op de andere radio ingedrukt. Wacht een paar seconden totdat de frequentie en code (indien van toepassing) op het scherm verschijnen. De instellingen kunnen worden opgeslagen met de knop `MENU`. Ze worden opgeslagen op een kanaal of op de hoofd-VFO, afhankelijk van de modus waarin u de scan hebt gestart.

In de huidige versies geeft het scannerscherm de status duidelijker weer:

* `Search Freq`: frequentie zoeken is bezig
* `Search Tone`: zoeken naar subhoorbare tonen/codes is actief
* `Scan Complete`: er is een resultaat gevonden
* `Scan Failed`: geen bruikbaar resultaat gevonden
* `Freq:` geeft de gedetecteerde frequentie weer
* `Tone:`/`CTCSS:`/`DCS:` toont de gedetecteerde subhoorbare instelling wanneer deze is gevonden

U kunt ook alleen zoeken naar de DCS/CTCSS-code voor een frequentie die is ingesteld op de hoofd-VFO. Kies de gewenste frequentie of het gewenste kanaal en druk op `F`+`* SCAN`. Hetzelfde scherm verschijnt, maar de frequentiezoekfunctie wordt overgeslagen; in plaats daarvan wordt de frequentie van de hoofd-VFO gebruikt. Wacht tot er een signaal verschijnt of druk op de PTT-knop van de andere radio. Het duurt 1 tot 2 seconden voordat de code is gevonden. De opslagprocedure is hetzelfde als hierboven.

Er is nog een andere manier om naar een DCS/CTCSS-code te zoeken. Kies de gewenste frequentie of het gewenste kanaal. Ga naar het menu `RxDCS`of`RxCTCS`. Selecteer de menuoptie en druk op de knop `* SCAN`. Er verschijnt een label `SCAN`. Wacht op een radiosignaal of druk op de PTT-knop van de andere radio. Wanneer de code is gevonden, verdwijnt het label `SCAN`. Om de code op te slaan, bevestig je de optie met de knop `MENU`. Het maakt niet uit vanuit welk van de twee menu's je begint: zowel DCS als CTCSS worden gevonden en de menuoptie wordt automatisch aangepast naar de juiste.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Radiobediening](./Radio-operation)
* [Knopfuncties](./Button-functions)
* [Spectrumanalysator](./Spectrum-analyzer)
* [Geavanceerde functies](./Advanced-features)
* [AirCopy](./AirCopy)
* [Probleemoplossing](./Troubleshooting)
