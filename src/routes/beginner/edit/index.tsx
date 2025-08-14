import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage
      initialWorkouts={WORKOUT_COLLECTIONS.beginner.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.beginner.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.beginner.title} workouts`}
      storageKey="wheelOfGains_workouts_beginner"
      categorySlug="beginner"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Beginner Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your beginner workout collection",
    },
  ],
};
