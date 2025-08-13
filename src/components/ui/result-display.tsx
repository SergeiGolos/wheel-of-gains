import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { CategoryBadge } from "./category-badge";

interface ResultDisplayProps {
  winner: Workout | null;
  isSpinning: boolean;
  onStartWorkout: QRL<() => void>;
}

export const ResultDisplay = component$<ResultDisplayProps>(({ winner, isSpinning, onStartWorkout }) => {
  // Show placeholder when spinning
  if (isSpinning) {
    return (
      <section class="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-lg shadow-lg border border-teal-400 mb-3" aria-labelledby="current-result">
        <h2 id="current-result" class="text-xs font-bold text-white uppercase tracking-widest text-center mb-2">
          Your Destiny Awaits...
        </h2>
        
        <div class="bg-white rounded-md p-4 shadow-inner">
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
    <section class="bg-gradient-to-r from-teal-500 to-teal-600 p-4 rounded-lg shadow-lg border border-teal-400 mb-3" aria-labelledby="current-result">
      <h2 id="current-result" class="text-xs font-bold text-white uppercase tracking-widest text-center mb-2">
        Your Destiny Awaits...
      </h2>
      
      <div class="bg-white rounded-md p-4 shadow-inner">
        <div class="flex items-center justify-center gap-2 mb-3">
          <CategoryBadge category={winner.category} />
        </div>
        
        <div class="flex items-center justify-center gap-3">
          <h3 class="text-xl font-bold text-slate-800 break-words flex-grow text-center">
            {winner.name}
          </h3>
          <button 
            onClick$={startWorkout}
            class="flex items-center justify-center w-10 h-10 bg-teal-600 hover:bg-teal-700 text-white rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md flex-shrink-0"
            aria-label={`Start ${winner.name} workout - opens in new tab`}
            title="Start Workout"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
});