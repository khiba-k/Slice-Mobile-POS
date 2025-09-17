import InventorySkeleton from '@/components/shared/InventorySkeleton'
import { InventoryItem, ItemTypeDepartmentNamePair, PaginationMeta } from '@/lib/requests/inventory.requests'
import { styles } from '@/styles/InventoryScreen.styles'
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import AddToSale from './AddToSale'
import FilterDisplay from './FilterDisplay'
import InventoryFilter from './InventoryFilter'
import InventorySearch from './InventorySearch'
import LoadMoreButton from './LoadMoreButton'
import RenderInventoryItem from './RenderInventoryItem'

const InventoryScreen = ({
  searchText,
  setSearchText,
  inventory,
  isLoadingInventory,
  isLoadingMore,
  handleSearch,
  departments,
  itemTypes,
  selectedDepartment,
  setSelectedDepartment,
  selectedItemType,
  setSelectedItemType,
  visible,
  setVisible,
  applyFilters,
  clearSearch,
  loadMoreItems,
  paginationMeta,
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  inventory: InventoryItem[];
  isLoadingInventory: boolean;
  isLoadingMore: boolean;
  handleSearch: () => void;
  departments: ItemTypeDepartmentNamePair[];
  itemTypes: string[];
  selectedDepartment: string;
  setSelectedDepartment: (dep: string) => void;
  selectedItemType: string;
  setSelectedItemType: (type: string) => void;
  visible: boolean;
  setVisible: (vis: boolean) => void;
  applyFilters: (selectedItemType: string, selectedDepartment: string) => void;
  clearSearch: () => void;
  loadMoreItems: () => void;
  paginationMeta: PaginationMeta;
}) => {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);


  const renderFooter = () => (
    <LoadMoreButton
      onPress={loadMoreItems}
      isLoading={isLoadingMore}
      hasNextPage={paginationMeta.hasNextPage}
      totalItems={paginationMeta.totalItems}
      currentItemsCount={inventory.length}
    />
  );


  return (
    <View style={styles.container}>
      {/* Search Bar and Action Buttons */}
      <View>
        <View style={styles.searchContainer}>
          <InventorySearch
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />
          {/* Inventory Filter Button */}
          <InventoryFilter
            departments={departments}
            itemTypes={itemTypes}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedItemType={selectedItemType}
            setSelectedItemType={setSelectedItemType}
            visible={visible}
            setVisible={setVisible}
            applyFilters={applyFilters}
          />
        </View>
        {/* Filter Display */}
        <FilterDisplay
          selectedItemType={selectedItemType}
          setSelectedItemType={setSelectedItemType}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          handleApplyFilters={(type, dep) => {
            setSelectedItemType(type);
            setSelectedDepartment(dep);
            applyFilters(type, dep);
          }}
        />
      </View>

      {/* Inventory List */}
      {isLoadingInventory ?
        (<InventorySkeleton />)
        : (<FlatList
          data={inventory}
          keyExtractor={(item) => item.id}
          style={styles.inventoryList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={styles.footerContainer}
          renderItem={({ item }) => (
            <RenderInventoryItem
              item={item}
              onLongPress={() => setSelectedItem(item)} // pass your handler here
            />
          )}
        />)}
      <AddToSale
        showAddToSale={!!selectedItem}
        setShowAddToSale={(val) => { if (!val) setSelectedItem(null) }}
        onAddNewSale={() => console.log("Add new sale for", selectedItem?.name)}
        onAddDraftSale={() => console.log("Add draft sale for", selectedItem?.name)}
      />
    </View>
  )
}

export default InventoryScreen
