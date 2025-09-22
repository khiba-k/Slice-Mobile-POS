import InventorySkeleton from '@/components/shared/InventorySkeleton'
import { PaginationMeta, Sale } from '@/lib/requests/sales.requests'
import { styles } from '@/styles/SalesScreen.styles'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import LoadMoreButton from './LoadMoreButton'
import RenderSales from './RenderSales'
import SalesSearch from './SalesSearch'

const SalesScreen = ({
  searchText,
  setSearchText,
  sales,
  isLoadingSales,
  handleSearch = () => { },
  visible,
  setVisible,
  // applyFilters,
  clearSearch = () => { },
  loadMoreSales,
  isLoadingMore,
  paginationMeta,
  salesStatus,
  setSalesStatus
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  sales: Sale[];
  isLoadingSales: boolean;
  isLoadingMore: boolean;
  handleSearch?: () => void;
  visible: boolean;
  setVisible: (vis: boolean) => void;
  // applyFilters: (selectedItemType: string, selectedDepartment: string) => void;
  clearSearch?: () => void;
  loadMoreSales: () => void;
  paginationMeta: PaginationMeta;
  salesStatus: 'COMPLETED' | 'REVERSED' | 'DRAFT';
  setSalesStatus: (status: 'COMPLETED' | 'REVERSED' | 'DRAFT') => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<Sale | null>(null);
  // const { setClickedItem } = useEditItemStore();
  const router = useRouter();

  const renderFooter = () => (
    <LoadMoreButton
      onPress={loadMoreSales}
      isLoading={isLoadingMore}
      hasNextPage={paginationMeta.hasNextPage}
      totalItems={paginationMeta.totalSales}
      currentItemsCount={sales.length}
    />
  );


  return (
    <View style={styles.container}>
      {/* Search Bar and Action Buttons */}
      <View style={styles.statusTabs}>
        <TouchableOpacity onPress={() => { setSalesStatus("COMPLETED") }}
          style={[styles.statusTabsBtn, salesStatus === "COMPLETED" && { backgroundColor: "#FFFFFF" }]}>
          <Text style={[styles.statusTabsBtnText, salesStatus === "COMPLETED" && { color: "#FF700A" }]}>Fulfilled</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setSalesStatus("DRAFT") }}
          style={[styles.statusTabsBtn, salesStatus === "DRAFT" && { backgroundColor: "#FFFFFF" }]}>
          <Text style={[styles.statusTabsBtnText, salesStatus === "DRAFT" && { color: "#FF700A" }]}>Drafts</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.searchContainer}>
          <SalesSearch
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />
          {/* Inventory Filter Button */}
          {/* <SalesFilter
            departments={departments}
            itemTypes={itemTypes}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            selectedItemType={selectedItemType}
            setSelectedItemType={setSelectedItemType}
            visible={visible}
            setVisible={setVisible}
            applyFilters={applyFilters}
          /> */}
        </View>
        {/* Filter Display */}
        {/* <FilterDisplay
          selectedItemType={selectedItemType}
          setSelectedItemType={setSelectedItemType}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          handleApplyFilters={(type, dep) => {
            setSelectedItemType(type);
            setSelectedDepartment(dep);
            applyFilters(type, dep);
          }}
        /> */}
      </View>

      {/* Inventory List */}
      {isLoadingSales ?
        (<InventorySkeleton />)
        : (<FlatList
          data={sales}
          keyExtractor={(sale) => sale.id}
          style={styles.inventoryList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={styles.footerContainer}
          renderItem={({ item }) => (
            <RenderSales
              sale={item}
              onLongPress={() => setSelectedItem(item)}
              onPress={() => {
                // setClickedSale(sale);
                // router.push("/(slice)/pos/editInventory");
              }}
            />
          )}
        />)}
      {/* <AddToSale
        showAddToSale={!!selectedItem}
        item={selectedItem}
        setShowAddToSale={(val) => { if (!val) setSelectedItem(null) }}
        onAddNewSale={() => console.log("Add new sale for", selectedItem?.name)}
        onAddDraftSale={() => console.log("Add draft sale for", selectedItem?.name)}
      /> */}
    </View>
  )
}

export default SalesScreen
