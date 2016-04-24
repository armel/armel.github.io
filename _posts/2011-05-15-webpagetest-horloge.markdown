---
layout: post
title: "Serveur WebPagetest Parisien et temps de latence"
author: Armel
categories: dev
tags:
- performance
- webpagetest
- sysadmin
---

Je vais vous relater une petite curiosité technique rencontrée dans le cadre de l'administration quotidienne des serveurs [WebPagetest](http://www.webpagetest.org/) Parisiens. Pour celles et ceux qui l'ignorent, [GLOBALIS](http://www.globalis-ms.com) héberge gracieusement une instance IE8 depuis novembre 2010 [^1].

# Une mise en route chaotique

Lors de la mise en place et de la configuration du serveur IE8, un détail a rapidement attiré l'attention de quelques experts de l'optimisation Frontend. Le temps de latence associé aux _DNS lookup_ était curieusement long. Quand je dis long, c'est très long. Je ne parle même pas de 250ms ou même 500ms. Mais carrément de 1.2s, et même parfois plus.

Evidement, tout le monde a été force de propositions. Certaines judicieuses, d'autres moins... De mon coté, après un diagnostique différentiel en bonne et due forme, j'ai passé deux nuits à multiplier les tests: ré-installer l'ensemble de la couche WebPagetest, couper l'antivirus AVG que j'avais installé par précaution (en mode minimaliste), changer la passerelle pour pointer vers Numéripro en lieu et place de Free, etc. J'ai même était jusqu'à changer la carte réseau. En vain !

La machine datait de 2 ou 3 ans, mais la mise en place d'un serveur WepPagetest ne nécessite pas une machine dernier cri. Et puis, j'avais pris soin de ré-installer complètement une version de Windows XP SP3 dessus (avec formatage du disque au préalable). Le problème était d'autant plus étrange que, en interactif, clavier et souris en mains, aucune latence n'était perceptible en naviguant librement de sites en sites. Hors, 1.2s de latence, ça devrait largement se ressentir et faire de la navigation une expérience douloureuse. J'ai bien accusé un bug lié à la couche WebPagetest. Mais comment le démontrer ? Les [forums](http://www.webpagetest.org/forums/) du site WebPagetest ne relataient rien de similaire.

<img src="/images/fulls/wpt_novembre2010_long.png" class="fit image">
<div class="align-center" style="margin-bottom:1em;">- Cascade Novembre 2010 -</div>

Je décide donc, perplexe, de changer de stratégie et de faire une ultime opération. J'opte pour dé-packager une nouvelle machine, que j'avais en carton. J'en ai toujours... au cas ou. Celle ci dispose d'un hardware plus récent. Je ré-installe l'ensemble de la couche WebPagetest et, surprise, les temps de latence observés sont normaux. L'origine du problème reste entier, mais résolu dans l'immédiat. Je pouvais donc passer à autre chose (j'ai un métier...), même si je n'étais pas satisfait d'en rester là. Heureusement, j'allais avoir l'occasion de revenir sur le sujet quelques mois plus tard, sans m'y attendre pour autant.

# Temps de latence fantaisistes, le retour...

Le mois dernier, mi avril 2011, [Patrick (Pat) Meenan](https://twitter.com/patmeenan), à l'origine du projet WebPagetest, me contact. Il observe des temps de latence fantaisistes sur le serveur IE8 Parisien. Détail amusant, ce ne sont plus des temps infiniment longs. Au contraire, ils sont curieusement très courts. Je parle cette fois de temps tournant autour de quelques ms (moins de 10ms). Hors, il faut savoir que les temps de latence observés ne peuvent être inférieurs à 50ms. C'est le minimum. Être en dessous, même très en dessous, révèle donc un problème. Pat a, du reste, relevé un souci similaire sur un autre serveur IE8 hébergé en Angleterre. Il me demande de faire quelques tests et de vérifier quelques paramétrages. Mais là encore, rien ! Le problème persiste. Pat me demande alors, en ultime recours, s'il serait possible que je lui donne un accès RDP/VNC, ce que je fais évidement dans la minute qui suit. Il ne le sait pas encore, mais isoler, comprendre et régler le problème va prendre... tic tac tic... 3 heures :)

<img src="/images/fulls/wpt_avril2011_court.png" class="fit image">
<div class="align-center" style="margin-bottom:1em;">- Cascade Avril 2011 -</div>

# Une histoire d'horloge

Lorsque vous faites un `ping` ou un `traceroute`, des temps de latence sont affichés. Pour estimer ces temps, il est évident que l'outil a besoin d'une horloge de référence. Un PC en dispose de plusieurs: __TSC (Time Stamp Counter), PM Timer et HPET (High Precision Event Timer)__ en font parties, sans oublier la classique horloge __RTC (Real Time Clock)__. Ces horloges n'ont qu'un seul point commun: celui de mesurer des temps ou des écarts. Mais les caractéristiques différent de l'une à l'autre.

Par exemple, HPET a été architecturée par Intel et Microsoft, afin de remplacer la traditionnelle horloge RTC, moins précise. Elle se matérialise sous la forme d'un composant discret. HPET offrant une résolution temporelle très fine et bien supérieure à RTC, elle est, par exemple, utilisée afin de synchroniser des flux multimedia (nouveaux besoins, nouvelle solution hardware...). Attention cependant, HPET peut être présente au niveau hardware, mais non utilisable pour autant. Le software doit suivre également. À ce titre, l'horloge HPET n'est fonctionnelle que sous Windows Vista et versions supérieures (donc hors XP), Mac OS (Intel évidement), Linux 2.6 et FreeBSD. 

La minuterie TSC, quant à elle, est une horloge à haute précision directement cablée au coeur du processeur (depuis l'avènement de l'architecture Pentium). Sans rentrer dans des détails trop techniques et fatalement barbants pour les non initiés, une mnémonique assembleur `RDTSC` permet de récupérer dans la paire de registres 32 bits (donc 64 bits en tout) `EDX:EAX`, le nombre de ticks écoulés depuis le dernier RESET du processeur. Le temps mesuré est donc, là aussi, très (très...) fin. Evidement, il est possible de récupérer ce temps sans passer par le langage assembleur. Windows dispose de nombreuses APIs et la fonction [QueryPerformanceCounter](http://msdn.microsoft.com/en-us/library/ms644904(v=vs.85).aspx) permet d'y accéder plus simplement.

# L'origine du problème et son contournement

Le problème, c'est que cette horloge TSC peut engendrer des dérives de temps, et donc des mesures fantaisistes, sur des machines disposant d'un processeur multi-coeurs lorsque, précisément, le temps entre les différents coeurs n'est pas correctement synchronisé. Il est alors possible, par exemple, d'observer un ping ou un traceroute retournant des temps curieusement longs, ou inversement faibles, voir même négatifs ! Nous y voilà ! La première machine, comme la seconde, que j'ai utilisé pour mettre en place ce serveur WebPagetest sous IE8, disposent d'une architecture multi-coeurs (je vous gâte trop...). Hors, l'usage de l'horloge TSC, sur une telle architecture, peut engendrer des erreurs de chronométrage. Microsoft recommande, du reste, d'utiliser prioritairement d'autres minuteries lorsqu'une application invoque la fonction [QueryPerformanceCounter](http://support.microsoft.com/kb/895980). WebPagetest mesurant fort logiquement tout un tas de temps, nous étions précisément confronté au phénomène. 

Rester donc à contourner le problème en forçant l'usage d'une autre horloge. Sous Windows NT jusqu'à la version 2003 (donc hors Vista, Windows 7 et Windows Server 2008), un programme est lancé à l'amorçage: *NTLDR* (pour NT Loader). Ce programme dispose également d'un fichier de configuration: *boot.ini*. C'est assez similaire, pour les utilisateurs de Linux, au principe de __GRUB__ ou de __LILO__ (je suis un ringard, je préfère et reste fidèle à LILO et à Slackware, mais je m'égards...). Il est donc possible, via le fichier *boot.ini*, de tuner un certain nombre de choses, dont cette problématique de minuterie. En ajoutant `/usepmtimer`, il est alors demandé à Windows d'utiliser explicitement l'horloge PM Timer en lieu et place de TSC. Il doit être possible, également, de jouer au niveau du BIOS. Mais c'est la solution via l'ajout de `/usepmtimer` dans le *boot.ini* que Pat a retenu et qui a permis de résoudre le problème.

# Conclusion

Voilà, j'espère avoir comblé la curiosité de certains sur le mystère des dérives de temps que vous aviez parfois observé sur le serveur WebPagetest IE8 Parisien. Cela sera peut-être utile à d'autres. Quant à Pat, il a eu l'occasion de manipuler un Windows XP SP3...en français et lui comme moi, d'en apprendre plus sur les horloges :) Ne l'oubliez jamais, __la vérité est souvent ailleurs__, ne croyez pas aveuglément les mesures, restez toujours pragmatique et gardez l'esprit critique. Bons tests à toutes et à tous !

[^1]: Et une instance Chrome depuis décembre 2011.
