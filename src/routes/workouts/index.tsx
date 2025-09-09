import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { loadAllWorkouts } from "../../utils/content-loader";

export const useAvailableWorkouts = routeLoader$(async () => {
  const workouts = await loadAllWorkouts();
  return workouts;
});

export default component$(() => {
  const workouts = useAvailableWorkouts();
  
  return (
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      <div class="container mx-auto px-4 py-8">
        <div class="mx-auto max-w-4xl">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-slate-900 mb-4">Available Workouts</h1>
            <p class="text-slate-600">Pre-configured workout collections ready to use</p>
          </div>
          
          <div class="grid gap-6 md:grid-cols-2">
            {workouts.value.map((workout) => (
              <div key={workout.slug} class="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <h3 class="text-xl font-semibold text-slate-900 mb-2">
                  <a href={`/${workout.slug}`} class="hover:text-blue-600">
                    {workout.frontmatter.title}
                  </a>
                </h3>
                {workout.frontmatter.description && (
                  <p class="text-slate-600 mb-3">{workout.frontmatter.description}</p>
                )}
                <div class="flex flex-wrap gap-2 text-xs mb-4">
                  {workout.frontmatter.category && (
                    <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {workout.frontmatter.category}
                    </span>
                  )}
                  {workout.frontmatter.difficulty && (
                    <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      Difficulty: {workout.frontmatter.difficulty}/5
                    </span>
                  )}
                  {workout.frontmatter.tags?.map((tag, i) => (
                    <span key={i} class="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={`/${workout.slug}`}
                  class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  Start Workout →
                </a>
              </div>
            ))}
          </div>
          
          <div class="text-center mt-12">
            <a 
              href="/" 
              class="inline-block bg-slate-600 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-500 transition-colors"
            >
              ← Back to Main Wheel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});