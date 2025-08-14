import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage
      initialWorkouts={WORKOUT_COLLECTIONS.classic.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.classic.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.classic.title} workouts`}
      storageKey="wheelOfGains_workouts_classic"
      categorySlug=""
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Classic Mix - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your classic mix workout collection",
    },
  ],
};
