import { Mission, polishMission } from './types';

const RAW_AI_MISSIONS: Mission[] = [
  {
    id: 'ai-01-dyktowanie',
    track: 'ai',
    level: 1,
    title: 'Dyktowanie zamiast pisania – niech Mac pisze pod Twoje dyktando',
    realLifeHook:
      'Gdy masz do napisania długiego maila albo notatkę i dużo szybciej byłoby po prostu powiedzieć to na głos po polsku.',
    estimatedMinutes: 5,
    prerequisites: ['macos-08-ustawienia'],
    reward: 'Odznaka Głosowego Pióra',
    synonyms: [
      'dyktowanie',
      'pisanie glosem',
      'mikrofon na klawiaturze',
      'mowic zamiast pisac',
      'zamiana mowy na tekst',
      'nie chce mi sie pisac',
      'podyktowac maila',
      'glosowe wpisywanie tekstu',
      'wlaczyc dyktowanie',
      'klawisz z mikrofonem',
    ],
    theory: {
      id: 'theory-ai-01-dyktowanie',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Biegła maszynistka ukryta pod klawiszem mikrofonu, która rozumie polskie kropki i przecinki',
      metaphor: 'Osobista sekretarka, która zapisuje dokładnie to, co mówisz, w każdym programie na Macu',
      story:
        'Zanim w ogóle otworzymy jakikolwiek czat ze sztuczną inteligencją, warto poznać umiejętność AI, którą Twój MacBook ma wbudowaną fabrycznie w samą klawiaturę: dyktowanie głosowe po polsku. Na górnym rzędzie klawiszy (często na klawiszu F5) narysowany jest mały mikrofonik. Kiedy klikniesz myszką w pole pisania wiadomości e-mail, w dokument Worda albo w notatkę i wciśniesz ten mikrofon (lub naciśniesz dwa razy klawisz Fn / Control), obok kursora pojawi się mały znaczek słuchającego mikrofonu. Od tej chwili mówisz naturalnym głosem, a litery same wskakują na ekran z prędkością, jakiej nie osiągnie żaden mistrz pisania na klawiaturze! Co najciekawsze, możesz podyktować również znaki przestankowe – mówisz po prostu na głos: „Dzień dobry przecinek przesyłam dokumenty kropka nowy wiersz pozdrawiam”. Kiedy skończysz mówić, naciskasz Enter lub klawisz mikrofonu i tekst jest napisany.',
      realExplanation:
        'Funkcję Dyktowanie włączysz w Ustawieniach systemowych → Klawiatura → sekcja Dyktowanie (wybierając język polski). Po jej włączeniu w dowolnym polu tekstowym na Macu możesz nacisnąć klawisz dyktowania (ikona mikrofonu F5 lub dwukrotne naciśnięcie klawisza Fn/Control), mówić po polsku i wymawiać nazwy znaków interpunkcyjnych („przecinek”, „kropka”, „znak zapytania”).',
      oneLiner:
        'Włącz Dyktowanie w ustawieniach Klawiatury i mów do Maca zamiast stukać w klawisze.',
      commonMyth:
        'Wiele osób myśli, że dyktowanie głosowe działa tylko po angielsku albo wymaga specjalnego programu. A tymczasem Mac świetne rozpoznaje język polski w każdym oknie tekstowym.',
      illustrationId: 'ai-dictation-mic',
    },
    steps: [
      {
        instruction:
          'Otwórz Ustawienia systemowe → „Klawiatura”, znajdź sekcję „Dyktowanie” i przestaw przełącznik na włączony.',
        hint: 'Przy pierwszym włączeniu kliknij „Włącz” i upewnij się, że wybrany język to Polski.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej po sprawdzeniu ustawień Klawiatury.',
        verify: { type: 'simulatorAction', action: 'ai-01-step-1' },
        simulatorScene: 'ai-01-step-1',
        variants: [
          {
            osRange: '<13',
            instruction:
              'W Preferencjach systemowych kliknij ikonę „Klawiatura”, wybierz ostatnią zakładkę „Dyktowanie” u góry okna i zaznacz „Włączone”.',
            hint: 'W starszych wersjach macOS Dyktowanie jest osobną zakładką wewnątrz panelu Klawiatura.',
            simulatorScene: 'ai-01-step-1',
          },
          {
            osRange: '>=13',
            instruction:
              'W Ustawieniach systemowych wybierz „Klawiatura” na lewym pasku, przewiń do sekcji „Dyktowanie” i włącz przełącznik.',
            hint: 'Sprawdź też pod spodem, jaki skrót jest ustawiony (np. naciśnij dwa razy klawisz Fn lub Control).',
            simulatorScene: 'ai-01-step-1',
            verifyNeeded: true,
          },
        ],
      },
      {
        instruction:
          'Kliknij w dowolne pole tekstowe i wywołaj mikrofon dyktowania (klawisz F5 z mikrofonem lub dwukrotne naciśnięcie Fn/Control).',
        hint: 'Gdy Mac słucha Twojego głosu, obok kursora widać małą ikonkę mikrofonu.',
        hint2: 'Kliknij „Zrobione”, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'ai-01-step-2' },
        simulatorScene: 'ai-01-step-2',
      },
      {
        instruction:
          'Podyktuj próbne zdanie wraz ze słowem „kropka” na końcu i wyłącz mikrofon klawiszem Enter.',
        hint: 'Mów spokojnym, codziennym tempem – dokładnie tak, jakbyś rozmawiała przez telefon.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję o dyktowaniu.',
        verify: { type: 'simulatorAction', action: 'ai-01-step-3' },
        simulatorScene: 'ai-01-step-3',
      },
    ],
  },
  {
    id: 'ai-02-chatgpt-claude-start',
    track: 'ai',
    level: 1,
    title: 'ChatGPT i Claude w przeglądarce – jak zadać pierwsze pytanie',
    realLifeHook:
      'Gdy słyszysz zewsząd o sztucznej inteligencji i chcesz spokojnie sprawdzić, czym różni się rozmowa z AI od zwykłej wyszukiwarki Google.',
    estimatedMinutes: 5,
    prerequisites: ['programy-03-safari-karty'],
    reward: 'Odznaka Odkrywczyni AI',
    synonyms: [
      'chatgpt',
      'claude',
      'sztuczna inteligencja',
      'czat gpt',
      'jak rozmawiac z ai',
      'pierwsze pytanie do ai',
      'asystent ai w przegladarce',
      'o co zapytac ai',
      'prompt',
      'czat ze sztuczna inteligencja',
    ],
    theory: {
      id: 'theory-ai-02-chatgpt-claude-start',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Czym jest sztuczna inteligencja w jednym zdaniu i dlaczego rozmawia się z nią jak z człowiekiem',
      metaphor: 'Niezwykle oczytany bibliotekarz, który zamiast rzucać Ci dwadzieścia książek na stół, odpowiada pełnym zdaniem',
      story:
        'Czym właściwie jest współczesna sztuczna inteligencja (AI), taka jak ChatGPT czy Claude? W jednym zdaniu: to program komputerowy, który przeczytał miliony książek oraz artykułów i nauczył się prowadzić rozmowę w naturalnym języku polskim. Przez ostatnie dwadzieścia lat wyszukiwarka Google przyzwyczaiła nas do rzucania haseł jak do robota: „sernik przepis bez rodzynek”. W zamian Google wyrzucało listę dwudziestu stron pełnych reklam, przez które trzeba się było przekopać. Ze sztuczną inteligencją rozmawia się zupełnie inaczej – jak z życzliwym, oczytanym doradcą przy kawie. Zamiast hasła piszesz całe zdanie: „Mam w lodówce pół kilograma twarogu, cztery jajka i puszkę brzoskwiń, ale nie mam mąki pszennej. Podaj mi prosty przepis na ciasto krok po kroku”. I po sekundzie dostajesz czystą odpowiedź skrojoną dokładnie pod zawartość Twojej lodówki, bez ani jednego baneru reklamowego!',
      realExplanation:
        'Asystenci AI tacy jak ChatGPT (chatgpt.com) oraz Claude (claude.ai) działają bezpośrednio w oknie przeglądarki Safari – nie wymagają instalowania żadnych dodatkowych programów. Polecenie wpisywane do AI (nazywane czasem „promptem”) warto formułować pełnymi zdaniami, podając kontekst i cel. W każdej chwili możesz dopytać asystenta w tej samej rozmowie: „Wyjaśnij to prościej” albo „Zamień ten składnik na inny”.',
      oneLiner:
        'Do AI nie wpisujemy suchych haseł jak w Google, lecz rozmawiamy pełnymi zdaniami i dopytujemy.',
      commonMyth:
        'Wiele osób myśli, że do rozmowy z AI trzeba znać specjalne komendy programistyczne. A tymczasem najlepszą „komendą” jest zwykła, precyzyjna polszczyzna.',
      illustrationId: 'ai-chat-librarian',
    },
    steps: [
      {
        instruction:
          'Otwórz w przeglądarce Safari stronę asystenta AI (np. chatgpt.com lub claude.ai) i dodaj ją do paska Ulubionych (⌘D).',
        hint: 'Dzięki zakładce w Ulubionych masz swojego pomocnika zawsze pod jednym kliknięciem.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'ai-02-step-1' },
        simulatorScene: 'ai-02-step-1',
      },
      {
        instruction:
          'W dolnym polu rozmowy wpisz pełne zdanie z konkretną sytuacją z życia (zamiast pojedynczego słowa-klucza).',
        hint: 'Np. „Zaproponuj trzy pomysły na lekki obiad z cukinią, który zrobię w 20 minut”.',
        hint2: 'Kliknij „Zrobione”, aby przejść dalej.',
        verify: { type: 'simulatorAction', action: 'ai-02-step-2' },
        simulatorScene: 'ai-02-step-2',
      },
      {
        instruction:
          'Po otrzymaniu odpowiedzi napisz krótkie zdanie doprecyzowujące (np. „A w wersji bez śmietany?”), aby zobaczyć, że AI pamięta wątek rozmowy.',
        hint: 'Nie musisz powtarzać całego pytania od początku – AI pamięta, o czym przed chwilą rozmawialiście.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję.',
        verify: { type: 'simulatorAction', action: 'ai-02-step-3' },
        simulatorScene: 'ai-02-step-3',
      },
    ],
  },
  {
    id: 'ai-03-podsumuj-maila',
    track: 'ai',
    level: 1,
    title: '„Podsumuj mi ten mail” – jak w 10 sekund zrozumieć zawiłe pismo',
    realLifeHook:
      'Gdy dostajesz ze spółdzielni, banku albo urzędu wiadomość na trzy strony drobnym drukiem i chcesz od razu wiedzieć, co z niej wynika dla Ciebie.',
    estimatedMinutes: 5,
    prerequisites: ['macos-06-skroty', 'ai-02-chatgpt-claude-start'],
    reward: 'Odznaka Tłumaczki Żargonu',
    synonyms: [
      'podsumuj maila',
      'za dlugi mail',
      'streszczenie tekstu',
      'o co chodzi w tym piśmie',
      'urzedowe pismo wytlumacz',
      'skroc tekst',
      'wyciagnij najwazniejsze z maila',
      'dluga wiadomosc podsumowanie',
      'zrozumiec trudny dokument',
      'streszczanie przez ai',
    ],
    theory: {
      id: 'theory-ai-03-podsumuj-maila',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Tłumacz z języka urzędowego na ludzki, który wyciąga dla Ciebie samą esencję',
      metaphor: 'Zaprzyjaźniony prawnik, który czyta pięć stron regulaminu i mówi Ci w trzech punktach, o co chodzi',
      story:
        'Urzędy, banki, firmy ubezpieczeniowe i administracje osiedli uwielbiają pisać wiadomości takimi zdaniami, że po trzeciej linijce człowiek zapomina, jak się nazywa. Zamiast czytać cztery razy ten sam akapit o „znowelizowanym taryfikatorze opłat eksploatacyjnych”, możesz wykorzystać najmocniejszą stronę sztucznej inteligencji: błyskawiczne streszczanie i tłumaczenie z zawiłego żargonu na normalny język polski. Zaznaczasz tekst długiego maila lub regulaminu, kopiujesz go do schowka (⌘C), wklejasz do okna rozmowy z AI (⌘V) i dopisujesz na górze jedno konkretne zdanie: „Podsumuj mi to pismo w trzech krótkich punktach po ludzku i napisz, czy muszę coś zrobić lub zapłacić”. W kilka sekund otrzymasz przejrzyste streszczenie bez prawniczej waty.',
      realExplanation:
        'Modele językowe AI doskonale radzą sobie z analizą i streszczaniem długich tekstów. Skopiuj tekst pisma (⌘C), wklej go do okna czatu (⌘V) i poproś o wypunktowanie najważniejszych wniosków, terminów oraz ewentualnych działań. Pamiętaj jedynie, aby przed wklejeniem usunąć z tekstu wrażliwe dane, takie jak numer PESEL czy pełny numer dowodu.',
      oneLiner:
        'Skopiuj długie pismo (⌘C), wklej do AI (⌘V) i napisz: „Podsumuj mi to w 3 punktach po ludzku”.',
      commonMyth:
        'Wiele osób myśli, że do AI można wpisywać tylko krótkie pytania na jedną linijkę. A tymczasem do okna rozmowy możesz wkleić naraz nawet kilkanaście stron tekstu do streszczenia.',
      illustrationId: 'ai-summarize-mail',
    },
    steps: [
      {
        instruction:
          'Zaznacz treść długiego, zawiłego maila lub regulaminu i skopiuj ją do schowka skrótem ⌘C.',
        hint: 'Pamiętaj o naszej tacy schowka: zaznacz tekst myszką i wciśnij Command + C.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'ai-03-step-1' },
        simulatorScene: 'ai-03-step-1',
      },
      {
        instruction:
          'W oknie asystenta AI wpisz polecenie: „Podsumuj mi ten tekst prostym językiem w 3 punktach:” i wklej skopiowany tekst skrótem ⌘V.',
        hint: 'Połączenie jasnej prośby i wklejonego tekstu daje najbardziej przejrzysty wynik.',
        hint2: 'Kliknij „Zrobione”, aby przejść dalej.',
        verify: { type: 'simulatorAction', action: 'ai-03-step-2' },
        simulatorScene: 'ai-03-step-2',
      },
      {
        instruction:
          'Przeczytaj krótkie podsumowanie i dopytaj: „Czy z tego pisma wynika jakiś termin, którego muszę dopilnować?”.',
        hint: 'AI natychmiast wyłapie z tekstu wszystkie daty i kwoty.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję.',
        verify: { type: 'simulatorAction', action: 'ai-03-step-3' },
        simulatorScene: 'ai-03-step-3',
      },
    ],
  },
  {
    id: 'ai-04-napisz-odpowiedz',
    track: 'ai',
    level: 2,
    title: '„Napisz odpowiedź w moim imieniu” – pożegnanie z pustą kartką',
    realLifeHook:
      'Gdy musisz napisać uprzejmą, ale stanowczą reklamację albo grzecznie odmówić i nie wiesz, od jakiego zdania zacząć.',
    estimatedMinutes: 5,
    prerequisites: ['ai-03-podsumuj-maila'],
    reward: 'Odznaka Dyplomatki Korespondencji',
    synonyms: [
      'napisz odpowiedz',
      'odpisz na maila z ai',
      'grzeczna odmowa mail',
      'jak odpisac urzedowi',
      'szablon odpowiedzi',
      'ai pisze maila',
      'pomoc w napisaniu wiadomosci',
      'sformulowac pismo',
      'napisz w moim imieniu',
      'trudny mail jak odpowiedziec',
    ],
    theory: {
      id: 'theory-ai-04-napisz-odpowiedz',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Jak zlecić napisanie brudnopisu trudnej wiadomości i zachować własny styl',
      metaphor: 'Dyktowanie głównych myśli sekretarzowi, który ubiera je w zgrabne, uprzejme zdania',
      story:
        'Najtrudniejsza w pisaniu oficjalnych maili czy reklamacji jest zawsze pierwsza linijka. Człowiek siedzi przed migającym kursorem, zastanawia się, jak ująć sprawę, żeby nie zabrzmiało to ani zbyt ostro, ani zbyt ulegle, i traci pół godziny na jedno pismo. Ze sztuczną inteligencją ten problem znika całkowicie, bo AI uwielbia pisać pierwsze szkice! Nie musisz układać dla niej ładnych zdań – rzucasz jej surowe fakty z życia, dokładnie tak, jakbyś opowiadała o sprawie przyjaciółce: „Napisz w moim imieniu uprzejmą, ale stanowczą odpowiedź do sklepu. Zamówiłam lampę tydzień temu, przyszła z pękniętym kloszem, proszę o wymianę na nową na koszt sklepu. Użyj form żeńskich, podpisz jako Małgorzata”. Po trzech sekundach masz przed sobą elegancki, wyważony list, który kopiujesz do Maila, dopieszczasz jednym słowem i wysyłasz.',
      realExplanation:
        'Aby AI przygotowało trafną odpowiedź na wiadomość, podaj trzy elementy: cel odpowiedzi (np. zgoda, odmowa, reklamacja), kluczowe fakty oraz pożądany ton (np. ciepły, oficjalny, zwięzły). Warto dodać wskazówkę „pisz w rodzaju żeńskim (zrobiłam, chciałabym)”, aby uniknąć domyślnych form męskich.',
      oneLiner:
        'Podaj AI krótko fakty oraz ton wiadomości, a otrzymasz zgrabny szkic odpowiedzi w kilka sekund.',
      commonMyth:
        'Wiele osób myśli, że korzystanie z pomocy AI przy pisaniu pisma do urzędu czy sklepu jest czymś niewłaściwym. A tymczasem to po prostu nowoczesny odpowiednik wzornika pism, w którym ostateczna decyzja i podpis należą do Ciebie.',
      illustrationId: 'ai-draft-reply',
    },
    steps: [
      {
        instruction:
          'W oknie rozmowy z AI opisz krótko swoimi słowami, komu chcesz odpisać i co chcesz osiągnąć (np. reklamacja lub przełożenie wizyty).',
        hint: 'Pamiętaj o dopisku: „Użyj form żeńskich i uprzejmego, konkretnego tonu”.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'ai-04-step-1' },
        simulatorScene: 'ai-04-step-1',
      },
      {
        instruction:
          'Poproś AI o drobne dopasowanie stylu: „Skróć ten list o połowę, żeby był bardziej zwięzły”.',
        hint: 'Pierwszy szkic możesz dowolnie skracać, ocieplać lub usztywniać jednym zdaniem.',
        hint2: 'Kliknij „Zrobione”, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'ai-04-step-2' },
        simulatorScene: 'ai-04-step-2',
      },
      {
        instruction:
          'Skopiuj przygotowaną odpowiedź (⌘C) i wklej ją do programu Mail (⌘V), sprawdzając przed wysłaniem, czy wszystko zgadza się ze stanem faktycznym.',
        hint: 'Zawsze przeczytaj tekst przed kliknięciem „Wyślij” – Ty jesteś autorką listu.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję.',
        verify: { type: 'simulatorAction', action: 'ai-04-step-3' },
        simulatorScene: 'ai-04-step-3',
      },
    ],
  },
  {
    id: 'ai-05-poprawianie-tekstu',
    track: 'ai',
    level: 2,
    title: 'Poprawianie tekstu – przecinki, literówki i wygładzanie stylu',
    realLifeHook:
      'Gdy napisałaś już własny tekst lub życzenia, ale chcesz się upewnić, że nie ma w nim powtórzeń, literówek ani brakujących przecinków.',
    estimatedMinutes: 4,
    prerequisites: ['ai-02-chatgpt-claude-start'],
    reward: 'Odznaka Redaktorki Naczelnej',
    synonyms: [
      'popraw bledy',
      'przecinki w tekscie',
      'korekta tekstu',
      'literowki',
      'zeby brzmialo ladniej',
      'sprawdz pisownie z ai',
      'wygladz tekst',
      'popraw styl',
      'ortografia i interpunkcja',
      'redagowanie tekstu',
    ],
    theory: {
      id: 'theory-ai-05-poprawianie-tekstu',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Życzliwa korektorka, która wstawi przecinki przed „że” i nie zmieni Twojego własnego głosu',
      metaphor: 'Doświadczona redaktorka, która wygładza zagniecenia w tekście, ale zostawia Twoje własne słowa',
      story:
        'Czasem wcale nie chcemy, żeby sztuczna inteligencja pisała coś za nas – chcemy napisać wiadomość po swojemu, od serca, ale zależy nam, żeby tekst był wolny od drobnych literówek, niezręcznych powtórzeń tego samego słowa w dwóch zdaniach pod rząd czy zgubionych przecinków. W tej roli AI sprawdza się lepiej niż jakiekolwiek automatyczne podkreślanie na czerwono w edytorze tekstu. Jest tylko jeden sekret, który warto znać: jeśli napiszesz krótko „Popraw ten tekst”, AI bywa nadgorliwe i potrafi przepisać całą Twoją wiadomość na sztywny, urzędowy styl. Dlatego najlepiej wydać precyzyjne polecenie korektorskie: „Sprawdź poniższy tekst pod kątem literówek i polskiej interpunkcji, ale nie zmieniaj mojego stylu ani brzmienia zdań”. Wtedy dostajesz dokładnie swój własny tekst – tylko lśniący czystością.',
      realExplanation:
        'Wklejając własny tekst do sprawdzenia przez AI, określ zakres korekty: możesz poprosić wyłącznie o poprawienie ortografii i interpunkcji („popraw tylko błędy i przecinki, zachowaj mój styl”) albo o zaproponowanie trzech różnych wariantów brzmienia trudnego zdania do wyboru.',
      oneLiner:
        'Poproś AI: „Popraw tylko przecinki i literówki, zachowując mój własny styl”.',
      commonMyth:
        'Wiele osób myśli, że korekta przez AI zawsze zamienia tekst w sztuczny, komputerowy slogan. A tymczasem dopisanie w poleceniu prośby o zachowanie oryginalnego stylu całkowicie temu zapobiega.',
      illustrationId: 'ai-proofreading-pen',
    },
    steps: [
      {
        instruction:
          'Wklej swój własny napisany akapit do okna AI z poleceniem: „Popraw wyłącznie interpunkcję i literówki, nie zmieniając mojego stylu”.',
        hint: 'Dzięki temu zdania zachowają Twój naturalny ton.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'ai-05-step-1' },
        simulatorScene: 'ai-05-step-1',
      },
      {
        instruction:
          'Poproś dodatkowo: „Wypisz krótko pod spodem, jakie poprawki wprowadziłaś”.',
        hint: 'Dzięki temu od razu widzisz, w którym miejscu brakowało przecinka.',
        hint2: 'Kliknij „Zrobione”, aby przejść do ostatniego kroku.',
        verify: { type: 'simulatorAction', action: 'ai-05-step-2' },
        simulatorScene: 'ai-05-step-2',
      },
      {
        instruction:
          'Skopiuj sprawdzony tekst z powrotem do swojego dokumentu lub wiadomości.',
        hint: 'Twój tekst jest teraz dopracowany pod każdym względem.',
        hint2: 'Kliknij „Zrobione”, aby ukończyć misję.',
        verify: { type: 'simulatorAction', action: 'ai-05-step-3' },
        simulatorScene: 'ai-05-step-3',
      },
    ],
  },
  {
    id: 'ai-06-kiedy-ai-zmysla',
    track: 'ai',
    level: 3,
    title: 'Kiedy AI się myli, jak to sprawdzić i czego nigdy jej nie zdradzać',
    realLifeHook:
      'Gdy pytasz AI o dawkowanie leku, przepis prawny albo godziny otwarcia urzędu i chcesz wiedzieć, kiedy zachować zdrową ostrożność.',
    estimatedMinutes: 6,
    prerequisites: ['ai-02-chatgpt-claude-start', 'ai-03-podsumuj-maila'],
    reward: 'Odznaka Mądrego Krytyka AI',
    synonyms: [
      'ai klamie',
      'halucynacje ai',
      'czy ai mowi prawde',
      'kiedy ai sie myli',
      'jak sprawdzic ai',
      'zmyslone fakty',
      'bezpieczenstwo w ai',
      'czego nie wpisywac do ai',
      'pesel w chatgpt',
      'weryfikacja informacji z ai',
    ],
    theory: {
      id: 'theory-ai-06-kiedy-ai-zmysla',
      category: 'Sztuczna inteligencja (AI)',
      title: 'Dlaczego elokwentny gawędziarz czasem zmyśla z kamienną twarzą i jak sprawdzić jego słowa',
      metaphor: 'Błyskotliwy znajomy na przyjęciu, który pięknie opowiada, ale czasem zamiast powiedzieć „nie wiem”, zgrabnie zgaduje',
      story:
        'Sztuczna inteligencja ma jedną cechę bardzo ludzką, o której koniecznie trzeba pamiętać: bardzo nie lubi przyznawać się, że czegoś nie wie. Wyobraź sobie niezwykle elokwentnego, czarującego wujka przy świątecznym stole. Kiedy zapytasz go o przepis na ciasto albo o napisanie wiersza, poradzi sobie znakomicie. Ale jeśli zapytasz go o numer artykułu w niszowej ustawie podatkowej albo o dokładny rozkład jazdy autobusu w małym miasteczku, potrafi z pełnym przekonaniem i piękną polszczyzną… zmyślić odpowiedź! Fachowcy nazywają to „halucynacją AI”. Dlaczego tak się dzieje? Bo AI nie „wie” rzeczy tak jak człowiek – ona układa kolejne słowa tak, żeby brzmiały jak najbardziej prawdopodobnie. Dlatego złota zasada mądrej użytkowniczki brzmi: używaj AI bez ograniczeń do pisania, streszczania, tłumaczenia i pomysłów, ale twarde fakty (leki, pieniądze, prawo, adresy) zawsze każ jej poprzeć linkiem do źródła albo sprawdź na oficjalnej stronie. I druga zasada bezpieczeństwa: nigdy nie wklejaj do czatu swojego numeru PESEL, haseł ani numeru karty płatniczej.',
      realExplanation:
        'Modele językowe AI generują odpowiedzi na podstawie statystycznego prawdopodobieństwa słów, dlatego mogą podać nieprawdziwe daty, przepisy prawne lub dane medyczne brzmiące bardzo wiarygodnie. Aby zweryfikować odpowiedź, poproś AI: „Podaj linki do oficjalnych źródeł, na których się opierasz” i kliknij je, by sprawdzić, czy strona istnieje. Ze względów prywatności nigdy nie wpisuj do publicznych czatów AI haseł, numeru PESEL ani danych logowania do banku.',
      oneLiner:
        'AI świetnie pisze i streszcza, ale ważne fakty sprawdzaj u źródła i nie podawaj jej haseł ani PESEL-u.',
      commonMyth:
        'Wiele osób myśli, że skoro odpowiedź AI brzmi mądrze i bezbłędnie językowo, to wszystkie zawarte w niej liczby i daty są stuprocentową prawdą. A tymczasem gładki styl nie gwarantuje prawdziwości faktów.',
      illustrationId: 'ai-fact-check-shield',
    },
    steps: [
      {
        instruction:
          'Zadaj AI pytanie o konkretny fakt i dopisz na końcu: „Podaj linki do źródeł, żebym mogła to sama sprawdzić”.',
        hint: 'Proszenie o źródła zmusza asystenta do przeszukania internetu zamiast zgadywania z pamięci.',
        hint2: 'Kliknij przycisk „Zrobione” w ćwiczeniu poniżej.',
        verify: { type: 'simulatorAction', action: 'ai-06-step-1' },
        simulatorScene: 'ai-06-step-1',
      },
      {
        instruction:
          'Przed wklejeniem jakiegokolwiek pisma do AI upewnij się, że usunęłaś z niego numer PESEL, adres zamieszkania i numery kont.',
        hint: 'Zamiast prawdziwego imienia, nazwiska i PESEL-u możesz zostawić puste miejsce lub napisać „[MOJE DANE]”.',
        hint2: 'Kliknij „Zrobione”, aby potwierdzić zasadę prywatności.',
        verify: { type: 'simulatorAction', action: 'ai-06-step-2' },
        simulatorScene: 'ai-06-step-2',
      },
      {
        instruction:
          'Potwierdź ukończenie ścieżki Sztucznej Inteligencji – od dziś używasz AI świadomie, bezpiecznie i na własnych zasadach!',
        hint: 'Wiesz już, jak dyktować głosem, streszczać pisma, pisać odpowiedzi i weryfikować fakty.',
        hint2: 'Kliknij „Zrobione”, aby odebrać odznakę Mądrego Krytyka AI.',
        verify: { type: 'simulatorAction', action: 'ai-06-step-3' },
        simulatorScene: 'ai-06-step-3',
      },
    ],
  },
];

export const AI_MISSIONS: Mission[] = RAW_AI_MISSIONS.map(polishMission);
