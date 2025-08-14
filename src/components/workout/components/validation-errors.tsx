import { component$ } from "@builder.io/qwik";

interface ValidationErrorsProps {
  show: boolean;
  errors: string[];
}

export const ValidationErrors = component$<ValidationErrorsProps>(
  ({ show, errors }) => {
    if (!show || errors.length === 0) {
      return null;
    }

    return (
      <div class="rounded-md border border-red-200 bg-red-50 p-3">
        <div class="flex items-center gap-2">
          <svg
            class="h-4 w-4 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm font-medium text-red-800">
            Please fix the following errors:
          </span>
        </div>
        <ul class="mt-2 list-inside list-disc text-sm text-red-700">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    );
  },
);
