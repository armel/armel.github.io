# Iniziare

Questa pagina è una guida rapida di orientamento per gli utenti di prima volta del firmware. Non sostituisce la documentazione completa, ma dovrebbe aiutare a trovare la pagina giusta più veloce ed evitare gli errori più comuni.

## Primi 5 minuti

Se si desidera solo programmare una frequenza, testare la radio, e salvarlo:

1. Selezionare la VFO attiva con `F` + `2 A/B`.
1. Interruttore che VFO a `frequency mode` con `F` + `3 VFO/MR`.
1. Inserisci una frequenza con la tastiera.
1. Aprire il menu con `M`, scegliere `Channels` (o `All`), e regolare gli elementi di base di cui hai bisogno (`Step`, `Power`, toni, offset, larghezza di banda, `Mode`, `TXLock`).
1. Salvare la configurazione con `ChSave` se si desidera mantenere come un canale di memoria.
1. Torna a `channel mode` con `F` + `3 VFO/MR` quando si desidera sfogliare i canali salvati.

Se è necessario visualizzare o controllare la radio da un browser, ispezionare attività RF, firmware flash, eseguire la calibrazione o caricare un logo di avvio personalizzato, utilizzare [UV Studio](./UV-Studio). Se si preferisce memoria di programmazione da un computer, utilizzare il driver `CHIRP` dedicato fornito con ogni rilascio del firmware. Vedere [Programmazione con CHIRP](./Programming-with-CHIRP) per il flusso di lavoro completo.

Se si conosce già il firmware, vedere [Novità](./Recent-changes) per le ultime modifiche stabile `v6.1.0` e le precedenti evidenziazioni `v6.0.0`.

> [!WARNING]
> Non utilizzare Quansheng CPS. Sovrascrive le impostazioni personalizzate.

## Scegli un'edizione

L'ultima versione stabile `v6.1.0` ha quattro edizioni ufficiali:

| Edizione | Il meglio per | Capacità aggiuntive |
| --- | --- | --- |
| `Fusion` | la maggior parte degli utenti e il funzionamento quotidiano | equilibrata funzione di riferimento |
| `FieldOps` | campo e uso del primo risponditore | RescueOps, residente FoxHunt, residente Beacon |
| `Transfer` | copiare i dati tra le radio | AirCopy e residente Beam |
| `Labs` | sperimentazione | RescueOps, AirCopy e applicazioni sovrapposizioni installabili |

FoxHunt e Beacon sono applicazioni indipendenti da `v6.0.0`. In FieldOps sono residenti; in Labs sono installati e lanciati separatamente come app overlay.

Per la maggior parte degli utenti, inizia con Fusion e scegli un'edizione specializzata solo quando hai bisogno delle sue capacità aggiuntive. Multiboot consente di mantenere diverse edizioni e configurazioni isolate sulla stessa radio.

## Compiti comuni

### Avviare le frequenze di scansione

1. Passare un VFO a `frequency mode`.
1. Impostare la frequenza di partenza.
1. Impostare la fase di frequenza con il menu `Step`.
1. Tenere premuto `* SCAN`.

Per una gamma di scansione limitata, caricare i limiti inferiori e superiori nei due VFO, lunga pressione `5 NOAA` per abilitare `ScnRng`, poi lunga pressione `* SCAN`.

Per il comportamento di scansione completo, le liste di scansione, la scansione prioritaria e la scansione DCS / CTCSS, vedere [Scansione](./Scanning).

### Avviare la scansione dei canali di memoria

1. Passare a `channel mode`.
1. Assegnare i canali a una lista di scansione con il menu `ScList`, o premendo a lungo `5 NOAA`.
1. Tenere premuto `* SCAN`.

L'attuale firmware `v6.1.0` supporta gli elenchi di scansione `24`, `ALL` e una modalità `MIX` configurabile che esegue la scansione di diversi elenchi selezionati insieme.

Vedere [Scansione](./Scanning) per il comportamento completo della lista di scansione.

### Se non riesci a trasmettere

Controlla prima questi articoli:

1. Assicurati che `Mode` sia `FM` e non `AM` o `USB`.
1. Controllare se la frequenza è all'interno del piano `F Lock` selezionato.
1. Se la frequenza è al di fuori del piano di banda selezionato, verificare se `TXLock` è impostato su `OFF`.
1. Cerca un piccolo lucchetto vicino al canale o al nome VFO.

Se questo non lo spiega ancora, vedere [Risoluzione dei problemi](./Troubleshooting).

### Salvare la batteria

I due menu principali da sapere sono:

* `BatSav` per il rapporto attivo/sleep durante il normale funzionamento
* `SetOff` per sonno profondo dopo un periodo di inattività

Vedere [Operazione radio](./Radio-operation#battery-display-type-and-calibration) per display a batteria, tipo di batteria e calibrazione, e [Operazione radio](./Radio-operation#about-the-setoff-menu) per il comportamento dettagliato della modalità sonno.

## Differenze di modello

Questo firmware si rivolge a `UV-K1` e `UV-K5 V3`.

La differenza di giorno per giorno più visibile nella documentazione è la navigazione:

* `UV-K5`: la navigazione è solitamente descritta con `UP` / `DOWN`
* `UV-K1`: la navigazione è solitamente descritta con `LEFT` / `RIGHT`

L'opzione nascosta-menu `SetNav` controlla questo stile di navigazione.

Alcuni screenshot ed esempi usano la terminologia UV-K5 prima, ma la stessa caratteristica di solito esiste su UV-K1 con le chiavi di navigazione equivalenti.

## Concetti fondamentali

Questi termini appaiono in tutta la wiki:

* `VFO mode`: digita le frequenze direttamente e regola le impostazioni live prima di salvarle
* `Channel mode` / `memory mode`: sfoglia i canali di memoria salvati
* `Main VFO`: la linea superiore o inferiore attiva, contrassegnata da `►`
* `Menu category`: il primo livello di menu classificato introdotto in Fusion `v5.9.0` e utilizzato dalle attuali edizioni v6; `All` ripristina l'ordine piatto originale e la numerazione globale
* `F Lock`: il principale piano della banda TX
* `TXLock`: un permesso extra per canale TX quando una frequenza è al di fuori del piano `F Lock` selezionato
* `Scan list`: uno dei gruppi di memoria `24`, o `ALL`
* `MIX`: una modalità di scansione `v6.1.0` che combina una selezione salvata di liste `01` a `24`
* `ScnRng`: scansioni solo tra le frequenze attualmente caricate nei due VFO
* `SetOff`: timeout di inattività prima del sonno profondo
* `POnMsg`: modalità di visualizzazione di avvio, incluso il logo di avvio personalizzato opzionale
* `Multiboot`: mantiene `Main` più quattro immagini firmware v6-compatibili aggiuntive in Flash esterno
* `Config bank`: il profilo dei canali/impostazioni isolati abbinato a uno slot Multiboot per impostazione predefinita
* `SetCfg`: cambia la banca di configurazione senza cambiare lo slot del firmware in esecuzione
* `Overlay app`: un piccolo programma `.app` solo Labs caricato da Flash esterno in RAM quando lanciato
* `MO`, `DW`, `DWR`, `XB`: `RxMode` abbreviazioni mostrate nella barra di stato

## Dove andare dopo

* [Operazione radio](./Radio-operation) per uso VFO/channel, barra di stato, `F Lock`, `TXLock` e comportamento del sonno
* [Novità](./Recent-changes) per le principali modifiche visibili agli utenti nelle versioni recenti
* [UV Studio](./UV-Studio) per la visualizzazione dal vivo, attività RF, flash firmware, slot Multiboot, applicazioni Labs, calibrazione, loghi di avvio e gli strumenti di recupero `v1.6.0` esterno-Flash
* [Multiboot e Multiconfig](./Multiboot-and-Multiconfig) per slot firmware, selettore di avvio, banche di configurazione e `SetCfg`
* [Overlay apps](./Overlay-apps) per l'installazione e il lancio di app Labs sperimentali
* [Programmazione con CHIRP](./Programming-with-CHIRP) per la programmazione del computer con il driver dedicato incluso in ogni rilascio
* [Scansione](./Scanning) per la scansione della frequenza, la scansione della memoria, `ScnRng` e DCS / CTCSS
* [Menu](./Menu) per ogni voce del menu e il menu nascosto
* [ Funzioni pulsanti](./Button-functions) per scorciatoie, presse lunghe e chiavi programmabili
* [FoxHunt](./Fox-Hunt) per la ricerca della direzione assistita solo dal segnale di ricezione
* [Beacon](./Beacon) per il trasmettitore Morse periodico indipendente
* [AirCopy](./AirCopy) per il trasferimento di memoria/impostazioni radio-radio e i miglioramenti `v6.1.0`
* [Attrezzature avanzate](./Advanced-features) per RescueOps, Modalità di curriculum, il gioco integrato, e TX-on-all-band caratteristiche di ricerca
* [Spectrum analyzer](./Spectrum-analyzer) per la scansione in stile bandscope
* [FM radiodiffusione](./FM-broadcast-radio-receiver) per la funzione di trasmissione FM
* [Risoluzione dei problemi](./Troubleshooting) per problemi comuni e controlli rapidi
