// (slice)/ pos/editInventory
import EditInventoryScreen from '@/screens/EditInventoryScreen/EditInventoryScreen'
import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {

    return (
        <SafeAreaView style={styles.container}>
            <EditInventoryScreen
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
