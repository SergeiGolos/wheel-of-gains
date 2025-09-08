/**
 * Generate test URLs for the new UX
 */

import { encodeWorkoutCollection } from '../src/utils/zip-encoding';

// Test collection with workouts array (old format)
const testCollection = {
  title: 'Quick Test Collection',
  description: 'A quick test for the new UX!',
  workouts: [
    {
      id: '1',
      name: 'Push-ups',
      url: 'https://www.google.com/search?q=push+ups+workout',
      multiplier: 20,
      category: { id: 'classic', name: 'Classic', color: '#3b82f6' }
    },
    {
      id: '2',
      name: 'Burpees',
      url: 'https://www.google.com/search?q=burpees+workout',
      multiplier: 10,
      category: { id: 'classic', name: 'Classic', color: '#3b82f6' }
    },
    {
      id: '3',
      name: 'Squats',
      url: 'https://www.google.com/search?q=squats+workout',
      multiplier: 30,
      category: { id: 'classic', name: 'Classic', color: '#3b82f6' }
    }
  ]
};

const encodedData = encodeWorkoutCollection(testCollection);
const testUrl = `http://localhost:5175/?data=${encodeURIComponent(encodedData)}`;
const testUrlZip = `http://localhost:5175/?zip=${encodeURIComponent(encodedData)}`;

console.log('\n🔗 Test URLs for new UX:');
console.log('With ?data= parameter:', testUrl);
console.log('With ?zip= parameter (legacy):', testUrlZip);
console.log('\n📋 This should:');
console.log('1. Load the title and description automatically');
console.log('2. Use workouts from array (old format)');
console.log('3. Display the wheel immediately');
console.log('4. Allow spinning right away');

// Test collection with embedded workouts (new format)
const testNewFormatCollection = {
  title: 'New Format Test Collection',
  // Description intentionally left blank to avoid embedding workouts here
  description: '',
  workouts: []
};

const newFormatEncodedData = encodeWorkoutCollection(testNewFormatCollection);
const newFormatTestUrl = `http://localhost:5175/?data=${encodeURIComponent(newFormatEncodedData)}`;

console.log('\n🔗 New format test URL:');
console.log(newFormatTestUrl);
console.log('\n📋 This should:');
console.log('1. Load the title and description automatically');
console.log('2. Parse workouts from description (new format)');
console.log('3. Display the wheel immediately');
console.log('4. Allow spinning right away');
