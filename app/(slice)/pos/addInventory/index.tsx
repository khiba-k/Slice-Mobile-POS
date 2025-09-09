import { ItemTypeDepartmentNamePair } from '@/lib/requests/inventory.requests'
import AddInventoryScreen from '@/screens/AddInventoryScreen/AddInventoryScreen'
import { useUserStore } from '@/store/useUserStore'
import { getItemTypesDepartmentPairs } from '@/utils/AddInventoryScreen.utils'
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const [departments, setDepartments] = useState<ItemTypeDepartmentNamePair[]>([]);
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  
  

  const { store } = useUserStore();

  useFocusEffect(
    useCallback(() => {
      getItemTypesDepartmentPairs(
        {
          store: store,
          setDepartments: setDepartments,
          setItemTypes: setItemTypes
        }
      )
      setItemTypes([])
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <AddInventoryScreen
        departments={departments}
        itemTypes={itemTypes}
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
