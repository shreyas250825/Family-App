import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';
import type { StoredAlbum } from '../lib/seedData';

const CATEGORIES = [
  { id: 'all', label: 'All Albums' },
  { id: 'vacation', label: 'Vacations' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'general', label: 'General' },
];

const CATEGORY_ICONS: Record<string, string> = {
  vacation: '✈️', wedding: '💒', birthday: '🎂', general: '📷',
};

export function Albums() {
  const { data, addAlbum, addPhotoToAlbum, uploadImage } = useFamZee();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewAlbum, setViewAlbum] = useState<StoredAlbum | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<StoredAlbum['category']>('general');
  const [newCover, setNewCover] = useState<string | undefined>();
  const uploadRef = useRef<HTMLInputElement>(null);
  const albumUploadRef = useRef<HTMLInputElement>(null);

  const filtered = activeCategory === 'all'
    ? data.albums
    : data.albums.filter((a) => a.category === activeCategory);

  const totalPhotos = data.albums.reduce((s, a) => s + a.photoCount, 0);

  const handleCreateCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setNewCover(await uploadImage(file));
  };

  const handleCreateAlbum = () => {
    if (!newTitle.trim() || !newCover) return;
    addAlbum(newTitle.trim(), newCategory, newCover);
    setNewTitle('');
    setNewCover(undefined);
    setShowCreate(false);
  };

  const handleAddToAlbum = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !viewAlbum) return;
    const url = await uploadImage(file);
    addPhotoToAlbum(viewAlbum.id, url);
    setViewAlbum(data.albums.find((a) => a.id === viewAlbum.id) || viewAlbum);
  };

  return (
    <AppLayout title="Photo Albums">
      <div className="flex flex-wrap gap-2 mb-6 justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id ? 'bg-gradient-brand text-white shadow-soft' : 'glass-dark text-slate-600 shadow-soft'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowCreate(true)} className="px-5 py-2.5 bg-gradient-brand text-white rounded-xl text-sm font-semibold shadow-soft">
          + New Album
        </button>
      </div>

      <div className="glass-dark rounded-2xl p-4 mb-8 shadow-soft flex gap-6">
        <div><span className="text-2xl font-bold text-gradient">{data.albums.length}</span><span className="text-sm text-slate-500 ml-2">Albums</span></div>
        <div><span className="text-2xl font-bold text-gradient">{totalPhotos}</span><span className="text-sm text-slate-500 ml-2">Photos</span></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-neutral-100 p-12 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center text-2xl">🖼️</div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">No albums yet</h3>
            <p className="text-neutral-500 text-sm mb-6">Create your first album to organize family photos.</p>
            <button onClick={() => setShowCreate(true)} className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-semibold">
              Create album
            </button>
          </div>
        ) : (
        filtered.map((album) => (
          <div
            key={album.id}
            onClick={() => setViewAlbum(album)}
            className="group glass-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={album.cover} alt={album.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 px-2.5 py-1 glass rounded-lg text-xs font-medium">{CATEGORY_ICONS[album.category]} {album.category}</div>
              <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold text-lg">{album.title}</h3></div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">{album.date}</p>
                <p className="text-sm font-medium text-slate-700">{album.photoCount} photos</p>
              </div>
              <span className="text-brand-primary font-semibold text-sm">View →</span>
            </div>
          </div>
        ))
        )}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Album">
        <div className="space-y-4">
          <input placeholder="Album title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as StoredAlbum['category'])} className="w-full px-4 py-3 rounded-xl border border-slate-200">
            <option value="general">General</option><option value="vacation">Vacation</option><option value="wedding">Wedding</option><option value="birthday">Birthday</option>
          </select>
          <input ref={uploadRef} type="file" accept="image/*" className="hidden" onChange={handleCreateCover} />
          {newCover ? <img src={newCover} alt="" className="w-full h-40 object-cover rounded-xl" /> : null}
          <button onClick={() => uploadRef.current?.click()} className="w-full py-2.5 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:bg-slate-50">📷 Upload Cover Photo</button>
          <button onClick={handleCreateAlbum} disabled={!newTitle || !newCover} className="w-full py-3 bg-gradient-brand text-white rounded-xl font-semibold disabled:opacity-50">Create Album</button>
        </div>
      </Modal>

      <Modal open={!!viewAlbum} onClose={() => setViewAlbum(null)} title={viewAlbum?.title || 'Album'} wide>
        {viewAlbum && (() => {
          const album = data.albums.find((a) => a.id === viewAlbum.id) ?? viewAlbum;
          return (
          <>
            <input ref={albumUploadRef} type="file" accept="image/*" className="hidden" onChange={handleAddToAlbum} />
            <button onClick={() => albumUploadRef.current?.click()} className="mb-4 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl text-sm font-semibold hover:bg-brand-primary hover:text-white transition-colors">
              + Add Photo
            </button>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {album.photos.map((photo) => (
                <img key={photo.id} src={photo.url} alt="" className="w-full h-32 object-cover rounded-xl shadow-soft" />
              ))}
            </div>
          </>
          );
        })()}
      </Modal>
    </AppLayout>
  );
}
