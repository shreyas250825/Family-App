import { Link } from 'react-router-dom';
import { FAMILY_IMAGES } from '../../lib/images';
import { DEMO_MEMBERS, DEMO_UPCOMING } from '../../lib/demoContent';
import { HorizontalScroll } from '../ui/HorizontalScroll';
import { MemberAvatar } from './premium/MemberAvatar';

const GALLERY = [
  { title: 'Goa Vacation', image: FAMILY_IMAGES.vacation, tall: true },
  { title: 'Family Brunch', image: FAMILY_IMAGES.brunch, tall: false },
  { title: 'Diwali', image: FAMILY_IMAGES.diwali, tall: false },
  { title: 'Birthdays', image: FAMILY_IMAGES.birthday, tall: true },
  { title: 'Summer Trip', image: FAMILY_IMAGES.travel, tall: false },
];

export function MemoriesSection() {
  return (
    <section id="memories" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-medium text-stone-100 sm:text-4xl">
              Memories shouldn&apos;t disappear
              <br />
              <span className="text-stone-500">into camera rolls.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-500">
              Keep the moments your family wants to remember, together and organized.
            </p>
          </div>
          <HorizontalScroll showArrows={false}>
            {GALLERY.map((g) => (
              <div key={g.title} className={`relative w-[75vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[280px] ${g.tall ? 'sm:w-[320px]' : ''}`}>
                <img src={g.image} alt={g.title} className={`w-full object-cover ${g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-medium text-white">{g.title}</p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
        <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-5">
          {GALLERY.map((g) => (
            <div key={g.title} className="group overflow-hidden rounded-2xl border border-white/[0.06]">
              <img src={g.image} alt={g.title} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <p className="p-3 text-xs text-stone-400">{g.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsSection() {
  const event = DEMO_UPCOMING[0];
  const going = DEMO_MEMBERS.slice(0, 4);
  return (
    <section id="events" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-medium text-stone-100 sm:text-3xl">
              Never miss the moments
              <br />
              <span className="text-stone-500">you plan together.</span>
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0D]">
              <img src={event.image} alt="" className="aspect-[21/9] w-full object-cover" loading="lazy" />
              <div className="p-6">
                <p className="text-lg font-medium text-stone-100">{event.title}</p>
                <div className="mt-3 flex gap-6 text-sm text-stone-400">
                  <span>AUG 11</span>
                  <span>7:30 PM</span>
                  <span>Mumbai</span>
                </div>
                <p className="mt-4 text-xs font-medium text-stone-600">Going</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {going.map((m) => (
                    <span key={m.id} className="flex items-center gap-1.5 rounded-full bg-white/[0.04] px-2.5 py-1 text-xs text-stone-400">
                      <MemberAvatar member={m} size="sm" />
                      {m.first}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {['Going', 'Maybe', "Can't go"].map((l, i) => (
                    <span key={l} className={`rounded-lg px-3 py-1.5 text-xs ${i === 0 ? 'bg-emerald-500/15 text-emerald-300' : 'border border-white/[0.06] text-stone-500'}`}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden rounded-2xl border border-white/[0.06] bg-[#0B0B0D] p-4 sm:block sm:w-[140px]">
              <p className="text-xs font-medium text-stone-400">August</p>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-stone-600">
                {Array.from({ length: 31 }, (_, i) => (
                  <span key={i} className={`py-1 ${i + 1 === 11 ? 'rounded bg-violet-500/20 text-violet-300' : ''}`}>{i + 1}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MessagesSection() {
  return (
    <section className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0D] p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-100">Sharma Family</p>
                <p className="text-xs text-emerald-500">Online · 5 members</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { sender: 'Rahul', text: 'Are we still meeting at 7:30?', me: false },
                { sender: 'Ananya', text: "Yes! I'll be there 😊", me: true },
                { sender: 'Meera', text: "I'll bring the photos from Goa.", me: false },
                { sender: 'Arjun', text: 'Can someone pick me up? 😂', me: false },
                { sender: 'Rahul', text: 'Done.', me: false },
              ].map((m, i) => (
                <div key={i} className={`flex ${m.me ? 'justify-end' : 'gap-2'}`}>
                  {!m.me ? <MemberAvatar member={{ name: `${m.sender} Sharma`, color: '#6366f1' }} size="sm" /> : null}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.me ? 'bg-violet-600/90 text-white' : 'border border-white/[0.06] bg-[#111113] text-stone-300'}`}>
                    {!m.me ? <p className="mb-0.5 text-[10px] text-stone-600">{m.sender}</p> : null}
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-stone-600">Ananya is typing…</p>
          </div>
          <div>
            <h2 className="text-2xl font-medium text-stone-100 sm:text-3xl">When your family needs to talk</h2>
            <p className="mt-3 text-sm text-stone-500">Private group chats and one-on-one messages — no strangers, no algorithms.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FamilySpaceSection() {
  return (
    <section id="family" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <h2 className="mb-10 text-2xl font-medium text-stone-100 sm:text-3xl">
          Your family, <span className="text-stone-500">together.</span>
        </h2>
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0D]">
          <div className="relative h-48 sm:h-64">
            <img src={FAMILY_IMAGES.gathering} alt="Sharma Family" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
          </div>
          <div className="px-6 pb-8 pt-2 sm:px-8">
            <p className="text-xl font-medium text-stone-100">Sharma Family</p>
            <p className="mt-2 max-w-lg text-sm text-stone-500">
              Our private space for memories, plans and everyday life.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-stone-400">
              <span>24 memories</span>
              <span>8 albums</span>
              <span>6 upcoming events</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              {DEMO_MEMBERS.map((m) => (
                <div key={m.id} className="text-center">
                  <MemberAvatar member={m} size="md" />
                  <p className="mt-1.5 text-xs text-stone-400">{m.first}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrivacySection() {
  return (
    <section id="privacy" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-medium text-stone-100 sm:text-3xl">
              Your family&apos;s moments
              <br />
              <span className="text-stone-500">belong to your family.</span>
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-stone-400">
              <li>Private family spaces.</li>
              <li>No public timelines.</li>
              <li>No strangers.</li>
              <li>Just the people you invite.</li>
            </ul>
          </div>
          <div className="flex items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0B0B0D] p-12">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/5">
                <span className="text-3xl">🔒</span>
              </div>
              <p className="mt-4 text-sm text-stone-500">Private by design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.04]">
      <img src={FAMILY_IMAGES.reunion} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]/70" />
      <div className="relative mx-auto max-w-[1300px] px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="text-2xl font-medium text-stone-50 sm:text-4xl">
          Your family&apos;s life deserves
          <br />
          a place of its own.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-400">
          Create a private space for the people who matter most.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/register" className="inline-flex min-h-[48px] items-center rounded-lg bg-stone-100 px-8 text-sm font-medium text-[#0a0a0a] hover:bg-white">
            Get started
          </Link>
          <Link to="/login?demo=1" className="inline-flex min-h-[48px] items-center rounded-lg border border-white/20 px-8 text-sm text-stone-200 hover:bg-white/[0.06]">
            Explore the demo
          </Link>
        </div>
      </div>
    </section>
  );
}
