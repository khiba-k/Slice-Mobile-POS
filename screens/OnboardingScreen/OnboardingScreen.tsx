import LoadingPage from '@/components/shared/LoadingPage';
;
import { useAuth } from '@/lib/contexts/AuthContext';
import { getUser } from '@/lib/requests/user.requests';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingForm from './OnboardingForm';
import { useUserStore } from '@/store/useUserStore';


const OnboardingScreen = () => {
    const { user, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(loading);
    const router = useRouter();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setIsLoading(true);
                if (user) {
                    console.log('Authenticated User:', user);
                    const userProfile = await getUser(user.uid);
                    console.log('User Profile:', userProfile);
                    if (userProfile) {
                        useUserStore.getState().setUserAndStore(userProfile.data.user, userProfile.data.store);
                        setIsLoading(false);
                        router.push('/(slice)/pos');
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
