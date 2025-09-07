import { component$, useStore, useTask$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../../components/workout/workout-display-page";
import { loadWorkoutCollection } from "../../../utils/collection-loader";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";
import type { Workout } from "../../../utils/workout-utils";

interface WheelPageState {
  workouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  collectionId: string;
  error: string | null;
  isLoading: boolean;
}

export default component$(() => {
  const location = useLocation();
  const hasCollection = useSignal(false);

  const state = useStore<WheelPageState>({
    workouts: WORKOUT_COLLECTIONS.classic.workouts, // Fallback
    pageTitle: "Workout Collection",
    pageDescription: "A custom workout collection",
    collectionId: "classic",
    error: null,
    isLoading: true,
  });

  useTask$(({ track }) => {
    // Track location changes
    track(() => location.url.pathname);

    const loadCollection = async () => {
      try {
        state.isLoading = true;
        state.error = null;

        // Extract collection ID from URL path
        const pathParts = location.url.pathname.split("/");
        const collectionId =
          pathParts[pathParts.length - 2] || pathParts[pathParts.length - 1];

        if (!collectionId) {
          throw new Error("No collection ID found in URL");
        }

        state.collectionId = collectionId;

        // Load collection data
        const collection = await loadWorkoutCollection(collectionId);

        if (!collection) {
          // Fallback to classic collection
          state.error = `Collection "${collectionId}" not found. Using classic collection instead.`;
          state.workouts = WORKOUT_COLLECTIONS.classic.workouts;
          state.pageTitle = WORKOUT_COLLECTIONS.classic.title;
          state.pageDescription = WORKOUT_COLLECTIONS.classic.description;
          hasCollection.value = false;
        } else {
          state.workouts = collection.workouts;
          state.pageTitle = collection.title;
          state.pageDescription = collection.description;
          hasCollection.value = true;
        }

        state.isLoading = false;
      } catch (error) {
        console.error("Failed to load workout collection:", error);
        state.error =
          "Failed to load workout collection. Using classic collection instead.";
        state.workouts = WORKOUT_COLLECTIONS.classic.workouts;
        state.pageTitle = WORKOUT_COLLECTIONS.classic.title;
        state.pageDescription = WORKOUT_COLLECTIONS.classic.description;
        hasCollection.value = false;
        state.isLoading = false;
      }
    };

    loadCollection();
  });

  if (state.isLoading) {
    return (
      <div class="flex min-h-screen items-center justify-center bg-slate-100">
        <div class="text-center">
          <div class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-slate-600"></div>
          <p class="text-slate-600">Loading workout collection...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {state.error && (
        <div class="mx-4 mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">Notice</h3>
              <div class="mt-1 text-sm text-yellow-700">
                <p>{state.error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <WorkoutDisplayPage
        initialWorkouts={state.workouts}
        pageTitle={state.pageTitle}
        pageDescription={state.pageDescription}
        storageKey={`wheelOfGains_workouts_${state.collectionId}`}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Wheel of Gains - Dynamic Workout Collection",
  meta: [
    {
      name: "description",
      content: "A dynamic workout collection loaded by ID",
    },
    {
      name: "keywords",
      content: "workout, fitness, exercise, dynamic, wheel, gains, training",
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
      content: "Wheel of Gains - Dynamic Workout Collection",
    },
    {
      property: "og:description",
      content: "A dynamic workout collection loaded by ID",
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
