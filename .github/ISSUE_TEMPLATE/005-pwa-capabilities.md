---
name: PWA Capabilities for Mobile
about: Transform the app into a Progressive Web App for better mobile experience
title: "[FEATURE] Add PWA Capabilities for Mobile"
labels: enhancement, pwa, mobile
assignees: ''
---

## 🎯 Feature Description

Transform the Wheel of Gains into a Progressive Web App (PWA) to provide a native app-like experience on mobile devices. Users should be able to install the app on their home screen and use it offline.

## 🎨 User Story

**As a** mobile user who works out frequently  
**I want** to install the Wheel of Gains on my phone's home screen  
**So that** I can quickly access it at the gym without opening a browser

## ✅ Acceptance Criteria

### PWA Core Features
- [ ] **Installable**: App can be installed on mobile home screens
- [ ] **App-like experience**: Runs in standalone mode without browser UI
- [ ] **Fast loading**: Service worker caches resources for quick startup
- [ ] **Offline support**: Basic functionality works without internet connection
- [ ] **Responsive**: Optimized for mobile screens and touch interactions

### Technical Requirements
- [ ] **Manifest file**: Valid web app manifest with proper metadata
- [ ] **Service worker**: Implements caching strategy for offline support
- [ ] **HTTPS ready**: Works over secure connections (required for PWA)
- [ ] **Icons**: High-quality icons for various device sizes
- [ ] **Splash screens**: Custom loading screens for better UX

### Installation Experience
- [ ] **Install prompt**: Show custom install prompt when appropriate
- [ ] **Install banner**: Browser shows "Add to Home Screen" prompt
- [ ] **App icons**: Proper icons appear on device home screens
- [ ] **App name**: Shows as "Wheel of Gains" in app drawer

## 🛠️ Technical Implementation

### 1. Web App Manifest (`manifest.json`)
```json
{
  "name": "Wheel of Gains",
  "short_name": "WheelGains",
  "description": "Random workout selector to spice up your fitness routine",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f1f5f9",
  "theme_color": "#0f172a",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["fitness", "health", "lifestyle"],
  "screenshots": [
    {
      "src": "screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker (`sw.js`)
```javascript
const CACHE_NAME = 'wheel-of-gains-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js'
];

// Cache resources on install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

### 3. Service Worker Registration
```javascript
// Add to app.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

### Files to create/modify:
- `manifest.json` - Web app manifest
- `sw.js` - Service worker for caching
- `icons/` - Directory with app icons (192x192, 512x512)
- `index.html` - Add manifest link and meta tags
- `app.js` - Register service worker

## 📱 Icon Requirements

### Required Icon Sizes
- **192x192**: Minimum required size
- **512x512**: High-resolution for splash screens
- **180x180**: iOS Safari bookmark icon
- **32x32**: Browser tab favicon

### Icon Design Guidelines
- **Simple and recognizable**: Clear at small sizes
- **Wheel theme**: Incorporate the spinning wheel concept
- **Fitness focus**: Convey the workout/fitness purpose
- **Brand colors**: Use app's color scheme (slate/teal)

### Icon Concept
```
🎯 Stylized spinning wheel with fitness elements
   - Circular design with wheel spokes
   - Kettlebell or dumbbell in center
   - App colors: slate gray and teal accent
```

## 🧪 Testing Criteria

### PWA Audit
- [ ] **Lighthouse PWA score**: Achieve 90+ PWA score
- [ ] **Manifest validation**: Passes web app manifest validation
- [ ] **Service worker**: Registers and caches correctly
- [ ] **Installability**: Shows install prompts appropriately

### Device Testing
- [ ] **Android Chrome**: Install and test app behavior
- [ ] **iOS Safari**: Add to home screen functionality
- [ ] **Desktop Chrome**: Install as desktop app
- [ ] **Offline mode**: Core features work without internet

### User Experience
- [ ] **App launch**: Opens quickly from home screen
- [ ] **Standalone mode**: No browser UI visible
- [ ] **Native feel**: Smooth animations and interactions
- [ ] **Background sync**: Data persists between sessions

## 🎨 UX Enhancements for PWA

### Install Prompt
```javascript
// Custom install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPromotion();
});

const showInstallPromotion = () => {
  // Show custom UI to promote PWA installation
  const installBanner = document.getElementById('install-banner');
  installBanner.style.display = 'block';
};
```

### Offline Indicator
```javascript
// Show offline status
window.addEventListener('online', () => {
  showNotification('Back online!');
});

window.addEventListener('offline', () => {
  showNotification('Working offline');
});
```

## 📚 Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Lighthouse PWA Audits](https://web.dev/lighthouse-pwa/)

## 🏷️ Labels

`enhancement` `pwa` `mobile` `performance` `offline`

## ⏱️ Estimated Time

**8-10 hours** for full PWA implementation and testing

## 🔗 Related Issues

- Builds on: [#3 Responsive Design](../../issues/3)
- Part of [Phase 2: Feature Enhancement](../../README.md#phase-2-feature-enhancement-upcoming-issues)