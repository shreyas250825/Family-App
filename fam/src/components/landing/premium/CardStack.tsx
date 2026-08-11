import { useCallback, useRef, useState, useEffect, type PointerEvent as ReactPointerEvent } from 'react';
import { FeedCard } from '../../../lib/landingData';
import { MemberAvatar } from './MemberAvatar';
import { SafeImage } from './SafeImage';

interface CardStackProps {
  cards: FeedCard[];
  className?: string;
}

export function CardStack({ cards, className = '' }: CardStackProps) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => (i + dir + cards.length) % cards.length);
      setDragX(0);
    },
    [cards.length]
  );

  const onPointerDown = (e: ReactPointerEvent) => {
    startX.current = e.clientX;
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragging) return;
    setDragX(e.clientX - startX.current);
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (dragX < -60) advance(1);
    else if (dragX > 60) advance(-1);
    else setDragX(0);
  };

  const visible = [0, 1, 2].map((offset) => {
    const i = (index + offset) % cards.length;
    return { card: cards[i], offset };
  });

  return (
    <div className={`relative select-none touch-pan-y ${className}`}>
      <div
        className="relative mx-auto h-[420px] w-full max-w-[340px] sm:h-[480px] sm:max-w-[380px]"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {visible
          .slice()
          .reverse()
          .map(({ card, offset }) => {
            const isTop = offset === 0;
            const baseRotate = offset === 1 ? -4 : offset === 2 ? 5 : 0;
            const baseY = offset * 14;
            const baseScale = 1 - offset * 0.04;
            const dragRotate = isTop ? dragX * 0.04 : 0;
            const dragTranslate = isTop ? dragX : 0;
            const opacity = offset === 2 ? 0.5 : offset === 1 ? 0.75 : 1;

            return (
              <article
                key={`${card.id}-${offset}`}
                className="absolute inset-x-0 top-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-[#141414] shadow-2xl shadow-black/60"
                style={{
                  transform: `translateX(${dragTranslate}px) translateY(${baseY}px) rotate(${baseRotate + dragRotate}deg) scale(${baseScale})`,
                  transformOrigin: 'center bottom',
                  zIndex: 10 - offset,
                  opacity,
                  transition: dragging
                    ? 'none'
                    : reducedMotion
                      ? 'none'
                      : 'transform 0.55s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.4s ease',
                  cursor: isTop ? 'grab' : 'default',
                }}
              >
                <SafeImage
                  src={card.image}
                  alt={card.caption}
                  gradient={card.imageGradient}
                  className="h-52 w-full object-cover sm:h-60"
                />
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <MemberAvatar member={card.author} size="md" />
                    <div>
                      <p className="text-sm font-semibold text-stone-100">{card.author.first}</p>
                      <p className="text-xs text-stone-500">{card.time}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-stone-300 line-clamp-3">{card.caption}</p>
                  <div className="mt-4 flex gap-4 text-xs text-stone-500">
                    <span className="text-violet-400">♥ {card.likes}</span>
                    <span>{card.comments} comments</span>
                  </div>
                </div>
              </article>
            );
          })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Go to card ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-violet-500' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-stone-600">Swipe or drag to explore</p>
    </div>
  );
}
