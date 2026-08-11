
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
    <div className="group relative p-8 rounded-2xl glass-dark shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative mb-5 w-14 h-14 rounded-2xl bg-gradient-brand/10 flex items-center justify-center text-2xl border border-brand-primary/10 group-hover:scale-110 transition-transform">
        {icon}
      <h3 className="relative text-lg font-semibold mb-2 text-slate-800 group-hover:text-brand-primary transition-colors">
      <p className="relative text-slate-600 text-sm leading-relaxed">