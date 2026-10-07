> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Programming-with-CHIRP/).

# Programmeren met CHIRP

Op deze pagina wordt uitgelegd hoe u `CHIRP` kunt gebruiken met het bijbehorende stuurprogramma dat bij elke firmware-release wordt meegeleverd.

> [!WARNING]
> Gebruik het `CHIRP`-stuurprogramma van dezelfde firmwareversie als die op uw radio is geïnstalleerd.
> Gebruik Quansheng CPS niet.
> Gebruik geen generieke `UV-K5`-driver of een driver van een andere firmwareversie.

## Compatibiliteit

De speciale `v6.1.0`-driver ondersteunt elke officiële `v6.1.0`-editie op:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`,`FieldOps`,`Transfer`, en`Labs`

Het is niet bedoeld voor:

* `UV-K5 V1 / V2`
* andere Quansheng-modellen
* niet-gerelateerde firmwarefamilies

Omdat deze firmware een eigen geheugen- en instellingenindeling gebruikt, kan een andere driver onjuiste gegevens lezen of schrijven. Zorg er daarom altijd voor dat de driverversie overeenkomt met de firmwareversie, zelfs bij het wisselen tussen officiële edities.

Ga er niet vanuit dat de oudere `v6.0.0`-driver uitwisselbaar is met de `v6.1.0`-driver.

## Voordat je begint

* Zorg ervoor dat de radio de bijbehorende F4HWN-release gebruikt.
* Zoek het meegeleverde stuurprogramma in dat releasepakket
* Zorg ervoor dat u een back-up van de radio-afbeelding maakt voordat u iets bewerkt.

> [!NOTE]
> `CHIRP` kan deze driver als experimenteel weergeven. Dat is te verwachten.

## Upgraden naar v6.1.0

Voordat u een update uitvoert vanaf een eerdere firmwareversie:

1. Download het radiostuurprogramma dat overeenkomt met de momenteel geïnstalleerde firmware.
1. Sla de afbeelding op en exporteer desgewenst de geheugenkanalen naar een CSV-bestand.
1. Maak een back-up van de radiokalibratie met [UV Studio](./UV-Studio#calibration).
1. Flits de gekozen `v6.1.0`-editie.
1. Indien vereist door de versie waarvan u migreert, opent u het verborgen menu en voert u `RESET ALL` uit.
1. Laad het speciale `v6.1.0` CHIRP-stuurprogramma en download een nieuwe image van de bijgewerkte radio.
1. Kopieer en plak de oude kanalen in de nieuwe afbeelding en upload deze vervolgens.

> [!WARNING]
> Importeer geen oud CSV-bestand rechtstreeks over de volledig nieuwe radio-image. Kopieer en plak de kanaalrijen in een nieuw gedownloade image, zodat de instellingenindeling van de nieuwe versie intact blijft.

## Laad het speciale stuurprogramma in CHIRP

1. Open `CHIRP`.
2. Als `File > Load Module...`niet beschikbaar is, schakel dan eerst de CHIRP-functies`Help > Developer Mode`in (Help-menu) en start vervolgens`CHIRP` opnieuw op.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Gebruik `File > Load Module...`en selecteer het bestand`f4hwn.fusion.chirp...py` dat bij de firmware-release is meegeleverd.
4. Zodra de module is geladen, zou `CHIRP`de modelvermelding`UV-K1 & UV-K5 V3 (F4HWN Fusion)` moeten aanbieden.

> [!NOTE]
> De bestandsnaam van de module en het CHIRP-modellabel behouden de historische naam `Fusion`. De module `v6.1.0` is desondanks de gedeelde driver voor alle vier officiële edities.

## Downloaden van de radio

1. Zet de radio aan.
1. Sluit de radio aan met een compatibele `USB-C`-kabel of een compatibele programmeerkabel met dubbele jack-aansluiting op de `mic/spkr`-connector.
1. Zorg ervoor dat de connector stevig is aangesloten.
1. Kies in `CHIRP` `Radio > Download From Radio...`
1. Selecteer de juiste seriële poort.
1. Selecteer `Vendor`:`Quansheng`.
1. Selecteer `Model`:`UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Start de download en wacht tot het radiobeeld volledig is ingelezen.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Als de communicatie mislukt, koppel dan de kabel los, zet eerst de radio aan en sluit de kabel vervolgens weer aan. Het bijbehorende stuurprogramma waarschuwt dat sommige installaties mogelijk niet werken als de radio is ingeschakeld terwijl de kabel al was aangesloten.

## Toon de extra velden

Na het downloaden kunt u `View > Show Extra Fields`inschakelen in`CHIRP` (menu Weergave).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Dit is belangrijk omdat de speciale driver via de groep `Extra`verschillende kanaalspecifieke velden beschikbaar maakt. Zonder`Show Extra Fields` blijven sommige firmware-specifieke parameters verborgen in de kanaaleditor.

Typische voorbeelden zijn:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Bewerken en uploaden

Je kunt vervolgens herinneringen, namen en de ondersteunde instellingen bewerken.

Wanneer je er klaar voor bent:

1. Controleer je wijzigingen.
1. Kies in `CHIRP` `Radio > Upload To Radio...`
1. Gebruik dezelfde poort, fabrikant en model.
1. Wacht tot de upload volledig is voltooid voordat u de kabel aanraakt of de radio uitzet.

> [!WARNING]
> Laat kalibratiegerelateerde of geavanceerde items ongemoeid, tenzij u precies weet wat ze doen.

## Identificatie van de baken

De onafhankelijke Beacon-applicatie gebruikt de CHIRP-instelling `Message Line 1`als roepnaam. De speciale driver accepteert in dit veld maximaal`12 characters`.

Wanneer Beacon zendt in de `CALL`-modus, zet de firmware letters om in hoofdletters, behoudt letters, cijfers en `/`, verwijdert niet-ondersteunde tekens en voegt ` MOE`toe. Als het resulterende roepsignaal leeg is, zendt het`MOE` uit.

Na het wijzigen van `Message Line 1`, uploadt u de instellingen naar de radio voordat u Beacon start. Zie [Beacon](./Beacon) voor informatie over zendgedrag en veiligheid.

## Goede praktijk

* Gebruik altijd het stuurprogramma dat bij dezelfde firmwareversie is meegeleverd.
* Download altijd eerst en maak daarna pas een back-up.
* Na een firmware-update moet u de nieuwere drivermodule van die release opnieuw laden.
* Gebruik `CHIRP` voor bulkprogrammering, niet Quansheng CPS

## Als er iets mis lijkt te zijn

Controleer deze punten:

1. De radio is eigenlijk een `UV-K1`of`UV-K5 V3`
1. De radio draait de verwachte F4HWN-versie en -editie.
1. `CHIRP`laadde het stuurprogramma van dezelfde release, niet van een andere`UV-K5` module
1. De kabel is volledig ingevoerd.
1. De geselecteerde seriële poort is de juiste.

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Radiobediening](./Radio-operation)
* [Beacon](./Beacon)
* [Probleemoplossing](./Troubleshooting)
