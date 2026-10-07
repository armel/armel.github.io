# Operación de radio

Esta página cubre la operación diaria del transceptor: conmutación entre VFO y modo de memoria, lectura de la barra de estado, comprensión de las restricciones TX y manejo del comportamiento del sueño.

Para las características relacionadas con el escaneo, véase [Scanning](./Scanning). Para ver y mantener en vivo basado en el navegador, véase [UV Studio](./UV-Studio). Para copiar radio a radio, véase [AirCopy](./AirCopy). Para RescueOps, Modo de Resume, el juego integrado y el procedimiento de desbloqueo TX orientado a la investigación, véase [Características avanzadas](./Advanced-features).

> [!WARNING]
> No use CPS Quansheng. Sobrescribe ajustes personalizados.

## En esta página

* [Operación básica](#basic-operation--configuration)
* [Status bar](#status-bar)
* [Vista de batería, tipo y calibración](#battery-display-type-and-calibration)
* [Sobre los menús `F Lock` y `TXLock`](#about-the-f-lock-and-txlock-menus)
* [Protector de pantalla y tiempo de espera de la retroiluminación](#screen-saver-and-backlight-timeout)
* [Sobre el menú SetOff](#about-the-setoff-menu)
* [1750 Hz explosión de tono para el acceso del repetidor](#1750-hz-tone-burst-for-repeater-access)
* [Páginas relatadas](#related-pages)

> [!TIP]
> Cheques rápidos comunes:
> - Quansheng CPS sobrescribió la configuración personalizada
> - la frecuencia está fuera del plan `F Lock` seleccionado
> - `TXLock` sigue siendo `ON`
> - `AM` o `USB` se selecciona en lugar de `FM`
>
> Véase [Troubleshooting](./Troubleshooting) para la versión corta.

## Configuración básica de operaciones

La pantalla de radio se divide en un VFO superior y un VFO inferior. Puede cambiar la selección superior/más baja pulsando `F` + `2 A/B` (o por `2 A/B` de larga presión).

Cada VFO puede operar independientemente en modo de frecuencia o modo de canal. Para cambiar los modos, seleccione el VFO deseado y presione `F` + `3 VFO/MR` (o `3 VFO/MR` de alta presión).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

En `frequency mode`, introduces manualmente la frecuencia con el teclado. También puede cambiar diferentes opciones para ese VFO en el menú (las primeras 13 entradas del menú). Una vez que se configura el VFO, los ajustes se pueden guardar en un canal de memoria entrando en el menú `ChSave` y eligiendo el canal de memoria objetivo.

En `channel mode`, puede cambiar entre canales de memoria guardados. Los canales de memoria se pueden agregar manualmente como se mencionó anteriormente o programado desde un ordenador con el controlador `CHIRP` proporcionado con cada lanzamiento de firmware. Ver [Programación con CHIRP](./Programming-with-CHIRP) para el flujo de trabajo F4HWN dedicado.

Para el análisis de frecuencia, el análisis de memoria, `ScnRng` y DCS / CTCSS escaneado, vea [Scanning](./Scanning).

## Barra de estado

En la parte superior de la pantalla, en la primera línea, es la barra de estado. Muestra mucha información. Estos son algunos ejemplos:

| Captura&nbsp;de&nbsp;la&nbsp;Quansheng&nbsp;K5&nbsp;con&nbsp;el&nbsp;firmware&nbsp;F4HWN                | Descripción |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR significa que RxMode está configurado en DUAL RX RESPOND, OP significa que PTT está configurado en ONEPUSH, el icono F significa que la tecla `F` ha sido presionada, y usted ve el voltaje de la batería. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS significa que Power Save está activado, DW significa que RxMode está listo para MAIN TX / DUAL RX, VX significa que VOX está activado, CL significa que PTT está establecido en CLASSIC, el icono de bloqueo significa que el teclado está bloqueado, y usted ve el voltaje de la batería. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS significa que Power Save está activado, MO significa que RxMode está listo para MAIN SOLO, OP significa que PTT está fijado para ONEPUSH, y usted ve el porcentaje de la batería. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO significa que RxMode está listo para MAIN ONLY, OP significa que PTT está fijado para ONEPUSH, el icono de Luz significa que el control manual de Backlight está activado, y usted ve el porcentaje de batería. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | El temporizador RX en la izquierda indica cuánto tiempo ha sido desde que recibió una señal, OP significa que PTT está establecido en ONEPUSH, el icono de Luz significa que el control manual de Backlight está activado y usted ve el porcentaje de batería. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | El pequeño `PMR` en vídeo inverso y `><` significa que actualmente estás escaneando la lista `PMR`, CL significa que PTT está establecido en CLASSIC, el icono de la luz significa que el control manual de Backlight está activado, y ves el porcentaje de la batería. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | El icono `ALL` y `><` significan que actualmente está escaneando todos los canales listados, OP significa que PTT se establece en ONEPUSH, el icono de la luz significa que el control manual de la retroiluminación está activado, y usted ve el porcentaje de la batería. |

> [!NOTE]
> Acerca de `RxMode`, `MO` significa MAIN SOLO, `DW` significa MAIN TX / DUAL RX, `DWR` significa DUAL RX RESPOND, y `XB` significa CROSS BAND.

## Pantalla de batería, tipo y calibración

El firmware separa tres cosas diferentes relacionadas con la batería:

* el voltaje de la batería medida
* Porcentaje estimado de batería
* el sueño / comportamiento de ahorro de energía

Para información de la batería en pantalla:

* `BatTxt` añade `VOLTAGE` o `PERCENT` a la barra de estado, o lo oculta con `NONE`
* `SysInf` muestra el voltaje de batería corregido, el porcentaje de batería estimado, y la versión de firmware

Para el porcentaje de batería para tener sentido, dos elementos oculta-menú importan:

* `BatCal` calibra el voltaje de batería mostrado
* `BatTyp` selecciona la curva de descarga utilizada para la estimación del porcentaje de batería

Importante diferencia:

* `BatCal` cambia la lectura de tensión
* `BatTyp` cambia el cálculo `%`, no el voltaje medido en sí

Las opciones actuales `BatTyp` son:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Como con cualquier estimación basada en el voltaje, el porcentaje de batería es sólo aproximado. Depende del perfil de batería seleccionado, la condición de la batería y la carga actual.

### Calibrar el voltaje de la batería con un multimetro

1. Asegúrese de que la radio no está cargando a través de `USB-C`.
1. Deja que la radio permanezca inactiva por un momento. No calibrar mientras se transmite.
1. Medir el voltaje de la batería con un multimetro en los contactos de la batería en la parte posterior del paquete de radio / batería.
1. Abra el menú oculto y vaya a `BatCal`.
1. Ajuste `BatCal` hasta que el voltaje mostrado por la radio coincida con el multimetro lo más cerca posible.
1. Confirme con `M`.

> [!TIP]
> Si el voltaje es correcto pero el porcentaje todavía se siente mal, `BatCal` probablemente está bien y `BatTyp` es el ajuste a revisar.

## Acerca de los menús `F Lock` y `TXLock`

En el pasado, había algunos planes de banda en el menú `F Lock` para satisfacer diversas solicitudes: PMR 446, FRS/GMRS/MURS, etc. Sin embargo, la adición de nuevas opciones `F Lock` siempre tomó mucha memoria: nuevas opciones en el menú `F Lock`, frecuencias de almacenamiento (para especialistas, estos son `uint32_t` cada vez, por lo que son muy consumidores de memoria), etc.

Ahora, debe reconocerse que era complicado, si no imposible, ofrecer planes de banda que pudieran cubrir y satisfacer todas las expectativas. Hay demasiadas variaciones de un país a otro. Además, nada está planeado para combinar múltiples planes de frecuencia del menú `F Lock`. Por ejemplo, abriendo las bandas PMR 446 y LPD. En resumen, `F Lock` es demasiado limitado y no escalable.

Aquí está la solución:

1. Seleccione el plan de banda más adecuado del menú `F Lock`. Por ejemplo, si usted tiene un callsign y vive en Europa, seleccione CE HAM. Si usted no tiene un callsign y son sólo un SWL, seleccione TODO DISABLE, que es más seguro.
1. Si todavía desea transmitir en un canal de memoria que no está abierto por el plan de banda, vaya al menú `TXLock` y seleccione `OFF`. Esto crea una excepción y permite la transmisión en ese canal.

En pocas palabras:

* si la frecuencia está dentro del plan de banda seleccionado en `F Lock`, puede transmitir
* si la frecuencia está fuera del plan de banda seleccionado en `F Lock`:
  * puede transmitir sólo si `TXLock` es `OFF`
  * no se puede transmitir si `TXLock` es `ON`

Si un canal de memoria o VFO está fuera del plan de banda seleccionado y `TXLock` es `ON`, habrá un pequeño candado a la izquierda del nombre.

Para el procedimiento `UNLOCK ALL` orientado a la investigación, véase [Características avanzadas](./Advanced-features#tx-on-all-bands).

## Salvador de pantalla y tiempo de retroiluminación

Construye con soporte de pantalla añadir el menú `SetSav`.

`SetSav` funciona junto con `BLTime`: cuando la radio es ociosa y el tiempo de retroiluminación expira, el protector de pantalla puede reemplazar la pantalla normal en lugar de simplemente dejar la pantalla sin cambios.

Los modos disponibles son:

* `OFF`: sin protector de pantalla
* `LOGO`: mostrar el logotipo de arranque personalizado como una pantalla de ocio
* `LOGO+`: mostrar el logotipo de arranque personalizado con un efecto de desplazamiento
* `MATRIX`: mostrar una pantalla idle animada de estilo matriz

Los modos de logotipo utilizan el mismo logotipo `128x64` subido con [UV Studio](./UV-Studio#boot-logo).

El protector de pantalla se suspende intencionadamente durante el trabajo de radio activo: RX, TX, PTT, BEAM y el escaneo FM activo. Se puede mostrar en la pantalla de radio principal y la pantalla de transmisión FM cuando la radio está inactiva. Presionar una llave despierta la pantalla normal.

Si `BLTime` se fija en un valor de estilo siempre apagado o siempre en lugar de una duración temporizada, `SetSav` no toma el control de la pantalla.

## Acerca del menú SetOff

El menú `SetOff` le permite configurar un timeout antes de que su radio entre en modo de sueño. Este retraso se puede establecer entre 1 minuto y 2 horas. Si `SetOff` es `OFF`, el modo de sueño está deshabilitado.

Por ejemplo, si usted establece el retraso a 5 minutos y durante este tiempo hay:

* no recepción
* no transmisión
* sin botón pulsar

entonces tu radio entrará automáticamente en modo de sueño. Se le notificará 10 segundos antes con una pantalla parpadeante.

Tenga en cuenta que el modo de sueño se activará incluso si está escaneando, siempre y cuando no se produzca la recepción.

FoxHunt y Beacon son excepciones deliberadas: mientras que la aplicación es activa, la radio ignora `SetOff` hasta que usted lo deja explícitamente. El tiempo normal de retroiluminación todavía funciona. Véase [FoxHunt](./Fox-Hunt) y [Beacon](./Beacon).

Una vez en modo de sueño:

* la pantalla está completamente apagada
* el LED rojo en la base de los parpadeos de la antena
* el módulo BK4819 entra en modo de sueño profundo y despierta periódicamente cada:
  * 2 segundos si `BatSav` se establece en `1:1`
  * 4 segundos si `BatSav` se establece en `1:2`
  * 6 segundos si `BatSav` se establece en `1:3`
  * 8 segundos si `BatSav` se establece en `1:4`
  * 10 segundos si `BatSav` se establece en `1:5`

Para salir del modo de sueño, simplemente necesita:

* recibir una señal durante la fase de despertar periódica BK4819
* iniciar una transmisión pulsando el botón PTT
* o presionar cualquier otro botón

Como ejemplo, probé el modo de sueño en dos radios K5(8) con baterías calibradas y totalmente cargadas, utilizando la misma configuración, frecuencias, modo (`DWR`), y `BatSav` configurado en `1:5`. La única diferencia era que una radio tenía el modo de sueño habilitado mientras que la otra no. Después de 36 horas de funcionamiento, la radio sin modo de sueño tenía sólo un 20% de batería restante, mientras que la que tiene modo de sueño todavía tenía un 60% de batería.

## ráfaga de tono de 1750 Hz para el acceso del repetidor

Cuando se presiona `PTT`, el tono 1750 Hz se puede activar pulsando [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Páginas relacionadas

* [Empezar](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programación con CHIRP](./Programming-with-CHIRP)
* [Scanning](./Scanning)
* [Menu](./Menu)
* [ Funciones de botón](./Button-functions)
* [Características avanzadas](./Advanced-features)
* [Solucionando](./Troubleshooting)
