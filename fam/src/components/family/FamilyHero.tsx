import { FAMILY_NAME, FAMILY_TAGLINE, FAMILY_WELCOME, type DemoMember } from '../../lib/demoFamily';
import { MemberPhoto } from './MemberPhoto';

export function FamilyHero({ member, onOpen }: { member: DemoMember; onOpen: () => void }) {
  return (
    <section className="fam-hero overflow-hidden rounded-[1.75rem] border p-5 sm:p-8" style={{ borderColor: 'var(--border)' }}>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] fam-muted">{FAMILY_NAME}</p>
      <div className="mt-5 grid items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_1.05fr]">
        <button type="button" onClick={onOpen} className="relative overflow-hidden rounded-[1.5rem] shadow-[var(--shadow)]">
          <MemberPhoto src={member.photo} alt={member.name} className="aspect-[4/5] w-full object-cover object-top sm:aspect-[5/6] lg:max-h-[540px]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-left text-white">
            <p className="text-lg font-semibold">{member.name}</p>
            <p className="text-sm text-white/80">{member.relationship}</p>
          </div>
        </button>
        <div className="max-w-xl">
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">{FAMILY_WELCOME}</h1>
          <p className="mt-4 text-lg fam-muted sm:text-xl">{FAMILY_TAGLINE}</p>
          <p className="mt-6 max-w-md text-sm leading-relaxed">{member.intro}</p>
          <button type="button" onClick={onOpen} className="fam-btn-primary mt-6">
            View profile
          </button>
        </div>
      </div>
    </section>
  );
}
