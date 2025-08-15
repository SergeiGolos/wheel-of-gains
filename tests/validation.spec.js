import { test, expect } from "@playwright/test";

/**
 * Playwright tests for Workout Validation Stories
 * Tests the validation functions for workout records
 */

test.describe("Workout Validation Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Storybook
    await page.goto("/");

    // Wait for Storybook to load
    await page.waitForSelector(
      '[data-testid="sidebar-search-input"], .sidebar-item',
      { timeout: 10000 },
    );
  });

  test("should display valid workout validation correctly", async ({
    page,
  }) => {
    // Navigate to the Valid Workout story
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Valid Workout");

    // Wait for the story to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Switch to the iframe context
    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that all validation indicators show PASS
    await expect(iframe.locator("text=Name Validation: PASS")).toBeVisible();
    await expect(
      iframe.locator("text=Multiplier Validation: PASS"),
    ).toBeVisible();
    await expect(iframe.locator("text=Uniqueness Check: PASS")).toBeVisible();
    await expect(
      iframe.locator("text=Form Validation Result: VALID"),
    ).toBeVisible();

    // Check that the test inputs are displayed
    await expect(iframe.locator("text=New Valid Workout")).toBeVisible();
  });

  test("should display empty name validation error", async ({ page }) => {
    // Navigate to the Empty Name story
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Empty Name");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that name validation fails
    await expect(iframe.locator("text=Name Validation: FAIL")).toBeVisible();
    await expect(iframe.locator("text=Name is empty or invalid")).toBeVisible();

    // Check that form validation fails
    await expect(
      iframe.locator("text=Form Validation Result: INVALID"),
    ).toBeVisible();
  });

  test("should display invalid multiplier validation error", async ({
    page,
  }) => {
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Invalid Multiplier");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that multiplier validation fails
    await expect(
      iframe.locator("text=Multiplier Validation: FAIL"),
    ).toBeVisible();
    await expect(iframe.locator("text=Multiplier must be >= 1")).toBeVisible();
  });

  test("should display duplicate name validation error", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Duplicate Name");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that uniqueness check fails
    await expect(iframe.locator("text=Uniqueness Check: FAIL")).toBeVisible();
    await expect(
      iframe.locator("text=Name already exists in workout list"),
    ).toBeVisible();
  });

  test("should display multiple validation errors", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=All Errors");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that all validations fail
    await expect(iframe.locator("text=Name Validation: FAIL")).toBeVisible();
    await expect(
      iframe.locator("text=Multiplier Validation: FAIL"),
    ).toBeVisible();
    await expect(
      iframe.locator("text=Form Validation Result: INVALID"),
    ).toBeVisible();
  });

  test("should show existing workouts reference", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Valid Workout");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that existing workouts are displayed for reference
    await expect(iframe.locator("text=Existing Workouts")).toBeVisible();
    await expect(iframe.locator("text=Push Ups")).toBeVisible();
    await expect(iframe.locator("text=Squats")).toBeVisible();
    await expect(iframe.locator("text=Burpees")).toBeVisible();
  });

  test("should allow interactive testing with controls", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Workout Validation");
    await page.click("text=Interactive Validation");

    // Check that controls are available
    const addons = page
      .locator('[role="tabpanel"], .tabpanel')
      .filter({ hasText: "Controls" });
    if ((await addons.count()) > 0) {
      await addons.first().click();

      // Look for control inputs
      await expect(
        page.locator('input[type="text"], select, input[type="number"]'),
      ).toHaveCount({ gte: 1 });
    }
  });
});
