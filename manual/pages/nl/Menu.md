> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Menu/).

# Menubediening

Het menu is te openen met de `M`-knop (kort indrukken).

> [!NOTE]
> Navigatie maakt gebruik van `UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT`op UV-K1. De actieve lay-out volgt de optie voor het verborgen menu`SetNav`.

De categoriebrowser, geïntroduceerd in Fusion `v5.9.0`, wordt gebruikt in de officiële edities `v6.0.0`en`v6.1.0`. Selecteer een categorie met `UP`/`DOWN`en druk vervolgens op`M` om de lijst met items te openen. Het geselecteerde item wordt aan de linkerkant van het scherm weergegeven en de huidige waarde ervan aan de rechterkant.

Om een menu-item te vinden, blader je door de categorie of selecteer je `All`om het originele platte menu te gebruiken. Je kunt ook het **globale menu-itemnummer** invoeren vanuit het categoriescherm; voer bijvoorbeeld`52`in om toegang te krijgen tot`SysInf`. Directe nummerinvoer schakelt over naar `All`. Fusion `v5.9.0`gebruikt`01`tot en met`77`; Multiboot-compatibel `v6.0.0`voegt`SetCfg`toe en breidt de volledige lijst uit tot`78`.

Zodra het gewenste menu-item is geselecteerd, opent u dat menu-item door op de knop `M` te drukken.

Nadat u een menu-item hebt geselecteerd, kunt u de instelling voor dat item aanpassen door op de pijlknoppen `UP`en`DOWN`te drukken. Om de selectie te bevestigen, drukt u op de knop`M`. Om de selectie te annuleren, drukt u op `EXIT`.

Druk kort op `EXIT`om vanuit een artikellijst terug te keren naar de categoriebrowser. Druk nogmaals kort op`EXIT` om het menu te verlaten en terug te keren naar het radioscherm.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Menubrowser met categorieën

Het Fusion-categorieënscherm toont aan de linkerkant de vorige, huidige en volgende categorie. Aan de rechterkant wordt weergegeven hoeveel items de geselecteerde categorie bevat.

| Categorie | Fusion-items | Inhoud |
| --- | ---: | --- |
| `Channels`| 21 in v6 | frequentiestap, vermogen, tonen, offset, bandbreedte, kanaal- en geheugeninstellingen, plus`SetCfg` |
| `Scan` | 6 | scanlijst, prioriteitskanalen, hervatmodus en scanengine |
| `Keys` | 10 | programmeerbare sneltoetsen, toetsenbordvergrendeling, PTT-modus en oproepkanaal |
| `Power` | 4 | batterijbesparing/scherm, inactiviteitstijdslimiet en schermbeveiliging |
| `Display` | 11 | kanaalweergave, opstartscherm, achtergrondverlichting en UI-instellingen |
| `Timers` | 4 | Instellingen voor TX-time-out, EOT en RX/TX-timer |
| `Audio` | 5 | microfoon, toetsenbordpiep, volume en RX-audioprofielen |
| `Radio` | 6 | squelch, STE, Roger Beep, VOX en RX-modus |
| `DTMF` | 5 | op/neer codes, zijtoon, preload en live decoder |
| `Service` | 6 | verborgen opstartmenu's; alleen zichtbaar na het gebaar voor het openen van verborgen menu's |
| `All` | 72 normaal in v6, 78 met Service | originele platte menuvolgorde en wereldwijde nummering |

De artikelsteller binnen een gefilterde categorie is specifiek voor die categorie. Gebruik `All` of voer een nummer in vanuit het categoriescherm als u de onderstaande globale aantallen wilt zien.

De firmware onthoudt de laatst geselecteerde categorie en het laatst gemarkeerde item in elke categorie voor de huidige sessie. Deze navigatieposities worden niet bewaard na een herstart.

## Snelle tips

* In `All` zijn de eerste 13 items de belangrijkste live VFO/kanaalinstellingen.
* `ScList`,`ScPri`,`PriCh1`,`PriCh2`, en`ScnRev` zijn de belangrijkste scan-gerelateerde items
* `F1Shrt`,`F1Long`,`F2Shrt`,`F2Long`, en`M Long` besturen aanpasbare sneltoetsen
* Het verborgen menu is alleen beschikbaar bij het opstarten met `PTT`+`SIDE BUTTON 1️⃣`

## Hoofdmenu

Het nummer vóór elke menubeschrijving is het **menunummer** waarmee je snel een item kunt selecteren.
1. `Step`- stapgrootte van de frequentie (in kHz), de knoppen`UP`en`DOWN` wijzigen de frequentie met deze waarde. U kunt alleen een frequentie instellen die een veelvoud is van de helft van deze waarde.
1. `Power`- radio-uitgangsvermogen (LAAG 1 / LAAG 2 / LAAG 3 / LAAG 4 / LAAG 5 / MIDDEN / HOOG / GEBRUIKER). Houd er rekening mee dat het gebruikersvermogen kan worden aangepast via het menu`SetPower`.
1. `RxDCS`- Digitale coderingsonderdrukking voor ontvangers. Als u dit inschakelt, wordt de onderdrukking alleen opgeheven als deze code wordt ontvangen. U kunt een DCS/CTCSS-scan starten terwijl u zich in dit menu bevindt door op de knop`* SCAN` te drukken.
1. `RxCTCS`- ontvanger Continu Toongecodeerd Squelchsysteem. De squelch wordt alleen ontgrendeld als deze code wordt ontvangen. U kunt een DCS/CTCSS-scan starten terwijl u zich in deze menuoptie bevindt door op de`* SCAN`-knop te drukken.
1. `TxDCS` - zender met digitale coderingsquelch, de radio stuurt de opgegeven code tijdens het zenden
1. `TxCTCS` - zender met continu toongecodeerd squelch-systeem, de radio stuurt de opgegeven code tijdens het zenden

In de submenu's `RxDCS`, `TxDCS`, `RxCTCS`en`TxCTCS` toont het pictogram rechtsboven de geselecteerde vermelding en de bijbehorende homologatie-index:

   * voor CTCSS: `NN/HH`, waarbij `NN`de positie in de volledige lijst van 50 tonen is en`HH`het gehomologeerde toonnummer.`--` betekent dat de geselecteerde toon een van de extra, niet-gehomologeerde tonen is.
   * voor DCS: `NNN/HH`, waarbij `NNN`de positie in de volledige DCS-lijst is en`HH`het gehomologeerde DCS-nummer.`--` betekent dat de geselecteerde DCS-vermelding niet in de gehomologeerde PMR446-lijst staat.
   * `OFF`wordt weergegeven als`00/00`voor CTCSS en`000/00` voor DCS.
   * DCS-waarden die eindigen op `N`zijn normale codes; waarden die eindigen op`I`zijn omgekeerde codes. De omgekeerde DCS-waarden worden wel in de volledige lijst weergegeven, maar krijgen geen gehomologeerde index en worden daarom weergegeven als`--`.

1. `TxODir` - richting van de frequentie-offset van de zender
1. `TxOffs` - waarde van de frequentie-offset van de zender
1. `W/N` - bandbreedte gebruikt door transceiver
   * BREED - `25 kHz`
   * SMAL - `12.5 kHz`
1. `BusyCL` - blokkering van bezet kanaal, voorkomt dat de radio zendt wanneer er een signaal wordt ontvangen
1. `Compnd` - compander (compressor/expander), maakt het mogelijk signalen met een groot dynamisch bereik te verzenden via apparaten met een kleiner dynamisch bereik, verbetert de audiokwaliteit, beide radio's dienen deze optie te gebruiken
1. `Mode` - demodulatiemodus, standaard is FM, AM / USB kan alleen worden gebruikt om te luisteren
1. `TXLock`- de zendmodus van het kanaal in- of uitschakelen (indien dit niet onder het`F Lock`-plan valt)
1. `ChList` - selecteer de scanlijst voor het geheugenkanaal
1. `ChSave` - sla de huidige instelling op in een geheugenkanaal
1. `ChDele` - geheugenkanaal verwijderen
1. `ChName` - naam van geheugenkanaal wijzigen
   * Gebruik de knoppen `UP`en`DOWN` om een kanaal te selecteren dat u wilt bewerken.
   * Druk nogmaals op de knop `M` om de naambewerkingsmodus te openen.
   * Gebruik de cijfertoetsen in de multi-tap-modus om het huidige teken te bewerken, net als op oudere mobiele telefoons.
     * Druk nogmaals op dezelfde toets om door de letters en cijfers te bladeren die eraan zijn toegewezen ( `2`=`a`,`b`,`c`,`2`, enz.)
     * Houd een cijfertoets ingedrukt om direct het bijbehorende cijfer in te voeren.
     * Druk kort op `F`om te wisselen tussen kleine en hoofdletters (`abc`/`ABC` )
     * Houd `F`lang ingedrukt om`#` te openen
     * Druk kort op `* SCAN`om naar`-`te gaan, of houd hem ingedrukt om naar`*` te gaan.
     * Druk kort op `0`om een spatie in te voeren en druk er vervolgens nogmaals op om`0` in te voeren.
   * Je kunt de knoppen `UP`en`DOWN` nog steeds gebruiken om handmatig door de beschikbare tekens te bladeren.
   * Druk op de knop `M` om naar de volgende tekenpositie te gaan
   * Herhaal de bovenstaande twee stappen tot je het einde bereikt.
   * Wanneer "Weet je het zeker?" verschijnt, druk dan op de knop `M` om op te slaan, of op Afsluiten om te annuleren.
   * Druk kort op `EXIT` om één teken terug te gaan; vanaf de eerste tekenpositie verlaat u de naambewerkingsmodus.
   * Houd `EXIT` lang ingedrukt om de bewerking te annuleren en terug te keren naar het hoofdmenu.
1. `ScList`- selecteert de scanlijst die wordt gebruikt voor het scannen van kanalen:`01`tot en met`24`, `ALL`en, vanaf`v6.1.0`, `MIX`.
   * `MIX` combineert een opgeslagen selectie van genummerde lijsten zonder de aan elk kanaal toegewezen lijst te wijzigen.
   * Selecteer `MIX`en druk op`M` om de editor te openen.
   * Gebruik de navigatietoetsen of voer `01`tot`24`in om een lijst te selecteren en druk vervolgens op`M` om deze te wisselen.
   * Druk op `EXIT` om op te slaan. Er moet ten minste één lijst geselecteerd blijven.
   * Zie [MIX scanlijst](./Scanning#mix-scan-list-v610) voor het volledige gedrag.
1. `ScPri` - schakelt de ondersteuning voor prioriteitskanalen in/uit tijdens het scannen.
1. `PriCh1` - stelt prioriteitskanaal 1️⃣ in
1. `PriCh2` - stelt prioriteitskanaal 2️⃣ in
1. `ScnRev` - scan hervatmodus
   * DRAAGSTOF - nadat het signaal verdwijnt, pauzeer [250 milliseconden tot 20 seconden] voordat u het scannen hervat.
   * STOP - stop de scan na ontvangst van een signaal
   * TIMEOUT - het scannen wordt hervat na een pauze van [5 seconden tot 2 minuten]
1. `F1Shrt`-`SIDE BUTTON 1️⃣` functie voor kort indrukken
1. `F1Long`-`SIDE BUTTON 1️⃣` functie voor lang indrukken
1. `F2Shrt`-`SIDE BUTTON 2️⃣` functie voor kort indrukken
1. `F2Long`-`SIDE BUTTON 2️⃣` functie voor lang indrukken
1. `M Long`-`M` knop lang indrukken functie
1. `KeyLck` - optie voor automatische toetsenbordvergrendeling (UIT of 15 seconden tot 10 minuten voordat het toetsenbord automatisch wordt vergrendeld)
1. `TxTOut` - maximale transmissietijdlimiet
1. `BatSav` - batterijbesparingsoptie, een verhouding tussen actieve tijd en slaaptijd (UIT, 1:1 tot 1:5)
1. `BatTxt`- extra batterijwaarde op de statusbalk (`NONE`,`VOLTAGE`, of`PERCENT` )
1. `Mic` - microfoongevoeligheid
1. `MicBar` - microfoonbalk die verschijnt tijdens het verzenden
1. `ChDisp` - kanaalweergavestijl
1. `POnMsg` - opstartweergavemodus
   * `ALL`: toon het geconfigureerde welkomstbericht, de spanning en de firmware-/versie-informatie
   * `SOUND`: behoud het normale opstartgeluid zonder welkomstscherm
   * `MESSAGE`: toon alleen het geconfigureerde welkomstbericht
   * `VOLTAGE`: toont de batterijspanning en het geschatte percentage
   * `LOGO`: toon het aangepaste 128x64 opstartlogo dat is geüpload met [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: sla het opstartscherm over
1. `BLTime` - duur van de achtergrondverlichting
1. `BLMin` - minimale achtergrondverlichtinghelderheid; wanneer de schermachtergrondverlichting wordt uitgeschakeld, zal deze tot deze waarde dimmen.
1. `BLMax` - maximale helderheid van de achtergrondverlichting; wanneer de achtergrondverlichting van het scherm wordt ingeschakeld, zal deze op deze waarde helder worden.
1. `BLTxRx` - achtergrondverlichting activeren op TX of RX
1. `Beep` - pieptoon bij het indrukken van het toetsenbord
1. `Roger` - Roger-piep aan het einde van de transmissie
1. `STE` - squelch tail eliminator, elimineert geluid aan het einde van een transmissie
1. `RP STE` - repeater squelch tail eliminator
1. `1 Call`- kanaal voor snel schakelen tussen kanalen; hiermee kunt u snel naar dat kanaal overschakelen met de`9 Call`-knop.
1. `UPCode` - DTMF-code die aan het begin van de transmissie wordt verzonden
1. `DWCode` - DTMF-code die aan het einde van een transmissie wordt verzonden
1. `PTT ID`- bepaalt of`UPCode`en/of`DWCode` moeten worden verzonden
1. `D ST` - DTMF-zijtoonschakelaar; hiermee kunt u verzonden tonen via de luidspreker van de radio horen.
1. `D Prel` - DTMF-voorlaadtijd
1. `D Live` - geeft de via de radio ontvangen DTMF-codes in het midden van het scherm weer.
1. `VOX` - spraakgestuurd TX-gevoeligheidsniveau
1. `SysInf`- systeeminformatie. In de huidige F4HWN-builds is dit item gepagineerd: open het met`M`en gebruik vervolgens`UP`/`DOWN` om tussen pagina's te navigeren.
   * identiteit: auteur, versie en editie van de firmware
   * `BUILD`: bouwdatum, bouwtijd en commit-identificatie
   * `BATTERY`: gemeten accuspanning, geschat accupercentage en geselecteerd accutype/profiel
   * `MEMORY`: FLASH- en SRAM-gebruik, wanneer de geheugenpagina is ingeschakeld in de build
   * `CODE`/`WIKI`: QR-codes voor projectlinks, wanneer QR-codepagina's zijn ingeschakeld in de build
1. `RxMode` - stelt in hoe de boven- en onderfrequentie worden gebruikt.
   * ALLEEN HOOFDFREQUENTIE - zendt en luistert altijd op de hoofdfrequentie ( `MO` )
   * DUAL RX RESPOND - luistert naar beide frequenties; als er een signaal wordt ontvangen op de secundaire frequentie, vergrendelt het apparaat zich daar een paar seconden op, zodat u het gesprek kunt beantwoorden ( `DWR` )
   * CROSSBAND - zendt altijd uit op de primaire frequentie en luistert op de secundaire frequentie ( `XB` )
   * MAIN TX DUAL RX - zendt altijd uit op de primaire zender, luistert naar beide ( `DW` )
1. `Sql` - squelch-gevoeligheidsniveau
1. `SetPwr` - stelt het gebruikersvermogen in
   * LAAG 1 (< ~20 mW)
   * LAAG 2 (~125 mW)
   * LAAG 3 (~250 mW)
   * LAAG 4 (~500 mW, bovengrens onder de PMR-band...)
   * LAAG 5 (~1 W)
   * MID (~2 W)
   * HOOG (~5 W)
1. `SetPTT` - stelt het PTT-gebruik in
   * KLASSIEK
   * ONEPUSH
1. `SetTOT` - stelt TOT-waarschuwing in
   * UIT
   * GELUID
   * VISUEEL
   * ALLES (_BEELD + GELUID_)
1. `SetEOT` - stelt een EOT-waarschuwing in (handig voor pauzes tussen 2 transmissies)
   * UIT
   * GELUID
   * VISUEEL
   * ALLES (_BEELD + GELUID_)
1. `SetCtr` - stelt het LCD-contrast in
1. `SetInv` - zet het LCD-scherm om (het beste voor nachtzicht)
1. `SetLck` - selecteert wat is uitgeschakeld terwijl de toetsenbordvergrendeling actief is
   * `KEYS`: vergrendel het voorste toetsenbord; programmeerbare sneltoetsacties en `PTT` blijven beschikbaar
   * `KEYS + ACTIONS`: vergrendelt ook de programmeerbare acties die zijn toegewezen aan de twee zijknoppen en `M Long`; `PTT` blijft beschikbaar
   * `KEYS + PTT`: vergrendel ook `PTT` om onbedoelde verzending te voorkomen; programmeerbare sneltoetsacties blijven beschikbaar
   * `KEYS + ACTIONS + PTT`: vergrendel het voorste toetsenbord, programmeerbare sneltoetsacties en `PTT`

In elke modus kunt u de radio ontgrendelen door `F #` lang ingedrukt te houden. Zie [Knopfuncties](./Button-functions#keypad-lock-and-setlck) voor meer informatie.
1. `SetMet` - sets S-meter design
   * KLASSIEK
   * KLEIN (zoals bijvoorbeeld bij de Yaesu FT4 of FT-65)
1. `SetGUI` - stelt GUI-ontwerp in
   * KLASSIEK (groter lettertype, minder informatie weergegeven)
   * KLEIN (kleiner lettertype, meer informatie weergegeven)
1. `SetRxA` – stelt het RX-audioprofiel in voor de huidige modulatie

`FM` profielen:

   - `FLAT`: Laagste uitgangsversterking (BK4829-veilig). Meest neutraal, het meest geschikt voor stille omgevingen.
   - `CLEAN`: Standaard gebalanceerd profiel. Comfortabele audio met gemiddelde versterking.
   - `MID`: Hogere versterking dan CLEAN zonder de agressiviteit van BOOST.
   - `BOOST`: Stemgericht profiel voor zwakke signalen / lawaaierige omgevingen. Hogere versterking, meer "aanwezig" geluid.
   - `MAX`: Maximale uitgangsversterking (kan vervorming veroorzaken bij sterke signalen of kleine luidsprekers). Het meest geschikt voor een externe luidspreker.

`AM` profielen:

   - `SHARP`: Smal IF-filter met lage versterking. Meer selectief, met betere onderdrukking van aangrenzende kanalen. Het kan wat scherper of enigszins vervormd klinken bij sterke signalen, maar het blijft helder.
   - `STOCK`: Bedoeld om het gedrag van de standaardfirmware zo dicht mogelijk te benaderen.
   - `OPEN`: Breder IF-filter met hogere versterking. Opener en aangenamer bij zwakke signalen, maar sommige ontvangsten kunnen wat gedempt klinken, vooral ATC.
1. `SetTmr` - bepaalt of de RX- en TX-timers worden weergegeven
1. `SetOff` - stelt de vertraging in voordat de transceiver in de diepe slaapstand gaat (UIT of 1 minuut tot 2 uur)
1. `SetNFM` - stelt Narrow FM in op Narrow of Narrower
1. `SetVol` - stelt de audiovolumeversterking in om de luidsprekeruitvoer nauwkeurig af te stellen.
1. `SetKey` - stelt de toets in om de RescueOps-modus te activeren bij het opstarten van de transceiver.
1. `SetScn` - stelt de [scan engine-modus](./Scanning#scan-engine-mode-normal-vs-fast) in.
   * `NORMAL`: gebruikt het standaard scanpad.
   * `FAST`: maakt gebruik van het nieuwere, snelle scanpad. De firmware controleert vooraf verschillende frequenties/kanalen met RSSI voordat de volledige ontvangstconfiguratie wordt uitgevoerd, slaat stille batches sneller over, verfijnt potentiële kandidaten in kleine stappen en gebruikt een kleine watchdog om het proces te hervatten als de scanlus vastloopt.
1. `SetSav` - stelt de [screensaver](./Radio-operation#screen-saver-and-backlight-timeout) in die wordt gebruikt na de time-out van de achtergrondverlichting, indien ingeschakeld in de build.
   * `OFF`: geen schermbeveiliging
   * `LOGO`: toon het aangepaste opstartlogo als inactief scherm
   * `LOGO+`: toon het aangepaste opstartlogo met een scrolleffect
   * `MATRIX`: toon een geanimeerd inactief scherm in matrixstijl

`SetSav`is alleen actief wanneer`BLTime` een getimede achtergrondverlichtingsduur gebruikt. Het is uitgeschakeld tijdens RX, TX, PTT, BEAM en actief FM-scannen.
1. `SetCfg`- selecteert de configuratiebank die wordt gebruikt door de actieve firmware in Multiboot-compatibele`v6.0.0`-builds.
   * `CFG M`: Hoofdconfiguratiebank
   * `CFG 1`tot`CFG 4`: configuratiebanken gekoppeld aan firmware-slots 1 tot 4

Druk tweemaal op `M` om een andere bank te bevestigen. De radio wordt opnieuw opgestart, zodat de bank wordt toegewezen voordat kanalen of instellingen worden geladen. De firmware-sleuf verandert niet. Het bevestigen van de reeds in gebruik zijnde bank heeft geen effect. Zie [Multiboot en Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Verborgen menu

Het verborgen menu wordt geactiveerd door `PTT`+`SIDE BUTTON 1️⃣` ingedrukt te houden terwijl u de radio aanzet, en vervolgens alle toetsen los te laten.

73. `F Lock` - stelt het TX-frequentiebandplan in.
    * DEFAULT+ (137-174, 400-470) - maakt zenden op de standaardbanden mogelijk, plus de opties `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * DISABLE ALL - schakelt zenden op alle frequenties uit
    * ONTGRENDELEN ALLES - maakt zenden op alle banden mogelijk. Het heeft een extra vergrendeling; zie [hoe je die inschakelt](./Advanced-features#tx-on-all-bands).
74. `350 En`- maakt RX mogelijk op`350 MHz`
75. `BatCal` - Accuspanningskalibratie. Vergelijk de weergegeven spanning met een multimeter en stel deze zo af dat ze zo goed mogelijk overeenkomen.
76. `BatTyp`- batterijtype / ontladingscurve gebruikt voor de berekening van het batterijpercentage. Dit beïnvloedt`%`, niet de gemeten spanning zelf.
77. `SetNav` - configureert het navigatietype (OMHOOG/OMLAAG voor UV-K5, LINKS/RECHTS voor UV-K1)
78. `Reset` - reset de radio-configuratie-instellingen
   * VFO - verwijdert alleen kanaalinstellingen
   * ALL - reset alles (kanaal- en radio-instellingen)

Op het gecategoriseerde menuscherm verschijnen deze zes items in de categorie `Service`. Ze worden ook toegevoegd aan `All`, waar een Multiboot-compatibele `v6.0.0`-build doorloopt tot en met `78/78`. Op `v5.9.0`, die geen `SetCfg`heeft, behouden de verborgen items de nummers`72`tot en met`77`.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [UV Studio](./UV-Studio)
* [Radiobediening](./Radio-operation)
* [Scannen](./Scanning)
* [Knopfuncties](./Button-functions)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [Geavanceerde functies](./Advanced-features)
* [Probleemoplossing](./Troubleshooting)
