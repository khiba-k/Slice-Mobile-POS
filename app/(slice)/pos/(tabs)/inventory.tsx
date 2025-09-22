import FabMenu from '@/components/shared/FabMenu';
import { InventoryItem, ItemTypeDepartmentNamePair, PaginationMeta } from '@/lib/requests/inventory.requests';
import InventoryScreen from '@/screens/InventoryScreen/InventoryScreen';
import { useSaleInventoryStore } from '@/store/useSaleInventoryStore';
import { useUserStore } from '@/store/useUserStore';
import { fetchInventory } from '@/utils/inventory.utils';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Inventory = () => {
  const [searchText, setSearchText] = useState('');
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [departments, setDepartments] = useState<ItemTypeDepartmentNamePair[]>([]);
  const [itemTypes, setItemTypes] = useState<string[]>([]);
  const { store } = useUserStore();
  const [isLoadingInventory, setIsLoadingInventory] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { items } = useSaleInventoryStore();
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    take: 14,
    totalItems: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(1);
      fetchInventory(
        {
          store: store,
          searchText: searchText,
          selectedDepartment: selectedDepartment,
          selectedItemType: selectedItemType,
          setInventory: setInventory,
          setDepartments: setDepartments,
          setItemTypes: setItemTypes,
          setIsLoadingInventory: setIsLoadingInventory,
          setPaginationMeta: setPaginationMeta,
          page: 1,
          isLoadMore: false,
        }
      );
    }, [])
  );

  // Handle Search
  const handleSearch = () => {
    setCurrentPage(1);
    fetchInventory(
      {
        store: store,
        searchText: searchText,
        selectedDepartment: selectedDepartment,
        selectedItemType: selectedItemType,
        setInventory: setInventory,
        setDepartments: setDepartments,
        setItemTypes: setItemTypes,
        setIsLoadingInventory: setIsLoadingInventory,
        setPaginationMeta: setPaginationMeta,
        page: 1,
        isLoadMore: false,
      })
  }

  // Apply Filters
  const applyFilters = (selectedItemType: string, selectedDepartment: string) => {
    setSearchText('')
    setCurrentPage(1);
    fetchInventory(
      {
        store: store,
        searchText: '',
        selectedDepartment: selectedDepartment,
        selectedItemType: selectedItemType,
        setInventory: setInventory,
        setDepartments: setDepartments,
        setItemTypes: setItemTypes,
        setIsLoadingInventory: setIsLoadingInventory,
        page: 1,
        setPaginationMeta: setPaginationMeta,
        isLoadMore: false,
      })
    setVisible(false)
  }

  // Clear Text Search
  const clearSearch = () => {
    setSearchText('')
    setCurrentPage(1);
    fetchInventory(
      {
        store: store,
        searchText: '',
        selectedDepartment: selectedDepartment,
        selectedItemType: selectedItemType,
        setInventory: setInventory,
        setDepartments: setDepartments,
        setItemTypes: setItemTypes,
        setIsLoadingInventory: setIsLoadingInventory,
        page: 1,
        setPaginationMeta: setPaginationMeta,
        isLoadMore: false,
      })
  }

  // Load More Handler
  const loadMoreItems = () => {
    if (paginationMeta.hasNextPage && !isLoadingMore && !isLoadingInventory) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setIsLoadingMore(true);

      fetchInventory({
        store: store,
        searchText: searchText,
        selectedDepartment: selectedDepartment,
        selectedItemType: selectedItemType,
        page: nextPage,
        setInventory: setInventory,
        setDepartments: setDepartments,
        setItemTypes: setItemTypes,
        setIsLoadingInventory: setIsLoadingInventory,
        setPaginationMeta: setPaginationMeta,
        isLoadMore: true,
        setIsLoadingMore: setIsLoadingMore,
      });
    }
  };

  return (
    <View style={styles.container}>
      <InventoryScreen
        searchText={searchText}
        setSearchText={setSearchText}
        inventory={inventory}
        isLoadingInventory={isLoadingInventory}
        handleSearch={handleSearch}
        departments={departments}
        itemTypes={itemTypes}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedItemType={selectedItemType}
        setSelectedItemType={setSelectedItemType}
        visible={visible}
        setVisible={setVisible}
        applyFilters={applyFilters}
        clearSearch={clearSearch}
        loadMoreItems={loadMoreItems}
        paginationMeta={paginationMeta}
        isLoadingMore={isLoadingMore}
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