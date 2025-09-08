import { component$ } from "@builder.io/qwik";

export const WorkoutNavigation = component$(() => {
  return (
    <header class="mb-3 border-b border-slate-200 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <div class="py-3">
          <h1 class="text-lg font-bold tracking-tight text-slate-900 uppercase sm:text-xl">
            <span class="text-teal-600">Wheel</span>
            <span class="text-slate-900"> Of Gains</span>
          </h1>
        </div>
      </div>
    </header>
  );
});
