# Comienzo

Esta página es una guía de orientación rápida para usuarios de primera vez del firmware. No reemplaza la documentación completa, pero debe ayudarle a encontrar la página correcta más rápido y evitar los errores más comunes.

## Primero 5 minutos

Si sólo quieres programar una frecuencia, prueba la radio y guárdala:

1. Seleccione el VFO activo con `F` + `2 A/B`.
1. Cambiar ese VFO a `frequency mode` con `F` + `3 VFO/MR`.
1. Introduzca una frecuencia con el teclado.
1. Abra el menú con `M`, seleccione `Channels` (o `All`), y ajuste los elementos básicos que necesita (`Step`, `Power`, tonos, offset, ancho de banda, `Mode`, `TXLock`).
1. Guarda la configuración con `ChSave` si quieres mantenerla como un canal de memoria.
1. Vuelve a `channel mode` con `F` + `3 VFO/MR` cuando quieras navegar por canales guardados.

Si necesita ver o controlar la radio desde un navegador, inspeccionar la actividad RF, el firmware flash, la calibración de respaldo o subir un logotipo de arranque personalizado, use [UV Studio](./UV-Studio). Si prefieres programar recuerdos de un ordenador, utiliza el controlador `CHIRP` dedicado con cada lanzamiento de firmware. Ver [Programación con CHIRP](./Programming-with-CHIRP) para el flujo de trabajo completo.

Si usted ya conoce el firmware, consulte [Recientes cambios](./Recent-changes) para los últimos cambios estables `v6.1.0` y los momentos más destacados `v6.0.0` anteriores.

> [!WARNING]
> No use CPS Quansheng. Sobrescribe ajustes personalizados.

## Elige una edición

La última versión estable `v6.1.0` tiene cuatro ediciones oficiales:

| Edición | Mejor | Capacidades adicionales |
| --- | --- | --- |
| `Fusion` | la mayoría de los usuarios y el funcionamiento diario | Conjunto de referencia equilibrado |
| `FieldOps` | campo y uso de primer nivel | RescueOps, residente FoxHunt, residente Beacon |
| `Transfer` | copia de datos entre radios | AirCopy y residente Beam |
| `Labs` | experimentación | RescueOps, AirCopy, e aplicaciones de superposición instalables |

FoxHunt y Beacon son aplicaciones independientes desde `v6.0.0`. En FieldOps son residentes; en Labs se instalan y se lanzan por separado como aplicaciones superpuestas.

Para la mayoría de los usuarios, comience con Fusion y seleccione una edición especializada sólo cuando necesite sus capacidades adicionales. Multiboot le permite guardar varias ediciones y configuraciones aisladas en la misma radio.

## Tareas comunes

### Inicio frecuencias de exploración

1. Cambiar un VFO a `frequency mode`.
1. Establecer la frecuencia inicial.
1. Establecer el paso de frecuencia con el menú `Step`.
1. `* SCAN` de alta presión.

Para un rango de escaneo limitado, cargue los límites inferiores y superiores en los dos VFOs, `5 NOAA` de larga presión para permitir `ScnRng`, luego `* SCAN` de larga duración.

Para el comportamiento completo del escaneo, listas de escaneo, escaneo prioritario, y escaneo DCS / CTCSS, vea [Scanning](./Scanning).

### Comienza a escanear canales de memoria

1. Cambia a `channel mode`.
1. Asignar canales a una lista de exploración con el menú `ScList`, o por `5 NOAA` de larga presión.
1. `* SCAN` de alta presión.

El firmware `v6.1.0` actual admite listas de escaneado `24`, `ALL` y un modo `MIX` configurable que escanea varias listas seleccionadas juntas.

Véase [Scanning](./Scanning) para el comportamiento completo de la lista de escaneo.

### Si no puedes transmitir

Compruebe estos elementos primero:

1. Asegúrese de que `Mode` es `FM` y no `AM` o `USB`.
1. Compruebe si la frecuencia está dentro del plan `F Lock` seleccionado.
1. Si la frecuencia está fuera del plan de banda seleccionado, compruebe si `TXLock` se establece en `OFF`.
1. Busque un pequeño candado junto al canal o nombre VFO.

Si eso aún no lo explica, véase [Solucionar](./Troubleshooting).

### Guardar batería

Los dos menús principales a conocer son:

* `BatSav` para la relación activa/mantenimiento durante la operación normal
* `SetOff` para el sueño profundo después de un período de inactividad

Ver [Operación radio](./Radio-operation#battery-display-type-and-calibration) para pantalla de batería, tipo de batería y calibración, y [Operación radio](./Radio-operation#about-the-setoff-menu) para el comportamiento detallado del modo de sueño.

## Diferencias modelo

Este firmware apunta a `UV-K1` y `UV-K5 V3`.

La diferencia más visible día a día en la documentación es la navegación:

* `UV-K5`: la navegación se describe generalmente con `UP` / `DOWN`
* `UV-K1`: la navegación se describe generalmente con `LEFT` / `RIGHT`

La opción oculta-menu `SetNav` controla este estilo de navegación.

Algunas capturas de pantalla y ejemplos utilizan la terminología UV-K5 primero, pero la misma característica generalmente existe en UV-K1 con las teclas de navegación equivalentes.

## Conceptos básicos

Estos términos aparecen a través del wiki:

* `VFO mode`: escribe las frecuencias directamente y ajusta la configuración en vivo antes de guardarlas
* `Channel mode` / `memory mode`: navega por canales de memoria guardados
* `Main VFO`: la línea superior o inferior activa, marcada por `►`
* `Menu category`: el primer nivel de menú categorizado introducido en Fusion `v5.9.0` y utilizado por las ediciones v6 actuales; `All` restaura el orden plano original y numeración global
* `F Lock`: el principal plan de banda TX
* `TXLock`: un permiso TX extra por canal cuando una frecuencia está fuera del plan `F Lock` seleccionado
* `Scan list`: uno de los grupos de memoria `24`, o `ALL`
* `MIX`: un modo de exploración `v6.1.0` que combina una selección guardada de listas `01` a `24`
* `ScnRng`: escanea sólo entre las frecuencias actualmente cargadas en los dos VFOs
* `SetOff`: tiempo de inactividad antes del sueño profundo
* `POnMsg`: modo de pantalla de inicio, incluyendo el logotipo de arranque personalizado opcional
* `Multiboot`: mantiene `Main` más cuatro imágenes adicionales de firmware compatibles con v6 en Flash externo
* `Config bank`: el perfil aislado de canales/ajustes emparejado con una ranura Multiboot por defecto
* `SetCfg`: cambia el banco de configuración sin cambiar la ranura de firmware de funcionamiento
* `Overlay app`: un pequeño programa `.app` de laboratorio cargado de Flash externo a RAM cuando se lanza
* `MO`, `DW`, `DWR`, `XB`: `RxMode` abreviaturas mostradas en la barra de estado

## ¿Dónde ir después?

* [Operación radio](./Radio-operation) para uso VFO/canal, barra de estado, `F Lock`, `TXLock`, y comportamiento del sueño
* [Cambios recientes](./Recent-changes) para los principales cambios visuales de los usuarios en las versiones recientes
* [UV Studio](./UV-Studio) para visualización en vivo, actividad RF, flashización de firmware, ranuras Multiboot, aplicaciones Labs, calibración, logotipos de arranque y las herramientas de recuperación externa-Flash `v1.6.0`
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig) para ranuras de firmware, el selector de arranque, bancos de configuración y `SetCfg`
* [Overlay apps](./Overlay-apps) para instalar y lanzar aplicaciones experimentales Labs
* [Programación con CHIRP](./Programming-with-CHIRP) para programación informática con el controlador dedicado incluido en cada versión
* [Scanning](./Scanning) para el escaneo de frecuencia, el escaneo de memoria, `ScnRng`, y DCS / CTCSS escaneado
* [Menu](./Menu) para cada elemento del menú y el menú oculto
* [Características de botón](./Button-functions) para atajos, largas prensas y teclas programables
* [FoxHunt](./Fox-Hunt) para la búsqueda de la dirección sólo de la señal
* [Beacon](./Beacon) para el transmisor Morse periódico independiente
* [AirCopy](./AirCopy) para la transferencia de memoria/ajustes radio a radio y las mejoras `v6.1.0`
* [Características avanzadas](./Advanced-features) para RescueOps, Modo de Resume, el juego incorporado, y las características de investigación TX-on-all-bands
* [Spectrum analizar](./Spectrum-analyzer) para el escaneo de estilo bandscopio
* [MFM radio receptor](./FM-broadcast-radio-receiver) para la función FM de transmisión
* [Solución de problemas](./Troubleshooting) para problemas comunes y cheques rápidos
