# Modifications récentes

Cette page résume la dernière version stable de `v6.1.0` et les principales modifications visibles par l'utilisateur dans les versions antérieures.

Pour les archives officielles des versions, consultez la [page des versions GitHub](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## Points forts de la v6.1.0

`v6.1.0` est la dernière version stable. Il se concentre sur un transfert de données plus rapide et plus sûr, le nouveau mode de liste d'analyse `MIX`, la maintenance étendue du Labs via UV Studio et plusieurs correctifs de fiabilité.

### Paquet de publication

Téléchargez le firmware et les fichiers qui l'accompagnent à partir de la page de version [v6.1.0](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). La version fournit les quatre éditions officielles (`Fusion`, `FieldOps`, `Transfer` et `Labs`), ainsi que le pilote CHIRP partagé correspondant. Choisissez l'édition par fonctionnalité plutôt que de traiter Fusion comme un package contenant toutes les fonctionnalités spécialisées.

### Mise à niveau à partir de la version 6.0.0

1. L'ancien firmware étant toujours installé, téléchargez la radio à l'aide de son pilote CHIRP correspondant et enregistrez cette image. Exportez éventuellement les lignes du canal mémoire au format CSV.
1. Sauvegardez l'étalonnage spécifique à l'appareil de la radio avec [UV Studio](./UV-Studio#calibration).
1. Flashez l'édition `v6.1.0` choisie. Effectuez une réinitialisation d'usine uniquement si les instructions de publication ou le chemin de migration de votre version installée l'exigent explicitement.
1. Chargez le pilote dédié `v6.1.0` CHIRP et téléchargez une nouvelle image à partir de la radio mise à jour.
1. Copiez les anciennes lignes de chaîne dans cette nouvelle image au lieu de télécharger l'ancienne image complète des paramètres.
1. Dans Labs, sélectionnez `v6.1.0` dans le catalogue d'applications versionné de UV Studio. Remplacez toute application overlay que le chargeur signale comme incompatible.
1. Avant d'utiliser AirCopy, mettez à jour les deux radios avec le firmware `v6.1.0` compatible ; son protocole radio optimisé n'est pas compatible filaire avec les versions antérieures.

Pour une copie de sécurité supplémentaire après l'installation de `v6.1.0` Labs, UV Studio peut enregistrer le Flash externe complet. Voir [Choisir la bonne sauvegarde ou copie](./UV-Studio#choosing-the-right-backup-or-copy).

### Performances du AirCopy et clonage de câbles

Le protocole `v6.1.0` AirCopy envoie jusqu'à trois blocs `64-byte` dans une trame FSK, réduisant ainsi les frais de traitement et rendant les transferts radio environ deux fois plus rapides. Il compare les hachages CRC32 en groupes comprenant jusqu'à des blocs `24` et envoie uniquement les blocs qui diffèrent sur la cible.

L'édition `Transfer` ajoute également `CABLE COPY` sur UART et une sélection `Flash 2M` par câble uniquement pour le clonage de Flash externe tout en excluant le secteur d'étalonnage spécifique à l'appareil. Les sélections de l'expéditeur et du destinataire sont validées avant l'écriture des données.

Il s'agit d'un nouveau protocole : les deux radios doivent exécuter le même firmware compatible. Voir [AirCopy](./AirCopy#v610-improvements).

### Liste d'analyse MIX

Le nouveau mode `MIX` analyse une sélection enregistrée de listes `01` à `24` comme un ensemble combiné. Sélectionnez `MIX` dans `ScList`, appuyez sur `M` pour ouvrir l'éditeur, basculez entre les listes avec `M` et enregistrez avec `EXIT`. L'éditeur affiche le nombre de listes sélectionnées, et au moins une liste doit rester activée.

Lors d'une analyse de mémoire active, la saisie de `25` sélectionne `MIX` ; `00` continue de sélectionner `ALL`. Voir [Scan](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` ajoute une sauvegarde et une restauration complètes sur Flash externe `2 MiB` pour Labs. La restauration préserve le secteur d'étalonnage spécifique à l'appareil, ignore les secteurs `4 KiB` identiques à l'aide de CRC32 lorsqu'il est pris en charge, vérifie chaque secteur écrit et redémarre la radio une fois terminé.

Une nouvelle récupération guidée du logiciel d'usine vérifie les images groupées par taille et SHA-256, restaure une image Flash externe reconstruite tout en préservant l'étalonnage, puis demande le mode DFU et installe le firmware d'origine UV-K1 ou UV-K5 V3 correspondant. L'interface regroupe également les opérations d'étalonnage et de démarrage du logo dans des vues de sauvegarde/restauration ou de téléchargement/téléchargement plus claires.

Ces outils Flash externes nécessitent `v6.1.0` Labs. Voir [UV Studio](./UV-Studio#version-status), [Sauvegarde et restauration Flash externe](./UV-Studio#external-flash-backup-and-restore-v160) et [Restauration du logiciel d'usine](./UV-Studio#factory-software-restoration-v160).

### Autres modifications de la version 6.1.0

La version ajoute également les jeux overlay [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll) et [`Space Impact`](./Overlay-applications#space-impact), ainsi que des correctifs concernant le journal RF entre les banques de configuration, le stockage des applications overlay, l'effacement de l'étalonnage et la gestion de la fin de transmission DCS.

## Points forts de la v6.0.0

`v6.0.0` est sorti le 10 septembre 2026. Il a introduit quatre éditions officielles, Multiboot et Multiconfig, la plate-forme d'applications superposées Labs, la fiable AirCopy et les applications indépendantes FoxHunt et Beacon.

### Quatre éditions officielles

| Édition | Utilisation prévue | Fonctionnalités supplémentaires |
| --- | --- | --- |
| `Fusion` | usage quotidien | édition de référence équilibrée; recommandé pour la plupart des utilisateurs |
| `FieldOps` | travail sur le terrain et premiers intervenants | RescueOps, résident FoxHunt et résident Beacon |
| `Transfer` | transfert de données radio à radio | AirCopy et résident Beam |
| `Labs` | expérimentation | RescueOps, AirCopy et applications overlay, notamment FoxHunt, Beacon et Beam |

Fusion `v6.0.0` n'inclut plus les fonctionnalités spécialisées v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon ou Breakout. Choisissez l'édition spécialisée appropriée lorsque l'une de ces fonctionnalités est requise.

### Applications indépendantes FoxHunt et Beacon

L'ancienne action combinée `FOX HUNT / BEACON` a été divisée avant la version `v6.0.0`. `FOX HUNT` et `BEACON` sont des actions programmables distinctes, des applications résidentes distinctes dans FieldOps et des applications overlay distinctes dans Labs.

Voir [FoxHunt](./Fox-Hunt) et [Beacon](./Beacon).

### Multiboot

Les éditions compatibles peuvent stocker quatre images supplémentaires du firmware F4HWN dans un Flash externe. Maintenez `M` (`MENU`) seul tout en allumant la radio pour ouvrir le sélecteur de démarrage, valider les images stockées et restaurer `Main` ou l'emplacement `1` vers `4`.

Le firmware protège automatiquement l'image normalement flashée sous le nom de `Main`, vérifie le CRC complet d'un emplacement avant d'effacer la mémoire Flash interne et enregistre son état actif de manière redondante. La vue `Firmware Slots` de UV Studio installe, vérifie, nomme et efface les quatre emplacements utilisateur lorsque la radio est en mode normal.

Seules les images `v6.0.0` compatibles Multiboot ou les images F4HWN plus récentes doivent être installées dans ces emplacements. Voir [Multiboot et Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig et SetCfg

Chaque emplacement de firmware sélectionne par défaut une banque de configuration distincte. Les canaux mémoire, les noms de canaux, les VFO, les listes de balayage et les paramètres radio restent donc isolés lors du changement d'édition. L'étalonnage, le logo de démarrage, les emplacements du firmware/application, l'état du Multiboot et le journal RF restent partagés.

Le nouveau menu `SetCfg` peut délibérément coupler le firmware en cours d'exécution avec une autre banque. `SysInf` affiche les badges `SLOT` et `CFG` indépendants, et UV Studio peut réinitialiser la configuration d'un emplacement utilisateur sans effacer son firmware.

Voir [Multiboot et Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) et [Menu](./Menu).

### AirCopy fiable avec accusés de réception

Air Copy attend désormais un accusé de réception après chaque bloc. Le destinataire vérifie le paquet avant de l'écrire et peut demander un renvoi ; l'expéditeur réessaye les blocs perdus, endommagés ou non reconnus jusqu'à trois fois. Les blocs en double sont reconnus en toute sécurité, de sorte qu'un ACK perdu ne désynchronise plus le transfert.

Un nouveau choix `All (Mem+Set)` transfère les huit banques et paramètres de 128 canaux en une seule exécution continue. L'écran indique la progression de `TX`/`RX` ainsi que le nombre de tentatives ou d'erreurs.

Voir [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Applications overlay dans Labs

L'édition expérimentale `Labs` peut installer de petits programmes `.app` dans Flash externe et les exécuter à partir d'une superposition de RAM `4 KiB` vérifiée. La vue `Apps` de UV Studio, marquée `Labs only`, installe, vérifie, répertorie et supprime les applications ; `F + 7` ouvre le lanceur radio.

Le chargeur valide le format de l'application, la compatibilité ABI/API, les fonctionnalités requises, l'adresse RAM, la taille et le code CRC avant l'exécution. Les applications disponibles incluent des outils radio tels que Broadcast FM, FoxHunt, Beacon et Beam, ainsi que Breakout, Tetris, Cube3D et Plasma.

Voir [Applications overlay](./Overlay-apps) pour l'installation et la compatibilité, et [Applications overlay](./Overlay-applications) pour l'objectif et les contrôles de chaque application.

### Mode de saisie Beacon (TONE / CARR)

Beacon obtient un paramètre de mode de saisie sur la clé `4`. `TONE` (par défaut) est le comportement précédent : une porteuse FM continue avec la tonalité `1000 Hz` saisie pour chaque élément Morse (MCW / F2A). `CARR` interrompt la porteuse elle-même pour chaque élément, reproduisant le modèle d'interruption de porteuse que de nombreux renards ARDF utilisent sur le terrain : le signal disparaît entre les éléments, ce qui rend la radiogoniométrie plus difficile et permet à un simple récepteur AM de le copier. Le paramètre est enregistré et inclus dans les transferts AirCopy, et est disponible dans le Beacon résident et superposé. Voir [Beacon](./Beacon#timing-and-keying).

## Points forts de la v5.9.0

Ces modifications ont été développées après `v5.8.0` et publiées dans `v5.9.0`.

### Navigateur de menus catégorisés

Les versions de développement Fusion ouvrent le menu sur un écran de catégorie au lieu d'afficher immédiatement la liste plate d'origine. Les catégories disponibles sont `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` et `DTMF`. Le démarrage par menu caché ajoute également une catégorie `Service`.

La catégorie `All` conserve l'ordre du menu plat et la numérotation globale d'origine. La saisie d'un numéro de menu directement à partir de l'écran de catégorie passe également à `All`, de sorte que les raccourcis de menu numérotés existants continuent de fonctionner. Le firmware mémorise la dernière catégorie sélectionnée et le dernier élément utilisé dans chaque catégorie pour la session en cours.

Voir [Menu](./Menu#categorized-menu-browser).

### Sélecteur d'action à touche latérale

Après avoir appuyé sur `F`, maintenez l’un ou l’autre bouton latéral pour ouvrir un sélecteur d’action temporaire. Utilisez `UP` / `DOWN` sur UV-K5 ou `LEFT` / `RIGHT` sur UV-K1 pour parcourir les actions de raccourci compilées disponibles et appuyez sur `M` pour exécuter l'action en surbrillance. `EXIT` ou `F` annule le sélecteur ; appuyer sur `PTT` le ferme et continue la gestion normale de la transmission.

Le sélecteur se ferme automatiquement après environ cinq secondes ou lorsque la réception démarre. Chaque bouton latéral mémorise sa dernière sélection jusqu'au redémarrage de la radio. Une courte pression normale sur le bouton latéral `F` + conserve son comportement d'augmentation/d'abaissement existant.

Voir [Fonctions des boutons](./Button-functions#side-key-action-picker).

### Améliorations de Fox Hunt / Beacon

Fox Hunt ajoute deux étapes de gain frontal plus profondes après les paramètres d'origine `ATT 0`, `ATT 6`, `ATT 15` et `ATT 27`. Ils sont présentés sous les noms `BYP` et `BYP+` ; ces noms décrivent des modes pratiques à courte portée, et non un contournement matériel littéral. Les touches de navigation (`UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1) modifient désormais directement l'atténuation.

Après un changement de gain, le firmware laisse brièvement le détecteur RSSI se stabiliser, puis réinitialise les références de crête, de minimum, de tendance et d'historique du signal. Cela évite les pics obsolètes et les sauts artificiels lors du déplacement entre les plages de gain.

Maintenir `F` pendant environ 0,5 seconde active un verrouillage temporaire du clavier partagé par Fox Hunt et Beacon. Dans Fox Hunt, les touches de navigation restent disponibles pour l'atténuation lorsqu'elles sont verrouillées. Dans Beacon, toutes les commandes normales sont bloquées jusqu'à ce qu'un même appui long déverrouille le clavier, y compris lors d'une transmission active.

Fox Hunt et Beacon ignorent désormais tous deux le minuteur d'inactivité normal de `SetOff` et restent actifs jusqu'à ce qu'ils soient explicitement quittés. Leur délai d'expiration ordinaire du rétroéclairage et les mises à jour de la batterie continuent de fonctionner.

Voir [Fox Hunt et Beacon](./Fox-Hunt-and-Beacon).

### Correctifs de scan et de diffusion FM

Pendant l'analyse de la mémoire, la modification de la liste d'analyse active bloque temporairement la reprise de l'analyse pendant que le nom de la liste d'analyse est réellement affiché. Cela maintient la jauge de progression cachée et la position de scan synchronisées. Les analyses de fréquence et de plage ne sont pas interrompues car elles n'affichent pas la superposition de noms.

Une recherche active de station de diffusion FM ignore désormais un signal entrant détecté sur le canal radio principal, de sorte que la recherche FM n'est pas interrompue. L'écoute normale du FM cède toujours à la réception du canal principal comme auparavant.

Voir [Scan](./Scanning#changing-the-scan-list-during-scan) et [Récepteur de diffusion FM](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## Points forts de la v5.8.0

Ces modifications sont basées sur les validations après la balise `v5.7.0` dans `feature_update_v5`.

### Chasse au renard / Beacon

Les builds Fusion ajoutent une action `FOX HUNT / BEACON` programmable avec deux modes complémentaires :

* Fox Hunt fournit un affichage `dBm` calibré, des lectures de S-mètre et de crête, une tendance du signal sur une seconde, une atténuation sélectionnable, un son de style Geiger ou de station reçue, et un choix entre une jauge d'escalier et un historique de signal d'environ 18 secondes.
* Beacon utilise le TX actif VFO pour transmettre un identifiant ARDF ou `<CALLSIGN> MOE` en Morse, avec des intervalles silencieux réglables de `5` à `60-second` TX et de `5` à `240-second`.

Beacon prend son indicatif de CHIRP `Message Line 1` et commence sa première transmission immédiatement lorsqu'elle est sélectionnée. Avant chaque rafale, le firmware vérifie le verrouillage de fréquence TX applicable, le `TXLock` par VFO, l'état de la batterie et la restriction de modulation.

L'atténuation, la jauge, le mode audio et l'intervalle Beacon sont enregistrés dans un flash externe et sont inclus dans les transferts Air Copy `Settings`.

Voir l'historique [Page de compatibilité Fox Hunt / Beacon](./Fox-Hunt-and-Beacon). Pour le firmware actuel, utilisez les pages [FoxHunt](./Fox-Hunt) et [Beacon](./Beacon)] distinctes.

## Points forts de la version 5.7.0

Ces modifications sont basées sur les validations après la balise `v5.6.1` dans `feature_update_v5`.

### UV Studio


Il fournit une mise en miroir d'écran en direct et un contrôle par clavier non TX, une visualisation et une analyse compatibles des journaux RF, une exportation CSV des journaux RF, le flashage du firmware, une sauvegarde/restauration d'étalonnage et une gestion personnalisée du logo de démarrage. Il s'exécute localement via `Web Serial` sans installation, serveur ou compte.


### Journal RF

Les versions avec la journalisation RX/TX ajoutent une action de raccourci programmable `RF LOG`.

Le journal RF enregistre les sessions de réception, de surveillance et de transmission dans un flash externe, puis les affiche dans une vue historique la plus récente. Chaque entrée peut afficher le nom ou la fréquence du canal, la direction RX/TX, la durée, le S-mètre RX ou le niveau de puissance TX et la tension de batterie la plus basse observée pendant la session.

L'écran de journal prend en charge :

* Filtres `ALL`, `RX` et `TX`
* jusqu'à 512 entrées de trafic visibles
* Accédez aux raccourcis les plus récents et aux plus anciens avec `F` plus les touches de navigation (`UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1)
* un flux de confirmation clair avant d'effacer le journal

Voir [Fonctions avancées](./Advanced-features#rf-log) et [Fonctions des boutons](./Button-functions#rf-log-action).

### Exclusions de ScanRange

`ScnRng` peut désormais conserver jusqu'à `64` fréquences exclues temporairement, au lieu de `32`.

Comme auparavant, la liste est circulaire, n'est pas écrite en mémoire et est effacée lorsque la radio redémarre ou lorsque l'identité de portée change.

Voir [Scan](./Scanning#excluding-frequencies-in-scnrng).

### Portée du verrouillage SetLck

`SetLck` propose désormais quatre choix au lieu de deux :

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` couvre les raccourcis programmables attribués aux deux boutons latéraux et `M Long`. Cela permet de conserver ces raccourcis disponibles lors du verrouillage du clavier avant, ou de les désactiver dans le cadre du verrouillage. Le `PTT` peut être verrouillé indépendamment pour éviter une transmission accidentelle.

Voir [Menu](./Menu#main-menu) et [Fonctions des boutons](./Button-functions#keypad-lock-and-setlck).

### Entretien UV Studio

Le code de diffusion d'écran côté firmware a été renommé en interne de la gestion des captures d'écran à la gestion UV Studio. Les versions qui activent le pont optionnel RX/TX-log UV Studio peuvent également diffuser les lignes récentes du journal RF vers des outils de visualisation compatibles.

Voir [Fonctionnalités avancées](./Advanced-features#k5-viewer).

## Points forts de la v5.6.0

Ces modifications sont basées sur les validations post-`v5.5.0` dans `feature_update_v5`.

### Économiseur d'écran SetSav

Les versions avec prise en charge de l'économiseur d'écran ajoutent le menu `SetSav`.

Modes disponibles :

* `OFF` : pas d'économiseur d'écran
* `LOGO` : afficher le logo de démarrage stocké comme écran de veille
* `LOGO+` : affiche le logo de démarrage stocké avec un effet de défilement
* `MATRIX` : afficher un écran de veille animé de style matriciel

`SetSav` est lié au délai d’expiration du rétroéclairage. Il peut s'afficher sur l'écran principal et l'écran de diffusion FM lorsque la radio est inactive, et il est suspendu pendant le balayage RX, TX, PTT, BEAM et FM actif.

Voir [Utilisation de la radio](./Radio-operation#screen-saver-and-backlight-timeout) et [Menu](./Menu#main-menu).

Étant donné que `SetSav` est inséré avant le menu masqué, les index du menu masqué se déplacent d'un dans `v5.6.0` : `F Lock` commence à `72` au lieu de `71`.

### Son de démarrage du logo de démarrage

Lorsque `POnMsg = LOGO`, le mode logo de démarrage peut toujours conserver le comportement normal du bip de démarrage.

Voir [Menu](./Menu#main-menu) et [UV Studio](./UV-Studio#boot-logo).

### Scanner l'indicateur RSSI

Les versions d'analyse rapide peuvent afficher une petite ligne sparkline RSSI pendant l'analyse. Il donne une vue compacte des échantillons RSSI récents afin que les candidats les plus forts se démarquent visuellement pendant l'exécution de l'analyse.

Voir [Scan](./Scanning#scan-indicators-and-detection).

### Détection subaudible sur la plage de balayage

`ScnRng` peut détecter CTCSS / DCS à l'arrêt sur un signal reçu. Le code subaudible détecté est affiché dans l'interface utilisateur de scan lorsqu'il est disponible.

Voir [Scan](./Scanning#scan-indicators-and-detection).

### Interface utilisateur de copie de fréquence

L'écran du scanner de copie de fréquence `F+4` sépare désormais plus clairement l'état de recherche et le résultat :

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* détails détectés sur `Freq:` et `Tone:`

Voir [Scan](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### UV Studio et mises à jour de captures d'écran

Les images de l'économiseur d'écran sont synchronisées avec UV Studio et la gestion des captures d'écran a été optimisée pour réduire l'utilisation de la RAM et éviter les morceaux obsolètes.

Voir [Fonctionnalités avancées](./Advanced-features#k5-viewer).

### Corrections et améliorations

Cette version comprenait également plusieurs correctifs de comportement et améliorations de l'interface utilisateur :

* Bandscope / arrondi de fréquence du spectre pour les étapes `8.33 kHz`
* Reconfiguration de la double montre AM vers FM RX
* Emplacement de l'icône de verrouillage VFO pendant la scan
* cas de bord de veille/réveil avec économiseur d'écran
* icône creuse de rétroéclairage manuel lorsque la lumière manuelle est éteinte

## Points forts de la v5.5.0

### Moteur d'analyse plus rapide

Les versions actuelles peuvent utiliser le nouveau moteur d'analyse `FAST` pour l'analyse de la mémoire et `ScnRng`.

Le menu `SetScn` sélectionne entre :

* `NORMAL` : le chemin d'analyse conservateur
* `FAST` : un chemin plus rapide qui pré-vérifie les canaux ou les étapes de plage avec RSSI avant de procéder à la configuration complète de la réception

Dans des conditions favorables, le `ScnRng` en mode `FAST` peut scanner autour des fréquences `150+` par seconde.

Voir [Scan](./Scanning#scan-engine-mode-normal-vs-fast) et [Menu](./Menu#main-menu).

### Exclusions temporaires de la plage d'analyse

Pendant qu'un balayage `ScnRng` est arrêté sur une fréquence reçue, appuyez longuement sur `MENU` pour exclure cette fréquence du balayage de plage actuel.

Cela a été introduit avec les emplacements `32` dans `v5.5.0` ; Les versions actuelles post-`v5.6.1` autorisent les exclusions temporaires de `64`. Ces exclusions sont effacées lorsque la radio redémarre ou lorsque l'identité de portée change.

Voir [Scan](./Scanning#excluding-frequencies-in-scnrng).

### Mode de transfert BEAM

Les versions prenant en charge BEAM peuvent envoyer le VFO actuel ou la configuration du canal mémoire à une autre radio, ou recevoir un paquet BEAM et l'enregistrer dans le premier canal mémoire libre.

BEAM est ouvert via une action de raccourci programmable.

Voir [Fonctions avancées](./Advanced-features#beam-transfer-mode) et [Fonctions des boutons](./Button-functions#beam-action).

### Logo de démarrage personnalisé

Les versions avec prise en charge du logo peuvent afficher un logo de démarrage monochrome `128x64` personnalisé au démarrage.

Téléchargez ou téléchargez le logo avec UV Studio, puis sélectionnez `LOGO` dans le menu `POnMsg`.

Voir [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu) et [Dépannage](./Troubleshooting#my-custom-boot-logo-does-not-show).

### Améliorations de l'affichage des DCS / CTCSS

Les menus `RxDCS`, `TxDCS`, `RxCTCS` et `TxCTCS` affichent désormais à la fois la position d'entrée sélectionnée et l'index homologué lorsqu'il en existe.

Cela facilite la distinction de la position normale dans la liste, des entrées homologuées PMR446, des tonalités supplémentaires et des entrées DCS inversées.

Voir [Menu](./Menu#main-menu).

### Modification du nom de la chaîne

L'édition du `ChName` a été améliorée avec la saisie multi-touches, la commutation majuscules/minuscules, la saisie numérique directe avec des pressions longues sur les touches et un comportement plus clair du `EXIT`.

Voir [Menu](./Menu#main-menu).

### Persistance de l'analyseur de spectre

L'analyseur de spectre enregistre désormais davantage de paramètres lorsque vous quittez l'écran de balayage avec `EXIT`, notamment le mode de déclenchement, le profil de sensibilité automatique, l'échelle manuelle et le niveau de déclenchement.

Le démarrage de l'analyseur à partir de `ScnRng` n'écrase plus l'étape de scan ou la préférence de nombre de barres enregistrée.

Voir [Analyseur de spectre](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf et informations de construction

`SysInf` est désormais paginé dans les versions actuelles. En fonction des options de construction, il peut afficher l'identité, la date/heure de construction, l'identifiant de validation, les informations sur la batterie, l'utilisation de la mémoire et les liens de projet QR-code.

Voir [Menu](./Menu#main-menu).

### Couverture des paramètres Air Copy

Les transferts Air Copy `Settings` incluent désormais la zone VFO utilisée par des fonctionnalités telles que `ScnRng`, de sorte que les fréquences limites de la plage de balayage sont répliquées lors de la copie des paramètres.

Voir [AirCopy](./AirCopy).

## Les modifications récentes de la version 5.x méritent également d'être connues

Les modifications suivantes sont arrivées peu avant `v5.5.0` et sont documentées dans le wiki car elles affectent l'utilisation quotidienne :

* `SetRxA` sélectionne différents profils audio RX pour `FM` et `AM` ; dans `AM`, il peut basculer entre `SHARP`, `STOCK` et `OPEN`.
* les listes d'analyse prennent en charge les noms courts et l'analyse de la mémoire peut basculer entre des listes valides non vides pendant l'analyse.
* Les radios de diffusion `SysInf`, FM et l'interface utilisateur de l'analyseur de spectre ont été affinées dans les versions récentes.
* le menu caché `SetNav` permet à la même documentation de fonctionner pour les styles de navigation `UV-K1` et `UV-K5 V3`.

Voir [Menu](./Menu), [Scan](./Scanning), [Utilisation de la radio](./Radio-operation) et [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver).

## Pages connexes

* [Mise en route](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [Applications overlay](./Overlay-apps)
* [Applications overlay](./Overlay-applications)
* [Scan](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Fonctions des boutons](./Button-functions)
* [Fonctionnalités avancées](./Advanced-features)
* [Analyseur de spectre](./Spectrum-analyzer)
* [Menu](./Menu)
