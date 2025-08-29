// app/auth/login/index.tsx
import { useAuth } from '@/lib/contexts/AuthContext';
import { resetPassword, signIn } from '@/lib/services/authService';
import { useToastStore } from '@/store/useToastStore';
import { styles } from '@/styles/LoginScreen.styles';
import { validateForm } from '@/utils/LoginScreen.utils';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
const logoImg = require("../../assets/logo.png");

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [missingEmailError, setMissingEmailError] = useState('');
  const [validEmailError, setValidEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [missingPasswordError, setMissingPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToastStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.replace('/onboarding');
    }
  }, [user]);



  const handleSignIn = async () => {
    setMissingEmailError('');
    setValidEmailError('');
    setMissingPasswordError('');
    if (!validateForm(
      email,
      password,
      setMissingEmailError,
      setValidEmailError,
      setMissingPasswordError
    )) return;

    setLoading(true);
    try {
      await signIn(email.trim(), password);
      router.replace('/onboarding');
    } catch (error: any) {
      showToast(false, error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address first');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setResetLoading(true);
    try {
      await resetPassword(email.trim());
      Alert.alert(
        'Password Reset',
        'A password reset email has been sent to your email address.'
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Image source={logoImg} style={styles.logo} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          <View style={styles.inputContainer}>
            {missingEmailError && (
              <Text style={styles.errorText}>
                {missingEmailError}
              </Text>
            )}
            {validEmailError && (
              <Text style={styles.errorText}>
                {validEmailError}
              </Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            {missingPasswordError && (
              <Text style={styles.errorText}>
                {missingPasswordError}
              </Text>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPassword}
            disabled={resetLoading}
          >
            {resetLoading ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Link href="/auth/signup" style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

