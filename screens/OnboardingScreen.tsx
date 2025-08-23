import LoadingPage from '@/components/reusable/LoadingPage';
import OnboardingForm from '@/components/sub/OnboardingScreen/OnboardingForm';
import { useAuth } from '@/contexts/AuthContext';
import { getUser } from '@/requests/user.requests';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const OnboardingScreen = () => {
    const { user, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(loading);
    const router = useRouter();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setIsLoading(true);
                if (user) {
                    const userProfile = await getUser(user.uid);
                    console.log('User Profile:', userProfile);
                    setIsLoading(false);
                    router.push('/pos');
                }
            } catch (error) {
                setIsLoading(false);
            }
        }

        getUserProfile();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (<LoadingPage />) :
                (
                        <OnboardingForm />
                )}
        </SafeAreaView>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFAF7",
    }
})
