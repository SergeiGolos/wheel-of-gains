import { component$ } from "@builder.io/qwik";
import type { WorkoutCategory } from "../../utils/workout-utils";

interface CategoryBadgeProps {
  category: WorkoutCategory;
}

export const CategoryBadge = component$<CategoryBadgeProps>(({ category }) => {
  return (
    <div
      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white mr-2"
      style={`background-color: ${category.color}`}
    >
      {category.name}
    </div>
  );
});