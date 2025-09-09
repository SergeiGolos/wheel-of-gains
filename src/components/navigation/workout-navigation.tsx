import { component$ } from "@builder.io/qwik";

export const WorkoutNavigation = component$(() => {
  return (
    <header class="mb-3 border-b border-slate-200 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between py-3">
          <h1 class="text-lg font-bold tracking-tight text-slate-900 uppercase sm:text-xl">
            <a href="/" class="hover:text-teal-600 transition-colors">
              <span class="text-teal-600">Wheel</span>
              <span class="text-slate-900"> Of Gains</span>
            </a>
          </h1>
          <nav class="flex items-center gap-4">
            <a 
              href="/workouts" 
              class="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              Browse Workouts
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
});
