> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Advanced-features/).

# Geavanceerde functies

Deze pagina behandelt gespecialiseerde of optionele functies die niet nodig zijn voor de basiswerking van de radio: BEAM, RF-logboek, RescueOps, UV Studio, Hervatmodus, het ingebouwde spel en de op onderzoek gebaseerde procedure voor het ontgrendelen van de zender. AirCopy, FoxHunt, Beacon, Multiboot en overlay-apps hebben hun eigen gedetailleerde pagina's.

Voor dagelijks gebruik van de radio, zie [Radiobediening](./Radio-operation). Voor scan-gerelateerde functies, zie [Scannen](./Scanning).

> [!NOTE]
> Waar op deze pagina `UP`/`DOWN`wordt vermeld, gebruik dan de overeenkomstige toetsen`LEFT`/`RIGHT`op de UV-K1. De actieve navigatie-indeling volgt`SetNav`.

## Op deze pagina

* [AirCopy](#aircopy)
* [Multiboot-, Multiconfig- en overlay-apps](#multiboot-multiconfig-and-overlay-apps)
* [STRAALoverdrachtmodus](#beam-transfer-mode)
* [Vossenjacht](#foxhunt)
* [Beacon](#beacon)
* [RF-logboek](#rf-log)
* [RescueOps](#rescueops)
* [Spel](#game)
* [UV Studio](#uv-studio)
* [Hervatmodus](#resume-mode)
* [TX op alle banden](#tx-on-all-bands)
* [Gerelateerde pagina's](#related-pages)

## AirCopy

AirCopy draagt geheugenbanken en instellingen over tussen compatibele radio's. `v6.0.0`voegde bevestigde blokken, herhaalpogingen en duplicatieverwerking toe, en`All (Mem+Set)`.`v6.1.0` voegt frames met meerdere blokken, vergelijking en overslaan van identieke blokken, kabeltransport en beveiligd klonen van externe flashgeheugens toe in de Transfer-editie.

Zie [AirCopy](./AirCopy) voor informatie over de beschikbaarheid van edities, bedieningselementen, protocolcompatibiliteit, radio-overdracht, `CABLE COPY`en`Flash 2M` veiligheidsinformatie.

## Multiboot-, Multiconfig- en overlay-apps

`v6.0.0` voegt twee grotere platforms toe die afzonderlijk zijn gedocumenteerd:

* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig) legt `Main`uit, plus vier firmware-slots, de opstartselector, onafhankelijke configuratiebanken,`SetCfg` en UV Studio-slotbeheer.
* [Overlay-apps](./Overlay-apps) legt het experimentele Labs-only `.app`-platform uit, de installatie via UV Studio, de `F + 7`-launcher, compatibiliteitscontroles en app-ontwikkeling.

## BEAM-overdrachtsmodus

BEAM is een optionele directe overdrachtsmodus voor één VFO of geheugenkanaal. In tegenstelling tot [AirCopy](./AirCopy), waarmee geheugenbanken of instellingensecties worden overgedragen, is BEAM bedoeld om de momenteel geselecteerde configuratie snel te delen met een andere compatibele radio.

Wijs `BEAM`toe aan een van de aanpasbare sneltoetsen (`F1Shrt`,`F1Long`,`F2Shrt`,`F2Long`of`M Long` ) en activeer vervolgens die sneltoets om de BEAM-modus te openen.

In BEAM-modus:

* `UP`/`DOWN`schakelt tussen`BEAM TX`en`BEAM RX`
* `M` start de geselecteerde bewerking
* `EXIT` verlaat de BEAM-modus

`BEAM TX` verzendt de huidige VFO- of geheugenkanaalconfiguratie, inclusief frequentie, offset, tonen, modulatie, bandbreedte, vermogen, toewijzing van scanlijst, compander, DTMF-gerelateerde instellingen (indien ingeschakeld) en kanaalnaam.

`BEAM RX`wacht op een BEAM-pakket van een andere radio en slaat dit op in het eerstvolgende vrije geheugenkanaal. Als het geheugen vol is, wordt de status`MEM FULL` weergegeven.

Zie [Knopfuncties](./Button-functions#beam-action) voor de details op sneltoetsniveau.

## Vossenjacht

[FoxHunt](./Fox-Hunt) is een applicatie voor het meten van signaalsterkte en richting, die alleen signalen ontvangt. Sinds `v6.0.0`heeft het een eigen sneltoetsactie`FOX HUNT`. Het is standaard opgenomen in FieldOps en beschikbaar als installeerbare overlay-app in Labs.

## Baken

[Beacon](./Beacon) is een aparte ARDF-achtige Morse-zendapplicatie met een eigen `BEACON` sneltoetsactie en veiligheidsvereisten. Deze is standaard aanwezig in FieldOps en beschikbaar als een aparte installeerbare overlay-applicatie in Labs.

## RF-log

Builds met RX/TX-logging voegen een sneltoetsactie `RF LOG`toe. Wijs deze toe aan`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`of`M Long` en activeer vervolgens die sneltoets om het geschiedenisscherm te openen.

Het RF-logboek registreert ontvangst-, monitoring- en verzendsessies naar een extern flashgeheugen. Het is handig om recente activiteit na een scan te controleren, een onbeheerd kanaal te bewaken of transmissies te bekijken die tijdens veldgebruik zijn gedaan.

Elke geregistreerde verkeersinvoer slaat het volgende op:

* frequentie, of de referentie van het geheugenkanaal toen de sessie afkomstig was van een opgeslagen kanaal
* RX- of TX-richting
* sessieduur
* piekniveau van de RX S-meter voor ontvangen sessies, of piekvermogen voor verzonden sessies
* laagste accuspanning gemeten tijdens de sessie

In de logboekweergave worden de meest recente vermeldingen eerst weergegeven en zijn maximaal 512 verkeersvermeldingen zichtbaar. Wanneer het filter `ALL` is geselecteerd, markeren horizontale scheidingslijnen herstarts van de radio.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Bedieningselementen op het RF-logscherm:

* `UP`/`DOWN`: scroll door items
* `F`+`UP`: ga naar het nieuwste item
* `F`+`DOWN`: spring naar de oudste zichtbare invoer
* `M`: schakel het filter tussen `ALL`, `RX`en`TX`
* `* SCAN`: schakel tussen de weergaveduur, S-meter/TX-vermogen en laagste batterijspanning op het detailbadge aan de rechterkant.
* Houd `M`lang ingedrukt: open de wisbevestiging; houd`M`nogmaals lang ingedrukt op`CLEAR LOG / SURE?` om het logboek te wissen
* `EXIT`: verlaat het RF-logscherm of annuleer de wisbevestiging

Het logboek wordt opgeslagen in een gereserveerd extern flashgeheugen, waardoor het bestand blijft tegen het opnieuw opstarten van de computer. Het wissen van het logboek wist dit gereserveerde gebied.

Zie [Knopfuncties](./Button-functions#rf-log-action) voor de details op sneltoetsniveau.

## Reddingsoperaties

### Vrijwaring

Ik wil graag verduidelijken dat ik geen expert ben op het gebied van hulpdiensten; deze speciale functie is echter ontwikkeld met de bedoeling om zo effectief mogelijk te voldoen aan de communicatiebehoeften van hulpverleners. Ik sta open voor suggesties ter verbetering van professionals, binnen de grenzen van mijn mogelijkheden, de beschikbare tijd en de technische mogelijkheden van de zendontvanger.

### Overzicht

De RescueOps-functie is specifiek ontwikkeld voor integratie in een communicatiesysteem voor hulpverleners (zoals brandweerlieden). Het voegt beperkte bedieningsmogelijkheden en verbeterd zaklampgedrag toe, dat kan worden ingesteld op een vaste, knipperende of SOS-modus. Via het menu `SetKey`selecteert u de opstarttoets die wordt gebruikt met`PTT`om de RescueOps-modus in of uit te schakelen. Standaard is dit toets`MENU`, maar het kan ook `UP`, `DOWN`, `EXIT`of`* SCAN` zijn.

In de officiële `v6.0.0`-familie is RescueOps opgenomen in `FieldOps`en`Labs`. AirCopy is een aparte functionaliteit die wordt geleverd door `Transfer`en`Labs`; het inschakelen van RescueOps activeert op zichzelf niet AirCopy.

### Gebruik

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), een lid van het “[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”, heeft [documentatie](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) geschreven die specifiek is gewijd aan het gebruik van de RescueOps-functie. Hartelijk dank aan hem.

Standaard functioneert de transceiver net als elke andere firmwareversie, waardoor toegang mogelijk is tot menu's (en verborgen menu's), lang indrukken of toetscombinaties `F` om diverse functies rechtstreeks vanaf het toetsenbord te activeren (bijvoorbeeld om een scan te starten of het zendvermogen aan te passen), evenals sneltoetsen.

Als de transceiver echter wordt ingeschakeld terwijl zowel de `PTT`-toets als de toets die is geconfigureerd in het `SetKey`-menu wordt ingedrukt, schakelt deze over naar de RescueOps-modus, wat de volgende wijzigingen teweegbrengt:

* Het menu is vergrendeld
* Lang indrukken en toetscombinaties `F`zijn uitgeschakeld (behalve`A/B` en toetsenbordvergrendeling).
* Opnieuw opstarten in de modus met verborgen menu is geblokkeerd
* Het toetsenbord kan alleen worden gebruikt om geheugenkanalen te wijzigen, net als de `UP`en`DOWN` toetsen.

Kort en lang indrukken van `F1`en`F2`, evenals lang indrukken van `M`, blijven beschikbaar voor sneltoetsen. Deze configuratie is de verantwoordelijkheid van degene die de transceiver instelt. Als sneltoetsen niet gewenst zijn, kunnen ze eenvoudig worden ingesteld op de actie `NONE`.

Houd er rekening mee dat de RescueOps-functie 2 nieuwe acties biedt:

* `POWER HIGH`, waarmee u indien nodig snel en tijdelijk kunt overschakelen naar het maximale vermogen van `5 W`
* `REMOVE OFFSET`, om de offset van een geheugenkanaal tijdelijk te verwijderen indien aanwezig

Deze twee acties zijn toegevoegd op verzoek van reddingswerkers en sluiten aan op de behoeften in het veld.

Eenmaal in de RescueOps-modus blijft de transceiver bij elke normale opstart in deze modus. Om terug te keren naar de standaardmodus, met toegang tot menu's en verborgen menu's, herhaalt u eenvoudigweg de opstartprocedure terwijl u zowel de `PTT`-toets als de toets die is geconfigureerd in het `SetKey`-menu indrukt.

## Spel

Deze firmware bevat een klein breakout-spelletje.

* In builds zonder overlay-apps drukt u op `F+7` om het in-game spel te starten.
* In de `Labs`-editie opent `F+7`de [overlay-app-launcher](./Overlay-apps); installeer en selecteer`Breakout` of een ander spel daar.
* Om af te sluiten, druk op `EXIT`
* Je kunt het spel pauzeren met `M`
* Beweeg de peddel met `4`of`UP`om naar links te gaan, en met`0`of`DOWN` om naar rechts te gaan.

Dit spel heeft geen andere ambitie dan plezier. Het idee was simpelweg om te ontdekken wat er allemaal mogelijk is met de Quansheng K5 en de bijbehorende radiofuncties. Zie het als een speelse knipoog naar het tijdperk van de Nokia 3310.

![Spel](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## UV Studio

[UV Studio](./UV-Studio) is de uniforme, browsergebaseerde begeleider voor deze firmware:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

Het biedt de browsergebaseerde workflows voor het bekijken, bedienen, onderhouden en herstellen van de radio:

* live `128x64` schermspiegeling
* Virtuele UV-K1- en UV-K5-toetsenborden met ondersteuning voor korte en lange druktoetsen
* Compatibel met RF-log streaming, analyses en CSV-export
* Firmware flashen vanuit stabiele editiecatalogi, de rolling development build of een lokaal bestand
* Beheer van multiboot-firmware-slots en Labs-overlay-apps
* Kalibratie back-up en herstel
* Aangepast opstartlogo uploaden en downloaden
* in `v1.6.0`, Externe flashback-up/herstel (alleen voor laboratoria) en begeleid herstel van fabriekssoftware

Het maakt gebruik van `Web Serial` en wordt lokaal uitgevoerd in een compatibele desktopbrowser zonder installatie, server of account.

> [!IMPORTANT]
> De bediening via de viewertoetsen biedt geen mogelijkheid tot zenden op afstand. UV Studio kan geen uitzending starten en de op het scherm weergegeven `PTT` zendt niet uit.

Zie [UV Studio](./UV-Studio) voor de versiestatus, editievereisten, radiomodi, veiligheidsinformatie en de volledige workflows.

## Hervatmodus

Uw transceiver zal opnieuw opstarten in dezelfde staat als waarin hij zich bevond voordat hij werd uitgeschakeld. Dus als hij in de Bandscope-modus stond, naar FM-uitzendingen luisterde of aan het scannen was, zal hij bij de volgende opstart automatisch die staat hervatten.

## Zendt op alle banden

### Waarschuwing

**Deze modificatie is NIET GETEST en is UITSLUITEND bedoeld voor ONDERZOEKSDOELEINDEN, om de mogelijkheden van het apparaat en de chipset te verkennen. NIET uitzenden op illegale frequenties. GEBRUIK een dummy load. De auteur(s) en bijdrager(s) van deze repository zijn NIET aansprakelijk voor enige schade, rechtszaken of andere gevolgen van misbruik van deze onderzoeksfirmware en aanvaarden geen enkele aansprakelijkheid. Door firmware uit deze repository te installeren, aanvaardt u de volledige verantwoordelijkheid voor alle mogelijke gevolgen en doet u afstand van het recht om juridische stappen tegen de auteur(s) te ondernemen.**

Met deze optie kunt u alleen zenden in de modulatiemodus FM; dit is een hardwarebeperking. Schakelen naar AM of SSB verandert alleen de audio-uitgangsmodus van de RF-chip. De hele chip wordt niet in de AM/SSB-modus gezet. Dit is alleen voor luisterdoeleinden. Deze firmware is ook voorzien van een extra vergrendeling die zenden blokkeert wanneer AM of SSB is ingeschakeld.

Als voorbeeld waarom dit niet voor daadwerkelijke communicatie gebruikt moet worden, bekijk dan de volgende grafiek voor het zendvermogen bij `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 microwatt**
* `54 MHz` -> 2,4 milliwatt
* `81 MHz` -> 230 milliwatt
* `109 MHz` -> 558 milliwatt
* `136 MHz` -> 412 milliwatt
* `163 MHz` -> 122 milliwatt
* `190 MHz` -> 14,8 milliwatt
* `218 MHz` -> 2 milliwatt
* `245 MHz` -> 2,6 milliwatt

Credits: [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Hoe je TX op alle frequentiebanden kunt ontgrendelen

1. Ga naar het [verborgen menu](./Menu#hidden-menu)
1. Ga naar menu `F Lock`
1. Kies optie `UNLOCK ALL`
1. Herhaal stap 2-3 **3 keer**. Doe dit zorgvuldig. Als u tijdens het proces een andere optie bevestigt, wordt de teller gereset en moet u de procedure opnieuw uitvoeren.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Radiobediening](./Radio-operation)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-apps](./Overlay-apps)
* [Knopfuncties](./Button-functions)
* [Probleemoplossing](./Troubleshooting)
