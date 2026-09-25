# Modifiche recenti

Questa pagina riassume l'ultima versione stabile `v6.1.0` e le principali modifiche visibili all'utente nelle versioni precedenti.

Per l'archivio di rilascio ufficiale, vedere la pagina [GitHub releases](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## v6.1.0 Ampia Sintesi

`v6.1.0` è l'ultima versione stabile. Si concentra sul trasferimento di dati più veloce e sicuro, la nuova modalità di scansione `MIX`, la manutenzione Labs ampliata attraverso UV Studio, e diverse correzioni di affidabilità.

### Pacchetto di rilascio

Scarica il firmware e i file di accompagnamento dalla pagina di rilascio [v6.1.0](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). Il rilascio fornisce le quattro edizioni ufficiali, `Fusion`, `FieldOps`, `Transfer` e `Labs`, oltre al driver CHIRP condiviso corrispondente. Scegliere l'edizione per capacità piuttosto che trattare Fusion come un pacchetto contenente ogni caratteristica specializzata.

### Aggiornamento da v6.0.0

1. Con il vecchio firmware ancora installato, scaricare la radio utilizzando il driver CHIRP corrispondente e salvare l'immagine. Opzionalmente esportare le righe del canale di memoria a CSV.
1. Riavviare la calibrazione specifica del dispositivo della radio con [UV Studio](./UV-Studio#calibration).
1. Flash l'edizione scelta `v6.1.0`. Eseguire un reset di fabbrica solo se le istruzioni di rilascio o il percorso di migrazione dalla versione installata lo richiede esplicitamente.
1. Caricare il driver `v6.1.0` CHIRP dedicato e scaricare un'immagine fresca dalla radio aggiornata.
1. Copiare le righe del vecchio canale in quella immagine fresca invece di caricare l'immagine completa delle vecchie impostazioni.
1. In Labs, selezionare `v6.1.0` nel catalogo di app versione di UV Studio. Sostituisci qualsiasi app overlay che il caricatore segnala come incompatibile.
1. Prima di utilizzare AirCopy, aggiornare entrambe le radio al firmware `v6.1.0` compatibile; il suo protocollo radio ottimizzato non è compatibile con le versioni precedenti.

Per una copia di sicurezza aggiuntiva dopo l'installazione di `v6.1.0` Labs, UV Studio può salvare l'intera memoria Flash esterna. Vedi [Scegliere il backup o la copia corretti](./UV-Studio#choosing-the-right-backup-or-copy).

### Prestazioni di AirCopy e clonazione via cavo

Il protocollo `v6.1.0` AirCopy invia fino a tre blocchi `64-byte` in un unico frame FSK, riducendo la giravolta in avanti e facendo trasferimenti radio circa due volte più velocemente. Si confronta CRC32 hashes in gruppi fino a blocchi `24` e invia solo blocchi che differiscono sul bersaglio.

L'edizione `Transfer` aggiunge anche `CABLE COPY` su UART e una selezione di cavi `Flash 2M` per clonare Flash esterno, escludendo il settore di calibrazione specifica del dispositivo. Le selezioni del mittente e del ricevitore vengono convalidate prima che i dati siano scritti.

Questo è un nuovo protocollo: entrambe le radio devono eseguire lo stesso firmware compatibile. Vedere [AirCopy](./AirCopy#v610-improvements).

### Elenco di scansione MIX

La nuova modalità `MIX` scansiona una selezione salvata di liste `01` a `24` come un insieme combinato. Selezionare `MIX` in `ScList`, premere `M` per aprire l'editor, attivare le liste con `M` e salvare con `EXIT`. L'editor visualizza il numero di elenchi selezionati e almeno un elenco deve rimanere abilitato.

Durante una scansione di memoria attiva, l'inserimento di `25` seleziona `MIX`; `00` continua a selezionare `ALL`. Vedere [Scansione](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` aggiunge il backup esterno-Flash completo `2 MiB` e il ripristino per Labs. Il ripristino conserva il settore di calibrazione specifica del dispositivo, salta identici settori `4 KiB` utilizzando CRC32 quando supportato, verifica ogni settore scritto e riavvia la radio quando finito.

Un nuovo recupero guidato del software di fabbrica verifica immagini in bundle per dimensioni e SHA-256, ripristina un'immagine ricostruita esterna-Flash preservando la calibrazione, quindi richiede la modalità DFU e installa il firmware di stock UV-K1 o UV-K5 V3 corrispondente. L'interfaccia inoltre raggruppa le operazioni di calibrazione e boot-logo in più chiare viste di backup/ripristino o download/upload.

Questi strumenti esterni-Flash richiedono `v6.1.0` Labs. Vedere [UV Studio](./UV-Studio#version-status), [ backup esterno-Flash e ripristino](./UV-Studio#external-flash-backup-and-restore-v160), e [recupero software fabbrica](./UV-Studio#factory-software-restoration-v160).

### Altre modifiche v6.1.0

Il rilascio aggiunge anche i giochi di overlay [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll), e [`Space Impact`](./Overlay-applications#space-impact), più correzioni che coinvolgono RF Log attraverso le banche di configurazione, lo storage overlay-app, la calibrazione spazzata e la gestione della coda di DCS squelch.

## v6.0.0 Ampia Sintesi

`v6.0.0` è stato rilasciato il 10 settembre 2026. Ha introdotto quattro edizioni ufficiali, Multiboot e Multiconfig, la piattaforma overlay-app Labs, applicazioni AirCopy affidabili e indipendenti FoxHunt e Beacon.

### Quattro edizioni ufficiali

| Edizione | Uso intenso | Ulteriori caratteristiche |
| --- | --- | --- |
| `Fusion` | uso quotidiano | edizione di riferimento equilibrata; consigliata per la maggior parte degli utenti |
| `FieldOps` | campo e lavoro di primo soccorso | RescueOps, residente FoxHunt, e residente Beacon |
| `Transfer` | trasferimento dati radio-radio | AirCopy e residente Beam |
| `Labs` | sperimentazione | RescueOps, AirCopy e applicazioni overlay, tra cui FoxHunt, Beacon e Beam |

Fusion `v6.0.0` non include più le funzioni v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon, o Breakout. Scegliere l'edizione specializzata appropriata quando una di queste funzionalità è necessaria.

### Applicazioni indipendenti FoxHunt e Beacon

La prima azione combinata `FOX HUNT / BEACON` è stata divisa prima del rilascio `v6.0.0`. `FOX HUNT` e `BEACON` sono azioni programmabili separate, applicazioni residenti separate in FieldOps, e app overlay separate in Labs.

Vedere [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

### Multiboot

Le edizioni compatibili possono memorizzare quattro immagini firmware F4HWN aggiuntive in Flash esterno. Tenere `M` (`MENU`) di per sé mentre si accende la radio per aprire il selettore di avvio, convalidare le immagini memorizzate e ripristinare `Main` o slot `1` a `4`.

Il firmware protegge automaticamente l'immagine normalmente lampeggiata come `Main`, verifica il CRC completo di uno slot prima di cancellare Flash interno, e registra il suo stato attivo ridondantemente. La visualizzazione `Firmware Slots` di UV Studio installa, verifica, nomi e cancella le quattro slot utente mentre la radio è in modalità normale.

Solo le immagini `v6.0.0` o F4HWN più recenti devono essere installate in queste slot. Vedere [Multiboot e Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig e SetCfg

Ogni slot del firmware seleziona una banca di configurazione separata per impostazione predefinita. I canali di memoria, i nomi dei canali, i VFO, le liste di scansione e le impostazioni radio rimangono quindi isolati quando si passano le edizioni. Calibrazione, logo di avvio, firmware/app slot, stato Multiboot e registro RF rimangono condivisi.

Il nuovo menu `SetCfg` può associare deliberatamente il firmware in esecuzione con un'altra banca. `SysInf` mostra distintivi `SLOT` e `CFG` indipendenti, e UV Studio può ripristinare la configurazione di una slot utente senza cancellare il firmware.

Vedere [Multiboot e Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) e [Menu](./Menu).

### Affidabile AirCopy con riconoscimenti

Air Copy ora aspetta un riconoscimento dopo ogni blocco. Il ricevitore verifica il pacchetto prima di scriverlo e può richiedere un rinvio; il mittente si ritira persi, danneggiati, o blocchi non riconosciuti fino a tre volte. I blocchi duplicati sono riconosciuti in modo sicuro, quindi un ACK perso non desynchronizes il trasferimento.

Una nuova scelta di `All (Mem+Set)` trasferisce tutte le otto banche a 128 canali e Impostazioni in un unico run continuo. Lo schermo riporta il progresso `TX`/`RX` più riprova o conteggi di errore.

Vedere [AirCopy](./AirCopy#reliable-protocol-in-v600).

### App overlay in Labs

L'edizione sperimentale `Labs` può installare piccoli programmi `.app` in Flash esterno ed eseguirli da un overlay RAM controllato `4 KiB`. Vista `Apps` di UV Studio, marcata `Labs only`, installa, verifica, elenca e rimuove le applicazioni; `F + 7` apre il lanciatore on-radio.

Il caricatore convalida il formato app, la compatibilità ABI/API, le funzionalità richieste, l'indirizzo RAM, la dimensione e il codice CRC prima dell'esecuzione. Le applicazioni disponibili includono strumenti radio come Broadcast FM, FoxHunt, Beacon e Beam, oltre a Breakout, Tetris, Cube3D e Plasma.

Vedere [Applicazioni di vendita](./Overlay-apps) per l'installazione e la compatibilità, e [Applicazioni di vendita](./Overlay-applications) per lo scopo e i controlli di ogni app.

### Modalità di keying Beacon (TONE / CARR)

Beacon ottiene un'impostazione keying-mode sulla chiave `4`. `TONE` (default) è il comportamento precedente — un vettore FM continuo con il tono `1000 Hz` chiave per ogni elemento Morse (MCW / F2A). `CARR` interrompe il vettore stesso per ogni elemento, riproducendo il modello interrotto del vettore molti volpi ARDF utilizzati nel campo: il segnale scompare tra gli elementi, rendendo la direzione di trovare più difficile e lasciando copiare un ricevitore AM normale. L'impostazione è salvata e inclusa nei trasferimenti AirCopy, ed è disponibile sia nel residente che in overlay Beacon. Vedere [Beacon](./Beacon#timing-and-keying).

## v5.9.0 Ampia Sintesi

Questi cambiamenti sono stati sviluppati dopo `v5.8.0` e rilasciato in `v5.9.0`.

### Browser dei menu per categorie

Lo sviluppo Fusion costruisce aprire il menu su una schermata di categoria invece di mostrare immediatamente l'elenco piatto originale. Le categorie disponibili sono `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` e `DTMF`. L'avvio nascosto-menu aggiunge anche una categoria `Service`.

La categoria `All` mantiene l'ordine originale flat-menu e la numerazione globale. L'inserimento di un numero di menu direttamente dalla schermata di categoria passa anche a `All`, quindi le abbreviazioni numerate-menu esistenti continuano a funzionare. Il firmware ricorda l'ultima categoria selezionata e l'ultimo elemento utilizzato in ogni categoria per la sessione corrente.

Vedi [Menu](./Menu#categorized-menu-browser).

### Decapatore d'azione laterale

Dopo aver premuto `F`, tenere premuto il tasto laterale per aprire un picker di azione temporanea. Utilizzare `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1, per sfogliare le azioni di scelta rapida compilate disponibili e premere `M` per eseguire l'azione evidenziata. `EXIT` o `F` cancella il raccoglitore; premendo `PTT` lo chiude e continua con la normale gestione della trasmissione.

Il raccoglitore si chiude automaticamente dopo circa cinque secondi o quando la ricezione inizia. Ogni pulsante laterale ricorda la sua ultima selezione del picker fino al riavvio della radio. Una normale pressa a pulsante laterale `F` + breve mantiene il suo comportamento Step-up / Step-down esistente.

Vedere [Funzioni dei pulsanti](./Button-functions#side-key-action-picker).

### Fox Hunt / Beacon miglioramenti

Fox Hunt aggiunge due passaggi più profondi front-end-gain dopo le impostazioni originali `ATT 0`, `ATT 6`, `ATT 15` e `ATT 27`. Essi sono mostrati come `BYP` e `BYP+`; questi nomi descrivono le modalità di close-range convenienti, non un bypass hardware letterale. I tasti di navigazione (`UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1) ora cambiano l'attenuazione direttamente.

Dopo un cambiamento di guadagno, il firmware brevemente consente al rilevatore RSSI di sistemarsi e quindi ripristinare i riferimenti di picco, minimo, tendenza e storia del segnale. Questo evita picchi stanti e salti artificiali quando si sposta tra intervalli di guadagno.

Tenendo `F` per circa 0,5 secondi si attiva una serratura temporanea della tastiera condivisa da Fox Hunt e Beacon. In Fox Hunt, i tasti di navigazione rimangono disponibili per l'attenuazione mentre sono bloccati. In Beacon, tutti i normali controlli vengono bloccati fino a quando la stessa lunga stampa sblocca la tastiera, incluso durante una trasmissione attiva.

Fox Hunt e Beacon ora entrambi ignorano il normale timer di inattività `SetOff` e rimangono attivi fino all'espulsione esplicita. Il loro normale timeout di retroilluminazione e gli aggiornamenti della batteria continuano a funzionare.

Vedi [Fox Hunt e Beacon](./Fox-Hunt-and-Beacon).

### Correzioni di trasmissione di scansione e FM

Durante la scansione della memoria, la modifica dell'elenco di scansione attiva tiene temporaneamente la ripresa della scansione mentre il nome della lista di scansione è effettivamente visualizzato. Questo mantiene il manometro di avanzamento nascosto e la posizione di scansione sincronizzata. Frequenza e scansioni di gamma non sono interrotte perché non mostrano il nome sovrapposizione.

Una scansione attiva della stazione di trasmissione FM ora ignora un segnale in arrivo rilevato sul canale radio principale, quindi la scansione FM non è interrotta. L'ascolto FM normale cede ancora alla ricezione del canale principale come prima.

Vedere [Scansione](./Scanning#changing-the-scan-list-during-scan) e [FM ricevitore broadcast](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## v5.8.0 Ampia Sintesi

Queste modifiche si basano su commit dopo il tag `v5.7.0` in `feature_update_v5`.

### Caccia alla volpe / Beacon

Fusion crea un'azione programmabile `FOX HUNT / BEACON` con due modalità complementari:

* Fox Hunt fornisce un display `dBm` calibrato, S-meter e letture di picco, una tendenza di segnale di un secondo, attenuazione selezionabile, Geiger-style o audio di stazione ricevuta, e una scelta tra un calibro scala e una storia di segnale di circa 18 secondi.
* Beacon utilizza il TX VFO attivo per trasmettere un identificatore ARDF o `<CALLSIGN> MOE` in Morse, con finestre `5` a `60-second` e intervalli silenziosi `5` a `240-second`.

Beacon prende il suo callsign da CHIRP `Message Line 1` e inizia la sua prima trasmissione immediatamente quando selezionata. Prima di ogni esplosione, il firmware controlla il blocco di frequenza TX applicabile, per-VFO `TXLock`, stato della batteria e restrizione di modulazione.

L'attenuazione, il calibro, la modalità audio e l'intervallo Beacon vengono salvati in flash esterno e sono inclusi nei trasferimenti Air Copy `Settings`.

Vedere la pagina di compatibilità storica [Fox Hunt / Beacon](./Fox-Hunt-and-Beacon). Per il firmware corrente, utilizzare le pagine separate [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

## V5.7.0 punti salienti

Queste modifiche si basano su commit dopo il tag `v5.6.1` in `feature_update_v5`.

### UV Studio


Fornisce mirroring dello schermo dal vivo e controllo della tastiera non-TX, visualizzazione e analisi RF-log compatibili, esportazione RF-log CSV, flash del firmware, backup/restore di calibrazione e gestione boot-logo personalizzata. Funziona localmente tramite `Web Serial` senza installazione, server o account.


### log RF

Costruisce con logging RX/TX aggiungere un'azione di scelta rapida programmabile `RF LOG`.

I registri di registro RF ricevono, monitorano e trasmettono sessioni in flash esterno, poi li mostra in una vista di storia più recente. Ogni voce può mostrare il nome del canale o la frequenza, RX / TX direzione, durata, RX S-metro o TX livello di potenza, e la tensione della batteria più bassa vista durante la sessione.

La schermata di log supporta:

* Filtri `ALL`, `RX` e `TX`
* fino a 512 voci di traffico visibili
* scorciatoie per passare alla voce più recente o più vecchia con `F` e i tasti di navigazione (`UP` / `DOWN` su UV-K5 oppure `LEFT` / `RIGHT` su UV-K1)
* un chiaro flusso di conferma prima di cancellare il registro

Vedere [Funzioni avanzate](./Advanced-features#rf-log) e [Funzioni dei pulsanti](./Button-functions#rf-log-action).

### Esclusioni ScanRange

`ScnRng` può ora mantenere fino a `64` frequenze temporaneamente escluse, invece di `32`.

Come prima, l'elenco è circolare, non è scritto a memoria, e viene cancellato quando la radio riavvia o quando l'identità di gamma cambia.

Vedere [Scansione](./Scanning#excluding-frequencies-in-scnrng).

### SetLck campo di blocco

`SetLck` ora ha quattro scelte invece di due:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` copre le scorciatoie programmabili assegnate ai due pulsanti laterali e `M Long`. Questo consente di mantenere le scorciatoie disponibili durante il blocco della tastiera anteriore, o di disabilitarle come parte della serratura. `PTT` può essere bloccato in modo indipendente per prevenire la trasmissione accidentale.

Vedi [Menu](./Menu#main-menu) e [funzioni Pulsante](./Button-functions#keypad-lock-and-setlck).

### Manutenzione UV Studio

Il codice di streaming dello schermo lato firmware è stato rinominato internamente dalla gestione dello screenshot alla gestione UV Studio. Costruzioni che consentono il ponte opzionale RX/TX-log UV Studio possono anche trasmettere le ultime righe RF-log a strumenti di visualizzazione compatibili.

Vedere [Funzioni avanzate](./Advanced-features#k5-viewer).

## v5.6.0 Ampia Sintesi

Queste modifiche si basano sui commit post-`v5.5.0` in `feature_update_v5`.

### Salvaschermo SetSav

Costruisce con il supporto screen-saver aggiungere il menu `SetSav`.

Modalità disponibili:

* `OFF`: nessun salvaschermo
* `LOGO`: mostrare il logo di avvio memorizzato come uno schermo inattivo
* `LOGO+`: mostrare il logo di avvio memorizzato con un effetto di scorrimento
* `MATRIX`: mostrare uno schermo animato in stile matrice

`SetSav` è legato al timeout di retroilluminazione. Può visualizzare sulla schermata principale e FM trasmissione schermo quando la radio è inattivo, ed è sospeso durante RX, TX, PTT, BEAM, e la scansione FM attiva.

Vedere [Operazione radio](./Radio-operation#screen-saver-and-backlight-timeout) e [Menu](./Menu#main-menu).

Poiché `SetSav` viene inserito prima del menu nascosto, gli indici nascosti-menu si muovono da uno in `v5.6.0`: `F Lock` inizia a `72` invece di `71`.

### Suono di avvio del logo di boot

Quando `POnMsg = LOGO`, la modalità logo di avvio può mantenere il normale comportamento del segnale acustico di avvio.

Vedi [Menu](./Menu#main-menu) e [UV Studio](./UV-Studio#boot-logo).

### Indicatore RSSI

Le scansioni veloci possono mostrare una piccola scintilla RSSI durante la scansione. Fornisce una visione compatta dei campioni RSSI recenti così forti candidati spiccano visivamente mentre la scansione è in esecuzione.

Vedere [Scansione](./Scanning#scan-indicators-and-detection).

### Rilevamento subaudibile a banda di scansione

`ScnRng` può rilevare CTCSS / DCS mentre si è fermato su un segnale ricevuto. Il codice subaudibile rilevato viene visualizzato nell'interfaccia utente di scansione quando disponibile.

Vedere [Scansione](./Scanning#scan-indicators-and-detection).

### Copia frequenza UI

Lo schermo dello scanner di frequenza `F+4` ora separa lo stato di ricerca e il risultato più chiaramente:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* rilevati dettagli `Freq:` e `Tone:`

Vedere [Scansione](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### Aggiornamenti UV Studio e screenshot

I frame screen-saver sono sincronizzati con UV Studio, e la gestione degli screenshot è stata ottimizzata per ridurre l'utilizzo della RAM ed evitare i pezzi stanti.

Vedere [Funzioni avanzate](./Advanced-features#k5-viewer).

### Fissazioni e perfezionamenti

Quella versione includeva anche diverse correzioni di comportamento e perfezionamenti dell'interfaccia utente:

* bandscope / arrotondamento di frequenza di spettro per `8.33 kHz` passi
* Riconfigurazione della ricezione dual-watch da AM a FM
* Posizionamento icona di blocco VFO durante la scansione
* schermo-saver sveglia/sleep caso bordo
* icona di retroilluminazione manuale cava quando la luce manuale è spenta

## v5.5.0 Ampia Sintesi

### Motore di scansione più veloce

Le build attuali possono utilizzare il nuovo motore di scansione `FAST` per la scansione della memoria e `ScnRng`.

Il menu `SetScn` seleziona tra:

* `NORMAL`: il percorso di scansione conservativo
* `FAST`: un percorso più veloce che pre-controlla i canali o i passaggi di intervallo con RSSI prima di effettuare la configurazione completa di ricezione

In condizioni favorevoli, `ScnRng` in modalità `FAST` può scansionare intorno alle frequenze `150+` al secondo.

Vedi [Scansione](./Scanning#scan-engine-mode-normal-vs-fast) e [Menu](./Menu#main-menu).

### Esclusioni a scansione temporanea

Mentre una scansione `ScnRng` viene fermata su una frequenza ricevuta, premere a lungo `MENU` per escludere quella frequenza dalla scansione dell'intervallo corrente.

Questo è stato introdotto con slot `32` in `v5.5.0`; le attuali costruzioni post-`v5.6.1` consentono l'esclusione temporanea `64`. Queste esclusioni sono cancellate quando la radio si riavvia o quando l'identità della gamma cambia.

Vedere [Scansione](./Scanning#excluding-frequencies-in-scnrng).

### Modalità di trasferimento BEAM

Costruzioni con supporto BEAM possono inviare l'attuale configurazione VFO o del canale di memoria ad un'altra radio, o ricevere un pacchetto BEAM e salvarlo al primo canale di memoria gratuito.

BEAM è aperto attraverso un'azione di scelta rapida programmabile.

Vedere [Funzioni avanzate](./Advanced-features#beam-transfer-mode) e [Funzioni dei pulsanti](./Button-functions#beam-action).

### Logo di avvio personalizzato

Costruzioni con supporto logo possono visualizzare un logo di avvio monocromatico `128x64` personalizzato all'avvio.

Carica o scarica il logo con UV Studio, quindi seleziona `LOGO` nel menu `POnMsg`.

Vedere [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu), e [Risoluzione dei problemi](./Troubleshooting#my-custom-boot-logo-does-not-show).

### Miglioramento del display DCS / CTCSS

I menu `RxDCS`, `TxDCS`, `RxCTCS` e `TxCTCS` ora mostrano sia la posizione di entrata selezionata che l'indice omologato quando si esiste.

Ciò rende più facile distinguere la posizione normale dell'elenco, le voci omologate PMR446, i toni extra e le voci DCS invertite.

Vedi [Menu](./Menu#main-menu).

### Modifica del nome del canale

L'editing `ChName` è stato migliorato con ingresso multi-tap, commutazione maiuscola/basso, ingresso numerico diretto con presse a chiave lunghe e comportamento `EXIT` più chiaro.

Vedi [Menu](./Menu#main-menu).

### Spettro analizzatore persistenza

L'analizzatore di spettro ora salva più impostazioni quando si lascia lo schermo spazzato con `EXIT`, compresa la modalità di trigger, profilo di sensibilità automatico, scala manuale e livello di trigger.

Avviare l'analizzatore da `ScnRng` non sovrascrive più la fase di scansione salvata o la preferenza bar-count.

Vedere [Analizzatore di spettro](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf e costruire informazioni

`SysInf` è ora impaginato nelle costruzioni attuali. A seconda delle opzioni di costruzione, può mostrare l'identità, la data di costruzione / tempo, l'identificatore di commit, le informazioni della batteria, l'utilizzo della memoria e i link di progetto QR-code.

Vedi [Menu](./Menu#main-menu).

### Copertura delle impostazioni di copia dell'aria

Trasferimenti Air Copy `Settings` includono ora l'area VFO utilizzata da funzioni come `ScnRng`, quindi le frequenze boundary scan-range vengono replicate quando si copiano le impostazioni.

Vedere [AirCopy](./AirCopy).

## Recenti cambiamenti v5.x vale anche la pena conoscere

I seguenti cambiamenti sono atterrati poco prima di `v5.5.0` e sono documentati nel wiki perché influiscono sull'uso quotidiano:

* `SetRxA` seleziona diversi profili audio RX per `FM` e `AM`; in `AM`, può passare tra `SHARP`, `STOCK` e `OPEN`.
* le liste di scansione supportano i nomi brevi e la scansione della memoria può passare tra le liste non vuote valide durante la scansione.
* `SysInf`, radio di trasmissione FM, e l'analizzatore di spettro UI sono stati raffinati attraverso le costruzioni recenti.
* il menu `SetNav` nascosto consente lo stesso lavoro di documentazione per gli stili di navigazione `UV-K1` e `UV-K5 V3`.

Vedi [Menu](./Menu), [Scansione](./Scanning), [Operazione radio](./Radio-operation), e [FM ricevitore radio broadcast](./FM-broadcast-radio-receiver).

## Pagine correlate

* [Per iniziare](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay app](./Overlay-apps)
* [Overlay application](./Overlay-applications)
* [Scansione](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [ Funzioni pulsanti](./Button-functions)
* [Caratteristiche avanzate](./Advanced-features)
* [Spectrum analyzer](./Spectrum-analyzer)
* [Menu](./Menu)
