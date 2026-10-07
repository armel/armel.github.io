# Récepteur de diffusion FM

La radio peut recevoir la diffusion FM de `76` à `108 MHz`. Il utilise pour cela une puce distincte (`BK1080`). RDS n'est pas pris en charge.

_Pendant l'écoute normale d'une diffusion, le VFO actif est toujours prioritaire. La réception sur le VFO actif désactive temporairement l'audio diffusé ; à la fin de la réception VFO, la radio repasse en diffusion. Pendant qu'une recherche de station manuelle ou automatique FM est en cours d'exécution, `v5.9.0` ignore temporairement la réception du canal principal afin que la recherche de station puisse se terminer sans être interrompue._

> [!NOTE]
> Lorsque cette page mentionne `UP` / `DOWN`, utilisez les clés équivalentes `LEFT` / `RIGHT` sur UV-K1. La disposition de navigation active suit `SetNav`.

> [!NOTE]
> - le VFO actif a la priorité lors d'une écoute de diffusion normale, mais pas lors d'un balayage de station FM actif
> - le scan automatique écrase toutes les mémoires `48` FM

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Opérations de base

* `F` + `0 FM`, appuyez longuement sur `0 FM` ou une [fonction de bouton personnalisée ](./Button-functions#custom-button-functions) démarre la réception de diffusion
* `EXIT`, ou en utilisant à nouveau la même commande de démarrage alors que la radio est en mode FM, met fin à la réception de la diffusion.
* `F` + `3 VFO/MR`, ou un appui long sur `3 VFO/MR`, permet de passer du mode VFO au mode mémoire.

### Définir une fréquence en mode FM-VFO

Il suffit de taper une fréquence pour régler le récepteur. La résolution est `100 kHz`, donc la saisie de `929` correspond à `92.9 MHz`. Utilisez les touches fléchées pour modifier les étapes `100 kHz`.

### Modifier la plage de diffusion FM

Si vous ne parvenez pas à régler la station souhaitée, vous vous trouvez peut-être simplement dans la mauvaise plage de diffusion FM.

Pendant que la réception de diffusion FM est active, appuyez longuement sur `1 BAND` pour parcourir les plages FM disponibles :

* `87.5` à `108 MHz`
* `76` à `108 MHz`
* `76` à `90 MHz`
* `64` à `76 MHz`

La plage actuellement sélectionnée est affichée en bas à gauche de l'écran FM, par exemple `87.5-108M`.

Le réglage direct, le balayage manuel, le balayage automatique et les mémoires FM ne fonctionnent que dans la plage actuellement sélectionnée. Si une station ou une mémoire FM enregistrée se trouve en dehors de cette plage, passez d'abord à une autre bande FM.

### Stocker en mémoire depuis le mode FM-VFO

Appuyer sur `M` en mode VFO vous permet de stocker la fréquence actuelle dans un canal mémoire. Utilisez les touches fléchées pour sélectionner la mémoire, puis validez avec `M`. Des mémoires `48` sont disponibles.

### Sélectionnez une mémoire

En mode MR, la saisie de `01` à `48` sélectionne un canal mémoire. Utilisez `UP` / `DOWN` pour parcourir les canaux mémoire.

### Supprimer une mémoire stockée

En mode MR, appuyer sur `M` vous permet de supprimer ce canal mémoire.

## Recherche de stations depuis FM-VFO

### Analyse automatique

Commencez par `F` + `* Scan` ou en appuyant longuement sur `* Scan`.
La radio recherche les stations et stocke les premières stations `48` en mémoire. Le balayage commence par le côté bas de la bande. Le démarrage de la recherche automatique supprime les chaînes précédemment stockées. `EXIT` termine l'analyse automatique.

Pendant l'exécution du balayage automatique, un signal entrant détecté sur le canal principal de l'émetteur-récepteur n'interrompt pas le balayage FM. La priorité normale du canal principal est restaurée dès que le balayage FM s'arrête.

### Analyse manuelle

Un appui court sur `* Scan` démarre l'analyse manuelle. La radio balaie vers le haut à partir de la fréquence actuelle jusqu'à ce qu'une station soit reçue. Vous pouvez continuer à numériser dans les deux sens à l'aide des touches fléchées. `EXIT` arrête le mode de scan.

La même exception temporaire du canal principal s’applique lors de l’analyse manuelle. Une fois le balayage arrêté sur une station ou annulé, l'écoute ordinaire d'une émission cède à nouveau la place à la réception sur le VFO actif.

## Fonctions des boutons

* `1 BAND` – appui long, commutateur des plages de diffusion FM
* `3 VFO/MR` - fréquence de commutation/mode mémoire
* `* SCAN`
   * appui court - démarrer un seul scan
   * appui long - démarrez l'analyse automatique (tous les canaux mémoire seront supprimés et remplacés par le résultat de l'analyse)

## Pages connexes

* [Mise en route](./Getting-started)
* [Fonctions des boutons](./Button-functions)
* [Utilisation de la radio](./Radio-operation)
* [Dépannage](./Troubleshooting)
