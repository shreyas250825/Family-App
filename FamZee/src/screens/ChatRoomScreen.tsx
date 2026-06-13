import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import { COLORS, FONT_SIZES, SPACING } from '../utils/constants';

export default function ChatRoomScreen({ route }: any) {
  const { conversationId, title } = route.params;
  const user = useAuthStore((s) => s.user);
  const { messages, fetchMessages, sendMessage } = useChatStore();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const thread = messages[conversationId] || [];

  useEffect(() => {
    fetchMessages(conversationId);
  }, [conversationId]);

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await sendMessage(conversationId, text.trim());
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={thread}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isMe = item.sender_id === user?.id;
          return (
            <View style={[styles.bubbleRow, isMe && styles.bubbleRowMe]}>
              <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                {!isMe && item.sender?.full_name ? (
                  <Text style={styles.senderName}>{item.sender.full_name}</Text>
                ) : null}
                <Text style={[styles.messageText, isMe && styles.messageTextMe]}>{item.content}</Text>
                <Text style={[styles.time, isMe && styles.timeMe]}>
                  {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Say hello to {title || 'your family'} 👋</Text>
          </View>
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={COLORS.textMuted}
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !text.trim() && styles.sendDisabled]}
          onPress={handleSend}
          disabled={!text.trim() || sending}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md, flexGrow: 1 },
  bubbleRow: { marginBottom: SPACING.sm, alignItems: 'flex-start' },
  bubbleRowMe: { alignItems: 'flex-end' },
  bubble: {
    maxWidth: '80%',
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bubbleMe: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  bubbleOther: { backgroundColor: COLORS.surface },
  senderName: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.secondary,
    fontWeight: '700',
    marginBottom: 4,
  },
  messageText: { fontSize: FONT_SIZES.md, color: COLORS.textPrimary, lineHeight: 22 },
  messageTextMe: { color: '#fff' },
  time: { fontSize: 10, color: COLORS.textMuted, marginTop: 6, alignSelf: 'flex-end' },
  timeMe: { color: 'rgba(255,255,255,0.75)' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  emptyText: { color: COLORS.textSecondary, fontSize: FONT_SIZES.md },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.background,
    color: COLORS.textPrimary,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  sendDisabled: { opacity: 0.45 },
  sendText: { color: '#fff', fontWeight: '700' },
});
