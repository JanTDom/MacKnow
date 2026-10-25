import { describe, it, expect, beforeEach } from 'vitest';
import { isUserAuthenticated, logoutUser } from './components/MaksLoginScreen';

describe('Logowanie do aplikacji webowej z kotem Maksem (hasło: Maksik123)', () => {
  beforeEach(() => {
    // Symulacja czystego localStorage
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
      length: 0,
      key: () => null,
    };
    // Domyślnie brak electron bridge
    delete (global as unknown as { window?: { macknowDesktop?: unknown } }).window;
  });

  it('zwraca false dla niezalogowanego użytkownika na www', () => {
    expect(isUserAuthenticated()).toBe(false);
  });

  it('zwraca true, jeśli w localStorage jest zapisana sesja autoryzacji', () => {
    localStorage.setItem('macknow_auth_session', 'authenticated');
    expect(isUserAuthenticated()).toBe(true);
  });

  it('logoutUser poprawnie usuwa sesję z localStorage', () => {
    localStorage.setItem('macknow_auth_session', 'authenticated');
    expect(isUserAuthenticated()).toBe(true);
    logoutUser();
    expect(isUserAuthenticated()).toBe(false);
  });

  it('zwraca true w środowisku Electron desktop (brak wymogu logowania w aplikacji lokalnej)', () => {
    (global as unknown as { window: { macknowDesktop: { isElectron: boolean } } }).window = {
      macknowDesktop: { isElectron: true },
    };
    expect(isUserAuthenticated()).toBe(true);
  });
});
