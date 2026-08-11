import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { HorizontalScroll } from '../components/ui/HorizontalScroll';
import { useFamZee } from '../context/FamZeeContext';
import { DEMO_MEMBERS, DEMO_UPCOMING } from '../lib/demoContent';
import { DEMO_ALBUMS_GRID } from '../lib/demoContent';

export function FamilyProfile() {
  const { data, updateFamily, uploadImage, addMember } = useFamZee();
  const { family, members, memories, posts, events } = data;
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [name, setName] = useState(family.name);
  const [description, setDescription] = useState(family.description);
  const coverRef = useRef<HTMLInputElement>(null);

  const displayMembers = members.length > 0 ? members : DEMO_MEMBERS.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=7c3aed&color=fff`,
    isOnline: m.online,
    birthday: m.first === 'Arjun' ? 'Aug 18' : undefined,
  }));

  const memoryItems = [
    ...memories,
    ...posts.filter((p) => p.image).slice(0, 4).map((p) => ({
      id: p.id,
      title: p.content.slice(0, 40),
      image: p.image!,
      date: p.timestamp,
      author: p.author.name,
    })),
    ...DEMO_ALBUMS_GRID.slice(0, 2).map((a, i) => ({
      id: `demo_mem_${i}`,
      title: a.title,
      image: a.cover,
      date: '2025',
      author: 'Sharma Family',
    })),
  ].slice(0, 8);

  const upcoming = events.length > 0 ? events.slice(0, 3) : DEMO_UPCOMING.slice(0, 3).map((e, i) => ({
    id: `demo_up_${i}`,
    title: e.title,
    date: e.when,
  }));

  const handleSave = () => {
    updateFamily({ name: name.trim(), description: description.trim() });
    setEditOpen(false);
  };

  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImage(file);
      updateFamily({ coverPhoto: url });
    }
  };

  return (
    <AppLayout>
      <div className="mb-8 overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B0B0D]">
        <div className="group relative h-48 sm:h-64">
          <img src={family.coverPhoto} alt={family.name} className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-black/20 to-transparent" />
          <button
            type="button"
            onClick={() => coverRef.current?.click()}
            className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-stone-300 opacity-0 transition group-hover:opacity-100"
          >
            Change cover
          </button>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
        </div>

        <div className="relative px-6 pb-8 sm:px-8">
          <h1 className="text-2xl font-medium text-stone-100 sm:text-3xl">{family.name || 'The Sharma Family'}</h1>
          <p className="mt-1 text-sm text-stone-500">
            {displayMembers.length} members · {family.location || 'Mumbai'}
          </p>
          {family.description ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-400">{family.description}</p>
          ) : null}
          <button type="button" onClick={() => setEditOpen(true)} className="mt-4 text-xs text-stone-600 hover:text-stone-400">
            Edit family
          </button>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium text-stone-400">Family members</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {displayMembers.map((member) => (
            <div key={member.id} className="rounded-2xl border border-white/[0.06] bg-[#0B0B0D] p-4 text-center">
              <div className="relative mx-auto mb-3 inline-block">
                <img src={member.avatar} alt={member.name} className="mx-auto h-14 w-14 rounded-full object-cover" />
                {member.isOnline ? (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0B0B0D] bg-emerald-500" />
                ) : null}
              </div>
              <h3 className="text-sm font-medium text-stone-200">{member.name}</h3>
              <p className="text-xs text-stone-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-sm font-medium text-stone-400">Shared memories</h2>
        <HorizontalScroll showArrows={false}>
          {memoryItems.map((memory) => (
            <div key={memory.id} className="relative w-[65vw] max-w-[240px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/[0.06] sm:w-[200px]">
              <img src={memory.image} alt={memory.title} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-medium text-white">{memory.title}</p>
                <p className="text-[10px] text-stone-400">{memory.author}</p>
              </div>
            </div>
          ))}
        </HorizontalScroll>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-medium text-stone-400">Upcoming</h2>
        <div className="space-y-2">
          {upcoming.map((e) => (
            <div key={e.id} className="rounded-xl border border-white/[0.06] bg-[#0B0B0D] px-4 py-3">
              <p className="text-sm text-stone-200">{e.title}</p>
              <p className="text-xs text-stone-600">{e.date}</p>
            </div>
          ))}
        </div>
      </section>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add family member">
        <input
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          placeholder="Member name"
          className="mb-4 w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-stone-200 focus:outline-none focus:ring-1 focus:ring-white/20"
        />
        <button
          type="button"
          onClick={() => {
            if (newMemberName.trim()) {
              addMember(newMemberName.trim());
              setNewMemberName('');
              setAddOpen(false);
            }
          }}
          className="w-full rounded-xl bg-stone-100 py-3 text-sm font-medium text-[#0a0a0a]"
        >
          Add member
        </button>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Family">
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Family name" className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-stone-200 focus:outline-none focus:ring-1 focus:ring-white/20" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Description" className="w-full resize-none rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3 text-stone-200 focus:outline-none focus:ring-1 focus:ring-white/20" />
          <button type="button" onClick={handleSave} className="w-full app-btn-primary py-3">Save</button>
        </div>
      </Modal>
    </AppLayout>
  );
}
