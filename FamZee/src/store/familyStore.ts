
  loading: boolean;
  createFamily: (name: string) => Promise<Family>;
  joinFamily: (inviteCode: string) => Promise<void>;
  loading: false,

    const family = get().families.find((f) => f.id === familyId);

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

      members: { ...state.members, [familyId]: data.family_members || [] },

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
