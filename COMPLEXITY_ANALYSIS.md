# Wheel of Gains - Complexity Analysis Report

*Generated on: 2025-08-14T21:50:27.426Z*

## Executive Summary

This document provides a comprehensive complexity analysis of the Wheel of Gains codebase. The project is acknowledged to be "heavily vibe coded" and this analysis aims to identify areas of high complexity that may benefit from refactoring.

### Key Metrics Overview

- **Total Files Analyzed**: 30
- **Total Lines of Code**: 2,276
- **Total Functions**: 42
- **Total Components**: 12
- **Total Import Statements**: 122

### Complexity Distribution

| Complexity Level | Count | Percentage |
|-----------------|-------|------------|
| SIMPLE | 7 | 23.3% |
| MEDIUM | 18 | 60.0% |
| COMPLEX | 4 | 13.3% |
| HIGH COMPLEXITY | 1 | 3.3% |

## High Priority Areas for Refactoring

The following files have high complexity and should be prioritized for refactoring:

### components/workout/workout-manager.tsx
- **Complexity Score**: 697
- **Lines of Code**: 493
- **Functions**: 11
- **Components**: 1
- **Dependencies**: 3
- **Conditional Statements**: 21
- **JSX Elements**: 72

### components/workout/wheel.tsx
- **Complexity Score**: 288
- **Lines of Code**: 213
- **Functions**: 6
- **Components**: 1
- **Dependencies**: 2
- **Conditional Statements**: 15
- **JSX Elements**: 11

### components/navigation/workout-navigation.tsx
- **Complexity Score**: 270
- **Lines of Code**: 210
- **Functions**: 2
- **Components**: 1
- **Dependencies**: 2
- **Conditional Statements**: 0
- **JSX Elements**: 30

### components/workout/workout-wheel-page.tsx
- **Complexity Score**: 250
- **Lines of Code**: 177
- **Functions**: 5
- **Components**: 1
- **Dependencies**: 7
- **Conditional Statements**: 9
- **JSX Elements**: 17

### utils/workout-utils.ts
- **Complexity Score**: 227
- **Lines of Code**: 173
- **Functions**: 8
- **Components**: 0
- **Dependencies**: 0
- **Conditional Statements**: 15
- **JSX Elements**: 0

## Complete File Analysis

The following table shows all files sorted by complexity score:

| File | Complexity Level | Score | Lines | Functions | Components | Dependencies |
|------|-----------------|-------|--------|-----------|------------|-------------|
| `components/workout/workout-manager.tsx` | HIGH_COMPLEXITY | 697 | 493 | 11 | 1 | 3 |
| `components/workout/wheel.tsx` | COMPLEX | 288 | 213 | 6 | 1 | 2 |
| `components/navigation/workout-navigation.tsx` | COMPLEX | 270 | 210 | 2 | 1 | 2 |
| `components/workout/workout-wheel-page.tsx` | COMPLEX | 250 | 177 | 5 | 1 | 7 |
| `utils/workout-utils.ts` | COMPLEX | 227 | 173 | 8 | 0 | 0 |
| `components/workout/workout-display-page.tsx` | MEDIUM | 188 | 132 | 3 | 1 | 6 |
| `utils/workout-collections.ts` | MEDIUM | 153 | 144 | 1 | 0 | 1 |
| `components/workout/workout-edit-page.tsx` | MEDIUM | 121 | 81 | 2 | 1 | 5 |
| `components/ui/result-display.tsx` | MEDIUM | 102 | 68 | 1 | 1 | 3 |
| `components/workout/previous-results.tsx` | MEDIUM | 101 | 69 | 1 | 1 | 3 |
| `components/workout/filter-panel.tsx` | MEDIUM | 85 | 66 | 2 | 1 | 2 |
| `routes/index.tsx` | MEDIUM | 75 | 65 | 0 | 0 | 4 |
| `components/router-head/router-head.tsx` | SIMPLE | 64 | 43 | 0 | 1 | 2 |
| `root.tsx` | SIMPLE | 58 | 29 | 0 | 0 | 3 |
| `routes/advanced/index.tsx` | MEDIUM | 36 | 24 | 0 | 0 | 4 |
| `routes/beginner/index.tsx` | MEDIUM | 36 | 24 | 0 | 0 | 4 |
| `routes/advanced/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/beginner/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/cardio/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/cardio/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/intermediate/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/intermediate/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/strength/edit/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `routes/strength/index.tsx` | MEDIUM | 34 | 24 | 0 | 0 | 4 |
| `entry.ssr.tsx` | SIMPLE | 23 | 17 | 0 | 0 | 2 |
| `components/ui/category-badge.tsx` | SIMPLE | 22 | 15 | 0 | 1 | 2 |
| `components/icons/kettlebell-icon.tsx` | SIMPLE | 13 | 8 | 0 | 1 | 1 |
| `entry.preview.tsx` | SIMPLE | 12 | 4 | 0 | 0 | 3 |
| `entry.dev.tsx` | SIMPLE | 11 | 5 | 0 | 0 | 2 |

## Detailed Component Analysis

### React Components (12 files)

These files contain React components and represent the core UI logic:

#### `components/workout/workout-manager.tsx`
- **Complexity Level**: HIGH_COMPLEXITY
- **Complexity Score**: 697
- **Analysis**:
  - Lines of Code: 493
  - Functions: 11
  - Components: 1
  - React Hooks: 10
  - Event Handlers: 11
  - JSX Elements: 72
  - Dependencies: 3

#### `components/workout/wheel.tsx`
- **Complexity Level**: COMPLEX
- **Complexity Score**: 288
- **Analysis**:
  - Lines of Code: 213
  - Functions: 6
  - Components: 1
  - React Hooks: 4
  - Event Handlers: 2
  - JSX Elements: 11
  - Dependencies: 2

#### `components/navigation/workout-navigation.tsx`
- **Complexity Level**: COMPLEX
- **Complexity Score**: 270
- **Analysis**:
  - Lines of Code: 210
  - Functions: 2
  - Components: 1
  - React Hooks: 3
  - Event Handlers: 6
  - JSX Elements: 30
  - Dependencies: 2

#### `components/workout/workout-wheel-page.tsx`
- **Complexity Level**: COMPLEX
- **Complexity Score**: 250
- **Analysis**:
  - Lines of Code: 177
  - Functions: 5
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 6
  - JSX Elements: 17
  - Dependencies: 7

#### `components/workout/workout-display-page.tsx`
- **Complexity Level**: MEDIUM
- **Complexity Score**: 188
- **Analysis**:
  - Lines of Code: 132
  - Functions: 3
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 3
  - JSX Elements: 11
  - Dependencies: 6

#### `components/workout/workout-edit-page.tsx`
- **Complexity Level**: MEDIUM
- **Complexity Score**: 121
- **Analysis**:
  - Lines of Code: 81
  - Functions: 2
  - Components: 1
  - React Hooks: 1
  - Event Handlers: 1
  - JSX Elements: 8
  - Dependencies: 5

#### `components/ui/result-display.tsx`
- **Complexity Level**: MEDIUM
- **Complexity Score**: 102
- **Analysis**:
  - Lines of Code: 68
  - Functions: 1
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 1
  - JSX Elements: 14
  - Dependencies: 3

#### `components/workout/previous-results.tsx`
- **Complexity Level**: MEDIUM
- **Complexity Score**: 101
- **Analysis**:
  - Lines of Code: 69
  - Functions: 1
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 1
  - JSX Elements: 15
  - Dependencies: 3

#### `components/workout/filter-panel.tsx`
- **Complexity Level**: MEDIUM
- **Complexity Score**: 85
- **Analysis**:
  - Lines of Code: 66
  - Functions: 2
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 2
  - JSX Elements: 6
  - Dependencies: 2

#### `components/router-head/router-head.tsx`
- **Complexity Level**: SIMPLE
- **Complexity Score**: 64
- **Analysis**:
  - Lines of Code: 43
  - Functions: 0
  - Components: 1
  - React Hooks: 2
  - Event Handlers: 1
  - JSX Elements: 9
  - Dependencies: 2

#### `components/ui/category-badge.tsx`
- **Complexity Level**: SIMPLE
- **Complexity Score**: 22
- **Analysis**:
  - Lines of Code: 15
  - Functions: 0
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 0
  - JSX Elements: 2
  - Dependencies: 2

#### `components/icons/kettlebell-icon.tsx`
- **Complexity Level**: SIMPLE
- **Complexity Score**: 13
- **Analysis**:
  - Lines of Code: 8
  - Functions: 0
  - Components: 1
  - React Hooks: 0
  - Event Handlers: 0
  - JSX Elements: 2
  - Dependencies: 1

### Utility Files (2 files)

Core business logic and utility functions:

#### `utils/workout-utils.ts`
- **Complexity Level**: COMPLEX
- **Functions**: 8
- **Lines**: 173
- **Dependencies**: 0

#### `utils/workout-collections.ts`
- **Complexity Level**: MEDIUM
- **Functions**: 1
- **Lines**: 144
- **Dependencies**: 1

### Route Files (12 files)

Page-level components and routing:

#### `routes/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 75
- **Lines**: 65

#### `routes/advanced/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 36
- **Lines**: 24

#### `routes/beginner/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 36
- **Lines**: 24

#### `routes/advanced/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/beginner/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/cardio/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/cardio/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/intermediate/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/intermediate/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/strength/edit/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

#### `routes/strength/index.tsx`
- **Complexity Level**: MEDIUM
- **Score**: 34
- **Lines**: 24

## Recommendations

Based on this analysis, here are key recommendations for improving code maintainability:

### Immediate Action Required (High Complexity)

1. **`components/workout/workout-manager.tsx`** (Score: 697)
   - Consider breaking down into smaller components
   - Extract reusable utility functions
   - Simplify conditional logic where possible
   - Reduce the number of dependencies if feasible

### Medium Priority (Complex)

- **`components/workout/wheel.tsx`**: Monitor for growth, consider refactoring if complexity increases
- **`components/navigation/workout-navigation.tsx`**: Monitor for growth, consider refactoring if complexity increases
- **`components/workout/workout-wheel-page.tsx`**: Monitor for growth, consider refactoring if complexity increases
- **`utils/workout-utils.ts`**: Monitor for growth, consider refactoring if complexity increases
### General Recommendations

1. **Component Decomposition**: Large components should be broken into smaller, focused components
2. **Custom Hooks**: Extract stateful logic into custom hooks for reusability
3. **Utility Functions**: Move pure functions to utility files
4. **Constants**: Extract magic numbers and strings to constants files
5. **Type Definitions**: Consider moving complex type definitions to separate files

### Code Quality Best Practices

1. **Single Responsibility**: Each component should have one clear purpose
2. **DRY Principle**: Eliminate code duplication where possible
3. **Error Boundaries**: Add error handling for complex components
4. **Testing**: Prioritize testing for high-complexity components
5. **Documentation**: Add JSDoc comments for complex functions

## Methodology

This analysis uses the following metrics to calculate complexity:

- **Lines of Code**: Raw indicator of file size
- **Function Count**: Number of functions/methods (weight: 3x)
- **Conditional Complexity**: If/switch/ternary statements (weight: 2x)
- **JSX Complexity**: Number of JSX elements (weight: 1.5x)
- **Dependencies**: External imports (weight: 2x)
- **Hook Usage**: React hooks usage (weight: 1.5x)

### Complexity Levels

- **SIMPLE**: ≤50 lines, ≤5 functions, ≤3 dependencies
- **MEDIUM**: ≤150 lines, ≤15 functions, ≤8 dependencies  
- **COMPLEX**: ≤300 lines, ≤25 functions, ≤15 dependencies
- **HIGH_COMPLEXITY**: Exceeds complex thresholds

---

*This analysis was generated automatically. For questions or suggestions about the methodology, please open an issue.*
