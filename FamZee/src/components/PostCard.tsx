import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.authorName}>{post.author?.full_name || 'Unknown'}</Text>
        <Text style={styles.timestamp}>
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      {post.media_urls && post.media_urls.length > 0 && (
        <View style={styles.mediaContainer}>
          {post.media_urls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.media} />
          ))}
        </View>
      )}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>❤️ {post.likes_count || 0}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 {post.comments_count || 0}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111827',
  },
  timestamp: {
    fontSize: 12,
    color: '#6B7280',
  },
  content: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  mediaContainer: {
    marginBottom: 8,
  },
  media: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  actionButton: {
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
  },
});
