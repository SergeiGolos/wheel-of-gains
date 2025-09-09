# MD-Based Child Pages Design

## Purpose
Create a system for pre-canned workout dialogues where visiting `/workout-name` automatically populates the markdown text box with predefined content, enabling users to have curated workout collections accessible via direct URLs.

## Inputs
- Markdown files containing workout definitions
- Qwik City routing system
- Existing workout parsing logic
- Current main page component structure

## Outputs
- Dynamic route structure in `src/routes/[name]/index.tsx`
- Content directory structure for markdown files
- Static data loading system
- Pre-populated text box functionality
- Updated navigation and discovery system

## Qwik City Structure Plan

### 1. Route Architecture
```
src/routes/
├── index.tsx                    # Main page (current)
├── [name]/
│   ├── index.tsx               # Dynamic workout page
│   └── layout.tsx              # Optional shared layout
└── layout.tsx                  # Root layout (if needed)
```

### 2. Content Organization
```
content/
├── workouts/
│   ├── beginner-basics.md      # Accessible at /beginner-basics
│   ├── cardio-blast.md         # Accessible at /cardio-blast
│   ├── strength-starter.md     # Accessible at /strength-starter
│   └── custom-hiit.md          # Accessible at /custom-hiit
└── index.ts                    # Content registry/manifest
```

### 3. Static Data Loading Strategy

Using Qwik City's `routeLoader$` to:
- Load markdown content at build time (SSG)
- Parse frontmatter for metadata (title, description, tags)
- Return structured workout data
- Handle 404s for non-existent content

### 4. Component Integration

Extend existing main page logic to:
- Accept pre-populated description via route data
- Maintain all current functionality (wheel, spinning, etc.)
- Add breadcrumbs/navigation for child pages
- Share URL generation for child pages

## Technical Implementation Details

### Markdown File Format
```markdown
---
title: "Beginner Basics"
description: "Perfect for fitness newcomers"
category: "beginner"
difficulty: 1
tags: ["beginner", "full-body", "equipment-free"]
---

# Beginner Basics Workout

Perfect starter exercises for fitness newcomers:

- Push-ups (modified): 8-12 reps
- Bodyweight squats: 10-15 reps  
- Plank: 20-30 seconds
- Wall sit: 15-30 seconds
- Jumping jacks: 30 seconds
- Rest: 60 seconds
```

### Route Loader Implementation
```typescript
export const useWorkoutData = routeLoader$(async (requestEvent) => {
  const name = requestEvent.params.name;
  const content = await loadWorkoutContent(name);
  
  if (!content) {
    throw requestEvent.error(404, "Workout not found");
  }
  
  return {
    name,
    title: content.frontmatter.title,
    description: content.frontmatter.description,
    markdown: content.body,
    metadata: content.frontmatter
  };
});
```

### Content Loading System
```typescript
// utils/content-loader.ts
export interface WorkoutContent {
  frontmatter: {
    title: string;
    description?: string;
    category?: string;
    difficulty?: number;
    tags?: string[];
  };
  body: string;
}

export async function loadWorkoutContent(name: string): Promise<WorkoutContent | null> {
  // Implementation will use static imports for build-time loading
  // with dynamic imports as fallback
}
```

## Procedure

### Step 1: Create Content Infrastructure
- Create `content/workouts/` directory
- Add initial markdown files with frontmatter
- Create content loader utility
- Set up build-time content processing

### Step 2: Implement Dynamic Routing
- Create `src/routes/[name]/index.tsx` 
- Implement `routeLoader$` for content loading
- Handle 404 cases gracefully
- Add proper TypeScript interfaces

### Step 3: Integrate with Existing Component
- Modify main component to accept pre-populated data
- Ensure wheel functionality works identically
- Maintain URL sharing and encoding features
- Add navigation between main and child pages

### Step 4: Enhanced Discovery
- Create workout directory/index page
- Add navigation components
- Implement search/filtering
- Add sharing capabilities for child pages

### Step 5: Static Generation Optimization
- Ensure all routes are statically generated
- Optimize markdown parsing performance
- Add build-time validation
- Test deployment with GitHub Pages

## Acceptance Criteria

### Core Functionality
- [ ] Visiting `/workout-name` loads with pre-populated text box
- [ ] All existing wheel functionality works on child pages
- [ ] Content is loaded at build time (SSG compatible)
- [ ] 404 handling for non-existent workout names
- [ ] URL sharing works for child pages

### Content Management
- [ ] Markdown files with frontmatter support
- [ ] Easy addition of new workout content
- [ ] Content validation during build
- [ ] Proper TypeScript types for all content

### User Experience
- [ ] Navigation between main page and child pages
- [ ] Breadcrumbs or clear page context
- [ ] Consistent UI/UX with main page
- [ ] Mobile-optimized layout
- [ ] Loading states handled gracefully

### Technical Requirements
- [ ] Works with static site generation
- [ ] No runtime content loading dependencies
- [ ] Proper SEO metadata for each page
- [ ] Accessible navigation and content structure
- [ ] Performance maintained from main page

## Hand-off

Next task will receive:
- Fully functional dynamic routing system
- Content management infrastructure  
- Example workout content files
- Documentation for adding new workouts
- Integration with existing wheel functionality
- Static generation configuration

This foundation will enable easy addition of new workout content and provide a scalable system for pre-canned workout dialogues.