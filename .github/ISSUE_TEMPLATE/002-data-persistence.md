---
name: Data Persistence with localStorage
about: Implement data persistence to save user's workouts between sessions
title: "[FEATURE] Implement Data Persistence with localStorage"
labels: enhancement, good first issue
assignees: ''
---

## 🎯 Feature Description

Implement data persistence using localStorage to save user's custom workouts between browser sessions. Currently, when users refresh the page or close the browser, their custom workouts are lost.

## 🎨 User Story

**As a** fitness enthusiast using the Wheel of Gains  
**I want** my custom workouts to be saved automatically  
**So that** I don't have to re-enter them every time I visit the app

## ✅ Acceptance Criteria

- [ ] **Save workouts**: When users add custom workouts, they are automatically saved to localStorage
- [ ] **Load workouts**: On page load, previously saved workouts are restored from localStorage
- [ ] **Update workouts**: When users delete workouts, localStorage is updated accordingly
- [ ] **Graceful fallback**: If localStorage is not available, the app continues to work with default workouts
- [ ] **Data validation**: Validate loaded data to ensure it's in the correct format

## 🛠️ Technical Implementation

### Files to modify:
- `app.js` - Add localStorage integration to the App component

### Key functions to implement:
1. `saveWorkoutsToStorage(workouts)` - Save workouts array to localStorage
2. `loadWorkoutsFromStorage()` - Load and validate workouts from localStorage
3. Update `setMasterWorkouts` calls to also save to localStorage

### Example localStorage structure:
```json
{
  "wheelOfGains_workouts": [
    {
      "id": "uuid",
      "name": "Custom Workout",
      "url": "https://example.com",
      "multiplier": 2
    }
  ],
  "wheelOfGains_version": "1.0"
}
```

## 🧪 Testing Criteria

- [ ] Add workouts and refresh page - workouts should persist
- [ ] Delete workouts and refresh page - deletions should persist  
- [ ] Test with localStorage disabled/unavailable
- [ ] Test with corrupted localStorage data
- [ ] Verify backwards compatibility with existing users

## 📚 Resources

- [MDN localStorage documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [React useEffect for localStorage](https://react.dev/reference/react/useEffect)

## 🏷️ Labels

`enhancement` `good first issue` `javascript` `react`

## ⏱️ Estimated Time

**2-3 hours** for a beginner developer
**1-2 hours** for an experienced developer

## 🔗 Related Issues

Part of [Phase 2: Feature Enhancement](../../README.md#phase-2-feature-enhancement-upcoming-issues)