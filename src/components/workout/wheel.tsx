import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Workout } from "../../utils/workout-utils";
import { COLORS } from "../../utils/workout-utils";

interface WheelProps {
  displayWorkouts: Workout[];
  onSpinStart: QRL<() => void>;
  onSpinFinish: QRL<(winner: Workout) => void>;
  triggerSpin?: number;
}

export const Wheel = component$<WheelProps>(
  ({ displayWorkouts, onSpinStart, onSpinFinish, triggerSpin }) => {
    const canvasRef = useSignal<HTMLCanvasElement>();
    const isSpinning = useSignal(false);
    const currentRotation = useSignal(0);
    const announcement = useSignal("");
    const canvasSize = useSignal(500);
    const spinTrigger = useSignal(0);

    // Responsive canvas sizing
    const getCanvasSize = $(() => {
      if (typeof window === "undefined") return 500;
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) return 280; // Small mobile - reduced
      if (screenWidth < 768) return 360; // Large mobile - reduced
      if (screenWidth < 1024) return 450; // Tablet - reduced
      return 500; // Desktop - reduced
    });

    // Update canvas size on window resize
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      const handleResize = async () => {
        canvasSize.value = await getCanvasSize();
      };

      getCanvasSize().then((size) => (canvasSize.value = size));
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    // Redraw canvas when properties change
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => displayWorkouts.length);
      track(() => currentRotation.value);
      track(() => canvasSize.value);

      const canvas = canvasRef.value;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const numOptions = displayWorkouts.length;
      const arcSize = numOptions > 0 ? (2 * Math.PI) / numOptions : 0;
      const size = canvasSize.value;
      const center = size / 2;
      const radius = center - 2;

      // Update canvas dimensions
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(currentRotation.value);
      ctx.translate(-center, -center);

      if (numOptions === 0) {
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = "#64748b";
        ctx.font = `500 ${size * 0.07}px 'Inter'`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Add Workouts", center, center);
        ctx.restore();
        return;
      }

      for (let i = 0; i < numOptions; i++) {
        const angle = i * arcSize;
        // Draw wedge
        ctx.beginPath();
        ctx.arc(center, center, radius, angle, angle + arcSize);
        ctx.lineTo(center, center);
        ctx.closePath();
        ctx.fillStyle = COLORS[i % COLORS.length];
        ctx.fill();

        // Draw separator lines
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.lineTo(
          center + Math.cos(angle) * radius,
          center + Math.sin(angle) * radius,
        );
        ctx.stroke();
        ctx.restore();

        // Draw text
        ctx.save();
        ctx.fillStyle = "white";
        const textAngle = angle + arcSize / 2;
        const textRadius = radius * 0.6;
        const textX = center + Math.cos(textAngle) * textRadius;
        const textY = center + Math.sin(textAngle) * textRadius;

        ctx.translate(textX, textY);
        let rotation = textAngle;
        if (rotation > Math.PI / 2 && rotation < (3 * Math.PI) / 2) {
          rotation += Math.PI;
        }
        ctx.rotate(rotation);

        const text = displayWorkouts[i].name;
        const maxTextWidth = radius * 0.45;
        let fontSize = size * 0.035;
        ctx.font = `600 ${fontSize}px 'Inter'`;
        while (ctx.measureText(text).width > maxTextWidth && fontSize > 8) {
          fontSize--;
          ctx.font = `600 ${fontSize}px 'Inter'`;
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, 0, 0);
        ctx.restore();
      }
      ctx.restore();

      // Add a center circle for a cleaner look
      ctx.beginPath();
      ctx.arc(center, center, size * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = "#1e293b"; // Slate 800
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 4;
      ctx.stroke();
    });

    const handleSpin = $(() => {
      if (isSpinning.value || displayWorkouts.length === 0) return;
      isSpinning.value = true;
      announcement.value = "Spinning the wheel...";

      // Notify parent that spinning started
      onSpinStart();

      const totalRotations = Math.floor(Math.random() * 5) + 8;
      const randomStopAngle = Math.random() * 2 * Math.PI;
      const targetRotation = totalRotations * 2 * Math.PI + randomStopAngle;

      const start = performance.now();
      const duration = 7000;

      const animate = (time: number) => {
        const elapsed = time - start;
        if (elapsed >= duration) {
          const finalRotation = targetRotation % (2 * Math.PI);
          currentRotation.value = finalRotation;

          // Finish spin logic moved inline
          const numOptions = displayWorkouts.length;
          const arcSize = (2 * Math.PI) / numOptions;
          const finalAngle =
            (2 * Math.PI - (finalRotation % (2 * Math.PI)) + 1.5 * Math.PI) %
            (2 * Math.PI);
          const winnerIndex = Math.floor(finalAngle / arcSize);
          const winner = displayWorkouts[winnerIndex];

          announcement.value = `Selected workout: ${winner.name}`;
          onSpinFinish(winner);
          isSpinning.value = false;
          return;
        }
        const progress = elapsed / duration;
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        currentRotation.value = targetRotation * easedProgress;
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });

    // Watch for external spin trigger (placed after handleSpin so it's defined)
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => triggerSpin);
      if (typeof triggerSpin === 'number' && triggerSpin > spinTrigger.value && !isSpinning.value && displayWorkouts.length > 0) {
        spinTrigger.value = triggerSpin;
        handleSpin();
      }
    });

    const handleKeyDown = $((e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSpin();
      }
    });

    return (
      <div class="p-1 sm:p-2 lg:p-3 flex justify-center">
        <h2 class="sr-only">Workout Selection Wheel</h2>
        <div
          class="relative"
          style={{ width: canvasSize.value + 'px', height: canvasSize.value + 'px' }}
        >
          <div
            class="absolute -top-2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 border-t-[12px] border-r-[8px] border-l-[8px] border-t-slate-600 border-r-transparent border-l-transparent sm:-top-3 sm:border-t-[18px] sm:border-r-[12px] sm:border-l-[12px]"
            aria-hidden="true"
          ></div>
          <canvas
            ref={canvasRef}
            width={canvasSize.value}
            height={canvasSize.value}
            class="h-full w-full block rounded-full shadow-sm bg-slate-100"
          />
          <p id="wheel-instructions" class="sr-only">
            Click the spin button to randomly select a workout from your collection.
            {displayWorkouts.length === 0
              ? "Add workouts to your arsenal first."
              : `${displayWorkouts.length} workouts available.`}
          </p>
          <button
            onClick$={handleSpin}
            onKeyDown$={handleKeyDown}
            disabled={isSpinning.value || displayWorkouts.length === 0}
            aria-label={
              isSpinning.value
                ? "Spinning wheel in progress"
                : displayWorkouts.length === 0
                  ? "Add workouts before spinning"
                  : "Spin wheel to select workout"
            }
            aria-describedby="wheel-instructions"
            class="absolute top-1/2 left-1/2 z-20 flex h-14 min-h-[44px] w-14 min-w-[44px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-3 border-white bg-slate-700 font-['Inter'] text-xs font-medium tracking-wider text-white uppercase shadow-md transition-all ease-in-out hover:not-disabled:bg-slate-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-400 sm:h-16 sm:w-16 sm:text-sm"
          >
            SPIN
          </button>
          <div aria-live="polite" aria-atomic="true" class="sr-only">
            {announcement.value}
          </div>
        </div>
      </div>
    );
  },
);
