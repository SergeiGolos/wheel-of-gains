import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: {
    base: "light",
    brandTitle: `Wheel of Gains v${typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0"}`,
    brandUrl: "https://sergeigolos.github.io/wheel-of-gains/",
  },
});

// Add version info to the sidebar
const addVersionInfo = () => {
  const version =
    typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0";
  const buildDate =
    typeof __BUILD_DATE__ !== "undefined"
      ? __BUILD_DATE__
      : new Date().toISOString();

  // Add version info to document head for easy access
  const meta = document.createElement("meta");
  meta.name = "storybook-version";
  meta.content = `v${version} - Built: ${new Date(buildDate).toLocaleDateString()}`;
  document.head.appendChild(meta);

  // Try to add version info to the sidebar after a short delay
  setTimeout(() => {
    const sidebar = document.querySelector('[data-side="left"]');
    if (sidebar) {
      const versionDiv = document.createElement("div");
      versionDiv.style.cssText = `
        padding: 8px 16px;
        font-size: 11px;
        color: #666;
        border-top: 1px solid #eee;
        margin-top: auto;
      `;
      versionDiv.innerHTML = `v${version}<br><small>Built: ${new Date(buildDate).toLocaleDateString()}</small>`;
      sidebar.appendChild(versionDiv);
    }
  }, 2000);
};

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", addVersionInfo);
} else {
  addVersionInfo();
}
