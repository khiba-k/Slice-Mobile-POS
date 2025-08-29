import LoadingPage from '@/components/shared/LoadingPage';
import { useAuth } from '@/lib/contexts/AuthContext';
import { styles } from '@/styles/LandingScreen.styles';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const logoImg = require("../../assets/logo.png");

const LandingScreen = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Redirect if already authenticated
    useEffect(() => {
        if (user) {
            router.replace('/onboarding');
        }
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <LoadingPage/>
            ) : (
                <>
                    <View style={styles.textView}>
                        <Image source={logoImg} style={styles.image} />
                        <Text style={styles.title}>
                            <Text style={{ color: "#FF700A" }}>Slice</Text> Mobile POS
                        </Text>
                    </View>

                    <View style={styles.buttonsView}>
                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={() => router.push("/auth/login")}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </Pressable>

                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                pressed && styles.buttonPressed,
                                { borderColor: "#FF700A" },
                                { backgroundColor: "#FF700A" },
                            ]}
                            onPress={() => router.push("/auth/signup")}
                        >
                            <Text style={[styles.buttonText, { color: "white" }]}>Register</Text>
                        </Pressable>
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}

export default LandingScreen
