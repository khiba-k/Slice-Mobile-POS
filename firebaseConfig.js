// Import Firebase functions
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Your Firebase config object (paste yours here)
const firebaseConfig = {
    apiKey: "AIzaSyCnbKweqcxGFRDM-jTwttzcGCB46S6O7Io",
    authDomain: "slice-mobile-pos.firebaseapp.com",
    projectId: "slice-mobile-pos",
    storageBucket: "slice-mobile-pos.firebasestorage.app",
    messagingSenderId: "863345896560",
    appId: "1:863345896560:web:b853db3108181af59d58b5",
    measurementId: "G-ZL1F18M0J2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default app;