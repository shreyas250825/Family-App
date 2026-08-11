import { useState } from 'react';
import {
  DEMO_POSTS,
  DEMO_UPCOMING,
  DEMO_ALBUMS_GRID,
  DEMO_MESSAGES,
  DEMO_CHAT,
  DEMO_MEMBERS,
  DEMO_FAMILY_STATS,
  DEMO_NOTIFICATIONS,
  DEMO_MEMBER_PROFILE,
  TourFeature,
} from '../../../lib/demoContent';
import { MemberAvatar } from '../premium/MemberAvatar';

export function MockFeedPanel({ compact = false }: { compact?: boolean }) {
  const posts = compact ? DEMO_POSTS.slice(0, 2) : DEMO_POSTS;
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Family Feed</p>
      <div className="space-y-3">
        {posts.map((p) => (
          <article key={p.author} className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111113]">
            <div className="flex items-center gap-2.5 p-3">
              <MemberAvatar member={{ name: p.author, color: p.authorColor }} size="sm" />
              <div>
                <p className="text-xs font-medium text-stone-200">{p.author}</p>
                <p className="text-[10px] text-stone-600">{p.time}</p>
              </div>
            </div>
            <p className="px-3 pb-2 text-xs leading-relaxed text-stone-400">{p.content}</p>
            <img src={p.image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            <p className="px-3 py-2 text-[10px] text-stone-600">♥ {p.likes} · 💬 {p.comments} comments</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function MockComposerPanel() {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'photo' | 'update'>('photo');
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Share a memory</p>
      <div className="rounded-xl border border-white/[0.06] bg-[#111113] p-4">
        <div className="mb-3 flex items-center gap-2.5">
          <MemberAvatar member={{ name: 'Ananya Sharma', color: '#7c3aed' }} size="sm" />
          <span className="text-xs text-stone-300">Ananya Sharma</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a memory with your family..."
          rows={3}
          className="w-full resize-none rounded-lg border border-white/[0.06] bg-[#0a0a0a] px-3 py-2.5 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode('photo')}
            className={`rounded-lg px-3 py-1.5 text-xs transition ${mode === 'photo' ? 'bg-violet-500/15 text-violet-300' : 'text-stone-500 hover:text-stone-300'}`}
          >
            📷 Photo
          </button>
          <button
            type="button"
            onClick={() => setMode('update')}
            className={`rounded-lg px-3 py-1.5 text-xs transition ${mode === 'update' ? 'bg-violet-500/15 text-violet-300' : 'text-stone-500 hover:text-stone-300'}`}
          >
            ✍️ Update
          </button>
        </div>
        {text.trim() ? (
          <div className="mt-3 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2 text-xs text-violet-200/80">
            Preview · {mode === 'photo' ? 'Photo post' : 'Text update'} ready to share
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function MockEventsPanel() {
  const [rsvp, setRsvp] = useState<Record<string, string>>({ '0': 'going', '1': 'going', '2': 'maybe' });
  const featured = DEMO_UPCOMING[0];
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Family Events</p>
      <div className="mb-3 overflow-hidden rounded-xl border border-white/[0.06]">
        <img src={featured.image} alt="" className="h-28 w-full object-cover" loading="lazy" />
        <div className="bg-[#111113] p-3">
          <p className="text-sm font-medium text-stone-100">{featured.title}</p>
          <p className="text-xs text-stone-500">{featured.when} · {featured.location}</p>
          <p className="mt-1 text-[10px] text-stone-600">{featured.attendees} attending</p>
          <div className="mt-2 flex gap-1.5">
            {(['going', 'maybe', 'not'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRsvp({ ...rsvp, '0': s })}
                className={`rounded-md px-2 py-1 text-[10px] ${rsvp['0'] === s ? 'bg-emerald-500/20 text-emerald-300' : 'text-stone-600'}`}
              >
                {s === 'going' ? 'Going' : s === 'maybe' ? 'Maybe' : 'Not going'}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1.5">
        {DEMO_UPCOMING.slice(1).map((e) => (
          <div key={e.title} className="flex justify-between rounded-lg px-2 py-2 text-xs">
            <span className="text-stone-400">{e.title}</span>
            <span className="text-stone-600">{e.when.split(' · ')[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockAlbumsPanel({ onSelectAlbum }: { onSelectAlbum?: (idx: number) => void }) {
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Photo Albums</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {DEMO_ALBUMS_GRID.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => onSelectAlbum?.(i)}
            className="group overflow-hidden rounded-lg border border-white/[0.06] text-left transition hover:border-white/10"
          >
            <img src={a.cover} alt={a.title} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
            <div className="p-1.5">
              <p className="truncate text-[10px] font-medium text-stone-300">{a.title}</p>
              <p className="text-[9px] text-stone-600">{a.count} photos</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MockAlbumViewerPanel({ albumIndex = 0 }: { albumIndex?: number }) {
  const album = DEMO_ALBUMS_GRID[albumIndex] ?? DEMO_ALBUMS_GRID[0];
  const [activeThumb, setActiveThumb] = useState(0);
  const imgs = album.thumbs;
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-1 text-xs font-medium text-stone-200">{album.title}</p>
      <p className="mb-3 text-[10px] text-stone-600">{album.count} memories</p>
      <img src={imgs[activeThumb]} alt={album.title} className="mb-3 aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
      <div className="mb-3 flex gap-1.5 overflow-x-auto no-scrollbar">
        {imgs.map((src, i) => (
          <button key={i} type="button" onClick={() => setActiveThumb(i)} className={`shrink-0 overflow-hidden rounded-md border-2 ${activeThumb === i ? 'border-violet-500' : 'border-transparent'}`}>
            <img src={src} alt="" className="h-10 w-10 object-cover" loading="lazy" />
          </button>
        ))}
      </div>
      <div className="flex gap-4 text-xs text-stone-500">
        <span>♥ Like</span>
        <span>💬 Comment</span>
        <span>↗ Share with family</span>
      </div>
    </div>
  );
}

export function MockMessagesPanel() {
  return (
    <div className="flex min-h-[340px]">
      <div className="hidden w-[38%] border-r border-white/[0.06] sm:block">
        <div className="p-3">
          <p className="mb-2 text-xs font-medium text-stone-400">Messages</p>
          {DEMO_MESSAGES.map((m) => (
            <div key={m.id} className={`mb-1 rounded-lg px-2 py-2 ${m.active ? 'bg-white/[0.06]' : ''}`}>
              <p className="text-[10px] font-medium text-stone-300">{m.name}</p>
              <p className="truncate text-[9px] text-stone-600">{m.preview}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="min-w-0 flex-1 p-3">
        <p className="mb-1 text-xs font-medium text-stone-200">Sharma Family</p>
        <p className="mb-3 text-[10px] text-emerald-500">4 members · active</p>
        <div className="space-y-2">
          {DEMO_CHAT.map((msg, i) => (
            <div key={i} className={`flex ${msg.isMe ? 'justify-end' : ''}`}>
              <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] ${msg.isMe ? 'bg-violet-600/90 text-white' : 'border border-white/[0.06] bg-[#111113] text-stone-300'}`}>
                {!msg.isMe ? <p className="mb-0.5 text-[9px] text-stone-600">{msg.sender.split(' ')[0]}</p> : null}
                {msg.text}
                <p className={`mt-1 text-[9px] ${msg.isMe ? 'text-violet-200/70' : 'text-stone-600'}`}>
                  {msg.time}{msg.read ? ' · Read' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[10px] text-stone-600">Meera is typing…</p>
      </div>
    </div>
  );
}

export function MockFamilyPanel() {
  return (
    <div className="p-4 sm:p-5">
      <div className="mb-3 overflow-hidden rounded-xl">
        <img src={DEMO_ALBUMS_GRID[0].cover} alt="The Sharma Family" className="h-24 w-full object-cover" loading="lazy" />
      </div>
      <p className="text-sm font-medium text-stone-100">The Sharma Family</p>
      <p className="text-xs text-stone-500">4 members · Mumbai</p>
      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
        {[
          { label: 'Members', val: DEMO_FAMILY_STATS.members },
          { label: 'Photos', val: DEMO_FAMILY_STATS.photos },
          { label: 'Events', val: DEMO_FAMILY_STATS.events },
          { label: 'Memories', val: DEMO_FAMILY_STATS.memories },
        ].map((s) => (
          <div key={s.label} className="rounded-lg bg-white/[0.03] py-2">
            <p className="text-sm font-medium text-stone-200">{s.val}</p>
            <p className="text-[9px] text-stone-600">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {DEMO_MEMBERS.map((m) => (
          <div key={m.id} className="flex items-center gap-2">
            <MemberAvatar member={m} size="sm" />
            <div>
              <p className="text-xs text-stone-300">{m.name}</p>
              <p className="text-[9px] text-stone-600">{m.role}{m.online ? ' · online' : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockMemberProfilePanel() {
  const p = DEMO_MEMBER_PROFILE;
  return (
    <div className="p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-3">
        <MemberAvatar member={{ name: p.name, color: p.color }} size="lg" />
        <div>
          <p className="text-sm font-medium text-stone-100">{p.name}</p>
          <p className="text-xs text-violet-400/80">{p.role}</p>
        </div>
      </div>
      <div className="mb-3 flex gap-3 text-[10px] text-stone-600">
        <span className="text-stone-400">About</span>
        <span>Memories</span>
        <span>Events</span>
        <span>Photos</span>
      </div>
      <p className="mb-3 text-xs text-stone-500">{p.about}</p>
      <p className="mb-2 text-[10px] font-medium text-stone-600">Recent memories</p>
      <div className="grid grid-cols-3 gap-1.5">
        {p.memories.map((m) => (
          <div key={m.title} className="overflow-hidden rounded-lg">
            <img src={m.image} alt={m.title} className="aspect-square w-full object-cover" loading="lazy" />
            <p className="truncate p-1 text-[9px] text-stone-500">{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockNotificationsPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Notifications</p>
      <div className="space-y-1">
        {DEMO_NOTIFICATIONS.map((n, i) => (
          <div key={i} className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 ${n.unread ? 'bg-violet-500/5' : ''}`}>
            <span className="text-sm">{n.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-stone-300">{n.text}</p>
              <p className="text-[10px] text-stone-600">{n.time}</p>
            </div>
            {n.unread ? <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockOverviewPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-stone-600">Upcoming</p>
      {DEMO_UPCOMING.slice(0, 3).map((e) => (
        <div key={e.title} className="mb-2 rounded-lg border border-white/[0.04] px-3 py-2">
          <p className="text-xs text-stone-300">{e.title}</p>
          <p className="text-[10px] text-stone-600">{e.when}</p>
        </div>
      ))}
      <p className="mb-2 mt-4 text-[10px] font-medium uppercase tracking-wider text-stone-600">Online now</p>
      <div className="flex gap-3">
        {DEMO_MEMBERS.filter((m) => m.online).map((m) => (
          <div key={m.id} className="text-center">
            <MemberAvatar member={m} size="sm" />
            <p className="mt-1 text-[9px] text-stone-500">{m.first}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockSettingsPanel() {
  const [toggles, setToggles] = useState({ family: true, messages: true, events: true, email: false });
  const items = [
    { key: 'family' as const, label: 'Family notifications' },
    { key: 'messages' as const, label: 'Message notifications' },
    { key: 'events' as const, label: 'Event reminders' },
    { key: 'email' as const, label: 'Email updates' },
  ];
  return (
    <div className="p-4 sm:p-5">
      <p className="mb-3 text-xs font-medium text-stone-400">Settings</p>
      {['Account', 'Family', 'Notifications', 'Privacy', 'Security'].map((section) => (
        <div key={section} className="mb-3">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-stone-600">{section}</p>
          {section === 'Notifications'
            ? items.map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg px-2 py-2">
                  <span className="text-xs text-stone-400">{item.label}</span>
                  <button
                    type="button"
                    onClick={() => setToggles({ ...toggles, [item.key]: !toggles[item.key] })}
                    className={`relative h-5 w-9 rounded-full transition ${toggles[item.key] ? 'bg-violet-600' : 'bg-white/10'}`}
                    aria-label={item.label}
                  >
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${toggles[item.key] ? 'left-4' : 'left-0.5'}`} />
                  </button>
                </div>
              ))
            : (
              <div className="rounded-lg px-2 py-2 text-xs text-stone-600">Manage {section.toLowerCase()} preferences</div>
            )}
        </div>
      ))}
    </div>
  );
}

export function MockPanelByFeature({ feature }: { feature: TourFeature; albumIndex?: number }) {
  switch (feature) {
    case 'feed': return <MockFeedPanel />;
    case 'events': return <MockEventsPanel />;
    case 'albums': return <MockAlbumsPanel />;
    case 'messages': return <MockMessagesPanel />;
    case 'family': return <MockFamilyPanel />;
    case 'notifications': return <MockNotificationsPanel />;
    case 'settings': return <MockSettingsPanel />;
    default: return <MockFeedPanel />;
  }
}
