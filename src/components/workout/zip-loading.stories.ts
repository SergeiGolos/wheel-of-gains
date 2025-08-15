import type { Meta, StoryObj } from "@storybook/html";

// Import the test collections and encoding functions
const mockTestCollections = [
  {
    id: "test-1",
    name: "Quick 5-Minute Blast",
    description: "Perfect for when you only have 5 minutes to spare!",
    encoded: "H4sIAAAAAAAA/3WO0QqCQBCFX2XZa2vNlMxbwZ...", // Mock encoded string
    originalCollection: {
      title: "Quick 5-Minute Blast",
      description: "Perfect for when you only have 5 minutes to spare!",
      workouts: [
        {
          id: "quick-1",
          name: "Jumping Jacks",
          url: "https://www.google.com/search?q=Jumping%20Jacks%20workout",
          multiplier: 3,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
        {
          id: "quick-2",
          name: "Push-ups",
          url: "https://www.google.com/search?q=Push-ups%20workout",
          multiplier: 2,
          category: { id: "strength", name: "Strength", color: "#06b6d4" },
        },
        {
          id: "quick-3",
          name: "Squats",
          url: "https://www.google.com/search?q=Squats%20workout",
          multiplier: 2,
          category: { id: "strength", name: "Strength", color: "#06b6d4" },
        },
        {
          id: "quick-4",
          name: "Plank",
          url: "https://www.google.com/search?q=Plank%20workout",
          multiplier: 1,
          category: { id: "strength", name: "Strength", color: "#06b6d4" },
        },
      ],
    },
  },
  {
    id: "test-2",
    name: "Yoga Flow",
    description: "Gentle movements for flexibility and mindfulness",
    encoded: "H4sIAAAAAAAA/32P0QqCQBCEX2XZa3vNlKxbwa...", // Mock encoded string
    originalCollection: {
      title: "Yoga Flow",
      description: "Gentle movements for flexibility and mindfulness",
      workouts: [
        {
          id: "yoga-1",
          name: "Sun Salutation",
          url: "https://www.google.com/search?q=Sun%20Salutation%20yoga",
          multiplier: 2,
          category: {
            id: "flexibility",
            name: "Flexibility",
            color: "#10b981",
          },
        },
        {
          id: "yoga-2",
          name: "Warrior Pose",
          url: "https://www.google.com/search?q=Warrior%20Pose%20yoga",
          multiplier: 1,
          category: {
            id: "flexibility",
            name: "Flexibility",
            color: "#10b981",
          },
        },
        {
          id: "yoga-3",
          name: "Downward Dog",
          url: "https://www.google.com/search?q=Downward%20Dog%20yoga",
          multiplier: 2,
          category: {
            id: "flexibility",
            name: "Flexibility",
            color: "#10b981",
          },
        },
        {
          id: "yoga-4",
          name: "Child's Pose",
          url: "https://www.google.com/search?q=Child%27s%20Pose%20yoga",
          multiplier: 3,
          category: { id: "recovery", name: "Recovery", color: "#f59e0b" },
        },
      ],
    },
  },
  {
    id: "test-3",
    name: "HIIT Madness",
    description: "High-intensity interval training for maximum burn!",
    encoded: "H4sIAAAAAAAA/4WQ0QqCQBBFX2XZa4vNlKxbwa...", // Mock encoded string
    originalCollection: {
      title: "HIIT Madness",
      description: "High-intensity interval training for maximum burn!",
      workouts: [
        {
          id: "hiit-1",
          name: "Burpees",
          url: "https://www.google.com/search?q=Burpees%20workout",
          multiplier: 1,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
        {
          id: "hiit-2",
          name: "Mountain Climbers",
          url: "https://www.google.com/search?q=Mountain%20Climbers%20workout",
          multiplier: 2,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
        {
          id: "hiit-3",
          name: "Jump Squats",
          url: "https://www.google.com/search?q=Jump%20Squats%20workout",
          multiplier: 2,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
        {
          id: "hiit-4",
          name: "High Knees",
          url: "https://www.google.com/search?q=High%20Knees%20workout",
          multiplier: 3,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
        {
          id: "hiit-5",
          name: "Plank Jacks",
          url: "https://www.google.com/search?q=Plank%20Jacks%20workout",
          multiplier: 1,
          category: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
        },
      ],
    },
  },
];

const meta: Meta = {
  title: "Testing/Zip String Loading",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Test components for zip string loading functionality including decoding different wheel configurations, validation, and error handling.",
      },
    },
  },
  argTypes: {
    testCollection: {
      control: { type: "select" },
      options: [
        "quick-blast",
        "yoga-flow",
        "hiit-madness",
        "invalid",
        "malformed",
      ],
      description: "Test collection to load and validate",
    },
    loadingState: {
      control: { type: "select" },
      options: ["loading", "success", "error", "ready"],
      description: "Loading state to display",
    },
    showValidation: {
      control: { type: "boolean" },
      description: "Whether to show validation details",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock decoding function
const mockDecodeFunction = (collectionId: string) => {
  switch (collectionId) {
    case "quick-blast":
      return {
        success: true,
        data: mockTestCollections[0].originalCollection,
        error: null,
      };
    case "yoga-flow":
      return {
        success: true,
        data: mockTestCollections[1].originalCollection,
        error: null,
      };
    case "hiit-madness":
      return {
        success: true,
        data: mockTestCollections[2].originalCollection,
        error: null,
      };
    case "invalid":
      return { success: false, data: null, error: "Invalid zip string format" };
    case "malformed":
      return { success: false, data: null, error: "Malformed collection data" };
    default:
      return { success: false, data: null, error: "Unknown collection" };
  }
};

// Helper function to render loading states
const renderLoadingState = (
  state: string,
  collection: any = null,
  error: string = null,
) => {
  switch (state) {
    case "loading":
      return `
        <div class="flex items-center justify-center p-8">
          <div class="text-center space-y-4">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p class="text-lg font-medium text-slate-600">Decoding zip string...</p>
            <p class="text-sm text-slate-500">Please wait while we load your custom workout collection</p>
          </div>
        </div>
      `;
    case "error":
      return `
        <div class="p-6 bg-red-50 border border-red-200 rounded-lg">
          <div class="flex items-center gap-3 mb-4">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
            <h3 class="text-lg font-semibold text-red-800">Loading Failed</h3>
          </div>
          <p class="text-red-700 mb-4">${error || "Unknown error occurred while decoding zip string"}</p>
          <div class="space-y-2">
            <button 
              class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              onclick="alert('Retry clicked')"
              data-testid="retry-button"
            >
              Try Again
            </button>
            <button 
              class="px-4 py-2 bg-white text-red-600 border border-red-600 rounded hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-2"
              onclick="alert('Return to default collection')"
              data-testid="fallback-button"
            >
              Use Default Collection
            </button>
          </div>
        </div>
      `;
    case "success":
      return renderSuccessState(collection);
    default:
      return `
        <div class="text-center text-slate-500 p-8">
          <p>Ready to load zip string</p>
        </div>
      `;
  }
};

// Helper function to render successful loading
const renderSuccessState = (collection: any) => {
  if (!collection) return "";

  return `
    <div class="space-y-6">
      <!-- Success Header -->
      <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <h3 class="text-lg font-semibold text-green-800">Successfully Loaded!</h3>
            <p class="text-green-700">Custom workout collection has been decoded and validated</p>
          </div>
        </div>
      </div>

      <!-- Collection Info -->
      <div class="bg-white border border-slate-200 rounded-lg p-6">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-slate-800" data-testid="collection-title">${collection.title}</h2>
          <p class="text-slate-600 mt-1" data-testid="collection-description">${collection.description}</p>
        </div>

        <!-- Workouts List -->
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-slate-700">Workouts (${collection.workouts.length})</h3>
          <div class="grid gap-3" data-testid="workouts-list">
            ${collection.workouts
              .map(
                (workout, index) => `
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border" data-testid="workout-item-${index}">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style="background-color: ${workout.category.color}">
                      ${workout.category.name}
                    </span>
                    <span class="text-xs text-slate-500">×${workout.multiplier}</span>
                  </div>
                  <h4 class="text-sm font-medium text-slate-800">${workout.name}</h4>
                  ${workout.url ? `<a href="${workout.url}" class="text-xs text-blue-600 hover:text-blue-800 truncate block" target="_blank" rel="noopener">${workout.url}</a>` : ""}
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex items-center gap-3">
          <button 
            class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onclick="alert('Load this collection into wheel')"
            data-testid="load-collection-button"
          >
            Load Collection
          </button>
          <button 
            class="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onclick="alert('Save to my collections')"
            data-testid="save-collection-button"
          >
            Save to My Collections
          </button>
        </div>
      </div>
    </div>
  `;
};

// Helper function to render validation details
const renderValidationDetails = (collection: any, showValidation: boolean) => {
  if (!showValidation || !collection) return "";

  const validations = {
    hasTitle: !!collection.title && collection.title.trim().length > 0,
    hasDescription: !!collection.description,
    hasWorkouts: collection.workouts && collection.workouts.length > 0,
    validWorkouts:
      collection.workouts &&
      collection.workouts.every(
        (w) =>
          w.name &&
          w.name.trim().length > 0 &&
          w.multiplier &&
          w.multiplier >= 1 &&
          w.category &&
          w.category.name,
      ),
    minWorkouts: collection.workouts && collection.workouts.length >= 3,
    maxWorkouts: collection.workouts && collection.workouts.length <= 20,
  };

  const allValid = Object.values(validations).every((v) => v);

  return `
    <div class="mt-6 p-4 bg-slate-50 rounded-lg">
      <h3 class="text-lg font-semibold text-slate-700 mb-3">Validation Results</h3>
      <div class="space-y-2 text-sm">
        ${Object.entries({
          "Has Title": validations.hasTitle,
          "Has Description": validations.hasDescription,
          "Has Workouts": validations.hasWorkouts,
          "Valid Workouts": validations.validWorkouts,
          "Min 3 Workouts": validations.minWorkouts,
          "Max 20 Workouts": validations.maxWorkouts,
        })
          .map(
            ([label, isValid]) => `
          <div class="flex items-center gap-2">
            ${
              isValid
                ? '<svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                : '<svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
            }
            <span class="${isValid ? "text-green-700" : "text-red-700"}">${label}: ${isValid ? "PASS" : "FAIL"}</span>
          </div>
        `,
          )
          .join("")}
        
        <div class="mt-3 pt-3 border-t border-slate-200">
          <div class="flex items-center gap-2">
            ${
              allValid
                ? '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                : '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
            }
            <span class="font-semibold ${allValid ? "text-green-700" : "text-red-700"}">
              Overall: ${allValid ? "VALID COLLECTION" : "INVALID COLLECTION"}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Main render function
const renderZipStringLoader = (args: any) => {
  const {
    testCollection = "quick-blast",
    loadingState = "ready",
    showValidation = false,
  } = args;

  const decodeResult = mockDecodeFunction(testCollection);
  const collection = decodeResult.success ? decodeResult.data : null;
  const error = !decodeResult.success ? decodeResult.error : null;

  // Override loading state based on decode result
  let actualState = loadingState;
  if (loadingState === "ready" && !decodeResult.success) {
    actualState = "error";
  } else if (loadingState === "ready" && decodeResult.success) {
    actualState = "success";
  }

  const mockEncodedString =
    testCollection !== "invalid" && testCollection !== "malformed"
      ? mockTestCollections.find((c) =>
          c.name.toLowerCase().includes(testCollection.split("-")[0]),
        )?.encoded || "H4sIAAAA..."
      : "invalid_string_123";

  return `
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Zip String Loader Testing</h1>
        <p class="text-slate-600">Test decoding and validation of different workout collections</p>
      </div>

      <!-- Input Section -->
      <div class="bg-white border border-slate-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">Zip String Input</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">
              Encoded Collection Data
            </label>
            <textarea
              class="w-full p-3 border border-slate-300 rounded-md text-sm font-mono bg-slate-50"
              rows="3"
              readonly
              data-testid="zip-string-input"
            >${mockEncodedString}</textarea>
          </div>
          <div>
            <button 
              class="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onclick="alert('Decode zip string clicked')"
              data-testid="decode-button"
            >
              Decode Collection
            </button>
          </div>
        </div>
      </div>

      <!-- Loading/Result Section -->
      <div class="bg-white border border-slate-200 rounded-lg p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">Decoding Result</h2>
        ${renderLoadingState(actualState, collection, error)}
        ${collection ? renderValidationDetails(collection, showValidation) : ""}
      </div>

      <!-- Test Info -->
      <div class="p-4 bg-slate-50 rounded-lg border-t-4 border-blue-500">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Test Configuration</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Test Collection:</div>
            <div class="font-mono text-slate-800">${testCollection}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Loading State:</div>
            <div class="font-mono text-slate-800">${actualState}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Show Validation:</div>
            <div class="font-mono text-slate-800">${showValidation ? "Yes" : "No"}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const QuickBlastCollection: Story = {
  args: {
    testCollection: "quick-blast",
    loadingState: "success",
    showValidation: true,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story:
          "Tests loading the Quick 5-Minute Blast collection with validation.",
      },
    },
  },
};

export const YogaFlowCollection: Story = {
  args: {
    testCollection: "yoga-flow",
    loadingState: "success",
    showValidation: true,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story:
          "Tests loading the Yoga Flow collection with different workout types.",
      },
    },
  },
};

export const HIITMadnessCollection: Story = {
  args: {
    testCollection: "hiit-madness",
    loadingState: "success",
    showValidation: true,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story:
          "Tests loading the HIIT Madness collection with high-intensity workouts.",
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    testCollection: "quick-blast",
    loadingState: "loading",
    showValidation: false,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story: "Tests the loading state while decoding a zip string.",
      },
    },
  },
};

export const InvalidZipString: Story = {
  args: {
    testCollection: "invalid",
    loadingState: "error",
    showValidation: false,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story: "Tests error handling for invalid zip string format.",
      },
    },
  },
};

export const MalformedData: Story = {
  args: {
    testCollection: "malformed",
    loadingState: "error",
    showValidation: false,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story: "Tests error handling for malformed collection data.",
      },
    },
  },
};

export const InteractiveLoader: Story = {
  args: {
    testCollection: "quick-blast",
    loadingState: "success",
    showValidation: true,
  },
  render: renderZipStringLoader,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive zip string loader - use controls to test different collections and states.",
      },
    },
  },
};

export const CollectionComparison: Story = {
  render: () => {
    return `
      <div class="space-y-8 p-6">
        <h2 class="text-2xl font-bold text-slate-800 text-center">Collection Comparison</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          ${mockTestCollections
            .map(
              (collection) => `
            <div class="border-2 border-dashed border-slate-300 p-4 rounded-lg">
              <h3 class="text-lg font-semibold text-slate-700 mb-2">${collection.name}</h3>
              <p class="text-sm text-slate-600 mb-4">${collection.originalCollection.description}</p>
              
              <div class="space-y-2">
                <div class="text-xs text-slate-500">
                  Workouts: ${collection.originalCollection.workouts.length}
                </div>
                <div class="text-xs text-slate-500">
                  Categories: ${[...new Set(collection.originalCollection.workouts.map((w) => w.category.name))].join(", ")}
                </div>
                <div class="text-xs text-slate-500 font-mono bg-slate-100 p-1 rounded">
                  ${collection.encoded.substring(0, 20)}...
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `;
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Comparison of all test collections showing their different characteristics.",
      },
    },
  },
};
