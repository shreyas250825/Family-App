import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';
import { DEMO_ALBUMS_GRID } from '../lib/demoContent';
import type { StoredAlbum } from '../lib/seedData';

const CATEGORIES = [
  { id: 'all', label: 'All Albums' },
  { id: 'vacation', label: 'Vacations' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'holiday', label: 'Celebrations' },
  { id: 'general', label: 'General' },
];

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

  const demoAlbums: StoredAlbum[] = DEMO_ALBUMS_GRID.map((a, i) => ({
    id: `demo_album_${i}`,
    title: a.title,
    cover: a.cover,
    photoCount: a.count,
    category: (['vacation', 'general', 'birthday', 'general', 'vacation'] as const)[i],
    date: '2025',
    photos: Array.from({ length: 3 }, (_, j) => ({
      id: `demo_photo_${i}_${j}`,
      url: a.cover,
      addedAt: new Date().toISOString(),
    })),
  }));

  const albums = data.albums.length > 0 ? data.albums : demoAlbums;
  const filtered = activeCategory === 'all' ? albums : albums.filter((a) => a.category === activeCategory);
  const totalPhotos = albums.reduce((s, a) => s + a.photoCount, 0);

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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-xl px-4 py-2 text-sm font-medium transition"
              style={{
                background: activeCategory === cat.id ? 'var(--primary)' : 'transparent',
                color: activeCategory === cat.id ? '#fff' : 'var(--muted)',
                border: activeCategory === cat.id ? 'none' : '1px solid var(--border)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setShowCreate(true)} className="app-btn-primary">
          + New Album
        </button>
      </div>

      <div className="fam-card mb-8 flex gap-8 p-4">
        <div><span className="text-2xl font-medium">{albums.length}</span><span className="ml-2 text-sm fam-muted">Albums</span></div>
        <div><span className="text-2xl font-medium">{totalPhotos}</span><span className="ml-2 text-sm fam-muted">Photos</span></div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((album) => (
          <button
            key={album.id}
            type="button"
            onClick={() => setViewAlbum(album)}
            className="fam-card group overflow-hidden text-left"
          >
            <div className="relative h-52 overflow-hidden">
              <img src={album.cover} alt={album.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-base font-medium text-white">{album.title}</h3>
                <p className="text-xs text-stone-400">{album.photoCount} photos</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Album">
        <div className="space-y-4">
          <input placeholder="Album title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="fam-input" />
          <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as StoredAlbum['category'])} className="fam-input">
            <option value="general">General</option>
            <option value="vacation">Vacation</option>
            <option value="birthday">Birthday</option>
            <option value="holiday">Holiday</option>
          </select>
          <input ref={uploadRef} type="file" accept="image/*" className="hidden" onChange={handleCreateCover} />
          {newCover ? <img src={newCover} alt="" className="h-40 w-full rounded-xl object-cover" /> : null}
          <button type="button" onClick={() => uploadRef.current?.click()} className="w-full rounded-xl border border-dashed border-white/10 py-2.5 text-sm text-stone-500 hover:bg-white/[0.02]">
            Upload cover photo
          </button>
          <button type="button" onClick={handleCreateAlbum} disabled={!newTitle || !newCover} className="w-full app-btn-primary py-3 disabled:opacity-50">
            Create Album
          </button>
        </div>
      </Modal>

      <Modal open={!!viewAlbum} onClose={() => setViewAlbum(null)} title={viewAlbum?.title || 'Album'} wide>
        {viewAlbum ? (
          <>
            <input ref={albumUploadRef} type="file" accept="image/*" className="hidden" onChange={handleAddToAlbum} />
            <button type="button" onClick={() => albumUploadRef.current?.click()} className="mb-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-stone-400 hover:bg-white/[0.04]">
              + Add Photo
            </button>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {(data.albums.find((a) => a.id === viewAlbum.id)?.photos || viewAlbum.photos).map((photo) => (
                <img key={photo.id} src={photo.url} alt="" className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
              ))}
            </div>
          </>
        ) : null}
      </Modal>
    </AppLayout>
  );
}
