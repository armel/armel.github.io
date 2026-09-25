# Programmation avec CHIRP

Cette page explique comment utiliser `CHIRP` avec le pilote dédié inclus avec chaque version du firmware.

> [!WARNING]
> Utilisez le pilote `CHIRP` de la même version du firmware que celui installé sur votre radio.
> N'utilisez pas Quansheng CPS.
> N'utilisez pas de pilote `UV-K5` générique ou un pilote d'une autre version du firmware.

## Compatibilité

Le pilote dédié `v6.1.0` prend en charge chaque édition officielle `v6.1.0` sur :

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` et `Labs`

Ce n'est pas pour :

* `UV-K5 V1 / V2`
* autres modèles Quansheng
* familles de micrologiciels sans rapport

Étant donné que ce firmware utilise sa propre mémoire et sa propre configuration de paramètres, un autre pilote peut lire ou écrire des données incorrectes. Faites toujours correspondre la version du pilote à la version du firmware, même lorsque vous passez d'une édition officielle à l'autre.

Ne présumez pas que l’ancien pilote `v6.0.0` est interchangeable avec le pilote `v6.1.0`.

## Avant de commencer

* assurez-vous que la radio exécute la version F4HWN correspondante
* localisez le fichier de pilote inclus dans ce package de version
* soyez prêt à sauvegarder une sauvegarde de l'image radio avant de modifier quoi que ce soit

> [!NOTE]
> `CHIRP` peut afficher ce pilote comme expérimental. C'est prévu.

## Mise à niveau vers la version 6.1.0

Avant la mise à jour à partir d'une génération de firmware antérieure :

1. Téléchargez la radio avec le pilote correspondant au firmware actuellement installé.
1. Enregistrez cette image et exportez éventuellement les canaux mémoire au format CSV.
1. Sauvegardez l'étalonnage radio avec [UV Studio](./UV-Studio#calibration).
1. Flashez l'édition `v6.1.0` choisie.
1. Si la version à partir de laquelle vous migrez l'exige, entrez dans le menu masqué et exécutez `RESET ALL`.
1. Chargez le pilote dédié `v6.1.0` CHIRP et téléchargez une nouvelle image à partir de la radio mise à jour.
1. Copiez et collez les anciennes chaînes dans cette nouvelle image, puis téléchargez-la.

> [!WARNING]
> N'importez pas directement un ancien CSV sur la nouvelle image radio complète. Copiez et collez les lignes des chaînes dans une image fraîchement téléchargée afin que la disposition des paramètres de la nouvelle version reste intacte.

## Chargez le pilote dédié dans CHIRP

1. Ouvrez `CHIRP`.
2. Si `File > Load Module...` n'est pas disponible, activez d'abord les fonctionnalités CHIRP `Help > Developer Mode` (menu Aide), puis redémarrez `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Utilisez `File > Load Module...` et sélectionnez le fichier `f4hwn.fusion.chirp...py` inclus avec la version du firmware.
4. Une fois le module chargé, `CHIRP` devrait proposer l'entrée de modèle `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.

> [!NOTE]
> Le nom de fichier du module et l'étiquette du modèle CHIRP conservent le nom historique `Fusion`. Le module `v6.1.0` est néanmoins le pilote partagé pour les quatre éditions officielles.

## Télécharger depuis la radio

1. Allumez la radio.
1. Connectez la radio avec soit un câble `USB-C` compatible, soit un câble de programmation double jack compatible sur le connecteur `mic/spkr`.
1. Assurez-vous que le connecteur est fermement inséré.
1. Dans `CHIRP`, choisissez `Radio > Download From Radio...`
1. Sélectionnez le bon port série.
1. Sélectionnez `Vendor` : `Quansheng`.
1. Sélectionnez `Model` : `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Démarrez le téléchargement et attendez que l'image radio soit entièrement lue.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Si la communication échoue, débranchez le câble, allumez d'abord la radio, puis rebranchez le câble. Le pilote dédié avertit que certaines configurations peuvent échouer si la radio a été allumée avec le câble déjà connecté.

## Afficher les champs supplémentaires

Après le téléchargement, activez `View > Show Extra Fields` dans `CHIRP` (menu Affichage).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Ceci est important car le pilote dédié expose plusieurs champs spécifiques au canal via le groupe `Extra`. Sans `Show Extra Fields`, certains paramètres spécifiques au firmware restent masqués dans l'éditeur de voies.

Les exemples typiques incluent :

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Modifier et télécharger

Vous pouvez ensuite modifier les mémoires, les noms et les paramètres pris en charge.

Quand vous êtes prêt :

1. Vérifiez vos modifications.
1. Dans `CHIRP`, choisissez `Radio > Upload To Radio...`
1. Utilisez le même port, fournisseur et modèle.
1. Attendez que le téléchargement soit complètement terminé avant de toucher le câble ou d'éteindre la radio.

> [!WARNING]
> Laissez les éléments liés à l’étalonnage ou avancés seuls, à moins que vous ne sachiez exactement ce qu’ils font.

## Identification Beacon

L'application indépendante Beacon utilise le paramètre CHIRP `Message Line 1` comme indicatif. Le pilote dédié accepte jusqu'à `12 characters` dans ce champ.

Lorsque Beacon transmet en mode `CALL`, le firmware convertit les lettres en majuscules, conserve les lettres, les chiffres et `/`, supprime les caractères non pris en charge et ajoute ` MOE`. Si l'indicatif résultant est vide, il transmet `MOE`.

Après avoir modifié `Message Line 1`, téléchargez les paramètres sur la radio avant de démarrer Beacon. Voir [Beacon](./Beacon) pour le comportement de la transmission et les informations de sécurité.

## Bonne pratique

* utilisez toujours le pilote inclus avec la même version du firmware
* téléchargez toujours d'abord, puis enregistrez une sauvegarde
* après une mise à jour du firmware, rechargez le module pilote le plus récent à partir de cette version
* utilisez `CHIRP` pour la programmation en masse, pas Quansheng CPS

## Si quelque chose ne va pas

Vérifiez ces points :

1. la radio est vraiment une `UV-K1` ou `UV-K5 V3`
1. la radio exécute la version et l'édition attendues de F4HWN
1. `CHIRP` a chargé le pilote de cette même version, pas un autre module `UV-K5`
1. le câble est complètement inséré
1. le port série sélectionné est le bon

## Pages connexes

* [Mise en route](./Getting-started)
* [Utilisation de la radio](./Radio-operation)
* [Beacon](./Beacon)
* [Dépannage](./Troubleshooting)
