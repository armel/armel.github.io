# Beacon

Beacon es una aplicación Morse al estilo ARDF. Envia repetidamente un identificador seleccionado en el VFO TX activo, alternando entre una ventana de transmisión configurable y intervalo silencioso.

Como `v6.0.0`, Beacon y [FoxHunt](./Fox-Hunt) son aplicaciones separadas y acciones programables separadas. Beacon comienza directamente en su ciclo de transmisión; no se abre a través de FoxHunt.

Beacon es residente en la edición `FieldOps`. En `Labs`, instale la aplicación de superposición `Beacon` con [UV Studio](./UV-Studio#apps-labs). El atajo `BEACON` lanza la aplicación residente o la aplicación de superposición instalada, dependiendo de la edición.

> [!WARNING]
> Beacon comienza su primera transmisión inmediatamente. Antes de lanzarlo, compruebe el TX VFO activo, frecuencia, potencia, antena, `F Lock`, `TXLock`, requisitos de señalización e identificación, ciclo de derechos y regulaciones locales. No deje un faro no deseado transmitiendo donde se prohíben las transmisiones autónomas o periódicas.

## Inicio Beacon

Asignar `BEACON` a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`, luego activar ese atajo. En Labs también puede lanzar `Beacon` del selector de aplicaciones `F + 7`.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identificadores

| Ajuste | Mensaje | Propósito |
| --- | --- | --- |
| `MOE` a `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | 5 identificadores de zorro IARU ARDF estándar |
| `MO` | `MO` | acabado/identificador casero |
| `CALL` | señalización configurada seguido por `MOE` | identificado afeitado de banda |

La señal viene de CHIRP `Message Line 1`. Las cartas se convierten en mayúsculas; se admiten letras, dígitos y `/`. Ver [Programación con CHIRP](./Programming-with-CHIRP#beacon-identification).

El identificador utiliza un tono `1000 Hz` en aproximadamente `12 WPM`.

## Temporización y modulación

* `TX`: `5` a `60 seconds`, en pasos `5-second`; `30 seconds` predeterminado
* `IDLE`: `5` a `240 seconds`, en pasos `5-second`; `30 seconds` predeterminado

Para el tiempo clásico de cinco fósforos, utilice `TX = 60 s` y `IDLE = 240 s`.

| Modo | Comportamiento |
| --- | --- |
| `TONE` | Mantiene el portador FM activo para la ventana TX completa y las teclas del tono `1000 Hz` |
| `CARR` | Llaves el portador y tono juntos para cada elemento Morse, por lo que la señal desaparece en las brechas |

`TONE` es el defecto del limpiador. `CARR` reproduce más de cerca los transmisores ARDF interrumpidos por el transportista, pero el keying directo puede producir pequeños clics y una difusión espectral adicional.

## Controles

| Control | Medida |
| --- | --- |
| `1` | Ciclo de duración `TX` |
| `2` | Ciclo de duración `IDLE` |
| `3` | Ciclo el identificador |
| `4` | Alterna entre `TONE` y `CARR` |
| `F`, entonces `1`, `2`, `3`, o `4` | Paso el ajuste correspondiente hacia atrás |
| mantener `F` durante unos 0,5 segundos | Cierre o desbloquee todos los controles Beacon |
| `M` durante TX | Pare la transmisión actual y comience un intervalo de ocio fresco |
| `M` mientras esté ocioso | Reinicie la cuenta de ocio completo |
| `EXIT` | Para con seguridad y salida Beacon |

Antes de cada explosión, Beacon comprueba las restricciones normales de frecuencia TX, por canal `TXLock`, estado de batería y modulación. Si la transmisión es rechazada, muestra el estado de radio correspondiente y espera antes de probar la próxima explosión programada.

## Ajustes guardados

Beacon guarda su identificador, duración `TX`, duración `IDLE` y modo `TONE` / `CARR`. Estos ajustes se restauran en el próximo lanzamiento y se incluyen en una transferencia AirCopy `Settings`. El bloqueo de aplicación temporal no se guarda.

## Páginas relacionadas

* [FoxHunt](./Fox-Hunt)
* [ Funciones de botón](./Button-functions#beacon-action)
* [Programación con CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Operación radio](./Radio-operation)
