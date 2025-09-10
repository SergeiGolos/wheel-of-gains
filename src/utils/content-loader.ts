export interface WorkoutContent {
  frontmatter: {
    title: string;
    description?: string;
    category?: string;
    difficulty?: number;
    tags?: string[];
  };
  body: string;
  slug: string;
}

// Discover markdown workouts at build time and bundle their raw contents.
// This lets us add new workouts without changing code.
const discoveredFiles = import.meta.glob('/content/workouts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Normalize keys to plain slugs (e.g., '/content/workouts/beginner-basics.md' -> 'beginner-basics')
const discoveredContent: Record<string, string> = Object.fromEntries(
  Object.entries(discoveredFiles).map(([filePath, raw]) => {
    const m = filePath.match(/\/content\/workouts\/([^/]+)\.md$/);
    const slug = m ? m[1] : filePath;
    return [slug, raw as string];
  }),
);

// Fallback seed content if none discovered (shouldn't happen in normal builds)
const fallbackContent: Record<string, string> = {
  'beginner-basics': `---
title: "Beginner Basics"
description: "Perfect for fitness newcomers - no equipment needed"
category: "beginner"
difficulty: 1
tags: ["beginner", "full-body", "equipment-free"]
---

# Beginner Basics Workout

Perfect starter exercises for fitness newcomers:

- [Push-ups (modified)](https://www.youtube.com/watch?v=0GsVJsS6474)|2
- [Bodyweight squats](https://www.youtube.com/watch?v=aclHkVaku9U)|3
- [Plank](https://www.youtube.com/watch?v=ASdvN_XEl_c)
- [Wall sit](https://www.youtube.com/watch?v=y-wV4Venusw)
- [Jumping jacks](https://www.youtube.com/watch?v=c4DAnQ6DtF8)|2
- Rest 60 seconds
`,
};

const staticContent: Record<string, string> =
  Object.keys(discoveredContent).length > 0 ? discoveredContent : fallbackContent;

// Available workout slugs for static generation
export const AVAILABLE_WORKOUTS = Object.keys(staticContent);

/**
 * Parse frontmatter and content from markdown file
 */
function parseMarkdown(content: string): { frontmatter: Record<string, any>; body: string } {
  const lines = content.split('\n');
  
  if (lines[0] !== '---') {
    return { frontmatter: {}, body: content };
  }

  let frontmatterEndIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      frontmatterEndIndex = i;
      break;
    }
  }

  if (frontmatterEndIndex === -1) {
    return { frontmatter: {}, body: content };
  }

  // Parse simple YAML frontmatter
  const frontmatter: Record<string, any> = {};
  const frontmatterLines = lines.slice(1, frontmatterEndIndex);
  
  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes and parse basic types
      let parsedValue: any = value.replace(/^["']|["']$/g, '');
      
      // Handle arrays
      if (parsedValue.startsWith('[') && parsedValue.endsWith(']')) {
        try {
          parsedValue = JSON.parse(parsedValue);
        } catch {
          // Keep as string if parsing fails
        }
      }
      // Handle numbers
      else if (!isNaN(Number(parsedValue))) {
        parsedValue = Number(parsedValue);
      }
      
      frontmatter[key] = parsedValue;
    }
  }

  const body = lines.slice(frontmatterEndIndex + 1).join('\n');
  return { frontmatter, body };
}

/**
 * Load workout content by slug
 */
export async function loadWorkoutContent(slug: string): Promise<WorkoutContent | null> {
  const content = staticContent[slug];
  if (!content) {
    return null;
  }

  try {
    const { frontmatter, body } = parseMarkdown(content);
    
    return {
      frontmatter: {
        title: frontmatter.title || slug,
        description: frontmatter.description,
        category: frontmatter.category,
        difficulty: frontmatter.difficulty,
        tags: frontmatter.tags,
      },
      body: body.trim(),
      slug,
    };
  } catch (error) {
    console.error(`Failed to parse workout content: ${slug}`, error);
    return null;
  }
}

/**
 * Load all available workout content
 */
export async function loadAllWorkouts(): Promise<WorkoutContent[]> {
  const results = await Promise.allSettled(
    AVAILABLE_WORKOUTS.map(slug => loadWorkoutContent(slug))
  );
  
  return results
    .filter((result): result is PromiseFulfilledResult<WorkoutContent> => 
      result.status === 'fulfilled' && result.value !== null
    )
    .map(result => result.value);
}