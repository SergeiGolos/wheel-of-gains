# Storybook Documentation for Wheel of Gains

## Overview

This project uses [Storybook](https://storybook.js.org/) to develop, test, and document UI components in isolation. The Storybook implementation provides visual testing, interactive development, and component documentation for the Wheel of Gains application.

## Quick Start

### Running Storybook

```bash
# Start development server
npm run storybook

# Build static version
npm run build-storybook

# Serve built Storybook (after building)
npm run storybook:serve
```

The development server runs on [http://localhost:6006](http://localhost:6006)

### Directory Structure

```
.storybook/
├── main.ts          # Main Storybook configuration
├── preview.ts       # Global settings and decorators
└── qwik-renderer.ts # Custom Qwik component renderer (experimental)

src/
├── components/
│   ├── icons/
│   │   └── kettlebell-icon.stories.ts
│   ├── ui/
│   │   ├── category-badge.stories.ts
│   │   └── result-display.stories.ts
│   └── workout/
│       └── components/
│           └── action-buttons.stories.ts
└── ...
```

## Component Coverage

### ✅ Implemented Stories

#### Icons
- **KettlebellIcon** (6 stories)
  - Default, Small, Large, XL sizes
  - Color variations
  - Size comparison overview

#### UI Components  
- **CategoryBadge** (7 stories)
  - All 6 workout categories (Classic, Beginner, Intermediate, Advanced, Cardio, Strength)
  - All categories overview
  
- **ResultDisplay** (7 stories)
  - No result state
  - Spinning state
  - Workout result states (Classic, Cardio, Strength, Beginner)
  - Interactive controls

#### Workout Components
- **ActionButtons** (4 stories)
  - No unsaved changes state
  - With unsaved changes state (shows Save button)
  - Interactive controls
  - Button states comparison

### 🚧 Planned Stories

#### Workflow Components (Medium Complexity)
- [ ] NewWorkoutForm
- [ ] WorkoutListItem  
- [ ] PreviousResults
- [ ] FilterPanel

#### Navigation Components
- [ ] WorkoutNavigation

#### High-Complexity Components
- [ ] Wheel (Canvas-based spinning wheel)
- [ ] WorkoutManager (Complex form handling)
- [ ] WorkoutWheelPage (Full page component)

## Technical Implementation

### Framework Compatibility

This Storybook setup uses the **HTML-Vite framework** to support Qwik components:

- **HTML Rendering**: Components are rendered as static HTML with Tailwind CSS
- **Interactive Controls**: Storybook controls allow property manipulation
- **Mock Data**: Stories use mock workout and category data
- **Event Handling**: Alert-based interaction testing for click events

### Story Structure

Each story file follows this pattern:

```typescript
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Category/ComponentName',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Component description...',
      },
    },
  },
  argTypes: {
    // Interactive controls
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render HTML
const renderComponent = (args: any) => {
  return `<div>...</div>`;
};

export const DefaultStory: Story = {
  args: { /* default props */ },
  render: renderComponent,
};
```

### Mock Data

Stories use consistent mock data defined in each story file:

```typescript
const mockCategories = {
  classic: { id: 'classic', name: 'Classic Mix', color: '#64748b' },
  // ... other categories
};

const mockWorkouts = {
  pushUps: {
    id: '1',
    name: 'Push Ups',
    url: 'https://example.com/pushups',
    multiplier: 1,
    category: mockCategories.classic,
  },
  // ... other workouts
};
```

## Features

### Interactive Controls

All stories include Storybook controls for:
- **Boolean properties**: Toggle switches
- **Select properties**: Dropdown selections  
- **Color properties**: Color pickers
- **Custom mappings**: Complex object selections

### Accessibility Testing

The `@storybook/addon-a11y` addon provides:
- Automated accessibility checks
- ARIA compliance validation
- Color contrast verification
- Keyboard navigation testing

### Visual Regression Testing

Storybook enables:
- **Screenshot testing**: Visual comparison between versions
- **Responsive testing**: Multiple viewport sizes
- **Theme testing**: Light/dark mode variations
- **State testing**: Component behavior in different states

## Development Workflow

### Adding New Stories

1. **Create story file**: `ComponentName.stories.ts` next to component
2. **Define meta**: Title, parameters, argTypes
3. **Create render function**: Convert component to HTML
4. **Add story variations**: Different states and props
5. **Test interactivity**: Verify controls and behaviors

### Story Categories

Stories are organized by component type:
- **Icons**: Simple SVG components
- **UI Components**: Reusable interface elements  
- **Workout Components**: Fitness-specific functionality
- **Navigation Components**: Application navigation
- **Page Components**: Full page layouts

### Best Practices

1. **Descriptive titles**: Use clear, hierarchical naming
2. **Comprehensive args**: Cover all important prop combinations
3. **Interactive examples**: Include controls for key properties
4. **Documentation**: Add descriptions for complex behaviors
5. **Mock data**: Use realistic but safe test data

## Testing Strategy

### Visual Testing

- **Component isolation**: Test components without dependencies
- **State coverage**: Test all important component states
- **Responsive behavior**: Verify layout at different sizes
- **Theme compatibility**: Test with different color schemes

### Interaction Testing

- **Button clicks**: Verify click handlers work correctly
- **Form inputs**: Test input validation and handling
- **State changes**: Confirm component updates properly
- **Error states**: Test error handling and display

### Accessibility Testing

- **Screen reader compatibility**: ARIA labels and descriptions
- **Keyboard navigation**: Tab order and keyboard shortcuts
- **Color contrast**: Sufficient contrast ratios
- **Focus management**: Proper focus indicators

## Integration with CI/CD

### Build Integration

The Storybook build is integrated with the project build:

```bash
# Build both application and Storybook
npm run build && npm run build-storybook
```

### Deployment

Static Storybook builds can be deployed alongside the main application:

```
dist/               # Main application
storybook-static/   # Storybook build (excluded from git)
```

### Automated Testing

Future CI/CD integration can include:
- Visual regression testing with Chromatic
- Accessibility testing automation  
- Performance monitoring
- Snapshot testing

## Configuration

### Storybook Configuration

```typescript
// .storybook/main.ts
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    '@storybook/addon-controls', 
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  // ...
};
```

### Global Styles

Tailwind CSS is imported globally in `.storybook/preview.ts`:

```typescript
import '../src/global.css';
```

## Troubleshooting

### Common Issues

1. **Build failures**: Ensure all story dependencies are properly mocked
2. **Missing styles**: Verify Tailwind CSS classes are available
3. **Control errors**: Check argTypes configuration for complex props
4. **Rendering issues**: Validate HTML structure in render functions

### Performance

- **Large components**: Consider lazy loading for complex stories
- **Build time**: Exclude unnecessary files from story detection
- **Memory usage**: Limit concurrent story rendering

## Contributing

### Adding New Components

1. Create component story file alongside component
2. Follow existing naming conventions
3. Include comprehensive prop coverage  
4. Add interactive controls where appropriate
5. Document complex behaviors
6. Test accessibility compliance

### Updating Existing Stories

1. Maintain backward compatibility
2. Update mock data as needed
3. Test all story variations
4. Update documentation

## Future Enhancements

### Planned Features

- [ ] **Component playground**: Interactive component builder
- [ ] **Design tokens**: Centralized theme management
- [ ] **Animation testing**: Motion and transition verification  
- [ ] **Performance monitoring**: Bundle size and rendering metrics
- [ ] **Integration testing**: Cross-component interaction testing

### Advanced Testing

- [ ] **Visual regression**: Automated screenshot comparison
- [ ] **Cross-browser testing**: Multi-browser compatibility
- [ ] **Mobile testing**: Touch interaction verification
- [ ] **Performance profiling**: Rendering performance analysis

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Qwik Framework](https://qwik.builder.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Created for Wheel of Gains - Issue #61: Application testing in Storybook**