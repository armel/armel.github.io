# Programación con CHIRP

Esta página explica cómo utilizar `CHIRP` con el controlador dedicado incluido con cada lanzamiento de firmware.

> [!WARNING]
> Utilice el controlador `CHIRP` de la misma versión de firmware que el instalado en su radio.
> No use CPS Quansheng.
> No use un controlador `UV-K5` genérico o un controlador de otra versión de firmware.

## Compatibilidad

El controlador `v6.1.0` dedicado soporta cada edición oficial `v6.1.0` en:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` y `Labs`

No es para:

* `UV-K5 V1 / V2`
* otros modelos Quansheng
* familias de firmware no relacionadas

Debido a que este firmware utiliza su propio diseño de memoria y configuración, otro controlador puede leer o escribir los datos incorrectos. Siempre coincida con la versión de controlador a la versión de firmware, incluso cuando se mueve entre ediciones oficiales.

No asuma que el controlador `v6.0.0` más viejo es intercambiable con el controlador `v6.1.0`.

## Antes de empezar

* asegúrate de que la radio funcione con la versión F4HWN coincidente
* localizar el archivo de controlador incluido en ese paquete de liberación
* estar listo para guardar una copia de seguridad de la imagen de radio antes de editar cualquier cosa

> [!NOTE]
> `CHIRP` puede mostrar a este conductor como experimental. Eso se espera.

## Actualización a v6.1.0

Antes de actualizar de una generación de firmware anterior:

1. Descargue la radio con el controlador que coincide con el firmware actualmente instalado.
1. Guarda esa imagen y exporta opcionalmente los canales de memoria a CSV.
1. Retrocede la calibración de radio con [UV Studio](./UV-Studio#calibration).
1. Flash la edición `v6.1.0` elegida.
1. Si es necesario por la versión que migra, introduzca el menú oculto y realice `RESET ALL`.
1. Cargue el controlador `v6.1.0` CHIRP dedicado y descargue una imagen fresca de la radio actualizada.
1. Copiar y pegar los viejos canales en esa imagen fresca, luego subirlo.

> [!WARNING]
> No importa directamente un antiguo CSV sobre la nueva imagen de radio completa. Copia y pega las filas del canal en una imagen recién descargada para que el diseño de la nueva versión permanezca intacto.

## Cargar el controlador dedicado en CHIRP

1. Abre `CHIRP`.
2. Si `File > Load Module...` no está disponible, active las funciones CHIRP `Help > Developer Mode` primero (menú de Ayuda), reiniciar `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Utilice `File > Load Module...` y seleccione el archivo `f4hwn.fusion.chirp...py` incluido con la versión de firmware.
4. Una vez cargado el módulo, `CHIRP` debería ofrecer la entrada de modelo `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.

> [!NOTE]
> El nombre de archivo del módulo y la etiqueta del modelo CHIRP conservan el nombre histórico `Fusion`. El módulo `v6.1.0` es sin embargo el conductor compartido para las cuatro ediciones oficiales.

## Descarga desde la radio

1. Enciende la radio.
1. Conecta la radio con un cable `USB-C` compatible o un cable de programación de doble-jack compatible en el conector `mic/spkr`.
1. Asegúrese de que el conector está firmemente insertado.
1. En `CHIRP`, elija `Radio > Download From Radio...`
1. Seleccione el puerto serie correcto.
1. Seleccione `Vendor`: `Quansheng`.
1. Seleccione `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Comience la descarga y espere hasta que la imagen de la radio se haya leído completamente.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Si la comunicación falla, desconecta el cable, enciende la radio primero, y luego vuelve a conectar el cable. El conductor dedicado advierte que algunas configuraciones pueden fallar si la radio fue alimentada con el cable ya conectado.

## Mostrar los campos extra

Después de la descarga, active `View > Show Extra Fields` en `CHIRP` (Ver menú).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Esto es importante porque el conductor dedicado expone varios campos específicos del canal a través del grupo `Extra`. Sin `Show Extra Fields`, algunos parámetros específicos de firmware permanecen ocultos en el editor de canales.

Ejemplos típicos son:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Editar y subir

A continuación, puede editar recuerdos, nombres y la configuración soportada.

Cuando estés listo:

1. Revisa tus cambios.
1. En `CHIRP`, elija `Radio > Upload To Radio...`
1. Use el mismo puerto, vendedor y modelo.
1. Espera hasta que la carga esté completa antes de tocar el cable o apagar la radio.

> [!WARNING]
> Deje los elementos relacionados con la calibración o avanzados solos a menos que sepa exactamente lo que hacen.

## Identificación Beacon

La aplicación independiente Beacon utiliza la configuración CHIRP `Message Line 1` como su callsign. El conductor dedicado acepta hasta `12 characters` en este campo.

Cuando Beacon transmite en modo `CALL`, el firmware convierte letras en mayúscula, mantiene letras, dígitos y `/`, elimina caracteres no soportados y anexa ` MOE`. Si la señal resultante está vacía, transmite `MOE`.

Después de cambiar `Message Line 1`, subir la configuración a la radio antes de comenzar Beacon. Véase [Beacon](./Beacon) para el comportamiento de transmisión e información de seguridad.

## Buenas prácticas

* siempre utilice el controlador incluido con la misma versión de firmware
* siempre descargar primero, luego guardar un respaldo
* después de una actualización de firmware, vuelva a cargar el nuevo módulo de controlador de esa liberación
* utilizar `CHIRP` para programación a granel, no Quansheng CPS

## Si algo se ve mal

Compruebe estos puntos:

1. la radio es realmente un `UV-K1` o `UV-K5 V3`
1. la radio ejecuta la versión y edición F4HWN esperada
1. `CHIRP` cargó el controlador de esa misma versión, no otro módulo `UV-K5`
1. el cable se inserta completamente
1. el puerto serie seleccionado es el correcto

## Páginas relacionadas

* [Empezar](./Getting-started)
* [Operación radio](./Radio-operation)
* [Beacon](./Beacon)
* [Solucionando](./Troubleshooting)
