// Manual test URL generation for zipped links
// This file can be used to test the encoding/decoding functionality

import {
  encodeWorkoutCollection,
  createShareableUrl,
} from "../src/utils/zip-encoding.js";
import { TEST_COLLECTIONS } from "../src/utils/test-encodings.js";

// Test the first collection
const testCollection = TEST_COLLECTIONS[0]; // Quick 5-Minute Blast
console.log("Testing with collection:", testCollection.title);

try {
  // Encode the collection
  const encoded = encodeWorkoutCollection(testCollection);
  console.log("Encoded data:", encoded);

  // Create URL
  const testUrl = `http://localhost:5173/wheel-of-gains/zip?data=${encodeURIComponent(encoded)}`;
  console.log("\nTest URL:");
  console.log(testUrl);

  console.log("\n📋 Copy this URL and test it in your browser!");
} catch (error) {
  console.error("Error generating test URL:", error);
}
