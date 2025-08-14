import type { Meta, StoryObj } from "@storybook/html";

const meta: Meta = {
  title: "Workout Components/ActionButtons",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Action buttons for workout management - Add New, Save, and Cancel functionality.",
      },
    },
  },
  argTypes: {
    hasUnsavedChanges: {
      control: { type: "boolean" },
      description:
        "Whether there are unsaved changes (controls Save button visibility)",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the action buttons
const renderActionButtons = (args: any) => {
  const { hasUnsavedChanges = false } = args;

  return `
    <div class="mt-4 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
      <button 
        class="flex items-center gap-2 rounded-md bg-teal-600 px-3 py-2 font-medium text-white transition-colors hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
        aria-label="Add new workout"
        onclick="alert('Add New clicked')"
      >
        <svg 
          class="h-4 w-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New
      </button>

      <div class="flex items-center gap-2">
        <button 
          class="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
          aria-label="Cancel changes and return to wheel"
          onclick="alert('Cancel clicked')"
        >
          Cancel
        </button>

        ${
          hasUnsavedChanges
            ? `
        <button 
          class="rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          aria-label="Save changes and return to wheel"
          onclick="alert('Save clicked')"
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

export const NoUnsavedChanges: Story = {
  args: {
    hasUnsavedChanges: false,
  },
  render: renderActionButtons,
  parameters: {
    docs: {
      description: {
        story: "Default state with no unsaved changes - Save button is hidden.",
      },
    },
  },
};

export const WithUnsavedChanges: Story = {
  args: {
    hasUnsavedChanges: true,
  },
  render: renderActionButtons,
  parameters: {
    docs: {
      description: {
        story:
          "State with unsaved changes - Save button is visible and highlighted in green.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    hasUnsavedChanges: false,
  },
  render: renderActionButtons,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example - toggle the "hasUnsavedChanges" control to see the Save button appear/disappear.',
      },
    },
  },
};

export const ButtonStates: Story = {
  render: () => {
    return `
      <div class="space-y-6 p-4">
        <div>
          <h3 class="mb-3 text-sm font-semibold text-slate-700">Without Unsaved Changes</h3>
          ${renderActionButtons({ hasUnsavedChanges: false })}
        </div>
        
        <div>
          <h3 class="mb-3 text-sm font-semibold text-slate-700">With Unsaved Changes</h3>
          ${renderActionButtons({ hasUnsavedChanges: true })}
        </div>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison showing both states side by side.",
      },
    },
  },
};
