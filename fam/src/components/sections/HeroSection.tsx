import { Link } from 'react-router-dom';
import { HeroSectionProps } from '../../types';
import { LANDING_STATS } from '../../constants/data';

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center" data-tour="hero">
        {/* Text content */}
        <div className="text-center lg:text-left animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass rounded-full shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
            </span>
            <span className="text-sm text-slate-600 font-medium">Trusted by 50,000+ families worldwide</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1] text-slate-900">
            Your Family. Your Circle.{' '}
            <span className="text-gradient">Connected Across Generations.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Share memories, celebrate milestones, stay connected with the people who matter most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-brand rounded-xl text-white font-semibold shadow-soft hover:shadow-glow hover:scale-105 transition-all text-center"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => onCTAClick('learn')}
              className="px-8 py-4 glass rounded-xl text-slate-700 font-semibold hover:shadow-card transition-all border border-slate-200/60"
            >
              Explore Features
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0 pt-8 border-t border-slate-200/60">
            {LANDING_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image area */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative rounded-3xl overflow-hidden shadow-card animate-float">
            <img
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop"
              alt="Happy multi-generational family"
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">The Salian Family</p>
                  <p className="text-xs text-slate-500">12 members · 145 photos · Active now</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-card hidden sm:block animate-float" style={{ animationDelay: '1s' }}>
            <p className="text-2xl">🎂</p>
            <p className="text-sm font-semibold text-slate-800">Birthday Today!</p>
            <p className="text-xs text-slate-500">Arjun turns 32</p>
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-card hidden sm:block animate-float" style={{ animationDelay: '2s' }}>
            <p className="text-sm font-semibold text-slate-800">New Memory Added</p>
            <p className="text-xs text-slate-500">Goa vacation album</p>
          </div>
        </div>
      </div>
    </section>
  );
}
