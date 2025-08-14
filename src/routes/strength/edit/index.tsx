import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage
      initialWorkouts={WORKOUT_COLLECTIONS.strength.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.strength.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.strength.title} workouts`}
      storageKey="wheelOfGains_workouts_strength"
      categorySlug="strength"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Strength Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your strength workout collection",
    },
  ],
};
