
  loading: boolean;
  loading: false,

    set({ loading: true });
    try {
      const { data } = await api.get('/notifications/notifications');
      set({
        notifications: data.notifications || [],
        unreadCount: data.unread_count || 0,
        loading: false,
      });
    } catch {
      set({ loading: false });
    }

    await api.put(`/notifications/notifications/${id}/read`);
      notifications: state.notifications.map((n) =>
      unreadCount: Math.max(0, state.unreadCount - 1),

    await api.put('/notifications/notifications/read-all');
      notifications: state.notifications.map((n) => ({ ...n, is_read: true })),
      unreadCount: 0,

      unreadCount: state.unreadCount + 1,
  },