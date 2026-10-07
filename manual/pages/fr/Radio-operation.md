# Utilisation de la radio

Cette page couvre le fonctionnement quotidien de l'émetteur-récepteur : basculement entre le mode VFO et le mode mémoire, lecture de la barre d'état, compréhension des restrictions du TX et gestion du comportement de veille.

Pour les fonctionnalités liées à la scan, voir [Scanning](./Scanning). Pour la visualisation et la maintenance en direct basées sur un navigateur, voir [UV Studio](./UV-Studio). Pour la copie radio à radio, voir [AirCopy](./AirCopy). Pour RescueOps, le mode de reprise, le jeu intégré et la procédure de déverrouillage TX orientée recherche, voir [Fonctionnalités avancées](./Advanced-features).

> [!WARNING]
> N'utilisez pas Quansheng CPS. Il écrase les paramètres personnalisés.

## Sur cette page

* [Fonctionnement et configuration de base](#basic-operation--configuration)
* [Barre d'état](#status-bar)
* [Affichage, type et calibrage de la batterie](#battery-display-type-and-calibration)
* [À propos des menus `F Lock` et `TXLock`](#about-the-f-lock-and-txlock-menus)
* [Économiseur d'écran et délai d'attente du rétroéclairage](#screen-saver-and-backlight-timeout)
* [À propos du menu SetOff](#about-the-setoff-menu)
* [Salut de tonalité de 1 750 Hz pour l'accès au répéteur](#1750-hz-tone-burst-for-repeater-access)
* [Pages associées](#related-pages)

> [!TIP]
> Vérifications rapides courantes :
> - Quansheng CPS a écrasé les paramètres personnalisés
> - la fréquence est en dehors du plan `F Lock` sélectionné
> - `TXLock` est toujours `ON`
> - `AM` ou `USB` est sélectionné à la place de `FM`
>
> Voir [Dépannage](./Troubleshooting) pour la version courte.

## Fonctionnement et configuration de base

L'affichage de la radio est divisé en un VFO supérieur et un VFO inférieur. Vous pouvez modifier la sélection supérieure/inférieure en appuyant sur `F` + `2 A/B` (ou en appuyant longuement sur `2 A/B`).

Chaque VFO peut fonctionner indépendamment en mode fréquence ou en mode canal. Pour changer de mode, sélectionnez le VFO souhaité et appuyez sur `F` + `3 VFO/MR` (ou appuyez longuement sur `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

Dans `frequency mode`, vous saisissez manuellement la fréquence avec le clavier. Vous pouvez également modifier différentes options pour ce VFO dans le menu (les 13 premières entrées de menu). Une fois le VFO configuré, les paramètres peuvent être enregistrés dans un canal mémoire en accédant au menu `ChSave` et en choisissant le canal mémoire cible.

Dans `channel mode`, vous pouvez basculer entre les canaux de mémoire enregistrés. Les canaux mémoire peuvent être ajoutés manuellement comme mentionné ci-dessus ou programmés à partir d'un ordinateur avec le pilote `CHIRP` fourni avec chaque version du firmware. Voir [Programmation avec CHIRP](./Programming-with-CHIRP) pour le flux de travail dédié F4HWN.

Pour l'analyse de fréquence, l'analyse de mémoire, l'analyse `ScnRng` et l'analyse DCS / CTCSS, voir [Scanning](./Scanning).

## Barre d'état

En haut de l'écran, sur la première ligne, se trouve la barre d'état. Il affiche beaucoup d'informations. Voici quelques exemples :

| Capture d'écran du Quansheng K5 exécutant le firmware F4HWN | Descriptif |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR signifie que RxMode est réglé sur DUAL RX RESPOND, OP signifie que PTT est réglé sur ONEPUSH, l'icône F signifie que la touche `F` a été enfoncée et que vous voyez la tension de la batterie. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS signifie que l'économie d'énergie est activée, DW signifie que RxMode est réglé sur MAIN TX / DUAL RX, VX signifie que VOX est activé, CL signifie que PTT est réglé sur CLASSIC, l'icône de verrouillage signifie que le clavier est verrouillé et que vous voyez la tension de la batterie. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS signifie que l'économie d'énergie est activée, MO signifie que RxMode est réglé sur MAIN UNIQUEMENT, OP signifie que PTT est réglé sur ONEPUSH et vous voyez le pourcentage de batterie. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO signifie que RxMode est réglé sur MAIN UNIQUEMENT, OP signifie que PTT est réglé sur ONEPUSH, l'icône Lumière signifie que le contrôle manuel du rétroéclairage est activé et que vous voyez le pourcentage de batterie. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | La minuterie RX sur la gauche indique combien de temps s'est écoulé depuis que vous avez reçu un signal, OP signifie que PTT est réglé sur ONEPUSH, l'icône lumineuse signifie que le contrôle manuel du rétroéclairage est activé et que vous voyez le pourcentage de batterie. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | Le petit `PMR` en vidéo inverse et `><` signifient que vous scannez actuellement la liste `PMR`, CL signifie que PTT est réglé sur CLASSIC, l'icône Lumière signifie que le contrôle manuel du rétroéclairage est activé et que vous voyez le pourcentage de batterie. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | L'icône `ALL` et `><` signifient que vous balayez actuellement toutes les chaînes répertoriées, OP signifie que PTT est réglé sur ONEPUSH, l'icône Lumière signifie que le contrôle manuel du rétroéclairage est activé et que vous voyez le pourcentage de batterie. |

> [!NOTE]
> À propos de `RxMode`, `MO` signifie PRINCIPAL UNIQUEMENT, `DW` signifie PRINCIPAL TX / DUAL RX, `DWR` signifie DOUBLE RÉPONSE RX et `XB` signifie CROSS BAND.

## Affichage, type et calibrage de la batterie

Le firmware sépare trois éléments différents liés à la batterie :

* la tension de batterie mesurée
* le pourcentage de batterie estimé
* le comportement de veille/économie d'énergie

Pour obtenir des informations sur la batterie à l'écran :

* `BatTxt` ajoute `VOLTAGE` ou `PERCENT` à la barre d'état, ou la masque avec `NONE`
* `SysInf` affiche la tension de batterie corrigée, le pourcentage de batterie estimé et la version du firmware

Pour que le pourcentage de batterie ait un sens, deux éléments de menu cachés sont importants :

* `BatCal` calibre la tension de la batterie affichée
* `BatTyp` sélectionne la courbe de décharge utilisée pour l'estimation du pourcentage de batterie

Différence importante :

* `BatCal` modifie la lecture de tension
* `BatTyp` modifie le calcul du `%`, pas la tension mesurée elle-même

Les choix actuels de `BatTyp` sont :

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Comme pour toute estimation basée sur la tension, le pourcentage de batterie n’est qu’approximatif. Cela dépend du profil de batterie sélectionné, de l'état de la batterie et de la charge actuelle.

### Calibrer la tension de la batterie avec un multimètre

1. Assurez-vous que la radio ne se charge pas via `USB-C`.
1. Laissez la radio rester inactive pendant un moment. Ne calibrez pas pendant la transmission.
1. Mesurez la tension de la batterie avec un multimètre sur les contacts de la batterie à l'arrière de la radio/de la batterie.
1. Ouvrez le menu caché et accédez à `BatCal`.
1. Ajustez `BatCal` jusqu'à ce que la tension affichée par la radio corresponde le plus possible au multimètre.
1. Confirmez avec `M`.

> [!TIP]
> Si la tension est correcte mais que le pourcentage semble toujours erroné, `BatCal` convient probablement et `BatTyp` est le paramètre à vérifier.

## À propos des menus `F Lock` et `TXLock`

Autrefois, il y avait quelques plans de bandes dans le menu `F Lock` pour répondre à diverses demandes : PMR 446, FRS/GMRS/MURS, etc. Cependant, l'ajout de nouvelles options `F Lock` prenait toujours beaucoup de mémoire : nouvelles options dans le menu `F Lock`, stockage des fréquences (pour les spécialistes, ce sont à chaque fois des `uint32_t`, donc très gourmandes en mémoire), etc.

Or, il faut reconnaître qu'il était compliqué, voire impossible, de proposer des forfaits de groupe capables de couvrir et de répondre à toutes les attentes. Il y a trop de variations d'un pays à l'autre. De plus, rien n'est prévu pour combiner plusieurs plans de fréquences du menu `F Lock`. Par exemple, ouvrir les bandes PMR 446 et LPD. En résumé, `F Lock` est trop limité et non évolutif.

Voici la solution :

1. Sélectionnez le plan de bande le plus approprié dans le menu `F Lock`. Par exemple, si vous avez un indicatif et vivez en Europe, sélectionnez CE HAM. Si vous n'avez pas d'indicatif et n'êtes qu'un SWL, sélectionnez DÉSACTIVER TOUT, ce qui est plus sûr.
1. Si vous souhaitez toujours transmettre sur un canal mémoire qui n'est pas ouvert par le plan de bande, allez dans le menu `TXLock` et choisissez `OFF`. Cela crée une exception et autorise la transmission sur ce canal.

En un mot :

* si la fréquence se trouve dans le plan de bande sélectionné dans `F Lock`, vous pouvez transmettre
* si la fréquence est en dehors du plan de bande sélectionné dans `F Lock` :
  * vous ne pouvez transmettre que si `TXLock` est `OFF`
  * vous ne pouvez pas transmettre si `TXLock` est `ON`

Si un canal mémoire ou VFO se trouve en dehors du plan de bande sélectionné et que `TXLock` est `ON`, il y aura un petit cadenas à gauche du nom.

Pour la procédure `UNLOCK ALL` orientée recherche, voir [Fonctionnalités avancées](./Advanced-features#tx-on-all-bands).

## Économiseur d'écran et délai d'attente du rétroéclairage

Les versions avec prise en charge de l'économiseur d'écran ajoutent le menu `SetSav`.

`SetSav` fonctionne avec `BLTime` : lorsque la radio est inactive et que le délai de rétroéclairage expire, l'économiseur d'écran peut remplacer l'écran normal au lieu de simplement laisser l'affichage inchangé.

Les modes disponibles sont :

* `OFF` : pas d'économiseur d'écran
* `LOGO` : afficher le logo de démarrage personnalisé comme écran de veille
* `LOGO+` : affiche le logo de démarrage personnalisé avec un effet de défilement
* `MATRIX` : afficher un écran de veille animé de style matriciel

Les modes de logo utilisent le même logo `128x64` téléchargé avec [UV Studio](./UV-Studio#boot-logo).

L'économiseur d'écran est intentionnellement suspendu pendant le travail radio actif : RX, TX, PTT, BEAM et balayage actif FM. Il peut s'afficher sur l'écran principal de la radio et sur l'écran de diffusion FM lorsque la radio est inactive. Appuyer sur une touche réveille l'écran normal.

Si `BLTime` est défini sur une valeur de style toujours désactivé ou toujours actif au lieu d'une durée chronométrée, `SetSav` ne prend pas en charge l'affichage.

## À propos du menu SetOff

Le menu `SetOff` vous permet de configurer un délai d'attente avant que votre radio n'entre en mode veille. Ce délai peut être réglé entre 1 minute et 2 heures. Si `SetOff` est `OFF`, le mode veille est désactivé.

Par exemple, si vous réglez le délai sur 5 minutes et que pendant ce temps il y a :

* pas de réception
* pas de transmission
* aucune pression sur un bouton

alors votre radio entrera automatiquement en mode veille. Vous serez averti 10 secondes avant avec un écran clignotant.

Notez que le mode veille sera activé même si vous effectuez une scan, tant qu'aucune réception n'a lieu.

FoxHunt et Beacon sont des exceptions délibérées : lorsque l'une ou l'autre application est active, la radio ignore `SetOff` jusqu'à ce que vous la quittiez explicitement. Le délai d’attente normal du rétroéclairage fonctionne toujours. Voir [FoxHunt](./Fox-Hunt) et [Beacon](./Beacon).

Une fois en mode veille :

* l'écran est complètement éteint
* la LED rouge à la base de l'antenne clignote
* le module BK4819 passe en mode veille profonde et se réveille périodiquement tous les :
  * 2 secondes si `BatSav` est réglé sur `1:1`
  * 4 secondes si `BatSav` est réglé sur `1:2`
  * 6 secondes si `BatSav` est réglé sur `1:3`
  * 8 secondes si `BatSav` est réglé sur `1:4`
  * 10 secondes si `BatSav` est réglé sur `1:5`

Pour sortir du mode veille, il vous suffit de :

* recevoir un signal pendant la phase de réveil périodique du BK4819
* lancez une transmission en appuyant sur le bouton PTT
* ou appuyez sur n'importe quel autre bouton

À titre d'exemple, j'ai testé le mode veille sur deux radios K5(8) avec des batteries étalonnées et complètement chargées, en utilisant les mêmes paramètres, fréquences, mode (`DWR`) et `BatSav` réglé sur `1:5`. La seule différence était qu’une radio avait le mode veille activé alors que l’autre ne l’était pas. Après 36 heures de fonctionnement, la radio sans mode veille n'avait plus que 20 % de batterie, tandis que celle avec mode veille avait encore 60 % de batterie.

## Rafale de tonalité de 1 750 Hz pour l'accès au répéteur

Lorsque `PTT` est enfoncé, la tonalité 1750 Hz peut être activée en appuyant sur [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Pages connexes

* [Mise en route](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programmation avec CHIRP](./Programming-with-CHIRP)
* [Scan](./Scanning)
* [Menu](./Menu)
* [Fonctions des boutons](./Button-functions)
* [Fonctionnalités avancées](./Advanced-features)
* [Dépannage](./Troubleshooting)
