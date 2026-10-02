import type { DemoMember } from '../../lib/demoFamily';
import { MemberPhoto } from './MemberPhoto';

export function FamilyMemberCard({
  member,
  featured,
  onOpen,
  onFeature,
}: {
  member: DemoMember;
  featured?: boolean;
  onOpen: () => void;
  onFeature?: () => void;
}) {
  return (
    <article className="fam-card w-[168px] shrink-0 snap-start overflow-hidden sm:w-[200px]">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[4/5] overflow-hidden">
          <MemberPhoto src={member.photo} alt={member.name} className="h-full w-full object-cover object-top" />
          {featured ? (
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-[var(--primary)]">
              Featured
            </span>
          ) : null}
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-semibold">{member.name}</p>
          <p className="fam-muted text-xs">{member.relationship}</p>
        </div>
      </button>
      {onFeature ? (
        <button type="button" onClick={onFeature} className="fam-muted w-full border-t px-3 py-2 text-[11px]" style={{ borderColor: 'var(--border)' }}>
          {featured ? 'Currently featured' : 'Feature in hero'}
        </button>
      ) : null}
    </article>
  );
}
