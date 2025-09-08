/**
 * WHAT IS THIS FILE?
 *
 * Static entry point, used for Static Site Generation (SSG).
 * The application is rendered on the server and the resulting HTML
 * files are served statically.
 *
 * - SSG
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import Root from "./root";

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes,
    },
    serverData: {
      ...opts.serverData,
    },
  });
}