import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PostCard from '../components/PostCard';
import { useFeedStore } from '../store/feedStore';
import { useFamilyStore } from '../store/familyStore';

export default function HomeFeedScreen() {
  const { currentFamilyId } = useFamilyStore();
  const { posts, loading, fetchPosts } = useFeedStore();
  
  useEffect(() => {
    if (currentFamilyId) fetchPosts(currentFamilyId);
  }, [currentFamilyId]);
  
  if (loading && posts.length === 0) return <ActivityIndicator size="large" style={styles.loader} />;
  
  if (!currentFamilyId) {
    return (
      <View style={styles.container}>
        <Text style={styles.noFamilyText}>No family selected</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={() => {
          if (currentFamilyId) fetchPosts(currentFamilyId);
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts yet</Text>
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
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  noFamilyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
    marginTop: 20,
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
