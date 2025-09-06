#!/usr/bin/env node

// Test script to generate URLs for testing zipped links feature
const {
  TEST_ENCODED_COLLECTIONS,
  generateTestUrls,
  logTestUrls,
} = require("../src/utils/test-encodings.ts");

console.log("🎯 Wheel of Gains - Zipped Links Test URLs\n");

const baseUrl = "http://localhost:5173";

// Generate and log test URLs
logTestUrls(baseUrl);

console.log("\n📋 Test Instructions:");
console.log("1. Copy any URL above");
console.log("2. Paste it in your browser");
console.log("3. Verify the custom workout collection loads");
console.log("4. Test spinning the wheel");
console.log(
  "5. Check that the page title and description match the collection",
);

console.log("\n🔧 For Production Testing:");
console.log(
  'Replace "http://localhost:5173" with "https://wheel-of-gains.golos.work"',
);
