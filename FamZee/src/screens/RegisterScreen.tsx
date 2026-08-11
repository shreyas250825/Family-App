
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import api, { getApiErrorMessage } from '../services/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { COLORS, FONT_SIZES, SPACING } from '../utils/constants';
  const signIn = useAuthStore((s) => s.signIn);
  const [loading, setLoading] = useState(false);
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    setLoading(true);
      await api.post('/auth/register', {
        email: email.trim(),
        password,
        full_name: fullName.trim(),
      });
      await signIn(email.trim(), password);
    } catch (error) {
      Alert.alert('Registration failed', getApiErrorMessage(error));
    } finally {
      setLoading(false);
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.logo}>✨</Text>
          <Text style={styles.title}>Join FamZee</Text>
          <Text style={styles.subtitle}>Create your account and connect your family</Text>
        </View>

        <View style={styles.card}>
          <Input label="Full name" placeholder="Your name" value={fullName} onChangeText={setFullName} />
          <Input
            label="Email"
            placeholder="you@email.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button title="Create Account" onPress={handleRegister} loading={loading} />

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
            <Text style={styles.linkText}>
              Already have an account? <Text style={styles.linkBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  flex: { flex: 1, backgroundColor: COLORS.background },
    flexGrow: 1,
    padding: SPACING.lg,
  hero: { alignItems: 'center', marginBottom: SPACING.xl },
  logo: { fontSize: 48, marginBottom: SPACING.sm },
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: SPACING.lg,
    borderColor: COLORS.border,
  },
  link: { marginTop: SPACING.lg, alignItems: 'center' },
  linkText: { color: COLORS.textSecondary, fontSize: FONT_SIZES.sm },
  linkBold: { color: COLORS.primary, fontWeight: '700' },