# Risoluzione dei problemi

Questa pagina raccoglie le più comuni situazioni “qualcosa è sbagliato” già coperte altrove nella wiki, in modo da poter trovare il giusto controllo rapidamente.

## Posso ricevere, ma non posso trasmettere

Controlla prima questi punti:

1. Assicurati che `Mode` sia impostato su `FM`.
1. Controlla il piano `F Lock` selezionato.
1. Se la frequenza è al di fuori del piano, verificare se `TXLock` è impostato su `OFF`.
1. Cerca un piccolo lucchetto vicino al canale o al nome VFO.

Importanti promemoria:

* `AM` e `USB` sono solo per ascoltare
* `UNLOCK ALL` ha ancora una procedura di sbloccaggio aggiuntiva

Vedi anche: [Operazione radio](./Radio-operation#about-the-f-lock-and-txlock-menus) e [Attrezzature avanzate](./Advanced-features#tx-on-all-bands).

## Le mie impostazioni personalizzate sono scomparse o cambiate inaspettatamente

Non utilizzare Quansheng CPS. Sovrascrive le impostazioni personalizzate.

Utilizzare il driver `CHIRP` fornito con ogni rilascio del firmware o un altro strumento di programmazione compatibile.

Vedi anche: [Programmazione con CHIRP](./Programming-with-CHIRP), [Per iniziare](./Getting-started), e [Uso della radio](./Radio-operation#basic-operation--configuration).

## Il mio logo di avvio personalizzato non mostra

Controlla questi punti:

1. assicurarsi che la creazione del firmware include il supporto logo
1. caricare il logo con [UV Studio](./UV-Studio#boot-logo) mentre la radio è iniziata normalmente
1. menu aperto `POnMsg` e selezionare `LOGO`
1. riavviare la radio dopo aver cambiato l'impostazione

Se il logo sembra troppo scuro, troppo leggero o invertito, caricarlo di nuovo da UV Studio e regolare `Threshold` o `Invert colors` prima di scriverlo alla radio.

## Ho cambiato un'impostazione del canale di memoria, ma non è rimasto salvato

Alcuni cambiamenti specifici del canale riguardano solo la copia temporanea corrente di quel canale di memoria.

Se si modifica un'impostazione per canale come `Step`, `Power`, o un altro parametro del canale e si desidera mantenere permanentemente, salvare il canale di nuovo con `ChSave` per scrivere le impostazioni aggiornate di nuovo a quella slot di memoria.

In caso contrario, il cambiamento è solo temporaneo e può scomparire quando si passa il canale, la modalità di commutazione, o riavviare la radio.

Vedi anche: [Operazione radio](./Radio-operation#basic-operation--configuration) e [Menu](./Menu#main-menu).

## La scansione della memoria non trova nulla

Controlla questi punti:

1. Assicurati di essere in `channel mode`, non `frequency mode`.
1. Assicurarsi che il canale sia assegnato ad una lista di scansione con `ScList` o tramite `5 NOAA` a lunga pressione.
1. Assicurarsi che la lista di scansione attualmente attiva non è vuota.
1. Se necessario, passare a un altro elenco di scansione valido durante la scansione.

Il firmware supporta gli elenchi di scansione `24` e `ALL`. Se l'elenco richiesto è vuoto o non valido, la radio salta alla prossima lista valida non vuota.

Vedi anche: [Scansione](./Scanning#memory-channels-scanning) e [funzioni Pulsante](./Button-functions#front-keypad).

## Non posso sintonizzare la stazione di trasmissione FM voglio

Si può semplicemente utilizzare l'intervallo di trasmissione FM sbagliato.

Mentre la ricezione di trasmissione FM è attiva, lunga pressione `1 BAND` per andare in bicicletta attraverso le gamme FM disponibili:

* `87.5` a `108 MHz`
* `76` a `108 MHz`
* `76` a `90 MHz`
* `64` a `76 MHz`

L'intervallo attualmente selezionato è mostrato in basso a sinistra della schermata FM, ad esempio `87.5-108M`.

Sintonizzazione diretta, scansione manuale, scansione automatica e memorie FM funzionano solo all'interno dell'intervallo attualmente selezionato.

Vedi anche: [FM radio ricevente broadcast](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## FM trasmissione radio continua a fermare

Questo è di solito il comportamento atteso.

Durante la ricezione FM broadcast, il VFO attivo ha ancora la priorità. Se l'attività viene ricevuta sul VFO attivo, la radio passa temporaneamente alla ricezione VFO, quindi torna a trasmettere FM quando la ricezione termina.

Vedi anche: [FM radio ricevente broadcast](./FM-broadcast-radio-receiver).

## AM ricezione suona troppo duro, distorto, o troppo muffato

Prova a cambiare il profilo `SetRxA` mentre la radio è in modalità `AM`.

In `AM`, `SetRxA` e il ciclo di azione chiave `RxA` tra:

* `SHARP`: più stretto e più selettivo, con un migliore rifiuto del canale adiacente
* `STOCK`: più vicino al comportamento del firmware stock
* `OPEN`: più ampio e più aperto, spesso più bello su segnali deboli

Se una ricezione AM suona troppo dura in `SHARP`, prova `STOCK` o `OPEN`. Se suona troppo morbido o troppo largo in `OPEN`, prova `SHARP`.

Vedi anche: [Menu](./Menu#main-menu) e [funzioni Pulsante](./Button-functions#custom-button-functions).

## Sento solo alcuni canali VHF aeronautici quando apro il monitor in `AM 8.33 kHz`

Questo non è spesso un problema di sensibilità. Di solito è una confusione tra `channel designator` (a volte chiamato `channel number` o `published channel`) e la frequenza operativa.

Alcuni documenti aeronautici, siti web o applicazioni pubblicano il `channel designator`, che sembra una frequenza normale ma non è sempre la frequenza operativa. Dedicate 8.33-capable aeronautical VHF radio traducono che il designatore canale pubblicato automaticamente. Questo firmware esegue anche tale correzione quando si digita il valore direttamente sulla radio, ma `CHIRP` memorizza il valore inserito come frequenza operativa.

### Caso 1: Parigi-Orly

Per **Paris-Orly (LFPO)**, la documentazione **SIA** pubblica infatti **ATIS ORLY 126.505 (FR)**, con **131.355 (EN)** per il servizio in lingua inglese.

La tabella di corrispondenza **[ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** mostra che il designatore canale pubblicato 8.33 **126.505** corrisponde al funzionamento frequenza **126.5000 MHz**. In altre parole:

* ** Servizio:** ATIS ORLY (FR)
* **Channel designator:** 126.505
* ** Frequenza di funzionamento: ** 126.5000 MHz

Importante differenza:

* se si immette `126.5050` direttamente sulla radio, il firmware lo corregge alla frequenza di funzionamento corrispondente, qui `126.5000 MHz`
* se si immette `126.5050` in `CHIRP`, quel valore esatto viene memorizzato e utilizzato come-è, quindi l'errore di sintonizzazione rimane

### Caso 2: Bruxelles

Per **Bruxelles-National (EBBR)**, il canale designatore pubblicato 8.33 per **Brussels Ground (South)** è **121.880** negli elenchi consultati.

Il **[ICAO corrispondenza tabella](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** mostra che il designatore canale pubblicato 8.33 **121.880** corrisponde al funzionamento frequenza **121.8750 MHz**. In altre parole:

* ** Servizio:** Bruxelles Ground (Sud)
* **Channel designator:** 121.880
* ** Frequenza di funzionamento: ** 121.8750 MHz

Importante differenza:

* se si immette `121.8800` direttamente sulla radio, il firmware lo corregge alla frequenza di funzionamento corrispondente, qui `121.8750 MHz`
* se si immette `121.8800` in `CHIRP`, quel valore esatto viene memorizzato e utilizzato come-è, quindi l'errore di sintonizzazione rimane

In breve, se la frequenza inserita in `CHIRP` è il designatore **canale** piuttosto che la frequenza di funzionamento, il monitor di forza aperta in `AM 8.33 kHz` può sembrare ripristinare la ricezione, ma il vero problema è che il designatore del canale pubblicato è stato interpretato come la frequenza operativa.

Se un servizio programmato da un programmatore di canale diventa solo udibile quando si apre il monitor in `AM 8.33 kHz`, provare la frequenza operativa corrispondente prima, soprattutto quando il valore pubblicato termina con `...005`, `...010`, `...255`, `...505`, `...755`, o simili designatori di canale in stile 8.33.

Vedi anche: 

[Ofcom: comprensione 8.33 kHz frequenze e numeri di canale](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Smettila di incolpare la radio o il firmware. Guarda questo video sul mio canale Youtube:
[Aviazione Frequenze e MONITOR ✈️: Canale frequenza costante (l'errore che cambia tutto)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## La percentuale della batteria o la tensione sembra sbagliata

Controlla questi punti:

1. assicurarsi che la radio non stia caricando attraverso `USB-C` mentre lo controlli
1. utilizzare `BatTxt = VOLTAGE` o aprire `SysInf`
1. assicurarsi che `BatTyp` corrisponda alla batteria che si sta utilizzando
1. confrontare la tensione visualizzata con un multimetro
1. se necessario, riadatta `BatCal`

Importante promemoria:

* `BatCal` colpisce la lettura della tensione
* `BatTyp` colpisce la stima percentuale della batteria

Vedi anche: [Operazione radio](./Radio-operation#battery-display-type-and-calibration) e [Menu](./Menu#hidden-menu).

## Il microfono esterno PTT si comporta diversamente

Questo è un comportamento noto su alcune revisioni hardware.

Le differenze documentate includono:

* TX può aspettare fino a quando RX è chiaro prima di trasmettere
* Toni DTMF o tono 1750 Hz possono essere tagliati rapidamente

Il lato interno `PTT` non mostra tali problemi nei casi documentati.

Vedi anche: [ Funzioni pulsanti](./Button-functions#external-microphone).

## La radio va a dormire inaspettatamente

Controlla questi menu:

* `SetOff`: sonno profondo dopo un periodo di inattività
* `BatSav`: rapporto attivo/sleep durante il normale funzionamento

Se `SetOff` non è `OFF`, la radio può entrare in modalità sonno dopo l'inattività anche durante la scansione, finché non si verifica una ricezione.

FoxHunt e Beacon ignorano intenzionalmente `SetOff`. Se la radio rimane sveglia in entrambe le applicazioni, lasciare con `EXIT` prima di diagnosticare il timer di inattività. Da `v6.0.0`, sono applicazioni indipendenti.

Vedi anche: [Operazione radio](./Radio-operation#about-the-setoff-menu).

## La navigazione sembra muoversi nella direzione sbagliata

Se la navigazione del menu o alcuni controlli sembrano muoversi nella direzione sbagliata, controlla prima l'elemento `SetNav` nascosto-menu.

Questo firmware non può rilevare in modo affidabile se è in esecuzione su un `UV-K1` o un `UV-K5`. A causa di ciò, lo stile di navigazione doveva essere esposto come impostazione del menu.

`SetNav` ti permette di scegliere tra:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Questo non cambia la funzione stessa. Cambia solo lo stile di navigazione utilizzato dal firmware, e quindi come i controlli dovrebbero essere letti sulla tua radio.

Vedi anche: [Ottenere iniziato](./Getting-started#model-differences) e [Menu](./Menu#hidden-menu).

## I pulsanti non fanno quello che mi aspetto

Controlla queste possibilità:

1. blocco tastiera può essere abilitato
1. `SetLck` può anche bloccare le azioni programmabili del pulsante laterale / `M Long`, `PTT`, o entrambi
1. La modalità RescueOps disabilita le presse più lunghe e le combinazioni di tasti `F`
1. alcune azioni differiscono tra `F+` e lunga stampa
1. `F` seguito da una breve pressione laterale regola Passo, mentre `F` seguita da tenere quel pulsante laterale apre il picker azione nelle attuali edizioni v6

Vedi anche: [ Funzioni Pulsante](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon), e [Disposizioni avanzate](./Advanced-features#rescueops).

## Comprendere Power e SetPwr: potenza TX per canale e globale

Il menu Power determina la potenza di trasmissione utilizzata dal canale corrente o VFO. I valori disponibili sono da LOW1 a LOW5, MID, HIGH o USER. Questa impostazione è quindi memorizzata localmente, su base per canale.

Il menu SetPwr non seleziona direttamente la potenza per un canale specifico. Definisce solo quale livello di potenza effettivo è assegnato alla modalità USER, scegliendo da LOW1 a LOW5, MID o HIGH. Questa impostazione è globale per l'intera radio.

Di conseguenza, tutti i canali la cui impostazione Power è impostata su USER utilizzeranno automaticamente il valore attualmente definito in SetPwr.

Questo meccanismo consente di modificare la potenza effettiva di più canali impostati a USER in una sola volta, senza dover modificare ogni canale singolarmente.

## Dove andare dopo

* [Per iniziare](./Getting-started)
* [Programmazione con CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Operazione radio](./Radio-operation)
* [Scansione](./Scanning)
* [Caratteristiche avanzate](./Advanced-features)
* [Menu](./Menu)
* [ Funzioni pulsanti](./Button-functions)
