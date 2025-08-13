import { component$, $ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

const NAV_ITEMS = [
  { href: "/wheel-of-gains/", label: "Classic Mix" },
  { href: "/wheel-of-gains/beginner/", label: "Beginner" },
  { href: "/wheel-of-gains/intermediate/", label: "Intermediate" },
  { href: "/wheel-of-gains/advanced/", label: "Advanced" },
  { href: "/wheel-of-gains/cardio/", label: "Cardio" },
  { href: "/wheel-of-gains/strength/", label: "Strength" },
];

export const WorkoutNavigation = component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.url.pathname;

  // Find the current active item
  const currentItem = NAV_ITEMS.find(item => item.href === currentPath) || NAV_ITEMS[0];

  const handleNavigationChange = $((event: Event) => {
    const target = event.target as HTMLSelectElement;
    const selectedHref = target.value;
    if (selectedHref) {
      navigate(selectedHref);
    }
  });

  return (
    <header class="bg-white shadow-sm border-b border-slate-200 mb-3">
      <div class="container mx-auto px-4">
        {/* Compact header with navigation dropdown on left and title on right */}
        <div class="flex items-center justify-between py-2">
          {/* Navigation Dropdown */}
          <div class="flex items-center gap-3">
            <label for="workout-navigation" class="text-sm font-medium text-slate-700 sr-only">
              Workout Category
            </label>
            <select
              id="workout-navigation"
              value={currentItem.href}
              onChange$={handleNavigationChange}
              class="
                bg-white border border-slate-300 rounded-md px-3 py-2 text-sm font-medium
                text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-teal-500 focus:border-teal-500
                min-w-[140px]
              "
              aria-label="Select workout category"
            >
              {NAV_ITEMS.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label}
                </option>
              ))}
            </select>
            <span class="text-xs text-slate-500 hidden sm:inline">
              Spin the wheel to choose your path to glory!
            </span>
          </div>

          {/* Title on the right */}
          <h1 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase">
            <span class="text-teal-600">Wheel</span>
            <span class="text-slate-900"> Of Gains</span>
          </h1>
        </div>
      </div>
    </header>
  );
});