> 🌐 **Vertalen**
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Recent-changes/).

# Recente wijzigingen

Deze pagina geeft een overzicht van de nieuwste stabiele release `v6.1.0` en de belangrijkste voor de gebruiker zichtbare wijzigingen ten opzichte van eerdere versies.

Voor het officiële release-archief, zie de [GitHub releases-pagina](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## Hoogtepunten van v6.1.0

`v6.1.0`is de nieuwste stabiele versie. Deze richt zich op snellere en veiligere gegevensoverdracht, de nieuwe`MIX` scanlijstmodus, uitgebreider Labs-onderhoud via UV Studio en diverse betrouwbaarheidsverbeteringen.

### Releasepakket

Download de firmware en bijbehorende bestanden van de [v6.1.0 releasepagina](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). Deze release bevat de vier officiële edities: `Fusion`, `FieldOps`, `Transfer`en`Labs`, plus het bijbehorende gedeelde CHIRP-stuurprogramma. Kies de editie op basis van de functionaliteit in plaats van Fusion te beschouwen als een pakket dat alle gespecialiseerde functies bevat.

### Upgraden van v6.0.0

1. Download, terwijl de oude firmware nog steeds is geïnstalleerd, de radio met behulp van het bijbehorende CHIRP-stuurprogramma en sla de image op. Exporteer optioneel de geheugenkanalen naar een CSV-bestand.
1. Maak een back-up van de apparaatspecifieke kalibratie van de radio met [UV Studio](./UV-Studio#calibration).
1. Installeer de gekozen `v6.1.0`-editie. Voer alleen een fabrieksreset uit als de release-instructies of het migratiepad van uw geïnstalleerde versie dit expliciet vereisen.
1. Laad het speciale `v6.1.0` CHIRP-stuurprogramma en download een nieuwe image van de bijgewerkte radio.
1. Kopieer de oude kanaalrijen naar de nieuwe afbeelding in plaats van de complete oude instellingenafbeelding te uploaden.
1. Selecteer in Labs `v6.1.0` in de versiebeheercatalogus van UV Studio. Vervang elke overlay-app die door de loader als incompatibel wordt gemeld.
1. Voordat u AirCopy gebruikt, moet u beide radio's bijwerken naar de compatibele `v6.1.0`-firmware; het geoptimaliseerde radioprotocol is niet compatibel met eerdere versies via een kabelverbinding.

Voor een extra back-up na de installatie van `v6.1.0` Labs kan UV Studio de volledige externe flashgeheugen opslaan. Zie [De juiste back-up of kopie kiezen](./UV-Studio#choosing-the-right-backup-or-copy).

### AirCopy-prestaties en kabelklonen

Het `v6.1.0`AirCopy-protocol verzendt maximaal drie`64-byte`blokken in één FSK-frame, waardoor de doorlooptijd wordt verkort en radio-overdrachten ongeveer twee keer zo snel verlopen. Het vergelijkt CRC32-hashes in groepen van maximaal`24` blokken en verzendt alleen de blokken die verschillen op het doel.

De `Transfer`-editie voegt ook `CABLE COPY`via UART en een kabel-only`Flash 2M`-selectie toe voor het klonen van externe Flash, waarbij de apparaatspecifieke kalibratiesector wordt weggelaten. De selectie van zender en ontvanger wordt gevalideerd voordat de gegevens worden geschreven.

Dit is een nieuw protocol: beide radio's moeten dezelfde compatibele firmware gebruiken. Zie [AirCopy](./AirCopy#v610-improvements).

### MIX scanlijst

De nieuwe modus `MIX`scant een opgeslagen selectie van lijsten`01`tot`24`als één gecombineerde set. Selecteer`MIX`in`ScList`, druk op `M`om de editor te openen, schakel lijsten in/uit met`M`en sla op met`EXIT`. De editor toont het aantal geselecteerde lijsten en er moet ten minste één lijst ingeschakeld blijven.

Tijdens een actieve geheugenscan selecteert het invoeren van `25` `MIX`; `00`selecteert vervolgens`ALL`. Zie [Scannen](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0`voegt volledige`2 MiB`externe-flashback-up en -herstel toe voor Labs. Herstel behoudt de apparaatspecifieke kalibratiesector, slaat identieke`4 KiB` sectoren over met behulp van CRC32 indien ondersteund, controleert elke geschreven sector en herstart de radio na afloop.

Een nieuwe, begeleide softwareherstelprocedure controleert de meegeleverde afbeeldingen op grootte en SHA-256-hash, herstelt een gereconstrueerde externe flash-image met behoud van kalibratie, vraagt vervolgens om de DFU-modus en installeert de bijbehorende UV-K1- of UV-K5 V3-firmware. De interface groepeert kalibratie- en opstartlogo-bewerkingen in overzichtelijkere weergaven voor back-up/herstel of downloaden/uploaden.

Deze tools voor externe flashgeheugen vereisen `v6.1.0` Labs. Zie [UV Studio](./UV-Studio#version-status), [back-up en herstel van extern flashgeheugen](./UV-Studio#external-flash-backup-and-restore-v160) en [herstel van fabriekssoftware](./UV-Studio#factory-software-restoration-v160).

### Overige wijzigingen in versie 6.1.0

De release voegt ook de overlay-games [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll), en [`Space Impact`](./Overlay-applications#space-impact) toe, plus oplossingen voor problemen met RF Log in configuratiebanken, opslag van overlay-apps, gewiste kalibratie en de afhandeling van DCS squelch tail.

## Hoogtepunten van v6.0.0

`v6.0.0` werd uitgebracht op 10 september 2026. Het introduceerde vier officiële edities, Multiboot en Multiconfig, het Labs overlay-app-platform, het betrouwbare AirCopy en de onafhankelijke FoxHunt- en Beacon-applicaties.

### Vier officiële edities

| Editie | Beoogd gebruik | Extra functies |
| --- | --- | --- |
| `Fusion` | dagelijks gebruik | evenwichtige referentie-editie; aanbevolen voor de meeste gebruikers |
| `FieldOps` | veldwerk en eerstehulpverlening | RescueOps, FoxHunt (inwoner van de regio) en Beacon (inwoner van de regio) |
| `Transfer` | radio-naar-radio gegevensoverdracht | AirCopy en resident Beam |
| `Labs` | experimenten | RescueOps, AirCopy en overlay-apps zoals FoxHunt, Beacon en Beam |

Fusion `v6.0.0` bevat niet langer de gespecialiseerde functies AirCopy, Beam, RescueOps, Fox Hunt/Beacon of Breakout uit versie 5.x. Kies de juiste gespecialiseerde editie wanneer u een van deze functies nodig hebt.

### Onafhankelijke FoxHunt- en Beacon-aanvragen

De voormalige gecombineerde actie `FOX HUNT / BEACON`werd opgesplitst vóór de release van`v6.0.0`. `FOX HUNT`en`BEACON` zijn afzonderlijke programmeerbare acties, afzonderlijke residentiële applicaties in FieldOps en afzonderlijke overlay-apps in Labs.

Zie [FoxHunt](./Fox-Hunt) en [Beacon](./Beacon).

### Multiboot

Compatibele edities kunnen vier extra F4HWN-firmware-images opslaan in extern flashgeheugen. Houd `M`(`MENU`) ingedrukt terwijl u de radio inschakelt om de opstartselector te openen, de opgeslagen images te valideren en`Main`of slot`1`te herstellen naar`4`.

De firmware beschermt automatisch de normaal geflashte image als `Main`, controleert de volledige CRC van een slot voordat het interne flashgeheugen wordt gewist en registreert de actieve status redundant. De `Firmware Slots`-weergave van UV Studio installeert, controleert, benoemt en wist de vier gebruikersslots terwijl de radio in de normale modus staat.

Alleen Multiboot-compatibele `v6.0.0` of nieuwere F4HWN-images mogen in deze slots worden geïnstalleerd. Zie [Multiboot en Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig en SetCfg

Elke firmware-sleuf selecteert standaard een aparte configuratiebank. Geheugenkanalen, kanaalnamen, VFO's, scanlijsten en radio-instellingen blijven daardoor geïsoleerd bij het wisselen van edities. Kalibratie, het opstartlogo, firmware-/app-sleuven, Multiboot-status en RF-logboek blijven gedeeld.

Het nieuwe menu `SetCfg`maakt het mogelijk om de actieve firmware doelbewust te koppelen aan een andere bank.`SysInf`toont onafhankelijke badges`SLOT`en`CFG`, en UV Studio kan de configuratie van een gebruikersslot resetten zonder de firmware te wissen.

Zie [Multiboot en Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) en [Menu](./Menu).

### Betrouwbare AirCopy met bevestigingen

Air Copy wacht nu na elk blok op een bevestiging. De ontvanger controleert het pakket voordat het wordt verzonden en kan een nieuwe verzending aanvragen; de verzender probeert verloren, beschadigde of niet-bevestigde blokken tot drie keer opnieuw te verzenden. Dubbele blokken worden veilig bevestigd, waardoor een verloren ACK de overdracht niet langer desynchroniseert.

Met de nieuwe optie `All (Mem+Set)` worden alle acht banken met 128 kanalen en de bijbehorende instellingen in één doorlopende overdracht verzonden. Op het scherm wordt de voortgang weergegeven (`TX`/`RX`), inclusief het aantal herhaalde pogingen of fouten.

Zie [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Overlay-apps in Labs

De experimentele `Labs`-editie kan kleine `.app`-programma's installeren in extern flashgeheugen en deze uitvoeren vanuit een aangevinkte `4 KiB`RAM-overlay. De`Apps`-weergave van UV Studio, gemarkeerd met `Labs only`, installeert, verifieert, toont een lijst en verwijdert apps; `F + 7` opent de launcher op de radio.

De loader valideert het app-formaat, de ABI/API-compatibiliteit, de vereiste mogelijkheden, het RAM-adres, de grootte en de code-CRC vóór de uitvoering. Beschikbare apps zijn onder andere radioprogramma's zoals Broadcast FM, FoxHunt, Beacon en Beam, plus Breakout, Tetris, Cube3D en Plasma.

Zie [Overlay-apps](./Overlay-apps) voor installatie en compatibiliteit, en [Overlay-toepassingen](./Overlay-applications) voor het doel en de bediening van elke app.

### Baken-keyingmodus (TOON / CARR)

Beacon krijgt een keying-modusinstelling bij toets `4`. `TONE`(standaard) is het vorige gedrag: een continue FM-draaggolf met de toon`1000 Hz`die voor elk Morse-element wordt geschakeld (MCW / F2A).`CARR` onderbreekt de draaggolf zelf voor elk element, waardoor het patroon van onderbroken draaggolven wordt gereproduceerd dat veel ARDF-gebruikers in het veld gebruiken: het signaal verdwijnt tussen de elementen, waardoor richtingbepaling moeilijker wordt en een gewone AM-ontvanger het kan ontvangen. De instelling wordt opgeslagen en opgenomen in AirCopy-overdrachten en is beschikbaar in zowel de residentiële als de overlay Beacon. Zie [Beacon](./Beacon#timing-and-keying).

## Hoogtepunten van v5.9.0

Deze wijzigingen zijn ontwikkeld na `v5.8.0`en uitgebracht in`v5.9.0`.

### Menubrowser met categorieën

Bij het opstarten van Fusion wordt het menu geopend op een categoriescherm in plaats van direct de oorspronkelijke platte lijst weer te geven. De beschikbare categorieën zijn `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio`en`DTMF`. Bij het opstarten met het verborgen menu wordt ook een categorie `Service` toegevoegd.

De categorie `All`behoudt de oorspronkelijke platte menuvolgorde en globale nummering. Het rechtstreeks invoeren van een menunummer vanuit het categoriescherm schakelt ook over naar`All`, waardoor bestaande snelkoppelingen naar genummerde menu's blijven werken. De firmware onthoudt de laatst geselecteerde categorie en het laatst gebruikte item in elke categorie voor de huidige sessie.

Zie [Menu](./Menu#categorized-menu-browser).

### Actiekiezer voor zijtoetsen

Na het indrukken van `F`houdt u een van de zijknoppen ingedrukt om een tijdelijke actiekiezer te openen. Gebruik`UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT`op UV-K1, om de beschikbare gecompileerde sneltoetsacties te bekijken en druk op`M`om de geselecteerde actie uit te voeren.`EXIT`of`F`sluit de kiezer; door op`PTT` te drukken, sluit u deze en gaat u verder met de normale verzendverwerking.

De picker sluit automatisch na ongeveer vijf seconden of wanneer de ontvangst begint. Elke zijknop onthoudt de laatst gekozen picker totdat de radio opnieuw opstart. Een normale korte druk op de zijknop (`F`) behoudt de bestaande Step-up/Step-down functie.

Zie [Knopfuncties](./Button-functions#side-key-action-picker).

### Verbeteringen aan Fox Hunt / Beacon

Fox Hunt voegt twee diepere front-end-gain stappen toe na de originele instellingen `ATT 0`, `ATT 6`, `ATT 15`en`ATT 27`. Deze worden weergegeven als `BYP`en`BYP+`; deze namen beschrijven handige modi voor korte afstand, geen letterlijke hardware-bypass. De navigatietoetsen (`UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT` op UV-K1) wijzigen nu de demping direct.

Na een versterkingswijziging laat de firmware de RSSI-detector even stabiliseren en reset vervolgens de piek-, minimum-, trend- en signaalgeschiedenisreferenties. Dit voorkomt verouderde pieken en kunstmatige sprongen bij het wisselen tussen versterkingsbereiken.

Door `F` ongeveer 0,5 seconde ingedrukt te houden, wordt een tijdelijke toetsenbordvergrendeling geactiveerd die zowel in Fox Hunt als in Beacon wordt gebruikt. In Fox Hunt blijven de navigatietoetsen beschikbaar voor demping terwijl het toetsenbord vergrendeld is. In Beacon zijn alle normale bedieningselementen geblokkeerd totdat dezelfde lange druk het toetsenbord ontgrendelt, ook tijdens een actieve uitzending.

Fox Hunt en Beacon negeren nu beide de normale `SetOff` inactiviteitstimer en blijven actief totdat ze expliciet worden afgesloten. Hun gebruikelijke time-out voor de achtergrondverlichting en batterij-updates blijven wel werken.

Zie [Vossenjacht en Baken](./Fox-Hunt-and-Beacon).

### Oplossingen voor scan- en FM-uitzendingen

Tijdens een geheugenscan wordt het hervatten van de scan tijdelijk onderbroken wanneer de naam van de scan in de lijst wordt gewijzigd. Hierdoor blijven de verborgen voortgangsindicator en de scanpositie gesynchroniseerd. Frequentie- en bereikscans worden niet gepauzeerd omdat de naamoverlay hierbij niet wordt weergegeven.

Een actieve FM-zenderzoekactie negeert nu een inkomend signaal dat op het hoofdkanaal van de radio wordt gedetecteerd, waardoor de FM-zoekactie niet wordt onderbroken. Normaal FM-luisteren krijgt nog steeds voorrang op de ontvangst van het hoofdkanaal, zoals voorheen.

Zie [Scannen](./Scanning#changing-the-scan-list-during-scan) en [FM-radio-ontvanger](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## Hoogtepunten van v5.8.0

Deze wijzigingen zijn gebaseerd op commits na de tag `v5.7.0`in`feature_update_v5`.

### Vossenjacht / Baken

Fusion-builds voegen een programmeerbare `FOX HUNT / BEACON`-actie toe met twee complementaire modi:

* Fox Hunt biedt een gekalibreerd `dBm`-display, S-meter- en piekwaarden, een signaaltrend van één seconde, selecteerbare demping, audio in Geiger-stijl of van het ontvangen station, en de keuze tussen een trapvormige meter en een signaalgeschiedenis van ongeveer 18 seconden.
* Beacon gebruikt de actieve TX VFO om een ARDF-identificatie of `<CALLSIGN> MOE`in Morsecode uit te zenden, met instelbare TX-vensters van`5`tot`60-second`en stille intervallen van`5`tot`240-second`.

Beacon ontvangt zijn roepnaam van CHIRP `Message Line 1`en begint onmiddellijk met zijn eerste uitzending zodra deze is geselecteerd. Voor elke burst controleert de firmware de toepasselijke TX-frequentievergrendeling, per-VFO`TXLock`, de batterijstatus en de modulatiebeperking.

De demping, de meter, de audiomodus en het bakeninterval worden opgeslagen in het externe flashgeheugen en worden meegenomen in Air Copy `Settings`-overdrachten.

Zie de historische [Fox Hunt / Beacon-compatibiliteitspagina](./Fox-Hunt-and-Beacon). Voor de huidige firmware kunt u de aparte [FoxHunt](./Fox-Hunt) en [Beacon](./Beacon) pagina's gebruiken.

## Hoogtepunten van v5.7.0

Deze wijzigingen zijn gebaseerd op commits na de tag `v5.6.1`in`feature_update_v5`.

### UV Studio

[UV Studio](./UV-Studio) biedt een uniforme, browsergebaseerde interface voor het bekijken, bedienen, onderhouden en herstellen van radio's.

Het biedt live schermspiegeling en bediening via het toetsenbord (niet-TX), compatibele RF-logweergave en -analyse, RF-log CSV-export, firmware-flashing, back-up/herstel van kalibratie en beheer van aangepaste opstartlogo's. Het draait lokaal via `Web Serial` zonder installatie, server of account.

UV Studio is de browsergebaseerde aanvulling op de Fusion-firmware.

### RF-log

Builds met RX/TX-logging voegen een programmeerbare `RF LOG` sneltoetsactie toe.

Het RF-logboek registreert ontvangst-, monitoring- en zendsessies in een extern flashgeheugen en toont deze vervolgens in een historisch overzicht, waarbij de meest recente sessies eerst worden weergegeven. Elke vermelding kan de kanaalnaam of frequentie, de ontvangst-/zendrichting, de duur, de ontvangst-S-meter of het zendvermogen en de laagste gemeten batterijspanning tijdens de sessie weergeven.

Het logscherm ondersteunt:

* `ALL`,`RX`, en`TX` filters
* tot 512 zichtbare verkeersingangen
* Sneltoetsen voor 'springen naar nieuwste' en 'springen naar oudste' met `F`plus de navigatietoetsen (`UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT` op UV-K1)
* een duidelijke bevestigingsprocedure voordat het logboek wordt gewist

Zie [Geavanceerde functies](./Advanced-features#rf-log) en [Knopfuncties](./Button-functions#rf-log-action).

### Uitsluitingen van ScanRange

`ScnRng`kan nu tot`64`tijdelijk uitgesloten frequenties behouden, in plaats van`32`.

Net als voorheen is de lijst circulair, wordt deze niet in het geheugen opgeslagen en wordt deze gewist wanneer de radio opnieuw opstart of wanneer de bereikidentificatie verandert.

Zie [Scannen](./Scanning#excluding-frequencies-in-scnrng).

### SetLck vergrendelingsbereik

`SetLck` heeft nu vier keuzes in plaats van twee:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS`dekt de programmeerbare sneltoetsen die zijn toegewezen aan de twee zijknoppen en`M Long`. Hierdoor kunnen deze sneltoetsen beschikbaar blijven terwijl het voorste toetsenbord is vergrendeld, of kunnen ze worden uitgeschakeld als onderdeel van de vergrendeling. `PTT` kan onafhankelijk worden vergrendeld om onbedoelde verzending te voorkomen.

Zie [Menu](./Menu#main-menu) en [Knopfuncties](./Button-functions#keypad-lock-and-setlck).

### Onderhoud van UV Studio

De code voor het streamen van het scherm aan de firmwarezijde is intern hernoemd van 'screenshotverwerking' naar 'UV Studio-verwerking'. Builds die de optionele RX/TX-log UV Studio-brug inschakelen, kunnen ook recente RF-log-rijen streamen naar compatibele viewer-tools.

Zie [Geavanceerde functies](./Advanced-features#k5-viewer).

## Hoogtepunten van v5.6.0

Deze wijzigingen zijn gebaseerd op de commits na `v5.5.0`in`feature_update_v5`.

### SetSav schermbeveiliging

Builds met schermbeveiligingsondersteuning voegen het menu `SetSav` toe.

Beschikbare modi:

* `OFF`: geen schermbeveiliging
* `LOGO`: toon het opgeslagen opstartlogo als een inactief scherm
* `LOGO+`: toon het opgeslagen opstartlogo met een scrolleffect
* `MATRIX`: toon een geanimeerd inactief scherm in matrixstijl

`SetSav` is gekoppeld aan de time-out van de achtergrondverlichting. Het kan worden weergegeven op het hoofdscherm en het FM-uitzendscherm wanneer de radio inactief is, en wordt uitgeschakeld tijdens RX, TX, PTT, BEAM en actief FM-scannen.

Zie [Radiobediening](./Radio-operation#screen-saver-and-backlight-timeout) en [Menu](./Menu#main-menu).

Omdat `SetSav`vóór het verborgen menu wordt ingevoegd, verschuiven de indexen van het verborgen menu met één in`v5.6.0`: `F Lock`begint bij`72`in plaats van`71`.

### Opstartgeluid van het opstartlogo

Wanneer `POnMsg = LOGO` is ingeschakeld, kan de opstartlogomodus het normale opstartpiepje blijven weergeven.

Zie [Menu](./Menu#main-menu) en [UV Studio](./UV-Studio#boot-logo).

### Scan RSSI-indicator

Snelle scans kunnen tijdens het scannen een kleine RSSI-sparkline weergeven. Dit geeft een compact overzicht van recente RSSI-waarden, waardoor sterke kandidaten visueel opvallen terwijl de scan loopt.

Zie [Scannen](./Scanning#scan-indicators-and-detection).

### Detectie van subhoorbare geluiden binnen het scanbereik

`ScnRng` kan CTCSS/DCS detecteren terwijl het voertuig stilstaat op een ontvangen signaal. De gedetecteerde subhoorbare code wordt, indien beschikbaar, weergegeven in de scaninterface.

Zie [Scannen](./Scanning#scan-indicators-and-detection).

### Frequentie kopiëren UI

Het scherm van de `F+4` frequentiekopieerscanner toont nu een duidelijkere scheiding tussen de zoekstatus en het resultaat:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* gedetecteerde `Freq:`en`Tone:` details

Zie [Scannen](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### Updates voor UV Studio en screenshots

De frames van de screensaver worden gesynchroniseerd met UV Studio en de verwerking van screenshots is geoptimaliseerd om het RAM-gebruik te verminderen en verouderde gegevensblokken te voorkomen.

Zie [Geavanceerde functies](./Advanced-features#k5-viewer).

### Oplossingen en verbeteringen

Die release bevatte ook diverse gedragscorrecties en verbeteringen aan de gebruikersinterface:

* bandscope / spectrum frequentie afronding voor `8.33 kHz` stappen
* Herconfiguratie van AM naar FM dual-watch RX
* Plaatsing van het VFO-vergrendelingspictogram tijdens het scannen
* schermbeveiliging met wake/sleep-functie, randbehuizingen
* hol pictogram voor handmatige achtergrondverlichting wanneer de handmatige verlichting is uitgeschakeld

## Hoogtepunten van v5.5.0

### Snellere scanengine

De huidige builds kunnen de nieuwere `FAST`scanengine gebruiken voor geheugenscans en`ScnRng`.

Het menu `SetScn` biedt de volgende opties:

* `NORMAL`: het conservatieve scanpad
* `FAST`: een snellere methode die kanalen of bereikstappen vooraf controleert met RSSI voordat de volledige ontvangstconfiguratie wordt uitgevoerd.

Onder gunstige omstandigheden kan `ScnRng`in de`FAST`-modus ongeveer `150+` frequenties per seconde scannen.

Zie [Scannen](./Scanning#scan-engine-mode-normal-vs-fast) en [Menu](./Menu#main-menu).

### Tijdelijke uitsluitingen van het scanbereik

Als een `ScnRng`-scan is gestopt op een ontvangen frequentie, houd dan `MENU` ingedrukt om die frequentie uit te sluiten van de huidige bereikscan.

Dit werd geïntroduceerd met `32`-slots in `v5.5.0`; de huidige builds na `v5.6.1`maken`64` tijdelijke uitsluitingen mogelijk. Deze uitsluitingen worden gewist wanneer de radio opnieuw opstart of wanneer de bereikidentiteit verandert.

Zie [Scannen](./Scanning#excluding-frequencies-in-scnrng).

### BEAM-overdrachtsmodus

Builds met BEAM-ondersteuning kunnen de huidige VFO- of geheugenkanaalconfiguratie naar een andere radio sturen, of een BEAM-pakket ontvangen en opslaan in het eerst beschikbare geheugenkanaal.

BEAM wordt geopend via een programmeerbare sneltoetsactie.

Zie [Geavanceerde functies](./Advanced-features#beam-transfer-mode) en [Knopfuncties](./Button-functions#beam-action).

### Aangepast laarslogo

Builds met logo-ondersteuning kunnen bij het opstarten een aangepast `128x64` monochroom opstartlogo weergeven.

Upload of download het logo met UV Studio en selecteer vervolgens `LOGO`in het menu`POnMsg`.

Zie [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu), en [Probleemoplossing](./Troubleshooting#my-custom-boot-logo-does-not-show).

### Verbeteringen in de DCS/CTCSS-weergave

De menu's `RxDCS`, `TxDCS`, `RxCTCS`en`TxCTCS` tonen nu zowel de geselecteerde invoerpositie als de gehomologeerde index, indien deze bestaat.

Hierdoor is het gemakkelijker om onderscheid te maken tussen normale lijstposities, PMR446-gehomologeerde vermeldingen, extra tonen en omgekeerde DCS-vermeldingen.

Zie [Menu](./Menu#main-menu).

### Kanaalnaam bewerken

`ChName`De bewerkingsfunctie is verbeterd met multi-tap invoer, wisselen tussen hoofdletters en kleine letters, directe numerieke invoer bij lang indrukken van toetsen en een duidelijker`EXIT` gedrag.

Zie [Menu](./Menu#main-menu).

### Persistentie van de spectrumanalysator

De spectrumanalysator slaat nu meer instellingen op wanneer u het sweepscherm verlaat met `EXIT`, waaronder de triggermodus, het automatische gevoeligheidsprofiel, de handmatige schaal en het triggerniveau.

Het starten van de analyzer vanuit `ScnRng` overschrijft niet langer de opgeslagen scanstap of voorkeur voor het aantal balken.

Zie [Spectrumanalysator](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf- en buildinformatie

`SysInf` wordt nu in de huidige builds gepagineerd. Afhankelijk van de buildopties kan het de volgende informatie weergeven: identiteit, builddatum/tijd, commit-identificatie, batterij-informatie, geheugengebruik en QR-code projectlinks.

Zie [Menu](./Menu#main-menu).

### Dekking van Air Copy-instellingen

Bij Air Copy `Settings`-overdrachten wordt nu ook het VFO-gebied meegenomen dat wordt gebruikt door functies zoals `ScnRng`, waardoor de scanbereikgrensfrequenties worden gerepliceerd bij het kopiëren van instellingen.

Zie [AirCopy](./AirCopy).

## Recente wijzigingen in versie 5.x die ook het vermelden waard zijn

De volgende wijzigingen werden kort voor `v5.5.0` doorgevoerd en zijn in de wiki gedocumenteerd omdat ze van invloed zijn op het dagelijks gebruik:

* `SetRxA`selecteert verschillende RX-audioprofielen voor`FM`en`AM`; in `AM`kan er geschakeld worden tussen`SHARP`, `STOCK`en`OPEN`.
* Scanlijsten ondersteunen korte namen en de geheugenscan kan tijdens het scannen schakelen tussen geldige, niet-lege lijsten.
* `SysInf`, FM-radio-uitzendingen en de gebruikersinterface van de spectrumanalysator zijn in recente builds verbeterd.
* Het verborgen menu `SetNav`zorgt ervoor dat dezelfde documentatie werkt voor de navigatiestijlen`UV-K1`en`UV-K5 V3`.

Zie [Menu](./Menu), [Scannen](./Scanning), [Radiobediening](./Radio-operation), en [FM-radio-ontvanger](./FM-broadcast-radio-receiver).

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-apps](./Overlay-apps)
* [Overlay-toepassingen](./Overlay-applications)
* [Scannen](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Knopfuncties](./Button-functions)
* [Geavanceerde functies](./Advanced-features)
* [Spectrumanalysator](./Spectrum-analyzer)
* [Menu](./Menu)
