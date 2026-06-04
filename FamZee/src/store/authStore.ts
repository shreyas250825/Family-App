import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';
import { User } from '../types';

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
    await SecureStore.setItemAsync('session', JSON.stringify(data.session));
    set({ user: data.user, session: data.session });
  },
  signOut: async () => {
    await SecureStore.deleteItemAsync('session');
    set({ user: null, session: null });
  },
  hydrate: async () => {
    const sessionStr = await SecureStore.getItemAsync('session');
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      set({ user: session.user, session, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  }
}));
