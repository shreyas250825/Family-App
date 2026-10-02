import { AppLayout } from '../components/layout/AppLayout';
import { FamilyRoots } from '../components/family/FamilyRoots';
import { FamilyTimeline } from '../components/family/FamilyTimeline';
import { MemberProfile } from '../components/family/MemberProfile';
import { useDemoFamily } from '../context/DemoFamilyContext';

export function FamilyRootsPage() {
  const { selectedMember, openProfile, privacy, updatePrivacy, setFeaturedId } = useDemoFamily();

  return (
    <AppLayout>
      <div className="space-y-12">
        <FamilyRoots />
        <section>
          <h2 className="font-display mb-2 text-3xl">Family Timeline</h2>
          <p className="mb-6 fam-muted">Explore significant family events by year.</p>
          <FamilyTimeline onOpenMember={openProfile} />
        </section>
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
