import FabMenu from '@/components/shared/FabMenu';
import { getInventory, InventoryItem } from '@/lib/requests/inventory.requests';
import InventoryScreen from '@/screens/InventoryScreen/InventoryScreen';
import { useUserStore } from '@/store/useUserStore';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Inventory = () => {
  const [searchText, setSearchText] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const { store } = useUserStore();
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);

  const fetchInventory = async () => {
    setIsLoadingInventory(true);
    try {
      let response;
      if (store) {
        response = await getInventory({ storeId: store.id, search: searchText });
        console.log("Inventory Response: ", response);
        setInventory(response.data);
      } else {
        console.error("Store is null or undefined");
      }
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setIsLoadingInventory(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInventory();
    }, [])
  );

  const handleSearch = () => {
    fetchInventory();
  }

  return (
    <View style={styles.container}>
      <InventoryScreen
        searchText={searchText}
        setSearchText={setSearchText}
        inventory={inventory}
        isLoadingInventory={isLoadingInventory}
        handleSearch={handleSearch}
      />
      <FabMenu />
    </View>
  )
}

export default Inventory

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAF7",
  }
})