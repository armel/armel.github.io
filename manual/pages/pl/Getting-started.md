# Zaczynając

Ta strona jest szybkim przewodnikiem orientacji dla użytkowników firmware po raz pierwszy. Nie zastępuje pełnej dokumentacji, ale powinno pomóc znaleźć właściwą stronę szybciej i uniknąć najczęstszych błędów.

## Pierwsze 5 minut

Jeśli chcesz tylko zaprogramować częstotliwość, przetestować radio i zapisać je:

1. Wybierz aktywny VFO za pomocą `F` + `2 A/B`.
1. Przełącz VFO na `frequency mode` z `F` + `3 VFO/MR`.
1. Wprowadź częstotliwość z klawiaturą.
1. Otwórz menu za pomocą `M`, wybierz `Channels` (lub `All`) i dostosuj podstawowe elementy (`Step`, `Power`, tony, offset, przepustowość, `Mode`, `TXLock`).
1. Zapisz konfigurację z `ChSave`, jeśli chcesz zachować ją jako kanał pamięci.
1. Przełącz z powrotem na `channel mode` z `F` + `3 VFO/MR`, jeśli chcesz przeglądać zapisane kanały.

Jeśli musisz przeglądać lub kontrolować radio z przeglądarki, sprawdzić aktywność RF, oprogramowanie do nagrywania flash firmware, wykonać kopię zapasową kalibracji lub przesłać własne logo startowe, użyj [UV Studio](./UV-Studio). Jeśli wolisz programowanie pamięci z komputera, użyj dedykowanego sterownika `CHIRP` dostarczonego z każdym oprogramowaniem firmware. Zobacz [Programowanie z CHIRP](./Programming-with-CHIRP) dla pełnego przepływu pracy.

Jeśli znasz już oprogramowanie firmowe, zobacz [Ostatnie zmiany](./Recent-changes) dla najnowszych stabilnych zmian `v6.1.0` i wcześniejszych podświetleń `v6.0.0`.

> [!WARNING]
> Nie stosować leku Quansheng CPS. Nadpisuje ustawienia niestandardowe.

## Wybierz edycję

Najnowsze stabilne wydanie `v6.1.0` posiada cztery oficjalne wydania:

| Edycja | Najlepsze dla | Dodatkowe możliwości |
| --- | --- | --- |
| `Fusion` | większość użytkowników i codzienna obsługa | wyważony zestaw cech odniesienia |
| `FieldOps` | stosowanie w terenie i przy pierwszej odpowiedzi | RescueOps, rezydent FoxHunt, rezydent Beacon |
| `Transfer` | kopiowanie danych między radiami | AirCopy i rezydent Beam |
| `Labs` | eksperymenty | RescueOps, AirCopy i instalowalne aplikacje nakładające |

FoxHunt i Beacon są niezależnymi aplikacjami od `v6.0.0`. W FieldOps są rezydentami; w Labs są instalowane i uruchamiane oddzielnie jako aplikacje nakładające.

Dla większości użytkowników, zacznij od Fusion i wybierz specjalistyczną edycję tylko wtedy, gdy potrzebujesz jej dodatkowych możliwości. Multiboot pozwala zachować kilka edycji i oddzielnych konfiguracji w tym samym radiu.

## Wspólne zadania

### Rozpocznij skanowanie częstotliwości

1. Przełącz VFO na `frequency mode`.
1. Ustaw częstotliwość startową.
1. Ustaw krok częstotliwości menu `Step`.
1. Długoprasa `* SCAN`.

Dla ograniczonego zakresu skanowania, załadować dolne i górne granice do dwóch VFOs, długotrwale naciśnij `5 NOAA`, aby umożliwić `ScnRng`, a następnie długotrwale naciśnij `* SCAN`.

Dla pełnego zachowania skanowania, listy skanów, skanowanie priorytetów i skanowanie DCS / CTCSS, patrz [Skanowanie](./Scanning).

### Zacznij skanować kanały pamięci

1. Przełącz na `channel mode`.
1. Przypisz kanały do listy skanującej z menu `ScList` lub przez długie naciśnięcie `5 NOAA`.
1. Długoprasa `* SCAN`.

Bieżące oprogramowanie `v6.1.0` obsługuje listy skanowania `24`, `ALL` oraz konfigurowalny tryb `MIX`, który razem skanuje kilka wybranych list.

Zobacz [Skanowanie](./Scanning) dla pełnego zachowania scan- list.

### Jeśli nie możesz przesłać

Najpierw sprawdź te elementy:

1. Upewnij się, że `Mode` jest `FM`, a nie `AM` lub `USB`.
1. Sprawdź, czy częstotliwość jest wewnątrz wybranego planu `F Lock`.
1. Jeśli częstotliwość jest poza wybranym planem pasm, sprawdź czy `TXLock` jest ustawiony na `OFF`.
1. Szukaj małej kłódki obok kanału lub nazwy VFO.

Jeśli to nadal tego nie wyjaśnia, zobacz [Rozwiązywanie problemów](./Troubleshooting).

### Zapisz baterię

Dwa główne menu to:

* `BatSav` dla współczynnika aktywności / snu podczas normalnej pracy
* `SetOff` dla głębokiego snu po okresie bezczynności

Patrz [Praca radiowa](./Radio-operation#battery-display-type-and-calibration) dla wyświetlania baterii, typu baterii i kalibracji oraz [Operacja radiowa](./Radio-operation#about-the-setoff-menu) dla szczegółowego zachowania trybu uśpienia.

## Różnice w modelu

To oprogramowanie ma na celu `UV-K1` i `UV-K5 V3`.

Najbardziej widoczną różnicą dnia na dzień w dokumentacji jest nawigacja:

* `UV-K5`: nawigacja jest zwykle opisywana za pomocą `UP` / `DOWN`
* `UV-K1`: nawigacja jest zwykle opisywana za pomocą `LEFT` / `RIGHT`

Opcja hidden- menu `SetNav` kontroluje ten styl nawigacji.

Niektóre zrzuty ekranu i przykłady najpierw używają terminologii UV- K5, ale ta sama funkcja zwykle istnieje na UV-K1 z równoważnymi klawiszami nawigacyjnymi.

## Koncepcje podstawowe

Terminy te pojawiają się w całym wiki:

* `VFO mode`: Wpisujesz częstotliwości bezpośrednio i dostosowujesz ustawienia na żywo przed ich zapisem
* `Channel mode` / `memory mode`: przeglądasz zapisane kanały pamięci
* `Main VFO`: aktywna górna lub dolna linia oznaczona symbolem `►`
* `Menu category`: klasyfikowany pierwszy poziom menu wprowadzony w Fusion `v5.9.0` i używany przez aktualne edycje v6; `All` przywraca oryginalny porządek i globalną numerację
* `F Lock`: główny plan zespołu TX
* `TXLock`: dodatkowe zezwolenie na kanał TX, gdy częstotliwość jest poza wybranym planem `F Lock`
* `Scan list`: jedna z grup pamięci `24` lub `ALL`
* `MIX`: tryb skanowania `v6.1.0` łączący zapisany wybór list `01` z `24`
* `ScnRng`: skanowanie tylko pomiędzy częstotliwościami obecnie załadowanymi do dwóch VFOs
* `SetOff`: czas bezczynności przed głębokim snem
* `POnMsg`: tryb uruchamiania wyświetlacza, w tym opcjonalne logo startowe
* `Multiboot`: przechowuje `Main` plus cztery dodatkowe, kompatybilne z v6 obrazy oprogramowania firmowego w zewnętrznym programie Flash
* `Config bank`: profile izolowanych kanałów / ustawień połączone domyślnie z gniazdem Multiboot
* `SetCfg`: zmienia bank konfiguracyjny bez zmiany działającego gniazda firmware
* `Overlay app`: mały program tylko Labs- `.app` załadowany z zewnętrznego Flash do RAM po uruchomieniu
* `MO`, `DW`, `DWR`, `XB`: Skróty `RxMode` pokazane na pasku statusu

## Gdzie iść dalej

* [Operacja radiowa](./Radio-operation) dla korzystania z VFO / kanału, paska stanu, `F Lock`, `TXLock` i zachowania snu
* [Ostatnie zmiany](./Recent-changes) dla głównych widocznych dla użytkownika zmian w ostatnich wydaniach
* [UV Studio](./UV-Studio) do oglądania na żywo, aktywności RF, migotania oprogramowania firmowego, szczelin Multiboot, aplikacji Labs, kalibracji, logo boot, oraz narzędzi do odzyskiwania zewnętrznych Flash `v1.6.0`
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig) dla gniazd firmware, selektora startowego, banków konfiguracyjnych i `SetCfg`
* [Nakładanie aplikacji](./Overlay-apps) do instalacji i uruchamiania eksperymentalnych aplikacji Labs
* [Programowanie z CHIRP](./Programming-with-CHIRP) do programowania komputerowego z dedykowanym sterownikiem dołączonym do każdego wydania
* [Skanowanie](./Scanning) do skanowania częstotliwości, skanowania pamięci, `ScnRng` oraz skanowania DCS / CTCSS
* [Menu](./Menu) dla każdej pozycji menu i ukrytego menu
* [Funkcje przycisku](./Button-functions) do skrótów, długich pras i programowalnych klawiszy
* [FoxHunt](./Fox-Hunt) w przypadku wskazania kierunku wspomaganego tylko przez odbiorcę
* [Beacon](./Beacon) dla niezależnego, okresowego nadajnika Morse 'a
* [AirCopy](./AirCopy) dla transmisji pamięci / ustawień radiowych i ulepszeń `v6.1.0`
* [Zaawansowane funkcje](./Advanced-features) dla RescueOps, Resume Mode, built- in game oraz TX- on- all- bands research features
* [Analizator widma](./Spectrum-analyzer) do skanowania w stylu bandskopowym
* [Odbiornik radia FM](./FM-broadcast-radio-receiver) dla funkcji transmitowania FM
* [Rozwiązywanie problemów](./Troubleshooting) dla wspólnych problemów i szybkich kontroli
