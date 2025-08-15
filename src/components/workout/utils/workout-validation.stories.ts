import type { Meta, StoryObj } from "@storybook/html";

// Mock the validation functions for testing
const mockValidationFunctions = {
  validateWorkoutName: (name: string): boolean => {
    return name.trim().length > 0;
  },
  validateMultiplier: (multiplier: number): boolean => {
    return !isNaN(multiplier) && multiplier >= 1;
  },
  isWorkoutNameUnique: (
    name: string,
    workouts: any[],
    excludeId?: string,
  ): boolean => {
    const trimmedName = name.trim().toLowerCase();
    return !workouts.some(
      (w) => w.id !== excludeId && w.name.toLowerCase() === trimmedName,
    );
  },
  validateNewWorkoutForm: (
    name: string,
    multiplier: number,
    workouts: any[],
  ) => {
    const errors = {
      name: false,
      multiplier: false,
      duplicate: false,
    };

    errors.name = !mockValidationFunctions.validateWorkoutName(name);
    errors.multiplier = !mockValidationFunctions.validateMultiplier(multiplier);
    errors.duplicate = !mockValidationFunctions.isWorkoutNameUnique(
      name,
      workouts,
    );

    const isValid = !errors.name && !errors.multiplier && !errors.duplicate;

    return {
      isValid,
      errors,
    };
  },
};

// Mock workouts for testing
const mockWorkouts = [
  { id: "1", name: "Push Ups", multiplier: 1 },
  { id: "2", name: "Squats", multiplier: 2 },
  { id: "3", name: "Burpees", multiplier: 1 },
];

const meta: Meta = {
  title: "Testing/Workout Validation",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Test components for workout validation functions including name validation, multiplier validation, and form validation.",
      },
    },
  },
  argTypes: {
    workoutName: {
      control: { type: "text" },
      description: "Workout name to validate",
    },
    multiplier: {
      control: { type: "number", min: 0, max: 10, step: 1 },
      description: "Workout multiplier to validate",
    },
    testScenario: {
      control: { type: "select" },
      options: [
        "valid",
        "empty_name",
        "invalid_multiplier",
        "duplicate_name",
        "all_errors",
      ],
      description: "Test scenario to display",
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper function to render validation test results
const renderValidationTest = (args: any) => {
  const {
    workoutName = "Test Workout",
    multiplier = 1,
    testScenario = "valid",
  } = args;

  let testName = workoutName;
  let testMultiplier = multiplier;

  // Set up test scenarios
  switch (testScenario) {
    case "empty_name":
      testName = "";
      testMultiplier = 1;
      break;
    case "invalid_multiplier":
      testName = "Valid Workout";
      testMultiplier = -1;
      break;
    case "duplicate_name":
      testName = "Push Ups"; // Duplicate from mock data
      testMultiplier = 1;
      break;
    case "all_errors":
      testName = "";
      testMultiplier = -1;
      break;
    case "valid":
    default:
      testName = "New Valid Workout";
      testMultiplier = 2;
      break;
  }

  const nameValid = mockValidationFunctions.validateWorkoutName(testName);
  const multiplierValid =
    mockValidationFunctions.validateMultiplier(testMultiplier);
  const nameUnique = mockValidationFunctions.isWorkoutNameUnique(
    testName,
    mockWorkouts,
  );
  const formValidation = mockValidationFunctions.validateNewWorkoutForm(
    testName,
    testMultiplier,
    mockWorkouts,
  );

  return `
    <div class="w-full max-w-2xl space-y-6 p-6 bg-white rounded-lg border border-slate-200">
      <h2 class="text-xl font-bold text-slate-800 mb-4">Workout Validation Test</h2>
      
      <!-- Test Inputs -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Workout Name:</label>
          <div class="p-2 bg-white border rounded text-sm">${testName || "[empty]"}</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1">Multiplier:</label>
          <div class="p-2 bg-white border rounded text-sm">${testMultiplier}</div>
        </div>
      </div>

      <!-- Individual Validation Results -->
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-slate-700">Individual Validations</h3>
        
        <div class="flex items-center gap-3 p-3 rounded-lg ${nameValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}">
          <div class="flex-shrink-0">
            ${
              nameValid
                ? '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                : '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
            }
          </div>
          <div>
            <div class="font-medium ${nameValid ? "text-green-800" : "text-red-800"}">
              Name Validation: ${nameValid ? "PASS" : "FAIL"}
            </div>
            <div class="text-sm ${nameValid ? "text-green-600" : "text-red-600"}">
              ${nameValid ? "Name is valid and not empty" : "Name is empty or invalid"}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 rounded-lg ${multiplierValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}">
          <div class="flex-shrink-0">
            ${
              multiplierValid
                ? '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                : '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
            }
          </div>
          <div>
            <div class="font-medium ${multiplierValid ? "text-green-800" : "text-red-800"}">
              Multiplier Validation: ${multiplierValid ? "PASS" : "FAIL"}
            </div>
            <div class="text-sm ${multiplierValid ? "text-green-600" : "text-red-600"}">
              ${multiplierValid ? "Multiplier is valid (>= 1)" : "Multiplier must be >= 1"}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 p-3 rounded-lg ${nameUnique ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}">
          <div class="flex-shrink-0">
            ${
              nameUnique
                ? '<svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>'
                : '<svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>'
            }
          </div>
          <div>
            <div class="font-medium ${nameUnique ? "text-green-800" : "text-red-800"}">
              Uniqueness Check: ${nameUnique ? "PASS" : "FAIL"}
            </div>
            <div class="text-sm ${nameUnique ? "text-green-600" : "text-red-600"}">
              ${nameUnique ? "Name is unique in workout list" : "Name already exists in workout list"}
            </div>
          </div>
        </div>
      </div>

      <!-- Form Validation Summary -->
      <div class="p-4 rounded-lg ${formValidation.isValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}">
        <h3 class="text-lg font-semibold ${formValidation.isValid ? "text-green-800" : "text-red-800"} mb-2">
          Form Validation Result: ${formValidation.isValid ? "VALID" : "INVALID"}
        </h3>
        <div class="text-sm ${formValidation.isValid ? "text-green-600" : "text-red-600"}">
          ${
            formValidation.isValid
              ? "All validations passed. Workout can be saved."
              : `Validation errors: ${Object.keys(formValidation.errors)
                  .filter((key) => formValidation.errors[key])
                  .join(", ")}`
          }
        </div>
      </div>

      <!-- Existing Workouts Reference -->
      <div class="p-4 bg-slate-50 rounded-lg">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Existing Workouts (for uniqueness check):</h3>
        <div class="text-xs text-slate-600 space-y-1">
          ${mockWorkouts.map((w) => `<div>• ${w.name} (multiplier: ${w.multiplier})</div>`).join("")}
        </div>
      </div>

      <!-- Test Data -->
      <div class="text-xs text-slate-500 p-2 bg-slate-50 rounded border-t">
        <strong>Test Data:</strong> name="${testName}", multiplier=${testMultiplier}, scenario="${testScenario}"
      </div>
    </div>
  `;
};

export const ValidWorkout: Story = {
  args: {
    testScenario: "valid",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story: "Tests a valid workout that passes all validation checks.",
      },
    },
  },
};

export const EmptyName: Story = {
  args: {
    testScenario: "empty_name",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story: "Tests validation failure when workout name is empty.",
      },
    },
  },
};

export const InvalidMultiplier: Story = {
  args: {
    testScenario: "invalid_multiplier",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story: "Tests validation failure when multiplier is less than 1.",
      },
    },
  },
};

export const DuplicateName: Story = {
  args: {
    testScenario: "duplicate_name",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story: "Tests validation failure when workout name already exists.",
      },
    },
  },
};

export const AllErrors: Story = {
  args: {
    testScenario: "all_errors",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story: "Tests multiple validation failures simultaneously.",
      },
    },
  },
};

export const InteractiveValidation: Story = {
  args: {
    workoutName: "Custom Workout",
    multiplier: 1,
    testScenario: "valid",
  },
  render: renderValidationTest,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive validation testing - use controls to test different inputs.",
      },
    },
  },
};
