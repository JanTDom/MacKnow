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
      className="min-h-screen bg-[#0C0D12] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,90,50,0.18),rgba(255,255,255,0))] text-slate-100 flex flex-col justify-center items-center px-4 py-8 select-none relative overflow-hidden"
    >
      {/* Dynamiczne tło z miękkimi plamami światła */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Delikatny wewnętrzny odblask na górnej krawędzi */}
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Logo MacKnow */}
        <div className="flex justify-center mb-6">
          <MacKnowLogo />
        </div>

        {/* Kotek Maks wita użytkownika – ekskluzywny akcent maskotki */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-white/10 rounded-2xl p-4 mb-6 shadow-lg shadow-black/20">
          <div className="shrink-0 bg-slate-950/80 p-2.5 rounded-2xl border border-amber-400/30 shadow-inner flex items-center justify-center">
            <BlackCatGuide mood={catMood} className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/25 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                className={`w-full pl-11 pr-12 py-3.5 sm:py-4 bg-slate-950/90 border-2 ${
                  error
                    ? 'border-rose-500/80 focus:ring-rose-500/30'
                    : isSuccess
                    ? 'border-emerald-500/80 focus:ring-emerald-500/30'
                    : 'border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/25'
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
                className="mt-2 text-sm text-rose-300 bg-rose-950/70 border border-rose-800/80 rounded-xl px-3 py-2 leading-relaxed"
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
