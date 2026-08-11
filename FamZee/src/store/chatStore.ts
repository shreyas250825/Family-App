
  loading: boolean;
  error: string | null;
  loading: false,
  error: null,

    set({ loading: true, error: null });
    try {
      const { data } = await api.get('/chat/conversations');
      set({ conversations: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load chats',
      });
    }

    const { data } = await api.get(`/chat/conversations/${conversationId}/messages`);
      messages: { ...state.messages, [conversationId]: data },

    const { data } = await api.post(`/chat/conversations/${conversationId}/messages`, { content });
        [conversationId]: [...(state.messages[conversationId] || []), data],
      },

        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
  },