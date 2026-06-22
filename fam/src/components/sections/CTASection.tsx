import { Link } from 'react-router-dom';

export function CTASection() {
  return (
    <section id="get-started" className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="rounded-3xl bg-neutral-900 text-white px-8 py-16 sm:px-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-ig-gradient opacity-20" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
              Start your family circle today
            </h2>
            <p className="text-neutral-300 text-lg mb-10 max-w-lg mx-auto">
              Free to join. Set up in minutes. Share memories that stay within your family.
            </p>
            <Link
              to="/register"
              className="inline-flex px-10 py-4 bg-white text-neutral-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Get started — it's free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
