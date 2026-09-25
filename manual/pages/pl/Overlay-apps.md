# Nakładanie aplikacji

Aplikacje zastępcze to małe programy `.app` przechowywane w zewnętrznym Flashu i załadowane do dedykowanego miejsca pracy `4 KiB` RAM tylko po uruchomieniu. Pozwalają eksperymentalnej edycji `Labs` dodać narzędzia, tryby radiowe, demo wizualne i gry bez trwale dopasowywania każdej aplikacji do wewnętrznego Flash oprogramowania firmowego.

> [!WARNING]
> Aplikacje zastępcze są eksperymentalną funkcją `v6.0.0`. Obecnie tylko edycja `Labs` zawiera ładowarkę aplikacji. Aplikacje są powiązane z firmware ABI, API poziom, adres RAM i opcjonalne możliwości rezydenta; uaktualnić lub ponownie zainstalować aplikację, jeśli radio zgłasza błąd kompatybilności.

## Jak działa platforma

Radio zapewnia `8` zewnętrzne-Flash szczeliny aplikacji. Każde gniazdo zawiera nagłówek i kod aplikacji o wartości co najwyżej `4 KiB`. Przed uruchomieniem aplikacji, ładownik sprawdza:

* format pliku aplikacji / nagłówka i stan przypisany
* wymagany poziom ABI i minimalny poziom API
* rozmiar kodu i adres łącza RAM
* wymagane przez aplikację możliwości oprogramowania firmowego rezydenta
* CRC- 32 kodu po załadowaniu do pamięci RAM

Wewnętrzny program firmware Flash nigdy nie jest przepisywany po zainstalowaniu, uruchomieniu lub usunięciu aplikacji. Zła lub niekompatybilna aplikacja jest odrzucana czysto zamiast być wykonywana.

Obecny katalog zawiera jedenaście aplikacji: narzędzia radiowe `Broadcast FM`, `FoxHunt`, `Beacon` i `Beam`, a także `Breakout`, `Tetris`, `Cube3D`, `Plasma`, `Snake`, `Rapid Roll` i `Space Impact`. Opisy i elementy sterujące znajdują się w [spisie aplikacji](./Overlay-applications). Dostępność zależy od plików aplikacji przeznaczonych dla wybranej wersji firmware oraz funkcji wbudowanych w używaną wersję Labs.

## Instalowanie aplikacji za pomocą UV Studio

1. Uruchom radio normalnie z edycją `Labs`.
1. Podłącz go do przeglądarki pulpitu za pomocą obsługiwanego połączenia danych USB.
1. Otwórz [UV Studio](https://armel.github.io/uvstudio/) i wybierz `Apps` (`Labs only`).
1. Wybierz wersję oprogramowania firmowego i kompatybilną aplikację z oficjalnego katalogu lub wybierz lokalny plik `.app`.
1. Wybierz docelową pozycję aplikacji.
1. Wybierz `Install app` i czekaj na zakończenie pisania i weryfikacji.

UV Studio może odświeżyć tabelę szczelin, pokazać nazwę, wersję, rozmiar i status każdej aplikacji i usunąć aplikację bez dotykania reszty radia.

Szczeliny aplikacji są numerowane `1` do `8` w UV Studio i w wyrzutni on-radio `F + 7`.

## Uruchomienie aplikacji

1. Z normalnego ekranu radiowego naciśnij `F`, a następnie `7 VOX`.
1. Użyj `UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1, aby wybrać jeden z ośmiu wyświetlanych szczelin. Aktywny układ następuje po `SetNav`.
1. Naciśnij `M`, aby uruchomić wybraną aplikację.
1. Użyj sterowania pokazanego przez tę aplikację; w większości aplikacji `EXIT` powraca do wyrzutni aplikacji lub normalnego ekranu radiowego.

Puste szczeliny pozostają widoczne w wyrzutni. Wybrane gniazdo i pozycja przewijania są zapamiętywane do czasu ponownego uruchomienia radia. Wyrzutnia i kompatybilne aplikacje są lustrzane w UV Studio.

Niektóre aplikacje mogą również reklamować jedną z zwykłych programowalnych akcji: `FM RADIO`, `FOX HUNT`, `BEACON` lub `BEAM`. Gdy aplikacja dopasowująca jest zainstalowana i poprawna, ta akcja może uruchomić ją bezpośrednio z przypisanego klucza lub z bocznego znacznika akcji. Jeśli więcej niż jedna zainstalowana aplikacja reklamuje to samo działanie, używa się kompatybilnego gniazda o numerach losowych.

## Komunikaty o zgodności

| Wiadomość radiowa | Znaczenie / działanie |
| --- | --- |
| `UPDATE APP` | format aplikacji, ABI, rozmiar lub adres łącza jest starszy lub niekompatybilny; zainstaluj pasującą budowę aplikacji |
| `UPDATE FIRMWARE` | aplikacja wymaga nowszej aplikacji API; uaktualnia oprogramowanie firmowe Labs |
| `REINSTALL APP` | zapis jest niekompletny lub kod CRC jest zły; zainstalować ponownie plik `.app` |
| `NOT SUPPORTED` | aplikacja potrzebuje możliwości rezydenta, że ta budowa Labs nie zawiera |
| `NO APP` | zaznaczone gniazdo jest puste lub nie posiada poprawnego nagłówka aplikacji |

Po wyjściu z aplikacji, ładowarka przywraca wybrany VFO, odbiera / dual- watch tuning, obsługę podświetlenia i zewnętrzne Flash cache. Aplikacje, które modyfikują obsługiwane dane współdzielone, takie jak presety Broadcast FM lub dane kanału Beam, proszone są o to, aby oprogramowanie firmowe będące rezydentem zmieniło je po zaprzestaniu działania kodu nakładanego.

## Tworzenie aplikacji ze źródła

Deweloperzy mogą budować aplikacje obecne w repozytorium oprogramowania firmowego za pomocą:

```sh
./compile-app.sh
./compile-app.sh All
./compile-app.sh fm foxhunt
```

Generowane pliki `.app` są umieszczone w `build/Apps/`. Każda aplikacja jest połączona przy skonfigurowanym adresie nakładki firmware i zapakowana swoimi metadanymi i CRC. Przebuduj aplikacje, gdy ABI, API, wymagane możliwości lub nałóż zmiany adresu.

## Odpowiednie strony

* [Aplikacje nakładane](./Overlay-applications)
* [UV Studio](./UV-Studio#apps-labs)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [Funkcje przycisku](./Button-functions)
* [Ostatnie zmiany](./Recent-changes)
* [Zaawansowane funkcje](./Advanced-features)
