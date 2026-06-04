export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  birthday?: string;
  relationship?: string;
  created_at: string;
  last_active_at?: string;
}

export interface Family {
  id: string;
  name: string;
  invite_code: string;
  cover_photo_url?: string;
  is_public_feed: boolean;
  created_by: string;
  created_at: string;
}

export interface FamilyMember {
  id: string;
  family_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  user?: User;
}

export interface Post {
  id: string;
  family_id: string;
  author_id: string;
  content: string;
  type: string;
  created_at: string;
  updated_at: string;
  author?: User;
  media_urls?: string[];
  comments_count?: number;
  likes_count?: number;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: User;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at?: string;
  created_at: string;
  sender?: User;
}

export interface Conversation {
  id: string;
  family_id: string;
  is_group: boolean;
  name?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  data: any;
  is_read: boolean;
  created_at: string;
}
