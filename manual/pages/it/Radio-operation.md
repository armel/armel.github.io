# Operazione radio

Questa pagina copre il funzionamento quotidiano del ricetrasmettitore: passaggio tra VFO e modalità di memoria, lettura della barra di stato, comprensione delle restrizioni TX e gestione del comportamento del sonno.

Per le funzioni relative alla scansione, vedere [Scansione](./Scanning). Per la visualizzazione e la manutenzione dal vivo, vedere [UV Studio](./UV-Studio). Per la copia radio-radio, vedere [AirCopy](./AirCopy). Per RescueOps, Resume Mode, il gioco integrato, e la procedura di sblocco TX orientata alla ricerca, vedere [Attrezzature avanzate](./Advanced-features).

> [!WARNING]
> Non utilizzare Quansheng CPS. Sovrascrive le impostazioni personalizzate.

## In questa pagina

* [Operazione fisica e configurazione](#basic-operation--configuration)
* [Status bar](#status-bar)
* [Espositore da banco, tipo e calibrazione](#battery-display-type-and-calibration)
* [Sui menu `F Lock` e `TXLock`](#about-the-f-lock-and-txlock-menus)
* [Salvaschermo e timeout della retroilluminazione](#screen-saver-and-backlight-timeout)
* [Sui menu SetOff](#about-the-setoff-menu)
* [1750 Hz tono scoppio per accesso ripetitore](#1750-hz-tone-burst-for-repeater-access)
* [Pagine correlate](#related-pages)

> [!TIP]
> Controllo rapido comune:
> - Impostazioni personalizzate Quansheng CPS
> - la frequenza è al di fuori del piano `F Lock` selezionato
> - `TXLock` è ancora `ON`
> - `AM` o `USB` è selezionato invece di `FM`
>
> Vedere [Risoluzione dei problemi](./Troubleshooting) per la versione breve.

## Funzionamento di base e configurazione

Il display radio è diviso in un VFO superiore e un VFO inferiore. È possibile modificare la selezione superiore/basso premendo `F` + `2 A/B` (o premendo `2 A/B` a lunga pressione).

Ogni VFO può operare in modo indipendente in modalità frequenza o canale. Per cambiare le modalità, selezionare VFO desiderato e premere `F` + `3 VFO/MR` (o lunga pressione `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

In `frequency mode`, inserisci manualmente la frequenza con la tastiera. Puoi anche modificare diverse opzioni per quella VFO nel menu (le prime 13 voci del menu). Una volta impostata la VFO, le impostazioni possono essere salvate su un canale di memoria entrando nel menu `ChSave` e scegliendo il canale di memoria di destinazione.

In `channel mode`, è possibile passare tra i canali di memoria salvati. I canali di memoria possono essere aggiunti manualmente come detto sopra o programmati da un computer con il driver `CHIRP` fornito con ogni rilascio del firmware. Vedere [Programmazione con CHIRP](./Programming-with-CHIRP) per il flusso di lavoro dedicato F4HWN.

Per la scansione di frequenza, la scansione di memoria, `ScnRng` e DCS / CTCSS scansione, vedere [Scansione](./Scanning).

## Barra di stato

Nella parte superiore dello schermo, sulla prima riga, è la barra di stato. Visualizza un sacco di informazioni. Ecco alcuni esempi:

| Schermata&nbsp;del&nbsp;Quansheng&nbsp;K5&nbsp;con&nbsp;firmware&nbsp;F4HWN | Descrizione |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR significa che RxMode è impostato su DUAL RX RESPOND, OP significa che PTT è impostato su ONEPUSH, l'icona F significa che la chiave `F` è stata premuto e si vede la tensione della batteria. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS significa che Power Save è attivato, DW significa che RxMode è impostato su MAIN TX / DUAL RX, VX significa che VOX è attivato, CL significa che PTT è impostato su CLASSIC, l'icona di blocco significa che la tastiera è bloccata e si vede la tensione della batteria. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS significa che Power Save è attivato, MO significa che RxMode è impostato su MAIN ONLY, OP significa che PTT è impostato su ONEPUSH, e si vede la percentuale della batteria. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO significa che RxMode è impostato su MAIN ONLY, OP significa che PTT è impostato su ONEPUSH, l'icona Light significa che viene attivato il controllo manuale della retroilluminazione e si vede la percentuale della batteria. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | Il timer RX a sinistra indica quanto tempo è stato da quando hai ricevuto un segnale, OP significa che PTT è impostato su ONEPUSH, l'icona Light significa che il controllo manuale della retroilluminazione è attivato e si vede la percentuale della batteria. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | Il piccolo `PMR` nel video inverso e `><` significa che si sta attualmente verificando l'elenco `PMR`, CL significa che PTT è impostato su CLASSIC, l'icona Light significa che il controllo manuale della retroilluminazione è attivato, e si vede la percentuale della batteria. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | L'icona `ALL` e `><` significa che stai controllando tutti i canali elencati, OP significa che PTT è impostato su ONEPUSH, l'icona Light significa che il controllo manuale della retroilluminazione è attivato e si vede la percentuale della batteria. |

> [!NOTE]
> Circa `RxMode`, `MO` significa MAIN ONLY, `DW` significa MAIN TX / DUAL RX, `DWR` significa DUAL RX RESPOND e `XB` significa CROSS BAND.

## Visualizzazione della batteria, tipo e calibrazione

Il firmware separa tre diverse cose relative alla batteria:

* la tensione della batteria misurata
* la percentuale stimata della batteria
* il sonno / comportamento di risparmio energetico

Per informazioni sulla batteria sullo schermo:

* `BatTxt` aggiunge `VOLTAGE` o `PERCENT` alla barra di stato, o lo nasconde con `NONE`
* `SysInf` mostra la tensione della batteria corretta, la percentuale della batteria stimata e la versione firmware

Per la percentuale della batteria per avere senso, due oggetti nascosti-menu materia:

* `BatCal` calibra la tensione della batteria visualizzata
* `BatTyp` seleziona la curva di scarico utilizzata per la stima della percentuale della batteria

Importante differenza:

* `BatCal` cambia la lettura della tensione
* `BatTyp` cambia il calcolo `%`, non la tensione misurata stessa

Le attuali scelte `BatTyp` sono:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Come con qualsiasi stima basata sulla tensione, la percentuale della batteria è solo approssimativa. Dipende dal profilo della batteria selezionato, dalla condizione della batteria e dal carico corrente.

### Calibrare la tensione della batteria con un multimetro

1. Assicurarsi che la radio non stia caricando tramite `USB-C`.
1. Lasciate che la radio rimanga inattivo per un momento. Non calibrare durante la trasmissione.
1. Misurare la tensione della batteria con un multimetro sui contatti della batteria sul retro del pacchetto radio / batteria.
1. Aprire il menu nascosto e andare a `BatCal`.
1. Regolare `BatCal` fino a quando la tensione mostrata dalla radio corrisponde al più vicino possibile al multimetro.
1. Confermare con `M`.

> [!TIP]
> Se la tensione è corretta, ma la percentuale si sente ancora sbagliata, `BatCal` è probabilmente fine e `BatTyp` è l'impostazione da rivedere.

## Informazioni sui menu `F Lock` e `TXLock`

In passato, ci sono stati alcuni piani di banda nel menu `F Lock` per soddisfare varie richieste: PMR 446, FRS/GMRS/MURS, ecc. Tuttavia, l'aggiunta di nuove opzioni `F Lock` ha sempre preso un sacco di memoria: nuove opzioni nel menu `F Lock`, memorizzando le frequenze (per gli specialisti, questi sono `uint32_t` ogni volta, quindi sono molto che consumano la memoria), ecc.

Ora, deve essere riconosciuto che è stato complicato, se non impossibile, offrire piani di band che potrebbero coprire e soddisfare tutte le aspettative. Ci sono troppe variazioni da un paese all'altro. Inoltre, nulla è previsto per combinare più piani di frequenza dal menu `F Lock`. Ad esempio, aprendo entrambe le band PMR 446 e LPD. In sintesi, `F Lock` è troppo limitato e non scalabile.

Ecco la soluzione:

1. Selezionare il piano di banda più adatto dal menu `F Lock`. Ad esempio, se hai un callsign e vivi in Europa, seleziona CE HAM. Se non hai un segnale di chiamata e sei solo un SWL, seleziona DISABLE ALL, che è più sicuro.
1. Se vuoi ancora trasmettere su un canale di memoria che non è aperto dal piano della band, vai al menu `TXLock` e scegli `OFF`. Questo crea un'eccezione e permette la trasmissione su quel canale.

In poche parole:

* se la frequenza è all'interno del piano della banda selezionato in `F Lock`, è possibile trasmettere
* se la frequenza è al di fuori del piano della banda selezionato in `F Lock`:
  * si può trasmettere solo se `TXLock` è `OFF`
  * non si può trasmettere se `TXLock` è `ON`

Se un canale di memoria o VFO è fuori dal piano di banda selezionato e `TXLock` è `ON`, ci sarà un piccolo lucchetto a sinistra del nome.

Per la procedura `UNLOCK ALL` orientata alla ricerca, vedere [Le caratteristiche avanzate](./Advanced-features#tx-on-all-bands).

## Risparmio schermo e timeout di retroilluminazione

Costruisce con il supporto screen-saver aggiungere il menu `SetSav`.

`SetSav` funziona insieme a `BLTime`: quando la radio è inattivo e il timeout di retroilluminazione scade, il salvatore di schermo può sostituire lo schermo normale invece di lasciare semplicemente il display invariato.

Le modalità disponibili sono:

* `OFF`: nessun salvaschermo
* `LOGO`: mostrare il logo di avvio personalizzato come schermo inattivo
* `LOGO+`: mostrare il logo di avvio personalizzato con un effetto di scorrimento
* `MATRIX`: mostrare uno schermo animato in stile matrice

Le modalità logo utilizzano lo stesso logo `128x64` caricato con [UV Studio](./UV-Studio#boot-logo).

Il salvatore dello schermo è intenzionalmente sospeso durante il lavoro radio attivo: RX, TX, PTT, BEAM e scansione FM attiva. Può visualizzare sulla schermata radio principale e la schermata di trasmissione FM quando la radio è inattivo. Premere una chiave sveglia la schermata normale.

Se `BLTime` è impostato su un valore di stile sempre-off o sempre-on invece di una durata tempestiva, `SetSav` non assume il controllo del display.

## Informazioni sul menu SetOff

Il menu `SetOff` consente di configurare un timeout prima che la radio entri in modalità sonno. Questo ritardo può essere impostato tra 1 minuto e 2 ore. Se `SetOff` è `OFF`, la modalità di sonno è disattivata.

Ad esempio, se si imposta il ritardo a 5 minuti e durante questo tempo c'è:

* nessun ricevimento
* nessuna trasmissione
* nessun pulsante premere

poi la tua radio entrerà automaticamente in modalità sonno. Sarete avvisati 10 secondi prima con una schermata di lampeggiamento.

Si noti che la modalità di sonno sarà attivata anche se si sta verificando, finché non si verifica una ricezione.

FoxHunt e Beacon sono eccezioni deliberate: mentre o applicazione è attiva, la radio ignora `SetOff` fino a quando non si lascia esplicitamente. Il normale timeout di retroilluminazione funziona ancora. Vedere [FoxHunt](./Fox-Hunt) e [Beacon](./Beacon).

Una volta in modalità sonno:

* lo schermo è completamente spento
* il rosso LED alla base dell'antenna lampeggia
* il modulo BK4819 entra in modalità sonno profondo e si sveglia periodicamente ogni:
  * 2 secondi se `BatSav` è impostato su `1:1`
  * 4 secondi se `BatSav` è impostato su `1:2`
  * 6 secondi se `BatSav` è impostato su `1:3`
  * 8 secondi se `BatSav` è impostato su `1:4`
  * 10 secondi se `BatSav` è impostato su `1:5`

Per uscire dalla modalità sonno, è sufficiente:

* ricevere un segnale durante la fase di sveglia periodica BK4819
* avviare una trasmissione premendo il tasto PTT
* o premere qualsiasi altro pulsante

Come esempio, ho testato la modalità del sonno su due radio K5(8) con batterie calibrate e completamente caricate, utilizzando le stesse impostazioni, frequenze, modalità (`DWR`), e `BatSav` impostato su `1:5`. L'unica differenza era che una radio aveva la modalità di sonno abilitato mentre l'altra non lo ha fatto. Dopo 36 ore di funzionamento, la radio senza modalità di sonno aveva solo il 20% di batteria rimanente, mentre quella con modalità di sonno aveva ancora il 60% di batteria.

## 1750 Hz tono scoppio per accesso ripetitore

Quando viene premuto `PTT`, il tono 1750 Hz può essere attivato premendo [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Pagine correlate

* [Per iniziare](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programmazione con CHIRP](./Programming-with-CHIRP)
* [Scansione](./Scanning)
* [Menu](./Menu)
* [ Funzioni pulsanti](./Button-functions)
* [Caratteristiche avanzate](./Advanced-features)
* [Risoluzione dei problemi](./Troubleshooting)
