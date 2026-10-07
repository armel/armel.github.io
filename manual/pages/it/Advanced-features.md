# Caratteristiche avanzate

Questa pagina copre caratteristiche specializzate o opzionali che non sono necessarie per il funzionamento radio di base: BEAM, RF log, RescueOps, UV Studio, Resume Mode, il gioco integrato e la procedura di sblocco TX orientata alla ricerca. AirCopy, FoxHunt, Beacon, Multiboot e applicazioni overlay hanno le proprie pagine dettagliate.

Per l'uso radio giornaliero, vedere [Operazione radio](./Radio-operation). Per le funzioni relative alla scansione, vedere [Scansione](./Scanning).

> [!NOTE]
> Se questa pagina menziona `UP` / `DOWN`, utilizzare i tasti `LEFT` / `RIGHT` equivalenti su UV-K1. Il layout di navigazione attivo segue `SetNav`.

## AirCopy

AirCopy trasferisce banche di memoria e impostazioni tra le radio compatibili. `v6.0.0` ha aggiunto blocchi riconosciuti, retries, gestione duplicata e `All (Mem+Set)`. `v6.1.0` aggiunge cornici multiblocco, confronto e skipping di blocchi identici, trasporto via cavo e clonazione esterna-Flash protetta nell'edizione Transfer.

Vedere [AirCopy](./AirCopy) per la disponibilità, i controlli, la compatibilità del protocollo, i trasferimenti radio, `CABLE COPY` e `Flash 2M` informazioni di sicurezza.

## Multiboot, Multiconfig e applicazioni overlay

`v6.0.0` aggiunge due piattaforme più grandi documentate separatamente:

* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) spiega `Main` più quattro slot firmware, il selettore di avvio, banche di configurazione indipendenti, `SetCfg` e UV Studio gestione slot.
* [Overlay apps](./Overlay-apps) spiega la piattaforma sperimentale `.app`, l'installazione tramite UV Studio, il launcher `F + 7`, i controlli di compatibilità e lo sviluppo delle app.

## Modalità di trasferimento BEAM

BEAM è una modalità di trasferimento diretto opzionale per un canale di memoria o VFO. A differenza di [AirCopy](./AirCopy), che trasferisce le banche di memoria o le sezioni delle impostazioni, BEAM è destinato a condividere rapidamente la configurazione attualmente selezionata con un'altra radio compatibile.

Assegna `BEAM` a una delle scorciatoie personalizzabili (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`), quindi attiva la scorciatoia per aprire la modalità BEAM.

In modalità BEAM:

* `UP` / `DOWN` si attiva tra `BEAM TX` e `BEAM RX`
* `M` avvia l'operazione selezionata
* `EXIT` lascia la modalità BEAM

`BEAM TX` invia la configurazione corrente VFO o del canale di memoria, tra cui frequenza, offset, toni, modulazione, larghezza di banda, potenza, assegnazione della lista di scansione, compander, impostazioni correlate DTMF- quando abilitate e nome del canale.

`BEAM RX` aspetta un pacchetto BEAM da un'altra radio e lo salva al primo canale di memoria gratuito. Se la memoria è piena, lo stato mostra `MEM FULL`.

Vedere [ Funzioni Pulsante](./Button-functions#beam-action) per i dettagli a livello di scorciatoia.

## FoxHunt

[FoxHunt](./Fox-Hunt) è un'applicazione di rinforzo del segnale e di rilevamento della direzione. Da `v6.0.0`, ha una propria azione di scorciatoia `FOX HUNT`. È residente in FieldOps e disponibile come app overlay installabile in Labs.

## Beacon

[Beacon](./Beacon) è un'applicazione di trasmissione ARDF-style Morse separata con i propri requisiti di azione e sicurezza di collegamento `BEACON`. È residente in FieldOps e disponibile come app di sovrapposizione installabile separata in Labs.

## RF log

Costruisce con logging RX/TX aggiungere un'azione di scelta rapida `RF LOG`. Assegnalo a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`, quindi attiva la scorciatoia per aprire la schermata di storia.

I registri di registro RF ricevono, monitorano e trasmettono sessioni in flash esterno. È utile per controllare l'attività recente dopo la scansione, il monitoraggio di un canale incustodito, o la revisione delle trasmissioni effettuate durante l'uso del campo.

Ogni entrata del traffico registrato memorizza:

* frequenza, o il riferimento del canale di memoria quando la sessione è venuta da un canale salvato
* RX o TX direzione
* durata della sessione
* livello di picco RX S-meter per le sessioni ricevute, o livello di potenza TX per le sessioni trasmesse
* bassa tensione della batteria misurata durante la sessione

La vista del registro mostra le ultime voci prima e espone fino a 512 entrate del traffico. Quando viene selezionato il filtro `ALL`, le linee di separatore orizzontale segnano il riavvio della radio.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Controlli sulla schermata di registro RF:

* `UP` / `DOWN`: scorrere attraverso le voci
* `F` + `UP`: saltare alla nuova voce
* `F` + `DOWN`: saltare alla più antica entrata visibile
* `M`: ciclo il filtro tra `ALL`, `RX` e `TX`
* `* SCAN`: ciclo il distintivo di dettaglio lato destro tra la durata, S-meter / TX e la tensione della batteria più bassa
* lunga pressione `M`: aprire la conferma chiara; premere di nuovo `M` su `CLEAR LOG / SURE?` per cancellare il registro
* `EXIT`: lasciare la schermata di registro RF o annullare la conferma chiara

Il registro viene memorizzato in un'area riservata esterna-flash, quindi sopravvive ai normali cicli di alimentazione. Cancellare le cancellazioni di registro che area riservata.

Vedere [ Funzioni Pulsante](./Button-functions#rf-log-action) per i dettagli a livello di scorciatoia.

## RescueOps

### Disclaimer

Vorrei chiarire che non sono un esperto nei servizi di emergenza; tuttavia, questa caratteristica speciale è stata sviluppata con l'intento di soddisfare le esigenze di comunicazione dei primi rispondenti nel modo più efficace possibile. Sono aperto a suggerimenti di miglioramento da professionisti, entro i limiti delle mie capacità, il tempo a mia disposizione, e le capacità tecniche del ricetrasmettitore.

### Panoramica

La funzione RescueOps è stata specificamente sviluppata per integrarsi in un sistema di comunicazione progettato per i primi rispondenti (firefighter, ecc.). Aggiunge i controlli di campo limitati e il comportamento migliorato della torcia, che può essere impostato su modalità fissa, lampeggiante o SOS. Il menu `SetKey` seleziona la chiave di avvio utilizzata con `PTT` per entrare o lasciare la modalità RescueOps. Per impostazione predefinita la chiave è `MENU`, ma può anche essere `UP`, `DOWN`, `EXIT`, o `* SCAN`.

Nella famiglia `v6.0.0` ufficiale, RescueOps è incluso in `FieldOps` e `Labs`. AirCopy è una capacità separata fornita da `Transfer` e `Labs`; abilitare RescueOps non consente di per sé AirCopy.

### Utilizzo

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), membro del “[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”, ha scritto [documentazione](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) specificamente dedicato all'uso della funzione RescueOps. Molte grazie a lui.

Per impostazione predefinita, il ricetrasmettitore funziona come qualsiasi altra versione del firmware, permettendo l'accesso ai menu (e ai menu nascosti), le presse lunghe o le combinazioni di tasti `F` per attivare varie funzioni direttamente dalla tastiera (ad esempio, per avviare una scansione o regolare la potenza di trasmissione), così come scorciatoie.

Tuttavia, se il ricetrasmettitore viene acceso premendo sia l'`PTT` che la chiave configurata nel menu `SetKey`, si passa alla modalità RescueOps, attivando le seguenti modifiche:

* il menu è bloccato
* presse lunghe e combinazioni di tasti `F` sono disabilitate (tranne `A/B` e blocco tastiera)
* riavvio in modalità nascosto-menu è bloccato
* la tastiera può essere utilizzata solo per modificare i canali di memoria, proprio come i tasti `UP` e `DOWN`

Presse brevi e lunghe su `F1` e `F2`, così come lunghe presse su `M`, rimangono disponibili per le scorciatoie. Questa configurazione è la responsabilità della persona responsabile della creazione del ricetrasmettitore. Se le scorciatoie non sono desiderate, possono semplicemente essere impostate all'azione `NONE`.

Si noti che la funzione RescueOps offre 2 nuove azioni:

* `POWER HIGH`, che consente di passare rapidamente temporaneamente alla potenza massima di `5 W` se necessario
* `REMOVE OFFSET`, per rimuovere temporaneamente l'offset di un canale di memoria se presente

Queste 2 azioni sono state aggiunte su richiesta dei professionisti del soccorso e corrispondono alle esigenze del settore.

Una volta in modalità RescueOps, ogni avvio normale mantiene il ricetrasmettitore in questa modalità. Per tornare alla modalità predefinita, con accesso ai menu e ai menu nascosti, è sufficiente ripetere l'operazione di avvio premendo sia `PTT` che la chiave configurata nel menu `SetKey`.

## Gioco

Questo firmware include un piccolo gioco di breakout.

* In costruisce senza app overlay, premere `F+7` per avviare il gioco residente.
* Nell'edizione `Labs`, `F+7` apre il [overlay-app launcher](./Overlay-apps); installa e seleziona `Breakout` o un altro gioco lì.
* Per uscire, premere `EXIT`
* Puoi mettere in pausa il gioco con `M`
* Spostare la pagaia usando `4` o `UP` per andare a sinistra, e `0` o `DOWN` per andare a destra

Questo gioco non ha ambizione oltre divertimento. L'idea era semplicemente di esplorare ciò che è possibile sull'Quansheng K5 accanto alle sue caratteristiche radio. Pensalo come un nodo giocoso per l'era Nokia 3310.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## Modalità di curriculum

Il tuo ricetrasmettitore riavvia nello stesso stato in cui era prima di essere spento. Quindi, se era in modalità Bandscope, ascoltando la trasmissione FM o la scansione, riprenderà automaticamente lo stato alla prossima startup.

## TX su tutte le bande

### Avvertenza

**Questa modifica NON È STATA TESTATA ed è destinata esclusivamente ALLA RICERCA sulle capacità del dispositivo e del suo chipset. NON trasmettere su frequenze illegali. USA un carico fittizio. Gli autori e i collaboratori di questo repository non sono responsabili di danni, controversie o altre conseguenze derivanti dall'uso improprio di questo firmware sperimentale. Installando un firmware di questo repository, accetti la piena responsabilità delle conseguenze e rinunci a intraprendere azioni legali contro gli autori.**

Questa opzione non vi permetterà di trasmettere in qualsiasi modulazione diversa da FM; questa è una limitazione hardware. Passando a AM o SSB cambia solo la modalità di uscita audio AF della RF IC. Non cambia l'intero IC in modalità AM / SSB. Questo è solo per ascoltare. Questo firmware è anche costruito con un blocco aggiuntivo che blocca TX quando AM o SSB è abilitato.

Come esempio di perché questo non dovrebbe essere utilizzato per le comunicazioni reali, prendere in considerazione il seguente grafico per la potenza di trasmissione a `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` - **228 microwatts**
* `54 MHz` -> 2.4 milliwatts
* `81 MHz` -> 230 milliwatt
* `109 MHz` -> 558 milliwatts
* `136 MHz` -> 412 milliwatts
* `163 MHz` -> 122 milliwatt
* `190 MHz` -> 14.8 milliwatts
* `218 MHz` -> 2 milliwatts
* `245 MHz` -> 2.6 milliwatts

Crediti: [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Come sbloccare TX su tutte le bande

1. Vai al [menu nascosto](./Menu#hidden-menu)
1. Inserisci il menu `F Lock`
1. Scegli l'opzione `UNLOCK ALL`
1. Ripetere i passi 2-3 **3 volte**. Fallo con attenzione. Se si conferma qualsiasi altra opzione nel processo, il contatore viene resettato e si dovrà ripetere la procedura di nuovo.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Operazione radio](./Radio-operation)
* [Scansione](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay app](./Overlay-apps)
* [ Funzioni pulsanti](./Button-functions)
* [Risoluzione dei problemi](./Troubleshooting)
