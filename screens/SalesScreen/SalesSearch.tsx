import { styles } from '@/styles/InventoryScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'

const SalesSearch = ({
  searchText,
  setSearchText,
  handleSearch,
  clearSearch
}: {
  searchText: string;
  setSearchText: (text: string) => void;
  handleSearch: () => void;
  clearSearch: () => void;
}) => {
  return (
    <>
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search inventory..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity style={styles.clearSearchBtn} onPress={clearSearch}>
          <Ionicons name="close" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="#FF700A" />
      </TouchableOpacity>
    </>
  )
}

export default SalesSearch
