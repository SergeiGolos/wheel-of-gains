/**
 * Test script to demonstrate markdown workout parsing
 */

import { parseMarkdownWorkouts, loadMarkdownCollection, convertMarkdownToWorkoutCollection } from './markdown-workouts.ts';

// Test markdown content
const testMarkdown = `
---
title: "Test Collection"
description: "A test collection for markdown parsing"
---

Simple Push-ups
Burpees|10
[Advanced Pull-ups](https://example.com/pullups)|5
[Plank Hold](https://example.com/plank)|60
Mountain Climbers|20
`;

// Test the parsing
console.log("🧪 Testing markdown workout parsing...");

const collection = loadMarkdownCollection(testMarkdown, 'test');
console.log("📋 Loaded collection:", collection.title);

const workouts = parseMarkdownWorkouts(collection.markdown);
console.log("💪 Parsed workouts:");
workouts.forEach((workout, index) => {
  console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier}) - ${workout.url}`);
});

const fullWorkouts = convertMarkdownToWorkoutCollection(collection);
console.log("🎯 Full workout objects created:", fullWorkouts.length);

console.log("✅ Test completed!");
