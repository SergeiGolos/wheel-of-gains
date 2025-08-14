import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../components/workout/workout-display-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutDisplayPage 
      initialWorkouts={WORKOUT_COLLECTIONS.strength.workouts}
      pageTitle={WORKOUT_COLLECTIONS.strength.title}
      pageDescription={WORKOUT_COLLECTIONS.strength.description}
      storageKey="wheelOfGains_workouts_strength"
    />
  );
});

export const head: DocumentHead = {
  title: "Strength Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Build muscle and power with strength-focused exercises. Get stronger every day!",
    },
  ],
};