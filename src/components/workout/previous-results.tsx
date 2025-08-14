import { component$, $ } from "@builder.io/qwik";
import type { SpinResult } from "../../utils/workout-utils";
import { formatSpinTimestamp } from "../../utils/workout-utils";
import { CategoryBadge } from "../ui/category-badge";

interface PreviousResultsProps {
  spinHistory: SpinResult[];
}

export const PreviousResults = component$<PreviousResultsProps>(
  ({ spinHistory }) => {
    const openWorkout = $((url: string) => {
      window.open(url, "_blank");
    });

    return (
      <section
        class="flex flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4"
        aria-labelledby="results-heading"
      >
        <h2
          id="results-heading"
          class="mb-3 text-center text-lg font-bold tracking-widest text-slate-800 uppercase sm:text-xl"
        >
          Previous Results
        </h2>

        <div
          class="workout-list max-h-[400px] flex-grow overflow-y-auto pr-2 sm:max-h-[500px] lg:max-h-none"
          role="region"
          aria-label="Spin history"
          aria-live="polite"
        >
          {spinHistory.length === 0 ? (
            <div class="rounded-md border-2 border-dashed border-slate-200 py-4 text-center sm:py-6">
              <p class="text-sm text-slate-500 sm:text-base">No spins yet.</p>
              <p class="text-xs text-slate-400 sm:text-sm">
                Spin the wheel to start your workout history!
              </p>
            </div>
          ) : (
            <ul class="space-y-2" role="list">
              {spinHistory.map((result) => (
                <li
                  key={result.id}
                  class="rounded-md border border-slate-200 bg-slate-50 p-2 transition-colors hover:bg-slate-100 sm:p-3"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="min-w-0 flex-grow">
                      <div class="mb-1 flex items-center gap-2">
                        <CategoryBadge category={result.workout.category} />
                      </div>
                      <button
                        onClick$={() => openWorkout(result.workout.url)}
                        class="w-full text-left text-sm font-medium text-slate-700 transition-colors hover:text-slate-900 focus:text-slate-900 focus:outline-none"
                        aria-label={`Open ${result.workout.name} workout`}
                      >
                        {result.workout.name}
                      </button>
                      <p class="mt-1 text-xs text-slate-500">
                        {formatSpinTimestamp(result.timestamp)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  },
);
