# App per overlay

Le applicazioni overlay sono piccoli programmi `.app` memorizzati in Flash esterno e caricato in uno spazio di lavoro `4 KiB` RAM dedicato solo quando lanciato. Lasciano che l'edizione sperimentale `Labs` aggiunga strumenti, modalità radio, demo visive e giochi senza fissare definitivamente ogni applicazione nel Flash interno del firmware.

> [!WARNING]
> Le app overlay sono una funzione sperimentale `v6.0.0`. Attualmente, solo l'edizione `Labs` contiene l'app loader. Le app sono legate a un firmware ABI, livello API, indirizzo RAM e funzionalità di residenza facoltative; aggiornare o reinstallare un'app se la radio segnala un errore di compatibilità.

## Come funziona la piattaforma

La radio fornisce slot app `8` esterna-Flash. Ogni slot contiene un intestazione più codice app della maggior parte `4 KiB`. Prima di eseguire un'app, il caricatore controlla:

* l'app formato file/header e lo stato impegnato
* il livello ABI richiesto e minimo API
* dimensione del codice e indirizzo di collegamento RAM
* le capacità necessarie del firmware residente dell'app
* un CRC-32 del codice dopo che è stato caricato in RAM

Il firmware interno Flash non viene mai riscritto quando viene installato, lanciato o cancellato un'app. Un'app cattiva o incompatibile viene rifiutata in modo pulito invece di essere eseguita.

Il catalogo attuale contiene undici applicazioni: strumenti radio come `Broadcast FM`, `FoxHunt`, `Beacon` e `Beam`, più `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` e `Space Impact`. Vedere [Applicazioni overlay](./Overlay-applications) per le app documentate e i relativi comandi. La disponibilità dipende dai binari distribuiti per la versione del firmware selezionata e dalle funzionalità compilate nel firmware Labs in esecuzione.

## Installazione di un'app con UV Studio

1. Avviare la radio normalmente con l'edizione `Labs`.
1. Collegarlo a un browser desktop con una connessione dati USB supportata.
1. Aprire [UV Studio](https://armel.github.io/uvstudio/) e selezionare `Apps` (`Labs only`).
1. Selezionare la versione firmware e un'app compatibile dal catalogo ufficiale o scegliere un file `.app` locale.
1. Scegliere il target app slot.
1. Selezionare `Install app` e attendere la scrittura e la verifica per completare.

UV Studio può aggiornare la tabella delle slot, mostrare il nome, la versione, la dimensione e lo stato di ogni applicazione, ed eliminare un'applicazione senza toccare il resto della radio.

Gli slot app sono numerati `1` a `8` in UV Studio e nel launcher on-radio `F + 7`.

## Avviare un'app

1. Dalla normale schermata radio, premere `F`, quindi `7 VOX`.
1. Utilizzare `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1, per selezionare una delle otto slot visualizzate. Il layout attivo segue `SetNav`.
1. Premere `M` per eseguire l'app selezionata.
1. Utilizzare i controlli visualizzati da quella app; nella maggior parte delle applicazioni, `EXIT` ritorna al launcher app o normale schermo radio.

Le slot vuoti rimangono visibili nel lanciatore. La posizione selezionata di slot e scorrimento viene ricordata fino al riavvio della radio. Il lanciatore e le applicazioni compatibili sono rispecchiati in UV Studio.

Alcune applicazioni possono anche pubblicizzare una delle normali azioni programmabili: `FM RADIO`, `FOX HUNT`, `BEACON`, o `BEAM`. Quando l'applicazione corrispondente è installato e valida, che l'azione può lanciarlo direttamente da una chiave assegnata o dal picker azione side-key. Se più di un'applicazione installata pubblicizza la stessa azione, viene utilizzato lo slot compatibile più basso numero.

## Messaggi di compatibilità

| Messaggio radio | Significato / azione |
| --- | --- |
| `UPDATE APP` | il formato dell'app, ABI, dimensione, o l'indirizzo del link è più vecchio o incompatibile; installare un'app corrispondente |
| `UPDATE FIRMWARE` | l'applicazione richiede una nuova app API; aggiornare il firmware Labs |
| `REINSTALL APP` | la scrittura è incompleta o il codice CRC è sbagliato; installare nuovamente il file `.app` |
| `NOT SUPPORTED` | l'applicazione ha bisogno di una capacità residente che questa costruzione Labs non include |
| `NO APP` | lo slot selezionato è vuoto o non ha intestazione app valida |

Dopo l'uscita di un'app, il caricatore ripristina la VFO selezionata, riceve/dual-watch tuning, backlight handling e cache esterna-Flash. App che modificano i dati condivisi supportati, come i preimpostazioni Broadcast FM o i dati del canale Beam, chiedono al firmware residente di impegnarlo dopo che il codice overlay ha smesso di funzionare.

## App di costruzione da fonte

Gli sviluppatori possono costruire le applicazioni presenti nel repository firmware con:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

I file `.app` generati sono collocati in `build/Apps/`. Ogni applicazione è collegata all'indirizzo overlay configurato del firmware e imballato con i suoi metadati e CRC. Ricostruire le applicazioni quando cambia l'indirizzo ABI, API, le funzionalità richieste o overlay.

## Pagine correlate

* [Overlay application](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [ Funzioni pulsanti](./Button-functions)
* [Risultati](./Recent-changes)
* [Caratteristiche avanzate](./Advanced-features)
