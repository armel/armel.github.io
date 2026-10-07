> 🌐 **Vertalen**  
> Automatische vertaling is beschikbaar via Google Translate: [Vertaalde versie openen](https://translate.google.com/translate?sl=auto&u=https://github.com/armel/uv-k1-k5v3-firmware-custom/wiki/Fox-Hunt/).

# Vossenjacht

FoxHunt is een applicatie voor het meten van de signaalsterkte bij amateurradiopeiling (ARDF). Het helpt de operator een verborgen zender te lokaliseren door gekalibreerde `dBm`-waarden, S-meterwaarden, piek- en minimumwaarden, trends en recente signaalgeschiedenis weer te geven.

Aangezien `v6.0.0` FoxHunt en [Beacon](./Beacon) aparte applicaties en aparte programmeerbare acties zijn. FoxHunt zendt niet uit en schakelt niet over naar Beacon.

FoxHunt is standaard aanwezig in de `FieldOps`-editie. In `Labs`installeer je de`FoxHunt`overlay-app met [UV Studio](./UV-Studio#apps-labs). De`FOX HUNT` snelkoppeling start de standaardtoepassing of de bijbehorende geïnstalleerde overlay-app, afhankelijk van de editie.

## FoxHunt starten

Wijs `FOX HUNT`toe aan`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`of`M Long`en activeer vervolgens die sneltoets op de VFO die u wilt bewaken. In Labs kunt u`FoxHunt`ook starten via de app-selector`F + 7`.

> [!NOTE]
> Navigatie maakt gebruik van `UP`/`DOWN`op UV-K5 en`LEFT`/`RIGHT`op UV-K1. De actieve lay-out volgt`SetNav`.

## Weergave en bediening

De signaalschaal loopt van `S0`tot`S9+40`. De hoofdmeter kan een trapvormige weergave met 13 niveaus of een scrollende geschiedenis van ongeveer 18 seconden tonen. De trend vergelijkt het huidige signaal met het niveau dat ongeveer een seconde eerder is gemeten.

![Scherm met signaalsterkte van FoxHunt](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Bediening | Actie |
| --- | --- |
| `1` | Schakel de weergave van de trap en de signaalgeschiedenis in/uit |
| `2` | Wissel tussen stilte, pieptoon (Geiger-stijl) en audio van het ontvangen station |
| `3`| Cyclus`ATT 0`,`ATT 6`,`ATT 15`,`ATT 27`,`BYP`, en`BYP+` |
| navigatietoetsen | Demping direct verhogen of verlagen |
| `F`, vervolgens`2`of`3` | Zet de bijbehorende instelling terug |
| `M` | Referentiepunten voor piek, minimum en trend opnieuw instellen |
| Houd `F` ongeveer 0,5 seconde ingedrukt | Vergrendel of ontgrendel de FoxHunt-bedieningselementen |
| `EXIT` | FoxHunt verlaten |

In vergrendelde toestand blijven alleen de navigatietoetsen voor demping en een volgende lange druk op `F` beschikbaar.

## Tips voor het vinden van de juiste richting

* Verhoog de demping naarmate het signaal sterker wordt, zodat de meter niet de maximale uitslag bereikt.
* Stel de referentiewaarden opnieuw in met `M` vóór elke vergelijking of lichaamsscan.
* Houd de radio tegen uw borst en draai langzaam rond; uw lichaam creëert vaak een bruikbaar signaalminimum in de richting weg van de zender.
* Gebruik de piek ( `PK`) en het minimum (`MN` ) om een volledige rotatie te vergelijken.
* Gebruik de historische grafiek om signaaldalen en de trendindicator te zien tijdens het volgen van een peiling.

`BYP`en`BYP+`zijn instellingen voor versterking op korte afstand, geen letterlijke hardware-bypass. De weergegeven absolute waarde`dBm` verandert met de versterkingsstap, dus vergelijk de metingen terwijl u op dezelfde stap blijft.

## Opgeslagen instellingen

FoxHunt slaat de demping, de meter en de audiomodus op. Deze instellingen worden bij de volgende keer opstarten hersteld en worden meegenomen in een AirCopy `Settings`-overdracht. De tijdelijke applicatievergrendeling wordt niet opgeslagen.

## Gerelateerde pagina's

* [Beacon](./Beacon)
* [Knopfuncties](./Button-functions#fox-hunt-action)
* [Overlay-apps](./Overlay-apps)
* [Overlay-toepassingen](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Geavanceerde functies](./Advanced-features)
