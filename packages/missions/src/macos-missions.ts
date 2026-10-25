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
  {
    id: 'macos-11-plik-teczka-drzewo',
    track: 'macos',
    level: 1,
    title: 'Plik, teczka i drzewo katalogów – jak ułożone są rzeczy w komputerze',
    realLifeHook:
      'Gdy słyszysz słowa „plik”, „folder”, „katalog nadrzędny” albo „ścieżka dostępu” i chcesz wreszcie zobaczyć w głowie jasny, uporządkowany obraz zamiast labiryntu.',
    estimatedMinutes: 5,
    prerequisites: ['macos-01-pulpit-dock', 'macos-05-finder-foldery'],
    reward: 'Odznaka Architektki Porządku',
    synonyms: [
      'co to jest plik',
      'co to jest folder',
      'co to jest katalog',
      'drzewo katalogow',
      'sciezka do pliku',
      'gdzie lezy plik',
      'roznica miedzy plikiem a folderem',
      'teczka w komputerze',
      'pasek sciezki',
      'widok kolumn',
      'struktura folderow',
    ],
    theory: {
      id: 'theory-macos-11-plik-teczka-drzewo',
      category: 'Podstawy systemu macOS',
      title: 'Kartka papieru, niebieska teczka i komoda z szufladami – cała tajemnica drzewa katalogów',
      metaphor: 'Pojedyncza kartka z tekstem lub zdjęciem (plik) włożona do tekturowej teczki (folderu), która leży w szufladzie komody (drzewie katalogów)',
      story:
        'Nasz czarny kotek Maks uwielbia wskakiwać do pustych pudełek, więc wyjaśni Ci to najlepiej na świecie. W komputerze istnieją tylko dwa podstawowe przedmioty: PLIKI oraz TECZKI (nazywane też folderami albo katalogami). Plik to konkretna rzecz z treścią: jedna kartka z umową, jedno zdjęcie z wakacji, jedna piosenka. Sam plik nie ma w środku żadnych przegródek – można go tylko przeczytać, obejrzeć albo wysłać. Z kolei teczka (niebieska ikonka w Finderze) sama w sobie nie ma żadnej treści do czytania – jest jak tekturowe pudełko albo segregator, do którego wkłada się pliki, żeby nie leżały luzem na blacie. Co najciekawsze, do dużej teczki „Dom” możesz włożyć mniejszą teczkę „Rachunki”, a do niej jeszcze mniejszą teczkę „Prąd 2026”. Taki układ teczek schowanych jedna w drugiej informatycy nazwali dumnie „drzewem katalogów” – bo z jednego głównego pnia (dysku Macintosh HD) wyrastają gałęzie (Biurko, Dokumenty, Pobrane), a z nich mniejsze gałązki (Twoje własne teczki).',
      realExplanation:
        'Plik (ang. file) to pojedynczy dokument, obraz lub program zapisany na dysku. Folder (teczka / katalog) to pojemnik grupujący pliki oraz podfoldery. Pełny adres pokazujący, w której teczce leży plik (np. Macintosh HD ▸ Użytkownicy ▸ malgorzata ▸ Dokumenty ▸ Rachunki), nazywamy ścieżką. W Finderze możesz włączyć „Pasek ścieżki” na dole okna oraz „Widok kolumn” (⌘3), który pokazuje całe drzewo katalogów od lewej do prawej.',
      oneLiner:
        'Plik to pojedyncza kartka z treścią, teczka (folder) to pudełko na kartki, a drzewo katalogów to układ pudełek w szafie.',
      commonMyth:
        'Wiele osób boi się, że zmiana nazwy teczki skasuje pliki w środku. A tymczasem to tylko zmiana napisu na pudełku – wszystkie kartki wewnątrz zostają nietknięte.',
      illustrationId: 'file-folder-tree',
    },
    steps: [
      {
        instruction:
          'Otwórz okno Findera i przełącz układ na „Widok kolumn” (trzecia ikonka z pionowymi kolumnami na górnym pasku okna lub skrót ⌘3).',
        hint: 'Widok kolumn pokazuje po lewej szufladę główną, w środkowej kolumnie teczki, a po prawej pliki w środku.',
        hint2: 'Kliknij podświetlony przycisk widoku kolumn na górnym pasku okna Findera.',
        verify: { type: 'simulatorAction', action: 'macos-11-step-1' },
        simulatorScene: 'macos-11-step-1',
      },
      {
        instruction:
          'Kliknij teczkę „Dokumenty” w pierwszej kolumnie, a następnie teczkę „Rachunki” w drugiej kolumnie, aby zobaczyć, jak gałąź prowadzi do pliku.',
        hint: 'Każde kliknięcie teczki otwiera jej zawartość w kolejnej kolumnie po prawej stronie.',
        hint2: 'Kliknij podświetloną teczkę w środkowej kolumnie okna Findera.',
        verify: { type: 'simulatorAction', action: 'macos-11-step-2' },
        simulatorScene: 'macos-11-step-2',
      },
      {
        instruction:
          'Spójrz na sam dół okna Findera na „Pasek ścieżki” (Macintosh HD ▸ Użytkownicy ▸ malgorzata ▸ Dokumenty ▸ Rachunki) i kliknij go, aby potwierdzić, że widzisz całą drogę do pliku.',
        hint: 'Jeśli na prawdziwym Macu nie widzisz tego paska na dole, włączysz go w górnym menu: Widok → Pokaż pasek ścieżki.',
        hint2: 'Kliknij podświetlony pasek ścieżki na samym dole okna Findera.',
        verify: { type: 'simulatorAction', action: 'macos-11-step-3' },
        simulatorScene: 'macos-11-step-3',
      },
    ],
  },
  {
    id: 'macos-12-rozszerzenia-plikow',
    track: 'macos',
    level: 1,
    title: 'Końcówki nazw plików (.pdf, .docx, .jpg, .zip) – dlaczego nie w każdym pliku da się pisać',
    realLifeHook:
      'Gdy otwierasz otrzymany dokument PDF i dziwisz się, dlaczego nie można w nim dopisać zdania klawiaturą, albo dostajesz spakowaną paczkę .zip.',
    estimatedMinutes: 4,
    prerequisites: ['macos-11-plik-teczka-drzewo'],
    reward: 'Odznaka Znawczyni Formatów',
    synonyms: [
      'co to jest pdf',
      'co to jest zip',
      'co to jest docx',
      'co to jest jpg',
      'jak rozpakowac zip',
      'dlaczego nie moge pisac w pdf',
      'rozszerzenie pliku',
      'format pliku',
      'jaki to rodzaj pliku',
      'spakowany plik',
    ],
    theory: {
      id: 'theory-macos-12-rozszerzenia-plikow',
      category: 'Pliki i foldery',
      title: 'Etykiety na słoikach w spiżarni: po czym poznać zeszyt do pisania, fotografię i zapiętą walizkę',
      metaphor: 'Kropka i trzy litery na końcu nazwy pliku działają jak plakietka mówiąca Macowi, jakim narzędziem otworzyć dany przedmiot',
      story:
        'Zauważyłaś, że niemal każdy plik ma na końcu nazwy kropkę i trzy albo cztery tajemnicze literki? Nasz czarny kotek Maks zagląda do spiżarni i tłumaczy cztery najważniejsze z nich. Pierwsza to „.docx” (lub „.pages”) – to otwarty zeszyt w linię: kiedy go otworzysz, możesz w nim swobodnie dopisywać i kasować słowa. Druga to „.pdf” – to kartka zalaminowana w sztywną folię: wygląda jak wydruk na papierze, na każdym komputerze ma identyczny układ i nikt przypadkiem nie przestawi w niej przecinka (dlatego w takim kształcie przysyłają umowy i faktury!). Trzecia to „.jpg” oraz „.png” – to wywołane zdjęcia i obrazki. A czwarta to „.zip” – czyli walizka zapięta na zamek błyskawiczny, do której ktoś spakował dziesięć zdjęć naraz, żeby łatwiej przeszły mailem. Na Macu rozpakowanie takiej walizki „.zip” jest bajecznie wygodne: klikasz ją dwa razy, a obok niej od razu wyskakuje gotowa, rozpakowana niebieska teczka!',
      realExplanation:
        'Rozszerzenie pliku (litery po ostatniej kropce w nazwie) określa format danych: .pdf to dokument do odczytu i druku (otwierany w Podglądzie), .docx/.pages to edytowalny dokument tekstowy, .jpg/.png/.heic to fotografie, a .zip to archiwum skompresowane (dwukrotne kliknięcie pliku .zip w Finderze automatycznie wypakowuje z niego zwykłą teczkę z plikami). Szczegółowy rodzaj i rozmiar każdego pliku sprawdzisz skrótem ⌘I (Plik → Informacje).',
      oneLiner:
        '.docx to zeszyt do pisania, .pdf to zalaminowany wydruk, .jpg to zdjęcie, a .zip to walizka rozpakowywana dwuklikiem.',
      commonMyth:
        'Wiele osób szuka w internecie płatnych programów do rozpakowywania plików .zip. A tymczasem Mac ma narzędzie rozpakowujące wbudowane fabrycznie – działa po zwykłym podwójnym kliknięciu.',
      illustrationId: 'file-extensions-jars',
    },
    steps: [
      {
        instruction:
          'W oknie Findera spójrz na spakowaną paczkę „Zdjecia-z-urodzin.zip” i kliknij ją dwukrotnie, aby Mac automatycznie wyjął z niej zwykłą niebieską teczkę.',
        hint: 'Plik z końcówką .zip przypomina kartkę z zamkiem błyskawicznym.',
        hint2: 'Kliknij podświetlony plik „Zdjecia-z-urodzin.zip” w oknie Findera.',
        verify: { type: 'simulatorAction', action: 'macos-12-step-1' },
        simulatorScene: 'macos-12-step-1',
      },
      {
        instruction:
          'Otwórz wypakowaną niebieską teczkę „Zdjecia-z-urodzin”, w której czekają gotowe zdjęcia .jpg oraz dokument .pdf.',
        hint: 'Po rozpakowaniu pliku .zip tuż obok pojawia się normalna niebieska teczka o tej samej nazwie.',
        hint2: 'Kliknij podświetloną niebieską teczkę „Zdjecia-z-urodzin”.',
        verify: { type: 'simulatorAction', action: 'macos-12-step-2' },
        simulatorScene: 'macos-12-step-2',
      },
      {
        instruction:
          'Wyświetl kartę „Informacje” o pliku (skrót ⌘I lub Plik → Informacje), aby zobaczyć dokładny rodzaj dokumentu, jego rozmiar i datę utworzenia.',
        hint: 'Skrót ⌘I otwiera wąskie okienko z pełną metryczką wybranego pliku.',
        hint2: 'Kliknij podświetlony przycisk „Pokaż Informacje (⌘I)”.',
        verify: { type: 'simulatorAction', action: 'macos-12-step-3' },
        simulatorScene: 'macos-12-step-3',
      },
    ],
  },
  {
    id: 'macos-13-gdzie-jestem-okna-widoki',
    track: 'macos',
    level: 1,
    title: 'Cztery widoki Findera i sortowanie po dacie – jak zawsze mieć dzisiejszy plik na samej górze',
    realLifeHook:
      'Gdy w teczce Pobrane masz sto plików wymieszanych w losowej kolejności i nie wiesz, który z nich pobrałaś przed chwilą.',
    estimatedMinutes: 4,
    prerequisites: ['macos-02-gdzie-zniknal-plik'],
    reward: 'Odznaka Mistrzyni Widoków',
    synonyms: [
      'jak posortowac pliki po dacie',
      'najnowszy plik na gorze',
      'zmienil mi sie wyglad folderu',
      'wielkie ikony w finderze',
      'widok listy',
      'sortowanie w pobranych',
      'gdzie jest plik z dzisiaj',
      'widok ikon lista kolumny',
      'jak ulozyc pliki',
      'porzadek w pobranych',
    ],
    theory: {
      id: 'theory-macos-13-gdzie-jestem-okna-widoki',
      category: 'Pliki i foldery',
      title: 'Cztery pary okularów do tej samej szuflady i magiczny nagłówek „Data modyfikacji”',
      metaphor: 'Ta sama zawartość szuflady oglądana jako rozłożone pocztówki (Ikony) albo jako uporządkowany spis w zeszycie (Lista)',
      story:
        'Czasem otwierasz teczkę w Finderze i masz wrażenie, że ktoś w nocy poprzestawiał Ci meble: wczoraj pliki były ułożone w równą listę z datami, a dziś widzisz ogromne kafelki na pół ekranu. Nasz czarny kotek Maks mruczy uspokajająco: żaden plik nie zginął, po prostu przełączył się przycisk widoku na górnym pasku okna! Finder ma cztery sposoby pokazywania tej samej szuflady: Ikony (świetne do przeglądania zdjęć), Lista (najlepsza na co dzień, bo obok nazwy pokazuje datę i rozmiar), Kolumny (pokazujące drzewo katalogów) oraz Galeria. A kiedy włączysz widok Listy i klikniesz napis „Data modyfikacji” na szarym pasku nad plikami, wydarzy się cud: wszystkie dokumenty ustawią się grzecznie według zegarka, a plik pobrany przed minutą stanie na pierwszym miejscu u samej góry!',
      realExplanation:
        'Na górnym pasku narzędzi każdego okna Findera znajdują się cztery przyciski widoku (skróty ⌘1 – Ikony, ⌘2 – Lista, ⌘3 – Kolumny, ⌘4 – Galeria). W widoku Listy (⌘2) kliknięcie nagłówka kolumny „Data modyfikacji” lub „Data dołączenia” sortuje pliki od najnowszych do najstarszych.',
      oneLiner:
        'Włącz w Finderze widok Listy (⌘2) i kliknij nagłówek „Data modyfikacji”, aby dzisiejsze pliki były zawsze na górze.',
      commonMyth:
        'Wiele osób myśli, że pliki w komputerze muszą leżeć wyłącznie alfabetycznie od A do Z. A tymczasem sortowanie po dacie jest o wiele wygodniejsze przy szukaniu świeżo pobranych dokumentów.',
      illustrationId: 'finder-four-views',
    },
    steps: [
      {
        instruction:
          'W oknie Findera kliknij przycisk „Widok listy” (cztery poziome kreski na górnym pasku narzędzi lub skrót ⌘2).',
        hint: 'Widok listy zamienia duże obrazki w czytelną tabelę z kolumnami.',
        hint2: 'Kliknij podświetloną ikonę czterech poziomych kresek na pasku narzędzi Findera.',
        verify: { type: 'simulatorAction', action: 'macos-13-step-1' },
        simulatorScene: 'macos-13-step-1',
      },
      {
        instruction:
          'Kliknij nagłówek kolumny „Data modyfikacji” nad listą plików, aby ułożyć dokumenty od najnowszego z dzisiaj.',
        hint: 'Nagłówek „Data modyfikacji” znajduje się w szarym pasku bezpośrednio nad pierwszym plikiem.',
        hint2: 'Kliknij podświetlony nagłówek „Data modyfikacji” w tabeli Findera.',
        verify: { type: 'simulatorAction', action: 'macos-13-step-2' },
        simulatorScene: 'macos-13-step-2',
      },
      {
        instruction:
          'Kliknij świeżo znaleziony plik z napisem „Dzisiaj, 12:30”, który wskoczył na samą górę listy.',
        hint: 'Dzięki sortowaniu po dacie najnowszy dokument masz zawsze na pierwszym miejscu.',
        hint2: 'Kliknij podświetlony pierwszy wiersz na górze listy plików.',
        verify: { type: 'simulatorAction', action: 'macos-13-step-3' },
        simulatorScene: 'macos-13-step-3',
      },
    ],
  },
  {
    id: 'macos-14-gladzik-gesty-prawy-klik',
    track: 'macos',
    level: 1,
    title: 'Tajemnice gładzika (Trackpada) – jak kliknąć „prawym przyciskiem”, gdy nie ma przycisków',
    realLifeHook:
      'Gdy instrukcja prosi o kliknięcie prawym przyciskiem myszy, a Ty masz przed sobą tylko gładką szklaną płytkę pod klawiaturą MacBooka.',
    estimatedMinutes: 4,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Wirtuozki Gładzika',
    synonyms: [
      'prawy przycisk myszy na macu',
      'jak kliknac prawym na macbooku',
      'gladzik',
      'trackpad',
      'przewijanie dwoma palcami',
      'menu kontekstowe',
      'klikniecie dwoma palcami',
      'jak powiększyc palcami',
      'myszka na macbooku',
      'gesty na macu',
    ],
    theory: {
      id: 'theory-macos-14-gladzik-gesty-prawy-klik',
      category: 'Podstawy systemu macOS',
      title: 'Jeden palec wskazuje, dwa palce otwierają podręczne menu pomocnicze',
      metaphor: 'Szklana płytka gładzika rozpoznaje, czy dotykasz jej jedną łapką, czy dwiema naraz',
      story:
        'Kiedy pierwszy raz siadasz przed MacBookiem bez zewnętrznej myszki, możesz poczuć lekką konsternację: pod klawiaturą leży gładka, szklana płytka (Gładzik, czyli Trackpad), na której nie widać ani lewego, ani prawego przycisku! Nasz czarny kotek Maks pokazuje na niej swoją ulubioną sztuczkę: gładzik MacBooka wyczuwa liczbę palców, którymi go dotykasz. Kiedy stukniesz lub naciśniesz płytkę JEDNYM palcem – to zwykłe lewe kliknięcie. Kiedy jednak położysz obok siebie DWA palce (wskazujący i środkowy) i stukniesz nimi jednocześnie – Mac rozumie to dokładnie jako „prawy przycisk myszy” i natychmiast rozwija podręczne menu z opcjami (takimi jak Zmień nazwę, Skopiuj, Nowy folder czy Przenieś do Kosza)! A gdy przesuwasz dwa palce lekko w górę i w dół, przewijasz stronę internetową tak płynnie, jakbyś przesuwała kartkę papieru po stole.',
      realExplanation:
        'Na gładziku MacBooka tzw. kliknięcie pomocnicze (odpowiednik prawego przycisku myszy) wykonuje się przez naciśnięcie lub stuknięcie płytki dwoma palcami jednocześnie (alternatywnie: kliknięcie jednym palcem z przytrzymanym klawiszem Control na klawiaturze). Przesuwanie dwoma palcami góra/dół przewija zawartość okna, a zsunięcie lub rozsunięcie dwóch palców działa jak lupa powiększająca.',
      oneLiner:
        'Jeden palec na gładziku to zwykły klik, a stuknięcie dwoma palcami naraz to „prawy przycisk myszy”.',
      commonMyth:
        'Wiele osób szuka prawego dolnego rogu gładzika, próbując trafić w niewidzialny przycisk. A tymczasem stuknięcie dwoma palcami działa wygodnie w dowolnym miejscu na środku płytki.',
      illustrationId: 'trackpad-two-fingers',
    },
    steps: [
      {
        instruction:
          'Otwórz Ustawienia systemowe (lub Preferencje systemowe) i wybierz sekcję „Gładzik” na dole listy.',
        hint: 'Ikona Gładzika przedstawia prostokątną płytkę dotykową.',
        hint2: 'Kliknij podświetloną pozycję „Gładzik” w oknie ustawień.',
        verify: { type: 'simulatorAction', action: 'macos-14-step-1' },
        simulatorScene: 'macos-14-step-1',
      },
      {
        instruction:
          'Upewnij się, że opcja „Kliknięcie pomocnicze (Kliknięcie dwoma palcami)” oraz „Dotknij, aby kliknąć” są włączone.',
        hint: 'Dzięki opcji „Dotknij, aby kliknąć” nie musisz mocno wciskać płytki – możesz jej lekko dotknąć opuszkiem palca.',
        hint2: 'Kliknij podświetlony przełącznik „Kliknięcie dwoma palcami”.',
        verify: { type: 'simulatorAction', action: 'macos-14-step-2' },
        simulatorScene: 'macos-14-step-2',
      },
      {
        instruction:
          'Przetestuj kliknięcie dwoma palcami na ikonie teczki, aby rozwinęło się menu pomocnicze z opcją „Zmień nazwę…”.',
        hint: 'Dotknij gładzika dwoma złączonymi palcami (wskazującym i środkowym) jednocześnie.',
        hint2: 'Kliknij podświetlone pole testu dwupalcowego kliknięcia.',
        verify: { type: 'simulatorAction', action: 'macos-14-step-3' },
        simulatorScene: 'macos-14-step-3',
      },
    ],
  },
  {
    id: 'macos-15-instalacja-dmg-i-appstore',
    track: 'macos',
    level: 2,
    title: 'Pudełko .dmg i biała ikonka dysku na Biurku – jak instalować programy i sprzątać po instalacji',
    realLifeHook:
      'Gdy po zainstalowaniu programu na Biurku wciąż wisi tajemnicza biała ikonka dysku i boisz się ją usunąć, żeby nie skasować programu.',
    estimatedMinutes: 4,
    prerequisites: ['macos-11-plik-teczka-drzewo'],
    reward: 'Odznaka Bezpiecznych Instalacji',
    synonyms: [
      'co to jest plik dmg',
      'biala ikonka dysku na pulpicie',
      'jak zainstalowac program na macu',
      'jak usunac dmg',
      'wysun dysk',
      'przeciagnij do aplikacji',
      'app store na macu',
      'instalator na macu',
      'wirtualny dysk na biurku',
      'czy moge usunac plik dmg',
    ],
    theory: {
      id: 'theory-macos-15-instalacja-dmg-i-appstore',
      category: 'Podstawy systemu macOS',
      title: 'Kartonowe pudełko od kuriera: wyjmij fotel do mieszkania, a pusty karton wystaw za drzwi',
      metaphor: 'Plik .dmg to tylko opakowanie transportowe – po przeciągnięciu programu do szafy „Aplikacje” opakowanie można bezpiecznie wysunąć',
      story:
        'Na komputerach z Windowsem instalacja programu przypomina ankietę urzędową: trzeba dziesięć razy klikać „Dalej, Dalej, Zgadzam się, Zakończ”. Na Macu wymyślono to zupełnie inaczej i przez to wiele osób zostaje z „pudłami” na środku pokoju! Kiedy pobierasz program z internetu jako plik „.dmg” i klikasz go dwa razy, na Biurku pojawia się biała skrzyneczka przypominająca dysk, a na ekranie otwiera się małe okienko z dwiema ikonami: ikoną nowego programu oraz teczką „Aplikacje” (Applications). Nasz czarny kotek Maks tłumaczy: ta biała skrzyneczka to tylko kartonowe pudełko kurierskie! Żeby zainstalować program na stałe, chwytasz go myszką i przeciągasz do teczki „Aplikacje” (czyli wstawiasz nowy mebel do swojego mieszkania). Kiedy już tam stoi, puste pudełko kurierskie na Biurku nie jest Ci do niczego potrzebne – klikasz obok niego małą strzałkę „Wysuń” (⏏), a sam plik .dmg z Pobranych możesz spokojnie wyrzucić do Kosza.',
      realExplanation:
        'Plik .dmg (Disk Image) to wirtualny obraz dysku służący do dostarczania programów na macOS. Po otwarciu pliku .dmg przeciągasz ikonę aplikacji do skrótu „Applications / Aplikacje”. Od tej chwili program jest zainstalowany w systemowej teczce Aplikacje, a wirtualny dysk możesz odłączyć przyciskiem „Wysuń” (⏏) w pasku bocznym Findera.',
      oneLiner:
        'Przeciągnij program z okna .dmg do teczki Aplikacje, a potem wysuń białą ikonkę dysku (⏏).',
      commonMyth:
        'Wiele osób uruchamia program codziennie prosto z otwartego pudełka .dmg na Biurku. A tymczasem po przeciągnięciu do Aplikacji pudełko .dmg należy wysunąć i skasować.',
      illustrationId: 'dmg-box-unpack',
    },
    steps: [
      {
        instruction:
          'W otwartym okienku instalatora .dmg przeciągnij (lub kliknij) ikonę programu do teczki „Aplikacje”, aby wstawić go na stałe do swojego Maca.',
        hint: 'Strzałka między ikoną programu a teczką Aplikacje podpowiada kierunek przeciągnięcia.',
        hint2: 'Kliknij podświetlone połączenie prowadzące do teczki „Aplikacje”.',
        verify: { type: 'simulatorAction', action: 'macos-15-step-1' },
        simulatorScene: 'macos-15-step-1',
      },
      {
        instruction:
          'Sprawdź w teczce „Aplikacje” w Finderze, że nowy program już tam bezpiecznie stoi.',
        hint: 'Wszystkie zainstalowane na stałe programy mieszkają w teczce „Aplikacje”.',
        hint2: 'Kliknij podświetloną pozycję „Aplikacje” na lewym pasku Findera.',
        verify: { type: 'simulatorAction', action: 'macos-15-step-2' },
        simulatorScene: 'macos-15-step-2',
      },
      {
        instruction:
          'Kliknij mały znaczek wysuwania „⏏” obok wirtualnego dysku Instalatora na pasku bocznym Findera, aby posprzątać puste opakowanie z Biurka.',
        hint: 'Znaczek ⏏ (trójkącik z kreską pod spodem) odłącza wirtualne pudełko instalacyjne.',
        hint2: 'Kliknij podświetlony przycisk „Wysuń ⏏” na pasku bocznym Findera.',
        verify: { type: 'simulatorAction', action: 'macos-15-step-3' },
        simulatorScene: 'macos-15-step-3',
      },
    ],
  },
  {
    id: 'macos-16-pendrive-dysk-wysuwanie',
    track: 'macos',
    level: 2,
    title: 'Pendrive i dysk zewnętrzny – gdzie go znaleźć po podłączeniu i jak bezpiecznie wyjąć',
    realLifeHook:
      'Gdy wkładasz pendrive’a ze zdjęciami i nic nie wyskakuje na ekranie, a po jego wyjęciu Mac wyświetla groźne ostrzeżenie o nieprawidłowym odłączeniu dysku.',
    estimatedMinutes: 4,
    prerequisites: ['macos-11-plik-teczka-drzewo'],
    reward: 'Odznaka Opiekunki Nośników',
    synonyms: [
      'pendrive na macu',
      'gdzie jest pendrive',
      'dysk zewnetrzny nie widac',
      'nieprawidlowe odlaczenie dysku',
      'jak bezpiecznie wyjac pendrive',
      'wysun pendrive',
      'jak zgrac zdjecia na pendrive',
      'pamiec usb na macbooku',
      'karta pamieci',
      'sekcja miejsca w finderze',
    ],
    theory: {
      id: 'theory-macos-16-pendrive-dysk-wysuwanie',
      category: 'Pliki i foldery',
      title: 'Uprzejme pożegnanie gościa z walizką – dlaczego przed wyjęciem pendrive’a klikamy strzałkę ⏏',
      metaphor: 'Pozwól gościowi dopiąć zamek walizki (przycisk Wysuń ⏏), zanim zamkniesz za nim drzwi',
      story:
        'Kiedy podłączasz pendrive’a albo zewnętrzny dysk ze zdjęciami do MacBooka, komputer nie otwiera hałaśliwego okienka na cały ekran – zamiast tego po cichu stawia nową ikonkę na Biurku oraz dopisuje nazwę Twojego pendrive’a na lewym pasku bocznym Findera w sekcji „Miejsca” (na samym dole listy). Możesz tam wchodzić, oglądać zdjęcia i przeciągać na niego swoje dokumenty dokładnie tak jak do zwykłej teczki. Jest tylko jeden ważny zwyczaj, którego nasz czarny kotek Maks pilnuje jak oka w głowie: nigdy nie wyrywamy pendrive’a z gniazdka znienacka! Dlaczego? Bo Mac często jeszcze przez kilka sekund w tle dopisuje ostatnie fragmenty pliku. Kiedy klikniesz małą strzałkę „Wysuń” (⏏) obok nazwy pendrive’a w Finderze, Mac dokończy zapisywanie, zamknie walizkę na klucz i zgasi ikonkę. Dopiero wtedy wyjmujesz pendrive’a z gniazda – bez żadnych czerwonych ostrzeżeń i bez ryzyka uszkodzenia zdjęć!',
      realExplanation:
        'Podłączone pamięci USB (pendrive’y), karty SD oraz dyski zewnętrzne pojawiają się w lewym pasku bocznym okna Findera w sekcji „Miejsca” (Locations) oraz na Biurku. Przed fizycznym odłączeniem przewodu USB zawsze kliknij ikonę wysuwania (⏏) obok nazwy nośnika w Finderze i zaczekaj sekundę, aż zniknie z listy.',
      oneLiner:
        'Pendrive’a znajdziesz na lewym pasku Findera w sekcji „Miejsca”, a przed wyjęciem zawsze kliknij przy nim znaczek ⏏.',
      commonMyth:
        'Wiele osób myśli, że ostrzeżenie „Nieprawidłowe odłączenie dysku” to tylko formalność. A tymczasem wyjęcie pendrive’a w trakcie zapisu może uszkodzić przesyłane zdjęcie lub dokument.',
      illustrationId: 'usb-drive-eject',
    },
    steps: [
      {
        instruction:
          'W oknie Findera spójrz na lewy pasek boczny na sekcję „Miejsca” i kliknij podłączony nośnik „PENDRIVE-ZDJECIA”.',
        hint: 'Zewnętrzne pamięci USB pojawiają się na dole lewego paska bocznego Findera.',
        hint2: 'Kliknij podświetloną pozycję „PENDRIVE-ZDJECIA” w pasku bocznym Findera.',
        verify: { type: 'simulatorAction', action: 'macos-16-step-1' },
        simulatorScene: 'macos-16-step-1',
      },
      {
        instruction:
          'Skopiuj dokument lub zdjęcie na pendrive’a, klikając przycisk przeniesienia pliku do otwartego okna nośnika.',
        hint: 'Kiedy przeciągasz plik z Maca na pendrive’a, na Macu zostaje oryginał, a na pendrive’a trafia jego druga kopia.',
        hint2: 'Kliknij podświetlony plik, aby skopiować go na pendrive’a.',
        verify: { type: 'simulatorAction', action: 'macos-16-step-2' },
        simulatorScene: 'macos-16-step-2',
      },
      {
        instruction:
          'Zanim wyjmiesz pendrive’a z gniazdka, kliknij symbol „Wysuń ⏏” tuż obok jego nazwy na pasku bocznym Findera.',
        hint: 'Po kliknięciu ⏏ nazwa pendrive’a zniknie z listy – to znak, że można go bezpiecznie wyjąć z portu USB.',
        hint2: 'Kliknij podświetloną strzałkę „Wysuń ⏏” obok nazwy pendrive’a.',
        verify: { type: 'simulatorAction', action: 'macos-16-step-3' },
        simulatorScene: 'macos-16-step-3',
      },
    ],
  },
  {
    id: 'macos-17-brak-miejsca-na-dysku',
    track: 'macos',
    level: 2,
    title: 'Prawie pełny dysk – jak sprawdzić, co zajmuje miejsce na MacBooku i bezpiecznie zrobić porządki',
    realLifeHook:
      'Gdy Mac wyświetla komunikat „Dysk startowy jest prawie pełny”, a Ty nie wiesz, co zajmuje tyle miejsca i co wolno usunąć bez uszkodzenia systemu.',
    estimatedMinutes: 5,
    prerequisites: ['macos-10-kosz', 'macos-13-gdzie-jestem-okna-widoki'],
    reward: 'Odznaka Mistrzyni Przestrzeni',
    synonyms: [
      'brak miejsca na dysku',
      'dysk startowy jest prawie pelny',
      'jak zwolnic miejsce na macu',
      'co zajmuje tyle miejsca',
      'czyszczenie dysku maca',
      'malo pamieci na macbooku',
      'gdzie sprawdzic ile mam wolnego miejsca',
      'porzadki na dysku',
      'duze pliki w pobranych',
      'pamiec masowa',
    ],
    theory: {
      id: 'theory-macos-17-brak-miejsca-na-dysku',
      category: 'Ustawienia i porządki',
      title: 'Rentgen domowej szafy: kolorowy pasek, który od razu pokazuje, gdzie leżą najcięższe walizki',
      metaphor: 'Zamiast zgadywać po omacku, włączasz podświetlany spis pokazujący dokładnie, ile półek zajmują zdjęcia, programy i stare przesyłki w Pobranych',
      story:
        'Samotne pisma w Wordzie czy rachunki PDF są lekkie jak piórko – można ich mieć dziesięć tysięcy i nadal nie zapełnią nawet ułamka dysku. Skąd więc bierze się komunikat o pełnym dysku? Nasz czarny kotek Maks zagląda z latarką w trzy miejsca, w których najczęściej gromadzą się „ciężkie walizki”: po pierwsze – teczka „Pobrane”, gdzie od lat leżą zapomniane instalatory programów i duże filmy z załączników; po drugie – nieopróżniony od miesięcy „Kosz” (pamiętasz, że dopóki go nie opróżnisz, pliki nadal zajmują miejsce w szafie!); po trzecie – długie nagrania wideo. Mac ma wbudowany genialny „rentgen” pamięci (w Ustawieniach systemowych → Ogólne → Miejsce lub w menu  → Ten Mac → Pamięć masowa), który rysuje kolorowy pasek i jednym kliknięciem pokazuje największe zapomniane pliki gotowe do bezpiecznego posprzątania.',
      realExplanation:
        'W macOS Ventura i nowszych stan dysku sprawdzisz w Ustawieniach systemowych → Ogólne → Miejsce (w starszych wersjach: menu  → Ten Mac → zakładka Pamięć masowa). System dzieli zajęte miejsce na czytelne kategorie (Aplikacje, Dokumenty, Zdjęcia, Kosz) i pozwala jednym kliknięciem przejrzeć największe pliki w teczce Pobrane oraz opróżnić Kosz.',
      oneLiner:
        'Zajrzyj do Ustawienia → Ogólne → Miejsce (lub  → Ten Mac → Pamięć masowa), aby zobaczyć, co zajmuje dysk.',
      commonMyth:
        'Wiele osób kupuje podejrzane programy „Mac Cleaner” z reklam w internecie. A tymczasem fabryczne narzędzie „Miejsce” w macOS jest w 100% darmowe, bezpieczne i o wiele skuteczniejsze.',
      illustrationId: 'storage-xray-bar',
    },
    steps: [
      {
        instruction:
          'Otwórz Ustawienia systemowe → „Ogólne” → „Miejsce” (na starszym Macu: menu  → „Ten Mac” → zakładka „Pamięć masowa”).',
        hint: 'Zobaczysz tam kolorowy pasek pokazujący, ile gigabajtów (GB) masz jeszcze wolnych.',
        hint2: 'Kliknij podświetloną sekcję „Miejsce (Pamięć masowa)” w oknie ustawień.',
        verify: { type: 'simulatorAction', action: 'macos-17-step-1' },
        simulatorScene: 'macos-17-step-1',
        variants: [
          {
            osRange: '<13',
            instruction:
              'Kliknij menu  → „Ten Mac” i przejdź do zakładki „Pamięć masowa”, aby zobaczyć kolorowy wykres zajętości dysku.',
            simulatorScene: 'macos-17-step-1-classic',
          },
        ],
      },
      {
        instruction:
          'Kliknij kategorię „Pobrane / Dokumenty” pod wykresem dysku, aby wyświetlić listę największych, niepotrzebnych już plików instalacyjnych.',
        hint: 'Najwięcej miejsca zwalnia usunięcie starych plików .dmg i dawno obejrzanych filmów wideo.',
        hint2: 'Kliknij podświetloną pozycję „Przejrzyj duże pliki w Pobranych”.',
        verify: { type: 'simulatorAction', action: 'macos-17-step-2' },
        simulatorScene: 'macos-17-step-2',
      },
      {
        instruction:
          'Usuń zbędny stary instalator (1,8 GB), aby odzyskać wolną przestrzeń na dysku bez dotykania swoich prywatnych dokumentów.',
        hint: 'Zawsze możesz bezpiecznie kasować stare pliki instalacyjne .dmg z teczki Pobrane.',
        hint2: 'Kliknij podświetlony przycisk „Usuń stary instalator (1,8 GB)”.',
        verify: { type: 'simulatorAction', action: 'macos-17-step-3' },
        simulatorScene: 'macos-17-step-3',
      },
    ],
  },
  {
    id: 'macos-18-zawieszony-program-wymus-koniec',
    track: 'macos',
    level: 2,
    title: 'Kręcące się kolorowe kółeczko – co zrobić, gdy jeden program się zawiesi (Wymuś koniec)',
    realLifeHook:
      'Gdy kursor zamienia się w kręcącą się tęczową piłeczkę, program nie reaguje na kliknięcia, a Ty boisz się wyłączyć cały komputer z prądu.',
    estimatedMinutes: 3,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Zimnej Krwi',
    synonyms: [
      'zaciety program',
      'zawiesil sie mac',
      'krecace sie kolorowe koleczko',
      'teczowa pileczka',
      'program nie odpowiada',
      'wymus koniec',
      'jak wylaczyc zawieszony program',
      'nie moge zamknac programu',
      'zacial sie word',
      'zacialo sie safari',
    ],
    theory: {
      id: 'theory-macos-18-zawieszony-program-wymus-koniec',
      category: 'Rozwiązywanie problemów',
      title: 'Dlaczego nie trzeba wyłączać korków w całym mieszkaniu, gdy w kuchni zaciął się jeden toster',
      metaphor: 'Okienko „Wymuś koniec” pozwala grzecznie wyprowadzić za drzwi tylko jeden zamyślony program, podczas gdy reszta Maca działa bez przerwy',
      story:
        'Czasem zdarza się, że któryś program dostaje czkawki – kursor myszy zamienia się nad nim w kręcący się kolorowy wiatraczek (nazywany pieszczotliwie tęczową piłeczką plażową) i żaden przycisk w tym oknie nie chce działać. Najgorsze, co można wtedy zrobić, to trzymać przycisk zasilania i gasić cały komputer na siłę! Nasz czarny kotek Maks pokazuje znacznie mądrzejsze wyjście: w systemie macOS każdy program żyje w swoim osobnym pokoju. Jeśli jeden program się zaciął, wszystkie pozostałe (oraz sam system) są w pełni zdrowe! Klikasz po prostu nadgryzione jabłuszko  w lewym górnym rogu ekranu i wybierasz „Wymuś koniec…” (albo wciskasz skrót ⌥⌘Esc). Otworzy się małe, niezawodne okienko ratunkowe: zaznaczasz na liście ten jeden program, obok którego widnieje napis „(nie odpowiada)”, klikasz „Wymuś koniec” i po sekundzie zacięty program znika, a Ty spokojnie pracujesz dalej.',
      realExplanation:
        'Gdy pojedyncza aplikacja na Macu przestaje reagować (widoczna jest kręcąca się kolorowa ikona kursora), otwórz menu  w lewym górnym rogu ekranu i wybierz „Wymuś koniec…” (skrót klawiszowy: Option + Command + Esc). Na liście wskaż zawieszony program i kliknij „Wymuś koniec” – zamknie to wyłącznie tę jedną aplikację bez konieczności restartowania całego MacBooka.',
      oneLiner:
        'Gdy program się zawiesi, kliknij  → „Wymuś koniec…” (⌥⌘Esc) i zamknij tylko ten jeden program.',
      commonMyth:
        'Wiele osób przy zaciętym programie wyłącza MacBooka długim przytrzymaniem przycisku zasilania. A tymczasem takie twarde wyłączenie jest potrzebne niezwykle rzadko – w 99% sytuacji pomaga „Wymuś koniec”.',
      illustrationId: 'force-quit-rescue',
    },
    steps: [
      {
        instruction:
          'Kliknij ikonę jabłuszka  w lewym górnym rogu ekranu i wybierz z menu ratunkową opcję „Wymuś koniec…” (skrót ⌥⌘Esc).',
        hint: 'Menu  działa nawet wtedy, gdy bieżący program się zaciął.',
        hint2: 'Kliknij podświetloną pozycję „Wymuś koniec…” w menu Apple .',
        verify: { type: 'simulatorAction', action: 'macos-18-step-1' },
        simulatorScene: 'macos-18-step-1',
      },
      {
        instruction:
          'W oknie „Wymuś koniec aplikacji” kliknij program oznaczony czerwonym dopiskiem „(nie odpowiada)”.',
        hint: 'Mac sam podpowiada, który program się zawiesił, dopisując przy nim „(nie odpowiada)”.',
        hint2: 'Kliknij podświetlony wiersz zawieszonego programu na liście.',
        verify: { type: 'simulatorAction', action: 'macos-18-step-2' },
        simulatorScene: 'macos-18-step-2',
      },
      {
        instruction:
          'Kliknij niebieski przycisk „Wymuś koniec” w prawym dolnym rogu okienka, aby bezpiecznie zamknąć zawieszony program.',
        hint: 'Pozostałe otwarte programy i dokumenty na Twoim Macu pozostaną całkowicie nienaruszone.',
        hint2: 'Kliknij podświetlony przycisk „Wymuś koniec”.',
        verify: { type: 'simulatorAction', action: 'macos-18-step-3' },
        simulatorScene: 'macos-18-step-3',
      },
    ],
  },
  {
    id: 'macos-19-polskie-znaki-klawiatura',
    track: 'macos',
    level: 1,
    title: 'Polskie litery (ą, ć, ę, ł, ś, ź, ż) na MacBooku – gdzie jest prawy Alt i jak działa przytrzymanie klawisza',
    realLifeHook:
      'Gdy chcesz napisać „ą” albo „ś”, naciskasz klawisz obok spacji z przyzwyczajenia i nagle kasuje Ci się tekst albo wyskakuje dziwne okno.',
    estimatedMinutes: 4,
    prerequisites: ['macos-06-skroty-klawiszowe'],
    reward: 'Odznaka Mistrzyni Polszczyzny',
    synonyms: [
      'polskie znaki na macu',
      'jak zrobic a z ogonkiem',
      'gdzie jest prawy alt',
      'nie dzialaja polskie litery',
      'jak napisac l krecha',
      'jak napisac z z kropka',
      'klawisz option',
      'uklad klawiatury polski pro',
      'zniknal mi tekst przy pisaniu a',
      'ogonki na klawiaturze maca',
    ],
    theory: {
      id: 'theory-macos-19-polskie-znaki-klawiatura',
      category: 'Wyszukiwanie i skróty',
      title: 'Bliźniacy obok spacji: Command (⌘) wydaje rozkazy, a Option (⌥) maluje polskie ogonki i kreseczki',
      metaphor: 'Klawisz Option (⌥) stoi o jeden krok dalej od spacji niż w Windowsie – a przytrzymanie litery działa jak podręczna kawiarenka z ogonkami',
      story:
        'Dlaczego każda osoba przesiadająca się na MacBooka przez pierwszy tydzień zamiast napisać „ą” przypadkiem zaznacza cały tekst?! Odpowiedź leży na samym dole klawiatury, tuż po prawej stronie długiego klawisza spacji. W zwykłych komputerach zaraz obok spacji stoi klawisz Alt (od polskich znaków). Natomiast na MacBooku tuż przy spacji stoi klawisz Command (⌘ – od rozkazów systemowych, takich jak ⌘A „Zaznacz wszystko”!), a klawisz od polskich znaków – nazywany Option (⌥) albo Alt – stoi o jedno miejsce dalej w prawo! Kiedy więc chcesz napisać „ą, ć, ę, ł, ń, ó, ś, ź, ż”, kciuk prawej dłoni wędruje o jeden klawisz dalej od spacji, na prawy Option (⌥). Ale to nie koniec! Nasz czarny kotek Maks zdradza drugi, uroczy sekret Maca: jeśli w ogóle nie chcesz szukać klawisza Option, przytrzymaj jednym palcem przez sekundę zwykłą literę „a”, „e”, „s” albo „z” – nad kursorem wyskoczy mały dymek z polską literką, dokładnie tak jak na ekranie iPhone’a!',
      realExplanation:
        'W standardowym układzie klawiatury macOS „Polski – Pro” polskie znaki diakrytyczne uzyskujemy, przytrzymując prawy (lub lewy) klawisz Option (⌥) wraz z odpowiednią literą (np. ⌥A = ą, ⌥S = ś, ⌥Z = ż, ⌥X = ź). Dodatkowo w macOS działa menu akcentów: dłuższe przytrzymanie klawisza litery wyświetla nad tekstem okienko wyboru polskiego znaku.',
      oneLiner:
        'Polskie znaki robisz klawiszem Option (⌥ – drugi klawisz od spacji) albo przytrzymując literę przez sekundę.',
      commonMyth:
        'Wiele osób myśli, że ma zepsutą klawiaturę, gdy wciśnięcie klawisza tuż przy spacji + A zaznacza cały tekst. A tymczasem tuż przy spacji leży Command (⌘), a klawisz polskich liter Option (⌥) jest tuż obok niego.',
      illustrationId: 'polish-keyboard-option',
    },
    steps: [
      {
        instruction:
          'Spójrz na dolny rząd klawiatury MacBooka i wskaż prawy klawisz „Option (⌥)” (drugi klawisz na prawo od długiej spacji).',
        hint: 'Tuż przy spacji leży klawisz Command (⌘), a zaraz za nim w prawo leży klawisz Option (⌥) służący do pisania polskich liter.',
        hint2: 'Kliknij podświetlony klawisz „Option (⌥)” na schemacie klawiatury MacBooka.',
        verify: { type: 'simulatorAction', action: 'macos-19-step-1' },
        simulatorScene: 'macos-19-step-1',
      },
      {
        instruction:
          'Wypróbuj drugi sposób: przytrzymaj klawisz litery „a” i wybierz „ą” z małego dymku akcentów, który wyskoczył nad tekstem.',
        hint: 'Ten sposób działa na Macu identycznie jak na klawiaturze iPhone’a.',
        hint2: 'Kliknij podświetloną literę „ą” w dymku nad tekstem.',
        verify: { type: 'simulatorAction', action: 'macos-19-step-2' },
        simulatorScene: 'macos-19-step-2',
      },
      {
        instruction:
          'Sprawdź na górnym pasku menu (lub w Ustawieniach Klawiatury), że wybrany układ klawiatury to „Polski – Pro”.',
        hint: 'Układ „Polski – Pro” to oficjalny układ Apple, w którym wszystkie litery są na swoich miejscach.',
        hint2: 'Kliknij podświetlone potwierdzenie układu „Polski – Pro”.',
        verify: { type: 'simulatorAction', action: 'macos-19-step-3' },
        simulatorScene: 'macos-19-step-3',
      },
    ],
  },
  {
    id: 'macos-20-uspienie-zamykanie-bateria',
    track: 'macos',
    level: 1,
    title: 'Zamykanie klapy czy Wyłączanie? Jak dbać o baterię i dlaczego MacBook budzi się w sekundę',
    realLifeHook:
      'Gdy zastanawiasz się, czy na noc trzeba wyłączać MacBooka z menu , czy można po prostu zamknąć klapę jak książkę i czy ładowarka może być podłączona podczas pracy.',
    estimatedMinutes: 4,
    prerequisites: ['macos-01-pulpit-dock'],
    reward: 'Odznaka Opiekunki MacBooka',
    synonyms: [
      'czy wylaczac macbooka na noc',
      'zamykanie klapy macbooka',
      'uspienie maca',
      'jak wylaczyc maca',
      'jak dbac o baterie w macbooku',
      'czy ladowarka moze byc podlaczona caly czas',
      'zablokuj ekran',
      'uruchom ponownie',
      'bateria szybko spada',
      'tryb uspienia',
    ],
    theory: {
      id: 'theory-macos-20-uspienie-zamykanie-bateria',
      category: 'Ustawienia i porządki',
      title: 'Drzemka kota na kanapie: dlaczego zamknięcie klapy jest bezpieczne i kiedy warto zrobić pełny restart',
      metaphor: 'Zamknięcie klapy to lekka drzemka, z której Mac budzi się w pół sekundy – a pełne „Uruchom ponownie” robimy raz na tydzień dla odświeżenia głowy',
      story:
        'Patrząc na naszego czarnego kotka drzemiącego na poduszce, od razu zrozumiesz, jak zaprojektowano nowoczesnego MacBooka. Dawniej komputery buczały wiatrakami i grzały się nawet wtedy, gdy nikt na nich nie pisał – dlatego po skończonej pracy trzeba je było całkowicie wyłączać. MacBook działa jak Twój iPhone albo jak kot: kiedy skończysz czytać i po prostu zamkniesz klapę ekranu, komputer w ułamku sekundy zasypia (wchodzi w tryb „Uśpienia”). W czasie snu jest całkowicie cichy, zimny i zużywa zaledwie kilka procent baterii przez całą noc. A rano, gdy tylko uniesiesz klapę i dotkniesz czytnika linii papilarnych (Touch ID), ekran rozbłyska w pół sekundy dokładnie na tym zdaniu, na którym skończyłaś wieczorem! Czy trzeba też bać się zostawienia podłączonej ładowarki przy biurku? Nie – Mac ma wbudowany inteligentny układ, który sam zatrzymuje ładowanie po napełnieniu baterii. A raz na tydzień lub dwa warto wybrać z menu  opcję „Uruchom ponownie…”, żeby przewietrzyć pamięć.',
      realExplanation:
        'Na co dzień po zakończeniu pracy na MacBooku możesz po prostu przymknąć pokrywę ekranu (tryb Uśpienia / Sleep). System macOS posiada funkcję „Zoptymalizowane ładowanie baterii” (w Ustawieniach systemowych → Bateria), która chroni ogniwa przed przeładowaniem, gdy komputer stoi podłączony do zasilacza. Całkowite wyłączenie („Wyłącz…”) przydaje się przy dłuższej podróży lub wielodniowej przerwie, natomiast „Uruchom ponownie…” warto wykonać raz na 1–2 tygodnie.',
      oneLiner:
        'Na co dzień po prostu zamykaj klapę MacBooka (Uśpienie), a raz na tydzień wybierz  → „Uruchom ponownie…”.',
      commonMyth:
        'Wiele osób boi się, że podłączona ładowarka „przeładuje” baterię MacBooka. A tymczasem Mac sam odcina dopływ prądu do pełnego akumulatora i zasila komputer bezpośrednio z gniazdka.',
      illustrationId: 'sleep-battery-cat',
    },
    steps: [
      {
        instruction:
          'Otwórz menu  w lewym górnym rogu ekranu i zobacz trzy opcje na dole: „Uśpij”, „Uruchom ponownie…” oraz „Zablokuj ekran (⌃⌘Q)”.',
        hint: '„Zablokuj ekran” przydaje się, gdy odchodzisz od stolika w kawiarni lub w pracy.',
        hint2: 'Kliknij podświetlone menu  na górnym pasku ekranu.',
        verify: { type: 'simulatorAction', action: 'macos-20-step-1' },
        simulatorScene: 'macos-20-step-1',
      },
      {
        instruction:
          'Otwórz sekcję „Bateria” w Ustawieniach systemowych i sprawdź stan kondycji baterii oraz „Zoptymalizowane ładowanie”.',
        hint: 'Zoptymalizowane ładowanie uczy się Twojego rytmu dnia i dba o żywotność akumulatora.',
        hint2: 'Kliknij podświetloną kartę „Bateria – Kondycja: W normie”.',
        verify: { type: 'simulatorAction', action: 'macos-20-step-2' },
        simulatorScene: 'macos-20-step-2',
      },
      {
        instruction:
          'Kliknij potwierdzenie zasady: na co dzień zamykam klapę (Uśpienie), a raz w tygodniu robię „Uruchom ponownie…”.',
        hint: 'Dzięki temu MacBook od razu budzi się do działania w pół sekundy po otwarciu klapy.',
        hint2: 'Kliknij podświetlony przycisk potwierdzenia w oknie.',
        verify: { type: 'simulatorAction', action: 'macos-20-step-3' },
        simulatorScene: 'macos-20-step-3',
      },
    ],
  },
];

export const MACOS_MISSIONS: Mission[] = RAW_MACOS_MISSIONS.map(polishMission);
