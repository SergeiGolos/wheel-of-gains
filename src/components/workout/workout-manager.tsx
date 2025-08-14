import { component$, $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { DEFAULT_CATEGORIES } from "../../utils/workout-utils";
import { CategoryBadge } from "../ui/category-badge";

interface WorkoutManagerProps {
  workouts: Workout[];
  setWorkouts: QRL<(workouts: Workout[]) => void>;
  onDone?: QRL<() => void>;
}

export const WorkoutManager = component$<WorkoutManagerProps>(({ 
  workouts, 
  setWorkouts, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onDone: _onDone 
}) => {
  const isAddingNew = useSignal(false);
  const newWorkoutName = useSignal("");
  const newWorkoutUrl = useSignal("");
  const newWorkoutMultiplier = useSignal(1);
  const newWorkoutCategory = useSignal(DEFAULT_CATEGORIES[0].id);

  const addNewRow = $(() => {
    isAddingNew.value = true;
    newWorkoutName.value = "";
    newWorkoutUrl.value = "";
    newWorkoutMultiplier.value = 1;
    newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
  });

  const saveNewWorkout = $(() => {
    const name = newWorkoutName.value.trim();
    const url = newWorkoutUrl.value.trim();
    const multiplier = newWorkoutMultiplier.value || 1;
    const categoryId = newWorkoutCategory.value;
    const category = DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[0];
    
    if (name && url) {
      setWorkouts([...workouts, { 
        id: crypto.randomUUID(), 
        name, 
        url, 
        multiplier,
        category
      }]);
      
      // Reset form
      isAddingNew.value = false;
      newWorkoutName.value = "";
      newWorkoutUrl.value = "";
      newWorkoutMultiplier.value = 1;
      newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
    }
  });

  const cancelNewWorkout = $(() => {
    isAddingNew.value = false;
    newWorkoutName.value = "";
    newWorkoutUrl.value = "";
    newWorkoutMultiplier.value = 1;
    newWorkoutCategory.value = DEFAULT_CATEGORIES[0].id;
  });

  const deleteWorkout = $((id: string) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  });

  const updateWorkoutMultiplier = $((id: string, newMultiplier: number) => {
    const validMultiplier = Math.max(1, Math.floor(newMultiplier)) || 1;
    setWorkouts(workouts.map(w => 
      w.id === id ? { ...w, multiplier: validMultiplier } : w
    ));
  });

  return (
    <section class="bg-white p-2 sm:p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col" aria-labelledby="arsenal-heading">
      {/* Header */}
      <div class="flex items-center justify-between mb-3">
        <h2 id="arsenal-heading" class="text-lg sm:text-xl text-slate-800 font-bold uppercase tracking-widest">Workout Arsenal</h2>
        <button
          onClick$={addNewRow}
          class="flex items-center gap-2 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          aria-label="Add new workout"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New
        </button>
      </div>
      
      {/* Editable Grid */}
      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-slate-200 rounded-lg overflow-hidden">
          <thead class="bg-slate-50">
            <tr>
              <th class="border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Category</th>
              <th class="border border-slate-200 px-3 py-2 text-left text-sm font-semibold text-slate-700">Workout Name</th>
              <th class="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700">Multiplier</th>
              <th class="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 && !isAddingNew.value ? (
              <tr>
                <td colSpan={4} class="border border-slate-200 px-3 py-8 text-center text-slate-500">
                  <div class="flex flex-col items-center gap-2">
                    <p class="text-sm">Your arsenal is empty.</p>
                    <p class="text-xs text-slate-400">Click "Add New" to create your first workout.</p>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {workouts.map((workout) => (
                  <tr key={workout.id} class="hover:bg-slate-50">
                    <td class="border border-slate-200 px-3 py-2">
                      <CategoryBadge category={workout.category} />
                    </td>
                    <td class="border border-slate-200 px-3 py-2">
                      <div class="font-medium text-slate-700">{workout.name}</div>
                      <div class="text-xs text-slate-500 truncate">{workout.url}</div>
                    </td>
                    <td class="border border-slate-200 px-3 py-2 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <span class="text-sm text-slate-600">x</span>
                        <input
                          type="number"
                          value={workout.multiplier}
                          min="1"
                          step="1"
                          onChange$={(e) => updateWorkoutMultiplier(workout.id, parseInt((e.target as HTMLInputElement).value, 10))}
                          class="w-16 px-2 py-1 text-center border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                          aria-label={`Multiplier for ${workout.name} workout`}
                        />
                      </div>
                    </td>
                    <td class="border border-slate-200 px-3 py-2 text-center">
                      <button
                        onClick$={() => deleteWorkout(workout.id)}
                        class="p-1 text-slate-400 hover:text-red-500 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        aria-label={`Delete ${workout.name} workout`}
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                
                {/* New Row Form */}
                {isAddingNew.value && (
                  <tr class="bg-teal-50 border-2 border-teal-200">
                    <td class="border border-slate-200 px-3 py-2">
                      <select 
                        value={newWorkoutCategory.value}
                        onChange$={(e) => newWorkoutCategory.value = (e.target as HTMLSelectElement).value}
                        class="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        aria-label="Select workout category"
                      >
                        {DEFAULT_CATEGORIES.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </td>
                    <td class="border border-slate-200 px-3 py-2">
                      <div class="space-y-1">
                        <input
                          type="text"
                          value={newWorkoutName.value}
                          onChange$={(e) => newWorkoutName.value = (e.target as HTMLInputElement).value}
                          placeholder="Workout Name"
                          class="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          aria-label="Workout name"
                        />
                        <input
                          type="url"
                          value={newWorkoutUrl.value}
                          onChange$={(e) => newWorkoutUrl.value = (e.target as HTMLInputElement).value}
                          placeholder="Workout URL"
                          class="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          aria-label="Workout URL"
                        />
                      </div>
                    </td>
                    <td class="border border-slate-200 px-3 py-2 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <span class="text-sm text-slate-600">x</span>
                        <input
                          type="number"
                          value={newWorkoutMultiplier.value}
                          onChange$={(e) => newWorkoutMultiplier.value = parseInt((e.target as HTMLInputElement).value, 10) || 1}
                          min="1"
                          step="1"
                          class="w-16 px-2 py-1 text-center border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          aria-label="Workout multiplier"
                        />
                      </div>
                    </td>
                    <td class="border border-slate-200 px-3 py-2 text-center">
                      <div class="flex items-center justify-center gap-1">
                        <button
                          onClick$={saveNewWorkout}
                          class="p-1 text-teal-600 hover:text-teal-700 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          aria-label="Save new workout"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick$={cancelNewWorkout}
                          class="p-1 text-slate-400 hover:text-red-500 transition-colors rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          aria-label="Cancel new workout"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
});