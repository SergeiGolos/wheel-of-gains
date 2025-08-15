import type { Meta, StoryObj } from "@storybook/html";

// Mock workout data for testing
const mockWorkouts = {
  small: [
    { id: "1", name: "Push Ups", multiplier: 1, category: { name: "Classic", color: "#64748b" } },
    { id: "2", name: "Squats", multiplier: 2, category: { name: "Beginner", color: "#10b981" } },
    { id: "3", name: "Burpees", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
  ],
  medium: [
    { id: "1", name: "Push Ups", multiplier: 1, category: { name: "Classic", color: "#64748b" } },
    { id: "2", name: "Squats", multiplier: 2, category: { name: "Beginner", color: "#10b981" } },
    { id: "3", name: "Burpees", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
    { id: "4", name: "Deadlifts", multiplier: 3, category: { name: "Strength", color: "#06b6d4" } },
    { id: "5", name: "Mountain Climbers", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
    { id: "6", name: "Planks", multiplier: 2, category: { name: "Classic", color: "#64748b" } },
  ],
  large: [
    { id: "1", name: "Push Ups", multiplier: 1, category: { name: "Classic", color: "#64748b" } },
    { id: "2", name: "Squats", multiplier: 2, category: { name: "Beginner", color: "#10b981" } },
    { id: "3", name: "Burpees", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
    { id: "4", name: "Deadlifts", multiplier: 3, category: { name: "Strength", color: "#06b6d4" } },
    { id: "5", name: "Mountain Climbers", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
    { id: "6", name: "Planks", multiplier: 2, category: { name: "Classic", color: "#64748b" } },
    { id: "7", name: "Pull Ups", multiplier: 1, category: { name: "Advanced", color: "#ef4444" } },
    { id: "8", name: "Lunges", multiplier: 2, category: { name: "Beginner", color: "#10b981" } },
    { id: "9", name: "Jumping Jacks", multiplier: 1, category: { name: "Cardio", color: "#8b5cf6" } },
    { id: "10", name: "Dips", multiplier: 1, category: { name: "Advanced", color: "#ef4444" } },
  ],
};

const meta: Meta = {
  title: "Testing/Spin Screen Functions",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Test components for spin screen functionality including wheel display, spinning animation, result display, and user interactions.",
      },
    },
  },
  argTypes: {
    wheelSize: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
      description: "Number of workouts on the wheel",
    },
    isSpinning: {
      control: { type: "boolean" },
      description: "Whether the wheel is currently spinning",
    },
    hasResult: {
      control: { type: "boolean" },
      description: "Whether a workout result is displayed",
    },
    showHistory: {
      control: { type: "boolean" },
      description: "Whether to show spin history",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the wheel
const renderWheel = (workouts: any[], isSpinning: boolean, result: any = null) => {
  const wheelId = Math.random().toString(36).substr(2, 9);
  
  return `
    <div class="flex flex-col items-center space-y-4">
      <!-- Wheel Container -->
      <div class="relative">
        <div class="relative flex items-center justify-center">
          <!-- Mock wheel using CSS -->
          <div 
            class="relative w-80 h-80 rounded-full border-8 border-slate-300 shadow-lg overflow-hidden ${isSpinning ? 'animate-spin' : ''}"
            style="animation-duration: ${isSpinning ? '3s' : '0s'}; animation-timing-function: ease-out;"
            data-testid="spin-wheel"
          >
            ${workouts.map((workout, index) => {
              const angle = (360 / workouts.length) * index;
              const color = workout.category.color;
              return `
                <div 
                  class="absolute inset-0 flex items-center justify-center text-white text-sm font-semibold"
                  style="
                    background: conic-gradient(
                      from ${angle}deg,
                      ${color} 0deg,
                      ${color} ${360 / workouts.length}deg,
                      transparent ${360 / workouts.length}deg,
                      transparent 360deg
                    );
                    clip-path: polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((angle + 360 / workouts.length) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / workouts.length) * Math.PI / 180)}%);
                  "
                  data-testid="wheel-segment-${workout.id}"
                >
                  <span class="transform rotate-${angle}" style="transform: rotate(${angle + 90}deg);">
                    ${workout.name}
                  </span>
                </div>
              `;
            }).join('')}
          </div>
          
          <!-- Wheel pointer -->
          <div 
            class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10"
            data-testid="wheel-pointer"
          >
            <div class="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
          </div>
        </div>
      </div>

      <!-- Spin Button -->
      <button
        class="px-8 py-4 text-xl font-bold text-white bg-teal-600 rounded-full hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        ${isSpinning ? 'disabled' : ''}
        onclick="alert('Spin button clicked!')"
        data-testid="spin-button"
      >
        ${isSpinning ? 'SPINNING...' : 'SPIN'}
      </button>

      <!-- Wheel Info -->
      <div class="text-center text-sm text-slate-600">
        <p>Workouts on wheel: <span class="font-semibold" data-testid="workout-count">${workouts.length}</span></p>
        <p>Status: <span class="font-semibold" data-testid="wheel-status">${isSpinning ? 'Spinning' : 'Ready'}</span></p>
      </div>
    </div>
  `;
};

// Helper function to render result display
const renderResultDisplay = (isSpinning: boolean, winner: any = null) => {
  return `
    <section 
      class="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
      aria-labelledby="result-heading"
      data-testid="result-display"
    >
      <h2 
        id="result-heading"
        class="mb-4 text-center text-xl font-bold tracking-widest text-slate-800 uppercase"
      >
        Your Destiny Awaits
      </h2>

      <div class="flex-grow flex items-center justify-center min-h-[120px]">
        ${isSpinning ? `
          <div class="text-center space-y-3">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p class="text-lg font-medium text-slate-600 animate-pulse">Spinning...</p>
          </div>
        ` : winner ? `
          <div class="text-center space-y-4 w-full">
            <div class="space-y-2">
              <div class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-white" style="background-color: ${winner.category.color}">
                ${winner.category.name}
              </div>
              <h3 class="text-2xl font-bold text-slate-800" data-testid="winner-name">${winner.name}</h3>
              <p class="text-slate-600">Multiplier: ×${winner.multiplier}</p>
            </div>
            
            <div class="flex items-center justify-center gap-3">
              <button 
                class="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-white shadow-md transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                onclick="alert('Start workout clicked!')"
                data-testid="start-workout-button"
                title="Start Workout"
              >
                ▶
              </button>
            </div>
          </div>
        ` : `
          <div class="text-center text-slate-500">
            <p class="text-lg">Ready to spin?</p>
            <p class="text-sm">Click the SPIN button to get your workout!</p>
          </div>
        `}
      </div>
    </section>
  `;
};

// Helper function to render spin history
const renderSpinHistory = (showHistory: boolean, results: any[] = []) => {
  if (!showHistory) return '';

  return `
    <section class="bg-white rounded-lg border border-slate-200 p-4">
      <h3 class="text-lg font-semibold text-slate-800 mb-3">Previous Results</h3>
      <div class="space-y-2 max-h-60 overflow-y-auto" data-testid="spin-history">
        ${results.length === 0 ? `
          <div class="text-center text-slate-500 py-4">
            <p>No spins yet.</p>
            <p class="text-sm">Spin the wheel to start your history!</p>
          </div>
        ` : results.map((result, index) => `
          <div class="flex items-center justify-between p-2 bg-slate-50 rounded" data-testid="history-item-${index}">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style="background-color: ${result.category.color}">
                ${result.category.name}
              </span>
              <span class="text-sm font-medium">${result.name}</span>
            </div>
            <span class="text-xs text-slate-500">×${result.multiplier}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;
};

// Helper function to render the complete spin screen
const renderSpinScreen = (args: any) => {
  const { 
    wheelSize = "medium", 
    isSpinning = false, 
    hasResult = false, 
    showHistory = true 
  } = args;

  const workouts = mockWorkouts[wheelSize];
  const winner = hasResult && !isSpinning ? workouts[Math.floor(Math.random() * workouts.length)] : null;
  const historyResults = hasResult ? [workouts[0], workouts[1]].slice(0, 2) : [];

  return `
    <div class="max-w-6xl mx-auto p-6 space-y-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Wheel of Gains</h1>
        <p class="text-slate-600">Spin the wheel to discover your next workout!</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Wheel Section -->
        <div class="lg:col-span-2">
          ${renderWheel(workouts, isSpinning, winner)}
        </div>

        <!-- Side Panel -->
        <div class="space-y-6">
          ${renderResultDisplay(isSpinning, winner)}
          ${renderSpinHistory(showHistory, historyResults)}
        </div>
      </div>

      <!-- Test Status Indicators -->
      <div class="mt-8 p-4 bg-slate-50 rounded-lg border-t-4 border-blue-500">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Test Status</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Wheel Size:</div>
            <div class="font-mono text-slate-800">${wheelSize} (${workouts.length} workouts)</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Spinning:</div>
            <div class="font-mono text-slate-800">${isSpinning ? 'Yes' : 'No'}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Has Result:</div>
            <div class="font-mono text-slate-800">${hasResult ? 'Yes' : 'No'}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Show History:</div>
            <div class="font-mono text-slate-800">${showHistory ? 'Yes' : 'No'}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const ReadyToSpin: Story = {
  args: {
    wheelSize: "medium",
    isSpinning: false,
    hasResult: false,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests the initial state of the spin screen ready for user interaction.",
      },
    },
  },
};

export const WheelSpinning: Story = {
  args: {
    wheelSize: "medium",
    isSpinning: true,
    hasResult: false,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests the spinning animation state with disabled controls.",
      },
    },
  },
};

export const ResultDisplayed: Story = {
  args: {
    wheelSize: "medium",
    isSpinning: false,
    hasResult: true,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests the result display with winner workout and action button.",
      },
    },
  },
};

export const SmallWheel: Story = {
  args: {
    wheelSize: "small",
    isSpinning: false,
    hasResult: false,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests wheel behavior with only 3 workouts (minimum viable wheel).",
      },
    },
  },
};

export const LargeWheel: Story = {
  args: {
    wheelSize: "large",
    isSpinning: false,
    hasResult: false,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests wheel behavior with 10 workouts (large wheel with many segments).",
      },
    },
  },
};

export const NoHistory: Story = {
  args: {
    wheelSize: "medium",
    isSpinning: false,
    hasResult: false,
    showHistory: false,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests the spin screen without history panel displayed.",
      },
    },
  },
};

export const InteractiveSpinScreen: Story = {
  args: {
    wheelSize: "medium",
    isSpinning: false,
    hasResult: false,
    showHistory: true,
  },
  render: renderSpinScreen,
  parameters: {
    docs: {
      description: {
        story: "Interactive spin screen - use controls to test different states and wheel sizes.",
      },
    },
  },
};

export const SpinSequence: Story = {
  render: () => {
    return `
      <div class="space-y-8 p-6">
        <h2 class="text-2xl font-bold text-slate-800 text-center">Complete Spin Sequence</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-slate-700 mb-4">1. Ready State</h3>
            <div class="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              ${renderSpinScreen({ wheelSize: "medium", isSpinning: false, hasResult: false, showHistory: false })}
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-slate-700 mb-4">2. Spinning State</h3>
            <div class="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              ${renderSpinScreen({ wheelSize: "medium", isSpinning: true, hasResult: false, showHistory: false })}
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-slate-700 mb-4">3. Result State</h3>
            <div class="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              ${renderSpinScreen({ wheelSize: "medium", isSpinning: false, hasResult: true, showHistory: false })}
            </div>
          </div>
        </div>
      </div>
    `;
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Shows the complete sequence of spin states for testing the full user flow.",
      },
    },
  },
};