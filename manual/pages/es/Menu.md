# Operación de menús

El menú se puede acceder con el botón `M`  (principio corto) .

> [!NOTE]
> Navegación utiliza `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1. El diseño activo sigue la opción oculta-menu `SetNav`.

Presentado en Fusion `v5.9.0`, el navegador de categoría se utiliza en las ediciones oficiales `v6.0.0` y `v6.1.0`. Seleccione una categoría con `UP` / `DOWN`, luego presione `M` para abrir su lista de artículos. El elemento seleccionado se muestra en la parte izquierda de la pantalla y su valor actual se muestra a la derecha.

Para encontrar un elemento de menú, busque su categoría o seleccione `All` para usar el menú plano original. También puede introducir el número de elemento **de menú global** en la pantalla de la categoría; por ejemplo, introduzca `52` para acceder a `SysInf`. Interruptores directos de entrada a `All`. Fusion `v5.9.0` utiliza `01` a `77`; `v6.0.0` multiboot-capable añade `SetCfg` y extiende la lista completa a `78`.

Una vez resaltado el elemento del menú deseado, pulsando el botón `M` entra en ese elemento del menú.

Una vez seleccionado el elemento del menú, pulsando los botones de flecha `UP` y `DOWN` ajusta el ajuste para ese elemento. Para confirmar la selección, presione el botón `M`. Para cancelar la selección, pulse `EXIT`.

De una lista de artículos, cortometraje `EXIT` para volver al navegador de la categoría. Pulsa `EXIT` de nuevo para dejar el menú y volver a la pantalla de radio.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Navegador de menú Categorizado

La pantalla de categoría Fusion muestra la categoría anterior, actual y siguiente en la izquierda. El lado derecho muestra cuántos elementos contiene la categoría resaltada.

| Categoría | Artículos Fusion | Índice |
| --- | ---: | --- |
| `Channels` | 21 in v6 | frecuencia paso, potencia, tonos, offset, ancho de banda, canal y configuración de memoria, más `SetCfg` |
| `Scan` | 6 | lista de exploración, canales prioritarios, modo de reanudación y motor de exploración |
| `Keys` | 10 | atajos programables, bloqueo de teclado, modo PTT y canal de llamada |
| `Power` | 4 | ahorrador de batería/display, tiempo de inactividad y protector de pantalla |
| `Display` | 11 | pantalla de canal, pantalla de inicio, retroiluminación y configuración UI |
| `Timers` | 4 | Ajustes de temporizador TX, EOT y RX/TX |
| `Audio` | 5 | microfono, botones de teclado, volumen y perfiles de audio RX |
| `Radio` | 6 | squelch, STE, roger beep, VOX y RX mode |
| `DTMF` | 5 | arriba / abajo códigos, tono lateral, precarga y decodificador en vivo |
| `Service` | 6 | menús de inicio ocultos; sólo visible después del gesto de arranque oculta-menú |
| `All` | 72 normalmente en v6, 78 con servicio | orden plano original y numeración global |

El contador de artículos dentro de una categoría filtrada es local a esa categoría. Utilice `All`, o introduzca un número de la pantalla de la categoría, cuando desee los números globales que se indican a continuación.

El firmware recuerda la última categoría seleccionada y el último elemento destacado en cada categoría para el actual período de sesiones. Estas posiciones de navegación no se guardan a través de un reinicio.

## Consejos rápidos

* en `All`, los primeros 13 elementos son los principales ajustes de VFO/canal en vivo
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` y `ScnRev` son los elementos clave relacionados con el análisis
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` y `M Long` control atajos personalizables
* el menú oculto sólo está disponible en el inicio con `PTT` + `SIDE BUTTON 1️⃣`

## Menú principal

El número delante de cada descripción del elemento del menú es el número de artículo ** menu ** que se puede utilizar para una selección rápida.
1. `Step` - paso de la frecuencia (en kHz), los botones `UP` y `DOWN` cambian la frecuencia por este valor, también sólo puede establecer una frecuencia que es múltiple de la mitad de este valor.
1. `Power` - potencia de salida de radio (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / alta / USUARIO). Tenga en cuenta que la potencia de USUARIO se puede ajustar a través del menú `SetPower`.
1. `RxDCS` - receptor Digital-Coded Squelch. Si permite esto, squelch sólo se desbloqueará si este código está siendo recibido. Puede iniciar un escáner DCS/CTCSS mientras está en esta opción de menú pulsando el botón `* SCAN`.
1. `RxCTCS` - receptor Continuous Tone-Coded Squelch System. Squelch sólo desbloqueará si este código está siendo recibido. Puede iniciar un escáner DCS/CTCSS mientras está en esta opción de menú pulsando el botón `* SCAN`.
1. `TxDCS` - transmisor Digital-Coded Squelch, la radio enviará el código dado al transmitir
1. `TxCTCS` - transmisor Continuous Tone-Coded Squelch System, radio enviará el código dado al transmitir

   En el submenú `RxDCS`, `TxDCS`, `RxCTCS` y `TxCTCS`, la placa superior derecha muestra la entrada seleccionada y su índice homologado:

   * para CTCSS: `NN/HH`, donde `NN` es la posición en la lista completa de 50 toneladas y `HH` es el número de tono homologado. `--` significa que el tono seleccionado es uno de los tonos extras no homologados.
   * para DCS: `NNN/HH`, donde `NNN` es la posición en la lista completa de DCS y `HH` es el número de DCS homologado. `--` significa que la entrada DCS seleccionada no está en la lista de PMR446 homologada.
   * `OFF` se muestra como `00/00` para CTCSS y `000/00` para DCS.
   * Los valores de DCS que terminan en `N` son códigos normales; los valores que terminan en `I` son códigos invertidos. Las entradas de DCS invertidas se muestran en la lista completa, pero no reciben un índice homologado y por lo tanto muestran `--`.

1. `TxODir` - dirección offset frecuencia transmisor
1. `TxOffs` - valor offset frecuencia transmisor
1. `W/N` - ancho de banda utilizado por transceptor
   * WIDE - `25 kHz`
   * NARROW - `12.5 kHz`
1. `BusyCL` - bloqueo de canal ocupado, bloquea la radio de transmisión cuando se recibe la señal
1. `Compnd` - compander (compressor / expander), permite que las señales con un gran rango dinámico se transmitan sobre instalaciones que tienen una capacidad de rango dinámico más pequeña, mejora la calidad de audio, ambas radios deben utilizar esta opción
1. `Mode` - modo de demodulación, por defecto es FM, AM / USB se puede utilizar para escuchar sólo
1. `TXLock` - activar o desactivar el modo de transmisión del canal (si no está cubierto por el plan `F Lock`)
1. `ChList` - selección de la lista de exploración del canal de memoria
1. `ChSave` - guardar el ajuste actual a un canal de memoria
1. `ChDele` - eliminar el canal de memoria
1. `ChName` - modificar el nombre del canal de memoria
   * Utilice los botones `UP` y `DOWN` para seleccionar un canal para editar
   * Pulse el botón `M` de nuevo para introducir el modo de nombre de edición
   * Utilice las teclas de número en modo multitap para editar el personaje actual, como en teléfonos móviles antiguos
     * presione de nuevo la misma clave para el ciclo a través de las letras y el número asignado a ella (`2` = `a`, `b`, `c`, `2`, etc.)
     * presionar una tecla número para introducir el número correspondiente directamente
     * `F` de presión corta para cambiar entre la maleta inferior y la maleta superior (`abc` / `ABC`)
     * `F` de larga duración para introducir `#`
     * corto de presión `* SCAN` para entrar `-`, o larga presión para entrar `*`
     * corto-presione `0` para entrar en un espacio, luego presione de nuevo para entrar `0`
   * Usted todavía puede utilizar los botones `UP` y `DOWN` para navegar a través de los caracteres disponibles manualmente
   * Presione el botón `M` para moverse a la siguiente posición de carácter
   * Repita por encima de dos pasos hasta llegar al final
   * Cuando "Sure?" aparece, presiona el botón `M` para guardar, o Exit para cancelar
   * pulse brevemente `EXIT` para retroceder un carácter; desde la primera posición, sale de la edición del nombre
   * mantenga pulsado `EXIT` para cancelar la edición y volver al menú principal.
1. `ScList` - selecciona la lista de escaneado utilizada para el escaneo del canal: `01` a `24`, `ALL`, y, comenzando con `v6.1.0`, `MIX`.
   * `MIX` combina una selección guardada de listas numeradas sin cambiar la lista asignada a cada canal.
   * Seleccione `MIX` y presione `M` para abrir su editor.
   * Utilice las teclas de navegación o introduzca `01` a `24` para seleccionar una lista, luego presione `M` para cambiarla.
   * Presione `EXIT` para salvar. Al menos una lista debe permanecer seleccionada.
   * Ver [lista de escáneres MIX](./Scanning#mix-scan-list-v610) para un comportamiento completo.
1. `ScPri` - permite / deshabilita el soporte de canales prioritarios durante el análisis.
1. `PriCh1` - establece el canal prioritario 1⃣
1. `PriCh2` - establece el canal de prioridad 2⃣
1. `ScnRev` - modo de reanudar el análisis
   * CARRIER - después de la señal desaparece, pausa para [250 milisegundos a 20 segundos] antes de reanudar el escaneo
   * PASO - después de recibir una señal, detenga el escaneo
   * TIMEOUT - resumir el escaneo después de [5 segundos a 2 minutos] pausa
1. `F1Shrt` - `SIDE BUTTON 1️⃣` función de prensa corta
1. `F1Long` - `SIDE BUTTON 1️⃣` función de prensa larga
1. `F2Shrt` - `SIDE BUTTON 2️⃣` función de prensa corta
1. `F2Long` - `SIDE BUTTON 2️⃣` función de prensa larga
1. `M Long` - `M` botón función de prensa larga
1. `KeyLck` - opción de bloqueo de teclado automático (OFF o 15 segundos a 10 minutos antes del bloqueo de teclado automático)
1. `TxTOut` - límite máximo de tiempo de transmisión
1. `BatSav` - opción de ahorro de batería, una tasa entre tiempo activo y tiempo de sueño (OFF, 1:1 a 1:5)
1. `BatTxt` - valor adicional de la batería en la barra de estado (`NONE`, `VOLTAGE`, o `PERCENT`)
1. `Mic` - sensibilidad del micrófono
1. `MicBar` - barra de micrófono que aparece al transmitir 
1. `ChDisp` - estilo de visualización de canales
1. `POnMsg` - modo de pantalla de inicio
   * `ALL`: mostrar el mensaje de bienvenida configurado, voltaje y información de firmware/versión
   * `SOUND`: mantener el comportamiento normal de sonido de arranque sin pantalla de bienvenida
   * `MESSAGE`: mostrar el mensaje de bienvenida configurado solamente
   * `VOLTAGE`: mostrar el voltaje de la batería y el porcentaje estimado
   * `LOGO`: mostrar el logotipo personalizado de arranque 128x64 subido con [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: saltar la pantalla de inicio
1. `BLTime` - duración de la luz trasera
1. `BLMin` - brillo mínimo de retroiluminación, cuando el retroiluminado de pantalla gira OFF va a dim a este valor
1. `BLMax` - brillo de retroiluminación máxima, cuando la luz trasera de la pantalla se enciende sobre él se volverá brillante a este valor
1. `BLTxRx` - activación de la luz trasera en TX o RX
1. `Beep` - sonido de abeto de prensa teclado
1. `Roger` - roger beep al final de la transmisión
1. `STE` - squelch eliminator de cola, elimina el ruido al final de una transmisión
1. `RP STE` - repetidor squelch eliminador de cola
1. `1 Call` - canal de llamada de una tecla; le permite cambiar rápidamente a ese canal con el botón `9 Call`
1. `UPCode` - Código DTMF que se envía al comienzo de la transmisión
1. `DWCode` - Código DTMF que se envía al final de una transmisión
1. `PTT ID` - establece si `UPCode` y/o `DWCode` debe ser transmitido
1. Interruptor de tono lateral `D ST` - DTMF; permite escuchar tonos transmitidos a través del altavoz de radio
1. `D Prel` - DTMF tiempo de pre-carga
1. `D Live` - muestra los códigos DTMF recibidos por radio en el centro de la pantalla
1. `VOX` - nivel de sensibilidad TX activado por voz
1. `SysInf` - información del sistema. En la actual F4HWN construye este artículo está paginado: ingrese con `M`, luego utilice `UP` / `DOWN` para moverse entre páginas.
   * identidad: autor de firmware, versión y edición
   * `BUILD`: construir fecha, construir tiempo y comprometer identificador
   * `BATTERY`: tensión de batería medida, porcentaje de batería estimado y tipo de batería/profile seleccionado
   * `MEMORY`: Uso FLASH y SRAM, cuando la página de memoria está habilitada en la construcción
   * `CODE` / `WIKI`: códigos QR para enlaces de proyectos, cuando las páginas de código QR están habilitadas en la construcción
1. `RxMode` - establece cómo se utiliza la frecuencia superior e inferior
   * SOLAMENTE - siempre transmite y escucha la frecuencia principal (`MO`)
   * DUAL RX RESPOND - escucha ambas frecuencias, si la señal es recibida en la frecuencia secundaria se bloquea a ella por un par de segundos para que pueda responder a la llamada (`DWR`)
   * CROSS BAND - siempre transmite en la primaria y escucha en la frecuencia secundaria (`XB`)
   * MAIN TX DUAL RX - siempre transmite en la primaria, escucha ambos (`DW`)
1. `Sql` - nivel de sensibilidad squelch
1. `SetPwr` - sets USER Power
   * LOW 1 (traducido ~20 mW)
   * LOW 2 (~125 mW)
   * LOW 3 (~250 mW)
   * LOW 4 (~500 mW, límite superior bajo la banda PMR...)
   * LOW 5 (~1 W)
   * MID (~2 W)
   * ALTO (~5 W)
1. `SetPTT` - establece el uso de PTT
   * CLASE
   * ONEPUSH
1. `SetTOT` - conjunto de alerta TOT
   * OFF
   * SOUND
   * VISUAL
   * TODOS ( VISUAL + SOUND )
1. `SetEOT` - establece alerta EOT (útil para pausas entre 2 transmisiones)
   * OFF
   * SOUND
   * VISUAL
   * TODOS ( VISUAL + SOUND )
1. `SetCtr` - conjunto de contraste LCD
1. `SetInv` - establece LCD invertido (mejor para la visión nocturna)
1. `SetLck` - selecciona lo que está deshabilitado mientras que el bloqueo del teclado está activo
   * `KEYS`: bloquear el teclado delantero; acciones programables de acceso directo y `PTT` permanecer disponible
   * `KEYS + ACTIONS`: también bloquear las acciones programables asignadas a los dos botones laterales y `M Long`; `PTT` permanece disponible
   * `KEYS + PTT`: también bloquear `PTT` para prevenir la transmisión accidental; las acciones de acceso directo programables permanecen disponibles
   * `KEYS + ACTIONS + PTT`: Cierre el teclado delantero, acciones programables de atajo, y `PTT`

   En cada modo, presiona `F #` para desbloquear la radio. Ver [Características de botón](./Button-functions#keypad-lock-and-setlck) para más detalles.
1. `SetMet` - sets Diseño S-Meter
   * CLASE
   * TINY (como en el Yaesu FT4 o FT-65, por ejemplo)
1. `SetGUI` - sets Diseño GUI
   * CLASSIC (gran fuente, menos información mostrada)
   * TINY (smaller fuente, más información mostrada)
1. `SetRxA` – establece el perfil de audio RX para la modulación actual

   Perfiles `FM`:

   - `FLAT`: Ganancia de salida más baja (BK4829-safe). Más neutral, mejor para ambientes tranquilos.
   - `CLEAN`: Perfil equilibrado predeterminado. Audio cómodo con ganancia moderada.
   - `MID`: Mayor ganancia que CLEAN sin la agresividad de BOOST.
   - `BOOST`: Perfil de voz para señales débiles / ambientes ruidosos. Ganancia superior, más audio "presente".
   - `MAX`: Ganancia máxima de salida (puede distorsionar las señales fuertes o los pequeños altavoces). El mejor adecuado para un altavoz externo.

   Perfiles `AM`:

   - `SHARP`: filtro FI estrecho con baja ganancia. Más selectivo, con mejor rechazo al canal adyacente. Puede sonar más duro o un poco distorsionado en señales fuertes, pero se mantiene claro.
   - `STOCK`: busca mantenerse lo más cerca posible del comportamiento del firmware original.
   - `OPEN`: filtro FI más ancho con mayor ganancia. Más abierto y agradable en señales débiles, pero algunas recepciones pueden sonar un poco desconcertado, especialmente ATC.
1. `SetTmr` - establece si los temporizadores RX y TX se muestran
1. `SetOff` - establece el retraso antes de que el transceptor entra en sueño profundo (OFF o 1 minuto a 2 horas)
1. `SetNFM` - establece Narrow FM a Narrow o Narrower
1. `SetVol` - establece la ganancia del volumen de audio para la salida del altavoz fino
1. `SetKey` - establece la clave para activar el modo RescueOps al iniciar el transceptor
1. `SetScn` - establece el [modo del motor escan](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL`: utiliza la ruta estándar de exploración.
   * `FAST`: utiliza la nueva vía de exploración rápida. El firmware pre-prueba varias frecuencias/canales con RSSI antes de hacer la configuración completa de recibir, salta los lotes silenciosos más rápido, refina los candidatos cercanos en pasos finos, y utiliza un pequeño reloj para reanudar si el bucle de exploración se fija.
1. `SetSav` - establece el [protector de pantalla](./Radio-operation#screen-saver-and-backlight-timeout) utilizado después del tiempo de retroiluminación, cuando está habilitado en la construcción.
   * `OFF`: sin protector de pantalla
   * `LOGO`: mostrar el logotipo de arranque personalizado como una pantalla de ocio
   * `LOGO+`: mostrar el logotipo de arranque personalizado con un efecto de desplazamiento
   * `MATRIX`: mostrar una pantalla idle animada de estilo matriz

   `SetSav` está activo sólo cuando `BLTime` utiliza una duración de la luz trasera temporizada. Se suspende durante RX, TX, PTT, BEAM y el escaneo FM activo.
1. `SetCfg` - selecciona el banco de configuración utilizado por el firmware de ejecución en Multiboot-capable `v6.0.0` construye.
   * `CFG M`: Banco de configuración principal
   * `CFG 1` a `CFG 4`: bancos de configuración asociados con ranuras de firmware 1 a 4

   Presione `M` dos veces para confirmar un banco diferente. La radio se reinicia para que el banco sea mapeado antes de que se cargue cualquier canal o configuración. La ranura de firmware no cambia. Confirmar el banco que ya está en uso es un no-op. Véase [Multiboot y Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Menú oculto

El menú oculto se activa con `PTT` + `SIDE BUTTON 1️⃣` mientras se gira en la radio, luego libera todas las teclas.

73. `F Lock` - establece el plan de banda de frecuencia TX.
    * DEFAULT+ (137-174, 400-470) - permite TX en bandas predeterminadas, más opciones `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144-148, 420-450)
    * CA HAM (144-148, 430-450)
    * CE HAM (144-146, 430-440)
    * GB HAM (144-148, 430-440)
    * (137-174, 400-430)
    * (137-174, 400-438)
    * PMR 446
    * GMRS FRS MURS
    * DISCABLE TODO - deshabilita TX en todas las frecuencias
    * UNLOCK ALL - permite TX en todas las bandas. Tiene una cerradura adicional; vea [cómo activar](./Advanced-features#tx-on-all-bands).
74. `350 En` - permite RX en `350 MHz`
75. `BatCal` - calibración de tensión de batería. Compare el voltaje mostrado con un multimetro y ajustarlo hasta que coincida lo más de cerca posible
76. `BatTyp` - tipo de batería / curva de descarga utilizada para el cálculo del porcentaje de batería. Afecta a `%`, no al voltaje medido en sí mismo
77. `SetNav` - configura el tipo de navegación (UP/DOWN para UV-K5, LEFT/RIGHT para UV-K1)
78. `Reset` - reinicia la configuración de la radio
   * VFO - elimina sólo la configuración del canal
   * ALL - reinicia todo (configuración de canales y radio)

En la pantalla de menú categorizada, estas seis entradas aparecen en la categoría `Service`. También se adjuntan a `All`, donde un `v6.0.0` multiboot-capable funciona a través de `78/78`. En `v5.9.0`, que no tiene `SetCfg`, las entradas ocultas conservan números `72` a `77`.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [UV Studio](./UV-Studio)
* [Operación radio](./Radio-operation)
* [Scanning](./Scanning)
* [ Funciones de botón](./Button-functions)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [Características avanzadas](./Advanced-features)
* [Solucionando](./Troubleshooting)
