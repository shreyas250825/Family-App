
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { COLORS, FONT_SIZES } from '../utils/constants';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  style?: ViewStyle;
export default function Button({
  title,
  onPress,
  loading,
  disabled,
  variant = 'primary',
  style,
}: ButtonProps) {
        styles[variant],
        (disabled || loading) && styles.disabled,
        style,
      activeOpacity={0.85}
        <ActivityIndicator color={variant === 'outline' ? COLORS.primary : '#fff'} />
        <Text style={[styles.buttonText, variant === 'outline' && styles.outlineText]}>{title}</Text>
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.secondary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  danger: { backgroundColor: COLORS.danger },
  disabled: { opacity: 0.55 },
    color: '#fff',
    fontWeight: '700',
    fontSize: FONT_SIZES.md,
  outlineText: { color: COLORS.primary },