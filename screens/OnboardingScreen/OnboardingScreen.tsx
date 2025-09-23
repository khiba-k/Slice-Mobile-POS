import LoadingPage from '@/components/shared/LoadingPage';
import { useAuth } from '@/lib/contexts/AuthContext';
import { getUser } from '@/lib/requests/user.requests';
import { useUserStore } from '@/store/useUserStore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingForm from './OnboardingForm';
;


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
                    if (userProfile) {
                        const { store, ...userData } = userProfile.data;
                        useUserStore.getState().setUserAndStore(userData, store);
                        setIsLoading(false);
                        router.push('/(slice)/pos/(tabs)/sales');
                    }
                    setIsLoading(false);
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
