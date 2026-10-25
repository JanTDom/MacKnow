import { Mission, polishMission } from './types';

const RAW_IPHONE_MISSIONS: Mission[] = [
  {
    id: 'iphone-01-airdrop',
    track: 'iphone',
    level: 1,
    title: 'AirDrop w obie strony – przesyłaj zdjęcia między iPhonem a Makiem bez kabla',
    realLifeHook:
      'Gdy zrobiłaś na iPhonie zdjęcie dokumentu lub rodzinnej uroczystości i chcesz mieć je w trzy sekundy na ekranie MacBooka, bez wysyłania maila samej do siebie.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Powietrznego Mostu',
    synonyms: [
      'airdrop',
      'air drop',
      'przeslij zdjecie z iphone',
      'z telefonu na maca',
      'z maca na iphone',
      'przesylanie bez kabla',
      'wyslac fotke z telefonu',
      'nie widzi mojego iphone',
      'zrzucic zdjecia z telefonu',
      'udostepnij przez airdrop',
    ],
    theory: {
      id: 'theory-iphone-01-airdrop',
      category: 'iPhone i Mac (Continuity)',
      title: 'Niewidzialny gołąb pocztowy, który lata prosto między Twoim telefonem a MacBookiem',
      metaphor: 'Podanie zdjęcia z ręki do ręki nad stołem, bez pakowania go w kopertę i bez chodzenia na pocztę',
      story:
        'Przez lata przesłanie jednego zdjęcia z telefonu na komputer przypominało małą operację logistyczną: albo szukało się po szufladach pasującego kabla, albo człowiek wysyłał sam do siebie wiadomość e-mail z telefonem w ręku, czekając, aż załącznik przeleci przez pół świata i wróci na biurko. Na urządzeniach Apple istnieje coś nieporównywalnie przyjemniejszego: funkcja AirDrop (czyli dosłownie „zrzut powietrzny”). Kiedy Twój iPhone i Twój MacBook leżą obok siebie w tym samym pokoju i mają włączone Wi-Fi oraz Bluetooth, widzą się nawzajem bezpośrednio. Nie potrzebują nawet połączenia z internetem! Wystarczy, że na iPhonie pod zdjęciem stukniesz ikonę Udostępnij (kwadracik ze strzałką w górę), wybierzesz AirDrop i stukniesz ikonę swojego MacBooka. Sekundę później zdjęcie ląduje prosto w folderze Pobrane na Twoim Macu – w pełnej ostrości i bez żadnego kabla.',
      realExplanation:
        'AirDrop przesyła pliki bezpośrednio między urządzeniami Apple znajdującymi się w pobliżu (do kilku metrów), wykorzystując Bluetooth do odnalezienia urządzenia oraz bezpośrednie połączenie Wi-Fi do szybkiego transferu. Przesłane z iPhone’a pliki trafiają na Macu prosto do folderu „Pobrane”. W drugą stronę – z Maca na iPhone’a – wystarczy kliknąć plik w Finderze prawym przyciskiem myszy i wybrać Udostępnij → AirDrop.',
      oneLiner:
        'AirDrop przesyła zdjęcia i pliki między iPhonem a Makiem w kilka sekund bez kabla.',
      commonMyth:
        'Wiele osób myśli, że AirDrop zużywa pakiet internetu w telefonie. A tymczasem tworzy on bezpośredni most radiowy między urządzeniami w pokoju i działa nawet w środku lasu bez zasięgu sieci.',
      illustrationId: 'airdrop-cloud-bridge',
    },
    steps: [
      {
        instruction:
          'Upewnij się, że na MacBooku oraz na iPhonie masz włączone Wi-Fi oraz Bluetooth.',
        hint: 'Obie ikony sprawdzisz na górnym pasku menu Maca po prawej stronie.',
        hint2: 'Kliknij przycisk potwierdzenia w ćwiczeniu po sprawdzeniu Wi-Fi i Bluetooth.',
        verify: { type: 'simulatorAction', action: 'iphone-01-step-1' },
        simulatorScene: 'iphone-01-step-1',
        variants: [
          {
            osRange: '>=13',
            instruction:
              'Na górnym pasku menu Maca kliknij ikonę Centrum sterowania (dwa przełączniki obok zegarka) i upewnij się, że AirDrop jest włączony („Tylko kontakty” lub „Wszyscy przez 10 minut”).',
            hint: 'W nowszych systemach macOS przełącznik AirDrop znajdziesz od ręki w Centrum sterowania.',
            simulatorScene: 'iphone-01-step-1',
            verifyNeeded: true,
          },
        ],
      },
      {
        instruction:
          'Na iPhonie otwórz wybrane zdjęcie, stuknij ikonę „Udostępnij” (kwadrat ze strzałką w górę w lewym dolnym rogu) i wybierz „AirDrop”.',
        hint: 'Ikona udostępniania wygląda tak samo we wszystkich aplikacjach Apple.',
        hint2: 'Po wybraniu zdjęcia i kliknięciu AirDrop kliknij „Zrobione” poniżej.',
        verify: { type: 'simulatorAction', action: 'iphone-01-step-2' },
        simulatorScene: 'iphone-01-step-2',
      },
      {
        instruction:
          'Stuknij nazwę swojego MacBooka na ekranie iPhone’a i odbierz plik w folderze „Pobrane” na Macu.',
        hint: 'Przesłane przez AirDrop zdjęcia zawsze czekają w folderze Pobrane.',
        hint2: 'Kliknij przycisk „Zrobione”, aby ukończyć ćwiczenie AirDrop.',
        verify: {
          type: 'newFile',
          folder: '~/Downloads',
          pattern: '*.jpg|*.jpeg|*.png|*.heic|*.pdf',
        },
        simulatorScene: 'iphone-01-step-3',
      },
    ],
  },
  {
    id: 'iphone-02-zdjecia-icloud',
    track: 'iphone',
    level: 1,
    title: 'Zdjęcia i iCloud – jedna wspólna szafa widoczna z dwóch pokoi',
    realLifeHook:
      'Gdy chcesz przeglądać zdjęcia zrobione iPhonem na dużym, wygodnym ekranie MacBooka.',
    estimatedMinutes: 5,
    prerequisites: ['iphone-01-airdrop'],
    reward: 'Odznaka Kustoszka Albumów',
    synonyms: [
      'zdjecia icloud',
      'gdzie sa zdjecia z telefonu',
      'aplikacja zdjecia',
      'synchronizacja zdjec',
      'chmura zdjecia',
      'albumy z iphone na macu',
      'kolorowy kwiatek zdjecia',
      'pobrac zdjecie z icloud',
      'biblioteka zdjec',
      'wspolne zdjecia iphone mac',
    ],
    theory: {
      id: 'theory-iphone-02-zdjecia-icloud',
      category: 'iPhone i Mac (Continuity)',
      title: 'Czym jest chmura iCloud i dlaczego to nie balon w powietrzu, tylko szafa w ścianie między pokojami',
      metaphor: 'Wspólna szafa wnękowa, do której masz drzwiczki zarówno z sypialni (iPhone), jak i z gabinetu (Mac)',
      story:
        'Słowo „chmura” (iCloud) brzmi mgliście i tajemniczo, przez co wiele osób obawia się, że ich prywatne zdjęcia albo dokumenty unoszą się gdzieś w przestworzach. Zastąpmy więc chmurę dużo trafniejszym obrazem: wyobraź sobie dużą, zamkniętą na klucz szafę wnękową zbudowaną w ścianie między dwoma pokojami Twojego mieszkania. Od strony sypialni zaglądasz do niej przez drzwi iPhone’a, a od strony gabinetu otwierasz ją drzwiami MacBooka. Kiedy wkładasz do tej szafy nowe zdjęcie zrobione telefonem na spacerze, ono po chwili staje się widoczne również wtedy, gdy otworzysz szafę od strony komputera! Ale uwaga – ta zasada działa w obie strony: to jest jedna i ta sama szafa. Jeśli wyrzucisz zdjęcie z aplikacji Zdjęcia na iPhonie, zniknie ono również z aplikacji Zdjęcia na Macu, bo wyjęłaś je ze wspólnej półki.',
      realExplanation:
        'Usługa Zdjęcia iCloud oraz iCloud Drive synchronizuje Twoje fotografie i pliki między wszystkimi urządzeniami zalogowanymi na to samo konto Apple (Apple ID). Aplikacja „Zdjęcia” na Macu (ikona z kolorowym kwiatkiem w Docku) wyświetla tę samą bibliotekę, co aplikacja Zdjęcia w iPhonie. Aby użyć zdjęcia w mailu lub dokumencie, wystarczy przeciągnąć je z okna aplikacji Zdjęcia prosto na Pulpit.',
      oneLiner:
        'iCloud to wspólna szafa: co włożysz na iPhonie, widzisz na Macu, a co skasujesz tu, znika też tam.',
      commonMyth:
        'Wiele osób kasuje zdjęcia na iPhonie, żeby zwolnić miejsce, myśląc, że zostaną na Macu. A tymczasem skasowanie zdjęcia w Zdjęciach iCloud usuwa je na wszystkich zsynchronizowanych urządzeniach.',
      illustrationId: 'icloud-shared-wardrobe',
    },
    steps: [
      {
        instruction:
          'Otwórz aplikację „Zdjęcia” na Macu, klikając ikonę z kolorowym kwiatkiem (wiatraczkiem) w pasku Dock.',
        hint: 'Ikona programu Zdjęcia przypomina ośmiopłatkowy, tęczowy kwiatek na białym tle.',
        hint2: 'Otwórz aplikację Zdjęcia lub kliknij „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'frontmostApp', app: 'Photos' },
        simulatorScene: 'iphone-02-step-1',
      },
      {
        instruction:
          'Sprawdź na lewym pasku bocznym zakładkę „Biblioteka”, w której chronologicznie układają się Twoje fotografie.',
        hint: 'Możesz przewijać zdjęcia według lat, miesięcy lub wszystkich dni.',
        hint2: 'Kliknij przycisk „Zrobione” po obejrzeniu widoku Biblioteki.',
        verify: { type: 'simulatorAction', action: 'iphone-02-step-2' },
        simulatorScene: 'iphone-02-step-2',
      },
      {
        instruction:
          'Wypróbuj wyciągnięcie zdjęcia z albumu: chwyć dowolną fotografię i przeciągnij ją na Pulpit, aby powstała jej osobna kopia w pliku.',
        hint: 'Przeciągnięcie zdjęcia z programu Zdjęcia na Pulpit tworzy zwykły plik obrazka przygotowany do wysłania.',
        hint2: 'Kliknij „Zrobione”, aby zakończyć misję o wspólnej szafie iCloud.',
        verify: { type: 'simulatorAction', action: 'iphone-02-step-3' },
        simulatorScene: 'iphone-02-step-3',
      },
    ],
  },
  {
    id: 'iphone-03-hasla-pek-kluczy',
    track: 'iphone',
    level: 2,
    title: 'Hasła i pęk kluczy – jeden bezpieczny sejf na iPhonie i Macu',
    realLifeHook:
      'Gdy zarejestrowałaś się w sklepie na iPhonie, a tydzień później chcesz wejść na to samo konto na MacBooku bez szukania karteczki z hasłem.',
    estimatedMinutes: 5,
    prerequisites: ['programy-04-safari-pdf-hasla'],
    minOsVersion: '10.14',
    reward: 'Odznaka Strażniczki Kluczy',
    synonyms: [
      'pek kluczy',
      'hasla icloud',
      'wspolne hasla iphone mac',
      'aplikacja hasla',
      'klucze dostepu',
      'haslo z telefonu na komputerze',
      'sejf na hasla',
      'synchronizacja hasel',
      'logowanie bez wpisywania',
      'touch id hasla',
    ],
    theory: {
      id: 'theory-iphone-03-hasla-pek-kluczy',
      category: 'Ustawienia i bezpieczeństwo',
      title: 'Hotelowy portier z pękiem kluczy zamiast żółtych karteczek przyklejonych do monitora',
      metaphor: 'Wspólny, zaszyfrowany sejf na klucze otwierany odciskiem Twojego palca',
      story:
        'Każda strona w internecie – od apteki i sklepu z książkami po przychodnię lekarską – żąda dziś osobnego, trudnego hasła. Nic dziwnego, że człowiek ma ochotę zapisać je wszystkie na karteczce albo używać wszędzie jednego hasła z imieniem kota (co niestety jest wymarzonym prezentem dla internetowych złodziei). Na szczęście Twój Mac i Twój iPhone mają wspólnego, dyskretnego portiera: nazywa się Pęk kluczy iCloud (a w najnowszych systemach po prostu aplikacja „Hasła”). Kiedy zakładasz konto na nowej stronie w Safari, Mac proponuje utworzenie mocnego hasła i od razu chowa je do wspólnego sejfu. Pięć minut później bierzesz do ręki iPhone’a, wchodzisz na tę samą stronę, przykładasz palec lub spoglądasz w ekran (Face ID), a telefon sam wyjmuje właściwy klucz z tego samego sejfu i wpisuje go za Ciebie!',
      realExplanation:
        'Pęk kluczy iCloud bezpiecznie szyfruje i synchronizuje Twoje loginy, hasła do stron internetowych oraz hasła do sieci Wi-Fi między iPhonem a Makiem. Na systemach od macOS 15 Sequoia zarządzasz nimi w osobnej aplikacji systemowej „Hasła”, na macOS 13–14 w Ustawieniach systemowych → Hasła, a na starszych wersjach (macOS 10.14–12) w Preferencjach Safari → Hasła.',
      oneLiner:
        'Hasło zapisane w Safari na iPhonie automatycznie czeka na Ciebie również na MacBooku.',
      commonMyth:
        'Wiele osób myśli, że zapisywanie haseł w przeglądarce Safari jest mniej bezpieczne niż na papierze. A tymczasem Pęk kluczy Apple jest szyfrowany i chroniony Twoim odciskiem palca lub hasłem systemowym.',
      illustrationId: 'passwords-vault-keychain',
    },
    steps: [
      {
        instruction:
          'Otwórz sejf z hasłami na swoim Macu i odblokuj go odciskiem palca Touch ID lub hasłem do komputera.',
        hint: 'Zależnie od wersji macOS będzie to aplikacja Hasła, sekcja Hasła w Ustawieniach lub Preferencje Safari.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'iphone-03-step-1' },
        simulatorScene: 'iphone-03-step-1',
        variants: [
          {
            osRange: '<13',
            instruction:
              'W przeglądarce Safari wybierz z górnego menu Safari → „Preferencje…”, kliknij zakładkę „Hasła” i wpisz hasło do swojego Maca.',
            hint: 'W systemach macOS 10.14–12 wszystkie hasła z iCloud widoczne są w oknie Preferencji Safari.',
            simulatorScene: 'iphone-03-step-1',
          },
          {
            osRange: '>=13 <15',
            instruction:
              'Kliknij jabłuszko  → „Ustawienia systemowe…”, przewiń lewy pasek do pozycji „Hasła” i odblokuj ją.',
            hint: 'W systemach Ventura i Sonoma hasła mają osobną pozycję na pasku Ustawień systemowych.',
            simulatorScene: 'iphone-03-step-1',
          },
          {
            osRange: '>=15',
            instruction:
              'Otwórz aplikację „Hasła” (ikona ze złotym pękiem kluczy w Docku lub przez Spotlight ⌘Spacja) i odblokuj ją.',
            hint: 'Od wersji macOS 15 Sequoia wszystkie hasła zgromadzone są w osobnej aplikacji „Hasła”.',
            simulatorScene: 'iphone-03-step-1',
            verifyNeeded: true,
          },
        ],
      },
      {
        instruction:
          'Użyj pola wyszukiwania na górze listy haseł, aby w sekundę znaleźć zapisane konto wybranego sklepu lub poczty.',
        hint: 'Nie musisz przewijać całej listy alfabetycznej – wpisz dwie pierwsze litery nazwy strony.',
        hint2: 'Kliknij „Zrobione”, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'iphone-03-step-2' },
        simulatorScene: 'iphone-03-step-2',
      },
      {
        instruction:
          'Sprawdź, że po kliknięciu wybranej pozycji możesz jednym ruchem skopiować hasło lub podejrzeć login.',
        hint: 'Gdy logujesz się w Safari, przeglądarka sama podpowiada te dane nad klawiaturą.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję o sejfie z hasłami.',
        verify: { type: 'simulatorAction', action: 'iphone-03-step-3' },
        simulatorScene: 'iphone-03-step-3',
      },
    ],
  },
  {
    id: 'iphone-04-handoff-schowek',
    track: 'iphone',
    level: 2,
    title: 'Handoff i Uniwersalny schowek – skopiuj na iPhonie, wklej na Macu',
    realLifeHook:
      'Gdy masz w telefonie numer telefonu, adres albo kod śledzenia paczki i chcesz wkleić go prosto do dokumentu na MacBooku.',
    estimatedMinutes: 5,
    prerequisites: ['macos-06-skroty', 'iphone-01-airdrop'],
    reward: 'Odznaka Mistrzyni Ciągłości',
    synonyms: [
      'handoff',
      'uniwersalny schowek',
      'skopiuj na iphone wklej na macu',
      'kopiowanie miedzy telefonem a komputerem',
      'dokoncz na macu',
      'ikona z telefonem w docku',
      'przenoszenie strony z iphone',
      'wspolny schowek',
      'continuity',
      'ciaglosc pracy',
    ],
    theory: {
      id: 'theory-iphone-04-handoff-schowek',
      category: 'iPhone i Mac (Continuity)',
      title: 'Jedna wspólna taca schowka dla obu urządzeń i przekazywanie pałeczki w biegu',
      metaphor: 'Wspólna taca kelnerska stojąca dokładnie pomiędzy Twoim telefonem a komputerem',
      story:
        'Pamiętasz naszą metaforę schowka (⌘C i ⌘V) jako kelnerskiej tacy, na której niesiesz skopiowane zdanie? Jeśli Twój iPhone i MacBook leżą blisko siebie, dzieje się rzecz niemal magiczna: oba urządzenia korzystają z tej samej wspólnej tacy! Nazywa się to Uniwersalnym schowkiem. Możesz zaznaczyć numer konta albo ciekawy cytat na ekranie iPhone’a, stuknąć palcem „Kopiuj”, a sekundę później położyć dłonie na klawiaturze MacBooka i wcisnąć ⌘V (Wklej) – tekst z telefonu od razu wskoczy na ekran komputera! Równie sprytnie działa funkcja Handoff (czyli przekazywanie pałeczki w sztafecie): jeśli zaczynasz czytać długi artykuł w Safari na iPhonie albo zaczęłaś pisać maila w fotelu, podchodzisz do MacBooka i na samym brzegu paska Dock pojawia się dodatkowa ikona Safari z małym symbolem telefonu. Klikasz ją i czytasz dalej dokładnie od tego samego akapitu.',
      realExplanation:
        'Funkcje Uniwersalny schowek oraz Handoff są częścią technologii Ciągłość (Continuity) w ekosystemie Apple. Wymagają zalogowania obu urządzeń na to samo konto Apple ID oraz włączonego Wi-Fi i Bluetooth. Skopiowany na jednym urządzeniu tekst lub obraz jest przez około dwie minuty dostępny do wklejenia (⌘V) na drugim urządzeniu.',
      oneLiner:
        'Skopiuj tekst na iPhonie i od razu wciśnij ⌘V na MacBooku – oba urządzenia dzielą wspólny schowek.',
      commonMyth:
        'Wiele osób przepisuje długie numery i adresy z ekranu telefonu na klawiaturze komputera literka po literce. A tymczasem zwykłe „Kopiuj” na iPhonie i ⌘V na Macu przenosi tekst bez jednej pomyłki.',
      illustrationId: 'handoff-universal-clipboard',
    },
    steps: [
      {
        instruction:
          'Sprawdź na Macu, czy funkcja Handoff jest włączona w Ustawieniach systemowych (Ogólne → AirDrop i Handoff).',
        hint: 'Zazwyczaj funkcja „Pozwalaj na Handoff między tym Makiem a urządzeniami iCloud” jest włączona domyślnie.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'iphone-04-step-1' },
        simulatorScene: 'iphone-04-step-1',
        variants: [
          {
            osRange: '<13',
            instruction:
              'W Preferencjach systemowych kliknij ikonę „Ogólne” i upewnij się, że na dole zaznaczone jest pole „Pozwalaj na Handoff między tym Makiem a urządzeniami iCloud”.',
            hint: 'W systemach macOS 10.13–12 przełącznik Handoff znajduje się bezpośrednio na dole panelu Ogólne.',
            simulatorScene: 'iphone-04-step-1',
          },
          {
            osRange: '>=13',
            instruction:
              'W Ustawieniach systemowych wybierz „Ogólne” → „AirDrop i Handoff” i sprawdź, czy przełącznik Handoff jest aktywny.',
            hint: 'Od wersji macOS 13 Ventura ustawienia AirDrop i Handoff mają wspólną zakładkę w sekcji Ogólne.',
            simulatorScene: 'iphone-04-step-1',
            verifyNeeded: true,
          },
        ],
      },
      {
        instruction:
          'Zaznacz dowolne słowo na swoim iPhonie i stuknij „Kopiuj”, a następnie na MacBooku wklej je skrótem ⌘V.',
        hint: 'Odczekaj jedną sekundę po skopiowaniu na telefonie, aby schowek przesłał tekst przez Bluetooth.',
        hint2: 'Kliknij przycisk „Zrobione” poniżej, aby przejść dalej.',
        verify: { type: 'simulatorAction', action: 'iphone-04-step-2' },
        simulatorScene: 'iphone-04-step-2',
      },
      {
        instruction:
          'Otwórz stronę w Safari na iPhonie i spójrz na skraj paska Dock na MacBooku – zobaczysz tam ikonę Safari ze znaczkiem telefonu.',
        hint: 'Kliknięcie tej ikony w Docku natychmiast otwiera tę samą stronę na dużym ekranie Maca.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję.',
        verify: { type: 'simulatorAction', action: 'iphone-04-step-3' },
        simulatorScene: 'iphone-04-step-3',
      },
    ],
  },
  {
    id: 'iphone-05-imessage-sms',
    track: 'iphone',
    level: 2,
    title: 'Wiadomości i SMS-y na Macu – pisz wygodnie na dużej klawiaturze',
    realLifeHook:
      'Gdy chcesz odpisać na dłuższą wiadomość rodzinie bez stukania jednym palcem w małą szybkę telefonu albo odczytać kod SMS z banku.',
    estimatedMinutes: 5,
    prerequisites: ['iphone-01-airdrop'],
    reward: 'Odznaka Wygodnego Pióra',
    synonyms: [
      'wiadomosci',
      'imessage',
      'sms na macu',
      'odpisywanie na smsy z komputera',
      'kod z banku na macu',
      'zielona chmurka wiadomosci',
      'pisanie smsow na klawiaturze',
      'brak smsow na macu',
      'przekazywanie wiadomosci',
      'czat z iphone na macu',
    ],
    theory: {
      id: 'theory-iphone-05-imessage-sms',
      category: 'Poczta i komunikacja',
      title: 'Jak iPhone przekazuje wiadomości na ekran MacBooka i po co są kolory dymków',
      metaphor: 'Sekretarka, która kładzie na Twoim biurku kopię każdego SMS-a przychodzącego na telefon',
      story:
        'Pisanie dłuższej wiadomości na ekranie telefonu bywa męczące – palec omsknie się na sąsiednią literkę, słownik podpowie coś zabawnego i zamiast dwóch zdań spędzamy pięć minut na poprawkach. Na MacBooku masz do dyspozycji dokładnie tę samą aplikację „Wiadomości” (zielona lub niebieska chmurka dialogowa w Docku), którą znasz z iPhone’a. Kiedy obie rzeczy są połączone Twoim kontem Apple, na ekranie komputera widzisz wszystkie swoje rozmowy i możesz odpisywać pełnymi zdaniami na wygodnej, dużej klawiaturze! Co więcej, jeśli w ustawieniach iPhone’a włączysz „Przekazywanie wiadomości SMS”, na Macu pojawią się nawet zwykłe zielone SMS-y od kuriera czy z banku. Mała podpowiedź na przyszłość: niebieskie dymki wiadomości (iMessage) wędrują za darmo przez internet do innych właścicieli iPhone’ów, a zielone dymki to klasyczne wiadomości SMS idące przez sieć komórkową Twojego telefonu.',
      realExplanation:
        'Aplikacja „Wiadomości” (Messages) w systemie macOS synchronizuje rozmowy iMessage z Twoim iPhonem. Aby na Macu odbierać i wysyłać także zwykłe wiadomości SMS (np. od osób z telefonami z systemem Android lub kody autoryzacyjne), w iPhonie wejdź w Ustawienia → Aplikacje → Wiadomości → Przekazywanie wiadomości i włącz przełącznik przy nazwie swojego MacBooka.',
      oneLiner:
        'Aplikacja Wiadomości w Docku pozwala czytać i pisać SMS-y z iPhone’a na wygodnej klawiaturze Maca.',
      commonMyth:
        'Wiele osób myśli, że z Maca można pisać tylko do innych posiadaczy iPhone’ów. A tymczasem po włączeniu przekazywania SMS-ów w telefonie odpiszesz z Maca na każdy numer telefonu.',
      illustrationId: 'imessage-bubbles-sync',
    },
    steps: [
      {
        instruction:
          'Kliknij w Docku ikonę aplikacji „Wiadomości” (chmurka dialogowa), aby otworzyć listę swoich rozmów.',
        hint: 'Ikona Wiadomości znajduje się w dolnym pasku Dock obok programu Mail i Safari.',
        hint2: 'Otwórz aplikację Wiadomości lub kliknij „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'frontmostApp', app: 'Messages' },
        simulatorScene: 'iphone-05-step-1',
      },
      {
        instruction:
          'W telefonie iPhone sprawdź Ustawienia → Wiadomości → „Przekazywanie wiadomości” i upewnij się, że Twój MacBook jest włączony na liście.',
        hint: 'To jednorazowe ustawienie sprawia, że również zwykłe zielone SMS-y pokazują się na Macu.',
        hint2: 'Kliknij przycisk „Zrobione” poniżej, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'iphone-05-step-2' },
        simulatorScene: 'iphone-05-step-2',
      },
      {
        instruction:
          'Wybierz dowolną rozmowę po lewej stronie okna Wiadomości i zobacz, jak wygodnie wpisuje się tekst na klawiaturze MacBooka.',
        hint: 'Naciśnięcie klawisza Enter wysyła wpisaną wiadomość.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję o Wiadomościach.',
        verify: { type: 'simulatorAction', action: 'iphone-05-step-3' },
        simulatorScene: 'iphone-05-step-3',
      },
    ],
  },
  {
    id: 'iphone-06-facetime',
    track: 'iphone',
    level: 1,
    title: 'FaceTime na Macu – rodzinne rozmowy wideo bez trzymania telefonu w dłoni',
    realLifeHook:
      'Gdy dzwoni córka, wnuki albo przyjaciółka na dłuższą rozmowę wideo i nie chcesz przez godzinę trzymać telefonu w wyciągniętej ręce.',
    estimatedMinutes: 4,
    prerequisites: ['programy-07-zoom-teams-dolacz'],
    reward: 'Odznaka Bliskiego Kontaktu',
    synonyms: [
      'facetime',
      'rozmowa wideo z rodzina',
      'zadzwonic z maca',
      'zielona kamerka',
      'odbieranie telefonu na macu',
      'dzwoni mac razem z telefonem',
      'polaczenie wideo apple',
      'rozmowa glosowa z komputera',
      'kamera w facetime',
      'link do facetime',
    ],
    theory: {
      id: 'theory-iphone-06-facetime',
      category: 'Wideorozmowy',
      title: 'Dlaczego MacBook potrafi dzwonić razem z Twoim iPhonem i jak wygodnie rozmawiać przy stole',
      metaphor: 'Drugi aparat telefoniczny w mieszkaniu podłączony do tej samej linii domowej',
      story:
        'Czasem siedzisz przy MacBooku, telefon leży w torebce w przedpokoju, i nagle z głośników komputera rozlega się dzwonek telefonu, a w prawym górnym rogu ekranu wyskakuje imię dzwoniącej osoby! Pierwsza myśl: skąd komputer ma kartę telefoniczną?! Nie ma – po prostu Twój iPhone w przedpokoju odebrał połączenie i grzecznie zapytał MacBooka: „Małgorzata siedzi teraz przy Tobie, czy chcesz, żeby odebrała u Ciebie?”. Do rozmów wideo i głosowych z bliskimi posiadającymi urządzenia Apple służy wbudowany program FaceTime (zielona ikona z białą kamerką). Największa zaleta FaceTime’a na MacBooku jest czysto praktyczna: stawiasz komputer stabilnie na stole, masz obie ręce wolne do trzymania kubka z herbatą, a na dużym ekranie widzisz całą rodzinę naraz, a nie tylko kawałek czoła w małym okienku smartfona.',
      realExplanation:
        'Aplikacja FaceTime w systemie macOS umożliwia prowadzenie darmowych rozmów wideo i audio przez internet z użytkownikami urządzeń Apple (a w nowszych systemach od macOS 12 Monterey również zapraszanie innych osób za pomocą linku). Dodatkowo funkcja „Połączenia z iPhone’a” pozwala odbierać i wykonywać zwykłe połączenia telefoniczne z poziomu Maca, gdy iPhone znajduje się w tej samej sieci Wi-Fi.',
      oneLiner:
        'FaceTime na Macu daje duży, stabilny obraz rozmówcy i uwalnia Twoje ręce od trzymania telefonu.',
      commonMyth:
        'Wiele osób myśli, że jeśli nie chcą, by Mac dzwonił razem z telefonem, muszą wylogować się z iCloud. A tymczasem w ustawieniach aplikacji FaceTime można jednym kliknięciem wyłączyć „Połączenia z iPhone’a”.',
      illustrationId: 'facetime-video-family',
    },
    steps: [
      {
        instruction:
          'Otwórz aplikację „FaceTime” z paska Dock lub przez Spotlight (⌘Spacja → wpisz FaceTime).',
        hint: 'Ikona FaceTime to biała kamera filmowa na zielonym tle.',
        hint2: 'Otwórz aplikację FaceTime lub kliknij przycisk „Zrobione” poniżej.',
        verify: { type: 'frontmostApp', app: 'FaceTime' },
        simulatorScene: 'iphone-06-step-1',
      },
      {
        instruction:
          'Sprawdź przycisk „Nowe połączenie FaceTime”, w którym możesz wpisać imię osoby ze swoich Kontaktów.',
        hint: 'FaceTime automatycznie korzysta z tej samej książki adresowej Kontaktów, którą masz w iPhonie.',
        hint2: 'Kliknij „Zrobione”, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'iphone-06-step-2' },
        simulatorScene: 'iphone-06-step-2',
      },
      {
        instruction:
          'Spójrz na górne menu FaceTime → Ustawienia, gdzie w razie potrzeby możesz włączyć lub wyciszyć dzwonienie połączeń z iPhone’a na Macu.',
        hint: 'Dzięki temu sama decydujesz, czy Mac ma dzwonić razem z telefonem.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć całą ścieżkę iPhone + Mac!',
        verify: { type: 'simulatorAction', action: 'iphone-06-step-3' },
        simulatorScene: 'iphone-06-step-3',
      },
    ],
  },
];

export const IPHONE_MISSIONS: Mission[] = RAW_IPHONE_MISSIONS.map(polishMission);
