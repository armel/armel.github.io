> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Radio-operation/).

# Radiobediening

Deze pagina beschrijft de dagelijkse bediening van de transceiver: schakelen tussen VFO- en geheugenmodus, het aflezen van de statusbalk, inzicht in TX-beperkingen en het beheren van de slaapstand.

Voor scan-gerelateerde functies, zie [Scannen](./Scanning). Voor live weergave en onderhoud via de browser, zie [UV Studio](./UV-Studio). Voor het kopiëren van radio naar radio, zie [AirCopy](./AirCopy). Voor RescueOps, de hervatmodus, het ingebouwde spel en de op onderzoek gerichte TX-ontgrendelingsprocedure, zie [Geavanceerde functies](./Advanced-features).

> [!WARNING]
> Gebruik Quansheng CPS niet. Het overschrijft aangepaste instellingen.

## Op deze pagina

* [Basisbediening en configuratie](#basic-operation--configuration)
* [Statusbalk](#status-bar)
* [Batterijweergave, type en kalibratie](#battery-display-type-and-calibration)
* [Over de menu's `F Lock`en`TXLock`](#about-the-f-lock-and-txlock-menus)
* [Screensaver en backlight timeout](#screen-saver-and-backlight-timeout)
* [Over het SetOff-menu](#about-the-setoff-menu)
* [1750 Hz toonstoot voor repeatertoegang](#1750-hz-tone-burst-for-repeater-access)
* [Gerelateerde pagina's](#related-pages)

> [!TIP]
> Veelvoorkomende snelle controles:
> - Quansheng CPS heeft aangepaste instellingen overschreven
> - de frequentie valt buiten het geselecteerde `F Lock`-plan
> - `TXLock`is nog steeds`ON`
> - `AM`of`USB`is geselecteerd in plaats van`FM`
>
> Zie [Probleemoplossing](./Troubleshooting) voor de korte versie.

## Basisbediening en configuratie

Het radiodisplay is opgesplitst in een bovenste VFO en een onderste VFO. U kunt de bovenste/onderste selectie wijzigen door op `F`+`2 A/B`te drukken (of door`2 A/B` lang ingedrukt te houden).

Elke VFO kan onafhankelijk werken in de frequentiemodus of de kanaalmodus. Om van modus te wisselen, selecteert u de gewenste VFO en drukt u op `F`+`3 VFO/MR`(of houdt u`3 VFO/MR` ingedrukt).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

In `frequency mode`voert u handmatig de frequentie in met het toetsenbord. U kunt ook verschillende opties voor die VFO wijzigen in het menu (de eerste 13 menu-items). Zodra de VFO is ingesteld, kunnen de instellingen worden opgeslagen in een geheugenkanaal door naar het menu`ChSave` te gaan en het gewenste geheugenkanaal te selecteren.

In `channel mode`kunt u schakelen tussen opgeslagen geheugenkanalen. Geheugenkanalen kunnen handmatig worden toegevoegd zoals hierboven vermeld, of geprogrammeerd vanaf een computer met de`CHIRP`-driver die bij elke firmware-release wordt meegeleverd. Zie [Programmeren met CHIRP](./Programming-with-CHIRP) voor de specifieke F4HWN-workflow.

Voor frequentiescans, geheugenscans, `ScnRng` en DCS/CTCSS-scans, zie [Scanning](./Scanning).

## Statusbalk

Bovenaan het scherm, op de eerste regel, bevindt zich de statusbalk. Deze toont veel informatie. Hier zijn enkele voorbeelden:

| Screenshot van de Quansheng K5 met de F4HWN-firmware | Beschrijving |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR betekent dat RxMode is ingesteld op DUAL RX RESPOND, OP betekent dat PTT is ingesteld op ONEPUSH, het F-pictogram betekent dat de `F`-toets is ingedrukt en je ziet de batterijspanning. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS betekent dat de energiebesparingsmodus is geactiveerd, DW betekent dat de Rx-modus is ingesteld op MAIN TX / DUAL RX, VX betekent dat VOX is geactiveerd, CL betekent dat PTT is ingesteld op CLASSIC, het slotpictogram betekent dat het toetsenbord is vergrendeld en je ziet de batterijspanning. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS betekent dat de energiebesparingsmodus is geactiveerd, MO betekent dat de ontvangstmodus is ingesteld op ALLEEN HOOFD, OP betekent dat PTT is ingesteld op ONEPUSH, en je ziet het batterijpercentage. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO betekent dat RxMode is ingesteld op MAIN ONLY, OP betekent dat PTT is ingesteld op ONEPUSH, het lichtpictogram betekent dat de handmatige achtergrondverlichting is geactiveerd en je ziet het batterijpercentage. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | De RX-timer aan de linkerkant geeft aan hoe lang het geleden is dat je een signaal hebt ontvangen, OP betekent dat PTT is ingesteld op ONEPUSH, het lichtpictogram betekent dat de handmatige achtergrondverlichting is geactiveerd en je ziet het batterijpercentage. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | De kleine `PMR`in de video-omgekeerde weergave en`><`betekenen dat je momenteel lijst`PMR` scant, CL betekent dat PTT is ingesteld op KLASSIEK, het lichtpictogram betekent dat de handmatige achtergrondverlichting is geactiveerd en je ziet het batterijpercentage. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | Het pictogram `ALL`en`><` betekenen dat u momenteel alle vermelde kanalen scant, OP betekent dat PTT is ingesteld op ONEPUSH, het lichtpictogram betekent dat de handmatige achtergrondverlichting is geactiveerd en u ziet het batterijpercentage. |

> [!NOTE]
> Over `RxMode`: `MO`betekent ALLEEN HOOFD,`DW`betekent HOOFD TX / DUBBELE RX,`DWR`betekent DUBBELE RX RESPOND, en`XB` betekent CROSSBAND.

## Batterijweergave, -type en -kalibratie

De firmware scheidt drie verschillende batterijgerelateerde zaken van elkaar:

* de gemeten accuspanning
* het geschatte batterijpercentage
* het slaap-/energiebesparende gedrag

Voor batterij-informatie op het scherm:

* `BatTxt`voegt`VOLTAGE`of`PERCENT`toe aan de statusbalk, of verbergt deze met`NONE`
* `SysInf` toont de gecorrigeerde batterijspanning, het geschatte batterijpercentage en de firmwareversie

Om het batterijpercentage te kunnen interpreteren, zijn twee verborgen menu-items van belang:

* `BatCal` kalibreert de weergegeven batterijspanning
* `BatTyp` selecteert de ontladingscurve die wordt gebruikt voor de schatting van het batterijpercentage.

Belangrijk verschil:

* `BatCal` wijzigt de spanningsmeting
* `BatTyp`wijzigt de berekening van`%`, niet de gemeten spanning zelf.

De huidige keuzes voor `BatTyp` zijn:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Zoals bij elke op spanning gebaseerde schatting is het batterijpercentage slechts een benadering. Het hangt af van het geselecteerde batterijprofiel, de batterijconditie en de huidige belasting.

### Kalibreer de accuspanning met een multimeter

1. Zorg ervoor dat de radio niet wordt opgeladen via `USB-C`.
1. Laat de radio even inactief. Kalibreer niet tijdens het zenden.
1. Meet de accuspanning met een multimeter op de accucontacten aan de achterkant van de radio/accu.
1. Open het verborgen menu en ga naar `BatCal`.
1. Stel `BatCal` zo af dat de spanning die de radio aangeeft zo goed mogelijk overeenkomt met de waarde op de multimeter.
1. Bevestig met `M`.

> [!TIP]
> Als de spanning correct is, maar het percentage nog steeds niet klopt, is `BatCal`waarschijnlijk in orde en moet`BatTyp` worden gecontroleerd.

## Over de menu's `F Lock`en`TXLock`

In het verleden waren er in het menu `F Lock`een aantal bandplannen beschikbaar om aan diverse verzoeken te voldoen: PMR 446, FRS/GMRS/MURS, enz. Het toevoegen van nieuwe opties`F Lock`nam echter altijd veel geheugen in beslag: nieuwe opties in het menu`F Lock`, het opslaan van frequenties (voor specialisten: dit is telkens `uint32_t`, dus het is erg geheugenintensief), enz.

Het moet echter worden erkend dat het ingewikkeld, zo niet onmogelijk, was om bandplannen aan te bieden die aan alle verwachtingen zouden voldoen. Er zijn te veel verschillen tussen de landen. Bovendien is er geen mogelijkheid om meerdere frequentieplannen uit het `F Lock`-menu te combineren. Bijvoorbeeld door zowel de PMR 446- als de LPD-band te openen. Kortom, `F Lock` is te beperkt en niet schaalbaar.

Hier is de oplossing:

1. Selecteer het meest geschikte bandplan in het menu `F Lock`. Als u bijvoorbeeld een roepnaam hebt en in Europa woont, selecteer dan CE HAM. Als u geen roepnaam hebt en alleen een kortegolf-luisteraar bent, selecteer dan ALLES UITSCHAKELEN, wat veiliger is.
1. Als u toch wilt uitzenden op een geheugenkanaal dat niet is geopend in het bandplan, ga dan naar het menu `TXLock`en kies`OFF`. Hiermee wordt een uitzondering aangemaakt en kunt u op dat kanaal uitzenden.

Kort samengevat:

* Als de frequentie binnen het in `F Lock` geselecteerde bandplan valt, kunt u verzenden.
* als de frequentie buiten het bandplan valt dat is geselecteerd in `F Lock`:
  * U kunt alleen verzenden als `TXLock`gelijk is aan`OFF`
  * U kunt niet verzenden als `TXLock`gelijk is aan`ON`

Als een geheugenkanaal of VFO buiten het geselecteerde bandplan valt en `TXLock`gelijk is aan`ON`, verschijnt er een klein hangslotje links van de naam.

Voor de onderzoeksgerichte procedure `UNLOCK ALL`, zie [Geavanceerde functies](./Advanced-features#tx-on-all-bands).

## Schermbeveiliging en time-out van de achtergrondverlichting

Builds met schermbeveiligingsondersteuning voegen het menu `SetSav` toe.

`SetSav`werkt samen met`BLTime`: wanneer de radio inactief is en de time-out voor de achtergrondverlichting verloopt, kan de schermbeveiliging het normale scherm vervangen in plaats van het display ongewijzigd te laten.

De beschikbare modi zijn:

* `OFF`: geen schermbeveiliging
* `LOGO`: toon het aangepaste opstartlogo als inactief scherm
* `LOGO+`: toon het aangepaste opstartlogo met een scrolleffect
* `MATRIX`: toon een geanimeerd inactief scherm in matrixstijl

De logo-modi gebruiken hetzelfde `128x64`-logo dat is geüpload met [UV Studio](./UV-Studio#boot-logo).

De schermbeveiliging wordt opzettelijk uitgeschakeld tijdens actief radiogebruik: ontvangen (RX), verzenden (TX), push-to-play (PTT), beamen (BEAM) en actief FM-scannen. Hij kan wel op het hoofdscherm van de radio en het FM-uitzendscherm worden weergegeven wanneer de radio inactief is. Door op een toets te drukken, wordt het normale scherm weer geactiveerd.

Als `BLTime`is ingesteld op een altijd-uit- of altijd-aan-stijlwaarde in plaats van een tijdsduur, neemt`SetSav` het scherm niet over.

## Over het SetOff-menu

Met het menu `SetOff`kunt u een time-out instellen voordat uw radio in de slaapstand gaat. Deze vertraging kan worden ingesteld tussen 1 minuut en 2 uur. Als`SetOff`gelijk is aan`OFF`, is de slaapstand uitgeschakeld.

Stel bijvoorbeeld dat u de vertraging instelt op 5 minuten en dat er gedurende deze tijd het volgende gebeurt:

* geen ontvangst
* geen transmissie
* geen knop indrukken

Uw radio schakelt dan automatisch over naar de slaapstand. U wordt hiervan 10 seconden van tevoren op de hoogte gesteld door middel van een knipperend scherm.

Houd er rekening mee dat de slaapstand wordt geactiveerd, zelfs als u aan het scannen bent, zolang er geen ontvangst is.

FoxHunt en Beacon vormen een bewuste uitzondering: zolang een van beide applicaties actief is, negeert de radio `SetOff` totdat u deze expliciet verlaat. De normale time-out voor de achtergrondverlichting blijft wel van kracht. Zie [FoxHunt](./Fox-Hunt) en [Beacon](./Beacon).

Eenmaal in de slaapstand:

* het scherm is volledig uitgeschakeld
* De rode LED aan de voet van de antenne knippert
* De BK4819-module gaat in de diepe slaapstand en wordt periodiek elke:
  * 2 seconden als `BatSav`is ingesteld op`1:1`
  * 4 seconden als `BatSav`is ingesteld op`1:2`
  * 6 seconden als `BatSav`is ingesteld op`1:3`
  * 8 seconden als `BatSav`is ingesteld op`1:4`
  * 10 seconden als `BatSav`is ingesteld op`1:5`

Om de slaapstand te verlaten, hoeft u alleen maar het volgende te doen:

* een signaal ontvangen tijdens de periodieke ontwaakfase van de BK4819
* Start een transmissie door op de PTT-knop te drukken
* of druk op een andere knop

Als voorbeeld heb ik de slaapstand getest op twee K5(8)-radio's met gekalibreerde en volledig opgeladen accu's, met dezelfde instellingen, frequenties, modus ( `DWR`) en`BatSav`ingesteld op`1:5`. Het enige verschil was dat de slaapstand op de ene radio was ingeschakeld en op de andere niet. Na 36 uur gebruik had de radio zonder slaapstand nog maar 20% accucapaciteit over, terwijl de radio met slaapstand nog 60% accucapaciteit had.

## Toonstoot van 1750 Hz voor repeatertoegang

Wanneer `PTT` wordt ingedrukt, kan de toon van 1750 Hz worden geactiveerd door [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3) in te drukken.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programmeren met CHIRP](./Programming-with-CHIRP)
* [Scannen](./Scanning)
* [Menu](./Menu)
* [Knopfuncties](./Button-functions)
* [Geavanceerde functies](./Advanced-features)
* [Probleemoplossing](./Troubleshooting)
