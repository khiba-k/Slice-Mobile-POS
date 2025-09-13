// inventory.utils.ts
import { InventoryFilters, InventoryItem, ItemTypeDepartmentNamePair, PaginationMeta, getInventory, getInventoryFilters } from '@/lib/requests/inventory.requests';
import { StoreProfile } from '@/store/useUserStore';
import React from 'react';

interface FetchInventoryParams {
    store: StoreProfile | null;
    searchText?: string;
    selectedDepartment?: string;
    selectedItemType?: string;
    setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>; // Changed this line
    setDepartments: (departments: ItemTypeDepartmentNamePair[]) => void;
    setItemTypes: (types: string[]) => void;
    setIsLoadingInventory: (loading: boolean) => void;
    page?: number;
    setPaginationMeta: (meta: PaginationMeta) => void;
    isLoadMore: boolean;
    setIsLoadingMore?: (loading: boolean) => void;
}

// Fetch Inventory (inventory.tsx)
export const fetchInventory = async ({
  store,
  searchText,
  selectedDepartment,
  selectedItemType,
  page,
  setInventory,
  setDepartments,
  setItemTypes,
  setIsLoadingInventory,
  setPaginationMeta,
  isLoadMore,
  setIsLoadingMore,
}: FetchInventoryParams) => {
  if (!store) {
    console.error('Store is null or undefined');
    return;
  }

  if (!isLoadMore) {
    setIsLoadingInventory(true);
  }

  try {
    const response = await getInventory({
      storeId: store.id,
      search: searchText,
      departmentName: selectedDepartment,
      itemType: selectedItemType,
      page: page,
    });

    // Only fetch filters on initial load (not on load more)
    if (!isLoadMore) {
      const filterResponse = await getInventoryFilters(store.id);
      const filters: InventoryFilters[] = filterResponse || [];

      // Extract unique departments & itemTypes dynamically
      const uniqueItemTypes = Array.from(new Set(filters.map((f) => f.itemType)));

      // Create a ItemType-Department pair for dynamic selection
      const ItemTypeDepartmentPairs = filters.map((f) => ({
        itemType: f.itemType,
        departmentName: f.departmentName,
      }));

      setItemTypes(uniqueItemTypes);
      setDepartments(ItemTypeDepartmentPairs);
    }

    const data: InventoryItem[] = response.items || [];
    console.log('Fetched inventory items:', data);
    const meta = response.meta || {
      page: 1,
      take: 14,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
    };

    // Update pagination metadata
    setPaginationMeta(meta);

    // Handle inventory items
    if (isLoadMore) {
      // Append new items to existing inventory
      setInventory(prevInventory => [...prevInventory, ...data]);
    } else {
      // Replace inventory with new items
      setInventory(data);
    }

  } catch (error) {
    console.error('Error fetching inventory:', error);
  } finally {
    if (isLoadMore) {
      setIsLoadingMore?.(false);
    } else {
      setIsLoadingInventory(false);
    }
  }
};
