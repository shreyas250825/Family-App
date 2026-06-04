import { create } from 'zustand';
import api from '../services/api';
import { Message, Conversation } from '../types';

interface ChatState {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  fetchConversations: () => Promise<void>;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  addMessage: (conversationId: string, message: Message) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  messages: {},
  activeConversationId: null,
  fetchConversations: async () => {
    const { data } = await api.get('/conversations');
    set({ conversations: data });
  },
  fetchMessages: async (conversationId) => {
    const { data } = await api.get(`/conversations/${conversationId}/messages`);
    set((state) => ({
      messages: { ...state.messages, [conversationId]: data }
    }));
  },
  sendMessage: async (conversationId, content) => {
    const { data } = await api.post(`/conversations/${conversationId}/messages`, { content });
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), data]
      }
    }));
  },
  addMessage: (conversationId, message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), message]
      }
    }));
  }
}));
