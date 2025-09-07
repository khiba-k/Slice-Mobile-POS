import { getInventoryFilters, InventoryFilters } from '@/lib/requests/inventory.requests';
import { StoreProfile } from '@/store/useUserStore';
import { z } from 'zod';

// Add Inventory Form Validation Schema(AddInventoryScreen.tsx)
export const addItemSchema = z.object({
    itemType: z.string().nonempty('Item Type is required'),
    departmentName: z.string().nonempty('Department is required'),
    name: z.string().nonempty('Item name is required'),
    description: z.string().optional(),
    unitSize: z.string().optional(),
    unitType: z.string().optional(),
    qtyAvailable: z.number().min(0, 'Quantity must be >= 0'),
    lowStockAlertQty: z.number().optional(),
    sellingPrice: z.number().min(0, 'Selling Price must be >= 0'),
    costPrice: z.number().optional(),
    markupPercentage: z.number().optional(),
    displayImage: z.string().optional(),
    otherImages: z.array(z.string()).optional(),
});

// getItemTypesDepartmentPairsType 
interface GetItemTypesDepartmentPairsParams {
    store: StoreProfile | null;
    setItemTypes: (types: string[]) => void;
    setDepartments: (departments: { itemType: string; departmentName: string }[]) => void;
}

export const getItemTypesDepartmentPairs = async ({
    store,
    setItemTypes,
    setDepartments,
}: GetItemTypesDepartmentPairsParams) => {
    if (!store) {
        console.error('Store is null or undefined');
        return;
    }
    try {
        const response = await getInventoryFilters(store.id);
        const ItemDepartmentResponse: InventoryFilters[] = response || [];

        // Extract unique departments & itemTypes dynamically
        const uniqueItemTypes = Array.from(new Set(ItemDepartmentResponse.map((f) => f.itemType)));

        // Create a ItemType-Department pair for dynamic selection
        const ItemTypeDepartmentPairs = ItemDepartmentResponse.map((f) => ({
            itemType: f.itemType,
            departmentName: f.departmentName,
        }));

        setItemTypes(uniqueItemTypes);
        setDepartments(ItemTypeDepartmentPairs);
    } catch (error) {
        throw error;
    }
}