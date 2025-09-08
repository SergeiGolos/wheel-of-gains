/**
 * Utility functions for parsing markdown-based workout collections
 * Supports text and links with optional multipliers using |number syntax
 */

import type { Workout } from './workout-utils';

export interface MarkdownWorkoutCollection {
  id: string;
  title: string;
  description: string;
  markdown: string;
}

export interface ParsedWorkout {
  id: string;
  name: string;
  url: string;
  multiplier: number;
}

/**
 * Parse a markdown string into workout objects
 * Supports:
 * - Plain text: "Workout Name"
 * - Text with multiplier: "Workout Name|3"
 * - Markdown links: "[Link Text](url)"
 * - Markdown links with multiplier: "[Link Text](url)|2"
 */
export function parseMarkdownWorkouts(markdown: string): ParsedWorkout[] {
  console.log("📝 Parsing markdown workouts from:", markdown.length, "characters");

  const lines = markdown.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  console.log("📋 Found", lines.length, "non-empty lines");

  const workouts: ParsedWorkout[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(`🔍 Parsing line ${i + 1}: "${line}"`);

    try {
      const workout = parseWorkoutLine(line, i);
      if (workout) {
        workouts.push(workout);
        console.log(`✅ Parsed workout: ${workout.name} (x${workout.multiplier})`);
      }
    } catch (error) {
      console.error(`❌ Failed to parse line ${i + 1}: "${line}"`, error);
    }
  }

  console.log(`🎯 Successfully parsed ${workouts.length} workouts from ${lines.length} lines`);
  return workouts;
}

/**
 * Parse workouts from a description string that contains embedded workouts
 * This is used for the simplified format where workouts are embedded in descriptions
 */
export function parseWorkoutsFromDescription(description: string): ParsedWorkout[] {
  console.log("📝 Parsing workouts from description:", description.length, "characters");

  const lines = description.split('\n');
  const workoutLines: string[] = [];

  // Find the workout section (typically after a double newline or specific patterns)
  let foundWorkoutSection = false;
  let emptyLineCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Count empty lines
    if (!line) {
      emptyLineCount++;
      continue;
    }

    // Look for workout section indicators - made more permissive for single entries
    if (!foundWorkoutSection) {
      // Always consider the first non-empty line as start of workout section for now
      foundWorkoutSection = true;
    }

    // Reset empty line count when we find content
    emptyLineCount = 0;

    if (foundWorkoutSection && line && !line.startsWith('#') && !line.startsWith('//')) {
      workoutLines.push(line);
    }
  }

  console.log("📋 Found", workoutLines.length, "workout lines");

  const workouts: ParsedWorkout[] = [];

  for (let i = 0; i < workoutLines.length; i++) {
    const line = workoutLines[i];
    console.log(`🔍 Parsing workout line ${i + 1}: "${line}"`);

    try {
      const workout = parseWorkoutLine(line, i);
      if (workout) {
        workouts.push(workout);
        console.log(`✅ Parsed workout: ${workout.name} (x${workout.multiplier})`);
      }
    } catch (error) {
      console.error(`❌ Failed to parse workout line ${i + 1}: "${line}"`, error);
    }
  }

  console.log(`🎯 Successfully parsed ${workouts.length} workouts from description`);
  return workouts;
}

/**
 * Parse a single line of markdown into a workout object
 */
function parseWorkoutLine(line: string, index: number): ParsedWorkout | null {
  // Skip empty lines or comments
  if (!line || line.startsWith('#') || line.startsWith('//')) {
    return null;
  }

  // Check if line contains a multiplier (|)
  const pipeIndex = line.lastIndexOf('|');
  let multiplier = 1;
  let content = line;

  if (pipeIndex > 0) {
    const multiplierPart = line.substring(pipeIndex + 1).trim();
    const parsedMultiplier = parseFloat(multiplierPart);

    if (!isNaN(parsedMultiplier) && parsedMultiplier > 0) {
      multiplier = parsedMultiplier;
      content = line.substring(0, pipeIndex).trim();
      console.log(`🔢 Found multiplier: ${multiplier} for content: "${content}"`);
    }
  }

  // Parse markdown link format: [text](url)
  const linkMatch = content.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (linkMatch) {
    const [, text, url] = linkMatch;
    return {
      id: `workout-${index}`,
      name: text,
      url: url,
      multiplier: multiplier
    };
  }

  // Plain text workout
  if (content.length > 0) {
    // Generate a URL-friendly slug for plain text workouts
    const slug = content.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();

    return {
      id: `workout-${index}`,
      name: content,
      url: `https://www.google.com/search?q=${encodeURIComponent(slug)}+workout`,
      multiplier: multiplier
    };
  }

  return null;
}

/**
 * Convert markdown collection to the standard workout collection format
 */
export function convertMarkdownToWorkoutCollection(
  markdownCollection: MarkdownWorkoutCollection
): Workout[] {
  console.log("🔄 Converting markdown collection:", markdownCollection.title);

  const parsedWorkouts = parseMarkdownWorkouts(markdownCollection.markdown);

  const defaultCategory = {
    id: markdownCollection.id,
    name: markdownCollection.title,
    color: '#3b82f6' // Default blue color
  };

  const workouts: Workout[] = parsedWorkouts.map(workout => ({
    ...workout,
    category: defaultCategory
  }));

  console.log(`✅ Converted ${workouts.length} workouts for collection: ${markdownCollection.title}`);
  return workouts;
}

/**
 * Load markdown collection from a markdown file content
 */
export function loadMarkdownCollection(content: string, id: string): MarkdownWorkoutCollection {
  console.log("📖 Loading markdown collection:", id);

  const lines = content.split('\n');
  let title = id;
  let description = '';
  let markdown = '';

  let inFrontmatter = false;
  let inMarkdown = false;

  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      if (!inFrontmatter) {
        inMarkdown = true;
      }
      continue;
    }

    if (inFrontmatter) {
      if (line.startsWith('title:')) {
        title = line.substring(6).trim();
      } else if (line.startsWith('description:')) {
        description = line.substring(12).trim();
      }
    } else if (inMarkdown) {
      markdown += line + '\n';
    }
  }

  // If no frontmatter, treat the whole content as markdown
  if (!inMarkdown) {
    markdown = content;
  }

  console.log(`📋 Loaded collection: "${title}" with ${markdown.split('\n').filter(l => l.trim()).length} workout lines`);

  return {
    id,
    title,
    description,
    markdown: markdown.trim()
  };
}

/**
 * Convert legacy JSON collection format to simplified description-embedded format
 */
export function convertLegacyCollection(legacyCollection: any): { id: string; title: string; description: string } {
  console.log("🔄 Converting legacy collection:", legacyCollection.title);

  if (!legacyCollection.workouts || !Array.isArray(legacyCollection.workouts)) {
    console.log("⚠️ No workouts array found, returning as-is");
    return {
      id: legacyCollection.id,
      title: legacyCollection.title,
      description: legacyCollection.description
    };
  }

  // Convert workouts array to markdown lines
  const workoutLines = legacyCollection.workouts.map((workout: string) => {
    // Try to extract multiplier from workout name (e.g., "ABC x3" -> "ABC x3|3")
    const multiplierMatch = workout.match(/x(\d+(?:\.\d+)?)$/);
    if (multiplierMatch) {
      const baseName = workout.replace(/ x\d+(?:\.\d+)?$/, '');
      return `${baseName}|${multiplierMatch[1]}`;
    }
    return workout;
  });

  const embeddedWorkouts = workoutLines.join('\n');
  const newDescription = `${legacyCollection.description}\n\n${embeddedWorkouts}`;

  console.log(`✅ Converted ${legacyCollection.workouts.length} workouts to embedded format`);

  return {
    id: legacyCollection.id,
    title: legacyCollection.title,
    description: newDescription
  };
}
