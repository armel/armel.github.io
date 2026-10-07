# Beacon

Beacon è una trasmissione ARDF-style Morse applicazione. Invia ripetutamente un identificatore selezionato sull'attiva TX VFO, alternandosi tra una finestra di trasmissione configurabile e un intervallo silenzioso.

Poiché `v6.0.0`, Beacon e [FoxHunt](./Fox-Hunt) sono applicazioni separate e azioni programmabili separate. Beacon inizia direttamente nel suo ciclo di trasmissione; non si apre attraverso FoxHunt.

Beacon è residente nell'edizione `FieldOps`. In `Labs`, installare l'app overlay `Beacon` con [UV Studio](./UV-Studio#apps-labs). La scorciatoia `BEACON` lancia l'applicazione residente o l'app overlay installata corrispondente, a seconda dell'edizione.

> [!WARNING]
> Beacon inizia la sua prima trasmissione immediatamente. Prima di lanciarlo, verificare i requisiti attivi TX VFO, frequenza, potenza, antenna, `F Lock`, `TXLock`, segnale di chiamata e requisiti di identificazione, ciclo di dovere e regolamenti locali. Non lasciare un faro incustodito che trasmette quando sono proibite trasmissioni autonome o periodiche.

## Inizio Beacon

Assegnare `BEACON` a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`, quindi attivare la scorciatoia. In Labs è anche possibile lanciare `Beacon` dal selettore dell'app `F + 7`.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identificazione

| Impostazione | Messaggio | Oggetto |
| --- | --- | --- |
| `MOE` a `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | cinque identificatori standard IARU ARDF fox |
| `MO` | `MO` | finitura/home identificatore |
| `CALL` | segnale di chiamata configurato seguito da `MOE` | identificato beacon banda amatoriale |

Il segnale viene da CHIRP `Message Line 1`. Le lettere sono convertite in maiuscolo; lettere, cifre e `/` sono supportate. Vedere [Programmazione con CHIRP](./Programming-with-CHIRP#beacon-identification).

L'identificatore utilizza un tono `1000 Hz` a circa `12 WPM`.

## Temporizzazione e manipolazione

* `TX`: `5` a `60 seconds`, nei passaggi `5-second`; default `30 seconds`
* `IDLE`: `5` a `240 seconds`, nei passaggi `5-second`; default `30 seconds`

Per tempismo classico a cinque fili, utilizzare `TX = 60 s` e `IDLE = 240 s`.

| Modalità | Comportamento |
| --- | --- |
| `TONE` | Mantiene attivo il supporto FM per la finestra TX completa e le chiavi del tono `1000 Hz` |
| `CARR` | Keys il vettore e tono insieme per ogni elemento Morse, così il segnale scompare nelle lacune |

`TONE` è l'impostazione predefinita più pulita. `CARR` riproduce più da vicino i trasmettitori ARDF interrotti, ma il keying diretto del vettore può produrre piccoli clic e la diffusione spettrale aggiuntiva.

## Controlli

| Controllo | Azione |
| --- | --- |
| `1` | Ciclo della durata `TX` |
| `2` | Ciclo della durata `IDLE` |
| `3` | Ciclo l'identificatore |
| `4` | Alterna tra `TONE` e `CARR` |
| `F`, poi `1`, `2`, `3`, o `4` | Passo l'impostazione corrispondente indietro |
| tenere `F` per circa 0,5 secondi | Blocca o sblocca tutti i comandi Beacon |
| `M` durante TX | Fermare la trasmissione corrente e iniziare un intervallo di idle fresco |
| `M` mentre idle | Riavviare il conto alla rovescia completa |
| `EXIT` | Fermatevi in sicurezza e uscite Beacon |

Prima di ogni scoppio, Beacon controlla le normali restrizioni TX-frequenza, per canale `TXLock`, stato della batteria e modulazione. Se la trasmissione è rifiutata, mostra lo stato corrispondente della radio e aspetta prima di provare il successivo esplosione programmata.

## Impostazioni salvate

Beacon salva il suo identificatore, la durata `TX`, la durata `IDLE` e la modalità `TONE` / `CARR`. Queste impostazioni vengono ripristinate al prossimo lancio e sono incluse in un trasferimento AirCopy `Settings`. La serratura di applicazione temporanea non viene salvata.

## Pagine correlate

* [FoxHunt](./Fox-Hunt)
* [ Funzioni pulsanti](./Button-functions#beacon-action)
* [Programmazione con CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Overlay app](./Overlay-apps)
* [Overlay application](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Operazione radio](./Radio-operation)
