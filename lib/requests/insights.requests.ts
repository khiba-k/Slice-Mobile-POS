import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

// Get Inventory Insights (InventoryInsights.tsx)
export const getInventoryInsights = async (storeId: string, itemId: string) => {
    try {
        const url = `${backendUrl}/api/insights/inventory/${storeId}/${itemId}`;
        const response = await axios.get(url);
        return response.data.data;
    }
    catch (error) {
        throw error;
    }
}