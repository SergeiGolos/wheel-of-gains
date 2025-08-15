import { component$ } from "@builder.io/qwik";

interface VersionInfoProps {
  className?: string;
  showBuildDate?: boolean;
}

export const VersionInfo = component$<VersionInfoProps>(
  ({ className = "", showBuildDate = false }) => {
    const version =
      typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0";
    const buildDate =
      typeof __BUILD_DATE__ !== "undefined"
        ? __BUILD_DATE__
        : new Date().toISOString();

    return (
      <div class={`text-xs opacity-75 ${className}`}>
        <span>v{version}</span>
        {showBuildDate && (
          <span class="ml-2">
            Built: {new Date(buildDate).toLocaleDateString()}
          </span>
        )}
      </div>
    );
  },
);
