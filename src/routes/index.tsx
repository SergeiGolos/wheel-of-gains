import { component$, useStore, useComputed$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Wheel } from "../components/workout/wheel";
import { WorkoutManager } from "../components/workout/workout-manager";
import { FilterPanel } from "../components/workout/filter-panel";
import { ResultModal } from "../components/ui/result-modal";
import { 
  loadWorkoutsFromStorage, 
  saveWorkoutsToStorage, 
  initialMasterWorkouts, 
  DEFAULT_CATEGORIES,
  type Workout 
} from "../utils/workout-utils";

interface AppState {
  masterWorkouts: Workout[];
  winner: Workout | null;
  activeFilters: string[];
}

export default component$(() => {
  const state = useStore<AppState>({
    masterWorkouts: [],
    winner: null,
    activeFilters: [],
  });

  // Initialize workouts on client side
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Try to load from localStorage first, fallback to initial data
    const savedWorkouts = loadWorkoutsFromStorage();
    state.masterWorkouts = savedWorkouts || initialMasterWorkouts;
  });

  // Save workouts to localStorage whenever they change
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => state.masterWorkouts.length);
    track(() => state.masterWorkouts);
    
    if (state.masterWorkouts.length > 0) {
      saveWorkoutsToStorage(state.masterWorkouts);
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
      
      <div class="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <header class="text-center mb-8 lg:mb-10">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase">
            <span class="block">Wheel</span>
            <span class="block text-teal-600 -mt-1 sm:-mt-2 md:-mt-3">Of Gains</span>
          </h1>
          <p class="text-slate-500 mt-3 text-base sm:text-lg px-4">Spin the wheel to choose your path to glory!</p>
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

export const head: DocumentHead = {
  title: "Wheel of Gains - Random Workout Selector",
  meta: [
    {
      name: "description",
      content: "Spin the wheel to randomly select your next workout challenge. A fun way to stay motivated and try new exercises!",
    },
    {
      name: "keywords",
      content: "workout, fitness, exercise, random, wheel, gains, training",
    },
    {
      name: "author",
      content: "Wheel of Gains",
    },
    {
      name: "theme-color",
      content: "#0f172a",
    },
    {
      property: "og:title",
      content: "Wheel of Gains - Random Workout Selector",
    },
    {
      property: "og:description",
      content: "Spin the wheel to randomly select your next workout challenge!",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  links: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/icons/icon-32.png",
      sizes: "32x32",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/icon-180.png",
      sizes: "180x180",
    },
  ],
};
