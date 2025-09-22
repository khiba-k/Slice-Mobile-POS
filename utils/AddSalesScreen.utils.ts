import { fetchInventoryForSales } from "@/lib/requests/sales.requests";
import { InventoryItem } from "@/store/useSaleInventoryStore";

export const fetchInventory = async (
    { storeId, setInventory, items }:
        {
            storeId: string | null, setInventory: (items: any[]) => void,
            items: InventoryItem[]
        }
) => {
    try {
        if (!storeId) return;
        if (items.length > 0) return;
        const response = await fetchInventoryForSales({ storeId });
        setInventory(response);
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
} 