import { ReactNode } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { PhoneFrame } from './PhoneFrame';

interface ProductFeatureProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  mockup: ReactNode;
  reverse?: boolean;
  bg?: 'white' | 'muted';
}

export function ProductFeature({
  id,
  eyebrow,
  title,
  description,
  bullets,
  mockup,
  reverse = false,
  bg = 'white',
}: ProductFeatureProps) {
  const bgClass = bg === 'muted' ? 'bg-stone-50' : 'bg-white';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-28 px-5 sm:px-6 ${bgClass}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal
          className={`${reverse ? 'lg:order-2' : ''} max-w-xl mx-auto lg:mx-0 text-center lg:text-left`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">{eyebrow}</p>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-500 sm:text-lg">{description}</p>
          {bullets?.length ? (
            <ul className="mt-6 space-y-3 text-left text-sm text-neutral-600 sm:text-base">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </ScrollReveal>

        <ScrollReveal delay={120} className={`${reverse ? 'lg:order-1' : ''} flex justify-center`}>
          <PhoneFrame>{mockup}</PhoneFrame>
        </ScrollReveal>
      </div>
    </section>
  );
}
