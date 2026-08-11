import { ReactNode } from 'react';

interface AppChromeProps {
  children: ReactNode;
  className?: string;
  url?: string;
}

export function AppChrome({ children, className = '', url = 'famzee.app' }: AppChromeProps) {
  return (
    <div className={`overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0B0B0D] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0a0a0a] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="mx-auto flex h-6 max-w-[200px] flex-1 items-center justify-center rounded-md bg-white/[0.04] px-3 text-[10px] text-stone-600 sm:max-w-xs">
          {url}
        </div>
      </div>
      <div className="min-h-[320px]">{children}</div>
    </div>
  );
}

interface TourSectionProps {
  id?: string;
  label: string;
  title: string;
  description: string;
  children: ReactNode;
  reverse?: boolean;
}

export function TourSection({ id, label, title, description, children, reverse }: TourSectionProps) {
  return (
    <section id={id} className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${reverse ? '' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <p className="text-[10px] font-medium tracking-[0.25em] text-violet-400/80">{label}</p>
            <h2 className="mt-3 text-2xl font-medium text-stone-100 sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-500">{description}</p>
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>{children}</div>
        </div>
      </div>
    </section>
  );
}
