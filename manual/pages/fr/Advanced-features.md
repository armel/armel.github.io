# Fonctionnalités avancées

Cette page couvre les fonctionnalités spécialisées ou optionnelles qui ne sont pas nécessaires au fonctionnement de base de la radio : BEAM, journal RF, RescueOps, UV Studio, le mode de reprise, le jeu intégré et la procédure de déverrouillage TX orientée recherche. AirCopy, FoxHunt, Beacon, Multiboot et les applications overlay ont leurs propres pages détaillées.

Pour l'utilisation quotidienne de la radio, voir [Utilisation de la radio](./Radio-operation). Pour les fonctionnalités liées à la scan, voir [Scanning](./Scanning).

> [!NOTE]
> Lorsque cette page mentionne `UP` / `DOWN`, utilisez les clés équivalentes `LEFT` / `RIGHT` sur UV-K1. La disposition de navigation active suit `SetNav`.

## AirCopy

AirCopy transfère les banques de mémoire et les paramètres entre les radios compatibles. `v6.0.0` a ajouté des blocs reconnus, des tentatives, une gestion des doublons et `All (Mem+Set)`. `v6.1.0` ajoute des cadres multiblocs, la comparaison et le saut de blocs identiques, le transport par câble et le clonage Flash externe protégé dans l'édition Transfer.

Voir [AirCopy](./AirCopy) pour connaître la disponibilité de l'édition, les contrôles, la compatibilité des protocoles, les transferts radio, les informations de sécurité `CABLE COPY` et `Flash 2M`.

## Multiboot, Multiconfig et applications overlay

`v6.0.0` ajoute deux plates-formes plus grandes documentées séparément :

* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig) expliquent `Main` ainsi que quatre emplacements de firmware, le sélecteur de démarrage, les banques de configuration indépendantes, `SetCfg` et la gestion des emplacements UV Studio.
* [Applications overlay](./Overlay-apps) explique la plate-forme expérimentale `.app` réservée aux laboratoires, l'installation via UV Studio, le lanceur `F + 7`, les vérifications de compatibilité et le développement d'applications.

## Mode de transfert BEAM

BEAM est un mode de transfert direct en option pour un VFO ou un canal mémoire. Contrairement au [AirCopy](./AirCopy), qui transfère des banques de mémoire ou des sections de paramètres, le BEAM est destiné à partager rapidement la configuration actuellement sélectionnée avec une autre radio compatible.

Attribuez `BEAM` à l'un des raccourcis personnalisables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), puis déclenchez ce raccourci pour ouvrir le mode BEAM.

En mode BEAM :

* `UP` / `DOWN` bascule entre `BEAM TX` et `BEAM RX`
* `M` démarre l'opération sélectionnée
* `EXIT` quitte le mode BEAM

`BEAM TX` envoie la configuration actuelle du VFO ou du canal mémoire, y compris la fréquence, le décalage, les tonalités, la modulation, la bande passante, la puissance, l'affectation de la liste de balayage, le compandeur, les paramètres liés au DTMF lorsqu'ils sont activés et le nom du canal.

`BEAM RX` attend un paquet BEAM provenant d'une autre radio et l'enregistre dans le premier canal mémoire libre. Si la mémoire est pleine, l'état indique `MEM FULL`.

Voir [Fonctions des boutons](./Button-functions#beam-action) pour les détails au niveau des raccourcis.

## FoxHunt

[FoxHunt](./Fox-Hunt) est une application de réception uniquement de force de signal et de radiogoniométrie. Depuis `v6.0.0`, il possède sa propre action de raccourci `FOX HUNT`. Il réside dans FieldOps et est disponible sous forme d'application overlay installable dans Labs.

## Beacon

[Beacon](./Beacon) est une application de transmission Morse de type ARDF distincte avec sa propre action de raccourci `BEACON` et ses propres exigences de sécurité. Il réside dans FieldOps et est disponible en tant qu'application overlay installable distincte dans Labs.

## Journal RF

Les versions avec la journalisation RX/TX ajoutent une action de raccourci `RF LOG`. Attribuez-le à `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`, puis déclenchez ce raccourci pour ouvrir l'écran d'historique.

Le journal RF enregistre les sessions de réception, de surveillance et de transmission vers un flash externe. Il est utile pour vérifier l'activité récente après une analyse, surveiller un canal sans surveillance ou examiner les transmissions effectuées lors d'une utilisation sur le terrain.

Chaque entrée de trafic enregistrée stocke :

* fréquence, ou la référence du canal mémoire lorsque la session provenait d'un canal enregistré
* Sens RX ou TX
* durée de la séance
* Niveau de crête du compteur S RX pour les sessions reçues ou niveau de puissance TX pour les sessions transmises
* tension de batterie la plus basse mesurée pendant la session

La vue du journal affiche en premier les dernières entrées et expose jusqu'à 512 entrées de trafic. Lorsque le filtre `ALL` est sélectionné, des lignes de séparation horizontales marquent les redémarrages de la radio.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Contrôles sur l'écran du journal RF :

* `UP` / `DOWN` : faire défiler les entrées
* `F` + `UP` : passer à l'entrée la plus récente
* `F` + `DOWN` : passer à l'entrée visible la plus ancienne
* `M` : faites défiler le filtre entre `ALL`, `RX` et `TX`
* `* SCAN` : faites défiler le badge de détail du côté droit entre la durée, la puissance du compteur S/TX et la tension de batterie la plus basse
* appuyez longuement sur `M` : ouvrez la confirmation claire ; appuyez à nouveau longuement sur `M` sur `CLEAR LOG / SURE?` pour effacer le journal
* `EXIT` : quittez l'écran du journal RF ou annulez la confirmation d'effacement.

Le journal est stocké dans une zone flash externe réservée, de sorte qu'il survit aux cycles d'alimentation normaux. Effacer le journal efface cette zone réservée.

Voir [Fonctions des boutons](./Button-functions#rf-log-action) pour les détails au niveau des raccourcis.

## RescueOps

### Avis de non-responsabilité

Je tiens à préciser que je ne suis pas un expert en services d'urgence; cependant, cette fonctionnalité spéciale a été développée dans le but de répondre le plus efficacement possible aux besoins de communication des premiers intervenants. Je suis ouvert aux suggestions d'amélioration des professionnels, dans la limite de mes capacités, du temps dont je dispose et des capacités techniques de l'émetteur-récepteur.

### Aperçu

La fonctionnalité RescueOps a été spécifiquement développée pour s'intégrer dans un système de communication destiné aux premiers intervenants (pompiers, etc.). Il ajoute des contrôles de champ restreints et un comportement amélioré de la lampe de poche, qui peut être réglé sur les modes fixe, clignotant ou SOS. Le menu `SetKey` sélectionne la clé de démarrage utilisée avec `PTT` pour entrer ou quitter le mode RescueOps. Par défaut, la clé est `MENU`, mais elle peut également être `UP`, `DOWN`, `EXIT` ou `* SCAN`.

Dans la famille officielle `v6.0.0`, RescueOps est inclus dans `FieldOps` et `Labs`. AirCopy est une fonctionnalité distincte fournie par `Transfer` et `Labs` ; l'activation de RescueOps n'active pas en soi AirCopy.

### Utilisation

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), membre du « [Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco) », a rédigé une [documentation](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) spécifiquement dédiée à l'utilisation de la fonctionnalité RescueOps. Un grand merci à lui.

Par défaut, l'émetteur-récepteur fonctionne comme toute autre version du firmware, permettant l'accès aux menus (et aux menus cachés), aux appuis longs ou aux combinaisons de touches `F` pour activer diverses fonctions directement depuis le clavier (par exemple, pour démarrer un scan ou régler la puissance de transmission), ainsi qu'aux raccourcis.

Cependant, si l'émetteur-récepteur est allumé en appuyant à la fois sur `PTT` et sur la touche configurée dans le menu `SetKey`, il passera en mode RescueOps, déclenchant les changements suivants :

* le menu est verrouillé
* les appuis longs et les combinaisons de touches `F` sont désactivés (sauf `A/B` et le verrouillage du clavier)
* le redémarrage en mode menu caché est bloqué
* le clavier ne peut être utilisé que pour changer de canal mémoire, tout comme les touches `UP` et `DOWN`

Les appuis courts et longs sur `F1` et `F2`, ainsi que les appuis longs sur `M`, restent disponibles pour les raccourcis. Cette configuration relève de la responsabilité de la personne en charge de la mise en place de l'émetteur-récepteur. Si les raccourcis ne sont pas souhaités, ils peuvent simplement être définis sur l'action `NONE`.

Notez que la fonctionnalité RescueOps propose 2 nouvelles actions :

* `POWER HIGH`, qui vous permet de passer rapidement et temporairement à la puissance maximale du `5 W` si nécessaire
* `REMOVE OFFSET`, pour supprimer temporairement le décalage d'un canal mémoire s'il est présent

Ces 2 actions ont été ajoutées à la demande des professionnels du secours et correspondent aux besoins du terrain.

Une fois en mode RescueOps, chaque démarrage normal maintient l'émetteur-récepteur dans ce mode. Pour revenir au mode par défaut, avec accès aux menus et menus cachés, répétez simplement l'opération de démarrage en appuyant à la fois sur la touche `PTT` et sur la touche configurée dans le menu `SetKey`.

## Jeu

Ce firmware comprend un petit jeu en petits groupes.

* Dans les versions sans applications overlay, appuyez sur `F+7` pour démarrer le jeu résident.
* Dans l'édition `Labs`, `F+7` ouvre le [lanceur d'applications superposées](./Overlay-apps) ; installez et sélectionnez `Breakout` ou un autre jeu là-bas.
* Pour quitter, appuyez sur `EXIT`
* Vous pouvez mettre le jeu en pause avec `M`
* Déplacez la palette en utilisant `4` ou `UP` pour aller à gauche, et `0` ou `DOWN` pour aller à droite.

Ce jeu n'a pas d'ambition au-delà du plaisir. L'idée était simplement d'explorer ce qui est possible sur le Quansheng K5 ainsi que ses fonctionnalités radio. Considérez-le comme un clin d’œil ludique à l’ère Nokia 3310.

![Jeu](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## Mode Reprise

Votre émetteur-récepteur redémarrera dans le même état dans lequel il se trouvait avant d'être éteint. Ainsi, s'il était en mode Bandscope, écoutant une diffusion FM ou scannant, il reprendra automatiquement cet état au prochain démarrage.

## TX sur toutes les bandes

### Avertissement

**Cette modification n'est PAS TESTÉE et est UNIQUEMENT À DES FINS DE RECHERCHE, pour explorer les capacités de l'appareil et de son chipset. NE PAS transmettre sur des fréquences illégales. UTILISEZ une charge factice. Le(s) auteur(s) et contributeur(s) de ce référentiel ne sont PAS responsables des dommages, litiges ou autres conséquences de la mauvaise utilisation de ce firmware de recherche et n'acceptent aucune culpabilité. En installant n'importe quel firmware à partir de ce référentiel, vous acceptez l'entière responsabilité de toutes les conséquences qui pourraient en découler et renoncez au droit d'engager des poursuites judiciaires contre le(s) auteur(s).**

Cette option ne vous permettra pas de transmettre dans une modulation autre que FM ; il s'agit d'une limitation matérielle. Le passage à AM ou SSB modifie uniquement le mode de sortie audio AF du circuit intégré RF. Il ne fait pas passer l'ensemble du circuit intégré en mode AM / SSB. Ceci est uniquement destiné à l'écoute. Ce firmware est également construit avec un verrou supplémentaire qui bloque TX lorsque AM ou SSB est activé.

Pour illustrer pourquoi cela ne doit pas être utilisé pour les communications réelles, considérez le tableau suivant pour la puissance de transmission à `27.254 MHz` :

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` -> **228 microwatts**
* `54 MHz` -> 2,4 milliwatts
* `81 MHz` -> 230 milliwatts
* `109 MHz` -> 558 milliwatts
* `136 MHz` -> 412 milliwatts
* `163 MHz` -> 122 milliwatts
* `190 MHz` -> 14,8 milliwatts
* `218 MHz` -> 2 milliwatts
* `245 MHz` -> 2,6 milliwatts

Crédits : [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Comment débloquer TX sur toutes les bandes

1. Allez dans le [menu caché](./Menu#hidden-menu)
1. Entrer dans le menu `F Lock`
1. Choisissez l'option `UNLOCK ALL`
1. Répétez les étapes 2 à 3 **3 fois**. Faites-le avec soin. Si vous confirmez une autre option dans le processus, le compteur est réinitialisé et vous devrez répéter la procédure.

## Pages connexes

* [Mise en route](./Getting-started)
* [Utilisation de la radio](./Radio-operation)
* [Scan](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [Applications overlay](./Overlay-apps)
* [Fonctions des boutons](./Button-functions)
* [Dépannage](./Troubleshooting)
