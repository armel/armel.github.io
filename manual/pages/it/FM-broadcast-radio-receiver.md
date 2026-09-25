# Ricevitore di trasmissione FM

La radio può ricevere la trasmissione FM da `76` a `108 MHz`. Usa un chip separato (`BK1080`) per questo. RDS non è supportato.

Durante l'ascolto di trasmissione normale, la VFO attiva ha ancora la priorità. La ricezione sull'attiva VFO disabilita temporaneamente l'audio di trasmissione; alla fine della ricezione VFO, la radio torna alla trasmissione. Mentre la scansione manuale o automatica della stazione FM è attiva, `v5.9.0` ignora temporaneamente la ricezione del canale principale in modo che la scansione della stazione possa finire senza essere interrotta.

> [!NOTE]
> Se questa pagina menziona `UP` / `DOWN`, utilizzare i tasti `LEFT` / `RIGHT` equivalenti su UV-K1. Il layout di navigazione attivo segue `SetNav`.

> [!NOTE]
> - la VFO attiva ha la priorità durante l'ascolto di trasmissione normale, ma non durante una scansione attiva della stazione FM
> - la scansione automatica sovrascrive tutti i ricordi `48` FM

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Operazioni di base

* `F` + `0 FM`, lunga pressione `0 FM`, o una [funzione del pulsante personalizzato](./Button-functions#custom-button-functions) inizia a trasmettere la ricezione
* `EXIT`, o utilizzando nuovamente lo stesso comando di avvio mentre la radio è in modalità FM, termina la ricezione di trasmissione
* `F` + `3 VFO/MR`, o lunga pressione `3 VFO/MR`, modifiche tra la modalità VFO e la modalità di memoria

### Impostare una frequenza in modalità FM-VFO

Basta digitare una frequenza sintonizza il ricevitore. La risoluzione è `100 kHz`, in modo da entrare `929` sintonizza a `92.9 MHz`. Utilizzare i tasti freccia per cambiare nei passaggi `100 kHz`.

### Cambiare la gamma di trasmissione FM

Se non si può sintonizzare la stazione si aspetta, si può semplicemente essere nella gamma di trasmissione FM sbagliato.

Mentre la ricezione di trasmissione FM è attiva, lunga pressione `1 BAND` per andare in bicicletta attraverso i range FM disponibili:

* `87.5` a `108 MHz`
* `76` a `108 MHz`
* `76` a `90 MHz`
* `64` a `76 MHz`

L'intervallo attualmente selezionato è mostrato in basso a sinistra dello schermo FM, ad esempio `87.5-108M`.

Sintonizzazione diretta, scansione manuale, scansione automatica e memorie FM funzionano solo all'interno dell'intervallo attualmente selezionato. Se una stazione o una memoria FM salvata è al di fuori di quell'intervallo, passare a un'altra banda FM prima.

### Conservare in memoria dalla modalità FM-VFO

Premere `M` in modalità VFO consente di memorizzare la frequenza corrente in un canale di memoria. Utilizzare i tasti freccia per selezionare la memoria, quindi confermare con `M`. Ci sono ricordi `48` disponibili.

### Selezionare una memoria

In modalità MR, immettendo `01` a `48` seleziona un canale di memoria. Utilizzare `UP` / `DOWN` per passare attraverso i canali di memoria.

### Eliminare una memoria memorizzata

In modalità MR, premendo `M` consente di eliminare quel canale di memoria.

## Scansione per stazioni da FM-VFO

### Scansione automatica

Inizia con `F` + `* Scan` o con `* Scan` a lunga pressione.
Le scansioni radio per stazioni e memorizza le prime stazioni `48` in memoria. La scansione inizia dal lato basso della band. L'avvio della scansione automatica cancella i canali memorizzati in precedenza. `EXIT` termina la scansione automatica.

Mentre la scansione automatica è in esecuzione, un segnale in arrivo rilevato sul canale principale del ricetrasmettitore non interrompe la scansione FM. La priorità principale del canale normale viene ripristinata non appena la scansione FM si ferma.

### Scansione manuale

Una breve stampa su `* Scan` inizia la scansione manuale. La radio scorre verso l'alto dalla frequenza corrente fino a quando una stazione è ricevuta. È possibile continuare la scansione in entrambe le direzioni utilizzando i tasti freccia. `EXIT` interrompe la modalità di scansione.

La stessa eccezione temporanea del canale principale si applica durante la scansione manuale. Una volta che la scansione si ferma su una stazione o viene annullata, l'ascolto di trasmissione ordinaria di nuovo cede alla ricezione sulla VFO attiva.

## Funzioni del pulsante

* `1 BAND` - pressa lunga, interruttore FM intervalli di trasmissione
* `3 VFO/MR` - modalità frequenza di commutazione/memoria
* `* SCAN`
   * pressa corta - avviare la scansione singola
   * lunga stampa - avviare la scansione automatica (tutti i canali di memoria verranno eliminati e sostituiti con risultato di scansione)

## Pagine correlate

* [Per iniziare](./Getting-started)
* [ Funzioni pulsanti](./Button-functions)
* [Operazione radio](./Radio-operation)
* [Risoluzione dei problemi](./Troubleshooting)
