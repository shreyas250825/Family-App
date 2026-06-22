import type {
  Album,
  Birthday,
  Conversation,
  FamilyEvent,
  FamilyMember,
  FamilyPost,
  FamilyProfile,
  Memory,
} from '../types/family';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: string;
  provider: 'email' | 'google' | 'apple';
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
}

export interface AlbumPhoto {
  id: string;
  url: string;
  caption?: string;
  addedAt: string;
}

export interface StoredAlbum extends Album {
  photos: AlbumPhoto[];
}

export interface AppNotification {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserFamilyData {
  family: FamilyProfile;
  members: FamilyMember[];
  posts: FamilyPost[];
  events: FamilyEvent[];
  albums: StoredAlbum[];
  conversations: Conversation[];
  memories: Memory[];
  birthdays: Birthday[];
  comments: Record<string, PostComment[]>;
  likedPostIds: string[];
  rsvpEventIds: string[];
  notifications: AppNotification[];
  onboardingComplete: boolean;
}

export interface AppData extends UserFamilyData {
  version: 2;
  user: StoredUser | null;
  users: StoredUser[];
  userFamilies: Record<string, UserFamilyData>;
}

const DEFAULT_COVER =
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=600&fit=crop';

export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function formatTimeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function avatarForName(name: string, bg = '6366f1'): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=fff&size=256`;
}

export function createEmptyFamilyFields(): UserFamilyData {
  return {
    family: {
      name: '',
      tagline: '',
      description: '',
      coverPhoto: DEFAULT_COVER,
      location: '',
      stats: { members: 0, photos: 0, events: 0, memories: 0 },
    },
    members: [],
    posts: [],
    events: [],
    albums: [],
    conversations: [],
    memories: [],
    birthdays: [],
    comments: {},
    likedPostIds: [],
    rsvpEventIds: [],
    notifications: [],
    onboardingComplete: false,
  };
}

export function createFamilyForUser(user: StoredUser): UserFamilyData {
  const member: FamilyMember = {
    id: user.id,
    name: user.name,
    role: 'Admin',
    avatar: user.avatar,
    isOnline: true,
  };
  const firstName = user.name.split(' ')[0] || user.name;
  return {
    ...createEmptyFamilyFields(),
    family: {
      name: `${firstName}'s Family`,
      tagline: 'Your private family circle',
      description: '',
      coverPhoto: DEFAULT_COVER,
      location: '',
      stats: { members: 1, photos: 0, events: 0, memories: 0 },
    },
    members: [member],
    onboardingComplete: false,
  };
}

export function createEmptyAppData(): AppData {
  return {
    version: 2,
    user: null,
    users: [],
    userFamilies: {},
    ...createEmptyFamilyFields(),
  };
}

export function extractUserFamily(data: AppData): UserFamilyData {
  return {
    family: data.family,
    members: data.members,
    posts: data.posts,
    events: data.events,
    albums: data.albums,
    conversations: data.conversations,
    memories: data.memories,
    birthdays: data.birthdays,
    comments: data.comments,
    likedPostIds: data.likedPostIds,
    rsvpEventIds: data.rsvpEventIds,
    notifications: data.notifications,
    onboardingComplete: data.onboardingComplete,
  };
}

export function applyUserFamily(data: AppData, user: StoredUser): AppData {
  const saved = data.userFamilies[user.id] || createFamilyForUser(user);
  return {
    ...data,
    user,
    ...saved,
    userFamilies: {
      ...data.userFamilies,
      [user.id]: saved,
    },
  };
}

export function syncActiveFamily(data: AppData): AppData {
  if (!data.user) return data;
  const snapshot = extractUserFamily(data);
  return {
    ...data,
    userFamilies: {
      ...data.userFamilies,
      [data.user.id]: snapshot,
    },
  };
}

export function recalcFamilyStats(family: FamilyProfile, data: UserFamilyData): FamilyProfile {
  const photoCount = data.albums.reduce((sum, a) => sum + a.photoCount, 0);
  return {
    ...family,
    stats: {
      members: data.members.length,
      photos: photoCount,
      events: data.events.length,
      memories: data.posts.length + data.memories.length,
    },
  };
}
