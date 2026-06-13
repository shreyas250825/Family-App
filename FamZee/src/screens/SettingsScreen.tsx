import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import { useFamilyStore } from '../store/familyStore';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { COLORS, FONT_SIZES, SHADOWS, SPACING } from '../utils/constants';

export default function SettingsScreen() {
  const { user, signOut } = useAuthStore();
  const { currentFamily } = useFamilyStore();
  const { pushEnabled, updatePushSetting, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Settings" subtitle="Manage your FamZee experience" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(user?.full_name || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>{user?.full_name || 'Family Member'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
            {currentFamily ? (
              <Text style={styles.profileFamily}>👨‍👩‍👧 {currentFamily.name}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowLabel}>Push notifications</Text>
              <Text style={styles.rowHint}>Birthdays, posts, and messages</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={updatePushSetting}
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor={pushEnabled ? COLORS.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Button title="Sign Out" variant="danger" onPress={signOut} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.md, paddingBottom: SPACING['2xl'] },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  avatarText: { color: '#fff', fontSize: FONT_SIZES['2xl'], fontWeight: '800' },
  profileName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  profileEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  profileFamily: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    marginTop: 6,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '800',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  rowHint: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,
  },
});
