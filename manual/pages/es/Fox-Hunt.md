# FoxHunt

FoxHunt es una aplicación sólo de señalización para Amateur Radio Direction Finding (ARDF). Ayuda al operador a acercarse a un transmisor oculto mostrando `dBm` calibrado, S-meter, pico, mínimo, tendencia y la historia reciente de la señal.

Como `v6.0.0`, FoxHunt y [Beacon](./Beacon) son aplicaciones separadas y acciones programables separadas. FoxHunt no transmite y no se convierte en Beacon.

FoxHunt es residente en la edición `FieldOps`. En `Labs`, instale la aplicación de superposición `FoxHunt` con [UV Studio](./UV-Studio#apps-labs). El atajo `FOX HUNT` lanza la aplicación residente o la aplicación de superposición instalada, dependiendo de la edición.

## Inicio FoxHunt

Asignar `FOX HUNT` a `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, o `M Long`, luego activar ese atajo en el VFO que desea monitorizar. En Labs también puede lanzar `FoxHunt` del selector de aplicaciones `F + 7`.

> [!NOTE]
> Navegación utiliza `UP` / `DOWN` en UV-K5 y `LEFT` / `RIGHT` en UV-K1. El diseño activo sigue `SetNav`.

## Pantalla y controles

La escala de señal va de `S0` a `S9+40`. El medidor principal puede mostrar una escalera de 13 niveles o una historia de desplazamiento de aproximadamente 18 segundos. La tendencia compara la señal actual con el nivel medido aproximadamente un segundo antes.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Control | Medida |
| --- | --- |
| `1` | Alternar entre la escala y el historial de señal |
| `2` | Ciclo silencioso, Geiger-style beep, y audio de estación recibida |
| `3` | Ciclo `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` y `BYP+` |
| claves de navegación | Aumentar o disminuir la atenuación directamente |
| `F`, luego `2` o `3` | Paso el ajuste correspondiente hacia atrás |
| `M` | Reiniciar referencias de pico, mínimo y tendencia |
| mantener `F` durante unos 0,5 segundos | Cierre o desbloquee los controles FoxHunt |
| `EXIT` | Exit FoxHunt |

Mientras se bloquea, sólo las teclas de navegación para la atenuación y otra larga prensa de `F` permanecen disponibles.

## Consejos de determinación de direcciones

* Aumente la atenuación ya que la señal se vuelve fuerte para que el medidor se mantenga alejado de la escala completa.
* Reiniciar las referencias con `M` antes de cada comparación o escaneo corporal.
* Mantenga la radio en el pecho y gire lentamente; su cuerpo a menudo crea un mínimo de señal útil en la dirección lejos del transmisor.
* Use pico (`PK`) y mínimo (`MN`) para comparar una rotación completa.
* Utilice el gráfico de historia para ver los valles de señal y el indicador de tendencia mientras camina un rodamiento.

`BYP` y `BYP+` son ajustes de ganancia de cerca, no un bypass de hardware literal. El valor `dBm` absoluto mostrado cambia con el paso de ganancia, así que compare las lecturas mientras se mantiene en el mismo paso.

## Ajustes guardados

FoxHunt guarda su modo de atenuación, calibre y audio. Estos ajustes se restauran en el próximo lanzamiento y se incluyen en una transferencia AirCopy `Settings`. El bloqueo de aplicación temporal no se guarda.

## Páginas relacionadas

* [Beacon](./Beacon)
* [ Funciones de botón](./Button-functions#fox-hunt-action)
* [Overlay apps](./Overlay-apps)
* [Overlay applications](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Características avanzadas](./Advanced-features)
