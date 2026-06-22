import { Link } from 'react-router-dom';

const FEED_IMAGES = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1609220136736-443891a64571?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1530103862676-de8c9de78241?w=400&h=400&fit=crop',
];

const STORIES = ['Mom', 'Dad', 'Grandma', 'Kids', 'Cousins'];

export function HeroSection() {
  return (
    <section className="pt-28 pb-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-xs font-semibold text-neutral-600 mb-6">
            Private · Secure · Family-only
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] tracking-tight text-neutral-900 mb-6">
            Share life's moments with the people who{' '}
            <span className="bg-ig-gradient bg-clip-text text-transparent">matter most</span>
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-md mx-auto lg:mx-0 mb-10">
            FamZee is your family's private social space — photos, events, albums, and messages in one beautiful place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              to="/register"
              className="px-8 py-3.5 bg-ig-gradient text-white font-semibold rounded-xl shadow-lg shadow-pink-500/20 hover:opacity-95 transition-opacity text-center"
            >
              Create free account
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 border border-neutral-200 text-neutral-800 font-semibold rounded-xl hover:bg-neutral-50 transition-colors text-center"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-[280px] sm:w-[320px]">
            <div className="absolute -inset-4 bg-ig-gradient opacity-20 blur-3xl rounded-full" />
            <div className="relative bg-neutral-900 rounded-[2.5rem] p-3 shadow-2xl shadow-neutral-900/30">
              <div className="bg-white rounded-[2rem] overflow-hidden">
                <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                  <span className="font-bold text-sm bg-ig-gradient bg-clip-text text-transparent">FamZee</span>
                  <span className="text-xs text-neutral-400">Feed</span>
                </div>
                <div className="px-4 py-3 flex gap-3 overflow-x-auto border-b border-neutral-50">
                  {STORIES.map((name) => (
                    <div key={name} className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-14 h-14 rounded-full p-[2px] bg-ig-gradient">
                        <div className="w-full h-full rounded-full bg-neutral-200" />
                      </div>
                      <span className="text-[10px] text-neutral-500">{name}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-0.5 bg-neutral-100">
                  {FEED_IMAGES.map((src, i) => (
                    <img key={i} src={src} alt="" className="aspect-square object-cover" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
