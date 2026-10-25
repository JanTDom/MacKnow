# Księga znaku i tonu głosu MacKnow (BRAND.md)

## 1. Filozofia marki

**MacKnow** to osobisty, cierpliwy i elegancki przewodnik po MacBooku stworzony specjalnie dla **Małgorzaty**.
Nie jest to ani sucha instrukcja techniczna, ani dziecinna gra z migającymi fajerwerkami. Punkt odniesienia to wydawnicza czystość *Linear* i *Notion*, rzemiosło aplikacji nagradzanych *Apple Design Awards* oraz przemyślana, dająca satysfakcję progresja *Duolingo* – podana w estetyce dojrzałego magazynu („Ciepłe Rzemiosło”).

---

## 2. Znak graficzny (Logo i ikona aplikacji)

- **Symbol (Sygnet):** Zgeometryzowany kompas wpisany w zaokrąglony kwadrat o proporcjach ikony macOS, złożony z dwóch przecinających się wstęg przypominających jednocześnie wskazówkę kompasu (pewny kierunek) oraz otwartą książkę/klawisz `⌘` w ujęciu abstrakcyjnym.
- **Zasady konstrukcyjne:**
  - Zero nawiązań do nadgryzionego jabłka Apple.
  - Wyrazisty kontrast i prosta geometria wektorowa gwarantująca pełną czytelność nawet w rozmiarze **16×16 px** (na pasku menu lub w Docku).
- **Pliki źródłowe w `packages/ui/brand/`:**
  - `logo.svg` – pełny znak z logotypem **MacKnow**.
  - `icon-mark.svg` – sam sygnet aplikacji (baza dla ikony `.icns`).
  - `MacKnow.icns` – wielorozmiarowa ikona systemowa macOS (`16x16` do `1024x1024`).

---

## 3. Paleta barw (Tokeny CSS `--mk-*`)

Paleta opiera się na ciepłych, papierowych neutralach, które nie męczą wzroku, oraz energetycznej barwie wiodącej (terakota/ciepły cynober) i głębokiej zieleni szałwiowo-szmaragdowej dla sukcesu. Żaden komponent nie używa kolorów wpisanych na sztywno – wszystko korzysta z tokenów `--mk-*`.

### Tryb jasny (`:root`)
- `--mk-bg`: `#FAF7F2` (ciepły papier kremowy)
- `--mk-surface`: `#FFFFFF` (czysta karta)
- `--mk-surface-elevated`: `#F3EDE2` (ciepły piaskowy podkład)
- `--mk-text`: `#1E1B18` (głęboki grafit drukarski, kontrast > 14:1)
- `--mk-text-muted`: `#5C554E` (ciepły brązowo-szary, kontrast > 5.8:1 – WCAG AA)
- `--mk-border`: `#E4DDD3` (delikatny obrys papieru)
- `--mk-primary`: `#C85A32` (ciepła terakota – barwa wiodąca)
- `--mk-primary-hover`: `#AD4822`
- `--mk-primary-soft`: `#F9EAE3`
- `--mk-success`: `#2A6F4E` (szlachetna zieleń sukcesu)
- `--mk-success-soft`: `#E5F3EC`
- `--mk-warning`: `#B86B19` (bursztynowy akcent podpowiedzi)

### Tryb ciemny (`[data-theme="dark"]`)
- `--mk-bg`: `#161412` (nocny ciepły heban)
- `--mk-surface`: `#211E1B` (karta w trybie nocnym)
- `--mk-surface-elevated`: `#2C2824` (podniesiona powierzchnia)
- `--mk-text`: `#F5F1EA` (ciepła kość słoniowa)
- `--mk-text-muted`: `#B5ACA1` (stonowany piaskowiec)
- `--mk-border`: `#38332E`
- `--mk-primary`: `#E0744C` (rozświetlona terakota)
- `--mk-primary-hover`: `#EE8964`
- `--mk-primary-soft`: `#36221B`
- `--mk-success`: `#48A878`
- `--mk-success-soft`: `#1B3327`
- `--mk-warning`: `#E0943A`

### Barwy czterech ścieżek tematycznych
1. **macOS (`--mk-track-macos`):** `#C85A32` (Terakota – fundament i dom)
2. **Programy (`--mk-track-programy`):** `#2B6CB0` (Atramentowy błękit – codzienne narzędzia)
3. **iPhone + Mac (`--mk-track-iphone`):** `#6B46C1` (Śliwkowy fiolet – bezprzewodowy duet)
4. **AI (`--mk-track-ai`):** `#2A6F4E` (Szmaragdowa szałwia – mądry pomocnik)

---

## 4. Typografia i skala

- **Krój nagłówkowy (`--mk-font-display`):** **Fraunces** (szeryfowy z ciepłym, redakcyjnym charakterem, pełny zestaw polskich znaków: ą, ć, ę, ł, ń, ó, ś, ź, ż, Ą, Ć, Ę, Ł, Ń, Ó, Ś, Ź, Ż).
- **Krój tekstowy (`--mk-font-sans`):** **Plus Jakarta Sans** (wyjątkowo czytelny, humanistyczny bezszeryfowy krój o otwartych oczkach liter, wbudowany lokalnie offline w `public/fonts`).
- **5-stopniowa skala typograficzna:**
  1. `sm` (Metadane, etykiety pomocnicze): `0.875rem` (14 px)
  2. `base` (Tekst pomocniczy, nawigacja): `1rem` (16 px)
  3. `step` (Tekst misji, instrukcji i teorii – **minimum 18 px**): `1.125rem` (18 px, skalowalne w Ustawieniach do 20 px i 22 px)
  4. `h2` (Tytuły sekcji i kart): `1.5rem` (24 px)
  5. `h1` (Główne nagłówki ekranów): `2.125rem` (34 px)

---

## 5. Ton głosu i zasady komunikacji z Małgorzatą

1. **Zwracamy się po imieniu z umiarem:** Imię **Małgorzata** pojawia się maksymalnie raz na ekran, zawsze w poprawnej polskiej odmianie (w zwrotach bezpośrednich wyłącznie wołacz: *„Małgorzato, dziś…”*, nigdy *„Małgorzata, zrób…”*).
2. **Wyłącznie formy żeńskie:** *„zrobiłaś”*, *„ukończyłaś”*, *„jesteś gotowa”*, *„zacięłam się”*.
3. **Ciepło, konkretnie, bez protekcjonalności:**
   - Zakazane słowa: *„to proste”*, *„wystarczy”*, *„oczywiście”*, *„banalne”*.
   - Zamiast oceniania – wsparcie: przy pomyłce w symulatorze mówimy *„Nie tutaj – spójrz na podświetlone miejsce”* albo *„Nie szkodzi, spróbujmy inaczej”*.
4. **Humor felietonowy w teorii:**
   - Każda karta teorii opiera się na jednej życiowej metaforze (z domu, kuchni, poczty, szafy, podróży).
   - Żartujemy z dziwactw technologii i komputerowych nawyków, nigdy z użytkowniczki.
   - Po części obrazowej (`story`) zawsze następuje zwięzłe, precyzyjne wyjaśnienie bez metafory (`realExplanation`), aby Małgorzata znała prawdziwe nazwy i mechanizmy systemu macOS.
