import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import type { Workout } from "../../utils/workout-utils";
import { WorkoutManager } from "./workout-manager";
import { WorkoutNavigation } from "../navigation/workout-navigation";
import {
  loadWorkoutsFromStorage,
  saveWorkoutsToStorage,
} from "../../utils/workout-utils";

interface AppState {
  masterWorkouts: Workout[];
}

interface WorkoutEditPageProps {
  initialWorkouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  storageKey?: string;
  categorySlug?: string; // For navigation back to the main page
}

export const WorkoutEditPage = component$<WorkoutEditPageProps>(
  ({
    initialWorkouts,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageTitle: _pageTitle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageDescription: _pageDescription,
    storageKey,
    categorySlug = "",
  }) => {
    const navigate = useNavigate();
    const state = useStore<AppState>({
      masterWorkouts: initialWorkouts,
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

    const handleWorkoutsChange = $((workouts: Workout[]) => {
      state.masterWorkouts = workouts;
    });

    const handleDone = $(() => {
      // Navigate back to the main page for this category
      const basePath = "/wheel-of-gains/";
      const targetPath = categorySlug
        ? `${basePath}${categorySlug}/`
        : basePath;
      navigate(targetPath);
    });

    return (
      <div class="min-h-screen bg-slate-100 font-['Inter'] text-slate-800">
        <style
          dangerouslySetInnerHTML={`
        .workout-list::-webkit-scrollbar { width: 8px; }
        .workout-list::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
        .workout-list::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
        .workout-list::-webkit-scrollbar-thumb:hover { background: #64748b; }
      `}
        />

        <WorkoutNavigation />

        <div class="container mx-auto max-w-7xl p-2 md:p-4 lg:p-6">
          <main class="mx-auto max-w-4xl" role="main">
            {/* Edit Mode */}
            <WorkoutManager
              workouts={state.masterWorkouts}
              setWorkouts={handleWorkoutsChange}
              onDone={handleDone}
            />
          </main>
        </div>
      </div>
    );
  },
);
