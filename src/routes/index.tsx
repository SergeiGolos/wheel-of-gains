import { component$, useStore, useSignal, useTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../components/workout/workout-display-page";
import { decodeWorkoutCollection, encodeWorkoutCollection, type EncodedWorkoutCollection } from "../utils/zip-encoding";
import type { Workout } from "../utils/workout-utils";
import { DEFAULT_CATEGORIES } from "../utils/workout-utils";
import { WorkoutNavigation } from "../components/navigation/workout-navigation";

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

interface WheelState {
  workouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  error: string | null;
  isLoading: boolean;
}

export default component$(() => {
  const location = useLocation();
  const encodedData = location.url.searchParams.get("zip");
  
  // If we have zip data, show wheel mode. Otherwise, show create mode.
  if (encodedData) {
    return <WheelMode encodedData={encodedData} />;
  }
  
  return <CreateWheelMode />;
});

const CreateWheelMode = component$(() => {
  const location = useLocation();
  
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

      const validWorkouts = state.workouts.filter((w) => w.name.trim());
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
        url:
          workout.url.trim() ||
          `https://www.google.com/search?q=${encodeURIComponent(workout.name.trim())}%20workout`,
        category: DEFAULT_CATEGORIES[0], // Default to Strength Training
      }));

      // Create encoded collection
      const collection: EncodedWorkoutCollection = {
        title: state.title.trim(),
        description: state.description.trim() || "A custom workout collection",
        workouts,
      };

      const encoded = encodeWorkoutCollection(collection);

      // Construct URL using current base URL with zip parameter
      const currentUrl = new URL(window.location.href);
      const baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;

      // Determine the base path from current location
      const currentPath = currentUrl.pathname;
      const basePath = currentPath.includes("/wheel-of-gains/")
        ? "/wheel-of-gains/"
        : "/";

      state.shareUrl = `${baseUrl}${basePath}?zip=${encodeURIComponent(encoded)}`;

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

      <div class="mx-auto max-w-4xl space-y-6 p-6">
        <div class="mb-8 text-center">
          <h1 class="mb-2 text-3xl font-bold text-slate-800">
            Create Your Workout Wheel
          </h1>
          <p class="text-slate-600">
            Build your own custom workout collection and share it with others
          </p>
        </div>

        {/* Collection Info */}
        <div class="rounded-lg border border-slate-200 bg-white p-6">
          <h2 class="mb-4 text-lg font-semibold text-slate-700">
            Collection Details
          </h2>
          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Collection Title *
              </label>
              <input
                type="text"
                value={state.title}
                onInput$={(e) =>
                  (state.title = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border border-slate-300 p-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                placeholder="e.g., My Custom HIIT Workout"
                maxLength={60}
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                value={state.description}
                onInput$={(e) =>
                  (state.description = (e.target as HTMLTextAreaElement).value)
                }
                class="w-full rounded-md border border-slate-300 p-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                placeholder="Describe your workout collection..."
                rows={3}
                maxLength={200}
              />
            </div>
          </div>
        </div>

        {/* Workouts */}
        <div class="rounded-lg border border-slate-200 bg-white p-6">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-700">Workouts</h2>
            <button
              onClick$={addWorkout}
              class="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Add Workout
            </button>
          </div>

          <div class="space-y-4">
            {state.workouts.map((workout, index) => (
              <div
                key={index}
                class="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
              >
                <div class="flex-1">
                  <input
                    type="text"
                    value={workout.name}
                    onInput$={(e) =>
                      (workout.name = (e.target as HTMLInputElement).value)
                    }
                    class="w-full rounded border border-slate-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                    placeholder="Exercise name"
                  />
                </div>
                <div class="w-24">
                  <label class="mb-1 block text-xs text-slate-600">
                    Multiplier
                  </label>
                  <select
                    value={workout.multiplier}
                    onChange$={(e) =>
                      (workout.multiplier = parseInt(
                        (e.target as HTMLSelectElement).value,
                      ))
                    }
                    class="w-full rounded border border-slate-300 p-2 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
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
                    onInput$={(e) =>
                      (workout.url = (e.target as HTMLInputElement).value)
                    }
                    class="w-full rounded border border-slate-300 p-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-500"
                    placeholder="Optional: Link to instructions"
                  />
                </div>
                <button
                  onClick$={() => removeWorkout(index)}
                  class="rounded p-2 text-red-600 hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  disabled={state.workouts.length <= 1}
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <p class="mt-4 text-sm text-slate-500">
            Add at least 3 workouts. If you don't provide a link, we'll generate
            a Google search link automatically.
          </p>
        </div>

        {/* Error Display */}
        {state.error && (
          <div class="rounded-lg border border-red-200 bg-red-50 p-4">
            <p class="text-red-700">{state.error}</p>
          </div>
        )}

        {/* Generate Share URL */}
        <div class="rounded-lg border border-slate-200 bg-white p-6">
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-700">
              Share Your Wheel
            </h2>
            <button
              onClick$={generateShareUrl}
              disabled={state.isGenerating}
              class="rounded-lg bg-teal-600 px-6 py-3 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state.isGenerating ? "Generating..." : "Generate Share Link"}
            </button>
          </div>

          {state.shareUrl && (
            <div class="space-y-3">
              <div class="rounded border border-slate-200 bg-slate-50 p-3">
                <p class="mb-2 text-sm text-slate-700">Shareable Link:</p>
                <div class="flex items-center gap-2">
                  <input
                    type="text"
                    value={state.shareUrl}
                    readOnly
                    class="flex-1 rounded border border-slate-300 bg-white p-2 font-mono text-sm"
                  />
                  <button
                    onClick$={copyToClipboard}
                    class={`rounded px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
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
                  class="inline-flex items-center gap-2 rounded bg-slate-600 px-4 py-2 text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
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

const WheelMode = component$(({ encodedData }: { encodedData: string }) => {
  const hasCustomData = useSignal(false);
  
  const state = useStore<WheelState>({
    workouts: [],
    pageTitle: "Custom Workout Collection",
    pageDescription: "A custom workout collection shared via link",
    error: null,
    isLoading: true,
  });

  useTask$(() => {
    try {
      state.isLoading = true;
      state.error = null;

      // Decode the workout collection
      const decodedCollection = decodeWorkoutCollection(encodedData);

      state.workouts = decodedCollection.workouts;
      state.pageTitle = decodedCollection.title;
      state.pageDescription = decodedCollection.description;
      hasCustomData.value = true;
      state.isLoading = false;
    } catch (error) {
      console.error("Failed to decode workout collection:", error);
      state.error =
        "Failed to load workout collection. The link may be corrupted or invalid.";
      state.workouts = [];
      hasCustomData.value = false;
      state.isLoading = false;
    }
  });

  if (state.isLoading) {
    return (
      <div class="flex min-h-screen items-center justify-center bg-slate-100">
        <div class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-slate-600"></div>
          <p class="text-slate-600">Loading your workout collection...</p>
        </div>
      </div>
    );
  }

  if (state.error || state.workouts.length === 0) {
    return (
      <div class="mx-auto max-w-2xl p-6">
        <div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h2 class="mb-2 text-xl font-semibold text-red-800">
            Unable to Load Collection
          </h2>
          <p class="mb-4 text-red-700">
            {state.error || "The workout collection could not be loaded."}
          </p>
          <a
            href="/"
            class="inline-flex items-center gap-2 rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Create New Wheel
          </a>
        </div>
      </div>
    );
  }

  return (
    <WorkoutDisplayPage
      initialWorkouts={state.workouts}
      pageTitle={state.pageTitle}
      pageDescription={state.pageDescription}
      storageKey={hasCustomData.value ? undefined : "wheelOfGains_workouts_shared"}
    />
  );
});

export const head: DocumentHead = {
  title: "Wheel of Gains - Random Workout Selector",
  meta: [
    {
      name: "description",
      content:
        "Spin the wheel to randomly select your next workout challenge. A fun way to stay motivated and try new exercises!",
    },
    {
      name: "keywords",
      content: "workout, fitness, exercise, random, wheel, gains, training",
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
      content: "Wheel of Gains - Random Workout Selector",
    },
    {
      property: "og:description",
      content: "Spin the wheel to randomly select your next workout challenge!",
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
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      href: "/icons/icon-180.png",
      sizes: "180x180",
    },
  ],
};
