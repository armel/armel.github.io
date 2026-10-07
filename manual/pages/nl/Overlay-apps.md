> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Overlay-apps/).

# Overlay-apps

Overlay-apps zijn kleine `.app`programma's die in extern flashgeheugen worden opgeslagen en pas bij het opstarten in een speciaal`4 KiB`RAM-werkgebied worden geladen. Ze stellen de experimentele`Labs` editie in staat om tools, radiomodi, visuele demo's en games toe te voegen zonder elke app permanent in het interne flashgeheugen van de firmware te hoeven plaatsen.

> [!WARNING]
> Overlay-apps zijn een experimentele functie (`v6.0.0`). Momenteel bevat alleen versie `Labs` de app-loader. Apps zijn gekoppeld aan een firmware-ABI, API-niveau, RAM-adres en optionele residentiële mogelijkheden; update of installeer een app opnieuw als de radio een compatibiliteitsfout meldt.

## Hoe het platform werkt

De radio biedt `8`externe-Flash app-slots. Elk slot bevat een header plus app-code van maximaal`4 KiB`. Voordat een app wordt uitgevoerd, controleert de loader het volgende:

* het app-bestand/headerformaat en de vastgelegde status
* het vereiste ABI- en minimale API-niveau
* de codegrootte en het RAM-linkadres
* de vereiste mogelijkheden van de ingebouwde firmware van de app
* een CRC-32 van de code nadat deze in het RAM-geheugen is geladen

De interne firmware (Flash) wordt nooit overschreven wanneer een app wordt geïnstalleerd, gestart of verwijderd. Een defecte of incompatibele app wordt direct geweigerd in plaats van uitgevoerd.

De huidige catalogus bevat elf apps: radiotools zoals `Broadcast FM`, `FoxHunt`, `Beacon`en`Beam`, plus `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll`en`Space Impact`. Zie [Overlay-toepassingen](./Overlay-applications) voor de gedocumenteerde apps en hun bedieningselementen. De beschikbaarheid is afhankelijk van de app-binaries die worden gedistribueerd voor de geselecteerde firmwareversie en van de mogelijkheden die in de actieve Labs-firmware zijn gecompileerd.

## Een app installeren met UV Studio

1. Start de radio normaal op met de `Labs`-editie.
1. Verbind het apparaat met een desktopbrowser die een ondersteunde USB-dataverbinding heeft.
1. Open [UV Studio](https://armel.github.io/uvstudio/) en selecteer `Apps`(`Labs only` ).
1. Selecteer de firmwareversie en een compatibele app uit de officiële catalogus, of kies een lokaal `.app`-bestand.
1. Kies de gewenste app-sleuf.
1. Selecteer `Install app` en wacht tot het schrijven en de verificatie zijn voltooid.

UV Studio kan de slottabel vernieuwen, de naam, versie, grootte en status van elke app weergeven en een app verwijderen zonder de rest van de radio aan te raken.

De app-slots zijn genummerd van `1`tot`8`in UV Studio en in de launcher op de radio`F + 7`.

## Een app starten

1. Druk vanuit het normale radioscherm op `F`en vervolgens op`7 VOX`.
1. Gebruik `UP`/`DOWN`op UV-K5, of`LEFT`/`RIGHT`op UV-K1, om een van de acht weergegeven sleuven te selecteren. De actieve lay-out volgt`SetNav`.
1. Druk op `M` om de geselecteerde app te starten.
1. Gebruik de bedieningselementen die in die app worden weergegeven; in de meeste apps brengt `EXIT` u terug naar het app-startscherm of het normale radioscherm.

Lege slots blijven zichtbaar in de launcher. Het geselecteerde slot en de scrollpositie worden onthouden totdat de radio opnieuw opstart. De launcher en compatibele apps worden gespiegeld in UV Studio.

Sommige apps kunnen ook een van de normale programmeerbare acties adverteren: `FM RADIO`, `FOX HUNT`, `BEACON`of`BEAM`. Wanneer de bijbehorende app is geïnstalleerd en geldig is, kan die actie direct worden gestart via een toegewezen toets of de actiekiezer aan de zijkant. Als meerdere geïnstalleerde apps dezelfde actie adverteren, wordt de compatibele slot met het laagste nummer gebruikt.

## Compatibiliteitsberichten

| Radioboodschap | Betekenis / actie |
| --- | --- |
| `UPDATE APP` | Het app-formaat, de ABI, de grootte of het linkadres is verouderd of incompatibel; installeer een overeenkomende app-build |
| `UPDATE FIRMWARE` | De app vereist een nieuwere app-API; update de Labs-firmware |
| `REINSTALL APP`| Het schrijven is onvolledig of de CRC van de code is onjuist; installeer het bestand`.app` opnieuw |
| `NOT SUPPORTED` | De app heeft een ingebouwde functionaliteit nodig die deze Labs-build niet bevat |
| `NO APP` | De geselecteerde sleuf is leeg of heeft geen geldige app-header |

Nadat een app is afgesloten, herstelt de loader de geselecteerde VFO, ontvangst-/dualwatch-afstemming, achtergrondverlichting en externe flashgeheugencache. Apps die ondersteunde gedeelde gegevens wijzigen, zoals FM-voorinstellingen of Beam-kanaalgegevens, vragen de resident firmware om deze wijzigingen door te voeren nadat de overlay-code is gestopt met draaien.

## Apps bouwen vanuit de broncode

Ontwikkelaars kunnen de apps in de firmware-repository bouwen met:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

De gegenereerde `.app`-bestanden worden in `build/Apps/` geplaatst. Elke app wordt gekoppeld aan het geconfigureerde overlay-adres van de firmware en verpakt met de bijbehorende metadata en CRC. Herbouw de apps wanneer de ABI, API, vereiste mogelijkheden of het overlay-adres wijzigen.

## Gerelateerde pagina's

* [Overlay-toepassingen](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [Knopfuncties](./Button-functions)
* [Recente wijzigingen](./Recent-changes)
* [Geavanceerde functies](./Advanced-features)
