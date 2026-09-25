# Applications overlay

Cette page décrit les onze applications actuellement disponibles pour l'édition `Labs` : leur fonction et leurs commandes. Pour les informations concernant l'installation, la compatibilité et le développement, voir [Applications overlay](./Overlay-apps).

> [!NOTE]
> Les touches de navigation dépendent de la radio et du réglage `SetNav` : `UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1. Dans les tableaux ci-dessous, `UP/LEFT` et `DOWN/RIGHT` font référence à ces clés équivalentes.

## Démarrer une application

1. Installez un fichier `.app` compatible avec [UV Studio](./UV-Studio#apps-labs).
1. Depuis l'écran radio normal, appuyez sur `F`, puis sur `7 VOX`.
1. Sélectionnez une application installée avec `UP/LEFT` ou `DOWN/RIGHT`.
1. Appuyez sur `M` pour le lancer.

Dans la plupart des applications, `EXIT` ferme l'application et revient au lanceur ou à l'écran radio normal. Certaines applications radio peuvent également être affectées directement à une touche programmable via le sélecteur d'action normal.

## Résumé de la candidature

| Demande | Objectif |
| --- | --- |
| `Broadcast FM` | Récepteur de diffusion complet FM avec VFO, mémoires et balayage des stations |
| `FoxHunt` | Force du signal et aide à la recherche de direction avec historique, atténuation et guidage audio |
| `Beacon` | Balise Morse répétitive de style ARDF utilisant la transmission sélectionnée VFO |
| `Beam` | Transfer configuration à un canal entre radios compatibles par voie hertzienne |
| `Breakout` | Jeu de casse-briques |
| `Tetris` | Jeu de blocs tombants avec score, niveaux et meilleur score enregistré |
| `Cube3D` | Visionneuse de formes 3D animée |
| `Plasma` | Modèles animés de style démoscène |
| `Snake` | Jeu de serpent classique basé sur une grille avec un meilleur score enregistré |
| `Rapid Roll` | Jeu de plateformes dans lequel une balle doit continuer à descendre en évitant les dangers |
| `Space Impact` | Jeu de tir spatial à défilement horizontal avec tir automatique, missiles et boss |

## Diffusion FM

`Broadcast FM` est un récepteur de diffusion BK1080 complet. Il fournit des modes de fréquence et de mémoire, quatre bandes de diffusion, une recherche manuelle, une découverte automatique des stations et 48 mémoires FM partagées avec la radio résidente FM.

Pendant que cette application est en cours d'exécution, les fonctions normales de réception et de double veille du BK4819 sont suspendues. Les modifications apportées aux mémoires FM sont validées en toute sécurité à la fermeture de l'application.

| Clé | Actions |
| --- | --- |
| `0`–`9` | Entrez une fréquence en mode VFO ou un numéro de mémoire à deux chiffres en mode MR/save |
| `UP/LEFT` ou `DOWN/RIGHT` | Réglez une étape en mode VFO ; sélectionnez la station enregistrée précédente/suivante en mode MR ; choisissez un emplacement de sauvegarde ; changer la direction de recherche pendant la scan |
| `*` | Démarrer la recherche manuelle ; arrêter une analyse active |
| `F`, puis `*` ou maintenez `*` | Démarrez l'analyse automatique et reconstruisez la liste de mémoire FM |
| `M` en mode VFO | Ouvrez `SAVE?` ; appuyez à nouveau sur `M` pour enregistrer dans l'emplacement sélectionné |
| `M` en mode MR | Ouvrez `DEL?` ; appuyez à nouveau sur `M` pour supprimer la mémoire sélectionnée |
| `F`, puis `1` ou maintenez `1` | Sélectionnez la prochaine bande de diffusion |
| `F`, puis `3` ou maintenez `3` | Basculer entre les modes VFO et MR |
| `F`, puis `0` ou maintenez `0` | Quitter l'application |
| `EXIT` | Effacez le dernier chiffre saisi, annulez une invite de sauvegarde/suppression ou quittez |

> [!WARNING]
> Le balayage automatique efface et reconstruit la liste de mémoire FM avant de stocker les stations trouvées.

## FoxHunt

`FoxHunt` aide à localiser un émetteur à l'aide de la réception sélectionnée VFO. Il affiche la force du signal corrigée en dBm, un S-mètre de style IARU, les niveaux crête et minimum, des informations sur les tendances et un graphique à barres ou un historique du signal. L'atténuation sélectionnable étend la plage utile à proximité d'un émetteur puissant.

| Clé | Actions |
| --- | --- |
| `1` | Basculer entre le graphique à barres et l'historique du signal |
| `2` | Sélectionnez le mode audio suivant : désactivé, bips forts ou audio continu de la station |
| `3` | Augmenter l'atténuation |
| `F`, puis `2` | Sélectionnez le mode audio précédent |
| `F`, puis `3` | Diminuer l'atténuation |
| `UP/LEFT` ou `DOWN/RIGHT` | Augmenter/diminuer l'atténuation directement |
| `M` | Réinitialiser les valeurs de référence de pointe, minimale et de tendance |
| Maintenir `F` | Verrouiller ou déverrouiller le clavier de l'application |
| `EXIT` | Quitter pendant que le clavier est déverrouillé |

Le graphique, le mode audio et le paramètre d'atténuation sont enregistrés pour le prochain lancement. Les deux touches de navigation restent disponibles tant que le clavier de l'application est verrouillé.

## Beacon

`Beacon` transmet à plusieurs reprises un identifiant Morse de style ARDF sur la transmission sélectionnée VFO. Il alterne entre une fenêtre de transmission configurable et une période d'inactivité. Les identifiants disponibles sont `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` et `CALL` ; `CALL` envoie l'indicatif configuré suivi de `MOE`.

| Clé | Actions |
| --- | --- |
| `1` | Augmentez la durée de transmission par étapes de 5 secondes (`5` – `60` secondes) |
| `2` | Augmentez la durée d'inactivité par étapes de 5 secondes (`5`–`240` secondes) |
| `3` | Sélectionnez l'identifiant suivant |
| `4` | Basculer la saisie `TONE` / `CARR` |
| `F`, puis `1` / `2` / `3` / `4` | Modifiez le paramètre correspondant dans le sens inverse |
| `M` pendant la transmission | Arrêtez la fenêtre de transmission actuelle et commencez la période d'inactivité |
| `M` au repos | Redémarrez le compte à rebours complet |
| Maintenir `F` | Verrouiller ou déverrouiller tous les contrôles de l'application |
| `EXIT` | Arrêtez-vous en toute sécurité et sortez pendant que les commandes sont déverrouillées |

La première transmission démarre immédiatement. La durée, le temps d'inactivité, l'identifiant et le mode de saisie sont enregistrés pour le prochain lancement. Si le firmware résident refuse la transmission, l'application affiche `TX OFF` et ne transmet pas.

> [!WARNING]
> Beacon transmet automatiquement. Vérifiez le VFO sélectionné, la fréquence, la puissance, l'antenne, l'indicatif d'appel, le cycle de service et les réglementations locales avant de le lancer.

## Beam

`Beam` transfère le VFO sélectionné ou la configuration du canal mémoire entre les radios compatibles. La radio émettrice transmet les données du canal par voie hertzienne ; la radio réceptrice stocke un paquet valide dans la première mémoire libre.

| Clé | Actions |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Basculer entre les modes de transmission (`BEAM TX`) et de réception (`BEAM RX`) ; arrêter également une opération de réception active |
| `M` en mode TX | Envoyer la configuration du canal sélectionné |
| `M` en mode RX | Commencez à attendre un paquet Beam |
| `EXIT` | Arrêter de recevoir ou quitter l'application |

L'écran indique `SENT`, `RECEIVED`, `MEM FULL` ou `ERROR`, selon le cas. Un seul canal reçu est engagé par lancement ; quittez et rouvrez Beam avant d’en recevoir un autre.

## Breakout

`Breakout` est un jeu de casse-briques compact avec 18 briques, cinq balles de départ, un score et un suivi de niveau. Nettoyer le mur démarre le niveau suivant et attribue une balle supplémentaire.

| Clé | Actions |
| --- | --- |
| `4` ou `UP/LEFT` | Déplacez la pagaie vers la gauche |
| `0` ou `DOWN/RIGHT` | Déplacez la pagaie vers la droite |
| `M` | Pause ou reprise ; après `GAME OVER`, démarrez le nouveau jeu préparé |
| `EXIT` | Quitter l'application |

La progression du jeu n'est pas conservée après avoir quitté l'application.

## Tétris

`Tetris` utilise un puits visible 16 × 16, un sac de sept pièces mélangées, une pièce fantôme, un aperçu de la pièce suivante, une partition, des lignes et des niveaux. Le meilleur score est enregistré entre les lancements.

| Clé | Actions |
| --- | --- |
| `4` ou `UP/LEFT` | Déplacer vers la gauche |
| `6` ou `DOWN/RIGHT` | Déplacer vers la droite |
| `M` ou `2` | Faites pivoter la pièce |
| `8` | Goutte douce |
| `*` ou `0` | Chute dure |
| `F` | Pause ou reprise |
| `M`, `*` ou `0` après la fin du jeu | Commencer une nouvelle partie |
| `EXIT` | Quitter l'application |

Le mouvement et la chute douce se répètent pendant que leurs touches sont maintenues.

## Cube3D

`Cube3D` restitue des formes solides ou filaires en rotation. Huit formes sont disponibles : cube, octaèdre, tétraèdre, diamant, icosaèdre, cuboctaèdre, prisme hexagonal et gemme pentagonale.

| Clé | Actions |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Augmenter/diminuer la vitesse de rotation (`1`–`16`) |
| `1`–`8` | Sélectionnez directement une forme |
| `*` | Sélectionnez la forme suivante |
| `F` | Basculer le rendu filaire/solide |
| `M` | Pause ou reprise |
| `EXIT` | Quitter l'application |

## Plasma

`Plasma` affiche des motifs animés de style démo en plein écran avec des bandes ou un rendu pointillé.

| Clé | Actions |
| --- | --- |
| `UP/LEFT` ou `DOWN/RIGHT` | Augmenter/diminuer la vitesse d'animation (`1`–`8`) |
| `1`–`5` | Sélectionnez un modèle et désactivez le cyclisme automatique |
| `*` | Basculer le rendu des bandes/pointillés |
| `F` | Activer ou désactiver le cycle de modèle automatique |
| `M` | Pause ou reprise |
| `EXIT` | Quitter l'application |

## Snake

`Snake` est un jeu classique de style Nokia joué sur une grille `31 × 13`. Mangez la nourriture pour faire grandir le serpent et marquez des points `10`. Frapper la frontière ou le corps du serpent met fin à la partie. Le meilleur score est enregistré entre les lancements.

| Clé | Actions |
| --- | --- |
| `2` ou `3` | Monter |
| `4` ou `5` | Déplacer vers la gauche |
| `6` ou `0` | Déplacer vers la droite |
| `8` ou `9` | Descendre |
| `F` | Pause ou reprise |
| `M`, `*` ou `0` après la fin du jeu | Commencer une nouvelle partie |
| `EXIT` | Quitter l'application |

Maintenir une touche de direction le répète. L'application refuse un retournement immédiat dans le corps du serpent. Si l'économiseur d'écran s'active pendant un jeu, Snake se met en pause et reprend après le réveil.

## Rapid Roll

`Rapid Roll` est un jeu de plateformes dans lequel les plateformes remontent vers un plafond hérissé de pointes. Déplacez la balle latéralement et laissez-la tomber d'une plateforme sûre à la suivante. Les plateformes à pointes, le plafond et le bas de l'écran font perdre une vie ; des plateformes friables apparaissent à partir du niveau 3. Les cœurs rapportent `50` points et rendent une vie, jusqu'à un maximum de cinq.

| Touche | Action |
| --- | --- |
| `4` ou `UP/LEFT` | Faire rouler la balle vers la gauche |
| `6` ou `DOWN/RIGHT` | Faire rouler la balle vers la droite |
| `F` | Mettre en pause ou reprendre |
| `M` après `GAME OVER` | Commencer une nouvelle partie |
| `EXIT` | Quitter l'application |

La partie commence avec trois vies et accélère à mesure que le niveau augmente. Les plateformes sûres deviennent plus étroites aux niveaux supérieurs. La progression n'est pas conservée après avoir quitté l'application. Si l'économiseur d'écran s'active pendant une partie, Rapid Roll se met en pause et reprend au réveil.

## Space Impact

`Space Impact` est un jeu de tir à défilement horizontal. Le vaisseau utilise automatiquement son arme principale, ce qui laisse les commandes disponibles pour les déplacements verticaux. Les vagues d'ennemis emploient plusieurs mouvements et attaques, puis un boss doté d'une barre de vie apparaît à la fin de chaque niveau.

| Touche | Action |
| --- | --- |
| `2` ou `UP/LEFT` | Déplacer le vaisseau vers le haut |
| `8` ou `DOWN/RIGHT` | Déplacer le vaisseau vers le bas |
| `5` ou `M` | Lancer un missile perforant |
| `F` | Mettre en pause ou reprendre |
| `M` après `GAME OVER` | Commencer une nouvelle partie |
| `EXIT` | Quitter l'application |

La partie commence avec trois vies et trois missiles. L'arme principale tire automatiquement. Un missile supplémentaire est accordé tous les 16 ennemis détruits, jusqu'à un maximum de neuf. Vaincre un boss accorde une vie et un missile supplémentaires tant que leurs limites respectives ne sont pas atteintes. La progression n'est pas conservée après avoir quitté l'application. Si l'économiseur d'écran s'active pendant une partie, Space Impact se met en pause et reprend au réveil.

## Pages connexes

* [Applications overlay](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Fonctions des boutons](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver)
