import { Link } from 'react-router-dom';
import { GuidedWalkthrough, HeroProductFrame } from './tour/GuidedDemo';
import { MessagingDemo, ActivityTimeline, DashboardReveal } from './tour/GuidedSections';
import { LiveProductShowcase } from './LiveProductShowcase';
import { MobileProductTour } from './tour/MobileTour';

function LandingNav() {
  return (
    <header className="mx-auto flex h-14 max-w-[1300px] items-center justify-between px-5 sm:h-16 sm:px-8">
      <Link to="/" className="text-sm font-medium text-stone-200">FamZee</Link>
      <nav className="hidden items-center gap-6 md:flex">
        <a href="#how-it-works" className="text-sm text-stone-500 hover:text-stone-300">How it works</a>
        <a href="#explore" className="text-sm text-stone-500 hover:text-stone-300">See it in action</a>
      </nav>
      <div className="hidden items-center gap-4 md:flex">
        <Link to="/login" className="text-sm text-stone-400 hover:text-stone-200">Log in</Link>
        <Link to="/login?demo=1" className="rounded-lg bg-stone-100 px-4 py-2.5 text-sm font-medium text-[#0a0a0a] hover:bg-white">
          Explore FamZee
        </Link>
      </div>
      <Link to="/login?demo=1" className="rounded-lg bg-stone-100 px-3 py-2 text-xs font-medium text-[#0a0a0a] md:hidden">
        Explore
      </Link>
    </header>
  );
}

export function StudioLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-stone-100">
      <LandingNav />

      {/* HERO — introduction first, then large visual */}
      <section className="mx-auto max-w-[1300px] px-5 pb-8 pt-8 sm:px-8 sm:pb-12 sm:pt-12">
        <div>
          <p className="text-[11px] font-medium tracking-[0.3em] text-stone-500">FAMZEE</p>
          <h1 className="mt-4 max-w-2xl text-[2rem] font-medium leading-[1.12] tracking-tight text-stone-50 sm:text-5xl lg:text-[3.25rem]">
            Your family&apos;s life,
            <br />
            in one private place.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-400">
            Memories, conversations, events and the people you love — together in one private family space.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/login?demo=1" className="inline-flex min-h-[48px] items-center rounded-lg bg-stone-100 px-6 text-sm font-medium text-[#0a0a0a] hover:bg-white">
              Explore FamZee
            </Link>
            <a href="#how-it-works" className="inline-flex min-h-[48px] items-center rounded-lg border border-white/[0.1] px-6 text-sm text-stone-300 hover:border-white/20">
              See how it works
            </a>
          </div>
        </div>
        <HeroProductFrame />
      </section>

      {/* WHY FAMZEE — brief intro before the demo */}
      <section className="border-t border-white/[0.04] py-14 sm:py-20">
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-violet-400/70">WHAT IS FAMZEE</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                A private family space for photos, conversations, events, and albums — built for real families, not the public internet.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-violet-400/70">WHY IT EXISTS</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                Family life is scattered across WhatsApp, camera rolls, and calendars. FamZee brings it together — invite-only, ad-free, and yours.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] text-violet-400/70">HOW FAMILIES USE IT</p>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">
                Create a space, invite your circle, share memories, plan dinners and reunions, and stay connected — all in one beautiful app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDED STEP-BY-STEP DEMO */}
      <GuidedWalkthrough />

      {/* MESSAGING */}
      <MessagingDemo />

      {/* ACTIVITY TIMELINE */}
      <ActivityTimeline />

      {/* LARGE INTERACTIVE PRODUCT TOUR */}
      <div id="explore">
        <LiveProductShowcase />
      </div>

      {/* DASHBOARD REVEAL — visual payoff */}
      <DashboardReveal />

      {/* MOBILE */}
      <MobileProductTour />

      {/* PRIVACY — brief, credible */}
      <section className="border-t border-white/[0.04] py-14 sm:py-20">
        <div className="mx-auto max-w-[1300px] px-5 text-center sm:px-8">
          <p className="text-[10px] font-medium tracking-[0.25em] text-stone-600">PRIVATE BY DESIGN</p>
          <h2 className="mt-3 text-xl font-medium text-stone-200 sm:text-2xl">Your family&apos;s space stays yours.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-stone-500">
            Invite-only family circles. No public profiles, no ads, no strangers.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-white/[0.04] py-20 sm:py-28">
        <div className="mx-auto max-w-[1300px] px-5 text-center sm:px-8">
          <h2 className="text-2xl font-medium leading-snug text-stone-100 sm:text-4xl">
            Your family&apos;s life deserves
            <br />
            a place of its own.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-stone-500">
            Create a private space for the people who matter most.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login?demo=1" className="inline-flex min-h-[48px] items-center rounded-lg bg-stone-100 px-6 text-sm font-medium text-[#0a0a0a] hover:bg-white">
              Explore FamZee
            </Link>
            <Link to="/register" className="inline-flex min-h-[48px] items-center rounded-lg border border-white/15 px-6 text-sm text-stone-300 hover:bg-white/[0.04]">
              Get started
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.04] py-8">
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4 px-5 text-xs text-stone-600 sm:px-8">
          <span>FamZee © {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-stone-400">Privacy</Link>
            <Link to="/terms" className="hover:text-stone-400">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
