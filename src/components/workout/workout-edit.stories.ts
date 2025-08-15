import type { Meta, StoryObj } from "@storybook/html";

// Mock categories for testing
const mockCategories = {
  classic: { id: "classic", name: "Classic Mix", color: "#64748b" },
  beginner: { id: "beginner", name: "Beginner", color: "#10b981" },
  intermediate: { id: "intermediate", name: "Intermediate", color: "#f59e0b" },
  advanced: { id: "advanced", name: "Advanced", color: "#ef4444" },
  cardio: { id: "cardio", name: "Cardio", color: "#8b5cf6" },
  strength: { id: "strength", name: "Strength", color: "#06b6d4" },
};

// Mock workouts for testing
const mockWorkouts = [
  {
    id: "1",
    name: "Push Ups",
    url: "https://example.com/pushups",
    multiplier: 1,
    category: mockCategories.classic,
  },
  {
    id: "2",
    name: "Squats",
    url: "https://example.com/squats",
    multiplier: 2,
    category: mockCategories.beginner,
  },
  {
    id: "3",
    name: "Burpees",
    url: "https://example.com/burpees",
    multiplier: 1,
    category: mockCategories.cardio,
  },
];

const meta: Meta = {
  title: "Testing/Edit Screen Functions",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Test components for edit screen functionality including workout management, adding new workouts, editing existing ones, and form interactions.",
      },
    },
  },
  argTypes: {
    editMode: {
      control: { type: "select" },
      options: ["add_new", "edit_existing", "view_list"],
      description: "Edit screen mode to test",
    },
    hasUnsavedChanges: {
      control: { type: "boolean" },
      description: "Whether there are unsaved changes",
    },
    formErrors: {
      control: { type: "boolean" },
      description: "Whether to show form validation errors",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the edit screen
const renderEditScreen = (args: any) => {
  const {
    editMode = "view_list",
    hasUnsavedChanges = false,
    formErrors = false,
  } = args;

  const renderWorkoutForm = (workout: any = null, showErrors = false) => {
    const isEdit = workout !== null;
    const workoutName = isEdit ? workout.name : "";
    const workoutUrl = isEdit ? workout.url : "";
    const workoutMultiplier = isEdit ? workout.multiplier : 1;
    const selectedCategory = isEdit ? workout.category.id : "classic";

    return `
      <div class="bg-white rounded-lg border border-slate-200 p-6">
        <h3 class="text-lg font-semibold text-slate-800 mb-4">
          ${isEdit ? "Edit Workout" : "Add New Workout"}
        </h3>
        
        <form class="space-y-4" onsubmit="event.preventDefault(); alert('Form submitted!');">
          <!-- Workout Name -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Workout Name *
            </label>
            <input
              type="text"
              value="${workoutName}"
              placeholder="Enter workout name"
              class="w-full px-3 py-2 border ${showErrors && !workoutName ? "border-red-500 bg-red-50" : "border-slate-300"} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              data-testid="workout-name-input"
            />
            ${
              showErrors && !workoutName
                ? '<p class="mt-1 text-sm text-red-600">Workout name is required</p>'
                : ""
            }
          </div>

          <!-- Workout URL -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Workout URL
            </label>
            <input
              type="url"
              value="${workoutUrl}"
              placeholder="https://example.com/workout"
              class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              data-testid="workout-url-input"
            />
          </div>

          <!-- Multiplier -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Multiplier *
            </label>
            <input
              type="number"
              value="${workoutMultiplier}"
              min="1"
              max="10"
              class="w-full px-3 py-2 border ${showErrors && workoutMultiplier < 1 ? "border-red-500 bg-red-50" : "border-slate-300"} rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              data-testid="workout-multiplier-input"
            />
            ${
              showErrors && workoutMultiplier < 1
                ? '<p class="mt-1 text-sm text-red-600">Multiplier must be at least 1</p>'
                : ""
            }
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500" data-testid="workout-category-select">
              ${Object.values(mockCategories)
                .map(
                  (cat) =>
                    `<option value="${cat.id}" ${cat.id === selectedCategory ? "selected" : ""}>${cat.name}</option>`,
                )
                .join("")}
            </select>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              onclick="alert('Cancel clicked')"
              data-testid="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              data-testid="save-button"
            >
              ${isEdit ? "Update Workout" : "Add Workout"}
            </button>
          </div>
        </form>
      </div>
    `;
  };

  const renderWorkoutList = () => {
    return `
      <div class="bg-white rounded-lg border border-slate-200">
        <div class="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-800">Workout Manager</h3>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onclick="alert('Add new workout clicked')"
            data-testid="add-new-button"
          >
            Add New Workout
          </button>
        </div>
        
        <div class="p-4">
          <div class="space-y-3">
            ${mockWorkouts
              .map(
                (workout) => `
              <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg border" data-testid="workout-item-${workout.id}">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style="background-color: ${workout.category.color}">
                      ${workout.category.name}
                    </span>
                    <span class="text-xs text-slate-500">×${workout.multiplier}</span>
                  </div>
                  <h4 class="text-sm font-medium text-slate-800">${workout.name}</h4>
                  ${workout.url ? `<p class="text-xs text-slate-500 truncate">${workout.url}</p>` : ""}
                </div>
                <div class="flex items-center gap-2">
                  <button
                    class="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded"
                    onclick="alert('Edit ${workout.name}')"
                    data-testid="edit-button-${workout.id}"
                    title="Edit workout"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button
                    class="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded"
                    onclick="alert('Delete ${workout.name}')"
                    data-testid="delete-button-${workout.id}"
                    title="Delete workout"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  };

  const renderActionButtons = () => {
    return `
      <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
        <button 
          class="flex items-center gap-2 rounded-md bg-teal-600 px-3 py-2 font-medium text-white transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
          onclick="alert('Add New clicked')"
          data-testid="action-add-new"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Add New
        </button>

        <div class="flex items-center gap-2">
          <button 
            class="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
            onclick="alert('Cancel clicked')"
            data-testid="action-cancel"
          >
            Cancel
          </button>

          ${
            hasUnsavedChanges
              ? `
          <button 
            class="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
            onclick="alert('Save clicked')"
            data-testid="action-save"
          >
            Save
          </button>
          `
              : ""
          }
        </div>
      </div>
    `;
  };

  return `
    <div class="max-w-4xl mx-auto p-6 space-y-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-slate-800">Edit Screen Testing</h2>
        <p class="text-slate-600">Mode: <span class="font-mono bg-slate-100 px-2 py-1 rounded">${editMode}</span></p>
      </div>

      ${editMode === "view_list" ? renderWorkoutList() : ""}
      ${editMode === "add_new" ? renderWorkoutForm(null, formErrors) : ""}
      ${editMode === "edit_existing" ? renderWorkoutForm(mockWorkouts[0], formErrors) : ""}
      
      ${editMode !== "view_list" ? renderActionButtons() : ""}

      <!-- Test Status Indicators -->
      <div class="mt-8 p-4 bg-slate-50 rounded-lg border-t-4 border-blue-500">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Test Status</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Edit Mode:</div>
            <div class="font-mono text-slate-800">${editMode}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Unsaved Changes:</div>
            <div class="font-mono text-slate-800">${hasUnsavedChanges ? "Yes" : "No"}</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-slate-600">Form Errors:</div>
            <div class="font-mono text-slate-800">${formErrors ? "Showing" : "Hidden"}</div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const WorkoutListView: Story = {
  args: {
    editMode: "view_list",
    hasUnsavedChanges: false,
    formErrors: false,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story:
          "Tests the workout list view with add, edit, and delete functionality.",
      },
    },
  },
};

export const AddNewWorkout: Story = {
  args: {
    editMode: "add_new",
    hasUnsavedChanges: false,
    formErrors: false,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests the add new workout form with all input fields.",
      },
    },
  },
};

export const EditExistingWorkout: Story = {
  args: {
    editMode: "edit_existing",
    hasUnsavedChanges: true,
    formErrors: false,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests editing an existing workout with pre-filled form data.",
      },
    },
  },
};

export const FormValidationErrors: Story = {
  args: {
    editMode: "add_new",
    hasUnsavedChanges: false,
    formErrors: true,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story: "Tests form validation error states and error messages.",
      },
    },
  },
};

export const UnsavedChangesState: Story = {
  args: {
    editMode: "edit_existing",
    hasUnsavedChanges: true,
    formErrors: false,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story:
          "Tests the state when there are unsaved changes (Save button appears).",
      },
    },
  },
};

export const InteractiveEditScreen: Story = {
  args: {
    editMode: "view_list",
    hasUnsavedChanges: false,
    formErrors: false,
  },
  render: renderEditScreen,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive edit screen - use controls to test different modes and states.",
      },
    },
  },
};
