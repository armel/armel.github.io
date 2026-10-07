> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Multiboot-and-Multiconfig/).

# Multiboot en Multiconfig

Vanaf `v6.0.0` kunnen compatibele edities meerdere F4HWN-firmware-images in het externe flashgeheugen van de radio bewaren en er bij het opstarten één uit een selector herstellen. Elk firmware-slot heeft standaard zijn eigen configuratiebank, waardoor het proberen van een andere editie de kanalen en instellingen van de andere slots niet overschrijft.

Multiboot is inbegrepen in de vier officiële `v6.0.0`-edities: `Fusion`, `FieldOps`, `Transfer`en`Labs`. Firmware-slots worden beheerd met [UV Studio](./UV-Studio#firmware-slots) terwijl de radio normaal functioneert.

> [!IMPORTANT]
> Plaats alleen een `v6.0.0`of nieuwere F4HWN-image met Multiboot-ondersteuning in een firmware-slot. Een`v5.x`, standaardfirmware of andere firmware zonder Multiboot-ondersteuning kan na herstel wel worden uitgevoerd, maar kan de opstartselector niet openen om terug te keren naar een ander slot.

## Firmware-slots

De radio bewaart vijf Multiboot-ingangen:

| Radiolabel | Doel | Beheerd door |
| --- | --- | --- |
| `M`|`Main`, een automatische back-up van de firmware die is geïnstalleerd via de normale flashprocedure | firmware |
| `1`tot`4` | extra F4HWN-firmware-images | UV Studio |

`Main`is beschermd tegen schrijfbewerkingen door de host. Bij de eerste opstart van een Multiboot-compatibele firmware die is geïnstalleerd via de normale`Flash Firmware`-procedure, geeft de radio `Init Main`weer en kopieert de actieve firmware naar`M`. Schakel de radio niet uit tijdens deze initialisatie.

De vier gebruikerssleuven bevinden zich alleen in het externe flashgeheugen totdat ze worden geselecteerd. Het installeren of wissen van een sleuf in UV Studio vervangt niet direct de firmware die momenteel in het interne flashgeheugen draait.

## Firmware installeren in een slot

1. Start de radio normaal op met een firmware die Multiboot ondersteunt.
1. Verbind het apparaat met een desktopbrowser die een ondersteunde USB-dataverbinding heeft.
1. Open [UV Studio](https://armel.github.io/uvstudio/) en selecteer `Firmware Slots`.
1. Selecteer een compatibele stabiele `v6.x`F4HWN-build uit de catalogus, of kies een compatibel lokaal`.bin`-bestand.
1. Kies slot `1`, `2`, `3`of`4` en bewerk eventueel de weergavenaam.
1. Selecteer `Write to slot`, bevestig en wacht tot de wis-, schrijf- en verificatiestappen zijn voltooid.

Elk slot accepteert een applicatie-image tot `118 KiB`. UV Studio schrijft de image naar extern flashgeheugen, slaat de grootte en CRC op en vraagt vervolgens de radio om de complete image te verifiëren.

`Erase FW` verwijdert de externe firmware-image uit dat gebruikersslot. Het wist de configuratiebank van het slot niet en heeft geen invloed op een kopie van die firmware die al in het interne flashgeheugen draait.

## Firmware selecteren bij het opstarten

1. Zet de radio uit.
1. Houd `M`(`MENU`) ingedrukt terwijl u de radio inschakelt. Houd`PTT` niet ingedrukt.
1. Laat de toets los wanneer het scherm `F4HWN MULTIBOOT` verschijnt.
1. Wacht terwijl de radio de beschikbare plaatsen scant en valideert.
1. Gebruik `UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT`op UV-K1, om`M`te selecteren of`1`tot en met`4`te plaatsen. De actieve lay-out volgt op`SetNav`.
1. Druk op `M`om het te selecteren en druk vervolgens nogmaals op`M`op`Restore...?` om te bevestigen.
1. Schakel de radio niet uit tijdens `Writing / Verify`. De radio start automatisch opnieuw op met de geselecteerde firmware.

Druk op `EXIT` in de lijst met slots om te annuleren en door te gaan met het opstarten van de reeds geïnstalleerde firmware. Ongeldige, onvolledige, te grote of CRC-foutieve slots worden weergegeven, maar kunnen niet worden hersteld.

De selector markeert in eerste instantie het slot waaruit de actieve firmware afkomstig is. Dit wordt ook weergegeven in UV Studio, indien die ondersteuning beschikbaar is.

## Multiconfig: één configuratiebank per slot

Standaard selecteert het selecteren van firmware-slot `N`ook configuratiebank`N`:

| Firmware | Standaardconfiguratie | Inhoud die in die bank wordt bewaard |
| --- | --- | --- |
| `Main`(`M`) |`CFG M` | geheugenkanalen, namen, VFO's, scanlijsten en radio-instellingen |
| slot `1`|`CFG 1` | een eigen kopie van dezelfde configuratiegebieden |
| slot `2`|`CFG 2` | een eigen kopie van dezelfde configuratiegebieden |
| slot `3`|`CFG 3` | een eigen kopie van dezelfde configuratiegebieden |
| slot `4`|`CFG 4` | een eigen kopie van dezelfde configuratiegebieden |

Kalibratiegegevens, het opstartlogo, Multiboot-metadata, firmware-/app-slots en het RF-logboek worden gedeeld in plaats van gedupliceerd in elke geheugenbank.

Een ongebruikte configuratiebank start de eerste keer dat deze wordt gebruikt met de fabrieksinstellingen. Deze scheiding is handig wanneer edities verschillende instellingen hebben of wanneer u een firmware wilt testen zonder de normale `Main`-configuratie te wijzigen.

## SetCfg gebruiken

Met het menu `SetCfg`kan de actieve firmware een andere configuratiebank gebruiken zonder de firmware te wijzigen.`SLOT 2 / CFG 4` betekent bijvoorbeeld dat de firmware die is hersteld vanuit slot 2 momenteel de kanalen en instellingen gebruikt die zijn opgeslagen in bank 4.

1. Open het normale menu en selecteer `SetCfg`.
1. Kies `CFG M`,`CFG 1`,`CFG 2`,`CFG 3`, of`CFG 4`.
1. Druk op `M`en druk vervolgens nogmaals op`M`bij`SURE?`.
1. De radio start opnieuw op en koppelt de geselecteerde bank.

Het bevestigen van de reeds in gebruik zijnde bank heeft geen effect en herstart de radio niet. De `SysInf`-identificatiepagina toont aparte `SLOT`- en `CFG`-badges, zodat u altijd de huidige combinatie kunt controleren.

> [!CAUTION]
> `SetCfg` staat bewust toe dat configuraties worden gedeeld tussen firmware-edities en -versies. Compatibiliteit is uw verantwoordelijkheid. Maak een back-up van belangrijke kanaal-/instellingengegevens voordat u een bank opent met firmware die mogelijk een andere gegevensindeling gebruikt.

In UV Studio wist `Reset config`de configuratiebank die is gekoppeld aan gebruikersslot`1`tot`4`zonder de firmware te wissen. Bij de volgende opstart met die bank worden de standaardinstellingen hersteld.`CFG M` is beschermd tegen deze opdracht; gebruik de normale fabrieksresetprocedure van de firmware voor de hoofdconfiguratie.

## Herstel- en veiligheidsinstructies

* Elk slot wordt volledig CRC-gecontroleerd voordat het interne flashgeheugen wordt gewist.
* De actieve slot-/configuratiestatus wordt redundant opgeslagen en geverifieerd voordat een herstelproces begint.
* `DO NOT POWER OFF` betekent dat het interne flashgeheugen wordt overschreven. Het onderbreken van deze fase kan ertoe leiden dat de applicatie niet meer opstart en dat een normale DFU-herstelprocedure nodig is.
* Als een normale firmware-flash de interne image vervangt, detecteert de volgende Multiboot-compatibele opstart de wijziging en neemt die image over als de nieuwe `Main`back-up met`CFG M`.
* Als de radio `STATE ERROR`of`Flash state unknown` meldt, start hem dan opnieuw op. De firmware stopt daar bewust om te voorkomen dat er via een onzekere configuratie-mapping wordt geschreven.

## Gerelateerde pagina's

* [UV Studio](./UV-Studio#firmware-slots)
* [Recente wijzigingen](./Recent-changes)
* [Menu](./Menu)
* [Overlay-apps](./Overlay-apps)
* [Probleemoplossing](./Troubleshooting)
