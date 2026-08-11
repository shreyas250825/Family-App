import { LandingNav } from './LandingNav';
import { LandingFooter } from './LandingFooter';
import { CinematicHero } from './sections/CinematicHero';
import { InteractiveMoment } from './sections/InteractiveMoment';
import { ScrollShowcase } from './sections/ScrollShowcase';
import { MemoriesGallery } from './sections/MemoriesGallery';
import { EventsPremium } from './sections/EventsPremium';
import { MessagingFloat } from './sections/MessagingFloat';
import { FamilySpace } from './sections/FamilySpace';
import { EcosystemWow } from './sections/EcosystemWow';
import { PrivacyDark } from './sections/PrivacyDark';
import { FinalCTA } from './sections/FinalCTA';

export function PremiumLandingPage() {
  return (
    <div className="landing-dark min-h-screen overflow-x-hidden bg-[#050505] text-stone-100 antialiased">
      <LandingNav />
      <main>
        <CinematicHero />
        <InteractiveMoment />
        <ScrollShowcase />
        <MemoriesGallery />
        <FamilySpace />
        <EventsPremium />
        <MessagingFloat />
        <EcosystemWow />
        <PrivacyDark />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
