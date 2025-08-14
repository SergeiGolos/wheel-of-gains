import { component$, $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import {
  DEFAULT_CATEGORIES,
  createWorkoutUrl,
} from "../../utils/workout-utils";
import { useWorkoutForm } from "./hooks/use-workout-form";
import { useWorkoutChangeTracking } from "./hooks/use-workout-change-tracking";
import { NewWorkoutForm } from "./components/new-workout-form";
import { WorkoutListItem } from "./components/workout-list-item";
import { ActionButtons } from "./components/action-buttons";
import { ValidationErrors } from "./components/validation-errors";
import {
  validateNewWorkoutForm,
  correctMultiplier,
} from "./utils/workout-validation";

interface WorkoutManagerProps {
  workouts: Workout[];
  setWorkouts: QRL<(workouts: Workout[]) => void>;
  onDone?: QRL<() => void>;
}

export const WorkoutManager = component$<WorkoutManagerProps>(
  ({ workouts, setWorkouts, onDone }) => {
    // Use custom hooks for state management
    const workoutForm = useWorkoutForm();
    const changeTracking = useWorkoutChangeTracking(workouts);

    // Additional state that wasn't moved to hooks
    const invalidMultipliers = useSignal(new Set<string>());

    // Save new workout
    const saveNewWorkout = $(() => {
      const name = workoutForm.newWorkoutName.value.trim();
      const url = workoutForm.newWorkoutUrl.value.trim();
      const rawMultiplier = workoutForm.newWorkoutMultiplier.value || 1;
      const multiplier = Math.max(1, Math.floor(rawMultiplier)); // Auto-correct when saving
      const categoryId = workoutForm.newWorkoutCategory.value;
      const category =
        DEFAULT_CATEGORIES.find((cat) => cat.id === categoryId) ||
        DEFAULT_CATEGORIES[0];

      const validation = validateNewWorkoutForm(name, rawMultiplier, workouts);

      if (!validation.isValid) {
        workoutForm.showValidationErrors.value = true;
        workoutForm.nameError.value = validation.errors.name;
        workoutForm.multiplierError.value = validation.errors.multiplier;
        return;
      }

      // If URL is empty, auto-generate Google search URL
      const finalUrl = url || createWorkoutUrl(name);

      setWorkouts([
        ...workouts,
        {
          id: crypto.randomUUID(),
          name,
          url: finalUrl,
          multiplier,
          category,
        },
      ]);

      // Reset form after successful save
      workoutForm.cancelNewWorkout();
    });

    const handleSave = $(() => {
      if (onDone) {
        onDone();
      }
    });

    const handleCancel = $(() => {
      // Revert to original workouts
      setWorkouts([...changeTracking.originalWorkouts]);
      changeTracking.markAsSaved();

      // Cancel any pending new workout
      workoutForm.cancelNewWorkout();

      if (onDone) {
        onDone();
      }
    });

    const deleteWorkout = $((id: string) => {
      setWorkouts(workouts.filter((w) => w.id !== id));
    });

    const updateWorkoutMultiplier = $((id: string, value: string) => {
      const numValue = parseInt(value, 10);
      const correctedValue = correctMultiplier(numValue);
      const isValid = numValue >= 1 && !isNaN(numValue);

      // Update validation state for visual feedback
      const currentInvalid = new Set(invalidMultipliers.value);
      if (!isValid) {
        currentInvalid.add(id);
      } else {
        currentInvalid.delete(id);
      }
      invalidMultipliers.value = currentInvalid;

      // Update immediately with corrected value
      const updatedWorkouts = workouts.map((w) =>
        w.id === id ? { ...w, multiplier: correctedValue } : w,
      );
      setWorkouts(updatedWorkouts);

      // Explicitly trigger change detection
      setTimeout(() => changeTracking.checkForChanges(), 0);

      // Clear validation error after a short delay if the value was corrected
      if (!isValid) {
        setTimeout(() => {
          const newInvalid = new Set(invalidMultipliers.value);
          newInvalid.delete(id);
          invalidMultipliers.value = newInvalid;
        }, 1000); // Show red outline for 1 second
      }
    });

    return (
      <section
        class="flex flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4"
        aria-labelledby="arsenal-heading"
      >
        {/* Header */}
        <div class="mb-3">
          <h2 id="arsenal-heading" class="text-lg font-semibold text-slate-700">
            Manage Your Workout Arsenal ({workouts.length})
          </h2>
          <p class="text-sm text-slate-600">
            Click on multiplier values to adjust how often they appear in the
            wheel
          </p>
        </div>

        {/* Validation Errors */}
        <ValidationErrors
          show={workoutForm.showValidationErrors.value}
          errors={
            [
              workoutForm.nameError.value && "Workout name is required",
              workoutForm.multiplierError.value &&
                "Multiplier must be at least 1",
            ].filter(Boolean) as string[]
          }
        />

        {/* Table */}
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-slate-50">
                <th class="border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700">
                  Category
                </th>
                <th class="border border-slate-200 px-3 py-2 text-left text-xs font-medium text-slate-700">
                  Workout
                </th>
                <th class="border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-700">
                  Multiplier
                </th>
                <th class="border border-slate-200 px-3 py-2 text-center text-xs font-medium text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {workoutForm.isAddingNew.value ? (
                <NewWorkoutForm
                  newWorkoutName={workoutForm.newWorkoutName.value}
                  newWorkoutUrl={workoutForm.newWorkoutUrl.value}
                  newWorkoutMultiplier={workoutForm.newWorkoutMultiplier.value}
                  newWorkoutCategory={workoutForm.newWorkoutCategory.value}
                  nameError={workoutForm.nameError.value}
                  multiplierError={workoutForm.multiplierError.value}
                  showValidationErrors={workoutForm.showValidationErrors.value}
                  workouts={workouts}
                  onNameChange={workoutForm.handleNameChange}
                  onUrlChange={$((value: string) => {
                    workoutForm.newWorkoutUrl.value = value;
                  })}
                  onMultiplierChange={workoutForm.handleMultiplierChange}
                  onCategoryChange={$((value: string) => {
                    workoutForm.newWorkoutCategory.value = value;
                  })}
                  onSave={saveNewWorkout}
                  onCancel={workoutForm.cancelNewWorkout}
                />
              ) : (
                <>
                  {workouts.map((workout) => (
                    <WorkoutListItem
                      key={workout.id}
                      workout={workout}
                      isInvalidMultiplier={invalidMultipliers.value.has(
                        workout.id,
                      )}
                      onMultiplierChange={updateWorkoutMultiplier}
                      onDelete={deleteWorkout}
                    />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          hasUnsavedChanges={changeTracking.hasUnsavedChanges.value}
          onAddNew={workoutForm.startNewWorkout}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </section>
    );
  },
);
