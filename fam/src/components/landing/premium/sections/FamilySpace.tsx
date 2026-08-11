import { MEMBERS, GRADIENTS, IMG } from '../../../../lib/landingData';
import { MemberAvatar } from '../MemberAvatar';
import { SafeImage } from '../SafeImage';

export function FamilySpace() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.1)_0%,_transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-center text-3xl font-semibold text-stone-50 sm:text-5xl">
          Your family&apos;s private home
        </h2>

        <div className="relative mx-auto mt-16 max-w-2xl sm:mt-24">
          {/* Central card */}
          <div className="relative z-10 overflow-hidden rounded-3xl border border-white/[0.1] bg-[#111] shadow-2xl shadow-violet-900/20">
            <SafeImage src={IMG.gathering} alt="" gradient={GRADIENTS.brunch} className="h-40 w-full object-cover sm:h-48" />
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-stone-50 sm:text-3xl">The Sharma Family</h3>
              <p className="mt-1 text-stone-500">Mumbai · 4 members · Connected across generations</p>
              <div className="mt-6 flex flex-wrap gap-4">
                {MEMBERS.map((m) => (
                  <div key={m.name} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] py-1.5 pl-1.5 pr-4">
                    <MemberAvatar member={m} size="sm" />
                    <div>
                      <p className="text-xs font-medium text-stone-200">{m.first}</p>
                      <p className="text-[10px] text-stone-500">
                        {m.role}{m.online ? ' · online' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orbiting member avatars — desktop only */}
          {MEMBERS.map((m, i) => {
            const angle = (i / MEMBERS.length) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const rx = Math.cos(rad) * 180;
            const ry = Math.sin(rad) * 100;
            return (
              <div
                key={m.name}
                className="orbit-member absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
                style={{
                  transform: `translate(calc(-50% + ${rx}px), calc(-50% + ${ry}px))`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <MemberAvatar member={m} size="lg" ring />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
