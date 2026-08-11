
  creating: boolean;
  error: string | null;
  createPost: (familyId: string, content: string) => Promise<Post | null>;
  toggleLike: (postId: string) => Promise<void>;
  creating: false,
  error: null,

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

  createPost: async (familyId, content) => {
    if (!content.trim()) return null;
    set({ creating: true, error: null });
    try {
      const formData = new FormData();
      formData.append('content', content.trim());
      const { data } = await api.post(`/posts/families/${familyId}/posts`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const post = data.post as Post;
      set((state) => ({
        posts: [post, ...state.posts],
        creating: false,
      }));
      return post;
    } catch (error) {
      set({
        creating: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      });
      return null;
    }
  },

  toggleLike: async (postId) => {
    await api.post(`/likes/posts/${postId}/likes`);
      posts: state.posts.map((p) =>
          ? { ...p, likes_count: Math.max(0, (p.likes_count || 0) + 1) }
      ),

  addPost: (post) => {
    set((state) => ({ posts: [post, ...state.posts] }));
  },