'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Compass,
  Map,
  BookOpen,
  History,
  Settings,
  LifeBuoy,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  Lock,
  Sparkles,
  Download,
  Upload,
  Clock,
  ShieldCheck,
  Search,
  Monitor,
  ExternalLink,
  MessageSquare,
  Send,
} from 'lucide-react';
import {
  ALL_MISSIONS,
  EXTRA_THEORY_CARDS,
  Mission,
  TheoryCard,
  TrackId,
} from '@macknow/missions';
import {
  ColorMode,
  DEFAULT_USER_PROGRESS,
  exportProgressToJson,
  FontSizeScale,
  getSuggestedMissions,
  getTrackProgressSummaries,
  getVisibleMissionsWithStatus,
  importProgressFromJson,
  MacLookChoice,
  markTheoryRead,
  matchEmergencyQuery,
  observeStepVerification,
  recordMissionCompletion,
  resolveEffectiveOsVersion,
  resolveSimulatorTheme,
  resolveStepForEnvironment,
  UserProgressState,
} from '@macknow/core';
import {
  BlackCatGuide,
  CelebrationEmblem,
  MacKnowLogo,
  MacLookIllustration,
  MaksFunnySpot,
  pl,
  ProgressBar,
  TheoryIllustration,
  TRACK_METADATA,
  TrackBadge,
  TrackIllustration,
} from '@macknow/ui';
import { MacSimulator } from './MacSimulator';
import {
  createRuntimeAdapter,
  loadPersistedProgress,
  savePersistedProgress,
} from '../lib/persistence';
import { askMaksAi, MaksAiResponse } from '../lib/maks-ai';

export type ScreenId =
  | 'start'
  | 'tracks'
  | 'mission'
  | 'emergency'
  | 'library'
  | 'history'
  | 'settings';

const MAKS_FUNNY_QUIPS: string[] = [
  'Maks melduje: obiecuję nie deptać po klawiaturze, dopóki nie skończymy tej misji!',
  'Kocia zasada numer 1: czerwony krzyżyk zamyka tylko okno, a program drzemie dalej na pasku Dock.',
  'Gdyby coś zniknęło z ekranu, naciśnij ⌘Z – to moja ulubiona maszyna czasu na Macu!',
  'Mruczę z dumy za każdym razem, gdy używasz lupy Spotlight (⌘Spacja) zamiast szukać na piechotę.',
  'Plik to pojedyncza kartka, a niebieska teczka to pudełko – razem tworzą drzewo katalogów.',
];

export function MacKnowApp() {
  const [progress, setProgress] = useState<UserProgressState>(DEFAULT_USER_PROGRESS);
  const [hydrated, setHydrated] = useState(false);
  const [activeScreen, setActiveScreen] = useState<ScreenId>('start');
  const [detectedOsVersion, setDetectedOsVersion] = useState<string | null>(null);
  const [needsDesktopPermissions, setNeedsDesktopPermissions] = useState(false);

  // Zabawne odzywki kota Maksa w nagłówku
  const [maksQuipIndex, setMaksQuipIndex] = useState<number>(0);
  const [showMaksHeaderBubble, setShowMaksHeaderBubble] = useState<boolean>(false);

  // Stan aktywnej misji (Ekran 3: Misja)
  const [activeMissionId, setActiveMissionId] = useState<string>(
    ALL_MISSIONS[0]?.id || 'macos-01-pulpit-dock'
  );
  const [showingTheory, setShowingTheory] = useState<boolean>(true);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [hintsUsedInMission, setHintsUsedInMission] = useState<number>(0);
  const [missionCompletedView, setMissionCompletedView] = useState<boolean>(false);
  const [realtimeNotice, setRealtimeNotice] = useState<string | null>(null);
  const [liveCoachActive, setLiveCoachActive] = useState<boolean>(false);
  const [liveCoachTargetName, setLiveCoachTargetName] = useState<string | null>(null);
  const [detectedFrontmostApp, setDetectedFrontmostApp] = useState<string | null>(null);

  // Stan dla asystenta sytuacyjnego Maks AI (Gemini) w krokach misji, teorii i Pogotowiu
  const [stepAiQuestion, setStepAiQuestion] = useState<string>('');
  const [stepAiLoading, setStepAiLoading] = useState<boolean>(false);
  const [stepAiResponse, setStepAiResponse] = useState<MaksAiResponse | null>(null);

  const [theoryAiLoading, setTheoryAiLoading] = useState<boolean>(false);
  const [theoryAiResponse, setTheoryAiResponse] = useState<MaksAiResponse | null>(null);

  const [emergencyAiLoading, setEmergencyAiLoading] = useState<boolean>(false);
  const [emergencyAiResponse, setEmergencyAiResponse] = useState<MaksAiResponse | null>(null);

  // Stan dla Mapy ścieżek, Biblioteki, Pogotowia i Ustawień
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<TrackId | 'all'>('all');
  const [libraryQuery, setLibraryQuery] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [activeLibraryCard, setActiveLibraryCard] = useState<TheoryCard | null>(null);
  const [emergencyInput, setEmergencyInput] = useState<string>('');
  const [importStatusMsg, setImportStatusMsg] = useState<string | null>(null);

  const adapterRef = useRef(createRuntimeAdapter());

  // Inicjalizacja stanu z IndexedDB / SQLite oraz sprawdzenie środowiska Electron
  useEffect(() => {
    let mounted = true;
    adapterRef.current = createRuntimeAdapter();

    async function init() {
      const loaded = await loadPersistedProgress();
      if (!mounted) return;
      setProgress(loaded);
      setHydrated(true);

      const osVer = await adapterRef.current.osVersion();
      if (mounted && osVer) {
        setDetectedOsVersion(osVer);
      }

      if (typeof window !== 'undefined' && window.macknowDesktop) {
        try {
          const perms = await window.macknowDesktop.checkPermissions();
          if (
            mounted &&
            (!perms.accessibility || !perms.fullDiskAccess) &&
            !loaded.settings.onboardingDismissed
          ) {
            setNeedsDesktopPermissions(true);
          }
        } catch {
          // W razie braku uprawnień aplikacja działa w trybie ręcznym bez błędów
        }
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, []);

  // Synchronizacja motywu kolorystycznego i skali czcionki z atrybutami dokumentu
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', progress.settings.colorMode);
    document.documentElement.setAttribute('data-font-scale', progress.settings.fontSize);
  }, [progress.settings.colorMode, progress.settings.fontSize]);

  const updateProgress = (updater: (prev: UserProgressState) => UserProgressState) => {
    setProgress((prev) => {
      const next = updater(prev);
      savePersistedProgress(next);
      return next;
    });
  };

  const effectiveOsVersion = useMemo(
    () =>
      resolveEffectiveOsVersion(
        detectedOsVersion,
        progress.settings.manualOsOverride,
        progress.settings.macLook
      ),
    [detectedOsVersion, progress.settings.manualOsOverride, progress.settings.macLook]
  );

  const simulatorTheme = useMemo(
    () => resolveSimulatorTheme(effectiveOsVersion, progress.settings.macLook),
    [effectiveOsVersion, progress.settings.macLook]
  );

  const visibleMissionsWithStatus = useMemo(
    () => getVisibleMissionsWithStatus(ALL_MISSIONS, progress, effectiveOsVersion),
    [progress, effectiveOsVersion]
  );

  const suggestedMissions = useMemo(
    () => getSuggestedMissions(ALL_MISSIONS, progress, effectiveOsVersion),
    [progress, effectiveOsVersion]
  );

  const trackSummaries = useMemo(
    () => getTrackProgressSummaries(ALL_MISSIONS, progress, effectiveOsVersion),
    [progress, effectiveOsVersion]
  );

  const activeMission: Mission = useMemo(() => {
    const found = ALL_MISSIONS.find((m) => m.id === activeMissionId);
    return found || ALL_MISSIONS[0];
  }, [activeMissionId]);

  const currentStep = activeMission?.steps[currentStepIndex] || activeMission?.steps[0];

  const resolvedStep = useMemo(() => {
    if (!currentStep) return null;
    return resolveStepForEnvironment(
      currentStep,
      effectiveOsVersion,
      adapterRef.current,
      progress.settings.realMacMode
    );
  }, [currentStep, effectiveOsVersion, progress.settings.realMacMode]);

  // Czyszczenie odpowiedzi AI przy zmianie kroku lub misji
  useEffect(() => {
    setStepAiResponse(null);
    setStepAiQuestion('');
  }, [activeMissionId, currentStepIndex]);

  useEffect(() => {
    setTheoryAiResponse(null);
  }, [activeMissionId, activeLibraryCard]);

  // Automatyczna synchronizacja trybu „Prawdziwy Mac” z zakreślaniem na ekranie i wykrywaniem otwartego programu
  useEffect(() => {
    if (!progress.settings.realMacMode) {
      if (liveCoachActive) {
        setLiveCoachActive(false);
        if (typeof window !== 'undefined' && window.macknowDesktop?.stopLiveCoach) {
          window.macknowDesktop.stopLiveCoach().catch(() => {});
        }
      }
      return;
    }

    setLiveCoachActive(true);

    if (
      activeScreen === 'mission' &&
      !showingTheory &&
      !missionCompletedView &&
      resolvedStep &&
      typeof window !== 'undefined' &&
      window.macknowDesktop?.startLiveCoach
    ) {
      window.macknowDesktop
        .startLiveCoach({
          scene: resolvedStep.simulatorScene || '',
          instruction: pl(resolvedStep.instruction),
          hint: pl(resolvedStep.hint || ''),
          openTarget: true,
        })
        .then((res) => {
          setLiveCoachTargetName(res.openedTarget || 'Prawdziwy Mac');
        })
        .catch(() => {});
    }

    let active = true;
    const pollFrontmost = async () => {
      try {
        const appName = await adapterRef.current.frontmostApp();
        if (active && appName) {
          setDetectedFrontmostApp(appName);
        }
      } catch {
        // Ignorujemy błąd
      }
    };
    pollFrontmost();
    const interval = setInterval(pollFrontmost, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [
    progress.settings.realMacMode,
    activeScreen,
    showingTheory,
    missionCompletedView,
    currentStepIndex,
    activeMissionId,
  ]);

  // 60-sekundowy timer bezczynności na ekranie kroku misji -> automatycznie pokazuje pierwszą podpowiedź
  useEffect(() => {
    if (activeScreen !== 'mission' || showingTheory || missionCompletedView) {
      return;
    }
    if (hintLevel > 0) {
      return;
    }
    const timer = setTimeout(() => {
      setHintLevel(1);
      setHintsUsedInMission((c) => c + 1);
    }, 60000);
    return () => clearTimeout(timer);
  }, [activeScreen, showingTheory, missionCompletedView, currentStepIndex, hintLevel]);

  // Weryfikacja w czasie rzeczywistym w trybie prawdziwego Maca
  useEffect(() => {
    if (
      activeScreen !== 'mission' ||
      showingTheory ||
      missionCompletedView ||
      !currentStep ||
      !progress.settings.realMacMode
    ) {
      return;
    }

    const { stop } = observeStepVerification(
      currentStep,
      effectiveOsVersion,
      adapterRef.current,
      true,
      (message) => {
        setRealtimeNotice(pl(message || 'Jest! Maks widzi wykonany krok na Twoim Macu.'));
        setTimeout(() => {
          setRealtimeNotice(null);
          handleAdvanceStep();
        }, 1100);
      }
    );

    return () => stop();
  }, [
    activeScreen,
    showingTheory,
    missionCompletedView,
    currentStep,
    effectiveOsVersion,
    progress.settings.realMacMode,
  ]);

  const startMission = (missionId: string) => {
    setActiveMissionId(missionId);
    setShowingTheory(true);
    setCurrentStepIndex(0);
    setHintLevel(0);
    setHintsUsedInMission(0);
    setMissionCompletedView(false);
    setRealtimeNotice(null);
    setStepAiResponse(null);
    setTheoryAiResponse(null);
    setActiveScreen('mission');
  };

  const handleAdvanceStep = () => {
    if (!activeMission) return;
    if (currentStepIndex + 1 < activeMission.steps.length) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setHintLevel(0);
      setRealtimeNotice(null);
      if (
        (liveCoachActive || progress.settings.realMacMode) &&
        typeof window !== 'undefined' &&
        window.macknowDesktop?.updateLiveCoachStep
      ) {
        const nextStep = activeMission.steps[nextIdx];
        if (nextStep) {
          window.macknowDesktop
            .updateLiveCoachStep({
              scene: nextStep.simulatorScene || '',
              instruction: pl(nextStep.instruction),
              hint: pl(nextStep.hint || ''),
              openTarget: true,
            })
            .then((res) => {
              if (res.openedTarget) setLiveCoachTargetName(res.openedTarget);
            })
            .catch(() => {});
        }
      }
    } else {
      if (typeof window !== 'undefined' && window.macknowDesktop?.stopLiveCoach) {
        window.macknowDesktop.stopLiveCoach().catch(() => {});
      }
      setLiveCoachActive(false);
      updateProgress((prev) =>
        recordMissionCompletion(prev, activeMission, hintsUsedInMission)
      );
      setMissionCompletedView(true);
    }
  };

  const handleSetRealMacMode = async (enabled: boolean) => {
    updateProgress((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        realMacMode: enabled,
      },
    }));

    if (enabled) {
      setLiveCoachActive(true);
      const targetStep =
        resolvedStep || activeMission?.steps[currentStepIndex] || ALL_MISSIONS[0]?.steps[0];
      if (typeof window !== 'undefined' && window.macknowDesktop?.startLiveCoach && targetStep) {
        try {
          const res = await window.macknowDesktop.startLiveCoach({
            scene: targetStep.simulatorScene || 'macos-01-step-1',
            instruction: pl(targetStep.instruction),
            hint: pl(targetStep.hint || ''),
            openTarget: true,
          });
          setLiveCoachTargetName(res.openedTarget || 'Finder');
        } catch {
          setLiveCoachTargetName('Finder');
        }
      } else {
        setLiveCoachTargetName('Finder / Biurko');
      }
    } else {
      setLiveCoachActive(false);
      setLiveCoachTargetName(null);
      if (typeof window !== 'undefined' && window.macknowDesktop?.stopLiveCoach) {
        await window.macknowDesktop.stopLiveCoach().catch(() => {});
      }
    }
  };

  const handleToggleLiveCoach = async (openTarget = true) => {
    if (!openTarget && liveCoachActive) {
      await handleSetRealMacMode(false);
      return;
    }
    await handleSetRealMacMode(true);
  };

  const handleAskStepMaksAi = async (customQuestion?: string) => {
    const q = (customQuestion ?? stepAiQuestion).trim();
    if (!q || !resolvedStep) return;
    setStepAiQuestion(q);
    setStepAiLoading(true);
    try {
      const answer = await askMaksAi({
        question: q,
        missionTitle: activeMission.title,
        stepInstruction: resolvedStep.instruction,
        stepHint: resolvedStep.hint,
        osVersion: effectiveOsVersion,
        frontmostApp: detectedFrontmostApp,
        mode: 'step',
      });
      setStepAiResponse(answer);
    } finally {
      setStepAiLoading(false);
    }
  };

  const handleAskTheoryMaksAi = async (card: TheoryCard) => {
    setTheoryAiLoading(true);
    try {
      const answer = await askMaksAi({
        question: `Wyjaśnij mi jeszcze prościej i z humorem temat „${card.title}” (${card.metaphor}) na codziennym przykładzie.`,
        missionTitle: card.title,
        stepInstruction: card.oneLiner,
        stepHint: card.realExplanation,
        osVersion: effectiveOsVersion,
        mode: 'theory',
      });
      setTheoryAiResponse(answer);
    } finally {
      setTheoryAiLoading(false);
    }
  };

  const handleAskEmergencyMaksAi = async (queryText?: string) => {
    const q = (queryText ?? emergencyInput).trim();
    if (!q) return;
    setEmergencyAiLoading(true);
    try {
      const answer = await askMaksAi({
        question: q,
        osVersion: effectiveOsVersion,
        frontmostApp: detectedFrontmostApp,
        mode: 'pogotowie',
      });
      setEmergencyAiResponse(answer);
    } finally {
      setEmergencyAiLoading(false);
    }
  };

  const handleStuckClick = () => {
    if (hintLevel === 0) {
      setHintLevel(1);
      setHintsUsedInMission((c) => c + 1);
    } else if (hintLevel === 1) {
      setHintLevel(2);
      setHintsUsedInMission((c) => c + 1);
    }
  };

  const handleSelectMacLook = (look: MacLookChoice) => {
    updateProgress((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        macLook: look,
      },
    }));
  };

  const allTheoryCards: TheoryCard[] = useMemo(() => {
    const fromMissions: TheoryCard[] = ALL_MISSIONS.map((m) => ({
      ...m.theory,
      id: m.theory.id || m.id,
      category: m.theory.category || TRACK_METADATA[m.track].title,
    }));
    return fromMissions.concat(EXTRA_THEORY_CARDS);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mk-bg text-mk-text p-8">
        <p className="font-display text-xl">{pl('Otwieram Twój przewodnik z kotem Maksem, Małgorzato…')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-mk-bg text-mk-text">
      {/* Stuprocentowo nieprzezroczysty pasek górny aplikacji MacKnow (żadne napisy nie prześwitują przy przewijaniu) */}
      <header
        className="mk-sticky-header sticky top-0 z-50 border-b border-mk-border bg-mk-surface"
        style={{ backgroundColor: 'var(--mk-surface)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveScreen('start')}
              className="text-left rounded-mk focus-visible:outline-none"
            >
              <MacKnowLogo />
            </button>

            {/* Interaktywny animowany kotek Maks wyglądający zza logo w pasku górnym */}
            <button
              type="button"
              onClick={() => {
                setMaksQuipIndex((i) => (i + 1) % MAKS_FUNNY_QUIPS.length);
                setShowMaksHeaderBubble(true);
              }}
              title={pl('Kliknij kota Maksa, aby usłyszeć kocią wskazówkę!')}
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-mk-border bg-mk-elevated hover:border-mk-primary transition-colors text-xs font-semibold text-mk-text"
            >
              <BlackCatGuide mood="peeking" className="w-7 h-7 shrink-0" />
              <span>{pl('Kot Maks')}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Zawsze widoczny przełącznik: Symulator vs Prawdziwy Mac */}
            <div
              className="inline-flex items-center rounded-full border border-mk-border bg-mk-elevated p-0.5 text-xs font-bold"
              role="group"
              aria-label={pl('Tryb ćwiczenia')}
            >
              <button
                type="button"
                onClick={() => handleSetRealMacMode(false)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  !progress.settings.realMacMode
                    ? 'bg-mk-primary text-white shadow-sm'
                    : 'text-mk-muted hover:text-mk-text'
                }`}
              >
                {pl('Symulator')}
              </button>
              <button
                type="button"
                data-testid="header-real-mac-toggle"
                onClick={() => handleSetRealMacMode(true)}
                className={`px-3 py-1.5 rounded-full transition-colors inline-flex items-center gap-1.5 ${
                  progress.settings.realMacMode
                    ? 'bg-mk-success text-white shadow-sm'
                    : 'text-mk-muted hover:text-mk-text'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    progress.settings.realMacMode ? 'bg-white' : 'bg-mk-success'
                  }`}
                />
                <span>{pl('Prawdziwy Mac')}</span>
              </button>
            </div>

            <nav aria-label={pl('Główna nawigacja')} className="flex flex-wrap items-center gap-1">
              {[
                { id: 'start' as ScreenId, label: 'Start', icon: Compass },
                { id: 'tracks' as ScreenId, label: 'Mapa ścieżek', icon: Map },
                { id: 'library' as ScreenId, label: 'Biblioteka', icon: BookOpen },
                { id: 'emergency' as ScreenId, label: 'Pogotowie', icon: LifeBuoy },
                { id: 'history' as ScreenId, label: 'Historia', icon: History },
                { id: 'settings' as ScreenId, label: 'Ustawienia', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isCurrent = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`nav-${item.id}`}
                    onClick={() => setActiveScreen(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-mk text-sm font-semibold transition-colors duration-150 ${
                      isCurrent
                        ? 'bg-mk-primary text-white shadow-sm'
                        : 'text-mk-text hover:bg-mk-elevated'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{pl(item.label)}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Dymek z zabawną odzywką Maksa po kliknięciu kota w nagłówku */}
        {showMaksHeaderBubble && (
          <div className="border-t border-mk-border bg-mk-primarySoft px-4 py-2">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-xs text-mk-text">
              <div className="flex items-center gap-2 font-medium">
                <BlackCatGuide mood="celebrating" className="w-7 h-7 shrink-0" />
                <span>{pl(MAKS_FUNNY_QUIPS[maksQuipIndex])}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setMaksQuipIndex((i) => (i + 1) % MAKS_FUNNY_QUIPS.length)}
                  className="px-2.5 py-1 rounded bg-mk-surface border border-mk-border font-semibold text-mk-primary"
                >
                  {pl('Inna kocia myśl')}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMaksHeaderBubble(false)}
                  className="px-2 py-1 text-mk-muted hover:text-mk-text font-semibold"
                >
                  {pl('Zamknij')}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Pasek statusu, gdy włączony jest Tryb Prawdziwego Maca */}
      {progress.settings.realMacMode && (
        <div
          data-testid="real-mac-global-bar"
          className="bg-mk-successSoft border-b border-mk-success px-4 py-2.5"
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-mk-text">
            <div className="flex items-center gap-2.5">
              <BlackCatGuide mood="pointing" className="w-8 h-8 shrink-0" />
              <div>
                <strong className="font-bold text-mk-success">
                  {pl('Tryb ćwiczenia na prawdziwym Macu jest WŁĄCZONY!')}
                </strong>{' '}
                <span>
                  {pl(
                    `Kot Maks dokuje okno z prawej strony, otwiera prawdziwe programy na Twoim MacBooku i obrysowuje na ekranie miejsce do kliknięcia (${
                      liveCoachTargetName || detectedFrontmostApp || 'Finder'
                    }).`
                  )}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeScreen !== 'mission' && (
                <button
                  type="button"
                  onClick={() => {
                    startMission(activeMissionId);
                    setShowingTheory(false);
                  }}
                  className="px-3 py-1.5 rounded-mk bg-mk-success text-white font-bold"
                >
                  {pl('Przejdź teraz do ćwiczenia na żywo')}
                </button>
              )}
              <button
                type="button"
                onClick={() => handleSetRealMacMode(false)}
                className="px-3 py-1.5 rounded-mk border border-mk-border bg-mk-surface font-semibold text-mk-text"
              >
                {pl('Przełącz na sam Symulator')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ekran pierwszego uruchomienia w Electronie („Pozwól mi widzieć, co robisz”) */}
      {needsDesktopPermissions && (
        <div className="bg-mk-primarySoft border-b border-mk-border px-4 py-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-mk-primary shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display font-bold text-base text-mk-text">
                  {pl('Pozwól Maksowi widzieć, co robisz na Macu')}
                </h2>
                <p className="text-sm text-mk-muted mt-0.5">
                  {pl(
                    'Aby aplikacja mogła sama zauważyć, że zrobiłaś zrzut ekranu na Pulpicie lub otworzyłaś Findera, potrzebuje zgody na Dostępność oraz Pełny dostęp do dysku. Bez nich też wszystko działa – po prostu będziesz klikać przycisk „Zrobione”.'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  window.macknowDesktop?.openPrivacySettings(effectiveOsVersion);
                }}
                className="px-4 py-2 rounded-mk bg-mk-primary text-white text-xs font-semibold"
              >
                {effectiveOsVersion && effectiveOsVersion.indexOf('10.') === 0
                  ? pl('Otwórz Preferencje → Ochrona i prywatność')
                  : pl('Otwórz Ustawienia → Prywatność i ochrona')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNeedsDesktopPermissions(false);
                  updateProgress((prev) => ({
                    ...prev,
                    settings: { ...prev.settings, onboardingDismissed: true },
                  }));
                }}
                className="px-3 py-2 rounded-mk border border-mk-border bg-mk-surface text-xs font-semibold text-mk-text"
              >
                {pl('Wolę klikać „Zrobione”')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Główna zawartość ekranów */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* ==================== EKRAN 1: START ==================== */}
        {activeScreen === 'start' && (
          <div className="space-y-10" data-testid="screen-start">
            {/* Nowoczesny baner powitalny z animowanym czarnym kotkiem Maksem – imię raz na ekran, w wołaczu */}
            <section className="mk-hero-surface p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-2xl">
                <div className="relative shrink-0">
                  <BlackCatGuide mood="pointing" className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-md" />
                  <span className=" -bottom-1 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-mk-primary text-white text-xs font-bold shadow whitespace-nowrap absolute">
                    {pl('Kotek Maks')}
                  </span>
                </div>
                <div className="space-y-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mk-surface border border-mk-border text-xs font-bold uppercase tracking-wider text-mk-primary shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{pl('Twój koci przewodnik i asystent AI (50 misji krok po kroku)')}</span>
                  </span>
                  <h1 className="mk-heading-1 font-bold text-mk-text">
                    {pl('Małgorzato, co dziś wspólnie przećwiczymy?')}
                  </h1>
                  <p className="text-mk-muted mk-step-text">
                    {pl(
                      'Jestem Maks – Twój czarny kotek przewodnik. Mogę uczyć Cię na bezpiecznym symulatorze albo włączyć tryb Prawdziwego Maca, otworzyć program obok i zakreślić na ekranie dokładnie to, co warto kliknąć!'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    handleSetRealMacMode(true);
                    startMission(suggestedMissions[0]?.id || 'macos-01-pulpit-dock');
                    setShowingTheory(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <Monitor className="w-4 h-4" />
                  <span>{pl('Ćwicz od razu na prawdziwym Macu')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScreen('emergency')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-mk border-2 border-mk-primary bg-mk-surface text-mk-primary font-bold text-sm hover:bg-mk-primarySoft transition-colors duration-150"
                >
                  <LifeBuoy className="w-4 h-4" />
                  <span>{pl('Coś mi nie wychodzi – Pogotowie Maksa AI')}</span>
                </button>
              </div>
            </section>

            {/* Trzy sugerowane misje na dziś w nowoczesnej siatce Bento */}
            <section aria-labelledby="suggested-heading" className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="suggested-heading" className="mk-heading-2 font-bold text-mk-text">
                  {pl('Trzy proponowane misje na teraz')}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveScreen('tracks')}
                  className="text-sm font-semibold text-mk-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{pl('Zobacz wszystkie 50 misji')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedMissions.map((mission) => (
                  <article
                    key={mission.id}
                    data-testid={`suggested-mission-${mission.id}`}
                    className="mk-bento-card mk-bento-card-interactive p-6 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <TrackBadge track={mission.track} />
                        <span className="inline-flex items-center gap-1 text-xs text-mk-muted font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{mission.estimatedMinutes} min</span>
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-mk-text leading-snug">
                        {pl(mission.title)}
                      </h3>
                      <p className="text-sm text-mk-muted leading-relaxed">
                        {pl(mission.realLifeHook)}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-mk-border">
                      <button
                        type="button"
                        data-testid={`start-mission-${mission.id}`}
                        onClick={() => startMission(mission.id)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white font-semibold text-sm transition-colors duration-150"
                      >
                        <span>{pl('Rozpocznij misję')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Zabawne wystąpienie kota Maksa goniącego kursor myszki */}
            <MaksFunnySpot
              mood="chasing"
              badge="Maks poluje na kursor"
              caption="Wiedziałaś, że jeśli szybko pomachasz palcem po gładziku w lewo i w prawo, kursor myszki urośnie na chwilę pięciokrotnie, żeby łatwo go było zauważyć?"
            />

            {/* Pasek postępu dla każdej z czterech ścieżek */}
            <section aria-labelledby="progress-heading" className="space-y-4">
              <h2 id="progress-heading" className="mk-heading-2 font-bold text-mk-text">
                {pl('Twój postęp w czterech ścieżkach')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(['macos', 'programy', 'iphone', 'ai'] as TrackId[]).map((trackKey) => {
                  const meta = TRACK_METADATA[trackKey];
                  const summary = trackSummaries[trackKey];
                  return (
                    <div
                      key={trackKey}
                      onClick={() => {
                        setSelectedTrackFilter(trackKey);
                        setActiveScreen('tracks');
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedTrackFilter(trackKey);
                          setActiveScreen('tracks');
                        }
                      }}
                      className="mk-bento-card mk-bento-card-interactive p-5 cursor-pointer flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display font-bold text-lg text-mk-text">
                            {pl(meta.title)}
                          </h3>
                          <p className="text-xs text-mk-muted mt-1">{pl(meta.subtitle)}</p>
                        </div>
                        <TrackIllustration track={trackKey} className="w-12 h-12 shrink-0" />
                      </div>
                      <div>
                        <ProgressBar
                          value={summary.percentage}
                          label={`${summary.completed} z ${summary.total} ukończonych`}
                          colorVar={meta.colorVar}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Wybór w trybie web: „Mój Mac wygląda tak” (3 obrazki: stare Preferencje, nowe Ustawienia, nie wiem) */}
            <section
              aria-labelledby="mac-look-heading"
              className="mk-bento-card p-6 sm:p-8 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 id="mac-look-heading" className="mk-heading-2 font-bold text-mk-text">
                    {pl('Mój Mac wygląda tak')}
                  </h2>
                  <p className="text-sm text-mk-muted">
                    {pl(
                      'Wybierz obrazek, który najbardziej przypomina okno ustawień na Twoim MacBooku – dopasujemy nazwy przycisków i wygląd symulatora do Twojej wersji systemu.'
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-mk-elevated border border-mk-border shrink-0">
                  <BlackCatGuide mood="peeking" className="w-10 h-10 shrink-0" />
                  <span className="text-xs text-mk-muted max-w-[200px]">
                    {pl('Maks zagląda: oba układy znam na pamięć!')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'old' as MacLookChoice,
                    title: 'Stare Preferencje systemowe',
                    desc: 'Rzędy kolorowych ikonek w siatce (MacBook z systemem macOS 12 Monterey, Catalina, Mojave lub High Sierra).',
                  },
                  {
                    id: 'new' as MacLookChoice,
                    title: 'Nowe Ustawienia systemowe',
                    desc: 'Lista kategorii z boku po lewej stronie, podobna do ustawień w iPhonie (macOS 13 Ventura, Sonoma, Sequoia).',
                  },
                  {
                    id: 'unknown' as MacLookChoice,
                    title: 'Nie wiem – pokaż oba',
                    desc: 'Nie musisz sprawdzać numeru systemu. Będziemy podpowiadać uniwersalne kroki i wygodny widok domyślny.',
                  },
                ].map((option) => {
                  const selected = progress.settings.macLook === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      data-testid={`mac-look-${option.id}`}
                      onClick={() => handleSelectMacLook(option.id)}
                      className={`text-left rounded-mk-lg p-4 border-2 transition-all duration-150 flex flex-col justify-between gap-3 ${
                        selected
                          ? 'border-mk-primary bg-mk-primarySoft shadow-sm'
                          : 'border-mk-border bg-mk-bg hover:border-mk-primary'
                      }`}
                    >
                      <MacLookIllustration variant={option.id} />
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-base text-mk-text">
                            {pl(option.title)}
                          </span>
                          {selected && <CheckCircle2 className="w-5 h-5 text-mk-primary shrink-0" />}
                        </div>
                        <p className="text-xs text-mk-muted mt-1 leading-relaxed">
                          {pl(option.desc)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ==================== EKRAN 3: MISJA ==================== */}
        {activeScreen === 'mission' && activeMission && (
          <div className="max-w-4xl mx-auto space-y-6" data-testid="screen-mission">
            {/* Pasek powrotu i nagłówek misji */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setActiveScreen('start')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-mk-muted hover:text-mk-text"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{pl('Wróć na ekran główny')}</span>
              </button>
              <div className="flex items-center gap-3">
                <TrackBadge track={activeMission.track} />
                {!showingTheory && !missionCompletedView && (
                  <button
                    type="button"
                    data-testid="back-to-theory-btn"
                    onClick={() => setShowingTheory(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-mk border border-mk-border bg-mk-surface text-xs font-semibold text-mk-text hover:bg-mk-elevated"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-mk-primary" />
                    <span>{pl('Wróć do teorii')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Wariant A: Karta teorii przed krokami (można pominąć i wrócić) */}
            {showingTheory && !missionCompletedView && (
              <article
                data-testid="mission-theory-card"
                className="mk-bento-card p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-mk-border">
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-mk-primary">
                      {pl('Zanim klikniemy – Kot Maks wyjaśnia dlaczego')}
                    </span>
                    <h1 className="mk-heading-1 font-bold text-mk-text">
                      {pl(activeMission.theory.title)}
                    </h1>
                    <p className="text-sm font-medium text-mk-muted">
                      {pl('Metafora przewodnia: ')}
                      <strong className="text-mk-text">{pl(activeMission.theory.metaphor)}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <BlackCatGuide mood="reading" className="w-20 h-20 hidden sm:block" />
                    <TheoryIllustration
                      illustrationId={activeMission.theory.illustrationId}
                      className="w-24 h-24 shrink-0"
                    />
                  </div>
                </div>

                <div className="space-y-4 mk-step-text text-mk-text">
                  <p className="leading-relaxed">{pl(activeMission.theory.story)}</p>
                </div>

                <div className="rounded-mk-lg bg-mk-elevated p-5 border border-mk-border space-y-2">
                  <h2 className="font-display font-bold text-base text-mk-text">
                    {pl('A mówiąc zupełnie wprost (bez metafory):')}
                  </h2>
                  <p className="text-sm text-mk-text leading-relaxed">
                    {pl(activeMission.theory.realExplanation)}
                  </p>
                </div>

                {activeMission.theory.commonMyth && (
                  <div className="rounded-mk-lg bg-mk-primarySoft p-4 border border-mk-primary text-sm text-mk-text">
                    <strong className="font-semibold text-mk-primary">
                      {pl('Częsty mit: ')}
                    </strong>
                    <span>{pl(activeMission.theory.commonMyth)}</span>
                  </div>
                )}

                {/* Przycisk Maks AI: dodatkowe wyjaśnienie na innym przykładzie */}
                <div className="rounded-mk-lg border border-mk-border bg-mk-bg p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <BlackCatGuide mood="celebrating" className="w-10 h-10 shrink-0" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-mk-primary">
                          {pl('Maks AI • Dodatkowe porównanie z życia')}
                        </div>
                        <p className="text-xs text-mk-muted">
                          {pl('Chcesz, żeby Maks opowiedział to na jeszcze prostszym przykładzie?')}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAskTheoryMaksAi(activeMission.theory)}
                      disabled={theoryAiLoading}
                      className="px-3.5 py-2 rounded-mk bg-mk-surface border border-mk-primary text-mk-primary hover:bg-mk-primarySoft text-xs font-bold transition-colors"
                    >
                      {theoryAiLoading
                        ? pl('Maks układa przykład…')
                        : pl('Opowiedz mi to inaczej (Maks AI)')}
                    </button>
                  </div>

                  {theoryAiResponse && (
                    <div className="p-3.5 rounded-mk bg-mk-surface border border-mk-border text-sm space-y-2">
                      <p className="font-medium text-mk-text">{theoryAiResponse.answer}</p>
                      {theoryAiResponse.steps.length > 0 && (
                        <ul className="space-y-1 text-xs text-mk-muted list-disc pl-5">
                          {theoryAiResponse.steps.map((s, idx) => (
                            <li key={idx}>{s}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-mk-border">
                  <button
                    type="button"
                    data-testid="skip-theory-btn"
                    onClick={() => {
                      setShowingTheory(false);
                    }}
                    className="text-sm font-semibold text-mk-muted hover:text-mk-text underline"
                  >
                    {pl('Pomiń teorię i przejdź od razu do ćwiczenia')}
                  </button>

                  <button
                    type="button"
                    data-testid="start-steps-btn"
                    onClick={() => {
                      updateProgress((prev) =>
                        markTheoryRead(prev, activeMission.theory.id || activeMission.id)
                      );
                      setShowingTheory(false);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white font-semibold text-base shadow-sm transition-colors duration-150"
                  >
                    <span>{pl('Rozumiem, zaczynamy kroki')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </article>
            )}

            {/* Wariant B: Jeden krok na ekranie (min. 18 px, licznik „krok X z Y”, Prawdziwy Mac, Maks AI, symulator) */}
            {!showingTheory && !missionCompletedView && resolvedStep && (
              <section
                data-testid="mission-step-view"
                className="mk-bento-card p-6 sm:p-8 space-y-6"
              >
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-mk-border">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-mk-muted">
                      {pl(activeMission.title)}
                    </span>
                    <div
                      data-testid="step-counter"
                      className="font-display font-bold text-lg text-mk-primary mt-0.5"
                    >
                      {pl(`krok ${currentStepIndex + 1} z ${activeMission.steps.length}`)}
                    </div>
                  </div>
                  <div className="w-40">
                    <ProgressBar
                      value={((currentStepIndex + 1) / activeMission.steps.length) * 100}
                    />
                  </div>
                </div>

                {/* Instrukcja kroku z animowanym czarnym kotkiem Maksem */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-mk-lg bg-mk-elevated border border-mk-border">
                    <BlackCatGuide
                      mood={hintLevel > 0 ? 'comforting' : 'pointing'}
                      className="w-16 h-16 shrink-0"
                    />
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-mk-primary block">
                        {pl('Kotek Maks prowadzi Cię krok po kroku:')}
                      </span>
                      <p
                        data-testid="step-instruction"
                        className="mk-step-text font-semibold text-mk-text"
                      >
                        {pl(resolvedStep.instruction)}
                      </p>
                    </div>
                  </div>

                  {/* Pasek pracy na prawdziwych aplikacjach Maca (zakreślanie na ekranie + aktywny panel żywego Maca) */}
                  <div
                    data-testid="real-mac-step-panel"
                    className={`p-5 rounded-mk-lg border-2 transition-colors space-y-3 ${
                      progress.settings.realMacMode || liveCoachActive
                        ? 'border-mk-success bg-mk-successSoft'
                        : 'border-mk-primary bg-mk-primarySoft'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-bold uppercase tracking-wider text-mk-primary flex items-center gap-1.5">
                          <Monitor className="w-4 h-4" />
                          <span>
                            {progress.settings.realMacMode || liveCoachActive
                              ? pl(
                                  `Tryb Prawdziwego Maca AKTYWNY – Maks zakreśla: ${
                                    liveCoachTargetName || detectedFrontmostApp || 'Finder'
                                  }`
                                )
                              : pl('Ćwiczenie na prawdziwym Macu (z zakreślaniem na ekranie)')}
                          </span>
                        </div>
                        <p className="text-xs text-mk-text leading-relaxed">
                          {progress.settings.realMacMode || liveCoachActive
                            ? pl(
                                `Okno MacKnow jest zadokowane z boku, a na Twoim prawdziwym ekranie świeci pomarańczowa ramka z podpowiedzią Maksa. Aktualnie wykryty program na wierzchu: ${
                                  detectedFrontmostApp || liveCoachTargetName || 'Finder'
                                }.`
                              )
                            : pl(
                                'Włącz ten tryb jednym kliknięciem, a Maks otworzy prawdziwy program na Twoim MacBooku i obrysuje na ekranie dokładne miejsce do kliknięcia!'
                              )}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          data-testid="live-mac-coach-btn"
                          onClick={() => handleToggleLiveCoach(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white text-xs font-bold shadow-sm transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>
                            {progress.settings.realMacMode || liveCoachActive
                              ? pl('Otwórz program i zakreśl ponownie na Macu')
                              : pl('Włącz i zakreśl na żywo na moim Macu')}
                          </span>
                        </button>
                        {(progress.settings.realMacMode || liveCoachActive) && (
                          <>
                            <button
                              type="button"
                              onClick={handleAdvanceStep}
                              className="px-3.5 py-2.5 rounded-mk bg-mk-success text-white text-xs font-bold shadow-sm"
                            >
                              {pl('Wykonałam to na Macu → Dalej')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleToggleLiveCoach(false)}
                              className="px-3 py-2 rounded-mk border border-mk-border bg-mk-surface text-xs font-semibold text-mk-text"
                            >
                              {pl('Wyłącz zakreślanie')}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {realtimeNotice && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="p-4 rounded-mk bg-mk-successSoft border border-mk-success text-mk-text font-semibold text-sm flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-mk-success shrink-0" />
                      <span>{realtimeNotice}</span>
                    </div>
                  )}

                  {/* Rozwijane miękko podpowiedzi po kliknięciu „Zacięłam się” lub po 60 s */}
                  {hintLevel >= 1 && (
                    <div
                      data-testid="step-hint-1"
                      className="p-4 rounded-mk-lg bg-mk-elevated border border-mk-border text-sm text-mk-text space-y-1 transition-all duration-200"
                    >
                      <div className="font-semibold text-mk-primary">
                        {pl('Podpowiedź 1 od Maksa:')}
                      </div>
                      <p>
                        {pl(
                          resolvedStep.hint ||
                            'Spójrz na podświetlony na pomarańczowo element w oknie ćwiczenia poniżej.'
                        )}
                      </p>
                    </div>
                  )}

                  {hintLevel >= 2 && (
                    <div
                      data-testid="step-hint-2"
                      className="p-4 rounded-mk-lg bg-mk-primarySoft border border-mk-primary text-sm text-mk-text space-y-1 transition-all duration-200"
                    >
                      <div className="font-semibold text-mk-primary">
                        {pl('Dokładna wskazówka krok po kroku:')}
                      </div>
                      <p>
                        {pl(
                          resolvedStep.hint2 ||
                            resolvedStep.hint ||
                            'Kliknij bezpośrednio w obrysowany przycisk w symulatorze lub przycisk „Zrobione” poniżej.'
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* Interaktywny symulator macOS */}
                <MacSimulator
                  scene={resolvedStep.simulatorScene}
                  track={activeMission.track}
                  theme={simulatorTheme}
                  onCompleteStep={handleAdvanceStep}
                />

                {/* MOCNY TRYB PODPOWIEDZI SYTUACYJNEJ MAKS AI (Gemini) */}
                <div
                  data-testid="step-ai-assistant"
                  className="mk-ai-surface p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <BlackCatGuide mood="detective" className="w-14 h-14 shrink-0" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-mk-primary flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{pl('Zapytaj Maksa AI w tej konkretnej sytuacji')}</span>
                        </div>
                        <p className="text-xs text-mk-muted mt-0.5">
                          {pl(
                            'Coś na Twoim ekranie wygląda inaczej, brakuje przycisku albo wyskoczyło okienko? Kliknij gotowe pytanie lub napisz własnymi słowami!'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Szybkie pytania sytuacyjne jednym kliknięciem */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      'U mnie na ekranie wygląda to inaczej',
                      'Nie widzę tego przycisku – gdzie go szukać?',
                      'Wyskoczyło mi inne okienko – co kliknąć?',
                      'Wyjaśnij prościej, po co to robimy',
                    ].map((quickQ) => (
                      <button
                        key={quickQ}
                        type="button"
                        onClick={() => handleAskStepMaksAi(quickQ)}
                        className="px-3 py-1.5 rounded-full border border-mk-border bg-mk-surface hover:border-mk-primary text-xs font-semibold text-mk-text transition-colors"
                      >
                        {pl(quickQ)}
                      </button>
                    ))}
                  </div>

                  {/* Pole na własne pytanie sytuacyjne do Maksa AI */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      data-testid="step-ai-input"
                      value={stepAiQuestion}
                      onChange={(e) => setStepAiQuestion(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAskStepMaksAi();
                        }
                      }}
                      placeholder={pl(
                        'Opisz, co widzisz na ekranie lub o co chcesz zapytać Maksa w tym kroku…'
                      )}
                      className="flex-1 px-4 py-2.5 rounded-mk border border-mk-border bg-mk-surface text-sm text-mk-text"
                    />
                    <button
                      type="button"
                      data-testid="step-ai-submit"
                      onClick={() => handleAskStepMaksAi()}
                      disabled={stepAiLoading}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white text-xs font-bold shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {stepAiLoading ? pl('Maks analizuje…') : pl('Zapytaj Maksa AI')}
                      </span>
                    </button>
                  </div>

                  {stepAiResponse && (
                    <div
                      data-testid="step-ai-response"
                      className="p-4 rounded-mk-lg bg-mk-surface border border-mk-primary space-y-2.5 text-sm text-mk-text"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-mk-primary">
                          {pl('Odpowiedź Kotka Maksa dopasowana do Twojej sytuacji:')}
                        </span>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-mk-primarySoft text-mk-primary">
                          {stepAiResponse.source === 'gemini' ? 'Gemini AI' : 'Koci Ekspert'}
                        </span>
                      </div>
                      <p className="font-semibold leading-relaxed">{stepAiResponse.answer}</p>
                      {stepAiResponse.steps.length > 0 && (
                        <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-mk-text">
                          {stepAiResponse.steps.map((s, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {s}
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  )}
                </div>

                {/* Dodatkowe podpowiedzi Maksa wyświetlane obok ćwiczenia („Co warto wiedzieć obok”) */}
                <div className="rounded-mk-lg bg-mk-elevated border border-mk-border p-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-mk-text">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-mk-primary text-white font-bold shrink-0">
                      {pl('Warto wiedzieć obok')}
                    </span>
                    <p className="text-mk-muted leading-relaxed">
                      {pl(
                        resolvedStep.hint ||
                          'Zwróć uwagę na górny pasek menu ekranu – zawsze pokazuje nazwę tego programu, w którym aktualnie pracujesz.'
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-mk-surface border border-mk-border font-bold text-mk-primary shrink-0">
                      {pl('Bezpieczeństwo')}
                    </span>
                    <p className="text-mk-muted leading-relaxed">
                      {pl(
                        'Gdybyś kliknęła coś przez pomyłkę na prawdziwym Macu, skrót ⌘Z (Command + Z) natychmiast cofa ostatnią czynność.'
                      )}
                    </p>
                  </div>
                </div>

                {/* Dolny pasek akcji kroku: „Zacięłam się” oraz „Zrobione” przy weryfikacji manual */}
                <div className="pt-4 border-t border-mk-border flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    data-testid="stuck-btn"
                    onClick={handleStuckClick}
                    disabled={hintLevel >= 2}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-mk border border-mk-border text-sm font-semibold transition-colors duration-150 ${
                      hintLevel >= 2
                        ? 'opacity-50 cursor-not-allowed bg-mk-elevated text-mk-muted'
                        : 'bg-mk-surface hover:bg-mk-elevated text-mk-text'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-mk-primary" />
                    <span>
                      {hintLevel === 0
                        ? pl('Zacięłam się – poproszę o podpowiedź')
                        : hintLevel === 1
                          ? pl('Nadal nie widzę – pokaż dokładniej')
                          : pl('Wszystkie podpowiedzi są już widoczne')}
                    </span>
                  </button>

                  {resolvedStep.verify.type === 'manual' && (
                    <button
                      type="button"
                      data-testid="manual-done-btn"
                      onClick={handleAdvanceStep}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white font-semibold text-sm shadow-sm transition-colors duration-150"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{pl('Zrobione')}</span>
                    </button>
                  )}
                </div>
              </section>
            )}

            {/* Wariant C: Ekran po ukończeniu misji („Umiesz to”, oneLiner, odznaka i „Następna”) */}
            {missionCompletedView && (
              <section
                data-testid="mission-completed-view"
                className="mk-bento-card p-8 text-center space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-mk-success">
                    {pl('Misja ukończona')}
                  </span>
                  <h1 className="mk-heading-1 font-bold text-mk-text">
                    {pl('Umiesz to, Małgorzato!')}
                  </h1>
                  <p className="text-mk-muted text-base max-w-xl mx-auto">
                    {pl(`Właśnie ukończyłaś zadanie „${activeMission.title}”. Kot Maks głośno mruczy z dumy!`)}
                  </p>
                </div>

                <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
                  <BlackCatGuide mood="celebrating" className="w-24 h-24" />
                  <CelebrationEmblem reward={activeMission.reward} />
                </div>

                <div className="max-w-xl mx-auto rounded-mk-lg bg-mk-elevated p-5 border border-mk-border">
                  <div className="text-xs font-semibold uppercase tracking-wider text-mk-primary mb-1">
                    {pl('Jedno zdanie do zapamiętania na zawsze')}
                  </div>
                  <p
                    data-testid="completed-oneliner"
                    className="font-display text-xl font-bold text-mk-text"
                  >
                    {pl(activeMission.theory.oneLiner)}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveScreen('tracks')}
                    className="px-5 py-3 rounded-mk border border-mk-border bg-mk-surface hover:bg-mk-elevated text-sm font-semibold text-mk-text"
                  >
                    {pl('Wróć do mapy ścieżek')}
                  </button>
                  <button
                    type="button"
                    data-testid="next-mission-btn"
                    onClick={() => {
                      const nextMission =
                        suggestedMissions.find((m) => m.id !== activeMission.id) ||
                        ALL_MISSIONS[0];
                      if (nextMission) {
                        startMission(nextMission.id);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white font-semibold text-sm shadow-sm"
                  >
                    <span>{pl('Następna')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}
          </div>
        )}

        {/* ==================== EKRAN 2: MAPA ŚCIEŻEK ==================== */}
        {activeScreen === 'tracks' && (
          <div className="space-y-8" data-testid="screen-tracks">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="mk-heading-1 font-bold text-mk-text">
                  {pl('Mapa czterech ścieżek (50 misji)')}
                </h1>
                <p className="text-mk-muted mt-1">
                  {pl(
                    'Kolejne misje odblokowują się w miarę Twoich postępów. Możesz też w każdej chwili powtórzyć ukończone już zadanie.'
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['all', 'macos', 'programy', 'iphone', 'ai'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedTrackFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      selectedTrackFilter === filter
                        ? 'bg-mk-primary text-white border-mk-primary'
                        : 'bg-mk-surface text-mk-text border-mk-border hover:bg-mk-elevated'
                    }`}
                  >
                    {filter === 'all' ? pl('Wszystkie ścieżki') : pl(TRACK_METADATA[filter].title)}
                  </button>
                ))}
              </div>
            </div>

            <MaksFunnySpot
              mood="celebrating"
              badge="Kocia mapa skarbów"
              caption="Małgorzato, przygotowałem dla Ciebie aż 50 życiowych misji – od zrozumienia czym różni się plik od teczki i drzewa katalogów, aż po chmurę iCloud oraz czat ze sztuczną inteligencją!"
            />

            {(['macos', 'programy', 'iphone', 'ai'] as TrackId[])
              .filter((t) => selectedTrackFilter === 'all' || selectedTrackFilter === t)
              .map((trackKey) => {
                const meta = TRACK_METADATA[trackKey];
                const items = visibleMissionsWithStatus.filter(
                  (item) => item.mission.track === trackKey
                );
                return (
                  <section
                    key={trackKey}
                    className="mk-bento-card p-6 space-y-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-mk-border">
                      <div className="flex items-center gap-4">
                        <TrackIllustration track={trackKey} className="w-14 h-14 shrink-0" />
                        <div>
                          <h2 className="mk-heading-2 font-bold text-mk-text">{pl(meta.title)}</h2>
                          <p className="text-sm text-mk-muted">{pl(meta.subtitle)}</p>
                        </div>
                      </div>
                      <div className="w-full sm:w-56">
                        <ProgressBar
                          value={trackSummaries[trackKey].percentage}
                          label={`${trackSummaries[trackKey].completed}/${trackSummaries[trackKey].total}`}
                          colorVar={meta.colorVar}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.map((item, idx) => (
                        <div
                          key={item.mission.id}
                          data-testid={`track-mission-${item.mission.id}`}
                          className={`rounded-mk-lg border p-4 flex flex-col justify-between gap-3 ${
                            item.completed
                              ? 'border-mk-success bg-mk-successSoft'
                              : item.unlocked
                                ? 'border-mk-border bg-mk-bg'
                                : 'border-mk-border bg-mk-elevated opacity-75'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs text-mk-muted">
                              <span>{pl(`Misja ${idx + 1} • Poziom ${item.mission.level}`)}</span>
                              <span>{item.mission.estimatedMinutes} min</span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-mk-text flex items-center gap-2">
                              {item.completed && (
                                <CheckCircle2 className="w-5 h-5 text-mk-success shrink-0" />
                              )}
                              {!item.unlocked && (
                                <Lock className="w-4 h-4 text-mk-muted shrink-0" />
                              )}
                              <span>{pl(item.mission.title)}</span>
                            </h3>
                            <p className="text-xs text-mk-muted leading-relaxed">
                              {pl(item.mission.realLifeHook)}
                            </p>
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            {item.unlocked ? (
                              <button
                                type="button"
                                onClick={() => startMission(item.mission.id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-mk bg-mk-primary text-white text-xs font-semibold hover:bg-mk-primaryHover"
                              >
                                <span>
                                  {item.completed ? pl('Powtórz misję') : pl('Rozpocznij')}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <span className="text-xs font-medium text-mk-muted flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5" />
                                <span>
                                  {pl('Ukończ wcześniejszą misję podstawową, aby odblokować')}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        )}

        {/* ==================== EKRAN 4: POGOTOWIE ==================== */}
        {activeScreen === 'emergency' && (
          <div className="max-w-3xl mx-auto space-y-6" data-testid="screen-emergency">
            <section className="mk-bento-card p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-mk-primary">
                    {pl('Szybka pomoc bez żargonu – Kotek Detektyw Maks + Gemini AI')}
                  </span>
                  <h1 className="mk-heading-1 font-bold text-mk-text">
                    {pl('Co ci nie wychodzi? Napisz po swojemu')}
                  </h1>
                  <p className="text-sm text-mk-muted">
                    {pl(
                      'Wpisz własnymi słowami dowolny problem na MacBooku – np. „skrin”, „zniknęła faktura”, „co to jest drzewo katalogów”, „okienko pyta o hasło”. Maks dopasuje misję oraz wygeneruje dla Ciebie ratunkową instrukcję AI!'
                    )}
                  </p>
                </div>
                <BlackCatGuide mood="detective" className="w-24 h-24 shrink-0" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-mk-muted absolute left-4 top-3.5" />
                  <input
                    type="text"
                    data-testid="emergency-input"
                    value={emergencyInput}
                    onChange={(e) => {
                      setEmergencyInput(e.target.value);
                      setEmergencyAiResponse(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAskEmergencyMaksAi();
                      }
                    }}
                    placeholder={pl('Np. jak zrobić screena albo gdzie zapisał się pobrany plik…')}
                    className="w-full pl-12 pr-4 py-3 rounded-mk border-2 border-mk-border bg-mk-bg text-mk-text text-base focus:border-mk-primary"
                  />
                </div>
                <button
                  type="button"
                  data-testid="emergency-ai-btn"
                  onClick={() => handleAskEmergencyMaksAi()}
                  disabled={emergencyAiLoading || !emergencyInput.trim()}
                  className="px-5 py-3 rounded-mk bg-mk-primary hover:bg-mk-primaryHover text-white text-xs font-bold shrink-0 inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {emergencyAiLoading
                      ? pl('Maks AI myśli…')
                      : pl('Rozwiąż z Maksem AI')}
                  </span>
                </button>
              </div>

              {/* Odpowiedź ratunkowa od Maksa AI (Gemini) */}
              {emergencyAiResponse && (
                <div
                  data-testid="emergency-ai-response"
                  className="mk-ai-surface p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-mk-primary">
                      {pl('Detektyw Maks AI odpowiada krok po kroku:')}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-mk-primarySoft text-mk-primary">
                      {emergencyAiResponse.source === 'gemini' ? 'Gemini AI' : 'Koci Ratownik'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-mk-text leading-relaxed">
                    {emergencyAiResponse.answer}
                  </p>
                  {emergencyAiResponse.steps.length > 0 && (
                    <ol className="list-decimal pl-5 space-y-1.5 text-sm text-mk-text">
                      {emergencyAiResponse.steps.map((s, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {s}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              )}

              {(() => {
                const matchRes = matchEmergencyQuery(emergencyInput, ALL_MISSIONS);
                if (!emergencyInput.trim()) {
                  return (
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-mk-muted">
                        {pl('Najczęstsze sytuacje ratunkowe (kliknij, aby sprawdzić):')}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Jak zrobić screena ekranu',
                          'Pobrałam plik i zniknął',
                          'Czym się różni plik od teczki',
                          'Co to jest chmura iCloud',
                          'Okno schowało się pod spodem',
                          'Usunęłam dokument do kosza',
                          'Słuchawki blutut nie działają',
                        ].map((sample) => (
                          <button
                            key={sample}
                            type="button"
                            onClick={() => {
                              setEmergencyInput(sample);
                              handleAskEmergencyMaksAi(sample);
                            }}
                            className="px-3 py-1.5 rounded-full border border-mk-border bg-mk-elevated text-xs font-semibold text-mk-text hover:border-mk-primary"
                          >
                            {pl(sample)}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (matchRes.matchedMissions.length > 0) {
                  return (
                    <div className="space-y-3 pt-2" data-testid="emergency-results">
                      <h2 className="font-display font-bold text-lg text-mk-text">
                        {pl('Gotowe ćwiczenia krok po kroku pasujące do Twojego pytania:')}
                      </h2>
                      {matchRes.matchedMissions.map(({ mission }) => (
                        <div
                          key={mission.id}
                          data-testid={`emergency-match-${mission.id}`}
                          className="rounded-mk-lg border border-mk-border bg-mk-bg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <TrackBadge track={mission.track} />
                            <h3 className="font-display font-bold text-lg text-mk-text pt-1">
                              {pl(mission.title)}
                            </h3>
                            <p className="text-xs text-mk-muted">{pl(mission.realLifeHook)}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => startMission(mission.id)}
                            className="px-4 py-2.5 rounded-mk bg-mk-primary text-white text-xs font-semibold shrink-0"
                          >
                            {pl('Pokaż krok po kroku')}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }

                return (
                  <div className="space-y-4 pt-2" data-testid="emergency-fallback">
                    <p className="text-sm text-mk-muted">
                      {pl(
                        'Kliknij przycisk „Rozwiąż z Maksem AI” powyżej, aby Maks przygotował instrukcję dokładnie dla tego pytania, albo wybierz jedną z poniższych ścieżek:'
                      )}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {matchRes.fallbackTracks.map((trackKey) => (
                        <button
                          key={trackKey}
                          type="button"
                          onClick={() => {
                            setSelectedTrackFilter(trackKey);
                            setActiveScreen('tracks');
                          }}
                          className="p-4 rounded-mk-lg border border-mk-border bg-mk-bg hover:border-mk-primary text-left"
                        >
                          <div className="font-display font-bold text-base text-mk-text">
                            {pl(TRACK_METADATA[trackKey].title)}
                          </div>
                          <p className="text-xs text-mk-muted mt-1">
                            {pl(TRACK_METADATA[trackKey].subtitle)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </section>
          </div>
        )}

        {/* ==================== EKRAN 5: BIBLIOTEKA ==================== */}
        {activeScreen === 'library' && (
          <div className="space-y-8" data-testid="screen-library">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="mk-heading-1 font-bold text-mk-text">
                  {pl('Biblioteka zrozumienia z Profesorem Maksem')}
                </h1>
                <p className="text-mk-muted mt-1">
                  {pl(
                    'Wszystkie karty teorii zebrane jak rozdziały dobrze złożonej książki. Czytaj w dowolnej kolejności.'
                  )}
                </p>
              </div>
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-mk-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={libraryQuery}
                  onChange={(e) => setLibraryQuery(e.target.value)}
                  placeholder={pl('Szukaj w Bibliotece…')}
                  className="w-full pl-10 pr-3 py-2 rounded-mk border border-mk-border bg-mk-surface text-sm"
                />
              </div>
            </div>

            <MaksFunnySpot
              mood="reading"
              badge="Profesor Maks w okularach"
              caption="Kiedy rozumiesz, dlaczego Mac robi coś w określony sposób (np. czym różni się chmura iCloud od dysku w komputerze), żaden komunikat już Cię nie zaskoczy!"
            />

            {activeLibraryCard ? (
              <article className="mk-bento-card p-6 sm:p-8 space-y-6 max-w-3xl mx-auto">
                <button
                  type="button"
                  onClick={() => setActiveLibraryCard(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-mk-primary"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{pl('Wróć do spisu wszystkich rozdziałów')}</span>
                </button>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-mk-border">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-mk-primary">
                      {pl(activeLibraryCard.category || 'Rozdział Biblioteki')}
                    </span>
                    <h2 className="mk-heading-1 font-bold text-mk-text mt-1">
                      {pl(activeLibraryCard.title)}
                    </h2>
                    <p className="text-sm text-mk-muted mt-1">
                      {pl('Metafora: ')}
                      <strong className="text-mk-text">{pl(activeLibraryCard.metaphor)}</strong>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <BlackCatGuide mood="reading" className="w-20 h-20 hidden sm:block" />
                    <TheoryIllustration
                      illustrationId={activeLibraryCard.illustrationId}
                      className="w-24 h-24 shrink-0"
                    />
                  </div>
                </div>
                <p className="mk-step-text leading-relaxed text-mk-text">
                  {pl(activeLibraryCard.story)}
                </p>
                <div className="p-5 rounded-mk-lg bg-mk-elevated border border-mk-border space-y-1.5">
                  <h3 className="font-display font-bold text-base text-mk-text">
                    {pl('Wyjaśnienie techniczne po ludzku:')}
                  </h3>
                  <p className="text-sm text-mk-text leading-relaxed">
                    {pl(activeLibraryCard.realExplanation)}
                  </p>
                </div>
                <div className="p-4 rounded-mk-lg bg-mk-primarySoft border border-mk-primary font-display font-bold text-base text-mk-text">
                  {pl(activeLibraryCard.oneLiner)}
                </div>
              </article>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {['all']
                    .concat(
                      Array.from(
                        new Set(allTheoryCards.map((c) => c.category || 'Podstawy systemu macOS'))
                      )
                    )
                    .map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategoryFilter(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                          selectedCategoryFilter === cat
                            ? 'bg-mk-primary text-white border-mk-primary'
                            : 'bg-mk-surface text-mk-text border-mk-border'
                        }`}
                      >
                        {cat === 'all' ? pl('Wszystkie tematy') : pl(cat)}
                      </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allTheoryCards
                    .filter((card) => {
                      const matchesCat =
                        selectedCategoryFilter === 'all' ||
                        card.category === selectedCategoryFilter;
                      const q = libraryQuery.trim().toLowerCase();
                      const matchesQ =
                        !q ||
                        card.title.toLowerCase().indexOf(q) !== -1 ||
                        card.metaphor.toLowerCase().indexOf(q) !== -1 ||
                        card.story.toLowerCase().indexOf(q) !== -1;
                      return matchesCat && matchesQ;
                    })
                    .map((card) => {
                      const cardId = card.id || card.illustrationId;
                      const isRead = progress.readTheoryIds.indexOf(cardId) !== -1;
                      return (
                        <article
                          key={cardId}
                          onClick={() => {
                            updateProgress((prev) => markTheoryRead(prev, cardId));
                            setActiveLibraryCard(card);
                          }}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              updateProgress((prev) => markTheoryRead(prev, cardId));
                              setActiveLibraryCard(card);
                            }
                          }}
                          className="mk-bento-card mk-bento-card-interactive p-6 cursor-pointer flex items-start justify-between gap-4"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold uppercase tracking-wider text-mk-primary">
                                {pl(card.category || 'Rozdział')}
                              </span>
                              {isRead && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mk-successSoft text-mk-success text-[11px] font-semibold">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>{pl('Przeczytane')}</span>
                                </span>
                              )}
                            </div>
                            <h2 className="font-display font-bold text-xl text-mk-text">
                              {pl(card.title)}
                            </h2>
                            <p className="text-xs text-mk-muted">{pl(card.metaphor)}</p>
                            <p className="text-sm font-medium text-mk-text pt-1">
                              {pl(card.oneLiner)}
                            </p>
                          </div>
                          <TheoryIllustration
                            illustrationId={card.illustrationId}
                            className="w-16 h-16 shrink-0"
                          />
                        </article>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== EKRAN 6: HISTORIA ==================== */}
        {activeScreen === 'history' && (
          <div className="max-w-4xl mx-auto space-y-6" data-testid="screen-history">
            <div>
              <h1 className="mk-heading-1 font-bold text-mk-text">
                {pl('Twoja historia i powody do dumy')}
              </h1>
              <p className="text-mk-muted mt-1">
                {pl(
                  'Każda ukończona misja to jedna konkretna umiejętność, która zostaje z Tobą na stałe.'
                )}
              </p>
            </div>

            <MaksFunnySpot
              mood="celebrating"
              badge="Kronika sukcesów Małgorzaty"
              caption="Każdy medal w tej kronice oznacza jedną rzecz, o którą nie musisz już nikogo pytać – zrobiłaś ją własnymi rękami!"
            />

            {Object.keys(progress.completedMissions).length === 0 ? (
              <div className="mk-bento-card p-8 text-center space-y-4">
                <p className="mk-step-text text-mk-text font-medium">
                  {pl('Twoja kronika czeka na pierwszą ukończoną misję.')}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveScreen('start')}
                  className="px-5 py-2.5 rounded-mk bg-mk-primary text-white text-sm font-semibold"
                >
                  {pl('Wybierz pierwsze zadanie na dziś')}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.values(progress.completedMissions)
                  .slice()
                  .sort((a, b) => (a.completedAt < b.completedAt ? 1 : -1))
                  .map((rec) => {
                    const mission = ALL_MISSIONS.find((m) => m.id === rec.missionId);
                    if (!mission) return null;
                    const formattedDate = new Date(rec.completedAt).toLocaleDateString('pl-PL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    });
                    return (
                      <div
                        key={rec.missionId}
                        className="mk-bento-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <TrackBadge track={mission.track} />
                            <span className="text-xs text-mk-muted">{formattedDate}</span>
                          </div>
                          <h2 className="font-display font-bold text-lg text-mk-text pt-1">
                            {pl(mission.title)}
                          </h2>
                          <p className="text-xs text-mk-muted">
                            {rec.hintsUsed === 0
                              ? pl('Ukończona samodzielnie bez otwierania podpowiedzi')
                              : pl(`Skorzystałaś z podpowiedzi: ${rec.hintsUsed}×`)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mk-successSoft text-mk-success text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{pl(mission.reward)}</span>
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ==================== EKRAN 7: USTAWIENIA ==================== */}
        {activeScreen === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6" data-testid="screen-settings">
            <div>
              <h1 className="mk-heading-1 font-bold text-mk-text">
                {pl('Ustawienia aplikacji MacKnow')}
              </h1>
              <p className="text-mk-muted mt-1">
                {pl('Dopasuj wielkość liter, kolory, tryb pracy z Maksem oraz kopię zapasową swojego postępu.')}
              </p>
            </div>

            <MaksFunnySpot
              mood="sleeping"
              badge="Drzemka Maksa na zasilaczu"
              caption="Kiedy nie ćwiczysz, najchętniej drzemię zwinięty w kłębek obok ciepłego zasilacza MacBooka. Tutaj możesz dopasować wielkość liter i włączyć ćwiczenia na prawdziwym Macu!"
            />

            <div className="mk-bento-card p-6 space-y-6">
              {/* Rozmiar czcionki (3 stopnie) */}
              <div className="space-y-2 pb-6 border-b border-mk-border">
                <h2 className="font-display font-bold text-lg text-mk-text">
                  {pl('Rozmiar tekstu (3 stopnie)')}
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'normal' as FontSizeScale, label: 'Standardowy (18 px)' },
                    { id: 'large' as FontSizeScale, label: 'Powiększony (20 px)' },
                    { id: 'xlarge' as FontSizeScale, label: 'Bardzo duży (22 px)' },
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      type="button"
                      data-testid={`font-scale-${scale.id}`}
                      onClick={() =>
                        updateProgress((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, fontSize: scale.id },
                        }))
                      }
                      className={`p-3 rounded-mk border text-sm font-semibold ${
                        progress.settings.fontSize === scale.id
                          ? 'border-mk-primary bg-mk-primary text-white'
                          : 'border-mk-border bg-mk-bg text-mk-text'
                      }`}
                    >
                      {pl(scale.label)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tryb jasny / ciemny */}
              <div className="space-y-2 pb-6 border-b border-mk-border">
                <h2 className="font-display font-bold text-lg text-mk-text">
                  {pl('Motyw kolorystyczny')}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'light' as ColorMode, label: 'Jasny (ciepły papier)' },
                    { id: 'dark' as ColorMode, label: 'Ciemny (wieczorny spokój)' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      data-testid={`color-mode-${mode.id}`}
                      onClick={() =>
                        updateProgress((prev) => ({
                          ...prev,
                          settings: { ...prev.settings, colorMode: mode.id },
                        }))
                      }
                      className={`p-3 rounded-mk border text-sm font-semibold ${
                        progress.settings.colorMode === mode.id
                          ? 'border-mk-primary bg-mk-primary text-white'
                          : 'border-mk-border bg-mk-bg text-mk-text'
                      }`}
                    >
                      {pl(mode.label)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tryb prawdziwego Maca wł./wył. */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-mk-border">
                <div>
                  <h2 className="font-display font-bold text-lg text-mk-text">
                    {pl('Tryb prawdziwego Maca (zakreślanie na ekranie i weryfikacja na żywo)')}
                  </h2>
                  <p className="text-xs text-mk-muted">
                    {pl(
                      'Gdy włączysz ten tryb, Kot Maks zadokuje okno z prawej strony, otworzy prawdziwe programy na Twoim MacBooku i obrysuje na ekranie miejsce do kliknięcia.'
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  data-testid="toggle-real-mac-mode"
                  onClick={() => handleSetRealMacMode(!progress.settings.realMacMode)}
                  className={`px-4 py-2.5 rounded-mk text-xs font-bold shrink-0 ${
                    progress.settings.realMacMode
                      ? 'bg-mk-success text-white shadow-sm'
                      : 'bg-mk-elevated text-mk-text border border-mk-border'
                  }`}
                >
                  {progress.settings.realMacMode ? pl('Włączony (Prawdziwy Mac)') : pl('Wyłączony (Symulator)')}
                </button>
              </div>

              {/* Ręczne nadpisanie wersji systemu macOS */}
              <div className="space-y-2 pb-6 border-b border-mk-border">
                <label
                  htmlFor="manual-os-select"
                  className="font-display font-bold text-lg text-mk-text block"
                >
                  {pl('Wersja systemu macOS (ręczne nadpisanie)')}
                </label>
                <select
                  id="manual-os-select"
                  data-testid="manual-os-select"
                  value={progress.settings.manualOsOverride || ''}
                  onChange={(e) =>
                    updateProgress((prev) => ({
                      ...prev,
                      settings: {
                        ...prev.settings,
                        manualOsOverride: e.target.value || null,
                      },
                    }))
                  }
                  className="w-full p-3 rounded-mk border border-mk-border bg-mk-bg text-mk-text text-sm"
                >
                  <option value="">{pl('Automatycznie lub według wyboru ze Startu')}</option>
                  <option value="10.13.6">macOS 10.13 High Sierra</option>
                  <option value="10.14.6">macOS 10.14 Mojave</option>
                  <option value="10.15.7">macOS 10.15 Catalina</option>
                  <option value="12.7.4">macOS 12 Monterey</option>
                  <option value="13.6.0">macOS 13 Ventura</option>
                  <option value="14.5.0">macOS 14 Sonoma</option>
                  <option value="15.1.0">macOS 15 Sequoia / Tahoe</option>
                </select>
              </div>

              {/* Eksport i import postępu JSON */}
              <div className="space-y-3">
                <h2 className="font-display font-bold text-lg text-mk-text">
                  {pl('Kopia zapasowa Twoich postępów (JSON)')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    data-testid="export-progress-btn"
                    onClick={() => {
                      const json = exportProgressToJson(progress);
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'macknow-postep-malgorzaty.json';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-mk bg-mk-primary text-white text-xs font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>{pl('Eksportuj postęp do pliku JSON')}</span>
                  </button>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-mk border border-mk-border bg-mk-bg text-mk-text text-xs font-semibold cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>{pl('Importuj postęp z pliku JSON')}</span>
                    <input
                      type="file"
                      accept=".json,application/json"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          try {
                            const imported = importProgressFromJson(String(reader.result || ''));
                            updateProgress(() => imported);
                            setImportStatusMsg(pl('Pomyślnie wczytano zapisany postęp!'));
                          } catch {
                            setImportStatusMsg(
                              pl('Nie udało się odczytać pliku – upewnij się, że to plik z MacKnow.')
                            );
                          }
                        };
                        reader.readAsText(file);
                      }}
                    />
                  </label>
                </div>
                {importStatusMsg && (
                  <p className="text-xs font-semibold text-mk-primary">{importStatusMsg}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
