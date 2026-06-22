import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';
import type { FamilyEvent } from '../types/family';

const EVENT_TYPE_STYLES = {
  birthday: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-100', icon: '🎂' },
  anniversary: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-100', icon: '💍' },
  gathering: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100', icon: '👨‍👩‍👧‍👦' },
  holiday: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: '🪔' },
};

export function Events() {
  const {
    data,
    calendarMonth,
    setCalendarMonth,
    selectedCalendarDay,
    setSelectedCalendarDay,
    addEvent,
    toggleRsvp,
  } = useFamZee();

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'gathering' as FamilyEvent['type'],
  });

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  const label = calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const eventDaysForMonth = data.events
    .map((e) => {
      const d = new Date(e.date);
      if (d.getMonth() === month && d.getFullYear() === year) return d.getDate();
      const parts = e.date.match(/(\d+)/);
      if (parts && month === today.getMonth()) return parseInt(parts[1], 10);
      return null;
    })
    .filter(Boolean) as number[];

  const handleAddEvent = () => {
    if (!form.title || !form.date) return;
    addEvent({
      title: form.title,
      date: form.date,
      time: form.time || undefined,
      location: form.location || undefined,
      type: form.type,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    });
    setForm({ title: '', date: '', time: '', location: '', type: 'gathering' });
    setShowAdd(false);
  };

  const prevMonth = () => setCalendarMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCalendarMonth(new Date(year, month + 1, 1));

  return (
    <AppLayout title="Events">
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowAdd(true)} className="px-5 py-2.5 bg-gradient-brand text-white rounded-xl font-semibold text-sm shadow-soft hover:shadow-glow">
          + Add Event
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6" data-tour="events-page">
        <div className="lg:col-span-1 glass-dark rounded-2xl p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">{label}</h2>
            <div className="flex gap-1">
              <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">‹</button>
              <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">›</button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-400 mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => <div key={d} className="py-2">{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const hasEvent = eventDaysForMonth.includes(day);
              const selected = selectedCalendarDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedCalendarDay(selected ? null : day)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors relative ${
                    isToday ? 'bg-gradient-brand text-white shadow-soft'
                    : selected ? 'bg-brand-secondary text-white'
                    : hasEvent ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20'
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {day}
                  {hasEvent && !isToday && !selected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedCalendarDay && (
            <div className="mt-4 p-3 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
              <p className="text-sm font-semibold text-brand-primary">Events on {label.split(' ')[0]} {selectedCalendarDay}</p>
              <p className="text-xs text-slate-500 mt-1">
                {data.events.filter((e) => e.date.includes(String(selectedCalendarDay))).length || 0} event(s)
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4">🎂 Upcoming Birthdays</h2>
            {data.members.filter((m) => m.birthday).length === 0 ? (
              <p className="text-sm text-neutral-500 bg-white rounded-2xl border border-neutral-100 p-6">Add member birthdays from your family profile.</p>
            ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {data.members.filter((m) => m.birthday).map((b) => (
                <div key={b.id} className="glass-dark rounded-2xl p-5 shadow-soft flex items-center gap-4">
                  <img src={b.avatar} alt={b.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-pink-100" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{b.name}</h3>
                    <p className="text-sm text-slate-500">{b.birthday}</p>
                  </div>
                </div>
              ))}
            </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4">📅 Family Events</h2>
            {data.events.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 p-10 text-center">
                <p className="text-neutral-500 text-sm mb-4">No events yet. Create your first family event.</p>
                <button onClick={() => setShowAdd(true)} className="px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-semibold">Add event</button>
              </div>
            ) : (
            <div className="space-y-4">
              {data.events.map((event) => {
                const style = EVENT_TYPE_STYLES[event.type];
                const rsvped = data.rsvpEventIds.includes(event.id);
                return (
                  <div key={event.id} className="glass-dark rounded-2xl overflow-hidden shadow-soft group">
                    <div className="flex flex-col sm:flex-row">
                      {event.image && <img src={event.image} alt="" className="sm:w-48 h-32 sm:h-auto object-cover" />}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text} border ${style.border} mb-2`}>
                              {style.icon} {event.type}
                            </span>
                            <h3 className="font-bold text-slate-800">{event.title}</h3>
                          </div>
                          <button
                            onClick={() => toggleRsvp(event.id)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex-shrink-0 ${
                              rsvped ? 'bg-emerald-500 text-white' : 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white'
                            }`}
                          >
                            {rsvped ? '✓ Going' : 'RSVP'}
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
            )}
          </section>
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Family Event">
        <div className="space-y-4">
          <input placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <input placeholder="Time (optional)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <input placeholder="Location (optional)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as FamilyEvent['type'] })} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
            <option value="gathering">Gathering</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="holiday">Holiday</option>
          </select>
          <button onClick={handleAddEvent} className="w-full py-3 bg-gradient-brand text-white rounded-xl font-semibold">Save Event</button>
        </div>
      </Modal>
    </AppLayout>
  );
}
