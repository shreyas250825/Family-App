import { Modal } from '../ui/Modal';
import { PrivacyControls } from './PrivacyControls';
import { MemberPhoto } from './MemberPhoto';
import type { DemoMember } from '../../lib/demoFamily';
import type { MemberPrivacy } from '../../context/DemoFamilyContext';

export function MemberProfile({
  member,
  privacy,
  onClose,
  onPrivacy,
  onFeature,
}: {
  member: DemoMember | null;
  privacy?: MemberPrivacy;
  onClose: () => void;
  onPrivacy: (patch: Partial<MemberPrivacy>) => void;
  onFeature: () => void;
}) {
  if (!member) return null;

  const showBirthday = privacy?.birthdayVisible !== false && !(member.isChild && privacy?.hideChildrenPublic);

  return (
    <Modal open={!!member} onClose={onClose} title={member.name} wide>
      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div>
          <MemberPhoto src={member.photo} alt={member.name} className="aspect-[4/5] w-full rounded-2xl object-cover object-top" />
          <button type="button" onClick={onFeature} className="fam-btn mt-3 w-full">
            Feature in family hero
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider fam-muted">{member.relationship}</p>
            <h3 className="font-display text-3xl">{member.name}</h3>
            <p className="mt-2 text-sm leading-relaxed">{member.intro}</p>
            <p className="mt-2 text-sm">
              Birthday:{' '}
              {showBirthday ? member.birthday : <span className="fam-muted">Hidden</span>}
            </p>
          </div>
          <PrivacyControls
            birthdayVisible={privacy?.birthdayVisible ?? true}
            profileVisible={privacy?.profileVisible ?? true}
            hideChildrenPublic={privacy?.hideChildrenPublic ?? true}
            isChild={member.isChild}
            onChange={onPrivacy}
          />
          <div>
            <h4 className="mb-2 text-sm font-semibold">Photos</h4>
            <div className="grid grid-cols-2 gap-3">
              {member.photos.map((photo) => (
                <figure key={photo.url} className="overflow-hidden rounded-2xl">
                  <img src={photo.url} alt={photo.caption} className="aspect-[4/3] w-full object-cover" />
                  <figcaption className="px-1 pt-1 text-xs fam-muted">
                    {photo.caption} · {photo.date}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Shared memories</h4>
            <div className="space-y-2">
              {member.memories.map((memory) => (
                <div key={memory.title} className="rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-sm font-medium">{memory.title}</p>
                  <p className="text-xs fam-muted">{memory.date}</p>
                  <p className="mt-1 text-sm">{memory.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
