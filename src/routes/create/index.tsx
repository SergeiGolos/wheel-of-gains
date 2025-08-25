import { component$, useStore, useSignal, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { encodeWorkoutCollection, type EncodedWorkoutCollection } from "../../utils/zip-encoding";
import type { Workout } from "../../utils/workout-utils";
import { DEFAULT_CATEGORIES } from "../../utils/workout-utils";
import { WorkoutNavigation } from "../../components/navigation/workout-navigation";

interface CreateWheelState {
  title: string;
  description: string;
  workouts: Array<{
    name: string;
    multiplier: number;
    url: string;
  }>;
  shareUrl: string | null;
  isGenerating: boolean;
  error: string | null;
}

export default component$(() => {
  const state = useStore<CreateWheelState>({
    title: "",
    description: "",
    workouts: [
      { name: "", multiplier: 1, url: "" },
      { name: "", multiplier: 1, url: "" },
      { name: "", multiplier: 1, url: "" },
    ],
    shareUrl: null,
    isGenerating: false,
    error: null,
  });

  const isShareUrlCopied = useSignal(false);

  const addWorkout = $(() => {
    state.workouts.push({ name: "", multiplier: 1, url: "" });
  });

  const removeWorkout = $((index: number) => {
    if (state.workouts.length > 1) {
      state.workouts.splice(index, 1);
    }
  });

  const generateShareUrl = $(async () => {
    try {
      state.isGenerating = true;
      state.error = null;

      // Validate inputs
      if (!state.title.trim()) {
        state.error = "Please provide a title for your workout collection";
        state.isGenerating = false;
        return;
      }

      const validWorkouts = state.workouts.filter(w => w.name.trim());
      if (validWorkouts.length < 3) {
        state.error = "Please add at least 3 workouts";
        state.isGenerating = false;
        return;
      }

      // Convert to Workout objects
      const workouts: Workout[] = validWorkouts.map((workout, index) => ({
        id: `custom-${Date.now()}-${index}`,
        name: workout.name.trim(),
        multiplier: workout.multiplier,
        url: workout.url.trim() || `https://www.google.com/search?q=${encodeURIComponent(workout.name.trim())}%20workout`,
        category: DEFAULT_CATEGORIES[0], // Default to Strength Training
      }));

      // Create encoded collection
      const collection: EncodedWorkoutCollection = {
        title: state.title.trim(),
        description: state.description.trim() || "A custom workout collection",
        workouts,
      };

      const encoded = encodeWorkoutCollection(collection);
      
      // Construct URL relative to current location to handle different deployment scenarios
      const currentUrl = new URL(window.location.href);
      const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
      
      // Determine the base path from current location
      // Current path: /wheel-of-gains/create/ -> base path: /wheel-of-gains/
      const currentPath = currentUrl.pathname;
      const basePath = currentPath.includes('/wheel-of-gains/') 
        ? '/wheel-of-gains/' 
        : '/';
      
      state.shareUrl = `${baseUrl}${basePath}zip?data=${encodeURIComponent(encoded)}`;

      state.isGenerating = false;
    } catch (error) {
      console.error("Failed to generate share URL:", error);
      state.error = "Failed to generate share URL. Please try again.";
      state.isGenerating = false;
    }
  });

  const copyToClipboard = $(async () => {
    if (state.shareUrl) {
      try {
        await navigator.clipboard.writeText(state.shareUrl);
        isShareUrlCopied.value = true;
        setTimeout(() => {
          isShareUrlCopied.value = false;
        }, 3000);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  });

  return (
    <>
      <WorkoutNavigation />
      
      <div class="max-w-4xl mx-auto p-6 space-y-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-800 mb-2">Create Custom Wheel</h1>
          <p class="text-slate-600">Build your own workout collection and share it with others</p>
        </div>

        {/* Collection Info */}
        <div class="bg-white border border-slate-200 rounded-lg p-6">
          <h2 class="text-lg font-semibold text-slate-700 mb-4">Collection Details</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Collection Title *
              </label>
              <input
                type="text"
                value={state.title}
                onInput$={(e) => (state.title = (e.target as HTMLInputElement).value)}
                class="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., My Custom HIIT Workout"
                maxLength={60}
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={state.description}
                onInput$={(e) => (state.description = (e.target as HTMLTextAreaElement).value)}
                class="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Describe your workout collection..."
                rows={3}
                maxLength={200}
              />
            </div>
          </div>
        </div>

        {/* Workouts */}
        <div class="bg-white border border-slate-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-slate-700">Workouts</h2>
            <button
              onClick$={addWorkout}
              class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Add Workout
            </button>
          </div>

          <div class="space-y-4">
            {state.workouts.map((workout, index) => (
              <div key={index} class="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
                <div class="flex-1">
                  <input
                    type="text"
                    value={workout.name}
                    onInput$={(e) => (workout.name = (e.target as HTMLInputElement).value)}
                    class="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Exercise name"
                  />
                </div>
                <div class="w-24">
                  <label class="block text-xs text-slate-600 mb-1">Multiplier</label>
                  <select
                    value={workout.multiplier}
                    onChange$={(e) => (workout.multiplier = parseInt((e.target as HTMLSelectElement).value))}
                    class="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                  >
                    <option value={1}>1x</option>
                    <option value={2}>2x</option>
                    <option value={3}>3x</option>
                    <option value={0.5}>0.5x</option>
                  </select>
                </div>
                <div class="flex-1">
                  <input
                    type="url"
                    value={workout.url}
                    onInput$={(e) => (workout.url = (e.target as HTMLInputElement).value)}
                    class="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Optional: Link to instructions"
                  />
                </div>
                <button
                  onClick$={() => removeWorkout(index)}
                  class="p-2 text-red-600 hover:bg-red-50 rounded focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  disabled={state.workouts.length <= 1}
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <p class="text-sm text-slate-500 mt-4">
            Add at least 3 workouts. If you don't provide a link, we'll generate a Google search link automatically.
          </p>
        </div>

        {/* Error Display */}
        {state.error && (
          <div class="bg-red-50 border border-red-200 rounded-lg p-4">
            <p class="text-red-700">{state.error}</p>
          </div>
        )}

        {/* Generate Share URL */}
        <div class="bg-white border border-slate-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-slate-700">Share Your Wheel</h2>
            <button
              onClick$={generateShareUrl}
              disabled={state.isGenerating}
              class="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.isGenerating ? "Generating..." : "Generate Share Link"}
            </button>
          </div>

          {state.shareUrl && (
            <div class="space-y-3">
              <div class="p-3 bg-slate-50 border border-slate-200 rounded">
                <p class="text-sm text-slate-700 mb-2">Shareable Link:</p>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    value={state.shareUrl}
                    readOnly
                    class="flex-1 p-2 text-sm font-mono bg-white border border-slate-300 rounded"
                  />
                  <button
                    onClick$={copyToClipboard}
                    class={`px-4 py-2 text-sm rounded focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                      isShareUrlCopied.value
                        ? "bg-green-600 text-white"
                        : "bg-teal-600 text-white hover:bg-teal-700"
                    }`}
                  >
                    {isShareUrlCopied.value ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <div class="text-center">
                <a
                  href={state.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                  </svg>
                  Test Your Wheel
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Create Custom Wheel - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Create your own custom workout wheel and share it with others",
    },
    {
      name: "keywords",
      content: "workout, fitness, exercise, custom, wheel, gains, training, create",
    },
    {
      name: "author",
      content: "Wheel of Gains",
    },
    {
      name: "theme-color",
      content: "#0f172a",
    },
    {
      property: "og:title",
      content: "Create Custom Wheel - Wheel of Gains",
    },
    {
      property: "og:description",
      content: "Create your own custom workout wheel and share it with others",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
  links: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/icons/icon-32.png",
      sizes: "32x32",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/icon-180.png",
      sizes: "180x180",
    },
  ],
};