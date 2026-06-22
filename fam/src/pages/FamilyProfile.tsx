import { useState, useRef } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';

export function FamilyProfile() {
  const { data, updateFamily, uploadImage, addMember } = useFamZee();
  const { family, members, memories, posts, events } = data;
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [name, setName] = useState(family.name);
  const [description, setDescription] = useState(family.description);
  const coverRef = useRef<HTMLInputElement>(null);

  const stats = {
    members: members.length,
    photos: family.stats.photos,
    events: events.length,
    memories: posts.length + memories.length,
  };

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
      <div className="glass-dark rounded-3xl overflow-hidden shadow-card mb-6 animate-slide-up" data-tour="family-profile">
        <div className="relative h-48 sm:h-64 group">
          <img src={family.coverPhoto} alt={family.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          <button
            onClick={() => coverRef.current?.click()}
            className="absolute top-4 right-4 px-3 py-1.5 glass rounded-lg text-sm font-medium text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            📷 Change Cover
          </button>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
        </div>

        <div className="px-6 sm:px-8 pb-8 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand flex items-center justify-center text-4xl shadow-glow border-4 border-white">👨‍👩‍👧‍👦</div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{family.name}</h1>
              <p className="text-slate-500 text-sm mt-1">{family.tagline}</p>
              <p className="text-slate-400 text-xs mt-1">📍 {family.location}</p>
            </div>
            <button onClick={() => setEditOpen(true)} className="px-6 py-2.5 bg-gradient-brand rounded-xl text-white text-sm font-semibold shadow-soft hover:shadow-glow self-start sm:self-auto">
              Edit Family
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed max-w-3xl mb-8">{family.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Members', value: stats.members, icon: '👥' },
              { label: 'Photos', value: stats.photos, icon: '📸' },
              { label: 'Events', value: stats.events, icon: '📅' },
              { label: 'Memories', value: stats.memories, icon: '💜' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Family Members</h2>
          <button onClick={() => setAddOpen(true)} className="text-sm font-semibold text-neutral-900 hover:underline">
            + Add member
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member) => (
            <div key={member.id} className="glass-dark rounded-2xl p-5 shadow-soft text-center hover:shadow-card hover:-translate-y-1 transition-all">
              <div className="relative inline-block mb-3">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-brand-primary/10" />
                {member.isOnline && <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{member.name}</h3>
              <p className="text-xs text-slate-500">{member.role}</p>
              {member.birthday && <p className="text-xs text-brand-primary mt-1">🎂 {member.birthday}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">Recent Memories</h2>
        {memories.length === 0 && posts.filter((p) => p.image).length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center text-neutral-500 text-sm">
            Photos and posts from your feed will appear here.
          </div>
        ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...memories, ...posts.filter((p) => p.image).slice(0, 4).map((p) => ({
            id: p.id,
            title: p.content.slice(0, 40),
            image: p.image!,
            date: p.timestamp,
            author: p.author.name,
          }))].slice(0, 8).map((memory) => (
            <div key={memory.id} className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-card cursor-pointer">
              <img src={memory.image} alt={memory.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-semibold line-clamp-2">{memory.title}</h3>
                <p className="text-white/70 text-xs">{memory.author} · {memory.date}</p>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add family member">
        <input
          value={newMemberName}
          onChange={(e) => setNewMemberName(e.target.value)}
          placeholder="Member name"
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 mb-4 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
        />
        <button
          onClick={() => {
            if (newMemberName.trim()) {
              addMember(newMemberName.trim());
              setNewMemberName('');
              setAddOpen(false);
            }
          }}
          className="w-full py-3 bg-neutral-900 text-white rounded-xl font-semibold"
        >
          Add member
        </button>
      </Modal>

      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Edit Family">
        <div className="space-y-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Family name" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Description" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 resize-none" />
          <button onClick={handleSave} className="w-full py-3 bg-gradient-brand text-white rounded-xl font-semibold">Save</button>
        </div>
      </Modal>
    </AppLayout>
  );
}
