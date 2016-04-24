---
layout: post
title: "Apache 2.4 et multiples versions de PHP en mode FPM"
categories: matos
tags:
- php
- apache
---
Ce billet explique comment déployer Apache 2.4 et de multiples versions de PHP en mode FPM (Fast Process Manager). L'idée est de tirer profit des dernières évolutions d'Apache, mais surtout, de pouvoir faire cohabiter les différentes versions de PHP simultanément, tout en profitant des performances remarquables de la SAPI FPM.

Cette procédure a été testée et approuvée sur la distribution Slackware (13.37.0). J'utilise cette distribution depuis 1993. Donc, ne pas s'attendre à l'utilisation de commandes `apt-get` et autres `yum`. On va partir des sources d'Apache et de PHP, compiler et configurer l'ensemble, écrire des fichiers *rc*, etc. 

## Installation d'Apache 2.4

Pour débuter, commençons par télécharger et compiler Apache.

```
$ wget http://wwwftp.ciril.fr/pub/apache//httpd/httpd-2.4.18.tar.gz
$ tar xvfz httpd-2.4.18.tar.gz
$ cd httpd-2.4.18
# => Téléchargement des sources d'Apache, unarchivage et déplacement
     dans le répertoire source

$ cd srclib
$ wget http://wwwftp.ciril.fr/pub/apache//apr/apr-1.5.2.tar.gz
$ tar xvfz apr-1.5.2.tar.gz
$ mv apr-1.5.2 apr
$ wget http://wwwftp.ciril.fr/pub/apache//apr/apr-util-1.5.4.tar.gz
$ tar xvfz apr-util-1.5.4.tar.gz
$ mv apr-util-1.5.4 apr-util
# => Ajout de APR et APR util

$ cd ..
$ './configure' \
'--prefix=/usr/local/apache' '--enable-module=so' \
'--enable-rewrite' '--enable-deflate' '--enable-expires' \
'--enable-logio' '--with-included-apr' '--with-mpm=worker'
$ make
# => Compilation d'Apache en mode mpm_worker
```

Apache propose plusieurs Modules Multi-Processus (MPM). Ici, j'ai choisi `worker`, mais il est possible d'opter pour `prefork` ou `event`. 

```
$ './configure' \
'--prefix=/usr/local/apache' '--enable-module=so' \
'--enable-rewrite' '--enable-deflate' '--enable-expires' \
'--enable-logio' '--with-included-apr' '--with-mpm=prefork'
$ make
# => Compilation d'Apache en mode mpm_prefork

$ './configure' \
'--prefix=/usr/local/apache' '--enable-module=so' \
'--enable-rewrite' '--enable-deflate' '--enable-expires' \
'--enable-logio' '--with-included-apr' '--with-mpm=event'
$ make
# => Compilation d'Apache en mode mpm_event
```

On peut maintenant installer Apache via la commande `make install`.

Il reste alors à éditer le ficher *httpd.conf* et veiller à activer `LoadModule proxy_module modules/mod_proxy.so` et `LoadModule proxy_fcgi_module modules/mod_proxy_fcgi.so`. Ces modules seront essentiels pour utiliser PHP en mode FPM. En fonction des besoins, on peut aussi en profiter pour éditer les directives `DirectoryIndex`, `ServerName`, `Listen`, la prise en comptes des fichiers *.htaccess*, etc.

On peut alors démarrer Apache.

```
$ /usr/local/apache/bin/apachectl start
# => Démarrage d'Apache
```

## Installation de PHP

Nous allons maintenant installer différentes versions de PHP que nous ferons cohabiter ensemble. 

```
$ wget http://fr2.php.net/get/php-7.0.5.tar.gz/from/this/mirror
$ tar xvfz php-7.0.5.tar.gz
$ cd php-7.0.5
# => Téléchargement des sources de PHP, unarchivage et déplacement
     dans le répertoire source

$ './configure' \
'--enable-fpm' '--with-fpm-user=daemon' '--with-fpm-group=daemon' \
'--prefix=/usr/local/php-70' '--with-config-file-path=/usr/local/php-70' \
'--with-mysqli=mysqlnd' '--enable-pdo' '--with-pdo-mysql=mysqlnd' \
'--with-openssl' '--enable-bcmath' '--with-bz2' '--with-pic' \
'--enable-calendar' '--enable-ctype' '--enable-ftp' '--with-gd' \
'--with-freetype-dir' '--with-png-dir' '--with-jpeg-dir=/usr' \
'--with-gmp' '--enable-sockets' '--enable-sysvsem' '--enable-sysvshm' \
'--disable-debug' '--with-zlib=/usr' '--with-pear' '--enable-simplexml' \
'--enable-mbstring=all' '--with-pspell' '--with-curl' '--with-xsl' \
'--with-mcrypt' '--enable-soap' '--enable-zip' '--enable-pcntl' \
'--with-readline' '--enable-opcache' '--without-pear' '--with-libdir=lib64'
$ make
# => Compilation de PHP en mode FPM
```

PHP est compilé ici en mode FPM. À noter les paramétrages `--prefix` et `--with-config-file-path`. Ils sont importants et vont permettre de parfaitement __isoler__ les différentes versions de PHP entre elles. On peut maintenant installer PHP via la commande `make install`.

Il reste encore quelques opérations de post-installation à effectuer.

```
$ mv /usr/local/php-70/sbin/php-fpm /usr/local/php-70/sbin/php-fpm-70
# => Renommage du binaire php-fpm

$ mkdir /usr/local/php-70/extensions
# => Création d'un répertoire pour accueillir les extensions dans le répertoire d'installation

$ cp modules/opcache.so /usr/local/php-70/extensions/
# => Copie du module opcache.so

$ cp php.ini-development /usr/local/php-70/php.ini
# => Copie du fichier php.ini-development dans le répertoire d'installation
```

On peut maintenant éditer le fichier *php.ini* placé dans le répertoire d'installation afin d'initialiser correctement quelques directives comme `extension_dir = /usr/local/php-70/extensions`, `date.timezone = Europe/Paris` ou encore charger le cache d'opcode en ajoutant `zend_extension = opcache.so`.

Il reste à dérouler la même procédure avec les différentes version de PHP que l'on désire faire cohabiter: PHP 5.5, PHP 5.6, etc. Il faut juste bien penser à isoler les différentes versions entre elles en jouant avec les paramétrages `--prefix` et `--with-config-file-path` lors de la compilation de PHP et bien cibler le bon répertoire d'installation dans la suite des opérations.

## Configuration et lancement de PHP en mode FPM

La configuration et le lancement des pools FPM passent par la mise en place de 2 fichiers.

Par exemple pour PHP 7.0, un premier fichier que nous appelerons */etc/php-fpm-70.conf*, servira à la configuration.

```
[global]
pid = /var/run/php-fpm-70.pid
error_log = /var/log/php-fpm-70.log

[www]
user = daemon
group = daemon
listen = 127.0.0.1:9070
pm = dynamic
pm.max_children = 40
pm.start_servers = 10
pm.min_spare_servers = 10
pm.max_spare_servers = 20
pm.max_requests = 1000
chdir = /
```

Bien noter encore ici le soin particulier apporté à l'isolation dans les chemins `pid` et `error_log`, mais aussi au niveau `listen` dans le choix du port réseau à écouter. Il conviendra d'adapter et affiner les autres paramétres en fonction de vos besoins.

Un second fichier, que nous appelerons */etc/rc.d/rc.php-fpm-70*, servira à lancer le pool.

```
#! /bin/sh

### BEGIN INIT INFO
# Provides:          php-fpm
# Required-Start:    $remote_fs $network
# Required-Stop:     $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: starts php-fpm
# Description:       starts the PHP FastCGI Process Manager daemon
### END INIT INFO

prefix=/usr/local/php-70
exec_prefix=${prefix}

php_fpm_BIN=${exec_prefix}/sbin/php-fpm-70
php_fpm_CONF=/etc/php-fpm-70.conf
php_fpm_PID=/var/run/php-fpm-70.pid

php_opts="--fpm-config $php_fpm_CONF"

wait_for_pid () {
    try=0

    while test $try -lt 35 ; do

        case "$1" in
            'created')
            if [ -f "$2" ] ; then
                try=''
                break
            fi
            ;;

            'removed')
            if [ ! -f "$2" ] ; then
                try=''
                break
            fi
            ;;
        esac

        echo -n .
        try=`expr $try + 1`
        sleep 1

    done

}

case "$1" in
    start)
        echo -n "Starting php-fpm "

        $php_fpm_BIN $php_opts

        if [ "$?" != 0 ] ; then
            echo " failed"
            exit 1
        fi

        wait_for_pid created $php_fpm_PID

        if [ -n "$try" ] ; then
            echo " failed"
            exit 1
        else
            echo " done"
        fi
    ;;

    stop)
        echo -n "Gracefully shutting down php-fpm "

        if [ ! -r $php_fpm_PID ] ; then
            echo "warning, no pid file found - php-fpm is not running ?"
            exit 1
        fi

        kill -QUIT `cat $php_fpm_PID`

        wait_for_pid removed $php_fpm_PID

        if [ -n "$try" ] ; then
            echo " failed. Use force-quit"
            exit 1
        else
            echo " done"
        fi
    ;;

    force-quit)
        echo -n "Terminating php-fpm "

        if [ ! -r $php_fpm_PID ] ; then
            echo "warning, no pid file found - php-fpm is not running ?"
            exit 1
        fi

        kill -TERM `cat $php_fpm_PID`

        wait_for_pid removed $php_fpm_PID

        if [ -n "$try" ] ; then
            echo " failed"
            exit 1
        else
            echo " done"
        fi
    ;;

    restart)
        $0 stop
        $0 start
    ;;

    reload)

        echo -n "Reload service php-fpm "

        if [ ! -r $php_fpm_PID ] ; then
            echo "warning, no pid file found - php-fpm is not running ?"
            exit 1
        fi

        kill -USR2 `cat $php_fpm_PID`

        echo " done"
    ;;

    *)
        echo "Usage: $0 {start|stop|force-quit|restart|reload}"
        exit 1
    ;;

esac
```

Et voilà. On peut alors lancer notre pool de parseurs PHP 7.0.

```
$ /etc/rc.d/rc.php-fpm-70 start
# => Lancement du pool FPM de parseurs PHP 7.0
```

Comme précédement, dérouler la même procédure avec les différentes version de PHP que l'on désire faire cohabiter.

Voici ce que doit produire la commande `pstree` avec les versions PHP 5.4, 5.5, 5.6 et 7.0

```
$ pstree | grep php
     |-php-fpm-54---10*[php-fpm-54]
     |-php-fpm-55---10*[php-fpm-55]
     |-php-fpm-56---10*[php-fpm-56]
     |-php-fpm-70---10*[php-fpm-70]
# => Exécution de la commande pstree permettant de visualiser les pools
```

## Compilation d'une extension PHP

Lorsque l'on compile une extension PHP, le binaire produit dépend de la version de PHP (du Zend Engine). C'est pour cela que le binaire d'une extension compilée pour PHP 5.4 ne fonctionnera pas avec PHP 5.5 ou 5.6, le moteur interne de PHP ayant changé. C'est aussi pour cela que nous avons compilé PHP avec les paramétrages `--prefix` et `--with-config-file-path`. Cela va simplifier la compilation de nouvelles extensions. Voici la marche à suivre avec, par exemple, la compilation de xDebug pour PHP 7.0.

```
$ wget https://xdebug.org/files/xdebug-2.4.0.tgz
$ tar xvfz xdebug-2.4.0.tgz
$ cd xdebug-2.4.0
# => Téléchargement des sources de xDebug, unarchivage et déplacement
     dans le répertoire source

$ /usr/local/php-70/bin/phpize
$ ./configure --with-php-config=/usr/local/php-70/bin/php-config
$ make
# => Compilation de xDebug

$ cp modules/xdebug.so /usr/local/php-70/extensions/
# => Copie de l'extension dans le répertoire d'extensions
```

Et voilà, une fois encore, dérouler la même procédure avec les différentes version de PHP en prenant soin de pointer vers les bonnes versions de `phpize` et `php-config`.

## Mise en oeuvre et performance

Afin d'activer le parseur de telle ou telle version de PHP, il suffit d'utiliser un simple fichier *.htaccess*. Par exemple, pour activer le parseur de PHP 7.0.

```
<FilesMatch \.php$>
    SetHandler "proxy:fcgi://127.0.0.1:9070"
</FilesMatch>
```

On peut aussi ajouter ces précédentes lignes directement dans le *httpd.conf*, en global ou au niveau de tel ou tel *virtualhost*.

Rappelons que l'utilisation de PHP en mode FPM implique d'avoir recours à un fichier *.user.ini* si l'on désire affiner les paramétrages de PHP dans tel ou tel répertoire.

En terme de performance, à serveur constant, l'utilisation d'Apache 2.4 et de la SAPI FPM se montre de loin la combinaison la plus performante, comparativement à PHP en module ou en CGI. Cette combinaison fait également globalement jeu égal avec Nginx d'après mes observations et tests de montée en charge.
