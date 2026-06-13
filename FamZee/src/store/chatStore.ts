import { create } from 'zustand';
import api from '../services/api';
import { Message, Conversation } from '../types';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  addMessage: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  messages: {},
  loading: false,
  error: null,

  fetchConversations: async () => {
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
  },

  fetchMessages: async (conversationId) => {
    const { data } = await api.get(`/chat/conversations/${conversationId}/messages`);
    set((state) => ({
      messages: { ...state.messages, [conversationId]: data },
    }));
  },

  sendMessage: async (conversationId, content) => {
    const { data } = await api.post(`/chat/conversations/${conversationId}/messages`, { content });
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), data],
      },
    }));
  },

  addMessage: (conversationId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message],
      },
    }));
  },
}));
