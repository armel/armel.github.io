# Ostatnie zmiany

Ta strona podsumowuje najnowsze stabilne wydanie `v6.1.0` i główne widoczne zmiany użytkownika we wcześniejszych wersjach.

Oficjalne archiwum wydania, patrz [GitHub releases page](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases).

## v6.1.0

`v6.1.0` jest najnowszą stabilną wersją. Skupia się na szybszym i bezpieczniejszym przesyłaniu danych, nowym trybie skanowania `MIX`, rozszerzonej konserwacji Labs poprzez UV Studio oraz kilku poprawkach niezawodności.

### Zestaw do wydania

Pobierz oprogramowanie firmowe i pliki towarzyszące ze strony [v6.1.0 wydania](https://github.com/armel/uv-k1-k5v3-firmware-custom/releases/tag/v6.1.0). Wydanie zawiera cztery oficjalne edycje - `Fusion`, `FieldOps`, `Transfer` i `Labs` - plus dopasowanie współdzielonego sterownika CHIRP. Wybierz wydanie według możliwości zamiast traktować Fusion jako pakiet zawierający każdą specjalistyczną funkcję.

### Aktualizacja z v6.0.0

1. Dzięki zainstalowanemu staremu firmware, pobierz radio za pomocą odpowiedniego sterownika CHIRP i zapisz ten obraz. Opcjonalnie eksportuj wiersze memory- kanału do CSV.
1. Wykonać kopię zapasową kalibracji specyficznej dla urządzenia radiowego za pomocą [UV Studio](./UV-Studio#calibration).
1. Flash wybranej edycji `v6.1.0`. Wykonaj fabryczny reset tylko wtedy, gdy instrukcje wydania lub ścieżka migracji z zainstalowanej wersji wyraźnie tego wymaga.
1. Wczytaj dedykowany sterownik `v6.1.0` CHIRP i pobierz świeży obraz z uaktualnionego radia.
1. Kopiuj stare wiersze kanału do tego świeżego obrazu zamiast wpisywać kompletny stary obraz ustawień.
1. W Labs wybierz `v6.1.0` w katalogu aplikacji UV Studio. Zastąp każdą aplikację nakładkę, którą ładowarka zgłasza jako niezgodną.
1. Przed użyciem AirCopy zaktualizuj oba radiotelefony do kompatybilnego oprogramowania `v6.1.0`; jego zoptymalizowany protokół radiowy nie jest kompatybilny z wcześniejszymi wersjami.

Dla dodatkowej kopii bezpieczeństwa po zainstalowaniu `v6.1.0` Labs, UV Studio może zapisać kompletny zewnętrzny Flash. Zob. [Wybór odpowiedniego kopii zapasowej lub kopii](./UV-Studio#choosing-the-right-backup-or-copy).

### Wydajność AirCopy i klonowanie kabli

Protokół `v6.1.0` AirCopy wysyła do trzech bloków `64-byte` w jednej ramce FSK, redukując zawracanie nad głową i czyniąc transmisje radiowe około dwa razy szybciej. Porównuje CRC32 hash w grupach do bloków `24` i wysyła tylko bloki, które różnią się w stosunku do celu.

Edycja `Transfer` dodaje także `CABLE COPY` nad UART i wybór `Flash 2M` tylko dla kabli do klonowania zewnętrznego Flash, wyłączając sektor kalibracji specyficznej dla urządzenia. Selekcje nadawcy i odbiorcy są zatwierdzane przed zapisem danych.

Jest to nowy protokół: oba radia muszą uruchamiać te same kompatybilne oprogramowanie firmowe. Zob. [AirCopy](./AirCopy#v610-improvements).

### Lista skanów MIX

Nowy tryb `MIX` skanuje zapisany wybór list `01` do `24` jako jeden zestaw. Wybierz `MIX` w `ScList`, naciśnij `M`, aby otworzyć edytor, przełącz listy z `M` i zapisać z `EXIT`. Edytor wyświetla liczbę wybranych list i co najmniej jedna lista musi pozostać włączona.

Podczas aktywnego skanowania pamięci, wprowadzanie `25` powoduje wybór `MIX`; `00` nadal wybiera `ALL`. Zob. [Skanowanie](./Scanning#mix-scan-list-v610).

### UV Studio v1.6.0

UV Studio `v1.6.0` dodaje pełną kopię zapasową `2 MiB` external- Flash i przywraca Labs. Przywracanie zachowuje specyficzny dla danego urządzenia sektor kalibracji, pomija identyczne sektory `4 KiB` przy użyciu CRC32 przy wsparciu, weryfikuje każdy pisany sektor i ponownie uruchamia radio po zakończeniu.

Nowe oprogramowanie z przewodnikiem weryfikuje połączone obrazy według wielkości i SHA- 256, przywraca zrekonstruowany obraz zewnętrzny-Flash przy zachowaniu kalibracji, Następnie uruchamia tryb DFU i instaluje pasujące oprogramowanie UV-K1 lub UV-K5 V3. Interfejs grupuje również operacje kalibracji i boot- logo w jaśniejsze tworzenie kopii zapasowych / przywracania lub pobierania / wysyłania widoków.

Narzędzia zewnętrzne wymagają `v6.1.0` Labs. Zob. [UV Studio](./UV-Studio#version-status), [zewnętrzne backup i przywracanie Flash](./UV-Studio#external-flash-backup-and-restore-v160) oraz [odtworzenie oprogramowania fabrycznego](./UV-Studio#factory-software-restoration-v160).

### Inne v6.1.0 zmiany

W wydaniu dodano również gry nakładkowe [`Snake`](./Overlay-applications#snake), [`Rapid Roll`](./Overlay-applications#rapid-roll) i [`Space Impact`](./Overlay-applications#space-impact). Wprowadzono także poprawki dotyczące dziennika RF między bankami konfiguracji, pamięci aplikacji nakładkowych, kalibracji przemiatania oraz obsługi końcówki blokady szumów DCS.

## v6.0.0

`v6.0.0` został wydany 10 września 2026. Wprowadził cztery oficjalne edycje: Multiboot i Multiconfig, platformę Labs overlay- app, niezawodne AirCopy oraz niezależne aplikacje FoxHunt i Beacon.

### Cztery oficjalne wydania

| Edycja | Przewidywane stosowanie | Dodatkowe funkcje |
| --- | --- | --- |
| `Fusion` | codzienne stosowanie | wyważone wydanie referencyjne; zalecane dla większości użytkowników |
| `FieldOps` | praca w terenie i praca po raz pierwszy | RescueOps, rezydent FoxHunt i rezydent Beacon |
| `Transfer` | Przekazywanie danych radiowych | AirCopy i rezydent Beam |
| `Labs` | eksperymenty | RescueOps, AirCopy i aplikacje nakładające, w tym FoxHunt, Beacon i Beam |

Fusion `v6.0.0` nie zawiera już wyspecjalizowanych funkcji v5.x AirCopy, Beam, RescueOps, Fox Hunt / Beacon lub Breakout. Wybierz odpowiednie wydanie specjalistyczne, gdy wymagana jest jedna z tych możliwości.

### Niezależne aplikacje FoxHunt i Beacon

Pierwsza połączona akcja `FOX HUNT / BEACON` została podzielona przed wydaniem `v6.0.0`. `FOX HUNT` i `BEACON` to oddzielne działania programowalne, oddzielne aplikacje rezydentów w FieldOps oraz oddzielne aplikacje nakładające w Labs.

Zob. [FoxHunt](./Fox-Hunt) i [Beacon](./Beacon).

### Multiboot

Kompatybilne edycje mogą przechowywać cztery dodatkowe obrazy firmowe F4HWN w zewnętrznym programie Flash. Przytrzymaj `M` (`MENU`) samodzielnie podczas włączania radia, aby otworzyć selektor startowy, potwierdzić zapisane obrazy i przywrócić `Main` lub slot `1` do `4`.

Oprogramowanie firmware automatycznie chroni normalnie błyszczący obraz jako `Main`, weryfikuje kompletny CRC szczeliny przed wykasowaniem wewnętrznego Flash 'a i rejestruje jego stan aktywny nadpobudliwie. Widok UV Studio `Firmware Slots` instaluje, weryfikuje, nazywa i usuwa cztery szczeliny użytkownika, podczas gdy radio jest w normalnym trybie.

W tych szczelinach powinny być zainstalowane tylko multibootowalne obrazy `v6.0.0` lub nowsze obrazy F4HWN. Zob. [Multiboot i Multiconfig](./Multiboot-and-Multiconfig).

### Multiconfig i SetCfg

Każde gniazdo firmware domyślnie wybiera oddzielny bank konfiguracyjny. Kanały pamięci, nazwy kanałów, VFOs, listy skanów i ustawienia radiowe pozostają zatem izolowane podczas przełączania edycji. Kalibracja, logo boot, szczeliny firmware / app, stan Multiboot i dziennik RF pozostają współdzielone.

Nowe menu `SetCfg` może celowo połączyć uruchomione oprogramowanie firmowe z innym bankiem. `SysInf` pokazuje niezależne znaczniki `SLOT` i `CFG`, a UV Studio może zresetować konfigurację gniazda użytkownika bez usuwania oprogramowania firmowego.

Zob. [Multiboot i Multiconfig](./Multiboot-and-Multiconfig#multiconfig-one-configuration-bank-per-slot) i [Menu](./Menu).

### Niezawodny AirCopy z potwierdzeniem

Air Copy czeka na potwierdzenie po każdym bloku. Odbiorca weryfikuje pakiet przed jego napisaniem i może poprosić o wznowienie; nadawca ponownie próbuje utraconych, uszkodzonych lub niepotwierdzonych bloków do trzech razy. Duplikaty bloki są uznane bezpiecznie, więc zaginiony ACK nie desynchronizuje już transferu.

Nowy wybór `All (Mem+Set)` przenosi wszystkie osiem 128- kanałowych banków i Ustawienia w jednym ciągłym biegu. Ekran informuje o postępie `TX` / `RX` plus ponowna próba lub liczba błędów.

Zob. [AirCopy](./AirCopy#reliable-protocol-in-v600).

### Nakładanie aplikacji w Labs

Eksperymentalna edycja `Labs` może zainstalować małe programy `.app` w zewnętrznym programie Flash i wykonać je z kontrolowanej nakładki `4 KiB` RAM. Widok UV Studio `Apps`, oznaczony `Labs only`, instaluje, weryfikuje, wymienia i usuwa aplikacje; `F + 7` otwiera wyrzutnię radiową.

Ładowarka potwierdza format aplikacji, kompatybilność ABI / API, wymagane możliwości, adres RAM, rozmiar i kod CRC przed wykonaniem. Dostępne aplikacje obejmują narzędzia radiowe takie jak Broadcast FM, FoxHunt, Beacon i Beam, plus Breakout, Tetris, Cube3D i Plasma.

Patrz [Overlay applications](./Overlay-apps) dla instalacji i kompatybilności oraz [Overlay applications](./Overlay-applications) dla celów i kontroli każdej aplikacji.

### Tryb kluczowania Beacon (TONE / CARR)

Beacon zyskuje ustawienia trybu keying- mode na klawiszu `4`. `TONE` (domyślnie) jest poprzednim zachowaniem - ciągłym nośnikiem FM z dźwiękiem `1000 Hz` określonym dla każdego elementu Morse 'a (MCW / F2A). `CARR` przerywa sam nośnik dla każdego elementu, odtwarzając przerywany wzór wózka wiele lisów ARDF używać w polu: sygnał znika między elementami, co utrudnia znalezienie kierunku i pozwala zwykły odbiornik AM skopiować go. Ustawienie jest zapisywane i zawarte w transferach AirCopy, i jest dostępne zarówno w rezydencie jak i nakładce Beacon. Zob. [Beacon](./Beacon#timing-and-keying).

## v5.9.0

Zmiany te zostały opracowane po podaniu `v5.8.0` i wydane w badaniu `v5.9.0`.

### Katalogowana przeglądarka menu

Rozwój Fusion buduje menu na ekranie kategorii zamiast natychmiast wyświetlać oryginalną listę płaskich. Dostępne kategorie to `Channels`, `Scan`, `Keys`, `Power`, `Display`, `Timers`, `Audio`, `Radio` i `DTMF`. Uruchomienie menu hidden- dodaje również kategorię `Service`.

Kategoria `All` zachowuje oryginalną kolejność menu flat- i globalną numerację. Włączenie numeru menu bezpośrednio z ekranu kategorii również przełącza się na `All`, dlatego istniejące skróty numbered- menu nadal działają. Oprogramowanie firmowe pamięta ostatnią wybraną kategorię i ostatnią pozycję użytą w każdej kategorii dla bieżącej sesji.

Zob. [Menu](./Menu#categorized-menu-browser).

### Selektor działania przycisku bocznego

Po naciśnięciu `F`, przytrzymaj jeden przycisk boczny, aby otworzyć tymczasowy wybielacz działania. Użyj `UP` / `DOWN` na UV- K5, lub `LEFT` / `RIGHT` na UV-K1, aby przeglądać dostępne skompilowane akcje skrótów i naciśnij `M`, aby uruchomić zaznaczone działanie. `EXIT` lub `F` anuluje picker; naciśnięcie `PTT` zamyka go i kontynuuje normalną obsługę transmisji.

Odbiorca zamyka się automatycznie po około pięciu sekundach lub po rozpoczęciu odbioru. Każdy przycisk boczny zapamiętuje swój ostatni wybór do czasu ponownego uruchomienia radia. Normalny krótki przycisk boczny `F` + zachowuje swoje zachowanie Step-up / Step-down.

Patrz [Funkcje przycisku](./Button-functions#side-key-action-picker).

### Fox Hunt / Beacon ulepszenia

Fox Hunt dodaje dwa głębsze kroki po oryginalnych ustawieniach `ATT 0`, `ATT 6`, `ATT 15` i `ATT 27`. Są one pokazane jako `BYP` i `BYP+`; nazwy te opisują wygodne tryby bliskiego zasięgu, a nie dosłownie obejście sprzętowe. Klucze nawigacyjne (`UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1) zmieniają teraz tłumienie bezpośrednio.

Po zmianie poziomu, oprogramowanie firmowe pozwala na krótkie osiadanie detektora RSSI, a następnie resetuje odniesienia do piku, minimum, trendu i historii znaków. Unika to czerstwych szczytów i sztucznych skoków podczas poruszania się pomiędzy zakresami zysków.

Przytrzymanie `F` przez około 0,5 sekundy przełącza tymczasową blokadę klawiatury udostępnioną przez Fox Hunt i Beacon. W Fox Hunt klawisze nawigacyjne pozostają dostępne do zmiany tłumienia podczas blokady. W Beacon wszystkie zwykłe elementy sterujące pozostają zablokowane, dopóki takie samo długie naciśnięcie nie odblokuje klawiatury, również podczas aktywnej transmisji.

Fox Hunt i Beacon ignorują teraz normalny zegar bezczynności `SetOff` i pozostają aktywne aż do momentu, gdy zostaną wyraźnie usunięte. Ich zwykły czas podświetlenia i aktualizacje baterii nadal działają.

Zob. [Fox Hunt i Beacon](./Fox-Hunt-and-Beacon).

### Skanowanie i poprawki transmisji FM

Podczas skanowania pamięci, zmiana aktywnej listy skanów tymczasowo utrzymuje wznowienie skanowania, podczas gdy nazwa listy skanów jest rzeczywiście wyświetlana. To trzyma ukryty wskaźnik postępu i pozycję skanowania zsynchronizowane. Częstotliwość i zakres skanów nie są wstrzymane, ponieważ nie pokazują nazwy narzutu.

Aktywny skaner stacji FM ignoruje sygnał wykryty na głównym kanale radiowym, więc skanowanie FM nie jest przerywane. Normalne odsłuchiwanie FM nadal wpływa na odbiór głównego kanału, jak wcześniej.

Zob. [Skanowanie](./Scanning#changing-the-scan-list-during-scan) i [FM nadawca](./FM-broadcast-radio-receiver#scanning-for-stations-from-fm-vfo).

## v5.8.0

Zmiany te są oparte na commits po tagu `v5.7.0` w `feature_update_v5`.

### Fox Hunt / Beacon

Kompilacje Fusion dodają programowalne działanie `FOX HUNT / BEACON` z dwoma uzupełniającymi się trybami:

* Fox Hunt oferuje skalibrowany wyświetlacz `dBm`, odczyty S- Meter i szczyt, jednosekundowy trend sygnału, wybrane tłumienie, styl Geiger- lub odebranej stacji audio, i wybór między skrajnią schodów i około 18-sekundowa historia sygnału.
* Beacon używa aktywnego TX VFO do przesyłania identyfikatora ARDF lub `<CALLSIGN> MOE` w Morse, z regulowanymi `5` do `60-second` okien TX i `5` do `240-second` ciche interwały.

Beacon bierze swój sygnał wywoławczy z CHIRP `Message Line 1` i rozpoczyna swoją pierwszą transmisję natychmiast po wybraniu. Przed każdym wybuchem oprogramowanie firmowe sprawdza odpowiedni zamek częstotliwości TX, per- VFO `TXLock`, stan baterii i ograniczenie modulacji.

Atencja, skrajnia, tryb audio i interwał Beacon są zapisywane w zewnętrznym błysku i są zawarte w Air Copy `Settings` transfery.

Zobacz historyczne [Fox Hunt / Beacon kompatybilność strona](./Fox-Hunt-and-Beacon). Dla bieżącego oprogramowania firmowego należy użyć odrębnych stron [FoxHunt](./Fox-Hunt) i [Beacon](./Beacon).

## v5.7.0

Zmiany te są oparte na commits po tagu `v5.6.1` w `feature_update_v5`.

### UV Studio

[UV Studio](./UV-Studio) zapewnia jednolity interfejs bazujący na przeglądarce do oglądania, sterowania, konserwacji i odzyskiwania.

Zapewnia on lusterko na żywo i kontrolę klawiatury non-TX, kompatybilne przeglądanie i analizę RF- log, eksport RF- log CSV, miganie oprogramowania firmowego, tworzenie kopii zapasowych / przywracanie kalibracji oraz niestandardowe zarządzanie logo boot-. Działa lokalnie przez `Web Serial` bez instalacji, serwera lub konta.

UV Studio jest przeglądarkowym towarzyszem oprogramowania firmowego Fusion.

### Dziennik RF

Kompilacje z rejestrowaniem RX/TX dodają programowalne działanie skrótu `RF LOG`.

Rejestry dziennika RF odbierają, monitorują i transmitują sesje w zewnętrznym błysku, a następnie wyświetlają je w newest- pierwszym widoku historii. Każdy wpis może wyświetlać nazwę lub częstotliwość kanału, kierunek RX / TX, czas trwania, poziom mocy RX S- Meter lub TX i najniższe napięcie akumulatora obserwowane podczas sesji.

Ekran dziennika obsługuje:

* Filtry `ALL`, `RX` i `TX`
* do 512 widocznych wpisów dotyczących ruchu
* jump-to- najnowsze i jump-to- najstarsze skróty z `F` plus klawisze nawigacyjne (`UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1)
* jasny przepływ potwierdzenia przed wykasowaniem dziennika

Zob. [Zaawansowane funkcje](./Advanced-features#rf-log) i [Funkcje przycisku](./Button-functions#rf-log-action).

### Wyłączenia ScanRange

`ScnRng` może teraz utrzymać do `64` tymczasowo wyłączone częstotliwości, zamiast `32`.

Tak jak wcześniej, lista jest okrągła, nie jest zapisywana do pamięci i jest usuwana po ponownym uruchomieniu radia lub po zmianie tożsamości zakresu.

Zob. [Skanowanie](./Scanning#excluding-frequencies-in-scnrng).

### Zakres blokady SetLck

`SetLck` ma teraz cztery opcje zamiast dwóch:

* `KEYS`
* `KEYS + ACTIONS`
* `KEYS + PTT`
* `KEYS + ACTIONS + PTT`

`ACTIONS` obejmuje programowalne skróty przyporządkowane do dwóch przycisków bocznych i `M Long`. Umożliwia to utrzymanie tych skrótów podczas zamykania klawiatury przedniej lub wyłączenie ich jako części zamka. `PTT` można zablokować niezależnie, aby zapobiec przypadkowemu przeniesieniu.

Patrz [Menu](./Menu#main-menu) i [Funkcje przycisku](./Button-functions#keypad-lock-and-setlck).

### Obsługa techniczna UV Studio

Kod przesyłania obrazu po stronie firmware został wewnętrznie przemianowany z obsługi zrzutów ekranu na obsługę UV Studio. Kompilacje włączające opcjonalny most dziennika RX/TX UV Studio mogą także przesyłać ostatnie wpisy dziennika RF do zgodnych narzędzi przeglądarkowych.

Zob. [Zaawansowane funkcje](./Advanced-features#k5-viewer).

## v5.6.0

Zmiany te są oparte na zmianach post- `v5.5.0` w `feature_update_v5`.

### Wygaszacz ekranu SetSav

Buduje z obsługą wygaszacza ekranu dodaj menu `SetSav`.

Dostępne tryby:

* `OFF`: brak wygaszacza ekranu
* `LOGO`: pokaż zapisane logo boot jako bezczynny ekran
* `LOGO+`: wyświetlić zapisane logo boot z efektem przewijania
* `MATRIX`: pokazać matrix-styl animowany bezczynny ekran

`SetSav` jest powiązany z czasem podświetlenia. Może wyświetlać na głównym ekranie i ekranie FM, gdy radio jest bezczynne, i jest zawieszone podczas RX, TX, PTT, BEAM i aktywnego skanowania FM.

Zob. [działanie radiowe](./Radio-operation#screen-saver-and-backlight-timeout) i [Menu](./Menu#main-menu).

Ponieważ `SetSav` jest wstawiany przed ukrytym menu, indeksy hidden- menu przesuwają się o jeden w `v5.6.0`: `F Lock` zaczyna się na `72` zamiast `71`.

### Name

Kiedy `POnMsg = LOGO`, tryb startowy logo może nadal zachować normalne zachowanie sygnału.

Zob. [Menu](./Menu#main-menu) i [UV Studio](./UV-Studio#boot-logo).

### Wskaźnik skanowania RSSI

Fast scan building może wyświetlać mały splot RSSI podczas skanowania. Daje kompaktowy widok ostatnich próbek RSSI tak silne kandydatów wyróżniają się wizualnie podczas skanowania jest uruchomiony.

Zob. [Skanowanie](./Scanning#scan-indicators-and-detection).

### Detekcja poddźwiękowa w zakresie skanowania

`ScnRng` może wykrywać CTCSS / DCS podczas zatrzymywania na odebranym sygnale. Wykryty kod poddźwiękowy jest wyświetlany w skanowaniu UI, gdy jest dostępny.

Zob. [Skanowanie](./Scanning#scan-indicators-and-detection).

### Kopia częstotliwości UI

Skaner częstotliwości `F+4` oddziela teraz stan wyszukiwania i wynik:

* `Search Freq`
* `Search Tone`
* `Scan Complete`
* `Scan Failed`
* wykryte szczegóły `Freq:` i `Tone:`

Zob. [Skanowanie](./Scanning#frequency-copy-and-dcs--ctcss-scanning).

### UV Studio i aktualizacje zrzutu ekranu

Ramki wygaszacza ekranu są synchronizowane z UV Studio, a obsługa zrzutu ekranu została zoptymalizowana, aby zmniejszyć wykorzystanie pamięci RAM i uniknąć stęchłych fragmentów.

Zob. [Zaawansowane funkcje](./Advanced-features#k5-viewer).

### Zapasy i rafinowanie

Wydanie to zawierało również kilka poprawek zachowania i udoskonaleń UI:

* bandscope / zaokrąglanie częstotliwości widma dla etapów `8.33 kHz`
* AM- to- FM dual- watch RX rekonfiguracji
* Położenie ikony blokady VFO podczas skanowania
* Oszczędność ekranu obudzenie / senny krawędź przypadki
* pustym manual- podświetlenie ikona po wyłączeniu światła ręcznego

## v5.5.0

### Silnik szybszego skanowania

Bieżące budynki mogą używać nowszego silnika skanującego `FAST` do skanowania pamięci i `ScnRng`.

Menu `SetScn` wybiera pomiędzy:

* `NORMAL`: konserwatywna ścieżka skanowania
* `FAST`: szybsza ścieżka, która sprawdza kanały lub zakresy z RSSI przed wykonaniem pełnej konfiguracji odbioru

W korzystnych warunkach `ScnRng` w trybie `FAST` może skanować wokół częstotliwości `150+` na sekundę.

Zob. [Skanowanie](./Scanning#scan-engine-mode-normal-vs-fast) i [Menu](./Menu#main-menu).

### Tymczasowe wyłączenie zakresu skanowania

Gdy skanowanie `ScnRng` zatrzyma się na odbieranej częstotliwości, przytrzymaj `MENU`, aby wykluczyć tę częstotliwość z bieżącego zakresu skanowania.

To zostało wprowadzone z `32` szczeliny w `v5.5.0`; aktualne post- `v5.6.1` buduje pozwalają `64` tymczasowe wyłączenia. Wyłączenia te są usuwane po ponownym uruchomieniu radia lub po zmianie tożsamości zakresu.

Zob. [Skanowanie](./Scanning#excluding-frequencies-in-scnrng).

### Tryb transferu BEAM

Kompilacje z obsługą BEAM mogą wysłać bieżącą konfigurację VFO lub kanału pamięci do innego radia albo odebrać pakiet BEAM i zapisać go w pierwszym wolnym kanale pamięci.

BEAM jest otwierany za pomocą programowalnego skrótu.

Zob. [Zaawansowane funkcje](./Advanced-features#beam-transfer-mode) i [Funkcje przycisku](./Button-functions#beam-action).

### Własne logo startowe

Kompilacje z obsługą logo mogą podczas uruchamiania wyświetlać własne monochromatyczne logo `128x64`.

Wyślij lub pobierz logo za pomocą UV Studio, a następnie wybierz `LOGO` w menu `POnMsg`.

Zob. [UV Studio](./UV-Studio#boot-logo), [Menu](./Menu#main-menu) i [Rozwiązywanie problemów](./Troubleshooting#my-custom-boot-logo-does-not-show).

### Ulepszenia wyświetlacza DCS / CTCSS

Menu `RxDCS`, `TxDCS`, `RxCTCS` i `TxCTCS` pokazują teraz zarówno wybraną pozycję wejścia, jak i homogenizowany indeks, kiedy istnieje.

Ułatwia to rozróżnienie normalnej pozycji listy, wpisów z homologacją PMR446, dodatkowych dźwięków i odwróconych wpisów DCS.

Zob. [Menu](./Menu#main-menu).

### Edycja nazw kanałów

Edycja `ChName` została poprawiona dzięki wielopunktowemu wejściu, przełączeniu / niskiemu przełączeniu, bezpośredniemu wejściu liczbowym z długimi prasami klawiszowymi oraz jaśniejszemu zachowaniu `EXIT`.

Zob. [Menu](./Menu#main-menu).

### Wytrzymałość analizatora widma

Analizator widma zapisuje teraz więcej ustawień podczas opuszczania ekranu wyszukiwania za pomocą `EXIT`, w tym tryb wyzwalania, automatyczny profil wrażliwości, ręczną skalę i poziom wyzwalania.

Uruchomienie analizatora z `ScnRng` nie nadpisuje już zapisanego kroku skanowania lub preferencji liczenia barów.

Zob. [Analizator widma](./Spectrum-analyzer#saving-settings-on-exit).

### Sysinf i buduj informacje

`SysInf` jest teraz paginowany w obecnych budynkach. W zależności od opcji budowania, może pokazywać tożsamość, datę / czas budowy, identyfikator commit, informacje o baterii, wykorzystanie pamięci i łącza projektu QR- code.

Zob. [Menu](./Menu#main-menu).

### Zakres ustawień kopii powietrza

Transfery Air Copy `Settings` obejmują teraz obszar VFO używany przez funkcje takie jak `ScnRng`, tak więc częstotliwości graniczne zakresu skanowania są replikowane podczas kopiowania ustawień.

Zob. [AirCopy](./AirCopy).

## Najnowsze v5.x zmiany również warto wiedzieć

Następujące zmiany wylądowały na krótko przed `v5.5.0` i są udokumentowane w wiki, ponieważ wpływają na codzienne stosowanie:

* `SetRxA` wybiera różne profile audio RX dla `FM` i `AM`; w `AM` może przełączać się między `SHARP`, `STOCK` i `OPEN`.
* Skanowanie list obsługuje krótkie nazwy, a skanowanie pamięci może przełączać się pomiędzy poprawnymi niepustymi listami podczas skanowania.
* `SysInf`, radio radiowe FM i interfejs do analizy widma zostały udoskonalone w ostatnich budynkach.
* Ukryte menu `SetNav` pozwala na taką samą dokumentację dla stylów nawigacji `UV-K1` i `UV-K5 V3`.

Zob. [Menu](./Menu), [Skanowanie](./Scanning), [Radio operation](./Radio-operation) oraz [FM transmitujący odbiornik radiowy](./FM-broadcast-radio-receiver).

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [UV Studio](./UV-Studio)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Aplikacje nakładane](./Overlay-applications)
* [Skanowanie](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Funkcje przycisku](./Button-functions)
* [Zaawansowane funkcje](./Advanced-features)
* [Analizator widma](./Spectrum-analyzer)
* [Menu](./Menu)
