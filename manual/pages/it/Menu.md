# Funzionamento del menu

Il menu è accessibile con il tasto `M`  (short press) .

> [!NOTE]
> La navigazione utilizza `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1. Il layout attivo segue l'opzione nascosta-menu `SetNav`.

Introdotto in Fusion `v5.9.0`, il browser di categoria viene utilizzato in tutte le edizioni ufficiali `v6.0.0` e `v6.1.0`. Seleziona una categoria con `UP` / `DOWN`, quindi premi `M` per aprire la lista dei prodotti. L'elemento selezionato viene visualizzato sul lato sinistro dello schermo e il suo valore attuale viene visualizzato a destra.

Per trovare una voce di menu, sfogliare la sua categoria o selezionare `All` per utilizzare il menu piatto originale. È inoltre possibile inserire il numero **global menu voce** dalla schermata di categoria; per esempio, inserire `52` per accedere a `SysInf`. Interruttori di ingresso numeri diretti a `All`. Fusion `v5.9.0` utilizza `01` a `77`; Multiboot-capable `v6.0.0` aggiunge `SetCfg` e estende l'elenco completo a `78`.

Una volta evidenziata la voce del menu desiderata, premendo il tasto `M` entra nella voce del menu.

Una volta selezionata la voce del menu, premendo i tasti freccia `UP` e `DOWN` regola l'impostazione per quella voce. Per confermare la selezione, premere il tasto `M`. Per annullare la selezione, premere `EXIT`.

Da un elenco degli articoli, premere `EXIT` per tornare al browser di categoria. Premere nuovamente `EXIT` per lasciare il menu e tornare alla schermata radio.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Browser dei menu per categorie

La schermata di categoria Fusion mostra la precedente, attuale e prossima categoria a sinistra. Il lato destro mostra quanti elementi contiene la categoria evidenziata.

| Categoria | Articoli Fusion | Contenuto |
| --- | ---: | --- |
| `Channels` | 21 in v6 | passo di frequenza, potenza, toni, offset, larghezza di banda, canali e impostazioni di memoria, più `SetCfg` |
| `Scan` | 6 | elenco di scansione, canali prioritari, modalità di ripresa e motore di scansione |
| `Keys` | 10 | scorciatoie programmabili, blocco tastiera, modalità PTT e canale di chiamata |
| `Power` | 4 | salvabatteria/display, timeout inattività e salvaschermo |
| `Display` | 11 | visualizzazione canale, schermata di avvio, retroilluminazione e impostazioni UI |
| `Timers` | 4 | Impostazioni timeout TX, EOT e RX/TX |
| `Audio` | 5 | microfono, tastiera beep, volume e profili audio RX |
| `Radio` | 6 | squelch, STE, roger beep, VOX e RX |
| `DTMF` | 5 | codici up/down, tono laterale, precarico e decoder live |
| `Service` | 6 | menu di avvio nascosti; solo visibile dopo il gesto di avvio nascosto-menu |
| `All` | 72 normalmente in v6, 78 con Servizio | originale ordine flat-menu e numerazione globale |

Il contatore dell'elemento all'interno di una categoria filtrata è locale a quella categoria. Utilizzare `All`, o inserire un numero dalla schermata di categoria, quando si desidera che i numeri globali elencati di seguito.

Il firmware ricorda l'ultima categoria selezionata e l'ultimo elemento evidenziato in ogni categoria per la sessione corrente. Queste posizioni di navigazione non vengono salvate attraverso un riavvio.

## Consigli rapidi

* in `All`, i primi 13 elementi sono le principali impostazioni live VFO/channel
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` e `ScnRev` sono gli elementi chiave relativi alla scansione
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` e controllo `M Long`
* il menu nascosto è disponibile solo all'avvio con `PTT` + `SIDE BUTTON 1️⃣`

## Menu principale

Il numero di fronte a ogni descrizione della voce del menu è il numero di voce ** menu ** che può essere utilizzato per la selezione rapida.
1. `Step` - passo della frequenza (in kHz), i pulsanti `UP` e `DOWN` cambiano la frequenza da questo valore, inoltre è possibile impostare solo una frequenza che è multiplo della metà di questo valore.
1. `Power` - potenza di uscita radio (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH / USER). Si noti che la potenza USER può essere sintonizzata tramite il menu `SetPower`.
1. `RxDCS` - ricevitore Digital-Coded Squelch. Se si attiva questo, squelch si sblocca solo se questo codice viene ricevuto. È possibile avviare una scansione DCS/CTCSS mentre si è in questo menu opzione premendo il tasto `* SCAN`.
1. `RxCTCS` - ricevitore Sistema di Squelch continuo a coppia. Squelch si sblocca solo se questo codice viene ricevuto. È possibile avviare una scansione DCS/CTCSS mentre si è in questo menu opzione premendo il tasto `* SCAN`.
1. `TxDCS` - trasmettitore Digital-Coded Squelch, la radio invierà il codice dato durante la trasmissione
1. `TxCTCS` - trasmettitore Continuous Tone-Coded Squelch System, la radio invierà il codice dato durante la trasmissione

   Nel submenus `RxDCS`, `TxDCS`, `RxCTCS` e `TxCTCS`, il badge in alto a destra mostra l'ingresso selezionato e il suo indice omologato:

   * per CTCSS: `NN/HH`, dove `NN` è la posizione nella lista completa di 50 toni e `HH` è il numero di tono omologato. `--` significa che il tono selezionato è uno dei toni extra non omologati.
   * per DCS: `NNN/HH`, dove `NNN` è la posizione nella lista completa DCS e `HH` è il numero DCS omologato. `--` significa che la voce DCS selezionata non è nell'elenco omologato PMR446.
   * `OFF` viene visualizzato come `00/00` per CTCSS e `000/00` per DCS.
   * I valori DCS che terminano in `N` sono codici normali; i valori che terminano in `I` sono codici invertiti. Le voci DCS invertite sono mostrate nella lista completa, ma non ricevono un indice omologato e quindi mostrano `--`.

1. `TxODir` - direzione di offset della frequenza del trasmettitore
1. `TxOffs` - valore di offset della frequenza del trasmettitore
1. `W/N` - larghezza di banda utilizzata da transceiver
   * WIDE - `25 kHz`
   * NARROW - `12.5 kHz`
1. `BusyCL` - canale occupato lockout, blocca la radio da trasmettere quando il segnale viene ricevuto
1. `Compnd` - compander (compressore / espanditore), consente di trasmettere segnali con una vasta gamma dinamica su strutture che hanno una minore capacità di gamma dinamica, migliora la qualità audio, entrambe le radio dovrebbero usare questa opzione
1. `Mode` - modalità di demodulazione, predefinito è FM, AM / USB può essere utilizzato solo per l'ascolto
1. `TXLock` - abilitare o disabilitare la modalità di trasmissione del canale (se non è coperto dal piano `F Lock`)
1. `ChList` - selezionare l'elenco di scansione del canale di memoria
1. `ChSave` - salvare l'impostazione corrente a un canale di memoria
1. `ChDele` - cancellare il canale di memoria
1. `ChName` - modifica il nome del canale di memoria
   * Utilizzare i pulsanti `UP` e `DOWN` per selezionare un canale per modificare
   * Premere nuovamente il tasto `M` per inserire la modalità nome modifica
   * Utilizzare i tasti numerici in modalità multi-tap per modificare il carattere corrente, come su vecchi telefoni cellulari
     * premere nuovamente la stessa chiave per ciclo attraverso le lettere e il numero ad esso assegnato (`2` = `a`, `b`, `c`, `2`, ecc.)
     * premere un tasto numero per inserire il numero corrispondente direttamente
     * premere brevemente `F` per passare tra minuscolo e maiuscolo (`abc` / `ABC`)
     * lunga pressione `F` per entrare `#`
     * premere brevemente `* SCAN` per inserire `-`, oppure tenerlo premuto per inserire `*`
     * premere brevemente `0` per inserire uno spazio, quindi premerlo di nuovo per inserire `0`
   * È ancora possibile utilizzare i pulsanti `UP` e `DOWN` per ciclizzare manualmente i caratteri disponibili
   * Premere il tasto `M` per passare alla successiva posizione del personaggio
   * Ripetere sopra due passi fino alla fine
   * Quando "Sure?" si apre, premere il tasto `M` per salvare, o uscire per annullare
   * premere brevemente `EXIT` per tornare indietro di un carattere; dalla prima posizione si esce dalla modifica del nome
   * Premere `EXIT` per cancellare la modifica e tornare al menu principale.
1. `ScList` - seleziona l'elenco di scansione utilizzato per la scansione del canale: `01` a `24`, `ALL` e, a partire da `v6.1.0`, `MIX`.
   * `MIX` combina una selezione salvata di elenchi numerati senza cambiare l'elenco assegnato a ciascun canale.
   * Selezionare `MIX` e premere `M` per aprire il suo editor.
   * Utilizzare i tasti di navigazione o inserire `01` a `24` per selezionare un elenco, quindi premere `M` per attivarlo.
   * Premere `EXIT` per salvare. Almeno un elenco deve rimanere selezionato.
   * Vedere [MIX scan list](./Scanning#mix-scan-list-v610) per il comportamento completo.
1. `ScPri` - consente/disattiva il supporto dei canali prioritari durante la scansione.
1. `PriCh1` - imposta il canale prioritario 1️⃣
1. `PriCh2` - imposta il canale di priorità 2️⃣
1. `ScnRev` - modalità di scansione
   * CARRIER - dopo la scomparsa del segnale, pausa per [250 millisecondi a 20 secondi] prima di riprendere la scansione
   * STOP - dopo aver ricevuto un segnale, interrompere la scansione
   * TIMEOUT - ripresa della scansione dopo [5 secondi a 2 minuti] pausa
1. `F1Shrt` - Funzione di pressa corta `SIDE BUTTON 1️⃣`
1. `F1Long` - Funzione di pressa lunga `SIDE BUTTON 1️⃣`
1. `F2Shrt` - Funzione di pressa corta `SIDE BUTTON 2️⃣`
1. `F2Long` - Funzione di pressa lunga `SIDE BUTTON 2️⃣`
1. `M Long` - Funzione di pressa lunga del pulsante `M`
1. `KeyLck` - opzione di blocco della tastiera automatica (OFF o 15 secondi a 10 minuti prima del blocco automatico della tastiera)
1. `TxTOut` - limite massimo di tempo di trasmissione
1. `BatSav` - opzione di salvataggio della batteria, una velocità tra tempo attivo e tempo di sonno (OFF, 1:1 a 1:5)
1. `BatTxt` - valore aggiuntivo della batteria sulla barra di stato (`NONE`, `VOLTAGE`, o `PERCENT`)
1. `Mic` - sensibilità microfono
1. `MicBar` - microfono bar che appare durante la trasmissione 
1. `ChDisp` - stile di visualizzazione del canale
1. `POnMsg` - modalità di visualizzazione di avvio
   * `ALL`: mostrare il messaggio di benvenuto configurato, la tensione e le informazioni firmware/versione
   * `SOUND`: mantenere il normale comportamento del suono di avvio senza schermata di benvenuto
   * `MESSAGE`: mostrare il messaggio di benvenuto configurato solo
   * `VOLTAGE`: mostrare la tensione della batteria e la percentuale stimata
   * `LOGO`: mostrare il logo di avvio 128x64 personalizzato caricato con [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: saltare il display di avvio
1. `BLTime` - durata della retroilluminazione
1. `BLMin` - luminosità minima della retroilluminazione, quando il retroilluminazione dello schermo gira OFF andrà dim a questo valore
1. `BLMax` - luminosità massima del retroilluminazione, quando il retroilluminazione dello schermo gira ON si accenderà a questo valore
1. `BLTxRx` - attivazione retroilluminazione su TX o RX
1. `Beep` - tastiera pressa suono segnale acustico
1. `Roger` - beep roger alla fine della trasmissione
1. `STE` - eliminatore di coda di squelch, elimina il rumore alla fine di una trasmissione
1. `RP STE` - ripetitore squelch coda eliminatore
1. `1 Call` - un-chiave canale di chiamata; consente di passare rapidamente a quel canale con il tasto `9 Call`
1. `UPCode` - Codice DTMF che viene inviato all'inizio della trasmissione
1. `DWCode` - Codice DTMF che viene inviato alla fine di una trasmissione
1. `PTT ID` - imposta se `UPCode` e/o `DWCode` devono essere trasmessi
1. `D ST` - Interruttore laterale DTMF; consente di ascoltare i toni trasmessi attraverso l'altoparlante radio
1. `D Prel` - DTMF tempo di precarico
1. `D Live` - visualizza i codici DTMF ricevuti dalla radio nel mezzo dello schermo
1. `VOX` - livello di sensibilità TX attivato dalla voce
1. `SysInf` - informazioni di sistema. Nell'attuale F4HWN costruisce questo articolo è impaginato: inseriscilo con `M`, quindi usa `UP` / `DOWN` per spostarsi tra le pagine.
   * identità: firmware autore, versione ed edizione
   * `BUILD`: data di costruzione, tempo di costruzione e identificatore di commit
   * `BATTERY`: tensione della batteria misurata, percentuale della batteria stimata e tipo/profilo della batteria selezionato
   * `MEMORY`: utilizzo FLASH e SRAM, quando la pagina di memoria è abilitata nella costruzione
   * `CODE` / `WIKI`: codici QR per link di progetto, quando le pagine di QR-code sono abilitate nella costruzione
1. `RxMode` - imposta come viene utilizzata la frequenza superiore e inferiore
   * MAIN ONLY - trasmette e ascolta sempre sulla frequenza principale (`MO`)
   * DUAL RX RESPOND - ascolta entrambe le frequenze, se il segnale viene ricevuto sulla frequenza secondaria si blocca per un paio di secondi in modo da poter rispondere alla chiamata (`DWR`)
   * CROSS BAND - trasmette sempre sul primario e ascolta la frequenza secondaria (`XB`)
   * MAIN TX DUAL RX - trasmette sempre sul primario, ascolta entrambi (`DW`)
1. `Sql` - livello di sensibilità squelch
1. `SetPwr` - set USER Power
   * LOW 1 (± ~20 mW)
   * LOW 2 (~125 mW)
   * LOW 3 (~250 mW)
   * LOW 4 (~500 mW, limite superiore sotto la banda PMR...)
   * LOW 5 (~1 W)
   * MID (~2 W)
   * HIGH (~5 W)
1. `SetPTT` - imposta l'uso PTT
   * CLASSIC
   * ONEPUSH
1. `SetTOT` - set allarme TOT
   * OFF
   * SOUND
   * VISUAL
   * ALL ( VISUAL + SOUND )
1. `SetEOT` - imposta EOT alert (utile per pause tra 2 trasmissioni)
   * OFF
   * SOUND
   * VISUAL
   * ALL ( VISUAL + SOUND )
1. `SetCtr` - set LCD contrasto
1. `SetInv` - set LCD invertito (migliore per la visione notturna)
1. `SetLck` - seleziona ciò che è disabilitato mentre la serratura della tastiera è attiva
   * `KEYS`: blocca il tastierino anteriore; le azioni di scelta rapida programmabili e `PTT` rimangono disponibili
   * `KEYS + ACTIONS`: blocca anche le azioni programmabili assegnate ai due pulsanti laterali e `M Long`; `PTT` rimane disponibile
   * `KEYS + PTT`: anche bloccare `PTT` per prevenire la trasmissione accidentale; le azioni di collegamento programmabile rimangono disponibili
   * `KEYS + ACTIONS + PTT`: bloccare il tastierino anteriore, azioni di scelta rapida programmabili e `PTT`

   In ogni modalità, tenere premuto `F #` per sbloccare la radio. Per maggiori dettagli, vedere [Funzioni dei pulsanti](./Button-functions#keypad-lock-and-setlck).
1. `SetMet` - set S-Meter design
   * CLASSIC
   * TINY (come su Yaesu FT4 o FT-65, per esempio)
1. `SetGUI` - set GUI design
   * CLASSIC (carattere più grande, meno informazioni mostrate)
   * TINY (carattere più piccolo, maggiori informazioni visualizzate)
1. `SetRxA` – imposta il profilo audio RX per la modulazione corrente

   Profili `FM`:

   - `FLAT`: guadagno di uscita più basso (BK4829-safe). Più neutrale, meglio per ambienti tranquilli.
   - `CLEAN`: Profilo bilanciato predefinito. Audio confortevole con guadagno moderato.
   - `MID`: Maggiore guadagno di CLEAN senza l'aggressività di BOOST.
   - `BOOST`: Profilo vocale per segnali deboli / ambienti rumorosi. Maggiore guadagno, più "presente" audio.
   - `MAX`: Massimo guadagno di uscita (può falsare su segnali forti o piccoli altoparlanti). Ideale per un altoparlante esterno.

   Profili `AM`:

   - `SHARP`: filtro Narrow IF con guadagno basso. Più selettivo, con un migliore rifiuto del canale adiacente. Può sembrare più duro o un po' distorto su segnali forti, ma rimane chiaro.
   - `STOCK`: Intenso a rimanere il più vicino possibile al comportamento del firmware stock.
   - `OPEN`: Wider IF filtro con maggiore guadagno. Più aperto e piacevole su segnali deboli, ma alcuni ricevimenti possono suonare un po 'muffled, soprattutto ATC.
1. `SetTmr` - imposta se vengono visualizzati i timer RX e TX
1. `SetOff` - imposta il ritardo prima che il ricetrasmettitore entri nel sonno profondo (OFF o 1 minuto a 2 ore)
1. `SetNFM` - imposta Narrow FM a Narrow o Narrower
1. `SetVol` - imposta il guadagno del volume audio all'output dell'altoparlante fine
1. `SetKey` - imposta la chiave per attivare la modalità RescueOps all'avvio del ricetrasmettitore
1. `SetScn` - imposta la modalità del motore [scan](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL`: utilizza il percorso di scansione standard.
   * `FAST`: utilizza il nuovo percorso di scansione veloce. Il firmware pre-controlla diverse frequenze/canale con RSSI prima di eseguire l'installazione completa di ricezione, salta i lotti silenziosi più velocemente, affina i candidati vicini su passaggi fini, e utilizza un piccolo watchdog per riprendere se il loop di scansione stalli.
1. `SetSav` - imposta il [screen saver](./Radio-operation#screen-saver-and-backlight-timeout) utilizzato dopo il timeout di retroilluminazione, quando abilitato nella costruzione.
   * `OFF`: nessun salvaschermo
   * `LOGO`: mostrare il logo di avvio personalizzato come schermo inattivo
   * `LOGO+`: mostrare il logo di avvio personalizzato con un effetto di scorrimento
   * `MATRIX`: mostrare uno schermo animato in stile matrice

   `SetSav` è attiva solo quando `BLTime` utilizza una durata di retroilluminazione temporale. È sospeso durante la scansione RX, TX, PTT, BEAM e FM attiva.
1. `SetCfg` - seleziona la banca di configurazione utilizzata dal firmware in esecuzione nelle build Multiboot-capable `v6.0.0`.
   * `CFG M`: banca di configurazione principale
   * `CFG 1` a `CFG 4`: banche di configurazione associate a slot firmware da 1 a 4

   Premere `M` due volte per confermare una banca diversa. La radio si riavvia quindi la banca viene mappata prima che vengano caricati canali o impostazioni. Lo slot del firmware non cambia. Confermare la banca già in uso è un no-op. Vedere [Multiboot e Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Menu nascosto

Il menu nascosto viene attivato tenendo `PTT` + `SIDE BUTTON 1️⃣` mentre si accende la radio, quindi rilasciando tutte le chiavi.

73. `F Lock` - imposta il piano della banda di frequenza TX.
    * DEFAULT+ (137-174, 400-470) - consente TX su bande di default, più opzioni `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * DISABLE ALL - disabilita TX su tutte le frequenze
    * UNLOCK ALL - consente TX su tutte le bande. Ha una serratura aggiuntiva; vedi [come accendere](./Advanced-features#tx-on-all-bands).
74. `350 En` - consente RX su `350 MHz`
75. `BatCal` - taratura della tensione della batteria. Confrontare la tensione visualizzata con un multimetro e regolare fino a quando non si abbinano il più vicino possibile
76. `BatTyp` - tipo di batteria / curva di scarico utilizzata per il calcolo della percentuale della batteria. Colpisce `%`, non la tensione misurata stessa
77. `SetNav` - configura il tipo di navigazione (UP/DOWN per UV-K5, LEFT/RIGHT per UV-K1)
78. `Reset` - ripristina le impostazioni di configurazione radio
   * VFO - rimuove solo le impostazioni del canale
   * ALL - resetta tutte le impostazioni (canale e radio)

Nella schermata di menu classificata, queste sei voci appaiono nella categoria `Service`. Essi sono anche aggiunti a `All`, dove un multiboot-capable `v6.0.0` build funziona attraverso `78/78`. Su `v5.9.0`, che non ha `SetCfg`, le voci nascoste conservano i numeri `72` a `77`.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [UV Studio](./UV-Studio)
* [Operazione radio](./Radio-operation)
* [Scansione](./Scanning)
* [ Funzioni pulsanti](./Button-functions)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Caratteristiche avanzate](./Advanced-features)
* [Risoluzione dei problemi](./Troubleshooting)
