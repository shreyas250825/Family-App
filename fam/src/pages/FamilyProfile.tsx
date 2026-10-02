import { AppLayout } from '../components/layout/AppLayout';
import { FamilyHero } from '../components/family/FamilyHero';
import { MemberCarousel } from '../components/family/MemberCarousel';
import { MemberProfile } from '../components/family/MemberProfile';
import { useDemoFamily } from '../context/DemoFamilyContext';
import { memberById } from '../lib/demoFamily';

export function FamilyProfile() {
  const { members, featuredId, setFeaturedId, selectedMember, openProfile, privacy, updatePrivacy } = useDemoFamily();
  const featured = memberById(featuredId) || members[0];

  return (
    <AppLayout>
      <div className="space-y-10">
        <FamilyHero member={featured} onOpen={() => openProfile(featured.id)} />
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl">Meet our family</h2>
            <p className="text-sm fam-muted">Tap a member for their profile. Feature anyone in the hero.</p>
          </div>
          <MemberCarousel members={members} featuredId={featuredId} onOpen={openProfile} onFeature={setFeaturedId} />
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
