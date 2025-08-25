import {
  parseWorkoutString,
  createWorkoutUrl,
  DEFAULT_CATEGORIES,
  type Workout,
} from "./workout-utils";

export interface WorkoutCollectionData {
  id: string;
  title: string;
  description: string;
  workouts: string[];
}

export interface WorkoutCollectionMeta {
  title: string;
  description: string;
  category: string;
  file: string;
}

export interface CollectionIndex {
  collections: Record<string, WorkoutCollectionMeta>;
}

/**
 * Load a workout collection by ID from JSON data
 */
export async function loadWorkoutCollection(
  id: string,
): Promise<{
  id: string;
  title: string;
  description: string;
  workouts: Workout[];
} | null> {
  try {
    // Create absolute URL for server-side and client-side compatibility
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:5173'; // Default for SSR development
    
    const url = `${baseUrl}/wheel-of-gains/data/collections/${id}.json`;
    
    // Load the collection data from JSON
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Collection ${id} not found`);
      return null;
    }

    const collectionData: WorkoutCollectionData = await response.json();

    // Convert workout strings to Workout objects
    const workouts: Workout[] = collectionData.workouts.map((str, index) => {
      const parsed = parseWorkoutString(str);
      const category = collectionData.id === "cardio" || collectionData.id === "intermediate" 
        ? DEFAULT_CATEGORIES[1] // Cardio category
        : DEFAULT_CATEGORIES[0]; // Strength category

      return {
        id: `workout-${Date.now()}-${index}`,
        ...parsed,
        url: createWorkoutUrl(parsed.name),
        category,
      };
    });

    return {
      id: collectionData.id,
      title: collectionData.title,
      description: collectionData.description,
      workouts,
    };
  } catch (error) {
    console.error(`Failed to load workout collection ${id}:`, error);
    return null;
  }
}

/**
 * Load the collection index to get available collections
 */
export async function loadCollectionIndex(): Promise<CollectionIndex | null> {
  try {
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:5173'; // Default for SSR development
    
    const url = `${baseUrl}/wheel-of-gains/data/collections/index.json`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn("Collection index not found");
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to load collection index:", error);
    return null;
  }
}

/**
 * Get available collection IDs
 */
export async function getAvailableCollections(): Promise<string[]> {
  const index = await loadCollectionIndex();
  return index ? Object.keys(index.collections) : [];
}