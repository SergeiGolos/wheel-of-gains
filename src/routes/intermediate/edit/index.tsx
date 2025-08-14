import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage
      initialWorkouts={WORKOUT_COLLECTIONS.intermediate.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.intermediate.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.intermediate.title} workouts`}
      storageKey="wheelOfGains_workouts_intermediate"
      categorySlug="intermediate"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Intermediate Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your intermediate workout collection",
    },
  ],
};
