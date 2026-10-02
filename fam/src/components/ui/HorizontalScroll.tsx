import { useRef, useState, useEffect, ReactNode } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
  showArrows?: boolean;
  gap?: string;
}

export function HorizontalScroll({ children, className = '', showArrows = true, gap = 'gap-4' }: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.85), behavior: 'smooth' });
  };

  return (
    <div className={`relative ${className}`}>
      {showArrows ? (
        <>
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition disabled:opacity-0 md:flex"
            style={{ borderColor: 'var(--border)', background: 'var(--elevated)', color: 'var(--text)' }}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            disabled={!canRight}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition disabled:opacity-0 md:flex"
            style={{ borderColor: 'var(--border)', background: 'var(--elevated)', color: 'var(--text)' }}
          >
            →
          </button>
        </>
      ) : null}
      <div
        ref={ref}
        className={`flex overflow-x-auto overscroll-x-contain scroll-smooth pb-2 ${gap} snap-x snap-mandatory no-scrollbar`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
    </div>
  );
}
