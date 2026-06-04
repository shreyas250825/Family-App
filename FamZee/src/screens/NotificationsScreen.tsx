import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNotificationStore } from '../store/notificationStore';

export default function NotificationsScreen() {
  const { notifications, unreadCount, fetchNotifications, markAsRead } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, []);
  
  const handleNotificationPress = async (id: string) => {
    await markAsRead(id);
  };
  
  return (
    <View style={styles.container}>
      {unreadCount > 0 && (
        <View style={styles.header}>
          <Text style={styles.headerText}>{unreadCount} unread notifications</Text>
        </View>
      )}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.notificationItem, !item.is_read && styles.unread]}
            onPress={() => handleNotificationPress(item.id)}
          >
            <Text style={styles.notificationType}>{item.type}</Text>
            <Text style={styles.notificationText}>{JSON.stringify(item.data)}</Text>
            <Text style={styles.notificationDate}>
              {new Date(item.created_at).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#F97316',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  unread: {
    backgroundColor: '#FEF3C7',
  },
  notificationType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
