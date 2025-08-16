# Wheel of Gains 🎯

**A comprehensive workout randomizer application built with Qwik that gamifies your fitness routine!**

Spin the wheel to randomly select your next workout challenge from multiple curated categories. Perfect for fitness enthusiasts who want to add variety to their training, discover new exercises, and stay motivated with a gamified approach to fitness.

## 🚀 Live Demo

Visit the live application: [Wheel of Gains on GitHub Pages](https://SergeiGolos.github.io/wheel-of-gains)

![Wheel of Gains App](https://github.com/user-attachments/assets/0a6ce836-3cc5-47e6-9fb5-463bd3890f67)

## ✨ Features

### Current Features

- 🎮 Interactive spinning wheel with smooth animations and sound effects
- 💪 Multiple workout categories: Classic Mix, Beginner, Intermediate, Advanced, Cardio, and Strength
- 🎯 Dedicated pages for each workout category with specialized exercises
- ➕ Add and manage custom workouts with URLs for reference
- 🔢 Workout multipliers for adjusting exercise frequency
- 📱 Fully responsive design optimized for all devices
- 🎨 Modern UI with Tailwind CSS v4 styling
- 💾 Local storage persistence for custom workouts and preferences
- 📊 Spin history tracking with previous results
- 🔗 Direct workout links that open in new tabs
- ⚡ Fast page loads with Qwik's resumability
- 🎛️ Category filtering and workout management
- ♿ Accessibility features with proper ARIA labels and keyboard navigation

### Planned Features

See the [Development Roadmap](#-development-roadmap) below for upcoming enhancements.

## 🛠️ Technology Stack

- **Frontend**: Qwik Framework with TypeScript
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite
- **Development**: Qwik City for routing and SSR
- **Deployment**: GitHub Pages (Static Site Generation)
- **Canvas**: HTML5 Canvas for wheel animations
- **Testing**: Storybook 8.x + Playwright for component testing
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Quality Assurance**: ESLint, Prettier, TypeScript compiler
- **Documentation**: Storybook for component documentation

## 🏗️ Development Roadmap

This project has evolved from a Proof of Concept (POC) to a production-ready application. Here's our development journey:

### Phase 1: Core Infrastructure ✅

- [x] Create proper HTML structure for GitHub Pages deployment
- [x] Migrate from React CDN to Qwik framework with TypeScript
- [x] Set up file-based routing with Qwik City
- [x] Configure Vite build system and development server
- [x] Implement component architecture with reusable UI components
- [x] Add Tailwind CSS v4 for modern styling

### Phase 2: Feature Enhancement ✅

- [x] ~~[#2: Implement Data Persistence with localStorage](../../issues/2)~~
- [x] ~~[#3: Add Responsive Design Improvements](../../issues/3)~~
- [x] ~~[#4: Implement Workout Categories and Filtering](../../issues/4)~~
- [x] ~~[#5: Add PWA Capabilities for Mobile](../../issues/5)~~
- [x] ~~[#6: Implement Accessibility Improvements](../../issues/6)~~
- [x] Add multiple workout category pages (Beginner, Intermediate, Advanced, Cardio, Strength)
- [x] Implement spin history tracking and results management
- [x] Add workout management with custom workout creation

### Phase 3: Production Features ✅

- [x] ~~[#65: Upgrade to Storybook 9.x with Playwright Tests](../../issues/65)~~
- [x] ~~[#71: CI/CD Testing Integration](../../issues/71)~~
- [x] ~~[#78: Create Comprehensive Test Plan](../../issues/78)~~
- [x] ~~[#61: Application Testing in Storybook](../../issues/61)~~
- [x] Add comprehensive testing framework (Storybook + Playwright)
- [x] Implement automated testing and quality assurance
- [x] Add performance monitoring and build optimization
- [ ] [#9: Add Analytics and User Tracking](../../issues/9)
- [ ] [#10: Implement Advanced Animation Effects](../../issues/10)
- [ ] Add workout progress tracking and statistics
- [ ] Implement social sharing features
- [ ] Add workout timer and guided sessions

### Phase 4: Deployment & Maintenance ✅

- [x] ~~[#80: CI/CD Pipeline Setup and Fixes](../../issues/80)~~
- [x] ~~[#84: DevOps Infrastructure Improvements](../../issues/84)~~
- [x] Set up CI/CD Pipeline with GitHub Actions
- [x] Add automated testing and deployment validation
- [x] Implement comprehensive monitoring and error handling
- [x] Add build optimization and artifact management
- [ ] [#12: Add Contribution Guidelines and Documentation](../../issues/12)
- [ ] Implement user feedback collection
- [ ] Add performance analytics and monitoring dashboards

## 🎯 How to Use

1. **Choose Your Category**: Select from Classic Mix, Beginner, Intermediate, Advanced, Cardio, or Strength workouts using the dropdown menu or visit dedicated category pages
2. **Spin the Wheel**: Click the "SPIN" button to randomly select a workout from your chosen category
3. **Start Your Workout**: Click "Start Workout!" to open the exercise reference in a new tab
4. **Track Your Progress**: View your spin history in the "Previous Results" section
5. **Customize Your Arsenal**: Use the "Edit Workouts" button to add, modify, or remove exercises
6. **Adjust Intensity**: Set multiplier values for individual workouts to increase their frequency on the wheel

## 🏃‍♂️ Getting Started

### For Users

Simply visit the [live application](https://SergeiGolos.github.io/wheel-of-gains) and start spinning!

### For Developers

#### Prerequisites

- **Node.js**: v20.19.4+ (tested version, see [engines](./package.json))
- **npm**: 10.8.2+ (latest stable recommended)

#### Quick Start

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SergeiGolos/wheel-of-gains.git
   cd wheel-of-gains
   ```

2. **Install dependencies** (takes ~60 seconds, expect deprecated warnings):

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173/wheel-of-gains/`

#### Development Commands

```bash
# Development
npm run dev               # Start dev server (localhost:5173/wheel-of-gains/)
npm run start            # Alternative dev server with auto-open

# Code Quality
npm run fmt              # Format code with Prettier (5 seconds)
npm run fmt.check        # Check formatting without changes
npm run lint             # ESLint code checking (2 seconds)

# Building & Testing
npm run build            # Build for production (10 seconds)
npm run preview          # Preview production build (localhost:4173/wheel-of-gains/)
npm run build.types      # TypeScript type checking

# Testing & Quality Assurance
npm run test:playwright        # Run Playwright tests
npm run test:playwright:ui     # Run tests with UI mode
npm run test:playwright:headed # Run tests with browser visible
npm run analyze               # Generate code complexity analysis

# Storybook (Component Documentation & Testing)
npm run storybook            # Start Storybook dev server (localhost:6006)
npm run build-storybook      # Build Storybook for production
npm run playwright:install   # Install Playwright browsers (for CI/CD)
```

#### Development Workflow

1. **Before starting**: Run `npm run fmt && npm run lint` to establish clean baseline
2. **During development**: Keep `npm run dev` running for hot reload
3. **Before committing**:
   - `npm run fmt` - Format all code
   - `npm run lint` - Check for errors
   - `npm run build` - Verify production build works
   - Test core functionality manually by spinning the wheel

#### Testing Strategy

The project uses comprehensive testing with:

- **Storybook**: Component documentation and interactive testing
- **Playwright**: End-to-end testing of component behavior
- **Manual Testing**: Core wheel functionality validation
- **CI/CD Integration**: Automated testing on every push/PR

See [TESTING.md](./TESTING.md) for detailed testing documentation.

### 📊 Code Complexity Analysis

This project includes automated complexity analysis to help maintain code quality:

```bash
npm run analyze
```

This generates a comprehensive `COMPLEXITY_ANALYSIS.md` report that identifies:

- High complexity components that may need refactoring
- Detailed metrics for each file (lines of code, functions, dependencies)
- Recommendations for improving code maintainability

The analysis is particularly useful for this "heavily vibe coded" project to identify technical debt and prioritize refactoring efforts.

## 📖 Documentation

This project includes comprehensive documentation for different audiences:

### 📚 [Complete Documentation Index](./DOCS_INDEX.md)
**Central hub for all project documentation with organized navigation by audience and topic.**

### For Users

- **[Main README](./README.md)** - This file, project overview and getting started
- **[Live Application](https://SergeiGolos.github.io/wheel-of-gains)** - Try the app directly

### For Developers

- **[Testing Guide](./TESTING.md)** - Comprehensive testing with Storybook and Playwright
- **[Storybook Documentation](./STORYBOOK.md)** - Component documentation and interactive testing
- **[Complexity Analysis](./COMPLEXITY_ANALYSIS.md)** - Code quality metrics and maintenance guidelines
- **[Test Plans](./TEST_PLAN.md)** - Detailed testing strategies and coverage

### For DevOps Engineers

- **[CI/CD Testing Integration](./CI_CD_TESTING.md)** - Automated testing pipeline documentation
- **[DevOps Improvements](./DEVOPS_IMPROVEMENTS.md)** - Pipeline fixes and infrastructure updates
- **[Playwright Fix Documentation](./PLAYWRIGHT_FIX.md)** - Technical fixes for testing infrastructure

### For Contributors

- **[Issue Templates](./.github/ISSUE_TEMPLATE/)** - Templates for different types of contributions
- **[GitHub Actions Workflow](./.github/workflows/pages.yml)** - Automated deployment and testing

### Live Documentation

- **[Component Library (Storybook)](https://SergeiGolos.github.io/wheel-of-gains/storybook/)** - Interactive component documentation
- **[Project Hub](https://SergeiGolos.github.io/wheel-of-gains/)** - Central access to app and documentation

## 🤝 Contributing

We welcome contributions! This project is designed to be beginner-friendly with well-defined issues, comprehensive testing, and detailed documentation.

### How to Contribute

1. **Explore the codebase**:

   - Check out the [live application](https://SergeiGolos.github.io/wheel-of-gains)
   - Review [component documentation](https://SergeiGolos.github.io/wheel-of-gains/storybook/) in Storybook
   - Read the [testing documentation](./TESTING.md)

2. **Find an issue**:

   - Browse [open issues](../../issues) for tasks ranging from beginner to advanced
   - Each issue includes detailed acceptance criteria and implementation guidance
   - Look for issues labeled `good first issue` and `help wanted`

3. **Set up development environment**:

   - Follow the [developer setup instructions](#for-developers) above
   - Ensure all tests pass: `npm run test:playwright`
   - Verify build works: `npm run build`

4. **Make your contribution**:

   - Fork the repository and create a feature branch
   - Follow the development workflow (format, lint, build, test)
   - Add or update tests for your changes in Storybook
   - Update documentation if needed

5. **Submit your changes**:
   - Submit a Pull Request with your changes
   - All PRs trigger automated testing via GitHub Actions
   - Manual review ensures code quality and functionality

### Development Standards

- **Code Quality**: All code must pass linting (`npm run lint`) and formatting (`npm run fmt`)
- **Testing**: New features should include Storybook stories and Playwright tests
- **Documentation**: Update relevant documentation for significant changes
- **Build Verification**: All changes must pass production build (`npm run build`)

### Testing Your Changes

Before submitting, ensure:

1. **Automated tests pass**: `npm run test:playwright`
2. **Manual testing works**: Spin the wheel and test core functionality
3. **Storybook stories updated**: Add stories for new components
4. **Build succeeds**: `npm run build` completes without errors

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines.

### Good First Issues

Perfect starting points for new contributors:

Look for issues labeled `good first issue` and `help wanted` for beginner-friendly tasks.

## 📋 Project Structure

```
wheel-of-gains/
├── src/
│   ├── components/          # Reusable Qwik components
│   │   ├── workout/        # Workout-specific components
│   │   ├── ui/             # UI components (buttons, forms, etc.)
│   │   ├── navigation/     # Navigation components
│   │   ├── icons/          # SVG icon components
│   │   └── router-head/    # SEO and meta tag management
│   ├── routes/             # File-based routing
│   │   ├── index.tsx       # Home page (Classic Mix)
│   │   ├── beginner/       # Beginner workouts page
│   │   ├── intermediate/   # Intermediate workouts page
│   │   ├── advanced/       # Advanced workouts page
│   │   ├── cardio/         # Cardio workouts page
│   │   ├── strength/       # Strength workouts page
│   │   └── zip/            # Dynamic workout loading from compressed data
│   ├── utils/              # Utility functions and data
│   ├── global.css          # Global styles
│   └── root.tsx            # Root application component
├── .storybook/             # Storybook configuration
├── tests/                  # Playwright test files
├── scripts/                # Build and utility scripts
├── public/                 # Static assets
├── docs/                   # Additional documentation
├── package.json            # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── playwright.config.js   # Playwright testing configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── README.md              # This file
├── STORYBOOK.md           # Storybook documentation
├── TESTING.md             # Testing documentation and guides
├── CI_CD_TESTING.md       # CI/CD testing integration guide
├── DEVOPS_IMPROVEMENTS.md # DevOps pipeline improvements
└── .github/
    ├── workflows/
    │   └── pages.yml      # GitHub Pages deployment with testing
    └── ISSUE_TEMPLATE/    # Issue templates for contributors
```

## 🎨 Design Philosophy

- **Simplicity**: Easy to use with minimal learning curve
- **Motivation**: Gamify fitness routine selection
- **Accessibility**: Works for users of all technical levels
- **Extensibility**: Easy to add new features and workouts

## 📈 Future Vision

Transform this simple workout spinner into a comprehensive fitness companion featuring:

- Workout history and progress tracking
- Social features for sharing challenges
- Integration with fitness APIs
- Personalized workout recommendations
- Mobile app with offline capabilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original concept inspired by fitness gamification
- UI design using Tailwind CSS component patterns
- React community for excellent documentation and examples

---

**Ready to spin your way to gains? [Try it now!](https://SergeiGolos.github.io/wheel-of-gains)** 🚀
