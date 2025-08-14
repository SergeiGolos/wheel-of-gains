import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import {
  DEFAULT_CATEGORIES,
  createWorkoutUrl,
} from "../../utils/workout-utils";
import { CategoryBadge } from "../ui/category-badge";

interface WorkoutManagerProps {
  workouts: Workout[];
  setWorkouts: QRL<(workouts: Workout[]) => void>;
  onDone?: QRL<() => void>;
}

export const WorkoutManager = component$<WorkoutManagerProps>(
  ({ workouts, setWorkouts, onDone }) => {
    const isAddingNew = useSignal(false);
    const newWorkoutName = useSignal("");
    const newWorkoutUrl = useSignal("");
    const newWorkoutMultiplier = useSignal(1);
    const newWorkoutCategory = useSignal(DEFAULT_CATEGORIES[0].id);

    // Change tracking state
    const originalWorkouts = useSignal<Workout[]>([...workouts]);
    const hasUnsavedChanges = useSignal(false);

    // Validation state
    const nameError = useSignal(false);
    const multiplierError = useSignal(false);
    const showValidationErrors = useSignal(false);
    const invalidMultipliers = useSignal(new Set<string>());

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

    const addNewRow = $(() => {
      isAddingNew.value = true;
      newWorkoutName.value = "";
      newWorkoutUrl.value = "";
      newWorkoutMultiplier.value = 1;
      newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
      // Reset validation state
      nameError.value = false;
      multiplierError.value = false;
      showValidationErrors.value = false;
    });

    const saveNewWorkout = $(() => {
      const name = newWorkoutName.value.trim();
      const url = newWorkoutUrl.value.trim();
      const rawMultiplier = newWorkoutMultiplier.value || 1;
      const multiplier = Math.max(1, Math.floor(rawMultiplier)); // Auto-correct when saving
      const categoryId = newWorkoutCategory.value;
      const category =
        DEFAULT_CATEGORIES.find((cat) => cat.id === categoryId) ||
        DEFAULT_CATEGORIES[0];

      // Validate inputs
      const isNameValid = name.length > 0;
      const isMultiplierValid = rawMultiplier >= 1;

      nameError.value = !isNameValid;
      multiplierError.value = !isMultiplierValid;

      // Show validation errors if any field is invalid
      if (!isNameValid || !isMultiplierValid) {
        showValidationErrors.value = true;
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

      // Check for changes after adding new workout
      checkForChanges();

      // Reset form and validation state
      isAddingNew.value = false;
      newWorkoutName.value = "";
      newWorkoutUrl.value = "";
      newWorkoutMultiplier.value = 1;
      newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
      nameError.value = false;
      multiplierError.value = false;
      showValidationErrors.value = false;
    });

    const cancelNewWorkout = $(() => {
      isAddingNew.value = false;
      newWorkoutName.value = "";
      newWorkoutUrl.value = "";
      newWorkoutMultiplier.value = 1;
      newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
      // Reset validation state
      nameError.value = false;
      multiplierError.value = false;
      showValidationErrors.value = false;
    });

    const handleSave = $(() => {
      if (onDone) {
        onDone();
      }
    });

    const handleCancel = $(() => {
      // Revert to original workouts
      setWorkouts([...originalWorkouts.value]);
      hasUnsavedChanges.value = false;

      // Cancel any pending new workout
      isAddingNew.value = false;
      newWorkoutName.value = "";
      newWorkoutUrl.value = "";
      newWorkoutMultiplier.value = 1;
      newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
      nameError.value = false;
      multiplierError.value = false;
      showValidationErrors.value = false;

      if (onDone) {
        onDone();
      }
    });

    const deleteWorkout = $((id: string) => {
      setWorkouts(workouts.filter((w) => w.id !== id));
      checkForChanges();
    });

    const updateWorkoutMultiplier = $((id: string, newMultiplier: number) => {
      const isValid = newMultiplier >= 1 && !isNaN(newMultiplier);

      // Update validation state for visual feedback
      const currentInvalid = new Set(invalidMultipliers.value);
      if (!isValid) {
        currentInvalid.add(id);
      } else {
        currentInvalid.delete(id);
      }
      invalidMultipliers.value = currentInvalid;

      // Auto-correct the value and update (with slight delay for visual feedback)
      const validMultiplier = Math.max(1, Math.floor(newMultiplier)) || 1;

      // Update immediately but keep the validation state for visual feedback
      setWorkouts(
        workouts.map((w) =>
          w.id === id ? { ...w, multiplier: validMultiplier } : w,
        ),
      );

      // Check for changes after updating
      checkForChanges();

      // Clear validation error after a short delay if the value was corrected
      if (!isValid) {
        setTimeout(() => {
          const newInvalid = new Set(invalidMultipliers.value);
          newInvalid.delete(id);
          invalidMultipliers.value = newInvalid;
        }, 1000); // Show red outline for 1 second
      }
    });

    // Validation handlers for new workout form
    const handleNameChange = $((value: string) => {
      newWorkoutName.value = value;
      if (showValidationErrors.value) {
        nameError.value = value.trim().length === 0;
      }
    });

    const handleMultiplierChange = $((value: string) => {
      const numValue = parseInt(value, 10);
      // Allow invalid values to be stored for validation feedback
      newWorkoutMultiplier.value = numValue || 0;
      if (showValidationErrors.value) {
        multiplierError.value = (numValue || 0) < 1;
      }
    });

    return (
      <section
        class="flex flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4"
        aria-labelledby="arsenal-heading"
      >
        {/* Header */}
        <div class="mb-3">
          <h2
            id="arsenal-heading"
            class="text-lg font-bold tracking-widest text-slate-800 uppercase sm:text-xl"
          >
            Workout Arsenal
          </h2>
        </div>

        {/* Editable Grid */}
        <div class="overflow-x-auto">
          <table class="w-full border-collapse overflow-hidden rounded-lg border border-slate-200">
            <thead class="bg-slate-50">
              <tr>
                <th class="border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">
                  Category
                </th>
                <th class="border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">
                  Workout Name
                </th>
                <th class="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700">
                  Multiplier
                </th>
                <th class="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 && !isAddingNew.value ? (
                <tr>
                  <td
                    colSpan={4}
                    class="border border-slate-200 px-3 py-8 text-center text-slate-500"
                  >
                    <div class="flex flex-col items-center gap-2">
                      <p class="text-sm">Your arsenal is empty.</p>
                      <p class="text-xs text-slate-400">
                        Click "Add New" to create your first workout.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {workouts.map((workout) => (
                    <tr key={workout.id} class="hover:bg-slate-50">
                      <td class="border border-slate-200 px-3 py-2">
                        <CategoryBadge category={workout.category} />
                      </td>
                      <td class="border border-slate-200 px-3 py-2">
                        <div class="font-medium text-slate-700">
                          {workout.name}
                        </div>
                        <div class="truncate text-xs text-slate-500">
                          {workout.url}
                        </div>
                      </td>
                      <td class="border border-slate-200 px-3 py-2 text-center">
                        <div class="flex items-center justify-center gap-1">
                          <span class="text-sm text-slate-600">x</span>
                          <input
                            type="number"
                            value={workout.multiplier}
                            min="1"
                            step="1"
                            onChange$={(e) =>
                              updateWorkoutMultiplier(
                                workout.id,
                                parseInt(
                                  (e.target as HTMLInputElement).value,
                                  10,
                                ),
                              )
                            }
                            class={`w-16 rounded border px-2 py-1 text-center text-sm focus:ring-2 focus:outline-none ${
                              invalidMultipliers.value.has(workout.id)
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:border-slate-500 focus:ring-slate-500"
                            }`}
                            aria-label={`Multiplier for ${workout.name} workout`}
                          />
                        </div>
                      </td>
                      <td class="border border-slate-200 px-3 py-2 text-center">
                        <button
                          onClick$={() => deleteWorkout(workout.id)}
                          class="rounded p-1 text-slate-400 transition-colors hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                          aria-label={`Delete ${workout.name} workout`}
                        >
                          <svg
                            class="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* New Row Form */}
                  {isAddingNew.value && (
                    <tr class="border-2 border-teal-200 bg-teal-50">
                      <td class="border border-slate-200 px-3 py-2">
                        <select
                          value={newWorkoutCategory.value}
                          onChange$={(e) =>
                            (newWorkoutCategory.value = (
                              e.target as HTMLSelectElement
                            ).value)
                          }
                          class="w-full rounded border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          aria-label="Select workout category"
                        >
                          {DEFAULT_CATEGORIES.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td class="border border-slate-200 px-3 py-2">
                        <div class="space-y-1">
                          <input
                            type="text"
                            value={newWorkoutName.value}
                            onChange$={(e) =>
                              handleNameChange(
                                (e.target as HTMLInputElement).value,
                              )
                            }
                            placeholder="Workout Name"
                            class={`w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:outline-none ${
                              nameError.value
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                            }`}
                            aria-label="Workout name"
                          />
                          <input
                            type="url"
                            value={newWorkoutUrl.value}
                            onChange$={(e) =>
                              (newWorkoutUrl.value = (
                                e.target as HTMLInputElement
                              ).value)
                            }
                            placeholder="Workout URL (optional)"
                            class="w-full rounded border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            aria-label="Workout URL"
                          />
                          <p class="mt-1 text-xs text-slate-500">
                            Leave empty to auto-generate Google search
                          </p>
                        </div>
                      </td>
                      <td class="border border-slate-200 px-3 py-2 text-center">
                        <div class="flex items-center justify-center gap-1">
                          <span class="text-sm text-slate-600">x</span>
                          <input
                            type="number"
                            value={newWorkoutMultiplier.value}
                            onChange$={(e) =>
                              handleMultiplierChange(
                                (e.target as HTMLInputElement).value,
                              )
                            }
                            min="1"
                            step="1"
                            class={`w-16 rounded border px-2 py-1 text-center text-sm focus:ring-2 focus:outline-none ${
                              multiplierError.value
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                                : "border-slate-300 focus:border-teal-500 focus:ring-teal-500"
                            }`}
                            aria-label="Workout multiplier"
                          />
                        </div>
                      </td>
                      <td class="border border-slate-200 px-3 py-2 text-center">
                        <div class="flex items-center justify-center gap-1">
                          <button
                            onClick$={saveNewWorkout}
                            class="rounded p-1 text-teal-600 transition-colors hover:text-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                            aria-label="Save new workout"
                          >
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            onClick$={cancelNewWorkout}
                            class="rounded p-1 text-slate-400 transition-colors hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                            aria-label="Cancel new workout"
                          >
                            <svg
                              class="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}

                  {/* Validation Error Messages */}
                  {showValidationErrors.value &&
                    (nameError.value || multiplierError.value) && (
                      <tr>
                        <td
                          colSpan={4}
                          class="border border-slate-200 px-3 py-2"
                        >
                          <div class="rounded-md border border-red-200 bg-red-50 p-3">
                            <div class="flex items-center gap-2">
                              <svg
                                class="h-4 w-4 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="text-sm font-medium text-red-800">
                                Please fix the following errors:
                              </span>
                            </div>
                            <ul class="mt-2 list-inside list-disc text-sm text-red-700">
                              {nameError.value && (
                                <li>Workout name is required</li>
                              )}
                              {multiplierError.value && (
                                <li>Multiplier must be at least 1</li>
                              )}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Action buttons - positioned after the table */}
        <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
          <button
            onClick$={addNewRow}
            class="flex items-center gap-2 rounded-md bg-teal-600 px-3 py-2 font-medium text-white transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
            aria-label="Add new workout"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New
          </button>

          <div class="flex items-center gap-2">
            <button
              onClick$={handleCancel}
              class="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Cancel changes and return to wheel"
            >
              Cancel
            </button>

            {hasUnsavedChanges.value && (
              <button
                onClick$={handleSave}
                class="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Save changes and return to wheel"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </section>
    );
  },
);
