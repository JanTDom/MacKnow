'use client';

import React from 'react';
import {
  Paperclip,
  Reply,
  ReplyAll,
  Forward,
  Search,
  Lock,
  Share,
  Bookmark,
  Plus,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  MicOff,
  VideoOff,
  MonitorUp,
  PhoneOff,
  PenTool,
  RotateCcw,
  Wifi,
  Bluetooth,
  Smartphone,
  Sparkles,
  Mic,
  Copy,
  ShieldAlert,
  Check,
  Send,
} from 'lucide-react';
import { pl } from '@macknow/ui';
import {
  MacFolderIcon,
  MacPdfFileIcon,
  PhotosDockIcon,
  SafariDockIcon,
} from './MacOsIcons';

interface SceneProps {
  currentScene: string;
  isClassic: boolean;
  onComplete: (e: React.MouseEvent) => void;
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
      <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
      <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
    </div>
  );
}

export function MacSimulatorProgramyAndExtraScenes({
  currentScene,
  onComplete,
}: SceneProps) {
  // ==================== 1. APPLE MAIL (programy-mail-01 & programy-mail-02) ====================
  if (currentScene.indexOf('programy-mail-') === 0) {
    const isCompose = currentScene.indexOf('programy-mail-01-') === 0;
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-black/20 bg-white text-slate-800 text-xs">
        {/* Pasek tytułowy okna Mail */}
        <div className="h-11 px-3.5 bg-[#F4F5F7] border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <span className="font-semibold text-slate-700 ml-1">
              {isCompose ? pl('Nowa wiadomość – Umowa najmu') : pl('Odebrane – Mail (14 wiadomości)')}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isCompose ? (
              <>
                <button
                  type="button"
                  onClick={currentScene === 'programy-mail-01-step-1' ? onComplete : undefined}
                  data-testid={currentScene === 'programy-mail-01-step-1' ? 'simulator-target' : undefined}
                  className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                    currentScene === 'programy-mail-01-step-1'
                      ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                  title={pl('Dołącz pliki do wiadomości')}
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>{pl('Dołącz (Spinacz)')}</span>
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded border border-slate-300 bg-blue-600 text-white flex items-center gap-1 font-medium"
                >
                  <Send className="w-3 h-3" />
                  <span>{pl('Wyślij')}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={currentScene === 'programy-mail-02-step-1' ? onComplete : undefined}
                  data-testid={currentScene === 'programy-mail-02-step-1' ? 'simulator-target' : undefined}
                  className={`px-2 py-1 rounded border flex items-center gap-1 ${
                    currentScene === 'programy-mail-02-step-1'
                      ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>{pl('Odpowiedz')}</span>
                </button>
                <div className="px-2 py-1 rounded border border-slate-300 bg-white text-slate-600 flex items-center gap-1">
                  <ReplyAll className="w-3.5 h-3.5" />
                  <span>{pl('Odpowiedz wszystkim')}</span>
                </div>
                <button
                  type="button"
                  onClick={currentScene === 'programy-mail-02-step-2' ? onComplete : undefined}
                  data-testid={currentScene === 'programy-mail-02-step-2' ? 'simulator-target' : undefined}
                  className={`px-2 py-1 rounded border flex items-center gap-1 ${
                    currentScene === 'programy-mail-02-step-2'
                      ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                      : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <Forward className="w-3.5 h-3.5" />
                  <span>{pl('Prześlij dalej')}</span>
                </button>
                <button
                  type="button"
                  onClick={currentScene === 'programy-mail-02-step-3' ? onComplete : undefined}
                  data-testid={currentScene === 'programy-mail-02-step-3' ? 'simulator-target' : undefined}
                  className={`ml-2 px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${
                    currentScene === 'programy-mail-02-step-3'
                      ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-slate-900 font-bold'
                      : 'bg-white border-slate-300 text-slate-500'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{pl('Szukaj w skrzynce…')}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {isCompose ? (
          <div className="relative p-4 space-y-2.5 min-h-[250px] bg-white">
            <div className="flex items-center border-b border-slate-200 pb-1.5">
              <span className="w-16 text-slate-400 font-medium">{pl('Do:')}</span>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-medium">
                Anna Nowak &lt;anna.nowak@poczta.pl&gt;
              </span>
            </div>
            <div className="flex items-center border-b border-slate-200 pb-1.5">
              <span className="w-16 text-slate-400 font-medium">{pl('Temat:')}</span>
              <span className="font-semibold text-slate-800">{pl('Podpisana umowa najmu w załączniku')}</span>
            </div>
            <div className="pt-2 text-slate-700 space-y-3">
              <p>{pl('Dzień dobry Pani Anno,')}</p>
              <p>{pl('przesyłam w załączeniu skan umowy. Pozdrawiam serdecznie, Małgorzata.')}</p>

              {currentScene === 'programy-mail-01-step-3' && (
                <button
                  type="button"
                  onClick={onComplete}
                  data-testid="simulator-target"
                  className="mk-sim-highlight mt-3 p-3 rounded-lg border-2 border-mk-primary bg-amber-50/70 flex items-center gap-3 text-left"
                >
                  <MacPdfFileIcon className="w-9 h-11 shrink-0" badge="PDF" />
                  <div>
                    <div className="font-bold text-slate-900">Umowa-najmu.pdf (245 KB)</div>
                    <div className="text-[11px] text-mk-primary font-semibold">
                      {pl('Załącznik widoczny w treści wiadomości – kliknij, aby potwierdzić i wysłać')}
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Arkusz wyboru pliku macOS (Open Sheet) w kroku 2 */}
            {currentScene === 'programy-mail-01-step-2' && (
              <div className="absolute inset-x-8 top-6 bg-[#F8FAFC] rounded-xl shadow-2xl border border-slate-300 p-3.5">
                <div className="text-[11px] font-semibold text-slate-500 mb-2 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>{pl('Wybierz plik do załączenia — Dokumenty')}</span>
                  <span className="text-slate-400">Finder</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1 bg-slate-100 rounded p-2 space-y-1 text-[11px]">
                    <div className="text-slate-500">Biurko</div>
                    <div className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-semibold">Dokumenty</div>
                    <div className="text-slate-500">Pobrane</div>
                  </div>
                  <div className="col-span-2 flex flex-col justify-between p-1">
                    <div className="flex items-center gap-2 p-1.5 rounded bg-blue-100 text-blue-950 font-semibold">
                      <MacPdfFileIcon className="w-6 h-7" badge="PDF" />
                      <span>Umowa-najmu.pdf</span>
                    </div>
                    <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-slate-200">
                      <span className="px-3 py-1 rounded border border-slate-300 bg-white text-slate-600">
                        {pl('Anuluj')}
                      </span>
                      <button
                        type="button"
                        onClick={onComplete}
                        data-testid="simulator-target"
                        className="mk-sim-highlight px-3.5 py-1 rounded bg-blue-600 text-white font-bold"
                      >
                        {pl('Wybierz pliki')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 3-kolumnowy widok skrzynki Mail */
          <div className="grid grid-cols-12 min-h-[245px]">
            <div className="col-span-3 bg-[#F3F4F6] border-r border-slate-200 p-2.5 space-y-1">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-1.5">{pl('Ulubione')}</div>
              <div className="px-2 py-1 rounded bg-blue-600 text-white font-semibold flex justify-between">
                <span>{pl('Odebrane')}</span>
                <span>14</span>
              </div>
              <div className="px-2 py-1 text-slate-700">{pl('Wysłane')}</div>
              <div className="px-2 py-1 text-slate-700">{pl('Wersje robocze')}</div>
              <div className="px-2 py-1 text-slate-700">{pl('Kosz')}</div>
            </div>
            <div className="col-span-4 border-r border-slate-200 divide-y divide-slate-100">
              <div className="p-2.5 bg-blue-50/80">
                <div className="font-bold text-slate-900">Wspólnota Mieszkaniowa</div>
                <div className="text-[11px] font-semibold text-slate-700">{pl('Rozliczenie wody za półrocze')}</div>
                <div className="text-[10px] text-slate-500 truncate">{pl('W załączeniu przesyłamy zestawienie…')}</div>
              </div>
              <div className="p-2.5">
                <div className="font-semibold text-slate-800">Przychodnia Lekarska</div>
                <div className="text-[11px] text-slate-600">{pl('Potwierdzenie wizyty – wtorek 10:30')}</div>
              </div>
            </div>
            <div className="col-span-5 p-3 space-y-2 bg-white">
              <div className="border-b border-slate-100 pb-2">
                <div className="font-bold text-slate-900">Wspólnota Mieszkaniowa</div>
                <div className="text-[10px] text-slate-500">{pl('Do: Małgorzata oraz 18 innych sąsiadów')}</div>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {pl('Szanowni Państwo, przesyłamy rozliczenie zużycia wody. W razie pytań prosimy o kontakt indywidualny.')}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==================== 2. APPLE SAFARI (programy-safari-03 & programy-safari-04) ====================
  if (currentScene.indexOf('programy-safari-') === 0) {
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-black/20 bg-white text-slate-800 text-xs">
        {/* Pasek narzędzi Safari */}
        <div className="h-11 px-3 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <TrafficLights />
            <div className="flex items-center gap-1 ml-2 text-slate-400">
              <ChevronLeft className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Pasek adresu Safari z kłódką */}
          <div className="flex-1 max-w-md px-3 py-1 rounded-md bg-white border border-slate-300 flex items-center justify-center gap-1.5 text-slate-700 shadow-inner">
            <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
            <span className="font-medium truncate">
              {currentScene.indexOf('safari-03') !== -1 ? 'pacjent.gov.pl/ikp' : 'moje-konto.bank.pl/logowanie'}
            </span>
          </div>

          {/* Przycisk Udostępnij i Nowa Karta */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={currentScene === 'programy-safari-03-step-1' ? onComplete : undefined}
              data-testid={currentScene === 'programy-safari-03-step-1' ? 'simulator-target' : undefined}
              className={`px-2 py-1 rounded border flex items-center gap-1 ${
                currentScene === 'programy-safari-03-step-1'
                  ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
              title={pl('Udostępnij / Dodaj zakładkę')}
            >
              <Share className="w-3.5 h-3.5" />
              <span>{pl('Udostępnij')}</span>
            </button>
            <button
              type="button"
              onClick={currentScene === 'programy-safari-03-step-3' ? onComplete : undefined}
              data-testid={currentScene === 'programy-safari-03-step-3' ? 'simulator-target' : undefined}
              className={`px-2 py-1 rounded border flex items-center gap-1 ${
                currentScene === 'programy-safari-03-step-3'
                  ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
              title={pl('Nowa karta (⌘T)')}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{pl('Nowa karta')}</span>
            </button>
          </div>
        </div>

        {/* Pasek Ulubionych w Safari */}
        <div className="px-3 py-1 bg-[#F9FAFB] border-b border-slate-200 flex items-center gap-3 text-[11px] text-slate-600">
          <span className="flex items-center gap-1 font-medium text-blue-700">
            <Bookmark className="w-3 h-3" /> Internetowe Konto Pacjenta
          </span>
          <span>Poczta</span>
          <span>Pogoda</span>
          {currentScene === 'programy-safari-04-step-2' && (
            <button
              type="button"
              onClick={onComplete}
              data-testid="simulator-target"
              className="mk-sim-highlight ml-auto px-2.5 py-0.5 rounded bg-amber-50 border border-mk-primary text-mk-primary font-bold flex items-center gap-1"
            >
              <KeyRound className="w-3 h-3" />
              <span>{pl('Safari → Ustawienia → Hasła…')}</span>
            </button>
          )}
        </div>

        {/* Zawartość strony w Safari */}
        <div className="relative p-6 min-h-[225px] bg-slate-50 flex flex-col items-center justify-center">
          {currentScene === 'programy-safari-03-step-2' && (
            <div className="bg-white rounded-xl shadow-xl border border-slate-300 p-4 w-72 space-y-3">
              <div className="font-bold text-slate-800">{pl('Dodaj tę stronę do:')}</div>
              <div className="px-2.5 py-1.5 rounded bg-slate-100 border border-slate-300 font-medium">
                {pl('Ulubione (Pasek ulubionych)')}
              </div>
              <button
                type="button"
                onClick={onComplete}
                data-testid="simulator-target"
                className="mk-sim-highlight w-full py-1.5 rounded bg-blue-600 text-white font-bold"
              >
                {pl('Dodaj do Ulubionych')}
              </button>
            </div>
          )}

          {currentScene === 'programy-safari-04-step-1' && (
            <div className="bg-white rounded-xl shadow border border-slate-200 p-4 w-80 space-y-2.5">
              <div className="font-bold text-slate-800">{pl('Logowanie do serwisu')}</div>
              <input
                type="text"
                readOnly
                value="malgorzata@poczta.pl"
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 bg-slate-50 text-xs"
              />
              <div className="relative">
                <input
                  type="password"
                  readOnly
                  value="••••••••••••"
                  className="w-full px-2.5 py-1.5 rounded border-2 border-blue-500 bg-amber-50/40 text-xs"
                />
                <button
                  type="button"
                  onClick={onComplete}
                  data-testid="simulator-target"
                  className="mk-sim-highlight mt-2 w-full p-2 rounded-lg bg-[#FFFBEB] border border-amber-300 shadow-md flex items-center justify-between text-left"
                >
                  <span className="flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <span>
                      <strong className="block text-slate-900">{pl('Wypełnij hasło z Pęku kluczy')}</strong>
                      <span className="text-[10px] text-slate-500">malgorzata@poczta.pl — użyj Touch ID</span>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {currentScene === 'programy-safari-04-step-3' && (
            <div className="bg-white rounded-xl shadow border border-slate-200 p-4 w-96 space-y-2.5 text-left">
              <div className="flex items-center gap-2 font-bold text-slate-800 border-b border-slate-100 pb-2">
                <KeyRound className="w-4 h-4 text-blue-600" />
                <span>{pl('Zachowane hasła – moje-konto.bank.pl')}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">{pl('Użytkownik:')}</span>
                <span className="font-mono font-semibold">malgorzata@poczta.pl</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">{pl('Hasło:')}</span>
                <button
                  type="button"
                  onClick={onComplete}
                  data-testid="simulator-target"
                  className="mk-sim-highlight px-2.5 py-1 rounded bg-amber-50 border border-mk-primary font-mono font-bold text-slate-900"
                >
                  {pl('••••••• (Kliknij, aby odsłonić: M@lgosia2026!)')}
                </button>
              </div>
            </div>
          )}

          {currentScene !== 'programy-safari-03-step-2' &&
            currentScene !== 'programy-safari-04-step-1' &&
            currentScene !== 'programy-safari-04-step-3' && (
              <div className="text-center space-y-2 max-w-md">
                <SafariDockIcon className="w-12 h-12 mx-auto" />
                <div className="font-bold text-sm text-slate-800">
                  {pl('Internetowe Konto Pacjenta — Twoje recepty i skierowania')}
                </div>
                <p className="text-slate-500">
                  {pl('Skorzystaj z podświetlonego przycisku na górnym pasku okna przeglądarki Safari.')}
                </p>
              </div>
            )}
        </div>
      </div>
    );
  }

  // ==================== 3. WORD / PAGES (programy-word-05 & programy-word-06) ====================
  if (currentScene.indexOf('programy-word-') === 0) {
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-black/20 bg-[#F3F4F6] text-slate-800 text-xs">
        <div className="h-10 px-3.5 bg-[#1E3A8A] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <span className="font-semibold ml-1">{pl('Pismo-do-spoldzielni.docx — Edytor dokumentów')}</span>
          </div>
          <div className="flex items-center gap-2">
            {(currentScene === 'programy-word-05-step-1' || currentScene === 'programy-word-06-step-1') && (
              <button
                type="button"
                onClick={onComplete}
                data-testid="simulator-target"
                className="mk-sim-highlight px-3 py-1 rounded bg-amber-400 text-slate-950 font-bold"
              >
                {currentScene === 'programy-word-05-step-1'
                  ? pl('Plik → Zapisz jako… (⌘S)')
                  : pl('Plik → Eksportuj / Zapisz jako PDF…')}
              </button>
            )}
          </div>
        </div>

        {/* Wstążka formatowania */}
        <div className="px-4 py-1.5 bg-white border-b border-slate-300 flex items-center gap-3 text-[11px] text-slate-700">
          <span className="px-2 py-0.5 rounded border border-slate-300 bg-slate-50">Plus Jakarta Sans</span>
          <span className="px-2 py-0.5 rounded border border-slate-300 bg-slate-50">12 pt</span>
          <span className="font-bold px-1.5">B</span>
          <span className="italic px-1.5">I</span>
          <span className="underline px-1.5">U</span>
        </div>

        {/* Kartka A4 oraz okno dialogowe zapisu macOS */}
        <div className="relative p-5 min-h-[235px] flex justify-center">
          <div className="bg-white shadow-md border border-slate-200 w-full max-w-lg p-5 space-y-2">
            <div className="text-right text-[10px] text-slate-400">Warszawa, 25.10.2026 r.</div>
            <div className="font-bold text-sm text-slate-900">{pl('Wniosek o przegląd instalacji grzewczej')}</div>
            <p className="text-slate-600 leading-relaxed">
              {pl('Zwracam się z uprzejmą prośbą o sprawdzenie odpowietrzników kaloryferów przed sezonem zimowym. Z poważaniem, Małgorzata.')}
            </p>
          </div>

          {currentScene !== 'programy-word-05-step-1' && currentScene !== 'programy-word-06-step-1' && (
            <div className="absolute inset-x-12 top-3 bg-[#F8FAFC] rounded-xl shadow-2xl border border-slate-300 p-4 space-y-3">
              <div className="font-bold text-slate-800 border-b border-slate-200 pb-1.5">
                {currentScene.indexOf('word-05') !== -1
                  ? pl('Zapisz dokument na swoim Macu')
                  : pl('Eksportuj jako nierozjeżdżający się plik PDF')}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-500 block mb-0.5">{pl('Zachowaj jako:')}</span>
                  <div className="px-2 py-1 rounded border border-slate-300 bg-white font-semibold">
                    {currentScene.indexOf('word-06') !== -1
                      ? 'Pismo-do-spoldzielni.pdf'
                      : 'Pismo-do-spoldzielni.docx'}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">{pl('Gdzie (Miejsce):')}</span>
                  <button
                    type="button"
                    onClick={
                      currentScene === 'programy-word-05-step-2' ||
                      currentScene === 'programy-word-06-step-2'
                        ? onComplete
                        : undefined
                    }
                    data-testid={
                      currentScene === 'programy-word-05-step-2' ||
                      currentScene === 'programy-word-06-step-2'
                        ? 'simulator-target'
                        : undefined
                    }
                    className={`w-full px-2 py-1 rounded border text-left flex items-center gap-1.5 font-semibold ${
                      currentScene === 'programy-word-05-step-2' ||
                      currentScene === 'programy-word-06-step-2'
                        ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary'
                        : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <MacFolderIcon className="w-4 h-4" />
                    <span>
                      {currentScene.indexOf('word-06') !== -1
                        ? pl('Format: PDF (Najlepszy do druku)')
                        : pl('Na moim Macu — Dokumenty')}
                    </span>
                  </button>
                </div>
              </div>
              {(currentScene === 'programy-word-05-step-3' ||
                currentScene === 'programy-word-06-step-3') && (
                <div className="flex justify-end pt-2 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={onComplete}
                    data-testid="simulator-target"
                    className="mk-sim-highlight px-4 py-1.5 rounded bg-blue-600 text-white font-bold"
                  >
                    {currentScene === 'programy-word-05-step-3'
                      ? pl('Zachowaj w teczce Dokumenty')
                      : pl('Eksportuj plik PDF na Pulpit')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==================== 4. ZOOM / TEAMS / WIDEO (programy-zoom-07 & programy-zoom-08) ====================
  if (currentScene.indexOf('programy-zoom-') === 0) {
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-[#18181B] text-white text-xs">
        <div className="h-9 px-3.5 bg-[#27272A] border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <span className="font-semibold text-slate-200 ml-1">
              {pl('Spotkanie wideo – Rozmowa rodzinna (Zoom / FaceTime)')}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
            {pl('Połączenie szyfrowane')}
          </span>
        </div>

        {/* Kafelki uczestników */}
        <div className="relative p-4 grid grid-cols-2 gap-3 min-h-[210px]">
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-3 flex flex-col justify-between items-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg font-bold text-amber-200 mt-4">
              MK
            </div>
            <div className="w-full flex items-center justify-between text-[11px] text-slate-300">
              <span>{pl('Małgorzata (Ty)')}</span>
              <span className="text-emerald-400">{pl('Mikrofon: Wbudowany MacBook')}</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-800 border border-slate-700 p-3 flex flex-col justify-between items-center">
            <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-lg font-bold text-sky-200 mt-4">
              K
            </div>
            <div className="w-full flex items-center justify-between text-[11px] text-slate-300">
              <span>{pl('Kasia (Córka)')}</span>
              <span>HD</span>
            </div>
          </div>

          {/* Okno wyboru udostępnianego okna w Zoom (programy-zoom-08-step-2 i 3) */}
          {(currentScene === 'programy-zoom-08-step-2' || currentScene === 'programy-zoom-08-step-3') && (
            <div className="absolute inset-x-10 top-3 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-300 p-3.5 space-y-2.5">
              <div className="font-bold text-slate-900">
                {pl('Wybierz, co chcesz pokazać rozmówcy (Udostępnij pojedyncze okno, nie cały Pulpit):')}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2 rounded border border-slate-200 bg-slate-50 text-slate-500">
                  {pl('Cały ekran (Biurko – widoczne prywatne pliki)')}
                </div>
                <button
                  type="button"
                  onClick={currentScene === 'programy-zoom-08-step-2' ? onComplete : undefined}
                  data-testid={currentScene === 'programy-zoom-08-step-2' ? 'simulator-target' : undefined}
                  className={`p-2 rounded border text-left ${
                    currentScene === 'programy-zoom-08-step-2'
                      ? 'mk-sim-highlight bg-amber-50 border-mk-primary font-bold text-slate-900'
                      : 'border-blue-500 bg-blue-50 font-semibold text-blue-900'
                  }`}
                >
                  {pl('Tylko okno: Zdjęcia z wakacji (Podgląd)')}
                </button>
              </div>
              {currentScene === 'programy-zoom-08-step-3' && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={onComplete}
                    data-testid="simulator-target"
                    className="mk-sim-highlight px-4 py-1.5 rounded bg-rose-600 text-white font-bold"
                  >
                    {pl('Zatrzymaj udostępnianie (Stop Share)')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dolny pasek sterowania rozmową wideo */}
        <div className="px-4 py-2.5 bg-[#09090B] border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={
                currentScene === 'programy-zoom-07-step-1' ||
                currentScene === 'programy-zoom-07-step-3'
                  ? onComplete
                  : undefined
              }
              data-testid={
                currentScene === 'programy-zoom-07-step-1' ||
                currentScene === 'programy-zoom-07-step-3'
                  ? 'simulator-target'
                  : undefined
              }
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                currentScene === 'programy-zoom-07-step-1' ||
                currentScene === 'programy-zoom-07-step-3'
                  ? 'mk-sim-highlight bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              <MicOff className="w-3.5 h-3.5" />
              <span>
                {currentScene === 'programy-zoom-07-step-3'
                  ? pl('Wybierz mikrofon: MacBook (⌃A)')
                  : pl('Wycisz mikrofon (Mute)')}
              </span>
            </button>

            <button
              type="button"
              onClick={currentScene === 'programy-zoom-07-step-2' ? onComplete : undefined}
              data-testid={currentScene === 'programy-zoom-07-step-2' ? 'simulator-target' : undefined}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                currentScene === 'programy-zoom-07-step-2'
                  ? 'mk-sim-highlight bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-200'
              }`}
            >
              <VideoOff className="w-3.5 h-3.5" />
              <span>{pl('Kamera Wł./Wył.')}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={currentScene === 'programy-zoom-08-step-1' ? onComplete : undefined}
            data-testid={currentScene === 'programy-zoom-08-step-1' ? 'simulator-target' : undefined}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold ${
              currentScene === 'programy-zoom-08-step-1'
                ? 'mk-sim-highlight bg-emerald-400 text-slate-950 font-bold'
                : 'bg-emerald-600 text-white'
            }`}
          >
            <MonitorUp className="w-3.5 h-3.5" />
            <span>{pl('Udostępnij ekran')}</span>
          </button>

          <div className="px-3 py-1.5 rounded-lg bg-rose-600/80 text-white flex items-center gap-1">
            <PhoneOff className="w-3.5 h-3.5" />
            <span>{pl('Zakończ')}</span>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 5. PODGLĄD / PREVIEW (programy-podglad-09 & programy-podglad-10) ====================
  if (currentScene.indexOf('programy-podglad-') === 0) {
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-black/20 bg-[#E5E7EB] text-slate-800 text-xs">
        <div className="h-11 px-3.5 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <span className="font-semibold text-slate-700 ml-1">
              {currentScene.indexOf('podglad-09') !== -1
                ? pl('Podgląd — Wniosek-urzedowy.pdf (Strona 1 z 1)')
                : pl('Podgląd — Zdjecie-z-wakacji.jpg / Dokumenty PDF')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={currentScene === 'programy-podglad-10-step-1' ? onComplete : undefined}
              data-testid={currentScene === 'programy-podglad-10-step-1' ? 'simulator-target' : undefined}
              className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                currentScene === 'programy-podglad-10-step-1'
                  ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
              title={pl('Obróć w lewo o 90° (⌘L)')}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{pl('Obróć (⌘L)')}</span>
            </button>

            <button
              type="button"
              onClick={
                currentScene === 'programy-podglad-09-step-1' ||
                currentScene === 'programy-podglad-09-step-2'
                  ? onComplete
                  : undefined
              }
              data-testid={
                currentScene === 'programy-podglad-09-step-1' ||
                currentScene === 'programy-podglad-09-step-2'
                  ? 'simulator-target'
                  : undefined
              }
              className={`px-2.5 py-1 rounded border flex items-center gap-1.5 ${
                currentScene === 'programy-podglad-09-step-1' ||
                currentScene === 'programy-podglad-09-step-2'
                  ? 'mk-sim-highlight bg-amber-50 border-mk-primary text-mk-primary font-bold'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>
                {currentScene === 'programy-podglad-09-step-2'
                  ? pl('Podpisy → Utwórz podpis z gładzika')
                  : pl('Oznaczenia (Mazak w kółku)')}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 min-h-[235px]">
          {/* Pasek boczny Miniatury w Podglądzie */}
          <div className="col-span-3 bg-[#F9FAFB] border-r border-slate-300 p-2.5 space-y-2">
            <div className="text-[10px] font-bold uppercase text-slate-400">{pl('Miniatury stron')}</div>
            <div className="p-2 rounded border-2 border-blue-500 bg-white text-center">
              <div className="h-14 bg-slate-100 mb-1 flex items-center justify-center text-[10px] text-slate-500">
                {pl('Strona 1')}
              </div>
              <span className="text-[10px] font-semibold">1</span>
            </div>
            {(currentScene === 'programy-podglad-10-step-2' ||
              currentScene === 'programy-podglad-10-step-3') && (
              <button
                type="button"
                onClick={onComplete}
                data-testid="simulator-target"
                className="mk-sim-highlight w-full p-2 rounded border-2 border-dashed border-mk-primary bg-amber-50 text-center font-bold text-mk-primary text-[11px]"
              >
                {currentScene === 'programy-podglad-10-step-2'
                  ? pl('Włącz pasek „Miniatury”')
                  : pl('+ Upuść tutaj Strona-2.pdf, aby połączyć')}
              </button>
            )}
          </div>

          {/* Obszar podglądu kartki PDF */}
          <div className="col-span-9 p-4 flex items-center justify-center">
            <div className="bg-white shadow-lg border border-slate-300 w-full max-w-md p-5 space-y-4">
              <div className="font-bold text-slate-900">{pl('Oświadczenie właściciela lokalu')}</div>
              <p className="text-slate-600">
                {pl('Niniejszym potwierdzam zgodność danych zawartych w formularzu zgłoszeniowym.')}
              </p>
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-400">{pl('Podpis czytelny:')}</span>
                {currentScene === 'programy-podglad-09-step-3' ? (
                  <button
                    type="button"
                    onClick={onComplete}
                    data-testid="simulator-target"
                    className="mk-sim-highlight px-4 py-1.5 rounded border-2 border-mk-primary bg-amber-50 font-display italic text-base text-blue-900 font-bold"
                  >
                    Małgorzata Kowalska — {pl('Umieść podpis i zapisz (⌘S)')}
                  </button>
                ) : (
                  <span className="text-slate-400 italic">……………………………………</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== 6. IPHONE + MAC CONTINUITY (iphone-01 .. iphone-06) ====================
  if (currentScene.indexOf('iphone-') === 0) {
    return (
      <div className="w-full max-w-3xl grid grid-cols-12 gap-4 items-center text-xs">
        {/* Lewa strona: Okno na MacBooku (Finder / Zdjęcia / Notatki / Wi-Fi) */}
        <div className="col-span-7 bg-white rounded-xl shadow-2xl border border-black/20 overflow-hidden text-slate-800">
          <div className="h-9 px-3 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between">
            <TrafficLights />
            <span className="font-semibold text-slate-700">
              {currentScene.indexOf('iphone-01') === 0 && pl('Finder — Pobrane (AirDrop)')}
              {currentScene.indexOf('iphone-02') === 0 && pl('Zdjęcia — Biblioteka iCloud')}
              {currentScene.indexOf('iphone-03') === 0 && pl('Menu Wi-Fi na Macu — Hotspot osobisty')}
              {currentScene.indexOf('iphone-04') === 0 && pl('Notatki na Macu — Wspólny schowek')}
              {currentScene.indexOf('iphone-05') === 0 && pl('Pasek Dock Maca — Handoff z iPhone’a')}
              {currentScene.indexOf('iphone-06') === 0 && pl('Pulpit Maca — Kamera Continuity (Skaner)')}
            </span>
            <span className="w-8" />
          </div>
          <div className="p-4 min-h-[210px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-600">
                <Wifi className="w-4 h-4 text-blue-600" />
                <Bluetooth className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{pl('Połączenie bezpośrednie iPhone ↔ MacBook aktywne')}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-3">
                <PhotosDockIcon className="w-10 h-10 shrink-0" />
                <div className="text-slate-700">
                  {currentScene.indexOf('iphone-01') === 0 &&
                    pl('Zdjęcie przesłane przez AirDrop ląduje od razu w teczce „Pobrane” na Twoim Macu.')}
                  {currentScene.indexOf('iphone-02') === 0 &&
                    pl('Wspólna szafa iCloud pokazuje na Macu każde zdjęcie zrobione telefonem.')}
                  {currentScene.indexOf('iphone-03') === 0 &&
                    pl('Na liście Wi-Fi Maca widzisz pozycję „iPhone (Małgorzata)” z symbolem dwóch ogniw łańcucha.')}
                  {currentScene.indexOf('iphone-04') === 0 &&
                    pl('Tekst skopiowany na iPhonie możesz od razu wkleić na Macu skrótem ⌘V.')}
                  {currentScene.indexOf('iphone-05') === 0 &&
                    pl('Po lewej stronie Docka pojawia się dodatkowa ikona Safari z małym symbolem telefonu.')}
                  {currentScene.indexOf('iphone-06') === 0 &&
                    pl('Kliknięcie prawym przyciskiem na Pulpicie pozwala wybrać „Importuj z iPhone’a → Skanuj dokumenty”.')}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onComplete}
              data-testid="simulator-target"
              className="mk-sim-highlight mt-3 w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center gap-2 shadow"
            >
              <Check className="w-4 h-4" />
              <span>{pl('Wykonaj ten krok na ekranie Maca / iPhone’a')}</span>
            </button>
          </div>
        </div>

        {/* Prawa strona: Realistyczna obudowa iPhone’a Małgorzaty */}
        <div className="col-span-5 bg-[#111827] rounded-[28px] p-2.5 shadow-2xl border-2 border-slate-600 text-white">
          <div className="bg-slate-900 rounded-[22px] p-3 min-h-[235px] flex flex-col justify-between">
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2" />
            <div className="bg-white/10 rounded-xl p-3 space-y-2 text-center">
              <Smartphone className="w-7 h-7 text-sky-400 mx-auto" />
              <div className="font-bold text-xs">{pl('iPhone (Małgorzata)')}</div>
              <div className="text-[11px] text-slate-300">
                {currentScene.indexOf('iphone-01') === 0 && pl('AirDrop → MacBook Pro (Małgorzata)')}
                {currentScene.indexOf('iphone-02') === 0 && pl('Zdjęcia iCloud: Zsynchronizowano')}
                {currentScene.indexOf('iphone-03') === 0 && pl('Hotspot osobisty: Włączony')}
                {currentScene.indexOf('iphone-04') === 0 && pl('Schowek: Skopiowano z iPhone’a')}
                {currentScene.indexOf('iphone-05') === 0 && pl('Safari: Otwarty artykuł')}
                {currentScene.indexOf('iphone-06') === 0 && pl('Aparat: Skanowanie dokumentu A4')}
              </div>
            </div>
            <div className="w-20 h-1 bg-white/50 rounded-full mx-auto mt-2" />
          </div>
        </div>
      </div>
    );
  }

  // ==================== 7. SZTUCZNA INTELIGENCJA & DYKTOWANIE (ai-01 .. ai-06) ====================
  if (currentScene.indexOf('ai-') === 0) {
    const isDictation = currentScene.indexOf('ai-01-') === 0;
    const isSafety = currentScene.indexOf('ai-06-') === 0;
    return (
      <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl border border-black/20 bg-white text-slate-800 text-xs">
        <div className="h-10 px-3.5 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrafficLights />
            <span className="font-semibold text-slate-700 ml-1">
              {isDictation
                ? pl('Notatki + Dyktowanie głosowe macOS (Klawisz F5 🎙️)')
                : pl('Safari — Asystent AI (ChatGPT / Claude po polsku)')}
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
            {pl('Język polski')}
          </span>
        </div>

        <div className="p-4 space-y-3 min-h-[225px] flex flex-col justify-between bg-slate-50">
          {isDictation ? (
            <div className="space-y-3">
              {/* Górny rząd klawiszy MacBooka z klawiszem F5 (Mikrofon) */}
              <div className="p-2.5 rounded-xl bg-slate-800 text-white flex items-center justify-center gap-2 shadow-inner">
                <span className="px-2.5 py-1 rounded bg-slate-700 text-[10px]">esc</span>
                <span className="px-2.5 py-1 rounded bg-slate-700 text-[10px]">F1 🔅</span>
                <span className="px-2.5 py-1 rounded bg-slate-700 text-[10px]">F2 🔆</span>
                <span className="px-2.5 py-1 rounded bg-slate-700 text-[10px]">F3  Mission Control</span>
                <span className="px-2.5 py-1 rounded bg-slate-700 text-[10px]">F4 🔍</span>
                <span className="px-3 py-1 rounded bg-amber-400 text-slate-950 font-bold flex items-center gap-1">
                  <Mic className="w-3.5 h-3.5" /> F5 Dyktowanie
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <span className="text-slate-800 font-medium">
                  {pl('„Dzień dobry, przesyłam obiecane dokumenty. Pozdrawiam serdecznie.”')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold flex items-center gap-1 shrink-0">
                  <Mic className="w-3.5 h-3.5" /> PL
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  {pl('Twoje polecenie dla AI:')}
                </div>
                <div className="font-medium text-slate-800">
                  {currentScene.indexOf('ai-02') === 0 &&
                    pl('„Mam w lodówce twaróg, cztery jajka i brzoskwinie. Podaj mi przepis na szybkie ciasto krok po kroku.”')}
                  {currentScene.indexOf('ai-03') === 0 &&
                    pl('„Podsumuj mi to zawiłe pismo ze spółdzielni w 3 krótkich punktach po ludzku i napisz, czy muszę coś zapłacić.”')}
                  {currentScene.indexOf('ai-04') === 0 &&
                    pl('„Napisz uprzejmą reklamację butów: kupione 3 miesiące temu, pękła podeszwa, proszę o zwrot na konto.”')}
                  {currentScene.indexOf('ai-05') === 0 &&
                    pl('„Sprawdź poniższy tekst pod kątem literówek i przecinków, ale zachowaj mój własny styl.”')}
                  {isSafety &&
                    pl('Zasada bezpieczeństwa: Zanim wkleisz umowę do AI, zastąp swój PESEL i numer dowodu słowem [DANE UKRYTE].')}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2.5">
                {isSafety ? (
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                )}
                <div className="text-slate-700">
                  {isSafety
                    ? pl('Chronisz swoje dane: AI widzi treść pisma, ale nie zna Twojego numeru PESEL ani hasła do banku.')
                    : pl('Odpowiedź gotowa w 2 sekundy — możesz ją od razu skopiować jednym kliknięciem do swojego dokumentu lub maila.')}
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onComplete}
            data-testid="simulator-target"
            className="mk-sim-highlight w-full py-2.5 px-4 rounded-lg bg-mk-primary text-white font-bold flex items-center justify-center gap-2 shadow"
          >
            {isDictation ? <Mic className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{pl('Wykonaj podświetloną czynność w oknie na Macu')}</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
