import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '@/styles/InventoryScreen.styles'

const InventoryScreen = () => {
  const [searchText, setSearchText] = useState('')

  // Sample inventory data
  const inventoryData = [
    {
      id: '1',
      name: 'Coca Cola 500ml',
      itemNumber: 'ITM-001',
      price: 15.0,
      stock: 20,
      image: 'https://images.pexels.com/photos/17650224/pexels-photo-17650224.jpeg'
    },
    {
      id: '2',
      name: 'Sprite 500ml',
      itemNumber: 'ITM-002',
      price: 14.0,
      stock: 35,
      image: null
    },
    {
      id: '3',
      name: 'Fanta Orange 500ml',
      itemNumber: 'ITM-003',
      price: 14.0,
      stock: 12,
      image: 'https://images.pexels.com/photos/13950097/pexels-photo-13950097.jpeg'
    },
    {
      id: '4',
      name: 'Chips',
      itemNumber: 'ITM-004',
      price: 10.0,
      stock: 50,
      image: null
    },
  ]

  const handleSort = () => {
    console.log('Sort pressed')
  }

  const handleFilter = () => {
    console.log('Filter pressed')
  }

  const renderInventoryItem = ({ item }: { item: { id: string; name: string; itemNumber: string; price: number; stock: number; image: string | null } }) => (
    <View style={styles.tableRow}>
      {/* Image */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
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
        <Text style={styles.price}>M {item.price}.00</Text>
        <Text style={styles.stock}>{item.stock} Left</Text>
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

        <TouchableOpacity style={styles.actionButton} onPress={handleSort}>
          <Ionicons name="swap-vertical" size={24} color="#FF700A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleFilter}>
          <Ionicons name="filter" size={24} color="#FF700A" />
        </TouchableOpacity>
      </View>

      {/* Inventory List */}
      <FlatList
        data={inventoryData}
        renderItem={renderInventoryItem}
        keyExtractor={(item) => item.id}
        style={styles.inventoryList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default InventoryScreen
