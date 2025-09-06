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