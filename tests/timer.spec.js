const { test, expect } = require("@playwright/test");
const path = require("path");

test.describe("Timer functionality", () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(`http://localhost:8000/`);
  });

  test.afterEach(async () => {
    await page.close();
  });

  test("should initialize timer properly", async () => {
    const btnStart = page.locator("#btnStart");
    const btnStop = page.locator("#btnStop");

    // Wait until start button is visible
    await expect(btnStart).toBeVisible();
    await expect(btnStart).not.toBeDisabled();

    // Evaluate via DOM logic instead of pure selector, just to make sure logic is sound
    const isHidden = await btnStop.evaluate(
      (el) => window.getComputedStyle(el).visibility === "hidden",
    );
    expect(isHidden).toBe(true);

    // Simulate mouse interaction to swipe/spin drum
    await page.mouse.move(50, 50);

    // After start, btnStart should be disabled
    await btnStart.click();
    await expect(btnStart).toBeDisabled();

    // Stop should be visible
    const newStopVisibility = await btnStop.evaluate(
      (el) => window.getComputedStyle(el).visibility,
    );
    expect(newStopVisibility).toBe("visible");
    await expect(btnStop).toHaveText(/Stop/);
  });

  test("should stop timer properly", async () => {
    const btnStart = page.locator("#btnStart");
    const btnStop = page.locator("#btnStop");

    await expect(btnStart).toBeVisible();
    await btnStart.click(); // Start it
    await expect(btnStart).toBeDisabled();

    const newStopVisibility = await btnStop.evaluate(
      (el) => window.getComputedStyle(el).visibility,
    );
    expect(newStopVisibility).toBe("visible");

    await btnStop.click(); // Stop it

    // After stopping, btnStart should be enabled (and probably say Folytat)
    await expect(btnStart).not.toBeDisabled();
    await expect(btnStart).toHaveText(/Folytat/);
  });
});
