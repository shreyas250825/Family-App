import { ReactNode } from 'react';

interface AppChromeProps {
  children: ReactNode;
  className?: string;
  url?: string;
}

export function AppChrome({ children, className = '', url = 'famzee.app' }: AppChromeProps) {
  return (
    <div className={`overflow-hidden rounded-[20px] border shadow-[var(--shadow)] ${className}`} style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: 'var(--border)', background: 'var(--elevated)' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--border)' }} />
        </div>
        <div className="mx-auto flex h-6 max-w-[200px] flex-1 items-center justify-center rounded-md px-3 text-[10px] fam-muted sm:max-w-xs" style={{ background: 'var(--primary-soft)' }}>
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
    <section id={id} className="border-t py-16 sm:py-24" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-14 ${reverse ? '' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            <p className="text-[10px] font-medium tracking-[0.25em] ld-kicker">{label}</p>
            <h2 className="mt-3 text-2xl font-medium sm:text-3xl">{title}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed fam-muted">{description}</p>
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>{children}</div>
        </div>
      </div>
    </section>
  );
}
