# Elementy wymagające ręcznej weryfikacji na docelowych wersjach macOS (TO_VERIFY.md)

Zgodnie z zasadą 5 specyfikacji („Nie zmyślaj faktów o macOS – w razie braku 100% pewności oznacz krok flagą `verifyNeeded: true`”), poniższa lista gromadzi kroki i fakty oznaczone w bazie misji flagą `verifyNeeded: true`, pogrupowane według wersji systemu macOS.

---

## macOS 10.13 High Sierra – 10.14 Mojave

1. **Misja `macos-08-ustawienia` (Wariant `<13`):**
   - Dokładna nazwa pola wyboru w *Preferencje systemowe → Dźwięk*: „Pokaż głośność na pasku menu” (w części podwersji 10.13/10.14 etykieta mogła brzmieć „Pokazuj głośność na pasku menu”).
2. **Misja `macos-09-aktualizacje` (Wariant `<10.14`):**
   - Na macOS 10.13 High Sierra aktualizacje systemu znajdują się w aplikacji **App Store** w zakładce **Uaktualnienia**, natomiast od macOS 10.14 Mojave w *Preferencje systemowe → Uaktualnienia oprogramowania*. Wariant `<10.14` kieruje do App Store (`verifyNeeded: true`).
3. **Misja `programy-04-safari-hasla` (Wariant `<15`):**
   - Na macOS 10.13–12 hasła są dostępne zarówno w *Safari → Preferencje → Hasła*, jak i (od 10.15/11) w *Preferencje systemowe → Hasła*. Oznaczono wariant dla najstarszych wersji Safari (`verifyNeeded: true`).

---

## macOS 13 Ventura – 14 Sonoma

1. **Misja `iphone-01-airdrop` (Wariant `>=13`):**
   - Przełącznik odbioru AirDrop („Wszyscy przez 10 minut” vs „Wszyscy”) w Centrum sterowania na pasku menu (`verifyNeeded: true` dla dokładnego brzmienia etykiety w polskiej lokalizacji macOS 13 vs 14).
2. **Misja `iphone-04-handoff` (Wariant `>=13`):**
   - Ścieżka w nowych Ustawieniach systemowych: *Ustawienia systemowe → Ogólne → AirDrop i Handoff* (`verifyNeeded: true`).

---

## macOS 15 Sequoia i nowsze (Tahoe)

1. **Misja `iphone-03-hasla` oraz `programy-04-safari-hasla` (Wariant `>=15`):**
   - Od macOS 15 Sequoia Apple zastąpiło sekcję Haseł w Ustawieniach osobno uruchamianą aplikacją **Hasła** (ikona z pękiem kluczy w Docku / Launchpadzie). Krok w wariancie `>=15` oznaczony jako `verifyNeeded: true`.
2. **Misja `ai-01-dyktowanie` (Wariant `>=13`):**
   - W *Ustawienia systemowe → Klawiatura → Dyktowanie* okno zgody przy pierwszym włączeniu dyktowania po polsku (`verifyNeeded: true`).
