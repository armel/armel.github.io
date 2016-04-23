---
layout: post
title: Qu’est-ce qu’un bon développeur PHP...
categories: dev
tags:
- réflexion
- développement
- php
---

## Le langage joue un rôle secondaire
Dans un premier temps, j’aurais tendance à élargir cette question à « qu’est-ce qu’un bon développeur...tout court » en faisant volontairement abstraction de PHP. En effet, je pense qu’une partie de la réponse est clairement indépendante du langage employé.

Un bon développeur, c’est déjà quelqu’un de suffisamment mature et pragmatique pour avoir pris conscience que la technique n’est que rarement un objectif, mais presque toujours un moyen… Ne jamais perdre de vue la finalité d’un développement : répondre aux besoins du client et au cahier des charges. Cela passe par en respecter le périmètre, en accepter les contraintes et les délais, etc. Ca peut sembler idiot, mais de trop nombreux développeurs, souvent encore jeunes, tendent à mettre en avant plan la technique, motivés par une soif intarissable d’apprendre, mais au détriment du projet final. C’est une erreur…imputable à un manque d’expérience.

Un bon développeur, c’est aussi quelqu’un d’agile, à même de se remettre en question, et sachant faire les bons choix. Ca passe aussi par être capable d’abandonner quelques temps son langage de prédilection pour lui préférer une technologie différente, mieux à même d’apporter une réponse pertinente et élégante à un problème précis. Par exemple, si vous avez besoin d’établir une connexion clients / serveur, temps réel et bidirectionnelle, alors se tourner vers Node.js apparait aujourd’hui comme un choix intelligent.

Un bon développeur, c’est quelqu’un capable d’avoir un regard critique sur le code qu’il produit. Débuter sa journée, ou la terminer suivant ses convenances, en prenant quelques minutes pour reprendre son code afin de l’améliorer, d’isoler d’éventuelles failles, etc. est une très bonne habitude, mais malheureusement trop rare.

Un bon développeur, c’est aussi quelqu’un de curieux et de créatif. Et oui, les bons développeurs sont des créatifs. Et c’est trop souvent ignoré !

Enfin, un bon développeur, à l’image de tant d’autres métiers, a… de bons outils ! Ceci peut être élargie également aux méthodes et aux bonnes pratiques. Si je vois sur un poste de travail d’un développeur, un navigateur avec plusieurs onglets, un éditeur et un terminal ouvert, idéalement avec un prompt un peu travaillé, me laissant entendre que son travail est versionné…j’aurais un à priori positif. Ca tiens à peu de choses :) 

## Cas particulier de l'écosystème PHP

Si l’on cible maintenant plus précisément les développeurs PHP, j’ajouterais quelques remarques complémentaires. 

Un bon développeur PHP, c’est quelqu’un qui maitrise avant tout le langage, et non comme je le vois de plus en plus souvent, un socle reposant sur ce langage. Combien de développeur sont avant tout formaté Symfony ou Drupal, sans savoir ce qu’est une variable static, comment fonctionne une session ou comment écrire  une requête SQL. Connaitre un ou plusieurs socles est important. Ca permet d’étoffer sa « boite à outils ». Mais maitriser l’ADN, à savoir PHP, SQL, etc., reste essentiel.

Plus généralement, un bon développeur PHP, c’est aussi quelqu’un ayant une bonne compréhension de l’ensemble de la « stack » sur laquelle repose traditionnellement les développements Web. Comprendre le rôle et le fonctionnement du serveur HTTP, que ce soit Apache ou Nginx, est important. Du reste, la lecture, même en diagonale, de la RFC 1945 (HTTP 1.0), 2616 (HTTP 1.1) ou plus récemment 7540 (HTTP/2), n’est pas forcément du temps perdu. Comprendre le rôle et le fonctionnement du SGBD, que ce soit MySQL, MariaDB ou PsotgreSQL est utile aussi. Comprendre le rôle du système d’exploitation en couche basse l’est également.  