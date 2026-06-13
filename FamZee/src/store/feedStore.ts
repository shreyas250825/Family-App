import { create } from 'zustand';
import api from '../services/api';
import { Post } from '../types';

interface FeedState {
  posts: Post[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  fetchPosts: (familyId: string, refresh?: boolean) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  addPost: (post: Post) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  hasMore: true,
  loading: false,
  error: null,

  fetchPosts: async (familyId, refresh = false) => {
    if (!refresh && !get().hasMore && get().posts.length > 0) return;
    set({ loading: true, error: null });
    try {
      const offset = refresh ? 0 : get().posts.length;
      const { data } = await api.get(`/posts/families/${familyId}/posts`, {
        params: { limit: 20, offset },
      });
      set((state) => ({
        posts: refresh ? data.posts : [...state.posts, ...data.posts],
        hasMore: data.hasMore,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load feed',
      });
    }
  },

  toggleLike: async (postId) => {
    await api.post(`/likes/posts/${postId}/likes`);
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, likes_count: Math.max(0, (p.likes_count || 0) + 1) }
          : p
      ),
    }));
  },

  addPost: (post) => {
    set((state) => ({ posts: [post, ...state.posts] }));
  },
}));
