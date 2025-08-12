// localStorage helper functions
export const STORAGE_KEY = 'wheelOfGains_workouts';
export const STORAGE_VERSION_KEY = 'wheelOfGains_version';
export const CURRENT_VERSION = '1.0';

export interface WorkoutCategory {
  id: string;
  name: string;
  color: string;
}

export interface Workout {
  id: string;
  name: string;
  url: string;
  multiplier: number;
  category: WorkoutCategory;
}

export const saveWorkoutsToStorage = (workouts: Workout[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
  } catch (error) {
    console.warn('Failed to save workouts to localStorage:', error);
  }
};

export const loadWorkoutsFromStorage = (): Workout[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const version = localStorage.getItem(STORAGE_VERSION_KEY);
    
    if (!saved || version !== CURRENT_VERSION) {
      return null;
    }
    
    const workouts = JSON.parse(saved);
    
    // Validate data structure
    if (!Array.isArray(workouts)) {
      return null;
    }
    
    // Validate each workout object
    for (const workout of workouts) {
      if (!workout.id || !workout.name || !workout.url || typeof workout.multiplier !== 'number') {
        return null;
      }
      // Add default category if missing (for backward compatibility)
      if (!workout.category) {
        workout.category = DEFAULT_CATEGORIES[0];
      }
    }
    
    return workouts;
  } catch (error) {
    console.warn('Failed to load workouts from localStorage:', error);
    return null;
  }
};

export const parseWorkoutString = (workoutStr: string) => {
  const multiplierRegex = /\s*x(\d*\.?\d+)\s*$/;
  const match = workoutStr.match(multiplierRegex);
  if (match) {
    const name = workoutStr.replace(multiplierRegex, '').trim();
    const multiplier = Math.round(parseFloat(match[1]));
    return { name, multiplier: Math.max(1, multiplier) };
  }
  return { name: workoutStr.trim(), multiplier: 1 };
};

export const createWorkoutUrl = (name: string) => `https://www.google.com/search?q=${encodeURIComponent(name + ' workout')}`;

// Default categories
export const DEFAULT_CATEGORIES: WorkoutCategory[] = [
  { id: 'strength', name: 'Strength Training', color: '#3b82f6' },
  { id: 'cardio', name: 'Cardio', color: '#ef4444' },
  { id: 'flexibility', name: 'Flexibility', color: '#22c55e' },
  { id: 'sports', name: 'Sports', color: '#f97316' },
  { id: 'recovery', name: 'Recovery', color: '#8b5cf6' },
  { id: 'custom', name: 'Custom', color: '#14b8a6' }
];

const initialWorkoutStrings = [
  "Simple & Sinister", "ABC x3", "AXE Snatch", "AXE KB Swing",
  "Snatch Test x2", "AXE Macebell Touch Down x.5",
  "AXE Macebell Uppercuts x.5", "Deadlift"
];

export const initialMasterWorkouts: Workout[] = initialWorkoutStrings.map(str => {
  const parsed = parseWorkoutString(str);
  // Assign default categories to initial workouts
  const defaultCategory = DEFAULT_CATEGORIES[0]; // Strength Training
  return { 
    id: crypto.randomUUID(), 
    ...parsed, 
    url: createWorkoutUrl(parsed.name),
    category: defaultCategory
  };
});

// Updated color palette for a more classic, bright look
export const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f97316", "#8b5cf6", "#d946ef", "#14b8a6", "#eab308"];