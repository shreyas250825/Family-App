import { Link } from 'react-router-dom';

const FEATURES = [
  {
    to: '/capsule',
    title: 'Family Time Capsule',
    copy: 'Save special messages, photos and videos to open at a future family celebration or milestone.',
  },
  {
    to: '/voices',
    title: 'Voices of Our Elders',
    copy: 'Preserve family stories, recipes, languages and traditions through optional audio recordings.',
  },
  {
    to: '/celebrations',
    title: 'Family Celebrations',
    copy: 'Create shared calendars, anniversary reminders, reunion invitations and collaborative albums.',
  },
];

export function FeatureShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {FEATURES.map((feature) => (
        <Link key={feature.to} to={feature.to} className="fam-card block p-5">
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed fam-muted">{feature.copy}</p>
        </Link>
      ))}
    </div>
  );
}
