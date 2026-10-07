# Programowanie z CHIRP

Ta strona wyjaśnia jak używać `CHIRP` z dedykowanym sterownikiem dołączonym do każdej wersji oprogramowania firmowego.

> [!WARNING]
> Użyj sterownika `CHIRP` z tego samego wydania firmware co ten zainstalowany w radiu.
> Nie stosować leku Quansheng CPS.
> Nie używać ogólnego sterownika `UV-K5` lub sterownika z innego oprogramowania firmowego.

## Zgodność

dedykowany sterownik `v6.1.0` obsługuje każdą oficjalną edycję `v6.1.0`:

* `UV-K1`
* `UV-K5 V3`
* `Fusion`, `FieldOps`, `Transfer` i `Labs`

Nie jest przeznaczony do:

* `UV-K5 V1 / V2`
* inne modele Quansheng
* niepowiązane rodziny firmware

Ponieważ oprogramowanie to używa własnego układu pamięci i ustawień, inny sterownik może odczytać lub zapisać niewłaściwe dane. Zawsze dopasowuj wersję sterownika do wersji firmware, nawet podczas poruszania się pomiędzy oficjalnymi edycjami.

Nie zakładaj, że starszy sterownik `v6.0.0` jest zamienny z sterownikiem `v6.1.0`.

## Zanim zaczniesz

* Upewnij się, że radio uruchomi odpowiednie wydanie F4HWN
* zlokalizować dołączony plik sterownika w tym pakiecie wydania
* być gotowy do zapisu kopii zapasowej obrazu radiowego przed edycją czegokolwiek

> [!NOTE]
> `CHIRP` może pokazywać ten sterownik jako eksperymentalny. Tego się oczekuje.

## Aktualizacja do v6.1.0

Przed aktualizacją wcześniejszej generacji oprogramowania firmowego:

1. Pobierz radio ze sterownikiem pasującym do aktualnie zainstalowanego oprogramowania firmowego.
1. Zapisz ten obraz i opcjonalnie eksportuj kanały pamięci do CSV.
1. Kopia zapasowa kalibracji radiowej z [UV Studio](./UV-Studio#calibration).
1. Flash wybranej edycji `v6.1.0`.
1. Jeśli wymaga tego wersja, z której migrujesz, wpisz ukryte menu i wykonaj `RESET ALL`.
1. Wczytaj dedykowany sterownik `v6.1.0` CHIRP i pobierz świeży obraz z uaktualnionego radia.
1. Kopiuj i wklejaj stare kanały na ten świeży obraz, a następnie wgraj je.

> [!WARNING]
> Nie importuj bezpośrednio starego CSV przez kompletny nowy obraz radiowy. Kopiuj i wklej wiersze kanału do świeżo pobranego obrazu, tak aby układ ustawień nowej wersji pozostał nienaruszony.

## Wczytaj dedykowany sterownik w CHIRP

1. Otwórz `CHIRP`.
2. Jeśli `File > Load Module...` nie jest dostępny, włącz najpierw funkcje CHIRP `Help > Developer Mode` (menu Pomoc), a następnie ponownie uruchom `CHIRP`.

<img width="406" height="307" alt="Capture d’écran 2026-04-06 à 18 41 46" src="https://github.com/user-attachments/assets/7a82cd02-5368-4b08-ac15-3f0ee210bc75" />

3. Użyj `File > Load Module...` i wybierz plik `f4hwn.fusion.chirp...py` dołączony do wydania oprogramowania firmowego.
4. Po załadowaniu modułu `CHIRP` powinien oferować wpis modelu `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.

> [!NOTE]
> Nazwa pliku modułu i etykieta modelu CHIRP zachowują historyczną nazwę `Fusion`. Moduł `v6.1.0` jest jednak wspólnym sterownikiem wszystkich czterech oficjalnych edycji.

## Pobierz z radia

1. Włącz radio.
1. Podłącz radio za pomocą kompatybilnego kabla `USB-C` lub kompatybilnego kabla programowego double- jack na złączu `mic/spkr`.
1. Należy upewnić się, że złącze jest mocno wstawione.
1. W `CHIRP` wybierz `Radio > Download From Radio...`
1. Wybierz poprawny port szeregowy.
1. Wybierz `Vendor`: `Quansheng`.
1. Wybierz `Model`: `UV-K1 & UV-K5 V3 (F4HWN Fusion)`.
1. Rozpocznij pobieranie i czekaj aż obraz radiowy zostanie w pełni przeczytany.

<img width="512" height="380" alt="Capture d’écran 2026-04-06 à 18 42 37" src="https://github.com/user-attachments/assets/b035c8d9-071f-4030-9adc-4966e1c30b29" />

> [!TIP]
> Jeśli komunikacja zawiedzie, odłącz kabel, włącz radio, a następnie ponownie podłącz kabel. Oddany kierowca ostrzega, że niektóre ustawienia mogą się nie udać, jeśli radio było włączone z kablem już podłączony.

## Pokaż dodatkowe pola

Po pobraniu, włączyć `View > Show Extra Fields` w `CHIRP` (Widok menu).

<img width="258" height="224" alt="Capture d’écran 2026-04-06 à 18 42 06" src="https://github.com/user-attachments/assets/ff30ffd3-2119-42ed-84f3-e69b14903315" />

Jest to ważne, ponieważ dedykowany kierowca eksponuje kilka konkretnych pól za pośrednictwem grupy `Extra`. Bez `Show Extra Fields` niektóre specyficzne parametry firmowe pozostają ukryte w edytorze kanału.

Typowe przykłady obejmują:

* `TXLock`
* `BusyCL`
* `FreqRev`
* `PTT ID`
* `Compander`
* `Scanlists`

## Edytuj i wysyłaj

Następnie możesz edytować wspomnienia, nazwy i obsługiwane ustawienia.

Kiedy będziesz gotowy:

1. Przejrzyj swoje zmiany.
1. W `CHIRP` wybierz `Radio > Upload To Radio...`
1. Użyj tego samego portu, sprzedawcy i modelu.
1. Przed dotknięciem kabla lub wyłączeniem radia należy odczekać aż załadunek zostanie w pełni zakończony.

> [!WARNING]
> Zostaw w spokoju przedmioty związane z kalibracją lub zaawansowane, chyba że wiesz dokładnie, co robią.

## Identyfikacja Beacon

Niezależna aplikacja Beacon wykorzystuje ustawienie CHIRP `Message Line 1` jako swój sygnał wywoławczy. Oddany kierowca akceptuje do `12 characters` w tej dziedzinie.

Kiedy Beacon transmituje w trybie `CALL`, firmware konwertuje litery do uppercase, przechowuje litery, cyfry i `/`, usuwa nieobsługiwane znaki i dodaje ` MOE`. Jeśli otrzymany sygnał wywoławczy jest pusty, transmituje `MOE`.

Po zmianie `Message Line 1`, należy przesłać ustawienia do radia przed uruchomieniem Beacon. Zob. [Beacon](./Beacon) dla informacji dotyczących zachowania transmisji i bezpieczeństwa.

## Dobra praktyka

* zawsze używać sterownika dołączonego do tego samego wydania firmware
* zawsze najpierw pobrać, a następnie zapisać kopię zapasową
* po aktualizacji oprogramowania firmowego przeładuj nowszy moduł sterownika z tego wydania
* używać `CHIRP` do programowania masowego, nie Quansheng CPS

## Jeśli coś wygląda źle

Sprawdź te punkty:

1. radio jest naprawdę `UV-K1` lub `UV-K5 V3`
1. radio uruchamia oczekiwaną wersję i wydanie F4HWN
1. `CHIRP` załadował sterownik z tego samego wydania, nie kolejny moduł `UV-K5`
1. kabel jest w pełni wstawiony
1. wybrany port szeregowy jest prawidłowy

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Operacja radiowa](./Radio-operation)
* [Beacon](./Beacon)
* [Rozwiązywanie problemów](./Troubleshooting)
