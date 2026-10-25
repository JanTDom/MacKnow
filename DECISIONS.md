# Rejestr decyzji architektonicznych (DECISIONS.md)

Dokument zawiera wszystkie decyzje projektowe i techniczne podjęte podczas budowy aplikacji **MacKnow**, wraz z datą, rozważanymi alternatywami oraz uzasadnieniem.

---

## 1. Wybór wersji Electrona dla wsparcia macOS 10.13 High Sierra

- **Data:** 2026-10-25
- **Decyzja:** Użycie **Electron 26.6.10** w `apps/desktop`.
- **Alternatywy:**
  - Najnowszy Electron (v32+) – odrzucony, ponieważ wymaga macOS 11 Big Sur lub nowszego.
  - Electron 27.x – odrzucony, ponieważ w wersji 27.0.0 (Chromium 118) oficjalnie porzucono obsługę macOS 10.13 High Sierra oraz 10.14 Mojave.
  - Electron 22.x – odrzucony na rzecz nowszej linii 26.x, która jest ostatnią gałęzią wspierającą macOS 10.13 High Sierra.
- **Powód:** Zgodnie z oficjalną dokumentacją wspieranych platform Electrona ([Electron 27.0.0 Release Blog](https://www.electronjs.org/blog/electron-27-0) oraz [Electron Supported Platforms](https://www.electronjs.org/docs/latest/tutorial/support)), **Electron 26.x (ostatnia wersja: 26.6.10)** jest najnowszą wersją działającą na macOS 10.13 High Sierra (zarówno na procesorach Intel x64, jak i Apple Silicon arm64 oraz w buildzie `universal`).

---

## 2. Przechowywanie postępu w Electronie i przeglądarce (SQLite / sql.js / JSON + IndexedDB)

- **Data:** 2026-10-25
- **Decyzja:** Zastosowanie dwuwarstwowej persystencji lokalnej w `apps/desktop` (natywna baza SQLite przez `sql.js` z atomowym zapisem pliku `.sqlite` oraz lustrzanym plikiem JSON w katalogu `userData` aplikacji) oraz `IndexedDB` (z fallbackiem do `localStorage`) w `apps/web`, z pełnym eksportem i importem pliku JSON.
- **Alternatywy:**
  - `better-sqlite3` kompilowany natywnie przez `node-gyp` dla Electron 26 (ABI 116) pod dwie architektury (`x64` i `arm64`) – stwarza ryzyko błędu kompilacji krzyżowej C++ przy budowaniu obrazów DMG dla obu architektur na jednej maszynie oraz problemów z binariami na macOS 10.13.
- **Powód:** `sql.js` zapewnia w 100% zgodny silnik SQLite (WASM/JS) zapisujący bazę bezpośrednio na dysku w `apps/desktop` bez zależności od natywnego kompilatora C++ i wersji Xcode na docelowym lub budującym Macu, gwarantując identyczne działanie na Intel x64 (od High Sierra 10.13) oraz Apple Silicon arm64, przy zużyciu pamięci poniżej kilku megabajtów.

---

## 3. Kompatybilność z Safari 11+ i konfiguracja `browserslist`

- **Data:** 2026-10-25
- **Decyzja:** Ustawienie `browserslist` na `["safari >= 11", "chrome >= 70"]`, rezygnacja z nowoczesnych selektorów CSS nieobsługiwanych w Safari 11 (`:has()`, `@container`, `backdrop-filter`, `oklch()` bez fallbacku `rgb`/`hex`) oraz unikanie w kodzie klienckim funkcji JS wprowadzonych po ES2017 (`Array.prototype.at`, `Object.hasOwn`, `structuredClone`) na rzecz klasycznych odpowiedników.
- **Alternatywy:**
  - Stosowanie wyłącznie nowoczesnego CSS i poleganie na aktualnym Safari – odrzucone ze względu na wymóg działania w przeglądarce Safari na macOS 10.13 High Sierra (Safari 11–13).
- **Powód:** MacBooki z macOS 10.13 High Sierra posiadają maksymalnie Safari 13.1.2 (a bazowo Safari 11). Użycie zmiennych CSS (`--mk-*`) z wartościami HEX/RGB oraz klasycznego Flexboxa i CSS Grid gwarantuje bezbłędne renderowanie zarówno w Safari 11+, jak i we współczesnym WebKicie i Chromium.

---

## 4. Osadzenie aplikacji webowej w Electronie (Static Export + lokalny protokół/serwer)

- **Data:** 2026-10-25
- **Decyzja:** Konfiguracja `apps/web` z `output: 'export'` (statyczny build Next.js), który jest ładowany przez `apps/desktop` bezpośrednio z dysku (lokalny serwer HTTP na porcie pętli zwrotnej `127.0.0.1` w procesie głównym Electrona, z mostem `contextBridge` w `preload.js`).
- **Alternatywy:**
  - Uruchamianie pełnego serwera Node Next.js wewnątrz Electrona – przekracza budżet 200 MB RAM w spoczynku na 4 GB RAM i spowalnia start na dyskach HDD.
- **Powód:** Statyczny eksport serwowany lokalnie w Electronie zużywa minimalną ilość pamięci RAM (< 120 MB), startuje natychmiast nawet na dysku talerzowym HDD i pozwala tej samej bazie kodu działać w przeglądarce jako symulator oraz w Electronie jako asystent na żywo.
