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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  signIn: async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    // Backend returns Supabase session object: { access_token, refresh_token, ... }
    await secureStore.setItemAsync('session', JSON.stringify(data.session));

    // Session only contains token fields; user is fetched via /api/auth/profile when needed.
    set({ user: data.user ?? null, session: data.session });
  },
  signOut: async () => {
    await secureStore.deleteItemAsync('session');

    set({ user: null, session: null });
  },
  hydrate: async () => {
    const sessionStr = await secureStore.getItemAsync('session');

    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      // Keep user from API flow; session object is token-only (no user).
      set({ user: session.user ?? null, session, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  }
}));
