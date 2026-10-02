import { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Modal } from '../components/ui/Modal';
import { useFamZee } from '../context/FamZeeContext';
import { DEMO_UPCOMING } from '../lib/demoContent';
import { FAMILY_IMAGES } from '../lib/images';
import type { FamilyEvent } from '../types/family';

const EVENT_TYPE_STYLES = {
  birthday: { bg: 'bg-pink-500/10', text: 'text-pink-300', border: 'border-pink-500/20', icon: '🎂' },
  anniversary: { bg: 'bg-violet-500/10', text: 'text-violet-300', border: 'border-violet-500/20', icon: '💍' },
  gathering: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/20', icon: '👨‍👩‍👧‍👦' },
  holiday: { bg: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/20', icon: '🪔' },
};

type RsvpStatus = 'going' | 'maybe' | 'not';

const DEMO_EVENTS: FamilyEvent[] = DEMO_UPCOMING.map((e, i) => ({
  id: `demo_event_${i}`,
  title: e.title,
  date: e.when.split(' · ')[0] || e.when,
  time: e.when.includes('·') ? e.when.split(' · ')[1] : undefined,
  location: 'Mumbai',
  type: (['gathering', 'birthday', 'gathering', 'holiday'] as const)[i],
  attendees: 4,
  image: [FAMILY_IMAGES.dinner, FAMILY_IMAGES.birthday, FAMILY_IMAGES.reunion, FAMILY_IMAGES.diwali][i],
}));

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
  const [rsvpMap, setRsvpMap] = useState<Record<string, RsvpStatus>>({
    demo_event_0: 'going',
    demo_event_1: 'going',
    demo_event_2: 'maybe',
    demo_event_3: 'not',
  });
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'gathering' as FamilyEvent['type'],
  });

  const events = data.events.length > 0 ? data.events : DEMO_EVENTS;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  const label = calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const eventDaysForMonth = events
    .map((e) => {
      const d = new Date(e.date);
      if (!Number.isNaN(d.getTime()) && d.getMonth() === month && d.getFullYear() === year) return d.getDate();
      const parts = e.date.match(/(\d+)/);
      if (parts && month === today.getMonth()) return parseInt(parts[1], 10);
      if (e.date === 'Today' && month === today.getMonth() && year === today.getFullYear()) return today.getDate();
      return null;
    })
    .filter(Boolean) as number[];

  const setRsvp = (eventId: string, status: RsvpStatus) => {
    setRsvpMap((prev) => ({ ...prev, [eventId]: status }));
    if (status === 'going' && !data.rsvpEventIds.includes(eventId)) {
      toggleRsvp(eventId);
    }
  };

  const getRsvp = (eventId: string): RsvpStatus => {
    if (rsvpMap[eventId]) return rsvpMap[eventId];
    if (data.rsvpEventIds.includes(eventId)) return 'going';
    return 'maybe';
  };

  const handleAddEvent = () => {
    if (!form.title || !form.date) return;
    addEvent({
      title: form.title,
      date: form.date,
      time: form.time || undefined,
      location: form.location || undefined,
      type: form.type,
      image: FAMILY_IMAGES.gathering,
    });
    setForm({ title: '', date: '', time: '', location: '', type: 'gathering' });
    setShowAdd(false);
  };

  const prevMonth = () => setCalendarMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCalendarMonth(new Date(year, month + 1, 1));

  return (
    <AppLayout title="Events">
      <div className="mb-4 flex justify-end">
        <button type="button" onClick={() => setShowAdd(true)} className="app-btn-primary">
          + Add Event
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="app-surface rounded-2xl p-6 lg:col-span-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium ">{label}</h2>
            <div className="flex gap-1">
              <button type="button" onClick={prevMonth} className="rounded-lg p-2 text-stone-500 hover:bg-white/[0.04]">‹</button>
              <button type="button" onClick={nextMonth} className="rounded-lg p-2 text-stone-500 hover:bg-white/[0.04]">›</button>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-stone-600">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
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
                  type="button"
                  onClick={() => setSelectedCalendarDay(selected ? null : day)}
                  className={`relative rounded-lg py-2 text-sm font-medium transition ${
                    isToday ? 'bg-[var(--primary)] text-white'
                    : selected ? 'bg-[var(--primary-soft)]'
                    : hasEvent ? 'bg-[var(--primary-soft)] fam-muted'
                    : 'fam-muted'
                  }`}
                >
                  {day}
                  {hasEvent && !isToday && !selected ? (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-violet-400" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-lg font-medium ">Upcoming</h2>
            <div className="space-y-4">
              {events.map((event) => {
                const style = EVENT_TYPE_STYLES[event.type];
                const rsvp = getRsvp(event.id);
                return (
                  <div key={event.id} className="app-surface overflow-hidden rounded-2xl">
                    <div className="flex flex-col sm:flex-row">
                      {event.image ? (
                        <img src={event.image} alt="" className="h-36 w-full object-cover sm:h-auto sm:w-44" loading="lazy" />
                      ) : null}
                      <div className="flex-1 p-5">
                        <span className={`mb-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text} ${style.border}`}>
                          {style.icon} {event.type}
                        </span>
                        <h3 className="text-base font-medium ">{event.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-stone-500">
                          <span>{event.date}</span>
                          {event.time ? <span>{event.time}</span> : null}
                          {event.location ? <span>{event.location}</span> : null}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(['going', 'maybe', 'not'] as RsvpStatus[]).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setRsvp(event.id, s)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                rsvp === s
                                  ? s === 'going' ? 'bg-emerald-500/20 text-emerald-300'
                                  : s === 'maybe' ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-white/10 text-stone-400'
                                  : 'border border-white/[0.06] text-stone-500 hover:text-stone-300'
                              }`}
                            >
                              {s === 'going' ? 'Going' : s === 'maybe' ? 'Maybe' : 'Not going'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {data.members.some((m) => m.birthday) ? (
            <section>
              <h2 className="mb-4 text-lg font-medium ">Birthdays</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {data.members.filter((m) => m.birthday).map((b) => (
                  <div key={b.id} className="app-surface flex items-center gap-4 rounded-2xl p-4">
                    <img src={b.avatar} alt={b.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <h3 className="font-medium ">{b.name}</h3>
                      <p className="text-sm text-stone-500">{b.birthday}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Family Event">
        <div className="space-y-4">
          <input placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="fam-input" />
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="fam-input" />
          <input placeholder="Time (optional)" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="fam-input" />
          <input placeholder="Location (optional)" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="fam-input" />
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as FamilyEvent['type'] })} className="fam-input">
            <option value="gathering">Gathering</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="holiday">Holiday</option>
          </select>
          <button type="button" onClick={handleAddEvent} className="w-full app-btn-primary py-3">Save Event</button>
        </div>
      </Modal>
    </AppLayout>
  );
}
