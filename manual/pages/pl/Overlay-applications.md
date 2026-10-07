# Wnioski nakładane

Ta strona opisuje jedenaście aplikacji obecnie dostępnych dla edycji `Labs`: co robią i jak je kontrolować. Informacje o instalacji, kompatybilności i deweloperze znajdują się w [Overlay apps](./Overlay-apps).

> [!NOTE]
> Klucze nawigacyjne zależą od radia i ustawienia `SetNav`: `UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1. W tabelach poniżej, `UP/LEFT` i `DOWN/RIGHT` odnoszą się do tych samych kluczy.

## Uruchomienie aplikacji

1. Zainstaluj kompatybilny plik `.app` za pomocą [UV Studio](./UV-Studio#apps-labs).
1. Z normalnego ekranu radiowego naciśnij `F`, a następnie `7 VOX`.
1. Wybierz zainstalowaną aplikację za pomocą `UP/LEFT` lub `DOWN/RIGHT`.
1. Naciśnij `M`, aby go uruchomić.

W większości aplikacji `EXIT` zamyka aplikację i wraca do wyrzutni lub normalnego ekranu radiowego. Niektóre aplikacje radiowe mogą być również przypisywane bezpośrednio do programowalnego klucza za pomocą zwykłego urządzenia do podejmowania działań.

## Streszczenie wniosku

| Stosowanie | Cel |
| --- | --- |
| `Broadcast FM` | Pełna prezentacja odbiornika FM z VFO, wspomnienia i skanowanie stacji |
| `FoxHunt` | Siła sygnalizacyjna i wskazująca kierunek pomocy z historią, tłumieniem i naprowadzaniem dźwięku |
| `Beacon` | Powtarzanie nadajnika w stylu ARDF- Morse przy użyciu wybranego nadajnika VFO |
| `Beam` | Transfer konfiguracja jednego kanału między kompatybilnymi radiami na powietrzu |
| `Breakout` | Gry Brick- breaking gry |
| `Tetris` | Falling- block gra z punktacji, poziomy i zapisany najlepszy wynik |
| `Cube3D` | Animowana przeglądarka kształtu 3D |
| `Plasma` | Animowane wzory w stylu demoscenerii |
| `Snake` | Classic gra węży grid z zapisanym najlepszym wynikiem |
| `Rapid Roll` | Gra platformowa, w której piłka musi stale opadać, omijając przeszkody |
| `Space Impact` | Kosmiczna strzelanka z przewijaniem bocznym, automatycznym ogniem, pociskami i bossami |

## Broadcast FM

`Broadcast FM` jest kompletnym odbiornikiem BK1080. Zapewnia on tryby częstotliwości i pamięci, cztery zespoły nadawcze, ręczne poszukiwanie, automatyczne wykrywanie stacji i 48 pamięci FM udostępnianych z radiostacją FM.

Podczas pracy tej aplikacji, normalne funkcje BK4819 odbierania i dual- watch są zawieszone. Zmiany w pamięci FM są dokonywane bezpiecznie po wyjściu aplikacji.

| Klucz | Działanie |
| --- | --- |
| `0`- `9` | Wprowadź częstotliwość w trybie VFO lub dwucyfrowy numer pamięci w trybie MR / zapisać |
| `UP/LEFT` lub `DOWN/RIGHT` | Wstaw jeden krok w trybie VFO; wybierz poprzednią / następną zapisaną stację w trybie MR; wybierz miejsce zapisu; zmień kierunek wyszukiwania podczas skanowania |
| `*` | Rozpocznij ręczne poszukiwanie; przerwij aktywne skanowanie |
| `F`, następnie `*` lub przytrzymaj `*` | Uruchom automatyczne skanowanie i odbudowę listy pamięci FM |
| `M` w trybie VFO | Otwórz `SAVE?`; naciśnij `M` ponownie, aby zapisać w wybranym miejscu |
| `M` w trybie MR | Otwórz `DEL?`; naciśnij `M` ponownie, aby usunąć wybraną pamięć |
| `F`, następnie `1` lub przytrzymaj `1` | Wybierz następny zespół nadawczy |
| `F`, następnie `3` lub przytrzymaj `3` | Przełączanie między trybami VFO i MR |
| `F`, następnie `0` lub przytrzymaj `0` | Wyłączyć wniosek |
| `EXIT` | Usuń ostatnią wprowadzoną cyfrę, anuluj zapisz / usuń zapytanie lub wyłącz |

> [!WARNING]
> Automatyczne skanowanie oczyszcza i odbudowuje listę pamięci FM przed przechowywaniem stacji, które znajduje.

## FoxHunt

`FoxHunt` pomaga zlokalizować nadajnik za pomocą wybranego odbiornika VFO. Pokazuje skorygowaną siłę sygnału w dBm, mierniku S- stylu IARU-, szczytowym i minimalnym poziomie, informacje o trendzie oraz wykresie paska lub historii sygnału. Selectable tłumienie rozszerza użyteczny zakres blisko silnego nadajnika.

| Klucz | Działanie |
| --- | --- |
| `1` | Przełączanie między wykresem paska a historią sygnału |
| `2` | Wybierz następny tryb audio: wyłączony, silny sygnał dźwiękowy lub ciągły dźwięk stacji |
| `3` | Zwiększenie tłumienia |
| `F`, następnie `2` | Wybierz poprzedni tryb audio |
| `F`, następnie `3` | Zmniejszenie tłumienia |
| `UP/LEFT` lub `DOWN/RIGHT` | Bezpośrednio zwiększenie / zmniejszenie tłumienia |
| `M` | Zresetuj wartości odniesienia piku, minimum i trendu |
| Przytrzymaj `F` | Zablokuj lub odblokuj klawiaturę aplikacji |
| `EXIT` | Wyjdź, gdy klawiatura jest odblokowana |

Graf, tryb audio i ustawienia tłumienia są zapisywane do następnego uruchomienia. Dwa klawisze nawigacyjne pozostają dostępne, podczas gdy klawiatura aplikacji jest zablokowana.

## Beacon

`Beacon` wielokrotnie transmituje identyfikator Morse w stylu ARDF- na wybranym VFO. Zamienia się między konfigurowalnym oknem transmisyjnym a okresem bezczynności. Dostępne identyfikatory to `MOE`, `MOI`, `MOS`, `MOH`, `MO5`, `MO` i `CALL`; `CALL` wysyła skonfigurowany sygnał wywoławczy, a następnie `MOE`.

| Klucz | Działanie |
| --- | --- |
| `1` | Zwiększenie czasu transmisji w 5- sekundowych etapach (`5`- `60` sekund) |
| `2` | Zwiększ czas bezczynności w 5- sekundowych krokach (`5`- `240` sekund) |
| `3` | Wybierz kolejny identyfikator |
| `4` | Włączenie / wyłączenie `TONE` / `CARR` Keying |
| `F`, następnie `1` / `2` / `3` / `4` | Zmiana odpowiedniego ustawienia w kierunku odwrotnym |
| `M` podczas transmisji | Zatrzymać bieżące okno transmisji i rozpocząć okres bezczynności |
| `M` podczas bezczynności | Przywróć pełne odliczanie biegu jałowego |
| Przytrzymaj `F` | Zablokuj lub odblokuj wszystkie sterowniki aplikacji |
| `EXIT` | Zatrzymać się bezpiecznie i wyjść podczas kontroli są odblokowane |

Pierwsza transmisja zaczyna się natychmiast. Czas trwania, czas bezczynności, identyfikator i tryb Keying są zapisywane do następnego uruchomienia. Jeżeli oprogramowanie firmowe będące rezydentem odmawia transmisji, aplikacja wyświetla `TX OFF` i nie przekazuje.

> [!WARNING]
> Beacon przesyła automatycznie. Sprawdź wybrane przepisy VFO, częstotliwość, moc, antena, sygnał wywoławczy, cykl pracy i lokalne przepisy przed uruchomieniem.

## Beam

`Beam` przenosi wybraną konfigurację VFO lub memory- kanału pomiędzy kompatybilnymi radiami. Wysyłanie radiowe transmituje dane kanału przez powietrze; odbieranie radiowe przechowuje ważny pakiet w pierwszej wolnej pamięci.

| Klucz | Działanie |
| --- | --- |
| `UP/LEFT` lub `DOWN/RIGHT` | Przełączanie pomiędzy trybami transmisji (`BEAM TX`) i odbierania (`BEAM RX`); także zatrzymanie aktywnej operacji odbioru |
| `M` w trybie TX | Wyślij wybraną konfigurację kanału |
| `M` w trybie RX | Zacznij czekać na pakiet Beam |
| `EXIT` | Zatrzymaj odbiór lub wycofanie aplikacji |

Wyświetlacz informuje odpowiednio `SENT`, `RECEIVED`, `MEM FULL` lub `ERROR`. Tylko jeden otrzymany kanał jest popełniany na starcie; wyjście i ponowne otwarcie Beam przed otrzymaniem innego.

## Breakout

`Breakout` to kompaktowa gra Brick- breaking z 18 cegieł, pięć piłek startowych, wynik i śledzenia poziomu. Oczyszczenie ściany zaczyna się na następnym poziomie i przyznaje dodatkową piłkę.

| Klucz | Działanie |
| --- | --- |
| `4` lub `UP/LEFT` | Przesuń wiosło w lewo |
| `0` lub `DOWN/RIGHT` | Przesuń wiosło w prawo |
| `M` | Pauza lub wznowienie; po `GAME OVER`, rozpocząć przygotowaną nową grę |
| `EXIT` | Wyłączyć wniosek |

Postęp gry nie jest zachowany po opuszczeniu aplikacji.

## Tetris

`Tetris` używa 16 × 16 widocznej studni, tasowany 7-częściowy worek, kawałek ducha, następny element podglądu, wynik, linie i poziomy. Najlepszy wynik jest zapisywany pomiędzy startami.

| Klucz | Działanie |
| --- | --- |
| `4` lub `UP/LEFT` | Przesuń w lewo |
| `6` lub `DOWN/RIGHT` | W prawo |
| `M` lub `2` | Obróć kawałek |
| `8` | Miękka kropla |
| `*` lub `0` | Twarda kropla |
| `F` | Wstrzymać lub wznowić |
| `M`, `*` lub `0` po zakończeniu gry | Rozpocznij nową grę |
| `EXIT` | Wyłączyć wniosek |

Ruch i miękka kropla powtarzać, gdy ich klucze są trzymane.

## Cube3D

`Cube3D` powoduje obracanie kształtów stałych lub wireframów. Dostępne są osiem kształtów: sześcian, oktahedron, tetrahedron, diament, ikozahedron, cuboctahedron, heksagonalny pryzmat i klejnot pentagonalny.

| Klucz | Działanie |
| --- | --- |
| `UP/LEFT` lub `DOWN/RIGHT` | Zwiększenie / zmniejszenie prędkości obrotowej (`1`- `16`) |
| `1`- `8` | Wybierz kształt bezpośrednio |
| `*` | Wybierz następny kształt |
| `F` | Włączenie / wyłączenie renderowania litego |
| `M` | Wstrzymać lub wznowić |
| `EXIT` | Wyłączyć wniosek |

## Plasma

`Plasma` wyświetla animowane, pełnoekranowe wzory w stylu demo-scenicznym z zespołami lub stylem renderowania.

| Klucz | Działanie |
| --- | --- |
| `UP/LEFT` lub `DOWN/RIGHT` | Zwiększenie / zmniejszenie prędkości animacji (`1`- `8`) |
| `1`- `5` | Wybierz wzór i wyłączyć automatyczną jazdę na rowerze |
| `*` | Przełączanie pasm / renderowanie sztywne |
| `F` | Włącz lub wyłączyć automatyczną cyklizację wzorów |
| `M` | Wstrzymać lub wznowić |
| `EXIT` | Wyłączyć wniosek |

## Snake

`Snake` to klasyczna gra w stylu Nokia grana na siatce `31 × 13`. Jedz jedzenie do uprawy węża i zdobyć punkty `10`. Uderzenie w granicę albo ciało węża kończy grę. Najlepszy wynik jest zapisywany pomiędzy startami.

| Klucz | Działanie |
| --- | --- |
| `2` lub `3` | Przesuń się |
| `4` lub `5` | Przesuń w lewo |
| `6` lub `0` | W prawo |
| `8` lub `9` | Przesuń w dół |
| `F` | Wstrzymać lub wznowić |
| `M`, `*` lub `0` po zakończeniu gry | Rozpocznij nową grę |
| `EXIT` | Wyłączyć wniosek |

Trzymanie klucza kierunkowego go powtarza. Wniosek odmawia natychmiastowego powrotu do ciała węża. Jeśli wygaszacz ekranu aktywuje się podczas gry, Snake przerywa i wznawia po przebudzeniu.

## Rapid Roll

`Rapid Roll` to gra platformowa, w której platformy unoszą się w stronę sufitu z kolcami. Przesuwaj piłkę na boki i opuszczaj ją z jednej bezpiecznej platformy na następną. Platformy z kolcami, sufit i dolna krawędź ekranu odbierają jedno życie; od poziomu 3 pojawiają się rozpadające się platformy. Serca dają `50` punktów i przywracają jedno życie, maksymalnie do pięciu.

| Klucz | Działanie |
| --- | --- |
| `4` lub `UP/LEFT` | Obrót w lewo |
| `6` lub `DOWN/RIGHT` | Obrót w prawo |
| `F` | Wstrzymać lub wznowić |
| `M` po zakończeniu gry | Rozpocznij nową grę |
| `EXIT` | Wyjście z aplikacji |

Gra rozpoczyna się z trzema życiami i przyspiesza wraz ze wzrostem poziomu. Na wyższych poziomach bezpieczne platformy stają się węższe. Postęp nie jest zachowywany po wyjściu z aplikacji. Jeśli podczas gry włączy się wygaszacz ekranu, Rapid Roll zostanie wstrzymany i wznowiony po wybudzeniu radiostacji.

## Space Impact

`Space Impact` to kosmiczna strzelanka z przewijaniem bocznym. Statek automatycznie strzela z głównej broni, dzięki czemu sterowanie służy do ruchu w pionie. Fale przeciwników wykorzystują różne schematy ruchu i ataku; na końcu każdego poziomu pojawia się boss z widocznym paskiem zdrowia.

| Klucz | Działanie |
| --- | --- |
| `2` lub `UP/LEFT` | Przesuń statek w górę |
| `8` lub `DOWN/RIGHT` | Przesuń statek w dół |
| `5` lub `M` | Odpalić pocisk przebijający |
| `F` | Wstrzymać lub wznowić |
| `M` po zakończeniu gry | Rozpocznij nową grę |
| `EXIT` | Wyjście z aplikacji |

Gra rozpoczyna się z trzema życiami i trzema pociskami. Główna broń strzela automatycznie. Za każdych 16 pokonanych przeciwników otrzymujesz dodatkowy pocisk, maksymalnie do dziewięciu. Pokonanie bossa zapewnia dodatkowe życie i pocisk, jeśli odpowiednie limity nie zostały jeszcze osiągnięte. Postęp nie jest zachowywany po wyjściu z aplikacji. Jeśli podczas gry włączy się wygaszacz ekranu, Space Impact zostanie wstrzymany i wznowiony po wybudzeniu radiostacji.

## Odpowiednie strony

* [Aplikacje nakładkowe](./Overlay-apps)
* [UV Studio](./UV-Studio#apps-labs)
* [Funkcje przycisku](./Button-functions)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [odbiornik radiowy FM](./FM-broadcast-radio-receiver)
