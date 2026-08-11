import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import EmptyState from '../components/EmptyState';
import CreatePostModal from '../components/CreatePostModal';
import FamilySetupScreen from './FamilySetupScreen';
import { COLORS, SPACING } from '../utils/constants';
  const { currentFamilyId, currentFamily, families, loading: familyLoading } = useFamilyStore();
  const { posts, loading, creating, error, fetchPosts, createPost, toggleLike } = useFeedStore();
  const [composerOpen, setComposerOpen] = useState(false);

    if (currentFamilyId) fetchPosts(currentFamilyId, true);
  }, [currentFamilyId]);

  const onRefresh = useCallback(() => {
    if (currentFamilyId) fetchPosts(currentFamilyId, true);

  const handleCreatePost = async (content: string) => {
    if (!currentFamilyId) return false;
    const post = await createPost(currentFamilyId, content);
    return !!post;
  };

  if (familyLoading && families.length === 0) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

        <ScreenHeader title="FamZee" subtitle="Your family feed" />
        <FamilySetupScreen />

      <ScreenHeader
        title={currentFamily?.name || 'Family Feed'}
        subtitle={`${posts.length} recent updates`}
      />

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={(id) => toggleLike(id).catch(() => undefined)} />
        )}
        refreshControl={
          <RefreshControl refreshing={loading && posts.length > 0} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
          if (currentFamilyId && !loading) fetchPosts(currentFamilyId);
        onEndReachedThreshold={0.4}
        contentContainerStyle={posts.length === 0 ? styles.emptyList : { paddingBottom: 88 }}
          loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
          ) : (
            <EmptyState
              emoji="📸"
              title="No posts yet"
              description="Tap + to share your first memory with your family."
            />
          )
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setComposerOpen(true)}
        accessibilityLabel="Create post"
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <CreatePostModal
        visible={composerOpen}
        onClose={() => setComposerOpen(false)}
        onSubmit={handleCreatePost}
        loading={creating}
  container: { flex: 1, backgroundColor: COLORS.background },
  loaderWrap: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loader: { marginTop: SPACING.xl },
  emptyList: { flexGrow: 1, paddingBottom: 88 },
  errorBanner: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  errorText: { color: COLORS.danger, fontSize: 13 },
  fab: {
    position: 'absolute',
    right: SPACING.lg,
    bottom: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  fabText: { color: '#fff', fontSize: 28, fontWeight: '300', marginTop: -2 },