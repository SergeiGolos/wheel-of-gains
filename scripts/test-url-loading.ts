/**
 * Test URL loading functionality
 */

import { decodeWorkoutCollection } from '../src/utils/zip-encoding';
import { parseWorkoutsFromDescription } from '../src/utils/markdown-workouts';

// Test data from our generated URLs
const testEncodedData = 'H4sIAAAAAAAAA62O0UrDMBSGXyUeL1dX14JIQET3AooKgnjRZWdtWNqTJicEGX13s1rs1WCgl/n5vpzvAKzZIEh4DlrtxSt6FmsyBhVr6iCDLXrltB1fEh5EP3J85HbkBDcoOozi7f0iwZHcngJ7kB8H0NskrNLaVe3xwlPwzVWwPi3BmTQ0zNbLPI8xLmui2uBSUZt7rJxq7vs7m4RFEhbTt0lsg2FtjUYHsrjOQFWMNbkvkNM9ZSrvtZqvrn8HRYaSBpfl5rbY3cAwZJNUzPhjcBbx/MbND38icfVvieWMv/Sh4vML/YifCCz/HPg5fAMpDZhuRAIAAA==';

// Test new format with embedded workouts
const testNewFormatData = 'H4sIAAAAAAAAAx2MsQ7CMAwFf8V4BqnAlhEkRoQEG2EojaERrRNiRx0I/07o9k6nex9UrwOhwSNNcAhpbBUuJAr7MAzUqQ+MS3QkXfJxJoN/7/kJ2hNwzWi8k3Pk4DH3C8uWT1n6VY5SNo3lXU6RSMq67vM7typl29TbKaRXyCporrfvD6SFzuKLAAAA';

console.log('🧪 Testing URL loading functionality...');

try {
  console.log('🔄 Decoding workout collection...');
  const collection = decodeWorkoutCollection(testEncodedData);

  console.log('✅ Decoded collection:');
  console.log('Title:', collection.title);
  console.log('Description:', collection.description);
  console.log('Workouts in array:', collection.workouts.length);

  if (collection.workouts.length > 0) {
    console.log('📋 Workouts from array:');
    collection.workouts.forEach((workout, index) => {
      console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
    });
  } else {
    console.log('📝 Parsing workouts from description...');
    const parsedWorkouts = parseWorkoutsFromDescription(collection.description);
    console.log('📋 Parsed workouts:');
    parsedWorkouts.forEach((workout, index) => {
      console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
    });
  }

  console.log('✅ URL loading test passed!');
} catch (error) {
  console.error('❌ URL loading test failed:', error);
}

console.log('\n🧪 Testing new format (embedded workouts)...');

try {
  console.log('🔄 Decoding new format collection...');
  const collection = decodeWorkoutCollection(testNewFormatData);

  console.log('✅ Decoded new format collection:');
  console.log('Title:', collection.title);
  console.log('Description:', collection.description);
  console.log('Workouts in array:', collection.workouts.length);

  if (collection.workouts.length > 0) {
    console.log('📋 Workouts from array:');
    collection.workouts.forEach((workout, index) => {
      console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
    });
  } else {
    console.log('📝 Parsing workouts from description...');
    const parsedWorkouts = parseWorkoutsFromDescription(collection.description);
    console.log('📋 Parsed workouts:');
    parsedWorkouts.forEach((workout, index) => {
      console.log(`  ${index + 1}. ${workout.name} (x${workout.multiplier})`);
    });
  }

  console.log('✅ New format test passed!');
} catch (error) {
  console.error('❌ New format test failed:', error);
}
