import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { CategoryBadge } from "./category-badge";

interface ResultDisplayProps {
  winner: Workout | null;
  onStartWorkout: QRL<() => void>;
  onSpinAgain: QRL<() => void>;
}

export const ResultDisplay = component$<ResultDisplayProps>(({ winner, onStartWorkout, onSpinAgain }) => {
  if (!winner) return null;

  const startWorkout = $(() => {
    onStartWorkout();
  });

  const spinAgain = $(() => {
    onSpinAgain();
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
        
        <h3 class="text-xl font-bold text-slate-800 text-center mb-4 break-words">
          {winner.name}
        </h3>
        
        <div class="flex gap-2 justify-center">
          <button 
            onClick$={startWorkout}
            class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 text-sm"
            aria-label={`Start ${winner.name} workout - opens in new tab`}
          >
            Start Workout!
          </button>
          <button 
            onClick$={spinAgain}
            class="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 text-sm"
            aria-label="Spin again for different workout"
          >
            Spin Again
          </button>
        </div>
      </div>
    </section>
  );
});