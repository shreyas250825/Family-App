import { useState } from 'react';
import { DEMO_ALBUMS_GRID } from '../../../lib/demoContent';
import { AppChrome } from './TourPrimitives';
import { MockAlbumViewerPanel } from './MockPanels';

export function AlbumPreviewModal({ open, albumIndex, onClose }: { open: boolean; albumIndex: number; onClose: () => void }) {
  if (!open) return null;
  const album = DEMO_ALBUMS_GRID[albumIndex];
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-8" onClick={onClose} role="dialog" aria-modal>
      <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <AppChrome url={`famzee.app/albums/${album.title.toLowerCase().replace(/\s/g, '-')}`}>
          <MockAlbumViewerPanel albumIndex={albumIndex} />
        </AppChrome>
        <button type="button" onClick={onClose} className="mt-4 w-full text-center text-sm text-stone-500 hover:text-stone-300">
          Close preview
        </button>
      </div>
    </div>
  );
}

export function InteractiveAlbumsSection() {
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:gap-3">
        {DEMO_ALBUMS_GRID.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setPreviewIdx(i)}
            className="group overflow-hidden rounded-xl border border-white/[0.06] bg-[#0B0B0D] text-left transition hover:border-white/10"
          >
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-square">
              <img src={a.cover} alt={a.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="text-xs text-stone-400">{a.count} photos</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <AlbumPreviewModal open={previewIdx !== null} albumIndex={previewIdx ?? 0} onClose={() => setPreviewIdx(null)} />
    </>
  );
}
