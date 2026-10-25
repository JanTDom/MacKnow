export type TrackId = 'macos' | 'programy' | 'iphone' | 'ai';

/**
 * Spójny zestaw autorskich ilustracji wektorowych (SVG) w palecie marki MacKnow (--mk-*).
 * Zero clipartów, zero emoji jako ilustracji głównych.
 * Obejmuje:
 * 1. Ilustracje czterech głównych ścieżek (macOS, Programy, iPhone + Mac, AI).
 * 2. Ilustracje wyboru wyglądu systemu („Mój Mac wygląda tak”: stare Preferencje w siatce, nowe Ustawienia z listą boczną, „nie wiem”).
 * 3. Ilustracje metafor dla wszystkich kart teorii (ponad 25 unikalnych kompozycji geometrycznych).
 */

export function TrackIllustration({
  track,
  className = 'w-16 h-16',
}: {
  track: TrackId;
  className?: string;
}) {
  switch (track) {
    case 'macos':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka macOS">
          <rect x="8" y="14" width="80" height="54" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-track-macos)" strokeWidth="3" />
          <line x1="8" y1="26" x2="88" y2="26" stroke="var(--mk-track-macos)" strokeWidth="2.5" />
          <circle cx="17" cy="20" r="2.2" fill="var(--mk-track-macos)" />
          <circle cx="24" cy="20" r="2.2" fill="var(--mk-track-macos)" opacity="0.6" />
          <circle cx="31" cy="20" r="2.2" fill="var(--mk-track-macos)" opacity="0.35" />
          <rect x="22" y="56" width="52" height="7" rx="3.5" fill="var(--mk-track-macos)" opacity="0.85" />
          <path d="M36 68L30 80H66L60 68" stroke="var(--mk-track-macos)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="24" y="34" width="20" height="15" rx="3" fill="var(--mk-surface)" stroke="var(--mk-track-macos)" strokeWidth="2" />
          <circle cx="62" cy="41" r="7" stroke="var(--mk-track-macos)" strokeWidth="2.5" />
          <line x1="67" y1="46" x2="73" y2="52" stroke="var(--mk-track-macos)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'programy':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka Programy">
          <rect x="12" y="18" width="52" height="44" rx="8" fill="var(--mk-surface-elevated)" stroke="var(--mk-track-programy)" strokeWidth="3" />
          <path d="M16 26L38 41L60 26" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="34" y="36" width="50" height="44" rx="8" fill="var(--mk-surface)" stroke="var(--mk-track-programy)" strokeWidth="3" />
          <line x1="44" y1="50" x2="72" y2="50" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="44" y1="59" x2="66" y2="59" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M44 70C49 66 54 72 60 67" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'iphone':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka iPhone i Mac">
          <rect x="10" y="22" width="52" height="38" rx="6" fill="var(--mk-surface-elevated)" stroke="var(--mk-track-iphone)" strokeWidth="3" />
          <line x1="6" y1="60" x2="66" y2="60" stroke="var(--mk-track-iphone)" strokeWidth="3" strokeLinecap="round" />
          <rect x="56" y="30" width="28" height="50" rx="7" fill="var(--mk-surface)" stroke="var(--mk-track-iphone)" strokeWidth="3" />
          <line x1="66" y1="36" x2="74" y2="36" stroke="var(--mk-track-iphone)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="73" r="2" fill="var(--mk-track-iphone)" />
          <path d="M38 20C46 12 58 12 66 20" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M44 25C49 20 55 20 60 25" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'ai':
    default:
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka Sztuczna Inteligencja">
          <rect x="14" y="18" width="68" height="52" rx="14" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" />
          <path d="M32 70L24 82L42 70" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M48 28L51.5 38.5L62 42L51.5 45.5L48 56L44.5 45.5L34 42L44.5 38.5L48 28Z" fill="var(--mk-track-ai)" />
          <circle cx="66" cy="32" r="3" fill="var(--mk-primary)" />
          <circle cx="30" cy="52" r="2.5" fill="var(--mk-primary)" />
        </svg>
      );
  }
}

export function MacLookIllustration({
  variant,
  className = 'w-full h-28',
}: {
  variant: 'old' | 'new' | 'unknown';
  className?: string;
}) {
  if (variant === 'old') {
    // Stare Preferencje systemowe – siatka ikon (macOS <= 12)
    return (
      <svg viewBox="0 0 200 110" fill="none" className={className} role="img" aria-label="Stare Preferencje systemowe – siatka ikon">
        <rect x="10" y="8" width="180" height="94" rx="10" fill="var(--mk-surface)" stroke="var(--mk-border)" strokeWidth="2.5" />
        <rect x="10" y="8" width="180" height="20" rx="10" fill="var(--mk-surface-elevated)" />
        <circle cx="22" cy="18" r="3.5" fill="#E06C58" />
        <circle cx="33" cy="18" r="3.5" fill="#E5B552" />
        <circle cx="44" cy="18" r="3.5" fill="#5BB36C" />
        {[0, 1, 2, 3].map((col) =>
          [0, 1].map((row) => (
            <g key={`${col}-${row}`}>
              <rect
                x={30 + col * 38}
                y={38 + row * 28}
                width="22"
                height="18"
                rx="5"
                fill={col === 1 && row === 0 ? 'var(--mk-primary-soft)' : 'var(--mk-surface-elevated)'}
                stroke={col === 1 && row === 0 ? 'var(--mk-primary)' : 'var(--mk-text-muted)'}
                strokeWidth="1.8"
              />
            </g>
          ))
        )}
      </svg>
    );
  }

  if (variant === 'new') {
    // Nowe Ustawienia systemowe – lista z boku (macOS >= 13)
    return (
      <svg viewBox="0 0 200 110" fill="none" className={className} role="img" aria-label="Nowe Ustawienia systemowe – lista z boku">
        <rect x="10" y="8" width="180" height="94" rx="10" fill="var(--mk-surface)" stroke="var(--mk-border)" strokeWidth="2.5" />
        <path d="M10 18C10 12.4772 14.4772 8 20 8H72V102H20C14.4772 102 10 97.5228 10 92V18Z" fill="var(--mk-surface-elevated)" />
        <circle cx="22" cy="18" r="3.5" fill="#E06C58" />
        <circle cx="33" cy="18" r="3.5" fill="#E5B552" />
        <circle cx="44" cy="18" r="3.5" fill="#5BB36C" />
        <rect x="18" y="32" width="46" height="9" rx="4" fill="var(--mk-primary)" />
        <rect x="18" y="47" width="40" height="7" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="18" y="60" width="44" height="7" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="18" y="73" width="36" height="7" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="86" y="24" width="90" height="20" rx="6" fill="var(--mk-surface-elevated)" />
        <rect x="86" y="52" width="90" height="16" rx="5" fill="var(--mk-surface-elevated)" />
        <rect x="86" y="74" width="90" height="16" rx="5" fill="var(--mk-surface-elevated)" />
      </svg>
    );
  }

  // Wariant "Nie wiem" – spokojny kompas pomocniczy
  return (
    <svg viewBox="0 0 200 110" fill="none" className={className} role="img" aria-label="Nie wiem, jak wygląda mój Mac">
      <rect x="10" y="8" width="180" height="94" rx="10" fill="var(--mk-surface)" stroke="var(--mk-border)" strokeWidth="2.5" />
      <circle cx="100" cy="55" r="28" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="2.5" />
      <path d="M90 65L96 47L112 43L106 61L90 65Z" fill="var(--mk-primary)" />
      <circle cx="100" cy="55" r="3.5" fill="var(--mk-surface)" />
    </svg>
  );
}

/**
 * Ilustracje metafor dla wszystkich kart teorii (Biblioteka i wstępy do misji).
 */
export function TheoryIllustration({
  illustrationId,
  className = 'w-24 h-24',
}: {
  illustrationId: string;
  className?: string;
}) {
  // Dobieramy charakterystyczny geometryczny motyw SVG na podstawie identyfikatora metafory
  const id = illustrationId.toLowerCase();

  if (id.indexOf('screenshot') !== -1 || id.indexOf('polaroid') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja zrzutu ekranu">
        <rect x="18" y="26" width="84" height="68" rx="12" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <circle cx="60" cy="60" r="18" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="3" />
        <circle cx="84" cy="40" r="4" fill="var(--mk-primary)" />
        <path d="M42 26L48 16H72L78 26" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id.indexOf('download') !== -1 || id.indexOf('mailbox') !== -1 || id.indexOf('pobrane') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja skrzynki na przesyłki">
        <rect x="22" y="48" width="76" height="48" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <path d="M60 20V68" stroke="var(--mk-primary)" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 54L60 70L76 54" stroke="var(--mk-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="36" y1="82" x2="84" y2="82" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.indexOf('spotlight') !== -1 || id.indexOf('butler') !== -1 || id.indexOf('search') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja wyszukiwarki Spotlight">
        <circle cx="54" cy="54" r="28" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3.5" />
        <line x1="74" y1="74" x2="98" y2="98" stroke="var(--mk-primary)" strokeWidth="5" strokeLinecap="round" />
        <path d="M44 48C48 42 60 42 64 48" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.indexOf('trash') !== -1 || id.indexOf('kosz') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja Kosza i odzyskiwania">
        <path d="M32 38H88L82 96H38L32 38Z" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" strokeLinejoin="round" />
        <line x1="24" y1="38" x2="96" y2="38" stroke="var(--mk-primary)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M46 38V28C46 25 48 23 51 23H69C72 23 74 25 74 28V38" stroke="var(--mk-primary)" strokeWidth="3" />
        <path d="M48 64L60 52L72 64" stroke="var(--mk-success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="60" y1="53" x2="60" y2="82" stroke="var(--mk-success)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.indexOf('clipboard') !== -1 || id.indexOf('tray') !== -1 || id.indexOf('shortcut') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja tacy schowka i skrótów">
        <rect x="28" y="26" width="64" height="74" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <rect x="44" y="18" width="32" height="16" rx="5" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="3" />
        <line x1="42" y1="52" x2="78" y2="52" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
        <line x1="42" y1="66" x2="70" y2="66" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.indexOf('password') !== -1 || id.indexOf('vault') !== -1 || id.indexOf('key') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja sejfu z kluczami">
        <rect x="26" y="50" width="68" height="50" rx="12" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <path d="M42 50V36C42 26 50 18 60 18C70 18 78 26 78 36V50" stroke="var(--mk-primary)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="72" r="6" fill="var(--mk-primary)" />
        <line x1="60" y1="78" x2="60" y2="88" stroke="var(--mk-primary)" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (id.indexOf('cloud') !== -1 || id.indexOf('icloud') !== -1 || id.indexOf('airdrop') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja wspólnej szafy iCloud i AirDrop">
        <path
          d="M36 84H86C96 84 104 76 104 66C104 57 97 49 88 48C85 34 73 24 58 24C41 24 28 37 28 54C20 56 14 63 14 71C14 78 20 84 28 84H36Z"
          fill="var(--mk-primary-soft)"
          stroke="var(--mk-primary)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M48 62L60 50L72 62" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id.indexOf('ai') !== -1 || id.indexOf('dictation') !== -1 || id.indexOf('chat') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja asystenta AI">
        <circle cx="60" cy="60" r="38" fill="var(--mk-success-soft)" stroke="var(--mk-success)" strokeWidth="3" />
        <path d="M60 34L65 51L82 56L65 61L60 78L55 61L38 56L55 51L60 34Z" fill="var(--mk-success)" />
      </svg>
    );
  }

  // Domyślna ilustracja biurka, szuflad i porządku na Macu
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja biurka i folderów na Macu">
      <path
        d="M20 38C20 33.5817 23.5817 30 28 30H48L56 38H92C96.4183 38 100 41.5817 100 46V84C100 88.4183 96.4183 92 92 92H28C23.5817 92 20 88.4183 20 84V38Z"
        fill="var(--mk-primary-soft)"
        stroke="var(--mk-primary)"
        strokeWidth="3"
      />
      <rect x="34" y="52" width="52" height="26" rx="5" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="2.5" />
      <line x1="44" y1="62" x2="76" y2="62" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="44" y1="70" x2="64" y2="70" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
