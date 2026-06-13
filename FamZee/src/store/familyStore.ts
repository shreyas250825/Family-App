import { create } from 'zustand';
import api from '../services/api';
import { Family, FamilyMember } from '../types';

interface FamilyState {
  families: Family[];
  currentFamilyId: string | null;
  currentFamily: Family | null;
  members: Record<string, FamilyMember[]>;
  loading: boolean;
  setCurrentFamily: (familyId: string) => void;
  fetchFamilies: () => Promise<void>;
  fetchMembers: (familyId: string) => Promise<void>;
  createFamily: (name: string) => Promise<Family>;
  joinFamily: (inviteCode: string) => Promise<void>;
  addFamily: (family: Family) => void;
}

export const useFamilyStore = create<FamilyState>((set, get) => ({
  families: [],
  currentFamilyId: null,
  currentFamily: null,
  members: {},
  loading: false,

  setCurrentFamily: (familyId) => {
    const family = get().families.find((f) => f.id === familyId);
    set({ currentFamilyId: familyId, currentFamily: family || null });
  },

  fetchFamilies: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get('/families');
      const families = Array.isArray(data) ? data : [];
      set({ families });
      if (families.length > 0 && !get().currentFamilyId) {
        set({ currentFamilyId: families[0].id, currentFamily: families[0] });
      }
    } finally {
      set({ loading: false });
    }
  },

  fetchMembers: async (familyId) => {
    const { data } = await api.get(`/families/${familyId}`);
    set((state) => ({
      members: { ...state.members, [familyId]: data.family_members || [] },
    }));
  },

  createFamily: async (name) => {
    const { data } = await api.post('/families', { name, is_public_feed: true });
    const family = data.family as Family;
    set((state) => ({
      families: [...state.families, family],
      currentFamilyId: family.id,
      currentFamily: family,
    }));
    return family;
  },

  joinFamily: async (inviteCode) => {
    await api.post('/families/join', { invite_code: inviteCode.trim().toUpperCase() });
    await get().fetchFamilies();
  },

  addFamily: (family) => {
    set((state) => ({ families: [...state.families, family] }));
  },
}));
