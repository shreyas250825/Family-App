import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNotificationStore } from '../store/notificationStore';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import { COLORS, FONT_SIZES, NOTIFICATION_LABELS, SHADOWS, SPACING } from '../utils/constants';

function formatNotificationBody(type: string, data: any): string {
  if (typeof data === 'string') return data;
  if (data?.message) return data.message;
  if (data?.content) return data.content;
  if (data?.title) return data.title;
  return NOTIFICATION_LABELS[type] || 'You have a new update';
}

export default function NotificationsScreen() {
  const { notifications, unreadCount, loading, fetchNotifications, markAsRead, markAllAsRead } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        right={
          unreadCount > 0 ? (
            <TouchableOpacity onPress={markAllAsRead}>
              <Text style={styles.markAll}>Mark all read</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      {loading && notifications.length === 0 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.notificationItem, !item.is_read && styles.unread]}
              onPress={() => markAsRead(item.id)}
            >
              <View style={styles.iconWrap}>
                <Text style={styles.icon}>🔔</Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.notificationType}>
                  {NOTIFICATION_LABELS[item.type] || item.type}
                </Text>
                <Text style={styles.notificationText} numberOfLines={2}>
                  {formatNotificationBody(item.type, item.data)}
                </Text>
                <Text style={styles.notificationDate}>
                  {new Date(item.created_at).toLocaleString()}
                </Text>
              </View>
              {!item.is_read && <View style={styles.dot} />}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <EmptyState
              emoji="✨"
              title="No notifications"
              description="Birthdays, posts, and family updates will show up here."
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loader: { marginTop: SPACING.xl },
  markAll: { color: COLORS.primary, fontWeight: '700', fontSize: FONT_SIZES.sm },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  unread: { backgroundColor: COLORS.unread, borderColor: '#C7D2FE' },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  icon: { fontSize: 18 },
  content: { flex: 1 },
  notificationType: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  notificationText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginLeft: SPACING.sm,
  },
});
