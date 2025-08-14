import type { Meta, StoryObj } from "@storybook/html";

// Mock workout categories for testing
const mockCategories = {
  classic: { name: "Classic Mix", color: "#64748b" },
  beginner: { name: "Beginner", color: "#10b981" },
  intermediate: { name: "Intermediate", color: "#f59e0b" },
  advanced: { name: "Advanced", color: "#ef4444" },
  cardio: { name: "Cardio", color: "#8b5cf6" },
  strength: { name: "Strength", color: "#06b6d4" },
};

const meta: Meta = {
  title: "UI Components/CategoryBadge",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge component that displays workout categories with color-coded styling.",
      },
    },
  },
  argTypes: {
    category: {
      control: { type: "select" },
      options: Object.keys(mockCategories),
      mapping: mockCategories,
      description: "The workout category to display",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the component as HTML
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

export const Classic: Story = {
  args: {
    category: mockCategories.classic,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const Beginner: Story = {
  args: {
    category: mockCategories.beginner,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const Intermediate: Story = {
  args: {
    category: mockCategories.intermediate,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const Advanced: Story = {
  args: {
    category: mockCategories.advanced,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const Cardio: Story = {
  args: {
    category: mockCategories.cardio,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const Strength: Story = {
  args: {
    category: mockCategories.strength,
  },
  render: (args) => {
    return renderCategoryBadge(args.category);
  },
};

export const AllCategories: Story = {
  render: () => {
    const badges = Object.values(mockCategories)
      .map((category) => renderCategoryBadge(category))
      .join(" ");

    return `
      <div class="flex flex-wrap gap-2 p-4">
        ${badges}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Display all available workout category badges together.",
      },
    },
  },
};
