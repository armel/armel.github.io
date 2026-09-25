# AirCopy

AirCopy przenosi kanały pamięci i ustawienia radiowe pomiędzy kompatybilnymi radiotelefonami. Wykorzystuje FSK na antenie i, począwszy od `v6.1.0`, może również korzystać z bezpośredniego połączenia szeregowego.

> [!IMPORTANT]
> AirCopy jest zawarty w edycjach `Transfer` i `Labs`. Nie jest częścią standardowego wydania `Fusion` lub `FieldOps`.

> [!WARNING]
> AirCopy nie jest przeznaczony do tworzenia kompatybilnych układów oprogramowania firmowego. Użyj tej samej generacji oprogramowania firmowego na obu radiach i wybierz tę samą sekcję danych na nadawcy i odbiorniku. Optymalizowany protokół `v6.1.0` nie jest kompatybilny z wcześniejszymi wersjami AirCopy.

## Uruchamianie AirCopy

1. Wyłącz radio.
1. Przytrzymaj `PTT` + `SIDE BUTTON 2️⃣` podczas włączania.
1. Uwolnić wszystkie klucze, gdy pojawi się ekran AirCopy.

Domyślna częstotliwość nadpowietrzna to `434.000 MHz` przy bardzo niskiej mocy. Przed rozpoczęciem transferu można wprowadzić inną dozwoloną częstotliwość z klawiaturą.

Użyj klawiszy nawigacyjnych, aby wybrać tę samą sekcję w obu radiach:

* `MEM 001 - 128`
* `MEM 129 - 256`
* `MEM 257 - 384`
* `MEM 385 - 512`
* `MEM 513 - 640`
* `MEM 641 - 768`
* `MEM 769 - 896`
* `MEM 897 - 1024`
* `Settings`
* `All (Mem+Set)`

Następnie uruchom cel przed źródłem:

1. Naciśnij `EXIT`.
1. W radiu wysyłającym naciśnij `M`.
1. Poczekaj na `AIR COPY OK` w obu radiach.

Każdy wybór pamięci przenosi kanały `128`, w tym nazwy kanałów i atrybuty. `Settings` zawiera ustawienia radiowe, nazwy listy skanów, obszar VFO używany przez `ScnRng`, wybór listy skanów `MIX` oraz zapisane preferencje FoxHunt i Beacon. `All (Mem+Set)` przenosi wszystkie osiem banków pamięci i ustawień w jednym uruchomieniu.

![AirCopy transfer screen](https://github.com/user-attachments/assets/93307d28-c2e2-4fe3-8bae-fad7f6e817ad)

## Niezawodny protokół w v6.0.0

`v6.0.0` wprowadził zatwierdzony protokół transferu:

* przed przechowywaniem danych odbiornik waliduje kadrowanie, offset i CRC
* odbiorca uznaje prawidłowe dane i odrzuca uszkodzone lub nieoczekiwane dane
* nadawca powtarza niepotwierdzony lub odrzucony blok do trzech razy
* duplikat danych jest potwierdzany nie będąc pisany dwa razy, odzyskując bezpiecznie z utraconego potwierdzenia
* ekran zgłasza postęp, ponowną liczbę prób (`RT`) i liczbę błędów odbioru (`ER`)

Bank pamięci zawiera `68` AirCopy bloków `64 bytes`; `Settings` zawiera `12` bloków. Ponieważ odbiornik wysyła potwierdzenia, oba radiotelefony przesyłają pokrótce na wybranej częstotliwości.

## v6.1.0 poprawa

### Szybsze transmisje radiowe

Nowy protokół zawiera do trzech bloków `64-byte` w jednej ramce danych FSK. W ten sposób zmniejsza się stały obrót i potwierdzenie napowietrznych i sprawia, że pełny transfer około dwa razy szybciej w podobnych warunkach radiowych.

Przed wysłaniem danych źródło dostarcza kody CRC32 dla grup do bloków `24`. Cel porównuje te haszcze z lokalnymi danymi i żąda tylko tych bloków, które się różnią. Powtórzenie kopii zapasowej lub synchronizacja dwóch niemal identycznych radiotelefonów może być zatem znacznie szybsze niż ponowne skopiowanie każdego bloku.

Wskaźnik postępu odróżnia dane, które były już identyczne z danymi rzeczywiście skopiowanymi. Protokół potwierdza również, że nadawca i odbiorca wybrali tę samą sekcję danych logicznych; niedopasowanie nie powiodło się zamiast przez pomyłkę pisać inną mapę.

### Kopia kablowa

Edycja `Transfer` dodaje `CABLE COPY` przez UART. Na ekranie przygotowanym naciśnij `* SCAN`, aby przełączyć się między transportem radiowym i kablowym. Tryb kablowy wykorzystuje to samo porównanie, potwierdzenie, ponowną próbę i kontrolę wyboru jako tryb radiowy, ale nie używa częstotliwości RF.

Wdrożenie zwiększa stawkę seryjną transferu i przywraca normalną stawkę po jego zakończeniu. Oba radiotelefony muszą uruchomić pasujące oprogramowanie do kopiowania kabli i używać kompatybilnego bezpośredniego połączenia szeregowego.

### Klonowanie zewnętrzne

Kiedy `CABLE COPY` jest aktywny w wydaniu `Transfer`, dodatkowy wybór `Flash 2M` może sklonować zewnętrzny Flash radia. Porównuje sektory `4 KiB` według CRC32 i pisze tylko różne sektory. Sektor kalibracji specyficzny dla danego urządzenia jest celowo wykluczony.

> [!WARNING]
> Klonowanie External- Flash może zastąpić szczeliny firmware, banki konfiguracyjne, aplikacje, logi, logi i inne wspólne dane external- Flash w radiu odbiorczym. Kopiuj najpierw ważne dane, sprawdzaj uważnie kierunek i nie rozłączaj się ani nie wyłączaj radia podczas pracy.

## Rozwiązywanie problemów

W przypadku niepowodzenia transferu:

* potwierdzić, że oba radia używają tej samej kompatybilnej wersji oprogramowania firmowego
* potwierdzić, że oba radia wykazują ten sam wybór i transport
* rozpocząć odbiór z `EXIT` przed rozpoczęciem transmisji z `M`
* do transmisji radiowej, zmniejszyć odległość lub odejść od zakłóceń
* do transmisji kablowej, sprawdzić bezpośrednie połączenie szeregowe i ponownie połączyć oba radia
* ponownie spróbować bez zmiany zaznaczenia

## Odpowiednie strony

* [Ostatnie zmiany](./Recent-changes)
* [Zaawansowane funkcje](./Advanced-features)
* [Skanowanie](./Scanning)
* [Multiboot i Multiconfig](./Multiboot-and-Multiconfig)
* [UV Studio](./UV-Studio)
* [Rozwiązywanie problemów](./Troubleshooting)
