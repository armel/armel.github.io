# Fonctions des boutons

Les boutons peuvent déclencher des fonctions de deux manières :

1. appuyez d'abord sur le bouton `F #`, puis sur le bouton cible (écrit ci-dessous comme `F+`)
2. appuyez longuement sur le bouton cible directement

Dans de nombreux cas, un appui long reproduit l'action `F+`, mais certains boutons ont un comportement d'appui long différent.

## Rappels rapides

* `F+` signifie : appuyez sur `F #`, puis appuyez sur le bouton cible.
* les étiquettes de navigation peuvent être `UP` / `DOWN` ou `LEFT` / `RIGHT`, selon le modèle et `SetNav`
* les raccourcis programmables sont répertoriés dans [Fonctions des boutons personnalisés](#custom-button-functions)
* introduit dans Fusion `v5.9.0` et disponible dans les éditions v6 actuelles, appuyer sur `F` puis **maintenir** un bouton latéral ouvre le [sélecteur d'action à touche latérale](#side-key-action-picker)

## Clavier avant

### `M`
* appui court - entrer dans le menu
* appuyez brièvement pendant le balayage des canaux/fréquences - le dernier canal trouvé est conservé à l'écran
* appui long pendant le balayage des canaux - exclure temporairement un canal mémoire (ne fonctionne pas avec `* SCAN ALL`)
* appui long - programmable par l'utilisateur dans le menu : `M Long`
### `EXIT`
* appui court - quitte le menu/la fonction actuelle, supprime un chiffre dans une zone de saisie
* appui long - supprime toutes les entrées, quitte la zone de saisie DTMF, quitte le mode moniteur, quitte `ScnRng`
### `UP` et `DOWN`
* se déplacer de haut en bas dans les menus, la fréquence, les paramètres et d'autres listes
* `F+` - augmente ou diminue la valeur du Squelch.
### `1 BAND`
* `F+`
  * en **mode fréquence** - change les bandes de fréquence `1` en `7` ; il existe également la bande `7+` pour les fréquences supérieures à `1 GHz`
  * en **mode canal** - les paramètres du canal sont copiés en mode fréquence
* appui long
  * en **mode radio normal** - idem
  * en **mode de diffusion FM** - fait défiler les plages de fréquences de diffusion FM ; voir [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - commutateurs principaux VFO supérieur/inférieur (marqué par `►`)
* appui long - pareil
### `3 VFO/MR`
* `F+` - bascule entre le mode fréquence et le mode canal
* appui long - pareil
### `4 FC`
* `F+` - active la fréquence et le mode de copie CTCSS. Commencez à transmettre avec l'autre radio et la fréquence et le code CTCSS seront détectés. Vous pouvez enregistrer ces paramètres avec le bouton `M`
* appui long - pareil
### `5 NOAA`
* `F+` - active l'analyseur de spectre
* appui long
   * en **mode canal** - fait défiler le canal mémoire sélectionné à travers son affectation de liste de scrutation : `OFF`, `1` à `24`, puis `ALL`
   * en **mode fréquence** - active la [fonction de plage de balayage](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - bascule les niveaux de puissance pour le canal actuel
* appui long - pareil
### `7 VOX`
* `F+`
  * dans l'édition `Labs` - ouvre le [lanceur d'applications superposées](./Overlay-apps)
  * dans les versions avec le jeu résident et sans chargeur d'application superposée - démarre Breakout
* appui long - active/désactive le mode VOX lorsque VOX est activé
### `8 R`
* `F+` - permet la gestion manuelle du rétroéclairage et allume ou éteint le rétroéclairage
* appui long - active le mode inverse pour les canaux pour lesquels un décalage de fréquence est défini. Il remplace la fréquence TX par la fréquence RX
### `9 Call`
* `F+` - désactive la gestion manuelle du rétroéclairage
* appui long - commute la chaîne actuelle sur la chaîne `1-Call` définie dans la radio.
### `0 FM`
* `F+` - allume la radio FM
* appui long - pareil
### `* SCAN`
* appui court - passe en mode de saisie DTMF
* `F+` - allume le scanner DCS / CTCSS pour la fréquence actuelle
* appui long
   * en **mode canal** - active le scanner de canaux
   * en **mode fréquence** - active le scanner de fréquence (peut utiliser la [fonction de plage de balayage](./Scanning#scan-frequency-range-function))
* pendant que l'analyse de la mémoire est en cours, `F+` ou un appui long sur `* SCAN` passe à la prochaine liste d'analyse valide non vide
### `F # 🗝`
* appui court - bascule le modificateur de fonction `F+`
* appui long - active ou désactive le verrouillage du clavier ; le menu `SetLck` sélectionne si le verrou couvre également les actions de raccourci programmables et/ou `PTT`

### Verrouillage du clavier et SetLck

Le verrouillage du clavier désactive toujours le clavier avant, sauf qu'un appui long sur `F #` reste disponible pour déverrouiller la radio. Le menu `SetLck` étend le verrouillage à d'autres commandes :

* `KEYS` : les deux raccourcis latéraux, `M Long` et `PTT` restent disponibles
* `KEYS + ACTIONS` : les raccourcis programmables attribués à `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` et `M Long` sont également désactivés ; `PTT` reste disponible
* `KEYS + PTT` : `PTT` est également désactivé pour empêcher une transmission accidentelle ; les raccourcis programmables restent disponibles
* `KEYS + ACTIONS + PTT` : le clavier avant, les raccourcis programmables et `PTT` sont tous désactivés

## Boutons latéraux

### `PTT`
* Bouton Push-To-Talk. Il existe 2 modes : CLASSIC et ONEPUSH (voir menu `SetPTT`)
  * CLASSIQUE - PTT fonctionne comme d'habitude. Appuyez sur le PTT pour commencer la transmission et relâchez-le pour arrêter.
  * ONEPUSH - PTT fonctionne comme un interrupteur. Appuyez sur le PTT pour commencer la transmission et relâchez-le quand vous le souhaitez. La transmission est toujours active. Appuyez à nouveau sur le PTT quand vous le souhaitez, puis relâchez-le pour arrêter la transmission. Cela fonctionne comme sur OpenGD77 (si vous le connaissez).

* lorsque ce bouton est utilisé pour arrêter le balayage des canaux/fréquences, le dernier canal trouvé est conservé à l'écran
* maintenu avec `Side button 2️⃣`, transmet la tonalité `1750 Hz`
* maintenu ensemble avec l'un des boutons du clavier avant transmet les codes DTMF

### `Side button 1️⃣`
* appui court - programmable par l'utilisateur dans le menu : `F1Shrt`
* appui long - programmable par l'utilisateur dans le menu : `F1Long`
* `F` puis appuyez brièvement - augmente la valeur du pas en mode VFO
* `F` puis maintenez - ouvre le sélecteur d'action à touche latérale

### `Side button 2️⃣`
* appui court - programmable par l'utilisateur dans le menu : `F2Shrt`
* appui long - programmable par l'utilisateur dans le menu : `F2Long`
* ce bouton peut également être utilisé pour envoyer la tonalité `1750 Hz` en le maintenant avec le bouton `PTT`
* `F` puis appuyez brièvement - diminue la valeur du pas en mode VFO
* `F` puis maintenez - ouvre le sélecteur d'action à touche latérale

### Sélecteur d'action à touche latérale

Le sélecteur d'actions exécute un raccourci disponible sans modifier les fonctions enregistrées dans `F1Shrt`, `F1Long`, `F2Shrt` ou `F2Long`.

Depuis l'écran radio normal :

1. Appuyez brièvement sur `F` pour que l'indicateur `F` apparaisse.
1. Maintenez le bouton latéral 1️⃣ ou le bouton latéral 2️⃣ jusqu'à ce que le sélecteur s'ouvre.
1. Utilisez `UP` / `DOWN` pour mettre en surbrillance une action.
1. Appuyez sur `M` pour l'exécuter immédiatement.

L'écran affiche l'action précédente, sélectionnée et suivante. `EXIT` ou `F` s'annule sans rien exécuter. Appuyer sur `PTT` ferme le préparateur et poursuit la manipulation normale de PTT, de sorte qu'il ne bloque pas une transmission urgente.

Le sélecteur se ferme également automatiquement au bout d'environ cinq secondes, lorsque la réception commence, si le clavier se verrouille ou lorsqu'un autre écran prend le relais. Chaque bouton latéral mémorise sa dernière action de sélection en surbrillance pour la session en cours ; les sélections sont réinitialisées au redémarrage de la radio.

Le sélecteur répertorie les mêmes actions compilées que celles documentées ci-dessous, à l'exception de `NONE`. Les restrictions d'action normales s'appliquent toujours : une action qui n'est pas disponible dans l'état actuel de la radio est refusée avec le bip d'erreur habituel.

## Microphone externe
### `PTT`
* Bouton Push-To-Talk.
* Le bouton `PTT du microphone externe` fonctionne différemment du bouton latéral interne `PTT`.

> [!NOTE]
> Sur certaines révisions matérielles, le microphone externe `PTT` se comporte différemment :
> - en appuyant sur PTT, TX attend qu'aucun signal RX ne soit reçu (_observé avec la révision V1.4 du PCB radio et OK avec V1.6_). Cela fonctionne bien avec le `PTT` interne
> - une tonalité DTMF (`key press`) ou une tonalité de 1 750 Hz (`function button`) peut être coupée en une seconde. Cela fonctionne bien avec le `PTT` interne

## Fonctions des boutons personnalisés
Cinq actions de raccourci peuvent être personnalisées dans le menu :
* `F1Shrt` - bouton latéral 1️⃣, appui court
* `F1Long` - bouton latéral 1️⃣, appui long
* `F2Shrt` - bouton latéral 2️⃣, appui court
* `F2Long` - bouton latéral 2️⃣, appui long
* `M Long` - bouton de menu, appui long

Fonctions disponibles :
* AUCUN - aucune action
* FLASH LIGHT - passer à la fonction de lampe de poche suivante : ON / OFF
* POWER - commutez la puissance de sortie radio entre [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITEUR - activer/désactiver le mode moniteur
* SCAN - démarrer le balayage des canaux/fréquences
* VOX - activer/désactiver la fonction d'activation vocale
* RADIO FM - allumer/éteindre la radio FM
* `1750 Hz` - envoyer la rafale de tonalité `1750 Hz`
* VERROUILLER LE CLAVIER - verrouiller/déverrouiller le clavier
* VFO A VFO B - changer le principal VFO en supérieur/inférieur
* VFO MEM - change le mode VFO actuel, le mode fréquence ou le mode canal mémoire
* MODE - passez au mode de démodulation suivant entre [FM / AM / USB]
* MODE RX - basculer le mode d'affichage entre [DW / DWR / XB / MO]
* PRINCIPAL UNIQUEMENT - basculer le mode d'affichage entre [DW / DWR / XB] et MO
* PTT - commutateur mode PTT CLASSIQUE / ONEPUSH
* WIDE NARROW - basculer entre WIDE et NARROW
* MUTE - coupe le volume du haut-parleur
* RxA - changez le profil audio RX pour la modulation actuelle : dans `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX` ; dans `AM`, `SHARP` / `STOCK` / `OPEN`
* PUISSANCE ÉLEVÉE - passer temporairement à la puissance maximale du `5 W`
* SUPPRIMER OFFSET - supprime temporairement le décalage d'un canal mémoire, le cas échéant
* BEAM - ouvre le mode de transfert BEAM, lorsqu'il est activé dans la version. BEAM peut envoyer les paramètres actuels du VFO/canal mémoire à une autre radio ou recevoir les paramètres d'une autre radio.
* FOX HUNT - ouvre l'application de radiogoniométrie de réception uniquement, lorsqu'elle est résidente ou disponible en tant qu'application Labs installée.
* BEACON - ouvre l'application de balise Morse indépendante, lorsqu'elle est résidente ou disponible en tant qu'application Labs installée.
* RF LOG - ouvre le journal d'historique RX/TX, lorsqu'il est activé dans la version. Le journal affiche les sessions récentes de réception, de surveillance et de transmission stockées dans un flash externe.

### Action BEAM

Attribuez `BEAM` à l'un des raccourcis personnalisables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), puis déclenchez ce raccourci pour ouvrir le mode BEAM.

En mode BEAM :

* `UP` / `DOWN` bascule entre `BEAM TX` et `BEAM RX`
* `M` démarre l'opération sélectionnée
* `EXIT` quitte le mode BEAM

`BEAM TX` envoie la configuration actuelle du VFO ou du canal mémoire. Le paquet comprend la fréquence RX, le décalage TX, les paramètres RX/TX DCS ou CTCSS, la modulation, la bande passante, la puissance de sortie, l'affectation de la liste de balayage, le compandeur, les paramètres liés au DTMF lorsqu'ils sont activés et le nom du canal.

`BEAM RX` attend un paquet BEAM provenant d'une autre radio. Lorsqu'un paquet valide est reçu, la radio l'enregistre dans le premier canal mémoire libre. Si la mémoire est pleine, l'état indique `MEM FULL`. Appuyer sur `EXIT` après une réception réussie passe au canal nouvellement enregistré ; sinon, il restaure l'état précédent de VFO/canal.

### Action CHASSE AU RENARD

Attribuez `FOX HUNT` à l'un des raccourcis personnalisables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), puis déclenchez ce raccourci pour ouvrir FoxHunt sur le VFO sélectionné.

En mode Chasse au renard :

* `1` bascule entre l'escalier du compteur S et le graphique récent de l'historique des signaux
* `2` alterne entre un bip silencieux de style Geiger et l'audio de la station reçue
* `3` passe en revue `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` et `BYP+`
* `UP` / `DOWN` modifie directement l'atténuation du récepteur
* `M` réinitialise les références de crête, de minimum et de tendance du signal
* maintenir `F` pendant environ 0,5 seconde verrouille ou déverrouille les commandes FoxHunt ; les flèches d'atténuation restent disponibles lorsqu'elles sont verrouillées
* Feuilles `EXIT` FoxHunt

Voir [FoxHunt](./Fox-Hunt) pour les lectures d'écran, les paramètres de gain, les commandes et les conseils de radiogoniométrie.

### Action BALISE

Attribuez `BEACON` à l'un des raccourcis personnalisables, puis déclenchez ce raccourci pour démarrer l'application indépendante Beacon. Beacon démarre immédiatement sa première transmission.

Les touches `1`, `2`, `3` et `4` ajustent la fenêtre TX, l'intervalle silencieux, l'identifiant du renard et le mode de saisie (`TONE` / `CARR`). Maintenir `F` pendant environ 0,5 seconde verrouille ou déverrouille toutes les commandes du Beacon, y compris pendant une transmission active. `M` arrête la transmission en cours et démarre un nouvel intervalle de ralenti ; `EXIT` s'arrête en toute sécurité et quitte Beacon.

Voir [Beacon](./Beacon) pour l'identification, la synchronisation, les protections de transmission, les paramètres enregistrés et les informations de sécurité.

### Action de journalisation RF

Attribuez `RF LOG` à l'un des raccourcis personnalisables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`), puis déclenchez ce raccourci pour ouvrir le journal d'historique RX/TX.

Le journal enregistre les sessions de réception, de surveillance et de transmission dans un flash externe. Chaque ligne de trafic affiche :

* le nom du canal, lorsque l'entrée provient d'un canal mémoire ; sinon la fréquence
* si l'entrée était `RX` ou `TX`
* un badge d'indexation le plus récent et le premier
* un badge détaillé qui peut indiquer la durée, le signal/puissance ou la tension de la batterie

Sur l'écran `RF LOG` :

* `UP` / `DOWN` fait défiler le journal, les entrées les plus récentes en premier
* `F` + `UP` passe à l'entrée la plus récente
* `F` + `DOWN` passe à l'entrée visible la plus ancienne
* appuyez brièvement sur `M` pour faire fonctionner le filtre : `ALL`, `RX`, `TX`
* une pression courte sur `* SCAN` fait défiler le badge de détail : durée, niveau de puissance RX S-meter / TX, tension de batterie la plus basse pendant la session
* un appui long sur `M` demande une confirmation de l'effacement du journal ; un appui long sur `M` à nouveau sur `CLEAR LOG / SURE?` efface le journal
* `EXIT` quitte l'écran du journal ou annule la confirmation d'effacement

La radio conserve jusqu'à 512 entrées de trafic visibles dans la vue du journal. Les lignes de séparation de session marquent les redémarrages de la radio lorsque le filtre `ALL` est actif.

## Pages connexes

* [Mise en route](./Getting-started)
* [Menu](./Menu)
* [Utilisation de la radio](./Radio-operation)
* [Scan](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Fonctionnalités avancées](./Advanced-features)
* [Applications overlay](./Overlay-apps)
* [Applications overlay](./Overlay-applications)
* [Dépannage](./Troubleshooting)
