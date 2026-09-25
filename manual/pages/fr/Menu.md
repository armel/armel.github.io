# Fonctionnement des menus

Le menu est accessible avec le bouton `M` _(appui court)_.

> [!NOTE]
> La navigation utilise `UP` / `DOWN` sur UV-K5 ou `LEFT` / `RIGHT` sur UV-K1. La présentation active suit l'option de menu masqué `SetNav`.

Introduit dans Fusion `v5.9.0`, le navigateur de catégories est utilisé dans toutes les éditions officielles `v6.0.0` et `v6.1.0`. Sélectionnez une catégorie avec `UP` / `DOWN`, puis appuyez sur `M` pour ouvrir sa liste d'articles. L'élément sélectionné est affiché sur le côté gauche de l'écran et sa valeur actuelle est affichée sur la droite.

Pour rechercher un élément de menu, parcourez sa catégorie ou sélectionnez `All` pour utiliser le menu plat d'origine. Vous pouvez également saisir le **numéro d'élément de menu global** à partir de l'écran de catégorie ; par exemple, saisissez `52` pour accéder à `SysInf`. La saisie directe du numéro passe à `All`. Fusion `v5.9.0` utilise `01` à `77` ; `v6.0.0` compatible multiboot ajoute `SetCfg` et étend la liste complète à `78`.

Une fois que l'élément de menu souhaité est mis en surbrillance, appuyer sur le bouton `M` permet d'accéder à cet élément de menu.

Une fois l'élément de menu sélectionné, appuyer sur les boutons fléchés `UP` et `DOWN` ajuste le paramètre pour cet élément. Pour confirmer la sélection, appuyez sur le bouton `M`. Pour annuler la sélection, appuyez sur `EXIT`.

À partir d'une liste d'éléments, appuyez brièvement sur `EXIT` pour revenir au navigateur de catégories. Appuyez à nouveau brièvement sur `EXIT` pour quitter le menu et revenir à l'écran radio.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Navigateur de menus catégorisés

L'écran de catégorie Fusion affiche la catégorie précédente, actuelle et suivante sur la gauche. Le côté droit montre le nombre d'éléments que contient la catégorie en surbrillance.

| Catégorie | Articles Fusion | Contenu |
| --- | ---: | --- |
| `Channels` | 21 en v6 | pas de fréquence, puissance, tonalités, décalage, bande passante, paramètres de canal et de mémoire, plus `SetCfg` |
| `Scan` | 6 | liste de scan, canaux prioritaires, mode de reprise et moteur de scan |
| `Keys` | 10 | raccourcis programmables, verrouillage du clavier, mode PTT et canal d'appel |
| `Power` | 4 | économiseur/affichage de batterie, délai d'inactivité et économiseur d'écran |
| `Display` | 11 | affichage des canaux, écran de démarrage, rétroéclairage et paramètres de l'interface utilisateur |
| `Timers` | 4 | Paramètres de minuterie TX, EOT et RX/TX |
| `Audio` | 5 | microphone, bip du clavier, volume et profils audio RX |
| `Radio` | 6 | silencieux, STE, bip Roger, modes VOX et RX |
| `DTMF` | 5 | codes haut/bas, tonalité latérale, préchargement et décodeur en direct |
| `Service` | 6 | menus de démarrage cachés ; visible uniquement après le geste de démarrage du menu caché |
| `All` | 72 normalement en v6, 78 avec Service | ordre original des menus plats et numérotation globale |

Le compteur d'éléments à l'intérieur d'une catégorie filtrée est local à cette catégorie. Utilisez `All` ou entrez un numéro à partir de l'écran de catégorie lorsque vous souhaitez que les numéros globaux soient répertoriés ci-dessous.

Le firmware mémorise la dernière catégorie sélectionnée et le dernier élément en surbrillance dans chaque catégorie pour la session en cours. Ces positions de navigation ne sont pas enregistrées lors d'un redémarrage.

## Conseils rapides

* dans `All`, les 13 premiers éléments sont les principaux paramètres VFO/canal en direct
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` et `ScnRev` sont les éléments clés liés à l'analyse.
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` et `M Long` contrôlent les raccourcis personnalisables
* le menu caché n'est disponible qu'au démarrage avec `PTT` + `SIDE BUTTON 1️⃣`

## Menu principal

Le numéro devant la description de chaque élément de menu est le **_numéro d'élément de menu_** qui peut être utilisé pour une sélection rapide.
1. `Step` - pas de fréquence (en kHz), les boutons `UP` et `DOWN` modifient la fréquence de cette valeur, vous ne pouvez également définir qu'une fréquence multiple de la moitié de cette valeur.
1. `Power` - puissance de sortie radio (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH / USER). Notez que la puissance UTILISATEUR peut être réglée via le menu `SetPower`.
1. `RxDCS` - récepteur Squelch à code numérique. Si vous activez cette option, le squelch ne se déverrouillera que si ce code est reçu. Vous pouvez démarrer une analyse DCS/CTCSS pendant que vous êtes dans cette option de menu en appuyant sur le bouton `* SCAN`.
1. `RxCTCS` - Système de silencieux à codage par tonalité continue du récepteur. Squelch ne se débloquera que si ce code est reçu. Vous pouvez démarrer une analyse DCS/CTCSS pendant que vous êtes dans cette option de menu en appuyant sur le bouton `* SCAN`.
1. `TxDCS` - émetteur Squelch à code numérique, la radio enverra le code donné pendant la transmission
1. `TxCTCS` - Système de silencieux à codage par tonalité continue de l'émetteur, la radio enverra le code donné pendant la transmission

   Dans les sous-menus `RxDCS`, `TxDCS`, `RxCTCS` et `TxCTCS`, le badge en haut à droite présente l'engagement sélectionné et son index homologué :

   * pour CTCSS : `NN/HH`, où `NN` est la position dans la liste complète des 50 tons et `HH` est le numéro de ton homologué. `--` signifie que la tonalité sélectionnée est l'une des tonalités supplémentaires non homologuées.
   * pour DCS : `NNN/HH`, où `NNN` est la position dans la liste complète DCS et `HH` est le numéro DCS homologué. `--` signifie que l'entrée DCS sélectionnée ne figure pas dans la liste PMR446 homologuée.
   * `OFF` s'affiche sous la forme `00/00` pour CTCSS et `000/00` pour DCS.
   * Les valeurs DCS se terminant par `N` sont des codes normaux ; les valeurs se terminant par `I` sont des codes inversés. Les entrées DCS inversées sont affichées dans la liste complète, mais elles ne reçoivent pas d'index homologué et affichent donc `--`.

1. `TxODir` - direction de décalage de fréquence de l'émetteur
1. `TxOffs` - valeur de décalage de fréquence de l'émetteur
1. `W/N` - bande passante utilisée par l'émetteur-récepteur
   * LARGE - `25 kHz`
   * ÉTROIT - `12.5 kHz`
1. `BusyCL` - verrouillage du canal occupé, empêche la radio de transmettre lorsque le signal est reçu
1. `Compnd` - compandeur (compresseur/extenseur), permet de transmettre des signaux avec une large plage dynamique sur des installations ayant une capacité de plage dynamique plus petite, améliore la qualité audio, les deux radios doivent utiliser cette option
1. `Mode` - mode de démodulation, la valeur par défaut est FM, AM / USB peut être utilisé uniquement pour l'écoute
1. `TXLock` - activer ou désactiver le mode de transmission du canal (s'il n'est pas couvert par le plan `F Lock`)
1. `ChList` - sélection de la liste de balayage des canaux mémoire
1. `ChSave` - enregistre le paramètre actuel dans un canal mémoire
1. `ChDele` - supprimer le canal mémoire
1. `ChName` - modifier le nom du canal mémoire
   * Utilisez les boutons `UP` et `DOWN` pour sélectionner un canal à modifier.
   * Appuyez à nouveau sur le bouton `M` pour accéder au mode de modification du nom.
   * Utilisez les touches numériques en mode multi-tap pour modifier le caractère actuel, comme sur les anciens téléphones mobiles
     * appuyez à nouveau sur la même touche pour parcourir les lettres et les chiffres qui lui sont attribués (`2` = `a`, `b`, `c`, `2`, etc.)
     * appuyez longuement sur une touche numérique pour saisir directement le numéro correspondant
     * appuyez brièvement sur `F` pour basculer entre les minuscules et les majuscules (`abc` / `ABC`)
     * appuyez longuement sur `F` pour entrer `#`
     * appuyez brièvement sur `* SCAN` pour entrer `-`, ou appuyez longuement dessus pour entrer `*`
     * appuyez brièvement sur `0` pour saisir un espace, puis appuyez à nouveau dessus pour saisir `0`.
   * Vous pouvez toujours utiliser les boutons `UP` et `DOWN` pour parcourir manuellement les caractères disponibles.
   * Appuyez sur le bouton `M` pour passer à la position de caractère suivante
   * Répétez les deux étapes ci-dessus jusqu'à la fin
   * Quand « Bien sûr ? » apparaît, appuyez sur le bouton `M` pour enregistrer ou sur Quitter pour annuler
   * Appuyez brièvement sur `EXIT` pour reculer d'un caractère ; à partir de la première position du caractère, il quitte l'édition du nom
   * Appuyez longuement sur `EXIT` pour annuler la modification et revenir au menu principal.
1. `ScList` - sélectionne la liste de balayage utilisée pour le balayage des chaînes : `01` à `24`, `ALL` et, en commençant par `v6.1.0`, `MIX`.
   * `MIX` combine une sélection enregistrée de listes numérotées sans modifier la liste attribuée à chaque canal.
   * Sélectionnez `MIX` et appuyez sur `M` pour ouvrir son éditeur.
   * Utilisez les touches de navigation ou entrez `01` à `24` pour sélectionner une liste, puis appuyez sur `M` pour la basculer.
   * Appuyez sur `EXIT` pour enregistrer. Au moins une liste doit rester sélectionnée.
   * Voir [MIX scan list](./Scanning#mix-scan-list-v610) pour le comportement complet.
1. `ScPri` - active/désactive la prise en charge des canaux prioritaires pendant la scan.
1. `PriCh1` - définit le canal prioritaire 1️⃣
1. `PriCh2` - définit le canal prioritaire 2️⃣
1. `ScnRev` - mode de reprise de l'analyse
   * CARRIER - après la disparition du signal, faites une pause de [250 millisecondes à 20 secondes] avant de reprendre le balayage
   * STOP - après avoir reçu un signal, arrêtez le scan
   * TIMEOUT - reprise de la scan après une pause de [5 secondes à 2 minutes]
1. `F1Shrt` - Fonction de pression courte `SIDE BUTTON 1️⃣`
1. `F1Long` - Fonction d'appui long `SIDE BUTTON 1️⃣`
1. `F2Shrt` - Fonction de pression courte `SIDE BUTTON 2️⃣`
1. `F2Long` - Fonction d'appui long `SIDE BUTTON 2️⃣`
1. `M Long` - Fonction d'appui long sur le bouton `M`
1. `KeyLck` - option de verrouillage automatique du clavier (OFF ou 15 secondes à 10 minutes avant le verrouillage automatique du clavier)
1. `TxTOut` - limite de temps de transmission maximale
1. `BatSav` - option d'économie de batterie, un taux entre le temps d'activité et le temps de sommeil (OFF, 1:1 à 1:5)
1. `BatTxt` - valeur de batterie supplémentaire sur la barre d'état (`NONE`, `VOLTAGE` ou `PERCENT`)
1. `Mic` - sensibilité du microphone
1. `MicBar` - barre de microphone qui apparaît lors de la transmission 
1. `ChDisp` - style d'affichage des canaux
1. `POnMsg` - mode d'affichage de démarrage
   * `ALL` : affiche le message de bienvenue configuré, la tension et les informations sur le firmware/version
   * `SOUND` : conserve le comportement sonore de démarrage normal sans écran de bienvenue
   * `MESSAGE` : afficher uniquement le message de bienvenue configuré
   * `VOLTAGE` : affiche la tension de la batterie et le pourcentage estimé
   * `LOGO` : affiche le logo de démarrage personnalisé 128 x 64 téléchargé avec [UV Studio](./UV-Studio#boot-logo)
   * `NONE` : ignorer l'affichage de démarrage
1. `BLTime` - durée du rétroéclairage
1. `BLMin` - luminosité minimale du rétroéclairage, lorsque le rétroéclairage de l'écran s'éteint, il s'atténue jusqu'à cette valeur
1. `BLMax` - luminosité maximale du rétroéclairage, lorsque le rétroéclairage de l'écran s'allume, il s'allume à cette valeur
1. `BLTxRx` - activation du rétroéclairage sur TX ou RX
1. `Beep` - bip sonore du clavier
1. `Roger` - bip Roger en fin de transmission
1. `STE` - éliminateur de queue de silencieux, élimine le bruit à la fin d'une transmission
1. `RP STE` - éliminateur de queue de silencieux à répéteur
1. `1 Call` - canal d'appel à une touche ; vous permet de passer rapidement à ce canal avec le bouton `9 Call`
1. `UPCode` - Code DTMF envoyé au début de la transmission
1. `DWCode` - Code DTMF envoyé à la fin d'une transmission
1. `PTT ID` - définit si `UPCode` et/ou `DWCode` doivent être transmis
1. `D ST` - Commutateur de tonalité latérale DTMF ; vous permet d'entendre les tonalités transmises via le haut-parleur de la radio
1. `D Prel` - Temps de précharge DTMF
1. `D Live` - affiche les codes DTMF reçus par radio au milieu de l'écran
1. `VOX` - niveau de sensibilité TX à commande vocale
1. `SysInf` - informations système. Dans les versions actuelles de F4HWN, cet élément est paginé : saisissez-le avec `M`, puis utilisez `UP` / `DOWN` pour vous déplacer entre les pages.
   * identité : auteur, version et édition du firmware
   * `BUILD` : date de construction, heure de construction et identifiant de validation
   * `BATTERY` : tension de batterie mesurée, pourcentage de batterie estimé et type/profil de batterie sélectionné
   * `MEMORY` : utilisation de FLASH et SRAM, lorsque la page mémoire est activée dans le build
   * `CODE` / `WIKI` : codes QR pour les liens de projet, lorsque les pages de codes QR sont activées dans la version
1. `RxMode` - définit la manière dont les fréquences supérieure et inférieure sont utilisées
   * PRINCIPAL UNIQUEMENT - transmet et écoute toujours sur la fréquence principale (`MO`)
   * DUAL RX RESPOND - écoute les deux fréquences, si le signal est reçu sur la fréquence secondaire, il s'y verrouille pendant quelques secondes afin que vous puissiez répondre à l'appel (`DWR`)
   * CROSS BAND - transmet toujours sur la fréquence primaire et écoute sur la fréquence secondaire (`XB`)
   * PRINCIPAL TX DUAL RX - transmet toujours sur le primaire, écoute les deux (`DW`)
1. `Sql` - niveau de sensibilité du silencieux
1. `SetPwr` - définit la puissance UTILISATEUR
   * FAIBLE 1 (< ~20 mW)
   * FAIBLE 2 (~125 mW)
   * FAIBLE 3 (~250 mW)
   * FAIBLE 4 (~500 mW, limite supérieure sous bande PMR...)
   * FAIBLE 5 (~1 W)
   * MOYEN (~2 W)
   * ÉLEVÉ (~5 W)
1. `SetPTT` - définit l'utilisation de PTT
   * CLASSIQUE
   * UNEPOUSSE
1. `SetTOT` - définit l'alerte TOT
   * DÉSACTIVÉ
   * SON
   * VISUEL
   * TOUS (_VISUEL + SON_)
1. `SetEOT` - définit l'alerte EOT (utile pour les pauses entre 2 transmissions)
   * DÉSACTIVÉ
   * SON
   * VISUEL
   * TOUS (_VISUEL + SON_)
1. `SetCtr` - définit le contraste de l'écran LCD
1. `SetInv` - définit l'écran LCD inversé (idéal pour la vision nocturne)
1. `SetLck` - sélectionne ce qui est désactivé lorsque le verrouillage du clavier est actif
   * `KEYS` : verrouille le clavier avant ; les actions de raccourci programmables et `PTT` restent disponibles
   * `KEYS + ACTIONS` : verrouille également les actions programmables affectées aux deux boutons latéraux et `M Long` ; `PTT` reste disponible
   * `KEYS + PTT` : verrouillez également le `PTT` pour éviter une transmission accidentelle ; les actions de raccourci programmables restent disponibles
   * `KEYS + ACTIONS + PTT` : verrouillez le clavier avant, les actions de raccourci programmables et `PTT`

   Dans chaque mode, appuyez longuement sur `F #` pour déverrouiller la radio. Voir [Fonctions des boutons](./Button-functions#keypad-lock-and-setlck) pour plus de détails.
1. `SetMet` - définit la conception du S-Meter
   * CLASSIQUE
   * TINY (comme sur le Yaesu FT4 ou FT-65 par exemple)
1. `SetGUI` - définit la conception de l'interface graphique
   * CLASSIQUE (police plus grande, moins d'informations affichées)
   * TINY (police plus petite, plus d'informations affichées)
1. `SetRxA` – définit le profil audio RX pour la modulation actuelle

   Profils `FM` :

   - `FLAT` : gain de sortie le plus faible (sécurité BK4829). Le plus neutre, idéal pour les environnements calmes.
   - `CLEAN` : profil équilibré par défaut. Audio confortable avec un gain modéré.
   - `MID` : Gain plus élevé que CLEAN sans l’agressivité de BOOST.
   - `BOOST` : profil de transmission vocale pour les signaux faibles/environnements bruyants. Gain plus élevé, audio plus « présent ».
   - `MAX` : Gain de sortie maximum (peut déformer les signaux forts ou les petites enceintes). Idéal pour un haut-parleur externe.

   Profils `AM` :

   - `SHARP` : Filtre IF étroit à faible gain. Plus sélectif, avec un meilleur rejet des canaux adjacents. Cela peut paraître plus dur ou un peu déformé sur des signaux forts, mais cela reste clair.
   - `STOCK` : destiné à rester aussi proche que possible du comportement du firmware d'origine.
   - `OPEN` : filtre IF plus large avec un gain plus élevé. Plus ouvert et agréable sur les signaux faibles, mais certaines réceptions peuvent paraître un peu étouffées, notamment ATC.
1. `SetTmr` - définit si les minuteries RX et TX sont affichées
1. `SetOff` - définit le délai avant que l'émetteur-récepteur ne passe en veille profonde (OFF ou 1 minute à 2 heures)
1. `SetNFM` - définit Étroit FM sur Étroit ou Plus étroit
1. `SetVol` - définit le gain du volume audio pour affiner la sortie du haut-parleur
1. `SetKey` - définit la clé pour activer le mode RescueOps au démarrage de l'émetteur-récepteur
1. `SetScn` - définit le [mode moteur d'analyse](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL` : utilise le chemin d'analyse standard.
   * `FAST` : utilise le nouveau chemin d'analyse rapide. Le firmware pré-vérifie plusieurs fréquences/canaux avec RSSI avant d'effectuer la configuration complète de la réception, saute les lots silencieux plus rapidement, affine les candidats proches par étapes fines et utilise un petit chien de garde pour reprendre si la boucle de balayage s'arrête.
1. `SetSav` - définit l'[économiseur d'écran](./Radio-operation#screen-saver-and-backlight-timeout) utilisé après le délai d'expiration du rétroéclairage, lorsqu'il est activé dans la version.
   * `OFF` : pas d'économiseur d'écran
   * `LOGO` : afficher le logo de démarrage personnalisé comme écran de veille
   * `LOGO+` : affiche le logo de démarrage personnalisé avec un effet de défilement
   * `MATRIX` : afficher un écran de veille animé de style matriciel

   `SetSav` est actif uniquement lorsque `BLTime` utilise une durée de rétroéclairage programmée. Il est suspendu pendant l'analyse RX, TX, PTT, BEAM et FM active.
1. `SetCfg` - sélectionne la banque de configuration utilisée par le firmware en cours d'exécution dans les versions `v6.0.0` compatibles Multiboot.
   * `CFG M` : Banque de configuration principale
   * `CFG 1` à `CFG 4` : banques de configuration associées aux emplacements de firmware 1 à 4

   Appuyez deux fois sur `M` pour confirmer une banque différente. La radio redémarre afin que la banque soit mappée avant que les canaux ou les paramètres ne soient chargés. L'emplacement du firmware ne change pas. Confirmer la banque déjà utilisée n’est pas une opération. Voir [Multiboot et Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Menu caché

Le menu caché est activé en maintenant `PTT` + `SIDE BUTTON 1️⃣` tout en allumant la radio, puis en relâchant toutes les touches.

73. `F Lock` - définit le plan de bande de fréquences TX.
    * DEFAULT+ (137-174, 400-470) - autorise TX sur les bandes par défaut, ainsi que les options `Tx 200`, `Tx 350`, `Tx 500`
    * JAMBON FCC (144-148, 420-450)
    * CA JAMBON (144-148, 430-450)
    * JAMBON CE (144-146, 430-440)
    * GB JAMBON (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR446
    * GMRS FRS MURS
    * DÉSACTIVER TOUT - désactive TX sur toutes les fréquences
    * UNLOCK ALL - active TX sur toutes les bandes. Il dispose d'une serrure supplémentaire ; voir [comment activer cela](./Advanced-features#tx-on-all-bands).
74. `350 En` - active RX sur `350 MHz`
75. `BatCal` - étalonnage de la tension de la batterie. Comparez la tension affichée avec un multimètre et ajustez-la jusqu'à ce qu'elle corresponde le plus possible
76. `BatTyp` - type de batterie/courbe de décharge utilisée pour le calcul du pourcentage de batterie. Cela affecte le `%`, pas la tension mesurée elle-même.
77. `SetNav` - configure le type de navigation (HAUT/BAS pour UV-K5, GAUCHE/DROITE pour UV-K1)
78. `Reset` - réinitialise les paramètres de configuration radio
   * VFO - supprime uniquement les paramètres de canal
   * ALL - réinitialise tout (paramètres de canal et de radio)

Sur l'écran du menu catégorisé, ces six entrées apparaissent dans la catégorie `Service`. Ils sont également ajoutés à `All`, où une version `v6.0.0` compatible multiboot s'exécute via `78/78`. Sur `v5.9.0`, qui n'a pas de `SetCfg`, les entrées masquées conservent les numéros `72` à `77`.

## Pages connexes

* [Mise en route](./Getting-started)
* [UV Studio](./UV-Studio)
* [Utilisation de la radio](./Radio-operation)
* [Scan](./Scanning)
* [Fonctions des boutons](./Button-functions)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [Fonctionnalités avancées](./Advanced-features)
* [Dépannage](./Troubleshooting)
