> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Getting-started/).

# Aan de slag

Deze pagina is een korte handleiding voor gebruikers die de firmware voor het eerst gebruiken. Het vervangt niet de volledige documentatie, maar het helpt u wel om sneller de juiste pagina te vinden en de meest voorkomende fouten te voorkomen.

## Eerste 5 minuten

Als je alleen een frequentie wilt programmeren, test dan de radio en sla de frequentie op:

1. Selecteer de actieve VFO met `F`+`2 A/B`.
1. Schakel die VFO over naar `frequency mode`met`F`+`3 VFO/MR`.
1. Voer een frequentie in met het toetsenbord.
1. Open het menu met `M`, kies `Channels`(of`All`) en pas de basisinstellingen aan die u nodig hebt ( `Step`,`Power`, tonen, offset, bandbreedte,`Mode`,`TXLock` ).
1. Sla de configuratie op met `ChSave` als u deze als geheugenkanaal wilt bewaren.
1. Schakel terug naar `channel mode`met`F`+`3 VFO/MR` wanneer u door opgeslagen kanalen wilt bladeren.

Als u de radio via een browser wilt bekijken of bedienen, RF-activiteit wilt inspecteren, firmware wilt flashen, een back-up van de kalibratie wilt maken of een aangepast opstartlogo wilt uploaden, gebruik dan [UV Studio](./UV-Studio). Als u liever geheugens programmeert vanaf een computer, gebruik dan de speciale `CHIRP`-driver die bij elke firmware-release wordt meegeleverd. Zie [Programmeren met CHIRP](./Programming-with-CHIRP) voor de volledige workflow.

Als je de firmware al kent, zie [Recente wijzigingen](./Recent-changes) voor de nieuwste stabiele `v6.1.0`wijzigingen en de eerdere`v6.0.0` hoogtepunten.

> [!WARNING]
> Gebruik Quansheng CPS niet. Het overschrijft aangepaste instellingen.

## Kies een editie

De nieuwste stabiele versie `v6.1.0` heeft vier officiële edities:

| Editie | Het meest geschikt voor | Extra mogelijkheden |
| --- | --- | --- |
| `Fusion` | de meeste gebruikers en dagelijks gebruik | evenwichtige referentiefunctieset |
| `FieldOps` | gebruik in het veld en door eerstehulpverleners | RescueOps, FoxHunt (ingezetene), Beacon (ingezetene) |
| `Transfer` | Gegevens kopiëren tussen radio's | AirCopy en resident Beam |
| `Labs` | experimenten | RescueOps, AirCopy en installeerbare overlay-apps |

FoxHunt en Beacon zijn onafhankelijke applicaties sinds `v6.0.0`. In FieldOps zijn ze permanent geïnstalleerd; in Labs worden ze afzonderlijk geïnstalleerd en gestart als overlay-applicaties.

Voor de meeste gebruikers is het aan te raden te beginnen met Fusion en pas een gespecialiseerde editie te kiezen wanneer de extra mogelijkheden nodig zijn. Met Multiboot kunt u meerdere edities en afzonderlijke configuraties op dezelfde radio bewaren.

## Algemene taken

### Start met het scannen van frequenties

1. Schakel een VFO over naar `frequency mode`.
1. Stel de startfrequentie in.
1. Stel de frequentiestap in met menu `Step`.
1. Houd `* SCAN` lang ingedrukt.

Voor een beperkt scanbereik laadt u de onder- en bovengrens in de twee VFO's, houdt u `5 NOAA`ingedrukt om`ScnRng`in te schakelen en houdt u vervolgens`* SCAN` ingedrukt.

Voor het volledige scangedrag, scanlijsten, prioriteitsscans en DCS/CTCSS-scans, zie [Scannen](./Scanning).

### Start met het scannen van geheugenkanalen

1. Schakel over naar `channel mode`.
1. Wijs kanalen toe aan een scanlijst met menu `ScList`of door`5 NOAA` lang ingedrukt te houden.
1. Houd `* SCAN` lang ingedrukt.

De huidige `v6.1.0`-firmware ondersteunt `24`-scanlijsten, `ALL`en een configureerbare`MIX`-modus die meerdere geselecteerde lijsten tegelijk scant.

Zie [Scannen](./Scanning) voor het volledige gedrag van de scanlijst.

### Als u niet kunt verzenden

Controleer eerst deze punten:

1. Zorg ervoor dat `Mode` `FM`is en niet`AM`of`USB`.
1. Controleer of de frequentie binnen het geselecteerde `F Lock`-abonnement valt.
1. Als de frequentie buiten het geselecteerde bandplan valt, controleer dan of `TXLock`is ingesteld op`OFF`.
1. Zoek naar een klein hangslotje naast de kanaal- of VFO-naam.

Als dat het probleem nog steeds niet oplost, raadpleeg dan [Probleemoplossing](./Troubleshooting).

### Bespaar batterij

De twee belangrijkste menu's die je moet kennen zijn:

* `BatSav` voor de actieve/slaapverhouding tijdens normaal gebruik
* `SetOff` voor diepe slaap na een periode van inactiviteit

Zie [Radiobediening](./Radio-operation#battery-display-type-and-calibration) voor batterijweergave, batterijtype en kalibratie, en [Radiobediening](./Radio-operation#about-the-setoff-menu) voor het gedetailleerde gedrag van de slaapstand.

## Verschillen tussen modellen

Deze firmware is bedoeld voor de `UV-K1`en`UV-K5 V3`.

Het meest zichtbare verschil in de documentatie van dag tot dag is de navigatie:

* `UV-K5`: navigatie wordt gewoonlijk beschreven met `UP`/`DOWN`
* `UV-K1`: navigatie wordt meestal beschreven met `LEFT`/`RIGHT`

De optie voor het verborgen menu `SetNav` bepaalt deze navigatiestijl.

Sommige schermafbeeldingen en voorbeelden gebruiken eerst de terminologie van de UV-K5, maar dezelfde functie is meestal ook beschikbaar op de UV-K1 met de overeenkomstige navigatietoetsen.

## Kernconcepten

Deze termen komen overal in de wiki voor:

* `VFO mode`: u typt frequenties direct in en past live-instellingen aan voordat u ze opslaat.
* `Channel mode`/`memory mode`: u bladert door opgeslagen geheugenkanalen
* `Main VFO`: de actieve boven- of onderlijn, gemarkeerd met`►`
* `Menu category`: het eerste gecategoriseerde menuniveau dat is geïntroduceerd in Fusion `v5.9.0`en wordt gebruikt door de huidige v6-versies;`All` herstelt de oorspronkelijke platte volgorde en globale nummering.
* `F Lock`: het hoofd TX-bandplan
* `TXLock`: een extra zendvergunning per kanaal wanneer een frequentie buiten het geselecteerde `F Lock`-plan valt
* `Scan list`: een van de`24`geheugenscangroepen, of`ALL`
* `MIX`: een`v6.1.0`scanmodus die een opgeslagen selectie van lijsten`01`combineert met`24`
* `ScnRng`: scant alleen tussen de frequenties die momenteel in de twee VFO's zijn geladen
* `SetOff`: inactiviteitstijdslimiet voor diepe slaap
* `POnMsg`: opstartweergavemodus, inclusief het optionele aangepaste opstartlogo
* `Multiboot`: bewaart `Main` plus vier extra v6-compatibele firmware-images in het externe flashgeheugen
* `Config bank`: het geïsoleerde kanaal-/instellingenprofiel dat standaard is gekoppeld aan een Multiboot-slot
* `SetCfg`: wijzigt de configuratiebank zonder de actieve firmware-sleuf te wijzigen
* `Overlay app`: een klein Labs-programma `.app` dat bij het opstarten vanuit extern flashgeheugen in het RAM-geheugen wordt geladen.
* `MO`,`DW`,`DWR`,`XB`:`RxMode` afkortingen weergegeven in de statusbalk

## Waar gaan we nu naartoe?

* [Radiobediening](./Radio-operation) voor VFO/kanaalgebruik, statusbalk, `F Lock`, `TXLock` en slaapgedrag
* [Recente wijzigingen](./Recent-changes) voor de belangrijkste, voor de gebruiker zichtbare wijzigingen in recente releases
* [UV Studio](./UV-Studio) voor live weergave, RF-activiteit, firmware-flashing, Multiboot-slots, Labs-apps, kalibratie, opstartlogo's en de `v1.6.0` externe flash-hersteltools
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig) voor firmware-slots, de opstartselector, configuratiebanken en `SetCfg`
* [Overlay-apps](./Overlay-apps) voor het installeren en starten van experimentele Labs-apps
* [Programmeren met CHIRP](./Programming-with-CHIRP) voor computerprogrammering met de speciale driver die in elke release is opgenomen
* [Scannen](./Scanning) voor frequentiescan, geheugenscan, `ScnRng` en DCS/CTCSS-scanning
* [Menu](./Menu) voor elk menu-item en het verborgen menu
* [Knopfuncties](./Button-functions) voor sneltoetsen, lang indrukken en programmeerbare toetsen
* [FoxHunt](./Fox-Hunt) voor signaalsterkte-ondersteunde richtingbepaling met alleen ontvangst
* [Beacon](./Beacon) voor de onafhankelijke periodieke Morse-zender
* [AirCopy](./AirCopy) voor het overdragen van geheugen/instellingen tussen radio's en de `v6.1.0` verbeteringen
* [Geavanceerde functies](./Advanced-features) voor RescueOps, Hervatmodus, het ingebouwde spel en TX-on-all-bands onderzoeksfuncties
* [Spectrumanalysator](./Spectrum-analyzer) voor bandscoop-achtige scanning
* [FM-radio-ontvanger](./FM-broadcast-radio-receiver) voor de FM-radiofunctie
* [Probleemoplossing](./Troubleshooting) voor veelvoorkomende problemen en snelle controles
