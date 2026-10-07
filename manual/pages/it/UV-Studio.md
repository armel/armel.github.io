# UV Studio

UV Studio è il compagno basato sul browser per il firmware F4HWN compatibile su UV-K1 e UV-K5 V3. Combina funzioni di visualizzazione dal vivo e tastiera remota, installazione del firmware, manutenzione radio, gestione Multiboot e gestione di app Labs in un'unica interfaccia.

Apri qui:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio comunica direttamente con la radio tramite l'API `Web Serial`. I dati radio vengono gestiti localmente nel browser; non è richiesta l'installazione di applicazioni, l'account server o l'upload cloud.

> [!IMPORTANT]
> UV Studio non si limita all'edizione Fusion. I suoi strumenti generali funzionano con le edizioni F4HWN compatibili, mentre alcune viste richiedono una specifica funzionalità del firmware. In particolare, la gestione overlay-app e gli strumenti esterni-Flash sono per Labs.

## Stato della versione

UV Studio `v1.6.0` accompagna il firmware stabile `v6.1.0`. Oltre al catalogo firmware v6, Multiboot gestione slot, e versioned catalogo ufficiale overlay-app, aggiunge:

* un'interfaccia riorganizzata che raggruppa il backup di calibrazione/ripristina e il download/upload del boot-logo
* backup completo `2 MiB` esterno-Flash e ripristino per le build Labs compatibili
* CRC32 comparazione e verifica per un ripristino esterno più veloce e sicuro
* restauro guidato della fabbrica ricostruita Flash esterno seguito dal firmware stock corretto per UV-K1 o UV-K5 V3

## Requisiti

Hai bisogno di:

* un compatibile Quansheng UV-K1 o UV-K5 V3 con PY32F071 MCU
* una connessione `USB-C` compatibile o un cavo USB-to-Serial in stile Baofeng/Kenwood compatibile
* un browser desktop con supporto `Web Serial`, come Chrome, Brave, Edge, Opera o Firefox 151+

Una copia scaricata dell'albero sorgente completo UV Studio può anche essere aperta localmente. Si tratta di un'applicazione statica HTML/CSS/JavaScript e non richiede un passo di build o un server web locale.

## Sintesi della funzione e della radio

| Strumento | Stato radio richiesto | Requisiti del firmware |
| --- | --- | --- |
| Live Viewer e live RF Log | avvio normale | Supporto compatibile Viewer/RF Log |
| Firmware Flash | `DFU` / modalità flash | UV-K1 o UV-K5 V3 bootloader |
| Calibrazione, Boot Logo, RF Log export | avvio normale | firmware compatibile F4HWN |
| Slot di firmware | avvio normale | Multiboot-capable `v6.0.0` o nuovo |
| Apps | avvio normale | Labs con supporto overlay-app |
| Backup / ripristino Flash esterno | avvio normale | `v6.1.0` Labs con accesso esterno-Flash |
| Restauro software di fabbrica | normale avvio Labs, quindi DFU quando richiesto | `v6.1.0` Labs per la prima fase |

Per entrare in modalità `DFU`, spegnere la radio, tenere premuto `PTT`, e accenderlo mentre continua a tenere `PTT`. Rilasciare `PTT`, quindi collegare o riconnettere il cavo dati. Non è richiesta alcuna chiave laterale.

## Cosa può fare UV Studio

UV Studio fornisce:

* un display radio in tempo reale `128x64`
* tastiere virtuali UV-K1 e UV-K5 con presse brevi e lunghe
* una finestra di tasti staccabile e un controllo di riavvio della radio
* schermate radio e rendering LCD regolabile
* attività RF live, marcatori di sessione, filtri e analisi
* esportazione di attività di registro RF memorizzate in CSV
* installazione del firmware dal catalogo ufficiale, la costruzione di sviluppo rolling, o un file locale `.bin`
* download diretto del driver CHIRP corrispondente per firmware F4HWN versione stabile
* installazione, validazione, denominazione, cancellazione e ripristino di configurazione di slot firmware Multiboot
* installazione e rimozione di applicazioni overlay Labs da un catalogo ufficiale versioned o file `.app` locali
* backup di calibrazione e ripristino
* download, anteprima, conversione e caricamento di boot-logo personalizzato
* backup esterno-Flash, ripristino e recupero di software di fabbrica guidato in `v1.6.0`
* temi e traduzioni leggere e scure in dieci lingue

UV Studio possiede la connessione seriale a livello globale. Previene che due operazioni utilizzino la porta allo stesso tempo e mantiene o ripristina la connessione quando si passa tra strumenti compatibili normali.

## Visualizzatore dal vivo

Il Live Viewer rispecchia il display radio e fornisce tasti virtuali UV-K1 e UV-K5 corrispondenti.

1. Avviare la radio normalmente.
1. Collegare la radio al computer.
1. Apri `Live Viewer`, seleziona la tastiera appropriata e fai clic su `Connect`.
1. Scegli la porta seriale radio.
1. Utilizzare la tastiera virtuale o la tastiera del computer.
1. Fare clic su `Disconnect` prima di scollegare il cavo.

La barra degli strumenti può riavviare la radio collegata, catturare uno screenshot, cambiare l'aspetto LCD simulato e staccare la tastiera in una finestra galleggiante. Il pannello `Help` incorporato elenca tutte le scorciatoie della tastiera; i controlli comuni includono i tasti freccia per la navigazione, le cifre per le presse corte, `Shift` più una chiave per una lunga pressa, `Enter` o `M` per il menu, `Esc` per l'uscita, e `F1` / `F2` per i pulsanti laterali.

> [!IMPORTANT]
> Il controllo del visore non può avviare una trasmissione. `PTT` visualizzato non è disponibile e UV Studio non è uno strumento remoto TX.

## RF log

Quando il firmware in esecuzione supporta RF Log e il ponte Viewer, UV Studio visualizza sessioni live RX e TX con:

* informazioni di direzione, frequenza e canale
* durata della sessione
* Livello di segnale RX o potenza TX
* tensione della batteria
* Filtri `ALL`, `RX` e `TX`
* attività, aria, frequenza, sessione e analisi della batteria

Lo strumento `Export RF Log` separato legge fino alle ultime attività memorizzate `512` e marcatori power-on e crea `rf-log.csv`. Tenere la radio in modalità normale. Se i nomi dei canali o le informazioni della banca di configurazione sono errate, aggiornate su un firmware contenente le ultime correzioni di registro v6 RF.

## Firmware Flash

> [!WARNING]
> Flashing un'immagine incompatibile o corrotta può lasciare la radio inutilizzabile. Confermare la compatibilità del modello e del bootloader, effettuare un backup di calibrazione e mantenere il cavo collegato fino al termine dell'operazione.

Il catalogo del firmware raggruppa l'attuale stabile F4HWN costruito per edizione, include il rolling Fusion development building e può anche offrire immagini stock compatibili. Un file `.bin` locale rimane disponibile quando il catalogo non può essere caricato o quando si utilizza una costruzione personalizzata.

1. Avviare la radio in modalità `DFU`.
1. Apri `Flash Firmware`.
1. Selezionare la corretta voce del catalogo o scegliere un file `.bin` locale compatibile.
1. Fare clic su `Flash firmware` e selezionare la porta seriale.
1. Attendere che l'operazione di progresso per finire e per la radio di riavviare.

Quando viene selezionata una versione stabile F4HWN, UV Studio offre il driver condiviso CHIRP pubblicato per quella versione firmware. Lo sviluppo di rotolamento e le costruzioni di stock non usano quel link di driver automatico.

## Slot di firmware

Tutte e quattro le edizioni ufficiali `v6.0.0` supportano Multiboot. UV Studio gestisce slot utente da `1` a `4` in Flash esterno. Il backup `Main` protetto è mantenuto dal firmware e non è intenzionalmente esposto come uno slot writable.

Per installare un'altra edizione:

1. Avviare una radio multiboot normalmente.
1. Apri `Firmware Slots` e rinfresca il tavolo.
1. Selezionare un'immagine stabile `v6.x` F4HWN compatibile dal catalogo o caricare un file `.bin` locale.
1. Scegliere slot `1` a `4` e inserire facoltativamente un nome di visualizzazione fino a caratteri `15`.
1. Selezionare `Write to slot`, confermare e attendere per cancellare, scrivere e la verifica completa CRC.

Il catalogo di slot esclude intenzionalmente firmware stock, firmware v5 e l'immagine di sviluppo rolling perché tali voci non sono garantite per tornare al selettore Multiboot.

Ogni slot popolato ha due azioni di manutenzione indipendenti:

* `Erase FW` rimuove l'immagine del firmware memorizzata ma non ripristina la banca di configurazione della slot.
* `Reset config` cancella i canali e le impostazioni bancarie associate a tale slot ma lascia l'immagine del firmware installata.

Vedere [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) per `Main`, selezione slot, banche di configurazione, `SetCfg` e comportamento di recupero.

## Apps (Labs)

La vista `Apps` gestisce le otto slot sperimentali overlay-app nell'edizione Labs.

1. Avviare Labs normalmente e aprire `Apps`.
1. Aggiornare la tabella app-slot.
1. Selezionare la versione firmware, quindi un'applicazione ufficiale dal suo catalogo versioned; in alternativa, caricare un file `.app` locale.
1. Selezionare lo slot di destinazione e scegliere `Install app`.
1. Alla radio, utilizzare `F + 7`, selezionare l'app e premere `M`.

UV Studio mostra il nome dell'app, la versione, la dimensione e lo stato di convalida. Cancellare un app cancella solo quella slot app.

> [!IMPORTANT]
> Le app overlay sono legate al firmware ABI, livello API, indirizzo RAM e funzionalità. Selezionare la versione del catalogo app corrispondente al firmware installato. Reinstallare applicazioni compatibili dopo un aggiornamento firmware quando necessario.

Vedi [Applicazioni di sovrapposizione](./Overlay-apps) per la compatibilità del caricatore e [Applicazioni di sovrapposizione](./Overlay-applications) per lo scopo e i controlli di ogni app.

## Scegliere il backup giusto o copia

Queste operazioni proteggono o copiano diverse parti della radio e non sono intercambiabili:

| Operazione | Che cosa contiene | Miglior uso | Comportamento di calibrazione |
| --- | --- | --- | --- |
| UV Studio `Calibration` | calibrazione RF e hardware specifiche del dispositivo | backup di sicurezza essenziale per una radio | legge esplicitamente o ripristina la calibrazione; utilizzare solo con la stessa radio |
| CHIRP immagine radio | canali più impostazioni comprese da quella versione driver | modifica e migrazione di ricordi / impostazioni | non un sostituto per un backup di calibrazione |
| UV Studio `External Flash` | raw `2 MiB` immagine esterna-Flash, incluse configurazioni, slot, app, log, logo e dati di calibrazione nel file di backup | backup completo del file e ripristino | il restauro conserva deliberatamente la taratura già presente alla radio di destinazione |
| memoria AirCopy o `Settings` | banche di memoria selezionate e/o impostazioni radio compatibili | sincronizzare i dati selezionati tra due radio | non copia la calibrazione hardware |
| AirCopy `Flash 2M` | esterno Flash clonato direttamente su un cavo | rendere la fonte condivisa di un'altra radio esterna-Flash | esclude e preserva il settore di taratura della radio di destinazione |

Per gli aggiornamenti di routine, fare almeno un backup di calibrazione e un'immagine CHIRP. Utilizzare il backup completo esterno-Flash prima di sperimentare con Multiboot, slot app, recupero di fabbrica o archiviazione a basso livello.

## Backup e ripristino Flash esterno (v1.6.0)

Questo strumento richiede i comandi esterni-Flash forniti da `v6.1.0` Labs. Non è disponibile in `v6.0.0`.

La vista `External Flash` legge o ripristina il Flash SPI esterno completo `2 MiB` PY25Q16 per indirizzo fisico. Questo include banche di configurazione, slot firmware, slot app, registro RF, stato Multiboot, logo di avvio e altri dati condivisi.

### Indietro

1. Avviare una build Labs compatibile normalmente.
1. Apri `External Flash` e seleziona `Back up`.
1. Fare clic su `Read external flash` e scegliere la porta seriale.
1. Attendere che il chip completo sia letto; questo può richiedere diversi minuti.
1. Scarica `external-flash.bin`.

Il backup è esattamente `2 MiB`. Conservalo in modo sicuro: contiene dati di configurazione radio e di calibrazione specifica del dispositivo.

### Ripristino

1. Avviare una build Labs compatibile normalmente.
1. Apri `External Flash` e seleziona `Restore`.
1. Scegli un backup `2 MiB` completo creato da questo strumento.
1. Fare clic su `Restore external flash` e confermare l'operazione distruttiva.
1. Tenere la radio alimentata e collegata fino a quando la verifica completa e il reboot radio.

UV Studio rifiuta i file che non sono esattamente `2 MiB`. Funziona settore per settore in unità `4 KiB` e non cancella mai o scrive il settore di calibrazione specifica del dispositivo. Con il firmware corrente confronta i valori CRC32, i settori skips già identici, scrive solo i settori rimanenti, e verifica ciascuno. Si riduce a un confronto diretto byte quando il comando CRC non è disponibile.

> [!WARNING]
> Il ripristino sostituisce quasi tutti i contenuti esterni-Flash, comprese le impostazioni, i registri, il logo, le applicazioni, le slot firmware e lo stato Multiboot. Il settore di taratura della radio ricevente è conservato, quindi un backup completo da una radio non è un metodo per copiare la calibrazione della radio ad un altro.

Per una copia radio-radio diretta di Flash esterno, vedere la funzione `Flash 2M` di sola cavo separata in [AirCopy](./AirCopy#external-flash-cloning).

## Restauro software di fabbrica (v1.6.0)

La vista `Factory reset` è un recupero di due stadi guidato per il ritorno di un UV-K1 o UV-K5 V3 a software Quansheng corrispondente:

1. Avviare `v6.1.0` Labs normalmente.
1. Apri `Factory reset` e seleziona il modello esatto: `UV-K1` o `UV-K5 V3`.
1. Conferma l'avvertimento. UV Studio carica l'immagine esterna-Flash di fabbrica ricostruita corrispondente e il firmware di magazzino, quindi verifica la loro dimensione e SHA-256 prima di scrivere nulla.
1. UV Studio ripristina e verifica il Flash esterno preservando il settore di calibrazione specifico del dispositivo.
1. Quando viene richiesto, spegnere la radio e inserire la modalità `DFU`. Non iniziare normalmente tra le due fasi.
1. Selezionare `Continue in DFU`; UV Studio installa automaticamente il firmware corrispondente.

Gli obiettivi azionari in bundle sono UV-K1 `v7.03.01` e UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Questo è un restauro software distruttivo. Rimuove le impostazioni F4HWN, lo stato Multiboot, le slot firmware, le app overlay, i registri RF e il logo personalizzato. L'immagine esterna è uno stato di fabbrica ricostruito, non una discarica fisica intatta. Selezionare il modello corretto e non interrompere nessuna fase.

## Calibrazione

La calibrazione è specifica per il dispositivo. Creare un backup prima di esperimenti firmware o manutenzione a basso livello, e nominare il file con il modello radio o il numero di serie in modo che i backup non siano mescolati tra i dispositivi.

Per appoggiarlo:

1. Avviare la radio normalmente.
1. Apri `Calibration` e seleziona `Back up`.
1. Fare clic su `Read calibration data`.
1. Scarica `calibration.dat`.

Per ripristinarlo:

1. Avviare la stessa radio normalmente.
1. Apri `Calibration` e seleziona `Restore`.
1. Scegli il suo file `calibration.dat`.
1. Fare clic su `Restore calibration data` e attendere il completamento.

> [!WARNING]
> Ripristina solo la taratura appartenente a quella radio a meno che tu non capisca pienamente le conseguenze.

## Logo di avvio

Costruzioni compatibili possono utilizzare un'immagine monocromatica `128x64` personalizzata all'avvio o come salvaschermo.

Per caricare un logo:

1. Avviare la radio normalmente.
1. Apri `Boot Logo` e seleziona `Upload`.
1. Scegliere un'immagine in un formato comune come PNG, JPEG o BMP.
1. Regolare `Threshold` e `Invert colors` durante il controllo dell'anteprima.
1. Selezionare `Upload logo to radio`.
1. Scegliere `LOGO` in `POnMsg`, o una modalità di logo compatibile in `SetSav`.

La scheda `Download` legge l'immagine corrente, l'anteprima e la salva come `logo.png`.

## Risoluzione dei problemi

Se UV Studio non riesce a comunicare con la radio:

* confermare che l'operazione selezionata utilizza la modalità di avvio normale o DFU corretta
* scollegare il cavo, riavviare la radio in quella modalità, riconnetterlo e selezionare nuovamente la porta seriale
* chiudere altri programmi o schede del browser che possono possedere la porta seriale
* verificare che il cavo trasporta i dati ed è completamente inserito
* utilizzare un'edizione del firmware e una versione che espone la capacità richiesta
* per applicazioni o Flash esterno, controllare che Labs è in esecuzione piuttosto che Fusion, FieldOps, o Transfer

Il protocollo e i dettagli operativi `Console` espandibili che possono aiutare a identificare un comando non supportato, timeout, guasto di convalida o file sbagliato.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Risultati](./Recent-changes)
* [Programmazione con CHIRP](./Programming-with-CHIRP)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay app](./Overlay-apps)
* [Overlay application](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Caratteristiche avanzate](./Advanced-features)
* [Risoluzione dei problemi](./Troubleshooting)
