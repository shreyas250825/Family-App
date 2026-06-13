import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useChatStore } from '../store/chatStore';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import { COLORS, FONT_SIZES, SHADOWS, SPACING } from '../utils/constants';

export default function ChatListScreen({ navigation }: any) {
  const { conversations, loading, error, fetchConversations } = useChatStore();

  useEffect(() => {
    fetchConversations();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Messages" subtitle="Stay connected with family" />

      {loading && conversations.length === 0 ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate('ChatRoom', {
                  conversationId: item.id,
                  title: item.name || 'Family Chat',
                })
              }
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>💬</Text>
              </View>
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{item.name || 'Family Chat'}</Text>
                <Text style={styles.chatMeta}>
                  {item.is_group ? 'Group conversation' : 'Direct message'}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <EmptyState
              emoji="💬"
              title="No conversations yet"
              description={error || 'Family chats will appear here once your circle is active.'}
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
  chatItem: {
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
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.unread,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: { fontSize: 22 },
  chatContent: { flex: 1 },
  chatName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  chatMeta: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  chevron: {
    fontSize: 24,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
});
