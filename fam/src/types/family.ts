export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline?: boolean;
  birthday?: string;
}

export interface FamilyPost {
  id: string;
  author: FamilyMember;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: 'photo' | 'update' | 'milestone';
}

export interface FamilyEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  type: 'birthday' | 'anniversary' | 'gathering' | 'holiday';
  attendees: number;
  image?: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
  photoCount: number;
  category: 'vacation' | 'wedding' | 'birthday' | 'general';
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  members: string[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  isGroup: boolean;
  messages: Message[];
}

export interface Memory {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string;
}

export interface Birthday {
  id: string;
  memberId: string;
  name: string;
  date: string;
  daysUntil?: number;
}

export interface FamilyProfile {
  name: string;
  tagline: string;
  description: string;
  coverPhoto: string;
  location: string;
  stats: {
    members: number;
    photos: number;
    events: number;
    memories: number;
  };
}
