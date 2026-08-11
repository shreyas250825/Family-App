import { Link } from 'react-router-dom';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(124,58,237,0.12)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-6xl">
          Your family&apos;s story deserves
          <br />
          <span className="text-stone-500">a place of its own.</span>
        </h2>
        <Link
          to="/login"
          className="mt-12 inline-flex min-h-[56px] items-center justify-center rounded-full bg-stone-100 px-10 text-base font-semibold text-[#0a0a0a] transition hover:bg-white active:scale-[0.98]"
        >
          Explore FamZee
        </Link>
      </div>
    </section>
  );
}
