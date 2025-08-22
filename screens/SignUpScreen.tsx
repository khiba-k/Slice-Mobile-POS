// app/auth/signup/index.tsx
import { useAuth } from '@/contexts/AuthContext';
import { signUp } from '@/services/authService';
import { useToastStore } from '@/store/useToastStore';
import { validateForm } from '@/utils/SignUpScreen.utils';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from '../styles/SignUpScreen.styles';
const logoImg = require("../assets/logo.png");

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [missingEmailError, setMissingEmailError] = useState('');
  const [validEmailError, setValidEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [missingPasswordError, setMissingPasswordError] = useState('');
  const [passwordLengthError, setPasswordLengthError] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToastStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.replace('/onboarding');
    }
  }, [user]);



  const handleSignUp = async () => {
    setMissingEmailError('');
    setValidEmailError('');
    setMissingPasswordError('');
    setPasswordLengthError('');
    setPasswordMismatchError('');
    if (!validateForm(
      email,
      password,
      confirmPassword,
      setMissingEmailError,
      setValidEmailError,
      setMissingPasswordError,
      setPasswordLengthError,
      setPasswordMismatchError
    )) return;

    setLoading(true);
    try {
      await signUp(email.trim(), password);
      showToast(true, 'Account created successfully!');
      router.replace('/onboarding');
    } catch (error: any) {
      showToast(false, error.message);
    } finally {
      setLoading(false);
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

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
            {passwordLengthError && (
              <Text style={styles.errorText}>
                {passwordLengthError}
              </Text>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          <View style={styles.inputContainer}>
            {passwordMismatchError && (
              <Text style={styles.errorText}>
                {passwordMismatchError}
              </Text>
            )}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password-new"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.signupButton, loading && styles.disabledButton]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/auth/login" style={styles.loginLink}>
              <Text style={styles.loginLinkText}>Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

