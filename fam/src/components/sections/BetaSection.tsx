import { Link } from 'react-router-dom';

export function BetaSection() {
  return (
    <section id="cta" className="py-24 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <div className="glass-dark rounded-3xl p-12 md:p-16 shadow-card overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand" />

          <div className="inline-block mb-6 px-4 py-2 bg-brand-primary/10 rounded-full">
            <span className="text-sm text-brand-primary font-semibold">Join FamZee Today</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Start connecting your family
            <br />
            <span className="text-gradient">in minutes, not months</span>
          </h2>
          <p className="text-slate-600 mb-10 text-lg max-w-xl mx-auto">
            Create your family circle, invite loved ones, and begin sharing memories today. Free to start, no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="px-10 py-4 bg-gradient-brand rounded-xl text-white font-semibold shadow-soft hover:shadow-glow hover:scale-105 transition-all"
            >
              Create Your Family Circle
            </Link>
            <Link
              to="/dashboard"
              className="px-10 py-4 glass rounded-xl text-slate-700 font-semibold border border-slate-200/60 hover:shadow-card transition-all"
            >
              View Live Demo
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-500">
            Trusted by families in 40+ countries · Private & secure · Always free tier available
          </p>
        </div>
      </div>
    </section>
  );
}
