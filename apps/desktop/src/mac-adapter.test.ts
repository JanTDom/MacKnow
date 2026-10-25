import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { MacAdapter } from './mac-adapter';
import { DesktopSqliteProgressStore } from './sqlite-store';
import { observeStepVerification, resolveStepForEnvironment } from '@macknow/core';
import { MACOS_MISSIONS } from '@macknow/missions';

describe('MacAdapter dla różnych wersji macOS (10.13, 10.15, 12, 15)', () => {
  const testedVersions = ['10.13.6', '10.15.7', '12.7.4', '15.1.0'];

  for (const version of testedVersions) {
    it(`poprawnie odczytuje sw_vers, frontmostApp i safariUrl oraz dobiera warianty dla macOS ${version}`, async () => {
      let openedAppArgs: string[] = [];

      const mockExec = async (cmd: string, args: string[]) => {
        if (cmd === 'sw_vers') {
          return { stdout: `${version}\n`, stderr: '' };
        }
        if (cmd === 'osascript' && args[1]?.includes('frontmost is true')) {
          return { stdout: 'Finder\n', stderr: '' };
        }
        if (cmd === 'osascript' && args[1]?.includes('Safari')) {
          return { stdout: 'https://apple.com/pl\n', stderr: '' };
        }
        if (cmd === 'open') {
          openedAppArgs = args;
          return { stdout: '', stderr: '' };
        }
        return { stdout: '', stderr: '' };
      };

      const adapter = new MacAdapter({
        exec: mockExec,
        readClipboard: () => 'Skopiowany tekst testowy',
      });

      expect(await adapter.osVersion()).toBe(version);
      expect(await adapter.frontmostApp()).toBe('Finder');
      expect(await adapter.safariUrl()).toBe('https://apple.com/pl');
      expect(await adapter.clipboardText()).toBe('Skopiowany tekst testowy');

      await adapter.openApp('System Settings');
      if (version === '10.13.6' || version === '10.15.7' || version === '12.7.4') {
        expect(openedAppArgs).toEqual(['-a', 'System Preferences']);
      } else {
        expect(openedAppArgs).toEqual(['-a', 'System Settings']);
      }

      // Weryfikacja przełączania wariantów misji Zrzut ekranu (macos-03) i Ustawienia (macos-08)
      const screenshotMission = MACOS_MISSIONS.find((m) => m.id === 'macos-03-zrzut-ekranu')!;
      const resolvedScreenshotStep = resolveStepForEnvironment(
        screenshotMission.steps[0],
        version,
        adapter,
        true
      );
      if (version === '10.13.6') {
        expect(resolvedScreenshotStep.instruction).toContain('⌘⇧4');
      } else {
        expect(resolvedScreenshotStep.instruction).toContain('⌘⇧5');
      }

      const settingsMission = MACOS_MISSIONS.find((m) => m.id === 'macos-08-ustawienia')!;
      const resolvedSettingsStep = resolveStepForEnvironment(
        settingsMission.steps[0],
        version,
        adapter,
        true
      );
      if (version === '15.1.0') {
        expect(resolvedSettingsStep.instruction).toContain('Ustawienia systemowe');
      } else {
        expect(resolvedSettingsStep.instruction).toContain('Preferencje systemowe');
      }
    });
  }

  it('weryfikuje w czasie rzeczywistym nowy plik zrzutu ekranu na Pulpicie i przechodzi do trybu manual przy braku uprawnień', async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'macknow-desktop-test-'));
    const desktopDir = path.join(tmpDir, 'Desktop');
    fs.mkdirSync(desktopDir, { recursive: true });

    const adapter = new MacAdapter({
      homedir: tmpDir,
      usePolling: true,
      exec: async (cmd) => {
        if (cmd === 'sw_vers') return { stdout: '14.5\n', stderr: '' };
        throw new Error('Brak uprawnień Dostępności');
      },
    });

    // Gdy osascript rzuca błąd braku uprawnień, frontmostApp zwraca null, a isAvailable('frontmostApp') -> false
    expect(await adapter.frontmostApp()).toBeNull();
    expect(adapter.isAvailable('frontmostApp')).toBe(false);

    // Krok wymagający frontmostApp bezpiecznie degraduje się do manual bez rzucania błędów
    const finderMission = MACOS_MISSIONS[0];
    const degraded = resolveStepForEnvironment(finderMission.steps[0], '14.5', adapter, true);
    expect(degraded.verify.type).toBe('manual');

    // Weryfikacja real-time zrzutu ekranu przez watchFolder (chokidar)
    const screenshotMission = MACOS_MISSIONS.find((m) => m.id === 'macos-03-zrzut-ekranu')!;
    const captureStep = screenshotMission.steps[1];

    const detectedPromise = new Promise<string>((resolve) => {
      const { stop } = observeStepVerification(
        captureStep,
        '14.5',
        adapter,
        true,
        (msg) => {
          stop();
          resolve(msg || '');
        }
      );
    });

    setTimeout(() => {
      fs.writeFileSync(
        path.join(desktopDir, 'Zrzut ekranu 2026-10-25 o 11.40.00.png'),
        'fake-png'
      );
    }, 150);

    const notice = await detectedPromise;
    expect(notice).toContain('Jest! Widzę go na Pulpicie');

    // Test zapisu i odczytu SQLite w DesktopSqliteProgressStore
    const store = new DesktopSqliteProgressStore(tmpDir);
    await store.saveProgress('{"version":1,"completedMissions":{"macos-01":{"missionId":"macos-01","completedAt":"2026-10-25","hintsUsed":0}},"readTheoryIds":[],"settings":{}}');
    const loaded = await store.loadProgress();
    expect(loaded).toContain('macos-01');

    fs.rmSync(tmpDir, { recursive: true, force: true });
  });
});
