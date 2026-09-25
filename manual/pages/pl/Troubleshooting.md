# Rozwiązywanie problemów

Ta strona gromadzi najczęstsze "coś jest nie tak" sytuacje już pokryte gdzie indziej w wiki, więc można znaleźć odpowiedni czek szybko.

## Mogę odbierać, ale nie mogę nadawać

Najpierw sprawdź te punkty:

1. Upewnij się, że `Mode` jest ustawiony na `FM`.
1. Sprawdź wybrany plan `F Lock`.
1. Jeśli częstotliwość jest poza tym planem, sprawdź czy `TXLock` jest ustawiony na `OFF`.
1. Szukaj małej kłódki obok kanału lub nazwy VFO.

Ważne przypomnienia:

* `AM` i `USB` są tylko do słuchania
* `UNLOCK ALL` nadal posiada dodatkową procedurę odblokowania

Patrz również: [Radiowa obsługa](./Radio-operation#about-the-f-lock-and-txlock-menus) i [Zaawansowane funkcje](./Advanced-features#tx-on-all-bands).

## Moje niestandardowe ustawienia zniknęły lub zmieniły się niespodziewanie

Nie stosować leku Quansheng CPS. Nadpisuje ustawienia niestandardowe.

Zamiast tego użyj sterownika `CHIRP` dostarczonego z każdym oprogramowaniem firmware lub innym kompatybilnym narzędziem programowania.

Patrz również: [Programowanie z CHIRP](./Programming-with-CHIRP), [Rozpoczęcie](./Getting-started) i [Operacja radiowa](./Radio-operation#basic-operation--configuration).

## Moje własne logo nie pokazuje

Sprawdź te punkty:

1. Upewnij się, że Twoja budowa oprogramowania firmowego zawiera obsługę logo
1. przesłać logo za pomocą [UV Studio](./UV-Studio#boot-logo) podczas gdy radio jest uruchamiane normalnie
1. Otwórz menu `POnMsg` i wybierz `LOGO`
1. ponownie uruchomić radio po zmianie ustawienia

Jeśli logo wygląda zbyt ciemno, zbyt jasno lub odwrotnie, należy przesłać go ponownie z UV Studio i dostosować `Threshold` lub `Invert colors` przed zapisaniem go do radia.

## Zmieniłem ustawienia kanału pamięci, ale nie został zapisany

Niektóre zmiany specyficzne dla danego kanału wpływają tylko na obecną tymczasową kopię tego kanału pamięci.

Jeśli zmienisz ustawienia kanału nadrzędnego, takie jak `Step`, `Power` lub inny parametr kanału i chcesz go zachować na stałe, zapisz kanał ponownie za pomocą `ChSave`, aby zapisać zaktualizowane ustawienia z powrotem do tego gniazda pamięci.

W przeciwnym razie, zmiana jest tylko tymczasowa i może zniknąć po przełączeniu kanału, tryb przełączania lub ponownie uruchomić radio.

Zob. także: [działanie radiowe](./Radio-operation#basic-operation--configuration) i [Menu](./Menu#main-menu).

## Skanowanie pamięci niczego nie znajduje

Sprawdź te punkty:

1. Upewnij się, że jesteś w `channel mode`, nie `frequency mode`.
1. Upewnij się, że kanał jest przypisany do listy skanów z `ScList` lub przez długie naciśnięcie `5 NOAA`.
1. Upewnij się, że aktualnie aktywna lista skanów nie jest pusta.
1. W razie potrzeby przełącz na inną poprawną listę skanowania podczas skanowania.

Oprogramowanie firmowe obsługuje listy skanowania `24` plus `ALL`. Jeśli żądana lista jest pusta lub nieprawidłowa, radio skacze do następnej poprawnej, niepustej listy.

Zob. także: [Skanowanie](./Scanning#memory-channels-scanning) i [Funkcje przycisku](./Button-functions#front-keypad).

## Nie mogę nastroić stacji telewizyjnej FM.

Możesz po prostu użyć niewłaściwego zakresu transmisji FM.

Podczas gdy odbiór transmisji FM jest aktywny, długotrwale naciśnij `1 BAND` do cyklu przez dostępne zakresy FM:

* `87.5` do `108 MHz`
* `76` do `108 MHz`
* `76` do `90 MHz`
* `64` do `76 MHz`

Obecnie zaznaczony zakres wyświetlany jest w lewym dolnym rogu ekranu FM, na przykład `87.5-108M`.

Bezpośrednie strojenie, ręczne skanowanie, automatyczne skanowanie i pamięci FM działają tylko wewnątrz aktualnie wybranego zakresu.

Zob. również: [odbiornik radiowy nadawany przez FM](./FM-broadcast-radio-receiver#change-the-fm-broadcast-range).

## Radio FM ciągle się zatrzymuje

Zazwyczaj jest to oczekiwane zachowanie.

Podczas odbioru FM, aktywny VFO ma nadal priorytet. Jeśli aktywność jest odbierana na aktywnym VFO, radio tymczasowo przełącza się z powrotem do odbioru VFO, a następnie powraca do transmisji FM po zakończeniu odbioru.

Zob. również: [odbiornik radiowy nadawany przez FM](./FM-broadcast-radio-receiver).

## odbiór AM brzmi zbyt ostro, zniekształcone lub zbyt stłumione

Spróbuj zmienić profil `SetRxA`, gdy radio jest w trybie `AM`.

W `AM`, `SetRxA` i cyklu działania klucza `RxA` pomiędzy:

* `SHARP`: węższe i bardziej selektywne, z lepszym odrzuceniem kanału adjacent-
* `STOCK`: najbliżej zachowania oprogramowania giełdowego
* `OPEN`: szerszy i bardziej otwarty, często milszy na słabych sygnałach

Jeśli jeden odbiór AM brzmi zbyt surowo w `SHARP`, spróbuj `STOCK` lub `OPEN`. Jeśli w `OPEN` brzmi zbyt miękko lub zbyt szeroko, spróbuj `SHARP`.

Patrz także: [Menu](./Menu#main-menu) i [Funkcje przycisku](./Button-functions#custom-button-functions).

## Słyszę tylko niektóre kanały lotnicze VHF kiedy otwieram monitor w `AM 8.33 kHz`

Często nie jest to problem wrażliwości. Zazwyczaj jest to mylenie pomiędzy `channel designator` (czasami nazywanym `channel number` lub `published channel`) a częstotliwością operacyjną.

Niektóre dokumenty lotnicze, strony internetowe lub aplikacje publikują `channel designator`, który wygląda jak normalna częstotliwość, ale nie zawsze częstotliwość operacyjna. Dedykowane radiostacje Aeronautyczne VHF 8.33 przetłumaczą automatycznie ten opublikowany designator kanału. Ten firmware wykonuje również tę korektę podczas wpisywania wartości bezpośrednio w radiu, ale `CHIRP` przechowuje wartość wprowadzoną jako częstotliwość operacyjna.

### Sprawa 1: Paris- Orly

Dla * * Paris- Orly (LFPO) * *, dokumentacja * * SIA * * rzeczywiście publikuje * * ATIS ORLY 126.505 (FR) * *, z * * 131.355 (EN) * * dla służby języka angielskiego.

* * [tabela korespondencyjna ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com) * * pokazuje, że opublikowany 8.33 designator kanału * * 126.505 * * odpowiada operacji częstotliwość * * 126.5000 MHz * *. Innymi słowy:

* * * Service: * * ATIS ORLY (FR)
* * * Channel designator: * * 126.505
* * * Częstotliwość robocza: * * 126.5000 MHz

Ważna różnica:

* jeśli wprowadzisz `126.5050` bezpośrednio w radiu, firmware koryguje go do pasującej częstotliwości operacyjnej, tutaj `126.5000 MHz`
* jeśli wprowadzisz `126.5050` w `CHIRP`, ta dokładna wartość jest zapisywana i używana jako -is, więc błąd tuning pozostaje

### Sprawa 2: Bruksela

Dla * * Brussels- National (EBBR) * *, opublikowany 8.33 designator kanału dla * * Brussels Ground (South) * * jest * * 121.880 * * w konsultacjach.

* * [tabela korespondencyjna ICAO](https://www.icao.int/sites/default/files/FSMP/Doc.9718-Vol-II_Supplement_30June2017.pdf?utm_source=chatgpt.com) * * pokazuje, że opublikowany 8.33 designator kanału * * 121.880 * * odpowiada operacji częstotliwość * * 121.8750 MHz * *. Innymi słowy:

* * * Serwis: * * Brussels Ground (Południe)
* * * Designator kanału: * * 121.880
* * * Częstotliwość robocza: * * 121.8750 MHz

Ważna różnica:

* jeśli wprowadzisz `121.8800` bezpośrednio w radiu, firmware koryguje go do pasującej częstotliwości operacyjnej, tutaj `121.8750 MHz`
* jeśli wprowadzisz `121.8800` w `CHIRP`, ta dokładna wartość jest zapisywana i używana jako -is, więc błąd tuning pozostaje

Krótko mówiąc, jeśli częstotliwość wprowadzona w `CHIRP` jest designatorem kanału * *, a nie częstotliwością operacyjną, może się wydawać, że monitor otwierany w `AM 8.33 kHz` przywraca odbiór, Ale prawdziwym problemem jest to, że opublikowany designator kanału został zinterpretowany jako częstotliwość operacyjna.

Jeśli usługa zaprogramowana z oznacznika kanału staje się słyszalna tylko wtedy, gdy otworzysz monitor w `AM 8.33 kHz`, najpierw spróbuj odpowiedniej częstotliwości roboczej, zwłaszcza gdy publikowana wartość kończy się na `...005`, `...010`, `...255`, `...505`, `...755` lub podobne 8.33- stylowe designatory kanałów.

Patrz również: 

[Ofcom: informacje o częstotliwościach 8,33 kHz i numerach kanałów](https://www.ofcom.org.uk/siteassets/resources/documents/manage-your-licence/aeronautical/guidance/understanding-8.33khz-frequencies-and-their-specific-channel-number.pdf?v=323879).

Przestań obwiniać swoje radio lub oprogramowanie. Obejrzyj ten film na moim kanale YouTube:
[Częstotliwości Lotnicze i MONITOR: Częstotliwość Kanału Bo (błąd, który zmienia wszystko)!](https://www.youtube.com/watch?v=Dpf3QzkDdaQ).

## Odsetek baterii lub napięcie wygląda źle

Sprawdź te punkty:

1. Upewnij się, że radio nie ładuje się przez `USB-C` podczas sprawdzania go
1. Użyj `BatTxt = VOLTAGE` lub otwartego `SysInf`
1. Upewnij się, że `BatTyp` pasuje do używanego zestawu baterii
1. porównanie wyświetlanego napięcia z multimetrem
1. w razie potrzeby, retrospect `BatCal`

Ważne przypomnienie:

* `BatCal` wpływa na odczyt napięcia
* `BatTyp` wpływa na szacunkowe wartości procentowe baterii

Zob. także: [działanie radiowe](./Radio-operation#battery-display-type-and-calibration) i [Menu](./Menu#hidden-menu).

## Zewnętrzny mikrofon PTT zachowuje się inaczej

To jest znane zachowanie w niektórych zmianach sprzętu.

Dokumentowane różnice obejmują:

* TX może poczekać, aż RX będzie czysty przed transmisją
* Tony DTMF lub 1750 Hz mogą zostać szybko odcięte

Strona wewnętrzna `PTT` nie pokazuje tych kwestii w udokumentowanych przypadkach.

Zob. także: [Funkcje przycisku](./Button-functions#external-microphone).

## Radio idzie spać niespodziewanie

Sprawdź te menu:

* `SetOff`: głęboki sen po okresie nieaktywności
* `BatSav`: stosunek aktywności do snu podczas normalnej pracy

Jeśli `SetOff` nie jest `OFF`, radio może wejść w tryb uśpienia po braku aktywności nawet podczas skanowania, o ile nie występuje odbiór.

FoxHunt i Beacon celowo ignorują `SetOff`. Jeśli radio nie śpi w żadnej aplikacji, zostaw go z `EXIT` przed zdiagnozowaniem zegara nieaktywności. Od `v6.0.0` są to niezależne aplikacje.

Zob. także: [działanie radiowe](./Radio-operation#about-the-setoff-menu).

## Nawigacja wydaje się poruszać w złym kierunku

Jeśli nawigacja menu lub niektóre sterowniki wydają się poruszać w złym kierunku, sprawdź najpierw element menu ukrytego `SetNav`.

To oprogramowanie nie może samodzielnie samodzielnie wykryć, czy działa na `UV-K1` czy `UV-K5`. Z tego powodu, styl nawigacji musiał być odsłonięty jako ustawienie menu.

`SetNav` pozwala wybrać pomiędzy:

* `LEFT / RIGHT / UV-K1`
* `UP / DOWN / UV-K5(8)`

To nie zmienia samej funkcji. Zmienia on tylko styl nawigacji używany przez oprogramowanie firmowe, a zatem sposób, w jaki urządzenia sterujące powinny być odczytywane w radiu.

Patrz również: [Rozpoczęcie](./Getting-started#model-differences) i [Menu](./Menu#hidden-menu).

## Guziki nie robią tego, czego oczekuję

Sprawdź te możliwości:

1. blokada klawiatury może być włączona
1. `SetLck` może również zablokować programowalny przycisk boczny / akcje `M Long`, `PTT` lub oba
1. Tryb RescueOps wyłącza większość długich pras i kombinacji klawiszy `F`
1. niektóre działania różnią się między `F+` a długim naciśnięciem
1. `F`, a następnie krótki przycisk boczny, naciśnij przycisk reguluje Krok, a `F` następnie przyciskiem bocznym otwiera picker akcji w aktualnych wersjach v6

Zob. także: [Funkcje przycisku](./Button-functions), [FoxHunt](./Fox-Hunt), [Beacon](./Beacon) i [Zaawansowane funkcje](./Advanced-features#rescueops).

## Power i SetPwr: moc nadawania dla kanału i globalna

Menu Power określa moc transmisji używaną przez bieżący kanał lub VFO. Dostępne wartości to LOW1 do LOW5, MID, HIGH lub USER. Ustawienie to jest zatem przechowywane lokalnie, na bazie kanału okołokanałowego.

Menu SetPwr nie wybiera bezpośrednio mocy dla określonego kanału. Określa tylko, jaki rzeczywisty poziom mocy jest przypisany do trybu USER, wybierając z LOW1 do LOW5, MID lub HIGH. To ustawienie jest globalne dla całego radia.

W rezultacie wszystkie kanały, których ustawienie mocy jest ustawione na USER, będą automatycznie używać wartości obecnie zdefiniowanej w SetPwr.

Mechanizm ten umożliwia zmianę efektywnej mocy wielu kanałów ustawionych na USER za jednym zamachem, bez konieczności indywidualnego edycji każdego kanału.

## Gdzie iść dalej

* [Zaczynając](./Getting-started)
* [Programowanie z CHIRP](./Programming-with-CHIRP)
* [UV Studio](./UV-Studio)
* [Operacja radiowa](./Radio-operation)
* [Skanowanie](./Scanning)
* [Zaawansowane funkcje](./Advanced-features)
* [Menu](./Menu)
* [Funkcje przycisku](./Button-functions)
