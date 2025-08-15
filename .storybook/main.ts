import type { StorybookConfig } from "@storybook/core/types";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
  viteFinal: async (config) => {
    // Customize the Vite config for Tailwind and asset handling
    return {
      ...config,
      define: {
        ...config.define,
        global: "globalThis",
      },
    };
  },
  typescript: {
    check: false,
  },
};

export default config;
