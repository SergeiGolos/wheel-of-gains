/**
 * Test script to demonstrate markdown workout parsing and simplified format
 */

import { parseWorkoutsFromDescription, convertLegacyCollection } from '../src/utils/markdown-workouts';

// Test the simplified format
const simplifiedDescription = `Perfect for when you only have 5 minutes to spare!

Burpees|10
Push-ups|20
Squats|30
Plank|60
Mountain Climbers|20`;

console.log("🧪 Testing simplified description format...");
const workouts = parseWorkoutsFromDescription(simplifiedDescription);
console.log("💪 Parsed workouts:");
workouts.forEach((workout, index) => {
  console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
});

// Test legacy conversion
const legacyCollection = {
  id: "test-legacy",
  title: "Test Legacy",
  description: "A test collection",
  workouts: ["Simple Push-ups", "Burpees x10", "Plank x60"]
};

console.log("\n🔄 Testing legacy conversion...");
const converted = convertLegacyCollection(legacyCollection);
console.log("📋 Converted collection:");
console.log("Title:", converted.title);
console.log("Description:", converted.description);

const convertedWorkouts = parseWorkoutsFromDescription(converted.description);
console.log("💪 Converted workouts:");
convertedWorkouts.forEach((workout, index) => {
  console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
});

console.log("✅ All tests completed!");
