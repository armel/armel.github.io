# Zaawansowane funkcje

Ta strona obejmuje specjalistyczne lub opcjonalne funkcje, które nie są potrzebne do podstawowej pracy radiowej: BEAM, RF log, RescueOps, UV Studio, Resume Mode, built- w grze, i badania zorientowane TX odblokować procedurę. Aplikacje AirCopy, FoxHunt, Beacon, Multiboot i nakładki posiadają własne szczegółowe strony.

Używanie radia dnia na dzień, patrz [działanie radiowe](./Radio-operation). Dla funkcji związanych ze skanowaniem, patrz [Skanowanie](./Scanning).

> [!NOTE]
> W przypadku gdy ta strona wymienia `UP` / `DOWN`, użyj równoważnych klawiszy `LEFT` / `RIGHT` na UV-K1. Aktywny układ nawigacyjny następuje po `SetNav`.

## Na tej stronie

* [AirCopy](#aircopy)
* [Multiboot, Multiconfig i nałóż aplikacje](#multiboot-multiconfig-and-overlay-apps)
* [Tryb transferu BEAM](#beam-transfer-mode)
* [FoxHunt](#foxhunt)
* [Beacon](#beacon)
* [log RF](#rf-log)
* [RescueOps](#rescueops)
* [Gra](#game)
* [UV Studio](#uv-studio)
* [Wznowienie trybu](#resume-mode)
* [TX na wszystkich pasmach](#tx-on-all-bands)
* [Odpowiednie strony](#related-pages)

## AirCopy

AirCopy przenosi banki pamięci i ustawienia pomiędzy kompatybilnymi radiami. `v6.0.0` dodał uznane bloki, powtórki, duplikaty obsługi i `All (Mem+Set)`. `v6.1.0` dodaje wieloblokowe ramy, porównuje i pomija identyczne bloki, transport kablowy i chroniony klonowanie zewnętrzne Flash w wydaniu Transfer.

Zobacz [AirCopy](./AirCopy) w celu uzyskania informacji o dostępności, kontroli, kompatybilności protokołu, transferach radiowych, `CABLE COPY` i `Flash 2M` bezpieczeństwa.

## Multiboot, Multiconfig i nałóż aplikacje

`v6.0.0` dodaje dwie większe platformy udokumentowane oddzielnie:

* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig) wyjaśnia `Main` plus cztery gniazda oprogramowania firmowego, selektor startowy, niezależne banki konfiguracyjne, `SetCfg` oraz zarządzanie gniazdami UV Studio.
* [Overlay apps](./Overlay-apps) wyjaśnia eksperymentalną platformę Labs- only `.app`, instalację poprzez UV Studio, wyrzutnię `F + 7`, kontrolę kompatybilności oraz rozwój aplikacji.

## Tryb transferu BEAM

BEAM to opcjonalny tryb bezpośredniego transferu dla jednego kanału VFO lub pamięci. W przeciwieństwie do [AirCopy](./AirCopy), który przenosi banki pamięci lub sekcje ustawień, BEAM jest przeznaczony do szybkiego udostępniania aktualnie wybranej konfiguracji z innym kompatybilnym radiem.

Przypisz `BEAM` do jednego z możliwych do dostosowania skrótów (`F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`), a następnie uruchom ten skrót, aby otworzyć tryb BEAM.

W trybie BEAM:

* Przełączniki `UP` / `DOWN` między `BEAM TX` i `BEAM RX`
* `M` uruchamia wybraną operację
* `EXIT` opuszcza tryb BEAM

`BEAM TX` wysyła bieżącą konfigurację VFO lub memory- kanału, w tym częstotliwość, offset, tony, modulacja, przepustowość, moc, przypisanie listy skanerów, towarzystwo, ustawienia związane z DTMF- po włączeniu, i nazwę kanału.

`BEAM RX` czeka na pakiet BEAM z innego radia i zapisuje go do pierwszego wolnego kanału pamięci. Jeśli pamięć jest pełna, stan pokazuje `MEM FULL`.

Zobacz [Funkcje przycisku](./Button-functions#beam-action) dla szczegółów poziomu skrótu.

## FoxHunt

[FoxHunt](./Fox-Hunt) jest aplikacją do rozpoznawania sygnałów o mocy tylko odbiorczej. Od `v6.0.0` ma własną akcję skrótów `FOX HUNT`. Jest rezydentem w FieldOps i jest dostępny jako zainstalowana aplikacja nakładka w Labs.

## Beacon

[Beacon](./Beacon) to osobna aplikacja transmitująca w stylu ARDF- Morse z własnym skrótem `BEACON` oraz wymogami bezpieczeństwa. Jest rezydentem w FieldOps i dostępny jako osobna aplikacja instalacyjna nakładka w Labs.

## Dziennik RF

Kompilacje z rejestrowaniem RX/TX dodają działanie skrótu `RF LOG`. Przypisz je do `F1Shrt`, `F1Long`, `F2Shrt`, `F2Long` lub `M Long`, a następnie uruchom ten skrót, aby otworzyć ekran historii.

Rejestry RF odbierają, monitorują i przesyłają sesje do zewnętrznego błysku. Jest on przydatny do sprawdzania ostatnich działań po skanowaniu, monitorowania kanału bez nadzoru lub przeglądania transmisji wykonanych podczas użytkowania pola.

Każdy zalogowany sklep wejścia ruchu:

* częstotliwość, lub odniesienie do kanału pamięci, gdy sesja pochodzi z zapisanego kanału
* Kierunek RX lub TX
* Czas trwania sesji
* szczytowy poziom RX S- meter dla otrzymanych sesji, lub poziom mocy TX dla przesyłanych sesji
* najniższe napięcie akumulatora mierzone podczas sesji

Widok dziennika najpierw pokazuje najnowsze wpisy i ujawnia do 512 wpisów ruchu. Po wybraniu filtra `ALL`, poziome linie separatorów oznaczają ponowne uruchomienie radia.

<img width="640" height="384" alt="screenshot_2026-08-04_01-36-59-167Z" src="https://github.com/user-attachments/assets/5e0d22a1-4a48-46ed-bbc1-c90c77418120" />

Sterowanie na ekranie dziennika RF:

* `UP` / `DOWN`: przewijanie wpisów
* `F` + `UP`: przejść do najnowszego wpisu
* `F` + `DOWN`: skok do najstarszego widocznego wpisu
* `M`: cykl filtra pomiędzy `ALL`, `RX` i `TX`
* `* SCAN`: Cyrk po prawej stronie odznaka szczegółowości między czasem trwania, S- metr / TX moc i najniższe napięcie akumulatora
* long- press `M`: otworzyć jasne potwierdzenie; long- press `M` ponownie na `CLEAR LOG / SURE?`, aby usunąć dziennik
* `EXIT`: zostaw ekran RF dziennika lub anuluj wyraźne potwierdzenie

Logarytm jest przechowywany w zarezerwowanej powierzchni zewnętrznej, więc przetrwa normalne cykle mocy. Oczyszczenie dziennika usuwa zastrzeżony obszar.

Zobacz [Funkcje przycisku](./Button-functions#rf-log-action) dla szczegółów poziomu skrótu.

## RescueOps

### Zastrzeżenie

Chciałbym wyjaśnić, że nie jestem ekspertem w dziedzinie służb ratunkowych, jednakże ta szczególna cecha została opracowana z zamiarem jak najskuteczniejszego zaspokojenia potrzeb komunikacyjnych osób, które udzieliły pierwszej pomocy. Jestem otwarty na doskonalenie sugestii specjalistów, w granicach moich umiejętności, czasu dostępnego dla mnie, i możliwości technicznych nadajnika.

### Przegląd

Funkcja RescueOps została opracowana specjalnie w celu zintegrowania z systemem komunikacyjnym zaprojektowanym dla pierwszych ratowników (strażaków itp.). Dodaje ograniczone sterowanie polem i ulepszone zachowanie Flashlight, które można ustawić na tryby stałe, migotanie lub SOS. Menu `SetKey` wybiera klucz startowy używany w `PTT`, aby wejść lub opuścić tryb RescueOps. Domyślnie kluczem jest `MENU`, ale może być również `UP`, `DOWN`, `EXIT` lub `* SCAN`.

W oficjalnej rodzinie `v6.0.0` RescueOps jest zawarty w `FieldOps` i `Labs`. AirCopy jest oddzielną funkcją zapewnianą przez `Transfer` i `Labs`; włączenie RescueOps samo w sobie nie umożliwia AirCopy.

### Zastosowanie

> [!NOTE]
> [Emanuele](https://github.com/emanuelegissi), członek "[Corpo nazionale dei Vigili del fuoco](https://en.wikipedia.org/wiki/Vigili_del_Fuoco)", ma napisane [dokumentacja](https://github.com/emanuelegissi/uv-k5-firmware-custom/wiki) specjalnie poświęcone wykorzystaniu funkcji RescueOps. Wielkie dzięki.

Domyślnie transceiver działa jak każda inna wersja oprogramowania firmowego, umożliwiając dostęp do menu (i ukrytych menu), długich pras lub kombinacji kluczy `F`, aby aktywować różne funkcje bezpośrednio z klawiatury (na przykład, aby rozpocząć skanowanie lub dostosować moc transmisji), jak również skróty.

Jeśli jednak przekaźnik zostanie włączony podczas naciśnięcia zarówno `PTT`, jak i klawisza skonfigurowanego w menu `SetKey`, przełączy się on na tryb RescueOps, uruchamiając następujące zmiany:

* menu jest zablokowane
* długie prasy i kombinacje klawiszy `F` są wyłączone (z wyjątkiem `A/B` i blokady klawiatury)
* ponowne uruchomienie w trybie hidden- menu jest zablokowane
* klawiatura może być używana tylko do zmiany kanałów pamięci, tak jak klawisze `UP` i `DOWN`

Krótkie i długie prasy na `F1` i `F2`, a także długie prasy na `M`, pozostają dostępne dla skrótów. Ta konfiguracja jest obowiązkiem osoby odpowiedzialnej za ustawienie nadajnika. Jeśli skróty nie są pożądane, można je po prostu ustawić na działanie `NONE`.

Pamiętaj, że funkcja RescueOps oferuje 2 nowe działania:

* `POWER HIGH`, który pozwala na szybkie przełączanie do maksymalnej mocy `5 W` w razie potrzeby
* `REMOVE OFFSET`, aby tymczasowo usunąć przesunięcie kanału pamięci, jeśli występuje

Te dwa działania zostały dodane na wniosek specjalistów ds. ratownictwa i odpowiadają potrzebom w tej dziedzinie.

W trybie RescueOps każdy normalny start utrzymuje nadajnik w tym trybie. Aby powrócić do domyślnego trybu, z dostępem do menu i ukrytych menu, wystarczy powtórzyć operację startup jednocześnie naciskając jednocześnie `PTT` i klucz skonfigurowany w menu `SetKey`.

## Gra

To firmware zawiera małą grę breakout.

* W budowach bez aplikacji nakładanych naciśnij `F+7`, aby rozpocząć grę rezydenta.
* W wydaniu `Labs` `F+7` otwiera [overlay- app launcher](./Overlay-apps); instaluje i wybiera `Breakout` lub inną grę.
* Aby wyjść, naciśnij `EXIT`
* Możesz zatrzymać grę z `M`
* Przesuń wiosło używając `4` lub `UP`, aby przejść w lewo, a `0` lub `DOWN`, aby przejść w prawo

Ta gra nie ma ambicji poza zabawą. Ideą było po prostu zbadanie tego, co jest możliwe na Quansheng K5 obok jego funkcji radiowych. Pomyśl o tym jak o zabawnym skinieniu głowy w epoce Nokii 3310.

![Game](https://github.com/user-attachments/assets/45e20b92-3955-4313-84d7-6c831be1e176)

## UV Studio

[UV Studio](./UV-Studio) jest ujednoliconym towarzyszem bazującym na przeglądarce dla tego oprogramowania firmowego:

[https://armel.github.io/uvstudio/](https://armel.github.io/uvstudio/)

Zapewnia on przeglądanie, sterowanie, konserwację i odzyskiwanie danych w oparciu o przeglądarkę radiową:

* `128x64` lustrzany ekran na żywo
* wirtualne klawiatury UV-K1 i UV- K5 z obsługiwanymi krótkimi i długimi prasami
* kompatybilne strumieniowanie RF- log, analityka i eksport CSV
* oprogramowanie firmowe migające ze stabilnych katalogów edycji, konstrukcji rozwoju toczenia lub lokalnego pliku
* Multiboot firmware- slot i Labs overlay- app management
* tworzenie kopii zapasowej i przywracanie kalibracji
* niestandardowe boot- logo wysyłanie i pobieranie
* w `v1.6.0`, Labs- only external- Flash backup / przywracanie i odzyskiwania oprogramowania z przewodnikiem

Używa `Web Serial` i działa lokalnie w kompatybilnej przeglądarce bez instalacji, serwera lub konta.

> [!IMPORTANT]
> Sterowanie kluczami nie zapewnia zdalnego TX. UV Studio nie może uruchomić transmisji, a jego ekran `PTT` nie przekazuje.

Zobacz [UV Studio](./UV-Studio) dla statusu wersji, wymagań edycyjnych, trybów radiowych, informacji dotyczących bezpieczeństwa i kompletnych przepływów pracy.

## Wznowienie trybu

Twój nadajnik zacznie się ponownie w tym samym stanie, w jakim był, zanim został wyłączony. Więc jeśli był w trybie Bandscope, słuchając transmisji FM lub skanowania, automatycznie wznawia ten stan po następnym starcie.

## TX na wszystkich zespołach

### Ostrzeżenie

* * Ta modyfikacja jest NIEPRZESTRZENNA i jest przeznaczona wyłącznie do badań naukowych, aby zbadać możliwości urządzenia i jego chipset. NIE nadawać na nielegalnych częstotliwościach. Nie używaj manekina. Autor (-e) i podmiot (-y) przekazujący (-e) niniejsze repozytorium NIE ponosi odpowiedzialności za jakiekolwiek szkody, spory sądowe lub inne konsekwencje niewłaściwego wykorzystania tego oprogramowania badawczego i nie akceptuje żadnej winy. Instalując oprogramowanie firmowe z tego repozytorium, akceptujesz pełną odpowiedzialność za ewentualne konsekwencje i zrzekasz się prawa do podejmowania działań prawnych przeciwko autorom (-om).

Ta opcja nie pozwala na transmisję w modulacji innej niż FM; jest to ograniczenie sprzętowe. Przełączenie na AM lub SSB tylko zmienia tryb wyjścia audio AF w sterowniku RF IC. Nie przełącza całego IC na tryb AM / SSB. To tylko do słuchania. To oprogramowanie firmowe jest również zbudowane z dodatkowego zamka, który blokuje TX, gdy AM lub SSB jest włączone.

Na przykład, dlaczego nie powinno się tego używać do rzeczywistej komunikacji, należy rozważyć poniższy wykres mocy przesyłowej w `27.254 MHz`:

![txspectrum](https://github.com/egzumer/uv-k5-firmware-custom/assets/14902414/65cdcb90-01b3-4344-a06b-ac7b8c408899)

* `27.254 MHz` - > * * 228 mikrowatów
* `54 MHz` - > 2,4 miliwata
* `81 MHz` - > 230 miliwatów
* `109 MHz` - > 558 miliwatów
* `136 MHz` - > 412 miliwatów
* `163 MHz` - > 122 miliwatów
* `190 MHz` - > 14,8 miliwatów
* `218 MHz` - > 2 miliwaty
* `245 MHz` - > 2,6 miliwata

Kredyty: [Tunes1337 / UV- K5- Modded- Firmwares](https://github.com/Tunas1337/UV-K5-Modded-Firmwares#even-bigger-warning)

### Jak odblokować TX na wszystkich zespołach

1. Przejdź do [ukrytego menu](./Menu#hidden-menu)
1. Wprowadź menu `F Lock`
1. Wybierz opcję `UNLOCK ALL`
1. Powtórzyć czynności 2-3 * * 3 razy * *. Ostrożnie. Jeśli potwierdzisz inną opcję w procesie, licznik zostanie zresetowany i będziesz musiał powtórzyć procedurę ponownie.

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Operacja radiowa](./Radio-operation)
* [Skanowanie](./Scanning)
* [FoxHunt](./Fox-Hunt)
* [Beacon](./Beacon)
* [AirCopy](./AirCopy)
* [Menu](./Menu)
* [UV Studio](./UV-Studio)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [Aplikacje nakładkowe](./Overlay-apps)
* [Funkcje przycisku](./Button-functions)
* [Rozwiązywanie problemów](./Troubleshooting)
