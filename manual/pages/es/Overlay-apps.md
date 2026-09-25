# Aplicaciones superpuestas

Las aplicaciones overlay son pequeños programas `.app` almacenados en Flash externo y cargados en un espacio de trabajo dedicado `4 KiB` RAM sólo cuando se lanza. Permiten que la edición experimental `Labs` agregue herramientas, modos de radio, demostraciones visuales y juegos sin ajustar permanentemente cada aplicación en el Flash interno del firmware.

> [!WARNING]
> Las aplicaciones overlay son una función experimental `v6.0.0`. En la actualidad, sólo la edición `Labs` contiene el cargador de aplicaciones. Las aplicaciones están vinculadas a un firmware ABI, nivel API, dirección RAM y capacidades de residentes opcionales; actualizar o reinstalar una aplicación si la radio reporta un error de compatibilidad.

## Cómo funciona la plataforma

La radio proporciona ranuras de aplicaciones `8` externa-Flash. Cada ranura contiene un encabezado más el código de aplicación de la mayoría `4 KiB`. Antes de que una aplicación se ejecute, el cargador comprueba:

* el formato de aplicación / encabezado y estado comprometido
* el nivel ABI requerido y mínimo API
* el tamaño de código y la dirección de enlace RAM
* las capacidades de firmware residentes necesarias
* a CRC-32 del código después de que se haya cargado en RAM

El firmware interno Flash nunca se reescribe cuando una aplicación es instalada, lanzada o eliminada. Una aplicación mala o incompatible es rechazada limpiamente en lugar de ser ejecutada.

El catálogo actual contiene once aplicaciones: herramientas de radio como `Broadcast FM`, `FoxHunt`, `Beacon` y `Beam`, más `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` y `Space Impact`. Ver [Overlay applications](./Overlay-applications) para las aplicaciones documentadas y sus controles. La disponibilidad depende de los binarios de aplicaciones distribuidos para la versión de firmware seleccionada y de las capacidades compiladas en el firmware Labs.

## Instalar una aplicación con UV Studio

1. Comience la radio normalmente con la edición `Labs`.
1. Conéctelo a un navegador de escritorio con una conexión de datos USB compatible.
1. Abra [UV Studio](https://armel.github.io/uvstudio/) y seleccione `Apps` (`Labs only`).
1. Seleccione la versión de firmware y una aplicación compatible del catálogo oficial, o elija un archivo `.app` local.
1. Elija la ranura de la aplicación objetivo.
1. Seleccione `Install app` y espere a completar la escritura y verificación.

UV Studio puede refrescar la tabla de tragaperras, mostrar el nombre, la versión, el tamaño y el estado de cada aplicación, y eliminar una aplicación sin tocar el resto de la radio.

Las ranuras de la aplicación están numeradas `1` a `8` en UV Studio y en el lanzador `F + 7` en radio.

## Lanzamiento de una aplicación

1. Desde la pantalla de radio normal, presione `F`, luego `7 VOX`.
1. Utilice `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1, para seleccionar una de las ocho ranuras mostradas. El diseño activo sigue `SetNav`.
1. Pulse `M` para ejecutar la aplicación seleccionada.
1. Utilice los controles mostrados por esa aplicación; en la mayoría de las aplicaciones, `EXIT` vuelve al lanzador de aplicaciones o la pantalla de radio normal.

Las ranuras vacías permanecen visibles en el lanzador. La posición seleccionada de ranura y desplazamiento se recuerda hasta que la radio se reinicia. El lanzador y las aplicaciones compatibles se reflejan en UV Studio.

Algunas aplicaciones también pueden anunciar una de las acciones programables normales: `FM RADIO`, `FOX HUNT`, `BEACON` o `BEAM`. Cuando la aplicación de emparejamiento se instala y es válida, esa acción puede lanzarla directamente desde una tecla asignada o el picker de acción de tecla lateral. Si más de una aplicación instalada anuncia la misma acción, se utiliza la ranura compatible con menor número.

## Mensajes de compatibilidad

| Mensaje de radio | Significado / acción |
| --- | --- |
| `UPDATE APP` | el formato de aplicación, ABI, tamaño o dirección de enlace es mayor o incompatible; instalar una aplicación de combinación de construcción |
| `UPDATE FIRMWARE` | la aplicación requiere una nueva aplicación API; actualizar el firmware Labs |
| `REINSTALL APP` | la escritura es incompleta o el código CRC está mal; instalar el archivo `.app` de nuevo |
| `NOT SUPPORTED` | la aplicación necesita una capacidad residente que este Labs build no incluye |
| `NO APP` | la ranura seleccionada está vacía o no tiene un encabezado de aplicación válido |

Después de la salida de una aplicación, el cargador restaura el VFO seleccionado, el afinado recibir/dual-watch, el manejo de retroiluminación y el caché exterior-Flash. Aplicaciones que modifican datos compartidos compatibles, como presets Broadcast FM o datos de canal Beam, piden al firmware residente que lo comprometa después de que el código de superposición haya dejado de funcionar.

## Creación de aplicaciones de la fuente

Los desarrolladores pueden construir las aplicaciones presentes en el repositorio de firmware con:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Los archivos `.app` generados se colocan en `build/Apps/`. Cada aplicación está vinculada en la dirección de superposición configurada del firmware y empaquetada con sus metadatos y CRC. Recompilar aplicaciones cuando el ABI, API, requirió capacidades o cambios de dirección superpuesta.

## Páginas relacionadas

* [Overlay applications](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot y Multiconfig](./Multiboot-and-Multiconfig)
* [ Funciones de botón](./Button-functions)
* [Cambios recientes](./Recent-changes)
* [Características avanzadas](./Advanced-features)
