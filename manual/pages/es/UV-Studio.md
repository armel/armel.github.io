# UV Studio

UV Studio es el compañero basado en el navegador para el firmware F4HWN compatible en el UV-K1 y UV-K5 V3. Combina funciones de pantalla en vivo y teclado remoto, instalación de firmware, mantenimiento de radio, gestión Multiboot y gestión de aplicaciones Labs en una interfaz.

Ábrelo aquí:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio se comunica directamente con la radio a través de la API `Web Serial`. Los datos de radio se manejan localmente en el navegador; no se requiere instalación de aplicaciones, cuenta del servidor o carga de nube.

> [!IMPORTANT]
> UV Studio no se limita a la edición Fusion. Sus herramientas generales funcionan con ediciones F4HWN compatibles, mientras que algunas opiniones requieren una capacidad de firmware específica. En particular, la gestión de aplicaciones superpuestas y las herramientas externas son para Labs.

## Estado de la versión

UV Studio `v1.6.0` acompaña al firmware estable `v6.1.0`. Además del catálogo de firmware v6, gestión de ranuras Multiboot, y el catálogo oficial de overlay-app versionado, añade:

* una interfaz reorganizada que agrupa la calibración copia de seguridad / restauración y descarga de arranque / descarga
* respaldo completo `2 MiB` externo-Flash y restaurar para Labs compatible construye
* Comparación y verificación del CRC32 para una restauración externa más rápida y segura
* restauración guiada de la fábrica reconstruida exterior Flash seguido por el firmware de stock correcto para UV-K1 o UV-K5 V3

## Necesidades

Necesitas:

* a compatible Quansheng UV-K1 o UV-K5 V3 con el PY32F071 MCU
* una conexión `USB-C` compatible con datos o cable USB a serie compatible con Baofeng/Kenwood
* un navegador de escritorio con soporte `Web Serial`, tales como Chrome, Brave, Edge, Opera, o Firefox 151+

Una copia descargada del árbol fuente UV Studio completo también se puede abrir localmente. Es una aplicación HTML/CSS/JavaScript estática y no requiere un paso de construcción o servidor web local.

## Resumen de la función y de la radio

| Herramienta | Estado de radio requerido | Requisitos de firmware |
| --- | --- | --- |
| Visor en vivo y registro RF en vivo | inicio normal | compatibles de Viewer/RF Log |
| Firmware Flash | `DFU` / modo flash | cargador de arranque UV-K1 o UV-K5 V3 |
| Calibración, Boot Logo, RF Log export | inicio normal | firmware F4HWN compatible |
| Firmware Slots | inicio normal | Multiboot-capable `v6.0.0` o nuevo |
| Aplicaciones | inicio normal | Labs con soporte de aplicación superpuesta |
| Respaldo externo Flash / restauración | inicio normal | `v6.1.0` Labs con acceso externo-Flash |
| Restauración de software de fábrica | inicio Labs normal, luego DFU cuando se solicita | `v6.1.0` Labs para la primera etapa |

Para introducir el modo `DFU`, apagar la radio, mantener `PTT`, y encenderla mientras se mantiene `PTT`. Liberar `PTT`, luego conectar o reconectar el cable de datos. No se requiere llave lateral.

## Qué UV Studio puede hacer

UV Studio proporciona:

* una pantalla de radio `128x64` en tiempo real
* teclados virtuales UV-K1 y UV-K5 con prensas cortas y largas
* una ventana de teclado desmontable y un control de reinicio de radio
* pantallas de radio y pantalla LCD ajustable
* actividad RF en vivo, marcadores de sesión, filtros y análisis
* exportación de la actividad de RF Log almacenada a CSV
* instalación de firmware desde el catálogo oficial, la construcción de desarrollo rodante, o un archivo `.bin` local
* descarga directa del controlador CHIRP correspondiente para las versiones estables del firmware F4HWN
* instalación, validación, nombre, borrado y reajuste de configuración de ranuras de firmware Multiboot
* instalación y eliminación de aplicaciones de superposición Labs de un catálogo oficial versionado o archivos `.app` locales
* calibración de respaldo y restauración
* descarga personalizada de arranque, vista previa, conversión y carga
* copia de seguridad externa-Flash, restauración y recuperación de software de fábrica guiado en `v1.6.0`
* temas ligeros y oscuros y traducciones en diez idiomas

UV Studio posee la conexión en serie a nivel mundial. Impide que dos operaciones utilicen el puerto al mismo tiempo y mantiene o restablece la conexión al cambiar entre las herramientas normales de movimiento compatibles.

## Visor en directo

El Live Viewer refleja la pantalla de radio y proporciona teclados virtuales UV-K1 y UV-K5.

1. Empieza la radio normalmente.
1. Conecta la radio al ordenador.
1. Abra `Live Viewer`, seleccione el teclado apropiado y haga clic en `Connect`.
1. Elija el puerto serie de radio.
1. Utilice el teclado virtual o teclado informático.
1. Haga clic en `Disconnect` antes de desconectar el cable.

La barra de herramientas puede reiniciar la radio conectada, capturar una captura de pantalla, cambiar la apariencia LCD simulada, y desprender el teclado en una ventana flotante. El panel `Help` incorporado lista todos los atajos del teclado; los controles comunes incluyen las teclas de flecha para la navegación, dígitos para las prensas cortas, `Shift` más una llave para una larga prensa, `Enter` o `M` para el menú, `Esc` para la salida, y `F1` / `F2` para los botones laterales.

> [!IMPORTANT]
> El control del espectador no puede iniciar una transmisión. El `PTT` mostrado no está disponible y UV Studio no es una herramienta remota-TX.

## RF Log

Cuando el firmware de funcionamiento admite RF Log y el puente Viewer, UV Studio muestra sesiones en vivo RX y TX con:

* dirección, frecuencia e información de canal
* período de sesiones
* Nivel de señal RX o potencia TX
* tensión de batería
* Filtros `ALL`, `RX` y `TX`
* actividad, tiempo de aire, frecuencia, sesión y análisis de batería

La herramienta `Export RF Log` independiente lee hasta las últimas actividades almacenadas `512` y los marcadores de encendido y crea `rf-log.csv`. Mantenga la radio en modo normal. Si los nombres de los canales o la información de configuración-banca son incorrectos, actualice a un firmware que contiene las últimas correcciones v6 RF Log.

## Firmware Flash

> [!WARNING]
> Inyectar una imagen incompatible o corrupta puede dejar la radio inutilizable. Confirme la compatibilidad modelo y bootloader, haga una copia de seguridad de calibración y mantenga el cable conectado hasta que termine la operación.

Los grupos de catálogo de firmware actual F4HWN estable construye por edición, incluye la construcción de desarrollo Fusion, y también puede ofrecer imágenes de stock compatibles. Un archivo `.bin` local permanece disponible cuando el catálogo no se puede cargar o cuando se utiliza una compilación personalizada.

1. Comience la radio en modo `DFU`.
1. Abre `Flash Firmware`.
1. Seleccione la entrada correcta del catálogo o seleccione un archivo `.bin` local compatible.
1. Haga clic en `Flash firmware` y seleccione el puerto serie.
1. Espere a que la operación de progreso para terminar y para que la radio reinicia.

Cuando se selecciona una versión estable F4HWN build, UV Studio ofrece el controlador CHIRP compartido publicado para esa versión de firmware. El desarrollo de rodadura y las construcciones de stock no utilizan ese enlace de controlador automático.

## Ranuras de firmware

Las cuatro ediciones oficiales `v6.0.0` soportan Multiboot. UV Studio gestiona las ranuras de usuario `1` a `4` en Flash externo. La copia de seguridad `Main` protegida es mantenida por el firmware y no está expuesta intencionalmente como una ranura de trabajo.

Para instalar otra edición:

1. Comience una radio multiboot-capable normalmente.
1. Abre `Firmware Slots` y refresca la mesa.
1. Seleccione una imagen `v6.x` F4HWN compatible del catálogo o cargue un archivo `.bin` local.
1. Elija la ranura `1` a `4` y opcionalmente introduzca un nombre de pantalla de hasta caracteres `15`.
1. Seleccione `Write to slot`, confirme y espere para borrar, escribir y verificar el CRC completo.

El catálogo de ranuras excluye intencionalmente firmware de stock, v5 firmware, y la imagen de desarrollo rodante porque esas entradas no están garantizadas para volver al selector Multiboot.

Cada ranura poblada tiene dos acciones de mantenimiento independientes:

* `Erase FW` elimina la imagen del firmware almacenado pero no se reinicia el banco de configuración de la ranura.
* `Reset config` borra los canales y ajustes bancarios asociados con esa ranura pero deja su imagen firmware instalada.

Ver [Multiboot y Multiconfig](./Multiboot-and-Multiconfig) para `Main`, selección de ranuras, bancos de configuración, `SetCfg` y comportamiento de recuperación.

## Aplicaciones (Labs)

La vista `Apps` gestiona las ocho ranuras experimentales de aplicación superpuesta en la edición Labs.

1. Comience Labs normalmente y abra `Apps`.
1. Refrescar la tabla de la aplicación.
1. Seleccione la versión de firmware, luego una aplicación oficial de su catálogo versionado; alternativamente, cargue un archivo `.app` local.
1. Seleccione la ranura de destino y seleccione `Install app`.
1. En la radio, utilice `F + 7`, seleccione la aplicación y presione `M`.

UV Studio muestra el nombre de la aplicación, versión, tamaño y estado de validación. Eliminar una aplicación borra sólo la ranura de la aplicación.

> [!IMPORTANT]
> Las aplicaciones overlay están vinculadas al firmware ABI, nivel API, dirección RAM y capacidades. Seleccione la versión de catálogo de aplicaciones que coincida con el firmware instalado. Reinstalar aplicaciones compatibles después de una actualización de firmware cuando sea necesario.

Ver [Overlay apps](./Overlay-apps) para compatibilidad con cargadores y [Overlay applications](./Overlay-applications) para el propósito y los controles de cada aplicación.

## Elegir la copia de seguridad o copia correcta

Estas operaciones protegen o copian diferentes partes de la radio y no son intercambiables:

| Operación | Lo que contiene | Mejor uso | Comportamiento de calibración |
| --- | --- | --- | --- |
| UV Studio `Calibration` | calibración de RF y hardware específico | respaldo de seguridad esencial para una radio | lee explícitamente o restaura la calibración; utilizar sólo con la misma radio |
| Imagen de radio CHIRP | canales más ajustes entendidos por la versión del controlador | editando y migrando recuerdos / ajustes | no un reemplazo para una copia de seguridad de calibración |
| UV Studio `External Flash` | imagen `2 MiB` externa-Flash cruda, incluyendo configuraciones, ranuras, aplicaciones, registros, logotipo y datos de calibración en el archivo de copia de seguridad | copia de seguridad completa de archivos y recuperación | restauración preserva deliberadamente la calibración ya presente en la radio diana |
| memoria AirCopy o `Settings` | bancos de memoria seleccionados y/o ajustes de radio compatibles | sincronización de datos seleccionados entre dos radios | no copia calibración de hardware |
| AirCopy `Flash 2M` | externo Flash clonado directamente sobre un cable | haciendo que otro estado de radio compartido externo-Flash coincida con la fuente | excluye y preserva el sector de calibración de la radio diana |

Para actualizaciones de rutina, haga al menos una copia de seguridad de calibración y una imagen CHIRP. Utilice la copia de seguridad externa completa antes de experimentar con Multiboot, ranuras de aplicaciones, recuperación de fábrica o almacenamiento de bajo nivel.

## Respaldo y restauración de Flash externo (v1.6.0)

Esta herramienta requiere los comandos externos-Flash proporcionados por `v6.1.0` Labs. No está disponible en `v6.0.0`.

La vista `External Flash` lee o restaura el SPI externo `2 MiB` PY25Q16 completo por dirección física. Esto incluye bancos de configuración, ranuras de firmware, ranuras de aplicaciones, el registro RF, estado Multiboot, logotipo de arranque, y otros datos compartidos.

### Atrás

1. Comience un Labs compatible construir normalmente.
1. Abra `External Flash` y seleccione `Back up`.
1. Haga clic en `Read external flash` y seleccione el puerto serie.
1. Espere a que se lea el chip completo; esto puede tardar varios minutos.
1. Descargar `external-flash.bin`.

El respaldo es exactamente `2 MiB`. Almacénalo con seguridad: contiene datos de configuración de radio y calibración específicos para dispositivos.

### Restauración

1. Comience un Labs compatible construir normalmente.
1. Abra `External Flash` y seleccione `Restore`.
1. Elija una copia de seguridad `2 MiB` completa creada por esta herramienta.
1. Haga clic en `Restore external flash` y confirme la operación destructiva.
1. Mantenga la radio encendido y conectado hasta que la verificación termine y los reinicios de radio.

UV Studio rechaza archivos que no son exactamente `2 MiB`. Funciona sector por sector en unidades `4 KiB` y nunca borra ni escribe el sector de calibración específico del dispositivo. Con el firmware actual compara los valores de CRC32, salta sectores que ya son idénticos, escribe sólo los sectores restantes, y verifica cada uno. Se remonta a una comparación directa de byte cuando el comando CRC no está disponible.

> [!WARNING]
> La restauración reemplaza casi todo el contenido externo-Flash, incluyendo ajustes, registros, logotipo, aplicaciones, ranuras de firmware y estado Multiboot. El sector de calibración de la radio receptora se conserva, por lo que un respaldo completo de una radio no es un método para copiar la calibración de esa radio a otra.

Para una copia directa de radio a radio de Flash externo, vea la función `Flash 2M` por cable separada en [AirCopy](./AirCopy#external-flash-cloning).

## Restauración de software de fábrica (v1.6.0)

La vista `Factory reset` es una recuperación guiada de dos etapas para devolver un software UV-K1 o UV-K5 V3 a juego con Quansheng:

1. Empieza `v6.1.0` Labs normalmente.
1. Abra `Factory reset` y seleccione el modelo exacto: `UV-K1` o `UV-K5 V3`.
1. Confirme la advertencia. UV Studio carga el firmware de imagen y stock de fábrica reconstruida, a continuación verifica su tamaño y SHA-256 antes de escribir cualquier cosa.
1. UV Studio restaura y verifica el Flash externo preservando el sector de calibración específico del dispositivo.
1. Cuando se solicite, apaga la radio e introduce el modo `DFU`. No empiece normalmente entre las dos etapas.
1. Seleccione `Continue in DFU`; UV Studio instala automáticamente el firmware de stock correspondiente.

Los objetivos de stock agrupados son UV-K1 `v7.03.01` y UV-K5 V3 `v7.00.11`.

> [!WARNING]
> Esta es una restauración de software destructiva. Elimina la configuración F4HWN, estado Multiboot, ranuras de firmware, aplicaciones overlay, registros RF y el logotipo personalizado. La imagen externa es un estado de fábrica reconstruido, no un vertedero físico sin tocar. Seleccione el modelo correcto y no interrumpa ninguna etapa.

## Calibración

La calibración es específica para dispositivos. Crear una copia de seguridad antes de experimentos de firmware o mantenimiento de bajo nivel, y nombrar el archivo con el modelo de radio o número de serie para que las copias de seguridad no se mezclan entre dispositivos.

Para respaldarlo:

1. Empieza la radio normalmente.
1. Abra `Calibration` y seleccione `Back up`.
1. Haga clic en `Read calibration data`.
1. Descargar `calibration.dat`.

Para restaurarlo:

1. Empieza la misma radio normalmente.
1. Abra `Calibration` y seleccione `Restore`.
1. Elija su archivo `calibration.dat`.
1. Haga clic en `Restore calibration data` y espere la terminación.

> [!WARNING]
> Restaurar sólo la calibración que pertenece a esa radio a menos que comprenda plenamente las consecuencias.

## Logotipo de arranque

Las construcciones compatibles pueden utilizar una imagen personalizada de monocromo `128x64` al inicio o como protector de pantalla.

Para cargar un logotipo:

1. Empieza la radio normalmente.
1. Abra `Boot Logo` y seleccione `Upload`.
1. Elija una imagen en un formato común como PNG, JPEG o BMP.
1. Ajusta `Threshold` y `Invert colors` mientras revisa la vista previa.
1. Seleccione `Upload logo to radio`.
1. Elija `LOGO` en `POnMsg`, o un modo de logotipo compatible con `SetSav`.

La pestaña `Download` lee la imagen actual, la presenta y la guarda como `logo.png`.

## Solución de problemas

Si UV Studio no puede comunicarse con la radio:

* confirmar que la operación seleccionada utiliza el modo de arranque normal o DFU correcto
* desconectar el cable, reiniciar la radio en ese modo, volver a conectarlo y seleccionar el puerto serie de nuevo
* cerrar otros programas o pestañas del navegador que pueden poseer el puerto serie
* verificar que el cable lleva datos y se inserta completamente
* utilizar una edición y versión de firmware que exponga la capacidad requerida
* para aplicaciones o Flash externo, comprueba que Labs está funcionando en lugar de Fusion, FieldOps, o Transfer

El protocolo de registro `Console` expandible y los detalles de operación que pueden ayudar a identificar un comando, timeout, falla de validación o archivo incorrecto.

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Cambios recientes](./Recent-changes)
* [Programación con CHIRP](./Programming-with-CHIRP)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Características avanzadas](./Advanced-features)
* [Solucionando](./Troubleshooting)
