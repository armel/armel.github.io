# Características avanzadas

Esta página cubre características especializadas o opcionales que no son necesarias para la operación básica de radio: BEAM, RF log, RescueOps, UV Studio, Modo de Resume, el juego integrado y el procedimiento de desbloqueo TX orientado a la investigación. Las aplicaciones AirCopy, FoxHunt, Beacon, Multiboot y overlay tienen sus propias páginas detalladas.

Para el uso diario de la radio, véase [operación radio](./Radio-operation). Para las características relacionadas con el escaneo, véase [Scanning](./Scanning).

> [!NOTE]
> Donde esta página menciona `UP` / `DOWN`, utilice las teclas equivalentes `LEFT` / `RIGHT` en UV-K1. El diseño de navegación activo sigue `SetNav`.

## AirCopy

AirCopy transfiere bancos de memoria y ajustes entre radios compatibles. `v6.0.0` agregó bloques reconocidos, retries, manipulación duplicada y `All (Mem+Set)`. `v6.1.0` añade marcos multibloque, comparación y esquiamiento de bloques idénticos, transporte por cable y clonación protegida externa-Flash en la edición Transfer.

Véase [AirCopy](./AirCopy) para la disponibilidad de edición, controles, compatibilidad de protocolo, transferencias de radio, información de seguridad `CABLE COPY` y `Flash 2M`.

## Multiboot, Multiconfig y aplicaciones de superposición

`v6.0.0` añade dos plataformas más grandes documentadas por separado:

* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig) explica `Main` más cuatro ranuras de firmware, el selector de arranque, bancos de configuración independientes, `SetCfg` y UV Studio gestión de ranuras.
* [Overlay apps](./Overlay-apps) explica la plataforma experimental Labs-only `.app`, la instalación a través de UV Studio, el lanzador `F + 7`, los controles de compatibilidad y el desarrollo de aplicaciones.

## Modo de transferencia BEAM

BEAM es un modo de transferencia directa opcional para un VFO o canal de memoria. A diferencia de [AirCopy](./AirCopy), que transfiere bancos de memoria o secciones de configuración, BEAM está destinado a compartir rápidamente la configuración seleccionada con otra radio compatible.

Asignar `BEAM` a uno de los atajos personalizables (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`), y luego activar ese atajo para abrir el modo BEAM.

En modo BEAM:

* `UP` / `DOWN` toggles entre `BEAM TX` y `BEAM RX`
* `M` inicia la operación seleccionada
* `EXIT` deja el modo BEAM

`BEAM TX` envía la configuración actual del VFO o del canal de memoria, incluyendo frecuencia, offset, tonos, modulación, ancho de banda, potencia, asignación de la lista de escaneo, compander, ajustes relacionados con DTMF cuando está habilitado, y nombre del canal.

`BEAM RX` espera un paquete BEAM de otra radio y lo guarda al primer canal de memoria gratuito. Si la memoria está llena, el estado muestra `MEM FULL`.

Véase [Características de botón](./Button-functions#beam-action) para los detalles a corto plazo.

## FoxHunt

[FoxHunt](./Fox-Hunt) es una aplicación de señal-fortaleza y de determinación de direcciones. Desde `v6.0.0`, tiene su propia acción de acceso directo `FOX HUNT`. Es residente en FieldOps y disponible como una aplicación de superposición instalable en Labs.

## Beacon

[Beacon](./Beacon) es una aplicación de transmisión de estilo ARDF separada con sus propios requisitos de acción de acceso rápido `BEACON` y seguridad. Es residente en FieldOps y está disponible como una aplicación adicional instalable separada en Labs.

## Registro de RF

Construcciones con registro RX/TX añadir una acción de acceso directo `RF LOG`. Asignarlo a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` o `M Long`, y luego activar ese acceso directo para abrir la pantalla de la historia.

Los registros de registro RF reciben, monitorizan y transmiten sesiones a flash externo. Es útil para comprobar la actividad reciente después de escanear, monitorear un canal no deseado o revisar las transmisiones realizadas durante el uso de campo.

Cada tienda de entrada de tráfico registrada:

* frecuencia, o la referencia del canal de memoria cuando la sesión vino de un canal guardado
* Dirección RX o TX
* período de sesiones
* nivel máximo RX S-meter para sesiones recibidas, o nivel de potencia TX para sesiones transmitidas
* tensión de batería más baja medida durante la sesión

La vista de registro muestra las últimas entradas primero y expone hasta 512 entradas de tráfico. Cuando se selecciona el filtro `ALL`, las líneas horizontales de separación marcan reiniciales de radio.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Controles en la pantalla de registro RF:

* `UP` / `DOWN`: desplazarse a través de entradas
* `F` + `UP`: saltar a la entrada más reciente
* `F` + `DOWN`: saltar a la entrada visible más antigua
* `M`: ciclo el filtro entre `ALL`, `RX` y `TX`
* `* SCAN`: ciclo de la placa de detalle derecha entre duración, potencia S-meter / TX, y tensión de batería más baja
* `M` de larga duración: abra la confirmación clara; larga presión `M` de nuevo en `CLEAR LOG / SURE?` para borrar el registro
* `EXIT`: dejar la pantalla de registro RF, o cancelar la confirmación clara

El registro se almacena en un área reservada de choque externo, por lo que sobrevive ciclos de energía normales. Limpiar las eras de troncos que reservaban el área.

Véase [Características de botón](./Button-functions#rf-log-action) para los detalles a corto plazo.

## RescueOps

### Descargo

Me gustaría aclarar que no soy un experto en servicios de emergencia; sin embargo, esta característica especial se ha desarrollado con la intención de satisfacer las necesidades de comunicación de los primeros equipos lo más eficazmente posible. Estoy abierto a mejores sugerencias de profesionales, dentro de los límites de mis capacidades, el tiempo disponible para mí, y las capacidades técnicas del transceptor.

### Sinopsis

La función RescueOps se ha desarrollado específicamente para integrarse en un sistema de comunicación diseñado para los primeros equipos (combatientes de fuego, etc.). Añade controles de campo restringidos y un comportamiento mejorado de la linterna, que se puede configurar en modos fijos, parpadeantes o SOS. El menú `SetKey` selecciona la tecla de inicio utilizada con `PTT` para entrar o salir del modo RescueOps. Por defecto la clave es `MENU`, pero también puede ser `UP`, `DOWN`, `EXIT`, o `* SCAN`.

En la familia `v6.0.0` oficial, RescueOps está incluido en `FieldOps` y `Labs`. AirCopy es una capacidad separada proporcionada por `Transfer` y `Labs`; permitir RescueOps no permite por sí mismo AirCopy.

### Usage

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), miembro del “[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)”, ha escrito [documentación](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) específicamente dedicado al uso de la función RescueOps. Muchas gracias a él.

Por defecto, el transceptor funciona como cualquier otra versión de firmware, permitiendo el acceso a menús (y menús ocultos), prensas largas o combinaciones de teclas `F` para activar varias funciones directamente desde el teclado (por ejemplo, para iniciar una exploración o ajustar la potencia de transmisión), así como atajos.

Sin embargo, si el transceptor se activa mientras presiona el `PTT` y la tecla configurada en el menú `SetKey`, se cambiará al modo RescueOps, activando los siguientes cambios:

* el menú está bloqueado
* prensas largas y combinaciones de teclas `F` están deshabilitadas (excepto `A/B` y llave de teclado)
* reinicio en modo oculta-menu está bloqueado
* el teclado sólo se puede utilizar para cambiar los canales de memoria, como las teclas `UP` y `DOWN`

Las prensas cortas y largas en `F1` y `F2`, así como largas prensas en `M`, permanecen disponibles para atajos. Esta configuración es responsabilidad de la persona encargada de configurar el transceptor. Si los atajos no son deseados, simplemente se pueden configurar en la acción `NONE`.

Tenga en cuenta que la función RescueOps ofrece 2 nuevas acciones:

* `POWER HIGH`, que le permite cambiar temporalmente a la potencia máxima de `5 W` si es necesario
* `REMOVE OFFSET`, para eliminar temporalmente la compensación de un canal de memoria si está presente

Estas dos acciones fueron agregadas a petición de profesionales de rescate y corresponden a necesidades en el campo.

Una vez en el modo RescueOps, cada startup normal mantiene el transceptor en este modo. Para volver al modo predeterminado, con acceso a menús y menús ocultos, simplemente repita la operación de inicio al presionar tanto el `PTT` como la clave configurada en el menú `SetKey`.

## Juego

Este firmware incluye un pequeño juego de ruptura.

* En construye sin aplicaciones de superposición, presione `F+7` para iniciar el juego residente.
* En la edición `Labs`, `F+7` abre el lanzador [overlay-app](./Overlay-apps); instalar y seleccionar `Breakout` u otro juego allí.
* Para salir, pulse `EXIT`
* Puedes pausar el juego con `M`
* Mueva la paleta usando `4` o `UP` para ir a la izquierda, y `0` o `DOWN` para ir a la derecha

Este juego no tiene ambición más allá de la diversión. La idea era simplemente explorar lo que es posible en el Quansheng K5 junto con sus características de radio. Piénsalo como un guiño juguetón a la era Nokia 3310.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## Modo de reasumo

Su transceptor reiniciará en el mismo estado en el que estaba antes de ser apagado. Así que, si estaba en el modo Bandscope, escuchando la transmisión de FM, o escaneando, se reanudará automáticamente ese estado en el próximo inicio.

## TX en todas las bandas

### Advertencia

**Esta modificación NO SE HA PROBADO y está destinada exclusivamente A LA INVESTIGACIÓN de las capacidades del dispositivo y su chipset. NO transmita en frecuencias ilegales. UTILICE una carga ficticia. Los autores y colaboradores de este repositorio no se responsabilizan de daños, litigios ni otras consecuencias derivadas del uso indebido de este firmware experimental. Al instalar cualquier firmware de este repositorio, acepta toda la responsabilidad por las consecuencias y renuncia a emprender acciones legales contra sus autores.**

Esta opción no le permitirá transmitir en cualquier modulación que no sea FM; esta es una limitación de hardware. Cambiar a AM o SSB sólo cambia el modo de salida de audio AF del RF IC. No cambia todo el IC en modo AM / SSB. Esto es sólo para escuchar. Este firmware también se construye con una cerradura adicional que bloquea TX cuando AM o SSB está habilitado.

Como ejemplo de por qué esto no debe utilizarse para comunicaciones reales, considere el siguiente gráfico para la potencia de transmisión en `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` - confiar **228 microwatts**
* `54 MHz` - titulado 2.4 milliwatts
* `81 MHz` - confiar 230 milliwatts
* `109 MHz` - titulada 558 milliwatts
* `136 MHz` - titulada 412 milliwatts
* `163 MHz` - confiar 122 milliwatts
* `190 MHz` - titulada 14.8 milliwatts
* `218 MHz` - titulado 2 milliwatts
* `245 MHz` - titulado 2.6 milliwatts

Créditos: [Tunas1337 / UV-K5-Modded-Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Cómo desbloquear TX en todas las bandas

1. Vaya al menú [hidden](./Menu#hidden-menu)
1. Introduzca el menú `F Lock`
1. Elija la opción `UNLOCK ALL`
1. Repita los pasos 2-3 **3 veces**. Hazlo con cuidado. Si confirma cualquier otra opción en el proceso, el contador se reinicia y tendrá que repetir el procedimiento de nuevo.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Operación radio](./Radio-operation)
* [Scanning](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [ Funciones de botón](./Button-functions)
* [Solucionando](./Troubleshooting)
