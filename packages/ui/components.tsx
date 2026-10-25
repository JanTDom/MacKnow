import { TrackId } from './illustrations';
import { pl } from './typography/polish';

/**
 * Komponenty bazowe Design Systemu MacKnow.
 * Przestrzegają siatki 8 px, używają wyłącznie tokenów CSS (--mk-*),
 * zapewniają wysoką czytelność (tekst misji min. 18 px) oraz dostępność WCAG AA.
 */

export const TRACK_METADATA: Record<
  TrackId,
  {
    title: string;
    subtitle: string;
    colorVar: string;
  }
> = {
  macos: {
    title: 'System macOS',
    subtitle: 'Pulpit, pliki, skróty i święty spokój na co dzień',
    colorVar: 'var(--mk-track-macos)',
  },
  programy: {
    title: 'Codzienne programy',
    subtitle: 'Mail, Safari, dokumenty, PDF-y i rozmowy wideo',
    colorVar: 'var(--mk-track-programy)',
  },
  iphone: {
    title: 'iPhone + Mac',
    subtitle: 'Zdjęcia, hasła i przesyłanie rzeczy bez żadnego kabla',
    colorVar: 'var(--mk-track-iphone)',
  },
  ai: {
    title: 'Sztuczna inteligencja',
    subtitle: 'Dyktowanie, streszczanie pism i mądre sprawdzanie faktów',
    colorVar: 'var(--mk-track-ai)',
  },
};

export function MacKnowLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      <svg
        viewBox="0 0 48 48"
        className="w-10 h-10 shrink-0"
        fill="none"
        role="img"
        aria-label="Sygnet MacKnow"
      >
        <rect x="2" y="2" width="44" height="44" rx="12" fill="var(--mk-primary)" />
        <path
          d="M14 34V18C14 16.8954 14.8954 16 16 16H20.5L24 22L27.5 16H32C33.1046 16 34 16.8954 34 18V34"
          stroke="#FAF7F2"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="24" cy="32" r="3" fill="#FAF7F2" />
      </svg>
      {!compact && (
        <div className="flex flex-col">
          <span className="font-display text-xl font-bold tracking-tight text-mk-text leading-none">
            MacKnow
          </span>
          <span className="text-xs text-mk-muted mt-1">
            {pl('Przewodnik Małgorzaty')}
          </span>
        </div>
      )}
    </div>
  );
}

export function TrackBadge({ track }: { track: TrackId }) {
  const meta = TRACK_METADATA[track];
  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
      style={{
        borderColor: meta.colorVar,
        color: meta.colorVar,
        backgroundColor: 'var(--mk-surface-elevated)',
      }}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: meta.colorVar }}
      />
      {pl(meta.title)}
    </span>
  );
}

export function ProgressBar({
  value,
  label,
  colorVar = 'var(--mk-primary)',
}: {
  value: number;
  label?: string;
  colorVar?: string;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center text-sm mb-1.5">
          <span className="font-medium text-mk-text">{pl(label)}</span>
          <span className="text-mk-muted font-semibold">{clamped}%</span>
        </div>
      )}
      <div
        className="w-full h-2.5 rounded-full overflow-hidden border border-mk-border"
        style={{ backgroundColor: 'var(--mk-surface-elevated)' }}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all duration-200"
          style={{
            width: `${clamped}%`,
            backgroundColor: colorVar,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Eleganckie wyróżnienie skrótu klawiszowego w polskiej notacji Apple (np. ⌘C, ⌘⇧5).
 */
export function KbdShortcut({ shortcut }: { shortcut: string }) {
  return (
    <kbd
      className="inline-flex items-center px-2 py-0.5 mx-0.5 text-sm font-semibold rounded border border-mk-border shadow-sm"
      style={{
        backgroundColor: 'var(--mk-surface-elevated)',
        color: 'var(--mk-text)',
        fontFamily: 'var(--mk-font-sans)',
      }}
    >
      {shortcut}
    </kbd>
  );
}

/**
 * Dopracowana, lekka animacja sukcesu po ukończeniu misji (czysto wektorowa SVG + CSS, respektuje prefers-reduced-motion).
 */
export function CelebrationEmblem({ reward }: { reward: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-mk-xl border border-mk-border bg-mk-surface shadow-sm">
      <div className="relative w-24 h-24 flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 96 96"
          className="w-24 h-24 mk-celebration-emblem"
          fill="none"
          role="img"
          aria-label="Odznaka ukończenia misji"
        >
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="var(--mk-success-soft)"
            stroke="var(--mk-success)"
            strokeWidth="3"
          />
          <circle
            cx="48"
            cy="48"
            r="33"
            stroke="var(--mk-success)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M32 49L43 60L65 37"
            stroke="var(--mk-success)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest text-mk-muted mb-1">
        {pl('Zdobyta odznaka')}
      </span>
      <p className="font-display text-xl font-bold text-mk-text">
        {pl(reward)}
      </p>
    </div>
  );
}
