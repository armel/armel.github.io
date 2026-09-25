# Cambios recientes

Esta página resume la última versión estable de `v6.1.0` y los principales cambios visuales de los usuarios en versiones anteriores.

Para el archivo de lanzamiento oficial, vea la página [GitHub libera](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## Aspectos destacados de la v6.1.0

`v6.1.0` es la última versión estable. Se centra en la transferencia de datos más rápida y segura, el nuevo modo `MIX`-list, el mantenimiento Labs ampliado a través de UV Studio, y varias soluciones de confiabilidad.

### Paquete de liberación

Descargar firmware y los archivos acompañantes de la [v6.1.0 página de lanzamiento](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). La versión proporciona las cuatro ediciones oficiales —`Fusion`, `FieldOps`, `Transfer` y `Labs`— más el controlador compartido de CHIRP. Elija la edición por la capacidad en lugar de tratar Fusion como un paquete que contiene cada característica especializada.

### Actualización de v6.0.0

1. Con el viejo firmware todavía instalado, descargar la radio utilizando su controlador CHIRP coincidente y guardar esa imagen. Opcionalmente exportar las filas de memoria canal a CSV.
1. Retrocede la calibración específica del dispositivo de la radio con [UV Studio](./UV-Studio#calibration).
1. Flash la edición `v6.1.0` elegida. Realizar un reajuste de fábrica sólo si las instrucciones de liberación o la ruta de migración de su versión instalada explícitamente lo requiere.
1. Cargue el controlador `v6.1.0` CHIRP dedicado y descargue una imagen fresca de la radio actualizada.
1. Copia las viejas filas de canales en esa imagen fresca en lugar de subir la imagen de configuración vieja completa.
1. En Labs, seleccione `v6.1.0` en el catálogo de aplicaciones versionado de UV Studio. Sustitúyase cualquier aplicación que el cargador reporte como incompatible.
1. Antes de utilizar AirCopy, actualice ambas radios a firmware compatible con `v6.1.0`; su protocolo de radio optimizado no es compatible con cables con versiones anteriores.

Para una copia de seguridad adicional después de instalar `v6.1.0` Labs, UV Studio puede guardar el Flash externo completo. Véase [Elige la copia de seguridad correcta o copia](./UV-Studio#choosing-the-right-backup-or-copy).

### AirCopy rendimiento y clonación de cables

El protocolo `v6.1.0` AirCopy envía hasta tres bloques `64-byte` en un marco de FSK, reduciendo la rotación y haciendo transferencias de radio aproximadamente dos veces más rápido. Compara los hashes de CRC32 en grupos de hasta bloques `24` y envía sólo bloques que difieren en el objetivo.

La edición `Transfer` también añade `CABLE COPY` sobre UART y una selección `Flash 2M` solo por cable para la clonación de Flash externo mientras excluye el sector de calibración específico del dispositivo. Las selecciones del remitente y del receptor se validan antes de que se escriban los datos.

Este es un nuevo protocolo: ambas radios deben ejecutar el mismo firmware compatible. Véase [AirCopy](./AirCopy#v610-improvements).

### Lista de exploración MIX

El nuevo modo `MIX` escanea una selección guardada de listas `01` a `24` como un conjunto combinado. Seleccione `MIX` en `ScList`, presione `M` para abrir el editor, cambiar listas con `M`, y guardar con `EXIT`. El editor muestra el número de listas seleccionadas, y por lo menos una lista debe permanecer habilitada.

Durante un análisis de memoria activo, introducir `25` selecciona `MIX`; `00` sigue seleccionando `ALL`. Véase [Scanning](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` añade respaldo completo `2 MiB` externo-Flash y restaura para Labs. La restauración preserva el sector de calibración específico del dispositivo, salta los sectores `4 KiB` idénticos utilizando CRC32 cuando se admite, verifica cada sector escrito y reinicia la radio cuando se termina.

Una nueva recuperación guiada de fábrica-software verifica imágenes agrupadas por tamaño y SHA-256, restaura una imagen reconstruida externa-Flash mientras preserva la calibración, entonces se solicita para el modo DFU e instala el firmware de acciones UV-K1 o UV-K5 V3. La interfaz también agrupa las operaciones de calibración y de arranque en copias de seguridad más claras o restauran o descargan/cargan vistas.

Estas herramientas de Flash externo requieren `v6.1.0` Labs. Consulte [UV Studio](./UV-Studio#version-status), [copia de seguridad y restauración del Flash externo](./UV-Studio#external-flash-backup-and-restore-v160) y [restauración del software de fábrica](./UV-Studio#factory-software-restoration-v160).

### Otros cambios v6.1.0

La versión también añade los juegos de superposición [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll), y [`Space Impact`](./Overlay-applications#space-impact) más correcciones que implican RF Log a través de bancos de configuración, almacenamiento de aplicaciones superpuestas, calibración limpiada, y manejo de cola de esqueleto DCS.

## Aspectos destacados de la v6.0.0

`v6.0.0` fue liberado el 10 de septiembre de 2026. Introdujo cuatro ediciones oficiales, Multiboot y Multiconfig, la plataforma Labs overlay-app, fiable AirCopy, y aplicaciones independientes FoxHunt y Beacon.

### Cuatro ediciones oficiales

| Edición | Uso previsto | Características adicionales |
| --- | --- | --- |
| `Fusion` | uso cotidiano | edición de referencia equilibrada; recomendado para la mayoría de los usuarios |
| `FieldOps` | y trabajo de primer nivel | RescueOps, residente FoxHunt y residente Beacon |
| `Transfer` | transferencia de datos de radio a radio | AirCopy y residente Beam |
| `Labs` | experimentación | RescueOps, AirCopy y aplicaciones de superposición incluyendo FoxHunt, Beacon y Beam |

Fusion `v6.0.0` ya no incluye las funciones especializadas v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon, o Breakout. Elige la edición especializada adecuada cuando se necesite una de esas capacidades.

### Aplicaciones independientes FoxHunt y Beacon

La anterior acción combinada `FOX HUNT / BEACON` se dividió antes de la liberación `v6.0.0`. `FOX HUNT` y `BEACON` son acciones programables separadas, aplicaciones residentes separadas en FieldOps y aplicaciones de superposición separadas en Labs.

Véase [FoxHunt](./Fox-Hunt) y [Beacon](./Beacon).

### Multiboot

Las ediciones compatibles pueden almacenar cuatro imágenes adicionales de firmware F4HWN en Flash externo. Sostenga `M` (`MENU`) por sí mismo mientras cambia la radio para abrir el selector de arranque, validar las imágenes almacenadas, y restaurar `Main` o ranura `1` a `4`.

El firmware protege automáticamente la imagen normalmente flashed como `Main`, verifica el CRC completo de una ranura antes de borrar Flash interno, y registra su estado activo redundantemente. La vista `Firmware Slots` de UV Studio instala, verifica, nombres y borra las cuatro ranuras de usuario mientras que la radio está en modo normal.

Sólo las imágenes multiboot-capable `v6.0.0` o nuevas F4HWN deben instalarse en estas ranuras. Véase [Multiboot y Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig y SetCfg

Cada ranura firmware selecciona un banco de configuración por defecto. Por lo tanto, los canales de memoria, los nombres de los canales, los VFO, las listas de escaneo y los ajustes de radio permanecen aislados al cambiar las ediciones. La calibración, el logotipo de arranque, las ranuras de firmware/app, el estado Multiboot y el registro RF siguen siendo compartidos.

El nuevo menú `SetCfg` puede emparejar deliberadamente el firmware con otro banco. `SysInf` muestra placas independientes `SLOT` y `CFG`, y UV Studio puede restablecer la configuración de una ranura de usuario sin borrar su firmware.

Véase [Multiboot y Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) y [Menu](./Menu).

### Fiable AirCopy con reconocimientos

Air Copy ahora espera un reconocimiento después de cada bloque. El receptor verifica el paquete antes de escribirlo y puede solicitar un reenvío; el remitente retrata bloques perdidos, dañados o no reconocidos hasta tres veces. Los bloques duplicados son reconocidos con seguridad, por lo que un ACK perdido ya no desincroniza la transferencia.

Una nueva opción `All (Mem+Set)` transfiere los ocho bancos y Ajustes de 128 canales en un solo funcionamiento continuo. La pantalla reporta progreso `TX`/`RX` más retry o cuenta de error.

Véase [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Aplicaciones superpuestas en Labs

La edición experimental `Labs` puede instalar pequeños programas `.app` en Flash externo y ejecutarlos desde una superposición de RAM `4 KiB` revisada. UV Studio's `Apps` vista, marcado `Labs only`, instala, verifica, lista y elimina aplicaciones; `F + 7` abre el lanzador en radio.

El cargador valida el formato de aplicación, compatibilidad con ABI/API, capacidades requeridas, dirección RAM, tamaño y código CRC antes de la ejecución. Las aplicaciones disponibles incluyen herramientas de radio como Broadcast FM, FoxHunt, Beacon y Beam, más Breakout, Tetris, Cube3D y Plasma.

Ver [Overlay apps](./Overlay-apps) para instalación y compatibilidad, y [Overlay applications](./Overlay-applications) para el propósito y los controles de cada aplicación.

### Modo de teclado Beacon (TONE / CARR)

Beacon obtiene un ajuste de movimiento de teclado en la tecla `4`. `TONE` (predeterminado) es el comportamiento anterior: un portador FM continuo con el tono `1000 Hz` clave para cada elemento Morse (MCW / F2A). `CARR` interrumpe el propio transportista para cada elemento, reproduciendo el patrón interrumpido por el transportista que usan muchos zorros ARDF en el campo: la señal desaparece entre elementos, haciendo que la dirección encuentre más difícil y dejando que un simple receptor AM la copia. El ajuste se guarda e incluye en las transferencias AirCopy, y está disponible tanto en el residente como en la superposición Beacon. Véase [Beacon](./Beacon#timing-and-keying).

## Aspectos destacados de la v5.9.0

Estos cambios fueron desarrollados después de `v5.8.0` y liberados en `v5.9.0`.

### Navegador de menú Categorizado

El desarrollo Fusion crea abrir el menú en una pantalla de categoría en lugar de mostrar inmediatamente la lista plana original. Las categorías disponibles son `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` y `DTMF`. La startup de menu oculto también añade una categoría `Service`.

La categoría `All` mantiene el orden plano original y la numeración global. Entrar un número de menú directamente desde la pantalla de la categoría también cambia a `All`, por lo que los atajos numerados-menu existentes siguen funcionando. El firmware recuerda la última categoría seleccionada y el último artículo utilizado en cada categoría para el actual período de sesiones.

Véase [Menu](./Menu#categorized-menu-browser).

### Picker de acción de tecla lateral

Después de presionar `F`, sostenga el botón lateral para abrir un picker de acción temporal. Utilice `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1, para navegar por las acciones de acceso rápido compiladas disponibles y pulse `M` para ejecutar la acción resaltada. `EXIT` o `F` cancela el picker; pulsando `PTT` lo cierra y continúa con el manejo normal de transmisión.

El picker cierra automáticamente después de aproximadamente cinco segundos o cuando la recepción comienza. Cada botón lateral recuerda su última selección de picker hasta que la radio se reinicia. Un corto `F` + prensa de botón secundario mantiene su comportamiento de paso / paso a paso.

Ver [ Funciones de botón](./Button-functions#side-key-action-picker).

### Fox Hunt / Beacon mejoras

Fox Hunt añade dos pasos más profundos después de la configuración original `ATT 0`, `ATT 6`, `ATT 15` y `ATT 27`. Se muestran como `BYP` y `BYP+`; estos nombres describen modos de cerca convenientes, no un bypass de hardware literal. Las teclas de navegación (`UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1) ahora cambian la atenuación directamente.

Después de un cambio de ganancia, el firmware brevemente permite que el detector RSSI se asienta y luego se reinicia el pico, mínimo, tendencia y referencias de señalización. Esto evita los picos estancos y los saltos artificiales cuando se mueve entre los rangos de ganancia.

Sostener `F` durante aproximadamente 0,5 segundos mueve un bloqueo de teclado temporal compartido por Fox Hunt y Beacon. En Fox Hunt, las teclas de navegación permanecen disponibles para atenuación mientras se bloquean. En Beacon, todos los controles normales se bloquean hasta que la misma larga prensa desbloquea el teclado, incluso durante una transmisión activa.

Fox Hunt y Beacon ahora ignoran el temporizador de inactividad `SetOff` normal y permanecen activos hasta que se salga explícitamente. Su tiempo de recuperación normal y actualizaciones de batería siguen funcionando.

Véase [Fox Hunt y Beacon](./Fox-Hunt-and-Beacon).

### Reparaciones de transmisión de Scan y FM

Durante el análisis de memoria, cambiar la lista de escaneos activos temporalmente mantiene la reanudación del escaneo mientras que el nombre de la lista de escaneo se muestra en realidad. Esto mantiene el medidor de progreso oculto y la posición de exploración sincronizada. Frecuencia y escaneos de rango no se pausan porque no muestran el nombre superpuesto.

Un análisis activo de la estación de radio FM ignora ahora una señal entrante detectada en el canal principal de radio, por lo que el escáner FM no se interrumpe. La escucha normal FM sigue rindiendo a la recepción del canal principal como antes.

Consulte [Escaneo](./Scanning#changing-the-scan-list-during-scan) y [Receptor de radiodifusión FM](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## Aspectos destacados de la v5.8.0

Estos cambios se basan en commits después de la etiqueta `v5.7.0` en `feature_update_v5`.

### Fox Hunt / Beacon

Fusion construye añade una acción programable `FOX HUNT / BEACON` con dos modos complementarios:

* Fox Hunt proporciona una pantalla `dBm` calibrada, lecturas S-meter y pico, una tendencia de señal de un segundo, atenuación seleccionable, estilo Geiger o audio de estación recibida, y una elección entre un medidor de escalera y una historia de señal de aproximadamente 18 segundos.
* Beacon utiliza el VFO TX activo para transmitir un identificador ARDF o `<CALLSIGN> MOE` en Morse, con ventanas `5` ajustables a `60-second` TX y intervalos silenciosos `5` a `240-second`.

Beacon toma su llamada de CHIRP `Message Line 1` y comienza su primera transmisión inmediatamente cuando se selecciona. Antes de cada explosión, el firmware comprueba el bloqueo de frecuencia TX aplicable, por VFO `TXLock`, estado de batería y restricción de modulación.

La atenuación, calibre, modo de audio y intervalo Beacon se guardan en flash externo y se incluyen en transferencias Air Copy `Settings`.

Ver la página histórica [Fox Hunt / Beacon compatibilidad](./Fox-Hunt-and-Beacon). Para el firmware actual, utilice las páginas separadas [FoxHunt](./Fox-Hunt) y [Beacon](./Beacon).

## Aspectos destacados de la v5.7.0

Estos cambios se basan en commits después de la etiqueta `v5.6.1` en `feature_update_v5`.

### UV Studio


Proporciona espejo en vivo y control de teclado no-TX, visualización y análisis compatibles de RF-log, exportación RF-log CSV, flashización de firmware, copia de seguridad de calibración / restauración y gestión de arranque personalizada. Funciona localmente a través de `Web Serial` sin una instalación, servidor o cuenta.


### Registro de RF

Construye con RX/TX logging añadir una acción programable `RF LOG` atajo.

Los registros de registro RF reciben, monitorizan y transmiten sesiones en flash externo, luego los muestra en una vista de historia más reciente. Cada entrada puede mostrar el nombre del canal o la frecuencia, dirección RX/TX, duración, nivel de potencia RX S o TX, y tensión de batería más baja vista durante la sesión.

La pantalla de registro admite:

* Filtros `ALL`, `RX` y `TX`
* hasta 512 entradas de tráfico visibles
* salto-a-neoeste y salto-a-antiguos atajos con `F` más las teclas de navegación (`UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1)
* un flujo de confirmación claro antes de borrar el registro

Ver [Características avanzadas](./Advanced-features#rf-log) y [ Funciones de botón](./Button-functions#rf-log-action).

### Exclusiones de ScanRange

`ScnRng` ahora puede mantener hasta `64` frecuencias excluidas temporales, en lugar de `32`.

Como antes, la lista es circular, no está escrita a la memoria, y se aclara cuando la radio se reinicia o cuando la identidad de rango cambia.

Véase [Scanning](./Scanning#excluding-frequencies-in-scnrng).

### Alcance de bloqueo SetLck

`SetLck` ahora tiene cuatro opciones en lugar de dos:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` cubre los atajos programables asignados a los dos botones laterales y `M Long`. Esto hace posible mantener los atajos disponibles mientras se bloquea el teclado delantero, o deshabilitarlos como parte de la cerradura. `PTT` se puede bloquear independientemente para evitar la transmisión accidental.

Véase [Menu](./Menu#main-menu) y [funciones de botón](./Button-functions#keypad-lock-and-setlck).

### Mantenimiento UV Studio

El código de streaming de pantalla lateral de firmware ha sido renombrado internamente desde el manejo de capturas hasta el manejo UV Studio. Las construcciones que permiten el puente UV Studio opcional RX/TX-log también pueden transmitir filas recientes de RF-log para la herramienta de visualización compatible.

Ver [Características avanzadas](./Advanced-features#k5-viewer).

## Aspectos destacados de la v5.6.0

Estos cambios se basan en los commits post-`v5.5.0` en `feature_update_v5`.

### SetSav protector de pantalla

Construye con soporte de pantalla añadir el menú `SetSav`.

Modos disponibles:

* `OFF`: sin protector de pantalla
* `LOGO`: mostrar el logotipo de arranque almacenado como una pantalla de ocio
* `LOGO+`: mostrar el logotipo de arranque almacenado con un efecto de desplazamiento
* `MATRIX`: mostrar una pantalla idle animada de estilo matriz

`SetSav` está atado a la salida de la luz trasera. Se puede mostrar en la pantalla principal y la pantalla de transmisión FM cuando la radio está inactiva, y se suspende durante RX, TX, PTT, BEAM, y el escaneo FM activo.

Véase [operación radio](./Radio-operation#screen-saver-and-backlight-timeout) y [Menu](./Menu#main-menu).

Debido a que `SetSav` se inserta antes del menú oculto, los índices de menu ocultos se mueven por uno en `v5.6.0`: `F Lock` comienza en `72` en lugar de `71`.

### Sonido de inicio del logotipo de arranque

Cuando `POnMsg = LOGO`, el modo de logotipo de arranque todavía puede mantener el comportamiento normal de las botas.

Véase [Menu](./Menu#main-menu) y [UV Studio](./UV-Studio#boot-logo).

### Scan RSSI indicador

El análisis rápido puede mostrar una pequeña chispa RSSI mientras se escanea. Da una visión compacta de las recientes muestras de RSSI tan fuertes candidatos destacan visualmente mientras el escaneo se está ejecutando.

Véase [Scanning](./Scanning#scan-indicators-and-detection).

### Detección subaudible de alcance escanal

`ScnRng` puede detectar CTCSS / DCS mientras se detuvo en una señal recibida. El código subaudible detectado se muestra en el análisis UI cuando está disponible.

Véase [Scanning](./Scanning#scan-indicators-and-detection).

### Copia de frecuencia UI

La pantalla del escáner de frecuencia-copia `F+4` ahora separa el estado de búsqueda y el resultado más claramente:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* detectados `Freq:` y `Tone:` detalles

Véase [Scanning](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### Actualizaciones UV Studio y captura de pantalla

Los marcos de salvapantallas se sincronizan con UV Studio, y el manejo de captura de pantalla se ha optimizado para reducir el uso de RAM y evitar los trozos de estaño.

Ver [Características avanzadas](./Advanced-features#k5-viewer).

### Fijaciones y refinamientos

Esa liberación también incluyó varias correcciones de comportamiento y refinamientos UI:

* bandascopio / redondeo de frecuencia de espectro para pasos `8.33 kHz`
* Reconfiguración de recepción de AM a FM
* Colocación del icono de bloqueo VFO mientras escanea
* cajas de vela/sleep edge
* hueco icono de luz manual cuando se apaga la luz manual

## v5.5.0

### Motor de escaneo más rápido

Las construcciones actuales pueden utilizar el nuevo motor de escaneado `FAST` para el análisis de memoria y `ScnRng`.

El menú `SetScn` selecciona entre:

* `NORMAL`: la ruta conservadora del escaneo
* `FAST`: un camino más rápido que pre-checks canales o pasos de rango con RSSI antes de hacer la configuración completa de recibir

En condiciones favorables, `ScnRng` en modo `FAST` puede escanear alrededor de frecuencias `150+` por segundo.

Véase [Scanning](./Scanning#scan-engine-mode-normal-vs-fast) y [Menu](./Menu#main-menu).

### Exclusiones temporales de alcance de escaneo

Mientras que un escáner `ScnRng` se detiene en una frecuencia recibida, `MENU` de larga presión para excluir esa frecuencia del análisis de rango actual.

Esto se introdujo con ranuras `32` en `v5.5.0`; las construcciones actuales post-`v5.6.1` permiten exclusiones temporales `64`. Estas exclusiones se aclaran cuando la radio se reinicia o cuando cambia la identidad de rango.

Véase [Scanning](./Scanning#excluding-frequencies-in-scnrng).

### Modo de transferencia BEAM

Construye con soporte BEAM puede enviar el VFO actual o configuración del canal de memoria a otra radio, o recibir un paquete BEAM y guardarlo al primer canal de memoria gratuito.

BEAM se abre a través de una acción de acceso directo programable.

Ver [Características avanzadas](./Advanced-features#beam-transfer-mode) y [ Funciones de botón](./Button-functions#beam-action).

### Logotipo de arranque personalizado

Construye con soporte para logotipos puede mostrar un logotipo personalizado de arranque `128x64` monocromo al inicio.

Subir o descargar el logo con UV Studio, luego seleccionar `LOGO` en el menú `POnMsg`.

Véase [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu), y [Troubleshooting](./Troubleshooting#my-custom-boot-logo-does-not-show).

### DCS / CTCSS mejoras de visualización

Los menús `RxDCS`, `TxDCS`, `RxCTCS` y `TxCTCS` ahora muestran la posición de entrada seleccionada y el índice homologado cuando existe.

Esto hace que sea más fácil distinguir la posición normal de la lista, las entradas de PMR446-homologated, tonos adicionales, y las entradas de DCS invertidas.

Véase [Menu](./Menu#main-menu).

### Edición de nombre de canal

Se ha mejorado la edición de `ChName` con entrada multitap, conmutación de maletas/bajos, entrada numérica directa con largas prensas clave y comportamiento `EXIT` más claro.

Véase [Menu](./Menu#main-menu).

### Persistente del analizador de espectros

El analizador de espectro ahora ahorra más configuraciones al salir de la pantalla de barrido con `EXIT`, incluyendo el modo de activación, perfil de sensibilidad automático, escala manual y nivel de activación.

Iniciar el analizador de `ScnRng` ya no sobrescribe el paso del escaneo guardado o la preferencia de la cuenta de barras.

Véase [Spectrum analizar](./Spectrum-analyzer#saving-settings-on-exit).

### SysInf y construir información

`SysInf` ahora está paginado en las construcciones actuales. Dependiendo de las opciones de construcción, puede mostrar identidad, construir fecha/hora, comprometer identificador, información de la batería, uso de la memoria y enlaces de proyecto de código QR.

Véase [Menu](./Menu#main-menu).

### Cobertura de configuración de aire

Las transferencias de Air Copy `Settings` ahora incluyen el área VFO utilizado por características tales como `ScnRng`, por lo que las frecuencias de límites de rango de escaneo se replican al copiar la configuración.

Véase [AirCopy](./AirCopy).

## Cambios recientes v5.x también vale la pena saber

Los siguientes cambios aterrizaron poco antes de `v5.5.0` y se documentan en el wiki porque afectan el uso diario:

* `SetRxA` selecciona diferentes perfiles de audio RX para `FM` y `AM`; en `AM`, puede cambiar entre `SHARP`, `STOCK` y `OPEN`.
* Las listas de escaneado soportan nombres cortos, y el análisis de memoria puede cambiar entre listas válidas no vacías mientras se escanea.
* `SysInf`, radio de transmisión FM, y el analizador de espectro UI fueron refinados a través de construcciones recientes.
* el menú Oculto `SetNav` permite que la misma documentación funcione para los estilos de navegación `UV-K1` y `UV-K5 V3`.

Consulte [Menú](./Menu), [Escaneo](./Scanning), [Uso de la radio](./Radio-operation) y [Receptor de radiodifusión FM](./FM-broadcast-radio-receiver).

## Páginas relacionadas

* [Empezar](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [ Funciones de botón](./Button-functions)
* [Características avanzadas](./Advanced-features)
* [Spectrum analizar](./Spectrum-analyzer)
* [Menu](./Menu)
