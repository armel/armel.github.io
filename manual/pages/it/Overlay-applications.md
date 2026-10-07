# Applicazioni di sovrapposizione

Questa pagina descrive le undici applicazioni attualmente disponibili per l'edizione `Labs`: cosa fanno e come controllarle. Per l'installazione, la compatibilità e le informazioni sullo sviluppatore, vedere [Applicazioni di Overlay](./Overlay-apps).

> [!NOTE]
> I tasti di navigazione dipendono dalla radio e dall'impostazione `SetNav`: `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1. Nelle tabelle seguenti, `UP/LEFT` e `DOWN/RIGHT` si riferiscono a queste chiavi equivalenti.

## Avvio di un'applicazione

1. Installare un file `.app` compatibile con [UV Studio](./UV-Studio#apps-labs).
1. Dalla normale schermata radio, premere `F`, quindi `7 VOX`.
1. Selezionare un'applicazione installata con `UP/LEFT` o `DOWN/RIGHT`.
1. Premere `M` per avviarlo.

Nella maggior parte delle applicazioni, `EXIT` chiude l'applicazione e ritorna al launcher o normale schermo radio. Alcune applicazioni radio possono anche essere assegnate direttamente a una chiave programmabile attraverso il normale raccoglitore di azione.

## Sintesi della domanda

| Applicazione | Oggetto |
| --- | --- |
| `Broadcast FM` | Ricevitore di trasmissione FM completo con VFO, memorie e scansione della stazione |
| `FoxHunt` | Segnale-forza e direzione-finanziamento aiuto con storia, attenuazione e guida audio |
| `Beacon` | Ripetere ARDF-style Morse beacon utilizzando la trasmissione selezionata VFO |
| `Beam` | Configurazione di un canale Transfer tra radio compatibili sull'aria |
| `Breakout` | Brick-breaking gioco |
| `Tetris` | Falling-block gioco con punteggio, livelli e un punteggio migliore salvato |
| `Cube3D` | Specchio di forma 3D animato |
| `Plasma` | Modelli di stile demoscene animati |
| `Snake` | Classic gioco di serpente a griglia con un miglior punteggio salvato |
| `Rapid Roll` | Gioco a piattaforme in cui una pallina deve continuare a scendere evitando gli ostacoli |
| `Space Impact` | Spaziale sparatutto con fuoco automatico, missili e boss |

## Broadcast FM

`Broadcast FM` è un ricevitore di trasmissione BK1080 completo. Fornisce modalità di frequenza e memoria, quattro bande di trasmissione, ricerca manuale, scoperta automatica della stazione e 48 memorie FM condivise con la radio residente FM.

Mentre questa applicazione è in esecuzione, le normali funzioni BK4819 ricevono e dual-watch sono sospese. Le modifiche ai ricordi di FM si impegnano in modo sicuro quando l'applicazione esce.

| Chiave | Azione |
| --- | --- |
| `0`-`9` | Inserisci una frequenza in modalità VFO o un numero di memoria a due cifre in modalità MR/save |
| `UP/LEFT` o `DOWN/RIGHT` | Sintonizzare un passo in modalità VFO; selezionare la stazione precedente / necessario memorizzata in modalità MR; scegliere uno slot di salvataggio; cambiare la direzione di ricerca durante la scansione |
| `*` | Avviare la ricerca manuale; fermare una scansione attiva |
| `F`, poi `*` o tenere `*` | Avviare la scansione automatica e ricostruire l'elenco di memoria FM |
| `M` in modalità VFO | Apri `SAVE?`; premi `M` di nuovo per salvare nella slot selezionata |
| `M` in modalità MR | Apri `DEL?`; premi `M` di nuovo per eliminare la memoria selezionata |
| `F`, poi `1` o tenere `1` | Selezionare la prossima banda di trasmissione |
| `F`, poi `3` o tenere `3` | Interruttore tra le modalità VFO e MR |
| `F`, poi `0` o tenere `0` | Esci dall'applicazione |
| `EXIT` | Cancellare l'ultima cifra inserita, annullare un prompt di salvataggio/determinazione o uscire |

> [!WARNING]
> La scansione automatica cancella e ricostruisce la lista di memoria FM prima di memorizzare le stazioni che trova.

## FoxHunt

`FoxHunt` aiuta a individuare un trasmettitore utilizzando il selezionato ricevere VFO. Mostra la forza del segnale corretta in dBm, un IARU-style S-meter, livelli di picco e minimi, informazioni di tendenza, e sia un grafico a barre o cronologia del segnale. L'attenuazione selezionabile estende l'intervallo utile vicino a un trasmettitore forte.

| Chiave | Azione |
| --- | --- |
| `1` | Alterna tra il grafico a barre e la cronologia del segnale |
| `2` | Selezionare la modalità audio successiva: off, beep di forza, o audio stazione continua |
| `3` | Aumento dell'attenuazione |
| `F`, poi `2` | Selezionare la modalità audio precedente |
| `F`, poi `3` | Diminuzione dell'attenuazione |
| `UP/LEFT` o `DOWN/RIGHT` | Aumentare / diminuire l'attenuazione direttamente |
| `M` | Reimpostare i valori di riferimento di picco, minimo e trend |
| Tenga `F` | Blocca o sblocca la tastiera dell'applicazione |
| `EXIT` | Uscita mentre la tastiera è sbloccata |

Il grafico, la modalità audio e l'impostazione di attenuazione sono salvati per il prossimo lancio. Le due chiavi di navigazione rimangono disponibili mentre la tastiera dell'applicazione è bloccata.

## Beacon

`Beacon` trasmette ripetutamente un identificatore Morse ARDF-style sulla trasmissione selezionata VFO. Si alterna tra una finestra di trasmissione configurabile e il periodo inattivo. Gli identificatori disponibili sono `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` e `CALL`; `CALL` invia il segnale di chiamata configurato seguito da `MOE`.

| Chiave | Azione |
| --- | --- |
| `1` | Aumentare la durata della trasmissione in 5 secondi (`5`–`60` secondi) |
| `2` | Aumentare la durata dell'idle in 5 secondi (`5`–`240` secondi) |
| `3` | Selezionare l'identificatore successivo |
| `4` | Alterna la manipolazione `TONE` / `CARR` |
| `F`, poi `1` / `2` / `3` / `4` | Modificare l'impostazione corrispondente nella direzione inversa |
| `M` durante la trasmissione | Fermare la finestra di trasmissione corrente e iniziare il periodo inattivo |
| `M` mentre idle | Riavviare il conto alla rovescia completo |
| Tenga `F` | Bloccare o sbloccare tutti i controlli applicativi |
| `EXIT` | Fermare in sicurezza e uscire mentre i controlli sono sbloccati |

La prima trasmissione inizia immediatamente. Durata, tempo minimo, identificatore e modalità di keying vengono salvati per il prossimo lancio. Se il firmware residente rifiuta la trasmissione, l'applicazione visualizza `TX OFF` e non trasmette.

> [!WARNING]
> Beacon trasmette automaticamente. Controllare la VFO selezionata, frequenza, potenza, antenna, segnale di chiamata, ciclo di dovere e le normative locali prima di lanciarlo.

## Beam

`Beam` trasferisce la configurazione selezionata VFO o del canale di memoria tra le radio compatibili. La radio invio trasmette i dati del canale sull'aria; la radio ricevente memorizza un pacchetto valido nella prima memoria gratuita.

| Chiave | Azione |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Alterna tra la modalità di trasmissione (`BEAM TX`) e quella di ricezione (`BEAM RX`); interrompe anche un'operazione di ricezione attiva |
| `M` in modalità TX | Invia la configurazione del canale selezionato |
| `M` in modalità RX | Inizia ad aspettare un pacchetto Beam |
| `EXIT` | Smettere di ricevere o uscire dall'applicazione |

Il display segnala `SENT`, `RECEIVED`, `MEM FULL` o `ERROR` come appropriato. Solo un canale ricevuto è impegnato per il lancio; uscire e riaprire Beam prima di ricevere un altro.

## Breakout

`Breakout` è un gioco di mattoni compatto con 18 mattoni, cinque palle di partenza, punteggio e monitoraggio del livello. Cancellare il muro inizia il livello successivo e premia una palla in più.

| Chiave | Azione |
| --- | --- |
| `4` o `UP/LEFT` | Spostare la pagaia a sinistra |
| `0` o `DOWN/RIGHT` | Spostare la pagaia a destra |
| `M` | Pausa o curriculum; dopo `GAME OVER`, avviare il nuovo gioco preparato |
| `EXIT` | Esci dall'applicazione |

Il progresso del gioco non viene mantenuto dopo aver lasciato l'applicazione.

## Tetris

`Tetris` utilizza un 16 × 16 ben visibile, una borsa a sette pezzi, un pezzo fantasma, un'anteprima del pezzo successivo, un punteggio, linee e livelli. Il miglior punteggio viene salvato tra i lanci.

| Chiave | Azione |
| --- | --- |
| `4` o `UP/LEFT` | Muoversi a sinistra |
| `6` o `DOWN/RIGHT` | Muoversi a destra |
| `M` o `2` | Ruotare il pezzo |
| `8` | Goccia morbida |
| `*` o `0` | Goccia dura |
| `F` | Pausa o curriculum |
| `M`, `*`, o `0` dopo il gioco sopra | Iniziare un nuovo gioco |
| `EXIT` | Esci dall'applicazione |

Movimento e soft drop ripetino mentre le chiavi sono tenute.

## Cube3D

`Cube3D` rende rotanti forme solide o wireframe. Sono disponibili otto forme: cubo, ottaedro, tetraedro, diamante, icosaedro, cubottaedro, prisma esagonale e gemma pentagonale.

| Chiave | Azione |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Aumentare / diminuire la velocità di rotazione (`1`–`16`) |
| `1`-`8` | Seleziona una forma direttamente |
| `*` | Selezionare la forma successiva |
| `F` | Alterna tra rendering wireframe e pieno |
| `M` | Pausa o curriculum |
| `EXIT` | Esci dall'applicazione |

## Plasma

`Plasma` visualizza modelli animati in stile demoscene con bande o rendering stippled.

| Chiave | Azione |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Aumentare / diminuire la velocità di animazione (`1`–`8`) |
| `1`-`5` | Selezionare un modello e disattivare il ciclismo automatico |
| `*` | Alterna tra rendering a bande e puntinato |
| `F` | Abilitare o disattivare il ciclo automatico |
| `M` | Pausa o curriculum |
| `EXIT` | Esci dall'applicazione |

## Snake

`Snake` è un classico gioco in stile Nokia giocato su una griglia `31 × 13`. Mangia il cibo per coltivare il serpente e segnare punti `10`. Colpire il confine o il corpo del serpente finisce il gioco. Il miglior punteggio viene salvato tra i lanci.

| Chiave | Azione |
| --- | --- |
| `2` o `3` | Muovetevi |
| `4` o `5` | Muoversi a sinistra |
| `6` o `0` | Muoversi a destra |
| `8` o `9` | Muoversi! |
| `F` | Pausa o curriculum |
| `M`, `*`, o `0` dopo il gioco sopra | Iniziare un nuovo gioco |
| `EXIT` | Esci dall'applicazione |

Tenere una chiave di direzione lo ripete. L'applicazione rifiuta un'inversione immediata nel corpo del serpente. Se il salvatore di schermo si attiva durante un gioco, Snake si ferma e riprende dopo il risveglio.

## Rapid Roll

`Rapid Roll` è un gioco a piattaforme in cui le piattaforme salgono verso un soffitto irto di spuntoni. Sposta la pallina lateralmente e falla scendere da una piattaforma sicura alla successiva. Le piattaforme con spuntoni, il soffitto e il fondo dello schermo costano una vita; dal livello 3 iniziano ad apparire piattaforme che si sgretolano. I cuori assegnano `50` punti e restituiscono una vita, fino a un massimo di cinque.

| Chiave | Azione |
| --- | --- |
| `4` o `UP/LEFT` | Rotola a sinistra |
| `6` o `DOWN/RIGHT` | Rotola a destra |
| `F` | Metti in pausa o riprendi |
| `M` dopo la fine della partita | Inizia una nuova partita |
| `EXIT` | Esci dall'applicazione |

Il gioco inizia con tre vite e accelera con l'aumentare del livello. Le piattaforme sicure si restringono ai livelli più alti. I progressi non vengono conservati dopo l'uscita dall'applicazione. Se il salvaschermo si attiva durante una partita, Rapid Roll si mette in pausa e riprende al risveglio.

## Space Impact

`Space Impact` è uno sparatutto spaziale a scorrimento laterale. L'astronave usa automaticamente l'arma principale, lasciando i comandi liberi per il movimento verticale. Le ondate di nemici seguono diversi schemi di movimento e attacco; alla fine di ogni livello compare un boss con una barra della salute visibile.

| Chiave | Azione |
| --- | --- |
| `2` o `UP/LEFT` | Sposta l'astronave verso l'alto |
| `8` o `DOWN/RIGHT` | Sposta l'astronave verso il basso |
| `5` o `M` | Lancia un missile perforante |
| `F` | Metti in pausa o riprendi |
| `M` dopo la fine della partita | Inizia una nuova partita |
| `EXIT` | Esci dall'applicazione |

Il gioco inizia con tre vite e tre missili. L'arma principale spara automaticamente. Ogni 16 nemici eliminati si ottiene un altro missile, fino a un massimo di nove. Sconfiggere un boss assegna una vita extra e un missile se si è al di sotto dei rispettivi limiti. I progressi non vengono conservati dopo l'uscita dall'applicazione. Se il salvaschermo si attiva durante una partita, Space Impact si mette in pausa e riprende al risveglio.

## Pagine correlate

* [Overlay app](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [ Funzioni pulsanti](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [FM radiodiffusione](./FM-broadcast-radio-receiver)
