import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { WorkoutEditPage } from "../../../components/workout/workout-edit-page";
import { WORKOUT_COLLECTIONS } from "../../../utils/workout-collections";

export default component$(() => {
  return (
    <WorkoutEditPage 
      initialWorkouts={WORKOUT_COLLECTIONS.cardio.workouts}
      pageTitle={`Edit ${WORKOUT_COLLECTIONS.cardio.title}`}
      pageDescription={`Edit and manage your ${WORKOUT_COLLECTIONS.cardio.title} workouts`}
      storageKey="wheelOfGains_workouts_cardio"
      categorySlug="cardio"
    />
  );
});

export const head: DocumentHead = {
  title: "Edit Cardio Workouts - Wheel of Gains",
  meta: [
    {
      name: "description",
      content: "Edit and manage your cardio workout collection",
    },
  ],
};