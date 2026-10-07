# Multiboot e Multiconfig

A partire da `v6.0.0`, le edizioni compatibili possono mantenere diverse immagini del firmware F4HWN nel Flash esterno della radio e ripristinare uno da un selettore all'avvio. Ogni slot firmware ha una propria banca di configurazione per impostazione predefinita, quindi provare un'altra edizione non sovrascrive i canali e le impostazioni utilizzate dagli altri slot.

Multiboot è incluso nelle quattro edizioni ufficiali `v6.0.0`: `Fusion`, `FieldOps`, `Transfer` e `Labs`. Le slot firmware sono gestite con [UV Studio](./UV-Studio#firmware-slots) mentre la radio è in esecuzione normalmente.

> [!IMPORTANT]
> Basta mettere un'immagine `v6.0.0` o più recente F4HWN con supporto Multiboot in uno slot firmware. Un firmware `v5.x`, stock o altri firmware non-Multiboot può essere eseguito dopo essere stato ripristinato, ma non può aprire il selettore di avvio per tornare ad un altro slot.

## slot firmware

La radio mantiene cinque voci Multiboot:

| Etichetta radio | Oggetto | Gestito da |
| --- | --- | --- |
| `M` | `Main`, un backup automatico del firmware installato tramite la normale procedura di flashing | firmware firmware firmware |
| `1` a `4` | immagini firmware F4HWN aggiuntive | UV Studio |

`Main` è protetto dagli scritti degli ospiti. Sul primo avvio di un firmware multiboot installato attraverso la normale procedura `Flash Firmware`, la radio visualizza `Init Main` e copia il firmware in esecuzione in `M`. Non spegnere la radio durante questa inizializzazione.

Le quattro slot utente vivono solo in Flash esterno fino a quando selezionato. Installazione o cancellazione di uno in UV Studio non sostituisce immediatamente il firmware attualmente in esecuzione da Flash interno.

## Installazione di un firmware in uno slot

1. Avviare la radio normalmente con un firmware Multiboot abilitato.
1. Collegarlo a un browser desktop con una connessione dati USB supportata.
1. Aprire [UV Studio](https://armel.github.io/uvstudio/) e selezionare `Firmware Slots`.
1. Selezionare una stabile compatibile `v6.x` F4HWN costruire dal catalogo, o scegliere un file `.bin` locale compatibile.
1. Scegliere slot `1`, `2`, `3`, o `4` e modificare facoltativamente il nome del display.
1. Selezionare `Write to slot`, confermare e attendere i passaggi di cancellazione, scrittura e verifica da terminare.

Ogni slot accetta un'immagine di applicazione fino a `118 KiB`. UV Studio scrive l'immagine a Flash esterno, memorizza le sue dimensioni e CRC, poi chiede alla radio di verificare l'immagine completa.

`Erase FW` rimuove l'immagine del firmware esterno da quella slot utente. Non cancella la banca di configurazione della slot e non pregiudica una copia di quel firmware già in esecuzione in Flash interno.

## Selezione di un firmware all'avvio

1. Spegnete la radio.
1. Tenere `M` (`MENU`) di per sé mentre si accende la radio. Non tenere `PTT`.
1. Rilasciare la chiave quando viene visualizzata la schermata `F4HWN MULTIBOOT`.
1. Attendere mentre la radio analizza e convalida le slot.
1. Utilizzare `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1, per selezionare `M` o slot `1` a `4`. Il layout attivo segue `SetNav`.
1. Premere `M` per selezionarlo, quindi premere `M` di nuovo su `Restore ...?` per confermare.
1. Non spegnere la radio durante `Writing / Verify`. La radio si riavvia automaticamente con il firmware selezionato.

Premere `EXIT` dall'elenco delle slot per annullare e continuare ad avviare il firmware già installato. Le slot non valide, incomplete, oversize o CRC-failing sono visualizzate ma non possono essere ripristinate.

Il selettore evidenzia inizialmente lo slot da cui è arrivato il firmware in esecuzione. È anche specchiato in UV Studio quando questo supporto è disponibile.

## Multiconfig: una banca di configurazione per slot

Per impostazione predefinita, selezionare il firmware slot `N` seleziona anche la banca di configurazione `N`:

| Firmware | Configurazione predefinita | Contenuto custodito in quella banca |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | canali di memoria, nomi, VFO, liste di scansione e impostazioni radio |
| slot `1` | `CFG 1` | copia propria delle stesse aree di configurazione |
| slot `2` | `CFG 2` | copia propria delle stesse aree di configurazione |
| slot `3` | `CFG 3` | copia propria delle stesse aree di configurazione |
| slot `4` | `CFG 4` | copia propria delle stesse aree di configurazione |

Dati di calibrazione, logo di avvio, metadati Multiboot, slot firmware/app, e il log RF sono condivisi piuttosto che duplicati in ogni banca.

Una banca di configurazione non utilizzata inizia con i default di fabbrica la prima volta che viene utilizzato. Questa separazione è utile quando le edizioni hanno impostazioni diverse o quando si desidera testare un firmware senza modificare la normale configurazione `Main`.

## Utilizzo di SetCfg

Il menu `SetCfg` consente al firmware in esecuzione di utilizzare una banca di configurazione diversa senza cambiare firmware. Ad esempio, `SLOT 2 / CFG 4` significa che il firmware ripristinato dalla slot 2 attualmente utilizza i canali e le impostazioni memorizzate in banca 4.

1. Aprire il menu normale e selezionare `SetCfg`.
1. Scegliere `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` o `CFG 4`.
1. Premere `M`, quindi premere `M` di nuovo su `SURE?`.
1. La radio riavvia e mappa la banca selezionata.

Confermare la banca già in uso è un no-op e non riavvia la radio. La pagina di identità `SysInf` mostra distinti badge `SLOT` e `CFG` in modo da poter controllare sempre la combinazione corrente.

> [!CAUTION]
> `SetCfg` consente deliberatamente la condivisione delle configurazioni tra edizioni e versioni del firmware. La compatibilità è vostra responsabilità. Eseguire il backup dei dati di canale/impostazioni importanti prima di aprire una banca con il firmware che può utilizzare un layout di dati diverso.

In UV Studio, `Reset config` cancella la banca di configurazione associata con slot utente `1` a `4` senza cancellare il firmware. Il prossimo avvio utilizzando quella banca ricrea le impostazioni predefinite. `CFG M` è protetto da questo comando; utilizzare la normale procedura di ripristino della fabbrica del firmware per la configurazione principale.

## Note di recupero e sicurezza

* Ogni slot è completamente CRC-checked prima che Flash interno venga cancellato.
* Lo stato di slot/config attivo viene memorizzato in modo ridondante e verificato prima che inizi un ripristino.
* `DO NOT POWER OFF` significa che Flash interno viene riscritto. Interruzione di questa fase può rendere l'applicazione non avviabile e richiedono il normale recupero DFU.
* Se un normale flash del firmware sostituisce l'immagine interna, il prossimo avvio multiboot rileva la modifica e adotta quella immagine come nuovo backup `Main` con `CFG M`.
* Se la radio segnala `STATE ERROR` o `Flash state unknown`, riavvialo. Il firmware si ferma deliberatamente piuttosto che rischiare di scrivere attraverso una mappatura di configurazione incerta.

## Pagine correlate

* [UV Studio](./UV-Studio#firmware-slots)
* [Risultati](./Recent-changes)
* [Menu](./Menu)
* [Overlay app](./Overlay-apps)
* [Risoluzione dei problemi](./Troubleshooting)
