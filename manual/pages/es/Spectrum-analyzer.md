# Analizador de espectros

## Pantalla de barrido del espectro

Presione `F` + `5 NOAA` para encender el analizador **Spectrum**.
El VFO actual o frecuencia de memoria será la frecuencia ** centro ** del barrido del espectro.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

El analizador de espectro también se puede utilizar con [**ScnRng** modo](./Scanning#scan-frequency-range-function).

> [!NOTE]
> Navegación utiliza `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1. El diseño activo sigue `SetNav`.

> [!NOTE]
> - `PTT` abre el monitoreo de detalles para la última frecuencia recibida
> - con `ScnRng`, la lista negra se limita a 15 frecuencias

> [!IMPORTANT]
> **El analizador de espectro no se comporta de forma idéntica a través de hardware de radio.**
> Las radios **V1 / V2** se construyen alrededor del receptor **BK4819**, mientras que el
> **V3 (K5v3)** utiliza el **BK4829**. Estos son diferentes chips de receptor, con un
> diferentes etapas de ganancia, LNA/PGA, comportamiento AGC y escalado RSSI.
>
> Como resultado:
> - el piso ** ruido**, los valores absolutos **dBm / S-meter** lecturas y los valores **`LNAs` / `LNA` / `PGA`** no son directamente comparables** entre un V1/V2 y un V3 - un nivel o ajuste de ganancia que se ve "correcto" en un V2 no tiene ninguna razón para significar lo mismo en un V3;
> - el analizador de espectro fue **sustancialmente reelaborado** para apoyar ambas plataformas, así que no espere que un V3 reproducir, valor para valor, lo que observó en un V1/V2 antiguo;
> - un suelo de ruido alto o inestable es impulsado en gran medida por el receptor frontal y el entorno RF local, no por un fallo en el analizador. Cuando **AUTO** no puede establecerse en su piso local, cambiar a **MANUAL** y configurar el gatillo usted mismo — eso es exactamente lo que el modo MANUAL es para.

### Modos de desencadenante: AUTO vs MANUAL

`M` de presión corta para cambiar entre **AUTO** y **MANUAL** modos de activación. El indicador superior izquierda muestra el modo activo:

- **`A:NORM`** / **`A:WEAK`** / **`A:STRG`** — modo AUTO. El nivel del disparador squelch rastrea el suelo de ruido medido utilizando un perfil de sensibilidad:
  - `WEAK` — +12 dB sobre suelo de ruido (menos sensibles, menos aberturas falsas)
  - `NORM` — +8 dB (por defecto)
  - `STRG` — +5 dB (más sensible)
  
  Una flecha de dirección se adjunta a la etiqueta para mostrar la dirección de barrido actual:
  - `>` — barrido a la izquierda → derecha
  - `<` — barrer a la derecha → izquierda
  
  Ejemplo: `A:NORM>` significa AUTO / Sensibilidad normal, barriendo a la derecha.

- **`M <rssi>/<trig>`** — modo MANUAL. Usted establece el nivel de gatillo squelch con `*` / `F`, y la escala vertical (`dbMax`) con `3` / `9`. El gatillo cambia en pasos predecibles `1 dB`.

Mantenga pulsado `M` para **restablecer los ajustes predeterminados del analizador de espectro**.

### Ajustes de ahorro en la salida

Al salir de la pantalla **Barrido del espectro** con `EXIT`, el analizador guarda sus ajustes persistentes en la memoria Flash. La próxima vez que lo abra, estos valores se restaurarán:

- paso de frecuencia entre barras (`1` / `7`)
- número de bares / canales (`4`)
- receptor ancho de banda utilizado mientras monitoriza una señal (`6`)
- modo de disparador, **AUTO** o **MANUAL** (`M` corto)
- Perfil de sensibilidad AUTO, **WEAK** / **NORM** / **STRG** (`3` / `9` en modo AUTO)
- squelch trigger level (`*` / `F`) — restaurado en modo **MANUAL**; en **AUTO** el gatillo se recomienda desde el suelo de ruido cada vez que se abre el analizador

Esta persistencia se amplió después de `v5.4.0`: las construcciones más antiguas guardan sólo el paso del escaneo, el recuento de barras y el ancho de banda del receptor. En las construcciones actuales, iniciar el analizador de espectro del modo `ScnRng` ya no sobrescribe el paso del escaneo guardado o la preferencia de la cuenta de barras; el rango de escaneo activo todavía define el lazo de barrido.

La escala vertical (`dbMax`, `3` / `9` en MANUAL) es **no** persiste: se restablece a la ventana de visualización predeterminada cada vez que se abre el analizador. La frecuencia de barrido actual/ventana, el paso de desplazamiento `UP` / `DOWN`, tipo de modulación, retroiluminación, lista negra temporal y ajustes de registro de monitores de detalle (`LNAs`, `LNA`, `PGA`) tampoco se guardan por esta acción `EXIT`. Si está en la pantalla **Detail Monitor**, `EXIT` vuelve primero a la pantalla de barrido; presione `EXIT` de nuevo desde allí para guardar y dejar el analizador.

Las construcciones actuales también mejoran el redondeo de frecuencia `8.33 kHz` en los flujos de trabajo de bandascopio / espectro, por lo que las frecuencias mostradas y sintonizadas permanecen alineadas más previsiblemente en pasos de estilo de aviación.

### Funciones de botón

| Clave | Función |
| --- | --- |
| `1` / `7` | Aumentar / disminuir el paso de frecuencia entre barras |
| `2` / `8` | Aumentar / disminuir el paso de frecuencia utilizado cuando se desplaza con `UP` / `DOWN` |
| `3` / `9` | En MANUAL: ajuste `dbMax` (escala vertical) · En AUTO: perfil de sensibilidad del ciclo (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Cambia el número de barras (canales) del gráfico |
| `5` | Entrada de frecuencia para la frecuencia de barrido inferior (valor en **MHz**, `*` = punto decimal) |
| `6` | Cambia el ancho de banda del receptor |
| `0` | Cambia el tipo de modulación (FM / AM / USB) |
| `*` / `F` | Incrementar / disminuir el nivel de activación de squelch en los pasos `1 dB` — toma efecto en **MANUAL**; en **AUTO** el auto-tracker lo anula en el siguiente barrido |
| Pulsación breve de `M` | Alterna entre los modos de activación AUTO y MANUAL |
| `M` de largo | Reiniciar el analizador de espectro a predeterminados |
| `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1 | Cambie la ventana de barrido hacia arriba / hacia abajo en frecuencia · **Durante RX**: parar la recepción y reanudar el barrido en la dirección elegida |
| `Side button 1️⃣` | Excluir la frecuencia actual de la exploración del espectro |
| `Botón lateral 2️⃣` | Activa o desactiva la retroiluminación |
| `PTT` | Interruptor a ** monitoreo de cola** de la última frecuencia recibida |
| `EXIT` | Guardar la configuración del espectro persistente, luego volver a la pantalla anterior / función |

> [!TIP]
> El barrido alterna la dirección en cada ciclo completo para reducir el sesgo direccional. El indicador `<` / `>` junto a `A:xxxx` le permite ver de un vistazo que la mitad del barrido está actualmente activo.

> [!NOTE]
> En el modo MANUAL, la curva de espectro se dibuja sin suavizar cosmético. Esto hace que los picos estrechos se alinean más de cerca con el RSSI crudo utilizado por el detector de squelch.

## Pantalla Monitor de detalle
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Funciones de botón
* `M` - desplazamientos a través de los parámetros mostrados en la parte inferior de la pantalla, que se pueden ajustar con los botones `UP` y `DOWN`
   * LNAs - Amplificador de bajo ruido corto
   * LNA - Amplificador de ruido bajo
   * PGA - Amplificador de ganancia programable
* `Botón lateral 1️⃣` - activa o desactiva el **modo monitor** (mantiene abierto el silenciador para escuchar continuamente la frecuencia sintonizada)
* `EXIT` - salidas a la pantalla anterior del analizador de espectro

> [!NOTE]
> `LNAs` / `LNA` / `PGA` son valores de diagnóstico en vivo**, no ajustes guardados. Son impulsados por el AGC del receptor y no se persisten en la salida. Sus pasos disponibles y su significado difieren entre el **BK4819** (V1/V2) y el **BK4829** (V3), por lo que no pueden comparar el valor para el valor a través de las plataformas.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Scanning](./Scanning)
* [ Funciones de botón](./Button-functions)
* [Operación radio](./Radio-operation)
* [Solucionando](./Troubleshooting)
