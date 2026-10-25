export type TrackId = 'macos' | 'programy' | 'iphone' | 'ai';

export type CatMood =
  | 'pointing'
  | 'curious'
  | 'celebrating'
  | 'reading'
  | 'detective'
  | 'comforting'
  | 'peeking'
  | 'sleeping'
  | 'chasing';

/**
 * Animowany Czarny Kotek Przewodnik „Maks” – towarzysz Małgorzaty w nauce MacBooka.
 * Posiada płynne animacje SVG/CSS: mruganie bursztynowymi oczami, machanie puszystym ogonkiem,
 * strzyżenie uszkami, machanie łapką i zabawne rekwizyty zależnie od sytuacji.
 */
export function BlackCatGuide({
  mood = 'pointing',
  className = 'w-20 h-20',
}: {
  mood?: CatMood;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 128 128"
      fill="none"
      className={`mk-maks-svg ${className}`}
      role="img"
      aria-label="Czarny kotek przewodnik Maks"
    >
      <defs>
        <radialGradient id="catBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--mk-primary-soft)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--mk-primary-soft)" stopOpacity="0.1" />
        </radialGradient>
        <linearGradient id="catFur" x1="24" y1="18" x2="100" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E3140" />
          <stop offset="55%" stopColor="#1B1D26" />
          <stop offset="100%" stopColor="#0F1016" />
        </linearGradient>
        <linearGradient id="catBelly" x1="48" y1="74" x2="80" y2="112" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B3F52" />
          <stop offset="100%" stopColor="#232530" />
        </linearGradient>
        <linearGradient id="amberEye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE074" />
          <stop offset="100%" stopColor="#E6921A" />
        </linearGradient>
      </defs>

      {/* Ciepła poświata w tle */}
      <circle cx="64" cy="66" r="54" fill="url(#catBgGlow)" />
      <ellipse cx="64" cy="113" rx="34" ry="6" fill="#000000" opacity="0.14" />

      {/* Animowany puszysty ogonek Maksa */}
      <g className="mk-maks-tail">
        <path
          d={
            mood === 'celebrating' || mood === 'chasing'
              ? 'M86 96C106 90 116 70 108 54C103 45 94 50 97 59C100 68 94 82 82 89'
              : 'M86 100C106 98 114 82 108 68C104 60 96 64 98 72C100 80 94 90 82 93'
          }
          stroke="url(#catFur)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Tułów i głowa w lekko unoszącej się grupie */}
      <g className="mk-maks-body">
        {/* Tułów Maksa */}
        <path
          d="M38 82C36 68 47 62 64 62C81 62 92 68 90 82L92 105C92 110 86 113 78 113H50C42 113 36 110 36 105L38 82Z"
          fill="url(#catFur)"
        />
        {/* Jasny krawacik na piersi */}
        <path
          d="M55 74C59 72 69 72 73 74C75 84 71 95 64 98C57 95 53 84 55 74Z"
          fill="url(#catBelly)"
        />

        {/* Tylne łapki z różowymi poduszeczkami */}
        <ellipse cx="47" cy="111" rx="9" ry="5" fill="#181920" />
        <ellipse cx="81" cy="111" rx="9" ry="5" fill="#181920" />
        <circle cx="44" cy="111" r="1.6" fill="#F4A3B4" opacity="0.8" />
        <circle cx="48" cy="110.5" r="1.6" fill="#F4A3B4" opacity="0.8" />
        <circle cx="80" cy="110.5" r="1.6" fill="#F4A3B4" opacity="0.8" />
        <circle cx="84" cy="111" r="1.6" fill="#F4A3B4" opacity="0.8" />

        {/* Terakotowa obróżka ze złotym medalikiem „M” (Maks) */}
        <path
          d="M44 71C52 76 76 76 84 71"
          stroke="#D4593B"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle cx="64" cy="76.5" r="6" fill="#F6C445" stroke="#B7791F" strokeWidth="1.5" />
        <text
          x="64"
          y="79.2"
          textAnchor="middle"
          fill="#744210"
          fontSize="7.5"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          M
        </text>

        {/* Animowane uszka Maksa */}
        <g className="mk-maks-ear-left">
          <path
            d="M31 45L25 16L51 30Z"
            fill="url(#catFur)"
            stroke="#181920"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M33 41L29 22L47 32Z" fill="#F29AA7" opacity="0.88" />
        </g>
        <g className="mk-maks-ear-right">
          <path
            d="M97 45L103 16L77 30Z"
            fill="url(#catFur)"
            stroke="#181920"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M95 41L99 22L81 32Z" fill="#F29AA7" opacity="0.88" />
        </g>

        {/* Głowa Maksa */}
        <ellipse cx="64" cy="48" rx="31" ry="26" fill="url(#catFur)" />
        {/* Kępka futerka na czubku głowy */}
        <path
          d="M59 23L64 17L67 23"
          stroke="#2E3140"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M43 32C52 26 76 26 85 32"
          stroke="#494D60"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.65"
        />

        {/* Czapeczka detektywa w trybie 'detective' */}
        {mood === 'detective' && (
          <g>
            <ellipse cx="64" cy="23" rx="22" ry="7" fill="#B45309" stroke="#78350F" strokeWidth="1.8" />
            <path d="M46 23C46 13 82 13 82 23Z" fill="#D97706" stroke="#78350F" strokeWidth="1.8" />
            <path d="M78 23L92 26L80 27Z" fill="#78350F" />
          </g>
        )}

        {/* Oczy Maksa (z animacją mrugania lub przymknięte w trybie 'sleeping') */}
        {mood === 'sleeping' ? (
          <g>
            <path
              d="M42 48C46 53 54 53 58 48"
              stroke="#FBBF24"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M70 48C74 53 82 53 86 48"
              stroke="#FBBF24"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <text x="92" y="28" fill="var(--mk-primary)" fontSize="14" fontWeight="900">
              Zzz
            </text>
          </g>
        ) : (
          <g className="mk-maks-eyes">
            <ellipse cx="50" cy="47" rx="8.8" ry="9.2" fill="url(#amberEye)" />
            <ellipse cx="78" cy="47" rx="8.8" ry="9.2" fill="url(#amberEye)" />
            <ellipse
              cx={mood === 'pointing' || mood === 'chasing' ? '52' : '50'}
              cy="47.5"
              rx={mood === 'celebrating' ? '4.5' : '5.2'}
              ry="6.6"
              fill="#12131A"
            />
            <ellipse
              cx={mood === 'pointing' || mood === 'chasing' ? '80' : '78'}
              cy="47.5"
              rx={mood === 'celebrating' ? '4.5' : '5.2'}
              ry="6.6"
              fill="#12131A"
            />
            <circle cx="47.5" cy="43.8" r="2.5" fill="#FFFFFF" />
            <circle cx="53" cy="50" r="1.2" fill="#FFFFFF" opacity="0.88" />
            <circle cx="75.5" cy="43.8" r="2.5" fill="#FFFFFF" />
            <circle cx="81" cy="50" r="1.2" fill="#FFFFFF" opacity="0.88" />
          </g>
        )}

        {/* Okulary do czytania w trybie 'reading' */}
        {mood === 'reading' && (
          <g>
            <circle cx="50" cy="47" r="11.2" stroke="#F6C445" strokeWidth="2.4" fill="none" />
            <circle cx="78" cy="47" r="11.2" stroke="#F6C445" strokeWidth="2.4" fill="none" />
            <line x1="61.2" y1="47" x2="66.8" y2="47" stroke="#F6C445" strokeWidth="2.4" />
          </g>
        )}

        {/* Różowy nosek i uśmiechnięty pyszczek */}
        <path d="M61 54.5H67L64 58Z" fill="#F48FB1" />
        <path
          d={
            mood === 'celebrating' || mood === 'chasing'
              ? 'M55 59C58.5 63.5 63 62 64 58C65 62 69.5 63.5 73 59'
              : 'M57 58.5C59.5 61.5 63 61 64 58C65 61 68.5 61.5 71 58.5'
          }
          stroke="#F8BBD0"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Rumieńce */}
        <ellipse cx="39" cy="55" rx="4.5" ry="2.5" fill="#F48FB1" opacity="0.4" />
        <ellipse cx="89" cy="55" rx="4.5" ry="2.5" fill="#F48FB1" opacity="0.4" />

        {/* Białe wąsiki */}
        <line x1="20" y1="50" x2="36" y2="52" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="19" y1="56" x2="35" y2="56" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="22" y1="62" x2="36" y2="59" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="108" y1="50" x2="92" y2="52" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="109" y1="56" x2="93" y2="56" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="106" y1="62" x2="92" y2="59" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" />

        {/* Przednie łapki zależnie od nastroju */}
        {(mood === 'pointing' || mood === 'peeking') && (
          <g>
            <ellipse cx="46" cy="88" rx="7" ry="11" fill="#181920" />
            <g className="mk-maks-paw">
              <path
                d="M84 82C94 74 103 66 109 62"
                stroke="#181920"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="110" cy="61" r="6" fill="#232530" />
              <circle cx="112" cy="59" r="2.2" fill="#F48FB1" />
              <path
                d="M118 46L120 51L125 53L120 55L118 60L116 55L111 53L116 51L118 46Z"
                fill="#F6C445"
              />
            </g>
          </g>
        )}

        {mood === 'chasing' && (
          <g className="mk-maks-paw">
            <path d="M40 84C30 76 24 68 20 62" stroke="#181920" strokeWidth="11" strokeLinecap="round" />
            <path d="M86 84C96 76 104 68 108 62" stroke="#181920" strokeWidth="11" strokeLinecap="round" />
            {/* Czerwony kłębuszek / kursor, który goni Maks */}
            <circle cx="112" cy="54" r="7" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
            <path d="M107 52C111 49 115 57 117 53" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}

        {mood === 'curious' && (
          <g>
            <ellipse cx="48" cy="90" rx="7" ry="11" fill="#181920" />
            <path d="M80 86C86 78 88 68 82 62" stroke="#181920" strokeWidth="11" strokeLinecap="round" />
            <text x="98" y="34" fill="var(--mk-primary)" fontSize="22" fontWeight="800">
              ?
            </text>
          </g>
        )}

        {mood === 'celebrating' && (
          <g className="mk-maks-paw">
            <path d="M40 80C30 70 24 60 22 52" stroke="#181920" strokeWidth="11" strokeLinecap="round" />
            <path d="M88 80C98 70 104 60 106 52" stroke="#181920" strokeWidth="11" strokeLinecap="round" />
            <path d="M18 32L20.5 38L27 40.5L20.5 43L18 49L15.5 43L9 40.5L15.5 38L18 32Z" fill="#F6C445" />
            <path d="M110 28L112 33L117 35L112 37L110 42L108 37L103 35L108 33L110 28Z" fill="#34D399" />
            <circle cx="64" cy="14" r="3.5" fill="#F48FB1" />
          </g>
        )}

        {mood === 'reading' && (
          <g>
            <path d="M42 86L64 91L86 86V104L64 109L42 104V86Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.2" />
            <line x1="64" y1="91" x2="64" y2="109" stroke="#D97706" strokeWidth="2" />
            <ellipse cx="42" cy="94" rx="5.5" ry="5" fill="#181920" />
            <ellipse cx="86" cy="94" rx="5.5" ry="5" fill="#181920" />
          </g>
        )}

        {mood === 'detective' && (
          <g>
            <ellipse cx="46" cy="90" rx="7" ry="10" fill="#181920" />
            <g className="mk-maks-paw">
              <path d="M82 86L96 74" stroke="#181920" strokeWidth="10" strokeLinecap="round" />
              <circle cx="103" cy="64" r="12" fill="#E0F2FE" fillOpacity="0.75" stroke="#D97706" strokeWidth="3.2" />
              <line x1="94" y1="73" x2="86" y2="83" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
            </g>
          </g>
        )}

        {mood === 'comforting' && (
          <g>
            <ellipse cx="48" cy="88" rx="7" ry="10" fill="#181920" />
            <ellipse cx="80" cy="88" rx="7" ry="10" fill="#181920" />
            <path
              d="M64 100C64 100 53 93 53 86C53 82.5 55.8 80 59 80C61.2 80 63 81.2 64 83C65 81.2 66.8 80 69 80C72.2 80 75 82.5 75 86C75 93 64 100 64 100Z"
              fill="#F43F5E"
            />
          </g>
        )}
      </g>
    </svg>
  );
}

/**
 * Zabawna wstawka z kotkiem Maksem wyglądającym zza kart lub dzielącym się humorystyczną obserwacją.
 */
export function MaksFunnySpot({
  mood = 'chasing',
  caption,
  badge = 'Maks mruczy na boku',
}: {
  mood?: CatMood;
  caption: string;
  badge?: string;
}) {
  return (
    <div className="mk-bento-card relative overflow-hidden rounded-mk-xl border border-mk-border bg-mk-surface p-4 sm:p-5 shadow-sm flex items-center gap-4">
      <div className="relative shrink-0">
        <BlackCatGuide mood={mood} className="w-16 h-16 sm:w-20 sm:h-20" />
      </div>
      <div className="space-y-1 flex-1">
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-mk-primarySoft text-mk-primary text-[11px] font-bold uppercase tracking-wider">
          {badge}
        </span>
        <p className="text-xs sm:text-sm text-mk-text font-medium leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

/**
 * Bogate ilustracje czterech ścieżek z udziałem czarnego kotka Maksa.
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
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka macOS z kotkiem Maksem">
          <rect x="6" y="16" width="76" height="52" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-track-macos)" strokeWidth="3" />
          <rect x="6" y="16" width="76" height="11" rx="5" fill="var(--mk-track-macos)" fillOpacity="0.18" />
          <circle cx="15" cy="21.5" r="2.2" fill="#EF4444" />
          <circle cx="22" cy="21.5" r="2.2" fill="#F59E0B" />
          <circle cx="29" cy="21.5" r="2.2" fill="#10B981" />
          <path d="M16 35C16 33.5 17.2 32.5 18.5 32.5H26L29 35.5H38C39.5 35.5 40.5 36.7 40.5 38V50C40.5 51.5 39.3 52.5 38 52.5H18.5C17.2 52.5 16 51.5 16 50V35Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.8" />
          <rect x="20" y="57" width="48" height="6" rx="3" fill="var(--mk-track-macos)" opacity="0.8" />
          <path d="M34 68L28 80H60L54 68" stroke="var(--mk-track-macos)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M62 46L59 31L70 39Z" fill="#1B1C24" />
          <path d="M86 46L89 31L78 39Z" fill="#1B1C24" />
          <circle cx="74" cy="50" r="14" fill="#1B1C24" />
          <circle cx="69" cy="49" r="3.2" fill="#FBBF24" />
          <circle cx="79" cy="49" r="3.2" fill="#FBBF24" />
          <circle cx="69" cy="49" r="1.6" fill="#111218" />
          <circle cx="79" cy="49" r="1.6" fill="#111218" />
          <path d="M72.5 54H75.5L74 56Z" fill="#F48FB1" />
        </svg>
      );
    case 'programy':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka Programy z kotkiem Maksem">
          <rect x="10" y="16" width="52" height="40" rx="8" fill="var(--mk-surface-elevated)" stroke="var(--mk-track-programy)" strokeWidth="3" />
          <path d="M14 23L36 37L58 23" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="30" y="34" width="48" height="44" rx="8" fill="var(--mk-surface)" stroke="var(--mk-track-programy)" strokeWidth="3" />
          <line x1="40" y1="47" x2="66" y2="47" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="40" y1="56" x2="60" y2="56" stroke="var(--mk-track-programy)" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M40 67C45 63 50 69 56 64" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M64 60L61 46L71 53Z" fill="#1B1C24" />
          <path d="M86 60L89 46L79 53Z" fill="#1B1C24" />
          <circle cx="75" cy="64" r="13" fill="#1B1C24" />
          <circle cx="70.5" cy="63" r="3" fill="#FBBF24" />
          <circle cx="79.5" cy="63" r="3" fill="#FBBF24" />
          <circle cx="70.5" cy="63" r="1.5" fill="#111218" />
          <circle cx="79.5" cy="63" r="1.5" fill="#111218" />
        </svg>
      );
    case 'iphone':
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka iPhone i Mac z kotkiem Maksem">
          <rect x="8" y="24" width="48" height="36" rx="6" fill="var(--mk-surface-elevated)" stroke="var(--mk-track-iphone)" strokeWidth="3" />
          <line x1="4" y1="60" x2="60" y2="60" stroke="var(--mk-track-iphone)" strokeWidth="3" strokeLinecap="round" />
          <rect x="56" y="28" width="28" height="50" rx="7" fill="var(--mk-surface)" stroke="var(--mk-track-iphone)" strokeWidth="3" />
          <line x1="66" y1="34" x2="74" y2="34" stroke="var(--mk-track-iphone)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M36 18C45 10 57 10 66 18" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
          <path d="M22 44L19 32L28 38Z" fill="#1B1C24" />
          <path d="M42 44L45 32L36 38Z" fill="#1B1C24" />
          <circle cx="32" cy="47" r="11" fill="#1B1C24" />
          <circle cx="28" cy="46" r="2.6" fill="#FBBF24" />
          <circle cx="36" cy="46" r="2.6" fill="#FBBF24" />
          <circle cx="28" cy="46" r="1.3" fill="#111218" />
          <circle cx="36" cy="46" r="1.3" fill="#111218" />
        </svg>
      );
    case 'ai':
    default:
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka Sztuczna Inteligencja z kotkiem Maksem">
          <rect x="10" y="16" width="66" height="50" rx="14" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" />
          <path d="M28 66L20 78L38 66" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M40 25L43 34L52 37L43 40L40 49L37 40L28 37L37 34L40 25Z" fill="var(--mk-track-ai)" />
          <path d="M62 56L59 42L69 49Z" fill="#1B1C24" />
          <path d="M84 56L87 42L77 49Z" fill="#1B1C24" />
          <circle cx="73" cy="60" r="13" fill="#1B1C24" />
          <circle cx="68.5" cy="59" r="3" fill="#FBBF24" />
          <circle cx="77.5" cy="59" r="3" fill="#FBBF24" />
          <circle cx="68.5" cy="59" r="1.5" fill="#111218" />
          <circle cx="77.5" cy="59" r="1.5" fill="#111218" />
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
    return (
      <svg viewBox="0 0 200 110" fill="none" className={className} role="img" aria-label="Nowe Ustawienia systemowe – lista z boku">
        <rect x="10" y="8" width="180" height="94" rx="10" fill="var(--mk-surface)" stroke="var(--mk-border)" strokeWidth="2.5" />
        <path d="M10 18C10 12.4772 14.4772 8 20 8H72V102H20C14.4772 102 10 97.5228 10 92V18Z" fill="var(--mk-surface-elevated)" />
        <circle cx="22" cy="18" r="3.5" fill="#E06C58" />
        <circle cx="33" cy="18" r="3.5" fill="#E5B552" />
        <circle cx="44" cy="18" r="3.5" fill="#5BB36C" />
        <rect x="18" y="32" width="46" height="9" rx="4" fill="var(--mk-primary)" />
        <rect x="18" y="47" width="40" height="7" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="18" y="60" height="7" width="44" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="18" y="73" width="36" height="7" rx="3.5" fill="var(--mk-text-muted)" opacity="0.35" />
        <rect x="86" y="24" width="90" height="20" rx="6" fill="var(--mk-surface-elevated)" />
        <rect x="86" y="52" width="90" height="16" rx="5" fill="var(--mk-surface-elevated)" />
        <rect x="86" y="74" width="90" height="16" rx="5" fill="var(--mk-surface-elevated)" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 110" fill="none" className={className} role="img" aria-label="Nie wiem, jak wygląda mój Mac">
      <rect x="10" y="8" width="180" height="94" rx="10" fill="var(--mk-surface)" stroke="var(--mk-border)" strokeWidth="2.5" />
      <circle cx="100" cy="55" r="28" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="2.5" />
      <path d="M90 65L96 47L112 43L106 61L90 65Z" fill="var(--mk-primary)" />
      <circle cx="100" cy="55" r="3.5" fill="var(--mk-surface)" />
    </svg>
  );
}

function MiniCatBadge() {
  return (
    <g transform="translate(74, 70)">
      <path d="M6 16L3 3L14 10Z" fill="#1B1C24" />
      <path d="M32 16L35 3L24 10Z" fill="#1B1C24" />
      <circle cx="19" cy="20" r="15" fill="#1B1C24" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="13.5" cy="19" r="3.4" fill="#FBBF24" />
      <circle cx="24.5" cy="19" r="3.4" fill="#FBBF24" />
      <circle cx="13.5" cy="19" r="1.7" fill="#111218" />
      <circle cx="24.5" cy="19" r="1.7" fill="#111218" />
      <path d="M17.5 24H20.5L19 26Z" fill="#F48FB1" />
    </g>
  );
}

/**
 * Ilustracje metafor dla wszystkich 50 kart teorii z udziałem kotka Maksa.
 */
export function TheoryIllustration({
  illustrationId,
  className = 'w-24 h-24',
}: {
  illustrationId: string;
  className?: string;
}) {
  const id = illustrationId.toLowerCase();

  if (id.indexOf('tree') !== -1 || id.indexOf('folder') !== -1 || id.indexOf('views') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja pliku, teczki i drzewa katalogów">
        <rect x="10" y="14" width="96" height="82" rx="14" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="2.5" />
        <path d="M20 34C20 31.8 21.8 30 24 30H38L43 35H62C64.2 35 66 36.8 66 39V64C66 66.2 64.2 68 62 68H24C21.8 68 20 66.2 20 64V34Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.2" />
        <rect x="34" y="22" width="24" height="30" rx="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
        <line x1="39" y1="30" x2="53" y2="30" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <line x1="39" y1="36" x2="49" y2="36" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('screenshot') !== -1 || id.indexOf('polaroid') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja zrzutu ekranu">
        <rect x="14" y="24" width="84" height="66" rx="12" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <circle cx="56" cy="57" r="17" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="3" />
        <circle cx="80" cy="38" r="4" fill="var(--mk-primary)" />
        <path d="M38 24L44 14H68L74 24" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('download') !== -1 || id.indexOf('mailbox') !== -1 || id.indexOf('pobrane') !== -1 || id.indexOf('dmg') !== -1 || id.indexOf('usb') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja skrzynki na przesyłki i nośników">
        <rect x="18" y="44" width="76" height="48" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <path d="M56 16V64" stroke="var(--mk-primary)" strokeWidth="4" strokeLinecap="round" />
        <path d="M40 50L56 66L72 50" stroke="var(--mk-primary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="32" y1="78" x2="80" y2="78" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('spotlight') !== -1 || id.indexOf('butler') !== -1 || id.indexOf('search') !== -1 || id.indexOf('radar') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja wyszukiwarki Spotlight">
        <circle cx="50" cy="50" r="28" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3.5" />
        <line x1="70" y1="70" x2="92" y2="92" stroke="var(--mk-primary)" strokeWidth="5" strokeLinecap="round" />
        <path d="M40 44C44 38 56 38 60 44" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('trash') !== -1 || id.indexOf('kosz') !== -1 || id.indexOf('storage') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja Kosza i porządków na dysku">
        <path d="M28 36H84L78 94H34L28 36Z" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" strokeLinejoin="round" />
        <line x1="20" y1="36" x2="92" y2="36" stroke="var(--mk-primary)" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M44 62L56 50L68 62" stroke="var(--mk-success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="51" x2="56" y2="80" stroke="var(--mk-success)" strokeWidth="3.5" strokeLinecap="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('clipboard') !== -1 || id.indexOf('tray') !== -1 || id.indexOf('shortcut') !== -1 || id.indexOf('keyboard') !== -1 || id.indexOf('trackpad') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja klawiatury, gładzika i skrótów">
        <rect x="22" y="24" width="64" height="72" rx="10" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <rect x="38" y="16" width="32" height="16" rx="5" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="3" />
        <line x1="36" y1="50" x2="72" y2="50" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
        <line x1="36" y1="64" x2="64" y2="64" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('password') !== -1 || id.indexOf('vault') !== -1 || id.indexOf('key') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja sejfu z kluczami">
        <rect x="20" y="48" width="68" height="48" rx="12" fill="var(--mk-primary-soft)" stroke="var(--mk-primary)" strokeWidth="3" />
        <path d="M36 48V34C36 24 44 16 54 16C64 16 72 24 72 34V48" stroke="var(--mk-primary)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="54" cy="70" r="6" fill="var(--mk-primary)" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('cloud') !== -1 || id.indexOf('icloud') !== -1 || id.indexOf('airdrop') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja chmury iCloud i AirDrop">
        <path
          d="M32 82H80C90 82 98 74 98 64C98 55 91 47 82 46C79 32 67 22 52 22C35 22 22 35 22 52C14 54 10 61 10 69C10 76 16 82 24 82H32Z"
          fill="var(--mk-primary-soft)"
          stroke="var(--mk-primary)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M44 60L56 48L68 60" stroke="var(--mk-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <MiniCatBadge />
      </svg>
    );
  }

  if (id.indexOf('ai') !== -1 || id.indexOf('dictation') !== -1 || id.indexOf('chat') !== -1) {
    return (
      <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja asystenta AI">
        <circle cx="54" cy="54" r="36" fill="var(--mk-success-soft)" stroke="var(--mk-success)" strokeWidth="3" />
        <path d="M54 28L59 45L76 50L59 55L54 72L49 55L32 50L49 45L54 28Z" fill="var(--mk-success)" />
        <MiniCatBadge />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} role="img" aria-label="Ilustracja biurka i folderów na Macu">
      <path
        d="M16 36C16 31.5817 19.5817 28 24 28H44L52 36H86C90.4183 36 94 39.5817 94 44V82C94 86.4183 90.4183 90 86 90H24C19.5817 90 16 86.4183 16 82V36Z"
        fill="var(--mk-primary-soft)"
        stroke="var(--mk-primary)"
        strokeWidth="3"
      />
      <rect x="30" y="50" width="50" height="26" rx="5" fill="var(--mk-surface)" stroke="var(--mk-primary)" strokeWidth="2.5" />
      <line x1="40" y1="60" x2="70" y2="60" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="40" y1="68" x2="58" y2="68" stroke="var(--mk-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <MiniCatBadge />
    </svg>
  );
}
