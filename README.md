# MacKnow – Osobisty przewodnik po MacBooku dla Małgorzaty

**MacKnow** to aplikacja edukacyjna zaprojektowana dla jednej użytkowniczki – **Małgorzaty** – łącząca interaktywny symulator systemu macOS w przeglądarce (`apps/web`) z natywną aplikacją na Maca (`apps/desktop`), która dokuje się z boku ekranu i weryfikuje wykonywane zadania w czasie rzeczywistym.

Całość działa w 100% offline, bez kont, logowania i telemetrii.

---

## 1. Który plik instalacyjny `.dmg` pobrać na jakiego Maca?

W katalogu `apps/desktop/release/` budowane są dwa instalatory dopasowane do procesora Twojego MacBooka:

| Jaki masz komputer MacBook? | Który plik `.dmg` wybrać? | Architektura | Wspierane wersje systemu macOS |
| :--- | :--- | :--- | :--- |
| **MacBook z 2019 roku lub starszy** (oraz wybrane modele z pierwszej połowy 2020 r. z procesorem **Intel**) | `MacKnow-1.0.0-Intel-x64.dmg` | Intel (`x64`) | od **macOS 10.13 High Sierra** wzwyż |
| **MacBook od końca 2020 roku lub nowszy** (z procesorem **Apple M1, M2, M3, M4**) | `MacKnow-1.0.0-AppleSilicon-arm64.dmg` | Apple Silicon (`arm64`) | od **macOS 11 Big Sur** do **macOS 15 Sequoia / Tahoe** |

**Jak szybko sprawdzić, który masz procesor?**
Kliknij ikonę jabłuszka `` w samym lewym górnym rogu ekranu i wybierz **„Ten Mac”**. Jeśli widzisz napis **Procesor Intel** – wybierz wersję `Intel-x64`. Jeśli widzisz napis **Czip Apple M1 / M2 / M3 / M4** – wybierz wersję `AppleSilicon-arm64`.

---

## 2. Pierwsze uruchomienie na Macu – jak ominąć ostrzeżenie Gatekeepera

Ponieważ aplikacja została zbudowana prywatnie dla Małgorzaty (bez płatnej subskrypcji deweloperskiej Apple), przy pierwszym otwarciu system macOS wyświetli komunikat zabezpieczeń (Gatekeeper) o programie od nieznanego autora.

### A. Na starszych systemach (macOS 10.13 High Sierra oraz 10.14 Mojave)
*(oznaczono jako `do sprawdzenia` na fizycznym Macu z 10.13/10.14)*
1. Przeciągnij ikonę **MacKnow** z otwartego pliku `.dmg` do folderu **Aplikacje** (`Applications`).
2. Otwórz folder **Aplikacje**, przytrzymaj na klawiaturze klawisz **Control** i kliknij ikonę **MacKnow** (lub kliknij ją prawym przyciskiem myszy / dwoma palcami na gładziku), a następnie z menu wybierz **„Otwórz”**.
3. W okienku, które się pojawi, kliknij przycisk **„Otwórz”**. Od tej pory aplikacja będzie się uruchamiać zwykłym kliknięciem.
4. Jeśli przycisk nie jest widoczny: wejdź w ** → Preferencje systemowe → Ochrona i prywatność → zakładka Ogólne** i na dole okna kliknij **„Otwórz mimo to”**.

### B. Na nowszych systemach (macOS 10.15 Catalina, 11 Big Sur, 12 Monterey, 13 Ventura, 14 Sonoma, 15 Sequoia / Tahoe)
1. Przeciągnij **MacKnow** do folderu **Aplikacje** i spróbuj ją otworzyć. Gdy pojawi się okienko informujące, że nie można potwierdzić autora, kliknij **„OK”** lub **„Gotowe”**.
2. Kliknij jabłuszko **** w lewym górnym rogu ekranu i otwórz **Preferencje systemowe → Ochrona i prywatność** (na macOS 10.15–12) lub **Ustawienia systemowe → Prywatność i ochrona** (na macOS 13+).
3. Przewiń okno na sam dół do sekcji **Bezpieczeństwo** – zobaczysz tam informację o zablokowaniu programu MacKnow. Kliknij przycisk **„Otwórz mimo to”**, potwierdź hasłem do Maca i gotowe!

---

## 3. Uruchomienie aplikacji ze źródeł (tryb Web oraz Desktop)

### Wymagania
- Node.js (v18+) oraz `pnpm`

### Instalacja i budowanie całego monorepo
```bash
pnpm install
pnpm build
```

### Uruchomienie w przeglądarce (Tryb Symulatora – `apps/web`)
```bash
pnpm dev:web
```
Następnie otwórz w przeglądarce adres `http://127.0.0.1:3100`.

### Uruchomienie aplikacji okienkowej na Macu (Tryb Prawdziwego Maca – `apps/desktop`)
```bash
pnpm dev:desktop
```

### Zbudowanie plików instalacyjnych `.dmg` (`x64` + `arm64`)
```bash
pnpm dist:desktop
```
Gotowe pliki `.dmg` pojawią się w katalogu `apps/desktop/release/`.

### Testy jednostkowe, kontrola polszczyzny i testy E2E (Chromium + WebKit)
```bash
pnpm test       # Testy jednostkowe Vitest (core, missions, ui, desktop)
pnpm lint       # Sprawdzenie typów TypeScript + kontrola polskiej typografii
pnpm lint:pl    # Sam skrypt kontroli języka polskiego i typografii
pnpm test:e2e   # Testy Playwright w Chromium oraz WebKit (Safari)
```

---

## 4. Jak dodać nową misję, wariant wersji macOS oraz kartę teorii

Wszystkie misje i karty teorii znajdują się w pakiecie `packages/missions/src/` i są automatycznie przepuszczane przez funkcję `polishMission()` z `packages/ui/typography/polish.ts` (która zamienia cudzysłowy na drukarskie `„…”`, dywizy na półpauzy `–`, wstawia twarde spacje po jednoliterowych przyimkach `w`, `z`, `i`, `a`, `o`, `u` itd.).

### Przykład kompletnej misji z kartą teorii i wariantem wersji macOS:

```ts
import { Mission, polishMission } from './types';

export const NOWA_MISJA: Mission = polishMission({
  id: 'macos-11-przyklad',
  track: 'macos', // 'macos' | 'programy' | 'iphone' | 'ai'
  level: 1,       // 1 | 2 | 3
  title: 'Szybkie wyciszanie powiadomień wieczorem',
  realLifeHook: 'Gdy czytasz wieczorem artykuł i nie chcesz, żeby wyskakujące dymki rozpraszały Twoją uwagę.',
  estimatedMinutes: 4,
  prerequisites: ['macos-01-pulpit-dock'],
  reward: 'Odznaka Wieczornego Spokoju',
  minOsVersion: '10.13', // opcjonalnie: ukrywa misję na starszych systemach
  synonyms: [
    'nie przeszkadzac',
    'powiadomienia',
    'skupienie',
    'wyciszyc dymki',
    'tryb nocny powiadomien',
    'ksiezyc u gory',
    'wylaczyc wyskakujace okienka',
    'pokoj wieczorem',
    'tryb skupienia',
    'ciche powiadomienia',
  ],
  theory: {
    id: 'theory-macos-11-przyklad',
    category: 'Ustawienia i bezpieczeństwo',
    title: 'Tabliczka „Nie przeszkadzać” zawieszona na klamce Twojego MacBooka',
    metaphor: 'Hotelowa zawieszka na drzwiach, dzięki której nikt nie puka z pocztą, dopóki odpoczywasz',
    story: 'Wyobraź sobie, że czytasz ciekawą książkę w fotelu, a co dwie minuty ktoś uchyla drzwi i woła, że przyszła gazetka reklamowa. Na MacBooku dokładnie tym samym są wyskakujące w prawym górnym rogu powiadomienia. Aby zyskać święty spokój jednym kliknięciem, włączasz tryb „Nie przeszkadzać” (z ikoną półksiężyca). Wszystkie wiadomości grzecznie poczekają w skrzynce, ale żaden dymek nie mignie Ci przed oczami.',
    realExplanation: 'Tryb „Nie przeszkadzać” (od macOS 12 Monterey będący częścią funkcji „Skupienie”) wycisza dźwięki i banery powiadomień na ekranie. Włączysz go z Centrum sterowania na górnym pasku menu lub klikając zegarek w prawym górnym rogu z wciśniętym klawiszem Option (⌥).',
    oneLiner: 'Ikona półksiężyca wstrzymuje wyskakujące powiadomienia, nie kasując żadnej wiadomości.',
    commonMyth: 'Wiele osób myśli, że włączenie „Nie przeszkadzać” odrzuca przychodzące maile. A tymczasem poczta normalnie dociera, tylko nie hałasuje.',
    illustrationId: 'settings-switchboard',
  },
  steps: [
    {
      instruction: 'Kliknij ikonę Centrum sterowania w prawym górnym rogu paska menu i wybierz „Skupienie” → „Nie przeszkadzaj”.',
      hint: 'Ikona dwóch przełączników znajduje się obok zegarka i lupki Spotlight.',
      hint2: 'Kliknij podświetloną ikonę w prawym górnym rogu ekranu.',
      verify: { type: 'manual' },
      simulatorScene: 'macos-08-step-1',
      variants: [
        {
          osRange: '<11',
          instruction: 'Na starszym systemie macOS kliknij ikonę Centrum powiadomień w samym prawym górnym rogu ekranu i przełącz „Nie przeszkadzać”.',
          hint: 'W systemach High Sierra, Mojave i Catalina ikona listy znajduje się na samym prawym końcu paska menu.',
          verifyNeeded: true,
        },
      ],
    },
  ],
});
```

Aby nowa misja pojawiła się w aplikacji, dopisz ją do tablicy w odpowiednim pliku (`macos-missions.ts`, `programy-missions.ts`, `iphone-missions.ts` lub `ai-missions.ts`) i uruchom `pnpm test` oraz `pnpm lint:pl`.
