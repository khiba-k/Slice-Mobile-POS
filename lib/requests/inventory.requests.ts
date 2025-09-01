import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

interface FetchInventoryProps {
    storeId: string;
    search?: string;
    itemType?: string;
    departmentType?: string;
    page?: number;
}

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

// Get Store Inventory (InventoryScreen.tsx)
export const getInventory = async (params: FetchInventoryProps) => {
    try {
        console.log("Params: ", params)
        const { storeId, search, itemType, departmentType, page } = params;

        // Build query params
        const query = new URLSearchParams();
        if (search) query.append("search", search);
        if (itemType) query.append("itemType", itemType);
        if (departmentType) query.append("departmentName", departmentType); // matches API
        if (page) query.append("page", page.toString());

        let url = `${backendUrl}/api/inventory/get/${storeId}`;
        const queryString = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory:", error);
        throw error;
    }
};