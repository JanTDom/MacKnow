import { test, expect } from '@playwright/test';

test.describe('MacKnow E2E (Chromium oraz WebKit / Safari)', () => {
  test('przechodzi pełną misję w motywie nowego Maca (modern) oraz starego Maca (classic) i sprawdza wszystkie 7 ekranów', async ({
    page,
  }) => {
    await page.goto('/');

    // 1. Ekran Start + weryfikacja stuprocentowo nieprzezroczystego paska górnego i kota Maksa
    await expect(page.getByTestId('screen-start')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Małgorzato');
    await expect(page.getByTestId('screen-start')).toContainText('Kotek Maks');

    const headerBg = await page.locator('header.mk-sticky-header').evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    expect(headerBg).not.toBe('rgba(0, 0, 0, 0)');
    expect(headerBg).not.toBe('transparent');

    // Wybieramy „Nowe Ustawienia systemowe” (motyw modern)
    await page.getByTestId('mac-look-new').click();

    // Rozpoczynamy pierwszą sugerowaną misję (macos-01-pulpit-dock)
    await page.getByTestId('start-mission-macos-01-pulpit-dock').click();
    await expect(page.getByTestId('screen-mission')).toBeVisible();

    // Karta teorii przed krokami -> sprawdzamy obecność i przechodzimy do kroków
    await expect(page.getByTestId('mission-theory-card')).toBeVisible();
    await page.getByTestId('start-steps-btn').click();

    // Krok 1 z 3 (motyw modern) + test asystenta sytuacyjnego Maks AI oraz przełącznika Prawdziwy Mac
    await expect(page.getByTestId('step-counter')).toContainText('krok 1 z 3');
    const simModern = page.getByTestId('mac-simulator');
    await expect(simModern).toHaveAttribute('data-simulator-theme', 'modern');

    await expect(page.getByTestId('step-ai-assistant')).toBeVisible();
    await page.getByTestId('step-ai-input').fill('U mnie na ekranie wygląda to inaczej');
    await page.getByTestId('step-ai-submit').click();
    await expect(page.getByTestId('step-ai-response')).toBeVisible();

    await page.getByTestId('header-real-mac-toggle').click();
    await expect(page.getByTestId('real-mac-global-bar')).toBeVisible();
    await expect(page.getByTestId('real-mac-step-panel')).toContainText('Tryb Prawdziwego Maca AKTYWNY');

    // Testujemy „Zacięłam się” (hint 1 -> hint 2) oraz powrót do teorii
    await page.getByTestId('stuck-btn').click();
    await expect(page.getByTestId('step-hint-1')).toBeVisible();
    await page.getByTestId('stuck-btn').click();
    await expect(page.getByTestId('step-hint-2')).toBeVisible();

    await page.getByTestId('back-to-theory-btn').click();
    await expect(page.getByTestId('mission-theory-card')).toBeVisible();
    await page.getByTestId('skip-theory-btn').click();

    // Wykonujemy Krok 1, Krok 2 i Krok 3 w symulatorze
    await page.getByTestId('simulator-target').click();
    await expect(page.getByTestId('step-counter')).toContainText('krok 2 z 3');

    await page.getByTestId('simulator-target').click();
    await expect(page.getByTestId('step-counter')).toContainText('krok 3 z 3');

    await page.getByTestId('simulator-target').click();

    // Ekran ukończenia misji „Umiesz to” z oneLinerem
    await expect(page.getByTestId('mission-completed-view')).toBeVisible();
    await expect(page.getByTestId('completed-oneliner')).toBeVisible();

    // 2. Teraz przełączamy na motyw starego Maca ('old' -> classic) i przechodzimy misję Ustawień (macos-08-ustawienia)
    await page.getByTestId('nav-start').click();
    await page.getByTestId('mac-look-old').click();

    await page.getByTestId('nav-tracks').click();
    await expect(page.getByTestId('screen-tracks')).toBeVisible();
    await page.getByTestId('track-mission-macos-08-ustawienia').locator('button').click();

    await page.getByTestId('skip-theory-btn').click();
    const simClassic = page.getByTestId('mac-simulator');
    await expect(simClassic).toHaveAttribute('data-simulator-theme', 'classic');
    await expect(page.getByTestId('step-instruction')).toContainText('Preferencje systemowe');

    await page.getByTestId('simulator-target').click();
    await expect(page.getByTestId('step-counter')).toContainText('krok 2 z 3');
    await page.getByTestId('simulator-target').click();
    await expect(page.getByTestId('step-counter')).toContainText('krok 3 z 3');
    await page.getByTestId('simulator-target').click();
    await expect(page.getByTestId('mission-completed-view')).toBeVisible();

    // 3. Sprawdzamy pozostałe ekrany: Biblioteka, Pogotowie, Historia, Ustawienia
    await page.getByTestId('nav-library').click();
    await expect(page.getByTestId('screen-library')).toBeVisible();

    await page.getByTestId('nav-emergency').click();
    await expect(page.getByTestId('screen-emergency')).toBeVisible();
    await page.getByTestId('emergency-input').fill('jak zrobic skrin ekranu');
    await expect(page.getByTestId('emergency-match-macos-03-zrzut-ekranu')).toBeVisible();

    await page.getByTestId('nav-history').click();
    await expect(page.getByTestId('screen-history')).toBeVisible();

    await page.getByTestId('nav-settings').click();
    await expect(page.getByTestId('screen-settings')).toBeVisible();
    await page.getByTestId('color-mode-dark').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByTestId('font-scale-large').click();
    await expect(page.locator('html')).toHaveAttribute('data-font-scale', 'large');
  });
});
