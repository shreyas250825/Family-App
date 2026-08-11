import { useState } from 'react';
import {
  GUIDED_STEPS,
  GuidedStepId,
  DEMO_INVITES,
  DEMO_POST_COMMENTS,
  DEMO_POSTS,
  DEMO_EVENT_RSVP,
  DEMO_UPCOMING,
  GOA_GALLERY,
} from '../../../lib/demoContent';
import { AppChrome } from './TourPrimitives';
import { MemberAvatar } from '../premium/MemberAvatar';
import { HorizontalScroll } from '../../ui/HorizontalScroll';

function StepCreate() {
  return (
    <div className="p-5 sm:p-8">
      <p className="mb-1 text-xs font-medium text-violet-400/80">Create your family space</p>
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-wider text-stone-600">Family name</label>
          <div className="mt-1 rounded-lg border border-white/[0.08] bg-[#111113] px-4 py-3 text-sm text-stone-200">The Sharma Family</div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-stone-600">Location</label>
          <div className="mt-1 rounded-lg border border-white/[0.08] bg-[#111113] px-4 py-3 text-sm text-stone-200">Mumbai</div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wider text-stone-600">Description</label>
          <div className="mt-1 rounded-lg border border-white/[0.08] bg-[#111113] px-4 py-3 text-sm leading-relaxed text-stone-400">
            Our private space for memories, plans and everyday moments.
          </div>
        </div>
        <button type="button" className="w-full rounded-lg bg-stone-100 py-3 text-sm font-medium text-[#0a0a0a]">
          Create family
        </button>
      </div>
    </div>
  );
}

function StepInvite() {
  return (
    <div className="p-5 sm:p-8">
      <p className="mb-4 text-xs font-medium text-violet-400/80">Invite your family</p>
      <div className="space-y-3">
        {DEMO_INVITES.map((m) => (
          <div key={m.name} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-[#111113] px-4 py-3">
            <div className="flex items-center gap-3">
              <MemberAvatar member={{ name: m.name, color: m.color }} size="sm" />
              <div>
                <p className="text-sm text-stone-200">{m.name}</p>
                <p className="text-[10px] text-stone-600">{m.role}</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400/90">{m.status}</span>
          </div>
        ))}
      </div>
      <button type="button" className="mt-5 w-full rounded-lg border border-white/10 py-3 text-sm text-stone-300 hover:bg-white/[0.03]">
        Invite family members
      </button>
    </div>
  );
}

function StepShare() {
  const post = DEMO_POSTS[0];
  return (
    <div className="p-4 sm:p-6">
      <p className="mb-3 text-xs font-medium text-violet-400/80">Share a memory</p>
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#111113]">
        <div className="flex items-center gap-3 p-4">
          <MemberAvatar member={{ name: post.author, color: post.authorColor }} size="sm" />
          <div>
            <p className="text-sm font-medium text-stone-200">{post.author}</p>
            <p className="text-[10px] text-stone-600">{post.time}</p>
          </div>
        </div>
        <p className="px-4 pb-3 text-sm leading-relaxed text-stone-300">&ldquo;{post.content}&rdquo;</p>
        <img src={post.image} alt="Family brunch" className="aspect-video w-full object-cover" loading="lazy" />
        <p className="px-4 py-3 text-xs text-stone-500">♥ {post.likes} · 💬 {post.comments} comments</p>
        <div className="space-y-2 border-t border-white/[0.06] px-4 py-3">
          {DEMO_POST_COMMENTS.map((c) => (
            <div key={c.author} className="flex gap-2 text-xs">
              <MemberAvatar member={{ name: c.author, color: c.color }} size="sm" />
              <p className="text-stone-400"><span className="font-medium text-stone-300">{c.author.split(' ')[0]}:</span> {c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepPlan() {
  const ev = DEMO_UPCOMING[0];
  return (
    <div className="p-4 sm:p-6">
      <p className="mb-3 text-xs font-medium text-violet-400/80">Create family event</p>
      <div className="mb-4 rounded-xl border border-white/[0.06] bg-[#111113] p-4">
        <p className="text-base font-medium text-stone-100">Family Dinner</p>
        <div className="mt-2 space-y-1 text-xs text-stone-500">
          <p>📅 August 11</p>
          <p>🕢 7:30 PM</p>
          <p>📍 Mumbai</p>
        </div>
        <p className="mb-2 mt-4 text-[10px] uppercase tracking-wider text-stone-600">Who&apos;s coming?</p>
        <div className="flex flex-wrap gap-2">
          {DEMO_EVENT_RSVP.map((m) => (
            <span key={m.name} className={`rounded-full px-3 py-1 text-xs ${m.going ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
              {m.name} {m.going ? '✓' : '?'}
            </span>
          ))}
        </div>
        <button type="button" className="mt-4 w-full rounded-lg bg-stone-100 py-2.5 text-sm font-medium text-[#0a0a0a]">Create event</button>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/[0.06]">
        <img src={ev.image} alt="" className="h-32 w-full object-cover" loading="lazy" />
        <div className="bg-[#111113] p-4">
          <p className="font-medium text-stone-200">{ev.title}</p>
          <p className="text-xs text-stone-500">{ev.when}</p>
          <p className="mt-2 text-[10px] text-stone-600">4 family members · Going · 3 · Maybe · 1</p>
        </div>
      </div>
    </div>
  );
}

function StepConnect() {
  return (
    <div className="p-4 sm:p-6">
      <p className="mb-1 text-xs font-medium text-violet-400/80">Create album</p>
      <p className="mb-3 text-sm font-medium text-stone-200">Goa Vacation 2025</p>
      <p className="mb-4 text-xs text-stone-500">24 photos</p>
      <HorizontalScroll showArrows={false}>
        {GOA_GALLERY.map((src, i) => (
          <div key={i} className="w-[88vw] max-w-[420px] shrink-0 snap-center sm:w-[calc(33.333%-0.75rem)] sm:min-w-[280px]">
            <img src={src} alt={`Goa memory ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover" loading="lazy" />
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}

const STEP_PANELS: Record<GuidedStepId, () => JSX.Element> = {
  create: StepCreate,
  invite: StepInvite,
  share: StepShare,
  plan: StepPlan,
  connect: StepConnect,
};

export function GuidedWalkthrough() {
  const [step, setStep] = useState<GuidedStepId>('create');
  const Panel = STEP_PANELS[step];

  return (
    <section id="how-it-works" className="border-t border-white/[0.04] py-16 sm:py-24">
      <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
        <p className="text-[10px] font-medium tracking-[0.25em] text-stone-600">HOW FAMZEE WORKS</p>
        <h2 className="mt-3 max-w-xl text-2xl font-medium text-stone-100 sm:text-4xl">
          One place.
          <br />
          <span className="text-stone-500">Everything your family does together.</span>
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
          <div className="space-y-2">
            {GUIDED_STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(s.id)}
                className={`flex w-full gap-4 rounded-xl px-4 py-4 text-left transition ${
                  step === s.id ? 'bg-white/[0.06] ring-1 ring-white/[0.08]' : 'hover:bg-white/[0.03]'
                }`}
              >
                <span className={`text-sm font-medium ${step === s.id ? 'text-violet-400' : 'text-stone-600'}`}>{s.num}</span>
                <div>
                  <p className={`text-sm font-medium ${step === s.id ? 'text-stone-100' : 'text-stone-400'}`}>{s.title}</p>
                  <p className="text-xs text-stone-600">{s.subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="min-w-0">
            <AppChrome url={`famzee.app/setup/${step}`} className="min-h-[480px] lg:min-h-[520px]">
              <Panel />
            </AppChrome>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroProductFrame() {
  const post = DEMO_POSTS[0];
  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1280px] sm:mt-16">
      <div className="pointer-events-none absolute -inset-x-8 top-1/2 h-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.07)_0%,_transparent_70%)]" />
      <AppChrome url="famzee.app" className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-[10px] font-medium tracking-widest text-stone-600">THE SHARMA FAMILY</p>
            <h3 className="mt-2 text-xl font-medium text-stone-100 sm:text-2xl">A private space built for real families.</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Memories, conversations, events and the people you love — together in one place. No public feeds. No strangers.
            </p>
            <div className="mt-6 flex gap-6 text-center">
              {[{ n: '4', l: 'Members' }, { n: '86', l: 'Photos' }, { n: '12', l: 'Events' }].map((s) => (
                <div key={s.l}>
                  <p className="text-lg font-medium text-stone-200">{s.n}</p>
                  <p className="text-[10px] text-stone-600">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/[0.06] lg:border-l lg:border-t-0">
            <img src={post.image} alt="Family moment" className="aspect-[16/10] w-full object-cover lg:min-h-[320px]" loading="eager" />
            <div className="p-4">
              <p className="text-sm text-stone-300">{post.content}</p>
              <p className="mt-2 text-xs text-stone-600">♥ {post.likes} · 💬 {post.comments} comments</p>
            </div>
          </div>
        </div>
      </AppChrome>
    </div>
  );
}
