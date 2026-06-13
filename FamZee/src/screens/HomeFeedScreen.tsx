import React, { useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import PostCard from '../components/PostCard';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import FamilySetupScreen from './FamilySetupScreen';
import { useFeedStore } from '../store/feedStore';
import { useFamilyStore } from '../store/familyStore';
import { COLORS, SPACING } from '../utils/constants';

export default function HomeFeedScreen() {
  const { currentFamilyId, currentFamily, families, loading: familyLoading } = useFamilyStore();
  const { posts, loading, error, fetchPosts, toggleLike } = useFeedStore();

  useEffect(() => {
    if (currentFamilyId) fetchPosts(currentFamilyId, true);
  }, [currentFamilyId]);

  const onRefresh = useCallback(() => {
    if (currentFamilyId) fetchPosts(currentFamilyId, true);
  }, [currentFamilyId]);

  if (familyLoading && families.length === 0) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!currentFamilyId) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="FamZee" subtitle="Your family feed" />
        <FamilySetupScreen />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={currentFamily?.name || 'Family Feed'}
        subtitle={`${posts.length} recent updates`}
      />

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={(id) => toggleLike(id).catch(() => undefined)} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading && posts.length > 0} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
        onEndReached={() => {
          if (currentFamilyId && !loading) fetchPosts(currentFamilyId);
        }}
        onEndReachedThreshold={0.4}
        contentContainerStyle={posts.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
          ) : (
            <EmptyState
              emoji="📸"
              title="No posts yet"
              description="Be the first to share a memory with your family."
            />
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loaderWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  loader: { marginTop: SPACING.xl },
  emptyList: { flexGrow: 1 },
  errorBanner: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  errorText: { color: COLORS.danger, fontSize: 13 },
});
