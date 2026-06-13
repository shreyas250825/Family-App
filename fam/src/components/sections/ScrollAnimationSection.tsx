import { FeatureCard } from '../ui/FeatureCard';
import { FEATURES } from '../../constants/data';

export function ScrollAnimationSection() {
  return (
    <section id="features" className="py-24 px-6 relative bg-white/50" data-tour="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 glass rounded-full shadow-soft">
            <span className="text-sm text-brand-primary font-semibold">Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Everything your family needs
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A warm, modern platform designed to keep generations connected — no matter the distance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
