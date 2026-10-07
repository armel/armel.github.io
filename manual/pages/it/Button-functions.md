# Funzioni del pulsante

I pulsanti possono attivare le funzioni in due modi:

1. premere il tasto `F #` prima, quindi il pulsante di destinazione (scritto qui sotto come `F+`)
2. premere il tasto di destinazione direttamente

In molti casi, la lunga stampa duplica l'azione `F+`, ma alcuni pulsanti hanno un diverso comportamento a lunga pressione.

## Promemoria rapida

* `F+` significa: premere `F #`, quindi premere il tasto di destinazione
* etichette di navigazione possono essere `UP` / `DOWN` o `LEFT` / `RIGHT`, a seconda del modello e `SetNav`
* le scorciatoie programmabili sono elencate in [funzioni del pulsante personalizzato](#custom-button-functions)
* introdotto in Fusion `v5.9.0` e disponibile nelle attuali edizioni v6, premendo `F` e poi **tenendo premuto** un pulsante laterale si apre il [selettore delle azioni dei tasti laterali](#side-key-action-picker)

## Tastiera anteriore

### `M`
* breve stampa - inserire menu
* stampa breve mentre scansione canale/frequenza - ultimo canale trovato è conservato sullo schermo
* lunga stampa durante la scansione del canale - temporaneamente escludere un canale di memoria (non funziona con `* SCAN ALL`)
* lunga stampa - utente programmabile nel menu: `M Long`
### `EXIT`
* pressione breve - esce dal menu o dalla funzione corrente e cancella una cifra in un campo di inserimento
* lunga pressa - cancella tutti gli input, esce DTMF casella di input, uscite modalità monitor, uscite `ScnRng`
### `UP` e `DOWN`
* passare su e giù in menu, frequenza, impostazioni e altre liste
* `F+` - aumenta o diminuisce il valore Squelch.
### `1 BAND`
* `F+`
  * in modalità **frequenza** - interruttori bande di frequenza `1` a `7`; c'è anche banda `7+` per frequenze sopra `1 GHz`
  * in modalità **canale** - le impostazioni del canale vengono copiate in modalità frequenza
* lunga stampa
  * in *normale modalità radio * - stesso
  * in **FM modalità di trasmissione** - cicli gli intervalli di frequenza di trasmissione FM; vedi [FM radio ricevente di trasmissione](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - interruttori principali VFO superiore/basso (marcato da `►`)
* lunga stampa - stesso
### `3 VFO/MR`
* `F+` - interruttori tra modalità frequenza e modalità canale
* lunga stampa - stesso
### `4 FC`
* `F+` - si accende la frequenza e la modalità copia CTCSS. Avviare la trasmissione con l'altra radio e la frequenza e il codice CTCSS sarà rilevato. È possibile salvare le impostazioni con il pulsante `M`
* lunga stampa - stesso
### `5 NOAA`
* `F+` - si accende l'analizzatore di spettro
* lunga stampa
   * in modalità **canale** - cicli il canale di memoria selezionato attraverso la sua assegnazione della lista di scansione: `OFF`, `1` a `24`, poi `ALL`
   * in modalità **frequenza** - attiva la funzione [scan range](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - consente di attivare livelli di potenza per il canale corrente
* lunga stampa - stesso
### `7 VOX`
* `F+`
  * nell'edizione `Labs` - apre il [overlay-app launcher](./Overlay-apps)
  * in costruisce con il gioco residente e senza sovrapposizione-app loader - inizia Breakout
* lunga stampa - attiva la modalità VOX quando VOX è abilitato
### `8 R`
* `F+` - consente la gestione manuale del retroilluminazione e accende o spegne il retroilluminazione
* lunga stampa - si accende in modalità inversa per i canali che hanno un set di offset di frequenza. Sostituisce la frequenza TX con la frequenza RX
### `9 Call`
* `F+` - disabilita la gestione manuale del retroilluminazione
* lunga pressa - passa il canale corrente al canale `1-Call` impostato in radio.
### `0 FM`
* `F+` - attiva la radio FM
* lunga stampa - stesso
### `* SCAN`
* pressa corta - entra in modalità input DTMF
* `F+` - accende lo scanner DCS / CTCSS per la frequenza corrente
* lunga stampa
   * in *modalità canale** - accende lo scanner del canale
   * in modalità **frequenza** - si accende lo scanner di frequenza (può usare la funzione [scan range](./Scanning#scan-frequency-range-function)))
* mentre la scansione della memoria è in corso, `F+` o lunga pressione `* SCAN` passa alla successiva lista di scansione non vuota valida
### `F # 🗝`
* pressa corta - consente di attivare il modificatore funzione `F+`
* lunga pressa - attiva o disattiva la serratura della tastiera; il menu `SetLck` seleziona se la serratura copre anche azioni di scelta rapida programmabili e/o `PTT`

### Blocco tastiera e SetLck

La serratura della tastiera disabilita sempre il tastierino anteriore, tranne che la lunga pressione `F #` rimane a disposizione per sbloccare la radio. Il menu `SetLck` estende la serratura ad altri controlli:

* `KEYS`: le due scorciatoie laterali, `M Long` e `PTT` rimangono disponibili
* `KEYS + ACTIONS`: anche le scorciatoie programmabili assegnate a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` e `M Long` sono disabilitate; `PTT` rimane disponibile
* `KEYS + PTT`: `PTT` è anche disabilitato per prevenire la trasmissione accidentale; i collegamenti programmabili rimangono disponibili
* `KEYS + ACTIONS + PTT`: il tastierino anteriore, le scorciatoie programmabili e `PTT` sono tutti disabilitati

## Pulsanti laterali

### `PTT`
* Pulsante push-to-talk. Ci sono 2 modalità: CLASSIC e ONEPUSH (vedere menu `SetPTT`)
  * CLASSIC - PTT funziona come al solito. Premere PTT per iniziare a trasmettere e rilasciarlo per interrompere.
  * ONEPUSH - PTT funziona come un interruttore. Premere PTT per iniziare a trasmettere e rilasciarlo ogni volta che vuoi. La trasmissione è ancora attiva. Premere nuovamente PTT quando si desidera, quindi rilasciarlo per interrompere la trasmissione. Funziona come su OpenGD77 (se lo sai).

* quando questo pulsante viene utilizzato per fermare la scansione canale/frequenza, l'ultimo canale trovato viene conservato sullo schermo
* tenuto insieme a `Side button 2️⃣`, trasmette il tono `1750 Hz`
* tenuto insieme a uno qualsiasi dei pulsanti della tastiera anteriore trasmette i codici DTMF

### `Side button 1️⃣`
* pressa corta - utente programmabile nel menu: `F1Shrt`
* lunga stampa - utente programmabile nel menu: `F1Long`
* `F` quindi premere breve - aumenta il valore Step in modalità VFO
* `F` poi tenere - apre il picker azione side-key

### `Side button 2️⃣`
* pressa corta - utente programmabile nel menu: `F2Shrt`
* lunga stampa - utente programmabile nel menu: `F2Long`
* questo pulsante può anche essere utilizzato per inviare il tono `1750 Hz` tenendolo insieme al pulsante `PTT`
* `F` poi stampa breve - diminuisce il valore Step in modalità VFO
* `F` poi tenere - apre il picker azione side-key

### Decapatore d'azione laterale

Il raccoglitore di azione esegue una scorciatoia disponibile senza modificare le funzioni salvate in `F1Shrt`, `F1Long`, `F2Shrt` o `F2Long`.

Dalla normale schermata radio:

1. Premere brevemente `F` per visualizzare l'indicatore `F`.
1. Tenere premuto il pulsante laterale 1️⃣ o il pulsante laterale 2️⃣ fino all'apertura del raccoglitore.
1. Utilizzare `UP` / `DOWN` per evidenziare un'azione.
1. Premere `M` per eseguirlo immediatamente.

Lo schermo mostra l'azione precedente, selezionata e successiva. `EXIT` o `F` annulla senza eseguire nulla. Premere `PTT` chiude il raccoglitore e continua con la normale gestione PTT, quindi non blocca una trasmissione urgente.

Il raccoglitore si chiude automaticamente anche dopo circa cinque secondi, quando la ricezione inizia, se la tastiera diventa bloccata, o quando un'altra schermata prende il controllo. Ogni pulsante laterale ricorda la sua ultima azione di picker evidenziata per la sessione corrente; le selezioni si resettano quando la radio si riavvia.

Il raccoglitore elenca le stesse azioni compilate documentate di seguito, tranne `NONE`. Si applicano restrizioni d'azione normali: un'azione che non è disponibile nello stato radio attuale viene rifiutata con il solito segnale di errore.

## Microfono esterno
### `PTT`
* Pulsante push-to-talk.
* Il `PTT del microfono esterno` funziona in modo diverso dal pulsante laterale interno `PTT`.

> [!NOTE]
> Su alcune revisioni hardware, il microfono esterno `PTT` si comporta in modo diverso:
> - quando si preme PTT, TX aspetta fino a quando non viene ricevuto segnale RX ( observato con radio PCB revisione V1.4 e OK con V1.6 ). Questo funziona bene con `PTT` interno
> - un tono DTMF (`key press`) o 1750 Hz tono (`function button`) può essere tagliato fuori entro un secondo. Questo funziona bene con `PTT` interno

## Funzioni del pulsante personalizzato
Cinque azioni di collegamento possono essere personalizzate nel menu:
* `F1Shrt` - tasto laterale 1,, premere breve
* `F1Long` - tasto laterale 1,, lunga pressione
* `F2Shrt` - tasto laterale 2️⃣, premere breve
* `F2Long` - tasto laterale 2️⃣, lunga pressione
* `M Long` - pulsante menu, lunga pressione

Funzioni disponibili:
* NONE - nessuna azione
* FLASH LIGHT - passare alla funzione torcia successiva: ON / OFF
* POWER - interruttore di potenza di uscita radio tra [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITOR - modalità monitor switch ON / OFF
* SCAN - inizio canali/frequenza di scansione
* VOX - funzione di attivazione vocale ON / OFF
* FM RADIO - girare FM radio ON / OFF
* `1750 Hz` - invia la scoppio del tono `1750 Hz`
* LOCK KEYPAD - bloccare / sbloccare la tastiera
* VFO A VFO B - cambiare VFO principale in alto/basso
* VFO MEM - modifica la modalità VFO corrente, la modalità di frequenza o la modalità del canale di memoria
* MODE - passare alla modalità di demodulazione successiva tra [FM / AM / USB]
* RX MODE - modalità di visualizzazione interruttore tra [DW / DWR / XB / MO]
* MAIN ONLY - modalità di visualizzazione dell'interruttore tra [DW / DWR / XB] e MO
* PTT - switch PTT mode CLASSIC / ONEPUSH
* WIDE NARROW - interruttore tra WIDE e NARROW
* MUTE - volume dell'altoparlante mute
* RxA - passare il profilo audio RX per la modulazione corrente: in `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; in `AM`, `SHARP` / `STOCK` / `OPEN`
* POWER HIGH - temporaneamente passare alla potenza massima di `5 W`
* REMOVE OFFSET - rimuovere temporaneamente l'offset di un canale di memoria, se presente
* BEAM - apre la modalità di trasferimento BEAM, quando abilitata nella costruzione. BEAM può inviare le attuali impostazioni VFO/memory-channel ad un'altra radio o ricevere le impostazioni da un'altra radio.
* FOX HUNT - apre l'applicazione di ricezione-solo direzione-finanziamento, quando residente o disponibile come app installata Labs.
* BEACON - apre l'applicazione indipendente Morse beacon, quando residente o disponibile come app installata Labs.
* RF LOG - apre il registro di storia RX/TX, quando abilitato nella costruzione. Il registro mostra le recenti sessioni di ricezione, monitoraggio e trasmissione memorizzate in flash esterno.

### Azione BEAM

Assegna `BEAM` a una delle scorciatoie personalizzabili (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`), quindi attiva la scorciatoia per aprire la modalità BEAM.

In modalità BEAM:

* `UP` / `DOWN` si attiva tra `BEAM TX` e `BEAM RX`
* `M` avvia l'operazione selezionata
* `EXIT` lascia la modalità BEAM

`BEAM TX` invia la configurazione corrente VFO o del canale di memoria. Il pacchetto include la frequenza RX, l'offset TX, le impostazioni RX/TX DCS o CTCSS, la modulazione, la larghezza di banda, la potenza di uscita, l'assegnazione della lista di scansione, il compander, le impostazioni relative DTMF- quando abilitate e il nome del canale.

`BEAM RX` aspetta un pacchetto BEAM da un'altra radio. Quando viene ricevuto un pacchetto valido, la radio lo salva al primo canale di memoria gratuito. Se la memoria è piena, lo stato mostra `MEM FULL`. Premere `EXIT` dopo un successo ricevere gli interruttori al canale appena salvato; altrimenti ripristina lo stato VFO/channel precedente.

### FOX HUNT azione

Assegna `FOX HUNT` a una delle scorciatoie personalizzabili (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`), quindi attiva la scorciatoia per aprire FoxHunt sulla VFO selezionata.

In modalità Fox Hunt:

* `1` oscilla tra la scala S-meter e il grafico della storia del segnale recente
* `2` cicli tra silenzioso, Geiger-style beep, e audio di ricezione-stazione
* Cicli `3` attraverso `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` e `BYP+`
* `UP` / `DOWN` modifica l'attenuazione del ricevitore direttamente
* `M` resetta i riferimenti di punta, minimo e segnale-trend
* tenere `F` per circa 0,5 secondi blocca o sblocca i controlli FoxHunt; le frecce di attenuazione rimangono disponibili mentre bloccate
* `EXIT` foglie FoxHunt

Vedere [FoxHunt](./Fox-Hunt) per le letture dello schermo, le impostazioni di guadagno, i controlli e la guida di direzione-finanziamento.

### Azione BEACON

Assegna `BEACON` ad una delle scorciatoie personalizzabili, quindi attiva la scorciatoia per avviare l'applicazione Beacon indipendente. Beacon inizia la sua prima trasmissione immediatamente.

Le chiavi `1`, `2`, `3` e `4` regolano la finestra TX, l'intervallo silenzioso, l'identificatore della volpe e la modalità di keying (`TONE` / `CARR`). Tenere `F` per circa 0,5 secondi blocca o sblocca tutti i controlli Beacon, anche durante una trasmissione attiva. `M` ferma la trasmissione corrente e inizia un intervallo di idle fresco; `EXIT` si ferma in modo sicuro e lascia Beacon.

Vedere [Beacon](./Beacon) per l'identificazione, la tempistica, le protezioni di trasmissione, le impostazioni salvate e le informazioni di sicurezza.

### RF LOG azione

Assegna `RF LOG` a una delle scorciatoie personalizzabili (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`), quindi attiva la scorciatoia per aprire il registro di storia RX/TX.

I registri di registro ricevono, monitorano e trasmettono sessioni in flash esterno. Ogni riga di traffico mostra:

* il nome del canale, quando l'ingresso viene da un canale di memoria; altrimenti la frequenza
* se l'ingresso era `RX` o `TX`
* un nuovo badge indice
* un distintivo di dettaglio che può mostrare durata, segnale / potenza, o tensione della batteria

Sulla schermata `RF LOG`:

* `UP` / `DOWN` scorre attraverso il registro, nuove voci prima
* `F` + `UP` salta alla nuova voce
* `F` + `DOWN` salta all'entrata visibile più antica
* premere brevemente `M` per scorrere i filtri: `ALL`, `RX`, `TX`
* premere brevemente `* SCAN` per scorrere i dettagli: durata, livello S-meter RX / potenza TX, tensione minima della batteria durante la sessione
* lunga pressione `M` chiede la conferma di compensazione del registro; lunga pressione `M` di nuovo su `CLEAR LOG / SURE?` cancella il registro
* `EXIT` lascia la schermata di registro o cancella la conferma chiara

La radio mantiene fino a 512 voci di traffico visibili nella vista del registro. Le linee di separatore di sessione segnano il riavvio della radio quando il filtro `ALL` è attivo.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Menu](./Menu)
* [Operazione radio](./Radio-operation)
* [Scansione](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Caratteristiche avanzate](./Advanced-features)
* [Overlay app](./Overlay-apps)
* [Overlay application](./Overlay-applications)
* [Risoluzione dei problemi](./Troubleshooting)
