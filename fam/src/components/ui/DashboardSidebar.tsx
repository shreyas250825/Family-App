import { Link } from 'react-router-dom';
import { useFamZee } from '../../context/FamZeeContext';

export function DashboardSidebar() {
  const { data } = useFamZee();
  const birthdays = data.members.filter((m) => m.birthday);

  return (
    <>
      <Panel title="Upcoming Birthdays" icon="🎂">
        {birthdays.length === 0 ? (
          <p className="text-xs text-neutral-500">Add birthdays in family profile.</p>
        ) : (
          <div className="space-y-3">
            {birthdays.map((b) => (
              <div key={b.id} className="flex items-center gap-3">
                <img src={b.avatar} alt={b.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800 truncate">{b.name}</p>
                  <p className="text-xs text-neutral-500">{b.birthday}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Upcoming Events" icon="📅">
        {data.events.length === 0 ? (
          <p className="text-xs text-neutral-500">No events scheduled yet.</p>
        ) : (
          <>
            <div className="space-y-3">
              {data.events.slice(0, 3).map((event) => (
                <Link key={event.id} to="/events" className="block group">
                  <div className="flex gap-3 p-2 -mx-2 rounded-xl hover:bg-neutral-50 transition-colors">
                    {event.image && <img src={event.image} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-neutral-800 truncate group-hover:text-neutral-600">{event.title}</p>
                      <p className="text-xs text-neutral-500">{event.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/events" className="block text-center text-sm text-neutral-900 font-medium mt-3 hover:underline">View all events</Link>
          </>
        )}
      </Panel>

      <Panel title="Online Now" icon="🟢">
        <div className="flex flex-wrap gap-2">
          {data.members.filter((m) => m.isOnline).map((member) => (
            <div key={member.id} className="relative group" title={member.name}>
              <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Panel({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-800 mb-4"><span>{icon}</span> {title}</h3>
      {children}
    </div>
  );
}
