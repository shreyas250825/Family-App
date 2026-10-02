import { AppLayout } from '../components/layout/AppLayout';
import { FamilyTree } from '../components/family/FamilyTree';
import { MemberProfile } from '../components/family/MemberProfile';
import { useDemoFamily } from '../context/DemoFamilyContext';

export function FamilyTreePage() {
  const { selectedMember, openProfile, privacy, updatePrivacy, setFeaturedId } = useDemoFamily();

  return (
    <AppLayout title="Interactive Family Tree">
      <p className="mb-8 max-w-xl fam-muted">Three generations of the Sharma family. Open any profile from the tree.</p>
      <div className="fam-card p-4 sm:p-8">
        <FamilyTree onOpen={openProfile} />
      </div>
      <MemberProfile
        member={selectedMember}
        privacy={selectedMember ? privacy[selectedMember.id] : undefined}
        onClose={() => openProfile(null)}
        onPrivacy={(patch) => selectedMember && updatePrivacy(selectedMember.id, patch)}
        onFeature={() => selectedMember && setFeaturedId(selectedMember.id)}
      />
    </AppLayout>
  );
}
