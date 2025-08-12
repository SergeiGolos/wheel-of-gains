import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

const NAV_ITEMS = [
  { href: "/", label: "Classic Mix", description: "Original collection" },
  { href: "/beginner/", label: "Beginner", description: "Just starting out" },
  { href: "/intermediate/", label: "Intermediate", description: "Step it up" },
  { href: "/advanced/", label: "Advanced", description: "Elite level" },
  { href: "/cardio/", label: "Cardio", description: "Heart pumping" },
  { href: "/strength/", label: "Strength", description: "Build muscle" },
];

export const WorkoutNavigation = component$(() => {
  const location = useLocation();
  const currentPath = location.url.pathname;

  return (
    <nav class="bg-white shadow-sm border-b border-slate-200 mb-6" aria-label="Workout Categories">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-2 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                class={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  min-h-[44px] flex flex-col items-center justify-center text-center
                  ${isActive 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                `}
                aria-current={isActive ? "page" : undefined}
              >
                <span class="font-semibold">{item.label}</span>
                <span class="text-xs opacity-80">{item.description}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
});