# FoxHunt

FoxHunt jest tylko receive- signal- wytrzymałość aplikacji dla Amateur Radio Direction Finding (ARDF). Pomaga operatorowi zbliżyć się do ukrytego nadajnika pokazując skalibrowany `dBm`, S- meter, szczyt, minimum, trend i najnowszą historię sygnału.

Ponieważ `v6.0.0`, FoxHunt i [Beacon](./Beacon) to oddzielne aplikacje i oddzielne działania programowalne. FoxHunt nie nadaje i nie przełącza się na Beacon.

FoxHunt jest rezydentem w wydaniu `FieldOps`. W `Labs` zainstaluj aplikację `FoxHunt` nakładkę z [UV Studio](./UV-Studio#apps-labs). Skrót `FOX HUNT` uruchamia aplikację rezydenta lub aplikację dopasowującą zainstalowaną nakładkę, w zależności od wydania.

## Uruchamianie FoxHunt

Przypisz `FOX HUNT` do `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`, a następnie uruchom ten skrót na VFO, który chcesz monitorować. W Labs można również uruchomić `FoxHunt` z selektora aplikacji `F + 7`.

> [!NOTE]
> Nawigacja wykorzystuje `UP` / `DOWN` na UV- K5 i `LEFT` / `RIGHT` na UV-K1. Aktywny układ następuje po `SetNav`.

## Wyświetlanie i sterowanie

Skala sygnału biegnie od `S0` do `S9+40`. G ³ ówny miernik mo ¿e pokazaæ albo 13- poziome schody albo oko ³ o 18-sekundowe przewijanie historii. Tendencja porównuje obecny sygnał z poziomem mierzonym około sekundę wcześniej.

![FoxHunt signal-strength screen](https://github.com/user-attachments/assets/8e7c2554-f1ca-4a83-ba03-e579607f953d)

| Kontrola | Działanie |
| --- | --- |
| `1` | Przełączanie klatek schodowych i monitorów historii znaków |
| `2` | Cykl cichy, sygnał dźwiękowy w stylu Geiger- style i odebrany dźwięk stacji |
| `3` | Cykl `ATT 0`, `ATT 6`, `ATT 15`, `ATT 27`, `BYP` i `BYP+` |
| klawisze nawigacyjne | Bezpośrednie zwiększenie lub zmniejszenie tłumienia |
| `F`, następnie `2` lub `3` | Krok odpowiedniego ustawienia do tyłu |
| `M` | Zresetuj odniesienia piku, minimum i trendu |
| przytrzymaj `F` przez około 0,5 sekundy | Zablokuj lub odblokuj sterowniki FoxHunt |
| `EXIT` | Exit FoxHunt |

Podczas zablokowania, tylko klawisze nawigacyjne do tłumienia i inna długa prasa `F` pozostają dostępne.

## Wskazówki dotyczące kierunku

* Zwiększyć tłumienie, gdy sygnał staje się silny, więc licznik trzyma się z dala od pełnej skali.
* Przed każdym porównaniem lub skanowaniem ciała należy ponownie zmienić referencje za pomocą `M`.
* Przytrzymaj radio przy klatce piersiowej i obracaj powoli; Twoje ciało często tworzy użyteczny sygnał minimum w kierunku od nadajnika.
* W celu porównania pełnej rotacji należy użyć piku (`PK`) i minimum (`MN`).
* Użyj wykresu historii, aby zobaczyć doliny sygnału i wskaźnik trendu podczas chodzenia łożyska.

`BYP` i `BYP+` są ustawieniami zwiększenia zasięgu, a nie dosłownym obejściem sprzętowym. Wyświetlona wartość bezwzględna `dBm` zmienia się z krokiem przyrostu, więc porównuj odczyty podczas pozostawania na tym samym kroku.

## Zapisane ustawienia

FoxHunt oszczędza swój tryb tłumienia, pomiaru i audio. Ustawienia te są przywracane przy następnym uruchomieniu i są włączone do transferu AirCopy `Settings`. Tymczasowy zamek aplikacji nie jest zapisany.

## Odpowiednie strony

* [Beacon](./Beacon)
* [Funkcje przycisku](./Button-functions#fox-hunt-action)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Aplikacje nakładane](./Overlay-applications#foxhunt)
* [AirCopy](./AirCopy)
* [Zaawansowane funkcje](./Advanced-features)
