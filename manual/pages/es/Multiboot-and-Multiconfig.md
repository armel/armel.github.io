# Multiboot y Multiconfig

Empezando con `v6.0.0`, las ediciones compatibles pueden mantener varias imágenes de firmware F4HWN en el Flash externo de la radio y restaurar uno de un selector al inicio. Cada ranura firmware tiene su propio banco de configuración por defecto, por lo que probar otra edición no sobrescribe los canales y ajustes utilizados por las otras ranuras.

Multiboot se incluye en las cuatro ediciones oficiales `v6.0.0`: `Fusion`, `FieldOps`, `Transfer` y `Labs`. Las ranuras de firmware se gestionan con [UV Studio](./UV-Studio#firmware-slots) mientras que la radio se ejecuta normalmente.

> [!IMPORTANT]
> Sólo ponga una imagen `v6.0.0` o nueva F4HWN con soporte Multiboot en una ranura de firmware. Un firmware `v5.x`, stock u otro firmware no-Multiboot puede funcionar después de ser restaurado, pero no puede abrir el selector de arranque para volver a otra ranura.

## Firmware ranuras

La radio mantiene cinco entradas Multiboot:

| Etiquetas de radio | Propósito | Managed by |
| --- | --- | --- |
| `M` | `Main`, una copia de seguridad automática del firmware instalado a través del procedimiento de flashización normal | firmware |
| `1` a `4` | imágenes adicionales de firmware F4HWN | UV Studio |

`Main` está protegido del host escribe. En la primera bota de un firmware multiboot-capable instalado a través del procedimiento `Flash Firmware` normal, la radio muestra `Init Main` y copia el firmware corriendo en `M`. No apagar la radio durante esta inicialización.

Las cuatro ranuras de usuario viven sólo en Flash externo hasta que se selecciona. Instalar o borrar uno en UV Studio no reemplaza inmediatamente el firmware que actualmente se ejecuta desde Flash interno.

## Instalar un firmware en una ranura

1. Comience la radio normalmente con un firmware multiboot habilitado.
1. Conéctelo a un navegador de escritorio con una conexión de datos USB compatible.
1. Abra [UV Studio](https://armel.github.io/uvstudio/) y seleccione `Firmware Slots`.
1. Seleccione un `v6.x` F4HWN compatible construido en el catálogo, o elija un archivo `.bin` local compatible.
1. Elija la ranura `1`, `2`, `3` o `4` y, opcionalmente, edite su nombre de pantalla.
1. Seleccione `Write to slot`, confirme y espere los pasos de borrado, escritura y verificación para terminar.

Cada ranura acepta una imagen de aplicación hasta `118 KiB`. UV Studio escribe la imagen a Flash externo, almacena su tamaño y CRC, luego pide la radio para verificar la imagen completa.

`Erase FW` elimina la imagen del firmware externo de esa ranura del usuario. No borra el banco de configuración de la ranura y no afecta una copia de ese firmware que ya se ejecuta en Flash interno.

## Selección de un firmware al inicio

1. Apaga la radio.
1. Sostenga `M` (`MENU`) por sí mismo mientras se activa la radio. No sostenga `PTT`.
1. Libere la llave cuando aparezca la pantalla `F4HWN MULTIBOOT`.
1. Espera mientras la radio escanea y valida las ranuras.
1. Utilice `UP` / `DOWN` en UV-K5, o `LEFT` / `RIGHT` en UV-K1, para seleccionar `M` o ranura `1` a `4`. El diseño activo sigue `SetNav`.
1. Pulse `M` para seleccionarlo, luego presione `M` de nuevo en `Restore ...?` para confirmar.
1. No apagar la radio durante `Writing / Verify`. La radio se reinicia automáticamente con el firmware seleccionado.

Pulse `EXIT` de la lista de ranuras para cancelar y continuar iniciando el firmware ya instalado. Las tragamonedas inválidas, incompletas, sobredimensionadas o con exclusión de CRC se muestran pero no se pueden restaurar.

El selector destaca inicialmente la ranura de la que vino el firmware de ejecución. También se refleja en UV Studio cuando ese soporte está disponible.

## Multiconfig: un banco de configuración por ranura

Por defecto, seleccionando la ranura de firmware `N` también selecciona el banco de configuración `N`:

| Firmware | Configuración predeterminada | Contenido guardado en ese banco |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | canales de memoria, nombres, VFOs, listas de escaneo y configuración de radio |
| ranura `1` | `CFG 1` | su propia copia de las mismas áreas de configuración |
| ranura `2` | `CFG 2` | su propia copia de las mismas áreas de configuración |
| ranura `3` | `CFG 3` | su propia copia de las mismas áreas de configuración |
| ranura `4` | `CFG 4` | su propia copia de las mismas áreas de configuración |

Los datos de calibración, el logotipo de arranque, metadatos Multiboot, ranuras de firmware/app, y el registro RF son compartidos en lugar de duplicados en cada banco.

Un banco de configuración no utilizado comienza con defectos de fábrica la primera vez que se utiliza. Esta separación es útil cuando las ediciones tienen diferentes configuraciones o cuando desea probar un firmware sin modificar la configuración `Main` normal.

## Usando SetCfg

El menú `SetCfg` permite que el firmware de ejecución use un banco de configuración diferente sin cambiar el firmware. Por ejemplo, `SLOT 2 / CFG 4` significa que el firmware restaurado de la ranura 2 está utilizando actualmente los canales y ajustes almacenados en el banco 4.

1. Abra el menú normal y seleccione `SetCfg`.
1. Elija `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` o `CFG 4`.
1. Presione `M`, luego presione `M` de nuevo en `SURE?`.
1. La radio reinicia y mapea el banco seleccionado.

Confirmar el banco ya en uso es un no-op y no reinicia la radio. La página de identidad `SysInf` muestra placas separadas `SLOT` y `CFG` para que siempre puedas comprobar la combinación actual.

> [!CAUTION]
> `SetCfg` permite deliberadamente compartir configuraciones a través de ediciones y versiones de firmware. La compatibilidad es tu responsabilidad. Retrocede los datos importantes de canal/configuración antes de abrir un banco con firmware que puede utilizar un diseño de datos diferente.

En UV Studio, `Reset config` borra el banco de configuración asociado con la ranura de usuario `1` a `4` sin borrar su firmware. La siguiente bota usando ese banco recrea la configuración predeterminada. `CFG M` está protegido de este comando; use el procedimiento de ajuste de fábrica normal del firmware para la configuración principal.

## Notas de recuperación y seguridad

* Cada ranura está completamente CRC-checked antes de que se borra Flash interno.
* El estado activo de ranura/config se almacena de forma redundante y se verifica antes de que comience una restauración.
* `DO NOT POWER OFF` significa que Flash interno está siendo reescrito. Interrumpir esta etapa puede hacer la aplicación inestable y requerir una recuperación DFU normal.
* Si un flash de firmware normal reemplaza la imagen interna, la siguiente bota multiboot-capable detecta el cambio y adopta esa imagen como la nueva copia de seguridad `Main` con `CFG M`.
* Si la radio informa `STATE ERROR` o `Flash state unknown`, reiniciarlo. El firmware se detiene allí deliberadamente en lugar de arriesgarse a escribir a través de un mapeo de configuración incierto.

## Páginas relacionadas

* [UV Studio](./UV-Studio#firmware-slots)
* [Cambios recientes](./Recent-changes)
* [Menu](./Menu)
* [Overlay apps](./Overlay-apps)
* [Solucionando](./Troubleshooting)
