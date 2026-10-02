import type { ReactNode } from 'react';
import { FAMILY_ROOTS } from '../../lib/demoFamily';

export function FamilyRoots() {
  const { origin, languages, traditions, milestones, saying, story } = FAMILY_ROOTS;

  return (
    <div className="space-y-6">
      <header>
        <h2 className="font-display text-4xl">Our Family Roots</h2>
        <p className="mt-2 text-lg fam-muted">Every family has a story worth preserving.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <RootsCard title="Where our family began">
          <p className="text-2xl font-semibold">{origin.hometown}</p>
          <p className="fam-muted">{origin.state}, {origin.country}</p>
          <p className="mt-3 text-sm leading-relaxed">{origin.note}</p>
        </RootsCard>
        <RootsCard title="Languages spoken">
          <LabelList label="Family languages" items={languages.family} />
          <LabelList label="Mother tongues" items={languages.motherTongues} />
        </RootsCard>
        <RootsCard title="Traditions">
          <LabelList label="Celebrations" items={traditions.celebrations} />
          <LabelList label="Food" items={traditions.food} />
          <LabelList label="Customs" items={traditions.customs} />
          <LabelList label="Family gatherings" items={traditions.gatherings} />
        </RootsCard>
        <RootsCard title="Milestones">
          <ul className="space-y-3">
            {milestones.map((item) => (
              <li key={item.year}>
                <p className="text-sm font-semibold text-[var(--primary)]">{item.year} · {item.title}</p>
                <p className="text-sm fam-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </RootsCard>
        <RootsCard title="Family saying">
          <p className="font-display text-2xl">{saying.proverb}</p>
          <p className="mt-2 text-sm">Motto: {saying.motto}</p>
          <p className="text-sm fam-muted">Expression: {saying.expression}</p>
        </RootsCard>
        <RootsCard title="Our story">
          <p className="text-sm leading-relaxed">{story}</p>
        </RootsCard>
      </div>
    </div>
  );
}

function RootsCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="fam-card p-5 sm:p-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider fam-muted">{title}</h3>
      {children}
    </section>
  );
}

function LabelList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-3">
      <p className="mb-1 text-xs font-medium fam-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full px-3 py-1 text-xs" style={{ background: 'var(--primary-soft)' }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
