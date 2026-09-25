# Skanowanie

Ta strona grupuje wszystkie funkcje związane ze skanowaniem: skanowanie częstotliwości, skanowanie pamięci, listy skanów, `ScnRng`, kopiowanie częstotliwości oraz skanowanie DCS / CTCSS.

W przypadku operacji VFO / kanału dzień-do-dnia, patrz [operacja radiowa](./Radio-operation). Jeżeli chodzi o wykorzystanie widma, zob. [Analizator widma](./Spectrum-analyzer).

## Na tej stronie

* [Skanowanie częstotliwości](#frequency-scanning)
* [Skanowanie kanałów pamięci](#memory-channels-scanning)
* [Lista skanów MIX](#mix-scan-list-v610)
* [Tryb skanowania silnika: NORMAL vs FAST](#scan-engine-mode-normal-vs-fast)
* [Skanowanie wskaźników i wykrywanie](#scan-indicators-and-detection)
* [Kopia częstotliwości i skanowanie DCS / CTCSS](#frequency-copy-and-dcs--ctcss-scanning)
* [Odpowiednie strony](#related-pages)

> [!TIP]
> Jeśli skanowanie pamięci wydaje się zepsute, najczęstszą przyczyną jest pusta lista aktywnych skanów. Zobacz [Rozwiązywanie problemów](./Troubleshooting) do szybkich kontroli.

## Skanowanie częstotliwości

Aby rozpocząć skanowanie częstotliwości, przełącz VFO na tryb częstotliwości. Ustaw częstotliwość startową. Ustaw stopień częstotliwości (menu `Step`). Zacznij skanować za pomocą funkcji [niestandardowy przycisk skanowania](./Button-functions#custom-button-functions) lub przez długie naciśnięcie przycisku `* Scan`.

### Funkcja zakresu częstotliwości skanowania

* przełączanie na tryb częstotliwości
* ustawić górne i dolne częstotliwości VFO na granicach zakresu skanowania
* Długoprasa `5 NOAA`; powinna pojawić się etykieta `ScnRng`
* rozpocząć skanowanie naciskając `* Scan`
* radio skanuje pomiędzy wybranymi granicami
* przytrzymaj `5 NOAA` lub `EXIT`, albo przełącz VFO, aby wyjść z trybu `ScnRng`

![Scan Range](https://github.com/user-attachments/assets/0f6edd44-3086-4f49-8340-8480486e70a5)

Funkcja `ScnRng` jest również obsługiwana przez analizator widma. Jeśli już włączyłeś `ScnRng`, wystarczy uruchomić [analizator widma](./Spectrum-analyzer).

Jeśli używasz [AirCopy](./AirCopy) i przesyłasz `Settings`, jest wliczone pole VFO. Kopiuje to również aktualne częstotliwości graniczne `ScnRng` w radiu docelowym.

### Z wyłączeniem częstotliwości w ScnRng

Gdy skanowanie `ScnRng` zatrzyma się na odbieranej częstotliwości, przytrzymaj `MENU`, aby wykluczyć tę częstotliwość z bieżącego zakresu skanowania.

Można wykluczyć do * * 64 * * częstotliwość skanowania. Lista jest okrągła: po 64 wyłączeniach dodanie innego zastępuje najstarsze zapisane wyłączenie.

Wyłączenia te są tymczasowe. Są przechowywane tylko do aktywnej konfiguracji `ScnRng` i nie są zapisywane do pamięci. Są one oczyszczone, jeśli radio jest ponownie uruchomione, i są również oczyszczone, gdy zakres tożsamość zmienia: uruchomić częstotliwość, zatrzymać częstotliwość, lub krok skanowania.

## Skanowanie kanałów pamięci

Skanowanie pamięci pozwala skanowi radiowemu zapisać kanały pamięci zamiast przejść przez częstotliwości.

Aby go użyć, przełącz VFO na * * tryb pamięci * *, a następnie zacznij skanować zaprogramowanym kluczem skanowania lub naciskając na `* Scan`.

### Skanuj listy

Radio dostarcza * * 24 listy skanów * *. Każdy kanał pamięci może być przypisany do:

* `OFF`: kanał jest wyłączony z list skanowania
* `1` do `24`: kanał należy do jednej konkretnej listy skanów
* `ALL`: kanał jest zawarty we wszystkich listach skanowania

Kanał pamięci może należeć tylko do jednego z tych stanów na raz.

`MIX` jest aktywnym trybem skanowania, a nie kolejnym przyporządkowaniem kanału. Łączy on kilka list z numerami; patrz [lista skanów MIX](#mix-scan-list-v610).

### Przypisanie kanału do listy skanów

Aby zmienić przypisanie do listy skanów bieżącego kanału pamięci:

* Otwórz menu `ScList`
* albo przytrzymaj `5 NOAA`, aby użyć szybkiego skrótu przypisania

Szybki skrót prowadzi kanał przez:

* `OFF`
* `1` do `24`
* `ALL`

Bieżące przypisanie jest pokazane po prawej stronie nazwy kanału.

### Nazwa Listy skanowania

Lista skanów może zawierać krótkie nazwy.

Gdy lista ma nazwę, radio pokazuje, że * * 3-znakowa nazwa * * zamiast numerycznego numeru listy tam, gdzie to możliwe:

* w skanowanych wskaźnikach stanu
* w menu wyboru listy
* w wyświetlaczu listy-przydziału kanału

Jeśli lista nie ma nazwy, radio wyświetla zamiast niej numer listy.

### Aktywna lista skanów

Skanowanie pamięci zawsze używa jednej * * aktywnej listy skanów * *.

Aktualnie aktywna lista jest wyświetlana w lewym górnym rogu ekranu podczas skanowania:

* `01` do `24` dla listy ponumerowanej
* `MIX` dla zapisanej kombinacji wybranych list, zaczynając od `v6.1.0`
* `ALL` dla wszystkich kanałów wymienionych w wykazie

Jeśli wybrana lista ma nazwę, zamiast numeru wyświetlana jest ta krótka nazwa.

Jeśli wybrana lista jest pusta lub nieprawidłowa, radio automatycznie przełącza się na następną poprawną, niepustą listę.

### Uruchomienie skanowania pamięci

Po przypisaniu kanałów do list, rozpocząć skanowanie pamięci przez:

* za pomocą klucza przypisanego do funkcji skanowania
* lub `* Scan` o długim ciśnieniu

Radio skanuje kanały pamięci należące do aktualnie aktywnej listy skanów.

### Zmiana listy skanowania podczas skanowania

Aktywna lista skanów może zostać zmieniona bez zatrzymywania skanowania.

* Długoprasa `* Scan`: przełącz na kolejną poprawną listę skanów bez pustych
* `F + navigation key`: przeglądanie list skanowania podczas skanowania (`UP` / `DOWN` na UV- K5, `LEFT` / `RIGHT` na UV-K1)
* wejście bezpośrednie klawiatury:
  * `01` do `24`: wybierz tę listę skanów bezpośrednio
  * `25`: wybierz `MIX`, zaczynając od `v6.1.0`
  * `00`: wybierz `ALL`

Jeśli żądana lista jest pusta, radio piszczy i skacze do następnej poprawnej, niepustej listy.

Kiedy skanowanie pamięci włącza listę, nazwa listy tymczasowo zastępuje wskaźnik postępu. W `v5.9.0`, wznowienie skanowania jest utrzymywane podczas gdy nazwa jest rzeczywiście widoczne, więc ukryty wskaźnik i obecna pozycja skanowania nie może dryfować od siebie, a następnie skakać do przodu, gdy wskaźnik powróci.

Ten krótki uchwyt dotyczy tylko skanowania pamięci. Częstotliwość skanowania i `ScnRng` mogą nadal uzbroić to samo odliczanie nakładki poprzez swoje sterowniki, ale nie wyświetlają nazwy listy skanów i dlatego kontynuować bez niewyjaśnionej pauzy.

### Lista skanów MIX (v6.1.0)

`MIX` skanuje kilka ponumerowanych list jako jeden zestaw łączony bez zmiany listy przypisanej jakiemukolwiek kanałowi. Kanał jest włączony, gdy:

* należy do jednej z list oznaczonych w edytorze `MIX`, lub
* jego przydział kanału jest `ALL`

Kanały przypisane do `OFF` pozostają wyłączone. Kanał nadal posiada tylko jedno przypisanie (`OFF`, `01` do `24` lub `ALL`); `MIX` przechowuje oddzielną maskę wyboru opisującą, które ponumerowane listy powinny być połączone.

Aby skonfigurować `MIX`:

1. Otwórz `ScList`.
1. Wybierz `MIX` i naciśnij `M`.
1. Użyj klawiszy nawigacyjnych, aby przejść przez listy `01` do `24`, lub wprowadzić dwucyfrowy numer listy, aby przejść bezpośrednio do niego.
1. Naciśnij `M`, aby przełączyć zaznaczoną listę `ON` lub wyłączyć.
1. Naciśnij `EXIT`, aby zapisać zaznaczenie i uczynić `MIX` aktywnym trybem skanowania.

Edytor pokazuje liczbę wybranych list jako `NN/24`. Co najmniej jedna lista musi pozostać włączona; próba wyłączenia ostatniej wybranej listy powoduje sygnał błędu.

Normalna sekwencja skanu staje się `01` przez `24`, następnie `MIX`, a następnie `ALL`. Podczas aktywnego skanowania pamięci wpisz `25`, aby wybrać `MIX` bezpośrednio lub `00`, aby wybrać `ALL`. Jeśli otrzymany `MIX` nie zawiera poprawnego kanału scannable, sygnał radiowy piszczy i przechodzi do następnego poprawnego trybu.

Zapisana maska `MIX` jest częścią ustawień radiowych i jest włączona do transmisji [AirCopy](./AirCopy) `Settings`.

### Zmiana kierunku skanowania

Podczas skanowania naciśnij przycisk nawigacyjny:

* `UP` / `DOWN` na UV- K5
* `LEFT` / `RIGHT` na UV-K1

Odwraca to kierunek używany do przechodzenia przez kanały pamięci na aktualnej liście skanów.

### Skanowanie priorytetowe

Radio obsługuje dwa kanały priorytetowe:

* `PriCh1`
* `PriCh2`

Są one skonfigurowane w menu i kontrolowane przez ustawienie `ScPri`.

#### Jak to działa?

Po włączeniu skanowania priorytetowego, radio nie skanuje po prostu kanałów w kolejności listy. Zamiast tego, wielokrotnie wprowadza kanały priorytetowe do cyklu skanowania.

Sekwencja skanowania staje się:

1. `PriCh1`
1. `PriCh2`
1. kolejny regularny kanał z listy aktywnych skanów

Cykl ten powtarza się w sposób ciągły.

Dzięki temu radio może sprawdzać dwa kanały priorytetowe częściej niż kanały regularne, tak więc aktywność na nich jest wykrywana szybciej.

#### Ważne zachowanie

Po włączeniu skanowania priorytetowego:

* kanały priorytetowe są obsługiwane oddzielnie od zwykłego skanowania listy
* jeśli kanał priorytetowy należy również do listy aktywnych skanów, jest usuwany z regularnej ścieżki skanowania, aby uniknąć skanowania dwukrotnie
* kanały priorytetowe mogą być nadal sprawdzane nawet jeśli są poza normalną progresją listy

### Przeskanuj i wznowij zachowanie

Kiedy skaner znajdzie aktywność na kanale, to co stanie się dalej zależy od ustawienia `ScnRev`.

W zależności od tego ustawienia, radio może:

* wznowić skanowanie automatycznie po opóźnieniu
* zatrzymać się na kanale aktywnym aż do ponownego ręcznego uruchomienia skanowania

Pauza i wznowienie zachowania są zatem kontrolowane przez tryb wznowienia skanowania, a nie przez samą listę skanów.

### Wyłączenie kanału podczas skanowania

Podczas gdy skanowanie pamięci jest zatrzymywane na odebranym kanale pamięci, długotrwale naciśnij `MENU`, aby wyłączyć ten kanał z przyszłych skanów pamięci.

#### Ważna uwaga

Wyłączenie to jest tymczasowe.

Kanał pozostaje wyłączony do czasu ponownego uruchomienia nadajnika.

### Przeskanuj ponownie

Jeśli wyłączysz nadajnik podczas skanowania, skanowanie zostanie automatycznie wznowione przy następnym uruchomieniu.

### Wspólne funkcje skanowania częstotliwości / kanałów

Następujące urządzenia sterujące dotyczą zarówno skanowania częstotliwości, jak i skanowania pamięci:

* naciśnij klawisz nawigacyjny podczas skanowania w celu odwrócenia kierunku skanowania (`UP` / `DOWN` na UV- K5, `LEFT` / `RIGHT` na UV-K1)
* naciśnij `EXIT`, aby zatrzymać skanowanie i powrócić do częstotliwości lub kanału, który został wybrany przed rozpoczęciem skanowania
* naciśnij `PTT` lub `MENU`, aby zatrzymać skanowanie i zachować ostatnią częstotliwość lub kanał, gdzie aktywność została znaleziona

## Tryb skanowania silnika: NORMAL vs FAST

Buduje z pomocą szybkiego skanowania dodaj menu `SetScn`. Wybiera silnik skanujący używany przez skanowanie pamięci i `ScnRng`.

### NORMAL

`NORMAL` używa standardowej ścieżki skanowania. Każda częstotliwość lub kanał pamięci jest w pełni przystosowany do radia, z normalną konfiguracją VFO, ustawieniem mocy squelch / output-, ustawieniem rejestru odbiornika i typowym czasem zatrzymania skanowania.

Ten tryb jest najbardziej konserwatywny wybór. Jest to przydatne, jeśli wolisz starsze zachowanie skanowania lub chcesz porównać wyniki z szybkim silnikiem.

### FAST

`FAST` to domyślny tryb w obecnych budowach. Dodaje lekką kontrolę wstępną RSSI przed pełnym ustawieniem odbioru:

* do skanowania pamięci, firmware sonduje częstotliwość następnego kanału i opada szybko, jeśli jest wyraźnie cicho
* dla `ScnRng`, firmware sonda małą partię stopni zakresu przed zrobieniem pełnej melodii
* ciche partie są szybciej pomijane, więc skanowanie spędza mniej czasu na pustym spektrum
* możliwe sygnały są promowane z powrotem do normalnej pełnej ścieżki odbioru, więc squelch i normalne zachowanie scan- resume nadal zdecydować, co się dalej
* w `ScnRng`, drobne kroki mogą być wyrafinowane wokół kandydata więc skanowanie ląduje bliżej do najsilniejszego pobliskiego sygnału
* jeśli pętla skanowania po normalnej pauzie `ScnRev` wygasła, krótki stróża ponownie skanuje

Szybka kontrola wstępna uczy się lokalnego poziomu hałasu RSSI i porównuje każdą sondę z tą podłogą i skonfigurowanym progiem squelch. Jeśli squelch jest w pełni otwarty, lub jeśli szybka ścieżka nie może bezpiecznie sprawdzić kanału, firmware wraca do normalnej pełnej melodii dla tego kroku.

> [!NOTE]
> W trybie `ScnRng` tryb `FAST` może skanować wokół * * 150 + częstotliwości na sekundę * * w korzystnych warunkach, zwłaszcza gdy większość zakresu jest cicha i skanowanie może pominąć ciche partie bez wykonywania pełnej konfiguracji odbioru dla każdego kroku.

Skan częstotliwości na zewnątrz `ScnRng` nadal osiąga jeden krok na raz; `SetScn = FAST` głównie zmienia skanowanie pamięci i zachowanie zakresu skanowania.

## Wskaźniki skanowania i wykrywanie

Bieżące building fast- scan może pokazać mały sparkline RSSI podczas skanowania. Jest to kompaktowa historia ostatnich próbek RSSI; ciche próbki pozostają niskie, podczas gdy silniejsi kandydaci wyróżniają się jako wyższe oceny.

Podczas skanowania pamięci, wskaźnik scan- list pokazuje aktywną listę:

* `01` do `24`
* `MIX`, zaczynając od `v6.1.0`
* `ALL`
* 3-znakowa nazwa listy, gdy lista ma jedną

Po włączeniu skanowania priorytetowego, `+` jest dodawany do wskaźnika listy skanerów.

Podczas `ScnRng`, konstrukcje z subaudable scan- range mogą wykrywać CTCSS / DCS podczas zatrzymania radia na odebranym sygnale. W przypadku znalezienia kodu, skan UI może pokazać wykryty ton lub kod DCS wraz z otrzymaną częstotliwością.

Wyświetlacz skanowania udoskonala również umieszczenie wskaźnika blokady VFO podczas skanowania, tak więc stan blokady TX- pozostaje widoczny bez nakładania się aktywnych informacji skanowania.

## Kopiowanie częstotliwości i skanowanie DCS / CTCSS

Funkcja ta pozwala na wykrywanie i kopiowanie ustawień częstotliwości i kodowania. Wyszukiwarka częstotliwości działa tylko na silne sygnały, więc radio musi być blisko. Aby rozpocząć kopiowanie częstotliwości (`FC`), należy użyć przycisku funkcji `4 FC`. Skaner się otworzy. Nacisnąć i przytrzymać przycisk PTT w innym radiu. Odczekać kilka sekund, aż na ekranie pojawi się częstotliwość i kod (jeśli jest używany). Ustawienia można zapisać za pomocą przycisku `MENU`. Będą one zapisane na kanale lub na głównym VFO, w zależności od trybu, w którym uruchomiono skanowanie.

W obecnych budynkach skaner sprawia, że stan jest bardziej wyraźny:

* `Search Freq`: działa wyszukiwanie częstotliwości
* `Search Tone`: przeszukiwanie dźwięku / kodu jest uruchomione
* `Scan Complete`: znaleziono wynik
* `Scan Failed`: nie znaleziono żadnego użytecznego wyniku
* `Freq:` pokazuje wykrytą częstotliwość
* `Tone:` / `CTCSS:` / `DCS:` pokazuje wykryte ustawienie poddźwiękowe, gdy zostanie znalezione

Można również szukać tylko kodu DCS / CTCSS dla częstotliwości ustawionej na głównym VFO. Wybierz żądaną częstotliwość lub kanał i naciśnij `F` + `* SCAN`. Pojawi się ten sam ekran, ale przeszukiwanie częstotliwości zostanie pominięte; częstotliwość głównego VFO zostanie użyta zamiast. Poczekaj, aż pojawi się sygnał lub naciśnij PTT w innym radiu. Znajdowanie kodu zajmuje od 1 do 2 sekund. Procedura oszczędzania jest taka sama jak powyżej.

Istnieje inny sposób skanowania kodu DCS / CTCSS. Wybierz żądaną częstotliwość lub kanał. Przejdź do menu `RxDCS` lub `RxCTCS`. Wprowadź opcję menu i naciśnij przycisk `* SCAN`. Pojawi się etykieta `SCAN`. Poczekaj na sygnał radiowy lub naciśnij przycisk PTT w innym radiu. Po odnalezieniu kodu etykieta `SCAN` zniknie. Aby to zapisać, należy potwierdzić opcję za pomocą przycisku `MENU`. Nie ma znaczenia, które z dwóch pozycji menu można rozpocząć od: zarówno DCS jak i CTCSS można znaleźć, a wpis menu zostanie zmieniony na poprawny.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Operacja radiowa](./Radio-operation)
* [Funkcje przycisku](./Button-functions)
* [Analizator widma](./Spectrum-analyzer)
* [Zaawansowane funkcje](./Advanced-features)
* [AirCopy](./AirCopy)
* [Rozwiązywanie problemów](./Troubleshooting)
