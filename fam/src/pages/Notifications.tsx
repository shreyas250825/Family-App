import { AppLayout } from '../components/layout/AppLayout';
import { useFamZee } from '../context/FamZeeContext';

export function Notifications() {
  const { data, markNotificationRead, markAllNotificationsRead } = useFamZee();
  const unread = data.notifications.filter((n) => !n.isRead).length;

  return (
    <AppLayout title="Notifications">
      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-500 text-sm">{unread > 0 ? `${unread} unread notifications` : 'All caught up ✨'}</p>
        {unread > 0 && (
          <button onClick={markAllNotificationsRead} className="text-sm text-brand-primary font-semibold hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {data.notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`w-full text-left glass-dark rounded-2xl p-5 shadow-soft flex gap-4 transition-all hover:shadow-card ${
              !n.isRead ? 'border-l-4 border-l-brand-primary bg-brand-primary/5' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">🔔</div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800">{n.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{n.body}</p>
              <p className="text-xs text-slate-400 mt-2">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            {!n.isRead && <span className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0 mt-2" />}
          </button>
        ))}
      </div>
    </AppLayout>
  );
}
