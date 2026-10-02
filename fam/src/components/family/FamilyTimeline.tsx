import { FAMILY_TIMELINE, memberById } from '../../lib/demoFamily';
import { MemberPhoto } from './MemberPhoto';

export function FamilyTimeline({ onOpenMember }: { onOpenMember: (id: string) => void }) {
  return (
    <div className="relative space-y-8 pl-2">
      <div className="absolute bottom-4 left-[19px] top-4 w-px" style={{ background: 'var(--border)' }} />
      {FAMILY_TIMELINE.map((entry, index) => (
        <article key={entry.id} className="timeline-reveal relative grid gap-4 sm:grid-cols-[88px_1fr]" style={{ animationDelay: `${index * 60}ms` }}>
          <div className="relative z-10 flex items-start gap-3">
            <span className="mt-1 h-4 w-4 shrink-0 rounded-full border-4" style={{ borderColor: 'var(--primary)', background: 'var(--card)' }} />
            <p className="font-display text-2xl text-[var(--primary)]">{entry.year}</p>
          </div>
          <div className="fam-card overflow-hidden">
            {entry.image ? (
              <img src={entry.image} alt="" className="aspect-[16/7] w-full object-cover" />
            ) : null}
            <div className="p-5">
              <h3 className="text-lg font-semibold">{entry.title}</h3>
              <p className="mt-2 text-sm leading-relaxed fam-muted">{entry.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.memberIds.map((id) => {
                  const member = memberById(id);
                  if (!member) return null;
                  return (
                    <button key={id} type="button" onClick={() => onOpenMember(id)} className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs" style={{ borderColor: 'var(--border)' }}>
                      <MemberPhoto src={member.photo} alt={member.name} className="h-6 w-6 rounded-full object-cover object-top" />
                      {member.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
