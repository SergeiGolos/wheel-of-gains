import { component$, $, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../../utils/workout-utils";
import {
  DEFAULT_CATEGORIES,
  createWorkoutUrl,
} from "../../../utils/workout-utils";
import { CategoryBadge } from "../../ui/category-badge";
import { validateNewWorkoutForm } from "../utils/workout-validation";

interface NewWorkoutFormProps {
  newWorkoutName: string;
  newWorkoutUrl: string;
  newWorkoutMultiplier: number;
  newWorkoutCategory: string;
  nameError: boolean;
  multiplierError: boolean;
  showValidationErrors: boolean;
  workouts: Workout[];
  onNameChange: QRL<(value: string) => void>;
  onUrlChange: QRL<(value: string) => void>;
  onMultiplierChange: QRL<(value: string) => void>;
  onCategoryChange: QRL<(value: string) => void>;
  onSave: QRL<() => void>;
  onCancel: QRL<() => void>;
  autoFocus?: boolean;
}

export const NewWorkoutForm = component$<NewWorkoutFormProps>(
  ({
    newWorkoutName,
    newWorkoutUrl,
    newWorkoutMultiplier,
    newWorkoutCategory,
    nameError,
    multiplierError,
    showValidationErrors,
    workouts,
    onNameChange,
    onUrlChange,
    onMultiplierChange,
    onCategoryChange,
    onSave,
    onCancel,
  }) => {
    // Local ref for focusing the name input
    const nameInputRef = useSignal<HTMLInputElement>();

  // Focus the name input when requested (page load or when form opens)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
      if (nameInputRef.value && !newWorkoutName.trim()) {
        // Focus after paint to ensure element is mounted
        setTimeout(() => nameInputRef.value?.focus(), 0);
      }
    });
    // Handle URL auto-generation when name changes
    const handleNameChangeWithUrl = $((value: string) => {
      onNameChange(value);
      if (
        !newWorkoutUrl ||
        newWorkoutUrl === createWorkoutUrl(newWorkoutName)
      ) {
        onUrlChange(createWorkoutUrl(value));
      }
    });

    const handleSave = $(() => {
      const validation = validateNewWorkoutForm(
        newWorkoutName,
        newWorkoutMultiplier,
        workouts,
      );

      if (validation.isValid) {
        onSave();
      }
    });

    const currentCategory =
      DEFAULT_CATEGORIES.find((cat) => cat.id === newWorkoutCategory) ||
      DEFAULT_CATEGORIES[0];

    return (
      <tr class="border-2 border-teal-200 bg-teal-50">
        <td class="border border-slate-200 px-3 py-2">
          <div class="space-y-1">
            <select
              value={newWorkoutCategory}
              onChange$={(e) =>
                onCategoryChange((e.target as HTMLSelectElement).value)
              }
              class="w-full rounded border border-slate-300 px-2 py-1 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="Select workout category"
            >
              {DEFAULT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <CategoryBadge category={currentCategory} />
          </div>
        </td>
        <td class="border border-slate-200 px-3 py-2">
          <div class="space-y-2">
            <input
              ref={nameInputRef}
              type="text"
              value={newWorkoutName}
              onChange$={(e) =>
                handleNameChangeWithUrl((e.target as HTMLInputElement).value)
              }
              placeholder="Workout name"
              class={`w-full rounded border px-2 py-1 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                showValidationErrors && nameError
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300"
              }`}
              aria-label="New workout name"
            />
            <input
              type="url"
              value={newWorkoutUrl}
              onChange$={(e) =>
                onUrlChange((e.target as HTMLInputElement).value)
              }
              placeholder="YouTube URL (optional)"
              class="w-full rounded border border-slate-300 px-2 py-1 text-xs text-slate-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              aria-label="New workout URL"
            />
          </div>
        </td>
        <td class="border border-slate-200 px-3 py-2 text-center">
          <div class="flex items-center justify-center gap-1">
            <span class="text-sm text-slate-600">x</span>
            <input
              type="number"
              value={newWorkoutMultiplier}
              min="1"
              step="1"
              onChange$={(e) =>
                onMultiplierChange((e.target as HTMLInputElement).value)
              }
              class={`w-16 rounded border px-2 py-1 text-center text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                showValidationErrors && multiplierError
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300"
              }`}
              aria-label="New workout multiplier"
            />
          </div>
        </td>
        <td class="border border-slate-200 px-3 py-2 text-center">
          <div class="flex items-center justify-center gap-1">
            <button
              onClick$={handleSave}
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
              onClick$={onCancel}
              class="rounded p-1 text-slate-400 transition-colors hover:text-slate-600 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
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
    );
  },
);
