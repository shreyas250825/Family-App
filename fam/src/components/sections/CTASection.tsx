import { Link } from 'react-router-dom';
import { ScrollReveal } from '../landing/ScrollReveal';

export function CTASection() {
  return (
    <section id="get-started" className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(124,92,252,0.25)_0%,_transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Bring your family together
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-neutral-300 sm:text-lg">
                Create your private family space in minutes. Share memories that stay within your circle.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/register"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                >
                  Get started free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore the product
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
