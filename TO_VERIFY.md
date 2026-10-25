# Elementy wymagające ręcznej weryfikacji na docelowych wersjach macOS (TO_VERIFY.md)

Zgodnie z zasadą 5 specyfikacji („Nie zmyślaj faktów o macOS – w razie braku 100% pewności oznacz krok flagą `verifyNeeded: true`”), poniższe zestawienie zawiera wszystkie **8 kroków i wariantów** w bazie 32 misji oznaczonych flagą `verifyNeeded: true`, pogrupowanych według docelowej wersji systemu macOS.

---

## 1. macOS 10.13 High Sierra – 12 Monterey (`<10.14` oraz `<13`)

1. **`macos-09-aktualizacje` (Krok 1, wariant `<10.14`):**
   - W systemie macOS 10.13 High Sierra aktualizacje systemowe znajdowały się w aplikacji **App Store** w zakładce **Uaktualnienia** (dopiero od macOS 10.14 Mojave trafiły do *Preferencje systemowe → Uaktualnienia oprogramowania*). Do ręcznego potwierdzenia dokładnej nazwy zakładki na polskiej wersji 10.13.6.
2. **`macos-08-ustawienia` (Krok 3, wariant `<13`):**
   - Dokładne brzmienie podpisu przy polu wyboru w *Preferencje systemowe → Dźwięk*: „Pokaż głośność na pasku menu” vs „Pokazuj głośność na pasku menu” między wersjami 10.13 a 12.
3. **`programy-04-safari-pdf-hasla` (Krok 2, wariant `<13`):**
   - Dostęp do zapisanych haseł przez *Safari → Preferencje… → Hasła* na starszych wydaniach Safari (macOS 10.13–12).

---

## 2. macOS 13 Ventura – 14 Sonoma (`>=13`)

4. **`iphone-01-airdrop` (Krok 1, wariant `>=13`):**
   - Etykieta czasowego włączenia odbioru AirDrop dla wszystkich („Wszyscy przez 10 minut”) w Centrum sterowania na pasku menu (zmiana wprowadzona w aktualizacjach macOS 13/14).
5. **`iphone-04-handoff-schowek` (Krok 1, wariant `>=13`):**
   - Dokładna ścieżka w nowych Ustawieniach systemowych: *Ustawienia systemowe → Ogólne → AirDrop i Handoff* oraz nazwa przełącznika „Pozwalaj na Handoff między tym Makiem a urządzeniami iCloud”.
6. **`ai-01-dyktowanie` (Krok 1, wariant `>=13`):**
   - Układ sekcji *Ustawienia systemowe → Klawiatura → Dyktowanie* i domyślny skrót wywołania mikrofonu (klawisz F5 vs dwukrotne naciśnięcie klawisza Fn/Control).

---

## 3. macOS 15 Sequoia i nowsze (`>=15`, w tym Tahoe)

7. **`programy-04-safari-pdf-hasla` (Krok 2, wariant `>=15`):**
   - Od macOS 15 Sequoia zarządzanie hasłami zostało wydzielone do nowej, osobnej aplikacji systemowej **Hasła** (`Passwords.app`).
8. **`iphone-03-hasla-pek-kluczy` (Krok 1, wariant `>=15`):**
   - Otwieranie i odblokowywanie nowej aplikacji **Hasła** w Docku / Spotlight zamiast dotychczasowej sekcji w Ustawieniach systemowych.
