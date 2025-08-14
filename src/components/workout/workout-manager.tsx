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

export const WorkoutManager = component$<WorkoutManagerProps>(
  ({
    workouts,
    setWorkouts,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDone: _onDone,
  }) => {
    const addWorkout = $((e: SubmitEvent) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      const name = (formData.get("workoutName") as string)?.trim();
      const url = (formData.get("workoutUrl") as string)?.trim();
      const multiplier =
        parseInt((formData.get("workoutMultiplier") as string) || "1", 10) || 1;
      const categoryId = formData.get("workoutCategory") as string;
      const category =
        DEFAULT_CATEGORIES.find((cat) => cat.id === categoryId) ||
        DEFAULT_CATEGORIES[0];

      if (name && url) {
        setWorkouts([
          ...workouts,
          {
            id: crypto.randomUUID(),
            name,
            url,
            multiplier,
            category,
          },
        ]);
        form.reset();
        (
          form.querySelector('[name="workoutMultiplier"]') as HTMLInputElement
        ).value = "1";
        (
          form.querySelector('[name="workoutCategory"]') as HTMLSelectElement
        ).value = DEFAULT_CATEGORIES[0].id;
      }
    });

    const deleteWorkout = $((id: string) => {
      setWorkouts(workouts.filter((w) => w.id !== id));
    });

    const updateWorkoutMultiplier = $((id: string, newMultiplier: number) => {
      const validMultiplier = Math.max(1, Math.floor(newMultiplier)) || 1;
      setWorkouts(
        workouts.map((w) =>
          w.id === id ? { ...w, multiplier: validMultiplier } : w,
        ),
      );
    });

    return (
      <section
        class="flex flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4"
        aria-labelledby="arsenal-heading"
      >
        {/* Header */}
        <div class="mb-3 flex items-center justify-between">
          <h2
            id="arsenal-heading"
            class="text-lg font-bold tracking-widest text-slate-800 uppercase sm:text-xl"
          >
            Workout Arsenal
          </h2>
        </div>

        <div
          class="workout-list mb-4 max-h-[250px] flex-grow overflow-y-auto pr-2 sm:max-h-[300px] lg:max-h-none"
          role="region"
          aria-label="Workout list"
          aria-live="polite"
        >
          {workouts.length === 0 ? (
            <div class="rounded-md border-2 border-dashed border-slate-200 py-4 text-center sm:py-6">
              <p class="text-sm text-slate-500 sm:text-base">
                Your arsenal is empty.
              </p>
              <p class="text-xs text-slate-400 sm:text-sm">
                Add a workout below.
              </p>
            </div>
          ) : (
            <ul class="space-y-2" role="list">
              {workouts.map((workout) => (
                <li
                  key={workout.id}
                  class="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 p-2 sm:p-3"
                >
                  <div class="flex-grow truncate pr-2">
                    <div class="mb-1 flex items-center gap-2">
                      <CategoryBadge category={workout.category} />
                      <span class="truncate text-sm font-medium text-slate-700 sm:text-base">
                        {workout.name}
                      </span>
                    </div>
                  </div>
                  <div class="flex flex-shrink-0 items-center gap-2">
                    <div class="flex items-center gap-1">
                      <span class="text-xs font-semibold text-slate-500">
                        x
                      </span>
                      <input
                        type="number"
                        value={workout.multiplier}
                        min="1"
                        step="1"
                        onInput$={(e) => {
                          const target = e.target as HTMLInputElement;
                          const newValue = parseInt(target.value, 10);
                          if (!isNaN(newValue)) {
                            updateWorkoutMultiplier(workout.id, newValue);
                          }
                        }}
                        class="w-12 rounded border border-slate-300 bg-white px-1 py-0.5 text-center text-xs focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none"
                        aria-label={`Multiplier for ${workout.name} workout`}
                      />
                    </div>
                  </div>
                  <button
                    onClick$={() => deleteWorkout(workout.id)}
                    aria-label={`Delete ${workout.name} workout`}
                    class="min-h-[44px] min-w-[44px] flex-shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:text-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:min-h-auto sm:min-w-auto sm:p-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3
            id="add-workout-heading"
            class="mb-3 text-center text-base font-bold tracking-widest text-slate-800 uppercase sm:text-lg"
          >
            Add Challenge
          </h3>
          <form
            onSubmit$={addWorkout}
            class="space-y-3"
            aria-labelledby="add-workout-heading"
          >
            <label class="block">
              <span class="sr-only">Workout Name</span>
              <input
                type="text"
                name="workoutName"
                placeholder="Workout Name"
                required
                aria-required="true"
                class="mt-1 block min-h-[44px] w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none sm:py-2"
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
                class="mt-1 block min-h-[44px] w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none sm:py-2"
              />
            </label>
            <label class="block">
              <span class="sr-only">
                Workout Multiplier (Repetitions on Wheel)
              </span>
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
                class="mt-1 block min-h-[44px] w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none sm:py-2"
              />
            </label>
            <label class="block">
              <span class="sr-only">Workout Category</span>
              <select
                name="workoutCategory"
                value={DEFAULT_CATEGORIES[0].id}
                aria-label="Select workout category"
                class="mt-1 block min-h-[44px] w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 shadow-sm focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none sm:py-2"
              >
                {DEFAULT_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              class="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-transparent bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none sm:py-2.5"
            >
              <KettlebellIcon /> Add to Arsenal
            </button>
          </form>
        </div>
      </section>
    );
  },
);
