# Obsługa radiowa

Ta strona obejmuje dzienną obsługę nadajnika: przełączanie się pomiędzy VFO a trybem pamięci, czytanie paska stanu, rozumienie ograniczeń TX oraz zarządzanie zachowaniem snu.

Dla funkcji związanych ze skanowaniem patrz [Skanowanie](./Scanning). Do podglądu i obsługi w przeglądarce służy [UV Studio](./UV-Studio), a do kopiowania między radiami — [AirCopy](./AirCopy). RescueOps, tryb wznawiania, wbudowana gra i badawcza procedura odblokowania TX są opisane w [Funkcjach zaawansowanych](./Advanced-features).

> [!WARNING]
> Nie stosować leku Quansheng CPS. Nadpisuje ustawienia niestandardowe.

## Na tej stronie

* [Podstawowe działanie i konfiguracja](#basic-operation--configuration)
* [Pasek stanu](#status-bar)
* [Wyświetlacz baterii, typ i kalibracja](#battery-display-type-and-calibration)
* [O menu `F Lock` i `TXLock`](#about-the-f-lock-and-txlock-menus)
* [Wygaszacz ekranu i czas podświetlenia](#screen-saver-and-backlight-timeout)
* [O menu Setoff](#about-the-setoff-menu)
* [1750 Hz dźwięk rozrywający dla dostępu repeater](#1750-hz-tone-burst-for-repeater-access)
* [Odpowiednie strony](#related-pages)

> [!TIP]
> Wspólne szybkie kontrole:
> - Quansheng CPS nadpisał ustawienia niestandardowe
> - częstotliwość jest poza wybranym planem `F Lock`
> - `TXLock` jest nadal `ON`
> - `AM` lub `USB` jest wybrany zamiast `FM`
>
> Zobacz [Rozwiązywanie problemów](./Troubleshooting) dla krótkiej wersji.

## Podstawowe działanie i konfiguracja

Wyświetlacz radiowy jest podzielony na górne VFO i niższe VFO. Możesz zmienić górny / dolny wybór, naciskając `F` + `2 A/B` (lub naciskając na długość `2 A/B`).

Każdy VFO może działać niezależnie w trybie częstotliwości lub w trybie kanału. Aby przełączyć tryby, wybierz żądany VFO i naciśnij `F` + `3 VFO/MR` (lub long- press `3 VFO/MR`).

![DW](https://github.com/user-attachments/assets/a6edbe0e-3ec3-4e08-98e4-b6d0036d0444)

W `frequency mode` ręcznie wprowadzasz częstotliwość za pomocą klawiatury. Możesz również zmienić różne opcje dla tego VFO w menu (pierwsze 13 wpisów menu). Po skonfigurowaniu VFO ustawienia mogą być zapisywane na kanale pamięci poprzez wejście do menu `ChSave` i wybranie kanału pamięci docelowej.

W `channel mode` można przełączać pomiędzy zapisanymi kanałami pamięci. Kanały pamięci mogą być dodawane ręcznie, jak wspomniano powyżej lub zaprogramowane z komputera za pomocą sterownika `CHIRP` dostarczonego z każdym oprogramowaniem firmware. Patrz [Programowanie z CHIRP](./Programming-with-CHIRP) dla dedykowanego przepływu pracy F4HWN.

W przypadku skanowania częstotliwości, skanowania pamięci, skanowania `ScnRng` oraz skanowania DCS / CTCSS patrz [Skanowanie](./Scanning).

## Pasek stanu

Na górze ekranu, na pierwszej linii, jest pasek stanu. Pokazuje dużo informacji. Oto kilka przykładów:

| Zrzut ekranu & nbsp; z & nbsp; & nbsp; Quansheng & nbsp; K5 & nbsp; uruchomiony & nbsp; firmware & nbsp; F4HWN & nbsp;                | Opis |
| --- | --- |
|![1](https://github.com/user-attachments/assets/bc36b81f-0c7e-4c30-ae0d-80a4144437bf) | DWR oznacza RxMode jest ustawiony na DUAL RX Responded, OP oznacza PTT jest ustawiony na ONEPUSH, ikona F oznacza, że klawisz `F` został naciśnięty i widzisz napięcie akumulatora. |
|![2](https://github.com/user-attachments/assets/fa08eaac-3f68-42b4-a991-27bc2ce15d44) | PS oznacza Power Save jest aktywowany, DW oznacza RxMode jest ustawiony na MAIN TX / DUAL RX, VX oznacza VOX jest aktywowany, CL oznacza PTT jest ustawiony na CLASSIC, ikona blokady oznacza klawiaturę jest zablokowany i widzisz napięcie akumulatora. |
|![3](https://github.com/user-attachments/assets/d385e1ce-94cb-4593-9828-5397259ff779) | PS oznacza Power Save jest aktywowany, MO oznacza RxMode jest ustawiony tylko na MAIN, OP oznacza PTT jest ustawiony na ONEPUSH, i widzisz procent baterii. |
|![4](https://github.com/user-attachments/assets/c202db4e-c77d-4033-a42a-d770415126eb) | MO oznacza, że tryb RxMode jest ustawiony tylko na MAIN, OP oznacza PTT jest ustawiony na ONEPUSH, ikona światła oznacza ręczną regulację podświetlenia jest aktywowana i widzisz procent baterii. |
|![5](https://github.com/user-attachments/assets/53ecb27a-9442-43b5-819b-4cbb042ca593) | Zegar RX po lewej stronie wskazuje, ile czasu minęło od otrzymania sygnału, OP oznacza PTT jest ustawiony na ONEPUSH, ikona światła oznacza ręczną kontrolę podświetlenia jest aktywowana i widzisz procent baterii. |
|![6](https://github.com/user-attachments/assets/d8fa4c00-81bc-4593-a4f1-96a54ffdf744) | Mały `PMR` w odwrotnym wideo i `><` oznacza, że aktualnie skanujesz listę `PMR`, CL oznacza, że PTT jest ustawiony na CLASSIC, ikona Light oznacza ręczną kontrolę podświetlenia jest aktywowana i widzisz procent baterii. |
|![7](https://github.com/user-attachments/assets/5abe40a1-4092-449b-b5e1-7074d5111d86) | Ikona `ALL` i `><` oznaczają, że aktualnie skanujesz wszystkie wymienione kanały, OP oznacza, że PTT jest ustawiony na ONEPUSH, ikona Light oznacza ręczną kontrolę podświetlenia jest aktywowana i widzisz procent baterii. |

> [!NOTE]
> O `RxMode`, `MO` oznacza tylko MAIN, `DW` oznacza MAIN TX / DUAL RX, `DWR` oznacza DUAL RX Responed, a `XB` oznacza CROSS BAND.

## Wyświetlacz baterii, typ i kalibracja

Firma oddziela trzy różne rzeczy związane z batterią:

* zmierzone napięcie akumulatora
* szacunkowa wartość procentowa baterii
* zachowanie uśpienia / oszczędzania mocy

Informacje na temat baterii na ekranie:

* `BatTxt` dodaje `VOLTAGE` lub `PERCENT` do paska stanu lub ukrywa go z `NONE`
* `SysInf` pokazuje skorygowane napięcie akumulatora, szacunkowy procent baterii i wersję oprogramowania firmowego

Aby wartość procentowa baterii miała sens, ważne są dwa elementy menu hiddenowego:

* `BatCal` kalibruje wyświetlane napięcie akumulatora
* `BatTyp` wybiera krzywą wyładowania używaną do oszacowania procentowego baterii

Ważna różnica:

* `BatCal` zmienia odczyt napięcia
* `BatTyp` zmienia obliczenia `%`, a nie samo zmierzone napięcie

Bieżące wybory `BatTyp` to:

* `1600mAh K5`
* `2200mAh K5`
* `3500mAh K5`
* `1400mAh K1`
* `2500mAh K1`

Podobnie jak w przypadku jakichkolwiek oszacowań opartych na woltach, procent baterii jest tylko przybliżony. To zależy od wybranego profilu baterii, stanu baterii i bieżącego obciążenia.

### Kalibracja napięcia akumulatora za pomocą multimetru

1. Upewnij się, że radio nie ładuje się przez `USB-C`.
1. Niech radio na chwilę zostanie puste. Nie kalibrować podczas transmisji.
1. Zmierzyć napięcie akumulatora za pomocą multimetru na stykach akumulatora z tyłu zestawu radiowego / akumulatora.
1. Otwórz ukryte menu i przejdź do `BatCal`.
1. Dostosuj `BatCal` aż napięcie pokazane przez radio będzie pasowało do multimetru.
1. Potwierdź `M`.

> [!TIP]
> Jeśli napięcie jest prawidłowe, ale procent nadal czuje się źle, `BatCal` jest prawdopodobnie w porządku i `BatTyp` jest ustawienie do przeglądu.

## O menu `F Lock` i `TXLock`

W przeszłości w menu `F Lock` było kilka planów kapeli, aby spełnić różne prośby: PMR 446, FRS / GMRS / MURS itp. Jednak dodawanie nowych opcji `F Lock` zawsze zajmowało wiele pamięci: nowe opcje w menu `F Lock`, przechowywanie częstotliwości (dla specjalistów, są to `uint32_t` za każdym razem, więc są one bardzo zapamiętane), itp.

Teraz, trzeba przyznać, że to było skomplikowane, jeśli nie niemożliwe, zaoferować plany zespołu, które mogłyby pokryć i spełnić wszystkie oczekiwania. Istnieje zbyt wiele różnic w zależności od kraju. Dodatkowo, nic nie jest planowane do łączenia wielu planów częstotliwości z menu `F Lock`. Na przykład otwarcie pasm PMR 446 i LPD. Podsumowując, `F Lock` jest zbyt ograniczony i nie można go skalować.

Oto rozwiązanie:

1. Wybierz najbardziej odpowiedni plan zespołu z menu `F Lock`. Na przykład, jeśli masz sygnał wywoławczy i mieszkasz w Europie, wybierz CE HAM. Jeśli nie masz znaku wywoławczego i są tylko SWL, wybierz DISABLE ALL, co jest bezpieczniejsze.
1. Jeśli nadal chcesz nadawać na kanale pamięci, który nie jest otwarty przez plan zespołu, przejdź do menu `TXLock` i wybierz `OFF`. To tworzy wyjątek i pozwala na transmisję na tym kanale.

W skrócie:

* jeśli częstotliwość jest wewnątrz planu pasma wybranego w `F Lock`, można przesłać
* jeżeli częstotliwość jest poza planem pasm wybranym w `F Lock`:
  * można przesłać tylko jeśli `TXLock` jest `OFF`
  * nie możesz nadawać jeśli `TXLock` jest `ON`

Jeśli kanał pamięci lub VFO znajduje się poza wybranym planem zespołu, a `TXLock` jest `ON`, po lewej stronie nazwy będzie mały kłódka.

Procedura `UNLOCK ALL` zorientowana na badania, patrz [Zaawansowane funkcje](./Advanced-features#tx-on-all-bands).

## Wygaszacz ekranu i timeout podświetlenia

Buduje z obsługą wygaszacza ekranu dodaj menu `SetSav`.

`SetSav` współpracuje z `BLTime`: gdy radio jest bezczynne i upływa czas podświetlenia, wygaszacz ekranu może zastąpić normalny ekran zamiast po prostu pozostawić wyświetlacz bez zmian.

Dostępne tryby to:

* `OFF`: brak wygaszacza ekranu
* `LOGO`: pokaż własne logo startowe jako bezczynny ekran
* `LOGO+`: pokazać własne logo boot z efektem przewijania
* `MATRIX`: pokazać matrix-styl animowany bezczynny ekran

Tryby logowania używają tego samego logo `128x64` przesłanego za pomocą [UV Studio](./UV-Studio#boot-logo).

Podczas aktywnej pracy radiowej wygaszacz ekranu jest celowo zawieszony: RX, TX, PTT, BEAM oraz aktywne skanowanie FM. Może wyświetlać się na głównym ekranie radiowym i ekranie FM, gdy radio jest bezczynne. Naciśnięcie klucza budzi normalny ekran.

Jeśli `BLTime` jest ustawiony na zawsze - off lub zawsze - na styl zamiast czasu trwania, `SetSav` nie przejmuje wyświetlacza.

## O menu SetOff

Menu `SetOff` pozwala skonfigurować timeout zanim radio wejdzie w tryb uśpienia. Opóźnienie to można ustawić od 1 minuty do 2 godzin. Jeśli `SetOff` jest `OFF`, tryb uśpienia jest wyłączony.

Na przykład, jeśli ustawisz opóźnienie na 5 minut i w tym czasie będzie:

* brak odbioru
* brak transmisji
* bez naciśnięcia przycisku

Wtedy radio automatycznie włączy tryb uśpienia. Zostaniesz powiadomiony 10 sekund przed Mrugnięciem ekranu.

Należy pamiętać, że tryb uśpienia zostanie aktywowany nawet w przypadku skanowania, o ile nie nastąpi odbiór.

FoxHunt i Beacon są celowymi wyjątkami: podczas gdy każda aplikacja jest aktywna, radio ignoruje `SetOff`, dopóki wyraźnie go nie zostawisz. Normalny czas podświetlenia nadal działa. Zob. [FoxHunt](./Fox-Hunt) i [Beacon](./Beacon).

Raz w trybie uśpienia:

* ekran jest całkowicie wyłączony
* czerwony diody LED na podstawie anteny miga
* moduł BK4819 przechodzi w tryb głębokiego snu i budzi się okresowo co:
  * 2 sekundy, jeśli `BatSav` jest ustawiony na `1:1`
  * 4 sekundy, jeśli `BatSav` jest ustawiony na `1:2`
  * 6 sekund, jeśli `BatSav` jest ustawiony na `1:3`
  * 8 sekund, jeśli `BatSav` jest ustawiony na `1:4`
  * 10 sekund, jeśli `BatSav` jest ustawiony na `1:5`

Aby zakończyć tryb uśpienia, wystarczy:

* odbierać sygnał podczas fazy okresowego budzenia BK4819
* inicjować transmisję poprzez naciśnięcie przycisku PTT
* lub nacisnąć dowolny inny przycisk

Na przykład testowałem tryb uśpienia na dwóch radiotelefonach K5 (8) z kalibrowanymi i w pełni naładowanymi bateriami, używając tych samych ustawień, częstotliwości, trybu (`DWR`) i `BatSav` ustawionych na `1:5`. Jedyną różnicą było to, że jedno radio miało włączony tryb uśpienia, podczas gdy drugie nie. Po 36 godzinach pracy, radio bez trybu uśpienia miało tylko 20% baterii, podczas gdy ten z trybem uśpienia miał jeszcze 60% baterii.

## 1750 Hz dźwięk rozrywający dla dostępu repeater

Po naciśnięciu `PTT`, dźwięk 1750 Hz można aktywować przez naciśnięcie [`Side button 2️⃣`](./Button-functions#side-button-2%EF%B8%8F%E2%83%A3).

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [UV Studio](./UV-Studio)
* [Programowanie z CHIRP](./Programming-with-CHIRP)
* [Skanowanie](./Scanning)
* [Menu](./Menu)
* [Funkcje przycisku](./Button-functions)
* [Zaawansowane funkcje](./Advanced-features)
* [Rozwiązywanie problemów](./Troubleshooting)
