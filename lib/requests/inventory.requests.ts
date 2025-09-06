import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

interface FetchInventoryProps {
    storeId: string;
    search?: string;
    itemType?: string;
    departmentName?: string;
    page?: number;
}

// (inventory.tsx, InventoryScreen.tsx, inventory.utils.ts, InventoryFilter.tsx)
export interface ItemTypeDepartmentNamePair {
    itemType: string,
    departmentName: string;
}

export interface PaginationMeta {
    page: number;
    take: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
}

// (inventory.tsx, InventoryScreen.tsx, RenderInventoryItem.tsx)
export interface InventoryItem {
    id: string;
    itemNumber: string;
    itemType: string;
    departmentName: string;
    name: string;
    description: string;
    unitSize: string;
    unitType: string;
    qtyAvailable: number;
    lowStockAlertQty: number;
    sellingPrice: number;
    markupPercentage: number;
    storeId: string;
    createdAt: string;
    updatedAt: string;
    images: string[];
}

export interface InventoryFilters {
    id: string;
    itemType: string;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
}

// Get Store Inventory (InventoryScreen.tsx)
export const getInventory = async (params: FetchInventoryProps) => {
    try {
        const { storeId, search, itemType, departmentName, page } = params;

        // Build query params
        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (itemType) query.append("itemType", itemType);
        if (departmentName) query.append("departmentName", departmentName); // matches API
        if (page) query.append("page", page.toString());

        let url = `${backendUrl}/api/inventory/get/${storeId}`;
        const queryString = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await axios.get(url);
        console.log("Inventory Response:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};

// Get Inventory Filters (inventory.tsx)
export const getInventoryFilters = async (storeId: string) => {
    try {
        const url = `${backendUrl}/api/inventory/filters/${storeId}`;
        const response = await axios.get(url);
        return response.data.data;
    }
    catch (error) {
        console.log("Error Fetching Inventory Filters: ", error)
        throw error;
    }
}