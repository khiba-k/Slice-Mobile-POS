import LoginScreen from '@/screens/LoginScreen'
import { useRouter } from 'expo-router'
import React from 'react'

const index = () => {
  const router = useRouter();

  const handleSkipToOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <>
      <LoginScreen />
    </>
  )
}

export default index
