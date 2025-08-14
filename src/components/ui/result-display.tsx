import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { CategoryBadge } from "./category-badge";

interface ResultDisplayProps {
  winner: Workout | null;
  isSpinning: boolean;
  onStartWorkout: QRL<() => void>;
}

export const ResultDisplay = component$<ResultDisplayProps>(
  ({ winner, isSpinning, onStartWorkout }) => {
    // Show placeholder when spinning
    if (isSpinning) {
      return (
        <section
          class="mb-3 rounded-lg border border-teal-400 bg-gradient-to-r from-teal-500 to-teal-600 p-4 shadow-lg"
          aria-labelledby="current-result"
        >
          <h2
            id="current-result"
            class="mb-2 text-center text-xs font-bold tracking-widest text-white uppercase"
          >
            Your Destiny Awaits...
          </h2>

          <div class="rounded-md bg-white p-4 shadow-inner">
            <div class="flex items-center justify-center">
              <div class="text-6xl text-slate-400">❓</div>
            </div>
          </div>
        </section>
      );
    }

    if (!winner) return null;

    const startWorkout = $(() => {
      onStartWorkout();
    });

    return (
      <section
        class="mb-3 rounded-lg border border-teal-400 bg-gradient-to-r from-teal-500 to-teal-600 p-4 shadow-lg"
        aria-labelledby="current-result"
      >
        <h2
          id="current-result"
          class="mb-2 text-center text-xs font-bold tracking-widest text-white uppercase"
        >
          Your Destiny Awaits...
        </h2>

        <div class="rounded-md bg-white p-4 shadow-inner">
          <div class="mb-3 flex items-center justify-center gap-2">
            <CategoryBadge category={winner.category} />
          </div>

          <div class="flex items-center justify-center gap-3">
            <h3 class="flex-grow text-center text-xl font-bold break-words text-slate-800">
              {winner.name}
            </h3>
            <button
              onClick$={startWorkout}
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-md transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
              aria-label={`Start ${winner.name} workout - opens in new tab`}
              title="Start Workout"
            >
              ▶
            </button>
          </div>
        </div>
      </section>
    );
  },
);
