# Operacja menu

Menu jest dostępne za pomocą przycisku `M` _ (krótkie naciśnięcie) _.

> [!NOTE]
> Nawigacja wykorzystuje `UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1. Aktywny układ następuje po opcji hidden- menu `SetNav`.

Wprowadzone do Fusion `v5.9.0`, przeglądarka kategorii jest używana w oficjalnych edycjach `v6.0.0` i `v6.1.0`. Wybierz kategorię `UP` / `DOWN`, a następnie naciśnij `M`, aby otworzyć listę elementów. Wybrany element jest wyświetlany po lewej stronie ekranu, a jego bieżąca wartość jest wyświetlana po prawej stronie.

Aby znaleźć element menu, przeglądaj jego kategorię lub wybierz `All`, aby użyć oryginalnego menu płaskiego. Możesz również wprowadzić * * globalny numer menu * * z ekranu kategorii; na przykład wprowadzić `52`, aby uzyskać dostęp do `SysInf`. Przełączniki wejścia numeru bezpośredniego na `All`. Fusion `v5.9.0` używa `01` do `77`; Multiboot- performance `v6.0.0` dodaje `SetCfg` i rozszerza pełną listę na `78`.

Po podświetleniu pożądanego elementu menu naciśnięcie przycisku `M` wchodzi do tego elementu menu.

Po wybraniu elementu menu naciśnięcie klawiszy strzałek `UP` i `DOWN` dostosowuje ustawienia dla tego elementu. Aby potwierdzić wybór, naciśnij przycisk `M`. Aby anulować wybór, naciśnij `EXIT`.

Z listy elementów, short- press `EXIT`, aby powrócić do przeglądarki kategorii. Short- naciśnij `EXIT` ponownie opuścić menu i powrócić do ekranu radiowego.

![Menu](https://github.com/user-attachments/assets/e12cd5c2-c1ad-441d-819f-b90c047c2f7a)

## Katalogowana przeglądarka menu

Ekran kategorii Fusion pokazuje poprzednią, bieżącą i następną kategorię po lewej stronie. Prawa strona pokazuje, ile pozycji znajduje się w podświetlonej kategorii.

| Kategoria | Pozycje Fusion | Spis treści |
| --- | ---: | --- |
| `Channels` | 21 w v6 | stopień częstotliwości, moc, tony, offset, szerokość pasma, kanał i ustawienia pamięci, plus `SetCfg` |
| `Scan` | 6 | lista skanów, kanały priorytetowe, tryb wznowienia i skanowanie silnika |
| `Keys` | 10 | programowalne skróty, blokada klawiatury, tryb PTT i kanał wywoławczy |
| `Power` | 4 | wygaszacz / wyświetlacz baterii, czas nieaktywności i wygaszacz ekranu |
| `Display` | 11 | wyświetlacz kanału, ekran startowy, podświetlenie i ustawienia interfejsu użytkownika |
| `Timers` | 4 | Ustawienia timeout TX, EOT i RX / TX |
| `Audio` | 5 | mikrofon, sygnał dźwiękowy klawiatury, głośność i RX |
| `Radio` | 6 | tryb squelch, squelch, squelch, roger beep, VOX i RX |
| `DTMF` | 5 | kody w górę / w dół, ton boczny, wstępne obciążenie i dekoder na żywo |
| `Service` | 6 | ukryte menu startowe; widoczne tylko po geście startowym z menu ukrytego |
| `All` | 72 normalnie w v6, 78 z Serwisem | oryginalna kolejność flat- menu i globalna numeracja |

Licznik pozycji wewnątrz przefiltrowanej kategorii jest lokalny dla tej kategorii. Użyj `All`, lub wprowadź numer z ekranu kategorii, jeśli chcesz liczb globalnych wymienionych poniżej.

Oprogramowanie firmowe zapamiętuje ostatnią wybraną kategorię i ostatni zaznaczony element w każdej kategorii dla bieżącej sesji. Te pozycje nawigacyjne nie są zapisywane podczas ponownego uruchamiania.

## Szybkie wskazówki

* w `All`, pierwsze 13 pozycji są główne ustawienia VFO / kanału na żywo
* `ScList`, `ScPri`, `PriCh1`, `PriCh2` i `ScnRev` to kluczowe elementy związane ze skanowaniem
* `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long`, i `M Long` sterowanie dostosowane skróty
* Ukryte menu jest dostępne tylko przy starcie z `PTT` + `SIDE BUTTON 1️⃣`

## Menu główne

Numer z przodu każdego opisu elementu menu to numer pozycji * * _ menu _ * *, który może być użyty do szybkiego wyboru.
1. `Step` - krok częstotliwości (w kHz), `UP` i `DOWN` zmieniają częstotliwość o tę wartość, można również ustawić tylko częstotliwość, która jest wielokrotność połowy tej wartości.
1. `Power` - moc wyjściowa radia (LOW 1 / LOW 2 / LOW 3 / LOW 4 / LOW 5 / MID / HIGH / USER). Należy pamiętać, że moc USER może być dostrojona przez menu `SetPower`.
1. `RxDCS` - odbiornik Digital-Coded Squelch. Jeśli to włączysz, squelch odblokuje tylko wtedy, gdy ten kod zostanie odebrany. Możesz rozpocząć skanowanie DCS / CTCSS w tej opcji menu naciskając przycisk `* SCAN`.
1. `RxCTCS` - odbiornik Continuous Tone- Coded Squelch System. Squelch odblokuje tylko wtedy, gdy ten kod jest odbierany. Możesz rozpocząć skanowanie DCS / CTCSS w tej opcji menu naciskając przycisk `* SCAN`.
1. `TxDCS` - nadajnik Digital- Kodowane Squelch, radio wyśle dany kod podczas transmisji
1. `TxCTCS` - nadajnik Continuous Tone- Coded Squelch System, radio wyśle dany kod podczas transmisji

   W podmenu `RxDCS`, `TxDCS`, `RxCTCS` i `TxCTCS`, górna prawa odznaka pokazuje wybrany wpis i jego homogenizowany indeks:

   * dla CTCSS: `NN/HH`, gdzie `NN` jest pozycją na pełnej liście 50- tonowej, a `HH` jest homogenizowanym numerem tonowym. `--` oznacza, że wybrany ton jest jednym z dodatkowych, niehomologowanych odcieni.
   * dla DCS: `NNN/HH`, gdzie `NNN` jest pozycją na pełnej liście DCS, a `HH` jest homologowanym numerem DCS. `--` oznacza, że wybrany wpis DCS nie znajduje się na liście PMR446.
   * `OFF` jest wyświetlany jako `00/00` dla CTCSS i `000/00` dla DCS.
   * Wartości DCS kończące się w `N` to kody normalne; wartości kończące się w `I` to kody odwrócone. Odwrócone wpisy DCS są pokazane na pełnej liście, ale nie otrzymują one indeksu homologicznego i dlatego pokazują `--`.

1. `TxODir` - kierunek przesunięcia częstotliwości nadajnika
1. `TxOffs` - wartość przesunięcia częstotliwości nadajnika
1. `W/N` - szerokość pasma używana przez nadajnik
   * WIDE - `25 kHz`
   * NARrow - `12.5 kHz`
1. `BusyCL` - ruchliwe zablokowanie kanału, blokuje transmisję radiową podczas odbierania sygnału
1. `Compnd` - towarzysz (kompresor / ekspander), pozwala na przesyłanie sygnałów z dużym zakresem dynamicznym przez urządzenia, które mają mniejszy zakres dynamiczny, poprawia jakość dźwięku, oba radia powinny korzystać z tej opcji
1. `Mode` - tryb demodulacji, domyślnie FM, AM / USB może być używany tylko do słuchania
1. `TXLock` - włączenie lub wyłączenie trybu transmisji kanału (jeżeli nie jest on objęty planem `F Lock`)
1. `ChList` - wybierz listę skanowania kanału pamięci
1. `ChSave` - zapisywanie bieżącego ustawienia do kanału pamięci
1. `ChDele` - Usuń kanał pamięci
1. `ChName` - modyfikacja nazwy kanału pamięci
   * Użyj przycisków `UP` i `DOWN`, aby wybrać kanał do edycji
   * Naciśnij ponownie przycisk `M`, aby wprowadzić tryb edycji nazwy
   * Użyj klawiszy numerycznych w trybie multi- tap do edycji bieżącego znaku, jak na starszych telefonach komórkowych
     * naciśnij ten sam klucz ponownie, aby przejść przez litery i numer przypisany do niego (`2` = `a`, `b`, `c`, `2`, itp.)
     * long- naciśnij klawisz number, aby wprowadzić odpowiedni numer bezpośrednio
     * short- press `F` do przełączania na małe i duże (`abc` / `ABC`)
     * long-press `F`, aby wprowadzić `#`
     * short- press `* SCAN`, aby wprowadzić `-`, lub long- naciśnij go, aby wprowadzić `*`
     * short- naciśnij `0`, aby wprowadzić przestrzeń, a następnie naciśnij ją ponownie, aby wprowadzić `0`
   * Nadal możesz używać przycisków `UP` i `DOWN` do ręcznego przechodzenia przez dostępne znaki
   * Naciśnij przycisk `M`, aby przejść do następnej pozycji znaku
   * Powtarzaj powyżej dwóch kroków aż do końca
   * Kiedy pojawi się "Jasne?", naciśnij przycisk `M`, aby zapisać, lub Exit aby anulować
   * Short- naciśnij `EXIT`, aby cofnąć jeden znak; z pozycji pierwszego znaku, kończy edycję nazwy
   * Long- naciśnij `EXIT`, aby anulować edycję i powrócić do głównego menu.
1. `ScList` - wybiera listę skanów używanych do skanowania kanałów: `01` do `24`, `ALL` i, zaczynając od `v6.1.0`, `MIX`.
   * `MIX` łączy zapisany wybór ponumerowanych list bez zmiany listy przypisanej do każdego kanału.
   * Wybierz `MIX` i naciśnij `M`, aby otworzyć edytor.
   * Użyj klawiszy nawigacyjnych lub wprowadź `01` do `24`, aby wybrać listę, a następnie naciśnij `M`, aby ją przełączyć.
   * Naciśnij `EXIT`, aby zapisać. Co najmniej jedna lista musi pozostać wybrana.
   * Zobacz [MIX scan list](./Scanning#mix-scan-list-v610) dla pełnego zachowania.
1. `ScPri` - umożliwia / wyłącza obsługę kanału prioritykanałowego podczas skanowania.
1. `PriCh1` - ustawia kanał priorytetowy 1
1. `PriCh2` - ustawia kanał priorytetowy 2
1. `ScnRev` - tryb wznowienia skanowania
   * CARRIER - po zniknięciu sygnału, przerwa na [250 milisekund do 20 sekund] przed wznowieniem skanowania
   * STOP - po otrzymaniu sygnału, zatrzymać skanowanie
   * TIMEOUT - wznowienie skanowania po [5 sekund do 2 minut] pauzy
1. Funkcja krótkiego prasowania `F1Shrt` - `SIDE BUTTON 1️⃣`
1. Funkcja długotrwale prasowanego `F1Long` - `SIDE BUTTON 1️⃣`
1. Funkcja krótkiego prasowania `F2Shrt` - `SIDE BUTTON 2️⃣`
1. Funkcja długotrwale prasowanego `F2Long` - `SIDE BUTTON 2️⃣`
1. Funkcja długiego naciśnięcia przycisku `M Long` - `M`
1. `KeyLck` - opcja automatycznego blokowania klawiatury (wyłączenie lub 15 sekund do 10 minut przed automatyczną blokadą klawiatury)
1. `TxTOut` - maksymalny limit czasowy transmisji
1. `BatSav` - opcja oszczędzania baterii, szybkość pomiędzy czasem aktywnym a czasem snu (OFF, 1: 1 do 1: 5)
1. `BatTxt` - dodatkowa wartość baterii na pasku stanu (`NONE`, `VOLTAGE` lub `PERCENT`)
1. `Mic` - czułość mikrofonu
1. `MicBar` - pasek mikrofonu, który pojawia się podczas transmisji 
1. `ChDisp` - styl wyświetlania kanałów
1. `POnMsg` - tryb uruchamiania wyświetlacza
   * `ALL`: wyświetl skonfigurowaną wiadomość powitalną, napięcie i informacje firmware / wersja
   * `SOUND`: zachować normalne zachowanie dźwięku startup bez ekranu powitalnego
   * `MESSAGE`: pokaż tylko skonfigurowaną wiadomość powitalną
   * `VOLTAGE`: pokazać napięcie akumulatora i szacunkowy procent
   * `LOGO`: pokaż własne logo startowe 128x64 wysłane za pomocą [UV Studio](./UV-Studio#boot-logo)
   * `NONE`: pomiń wyświetlacz startowy
1. `BLTime` - czas trwania podświetlenia
1. `BLMin` - minimalna jasność podświetlenia, gdy podświetlenie ekranu wyłącza się, to będzie się ściemniać do tej wartości
1. `BLMax` - maksymalna jasność podświetlenia, gdy włącza się podświetlenie ekranu zmieni się na jasną do tej wartości
1. `BLTxRx` - aktywacja podświetlenia na TX lub RX
1. `Beep` - klawiatura naciśnij sygnał dźwiękowy
1. `Roger` - sygnał ostrzegawczy na końcu transmisji
1. `STE` - eliminator piszczeli, eliminuje hałas na końcu transmisji
1. `RP STE` - repeater reduktor piszczeli ogona
1. `1 Call` - jeden-kluczowy kanał wywoławczy; pozwala szybko przejść na ten kanał za pomocą przycisku `9 Call`
1. `UPCode` - kod DTMF wysyłany na początku transmisji
1. `DWCode` - kod DTMF wysyłany na koniec transmisji
1. `PTT ID` - zestawy, jeśli `UPCode` i / lub `DWCode` powinny być przekazywane
1. `D ST` - przełącznik sygnału bocznego DTMF; pozwala usłyszeć transmitowane dźwięki przez głośnik radiowy
1. `D Prel` - czas obciążenia wstępnego DTMF
1. `D Live` - wyświetla kody DTMF odbierane przez radio na środku ekranu
1. `VOX` - poziom czułości TX aktywowany głosem
1. `SysInf` - informacje systemowe. W bieżącym F4HWN buduje ten element jest paginowany: wprowadź go za pomocą `M`, a następnie użyj `UP` / `DOWN`, aby przejść między stronami.
   * tożsamość: autor oprogramowania firmowego, wersja i edycja
   * `BUILD`: data budowy, czas budowy i identyfikator zmiany
   * `BATTERY`: zmierzone napięcie baterii, szacunkowy procent baterii i wybrany typ / profil baterii
   * `MEMORY`: Użycie FLASH i SRAM, gdy strona pamięci jest włączona w budowie
   * `CODE` / `WIKI`: Kody QR dla linków projektowych, kiedy w budowie są włączone strony kodu QR-
1. `RxMode` - ustawia sposób stosowania górnej i dolnej częstotliwości
   * WYŁĄCZNIE GŁÓWNA - zawsze transmituje i słucha na głównej częstotliwości (`MO`)
   * DUAL RX Respond - słucha obu częstotliwości, jeśli sygnał jest odbierany na częstotliwości wtórnej, która blokuje go na kilka sekund, więc można odpowiedzieć na wywołanie (`DWR`)
   * CROSS BAND - zawsze transmituje na pierwszej i słucha na drugiej częstotliwości (`XB`)
   * MAIN TX DUAL RX - zawsze przekazuje na pierwotne, słucha zarówno (`DW`)
1. `Sql` - poziom czułości pisk
1. `SetPwr` - zestawy USER Power
   * LOW 1 (< ~ 20 mW)
   * LOW 2 (~ 125 mW)
   * LOW 3 (~ 250 mW)
   * LOW 4 (~ 500 mW, górna granica pasma PMR...)
   * LOW 5 (~ 1 W)
   * MID (~ 2 W)
   * WYSOKIE (~ 5 W)
1. `SetPTT` - ustawia użycie PTT
   * CLASSIC
   * ONEPUSH
1. `SetTOT` - ustawia wpis TOT
   * Wyłącz
   * GŁOS
   * WISUAL
   * WSZYSTKIE (_ WISUAL + SOUND _)
1. `SetEOT` - ustawia alarm EOT (przydatny do przerw pomiędzy 2 transmisją)
   * Wyłącz
   * GŁOS
   * WISUAL
   * WSZYSTKIE (_ WISUAL + SOUND _)
1. `SetCtr` - zestawy kontrastu LCD
1. `SetInv` - zestawy LCD odwrócone (najlepsze dla noktowizji)
1. `SetLck` - wybiera to, co jest wyłączone, gdy zamek klawiatury jest aktywny
   * `KEYS`: zablokować klawiaturę przednią; programowalne działania skrótów i `PTT` pozostają dostępne
   * `KEYS + ACTIONS`: również zablokować programowalne działania przypisane do dwóch przycisków bocznych i `M Long`; `PTT` pozostaje dostępny
   * `KEYS + PTT`: również zablokować `PTT`, aby zapobiec przypadkowej transmisji; programowalne działania skrótu pozostają dostępne
   * `KEYS + ACTIONS + PTT`: zablokować klawiaturę przednią, programowalne działania skrótów i `PTT`

   W każdym trybie przytrzymaj `F #`, aby odblokować radio. Szczegółowe informacje znajdują się w sekcji [Funkcje przycisku](./Button-functions#keypad-lock-and-setlck).
1. `SetMet` - zestawy S- Meter
   * CLASSIC
   * TINY (np. na Yestesu FT4 lub FT- 65)
1. `SetGUI` - zestawy graficzne
   * CLASSIC (większa czcionka, mniej informacji)
   * TINY (mniejsza czcionka, więcej informacji)
1. `SetRxA` - ustawia profil audio RX dla bieżącej modulacji

   Profile `FM`:

   - `FLAT`: Najniższy przyrost wyjściowy (BK4829 - bezpieczny). Najbardziej neutralne, najlepsze dla spokojnych środowisk.
   - `CLEAN`: Domyślny profil zrównoważony. Komfortowy dźwięk z umiarkowanym zyskiem.
   - `MID`: Wyższy zysk niż Clean bez agresywności BOOST.
   - `BOOST`: Profil głosowy dla słabych sygnałów / hałaśliwych środowisk. Wyższy zysk, bardziej "obecny" dźwięk.
   - `MAX`: Maksymalny przyrost wyjściowy (może zakłócać działanie silnych sygnałów lub małych głośników). Najlepiej nadaje się do zewnętrznego głośnika.

   Profile `AM`:

   - `SHARP`: Wąski filtr IF z niskim zyskiem. Bardziej selektywne, z lepszym adjacent- kanał odrzucenia. Może brzmieć ostrzejsze lub nieco zniekształcone na silnych sygnałach, ale pozostaje jasne.
   - `STOCK`: Zamierzał pozostać jak najbliżej zachowania firmware stock.
   - `OPEN`: Szerszy filtr IF z większym zyskiem. Bardziej otwarte i przyjemne na słabe sygnały, ale niektóre przyjęcia mogą brzmieć trochę stłumione, zwłaszcza ATC.
1. `SetTmr` - ustawia wyświetlanie liczników RX i TX
1. `SetOff` - ustawia opóźnienie, zanim przekaźnik pójdzie w głęboki sen (wyłączone lub 1 minuta do 2 godzin)
1. `SetNFM` - ustawia wąskie FM na wąskie lub wąskie
1. `SetVol` - ustawia zwiększenie głośności dźwięku na wyjście głośnika fine- tune
1. `SetKey` - ustawia klucz do aktywacji trybu RescueOps po uruchomieniu nadajnika
1. `SetScn` - ustawia tryb [skanowania silnika](./Scanning#scan-engine-mode-normal-vs-fast).
   * `NORMAL`: używa standardowej ścieżki skanowania.
   * `FAST`: używa nowszej ścieżki szybkiego skanowania. Oprogramowanie firmowe sprawdza kilka częstotliwości / kanałów z RSSI przed wykonaniem pełnej konfiguracji odbioru, omija ciche partie szybciej, udoskonala bliskich kandydatów na drobne kroki, i używa małego stróża, aby wznowić, jeśli skanowanie pętli blokuje.
1. `SetSav` - ustawia [wygaszacz ekranu](./Radio-operation#screen-saver-and-backlight-timeout) używany po timeout podświetlenia, gdy jest włączony w konstrukcji.
   * `OFF`: brak wygaszacza ekranu
   * `LOGO`: pokaż własne logo startowe jako bezczynny ekran
   * `LOGO+`: pokazać własne logo boot z efektem przewijania
   * `MATRIX`: pokazać matrix-styl animowany bezczynny ekran

   `SetSav` jest aktywny tylko wtedy, gdy `BLTime` stosuje czas trwania podświetlenia. Jest on zawieszony podczas RX, TX, PTT, BEAM i aktywnego skanowania FM.
1. `SetCfg` - wybiera bank konfiguracyjny używany przez uruchomione oprogramowanie firmowe w modułach `v6.0.0` zdolnych do pracy w systemie Multiboot.
   * `CFG M`: Główny bank konfiguracji
   * `CFG 1` do `CFG 4`: banki konfiguracyjne związane ze szczelinami oprogramowania 1 do 4

   Naciśnij `M` dwa razy, aby potwierdzić inny bank. Radio ponownie uruchamia się tak, aby bank został odwzorowany przed załadowaniem jakichkolwiek kanałów lub ustawień. Szczelina firmware nie zmienia się. Potwierdzenie, że bank jest już w użyciu, to nie operacja. Zob. [Multiboot i Multiconfig](./Multiboot-and-Multiconfig#using-setcfg).

## Ukryte menu

Ukryte menu jest aktywowane przez trzymanie `PTT` + `SIDE BUTTON 1️⃣` podczas włączania radia, a następnie zwolnienie wszystkich kluczy.

73. `F Lock` - ustawia plan częstotliwości TX.
    * DEFAULT + (137- 174, 400- 470) - pozwala na TX na domyślnych pasmach, plus opcje `Tx 200`, `Tx 350`, `Tx 500`
    * FCC HAM (144- 148, 420- 450)
    * CA HAM (144- 148, 430- 450)
    * CE HAM (144- 146, 430- 440)
    * GB HAM (144- 148, 430- 440)
    * (137- 174, 400- 430)
    * (137- 174, 400- 438)
    * PMR 446
    * GMRS FRS MURS
    * WSZYSTKIE ZBIORCZE - wyłącza TX na wszystkich częstotliwościach
    * UNLOCK ALL - umożliwia TX na wszystkich zespołach. Posiada dodatkowy zamek; zobacz [jak go włączyć](./Advanced-features#tx-on-all-bands).
74. `350 En` - umożliwia RX na `350 MHz`
75. `BatCal` - kalibracja napięcia akumulatora. Porównaj wyświetlane napięcie za pomocą multimetru i ustaw je tak, aby odpowiadały jak najbliżej
76. `BatTyp` - typ akumulatora / krzywa rozładowania stosowana do obliczania procentu akumulatora. Wpływa na `%`, a nie samo zmierzone napięcie
77. `SetNav` - konfiguruje typ nawigacji (UP / DOP dla UV- K5, LEFT / RIGHT dla UV-K1)
78. `Reset` - resetuje ustawienia konfiguracji radiowej
   * VFO - usuwa tylko ustawienia kanału
   * ALL - resetuje wszystkie (ustawienia kanału i radia)

Na ekranie menu kategorii, te sześć wpisów pojawia się w kategorii `Service`. Są one również dołączone do `All`, gdzie wielozadaniowa budowa `v6.0.0` działa przez `78/78`. Na `v5.9.0`, który nie ma `SetCfg`, ukryte wpisy zachowują numery `72` do `77`.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [UV Studio](./UV-Studio)
* [Operacja radiowa](./Radio-operation)
* [Skanowanie](./Scanning)
* [Funkcje przycisku](./Button-functions)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [Zaawansowane funkcje](./Advanced-features)
* [Rozwiązywanie problemów](./Troubleshooting)
