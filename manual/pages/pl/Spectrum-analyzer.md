# Analizator widma

## Ekran zamiatania widma

Naciśnij `F` + `5 NOAA`, aby włączyć * * Analizator widma * *.
Bieżącą częstotliwością VFO lub pamięcią będzie * * _ center częstotliwości _ * * częstotliwości przeszukiwania widma.

![Spectrum Analyzer 1](https://github.com/user-attachments/assets/a445dca8-f7e9-4053-bbc9-9d373b03ed2c)

![Spectrum Analyzer 2](https://github.com/user-attachments/assets/01504dbf-e67b-45d3-9c56-b8ebb6b06e05)

Analizator widma może być również stosowany z [* * * ScnRng * * mode](./Scanning#scan-frequency-range-function).

> [!NOTE]
> Nawigacja wykorzystuje `UP` / `DOWN` na UV- K5 lub `LEFT` / `RIGHT` na UV-K1. Aktywny układ następuje po `SetNav`.

> [!NOTE]
> - `PTT` otwiera szczegółowe monitorowanie dla ostatniej otrzymanej częstotliwości
> - z `ScnRng`, czarna lista jest ograniczona do 15 częstotliwości

> [!IMPORTANT]
> * * Analizator widma nie zachowuje się identycznie w całym sprzęcie radiowym. * *
> Radiotelefony * * V1 / V2 * * są zbudowane wokół odbiornika * * BK4819 * *, podczas gdy
> * * V3 (K5v3) * * używa * * BK4829 * *. Są to różne chipy odbiornika, z
> różne etapy początkowe, LNA / PGA, zachowanie AGC i skalowanie RSSI.
>
> W rezultacie:
> - * * poziom hałasu * *, bezwzględne * * dBm / S- meter * * odczyty i * * wartości * * `LNAs` / `LNA` / `PGA` * * są * * nie są bezpośrednio porównywalne * * pomiędzy V1 / V2 i V3 - poziom lub ustawienie zysku, które wygląda "prawo" na V2 nie ma powodu, aby oznaczać to samo na V3;
> - analizator widma był * * znacząco przepracowany * * w celu wsparcia obu platform, więc nie oczekuj, że V3 się powieli, wartość do wartości, co zauważyłeś na starszych V1 / V2;
> - wysoki lub niestabilny poziom hałasu jest w dużej mierze napędzany przez odbiornik przedni i lokalne środowisko RF, a nie przez błąd w analizatorze. Kiedy * * AUTO * * nie może osiedlić się na lokalnym piętrze, przełącz na * * MANUAL * * i sam nastaw spust - właśnie do tego służy tryb MANUAL.

### Tryby przełączania: AUTO vs MANUAL

Short- naciśnij `M`, aby przełączać pomiędzy trybami wyzwalania * * AUTO * * i * * MANUAL * *. Wskaźnik lewy górny pokazuje tryb aktywny:

- * * `A:NORM` * * / * * `A:WEAK` * * / * * `A:STRG` * * - tryb AUTO. Poziom spustu squelch śledzi mierzoną podłogę hałasu przy użyciu profilu wrażliwości:
  - `WEAK` - + 12 dB powyżej podłogi hałasu (najmniej wrażliwe, mniej fałszywych otworów)
  - `NORM` - + 8 dB (domyślnie)
  - `STRG` - + 5 dB (najbardziej wrażliwe)
  
  Strzałka kierunku jest dołączona do etykiety, aby pokazać aktualny kierunek przeszukiwania:
  - `>` - zamiatać po lewej → prawo
  - `<` - zamiatać w prawo → lewo
  
  Przykład: `A:NORM>` oznacza AUTO / Normalna wrażliwość, zamiatanie w prawo.

- * * `M <rssi>/<trig>` * * - tryb MANUAL. Sam ustawiasz poziom spustu z `*` / `F`, a skala pionowa (`dbMax`) z `3` / `9`. Włącznik zmienia się w przewidywalnych krokach `1 dB`.

Long- press `M` do * * zresetuje analizator widma do ustawień domyślnych * *.

### Zapisywanie ustawień przy wyjściu

Po opuszczeniu ekranu **Przegląd widma** za pomocą `EXIT` analizator zapisuje swoje trwałe ustawienia w pamięci Flash. Przy następnym otwarciu wartości te zostaną przywrócone:

- stopień częstotliwości między prętami (`1` / `7`)
- liczba barów / kanałów (`4`)
- pasmo odbiornika używane podczas monitorowania sygnału (`6`)
- tryb wyzwalania, * * AUTO * * lub * * MANUAL * * (`M` short)
- Profil wrażliwości AUTO, * * WEAK * * / * NORM * * / * * STRG * * (`3` / `9` w trybie AUTO)
- poziom spustu squelch (`*` / `F`) - przywrócony w trybie * * MANUAL * *; w trybie * * AUTO * * wyzwalacz jest ponownie obliczany z podłogi szumu za każdym razem, gdy otwierasz analizator

Wytrwałość ta została rozszerzona po `v5.4.0`: starsze buduje zachowane tylko krok skanowania, liczba pasków i przepustowość odbiornika. W obecnych budowach, uruchamianie analizatora widma z trybu `ScnRng` nie nadpisuje już zapisanego kroku skanowania lub preferencji licznika barowego; aktywny zakres skanowania nadal określa zakres zakresów skanowania.

Skala pionowa (`dbMax`, `3` / `9` w MANUAL) to * * nie * * perstasted: jest resetowana do domyślnego okna wyświetlacza przy każdym otwarciu analizatora. Obecna częstotliwość / okno przeszukiwania, krok przewijania `UP` / `DOWN`, typ modulacji, przełącznik podświetlenia, tymczasowa czarna lista i szczegółowe ustawienia rejestru monitora (`LNAs`, `LNA`, `PGA`) nie są również zapisywane przez tę akcję `EXIT`. Jeśli jesteś na ekranie * * Detal Monitor * *, `EXIT` pierwszy powraca do ekranu wyszukiwania; naciśnij `EXIT` ponownie stamtąd, aby zapisać i zostawić analizator.

Obecne budowle również poprawiają zaokrąglanie częstotliwości `8.33 kHz` w strumieniach pracy w zakresie bandscope / widmo, tak więc wyświetlane i dostrojone częstotliwości pozostają bardziej przewidywalnie dopasowane do etapów w stylu lotnictwa.

### Funkcje przycisku

| Klucz | Funkcja |
| --- | --- |
| `1` / `7` | Zwiększenie / zmniejszenie stopnia częstotliwości między prętami |
| `2` / `8` | Zwiększenie / zmniejszenie stopnia częstotliwości użytego podczas przewijania za pomocą `UP` / `DOWN` |
| `3` / `9` | W MANUAL: dostosować `dbMax` (w skali pionowej) · W AUTO: profil wrażliwości cyklu (`WEAK` ↔ `NORM` ↔ `STRG`) |
| `4` | Włączenie / wyłączenie liczby barów (kanałów) na wykresie |
| `5` | Częstotliwość wejściowa dla niższej częstotliwości przeszukiwania (wartość w * * MHz * *, `*` = punkt dziesiętny) |
| `6` | Przełączanie pasma odbiornika |
| `0` | Włączenie / wyłączenie typu modulacji (FM / AM / USB) |
| `*` / `F` | Zwiększ / zmniejsz poziom spustu w krokach `1 dB` - zaczyna działać w * * MANUAL * *; w * * AUTO * * auto- tracker wyprzedza go przy następnym zamiataniu |
| `M` short | Włączenie / wyłączenie trybu AUTO / MANUAL |
| `M` długi | Zresetuj analizator widma do domyślnego |
| `UP` / `DOWN` na UV-K5 lub `LEFT` / `RIGHT` na UV-K1 | Przesuwa okno przemiatania w górę lub w dół częstotliwości · **Podczas RX**: zatrzymuje odbiór i wznawia przemiatanie w wybranym kierunku |
| `Side button 1️⃣` | Wyłączenie bieżącej częstotliwości ze skanowania widma |
| `Side button 2️⃣` | Włączenie / wyłączenie podświetlenia |
| `PTT` | Przełącz na * * szczegółowy monitoring * * ostatnio otrzymanej częstotliwości |
| `EXIT` | Zapisz stałe ustawienia widma, a następnie wróć do poprzedniego ekranu / funkcji |

> [!TIP]
> Przemyt zmienia kierunek w każdym pełnym cyklu w celu zmniejszenia odchylenia kierunkowego. Wskaźnik `<` / `>` obok `A:xxxx` pozwala zobaczyć, która połowa przeszukiwania jest obecnie aktywna.

> [!NOTE]
> W trybie MANUAL krzywa widmo jest rysowana bez wygładzania kosmetycznego. Dzięki temu wąskie szczyty są ściślej ustawiane z surowym RSSI używanym przez detektor squelch.

## Monitor detali
![LNA](https://github.com/user-attachments/assets/635b7049-4f80-42ba-99e8-ea5295708fab)

### Funkcje przycisku
* `M` - przewija parametry wyświetlane na dole ekranu, które można regulować przyciskami `UP` i `DOWN`
   * LNA - Krótki wzmacniacz niskiego hałasu
   * LNA - Wzmacniacz niskiego hałasu
   * PGA - Programowalny wzmacniacz bram
* `Side button 1️⃣` - przełączanie trybu * * monitor * * (wymusza otwarcie squelch, dzięki czemu można usłyszeć ustawioną częstotliwość)
* `EXIT` - wyjścia na poprzedni ekran analizatora widma

> [!NOTE]
> `LNAs` / `LNA` / `PGA` to * * żywe wartości diagnostyczne * *, nie zapisane ustawienia. Są one napędzane przez AGC odbiornika i nie utrzymują się przy wyjściu. Ich dostępne kroki i ich znaczenie różnią się między * * BK4819 * * (V1 / V2) i * * BK4829 * * (V3), więc nie można porównywać wartości dla poszczególnych platform.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Skanowanie](./Scanning)
* [Funkcje przycisku](./Button-functions)
* [Operacja radiowa](./Radio-operation)
* [Rozwiązywanie problemów](./Troubleshooting)
