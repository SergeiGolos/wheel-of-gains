import { test, expect } from "@playwright/test";

/**
 * Playwright tests for Edit Screen Functionality
 * Tests the edit screen functions including form interactions and state management
 */

test.describe("Edit Screen Functions Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector(
      '[data-testid="sidebar-search-input"], .sidebar-item',
      { timeout: 10000 },
    );
  });

  test("should display workout list view correctly", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Workout List View");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check workout list elements
    await expect(
      iframe.locator('[data-testid="add-new-button"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-item-1"]'),
    ).toBeVisible();
    await expect(iframe.locator('[data-testid="edit-button-1"]')).toBeVisible();
    await expect(
      iframe.locator('[data-testid="delete-button-1"]'),
    ).toBeVisible();

    // Check that workout details are displayed
    await expect(iframe.locator("text=Push Ups")).toBeVisible();
    await expect(iframe.locator("text=Classic")).toBeVisible();
    await expect(iframe.locator("text=×1")).toBeVisible();
  });

  test("should display add new workout form", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Add New Workout");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check form elements
    await expect(
      iframe.locator('[data-testid="workout-name-input"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-url-input"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-multiplier-input"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-category-select"]'),
    ).toBeVisible();

    // Check form buttons
    await expect(iframe.locator('[data-testid="cancel-button"]')).toBeVisible();
    await expect(iframe.locator('[data-testid="save-button"]')).toBeVisible();

    // Check form title
    await expect(iframe.locator("text=Add New Workout")).toBeVisible();
  });

  test("should display edit existing workout form with pre-filled data", async ({
    page,
  }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Edit Existing Workout");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that form is pre-filled with existing data
    await expect(
      iframe.locator('[data-testid="workout-name-input"]'),
    ).toHaveValue("Push Ups");
    await expect(
      iframe.locator('[data-testid="workout-url-input"]'),
    ).toHaveValue("https://example.com/pushups");
    await expect(
      iframe.locator('[data-testid="workout-multiplier-input"]'),
    ).toHaveValue("1");

    // Check form title
    await expect(iframe.locator("text=Edit Workout")).toBeVisible();
  });

  test("should show validation errors in form", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Form Validation Errors");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that validation error messages are displayed
    await expect(iframe.locator("text=Workout name is required")).toBeVisible();
    await expect(
      iframe.locator("text=Multiplier must be at least 1"),
    ).toBeVisible();

    // Check that error styling is applied
    await expect(
      iframe.locator('[data-testid="workout-name-input"]'),
    ).toHaveClass(/border-red-500/);
  });

  test("should show unsaved changes state", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Unsaved Changes State");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that Save button is visible when there are unsaved changes
    await expect(iframe.locator('[data-testid="action-save"]')).toBeVisible();
    await expect(iframe.locator("text=Save")).toBeVisible();
  });

  test("should handle form interactions", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Add New Workout");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Test form field interactions
    await iframe
      .locator('[data-testid="workout-name-input"]')
      .fill("Test Workout");
    await iframe
      .locator('[data-testid="workout-url-input"]')
      .fill("https://example.com/test");
    await iframe.locator('[data-testid="workout-multiplier-input"]').fill("3");

    // Check that values are updated
    await expect(
      iframe.locator('[data-testid="workout-name-input"]'),
    ).toHaveValue("Test Workout");
    await expect(
      iframe.locator('[data-testid="workout-url-input"]'),
    ).toHaveValue("https://example.com/test");
    await expect(
      iframe.locator('[data-testid="workout-multiplier-input"]'),
    ).toHaveValue("3");
  });

  test("should handle category selection", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Add New Workout");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Test category selection
    await iframe
      .locator('[data-testid="workout-category-select"]')
      .selectOption("cardio");
    await expect(
      iframe.locator('[data-testid="workout-category-select"]'),
    ).toHaveValue("cardio");
  });

  test("should handle button clicks with alerts", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Workout List View");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Set up dialog handler for alerts
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toContain("Add new workout clicked");
      await dialog.accept();
    });

    // Click add new button
    await iframe.locator('[data-testid="add-new-button"]').click();
  });

  test("should show correct action buttons for different states", async ({
    page,
  }) => {
    // Test without unsaved changes
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Add New Workout");

    let iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    await expect(iframe.locator('[data-testid="action-cancel"]')).toBeVisible();
    await expect(
      iframe.locator('[data-testid="action-add-new"]'),
    ).toBeVisible();

    // Navigate to unsaved changes state
    await page.click("text=Unsaved Changes State");

    iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that Save button appears with unsaved changes
    await expect(iframe.locator('[data-testid="action-save"]')).toBeVisible();
  });

  test("should display test status information", async ({ page }) => {
    await page.click("text=Testing");
    await page.click("text=Edit Screen Functions");
    await page.click("text=Interactive Edit Screen");

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that test status information is displayed
    await expect(iframe.locator("text=Test Status")).toBeVisible();
    await expect(iframe.locator("text=Edit Mode:")).toBeVisible();
    await expect(iframe.locator("text=Unsaved Changes:")).toBeVisible();
    await expect(iframe.locator("text=Form Errors:")).toBeVisible();
  });
});
