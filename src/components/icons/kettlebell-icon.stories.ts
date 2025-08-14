import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Icons/KettlebellIcon',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A kettlebell SVG icon used throughout the application to represent fitness and workouts.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xl'],
      description: 'Size of the icon',
    },
    color: {
      control: { type: 'color' },
      description: 'Color of the icon (uses currentColor by default)',
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render the kettlebell icon
const renderKettlebellIcon = (args: any) => {
  const { size = 'medium', color = 'currentColor' } = args;
  
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5', 
    large: 'h-8 w-8',
    xl: 'h-12 w-12',
  };

  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium;

  return `
    <svg 
      class="${sizeClass}" 
      viewBox="0 0 24 24" 
      fill="${color}"
      style="color: ${color}"
    >
      <path d="M6 9H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a3 3 0 0 1 3 3v1Zm12 0h-2V8a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2Zm-2.92 2h-6.16a5.51 5.51 0 0 0-5.46 6A5.55 5.55 0 0 0 9.01 22a5.67 5.67 0 0 0 5.53-4.59A5.52 5.52 0 0 0 15.08 11Z M9 5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1h4V5ZM15 5v1h4V5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1Z" />
    </svg>
  `;
};

export const Default: Story = {
  args: {
    size: 'medium',
    color: 'currentColor',
  },
  render: renderKettlebellIcon,
  parameters: {
    docs: {
      description: {
        story: 'Default kettlebell icon with medium size.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    color: '#64748b',
  },
  render: renderKettlebellIcon,
  parameters: {
    docs: {
      description: {
        story: 'Small kettlebell icon (16x16px).',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    color: '#0f172a',
  },
  render: renderKettlebellIcon,
  parameters: {
    docs: {
      description: {
        story: 'Large kettlebell icon (32x32px).',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    color: '#059669',
  },
  render: renderKettlebellIcon,
  parameters: {
    docs: {
      description: {
        story: 'Extra large kettlebell icon (48x48px) in green.',
      },
    },
  },
};

export const ColorVariations: Story = {
  render: () => {
    const colors = [
      { name: 'Slate', color: '#64748b' },
      { name: 'Red', color: '#ef4444' },
      { name: 'Green', color: '#10b981' },
      { name: 'Blue', color: '#3b82f6' },
      { name: 'Purple', color: '#8b5cf6' },
      { name: 'Orange', color: '#f59e0b' },
    ];

    const icons = colors.map(({ name, color }) => 
      `<div class="flex flex-col items-center gap-2 p-2">
        ${renderKettlebellIcon({ size: 'large', color })}
        <span class="text-xs text-slate-600">${name}</span>
      </div>`
    ).join('');

    return `
      <div class="flex flex-wrap gap-4 p-4">
        ${icons}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Kettlebell icon in various colors to show versatility.',
      },
    },
  },
};

export const SizeComparison: Story = {
  render: () => {
    const sizes = [
      { name: 'Small', size: 'small' },
      { name: 'Medium', size: 'medium' },
      { name: 'Large', size: 'large' },
      { name: 'XL', size: 'xl' },
    ];

    const icons = sizes.map(({ name, size }) => 
      `<div class="flex flex-col items-center gap-2 p-4">
        ${renderKettlebellIcon({ size, color: '#64748b' })}
        <span class="text-xs text-slate-600">${name}</span>
      </div>`
    ).join('');

    return `
      <div class="flex items-end gap-4 p-4">
        ${icons}
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: 'Size comparison showing all available icon sizes.',
      },
    },
  },
};