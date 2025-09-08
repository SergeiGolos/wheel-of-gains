import {
  component$,
  useStore,
  useComputed$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import type { Workout, SpinResult } from "../../utils/workout-utils";
import { Wheel } from "./wheel";
import { WorkoutManager } from "./workout-manager";
import { PreviousResults } from "./previous-results";
import { ResultDisplay } from "../ui/result-display";
import { WorkoutNavigation } from "../navigation/workout-navigation";
import { VersionInfo } from "../ui/version-info";
import {
  loadWorkoutsFromStorage,
  saveWorkoutsToStorage,
  loadSpinHistory,
  saveSpinHistory,
  addSpinResult,
} from "../../utils/workout-utils";

interface AppState {
  masterWorkouts: Workout[];
  winner: Workout | null;
  isEditMode: boolean;
  spinHistory: SpinResult[];
  isSpinning: boolean;
}

interface WorkoutWheelPageProps {
  initialWorkouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  storageKey?: string;
}

export const WorkoutWheelPage = component$<WorkoutWheelPageProps>(
  ({
    initialWorkouts,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageTitle: _pageTitle,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageDescription: _pageDescription,
    storageKey,
  }) => {
    const state = useStore<AppState>({
      masterWorkouts: initialWorkouts, // Initialize immediately with the passed workouts
      winner: null,
      isEditMode: false,
      spinHistory: [],
      isSpinning: false,
    });

    // Try to load from localStorage and override if found
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (storageKey) {
        const savedWorkouts = loadWorkoutsFromStorage(storageKey);
        if (savedWorkouts) {
          state.masterWorkouts = savedWorkouts;
        }

        // Load spin history
        const savedHistory = loadSpinHistory(storageKey);
        state.spinHistory = savedHistory;
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
      state.masterWorkouts.forEach((workout) => {
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
    const handleSpinStart = $(() => {
      // Add previous winner to history before starting new spin
      if (state.winner) {
        state.spinHistory = addSpinResult(state.winner, state.spinHistory);

        // Save updated history to localStorage
        if (storageKey) {
          saveSpinHistory(state.spinHistory, storageKey);
        }
      }

      state.isSpinning = true;
    });

    const handleSpinFinish = $((winner: Workout) => {
      state.winner = winner;
      state.isSpinning = false;

      // Do not add to history immediately - only add when spinning again
    });

    const handleWorkoutsChange = $((workouts: Workout[]) => {
      state.masterWorkouts = workouts;
    });

    const handleStartWorkout = $(() => {
      if (state.winner) {
        window.open(state.winner.url, "_blank");

        // Just clear the winner, history already recorded in handleSpinFinish
        state.winner = null;
      }
    });

    const toggleEditMode = $(() => {
      state.isEditMode = !state.isEditMode;
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
          <main
            class="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-4"
            role="main"
          >
            {/* Wheel or Edit Mode */}
            {state.isEditMode ? (
              <div class="lg:col-span-2">
                <WorkoutManager
                  workouts={state.masterWorkouts}
                  setWorkouts={handleWorkoutsChange}
                  onDone={toggleEditMode}
                />
              </div>
            ) : (
              <Wheel
                displayWorkouts={displayWorkouts.value}
                onSpinStart={handleSpinStart}
                onSpinFinish={handleSpinFinish}
                triggerSpin={0}
              />
            )}

            {/* Right Column */}
            <div class="space-y-3">
              {/* Edit button - only show when not in edit mode */}
              {!state.isEditMode && (
                <div class="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
                  <button
                    onClick$={toggleEditMode}
                    class="w-full rounded-md bg-slate-800 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
                    aria-label="Edit workout arsenal"
                  >
                    Edit Workouts
                  </button>
                </div>
              )}

              {/* Done button - only show when in edit mode */}
              {state.isEditMode && (
                <div class="rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm">
                  <button
                    onClick$={toggleEditMode}
                    class="w-full rounded-md bg-slate-200 px-4 py-2.5 font-semibold text-slate-700 transition-colors hover:bg-slate-300 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
                    aria-label="Exit edit mode"
                  >
                    Done
                  </button>
                </div>
              )}

              {/* Result Display - only show when not in edit mode */}
              {!state.isEditMode && (
                <ResultDisplay
                  winner={state.winner}
                  isSpinning={state.isSpinning}
                  onStartWorkout={handleStartWorkout}
                />
              )}

              {/* Previous Results */}
              <PreviousResults spinHistory={state.spinHistory} />

              {/* Version Info */}
              <div class="mt-4 text-center">
                <VersionInfo showBuildDate={true} />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  },
);
