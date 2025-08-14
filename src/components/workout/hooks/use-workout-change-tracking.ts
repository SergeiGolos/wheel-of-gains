import { useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { Workout } from "../../../utils/workout-utils";

/**
 * Custom hook for tracking changes to workouts
 */
export const useWorkoutChangeTracking = (workouts: Workout[]) => {
  const originalWorkouts = useSignal<Workout[]>([...workouts]);
  const hasUnsavedChanges = useSignal(false);

  // Helper function to check if workouts have changed
  const checkForChanges = $(() => {
    const currentSerialized = JSON.stringify(
      workouts.map((w) => ({
        id: w.id,
        name: w.name,
        url: w.url,
        multiplier: w.multiplier,
        category: w.category,
      })),
    );
    const originalSerialized = JSON.stringify(
      originalWorkouts.value.map((w) => ({
        id: w.id,
        name: w.name,
        url: w.url,
        multiplier: w.multiplier,
        category: w.category,
      })),
    );
    hasUnsavedChanges.value = currentSerialized !== originalSerialized;
  });

  // Initialize original workouts and track changes
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => workouts.length);
    track(() => workouts);

    // Initialize original workouts on first load
    if (originalWorkouts.value.length === 0) {
      originalWorkouts.value = [...workouts];
    }

    // Check for changes whenever workouts change
    checkForChanges();
  });

  // Reset changes flag
  const markAsSaved = $(() => {
    hasUnsavedChanges.value = false;
  });

  return {
    originalWorkouts: originalWorkouts.value,
    hasUnsavedChanges,
    checkForChanges,
    markAsSaved,
  };
};
