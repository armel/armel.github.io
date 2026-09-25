# UV Studio

UV Studio jest przeglądarkowym towarzyszem kompatybilnego oprogramowania firmowego F4HWN na UV-K1 i UV-K5 V3. Łączy funkcje wyświetlania na żywo i zdalnej klawiatury, instalacji oprogramowania firmowego, konserwacji radiowej, zarządzania Multiboot i zarządzania aplikacją Labs w jednym interfejsie.

Otwórz tutaj:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

UV Studio komunikuje się bezpośrednio z radiem poprzez `Web Serial` API. Dane radiowe są obsługiwane lokalnie w przeglądarce; nie jest wymagana instalacja aplikacji, konto serwera lub wysyłanie w chmurze.

> [!IMPORTANT]
> UV Studio nie jest ograniczony do edycji Fusion. Jego ogólne narzędzia działają z kompatybilnymi edycjami F4HWN, podczas gdy niektóre widoki wymagają określonej zdolności oprogramowania firmowego. W szczególności, zarządzanie overlay- app i zewnętrzne narzędzia Flash są dla Labs.

## Status wersji

UV Studio `v1.6.0` towarzyszy stabilnej firmware `v6.1.0`. Oprócz katalogu oprogramowania firmowego v6, zarządzania szczelinami Multiboot oraz katalogu formacji overlay- app dodaje:

* zreorganizowany interfejs, który grupuje tworzenie kopii zapasowych / przywracanie i pobieranie / wysyłanie logo boot-
* pełna kopia zapasowa i przywracanie `2 MiB` zewnętrznej pamięci Flash dla zgodnych kompilacji Labs
* Porównanie i weryfikacja CRC32 dla szybszej i bezpieczniejszej odbudowy zewnętrznej - Flash
* z przewodnikiem renowacja przebudowanej fabryki zewnętrznej Flash, po której następuje prawidłowe oprogramowanie dla UV-K1 lub UV-K5 V3

## Wymagania

Potrzebujesz:

* kompatybilny Quansheng UV-K1 lub UV-K5 V3 z PY32F071 MCU
* z możliwością podłączenia `USB-C` lub kompatybilnym kablem Baofeng / Kenwood- stylem duble- jack USB- to-Serial
* przeglądarka stacjonarna z obsługą `Web Serial`, taka jak Chrome, Brave, Edge, Opera lub Firefox 151 +

Ściągnięta kopia całego drzewa źródłowego UV Studio może być również otwarta lokalnie. Jest to aplikacja statyczna HTML / CSS / JavaScript i nie wymaga etapu budowy ani lokalnego serwera WWW.

## Podsumowanie cech i trybu radioelektronicznego

| Narzędzie | Wymagany stan radiowy | Wymagania dotyczące oprogramowania firmowego |
| --- | --- | --- |
| Przeglądarka na żywo i dziennik RF na żywo | normalne rozpoczęcie | kompatybilne obsługa dziennika przeglądarki / RF |
| Program Flash Firmware | Tryb `DFU` / flash | Ładowarka UV-K1 lub UV-K5 V3 |
| Kalibracja, Logo Boot, eksport dziennika RF | normalne rozpoczęcie | kompatybilne oprogramowanie firmowe F4HWN |
| Sloty firmware | normalne rozpoczęcie | Wielofunkcyjny `v6.0.0` lub nowszy |
| Aplikacje | normalne rozpoczęcie | Labs z obsługą overlay- app |
| Zewnętrzne backup / przywracanie Flash | normalne rozpoczęcie | `v6.1.0` Labs z dostępem zewnętrznym |
| Przywracanie oprogramowania fabrycznego | normalne uruchomienie Labs, a następnie DFU, gdy prodress | `v6.1.0` Labs dla pierwszego etapu |

Aby wejść w tryb `DFU`, należy wyłączyć radio, przytrzymać `PTT` i włączyć go w trakcie utrzymywania `PTT`. Uwolnić `PTT`, a następnie połączyć lub ponownie połączyć kabel danych. Klawisz boczny nie jest wymagany.

## Co UV Studio może zrobić

UV Studio zapewnia:

* wyświetlacz radiowy `128x64` w czasie rzeczywistym
* wirtualne klawiatury UV-K1 i UV- K5 z krótką i długą prasą
* odłączalne okno klawiatury i sterowanie ponownym uruchomieniem radia
* screeny radiowe i regulowane renderowanie LCD
* aktywność live RF, znaczniki sesji, filtry i analityka
* wywóz przechowywanej aktywności dziennika RF do CSV
* instalacja firmware z oficjalnego katalogu, budowy rozwoju toczenia lub lokalnego pliku `.bin`
* Bezpośrednie pobranie pasującego sterownika CHIRP dla stabilnego oprogramowania firmowego F4HWN
* instalacja, walidacja, nazewnictwo, usuwanie i konfiguracja reset gniazd oprogramowania firmowego Multiboot
* instalacja i usuwanie aplikacji Labs nakładanych z oryginalnego katalogu urzędowego lub lokalnych plików `.app`
* tworzenie kopii zapasowej i przywracanie kalibracji
* niestandardowe boot- logo pobierania, podglądu, konwersji i wysyłania
* zewnętrzne-Flash backup, przywracanie i sterowanie oprogramowania w `v1.6.0`
* lekkie i ciemne tematy i tłumaczenia w dziesięciu językach

UV Studio jest właścicielem połączenia szeregowego na całym świecie. Uniemożliwia to korzystanie z portu w tym samym czasie i utrzymuje lub przywraca połączenie podczas przełączania kompatybilnych narzędzi w trybie normalnym.

## Przeglądarka na żywo

Widz Live odzwierciedla wyświetlacz radiowy i zapewnia pasujące wirtualne klawiatury UV-K1 i UV- K5.

1. Uruchom radio normalnie.
1. Podłącz radio do komputera.
1. Otwórz `Live Viewer`, wybierz odpowiednią klawiaturę i kliknij `Connect`.
1. Wybierz port szeregowy.
1. Użyj wirtualnej klawiatury lub klawiatury komputera.
1. Kliknij `Disconnect` przed odłączeniem kabla.

Pasek narzędzi może ponownie uruchomić podłączone radio, uchwycić zrzut ekranu, zmienić symulowany wygląd LCD i odłączyć klawiaturę do zmiennego okna. Panel built- in `Help` zawiera listę wszystkich skrótów klawiszowych; wspólne sterowanie obejmuje klawisze strzałek do nawigacji, cyfry do krótkich pras, `Shift` plus klucz do długiej prasy, `Enter` lub `M` dla menu, `Esc` dla wyjścia, i `F1` / `F2` dla przycisków bocznych.

> [!IMPORTANT]
> Kontrola przeglądania nie może rozpocząć transmisji. Wyświetlony `PTT` jest niedostępny i UV Studio nie jest narzędziem odległy-TX.

## Dziennik RF

Kiedy uruchomione oprogramowanie obsługuje dziennik RF i most Viewer, UV Studio wyświetla na żywo sesje RX i TX z:

* informacje dotyczące kierunku, częstotliwości i kanału
* Czas trwania sesji
* Poziom sygnału RX lub moc TX
* napięcie akumulatora
* Filtry `ALL`, `RX` i `TX`
* aktywności, czasu antenowego, częstotliwości, sesji i analizy baterii

Oddzielne narzędzie `Export RF Log` odczytuje do najnowszych działań `512` przechowywane i power- na markery i tworzy `rf-log.csv`. Utrzymać radio w normalnym trybie. Jeśli nazwy kanału lub informacje o konfigurowaniu- bank są błędne, uaktualnij oprogramowanie zawierające najnowsze poprawki v6 RF Log.

## Program Flash Firmware

> [!WARNING]
> Przebłysk niekompatybilnego lub uszkodzonego obrazu może spowodować, że radio stanie się bezużyteczne. Potwierdzić kompatybilność modelu i bootloadera, zrobić kopię zapasową kalibracji i utrzymać kabel podłączony do końca pracy.

Katalog firmware grupuje aktualne stabilne F4HWN buduje według edycji, zawiera toczenie Fusion development build, a także może oferować kompatybilne obrazy zapasowe. Lokalny plik `.bin` pozostaje dostępny, gdy katalog nie może być wczytany lub przy użyciu własnej budowy.

1. Uruchom radio w trybie `DFU`.
1. Otwórz `Flash Firmware`.
1. Wybierz właściwy wpis katalogu lub wybierz kompatybilny lokalny plik `.bin`.
1. Kliknij `Flash firmware` i wybierz port szeregowy.
1. Poczekaj na zakończenie operacji i ponowne uruchomienie radia.

Po wybraniu stabilnej wersji F4HWN, UV Studio oferuje wspólny sterownik CHIRP opublikowany dla tej wersji firmware. Rozwój i budowa taboru nie wykorzystują automatycznego połączenia sterownika.

## Sloty firmware

Wszystkie cztery oficjalne wydania `v6.0.0` wspierają Multiboot. UV Studio zarządza szczelinami `1` do `4` w zewnętrznym Flash. Chroniona kopia zapasowa `Main` jest utrzymywana przez firmware i celowo nie jest narażona jako slot do zapisu.

Aby zainstalować kolejne wydanie:

1. Uruchom nadajniki wielozadaniowe normalnie.
1. Otwórz `Firmware Slots` i odśwież stół.
1. Wybierz kompatybilny stabilny obraz `v6.x` F4HWN z katalogu lub wczytaj lokalny plik `.bin`.
1. Wybierz slot `1` do `4` i opcjonalnie wprowadź nazwę ekranu do znaków `15`.
1. Wybierz `Write to slot`, potwierdź i czekaj na usunięcie, napisz i pełną weryfikację CRC.

Katalog slotów celowo wyłącza oprogramowanie firmowe, oprogramowanie firmowe v5 i obraz rozwoju toczenia, ponieważ te wpisy nie są gwarantowane, aby powrócić do selektora Multiboot.

Każde zaludnione gniazdo ma dwie niezależne czynności utrzymania:

* `Erase FW` usuwa zapisany obraz firmware, ale nie resetuje banku konfiguracji gniazda.
* `Reset config` usuwa kanały i ustawienia banku związane z tym gniazdem, ale pozostawia zainstalowany obraz oprogramowania firmowego.

Zobacz [Multiboot i Multiconfig](./Multiboot-and-Multiconfig) dla `Main`, wybór gniazda, banki konfiguracyjne, `SetCfg` i zachowanie odzyskiwania.

## Aplikacje (Labs)

Widok `Apps` zarządza ośmioma eksperymentalnymi szczelinami aplikacji overlay- app w wydaniu Labs.

1. Uruchom Labs normalnie i otwórz `Apps`.
1. Odśwież stół app-slot.
1. Wybierz wersję firmware, a następnie oficjalną aplikację ze swojego katalogu modyfikowanego; alternatywnie, wczytaj lokalny plik `.app`.
1. Wybierz docelowe miejsce i wybierz `Install app`.
1. W radiu użyj `F + 7`, wybierz aplikację i naciśnij `M`.

UV Studio pokazuje nazwę aplikacji, wersję, rozmiar i status walidacji. Usuwanie aplikacji usuwa tylko to gniazdo aplikacji.

> [!IMPORTANT]
> Aplikacje Overlay są podłączone do firmware ABI, poziomu API, adresu RAM i możliwości. Wybierz wersję katalogu aplikacji pasującą do zainstalowanego oprogramowania firmowego. W razie potrzeby ponownie zainstaluj kompatybilne aplikacje po aktualizacji oprogramowania firmowego.

Patrz [Overlay apps](./Overlay-apps) dla kompatybilności ładowarki i [Overlay applications](./Overlay-applications) dla celu i sterowania każdej aplikacji.

## Wybór odpowiedniej kopii zapasowej lub kopii

Operacje te chronią lub kopiują różne części radia i nie są wymienne:

| Działanie | Co zawiera lek | Najlepsze wykorzystanie | Zachowanie kalibracyjne |
| --- | --- | --- | --- |
| UV Studio `Calibration` | kalibracja RF i sprzętu właściwa dla urządzenia | niezbędna kopia bezpieczeństwa dla jednego radia | bezpośrednio odczytuje lub przywraca kalibrację; używać wyłącznie z tym samym radiem |
| Obraz radiowy CHIRP | kanały plus ustawienia rozumiane przez tę wersję sterownika | edycja i migracja wspomnień / ustawień | nie zastępują kopii zapasowej kalibracji |
| UV Studio `External Flash` | surowy obraz zewnętrzny `2 MiB`-Flash, w tym konfiguracje, szczeliny, aplikacje, logi, logo i dane kalibracyjne w pliku kopii zapasowej | kompletne tworzenie kopii zapasowej i odzyskiwanie plików | renowacja celowo zachowuje kalibrację już obecną w radiu docelowym |
| Pamięć AirCopy lub `Settings` | wybrane banki pamięci lub kompatybilne ustawienia radiowe | synchronizacja wybranych danych pomiędzy dwoma radiami | nie kopiuje kalibracji sprzętowej |
| AirCopy `Flash 2M` | zewnętrzne Flash sklonowane bezpośrednio nad kablem | co inne radio wspólne zewnętrzne-Flash stan dopasować źródło | wyłącza i zachowuje sektor kalibracji radiotelefonu docelowego |

Dla rutynowych aktualizacji, zrobić co najmniej kopię zapasową kalibracji i obraz CHIRP. Użyj pełnej kopii zapasowej external- Flash przed eksperymentem z Multiboot, szczeliny aplikacji, odzyskiwania fabrycznego lub low-level pamięci masowej.

## Zewnętrzne backup Flash i przywracanie (v1.6.0)

Narzędzie to wymaga zewnętrznych poleceń Flash dostarczanych przez `v6.1.0` Labs. Nie jest dostępny w `v6.0.0`.

Widok `External Flash` odczytuje lub przywraca kompletny `2 MiB` PY25Q16 zewnętrzny SPI Flash przez adres fizyczny. Obejmuje to banki konfiguracyjne, szczeliny firmware, szczeliny aplikacji, dziennik RF, stan Multiboot, logo boot i inne wspólne dane.

### Cofnij

1. Uruchom kompatybilną budowę Labs normalnie.
1. Otwórz `External Flash` i wybierz `Back up`.
1. Kliknij `Read external flash` i wybierz port szeregowy.
1. Poczekać, aż cały chip zostanie przeczytany; to może zająć kilka minut.
1. Pobierz `external-flash.bin`.

Backup jest dokładnie `2 MiB`. Przechowywać w bezpiecznym miejscu: zawiera konfigurację radiową i dane kalibracyjne specyficzne dla urządzenia.

### Przywróć

1. Uruchom kompatybilną budowę Labs normalnie.
1. Otwórz `External Flash` i wybierz `Restore`.
1. Wybierz pełną kopię zapasową `2 MiB` stworzoną przez to narzędzie.
1. Kliknij `Restore external flash` i potwierdzić destrukcyjną operację.
1. Utrzymuj zasilanie radiowe i połączenia aż do zakończenia weryfikacji i ponownego uruchomienia radia.

UV Studio odmawia plików, które nie są dokładnie `2 MiB`. Działa on w poszczególnych sektorach w jednostkach `4 KiB` i nigdy nie usuwa lub nie pisze specyficznego dla danego urządzenia sektora kalibracji. Z obecnym firmware porównuje wartości CRC32, pomija sektory, które są już identyczne, pisze tylko pozostałe sektory i weryfikuje każdy z nich. Powraca do bezpośredniego porównania bajtów, gdy komenda CRC jest niedostępna.

> [!WARNING]
> Przywracanie zastępuje prawie wszystkie zewnętrzne treści Flash, w tym ustawienia, logi, logo, aplikacje, szczeliny oprogramowania firmowego i stan Multiboot. Sektor kalibracji radia odbiorczego jest zachowany, więc pełna kopia zapasowa z jednego radia nie jest metodą kopiowania kalibracji tego radia do innego.

Aby bezpośrednio skopiować zewnętrzną pamięć Flash między dwiema radiostacjami, użyj oddzielnej funkcji kablowej `Flash 2M` opisanej w sekcji [AirCopy](./AirCopy#external-flash-cloning).

## Rekonstrukcja oprogramowania fabrycznego (v1.6.0)

Widok `Factory reset` jest dwustopniowym odzyskiwaniem z przewodnikiem do zwracania UV-K1 lub UV-K5 V3 do pasującego oprogramowania Quansheng:

1. Uruchom `v6.1.0` Labs normalnie.
1. Otwórz `Factory reset` i wybierz dokładny model: `UV-K1` lub `UV-K5 V3`.
1. Potwierdź ostrzeżenie. UV Studio ładuje pasującą odtworzoną fabrykę external- Flash obrazu i firmware stock, następnie weryfikuje ich rozmiar i SHA- 256 przed napisaniem czegokolwiek.
1. UV Studio przywraca i weryfikuje zewnętrzny błysk, zachowując jednocześnie specyficzny sektor kalibracji.
1. Po wywołaniu należy wyłączyć radio i wprowadzić tryb `DFU`. Nie należy go rozpoczynać normalnie pomiędzy dwoma etapami.
1. Wybierz `Continue in DFU`; UV Studio automatycznie instaluje pasujące oprogramowanie firmowe.

Związane cele to UV-K1 `v7.03.01` i UV-K5 V3 `v7.00.11`.

> [!WARNING]
> To destrukcyjna odbudowa oprogramowania. Usuwa ustawienia F4HWN, stan Multiboot, szczeliny firmware, aplikacje nakładające, logi RF i własne logo. Zewnętrzny obraz jest zrekonstruowanym stanem fabrycznym, a nie nietkniętym fizycznym wysypiskiem. Wybierz poprawny model i nie przerywaj żadnego etapu.

## Kalibracja

Kalibracja jest specyficzna. Utwórz kopię zapasową przed eksperymentami firmware lub konserwacją na niskim poziomie i podaj nazwę pliku z modelem radiowym lub numerem seryjnym, aby kopie zapasowe nie były mieszane między urządzeniami.

Aby to poprzeć:

1. Uruchom radio normalnie.
1. Otwórz `Calibration` i wybierz `Back up`.
1. Kliknij `Read calibration data`.
1. Pobierz `calibration.dat`.

Aby go przywrócić:

1. Włącz to samo radio normalnie.
1. Otwórz `Calibration` i wybierz `Restore`.
1. Wybierz plik `calibration.dat`.
1. Kliknij `Restore calibration data` i czekaj na zakończenie.

> [!WARNING]
> Przywróć tylko kalibrację należącą do tego radia, chyba że w pełni zrozumiesz konsekwencje.

## Logo boot

Kompatybilne konstrukcje mogą używać własnego obrazu monochromatycznego `128x64` przy starcie lub jako wygaszacza ekranu.

Aby przesłać logo:

1. Uruchom radio normalnie.
1. Otwórz `Boot Logo` i wybierz `Upload`.
1. Wybierz obraz w formacie wspólnym, takim jak PNG, JPEG lub BMP.
1. Dostosuj `Threshold` i `Invert colors` podczas sprawdzania podglądu.
1. Wybierz `Upload logo to radio`.
1. Wybierz `LOGO` w `POnMsg` lub kompatybilny tryb logo w `SetSav`.

Karta `Download` odczytuje bieżący obraz, podgląda go i zapisuje jako `logo.png`.

## Rozwiązywanie problemów

Jeżeli UV Studio nie może komunikować się z radiem:

* potwierdzenie, że wybrana operacja korzysta z prawidłowego trybu uruchamiania normalnego lub DFU
* odłącz kabel, uruchom ponownie radio w tym trybie, podłącz ponownie i wybierz port szeregowy ponownie
* zamknij inne programy lub zakładki przeglądarki, które mogą posiadać port szeregowy
* sprawdzić, czy kabel przenosi dane i jest w pełni wstawiony
* używać wersji firmware i wersji, która ujawnia wymagane możliwości
* dla aplikacji Apps lub zewnętrznego Flash, sprawdź czy Labs działa raczej niż Fusion, FieldOps lub Transfer

Rozszerzalne protokoły `Console` i szczegóły operacji, które mogą pomóc w identyfikacji niewspieranego polecenia, timeout, błędu walidacji lub złego pliku.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Ostatnie zmiany](./Recent-changes)
* [Programowanie z CHIRP](./Programming-with-CHIRP)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Aplikacje nakładane](./Overlay-applications)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [Zaawansowane funkcje](./Advanced-features)
* [Rozwiązywanie problemów](./Troubleshooting)
