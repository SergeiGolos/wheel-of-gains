import { useSignal, $ } from "@builder.io/qwik";
import { DEFAULT_CATEGORIES } from "../../../utils/workout-utils";

/**
 * Custom hook for managing new workout form state and validation
 */
export const useWorkoutForm = () => {
  // Form state
  const isAddingNew = useSignal(false);
  const newWorkoutName = useSignal("");
  const newWorkoutUrl = useSignal("");
  const newWorkoutMultiplier = useSignal(1);
  const newWorkoutCategory = useSignal(DEFAULT_CATEGORIES[0].id);

  // Validation state
  const nameError = useSignal(false);
  const multiplierError = useSignal(false);
  const showValidationErrors = useSignal(false);

  // Reset form to initial state
  const resetForm = $(() => {
    newWorkoutName.value = "";
    newWorkoutUrl.value = "";
    newWorkoutMultiplier.value = 1;
    newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
    nameError.value = false;
    multiplierError.value = false;
    showValidationErrors.value = false;
  });

  // Start new workout form
  const startNewWorkout = $(() => {
    isAddingNew.value = true;
    resetForm();
  });

  // Cancel new workout form
  const cancelNewWorkout = $(() => {
    isAddingNew.value = false;
    resetForm();
  });

  // Validation handlers
  const handleNameChange = $((value: string) => {
    newWorkoutName.value = value;
    if (showValidationErrors.value) {
      nameError.value = value.trim().length === 0;
    }
  });

  const handleMultiplierChange = $((value: string) => {
    const numValue = parseInt(value, 10);
    // Allow invalid values to be stored for validation feedback
    newWorkoutMultiplier.value = isNaN(numValue) ? 0 : numValue;
    if (showValidationErrors.value) {
      multiplierError.value = isNaN(numValue) || numValue < 1;
    }
  });

  return {
    // State
    isAddingNew,
    newWorkoutName,
    newWorkoutUrl,
    newWorkoutMultiplier,
    newWorkoutCategory,
    nameError,
    multiplierError,
    showValidationErrors,

    // Actions
    startNewWorkout,
    cancelNewWorkout,
    resetForm,
    handleNameChange,
    handleMultiplierChange,
  };
};
