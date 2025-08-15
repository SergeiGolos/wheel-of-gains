/**
 * Qwik Storybook Renderer
 * Custom renderer to handle Qwik components in Storybook
 */

import { component$, createDOM } from "@builder.io/qwik";
import { render } from "@builder.io/qwik/server";

export interface QwikStoryContext {
  args: Record<string, any>;
  globals: Record<string, any>;
}

export interface QwikStoryFn {
  (context: QwikStoryContext): any;
}

/**
 * Render a Qwik component for Storybook
 */
export const renderQwikComponent = async (
  Component: any,
  args: Record<string, any> = {},
) => {
  try {
    // Create a wrapper component with the provided args
    const StoryWrapper = component$(() => {
      return <Component {...args} />;
    });

    // Create DOM instance for server-side rendering
    const dom = createDOM();

    // Render the component to HTML string
    const result = await render(dom, <StoryWrapper />);

    return result.html;
  } catch (error) {
    console.error("Error rendering Qwik component:", error);
    return `<div style="color: red; padding: 20px;">
      Error rendering component: ${error instanceof Error ? error.message : "Unknown error"}
    </div>`;
  }
};

/**
 * Create a Storybook story for a Qwik component
 */
export const createQwikStory = (
  Component: any,
  defaultArgs: Record<string, any> = {},
) => {
  const storyFn = async (context: QwikStoryContext) => {
    const args = { ...defaultArgs, ...context.args };
    const html = await renderQwikComponent(Component, args);

    // Return a container div with the rendered HTML
    const container = document.createElement("div");
    container.innerHTML = html;
    return container;
  };

  return storyFn;
};
