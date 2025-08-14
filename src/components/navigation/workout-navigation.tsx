import { component$, $, useSignal } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

const NAV_ITEMS = [
  { href: "/wheel-of-gains/", label: "Classic Mix", editHref: "/wheel-of-gains/edit/" },
  { href: "/wheel-of-gains/beginner/", label: "Beginner", editHref: "/wheel-of-gains/beginner/edit/" },
  { href: "/wheel-of-gains/intermediate/", label: "Intermediate", editHref: "/wheel-of-gains/intermediate/edit/" },
  { href: "/wheel-of-gains/advanced/", label: "Advanced", editHref: "/wheel-of-gains/advanced/edit/" },
  { href: "/wheel-of-gains/cardio/", label: "Cardio", editHref: "/wheel-of-gains/cardio/edit/" },
  { href: "/wheel-of-gains/strength/", label: "Strength", editHref: "/wheel-of-gains/strength/edit/" },
];

export const WorkoutNavigation = component$(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.url.pathname;
  const isMenuOpen = useSignal(false);

  // Find the current active item
  const currentItem = NAV_ITEMS.find(item => item.href === currentPath) || NAV_ITEMS[0];

  const handleNavigationChange = $((href: string) => {
    navigate(href);
    isMenuOpen.value = false; // Close menu after navigation
  });

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  return (
    <header class="bg-white shadow-sm border-b border-slate-200 mb-3">
      <div class="container mx-auto px-4">
        {/* Header with logo on left and hamburger menu on right */}
        <div class="flex items-center justify-between py-2">
          {/* Logo on the left */}
          <h1 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase">
            <span class="text-teal-600">Wheel</span>
            <span class="text-slate-900"> Of Gains</span>
          </h1>

          {/* Hamburger Menu Button on the right */}
          <button
            onClick$={toggleMenu}
            class="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen.value}
          >
            <svg 
              class="w-6 h-6" 
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
        class={`fixed inset-0 z-50 ${isMenuOpen.value ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMenuOpen.value}
      >
        {/* Overlay */}
        <div 
          class={`fixed inset-0 bg-black transition-opacity duration-300 ${
            isMenuOpen.value ? 'opacity-50' : 'opacity-0'
          }`}
          onClick$={toggleMenu}
        />
        
        {/* Slide-out panel */}
        <nav 
          class={`fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen.value ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="navigation"
          aria-label="Workout navigation"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-semibold text-slate-900">Workout Categories</h2>
              <button
                onClick$={toggleMenu}
                class="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                aria-label="Close navigation menu"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ul class="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} class="bg-slate-50 rounded-lg p-2 border border-slate-200">
                  <div class="flex items-center justify-between">
                    <button
                      onClick$={() => handleNavigationChange(item.href)}
                      class={`flex-grow text-left px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
                        currentItem.href === item.href 
                          ? 'bg-teal-100 text-teal-800 font-medium'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                    <button
                      onClick$={() => handleNavigationChange(item.editHref)}
                      class="flex-shrink-0 ml-2 p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      aria-label={`Edit ${item.label} workouts`}
                      title={`Edit ${item.label}`}
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Add New Button */}
            <div class="mt-6 pt-6 border-t border-slate-200">
              <button
                onClick$={() => {
                  // For now, navigate to the classic edit page as a placeholder
                  // This will be expanded later to allow creating new categories
                  handleNavigationChange("/wheel-of-gains/edit/");
                }}
                class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                aria-label="Add new workout category"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Workout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
});