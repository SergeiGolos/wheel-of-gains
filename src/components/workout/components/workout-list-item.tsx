import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../../utils/workout-utils";
import { CategoryBadge } from "../../ui/category-badge";

interface WorkoutListItemProps {
  workout: Workout;
  isInvalidMultiplier: boolean;
  onMultiplierChange: QRL<(id: string, value: string) => void>;
  onDelete: QRL<(id: string) => void>;
}

export const WorkoutListItem = component$<WorkoutListItemProps>(
  ({ workout, isInvalidMultiplier, onMultiplierChange, onDelete }) => {
    const handleMultiplierChange = $((value: string) => {
      onMultiplierChange(workout.id, value);
    });

    const handleDelete = $(() => {
      onDelete(workout.id);
    });

    return (
      <tr key={workout.id} class="hover:bg-slate-50">
        <td class="border border-slate-200 px-3 py-2">
          <CategoryBadge category={workout.category} />
        </td>
        <td class="border border-slate-200 px-3 py-2">
          <div class="font-medium text-slate-700">{workout.name}</div>
          <div class="truncate text-xs text-slate-500">{workout.url}</div>
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
                handleMultiplierChange((e.target as HTMLInputElement).value)
              }
              class={`w-16 rounded border px-2 py-1 text-center text-sm transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none ${
                isInvalidMultiplier
                  ? "border-red-300 bg-red-50"
                  : "border-slate-300 hover:border-slate-400"
              }`}
              aria-label={`Multiplier for ${workout.name}`}
            />
          </div>
        </td>
        <td class="border border-slate-200 px-3 py-2 text-center">
          <button
            onClick$={handleDelete}
            class="rounded p-1 text-slate-400 transition-colors hover:text-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
            aria-label={`Delete ${workout.name}`}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  },
);
