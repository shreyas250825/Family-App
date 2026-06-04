import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, isLoading, hydrate, signOut } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, []);

  return { user, isLoading, signOut };
};
