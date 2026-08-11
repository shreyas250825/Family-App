import { EVENTS } from '../../../../lib/landingData';

export function EventsPremium() {
  const featured = EVENTS[0];

  return (
    <section className="relative bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-medium tracking-[0.25em] text-violet-400">EVENTS</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
              Every date,
              <br />
              <span className="text-stone-500">in one place.</span>
            </h2>
            <p className="mt-6 max-w-md text-stone-500">
              Birthdays, reunions, anniversaries — your family calendar, beautifully organized.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-violet-600/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#161616] to-[#0c0c0c] p-8 shadow-2xl sm:p-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium tracking-[0.3em] text-violet-400">{featured.month}</p>
                  <p className="mt-2 text-7xl font-extralight tabular-nums text-stone-50 sm:text-8xl">{featured.day}</p>
                </div>
                <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-stone-400">Up next</div>
              </div>
              <h3 className="mt-8 text-2xl font-medium text-stone-100">{featured.title}</h3>
              <p className="mt-2 text-stone-500">{featured.time} · {featured.location}</p>

              <div className="mt-10 space-y-3 border-t border-white/[0.06] pt-8">
                {EVENTS.slice(1).map((e) => (
                  <div key={e.title} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-stone-200">{e.title}</p>
                      <p className="text-xs text-stone-500">{e.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-violet-400">{e.month}</p>
                      <p className="text-lg font-light text-stone-300">{e.day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
