import { logOut } from '@/services/authService'
import React from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'

const Index = () => {
  const handleLogout = async () => {
    try {
      await logOut()
      Alert.alert('Logged out', 'You have been logged out successfully.')
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Index

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
