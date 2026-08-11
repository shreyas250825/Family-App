import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
}

export function PhoneFrame({ children, className = '' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[300px] ${className}`}>
      <div className="relative rounded-[2.25rem] sm:rounded-[2.5rem] bg-neutral-950 p-2 sm:p-2.5 shadow-premium ring-1 ring-neutral-800/80">
        <div
          className="absolute top-2 left-1/2 z-20 h-5 w-[88px] -translate-x-1/2 rounded-full bg-neutral-950"
          aria-hidden
        />
        <div className="overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] bg-white aspect-[9/19] min-h-[420px] max-h-[560px]">
          {children}
        </div>
      </div>
    </div>
  );
}
