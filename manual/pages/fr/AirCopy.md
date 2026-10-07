# AirCopy

AirCopy transfère les canaux mémoire et les paramètres radio entre les radios compatibles. Il utilise FSK par voie hertzienne et, à partir de `v6.1.0`, peut également utiliser une connexion par câble série directe.

> [!IMPORTANT]
> AirCopy est inclus dans les éditions `Transfer` et `Labs`. Il ne fait pas partie des éditions standard `Fusion` ou `FieldOps`.

> [!WARNING]
> AirCopy n’est pas destiné à rendre compatibles les configurations de micrologiciels. Utilisez la même génération de firmware sur les deux radios et sélectionnez la même section de données sur l'émetteur et le récepteur. Le protocole `v6.1.0` optimisé n'est pas compatible filaire avec les versions antérieures de AirCopy.

## Démarrage de AirCopy

1. Éteignez la radio.
1. Maintenez `PTT` + `SIDE BUTTON 2️⃣` tout en l'allumant.
1. Relâchez toutes les touches lorsque l'écran AirCopy apparaît.

La fréquence hertzienne par défaut est `434.000 MHz` à très faible puissance. Vous pouvez saisir une autre fréquence autorisée avec le clavier avant de démarrer le transfert.

Utilisez les touches de navigation pour sélectionner la même section sur les deux radios :

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Démarrez ensuite la cible avant la source :

1. Sur la radio réceptrice, appuyez sur `EXIT`.
1. Sur la radio émettrice, appuyez sur `M`.
1. Attendez `AIR COPY OK` sur les deux radios.

Chaque sélection de mémoire transfère les canaux `128`, y compris les noms et attributs des canaux. `Settings` inclut les paramètres radio, les noms de liste de balayage, la zone VFO utilisée par `ScnRng`, la sélection de liste de balayage `MIX` et les préférences FoxHunt et Beacon enregistrées. `All (Mem+Set)` transfère les huit banques de mémoire et paramètres en une seule fois.

![AirCopy écran de transfert](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Protocole fiable dans la version 6.0.0

`v6.0.0` a introduit un protocole de transfert reconnu :

* le récepteur valide le cadrage, le décalage et le CRC avant de stocker les données
* le récepteur reconnaît les données valides et rejette les données endommagées ou inattendues
* l'expéditeur réessaye un blocage non reconnu ou rejeté jusqu'à trois fois
* les données en double sont reconnues sans être écrites deux fois, récupérant en toute sécurité après un accusé de réception perdu
* l'écran indique la progression, le nombre de tentatives (`RT`) et le nombre d'erreurs de réception (`ER`)

Une banque de mémoire contient des blocs `68` AirCopy de `64 bytes` ; `Settings` contient des blocs `12`. Étant donné que le récepteur envoie des accusés de réception, les deux radios émettent brièvement sur la fréquence sélectionnée.

## améliorations de la version 6.1.0

### Transferts radio plus rapides

Le nouveau protocole transporte jusqu'à trois blocs `64-byte` dans une trame de données FSK. Cela réduit les frais généraux d'exécution et d'accusé de réception et rend un transfert complet environ deux fois plus rapide dans des conditions radio similaires.

Avant d'envoyer des données, la source fournit des hachages CRC32 pour des groupes comprenant jusqu'à des blocs `24`. La cible compare ces hachages avec ses données locales et demande uniquement les blocs qui diffèrent. Répéter une sauvegarde ou synchroniser deux radios presque identiques peut donc être beaucoup plus rapide que de copier à nouveau chaque bloc.

La jauge de progression distingue les données déjà identiques des données réellement copiées. Le protocole valide également que l'expéditeur et le destinataire ont sélectionné la même section de données logiques ; une disparité échoue au lieu d'écrire une carte différente par erreur.

### Copie par câble

L'édition `Transfer` ajoute `CABLE COPY` sur UART. Sur l'écran prêt, appuyez sur `* SCAN` pour basculer entre le transport radio et le transport par câble. Le mode câble utilise les mêmes vérifications de comparaison, d'accusé de réception, de nouvelle tentative et de sélection que le mode radio, mais n'utilise pas de fréquence RF.

L'implémentation augmente le débit série pour le transfert et rétablit ensuite le débit normal. Les deux radios doivent exécuter un firmware de copie de câble correspondant et utiliser une connexion série directe compatible.

### Clonage Flash externe

Lorsque `CABLE COPY` est actif dans l'édition `Transfer`, une sélection supplémentaire `Flash 2M` peut cloner le Flash externe de la radio. Il compare les secteurs `4 KiB` par CRC32 et écrit uniquement des secteurs différents. Le secteur de l'étalonnage spécifique à l'appareil est délibérément exclu.

> [!WARNING]
> Le clonage Flash externe peut remplacer les emplacements de firmware, les banques de configuration, les applications, les journaux, les logos et autres données Flash externes partagées sur la radio réceptrice. Sauvegardez d'abord les données importantes, vérifiez soigneusement la direction et ne débranchez ni n'éteignez aucune des radios pendant l'opération.

## Dépannage

Si un transfert échoue :

* confirmez que les deux radios utilisent la même version du firmware compatible
* confirmer que les deux radios affichent la même sélection et le même transport
* démarrer la réception avec `EXIT` avant de démarrer l'émission avec `M`
* pour le transfert radio, réduisez la distance ou éloignez-vous des interférences
* pour le transfert par câble, vérifiez la connexion série directe et reconnectez les deux radios
* réessayez sans changer la sélection

## Pages connexes

* [Modifications récentes](./Recent-changes)
* [Fonctionnalités avancées](./Advanced-features)
* [Scan](./Scanning)
* [Multiboot et Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Dépannage](./Troubleshooting)
