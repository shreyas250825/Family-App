import { useState } from 'react';
import { HorizontalScroll } from '../../ui/HorizontalScroll';
import { TOUR_FEATURES, TourFeature } from '../../../lib/demoContent';
import { MockPanelByFeature } from './MockPanels';

const MOBILE_TABS = TOUR_FEATURES.filter((f) => ['feed', 'events', 'albums', 'messages', 'family'].includes(f.id));

export function MobileProductTour() {
  const [active, setActive] = useState<TourFeature>('feed');

  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-20 lg:hidden">
      <div className="mx-auto max-w-6xl px-5">
        <h2 className="text-xl font-medium text-stone-100">FamZee on mobile</h2>
        <p className="mt-2 text-sm text-stone-500">Swipe through the app experience.</p>

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
          {MOBILE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id as TourFeature)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs ${active === t.id ? 'bg-violet-500/15 text-violet-300' : 'text-stone-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative mx-auto mt-6 max-w-[300px]">
          <div className="rounded-[2rem] bg-[#0a0a0a] p-2 ring-1 ring-white/[0.08]">
            <div className="mx-auto mb-1 h-4 w-20 rounded-full bg-black" aria-hidden />
            <div className="overflow-hidden rounded-[1.5rem] bg-[#0B0B0D]">
              <MockPanelByFeature feature={active} />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <HorizontalScroll showArrows={false}>
            {MOBILE_TABS.map((t) => (
              <div
                key={t.id}
                className="w-[88vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0B0B0D]"
                onTouchStart={() => setActive(t.id as TourFeature)}
              >
                <div className="border-b border-white/[0.06] px-4 py-2 text-xs font-medium text-violet-400/80">{t.label}</div>
                <MockPanelByFeature feature={t.id as TourFeature} />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </div>
    </section>
  );
}

export function DesktopMobilePreview() {
  const tabs: TourFeature[] = ['feed', 'events', 'albums', 'messages', 'family'];
  const [active, setActive] = useState<TourFeature>('feed');

  return (
    <section className="hidden border-t border-white/[0.04] py-16 lg:block">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-2xl font-medium text-stone-100">Designed for every screen</h2>
        <p className="mt-2 text-sm text-stone-500">The same premium experience on desktop and mobile.</p>
        <div className="mt-8 flex flex-wrap items-start gap-10">
          <div className="flex-1 min-w-[280px]">
            <HorizontalScroll showArrows>
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActive(t)}
                  className={`w-[420px] shrink-0 snap-center overflow-hidden rounded-2xl border text-left transition ${
                    active === t ? 'border-violet-500/30' : 'border-white/[0.06]'
                  } bg-[#0B0B0D]`}
                >
                  <div className="border-b border-white/[0.06] px-4 py-2 text-xs capitalize text-stone-400">{t}</div>
                  <MockPanelByFeature feature={t} />
                </button>
              ))}
            </HorizontalScroll>
          </div>
          <div className="mx-auto w-[280px] shrink-0">
            <div className="rounded-[2.25rem] bg-[#0a0a0a] p-2.5 ring-1 ring-white/[0.08]">
              <div className="mx-auto mb-1.5 h-5 w-[88px] rounded-full bg-black" />
              <div className="overflow-hidden rounded-[1.75rem] bg-[#0B0B0D]">
                <MockPanelByFeature feature={active} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
