# Funkcje przycisku

Przyciski mogą uruchamiać funkcje na dwa sposoby:

1. najpierw naciśnij przycisk `F #`, a następnie przycisk docelowy (napisany poniżej jako `F+`)
2. Długo- nacisnąć przycisk docelowy bezpośrednio

W wielu przypadkach długie naciśnięcie powiela działanie `F+`, ale niektóre przyciski zachowują się inaczej.

## Szybkie przypomnienia

* `F+` oznacza: naciśnij `F #`, a następnie naciśnij przycisk docelowy
* etykiety nawigacyjne mogą być `UP` / `DOWN` lub `LEFT` / `RIGHT`, w zależności od modelu i `SetNav`
* programowalne skróty są wymienione w [Własne funkcje przycisku](#custom-button-functions)
* wprowadzony w Fusion `v5.9.0` i dostępny w aktualnych wersjach v6, naciśnięcie `F`, a następnie * * trzymając * * przycisk boczny otwiera [picker działania klawisza bocznego](#side-key-action-picker)

## Przednia klawiatura

### `M`
* krótka prasa - wprowadź menu
* krótkie naciśnięcie podczas skanowania kanału / częstotliwości - ostatni znaleziony kanał jest zachowany na ekranie
* długi naciśnij podczas skanowania kanału - tymczasowo wykluczyć kanał pamięci (nie działa z `* SCAN ALL`)
* długie naciśnięcie — funkcja programowana przez użytkownika w menu: `M Long`
### `EXIT`
* krótka prasa - usuwa bieżące menu / funkcję, usuwa jedną cyfrę w polu wprowadzania
* prasa długa - usuwa wszystkie wejścia, wychodzi z skrzynki DTMF, tryb wyjścia monitora, wychodzi `ScnRng`
### `UP` i `DOWN`
* w górę i w dół w menu, częstotliwość, ustawienia i inne listy
* `F+` - zwiększa lub zmniejsza wartość Squelch.
### `1 BAND`
* `F+`
  * w trybie * * częstotliwość * * - przełączniki pasm częstotliwości `1` do `7`; istnieje również pasmo `7+` dla częstotliwości powyżej `1 GHz`
  * w trybie * * kanał * * - ustawienia kanału są kopiowane do trybu częstotliwości
* prasa długa
  * w normalnym trybie radiowym
  * w trybie FM * * - cykle częstotliwości FM; zobacz [odbiornik radiowy FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range)
### `2 A/B`
* `F+` - przełącznik główny VFO górny / dolny (oznaczony symbolem `►`)
* prasa długa - ta sama
### `3 VFO/MR`
* `F+` - przełączanie pomiędzy trybem częstotliwości a trybem kanału
* prasa długa - ta sama
### `4 FC`
* `F+` - włącza tryb kopiowania częstotliwości i CTCSS. Rozpocznij transmisję za pomocą innego radia, a częstotliwość i kod CTCSS zostaną wykryte. Te ustawienia można zapisać za pomocą przycisku `M`
* prasa długa - ta sama
### `5 NOAA`
* `F+` - włącza analizator widma
* prasa długa
   * w trybie * * kanał * * - cykle wybranego kanału pamięci poprzez jego zadanie scan- list: `OFF`, `1` do `24`, następnie `ALL`
   * w trybie * * częstotliwości * * - aktywuje funkcję [zakresu skanowania](./Scanning#scan-frequency-range-function)
### `6 H/M/L`
* `F+` - przełącza poziomy mocy dla bieżącego kanału
* prasa długa - ta sama
### `7 VOX`
* `F+`
  * w wydaniu `Labs` - otwiera [overlay- app launcher](./Overlay-apps)
  * w budowach z gry rezydent i nie overlay- app loader - uruchamia Breakout
* długie naciśnięcie - włącza / wyłącza tryb VOX po włączeniu VOX
### `8 R`
* `F+` - umożliwia ręczne sterowanie podświetleniem i włącza lub wyłącza podświetlenie
* długie naciśnięcie - włącza tryb wsteczny dla kanałów, które mają zestaw kompensacji częstotliwości. Zastąpi częstotliwość TX częstotliwością RX
### `9 Call`
* `F+` - wyłącza ręczne sterowanie podświetleniem
* długie naciśnięcie — przełącza bieżący kanał na kanał `1-Call` w radiu.
### `0 FM`
* `F+` - włącza radio FM
* prasa długa - ta sama
### `* SCAN`
* krótka prasa - wchodzi w tryb wejścia DTMF
* `F+` - włącza skaner DCS / CTCSS dla bieżącej częstotliwości
* prasa długa
   * w trybie * * kanał * * - włącza skaner kanału
   * w trybie * * częstotliwości * * - włącza skaner częstotliwości (można użyć funkcji [zakresu skanowania](./Scanning#scan-frequency-range-function))
* podczas skanowania pamięci użycie `F+` lub długie naciśnięcie `* SCAN` przełącza na następną prawidłową, niepustą listę skanowania
### `F # 🗝`
* krótka prasa - przełącza modyfikator funkcji `F+`
* długa prasa - włącza lub wyłącza blokadę klawiatury; menu `SetLck` wybiera, czy zamek obejmuje również programowalne działania skrótów i / lub `PTT`

### Blokada klawiatury i SetLck

Blokada klawiatury zawsze wyłącza przednią klawiaturę, z wyjątkiem tego, że długo naciśnięty `F #` pozostaje dostępny do odblokowania radia. Menu `SetLck` rozszerza zamek na inne sterowniki:

* `KEYS`: dostępne są dwa skróty boczne, `M Long` i `PTT`
* `KEYS + ACTIONS`: programowalne skróty przypisane do `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` i `M Long` są również wyłączone; `PTT` pozostaje dostępny
* `KEYS + PTT`: `PTT` jest również wyłączony, aby zapobiec przypadkowej transmisji; programowalne skróty pozostają dostępne
* `KEYS + ACTIONS + PTT`: klawiatura przednia, programowalne skróty i `PTT` są wyłączone

## Przyciski boczne

### `PTT`
* Przycisk Push- To- Talk. Istnieją 2 tryby: CLASSIC i ONEPUSH (patrz menu `SetPTT`)
  * CLASSIC - PTT działa jak zwykle. Naciśnij PTT, aby rozpocząć transmisję i zwolnić go do zatrzymania.
  * ONEPUSH - PTT działa jak przełącznik. Naciśnij PTT, aby rozpocząć transmisję i zwolnić go, kiedy tylko chcesz. Transmisja nadal działa. Naciśnij ponownie PTT, gdy chcesz, a następnie wypuść go, aby zatrzymać transmisję. Działa jak na OpenGD77 (jeśli wiesz).

* kiedy ten przycisk jest używany do zatrzymania skanowania kanału / częstotliwości, ostatni znaleziony kanał jest zachowany na ekranie
* trzymana razem z `Side button 2️⃣`, transmituje dźwięk `1750 Hz`
* trzymana razem z jednym z przycisków klawiatury przedniej przesyła kody DTMF

### `Side button 1️⃣`
* krótka prasa - użytkownik programowalny w menu: `F1Shrt`
* długie naciśnięcie — funkcja programowana przez użytkownika w menu: `F1Long`
* `F` to krótkie naciśnięcie - zwiększa wartość kroku w trybie VFO
* `F` następnie przytrzymaj - otwiera picker działania klawisza bocznego

### `Side button 2️⃣`
* krótka prasa - użytkownik programowalny w menu: `F2Shrt`
* długie naciśnięcie — funkcja programowana przez użytkownika w menu: `F2Long`
* ten przycisk może być również używany do wysyłania sygnału `1750 Hz` poprzez trzymanie go razem z przyciskiem `PTT`
* `F` to krótkie naciśnięcie - zmniejsza wartość kroku w trybie VFO
* `F` następnie przytrzymaj - otwiera picker działania klawisza bocznego

### Selektor działania przycisku bocznego

Picker akcji uruchamia dostępny skrót bez zmiany funkcji zapisanych w `F1Shrt`, `F1Long`, `F2Shrt` lub `F2Long`.

Z normalnego ekranu radiowego:

1. Short- press `F` więc wskaźnik `F` pojawia się.
1. Przytrzymać przycisk boczny 1 lub przycisk boczny 2 do momentu otwarcia pickera.
1. Użyj `UP` / `DOWN`, aby podkreślić akcję.
1. Naciśnij `M`, aby uruchomić go natychmiast.

Ekran pokazuje poprzednie, wybrane i następne działanie. `EXIT` lub `F` anuluje bez uruchamiania niczego. Naciśnięcie `PTT` zamyka picker i kontynuuje normalną obsługę PTT, więc nie blokuje pilnej transmisji.

Picker zamyka się również automatycznie po około pięciu sekundach, kiedy rozpoczyna się odbiór, jeśli klawiatura zostanie zablokowana, lub gdy inny ekran przejmuje kontrolę. Każdy przycisk boczny zapamiętuje swoją ostatnią podświetloną akcję pickera dla bieżącej sesji; wybór zostanie zresetowany po ponownym uruchomieniu radia.

Picker wymienia te same skompilowane działania udokumentowane poniżej, z wyjątkiem `NONE`. Normalne ograniczenia działania nadal obowiązują: akcja, która jest niedostępna w obecnym stanie radiowym, zostaje odrzucona przy zwykłym sygnale błędu.

## Mikrofon zewnętrzny
### `PTT`
* Przycisk Push- To- Talk.
* Przycisk `PTT na mikrofonie zewnętrznym` działa inaczej niż wewnętrzny przycisk `PTT`.

> [!NOTE]
> W niektórych wersjach sprzętowych zewnętrzny mikrofon `PTT` zachowuje się inaczej:
> - po naciśnięciu PTT nadawanie czeka, aż sygnał RX przestanie być odbierany (_zaobserwowano na radiu z płytą PCB V1.4; działa prawidłowo z V1.6_). Działa to dobrze z wewnętrznym `PTT`
> - ton DTMF (`key press`) lub 1750 Hz (`function button`) można odciąć w ciągu sekundy. Działa to dobrze z wewnętrznym `PTT`

## Własne funkcje przycisków
W menu można dostosować pięć skrótów:
* `F1Shrt` - przycisk boczny 1
* `F1Long` - przycisk boczny 1
* `F2Shrt` - przycisk boczny 2
* `F2Long` - przycisk boczny 2
* `M Long` - przycisk menu, długie naciśnięcie

Dostępne funkcje:
* BRAK - brak działania
* FLASH LIGHT - przełącz na następną funkcję latarki: Włączony / Wyłączony
* POWER - przełącznik mocy wyjściowej między [LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH]
* MONITOR - tryb włączania / wyłączania monitora
* SCAN - kanały startowe / skanowanie częstotliwości
* VOX - funkcja włączania / wyłączania głosu
* FM RADIO - włączyć / wyłączyć radio FM
* `1750 Hz` - wyślij sygnał `1750 Hz`
* LOCK KEYPAD - blokada / odblokowanie klawiatury
* VFO A VFO B - zmień główny VFO na górną / dolną
* VFO MEM - zmienić bieżący tryb VFO, tryb częstotliwości lub tryb kanału pamięci
* MODE - przełącz na następny tryb demodulacji pomiędzy [FM / AM / USB]
* RX MODE - tryb przełączania pomiędzy [DW / DWR / XB / MO]
* WYŁĄCZNIE MAIN - tryb przełączania pomiędzy [DW / DWR / XB] i MO
* PTT - przełącznik trybu PTT CLASSIC / ONEPUSH
* WIDE NARrow - przełączanie między WIDE a NARrow
* MUTE - głośność głośnika
* RxA - przełącz profil audio RX dla bieżącej modulacji: w `FM`, `FLAT` / `CLEAN` / `MID` / `BOOST` / `MAX`; w `AM`, `SHARP` / `STOCK` / `OPEN`
* POWER HIGH - chwilowe przełączanie do maksymalnej mocy `5 W`
* REMOVE OFFSET - tymczasowo usunąć przesunięcie kanału pamięci, jeśli występuje
* BEAM - otwiera tryb transferu BEAM, gdy jest włączony w budowie. BEAM może wysyłać aktualne ustawienia kanału VFO / memory- do innego radia lub odbierać ustawienia z innego radia.
* FOX HUNT - otwiera aplikację do wyszukiwania wyłącznie kierunku odbioru, gdy jest rezydentem lub jest dostępna jako zainstalowana aplikacja Labs.
* BEACON - otwiera niezależną aplikację Morse 'a, jeśli jest rezydentem lub jest dostępna jako zainstalowana aplikacja Labs.
* RF LOG - otwiera dziennik historii RX / TX, gdy jest włączony w budowie. Logarytm pokazuje ostatnie sesje odbiorcze, monitorujące i transmitujące przechowywane w zewnętrznej pamięci flash.

### Działanie BEAM

Przypisz `BEAM` do jednego z możliwych do dostosowania skrótów (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`), a następnie uruchom ten skrót, aby otworzyć tryb BEAM.

W trybie BEAM:

* Przełączniki `UP` / `DOWN` między `BEAM TX` i `BEAM RX`
* `M` uruchamia wybraną operację
* `EXIT` opuszcza tryb BEAM

`BEAM TX` wysyła bieżącą konfigurację VFO lub memory- channel. Pakiet zawiera częstotliwości RX, offset TX, ustawienia RX / TX DCS lub CTCSS, modulację, przepustowość, moc wyjściową, przypisanie listy skanerów, firmę towarzyszącą, ustawienia związane z DTMF- po włączeniu oraz nazwę kanału.

`BEAM RX` czeka na pakiet BEAM z innego radia. Po otrzymaniu ważnego pakietu radio zapisuje go do pierwszego wolnego kanału pamięci. Jeśli pamięć jest pełna, stan pokazuje `MEM FULL`. Naciśnięcie `EXIT` po udanym otrzymaniu przełączników do nowo zapisanego kanału; w przeciwnym razie przywraca poprzedni stan VFO / kanału.

### Działanie FOX HUNT

Przypisz `FOX HUNT` do jednego z możliwych do dostosowania skrótów (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`), a następnie uruchom ten skrót, aby otworzyć FoxHunt na wybranym VFO.

W trybie Fox Hunt:

* `1` przełącza między schodami S- meter a ostatnim wykresem historii znaków
* Cykle `2` między ciche, w stylu Geiger- beep i odebrane-station audio
* Cykle `3` przez `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` i `BYP+`
* `UP` / `DOWN` zmienia bezpośrednio tłumienie odbiornika
* `M` resetuje odniesienia do trendu szczytowego, minimalnego i sygnałowego
* trzymając `F` przez około 0,5 sekundy blokady lub odblokowuje sterowniki FoxHunt; strzałki tłumienia pozostają dostępne podczas zablokowania
* `EXIT` zamyka FoxHunt

Zobacz [FoxHunt](./Fox-Hunt) dla odczytów ekranu, ustawień uzyskania, sterów i wskazówek wyszukiwania kierunku.

### Akcja BEACON

Przypisz `BEACON` do jednego z dostępnych skrótów, a następnie uruchom ten skrót, aby uruchomić niezależną aplikację Beacon. Beacon rozpoczyna swoją pierwszą transmisję natychmiast.

Klucze `1`, `2`, `3` i `4` regulują okno TX, cichy przedział, identyfikator lisa i tryb Keying (`TONE` / `CARR`). Trzymanie `F` przez około 0,5 sekundy blokuje lub odblokowuje wszystkie sterowniki Beacon, w tym podczas aktywnej transmisji. `M` zatrzymuje transmisję prądu i rozpoczyna świeży okres bezczynności; `EXIT` zatrzymuje się bezpiecznie i pozostawia Beacon.

Patrz [Beacon](./Beacon) w celu identyfikacji, określenia czasu, przekazywania zabezpieczeń, zapisanych ustawień oraz informacji dotyczących bezpieczeństwa.

### Działanie RF LOG

Przypisz `RF LOG` do jednego z możliwych do dostosowania skrótów (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`), a następnie uruchom ten skrót, aby otworzyć dziennik historii RX / TX.

Rejestry dzienników odbierają, monitorują i transmitują sesje w zewnętrznym błysku. Każdy rząd ruchu pokazuje:

* nazwa kanału, gdy wpis pochodzi z kanału pamięci; w przeciwnym razie częstotliwość
* czy pozycją był `RX` czy `TX`
* Odznaka indeksowa dla nowożeńców
* Odznaka szczegółowa, która może wykazać czas trwania, sygnał / moc lub napięcie akumulatora

Na ekranie `RF LOG`:

* `UP` / `DOWN` przewija się przez dziennik, najnowsze wpisy najpierw
* `F` + `UP` skacze do najnowszego wpisu
* `F` + `DOWN` skacze do najstarszego widocznego wpisu
* Short- press `M` cykle filtr: `ALL`, `RX`, `TX`
* Short- press `* SCAN` cykle Odznaka szczegółowości: czas trwania, poziom mocy RX S- meter / TX, najniższe napięcie akumulatora podczas sesji
* long- press `M` prosi o potwierdzenie rozliczania dziennika; long- press `M` ponownie na `CLEAR LOG / SURE?` oczyszcza dziennik
* `EXIT` opuszcza ekran dziennika lub anuluje wyraźne potwierdzenie

Radio utrzymuje do 512 wpisów ruchu widocznych w widoku dziennika. Linie separatora sesji oznaczają ponowne uruchomienie radia, gdy filtr `ALL` jest aktywny.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Menu](./Menu)
* [Operacja radiowa](./Radio-operation)
* [Skanowanie](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [Zaawansowane funkcje](./Advanced-features)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Aplikacje nakładane](./Overlay-applications)
* [Rozwiązywanie problemów](./Troubleshooting)
