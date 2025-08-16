import { test, expect } from "@playwright/test";

/**
 * Playwright tests for Zip String Loading Functionality
 * Tests the zip string loading with different wheel configurations
 */

test.describe("Zip String Loading Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    
    // Wait for Storybook to fully load by checking for multiple indicators
    await page.waitForLoadState("networkidle");
    
    // Wait for Storybook UI to be ready - check for the manager frame and navigation
    await page.waitForFunction(
      () => {
        // Check if the main Storybook UI elements are present and visible
        const root = document.querySelector("#root");
        const sidebar = document.querySelector('[role="navigation"]') || document.querySelector('.sidebar');
        const storybook = document.querySelector('[data-testid]') || document.querySelector('[data-item-id]');
        
        // Return true if root has content and navigation is available
        return root && (root.children.length > 0 || sidebar || storybook);
      },
      { timeout: 90000 }
    );
    
    // Give additional time for stories to load
    await page.waitForTimeout(2000);
  });

  test("should load Quick Blast collection correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check collection title and description
    await expect(iframe.locator('[data-testid="collection-title"]')).toHaveText(
      "Quick 5-Minute Blast",
    );
    await expect(
      iframe.locator('[data-testid="collection-description"]'),
    ).toHaveText("Perfect for when you only have 5 minutes to spare!");

    // Check that workouts are loaded
    await expect(iframe.locator('[data-testid="workouts-list"]')).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-item-0"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="workout-item-1"]'),
    ).toBeVisible();

    // Check specific workouts
    await expect(iframe.locator("text=Jumping Jacks")).toBeVisible();
    await expect(iframe.locator("text=Push-ups")).toBeVisible();
    await expect(iframe.locator("text=Squats")).toBeVisible();
    await expect(iframe.locator("text=Plank")).toBeVisible();

    // Check action buttons
    await expect(
      iframe.locator('[data-testid="load-collection-button"]'),
    ).toBeVisible();
    await expect(
      iframe.locator('[data-testid="save-collection-button"]'),
    ).toBeVisible();
  });

  test("should load Yoga Flow collection with different categories", async ({
    page,
  }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Yoga Flow Collection", { timeout: 10000 });
    await page.click("text=Yoga Flow Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check collection details
    await expect(iframe.locator('[data-testid="collection-title"]')).toHaveText(
      "Yoga Flow",
    );
    await expect(
      iframe.locator('[data-testid="collection-description"]'),
    ).toHaveText("Gentle movements for flexibility and mindfulness");

    // Check yoga-specific workouts
    await expect(iframe.locator("text=Sun Salutation")).toBeVisible();
    await expect(iframe.locator("text=Warrior Pose")).toBeVisible();
    await expect(iframe.locator("text=Downward Dog")).toBeVisible();
    await expect(iframe.locator("text=Child's Pose")).toBeVisible();

    // Check categories (should include Flexibility and Recovery)
    await expect(iframe.locator("text=Flexibility")).toBeVisible();
    await expect(iframe.locator("text=Recovery")).toBeVisible();
  });

  test("should load HIIT Madness collection with multiple workouts", async ({
    page,
  }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=HIIT Madness Collection", {
      timeout: 10000,
    });
    await page.click("text=HIIT Madness Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check collection details
    await expect(iframe.locator('[data-testid="collection-title"]')).toHaveText(
      "HIIT Madness",
    );
    await expect(
      iframe.locator('[data-testid="collection-description"]'),
    ).toHaveText("High-intensity interval training for maximum burn!");

    // Check HIIT workouts
    await expect(iframe.locator("text=Burpees")).toBeVisible();
    await expect(iframe.locator("text=Mountain Climbers")).toBeVisible();
    await expect(iframe.locator("text=Jump Squats")).toBeVisible();
    await expect(iframe.locator("text=High Knees")).toBeVisible();
    await expect(iframe.locator("text=Plank Jacks")).toBeVisible();

    // Should have 5 workouts
    await expect(
      iframe.locator('[data-testid="workout-item-4"]'),
    ).toBeVisible();
  });

  test("should display loading state correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Loading State", { timeout: 10000 });
    await page.click("text=Loading State");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check loading indicators
    await expect(iframe.locator("text=Decoding zip string...")).toBeVisible();
    await expect(
      iframe.locator(
        "text=Please wait while we load your custom workout collection",
      ),
    ).toBeVisible();

    // Check for loading spinner (should have animate-spin class)
    const spinner = iframe.locator(".animate-spin");
    await expect(spinner).toBeVisible();
  });

  test("should handle invalid zip string errors", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Invalid Zip String", { timeout: 10000 });
    await page.click("text=Invalid Zip String");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check error state
    await expect(iframe.locator("text=Loading Failed")).toBeVisible();
    await expect(
      iframe.locator("text=Invalid zip string format"),
    ).toBeVisible();

    // Check error action buttons
    await expect(iframe.locator('[data-testid="retry-button"]')).toBeVisible();
    await expect(
      iframe.locator('[data-testid="fallback-button"]'),
    ).toBeVisible();
  });

  test("should handle malformed data errors", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Malformed Data", { timeout: 10000 });
    await page.click("text=Malformed Data");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check error state with different error message
    await expect(iframe.locator("text=Loading Failed")).toBeVisible();
    await expect(
      iframe.locator("text=Malformed collection data"),
    ).toBeVisible();
  });

  test("should display zip string input correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that zip string input is displayed
    await expect(
      iframe.locator('[data-testid="zip-string-input"]'),
    ).toBeVisible();
    await expect(iframe.locator('[data-testid="decode-button"]')).toBeVisible();

    // Check that the input contains encoded data
    const zipInput = iframe.locator('[data-testid="zip-string-input"]');
    const inputValue = await zipInput.inputValue();
    expect(inputValue.length).toBeGreaterThan(10); // Should contain encoded data
  });

  test("should handle button interactions", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Set up dialog handlers for button clicks
    page.on("dialog", async (dialog) => {
      if (dialog.message().includes("Decode zip string clicked")) {
        await dialog.accept();
      } else if (dialog.message().includes("Load this collection into wheel")) {
        await dialog.accept();
      } else if (dialog.message().includes("Save to my collections")) {
        await dialog.accept();
      }
    });

    // Test decode button
    await iframe.locator('[data-testid="decode-button"]').click();

    // Test load collection button
    await iframe.locator('[data-testid="load-collection-button"]').click();

    // Test save collection button
    await iframe.locator('[data-testid="save-collection-button"]').click();
  });

  test("should show validation details when enabled", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check validation section
    await expect(iframe.locator("text=Validation Results")).toBeVisible();
    await expect(iframe.locator("text=Has Title: PASS")).toBeVisible();
    await expect(iframe.locator("text=Has Description: PASS")).toBeVisible();
    await expect(iframe.locator("text=Has Workouts: PASS")).toBeVisible();
    await expect(iframe.locator("text=Valid Workouts: PASS")).toBeVisible();
    await expect(
      iframe.locator("text=Overall: VALID COLLECTION"),
    ).toBeVisible();
  });

  test("should display workout multipliers and categories correctly", async ({
    page,
  }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that multipliers are displayed
    await expect(iframe.locator("text=×3")).toBeVisible(); // Jumping Jacks
    await expect(iframe.locator("text=×2")).toBeVisible(); // Push-ups, Squats
    await expect(iframe.locator("text=×1")).toBeVisible(); // Plank

    // Check that categories are displayed with colors
    const categoryBadges = iframe.locator(
      ".inline-flex.items-center.px-2.py-1.rounded-full",
    );
    await expect(categoryBadges).toHaveCount(4); // Should have 4 category badges
  });

  test("should show collection comparison", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Collection Comparison", {
      timeout: 10000,
    });
    await page.click("text=Collection Comparison");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that multiple collections are displayed
    await expect(iframe.locator("text=Collection Comparison")).toBeVisible();
    await expect(iframe.locator("text=Quick 5-Minute Blast")).toBeVisible();
    await expect(iframe.locator("text=Yoga Flow")).toBeVisible();
    await expect(iframe.locator("text=HIIT Madness")).toBeVisible();

    // Check that each collection shows workout count and categories
    await expect(iframe.locator("text=Workouts: 4")).toBeVisible();
    await expect(iframe.locator("text=Workouts: 5")).toBeVisible();
  });

  test("should display test configuration information", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Interactive Loader", { timeout: 10000 });
    await page.click("text=Interactive Loader");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check that test configuration is displayed
    await expect(iframe.locator("text=Test Configuration")).toBeVisible();
    await expect(iframe.locator("text=Test Collection:")).toBeVisible();
    await expect(iframe.locator("text=Loading State:")).toBeVisible();
    await expect(iframe.locator("text=Show Validation:")).toBeVisible();
  });

  test("should handle error button interactions", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Invalid Zip String", { timeout: 10000 });
    await page.click("text=Invalid Zip String");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Set up dialog handlers for error buttons
    page.on("dialog", async (dialog) => {
      if (dialog.message().includes("Retry clicked")) {
        await dialog.accept();
      } else if (dialog.message().includes("Return to default collection")) {
        await dialog.accept();
      }
    });

    // Test retry button
    await iframe.locator('[data-testid="retry-button"]').click();

    // Test fallback button
    await iframe.locator('[data-testid="fallback-button"]').click();
  });

  test("should show success indicators correctly", async ({ page }) => {
    // Navigate to the story with explicit waits
    await page.waitForSelector("text=Testing", { timeout: 15000 });
    await page.click("text=Testing");

    await page.waitForSelector("text=Zip String Loading", { timeout: 10000 });
    await page.click("text=Zip String Loading");

    await page.waitForSelector("text=Quick Blast Collection", {
      timeout: 10000,
    });
    await page.click("text=Quick Blast Collection");

    // Wait for the iframe to load
    await page.waitForSelector(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
      { timeout: 15000 },
    );

    const iframe = page.frameLocator(
      '[data-testid="storybook-preview-iframe"], #storybook-preview-iframe',
    );

    // Check success indicators
    await expect(iframe.locator("text=Successfully Loaded!")).toBeVisible();
    await expect(
      iframe.locator(
        "text=Custom workout collection has been decoded and validated",
      ),
    ).toBeVisible();

    // Check for success icon (green checkmark)
    const successIcon = iframe.locator("svg.text-green-600").first();
    await expect(successIcon).toBeVisible();
  });
});
