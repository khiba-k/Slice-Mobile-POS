import { InventoryItem, useSaleInventoryStore } from "@/store/useSaleInventoryStore";
import { useUserStore } from "@/store/useUserStore";
import styles from "@/styles/AddSalesScreen.styles";
import { fetchInventory } from "@/utils/AddSalesScreen.utils";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

interface InventoryInsightsSearchProps {
  onSelectItem: (item: InventoryItem) => void;
}

const InventoryInsightsSearch: React.FC<InventoryInsightsSearchProps> = ({ onSelectItem }) => {
  const { items, setInventory } = useSaleInventoryStore();
  const { store } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const tryGettingItems = async () => {
      setLoading(true);
      try {
        await fetchInventory({ storeId: store?.id || null, setInventory: setInventory, items });
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };

    tryGettingItems();
  }, []);

  // Fuse.js setup
  const fuse = useMemo(() => {
    if (!items || !Array.isArray(items) || items.length === 0) {
      return null;
    }

    const cleanItems = items.map((i) => ({
      ...i,
      name: i.name?.trim() || "",
      itemNumber: i.itemNumber?.trim() || "",
    }));

    return new Fuse(cleanItems, {
      keys: ["name", "itemNumber"],
      threshold: 0.4,
      ignoreLocation: true,
      includeScore: true,
      isCaseSensitive: false,
      minMatchCharLength: 1,
    });
  }, [items]);

  // Filtered suggestions
  const suggestions: InventoryItem[] = useMemo(() => {
    if (searchText.length < 2 || !fuse) return [];
    return fuse.search(searchText).slice(0, 4).map((res) => res.item);
  }, [searchText, fuse]);

  return (
    <View style={styles.searchContainer}>
      {/* Search Input */}
      <View style={styles.searchInputContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search inventory for insights..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#8E8E93"
          editable={!loading}
        />
        {searchText.length > 0 && (
          <TouchableOpacity style={styles.clearSearchBtn} onPress={() => setSearchText("")}>
            <Ionicons name="close" size={20} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>

      {/* Loading indicator */}
      {loading && (
        <View style={[styles.loadingContainer, { marginTop: 10, padding: 20, alignItems: "center" }]}>
          <Text style={{ color: "#8E8E93" }}>Loading inventory...</Text>
        </View>
      )}

      {/* Suggestion Box */}
      {searchText.length >= 2 && !loading && (
        <View style={styles.suggestionBox}>
          {suggestions.length === 0 ? (
            <View style={[styles.noResultsRow, { padding: 20, alignItems: "center", justifyContent: "center" }]}>
              <Text style={[styles.noResultsText, { color: "#8E8E93" }]}>
                No results found for "{searchText}"
              </Text>
            </View>
          ) : (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelectItem(item); // Pass item to Insights screen
                    setSearchText("");
                  }}
                  style={[
                    styles.suggestionRow,
                    {
                      flexDirection: "row",
                      paddingVertical: 12,
                      paddingHorizontal: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#F0F0F0",
                    },
                  ]}
                >
                  <Text style={[styles.suggestionCell, { flex: 1 }]}>{item.itemNumber}</Text>
                  <Text style={[styles.suggestionCell, { flex: 2 }]}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default InventoryInsightsSearch;
