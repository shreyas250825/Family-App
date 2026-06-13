import { AppLayout } from '../components/layout/AppLayout';
import { UPCOMING_BIRTHDAYS, UPCOMING_EVENTS } from '../constants/mockData';

const EVENT_TYPE_STYLES = {
  birthday: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100', icon: '🎂' },
  anniversary: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', icon: '💍' },
  gathering: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', icon: '👨‍👩‍👧‍👦' },
  holiday: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: '🪔' },
};

export function Events() {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const eventDays = [30, 15, 22];

  return (
    <AppLayout title="Events">
      <div className="grid lg:grid-cols-3 gap-6" data-tour="events-page">
        {/* Calendar */}
        <div className="lg:col-span-1 glass-dark rounded-2xl p-6 shadow-soft animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">{currentMonth}</h2>
            <div className="flex gap-1">
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Previous month">‹</button>
              <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Next month">›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="py-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();
              const hasEvent = eventDays.includes(day);
              return (
                <button
                  key={day}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isToday
                      ? 'bg-gradient-brand text-white shadow-soft'
                      : hasEvent
                      ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {day}
                  {hasEvent && !isToday && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Events list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Birthdays */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              🎂 Upcoming Birthdays
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {UPCOMING_BIRTHDAYS.map((b) => (
                <div key={b.name} className="glass-dark rounded-2xl p-5 shadow-soft flex items-center gap-4 hover:shadow-card transition-all">
                  <img src={b.avatar} alt={b.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-pink-100" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{b.name}</h3>
                    <p className="text-sm text-slate-500">{b.date}</p>
                    {b.daysAway <= 7 && (
                      <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 bg-brand-accent/15 text-amber-700 rounded-full">
                        In {b.daysAway} days
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* All events */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              📅 Family Events
            </h2>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map((event) => {
                const style = EVENT_TYPE_STYLES[event.type];
                return (
                  <div key={event.id} className="glass-dark rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all group">
                    <div className="flex flex-col sm:flex-row">
                      {event.image && (
                        <img src={event.image} alt="" className="sm:w-48 h-32 sm:h-auto object-cover flex-shrink-0" />
                      )}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text} ${style.border} border mb-2`}>
                              {style.icon} {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </span>
                            <h3 className="font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                              {event.title}
                            </h3>
                          </div>
                          <button className="px-4 py-1.5 text-xs font-semibold bg-brand-primary/10 text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-colors flex-shrink-0">
                            RSVP
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <span>📅 {event.date}</span>
                          {event.time && <span>🕐 {event.time}</span>}
                          {event.location && <span>📍 {event.location}</span>}
                          <span>👥 {event.attendees} attending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
