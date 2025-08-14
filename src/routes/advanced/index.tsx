import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../components/workout/workout-display-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutDisplayPage 
      initialWorkouts={WORKOUT_COLLECTIONS.advanced.workouts}
      pageTitle={WORKOUT_COLLECTIONS.advanced.title}
      pageDescription={WORKOUT_COLLECTIONS.advanced.description}
      storageKey="wheelOfGains_workouts_advanced"
    />
  );
});

export const head: DocumentHead = {
  title: "Advanced Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Elite fitness challenges for advanced athletes. Extreme workouts await!",
    },
  ],
};