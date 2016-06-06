---
layout: post
title: "Apache, PHP en mode FPM et timeout"
author: Armel
categories: sysadmin
tags:
- apache
- slackware
- php
---
Le fait d'utiliser PHP en mode FPM implique certaines subtilités que je n'avais pas dans mon scope.
Un lead dev de mon équipe m'a fait très justement remarquer qu'un timeout au niveau d'Apache venait interrompre l'exécution d'un de ses scripts [^1]. 
Et effectivement, il génère une erreur Apache au bout de 30 secondes.

```
[Fri Jun 03 18:27:07.545288 2016] [proxy_fcgi:error] [pid 19305:tid 139702805079808]
(70007) The timeout specified has expired: [client 192.168.1.18:54876]
AH01075: Error dispatching request to : (polling), referer: http://192.168.1.30/armel/php-54/

```

Alors on pense évidement à la limite par défaut du `max_execution_time`, fixée à 30 secondes. Mais non. Jouer sur ce paramètre n'y changera rien.

En fait, la solution se trouve au niveau d'Apache. Les lignes suivantes, à placer dans le */usr/local/apache/conf/httpd.conf*, en global ou au niveau d'un virtualhost, vont permettre de repousser la limite à 5 minutes (5 * 60 = 300).

```
<Proxy fcgi://127.0.0.1:9054>
  ProxySet timeout=300
</Proxy>
```

À noter que j'ai appliqué ce changement pour le pool FPM de PHP 5.4. Il conviendra que je l'ajoute aussi aux autres.

[^1]: Je précise que le script en question est hérité d'un projet en TMA... 