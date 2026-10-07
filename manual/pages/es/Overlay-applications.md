# Aplicaciones superpuestas

Esta página describe las once aplicaciones disponibles actualmente para la edición `Labs`: lo que hacen y cómo controlarlas. Para la instalación, compatibilidad e información del desarrollador, vea [Overlay apps](./Overlay-apps).

> [!NOTE]
> Las teclas de navegación dependen de la radio y el ajuste `SetNav`: `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1. En las tablas siguientes, `UP/LEFT` y `DOWN/RIGHT` se refieren a estas teclas equivalentes.

## Iniciar una aplicación

1. Instala un archivo `.app` compatible con [UV Studio](./UV-Studio#apps-labs).
1. Desde la pantalla de radio normal, presione `F`, luego `7 VOX`.
1. Seleccione una aplicación instalada con `UP/LEFT` o `DOWN/RIGHT`.
1. Presione `M` para lanzarlo.

En la mayoría de las aplicaciones, `EXIT` cierra la aplicación y vuelve al lanzador o a la pantalla de radio normal. Algunas aplicaciones de radio también se pueden asignar directamente a una clave programable a través del picker de acción normal.

## Resumen de la solicitud

| Aplicación | Propósito |
| --- | --- |
| `Broadcast FM` | Receptor FM de transmisión completo con VFO, recuerdos y escaneo de estaciones |
| `FoxHunt` | Ayuda de determinación de señales y dirección con historia, atenuación y audio guía |
| `Beacon` | Repita el beacon tipo ARDF utilizando el VFO de transmisión seleccionado |
| `Beam` | Transfer configuración de un canal entre radios compatibles sobre el aire |
| `Breakout` | Juegos Brick-breaking juego |
| `Tetris` | Juego de bloqueo con puntuación, niveles y una mejor puntuación ahorrada |
| `Cube3D` | Animated 3D shape viewer |
| `Plasma` | Patrones animados de estilo de demosceno |
| `Snake` | Juego clásico de serpiente basado en la cuadrícula con una mejor puntuación |
| `Rapid Roll` | Juego de plataformas en el que una bola debe seguir descendiendo y evitar los obstáculos |
| `Space Impact` | Disparador de espacio de desplazamiento lateral con fuego automático, misiles y patrones |

## Broadcast FM

`Broadcast FM` es un receptor completo de radiodifusión BK1080. Proporciona modos de frecuencia y memoria, cuatro bandas de transmisión, búsqueda manual, descubrimiento automático de estaciones y 48 memorias FM compartidas con la radio FM residente.

Mientras se ejecuta esta aplicación, se suspenden las funciones normales de BK4819 y de doble reloj. Los cambios a los recuerdos de FM se cometen con seguridad cuando la aplicación sale.

| Clave | Medida |
| --- | --- |
| `0`–`9` | Introduzca una frecuencia en modo VFO, o un número de memoria de dos dígitos en modo MR/salvar |
| `UP/LEFT` o `DOWN/RIGHT` | Tune un paso en modo VFO; seleccione la estación almacenada anterior/next en modo MR; elija una ranura para guardar; cambiar buscar dirección mientras escanea |
| `*` | Iniciar búsqueda manual; detener un análisis activo |
| `F`, entonces `*` o mantener `*` | Iniciar el escaneo automático y reconstruir la lista de memoria FM |
| `M` en modo VFO | Abrir `SAVE?`; presionar `M` de nuevo para guardar en la ranura seleccionada |
| `M` en modo MR | Abrir `DEL?`; presionar `M` de nuevo para eliminar la memoria seleccionada |
| `F`, entonces `1` o mantener `1` | Seleccione la siguiente banda de transmisión |
| `F`, entonces `3` o mantener `3` | Interruptor entre modos VFO y MR |
| `F`, entonces `0` o mantener `0` | Salir de la aplicación |
| `EXIT` | Borrar el último dígito ingresado, cancelar un aviso de ahorro/delite o salida |

> [!WARNING]
> El escaneado automático aclara y reconstruye la lista de memoria FM antes de almacenar las estaciones que encuentra.

## FoxHunt

`FoxHunt` ayuda a localizar un transmisor usando el VFO seleccionado. Muestra la fuerza de señal corregida en dBm, un metro S de estilo IARU, niveles máximos y mínimos, información de tendencia, y un gráfico de barras o historia de señal. Atenuación seleccionable extiende el rango útil cerca de un transmisor fuerte.

| Clave | Medida |
| --- | --- |
| `1` | Pasear entre el gráfico de la barra y la historia de la señal |
| `2` | Seleccione el siguiente modo de audio: apagado, pitidos de fuerza o audio de estación continua |
| `3` | Aumento de la atenuación |
| `F`, entonces `2` | Seleccione el modo de audio anterior |
| `F`, entonces `3` | Disminución de la atenuación |
| `UP/LEFT` o `DOWN/RIGHT` | Aumento/disminución de la atenuación directamente |
| `M` | Reiniciar los valores máximos, mínimos y de referencia de tendencia |
| Sostén `F` | Cierre o desbloquee el teclado de aplicación |
| `EXIT` | Salir mientras el teclado está desbloqueado |

El gráfico, modo de audio y ajuste de atenuación se guardan para el próximo lanzamiento. Las dos teclas de navegación permanecen disponibles mientras el teclado de aplicación está bloqueado.

## Beacon

`Beacon` transmite repetidamente un identificador Morse de estilo ARDF en el VFO de transmisión seleccionado. Se alterna entre una ventana de transmisión configurable y un período de ocio. Los identificadores disponibles son `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` y `CALL`; `CALL` envía el callsign configurado seguido por `MOE`.

| Clave | Medida |
| --- | --- |
| `1` | Aumentar la duración de transmisión en 5 segundos pasos (segundos `5`-`60`) |
| `2` | Aumentar la duración del ocio en 5 segundos pasos (segundos `5`-`240`) |
| `3` | Seleccione el siguiente identificador |
| `4` | Alterna el modo de manipulación `TONE` / `CARR` |
| `F`, entonces `1` / `2` / `3` / `4` | Cambiar el ajuste correspondiente en la dirección inversa |
| `M` durante la transmisión | Parar la ventana de transmisión actual y comenzar el período de ocio |
| `M` mientras esté ocioso | Reinicie la cuenta de ocio completo |
| Sostén `F` | Cierre o desbloquee todos los controles de aplicación |
| `EXIT` | Parar con seguridad y salir mientras los controles están desbloqueados |

La primera transmisión comienza inmediatamente. Duración, tiempo ocioso, identificador y modo de llave se guardan para el próximo lanzamiento. Si el firmware residente rechaza la transmisión, la aplicación muestra `TX OFF` y no transmite.

> [!WARNING]
> Beacon transmite automáticamente. Verifique el VFO seleccionado, frecuencia, potencia, antena, callsign, ciclo de derechos y regulaciones locales antes de lanzarlo.

## Beam

`Beam` transfiere el VFO seleccionado o configuración del canal de memoria entre radios compatibles. La radio de envío transmite los datos del canal sobre el aire; la radio receptora almacena un paquete válido en la primera memoria gratuita.

| Clave | Medida |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Alternar entre los modos de transmisión (`BEAM TX`) y recepción (`BEAM RX`); también detiene una recepción activa |
| `M` en modo TX | Enviar la configuración del canal seleccionado |
| `M` en modo RX | Empieza a esperar un paquete Beam |
| `EXIT` | Dejar de recibir o salir de la aplicación |

La pantalla reporta `SENT`, `RECEIVED`, `MEM FULL` o `ERROR` según corresponda. Sólo un canal recibido se compromete por lanzamiento; salida y reabrir Beam antes de recibir otro.

## Breakout

`Breakout` es un juego compacto de romper ladrillos con 18 ladrillos, cinco bolas de inicio, puntuación y seguimiento de nivel. Limpiar la pared comienza el siguiente nivel y premia una bola extra.

| Clave | Medida |
| --- | --- |
| `4` o `UP/LEFT` | Mueva la pala izquierda |
| `0` o `DOWN/RIGHT` | Mueva la pala derecha |
| `M` | Pausa o reanudar; después de `GAME OVER`, iniciar el nuevo juego preparado |
| `EXIT` | Salir de la aplicación |

El progreso del juego no se mantiene después de salir de la aplicación.

## Tetris

`Tetris` utiliza un pozo visible de 16 × 16, una bolsa de siete piezas, pieza fantasma, vista previa de la pieza siguiente, puntuación, líneas y niveles. La mejor puntuación se guarda entre los lanzamientos.

| Clave | Medida |
| --- | --- |
| `4` o `UP/LEFT` | Muévete a la izquierda |
| `6` o `DOWN/RIGHT` | Muévete. |
| `M` o `2` | Gira la pieza |
| `8` | gota suave |
| `*` o `0` | Caída dura |
| `F` | Pausa o reanudar |
| `M`, `*`, o `0` después del juego | Iniciar un nuevo juego |
| `EXIT` | Salir de la aplicación |

Movimiento y suave gota repetir mientras sus llaves se sostienen.

## Cube3D

`Cube3D` hace girar formas sólidas o de alambre. Hay ocho formas disponibles: cubo, octaedro, tetraedro, diamante, icosahedro, cuboctaedro, prisma hexagonal, y gema pentagonal.

| Clave | Medida |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Aumento/disminución de la velocidad de rotación (`1`-`16`) |
| `1`–`8` | Seleccione una forma directamente |
| `*` | Seleccione la siguiente forma |
| `F` | Alterna entre renderizado de estructura alámbrica y sólido |
| `M` | Pausa o reanudar |
| `EXIT` | Salir de la aplicación |

## Plasma

`Plasma` muestra patrones de demoscenes de pantalla completa animados con bandas o renderizado estipplendido.

| Clave | Medida |
| --- | --- |
| `UP/LEFT` o `DOWN/RIGHT` | Aumentar/disminuir la velocidad de animación (`1`-`8`) |
| `1`–`5` | Seleccione un patrón y desactivar el ciclismo automático |
| `*` | Alterna entre renderizado por bandas y punteado |
| `F` | Activar o desactivar el ciclismo automático |
| `M` | Pausa o reanudar |
| `EXIT` | Salir de la aplicación |

## Snake

`Snake` es un juego clásico de estilo Nokia jugado en una cuadrícula `31 × 13`. Come la comida para cultivar la serpiente y marcar puntos `10`. Esconder la frontera o el propio cuerpo de la serpiente termina el juego. La mejor puntuación se guarda entre los lanzamientos.

| Clave | Medida |
| --- | --- |
| `2` o `3` | Muévanse. |
| `4` o `5` | Muévete a la izquierda |
| `6` o `0` | Muévete. |
| `8` o `9` | Muévete. |
| `F` | Pausa o reanudar |
| `M`, `*`, o `0` después del juego | Iniciar un nuevo juego |
| `EXIT` | Salir de la aplicación |

Mantener una tecla de dirección lo repite. La aplicación rechaza una inversión inmediata en el propio cuerpo de la serpiente. Si el protector de pantalla se activa durante un juego, Snake pausa y retoma después del despertar.

## Rapid Roll

`Rapid Roll` es un juego de plataformas en el que estas ascienden hacia un techo con pinchos. Mueve la bola lateralmente y hazla descender de una plataforma segura a la siguiente. Las plataformas con pinchos, el techo y la parte inferior de la pantalla cuestan una vida; a partir del nivel 3 aparecen plataformas que se desmoronan. Los corazones conceden `50` puntos y recuperan una vida, hasta un máximo de cinco.

| Clave | Medida |
| --- | --- |
| `4` o `UP/LEFT` | Rodar a la izquierda |
| `6` o `DOWN/RIGHT` | Rodar a la derecha |
| `F` | Pausar o reanudar |
| `M` después del fin de la partida | Iniciar una nueva partida |
| `EXIT` | Salir de la aplicación |

El juego comienza con tres vidas y se acelera a medida que aumenta el nivel. Las plataformas seguras se estrechan en los niveles superiores. El progreso no se conserva tras salir de la aplicación. Si el protector de pantalla se activa durante una partida, Rapid Roll se pausa y continúa al reactivarse la radio.

## Space Impact

`Space Impact` es un juego de disparos espaciales con desplazamiento lateral. La nave dispara automáticamente su arma principal, dejando los controles libres para el movimiento vertical. Las oleadas enemigas utilizan distintos patrones de movimiento y ataque; al final de cada nivel aparece un jefe con una barra de salud visible.

| Clave | Medida |
| --- | --- |
| `2` o `UP/LEFT` | Mover la nave hacia arriba |
| `8` o `DOWN/RIGHT` | Mover la nave hacia abajo |
| `5` o `M` | Lanzar un misil perforante |
| `F` | Pausar o reanudar |
| `M` después del fin de la partida | Iniciar una nueva partida |
| `EXIT` | Salir de la aplicación |

El juego comienza con tres vidas y tres misiles. El arma principal dispara automáticamente. Cada 16 enemigos eliminados se obtiene otro misil, hasta un máximo de nueve. Derrotar a un jefe concede una vida extra y un misil si se está por debajo de los límites correspondientes. El progreso no se conserva tras salir de la aplicación. Si el protector de pantalla se activa durante una partida, Space Impact se pausa y continúa al reactivarse la radio.

## Páginas relacionadas

* [Overlay apps](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [ Funciones de botón](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [FM broadcast radio receiver](./FM-broadcast-radio-receiver)
