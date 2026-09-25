# Scan

Cette page regroupe toutes les fonctionnalités liées à l'analyse : analyse de fréquence, analyse de mémoire, listes d'analyse, `ScnRng`, copie de fréquence et analyse DCS / CTCSS.

Pour le fonctionnement quotidien de VFO/canal, voir [Utilisation de la radio](./Radio-operation). Pour l'utilisation du balayage de spectre, voir [Analyseur de spectre](./Spectrum-analyzer).

## Sur cette page

* [Balayage de fréquence](#frequency-scanning)
* [Analyse des canaux mémoire](#memory-channels-scanning)
* [MIX liste de scan](#mix-scan-list-v610)
* [Mode moteur d'analyse : NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Indicateurs de scan et détection](#scan-indicators-and-detection)
* [Copie de fréquence et scan DCS / CTCSS](#frequency-copy-and-dcs--ctcss-scanning)
* [Pages associées](#related-pages)

> [!TIP]
> Si l'analyse de la mémoire semble interrompue, la cause la plus courante est une liste d'analyse active vide. Voir [Dépannage](./Troubleshooting) pour les vérifications rapides.

## Balayage de fréquence

Pour démarrer un balayage de fréquence, passez un VFO en mode fréquence. Définissez une fréquence de départ. Définir un pas de fréquence (menu `Step`). Commencez la scan avec une fonction de bouton de scan personnalisée ](./Button-functions#custom-button-functions) ou en appuyant longuement sur le bouton `* Scan`.

### Fonction de plage de fréquence de balayage

* passer en mode fréquence
* définir les fréquences VFO supérieure et inférieure aux limites de la plage de balayage
* appuyez longuement sur `5 NOAA` ; l'étiquette `ScnRng` devrait apparaître
* démarrez l'analyse en appuyant longuement sur `* Scan`
* la radio balayera entre les limites sélectionnées
* appuyez longuement sur `5 NOAA` ou `EXIT`, ou changez de VFO, pour quitter le mode `ScnRng`

![Plage de scan](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

La fonction `ScnRng` est également prise en charge par l'analyseur de spectre. Si vous avez déjà activé `ScnRng`, démarrez simplement l'[analyseur de spectre](./Spectrum-analyzer).

Si vous utilisez [AirCopy](./AirCopy) et transférez `Settings`, la zone VFO est incluse. Cela copie également les fréquences limites actuelles de la radio source `ScnRng` sur la radio cible.

### Hors fréquences dans ScnRng

Pendant qu'un balayage `ScnRng` est arrêté sur une fréquence reçue, appuyez longuement sur `MENU` pour exclure cette fréquence du balayage de plage actuel.

Jusqu'à **64** fréquences de balayage de plage peuvent être exclues. La liste est circulaire : après 64 exclusions, l’ajout d’une autre remplace la plus ancienne exclusion stockée.

Ces exclusions sont temporaires. Ils sont conservés uniquement pour la configuration active `ScnRng` et ne sont pas écrits en mémoire. Ils sont effacés si la radio est redémarrée, et ils sont également effacés lorsque l'identité de portée change : fréquence de démarrage, fréquence d'arrêt ou étape de balayage.

## Balayage des canaux mémoire

L'analyse de la mémoire permet à la radio d'analyser les canaux mémoire enregistrés au lieu de parcourir les fréquences.

Pour l'utiliser, passez le VFO en **Mode mémoire**, puis lancez la scan avec une touche de scan programmée ou en appuyant longuement sur `* Scan`.

### Listes de scan

La radio fournit **24 listes de balayage**. Chaque canal mémoire peut être affecté à :

* `OFF` : la chaîne est exclue des listes de balayage
* `1` à `24` : le canal appartient à une liste de balayage spécifique
* `ALL` : la chaîne est incluse dans toutes les listes de balayage

Un canal mémoire ne peut appartenir qu’à un seul de ces états à la fois.

`MIX` est un mode de balayage actif, pas une autre affectation par canal. Il combine plusieurs des listes numérotées ; voir [Liste de scan MIX](#mix-scan-list-v610).

### Attribution d'une chaîne à une liste de balayage

Pour modifier l'affectation de la liste de balayage du canal mémoire actuel :

* ouvrez le menu `ScList`
* ou appuyez longuement sur `5 NOAA` pour le raccourci d'affectation rapide

Le raccourci rapide fait défiler la chaîne :

* `OFF`
* `1` à `24`
* `ALL`

L'affectation actuelle est affichée à droite du nom du canal.

### Listes d'analyse nommées

Les listes de scan peuvent avoir des noms courts.

Lorsqu'une liste a un nom, la radio affiche ce **nom à 3 caractères** au lieu du numéro numérique de la liste lorsque cela est possible :

* dans les indicateurs d'état liés à l'analyse
* dans les menus de sélection de liste
* dans l'affichage d'affectation de la liste des chaînes

Si une liste n'a pas de nom, la radio affiche le numéro de la liste à la place.

### Liste d'analyse active

L'analyse de la mémoire utilise toujours une **liste d'analyse active**.

La liste actuellement active s'affiche en haut à gauche de l'écran lors de la scan :

* `01` à `24` pour une liste numérotée
* `MIX` pour la combinaison enregistrée des listes sélectionnées, commençant par `v6.1.0`
* `ALL` pour toutes les chaînes répertoriées

Si la liste sélectionnée a un nom, ce nom court s'affiche à la place du numéro.

Si la liste sélectionnée est vide ou invalide, la radio passe automatiquement à la prochaine liste valide et non vide.

### Démarrage de l'analyse de la mémoire

Une fois les canaux attribués aux listes, lancez le balayage de la mémoire en :

* à l'aide d'une touche affectée à la fonction scan
* ou en appuyant longuement sur `* Scan`

La radio scanne ensuite les canaux mémoire appartenant à la liste de balayage actuellement active.

### Modification de la liste de scan pendant la scan

La liste d'analyse active peut être modifiée sans arrêter l'analyse.

* appui long sur `* Scan` : passer à la prochaine liste d'analyse valide non vide
* `F + navigation key` : parcourez les listes de scan pendant la scan (`UP` / `DOWN` sur UV-K5, `LEFT` / `RIGHT` sur UV-K1)
* saisie directe au clavier :
  * `01` à `24` : sélectionnez directement cette liste de scan
  * `25` : sélectionnez `MIX`, en commençant par `v6.1.0`
  * `00` : sélectionnez `ALL`

Si la liste demandée est vide, la radio émet un bip et passe à la prochaine liste valide et non vide.

Lorsqu'une analyse de mémoire change de liste, le nom de la liste remplace temporairement la jauge de progression. Dans `v5.9.0`, la reprise de l'analyse est maintenue pendant que ce nom est réellement visible, de sorte que la jauge cachée et la position actuelle de l'analyse ne peuvent pas s'écarter, puis avancer lorsque la jauge revient.

Cette courte attente s'applique uniquement à l'analyse de la mémoire. Le balayage de fréquence et le `ScnRng` peuvent toujours armer le même compte à rebours superposé via leurs commandes, mais ils n'affichent pas de nom de liste de balayage et continuent donc sans pause inexpliquée.

### Liste d'analyse MIX (v6.1.0)

`MIX` analyse plusieurs listes numérotées comme un seul ensemble combiné sans modifier la liste attribuée à un canal. Une chaîne est incluse lorsque :

* il appartient à une des listes numérotées activées dans l'éditeur `MIX`, ou
* son affectation de canal est `ALL`

Les canaux attribués à `OFF` restent exclus. Un canal n'a toujours qu'une seule affectation (`OFF`, `01` à `24` ou `ALL`) ; `MIX` stocke un masque de sélection distinct décrivant les listes numérotées à combiner.

Pour configurer `MIX` :

1. Ouvrez `ScList`.
1. Sélectionnez `MIX` et appuyez sur `M`.
1. Utilisez les touches de navigation pour vous déplacer entre les listes `01` à `24`, ou saisissez un numéro de liste à deux chiffres pour y accéder directement.
1. Appuyez sur `M` pour activer ou désactiver la liste en surbrillance `ON`.
1. Appuyez sur `EXIT` pour enregistrer la sélection et faire de `MIX` le mode de scan actif.

L'éditeur affiche le nombre de listes sélectionnées sous la forme `NN/24`. Au moins une liste doit rester activée ; toute tentative de désactivation de la dernière liste sélectionnée produit un bip d'erreur.

La séquence normale de liste d'analyse devient `01` jusqu'à `24`, puis `MIX`, puis `ALL`. Lors d'une analyse de mémoire active, entrez `25` pour sélectionner directement `MIX` ou `00` pour sélectionner `ALL`. Si le `MIX` résultant ne contient aucun canal balayable valide, la radio émet un bip et passe au mode valide suivant.

Le masque `MIX` enregistré fait partie des paramètres radio et est inclus dans un transfert [AirCopy](./AirCopy) `Settings`.

### Modification de la direction de scan

Pendant la scan, appuyez sur une touche de navigation :

* `UP` / `DOWN` sur UV-K5
* `LEFT` / `RIGHT` sur UV-K1

Cela inverse la direction utilisée pour parcourir les canaux mémoire dans la liste de balayage actuelle.

### Analyse prioritaire

La radio prend en charge deux canaux prioritaires :

* `PriCh1`
* `PriCh2`

Ceux-ci sont configurés dans le menu et contrôlés par le paramètre `ScPri`.

#### Comment ça marche

Lorsque le balayage prioritaire est activé, la radio ne balaie pas simplement les chaînes dans l'ordre de la liste. Au lieu de cela, il insère à plusieurs reprises les canaux prioritaires dans le cycle de balayage.

La séquence de scan devient :

1. `PriCh1`
1. `PriCh2`
1. prochaine chaîne régulière de la liste de balayage active

Ce cycle se répète ensuite continuellement.

Cela permet à la radio de vérifier les deux canaux prioritaires plus souvent que les canaux normaux, de sorte que leur activité est détectée plus rapidement.

#### Comportement important

Lorsque l'analyse prioritaire est activée :

* les canaux prioritaires sont traités séparément de l'analyse de liste normale
* si un canal prioritaire appartient également à la liste d'analyse active, il est supprimé du chemin d'analyse normal pour éviter d'être analysé deux fois
* les canaux prioritaires peuvent toujours être vérifiés même s'ils sont en dehors de la progression normale de la liste

### Comportement d'arrêt et de reprise de l'analyse

Lorsque le scanner détecte une activité sur un canal, ce qui se passe ensuite dépend du paramètre `ScnRev`.

En fonction de ce paramètre, la radio peut :

* reprendre la scan automatiquement après un délai
* rester arrêté sur le canal actif jusqu'à ce que le scan soit redémarré manuellement

Le comportement de pause et de reprise est donc contrôlé par le mode de reprise de l'analyse, et non par la liste d'analyse elle-même.

### Exclusion d'une chaîne pendant le balayage

Pendant que l'analyse de la mémoire est arrêtée sur un canal mémoire reçu, appuyez longuement sur `MENU` pour exclure ce canal des futures analyses de mémoire.

#### Remarque importante

Cette exclusion est temporaire.

Le canal reste exclu jusqu'au prochain redémarrage de l'émetteur-récepteur.

### Reprise de l'analyse

Si vous éteignez l'émetteur-récepteur pendant le balayage, le balayage reprendra automatiquement la prochaine fois que vous le redémarrerez.

### Fonctionnalités communes de balayage des fréquences/canaux

Les commandes suivantes s'appliquent à la fois au balayage de fréquence et au balayage de mémoire :

* appuyez sur une touche de navigation pendant la scan pour inverser le sens de scan (`UP` / `DOWN` sur UV-K5, `LEFT` / `RIGHT` sur UV-K1)
* appuyez sur `EXIT` pour arrêter le balayage et revenir à la fréquence ou au canal sélectionné avant le début du balayage.
* appuyez sur `PTT` ou `MENU` pour arrêter le balayage et conserver la dernière fréquence ou canal où une activité a été trouvée

## Mode moteur d'analyse : NORMAL ou RAPIDE

Les versions prenant en charge l'analyse rapide ajoutent le menu `SetScn`. Il sélectionne le moteur d'analyse utilisé par l'analyse de la mémoire et `ScnRng`.

### NORMAL

`NORMAL` utilise le chemin d'analyse standard. Chaque fréquence ou canal mémoire est entièrement appliqué à la radio, avec la configuration normale du VFO, la configuration du silencieux/puissance de sortie, la configuration du registre du récepteur et le timing de pause de balayage habituel.

Ce mode est le choix le plus conservateur. C'est utile si vous préférez l'ancien comportement d'analyse ou si vous souhaitez comparer les résultats avec le moteur rapide.

### RAPIDE

`FAST` est le mode par défaut dans les versions actuelles. Il ajoute une pré-vérification légère RSSI avant la configuration complète de la réception :

* pour l'analyse de la mémoire, le firmware sonde la fréquence du canal suivant et la saute rapidement si elle est clairement silencieuse
* pour `ScnRng`, le firmware sonde un petit lot d'étapes de plage avant d'effectuer un réglage complet
* les lots silencieux sont ignorés plus rapidement, de sorte que l'analyse passe moins de temps sur un spectre vide
* les signaux possibles sont ramenés au chemin de réception complet normal, de sorte que le comportement silencieux et le comportement normal de reprise de l'analyse décident toujours de ce qui se passe ensuite
* dans `ScnRng`, des étapes fines peuvent être affinées autour d'un candidat afin que le balayage se rapproche du signal le plus fort à proximité
* si la boucle d'analyse s'arrête après l'expiration de la pause normale `ScnRev`, un court chien de garde reprend l'analyse

La vérification préalable rapide apprend un niveau de bruit local RSSI et compare chaque sonde à ce niveau et au seuil de silencieux configuré. Si le squelch est complètement ouvert ou si le chemin rapide ne peut pas pré-vérifier un canal en toute sécurité, le firmware revient au réglage complet normal pour cette étape.

> [!NOTE]
> Dans `ScnRng`, le mode `FAST` peut analyser environ **plus de 150 fréquences par seconde** dans des conditions favorables, en particulier lorsque la majeure partie de la plage est silencieuse et que l'analyse peut ignorer des lots silencieux sans effectuer une configuration de réception complète pour chaque étape.

Le balayage de fréquence simple à l'extérieur du `ScnRng` avance toujours d'un pas de fréquence à la fois ; `SetScn = FAST` modifie principalement le comportement de l'analyse de la mémoire et de la plage d'analyse.

## Indicateurs de scan et détection

Les versions actuelles d'analyse rapide peuvent afficher une petite ligne sparkline RSSI lors de l'analyse. Il s'agit d'un historique compact des échantillons récents de RSSI ; les échantillons calmes restent faibles, tandis que les candidats plus forts se distinguent par des notes plus élevées.

Pendant l'analyse de la mémoire, l'indicateur de liste d'analyse continue d'afficher la liste active :

* `01` à `24`
* `MIX`, commençant par `v6.1.0`
* `ALL`
* le nom de la liste de scrutation à 3 caractères, lorsque la liste en comporte un

Lorsque l'analyse prioritaire est activée, un `+` est ajouté à l'indicateur de liste d'analyse.

Pendant `ScnRng`, les versions prenant en charge la plage de balayage subaudible peuvent détecter CTCSS / DCS lorsque la radio est arrêtée sur un signal reçu. Si un code est trouvé, l'interface utilisateur de scan peut afficher la tonalité détectée ou le code DCS ainsi que la fréquence reçue.

L'affichage de l'analyse affine également l'emplacement de l'indicateur de verrouillage VFO pendant la scan, de sorte que l'état du verrouillage TX reste visible sans chevaucher les informations d'analyse active.

## Copie de fréquence et scan DCS / CTCSS

Cette fonction vous permet de détecter et de copier les paramètres de fréquence et de codage. La recherche de fréquence ne fonctionne que pour les signaux forts, la radio émettrice doit donc être proche. Pour démarrer la copie de fréquence (`FC`), utilisez le bouton de fonction `4 FC`. L'écran du scanner s'ouvrira. Appuyez et maintenez enfoncé le bouton PTT de l'autre radio. Attendez quelques secondes jusqu'à ce que la fréquence et le code (le cas échéant) apparaissent à l'écran. Les paramètres peuvent être enregistrés avec le bouton `MENU`. Ils seront enregistrés soit sur un canal, soit sur le VFO principal, selon le mode dans lequel vous avez lancé l'analyse.

Dans les versions actuelles, l'écran du scanner rend l'état plus explicite :

* `Search Freq` : la recherche de fréquence est en cours
* `Search Tone` : la recherche de tonalité/code inaudible est en cours
* `Scan Complete` : un résultat a été trouvé
* `Scan Failed` : aucun résultat utilisable n'a été trouvé
* `Freq:` affiche la fréquence détectée
* `Tone:` / `CTCSS:` / `DCS:` affiche le paramètre subaudible détecté lorsqu'il en trouve un.

Vous pouvez également rechercher uniquement le code DCS / CTCSS pour une fréquence définie sur le VFO principal. Choisissez la fréquence ou le canal souhaité et appuyez sur `F` + `* SCAN`. Le même écran apparaîtra, mais la recherche de fréquence sera omise ; la fréquence du VFO principal sera utilisée à la place. Attendez qu'un signal apparaisse ou appuyez sur la touche PTT de l'autre radio. Il faut 1 à 2 secondes pour que le code soit trouvé. La procédure de sauvegarde est la même que ci-dessus.

Il existe une autre façon de rechercher un code DCS / CTCSS. Choisissez la fréquence ou le canal souhaité. Accédez au menu `RxDCS` ou `RxCTCS`. Entrez dans l'option de menu et appuyez sur le bouton `* SCAN`. Une étiquette `SCAN` apparaîtra. Attendez un signal radio ou appuyez sur le bouton PTT de l'autre radio. Lorsque le code est trouvé, l'étiquette `SCAN` disparaîtra. Pour l'enregistrer, confirmez l'option avec le bouton `MENU`. Peu importe à partir duquel des deux éléments de menu vous démarrez : DCS et CTCSS peuvent être trouvés, et l'entrée de menu sera remplacée par la bonne.

## Pages connexes

* [Mise en route](./Getting-started)
* [Utilisation de la radio](./Radio-operation)
* [Fonctions des boutons](./Button-functions)
* [Analyseur de spectre](./Spectrum-analyzer)
* [Fonctionnalités avancées](./Advanced-features)
* [AirCopy](./AirCopy)
* [Dépannage](./Troubleshooting)
