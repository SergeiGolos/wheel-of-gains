import { useSignal, $, useVisibleTask$, useStore } from "@builder.io/qwik";
import type { Workout } from "../../../utils/workout-utils";

/**
 * Custom hook for tracking changes to workouts
 * Following Qwik best practices: using useStore for reactive state management
 */
export const useWorkoutChangeTracking = (workouts: Workout[]) => {
  // Use useStore for reactive state management as recommended by Qwik rules
  const state = useStore({
    originalWorkouts: [] as Workout[],
    isInitialized: false,
  });

  const hasUnsavedChanges = useSignal(false);

  // Helper function to check if workouts have changed
  const checkForChanges = $(() => {
    if (!state.isInitialized || state.originalWorkouts.length === 0) {
      hasUnsavedChanges.value = false;
      return;
    }

    // Inline signature creation to avoid lexical scope issues
    const currentSignature = workouts
      .map((w) => `${w.id}:${w.name}:${w.multiplier}:${w.category.id}`)
      .sort()
      .join("|");
    const originalSignature = state.originalWorkouts
      .map((w) => `${w.id}:${w.name}:${w.multiplier}:${w.category.id}`)
      .sort()
      .join("|");

    const hasChanges = currentSignature !== originalSignature;
    hasUnsavedChanges.value = hasChanges;
  });

  // Initialize original workouts and track changes using Qwik's reactive system
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // Track the workouts array and specific properties that matter for change detection
    track(() => workouts.length);
    track(() => workouts.map((w) => w.multiplier).join(","));
    track(() => workouts.map((w) => w.id).join(","));

    // Initialize original workouts on first mount when we have data
    if (!state.isInitialized && workouts.length > 0) {
      // Deep clone the workouts to avoid reference issues
      state.originalWorkouts = workouts.map((w) => ({
        ...w,
        category: { ...w.category },
      }));
      state.isInitialized = true;
      hasUnsavedChanges.value = false;
      return;
    }

    // Check for changes when workouts change
    if (state.isInitialized) {
      checkForChanges();
    }
  });

  // Reset changes flag and update original workouts
  const markAsSaved = $(() => {
    if (workouts.length > 0) {
      state.originalWorkouts = workouts.map((w) => ({
        ...w,
        category: { ...w.category },
      }));
    }
    hasUnsavedChanges.value = false;
  });

  return {
    originalWorkouts: state.originalWorkouts,
    hasUnsavedChanges,
    checkForChanges,
    markAsSaved,
  };
};
