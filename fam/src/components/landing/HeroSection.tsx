import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { DEMO_POSTS } from '../../lib/demoContent';
import { MemberAvatar } from './premium/MemberAvatar';

const HERO_IMAGE = '/images/family/family-hero.jpg';
const post = DEMO_POSTS[0];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function FloatingCard({
  children,
  className = '',
  delay = 0,
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animate?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-[#0c0c0c]/90 p-3.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-4 ${
        animate ? 'hero-float-card' : ''
      } ${className}`}
      style={animate ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!reducedMotion) {
      const t = requestAnimationFrame(() => setLoaded(true));
      return () => cancelAnimationFrame(t);
    }
    setLoaded(true);
  }, [reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 6, y: y * -4 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const parallaxStyle = reducedMotion
    ? {}
    : {
        transform: `perspective(1200px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[720px] -translate-x-1/3 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.09)_0%,_transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-8 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] lg:gap-12 xl:gap-16">
          {/* Left — copy */}
          <div className="order-1 lg:order-none">
            <p className="text-[11px] font-medium tracking-[0.28em] text-violet-400/60">FAMZEE</p>
            <h1 className="mt-4 max-w-lg text-[2rem] font-semibold leading-[1.1] tracking-[-0.03em] text-stone-50 sm:text-[2.75rem] lg:text-[3.25rem]">
              Your family&apos;s life,
              <br />
              <span className="font-medium text-stone-200">in one private place.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-stone-400">
              Memories, conversations, events and the people you love — together in one private family space.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login?demo=1"
                className="inline-flex min-h-[48px] items-center rounded-xl bg-stone-100 px-6 text-sm font-medium text-[#0a0a0a] transition hover:bg-white hover:shadow-[0_8px_24px_-8px_rgba(255,255,255,0.25)]"
              >
                Explore FamZee
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex min-h-[48px] items-center rounded-xl border border-white/[0.12] bg-white/[0.02] px-6 text-sm text-stone-300 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-xs text-stone-600">
              Private by design · Built for families
            </p>
          </div>

          {/* Right — product visual */}
          <div
            ref={visualRef}
            className="relative order-2 mx-auto w-full max-w-[640px] lg:max-w-none lg:order-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Floating cards — desktop positioning */}
            <FloatingCard
              animate={loaded && !reducedMotion}
              delay={400}
              className="absolute -left-2 top-8 z-20 hidden w-[168px] sm:block lg:-left-6 lg:top-12 lg:w-[180px]"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/70">Event</p>
              <p className="mt-1 text-sm font-medium text-stone-200">Family Dinner</p>
              <p className="mt-0.5 text-[11px] text-stone-500">Tonight · 7:30 PM</p>
              <p className="mt-1.5 text-[10px] text-stone-600">4 family members attending</p>
            </FloatingCard>

            <FloatingCard
              animate={loaded && !reducedMotion}
              delay={650}
              className="absolute -right-1 top-[42%] z-20 hidden w-[156px] sm:block lg:-right-4 lg:w-[168px]"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/70">Album</p>
              <p className="mt-1 text-sm font-medium text-stone-200">Goa Vacation</p>
              <p className="mt-0.5 text-[11px] text-stone-500">24 memories</p>
            </FloatingCard>

            <FloatingCard
              animate={loaded && !reducedMotion}
              delay={900}
              className="absolute -bottom-2 left-6 z-20 hidden w-[188px] sm:block lg:-bottom-4 lg:left-10 lg:w-[200px]"
            >
              <div className="flex items-center gap-2">
                <MemberAvatar member={{ name: 'Rahul Sharma', color: '#6366f1' }} size="sm" />
                <p className="text-xs font-medium text-stone-300">Rahul Sharma</p>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-stone-500">&ldquo;Are we still meeting at 7:30?&rdquo;</p>
            </FloatingCard>

            {/* Main product card */}
            <div
              className="transition-transform duration-300 ease-out"
              style={parallaxStyle}
            >
              <div
                className={`hero-main-card relative z-10 overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#0B0B0D] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.85)] transition-shadow duration-500 hover:shadow-[0_40px_90px_-24px_rgba(139,92,246,0.12)] ${
                  loaded ? 'hero-main-loaded' : ''
                } ${reducedMotion ? '' : 'hero-main-float'}`}
              >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#080808] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto flex h-6 flex-1 max-w-[180px] items-center justify-center rounded-md bg-white/[0.04] px-3 text-[10px] text-stone-600 sm:max-w-[220px]">
                  famzee.app
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <p className="text-[10px] font-medium tracking-widest text-stone-600">FAMZEE</p>
                <p className="mt-1 text-sm font-medium text-stone-300">Family Feed</p>

                <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-[#111113]">
                  <div className="flex items-center gap-3 p-3.5 sm:p-4">
                    <MemberAvatar member={{ name: post.author, color: post.authorColor }} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-stone-200">{post.author}</p>
                      <p className="text-[10px] text-stone-600">{post.time}</p>
                    </div>
                  </div>
                  <p className="px-3.5 pb-3 text-sm leading-relaxed text-stone-400 sm:px-4">
                    &ldquo;{post.content}&rdquo;
                  </p>
                  <img
                    src={HERO_IMAGE}
                    alt="Family brunch together"
                    className="aspect-[16/10] w-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = post.image;
                    }}
                  />
                  <div className="flex gap-4 px-3.5 py-3 text-xs text-stone-500 sm:px-4">
                    <span>♥ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Mobile floating cards — stacked below visual context */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:hidden">
              <FloatingCard animate={false} className="col-span-1">
                <p className="text-[10px] text-violet-400/70">Event</p>
                <p className="text-xs font-medium text-stone-200">Family Dinner</p>
                <p className="text-[10px] text-stone-500">Tonight · 7:30 PM</p>
              </FloatingCard>
              <FloatingCard animate={false} className="col-span-1">
                <p className="text-[10px] text-violet-400/70">Album</p>
                <p className="text-xs font-medium text-stone-200">Goa Vacation</p>
                <p className="text-[10px] text-stone-500">24 memories</p>
              </FloatingCard>
              <FloatingCard animate={false} className="col-span-2">
                <div className="flex items-center gap-2">
                  <MemberAvatar member={{ name: 'Rahul Sharma', color: '#6366f1' }} size="sm" />
                  <p className="text-xs text-stone-400">&ldquo;Are we still meeting at 7:30?&rdquo;</p>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
