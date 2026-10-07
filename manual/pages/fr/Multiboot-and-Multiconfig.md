# Multiboot et Multiconfig

À partir de `v6.0.0`, les éditions compatibles peuvent conserver plusieurs images du firmware F4HWN dans le flash externe de la radio et en restaurer une à partir d'un sélecteur au démarrage. Chaque emplacement de firmware possède sa propre banque de configuration par défaut, donc essayer une autre édition n'écrase pas les canaux et les paramètres utilisés par les autres emplacements.

Multiboot est inclus dans les quatre éditions officielles `v6.0.0` : `Fusion`, `FieldOps`, `Transfer` et `Labs`. Les emplacements du firmware sont gérés avec [UV Studio](./UV-Studio#firmware-slots) pendant que la radio fonctionne normalement.

> [!IMPORTANT]
> Placez uniquement une image `v6.0.0` ou une image F4HWN plus récente avec prise en charge de Multiboot dans un emplacement de firmware. Un firmware `v5.x`, d'origine ou autre non Multiboot peut s'exécuter après avoir été restauré, mais il ne peut pas ouvrir le sélecteur de démarrage pour revenir à un autre emplacement.

## Emplacements du firmware

La radio conserve cinq entrées Multiboot :

| Étiquette radio | Objectif | Géré par |
| --- | --- | --- |
| `M` | `Main`, une sauvegarde automatique du firmware installé via la procédure de flashage normale | firmware |
| `1` à `4` | images supplémentaires du firmware F4HWN | UV Studio |

`Main` est protégé contre les écritures de l'hôte. Au premier démarrage d'un firmware compatible Multiboot installé via la procédure normale `Flash Firmware`, la radio affiche `Init Main` et copie le firmware en cours d'exécution dans `M`. N'éteignez pas la radio pendant cette initialisation.

Les quatre emplacements utilisateur vivent uniquement dans Flash externe jusqu'à ce qu'ils soient sélectionnés. L’installation ou l’effacement d’un dans UV Studio ne remplace pas immédiatement le firmware actuellement exécuté à partir du Flash interne.

## Installer un firmware dans un slot

1. Démarrez la radio normalement avec un firmware compatible Multiboot.
1. Connectez-le à un navigateur de bureau avec une connexion de données USB prise en charge.
1. Ouvrez [UV Studio](https://armel.github.io/uvstudio/) et sélectionnez `Firmware Slots`.
1. Sélectionnez une version stable compatible `v6.x` F4HWN dans le catalogue ou choisissez un fichier `.bin` local compatible.
1. Choisissez l'emplacement `1`, `2`, `3` ou `4` et modifiez éventuellement son nom d'affichage.
1. Sélectionnez `Write to slot`, confirmez et attendez la fin des étapes d'effacement, d'écriture et de vérification.

Chaque emplacement accepte une image d'application jusqu'à `118 KiB`. UV Studio écrit l'image sur Flash externe, stocke sa taille et son CRC, puis demande à la radio de vérifier l'image complète.

`Erase FW` supprime l'image du firmware externe de cet emplacement utilisateur. Cela n'efface pas la banque de configuration du slot et n'affecte pas une copie de ce firmware déjà exécutée dans Flash interne.

## Sélection d'un firmware au démarrage

1. Éteignez la radio.
1. Tenez le `M` (`MENU`) par lui-même tout en allumant la radio. Ne tenez pas `PTT`.
1. Relâchez la touche lorsque l'écran `F4HWN MULTIBOOT` apparaît.
1. Attendez que la radio scanne et valide les emplacements.
1. Utilisez `UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1, pour sélectionner `M` ou un emplacement `1` sur `4`. La présentation active suit `SetNav`.
1. Appuyez sur `M` pour le sélectionner, puis appuyez à nouveau sur `M` sur `Restore ...?` pour confirmer.
1. N'éteignez pas la radio pendant `Writing / Verify`. La radio redémarre automatiquement avec le firmware sélectionné.

Appuyez sur `EXIT` dans la liste des emplacements pour annuler et continuer à démarrer le firmware déjà installé. Les emplacements invalides, incomplets, surdimensionnés ou défaillants CRC sont affichés mais ne peuvent pas être restaurés.

Le sélecteur met initialement en évidence l'emplacement d'où provient le firmware en cours d'exécution. Il est également reflété dans UV Studio lorsque cette prise en charge est disponible.

## Multiconfig : une banque de configuration par emplacement

Par défaut, la sélection de l'emplacement du firmware `N` sélectionne également la banque de configuration `N` :

| Firmware | Configuration par défaut | Contenu conservé dans cette banque |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | canaux mémoire, noms, VFO, listes de balayage et paramètres radio |
| emplacement `1` | `CFG 1` | sa propre copie des mêmes zones de configuration |
| emplacement `2` | `CFG 2` | sa propre copie des mêmes zones de configuration |
| emplacement `3` | `CFG 3` | sa propre copie des mêmes zones de configuration |
| emplacement `4` | `CFG 4` | sa propre copie des mêmes zones de configuration |

Les données d'étalonnage, le logo de démarrage, les métadonnées Multiboot, les emplacements de firmware/application et le journal RF sont partagés plutôt que dupliqués dans chaque banque.

Une banque de configuration inutilisée démarre avec les paramètres d'usine par défaut lors de la première utilisation. Cette séparation est utile lorsque les éditions ont des paramètres différents ou lorsque vous souhaitez tester un firmware sans modifier la configuration normale du `Main`.

## Utilisation de SetCfg

Le menu `SetCfg` permet au firmware en cours d'exécution d'utiliser une banque de configuration différente sans changer de firmware. Par exemple, `SLOT 2 / CFG 4` signifie que le firmware restauré à partir de l'emplacement 2 utilise actuellement les canaux et les paramètres stockés dans la banque 4.

1. Ouvrez le menu normal et sélectionnez `SetCfg`.
1. Choisissez `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` ou `CFG 4`.
1. Appuyez sur `M`, puis appuyez à nouveau sur `M` à `SURE?`.
1. La radio redémarre et mappe la banque sélectionnée.

Confirmer la banque déjà utilisée n'est pas une opération et ne redémarre pas la radio. La page d'identité `SysInf` affiche des badges `SLOT` et `CFG` distincts afin que vous puissiez toujours vérifier la combinaison actuelle.

> [!CAUTION]
> `SetCfg` permet délibérément de partager les configurations entre les éditions et versions du firmware. La compatibilité est de votre responsabilité. Sauvegardez les données importantes de canal/paramètres avant d’ouvrir une banque avec un firmware pouvant utiliser une disposition de données différente.

Dans UV Studio, `Reset config` efface la banque de configuration associée à l'emplacement utilisateur `1` vers `4` sans effacer son firmware. Le prochain démarrage utilisant cette banque recrée les paramètres par défaut. `CFG M` est protégé contre cette commande ; utilisez la procédure normale de réinitialisation d'usine du firmware pour la configuration principale.

## Notes de récupération et de sécurité

* Chaque emplacement est entièrement vérifié par CRC avant que le Flash interne ne soit effacé.
* L'état de l'emplacement/configuration actif est stocké de manière redondante et vérifié avant le début d'une restauration.
* `DO NOT POWER OFF` signifie que Flash interne est en cours de réécriture. L'interruption de cette étape peut rendre l'application impossible à démarrer et nécessiter une récupération DFU normale.
* Si un flash normal du firmware remplace l'image interne, le prochain démarrage compatible Multiboot détecte le changement et adopte cette image comme nouvelle sauvegarde `Main` avec `CFG M`.
* Si la radio signale `STATE ERROR` ou `Flash state unknown`, redémarrez-la. Le firmware s’arrête là délibérément plutôt que de risquer d’écrire via un mappage de configuration incertain.

## Pages connexes

* [UV Studio](./UV-Studio#firmware-slots)
* [Modifications récentes](./Recent-changes)
* [Menu](./Menu)
* [Applications overlay](./Overlay-apps)
* [Dépannage](./Troubleshooting)
