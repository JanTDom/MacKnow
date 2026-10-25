import { pl as polishTypography } from '@macknow/ui';

export interface MaksAiRequest {
  question: string;
  missionTitle?: string;
  stepInstruction?: string;
  stepHint?: string;
  osVersion?: string | null;
  frontmostApp?: string | null;
  mode?: 'step' | 'pogotowie' | 'theory';
}

export interface MaksAiResponse {
  answer: string;
  steps: string[];
  source: 'gemini' | 'local';
}

interface ElectronAiBridge {
  askMaksAi?: (payload: MaksAiRequest) => Promise<{
    answer: string;
    steps?: string[];
    source: 'gemini' | 'local';
  }>;
}

/**
 * Buduje szczegółową, kontekstową odpowiedź Kotka Maksa dopasowaną do aktualnego kroku misji
 * lub pytania Małgorzaty, używaną jako natychmiastowe wsparcie offline.
 */
function buildSmartSituationalFallback(req: MaksAiRequest): MaksAiResponse {
  const q = (req.question || '').toLowerCase();
  const appName = req.frontmostApp || 'Finder';
  const title = req.missionTitle || 'bieżące ćwiczenie na Macu';
  const instr = req.stepInstruction || '';
  const hint = req.stepHint || '';

  if (q.includes('inaczej') || q.includes('inny widok') || q.includes('u mnie')) {
    return {
      source: 'local',
      answer: polishTypography(
        `Małgorzato, to zupełnie naturalne – układ okna zależy od tego, jaki widok masz teraz włączony w programie ${appName} i z której wersji systemu macOS korzystasz.`
      ),
      steps: [
        polishTypography(
          `Spójrz w lewy górny róg ekranu (tuż obok logo ) – upewnij się, że widzisz tam nazwę programu potrzebnego w zadaniu „${title}”.`
        ),
        polishTypography(
          'Jeśli jesteś w Finderze i ikony wyglądają inaczej niż na ilustracji, naciśnij ⌘2 (widok uporządkowanej listy) albo ⌘3 (widok kolumn drzewa katalogów).'
        ),
        polishTypography(
          instr
            ? `Następnie wróć do głównego celu tego kroku: ${instr}`
            : 'Jeśli okno jest zbyt wąskie, pociągnij myszką za jego prawą krawędź, aby odsłonić ukryte przyciski.'
        ),
      ],
    };
  }

  if (q.includes('nie widzę') || q.includes('gdzie') || q.includes('przycisk') || q.includes('znika')) {
    return {
      source: 'local',
      answer: polishTypography(
        `Małgorzato, już szukamy! Na Macu niektóre przyciski i paski potrafią się schować, gdy okno nie jest aktywne lub pasek boczny został zwinięty.`
      ),
      steps: [
        polishTypography(
          'Kliknij raz w środek okna programu, na którym ćwiczysz, aby stało się aktywne – wtedy na samej górze ekranu pojawi się właściwy pasek menu.'
        ),
        polishTypography(
          hint
            ? `Skorzystaj ze wskazówki do tego kroku: ${hint}`
            : 'Jeśli nie widzisz lewego paska bocznego z teczkami (Biurko, Pobrane, Dokumenty), wybierz na górnym pasku menu „Widok” → „Pokaż pasek boczny”.'
        ),
        polishTypography(
          'Możesz też zawsze nacisnąć ⌘Spacja (lupkę Spotlight w prawym górnym rogu ekranu) i wpisać pierwsze litery szukanego programu lub pliku.'
        ),
      ],
    };
  }

  if (q.includes('okienko') || q.includes('błąd') || q.includes('pyta') || q.includes('komunikat')) {
    return {
      source: 'local',
      answer: polishTypography(
        'Małgorzato, spokojnie – żadne wyskakujące okienko na Macu nie zepsuje Twojej pracy ani plików.'
      ),
      steps: [
        polishTypography(
          'Przeczytaj spokojnie dolne przyciski w okienku: jeśli nie chcesz niczego zmieniać, kliknij „Anuluj” albo naciśnij klawisz Esc w lewym górnym rogu klawiatury.'
        ),
        polishTypography(
          'Jeśli Mac pyta o pozwolenie na dostęp do folderu Pobrane lub Dokumenty, kliknij „Pozwól” (lub „OK”), aby program mógł otworzyć Twoje pliki.'
        ),
        polishTypography(
          'Gdyby coś zniknęło z ekranu po kliknięciu, naciśnij od razu ⌘Z – Mac cofnie ostatni ruch.'
        ),
      ],
    };
  }

  if (req.mode === 'theory' || q.includes('po co') || q.includes('dlaczego') || q.includes('prościej')) {
    return {
      source: 'local',
      answer: polishTypography(
        `Małgorzato, wyobraź sobie to jak domowe biurko: w zadaniu „${title}” porządkujemy jedno konkretne miejsce, żebyś nie musiała za każdym razem szukać rzeczy od nowa.`
      ),
      steps: [
        polishTypography(
          instr
            ? `Co teraz robimy w praktyce: ${instr}`
            : 'Każdy program na Macu ma swoje stałe miejsce na górnym pasku menu oraz w teczce Dokumenty lub Pobrane.'
        ),
        polishTypography(
          'Dzięki temu ćwiczeniu wyrobisz sobie prosty odruch – zamiast przeklikiwać dziesięć okienek, użyjesz jednego pewnego ruchu.'
        ),
        polishTypography(
          hint
            ? `Najkrótsza droga w tym kroku: ${hint}`
            : 'Kiedy zrobisz to raz na spokojnie z Maksem, następnym razem zajmie Ci to kilka sekund.'
        ),
      ],
    };
  }

  return {
    source: 'local',
    answer: polishTypography(
      `Małgorzato, przeanalizowałem Twoją sytuację („${req.question}”) i przygotowałem dla Ciebie bezpieczny plan działania krok po kroku:`
    ),
    steps: [
      polishTypography(
        instr
          ? `Skupmy się najpierw na bieżącym ruchu: ${instr}`
          : 'Spójrz na dolny pasek Dock i kliknij pierwszą ikonę z lewej strony – uśmiechniętą niebiesko-białą buźkę Findera.'
      ),
      polishTypography(
        hint
          ? `Podpowiedź Kotka Maksa: ${hint}`
          : 'Jeśli szukasz zagubionego pliku lub programu, naciśnij ⌘Spacja (klawisz Command przy spacji + Spacja) i wpisz fragment jego nazwy.'
      ),
      polishTypography(
        'Jeżeli cokolwiek poszło nie po Twojej myśli, naciśnij ⌘Z (cofnij ostatnią czynność) albo włącz na górze tryb „Prawdziwy Mac”, a zakreślę właściwe miejsce bezpośrednio na Twoim ekranie.'
      ),
    ],
  };
}

/**
 * Pyta Kotka Maksa (przez Gemini API w procesie głównym lub lokalny serwer HTTP, z inteligentnym fallbackiem).
 */
export async function askMaksAi(req: MaksAiRequest): Promise<MaksAiResponse> {
  const cleanedQuestion = (req.question || '').trim();
  if (!cleanedQuestion) {
    return buildSmartSituationalFallback(req);
  }

  if (typeof window !== 'undefined') {
    const bridge = (window as unknown as { macknowDesktop?: ElectronAiBridge }).macknowDesktop;
    if (bridge?.askMaksAi) {
      try {
        const res = await bridge.askMaksAi(req);
        if (res && res.answer) {
          return {
            answer: polishTypography(res.answer),
            steps: (res.steps || []).map((s) => polishTypography(s)),
            source: res.source || 'gemini',
          };
        }
      } catch {
        // Przechodzimy do próby HTTP lub fallbacku
      }
    }

    try {
      const response = await fetch('/__api/ask-maks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req),
      });
      if (response.ok) {
        const data = (await response.json()) as {
          answer?: string;
          steps?: string[];
          source?: 'gemini' | 'local';
        };
        if (data && data.answer) {
          return {
            answer: polishTypography(data.answer),
            steps: (data.steps || []).map((s) => polishTypography(s)),
            source: data.source || 'gemini',
          };
        }
      }
    } catch {
      // W czystym trybie przeglądarkowym bez serwera Electron używamy bogatego fallbacku lokalnego
    }
  }

  return buildSmartSituationalFallback(req);
}
