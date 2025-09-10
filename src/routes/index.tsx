import { component$, useStore, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Wheel } from "../components/workout/wheel";
import { PreviousResults } from "../components/workout/previous-results";
import { ResultDisplay } from "../components/ui/result-display";
import { WorkoutNavigation } from "../components/navigation/workout-navigation";
import { VersionInfo } from "../components/ui/version-info";
import { decodeWorkoutCollection, createShareableUrl, extractDataFromUrl } from "../utils/zip-encoding";
import { parseWorkoutsFromDescription } from "../utils/markdown-workouts";
import type { Workout, SpinResult } from "../utils/workout-utils";
import { loadSpinHistory, saveSpinHistory, DEFAULT_CATEGORIES } from "../utils/workout-utils";

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
}

export default component$(() => {
  console.log('[DEBUG] Main component initializing...');
  const location = useLocation();
  // Note: On SSG builds, location.url may not include the runtime query string.
  // We'll re-read from window inside useVisibleTask$ as a fallback.
  const initialEncodedData = location.url.searchParams.get("data") || location.url.searchParams.get("zip");
  console.log('[DEBUG] Encoded data from URL (initial SSR/location):', !!initialEncodedData);
  const state = useStore<AppState>({
    title: "",
    description: "",
    workouts: [],
    winner: null,
    spinHistory: [],
    isSpinning: false,
    showWheel: false,
    error: null,
    shareUrl: null,
  });
  const spinTrigger = useSignal(0);
  const descriptionRef = useSignal<HTMLTextAreaElement>();

  // Load data from encoded URL
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    try {
    console.log('[DEBUG] useVisibleTask executing - checking encodedData (initial):', !!initialEncodedData);
    console.log('[DEBUG] Current URL:', typeof window !== 'undefined' ? window.location.href : 'SSR');
      console.log('[DEBUG] User agent:', typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR');
      
    // Read encoded data: prefer location (when present), else fallback to window URL parsing
    const runtimeEncodedData = initialEncodedData || extractDataFromUrl() || undefined;
    console.log('[DEBUG] Encoded data resolved at runtime:', !!runtimeEncodedData);

    if (runtimeEncodedData) {
        try {
          console.log('[DEBUG] Decoding workout collection...');
      const collection = decodeWorkoutCollection(runtimeEncodedData);
          state.title = collection.title;
          state.description = collection.description;
          let workouts: Workout[] = [];
          if (collection.workouts && collection.workouts.length > 0) {
            workouts = collection.workouts;
          } else {
            const parsed = parseWorkoutsFromDescription(collection.description);
            const defaultCat = DEFAULT_CATEGORIES.find(c => c.id === 'classic') || DEFAULT_CATEGORIES[0];
            workouts = parsed.map(w => ({ ...w, category: defaultCat }));
          }
          state.workouts = workouts;
          state.showWheel = workouts.length > 0;
          console.log('[DEBUG] Successfully loaded workout collection:', workouts.length, 'workouts');
        } catch (error) {
          console.error('[DEBUG] Failed to decode workout collection:', error);
          state.error = "Failed to load workout collection";
        }
      }
      
      console.log('[DEBUG] Loading spin history...');
      try {
        state.spinHistory = loadSpinHistory();
        console.log('[DEBUG] Loaded spin history:', state.spinHistory.length, 'items');
      } catch (error) {
        console.error('[DEBUG] Failed to load spin history:', error);
        state.spinHistory = []; // Fallback to empty array
      }
    } catch (error) {
      console.error('[DEBUG] useVisibleTask failed:', error);
      state.error = "Failed to initialize application";
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

  const handleGenerateShareUrl = $(() => {
    if (state.workouts.length === 0) {
      state.error = "Add some workouts first!";
      return;
    }
    try {
      const collection = { title: "Custom Workout Collection", description: state.description, workouts: state.workouts };
      state.shareUrl = createShareableUrl(collection);
  } catch {
      state.error = "Failed to generate share URL";
    }
  });

  const handleShare = $(() => {
    if (!state.shareUrl) handleGenerateShareUrl();
    if (state.shareUrl) window.open(state.shareUrl, "_blank");
  });

  const handleSpinStart = $(() => {
    if (state.winner) {
      const spinResult: SpinResult = { id: Date.now().toString(), workout: state.winner, timestamp: Date.now() };
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

  // Autofocus when empty
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    try {
      console.log('[DEBUG] Autofocus useVisibleTask executing, workouts:', state.workouts.length);
      if (state.workouts.length === 0 && descriptionRef.value) {
        console.log('[DEBUG] Setting focus to textarea');
        setTimeout(() => descriptionRef.value?.focus(), 0);
      }
    } catch (error) {
      console.error('[DEBUG] Autofocus failed:', error);
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <WorkoutNavigation />
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-6xl">
          {/* Debug info for GitHub Pages */}
          <noscript>
            <div class="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700 mb-4">
              JavaScript is required for this application to work properly.
            </div>
          </noscript>
          
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr] lg:auto-rows-min">
            {/* 1. Text input */}
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
                <div class="text-xs text-slate-500 mt-2">Press Ctrl+Enter to spin the wheel</div>
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

            {/* 2. Wheel */}
            <div class="order-2 lg:order-2 lg:col-start-2 lg:row-start-1 flex justify-center lg:justify-end self-start">
              <div class="relative w-full flex items-start justify-center">
                <button
                  onClick$={handleShare}
                  disabled={state.workouts.length === 0}
                  class="absolute -top-3 -right-3 z-30 rounded-md bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-500 focus:outline-none disabled:opacity-50"
                  title="Share collection"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
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
                          <span class="inline-block rounded bg-teal-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">Empty Wheel</span>
                          No wheel segments defined
                        </h3>
                        <p class="mt-2 text-sm leading-relaxed text-slate-600">
                          Enter one workout per line. Optional multiplier with <code class="rounded bg-slate-100 px-1 py-0.5 text-[11px] font-mono">|number</code>. Use markdown links for direct videos.
                        </p>
                        <div class="mt-3 rounded-md bg-slate-50 border border-slate-200 p-3 text-xs font-mono text-slate-700 whitespace-pre overflow-x-auto">
{`Push Ups|3\n[Burpees](https://youtu.be/abcd1234)\nMountain Climbers|2\n[Jump Rope Basics](https://example.com/jumprope)|4`}
                        </div>
                        <ul class="mt-3 list-disc pl-5 text-xs text-slate-600 space-y-1">
                          <li><span class="font-semibold">Plain text</span> auto-generates a Google search link.</li>
                          <li><span class="font-semibold">[Title](url)</span> uses your URL.</li>
                          <li><span class="font-semibold">|3</span> repeats a workout more often.</li>
                          <li>Lines starting with <code class="bg-slate-100 px-1 py-0.5 rounded text-[10px] font-mono">#</code> or <code class="bg-slate-100 px-1 py-0.5 rounded text-[10px] font-mono">//</code> are ignored.</li>
                          <li>Press <kbd class="bg-slate-100 px-1 rounded text-[11px]">Ctrl+Enter</kbd> to spin once you have workouts.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Results & History (mobile only; desktop version above) */}
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

export const head: DocumentHead = {
  title: "Wheel of Gains - Create Your Custom Workout Collection",
  meta: [
    { name: "description", content: "Create custom workout collections with the Wheel of Gains. Add workouts, set multipliers, and share your collection with others." },
    { property: "og:title", content: "Wheel of Gains - Create Your Custom Workout Collection" },
    { property: "og:description", content: "Create custom workout collections with the Wheel of Gains. Add workouts, set multipliers, and share your collection with others." },
  ],
};
