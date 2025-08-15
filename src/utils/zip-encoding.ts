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

/**
 * Encode workout collection to base64 gzipped string
 */
export function encodeWorkoutCollection(
  collection: EncodedWorkoutCollection,
): string {
  try {
    // Convert to JSON string
    const jsonString = JSON.stringify(collection);
    
    // Compress with gzip
    const compressed = pako.gzip(jsonString);
    
    // Convert to base64
    const base64 = btoa(String.fromCharCode(...compressed));
    
    return base64;
  } catch (error) {
    console.error("Failed to encode workout collection:", error);
    throw new Error("Failed to encode workout collection");
  }
}

/**
 * Decode base64 gzipped string to workout collection
 * Also supports uncompressed base64 JSON for testing
 */
export function decodeWorkoutCollection(
  encoded: string,
): EncodedWorkoutCollection {
  try {
    // First try to decode as base64
    const binaryString = atob(encoded);
    
    // Try to parse as uncompressed JSON first (for testing)
    try {
      const collection = JSON.parse(binaryString) as EncodedWorkoutCollection;
      
      // Validate the structure
      if (collection.title && collection.description && Array.isArray(collection.workouts)) {
        // Validate each workout
        for (const workout of collection.workouts) {
          if (!workout.id || !workout.name || !workout.url || typeof workout.multiplier !== "number") {
            throw new Error("Invalid workout structure");
          }
        }
        console.log("Decoded uncompressed JSON collection:", collection.title);
        return collection;
      }
    } catch (jsonError) {
      // If JSON parsing fails, try gzip decompression
      console.log("Not uncompressed JSON, trying gzip decompression...");
    }
    
    // Convert binary string to Uint8Array for gzip decompression
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decompress with gzip
    const decompressed = pako.ungzip(bytes, { to: "string" });
    
    // Parse JSON
    const collection = JSON.parse(decompressed) as EncodedWorkoutCollection;
    
    // Validate the structure
    if (!collection.title || !collection.description || !Array.isArray(collection.workouts)) {
      throw new Error("Invalid workout collection structure");
    }
    
    // Validate each workout
    for (const workout of collection.workouts) {
      if (!workout.id || !workout.name || !workout.url || typeof workout.multiplier !== "number") {
        throw new Error("Invalid workout structure");
      }
    }
    
    console.log("Decoded gzipped collection:", collection.title);
    return collection;
  } catch (error) {
    console.error("Failed to decode workout collection:", error);
    throw new Error("Failed to decode workout collection");
  }
}

/**
 * Create a shareable URL with encoded workout collection
 */
export function createShareableUrl(
  collection: EncodedWorkoutCollection,
  baseUrl: string = window.location.origin,
): string {
  const encoded = encodeWorkoutCollection(collection);
  const path = "/wheel-of-gains/zip";
  return `${baseUrl}${path}?data=${encodeURIComponent(encoded)}`;
}

/**
 * Extract encoded data from URL query parameters
 */
export function extractDataFromUrl(url: string = window.location.href): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("data");
  } catch (error) {
    console.error("Failed to extract data from URL:", error);
    return null;
  }
}