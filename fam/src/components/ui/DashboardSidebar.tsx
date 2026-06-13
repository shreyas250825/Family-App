import { Link } from 'react-router-dom';
import { UPCOMING_BIRTHDAYS, UPCOMING_EVENTS, ONLINE_MEMBERS } from '../../constants/mockData';

export function DashboardSidebar() {
  return (
    <>
      <Panel title="Upcoming Birthdays" icon="🎂">
        <div className="space-y-3">
          {UPCOMING_BIRTHDAYS.map((b) => (
            <div key={b.name} className="flex items-center gap-3">
              <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{b.name}</p>
                <p className="text-xs text-slate-500">{b.date}</p>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                b.daysAway <= 7 ? 'bg-brand-accent/15 text-amber-700' : 'bg-slate-100 text-slate-500'
              }`}>
                {b.daysAway <= 7 ? `${b.daysAway}d` : b.date.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Upcoming Events" icon="📅">
        <div className="space-y-3">
          {UPCOMING_EVENTS.slice(0, 3).map((event) => (
            <Link key={event.id} to="/events" className="block group">
              <div className="flex gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors">
                {event.image && (
                  <img src={event.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate group-hover:text-brand-primary transition-colors">
                    {event.title}
                  </p>
                  <p className="text-xs text-slate-500">{event.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/events" className="block text-center text-sm text-brand-primary font-medium mt-3 hover:underline">
          View all events
        </Link>
      </Panel>

      <Panel title="Online Now" icon="🟢">
        <div className="flex flex-wrap gap-2">
          {ONLINE_MEMBERS.map((member) => (
            <div key={member.id} className="relative group" title={member.name}>
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-soft group-hover:ring-brand-primary/30 transition-all"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">{ONLINE_MEMBERS.length} family members online</p>
      </Panel>
    </>
  );
}

function Panel({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass-dark rounded-2xl p-5 shadow-soft">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 mb-4">
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}
