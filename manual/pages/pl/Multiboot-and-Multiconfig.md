# Multiboot i Multiconfig

Począwszy od `v6.0.0`, kompatybilne edycje mogą przechowywać kilka zdjęć firmware F4HWN w zewnętrznym Flashu radia i przywracać jeden z selektora przy starcie. Każde gniazdo firmware domyślnie posiada własny bank konfiguracyjny, więc próba innej edycji nie nadpisuje kanałów i ustawień używanych przez inne sloty.

Multiboot jest zawarty w czterech oficjalnych edycjach `v6.0.0`: `Fusion`, `FieldOps`, `Transfer` i `Labs`. Szczeliny firmowe są zarządzane za pomocą [UV Studio](./UV-Studio#firmware-slots), podczas gdy radio działa normalnie.

> [!IMPORTANT]
> Umieścić tylko obraz `v6.0.0` lub nowszy F4HWN z obsługą Multiboot w szczelinie oprogramowania firmowego. `v5.x`, stock, lub inne non-Multiboot firmware może działać po przywróceniu, ale nie może otworzyć selektora startowego, aby powrócić do innego gniazda.

## Szczeliny sprzętowe

Radio posiada pięć wpisów Multiboot:

| Etykieta radiowa | Cel | Zarządzane przez |
| --- | --- | --- |
| `M` | `Main`, automatyczne backup oprogramowania firmowego zainstalowanego w ramach normalnej procedury migania | firmware |
| `1` do `4` | dodatkowe obrazy oprogramowania firmowego F4HWN | UV Studio |

`Main` jest chroniony przed pisaniem przez hosta. Na pierwszym starcie oprogramowania wielofunkcyjnego zainstalowanego za pomocą normalnej procedury `Flash Firmware`, radio wyświetla `Init Main` i kopiuje uruchomione oprogramowanie firmowe na `M`. Nie wyłączaj radia podczas tej inicjalizacji.

Cztery szczeliny użytkownika żyć tylko w zewnętrznym Flash do wyboru. Instalacja lub kasowanie jednego w UV Studio nie zastępuje natychmiast oprogramowania firmowego działającego obecnie od wewnętrznego Flasha.

## Instalowanie oprogramowania firmowego w szczelinie

1. Uruchom radio normalnie za pomocą oprogramowania firmowego wielofunkcyjnego.
1. Podłącz go do przeglądarki pulpitu za pomocą obsługiwanego połączenia danych USB.
1. Otwórz [UV Studio](https://armel.github.io/uvstudio/) i wybierz `Firmware Slots`.
1. Wybierz kompatybilną stabilną budowę `v6.x` F4HWN z katalogu lub wybierz kompatybilny lokalny plik `.bin`.
1. Wybierz gniazdo `1`, `2`, `3` lub `4` i opcjonalnie edytuj jego nazwę wyświetlacza.
1. Wybierz `Write to slot`, potwierdź i czekaj na usunięcie, napisz i zakończ czynności weryfikacyjne.

Każde gniazdo akceptuje obraz aplikacji do `118 KiB`. UV Studio zapisuje obraz do zewnętrznego Flash, przechowuje jego rozmiar i CRC, a następnie prosi radio, aby zweryfikować kompletny obraz.

`Erase FW` usuwa zewnętrzny obraz firmware z tego gniazda użytkownika. Nie usuwa banku konfiguracji gniazda i nie wpływa na kopię oprogramowania firmowego działającego już w wewnętrznym programie Flash.

## Wybór oprogramowania firmowego przy starcie

1. Wyłącz radio.
1. Przytrzymaj `M` (`MENU`) samodzielnie podczas włączania radia. Nie wstrzykiwać leku `PTT`.
1. Uwolnić klucz po pojawieniu się ekranu `F4HWN MULTIBOOT`.
1. Poczekaj, aż radio skanuje i potwierdza szczeliny.
1. Użyj `UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1, aby wybrać `M` lub slot `1` do `4`. Aktywny układ następuje po `SetNav`.
1. Naciśnij `M`, aby go wybrać, a następnie naciśnij `M` ponownie na `Restore ...?`, aby potwierdzić.
1. Nie wyłączać radia podczas `Writing / Verify`. Radio ponownie uruchamia się automatycznie z wybranym oprogramowaniem firmowym.

Naciśnij `EXIT` z listy gniazd, aby anulować i kontynuować uruchamianie oprogramowania już zainstalowanego. Nieprawidłowe, niekompletne, przerośnięte lub niesprawne szczeliny CRC- są wyświetlane, ale nie mogą zostać przywrócone.

Selektor początkowo podkreśla szczelinę, z której pochodzi uruchomione oprogramowanie firmowe. Jest również odbijany w UV Studio, gdy wsparcie jest dostępne.

## Multiconfig: jeden bank konfiguracyjny na szczelinę

Domyślnie wybranie gniazda oprogramowania firmowego `N` powoduje również wybór banku konfiguracyjnego `N`:

| Oprogramowanie | Domyślna konfiguracja | Zawartość przechowywana w tym banku |
| --- | --- | --- |
| `Main` (`M`) | `CFG M` | kanały pamięci, nazwy, VFOs, listy skanów i ustawienia radiowe |
| slot `1` | `CFG 1` | własnej kopii tych samych obszarów konfiguracji |
| slot `2` | `CFG 2` | własnej kopii tych samych obszarów konfiguracji |
| slot `3` | `CFG 3` | własnej kopii tych samych obszarów konfiguracji |
| slot `4` | `CFG 4` | własnej kopii tych samych obszarów konfiguracji |

Dane kalibracyjne, logo boot, metadane Multiboot, szczeliny firmware / app i dziennik RF są udostępniane zamiast duplikowane w każdym banku.

Niewykorzystany bank konfiguracyjny rozpoczyna się od domyślnego ustawienia fabrycznego przy pierwszym użyciu. Ta separacja jest przydatna, gdy edycje mają różne ustawienia lub gdy chcesz przetestować oprogramowanie firmowe bez modyfikacji normalnej konfiguracji `Main`.

## Korzystanie z SetCfg

Menu `SetCfg` pozwala na używanie przez uruchomione oprogramowanie firmowe innego banku konfiguracyjnego bez zmiany oprogramowania firmowego. Na przykład `SLOT 2 / CFG 4` oznacza, że oprogramowanie firmowe przywrócone z gniazda 2 korzysta obecnie z kanałów i ustawień przechowywanych w banku 4.

1. Otwórz normalne menu i wybierz `SetCfg`.
1. Wybierz `CFG M`, `CFG 1`, `CFG 2`, `CFG 3` lub `CFG 4`.
1. Naciśnij `M`, a następnie naciśnij `M` ponownie w `SURE?`.
1. Radio ponownie uruchamia i mapuje wybrany bank.

Potwierdzenie, że bank jest już w użyciu jest nieaktywny i nie uruchamia ponownie radia. Strona tożsamości `SysInf` pokazuje oddzielne znaczniki `SLOT` i `CFG`, dzięki czemu zawsze można sprawdzić bieżącą kombinację.

> [!CAUTION]
> `SetCfg` celowo pozwala na udostępnianie konfiguracji pomiędzy edycjami i wersjami firmware. Odpowiedzialność spoczywa na tobie. Backup ważnych danych kanału / ustawień przed otwarciem banku z firmware, które mogą używać innego układu danych.

W UV Studio, `Reset config` usuwa bank konfiguracyjny związany z gniazdem użytkownika `1` do `4` bez usuwania oprogramowania firmowego. Następny boot używając tego banku odtwarza ustawienia domyślne. `CFG M` jest chroniony przed tym poleceniem; użyj normalnej procedury resetowania faktory- dla konfiguracji głównej.

## Noty dotyczące odzyskiwania i bezpieczeństwa

* Każde gniazdo jest w pełni sprawdzone CRC- zanim wewnętrzny Flash zostanie wymazany.
* Aktywny stan slot / config jest zapisywany i weryfikowany w trybie awaryjnym przed rozpoczęciem przywracania.
* `DO NOT POWER OFF` oznacza, że wewnętrzny Flash jest przepisywany. Przerwanie tego etapu może sprawić, że aplikacja nie zostanie uruchomiona i wymagać normalnego odzyskiwania DFU.
* Jeśli normalne oprogramowanie firmware flash zastępuje wewnętrzny obraz, następny wielofunkcyjny boot wykrywa zmianę i przyjmuje ten obraz jako nową kopię zapasową `Main` z `CFG M`.
* Jeśli radio zgłosi `STATE ERROR` lub `Flash state unknown`, uruchom ponownie. Oprogramowanie firmowe zatrzymuje się tam celowo, a nie ryzykuje napisaniem przez niepewne mapowanie konfiguracji.

## Odpowiednie strony

* [UV Studio](./UV-Studio#firmware-slots)
* [Ostatnie zmiany](./Recent-changes)
* [Menu](./Menu)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Rozwiązywanie problemów](./Troubleshooting)
