import { Mission, polishMission } from './types';

const RAW_PROGRAMY_MISSIONS: Mission[] = [
  {
    id: 'programy-01-mail-zalacznik',
    track: 'programy',
    level: 1,
    title: 'Mail – jak dołączyć załącznik i zapisać plik z poczty',
    realLifeHook:
      'Gdy musisz wysłać księgowej albo lekarzowi dokument PDF i chcesz mieć pewność, że plik naprawdę dołączył się do wiadomości.',
    estimatedMinutes: 5,
    prerequisites: ['macos-02-pobrane'],
    reward: 'Odznaka Mistrzyni Korespondencji',
    synonyms: [
      'zalacznik w mailu',
      'wyslac plik mailem',
      'spinacz',
      'dodac pdf do maila',
      'jak wyslac zdjecie mailem',
      'poczta zalacznik',
      'nie moge dolaczyc pliku',
      'dolacz plik',
      'wysylanie dokumentu',
      'zalaczyc fakture',
      'pobrac zalacznik z maila',
    ],
    theory: {
      id: 'theory-programy-01-mail-zalacznik',
      category: 'Poczta i komunikacja',
      title: 'Metalowy spinacz biurowy, który przypina dokument do papierowego listu',
      metaphor: 'Włożenie wydrukowanej faktury do tej samej koperty, w której wysyłasz list',
      story:
        'Wysyłanie załącznika w programie Mail przypomina pakowanie tradycyjnej koperty na poczcie. Sam tekst wiadomości to krótki liścik: „Dzień dobry, przesyłam rozliczenie”. Załącznik to osobna kartka lub zdjęcie, które spinasz z tym liścikiem metalowym spinaczem biurowym. Dlatego w każdym programie pocztowym na świecie ikona dodawania pliku wygląda właśnie jak mały, wygięty spinacz! Na Macu masz dwie równie wygodne drogi: możesz kliknąć ten spinacz na górnym pasku okna nowej wiadomości i wskazać plik z folderu Dokumenty albo Pobrane, albo po prostu chwycić plik leżący na Pulpicie i przeciągnąć go myszką prosto w białe pole pisania listu. Kiedy na dole wiadomości zobaczysz miniaturkę dokumentu albo jego ikonę z nazwą – masz stuprocentową pewność, że plik siedzi już w kopercie.',
      realExplanation:
        'W aplikacji Mail (oraz w poczcie otwieranej w przeglądarce) załącznik dodaje się przyciskiem z ikoną spinacza na pasku narzędzi wiadomości lub metodą przeciągnij i upuść (z okna Findera bądź z Pulpitu do treści wiadomości). Z kolei gdy sama otrzymasz wiadomość z załącznikiem, po najechaniu kursorem na podgląd pliku w mailu kliknij przycisk „Zachowaj” lub przeciągnij załącznik wprost na Pulpit.',
      oneLiner:
        'Ikona spinacza przypina Twój plik do wiadomości, a przeciągnięcie z Pulpitu działa równie pewnie.',
      commonMyth:
        'Wiele osób myśli, że gdy wkleją samą nazwę pliku do treści maila, odbiorca go otworzy. A tymczasem trzeba dołączyć sam plik spinaczem, aby jego zawartość powędrowała z wiadomością.',
      illustrationId: 'mail-attachment-paperclip',
    },
    steps: [
      {
        instruction:
          'W oknie nowej wiadomości w programie Mail kliknij ikonę spinacza na górnym pasku narzędzi, aby wybrać plik z dysku.',
        hint: 'Ikona spinacza znajduje się w górnej części okna tworzenia wiadomości.',
        hint2: 'Kliknij podświetlony przycisk ze spinaczem w oknie programu Mail.',
        verify: { type: 'simulatorAction', action: 'mail-01-click-attachment' },
        simulatorScene: 'programy-mail-01-step-1',
      },
      {
        instruction:
          'Wskaż dokument „Rozliczenie-2026.pdf” z folderu Dokumenty i kliknij „Wybierz plik”, aby włożyć go do wiadomości.',
        hint: 'Po kliknięciu pliku przycisk potwierdzenia dołączy go do treści maila.',
        hint2: 'Kliknij podświetlony przycisk wyboru dokumentu „Rozliczenie-2026.pdf”.',
        verify: { type: 'simulatorAction', action: 'mail-01-select-file' },
        simulatorScene: 'programy-mail-01-step-2',
      },
      {
        instruction:
          'Upewnij się, że plik widnieje w treści wiadomości, i kliknij przycisk wysyłania (papierowy samolocik).',
        hint: 'Przycisk „Wyślij” przypomina mały papierowy samolocik w rogu okna wiadomości.',
        hint2: 'Kliknij podświetlony przycisk wysyłania wiadomości z załącznikiem.',
        verify: { type: 'simulatorAction', action: 'mail-01-send' },
        simulatorScene: 'programy-mail-01-step-3',
      },
    ],
  },
  {
    id: 'programy-02-mail-odpowiedz',
    track: 'programy',
    level: 1,
    title: 'Mail – odpowiedz, prześlij dalej i jak znaleźć stary list sprzed roku',
    realLifeHook:
      'Gdy szukasz maila z numerem rezerwacji sprzed kilku miesięcy i zastanawiasz się, którą strzałkę kliknąć przy odpisywaniu.',
    estimatedMinutes: 5,
    prerequisites: ['programy-01-mail-zalacznik'],
    reward: 'Odznaka Archiwistki Poczty',
    synonyms: [
      'odpowiedz na maila',
      'przeslij dalej',
      'forward',
      'odpowiedz wszystkim',
      'szukanie starego maila',
      'zniknal mail',
      'gdzie jest stary mail',
      'wyszukaj wiadomosc',
      'strzalka w mailu',
      'przekazac maila',
    ],
    theory: {
      id: 'theory-programy-02-mail-odpowiedz',
      category: 'Poczta i komunikacja',
      title: 'Trzy strzałki w poczcie i dlaczego stare maile wcale nie znikają',
      metaphor: 'Rozmowa w cztery oczy, rozmowa przy wspólnym stole i podanie listu sąsiadce',
      story:
        'U góry każdej wiadomości w programie Mail stoją obok siebie trzy małe strzałki, które potrafią nieźle namieszać w życiu towarzyskim. Pierwsza, pojedyncza strzałka w lewo to „Odpowiedz” – piszesz wyłącznie do tej jednej osoby, która przysłała Ci wiadomość, jak w rozmowie w cztery oczy. Druga ikona, dwie strzałki w lewo, to „Odpowiedz wszystkim” – jeśli mail przyszedł do całej wspólnoty mieszkaniowej albo piętnastu osób z rodziny, Twoją odpowiedź przeczytają absolutnie wszyscy przy stole! Trzecia strzałka, skierowana w prawo, to „Prześlij dalej” – bierzesz otrzymany list (razem z jego załącznikami!) i podajesz go komuś zupełnie innemu, na przykład mężowi albo córce. A co ze starymi mailami sprzed pół roku? One wcale nie giną! Poczta po prostu układa je chronologicznie jak gazety na stosie – wpisz nazwisko nadawcy lub jedno słowo w polu „Szukaj” w rogu okna Maila, a wiadomość od razu się odnajdzie.',
      realExplanation:
        'W programie Mail pojedyncza strzałka w lewo oznacza odpowiedź tylko do nadawcy, podwójna strzałka w lewo wysyła odpowiedź do nadawcy oraz wszystkich osób w polu DW (Do wiadomości), natomiast strzałka w prawo („Prześlij dalej”) pozwala przekazać wiadomość wraz z załącznikami nowemu odbiorcy. Pole wyszukiwania w prawym górnym rogu okna Maila przeszukuje całą skrzynkę po nadawcy, temacie oraz treści listów.',
      oneLiner:
        'Jedna strzałka w lewo odpisuje nadawcy, strzałka w prawo przekazuje list dalej, a lupka w Mailu znajduje stare listy.',
      commonMyth:
        'Wiele osób myśli, że kliknięcie „Odpowiedz” automatycznie przekazuje załączniki innej osobie. A tymczasem aby przekazać otrzymany plik komuś nowemu, wybieramy strzałkę w prawo – „Prześlij dalej”.',
      illustrationId: 'mail-reply-arrows',
    },
    steps: [
      {
        instruction:
          'W oknie programu Mail kliknij w pole „Szukaj” w prawym górnym rogu i wpisz słowo „rezerwacja”, aby odnaleźć dawny list.',
        hint: 'Pole wyszukiwania z lupką znajduje się w górnej części okna poczty.',
        hint2: 'Kliknij podświetlone pole wyszukiwania w oknie programu Mail.',
        verify: { type: 'simulatorAction', action: 'mail-02-search' },
        simulatorScene: 'programy-mail-02-step-1',
      },
      {
        instruction:
          'Kliknij odnalezioną wiadomość z potwierdzeniem rezerwacji na liście wyników.',
        hint: 'Wiadomość pojawiła się na liście znalezionych listów.',
        hint2: 'Kliknij podświetloną wiadomość w oknie poczty.',
        verify: { type: 'simulatorAction', action: 'mail-02-open-found' },
        simulatorScene: 'programy-mail-02-step-2',
      },
      {
        instruction:
          'Kliknij strzałkę skierowaną w prawo („Prześlij dalej”), aby przekazać ten list wraz z załącznikiem bliskiej osobie.',
        hint: 'Pamiętaj: strzałka w lewo odpisuje nadawcy, a strzałka w prawo przekazuje list dalej.',
        hint2: 'Kliknij podświetlony przycisk „Prześlij dalej” na pasku wiadomości.',
        verify: { type: 'simulatorAction', action: 'mail-02-forward' },
        simulatorScene: 'programy-mail-02-step-3',
      },
    ],
  },
  {
    id: 'programy-03-safari-karty',
    track: 'programy',
    level: 1,
    title: 'Safari – karty i zakładki, czyli porządek w przeglądarce',
    realLifeHook:
      'Gdy chcesz porównać dwie strony w internecie obok siebie i zapisać adres swojego banku na stałe pod ręką.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Nawigatorki Safari',
    synonyms: [
      'karty w safari',
      'zakladki',
      'ulubione strony',
      'nowa karta',
      'zamknelam strone',
      'jak zapisac strone',
      'przegladarka safari',
      'duzo otwartych stron',
      'plusik w safari',
      'pasek ulubionych',
    ],
    theory: {
      id: 'theory-programy-03-safari-karty',
      category: 'Internet i Safari',
      title: 'Karty w przeglądarce jak rozłożone czasopisma i zakładki jak wstążka w ulubionej książce',
      metaphor: 'Kilka artykułów otwartych w jednej oprawie oraz jedwabna zakładka na ulubionej stronie',
      story:
        'Słowa „karta” i „zakładka” w przeglądarce Safari brzmią podobnie, ale służą do dwóch zupełnie innych rzeczy. Wyobraź sobie, że czytasz poranną gazetę, a obok kładziesz przepis na ciasto. W Safari nie musisz otwierać dziesięciu osobnych okien przeglądarki – zamiast tego klikasz mały znaczek plusa (+) w prawym górnym rogu okna (lub wciskasz ⌘T) i otwierasz nową „kartę”. Karty leżą w równym rzędzie u góry jednego okna i możesz przełączać się między nimi jednym kliknięciem, nie gubiąc poprzedniej strony! A czym jest „zakładka” (albo „Ulubione”)? To dokładnie to samo, co materiałowa tasiemka w książce kucharskiej. Jeśli masz stronę banku, apteki albo ulubionego portalu, na którą wchodzisz regularnie, dodajesz ją do Ulubionych (skrótem ⌘D lub ikoną udostępniania). Od tej pory nie musisz już wpisywać jej adresu ani szukać jej w Google – czeka jako wygodny przycisk tuż pod paskiem adresu.',
      realExplanation:
        'W przeglądarce Safari „karta” to pojedyncza otwarta strona internetowa wewnątrz bieżącego okna (nową kartę otworzysz plusem + u góry po prawej lub skrótem ⌘T, a przypadkowo zamkniętą kartę przywrócisz skrótem ⌘⇧T). „Zakładka” (Ulubione) to zapisany na stałe adres strony, który dodasz skrótem ⌘D, aby mieć do niego dostęp jednym kliknięciem na pasku ulubionych.',
      oneLiner:
        'Karty (+) to strony otwarte na chwilę teraz, a Zakładki (⌘D) to adresy zapisane na stałe.',
      commonMyth:
        'Wiele osób wpisuje adres swojego banku za każdym razem w wyszukiwarkę Google, co bywa niebezpieczne przez fałszywe reklamy. A tymczasem zapisanie prawdziwej strony banku w Ulubionych w Safari chroni przed pomyłką.',
      illustrationId: 'safari-tabs-bookmarks',
    },
    steps: [
      {
        instruction:
          'W oknie przeglądarki Safari kliknij przycisk plusa (+) w prawym górnym rogu (lub wciśnij ⌘T), aby otworzyć nową kartę obok obecnej.',
        hint: 'Znak + znajduje się na samym prawym końcu paska kart u góry okna Safari.',
        hint2: 'Kliknij podświetlony przycisk otwierania nowej karty w oknie Safari.',
        verify: { type: 'simulatorAction', action: 'safari-03-new-tab' },
        simulatorScene: 'programy-safari-03-step-1',
      },
      {
        instruction:
          'Zapisz otwartą stronę w Ulubionych na stałe: kliknij przycisk „Dodaj do Ulubionych (⌘D)”.',
        hint: 'Możesz użyć skrótu ⌘D lub kliknąć przycisk dodawania zakładki.',
        hint2: 'Kliknij podświetlony przycisk „Dodaj do Ulubionych (⌘D)” w oknie Safari.',
        verify: { type: 'simulatorAction', action: 'safari-03-bookmark' },
        simulatorScene: 'programy-safari-03-step-2',
      },
      {
        instruction:
          'Kliknij nowo utworzony skrót na pasku Ulubionych pod paskiem adresu, aby sprawdzić, że strona otwiera się jednym ruchem.',
        hint: 'Pasek Ulubionych biegnie poziomo tuż pod głównym paskiem adresu w Safari.',
        hint2: 'Kliknij podświetloną zakładkę na pasku Ulubionych.',
        verify: { type: 'simulatorAction', action: 'safari-03-open-favorite' },
        simulatorScene: 'programy-safari-03-step-3',
      },
    ],
  },
  {
    id: 'programy-04-safari-pdf-hasla',
    track: 'programy',
    level: 2,
    title: 'Safari – zapis strony jako PDF oraz gdzie Mac trzyma Twoje hasła',
    realLifeHook:
      'Gdy chcesz zachować potwierdzenie zakupu ze strony internetowej jako dokument PDF albo podejrzeć hasło, które Safari samo pamięta.',
    estimatedMinutes: 6,
    prerequisites: ['programy-03-safari-karty'],
    reward: 'Odznaka Strażniczki Safari',
    synonyms: [
      'zapisz strone jako pdf',
      'hasla w safari',
      'zapomnialam hasla',
      'gdzie sa zapisane hasla',
      'wydrukuj do pdf',
      'potwierdzenie przelewu pdf',
      'podejrzec haslo',
      'autouzupelnianie hasel',
      'zapisac bilet z internetu',
      'eksportuj jako pdf',
    ],
    theory: {
      id: 'theory-programy-04-safari-pdf-hasla',
      category: 'Internet i Safari',
      title: 'Zaczarowanie strony internetowej w papierowy dokument PDF i sejf z hasłami',
      metaphor: 'Zalaminowanie ulotki tak, by nikt nie zmienił na niej ani jednej litery, oraz pancerny notes z kluczami',
      story:
        'Strona internetowa w przeglądarce jest ulotna: jutro sklep może zmienić cenę, a potwierdzenie rezerwacji hotelu może zniknąć po zamknięciu okna. Zamiast drukować wszystko na prawdziwej drukarce i marnować papier, Mac potrafi „wydrukować” dowolną stronę do pliku PDF. Czym właściwie jest PDF? Wyobraź sobie kartkę papieru zalaminowaną w sztywną, przezroczystą folię. Niezależnie od tego, czy otworzysz ją jutro na Macu, wyślesz mailem do urzędu, czy pokażesz na telefonie – żadna tabelka się nie rozjedzie i żadna czcionka nie przeskoczy na następną stronę. W Safari robisz to jednym ruchem z menu Plik → Eksportuj jako PDF. Druga wielka tajemnica Safari to zapamiętane hasła: gdy przeglądarka wpisuje za Ciebie kropki przy logowaniu, a Ty chcesz przypomnieć sobie, jakie to właściwie było hasło, w każdej chwili możesz zajrzeć do wbudowanego sejfu po przyłożeniu palca do czytnika Touch ID lub wpisaniu hasła do Maca.',
      realExplanation:
        'Aby zapisać dowolną stronę w Safari jako dokument PDF, wybierz z górnego paska menu Plik → Eksportuj jako PDF… (lub wciśnij ⌘P jak Drukuj i w dolnym rogu okna wybierz „Zapisz jako PDF”). Zapisane hasła sprawdzisz w Safari → Ustawienia (lub Preferencje) → Hasła, a na najnowszych systemach (od macOS 15 Sequoia) również w osobnej aplikacji systemowej „Hasła”.',
      oneLiner:
        'Menu Plik → Eksportuj jako PDF zamienia stronę w trwały dokument, a hasła sprawdzisz w ustawieniach Safari.',
      commonMyth:
        'Wiele osób myśli, że kropki w polu hasła są nie do odczytania. A tymczasem właścicielka Maca może w każdej chwili odkryć swoje zapisane hasło w sekcji Hasła po podaniu hasła do komputera.',
      illustrationId: 'passwords-vault-pdf',
    },
    steps: [
      {
        instruction:
          'W otwartej przeglądarce Safari wybierz z górnego paska menu Plik → „Eksportuj jako PDF…”, aby zachować stronę na dysku.',
        hint: 'Na górnym pasku menu kliknij „Plik”, a następnie pozycję „Eksportuj jako PDF…”.',
        hint2: 'Kliknij podświetlony przycisk „Plik → Eksportuj jako PDF…” w symulatorze.',
        verify: { type: 'simulatorAction', action: 'safari-04-export-pdf' },
        simulatorScene: 'programy-safari-04-step-1',
      },
      {
        instruction:
          'Teraz sprawdź swoje zapisane hasła: otwórz sekcję „Hasła” w ustawieniach Safari (lub aplikację Hasła).',
        hint: 'W górnym menu kliknij napis „Safari” → „Ustawienia…” (lub „Preferencje…”) → zakładka „Hasła”.',
        hint2: 'Kliknij podświetlony przycisk otwierający sejf „Hasła” w symulatorze.',
        verify: { type: 'simulatorAction', action: 'safari-04-open-passwords' },
        simulatorScene: 'programy-safari-04-step-2',
        variants: [
          {
            osRange: '<13',
            instruction:
              'Na górnym pasku menu kliknij „Safari” → „Preferencje…”, a następnie wybierz zakładkę „Hasła” z ikoną kluczyka.',
            hint: 'W starszych wersjach macOS opcja w menu Safari nazywa się „Preferencje…”.',
            simulatorScene: 'programy-safari-04-step-2',
            verifyNeeded: true,
          },
          {
            osRange: '>=15',
            instruction:
              'Na systemie macOS Sequoia otwórz aplikację „Hasła” (ikona z pękiem kluczy w Docku) lub wybierz w menu Safari → Ustawienia → Hasła.',
            hint: 'Od wersji macOS 15 Sequoia wszystkie hasła mają też własną aplikację „Hasła”.',
            simulatorScene: 'programy-safari-04-step-2',
            verifyNeeded: true,
          },
        ],
      },
      {
        instruction:
          'Kliknij wybrany serwis na liście, aby zobaczyć, jak po autoryzacji Mac odkrywa zapisany login i hasło.',
        hint: 'Po kliknięciu wiersza z nazwą strony hasło odsłania się zamiast kropek.',
        hint2: 'Kliknij podświetlony przycisk podglądu hasła w oknie.',
        verify: { type: 'simulatorAction', action: 'safari-04-reveal-password' },
        simulatorScene: 'programy-safari-04-step-3',
      },
    ],
  },
  {
    id: 'programy-05-word-pages-zapis',
    track: 'programy',
    level: 1,
    title: 'Word i Pages – otwórz i zapisz dokument dokładnie TAM, gdzie chcesz',
    realLifeHook:
      'Gdy piszesz ważne pismo w Wordzie lub Pages, klikasz „Zapisz”, a następnego dnia Word nie widzi dokumentu albo wysyła go w nieznane miejsce.',
    estimatedMinutes: 6,
    prerequisites: ['macos-05-finder-foldery'],
    reward: 'Odznaka Pani Dokumentów',
    synonyms: [
      'word',
      'pages',
      'gdzie zapisal sie dokument',
      'zapisz jako',
      'icloud w wordzie',
      'word nie widzi pliku',
      'zapisac na pulpicie',
      'edytor tekstu',
      'zniknal tekst w wordzie',
      'wybor folderu przy zapisie',
    ],
    theory: {
      id: 'theory-programy-05-word-pages-zapis',
      category: 'Dokumenty i PDF',
      title: 'Dlaczego Word i Pages próbują chować pisma do własnych chmur i jak wskazać im zwykłą szufladę',
      metaphor: 'Dwóch pomocników, z których każdy chce odkładać teczki na swój strych zamiast na Twoje biurko',
      story:
        'Oto zagadka, przez którą tysiące użytkowników MacBooków traci cierpliwość: piszesz pismo w programie Word albo w programie Pages, naciskasz „Zapisz”, zamykasz komputer, a rano dokumentu nie ma ani na Pulpicie, ani w Dokumentach! Dlaczego tak się dzieje? Ponieważ program Pages (stworzony przez Apple) domyślnie próbuje wkładać nowe pliki do internetowej szafy iCloud Drive, natomiast program Microsoft Word bardzo często próbuje zapisać je w swojej własnej chmurze OneDrive! Jeśli otwierasz potem folder na dysku albo szukasz pliku z poziomu drugiego programu, jedno nie widzi schowka drugiego. Rozwiązanie jest cudownie proste: podczas pierwszego zapisywania dokumentu (Plik → Zapisz… lub ⌘S) spójrz na środek okienka zapisu, tam gdzie pisze „Gdzie:” (albo w Wordzie kliknij przycisk „Na moim komputerze Mac”). Jeśli okienko jest zwinięte i widać tylko jedną linijkę, kliknij małą strzałkę obok nazwy pliku – wtedy rozwinie się pełna mapa Twoich folderów i sama zdecydujesz, czy pismo ma leżeć na Biurku, czy w Dokumentach.',
      realExplanation:
        'Podczas zapisywania pliku (⌘S) w systemie macOS okno dialogowe bywa domyślnie zwinięte. Kliknięcie przycisku rozwijania (strzałka w dół obok pola „Zapisz jako”) odsłania pełny pasek boczny Findera, na którym możesz jawnie wskazać folder „Biurko” (Pulpit) lub „Dokumenty”. W programie Microsoft Word warto najpierw kliknąć przycisk „Na moim komputerze Mac” w lewym dolnym rogu okna zapisu, aby uniknąć zapisania pliku na zewnętrznym koncie OneDrive.',
      oneLiner:
        'Przy zapisie pliku (⌘S) zawsze zerknij na pole „Gdzie” i wskaż Biurko lub Dokumenty na swoim Macu.',
      commonMyth:
        'Wiele osób myśli, że kliknięcie „Zapisz” zawsze odkłada plik na Pulpit. A tymczasem program zapisuje go w ostatnio używanym folderze lub w chmurze, dopóki sama nie wskażesz miejsca w polu „Gdzie”.',
      illustrationId: 'word-pages-save-folder',
    },
    steps: [
      {
        instruction:
          'W otwartym dokumencie tekstowym wywołaj okno zapisu: wybierz z menu Plik → „Zapisz…” (lub wciśnij ⌘S).',
        hint: 'Skrót ⌘S działa identycznie w programie Word, Pages oraz TextEdit.',
        hint2: 'Kliknij podświetlony przycisk w oknie programu, aby otworzyć okienko zapisu.',
        verify: { type: 'simulatorAction', action: 'word-05-open-save' },
        simulatorScene: 'programy-word-05-step-1',
      },
      {
        instruction:
          'W okienku zapisu rozwiń wybór miejsca („Na moim komputerze Mac” / pole „Gdzie:”) i zmień lokalizację z chmury na folder „Dokumenty”.',
        hint: 'Zamiast domyślnego folderu chmury wybierz własny folder „Dokumenty” na Macu.',
        hint2: 'Kliknij podświetlony wybór folderu „Dokumenty” w oknie zapisu.',
        verify: { type: 'simulatorAction', action: 'word-05-choose-documents' },
        simulatorScene: 'programy-word-05-step-2',
      },
      {
        instruction:
          'Nadaj plikowi czytelną nazwę „Pismo-do-spoldzielni” i kliknij przycisk „Zapisz”.',
        hint: 'Teraz masz pewność, że plik leży dokładnie w Twoim folderze Dokumenty.',
        hint2: 'Kliknij podświetlony przycisk potwierdzenia zapisu.',
        verify: { type: 'simulatorAction', action: 'word-05-confirm-save' },
        simulatorScene: 'programy-word-05-step-3',
      },
    ],
  },
  {
    id: 'programy-06-word-pages-pdf',
    track: 'programy',
    level: 2,
    title: 'Word i Pages – wyślij dokument jako PDF, żeby u odbiorcy nic się nie rozjechało',
    realLifeHook:
      'Gdy przygotowałaś starannie ułożone pismo w Pages lub Wordzie i chcesz, żeby odbiorca na swoim komputerze zobaczył je dokładnie tak samo.',
    estimatedMinutes: 5,
    prerequisites: ['programy-05-word-pages-zapis'],
    reward: 'Odznaka Perfekcyjnego Wydruku',
    synonyms: [
      'word na pdf',
      'pages na pdf',
      'wyslij jako pdf',
      'zeby dokument sie nie rozjechal',
      'konwersja do pdf',
      'zapisz dokument w pdf',
      'eksport z pages do pdf',
      'eksport z worda',
      'dokument do druku',
      'plik pdf z tekstu',
    ],
    theory: {
      id: 'theory-programy-06-word-pages-pdf',
      category: 'Dokumenty i PDF',
      title: 'Dlaczego plik z Pages bywa nieczytelny na Windowsie i jak PDF rozwiązuje sprawę',
      metaphor: 'Zamiana mokrej gliny rzeźbiarskiej w wypaloną porcelanę przed wysyłką pocztą',
      story:
        'Kiedy piszesz dokument w programie Pages na MacBooku, plik zapisuje się z końcówką „.pages”. Problem pojawia się wtedy, gdy wyślesz taki plik mailem do pani w urzędzie albo księgowej, która pracuje na zwykłym komputerze z Windowsem – jej komputer nie ma programu Pages i w ogóle nie otworzy Twojego pisma! Nawet między różnymi wersjami Worda akapity i tabelki potrafią się czasem poprzesuwać, jeśli u odbiorcy brakuje tej samej czcionki. Dopóki piszesz tekst i go poprawiasz, dokument jest jak miękka glina – to Twój plik roboczy. Ale w chwili, gdy pismo jest ukończone i ma iść w świat do czytania lub druku, warto „wypalić je w piecu” do postaci pliku PDF. PDF otworzy się na każdym komputerze, telefonie i w każdym urzędzie na świecie, zachowując co do milimetra układ Twoich akapitów.',
      realExplanation:
        'W programie Pages zamienisz dokument na PDF, wybierając z górnego menu Plik → Eksportuj do → PDF…. W programie Microsoft Word wybierzesz Plik → Zapisz jako… i na liście „Format pliku” pod nazwą dokumentu wskażesz „PDF”. Na całym Macu działa też uniwersalna metoda: wciśnij ⌘P (Drukuj) i na dole okna wydruku kliknij „PDF” → „Zapisz jako PDF”.',
      oneLiner:
        'Przed wysłaniem ważnego pisma wyeksportuj je do PDF – otworzy się na każdym komputerze bez przesunięć.',
      commonMyth:
        'Wiele osób myśli, że po zapisaniu pliku jako PDF nie da się już edytować oryginału. A tymczasem eksport do PDF tworzy drugi, osobny plik do wysyłki, a Twój roboczy dokument w Wordzie lub Pages zostaje nietknięty.',
      illustrationId: 'word-pages-export-pdf',
    },
    steps: [
      {
        instruction:
          'W otwartym edytorze tekstu kliknij na górnym pasku menu „Plik” i wybierz opcję eksportu do formatu PDF.',
        hint: 'W Pages jest to Plik → Eksportuj do → PDF…, a w Wordzie Plik → Zapisz jako… → Format: PDF.',
        hint2: 'Kliknij podświetlony przycisk eksportu do PDF w oknie programu.',
        verify: { type: 'simulatorAction', action: 'word-06-select-pdf' },
        simulatorScene: 'programy-word-06-step-1',
      },
      {
        instruction:
          'Wybierz jakość dokumentu („Najlepsza” do druku i czytania) i przejdź do wyboru folderu docelowego.',
        hint: 'Domyślna najlepsza jakość sprawia, że tekst i podpisy są idealnie ostre.',
        hint2: 'Kliknij podświetlony przycisk potwierdzenia jakości PDF.',
        verify: { type: 'simulatorAction', action: 'word-06-quality-next' },
        simulatorScene: 'programy-word-06-step-2',
      },
      {
        instruction:
          'Wskaż folder „Biurko” (Pulpit) i kliknij „Eksportuj”, aby utworzyć plik „Pismo-do-spoldzielni.pdf” do wysyłki mailem.',
        hint: 'Obok Twojego pliku roboczego powstanie teraz osobny plik z końcówką .pdf.',
        hint2: 'Kliknij podświetlony przycisk zapisu pliku PDF.',
        verify: { type: 'simulatorAction', action: 'word-06-save-pdf' },
        simulatorScene: 'programy-word-06-step-3',
      },
    ],
  },
  {
    id: 'programy-07-zoom-teams-dolacz',
    track: 'programy',
    level: 1,
    title: 'Zoom i Teams – dołącz do wideorozmowy, włącz kamerę i wycisz mikrofon',
    realLifeHook:
      'Gdy za pięć minut zaczyna się rozmowa wideo, a Ty chcesz spokojnie sprawdzić, czy Cię widać i jak wyciszyć mikrofon, gdy w kuchni dzwoni czajnik.',
    estimatedMinutes: 5,
    prerequisites: ['macos-08-ustawienia'],
    reward: 'Odznaka Swobodnej Rozmówczyni',
    synonyms: [
      'zoom',
      'teams',
      'spotkanie online',
      'wideorozmowa',
      'kamera nie dziala',
      'nie slychac mnie',
      'wycisz mikrofon',
      'mute',
      'dolacz do spotkania',
      'link do spotkania',
    ],
    theory: {
      id: 'theory-programy-07-zoom-teams-dolacz',
      category: 'Wideorozmowy',
      title: 'Przedpokój z lustrem przed wejściem na spotkanie i dwa najważniejsze przyciski',
      metaphor: 'Spokojne poprawienie fryzury przed lustrem w holu, zanim otworzysz drzwi do sali',
      story:
        'Nic tak nie podnosi ciśnienia jak kliknięcie linku do spotkania na Zoomie albo w aplikacji Teams z obawą, że w ułamku sekundy dwadzieścia osób zobaczy nas w połowie picia kawy. Na szczęście nowoczesne programy do rozmów wideo mają wbudowany „przedpokój z lustrem”. Kiedy klikasz link w mailu, najpierw otwiera się okienko podglądu, w którym widzisz tylko samą siebie. Dopóki nie klikniesz niebieskiego przycisku „Dołącz teraz”, nikt Cię jeszcze nie widzi ani nie słyszy! W trakcie samej rozmowy całe sterowanie sprowadza się do dwóch małych ikon w dolnym rogu okna: mikrofonu (głos) oraz kamerki (obraz). Jeśli przez ikonę mikrofonu przechodzi ukośna czerwona kreska – jesteś wyciszona, możesz spokojnie zakaszleć albo odpowiedzieć domownikowi i nikt na spotkaniu tego nie usłyszy. A skąd pewność, czy kamera MacBooka w ogóle patrzy? Obok obiektywu nad ekranem świeci się wtedy malutka zielona kropeczka.',
      realExplanation:
        'W aplikacjach Zoom, Microsoft Teams oraz Google Meet sterowanie dźwiękiem i obrazem znajduje się na dolnym pasku okna rozmowy. Ikona mikrofonu włącza i wycisza Twój głos (skrót w Zoomie to ⌘⇧A, a przytrzymanie spacji pozwala mówić przez chwilę przy wyciszonym mikrofonie). Ikona kamery wideo włącza i wyłącza obraz. Zielona dioda LED na ramce nad ekranem MacBooka świeci się zawsze wtedy, gdy kamera jest aktywna.',
      oneLiner:
        'Przekreślony mikrofon oznacza ciszę z Twojej strony, a zielona kropka nad ekranem mówi, że kamera działa.',
      commonMyth:
        'Wiele osób myśli, że kliknięcie linku do spotkania od razu włącza kamerę na żywo dla wszystkich. A tymczasem najpierw pojawia się ekran podglądu, na którym sama decydujesz o włączeniu kamery i mikrofonu.',
      illustrationId: 'video-call-camera-mic',
    },
    steps: [
      {
        instruction:
          'W oknie podglądu przed spotkaniem sprawdź obraz z kamery i kliknij przycisk „Dołącz z dźwiękiem komputera”.',
        hint: 'Zanim wejdziesz na spotkanie, zawsze widzisz ekran powitalny.',
        hint2: 'Kliknij podświetlony przycisk dołączenia do rozmowy wideo.',
        verify: { type: 'simulatorAction', action: 'zoom-07-join' },
        simulatorScene: 'programy-zoom-07-step-1',
      },
      {
        instruction:
          'Wycisz na chwilę swój mikrofon, klikając ikonę mikrofonu („Wycisz”) w lewym dolnym rogu okna spotkania.',
        hint: 'Gdy mikrofon ma czerwoną przekreśloną kreskę, inni uczestnicy Cię nie słyszą.',
        hint2: 'Kliknij podświetlony przycisk mikrofonu na pasku rozmowy.',
        verify: { type: 'simulatorAction', action: 'zoom-07-mute' },
        simulatorScene: 'programy-zoom-07-step-2',
      },
      {
        instruction:
          'Kliknij ponownie ikonę mikrofonu, aby zdjąć wyciszenie i móc swobodnie rozmawiać.',
        hint: 'Jedno kliknięcie wycisza, drugie kliknięcie w to samo miejsce przywraca głos.',
        hint2: 'Kliknij podświetlony przycisk włączenia mikrofonu.',
        verify: { type: 'simulatorAction', action: 'zoom-07-unmute' },
        simulatorScene: 'programy-zoom-07-step-3',
      },
    ],
  },
  {
    id: 'programy-08-zoom-teams-ekran',
    track: 'programy',
    level: 2,
    title: 'Zoom i Teams – jak pokazać innym swój ekran i jak to wyłączyć',
    realLifeHook:
      'Gdy podczas rozmowy chcesz pokazać dokument lub zdjęcia na swoim Macu i od razu wiedzieć, jak zakończyć udostępnianie.',
    estimatedMinutes: 5,
    prerequisites: ['programy-07-zoom-teams-dolacz'],
    reward: 'Odznaka Prowadzącej Prezentację',
    synonyms: [
      'udostepnij ekran',
      'pokazac ekran',
      'share screen',
      'zielony przycisk zoom',
      'uprawnienia nagrywania ekranu',
      'inni nie widza mojego ekranu',
      'prezentacja na zoomie',
      'jak wylaczyc udostepnianie ekranu',
      'pokazywanie okna',
      'wspoldzielenie ekranu',
    ],
    theory: {
      id: 'theory-programy-08-zoom-teams-ekran',
      category: 'Wideorozmowy',
      title: 'Odwrócenie monitora w stronę gości przy stole i czerwony przycisk zasłonięcia kurtyny',
      metaphor: 'Położenie wybranej teczki na środku stołu zamiast wpuszczania gości do całego gabinetu',
      story:
        'Udostępnianie ekranu podczas wideorozmowy brzmi poważnie, ale w praktyce to po prostu odwrócenie Twojego MacBooka przodem do rozmówcy, żeby mógł przeczytać to samo, na co Ty patrzysz. W Zoomie służy do tego jaskrawy, zielony przycisk ze strzałką w górę na dole okna („Udostępnij ekran”), a w Teamsach prostokącik ze strzałką obok mikrofonu. Najważniejsza sztuczka, którą warto znać: po kliknięciu tego przycisku program zapyta Cię, czy chcesz pokazać „Cały ekran” (Biurko), czy tylko „Jedno wybrane okno” – na przykład sam otwarty dokument PDF. Jeśli wybierzesz tylko jedno okno, rozmówcy zobaczą wyłącznie ten dokument, nawet jeśli w tle przyjdzie prywatny mail! A jak przestać pokazywać ekran? Gdy udostępniasz obraz, na samej górze ekranu pojawia się wyraźny czerwony przycisk „Zatrzymaj udostępnianie”. Jedno kliknięcie i kurtyna opada.',
      realExplanation:
        'Aby pokazać ekran w Zoomie lub Teams, kliknij przycisk „Udostępnij ekran” (ikona prostokąta ze strzałką w górę), wskaż wybrane okno lub całe Biurko i zatwierdź przyciskiem „Udostępnij”. Przy pierwszym użyciu macOS może poprosić o zgodę w sekcji Prywatność i ochrona → Nagrywanie ekranu. Aby zakończyć pokazywanie, kliknij czerwony przycisk „Zatrzymaj udostępnianie” na pływającym pasku u góry ekranu.',
      oneLiner:
        'Przycisk ze strzałką w górę pokazuje wybrane okno, a czerwony przycisk u góry natychmiast kończy pokaz.',
      commonMyth:
        'Wiele osób boi się, że udostępniając ekran, oddaje rozmówcy władzę nad swoją myszką i plikami. A tymczasem rozmówca widzi jedynie obraz – nie może niczego kliknąć ani otworzyć na Twoim Macu.',
      illustrationId: 'video-screen-share',
    },
    steps: [
      {
        instruction:
          'Na dolnym pasku rozmowy wideo kliknij przycisk „Udostępnij ekran” (prostokąt ze strzałką skierowaną w górę).',
        hint: 'W aplikacji Zoom przycisk ten jest wyróżniony zielonym kolorem na środku dolnego paska.',
        hint2: 'Kliknij podświetlony przycisk „Udostępnij ekran” w oknie rozmowy.',
        verify: { type: 'simulatorAction', action: 'zoom-08-click-share' },
        simulatorScene: 'programy-zoom-08-step-1',
      },
      {
        instruction:
          'W oknie wyboru wskaż tylko jedno konkretne okno z dokumentem („Oferta-wyjazdu.pdf”) i kliknij „Udostępnij”.',
        hint: 'Wybierając konkretne okno zamiast całego Biurka, chronisz swoją prywatność.',
        hint2: 'Kliknij podświetloną miniaturę okna „Oferta-wyjazdu.pdf”.',
        verify: { type: 'simulatorAction', action: 'zoom-08-select-window' },
        simulatorScene: 'programy-zoom-08-step-2',
      },
      {
        instruction:
          'Teraz zakończ pokaz ekranu: kliknij czerwony przycisk „Zatrzymaj udostępnianie” u góry ekranu.',
        hint: 'Czerwony przycisk jest zawsze widoczny na górnym pasku podczas udostępniania.',
        hint2: 'Kliknij podświetlony czerwony przycisk „Zatrzymaj udostępnianie”.',
        verify: { type: 'simulatorAction', action: 'zoom-08-stop-share' },
        simulatorScene: 'programy-zoom-08-step-3',
      },
    ],
  },
  {
    id: 'programy-09-podglad-pdf',
    track: 'programy',
    level: 2,
    title: 'Podgląd – jak podpisać dokument PDF i wypełnić formularz bez drukowania',
    realLifeHook:
      'Gdy urząd lub firma prosi o odesłanie podpisanego wniosku PDF, a Ty nie masz drukarki ani skanera w domu.',
    estimatedMinutes: 6,
    prerequisites: ['macos-02-pobrane'],
    reward: 'Odznaka Cyfrowego Pióra',
    synonyms: [
      'podglad',
      'preview',
      'podpisz pdf',
      'podpis na dokumencie',
      'wypelnic formularz pdf',
      'odreczny podpis na macu',
      'podpisywanie umowy pdf',
      'jak podpisac plik bez drukowania',
      'narzedzia oznaczen',
      'dodaj tekst do pdf',
    ],
    theory: {
      id: 'theory-programy-09-podglad-pdf',
      category: 'Dokumenty i PDF',
      title: 'Wbudowane wieczne pióro w programie Podgląd, które oszczędza wyprawę do punktu ksero',
      metaphor: 'Szklana szybka z pisakiem i pieczątką z Twoim własnym, odręcznym podpisem',
      story:
        'Kiedy na zwykłym komputerze dostajesz mailem formularz PDF z prośbą o podpis, często zaczyna się cała wyprawa: trzeba znaleźć drukarkę, wydrukować kartkę, podpisać długopisem, potem zrobić zdjęcie telefonem albo zeskanować… Na MacBooku cała ta procedura trwa dosłownie dwadzieścia sekund bez wstawania z fotela! Każdy plik PDF i każde zdjęcie otwiera się domyślnie we wbudowanym programie o nazwie „Podgląd”. Na górnym pasku okna Podglądu kryje się mała ikona z końcówką flamastra w kółeczku – nazywa się „Pokaż pasek narzędzi oznaczeń”. Kiedy ją klikniesz, otwiera się piórnik pełen skarbów. Możesz kliknąć narzędzie tekstowe i wpisać swoje imię, nazwisko czy datę w dowolnej kratce formularza. A co najlepsze: pod ikoną podpisu możesz raz złożyć swój odręczny podpis palcem na gładziku albo przytrzymać zwykłą białą kartkę z podpisem przed kamerą MacBooka! Mac sfotografuje Twój podpis, wytnie tło i pozwoli Ci przykładać go na każdym dokumencie jak elegancką pieczątkę.',
      realExplanation:
        'Program Podgląd (Preview) w systemie macOS pozwala bezpłatnie wypełniać i podpisywać pliki PDF. Po otwarciu pliku PDF kliknij ikonę „Oznaczenia” (końcówka pisaka w kółku) na górnym pasku okna. Przycisk „Tekst” (litera A w ramce) pozwala dopisać tekst w dowolnym miejscu strony, a przycisk „Podpis” umożliwia wstawienie odręcznego podpisu utworzonego na gładziku lub zeskanowanego kamerą.',
      oneLiner:
        'W programie Podgląd kliknij ikonę pisaka u góry, aby dopisać tekst lub postawić odręczny podpis na PDF-ie.',
      commonMyth:
        'Wiele osób myśli, że do edycji lub podpisania PDF-a trzeba kupować drogie programy Adobe. A tymczasem bezpłatny program Podgląd wbudowany w każdego Maca robi to od ręki.',
      illustrationId: 'preview-pdf-signature',
    },
    steps: [
      {
        instruction:
          'W otwartym dokumencie PDF w programie Podgląd kliknij ikonę pisaka w kółku („Pokaż pasek narzędzi oznaczeń”) na górnym pasku okna.',
        hint: 'Ikona pisaka otwiera dodatkowy pasek z narzędziami do pisania i podpisywania.',
        hint2: 'Kliknij podświetloną ikonę pisaka na pasku narzędzi programu Podgląd.',
        verify: { type: 'simulatorAction', action: 'podglad-09-open-markup' },
        simulatorScene: 'programy-podglad-09-step-1',
      },
      {
        instruction:
          'Kliknij narzędzie „Podpis” na pasku oznaczeń i wybierz swój przygotowany podpis „Małgorzata”.',
        hint: 'Narzędzie podpisu pozwala jednym kliknięciem wstawić Twój odręczny podpis.',
        hint2: 'Kliknij podświetlony przycisk „Wstaw podpis” na pasku oznaczeń.',
        verify: { type: 'simulatorAction', action: 'podglad-09-insert-signature' },
        simulatorScene: 'programy-podglad-09-step-2',
      },
      {
        instruction:
          'Umieść podpis w wyznaczonym polu na dole wniosku i zapisz dokument skrótem ⌘S.',
        hint: 'Po zapisaniu (⌘S) podpis staje się częścią dokumentu PDF.',
        hint2: 'Kliknij podświetlone pole podpisu na dokumencie, aby zatwierdzić.',
        verify: { type: 'simulatorAction', action: 'podglad-09-save-signed' },
        simulatorScene: 'programy-podglad-09-step-3',
      },
    ],
  },
  {
    id: 'programy-10-podglad-zdjecia',
    track: 'programy',
    level: 2,
    title: 'Podgląd – obróć zdjęcie, które leży bokiem, i połącz dwa pliki PDF w jeden',
    realLifeHook:
      'Gdy zeskanowany dokument albo zdjęcie otwiera się do góry nogami, albo gdy masz dwie osobne strony umowy i chcesz zrobić z nich jeden plik PDF.',
    estimatedMinutes: 5,
    prerequisites: ['programy-09-podglad-pdf'],
    reward: 'Odznaka Mistrzyni Podglądu',
    synonyms: [
      'obroc zdjecie',
      'przytnij zdjecie',
      'zmniejsz zdjecie',
      'zdjecie do gory nogami',
      'polaczyc dwa pdfy',
      'scalanie pdf',
      'edycja zdjecia w podgladzie',
      'za duzy plik ze zdjeciem',
      'zmiana rozmiaru zdjecia',
      'kadrowanie',
    ],
    theory: {
      id: 'theory-programy-10-podglad-zdjecia',
      category: 'Dokumenty i PDF',
      title: 'Szwajcarski scyzoryk do obracania zdjęć i zszywania wielostronicowych dokumentów',
      metaphor: 'Obrócenie fotografii w dłoniach oraz włożenie nowej kartki do wspólnej koszulki biurowej',
      story:
        'Program Podgląd, choć nazywa się skromnie, kryje w sobie umiejętności prawdziwego szwajcarskiego scyzoryka. Zdarzyło Ci się kiedyś dostać mailem skan umowy albo zdjęcie z wakacji, które otwiera się przekręcone na bok tak, że trzeba przechylać głowę? Na górnym pasku okna Podglądu stoi mały kwadracik z zakrzywioną strzałką. Każde jego kliknięcie obraca zdjęcie lub stronę PDF o 90° w lewo, i to na stałe! Druga umiejętność Podglądu budzi zazdrość u wszystkich posiadaczy innych komputerów: łączenie dwóch osobnych plików PDF w jeden wspólny dokument. Włączasz widok miniaturek stron z boku okna Podglądu i przeciągasz drugi plik PDF z Pulpitu prosto między miniaturki pierwszego. Kartki łączą się ze sobą jak w segregatorze – bez szukania żadnych podejrzanych stron w internecie.',
      realExplanation:
        'W programie Podgląd przycisk obracania (kwadrat ze strzałką na górnym pasku narzędzi lub skrót ⌘L / ⌘R) obraca zdjęcie bądź stronę PDF o 90°. Aby połączyć dwa pliki PDF, otwórz pierwszy w Podglądzie, włącz pasek boczny „Miniatury” (ikona układu z lewej strony paska narzędzi), a następnie przeciągnij drugi plik PDF z Findera na listę miniaturek i zapisz zmiany (⌘S).',
      oneLiner:
        'Kwadrat ze strzałką w Podglądzie obraca zdjęcie (⌘L), a pasek miniaturek pozwala łączyć pliki PDF.',
      commonMyth:
        'Wiele osób wrzuca prywatne umowy z numerem PESEL na darmowe strony internetowe „złącz PDF online”. A tymczasem bezpieczny program Podgląd na Macu łączy pliki PDF całkowicie lokalnie na Twoim dysku.',
      illustrationId: 'preview-rotate-merge',
    },
    steps: [
      {
        instruction:
          'W otwartym oknie programu Podgląd kliknij przycisk „Obróć w lewo” (kwadrat z zakrzywioną strzałką lub skrót ⌘L), aby wyprostować przekręcone zdjęcie.',
        hint: 'Ikona obracania znajduje się na górnym pasku okna Podglądu.',
        hint2: 'Kliknij podświetlony przycisk obracania o 90° w oknie Podglądu.',
        verify: { type: 'simulatorAction', action: 'podglad-10-rotate' },
        simulatorScene: 'programy-podglad-10-step-1',
      },
      {
        instruction:
          'Otwórz teraz pasek boczny z miniaturami stron dokumentu PDF, klikając ikonę widoku miniaturek po lewej stronie paska.',
        hint: 'Pasek miniaturek pokazuje wszystkie strony dokumentu jedna pod drugą.',
        hint2: 'Kliknij podświetlony przycisk „Pokaż miniatury” w oknie Podglądu.',
        verify: { type: 'simulatorAction', action: 'podglad-10-thumbnails' },
        simulatorScene: 'programy-podglad-10-step-2',
      },
      {
        instruction:
          'Dołącz drugą stronę („Załącznik-strona-2.pdf”) do paska miniaturek i zapisz połączony, dwustronicowy plik PDF.',
        hint: 'Przeciągnięcie pliku PDF na pasek miniaturek dokleja jego strony do dokumentu.',
        hint2: 'Kliknij podświetlony przycisk połączenia stron PDF.',
        verify: { type: 'simulatorAction', action: 'podglad-10-merge-pdf' },
        simulatorScene: 'programy-podglad-10-step-3',
      },
    ],
  },
];

export const PROGRAMY_MISSIONS: Mission[] = RAW_PROGRAMY_MISSIONS.map(polishMission);
