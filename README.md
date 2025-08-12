# Wheel of Gains 🎯

**A fun and interactive workout randomizer that helps you break out of your fitness routine!**

Spin the wheel to randomly select your next workout challenge. Perfect for fitness enthusiasts who want to add variety to their training and discover new exercises.

## 🚀 Live Demo

Visit the live application: [Wheel of Gains on GitHub Pages](https://SergeiGolos.github.io/wheel-of-gains)

![Wheel of Gains App](https://github.com/user-attachments/assets/0a6ce836-3cc5-47e6-9fb5-463bd3890f67)

## ✨ Features

### Current Features (POC)
- 🎮 Interactive spinning wheel with smooth animations
- 💪 Pre-loaded workout challenges (Simple & Sinister, AXE exercises, etc.)
- ➕ Add custom workouts with URLs for reference
- 🔢 Workout multipliers for wheel frequency
- 📱 Responsive design that works on all devices
- 🎨 Beautiful UI with Tailwind CSS styling

### Planned Features
See the [Development Roadmap](#-development-roadmap) below for upcoming enhancements.

## 🛠️ Technology Stack

- **Frontend**: React 18 (via CDN)
- **Styling**: Tailwind CSS
- **Canvas**: HTML5 Canvas for wheel animations
- **Deployment**: GitHub Pages
- **Build**: Babel for JSX transformation

## 🏗️ Development Roadmap

This project is evolving from a Proof of Concept (POC) to a full-featured production application. Here's our planned journey:

### Phase 1: Core Infrastructure ✅
- [x] Create proper HTML structure for GitHub Pages deployment
- [x] Set up React app with CDN dependencies  
- [x] Configure basic GitHub Pages deployment
- [x] Create comprehensive README.md with project overview

### Phase 2: Feature Enhancement (Upcoming Issues)
- [ ] [#2: Implement Data Persistence with localStorage](../../issues/2) 
- [ ] [#3: Add Responsive Design Improvements](../../issues/3)
- [ ] [#4: Implement Workout Categories and Filtering](../../issues/4)
- [ ] [#5: Add PWA Capabilities for Mobile](../../issues/5)
- [ ] [#6: Implement Accessibility Improvements](../../issues/6)

### Phase 3: Production Features
- [ ] [#7: Add Testing Framework (Jest + React Testing Library)](../../issues/7)
- [ ] [#8: Performance Optimizations and Bundle Management](../../issues/8)
- [ ] [#9: Add Analytics and User Tracking](../../issues/9)
- [ ] [#10: Implement Advanced Animation Effects](../../issues/10)

### Phase 4: Deployment & Maintenance  
- [ ] [#11: Set up CI/CD Pipeline with GitHub Actions](../../issues/11)
- [ ] [#12: Add Contribution Guidelines and Documentation](../../issues/12)
- [ ] [#13: Implement Error Handling and Monitoring](../../issues/13)

## 🎯 How to Use

1. **Spin the Wheel**: Click the "SPIN" button to randomly select a workout
2. **Add Workouts**: Use the "Workout Arsenal" panel to add your own exercises
3. **Set Multipliers**: Increase workout frequency by setting multiplier values
4. **Start Training**: Click "Start Workout!" to open the exercise reference in a new tab

## 🏃‍♂️ Getting Started

### For Users
Simply visit the [live application](https://SergeiGolos.github.io/wheel-of-gains) and start spinning!

### For Developers

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SergeiGolos/wheel-of-gains.git
   cd wheel-of-gains
   ```

2. **Serve locally**:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using any other static file server
   ```

3. **Open in browser**:
   Navigate to `http://localhost:8000`

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
├── index.html          # Main HTML file with CDN dependencies
├── app.js              # React application code
├── poc.html            # Original POC file (reference)
├── README.md           # This file
└── .github/
    └── workflows/
        └── pages.yml   # GitHub Pages deployment
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