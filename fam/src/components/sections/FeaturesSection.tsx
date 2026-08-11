const FEATURES = [
  {
    title: 'Family Feed',
    description: 'Share photos and updates in a private feed — only your family can see.',
    image: 'https://images.unsplash.com/photo-1609220136736-443891a64571?w=600&h=400&fit=crop&q=80',
    alt: 'Family sharing moments together',
  },
  {
    title: 'Shared Calendar',
    description: 'Birthdays, reunions, and milestones — never miss what matters.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop&q=80',
    alt: 'Family celebration event',
  },
  {
    title: 'Photo Albums',
    description: 'Organize vacations, weddings, and milestones into shared albums.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop&q=80',
    alt: 'Family photo album memories',
  },
  {
    title: 'Private Messaging',
    description: 'Direct messages and group chats — built for family, not strangers.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop&q=80',
    alt: 'Family messaging on mobile',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-4">
            Everything your family needs
          </h2>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto">
            One private space for photos, events, albums, and messages — designed with modern social polish.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/60 transition-all group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{feature.title}</h3>
              </div>
              <p className="p-5 text-sm text-neutral-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
