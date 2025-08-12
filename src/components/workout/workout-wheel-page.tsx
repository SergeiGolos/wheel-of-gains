import { component$, useStore, useComputed$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { Wheel } from "./wheel";
import { WorkoutManager } from "./workout-manager";
import { FilterPanel } from "./filter-panel";
import { ResultModal } from "../ui/result-modal";
import { WorkoutNavigation } from "../navigation/workout-navigation";
import { 
  loadWorkoutsFromStorage, 
  saveWorkoutsToStorage, 
  DEFAULT_CATEGORIES
} from "../../utils/workout-utils";

interface AppState {
  masterWorkouts: Workout[];
  winner: Workout | null;
  activeFilters: string[];
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
    activeFilters: [],
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
    // Filter workouts based on active filters inline
    const filteredWorkouts = state.activeFilters.length === 0 
      ? state.masterWorkouts 
      : state.masterWorkouts.filter(workout => 
          state.activeFilters.includes(workout.category.id)
        );
    
    const expanded: Workout[] = [];
    filteredWorkouts.forEach(workout => {
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

  const handleFilterChange = $((filters: string[]) => {
    state.activeFilters = filters;
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
      
      <div class="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <header class="text-center mb-8 lg:mb-10">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            <span class="block">Wheel</span>
            <span class="block text-teal-600 -mt-1 sm:-mt-2 md:-mt-3">Of Gains</span>
          </h1>
          <h2 class="text-xl sm:text-2xl font-bold text-slate-700 mt-2">{pageTitle}</h2>
          <p class="text-slate-500 mt-3 text-base sm:text-lg px-4">{pageDescription}</p>
        </header>

        <main class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6" role="main">
          <div class="lg:col-span-3">
            <FilterPanel
              categories={DEFAULT_CATEGORIES}
              activeFilters={state.activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <Wheel displayWorkouts={displayWorkouts.value} onSpinFinish={handleSpinFinish} />
          <WorkoutManager workouts={state.masterWorkouts} setWorkouts={handleWorkoutsChange} />
        </main>
      </div>

      <ResultModal winner={state.winner} onClose={handleCloseModal} />
    </div>
  );
});