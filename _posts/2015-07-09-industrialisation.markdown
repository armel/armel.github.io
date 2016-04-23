---
layout: post
title: "Industrialisation: il reste du chemin à faire..."
categories: dev
tags:
- réflexion
- développement
---

Ces dernières années, l’industrialisation s’est imposée comme une problématique majeure et une attente forte de la part des équipes de développement. Et si le profane ne sait pas toujours en définir les contours et qu’il s’imagine avec effroi un alignement de murs de briques rouges ou de grandes cheminées crachant une fumée noire et épaisse, les développeurs aguerris savent parfaitement de quoi il en retourne. Et ils ont même, le plus souvent, développé une certaine forme d’appétence à l’égard de l’industrialisation. L’attrait de la nouveauté mais aussi l’occasion de pouvoir enrichir leur CV et cocher de nouvelles cases, nourrissent cette attente forte. Pour ma part, j’ai un regard un peu critique sur tout cela et je vais tenter d’expliquer pourquoi.

Entendons nous bien, je ne remets pas en cause l’intérêt même de l’industrialisation. Il est évidement important de chercher à cadrer ses processus de développement, à professionnaliser son travail, à éviter de devoir tout ré-inventer à chaque projets. Uniformiser et capitaliser est la seule bonne approche. Et c’est le but, précisément, de l’industrialisation. Tant mieux !

Non, ce que je remets en cause, c’est la méthode. Et plus particulièrement, la problématique des outils. Pour reprendre une sémantique bien connu, je résumerais en disant que « trop d’outils tue l’outil ». Voyons pourquoi.

## Ouvrons les yeux et prenons un peu de recul

Premier constat, en prenant un peu de recul, ces dernières années ont été marquées par une proliférations tout à fait extraordinaire du nombre d’outils à disposition. Second constat, aucun écosystème en vue n’a échappé à la règle et tous ont globalement évolué dans le même sens en s’enrichissant les uns des autres. 

Prenons l’exemple des gestionnaires de packages. Si vous êtes un développeur, NodeJs propose NPN, Python utilise PIP, PHP dispose de Composer. Et si vous être plutôt un intégrateur, vous connaissais probablement Bower. L’ensemble de ces outils font globalement la même chose: vous accompagner dans le téléchargement de briques tout en cherchant à répondre à l’épineux problème des dépendances.

Il en va de même des gestionnaires de tâches. Cette fois, l’idée est de disposer d’un outil qui vous permettra d’exécuter des tâches comme par exemple, lancer une séquence de tests, concatener et compresser des feuilles de style CSS, mettre en production, etc. Et là encore, les outils ne manquent pas suivant les différents écosystèmes. Si vous êtes un développeur, Java dispose de Ant, PHP propose Phing et depuis peu Robo. Et si vous être plutôt un intégrateur, vous connaissais probablement Grunt ou Gulp.

Vous l’avez remarqué, je viens de citer 2 écosystèmes qui proposent déjà 2 outils qui semblent faire la même chose: Phing et Robo pour les développeurs PHP, Grunt et Gulp pour les intégrateurs. Il y a des exemples bien plus éloquents encore. Toujours coté Frontend, prenez le cas particulier des pré-processeurs CSS. Vous connaissez peut-être LESS ? Vous l’avez même peut-être trouvé trop limité et avez choisi d’opter pour Sass ou son framework Compass ? Et puis peut-être qu’un jour, vous avez fini par vous dire que finalement, un truc plus léger et plus modulaire ferait l’affaire et que seule la prise en charge des variables et des mixins vous suffiraient ? Et vous vous êtes tournez vers Rework CSS.

Bien garder en tête qu’à chaque fois, derrière ce scénario itératif pas totalement farfelu, il y a de la veille, de la prise en main, de la mise en pratique avec plus ou moins de succès, etc. Bref, du temps… 

## Ce que j'espère...

L’industrialisation arrivera à maturité le jours où, d’une part, les outils seront globalement figés (ce qui n’interdit pas des évolutions). Dans ce domaine, le darwinisme logiciel fait et fera son oeuvre, mais d’ici là… Et d’autre part, lorsque ces outils seront indépendants des éco-systèmes. Sur ce point, nous en sommes loin. Et pourtant, je suis convaincu que c’est possible !

Revenons un instant sur les gestionnaires de tâches. J’ai la chance d’être né avec Unix. Le C est arrivé un peu après. Et avec lui, tout un tas d’outils suivant le principe du KISS cher à Unix. Et depuis 1977, grâce au travail du docteur Stuart Feldman (que vous ne connaissiez probablement pas), nous disposons de make ! Même si les fichiers Makefile sont de plus en plus rarement écrits par les développeurs, des outils comme autoconf ou cmake ayant pris le relais, la syntaxe reste accessible et relativement simple. Mieux, l’outil est précisément indépendant de tel ou tel langage ou écosystème. Il est générique. 

Alors, n’aurait-il pas était utile de capitaliser sur make, éventuellement de l’enrichir en prenant en compte les nouveaux usages liés notamment au Web, plutôt que de ré-inventer n outils inféodés à n éco-systèmes ? Pour moi, la réponse est évidement oui. Et si make n’est pas la réponse, de toutes façons, il devient de plus en plus urgent d’uniformiser les outils en les rendants souples, simples, efficaces et indépendant des technos ! 
 