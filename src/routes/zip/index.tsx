import { component$, useStore, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useLocation } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../components/workout/workout-display-page";
import { decodeWorkoutCollection } from "../../utils/zip-encoding";
import type { Workout } from "../../utils/workout-utils";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

interface ZipPageState {
  workouts: Workout[];
  pageTitle: string;
  pageDescription: string;
  error: string | null;
  isLoading: boolean;
}

export default component$(() => {
  const location = useLocation();
  
  const state = useStore<ZipPageState>({
    workouts: WORKOUT_COLLECTIONS.classic.workouts, // Fallback
    pageTitle: "Shared Workout Collection",
    pageDescription: "A custom workout collection shared via link",
    error: null,
    isLoading: true,
  });

  useTask$(({ track }) => {
    // Track location changes
    track(() => location.url.search);
    
    try {
      state.isLoading = true;
      state.error = null;
      
      // Extract data from URL
      const encodedData = location.url.searchParams.get("data");
      
      if (!encodedData) {
        state.error = "No workout data found in URL. Please check your link.";
        state.workouts = WORKOUT_COLLECTIONS.classic.workouts;
        state.pageTitle = "Classic Mix";
        state.pageDescription = WORKOUT_COLLECTIONS.classic.description;
        state.isLoading = false;
        return;
      }

      // Decode the workout collection
      const decodedCollection = decodeWorkoutCollection(encodedData);
      
      state.workouts = decodedCollection.workouts;
      state.pageTitle = decodedCollection.title;
      state.pageDescription = decodedCollection.description;
      state.isLoading = false;
      
    } catch (error) {
      console.error("Failed to decode workout collection:", error);
      state.error = "Failed to load workout collection. The link may be corrupted or invalid.";
      state.workouts = WORKOUT_COLLECTIONS.classic.workouts;
      state.pageTitle = "Classic Mix";
      state.pageDescription = WORKOUT_COLLECTIONS.classic.description;
      state.isLoading = false;
    }
  });

  if (state.isLoading) {
    return (
      <div class="min-h-screen bg-slate-100 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p class="text-slate-600">Loading your workout collection...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {state.error && (
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 mx-4">
          <div class="flex">
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">
                Notice
              </h3>
              <div class="mt-1 text-sm text-yellow-700">
                <p>{state.error}</p>
                <p class="mt-2">Showing default workout collection instead.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <WorkoutDisplayPage
        initialWorkouts={state.workouts}
        pageTitle={state.pageTitle}
        pageDescription={state.pageDescription}
        storageKey="wheelOfGains_workouts_zip"
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Shared Workout Collection - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "A custom workout collection shared via link",
    },
    {
      name: "keywords",
      content: "workout, fitness, exercise, shared, custom, wheel, gains, training",
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
      content: "Shared Workout Collection - Wheel of Gains",
    },
    {
      property: "og:description",
      content: "A custom workout collection shared via link",
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