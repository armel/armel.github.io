# Dépannage

Cette page rassemble les situations « quelque chose ne va pas » les plus courantes déjà couvertes ailleurs dans le wiki, afin que vous puissiez trouver rapidement la bonne vérification.

## Je peux recevoir, mais je ne peux pas transmettre

Vérifiez d'abord ces points :

1. Assurez-vous que `Mode` est défini sur `FM`.
1. Vérifiez le plan `F Lock` sélectionné.
1. Si la fréquence est en dehors de ce plan, vérifiez si `TXLock` est défini sur `OFF`.
1. Recherchez un petit cadenas à côté du nom de la chaîne ou du VFO.

Rappels importants :

* `AM` et `USB` sont destinés à l'écoute uniquement
* `UNLOCK ALL` dispose toujours d'une procédure de déverrouillage supplémentaire

Voir également : [Utilisation de la radio](./Radio-operation#about-the-f-lock-and-txlock-menus) et [Fonctions avancées](./Advanced-features#tx-on-all-bands).

## Mes paramètres personnalisés ont disparu ou ont été modifiés de manière inattendue

N'utilisez pas Quansheng CPS. Il écrase les paramètres personnalisés.

Utilisez plutôt le pilote `CHIRP` fourni avec chaque version du firmware ou un autre outil de programmation compatible.

Voir également : [Programmation avec CHIRP](./Programming-with-CHIRP), [Démarrage](./Getting-started) et [Utilisation de la radio](./Radio-operation#basic-operation--configuration).

## Mon logo de démarrage personnalisé ne s'affiche pas

Vérifiez ces points :

1. assurez-vous que la version de votre firmware inclut la prise en charge du logo
1. téléchargez le logo avec [UV Studio](./UV-Studio#boot-logo) pendant que la radio démarre normalement
1. ouvrez le menu `POnMsg` et sélectionnez `LOGO`
1. redémarrer la radio après avoir modifié le réglage

Si le logo semble trop sombre, trop clair ou inversé, téléchargez-le à nouveau depuis UV Studio et ajustez `Threshold` ou `Invert colors` avant de l'écrire sur la radio.

## J'ai modifié un paramètre de canal mémoire, mais il n'est pas resté enregistré

Certaines modifications spécifiques à un canal n'affectent que la copie temporaire actuelle de ce canal mémoire.

Si vous modifiez un paramètre par canal tel que `Step`, `Power` ou un autre paramètre de canal et que vous souhaitez le conserver de manière permanente, enregistrez à nouveau le canal avec `ChSave` pour réécrire les paramètres mis à jour dans cet emplacement mémoire.

Sinon, le changement n'est que temporaire et peut disparaître lorsque vous changez de chaîne, changez de mode ou redémarrez la radio.

Voir aussi : [Utilisation de la radio](./Radio-operation#basic-operation--configuration) et [Menu](./Menu#main-menu).

## L'analyse de la mémoire ne trouve rien

Vérifiez ces points :

1. Assurez-vous que vous êtes dans `channel mode` et non dans `frequency mode`.
1. Assurez-vous que le canal est attribué à une liste de balayage avec `ScList` ou en appuyant longuement sur `5 NOAA`.
1. Assurez-vous que la liste d'analyse actuellement active n'est pas vide.
1. Si nécessaire, passez à une autre liste de scan valide pendant la scan.

Le firmware prend en charge les listes d'analyse `24` ainsi que `ALL`. Si la liste demandée est vide ou invalide, la radio passe à la prochaine liste valide non vide.

Voir également : [Scanning](./Scanning#memory-channels-scanning) et [Fonctions des boutons](./Button-functions#front-keypad).

## Je ne parviens pas à régler la station de diffusion FM que je souhaite

Vous utilisez peut-être simplement la mauvaise plage de diffusion FM.

Pendant que la réception de diffusion FM est active, appuyez longuement sur `1 BAND` pour parcourir les plages FM disponibles :

* `87.5` à `108 MHz`
* `76` à `108 MHz`
* `76` à `90 MHz`
* `64` à `76 MHz`

La plage actuellement sélectionnée est affichée en bas à gauche de l'écran FM, par exemple `87.5-108M`.

Le réglage direct, le balayage manuel, le balayage automatique et les mémoires FM ne fonctionnent que dans la plage actuellement sélectionnée.

Voir également : [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## La diffusion radio FM continue de s'arrêter

Il s’agit généralement d’un comportement attendu.

Lors de la réception d'une diffusion FM, le VFO actif est toujours prioritaire. Si une activité est reçue sur le VFO actif, la radio revient temporairement à la réception VFO, puis revient à la diffusion FM lorsque cette réception se termine.

Voir également : [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver).

## La réception du AM semble trop dure, déformée ou trop étouffée

Essayez de modifier le profil `SetRxA` pendant que la radio est en mode `AM`.

Dans `AM`, `SetRxA` et le cycle d'action clé `RxA` entre :

* `SHARP` : plus étroit et plus sélectif, avec un meilleur rejet des canaux adjacents
* `STOCK` : le plus proche du comportement du firmware d'origine
* `OPEN` : plus large et plus ouvert, souvent plus agréable sur les signaux faibles

Si une réception AM semble trop dure dans `SHARP`, essayez `STOCK` ou `OPEN`. Si le son est trop faible ou trop large dans `OPEN`, essayez `SHARP`.

Voir aussi : [Menu](./Menu#main-menu) et [Fonctions des boutons](./Button-functions#custom-button-functions).

## J'entends seulement certaines chaînes VHF aéronautiques lorsque j'ouvre le moniteur dans `AM 8.33 kHz`

Il ne s’agit souvent pas d’un problème de sensibilité. Il s'agit généralement d'une confusion entre le `channel designator` (parfois appelé `channel number` ou `published channel`) et la fréquence de fonctionnement.

Certains documents, sites Internet ou applications aéronautiques publient la `channel designator`, qui ressemble à une fréquence normale mais n'est pas toujours la fréquence de fonctionnement. Les radios VHF aéronautiques dédiées, compatibles 8.33, traduisent automatiquement cet indicatif de canal publié. Ce firmware effectue également cette correction lorsque vous saisissez la valeur directement sur la radio, mais `CHIRP` stocke la valeur que vous avez saisie comme fréquence de fonctionnement.

### Cas 1 : Paris-Orly

Pour **Paris-Orly (LFPO)**, la **documentation SIA** publie bien **ATIS ORLY 126.505 (FR)**, avec **131.355 (EN)** pour le service anglophone.

Le **[tableau de correspondance OACI](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** montre que l'indicatif de canal 8,33 publié **126,505** correspond à la fréquence de fonctionnement **126,5000 MHz**. En d'autres termes :

* **Service :** ATIS ORLY (FR)
* **Indicateur de canal :** 126.505
* **Fréquence de fonctionnement :** 126,5000 MHz

Différence importante :

* si vous saisissez `126.5050` directement sur la radio, le firmware le corrige à la fréquence de fonctionnement correspondante, ici `126.5000 MHz`
* si vous entrez `126.5050` dans `CHIRP`, cette valeur exacte est stockée et utilisée telle quelle, de sorte que l'erreur de réglage persiste

### Cas 2 : Bruxelles

Pour **Bruxelles-National (EBBR)**, l'indicatif de canal 8.33 publié pour **Bruxelles Ground (Sud)** est **121.880** dans les listings consultés.

Le **[tableau de correspondance OACI](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** montre que l'indicatif de canal 8,33 publié **121,880** correspond à la fréquence de fonctionnement **121,8750 MHz**. En d'autres termes :

* **Service:** Bruxelles Terrain (Sud)
* **Indicateur de canal :** 121.880
* **Fréquence de fonctionnement :** 121,8750 MHz

Différence importante :

* si vous saisissez `121.8800` directement sur la radio, le firmware le corrige à la fréquence de fonctionnement correspondante, ici `121.8750 MHz`
* si vous entrez `121.8800` dans `CHIRP`, cette valeur exacte est stockée et utilisée telle quelle, de sorte que l'erreur de réglage persiste

En bref, si la fréquence saisie dans `CHIRP` est le **désignateur de canal** plutôt que la fréquence de fonctionnement, forcer l'ouverture du moniteur dans `AM 8.33 kHz` peut sembler restaurer la réception, mais le vrai problème est que le désignateur de canal publié a été interprété comme la fréquence de fonctionnement.

Si un service programmé à partir d'un indicatif de canal ne devient audible que lorsque vous ouvrez le moniteur dans `AM 8.33 kHz`, essayez d'abord la fréquence de fonctionnement correspondante, en particulier lorsque la valeur publiée se termine par `...005`, `...010`, `...255`, `...505`, `...755` ou des indicatifs de canal similaires de style 8.33.

Voir aussi : 

[Ofcom : compréhension des fréquences 8,33 kHz et des numéros de canaux](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Arrêtez de blâmer votre radio ou votre firmware. Regardez cette vidéo sur ma chaîne Youtube :
[Fréquences Aviation et MONITEUR ✈️ : Canal ≠ Fréquence (l'erreur qui change tout) !](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Le pourcentage ou la tension de la batterie semble incorrect

Vérifiez ces points :

1. assurez-vous que la radio ne se charge pas via `USB-C` pendant que vous la vérifiez
1. utilisez `BatTxt = VOLTAGE` ou ouvrez `SysInf`
1. assurez-vous que `BatTyp` correspond à la batterie que vous utilisez
1. comparer la tension affichée avec un multimètre
1. si nécessaire, réajuster `BatCal`

Rappel important :

* `BatCal` affecte la lecture de tension
* `BatTyp` affecte l'estimation du pourcentage de batterie

Voir aussi : [Utilisation de la radio](./Radio-operation#battery-display-type-and-calibration) et [Menu](./Menu#hidden-menu).

## Le microphone externe PTT se comporte différemment

Il s'agit d'un comportement connu sur certaines révisions matérielles.

Les différences documentées comprennent :

* TX peut attendre que RX soit clair avant de transmettre
* Les tonalités DTMF ou la tonalité 1750 Hz peuvent être rapidement coupées

Le côté interne `PTT` ne montre pas ces problèmes dans les cas documentés.

Voir aussi : [Fonctions des boutons](./Button-functions#external-microphone).

## La radio se met en veille de façon inattendue

Vérifiez ces menus :

* `SetOff` : sommeil profond après une période d'inactivité
* `BatSav` : rapport actif/veille en fonctionnement normal

Si `SetOff` n'est pas `OFF`, la radio peut passer en mode veille après une inactivité, même pendant le balayage, tant qu'aucune réception n'a lieu.

FoxHunt et Beacon ignorent intentionnellement `SetOff`. Si la radio reste éveillée dans l'une ou l'autre application, laissez-la avec `EXIT` avant de diagnostiquer la minuterie d'inactivité. Depuis `v6.0.0`, ce sont des applications indépendantes.

Voir aussi : [Utilisation de la radio](./Radio-operation#about-the-setoff-menu).

## La navigation semble aller dans la mauvaise direction

Si la navigation dans les menus ou certaines commandes semblent se déplacer dans la mauvaise direction, vérifiez d'abord l'élément de menu caché `SetNav`.

Ce firmware ne peut pas détecter de manière fiable s'il s'exécute sur un `UV-K1` ou un `UV-K5`. Pour cette raison, le style de navigation a dû être exposé en tant que paramètre de menu.

`SetNav` vous permet de choisir entre :

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Cela ne change pas la fonctionnalité elle-même. Cela change uniquement le style de navigation utilisé par le firmware, et donc la façon dont les commandes doivent être lues sur votre radio.

Voir également : [Démarrage](./Getting-started#model-differences) et [Menu](./Menu#hidden-menu).

## Les boutons ne font pas ce que j'attends

Vérifiez ces possibilités :

1. le verrouillage du clavier peut être activé
1. Le `SetLck` peut également verrouiller les actions du bouton latéral programmable / `M Long`, le `PTT`, ou les deux.
1. Le mode RescueOps désactive la plupart des appuis longs et les combinaisons de touches `F`
1. certaines actions diffèrent entre `F+` et un appui long
1. `F` suivi d'une courte pression sur le bouton latéral ajuste l'étape, tandis que `F` suivi d'un maintien de ce bouton latéral ouvre le sélecteur d'action dans les éditions v6 actuelles.

Voir également : [Fonctions des boutons](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon) et [Fonctions avancées](./Advanced-features#rescueops).

## Comprendre l'alimentation et SetPwr : alimentation par canal et alimentation globale TX

Le menu Puissance détermine la puissance de transmission utilisée par le canal actuel ou VFO. Les valeurs disponibles sont LOW1 à LOW5, MID, HIGH ou USER. Ce paramètre est donc stocké localement, canal par canal.

Le menu SetPwr ne sélectionne pas directement la puissance pour un canal spécifique. Il définit uniquement le niveau de puissance réel attribué au mode USER, en choisissant entre LOW1 et LOW5, MID ou HIGH. Ce réglage est global pour l'ensemble de la radio.

Par conséquent, tous les canaux dont le paramètre Power est défini sur USER utiliseront automatiquement la valeur actuellement définie dans SetPwr.

Ce mécanisme permet de modifier la puissance effective de plusieurs canaux réglés sur USER en une seule fois, sans avoir à éditer chaque canal individuellement.

## Où aller ensuite

* [Mise en route](./Getting-started)
* [Programmation avec CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Utilisation de la radio](./Radio-operation)
* [Scan](./Scanning)
* [Fonctionnalités avancées](./Advanced-features)
* [Menu](./Menu)
* [Fonctions des boutons](./Button-functions)
