import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { WorkoutCategory } from "../../utils/workout-utils";

interface FilterPanelProps {
  categories: WorkoutCategory[];
  activeFilters: string[];
  onFilterChange: QRL<(filters: string[]) => void>;
}

export const FilterPanel = component$<FilterPanelProps>(
  ({ categories, activeFilters, onFilterChange }) => {
    const toggleFilter = $((categoryId: string) => {
      const newFilters = activeFilters.includes(categoryId)
        ? activeFilters.filter((id) => id !== categoryId)
        : [...activeFilters, categoryId];
      onFilterChange(newFilters);
    });

    const clearFilters = $(() => {
      onFilterChange([]);
    });

    return (
      <section
        class="mb-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:mb-6"
        aria-labelledby="filter-heading"
      >
        <h3 id="filter-heading" class="mb-3 text-lg font-bold text-slate-800">
          Filter by Category
        </h3>
        <div
          class="mb-3 flex flex-wrap gap-2"
          role="group"
          aria-labelledby="filter-heading"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick$={() => toggleFilter(category.id)}
              aria-pressed={activeFilters.includes(category.id)}
              aria-label={`Filter by ${category.name} category`}
              class={`min-h-[44px] rounded-md px-3 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                activeFilters.includes(category.id)
                  ? "text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              style={
                activeFilters.includes(category.id)
                  ? `background-color: ${category.color}`
                  : ""
              }
            >
              {category.name}
            </button>
          ))}
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick$={clearFilters}
            aria-label="Clear all category filters"
            class="min-h-[44px] px-2 text-sm font-medium text-slate-500 hover:text-slate-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Clear All Filters
          </button>
        )}
      </section>
    );
  },
);
