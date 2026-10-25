'use client';

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Folder,
  Search,
  Settings,
  Trash2,
  Mail,
  FileText,
  Camera,
  Wifi,
  Volume2,
  Bluetooth,
  LayoutGrid,
  CheckCircle2,
  Paperclip,
  Reply,
  Bookmark,
  KeyRound,
  Video,
  MicOff,
  MonitorUp,
  PenTool,
  RotateCw,
  RefreshCw,
  Copy,
  ClipboardPaste,
  Eye,
  Plus,
} from 'lucide-react';
import { SimulatorTheme } from '@macknow/core';
import { TrackId } from '@macknow/missions';
import { pl, TrackIllustration } from '@macknow/ui';

export interface MacSimulatorProps {
  scene: string | undefined;
  track: TrackId;
  theme: SimulatorTheme;
  onCompleteStep: () => void;
}

/**
 * Interaktywny symulator systemu macOS w dwóch motywach:
 * - 'classic': estetyka macOS Mojave / Catalina (Preferencje systemowe w siatce ikon)
 * - 'modern': estetyka macOS Ventura / Sonoma / Sequoia (Ustawienia systemowe z listą boczną)
 *
 * Używa wyłącznie ikon Lucide. Podświetla aktywny element docelowy (mk-sim-highlight),
 * a przy kliknięciu obok wyświetla łagodną wskazówkę: „Nie tutaj – spójrz na podświetlone miejsce”.
 */
export function MacSimulator({
  scene,
  track,
  theme,
  onCompleteStep,
}: MacSimulatorProps) {
  const [misclickNotice, setMisclickNotice] = useState<string | null>(null);
  const [stepConfirmed, setStepConfirmed] = useState(false);

  useEffect(() => {
    setMisclickNotice(null);
    setStepConfirmed(false);
  }, [scene]);

  const handleCorrectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMisclickNotice(null);
    setStepConfirmed(true);
    setTimeout(() => {
      setStepConfirmed(false);
      onCompleteStep();
    }, 180);
  };

  const handleWrongClick = () => {
    setMisclickNotice(pl('Nie tutaj – spójrz na podświetlone miejsce.'));
  };

  // Dla ścieżek iPhone oraz AI zgodnie ze specyfikacją (sekcja 4) wyświetlamy uproszczoną scenę z ilustracją i przyciskiem „Zrobione”
  if (track === 'iphone' || track === 'ai') {
    return (
      <div
        className="w-full rounded-mk-xl border border-mk-border bg-mk-surface p-6 shadow-sm flex flex-col items-center text-center"
        data-testid="simulator-simplified"
      >
        <div className="mb-4">
          <TrackIllustration track={track} className="w-20 h-20" />
        </div>
        <p className="text-sm text-mk-muted max-w-md mb-5">
          {track === 'iphone'
            ? pl('To ćwiczenie łączące Twojego iPhone’a i Maca. Wykonaj ten krok na swoich urządzeniach lub przećwicz go tutaj i kliknij „Zrobione”.')
            : pl('To ćwiczenie z asystentem AI lub dyktowaniem. Wypróbuj ten krok i kliknij „Zrobione”, aby przejść dalej.')}
        </p>
        <button
          type="button"
          onClick={handleCorrectClick}
          data-testid="simulator-target"
          className="mk-sim-highlight px-6 py-3 rounded-mk font-semibold text-white transition-transform duration-150 active:scale-95"
          style={{ backgroundColor: 'var(--mk-primary)' }}
        >
          {pl('Zrobione')}
        </button>
      </div>
    );
  }

  const currentScene = scene || 'macos-01-step-1';
  const isClassic = theme === 'classic';

  return (
    <div
      onClick={handleWrongClick}
      data-testid="mac-simulator"
      data-simulator-theme={theme}
      className="relative w-full rounded-mk-xl border-2 border-mk-border overflow-hidden select-none shadow-sm transition-colors duration-150"
      style={{
        backgroundColor: isClassic ? '#D9E2EC' : '#E6DFD5',
        minHeight: '360px',
      }}
    >
      {/* Górny pasek menu macOS */}
      <div
        className="flex items-center justify-between px-4 py-1.5 text-xs font-medium border-b"
        style={{
          backgroundColor: isClassic ? '#F0F4F8' : '#FAF7F2',
          borderColor: 'var(--mk-border)',
          color: '#1E1B18',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={
              currentScene.indexOf('macos-08-step-1') === 0 ||
              currentScene === 'macos-09-step-1' ||
              currentScene === 'macos-09-step-1-classic'
                ? handleCorrectClick
                : undefined
            }
            data-testid={
              currentScene.indexOf('macos-08-step-1') === 0 ||
              currentScene === 'macos-09-step-1' ||
              currentScene === 'macos-09-step-1-classic'
                ? 'simulator-target'
                : undefined
            }
            className={`px-2 py-0.5 rounded font-bold flex items-center gap-1.5 ${
              currentScene.indexOf('macos-08-step-1') === 0 ||
              currentScene === 'macos-09-step-1' ||
              currentScene === 'macos-09-step-1-classic'
                ? 'mk-sim-highlight bg-white text-mk-primary'
                : 'opacity-80'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{isClassic ? pl('Menu  (Preferencje systemowe…)') : pl('Menu  (Ustawienia systemowe…)')}</span>
          </button>

          <button
            type="button"
            onClick={currentScene === 'macos-01-step-2' ? handleCorrectClick : undefined}
            data-testid={currentScene === 'macos-01-step-2' ? 'simulator-target' : undefined}
            className={`px-2 py-0.5 rounded font-bold ${
              currentScene === 'macos-01-step-2'
                ? 'mk-sim-highlight bg-white text-mk-primary'
                : 'opacity-80'
            }`}
          >
            {track === 'programy' ? pl('Program') : 'Finder'}
          </button>
          <span className="opacity-60">Plik</span>
          <span className="opacity-60">Edycja</span>
          <span className="opacity-60">Widok</span>
        </div>

        <div className="flex items-center gap-3">
          <Wifi className="w-3.5 h-3.5 opacity-70" />
          <Volume2 className="w-3.5 h-3.5 opacity-70" />
          <button
            type="button"
            onClick={currentScene === 'macos-04-step-1' ? handleCorrectClick : undefined}
            data-testid={currentScene === 'macos-04-step-1' ? 'simulator-target' : undefined}
            className={`flex items-center gap-1 px-2 py-0.5 rounded ${
              currentScene === 'macos-04-step-1'
                ? 'mk-sim-highlight bg-white text-mk-primary font-semibold'
                : 'opacity-80'
            }`}
            aria-label={pl('Szukaj w Spotlight')}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Spotlight</span>
          </button>
          <span className="opacity-75 font-semibold">11:30</span>
        </div>
      </div>

      {/* Główny obszar roboczy Pulpitu i okien */}
      <div className="relative p-5 min-h-[268px] flex flex-col items-center justify-center">
        {/* Ikona nowego zrzutu ekranu na Pulpicie (Misja 3 krok 3) */}
        {currentScene === 'macos-03-step-3' && (
          <div className="w-full flex justify-end pr-4">
            <button
              type="button"
              onClick={handleCorrectClick}
              data-testid="simulator-target"
              className="mk-sim-highlight bg-white p-3 rounded-mk shadow border flex flex-col items-center gap-1.5 text-xs font-semibold text-mk-text"
            >
              <Camera className="w-7 h-7 text-mk-primary" />
              <span>{pl('Zrzut ekranu 2026-10-25.png')}</span>
            </button>
          </div>
        )}

        {/* Sceny Zrzutu ekranu (Misja 3 krok 1 i 2, w tym wariant legacy <10.14) */}
        {(currentScene === 'macos-03-step-1' ||
          currentScene === 'macos-03-step-1-legacy' ||
          currentScene === 'macos-03-step-2' ||
          currentScene === 'macos-03-step-2-legacy') && (
          <div className="bg-white/95 rounded-mk-lg p-5 border border-mk-border shadow-sm max-w-md w-full text-center">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-mk-text mb-3">
              <Camera className="w-5 h-5 text-mk-primary" />
              <span>
                {currentScene.indexOf('legacy') !== -1
                  ? pl('Tryb zrzutu ekranu macOS High Sierra (⌘⇧4)')
                  : pl('Pasek zrzutu ekranu macOS (⌘⇧5)')}
              </span>
            </div>
            {currentScene.indexOf('step-1') !== -1 ? (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight px-5 py-2.5 rounded-mk bg-mk-primary text-white font-semibold text-sm"
              >
                {currentScene.indexOf('legacy') !== -1
                  ? pl('Włącz celownik ⌘⇧4')
                  : pl('Wywołaj pasek ⌘⇧5')}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight px-5 py-2.5 rounded-mk bg-mk-primary text-white font-semibold text-sm"
              >
                {currentScene.indexOf('legacy') !== -1
                  ? pl('Zaznacz fragment i zrób zdjęcie')
                  : pl('Przechwyć zrzut ekranu')}
              </button>
            )}
          </div>
        )}

        {/* Okno Findera (Misja 1, Misja 2, Misja 5) */}
        {(currentScene === 'macos-01-step-3' ||
          currentScene.indexOf('macos-02-') === 0 ||
          currentScene.indexOf('macos-05-') === 0) && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-sm w-full max-w-lg overflow-hidden text-left">
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={currentScene === 'macos-01-step-3' ? handleCorrectClick : undefined}
                  data-testid={currentScene === 'macos-01-step-3' ? 'simulator-target' : undefined}
                  aria-label={pl('Zamknij okno (czerwona kropka)')}
                  className={`w-3.5 h-3.5 rounded-full bg-red-500 ${
                    currentScene === 'macos-01-step-3' ? 'mk-sim-highlight ring-4 ring-red-300' : ''
                  }`}
                />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400 inline-block" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 text-xs font-semibold text-slate-700">Finder</span>
              </div>
              {currentScene === 'macos-05-step-2' && (
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight flex items-center gap-1 px-2.5 py-1 rounded bg-white text-xs font-semibold text-mk-primary"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{pl('Nowy folder')}</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 min-h-[160px] text-xs">
              <div className="col-span-1 bg-slate-50 border-r border-slate-200 p-2.5 flex flex-col gap-1.5">
                <div className="px-2 py-1 text-slate-500 font-semibold uppercase text-[10px]">
                  {pl('Ulubione')}
                </div>
                <div className="px-2 py-1 rounded text-slate-700">{pl('Ostatnie')}</div>
                <div className="px-2 py-1 rounded text-slate-700">{pl('Biurko')}</div>
                <button
                  type="button"
                  onClick={currentScene === 'macos-05-step-1' ? handleCorrectClick : undefined}
                  data-testid={currentScene === 'macos-05-step-1' ? 'simulator-target' : undefined}
                  className={`px-2 py-1.5 rounded text-left flex items-center gap-1.5 font-medium ${
                    currentScene === 'macos-05-step-1'
                      ? 'mk-sim-highlight bg-white text-mk-primary font-bold'
                      : 'text-slate-700'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>{pl('Dokumenty')}</span>
                </button>
                <button
                  type="button"
                  onClick={currentScene === 'macos-02-step-2' ? handleCorrectClick : undefined}
                  data-testid={currentScene === 'macos-02-step-2' ? 'simulator-target' : undefined}
                  className={`px-2 py-1.5 rounded text-left flex items-center gap-1.5 font-medium ${
                    currentScene === 'macos-02-step-2'
                      ? 'mk-sim-highlight bg-white text-mk-primary font-bold'
                      : currentScene === 'macos-02-step-3'
                        ? 'bg-slate-200 font-semibold text-slate-900'
                        : 'text-slate-700'
                  }`}
                >
                  <Folder className="w-3.5 h-3.5" />
                  <span>{pl('Pobrane')}</span>
                </button>
              </div>
              <div className="col-span-2 p-3 flex flex-col gap-2">
                {currentScene === 'macos-02-step-3' && (
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    data-testid="simulator-target"
                    className="mk-sim-highlight flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 text-slate-900 font-semibold"
                  >
                    <FileText className="w-4 h-4 text-mk-primary" />
                    <span>Faktura-prad.pdf</span>
                  </button>
                )}
                {currentScene === 'macos-05-step-3' && (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 p-2 rounded border border-slate-200 bg-slate-50">
                      <Folder className="w-4 h-4 text-mk-primary" />
                      <span className="font-semibold">{pl('Rachunki')}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCorrectClick}
                      data-testid="simulator-target"
                      className="mk-sim-highlight flex items-center justify-between p-2.5 rounded-lg bg-amber-50 text-slate-900 font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-mk-primary" />
                        <span>Rachunek-gaz.pdf</span>
                      </span>
                      <span className="text-[11px] text-mk-primary underline">
                        {pl('Przenieś do teczki „Rachunki” →')}
                      </span>
                    </button>
                  </div>
                )}
                {currentScene !== 'macos-02-step-3' && currentScene !== 'macos-05-step-3' && (
                  <div className="text-slate-500 py-6 text-center">
                    {pl('Wybierz podświetlony element w oknie Findera lub na pasku Dock.')}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Spotlight (Misja 4 krok 2 i 3) */}
        {(currentScene === 'macos-04-step-2' || currentScene === 'macos-04-step-3') && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-md w-full max-w-md p-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
              <Search className="w-5 h-5 text-mk-primary" />
              {currentScene === 'macos-04-step-2' ? (
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight flex-1 text-left px-3 py-1.5 rounded bg-amber-50 text-sm font-semibold text-slate-900"
                >
                  {pl('Kliknij tutaj, aby wpisać: „sernik”')}
                </button>
              ) : (
                <span className="text-sm font-semibold text-slate-900">sernik</span>
              )}
            </div>
            {currentScene === 'macos-04-step-3' && (
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-50 text-left text-sm font-semibold text-slate-900"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-mk-primary" />
                    <span>Przepis-na-sernik.pdf</span>
                  </span>
                  <span className="text-xs text-mk-primary">{pl('Otwórz (Enter)')}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Skróty klawiszowe i Szybki podgląd spacją (Misja 6) */}
        {currentScene.indexOf('macos-06-') === 0 && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-sm w-full max-w-md p-4 text-left">
            <div className="text-xs font-semibold text-slate-500 mb-3">
              {pl('Ćwiczenie skrótów klawiszowych Maca')}
            </div>
            {currentScene === 'macos-06-step-1' && (
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-xs font-mono text-slate-800">PL 42 1020 5558 1111 0000</span>
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight flex items-center gap-1.5 px-3 py-1.5 rounded bg-mk-primary text-white text-xs font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{pl('Kopiuj (⌘C)')}</span>
                </button>
              </div>
            )}
            {currentScene === 'macos-06-step-2' && (
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-500">{pl('Pole numeru konta w przelewie:')}</span>
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight flex items-center gap-1.5 px-3 py-1.5 rounded bg-mk-primary text-white text-xs font-semibold"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" />
                  <span>{pl('Wklej ze schowka (⌘V)')}</span>
                </button>
              </div>
            )}
            {currentScene === 'macos-06-step-3' && (
              <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <FileText className="w-4 h-4 text-mk-primary" />
                  <span>Umowa.pdf</span>
                </span>
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight flex items-center gap-1.5 px-3 py-1.5 rounded bg-mk-primary text-white text-xs font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{pl('Podgląd spacją')}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mission Control i przełączanie okien (Misja 7) */}
        {currentScene.indexOf('macos-07-') === 0 && (
          <div className="bg-white/95 rounded-mk-lg border border-mk-border shadow-sm w-full max-w-lg p-4 text-center">
            {currentScene === 'macos-07-step-1' && (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight inline-flex items-center gap-2 px-5 py-2.5 rounded-mk bg-mk-primary text-white text-sm font-semibold"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>{pl('Pokaż wszystkie okna – Mission Control (F3)')}</span>
              </button>
            )}
            {currentScene === 'macos-07-step-2' && (
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded border border-slate-200 bg-slate-50 opacity-75 text-xs">
                  <div className="font-semibold mb-1">Safari – Wiadomości</div>
                  <div className="text-slate-500">{pl('Okno przeglądarki')}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight p-3 rounded bg-amber-50 text-left text-xs font-semibold text-slate-900"
                >
                  <div className="text-mk-primary mb-1">Lista-zakupow.pdf</div>
                  <div className="text-slate-600">{pl('Kliknij, aby wyciągnąć na wierzch')}</div>
                </button>
              </div>
            )}
            {currentScene === 'macos-07-step-3' && (
              <div className="text-xs text-slate-700 py-4">
                {pl('Teraz kliknij podświetloną ikonę Safari w pasku Dock na samym dole ekranu.')}
              </div>
            )}
          </div>
        )}

        {/* Ustawienia systemowe / Preferencje systemowe oraz Aktualizacje (Misja 8 i Misja 9) */}
        {(currentScene.indexOf('macos-08-step-2') === 0 ||
          currentScene.indexOf('macos-08-step-3') === 0 ||
          currentScene.indexOf('macos-09-step-2') === 0 ||
          currentScene === 'macos-09-step-3') && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-sm w-full max-w-lg overflow-hidden text-left">
            <div className="px-3.5 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>
                {isClassic || currentScene.indexOf('classic') !== -1
                  ? pl('Preferencje systemowe (układ klasyczny – siatka ikon)')
                  : pl('Ustawienia systemowe (układ z listą boczną)')}
              </span>
            </div>

            {isClassic || currentScene.indexOf('classic') !== -1 ? (
              /* Motyw 'classic': Siatka ikon Preferencji systemowych (macOS <= 12) */
              <div className="p-4 grid grid-cols-3 gap-3 text-xs">
                <button
                  type="button"
                  onClick={
                    currentScene.indexOf('macos-08-step-2') === 0 ? handleCorrectClick : undefined
                  }
                  data-testid={
                    currentScene.indexOf('macos-08-step-2') === 0 ? 'simulator-target' : undefined
                  }
                  className={`p-3 rounded-lg border flex flex-col items-center gap-1.5 ${
                    currentScene.indexOf('macos-08-step-2') === 0
                      ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Wifi className="w-5 h-5 text-mk-primary" />
                  <span>{pl('Sieć (Wi-Fi)')}</span>
                </button>

                <button
                  type="button"
                  onClick={
                    currentScene.indexOf('macos-08-step-3') === 0 ? handleCorrectClick : undefined
                  }
                  data-testid={
                    currentScene.indexOf('macos-08-step-3') === 0 ? 'simulator-target' : undefined
                  }
                  className={`p-3 rounded-lg border flex flex-col items-center gap-1.5 ${
                    currentScene.indexOf('macos-08-step-3') === 0
                      ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <Volume2 className="w-5 h-5 text-mk-primary" />
                  <span>{pl('Dźwięk')}</span>
                </button>

                <button
                  type="button"
                  onClick={
                    currentScene.indexOf('macos-09-step-2') === 0 ||
                    currentScene === 'macos-09-step-3'
                      ? handleCorrectClick
                      : undefined
                  }
                  data-testid={
                    currentScene.indexOf('macos-09-step-2') === 0 ||
                    currentScene === 'macos-09-step-3'
                      ? 'simulator-target'
                      : undefined
                  }
                  className={`p-3 rounded-lg border flex flex-col items-center gap-1.5 ${
                    currentScene.indexOf('macos-09-step-2') === 0 ||
                    currentScene === 'macos-09-step-3'
                      ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-900'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <RefreshCw className="w-5 h-5 text-mk-primary" />
                  <span>{pl('Uaktualnienia')}</span>
                </button>
              </div>
            ) : (
              /* Motyw 'modern': Lista z boku w Ustawieniach systemowych (macOS >= 13) */
              <div className="grid grid-cols-3 min-h-[150px] text-xs">
                <div className="col-span-1 bg-slate-50 border-r border-slate-200 p-2.5 flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={
                      currentScene.indexOf('macos-08-step-2') === 0 ? handleCorrectClick : undefined
                    }
                    data-testid={
                      currentScene.indexOf('macos-08-step-2') === 0 ? 'simulator-target' : undefined
                    }
                    className={`px-2.5 py-1.5 rounded text-left flex items-center gap-2 ${
                      currentScene.indexOf('macos-08-step-2') === 0
                        ? 'mk-sim-highlight bg-white font-bold text-mk-primary'
                        : 'text-slate-700'
                    }`}
                  >
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Wi-Fi</span>
                  </button>
                  <div className="px-2.5 py-1.5 rounded text-slate-600 flex items-center gap-2">
                    <Bluetooth className="w-3.5 h-3.5" />
                    <span>Bluetooth</span>
                  </div>
                  <button
                    type="button"
                    onClick={
                      currentScene.indexOf('macos-08-step-3') === 0 ? handleCorrectClick : undefined
                    }
                    data-testid={
                      currentScene.indexOf('macos-08-step-3') === 0 ? 'simulator-target' : undefined
                    }
                    className={`px-2.5 py-1.5 rounded text-left flex items-center gap-2 ${
                      currentScene.indexOf('macos-08-step-3') === 0
                        ? 'mk-sim-highlight bg-white font-bold text-mk-primary'
                        : 'text-slate-700'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{pl('Dźwięk')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={
                      currentScene.indexOf('macos-09-step-2') === 0 ? handleCorrectClick : undefined
                    }
                    data-testid={
                      currentScene.indexOf('macos-09-step-2') === 0 ? 'simulator-target' : undefined
                    }
                    className={`px-2.5 py-1.5 rounded text-left flex items-center gap-2 ${
                      currentScene.indexOf('macos-09-step-2') === 0
                        ? 'mk-sim-highlight bg-white font-bold text-mk-primary'
                        : 'text-slate-700'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>{pl('Ogólne → Uaktualnienia')}</span>
                  </button>
                </div>
                <div className="col-span-2 p-4 flex flex-col justify-center items-start">
                  {currentScene === 'macos-09-step-3' ? (
                    <button
                      type="button"
                      onClick={handleCorrectClick}
                      data-testid="simulator-target"
                      className="mk-sim-highlight px-4 py-2 rounded-lg bg-emerald-50 text-emerald-900 font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>{pl('macOS jest aktualny – potwierdź')}</span>
                    </button>
                  ) : (
                    <span className="text-slate-600">
                      {pl('Kliknij podświetloną kategorię na pasku po lewej stronie.')}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Kosz i odzyskiwanie (Misja 10 krok 2 i 3) */}
        {(currentScene === 'macos-10-step-2' || currentScene === 'macos-10-step-3') && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-sm w-full max-w-md p-4 text-left">
            <div className="text-xs font-semibold text-slate-600 pb-2 mb-3 border-b border-slate-200 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-mk-primary" />
              <span>{pl('Kosz – usunięte pliki')}</span>
            </div>
            {currentScene === 'macos-10-step-2' ? (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight w-full flex items-center justify-between p-2.5 rounded bg-amber-50 text-xs font-semibold text-slate-900"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-mk-primary" />
                  <span>Wazna-umowa.pdf</span>
                </span>
                <span className="text-mk-primary">{pl('Kliknij prawym przyciskiem')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight w-full flex items-center justify-between p-2.5 rounded bg-emerald-50 text-xs font-semibold text-emerald-950"
              >
                <span>{pl('Cofnij do poprzedniego miejsca')}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              </button>
            )}
          </div>
        )}

        {/* Sceny dla ścieżki Programy (Mail, Safari, Word/Pages, Zoom/Teams, Podgląd – obsługuje wszystkie 10 misji Programów) */}
        {track === 'programy' && (
          <div className="bg-white rounded-mk-lg border border-mk-border shadow-sm w-full max-w-lg p-4 text-left">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                {currentScene.indexOf('mail') !== -1 && <Mail className="w-4 h-4 text-mk-primary" />}
                {currentScene.indexOf('safari') !== -1 && <Compass className="w-4 h-4 text-mk-primary" />}
                {currentScene.indexOf('word') !== -1 && <FileText className="w-4 h-4 text-mk-primary" />}
                {currentScene.indexOf('zoom') !== -1 && <Video className="w-4 h-4 text-mk-primary" />}
                {currentScene.indexOf('podglad') !== -1 && <PenTool className="w-4 h-4 text-mk-primary" />}
                <span>{pl('Okno programu na Twoim Macu')}</span>
              </span>
            </div>
            <div className="py-3 flex flex-col items-center text-center gap-3">
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight inline-flex items-center gap-2 px-5 py-3 rounded-mk bg-mk-primary text-white text-sm font-semibold shadow-sm"
              >
                {currentScene.indexOf('mail-01') !== -1 && <Paperclip className="w-4 h-4" />}
                {currentScene.indexOf('mail-02') !== -1 && <Reply className="w-4 h-4" />}
                {currentScene.indexOf('safari-03') !== -1 && <Bookmark className="w-4 h-4" />}
                {currentScene.indexOf('safari-04') !== -1 && <KeyRound className="w-4 h-4" />}
                {currentScene.indexOf('word') !== -1 && <FileText className="w-4 h-4" />}
                {currentScene.indexOf('zoom-07') !== -1 && <MicOff className="w-4 h-4" />}
                {currentScene.indexOf('zoom-08') !== -1 && <MonitorUp className="w-4 h-4" />}
                {currentScene.indexOf('podglad-09') !== -1 && <PenTool className="w-4 h-4" />}
                {currentScene.indexOf('podglad-10') !== -1 && <RotateCw className="w-4 h-4" />}
                <span>{pl('Wykonaj podświetloną czynność w oknie programu')}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dolny pasek Dock macOS */}
      <div className="pb-2.5 pt-1 flex justify-center">
        <div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl border shadow-sm"
          style={{
            backgroundColor: isClassic ? '#E2E8F0' : '#FAF7F2',
            borderColor: 'var(--mk-border)',
          }}
        >
          {/* Ikona Findera w Docku */}
          <button
            type="button"
            onClick={
              currentScene === 'macos-01-step-1' || currentScene === 'macos-02-step-1'
                ? handleCorrectClick
                : undefined
            }
            data-testid={
              currentScene === 'macos-01-step-1' || currentScene === 'macos-02-step-1'
                ? 'simulator-target'
                : undefined
            }
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
              currentScene === 'macos-01-step-1' || currentScene === 'macos-02-step-1'
                ? 'mk-sim-highlight bg-white text-mk-primary font-bold'
                : 'text-slate-700'
            }`}
          >
            <Folder className="w-5 h-5 text-sky-600" />
            <span className="text-[10px]">Finder</span>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
          </button>

          {/* Ikona Safari w Docku */}
          <button
            type="button"
            onClick={currentScene === 'macos-07-step-3' ? handleCorrectClick : undefined}
            data-testid={currentScene === 'macos-07-step-3' ? 'simulator-target' : undefined}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
              currentScene === 'macos-07-step-3'
                ? 'mk-sim-highlight bg-white text-mk-primary font-bold'
                : 'text-slate-700'
            }`}
          >
            <Compass className="w-5 h-5 text-blue-600" />
            <span className="text-[10px]">Safari</span>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
          </button>

          {/* Ikona Mail w Docku */}
          <div className="flex flex-col items-center gap-0.5 px-2 py-1 text-slate-700">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px]">Mail</span>
            <span className="w-1 h-1 rounded-full bg-transparent" />
          </div>

          {/* Ikona Ustawienia / Preferencje w Docku */}
          <div className="flex flex-col items-center gap-0.5 px-2 py-1 text-slate-700">
            <Settings className="w-5 h-5 text-slate-600" />
            <span className="text-[10px]">
              {isClassic ? pl('Preferencje') : pl('Ustawienia')}
            </span>
            <span className="w-1 h-1 rounded-full bg-transparent" />
          </div>

          <div className="w-px h-6 bg-slate-300 mx-0.5" />

          {/* Ikona Kosza w Docku */}
          <button
            type="button"
            onClick={currentScene === 'macos-10-step-1' ? handleCorrectClick : undefined}
            data-testid={currentScene === 'macos-10-step-1' ? 'simulator-target' : undefined}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg ${
              currentScene === 'macos-10-step-1'
                ? 'mk-sim-highlight bg-white text-mk-primary font-bold'
                : 'text-slate-700'
            }`}
          >
            <Trash2 className="w-5 h-5 text-slate-600" />
            <span className="text-[10px]">Kosz</span>
            <span className="w-1 h-1 rounded-full bg-transparent" />
          </button>
        </div>
      </div>

      {/* Komunikat przy kliknięciu poza celem (bez kary, łagodna podpowiedź) */}
      {misclickNotice && (
        <div
          role="status"
          aria-live="polite"
          data-testid="simulator-misclick-notice"
          className="mx-4 mb-3 px-4 py-2 rounded-mk bg-amber-50 border border-amber-300 text-amber-950 text-xs font-medium text-center"
        >
          {misclickNotice}
        </div>
      )}

      {/* Krótkie potwierdzenie po poprawnym kliknięciu */}
      {stepConfirmed && (
        <div
          role="status"
          aria-live="polite"
          className="mx-4 mb-3 px-4 py-2 rounded-mk bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold text-center"
        >
          {pl('Świetnie! Przechodzimy dalej…')}
        </div>
      )}
    </div>
  );
}
