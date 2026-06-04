import { create } from 'zustand';
import api from '../services/api';
import { Family, FamilyMember } from '../types';

interface FamilyState {
  families: Family[];
  currentFamilyId: string | null;
  currentFamily: Family | null;
  members: Record<string, FamilyMember[]>;
  setCurrentFamily: (familyId: string) => void;
  fetchFamilies: () => Promise<void>;
  fetchMembers: (familyId: string) => Promise<void>;
  addFamily: (family: Family) => void;
  leaveFamily: (familyId: string) => Promise<void>;
}

export const useFamilyStore = create<FamilyState>((set, get) => ({
  families: [],
  currentFamilyId: null,
  currentFamily: null,
  members: {},
  setCurrentFamily: (familyId) => {
    const family = get().families.find(f => f.id === familyId);
    set({ currentFamilyId: familyId, currentFamily: family || null });
  },
  fetchFamilies: async () => {
    const { data } = await api.get('/families');
    set({ families: data });
    if (data.length > 0 && !get().currentFamilyId) {
      set({ currentFamilyId: data[0].id, currentFamily: data[0] });
    }
  },
  fetchMembers: async (familyId) => {
    const { data } = await api.get(`/families/${familyId}`);
    set((state) => ({
      members: { ...state.members, [familyId]: data.family_members }
    }));
  },
  addFamily: (family) => {
    set((state) => ({ families: [...state.families, family] }));
  },
  leaveFamily: async (familyId) => {
    await api.delete(`/families/${familyId}/members/me`);
    set((state) => ({
      families: state.families.filter(f => f.id !== familyId),
      currentFamilyId: state.currentFamilyId === familyId ? null : state.currentFamilyId,
      currentFamily: state.currentFamily?.id === familyId ? null : state.currentFamily
    }));
  }
}));
