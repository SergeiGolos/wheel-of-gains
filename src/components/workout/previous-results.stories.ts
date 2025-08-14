import type { Meta, StoryObj } from "@storybook/html";

// Mock data for testing
const mockCategories = {
  classic: { id: "classic", name: "Classic Mix", color: "#64748b" },
  beginner: { id: "beginner", name: "Beginner", color: "#10b981" },
  intermediate: { id: "intermediate", name: "Intermediate", color: "#f59e0b" },
  advanced: { id: "advanced", name: "Advanced", color: "#ef4444" },
  cardio: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
  strength: { id: "strength", name: "Strength", color: "#06b6d4" },
};

const mockWorkouts = {
  pushUps: {
    id: "1",
    name: "Push Ups",
    url: "https://example.com/pushups",
    multiplier: 1,
    category: mockCategories.classic,
  },
  burpees: {
    id: "2",
    name: "Burpees",
    url: "https://example.com/burpees",
    multiplier: 1,
    category: mockCategories.cardio,
  },
  deadlifts: {
    id: "3",
    name: "Deadlifts",
    url: "https://example.com/deadlifts",
    multiplier: 1,
    category: mockCategories.strength,
  },
  squats: {
    id: "4",
    name: "Bodyweight Squats",
    url: "https://example.com/squats",
    multiplier: 1,
    category: mockCategories.beginner,
  },
  pullUps: {
    id: "5",
    name: "Pull Ups",
    url: "https://example.com/pullups",
    multiplier: 1,
    category: mockCategories.advanced,
  },
};

const mockSpinHistory = [
  {
    id: "1",
    workout: mockWorkouts.pushUps,
    timestamp: Date.now() - 1000 * 60 * 5, // 5 minutes ago
  },
  {
    id: "2",
    workout: mockWorkouts.burpees,
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
  },
  {
    id: "3",
    workout: mockWorkouts.deadlifts,
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  },
  {
    id: "4",
    workout: mockWorkouts.squats,
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
  },
  {
    id: "5",
    workout: mockWorkouts.pullUps,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
];

const meta: Meta = {
  title: "Workout Components/PreviousResults",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays the history of previous workout selections with timestamps and the ability to re-run workouts.",
      },
    },
  },
  argTypes: {
    historyLength: {
      control: { type: "select" },
      options: [0, 1, 3, 5, 10],
      description: "Number of items in spin history",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render category badge
const renderCategoryBadge = (category: any) => {
  return `
    <div 
      class="mr-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white"
      style="background-color: ${category.color}"
    >
      ${category.name}
    </div>
  `;
};

// Helper function to format timestamp
const formatTimestamp = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

// Helper function to render the component
const renderPreviousResults = (args: any) => {
  const { historyLength = 5 } = args;
  const history = mockSpinHistory.slice(0, historyLength);

  return `
    <section 
      class="flex flex-col rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:p-4"
      aria-labelledby="results-heading"
      style="width: 400px; max-width: 90vw;"
    >
      <h2 
        id="results-heading"
        class="mb-3 text-center text-lg font-bold tracking-widest text-slate-800 uppercase sm:text-xl"
      >
        Previous Results
      </h2>

      <div 
        class="workout-list max-h-[400px] flex-grow overflow-y-auto pr-2 sm:max-h-[500px] lg:max-h-none"
        role="region"
        aria-label="Spin history"
        aria-live="polite"
      >
        ${
          history.length === 0
            ? `
        <div class="rounded-md border-2 border-dashed border-slate-200 py-4 text-center sm:py-6">
          <p class="text-sm text-slate-500 sm:text-base">No spins yet.</p>
          <p class="text-xs text-slate-400 sm:text-sm">
            Spin the wheel to start your workout history!
          </p>
        </div>
        `
            : `
        <ul class="space-y-2" role="list">
          ${history
            .map(
              (result) => `
          <li class="rounded-md border border-slate-200 bg-slate-50 p-2 transition-colors hover:bg-slate-100 sm:p-3">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-grow">
                <div class="mb-1 flex items-center gap-2">
                  ${renderCategoryBadge(result.workout.category)}
                </div>
                <h3 class="text-sm font-semibold text-slate-800 sm:text-base break-words">
                  ${result.workout.name}
                </h3>
                <p class="text-xs text-slate-500 sm:text-sm">
                  ${formatTimestamp(result.timestamp)}
                </p>
              </div>
              <button 
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none sm:h-9 sm:w-9"
                aria-label="Start ${result.workout.name} workout again - opens in new tab"
                title="Start Workout"
                onclick="alert('Would open: ${result.workout.url}')"
              >
                ▶
              </button>
            </div>
          </li>
          `,
            )
            .join("")}
        </ul>
        `
        }
      </div>
    </section>
  `;
};

export const EmptyHistory: Story = {
  args: {
    historyLength: 0,
  },
  render: renderPreviousResults,
  parameters: {
    docs: {
      description: {
        story:
          "No previous workout results - shows empty state with helpful message.",
      },
    },
  },
};

export const SingleResult: Story = {
  args: {
    historyLength: 1,
  },
  render: renderPreviousResults,
  parameters: {
    docs: {
      description: {
        story: "Single workout result in the history.",
      },
    },
  },
};

export const ShortHistory: Story = {
  args: {
    historyLength: 3,
  },
  render: renderPreviousResults,
  parameters: {
    docs: {
      description: {
        story:
          "Short history with 3 recent workouts showing different categories and timestamps.",
      },
    },
  },
};

export const FullHistory: Story = {
  args: {
    historyLength: 5,
  },
  render: renderPreviousResults,
  parameters: {
    docs: {
      description: {
        story:
          "Full history showing all 5 recent workouts with varied timestamps and categories.",
      },
    },
  },
};

export const ExtendedHistory: Story = {
  args: {
    historyLength: 10,
  },
  render: (args) => {
    // Create extended history with more varied data
    const extendedHistory = [
      ...mockSpinHistory,
      {
        id: "6",
        workout: { ...mockWorkouts.pushUps, name: "Diamond Push Ups" },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7, // 1 week ago
      },
      {
        id: "7",
        workout: { ...mockWorkouts.burpees, name: "Mountain Climbers" },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 14, // 2 weeks ago
      },
      {
        id: "8",
        workout: { ...mockWorkouts.deadlifts, name: "Romanian Deadlifts" },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 21, // 3 weeks ago
      },
      {
        id: "9",
        workout: { ...mockWorkouts.squats, name: "Jump Squats" },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 30, // 1 month ago
      },
      {
        id: "10",
        workout: { ...mockWorkouts.pullUps, name: "Chin Ups" },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 45, // 1.5 months ago
      },
    ];

    return renderPreviousResults({
      ...args,
      historyLength: Math.min(args.historyLength, extendedHistory.length),
    });
  },
  parameters: {
    docs: {
      description: {
        story:
          "Extended history showing scrollable list with varied workout types and longer time periods.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    historyLength: 3,
  },
  render: renderPreviousResults,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example - use the historyLength control to see different numbers of results.",
      },
    },
  },
};

export const HistoryComparison: Story = {
  render: () => {
    return `
      <div class="space-y-6 p-4">
        <div>
          <h3 class="mb-3 text-sm font-semibold text-slate-700">Empty State</h3>
          ${renderPreviousResults({ historyLength: 0 })}
        </div>
        
        <div>
          <h3 class="mb-3 text-sm font-semibold text-slate-700">With Results</h3>
          ${renderPreviousResults({ historyLength: 3 })}
        </div>
      </div>
    `;
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Side-by-side comparison of empty state vs populated history.",
      },
    },
  },
};
