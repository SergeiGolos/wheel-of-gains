---
name: Workout Categories and Filtering
about: Add categories and filtering to organize workouts better
title: "[FEATURE] Implement Workout Categories and Filtering"
labels: enhancement, feature
assignees: ''
---

## 🎯 Feature Description

Add workout categories and filtering capabilities to help users organize their workouts and create more focused training sessions. Users should be able to categorize workouts and filter the wheel to only include specific types of exercises.

## 🎨 User Story

**As a** fitness enthusiast with many different workout types  
**I want** to categorize my workouts and filter them by type  
**So that** I can focus on specific muscle groups or workout styles during my session

## ✅ Acceptance Criteria

### Category Management
- [ ] **Add categories**: When adding workouts, users can select or create categories
- [ ] **Default categories**: Provide common categories (Strength, Cardio, Flexibility, etc.)
- [ ] **Custom categories**: Users can create their own categories
- [ ] **Category colors**: Each category has a distinct color for visual organization

### Filtering System
- [ ] **Filter UI**: Add filter controls above the wheel
- [ ] **Multiple selection**: Users can select multiple categories to include
- [ ] **Real-time filtering**: Wheel updates immediately when filters change
- [ ] **Filter persistence**: Selected filters are remembered between sessions
- [ ] **Clear filters**: Easy way to remove all filters and show all workouts

### Visual Enhancements
- [ ] **Category indicators**: Show category colors on workout items
- [ ] **Filter badges**: Display active filters as removable badges
- [ ] **Empty state**: Show helpful message when no workouts match filters

## 🛠️ Technical Implementation

### Data Structure Changes
```javascript
// Enhanced workout object
const workout = {
  id: 'uuid',
  name: 'Push-ups',
  url: 'https://example.com',
  multiplier: 2,
  category: {
    id: 'strength',
    name: 'Strength Training',
    color: '#3b82f6'
  }
};

// Default categories
const DEFAULT_CATEGORIES = [
  { id: 'strength', name: 'Strength Training', color: '#3b82f6' },
  { id: 'cardio', name: 'Cardio', color: '#ef4444' },
  { id: 'flexibility', name: 'Flexibility', color: '#22c55e' },
  { id: 'sports', name: 'Sports', color: '#f97316' },
  { id: 'recovery', name: 'Recovery', color: '#8b5cf6' }
];
```

### New Components
1. **CategorySelector**: Dropdown for selecting categories when adding workouts
2. **FilterPanel**: UI for selecting active category filters
3. **CategoryBadge**: Visual indicator for workout categories

### Files to modify:
- `app.js` - Add filtering logic and new components
- Update `WorkoutManager` component for category selection
- Update `Wheel` component to use filtered workouts

### Key functions to implement:
```javascript
const [activeFilters, setActiveFilters] = useState([]);
const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

const getFilteredWorkouts = (workouts, filters) => {
  if (filters.length === 0) return workouts;
  return workouts.filter(workout => 
    filters.includes(workout.category.id)
  );
};
```

## 🎨 UI Design

### Filter Panel
```
┌─ Filter by Category ──────────────────────┐
│ [ Strength ] [ Cardio ] [ Flexibility ]   │
│ [ Sports ] [ Recovery ] [ Clear All ]     │
└───────────────────────────────────────────┘
```

### Workout Item with Category
```
┌─────────────────────────────────────┐
│ 🟦 Push-ups (x2)              [×]  │
│    Strength Training               │
└─────────────────────────────────────┘
```

### Add Workout Form Enhancement
```
┌─ Add Challenge ─────────────────────┐
│ Workout Name: [_________________]  │
│ Workout URL:  [_________________]  │
│ Multiplier:   [1_______________]    │
│ Category:     [Strength ⌄]         │
│ [Add to Arsenal]                   │
└────────────────────────────────────┘
```

## 🧪 Testing Criteria

### Functionality Testing
- [ ] Add workouts with different categories
- [ ] Filter by single category - only matching workouts appear
- [ ] Filter by multiple categories - workouts from any selected category appear
- [ ] Clear filters - all workouts reappear
- [ ] Create custom category - appears in filter options
- [ ] Delete workout - filters update correctly

### Data Persistence Testing
- [ ] Selected filters persist after page reload
- [ ] Custom categories persist after page reload
- [ ] Category assignments persist after page reload

### Edge Cases
- [ ] Filter with no matching workouts - show empty state
- [ ] Delete last workout in a category - handle gracefully
- [ ] Very long category names - handle with truncation

## 🎨 Color Palette for Categories

- **Strength Training**: `#3b82f6` (Blue)
- **Cardio**: `#ef4444` (Red)  
- **Flexibility**: `#22c55e` (Green)
- **Sports**: `#f97316` (Orange)
- **Recovery**: `#8b5cf6` (Purple)
- **Custom**: `#14b8a6` (Teal)

## 📚 Resources

- [React useState for state management](https://react.dev/reference/react/useState)
- [Array filtering in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Tailwind CSS colors](https://tailwindcss.com/docs/customizing-colors)

## 🏷️ Labels

`enhancement` `feature` `ui/ux` `organization`

## ⏱️ Estimated Time

**6-8 hours** for full implementation with testing

## 🔗 Related Issues

- Depends on: [#2 Data Persistence](../../issues/2)
- Part of [Phase 2: Feature Enhancement](../../README.md#phase-2-feature-enhancement-upcoming-issues)