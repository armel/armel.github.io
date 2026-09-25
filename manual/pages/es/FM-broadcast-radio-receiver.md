# Receptor de radiodifusión FM

La radio puede recibir radio FM de `76` a `108 MHz`. Utiliza un chip separado (`BK1080`) para esto. RDS no es compatible.

Durante la escucha de transmisión normal, el VFO activo todavía tiene prioridad. La recepción en el VFO activo desactiva temporalmente el audio de transmisión; al final de la recepción VFO, la radio vuelve a transmitir. Mientras que un escáner de estación FM manual o automático está funcionando activamente, `v5.9.0` ignora temporalmente la recepción del canal principal para que el escaneo de la estación pueda terminar sin ser interrumpido.

> [!NOTE]
> Donde esta página menciona `UP` / `DOWN`, utilice las teclas equivalentes `LEFT` / `RIGHT` en UV-K1. El diseño de navegación activo sigue `SetNav`.

> [!NOTE]
> - el VFO activo tiene prioridad durante la escucha normal de la radiodifusión, pero no durante un análisis activo de la estación FM
> - análisis automático sobrescribe todos los recuerdos `48` FM

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Operaciones básicas

* `F` + `0 FM`, larga presión `0 FM`, o una [función de botón de uso](./Button-functions#custom-button-functions) comienza la recepción de transmisión
* `EXIT`, o usando el mismo comando de inicio de nuevo mientras la radio está en modo FM, termina la recepción de transmisión
* `F` + `3 VFO/MR`, o `3 VFO/MR` de larga presión, cambia entre modo VFO y modo de memoria

### Establecer una frecuencia en modo FM-VFO

Simplemente escribiendo una melodía de frecuencia el receptor. La resolución es `100 kHz`, así que entrando canciones `929` a `92.9 MHz`. Utilice las teclas de flecha para cambiar en pasos `100 kHz`.

### Cambiar el rango de transmisión FM

Si no puedes sintonizar la estación que esperas, puedes simplemente estar en el rango de transmisión FM incorrecto.

Mientras que la recepción de transmisión FM es activa, de larga presión `1 BAND` para recorrer los rangos FM disponibles:

* `87.5` a `108 MHz`
* `76` a `108 MHz`
* `76` a `90 MHz`
* `64` a `76 MHz`

El rango seleccionado actualmente se muestra en la parte inferior izquierda de la pantalla FM, por ejemplo `87.5-108M`.

Ajuste directo, escaneo manual, escaneo automático y memorias FM sólo funcionan dentro del rango seleccionado actualmente. Si una estación o memoria FM guardada está fuera de ese rango, cambie a otra banda FM primero.

### Almacén en memoria del modo FM-VFO

Presionar `M` en modo VFO permite almacenar la frecuencia actual en un canal de memoria. Utilice las teclas de flecha para seleccionar la memoria, luego confirmar con `M`. Hay memorias `48` disponibles.

### Seleccione una memoria

En modo MR, entrar `01` a `48` selecciona un canal de memoria. Utilice `UP` / `DOWN` para pasar por los canales de memoria.

### Eliminar una memoria almacenada

En modo MR, pulsar `M` permite eliminar ese canal de memoria.

## Escáner para estaciones de FM-VFO

### Escaneo automático

Comience con `F` + `* Scan` o por `* Scan` de larga presión.
Los escáneres de radio para estaciones y almacena las primeras estaciones `48` en memoria. El escáner comienza en el lado bajo de la banda. Iniciar el análisis automático elimina los canales previamente almacenados. `EXIT` termina el análisis automático.

Mientras el análisis automático se está ejecutando, una señal entrante detectada en el canal transceptor principal no interrumpe el escáner FM. La prioridad normal del canal principal se restablece tan pronto como se detenga el escaneo FM.

### Análisis manual

Una corta presión en `* Scan` comienza el análisis manual. La radio escanea hacia arriba desde la frecuencia actual hasta que se recibe una estación. Puedes continuar escaneando en cualquier dirección usando las teclas de flecha. `EXIT` detiene el modo de escaneo.

La misma excepción temporal del canal principal se aplica durante el escaneo manual. Una vez que el escaneo se detiene en una estación o se cancela, la escucha de radiodifusión ordinaria de nuevo se rinde a la recepción en el VFO activo.

## Funciones de botón

* `1 BAND` - larga prensa, conmutar rangos de transmisión FM
* `3 VFO/MR` - conmutar frecuencia/modo de memoria
* `* SCAN`
   * prensa corta - iniciar un solo escaneo
   * larga prensa - iniciar el análisis automático (todos los canales de memoria serán eliminados y reemplazados con resultado de la exploración)

## Páginas relacionadas

* [Empezar](./Getting-started)
* [ Funciones de botón](./Button-functions)
* [Operación radio](./Radio-operation)
* [Solucionando](./Troubleshooting)
