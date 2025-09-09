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

// Static content map - we'll embed the content directly to avoid import issues
const staticContent: Record<string, string> = {
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

// This is a beginner-friendly collection focusing on basic bodyweight movements
// Each exercise includes a helpful video demonstration
// Multipliers ensure more common exercises appear more frequently on the wheel`,

  'cardio-blast': `---
title: "Cardio Blast"
description: "High-intensity cardio workouts to get your heart pumping"
category: "cardio"
difficulty: 3
tags: ["cardio", "hiit", "fat-burn", "equipment-free"]
---

# Cardio Blast Workout

High-intensity exercises to boost your cardiovascular fitness:

- [Burpees](https://www.youtube.com/watch?v=auBLPXO8Fww)|3
- [Mountain climbers](https://www.youtube.com/watch?v=kLh-uczlPLg)|2
- [Jump rope (no rope)](https://www.youtube.com/watch?v=hCuXYrTOMxI)|2
- [High knees](https://www.youtube.com/watch?v=8opcQdC-V-U)
- [Squat jumps](https://www.youtube.com/watch?v=CVaEhXotL7M)|2
- [Sprint in place](https://www.youtube.com/watch?v=8RcqzllYk5g)
- Rest 30 seconds

// Intense cardio session designed to maximize calorie burn
// Keep water nearby and take breaks as needed
// Progress by reducing rest periods or increasing intensity`,

  'strength-starter': `---
title: "Strength Starter"
description: "Build foundational strength with bodyweight exercises"
category: "strength"
difficulty: 2
tags: ["strength", "bodyweight", "muscle-building", "beginner-intermediate"]
---

# Strength Starter Workout

Build functional strength with these foundational exercises:

- [Push-ups](https://www.youtube.com/watch?v=IODxDxX7oi4)|3
- [Pike push-ups](https://www.youtube.com/watch?v=x6ELuKwOcVs)|2
- [Bodyweight rows](https://www.youtube.com/search?q=bodyweight+rows)
- [Single leg squats](https://www.youtube.com/watch?v=t7Oj8-8Htyw)
- [Dips (chair/couch)](https://www.youtube.com/watch?v=0326dy_-CzM)|2
- [Glute bridges](https://www.youtube.com/watch?v=OUgsJ8-Vi0E)|2
- [Dead bug](https://www.youtube.com/watch?v=hx6MIKZlQQI)
- Rest 45 seconds

// Focus on proper form over speed
// Progress by slowing down the movements or adding reps
// Great for building foundational strength patterns`,

  'custom-hiit': `---
title: "Custom HIIT"
description: "High-intensity interval training for maximum efficiency"
category: "hiit"
difficulty: 4
tags: ["hiit", "advanced", "time-efficient", "fat-burn", "conditioning"]
---

# Custom HIIT Workout

Efficient high-intensity interval training session:

- [Burpee to tuck jump](https://www.youtube.com/watch?v=TU8kQYLg8P8)|4
- [Plank to downward dog](https://www.youtube.com/watch?v=kPczsbCpOiQ)|2
- [Jump lunges](https://www.youtube.com/watch?v=cd3P2pVMuWE)|3
- [Bear crawls](https://www.youtube.com/watch?v=mLGiQuVh3w4)
- [180-degree squat jumps](https://www.youtube.com/search?q=180+degree+squat+jumps)|2
- [Turkish get-up](https://www.youtube.com/watch?v=0bWRPC49-KI)
- [V-ups](https://www.youtube.com/watch?v=7UVgs18Y1P4)|2
- Rest 20 seconds

// Advanced HIIT protocol - work at maximum intensity
// Maintain perfect form even when fatigued  
// Scale exercises to your fitness level
// 20 seconds on, 20 seconds rest recommended intervals`
};

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