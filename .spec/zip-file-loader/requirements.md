# Zip-File-Loader Feature Requirements

## Feature Overview

Transform the Wheel of Gains application from a predefined-collection model to a purely custom, zip-encoded workout system with two distinct operational states.

## Functional Requirements

### FR-001: Two-State System
**Requirement**: The application must operate in exactly two states based on URL parameters:
- **State 1**: Create Mode (accessed via `/` without zip parameter)  
- **State 2**: Wheel Mode (accessed via `/?zip=...` with encoded data)

**Rationale**: Simplifies user experience and eliminates confusion between predefined and custom collections

**Acceptance Criteria**:
- Visiting `/` without parameters displays create mode
- Visiting `/?zip=...` with valid data displays wheel mode  
- Invalid data gracefully falls back to create mode with error message
- State detection happens instantly without loading delays

### FR-002: Create Mode Functionality
**Requirement**: Create mode must allow users to build custom workout collections and generate shareable URLs

**Components**:
- Collection title input (required, max 60 characters)
- Collection description input (optional, max 200 characters)  
- Dynamic workout list with add/remove capabilities
- Workout name input (required)
- Multiplier selection (0.5x, 1x, 2x, 3x)
- Optional reference URL input
- Real-time share URL generation
- Copy to clipboard functionality
- Test wheel button for immediate preview

**Acceptance Criteria**:
- Minimum 3 workouts required for URL generation
- Share URL updates automatically as user types
- Copy to clipboard provides visual feedback
- Test wheel opens functional wheel in same/new tab
- Form validation prevents incomplete submissions
- URL generation handles encoding errors gracefully

### FR-003: Wheel Mode Functionality  
**Requirement**: Wheel mode must decode shared collections and provide full wheel functionality

**Components**:
- ZIP data decoding and validation
- Loading state during decoding process
- Error handling for invalid/corrupted data
- Full wheel spinning functionality
- Collection metadata display (title, description)
- Edit collection button (returns to create mode)
- Share collection button (copy URL)
- Create new collection button (clear state, return to create)

**Acceptance Criteria**:
- Decodes both gzipped and uncompressed base64 data
- Loading state shows progress indicators
- Decoding errors show helpful error messages
- Wheel functions identically to current implementation
- Edit preserves collection data in create mode
- Share generates identical URL for re-sharing
- Create new provides clean slate without affecting current wheel

### FR-004: Route Consolidation
**Requirement**: Eliminate predefined workout collections and category routes

**Changes Required**:
- Remove routes: `/beginner`, `/intermediate`, `/advanced`, `/cardio`, `/strength`
- Deprecate route: `/create` (functionality moved to `/` create mode)
- Update root route: `/` with enhanced two-state functionality  
- Maintain compatibility: Existing shared URLs continue to work

**Acceptance Criteria**:
- Old category routes return 404 or redirect to `/`
- Navigation no longer references category routes
- Root page directs users to create their first wheel
- `/create` redirects to `/` with backward compatibility
- All internal links updated to new route structure

## Non-Functional Requirements

### NFR-001: Performance
**Requirement**: Route consolidation must not degrade application performance

**Constraints**:
- Bundle size reduction from removing predefined collections
- ZIP encoding/decoding completes within 2 seconds
- Create mode UI updates respond within 100ms
- Wheel mode loading completes within 3 seconds
- State transitions appear instant to users

### NFR-002: Accessibility
**Requirement**: Both states must meet WCAG 2.1 AA accessibility standards

**Features**:
- Screen reader compatibility for all form inputs
- Keyboard navigation for workout list management
- ARIA labels for dynamic content
- Focus management during state transitions
- High contrast support for visual elements

### NFR-003: Mobile Responsiveness
**Requirement**: Both states must function effectively on mobile devices

**Specifications**:
- Touch-friendly input controls
- Readable text at default zoom levels
- Usable buttons and interactive elements (min 44px)
- Horizontal scrolling avoided
- Portrait and landscape orientation support

### NFR-004: Browser Compatibility  
**Requirement**: Support modern browsers with graceful degradation

**Targets**:
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile browsers on iOS 14+ and Android 10+
- Clipboard API fallback for unsupported browsers
- Base64/ZIP decoding works in all target browsers

## Data Requirements  

### DR-001: Collection Structure
**Requirement**: Maintain existing workout collection data structure

**Schema**:
```typescript
interface EncodedWorkoutCollection {
  title: string;           // Max 60 chars, required
  description: string;     // Max 200 chars, optional
  workouts: Workout[];     // Min 3 items, required
}

interface Workout {
  id: string;             // Generated, unique
  name: string;           // Required, user input  
  multiplier: number;     // 0.5, 1, 2, or 3
  url: string;            // Auto-generated or user input
  category: string;       // Default category applied
}
```

### DR-002: URL Encoding
**Requirement**: Maintain backward compatibility with existing share URLs

**Format**:
- Base64 + gzip compression for optimal size
- URL parameter: `?data=<encoded_string>`
- Support legacy uncompressed base64 for testing
- Handle encoding errors with meaningful messages

## Integration Requirements

### IR-001: Component Reuse
**Requirement**: Maximize reuse of existing components

**Reusable Components**:
- `WorkoutDisplayPage` for wheel mode
- Existing wheel spinning logic and canvas rendering
- Navigation components with updated routes
- Form input components for create mode
- Loading states and error displays

### IR-002: Storage Compatibility
**Requirement**: Local storage behavior must remain consistent

**Behavior**:
- Wheel mode uses temporary storage (session-based)
- No persistent storage of create mode state
- Existing local storage keys preserved for compatibility
- Clear storage when creating new collections

## Security Requirements

### SR-001: Input Validation
**Requirement**: All user inputs must be validated and sanitized

**Validations**:
- Title length and character restrictions
- Description length limits  
- Workout name sanitization
- URL validation for custom reference links
- ZIP data validation before decoding

### SR-002: XSS Prevention
**Requirement**: Prevent cross-site scripting through user inputs

**Measures**:
- HTML escaping for all displayed user content
- URL validation for external links
- Content Security Policy compliance
- Safe handling of decoded ZIP data

## Migration Requirements  

### MR-001: Backward Compatibility
**Requirement**: Existing share URLs must continue functioning

**Support**:
- Current `/?zip=...` URLs work unchanged
- Bookmarked category routes redirect gracefully  
- Error messages guide users to create mode
- Existing encoded collections decode properly

### MR-002: User Communication
**Requirement**: Users must understand the transition to custom-only collections

**Communication**:
- Clear messaging about removed predefined collections
- Onboarding guidance in create mode
- Help text explaining the two-state system
- Examples and templates for new users

## Success Criteria

### User Experience Success
- Users can create custom wheels within 2 minutes
- Share URL generation succeeds >99% of the time
- Wheel loading from shared URLs succeeds >95% of the time
- User task completion rates match or exceed current system

### Technical Success
- Bundle size reduction of at least 10% from collection removal
- Zero regressions in wheel functionality
- Test coverage maintained above 80%
- Page load performance improved by removing unused routes

Ground refs: decisions | glossary

Ground links:
- .ground/decisions.md
- .ground/glossary.md
- .ground/code-map.md