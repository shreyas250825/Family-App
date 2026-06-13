export const COLORS = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#8B5CF6',
  accent: '#F59E0B',
  background: '#F8FAFF',
  surface: '#FFFFFF',
  surfaceMuted: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  success: '#10B981',
  danger: '#EF4444',
  border: '#E2E8F0',
  unread: '#EEF2FF',
  gradientStart: '#4F46E5',
  gradientEnd: '#8B5CF6',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
};

export const SHADOWS = {
  card: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  soft: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const NOTIFICATION_LABELS: Record<string, string> = {
  new_post: 'New family post',
  new_comment: 'New comment',
  new_like: 'Someone liked your post',
  new_message: 'New message',
  family_invite: 'Family invitation',
  birthday: 'Upcoming birthday',
  event: 'Family event',
};
