import { useState } from 'react';
import { ProductWorkspace, WorkspaceTab } from '../product/ProductWorkspace';

export function LiveProductShowcase() {
  const [tab, setTab] = useState<WorkspaceTab>('feed');
  const tabs: { id: WorkspaceTab; label: string }[] = [
    { id: 'feed', label: 'Feed' },
    { id: 'events', label: 'Events' },
    { id: 'albums', label: 'Albums' },
    { id: 'messages', label: 'Messages' },
    { id: 'family', label: 'Family' },
  ];

  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <h2 className="text-2xl font-medium text-stone-100 sm:text-4xl">See FamZee in action.</h2>
        <p className="mt-2 max-w-lg text-sm text-stone-500">
          Explore the full product — feed, events, albums, messages, and family — right here.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`min-h-[44px] rounded-lg px-4 py-2 text-sm transition ${
                tab === t.id ? 'bg-violet-500/15 text-violet-200' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-8 transition-opacity duration-300">
          <ProductWorkspace tab={tab} onTabChange={setTab} showTabBar />
        </div>
      </div>
    </section>
  );
}
