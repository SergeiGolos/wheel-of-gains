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

### Phase 3: Production Features (In Progress)

- [ ] [#7: Add Testing Framework (Jest + React Testing Library)](../../issues/7)
- [ ] [#8: Performance Optimizations and Bundle Management](../../issues/8)
- [ ] [#9: Add Analytics and User Tracking](../../issues/9)
- [ ] [#10: Implement Advanced Animation Effects](../../issues/10)
- [ ] Add workout progress tracking and statistics
- [ ] Implement social sharing features
- [ ] Add workout timer and guided sessions

### Phase 4: Deployment & Maintenance

- [ ] [#11: Set up CI/CD Pipeline with GitHub Actions](../../issues/11)
- [ ] [#12: Add Contribution Guidelines and Documentation](../../issues/12)
- [ ] [#13: Implement Error Handling and Monitoring](../../issues/13)
- [ ] Add automated testing and quality assurance
- [ ] Implement user feedback collection

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

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SergeiGolos/wheel-of-gains.git
   cd wheel-of-gains
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173/wheel-of-gains/`

5. **Build for production**:

   ```bash
   npm run build
   ```

6. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🤝 Contributing

We welcome contributions! This project is designed to be beginner-friendly with well-defined issues.

### How to Contribute

1. Check out our [Issues](../../issues) for tasks ranging from beginner to advanced
2. Each issue includes detailed acceptance criteria and implementation guidance
3. Fork the repository and create a feature branch
4. Submit a Pull Request with your changes

### Good First Issues

Look for issues labeled `good first issue` and `help wanted` for beginner-friendly tasks.

## 📋 Project Structure

```
wheel-of-gains/
├── src/
│   ├── components/          # Reusable Qwik components
│   │   ├── workout/        # Workout-specific components
│   │   └── router-head/    # SEO and meta tag management
│   ├── routes/             # File-based routing
│   │   ├── index.tsx       # Home page (Classic Mix)
│   │   ├── beginner/       # Beginner workouts page
│   │   ├── intermediate/   # Intermediate workouts page
│   │   ├── advanced/       # Advanced workouts page
│   │   ├── cardio/         # Cardio workouts page
│   │   └── strength/       # Strength workouts page
│   ├── utils/              # Utility functions and data
│   ├── global.css          # Global styles
│   └── root.tsx            # Root application component
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── index.html             # Legacy HTML file (kept for reference)
├── app.js                 # Legacy React app (kept for reference)
├── README.md              # This file
└── .github/
    └── workflows/
        └── pages.yml      # GitHub Pages deployment
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
