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
    console.log('checkForChanges called:', { 
      current: currentSerialized.substring(0, 200) + '...', 
      original: originalSerialized.substring(0, 200) + '...', 
      equal: currentSerialized === originalSerialized 
    });
    hasUnsavedChanges.value = currentSerialized !== originalSerialized;
    console.log('hasUnsavedChanges set to:', hasUnsavedChanges.value);
  });

  // Initialize original workouts and track changes
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // Track the entire workouts array deeply
    track(() =>
      JSON.stringify(
        workouts.map((w) => ({
          id: w.id,
          multiplier: w.multiplier,
          name: w.name,
          url: w.url,
          category: w.category.id,
        })),
      ),
    );

    // Initialize original workouts ONLY on first load (when length is 0)
    if (originalWorkouts.value.length === 0 && workouts.length > 0) {
      originalWorkouts.value = [...workouts];
      console.log('Original workouts set:', originalWorkouts.value.map(w => ({ id: w.id, multiplier: w.multiplier })));
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
