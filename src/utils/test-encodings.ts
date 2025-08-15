import {
  encodeWorkoutCollection,
  type EncodedWorkoutCollection,
} from "./zip-encoding";
import { DEFAULT_CATEGORIES } from "./workout-utils";

/**
 * Test collections for zipped links feature
 * These are pre-encoded workout collections that can be used for testing
 */

// Sample workout collections for testing
const testCollections: EncodedWorkoutCollection[] = [
  {
    title: "Quick 5-Minute Blast",
    description: "Perfect for when you only have 5 minutes to spare!",
    workouts: [
      {
        id: "quick-1",
        name: "Jumping Jacks",
        url: "https://www.google.com/search?q=Jumping%20Jacks%20workout",
        multiplier: 3,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
      {
        id: "quick-2",
        name: "Push-ups",
        url: "https://www.google.com/search?q=Push-ups%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[0], // Strength
      },
      {
        id: "quick-3",
        name: "Squats",
        url: "https://www.google.com/search?q=Squats%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[0], // Strength
      },
      {
        id: "quick-4",
        name: "Plank",
        url: "https://www.google.com/search?q=Plank%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[0], // Strength
      },
    ],
  },
  {
    title: "Yoga Flow",
    description: "Gentle movements for flexibility and mindfulness",
    workouts: [
      {
        id: "yoga-1",
        name: "Sun Salutation",
        url: "https://www.google.com/search?q=Sun%20Salutation%20yoga",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[2], // Flexibility
      },
      {
        id: "yoga-2",
        name: "Warrior Pose",
        url: "https://www.google.com/search?q=Warrior%20Pose%20yoga",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[2], // Flexibility
      },
      {
        id: "yoga-3",
        name: "Downward Dog",
        url: "https://www.google.com/search?q=Downward%20Dog%20yoga",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[2], // Flexibility
      },
      {
        id: "yoga-4",
        name: "Child's Pose",
        url: "https://www.google.com/search?q=Child%27s%20Pose%20yoga",
        multiplier: 3,
        category: DEFAULT_CATEGORIES[4], // Recovery
      },
    ],
  },
  {
    title: "HIIT Madness",
    description: "High-intensity interval training for maximum burn!",
    workouts: [
      {
        id: "hiit-1",
        name: "Burpees",
        url: "https://www.google.com/search?q=Burpees%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
      {
        id: "hiit-2",
        name: "Mountain Climbers",
        url: "https://www.google.com/search?q=Mountain%20Climbers%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
      {
        id: "hiit-3",
        name: "Jump Squats",
        url: "https://www.google.com/search?q=Jump%20Squats%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
      {
        id: "hiit-4",
        name: "High Knees",
        url: "https://www.google.com/search?q=High%20Knees%20workout",
        multiplier: 3,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
      {
        id: "hiit-5",
        name: "Plank Jacks",
        url: "https://www.google.com/search?q=Plank%20Jacks%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[1], // Cardio
      },
    ],
  },
  {
    title: "Sports Training",
    description: "Athletic movements for sports performance",
    workouts: [
      {
        id: "sports-1",
        name: "Agility Ladder",
        url: "https://www.google.com/search?q=Agility%20Ladder%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[3], // Sports
      },
      {
        id: "sports-2",
        name: "Cone Drills",
        url: "https://www.google.com/search?q=Cone%20Drills%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[3], // Sports
      },
      {
        id: "sports-3",
        name: "Plyometric Jumps",
        url: "https://www.google.com/search?q=Plyometric%20Jumps%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[3], // Sports
      },
      {
        id: "sports-4",
        name: "Sprint Intervals",
        url: "https://www.google.com/search?q=Sprint%20Intervals%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[3], // Sports
      },
    ],
  },
  {
    title: "Recovery & Stretch",
    description: "Gentle movements for recovery and flexibility",
    workouts: [
      {
        id: "recovery-1",
        name: "Foam Rolling",
        url: "https://www.google.com/search?q=Foam%20Rolling%20workout",
        multiplier: 3,
        category: DEFAULT_CATEGORIES[4], // Recovery
      },
      {
        id: "recovery-2",
        name: "Hip Flexor Stretch",
        url: "https://www.google.com/search?q=Hip%20Flexor%20Stretch%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[2], // Flexibility
      },
      {
        id: "recovery-3",
        name: "Hamstring Stretch",
        url: "https://www.google.com/search?q=Hamstring%20Stretch%20workout",
        multiplier: 2,
        category: DEFAULT_CATEGORIES[2], // Flexibility
      },
      {
        id: "recovery-4",
        name: "Meditation",
        url: "https://www.google.com/search?q=Meditation%20workout",
        multiplier: 1,
        category: DEFAULT_CATEGORIES[4], // Recovery
      },
    ],
  },
];

// Generate encoded versions of all test collections
export const TEST_ENCODED_COLLECTIONS = testCollections
  .map((collection, index) => {
    try {
      const encoded = encodeWorkoutCollection(collection);
      return {
        id: `test-${index + 1}`,
        name: collection.title,
        description: collection.description,
        encoded,
        originalCollection: collection,
      };
    } catch (error) {
      console.error(
        `Failed to encode collection "${collection.title}":`,
        error,
      );
      return null;
    }
  })
  .filter(Boolean);

// Export raw collections for reference
export const TEST_COLLECTIONS = testCollections;

// Generate sample URLs for testing (these would be used in development)
export const generateTestUrls = (baseUrl: string = "http://localhost:5173") => {
  return TEST_ENCODED_COLLECTIONS.map((testCollection) => ({
    name: testCollection!.name,
    description: testCollection!.description,
    url: `${baseUrl}/wheel-of-gains/zip?data=${encodeURIComponent(testCollection!.encoded)}`,
  }));
};

// Console helper for development
export const logTestUrls = (baseUrl?: string) => {
  const urls = generateTestUrls(baseUrl);
  console.log("🎯 Test URLs for Zipped Links:");
  urls.forEach((url, index) => {
    console.log(`${index + 1}. ${url.name}: ${url.url}`);
  });
};
