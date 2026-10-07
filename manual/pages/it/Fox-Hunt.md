# FoxHunt

FoxHunt è un'applicazione di ripetizione del segnale di sola ricezione per la ricerca di radioamatori (ARDF). Aiuta l'operatore ad avvicinarsi a un trasmettitore nascosto mostrando calibrato `dBm`, S-meter, picco, minimo, tendenza e storia del segnale recente.

Poiché `v6.0.0`, FoxHunt e [Beacon](./Beacon) sono applicazioni separate e azioni programmabili separate. FoxHunt non trasmette e non passa in Beacon.

FoxHunt è residente nell'edizione `FieldOps`. In `Labs`, installare l'app overlay `FoxHunt` con [UV Studio](./UV-Studio#apps-labs). La scorciatoia `FOX HUNT` lancia l'applicazione residente o l'app overlay installata corrispondente, a seconda dell'edizione.

## Inizio FoxHunt

Assegnare `FOX HUNT` a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`, quindi attivare la scorciatoia sulla VFO che si desidera monitorare. In Labs è anche possibile lanciare `FoxHunt` dal selettore dell'app `F + 7`.

> [!NOTE]
> La navigazione utilizza `UP` / `DOWN` su UV-K5 e `LEFT` / `RIGHT` su UV-K1. Il layout attivo segue `SetNav`.

## Visualizzazione e controlli

La scala del segnale passa da `S0` a `S9+40`. Il manometro principale può mostrare una scala di 13 livelli o una storia di scorrimento di circa 18 secondi. La tendenza confronta il segnale corrente con il livello misurato approssimativamente un secondo prima.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Controllo | Azione |
| --- | --- |
| `1` | Alterna tra la scala e la cronologia del segnale |
| `2` | Ciclo silenzioso, Geiger-style beep, e audio di ricezione-stazione |
| `3` | Ciclo `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` e `BYP+` |
| chiavi di navigazione | Aumentare o diminuire l'attenuazione direttamente |
| `F`, poi `2` o `3` | Passo l'impostazione corrispondente indietro |
| `M` | Reimpostare i riferimenti di punta, minimo e tendenza |
| tenere `F` per circa 0,5 secondi | Blocca o sblocca i comandi FoxHunt |
| `EXIT` | Uscita FoxHunt |

Mentre bloccato, rimangono disponibili solo i tasti di navigazione per attenuazione e un'altra lunga pressa di `F`.

## Consigli di direzione

* Aumentare l'attenuazione come il segnale diventa forte in modo che il metro rimanga lontano da scala piena.
* Reimpostare i riferimenti con `M` prima di ogni confronto o scansione del corpo.
* Tenere la radio contro il petto e ruotare lentamente; il corpo spesso crea un minimo utile segnale nella direzione lontano dal trasmettitore.
* Usa il picco (`PK`) e il minimo (`MN`) per confrontare una rotazione completa.
* Utilizzare il grafico di storia per vedere le valli del segnale e l'indicatore di tendenza mentre si cammina un cuscinetto.

`BYP` e `BYP+` sono impostazioni di guadagno ravvicinate, non un bypass hardware letterale. Il valore `dBm` visualizzato cambia con la fase di guadagno, quindi confronta le letture durante la permanenza nello stesso passo.

## Impostazioni salvate

FoxHunt salva la sua attenuazione, calibro e modalità audio. Queste impostazioni vengono ripristinate al prossimo lancio e sono incluse in un trasferimento AirCopy `Settings`. La serratura di applicazione temporanea non viene salvata.

## Pagine correlate

* [Beacon](./Beacon)
* [ Funzioni pulsanti](./Button-functions#fox-hunt-action)
* [Overlay app](./Overlay-apps)
* [Overlay application](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Caratteristiche avanzate](./Advanced-features)
