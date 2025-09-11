import AddInventoryScreen from '@/screens/AddInventoryScreen/AddInventoryScreen'
import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  
  
  

  const { store } = useUserStore();

  return (
    <SafeAreaView style={styles.container}>
      <AddInventoryScreen
      />
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
