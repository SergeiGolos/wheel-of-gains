# Wheel of Gains - Glossary

**Domain terms, technical concepts, and abbreviations used throughout the project.**

## Fitness & Workout Terms

**Workout**
: A single exercise or activity with optional repetition count and reference URL. Core data unit in the application.

**Workout Collection**
: A curated set of workouts grouped by category (e.g., Beginner, Cardio, Strength) with metadata like title and description.

**Multiplier**
: A numeric value applied to workout repetitions to adjust intensity or duration (e.g., "10 Push-ups" with 2x multiplier = "20 Push-ups").

**Spin**
: The action of randomly selecting a workout from the current collection using the wheel interface.

**Classic Mix**
: The default workout collection containing a variety of exercises suitable for general fitness.

**Gains**
: Fitness progress or improvement, referenced in the application name "Wheel of Gains."

## Technical Architecture Terms

**Qwik**
: Modern web framework focusing on resumable architecture and instant loading. Primary framework for this application.

**Resumability**
: Qwik's approach to hydration where applications can resume execution without replaying initialization code.

**QwikCity**
: Meta-framework built on Qwik providing file-based routing, SSR/SSG, and other full-stack capabilities.

**Static Site Generation (SSG)**
: Build-time rendering of pages to static HTML files for optimal performance and CDN distribution.

**Server-Side Rendering (SSR)**
: Rendering pages on the server before sending to client, improving initial load performance and SEO.

**Progressive Web App (PWA)**
: Web application that provides native app-like experiences with offline support, installation, and enhanced capabilities.

## Component Architecture

**Component$**
: Qwik's component function syntax using `component$()` for lazy-loaded, serializable components.

**Signal**
: Qwik's reactivity primitive for managing state that automatically tracks dependencies and updates UI.

**Store**
: Qwik's deep reactive state management solution for complex object state.

**DocumentHead**
: Qwik City's interface for managing document `<head>` elements like title, meta tags, and links.

**RouterOutlet**
: Component that renders the matched route component in Qwik City routing.

**WorkoutDisplayPage**
: Main container component that orchestrates the workout wheel, controls, and management features.

## Canvas & Animation Terms

**HTML5 Canvas**
: Web API providing 2D drawing context for programmatic graphics rendering. Used for the spinning wheel.

**Canvas Context (ctx)**
: Drawing interface for Canvas element, typically 2D context (`CanvasRenderingContext2D`).

**requestAnimationFrame**
: Browser API for smooth animations by syncing with display refresh rate.

**Wheel Segments**
: Visual divisions of the spinning wheel, each representing a workout option.

**Spin Animation**
: The rotating motion of the wheel with easing functions for realistic physics.

**Selection Indicator**
: Visual pointer or marker that indicates which workout was selected after spinning.

## Development Tools & Process

**Vite**
: Fast build tool and development server focusing on ES modules and hot module replacement.

**Hot Module Replacement (HMR)**
: Development feature allowing code changes to update in browser without full page reload.

**Storybook**
: Tool for building and documenting UI components in isolation with interactive examples.

**Playwright**
: End-to-end testing framework for web applications with cross-browser automation.

**ESLint**
: Configurable linting utility for identifying and fixing JavaScript/TypeScript code quality issues.

**Prettier**
: Opinionated code formatter ensuring consistent style across the codebase.

**TypeScript**
: Typed superset of JavaScript providing compile-time type checking and enhanced IDE support.

## Styling & Design

**Tailwind CSS**
: Utility-first CSS framework providing low-level utility classes for rapid UI development.

**Tailwind v4**
: Latest major version of Tailwind with improved performance and developer experience.

**Utility Classes**
: CSS classes that apply single styling properties (e.g., `p-4` for padding, `text-red-500` for red text).

**Responsive Design**
: Design approach ensuring optimal display across different screen sizes and devices.

**Mobile-First**
: Design methodology starting with mobile constraints and progressively enhancing for larger screens.

**CSS Custom Properties**
: Native CSS variables for dynamic theming and reusable design tokens.

## Testing & Quality Assurance

**Component Testing**
: Testing individual UI components in isolation to verify their behavior and rendering.

**End-to-End Testing (E2E)**
: Testing complete user workflows from browser automation to verify full application functionality.

**Visual Regression Testing**
: Comparing screenshots over time to detect unintended visual changes.

**Accessibility Testing (a11y)**
: Verifying application usability by people with disabilities, including screen reader compatibility.

**Test Story**
: Storybook story that demonstrates component usage and serves as a test case.

**Test Fixture**
: Predefined data or state used consistently across tests for reliable results.

## Storage & Data Management

**Local Storage**
: Browser API for persisting key-value data locally without server communication.

**Storage Key**
: Unique identifier for data stored in Local Storage (e.g., `wheelOfGains_workouts_classic`).

**Persistence Layer**
: Abstraction for data storage operations, currently implemented using Local Storage.

**Data Export/Import**
: Functionality allowing users to backup and restore their custom workout data.

**JSON Serialization**
: Converting JavaScript objects to JSON strings for storage and transport.

## Deployment & Infrastructure

**GitHub Pages**
: Free static site hosting service integrated with GitHub repositories.

**GitHub Actions**
: CI/CD platform for automating builds, tests, and deployments within GitHub.

**CI/CD Pipeline**
: Continuous Integration and Continuous Deployment automation workflow.

**Static Assets**
: Files served directly without processing (images, fonts, manifest files).

**Build Artifacts**
: Generated files from the build process (compiled JavaScript, CSS, HTML).

**Base Path**
: URL prefix required for GitHub Pages repository hosting (e.g., `/wheel-of-gains/`).

## Performance & Optimization

**Code Splitting**
: Technique of splitting JavaScript bundles into smaller chunks for faster loading.

**Lazy Loading**
: Deferring resource loading until needed to improve initial page load performance.

**Bundle Size**
: Total size of JavaScript, CSS, and other assets delivered to the browser.

**Tree Shaking**
: Build optimization that removes unused code from final bundles.

**Asset Optimization**
: Compression and optimization of images, fonts, and other static resources.

**Caching Strategy**
: Approach to storing resources for faster subsequent loads.

## Security & Privacy

**Content Security Policy (CSP)**
: Security standard preventing XSS attacks by controlling resource loading.

**Cross-Site Scripting (XSS)**
: Security vulnerability where malicious scripts are injected into web applications.

**Data Privacy**
: Approach ensuring user data remains under their control without external tracking.

**Client-Side Only**
: Architecture pattern where all processing happens in the browser without server communication.

## Browser APIs & Standards

**Service Worker**
: Script running in background enabling offline functionality and caching strategies.

**Web App Manifest**
: JSON file providing metadata for PWA installation and app-like behavior.

**ARIA (Accessible Rich Internet Applications)**
: Set of attributes for making web content accessible to assistive technologies.

**Viewport Meta Tag**
: HTML meta tag controlling page scaling and dimensions on mobile devices.

**Media Queries**
: CSS feature for applying styles based on device characteristics like screen size.

## Common Abbreviations

**ADR** - Architectural Decision Record
**API** - Application Programming Interface
**CDN** - Content Delivery Network
**CLI** - Command Line Interface
**CSS** - Cascading Style Sheets
**DOM** - Document Object Model
**HTML** - HyperText Markup Language
**HTTP** - HyperText Transfer Protocol
**JSON** - JavaScript Object Notation
**MVP** - Minimum Viable Product
**NPM** - Node Package Manager
**PWA** - Progressive Web App
**SEO** - Search Engine Optimization
**SPA** - Single Page Application
**SSG** - Static Site Generation
**SSR** - Server-Side Rendering
**UI** - User Interface
**URL** - Uniform Resource Locator
**UX** - User Experience
**WCAG** - Web Content Accessibility Guidelines

## Project-Specific Conventions

**Storage Key Pattern**
: `wheelOfGains_workouts_{category}` - Convention for Local Storage keys

**Component File Pattern**
: `{component-name}.tsx` - TypeScript JSX files for components

**Story File Pattern**
: `{component-name}.stories.tsx` - Storybook story files

**Route File Pattern**
: `index.tsx` - Route component files in Qwik City

**Utility File Pattern**
: `{purpose}.ts` - TypeScript files for utility functions

---

_This glossary serves as a reference for developers, contributors, and stakeholders to understand the terminology and concepts used throughout the Wheel of Gains project._
