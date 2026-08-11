import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Button from './Button';
import { COLORS, FONT_SIZES, SPACING } from '../utils/constants';

interface CreatePostModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (content: string) => Promise<boolean>;
  loading?: boolean;
}

export default function CreatePostModal({ visible, onClose, onSubmit, loading }: CreatePostModalProps) {
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      Alert.alert('Empty post', 'Write something to share with your family.');
      return;
    }
    const ok = await onSubmit(content.trim());
    if (ok) {
      setContent('');
      onClose();
    }
  };

  const handleClose = () => {
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>Create post</Text>
          <Text style={styles.subtitle}>Share an update with your family</Text>
          <TextInput
            style={styles.input}
            placeholder="What's happening in your family?"
            placeholderTextColor={COLORS.textSecondary}
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={2000}
            autoFocus
          />
          <View style={styles.actions}>
            <Button title="Cancel" variant="secondary" onPress={handleClose} style={styles.btn} />
            <Button
              title={loading ? 'Posting...' : 'Post'}
              onPress={handleSubmit}
              disabled={loading || !content.trim()}
              style={styles.btn}
            />
          </View>
          {loading ? <ActivityIndicator color={COLORS.primary} style={styles.loader} /> : null}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  input: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    textAlignVertical: 'top',
    backgroundColor: COLORS.background,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  btn: { flex: 1 },
  loader: { marginTop: SPACING.sm },
});
