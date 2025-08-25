import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../components/workout/workout-display-page";
import { WORKOUT_COLLECTIONS } from "../utils/workout-collections";

export default component$(() => {
  // Keep the classic collection as the main landing page for now
  // This ensures backward compatibility
  return (
    <WorkoutDisplayPage
      initialWorkouts={WORKOUT_COLLECTIONS.classic.workouts}
      pageTitle={WORKOUT_COLLECTIONS.classic.title}
      pageDescription={WORKOUT_COLLECTIONS.classic.description}
      storageKey="wheelOfGains_workouts_classic"
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
