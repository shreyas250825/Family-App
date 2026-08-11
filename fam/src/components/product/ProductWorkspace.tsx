import {
  ALBUMS,
  EVENTS,
  FEED_CARDS,
  MEMBERS,
  MESSAGES,
  IMG,
  GRADIENTS,
} from '../../lib/landingData';
import { SafeImage } from '../landing/premium/SafeImage';
import { MemberAvatar } from '../landing/premium/MemberAvatar';

export type WorkspaceTab = 'feed' | 'events' | 'albums' | 'messages' | 'family';

const NAV: { id: WorkspaceTab; label: string }[] = [
  { id: 'feed', label: 'Feed' },
  { id: 'events', label: 'Events' },
  { id: 'albums', label: 'Albums' },
  { id: 'messages', label: 'Messages' },
  { id: 'family', label: 'Family' },
];

interface ProductWorkspaceProps {
  tab: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
  showTabBar?: boolean;
}

export function ProductWorkspace({ tab, onTabChange, showTabBar = false }: ProductWorkspaceProps) {
  return (
    <div className="workspace-shell overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0c0c0c] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)]">
      {showTabBar && onTabChange ? (
        <div className="flex gap-1 overflow-x-auto border-b border-white/[0.06] px-3 py-2 no-scrollbar sm:px-4">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm ${
                tab === item.id
                  ? 'bg-white/[0.08] text-stone-100'
                  : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex min-h-[400px] sm:min-h-[520px]">
        {/* Left nav — desktop only */}
        <aside className="hidden w-[140px] shrink-0 border-r border-white/[0.06] p-3 md:block lg:w-[160px] lg:p-4">
          <p className="mb-4 text-[10px] font-medium tracking-widest text-stone-600">FAMZEE</p>
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange?.(item.id)}
              className={`mb-0.5 block w-full rounded-lg px-2.5 py-2 text-left text-xs transition lg:text-sm ${
                tab === item.id ? 'bg-white/[0.06] text-stone-100' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 p-4 sm:p-5">
          <WorkspacePanel tab={tab} />
        </main>

        {/* Right — desktop only */}
        <aside className="hidden w-[180px] shrink-0 border-l border-white/[0.06] p-4 lg:block">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Upcoming</p>
          <div className="space-y-3">
            {EVENTS.slice(0, 3).map((e) => (
              <div key={e.title}>
                <p className="text-xs font-medium text-stone-200">{e.title}</p>
                <p className="text-[10px] text-stone-500">
                  {e.month} {e.day} · {e.time}
                </p>
              </div>
            ))}
          </div>
          <p className="mb-2 mt-6 text-[10px] font-medium uppercase tracking-wider text-stone-600">Family</p>
          <div className="flex -space-x-2">
            {MEMBERS.map((m) => (
              <MemberAvatar key={m.name} member={m} size="sm" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function WorkspacePanel({ tab }: { tab: WorkspaceTab }) {
  switch (tab) {
    case 'feed':
      return <FeedPanel />;
    case 'events':
      return <EventsPanel />;
    case 'albums':
      return <AlbumsPanel />;
    case 'messages':
      return <MessagesPanel />;
    case 'family':
      return <FamilyPanel />;
  }
}

function FeedPanel() {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-stone-300">Family Feed</p>
      <div className="space-y-4">
        {FEED_CARDS.slice(0, 2).map((post) => (
          <div key={post.caption} className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111]">
            <div className="flex items-center gap-3 p-3">
              <MemberAvatar member={post.author} size="sm" />
              <div>
                <p className="text-xs font-medium text-stone-200">{post.author.first}</p>
                <p className="text-[10px] text-stone-500">{post.time}</p>
              </div>
            </div>
            <SafeImage src={post.image} alt="" gradient={post.imageGradient} className="aspect-[16/9] w-full object-cover" />
            <div className="p-3">
              <p className="text-xs leading-relaxed text-stone-400">{post.caption}</p>
              <p className="mt-2 text-[10px] text-stone-600">♥ {post.likes} · {post.comments} comments</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventsPanel() {
  const featured = EVENTS[0];
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-stone-300">Events</p>
      <div className="rounded-xl border border-white/[0.06] bg-[#111] p-4">
        <p className="text-[10px] tracking-widest text-stone-500">{featured.month}</p>
        <p className="text-4xl font-light text-stone-100">{featured.day}</p>
        <p className="mt-2 text-sm font-medium text-stone-200">{featured.title}</p>
        <p className="text-xs text-stone-500">{featured.time} · {featured.location}</p>
      </div>
      <div className="mt-3 space-y-2">
        {EVENTS.slice(1).map((e) => (
          <div key={e.title} className="flex justify-between rounded-lg px-2 py-2 text-xs">
            <span className="text-stone-400">{e.title}</span>
            <span className="text-stone-600">{e.month} {e.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlbumsPanel() {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-stone-300">Albums</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ALBUMS.slice(0, 6).map((a) => (
          <div key={a.title} className="overflow-hidden rounded-lg border border-white/[0.06]">
            <SafeImage src={a.cover} alt={a.title} gradient={a.gradient} className="aspect-square w-full object-cover" />
            <p className="truncate px-2 py-1.5 text-[10px] text-stone-400">{a.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesPanel() {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-stone-300">Messages</p>
      <div className="space-y-2">
        {MESSAGES.map((m) => (
          <div key={m.from} className="rounded-xl border border-white/[0.06] bg-[#111] px-3 py-2.5">
            <p className="text-xs font-medium text-stone-300">{m.from}</p>
            <p className="mt-0.5 text-xs text-stone-500">{m.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FamilyPanel() {
  return (
    <div>
      <p className="mb-4 text-sm font-medium text-stone-300">The Sharma Family</p>
      <SafeImage src={IMG.gathering} alt="" gradient={GRADIENTS.brunch} className="mb-4 aspect-[2/1] w-full rounded-xl object-cover" />
      <p className="text-xs text-stone-500">Mumbai · 4 members</p>
      <div className="mt-4 space-y-2">
        {MEMBERS.map((m) => (
          <div key={m.name} className="flex items-center gap-3 rounded-lg py-1.5">
            <MemberAvatar member={m} size="sm" />
            <div>
              <p className="text-xs font-medium text-stone-200">{m.first}</p>
              <p className="text-[10px] text-stone-600">
                {m.role}{m.online ? ' · online' : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
