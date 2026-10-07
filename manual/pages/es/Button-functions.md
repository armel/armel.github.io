# Funciones de botón

Los botones pueden activar funciones de dos maneras:

1. presione el botón `F #` primero, luego el botón de destino (escrito abajo como `F+`)
2. presionar el botón de destino directamente

En muchos casos, la larga prensa duplica la acción `F+`, pero algunos botones tienen un comportamiento diferente de larga duración.

## Recordatorios rápidos

* `F+` significa: pulsa `F #`, luego pulsa el botón de destino
* etiquetas de navegación pueden ser `UP` / `DOWN` o `LEFT` / `RIGHT`, dependiendo del modelo y `SetNav`
* los atajos programables se enumeran en [Custom botón funciones](#custom-button-functions)
* introducido en Fusion `v5.9.0` y disponible en las ediciones actuales v6, pulsando `F` y luego **guardando** un botón lateral abre el [colector de acción lateral](#side-key-action-picker)

## teclado frontal

### `M`
* prensa corta - introducir menú
* prensa corta mientras el canal / barrido de frecuencia - el último canal encontrado se conserva en la pantalla
* larga prensa mientras el escaneo del canal - excluye temporalmente un canal de memoria (no trabajando con `* SCAN ALL`)
* prensa larga - usuario programable en el menú: `M Long`
### `EXIT`
* prensa corta - sale el menú actual/función, elimina un dígito en una caja de entrada
* prensa larga - elimina todas las entradas, salidas DTMF caja de entrada, salidas modo monitor, salidas `ScnRng`
### `UP` y `DOWN`
* pasar arriba y abajo en menús, frecuencia, ajustes y otras listas
* `F+` - aumenta o disminuye el valor Squelch.
### `1 BAND`
* `F+`
  * en **Modo de frecuencia** - conmuta bandas de frecuencia `1` a `7`; también hay banda `7+` para frecuencias por encima de `1 GHz`
  * en ** modo canal** - los ajustes del canal se copian al modo de frecuencia
* larga prensa
  * en ** modo radio normal** - el mismo
  * en **Modo de transmisión de la FM** - ciclos de frecuencias de transmisión FM; véase [Receptor de radio de la FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - conmuta el VFO principal superior / inferior (marcado por `►`)
* larga prensa - la misma
### `3 VFO/MR`
* `F+` - interruptores entre modo de frecuencia y modo de canal
* larga prensa - la misma
### `4 FC`
* `F+` - se activa la frecuencia y el modo de copia CTCSS. Comience a transmitir con la otra radio y se detectará la frecuencia y el código CTCSS. Puede guardar los ajustes con el botón `M`
* larga prensa - la misma
### `5 NOAA`
* `F+` - activa el analizador de espectro
* larga prensa
   * en ** modo canal** - ciclos el canal de memoria seleccionado a través de su asignación de lista de exploración: `OFF`, `1` a `24`, luego `ALL`
   * en **modo de frecuencia** - activa la función de rango [scan](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - mueve los niveles de potencia para el canal actual
* larga prensa - la misma
### `7 VOX`
* `F+`
  * en la edición `Labs` - abre el lanzador [overlay-app](./Overlay-apps)
  * en construcciones con el juego residente y sin cargador de sobre-app - comienza Breakout
* larga prensa - se activa el modo VOX cuando VOX está habilitado
### `8 R`
* `F+` - permite la gestión manual de retroiluminación y apaga la luz trasera
* prensa larga - gira en modo inverso para canales que tienen un conjunto de compensación de frecuencia. Reemplaza la frecuencia TX con la frecuencia RX
### `9 Call`
* `F+` - deshabilita la gestión manual de retroiluminación
* prensa larga - cambia el canal actual al canal `1-Call` establecido en la radio.
### `0 FM`
* `F+` - enciende la radio FM
* larga prensa - la misma
### `* SCAN`
* prensa corta - entra en modo de entrada DTMF
* `F+` - enciende el escáner DCS / CTCSS para la frecuencia actual
* larga prensa
   * en ** modo canal** - se activa el escáner de canal
   * en **modo de frecuencia** - se activa el escáner de frecuencia (puede utilizar la función de rango [scan](./Scanning#scan-frequency-range-function))
* mientras el análisis de memoria está en progreso, `F+` o `* SCAN` de larga presión cambia a la siguiente lista de exploración no vacía válida
### `F # 🗝`
* prensa corta - cambiar el modificador de función `F+`
* prensa larga - activa la cerradura del teclado en o apagado; el menú `SetLck` selecciona si la cerradura también cubre las acciones de acceso directo programable y/o `PTT`

### Cierre de teclado y SetLck

La cerradura de teclado siempre deshabilita el teclado delantero, excepto que `F #` de larga presión permanece disponible para desbloquear la radio. El menú `SetLck` extiende la cerradura a otros controles:

* `KEYS`: los dos atajos laterales, `M Long` y `PTT` permanecen disponibles
* `KEYS + ACTIONS`: los atajos programables asignados a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` y `M Long` también están deshabilitados; `PTT` permanece disponible
* `KEYS + PTT`: `PTT` también está deshabilitado para prevenir la transmisión accidental; los atajos programables permanecen disponibles
* `KEYS + ACTIONS + PTT`: el teclado delantero, atajos programables, y `PTT` están todos deshabilitados

## Botones laterales

### `PTT`
* Presiona el botón To-Talk. Hay 2 modos: CLASSIC y ONEPUSH (ver el menú `SetPTT`)
  * CLASSIC - PTT funciona como siempre. Presione el PTT para comenzar a transmitir y soltarlo para detenerlo.
  * PTT funciona como un interruptor. Presione el PTT para comenzar a transmitir, y liberarlo cuando quiera. La transmisión sigue activa. Presione el PTT otra vez cuando desee, y luego libere para dejar de transmitir. Funciona como en OpenGD77 (si lo sabes).

* cuando este botón se utiliza para detener el escaneo de canal/frecuencia, el último canal encontrado se conserva en la pantalla
* mantenido junto con `Side button 2️⃣`, transmite el tono `1750 Hz`
* mantenido junto con cualquiera de los botones de teclado delantero transmite códigos DTMF

### `Side button 1️⃣`
* prensa corta - usuario programable en el menú: `F1Shrt`
* prensa larga - usuario programable en el menú: `F1Long`
* `F` luego la prensa corta - aumenta el valor Paso en el modo VFO
* `F` luego espera - abre el picador de acción de tecla lateral

### `Side button 2️⃣`
* prensa corta - usuario programable en el menú: `F2Shrt`
* prensa larga - usuario programable en el menú: `F2Long`
* este botón también se puede utilizar para enviar el tono `1750 Hz` sosteniendolo junto con el botón `PTT`
* `F` luego la prensa corta - disminuye el valor Paso en el modo VFO
* `F` luego espera - abre el picador de acción de tecla lateral

### Picker de acción de tecla lateral

El picador de acción ejecuta un atajo disponible sin cambiar las funciones guardadas en `F1Shrt`, `F1Long`, `F2Shrt` o `F2Long`.

Desde la pantalla de radio normal:

1. Pulse brevemente `F` para que aparezca el indicador `F`.
1. Sostenga el botón lateral 1 / 2 ️ o el botón lateral hasta que se abra el selector.
1. Utilice `UP` / `DOWN` para destacar una acción.
1. Presione `M` para ejecutarlo inmediatamente.

La pantalla muestra la acción anterior, seleccionada y siguiente. `EXIT` o `F` cancela sin ejecutar nada. Presionar `PTT` cierra el picker y continúa con el manejo normal de PTT, por lo que no bloquea una transmisión urgente.

El picker también cierra automáticamente después de aproximadamente cinco segundos, cuando comienza la recepción, si el teclado se bloquea, o cuando otra pantalla toma el control. Cada botón lateral recuerda su última acción de selección destacada para la sesión actual; las selecciones se reinician cuando la radio se reinicia.

El picker enumera las mismas acciones compiladas documentadas a continuación, excepto `NONE`. Se aplican restricciones de acción normales: una acción que no está disponible en el estado de radio actual se niega con el pitido de error habitual.

## Microfono externo
### `PTT`
* Presiona el botón To-Talk.
* El `PTT del micrófono externo` funciona de forma diferente al botón lateral interno `PTT`.

> [!NOTE]
> En algunas revisiones de hardware, el micrófono externo `PTT` se comporta de manera diferente:
> - al presionar el PTT, TX espera hasta que no se reciba señal RX ( observado con revisión de radio PCB V1.4 y OK con V1.6 ). Esto funciona bien con el `PTT` interno
> - un tono DTMF (`key press`) o 1750 Hz (`function button`) se puede cortar en un segundo. Esto funciona bien con el `PTT` interno

## Funciones de botón personalizadas
Cinco acciones de acceso directo se pueden personalizar en el menú:
* `F1Shrt` - botón lateral 1δ⃣, prensa corta
* `F1Long` - botón lateral 1δ⃣, prensa larga
* `F2Shrt` - botón lateral 2δ⃣, prensa corta
* `F2Long` - botón lateral 2δ⃣, larga prensa
* `M Long` - botón de menú, prensa larga

Funciones disponibles:
* NADA - ninguna acción
* FLASH LIGHT - cambiar a la siguiente función de la linterna: ON / OFF
* POWER - conmutar la potencia de salida de radio entre [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITOR - modo de monitor de interruptor encendido / OFF
* SCAN - canales de inicio / exploración de frecuencias
* VOX - función de activación de voz girar ON / OFF
* FM RADIO - enciende la radio FM / OFF
* `1750 Hz` - enviar la explosión de tono `1750 Hz`
* LOCK KEYPAD - bloquear / desbloquear el teclado
* VFO A VFO B - cambiar el VFO principal a la parte superior/ inferior
* VFO MEM - cambiar el modo VFO actual, el modo frecuencia o el modo de canal de memoria
* MODE - cambiar al siguiente modo de demodulación entre [FM / AM / USB]
* RX MODE - conmutar el modo de visualización entre [DW / DWR / XB / MO]
* MAIN ONLY - conmutar el modo de visualización entre [DW / DWR / XB] y MO
* PTT - cambiar el modo PTT CLASSIC / ONEPUSH
* WIDE NARROW - interruptor entre WIDE y NARROW
* MUTE - volumen de altavoz mutes
* RxA - cambiar el perfil de audio RX para la modulación actual: en `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; en `AM`, `SHARP` / `STOCK` / `OPEN`
* POWER HIGH - cambiar temporalmente a la potencia máxima de `5 W`
* REMOVE OFFSET - eliminar temporalmente el offset de un canal de memoria, si está presente
* BEAM - abre el modo de transferencia BEAM, cuando está habilitado en la construcción. BEAM puede enviar la configuración actual VFO/canal de memoria a otra radio o recibir ajustes de otra radio.
* FOX HUNT - abre la aplicación de determinación de direcciones sólo para recibir, cuando residente o disponible como una aplicación Labs instalada.
* BEACON - abre la aplicación independiente Morse beacon, cuando residente o disponible como una aplicación Labs instalada.
* RF LOG - abre el registro de antecedentes RX/TX, cuando está habilitado en la construcción. El registro muestra recientemente recibir, monitorear y transmitir sesiones almacenadas en flash externo.

### Medida BEAM

Asignar `BEAM` a uno de los atajos personalizables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`), y luego activar ese atajo para abrir el modo BEAM.

En modo BEAM:

* `UP` / `DOWN` toggles entre `BEAM TX` y `BEAM RX`
* `M` inicia la operación seleccionada
* `EXIT` deja el modo BEAM

`BEAM TX` envía el VFO actual o configuración del canal de memoria. El paquete incluye la frecuencia RX, offset TX, configuración RX/TX DCS o CTCSS, modulación, ancho de banda, potencia de salida, asignación de listas de escaneo, compander, configuración relacionada con DTMF cuando está activada, y el nombre del canal.

`BEAM RX` espera un paquete BEAM de otra radio. Cuando se recibe un paquete válido, la radio lo guarda al primer canal de memoria gratuito. Si la memoria está llena, el estado muestra `MEM FULL`. Presionando `EXIT` después de un exitoso recibir interruptores al canal recién salvado; de lo contrario restaura el estado VFO / canal anterior.

### Acción FOX HUNT

Asignar `FOX HUNT` a uno de los atajos personalizables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`), luego activar ese atajo para abrir FoxHunt en el VFO seleccionado.

En el modo Fox Hunt:

* `1` se mueve entre la escalera S-meter y el gráfico de historia de señal reciente
* Ciclos `2` entre sonido silencioso, estilo Geiger, y audio de estación recibida
* Ciclos `3` a través de `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` y `BYP+`
* `UP` / `DOWN` cambia la atenuación del receptor directamente
* `M` restablece las referencias pico, mínimo y señal-trend
* sujetando `F` durante aproximadamente 0,5 segundos bloquea o desbloquea los controles FoxHunt; las flechas de atenuación permanecen disponibles mientras se bloquean
* `EXIT` hojas FoxHunt

Ver [FoxHunt](./Fox-Hunt) para las lecturas de pantalla, obtener ajustes, controles y guía de determinación de direcciones.

### Acción BEACON

Asignar `BEACON` a uno de los atajos personalizables, luego activar ese atajo para iniciar la aplicación Beacon independiente. Beacon comienza su primera transmisión inmediatamente.

Las teclas `1`, `2`, `3` y `4` ajustan la ventana TX, intervalo silencioso, identificador de zorros y modo de llave (`TONE` / `CARR`). Mantener `F` durante aproximadamente 0,5 segundos bloquea o desbloquea todos los controles Beacon, incluso durante una transmisión activa. `M` detiene la transmisión actual y comienza un intervalo de ocio fresco; `EXIT` se detiene con seguridad y deja Beacon.

Véase [Beacon](./Beacon) para identificación, tiempo, protección de transmisión, configuración guardada e información de seguridad.

### Acción RF LOG

Asignar `RF LOG` a uno de los atajos personalizables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`), y luego activar ese atajo para abrir el registro de la historia de RX/TX.

Los registros de registro reciben, monitorizan y transmiten sesiones en flash externo. Cada fila de tráfico muestra:

* el nombre del canal, cuando la entrada viene de un canal de memoria; de lo contrario la frecuencia
* si la entrada era `RX` o `TX`
* una placa de índice más reciente
* una placa de detalle que puede mostrar duración, señal / potencia, o tensión de batería

En la pantalla `RF LOG`:

* `UP` / `DOWN` pergaminos a través del registro, las entradas más recientes primero
* `F` + `UP` salta a la entrada más reciente
* `F` + `DOWN` salta a la entrada visible más antigua
* corta presión `M` ciclo el filtro: `ALL`, `RX`, `TX`
* corta presión `* SCAN` ciclos la placa de detalle: duración, RX S-meter / TX nivel de potencia, menor tensión de batería durante la sesión
* `M` de larga duración pide confirmación de despejado del registro; `M` de larga presión de nuevo en `CLEAR LOG / SURE?` aclara el registro
* `EXIT` deja la pantalla del registro, o cancela la confirmación clara

La radio mantiene hasta 512 entradas de tráfico visibles en la vista de registro. Las líneas de separación de sesión marcan la radio reinicia cuando el filtro `ALL` está activo.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Menu](./Menu)
* [Operación radio](./Radio-operation)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Características avanzadas](./Advanced-features)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [Solucionando](./Troubleshooting)
