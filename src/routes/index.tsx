import { component$, useStore, useVisibleTask$, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { Wheel } from "../components/workout/wheel";
import { PreviousResults } from "../components/workout/previous-results";
import { ResultDisplay } from "../components/ui/result-display";
import { WorkoutNavigation } from "../components/navigation/workout-navigation";
import { VersionInfo } from "../components/ui/version-info";
import { decodeWorkoutCollection, createShareableUrl } from "../utils/zip-encoding";
import { parseWorkoutsFromDescription } from "../utils/markdown-workouts";
import type { Workout, SpinResult } from "../utils/workout-utils";
import {
  loadSpinHistory,
  saveSpinHistory,
  DEFAULT_CATEGORIES,
} from "../utils/workout-utils";

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
  const location = useLocation();
  // Support both old 'zip' and new 'data' parameters for backward compatibility
  const encodedData = location.url.searchParams.get("data") || location.url.searchParams.get("zip");
  
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

  // Load from zip URL if present
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (encodedData) {
      console.log("🔄 Loading from zip URL...");
      try {
        const collection = decodeWorkoutCollection(encodedData);
        state.title = collection.title;
        state.description = collection.description;
        
        // Handle both old format (workouts array) and new format (embedded in description)
        let workouts: Workout[] = [];
        
        if (collection.workouts && collection.workouts.length > 0) {
          // Old format: workouts in array
          console.log("📋 Using workouts from array (old format):", collection.workouts.length);
          workouts = collection.workouts;
        } else {
          // New format: parse workouts from description
          console.log("📝 Parsing workouts from description (new format)");
          const parsedWorkouts = parseWorkoutsFromDescription(collection.description);
          const defaultCategory = DEFAULT_CATEGORIES.find(cat => cat.id === 'classic') || DEFAULT_CATEGORIES[0];
          
          workouts = parsedWorkouts.map(workout => ({
            ...workout,
            category: defaultCategory
          }));
        }
        
        state.workouts = workouts;
        state.showWheel = state.workouts.length > 0;
        console.log("✅ Loaded collection with", state.workouts.length, "workouts");
      } catch (error) {
        console.error("❌ Failed to decode zip data:", error);
        state.error = "Failed to load workout collection";
      }
    }

    // Load spin history
    const savedHistory = loadSpinHistory();
    state.spinHistory = savedHistory;
  });

  // Auto-generate workouts when description changes
  const handleDescriptionChange = $((value: string) => {
    console.log("📝 Description changed, parsing workouts...");
    state.description = value;
    
    try {
      const parsedWorkouts = parseWorkoutsFromDescription(value);
      const defaultCategory = DEFAULT_CATEGORIES.find(cat => cat.id === 'classic') || DEFAULT_CATEGORIES[0];
      
      state.workouts = parsedWorkouts.map(workout => ({
        ...workout,
        category: defaultCategory
      }));
      
      state.showWheel = state.workouts.length > 0;
      state.error = null;
      
      console.log("✅ Generated", state.workouts.length, "workouts");
    } catch (error) {
      console.error("❌ Failed to parse workouts:", error);
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
      // For URL generation, we need to use the workouts array format
      // The description is used for display and parsing, but workouts array is for encoding
      const collection = {
        title: "Custom Workout Collection",
        description: state.description,
        workouts: state.workouts
      };

      state.shareUrl = createShareableUrl(collection);
      console.log("🔗 Generated share URL:", state.shareUrl);
    } catch (error) {
      console.error("❌ Failed to generate share URL:", error);
      state.error = "Failed to generate share URL";
    }
  });

  const handleShare = $(() => {
    if (!state.shareUrl) {
      handleGenerateShareUrl();
    }
    if (state.shareUrl) {
      window.open(state.shareUrl, "_blank");
    }
  });

  const handleCopy = $(() => {
    if (!state.shareUrl) {
      handleGenerateShareUrl();
    }
    if (state.shareUrl) {
      navigator.clipboard.writeText(state.shareUrl);
    }
  });

  // Wheel interaction handlers
  const handleSpinStart = $(() => {
    if (state.winner) {
      const spinResult: SpinResult = {
        id: Date.now().toString(),
        workout: state.winner,
        timestamp: Date.now(),
      };
      state.spinHistory = [spinResult, ...state.spinHistory.slice(0, 9)]; // Keep last 10
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
    if (state.winner?.url) {
      window.open(state.winner.url, "_blank");
    }
  });

  // Expanded workouts for wheel display
  const displayWorkouts = state.workouts.flatMap((workout) =>
    Array(Math.max(1, workout.multiplier)).fill(workout)
  );

  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <WorkoutNavigation />
      
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-6xl">
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            
            {/* Left Column - Create Workout Form */}
            <div class="lg:col-span-1">
              <main class="space-y-6" role="main">
                
                {/* Create Workout Form */}
                <div class="space-y-4">
                
                {/* Description/Workouts Input */}
                <div>
                  <textarea
                    id="description"
                    rows={8}
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
                  
                  <div class="flex gap-2 mt-2">
                    <button
                      onClick$={handleShare}
                      disabled={state.workouts.length === 0}
                      class="rounded-md bg-blue-600 p-2 text-sm font-semibold text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                      title="Share"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                      </svg>
                    </button>
                    
                    <button
                      onClick$={handleCopy}
                      disabled={state.workouts.length === 0}
                      class="rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-500 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                  
                  <div class="text-xs text-slate-500 mt-1">
                    Press Ctrl+Enter to spin the wheel
                  </div>
                </div>





                {/* Error Display */}
                {state.error && (
                  <div class="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                    {state.error}
                  </div>
                )}

            </div>

            {/* Version Info */}
            <div class="text-center mt-8">
              <VersionInfo showBuildDate={true} />
            </div>

              </main>
            </div>

            {/* Right Column - Wheel Section */}            
              <div class="lg:col-span-2 space-y-4">
                
                {/* Wheel - Centered with proper spacing */}
                <div class="flex justify-center lg:justify-end">
                  <div class="max-w-full">
                    <Wheel
                      displayWorkouts={displayWorkouts}
                      onSpinStart={handleSpinStart}
                      onSpinFinish={handleSpinFinish}
                      triggerSpin={spinTrigger.value}
                    />
                  </div>
                </div>

                {/* Results & History */}
                <div class="space-y-4">
                  <ResultDisplay
                    winner={state.winner}
                    isSpinning={state.isSpinning}
                    onStartWorkout={handleStartWorkout}
                  />
                  
                  <PreviousResults spinHistory={state.spinHistory} />
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
    {
      name: "description",
      content: "Create custom workout collections with the Wheel of Gains. Add workouts, set multipliers, and share your collection with others.",
    },
    {
      property: "og:title", 
      content: "Wheel of Gains - Create Your Custom Workout Collection",
    },
    {
      property: "og:description",
      content: "Create custom workout collections with the Wheel of Gains. Add workouts, set multipliers, and share your collection with others.",
    },
  ],
};
