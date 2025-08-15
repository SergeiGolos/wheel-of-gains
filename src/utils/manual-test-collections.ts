import { DEFAULT_CATEGORIES } from "./workout-utils";

/**
 * Simple manual test to generate encoded workout collections
 * These can be used directly in URLs for testing
 */

export const MANUAL_TEST_COLLECTIONS = {
  quickBlast: {
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

  yoga: {
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
};
