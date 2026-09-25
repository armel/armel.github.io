# AirCopy

AirCopy transfiere canales de memoria y configuración de radio entre radios compatibles. Utiliza FSK sobre el aire y, comenzando por `v6.1.0`, también puede utilizar una conexión de cable serie directa.

> [!IMPORTANT]
> AirCopy está incluido en las ediciones `Transfer` y `Labs`. No es parte de las ediciones estándar `Fusion` o `FieldOps`.

> [!WARNING]
> AirCopy no tiene la intención de hacer que los diseños de firmware no sean compatibles. Utilice la misma generación de firmware en ambas radios y seleccione la misma sección de datos en el remitente y receptor. El protocolo `v6.1.0` optimizado no es compatible con cables con versiones AirCopy anteriores.

## Inicio AirCopy

1. Apaga la radio.
1. Sostenga `PTT` + `SIDE BUTTON 2️⃣` mientras se enciende.
1. Libere todas las teclas cuando aparezca la pantalla AirCopy.

La frecuencia predeterminada del aire es `434.000 MHz` a muy baja potencia. Puedes introducir otra frecuencia permitida con el teclado antes de iniciar la transferencia.

Utilice las teclas de navegación para seleccionar la misma sección en ambas radios:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Luego comienza el objetivo antes de la fuente:

1. En la radio receptora, presione `EXIT`.
1. En la radio de envío, presione `M`.
1. Espera a `AIR COPY OK` en ambas radios.

Cada selección de memoria transfiere canales `128`, incluyendo nombres de canales y atributos. `Settings` incluye configuración de radio, nombres de lista de escaneo, el área VFO utilizado por `ScnRng`, la selección de la lista de escaneo `MIX`, y las preferencias FoxHunt y Beacon guardadas. `All (Mem+Set)` transfiere los ocho bancos de memoria y Ajustes en una sola carrera.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Protocolo confiable en v6.0.0

`v6.0.0` introdujo un protocolo de transferencia reconocido:

* el receptor valida el framing, offset y CRC antes de almacenar datos
* el receptor reconoce datos válidos y rechaza datos dañados o inesperados
* el remitente retrata un bloque no reconocido o rechazado hasta tres veces
* los datos duplicados se reconocen sin ser escritos dos veces, recuperándose con seguridad de un reconocimiento perdido
* la pantalla reporta progreso, retry count (`RT`), y recuento de terror recibido (`ER`)

Un banco de memoria contiene bloques `68` AirCopy de `64 bytes`; `Settings` contiene bloques `12`. Debido a que el receptor envía reconocimientos, ambas radios transmiten brevemente la frecuencia seleccionada.

## v6.1.0 mejoras

### Transferencias de radio más rápidas

El nuevo protocolo lleva hasta tres bloques `64-byte` en un marco de datos FSK. Esto reduce el giro fijo y el reconocimiento de arriba y hace una transferencia completa aproximadamente dos veces más rápido en condiciones de radio similares.

Antes de enviar datos, la fuente proporciona el hashes CRC32 para grupos de hasta bloques `24`. El objetivo compara esos hashes con sus datos locales y sólo solicita los bloques que difieren. Repetir una copia de seguridad o sincronizar dos radios casi idénticos puede ser mucho más rápido que copiar cada bloque de nuevo.

El medidor de progreso distingue los datos que ya eran idénticos a los datos que se copiaban. El protocolo también valida que el remitente y el receptor seleccionaron la misma sección de datos lógicos; un desajuste falla en lugar de escribir un mapa diferente por error.

### Recibido por cable

La edición `Transfer` añade `CABLE COPY` sobre UART. En la pantalla lista, presione `* SCAN` para cambiar entre radio y transporte por cable. El modo Cable utiliza la misma comparación, reconocimiento, reingreso y cheques de selección como modo de radio, pero no utiliza una frecuencia RF.

La implementación aumenta la tasa de serie para la transferencia y restaura la tasa normal después. Ambas radios deben ejecutar firmware de copia de cable y utilizar una conexión serie directa compatible.

### clonación de pestañas externas

Cuando `CABLE COPY` está activo en la edición `Transfer`, una selección adicional de `Flash 2M` puede clonar el Flash externo de la radio. Compara los sectores `4 KiB` por CRC32 y escribe sólo diferentes sectores. El sector de calibración específico del dispositivo está deliberadamente excluido.

> [!WARNING]
> La clonación externa-Flash puede sustituir ranuras de firmware, bancos de configuración, aplicaciones, registros, logotipos y otros datos compartidos externos-Flash en la radio receptora. Recuperar datos importantes primero, verificar la dirección cuidadosamente, y no desconectar o apagar la radio durante la operación.

## Solución de problemas

Si una transferencia falla:

* confirmar que ambas radios utilizan la misma versión de firmware compatible
* confirmar que ambas radios muestran la misma selección y transporte
* iniciar la recepción con `EXIT` antes de comenzar la transmisión con `M`
* para la transferencia de radio, reducir la distancia o alejarse de la interferencia
* para la transferencia de cable, comprobar la conexión serial directa y reconectar ambas radios
* retry sin cambiar la selección

## Páginas relacionadas

* [Cambios recientes](./Recent-changes)
* [Características avanzadas](./Advanced-features)
* [Scanning](./Scanning)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Solucionando](./Troubleshooting)
