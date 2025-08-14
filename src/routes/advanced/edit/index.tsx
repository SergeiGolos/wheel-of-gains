import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage 
      initialWorkouts={WORKOUT_COLLECTIONS.advanced.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.advanced.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.advanced.title} workouts`}
      storageKey="wheelOfGains_workouts_advanced"
      categorySlug="advanced"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Advanced Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your advanced workout collection",
    },
  ],
};