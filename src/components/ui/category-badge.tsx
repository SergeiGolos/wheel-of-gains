import { component$ } from "@builder.io/qwik";
import type { WorkoutCategory } from "../../utils/workout-utils";

interface CategoryBadgeProps {
  category: WorkoutCategory;
}

export const CategoryBadge = component$<CategoryBadgeProps>(({ category }) => {
  return (
    <div
      class="mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white"
      style={`background-color: ${category.color}`}
    >
      {category.name}
    </div>
  );
});
