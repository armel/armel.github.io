# Scanning

Esta página agrupa todas las características relacionadas con el escaneo: escaneo de frecuencia, escaneo de memoria, listas de escaneo, `ScnRng`, copia de frecuencia y escaneo DCS / CTCSS.

Para el día a día VFO / operación de canal, vea [operación de radio](./Radio-operation). Para el uso del espectro de barrido, vea [Spectrum analizar](./Spectrum-analyzer).

## En esta página

* [Escaneo de frecuencia](#frequency-scanning)
* [Canales de memoria escaneando](#memory-channels-scanning)
* [lista de escáneres MIX](#mix-scan-list-v610)
* [Modo de motor de la pantalla: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Indicadores de escáner y detección](#scan-indicators-and-detection)
* [Copia de frecuencia y escaneo DCS / CTCSS](#frequency-copy-and-dcs--ctcss-scanning)
* [Páginas relatadas](#related-pages)

> [!TIP]
> Si el análisis de memoria parece roto, la causa más común es una lista de exploración activa vacía. Consulte [Solución de problemas](./Troubleshooting) para realizar las comprobaciones rápidas.

## Escaneo de frecuencia

Para iniciar un análisis de frecuencia, cambie un VFO al modo de frecuencia. Establecer una frecuencia de inicio. Establecer un paso de frecuencia (menu `Step`). Comience a escanear con una [función del botón de exploración personalizada](./Button-functions#custom-button-functions) o presionando el botón `* Scan`.

### Función de frecuencia de exploración

* cambiar al modo de frecuencia
* establecer las frecuencias VFO superiores e inferiores a los límites del rango de exploración
* `5 NOAA` de larga duración; la etiqueta `ScnRng` debe aparecer
* iniciar el escaneo por la larga presión `* Scan`
* la radio escaneará entre los límites seleccionados
* `5 NOAA` de alta presión o `EXIT`, o cambiar VFOs, para salir del modo `ScnRng`

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

La función `ScnRng` también es compatible con el analizador de espectro. Si usted ya ha habilitado `ScnRng`, simplemente comience el [análisis del espectro](./Spectrum-analyzer).

Si utiliza [AirCopy](./AirCopy) y transfiere `Settings`, el área VFO está incluido. Esto también copia las frecuencias actuales del límite `ScnRng` de la radio fuente a la radio de destino.

### Frecuencias Excluidas en ScnRng

Mientras que un escáner `ScnRng` se detiene en una frecuencia recibida, `MENU` de larga presión para excluir esa frecuencia del análisis de rango actual.

Hasta **64** frecuencias de la gama se pueden excluir. La lista es circular: después de 64 exclusiones, añadir otro reemplaza la exclusión almacenada más antigua.

Estas exclusiones son temporales. Se mantienen sólo para la configuración activa de `ScnRng` y no están escritos a la memoria. Se aclaran si la radio se reinicia, y también se aclaran cuando cambia la identidad del rango: iniciar la frecuencia, detener la frecuencia o paso de exploración.

## Escaneo de canales de memoria

El escaneo de memoria permite que el escaneo de radio guarde canales de memoria en lugar de pasar por frecuencias.

Para utilizarlo, cambie el VFO a **Modo de memoria**, luego comience a escanear con una tecla de escaneo programada o por `* Scan` de larga presión.

### Listas de exploración

La radio proporciona **24 listas de escaneo**. Cada canal de memoria se puede asignar a:

* `OFF`: el canal está excluido de las listas de escaneo
* `1` a `24`: el canal pertenece a una lista de exploración específica
* `ALL`: el canal está incluido en todas las listas de exploración

Un canal de memoria sólo puede pertenecer a uno de estos estados a la vez.

`MIX` es un modo de exploración activo, no otra asignación por canal. Combina varias de las listas numeradas; véase [lista de escaneado MIX](#mix-scan-list-v610).

### Asignar un Canal a una Lista de Escáneos

Para cambiar la asignación de la lista de exploración del canal de memoria actual:

* abrir el menú `ScList`
* o `5 NOAA` de larga duración para el acceso rápido

El atajo rápido recorre el canal a través de:

* `OFF`
* `1` a `24`
* `ALL`

La asignación actual se muestra a la derecha del nombre del canal.

### Listas de Escáner

Las listas de escáner pueden tener nombres cortos.

Cuando una lista tiene un nombre, la radio muestra que **3 caracteres nombre** en lugar del número de lista numérica donde sea posible:

* en los indicadores de estado relacionados con el escaneo
* en menús de selección de lista
* en la pantalla de la lista de canales

Si una lista no tiene nombre, la radio muestra el número de lista.

### Lista de escáneres activos

El escaneo de memoria siempre usa una lista de escaneo **activo**.

La lista actualmente activa se muestra en la parte superior izquierda de la pantalla mientras se escanea:

* `01` a `24` para una lista numerada
* `MIX` para la combinación guardada de listas seleccionadas, comenzando con `v6.1.0`
* `ALL` para todos los canales listados

Si la lista seleccionada tiene un nombre, ese nombre corto se muestra en lugar del número.

Si la lista seleccionada está vacía o inválida, la radio cambia automáticamente a la siguiente lista válida y no vacía.

### Inicio del escáner de memoria

Una vez que los canales han sido asignados a las listas, inicie el análisis de memoria por:

* usando una clave asignada a la función de exploración
* o `* Scan` de larga presión

La radio entonces escanea los canales de memoria que pertenecen a la lista de escaneos activos actualmente.

### Cambiar la lista de escáneos durante el escáneo

La lista de exploración activa se puede cambiar sin detener el escaneo.

* `* Scan` de larga duración: cambiar a la siguiente lista de exploración no vacía válida
* `F + navigation key`: navegar a través de listas de escaneo mientras se escanea (`UP` / `DOWN` en UV-K5, `LEFT` / `RIGHT` en UV-K1)
* entrada directa de teclado:
  * `01` a `24`: seleccione la lista de exploración directamente
  * `25`: seleccione `MIX`, empezando por `v6.1.0`
  * `00`: seleccione `ALL`

Si la lista solicitada está vacía, la radio se escucha y salta a la siguiente lista válida y no vacía.

Cuando un escáner de memoria cambia las listas, el nombre de la lista reemplaza temporalmente el medidor de progreso. En `v5.9.0`, la reanudación del escaneo se mantiene mientras que ese nombre es visible, por lo que el medidor oculto y la posición del escaneo actual no pueden derivar aparte y luego saltar hacia adelante cuando el medidor regrese.

Esta sujeción corta se aplica sólo al escáner de memoria. El escaneo de frecuencias y `ScnRng` todavía pueden armar la misma cuenta atrás a través de sus controles, pero no muestran un nombre de lista de escaneo y por lo tanto continúan sin una pausa sin explicación.

### Lista de exploración MIX (v6.1.0)

`MIX` escanea varias listas numeradas como un conjunto combinado sin cambiar la lista asignada a cualquier canal. Se incluye un canal cuando:

* pertenece a una de las listas numeradas habilitadas en el editor `MIX`, o
* su asignación de canal es `ALL`

Los canales asignados a `OFF` permanecen excluidos. Un canal todavía tiene sólo una asignación (`OFF`, `01` a `24`, o `ALL`); `MIX` almacena una máscara de selección separada describiendo qué listas numeradas deben combinarse.

Para configurar `MIX`:

1. Abre `ScList`.
1. Seleccione `MIX` y pulse `M`.
1. Utilice las teclas de navegación para pasar por las listas `01` a `24`, o introduzca un número de lista de dos dígitos para saltar directamente a él.
1. Presione `M` para cambiar la lista resaltada `ON` o apagado.
1. Presione `EXIT` para guardar la selección y hacer `MIX` el modo de exploración activo.

El editor muestra la lista seleccionada como `NN/24`. Por lo menos una lista debe permanecer habilitada; intentar desactivar la última lista seleccionada produce un error beep.

La secuencia normal de la lista de exploración se convierte en `01` a través de `24`, luego `MIX`, luego `ALL`. Durante un análisis de memoria activo, introduzca `25` para seleccionar `MIX` directamente o `00` para seleccionar `ALL`. Si el `MIX` resultante no contiene ningún canal escandaloso válido, el radio emite y avanza al siguiente modo válido.

La máscara `MIX` guardada es parte de la configuración de radio y se incluye en una transferencia [AirCopy](./AirCopy) `Settings`.

### Cambiar la dirección de escaneo

Mientras se escanea, presione una tecla de navegación:

* `UP` / `DOWN` en UV-K5
* `LEFT` / `RIGHT` en UV-K1

Esto revierte la dirección utilizada para pasar por los canales de memoria en la lista de escaneo actual.

### Escaneo prioritario

La radio apoya dos canales prioritarios:

* `PriCh1`
* `PriCh2`

Estos están configurados en el menú y controlados por el ajuste `ScPri`.

#### Cómo funciona

Cuando se activa el escaneo de prioridad, la radio no simplemente escanea los canales en orden de lista. En lugar de ello, se insertan repetidamente los canales prioritarios en el ciclo de exploración.

La secuencia de exploración se convierte en:

1. `PriCh1`
1. `PriCh2`
1. siguiente canal regular de la lista de exploración activa

Este ciclo repite continuamente.

Esto permite que la radio revise los dos canales prioritarios más a menudo que los canales regulares, por lo que la actividad en ellos se detecta más rápido.

#### Comportamiento importante

Cuando se activa el análisis prioritario:

* canales prioritarios se manejan por separado de la lista normal
* si un canal de prioridad también pertenece a la lista de exploración activa, se elimina de la vía de exploración regular para evitar ser escaneado dos veces
* los canales prioritarios todavía pueden ser revisados incluso si están fuera de la lista normal progresión

### Comportamiento de parada y reanudación del escaneo

Cuando el escáner encuentra actividad en un canal, lo que sucede después depende de la configuración `ScnRev`.

Dependiendo de esta configuración, la radio puede:

* reanudar el análisis automáticamente después de un retraso
* permanecer detenido en el canal activo hasta que el escaneo se reinicia manualmente

Por lo tanto, el comportamiento de pausa y reanudación de la pausa son controlados por el modo de reanudación de la exploración, no por la lista de exploración en sí.

### Exclusión de un canal durante el escáneo

Mientras que el análisis de memoria se detiene en un canal de memoria recibido, `MENU` de larga presión para excluir ese canal de futuros escáneres de memoria.

#### Nota importante

Esta exclusión es temporal.

El canal permanece excluido hasta el próximo reinicio del transceptor.

### curriculum vitae

Si apaga el transceptor mientras está escaneando, el escaneo se reanudará automáticamente la próxima vez que lo reinicie.

### Frecuencia común / funciones de escaneo de canal

Los siguientes controles se aplican tanto al escaneo de frecuencia como al escaneo de memoria:

* presione una tecla de navegación mientras se escanea para revertir la dirección de exploración (`UP` / `DOWN` en UV-K5, `LEFT` / `RIGHT` en UV-K1)
* presione `EXIT` para detener el escaneo y volver a la frecuencia o canal que fue seleccionado antes de iniciar el escaneo
* presione `PTT` o `MENU` para detener el escaneo y mantener la última frecuencia o canal donde se encontró actividad

## Modo de motor de escaneo: NORMAL vs FAST

Construye con soporte de escaneado rápido añadir el menú `SetScn`. Selecciona el motor de exploración utilizado por el análisis de memoria y `ScnRng`.

### NORMAL

`NORMAL` utiliza la ruta de exploración estándar. Cada canal de frecuencia o memoria se aplica completamente a la radio, con configuración VFO normal, configuración de potencia de squelch/output, configuración de registro de receptor y el tiempo de pausa de exploración habitual.

Este modo es la opción más conservadora. Es útil si prefiere el comportamiento de escaneo más antiguo o desea comparar resultados con el motor rápido.

### FAST

`FAST` es el modo predeterminado en las construcciones actuales. Añade un pre-check ligero de RSSI antes de la configuración completa de recibir:

* para el análisis de memoria, el firmware sondea la siguiente frecuencia de canal y se salta rápidamente si es claramente silencioso
* para `ScnRng`, el firmware probe un pequeño lote de pasos de rango antes de hacer una melodía completa
* lotes silenciosos se saltan más rápido, así que el escaneo pasa menos tiempo en el espectro vacío
* las señales posibles se promueven de nuevo a la ruta de recepción completa normal, por lo que el comportamiento de squelch y el análisis normal todavía decide lo que sucede después
* en `ScnRng`, los pasos finos se pueden refinar alrededor de un candidato para que el escaneo se acerque a la señal más fuerte cercana
* si el bucle de escaneo se encuentra después de la pausa `ScnRev` normal ha expirado, un corto reloj retoma el escaneo

El rápido pre-check aprende un piso de ruido local de RSSI y compara cada sonda contra ese piso y el umbral de esqueleto configurado. Si el squelch está completamente abierto, o si el camino rápido no puede controlar de forma segura un canal, el firmware vuelve a la normal sintonía completa para ese paso.

> [!NOTE]
> En `ScnRng`, el modo `FAST` puede escanear alrededor de **150+ frecuencias por segundo** en condiciones favorables, especialmente cuando la mayoría de la gama es tranquila y el escaneo puede saltar murciélagos silenciosos sin hacer una configuración completa para cada paso.

El escaneo de frecuencia simple fuera de `ScnRng` todavía avanza un paso de frecuencia a la vez; `SetScn = FAST` cambia principalmente el escaneo de memoria y el comportamiento de rango de escaneo.

## Indicadores de escaneo y detección

Las actuales construcciones rápidas pueden mostrar una pequeña chispa RSSI mientras se escanea. Es una historia compacta de muestras recientes de RSSI; muestras tranquilas permanecen bajas, mientras que los candidatos más fuertes destacan como marcas más altas.

Durante el análisis de memoria, el indicador de lista de exploración sigue mostrando la lista activa:

* `01` a `24`
* `MIX`, empezando por `v6.1.0`
* `ALL`
* el nombre de la lista de 3 caracteres, cuando la lista tiene uno

Cuando se activa el escaneo de prioridad, se adjunta un `+` al indicador de lista de escaneo.

Durante `ScnRng`, se construye con soporte de rango de escaneo subaudible puede detectar CTCSS / DCS mientras la radio se detiene en una señal recibida. Si se encuentra un código, el análisis UI puede mostrar el tono detectado o código DCS junto con la frecuencia recibida.

La pantalla también refina la colocación del indicador de bloqueo VFO mientras se escanea, por lo que el estado TX-lock sigue siendo visible sin superponer la información de exploración activa.

## Copia de frecuencia y escaneo DCS / CTCSS

Esta función le permite detectar y copiar la frecuencia y configuración de codificación. La búsqueda de frecuencia funciona sólo para señales fuertes, por lo que la radio de transmisión tiene que estar cerca. Para iniciar la copia de frecuencia (`FC`), utilice el botón de función `4 FC`. La pantalla del escáner se abrirá. Presione y mantenga el botón PTT en la otra radio. Espera un par de segundos hasta que la frecuencia y el código (si se usa) aparezcan en la pantalla. Los ajustes se pueden guardar con el botón `MENU`. Se guardarán ya sea en un canal o en el VFO principal, dependiendo del modo en que haya iniciado el escaneo.

En las construcciones actuales, la pantalla del escáner hace el estado más explícito:

* `Search Freq`: búsqueda de frecuencia se está ejecutando
* `Search Tone`: búsqueda subaudible de tono/código se está ejecutando
* `Scan Complete`: se encontró un resultado
* `Scan Failed`: no se encontró ningún resultado usable
* `Freq:` muestra la frecuencia detectada
* `Tone:` / `CTCSS:` / `DCS:` muestra el ajuste subaudible detectado cuando se encuentra

También puede buscar sólo el código DCS / CTCSS para un conjunto de frecuencia en el VFO principal. Elija la frecuencia o canal deseado y pulse `F` + `* SCAN`. La misma pantalla aparecerá, pero la búsqueda de frecuencia se omitirá; la frecuencia del VFO principal se utilizará en su lugar. Espere a que una señal aparezca o presione el PTT en la otra radio. Se tarda 1 a 2 segundos en encontrar el código. El procedimiento de ahorro es el mismo que antes.

Hay otra manera de escanear un código DCS / CTCSS. Elija la frecuencia o el canal deseado. Vaya al menú `RxDCS` o `RxCTCS`. Introduzca la opción del menú y presione el botón `* SCAN`. Aparecerá una etiqueta `SCAN`. Espera una señal de radio o pulsa el botón PTT en la otra radio. Cuando se encuentre el código, la etiqueta `SCAN` desaparecerá. Para guardarlo, confirme la opción con el botón `MENU`. No importa cuál de los dos elementos del menú que empieza: tanto DCS como CTCSS se puede encontrar, y la entrada del menú se cambiará a la correcta.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Operación radio](./Radio-operation)
* [ Funciones de botón](./Button-functions)
* [Spectrum analizar](./Spectrum-analyzer)
* [Características avanzadas](./Advanced-features)
* [AirCopy](./AirCopy)
* [Solucionando](./Troubleshooting)
