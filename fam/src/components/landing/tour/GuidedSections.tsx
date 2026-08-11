import { useState } from 'react';
import {
  DEMO_CONVERSATIONS,
  DEMO_ACTIVITY,
  DEMO_MEMORY_ALBUMS,
  DEMO_POSTS,
  DEMO_UPCOMING,
  DEMO_MEMBERS,
  DEMO_MESSAGES,
  DEMO_NOTIFICATIONS,
} from '../../../lib/demoContent';
import { AppChrome } from './TourPrimitives';
import { MemberAvatar } from '../premium/MemberAvatar';

export function MessagingDemo() {
  const [active, setActive] = useState(0);
  const conv = DEMO_CONVERSATIONS[active];

  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <p className="text-[10px] font-medium tracking-[0.25em] text-violet-400/80">MESSAGES</p>
        <h2 className="mt-3 text-2xl font-medium text-stone-100 sm:text-3xl">And when your family needs to talk…</h2>
        <p className="mt-2 max-w-lg text-sm text-stone-500">
          Private conversations and group chats — without mixing family life into public platforms.
        </p>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {DEMO_CONVERSATIONS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(i)}
              className={`min-h-[44px] shrink-0 rounded-lg px-4 py-2 text-sm transition ${
                active === i ? 'bg-white/[0.08] text-stone-100' : 'text-stone-500 hover:text-stone-300'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <AppChrome url="famzee.app/messages" className="min-h-[420px]">
            <div className="flex min-h-[420px] flex-col sm:flex-row">
              <div className="hidden w-52 shrink-0 border-r border-white/[0.06] p-3 sm:block">
                {DEMO_CONVERSATIONS.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`mb-1 flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-xs ${
                      active === i ? 'bg-white/[0.06] text-stone-200' : 'text-stone-500 hover:text-stone-300'
                    }`}
                  >
                    <MemberAvatar member={{ name: c.title, color: '#7c3aed' }} size="sm" />
                    <span className="truncate">{c.title}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-stone-200">{conv.title}</p>
                    <p className="text-xs text-emerald-500">4 members · 3 online</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-label="Online" />
                </div>
                <div className="flex-1 space-y-3">
                  {conv.messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.isMe ? 'justify-end' : ''}`}>
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                          msg.isMe
                            ? 'bg-violet-600/90 text-white'
                            : 'border border-white/[0.06] bg-[#111113] text-stone-300'
                        }`}
                      >
                        {!msg.isMe ? <p className="mb-0.5 text-[10px] text-stone-600">{msg.sender}</p> : null}
                        {msg.text}
                        <p className={`mt-1 text-[10px] ${msg.isMe ? 'text-violet-200/70' : 'text-stone-600'}`}>
                          {msg.time}
                          {msg.read ? ' · Read' : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {conv.typing ? (
                  <p className="mt-4 text-xs text-stone-500">
                    <span className="inline-flex gap-1">
                      {conv.typing} is typing
                      <span className="animate-pulse">…</span>
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          </AppChrome>
        </div>
      </div>
    </section>
  );
}

export function ActivityTimeline() {
  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16">
          <div>
            <p className="text-[10px] font-medium tracking-[0.25em] text-stone-600">FAMILY ACTIVITY</p>
            <h2 className="mt-3 text-2xl font-medium text-stone-100 sm:text-3xl">The Sharma Family · Today</h2>
            <p className="mt-2 max-w-md text-sm text-stone-500">
              Every memory, event, and conversation — visible to the people who matter.
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#0B0B0D] p-6 sm:p-8">
            {DEMO_ACTIVITY.map((item, i) => (
              <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                {i < DEMO_ACTIVITY.length - 1 ? (
                  <div className="absolute left-[5px] top-3 h-full w-px bg-gradient-to-b from-violet-500/40 to-transparent" />
                ) : null}
                <div className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-violet-500 ring-4 ring-[#0B0B0D]" />
                <div>
                  <p className="text-[10px] font-medium tracking-wide text-stone-600">{item.time}</p>
                  <p className="mt-1 text-sm leading-relaxed text-stone-300">
                    {item.text}
                    {item.highlight ? (
                      <>
                        {' '}
                        <span className="font-medium text-violet-300/90">&ldquo;{item.highlight}&rdquo;</span>
                      </>
                    ) : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DashboardReveal() {
  const post = DEMO_POSTS[0];

  return (
    <section id="reveal" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <h2 className="text-2xl font-medium text-stone-100 sm:text-4xl">Everything your family keeps together.</h2>
        <p className="mt-2 max-w-lg text-sm text-stone-500">
          Your family dashboard — memories, events, messages, albums, and activity in one place.
        </p>

        <div className="mt-10">
          <AppChrome url="famzee.app/dashboard" className="overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_280px]">
              {/* Main column */}
              <div className="space-y-6 border-b border-white/[0.06] p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <div>
                  <p className="text-xl font-medium text-stone-100 sm:text-2xl">Good afternoon, Ananya.</p>
                  <p className="mt-1 text-sm text-stone-500">The Sharma Family · 4 members · Mumbai</p>
                </div>

                {/* Recent memory — large */}
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-600">Recent memory</p>
                  <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111113]">
                    <img src={post.image} alt="Family brunch" className="aspect-[16/9] w-full object-cover" loading="lazy" />
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <MemberAvatar member={{ name: post.author, color: post.authorColor }} size="sm" />
                        <p className="text-sm font-medium text-stone-200">{post.author}</p>
                      </div>
                      <p className="mt-2 text-sm text-stone-400">{post.content}</p>
                      <p className="mt-2 text-xs text-stone-600">♥ {post.likes} · 💬 {post.comments} comments</p>
                    </div>
                  </div>
                </div>

                {/* Albums row */}
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-600">Albums</p>
                  <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {DEMO_MEMORY_ALBUMS.slice(0, 5).map((a) => (
                      <div key={a.title} className="w-40 shrink-0 overflow-hidden rounded-xl border border-white/[0.06] sm:w-44">
                        <img src={a.image} alt={a.title} className="aspect-[4/5] w-full object-cover" loading="lazy" />
                        <div className="p-2.5">
                          <p className="truncate text-xs font-medium text-stone-300">{a.title}</p>
                          <p className="text-[10px] text-stone-600">{a.count} photos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity snippet */}
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-600">Today&apos;s activity</p>
                  <div className="space-y-2">
                    {DEMO_ACTIVITY.slice(0, 3).map((item, i) => (
                      <p key={i} className="rounded-lg border border-white/[0.04] bg-[#111113] px-3 py-2 text-xs text-stone-400">
                        <span className="text-stone-600">{item.time}</span> · {item.text}
                        {item.highlight ? ` "${item.highlight}"` : ''}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6 p-5 sm:p-6">
                <div>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Upcoming events</p>
                  <div className="space-y-3">
                    {DEMO_UPCOMING.map((e) => (
                      <div key={e.title} className="flex gap-3 rounded-xl border border-white/[0.06] bg-[#111113] p-3">
                        <img src={e.image} alt="" className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-stone-200">{e.title}</p>
                          <p className="text-[10px] text-stone-500">{e.when}</p>
                          <p className="text-[10px] text-stone-600">{e.location} · {e.attendees} going</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Messages</p>
                  <div className="space-y-2">
                    {DEMO_MESSAGES.slice(0, 3).map((m) => (
                      <div key={m.id} className="rounded-lg border border-white/[0.04] bg-[#111113] px-3 py-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-stone-300">{m.name}</p>
                          <p className="text-[10px] text-stone-600">{m.time}</p>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] text-stone-500">{m.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-stone-600">Family members</p>
                  <div className="space-y-2">
                    {DEMO_MEMBERS.map((m) => (
                      <div key={m.id} className="flex items-center gap-2">
                        <MemberAvatar member={{ name: m.name, color: m.color }} size="sm" />
                        <div>
                          <p className="text-xs text-stone-300">{m.first}</p>
                          <p className="text-[10px] text-stone-600">
                            {m.role}
                            {m.online ? ' · online' : ''}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-stone-600">Notifications</p>
                  {DEMO_NOTIFICATIONS.slice(0, 2).map((n, i) => (
                    <p key={i} className="mb-1.5 text-[10px] text-stone-500">
                      {n.icon} {n.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </AppChrome>
        </div>
      </div>
    </section>
  );
}
