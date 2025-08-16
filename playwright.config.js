// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  /* Global timeout for entire test run */
  globalTimeout: process.env.CI ? 20 * 60 * 1000 : 10 * 60 * 1000, // 20 min CI, 10 min local
  /* Timeout per test */
  timeout: process.env.CI ? 120 * 1000 : 60 * 1000, // 2 minutes CI, 1 minute local
  /* Expect timeout for assertions */
  expect: {
    /* Timeout for each assertion */
    timeout: 15 * 1000, // 15 seconds
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI for better resource management. */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:6006",
    /* Navigation timeout */
    navigationTimeout: process.env.CI ? 120 * 1000 : 60 * 1000, // 2 minutes CI, 1 minute local
    /* Action timeout (clicks, fills, etc.) */
    actionTimeout: process.env.CI ? 30 * 1000 : 20 * 1000, // 30s CI, 20s local
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
    timeout: process.env.CI ? 240000 : 120000, // 4 minutes CI, 2 minutes local
    /* Check if server is ready by checking for specific content */
    stdout: "pipe",
    stderr: "pipe",
  },
});
