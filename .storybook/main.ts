import type { StorybookConfig } from "@storybook/core/types";
import pkg from "../package.json";

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
    // Get version from environment variables or fall back to package.json
    const version = process.env.APP_VERSION || pkg.version || "1.0.0";
    const buildDate = process.env.BUILD_DATE || new Date().toISOString();

    // Customize the Vite config for Tailwind and asset handling
    return {
      ...config,
      define: {
        ...config.define,
        global: "globalThis",
        __APP_VERSION__: JSON.stringify(version),
        __BUILD_DATE__: JSON.stringify(buildDate),
      },
    };
  },
  typescript: {
    check: false,
  },
};

export default config;
