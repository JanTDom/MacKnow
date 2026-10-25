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
 * Animowany Czarny Kotek Przewodnik „Maks” – wierny, uroczy towarzysz Małgorzaty w nauce MacBooka.
 * Posiada w 100% kocie proporcje (zaokrąglone uszka z puszystym wnętrzem, pulchne policzki z poduszeczkami wąsów,
 * migdałowe bursztynowe oczy z błyskiem, delikatny różowy nosek i aksamitny, zwinny ogonek).
 * Płynne animacje SVG/CSS: mruganie, machanie ogonkiem, strzyżenie uszkami, unoszenie łapki i sytuacyjne rekwizyty.
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
        {/* Ciepła aksamitna poświata w tle */}
        <radialGradient id="catBgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--mk-primary-soft)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--mk-primary-soft)" stopOpacity="0.1" />
        </radialGradient>

        {/* Jedwabiste czarne futerko z bogatymi odcieniami głębokiego grafitu i nocnego granatu */}
        <linearGradient id="catFur" x1="24" y1="16" x2="104" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34384B" />
          <stop offset="42%" stopColor="#1B1D28" />
          <stop offset="100%" stopColor="#0B0C12" />
        </linearGradient>

        {/* Akcent klatki piersiowej (tuxedo bib) */}
        <linearGradient id="catChest" x1="52" y1="72" x2="76" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3C4154" />
          <stop offset="100%" stopColor="#1E212E" />
        </linearGradient>

        {/* Ciepłe, miękkie różowe wnętrze kocich uszek */}
        <linearGradient id="catEarInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FBCFE8" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>

        {/* Głębokie, bursztynowe kocie oczy z ciepłym blaskiem */}
        <linearGradient id="amberEye" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Złoty medalik z literą M */}
        <linearGradient id="medalGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>

        {/* Skórzana terakotowa obróżka */}
        <linearGradient id="collarLeather" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#E15A36" />
          <stop offset="50%" stopColor="#C85A32" />
          <stop offset="100%" stopColor="#9A2C11" />
        </linearGradient>

        {/* Połysk szkła w okularach i lupie detektywa */}
        <linearGradient id="lensGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Ciepła poświata w tle */}
      <circle cx="64" cy="66" r="54" fill="url(#catBgGlow)" />
      <ellipse cx="64" cy="115" rx="36" ry="6" fill="#000000" opacity="0.16" />

      {/* Zwinny, smukły koci ogonek Maksa (naturalny koci kształt S, a nie puszysty lis) */}
      <g className="mk-maks-tail">
        {mood === 'sleeping' ? (
          <path
            d="M42 110 C52 115 80 115 94 109 C100 106 102 99 96 96 C90 93 82 98 70 102 C60 105 48 106 42 110"
            stroke="url(#catFur)"
            strokeWidth="8.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : mood === 'celebrating' || mood === 'chasing' ? (
          <path
            d="M84 94 C104 88 114 70 108 52 C103 44 94 48 98 58 C101 68 94 82 82 88"
            stroke="url(#catFur)"
            strokeWidth="8.5"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M84 100 C102 98 112 85 107 70 C103 60 95 64 97 72 C99 80 94 90 82 93"
            stroke="url(#catFur)"
            strokeWidth="8.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </g>

      {/* Główna sylwetka kotka w łagodnie unoszącej się grupie */}
      <g className="mk-maks-body">
        {/* Tułów Maksa – miękka, kocia postawa siedząca */}
        <path
          d="M40 80 C36 68 46 62 64 62 C82 62 92 68 88 80 L92 104 C92 110 86 113 78 113 H50 C42 113 36 110 36 104 Z"
          fill="url(#catFur)"
        />

        {/* Aksamitny jaśniejszy krawacik na klatce piersiowej */}
        <path
          d="M55 74 C59 72 69 72 73 74 C75 84 71 95 64 98 C57 95 53 84 55 74 Z"
          fill="url(#catChest)"
        />

        {/* Tylne łapki ze słodkimi różowymi poduszeczkami */}
        <ellipse cx="44" cy="111" rx="8.5" ry="5.5" fill="#151720" />
        <ellipse cx="84" cy="111" rx="8.5" ry="5.5" fill="#151720" />
        <circle cx="41.5" cy="111" r="1.5" fill="#F472B6" opacity="0.85" />
        <circle cx="44.5" cy="110.5" r="1.5" fill="#F472B6" opacity="0.85" />
        <circle cx="47.5" cy="111" r="1.5" fill="#F472B6" opacity="0.85" />
        <circle cx="80.5" cy="111" r="1.5" fill="#F472B6" opacity="0.85" />
        <circle cx="83.5" cy="110.5" r="1.5" fill="#F472B6" opacity="0.85" />
        <circle cx="86.5" cy="111" r="1.5" fill="#F472B6" opacity="0.85" />

        {/* Terakotowa obróżka ze złotym medalikiem „M” */}
        <path
          d="M44 71 C52 76 76 76 84 71"
          stroke="url(#collarLeather)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="64" cy="77" r="6" fill="url(#medalGold)" stroke="#854D0E" strokeWidth="1.2" />
        <circle cx="64" cy="77" r="4.6" stroke="#FEF08A" strokeWidth="0.8" fill="none" opacity="0.75" />
        <text
          x="64"
          y="79.5"
          textAnchor="middle"
          fill="#713F12"
          fontSize="6.8"
          fontWeight="900"
          fontFamily="sans-serif"
        >
          M
        </text>

        {/* Prawdziwe, zaokrąglone kocie uszka z puszkiem w środku (żadnych lisich szpiców!) */}
        <g className="mk-maks-ear-left">
          {/* Zewnętrzne ucho: łagodnie wygięty koci kontur z zaokrąglonym czubkiem */}
          <path
            d="M35 42 C33 34 32 26 34 22 C35 20 38 20.5 41 23 C46 27 51 29 55 29 L53 39 Z"
            fill="url(#catFur)"
            stroke="#151720"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* Różowe wnętrze uszka */}
          <path
            d="M38 38 C37 32 36 27 37 24 C38 23 40 23.5 42 25.5 C46 29 49 30 51 31 Z"
            fill="url(#catEarInner)"
            opacity="0.9"
          />
          {/* Delikatne jasne kępki futerka u nasady uszka */}
          <path
            d="M50 33 C47 32 45 34 43 32 C45 35 48 35 51 35"
            stroke="#E2E8F0"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </g>

        <g className="mk-maks-ear-right">
          <path
            d="M93 42 C95 34 96 26 94 22 C93 20 90 20.5 87 23 C82 27 77 29 73 29 L75 39 Z"
            fill="url(#catFur)"
            stroke="#151720"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M90 38 C91 32 92 27 91 24 C90 23 88 23.5 86 25.5 C82 29 79 30 77 31 Z"
            fill="url(#catEarInner)"
            opacity="0.9"
          />
          <path
            d="M77 33 C80 32 82 34 84 32 C82 35 79 35 76 35"
            stroke="#E2E8F0"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </g>

        {/* Kocia główka z pulchnymi policzkami i słodkimi zaokrągleniami */}
        <path
          d="M64 26 C75 26 84 28 89 35 C94 41 96 48 96 54 C96 61 90 66 82 67 C74 68 68 68.5 64 68.5 C60 68.5 54 68 46 67 C38 66 32 61 32 54 C32 48 34 41 39 35 C44 28 53 26 64 26 Z"
          fill="url(#catFur)"
        />

        {/* Drobne kępki futerka na policzkach */}
        <path d="M32 51 L28 53 L32 56" stroke="#25293A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M96 51 L100 53 L96 56" stroke="#25293A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

        {/* Łagodny odblask światła na czole dający trójwymiarowość */}
        <path
          d="M46 32 C54 28 74 28 82 32"
          stroke="#4A5168"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M60 25 L64 20 L68 25"
          stroke="#2B2F40"
          strokeWidth="2.4"
          strokeLinecap="round"
        />

        {/* Czapeczka detektywa w trybie 'detective' */}
        {mood === 'detective' && (
          <g>
            <ellipse cx="64" cy="23" rx="22" ry="7" fill="#B45309" stroke="#78350F" strokeWidth="1.6" />
            <path d="M46 23 C46 13 82 13 82 23 Z" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
            <path d="M78 23 L94 26 L81 27 Z" fill="#78350F" />
            <circle cx="64" cy="13" r="2.5" fill="#78350F" />
          </g>
        )}

        {/* Wyraziste, migdałowo-okrągłe kocie oczy z podwójnym blaskiem refleksu */}
        {mood === 'sleeping' ? (
          <g>
            <path
              d="M42 47 C45 52 54 52 57 47"
              stroke="#FBBF24"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M71 47 C74 52 83 52 86 47"
              stroke="#FBBF24"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <text x="94" y="26" fill="var(--mk-primary)" fontSize="15" fontWeight="900" fontFamily="sans-serif">
              Zzz
            </text>
          </g>
        ) : (
          <g className="mk-maks-eyes">
            {/* Tęczówka lewego oka z kocim kształtem */}
            <ellipse cx="49.5" cy="46.5" rx="8.5" ry="9" fill="url(#amberEye)" />
            {/* Tęczówka prawego oka */}
            <ellipse cx="78.5" cy="46.5" rx="8.5" ry="9" fill="url(#amberEye)" />

            {/* Górna linia rzęs (koci eyeliner) */}
            <path d="M41 46 C43 39 55 38 58 45" stroke="#0B0C12" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M70 45 C73 38 85 39 87 46" stroke="#0B0C12" strokeWidth="2.2" strokeLinecap="round" />

            {/* Feline źrenice – pionowe, kocie owoidy */}
            <ellipse
              cx={mood === 'pointing' || mood === 'chasing' ? 51.5 : 49.5}
              cy="47"
              rx={mood === 'celebrating' || mood === 'curious' ? 4.8 : 4.2}
              ry="7.5"
              fill="#090A0E"
            />
            <ellipse
              cx={mood === 'pointing' || mood === 'chasing' ? 80.5 : 78.5}
              cy="47"
              rx={mood === 'celebrating' || mood === 'curious' ? 4.8 : 4.2}
              ry="7.5"
              fill="#090A0E"
            />

            {/* Dolny złocisty odblask tęczówki */}
            <path d="M43 49 C47 54 52 54 56 49" stroke="#FEF08A" strokeWidth="1.2" fill="none" opacity="0.75" />
            <path d="M72 49 C76 54 81 54 85 49" stroke="#FEF08A" strokeWidth="1.2" fill="none" opacity="0.75" />

            {/* Główne błyski światła (Catchlights) dodające kotkowi życia i inteligencji */}
            <circle cx="47" cy="43.5" r="2.5" fill="#FFFFFF" />
            <circle cx="76" cy="43.5" r="2.5" fill="#FFFFFF" />
            <circle cx="53" cy="49.5" r="1.3" fill="#FFFFFF" opacity="0.85" />
            <circle cx="82" cy="49.5" r="1.3" fill="#FFFFFF" opacity="0.85" />
          </g>
        )}

        {/* Okulary do czytania w trybie 'reading' */}
        {mood === 'reading' && (
          <g>
            <circle cx="49.5" cy="46.5" r="11" stroke="#EAB308" strokeWidth="2.2" fill="url(#lensGlass)" />
            <circle cx="78.5" cy="46.5" r="11" stroke="#EAB308" strokeWidth="2.2" fill="url(#lensGlass)" />
            <line x1="60.5" y1="46.5" x2="67.5" y2="46.5" stroke="#EAB308" strokeWidth="2.2" />
            <line x1="38.5" y1="46.5" x2="34" y2="44" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="89.5" y1="46.5" x2="94" y2="44" stroke="#EAB308" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}

        {/* KOCIE PODUSZECZKI WĄSÓW („ω”) – element, który jednoznacznie czyni go kotem */}
        <ellipse cx="58.5" cy="58" rx="6.2" ry="4.4" fill="#232738" opacity="0.9" />
        <ellipse cx="69.5" cy="58" rx="6.2" ry="4.4" fill="#232738" opacity="0.9" />

        {/* Słodki różowy koci nosek w kształcie zaokrąglonego serduszka */}
        <path
          d="M60.8 53.5 C60.8 52.6 61.6 52 62.6 52 H65.4 C66.4 52 67.2 52.6 67.2 53.5 C67.2 54.4 65.2 57.5 64 57.5 C62.8 57.5 60.8 54.4 60.8 53.5 Z"
          fill="#F472B6"
        />
        <ellipse cx="64" cy="53.2" rx="1.8" ry="0.6" fill="#FFFFFF" opacity="0.85" />

        {/* Rynienka podnosowa i koci uśmiech */}
        <line x1="64" y1="56.8" x2="64" y2="58.2" stroke="#F472B6" strokeWidth="1.6" strokeLinecap="round" />
        {mood === 'celebrating' ? (
          <g>
            <path d="M60 58.5 C60 63.5 68 63.5 68 58.5 Z" fill="#E11D48" />
            <ellipse cx="64" cy="61" rx="2.5" ry="1.4" fill="#F472B6" />
            <path
              d="M57 58 C59 60.5 62.5 60 64 58.2 C65.5 60 69 60.5 71 58"
              stroke="#F472B6"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : (
          <path
            d="M57 58 C59 61 62.8 60.5 64 58.2 C65.2 60.5 69 61 71 58"
            stroke="#F472B6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}

        {/* Kropeczki mieszków włosowych na poduszeczkach */}
        <circle cx="56" cy="57" r="0.75" fill="#64748B" />
        <circle cx="58" cy="59" r="0.75" fill="#64748B" />
        <circle cx="56" cy="60" r="0.75" fill="#64748B" />
        <circle cx="72" cy="57" r="0.75" fill="#64748B" />
        <circle cx="70" cy="59" r="0.75" fill="#64748B" />
        <circle cx="72" cy="60" r="0.75" fill="#64748B" />

        {/* Długie, sprężyste kocie wąsy (vibrissae) – lekko wygięte, nie proste kreski */}
        <path d="M54 56 C38 54 22 55 10 58" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M53 58.5 C36 60 20 63 9 68" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M54 61 C39 65 24 71 14 77" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />

        <path d="M74 56 C90 54 106 55 118 58" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M75 58.5 C92 60 108 63 119 68" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.9" />
        <path d="M74 61 C89 65 104 71 114 77" stroke="#F1F5F9" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />

        {/* Drobne wąsiki nadoczne */}
        <path d="M46 36 C42 32 38 30 34 29" stroke="#E2E8F0" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />
        <path d="M82 36 C86 32 90 30 94 29" stroke="#E2E8F0" strokeWidth="1.1" strokeLinecap="round" opacity="0.75" />

        {/* Rumieńce na pulchnych policzkach */}
        <ellipse cx="38" cy="56" rx="5" ry="2.8" fill="#F472B6" opacity="0.32" />
        <ellipse cx="90" cy="56" rx="5" ry="2.8" fill="#F472B6" opacity="0.32" />

        {/* Przednie łapki i rekwizyty zależnie od sytuacji */}
        {(mood === 'pointing' || mood === 'peeking') && (
          <g>
            <ellipse cx="46" cy="88" rx="7" ry="11" fill="#181A24" />
            <ellipse cx="46" cy="95" rx="4" ry="2.5" fill="#242838" />
            <g className="mk-maks-paw">
              <path
                d="M84 82 C94 74 103 66 109 61"
                stroke="#181A24"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx="110" cy="60" r="6" fill="#232738" />
              {/* Różowe poduszeczki uniesionej kociej łapki */}
              <circle cx="112" cy="58" r="2.4" fill="#F472B6" />
              <circle cx="108" cy="56" r="1.2" fill="#F472B6" />
              <circle cx="111" cy="54" r="1.2" fill="#F472B6" />
              {/* Magiczna iskierka podpowiedzi na czubku łapki */}
              <path
                d="M118 45 L120 51 L126 53 L120 55 L118 61 L116 55 L110 53 L116 51 Z"
                fill="#FBBF24"
              />
              <circle cx="118" cy="53" r="1.5" fill="#FFFFFF" />
            </g>
          </g>
        )}

        {mood === 'chasing' && (
          <g className="mk-maks-paw">
            <path d="M40 84 C30 76 24 68 20 62" stroke="#181A24" strokeWidth="11" strokeLinecap="round" />
            <path d="M86 84 C96 76 104 68 108 62" stroke="#181A24" strokeWidth="11" strokeLinecap="round" />
            {/* Czerwona kropka laserka / wskaźnik, za którym pędzi kotek */}
            <circle cx="112" cy="54" r="9" fill="#EF4444" opacity="0.25" />
            <circle cx="112" cy="54" r="6" fill="#EF4444" stroke="#FCA5A5" strokeWidth="1.5" />
            <path d="M108 52 C111 49 115 57 117 53" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {mood === 'curious' && (
          <g>
            <ellipse cx="48" cy="90" rx="7" ry="11" fill="#181A24" />
            <path d="M80 86 C86 78 88 68 82 62" stroke="#181A24" strokeWidth="11" strokeLinecap="round" />
            <text x="96" y="34" fill="var(--mk-primary)" fontSize="22" fontWeight="800" fontFamily="sans-serif">
              ?
            </text>
          </g>
        )}

        {mood === 'celebrating' && (
          <g className="mk-maks-paw">
            <path d="M40 80 C30 70 24 58 22 50" stroke="#181A24" strokeWidth="11" strokeLinecap="round" />
            <path d="M88 80 C98 70 104 58 106 50" stroke="#181A24" strokeWidth="11" strokeLinecap="round" />
            {/* Słodkie poduszeczki łapek uniesionych w geście radości */}
            <circle cx="21" cy="49" r="6" fill="#232738" />
            <circle cx="21" cy="49" r="2.8" fill="#F472B6" />
            <circle cx="107" cy="49" r="6" fill="#232738" />
            <circle cx="107" cy="49" r="2.8" fill="#F472B6" />
            {/* Konfetti sukcesu */}
            <path d="M18 30 L20.5 36 L27 38.5 L20.5 41 L18 47 L15.5 41 L9 38.5 L15.5 36 Z" fill="#F6C445" />
            <path d="M110 26 L112 31 L117 33 L112 35 L110 40 L108 35 L103 33 L108 31 Z" fill="#34D399" />
            <circle cx="64" cy="12" r="3.5" fill="#F472B6" />
            <path d="M25 20 L27 24 L31 25 L27 26 L25 30 L23 26 L19 25 L23 24 Z" fill="#A78BFA" />
          </g>
        )}

        {mood === 'reading' && (
          <g>
            <path d="M40 86 L64 91 L88 86 V105 L64 110 L40 105 Z" fill="#FFFDF8" stroke="#D97706" strokeWidth="2" />
            <line x1="64" y1="91" x2="64" y2="110" stroke="#D97706" strokeWidth="1.8" />
            <line x1="46" y1="93" x2="59" y2="95" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="46" y1="98" x2="57" y2="100" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="69" y1="95" x2="82" y2="93" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="71" y1="100" x2="82" y2="98" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="40" cy="95" rx="5.5" ry="5" fill="#181A24" />
            <ellipse cx="88" cy="95" rx="5.5" ry="5" fill="#181A24" />
          </g>
        )}

        {mood === 'detective' && (
          <g>
            <ellipse cx="46" cy="90" rx="7" ry="10" fill="#181A24" />
            <g className="mk-maks-paw">
              <path d="M82 86 L96 74" stroke="#181A24" strokeWidth="10" strokeLinecap="round" />
              <circle cx="104" cy="63" r="12" fill="#E0F2FE" fillOpacity="0.75" stroke="#D97706" strokeWidth="3" />
              <line x1="95" y1="72" x2="86" y2="82" stroke="#92400E" strokeWidth="4.2" strokeLinecap="round" />
              <path d="M97 58 C99 55 106 55 109 57" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {mood === 'comforting' && (
          <g>
            <path
              d="M64 102 C64 102 52 94 52 86 C52 81.5 55.5 78.5 59.5 78.5 C62 78.5 64 80 64 82 C64 80 66 78.5 68.5 78.5 C72.5 78.5 76 81.5 76 86 C76 94 64 102 64 102 Z"
              fill="#F43F5E"
            />
            <circle cx="58" cy="83" r="2.5" fill="#FDA4AF" opacity="0.8" />
            <ellipse cx="50" cy="89" rx="6.5" ry="9" fill="#181A24" transform="rotate(20 50 89)" />
            <ellipse cx="78" cy="89" rx="6.5" ry="9" fill="#181A24" transform="rotate(-20 78 89)" />
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
          {/* Kotek Maks wyglądający zza okna – w 100% kocia anatomia */}
          <path d="M63 43 C61 36 61 32 63.5 30 C65 29 67 30 69 32 C71 34 72 37 72 40 Z" fill="#1B1D28" />
          <path d="M64.5 40 C63.5 36 64 33 65 31.5 C65.8 30.5 67 31 68 32.5 C69 34 69.5 36 70 38 Z" fill="#F472B6" />
          <path d="M85 43 C87 36 87 32 84.5 30 C83 29 81 30 79 32 C77 34 76 37 76 40 Z" fill="#1B1D28" />
          <path d="M83.5 40 C84.5 36 84 33 83 31.5 C82.2 30.5 81 31 80 32.5 C79 34 78.5 36 78 38 Z" fill="#F472B6" />
          <path d="M74 36 C79 36 84 38 86 42 C88 45 88 49 87 53 C86 57 82 61 74 61 C66 61 62 57 61 53 C60 49 60 45 62 42 C64 38 69 36 74 36 Z" fill="#1B1D28" />
          <ellipse cx="69" cy="46" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="79" cy="46" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="69" cy="46" rx="1.3" ry="2.2" fill="#0D0E15" />
          <ellipse cx="79" cy="46" rx="1.3" ry="2.2" fill="#0D0E15" />
          <circle cx="68" cy="44.8" r="0.9" fill="#FFFFFF" />
          <circle cx="78" cy="44.8" r="0.9" fill="#FFFFFF" />
          <ellipse cx="72" cy="51" rx="1.8" ry="1.3" fill="#25293A" />
          <ellipse cx="76" cy="51" rx="1.8" ry="1.3" fill="#25293A" />
          <path d="M72.5 49.5 H75.5 L74 51 Z" fill="#F472B6" />
          <line x1="62" y1="50" x2="69" y2="50.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="86" y1="50" x2="79" y2="50.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
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
          {/* Kotek Maks przy programach – kocia główka */}
          <path d="M64 56 C62 50 62 46 64.5 44 C66 43 68 44 70 46 C72 48 73 51 73 54 Z" fill="#1B1D28" />
          <path d="M65.5 53 C64.5 49 65 46.5 66 45 C66.8 44 68 44.5 69 46 C70 47.5 70.5 49.5 71 51 Z" fill="#F472B6" />
          <path d="M86 56 C88 50 88 46 85.5 44 C84 43 82 44 80 46 C78 48 77 51 77 54 Z" fill="#1B1D28" />
          <path d="M84.5 53 C85.5 49 85 46.5 84 45 C83.2 44 82 44.5 81 46 C80 47.5 79.5 49.5 79 51 Z" fill="#F472B6" />
          <path d="M75 49 C80 49 85 51 87 55 C89 58 89 62 88 66 C87 70 83 74 75 74 C67 74 63 70 62 66 C61 62 61 58 63 55 C65 51 70 49 75 49 Z" fill="#1B1D28" />
          <ellipse cx="70.5" cy="59" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="80.5" cy="59" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="70.5" cy="59" rx="1.3" ry="2.2" fill="#0D0E15" />
          <ellipse cx="80.5" cy="59" rx="1.3" ry="2.2" fill="#0D0E15" />
          <circle cx="69.5" cy="57.8" r="0.9" fill="#FFFFFF" />
          <circle cx="79.5" cy="57.8" r="0.9" fill="#FFFFFF" />
          <ellipse cx="73.5" cy="64" rx="1.8" ry="1.3" fill="#25293A" />
          <ellipse cx="77.5" cy="64" rx="1.8" ry="1.3" fill="#25293A" />
          <path d="M74 62.5 H77 L75.5 64 Z" fill="#F472B6" />
          <line x1="64" y1="63" x2="71" y2="63.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="87" y1="63" x2="80" y2="63.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
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
          {/* Kotek Maks przy iPhonie – kocia główka */}
          <path d="M22 41 C20 35 20 31 22.5 29 C24 28 26 29 28 31 C30 33 31 36 31 39 Z" fill="#1B1D28" />
          <path d="M23.5 38 C22.5 34 23 31.5 24 30 C24.8 29 26 29.5 27 31 C28 32.5 28.5 34.5 29 36 Z" fill="#F472B6" />
          <path d="M42 41 C44 35 44 31 41.5 29 C40 28 38 29 36 31 C34 33 33 36 33 39 Z" fill="#1B1D28" />
          <path d="M40.5 38 C41.5 34 41 31.5 40 30 C39.2 29 38 29.5 37 31 C36 32.5 35.5 34.5 35 36 Z" fill="#F472B6" />
          <path d="M32 35 C37 35 41 37 43 41 C45 44 45 47 44 51 C43 55 39 58 32 58 C25 58 21 55 20 51 C19 47 19 44 21 41 C23 37 27 35 32 35 Z" fill="#1B1D28" />
          <ellipse cx="28" cy="45" rx="2.5" ry="2.9" fill="#F59E0B" />
          <ellipse cx="36" cy="45" rx="2.5" ry="2.9" fill="#F59E0B" />
          <ellipse cx="28" cy="45" rx="1.2" ry="2" fill="#0D0E15" />
          <ellipse cx="36" cy="45" rx="1.2" ry="2" fill="#0D0E15" />
          <circle cx="27.2" cy="44" r="0.8" fill="#FFFFFF" />
          <circle cx="35.2" cy="44" r="0.8" fill="#FFFFFF" />
          <ellipse cx="30.5" cy="49" rx="1.6" ry="1.2" fill="#25293A" />
          <ellipse cx="33.5" cy="49" rx="1.6" ry="1.2" fill="#25293A" />
          <path d="M31 47.8 H33 L32 49.2 Z" fill="#F472B6" />
          <line x1="22" y1="48.5" x2="28" y2="49.2" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="42" y1="48.5" x2="36" y2="49.2" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
        </svg>
      );
    case 'ai':
    default:
      return (
        <svg viewBox="0 0 96 96" fill="none" className={className} role="img" aria-label="Ścieżka Sztuczna Inteligencja z kotkiem Maksem">
          <rect x="10" y="16" width="66" height="50" rx="14" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" />
          <path d="M28 66L20 78L38 66" fill="var(--mk-success-soft)" stroke="var(--mk-track-ai)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M40 25L43 34L52 37L43 40L40 49L37 40L28 37L37 34L40 25Z" fill="var(--mk-track-ai)" />
          {/* Kotek Maks asystujący AI – kocia główka */}
          <path d="M63 52 C61 46 61 42 63.5 40 C65 39 67 40 69 42 C71 44 72 47 72 50 Z" fill="#1B1D28" />
          <path d="M64.5 49 C63.5 45 64 42.5 65 41 C65.8 40 67 40.5 68 42 C69 43.5 69.5 45.5 70 47 Z" fill="#F472B6" />
          <path d="M85 52 C87 46 87 42 84.5 40 C83 39 81 40 79 42 C77 44 76 47 76 50 Z" fill="#1B1D28" />
          <path d="M83.5 49 C84.5 45 84 42.5 83 41 C82.2 40 81 40.5 80 42 C79 43.5 78.5 45.5 78 47 Z" fill="#F472B6" />
          <path d="M74 46 C79 46 84 48 86 52 C88 55 88 59 87 63 C86 67 82 71 74 71 C66 71 62 67 61 63 C60 59 60 55 62 52 C64 48 69 46 74 46 Z" fill="#1B1D28" />
          <ellipse cx="69" cy="56" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="79" cy="56" rx="2.8" ry="3.2" fill="#F59E0B" />
          <ellipse cx="69" cy="56" rx="1.3" ry="2.2" fill="#0D0E15" />
          <ellipse cx="79" cy="56" rx="1.3" ry="2.2" fill="#0D0E15" />
          <circle cx="68" cy="54.8" r="0.9" fill="#FFFFFF" />
          <circle cx="78" cy="54.8" r="0.9" fill="#FFFFFF" />
          <ellipse cx="72" cy="61" rx="1.8" ry="1.3" fill="#25293A" />
          <ellipse cx="76" cy="61" rx="1.8" ry="1.3" fill="#25293A" />
          <path d="M72.5 59.5 H75.5 L74 61 Z" fill="#F472B6" />
          <line x1="62" y1="60" x2="69" y2="60.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="86" y1="60" x2="79" y2="60.8" stroke="#F1F5F9" strokeWidth="0.8" strokeLinecap="round" />
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
    <g transform="translate(72, 68)">
      {/* Cień pod odznaką */}
      <ellipse cx="20" cy="37" rx="13" ry="3" fill="#000000" opacity="0.14" />
      {/* Zaokrąglone kocie uszka z różowym wnętrzem (żadnych lisich szpiców) */}
      <path d="M7 16 C5 10 5 6 7.5 4 C9 3 11.5 4 13.5 6 C15.5 8 16.5 11 17 14 Z" fill="#1B1D28" />
      <path d="M8.5 13 C7.5 9.5 8 6.5 9 5 C9.8 4.2 11 5 12 6.5 C13 8 13.5 10 14 12 Z" fill="#F472B6" />
      <path d="M33 16 C35 10 35 6 32.5 4 C31 3 28.5 4 26.5 6 C24.5 8 23.5 11 23 14 Z" fill="#1B1D28" />
      <path d="M31.5 13 C32.5 9.5 32 6.5 31 5 C30.2 4.2 29 5 28 6.5 C27 8 26.5 10 26 12 Z" fill="#F472B6" />
      {/* Kocia główka z pulchnymi policzkami */}
      <path
        d="M20 9 C26 9 32 11 34 15 C36 18 36.5 22 36 26 C35 30.5 30 35 20 35 C10 35 5 30.5 4 26 C3.5 22 4 18 6 15 C8 11 14 9 20 9 Z"
        fill="#1B1D28"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Bursztynowe kocie oczy z żywym blaskiem */}
      <ellipse cx="14" cy="20" rx="3.4" ry="3.8" fill="#F59E0B" />
      <ellipse cx="26" cy="20" rx="3.4" ry="3.8" fill="#F59E0B" />
      <ellipse cx="14" cy="20.2" rx="1.6" ry="2.7" fill="#0D0E15" />
      <ellipse cx="26" cy="20.2" rx="1.6" ry="2.7" fill="#0D0E15" />
      <circle cx="12.8" cy="18.8" r="1.1" fill="#FFFFFF" />
      <circle cx="24.8" cy="18.8" r="1.1" fill="#FFFFFF" />
      {/* Kocie poduszeczki wąsów i różowy nosek */}
      <ellipse cx="17.8" cy="25.5" rx="2.4" ry="1.7" fill="#25293A" />
      <ellipse cx="22.2" cy="25.5" rx="2.4" ry="1.7" fill="#25293A" />
      <path d="M18.2 23.8 H21.8 L20 25.5 Z" fill="#F472B6" />
      {/* Wąsiki */}
      <line x1="7" y1="23.8" x2="15" y2="24.8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="7" y1="26.5" x2="15" y2="26.2" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="33" y1="23.8" x2="25" y2="24.8" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="33" y1="26.5" x2="25" y2="26.2" stroke="#FFFFFF" strokeWidth="0.9" strokeLinecap="round" />
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
