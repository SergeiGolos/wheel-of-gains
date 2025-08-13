import { component$, $ } from "@builder.io/qwik";
import type { SpinResult } from "../../utils/workout-utils";
import { formatSpinTimestamp } from "../../utils/workout-utils";
import { CategoryBadge } from "../ui/category-badge";

interface PreviousResultsProps {
  spinHistory: SpinResult[];
}

export const PreviousResults = component$<PreviousResultsProps>(({ spinHistory }) => {
  const openWorkout = $((url: string) => {
    window.open(url, '_blank');
  });

  return (
    <section class="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col" aria-labelledby="results-heading">
      <h2 id="results-heading" class="text-lg sm:text-xl text-center mb-3 text-slate-800 font-bold uppercase tracking-widest">
        Previous Results
      </h2>
      
      <div class="flex-grow overflow-y-auto pr-2 max-h-[400px] sm:max-h-[500px] lg:max-h-none workout-list" role="region" aria-label="Spin history" aria-live="polite">
        {spinHistory.length === 0 ? (
          <div class="text-center py-4 sm:py-6 border-2 border-dashed border-slate-200 rounded-md">
            <p class="text-slate-500 text-sm sm:text-base">No spins yet.</p>
            <p class="text-slate-400 text-xs sm:text-sm">Spin the wheel to start your workout history!</p>
          </div>
        ) : (
          <ul class="space-y-2" role="list">
            {spinHistory.map((result) => (
              <li key={result.id} class="bg-slate-50 p-2 sm:p-3 rounded-md border border-slate-200 hover:bg-slate-100 transition-colors">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-grow min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <CategoryBadge category={result.workout.category} />
                    </div>
                    <button
                      onClick$={() => openWorkout(result.workout.url)}
                      class="text-left w-full font-medium text-slate-700 text-sm hover:text-slate-900 transition-colors focus:outline-none focus:text-slate-900"
                      aria-label={`Open ${result.workout.name} workout`}
                    >
                      {result.workout.name}
                    </button>
                    <p class="text-xs text-slate-500 mt-1">
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
});