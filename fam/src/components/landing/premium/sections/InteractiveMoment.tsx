import { Link } from 'react-router-dom';
import { CardStack } from '../CardStack';
import { FEED_CARDS } from '../../../../lib/landingData';

export function InteractiveMoment() {
  return (
    <section id="experience" className="relative overflow-hidden bg-[#080808] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(124,58,237,0.08)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-stone-50 sm:text-5xl lg:text-6xl">
            The moments that matter
            <br />
            <span className="text-stone-500">shouldn&apos;t disappear.</span>
          </h2>
          <p className="mt-6 text-base text-stone-500 sm:text-lg">
            Every brunch, birthday, and beach day — captured and kept within your family circle.
          </p>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20">
          <CardStack cards={FEED_CARDS} />
        </div>

        <p className="mt-12 text-center">
          <Link to="/login" className="text-sm text-violet-400 transition hover:text-violet-300">
            Open the live feed →
          </Link>
        </p>
      </div>
    </section>
  );
}
