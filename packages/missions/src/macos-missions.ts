import { Mission, polishMission } from './types';

const RAW_MACOS_MISSIONS: Mission[] = [
  {
    id: 'macos-01-pulpit-dock',
    track: 'macos',
    level: 1,
    title: 'Pulpit, Dock i tajemnica czerwonej kropki',
    realLifeHook:
      'Gdy zamykasz okno czerwoną kropką, a program dalej działa w tle i nie wiesz, w czym właśnie pracujesz.',
    estimatedMinutes: 5,
    prerequisites: [],
    reward: 'Odznaka Pani Własnego Biurka',
    synonyms: [
      'pulpit',
      'biurko',
      'dock',
      'pasek na dole',
      'ikonki na dole',
      'czerwona kropka',
      'jak zamknac program',
      'pasek menu u gory',
      'jabluszko u gory',
      'okno a program',
      'kropka pod ikona',
      'ekran glowny maca',
    ],
    theory: {
      id: 'theory-macos-01-pulpit-dock',
      category: 'Podstawy systemu macOS',
      title: 'Dlaczego zamknięcie zeszytu nie wyrzuca pisarza z pokoju',
      metaphor: 'Drewniane biurko, półka z narzędziami na dole i jeden szyld pod sufitem',
      story:
        'Wyobraź sobie klasyczny gabinet z drewnianym blatem. Sam blat to Twój Pulpit (Apple w polskiej wersji nazywa go też Biurkiem). Na samym dole ekranu wisi podłużna półeczka z kolorowymi ikonami – to Dock, czyli podręczny przybornik z Twoimi ulubionymi programami. Największe zaskoczenie czeka jednak każdego, kto przesiadł się ze zwykłego komputera z Windowsem: kiedy klikasz czerwoną kropkę w lewym górnym rogu okna, wcale nie wyłączasz programu! Na Macu program i okno to dwie zupełnie różne rzeczy. Program jest jak księgowa siedząca przy biurku, a okno to otwarty przed nią zeszyt. Kliknięcie czerwonej kropki zamyka tylko ten jeden zeszyt, ale księgowa nadal siedzi na krześle, popija herbatę i czeka na kolejne polecenia – poznasz to po małej, świecącej kropeczce pod ikoną programu w Docku. A skąd wiadomo, który program aktualnie słucha Twoich poleceń? Spojrzysz na samą górę ekranu i wszystko jasne. Na Macu pasek menu jest tylko jeden, przyklejony na stałe pod „sufitem” ekranu. Pierwszy pogrubiony napis tuż obok nadgryzionego jabłuszka zdradza, kto w tej chwili rządzi na ekranie.',
      realExplanation:
        'W systemie macOS aplikacja (program), okno oraz dokument są rozdzielone. Kliknięcie czerwonego przycisku w narożniku zamyka wyłącznie bieżące okno dokumentu, podczas gdy sama aplikacja pozostaje uruchomiona w pamięci operacyjnej (sygnalizuje to mała kropka pod jej ikoną w Docku). Aby całkowicie zakończyć program, wybieramy z górnego paska menu opcję „Zakończ” lub wciskamy skrót ⌘Q (⌘ to klawisz Command, ten ze znaczkiem koniczynki tuż obok spacji). Górny pasek menu zawsze pokazuje opcje tego programu, w którego okno kliknęłaś jako ostatnie.',
      oneLiner:
        'Czerwona kropka chowa tylko okno; nazwę aktywnego programu widzisz zawsze obok jabłuszka u góry.',
      commonMyth:
        'Wiele osób myśli, że kliknięcie czerwonej kropki wyłącza program. A tymczasem zamyka ono tylko jedno okno, a sam program nadal czuwa w Docku.',
      illustrationId: 'desktop-dock-desk',
    },
    steps: [
      {
        instruction:
          'Spójrz na sam dół ekranu na pasek Dock i kliknij raz ikonę Findera – tę uśmiechniętą, niebiesko-białą twarz.',
        hint: 'Dock to rząd ikon na dole ekranu. Finder jest zawsze pierwszą ikoną z lewej strony.',
        hint2: 'Najedź kursorem na uśmiechniętą buźkę w lewym dolnym rogu i kliknij lewym przyciskiem.',
        verify: { type: 'frontmostApp', app: 'Finder' },
        simulatorScene: 'macos-01-step-1',
      },
      {
        instruction:
          'Spójrz teraz na lewy górny róg ekranu tuż obok ikony jabłuszka  i kliknij pogrubiony napis „Finder” na pasku menu.',
        hint: 'Na samej górze ekranu, zaraz po prawej stronie znaczka , widnieje słowo „Finder”.',
        hint2: 'Przesuń kursor w lewy górny róg ekranu i kliknij napis „Finder”, aby rozwinąć jego menu.',
        verify: { type: 'simulatorAction', action: 'click-menubar-app' },
        simulatorScene: 'macos-01-step-2',
      },
      {
        instruction:
          'Teraz zamknij otwarte okno na próbę: kliknij czerwoną kropkę w lewym górnym rogu samego okna i zobacz, że kropka pod ikoną w Docku nadal świeci.',
        hint: 'Trzy kolorowe kropki (czerwona, żółta, zielona) znajdują się w lewym górnym rogu okna na środku ekranu.',
        hint2: 'Kliknij pierwszą, czerwoną kropkę w narożniku okna Findera.',
        verify: { type: 'simulatorAction', action: 'click-red-dot' },
        simulatorScene: 'macos-01-step-3',
      },
    ],
  },
  {
    id: 'macos-02-pobrane',
    track: 'macos',
    level: 1,
    title: 'Gdzie lądują pobrane pliki i jak je odnaleźć',
    realLifeHook:
      'Gdy pobierasz fakturę za prąd albo bilet kolejowy z internetu i ułamek sekundy później plik znika bez śladu.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Tropicielki Przesyłek',
    synonyms: [
      'pobrane',
      'downloads',
      'gdzie jest pobrany plik',
      'sciagniete pliki',
      'zniknela faktura',
      'pobralam plik i nie ma',
      'gdzie zapisalo z internetu',
      'sciagnelam pdf',
      'folder pobrane',
      'gdzie laduja pliki',
      'nie moge znalezc pobranego',
      'bilet z internetu zniknal',
    ],
    theory: {
      id: 'theory-macos-02-pobrane',
      category: 'Pliki i foldery',
      title: 'Dlaczego Mac chowa nowe pliki do jednego przedpokoju',
      metaphor: 'Stolik na paczki od kuriera tuż za drzwiami wejściowymi',
      story:
        'Znasz to uczucie, prawda? Klikasz w mailu albo w banku „Pobierz potwierdzenie PDF”, coś mignie na ekranie, jakby mały papierek przeleciał po przekątnej… i cisza. Na Pulpicie pusto. W programie pusto. Człowiek zaczyna podejrzewać, że komputer pożarł dokument. Spokojnie – Mac jest po prostu przesadnie porządnicki. Wyobraź sobie, że kurier przynosi Ci paczkę. Gdyby rzucał ją prosto na stół w jadalni między filiżanki z kawą, szybko zrobiłby się bałagan. Dlatego w każdym Macu tuż za drzwiami wejściowymi stoi specjalny stolik na nowe przesyłki z internetu. Nazywa się „Pobrane” (czasem zobaczysz angielską nazwę Downloads). Niezależnie od tego, czy ściągniesz zdjęcie z poczty, wyciąg z konta w przeglądarce Safari, czy przepis kulinarny – wszystko, co przychodzi ze świata zewnętrznego, ląduje najpierw na tym stoliku. Dopiero stamtąd możesz spokojnie przełożyć ważny dokument do „Dokumentów” (czyli domowej szafy z segregatorami) albo na „Biurko” (czyli na blat pod ręką).',
      realExplanation:
        'Domyślnym miejscem zapisu wszystkich plików pobieranych z przeglądarki Safari, Chrome oraz zapisywanych załączników z poczty jest folder „Pobrane” w Twoim katalogu domowym. Dostaniesz się do niego na dwa sposoby: otwierając okno Findera i klikając „Pobrane” na pasku bocznym po lewej stronie albo klikając ikonę folderu Pobrane w prawej części Docka (obok Kosza).',
      oneLiner:
        'Każdy plik pobrany z internetu lub poczty czeka na Ciebie w folderze Pobrane.',
      commonMyth:
        'Wiele osób pobiera ten sam plik pięć razy z rzędu, bo nie widzi go na Pulpicie. A tymczasem wszystkie pięć kopii leży grzecznie w folderze Pobrane.',
      illustrationId: 'downloads-mailbox',
    },
    steps: [
      {
        instruction:
          'Otwórz okno Findera, klikając jego uśmiechniętą ikonę w Docku na dole ekranu.',
        hint: 'Pierwsza ikona z lewej strony na dolnym pasku.',
        hint2: 'Kliknij niebiesko-białą twarz Findera w Docku.',
        verify: { type: 'frontmostApp', app: 'Finder' },
        simulatorScene: 'macos-02-step-1',
      },
      {
        instruction:
          'Na szarym pasku bocznym po lewej stronie okna Findera kliknij pozycję „Pobrane” (z ikoną strzałki w kółku).',
        hint: 'Spójrz na lewą kolumnę otwartego okna Findera – tam są nazwy Biurko, Dokumenty i Pobrane.',
        hint2: 'Kliknij napis „Pobrane” w lewej kolumnie okna Findera.',
        verify: { type: 'simulatorAction', action: 'select-sidebar-downloads' },
        simulatorScene: 'macos-02-step-2',
      },
      {
        instruction:
          'Kliknij znaleziony plik „Faktura-prad.pdf” na liście, aby zobaczyć, że właśnie tu trafił po pobraniu.',
        hint: 'Plik „Faktura-prad.pdf” widnieje w głównej części okna po prawej stronie.',
        hint2: 'Kliknij raz w wiersz z nazwą „Faktura-prad.pdf” wewnątrz folderu Pobrane.',
        verify: { type: 'simulatorAction', action: 'select-downloaded-file' },
        simulatorScene: 'macos-02-step-3',
      },
    ],
  },
  {
    id: 'macos-03-zrzut-ekranu',
    track: 'macos',
    level: 1,
    title: 'Zrzut ekranu i gdzie go szukać',
    realLifeHook:
      'Gdy chcesz błyskawicznie sfotografować przepis, potwierdzenie rezerwacji albo komunikat na ekranie.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Fotografa Ekranu',
    synonyms: [
      'zrzut ekranu',
      'screen',
      'skrin',
      'printscreen',
      'print screen',
      'prtsc',
      'zdjecie ekranu',
      'fotka ekranu',
      'jak zrobic screena',
      'zrzót ekranu',
      'wycinek ekranu',
      'sfotografowac ekran',
    ],
    theory: {
      id: 'theory-macos-03-zrzut-ekranu',
      category: 'Codzienne sztuczki',
      title: 'Aparat Polaroid ukryty pod klawiszami',
      metaphor: 'Błyskawiczny aparat fotograficzny, który kładzie gotowe zdjęcie prosto na blat biurka',
      story:
        'Na zwykłych klawiaturach ze świata Windowsa jest osobny klawisz z napisem Print Screen. Kiedy patrzysz na klawiaturę MacBooka, możesz szukać go godzinami – i nie znajdziesz, bo Apple uznało, że jeden klawisz to za mało, skoro można zrobić cały podręczny zakład fotograficzny. Twój Mac ma wbudowany aparat typu Polaroid. Zamiast robić zdjęcie telefonem z odbiciem lampy w szybie monitora, naciskasz kombinację klawiszy, słyszysz ciche kliknięcie migawki aparatu i gotowe zdjęcie ląduje prosto na Twoim Pulpicie! Co najlepsze, możesz wybrać, czy chcesz sfotografować cały ekran od brzegu do brzegu, czy tylko mały wycinek – na przykład samą tabelkę z godzinami odjazdu pociągu. Po zrobieniu zdjęcia w prawym dolnym rogu ekranu przez chwilę mignie mała miniaturka. Jeśli jej nie ruszysz, po kilku sekundach sama ułoży się na Pulpicie z dokładną datą i godziną w nazwie.',
      realExplanation:
        'W systemie macOS (od wersji 10.14 Mojave wzwyż) głównym narzędziem do zrzutów ekranu jest panel wywoływany skrótem ⌘⇧5 (klawisz Command ⌘ + klawisz Shift ⇧ + cyfra 5). Pozwala on wybrać cały ekran, wybrane okno lub zaznaczony fragment. Szybkie skróty działające na każdym Macu (także na starszym macOS 10.13 High Sierra) to ⌘⇧3 (cały ekran od razu) oraz ⌘⇧4 (zaznaczenie fragmentu kursorem). Wszystkie zrzuty ekranu zapisują się domyślnie na Pulpicie jako pliki PNG.',
      oneLiner:
        'Skrót ⌘⇧5 otwiera aparat ekranowy, a gotowe zdjęcie zawsze ląduje na Pulpicie.',
      commonMyth:
        'Wiele osób myśli, że zrzut ekranu po zrobieniu trzeba gdzieś wkleić, bo inaczej przepadnie. A tymczasem Mac sam zapisuje go jako osobny plik obrazka na Pulpicie.',
      illustrationId: 'screenshot-polaroid',
    },
    steps: [
      {
        instruction:
          'Wciśnij na klawiaturze skrót ⌘⇧5 (przytrzymaj klawisze Command ⌘ oraz Shift ⇧, a następnie naciśnij cyfrę 5), aby wywołać pasek zrzutu ekranu.',
        hint: 'Klawisz ⌘ (Command) leży tuż obok spacji, a ⇧ (Shift) to strzałka w górę nad klawiszem Control/Fn. W symulatorze kliknij przycisk wywołania paska zrzutu.',
        hint2: 'Kliknij podświetlony przycisk „Wywołaj ⌘⇧5” na dole symulatora lub wciśnij Command + Shift + 5.',
        verify: { type: 'simulatorAction', action: 'open-screenshot-bar' },
        simulatorScene: 'macos-03-step-1',
        variants: [
          {
            osRange: '<10.14',
            instruction:
              'Na systemie macOS High Sierra wciśnij skrót ⌘⇧4 (przytrzymaj Command ⌘ i Shift ⇧, a potem naciśnij cyfrę 4), aby zamienić kursor w celownik fotograficzny.',
            hint: 'Na starszych Macach (10.13) nie ma paska ⌘⇧5 – używamy bezpośrednio skrótu ⌘⇧4.',
            hint2: 'Wciśnij razem Command + Shift + 4 lub kliknij podświetlony przycisk w symulatorze.',
            simulatorScene: 'macos-03-step-1-legacy',
          },
        ],
      },
      {
        instruction:
          'Kliknij przycisk „Przechwyć” (lub naciśnij Enter), aby zrobić zdjęcie ekranu.',
        hint: 'Na pasku u dołu ekranu kliknij przycisk „Przechwyć” po prawej stronie.',
        hint2: 'Kliknij podświetlony przycisk „Przechwyć” na pasku aparatu ekranowego.',
        verify: {
          type: 'newFile',
          folder: '~/Desktop',
          pattern: '*Zrzut ekranu*|*Screen Shot*|*Screenshot*',
        },
        simulatorScene: 'macos-03-step-2',
        variants: [
          {
            osRange: '<10.14',
            instruction:
              'Przeciągnij celownikiem po fragmencie ekranu i puść przycisk myszy, aby zapisać zdjęcie na Pulpicie.',
            hint: 'Gdy puścisz przycisk myszy, usłyszysz dźwięk migawki aparatu.',
            hint2: 'Kliknij podświetlony obszar w symulatorze, aby wykonać zrzut na Pulpicie.',
            simulatorScene: 'macos-03-step-2-legacy',
          },
        ],
      },
      {
        instruction:
          'Spójrz na prawą stronę Pulpitu i kliknij nowo utworzony plik „Zrzut ekranu”, aby się upewnić, gdzie zawsze czekają Twoje zrzuty.',
        hint: 'Nowe zrzuty ekranu pojawiają się jako ikony obrazków bezpośrednio na Pulpicie.',
        hint2: 'Kliknij podświetloną ikonę „Zrzut ekranu” na Pulpicie.',
        verify: { type: 'simulatorAction', action: 'click-desktop-screenshot' },
        simulatorScene: 'macos-03-step-3',
      },
    ],
  },
  {
    id: 'macos-04-spotlight',
    track: 'macos',
    level: 1,
    title: 'Spotlight – znajdź cokolwiek w 3 sekundy',
    realLifeHook:
      'Gdy dokładnie pamiętasz, że zapisałaś umowę albo przepis na sernik, ale nie masz pojęcia, w którym z dwudziestu folderów leży.',
    estimatedMinutes: 4,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Mistrzyni Lupki',
    synonyms: [
      'spotlight',
      'lupka',
      'szukaj',
      'wyszukiwarka',
      'zgubilam plik',
      'nie wiem gdzie zapisalam',
      'znajdz fakture',
      'szukanie na macu',
      'gdzie jest moj dokument',
      'jak cos znalezc',
      'lupa u gory',
      'command spacja',
    ],
    theory: {
      id: 'theory-macos-04-spotlight',
      category: 'Wyszukiwanie i skróty',
      title: 'Osobisty lokaj, który pamięta każdą szufladę w domu',
      metaphor: 'Niezawodny kamerdyner wzywany dzwoneczkiem ⌘ + spacja',
      story:
        'Szukanie zgubionego dokumentu przez otwieranie po kolei dwudziestu folderów przypomina wywracanie wszystkich szuflad w mieszkaniu, bo zapomniałyśmy, gdzie położony został zapasowy klucz. Na szczęście w Twoim MacBooku mieszka cichy, genialny lokaj o imieniu Spotlight. Ten lokaj nie śpi: kiedy Ty piszesz dokument albo zapisujesz zdjęcie, on skrupulatnie notuje w swoim notesie nie tylko nazwę pliku, ale nawet słowa, które są w środku! Oznacza to, że jeśli zapisałaś plik pod tajemniczą nazwą „dokument123.pdf”, ale w środku jest słowo „ubezpieczenie”, lokaj Spotlight i tak go dla Ciebie wyciągnie. Jak go zawołać? Nie musisz nawet szukać żadnego okna. Naciskasz kciukiem dwa sąsiadujące klawisze: ⌘ (Command) oraz długą spację – albo klikasz małą lupkę w prawym górnym rogu ekranu. Na środku pojawi się eleganckie okienko, które otwiera dokumenty, uruchamia programy, a nawet liczy jak kalkulator.',
      realExplanation:
        'Spotlight to ogólnosystemowa wyszukiwarka macOS. Wywołujesz ją skrótem ⌘Spacja (Command + spacja) lub klikając ikonę lupy na górnym pasku menu po prawej stronie. Spotlight przeszukuje jednocześnie nazwy plików, treść dokumentów PDF i tekstowych, wiadomości e-mail, zainstalowane aplikacje oraz ustawienia systemowe. Naciśnięcie klawisza Enter od razu otwiera pierwszy podświetlony wynik.',
      oneLiner:
        'Wciśnij ⌘ i spację, wpisz trzy litery szukanego słowa i pozwól Macowi znaleźć plik za Ciebie.',
      commonMyth:
        'Wiele osób myśli, że trzeba znać dokładną nazwę pliku, żeby go znaleźć. A tymczasem Spotlight potrafi znaleźć dokument nawet po słowie napisanym wewnątrz jego treści.',
      illustrationId: 'spotlight-butler',
    },
    steps: [
      {
        instruction:
          'Kliknij ikonę lupki w prawym górnym rogu ekranu na pasku menu (lub wciśnij na klawiaturze ⌘ i spację).',
        hint: 'Spójrz w prawy górny róg ekranu, obok zegarka i ikony Wi-Fi.',
        hint2: 'Kliknij podświetloną ikonę lupy na górnym pasku menu.',
        verify: { type: 'simulatorAction', action: 'open-spotlight' },
        simulatorScene: 'macos-04-step-1',
      },
      {
        instruction:
          'Wpisz słowo „sernik” w pasku wyszukiwania Spotlight, aby odnaleźć przepis bez przekopywania folderów.',
        hint: 'Kliknij w pole tekstowe z napisem „Szukaj w Spotlight” i wpisz „sernik” lub kliknij podpowiedź.',
        hint2: 'Wpisz „sernik” w otwartym okienku wyszukiwania na środku ekranu.',
        verify: { type: 'simulatorAction', action: 'type-spotlight-query' },
        simulatorScene: 'macos-04-step-2',
      },
      {
        instruction:
          'Kliknij znaleziony dokument „Przepis-na-sernik.pdf” na liście wyników, aby go natychmiast otworzyć.',
        hint: 'Wynik pojawił się tuż pod polem wyszukiwania.',
        hint2: 'Kliknij podświetlony wiersz „Przepis-na-sernik.pdf” w oknie Spotlight.',
        verify: { type: 'simulatorAction', action: 'open-spotlight-result' },
        simulatorScene: 'macos-04-step-3',
      },
    ],
  },
  {
    id: 'macos-05-finder-foldery',
    track: 'macos',
    level: 1,
    title: 'Finder: foldery, przeciąganie i zakładka „Ostatnie”',
    realLifeHook:
      'Gdy na Pulpicie robi się tłoczno od luźnych rachunków i chcesz je ułożyć w jednej podpisanej teczce.',
    estimatedMinutes: 6,
    prerequisites: ['macos-02-pobrane'],
    reward: 'Odznaka Architektki Porządku',
    synonyms: [
      'finder',
      'niebieska buzka',
      'nowy folder',
      'katalog',
      'przeciaganie plikow',
      'ostatnie pliki',
      'jak uporzadkowac pliki',
      'stworzyc folder',
      'przeniesc plik',
      'segregator na pliki',
      'okno z plikami',
      'sciezka do pliku',
    ],
    theory: {
      id: 'theory-macos-05-finder-foldery',
      category: 'Pliki i foldery',
      title: 'Czym różni się kartka papieru od tekturowej teczki i dlaczego ścieżka to adres pocztowy',
      metaphor: 'Szafa z szufladami, podpisane teczki i widok „Ostatnie” jako blat z wczorajszą pracą',
      story:
        'W świecie komputerów wszystko sprowadza się do dwóch przedmiotów znanych z każdego biura: plików oraz folderów. Plik to pojedyncza rzecz – jedna kartka z umową, jedno zdjęcie z wakacji albo jedna piosenka. Folder (nazywany czasem katalogiem) to zwykła tekturowa teczka, do której wkładasz pliki, żeby nie fruwały luzem po pokoju. Do teczek możesz wkładać kolejne mniejsze teczki – na przykład w teczce „Dom” trzymać teczkę „Rachunki 2026”. Kiedy komputer pokazuje Ci napis „Małgorzata > Dokumenty > Dom > Rachunki 2026”, nie jest to żaden tajny kod informatyczny, tylko zwykły adres pocztowy: kraj, miasto, ulica i numer mieszkania. Jest też jedna pułapka w Finderze, o której warto wiedzieć: zakładka „Ostatnie” na lewym pasku. To nie jest osobna szuflada! „Ostatnie” działa jak lustro, które pokazuje wszystkie pliki dotykane przez Ciebie w ostatnich dniach, niezależnie od tego, w której szufladzie naprawdę leżą.',
      realExplanation:
        'Finder zarządza wszystkimi plikami i folderami na dysku Maca. Nowy folder utworzysz, klikając prawym przyciskiem myszy (lub dwoma palcami na gładziku) na pustym tle okna i wybierając „Nowy folder”, albo z górnego menu Plik → Nowy folder. Aby włożyć plik do folderu, chwytasz go lewym przyciskiem myszy, przeciągasz nad ikonę folderu i puszczasz. Zakładka „Ostatnie” to widok wyszukiwania pokazujący niedawno otwierane pliki z całego dysku.',
      oneLiner:
        'Plik to pojedyncza kartka, folder to teczka, a „Ostatnie” pokazuje to, nad czym ostatnio pracowałaś.',
      commonMyth:
        'Wiele osób kasuje pliki z widoku „Ostatnie”, myśląc, że czyści tylko historię podglądu. A tymczasem skasowanie pliku w „Ostatnich” wyrzuca sam oryginał do Kosza!',
      illustrationId: 'finder-folders-cabinet',
    },
    steps: [
      {
        instruction:
          'W otwartym oknie Findera kliknij zakładkę „Dokumenty” na pasku bocznym po lewej stronie.',
        hint: 'Spójrz na lewą kolumnę okna Findera – „Dokumenty” znajdują się tuż nad lub pod „Pobrane”.',
        hint2: 'Kliknij podświetloną pozycję „Dokumenty” na lewym pasku Findera.',
        verify: { type: 'simulatorAction', action: 'finder-open-documents' },
        simulatorScene: 'macos-05-step-1',
      },
      {
        instruction:
          'Utwórz nową teczkę na rachunki: kliknij przycisk „Nowy folder” na górnym pasku okna (lub z menu Plik → Nowy folder).',
        hint: 'W górnej części okna Findera podświetlony jest przycisk tworzenia nowego folderu.',
        hint2: 'Kliknij podświetlony przycisk „Nowy folder” w oknie Findera.',
        verify: { type: 'simulatorAction', action: 'finder-create-folder' },
        simulatorScene: 'macos-05-step-2',
      },
      {
        instruction:
          'Przenieś plik „Rachunek-gaz.pdf” do nowego folderu „Rachunki”, klikając na plik lub przeciągając go na teczkę.',
        hint: 'Chwyć plik „Rachunek-gaz.pdf” i upuść go na folder „Rachunki” (lub kliknij przycisk przeniesienia w symulatorze).',
        hint2: 'Kliknij podświetlony plik „Rachunek-gaz.pdf”, aby włożyć go do teczki „Rachunki”.',
        verify: { type: 'simulatorAction', action: 'finder-move-file-to-folder' },
        simulatorScene: 'macos-05-step-3',
      },
    ],
  },
  {
    id: 'macos-06-skroty',
    track: 'macos',
    level: 1,
    title: '⌘C, ⌘V, ⌘Z, ⌘Tab i spacja – pięć skrótów, które zmieniają wszystko',
    realLifeHook:
      'Gdy przez przypadek skasujesz pół długiego maila albo chcesz podejrzeć dwadzieścia zdjęć bez czekania, aż każde się otworzy.',
    estimatedMinutes: 6,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Wirtuozki Klawiatury',
    synonyms: [
      'kopiuj wklej',
      'ctrl c',
      'ctrl v',
      'command c',
      'jak skopiowac tekst',
      'cofnij',
      'usunelam przez przypadek',
      'skroty klawiszowe',
      'koniczynka',
      'klawisz command',
      'podglad spacja',
      'schowek',
    ],
    theory: {
      id: 'theory-macos-06-skroty',
      category: 'Wyszukiwanie i skróty',
      title: 'Schowek jako kelnerska taca na jedną filiżankę i magiczny wehikuł czasu ⌘Z',
      metaphor: 'Mała taca kelnerska na dokładnie jedną rzecz oraz przycisk cofania czasu o pięć sekund',
      story:
        'Pierwsza rzecz, o którą potyka się każdy na MacBooku: dlaczego skrót Ctrl+C znany z Windowsa tutaj nie działa? Ponieważ na Macu głównym dowódcą nie jest klawisz Control, lecz klawisz Command ze znaczkiem przypominającym czterolistną koniczynkę lub zamek błyskawiczny (⌘), położony tuż po obu stronach spacji. Dzięki temu naciskasz go wygodnie kciukiem, bez wyginania małego palca! Kiedy zaznaczasz zdanie i wciskasz ⌘C (Kopiuj), kładziesz kopię tego zdania na niewidzialną kelnerską tacę zwaną Schowkiem. Ta taca ma jedną bardzo ważną cechę: mieści tylko jedną rzecz naraz. Jeśli położysz na niej nowe zdanie, poprzednie spada i znika. Gdy przejdziesz w inne miejsce i wciśniesz ⌘V (Wklej), zdejmujesz tekst z tacy na ekran. A co, jeśli coś Ci się omsknie i cały akapit tekstu nagle zniknie? Bez paniki! Wciskasz ⌘Z – to osobisty wehikuł czasu, który cofa ostatni ruch. A na deser najpiękniejsza sztuczka Maca: kliknij dowolny plik w Finderze i naciśnij samą spację. Plik otworzy się w sekundę do podglądu!',
      realExplanation:
        'Na komputerach Mac skróty klawiszowe wykorzystują klawisz Command (⌘): ⌘C kopiuje zaznaczony element do schowka pamięci podręcznej, ⌘V wkleja zawartość schowka w miejscu kursora, ⌘Z cofa ostatnią wykonaną czynność (np. przypadkowe usunięcie tekstu lub pliku), a ⌘Tab pozwala przełączać się między otwartymi aplikacjami. Z kolei naciśnięcie samej spacji na zaznaczonym pliku w Finderze uruchamia funkcję Szybki podgląd (Quick Look), która pokazuje zawartość PDF-a lub zdjęcia bez otwierania osobnego programu.',
      oneLiner:
        'Kciuk na ⌘ obok spacji: ⌘C kopiuje, ⌘V wkleja, ⌘Z ratuje z opresji, a sama spacja podgląda plik.',
      commonMyth:
        'Wiele osób myśli, że gdy przypadkiem skasują tekst, trzeba go pisać od nowa. A tymczasem jedno wciśnięcie ⌘Z natychmiast przywraca skasowany fragment.',
      illustrationId: 'clipboard-tray-shortcuts',
    },
    steps: [
      {
        instruction:
          'Skopiuj numer konta do schowka: zaznacz go i użyj skrótu ⌘C (lub kliknij podświetlony przycisk kopiowania w symulatorze).',
        hint: 'Przytrzymaj klawisz ⌘ (Command obok spacji) i naciśnij literę C.',
        hint2: 'Kliknij podświetlony przycisk „Kopiuj (⌘C)” przy numerze konta w symulatorze.',
        verify: { type: 'clipboardContains', text: '*' },
        simulatorScene: 'macos-06-step-1',
      },
      {
        instruction:
          'Teraz wklej skopiowany tekst w drugim polu za pomocą skrótu ⌘V.',
        hint: 'Przytrzymaj klawisz ⌘ (Command) i naciśnij literę V.',
        hint2: 'Kliknij podświetlony przycisk „Wklej (⌘V)” w polu odbiorcy.',
        verify: { type: 'simulatorAction', action: 'shortcut-paste' },
        simulatorScene: 'macos-06-step-2',
      },
      {
        instruction:
          'Wypróbuj Szybki podgląd: zaznacz plik „Umowa.pdf” i naciśnij klawisz spacji, aby podejrzeć dokument bez otwierania programu.',
        hint: 'Pojedyncze naciśnięcie długiego klawisza spacji otwiera i zamyka podgląd pliku.',
        hint2: 'Kliknij podświetlony przycisk „Podgląd spacją” na pliku „Umowa.pdf”.',
        verify: { type: 'simulatorAction', action: 'shortcut-quicklook-space' },
        simulatorScene: 'macos-06-step-3',
      },
    ],
  },
  {
    id: 'macos-07-okna-mission-control',
    track: 'macos',
    level: 2,
    title: 'Przełączanie okien i Mission Control – koniec z chowaniem się programów',
    realLifeHook:
      'Gdy masz otwartą pocztę, przeglądarkę i dokument, i nagle jedno okno przykrywa drugie tak, że nie możesz go znaleźć.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock', 'macos-06-skroty'],
    reward: 'Odznaka Dyrygentki Okien',
    synonyms: [
      'mission control',
      'zniknelo okno',
      'za duzo okien',
      'przelaczanie okien',
      'gdzie podzial sie program',
      'okno schowalo sie pod spodem',
      'pelny ekran',
      'zielona kropka',
      'wszystkie otwarte okna',
      'balagan na ekranie',
      'launchpad',
    ],
    theory: {
      id: 'theory-macos-07-okna-mission-control',
      category: 'Wielozadaniowość',
      title: 'Widok z lotu ptaka na wszystkie rozłożone gazety na stole',
      metaphor: 'Uniesienie się pod sufit, skąd wszystkie kartki na stole rozsuwają się obok siebie',
      story:
        'Kiedy pracujesz przy prawdziwym stole i położysz dużą gazetę na kopercie z rachunkiem, koperta znika z oczu, choć przecież nadal leży pod spodem. Dokładnie to samo dzieje się na ekranie MacBooka: otwierasz Safari, potem Maila, potem Podgląd i nagle mniejsze okno chowa się za większym. Jeszcze ciekawiej robi się wtedy, gdy klikniesz zieloną kropkę w rogu okna – wtedy okno powiększa się na cały ekran i tworzy dla siebie osobny „pokój” z boku, zakrywając nawet pasek menu! Jak nad tym zapanować bez nerwowego przesuwania każdego okna po kolei? Służy do tego funkcja Mission Control (czyli Centrum Kontroli Lotów). Przesuwasz trzema palcami w górę po gładziku albo naciskasz klawisz F3 (ten z trzema prostokącikami nad cyfrą 3). W ułamku sekundy wszystkie otwarte okna grzecznie rozsuwają się na boki tak, że widzisz każde z nich jak na dłoni. Klikasz to, którego szukasz, i od razu ląduje na wierzchu.',
      realExplanation:
        'Mission Control wyświetla podgląd wszystkich aktualnie otwartych okien oraz pełnoekranowych przestrzeni roboczych (Biurek). Uruchomisz go klawiszem F3 na górnym rzędzie klawiatury, skrótem Control + strzałka w górę, ikoną Mission Control w Docku lub gestem przesunięcia trzema palcami w górę po gładziku. Z kolei aplikacja Launchpad (ikona z kolorowymi kwadracikami lub rakietą w Docku) pokazuje pełną listę wszystkich zainstalowanych programów jak na ekranie iPhone’a.',
      oneLiner:
        'Gdy okno schowa się pod innymi, naciśnij F3 (Mission Control), a wszystkie okna rozsuną się obok siebie.',
      commonMyth:
        'Wiele osób myśli, że gdy okno zniknie po kliknięciu innego programu, zostało zamknięte. A tymczasem leży ono nienaruszone warstwę niżej – kliknij jego ikonę w Docku lub użyj F3, aby znów pojawiło się na wierzchu.',
      illustrationId: 'mission-control-windows',
    },
    steps: [
      {
        instruction:
          'Wywołaj widok Mission Control (klawisz F3 lub przycisk Mission Control), aby rozsunięte zostały wszystkie otwarte okna.',
        hint: 'W górnym rzędzie klawiatury poszukaj klawisza F3 z trzema prostokątami lub kliknij podświetlony przycisk.',
        hint2: 'Kliknij podświetlony przycisk „Pokaż wszystkie okna (F3)” w symulatorze.',
        verify: { type: 'simulatorAction', action: 'trigger-mission-control' },
        simulatorScene: 'macos-07-step-1',
        variants: [
          {
            osRange: '<11',
            instruction:
              'Naciśnij klawisz Mission Control (F3) lub kliknij ikonę Mission Control w Docku, aby zobaczyć wszystkie otwarte okna z lotu ptaka.',
            hint: 'Klawisz F3 znajduje się nad cyframi 3 i 4.',
            simulatorScene: 'macos-07-step-1',
          },
        ],
      },
      {
        instruction:
          'Kliknij odsłonięte okno z dokumentem „Lista-zakupow.pdf”, które wcześniej chowało się pod oknem przeglądarki.',
        hint: 'W widoku Mission Control wszystkie okna leżą obok siebie – kliknij to z listą zakupów.',
        hint2: 'Kliknij podświetloną miniaturę okna „Lista-zakupow.pdf”.',
        verify: { type: 'simulatorAction', action: 'select-window-in-mission-control' },
        simulatorScene: 'macos-07-step-2',
      },
      {
        instruction:
          'Przełącz się z powrotem do Safari jednym kliknięciem w jego ikonę kompasu na pasku Dock u dołu ekranu.',
        hint: 'Kliknięcie ikony dowolnego otwartego programu w Docku zawsze wyciąga jego okno na sam wierzch.',
        hint2: 'Kliknij podświetloną ikonę Safari w Docku na dole symulatora.',
        verify: { type: 'simulatorAction', action: 'switch-app-via-dock' },
        simulatorScene: 'macos-07-step-3',
      },
    ],
  },
  {
    id: 'macos-08-ustawienia',
    track: 'macos',
    level: 1,
    title: 'Ustawienia: Wi-Fi, dźwięk i Bluetooth – co bezpiecznie przełączać',
    realLifeHook:
      'Gdy jesteś w hotelu lub u znajomych i chcesz wpisać hasło do Wi-Fi, podłączyć słuchawki albo pogłośnić dźwięk.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Pani Domu Systemu',
    synonyms: [
      'wifi',
      'wi-fi',
      'internet nie dziala',
      'bluetooth',
      'blutut',
      'sluchawki',
      'dzwiek',
      'glosnosc',
      'brak glosu',
      'preferencje systemowe',
      'ustawienia systemowe',
      'glosnik na pasku',
    ],
    theory: {
      id: 'theory-macos-08-ustawienia',
      category: 'Ustawienia i bezpieczeństwo',
      title: 'Tablica rozdzielcza, w której niczego nie da się zepsuć przez przypadek',
      metaphor: 'Włączniki światła i pokrętło radia w salonie, oddzielone od silnika pod maską',
      story:
        'Wiele osób boi się wchodzić do Ustawień komputera, żeby „czegoś nie przestawić i nie popsuć systemu”. W przypadku Maca możesz odetchnąć z ulgą: inżynierowie Apple zaprojektowali Ustawienia jak deskę rozdzielczą w nowoczesnym samochodzie. Na wierzchu masz wygodne przełączniki do klimatyzacji, radia i świateł – czyli Wi-Fi (bezprzewodowy internet), Bluetooth (łączenie słuchawek, myszki czy głośnika bez kabla) oraz Dźwięk. Wszystkie rzeczy, które mogłyby cokolwiek namieszać głębiej w systemie, są zamknięte na kłódkę i bez wpisania Twojego hasła nawet nie drgną! Warto też wiedzieć o jednej zmianie, jaką Apple wprowadziło kilka lat temu: na starszych Macach to miejsce nazywa się „Preferencje systemowe” i wygląda jak tablica z rzędami ikonek, natomiast na nowszych Macach nosi nazwę „Ustawienia systemowe” i ma listę po lewej stronie, zupełnie jak w iPhonie. W obu miejscach znajdziesz dokładnie te same przełączniki.',
      realExplanation:
        'W systemach macOS 12 Monterey i starszych konfiguracja znajduje się w „Preferencjach systemowych” (układ siatki ikon), a od macOS 13 Ventura w „Ustawieniach systemowych” (układ z paskiem bocznym po lewej stronie). Do obu zawsze trafisz tak samo: klikając ikonę jabłuszka  w lewym górnym rogu ekranu. Codzienne przełączniki Wi-Fi, Bluetooth i głośności są też dostępne od ręki w prawym górnym rogu paska menu.',
      oneLiner:
        'Pod jabłuszkiem  w lewym górnym rogu zawsze znajdziesz Wi-Fi, dźwięk i Bluetooth.',
      commonMyth:
        'Wiele osób myśli, że samo zajrzenie do Ustawień systemowych może rozregulować komputer. A tymczasem ważne opcje administracyjne są chronione hasłem i nie zmienią się od przypadkowego kliknięcia.',
      illustrationId: 'settings-switchboard',
    },
    steps: [
      {
        instruction:
          'Kliknij ikonę jabłuszka  w lewym górnym rogu ekranu i wybierz z menu „Ustawienia systemowe…”.',
        hint: 'Jabłuszko znajduje się zawsze w samym lewym górnym narożniku ekranu.',
        hint2: 'Kliknij podświetlone jabłuszko  na górnym pasku menu.',
        verify: { type: 'frontmostApp', app: 'System Settings' },
        simulatorScene: 'macos-08-step-1',
        variants: [
          {
            osRange: '<13',
            instruction:
              'Kliknij ikonę jabłuszka  w lewym górnym rogu ekranu i wybierz z menu „Preferencje systemowe…”.',
            hint: 'Na Twojej wersji macOS okno ustawień nosi nazwę „Preferencje systemowe…”.',
            hint2: 'Kliknij podświetlone jabłuszko  w lewym górnym rogu symulatora.',
            simulatorScene: 'macos-08-step-1-classic',
          },
        ],
      },
      {
        instruction:
          'Na liście po lewej stronie okna kliknij sekcję „Wi-Fi”, aby zobaczyć połączoną sieć domową.',
        hint: 'Sekcja „Wi-Fi” znajduje się na samej górze lewego paska bocznego w Ustawieniach.',
        hint2: 'Kliknij podświetlony wiersz „Wi-Fi” po lewej stronie okna Ustawień.',
        verify: { type: 'simulatorAction', action: 'settings-open-wifi' },
        simulatorScene: 'macos-08-step-2',
        variants: [
          {
            osRange: '<13',
            instruction:
              'W siatce ikon Preferencji systemowych kliknij ikonę „Sieć” (niebieska kula ziemska), aby sprawdzić połączenie Wi-Fi.',
            hint: 'Ikona „Sieć” znajduje się w trzecim rzędzie ikon Preferencji systemowych.',
            hint2: 'Kliknij podświetloną ikonę „Sieć” w oknie Preferencji systemowych.',
            simulatorScene: 'macos-08-step-2-classic',
          },
        ],
      },
      {
        instruction:
          'Teraz kliknij sekcję „Dźwięk” i przesuń suwak głośności wyjściowej, aby sprawdzić, jak reguluje się głośniki Maca.',
        hint: 'Sekcja „Dźwięk” ma czerwoną ikonę głośnika na liście po lewej stronie.',
        hint2: 'Kliknij podświetloną pozycję „Dźwięk” w oknie Ustawień.',
        verify: { type: 'simulatorAction', action: 'settings-open-sound' },
        simulatorScene: 'macos-08-step-3',
        variants: [
          {
            osRange: '<13',
            instruction:
              'Wróć do ikon i kliknij „Dźwięk” (ikona głośnika), a następnie zaznacz „Pokaż głośność na pasku menu”.',
            hint: 'Dzięki temu mały głośniczek będzie zawsze pod ręką obok zegarka u góry ekranu.',
            hint2: 'Kliknij podświetloną ikonę „Dźwięk” w oknie Preferencji systemowych.',
            simulatorScene: 'macos-08-step-3-classic',
            verifyNeeded: true,
          },
        ],
      },
    ],
  },
  {
    id: 'macos-09-aktualizacje',
    track: 'macos',
    level: 2,
    title: 'Aktualizacje i restart bez strachu',
    realLifeHook:
      'Gdy Mac wyświetla w rogu powiadomienie „Dostępne uaktualnienia” i obawiasz się, że po kliknięciu znikną Twoje dokumenty.',
    estimatedMinutes: 5,
    prerequisites: ['macos-08-ustawienia'],
    reward: 'Odznaka Spokojnego Kapitana',
    synonyms: [
      'aktualizacja',
      'uaktualnienia',
      'update',
      'uruchom ponownie',
      'restart',
      'mac chce sie aktualizowac',
      'czy aktualizowac maca',
      'nowa wersja systemu',
      'zainstaluj uaktualnienie',
      'zawiesil sie i chce restart',
      'bezpieczenstwo systemu',
    ],
    theory: {
      id: 'theory-macos-09-aktualizacje',
      category: 'Ustawienia i bezpieczeństwo',
      title: 'Przegląd techniczny mieszkania, podczas którego nikt nie rusza Twoich mebli',
      metaphor: 'Ekipa konserwatorów, która uszczelnia okna i wymienia zamki na bezpieczniejsze, nie dotykając szuflad',
      story:
        'Komunikat „Uruchom ponownie, aby zainstalować uaktualnienia” potrafi wywołać lekki dreszcz: a co, jeśli komputer się wyłączy, ekran zrobi się czarny z białym paskiem i po powrocie moje zdjęcia oraz dokumenty znikną? Uspokajam od razu: aktualizacja systemu nigdy nie kasuje Twoich prywatnych plików, zdjęć ani maili. Wyobraź sobie, że w Twoim mieszkaniu pojawia się sprawdzona ekipa serwisowa producenta: oliwią zawiasy, uszczelniają okna przed przeciągiem i wstawiają mocniejszy zamek w drzwiach wejściowych, żeby żaden internetowy włamywacz nie miał szans. Twoich szaf, albumów ze zdjęciami ani segregatorów na biurku nikt nawet nie dotyka. Jedyna zasada zdrowego rozsądku brzmi: nie wpuszczaj ekipy remontowej pięć minut przed ważnym spotkaniem wideo, bo aktualizacja trwa zazwyczaj od kilkunastu do trzydziestu minut. Najlepiej podłączyć wtedy MacBooka do ładowarki, kliknąć „Uaktualnij teraz” wieczorem i pójść zrobić sobie dobrą herbatę.',
      realExplanation:
        'Uaktualnienia systemu macOS zawierają łatki bezpieczeństwa chroniące przed zagrożeniami z sieci oraz poprawki błędów. Podczas aktualizacji oraz zwykłego ponownego uruchomienia (Jabłuszko  → Uruchom ponownie…) wszystkie Twoje pliki w Dokumentach, Pobranych i na Pulpicie pozostają całkowicie bezpieczne. Przed aktualizacją warto jedynie zapisać otwarte dokumenty i podłączyć zasilacz.',
      oneLiner:
        'Aktualizacja wzmacnia bezpieczeństwo Maca i nigdy nie usuwa Twoich dokumentów ani zdjęć.',
      commonMyth:
        'Wiele osób odkłada aktualizacje miesiącami w obawie przed utratą plików. A tymczasem to właśnie regularne uaktualnienia najmocniej chronią Maca przed zagrożeniami z internetu.',
      illustrationId: 'updates-shield-home',
    },
    steps: [
      {
        instruction:
          'Otwórz Ustawienia systemowe, klikając jabłuszko  w lewym górnym rogu ekranu.',
        hint: 'Wybierz pozycję „Ustawienia systemowe…” (lub „Preferencje systemowe…” na starszym Macu).',
        hint2: 'Kliknij podświetlone jabłuszko  w lewym górnym rogu symulatora.',
        verify: { type: 'frontmostApp', app: 'System Settings' },
        simulatorScene: 'macos-09-step-1',
        variants: [
          {
            osRange: '<10.14',
            instruction:
              'Na systemie macOS High Sierra otwórz aplikację „App Store” z paska Dock i kliknij zakładkę „Uaktualnienia” u góry okna.',
            hint: 'W wersji 10.13 aktualizacje systemu sprawdza się w aplikacji App Store (niebieska ikona z literą A).',
            simulatorScene: 'macos-09-step-1-classic',
            verifyNeeded: true,
          },
          {
            osRange: '>=10.14 <13',
            instruction:
              'Kliknij jabłuszko  w lewym górnym rogu i wybierz „Preferencje systemowe…”.',
            hint: 'Na Twoim Macu aktualizacje mają swoją osobną ikonę w Preferencjach systemowych.',
            simulatorScene: 'macos-09-step-1-classic',
          },
        ],
      },
      {
        instruction:
          'Kliknij kategorię „Ogólne” na lewym pasku, a następnie wybierz „Uaktualnienia oprogramowania”.',
        hint: 'Kategoria „Ogólne” ma szarą ikonę koła zębatego.',
        hint2: 'Kliknij podświetlony przycisk „Ogólne → Uaktualnienia oprogramowania” w oknie Ustawień.',
        verify: { type: 'simulatorAction', action: 'settings-open-updates' },
        simulatorScene: 'macos-09-step-2',
        variants: [
          {
            osRange: '<13',
            instruction:
              'Kliknij ikonę koła zębatego „Uaktualnienia oprogramowania”, aby sprawdzić, czy Twój Mac ma najnowszą ochronę.',
            hint: 'Ikona „Uaktualnienia oprogramowania” przypomina metalową zębatkę.',
            simulatorScene: 'macos-09-step-2-classic',
          },
        ],
      },
      {
        instruction:
          'Sprawdź status „macOS jest aktualny” i kliknij przycisk potwierdzenia, wiedząc już, że uaktualnienia są bezpieczne dla Twoich plików.',
        hint: 'Gdy pojawi się nowe uaktualnienie, podłącz ładowarkę i kliknij „Uaktualnij teraz”.',
        hint2: 'Kliknij podświetlony przycisk potwierdzenia w oknie Uaktualnień.',
        verify: { type: 'simulatorAction', action: 'confirm-updates-checked' },
        simulatorScene: 'macos-09-step-3',
      },
    ],
  },
  {
    id: 'macos-10-kosz',
    track: 'macos',
    level: 1,
    title: 'Kosz i odzyskiwanie – jak uratować przypadkowo usunięty plik',
    realLifeHook:
      'Gdy wyrzucisz dokument do Kosza i po chwili orientujesz się, że jednak był bardzo potrzebny.',
    estimatedMinutes: 4,
    prerequisites: ['macos-01-pulpit-dock', 'macos-05-finder-foldery'],
    reward: 'Odznaka Ratowniczki Dokumentów',
    synonyms: [
      'kosz',
      'smietnik',
      'skasowalam plik',
      'usunelam dokument',
      'jak odzyskac plik z kosza',
      'oprozniac kosz',
      'cofnij do poprzedniego miejsca',
      'wyrzucic do kosza',
      'kosz na smieci',
      'usuniete pliki',
    ],
    theory: {
      id: 'theory-macos-10-kosz',
      category: 'Pliki i foldery',
      title: 'Dlaczego Kosz w Macu to poczekalnia, a nie niszczarka do papieru',
      metaphor: 'Wiklinowy kosz pod biurkiem, z którego w każdej chwili możesz wyjąć zmiętą kartkę i ją wyprostować',
      story:
        'Każdemu z nas zdarzyło się wyrzucić coś w pośpiechu i sekundę później złapać się za głowę. Na szczęście inżynierowie projektujący Maca doskonale znali ludzką naturę. Kiedy przenosisz plik do Kosza (przeciągając go na ikonę śmietniczka w prawym końcu Docka albo klikając „Przenieś do Kosza”), komputer wcale go nie niszczy! Wyobraź sobie zwykły, suchy wiklinowy kosz na papiery stojący pod Twoim biurkiem w gabinecie. Dopóki sama nie wyniesiesz tego kosza na śmietnik przed domem (czyli nie klikniesz przycisku „Opróżnij”), każda wrzucona tam kartka leży bezpiecznie na swoim miejscu. Co więcej, każdy plik w Koszu ma przyczepioną małą karteczkę z informacją, z której szuflady przyszedł. Kiedy klikniesz na niego prawym przyciskiem myszy (czyli dwoma palcami na gładziku) i wybierzesz „Cofnij do poprzedniego miejsca”, plik sam odmaszeruje dokładnie do tego folderu, z którego został wcześniej zabrany!',
      realExplanation:
        'Kosz (znajdujący się zawsze na samym prawym końcu paska Dock) przechowuje usunięte pliki do momentu, aż ręcznie wybierzesz opcję „Opróżnij Kosz” (lub włączysz automatyczne czyszczenie po 30 dniach). Aby odzyskać usunięty plik, otwórz Kosz kliknięciem w Docku, kliknij plik dwoma palcami na gładziku (prawy przycisk) i wybierz „Cofnij do poprzedniego miejsca” albo po prostu przeciągnij go z powrotem na Pulpit.',
      oneLiner:
        'Dopóki nie opróżnisz Kosza, każdy wyrzucony plik możesz jednym kliknięciem przywrócić na miejsce.',
      commonMyth:
        'Wiele osób myśli, że wrzucenie pliku do Kosza bezpowrotnie go kasuje. A tymczasem w Koszu plik jest całkowicie nienaruszony i czeka na odzyskanie.',
      illustrationId: 'trash-recovery-basket',
    },
    steps: [
      {
        instruction:
          'Otwórz Kosz, klikając jego ikonę na samym prawym końcu paska Dock u dołu ekranu.',
        hint: 'Kosz znajduje się zawsze jako ostatnia ikona po prawej stronie Docka.',
        hint2: 'Kliknij podświetloną ikonę Kosza w prawym dolnym rogu symulatora.',
        verify: { type: 'simulatorAction', action: 'open-trash' },
        simulatorScene: 'macos-10-step-1',
      },
      {
        instruction:
          'Kliknij prawym przyciskiem (lub kliknij podświetlony plik „Wazna-umowa.pdf” w oknie Kosza), aby wywołać menu ratunkowe.',
        hint: 'Wewnątrz okna Kosza widnieje plik „Wazna-umowa.pdf”.',
        hint2: 'Kliknij podświetlony plik „Wazna-umowa.pdf” w oknie Kosza.',
        verify: { type: 'simulatorAction', action: 'select-file-in-trash' },
        simulatorScene: 'macos-10-step-2',
      },
      {
        instruction:
          'Wybierz z menu opcję „Cofnij do poprzedniego miejsca”, aby dokument wrócił dokładnie tam, skąd został usunięty.',
        hint: 'Opcja „Cofnij do poprzedniego miejsca” sama pamięta folder, w którym dokument leżał wcześniej.',
        hint2: 'Kliknij podświetlony przycisk „Cofnij do poprzedniego miejsca”.',
        verify: { type: 'simulatorAction', action: 'restore-file-from-trash' },
        simulatorScene: 'macos-10-step-3',
      },
    ],
  },
];

export const MACOS_MISSIONS: Mission[] = RAW_MACOS_MISSIONS.map(polishMission);
