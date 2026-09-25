# Solución de problemas

Esta página reúne las situaciones más comunes “algo está mal” ya cubiertas en otras partes del wiki, por lo que puede encontrar el cheque correcto rápidamente.

## Puedo recibir, pero no puedo transmitir

Compruebe estos puntos primero:

1. Asegúrate de que `Mode` esté listo para `FM`.
1. Compruebe el plan `F Lock` seleccionado.
1. Si la frecuencia está fuera de ese plan, compruebe si `TXLock` se establece en `OFF`.
1. Busque un pequeño candado junto al canal o nombre VFO.

Importantes recordatorios:

* `AM` y `USB` son sólo para escuchar
* `UNLOCK ALL` todavía tiene un procedimiento de desbloqueo adicional

Véase también: [operación radio](./Radio-operation#about-the-f-lock-and-txlock-menus) y [Características avanzadas](./Advanced-features#tx-on-all-bands).

## Mi configuración personalizada desapareció o cambió inesperadamente

No use CPS Quansheng. Sobrescribe ajustes personalizados.

Utilice el controlador `CHIRP` proporcionado con cada lanzamiento de firmware, u otra herramienta de programación compatible en su lugar.

Véase también: [Programación con CHIRP](./Programming-with-CHIRP), [Comenzar](./Getting-started), y [operación radio](./Radio-operation#basic-operation--configuration).

## Mi logotipo de arranque personalizado no muestra

Compruebe estos puntos:

1. asegúrese de que su diseño firmware incluye soporte de logotipo
1. subir el logotipo con [UV Studio](./UV-Studio#boot-logo) mientras que la radio se inicia normalmente
1. Abrir menú `POnMsg` y seleccionar `LOGO`
1. reiniciar la radio después de cambiar la configuración

Si el logotipo se ve demasiado oscuro, demasiado ligero, o invertido, subirlo de nuevo desde UV Studio y ajustar `Threshold` o `Invert colors` antes de escribirlo a la radio.

## Cambié de configuración de un canal de memoria, pero no se mantuvo salvado

Algunos cambios específicos del canal sólo afectan la copia temporal actual de ese canal de memoria.

Si cambias un ajuste por canal como `Step`, `Power` u otro parámetro de canal y quieres mantenerlo permanentemente, guarda el canal de nuevo con `ChSave` para escribir los ajustes actualizados de nuevo a esa ranura de memoria.

De lo contrario, el cambio es sólo temporal y puede desaparecer cuando cambia el canal, el modo de conmutación o reinicia la radio.

Véase también: [operación radio](./Radio-operation#basic-operation--configuration) y [Menu](./Menu#main-menu).

## El escáner de memoria no encuentra nada

Compruebe estos puntos:

1. Asegúrate de estar en `channel mode`, no `frequency mode`.
1. Asegúrese de que el canal está asignado a una lista de exploración con `ScList` o por `5 NOAA` de larga presión.
1. Asegúrese de que la lista de escaneos activos actualmente no está vacía.
1. Si es necesario, cambie a otra lista de exploración válida mientras se escanea.

El firmware admite listas de escaneado `24` más `ALL`. Si la lista solicitada está vacía o inválida, la radio salta a la siguiente lista no vacía válida.

Véase también: [Scanning](./Scanning#memory-channels-scanning) y [ Funciones de botón](./Button-functions#front-keypad).

## No puedo sintonizar la emisora FM que quiero

Puede simplemente estar usando el rango de transmisión FM incorrecto.

Mientras que la recepción de transmisión FM es activa, de larga presión `1 BAND` para recorrer los rangos FM disponibles:

* `87.5` a `108 MHz`
* `76` a `108 MHz`
* `76` a `90 MHz`
* `64` a `76 MHz`

El rango seleccionado actualmente se muestra en la parte inferior izquierda de la pantalla FM, por ejemplo `87.5-108M`.

Ajuste directo, escaneo manual, escaneo automático y memorias FM sólo funcionan dentro del rango seleccionado actualmente.

Véase también: [FM radio receptor](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## La radio de transmisión FM sigue parando

Esto generalmente se espera comportamiento.

Durante la recepción de FM, el VFO activo todavía tiene prioridad. Si la actividad se recibe en el VFO activo, la radio cambia temporalmente de nuevo a la recepción VFO, entonces vuelve a transmitir FM cuando termina la recepción.

Véase también: [FM radio receptor](./FM-broadcast-radio-receiver).

## La recepción de AM suena demasiado duro, distorsionado o demasiado apagado

Trate de cambiar el perfil `SetRxA` mientras la radio está en modo `AM`.

En `AM`, `SetRxA` y el ciclo de acción clave `RxA` entre:

* `SHARP`: más estrecha y más selectiva, con mejor rechazo al canal adyacente
* `STOCK`: más cercano al comportamiento del firmware de acciones
* `OPEN`: más ancho y más abierto, a menudo más agradable en señales débiles

Si una recepción AM suena demasiado dura en `SHARP`, prueba `STOCK` o `OPEN`. Si suena demasiado suave o demasiado ancho en `OPEN`, prueba `SHARP`.

Véase también: [Menu](./Menu#main-menu) y [funciones de botón](./Button-functions#custom-button-functions).

## Sólo escucho algunos canales aeronáuticos VHF cuando abro el monitor en `AM 8.33 kHz`

Esto a menudo no es un problema de sensibilidad. Por lo general es una confusión entre el `channel designator` (a veces llamado `channel number` o `published channel`) y la frecuencia de operación.

Algunos documentos aeronáuticos, sitios web o aplicaciones publican el `channel designator`, que parece una frecuencia normal pero no siempre es la frecuencia de operación. Las radios aeronáuticas VHF dedicadas 8.33 se traducen automáticamente en el designador de canales publicado. Este firmware también realiza esa corrección cuando se escribe el valor directamente en la radio, pero `CHIRP` almacena el valor que entró como una frecuencia de operación.

### Caso 1: París-Orly

Para **Paris-Orly (LFPO)**, la documentación **SIA** sí publica **ATIS ORLY 126.505 (FR)**, con **131.355 (EN)** para el servicio en inglés.

La tabla de correspondencia **[ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** muestra que el diseñador de canales publicado 8.33 **126.505** corresponde al operador frecuencia **126.5000 MHz**. En otras palabras:

* **Servicio:**
* ** Designador de canales:** 126.505
* ** Frecuencia de funcionamiento** 126.5000 MHz

Importante diferencia:

* si entras en `126.5050` directamente en la radio, el firmware lo corrige a la frecuencia de operación coincidente, aquí `126.5000 MHz`
* si entra `126.5050` en `CHIRP`, ese valor exacto se almacena y se utiliza como-es, por lo que el error de sintonización permanece

### Caso 2: Bruselas

Para **Bruselas-National (EBBR)**, el diseñador de canales 8.33 publicado para **Bruselas Ground (South)** es **121.880** en los listados consultados.

La tabla de correspondencia **[ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com)** muestra que el diseñador de canales publicado 8.33 **121.880** corresponde al operador frecuencia **121.8750 MHz**. En otras palabras:

* **Servicio:** Fondo de Bruselas (Sur)
* ** Designador de canales:** 121.880
* ** Frecuencia de funcionamiento** 121.8750 MHz

Importante diferencia:

* si entras en `121.8800` directamente en la radio, el firmware lo corrige a la frecuencia de operación coincidente, aquí `121.8750 MHz`
* si entra `121.8800` en `CHIRP`, ese valor exacto se almacena y se utiliza como-es, por lo que el error de sintonización permanece

En resumen, si la frecuencia ingresada en `CHIRP` es el diseñador **canal** en lugar de la frecuencia de operación, el monitor de forzamiento abierto en `AM 8.33 kHz` puede aparecer para restaurar la recepción, pero el problema real es que el diseñador de canales publicado fue interpretado como la frecuencia de operación.

Si un servicio programado desde un diseñador de canal sólo se hace audible cuando se abre el monitor en `AM 8.33 kHz`, prueba la frecuencia de operación correspondiente primero, especialmente cuando el valor publicado termina con `...005`, `...010`, `...255`, `...505`, `...755`, o similar 8.33-style canal designators.

Véase también: 

[Ofcom: comprensión 8.33 kHz frecuencias y números de canal](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Deja de culpar tu radio o firmware. Mira este video en mi canal de Youtube:
[Frecuencias de aviación y MONITOR ✈️: canal ≠ frecuencia (¡el error que lo cambia todo!)](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Porcentaje de batería o tensión se ve mal

Compruebe estos puntos:

1. asegúrate de que la radio no se carga a través de `USB-C` mientras lo revisas
1. utilizar `BatTxt = VOLTAGE` o abrir `SysInf`
1. asegúrese de que `BatTyp` coincida con el paquete de batería que está utilizando
1. comparar el voltaje mostrado con un multimetro
1. si es necesario, sólo `BatCal`

Importante recordatorio:

* `BatCal` afecta la lectura de tensión
* `BatTyp` afecta la estimación del porcentaje de batería

Véase también: [operación radio](./Radio-operation#battery-display-type-and-calibration) y [Menu](./Menu#hidden-menu).

## El micrófono externo PTT se comporta de forma diferente

Este es un comportamiento conocido en algunas revisiones de hardware.

Las diferencias documentadas incluyen:

* TX puede esperar hasta que RX esté claro antes de transmitir
* Los tonos DTMF o el tono de 1750 Hz pueden cortarse rápidamente

El lado interno `PTT` no muestra esas cuestiones en los casos documentados.

Véase también: [ Funciones de botón](./Button-functions#external-microphone).

## La radio va a dormir inesperadamente

Compruebe estos menús:

* `SetOff`: sueño profundo después de un período de inactividad
* `BatSav`: ratio activa/sleep durante la operación normal

Si `SetOff` no es `OFF`, la radio puede entrar en modo de sueño después de la inactividad incluso mientras se escanea, siempre y cuando no se produzca ninguna recepción.

FoxHunt y Beacon ignoran intencionalmente `SetOff`. Si la radio permanece despierta en cualquiera de las aplicaciones, déjelo con `EXIT` antes de diagnosticar el temporizador de inactividad. Desde `v6.0.0`, son aplicaciones independientes.

Véase también: [operación radio](./Radio-operation#about-the-setoff-menu).

## La navegación parece moverse en la dirección equivocada

Si la navegación del menú o algunos controles parecen moverse en la dirección incorrecta, compruebe el elemento `SetNav` ocultado-menu primero.

Este firmware no puede detectar por sí mismo si se ejecuta en un `UV-K1` o un `UV-K5`. Debido a eso, el estilo de navegación tenía que ser expuesto como una configuración de menú.

`SetNav` te permite elegir entre:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

Esto no cambia la característica en sí mismo. Sólo cambia el estilo de navegación utilizado por el firmware, y por lo tanto cómo deben leerse los controles en su radio.

Véase también: [Empezar](./Getting-started#model-differences) y [Menu](./Menu#hidden-menu).

## Los botones no hacen lo que espero

Compruebe estas posibilidades:

1. llave de teclado puede ser habilitado
1. `SetLck` también puede bloquear el botón lateral programable / `M Long` acciones, el `PTT`, o ambos
1. Modo RescueOps deshabilita la mayoría de las prensas largas y combinaciones de teclas `F`
1. algunas acciones difieren entre `F+` y la larga prensa
1. `F` seguido de un corto botón de presión ajusta Paso, mientras que `F` seguido por sostener ese botón lateral abre el selector de acción en las ediciones actuales v6

Véase también: [funciones de botón](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon), y [Características avanzadas](./Advanced-features#rescueops).

## Comprender Power y SetPwr: potencia TX por canal y global

El menú Power determina el poder de transmisión utilizado por el canal actual o VFO. Los valores disponibles son LOW1 a LOW5, MID, ALTO o USUARIO. Por lo tanto, este ajuste se almacena localmente, por cada canal.

El menú SetPwr no selecciona directamente la potencia para un canal específico. Sólo define qué nivel de potencia real se asigna al modo USUARIO, eligiendo de LOW1 a LOW5, MID o HIGH. Este escenario es global para toda la radio.

Como resultado, todos los canales cuyo ajuste de potencia se establece en USUARIO utilizarán automáticamente el valor actualmente definido en SetPwr.

Este mecanismo permite cambiar el poder efectivo de múltiples canales fijados a USUARIO en una sola vez, sin tener que editar cada canal individualmente.

## ¿Dónde ir después?

* [Empezar](./Getting-started)
* [Programación con CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Operación radio](./Radio-operation)
* [Scanning](./Scanning)
* [Características avanzadas](./Advanced-features)
* [Menu](./Menu)
* [ Funciones de botón](./Button-functions)
