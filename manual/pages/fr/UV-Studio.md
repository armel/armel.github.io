# UV Studio

UV Studio est le compagnon basé sur navigateur pour le firmware F4HWN compatible sur les UV-K1 et UV-K5 V3. Il combine les fonctions d'affichage en direct et de clavier à distance, l'installation du firmware, la maintenance radio, la gestion Multiboot et la gestion de l'application Labs dans une seule interface.

Ouvrez-le ici :

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio communique directement avec la radio via l'API `Web Serial`. Les données radio sont gérées localement dans le navigateur ; aucune installation d'application, compte de serveur ou téléchargement dans le cloud n'est requis.

> [!IMPORTANT]
> UV Studio n'est pas limité à l'édition Fusion. Ses outils généraux fonctionnent avec les éditions compatibles F4HWN, tandis que certaines vues nécessitent une capacité de firmware spécifique. En particulier, la gestion des applications superposées et les outils Flash externes sont destinés à Labs.

## État de la version

UV Studio `v1.6.0` accompagne le firmware stable `v6.1.0`. En plus du catalogue de micrologiciels v6, de la gestion des emplacements Multiboot et du catalogue officiel d'applications overlay versionné, il ajoute :

* une interface réorganisée qui regroupe la sauvegarde/restauration de l'étalonnage et le téléchargement/téléchargement du logo de démarrage
* sauvegarde et restauration complètes sur Flash externe `2 MiB` pour les versions Labs compatibles
* Comparaison et vérification CRC32 pour une restauration Flash externe plus rapide et plus sûre
* restauration guidée du Flash externe d'usine reconstruit suivie du firmware d'origine correct pour UV-K1 ou UV-K5 V3

## Exigences

Il vous faut :

* un Quansheng UV-K1 ou UV-K5 V3 compatible avec le MCU PY32F071
* une connexion `USB-C` compatible avec les données ou un câble USB vers série compatible Baofeng/Kenwood
* un navigateur de bureau prenant en charge `Web Serial`, tel que Chrome, Brave, Edge, Opera ou Firefox 151+

Une copie téléchargée de l'arborescence source complète de UV Studio peut également être ouverte localement. Il s'agit d'une application HTML/CSS/JavaScript statique et ne nécessite pas d'étape de construction ni de serveur Web local.

## Résumé des fonctionnalités et du mode radio

| Outil | État radio requis | Exigence du firmware |
| --- | --- | --- |
| Visionneuse en direct et journal RF en direct | démarrage normal | compatible Viewer/RF Prise en charge des journaux |
| Firmware Flash | `DFU` / mode flash | Chargeur de démarrage UV-K1 ou UV-K5 V3 |
| Calibrage, logo de démarrage, RF Exportation de journaux | démarrage normal | firmware compatible F4HWN |
| Emplacements pour micrologiciels | démarrage normal | `v6.0.0` compatible multiboot ou version ultérieure |
| Applications | démarrage normal | Labs avec prise en charge des applications overlay |
| Sauvegarde/restauration Flash externe | démarrage normal | `v6.1.0` Labs avec accès Flash externe |
| Restauration du logiciel d'usine | démarrage normal de Labs, puis DFU lorsque vous y êtes invité | `v6.1.0` Labs pour le premier étage |

Pour accéder au mode `DFU`, éteignez la radio, maintenez `PTT` et allumez-la tout en continuant à maintenir `PTT`. Relâchez `PTT`, puis connectez ou reconnectez le câble de données. Aucune clé latérale n'est requise.

## Ce que UV Studio peut faire

UV Studio fournit :

* un affichage radio `128x64` en temps réel
* claviers virtuels UV-K1 et UV-K5 avec appuis courts et longs
* une fenêtre de clavier amovible et une commande de redémarrage radio
* captures d'écran de l'écran radio et rendu LCD réglable
* Activité RF en direct, marqueurs de session, filtres et analyses
* exportation de l'activité du journal RF stockée au format CSV
* installation du firmware à partir du catalogue officiel, de la version de développement continue ou d'un fichier `.bin` local
* téléchargement direct du pilote CHIRP correspondant pour le firmware F4HWN version stable
* installation, validation, dénomination, effacement et réinitialisation de la configuration des emplacements du firmware Multiboot
* installation et suppression des applications overlay Labs à partir d'un catalogue officiel versionné ou de fichiers `.app` locaux
* sauvegarde et restauration de l'étalonnage
* téléchargement, aperçu, conversion et téléchargement du logo de démarrage personnalisé
* Sauvegarde sur Flash externe, restauration et récupération guidée du logiciel d'usine dans `v1.6.0`
* thèmes clairs et sombres et traductions en dix langues

UV Studio possède la connexion série globalement. Il empêche deux opérations d'utiliser le port en même temps et maintient ou rétablit la connexion lors du basculement entre des outils compatibles en mode normal.

## Visionneuse en direct

Le Live Viewer reflète l'affichage de la radio et fournit des claviers virtuels UV-K1 et UV-K5 correspondants.

1. Démarrez la radio normalement.
1. Connectez la radio à l'ordinateur.
1. Ouvrez `Live Viewer`, sélectionnez le clavier approprié et cliquez sur `Connect`.
1. Choisissez le port série radio.
1. Utilisez le clavier virtuel ou le clavier de l'ordinateur.
1. Cliquez sur `Disconnect` avant de débrancher le câble.

La barre d'outils peut redémarrer la radio connectée, capturer une capture d'écran, modifier l'apparence de l'écran LCD simulé et détacher le clavier dans une fenêtre flottante. Le panneau `Help` intégré répertorie tous les raccourcis clavier ; les commandes courantes incluent les touches fléchées pour la navigation, les chiffres pour les pressions courtes, `Shift` plus une touche pour une pression longue, `Enter` ou `M` pour le menu, `Esc` pour quitter et `F1` / `F2` pour les boutons latéraux.

> [!IMPORTANT]
> Le contrôle du spectateur ne peut pas démarrer une transmission. Le `PTT` affiché n'est pas disponible et UV Studio n'est pas un outil d'émission à distance.

## Journal RF

Lorsque le firmware en cours d'exécution prend en charge le journal RF et le pont Viewer, UV Studio affiche les sessions RX et TX en direct avec :

* informations sur la direction, la fréquence et le canal
* durée de la séance
* Niveau de signal RX ou puissance TX
* tension de la batterie
* Filtres `ALL`, `RX` et `TX`
* analyse de l'activité, du temps d'antenne, de la fréquence, de la session et de la batterie

L'outil `Export RF Log` distinct lit les dernières activités stockées et marqueurs de mise sous tension `512` et crée `rf-log.csv`. Gardez la radio en mode normal. Si les noms de canaux ou les informations de banque de configuration sont erronés, mettez à jour vers un firmware contenant les derniers correctifs du journal v6 RF.

## Firmware Flash

> [!WARNING]
> Faire clignoter une image incompatible ou corrompue peut rendre la radio inutilisable. Confirmez la compatibilité du modèle et du chargeur de démarrage, effectuez une sauvegarde d'étalonnage et laissez le câble connecté jusqu'à la fin de l'opération.

Le catalogue du firmware regroupe les versions stables actuelles de F4HWN par édition, inclut la version de développement continue Fusion et peut également proposer des images de stock compatibles. Un fichier `.bin` local reste disponible lorsque le catalogue ne peut pas être chargé ou lors de l'utilisation d'une version personnalisée.

1. Démarrez la radio en mode `DFU`.
1. Ouvrez `Flash Firmware`.
1. Sélectionnez l'entrée de catalogue correcte ou choisissez un fichier `.bin` local compatible.
1. Cliquez sur `Flash firmware` et sélectionnez le port série.
1. Attendez la fin de l'opération de progression et que la radio redémarre.

Lorsqu'une version stable de F4HWN est sélectionnée, UV Studio propose le pilote CHIRP partagé publié pour cette version du firmware. Le développement roulant et la constitution du stock n'utilisent pas ce lien de pilote automatique.

## Emplacements du firmware

Les quatre éditions officielles `v6.0.0` prennent en charge Multiboot. UV Studio gère les emplacements utilisateur `1` à `4` en Flash externe. La sauvegarde protégée `Main` est conservée par le firmware et n'est intentionnellement pas exposée en tant qu'emplacement inscriptible.

Pour installer une autre édition :

1. Démarrez normalement une radio compatible Multiboot.
1. Ouvrez `Firmware Slots` et actualisez le tableau.
1. Sélectionnez une image `v6.x` F4HWN stable compatible dans le catalogue ou chargez un fichier `.bin` local.
1. Choisissez l'emplacement `1` à `4` et entrez éventuellement un nom d'affichage comportant jusqu'à `15` caractères.
1. Sélectionnez `Write to slot`, confirmez et attendez l'effacement, l'écriture et la vérification CRC complète.

Le catalogue d'emplacements exclut intentionnellement le firmware d'origine, le firmware v5 et l'image de développement continu, car il n'est pas garanti que ces entrées reviendront au sélecteur Multiboot.

Chaque emplacement rempli comporte deux actions de maintenance indépendantes :

* `Erase FW` supprime l'image du firmware stockée mais ne réinitialise pas la banque de configuration de cet emplacement.
* `Reset config` efface les canaux et la banque de paramètres associés à cet emplacement mais laisse son image de firmware installée.

Voir [Multiboot et Multiconfig](./Multiboot-and-Multiconfig) pour `Main`, sélection d'emplacement, banques de configuration, `SetCfg` et comportement de récupération.

## Applications (Labs)

La vue `Apps` gère les huit emplacements d'applications overlay expérimentales dans l'édition Labs.

1. Démarrez Labs normalement et ouvrez `Apps`.
1. Actualisez le tableau des emplacements d'application.
1. Sélectionnez la version du firmware, puis une application officielle dans son catalogue versionné ; Vous pouvez également charger un fichier `.app` local.
1. Sélectionnez l'emplacement cible et choisissez `Install app`.
1. À la radio, utilisez `F + 7`, sélectionnez l'application et appuyez sur `M`.

UV Studio affiche le nom, la version, la taille et l'état de validation de l'application. La suppression d'une application efface uniquement cet emplacement d'application.

> [!IMPORTANT]
> Les applications overlay sont liées à l'ABI du firmware, au niveau de l'API, à l'adresse RAM et aux capacités. Sélectionnez la version du catalogue d'applications correspondant au firmware installé. Réinstallez les applications compatibles après une mise à jour du firmware si nécessaire.

Voir [Applications overlay](./Overlay-apps) pour la compatibilité du chargeur et [Applications overlay](./Overlay-applications) pour l'objectif et les contrôles de chaque application.

## Choisir la bonne sauvegarde ou copie

Ces opérations protègent ou copient différentes parties de la radio et ne sont pas interchangeables :

| Opération | Ce qu'il contient | Meilleure utilisation | Comportement d'étalonnage |
| --- | --- | --- | --- |
| UV Studio `Calibration` | RF spécifique à l'appareil et calibrage matériel | sauvegarde de sécurité essentielle pour une radio | lit ou restaure explicitement l'étalonnage ; utiliser uniquement avec la même radio |
| Image radio CHIRP | canaux et paramètres compris par cette version du pilote | édition et migration de mémoires/paramètres | ne remplace pas une sauvegarde d'étalonnage |
| UV Studio `External Flash` | image Flash externe brute `2 MiB`, comprenant les configurations, les emplacements, les applications, les journaux, le logo et les données d'étalonnage dans le fichier de sauvegarde | sauvegarde et récupération complètes des fichiers | restauration préserve volontairement la calibration déjà présente sur la radio cible |
| Mémoire AirCopy ou `Settings` | banques de mémoire sélectionnées et/ou paramètres radio compatibles | synchronisation des données sélectionnées entre deux radios | ne copie pas l'étalonnage du matériel |
| AirCopy `Flash 2M` | Flash externe cloné directement sur un câble | faire correspondre l'état Flash externe partagé d'une autre radio à la source | exclut et préserve le secteur d'étalonnage de la radio cible |

Pour les mises à niveau de routine, effectuez au moins une sauvegarde d'étalonnage et une image CHIRP. Utilisez la sauvegarde Flash externe complète avant d'expérimenter avec Multiboot, les emplacements d'application, la restauration d'usine ou le stockage de bas niveau.

## Sauvegarde et restauration Flash externe (v1.6.0)

Cet outil nécessite les commandes Flash externes fournies par `v6.1.0` Labs. Il n'est pas disponible dans `v6.0.0`.

La vue `External Flash` lit ou restaure le Flash SPI externe `2 MiB` PY25Q16 complet par adresse physique. Cela inclut les banques de configuration, les emplacements de firmware, les emplacements d'application, le journal RF, l'état Multiboot, le logo de démarrage et d'autres données partagées.

### Sauvegarder

1. Démarrez normalement une build Labs compatible.
1. Ouvrez `External Flash` et sélectionnez `Back up`.
1. Cliquez sur `Read external flash` et choisissez le port série.
1. Attendez que la puce complète soit lue ; cela peut prendre plusieurs minutes.
1. Téléchargez `external-flash.bin`.

La sauvegarde est exactement `2 MiB`. Conservez-le en toute sécurité : il contient la configuration radio et les données d'étalonnage spécifiques à l'appareil.

### Restaurer

1. Démarrez normalement une build Labs compatible.
1. Ouvrez `External Flash` et sélectionnez `Restore`.
1. Choisissez une sauvegarde complète `2 MiB` créée par cet outil.
1. Cliquez sur `Restore external flash` et confirmez l'opération destructrice.
1. Gardez la radio alimentée et connectée jusqu'à ce que la vérification soit terminée et que la radio redémarre.

UV Studio refuse les fichiers qui ne sont pas exactement `2 MiB`. Il fonctionne secteur par secteur dans les unités `4 KiB` et n'efface ni n'écrit jamais le secteur d'étalonnage spécifique à l'appareil. Avec le firmware actuel, il compare les valeurs CRC32, ignore les secteurs déjà identiques, écrit uniquement les secteurs restants et vérifie chacun d'entre eux. Il revient à une comparaison directe d'octets lorsque la commande CRC n'est pas disponible.

> [!WARNING]
> La restauration remplace presque tout le contenu Flash externe, y compris les paramètres, les journaux, le logo, les applications, les emplacements du firmware et l'état du Multiboot. Le secteur d'étalonnage de la radio réceptrice est préservé, donc une sauvegarde complète d'une radio n'est pas une méthode pour copier l'étalonnage de cette radio sur une autre.

Pour une copie directe radio à radio du Flash externe, voir la fonction distincte `Flash 2M` par câble uniquement dans [AirCopy](./AirCopy#external-flash-cloning).

## Restauration du logiciel d'usine (v1.6.0)

La vue `Factory reset` est une récupération guidée en deux étapes pour renvoyer un UV-K1 ou un UV-K5 V3 au logiciel Quansheng correspondant :

1. Démarrez `v6.1.0` Labs normalement.
1. Ouvrez `Factory reset` et sélectionnez le modèle exact : `UV-K1` ou `UV-K5 V3`.
1. Confirmez l'avertissement. UV Studio charge l'image Flash externe reconstruite en usine et le firmware d'origine correspondant, puis vérifie leur taille et SHA-256 avant d'écrire quoi que ce soit.
1. UV Studio restaure et vérifie le Flash externe tout en préservant le secteur d'étalonnage spécifique à l'appareil.
1. Lorsque vous y êtes invité, éteignez la radio et passez en mode `DFU`. Ne le démarrez pas normalement entre les deux étapes.
1. Sélectionnez `Continue in DFU` ; UV Studio installe automatiquement le firmware d'origine correspondant.

Les cibles de stock groupées sont UV-K1 `v7.03.01` et UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Il s'agit d'une restauration logicielle destructrice. Il supprime les paramètres F4HWN, l'état Multiboot, les emplacements du firmware, les applications overlay, les journaux RF et le logo personnalisé. L’image externe est un état d’usine reconstruit, et non un dump physique intact. Sélectionnez le bon modèle et n’interrompez aucune des étapes.

## Calibrage

L'étalonnage est spécifique à l'appareil. Créez une sauvegarde avant les expériences de firmware ou la maintenance de bas niveau, et nommez le fichier avec le modèle de radio ou le numéro de série afin que les sauvegardes ne soient pas mélangées entre les appareils.

Pour le sauvegarder :

1. Démarrez la radio normalement.
1. Ouvrez `Calibration` et sélectionnez `Back up`.
1. Cliquez sur `Read calibration data`.
1. Téléchargez `calibration.dat`.

Pour le restaurer :

1. Démarrez la même radio normalement.
1. Ouvrez `Calibration` et sélectionnez `Restore`.
1. Choisissez son fichier `calibration.dat`.
1. Cliquez sur `Restore calibration data` et attendez la fin.

> [!WARNING]
> Restaurez uniquement le calibrage appartenant à cette radio, sauf si vous comprenez parfaitement les conséquences.

## Logo de démarrage

Les versions compatibles peuvent utiliser une image monochrome `128x64` personnalisée au démarrage ou comme économiseur d'écran.

Pour télécharger un logo :

1. Démarrez la radio normalement.
1. Ouvrez `Boot Logo` et sélectionnez `Upload`.
1. Choisissez une image dans un format courant tel que PNG, JPEG ou BMP.
1. Ajustez `Threshold` et `Invert colors` tout en vérifiant l'aperçu.
1. Sélectionnez `Upload logo to radio`.
1. Choisissez `LOGO` dans `POnMsg` ou un mode logo compatible dans `SetSav`.

L'onglet `Download` lit l'image actuelle, la prévisualise et l'enregistre sous le nom `logo.png`.

## Dépannage

Si UV Studio ne peut pas communiquer avec la radio :

* confirmer que l'opération sélectionnée utilise le bon mode de démarrage normal ou DFU
* débranchez le câble, redémarrez la radio dans ce mode, reconnectez-la et sélectionnez à nouveau le port série
* fermez les autres programmes ou onglets du navigateur susceptibles de posséder le port série
* vérifiez que le câble transporte des données et est complètement inséré
* utiliser une édition et une version du firmware qui expose la fonctionnalité requise
* pour les applications ou Flash externe, vérifiez que Labs est en cours d'exécution plutôt que Fusion, FieldOps ou Transfer

Le `Console` extensible enregistre les détails du protocole et des opérations qui peuvent aider à identifier une commande non prise en charge, un délai d'attente, un échec de validation ou un fichier erroné.

## Pages connexes

* [Mise en route](./Getting-started)
* [Modifications récentes](./Recent-changes)
* [Programmation avec CHIRP](./Programming-with-CHIRP)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [Applications overlay](./Overlay-apps)
* [Applications overlay](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Fonctionnalités avancées](./Advanced-features)
* [Dépannage](./Troubleshooting)
