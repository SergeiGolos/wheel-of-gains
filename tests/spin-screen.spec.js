import { test, expect } from "@playwright/test";
import {
  waitForStorybookReady,
  navigateToStory,
  waitForStoryLoaded,
} from "./storybook-helper.js";

/**
 * Playwright tests for Spin Screen Functionality
 * Tests the spin screen behavior including wheel display, spinning, and results
 */

test.describe("Spin Screen Functions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await waitForStorybookReady(page);
  });

  test("should display ready to spin state correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Ready To Spin", { timeout: 10000 });
    await page.click("text=Ready To Spin");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check main wheel elements
    await expect(iframe.locator('[data-testid="spin-wheel"]')).toBeVisible();
    await expect(iframe.locator('[data-testid="wheel-pointer"]')).toBeVisible();
    await expect(iframe.locator('[data-testid="spin-button"]')).toBeVisible();

    // Check that button shows SPIN (not spinning)
    await expect(iframe.locator('[data-testid="spin-button"]')).toHaveText(
      "SPIN",
    );
    await expect(
      iframe.locator('[data-testid="spin-button"]'),
    ).not.toBeDisabled();

    // Check wheel status
    await expect(iframe.locator('[data-testid="wheel-status"]')).toHaveText(
      "Ready",
    );

    // Check result display
    await expect(
      iframe.locator('[data-testid="result-display"]'),
    ).toBeVisible();
    await expect(iframe.locator("text=Ready to spin?")).toBeVisible();
  });

  test("should display spinning state correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Wheel Spinning", { timeout: 10000 });
    await page.click("text=Wheel Spinning");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check spinning indicators
    await expect(iframe.locator('[data-testid="spin-button"]')).toHaveText(
      "SPINNING...",
    );
    await expect(iframe.locator('[data-testid="spin-button"]')).toBeDisabled();
    await expect(iframe.locator('[data-testid="wheel-status"]')).toHaveText(
      "Spinning",
    );

    // Check that wheel has spinning animation class
    await expect(iframe.locator('[data-testid="spin-wheel"]')).toHaveClass(
      /animate-spin/,
    );

    // Check that result shows spinning state
    await expect(iframe.locator("text=Spinning...")).toBeVisible();
  });

  test("should display result state correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Result Displayed", { timeout: 10000 });
    await page.click("text=Result Displayed");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that a winner is displayed
    await expect(iframe.locator('[data-testid="winner-name"]')).toBeVisible();
    await expect(
      iframe.locator('[data-testid="start-workout-button"]'),
    ).toBeVisible();

    // Check that button is back to SPIN state
    await expect(iframe.locator('[data-testid="spin-button"]')).toHaveText(
      "SPIN",
    );
    await expect(
      iframe.locator('[data-testid="spin-button"]'),
    ).not.toBeDisabled();

    // Check wheel status
    await expect(iframe.locator('[data-testid="wheel-status"]')).toHaveText(
      "Ready",
    );
  });

  test("should handle different wheel sizes", async ({ page }) => {
    // Test small wheel
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Small Wheel", { timeout: 10000 });
    await page.click("text=Small Wheel");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    let iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );
    await expect(iframe.locator('[data-testid="workout-count"]')).toHaveText(
      "3",
    );

    // Test large wheel
    await page.click("text=Large Wheel");

    iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );
    await expect(iframe.locator('[data-testid="workout-count"]')).toHaveText(
      "10",
    );
  });

  test("should display wheel segments correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Ready To Spin", { timeout: 10000 });
    await page.click("text=Ready To Spin");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that wheel segments exist for each workout
    await expect(
      iframe.locator('[data-testid="wheel-segment-1"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="wheel-segment-2"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="wheel-segment-3"]'),
    ).toBeVisible();
  });

  test("should handle spin button clicks", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Ready To Spin", { timeout: 10000 });
    await page.click("text=Ready To Spin");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Set up dialog handler for alerts
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Spin button clicked!");
      await dialog.accept();
    });

    // Click spin button
    await iframe.locator('[data-testid="spin-button"]').click();
  });

  test("should handle start workout button clicks", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Result Displayed", { timeout: 10000 });
    await page.click("text=Result Displayed");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Set up dialog handler for alerts
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Start workout clicked!");
      await dialog.accept();
    });

    // Click start workout button
    await iframe.locator('[data-testid="start-workout-button"]').click();
  });

  test("should display spin history correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Result Displayed", { timeout: 10000 });
    await page.click("text=Result Displayed");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that history section is visible
    await expect(iframe.locator('[data-testid="spin-history"]')).toBeVisible();
    await expect(iframe.locator("text=Previous Results")).toBeVisible();

    // Check that history items are displayed
    await expect(
      iframe.locator('[data-testid="history-item-0"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="history-item-1"]'),
    ).toBeVisible();
  });

  test("should hide history when configured", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=No History", { timeout: 10000 });
    await page.click("text=No History");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that history section is not present
    await expect(
      iframe.locator('[data-testid="spin-history"]'),
    ).not.toBeVisible();
    await expect(iframe.locator("text=Previous Results")).not.toBeVisible();
  });

  test("should show complete spin sequence", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Spin Sequence", { timeout: 10000 });
    await page.click("text=Spin Sequence");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that all three states are shown
    await expect(iframe.locator("text=1. Ready State")).toBeVisible();
    await expect(iframe.locator("text=2. Spinning State")).toBeVisible();
    await expect(iframe.locator("text=3. Result State")).toBeVisible();
  });

  test("should display test status information", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Interactive Spin Screen", {
      timeout: 10000,
    });
    await page.click("text=Interactive Spin Screen");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that test status information is displayed
    await expect(iframe.locator("text=Test Status")).toBeVisible();
    await expect(iframe.locator("text=Wheel Size:")).toBeVisible();
    await expect(iframe.locator("text=Spinning:")).toBeVisible();
    await expect(iframe.locator("text=Has Result:")).toBeVisible();
    await expect(iframe.locator("text=Show History:")).toBeVisible();
  });

  test("should show wheel responsive behavior", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Ready To Spin", { timeout: 10000 });
    await page.click("text=Ready To Spin");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that wheel container is present
    await expect(iframe.locator('[data-testid="spin-wheel"]')).toBeVisible();

    // Verify wheel has proper dimensions (should be visible with size)
    const wheelElement = iframe.locator('[data-testid="spin-wheel"]');
    const boundingBox = await wheelElement.boundingBox();

    expect(boundingBox).not.toBeNull();
    expect(boundingBox.width).toBeGreaterThan(200); // Should have substantial width
    expect(boundingBox.height).toBeGreaterThan(200); // Should have substantial height
  });

  test("should handle disabled state properly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Spin Screen Functions", {
      timeout: 10000,
    });
    await page.click("text=Spin Screen Functions");

    await page.waitForSelector("text=Wheel Spinning", { timeout: 10000 });
    await page.click("text=Wheel Spinning");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that spin button is disabled during spinning
    await expect(iframe.locator('[data-testid="spin-button"]')).toBeDisabled();

    // Check disabled styling
    await expect(iframe.locator('[data-testid="spin-button"]')).toHaveClass(
      /disabled:bg-slate-400/,
    );
  });
});
