// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Global timeout for entire test run */
  globalTimeout: process.env.CI ? 10 * 60 * 1000 : 5 * 60 * 1000, // 10 min CI, 5 min local
  /* Timeout per test */
  timeout: 30 * 1000, // 30 seconds per test
  /* Expect timeout for assertions */
  expect: {
    /* Timeout for each assertion */
    timeout: 10 * 1000, // 10 seconds
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:6006",
    /* Navigation timeout */
    navigationTimeout: 30 * 1000, // 30 seconds
    /* Action timeout (clicks, fills, etc.) */
    actionTimeout: 10 * 1000, // 10 seconds
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Take screenshot on test failure */
    screenshot: "only-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run storybook",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    /* Increased timeout for CI environments and Storybook build */
    timeout: process.env.CI ? 120000 : 60000, // 2 minutes CI, 1 minute local
    /* Check if server is ready by checking for specific content */
    stdout: "pipe",
    stderr: "pipe",
  },
});
