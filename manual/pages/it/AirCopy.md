# AirCopy

AirCopy trasferisce canali di memoria e impostazioni radio compatibili. Utilizza FSK sopra l'aria e, a partire da `v6.1.0`, può anche utilizzare una connessione via cavo seriale diretta.

> [!IMPORTANT]
> AirCopy è incluso nelle edizioni `Transfer` e `Labs`. Non fa parte delle edizioni standard `Fusion` o `FieldOps`.

> [!WARNING]
> AirCopy non è destinato a rendere compatibile a differenza dei layout del firmware. Utilizzare la stessa generazione del firmware su entrambe le radio e selezionare la stessa sezione dati sul mittente e sul ricevitore. Il protocollo `v6.1.0` ottimizzato non è compatibile con le precedenti versioni AirCopy.

## Inizio AirCopy

1. Spegnete la radio.
1. Tenere `PTT` + `SIDE BUTTON 2️⃣` mentre lo accende.
1. Rilasciare tutte le chiavi quando viene visualizzata la schermata AirCopy.

La frequenza over-the-air di default è `434.000 MHz` a potenza molto bassa. È possibile inserire un'altra frequenza consentita con la tastiera prima di iniziare il trasferimento.

Utilizzare i tasti di navigazione per selezionare la stessa sezione su entrambe le radio:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Quindi avviare il bersaglio prima della fonte:

1. Alla radio ricevente, premere `EXIT`.
1. Alla radio di invio, premere `M`.
1. Attendere `AIR COPY OK` su entrambe le radio.

Ogni selezione di memoria trasferisce i canali `128`, inclusi i nomi dei canali e gli attributi. `Settings` include le impostazioni radio, i nomi della lista di scansione, l'area VFO utilizzata da `ScnRng`, la selezione della lista di scansione `MIX` e le preferenze salvate FoxHunt e Beacon. `All (Mem+Set)` trasferisce tutte le otto banche di memoria e Impostazioni in un unico run.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Protocollo affidabile in v6.0.0

`v6.0.0` ha introdotto un protocollo di trasferimento riconosciuto:

* il ricevitore convalida l'inquadratura, l'offset e CRC prima di memorizzare i dati
* il ricevitore riconosce i dati validi e rifiuta i dati danneggiati o inaspettati
* il mittente ricorda un blocco non riconosciuto o respinto fino a tre volte
* i dati duplicati sono riconosciuti senza essere scritti due volte, recuperando in modo sicuro da un riconoscimento perso
* lo schermo riporta il progresso, il conteggio di riprovazione (`RT`), e il conteggio del ricevitore (`ER`)

Una banca di memoria contiene blocchi `68` AirCopy di `64 bytes`; `Settings` contiene blocchi `12`. Poiché il ricevitore invia riconoscimenti, entrambe le radio trasmettono brevemente sulla frequenza selezionata.

## v6.1.0 miglioramenti

### Trasferimenti radio più veloci

Il nuovo protocollo trasporta fino a tre blocchi `64-byte` in un unico data frame FSK. Questo riduce la rotazione fissa e il riconoscimento sovraccarico e fa un trasferimento completo circa due volte più veloce in condizioni radio simili.

Per inviare dati, la fonte fornisce CRC32 hashes per gruppi fino a blocchi `24`. L'obiettivo confronta quelle ciglia con i suoi dati locali e richiede solo i blocchi che differiscono. Ripetere un backup o sincronizzare due radio quasi identiche può quindi essere molto più veloce di copiare ogni blocco di nuovo.

Il manometro del progresso distingue i dati già identici dai dati che sono stati effettivamente copiati. Il protocollo convalida anche che il mittente e il ricevitore hanno selezionato la stessa sezione dati logici; un errore non riesce a scrivere una mappa diversa per errore.

### Copia del cavo

L'edizione `Transfer` aggiunge `CABLE COPY` su UART. Nella schermata pronta, premere `* SCAN` per passare tra il trasporto radio e via cavo. La modalità cavo utilizza lo stesso confronto, riconoscimento, riprovazione e controlli di selezione come modalità radio, ma non utilizza una frequenza RF.

L'implementazione aumenta la velocità seriale per il trasferimento e ripristina il tasso normale in seguito. Entrambe le radio devono eseguire il firmware corrispondente della TV via cavo e utilizzare una connessione seriale diretta compatibile.

### clonazione esterna

Quando `CABLE COPY` è attiva nell'edizione `Transfer`, una selezione aggiuntiva `Flash 2M` può clonare Flash esterno della radio. Si confronta con i settori `4 KiB` di CRC32 e scrive solo diversi settori. Il settore di calibrazione specifico del dispositivo è deliberatamente escluso.

> [!WARNING]
> La clonazione esterna-Flash può sostituire le slot del firmware, le banche di configurazione, le app, i registri, i loghi e altri dati esterni-Flash condivisi sulla radio ricevente. Prima di eseguire il backup dei dati importanti, verificare attentamente la direzione e non disconnettere o spegnere la radio durante l'operazione.

## Risoluzione dei problemi

Se un trasferimento fallisce:

* confermare che entrambe le radio utilizzano la stessa versione firmware compatibile
* confermare che entrambe le radio mostrano la stessa selezione e trasporto
* avviare la ricezione con `EXIT` prima di iniziare la trasmissione con `M`
* per il trasferimento radio, ridurre la distanza o allontanarsi da interferenze
* per il trasferimento via cavo, controllare la connessione seriale diretta e riconnettere entrambe le radio
* riprovare senza cambiare la selezione

## Pagine correlate

* [Risultati](./Recent-changes)
* [Caratteristiche avanzate](./Advanced-features)
* [Scansione](./Scanning)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Risoluzione dei problemi](./Troubleshooting)
