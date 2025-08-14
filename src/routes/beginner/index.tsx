import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../components/workout/workout-display-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutDisplayPage
      initialWorkouts={WORKOUT_COLLECTIONS.beginner.workouts}
      pageTitle={WORKOUT_COLLECTIONS.beginner.title}
      pageDescription={WORKOUT_COLLECTIONS.beginner.description}
      storageKey="wheelOfGains_workouts_beginner"
    />
  );
});

export const head: DocumentHead = {
  title: "Beginner Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content:
        "Perfect workouts for beginners starting their fitness journey. Spin the wheel to discover your next exercise!",
    },
  ],
};
