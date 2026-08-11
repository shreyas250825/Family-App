import { Link } from 'react-router-dom';
import { CardStack } from '../CardStack';
import { FEED_CARDS } from '../../../../lib/landingData';

export function CinematicHero() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#050505] pt-16 sm:pt-[72px]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[120px]" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-fuchsia-600/[0.08] blur-[100px]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-600/[0.08] blur-[90px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-5 pb-16 pt-10 sm:px-8 lg:min-h-[calc(100dvh-72px)] lg:flex-row lg:items-center lg:gap-12 lg:pb-0 lg:pt-0">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-6 text-xs font-medium tracking-[0.35em] text-stone-500">FAMZEE</p>
          <h1 className="text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-stone-50 sm:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
            Your family&apos;s life,
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-200 to-violet-400 bg-clip-text text-transparent">
              in one private place.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-stone-400 sm:text-lg lg:mx-0">
            A private space for the people who matter most.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              to="/login"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-stone-100 px-8 text-sm font-semibold text-[#0a0a0a] transition hover:bg-white active:scale-[0.98]"
            >
              Explore FamZee
            </Link>
            <a
              href="#experience"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/15 px-8 text-sm font-medium text-stone-200 transition hover:border-white/30 hover:bg-white/[0.04]"
            >
              See how it works
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-1 justify-center lg:mt-0 lg:justify-end">
          <CardStack cards={FEED_CARDS} className="hero-card-stack w-full max-w-[400px]" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}
