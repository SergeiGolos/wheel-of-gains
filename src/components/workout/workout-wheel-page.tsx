import { component$, useStore, useComputed$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { Wheel } from "./wheel";
import { WorkoutManager } from "./workout-manager";
import { ResultModal } from "../ui/result-modal";
import { WorkoutNavigation } from "../navigation/workout-navigation";
import { 
  loadWorkoutsFromStorage, 
  saveWorkoutsToStorage
} from "../../utils/workout-utils";

interface AppState {
  masterWorkouts: Workout[];
  winner: Workout | null;
}

interface WorkoutWheelPageProps {
  initialWorkouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  storageKey?: string;
}

export const WorkoutWheelPage = component$<WorkoutWheelPageProps>(({ 
  initialWorkouts, 
  pageTitle, 
  pageDescription,
  storageKey
}) => {
  const state = useStore<AppState>({
    masterWorkouts: initialWorkouts, // Initialize immediately with the passed workouts
    winner: null,
  });

  // Try to load from localStorage and override if found
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (storageKey) {
      const savedWorkouts = loadWorkoutsFromStorage(storageKey);
      if (savedWorkouts) {
        state.masterWorkouts = savedWorkouts;
      }
    }
  });

  // Save workouts to localStorage whenever they change
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => state.masterWorkouts.length);
    track(() => state.masterWorkouts);
    
    if (state.masterWorkouts.length > 0 && storageKey) {
      saveWorkoutsToStorage(state.masterWorkouts, storageKey);
    }
  });

  const displayWorkouts = useComputed$(() => {
    // No filtering needed since separate pages handle categories
    const expanded: Workout[] = [];
    state.masterWorkouts.forEach(workout => {
      for (let i = 0; i < workout.multiplier; i++) {
        expanded.push(workout);
      }
    });
    // Shuffle array
    for (let i = expanded.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [expanded[i], expanded[j]] = [expanded[j], expanded[i]];
    }
    return expanded;
  });

  // Create actions that modify state directly
  const handleSpinFinish = $((winner: Workout) => {
    state.winner = winner;
  });

  const handleWorkoutsChange = $((workouts: Workout[]) => {
    state.masterWorkouts = workouts;
  });

  const handleCloseModal = $(() => {
    state.winner = null;
  });

  return (
    <div class="min-h-screen bg-slate-100 font-['Inter'] text-slate-800">
      <style dangerouslySetInnerHTML={`
        .workout-list::-webkit-scrollbar { width: 8px; }
        .workout-list::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
        .workout-list::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
        .workout-list::-webkit-scrollbar-thumb:hover { background: #64748b; }
      `} />
      
      <WorkoutNavigation />
      
      <div class="container mx-auto p-2 md:p-4 lg:p-6 max-w-7xl">
        {/* Subtle page context indicator */}
        <div class="text-center mb-3">
          <p class="text-slate-500 text-sm">{pageTitle} - {pageDescription}</p>
        </div>

        <main class="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4" role="main">
          <Wheel displayWorkouts={displayWorkouts.value} onSpinFinish={handleSpinFinish} />
          <WorkoutManager workouts={state.masterWorkouts} setWorkouts={handleWorkoutsChange} />
        </main>
      </div>

      <ResultModal winner={state.winner} onClose={handleCloseModal} />
    </div>
  );
});