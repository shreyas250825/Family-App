import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useFamilyStore } from '../store/familyStore';
import { getApiErrorMessage } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { COLORS, FONT_SIZES, SPACING } from '../utils/constants';

export default function FamilySetupScreen() {
  const { createFamily, joinFamily } = useFamilyStore();
  const [mode, setMode] = useState<'choose' | 'create' | 'join'>('choose');
  const [familyName, setFamilyName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!familyName.trim()) {
      Alert.alert('Family name required', 'Enter a name for your family circle.');
      return;
    }
    setLoading(true);
    try {
      await createFamily(familyName.trim());
    } catch (error) {
      Alert.alert('Could not create family', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!inviteCode.trim()) {
      Alert.alert('Invite code required', 'Enter the invite code shared by your family admin.');
      return;
    }
    setLoading(true);
    try {
      await joinFamily(inviteCode.trim());
    } catch (error) {
      Alert.alert('Could not join family', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.emoji}>👨‍👩‍👧‍👦</Text>
        <Text style={styles.title}>Set up your family circle</Text>
        <Text style={styles.subtitle}>
          Create a new family or join one with an invite code to start sharing memories.
        </Text>

        {mode === 'choose' && (
          <View style={styles.actions}>
            <Button title="Create Family" onPress={() => setMode('create')} />
            <Button title="Join with Invite Code" variant="outline" onPress={() => setMode('join')} />
          </View>
        )}

        {mode === 'create' && (
          <View style={styles.form}>
            <Input
              label="Family name"
              placeholder="The Salian Family"
              value={familyName}
              onChangeText={setFamilyName}
            />
            <Button title="Create Family" onPress={handleCreate} loading={loading} />
            <Button title="Back" variant="outline" onPress={() => setMode('choose')} />
          </View>
        )}

        {mode === 'join' && (
          <View style={styles.form}>
            <Input
              label="Invite code"
              placeholder="ABC123"
              value={inviteCode}
              onChangeText={setInviteCode}
              autoCapitalize="characters"
            />
            <Button title="Join Family" onPress={handleJoin} loading={loading} />
            <Button title="Back" variant="outline" onPress={() => setMode('choose')} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flexGrow: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  emoji: { fontSize: 56, textAlign: 'center', marginBottom: SPACING.md },
  title: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  actions: { gap: SPACING.sm },
  form: { gap: SPACING.sm },
});
