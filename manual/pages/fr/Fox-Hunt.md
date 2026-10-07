# FoxHunt

FoxHunt est une application de réception uniquement pour la force du signal pour la radiogoniométrie amateur (ARDF). Il aide l'opérateur à approcher un émetteur caché en affichant le `dBm` calibré, le S-mètre, le pic, le minimum, la tendance et l'historique récent du signal.

Puisque `v6.0.0`, FoxHunt et [Beacon](./Beacon) sont des applications distinctes et des actions programmables distinctes. FoxHunt ne transmet pas et ne bascule pas sur Beacon.

FoxHunt réside dans l'édition `FieldOps`. Dans `Labs`, installez l'application overlay `FoxHunt` avec [UV Studio](./UV-Studio#apps-labs). Le raccourci `FOX HUNT` lance l'application résidente ou l'application overlay installée correspondante, selon l'édition.

## Démarrage de FoxHunt

Attribuez `FOX HUNT` à `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`, puis déclenchez ce raccourci sur le VFO que vous souhaitez surveiller. Dans Labs, vous pouvez également lancer `FoxHunt` à partir du sélecteur d'application `F + 7`.

> [!NOTE]
> La navigation utilise `UP` / `DOWN` sur UV-K5 et `LEFT` / `RIGHT` sur UV-K1. La présentation active suit `SetNav`.

## Affichage et commandes

L'échelle du signal va de `S0` à `S9+40`. La jauge principale peut afficher soit un escalier de 13 niveaux, soit un historique de défilement d'environ 18 secondes. La tendance compare le signal actuel au niveau mesuré environ une seconde plus tôt.

![FoxHunt écran de force du signal](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Contrôle | Actions |
| --- | --- |
| `1` | Basculer les affichages de l'escalier et de l'historique des signaux |
| `2` | Cycle silencieux, bip de style Geiger et audio de la station reçue |
| `3` | Cycles `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` et `BYP+` |
| touches de navigation | Augmenter ou diminuer l'atténuation directement |
| `F`, puis `2` ou `3` | Reculez le paramètre correspondant |
| `M` | Réinitialiser les références de pic, de minimum et de tendance |
| maintenez `F` pendant environ 0,5 seconde | Verrouiller ou déverrouiller les commandes FoxHunt |
| `EXIT` | Quitter FoxHunt |

Pendant le verrouillage, seules les touches de navigation pour l'atténuation et un autre appui long sur `F` restent disponibles.

## Conseils de recherche de direction

* Augmentez l'atténuation à mesure que le signal devient fort afin que le compteur reste éloigné de la pleine échelle.
* Réinitialisez les références avec `M` avant chaque comparaison ou scan corporel.
* Tenez la radio contre votre poitrine et faites-la pivoter lentement ; votre corps crée souvent un minimum de signal utile dans la direction opposée à l'émetteur.
* Utilisez le pic (`PK`) et le minimum (`MN`) pour comparer une rotation complète.
* Utilisez le graphique de l'historique pour voir les vallées de signaux et l'indicateur de tendance tout en parcourant un relèvement.

`BYP` et `BYP+` sont des paramètres de gain à courte portée, et non un contournement matériel littéral. La valeur absolue `dBm` affichée change avec le pas de gain, comparez donc les lectures tout en restant sur le même pas.

## Paramètres enregistrés

FoxHunt enregistre son atténuation, sa jauge et son mode audio. Ces paramètres sont restaurés au prochain lancement et sont inclus dans un transfert AirCopy `Settings`. Le verrouillage temporaire de l'application n'est pas enregistré.

## Pages connexes

* [Beacon](./Beacon)
* [Fonctions des boutons](./Button-functions#fox-hunt-action)
* [Applications overlay](./Overlay-apps)
* [Applications overlay](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Fonctionnalités avancées](./Advanced-features)
