# Wheel of Gains - Code Map

**Navigation guide to key files, entry points, and architectural components in the codebase.**

## Entry Points

### Main Application Entry
- **[src/root.tsx](../src/root.tsx)** - Root Qwik application component
  - Sets up QwikCityProvider and document structure
  - Configures PWA manifest and meta tags
  - Entry point for client-side hydration

### Build System Entry Points
- **[vite.config.ts](../vite.config.ts)** - Primary Vite configuration
  - Qwik and QwikCity plugin setup
  - Tailwind CSS v4 integration
  - GitHub Pages base path configuration
  - Development and production optimizations

- **[package.json](../package.json)** - Project manifest and scripts
  - Build, development, and testing commands
  - Dependencies and engine requirements
  - Deployment and quality assurance scripts

### Server-Side Entry Points
- **[src/entry.ssr.tsx](../src/entry.ssr.tsx)** - Server-side rendering entry
- **[src/entry.preview.tsx](../src/entry.preview.tsx)** - Preview server entry
- **[src/entry.dev.tsx](../src/entry.dev.tsx)** - Development server entry

## Route Architecture

### Root Route
- **[src/routes/index.tsx](../src/routes/index.tsx)** - Main workout wheel page
  - Uses Classic Mix workout collection
  - Primary user entry point
  - Document head configuration for SEO

### Category Routes
- **[src/routes/beginner/index.tsx](../src/routes/beginner/index.tsx)** - Beginner workouts
- **[src/routes/intermediate/index.tsx](../src/routes/intermediate/index.tsx)** - Intermediate workouts  
- **[src/routes/advanced/index.tsx](../src/routes/advanced/index.tsx)** - Advanced workouts
- **[src/routes/cardio/index.tsx](../src/routes/cardio/index.tsx)** - Cardio-focused workouts
- **[src/routes/strength/index.tsx](../src/routes/strength/index.tsx)** - Strength training workouts

### Utility Routes
- **[src/routes/edit/index.tsx](../src/routes/edit/index.tsx)** - Workout customization interface
- **[src/routes/zip/index.tsx](../src/routes/zip/index.tsx)** - Data export functionality

## Core Components

### Workout System Components
- **[src/components/workout/workout-display-page.tsx](../src/components/workout/workout-display-page.tsx)**
  - Main container for workout functionality
  - Integrates wheel, controls, and management features
  - Handles state management and local storage

- **[src/components/workout/workout-wheel.tsx](../src/components/workout/workout-wheel.tsx)**
  - HTML5 Canvas-based spinning wheel implementation
  - Animation logic and user interaction handling
  - Sound effects and visual feedback

- **[src/components/workout/workout-manager.tsx](../src/components/workout/workout-manager.tsx)**
  - CRUD operations for custom workouts
  - Form handling for workout creation/editing
  - Import/export functionality

- **[src/components/workout/workout-controls.tsx](../src/components/workout/workout-controls.tsx)**
  - Spin button and wheel controls
  - Category selection interface
  - Settings and configuration options

### UI Foundation
- **[src/components/ui/](../src/components/ui/)** - Reusable UI primitives
  - Button variants and styling
  - Form components and inputs
  - Modal and overlay components
  - Loading states and feedback

### Navigation Components  
- **[src/components/navigation/](../src/components/navigation/)**
  - Main navigation menu
  - Category switching interface
  - Breadcrumb navigation

### Icon System
- **[src/components/icons/](../src/components/icons/)**
  - SVG icon components
  - Consistent icon sizing and styling
  - Accessibility attributes

## Business Logic Layer

### Workout Data Management
- **[src/utils/workout-collections.ts](../src/utils/workout-collections.ts)**
  - Predefined workout categories and exercises
  - Default workout configurations
  - Category metadata and descriptions

- **[src/utils/storage.ts](../src/utils/storage.ts)**
  - Local storage abstraction layer
  - Data persistence utilities
  - Import/export functionality

### Type System
- **[src/utils/types.ts](../src/utils/types.ts)**
  - Core TypeScript interfaces
  - Workout and collection type definitions
  - Component prop interfaces

## Styling Architecture

### Global Styles
- **[src/global.css](../src/global.css)** - Global CSS imports and base styles
- **[tailwind.config.js](../tailwind.config.js)** - Tailwind CSS v4 configuration

### Component-Scoped Styles
- Tailwind utility classes for component styling
- CSS modules for complex component styles (when needed)
- Custom CSS properties for theming

## Testing Infrastructure

### Component Testing
- **[.storybook/main.ts](../.storybook/main.ts)** - Storybook configuration
- **[.storybook/preview.ts](../.storybook/preview.ts)** - Global decorators and parameters
- **[src/components/**/*.stories.tsx](../src/components/)** - Component stories

### End-to-End Testing
- **[tests/](../tests/)** - Playwright test suite
  - Component integration tests
  - User workflow testing
  - Cross-browser validation

- **[playwright.config.js](../playwright.config.js)** - Playwright configuration
  - Browser settings and test timeouts
  - CI/CD optimizations

## Configuration Files

### Build Configuration
- **[tsconfig.json](../tsconfig.json)** - TypeScript compiler configuration
- **[vite.config.ts](../vite.config.ts)** - Primary build configuration
- **[adapters/static/vite.config.ts](../adapters/static/vite.config.ts)** - Static adapter config

### Code Quality
- **[eslint.config.js](../eslint.config.js)** - ESLint configuration
- **[.prettierrc.js](../.prettierrc.js)** - Prettier formatting rules
- **[.prettierignore](../.prettierignore)** - Prettier ignore patterns

### Development Tools
- **[.gitignore](../.gitignore)** - Git ignore patterns
- **[.github/workflows/](../.github/workflows/)** - CI/CD pipeline definitions

## Asset Organization

### Static Assets
- **[public/](../public/)** - Static files served directly
  - Icons and favicons
  - Manifest files
  - Service worker

### Dynamic Assets
- **[src/components/icons/](../src/components/icons/)** - Inline SVG components
- Imported images and media files

## Build Artifacts

### Development
- **node_modules/** - Dependencies (excluded from version control)
- **dist/** - Development build output
- **.qwik/** - Qwik framework cache

### Production
- **dist/** - Production build output for deployment
- **storybook-static/** - Built Storybook documentation
- Coverage reports and test outputs

## Data Flow Architecture

```
User Interaction
    ↓
Route Component (index.tsx)
    ↓
WorkoutDisplayPage Component
    ↓
WorkoutWheel + WorkoutManager
    ↓
Workout Collections + Local Storage
    ↓
Canvas Rendering + UI Updates
```

## Key Dependencies Map

### Core Framework
- **@builder.io/qwik** - Framework core
- **@builder.io/qwik-city** - Routing and SSR
- **typescript** - Type system

### Build Tools  
- **vite** - Build system and dev server
- **@tailwindcss/vite** - CSS framework integration

### Testing
- **@playwright/test** - E2E testing framework
- **storybook** - Component development environment

### Utilities
- **pako** - Compression library for data export

---

*This code map provides direct links to key files and explains their relationships within the application architecture.*