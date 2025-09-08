import { component$, $, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

const NAV_ITEMS = [
  {
    href: "/wheel-of-gains/",
    label: "Create Wheel",
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
              Workout Wheel
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

          <div class="space-y-4">
            <div class="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <button
                onClick$={() => handleNavigationChange(NAV_ITEMS[0].href)}
                class={`w-full rounded-md px-3 py-2 text-left transition-colors focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none ${
                  currentItem.href === NAV_ITEMS[0].href
                    ? "bg-teal-100 font-medium text-teal-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {NAV_ITEMS[0].label}
              </button>
            </div>
            
            <div class="text-center text-sm text-slate-500">
              <p>Create your own custom workout collections and share them with others!</p>
            </div>
          </div>
          </div>
        </nav>
      </div>
    </header>
  );
});
