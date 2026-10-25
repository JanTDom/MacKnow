'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BlackCatGuide, CatMood, MacKnowLogo, pl } from '@macknow/ui';

interface MaksLoginScreenProps {
  onSuccess: () => void;
}

const CORRECT_PASSWORD = 'Maksik123';
const STORAGE_KEY = 'macknow_auth_session';

export function isUserAuthenticated(): boolean {
  // Jeśli to desktop Electron, logowanie nie jest wymagane
  if (typeof window !== 'undefined' && window.macknowDesktop?.isElectron) {
    return true;
  }
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) === 'authenticated';
    }
  } catch {
    return false;
  }
  return false;
}

export function logoutUser(): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignoruj błąd storage
  }
}

export function MaksLoginScreen({ onSuccess }: MaksLoginScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [catMood, setCatMood] = useState<CatMood>('curious');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPassword = password.trim();

    if (!cleanPassword) {
      setError('Wpisz hasło dostępu, aby wejść do przewodnika.');
      setCatMood('detective');
      return;
    }

    if (cleanPassword === CORRECT_PASSWORD) {
      setError(null);
      setIsSuccess(true);
      setCatMood('celebrating');

      if (rememberMe) {
        try {
          localStorage.setItem(STORAGE_KEY, 'authenticated');
        } catch {
          // ignoruj błąd zapisu
        }
      }

      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      setError('Nieprawidłowe hasło. Pamiętaj: zaczyna się od wielkiej litery „M”.');
      setCatMood('detective');
    }
  };

  return (
    <main
      role="main"
      className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 select-none"
    >
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Dekoracyjny blask w tle */}
        <div
          className="absolute -top-24 -right-24 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Logo MacKnow */}
        <div className="flex justify-center mb-6">
          <MacKnowLogo />
        </div>

        {/* Kotek Maks wita użytkownika */}
        <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 mb-6">
          <div className="shrink-0 bg-slate-950/60 p-2 rounded-2xl border border-amber-400/40 shadow-inner">
            <BlackCatGuide mood={catMood} className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              {pl('Kotek Maks')}
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-100 leading-snug">
              {isSuccess
                ? pl('Cudownie! Otwieram Twój przewodnik…')
                : pl('Dzień dobry Małgorzato! Podaj hasło, a zaczynamy ćwiczenia.')}
            </p>
          </div>
        </div>

        {/* Formularz logowania */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="maks-password-input"
              className="block text-sm sm:text-base font-semibold text-slate-200 mb-2"
            >
              {pl('Hasło dostępu')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <input
                id="maks-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                  if (catMood !== 'pointing') setCatMood('pointing');
                }}
                placeholder={pl('Wpisz hasło…')}
                autoFocus
                disabled={isSuccess}
                className={`w-full pl-11 pr-12 py-3.5 sm:py-4 bg-slate-950 border-2 ${
                  error
                    ? 'border-rose-500 focus:ring-rose-500'
                    : isSuccess
                    ? 'border-emerald-500 focus:ring-emerald-500'
                    : 'border-slate-700 focus:border-amber-400 focus:ring-amber-400/30'
                } rounded-2xl text-slate-100 text-lg sm:text-xl font-medium tracking-wide placeholder-slate-500 focus:outline-none focus:ring-4 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? pl('Ukryj hasło') : pl('Pokaż wpisane hasło')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 focus:outline-none focus:text-amber-300"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-2 text-sm text-rose-300 bg-rose-950/60 border border-rose-800/80 rounded-xl px-3 py-2 leading-relaxed"
              >
                {pl(error)}
              </p>
            )}
          </div>

          {/* Opcja zapamiętaj na tym komputerze */}
          <div className="flex items-center justify-between text-sm sm:text-base">
            <label className="flex items-center gap-2.5 cursor-pointer text-slate-300 hover:text-slate-100">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded-md border-slate-600 bg-slate-950 text-amber-500 focus:ring-amber-400/40 focus:ring-offset-slate-900 cursor-pointer"
              />
              <span>{pl('Zapamiętaj mnie na tym komputerze')}</span>
            </label>
          </div>

          {/* Przycisk logowania */}
          <button
            type="submit"
            disabled={isSuccess}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 transition-all transform active:scale-98 shadow-xl ${
              isSuccess
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:shadow-amber-500/25'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
                <span>{pl('Zalogowano poprawnie!')}</span>
              </>
            ) : (
              <>
                <span>{pl('Wejdź do programu')}</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
        </form>

        {/* Wskazówka i bezpieczeństwo */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{pl('Bezpieczne, osobiste środowisko nauki dla Małgorzaty')}</span>
        </div>
      </div>
    </main>
  );
}
