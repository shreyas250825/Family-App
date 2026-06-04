import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useChatStore } from '../store/chatStore';

export default function ChatListScreen({ navigation }: any) {
  const { conversations, fetchConversations } = useChatStore();
  
  useEffect(() => {
    fetchConversations();
  }, []);
  
  const handleChatPress = (conversationId: string) => {
    navigation.navigate('ChatRoom', { conversationId });
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => handleChatPress(item.id)}
          >
            <Text style={styles.chatName}>{item.name || 'Family Chat'}</Text>
            <Text style={styles.chatDate}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations yet</Text>
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
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  chatDate: {
    fontSize: 12,
    color: '#6B7280',
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
