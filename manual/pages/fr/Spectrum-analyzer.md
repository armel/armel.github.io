# Analyseur de spectre

## Écran de balayage du spectre

Appuyez sur `F` + `5 NOAA` pour activer l'**analyseur de spectre**.
La VFO ou fréquence mémoire actuelle sera la **_fréquence centrale_** du balayage spectral.

![Analyseur de spectre 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Analyseur de spectre 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

L'analyseur de spectre peut également être utilisé avec le mode [**ScnRng**](./Scanning#scan-frequency-range-function).

> [!NOTE]
> La navigation utilise `UP` / `DOWN` sur UV-K5 ou `LEFT` / `RIGHT` sur UV-K1. La présentation active suit `SetNav`.

> [!NOTE]
> - `PTT` ouvre la surveillance détaillée de la dernière fréquence reçue
> - avec `ScnRng`, la liste noire est limitée à 15 fréquences

> [!IMPORTANT]
> **L'analyseur de spectre ne se comporte pas de la même manière sur le matériel radio.**
> Les radios **V1 / V2** sont construites autour du récepteur **BK4819**, tandis que le
> **V3 (K5v3)** utilise le **BK4829**. Ce sont différentes puces réceptrices, avec un
> différents front-end, étages de gain LNA/PGA, comportement AGC et mise à l'échelle RSSI.
>
> En conséquence :
> - le **plancher de bruit**, les lectures absolues du **dBm / S-mètre** et les valeurs **`LNAs` / `LNA` / `PGA`** ne sont **pas directement comparables** entre un V1/V2 et un V3 — un réglage de niveau ou de gain qui semble « correct » sur un V2 n'a aucune raison de signifier la même chose sur un V3 ;
> - l'analyseur de spectre a été **considérablement retravaillé** pour prendre en charge les deux plates-formes, alors ne vous attendez pas à ce qu'une V3 reproduise, valeur pour valeur, ce que vous avez observé sur une ancienne V1/V2 ;
> - un bruit de fond élevé ou instable est en grande partie dû au frontal du récepteur et à l'environnement RF local, et non à un bug dans l'analyseur. Lorsque **AUTO** ne peut pas s'installer à votre étage local, passez en **MANUEL** et réglez le déclencheur vous-même : c'est exactement à cela que sert le mode MANUEL.

### Modes de déclenchement : AUTO ou MANUEL

Appuyez brièvement sur `M` pour basculer entre les modes de déclenchement **AUTO** et **MANUEL**. L'indicateur en haut à gauche indique le mode actif :

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — mode AUTO. Le niveau de déclenchement du squelch suit le bruit de fond mesuré à l'aide d'un profil de sensibilité :
  - `WEAK` — +12 dB au-dessus du bruit de fond (moins sensible, moins de fausses ouvertures)
  - `NORM` — +8 dB (par défaut)
  - `STRG` — +5 dB (le plus sensible)
  
  Une flèche de direction est ajoutée à l'étiquette pour indiquer la direction actuelle du balayage :
  - `>` — balayage allant de gauche à droite
  - `<` — balayage allant à droite → à gauche
  
  Exemple : `A:NORM>` signifie sensibilité AUTO / Normale, balayage vers la droite.

- **`M <rssi>/<trig>`** — Mode MANUEL. Vous définissez vous-même le niveau de déclenchement du squelch avec `*` / `F` et l'échelle verticale (`dbMax`) avec `3` / `9`. Le déclencheur change par étapes `1 dB` prévisibles.

Appuyez longuement sur `M` pour **réinitialiser l'analyseur de spectre à ses paramètres par défaut**.

### Sauvegarde des paramètres à la sortie

Lorsque vous quittez l'écran **Spectrum Sweep** avec `EXIT`, l'analyseur de spectre écrit ses paramètres persistants sur flash. La prochaine fois que vous ouvrirez l'analyseur, ces valeurs seront restaurées :

- pas de fréquence entre les barres (`1` / `7`)
- nombre de barres / canaux (`4`)
- bande passante du récepteur utilisée lors de la surveillance d'un signal (`6`)
- mode de déclenchement, **AUTO** ou **MANUEL** (`M` court)
- Profil de sensibilité AUTO, **FAIBLE** / **NORM** / **STRG** (`3` / `9` en mode AUTO)
- niveau de déclenchement du squelch (`*` / `F`) — restauré en mode **MANUEL** ; en **AUTO**, le déclencheur est recalculé à partir du bruit de fond à chaque fois que vous ouvrez l'analyseur

Cette persistance a été étendue après `v5.4.0` : les anciennes versions enregistraient uniquement l'étape de scan, le nombre de barres et la bande passante du récepteur. Dans les versions actuelles, le démarrage de l'analyseur de spectre à partir du mode `ScnRng` n'écrase plus l'étape de scan ou la préférence de nombre de barres enregistrée ; la plage de balayage active définit toujours l'étendue de balayage.

L'échelle verticale (`dbMax`, `3` / `9` dans MANUEL) n'est **pas** conservée : elle est réinitialisée à la fenêtre d'affichage par défaut à chaque ouverture de l'analyseur. La fréquence/fenêtre de balayage actuelle, l'étape de défilement `UP` / `DOWN`, le type de modulation, la bascule de rétroéclairage, la liste noire temporaire et les ajustements du registre de surveillance des détails (`LNAs`, `LNA`, `PGA`) ne sont pas non plus enregistrés par cette action `EXIT`. Si vous êtes sur l'écran **Detail Monitor**, `EXIT` revient d'abord à l'écran de balayage ; appuyez à nouveau sur `EXIT` à partir de là pour enregistrer et quitter l'analyseur.

Les versions actuelles améliorent également l'arrondi des fréquences du `8.33 kHz` dans les flux de travail de bande passante/spectre, de sorte que les fréquences affichées et réglées restent alignées de manière plus prévisible sur les étapes de style aéronautique.

### Fonctions des boutons

| Clé | Fonction |
| --- | --- |
| `1` / `7` | Augmenter/diminuer le pas de fréquence entre les barres |
| `2` / `8` | Augmentez/diminuez le pas de fréquence utilisé lors du défilement avec `UP` / `DOWN` |
| `3` / `9` | En MANUEL : régler `dbMax` (échelle verticale) · En AUTO : profil de sensibilité du cycle (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Basculer le nombre de barres (canaux) dans le graphique |
| `5` | Entrée de fréquence pour la fréquence de balayage inférieure (valeur en **MHz**, `*` = point décimal) |
| `6` | Basculer la bande passante du récepteur |
| `0` | Type de modulation à bascule (FM / AM / USB) |
| `*` / `F` | Augmenter/diminuer le niveau de déclenchement du squelch par étapes `1 dB` — prend effet dans **MANUEL** ; dans **AUTO**, le suivi automatique le remplace lors du prochain balayage |
| `M` court | Basculer le mode de déclenchement AUTO/MANUEL |
| `M` longue | Réinitialiser l'analyseur de spectre aux valeurs par défaut |
| `UP` / `DOWN` sur UV-K5, ou `LEFT` / `RIGHT` sur UV-K1 | Déplace la fenêtre de balayage vers le haut/bas en fréquence · **Pendant RX** : arrêter la réception et reprendre le balayage dans la direction choisie |
| `Side button 1️⃣` | Exclure la fréquence actuelle de l'analyse du spectre |
| `Side button 2️⃣` | Basculer le rétroéclairage |
| `PTT` | Passer à la **surveillance détaillée** de la dernière fréquence reçue |
| `EXIT` | Enregistrez les paramètres du spectre persistant, puis revenez à l'écran/fonction précédent |

> [!TIP]
> Le balayage alterne la direction à chaque cycle complet pour réduire le biais directionnel. L'indicateur `<` / `>` à côté de `A:xxxx` vous permet de voir en un coup d'œil quelle moitié du balayage est actuellement active.

> [!NOTE]
> En mode MANUEL, la courbe du spectre est tracée sans lissage cosmétique. Cela permet aux pics étroits de s'aligner plus étroitement avec le RSSI brut utilisé par le détecteur de silencieux.

## Écran du moniteur de détails
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Fonctions des boutons
* `M` - fait défiler les paramètres affichés en bas de l'écran, qui peuvent être ajustés avec les boutons `UP` et `DOWN`
   * LNA - Amplificateur court à faible bruit
   * LNA - Amplificateur à faible bruit
   * PGA - Amplificateur de gain programmable
* `Side button 1️⃣` - basculer le **mode moniteur** (force le silencieux à s'ouvrir pour que vous puissiez entendre la fréquence réglée en continu)
* `EXIT` - revient à l'écran précédent de l'analyseur de spectre

> [!NOTE]
> `LNAs` / `LNA` / `PGA` sont des **valeurs de diagnostic en direct**, et non des paramètres enregistrés. Ils sont pilotés par le AGC du récepteur et ne sont pas conservés à la sortie. Les étapes disponibles et leur signification diffèrent entre le **BK4819** (V1/V2) et le **BK4829** (V3), de sorte qu'elles ne peuvent pas être comparées entre les plates-formes.

## Pages connexes

* [Mise en route](./Getting-started)
* [Scan](./Scanning)
* [Fonctions des boutons](./Button-functions)
* [Utilisation de la radio](./Radio-operation)
* [Dépannage](./Troubleshooting)
