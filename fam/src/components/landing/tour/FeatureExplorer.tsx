import { useState } from 'react';
import { TOUR_FEATURES, TourFeature } from '../../../lib/demoContent';
import { AppChrome } from './TourPrimitives';
import { MockPanelByFeature } from './MockPanels';

export function FeatureExplorer() {
  const [active, setActive] = useState<TourFeature>('feed');

  return (
    <section id="features" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="text-2xl font-medium text-stone-100 sm:text-3xl">
          Everything your family needs.
          <br />
          <span className="text-stone-500">All in one place.</span>
        </h2>
        <p className="mt-3 max-w-lg text-sm text-stone-500">
          From everyday moments to the memories you&apos;ll keep forever.
        </p>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {TOUR_FEATURES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
                active === f.id ? 'bg-white/[0.08] text-stone-100' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-6 transition-opacity duration-300">
          <AppChrome url={`famzee.app/${active}`}>
            <MockPanelByFeature feature={active} />
          </AppChrome>
        </div>
      </div>
    </section>
  );
}
