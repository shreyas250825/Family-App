import { AppLayout } from '../components/layout/AppLayout';
import { DEMO_MEMORIES } from '../lib/demoFamily';

export function Memories() {
  return (
    <AppLayout title="Memories">
      <p className="mb-8 max-w-xl fam-muted">Larger photographs, room to breathe, and a caption for every moment.</p>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {DEMO_MEMORIES.map((memory) => (
          <figure key={memory.id} className="fam-card mb-5 break-inside-avoid overflow-hidden">
            <img src={memory.image} alt={memory.title} className="aspect-[4/5] w-full object-cover" />
            <figcaption className="p-4">
              <p className="font-semibold">{memory.title}</p>
              <p className="mt-1 text-sm">{memory.caption}</p>
              <p className="mt-2 text-xs fam-muted">{memory.date} · {memory.by}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </AppLayout>
  );
}
