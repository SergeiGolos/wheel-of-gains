import { component$, useStore, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Wheel } from "../../components/workout/wheel";
import { PreviousResults } from "../../components/workout/previous-results";
import { ResultDisplay } from "../../components/ui/result-display";
import { WorkoutNavigation } from "../../components/navigation/workout-navigation";
import { VersionInfo } from "../../components/ui/version-info";
import { parseWorkoutsFromDescription } from "../../utils/markdown-workouts";
import type { Workout, SpinResult } from "../../utils/workout-utils";
import { loadSpinHistory, saveSpinHistory, DEFAULT_CATEGORIES } from "../../utils/workout-utils";
import { loadWorkoutContent, type WorkoutContent } from "../../utils/content-loader";

interface AppState {
  title: string;
  description: string;
  workouts: Workout[];
  winner: Workout | null;
  spinHistory: SpinResult[];
  isSpinning: boolean;
  showWheel: boolean;
  error: string | null;
  shareUrl: string | null;
  workoutContent: WorkoutContent | null;
}

// Route loader to get workout content at build time
export const useWorkoutData = routeLoader$(async (requestEvent) => {
  const name = requestEvent.params.name;
  
  if (!name) {
    throw requestEvent.error(404, "Workout name is required");
  }
  
  const content = await loadWorkoutContent(name);
  
  if (!content) {
    throw requestEvent.error(404, `Workout "${name}" not found`);
  }
  
  return content;
});

export default component$(() => {
  const workoutData = useWorkoutData();
  
  const state = useStore<AppState>({
    title: workoutData.value.frontmatter.title,
    description: workoutData.value.body,
    workouts: [],
    winner: null,
    spinHistory: [],
    isSpinning: false,
    showWheel: false,
    error: null,
    shareUrl: null,
    workoutContent: workoutData.value,
  });
  
  const spinTrigger = useSignal(0);
  const descriptionRef = useSignal<HTMLTextAreaElement>();

  // Initialize workouts from pre-loaded content and load spin history
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    try {
      console.log('[DEBUG] Child page initializing with workout:', workoutData.value.slug);
      
      // Parse workouts from the pre-loaded content
      const parsed = parseWorkoutsFromDescription(state.description);
      const defaultCat = DEFAULT_CATEGORIES.find(c => c.id === 'classic') || DEFAULT_CATEGORIES[0];
      state.workouts = parsed.map(w => ({ ...w, category: defaultCat }));
      state.showWheel = state.workouts.length > 0;
      
      console.log('[DEBUG] Loaded', state.workouts.length, 'workouts from content');
      
      // Load spin history
      try {
        state.spinHistory = loadSpinHistory();
        console.log('[DEBUG] Loaded spin history:', state.spinHistory.length, 'items');
      } catch (error) {
        console.error('[DEBUG] Failed to load spin history:', error);
        state.spinHistory = [];
      }
    } catch (error) {
      console.error('[DEBUG] Child page initialization failed:', error);
      state.error = "Failed to initialize workout";
    }
  });

  const handleDescriptionChange = $((value: string) => {
    state.description = value;
    try {
      const parsed = parseWorkoutsFromDescription(value);
      const defaultCat = DEFAULT_CATEGORIES.find(c => c.id === 'classic') || DEFAULT_CATEGORIES[0];
      state.workouts = parsed.map(w => ({ ...w, category: defaultCat }));
      state.showWheel = state.workouts.length > 0;
      state.error = null;
    } catch {
      state.error = "Failed to parse workouts from description";
      state.showWheel = false;
    }
  });

  const handleSpinStart = $(() => {
    if (state.winner) {
      const spinResult: SpinResult = { 
        id: Date.now().toString(), 
        workout: state.winner, 
        timestamp: Date.now() 
      };
      state.spinHistory = [spinResult, ...state.spinHistory.slice(0, 9)];
      saveSpinHistory(state.spinHistory);
    }
    state.isSpinning = true;
    state.winner = null;
  });

  const handleSpinFinish = $((winner: Workout) => {
    state.winner = winner;
    state.isSpinning = false;
  });

  const handleStartWorkout = $(() => {
    if (state.winner?.url) window.open(state.winner.url, "_blank");
  });

  const displayWorkouts = state.workouts.flatMap(w => Array(Math.max(1, w.multiplier)).fill(w));

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <WorkoutNavigation />
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-6xl">
          {/* Breadcrumb and workout info */}
          <div class="mb-6">
            <nav class="text-sm text-slate-600 mb-2">
              <a href="/" class="hover:text-blue-600">Home</a> 
              <span class="mx-2">/</span> 
              <span class="text-slate-900 font-medium">{state.title}</span>
            </nav>
            
            {state.workoutContent && (
              <div class="bg-white rounded-lg border border-slate-200 p-4 mb-4">
                <h1 class="text-xl font-bold text-slate-900 mb-1">{state.workoutContent.frontmatter.title}</h1>
                {state.workoutContent.frontmatter.description && (
                  <p class="text-slate-600 text-sm mb-2">{state.workoutContent.frontmatter.description}</p>
                )}
                <div class="flex flex-wrap gap-2 text-xs">
                  {state.workoutContent.frontmatter.category && (
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {state.workoutContent.frontmatter.category}
                    </span>
                  )}
                  {state.workoutContent.frontmatter.difficulty && (
                    <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      Difficulty: {state.workoutContent.frontmatter.difficulty}/5
                    </span>
                  )}
                  {state.workoutContent.frontmatter.tags?.map((tag, i) => (
                    <span key={i} class="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr] lg:auto-rows-min">
            {/* Text input (read-only by default, but editable) */}
            <div class="order-1 lg:order-1 space-y-4" role="main">
              <div>
                <textarea
                  id="description"
                  rows={8}
                  ref={descriptionRef}
                  value={state.description}
                  onInput$={(e) => handleDescriptionChange((e.target as HTMLTextAreaElement).value)}
                  onKeyDown$={(e: KeyboardEvent) => {
                    if (e.ctrlKey && e.key === 'Enter' && state.workouts.length > 0) {
                      e.preventDefault();
                      spinTrigger.value++;
                    }
                  }}
                  placeholder="Option or [Option](link)|multiplier"
                  class="bg-white w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono text-sm"
                />
                <div class="text-xs text-slate-500 mt-2">
                  Pre-loaded with {state.title} • Press Ctrl+Enter to spin • Edit to customize
                </div>
              </div>
              {state.error && (
                <div class="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">{state.error}</div>
              )}
              
              {/* Desktop results directly below textarea */}
              <div class="hidden lg:block space-y-4 pt-4">
                <ResultDisplay
                  winner={state.winner}
                  isSpinning={state.isSpinning}
                  onStartWorkout={handleStartWorkout}
                />
                <PreviousResults spinHistory={state.spinHistory} />
                <div class="text-center pt-2">
                  <VersionInfo showBuildDate={true} />
                </div>
              </div>
            </div>

            {/* Wheel */}
            <div class="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 flex justify-center lg:justify-end self-start">
              <div class="relative w-full flex items-start justify-center">
                <div class="relative">
                  <Wheel
                    displayWorkouts={displayWorkouts}
                    onSpinStart={handleSpinStart}
                    onSpinFinish={handleSpinFinish}
                    triggerSpin={spinTrigger.value}
                  />
                  {displayWorkouts.length === 0 && (
                    <div class="absolute inset-0 z-30 flex items-center justify-center p-4 pointer-events-none">
                      <div class="max-w-lg w-full rounded-lg border border-slate-200 bg-white/95 backdrop-blur-sm p-5 shadow-xl text-left pointer-events-auto">
                        <h3 class="text-base font-semibold text-slate-800 flex items-center gap-2">
                          <span class="inline-block rounded bg-teal-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">No Workouts</span>
                          Unable to parse workout content
                        </h3>
                        <p class="mt-2 text-sm leading-relaxed text-slate-600">
                          This workout content might have parsing issues. Try editing the description above.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results & History (mobile only) */}
            <div class="order-3 lg:order-3 lg:col-start-1 lg:row-start-2 space-y-4 lg:hidden">
              <ResultDisplay
                winner={state.winner}
                isSpinning={state.isSpinning}
                onStartWorkout={handleStartWorkout}
              />
              <PreviousResults spinHistory={state.spinHistory} />
              <div class="text-center pt-2">
                <VersionInfo showBuildDate={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const workoutData = resolveValue(useWorkoutData);
  const title = `${workoutData.frontmatter.title} - Wheel of Gains`;
  const description = workoutData.frontmatter.description || `Pre-loaded workout: ${workoutData.frontmatter.title}`;
  
  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
    ],
  };
};