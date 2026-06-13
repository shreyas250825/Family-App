import { AppLayout } from '../components/layout/AppLayout';
import { FAMILY, MEMBERS, RECENT_MEMORIES } from '../constants/mockData';

export function FamilyProfile() {
  return (
    <AppLayout>
      {/* Cover & header */}
      <div className="glass-dark rounded-3xl overflow-hidden shadow-card mb-6 animate-slide-up" data-tour="family-profile">
        <div className="relative h-48 sm:h-64">
          <img src={FAMILY.coverPhoto} alt={FAMILY.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        </div>

        <div className="px-6 sm:px-8 pb-8 -mt-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-brand flex items-center justify-center text-4xl shadow-glow border-4 border-white">
              👨‍👩‍👧‍👦
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{FAMILY.name}</h1>
              <p className="text-slate-500 text-sm mt-1">{FAMILY.tagline}</p>
              <p className="text-slate-400 text-xs mt-1">📍 {FAMILY.location}</p>
            </div>
            <button className="px-6 py-2.5 bg-gradient-brand rounded-xl text-white text-sm font-semibold shadow-soft hover:shadow-glow transition-all self-start sm:self-auto">
              Edit Family
            </button>
          </div>

          <p className="text-slate-600 leading-relaxed max-w-3xl mb-8">{FAMILY.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Members', value: FAMILY.stats.members, icon: '👥' },
              { label: 'Photos', value: FAMILY.stats.photos, icon: '📸' },
              { label: 'Events', value: FAMILY.stats.events, icon: '📅' },
              { label: 'Memories', value: FAMILY.stats.memories, icon: '💜' },
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

      {/* Members */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Family Members</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEMBERS.map((member) => (
            <div key={member.id} className="glass-dark rounded-2xl p-5 shadow-soft text-center hover:shadow-card hover:-translate-y-1 transition-all group">
              <div className="relative inline-block mb-3">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover mx-auto ring-2 ring-brand-primary/10 group-hover:ring-brand-primary/30 transition-all" />
                {member.isOnline && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <h3 className="font-semibold text-slate-800 text-sm">{member.name}</h3>
              <p className="text-xs text-slate-500">{member.role}</p>
              {member.birthday && (
                <p className="text-xs text-brand-primary mt-1">🎂 {member.birthday}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Recent memories */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Memories</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {RECENT_MEMORIES.map((memory) => (
            <div key={memory.id} className="group relative rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all cursor-pointer">
              <img src={memory.image} alt={memory.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-sm font-semibold">{memory.title}</h3>
                <p className="text-white/70 text-xs">{memory.author} · {memory.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
