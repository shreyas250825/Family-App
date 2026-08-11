import { useCallback, useEffect, useRef, useState } from 'react';

const MOMENTS = [
  {
    id: 1,
    title: 'Sunday brunch',
    subtitle: 'Three generations, one table',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&h=1200&fit=crop',
    tag: 'Family',
  },
  {
    id: 2,
    title: 'Beach vacation',
    subtitle: 'Memories that last forever',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=1200&fit=crop',
    tag: 'Travel',
  },
  {
    id: 3,
    title: 'Birthday surprise',
    subtitle: 'Celebrating every milestone',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad55?w=900&h=1200&fit=crop',
    tag: 'Celebrate',
  },
  {
    id: 4,
    title: 'Wedding day',
    subtitle: 'Love across generations',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&h=1200&fit=crop',
    tag: 'Wedding',
  },
  {
    id: 5,
    title: 'Holiday dinner',
    subtitle: 'Traditions that bring us home',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=900&h=1200&fit=crop',
    tag: 'Home',
  },
  {
    id: 6,
    title: 'Kids at play',
    subtitle: 'Growing up together',
    image: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=900&h=1200&fit=crop',
    tag: 'Kids',
  },
  {
    id: 7,
    title: 'Golden hour',
    subtitle: 'Quiet moments that matter',
    image: 'https://images.unsplash.com/photo-1609220136736-443891a64571?w=900&h=1200&fit=crop',
    tag: 'Moments',
  },
];

export function CardSwipeSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragDelta = useRef(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % MOMENTS.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + MOMENTS.length) % MOMENTS.length);
  }, []);

  useEffect(() => {
    if (paused || isDragging) return;
    const timer = setInterval(next, 3200);
    return () => clearInterval(timer);
  }, [paused, isDragging, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    dragDelta.current = 0;
    setIsDragging(true);
    setPaused(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    dragDelta.current = e.clientX - dragStart.current;
    setDragX(dragDelta.current);
  };

  const onPointerUp = () => {
    if (dragStart.current === null) return;
    if (dragDelta.current < -60) next();
    else if (dragDelta.current > 60) prev();
    dragStart.current = null;
    dragDelta.current = 0;
    setDragX(0);
    setIsDragging(false);
    setTimeout(() => setPaused(false), 400);
  };

  const getOffset = (index: number) => {
    let diff = index - active;
    const half = Math.floor(MOMENTS.length / 2);
    if (diff > half) diff -= MOMENTS.length;
    if (diff < -half) diff += MOMENTS.length;
    return diff;
  };

  return (
    <section
      id="moments"
      className="relative py-24 sm:py-32 overflow-hidden bg-neutral-950 text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(131,58,180,0.25)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(225,48,108,0.15)_0%,_transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-pink-300/80 mb-4">
          Real moments
        </p>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
          Your family, in motion
        </h2>
        <p className="text-neutral-400 text-lg max-w-xl mx-auto">
          Swipe through the moments that make a family — swipe, drag, or just watch.
        </p>
      </div>

      <div
        className="relative h-[420px] sm:h-[520px] flex items-center justify-center perspective-3d touch-pan-y select-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {MOMENTS.map((moment, index) => {
          const offset = getOffset(index);
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          const translateX = offset * 180 + (isActive ? dragX * 0.35 : 0);
          const rotateY = offset * -28 + (isActive ? dragX * -0.04 : 0);
          const translateZ = isActive ? 80 : -abs * 90;
          const scale = isActive ? 1 : Math.max(0.72, 1 - abs * 0.12);
          const opacity = abs > 2 ? 0 : isActive ? 1 : Math.max(0.35, 1 - abs * 0.28);

          return (
            <article
              key={moment.id}
              className="absolute w-[240px] sm:w-[300px] h-[360px] sm:h-[440px] rounded-3xl overflow-hidden card-3d"
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex: 20 - abs,
                transition: isDragging && isActive
                  ? 'none'
                  : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              onClick={() => {
                if (offset !== 0) setActive(index);
              }}
            >
              <img
                src={moment.image}
                alt={moment.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-white/20 rounded-3xl" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-md border border-white/20">
                  {moment.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">{moment.title}</h3>
                <p className="text-sm text-white/70">{moment.subtitle}</p>
              </div>
              {isActive && (
                <div className="absolute inset-0 shadow-[0_25px_80px_-20px_rgba(225,48,108,0.45)] pointer-events-none rounded-3xl" />
              )}
            </article>
          );
        })}
      </div>

      <div className="relative flex items-center justify-center gap-4 mt-10">
        <button
          type="button"
          onClick={prev}
          className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {MOMENTS.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-ig-gradient' : 'w-1.5 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to ${m.title}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 transition-colors flex items-center justify-center"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
