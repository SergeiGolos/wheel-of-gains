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
};

const meta: Meta = {
  title: "UI Components/ResultDisplay",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays the result of a wheel spin, showing the selected workout with category badge and action button.",
      },
    },
  },
  argTypes: {
    isSpinning: {
      control: { type: "boolean" },
      description: "Whether the wheel is currently spinning",
    },
    winner: {
      control: { type: "select" },
      options: ["none", "pushUps", "burpees", "deadlifts", "squats"],
      mapping: {
        none: null,
        pushUps: mockWorkouts.pushUps,
        burpees: mockWorkouts.burpees,
        deadlifts: mockWorkouts.deadlifts,
        squats: mockWorkouts.squats,
      },
      description: "The selected workout result",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the category badge
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

// Helper function to render the component
const renderResultDisplay = (args: any) => {
  const { isSpinning, winner } = args;

  // Show spinning state
  if (isSpinning) {
    return `
      <section 
        class="mb-3 rounded-lg border border-teal-400 bg-gradient-to-r from-teal-500 to-teal-600 p-4 shadow-lg"
        aria-labelledby="current-result"
      >
        <h2 
          id="current-result"
          class="mb-2 text-center text-xs font-bold tracking-widest text-white uppercase"
        >
          Your Destiny Awaits...
        </h2>
        
        <div class="rounded-md bg-white p-4 shadow-inner">
          <div class="flex items-center justify-center">
            <div class="text-6xl text-slate-400">❓</div>
          </div>
        </div>
      </section>
    `;
  }

  // Show no result state
  if (!winner) {
    return '<div class="p-4 text-center text-slate-500">No workout selected</div>';
  }

  // Show winner result
  return `
    <section 
      class="mb-3 rounded-lg border border-teal-400 bg-gradient-to-r from-teal-500 to-teal-600 p-4 shadow-lg"
      aria-labelledby="current-result"
    >
      <h2 
        id="current-result"
        class="mb-2 text-center text-xs font-bold tracking-widest text-white uppercase"
      >
        Your Destiny Awaits...
      </h2>
      
      <div class="rounded-md bg-white p-4 shadow-inner">
        <div class="mb-3 flex items-center justify-center gap-2">
          ${renderCategoryBadge(winner.category)}
        </div>
        
        <div class="flex items-center justify-center gap-3">
          <h3 class="flex-grow text-center text-xl font-bold break-words text-slate-800">
            ${winner.name}
          </h3>
          <button 
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-md transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
            aria-label="Start ${winner.name} workout - opens in new tab"
            title="Start Workout"
            onclick="alert('Would open: ${winner.url}')"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  `;
};

export const NoResult: Story = {
  args: {
    isSpinning: false,
    winner: null,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story: "No workout has been selected yet.",
      },
    },
  },
};

export const Spinning: Story = {
  args: {
    isSpinning: true,
    winner: null,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story:
          "The wheel is currently spinning, showing a placeholder with question mark.",
      },
    },
  },
};

export const ClassicWorkout: Story = {
  args: {
    isSpinning: false,
    winner: mockWorkouts.pushUps,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story: "A classic workout (Push Ups) has been selected.",
      },
    },
  },
};

export const CardioWorkout: Story = {
  args: {
    isSpinning: false,
    winner: mockWorkouts.burpees,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story: "A cardio workout (Burpees) has been selected.",
      },
    },
  },
};

export const StrengthWorkout: Story = {
  args: {
    isSpinning: false,
    winner: mockWorkouts.deadlifts,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story: "A strength workout (Deadlifts) has been selected.",
      },
    },
  },
};

export const BeginnerWorkout: Story = {
  args: {
    isSpinning: false,
    winner: mockWorkouts.squats,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story: "A beginner workout (Bodyweight Squats) has been selected.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    isSpinning: false,
    winner: mockWorkouts.pushUps,
  },
  render: renderResultDisplay,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example with working controls. Change the winner and spinning state using the controls below.",
      },
    },
  },
};
