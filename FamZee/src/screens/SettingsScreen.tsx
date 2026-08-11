import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useFamilyStore } from '../store/familyStore';
import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { COLORS, FONT_SIZES, SHADOWS, SPACING } from '../utils/constants';

export default function SettingsScreen() {
  const { user, signOut } = useAuthStore();
  const { currentFamily } = useFamilyStore();

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
            <View style={{ flex: 1, marginRight: SPACING.md }}>
              <Text style={styles.rowLabel}>Push notifications</Text>
              <Text style={styles.rowHint}>Coming soon — birthdays, posts, and messages</Text>
            </View>
            <Switch
              value={false}
              disabled
              trackColor={{ false: COLORS.border, true: COLORS.primaryLight }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Button title="Sign Out" variant="danger" onPress={signOut} />
        </View>
      </ScrollView>
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
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
    fontSize: FONT_SIZES.sm,
    fontWeight: '800',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: SPACING.md,
  row: {
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
  rowHint: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textMuted,
    marginTop: 2,