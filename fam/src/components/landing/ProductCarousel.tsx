import { useState, useRef, useEffect } from 'react';
import { FamilyImage } from '../ui/FamilyImage';
import { HorizontalScroll } from '../ui/HorizontalScroll';
import {
  DEMO_MEMBERS,
  DEMO_POSTS_PREVIEW,
  DEMO_UPCOMING,
  DEMO_ALBUMS_GRID,
  PHOTO_WALL,
} from '../../lib/demoContent';
import { MemberAvatar } from './premium/MemberAvatar';
import type { FAMILY_IMAGES } from '../../lib/images';

type ImageKey = keyof typeof FAMILY_IMAGES;

const CARDS = ['feed', 'events', 'albums', 'messages', 'family'] as const;
type CardId = (typeof CARDS)[number];

const LABELS: Record<CardId, string> = {
  feed: 'Family Feed',
  events: 'Events',
  albums: 'Albums',
  messages: 'Messages',
  family: 'Family',
};

const ALBUM_IMAGES: ImageKey[] = ['vacation', 'brunch', 'birthday', 'diwali'];

function FeedCard() {
  const p = DEMO_POSTS_PREVIEW[0];
  return (
    <div className="flex h-full flex-col">
      <FamilyImage name="brunch" alt="" className="aspect-[16/10] w-full rounded-xl object-cover" />
      <div className="mt-4">
        <p className="text-sm font-medium text-stone-100">{p.author}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">&ldquo;{p.content}&rdquo;</p>
        <p className="mt-3 text-xs text-stone-600">♥ {p.likes} · {p.comments} comments</p>
      </div>
    </div>
  );
}

function EventsCard() {
  return (
    <div className="space-y-3">
      {DEMO_UPCOMING.slice(0, 4).map((e) => (
        <div key={e.title} className="rounded-xl border border-white/[0.06] bg-[#111113] px-4 py-3">
          <p className="text-sm font-medium text-stone-200">{e.title}</p>
          <p className="text-xs text-stone-500">{e.when}</p>
        </div>
      ))}
    </div>
  );
}

function AlbumsCard() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {DEMO_ALBUMS_GRID.slice(0, 4).map((a, i) => (
        <div key={a.title} className="overflow-hidden rounded-xl border border-white/[0.06]">
          <FamilyImage name={ALBUM_IMAGES[i] ?? 'vacation'} alt={a.title} className="aspect-square w-full object-cover" />
          <div className="p-2">
            <p className="truncate text-xs font-medium text-stone-300">{a.title}</p>
            <p className="text-[10px] text-stone-600">{a.count} photos</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesCard() {
  const msgs = [
    { from: 'Rahul Sharma', text: 'See you at dinner tonight!' },
    { from: 'Sharma Family', text: 'Reunion dates confirmed!' },
    { from: 'Meera Sharma', text: 'Sending the photos now 📸' },
  ];
  return (
    <div className="space-y-2">
      {msgs.map((m) => (
        <div key={m.from} className="rounded-xl border border-white/[0.06] bg-[#111113] px-4 py-3">
          <p className="text-xs font-medium text-stone-300">{m.from}</p>
          <p className="mt-1 text-sm text-stone-500">{m.text}</p>
        </div>
      ))}
    </div>
  );
}

function FamilyCard() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        {DEMO_MEMBERS.map((m) => (
          <div key={m.name} className="flex items-center gap-2">
            <MemberAvatar member={m} size="sm" />
            <div>
              <p className="text-xs font-medium text-stone-200">{m.first}</p>
              <p className="text-[10px] text-stone-600">{m.online ? 'Online' : 'Away'}</p>
            </div>
          </div>
        ))}
      </div>
      <FamilyImage name="gathering" alt="" className="aspect-[2/1] w-full rounded-xl object-cover" />
    </div>
  );
}

const CARD_CONTENT: Record<CardId, () => JSX.Element> = {
  feed: FeedCard,
  events: EventsCard,
  albums: AlbumsCard,
  messages: MessagesCard,
  family: FamilyCard,
};

const WALL_IMAGES: ImageKey[] = ['vacation', 'brunch', 'diwali', 'birthday', 'travel'];

export function ProductCarousel() {
  const [active, setActive] = useState<CardId>('feed');
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const idx = CARDS.indexOf(active);
    const el = railRef.current?.children[idx] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [active]);

  return (
    <div>
      <p className="mb-3 text-[10px] font-medium tracking-[0.25em] text-stone-600">FAMZEE PRODUCT</p>
      <div className="mb-6 flex gap-2 overflow-x-auto no-scrollbar">
        {CARDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm transition ${
              active === id ? 'bg-white/[0.08] text-stone-100' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {LABELS[id]}
          </button>
        ))}
      </div>

      <HorizontalScroll showArrows className="px-1">
        <div ref={railRef} className="flex gap-4 md:gap-5">
          {CARDS.map((id) => {
            const Content = CARD_CONTENT[id];
            return (
              <article
                key={id}
                className="w-[88vw] max-w-[420px] shrink-0 snap-center rounded-2xl border border-white/[0.08] bg-[#0B0B0D] p-5 sm:w-[72vw] md:w-[480px] lg:w-[520px]"
                onMouseEnter={() => setActive(id)}
              >
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-violet-400/80">{LABELS[id]}</p>
                <Content />
              </article>
            );
          })}
        </div>
      </HorizontalScroll>

      <div className="mt-4 flex justify-center gap-1.5">
        {CARDS.map((id) => (
          <button
            key={id}
            type="button"
            aria-label={LABELS[id]}
            onClick={() => setActive(id)}
            className={`h-1.5 rounded-full transition-all duration-300 ${active === id ? 'w-5 bg-violet-500/80' : 'w-1.5 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PhotoWallRail() {
  const [preview, setPreview] = useState<(typeof PHOTO_WALL)[0] | null>(null);

  return (
    <>
      <HorizontalScroll>
        {PHOTO_WALL.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setPreview(item)}
            className="group relative w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[280px]"
          >
            <FamilyImage
              name={WALL_IMAGES[i] ?? 'vacation'}
              alt={item.title}
              className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 text-sm font-medium text-white">{item.title}</p>
          </button>
        ))}
      </HorizontalScroll>
      {preview ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal
        >
          <div className="max-w-lg text-center" onClick={(e) => e.stopPropagation()}>
            <FamilyImage
              name={WALL_IMAGES[PHOTO_WALL.findIndex((p) => p.title === preview.title)] ?? 'brunch'}
              alt={preview.title}
              className="mx-auto max-h-[60vh] rounded-xl object-cover"
            />
            <p className="mt-4 text-lg text-stone-100">{preview.title}</p>
            <button type="button" className="mt-4 text-sm text-stone-400 hover:text-stone-200" onClick={() => setPreview(null)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
