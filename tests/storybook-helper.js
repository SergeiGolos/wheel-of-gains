/**
 * Storybook Test Helper Functions
 * Provides robust utilities for waiting for Storybook to load in CI/CD environments
 */

/**
 * Waits for Storybook to be fully loaded and ready for testing
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {number} timeout - Maximum time to wait in milliseconds
 */
export async function waitForStorybookReady(page, timeout = 90000) {
  console.log("Waiting for Storybook to load...");

  try {
    // Step 1: Wait for initial page load
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded", { timeout: 30000 });

    console.log("DOM content loaded, waiting for network idle...");

    // Step 2: Wait for network to be idle (all resources loaded)
    await page.waitForLoadState("networkidle", { timeout: 60000 });

    console.log("Network idle, waiting for Storybook UI elements...");

    // Step 3: Wait for Storybook UI to be ready
    await page.waitForFunction(
      () => {
        // Check multiple indicators that Storybook is ready
        const root = document.querySelector("#root");
        const hasRootChildren = root && root.children.length > 0;

        // Check for common Storybook UI elements
        const sidebar =
          document.querySelector('[role="navigation"]') ||
          document.querySelector(".sidebar") ||
          document.querySelector('[data-testid="sidebar"]');

        const storyElements =
          document.querySelector("[data-testid]") ||
          document.querySelector("[data-item-id]") ||
          document.querySelector(".sb-show-main");

        const storybookLoaded =
          document.querySelector("[data-storybook]") ||
          document.querySelector(".storybook-wrapper") ||
          document.body.classList.contains("sb-show-main");

        // Debug information
        console.log("Storybook readiness check:", {
          hasRoot: !!root,
          hasRootChildren,
          hasSidebar: !!sidebar,
          hasStoryElements: !!storyElements,
          storybookLoaded: !!storybookLoaded,
          rootHTML: root ? root.innerHTML.substring(0, 100) : "no root",
        });

        // Return true if any of the readiness indicators are present
        return hasRootChildren || sidebar || storyElements || storybookLoaded;
      },
      { timeout: timeout },
    );

    console.log("Storybook UI elements detected, final wait...");

    // Step 4: Give additional time for stories to load and render
    await page.waitForTimeout(3000);

    console.log("Storybook is ready for testing!");
  } catch (error) {
    console.error("Failed to load Storybook:", error.message);

    // Take a screenshot for debugging
    try {
      await page.screenshot({ path: "storybook-load-failure.png" });
      console.log("Screenshot saved: storybook-load-failure.png");
    } catch (screenshotError) {
      console.log("Could not take screenshot:", screenshotError.message);
    }

    // Log page content for debugging
    try {
      const content = await page.content();
      console.log("Page content preview:", content.substring(0, 500));
    } catch (contentError) {
      console.log("Could not get page content:", contentError.message);
    }

    throw new Error(
      `Storybook failed to load within ${timeout}ms: ${error.message}`,
    );
  }
}

/**
 * Navigate to a specific story in Storybook with robust error handling
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} sectionName - The section name (e.g., "Testing")
 * @param {string} storyName - The story name (e.g., "Edit Screen Functions")
 * @param {number} timeout - Timeout for navigation
 */
export async function navigateToStory(
  page,
  sectionName,
  storyName,
  timeout = 15000,
) {
  console.log(`Navigating to story: ${sectionName} > ${storyName}`);

  try {
    // Wait for and click the section
    await page.waitForSelector(`text=${sectionName}`, { timeout });
    await page.click(`text=${sectionName}`);
    await page.waitForTimeout(1000);

    // Wait for and click the story
    await page.waitForSelector(`text=${storyName}`, { timeout });
    await page.click(`text=${storyName}`);
    await page.waitForTimeout(2000);

    console.log(`Successfully navigated to: ${sectionName} > ${storyName}`);
  } catch (error) {
    console.error(
      `Failed to navigate to story: ${sectionName} > ${storyName}`,
      error.message,
    );
    throw error;
  }
}

/**
 * Wait for a story to be fully loaded and rendered
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} storyName - The story name for identification
 * @param {number} timeout - Timeout for story loading
 */
export async function waitForStoryLoaded(page, storyName, timeout = 10000) {
  console.log(`Waiting for story "${storyName}" to load...`);

  try {
    // Wait for story content to appear
    await page.waitForFunction(
      () => {
        // Check for story-specific elements
        const iframe =
          document.querySelector("#storybook-preview-iframe") ||
          document.querySelector('iframe[title="storybook-preview-iframe"]');

        const storyContent =
          document.querySelector("[data-testid]") ||
          document.querySelector(".sb-show-main") ||
          document.querySelector("#root > div");

        return iframe || storyContent;
      },
      { timeout },
    );

    await page.waitForTimeout(1000);
    console.log(`Story "${storyName}" loaded successfully!`);
  } catch (error) {
    console.error(`Story "${storyName}" failed to load:`, error.message);
    throw error;
  }
}
