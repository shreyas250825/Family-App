import { ProductCard } from '../ui/ProductCard';
import { PRODUCTS } from '../../constants/data';

export function ProductSection() {
  return (
    <section id="highlights" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 glass rounded-full shadow-soft">
            <span className="text-sm text-brand-secondary font-semibold">Platform Highlights</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">
            Built for modern families
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Premium tools that make staying connected effortless, meaningful, and beautiful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              title={product.title}
              description={product.description}
              features={product.features}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
