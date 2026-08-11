import { useRef, useState, useEffect } from 'react';
import { FAMILY_IMAGES } from '../../lib/images';
import { MemberAvatar } from './premium/MemberAvatar';

const NAV_ITEMS = ['Feed', 'Events', 'Albums', 'Messages'];

export function HeroProductStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = (e.clientX - cx) / rect.width;
      const y = (e.clientY - cy) / rect.height;
      setTilt({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const px = tilt.x * 8;
  const py = tilt.y * 6;

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto h-[420px] w-full max-w-[620px] sm:h-[480px] lg:mx-0 lg:h-[520px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{ perspective: '1200px' }}
    >
      {/* Album card — back left */}
      <div
        className="hero-float absolute left-0 top-8 z-10 w-[200px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl transition-transform duration-500 ease-out sm:w-[220px]"
        style={{
          transform: `translate(${-px * 0.5}px, ${py * 0.5}px) rotate(-4deg)`,
        }}
      >
        <img src={FAMILY_IMAGES.vacation} alt="Goa Vacation album" className="aspect-[4/3] w-full object-cover" loading="eager" />
        <div className="p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/70">Album</p>
          <p className="text-sm font-medium text-stone-200">Goa Vacation</p>
          <p className="text-xs text-stone-600">24 photos</p>
        </div>
      </div>

      {/* Event card — back right */}
      <div
        className="hero-float absolute right-0 top-0 z-10 w-[190px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl transition-transform duration-500 ease-out sm:w-[210px]"
        style={{
          animationDelay: '1.5s',
          transform: `translate(${px * 0.6}px, ${-py * 0.4}px) rotate(3deg)`,
        }}
      >
        <div className="bg-violet-500/10 px-3 py-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/80">Event</p>
        </div>
        <div className="p-3">
          <p className="text-sm font-medium text-stone-100">Family Dinner</p>
          <p className="mt-1 text-xs text-stone-500">Tonight · 7:30 PM</p>
        </div>
      </div>

      {/* Main feed card */}
      <div
        className="absolute left-1/2 top-1/2 z-20 w-[92%] max-w-[580px] -translate-x-1/2 -translate-y-[46%] overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#0B0B0D] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out"
        style={{
          transform: `translate(calc(-50% + ${px}px), calc(-46% + ${py * 0.8}px)) ${hovered ? 'scale(1.02)' : 'scale(1)'}`,
          boxShadow: hovered ? '0 48px 100px -24px rgba(124,58,237,0.15)' : undefined,
        }}
      >
        <div className="flex items-center gap-1 border-b border-white/[0.06] px-3 py-2.5">
          <span className="mr-2 text-[10px] font-medium tracking-widest text-stone-500">FAMZEE</span>
          {NAV_ITEMS.map((item, i) => (
            <span
              key={item}
              className={`rounded-md px-2 py-1 text-[10px] sm:text-xs ${i === 0 ? 'bg-white/[0.08] text-stone-200' : 'text-stone-600'}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="p-4">
          <div className="mb-3 flex items-center gap-3">
            <MemberAvatar member={{ name: 'Ananya Sharma', color: '#7c3aed' }} size="sm" />
            <div>
              <p className="text-sm font-medium text-stone-100">Ananya Sharma</p>
              <p className="text-[10px] text-stone-600">3 hours ago</p>
            </div>
          </div>
          <p className="mb-3 text-sm leading-relaxed text-stone-400">
            &ldquo;Sunday brunch with everyone — three generations at one table.&rdquo;
          </p>
          <img
            src={FAMILY_IMAGES.brunch}
            alt="Family brunch"
            className="aspect-[16/10] w-full rounded-xl object-cover"
            loading="eager"
          />
          <p className="mt-3 text-xs text-stone-500">♥ 24 · 💬 8</p>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)',
          transform: `translate(${px * 2}px, ${py * 2}px)`,
        }}
      />
    </div>
  );
}
