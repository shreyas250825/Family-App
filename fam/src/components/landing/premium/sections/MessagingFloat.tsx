import { MESSAGES } from '../../../../lib/landingData';

export function MessagingFloat() {
  return (
    <section className="relative overflow-hidden bg-[#080808] py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/[0.08] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.25em] text-violet-400">MESSAGING</p>
          <h2 className="mt-4 text-3xl font-semibold text-stone-50 sm:text-5xl">
            Conversations that stay in the family
          </h2>
        </div>

        <div className="relative mx-auto mt-16 max-w-lg space-y-4 sm:mt-20">
          {MESSAGES.map((m, i) => (
            <div
              key={m.from}
              className="message-float rounded-2xl border border-white/[0.08] bg-[#141414]/80 p-5 backdrop-blur-md"
              style={{
                animationDelay: `${m.delay}s`,
                marginLeft: i === 1 ? '2.5rem' : i === 2 ? '1rem' : '0',
                marginRight: i === 0 ? '2rem' : '0',
              }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ background: m.color }}
                >
                  {m.from[0]}
                </div>
                <span className="font-medium text-stone-200">{m.from}</span>
              </div>
              <p className="text-base leading-relaxed text-stone-400">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
