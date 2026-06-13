import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOUR_STEPS, TOUR_STORAGE_KEY } from '../constants/tourSteps';

interface DemoTourContextValue {
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  step: (typeof TOUR_STEPS)[number];
  startTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  restartTour: () => void;
}

const DemoTourContext = createContext<DemoTourContextValue | null>(null);

export function DemoTourProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = useCallback(
    (index: number) => {
      const step = TOUR_STEPS[index];
      if (step) {
        navigate(step.path);
        setCurrentStep(index);
      }
    },
    [navigate]
  );

  const startTour = useCallback(() => {
    setIsActive(true);
    setCurrentStep(0);
    navigate(TOUR_STEPS[0].path);
  }, [navigate]);

  const nextStep = useCallback(() => {
    if (currentStep >= TOUR_STEPS.length - 1) {
      setIsActive(false);
      localStorage.setItem(TOUR_STORAGE_KEY, 'true');
      return;
    }
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }, [currentStep, goToStep]);

  const skipTour = useCallback(() => {
    setIsActive(false);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  }, []);

  const restartTour = useCallback(() => {
    localStorage.removeItem(TOUR_STORAGE_KEY);
    startTour();
  }, [startTour]);

  return (
    <DemoTourContext.Provider
      value={{
        isActive,
        currentStep,
        totalSteps: TOUR_STEPS.length,
        step: TOUR_STEPS[currentStep],
        startTour,
        nextStep,
        prevStep,
        skipTour,
        restartTour,
      }}
    >
      {children}
    </DemoTourContext.Provider>
  );
}

export function useDemoTour() {
  const ctx = useContext(DemoTourContext);
  if (!ctx) throw new Error('useDemoTour must be used within DemoTourProvider');
  return ctx;
}

export function useTourAutoPrompt() {
  const { startTour } = useDemoTour();

  useEffect(() => {
    const dismissed = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => startTour(), 1200);
      return () => clearTimeout(timer);
    }
  }, [startTour]);
}
