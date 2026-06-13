import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useFamilyStore } from '../store/familyStore';
import { useNotificationStore } from '../store/notificationStore';

export function useAppBootstrap() {
  const user = useAuthStore((s) => s.user);
  const fetchFamilies = useFamilyStore((s) => s.fetchFamilies);
  const fetchNotifications = useNotificationStore((s) => s.fetchNotifications);

  useEffect(() => {
    if (!user) return;
    fetchFamilies();
    fetchNotifications();
  }, [user?.id]);
}
