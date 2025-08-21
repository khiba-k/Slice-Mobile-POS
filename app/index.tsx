import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const logoImg = require("../assets/logo.png");

const index = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
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
    );

}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFAF7",
    },
    textView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "75%",
        width: "100%",
    },
    image: {
        width: 150,
        height: 150,
    },
    buttonsView: {
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "25%",
        width: "100%",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "purple",
    },
    button: {
        borderWidth: 3,
        borderRadius: 8,
        borderColor: "#FF700A",
        marginVertical: 10,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#FF700A",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
    },
});