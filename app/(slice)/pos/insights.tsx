import { logOut } from '@/lib/services/authService'
import { useUserStore } from '@/store/useUserStore';
import React from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { useToastStore } from "@/store/useToastStore";


const index = () => {
  const { email, profile, clearUser } = useUserStore();
  const { showToast } = useToastStore();
  const handleLogout = async () => {
    try {
      await logOut()
      showToast(true, "Logged Out");
      clearUser();
    } catch (error: any) {
      console.log("Logout Error: ", error);
      showToast(false, 'Logout Failed');
    }
  }

  return (
    <View>
      <Text>Welcome {profile?.firstName}!</Text>
      <Text>Email: {email}</Text>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 20
  }
})