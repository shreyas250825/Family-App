
import { COLORS, FONT_SIZES, SHADOWS, SPACING } from '../utils/constants';
  onLike?: (postId: string) => void;
export default function PostCard({ post, onLike }: PostCardProps) {
  const initials = (post.author?.full_name || 'U').charAt(0).toUpperCase();

        {post.author?.avatar_url ? (
          <Image source={{ uri: post.author.avatar_url }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        )}
        <View style={styles.headerText}>
          <Text style={styles.authorName}>{post.author?.full_name || 'Family Member'}</Text>
          <Text style={styles.timestamp}>
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>



        <TouchableOpacity style={styles.actionButton} onPress={() => onLike?.(post.id)}>
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: SPACING.sm,
  },
  avatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: FONT_SIZES.lg },
  headerText: { flex: 1 },
    fontWeight: '700',
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
    lineHeight: 24,
    marginBottom: SPACING.sm,
  mediaContainer: { marginBottom: SPACING.sm },
    height: 220,
    borderRadius: 16,
    marginBottom: SPACING.sm,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  actionButton: { marginRight: SPACING.lg },
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',