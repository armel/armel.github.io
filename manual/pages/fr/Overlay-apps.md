# Applications superposées

Les applications overlay sont de petits programmes `.app` stockés dans Flash externe et chargés dans un espace de travail RAM `4 KiB` dédié uniquement lors de leur lancement. Ils permettent à l'édition expérimentale `Labs` d'ajouter des outils, des modes radio, des démos visuelles et des jeux sans intégrer définitivement chaque application dans le Flash interne du firmware.

> [!WARNING]
> Les applications overlay sont une fonctionnalité expérimentale `v6.0.0`. À l'heure actuelle, seule l'édition `Labs` contient le chargeur d'application. Les applications sont liées à un ABI de firmware, un niveau d'API, une adresse RAM et des capacités résidentes facultatives ; mettre à jour ou réinstaller une application si la radio signale une erreur de compatibilité.

## Comment fonctionne la plateforme

La radio fournit des emplacements pour applications Flash externes `8`. Chaque emplacement contient un en-tête et un code d'application d'au plus `4 KiB`. Avant l'exécution d'une application, le chargeur vérifie :

* le format du fichier/en-tête de l'application et l'état validé
* l'ABI requis et le niveau d'API minimum
* la taille du code et l'adresse du lien RAM
* les capacités requises du firmware résident de l'application
* un CRC-32 du code après son chargement dans la RAM

Le Flash du firmware interne n'est jamais réécrit lorsqu'une application est installée, lancée ou supprimée. Une application défectueuse ou incompatible est refusée proprement au lieu d'être exécutée.

Le catalogue actuel contient onze applications : des outils radio tels que `Broadcast FM`, `FoxHunt`, `Beacon` et `Beam`, ainsi que `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` et `Space Impact`. Voir [Applications overlay](./Overlay-applications) pour les applications documentées et leurs commandes. La disponibilité dépend des fichiers binaires distribués pour la version du firmware sélectionnée et des fonctionnalités intégrées au firmware Labs utilisé.

## Installer une application avec UV Studio

1. Démarrez la radio normalement avec l'édition `Labs`.
1. Connectez-le à un navigateur de bureau avec une connexion de données USB prise en charge.
1. Ouvrez [UV Studio](https://armel.github.io/uvstudio/) et sélectionnez `Apps` (`Labs only`).
1. Sélectionnez la version du firmware et une application compatible dans le catalogue officiel, ou choisissez un fichier `.app` local.
1. Choisissez l'emplacement de l'application cible.
1. Sélectionnez `Install app` et attendez la fin de l'écriture et de la vérification.

UV Studio peut actualiser le tableau des emplacements, afficher le nom, la version, la taille et l'état de chaque application, et supprimer une application sans toucher au reste de la radio.

Les emplacements d'application sont numérotés de `1` à `8` dans UV Studio et dans le lanceur radio `F + 7`.

## Lancer une application

1. Depuis l'écran radio normal, appuyez sur `F`, puis sur `7 VOX`.
1. Utilisez `UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1, pour sélectionner l'un des huit emplacements affichés. La présentation active suit `SetNav`.
1. Appuyez sur `M` pour exécuter l'application sélectionnée.
1. Utilisez les commandes affichées par cette application ; dans la plupart des applications, `EXIT` revient au lanceur d'applications ou à l'écran radio normal.

Les emplacements vides restent visibles dans le lanceur. L'emplacement sélectionné et la position de défilement sont mémorisés jusqu'au redémarrage de la radio. Le lanceur et les applications compatibles sont reflétés dans UV Studio.

Certaines applications peuvent également annoncer l'une des actions programmables normales : `FM RADIO`, `FOX HUNT`, `BEACON` ou `BEAM`. Lorsque l'application correspondante est installée et valide, cette action peut la lancer directement à partir d'une clé attribuée ou du sélecteur d'action de touche latérale. Si plusieurs applications installées annoncent la même action, l'emplacement compatible portant le numéro le plus bas est utilisé.

## Messages de compatibilité

| Message radio | Signification / action |
| --- | --- |
| `UPDATE APP` | le format de l'application, l'ABI, la taille ou l'adresse du lien sont plus anciens ou incompatibles ; installer une version d'application correspondante |
| `UPDATE FIRMWARE` | l'application nécessite une API d'application plus récente ; mettre à jour le firmware Labs |
| `REINSTALL APP` | l'écriture est incomplète ou le code CRC est erroné ; réinstallez le fichier `.app` |
| `NOT SUPPORTED` | l'application a besoin d'une fonctionnalité résidente que cette version Labs n'inclut pas |
| `NO APP` | l'emplacement sélectionné est vide ou n'a pas d'en-tête d'application valide |

Après la fermeture d'une application, le chargeur restaure le VFO sélectionné, le réglage de réception/double veille, la gestion du rétroéclairage et le cache Flash externe. Les applications qui modifient les données partagées prises en charge, telles que les préréglages de diffusion FM ou les données de canal Beam, demandent au firmware résident de les valider une fois que le code de superposition a cessé de s'exécuter.

## Créer des applications à partir des sources

Les développeurs peuvent créer les applications présentes dans le référentiel du firmware avec :

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Les fichiers `.app` générés sont placés dans `build/Apps/`. Chaque application est liée à l'adresse de superposition configurée du firmware et contient ses métadonnées et son CRC. Reconstruisez les applications lorsque l'ABI, l'API, les fonctionnalités requises ou l'adresse de superposition changent.

## Pages connexes

* [Applications overlay](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [Fonctions des boutons](./Button-functions)
* [Modifications récentes](./Recent-changes)
* [Fonctionnalités avancées](./Advanced-features)
