import { ScrollReveal } from '../landing/ScrollReveal';

const PILLARS = [
  {
    title: 'Share',
    description: 'Post photos and updates in a private family feed — only the people you invite can see.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
  },
  {
    title: 'Plan',
    description: 'Keep birthdays, reunions, and milestones on a shared calendar everyone can follow.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Connect',
    description: 'Message one-on-one or as a group — built for family conversations, not strangers.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-stone-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">The experience</p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Everything your family needs, together
          </h2>
          <p className="mt-4 text-base text-neutral-500 sm:text-lg">
            FamZee replaces the patchwork of apps with one calm, premium experience.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {PILLARS.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 transition hover:border-neutral-200 hover:shadow-soft">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-900 text-white">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{pillar.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
