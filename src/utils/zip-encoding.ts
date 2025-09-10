import * as pako from "pako";
import type { Workout } from "./workout-utils";

/**
 * Utility functions for encoding and decoding workout collections
 * using gzip compression and base64 encoding for sharing via URL parameters
 */

export interface EncodedWorkoutCollection {
  title: string;
  description: string;
  workouts: Workout[];
}

// --- Base64 URL-safe helpers (backward-compatible) ---
function toBase64Url(b64: string): string {
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(b64url: string): string {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  // pad to multiple of 4
  while (b64.length % 4) b64 += "=";
  return b64;
}

function base64DecodeToBinaryString(encoded: string): string {
  // Accept both standard base64 and base64url inputs
  const normalized = /[-_]/.test(encoded) ? fromBase64Url(encoded) : encoded;
  return atob(normalized);
}

/**
 * Encode workout collection to base64 gzipped string
 */
export function encodeWorkoutCollection(
  collection: EncodedWorkoutCollection,
): string {
  console.log("🔧 Encoding workout collection:", {
    title: collection.title,
    workoutCount: collection.workouts.length,
    totalSize: JSON.stringify(collection).length
  });

  try {
    // Convert to JSON string
    const jsonString = JSON.stringify(collection);
    console.log("📝 JSON string length:", jsonString.length);

    // Compress with gzip
    const compressed = pako.gzip(jsonString);
    console.log("🗜️ Compressed size:", compressed.length);

    // Convert to URL-safe base64
    const b64 = btoa(String.fromCharCode(...compressed));
    const base64url = toBase64Url(b64);
    console.log("🔤 Base64url encoded, final length:", base64url.length);

    return base64url;
  } catch (error) {
    console.error("❌ Failed to encode workout collection:", error);
    throw new Error("Failed to encode workout collection");
  }
}

/**
 * Encode only the description string (most compact share format)
 */
export function encodeDescriptionString(description: string): string {
  try {
    const compressed = pako.gzip(description);
    const b64 = btoa(String.fromCharCode(...compressed));
    const base64url = toBase64Url(b64);
    return base64url;
  } catch (error) {
    console.error("❌ Failed to encode description string:", error);
    throw new Error("Failed to encode description string");
  }
}

/**
 * Decode base64 gzipped string to workout collection
 * Also supports uncompressed base64 JSON for testing
 */
export function decodeWorkoutCollection(
  encoded: string,
): EncodedWorkoutCollection {
  console.log("🔧 Starting decode process for encoded string length:", encoded.length);

  try {
    // First try to decode as base64
  console.log("🔤 Decoding base64 (accepting base64url)...");
  const binaryString = base64DecodeToBinaryString(encoded);
    console.log("📄 Binary string length:", binaryString.length);

    // Try to parse as uncompressed JSON first (for testing)
    try {
      console.log("📝 Attempting to parse as uncompressed JSON...");
      const collection = JSON.parse(binaryString) as EncodedWorkoutCollection;

      // Validate the structure
      if (
        collection.title &&
        collection.description &&
        Array.isArray(collection.workouts)
      ) {
        console.log("✅ Valid uncompressed JSON structure found");
        // Validate each workout
        for (const workout of collection.workouts) {
          if (
            !workout.id ||
            !workout.name ||
            !workout.url ||
            typeof workout.multiplier !== "number"
          ) {
            console.error("❌ Invalid workout structure:", workout);
            throw new Error("Invalid workout structure");
          }
        }
        console.log("✅ Decoded uncompressed JSON collection:", collection.title, "with", collection.workouts.length, "workouts");
        return collection;
      }
    } catch {
      // If JSON parsing fails, try gzip decompression
      console.log("📝 Not uncompressed JSON, trying gzip decompression...");
    }

    // Convert binary string to Uint8Array for gzip decompression
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    console.log("🔄 Converting to Uint8Array, length:", bytes.length);

    // Decompress with gzip
    console.log("🗜️ Decompressing with gzip...");
    const decompressed = pako.ungzip(bytes, { to: "string" });
    console.log("📄 Decompressed string length:", decompressed.length);

    // Try JSON parse; if it fails, treat as compact description payload
    try {
      console.log("📝 Parsing decompressed JSON...");
      const collection = JSON.parse(decompressed) as EncodedWorkoutCollection;

      // Validate the structure
      if (
        !collection.title ||
        !collection.description ||
        !Array.isArray(collection.workouts)
      ) {
        console.error("❌ Invalid workout collection structure:", {
          hasTitle: !!collection.title,
          hasDescription: !!collection.description,
          hasWorkouts: Array.isArray(collection.workouts)
        });
        throw new Error("Invalid workout collection structure");
      }

      console.log("✅ Valid gzipped collection structure found");
      // Validate each workout
      for (const workout of collection.workouts) {
        if (
          !workout.id ||
          !workout.name ||
          !workout.url ||
          typeof workout.multiplier !== "number"
        ) {
          console.error("❌ Invalid workout structure:", workout);
          throw new Error("Invalid workout structure");
        }
      }

      console.log("✅ Decoded gzipped collection:", collection.title, "with", collection.workouts.length, "workouts");
      return collection;
  } catch {
      console.log("🧾 Not JSON after gzip — treating as compact description payload.");
      const description = decompressed;
      const fallback: EncodedWorkoutCollection = {
        title: "",
        description,
        workouts: []
      };
      console.log("✅ Decoded compact description payload (length):", description.length);
      return fallback;
    }
  } catch (error) {
    console.error("❌ Failed to decode workout collection:", error);
    throw new Error("Failed to decode workout collection");
  }
}

/**
 * Create a shareable URL with encoded workout collection
 */
export function createShareableUrl(
  collection: EncodedWorkoutCollection,
  baseUrl?: string,
): string {
  console.log("🔗 Creating shareable URL for collection:", collection.title);

  // Prefer the most compact form: encode just the description string
  const encoded = encodeDescriptionString(collection.description);
  console.log("📦 Encoded data length:", encoded.length);

  // If baseUrl is not provided, construct it from current location
  if (!baseUrl) {
    const currentUrl = new URL(window.location.href);
    baseUrl = `${currentUrl.protocol}//${currentUrl.host}`;
    console.log("🏠 Using current location base URL:", baseUrl);

    // Determine the base path from current location
    const currentPath = currentUrl.pathname;
    const basePath = currentPath.includes("/wheel-of-gains/")
      ? "/wheel-of-gains/"
      : "/";

  const finalUrl = `${baseUrl}${basePath}?z=${encodeURIComponent(encoded)}`;
    console.log("🔗 Generated shareable URL:", finalUrl);
    return finalUrl;
  }

  // Legacy support: if baseUrl is provided, assume it includes the full path
  const path = baseUrl.includes("/wheel-of-gains")
    ? ""
    : "";
  const finalUrl = `${baseUrl}${path}?z=${encodeURIComponent(encoded)}`;
  console.log("🔗 Generated legacy shareable URL:", finalUrl);
  return finalUrl;
}

/**
 * Extract encoded data from URL query parameters
 */
export function extractDataFromUrl(
  url: string = window.location.href,
): string | null {
  console.log("🔍 Extracting data from URL:", url);

  try {
    const urlObj = new URL(url);
  const data = urlObj.searchParams.get("z") || urlObj.searchParams.get("data") || urlObj.searchParams.get("zip");

    if (data) {
      console.log("📦 Found encoded data, length:", data.length);
      console.log("🔤 Decoded data preview:", data.substring(0, 50) + (data.length > 50 ? "..." : ""));
    } else {
      console.log("❌ No z/data/zip parameter found in URL");
    }

    return data;
  } catch (error) {
    console.error("❌ Failed to extract data from URL:", error);
    return null;
  }
}
