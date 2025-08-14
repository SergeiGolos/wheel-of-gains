import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutDisplayPage } from "../../components/workout/workout-display-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutDisplayPage 
      initialWorkouts={WORKOUT_COLLECTIONS.cardio.workouts}
      pageTitle={WORKOUT_COLLECTIONS.cardio.title}
      pageDescription={WORKOUT_COLLECTIONS.cardio.description}
      storageKey="wheelOfGains_workouts_cardio"
    />
  );
});

export const head: DocumentHead = {
  title: "Cardio Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "High-intensity cardio workouts to get your heart pumping. Burn calories and build endurance!",
    },
  ],
};