import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { ALBUMS } from '../constants/mockData';

const CATEGORIES = [
  { id: 'all', label: 'All Albums' },
  { id: 'vacation', label: 'Vacations' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'general', label: 'General' },
];

const CATEGORY_ICONS = {
  vacation: '✈️',
  wedding: '💒',
  birthday: '🎂',
  general: '📷',
};

export function Albums() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? ALBUMS
    : ALBUMS.filter((a) => a.category === activeCategory);

  return (
    <AppLayout title="Photo Albums">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-brand text-white shadow-soft'
                : 'glass-dark text-slate-600 hover:shadow-soft shadow-soft'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="glass-dark rounded-2xl p-4 mb-8 shadow-soft flex flex-wrap gap-6">
        <div>
          <span className="text-2xl font-bold text-gradient">{ALBUMS.length}</span>
          <span className="text-sm text-slate-500 ml-2">Albums</span>
        </div>
        <div>
          <span className="text-2xl font-bold text-gradient">{ALBUMS.reduce((s, a) => s + a.photoCount, 0)}</span>
          <span className="text-sm text-slate-500 ml-2">Total Photos</span>
        </div>
      </div>

      {/* Album grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-tour="albums-page">
        {filtered.map((album, index) => (
          <div
            key={album.id}
            className="group glass-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1 cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={album.cover}
                alt={album.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 px-2.5 py-1 glass rounded-lg text-xs font-medium text-slate-700">
                {CATEGORY_ICONS[album.category]} {album.category}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-bold text-lg">{album.title}</h3>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{album.date}</p>
                <p className="text-sm font-medium text-slate-700">{album.photoCount} photos</p>
              </div>
              <button className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors" aria-label="View album">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
