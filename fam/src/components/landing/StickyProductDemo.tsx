import { useState, useEffect, useRef } from 'react';
import { AppChrome } from './tour/TourPrimitives';
import { MockPanelByFeature } from './tour/MockPanels';
import type { TourFeature } from '../../lib/demoContent';

const TABS: { id: TourFeature; label: string; headline: string; body: string }[] = [
  { id: 'feed', label: 'Feed', headline: 'Share the moments that matter', body: 'Photos, updates and memories — shared only with your family.' },
  { id: 'events', label: 'Events', headline: 'Never miss what you plan together', body: 'Birthdays, dinners and reunions on one shared calendar.' },
  { id: 'albums', label: 'Albums', headline: 'Memories that stay organized', body: 'Beautiful albums everyone can revisit anytime.' },
  { id: 'messages', label: 'Messages', headline: 'Talk to your family, privately', body: 'Group chats and one-on-one conversations.' },
  { id: 'family', label: 'Family', headline: 'Your circle, together', body: 'See who\'s in your space and what\'s happening.' },
];

export function StickyProductDemo() {
  const [active, setActive] = useState<TourFeature>('feed');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(TABS[i].id);
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="product" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <p className="text-[10px] font-medium tracking-[0.25em] text-stone-600">EVERYTHING YOUR FAMILY NEEDS</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium text-stone-100 sm:text-4xl">
          One private space for
          <br />
          <span className="text-stone-500">the moments that matter.</span>
        </h2>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActive(t.id);
                sectionRefs.current[TABS.findIndex((x) => x.id === t.id)]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm transition min-h-[44px] ${
                active === t.id ? 'bg-violet-500/15 text-violet-200' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="space-y-24 py-8 lg:space-y-[70vh] lg:py-16">
            {TABS.map((t, i) => (
              <div
                key={t.id}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className={`transition-opacity duration-300 lg:max-w-md ${active === t.id ? 'opacity-100' : 'opacity-40 lg:opacity-100'}`}
              >
                <p className="text-[10px] font-medium uppercase tracking-wider text-violet-400/70">{t.label}</p>
                <h3 className="mt-2 text-xl font-medium text-stone-100 sm:text-2xl">{t.headline}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AppChrome url={`famzee.app/${active}`} className="min-h-[480px] transition-opacity duration-300">
                <MockPanelByFeature feature={active} />
              </AppChrome>
            </div>
          </div>
        </div>

        {/* Mobile: show panel below active story block */}
        <div className="mt-8 lg:hidden">
          <AppChrome url={`famzee.app/${active}`}>
            <MockPanelByFeature feature={active} />
          </AppChrome>
        </div>
      </div>
    </section>
  );
}
