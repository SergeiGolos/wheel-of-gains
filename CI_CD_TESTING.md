# CI/CD Testing Integration

This document describes the implementation of Storybook testing in the CI/CD pipeline for the Wheel of Gains project.

## Overview

The CI/CD pipeline now includes comprehensive Storybook testing that runs automatically with every release to ensure expected application behavior before production deployment.

## Pipeline Flow

The updated GitHub Actions workflow follows this sequence:

1. **Test Job** (`test`):
   - Install dependencies and Playwright browsers
   - Build Storybook
   - Run all Playwright tests against Storybook
   - Upload test results as artifacts
   - ⚠️ **Deployment is blocked if tests fail**

2. **Build Job** (`build`):
   - Only runs if the test job succeeds
   - Build the main QWIK application
   - Rebuild Storybook for production
   - Integrate Storybook with the main application
   - Create project hub page for easy access
   - Upload deployment artifacts

3. **Deploy Job** (`deploy`):
   - Only runs if the build job succeeds
   - Deploy to GitHub Pages

## Test Coverage

The pipeline validates:

### ✅ Workout Validation Tests
- Name validation (empty, valid, invalid)
- Multiplier validation (negative, zero, positive)
- Uniqueness validation (duplicate detection)
- Form validation (combined validation results)

### ✅ Edit Screen Functions
- Workout list display and management
- Add new workout form functionality
- Edit existing workout with pre-filled data
- Form validation and error handling
- Unsaved changes state management

### ✅ Spin Screen Validation
- Wheel display with different sizes (3-10 workouts)
- Spinning animation and disabled states
- Result display and winner selection
- Button interactions and state transitions
- History display and management

### ✅ Zip String Loading
- Different workout collection loading and validation
- Error handling for malformed data
- Collection comparison and metadata display

## Deployment Structure

After successful testing and building, the deployed site includes:

```
https://sergeigolos.github.io/wheel-of-gains/
├── index-hub.html           # Project hub with navigation
├── wheel-of-gains/          # Main Qwik application
│   ├── index.html
│   ├── beginner/
│   ├── advanced/
│   └── ...
└── storybook/               # Storybook deployment
    ├── index.html
    ├── iframe.html
    └── ...
```

## Key Benefits

1. **Quality Assurance**: Tests must pass before any code reaches production
2. **Automated Validation**: No manual testing required for basic functionality
3. **Fast Feedback**: Developers know immediately if changes break expected behavior
4. **Component Documentation**: Storybook remains accessible alongside the main app
5. **Test Artifacts**: Playwright reports are saved for debugging failed tests

## Test Execution

Tests run automatically on:
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches
- Manual workflow dispatch

Local testing is still available via:
```bash
npm run test:playwright        # Run all Playwright tests
npm run test:playwright:ui     # Run tests with UI mode
```

## Error Handling

If Storybook tests fail:
- The build job will not run
- The deploy job will not run
- Test artifacts are uploaded for debugging
- The deployment is completely blocked until tests pass

This ensures that no broken functionality reaches production users.

## Implementation Details

The CI/CD implementation includes:

- **Playwright Browser Installation**: Chromium and WebKit for cross-browser testing
- **Test Isolation**: Tests run in a dedicated job before building
- **Artifact Upload**: Test results preserved for 7 days
- **Failure Handling**: Deployment blocked on test failures
- **Integration**: Storybook seamlessly integrated with main application
- **Documentation**: Both applications accessible from a project hub page

This fulfills the requirement to "run with every release to make sure that the expected behavior of the application is there before it deploys to production."