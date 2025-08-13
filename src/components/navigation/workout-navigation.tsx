import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

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
  const currentPath = location.url.pathname;

  return (
    <header class="bg-white shadow-sm border-b border-slate-200 mb-3">
      <div class="container mx-auto px-4">
        {/* Title and description */}
        <div class="text-center py-3 border-b border-slate-100">
          <h1 class="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900 uppercase">
            <span class="text-teal-600">Wheel</span>
            <span class="text-slate-900"> Of Gains</span>
          </h1>
          <p class="text-slate-500 text-xs sm:text-sm mt-1">Spin the wheel to choose your path to glory!</p>
        </div>
        
        {/* Navigation */}
        <nav class="py-2" aria-label="Workout Categories">
          <div class="flex flex-wrap justify-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  class={`
                    px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                    min-h-[44px] flex items-center justify-center text-center
                    ${isActive 
                      ? 'bg-teal-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    }
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span class="font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
});