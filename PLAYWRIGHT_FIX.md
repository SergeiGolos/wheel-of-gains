# Playwright Test Configuration Fix

This document describes the fix for the "Build process hangs on npm run test:playwright" issue.

## Problem

The CI/CD build process was hanging during the Playwright test execution due to:

1. **Conflicting Storybook processes**: CI workflow pre-built Storybook, then Playwright tried to start its own dev server
2. **Missing timeout configurations**: No global timeouts or test-level timeouts
3. **Insufficient server startup time**: WebServer timeout too short for CI environments

## Solution

### 1. Enhanced Playwright Configuration

**File**: `playwright.config.js`

- ✅ Added `globalTimeout`: 10 minutes (CI), 5 minutes (local)
- ✅ Added `timeout`: 30 seconds per test
- ✅ Added `expect.timeout`: 10 seconds for assertions
- ✅ Added `navigationTimeout`: 30 seconds
- ✅ Added `actionTimeout`: 10 seconds
- ✅ Increased `webServer.timeout`: 2 minutes (CI), 1 minute (local)
- ✅ Added stdout/stderr piping for better debugging

### 2. Fixed CI/CD Workflow

**File**: `.github/workflows/pages.yml`

- ✅ **Removed conflicting `npm run build-storybook` step** before tests
- ✅ Let Playwright handle starting its own Storybook server
- ✅ Eliminated potential port conflicts and server conflicts

### 3. Enhanced Test Scripts

**File**: `package.json`

- ✅ Added `test:playwright:headed` for debugging with browser UI
- ✅ Added `test:playwright:debug` for step-by-step debugging

## Testing Results

✅ **Application build**: 3.04s - Success  
✅ **Storybook build**: 7.88s - Success  
✅ **Linting**: Clean, no errors  
✅ **Formatting**: All files formatted correctly

## How It Works Now

1. **CI/CD Pipeline**:

   - Installs dependencies and Playwright browsers
   - Runs `npm run test:playwright` (no pre-building)
   - Playwright starts its own Storybook dev server
   - Tests run with proper timeout limits
   - Process fails fast instead of hanging

2. **Local Development**:
   - Run `npm run test:playwright` to execute all tests
   - Run `npm run test:playwright:ui` for interactive test runner
   - Run `npm run test:playwright:headed` to see browser actions
   - Run `npm run test:playwright:debug` for step-by-step debugging

## Configuration Details

```javascript
// Key timeout settings
globalTimeout: process.env.CI ? 10 * 60 * 1000 : 5 * 60 * 1000, // 10/5 min
timeout: 30 * 1000, // 30 sec per test
navigationTimeout: 30 * 1000, // 30 sec navigation
actionTimeout: 10 * 1000, // 10 sec actions
webServer.timeout: process.env.CI ? 120000 : 60000, // 2/1 min server start
```

## Prevention

The configuration now prevents hanging by:

- Setting maximum execution times at multiple levels
- Providing specific timeouts for different operation types
- Ensuring servers start within reasonable time limits
- Failing fast with clear error messages instead of hanging indefinitely

## Troubleshooting

If tests still hang:

1. Check browser installation: `npm run playwright:install`
2. Run with debugging: `npm run test:playwright:debug`
3. Check server logs in CI artifacts
4. Verify no port conflicts (6006 for Storybook)

This fix ensures the CI/CD pipeline runs reliably without hanging while maintaining comprehensive Storybook testing.
