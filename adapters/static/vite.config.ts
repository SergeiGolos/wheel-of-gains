import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";
import { AVAILABLE_WORKOUTS } from "../../src/utils/content-loader";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      staticAdapter({
        origin: "https://wheel-of-gains.golos.work",
        routes: [
          ...AVAILABLE_WORKOUTS.map(workout => `/${workout}/`)
        ]
      }),
    ],
  };
});
