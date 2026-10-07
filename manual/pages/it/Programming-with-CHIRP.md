# Programmazione con CHIRP

Questa pagina spiega come utilizzare `CHIRP` con il driver dedicato incluso con ogni rilascio del firmware.

> [!WARNING]
> Utilizzare il driver `CHIRP` dalla stessa release firmware di quella installata sulla tua radio.
> Non utilizzare Quansheng CPS.
> Non utilizzare un driver `UV-K5` generico o un driver da un altro rilascio del firmware.

## Compatibilità

Il driver `v6.1.0` dedicato supporta ogni edizione ufficiale `v6.1.0` su:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` e `Labs`

Non è per:

* `UV-K5 V1 / V2`
* altri modelli Quansheng
* famiglie firmware non correlate

Poiché questo firmware utilizza il proprio layout di memoria e impostazioni, un altro driver può leggere o scrivere i dati sbagliati. Abbina sempre la versione del driver alla versione del firmware, anche quando si sposta tra le edizioni ufficiali.

Non presumere che il vecchio driver `v6.0.0` sia intercambiabile con il driver `v6.1.0`.

## Prima di iniziare

* assicurarsi che la radio esegue il rilascio F4HWN corrispondente
* individuare il file driver incluso in quel pacchetto di rilascio
* essere pronti a salvare un backup dell'immagine radio prima di modificare qualsiasi cosa

> [!NOTE]
> `CHIRP` può mostrare questo driver come sperimentale. Ci si aspetta.

## Aggiornamento a v6.1.0

Prima di aggiornare da una precedente generazione del firmware:

1. Scarica la radio con il driver corrispondente al firmware attualmente installato.
1. Salvare l'immagine e esportare facoltativamente i canali di memoria a CSV.
1. Indietro la calibrazione radio con [UV Studio](./UV-Studio#calibration).
1. Flash l'edizione scelta `v6.1.0`.
1. Se richiesto dalla versione da cui migra, inserire il menu nascosto e eseguire `RESET ALL`.
1. Caricare il driver `v6.1.0` CHIRP dedicato e scaricare un'immagine fresca dalla radio aggiornata.
1. Copiare e incollare i vecchi canali in quella immagine fresca, quindi caricarlo.

> [!WARNING]
> Non importare direttamente un vecchio CSV sopra la nuova immagine radio completa. Copia e incolla le righe del canale in un'immagine appena scaricata in modo che il layout delle impostazioni della nuova versione rimanga intatto.

## Caricare il driver dedicato in CHIRP

1. Apri `CHIRP`.
2. Se `File > Load Module...` non è disponibile, abilitare le funzioni CHIRP `Help > Developer Mode` prima (menu Help), quindi riavviare `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Usa `File > Load Module...` e seleziona il file `f4hwn.fusion.chirp...py` incluso con il rilascio del firmware.
4. Una volta caricato il modulo, `CHIRP` dovrebbe offrire l'ingresso modello `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.

> [!NOTE]
> Il nome del modulo e l'etichetta del modello CHIRP conservano il nome storico `Fusion`. Il modulo `v6.1.0` è tuttavia il driver condiviso per tutte e quattro le edizioni ufficiali.

## Scarica dalla radio

1. Accendi la radio.
1. Collegare la radio con un cavo `USB-C` compatibile o un cavo di programmazione a doppio jack compatibile sul connettore `mic/spkr`.
1. Assicurarsi che il connettore sia saldamente inserito.
1. In `CHIRP`, scegli `Radio > Download From Radio...`
1. Selezionare la porta seriale corretta.
1. Seleziona `Vendor`: `Quansheng`.
1. Seleziona `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Inizia il download e aspetta che l'immagine radio sia stata completamente letta.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Se la comunicazione fallisce, disconnettere il cavo, accendere la radio prima, quindi riconnettere il cavo. Il driver dedicato avverte che alcune impostazioni possono fallire se la radio è stata alimentata con il cavo già attaccato.

## Mostra i campi extra

Dopo il download, abilitare `View > Show Extra Fields` in `CHIRP` (Mostra menu).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Questo è importante perché il driver dedicato espone diversi campi specifici del canale attraverso il gruppo `Extra`. Senza `Show Extra Fields`, alcuni parametri specifici del firmware rimangono nascosti nell'editor del canale.

Esempi tipici includono:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Modifica e caricamento

È quindi possibile modificare ricordi, nomi e le impostazioni supportate.

Quando siete pronti:

1. Controlla i tuoi cambiamenti.
1. In `CHIRP`, scegli `Radio > Upload To Radio...`
1. Utilizzare la stessa porta, fornitore e modello.
1. Attendere che il caricamento sia completo prima di toccare il cavo o spegnere la radio.

> [!WARNING]
> Lasciare oggetti legati alla calibrazione o avanzati da soli a meno che non si sappia esattamente cosa fanno.

## Identificazione Beacon

L'applicazione Beacon indipendente utilizza l'impostazione CHIRP `Message Line 1` come segnale di chiamata. Il driver dedicato accetta fino a `12 characters` in questo campo.

Quando Beacon trasmette in modalità `CALL`, il firmware converte lettere in maiuscolo, mantiene lettere, cifre e `/`, rimuove caratteri non supportati e aggiunge ` MOE`. Se il segnale di chiamata risultante è vuoto, trasmette `MOE`.

Dopo aver cambiato `Message Line 1`, carica le impostazioni alla radio prima di iniziare Beacon. Vedere [Beacon](./Beacon) per il comportamento di trasmissione e le informazioni di sicurezza.

## Buona pratica

* utilizzare sempre il driver incluso con lo stesso rilascio del firmware
* sempre scaricare prima, quindi salvare un backup
* dopo un aggiornamento del firmware, ricaricare il nuovo modulo driver da quella versione
* utilizzare `CHIRP` per la programmazione di massa, non Quansheng CPS

## Se qualcosa sembra sbagliato

Controlla questi punti:

1. la radio è davvero un `UV-K1` o `UV-K5 V3`
1. la radio esegue la prevista versione F4HWN ed edizione
1. `CHIRP` ha caricato il driver da quella stessa release, non un altro modulo `UV-K5`
1. il cavo è completamente inserito
1. la porta seriale selezionata è quella corretta

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Operazione radio](./Radio-operation)
* [Beacon](./Beacon)
* [Risoluzione dei problemi](./Troubleshooting)
