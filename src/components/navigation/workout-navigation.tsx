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
    <nav class="bg-white shadow-sm border-b border-slate-200 mb-3" aria-label="Workout Categories">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-1 py-2">
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
      </div>
    </nav>
  );
});