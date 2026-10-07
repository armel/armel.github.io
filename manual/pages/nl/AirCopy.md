> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/AirCopy/).

# AirCopy

AirCopy draagt geheugenkanalen en radio-instellingen over tussen compatibele radio's. Het maakt gebruik van FSK via de ether en kan vanaf `v6.1.0` ook gebruikmaken van een directe seriële kabelverbinding.

> [!IMPORTANT]
> AirCopy is inbegrepen in de edities `Transfer`en`Labs`. Het is geen onderdeel van de standaardedities `Fusion`of`FieldOps`.

> [!WARNING]
> AirCopy is niet bedoeld om verschillende firmware-indelingen compatibel te maken. Gebruik dezelfde firmware-generatie op beide radio's en selecteer dezelfde datasectie op de zender en ontvanger. Het geoptimaliseerde `v6.1.0`-protocol is niet compatibel met eerdere AirCopy-versies.

## AirCopy starten

1. Zet de radio uit.
1. Houd `PTT`+`SIDE BUTTON 2️⃣` ingedrukt tijdens het inschakelen.
1. Laat alle toetsen los zodra het AirCopy-scherm verschijnt.

De standaard frequentie voor uitzendingen via de ether is `434.000 MHz` met een zeer laag vermogen. U kunt een andere toegestane frequentie invoeren via het toetsenbord voordat u de overdracht start.

Gebruik de navigatietoetsen om hetzelfde gedeelte op beide radio's te selecteren:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Begin vervolgens met het doel vóór de bron:

1. Druk op de ontvangende radio op `EXIT`.
1. Druk op de zendradio op `M`.
1. Wacht tot `AIR COPY OK` op beide radio's verschijnt.

Elke geheugenselectie draagt `128`kanalen over, inclusief kanaalnamen en -kenmerken.`Settings`bevat radio-instellingen, namen van scanlijsten, het VFO-gebied dat wordt gebruikt door`ScnRng`, de `MIX`scanlijstselectie en de opgeslagen FoxHunt- en Beacon-voorkeuren.`All (Mem+Set)` draagt alle acht geheugenbanken en instellingen in één keer over.

![AirCopy-overdrachtsscherm](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Betrouwbaar protocol in v6.0.0

`v6.0.0` introduceerde een erkend overdrachtsprotocol:

* De ontvanger valideert de framing, offset en CRC voordat de gegevens worden opgeslagen.
* De ontvanger bevestigt geldige gegevens en verwerpt beschadigde of onverwachte gegevens.
* De afzender probeert een niet-bevestigd of afgewezen pakket maximaal drie keer opnieuw te verzenden.
* Dubbele gegevens worden bevestigd zonder twee keer te worden weggeschreven, waardoor een verloren bevestiging veilig kan worden hersteld.
* Het scherm toont de voortgang, het aantal herhaalpogingen (`RT`) en het aantal ontvangstfouten (`ER`).

Een geheugenbank bevat `68`AirCopy-blokken van`64 bytes`; `Settings`bevat`12`-blokken. Omdat de ontvanger bevestigingen verstuurt, zenden beide radio's kortstondig uit op de geselecteerde frequentie.

## Verbeteringen in v6.1.0

### Snellere radioverbindingen

Het nieuwe protocol kan tot drie `64-byte`-blokken in één FSK-dataframe verzenden. Dit vermindert de overhead voor de vaste doorlooptijd en bevestiging en maakt een volledige overdracht ongeveer twee keer zo snel onder vergelijkbare radioomstandigheden.

Voordat de gegevens worden verzonden, levert de bron CRC32-hashes voor groepen van maximaal `24` blokken. De ontvanger vergelijkt deze hashes met zijn lokale gegevens en vraagt alleen de blokken op die verschillen. Het herhalen van een back-up of het synchroniseren van twee vrijwel identieke radio's kan daarom veel sneller zijn dan het opnieuw kopiëren van elk blok.

De voortgangsindicator onderscheidt gegevens die al identiek waren van gegevens die daadwerkelijk zijn gekopieerd. Het protocol valideert ook of de zender en ontvanger dezelfde logische gegevenssectie hebben geselecteerd; een mismatch leidt tot een fout in plaats van dat er per ongeluk een andere kaart wordt geschreven.

### Kabelkopie

De `Transfer`-editie voegt `CABLE COPY`toe via UART. Druk op het gereed-scherm op`* SCAN` om te schakelen tussen radio- en kabeltransport. De kabelmodus gebruikt dezelfde vergelijkings-, bevestigings-, herhaal- en selectiecontroles als de radiomodus, maar gebruikt geen RF-frequentie.

De implementatie verhoogt de seriële snelheid voor de overdracht en herstelt deze daarna naar de normale snelheid. Beide radio's moeten dezelfde firmware voor kabelkopiëren gebruiken en een compatibele directe seriële verbinding hebben.

### Extern flashgeheugen klonen

Wanneer `CABLE COPY`actief is in de`Transfer`-editie, kan een extra selectie `Flash 2M`het externe Flash-geheugen van de radio klonen. Het vergelijkt`4 KiB`-sectoren op basis van CRC32 en schrijft alleen de verschillende sectoren. De apparaatspecifieke kalibratiesector wordt bewust weggelaten.

> [!WARNING]
> Bij het klonen van extern flashgeheugen kunnen firmware-slots, configuratiebanken, apps, logboeken, logo's en andere gedeelde gegevens op de ontvangende radio worden vervangen. Maak eerst een back-up van belangrijke gegevens, controleer de richting zorgvuldig en koppel geen van beide radio's los en schakel ze niet uit tijdens de bewerking.

## Probleemoplossing

Als een overdracht mislukt:

* Controleer of beide radio's dezelfde compatibele firmwareversie gebruiken.
* Controleer of beide radio's dezelfde selectie en transportfunctie weergeven.
* Start de ontvangst met `EXIT`voordat u de verzending start met`M`
* Bij radiotransmissie: verklein de afstand of ga weg van de storingsbron.
* Controleer bij kabeloverdracht de directe seriële verbinding en sluit beide radio's opnieuw aan.
* Probeer het opnieuw zonder de selectie te wijzigen

## Gerelateerde pagina's

* [Recente wijzigingen](./Recent-changes)
* [Geavanceerde functies](./Advanced-features)
* [Scannen](./Scanning)
* [Multiboot en Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Probleemoplossing](./Troubleshooting)
