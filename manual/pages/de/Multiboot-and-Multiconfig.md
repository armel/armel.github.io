# Multiboot und Multiconfig

Beginnend mit `v6.0.0` können kompatible Editionen mehrere F4HWN-Firmware-Images im externen Flash des Radios speichern und beim Start eines von einem Selektor wiederherstellen. Jeder Firmware-Slot hat standardmäßig eine eigene Konfigurationsbank, so dass der Versuch einer anderen Edition die von den anderen Slots verwendeten Kanäle und Einstellungen nicht überschreibt.

Multiboot ist in den vier offiziellen `v6.0.0`-Editionen enthalten: `Fusion`, `FieldOps`, `Transfer` und `Labs`. Firmware-Slots werden mit [UV Studio](./UV-Studio#firmware-slots) verwaltet, während das Radio normal läuft.

> [!IMPORTANT]
> Legen Sie nur ein `v6.0.0`- oder neueres F4HWN-Image mit Multiboot-Unterstützung in einen Firmware-Slot. Eine `v5.x`-, Lager- oder andere Nicht-Multiboot-Firmware kann nach der Wiederherstellung ausgeführt werden, aber sie kann den Startwähler nicht öffnen, um zu einem anderen Slot zurückzukehren.

## Firmware-Steckplätze

Das Radio hält fünf Multiboot-Einträge:

| Funketikettierung | Zweck | Verwaltet von |
| --- | --- | --- |
| `M` | `Main`, ein automatisches Backup der Firmware, die über den normalen Flash-Prozess installiert wurde | Firmware |
| `1` bis `4` | Weitere F4HWN Firmware Bilder | UV Studio |

`Main` ist vor Host-Schreiben geschützt. Beim ersten Booten einer Multiboot-fähigen Firmware, die über das normale `Flash Firmware`-Verfahren installiert wurde, zeigt das Radio `Init Main` an und kopiert die laufende Firmware in `M`. Schalten Sie das Radio während dieser Initialisierung nicht aus.

Die vier Benutzer-Slots leben nur in externen Flash, bis ausgewählt. Die Installation oder Löschung einer in UV Studio ersetzt nicht sofort die Firmware, die derzeit von internen Flash ausgeführt wird.

## Installieren einer Firmware in einem Slot

1. Starten Sie das Radio normal mit einer Multiboot-fähigen Firmware.
1. Verbinden Sie es mit einem Desktop-Browser mit einer unterstützten USB-Datenverbindung.
1. Öffnen Sie [UV Studio](https://armel.github.io/uvstudio/) und wählen Sie `Firmware Slots`.
1. Wählen Sie einen kompatiblen stabilen `v6.x` F4HWN-Build aus dem Katalog oder wählen Sie eine kompatible lokale `.bin`-Datei aus.
1. Wählen Sie Slot `1`, `2`, `3` oder `4` und bearbeiten Sie optional den Anzeigenamen.
1. Wählen Sie `Write to slot` aus, bestätigen Sie und warten Sie, bis die Schritte Löschen, Schreiben und Verifizieren abgeschlossen sind.

Jeder Slot akzeptiert ein Anwendungsbild bis zu `118 KiB`. UV Studio schreibt das Bild in externen Flash, speichert dessen Größe und CRC und bittet dann das Radio, das vollständige Bild zu verifizieren.

`Erase FW` entfernt das externe Firmware-Image aus diesem Benutzerschlitz. Es löscht nicht die Konfigurationsbank des Slots und hat keinen Einfluss auf eine Kopie dieser Firmware, die bereits im internen Flash ausgeführt wird.

## Auswahl einer Firmware beim Start

1. Schalten Sie das Radio aus.
1. Halten Sie `M` (`MENU`) selbst, während Sie das Radio einschalten. Halten Sie `PTT` nicht.
1. Geben Sie den Schlüssel frei, wenn der `F4HWN MULTIBOOT`-Bildschirm erscheint.
1. Warten Sie, während das Radio die Slots scannt und validiert.
1. Verwenden Sie `UP` / `DOWN` auf UV-K5 oder `LEFT` / `RIGHT` auf UV-K1, um `M` oder Slot `1` auf `4` auszuwählen. Das aktive Layout folgt `SetNav`.
1. Drücken Sie `M`, um es auszuwählen, und drücken Sie `M` erneut auf `Restore ...?`, um es zu bestätigen.
1. Schalten Sie das Radio während `Writing / Verify` nicht aus. Das Radio startet automatisch mit der ausgewählten Firmware neu.

Drücken Sie `EXIT` aus der Slot-Liste, um die bereits installierte Firmware abzubrechen und weiter zu starten. Ungültige, unvollständige, übergroße oder CRC-ausfallende Slots werden angezeigt, können aber nicht wiederhergestellt werden.

Der Selektor hebt zunächst den Slot hervor, aus dem die laufende Firmware stammt. Es wird auch in UV Studio gespiegelt, wenn diese Unterstützung verfügbar ist.

## Multiconfig: eine Konfigurationsbank pro Slot

Standardmäßig wählt der Firmware-Slot `N` auch die Konfigurationsbank `N` aus:

| Firmware | Standardkonfiguration | Inhalt dieser Bank |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | Speicherkanäle, Namen, VFOs, Scanlisten und Funkeinstellungen |
| Steckplatz `1` | `CFG 1` | eigene Kopie der gleichen Konfigurationsbereiche |
| Steckplatz `2` | `CFG 2` | eigene Kopie der gleichen Konfigurationsbereiche |
| Steckplatz `3` | `CFG 3` | eigene Kopie der gleichen Konfigurationsbereiche |
| Steckplatz `4` | `CFG 4` | eigene Kopie der gleichen Konfigurationsbereiche |

Kalibrierungsdaten, das Boot-Logo, Multiboot-Metadaten, Firmware/App-Slots und das RF-Log werden in jeder Bank geteilt und nicht dupliziert.

Eine nicht verwendete Konfigurationsbank beginnt mit Factory Defaults, wenn sie zum ersten Mal verwendet wird. Diese Trennung ist nützlich, wenn Editionen unterschiedliche Einstellungen haben oder wenn Sie eine Firmware testen möchten, ohne die normale `Main`-Konfiguration zu ändern.

## Verwenden von SetCfg

Mit dem `SetCfg`-Menü kann die laufende Firmware eine andere Konfigurationsbank verwenden, ohne die Firmware zu ändern. `SLOT 2 / CFG 4` bedeutet beispielsweise, dass die aus Slot 2 wiederhergestellte Firmware derzeit die in Bank 4 gespeicherten Kanäle und Einstellungen verwendet.

1. Öffnen Sie das normale Menü und wählen Sie `SetCfg`.
1. Wählen Sie `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` oder `CFG 4`.
1. Drücken Sie `M`, dann drücken Sie `M` erneut bei `SURE?`.
1. Das Radio startet neu und bildet die ausgewählte Bank ab.

Die Bestätigung der bereits verwendeten Bank ist ein No-Op und startet das Radio nicht neu. Die `SysInf`-Identitätsseite zeigt separate `SLOT`- und `CFG`-Badges, so dass Sie immer die aktuelle Kombination überprüfen können.

> [!CAUTION]
> Mit `SetCfg` können Konfigurationen bewusst über Firmware-Editionen und -Versionen hinweg geteilt werden. Kompatibilität liegt in Ihrer Verantwortung. Sichern Sie wichtige Kanal- / Einstellungsdaten, bevor Sie eine Bank mit Firmware öffnen, die möglicherweise ein anderes Datenlayout verwendet.

In UV Studio löscht `Reset config` die Konfigurationsbank, die mit dem Benutzerslot `1` zu `4` verbunden ist, ohne seine Firmware zu löschen. Der nächste boot mit dieser bank erstellt standardeinstellungen. `CFG M` ist vor diesem Befehl geschützt; Verwenden Sie die normale Factory-Reset-Prozedur der Firmware für die Hauptkonfiguration.

## Rückgewinnungs- und Sicherheitshinweise

* Jeder Slot wird vollständig CRC-gecheckt, bevor der interne Flash gelöscht wird.
* Der aktive Slot/Config-Zustand wird redundant gespeichert und verifiziert, bevor eine Wiederherstellung beginnt.
* `DO NOT POWER OFF` bedeutet, dass der interne Flash neu geschrieben wird. Das Unterbrechen dieser Phase kann die Anwendung unbootfähig machen und eine normale DFU-Wiederherstellung erfordern.
* Wenn ein normaler Firmware-Flash das interne Image ersetzt, erkennt der nächste Multiboot-fähige Boot die Änderung und übernimmt dieses Image als neues `Main`-Backup mit `CFG M`.
* Wenn das Radio `STATE ERROR` oder `Flash state unknown` meldet, starten Sie es neu. Die Firmware stoppt dort absichtlich, anstatt das Schreiben durch ein unsicheres Konfigurations-Mapping zu riskieren.

## Verwandte Seiten

* [UV Studio](./UV-Studio#firmware-slots)
* [Aktuelle Änderungen](./Recent-changes)
* [Menü](./Menu)
* [Overlay-Apps](./Overlay-apps)
* [Fehlerbehebung](./Troubleshooting)
