import type { Workout } from "../../../utils/workout-utils";

/**
 * Validates a workout name
 */
export const validateWorkoutName = (name: string): boolean => {
  return name.trim().length > 0;
};

/**
 * Validates a workout multiplier
 */
export const validateMultiplier = (multiplier: number): boolean => {
  return !isNaN(multiplier) && multiplier >= 1;
};

/**
 * Validates if a workout name is unique in the list
 */
export const isWorkoutNameUnique = (name: string, workouts: Workout[], excludeId?: string): boolean => {
  const trimmedName = name.trim().toLowerCase();
  return !workouts.some(w => 
    w.id !== excludeId && 
    w.name.toLowerCase() === trimmedName
  );
};

/**
 * Auto-corrects multiplier value to be valid
 */
export const correctMultiplier = (value: number): number => {
  if (isNaN(value) || value < 1) {
    return 1;
  }
  return Math.max(1, Math.floor(value));
};

/**
 * Validates the complete new workout form
 */
export const validateNewWorkoutForm = (
  name: string,
  multiplier: number,
  workouts: Workout[]
) => {
  const errors = {
    name: false,
    multiplier: false,
    duplicate: false,
  };

  errors.name = !validateWorkoutName(name);
  errors.multiplier = !validateMultiplier(multiplier);
  errors.duplicate = !isWorkoutNameUnique(name, workouts);

  const isValid = !errors.name && !errors.multiplier && !errors.duplicate;

  return {
    isValid,
    errors,
  };
};