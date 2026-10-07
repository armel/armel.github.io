> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Overlay-applications/).

# Overlay-toepassingen

Deze pagina beschrijft de elf applicaties die momenteel beschikbaar zijn voor de `Labs`-editie: wat ze doen en hoe u ze kunt bedienen. Voor informatie over installatie, compatibiliteit en ontwikkelaars, zie [Overlay-apps](./Overlay-apps).

> [!NOTE]
> De navigatietoetsen zijn afhankelijk van de radio en de `SetNav`-instelling: `UP`/`DOWN`op de UV-K5, of`LEFT`/`RIGHT`op de UV-K1. In de onderstaande tabellen verwijzen`UP/LEFT`en`DOWN/RIGHT` naar deze equivalente toetsen.

## Een aanvraag starten

1. Installeer een compatibel `.app`-bestand met [UV Studio](./UV-Studio#apps-labs).
1. Druk vanuit het normale radioscherm op `F`en vervolgens op`7 VOX`.
1. Selecteer een geïnstalleerde applicatie met `UP/LEFT`of`DOWN/RIGHT`.
1. Druk op `M` om het te starten.

In de meeste toepassingen sluit `EXIT` de toepassing af en keert terug naar het startscherm of het normale radioscherm. Sommige radio-toepassingen kunnen ook rechtstreeks aan een programmeerbare toets worden toegewezen via de normale actiekiezer.

## Samenvatting van de aanvraag

| Toepassing | Doel |
| --- | --- |
| `Broadcast FM` | Volledig uitgeruste FM-ontvanger met VFO, geheugen en zenderzoekfunctie |
| `FoxHunt` | Signaalsterkte- en richtingsbepalingshulpmiddel met geschiedenis, demping en audiobegeleiding |
| `Beacon` | Herhalen van een ARDF-stijl Morse-baken met behulp van de geselecteerde zend-VFO |
| `Beam` | Eén kanaalconfiguratie draadloos overdragen tussen compatibele radio's |
| `Breakout` | Baksteenbreekspel |
| `Tetris` | Vallende-blokkenspel met score, levels en een opgeslagen beste score |
| `Cube3D` | Geanimeerde 3D-vormviewer |
| `Plasma` | Geanimeerde demoscene-achtige patronen |
| `Snake` | Klassiek rastergebaseerd snake-spel met een opgeslagen beste score |
| `Rapid Roll` | Platformspel waarbij een rollende bal langs obstakels moet blijven afdalen |
| `Space Impact` | Side-scrolling ruimteshooter met automatisch vuur, raketten en eindbazen |

## Broadcast FM

`Broadcast FM` is een complete BK1080 radio-ontvanger. Deze biedt frequentie- en geheugenmodi, vier frequentiebanden, handmatig zoeken, automatische zenderdetectie en 48 FM-geheugenplaatsen die gedeeld worden met de FM-radio in huis.

Tijdens het uitvoeren van deze applicatie worden de normale ontvangst- en dual-watch-functies van de BK4819 opgeschort. Wijzigingen in het FM-geheugen worden veilig opgeslagen wanneer de applicatie wordt afgesloten.

| Sleutel | Actie |
| --- | --- |
| `0`–`9` | Voer een frequentie in in de VFO-modus, of een tweecijferig geheugennummer in de MR/save-modus |
| `UP/LEFT`of`DOWN/RIGHT` | Stem één stap af in VFO-modus; selecteer het vorige/volgende opgeslagen station in MR-modus; kies een opslagslot; wijzig de zoekrichting tijdens het scannen |
| `*` | Handmatig zoeken starten; een actieve scan stoppen |
| `F`, vervolgens `*`of houd`*` ingedrukt | Start automatisch scannen en herbouw de FM-geheugenlijst |
| `M`in VFO-modus | Open`SAVE?`; druk nogmaals op `M` om op te slaan in het geselecteerde slot |
| `M`in MR-modus | Open`DEL?`; druk nogmaals op `M` om het geselecteerde geheugen te verwijderen |
| `F`, vervolgens`1`of houd`1` ingedrukt | Selecteer de volgende uitzendband |
| `F`, vervolgens`3`of houd`3` ingedrukt | Schakel tussen VFO- en MR-modi |
| `F`, vervolgens`0`of houd`0` ingedrukt | Sluit de applicatie af |
| `EXIT` | Wis het laatst ingevoerde cijfer, annuleer een opslaan/verwijderprompt of sluit af |

> [!WARNING]
> Automatisch scannen wist en herbouwt de FM-geheugenlijst voordat de gevonden stations worden opgeslagen.

## Vossenjacht

`FoxHunt` helpt bij het lokaliseren van een zender met behulp van de geselecteerde ontvangst-VFO. Het toont de gecorrigeerde signaalsterkte in dBm, een S-meter in IARU-stijl, piek- en minimumniveaus, trendinformatie en een staafdiagram of signaalgeschiedenis. Instelbare demping vergroot het bruikbare bereik in de buurt van een sterke zender.

| Sleutel | Actie |
| --- | --- |
| `1` | Schakel tussen de staafgrafiek en de signaalgeschiedenis |
| `2` | Selecteer de volgende audiomodus: uit, signaalsterktepiepjes of continu stationgeluid |
| `3` | Verhoog de demping |
| `F`, vervolgens`2` | Selecteer de vorige audiomodus |
| `F`, vervolgens`3` | Vermindering van demping |
| `UP/LEFT`of`DOWN/RIGHT` | Verzwakking direct verhogen/verlagen |
| `M` | De referentiewaarden voor piek, minimum en trend opnieuw instellen |
| Houd `F` ingedrukt | Vergrendel of ontgrendel het applicatietoetsenbord |
| `EXIT` | Afsluiten terwijl het toetsenbord ontgrendeld is |

De grafiek, audiomodus en dempingsinstelling worden opgeslagen voor de volgende keer dat de app wordt gestart. De twee navigatietoetsen blijven beschikbaar, zelfs wanneer het toetsenbord van de app is vergrendeld.

## Baken

`Beacon`zendt herhaaldelijk een ARDF-stijl Morse-identificatie uit op de geselecteerde zend-VFO. Het wisselt af tussen een configureerbaar zendvenster en een rustperiode. Beschikbare identificaties zijn`MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO`en`CALL`; `CALL`verzendt de geconfigureerde roepnaam gevolgd door`MOE`.

| Sleutel | Actie |
| --- | --- |
| `1`| Verhoog de zendduur in stappen van 5 seconden (`5`–`60` seconden) |
| `2`| Verhoog de inactiviteitsduur in stappen van 5 seconden (`5`–`240` seconden) |
| `3` | Selecteer de volgende identificatiecode |
| `4`| Schakel`TONE`/`CARR` keying in/uit |
| `F`, vervolgens`1`/`2`/`3`/`4` | Wijzig de overeenkomstige instelling in de omgekeerde richting |
| `M` tijdens verzending | Stop het huidige verzendvenster en start de inactieve periode |
| `M` tijdens inactiviteit | Start de volledige inactiviteitsaftelling opnieuw |
| Houd `F` ingedrukt | Vergrendel of ontgrendel alle applicatiebedieningselementen |
| `EXIT` | Stop veilig en stap uit terwijl de bedieningselementen ontgrendeld zijn |

De eerste transmissie start direct. De duur, de wachttijd, de identificatiecode en de sleutelmodus worden opgeslagen voor de volgende keer dat de applicatie wordt gestart. Als de aanwezige firmware de transmissie weigert, geeft de applicatie `TX OFF` weer en wordt er niet verzonden.

> [!WARNING]
> De baken zendt automatisch uit. Controleer de geselecteerde VFO, frequentie, vermogen, antenne, roepnaam, duty cycle en lokale regelgeving voordat u hem lanceert.

## Straal

`Beam` verzendt de geselecteerde VFO- of geheugenkanaalconfiguratie tussen compatibele radio's. De verzendende radio verzendt de kanaalgegevens draadloos; de ontvangende radio slaat een geldig pakket op in het eerst beschikbare geheugen.

| Sleutel | Actie |
| --- | --- |
| `UP/LEFT`of`DOWN/RIGHT`| Schakelen tussen zendmodus (`BEAM TX`) en ontvangstmodus (`BEAM RX` ); ook een actieve ontvangstbewerking stoppen |
| `M` in TX-modus | Verzend de geselecteerde kanaalconfiguratie |
| `M` in RX-modus | Begin met wachten op een Beam-pakket |
| `EXIT` | Stop met ontvangen of sluit de applicatie af |

Het display toont `SENT`, `RECEIVED`, `MEM FULL`of`ERROR`, afhankelijk van de situatie. Per lancering wordt slechts één ontvangen kanaal toegewezen; sluit Beam af en heropen het voordat u een ander kanaal ontvangt.

## Uitbraak

`Breakout` is een compact brick-breaking spel met 18 stenen, vijf startballen, een scorebord en level-tracking. Door de muur te verwijderen, start je het volgende level en verdien je een extra bal.

| Sleutel | Actie |
| --- | --- |
| `4`of`UP/LEFT` | Beweeg de peddel naar links |
| `0`of`DOWN/RIGHT` | Beweeg de peddel naar rechts |
| `M`| Pauzeer of hervat; start na`GAME OVER` het voorbereide nieuwe spel |
| `EXIT` | De applicatie afsluiten |

De spelvoortgang wordt niet bewaard nadat je de applicatie hebt afgesloten.

## Tetris

`Tetris` gebruikt een zichtbaar vakje van 16 × 16, een geschudde zak met zeven stukken, een spookstuk, een voorvertoning van het volgende stuk, een score, lijnen en niveaus. De beste score wordt tussen lanceringen opgeslagen.

| Sleutel | Actie |
| --- | --- |
| `4`of`UP/LEFT` | Naar links bewegen |
| `6`of`DOWN/RIGHT` | Ga naar rechts |
| `M`of`2` | Draai het stuk |
| `8` | Zachte val |
| `*`of`0` | Harde drop |
| `F` | Pauzeren of hervatten |
| `M`,`*`, of`0` na game over | Start een nieuw spel |
| `EXIT` | De applicatie afsluiten |

De beweging en het zachte drop-effect worden herhaald zolang de toetsen ingedrukt worden gehouden.

## Cube3D

`Cube3D` kan roterende massieve of draadmodelvormen weergeven. Er zijn acht vormen beschikbaar: kubus, octaëder, tetraëder, ruit, icosaëder, cuboctaëder, zeshoekig prisma en vijfhoekige edelsteen.

| Sleutel | Actie |
| --- | --- |
| `UP/LEFT`of`DOWN/RIGHT`| Rotatiesnelheid verhogen/verlagen (`1`–`16` ) |
| `1`–`8` | Selecteer direct een vorm |
| `*` | Selecteer de volgende vorm |
| `F` | Schakel draadframe-/solid-rendering in/uit |
| `M` | Pauzeren of hervatten |
| `EXIT` | De applicatie afsluiten |

## Plasma

`Plasma` toont geanimeerde, schermvullende patronen in demoscene-stijl met strepen of stippelweergave.

| Sleutel | Actie |
| --- | --- |
| `UP/LEFT`of`DOWN/RIGHT`| Animatiesnelheid verhogen/verlagen (`1`–`8` ) |
| `1`–`5` | Selecteer een patroon en schakel automatisch wisselen uit |
| `*` | Banden-/stippelweergave in-/uitschakelen |
| `F` | Automatisch patroon wisselen in- of uitschakelen |
| `M` | Pauzeren of hervatten |
| `EXIT` | De applicatie afsluiten |

## Slang

`Snake`is een klassiek spel in Nokia-stijl, gespeeld op een`31 × 13`raster. Eet het voedsel om de slang te laten groeien en scoor`10` punten. Het spel eindigt als je de rand raakt of de slang zelf. De hoogste score wordt bewaard voor volgende opstartsessies.

| Sleutel | Actie |
| --- | --- |
| `2`of`3` | Omhoog gaan |
| `4`of`5` | Naar links bewegen |
| `6`of`0` | Ga naar rechts |
| `8`of`9` | Naar beneden bewegen |
| `F` | Pauzeren of hervatten |
| `M`,`*`, of`0` na game over | Start een nieuw spel |
| `EXIT` | De applicatie afsluiten |

Door een richtingstoets ingedrukt te houden, wordt de beweging herhaald. De applicatie weigert direct terug te keren naar het lichaam van de slang. Als de schermbeveiliging tijdens een spel wordt geactiveerd, pauzeert Snake en wordt het spel hervat na het ontwaken.

## Snelle rol

`Rapid Roll`is een platformspel waarin de platforms omhoog bewegen richting een plafond met spikes. Beweeg de bal zijwaarts en laat hem van het ene veilige platform naar het volgende vallen. Platforms met spikes, het plafond en de onderkant van het scherm kosten een leven; vanaf level 3 beginnen de platforms af te brokkelen. Harten leveren`50` punten op en herstellen één leven, tot een maximum van vijf.

| Sleutel | Actie |
| --- | --- |
| `4`of`UP/LEFT` | Naar links rollen |
| `6`of`DOWN/RIGHT` | Rechts rollen |
| `F` | Pauzeren of hervatten |
| `M` na game over | Start een nieuw spel |
| `EXIT` | De applicatie afsluiten |

Het spel begint met drie levens en wordt sneller naarmate het niveau stijgt. Veilige platforms worden smaller in hogere niveaus. Je voortgang wordt niet bewaard na het afsluiten van de app. Als de schermbeveiliging tijdens het spelen wordt geactiveerd, pauzeert Rapid Roll en wordt het spel hervat na het ontwaken uit de schermbeveiliging.

## Impact van de ruimte

`Space Impact` is een side-scrolling shooter. Het schip vuurt automatisch zijn hoofdkannon af, waardoor de besturing vrij blijft voor verticale beweging. Vijandelijke golven gebruiken verschillende bewegings- en aanvalspatronen, gevolgd door een eindbaas met een zichtbare levensbalk aan het einde van elk level.

| Sleutel | Actie |
| --- | --- |
| `2`of`UP/LEFT` | Verplaats het schip omhoog |
| `8`of`DOWN/RIGHT` | Verplaats het schip naar beneden |
| `5`of`M` | Lanceer een doorborende raket |
| `F` | Pauzeren of hervatten |
| `M` na game over | Start een nieuw spel |
| `EXIT` | De applicatie afsluiten |

Het spel begint met drie levens en drie raketten. Het hoofdkanon vuurt automatisch. Voor elke 16 uitgeschakelde vijanden verdien je een extra raket, tot een maximum van negen. Het verslaan van een eindbaas levert een extra leven en raket op wanneer je onder de respectievelijke limieten zit. Je voortgang wordt niet opgeslagen na het afsluiten van de applicatie. Als de schermbeveiliging tijdens het spelen wordt geactiveerd, pauzeert Space Impact en wordt het spel hervat na het ontwaken uit de schermbeveiliging.

## Gerelateerde pagina's

* [Overlay-apps](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Knopfuncties](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [FM-radio-ontvanger](./FM-broadcast-radio-receiver)
