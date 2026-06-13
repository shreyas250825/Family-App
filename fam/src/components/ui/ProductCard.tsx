import { ProductCardProps } from '../../types';

export function ProductCard({ title, description, features }: ProductCardProps) {
  return (
    <div className="group relative p-10 rounded-3xl glass-dark shadow-soft hover:shadow-card transition-all duration-300 overflow-hidden hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <h3 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-gradient transition-all">
          {title}
        </h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 group/item">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-primary/15 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-slate-600 group-hover/item:text-slate-800 transition-colors">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
