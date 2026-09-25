# Scansione

Questa pagina raggruppa tutte le funzioni correlate alla scansione: scansione della frequenza, scansione della memoria, liste di scansione, `ScnRng`, copia della frequenza e scansione DCS / CTCSS.

Per l'operazione VFO/canale di giorno in giorno, vedere [Operazione radio](./Radio-operation). Per l'utilizzo dello spettro, vedere [Analizzatore di spettro](./Spectrum-analyzer).

## In questa pagina

* [Scansione di frequenza](#frequency-scanning)
* [Scansione dei canali di memoria](#memory-channels-scanning)
* [elenco di scansione MIX](#mix-scan-list-v610)
* [Modalità motore: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Scan indicatori e rilevamento](#scan-indicators-and-detection)
* [Copia della frequenza e scansione DCS / CTCSS](#frequency-copy-and-dcs--ctcss-scanning)
* [Pagine correlate](#related-pages)

> [!TIP]
> Se la scansione della memoria sembra rotta, la causa più comune è una lista di scansione attiva vuota. Vedere [Risoluzione dei problemi](./Troubleshooting) per i controlli rapidi.

## Scansione di frequenza

Per avviare una scansione di frequenza, passare un VFO in modalità frequenza. Impostare una frequenza di inizio. Impostare un passo di frequenza (menu `Step`). Avviare la scansione con una [funzione di scansione personalizzata](./Button-functions#custom-button-functions) o premendo a lungo il tasto `* Scan`.

### Funzione dell'intervallo di frequenza di scansione

* passare alla modalità frequenza
* impostare le frequenze VFO superiori e inferiori ai confini dell'intervallo di scansione
* lunga pressione `5 NOAA`; l'etichetta `ScnRng` dovrebbe apparire
* avviare la scansione premendo `* Scan`
* la radio esegue la scansione tra i confini selezionati
* lunga pressione `5 NOAA` o `EXIT`, o commutare VFO, per uscire dalla modalità `ScnRng`

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

La funzione `ScnRng` è supportata anche dall'analizzatore di spettro. Se hai già abilitato `ScnRng`, basta avviare il [spectrum analyzer](./Spectrum-analyzer).

Se utilizzi [AirCopy](./AirCopy) e trasferisci `Settings`, l'area VFO è inclusa. Questo copia anche le attuali frequenze limite `ScnRng` della radio di origine alla radio di destinazione.

### Escluse le frequenze in ScnRng

Mentre una scansione `ScnRng` viene fermata su una frequenza ricevuta, premere a lungo `MENU` per escludere quella frequenza dalla scansione dell'intervallo corrente.

Si possono escludere fino a **64** frequenze di portata. L'elenco è circolare: dopo 64 esclusioni, aggiungendo un altro sostituisce la più antica esclusione memorizzata.

Queste esclusioni sono temporanee. Essi sono tenuti solo per la configurazione attiva `ScnRng` e non sono scritti a memoria. Essi sono chiariti se la radio è riavviata, e sono anche sgomberati quando l'identità di gamma cambia: frequenza di inizio, frequenza di arresto, o passo di scansione.

## Scansione dei canali di memoria

La scansione della memoria consente alla scansione radio di salvare i canali di memoria invece di passare attraverso le frequenze.

Per usarlo, passare il VFO a **Memory mode**, quindi avviare la scansione con una chiave di scansione programmata o con la lunga pressione `* Scan`.

### Elenchi di scansione

La radio fornisce **24 liste di scansione**. Ogni canale di memoria può essere assegnato a:

* `OFF`: il canale è escluso dalle liste di scansione
* `1` a `24`: il canale appartiene ad una specifica lista di scansione
* `ALL`: il canale è incluso in tutte le liste di scansione

Un canale di memoria può appartenere a uno solo di questi stati alla volta.

`MIX` è una modalità di scansione attiva, non un altro incarico per canale. Esso combina diversi elenchi numerati; vedi [elenco di scansione MIX](#mix-scan-list-v610).

### Assegnare un canale a una lista di scansione

Per modificare l'assegnazione della lista di scansione del canale di memoria corrente:

* aprire il menu `ScList`
* o lunga pressione `5 NOAA` per l'assegnazione rapida

La rapida scorciatoia cicli il canale attraverso:

* `OFF`
* `1` a `24`
* `ALL`

L'assegnazione corrente è mostrata a destra del nome del canale.

### Elenchi di scansione nominati

Le liste di scansione possono avere nomi brevi.

Quando un elenco ha un nome, la radio mostra che il nome **3-character** al posto del numero di elenco numerico dove possibile:

* negli indicatori di stato relativi alla scansione
* nella lista menu di selezione
* nell'elenco dei canali-indicazione

Se un elenco non ha nome, la radio mostra invece il numero di lista.

### Lista di scansione attiva

La scansione della memoria usa sempre una lista di scansione attiva**.

L'elenco attualmente attivo viene visualizzato in alto a sinistra dello schermo durante la scansione:

* `01` a `24` per un elenco numerato
* `MIX` per la combinazione salvata di elenchi selezionati, a partire da `v6.1.0`
* `ALL` per tutti i canali elencati

Se l'elenco selezionato ha un nome, il nome breve viene visualizzato invece del numero.

Se l'elenco selezionato è vuoto o non valido, la radio passa automaticamente alla successiva lista valida e non vuota.

### Scansione della memoria iniziale

Una volta che i canali sono stati assegnati alle liste, avviare la scansione della memoria da:

* utilizzando una chiave assegnata alla funzione di scansione
* o lunga pressione `* Scan`

La radio quindi esegue la scansione dei canali di memoria che appartengono alla lista di scansione attualmente attiva.

### Modifica della lista di scansione durante la scansione

La lista di scansione attiva può essere modificata senza interrompere la scansione.

* tenere premuto `* SCAN`: passa alla successiva lista di scansione valida e non vuota
* `F + navigation key`: sfogliare le liste di scansione durante la scansione (`UP` / `DOWN` su UV-K5, `LEFT` / `RIGHT` su UV-K1)
* keypad ingresso diretto:
  * `01` a `24`: selezionare l'elenco di scansione direttamente
  * `25`: selezionare `MIX`, a partire da `v6.1.0`
  * `00`: selezionare `ALL`

Se la lista richiesta è vuota, la radio beeps e salta alla prossima lista valida, non-vuota.

Quando una scansione di memoria passa le liste, il nome dell'elenco sostituisce temporaneamente il manometro di progresso. In `v5.9.0`, la ripresa della scansione è tenuta mentre quel nome è in realtà visibile, quindi il manometro nascosto e la posizione di scansione corrente non possono allontanarsi e quindi saltare in avanti quando il manometro ritorna.

Questa breve tenuta si applica solo alla scansione della memoria. La scansione di frequenza e `ScnRng` possono ancora armare lo stesso conteggio di sovrapposizione attraverso i loro controlli, ma non visualizzano un nome della lista di scansione e quindi continuano senza una pausa inspiegabile.

### Elenco di scansione MIX (v6.1.0)

`MIX` scansiona diversi elenchi numerati come un insieme combinato senza modificare l'elenco assegnato a qualsiasi canale. Un canale è incluso quando:

* appartiene a uno degli elenchi numerati abilitati nell'editor `MIX`, o
* il suo incarico canale è `ALL`

I canali assegnati a `OFF` rimangono esclusi. Un canale ha ancora un solo incarico (`OFF`, `01` a `24`, o `ALL`); `MIX` memorizza una maschera di selezione separata che descrive quali elenchi numerati dovrebbero essere combinati.

Per configurare `MIX`:

1. Apri `ScList`.
1. Selezionare `MIX` e premere `M`.
1. Utilizzare i tasti di navigazione per passare attraverso le liste `01` a `24`, o inserire un numero di elenco a due cifre per saltare direttamente a esso.
1. Premere `M` per attivare l'elenco evidenziato `ON` o disattivare.
1. Premere `EXIT` per salvare la selezione e rendere `MIX` la modalità di scansione attiva.

L'editor mostra il conteggio della lista selezionata come `NN/24`. Almeno un elenco deve rimanere abilitato; il tentativo di disabilitare l'ultima lista selezionata produce un segnale di errore.

La sequenza di scansione normale diventa `01` attraverso `24`, poi `MIX`, poi `ALL`. Durante una scansione di memoria attiva, immettere `25` per selezionare `MIX` direttamente o `00` per selezionare `ALL`. Se l'`MIX` risultante non contiene un canale scannable valido, la radio beeps e avanza alla prossima modalità valida.

La maschera `MIX` salvata fa parte delle impostazioni radio ed è inclusa in un trasferimento [AirCopy](./AirCopy) `Settings`.

### Cambiare direzione di scansione

Durante la scansione, premere un tasto di navigazione:

* `UP` / `DOWN` su UV-K5
* `LEFT` / `RIGHT` su UV-K1

Questo invertisce la direzione utilizzata per passare attraverso i canali di memoria nell'elenco di scansione corrente.

### Scansione prioritaria

La radio supporta due canali prioritari:

* `PriCh1`
* `PriCh2`

Questi sono configurati nel menu e controllati dall'impostazione `ScPri`.

#### Come funziona

Quando la scansione prioritaria è abilitata, la radio non controlla semplicemente i canali nell'ordine dell'elenco. Invece, inserisce ripetutamente i canali prioritari nel ciclo di scansione.

La sequenza di scansione diventa:

1. `PriCh1`
1. `PriCh2`
1. successivo canale regolare dalla lista di scansione attiva

Questo ciclo poi si ripete continuamente.

Questo consente alla radio di controllare i due canali prioritari più spesso dei canali regolari, quindi l'attività su di essi viene rilevata più velocemente.

#### Comportamento importante

Quando la scansione prioritaria è abilitata:

* canali prioritari sono gestiti separatamente dalla scansione normale dell'elenco
* se un canale prioritario appartiene anche alla lista di scansione attiva, viene rimosso dal percorso di scansione regolare per evitare di essere scansionato due volte
* i canali prioritari possono ancora essere controllati anche se sono al di fuori della normale lista progressione

### Arresto e ripresa della scansione

Quando lo scanner trova attività su un canale, ciò che succede dipende dall'impostazione `ScnRev`.

A seconda di questa impostazione, la radio può:

* riprendere la scansione automaticamente dopo un ritardo
* rimanere fermato sul canale attivo fino a quando la scansione è riavviata manualmente

Il comportamento della pausa e del curriculum è quindi controllato dalla modalità di scansione del curriculum, non dalla stessa lista di scansione.

### Escludere un canale durante la scansione

Mentre la scansione della memoria viene fermata su un canale di memoria ricevuto, lunga pressione `MENU` per escludere quel canale dalle scansioni di memoria future.

#### Nota importante

Questa esclusione è temporanea.

Il canale rimane escluso fino al successivo riavvio del ricetrasmettitore.

### Riprendi la scansione

Se si spegne il ricetrasmettitore durante la scansione, la scansione riprenderà automaticamente la prossima volta che si riavvia.

### Frequenza comune / caratteristiche di scansione del canale

I seguenti controlli si applicano sia alla scansione di frequenza che alla scansione della memoria:

* premere una chiave di navigazione durante la scansione per invertire la direzione di scansione (`UP` / `DOWN` su UV-K5, `LEFT` / `RIGHT` su UV-K1)
* premere `EXIT` per interrompere la scansione e tornare alla frequenza o al canale selezionato prima della scansione
* premere `PTT` o `MENU` per interrompere la scansione e mantenere l'ultima frequenza o canale in cui l'attività è stata trovata

## Modalità motore di scansione: NORMAL vs FAST

Costruisce con il supporto di scansione veloce aggiungere il menu `SetScn`. Seleziona il motore di scansione utilizzato dalla scansione della memoria e `ScnRng`.

### NORMALE

`NORMAL` utilizza il percorso di scansione standard. Ogni canale di frequenza o di memoria è completamente applicato alla radio, con la normale configurazione VFO, la configurazione di squelch/output-power, la configurazione del registro del ricevitore e il solito temporizzazione di pausa di scansione.

Questa modalità è la scelta più conservatrice. È utile se si preferisce il comportamento di scansione più vecchio o si desidera confrontare i risultati contro il motore veloce.

### FAST

`FAST` è la modalità predefinita nelle build correnti. Aggiunge un leggero pre-check RSSI prima della configurazione completa di ricezione:

* per la scansione della memoria, il firmware sonde la frequenza del canale successivo e salta rapidamente se è chiaramente silenzioso
* per `ScnRng`, il firmware sonde un piccolo lotto di passi di gamma prima di fare una sintonizzazione completa
* lotti silenziosi sono saltati più velocemente, quindi la scansione spende meno tempo su spettro vuoto
* i segnali possibili sono promossi di nuovo al normale percorso di ricezione completo, in modo da squelch e il normale comportamento di scansione-resume ancora decidere cosa succede dopo
* in `ScnRng`, i passaggi fini possono essere raffinati intorno a un candidato in modo che la scansione atterra più vicino al segnale più forte nelle vicinanze
* se il loop di scansione si blocca dopo la normale pausa `ScnRev` è scaduto, un breve watchdog riprende la scansione

Il rapido pre-check impara un locale pavimento rumore RSSI e confronta ogni sonda contro quel pavimento e la soglia di squelch configurata. Se squelch è completamente aperto, o se il percorso veloce non può tranquillamente pre-controllare un canale, il firmware torna alla normale sintonizzazione completa per quel passaggio.

> [!NOTE]
> In `ScnRng`, la modalità `FAST` può scansionare circa **150+ frequenze al secondo** in condizioni favorevoli, soprattutto quando la maggior parte della gamma è silenziosa e la scansione può saltare batch silenziosi senza fare una completa configurazione di ricezione per ogni passo.

La scansione di frequenza normale al di fuori di `ScnRng` avanza ancora un passo di frequenza alla volta; `SetScn = FAST` cambia principalmente la scansione della memoria e il comportamento di scan-range.

## Indicatori di scansione e rilevamento

Le attuali costruzioni veloci possono mostrare una piccola scintilla RSSI durante la scansione. È una storia compatta dei campioni RSSI recenti; campioni silenziosi rimangono bassi, mentre i candidati più forti si distinguono come segni più alti.

Durante la scansione della memoria, l'indicatore della lista di scansione continua a mostrare l'elenco attivo:

* `01` a `24`
* `MIX`, a partire da `v6.1.0`
* `ALL`
* il nome della lista di scansione 3 caratteri, quando l'elenco ha uno

Quando la scansione prioritaria è abilitata, un `+` è allegato all'indicatore della lista di scansione.

Durante `ScnRng`, le costruzioni con supporto sottoaudible scan-range possono rilevare CTCSS / DCS mentre la radio viene fermata su un segnale ricevuto. Se si trova un codice, l'interfaccia utente di scansione può mostrare il codice di tono rilevato o DCS insieme alla frequenza ricevuta.

Il display di scansione perfeziona anche il posizionamento dell'indicatore di blocco VFO durante la scansione, così TX-lock stato rimane visibile senza sovrapporre le informazioni di scansione attiva.

## Copia frequenza e scansione DCS / CTCSS

Questa funzione consente di rilevare e copiare le impostazioni di frequenza e codifica. La ricerca di frequenza funziona solo per segnali forti, quindi la radio di trasmissione deve essere vicina. Per avviare la copia di frequenza (`FC`), utilizzare il pulsante funzione `4 FC`. Lo schermo dello scanner si aprirà. Premere e tenere premuto il tasto PTT sull'altra radio. Attendere un paio di secondi fino a quando la frequenza e il codice (se utilizzato) appaiono sullo schermo. Le impostazioni possono essere salvate con il pulsante `MENU`. Essi saranno salvati sia a un canale o al VFO principale, a seconda della modalità in cui hai iniziato la scansione.

Nella costruzione attuale, lo schermo dello scanner rende lo stato più esplicito:

* `Search Freq`: la ricerca di frequenza è in esecuzione
* `Search Tone`: la ricerca di tono/codice sottoaudibile è in esecuzione
* `Scan Complete`: il risultato è stato trovato
* `Scan Failed`: nessun risultato utilizzabile è stato trovato
* `Freq:` mostra la frequenza rilevata
* `Tone:` / `CTCSS:` / `DCS:` mostra l'impostazione subaudibile rilevata quando si trova

Puoi anche cercare solo il codice DCS / CTCSS per una frequenza impostata sul VFO principale. Scegliere la frequenza o il canale desiderato e premere `F` + `* SCAN`. La stessa schermata apparirà, ma la ricerca di frequenza sarà omessa; la frequenza del VFO principale verrà utilizzata invece. Attendere che un segnale venga visualizzato o premere il PTT sull'altra radio. Ci vogliono da 1 a 2 secondi per trovare il codice. La procedura di salvataggio è la stessa di quanto sopra.

C'è un altro modo per eseguire la scansione di un codice DCS / CTCSS. Scegli la frequenza o il canale desiderato. Vai al menu `RxDCS` o `RxCTCS`. Inserisci l'opzione menu e premi il pulsante `* SCAN`. Viene visualizzata un'etichetta `SCAN`. Attendere un segnale radio o premere il tasto PTT sull'altra radio. Quando il codice viene trovato, l'etichetta `SCAN` scompare. Per salvarlo, confermare l'opzione con il pulsante `MENU`. Non importa quale delle due voci di menu si parte da: sia DCS che CTCSS possono essere trovati, e la voce del menu sarà cambiata a quella corretta.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Operazione radio](./Radio-operation)
* [ Funzioni pulsanti](./Button-functions)
* [Spectrum analyzer](./Spectrum-analyzer)
* [Caratteristiche avanzate](./Advanced-features)
* [AirCopy](./AirCopy)
* [Risoluzione dei problemi](./Troubleshooting)
