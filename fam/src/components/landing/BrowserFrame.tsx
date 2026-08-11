import { ReactNode } from 'react';

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
}

export function BrowserFrame({ children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-neutral-100 shadow-premium ring-1 ring-neutral-200/80 ${className}`}>
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <div className="mx-auto flex h-7 max-w-xs flex-1 items-center justify-center rounded-md bg-neutral-100 px-3 text-[11px] text-neutral-400">
          famzee.app/dashboard
        </div>
      </div>
      <div className="bg-gradient-to-br from-stone-50 via-indigo-50/30 to-amber-50/20">{children}</div>
    </div>
  );
}
