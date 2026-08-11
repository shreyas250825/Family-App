export function PrivacyDark() {
  return (
    <section id="privacy" className="border-t border-white/[0.06] bg-[#080808] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-violet-400">PRIVACY</p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-50 sm:text-4xl">
            Built for families, not the public feed
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {[
            {
              title: 'Invitation only',
              desc: 'Your circle is private. No public profiles, no strangers, no ads.',
            },
            {
              title: 'Every generation',
              desc: 'Designed to be intuitive for grandparents and engaging for everyone else.',
            },
            {
              title: 'Your memories',
              desc: 'Photos, messages, and events belong to your family — not a platform.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 transition hover:border-white/10"
            >
              <h3 className="text-lg font-medium text-stone-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
