import InventorySkeleton from '@/components/shared/InventorySkeleton'
import { InventoryItem } from '@/lib/requests/inventory.requests'
import { styles } from '@/styles/InventoryScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

const InventoryScreen = ({
  searchText,
  setSearchText,
  inventory,
  isLoadingInventory,
  handleSearch
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  inventory: InventoryItem[];
  isLoadingInventory: boolean;
  handleSearch: () => void;
}) => {

  const handleSort = () => {
    console.log('Sort pressed')
  }

  const handleFilter = () => {
    console.log('Filter pressed')
  }

  const renderInventoryItem = ({ item }: { item: InventoryItem }) => (
    <View style={styles.tableRow}>
      {/* Image */}
      {item.images ? (
        <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      {/* Info */}
      <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemNumber}><Text style={{ fontWeight: "400" }}>Item#</Text> {item.itemNumber}</Text>
      </View>

      {/* Price & Stock */}
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.price}>M {item.sellingPrice}.00</Text>
        <Text style={styles.stock}>{item.qtyAvailable} Left</Text>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Search Bar and Action Buttons */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search inventory..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#8E8E93"
          />
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={handleFilter}>
          <Ionicons name="filter" size={24} color="#FF700A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#FF700A" />
        </TouchableOpacity>
      </View>

      {/* Inventory List */}
      {isLoadingInventory ?
        (<InventorySkeleton />)
        : (<FlatList
          data={inventory}
          renderItem={renderInventoryItem}
          keyExtractor={(item) => item.id}
          style={styles.inventoryList}
          showsVerticalScrollIndicator={false}
        />)}
    </View>
  )
}

export default InventoryScreen
