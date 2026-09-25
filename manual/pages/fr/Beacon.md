# Beacon

Beacon est une application Morse de transmission de type ARDF. Il envoie à plusieurs reprises un identifiant sélectionné sur le TX actif VFO, en alternant entre une fenêtre de transmission configurable et un intervalle silencieux.

Puisque `v6.0.0`, Beacon et [FoxHunt](./Fox-Hunt) sont des applications distinctes et des actions programmables distinctes. Beacon démarre directement son cycle de transmission ; il ne s'ouvre pas via FoxHunt.

Beacon réside dans l'édition `FieldOps`. Dans `Labs`, installez l'application overlay `Beacon` avec [UV Studio](./UV-Studio#apps-labs). Le raccourci `BEACON` lance l'application résidente ou l'application overlay installée correspondante, selon l'édition.

> [!WARNING]
> Le Beacon démarre immédiatement sa première transmission. Avant de le lancer, vérifiez le TX VFO actif, la fréquence, la puissance, l'antenne, le `F Lock`, le `TXLock`, les exigences d'indicatif et d'identification, le cycle de service et les réglementations locales. Ne laissez pas une balise émettant sans surveillance là où les transmissions autonomes ou périodiques sont interdites.

## Démarrage de Beacon

Attribuez `BEACON` à `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` ou `M Long`, puis déclenchez ce raccourci. Dans Labs, vous pouvez également lancer `Beacon` à partir du sélecteur d'application `F + 7`.

![Beacon écran de cycle de transmission](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identifiants

| Paramètre | Messages | Objectif |
| --- | --- | --- |
| `MOE` à `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | cinq identifiants standard de renard IARU ARDF |
| `MO` | `MO` | identifiant d'arrivée/de domicile |
| `CALL` | indicatif configuré suivi de `MOE` | balise de bande amateur identifiée |

L'indicatif vient de CHIRP `Message Line 1`. Les lettres sont converties en majuscules ; les lettres, les chiffres et `/` sont pris en charge. Voir [Programmation avec CHIRP](./Programming-with-CHIRP#beacon-identification).

L'identifiant utilise une tonalité `1000 Hz` à environ `12 WPM`.

## Synchronisation et saisie

* `TX` : `5` à `60 seconds`, par étapes `5-second` ; par défaut `30 seconds`
* `IDLE` : `5` à `240 seconds`, par étapes `5-second` ; par défaut `30 seconds`

Pour un timing classique à cinq renards, utilisez `TX = 60 s` et `IDLE = 240 s`.

| Mode | Comportement |
| --- | --- |
| `TONE` | Maintient la porteuse FM active pendant toute la fenêtre TX et active la tonalité `1000 Hz` |
| `CARR` | Associe la porteuse et la tonalité pour chaque élément Morse, de sorte que le signal disparaisse dans les espaces |

`TONE` est la valeur par défaut du nettoyeur. Le `CARR` reproduit plus fidèlement les émetteurs ARDF à porteuse interrompue, mais la saisie directe de la porteuse peut produire de petits clics et un étalement spectral supplémentaire.

## Contrôles

| Contrôle | Actions |
| --- | --- |
| `1` | Cycle la durée `TX` |
| `2` | Cycle la durée `IDLE` |
| `3` | Cycle l'identifiant |
| `4` | Basculer `TONE` / `CARR` |
| `F`, puis `1`, `2`, `3` ou `4` | Reculez le paramètre correspondant |
| maintenez `F` pendant environ 0,5 seconde | Verrouiller ou déverrouiller toutes les commandes Beacon |
| `M` pendant TX | Arrêtez la transmission en cours et commencez un nouvel intervalle de ralenti |
| `M` au repos | Redémarrez le compte à rebours complet |
| `EXIT` | Arrêtez-vous en toute sécurité et sortez Beacon |

Avant chaque rafale, Beacon vérifie les restrictions normales de fréquence d'émission, le `TXLock` par canal, l'état de la batterie et la modulation. Si la transmission est refusée, il affiche l'état radio correspondant et attend avant de tenter la prochaine rafale programmée.

## Paramètres enregistrés

Beacon enregistre son identifiant, la durée `TX`, la durée `IDLE` et le mode `TONE` / `CARR`. Ces paramètres sont restaurés au prochain lancement et sont inclus dans un transfert AirCopy `Settings`. Le verrouillage temporaire de l'application n'est pas enregistré.

## Pages connexes

* [FoxHunt](./Fox-Hunt)
* [Fonctions des boutons](./Button-functions#beacon-action)
* [Programmation avec CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Applications overlay](./Overlay-apps)
* [Applications overlay](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Utilisation de la radio](./Radio-operation)
