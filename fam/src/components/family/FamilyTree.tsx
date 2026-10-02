import { DEMO_FAMILY_MEMBERS, type DemoMember } from '../../lib/demoFamily';
import { MemberPhoto } from './MemberPhoto';

export function FamilyTree({ onOpen }: { onOpen: (id: string) => void }) {
  const gens = [1, 2, 3].map((g) => DEMO_FAMILY_MEMBERS.filter((m) => m.generation === g));

  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="mx-auto min-w-[640px] space-y-8 py-4">
        {gens.map((group, index) => (
          <div key={group[0]?.generation || index}>
            <p className="mb-3 text-center text-xs uppercase tracking-wider fam-muted">Generation {index + 1}</p>
            <div className="flex justify-center gap-4">
              {group.map((member) => (
                <TreeNode key={member.id} member={member} onOpen={() => onOpen(member.id)} />
              ))}
            </div>
            {index < gens.length - 1 ? (
              <div className="mx-auto mt-6 h-8 w-px" style={{ background: 'var(--border)' }} />
            ) : null}
          </div>
        ))}
        <p className="text-center text-xs fam-muted">
          Raj &amp; Priya · parents of Aarav and Ananya · children of Arun &amp; Meena
        </p>
      </div>
    </div>
  );
}

function TreeNode({ member, onOpen }: { member: DemoMember; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="fam-card w-36 p-3 text-center sm:w-40">
      <MemberPhoto src={member.photo} alt={member.name} className="mx-auto h-20 w-20 rounded-full object-cover object-top" />
      <p className="mt-2 text-sm font-semibold">{member.name.split(' ')[0]}</p>
      <p className="text-xs fam-muted">{member.relationship}</p>
    </button>
  );
}
