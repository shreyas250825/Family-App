import { useState } from 'react';
import { ALBUMS } from '../../../../lib/landingData';
import { SafeImage } from '../SafeImage';

export function MemoriesGallery() {
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(168,85,247,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="max-w-xl text-3xl font-semibold leading-tight text-stone-50 sm:text-5xl">
          Memories,
          <br />
          <span className="text-stone-500">kept forever.</span>
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-16 lg:grid-cols-5">
          {ALBUMS.map((album, i) => (
            <button
              key={album.title}
              type="button"
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                active === i
                  ? 'col-span-2 row-span-2 border-violet-500/30 sm:col-span-2'
                  : 'border-white/[0.06] hover:border-white/15'
              }`}
            >
              <SafeImage
                src={album.cover}
                alt={album.title}
                gradient={album.gradient}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  active === i ? 'aspect-[4/5]' : 'aspect-square'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className={`font-medium text-stone-100 ${active === i ? 'text-lg' : 'text-sm'}`}>{album.title}</p>
                <p className="text-xs text-stone-400">{album.count} photos</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
