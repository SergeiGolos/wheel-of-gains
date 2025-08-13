import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { DEFAULT_CATEGORIES } from "../../utils/workout-utils";
import { CategoryBadge } from "../ui/category-badge";
import { KettlebellIcon } from "../icons/kettlebell-icon";

interface WorkoutManagerProps {
  workouts: Workout[];
  setWorkouts: QRL<(workouts: Workout[]) => void>;
  onDone?: QRL<() => void>;
}

export const WorkoutManager = component$<WorkoutManagerProps>(({ workouts, setWorkouts, onDone }) => {
  const addWorkout = $((e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = (formData.get('workoutName') as string)?.trim();
    const url = (formData.get('workoutUrl') as string)?.trim();
    const multiplier = parseInt((formData.get('workoutMultiplier') as string) || '1', 10) || 1;
    const categoryId = formData.get('workoutCategory') as string;
    const category = DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[0];
    
    if (name && url) {
      setWorkouts([...workouts, { 
        id: crypto.randomUUID(), 
        name, 
        url, 
        multiplier,
        category
      }]);
      form.reset();
      (form.querySelector('[name="workoutMultiplier"]') as HTMLInputElement).value = '1';
      (form.querySelector('[name="workoutCategory"]') as HTMLSelectElement).value = DEFAULT_CATEGORIES[0].id;
    }
  });

  const deleteWorkout = $((id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  });

  return (
    <section class="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col" aria-labelledby="arsenal-heading">
      {/* Header with Done button */}
      <div class="flex items-center justify-between mb-3">
        <h2 id="arsenal-heading" class="text-lg sm:text-xl text-slate-800 font-bold uppercase tracking-widest">Workout Arsenal</h2>
        {onDone && (
          <button
            onClick$={onDone}
            class="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            aria-label="Exit edit mode"
          >
            Done
          </button>
        )}
      </div>
      
      <div class="flex-grow overflow-y-auto pr-2 mb-4 max-h-[250px] sm:max-h-[300px] lg:max-h-none workout-list" role="region" aria-label="Workout list" aria-live="polite">
        {workouts.length === 0 ? (
          <div class="text-center py-4 sm:py-6 border-2 border-dashed border-slate-200 rounded-md">
            <p class="text-slate-500 text-sm sm:text-base">Your arsenal is empty.</p>
            <p class="text-slate-400 text-xs sm:text-sm">Add a workout below.</p>
          </div>
        ) : (
          <ul class="space-y-2" role="list">
            {workouts.map((workout) => (
              <li key={workout.id} class="flex items-center justify-between bg-slate-50 p-2 sm:p-3 rounded-md border border-slate-200">
                <div class="flex-grow truncate pr-2">
                  <div class="flex items-center gap-2 mb-1">
                    <CategoryBadge category={workout.category} />
                    <span class="font-medium text-slate-700 text-sm sm:text-base truncate">
                      {workout.name}{' '}
                      <span class="text-slate-500 text-xs font-semibold">(x{workout.multiplier})</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick$={() => deleteWorkout(workout.id)}
                  aria-label={`Delete ${workout.name} workout`}
                  class="flex-shrink-0 text-slate-400 hover:text-red-500 transition-colors p-2 sm:p-1 rounded-full min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 id="add-workout-heading" class="text-base sm:text-lg text-center mb-3 text-slate-800 font-bold uppercase tracking-widest">Add Challenge</h3>
        <form onSubmit$={addWorkout} class="space-y-3" aria-labelledby="add-workout-heading">
          <label class="block">
            <span class="sr-only">Workout Name</span>
            <input 
              type="text" 
              name="workoutName" 
              placeholder="Workout Name" 
              required 
              aria-required="true" 
              class="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" 
            />
          </label>
          <label class="block">
            <span class="sr-only">Workout URL</span>
            <input 
              type="url" 
              name="workoutUrl" 
              placeholder="Workout URL" 
              required 
              aria-required="true" 
              class="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" 
            />
          </label>
          <label class="block">
            <span class="sr-only">Workout Multiplier (Repetitions on Wheel)</span>
            <input 
              type="number" 
              name="workoutMultiplier" 
              value="1" 
              min="1" 
              step="1" 
              required 
              aria-required="true" 
              title="Repetitions on Wheel" 
              aria-label="Workout multiplier - how many times this workout appears on the wheel" 
              class="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" 
            />
          </label>
          <label class="block">
            <span class="sr-only">Workout Category</span>
            <select 
              name="workoutCategory" 
              value={DEFAULT_CATEGORIES[0].id} 
              aria-label="Select workout category" 
              class="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]"
            >
              {DEFAULT_CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </label>
          <button 
            type="submit" 
            class="w-full flex justify-center items-center gap-2 py-3 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors min-h-[44px]"
          >
            <KettlebellIcon /> Add to Arsenal
          </button>
        </form>
      </div>
    </section>
  );
});