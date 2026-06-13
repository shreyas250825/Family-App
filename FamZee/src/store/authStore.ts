import { create } from 'zustand';
import api from '../services/api';
import { User } from '../types';
import { secureStore } from '../utils/secureStore';

interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  hydrate: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,

  fetchProfile: async () => {
    const { data } = await api.get('/auth/profile');
    set({ user: data });
  },

  signIn: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    await secureStore.setItemAsync('session', JSON.stringify(data.session));
    set({ session: data.session });

    try {
      await get().fetchProfile();
    } catch {
      const meta = data.user?.user_metadata;
      set({
        user: {
          id: data.user.id,
          email: data.user.email,
          full_name: meta?.full_name || email.split('@')[0],
          created_at: data.user.created_at,
        },
      });
    }
  },

  signOut: async () => {
    await secureStore.deleteItemAsync('session');
    set({ user: null, session: null });
  },

  hydrate: async () => {
    try {
      const sessionStr = await secureStore.getItemAsync('session');
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        set({ session });
        await get().fetchProfile();
      }
    } catch {
      await secureStore.deleteItemAsync('session');
      set({ user: null, session: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
