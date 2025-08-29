import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SalesScreen from '@/screens/SalesScreen/SalesScreen'

const index = () => {
  return (
    <View style={styles.container}>
      <SalesScreen />
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