# Wheel of Gains - Project Overview

**A gamified workout randomizer application that helps fitness enthusiasts discover new exercises and stay motivated through randomization and variety.**

## Quick Facts

- **Type**: Progressive Web Application (PWA)
- **Tech Stack**: Qwik + TypeScript + Tailwind CSS v4
- **Deployment**: GitHub Pages (Static Site Generation)
- **Status**: Production-ready with ongoing enhancements
- **Repository**: [SergeiGolos/wheel-of-gains](https://github.com/SergeiGolos/wheel-of-gains)
- **Live Demo**: [https://sergeigolos.github.io/wheel-of-gains](https://sergeigolos.github.io/wheel-of-gains)

## Core Features

- **Interactive Spinning Wheel**: HTML5 Canvas-based wheel with smooth animations
- **Multiple Workout Categories**: Classic, Beginner, Intermediate, Advanced, Cardio, Strength
- **Custom Workout Management**: Add, edit, and organize personal workouts with external links
- **Responsive Design**: Optimized for mobile and desktop experiences
- **Local Storage Persistence**: Maintains user preferences and custom workouts
- **Accessibility Features**: ARIA labels and keyboard navigation support

## Module Architecture

### Frontend Components (`/src/components/`)
- **workout/**: Core workout display and management components
  - `workout-display-page.tsx` - Main workout page container
  - `workout-wheel.tsx` - Canvas-based spinning wheel
  - `workout-manager.tsx` - CRUD operations for workouts
- **ui/**: Reusable UI components and primitives
- **navigation/**: App navigation and routing components
- **icons/**: SVG icon components
- **router-head/**: Document head management

### Routing Structure (`/src/routes/`)
- **index.tsx**: Main workout wheel (Classic Mix category)
- **Category Routes**: `/beginner/`, `/intermediate/`, `/advanced/`, `/cardio/`, `/strength/`
- **Management Routes**: `/edit/` for workout customization
- **Utility Routes**: `/zip/` for data export functionality

### Business Logic (`/src/utils/`)
- **workout-collections.ts**: Predefined workout categories and exercises
- **storage.ts**: Local storage abstraction layer
- **types.ts**: TypeScript interfaces and type definitions

### Configuration & Build
- **vite.config.ts**: Build configuration with GitHub Pages support
- **package.json**: Dependencies and build scripts
- **tsconfig.json**: TypeScript compiler configuration
- **tailwind.config.js**: Styling framework configuration

## Testing Infrastructure

### Component Testing (`/.storybook/`)
- **Storybook 8.x**: Component isolation and visual testing
- **Accessibility Testing**: Built-in a11y addon for compliance checking
- **Documentation**: Interactive component documentation

### End-to-End Testing (`/tests/`)
- **Playwright**: Cross-browser automated testing
- **Storybook Integration**: Test components in isolation
- **CI/CD Integration**: Automated testing in GitHub Actions

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run storybook    # Launch component playground  
npm run test:playwright # Run e2e tests
npm run lint         # Code quality checks
npm run fmt          # Code formatting
```

### Quality Assurance
- **ESLint**: TypeScript and Qwik-specific linting rules
- **Prettier**: Consistent code formatting with Tailwind plugin
- **TypeScript**: Strict type checking and compilation
- **Automated Testing**: Playwright tests run on every PR

### Deployment Pipeline
- **GitHub Actions**: Automated CI/CD pipeline
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **GitHub Pages**: Automatic deployment on main branch updates
- **Version Management**: Semantic versioning with build timestamps

## Data Architecture

### Workout Data Structure
```typescript
interface Workout {
  name: string;
  url?: string;
  multiplier?: number;
}

interface WorkoutCollection {
  title: string;
  description: string;
  workouts: Workout[];
}
```

### Storage Strategy
- **Local Storage**: Persists user customizations and preferences
- **Static Data**: Predefined workouts bundled with application
- **Import/Export**: JSON-based backup and restore functionality

## Performance Considerations

- **Qwik Resumability**: JavaScript hydration only when needed
- **Static Generation**: Pre-built pages for fastest loading
- **Canvas Optimization**: Efficient wheel rendering and animation
- **Code Splitting**: Lazy loading of route-specific components
- **Asset Optimization**: Compressed images and optimized bundles

## Security & Privacy

- **Client-Side Only**: No server-side data collection or storage
- **Local Data**: All user data remains in browser local storage
- **External Links**: User-provided workout URLs open in new tabs
- **Content Security**: No dynamic script execution or eval usage

## Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Canvas Support**: Fallback text for non-canvas environments

## Maintenance & Monitoring

- **Automated Updates**: Dependabot for security patches
- **Code Quality**: Automated linting and formatting checks
- **Test Coverage**: Component and e2e test suites
- **Performance Monitoring**: Lighthouse CI integration
- **Documentation**: Comprehensive README and architectural records

---

*Last Updated: January 2025*
*Maintained by: SergeiGolos*