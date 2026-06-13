import { useEffect, useState } from 'react';
import { useDemoTour } from '../../context/DemoTourContext';

interface SpotlightRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export function DemoTour() {
  const { isActive, currentStep, totalSteps, step, nextStep, prevStep, skipTour } = useDemoTour();
  const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);

  useEffect(() => {
    if (!isActive) {
      setSpotlight(null);
      return;
    }

    const updateSpotlight = () => {
      if (!step.target) {
        setSpotlight(null);
        return;
      }

      const el = document.querySelector(step.target);
      if (!el) {
        setSpotlight(null);
        return;
      }

      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const rect = el.getBoundingClientRect();
      const padding = 8;
      setSpotlight({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      });
    };

    const timer = setTimeout(updateSpotlight, 450);
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
    };
  }, [isActive, step]);

  if (!isActive) return null;

  const isCenter = step.placement === 'center' || !step.target;
  const isLast = currentStep === totalSteps - 1;

  return (
    <>
      <div className="fixed inset-0 z-[100] pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="tour-spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {spotlight && (
                <rect
                  x={spotlight.left}
                  y={spotlight.top}
                  width={spotlight.width}
                  height={spotlight.height}
                  rx="16"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(15, 23, 42, 0.65)"
            mask="url(#tour-spotlight-mask)"
          />
        </svg>

        {spotlight && (
          <div
            className="fixed border-2 border-brand-primary rounded-2xl shadow-glow pointer-events-none tour-spotlight-ring"
            style={{
              top: spotlight.top,
              left: spotlight.left,
              width: spotlight.width,
              height: spotlight.height,
            }}
          />
        )}
      </div>

      <div
        className={`fixed z-[101] pointer-events-auto w-[calc(100%-2rem)] max-w-md animate-slide-up ${
          isCenter
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            : 'bottom-6 left-1/2 -translate-x-1/2 sm:bottom-auto sm:right-6 sm:top-24 sm:left-auto sm:translate-x-0'
        }`}
      >
        <div className="glass-dark rounded-2xl p-6 shadow-card border border-brand-primary/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <button onClick={skipTour} className="text-xs text-slate-400 hover:text-slate-600 transition-colors">
              Skip tour
            </button>
          </div>

          <div className="h-1.5 bg-slate-100 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-brand rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">{step.description}</p>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2.5 bg-gradient-brand rounded-xl text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-all"
            >
              {isLast ? 'Finish Tour' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function DemoTourLauncher() {
  const { isActive, restartTour } = useDemoTour();

  if (isActive) return null;

  return (
    <button
      onClick={restartTour}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-gradient-brand text-white rounded-full shadow-glow hover:scale-105 transition-all text-sm font-semibold"
      aria-label="Start demo tour"
    >
      <span>🎯</span>
      Demo Tour
    </button>
  );
}
