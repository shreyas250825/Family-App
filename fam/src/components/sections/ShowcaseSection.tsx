const SHOWCASE = [
  {
    title: 'Curated family feed',
    description: 'Post photos, celebrate milestones, and react to updates — a feed that feels personal, not public.',
    image: 'https://images.unsplash.com/photo-1609220136736-443891a64571?w=800&h=600&fit=crop',
  },
  {
    title: 'Events that bring you together',
    description: 'Plan reunions, track birthdays, and RSVP in one tap. Your shared calendar keeps everyone aligned.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9de78241?w=800&h=600&fit=crop',
  },
  {
    title: 'Albums built to last',
    description: 'Collect memories from every trip and celebration. Upload, organize, and revisit anytime.',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop',
  },
];

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        {SHOWCASE.map((item, index) => (
          <div
            key={item.title}
            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}
          >
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{item.title}</h3>
              <p className="text-neutral-500 text-lg leading-relaxed">{item.description}</p>
            </div>
            <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="absolute -inset-3 bg-ig-gradient opacity-10 blur-2xl rounded-3xl" />
              <img
                src={item.image}
                alt={item.title}
                className="relative rounded-2xl shadow-xl shadow-neutral-300/40 w-full h-72 sm:h-80 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
