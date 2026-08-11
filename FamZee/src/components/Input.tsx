
import { TextInput, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_SIZES } from '../utils/constants';
  label?: string;
export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize = 'sentences',
}: InputProps) {
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
        placeholderTextColor={COLORS.textMuted}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  wrap: { marginBottom: 14 },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  inputError: { borderColor: COLORS.danger },
    color: COLORS.danger,
    fontSize: FONT_SIZES.xs,
    marginTop: 6,