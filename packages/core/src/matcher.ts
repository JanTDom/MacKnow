import { Mission, TrackId } from '@macknow/missions';

/**
 * Normalizuje polski i potoczny tekst zapytania: małe litery, usunięcie polskich znaków diakrytycznych
 * oraz znaków interpunkcyjnych, aby dopasowanie działało niezawodnie mimo literówek i braku ogonków.
 */
export function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Odległość Levenshteina do tolerowania drobnych literówek w słowach (np. "skrin", "zrzót", "blutut").
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}

export interface EmergencyMatchResult {
  matchedMissions: Array<{
    mission: Mission;
    score: number;
    matchedPhrase: string;
  }>;
  fallbackTracks: TrackId[];
}

/**
 * Wbudowany słownik ratunkowy łączący potoczne zwroty i błędy ortograficzne z identyfikatorami misji.
 * Każda z 32 misji może również definiować własną tablicę `mission.synonyms` (min. 10 synonimów).
 */
export const BUILTIN_SYNONYMS: Record<string, string[]> = {
  'macos-01-pulpit-dock': [
    'pulpit',
    'biurko',
    'dock',
    'pasek na dole',
    'ikonki na dole',
    'zniknal pasek',
    'gdzie sa programy',
    'jak zamknac program',
    'czerwona kropka',
    'pasek menu u gory',
    'jabluszko u gory',
    'ekran glowny',
  ],
  'macos-02-pobrane': [
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
  ],
  'macos-03-zrzut-ekranu': [
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
  'macos-04-spotlight': [
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
  ],
  'macos-05-finder-foldery': [
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
  ],
  'macos-06-skroty': [
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
  ],
  'macos-07-okna-mission-control': [
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
  ],
  'macos-08-ustawienia': [
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
  'macos-09-aktualizacje': [
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
  ],
  'macos-10-kosz': [
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
  'programy-01-mail-zalacznik': [
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
  ],
  'programy-02-mail-odpowiedz': [
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
  'programy-03-safari-karty': [
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
  'programy-04-safari-pdf-hasla': [
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
  'programy-05-word-pages-zapis': [
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
  'programy-06-word-pages-pdf': [
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
  'programy-07-zoom-teams-dolacz': [
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
  'programy-08-zoom-teams-ekran': [
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
  'programy-09-podglad-pdf': [
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
  'programy-10-podglad-zdjecia': [
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
  'iphone-01-airdrop': [
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
  'iphone-02-zdjecia-icloud': [
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
  'iphone-03-hasla-pek-kluczy': [
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
  'iphone-04-handoff-schowek': [
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
  'iphone-05-imessage-sms': [
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
  'iphone-06-facetime': [
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
  'ai-01-dyktowanie': [
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
  'ai-02-chatgpt-claude-start': [
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
  'ai-03-podsumuj-maila': [
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
  'ai-04-napisz-odpowiedz': [
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
  'ai-05-poprawianie-tekstu': [
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
  'ai-06-kiedy-ai-zmysla': [
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
};

/**
 * Dopasowuje swobodne, potoczne zapytanie użytkowniczki („Co ci nie wychodzi?”)
 * do najlepiej pasujących misji. Gdy nic nie pasuje, zwraca 3 najbliższe ścieżki.
 */
export function matchEmergencyQuery(
  rawQuery: string,
  missions: Mission[]
): EmergencyMatchResult {
  const queryNorm = normalizeQuery(rawQuery);
  const defaultTracks: TrackId[] = ['macos', 'programy', 'iphone'];

  if (!queryNorm) {
    return { matchedMissions: [], fallbackTracks: defaultTracks };
  }

  const queryTokens = queryNorm.split(' ').filter((t) => t.length >= 2);
  const scored: Array<{ mission: Mission; score: number; matchedPhrase: string }> = [];

  for (let i = 0; i < missions.length; i++) {
    const mission = missions[i];
    const phrases: string[] = (mission.synonyms || [])
      .concat(BUILTIN_SYNONYMS[mission.id] || [])
      .concat([mission.title, mission.realLifeHook]);

    let bestScore = 0;
    let bestPhrase = mission.title;

    for (let p = 0; p < phrases.length; p++) {
      const phraseRaw = phrases[p];
      const phraseNorm = normalizeQuery(phraseRaw);
      if (!phraseNorm) continue;

      let score = 0;

      // 1. Dokładne zawieranie całej frazy w zapytaniu lub zapytania we frazie
      if (queryNorm === phraseNorm) {
        score = 100;
      } else if (phraseNorm.length >= 4 && queryNorm.indexOf(phraseNorm) !== -1) {
        score = 85 + Math.min(10, phraseNorm.length);
      } else if (queryNorm.length >= 4 && phraseNorm.indexOf(queryNorm) !== -1) {
        score = 75;
      } else {
        // 2. Porównanie słów (tokenów) z tolerancją literówek (Levenshtein <= 1 lub <= 2 dla dłuższych słów)
        const phraseTokens = phraseNorm.split(' ').filter((t) => t.length >= 2);
        let matchedTokens = 0;

        for (let qt = 0; qt < queryTokens.length; qt++) {
          const qWord = queryTokens[qt];
          for (let pt = 0; pt < phraseTokens.length; pt++) {
            const pWord = phraseTokens[pt];
            if (qWord === pWord) {
              matchedTokens += 1.2;
              break;
            }
            if (qWord.length >= 4 && pWord.length >= 4) {
              if (pWord.indexOf(qWord) === 0 || qWord.indexOf(pWord) === 0) {
                matchedTokens += 1.0;
                break;
              }
              const dist = levenshteinDistance(qWord, pWord);
              const maxAllowed = qWord.length >= 6 ? 2 : 1;
              if (dist <= maxAllowed) {
                matchedTokens += 0.9;
                break;
              }
            }
          }
        }

        if (matchedTokens > 0 && phraseTokens.length > 0) {
          const coverage = matchedTokens / Math.max(1, Math.min(queryTokens.length, phraseTokens.length));
          score = Math.round(coverage * 60 + matchedTokens * 8);
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestPhrase = phraseRaw;
      }
    }

    if (bestScore >= 32) {
      scored.push({
        mission,
        score: bestScore,
        matchedPhrase: bestPhrase,
      });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  return {
    matchedMissions: scored.slice(0, 5),
    fallbackTracks: defaultTracks,
  };
}
