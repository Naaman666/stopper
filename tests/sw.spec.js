const { test, expect } = require('@playwright/test');

test.describe('Service Worker Offline Caching', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app to trigger SW registration
    await page.goto('http://localhost:8000/');

    // Wait for SW to be registered and activated
    await page.waitForFunction(async () => {
      const reg = await navigator.serviceWorker.ready;
      return reg.active !== null && reg.active.state === 'activated';
    });

    // Ensure all network requests settle
    await page.waitForLoadState('networkidle');

    // Perform a reload to ensure the cache is fully populated with current files
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('should serve cached resources when offline', async ({ page, context }) => {
    // Go offline
    await context.setOffline(true);

    // Try to reload the page in offline mode
    // It should load successfully from cache
    let offlineResponse;
    try {
      offlineResponse = await page.reload({ waitUntil: 'domcontentloaded' });
    } catch (e) {
      console.error(e);
    }

    expect(offlineResponse).not.toBeNull();
    expect(offlineResponse.ok()).toBeTruthy();

    const title = await page.title();
    expect(title).toBe('Stopper');

    await expect(page.locator('#btnStart')).toBeVisible();

    // Go back online
    await context.setOffline(false);
  });

  test('should dynamically cache new resources', async ({ page, context }) => {
    // Fetch a new resource not in the initial FILES array
    // icon.svg is in FILES, but we can add a query param so it's a "new" request
    const testUrl = './icon.svg?dynamic=true';

    // Fetch once to cache it
    await page.evaluate(async (url) => {
      await fetch(url);
    }, testUrl);

    // Go offline
    await context.setOffline(true);

    // Fetch the same resource again while offline
    const responseText = await page.evaluate(async (url) => {
      try {
        const res = await fetch(url);
        return res.text();
      } catch (e) {
        return 'FETCH_FAILED';
      }
    }, testUrl);

    // Assert that it didn't fail, meaning the SW served it from the dynamic cache
    expect(responseText).not.toBe('FETCH_FAILED');
    expect(responseText).toContain('<svg');

    // Go back online
    await context.setOffline(false);
  });
});
