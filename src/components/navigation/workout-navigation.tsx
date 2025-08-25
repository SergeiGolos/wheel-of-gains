import { component$, $, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

const NAV_ITEMS = [
  {
    href: "/wheel-of-gains/wheel/classic/",
    label: "Classic Mix",
    editHref: "/wheel-of-gains/edit/",
  },
  {
    href: "/wheel-of-gains/wheel/beginner/",
    label: "Beginner",
    editHref: "/wheel-of-gains/beginner/edit/",
  },
  {
    href: "/wheel-of-gains/wheel/intermediate/",
    label: "Intermediate",
    editHref: "/wheel-of-gains/intermediate/edit/",
  },
  {
    href: "/wheel-of-gains/wheel/advanced/",
    label: "Advanced",
    editHref: "/wheel-of-gains/advanced/edit/",
  },
  {
    href: "/wheel-of-gains/wheel/cardio/",
    label: "Cardio",
    editHref: "/wheel-of-gains/cardio/edit/",
  },
  {
    href: "/wheel-of-gains/wheel/strength/",
    label: "Strength",
    editHref: "/wheel-of-gains/strength/edit/",
  },
];

export const WorkoutNavigation = component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.url.pathname;
  const isMenuOpen = useSignal(false);

  // Find the current active item
  const currentItem =
    NAV_ITEMS.find((item) => item.href === currentPath) || NAV_ITEMS[0];

  const handleNavigationChange = $((href: string) => {
    navigate(href);
    isMenuOpen.value = false; // Close menu after navigation
  });

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  return (
    <header class="mb-3 border-b border-slate-200 bg-white shadow-sm">
      <div class="container mx-auto px-4">
        {/* Header with logo on left and hamburger menu on right */}
        <div class="flex items-center justify-between py-2">
          {/* Logo on the left */}
          <h1 class="text-lg font-bold tracking-tight text-slate-900 uppercase sm:text-xl">
            <span class="text-teal-600">Wheel</span>
            <span class="text-slate-900"> Of Gains</span>
          </h1>

          {/* Hamburger Menu Button on the right */}
          <button
            onClick$={toggleMenu}
            class="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen.value}
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen.value ? (
                // X icon when menu is open
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-out Navigation Panel */}
      <div
        class={`fixed inset-0 z-50 ${isMenuOpen.value ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMenuOpen.value}
      >
        {/* Overlay */}
        <div
          class={`fixed inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen.value ? "opacity-50" : "opacity-0"
          }`}
          onClick$={toggleMenu}
        />

        {/* Slide-out panel */}
        <nav
          class={`fixed top-0 right-0 h-full w-80 max-w-full transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen.value ? "translate-x-0" : "translate-x-full"
          }`}
          role="navigation"
          aria-label="Workout navigation"
        >
          <div class="p-6">
            <div class="mb-6 flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">
                Workout Categories
              </h2>
              <button
                onClick$={toggleMenu}
                class="rounded-md p-2 text-slate-700 hover:bg-slate-100 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Close navigation menu"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <ul class="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.href}
                  class="rounded-lg border border-slate-200 bg-slate-50 p-2"
                >
                  <div class="flex items-center justify-between">
                    <button
                      onClick$={() => handleNavigationChange(item.href)}
                      class={`flex-grow rounded-md px-3 py-2 text-left transition-colors focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none ${
                        currentItem.href === item.href
                          ? "bg-teal-100 font-medium text-teal-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick$={() => handleNavigationChange(item.editHref)}
                      class="ml-2 flex-shrink-0 rounded-md p-2 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                      aria-label={`Edit ${item.label} workouts`}
                      title={`Edit ${item.label}`}
                    >
                      <svg
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Add New Button */}
            <div class="mt-6 border-t border-slate-200 pt-6">
              <button
                onClick$={() => {
                  handleNavigationChange("/wheel-of-gains/create/");
                }}
                class="flex w-full items-center justify-center gap-2 rounded-md bg-teal-600 px-4 py-3 font-medium text-white transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                aria-label="Create custom workout wheel"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Custom Wheel
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
});
