import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

interface FetchInventoryProps {
    storeId: string;
    search?: string;
    itemType?: string;
    departmentName?: string;
    page?: number;
}

// (inventory.tsx, InventoryScreen.tsx, inventory.utils.ts, 
// InventoryFilter.tsx, AddInventoryScreen/index.tsx
// AddInventoryScreen.tsx, DetailsTab.tsx)
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
    images: ItemImage[];
}

interface ItemImage {
    id: string;
    url: string;
    itemId: string;
    isDisplayImage: boolean;
  }

export interface InventoryFilters {
    id: string;
    itemType: string;
    departmentName: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddInventoryType {
    itemType: string,
    departmentName: string,
    name: string,
    description?: string,
    unitSize?: string,
    unitType?: string,
    qtyAvailable?: number,
    lowStockAlertQty?: number,
    sellingPrice: number,
    costPrice?: number,
    markupPercentage?: number,
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
        return response.data.data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};

// Get Inventory Filters (AddInventoryScreen.utils.ts, inventory.utils.ts)
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

// Add Inventory (AddInventoryScreen.utils.ts)
export const addInventoryItem = async (
    itemData: AddInventoryType & { images: { url: string | null; isDisplayImage: boolean }[] },
    storeId: string
) => {
    try {

        const url = `${backendUrl}/api/inventory/add/${storeId}`;
        const response = await axios.post(url, itemData);

        return response.data;
    } catch (error) {
        console.error("Error adding inventory item:", error);
        throw error;
    }
};