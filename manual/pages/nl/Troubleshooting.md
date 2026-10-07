> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Troubleshooting/).

# Probleemoplossing

Op deze pagina vind je een overzicht van de meest voorkomende situaties waarin "er iets mis is", die elders in de wiki al aan bod komen. Zo kun je snel de juiste controle vinden.

## Ik kan wel ontvangen, maar niet verzenden

Controleer eerst deze punten:

1. Zorg ervoor dat `Mode`is ingesteld op`FM`.
1. Controleer het geselecteerde `F Lock`-abonnement.
1. Als de frequentie buiten dat plan valt, controleer dan of `TXLock`is ingesteld op`OFF`.
1. Zoek naar een klein hangslotje naast de kanaal- of VFO-naam.

Belangrijke herinneringen:

* `AM`en`USB` zijn alleen bedoeld om naar te luisteren.
* `UNLOCK ALL` heeft nog een extra ontgrendelingsprocedure

Zie ook: [Radiobediening](./Radio-operation#about-the-f-lock-and-txlock-menus) en [Geavanceerde functies](./Advanced-features#tx-on-all-bands).

## Mijn aangepaste instellingen zijn verdwenen of onverwacht gewijzigd.

Gebruik Quansheng CPS niet. Het overschrijft aangepaste instellingen.

Gebruik de `CHIRP`-driver die bij elke firmware-release wordt meegeleverd, of een ander compatibel programmeerprogramma.

Zie ook: [Programmeren met CHIRP](./Programming-with-CHIRP), [Aan de slag](./Getting-started), en [Radiobediening](./Radio-operation#basic-operation--configuration).

## Mijn aangepaste opstartlogo wordt niet weergegeven

Controleer deze punten:

1. Zorg ervoor dat uw firmware-build logo-ondersteuning bevat.
1. Upload het logo met [UV Studio](./UV-Studio#boot-logo) terwijl de radio normaal is opgestart.
1. Open menu `POnMsg`en selecteer`LOGO`
1. Start de radio opnieuw op nadat u de instelling hebt gewijzigd.

Als het logo te donker, te licht of omgekeerd is, upload het dan opnieuw vanuit UV Studio en pas `Threshold`of`Invert colors` aan voordat je het naar de radio schrijft.

## Ik heb een geheugenkanaalinstelling gewijzigd, maar deze is niet opgeslagen.

Sommige kanaalspecifieke wijzigingen hebben alleen invloed op de huidige tijdelijke kopie van dat geheugenkanaal.

Als u een instelling per kanaal wijzigt, zoals `Step`, `Power`of een andere kanaalparameter, en u deze permanent wilt bewaren, slaat u het kanaal opnieuw op met`ChSave` om de bijgewerkte instellingen naar die geheugenplaats te schrijven.

Anders is de verandering slechts tijdelijk en kan deze verdwijnen wanneer u van kanaal wisselt, van modus verandert of de radio opnieuw opstart.

Zie ook: [Radiobediening](./Radio-operation#basic-operation--configuration) en [Menu](./Menu#main-menu).

## Geheugenscan vindt niets

Controleer deze punten:

1. Zorg ervoor dat u zich in `channel mode`bevindt en niet in`frequency mode`.
1. Zorg ervoor dat het kanaal is toegewezen aan een scanlijst met `ScList`of door`5 NOAA` lang ingedrukt te houden.
1. Zorg ervoor dat de lijst met actieve scans niet leeg is.
1. Schakel indien nodig tijdens het scannen over naar een andere geldige scanlijst.

De firmware ondersteunt de scanlijsten `24`en`ALL`. Als de gevraagde lijst leeg of ongeldig is, springt de radio naar de volgende geldige, niet-lege lijst.

Zie ook: [Scannen](./Scanning#memory-channels-scanning) en [Knopfuncties](./Button-functions#front-keypad).

## Ik kan het gewenste FM-station niet vinden

Mogelijk gebruikt u gewoon de verkeerde FM-frequentie.

Houd `1 BAND` ingedrukt terwijl de FM-ontvangst actief is om door de beschikbare FM-frequenties te bladeren:

* `87.5`tot`108 MHz`
* `76`tot`108 MHz`
* `76`tot`90 MHz`
* `64`tot`76 MHz`

Het momenteel geselecteerde bereik wordt linksonder op het FM-scherm weergegeven, bijvoorbeeld `87.5-108M`.

Direct afstemmen, handmatig scannen, automatisch scannen en FM-geheugens werken alleen binnen het momenteel geselecteerde bereik.

Zie ook: [FM-radio-ontvanger](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## FM-radio blijft uitvallen

Dit is doorgaans het verwachte gedrag.

Tijdens FM-ontvangst heeft de actieve VFO nog steeds prioriteit. Als er activiteit wordt ontvangen op de actieve VFO, schakelt de radio tijdelijk terug naar VFO-ontvangst en keert vervolgens terug naar FM-ontvangst zodra die ontvangst stopt.

Zie ook: [FM-radio-ontvanger](./FM-broadcast-radio-receiver).

## AM-ontvangst klinkt te scherp, vervormd of te gedempt

Probeer het `SetRxA`-profiel te wijzigen terwijl de radio in de `AM`-modus staat.

In `AM`, `SetRxA`en de`RxA` sleutelactiecyclus tussen:

* `SHARP`: smaller en selectiever, met betere onderdrukking van aangrenzende kanalen
* `STOCK`: komt het dichtst in de buurt van het gedrag van de standaardfirmware
* `OPEN`: breder en opener, vaak beter bij zwakke signalen

Als de AM-ontvangst in `SHARP`te scherp klinkt, probeer dan`STOCK`of`OPEN`. Als de ontvangst in `OPEN`te zacht of te breed klinkt, probeer dan`SHARP`.

Zie ook: [Menu](./Menu#main-menu) en [Knopfuncties](./Button-functions#custom-button-functions).

## Ik hoor alleen enkele luchtvaart-VHF-kanalen wanneer ik de monitor in `AM 8.33 kHz` open.

Dit is vaak geen gevoeligheidsprobleem. Meestal is er sprake van verwarring tussen de `channel designator`(soms ook wel`channel number`of`published channel` genoemd) en de werkfrequentie.

Sommige luchtvaartdocumenten, websites of apps publiceren de aanduiding `channel designator`, wat eruitziet als een normale frequentie, maar niet altijd de werkfrequentie is. Speciaal voor de luchtvaart ontwikkelde VHF-radio's die geschikt zijn voor 8,33 GHz vertalen deze gepubliceerde kanaalaanduiding automatisch. Deze firmware voert die correctie ook uit wanneer u de waarde rechtstreeks op de radio invoert, maar `CHIRP` slaat de ingevoerde waarde op als werkfrequentie.

### Casus 1: Parijs-Orly

Voor **Parijs-Orly (LFPO)** publiceert de **SIA-documentatie** inderdaad **ATIS ORLY 126.505 (FR)**, met **131.355 (EN)** voor de Engelstalige dienst.

De **[ICAO-correspondentietabel](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** laat zien dat de gepubliceerde 8.33-kanaalaanduiding **126.505** overeenkomt met de werkfrequentie **126.5000 MHz**. Met andere woorden:

* **Dienst:** ATIS ORLY (FR)
* **Kanaalaanduiding:** 126.505
* **Bedrijfsfrequentie:** 126,5000 MHz

Belangrijk verschil:

* Als u `126.5050`rechtstreeks op de radio invoert, corrigeert de firmware dit naar de bijbehorende werkfrequentie, in dit geval`126.5000 MHz`
* Als u `126.5050`invoert in`CHIRP`, wordt die exacte waarde opgeslagen en ongewijzigd gebruikt, waardoor de afstemfout blijft bestaan.

### Casus 2: Brussel

Voor **Brussels-National (EBBR)** is de gepubliceerde kanaalaanduiding 8.33 voor **Brussels Ground (Zuid)** **121.880** in de geraadpleegde overzichten.

De **[ICAO-correspondentietabel](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** laat zien dat de gepubliceerde 8.33-kanaalaanduiding **121.880** overeenkomt met de werkfrequentie **121.8750 MHz**. Met andere woorden:

* **Tijdelijke verbinding:** Brussels Ground (Zuid)
* **Kanaalaanduiding:** 121.880
* **Bedrijfsfrequentie:** 121,8750 MHz

Belangrijk verschil:

* Als u `121.8800`rechtstreeks op de radio invoert, corrigeert de firmware dit naar de bijbehorende werkfrequentie, in dit geval`121.8750 MHz`
* Als u `121.8800`invoert in`CHIRP`, wordt die exacte waarde opgeslagen en ongewijzigd gebruikt, waardoor de afstemfout blijft bestaan.

Kortom, als de frequentie die in `CHIRP`is ingevoerd de **kanaalaanduiding** is in plaats van de werkfrequentie, kan het forceren van de monitor in`AM 8.33 kHz` de ontvangst lijken te herstellen, maar het werkelijke probleem is dat de gepubliceerde kanaalaanduiding is geïnterpreteerd als de werkfrequentie.

Als een service die is geprogrammeerd met een kanaalaanduiding pas hoorbaar wordt wanneer u de monitor opent in `AM 8.33 kHz`, probeer dan eerst de bijbehorende werkfrequentie, vooral als de gepubliceerde waarde eindigt op `...005`, `...010`, `...255`, `...505`, `...755` of vergelijkbare kanaalaanduidingen in de stijl van 8.33.

Zie ook:

[Ofcom: inzicht in 8,33 kHz-frequenties en kanaalnummers](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Stop met het de schuld geven aan je radio of firmware. Bekijk deze video op mijn YouTube-kanaal:
[Luchtvaartfrequenties en MONITOR ✈️: Kanaal ≠ Frequentie (de fout die alles verandert)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Het batterijpercentage of de spanning lijkt onjuist.

Controleer deze punten:

1. Zorg ervoor dat de radio niet via `USB-C` wordt opgeladen terwijl u dit controleert.
1. Gebruik `BatTxt = VOLTAGE`of open`SysInf`
1. Zorg ervoor dat `BatTyp` overeenkomt met het accupakket dat u gebruikt.
1. Vergelijk de weergegeven spanning met een multimeter.
1. Indien nodig, pas `BatCal` aan.

Belangrijke mededeling:

* `BatCal` beïnvloedt de spanningsmeting
* `BatTyp` beïnvloedt de schatting van het batterijpercentage

Zie ook: [Radiobediening](./Radio-operation#battery-display-type-and-calibration) en [Menu](./Menu#hidden-menu).

## De PTT-functie van de externe microfoon werkt anders

Dit is een bekend probleem bij sommige hardwareversies.

De gedocumenteerde verschillen omvatten:

* De zender (TX) kan wachten tot de ontvanger (RX) vrij is voordat hij/zij gaat zenden.
* DTMF-tonen of de 1750 Hz-toon kunnen snel worden afgebroken.

De interne zijde `PTT` vertoont deze problemen niet in de gedocumenteerde gevallen.

Zie ook: [Knopfuncties](./Button-functions#external-microphone).

## De radio valt onverwacht uit

Bekijk deze menu's:

* `SetOff`: diepe slaap na een periode van inactiviteit
* `BatSav`: actieve/slaapverhouding tijdens normale werking

Als `SetOff`niet`OFF` is, kan de radio na inactiviteit in de slaapstand gaan, zelfs tijdens het scannen, zolang er geen ontvangst plaatsvindt.

FoxHunt en Beacon negeren opzettelijk `SetOff`. Als de radio in een van beide applicaties actief blijft, laat hem dan met `EXIT`staan voordat u de inactiviteitstimer diagnosticeert. Sinds`v6.0.0` zijn het onafhankelijke applicaties.

Zie ook: [Radiobediening](./Radio-operation#about-the-setoff-menu).

## De navigatie lijkt de verkeerde kant op te gaan

Als de menunavigatie of bepaalde bedieningselementen de verkeerde kant op lijken te bewegen, controleer dan eerst het verborgen menu-item `SetNav`.

Deze firmware kan niet zelfstandig betrouwbaar detecteren of deze op een `UV-K1`of een`UV-K5` draait. Daarom moest de navigatiestijl als menu-instelling beschikbaar worden gesteld.

`SetNav` geeft u de keuze uit:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Dit verandert de functie zelf niet. Het verandert alleen de navigatiestijl die door de firmware wordt gebruikt, en daarmee ook hoe de bedieningselementen op uw radio moeten worden geïnterpreteerd.

Zie ook: [Aan de slag](./Getting-started#model-differences) en [Menu](./Menu#hidden-menu).

## De knoppen doen niet wat ik verwacht.

Bekijk deze mogelijkheden:

1. Toetsenbordvergrendeling kan ingeschakeld zijn.
1. `SetLck`kan ook de programmeerbare zijknop /`M Long`acties, de`PTT`, of beide vergrendelen.
1. De RescueOps-modus schakelt de meeste lange toetsaanslagen en `F`-toetscombinaties uit
1. Sommige acties verschillen tussen `F+` en lang indrukken.
1. Door `F`in te drukken en vervolgens kort op de zijknop te drukken, wordt de stapgrootte aangepast. Door`F` ingedrukt te houden en vervolgens de zijknop ingedrukt te houden, wordt de actiekiezer geopend in de huidige v6-versies.

Zie ook: [Knopfuncties](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon) en [Geavanceerde functies](./Advanced-features#rescueops).

## Inzicht in vermogen en ingesteld vermogen: zendvermogen per kanaal versus globaal zendvermogen

Het menu 'Vermogen' bepaalt het zendvermogen dat door het huidige kanaal of de VFO wordt gebruikt. Beschikbare waarden zijn LOW1 tot en met LOW5, MID, HIGH of USER. Deze instelling wordt daarom lokaal opgeslagen, per kanaal.

Het SetPwr-menu selecteert niet direct het vermogen voor een specifiek kanaal. Het definieert alleen welk vermogensniveau wordt toegewezen aan de USER-modus, waarbij u kunt kiezen uit LOW1 tot LOW5, MID of HIGH. Deze instelling geldt voor de gehele radio.

Hierdoor zullen alle kanalen waarvan de vermogensinstelling op USER staat, automatisch de waarde gebruiken die momenteel in SetPwr is gedefinieerd.

Dit mechanisme maakt het mogelijk om het effectieve vermogen van meerdere kanalen die op USER zijn ingesteld in één keer te wijzigen, zonder elk kanaal afzonderlijk te hoeven bewerken.

## Waar gaan we nu naartoe?

* [Aan de slag](./Getting-started)
* [Programmeren met CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Radiobediening](./Radio-operation)
* [Scannen](./Scanning)
* [Geavanceerde functies](./Advanced-features)
* [Menu](./Menu)
* [Knopfuncties](./Button-functions)
