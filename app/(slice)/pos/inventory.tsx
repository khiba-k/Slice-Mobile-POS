import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InventoryScreen from '@/screens/InventoryScreen/InventoryScreen'

const index = () => {
  return (
    <View style={styles.container}>
      <InventoryScreen/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAF7",
  }
})