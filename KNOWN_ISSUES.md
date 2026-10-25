# Znane ograniczenia i problemy (KNOWN_ISSUES.md)

Dokument opisuje znane ograniczenia techniczne, luki w starszych wersjach zależności wynikające z wymogu kompatybilności wstecznej oraz zastosowane obejścia.

---

## 1. Znane podatności bezpieczeństwa (CVE) w Electron 26.6.10 / Chromium 116

- **Kontekst:** Wymóg twardy sekcji 2a nakazuje użycie najnowszej wersji Electrona wspierającej macOS 10.13 High Sierra, którą jest **Electron 26.6.10** (wydany w 2024 roku, oparty na Chromium 116).
- **Ryzyko:** Chromium 116 posiada historyczne luki CVE wykryte w późniejszych wersjach przeglądarek (np. w parserze WebP/V8 przy otwieraniu niezaufanych stron internetowych).
- **Obejście i akceptowalność:** Aplikacja **MacKnow** działa w 100% offline, ładuje wyłącznie własny, lokalny interfejs z pakietu aplikacji, ma włączone `contextIsolation: true` oraz `nodeIntegration: false`, i nie otwiera zewnętrznych, niezaufanych stron internetowych wewnątrz okna Electrona. Ryzyko jest w pełni zneutralizowane i zaakceptowane zgodnie ze specyfikacją (sekcja 2a pkt 1).

---

## 2. Ograniczenia FSEvents na starych dyskach HDD i macOS 10.13

- **Kontekst:** Na starszych systemach macOS (10.13–10.14) lub przy nietypowych uprawnieniach systemowe powiadomienia o zmianach plików mogą działać z opóźnieniem.
- **Obejście:** W adapterze `watchFolder` zastosowano bibliotekę `chokidar` z automatycznym przełączeniem na `usePolling: true` (`interval: 600`), co zapewnia niezawodną detekcję nowego pliku (np. zrzutu ekranu na Pulpicie) w czasie poniżej 1 sekundy bez obciążania procesora.

---

## 3. Brak podpisu deweloperskiego Apple (Notaryzacji) dla plików `.dmg`

- **Kontekst:** Pliki instalacyjne `.dmg` (`x64` dla Intel oraz `arm64` dla Apple Silicon) są budowane bez płatnego certyfikatu Apple Developer ID.
- **Obejście:** Przy pierwszym uruchomieniu macOS wyświetli komunikat Gatekeepera. Dokładna instrukcja obejścia dla starszych systemów (macOS ≤ 10.14) oraz nowszych (macOS ≥ 10.15, w tym Sequoia/Tahoe) została szczegółowo opisana po ludzku w pliku `README.md`.
