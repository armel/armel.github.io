# Beacon

Beacon to aplikacja w stylu ARDF Morse. Wielokrotnie wysyła zaznaczony identyfikator na aktywnym VFO TX, przemiennie pomiędzy konfigurowalnym oknem transmisyjnym a cichym przerwem.

Ponieważ `v6.0.0`, Beacon i [FoxHunt](./Fox-Hunt) to oddzielne aplikacje i oddzielne działania programowalne. Beacon rozpoczyna się bezpośrednio w cyklu transmisji; nie otwiera się przez FoxHunt.

Beacon jest rezydentem w wydaniu `FieldOps`. W `Labs` zainstaluj aplikację `Beacon` nakładkę z [UV Studio](./UV-Studio#apps-labs). Skrót `BEACON` uruchamia aplikację rezydenta lub aplikację dopasowującą zainstalowaną nakładkę, w zależności od wydania.

> [!WARNING]
> Beacon rozpoczyna swoją pierwszą transmisję natychmiast. Przed jego uruchomieniem należy sprawdzić aktywne TX VFO, częstotliwość, moc, antenę, `F Lock`, `TXLock`, wymagania dotyczące znaków wywoławczych i identyfikacyjnych, cykl pracy i przepisy lokalne. Nie należy pozostawiać nadajnika bez nadzoru w przypadku gdy autonomiczne lub okresowe transmisje są zabronione.

## Uruchamianie Beacon

Przypisz `BEACON` do `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`, a następnie uruchom ten skrót. W Labs można również uruchomić `Beacon` z selektora aplikacji `F + 7`.

![Beacon transmit-cycle screen](https://github.com/user-attachments/assets/000a4e9e-f89b-421d-a011-103d96467efd)

## Identyfikatory

| Ustawienie | Wiadomość | Cel |
| --- | --- | --- |
| `MOE` do `MO5` | `MOE`, `MOI`, `MOS`, `MOH`, `MO5` | pięć standardowych identyfikatorów lisów IARU ARDF |
| `MO` | `MO` | identyfikator mety / domu |
| `CALL` | skonfigurowany sygnał wywoławczy, po którym następuje `MOE` | zidentyfikowany nadajnik amatorski |

Sygnał wywoławczy pochodzi z CHIRP `Message Line 1`. Litery są konwertowane na duże litery; litery, cyfry i `/` są obsługiwane. Zob. [Programowanie z CHIRP](./Programming-with-CHIRP#beacon-identification).

Identyfikator używa sygnału `1000 Hz` w przybliżeniu `12 WPM`.

## Wyczucie czasu

* `TX`: `5` do `60 seconds`, w krokach `5-second`; domyślnie `30 seconds`
* `IDLE`: `5` do `240 seconds`, w krokach `5-second`; domyślnie `30 seconds`

Do klasycznego wyczucia czasu pięciolisa, użyj `TX = 60 s` i `IDLE = 240 s`.

| Tryb | Zachowanie |
| --- | --- |
| `TONE` | Utrzymuje aktywny nośnik FM dla pełnego okna TX i przyłącza dźwięk `1000 Hz` |
| `CARR` | Klawisz nośnik i ton razem dla każdego elementu Morse, więc sygnał znika w szczeliny |

`TONE` jest domyślnym czystszym. `CARR` ściślej reprodukuje przetworniki ARDF przerwane przez kierowcę, ale bezpośredni przetwornik nośny może wytwarzać niewielkie kliknięcia i dodatkowe rozprzestrzenianie widmowe.

## Kontrole

| Kontrola | Działanie |
| --- | --- |
| `1` | Cykl `TX` |
| `2` | Cykl `IDLE` |
| `3` | Cykl identyfikator |
| `4` | Włączenie / wyłączenie `TONE` / `CARR` |
| `F`, następnie `1`, `2`, `3` lub `4` | Krok odpowiedniego ustawienia do tyłu |
| przytrzymaj `F` przez około 0,5 sekundy | Zablokuj lub odblokuj wszystkie sterowniki Beacon |
| `M` podczas TX | Zatrzymać transmisję prądu i rozpocząć świeży okres bezczynności |
| `M` podczas bezczynności | Przywróć pełne odliczanie biegu jałowego |
| `EXIT` | Zatrzymaj się bezpiecznie i wyjdź Beacon |

Przed każdym wybuchem Beacon sprawdza normalne ograniczenia częstotliwości TX-, przekanałowe `TXLock`, stan baterii i modulację. Jeśli transmisja zostanie odrzucona, pokazuje odpowiedni status radiowy i czeka przed wypróbowaniem następnego zaplanowanego wybuchu.

## Zapisane ustawienia

Beacon zapisuje identyfikator, czas trwania `TX`, czas trwania `IDLE` i tryb `TONE` / `CARR`. Ustawienia te są przywracane przy następnym uruchomieniu i są włączone do transferu AirCopy `Settings`. Tymczasowy zamek aplikacji nie jest zapisany.

## Odpowiednie strony

* [FoxHunt](./Fox-Hunt)
* [Funkcje przycisku](./Button-functions#beacon-action)
* [Programowanie z CHIRP](./Programming-with-CHIRP#beacon-identification)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Aplikacje nakładane](./Overlay-applications#beacon)
* [AirCopy](./AirCopy)
* [Operacja radiowa](./Radio-operation)
