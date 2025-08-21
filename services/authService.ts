// services/authService.ts
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export interface AuthError {
    code: string;
    message: string;
}

// Sign up with email and password
export const signUp = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        throw {
            code: error.code,
            message: getErrorMessage(error.code)
        } as AuthError;
    }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        throw {
            code: error.code,
            message: getErrorMessage(error.code)
        } as AuthError;
    }
};

// Sign out
export const logOut = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error: any) {
        throw {
            code: error.code,
            message: getErrorMessage(error.code)
        } as AuthError;
    }
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        throw {
            code: error.code,
            message: getErrorMessage(error.code)
        } as AuthError;
    }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// Helper function to get user-friendly error messages
const getErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/user-not-found':
            return 'User email not found';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/email-already-in-use':
            return 'Email already exists.';
        case 'auth/weak-password':
            return 'Password should be at least 6 characters.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/network-request-failed':
            return 'Network error. Please check your internet connection.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        default:
            return 'An error occurred. Please try again.';
    }
};