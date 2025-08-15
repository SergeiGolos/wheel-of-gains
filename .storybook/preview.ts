import type { Preview } from "@storybook/html";
import "../src/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      element: "#storybook-root",
      config: {},
      options: {},
      manual: true,
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f1f5f9",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: ["light", "dark"],
        showName: true,
      },
    },
  },
};

export default preview;
