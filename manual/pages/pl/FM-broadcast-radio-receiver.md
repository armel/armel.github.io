# Odbiornik nadawczy FM

Radio może odbierać transmisję FM od `76` do `108 MHz`. Używa do tego osobnego chipa (`BK1080`). RDS nie jest obsługiwany.

_ Podczas normalnego słuchania, aktywny VFO ma nadal priorytet. Recepcja na aktywnym VFO tymczasowo wyłącza transmisję audio; na koniec odbioru VFO radio włącza się ponownie do transmisji. Podczas aktywnego uruchamiania ręcznego lub automatycznego skanowania stacji FM, `v5.9.0` tymczasowo ignoruje odbiór głównego kanału, aby skanowanie stacji mogło zakończyć się bez przerywania. _

> [!NOTE]
> W przypadku gdy ta strona wymienia `UP` / `DOWN`, użyj równoważnych klawiszy `LEFT` / `RIGHT` na UV-K1. Aktywny układ nawigacyjny następuje po `SetNav`.

> [!NOTE]
> - aktywny VFO ma pierwszeństwo podczas normalnego słuchania, ale nie podczas aktywnego skanowania stacji FM
> - auto skanowanie nadpisuje wszystkie wspomnienia `48` FM

![FM](https://github.com/user-attachments/assets/5737c8e4-802d-44e1-a540-da28707eabaa)

## Operacje podstawowe

* `F` + `0 FM`, długo naciśnięty `0 FM`, lub [funkcja przycisków niestandardowych](./Button-functions#custom-button-functions) rozpoczyna odbiór transmisji
* `EXIT`, lub używając tego samego polecenia startu ponownie, gdy radio jest w trybie FM, kończy odbiór transmisji
* `F` + `3 VFO/MR` lub `3 VFO/MR` o długim ciśnieniu, zmienia się pomiędzy trybem VFO a trybem pamięci

### Ustaw częstotliwość w trybie FM- VFO

Po prostu wpisywanie częstotliwości odczytuje odbiornik. Rozdzielczość to `100 kHz`, więc wprowadzamy melodie `929` do `92.9 MHz`. Użyj klawiszy strzałek, aby zmienić w krokach `100 kHz`.

### Zmiana zakresu transmisji FM

Jeśli nie możesz nastroić stacji, której się spodziewasz, możesz po prostu być w złym zasięgu FM.

Podczas gdy odbiór transmisji FM jest aktywny, długotrwale naciśnij `1 BAND` do cyklu przez dostępne zakresy FM:

* `87.5` do `108 MHz`
* `76` do `108 MHz`
* `76` do `90 MHz`
* `64` do `76 MHz`

Obecnie zaznaczony zakres wyświetlany jest w lewym dolnym rogu ekranu FM, na przykład `87.5-108M`.

Bezpośrednie strojenie, ręczne skanowanie, automatyczne skanowanie i pamięci FM działają tylko wewnątrz aktualnie wybranego zakresu. Jeśli stacja lub zachowana pamięć FM jest poza tym zakresem, przełącz się najpierw na inny zespół FM.

### Przechowuj w pamięci z trybu FM- VFO

Naciśnięcie `M` w trybie VFO pozwala na przechowywanie bieżącej częstotliwości w kanale pamięci. Użyj klawiszy strzałek, aby wybrać pamięć, a następnie potwierdzić za pomocą `M`. Są dostępne wspomnienia `48`.

### Wybierz pamięć

W trybie MR wpisanie `01` do `48` wybiera kanał pamięci. Użyj `UP` / `DOWN`, aby przejść przez kanały pamięci.

### Usuń zapisaną pamięć

W trybie MR naciśnięcie `M` pozwala usunąć ten kanał pamięci.

## Skanowanie stacji FM- VFO

### Automatyczne skanowanie

Zacznij od `F` + `* Scan` lub przez długie tłoczenie `* Scan`.
Radio skanuje stacje i przechowuje pierwsze stacje `48` w pamięci. Skanowanie zaczyna się w dolnej części zespołu. Uruchomienie automatycznego skanowania usuwa wcześniej zapisane kanały. `EXIT` kończy automatyczne skanowanie.

Podczas pracy automatycznego skanowania sygnał nadchodzący wykryty na głównym kanale nadajnika nie przerywa skanowania FM. Normalny priorytet kanału głównego zostanie przywrócony jak tylko przestanie skanować FM.

### Skanowanie ręczne

Krótka prasa na `* Scan` rozpoczyna ręczne skanowanie. Radio skanuje w górę od bieżącej częstotliwości do momentu otrzymania stacji. Możesz kontynuować skanowanie w obu kierunkach za pomocą klawiszy strzałek. `EXIT` zatrzymuje tryb skanowania.

Ten sam tymczasowy wyjątek kanału głównego stosuje się podczas ręcznego skanowania. Gdy skanowanie zatrzyma się na stacji lub zostanie anulowane, zwykłe słuchanie transmisji ponownie wraca do odbioru na aktywnym VFO.

## Funkcje przycisku

* `1 BAND` - długa prasa, przełącz zakresy transmisji FM
* `3 VFO/MR` - tryb częstotliwości / pamięci przełącznika
* `* SCAN`
   * krótka prasa - uruchamianie pojedynczego skanowania
   * Long press - uruchom automatyczne skanowanie (wszystkie kanały pamięci zostaną usunięte i zastąpione wynikami skanowania)

## Odpowiednie strony

* [Zaczynając](./Getting-started)
* [Funkcje przycisku](./Button-functions)
* [Operacja radiowa](./Radio-operation)
* [Rozwiązywanie problemów](./Troubleshooting)
