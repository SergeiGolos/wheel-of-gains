import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

interface ActionButtonsProps {
  hasUnsavedChanges: boolean;
  onAddNew: QRL<() => void>;
  onSave: QRL<() => void>;
  onCancel: QRL<() => void>;
}

export const ActionButtons = component$<ActionButtonsProps>(
  ({ hasUnsavedChanges, onAddNew, onSave, onCancel }) => {
    return (
      <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
        <button
          onClick$={onAddNew}
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
            onClick$={onCancel}
            class="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
            aria-label="Cancel changes and return to wheel"
          >
            Cancel
          </button>

          {hasUnsavedChanges && (
            <button
              onClick$={onSave}
              class="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
              aria-label="Save changes and return to wheel"
            >
              Save
            </button>
          )}
        </div>
      </div>
    );
  }
);