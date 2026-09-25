> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/FM-broadcast-radio-receiver/).

# FM-radio-ontvanger

De radio kan FM-uitzendingen ontvangen van `76`tot`108 MHz`. Hiervoor gebruikt hij een aparte chip (`BK1080`). RDS wordt niet ondersteund.

_Tijdens normaal luisteren naar de radio-uitzending heeft de actieve VFO nog steeds prioriteit. Ontvangst op de actieve VFO schakelt tijdelijk het radiogeluid uit; na afloop van de VFO-ontvangst schakelt de radio terug naar de radio-uitzending. Zolang een handmatige of automatische FM-zenderscan actief is, negeert `v5.9.0` tijdelijk de ontvangst op het hoofdkanaal, zodat de zenderscan ongestoord kan worden voltooid._

> [!NOTE]
> Waar op deze pagina `UP`/`DOWN`wordt vermeld, gebruik dan de overeenkomstige toetsen`LEFT`/`RIGHT`op de UV-K1. De actieve navigatie-indeling volgt`SetNav`.

> [!NOTE]
> - De actieve VFO heeft prioriteit tijdens normaal luisteren naar radio-uitzendingen, maar niet tijdens een actieve FM-zenderscan
> - Automatische scan overschrijft alle `48` FM-geheugens

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Basisbewerkingen

* `F`+`0 FM`, lang indrukken van `0 FM`, of een [aangepaste knopfunctie](./Button-functions#custom-button-functions) start de uitzending
* `EXIT`, of door hetzelfde startcommando opnieuw te gebruiken terwijl de radio in FM-modus staat, wordt de ontvangst van de uitzending beëindigd.
* Door `F`+`3 VFO/MR`in te drukken, of door`3 VFO/MR` lang ingedrukt te houden, schakelt u tussen de VFO-modus en de geheugenmodus.

### Stel een frequentie in in de FM-VFO-modus

Door simpelweg een frequentie in te typen, stemt u de ontvanger af. De resolutie is `100 kHz`, dus door `929`in te voeren, stemt u af op`92.9 MHz`. Gebruik de pijltjestoetsen om in stappen van `100 kHz` te wijzigen.

### Wijzig het FM-zendbereik

Als u het gewenste station niet kunt ontvangen, bevindt u zich mogelijk in het verkeerde FM-zendbereik.

Houd `1 BAND` ingedrukt terwijl de FM-ontvangst actief is om door de beschikbare FM-frequenties te bladeren:

* `87.5`tot`108 MHz`
* `76`tot`108 MHz`
* `76`tot`90 MHz`
* `64`tot`76 MHz`

Het momenteel geselecteerde bereik wordt linksonder op het FM-scherm weergegeven, bijvoorbeeld `87.5-108M`.

Direct afstemmen, handmatig scannen, automatisch scannen en FM-geheugens werken alleen binnen het momenteel geselecteerde bereik. Als een zender of opgeslagen FM-geheugen zich buiten dat bereik bevindt, schakel dan eerst over naar een andere FM-band.

### Opslaan in het geheugen vanuit de FM-VFO-modus

Door in de VFO-modus op `M`te drukken, kunt u de huidige frequentie in een geheugenkanaal opslaan. Gebruik de pijltjestoetsen om het geheugen te selecteren en bevestig vervolgens met`M`. Er zijn `48` geheugens beschikbaar.

### Selecteer een geheugen

In de MR-modus selecteert u een geheugenkanaal door `01`tot`48`in te voeren. Gebruik`UP`/`DOWN` om door de geheugenkanalen te bladeren.

### Een opgeslagen geheugen verwijderen

In de MR-modus kunt u door op `M` te drukken dat geheugenkanaal verwijderen.

## Zenders scannen van FM-VFO

### Automatische scan

Begin met `F`+`* Scan`of door`* Scan` lang ingedrukt te houden.
De radio scant naar zenders en slaat de eerste `48`zenders op in het geheugen. Het scannen begint aan de lage kant van de band. Bij het starten van de automatische scan worden eerder opgeslagen kanalen verwijderd.`EXIT` beëindigt de automatische scan.

Tijdens het automatisch scannen onderbreekt een inkomend signaal op het hoofdzendontvangerkanaal de FM-scan niet. De normale prioriteit van het hoofdkanaal wordt hersteld zodra het FM-scannen stopt.

### Handmatige scan

Een korte druk op `* Scan`start de handmatige scan. De radio scant omhoog vanaf de huidige frequentie totdat een station is ontvangen. U kunt in beide richtingen verder scannen met de pijltjestoetsen.`EXIT` stopt de scanmodus.

Dezelfde tijdelijke uitzondering voor het hoofdkanaal geldt ook tijdens handmatig scannen. Zodra het scannen stopt op een station of wordt geannuleerd, gaat het gewone luisteren naar de radio weer over naar ontvangst via de actieve VFO.

## Knopfuncties

* `1 BAND` - lang indrukken, schakel tussen FM-zendbereiken
* `3 VFO/MR` - schakelfrequentie/geheugenmodus
* `* SCAN`
   * kort indrukken - start enkelvoudige scan
   * Lang indrukken - start automatisch scannen (alle geheugenkanalen worden gewist en vervangen door het scanresultaat)

## Gerelateerde pagina's

* [Aan de slag](./Getting-started)
* [Knopfuncties](./Button-functions)
* [Radiobediening](./Radio-operation)
* [Probleemoplossing](./Troubleshooting)
