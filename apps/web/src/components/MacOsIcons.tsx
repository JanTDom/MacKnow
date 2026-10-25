'use client';

import React from 'react';

/**
 * Zestaw wiernych, szczegółowych ikon systemu macOS (SVG) używanych w symulatorze MacBooka:
 * - Logo Apple () w pasku menu
 * - Ikony paska Dock: Finder (uśmiechnięta dwukolorowa twarz), Launchpad, Safari (kompas),
 *   Mail (koperta na błękitnym tle), Zdjęcia (tęczowy kwiatek), Podgląd (zdjęcie z lupą),
 *   Notatki (żółty nagłówek notatnika), Ustawienia/Preferencje systemowe (metalowe koła zębate),
 *   Kosz (metalowy kosz pusty oraz z dokumentami)
 * - Ikony Biurka i Findera: Dysk Macintosh HD, Błękitna teczka macOS, Dokument PDF z podglądem,
 *   Zrzut ekranu z miniaturą, Żółta kłódka Preferencji systemowych, Centrum sterowania.
 */

export function AppleMenuLogo({ className = 'w-3.5 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 170" fill="currentColor" className={className} aria-hidden="true">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.93-9.29-10.76-20.03-14.48-32.21-3.72-12.18-5.58-23.38-5.58-33.6 0-12.71 3.17-23.16 9.51-31.34 6.34-8.18 14.38-12.42 24.11-12.72 4.92 0 10.42 1.48 16.51 4.44 6.09 2.96 10.01 4.49 11.77 4.61 1.45 0 5.79-1.77 13.02-5.31 7.23-3.54 13.39-5.02 18.48-4.44 13.65 1.1 23.91 6.48 30.78 16.14-12.22 7.42-18.18 17.81-17.89 31.18.29 10.4 4.16 19.05 11.61 25.95 5.19 4.89 11.33 7.82 18.42 8.79-1.48 4.54-3.12 8.95-4.93 13.23zM119.22 31.02c0 8.15-2.98 15.79-8.93 22.92-7.18 8.4-15.88 13.25-25.31 12.48-.19-.97-.29-2.03-.29-3.19 0-7.82 3.4-16.19 9.45-23.09 3.02-3.48 6.86-6.38 11.52-8.7 4.66-2.32 9.08-3.61 13.26-3.87.2 1.22.3 2.37.3 3.45z" />
    </svg>
  );
}

export function ControlCenterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="4" width="20" height="7" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="7.5" r="2.2" fill="currentColor" />
      <rect x="2" y="13" width="20" height="7" rx="3.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6.5" cy="16.5" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function FinderDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="finderLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#32A5F8" />
          <stop offset="100%" stopColor="#1473E6" />
        </linearGradient>
        <linearGradient id="finderRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EBF6FF" />
          <stop offset="100%" stopColor="#BDE0FE" />
        </linearGradient>
      </defs>
      {/* Squircle tło */}
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="url(#finderRight)" stroke="#0D5BD9" strokeWidth="0.7" />
      {/* Lewa niebieska połowa twarzy Findera z charakterystycznym profilem nosa */}
      <path
        d="M16.5 3H34.5C34.5 18 30 27 29.5 34.5H36C35 45 36.5 53 38 61H16.5C9.04 61 3 54.96 3 47.5V16.5C3 9.04 9.04 3 16.5 3Z"
        fill="url(#finderLeft)"
      />
      {/* Linia podziału twarzy */}
      <path
        d="M34.5 3.5C34 18 29.8 26.8 29.5 34.5H36C35.2 44.5 36.4 53 38 60.5"
        fill="none"
        stroke="#0B47A1"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Oczy */}
      <rect x="17.5" y="18.5" width="3.6" height="7.5" rx="1.8" fill="#0B2E59" />
      <rect x="43" y="18.5" width="3.6" height="7.5" rx="1.8" fill="#0B2E59" />
      {/* Uśmiech */}
      <path
        d="M17.5 42.5C23 49.5 41 49.5 46.5 42.5"
        fill="none"
        stroke="#0B2E59"
        strokeWidth="3.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LaunchpadDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="11" y="11" width="11" height="11" rx="3" fill="#FF3B30" />
      <rect x="26.5" y="11" width="11" height="11" rx="3" fill="#FF9500" />
      <rect x="42" y="11" width="11" height="11" rx="3" fill="#FFCC00" />
      <rect x="11" y="26.5" width="11" height="11" rx="3" fill="#34C759" />
      <rect x="26.5" y="26.5" width="11" height="11" rx="3" fill="#007AFF" />
      <rect x="42" y="26.5" width="11" height="11" rx="3" fill="#5856D6" />
      <rect x="11" y="42" width="11" height="11" rx="3" fill="#AF52DE" />
      <rect x="26.5" y="42" width="11" height="11" rx="3" fill="#FF2D55" />
      <rect x="42" y="42" width="11" height="11" rx="3" fill="#5AC8FA" />
    </svg>
  );
}

export function SafariDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="safariBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4CC2FF" />
          <stop offset="100%" stopColor="#0066EE" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <circle cx="32" cy="32" r="25" fill="url(#safariBg)" />
      {/* Podziałka kompasu */}
      <circle cx="32" cy="32" r="21.5" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="1.8 4.2" opacity="0.85" />
      {/* Igła kompasu – czerwona góra-prawo, biała dół-lewo */}
      <polygon points="45,19 35.5,35.5 28.5,28.5" fill="#FF3B30" />
      <polygon points="19,45 35.5,35.5 28.5,28.5" fill="#FFFFFF" />
      <circle cx="32" cy="32" r="2.2" fill="#E2E8F0" />
    </svg>
  );
}

export function MailDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mailBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#56CCF2" />
          <stop offset="100%" stopColor="#1B75E8" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="url(#mailBg)" />
      <rect x="11" y="17" width="42" height="30" rx="4" fill="#FFFFFF" />
      <path d="M12 19L32 34L52 19" fill="none" stroke="#1B75E8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 45L25 32M52 45L39 32" fill="none" stroke="#93C5FD" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function PhotosDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <g transform="translate(32,32)">
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#FF9500" opacity="0.88" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#FFCC00" opacity="0.88" transform="rotate(45)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#34C759" opacity="0.88" transform="rotate(90)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#5AC8FA" opacity="0.88" transform="rotate(135)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#007AFF" opacity="0.88" transform="rotate(180)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#5856D6" opacity="0.88" transform="rotate(225)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#AF52DE" opacity="0.88" transform="rotate(270)" />
        <rect x="-5" y="-21" width="10" height="17" rx="5" fill="#FF2D55" opacity="0.88" transform="rotate(315)" />
      </g>
    </svg>
  );
}

export function PreviewDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="#E0F2FE" stroke="#7DD3FC" strokeWidth="1" />
      {/* Krajobraz wewnątrz ikony Podglądu */}
      <circle cx="22" cy="21" r="5" fill="#FBBF24" />
      <path d="M6 48L20 33L32 43L44 30L58 48V50C58 55.5 54 59 48 59H16C10 59 6 55.5 6 50V48Z" fill="#0284C7" />
      {/* Lupa */}
      <circle cx="38" cy="34" r="11" fill="#FFFFFF" fillOpacity="0.85" stroke="#475569" strokeWidth="3" />
      <line x1="46" y1="42" x2="54" y2="50" stroke="#334155" strokeWidth="4.2" strokeLinecap="round" />
    </svg>
  );
}

export function NotesDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M3 16.5C3 9.04 9.04 3 16.5 3H47.5C54.96 3 61 9.04 61 16.5V20H3V16.5Z" fill="#FACC15" />
      <line x1="3" y1="20.5" x2="61" y2="20.5" stroke="#EAB308" strokeWidth="1.5" />
      <line x1="12" y1="31" x2="52" y2="31" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="12" y1="41" x2="52" y2="41" stroke="#E2E8F0" strokeWidth="2" />
      <line x1="12" y1="51" x2="40" y2="51" stroke="#E2E8F0" strokeWidth="2" />
    </svg>
  );
}

export function SettingsDockIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="settingsBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D1D5DB" />
          <stop offset="100%" stopColor="#6B7280" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="58" height="58" rx="13.5" fill="url(#settingsBg)" stroke="#4B5563" strokeWidth="0.8" />
      <circle cx="32" cy="32" r="21" fill="#374151" />
      {/* Zęby koła zębatego */}
      <circle cx="32" cy="32" r="16" fill="none" stroke="#E5E7EB" strokeWidth="5" strokeDasharray="5.2 3.2" />
      <circle cx="32" cy="32" r="13" fill="none" stroke="#D1D5DB" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="6" fill="#9CA3AF" stroke="#F3F4F6" strokeWidth="2" />
    </svg>
  );
}

export function TrashDockIcon({
  className = 'w-11 h-11',
  hasFiles = false,
}: {
  className?: string;
  hasFiles?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="trashBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
      </defs>
      {hasFiles && (
        <g>
          {/* Zgniecione kartki papieru wystające z Kosza */}
          <polygon points="18,16 25,9 32,15 28,21" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
          <polygon points="30,14 39,8 46,16 36,21" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
          <polygon points="23,17 33,11 40,18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.8" />
        </g>
      )}
      {/* Korpus metalowego kosza macOS */}
      <path
        d="M14 16H50L46 56C45.7 58.5 43.5 60 41 60H23C20.5 60 18.3 58.5 18 56L14 16Z"
        fill="url(#trashBody)"
        stroke="#64748B"
        strokeWidth="1.5"
      />
      {/* Górna obręcz kosza */}
      <ellipse cx="32" cy="16" rx="18" ry="3.5" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
      {/* Siatka pionowa */}
      <line x1="22" y1="21" x2="24" y2="55" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="28.5" y1="21" x2="29.5" y2="55" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="35.5" y1="21" x2="34.5" y2="55" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="42" y1="21" x2="40" y2="55" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function MacFolderIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 54" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="macFolderFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#66D1FF" />
          <stop offset="100%" stopColor="#1994FF" />
        </linearGradient>
      </defs>
      {/* Tylna zakładka teczki */}
      <path
        d="M4 10C4 6.69 6.69 4 10 4H24L29 10H54C57.31 10 60 12.69 60 16V44C60 47.31 57.31 50 54 50H10C6.69 50 4 47.31 4 44V10Z"
        fill="#007AFF"
      />
      {/* Przednia okładka teczki */}
      <rect x="4" y="14" width="56" height="36" rx="5" fill="url(#macFolderFront)" stroke="#7CE0FF" strokeWidth="0.8" />
    </svg>
  );
}

export function MacPdfFileIcon({
  className = 'w-10 h-12',
  badge = 'PDF',
}: {
  className?: string;
  badge?: string;
}) {
  const badgeColor =
    badge === 'PDF' ? '#E11D48' : badge === 'PNG' ? '#0284C7' : '#2563EB';
  return (
    <svg viewBox="0 0 52 64" className={className} aria-hidden="true">
      {/* Kartka z zagiętym rogiem */}
      <path
        d="M6 6C6 3.79 7.79 2 10 2H34L46 14V58C46 60.21 44.21 62 42 62H10C7.79 62 6 60.21 6 58V6Z"
        fill="#FFFFFF"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />
      <path d="M34 2V11C34 12.66 35.34 14 37 14H46L34 2Z" fill="#E2E8F0" />
      {/* Mini tekst na kartce */}
      <line x1="13" y1="22" x2="33" y2="22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="28" x2="39" y2="28" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="34" x2="36" y2="34" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      {/* Plakietka PDF / PNG / DOCX */}
      <rect x="10" y="42" width="32" height="13" rx="3" fill={badgeColor} />
      <text
        x="26"
        y="51.5"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="8.5"
        fontWeight="bold"
        fontFamily="sans-serif"
      >
        {badge}
      </text>
    </svg>
  );
}

export function MacintoshHdIcon({ className = 'w-11 h-11' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hdMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="75%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      <path
        d="M12 12H52L58 44V50C58 52.2 56.2 54 54 54H10C7.8 54 6 52.2 6 50V44L12 12Z"
        fill="url(#hdMetal)"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <rect x="6" y="43" width="52" height="9" rx="2" fill="#334155" />
      <circle cx="50" cy="47.5" r="1.8" fill="#34D399" />
    </svg>
  );
}

export function ClassicPadlockIcon({
  className = 'w-9 h-9',
  locked = true,
}: {
  className?: string;
  locked?: boolean;
}) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {/* Pałąk kłódki */}
      <path
        d={
          locked
            ? 'M15 21V14C15 9.03 19.03 5 24 5C28.97 5 33 9.03 33 14V21'
            : 'M15 21V13C15 8.03 19.03 4 24 4C28.2 4 31.6 6.8 32.6 10.6'
        }
        fill="none"
        stroke="#94A3B8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Mosiężny korpus kłódki */}
      <rect x="10" y="20" width="28" height="22" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <rect x="12" y="22" width="24" height="5" rx="1" fill="#FCD34D" opacity="0.55" />
      <circle cx="24" cy="30" r="2.5" fill="#78350F" />
      <path d="M23 31.5L22 36H26L25 31.5Z" fill="#78350F" />
    </svg>
  );
}
