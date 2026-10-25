'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Wifi,
  Volume2,
  Bluetooth,
  LayoutGrid,
  CheckCircle2,
  RefreshCw,
  Copy,
  ClipboardPaste,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight,
  List,
  Columns,
  Clock,
  Cloud,
  Download,
  Monitor,
  FileText,
  Camera,
  Shield,
  Keyboard,
  Sliders,
} from 'lucide-react';
import { SimulatorTheme } from '@macknow/core';
import { TrackId } from '@macknow/missions';
import { BlackCatGuide, pl } from '@macknow/ui';
import {
  AppleMenuLogo,
  ControlCenterIcon,
  FinderDockIcon,
  LaunchpadDockIcon,
  SafariDockIcon,
  MailDockIcon,
  PhotosDockIcon,
  PreviewDockIcon,
  NotesDockIcon,
  SettingsDockIcon,
  TrashDockIcon,
  MacFolderIcon,
  MacPdfFileIcon,
  MacintoshHdIcon,
  ClassicPadlockIcon,
} from './MacOsIcons';
import { MacSimulatorProgramyAndExtraScenes } from './MacSimulatorProgramyScenes';

export interface MacSimulatorProps {
  scene: string | undefined;
  track: TrackId;
  theme: SimulatorTheme;
  onCompleteStep: () => void;
}

/**
 * Wierna, realistyczna symulacja ekranu MacBooka (1:1 z prawdziwym macOS):
 * - Obudowa ekranu MacBooka z wąską ramką, kamerą FaceTime HD i dolną listwą
 * - Autentyczna tapeta macOS Sonoma/Sequoia (motyw 'modern') oraz Mojave/Catalina (motyw 'classic')
 * - Prawdziwy górny pasek menu z logo , rozwijanym menu Apple, pogrubioną nazwą aktywnego programu,
 *   menu Plik/Edycja/Widok/Idź/Okno/Pomoc oraz ikonami statusu (Bateria 98%, Wi-Fi, Dźwięk, Spotlight, Centrum sterowania, Zegar)
 * - Ikony na Biurku (Macintosh HD, teczka, miniatura zrzutu ekranu)
 * - Realistyczne okna Findera, Ustawień systemowych (pasek boczny z Apple ID), Preferencji systemowych (siatka ikon),
 *   Spotlight, paska zrzutu ekranu (⌘⇧5), Mission Control (F3), Kosza z menu kontekstowym oraz programów (Mail, Safari, Word, Zoom, Podgląd, iPhone, AI)
 * - Dolny pasek Dock z wiernymi ikonami macOS (uśmiechnięta twarz Findera, Launchpad, kompas Safari, koperta Mail,
 *   tęczowy kwiatek Zdjęć, Podgląd z lupą, Notatki, koła zębate Ustawień i metalowy Kosz).
 */
export function MacSimulator({
  scene,
  track: _track,
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
    setMisclickNotice(pl('Nie tutaj – spójrz na podświetlone miejsce na ekranie MacBooka.'));
  };

  const currentScene = scene || 'macos-01-step-1';
  const isClassic = theme === 'classic' || currentScene.indexOf('classic') !== -1;

  // Wyznaczamy nazwę aktywnego programu na górnym pasku menu obok jabłuszka 
  const getActiveAppName = (): string => {
    if (currentScene.indexOf('programy-mail') === 0) return 'Mail';
    if (currentScene.indexOf('programy-safari') === 0 || currentScene.indexOf('ai-02') === 0 || currentScene.indexOf('ai-03') === 0 || currentScene.indexOf('ai-04') === 0 || currentScene.indexOf('ai-05') === 0 || currentScene.indexOf('ai-06') === 0) return 'Safari';
    if (currentScene.indexOf('programy-word') === 0) return 'Word';
    if (currentScene.indexOf('programy-zoom') === 0) return 'Zoom';
    if (currentScene.indexOf('programy-podglad') === 0) return 'Podgląd';
    if (currentScene.indexOf('macos-08-step-2') === 0 || currentScene.indexOf('macos-08-step-3') === 0 || currentScene.indexOf('macos-09-step-2') === 0 || currentScene === 'macos-09-step-3') {
      return isClassic ? 'Preferencje systemowe' : 'Ustawienia systemowe';
    }
    if (currentScene.indexOf('iphone-02') === 0) return 'Zdjęcia';
    if (currentScene.indexOf('iphone-04') === 0 || currentScene.indexOf('ai-01') === 0) return 'Notatki';
    return 'Finder';
  };

  const activeAppName = getActiveAppName();
  const isAppleMenuStep =
    currentScene.indexOf('macos-08-step-1') === 0 ||
    currentScene === 'macos-09-step-1' ||
    currentScene === 'macos-09-step-1-classic';

  const isFinderWindowScene =
    currentScene === 'macos-01-step-1' ||
    currentScene === 'macos-01-step-2' ||
    currentScene === 'macos-01-step-3' ||
    currentScene.indexOf('macos-02-') === 0 ||
    currentScene.indexOf('macos-05-') === 0;

  const isScreenshotHudScene =
    currentScene === 'macos-03-step-1' ||
    currentScene === 'macos-03-step-1-legacy' ||
    currentScene === 'macos-03-step-2' ||
    currentScene === 'macos-03-step-2-legacy';

  const isSettingsWindowScene =
    currentScene.indexOf('macos-08-step-2') === 0 ||
    currentScene.indexOf('macos-08-step-3') === 0 ||
    currentScene.indexOf('macos-09-step-2') === 0 ||
    currentScene === 'macos-09-step-3';

  return (
    <div
      onClick={handleWrongClick}
      data-testid="mac-simulator"
      data-simulator-theme={theme}
      className="relative w-full rounded-[22px] bg-[#141417] p-2.5 sm:p-3.5 shadow-2xl border-2 border-[#3A3A42] select-none"
    >
      {/* Górna ramka ekranu MacBooka z kamerą FaceTime HD */}
      <div className="flex items-center justify-center pb-1.5">
        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/70 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#1E293B] border border-slate-600 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Kamera FaceTime HD" />
        </div>
      </div>

      {/* Właściwy ekran macOS (proporcje 16:10) */}
      <div className="relative w-full rounded-[12px] overflow-hidden border border-black/60 flex flex-col justify-between min-h-[470px]">
        {/* Autentyczna wielowarstwowa tapeta macOS (Sonoma/Sequoia vs Catalina/Mojave) */}
        <svg
          viewBox="0 0 1200 750"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="modernSky" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="38%" stopColor="#3B82F6" />
              <stop offset="72%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#FDE047" />
            </linearGradient>
            <linearGradient id="classicSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="45%" stopColor="#1E3A8A" />
              <stop offset="80%" stopColor="#7C2D12" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="1200" height="750" fill={isClassic ? 'url(#classicSky)' : 'url(#modernSky)'} />
          {isClassic ? (
            /* Tapeta macOS Catalina / Mojave – wyspa i wydmy o zmierzchu */
            <g>
              <path d="M0 490 Q320 390 640 460 T1200 420 L1200 750 L0 750 Z" fill="#312E81" opacity="0.8" />
              <path d="M0 540 Q420 450 820 530 T1200 490 L1200 750 L0 750 Z" fill="#1E1B4B" opacity="0.9" />
              <path d="M0 610 Q550 530 1200 600 L1200 750 L0 750 Z" fill="#0F172A" />
            </g>
          ) : (
            /* Tapeta macOS Sonoma / Sequoia – falujące pasma gór i horyzontu */
            <g>
              <path d="M0 390 C300 280, 620 470, 1200 310 L1200 750 L0 750 Z" fill="#EC4899" opacity="0.45" />
              <path d="M0 450 C380 350, 740 520, 1200 390 L1200 750 L0 750 Z" fill="#6366F1" opacity="0.65" />
              <path d="M0 530 C420 440, 810 580, 1200 480 L1200 750 L0 750 Z" fill="#0F172A" opacity="0.82" />
              <path d="M0 610 C480 560, 880 640, 1200 570 L1200 750 L0 750 Z" fill="#090D16" opacity="0.9" />
            </g>
          )}
        </svg>

        {/* ==================== 1. GÓRNY PASEK MENU MACOS ==================== */}
        <div
          className="relative z-30 h-7 px-3 flex items-center justify-between text-[12px] border-b"
          style={{
            backgroundColor: isClassic ? 'rgba(241, 245, 249, 0.94)' : 'rgba(255, 255, 255, 0.88)',
            borderColor: 'rgba(0, 0, 0, 0.14)',
            color: '#0F172A',
          }}
        >
          {/* Lewa strona paska menu: , Aktywny Program, Plik, Edycja, Widok, Idź, Okno, Pomoc */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={isAppleMenuStep ? handleCorrectClick : undefined}
                data-testid={isAppleMenuStep ? 'simulator-target' : undefined}
                aria-label={
                  isClassic
                    ? pl('Menu Apple – Preferencje systemowe')
                    : pl('Menu Apple – Ustawienia systemowe')
                }
                className={`px-2 py-0.5 rounded flex items-center gap-1.5 transition-colors ${
                  isAppleMenuStep
                    ? 'mk-sim-highlight bg-blue-600 text-white font-bold'
                    : 'hover:bg-black/10 text-slate-900'
                }`}
              >
                <AppleMenuLogo className="w-3.5 h-3.5" />
                {isAppleMenuStep && (
                  <span className="text-[11px]">
                    {isClassic ? pl('Preferencje systemowe…') : pl('Ustawienia systemowe…')}
                  </span>
                )}
              </button>

              {/* Rozwinięte prawdziwe menu  podczas kroków otwierania Ustawień / Preferencji */}
              {isAppleMenuStep && (
                <div className="absolute left-0 top-7 w-60 rounded-xl bg-white/95 shadow-2xl border border-slate-300 py-1.5 text-[12px] text-slate-800 z-40">
                  <div className="px-3 py-1 text-slate-700">{pl('Ten Mac')}</div>
                  <div className="my-1 border-t border-slate-200" />
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    className="w-full px-3 py-1.5 bg-blue-600 text-white font-bold text-left flex items-center justify-between"
                  >
                    <span>
                      {isClassic ? pl('Preferencje systemowe…') : pl('Ustawienia systemowe…')}
                    </span>
                    <span className="px-1.5 py-0.2 rounded-full bg-white/25 text-[10px]">1</span>
                  </button>
                  <div className="px-3 py-1 text-slate-700">App Store…</div>
                  <div className="my-1 border-t border-slate-200" />
                  <div className="px-3 py-1 text-slate-700 flex justify-between">
                    <span>{pl('Ostatnie rzeczy')}</span>
                    <span>▸</span>
                  </div>
                  <div className="my-1 border-t border-slate-200" />
                  <div className="px-3 py-1 text-slate-700 flex justify-between">
                    <span>{pl('Wymuś koniec…')}</span>
                    <span className="text-slate-400 text-[10px]">⌥⌘⎋</span>
                  </div>
                  <div className="my-1 border-t border-slate-200" />
                  <div className="px-3 py-1 text-slate-700">{pl('Uśpij')}</div>
                  <div className="px-3 py-1 text-slate-700">{pl('Uruchom ponownie…')}</div>
                  <div className="px-3 py-1 text-slate-700">{pl('Wyłącz…')}</div>
                  <div className="my-1 border-t border-slate-200" />
                  <div className="px-3 py-1 text-slate-700">{pl('Zablokuj ekran')}</div>
                </div>
              )}
            </div>

            {/* Nazwa aktywnego programu (pogrubiona, jak w prawdziwym macOS) */}
            <button
              type="button"
              onClick={currentScene === 'macos-01-step-2' ? handleCorrectClick : undefined}
              data-testid={currentScene === 'macos-01-step-2' ? 'simulator-target' : undefined}
              className={`px-2 py-0.5 rounded font-bold tracking-tight ${
                currentScene === 'macos-01-step-2'
                  ? 'mk-sim-highlight bg-amber-400 text-slate-950'
                  : 'text-slate-900'
              }`}
            >
              {activeAppName}
            </button>

            <span className="hidden sm:inline text-slate-700 font-medium">{pl('Plik')}</span>
            <span className="hidden sm:inline text-slate-700 font-medium">{pl('Edycja')}</span>
            <span className="hidden sm:inline text-slate-700 font-medium">{pl('Widok')}</span>
            <span className="hidden md:inline text-slate-700 font-medium">{pl('Idź')}</span>
            <span className="hidden md:inline text-slate-700 font-medium">{pl('Okno')}</span>
            <span className="hidden lg:inline text-slate-700 font-medium">{pl('Pomoc')}</span>
          </div>

          {/* Prawa strona paska menu: Bateria, Wi-Fi, Dźwięk, Spotlight (Lupka), Centrum sterowania, Zegar */}
          <div className="flex items-center gap-2.5 text-slate-800">
            <div className="hidden md:flex items-center gap-1 text-[11px] font-medium">
              <span>98%</span>
              <span className="inline-flex items-center w-5 h-2.5 rounded-[3px] border border-slate-700 p-[1px]">
                <span className="w-full h-full bg-slate-800 rounded-[1px]" />
              </span>
            </div>
            <Wifi className="w-3.5 h-3.5" />
            <Volume2 className="w-3.5 h-3.5 hidden sm:inline" />
            <button
              type="button"
              onClick={currentScene === 'macos-04-step-1' ? handleCorrectClick : undefined}
              data-testid={currentScene === 'macos-04-step-1' ? 'simulator-target' : undefined}
              aria-label={pl('Szukaj w Spotlight (⌘Spacja)')}
              className={`px-1.5 py-0.5 rounded flex items-center gap-1 ${
                currentScene === 'macos-04-step-1'
                  ? 'mk-sim-highlight bg-amber-400 text-slate-950 font-bold'
                  : 'hover:bg-black/10'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              {currentScene === 'macos-04-step-1' && (
                <span className="text-[11px]">Spotlight</span>
              )}
            </button>
            <ControlCenterIcon className="w-3.5 h-3.5 hidden sm:inline" />
            <span className="font-semibold tracking-tight text-[11px]">
              {pl('niedz. 25 paź  12:30')}
            </span>
          </div>
        </div>

        {/* ==================== 2. OBSZAR ROBOCZY BIURKA (PULPITU) I OKIEN ==================== */}
        <div className="relative z-10 flex-1 px-4 py-4 flex items-center justify-center min-h-[360px]">
          {/* Ikony na Biurku po prawej stronie (jak na prawdziwym Macu) */}
          <div className="absolute right-3 top-3 flex flex-col items-center gap-3 z-10">
            <div className="flex flex-col items-center gap-0.5 w-20 text-center">
              <MacintoshHdIcon className="w-11 h-11 drop-shadow" />
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white bg-black/45 leading-tight">
                Macintosh HD
              </span>
            </div>

            <div className="flex flex-col items-center gap-0.5 w-20 text-center">
              <MacFolderIcon className="w-11 h-9 drop-shadow" />
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white bg-black/45 leading-tight">
                {pl('Domowe')}
              </span>
            </div>

            {/* Nowy plik zrzutu ekranu na Biurku w Misji 3 krok 3 */}
            {currentScene === 'macos-03-step-3' && (
              <button
                type="button"
                onClick={handleCorrectClick}
                data-testid="simulator-target"
                className="mk-sim-highlight flex flex-col items-center gap-1 p-2 rounded-xl bg-white/95 shadow-xl border-2 border-mk-primary w-28 text-center"
              >
                <div className="w-16 h-11 rounded border border-slate-300 bg-gradient-to-br from-sky-400 via-indigo-500 to-amber-300 p-1 flex items-end justify-end shadow-inner">
                  <span className="px-1 rounded bg-black/60 text-[8px] text-white font-mono">PNG</span>
                </div>
                <span className="text-[10px] font-bold text-slate-900 leading-tight">
                  {pl('Zrzut ekranu 2026-10-25.png')}
                </span>
              </button>
            )}
          </div>

          {/* ---------- OKNO A: AUTENTYCZNY FINDER MACOS (Misje 1, 2, 5) ---------- */}
          {isFinderWindowScene && (
            <div className="relative z-20 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-black/25 bg-white text-slate-800 text-xs">
              {/* Pasek narzędzi Findera */}
              <div className="h-11 px-3.5 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* Trzy kropki (czerwona, żółta, zielona) */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={currentScene === 'macos-01-step-3' ? handleCorrectClick : undefined}
                      data-testid={currentScene === 'macos-01-step-3' ? 'simulator-target' : undefined}
                      aria-label={pl('Zamknij okno (czerwona kropka)')}
                      className={`w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-[9px] font-bold text-black/70 ${
                        currentScene === 'macos-01-step-3' ? 'mk-sim-highlight ring-4 ring-red-400 scale-125' : ''
                      }`}
                    >
                      ×
                    </button>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-[9px] font-bold text-black/60">
                      −
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-[9px] font-bold text-black/60">
                      +
                    </span>
                  </div>

                  <div className="flex items-center gap-1 ml-1 text-slate-400">
                    <ChevronLeft className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4" />
                  </div>

                  <span className="font-bold text-slate-800 text-[13px] ml-1">
                    {currentScene === 'macos-02-step-3'
                      ? pl('Pobrane')
                      : currentScene.indexOf('macos-05-') === 0
                        ? pl('Dokumenty')
                        : pl('Biurko — Finder')}
                  </span>
                </div>

                {/* Przyciski widoku, Nowy folder i Szukaj w oknie Findera */}
                <div className="flex items-center gap-1.5">
                  <div className="hidden sm:flex items-center rounded border border-slate-300 bg-white p-0.5 text-slate-600">
                    <LayoutGrid className="w-3.5 h-3.5 mx-1" />
                    <List className="w-3.5 h-3.5 mx-1 text-blue-600" />
                    <Columns className="w-3.5 h-3.5 mx-1" />
                  </div>

                  {currentScene === 'macos-05-step-2' && (
                    <button
                      type="button"
                      onClick={handleCorrectClick}
                      data-testid="simulator-target"
                      className="mk-sim-highlight px-2.5 py-1 rounded border border-mk-primary bg-amber-50 text-mk-primary font-bold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{pl('Nowy folder (⇧⌘N)')}</span>
                    </button>
                  )}

                  <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded border border-slate-300 bg-white text-slate-400">
                    <Search className="w-3 h-3" />
                    <span>{pl('Szukaj')}</span>
                  </div>
                </div>
              </div>

              {/* Układ Findera: Lewy pasek boczny (Ulubione / iCloud / Tagi) + Prawa lista plików */}
              <div className="grid grid-cols-12 min-h-[235px]">
                <div className="col-span-4 bg-[#F1F3F6] border-r border-slate-200 p-2.5 space-y-2">
                  <div className="space-y-0.5">
                    <div className="px-2 py-0.5 text-[10px] font-bold uppercase text-slate-400">
                      {pl('Ulubione')}
                    </div>
                    <div className="px-2 py-1 rounded flex items-center gap-2 text-slate-700">
                      <Wifi className="w-3.5 h-3.5 text-blue-600" />
                      <span>AirDrop</span>
                    </div>
                    <div className="px-2 py-1 rounded flex items-center gap-2 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span>{pl('Ostatnie')}</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded flex items-center gap-2 ${
                        currentScene.indexOf('macos-01-') === 0
                          ? 'bg-slate-200/90 font-semibold text-slate-900'
                          : 'text-slate-700'
                      }`}
                    >
                      <Monitor className="w-3.5 h-3.5 text-blue-600" />
                      <span>{pl('Biurko')}</span>
                    </div>

                    {/* Dokumenty w pasku bocznym */}
                    <button
                      type="button"
                      onClick={currentScene === 'macos-05-step-1' ? handleCorrectClick : undefined}
                      data-testid={currentScene === 'macos-05-step-1' ? 'simulator-target' : undefined}
                      className={`w-full px-2 py-1.5 rounded text-left flex items-center gap-2 ${
                        currentScene === 'macos-05-step-1'
                          ? 'mk-sim-highlight bg-amber-50 text-mk-primary font-bold'
                          : currentScene === 'macos-05-step-2' || currentScene === 'macos-05-step-3'
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-slate-700 hover:bg-slate-200/60'
                      }`}
                    >
                      <FileText
                        className={`w-3.5 h-3.5 ${
                          currentScene === 'macos-05-step-2' || currentScene === 'macos-05-step-3'
                            ? 'text-white'
                            : 'text-blue-600'
                        }`}
                      />
                      <span>{pl('Dokumenty')}</span>
                    </button>

                    {/* Pobrane w pasku bocznym */}
                    <button
                      type="button"
                      onClick={currentScene === 'macos-02-step-2' ? handleCorrectClick : undefined}
                      data-testid={currentScene === 'macos-02-step-2' ? 'simulator-target' : undefined}
                      className={`w-full px-2 py-1.5 rounded text-left flex items-center gap-2 ${
                        currentScene === 'macos-02-step-2'
                          ? 'mk-sim-highlight bg-amber-50 text-mk-primary font-bold'
                          : currentScene === 'macos-02-step-3'
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'text-slate-700 hover:bg-slate-200/60'
                      }`}
                    >
                      <Download
                        className={`w-3.5 h-3.5 ${
                          currentScene === 'macos-02-step-3' ? 'text-white' : 'text-blue-600'
                        }`}
                      />
                      <span>{pl('Pobrane')}</span>
                    </button>
                  </div>

                  <div className="space-y-0.5 pt-1 border-t border-slate-200">
                    <div className="px-2 py-0.5 text-[10px] font-bold uppercase text-slate-400">
                      iCloud
                    </div>
                    <div className="px-2 py-1 rounded flex items-center gap-2 text-slate-700">
                      <Cloud className="w-3.5 h-3.5 text-sky-500" />
                      <span>iCloud Drive</span>
                    </div>
                  </div>
                </div>

                {/* Prawa strona Findera: Tabela / siatka plików i teczek */}
                <div className="col-span-8 flex flex-col justify-between bg-white">
                  <div>
                    {/* Nagłówki kolumn Findera */}
                    <div className="grid grid-cols-12 px-3 py-1.5 bg-slate-50 border-b border-slate-200 text-[10px] font-semibold text-slate-500">
                      <span className="col-span-6">{pl('Nazwa')}</span>
                      <span className="col-span-3">{pl('Data modyfikacji')}</span>
                      <span className="col-span-3 text-right">{pl('Rozmiar')}</span>
                    </div>

                    <div className="divide-y divide-slate-100 p-2 space-y-1">
                      {currentScene === 'macos-02-step-3' && (
                        <>
                          <button
                            type="button"
                            onClick={handleCorrectClick}
                            data-testid="simulator-target"
                            className="mk-sim-highlight w-full grid grid-cols-12 items-center px-2.5 py-2 rounded-lg bg-amber-50 text-slate-900 font-bold text-left"
                          >
                            <span className="col-span-6 flex items-center gap-2">
                              <MacPdfFileIcon className="w-5 h-6 shrink-0" badge="PDF" />
                              <span>Faktura-prad.pdf</span>
                            </span>
                            <span className="col-span-3 text-[11px] text-mk-primary">
                              {pl('Dzisiaj, 12:28')}
                            </span>
                            <span className="col-span-3 text-right text-[11px]">184 KB</span>
                          </button>
                          <div className="grid grid-cols-12 items-center px-2.5 py-1.5 text-slate-600">
                            <span className="col-span-6 flex items-center gap-2">
                              <MacPdfFileIcon className="w-5 h-6 shrink-0" badge="PDF" />
                              <span>Rozklad-jazdy.pdf</span>
                            </span>
                            <span className="col-span-3 text-[11px] text-slate-400">
                              {pl('Wczoraj, 18:10')}
                            </span>
                            <span className="col-span-3 text-right text-[11px] text-slate-400">
                              412 KB
                            </span>
                          </div>
                        </>
                      )}

                      {currentScene === 'macos-05-step-3' && (
                        <div className="space-y-2 p-1">
                          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-sky-50 border border-sky-200">
                            <MacFolderIcon className="w-7 h-6 shrink-0" />
                            <div>
                              <div className="font-bold text-slate-900">{pl('Rachunki')}</div>
                              <div className="text-[10px] text-slate-500">
                                {pl('Nowo utworzona teczka w Dokumentach')}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={handleCorrectClick}
                            data-testid="simulator-target"
                            className="mk-sim-highlight w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-50 text-slate-900 font-bold text-left"
                          >
                            <span className="flex items-center gap-2">
                              <MacPdfFileIcon className="w-6 h-7 shrink-0" badge="PDF" />
                              <span>Rachunek-gaz.pdf</span>
                            </span>
                            <span className="text-[11px] text-mk-primary underline">
                              {pl('Przenieś do teczki „Rachunki” →')}
                            </span>
                          </button>
                        </div>
                      )}

                      {currentScene !== 'macos-02-step-3' &&
                        currentScene !== 'macos-05-step-3' && (
                          <div className="grid grid-cols-3 gap-3 p-3">
                            <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-50 text-center">
                              <MacFolderIcon className="w-11 h-9" />
                              <span className="font-medium text-slate-700">
                                {pl('Zdjęcia rodzinne')}
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-50 text-center">
                              <MacFolderIcon className="w-11 h-9" />
                              <span className="font-medium text-slate-700">
                                {pl('Sprawy urzędowe')}
                              </span>
                            </div>
                            <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-50 text-center">
                              <MacPdfFileIcon className="w-9 h-11" badge="PDF" />
                              <span className="font-medium text-slate-700">
                                {pl('Notatki.pdf')}
                              </span>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Dolny pasek ścieżki Findera */}
                  <div className="px-3 py-1 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
                    <span>
                      Macintosh HD ▸ Użytkownicy ▸ malgorzata ▸{' '}
                      {currentScene.indexOf('macos-02-') === 0
                        ? pl('Pobrane')
                        : currentScene.indexOf('macos-05-') === 0
                          ? pl('Dokumenty')
                          : pl('Biurko')}
                    </span>
                    <span>{pl('Dostępne 142,8 GB')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------- OKNO B: PASEK ZRZUTU EKRANU MACOS (⌘⇧5 / ⌘⇧4 – Misja 3 krok 1 i 2) ---------- */}
          {isScreenshotHudScene && (
            <div className="relative z-20 w-full max-w-xl flex flex-col items-center gap-4">
              {/* Przerywana ramka zaznaczania obszaru na ekranie Maca */}
              <div className="w-full h-44 rounded-xl border-2 border-dashed border-white/90 bg-black/25 backdrop-blur-[1px] flex flex-col items-center justify-center text-white p-4 shadow-inner">
                <div className="text-xs font-mono bg-black/70 px-2.5 py-0.5 rounded mb-2">
                  {currentScene.indexOf('legacy') !== -1
                    ? pl('Celownik ⌘⇧4 — obszar: 680 × 420 px')
                    : pl('Obszar zrzutu ekranu (⌘⇧5) — 680 × 420 px')}
                </div>
                <p className="text-xs text-white/90 text-center max-w-md">
                  {pl('Przeciągnij ramkę wokół wybranego fragmentu ekranu lub użyj paska narzędzi poniżej.')}
                </p>
              </div>

              {/* Autentyczny ciemny pasek zrzutu ekranu macOS (HUD ⌘⇧5) */}
              <div className="px-4 py-2 rounded-2xl bg-[#1E1E24]/95 border border-white/25 shadow-2xl text-white flex items-center gap-3 text-xs">
                <div className="flex items-center gap-2 pr-2 border-r border-white/20">
                  <div className="p-1.5 rounded bg-white/10" title={pl('Przechwyć cały ekran')}>
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 rounded bg-white/10" title={pl('Przechwyć wybrane okno')}>
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div className="p-1.5 rounded bg-white/25 ring-1 ring-amber-400" title={pl('Przechwyć wybrany fragment')}>
                    <Camera className="w-4 h-4 text-amber-300" />
                  </div>
                </div>

                <span className="text-white/75 text-[11px] hidden sm:inline">
                  {pl('Opcje ▾')}
                </span>

                <button
                  type="button"
                  onClick={handleCorrectClick}
                  data-testid="simulator-target"
                  className="mk-sim-highlight px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs shadow"
                >
                  {currentScene.indexOf('step-1') !== -1
                    ? currentScene.indexOf('legacy') !== -1
                      ? pl('Włącz celownik ⌘⇧4')
                      : pl('Wywołaj pasek ⌘⇧5')
                    : pl('Przechwyć')}
                </button>
              </div>
            </div>
          )}

          {/* ---------- OKNO C: SPOTLIGHT (⌘Spacja – Misja 4 krok 2 i 3) ---------- */}
          {(currentScene === 'macos-04-step-2' || currentScene === 'macos-04-step-3') && (
            <div className="relative z-20 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white/95 text-slate-900">
              {/* Pasek wyszukiwania Spotlight */}
              <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                {currentScene === 'macos-04-step-2' ? (
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    data-testid="simulator-target"
                    className="mk-sim-highlight flex-1 text-left px-3 py-1.5 rounded-lg bg-amber-50 text-sm font-bold text-slate-900"
                  >
                    {pl('Wpisz w Spotlight: „sernik”')}
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-base font-semibold text-slate-900">sernik</span>
                    <span className="text-xs text-slate-400">Przepis-na-sernik.pdf</span>
                  </div>
                )}
              </div>

              {/* Dwukolumnowe wyniki Spotlight z podglądem dokumentu po prawej */}
              {currentScene === 'macos-04-step-3' && (
                <div className="grid grid-cols-12 min-h-[210px] text-xs">
                  <div className="col-span-5 bg-slate-50 border-r border-slate-200 p-2.5 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase text-slate-400 px-1.5">
                      {pl('Najlepsze trafienie')}
                    </div>
                    <button
                      type="button"
                      onClick={handleCorrectClick}
                      data-testid="simulator-target"
                      className="mk-sim-highlight w-full p-2 rounded-lg bg-blue-600 text-white font-bold text-left flex items-center gap-2"
                    >
                      <MacPdfFileIcon className="w-6 h-7 shrink-0" badge="PDF" />
                      <div className="truncate">
                        <div>Przepis-na-sernik.pdf</div>
                        <div className="text-[10px] text-blue-100">{pl('Otwórz (Enter ↵)')}</div>
                      </div>
                    </button>
                    <div className="pt-2 text-[10px] font-bold uppercase text-slate-400 px-1.5">
                      {pl('Dokumenty')}
                    </div>
                    <div className="px-2 py-1 text-slate-600 truncate">Lista-skladnikow.txt</div>
                  </div>
                  <div className="col-span-7 p-4 flex flex-col items-center justify-center text-center space-y-2 bg-white">
                    <MacPdfFileIcon className="w-12 h-14" badge="PDF" />
                    <div className="font-bold text-sm text-slate-900">Przepis-na-sernik.pdf</div>
                    <p className="text-[11px] text-slate-500">
                      {pl('Dokument PDF • 215 KB • Teczka: Dokumenty')}
                    </p>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 text-left w-full">
                      {pl('„1 kg twarogu trzykrotnie mielonego, 6 jajek, 200 g masła, skórka pomarańczowa. Piec w 170°C przez 55 minut…”')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------- OKNO D: SKRÓTY KLAWISZOWE I SZYBKI PODGLĄD SPACJĄ (Misja 6) ---------- */}
          {currentScene.indexOf('macos-06-') === 0 && (
            <div className="relative z-20 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-black/25 bg-white text-slate-800 text-xs">
              <div className="h-10 px-3.5 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  <span className="ml-2 font-bold text-slate-700">
                    {currentScene === 'macos-06-step-3'
                      ? pl('Finder — Szybki podgląd dokumentu (klawisz Spacja)')
                      : pl('Schowek macOS — Kopiuj (⌘C) i Wklej (⌘V)')}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                {currentScene === 'macos-06-step-1' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-slate-500 font-medium">
                      {pl('Faktura za prąd — zaznaczony numer rachunku bankowego:')}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <span className="font-mono text-sm font-bold text-blue-950 bg-blue-200/70 px-2 py-1 rounded">
                        PL 42 1020 5558 1111 0000 9999
                      </span>
                      <button
                        type="button"
                        onClick={handleCorrectClick}
                        data-testid="simulator-target"
                        className="mk-sim-highlight flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{pl('Skopiuj do schowka (⌘C)')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentScene === 'macos-06-step-2' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="text-slate-500 font-medium">
                      {pl('Okno przelewu w banku — pole odbiorcy:')}
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-white border-2 border-blue-500">
                      <span className="text-slate-400 italic">
                        {pl('Kliknij tutaj, aby wkleić skopiowany numer konta…')}
                      </span>
                      <button
                        type="button"
                        onClick={handleCorrectClick}
                        data-testid="simulator-target"
                        className="mk-sim-highlight flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white font-bold"
                      >
                        <ClipboardPaste className="w-4 h-4" />
                        <span>{pl('Wklej ze schowka (⌘V)')}</span>
                      </button>
                    </div>
                  </div>
                )}

                {currentScene === 'macos-06-step-3' && (
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center gap-2">
                      <MacPdfFileIcon className="w-12 h-14" badge="PDF" />
                      <div className="font-bold text-slate-900">Umowa.pdf</div>
                      <button
                        type="button"
                        onClick={handleCorrectClick}
                        data-testid="simulator-target"
                        className="mk-sim-highlight w-full py-2 px-3 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>{pl('Naciśnij Spację (Szybki podgląd)')}</span>
                      </button>
                    </div>
                    <div className="col-span-7 p-4 rounded-xl bg-white border-2 border-slate-300 shadow-lg space-y-2">
                      <div className="text-[10px] font-bold uppercase text-slate-400 flex justify-between">
                        <span>{pl('Okienko Szybkiego podglądu (Quick Look)')}</span>
                        <span>{pl('Otwórz w Podglądzie')}</span>
                      </div>
                      <div className="font-bold text-slate-900">{pl('Umowa o świadczenie usług')}</div>
                      <p className="text-slate-600 leading-relaxed">
                        {pl('Widzisz pełną treść dokumentu w ułamku sekundy po naciśnięciu długiego klawisza Spacji, bez czekania na uruchomienie ciężkiego programu.')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------- OKNO E: MISSION CONTROL (F3 – Misja 7) ---------- */}
          {currentScene.indexOf('macos-07-') === 0 && (
            <div className="relative z-20 w-full max-w-2xl space-y-3">
              {/* Górny pasek Biurek w Mission Control */}
              <div className="mx-auto max-w-md px-4 py-1.5 rounded-xl bg-black/55 backdrop-blur-sm border border-white/20 flex items-center justify-between text-white text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-white/25 font-bold">Biurko 1</span>
                  <span className="px-2.5 py-0.5 rounded bg-white/10 text-white/75">Biurko 2</span>
                </div>
                <span className="font-semibold text-amber-300">Mission Control (F3)</span>
              </div>

              {currentScene === 'macos-07-step-1' && (
                <div className="bg-white/95 rounded-xl p-6 shadow-2xl border border-white/40 text-center space-y-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {pl('Na ekranie otwarte są trzy nakładające się na siebie okna. Rozsuń je jednym ruchem:')}
                  </p>
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    data-testid="simulator-target"
                    className="mk-sim-highlight inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-lg"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span>{pl('Pokaż wszystkie okna – Mission Control (klawisz F3)')}</span>
                  </button>
                </div>
              )}

              {currentScene === 'macos-07-step-2' && (
                <div className="grid grid-cols-2 gap-4">
                  {/* Miniatura okna 1: Safari */}
                  <div className="rounded-xl bg-white/95 p-3 shadow-xl border border-slate-300 text-xs text-slate-700">
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-200 font-bold">
                      <SafariDockIcon className="w-5 h-5" />
                      <span>Safari — Portal wiadomości</span>
                    </div>
                    <div className="h-20 rounded bg-slate-100 p-2 text-[11px] text-slate-500">
                      {pl('Otwarte okno przeglądarki internetowej')}
                    </div>
                  </div>

                  {/* Miniatura okna 2: Szukany dokument Lista-zakupow.pdf */}
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    data-testid="simulator-target"
                    className="mk-sim-highlight rounded-xl bg-amber-50 p-3 shadow-2xl border-2 border-mk-primary text-left text-xs text-slate-900"
                  >
                    <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-amber-200 font-bold text-mk-primary">
                      <PreviewDockIcon className="w-5 h-5" />
                      <span>Podgląd — Lista-zakupow.pdf</span>
                    </div>
                    <div className="h-20 rounded bg-white p-2 text-[11px] font-semibold text-slate-800">
                      {pl('Tu się schowało Twoje okno! Kliknij je, aby przywołać je na sam wierzch.')}
                    </div>
                  </button>
                </div>
              )}

              {currentScene === 'macos-07-step-3' && (
                <div className="bg-white/95 rounded-xl p-5 shadow-xl border border-white/40 text-center text-sm font-semibold text-slate-800">
                  {pl('Świetnie! Teraz spójrz na sam dół ekranu MacBooka i kliknij podświetloną ikonę kompasu Safari w pasku Dock.')}
                </div>
              )}
            </div>
          )}

          {/* ---------- OKNO F: USTAWIENIA SYSTEMOWE (modern >=13) ORAZ PREFERENCJE SYSTEMOWE (classic <=12) (Misje 8 i 9) ---------- */}
          {isSettingsWindowScene && (
            <div className="relative z-20 w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border border-black/25 bg-white text-slate-800 text-xs">
              {isClassic ? (
                /* ===== UKŁAD KLASYCZNY (macOS High Sierra / Mojave / Catalina / Monterey): SIATKA IKON PREFERENCJI SYSTEMOWYCH ===== */
                <div>
                  <div className="h-11 px-3.5 bg-gradient-to-b from-[#F1F5F9] to-[#E2E8F0] border-b border-slate-300 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded border border-slate-300 bg-white text-slate-600 text-[11px]">
                        <LayoutGrid className="w-3 h-3" />
                        <span>{pl('Pokaż wszystko')}</span>
                      </div>
                      <span className="font-bold text-slate-800 ml-1">
                        {pl('Preferencje systemowe')}
                      </span>
                    </div>
                    <div className="px-2.5 py-1 rounded border border-slate-300 bg-white text-slate-400 flex items-center gap-1">
                      <Search className="w-3 h-3" />
                      <span>{pl('Szukaj')}</span>
                    </div>
                  </div>

                  {/* Siatka ikon Preferencji systemowych jak w macOS Mojave / Catalina */}
                  <div className="p-4 bg-[#ECEFF4] grid grid-cols-4 sm:grid-cols-5 gap-3 text-center">
                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-600">
                      <SettingsDockIcon className="w-9 h-9" />
                      <span className="text-[11px] font-medium">{pl('Ogólne')}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-600">
                      <Monitor className="w-9 h-9 text-sky-600 bg-white p-1.5 rounded-full shadow-sm" />
                      <span className="text-[11px] font-medium">{pl('Biurko i Dock')}</span>
                    </div>

                    {/* Sieć (Wi-Fi) – cel dla macos-08-step-2 */}
                    <button
                      type="button"
                      onClick={
                        currentScene.indexOf('macos-08-step-2') === 0
                          ? handleCorrectClick
                          : undefined
                      }
                      data-testid={
                        currentScene.indexOf('macos-08-step-2') === 0
                          ? 'simulator-target'
                          : undefined
                      }
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                        currentScene.indexOf('macos-08-step-2') === 0
                          ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-950 shadow-md'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-sky-400 to-blue-600 text-white flex items-center justify-center shadow">
                        <Wifi className="w-5 h-5" />
                      </div>
                      <span className="text-[11px]">{pl('Sieć (Wi-Fi)')}</span>
                    </button>

                    {/* Dźwięk – cel dla macos-08-step-3 */}
                    <button
                      type="button"
                      onClick={
                        currentScene.indexOf('macos-08-step-3') === 0
                          ? handleCorrectClick
                          : undefined
                      }
                      data-testid={
                        currentScene.indexOf('macos-08-step-3') === 0
                          ? 'simulator-target'
                          : undefined
                      }
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                        currentScene.indexOf('macos-08-step-3') === 0
                          ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-950 shadow-md'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-slate-200 to-slate-400 text-slate-800 flex items-center justify-center shadow">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <span className="text-[11px]">{pl('Dźwięk')}</span>
                    </button>

                    {/* Uaktualnienia oprogramowania – cel dla macos-09-step-2 i 3 */}
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
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl ${
                        currentScene.indexOf('macos-09-step-2') === 0 ||
                        currentScene === 'macos-09-step-3'
                          ? 'mk-sim-highlight bg-amber-50 font-bold text-slate-950 shadow-md'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 text-blue-600 flex items-center justify-center shadow">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <span className="text-[11px]">{pl('Uaktualnienia')}</span>
                    </button>

                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-600">
                      <ClassicPadlockIcon className="w-9 h-9" />
                      <span className="text-[11px] font-medium">{pl('Ochrona i prywatność')}</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-600">
                      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                        <Bluetooth className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium">Bluetooth</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 p-2 rounded-lg text-slate-600">
                      <div className="w-9 h-9 rounded-full bg-white text-slate-700 flex items-center justify-center shadow">
                        <Keyboard className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium">{pl('Klawiatura')}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* ===== UKŁAD NOWOCZESNY (macOS Ventura / Sonoma / Sequoia): PASEK BOCZNY USTAWIEŃ SYSTEMOWYCH ===== */
                <div className="grid grid-cols-12 min-h-[250px]">
                  {/* Lewa lista boczna Ustawień systemowych z kartą Apple ID Małgorzaty */}
                  <div className="col-span-5 bg-[#F2F2F7] border-r border-slate-200 p-2.5 space-y-2">
                    <div className="flex items-center gap-2 px-1">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>

                    {/* Karta profilu Apple ID Małgorzaty */}
                    <div className="flex items-center gap-2.5 p-2 rounded-lg bg-white/80 border border-slate-200/80">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        MK
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-900 leading-tight">Małgorzata</div>
                        <div className="text-[10px] text-slate-500">{pl('Konto Apple, iCloud+')}</div>
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      {/* Wi-Fi */}
                      <button
                        type="button"
                        onClick={
                          currentScene.indexOf('macos-08-step-2') === 0
                            ? handleCorrectClick
                            : undefined
                        }
                        data-testid={
                          currentScene.indexOf('macos-08-step-2') === 0
                            ? 'simulator-target'
                            : undefined
                        }
                        className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center gap-2 ${
                          currentScene.indexOf('macos-08-step-2') === 0
                            ? 'mk-sim-highlight bg-blue-600 text-white font-bold'
                            : 'text-slate-800 hover:bg-slate-200/60'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-[#007AFF] text-white flex items-center justify-center shrink-0">
                          <Wifi className="w-3.5 h-3.5" />
                        </span>
                        <span>Wi-Fi</span>
                      </button>

                      {/* Bluetooth */}
                      <div className="px-2 py-1 rounded-lg flex items-center gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-md bg-[#007AFF] text-white flex items-center justify-center shrink-0">
                          <Bluetooth className="w-3.5 h-3.5" />
                        </span>
                        <span>Bluetooth</span>
                      </div>

                      {/* Dźwięk */}
                      <button
                        type="button"
                        onClick={
                          currentScene.indexOf('macos-08-step-3') === 0
                            ? handleCorrectClick
                            : undefined
                        }
                        data-testid={
                          currentScene.indexOf('macos-08-step-3') === 0
                            ? 'simulator-target'
                            : undefined
                        }
                        className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center gap-2 ${
                          currentScene.indexOf('macos-08-step-3') === 0
                            ? 'mk-sim-highlight bg-blue-600 text-white font-bold'
                            : 'text-slate-800 hover:bg-slate-200/60'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-[#FF2D55] text-white flex items-center justify-center shrink-0">
                          <Volume2 className="w-3.5 h-3.5" />
                        </span>
                        <span>{pl('Dźwięk')}</span>
                      </button>

                      {/* Ogólne -> Uaktualnienia */}
                      <button
                        type="button"
                        onClick={
                          currentScene.indexOf('macos-09-step-2') === 0
                            ? handleCorrectClick
                            : undefined
                        }
                        data-testid={
                          currentScene.indexOf('macos-09-step-2') === 0
                            ? 'simulator-target'
                            : undefined
                        }
                        className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center gap-2 ${
                          currentScene.indexOf('macos-09-step-2') === 0
                            ? 'mk-sim-highlight bg-blue-600 text-white font-bold'
                            : currentScene === 'macos-09-step-3'
                              ? 'bg-slate-300 font-semibold text-slate-900'
                              : 'text-slate-800 hover:bg-slate-200/60'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-[#8E8E93] text-white flex items-center justify-center shrink-0">
                          <Sliders className="w-3.5 h-3.5" />
                        </span>
                        <span>{pl('Ogólne → Uaktualnienia')}</span>
                      </button>

                      <div className="px-2 py-1 rounded-lg flex items-center gap-2 text-slate-700">
                        <span className="w-5 h-5 rounded-md bg-[#34C759] text-white flex items-center justify-center shrink-0">
                          <Shield className="w-3.5 h-3.5" />
                        </span>
                        <span>{pl('Prywatność i ochrona')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prawy panel wybranej kategorii Ustawień systemowych */}
                  <div className="col-span-7 p-4 bg-white flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                        {currentScene.indexOf('macos-08-step-2') === 0 && 'Wi-Fi'}
                        {currentScene.indexOf('macos-08-step-3') === 0 && pl('Dźwięk — Wyjście i głośność')}
                        {currentScene.indexOf('macos-09-') === 0 && pl('Uaktualnienia oprogramowania')}
                      </div>

                      {currentScene.indexOf('macos-08-step-2') === 0 && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">Dom-Swiatlowod-5G</span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              {pl('Połączono')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            {pl('Kliknij podświetloną pozycję „Wi-Fi” na pasku bocznym po lewej stronie.')}
                          </p>
                        </div>
                      )}

                      {currentScene.indexOf('macos-08-step-3') === 0 && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="font-semibold">{pl('Głośność wyjściowa (Głośniki MacBooka)')}</div>
                          <div className="flex items-center gap-2">
                            <Volume2 className="w-4 h-4 text-slate-400" />
                            <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div className="w-3/4 h-full bg-blue-600" />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentScene === 'macos-09-step-3' && (
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                          <div className="flex items-center gap-3">
                            <SettingsDockIcon className="w-10 h-10 shrink-0" />
                            <div>
                              <div className="font-bold text-slate-900">macOS 15.1</div>
                              <div className="text-[11px] text-emerald-700 font-semibold">
                                {pl('macOS jest aktualny — Twoje pliki są bezpieczne')}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleCorrectClick}
                            data-testid="simulator-target"
                            className="mk-sim-highlight w-full py-2 px-4 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{pl('Potwierdź sprawdzenie aktualności systemu')}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------- OKNO G: KOSZ I ODZYSKIWANIE PLIKÓW (Misja 10 krok 2 i 3) ---------- */}
          {(currentScene === 'macos-10-step-2' || currentScene === 'macos-10-step-3') && (
            <div className="relative z-20 w-full max-w-xl rounded-xl overflow-hidden shadow-2xl border border-black/25 bg-white text-slate-800 text-xs">
              <div className="h-10 px-3.5 bg-[#F3F4F6] border-b border-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 font-bold text-slate-800">{pl('Kosz')}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded border border-slate-300 bg-white text-slate-500 text-[11px]">
                  {pl('Opróżnij')}
                </span>
              </div>

              <div className="px-3.5 py-1.5 bg-slate-50 border-b border-slate-200 text-[11px] text-slate-500">
                {pl('Rzeczy pozostające w Koszu dłużej niż 30 dni są usuwane automatycznie.')}
              </div>

              <div className="p-4 min-h-[180px] relative">
                {currentScene === 'macos-10-step-2' ? (
                  <button
                    type="button"
                    onClick={handleCorrectClick}
                    data-testid="simulator-target"
                    className="mk-sim-highlight w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 font-bold text-slate-900"
                  >
                    <span className="flex items-center gap-2.5">
                      <MacPdfFileIcon className="w-7 h-8" badge="PDF" />
                      <span>Wazna-umowa.pdf</span>
                    </span>
                    <span className="text-mk-primary">
                      {pl('Kliknij prawym przyciskiem myszy (lub dwoma palcami) →')}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-blue-600 text-white font-semibold">
                      <MacPdfFileIcon className="w-7 h-8" badge="PDF" />
                      <span>Wazna-umowa.pdf</span>
                    </div>

                    {/* Realistyczne menu kontekstowe macOS z podświetlonym „Cofnij” */}
                    <div className="w-56 rounded-xl bg-white/95 shadow-2xl border border-slate-300 py-1.5 text-slate-800">
                      <div className="px-3 py-1 text-slate-500">{pl('Otwórz')}</div>
                      <button
                        type="button"
                        onClick={handleCorrectClick}
                        data-testid="simulator-target"
                        className="mk-sim-highlight w-full px-3 py-1.5 bg-blue-600 text-white font-bold text-left flex items-center justify-between"
                      >
                        <span>{pl('Cofnij (Przywróć na miejsce)')}</span>
                        <span>↩</span>
                      </button>
                      <div className="my-1 border-t border-slate-200" />
                      <div className="px-3 py-1 text-slate-500">{pl('Informacje')}</div>
                      <div className="px-3 py-1 text-rose-600">{pl('Usuń od razu…')}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------- OKNA H: PROGRAMY, IPHONE ORAZ AI ---------- */}
          <MacSimulatorProgramyAndExtraScenes
            currentScene={currentScene}
            isClassic={isClassic}
            onComplete={handleCorrectClick}
          />
        </div>

        {/* Sympatyczny Czarny Kotek Przewodnik („Maks”) w lewym dolnym rogu ekranu MacBooka */}
        <div
          className="hidden lg:flex items-center gap-2.5 absolute bottom-3 left-3 z-30 bg-slate-900/90 text-white px-3 py-2 rounded-2xl border border-amber-400/70 shadow-xl max-w-[250px] pointer-events-none"
          aria-hidden="true"
        >
          <BlackCatGuide mood="pointing" className="w-11 h-11 shrink-0" />
          <div className="text-[11px] leading-snug">
            <span className="font-bold text-amber-300 block">
              {pl('Maks podpowiada:')}
            </span>
            <span className="text-slate-100">
              {pl('Kliknij element obrysowany złotą ramką na ekranie.')}
            </span>
          </div>
        </div>

        {/* ==================== 3. DOLNY PASEK DOCK MACOS ==================== */}
        <div className="relative z-30 pb-2 pt-1 flex justify-center">
          <div
            className="inline-flex items-end gap-2 sm:gap-2.5 px-3 py-1.5 rounded-2xl border shadow-2xl"
            style={{
              backgroundColor: isClassic
                ? 'rgba(226, 232, 240, 0.85)'
                : 'rgba(255, 255, 255, 0.72)',
              borderColor: 'rgba(255, 255, 255, 0.45)',
            }}
          >
            {/* 1. Finder w Docku */}
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
              title="Finder"
              className={`group relative flex flex-col items-center p-0.5 rounded-xl transition-transform duration-150 hover:-translate-y-1 ${
                currentScene === 'macos-01-step-1' || currentScene === 'macos-02-step-1'
                  ? 'mk-sim-highlight bg-amber-300/90 scale-110'
                  : ''
              }`}
            >
              <span className=" -top-7 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold hidden group-hover:block absolute whitespace-nowrap">
                Finder
              </span>
              <FinderDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-slate-900 mt-1" />
            </button>

            {/* 2. Launchpad w Docku */}
            <div
              className="group relative flex flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title="Launchpad"
            >
              <LaunchpadDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-transparent mt-1" />
            </div>

            {/* 3. Safari w Docku */}
            <button
              type="button"
              onClick={currentScene === 'macos-07-step-3' ? handleCorrectClick : undefined}
              data-testid={currentScene === 'macos-07-step-3' ? 'simulator-target' : undefined}
              title="Safari"
              className={`group relative flex flex-col items-center p-0.5 rounded-xl transition-transform duration-150 hover:-translate-y-1 ${
                currentScene === 'macos-07-step-3'
                  ? 'mk-sim-highlight bg-amber-300/90 scale-110'
                  : ''
              }`}
            >
              <SafariDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-slate-900 mt-1" />
            </button>

            {/* 4. Mail w Docku */}
            <div
              className="group relative flex flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title="Mail"
            >
              <MailDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-slate-900 mt-1" />
            </div>

            {/* 5. Zdjęcia w Docku */}
            <div
              className="hidden sm:flex group relative flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title={pl('Zdjęcia')}
            >
              <PhotosDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-transparent mt-1" />
            </div>

            {/* 6. Podgląd w Docku */}
            <div
              className="hidden md:flex group relative flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title={pl('Podgląd')}
            >
              <PreviewDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-slate-900 mt-1" />
            </div>

            {/* 7. Notatki w Docku */}
            <div
              className="hidden md:flex group relative flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title={pl('Notatki')}
            >
              <NotesDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span className="w-1 h-1 rounded-full bg-transparent mt-1" />
            </div>

            {/* 8. Ustawienia / Preferencje systemowe w Docku */}
            <div
              className="group relative flex flex-col items-center p-0.5 transition-transform duration-150 hover:-translate-y-1"
              title={isClassic ? pl('Preferencje systemowe') : pl('Ustawienia systemowe')}
            >
              <SettingsDockIcon className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow" />
              <span
                className={`w-1 h-1 rounded-full mt-1 ${
                  isSettingsWindowScene ? 'bg-slate-900' : 'bg-transparent'
                }`}
              />
            </div>

            {/* Pionowa kreska oddzielająca Kosz w Docku */}
            <div className="w-px h-9 bg-slate-500/40 mx-0.5 self-center" />

            {/* 9. Kosz w Docku */}
            <button
              type="button"
              onClick={currentScene === 'macos-10-step-1' ? handleCorrectClick : undefined}
              data-testid={currentScene === 'macos-10-step-1' ? 'simulator-target' : undefined}
              title={pl('Kosz')}
              className={`group relative flex flex-col items-center p-0.5 rounded-xl transition-transform duration-150 hover:-translate-y-1 ${
                currentScene === 'macos-10-step-1'
                  ? 'mk-sim-highlight bg-amber-300/90 scale-110'
                  : ''
              }`}
            >
              <TrashDockIcon
                className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow"
                hasFiles={currentScene.indexOf('macos-10-') === 0}
              />
              <span className="w-1 h-1 rounded-full bg-transparent mt-1" />
            </button>
          </div>
        </div>

        {/* Czarny Kotek Maks wyglądający z rogu ekranu symulatora */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 text-amber-50 px-3 py-1.5 rounded-2xl border border-amber-400/50 shadow-lg max-w-xs">
          <BlackCatGuide className="w-9 h-9 shrink-0" mood="pointing" />
          <span className="text-[11px] leading-tight">
            <strong className="text-amber-300">{pl('Maks podpowiada:')}</strong>{' '}
            {pl('Szukaj elementu z pulsującą pomarańczową obwódką!')}
          </span>
        </div>

        {/* Potwierdzenie kroku w symulatorze */}
        {stepConfirmed && (
          <div className="absolute inset-0 bg-emerald-950/35 flex items-center justify-center z-40">
            <div className="bg-white text-emerald-900 px-5 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>{pl('Brawo! Krok zaliczony.')}</span>
            </div>
          </div>
        )}

        {/* Łagodny komunikat przy kliknięciu obok podświetlonego elementu */}
        {misclickNotice && (
          <div
            data-testid="simulator-misclick"
            className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-xs font-medium px-4 py-2 rounded-full shadow-xl z-40 border border-white/20"
          >
            {misclickNotice}
          </div>
        )}
      </div>

      {/* Dolna aluminiowa listwa ekranu MacBooka */}
      <div className="pt-1.5 flex items-center justify-center">
        <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400">
          MacBook
        </span>
      </div>
    </div>
  );
}
