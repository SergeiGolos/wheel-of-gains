import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutWheelPage } from "../../components/workout/workout-wheel-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutWheelPage 
      initialWorkouts={WORKOUT_COLLECTIONS.intermediate.workouts}
      pageTitle={WORKOUT_COLLECTIONS.intermediate.title}
      pageDescription={WORKOUT_COLLECTIONS.intermediate.description}
      storageKey="wheelOfGains_workouts_intermediate"
    />
  );
});

export const head: DocumentHead = {
  title: "Intermediate Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Step up your fitness game with intermediate workouts. Challenge yourself with new exercises!",
    },
  ],
};