# Commencer

Cette page est un guide d'orientation rapide pour les nouveaux utilisateurs du firmware. Il ne remplace pas la documentation complète, mais il devrait vous aider à trouver plus rapidement la bonne page et à éviter les erreurs les plus courantes.

## Les 5 premières minutes

Si vous souhaitez uniquement programmer une fréquence, testez la radio et enregistrez-la :

1. Sélectionnez le VFO actif avec `F` + `2 A/B`.
1. Basculez ce VFO en `mode fréquence` avec `F` + `3 VFO/MR`.
1. Entrez une fréquence avec le clavier.
1. Ouvrez le menu avec `M`, choisissez `Channels` (ou `All`) et ajustez les éléments de base dont vous avez besoin (`Step`, `Power`, tonalités, décalage, bande passante, `Mode`, `TXLock`).
1. Enregistrez la configuration avec `ChSave` si vous souhaitez la conserver comme canal mémoire.
1. Revenez au `mode canal` avec `F` + `3 VFO/MR` lorsque vous souhaitez parcourir les canaux enregistrés.

Si vous devez afficher ou contrôler la radio à partir d'un navigateur, inspecter l'activité du RF, flasher le firmware, sauvegarder l'étalonnage ou télécharger un logo de démarrage personnalisé, utilisez [UV Studio](./UV-Studio). Si vous préférez programmer des mémoires à partir d'un ordinateur, utilisez le pilote dédié `CHIRP` fourni avec chaque version du firmware. Voir [Programmation avec CHIRP](./Programming-with-CHIRP) pour le flux de travail complet.

Si vous connaissez déjà le firmware, consultez [Modifications récentes](./Recent-changes) pour les dernières modifications stables de `v6.1.0` et les points forts antérieurs de `v6.0.0`.

> [!WARNING]
> N'utilisez pas Quansheng CPS. Il écrase les paramètres personnalisés.

## Choisir une édition

La dernière version stable de `v6.1.0` comporte quatre éditions officielles :

| Édition | Idéal pour | Capacités supplémentaires |
| --- | --- | --- |
| `Fusion` | la plupart des utilisateurs et le fonctionnement quotidien | ensemble de fonctionnalités de référence équilibré |
| `FieldOps` | utilisation sur le terrain et par les premiers intervenants | RescueOps, résident FoxHunt, résident Beacon |
| `Transfer` | copier des données entre radios | AirCopy et résident Beam |
| `Labs` | expérimentation | RescueOps, AirCopy et applications overlay installables |

FoxHunt et Beacon sont des applications indépendantes depuis `v6.0.0`. Dans FieldOps, ils résident ; dans Labs, ils sont installés et lancés séparément en tant qu'applications superposées.

Pour la plupart des utilisateurs, commencez par Fusion et choisissez une édition spécialisée uniquement lorsque vous avez besoin de ses fonctionnalités supplémentaires. Multiboot permet de conserver plusieurs éditions et configurations isolées sur une même radio.

## Tâches courantes

### Commencer à scanner les fréquences

1. Basculez un VFO vers un `frequency mode`.
1. Réglez la fréquence de départ.
1. Réglez le pas de fréquence avec le menu `Step`.
1. Appuyez longuement sur `* SCAN`.

Pour une plage de balayage limitée, chargez les limites inférieure et supérieure dans les deux VFO, appuyez longuement sur `5 NOAA` pour activer `ScnRng`, puis appuyez longuement sur `* SCAN`.

Pour le comportement de l'analyse complète, les listes d'analyse, l'analyse prioritaire et l'analyse DCS / CTCSS, voir [Scanning](./Scanning).

### Commencez à scanner les canaux mémoire

1. Passez à `channel mode`.
1. Affectez les canaux à une liste de scan avec le menu `ScList`, ou en maintenant `5 NOAA`.
1. Appuyez longuement sur `* SCAN`.

Le firmware `v6.1.0` actuel prend en charge les listes d'analyse `24`, `ALL` et un mode configurable `MIX` qui analyse plusieurs listes sélectionnées ensemble.

Voir [Scanning](./Scanning) pour le comportement complet de la liste d'analyse.

### Si vous ne pouvez pas transmettre

Vérifiez d'abord ces éléments :

1. Assurez-vous que `Mode` est `FM` et non `AM` ou `USB`.
1. Vérifiez si la fréquence se trouve dans le plan `F Lock` sélectionné.
1. Si la fréquence se trouve hors du plan de bande sélectionné, vérifiez que `TXLock` est réglé sur `OFF`.
1. Recherchez un petit cadenas à côté du nom du canal ou du VFO.

Si cela n’explique toujours pas le blocage, consultez la page [Dépannage](./Troubleshooting).

### Économiser la batterie

Les deux menus principaux à connaître sont :

* `BatSav` règle le rapport entre activité et économie d’énergie pendant le fonctionnement normal
* `SetOff` place la radio en veille profonde après une période d’inactivité

Voir [Utilisation de la radio](./Radio-operation#battery-display-type-and-calibration) pour l'affichage de la batterie, le type de batterie et l'étalonnage, et [Utilisation de la radio](./Radio-operation#about-the-setoff-menu) pour le comportement détaillé du mode veille.

## Différences de modèles

Ce firmware est destiné aux `UV-K1` et `UV-K5 V3`.

La différence la plus visible dans la documentation concerne la navigation :

* `UV-K5` : la navigation est généralement décrite avec `UP` / `DOWN`
* `UV-K1` : la navigation est généralement décrite avec `LEFT` / `RIGHT`

L’option `SetNav` du menu caché contrôle ce mode de navigation.

Certaines captures d'écran et exemples utilisent d'abord la terminologie UV-K5, mais la même fonctionnalité existe généralement sur UV-K1 avec les touches de navigation équivalentes.

## Concepts de base

Ces termes apparaissent dans tout le wiki :

* `VFO mode` : vous saisissez directement les fréquences et réglez les paramètres courants avant de les enregistrer
* `Mode canal` / `mode mémoire` : vous parcourez les canaux mémoire enregistrés
* `Main VFO` : la ligne active, supérieure ou inférieure, repérée par `►`
* `Menu category` : le premier niveau de menu organisé par catégories, introduit dans Fusion `v5.9.0` et utilisé par les éditions v6 actuelles ; `All` rétablit l’ordre linéaire et la numérotation globale d’origine
* `F Lock` : le plan de bande principal TX
* `TXLock` : autorisation TX supplémentaire par canal lorsqu’une fréquence se trouve hors du plan `F Lock` sélectionné
* `Scan list` : l’un des `24` groupes de scan des mémoires, ou `ALL`
* `MIX` : mode de scan de la `v6.1.0` combinant une sélection enregistrée de listes `01` à `24`
* `ScnRng` : scanne uniquement entre les fréquences actuellement chargées dans les deux VFO
* `SetOff` : délai d’inactivité avant la veille profonde
* `POnMsg` : mode d’affichage au démarrage, incluant le logo personnalisé facultatif
* `Multiboot` : conserve `Main` ainsi que quatre images de firmware supplémentaires compatibles v6 dans la Flash externe
* `Config bank` : le profil de canaux/paramètres isolés associé à un emplacement Multiboot par défaut
* `SetCfg` : change la banque de configuration sans modifier l’emplacement du firmware en cours d’exécution
* `Overlay app` : un petit programme `.app` réservé aux laboratoires chargé depuis un Flash externe dans la RAM lors de son lancement
* `MO`, `DW`, `DWR`, `XB` : abréviations `RxMode` affichées dans la barre d'état

## Où aller ensuite

* [Utilisation de la radio](./Radio-operation) pour l'utilisation de VFO/canal, barre d'état, `F Lock`, `TXLock` et comportement en veille
* [Modifications récentes](./Recent-changes) pour les principales modifications visibles par l'utilisateur dans les versions récentes
* [UV Studio](./UV-Studio) pour la visualisation en direct, l'activité RF, le flashage du firmware, les emplacements Multiboot, les applications Labs, l'étalonnage, les logos de démarrage et les outils de récupération Flash externe `v1.6.0`
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig) pour les emplacements de firmware, le sélecteur de démarrage, les banques de configuration et `SetCfg`
* [Applications overlay](./Overlay-apps) pour installer et lancer des applications expérimentales Labs
* [Programmation avec CHIRP](./Programming-with-CHIRP) pour programmer la radio depuis un ordinateur avec le pilote dédié fourni dans chaque version
* [Scan](./Scanning) pour le scan des fréquences et des mémoires, `ScnRng` et la recherche DCS / CTCSS
* [Menu](./Menu) pour chaque élément de menu et le menu caché
* [Fonctions des boutons](./Button-functions) pour les raccourcis, les pressions longues et les touches programmables
* [FoxHunt](./Fox-Hunt) pour la radiogoniométrie assistée par la force du signal en réception uniquement
* [Beacon](./Beacon) pour l'émetteur Morse périodique indépendant
* [AirCopy](./AirCopy) pour le transfert radio à radio des mémoires et paramètres, ainsi que les améliorations de la `v6.1.0`
* [Fonctionnalités avancées ](./Advanced-features) pour RescueOps, le mode reprise, le jeu intégré et les fonctionnalités de recherche TX sur toutes les bandes
* [Analyseur de spectre](./Spectrum-analyzer) pour un balayage de type bandscope
* [Récepteur radio de diffusion FM](./FM-broadcast-radio-receiver) pour la fonction de diffusion FM
* [Dépannage](./Troubleshooting) pour les problèmes courants et les vérifications rapides
