import { AppLayout } from '../components/layout/AppLayout';
import { useFamZee } from '../context/FamZeeContext';

export function Notifications() {
  const { data, markNotificationRead, markAllNotificationsRead } = useFamZee();
  const unread = data.notifications.filter((n) => !n.isRead).length;

  return (
    <AppLayout title="Notifications">
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm fam-muted">{unread > 0 ? `${unread} unread notifications` : 'All caught up'}</p>
        {unread > 0 && (
          <button onClick={markAllNotificationsRead} className="text-sm text-brand-primary font-semibold hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {data.notifications.length === 0 ? (
          <div className="fam-card p-12 text-center">
            <div className="mb-3 text-4xl">🔔</div>
            <h3 className="mb-1 font-semibold">You&apos;re all caught up</h3>
            <p className="text-sm fam-muted">Family activity will show up here.</p>
          </div>
        ) : (
          data.notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className="fam-card flex w-full gap-4 p-5 text-left"
          >
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">🔔</div>
            <div className="flex-1">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="mt-1 text-sm fam-muted">{n.body}</p>
              <p className="mt-2 text-xs fam-muted">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            {!n.isRead && <span className="w-2 h-2 rounded-full bg-brand-primary flex-shrink-0 mt-2" />}
          </button>
          ))
        )}
      </div>
    </AppLayout>
  );
}
