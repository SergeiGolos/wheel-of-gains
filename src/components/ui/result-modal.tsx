import { component$, useVisibleTask$, $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";

interface ResultModalProps {
  winner: Workout | null;
  onClose: QRL<() => void>;
}

export const ResultModal = component$<ResultModalProps>(({ winner, onClose }) => {
  const modalRef = useSignal<HTMLDivElement>();
  
  // Focus management for modal
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(() => winner);
    
    if (winner && modalRef.value) {
      const firstButton = modalRef.value.querySelector('button');
      firstButton?.focus();
    }
  });
  
  // Keyboard navigation for modal
  const handleKeyDown = $((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  });

  const startWorkout = $(() => {
    if (winner) {
      window.open(winner.url, '_blank');
      onClose();
    }
  });

  const closeModal = $(() => {
    onClose();
  });

  if (!winner) return null;

  return (
    <div 
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onKeyDown$={handleKeyDown}
    >
      <div 
        ref={modalRef}
        class="bg-white rounded-lg shadow-2xl p-6 sm:p-8 text-center max-w-md w-full transform transition-all scale-100"
        role="document"
      >
        <h2 id="modal-title" class="text-xs sm:text-sm font-bold text-teal-600 uppercase tracking-widest">Your Destiny Awaits...</h2>
        <p id="modal-description" class="text-2xl sm:text-4xl font-bold text-slate-800 my-3 break-words">{winner.name}</p>
        <div class="mt-6 flex flex-col gap-3 justify-center">
          <button 
            onClick$={startWorkout}
            class="w-full py-3 sm:py-2.5 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 min-h-[44px]"
            aria-label={`Start ${winner.name} workout - opens in new tab`}
          >
            Start Workout!
          </button>
          <button 
            onClick$={closeModal}
            class="w-full py-3 sm:py-2.5 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 min-h-[44px]"
            aria-label="Close modal and spin again"
          >
            Spin Again
          </button>
        </div>
      </div>
    </div>
  );
});