# analizzatore di spettro

## Spettro schermo di nuoto

Premere `F` + `5 NOAA` per attivare l'analizzatore **Spectrum**.
L'attuale frequenza VFO o memoria sarà la frequenza ** center ** dello spettro di scansione.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

L'analizzatore di spettro può anche essere utilizzato con [**ScnRng** mode](./Scanning#scan-frequency-range-function).

> [!NOTE]
> La navigazione utilizza `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1. Il layout attivo segue `SetNav`.

> [!NOTE]
> - `PTT` apre il monitoraggio dei dettagli per l'ultima frequenza ricevuta
> - con `ScnRng`, la blacklist è limitata a 15 frequenze

> [!IMPORTANT]
> **L'analizzatore di spettro non si comporta in modo identico attraverso l'hardware radio.**
> Le radio **V1 / V2** sono costruite intorno al ricevitore **BK4819**, mentre il
> **V3 (K5v3)** usa il **BK4829******. Questi sono diversi chip ricevitore, con un
> diversi front-end, fasi di guadagno LNA/PGA, comportamento AGC e scalabilità RSSI.
>
> Di conseguenza:
> - il pavimento del rumore **, i valori assoluti **dBm / S-meter** e i valori **`LNAs` / `LNA` / `PGA`** non sono direttamente comparabili ** tra un V1/V2 e un V3 — un livello o un'impostazione di guadagno che sembra "giusto" su un V2 non ha motivo di significare la stessa cosa su un V3;
> - l'analizzatore dello spettro è stato **costantemente rielaborato** per supportare entrambe le piattaforme, quindi non aspettatevi che un V3 riproduca, valore per il valore, ciò che avete osservato su un V1/V2 più vecchio;
> - un pavimento di rumore alto o instabile è in gran parte guidato dal ricevitore front-end e dall'ambiente RF locale, non da un bug nell'analizzatore. Quando **AUTO** non può sistemarsi sul pavimento locale, passare a **MANUAL** e impostare il trigger da soli — questo è esattamente ciò che la modalità MANUAL è per.

### Modalità Trigger: AUTO vs MANUAL

Premere `M` per attivare le modalità di attivazione **AUTO** e **MANUAL**. L'indicatore in alto a sinistra mostra la modalità attiva:

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — Modalità AUTO. Il livello di trigger di squelch traccia il pavimento di rumore misurato utilizzando un profilo di sensibilità:
  - `WEAK` — +12 dB sopra il pavimento del rumore (meno sensibile, meno aperture false)
  - `NORM` — +8 dB (default)
  - `STRG` — +5 dB (più sensibile)
  
  Una freccia di direzione viene aggiunta all'etichetta per mostrare la direzione di spazza corrente:
  - `>` — spazzare a sinistra → a destra
  - `<` — spazzare a destra → sinistra
  
  Esempio: `A:NORM>` significa sensibilità AUTO / Normale, spazzando a destra.

- **`M <rssi>/<trig>`** — Modalità MANUALE. Con `*` / `F` si imposta il livello di trigger di squelch e la scala verticale (`dbMax`) con `3` / `9`. Il trigger cambia nei passaggi prevedibili `1 dB`.

Tenere premuto `M` per **ripristinare le impostazioni predefinite dell'analizzatore di spettro**.

### Impostazioni di salvataggio in uscita

Quando si lascia la schermata **Scansione dello spettro** con `EXIT`, l'analizzatore salva le impostazioni persistenti nella memoria Flash. Alla successiva apertura, questi valori vengono ripristinati:

- passo di frequenza tra le barre (`1` / `7`)
- numero di barre / canali (`4`)
- larghezza di banda del ricevitore utilizzato durante il monitoraggio di un segnale (`6`)
- modalità di attivazione, **AUTO** o **MANUAL** (`M` breve)
- Profilo di sensibilità AUTO, **WEAK** / **NORM** / **STRG** (`3` / `9` in modalità AUTO)
- Livello di trigger di squelch (`*` / `F`) — restaurato in modalità **MANUAL**; in **AUTO** il trigger viene ricomputato dal pavimento del rumore ogni volta che si apre l'analizzatore

Questa persistenza è stata ampliata dopo `v5.4.0`: le vecchie costruzioni hanno salvato solo la fase di scansione, il conteggio della barra e la larghezza di banda del ricevitore. Nelle costruzioni attuali, l'avvio dell'analizzatore di spettro dalla modalità `ScnRng` non sovrascrive più la fase di scansione salvata o la preferenza del bar-count; l'intervallo di scansione attivo definisce ancora l'intervallo di spazzata.

La scala verticale (`dbMax`, `3` / `9` in MANUAL) è **non** persiste: viene ripristinata alla finestra di visualizzazione predefinita ogni volta che l'analizzatore viene aperto. La frequenza di spazzamento corrente/finestra, la fase di scorrimento `UP` / `DOWN`, il tipo di modulazione, la regolazione della retroilluminazione, la lista nera temporanea, e le regolazioni del registro di dettaglio-monitor (`LNAs`, `LNA`, `PGA`) non sono anche salvati da questa azione `EXIT`. Se siete sullo schermo **Dettagli Monitor**, `EXIT` prima ritorna alla schermata di scansione; premere `EXIT` di nuovo da lì per salvare e lasciare l'analizzatore.

Le attuali costruzioni migliorano anche l'arrotondamento di frequenza `8.33 kHz` nei flussi di lavoro di banda / spettro, così le frequenze visualizzate e sintonizzate rimangono allineate più prevedibilmente su passaggi di stile aviazione.

### Funzioni del pulsante

| Chiave | Funzione |
| --- | --- |
| `1` / `7` | Aumento / diminuzione della frequenza passo tra le barre |
| `2` / `8` | Aumentare / diminuire la fase di frequenza utilizzata durante lo scorrimento con `UP` / `DOWN` |
| `3` / `9` | In MANUAL: regolare `dbMax` (scala verticale) · In AUTO: profilo di sensibilità del ciclo (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Attivare il numero di barre (canali) nel grafico |
| `5` | Ingresso di frequenza per la frequenza di spazzamento inferiore (valore in **MHz**, `*` = punto decimale) |
| `6` | Cambia la larghezza di banda del ricevitore |
| `0` | Tipo di modulazione (FM / AM / USB) |
| `*` / `F` | Aumento / diminuzione del livello di trigger di squelch in gradini `1 dB` — ha effetto in **MANUAL**; in **AUTO** l'auto-tracker lo sovrascrive sulla prossima spazzata |
| `M` breve | Modalità di attivazione AUTO / MANUAL |
| `M` lungo | Ripristina l'analizzatore di spettro alle impostazioni predefinite |
| `UP` / `DOWN` su UV-K5, o `LEFT` / `RIGHT` su UV-K1 | Spostare la finestra di spazzata su / giù in frequenza · **Durante RX**: interrompere la ricezione e riprendere la spazzata nella direzione selezionata |
| `Side button 1️⃣` | Escludere la frequenza corrente dalla scansione dello spettro |
| `Pulsante laterale 2️⃣` | Attiva o disattiva la retroilluminazione |
| `PTT` | Passare al monitoraggio del dettaglio** dell'ultima frequenza ricevuta |
| `EXIT` | Salvare le impostazioni dello spettro persistente, quindi tornare alla schermata precedente / funzione |

> [!TIP]
> La spazzata alterna direzione su ogni ciclo completo per ridurre il bias direzionale. L'indicatore `<` / `>` accanto a `A:xxxx` consente di vedere a colpo d'occhio quale metà della spazzata è attualmente attiva.

> [!NOTE]
> In modalità MANUAL, la curva dello spettro viene disegnata senza levigatura cosmetica. Questo rende i picchi stretti si allineano più strettamente con il RSSI grezzo utilizzato dal rilevatore di squelch.

## Schermo del monitor
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Funzioni del pulsante
* `M` - scorre attraverso i parametri visualizzati nella parte inferiore dello schermo, che possono essere regolati con i pulsanti `UP` e `DOWN`
   * LNAs - Amplificatore a basso rumore
   * LNA - Amplificatore a basso rumore
   * PGA - Amplificatore di guadagno programmabile
* `Pulsante laterale 1️⃣` - attiva o disattiva la **modalità monitor** (forza lo squelch aperto per ascoltare continuamente la frequenza sintonizzata)
* `EXIT` - uscite alla schermata precedente dell'analizzatore dello spettro

> [!NOTE]
> `LNAs` / `LNA` / `PGA` sono **live valori diagnostici**, non salvate impostazioni. Sono guidati dall'AGC del ricevitore e non sono perseguiti all'uscita. I loro passi disponibili e il loro significato differiscono tra il **BK4819** (V1/V2) e il **BK4829** (V3), quindi non possono essere paragonati al valore per le piattaforme.

## Pagine correlate

* [Per iniziare](./Getting-started)
* [Scansione](./Scanning)
* [ Funzioni pulsanti](./Button-functions)
* [Operazione radio](./Radio-operation)
* [Risoluzione dei problemi](./Troubleshooting)
