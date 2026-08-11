import { useEffect, useRef, useState } from 'react';
import { MemberAvatar } from '../MemberAvatar';
import { SafeImage } from '../SafeImage';
import { MEMBERS, FEED_CARDS, ALBUMS, EVENTS, MESSAGES, GRADIENTS, IMG } from '../../../../lib/landingData';

const PANELS = [
  { id: 'feed', label: 'Feed' },
  { id: 'events', label: 'Events' },
  { id: 'albums', label: 'Albums' },
  { id: 'messages', label: 'Messages' },
  { id: 'family', label: 'Family' },
] as const;

function FeedPanel() {
  const post = FEED_CARDS[0];
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111] shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/[0.06] p-4">
        <MemberAvatar member={post.author} />
        <div>
          <p className="text-sm font-medium text-stone-100">{post.author.name}</p>
          <p className="text-xs text-stone-500">{post.time}</p>
        </div>
      </div>
      <SafeImage src={post.image} alt="" gradient={post.imageGradient} className="aspect-[4/3] w-full object-cover" />
      <div className="p-4">
        <p className="text-sm text-stone-300">{post.caption}</p>
        <p className="mt-3 text-xs text-violet-400">♥ {post.likes} · {post.comments} comments</p>
      </div>
    </div>
  );
}

function EventsPanel() {
  const ev = EVENTS[0];
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#141414] to-[#0d0d0d] p-6 shadow-2xl">
        <p className="text-xs font-medium tracking-widest text-violet-400">{ev.month}</p>
        <p className="mt-1 text-6xl font-light text-stone-50">{ev.day}</p>
        <p className="mt-4 text-xl font-medium text-stone-100">{ev.title}</p>
        <p className="mt-1 text-sm text-stone-500">{ev.time} · {ev.location}</p>
      </div>
      <div className="mt-3 space-y-2">
        {EVENTS.slice(1, 3).map((e) => (
          <div key={e.title} className="rounded-xl border border-white/[0.06] bg-[#111]/80 px-4 py-3">
            <p className="text-sm text-stone-200">{e.title}</p>
            <p className="text-xs text-stone-500">{e.month} {e.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlbumsPanel() {
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-2">
      {ALBUMS.slice(0, 4).map((a) => (
        <div key={a.title} className="overflow-hidden rounded-xl border border-white/[0.06]">
          <SafeImage src={a.cover} alt={a.title} gradient={a.gradient} className="aspect-square w-full object-cover" />
          <p className="bg-[#111] px-2 py-2 text-xs text-stone-300">{a.title}</p>
        </div>
      ))}
    </div>
  );
}

function MessagesPanel() {
  return (
    <div className="w-full max-w-md space-y-3">
      {MESSAGES.map((m, i) => (
        <div
          key={m.from}
          className="message-float rounded-2xl border border-white/[0.08] bg-[#141414]/90 p-4 backdrop-blur-sm"
          style={{ animationDelay: `${i * 0.2}s`, marginLeft: i % 2 === 0 ? 0 : '2rem' }}
        >
          <div className="mb-2 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: m.color }} />
            <span className="text-sm font-medium text-stone-200">{m.from}</span>
          </div>
          <p className="text-sm text-stone-400">&ldquo;{m.text}&rdquo;</p>
        </div>
      ))}
    </div>
  );
}

function FamilyPanel() {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111] shadow-2xl">
      <SafeImage src={IMG.gathering} alt="" gradient={GRADIENTS.brunch} className="h-32 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-stone-50">The Sharma Family</h3>
        <p className="text-sm text-stone-500">Mumbai · 4 members</p>
        <div className="mt-4 flex -space-x-2">
          {MEMBERS.map((m) => (
            <MemberAvatar key={m.name} member={m} size="md" ring />
          ))}
        </div>
      </div>
    </div>
  );
}

const PANEL_COMPONENTS = [FeedPanel, EventsPanel, AlbumsPanel, MessagesPanel, FamilyPanel];

export function ScrollShowcase() {
  const [active, setActive] = useState(0);
  const triggersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    triggersRef.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.55, rootMargin: '-20% 0px -20% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="product" className="relative bg-[#050505]">
      <div className="mx-auto max-w-7xl px-5 pt-24 sm:px-8 sm:pt-32">
        <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
          One place for everything
          <br />
          <span className="text-stone-500">that matters.</span>
        </h2>
      </div>

      <div className="relative lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="sticky top-0 hidden h-screen items-center justify-center lg:flex">
          <div className="relative h-[480px] w-full max-w-lg">
            {PANEL_COMPONENTS.map((Panel, i) => (
              <div
                key={PANELS[i].id}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                style={{
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
              >
                <Panel />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:py-8">
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              ref={(el) => {
                triggersRef.current[i] = el;
              }}
              className="flex min-h-[70vh] flex-col justify-center py-16 lg:min-h-screen lg:py-0"
            >
              <p className="text-xs font-medium tracking-[0.25em] text-violet-400">{panel.label.toUpperCase()}</p>
              <h3 className="mt-4 text-2xl font-semibold text-stone-100 sm:text-4xl">
                {panel.id === 'feed' && 'Share life as it happens'}
                {panel.id === 'events' && 'Never miss a moment'}
                {panel.id === 'albums' && 'Memories that last'}
                {panel.id === 'messages' && 'Stay close, privately'}
                {panel.id === 'family' && 'Your digital home'}
              </h3>
              <p className="mt-4 max-w-md text-stone-500">
                {panel.id === 'feed' && 'A private feed for photos, updates, and celebrations — only your family sees it.'}
                {panel.id === 'events' && 'Birthdays, reunions, dinners — organized on one shared calendar.'}
                {panel.id === 'albums' && 'Vacations, festivals, milestones — curated albums your family owns.'}
                {panel.id === 'messages' && 'Direct and group conversations built for family, not strangers.'}
                {panel.id === 'family' && 'One shared profile — members, roles, and your family story.'}
              </p>
              <div className="mt-8 lg:hidden">
                {(() => {
                  const Panel = PANEL_COMPONENTS[i];
                  return <Panel />;
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
