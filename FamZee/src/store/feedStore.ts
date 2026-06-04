import { create } from 'zustand';
import api from '../services/api';
import { Post } from '../types';

interface FeedState {
  posts: Post[];
  hasMore: boolean;
  loading: boolean;
  fetchPosts: (familyId: string, refresh?: boolean) => Promise<void>;
  addPost: (post: Post) => void;
  likePost: (postId: string, isLiked: boolean) => void;
  addComment: (postId: string, comment: any) => void;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: [],
  hasMore: true,
  loading: false,
  fetchPosts: async (familyId, refresh = false) => {
    set({ loading: true });
    const offset = refresh ? 0 : get().posts.length;
    const { data } = await api.get(`/families/${familyId}/posts`, {
      params: { limit: 20, offset }
    });
    set((state) => ({
      posts: refresh ? data.posts : [...state.posts, ...data.posts],
      hasMore: data.hasMore,
      loading: false
    }));
  },
  addPost: (post) => {
    set((state) => ({ posts: [post, ...state.posts] }));
  },
  likePost: (postId, isLiked) => {
    set((state) => ({
      posts: state.posts.map(p =>
        p.id === postId
          ? { ...p, likes_count: (p.likes_count || 0) + (isLiked ? 1 : -1) }
          : p
      )
    }));
  },
  addComment: (postId, comment) => {
    set((state) => ({
      posts: state.posts.map(p =>
        p.id === postId
          ? { ...p, comments_count: (p.comments_count || 0) + 1 }
          : p
      )
    }));
  }
}));
