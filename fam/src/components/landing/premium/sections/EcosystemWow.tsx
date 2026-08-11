import { useState, useEffect } from 'react';
import { ECOSYSTEM } from '../../../../lib/landingData';

const WORDS = ['MEMORIES', 'PEOPLE', 'EVENTS', 'CONVERSATIONS', 'MOMENTS'];

export function EcosystemWow() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-[#030303] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.15] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-6xl">
          Everything your family does.
          <br />
          <span className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
            One private space.
          </span>
        </h2>

        <div className="relative mx-auto mt-20 max-w-lg sm:h-[380px] sm:max-w-xl">
          {/* Mobile: simple grid */}
          <div className="grid grid-cols-2 gap-3 sm:hidden">
            {ECOSYSTEM.map((node) => (
              <div key={node.label} className="rounded-xl border border-white/[0.08] bg-[#111]/90 p-4">
                <p className="text-sm font-medium text-stone-200">{node.label}</p>
                <p className="text-[10px] text-stone-500">{node.sub}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-xl border border-violet-500/30 bg-[#141414]/90 p-4 text-center">
              <p className="text-xs tracking-widest text-violet-400">FAMILY</p>
              <p className="mt-1 font-semibold text-stone-100">Your Family Space</p>
            </div>
          </div>

          {/* Desktop: orbiting layout */}
          <div className="relative hidden h-full sm:block">
          {/* Center hub */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-2xl border border-violet-500/30 bg-[#141414]/90 px-6 py-4 backdrop-blur-md">
              <p className="text-xs tracking-widest text-violet-400">FAMILY</p>
              <p className="mt-1 text-lg font-semibold text-stone-100">Your Family Space</p>
            </div>
          </div>

          {/* Orbiting ecosystem cards */}
          {ECOSYSTEM.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * node.dist;
            const y = Math.sin(rad) * node.dist * 0.85;
            return (
              <div
                key={node.label}
                className="ecosystem-orbit absolute left-1/2 top-1/2 z-10"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                <div className="rounded-xl border border-white/[0.08] bg-[#111]/90 px-4 py-3 backdrop-blur-sm transition hover:border-violet-500/30">
                  <p className="text-sm font-medium text-stone-200">{node.label}</p>
                  <p className="text-[10px] text-stone-500">{node.sub}</p>
                </div>
              </div>
            );
          })}

          {/* Connection lines SVG */}
          <svg className="absolute inset-0 h-full w-full opacity-20" aria-hidden>
            <circle cx="50%" cy="50%" r="120" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="4 8" />
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
          </svg>
          </div>
        </div>

        {/* Rotating word */}
        <p
          key={WORDS[wordIndex]}
          className="mt-8 text-2xl font-light tracking-[0.3em] text-stone-500 animate-fade-in sm:text-3xl"
        >
          {WORDS[wordIndex]}
        </p>
      </div>
    </section>
  );
}
