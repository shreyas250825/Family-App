import { Link } from 'react-router-dom';
import { FamZeeLogo } from '../brand/FamZeeLogo';
import { HeroSection } from './HeroSection';
import { GuidedWalkthrough } from './tour/GuidedDemo';
import { MessagingDemo, ActivityTimeline, DashboardReveal } from './tour/GuidedSections';
import { LiveProductShowcase } from './LiveProductShowcase';
import { MobileProductTour } from './tour/MobileTour';
import { useTheme } from '../../context/ThemeContext';

function LandingNav() {
  const { appearance, toggleAppearance } = useTheme();

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--border)',
        background: 'color-mix(in srgb, var(--bg) 86%, transparent)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1300px] items-center justify-between px-5 sm:h-16 sm:px-8">
        <Link to="/" className="transition-opacity hover:opacity-90" aria-label="FamZee home">
          <FamZeeLogo size={28} wordmarkClassName="text-[var(--text)]" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="#how-it-works" className="text-sm fam-muted transition hover:opacity-80">How it works</a>
          <a href="#explore" className="text-sm fam-muted transition hover:opacity-80">See it in action</a>
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <button type="button" onClick={toggleAppearance} className="fam-btn px-3 py-1.5 text-xs">
            {appearance === 'light' ? 'Dark' : 'Light'}
          </button>
          <Link to="/login" className="hidden text-sm fam-muted transition hover:opacity-80 md:inline">
            Log in
          </Link>
          <Link to="/login?demo=1" className="fam-btn-primary hidden px-4 py-2.5 text-sm md:inline-flex">
            Explore FamZee
          </Link>
          <Link to="/login?demo=1" className="fam-btn-primary px-3 py-2 text-xs md:hidden">
            Explore
          </Link>
        </div>
      </div>
    </header>
  );
}

export function StudioLanding() {
  return (
    <div className="landing-page min-h-screen overflow-x-hidden">
      <LandingNav />
      <HeroSection />

      <section className="border-t py-14 sm:py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-[1300px] px-5 sm:px-8">
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] ld-kicker">WHAT IS FAMZEE</p>
              <p className="mt-2 text-sm leading-relaxed fam-muted">
                A private family space for photos, conversations, events, and albums — built for real families, not the public internet.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] ld-kicker">WHY IT EXISTS</p>
              <p className="mt-2 text-sm leading-relaxed fam-muted">
                Family life is scattered across WhatsApp, camera rolls, and calendars. FamZee brings it together — invite-only, ad-free, and yours.
              </p>
            </div>
            <div>
              <p className="text-[10px] font-medium tracking-[0.2em] ld-kicker">HOW FAMILIES USE IT</p>
              <p className="mt-2 text-sm leading-relaxed fam-muted">
                Create a space, invite your circle, share memories, plan dinners and reunions, and stay connected — all in one beautiful app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GuidedWalkthrough />
      <MessagingDemo />
      <ActivityTimeline />

      <div id="explore">
        <LiveProductShowcase />
      </div>

      <DashboardReveal />
      <MobileProductTour />

      <section className="border-t py-14 sm:py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-[1300px] px-5 text-center sm:px-8">
          <p className="text-[10px] font-medium tracking-[0.25em] fam-muted">PRIVATE BY DESIGN</p>
          <h2 className="mt-3 text-xl font-medium sm:text-2xl">Your family&apos;s space stays yours.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm fam-muted">
            Invite-only family circles. No public profiles, no ads, no strangers.
          </p>
        </div>
      </section>

      <section className="border-t py-20 sm:py-28" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-[1300px] px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl leading-snug sm:text-4xl">
            Your family&apos;s life deserves
            <br />
            a place of its own.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm fam-muted">
            Create a private space for the people who matter most.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login?demo=1" className="fam-btn-primary inline-flex min-h-[48px] items-center px-6">
              Explore FamZee
            </Link>
            <Link to="/register" className="fam-btn inline-flex min-h-[48px] items-center px-6">
              Get started
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4 px-5 text-xs fam-muted sm:px-8">
          <span>FamZee © {new Date().getFullYear()}</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:opacity-80">Privacy</Link>
            <Link to="/terms" className="hover:opacity-80">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
