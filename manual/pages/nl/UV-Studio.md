> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/UV-Studio/).

# UV Studio

UV Studio is de browsergebaseerde applicatie voor compatibele F4HWN-firmware op de UV-K1 en UV-K5 V3. Het combineert live weergave en functies voor het externe toetsenbord, firmware-installatie, radio-onderhoud, Multiboot-beheer en Labs-appbeheer in één interface.

Open het hier:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio communiceert rechtstreeks met de radio via de `Web Serial` API. Radiogegevens worden lokaal in de browser verwerkt; er is geen applicatie-installatie, serveraccount of cloudupload nodig.

> [!IMPORTANT]
> UV Studio is niet beperkt tot de Fusion-editie. De algemene tools werken met compatibele F4HWN-edities, terwijl sommige weergaven een specifieke firmwarefunctionaliteit vereisen. Met name het beheer van overlay-apps en de tools voor externe flashgeheugens zijn voor Labs.

## Versiestatus

UV Studio `v1.6.0`wordt meegeleverd met de stabiele firmware`v6.1.0`. Naast de v6-firmwarecatalogus, Multiboot-slotbeheer en de officiële overlay-appcatalogus met versiebeheer, voegt het het volgende toe:

* een heringerichte interface die het maken van back-ups/herstel van kalibraties en het downloaden/uploaden van het opstartlogo groepeert
* volledige `2 MiB` externe-flashback-up en -herstel voor compatibele Labs-builds
* CRC32-vergelijking en -verificatie voor snellere en veiligere externe flashherstel
* Begeleid herstel van het gereconstrueerde externe flashgeheugen, gevolgd door de juiste standaardfirmware voor UV-K1 of UV-K5 V3

## Vereisten

Je hebt nodig:

* een compatibele Quansheng UV-K1 of UV-K5 V3 met de PY32F071 MCU
* een dataverbinding `USB-C` of een compatibele Baofeng/Kenwood-stijl USB-naar-serieel-kabel met dubbele jack-aansluiting
* een desktopbrowser met `Web Serial`-ondersteuning, zoals Chrome, Brave, Edge, Opera of Firefox 151+

Een gedownloade kopie van de complete UV Studio-broncode kan ook lokaal worden geopend. Het is een statische HTML/CSS/JavaScript-applicatie en vereist geen build-stap of lokale webserver.

## Overzicht van functies en radiomodi

| Hulpmiddel | Vereiste radiostatus | Firmwarevereisten |
| --- | --- | --- |
| Live Viewer en live RF Log | normale opstart | compatibele Viewer/RF Log-ondersteuning |
| Firmware flashen | `DFU` / flashmodus | UV-K1 of UV-K5 V3 bootloader |
| Kalibratie, opstartlogo, RF-logboek exporteren | normale opstart | compatibele F4HWN-firmware |
| Firmware-slots | normale opstart | Multiboot-compatibel `v6.0.0` of nieuwer |
| Apps | normale opstart | Labs met ondersteuning voor overlay-apps |
| Externe flashback-up/herstel | normale opstart | `v6.1.0` Labs met toegang tot externe flash |
| Fabriekssoftwareherstel | Normale Labs-opstart, daarna DFU wanneer daarom gevraagd wordt | `v6.1.0` Labs voor de eerste fase |

Om de `DFU`-modus te activeren, schakelt u de radio uit, houdt u `PTT`ingedrukt en schakelt u de radio weer in terwijl u`PTT`ingedrukt blijft houden. Laat`PTT` los en sluit vervolgens de datakabel aan of ontkoppel deze. Er is geen zijtoets nodig.

## Wat UV Studio kan doen

UV Studio biedt:

* een realtime `128x64` radioweergave
* virtuele UV-K1- en UV-K5-toetsenborden met korte en lange druk
* een afneembaar toetsenbordvenster en een radio-herstartbediening
* Schermafbeeldingen van de radio en instelbare LCD-weergave
* Live RF-activiteit, sessiemarkeringen, filters en analyses
* Exporteren van opgeslagen RF Log-activiteit naar CSV
* Firmware-installatie vanuit de officiële catalogus, de rolling development build of een lokaal `.bin`-bestand
* Directe download van het bijbehorende CHIRP-stuurprogramma voor stabiele versies van de F4HWN-firmware
* Installatie, validatie, naamgeving, wissen en configuratieherstel van Multiboot-firmware-slots
* Installatie en verwijdering van Labs-overlay-apps vanuit een officiële catalogus met versiebeheer of lokale `.app`-bestanden
* Kalibratie back-up en herstel
* Downloaden, bekijken, converteren en uploaden van een aangepast opstartlogo
* Externe flashback-up, herstel en begeleid fabriekssoftwareherstel in `v1.6.0`
* Lichte en donkere thema's en vertalingen in tien talen

UV Studio beheert de seriële verbinding wereldwijd. Het voorkomt dat twee processen de poort tegelijkertijd gebruiken en behoudt of herstelt de verbinding bij het schakelen tussen compatibele tools in de normale modus.

## Live kijker

De Live Viewer spiegelt het radiodisplay en biedt bijpassende virtuele toetsenpanelen voor de UV-K1 en UV-K5.

1. Start de radio op de normale manier.
1. Sluit de radio aan op de computer.
1. Open `Live Viewer`, selecteer het juiste toetsenbord en klik op `Connect`.
1. Kies de seriële poort van de radio.
1. Gebruik het virtuele numerieke toetsenblok of het computertoetsenbord.
1. Klik op `Disconnect` voordat u de kabel loskoppelt.

Met de werkbalk kunt u de aangesloten radio opnieuw opstarten, een schermafbeelding maken, het uiterlijk van het gesimuleerde LCD-scherm wijzigen en het toetsenbord loskoppelen en in een zwevend venster weergeven. Het ingebouwde paneel `Help`toont alle sneltoetsen; veelgebruikte functies zijn onder andere de pijltjestoetsen voor navigatie, cijfers voor korte drukken,`Shift`plus een toets voor een lange druk,`Enter`of`M`voor Menu,`Esc`voor Afsluiten en`F1`/`F2` voor de zijknoppen.

> [!IMPORTANT]
> De viewer kan geen transmissie starten. De weergegeven `PTT` is niet beschikbaar en UV Studio is geen tool voor transmissie op afstand.

## RF-logboek

Als de actieve firmware RF Log en de Viewer bridge ondersteunt, toont UV Studio live RX- en TX-sessies met:

* richting-, frequentie- en kanaalinformatie
* sessieduur
* RX-signaalniveau of TX-vermogen
* batterijspanning
* `ALL`,`RX`en`TX` filters
* Analyse van activiteit, beltijd, frequentie, sessie en batterijduur

De aparte tool `Export RF Log`leest de meest recente`512`opgeslagen activiteiten en inschakelmarkeringen uit en maakt`rf-log.csv` aan. Houd de radio in de normale modus. Als kanaalnamen of configuratiebankinformatie onjuist zijn, update dan naar een firmwareversie met de nieuwste v6 RF Log-correcties.

## Firmware flashen

> [!WARNING]
> Het flashen van een incompatibele of beschadigde image kan de radio onbruikbaar maken. Controleer de compatibiliteit van het model en de bootloader, maak een back-up van de kalibratie en laat de kabel aangesloten totdat de bewerking is voltooid.

De firmwarecatalogus groepeert de huidige stabiele F4HWN-builds per editie, bevat de rolling Fusion-ontwikkelingsbuild en kan ook compatibele standaardimages aanbieden. Een lokaal `.bin`-bestand blijft beschikbaar wanneer de catalogus niet kan worden geladen of wanneer een aangepaste build wordt gebruikt.

1. Start de radio in de `DFU`-modus.
1. Open `Flash Firmware`.
1. Selecteer de juiste catalogusvermelding of kies een compatibel lokaal `.bin`-bestand.
1. Klik op `Flash firmware` en selecteer de seriële poort.
1. Wacht tot de voortgangsbewerking is voltooid en de radio opnieuw is opgestart.

Wanneer een stabiele versie van F4HWN is geselecteerd, biedt UV Studio het gedeelde CHIRP-stuurprogramma aan dat voor die firmwareversie is gepubliceerd. De rolling development- en standaardversies maken geen gebruik van deze automatische koppeling met het stuurprogramma.

## Firmware-slots

Alle vier officiële `v6.0.0`-edities ondersteunen Multiboot. UV Studio beheert gebruikersslots `1`tot`4`in extern flashgeheugen. De beveiligde`Main`-back-up wordt beheerd door de firmware en is opzettelijk niet beschikbaar als beschrijfbaar slot.

Om een andere editie te installeren:

1. Start een radio die geschikt is voor Multiboot op de normale manier op.
1. Open `Firmware Slots` en vernieuw de tabel.
1. Selecteer een compatibele stabiele `v6.x`F4HWN-image uit de catalogus of laad een lokaal`.bin`-bestand.
1. Kies slot `1`tot`4`en voer optioneel een weergavenaam in van maximaal`15` tekens.
1. Selecteer `Write to slot`, bevestig en wacht tot het wissen, schrijven en de volledige CRC-verificatie zijn voltooid.

De slotcatalogus sluit opzettelijk standaardfirmware, v5-firmware en de rolling development image uit, omdat niet gegarandeerd is dat deze items terugkeren naar de Multiboot-selector.

Elk gevuld slot heeft twee onafhankelijke onderhoudsacties:

* `Erase FW` verwijdert de opgeslagen firmware-image, maar reset de configuratiebank van die sleuf niet.
* `Reset config` wist de kanalen en instellingenbank die aan dat slot zijn gekoppeld, maar laat de firmware-image geïnstalleerd.

Zie [Multiboot en Multiconfig](./Multiboot-and-Multiconfig) voor `Main`, slotselectie, configuratiebanken, `SetCfg` en herstelgedrag.

## Apps (Labs)

De `Apps`-weergave beheert de acht experimentele overlay-app-slots in de Labs-editie.

1. Start Labs normaal op en open `Apps`.
1. Vernieuw de app-slottabel.
1. Selecteer de firmwareversie en vervolgens een officiële app uit de bijbehorende catalogus; u kunt ook een lokaal `.app`-bestand laden.
1. Selecteer de doelsleuf en kies `Install app`.
1. Gebruik op de radio `F + 7`, selecteer de app en druk op `M`.

UV Studio toont de appnaam, versie, grootte en validatiestatus. Het verwijderen van een app wist alleen de app-locatie van die app.

> [!IMPORTANT]
> Overlay-apps zijn gekoppeld aan de firmware-ABI, het API-niveau, het RAM-adres en de mogelijkheden. Selecteer de app-catalogusversie die overeenkomt met de geïnstalleerde firmware. Installeer compatibele apps opnieuw na een firmware-update, indien nodig.

Zie [Overlay-apps](./Overlay-apps) voor compatibiliteit met de loader en [Overlay-toepassingen](./Overlay-applications) voor het doel en de bedieningselementen van elke app.

## De juiste back-up of kopie kiezen

Deze bewerkingen beschermen of kopiëren verschillende onderdelen van de radio en zijn niet onderling verwisselbaar:

| Bediening | Inhoud | Optimaal gebruik | Kalibratiegedrag |
| --- | --- | --- | --- |
| UV Studio `Calibration` | apparaatspecifieke RF- en hardwarekalibratie | essentiële veiligheidsback-up voor één radio | leest of herstelt expliciet de kalibratie; alleen gebruiken met dezelfde radio |
| CHIRP-radiobeeld | kanalen en instellingen die door die driverversie worden begrepen | bewerken en migreren van geheugen/instellingen | geen vervanging voor een kalibratieback-up |
| UV Studio `External Flash`| raw`2 MiB` externe-flash-image, inclusief configuraties, slots, apps, logboeken, logo en kalibratiegegevens in het back-upbestand | volledige bestandsback-up en herstel | herstel behoudt bewust de kalibratie die al op de doelradio aanwezig is |
| AirCopy-geheugen of `Settings` | geselecteerde geheugenbanken en/of compatibele radio-instellingen | synchroniseert geselecteerde gegevens tussen twee radio's | kopieert geen hardwarekalibratie |
| AirCopy `Flash 2M` | externe flashgeheugen rechtstreeks gekloond via een kabel | zorgt ervoor dat de gedeelde externe flashgeheugenstatus van een andere radio overeenkomt met de bron | sluit de kalibratiesector van de doelradio uit en behoudt deze |

Maak voor routinematige upgrades minimaal een kalibratieback-up en een CHIRP-image. Gebruik de volledige back-up van het externe flashgeheugen voordat u experimenteert met Multiboot, app-slots, fabrieksherstel of low-level storage.

## Externe flashback-up en herstel (v1.6.0)

Deze tool vereist de externe-flash-commando's van `v6.1.0`Labs. Deze zijn niet beschikbaar in`v6.0.0`.

De `External Flash`-weergave leest of herstelt de volledige `2 MiB` PY25Q16 externe SPI Flash op basis van fysiek adres. Dit omvat configuratiebanken, firmware-slots, app-slots, het RF-logboek, de Multiboot-status, het opstartlogo en andere gedeelde gegevens.

### Back-up maken

1. Start een compatibele Labs-build op de gebruikelijke manier.
1. Open `External Flash`en selecteer`Back up`.
1. Klik op `Read external flash` en kies de seriële poort.
1. Wacht tot de chip volledig is uitgelezen; dit kan enkele minuten duren.
1. Download `external-flash.bin`.

De back-up heeft exact de waarde `2 MiB`. Bewaar deze veilig: hij bevat radioconfiguratie- en apparaatspecifieke kalibratiegegevens.

### Herstellen

1. Start een compatibele Labs-build op de gebruikelijke manier.
1. Open `External Flash`en selecteer`Restore`.
1. Kies een volledige `2 MiB`-back-up die met deze tool is gemaakt.
1. Klik op `Restore external flash` en bevestig de vernietigingsbewerking.
1. Laat de radio ingeschakeld en aangesloten totdat de verificatie is voltooid en de radio opnieuw is opgestart.

UV Studio weigert bestanden die niet exact `2 MiB`zijn. Het werkt sector voor sector in`4 KiB`-eenheden en wist of schrijft nooit de apparaatspecifieke kalibratiesector. Met de huidige firmware vergelijkt het CRC32-waarden, slaat het sectoren over die al identiek zijn, schrijft het alleen de resterende sectoren en controleert het elke sector afzonderlijk. Het valt terug op een directe bytevergelijking wanneer de CRC-opdracht niet beschikbaar is.

> [!WARNING]
> Bij het herstellen wordt vrijwel alle inhoud van de externe flashgeheugen vervangen, inclusief instellingen, logboeken, logo, apps, firmware-slots en de Multiboot-status. De kalibratiesector van de ontvangende radio blijft behouden, dus een volledige back-up van de ene radio is geen methode om de kalibratie van die radio naar een andere te kopiëren.

Voor een directe radio-naar-radio-kopie van het externe flashgeheugen, zie de aparte bekabelde functie `Flash 2M` in [AirCopy](./AirCopy#external-flash-cloning).

## Fabriekssoftwareherstel (v1.6.0)

De `Factory reset`-weergave is een begeleid herstelproces in twee stappen om een UV-K1 of UV-K5 V3 terug te zetten naar de bijbehorende Quansheng-software:

1. Start `v6.1.0` Labs normaal.
1. Open `Factory reset`en selecteer het exacte model:`UV-K1`of`UV-K5 V3`.
1. Bevestig de waarschuwing. UV Studio laadt de bijbehorende gereconstrueerde fabrieksimage voor het externe flashgeheugen en de standaardfirmware, en controleert vervolgens de grootte en SHA-256-hash voordat er iets wordt weggeschreven.
1. UV Studio herstelt en verifieert het externe flashgeheugen met behoud van de apparaatspecifieke kalibratiesector.
1. Schakel de radio uit wanneer u hierom wordt gevraagd en ga naar de `DFU`-modus. Start de radio niet op de normale manier tussen deze twee fasen.
1. Selecteer `Continue in DFU`; UV Studio installeert automatisch de bijbehorende standaardfirmware.

De meegeleverde fabrieksfirmwareversies zijn UV-K1 `v7.03.01` en UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Dit is een destructieve softwareherstelprocedure. Hierbij worden F4HWN-instellingen, de Multiboot-status, firmware-slots, overlay-apps, RF-logboeken en het aangepaste logo verwijderd. De externe image is een gereconstrueerde fabrieksinstelling, geen ongewijzigde fysieke dump. Selecteer het juiste model en onderbreek geen van beide stappen.

## Kalibratie

Kalibratie is apparaatspecifiek. Maak een back-up voordat u met firmware-experimenten of laagwaardig onderhoud begint en geef het bestand de naam van het radiomodel of serienummer, zodat back-ups van verschillende apparaten niet door elkaar worden gehaald.

Om het te onderbouwen:

1. Start de radio op de normale manier.
1. Open `Calibration`en selecteer`Back up`.
1. Klik op `Read calibration data`.
1. Download `calibration.dat`.

Om het te herstellen:

1. Start dezelfde radio op de normale manier.
1. Open `Calibration`en selecteer`Restore`.
1. Kies het bijbehorende `calibration.dat`-bestand.
1. Klik op `Restore calibration data` en wacht tot het proces is voltooid.

> [!WARNING]
> Herstel alleen de kalibratie die bij die radio hoort, tenzij u de gevolgen volledig begrijpt.

## Boot Logo

Compatibele builds kunnen een aangepaste `128x64` monochrome afbeelding gebruiken bij het opstarten of als schermbeveiliging.

Om een logo te uploaden:

1. Start de radio op de normale manier.
1. Open `Boot Logo`en selecteer`Upload`.
1. Kies een afbeelding in een gangbaar formaat zoals PNG, JPEG of BMP.
1. Pas `Threshold`en`Invert colors` aan terwijl u de preview controleert.
1. Selecteer `Upload logo to radio`.
1. Kies `LOGO`in`POnMsg`, of een compatibele logo-modus in `SetSav`.

Het tabblad `Download`leest de huidige afbeelding, toont een voorbeeld ervan en slaat deze op als`logo.png`.

## Probleemoplossing

Als UV Studio geen verbinding kan maken met de radio:

* Controleer of de geselecteerde bewerking de juiste normale of DFU-opstartmodus gebruikt.
* Koppel de kabel los, start de radio opnieuw op in die modus, sluit hem weer aan en selecteer de seriële poort opnieuw.
* Sluit andere programma's of browsertabbladen die mogelijk de seriële poort gebruiken.
* Controleer of de kabel data transporteert en volledig is ingevoerd.
* Gebruik een firmwareversie die de vereiste functionaliteit biedt.
* Controleer bij apps of externe flashgeheugens of Labs actief is in plaats van Fusion, FieldOps of Transfer.

De uitbreidbare `Console` registreert protocol- en operationele details die kunnen helpen bij het identificeren van een niet-ondersteunde opdracht, time-out, validatiefout of onjuist bestand.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Recente wijzigingen](./Recent-changes)
* [Programmeren met CHIRP](./Programming-with-CHIRP)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay-apps](./Overlay-apps)
* [Overlay-toepassingen](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Geavanceerde functies](./Advanced-features)
* [Probleemoplossing](./Troubleshooting)
