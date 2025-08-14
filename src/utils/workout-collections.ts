import {
  parseWorkoutString,
  createWorkoutUrl,
  DEFAULT_CATEGORIES,
  type Workout,
} from "./workout-utils";

// Original/Classic workout collection
const classicWorkoutStrings = [
  "Simple & Sinister",
  "ABC x3",
  "AXE Snatch",
  "AXE KB Swing",
  "Snatch Test x2",
  "AXE Macebell Touch Down x.5",
  "AXE Macebell Uppercuts x.5",
  "Deadlift",
];

// Beginner workout collection
const beginnerWorkoutStrings = [
  "Bodyweight Squats x2",
  "Push-ups x2",
  "Plank x3",
  "Walking x.5",
  "Glute Bridges x2",
  "Wall Sit x2",
  "Knee Push-ups x2",
  "Modified Burpees",
  "Arm Circles x3",
  "Leg Raises x2",
];

// Intermediate workout collection
const intermediateWorkoutStrings = [
  "Burpees",
  "Mountain Climbers x2",
  "Jump Squats x2",
  "Pike Push-ups",
  "Russian Twists x2",
  "Lunge Jumps",
  "High Knees x2",
  "Tricep Dips x2",
  "Bear Crawl x.5",
  "Jumping Jacks x3",
];

// Advanced workout collection
const advancedWorkoutStrings = [
  "Muscle-ups x.5",
  "Pistol Squats",
  "Handstand Push-ups x.5",
  "One Arm Push-ups x.5",
  "L-sits x.5",
  "Archer Pull-ups x.5",
  "Single Leg Burpees",
  "Planche Push-ups x.5",
  "Human Flag x.5",
  "Dragon Flags x.5",
];

// Cardio focused workout collection
const cardioWorkoutStrings = [
  "Sprint Intervals x2",
  "Box Jumps x2",
  "Battle Ropes x2",
  "Rowing Machine x2",
  "Cycling Sprints x2",
  "Stair Climbing x2",
  "Jump Rope x3",
  "Shadow Boxing x2",
  "Running x.5",
  "Elliptical x.5",
];

// Strength focused workout collection
const strengthWorkoutStrings = [
  "Deadlifts",
  "Squats",
  "Bench Press",
  "Pull-ups",
  "Overhead Press",
  "Barbell Rows",
  "Dips x2",
  "Farmer's Walk x.5",
  "Weighted Lunges",
  "Clean and Press x.5",
];

const createWorkoutCollection = (
  workoutStrings: string[],
  defaultCategory = DEFAULT_CATEGORIES[0],
): Workout[] => {
  return workoutStrings.map((str, index) => {
    const parsed = parseWorkoutString(str);
    return {
      id: `workout-${Date.now()}-${index}`, // Use timestamp-based ID for server-side compatibility
      ...parsed,
      url: createWorkoutUrl(parsed.name),
      category: defaultCategory,
    };
  });
};

export const WORKOUT_COLLECTIONS = {
  classic: {
    title: "Classic Mix",
    description:
      "The original workout collection - a balanced mix to get you started!",
    workouts: createWorkoutCollection(
      classicWorkoutStrings,
      DEFAULT_CATEGORIES[0],
    ),
  },
  beginner: {
    title: "Beginner Friendly",
    description: "Perfect for those just starting their fitness journey!",
    workouts: createWorkoutCollection(
      beginnerWorkoutStrings,
      DEFAULT_CATEGORIES[0],
    ),
  },
  intermediate: {
    title: "Intermediate Challenge",
    description:
      "Ready to step up your game? These workouts will push you further!",
    workouts: createWorkoutCollection(
      intermediateWorkoutStrings,
      DEFAULT_CATEGORIES[1],
    ),
  },
  advanced: {
    title: "Advanced Warriors",
    description: "For the fitness elite - extreme challenges await!",
    workouts: createWorkoutCollection(
      advancedWorkoutStrings,
      DEFAULT_CATEGORIES[0],
    ),
  },
  cardio: {
    title: "Cardio Blast",
    description:
      "Get your heart pumping with these high-intensity cardio workouts!",
    workouts: createWorkoutCollection(
      cardioWorkoutStrings,
      DEFAULT_CATEGORIES[1],
    ),
  },
  strength: {
    title: "Strength Builder",
    description:
      "Build muscle and power with these strength-focused exercises!",
    workouts: createWorkoutCollection(
      strengthWorkoutStrings,
      DEFAULT_CATEGORIES[0],
    ),
  },
};
