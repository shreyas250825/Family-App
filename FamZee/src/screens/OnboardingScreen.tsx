
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { COLORS, FONT_SIZES, SPACING } from '../utils/constants';
const SLIDES = [
  {
    emoji: '👨‍👩‍👧‍👦',
    title: 'Connect with Family',
    description: 'Share memories, photos, and milestones with the people who matter most.',
  },
  {
    emoji: '🔒',
    title: 'Private & Secure',
    description: 'Your family circle stays private — only invited members can join.',
  },
  {
    emoji: '💬',
    title: 'Stay in Touch',
    description: 'Chat, celebrate birthdays, and never miss a family moment again.',
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;
    if (isLast) {
      navigation.navigate('Login');
    } else {
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

        <View style={styles.emojiWrap}>
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>

        <View style={styles.dots}>
          {SLIDES.map((_, index) => (
            <View key={index} style={[styles.dot, index === currentIndex && styles.dotActive]} />
          ))}
        </View>

        <Button
          title={isLast ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          style={styles.cta}
        />
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  skip: {
    alignSelf: 'flex-end',
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.sm,
  },
  skipText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  emojiWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emoji: { fontSize: 56 },
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '800',
    marginBottom: SPACING.sm,
    color: COLORS.textPrimary,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
    paddingHorizontal: SPACING.md,
  dots: {
    gap: 8,
    marginTop: SPACING.xl,
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary,
  footer: { paddingTop: SPACING.md },
  cta: { width: '100%' },