import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  AppData,
  AppNotification,
  PostComment,
  StoredAlbum,
  StoredUser,
  applyUserFamily,
  avatarForName,
  createEmptyAppData,
  createFamilyForUser,
  formatTimeAgo,
  recalcFamilyStats,
  syncActiveFamily,
  uid,
} from '../lib/seedData';
import { compressImage, loadAppData, saveAppData } from '../lib/storage';
import { createDemoAppData } from '../lib/demoSeed';
import type { FamilyEvent, FamilyPost, Conversation, Message } from '../types/family';

interface FamZeeContextValue {
  data: AppData;
  user: StoredUser | null;
  isAuthenticated: boolean;
  needsOnboarding: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: (familyName: string, description?: string, coverPhoto?: string) => void;
  addMember: (name: string, role?: string) => void;
  createConversation: (memberIds: string[], groupName?: string) => string;
  createPost: (content: string, image?: string, type?: FamilyPost['type']) => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  getComments: (postId: string) => PostComment[];
  addEvent: (event: Omit<FamilyEvent, 'id' | 'attendees'>) => void;
  toggleRsvp: (eventId: string) => void;
  addAlbum: (title: string, category: StoredAlbum['category'], cover: string) => void;
  addPhotoToAlbum: (albumId: string, photoUrl: string, caption?: string) => void;
  sendMessage: (conversationId: string, content: string, image?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateProfile: (updates: Partial<Pick<StoredUser, 'name' | 'avatar'>>) => void;
  updateFamily: (updates: Partial<AppData['family']>) => void;
  deleteAccount: () => void;
  loadDemoExperience: () => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  calendarMonth: Date;
  setCalendarMonth: (date: Date) => void;
  selectedCalendarDay: number | null;
  setSelectedCalendarDay: (day: number | null) => void;
  searchConversations: (query: string) => Conversation[];
}

const FamZeeContext = createContext<FamZeeContextValue | null>(null);

function persist(data: AppData) {
  saveAppData(data);
}

function memberForUser(data: AppData, user: StoredUser) {
  return (
    data.members.find((m) => m.id === user.id) || {
      id: user.id,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      isOnline: true,
    }
  );
}

function withPersist(updater: (prev: AppData) => AppData) {
  return (prev: AppData) => {
    const next = syncActiveFamily(updater(prev));
    const withStats = {
      ...next,
      family: recalcFamilyStats(next.family, next),
    };
    persist(withStats);
    return withStats;
  };
}

export function FamZeeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(() => loadAppData());
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number | null>(null);

  const update = useCallback((updater: (prev: AppData) => AppData) => {
    setData(withPersist(updater));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const prev = loadAppData();
    const found = prev.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) {
      throw new Error('Invalid email or password');
    }
    update(() => applyUserFamily(prev, { ...found, provider: 'email' }));
  }, [update]);

  const loginWithProvider = useCallback(
    async (provider: 'google' | 'apple') => {
      await new Promise((r) => setTimeout(r, 700));
      update((prev) => {
        const existing = prev.users.find((u) => u.provider === provider);
        if (existing) {
          return applyUserFamily(prev, existing);
        }
        const name = provider === 'google' ? 'Google User' : 'Apple User';
        const newUser: StoredUser = {
          id: uid('user'),
          name,
          email: `${provider}_${Date.now()}@${provider === 'google' ? 'gmail.com' : 'icloud.com'}`,
          avatar: avatarForName(name, provider === 'google' ? '4285F4' : '000000'),
          role: 'Admin',
          provider,
        };
        const family = createFamilyForUser(newUser);
        return {
          ...prev,
          users: [...prev.users, newUser],
          user: newUser,
          userFamilies: { ...prev.userFamilies, [newUser.id]: family },
          ...family,
        };
      });
    },
    [update]
  );

  const loginWithGoogle = useCallback(() => loginWithProvider('google'), [loginWithProvider]);
  const loginWithApple = useCallback(() => loginWithProvider('apple'), [loginWithProvider]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 600));
    if (password.length < 6) throw new Error('Password must be at least 6 characters');
    const prev = loadAppData();
    if (prev.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered');
    }
    update((p) => {
      const newUser: StoredUser = {
        id: uid('user'),
        name,
        email,
        password,
        avatar: avatarForName(name),
        role: 'Admin',
        provider: 'email',
      };
      const family = createFamilyForUser(newUser);
      return {
        ...p,
        users: [...p.users, newUser],
        user: newUser,
        userFamilies: { ...p.userFamilies, [newUser.id]: family },
        ...family,
      };
    });
  }, [update]);

  const logout = useCallback(() => {
    update((prev) => ({
      ...createEmptyAppData(),
      users: prev.users,
      userFamilies: prev.userFamilies,
      user: null,
    }));
  }, [update]);

  const completeOnboarding = useCallback(
    (familyName: string, description = '', coverPhoto?: string) => {
      update((prev) => {
        if (!prev.user) return prev;
        const family = {
          ...prev.family,
          name: familyName.trim() || prev.family.name,
          description: description.trim(),
          tagline: description.trim() ? prev.family.tagline : 'Your private family circle',
          ...(coverPhoto ? { coverPhoto } : {}),
        };
        return {
          ...prev,
          family,
          onboardingComplete: true,
          user: { ...prev.user, name: prev.user.name },
        };
      });
    },
    [update]
  );

  const addMember = useCallback(
    (name: string, role = 'Member') => {
      update((prev) => {
        if (!prev.user) return prev;
        const member = {
          id: uid('member'),
          name: name.trim(),
          role,
          avatar: avatarForName(name.trim(), '8B5CF6'),
          isOnline: false,
        };
        return { ...prev, members: [...prev.members, member] };
      });
    },
    [update]
  );

  const createConversation = useCallback(
    (memberIds: string[], groupName?: string) => {
      const conversationId = uid('conv');
      update((prev) => {
        if (!prev.user) return prev;
        const selected = prev.members.filter((m) => memberIds.includes(m.id));
        if (selected.length === 0) return prev;
        const isGroup = selected.length > 1;
        const name = groupName || (isGroup ? selected.map((m) => m.name.split(' ')[0]).join(', ') : selected[0].name);
        const avatar = selected[0].avatar;
        const conv: Conversation = {
          id: conversationId,
          name,
          avatar,
          members: [prev.user.id, ...memberIds],
          lastMessage: 'Conversation started',
          lastMessageTime: 'Now',
          unread: 0,
          isGroup,
          messages: [],
        };
        return { ...prev, conversations: [conv, ...prev.conversations] };
      });
      return conversationId;
    },
    [update]
  );

  const createPost = useCallback(
    (content: string, image?: string, type: FamilyPost['type'] = 'update') => {
      update((prev) => {
        if (!prev.user) return prev;
        const author = memberForUser(prev, prev.user);
        const post: FamilyPost = {
          id: uid('post'),
          author,
          content,
          image,
          likes: 0,
          comments: 0,
          timestamp: 'Just now',
          type,
        };
        const notification: AppNotification = {
          id: uid('notif'),
          type: 'new_post',
          title: 'New post in family feed',
          body: `${author.name} shared: ${content.slice(0, 60)}${content.length > 60 ? '...' : ''}`,
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          posts: [post, ...prev.posts],
          notifications: [notification, ...prev.notifications],
        };
      });
    },
    [update]
  );

  const toggleLike = useCallback(
    (postId: string) => {
      update((prev) => {
        const liked = prev.likedPostIds.includes(postId);
        return {
          ...prev,
          likedPostIds: liked
            ? prev.likedPostIds.filter((id) => id !== postId)
            : [...prev.likedPostIds, postId],
          posts: prev.posts.map((p) =>
            p.id === postId ? { ...p, likes: Math.max(0, p.likes + (liked ? -1 : 1)) } : p
          ),
        };
      });
    },
    [update]
  );

  const addComment = useCallback(
    (postId: string, content: string) => {
      update((prev) => {
        if (!prev.user) return prev;
        const comment: PostComment = {
          id: uid('comment'),
          postId,
          authorId: prev.user.id,
          authorName: prev.user.name,
          authorAvatar: prev.user.avatar,
          content,
          createdAt: new Date().toISOString(),
        };
        const existing = prev.comments[postId] || [];
        return {
          ...prev,
          comments: { ...prev.comments, [postId]: [...existing, comment] },
          posts: prev.posts.map((p) =>
            p.id === postId ? { ...p, comments: p.comments + 1 } : p
          ),
        };
      });
    },
    [update]
  );

  const getComments = useCallback(
    (postId: string) => data.comments[postId] || [],
    [data.comments]
  );

  const addEvent = useCallback(
    (event: Omit<FamilyEvent, 'id' | 'attendees'>) => {
      update((prev) => ({
        ...prev,
        events: [{ ...event, id: uid('event'), attendees: 1 }, ...prev.events],
      }));
    },
    [update]
  );

  const toggleRsvp = useCallback(
    (eventId: string) => {
      update((prev) => {
        const rsvped = prev.rsvpEventIds.includes(eventId);
        return {
          ...prev,
          rsvpEventIds: rsvped
            ? prev.rsvpEventIds.filter((id) => id !== eventId)
            : [...prev.rsvpEventIds, eventId],
          events: prev.events.map((e) =>
            e.id === eventId
              ? { ...e, attendees: Math.max(0, e.attendees + (rsvped ? -1 : 1)) }
              : e
          ),
        };
      });
    },
    [update]
  );

  const addAlbum = useCallback(
    (title: string, category: StoredAlbum['category'], cover: string) => {
      update((prev) => ({
        ...prev,
        albums: [
          {
            id: uid('album'),
            title,
            cover,
            photoCount: 1,
            category,
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            photos: [{ id: uid('photo'), url: cover, addedAt: new Date().toISOString() }],
          },
          ...prev.albums,
        ],
      }));
    },
    [update]
  );

  const addPhotoToAlbum = useCallback(
    (albumId: string, photoUrl: string, caption?: string) => {
      update((prev) => ({
        ...prev,
        albums: prev.albums.map((a) =>
          a.id === albumId
            ? {
                ...a,
                cover: a.photos.length === 0 ? photoUrl : a.cover,
                photoCount: a.photoCount + 1,
                photos: [
                  ...a.photos,
                  { id: uid('photo'), url: photoUrl, caption, addedAt: new Date().toISOString() },
                ],
              }
            : a
        ),
      }));
    },
    [update]
  );

  const sendMessage = useCallback(
    (conversationId: string, content: string, image?: string) => {
      update((prev) => {
        if (!prev.user) return prev;
        const now = new Date();
        const msg: Message = {
          id: uid('msg'),
          senderId: prev.user.id,
          content: image ? content || 'Shared a photo' : content,
          timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: true,
          ...(image ? { imageUrl: image } : {}),
        };
        return {
          ...prev,
          conversations: prev.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: content || 'Sent a photo',
                  lastMessageTime: 'Just now',
                  unread: 0,
                  messages: [...c.messages, msg],
                }
              : c
          ),
        };
      });
    },
    [update]
  );

  const markNotificationRead = useCallback(
    (id: string) => {
      update((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === id ? { ...n, isRead: true } : n
        ),
      }));
    },
    [update]
  );

  const markAllNotificationsRead = useCallback(() => {
    update((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true })),
    }));
  }, [update]);

  const updateProfile = useCallback(
    (updates: Partial<Pick<StoredUser, 'name' | 'avatar'>>) => {
      update((prev) => {
        if (!prev.user) return prev;
        const user = { ...prev.user, ...updates };
        return {
          ...prev,
          user,
          users: prev.users.map((u) => (u.id === user.id ? user : u)),
          members: prev.members.map((m) =>
            m.id === user.id ? { ...m, name: user.name, avatar: user.avatar } : m
          ),
        };
      });
    },
    [update]
  );

  const updateFamily = useCallback(
    (updates: Partial<AppData['family']>) => {
      update((prev) => ({
        ...prev,
        family: { ...prev.family, ...updates },
      }));
    },
    [update]
  );

  const deleteAccount = useCallback(() => {
    update((prev) => {
      if (!prev.user) return prev;
      const { [prev.user.id]: _, ...restFamilies } = prev.userFamilies;
      return {
        ...createEmptyAppData(),
        users: prev.users.filter((u) => u.id !== prev.user!.id),
        userFamilies: restFamilies,
        user: null,
      };
    });
  }, [update]);

  const loadDemoExperience = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 400));
    const demo = createDemoAppData();
    setData(demo);
    persist(demo);
  }, []);

  const uploadImage = useCallback(async (file: File) => compressImage(file), []);

  const searchConversations = useCallback(
    (query: string) => {
      if (!query.trim()) return data.conversations;
      const q = query.toLowerCase();
      return data.conversations.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.lastMessage.toLowerCase().includes(q)
      );
    },
    [data.conversations]
  );

  const value = useMemo(
    () => ({
      data,
      user: data.user,
      isAuthenticated: !!data.user,
      needsOnboarding: !!data.user && !data.onboardingComplete,
      login,
      loginWithGoogle,
      loginWithApple,
      register,
      logout,
      completeOnboarding,
      addMember,
      createConversation,
      createPost,
      toggleLike,
      addComment,
      getComments,
      addEvent,
      toggleRsvp,
      addAlbum,
      addPhotoToAlbum,
      sendMessage,
      markNotificationRead,
      markAllNotificationsRead,
      updateProfile,
      updateFamily,
      deleteAccount,
      loadDemoExperience,
      uploadImage,
      calendarMonth,
      setCalendarMonth,
      selectedCalendarDay,
      setSelectedCalendarDay,
      searchConversations,
    }),
    [
      data,
      login,
      loginWithGoogle,
      loginWithApple,
      register,
      logout,
      completeOnboarding,
      addMember,
      createConversation,
      createPost,
      toggleLike,
      addComment,
      getComments,
      addEvent,
      toggleRsvp,
      addAlbum,
      addPhotoToAlbum,
      sendMessage,
      markNotificationRead,
      markAllNotificationsRead,
      updateProfile,
      updateFamily,
      deleteAccount,
      loadDemoExperience,
      uploadImage,
      calendarMonth,
      selectedCalendarDay,
      searchConversations,
    ]
  );

  return <FamZeeContext.Provider value={value}>{children}</FamZeeContext.Provider>;
}

export function useFamZee() {
  const ctx = useContext(FamZeeContext);
  if (!ctx) throw new Error('useFamZee must be used within FamZeeProvider');
  return ctx;
}

export { formatTimeAgo };
