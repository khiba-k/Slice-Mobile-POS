import { getInventoryFilters, InventoryFilters, updateInventoryItem } from '@/lib/requests/inventory.requests';
import { FormImage } from '@/screens/EditInventoryScreen/ImagesTab';
import { StoreProfile } from '@/store/useUserStore';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import { uploadImageToSupabase } from './supabase.storage';

export type OutgoingImage = {
    url: string;
    isDisplayImage: boolean;
};

// Add Inventory Form Validation Schema(EditInventoryScreen.tsx)
export const addItemSchema = z.object({
    itemType: z.string().nonempty('Item Type is required'),
    departmentName: z.string().nonempty('Department is required'),
    name: z.string().nonempty('Item name is required'),
    description: z.string().optional(),
    unitSize: z.string().optional(),
    unitType: z.string().optional(),
    qtyAvailable: z.number().min(0, 'Quantity must be >= 0'),
    lowStockAlertQty: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined))
        .refine((val) => val === undefined || val >= 0, 'Low Stock must be >= 0'),
    sellingPrice: z
        .string()
        .nonempty('Selling Price is required')
        .transform((val) => Number(val))
        .refine((val) => !isNaN(val) && val >= 0, 'Selling Price must be >= 0'),
    costPrice: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined))
        .refine((val) => val === undefined || val >= 0, 'Cost Price must be >= 0'),
    markupPercentage: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : undefined))
        .refine((val) => val === undefined || val >= 0, 'Markup % must be >= 0'),
    displayImage: z
        .object({
            id: z.string().optional(),
            uri: z.string(),
            isDisplayImage: z.boolean(),
            new: z.boolean().optional(),
            removed: z.boolean().optional(), // ✅ Added this
        })
        .nullable()
        .optional(),

    otherImages: z
        .array(
            z.object({
                id: z.string().optional(),
                uri: z.string(),
                isDisplayImage: z.boolean(),
                new: z.boolean().optional(),
                removed: z.boolean().optional(), // ✅ Added this
            })
        )
        .optional(),
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

// Handle Price Change Calculation(PricingTab.tsx)
export const handleSellingPriceChange = (
    value: string,
    costPrice: string,
    setSellingPrice: (val: string) => void,
    setMarkupPercentage: (val: string) => void
) => {
    setSellingPrice(value);

    const numVal = Number(value);
    const numCost = Number(costPrice);

    if (!isNaN(numVal) && !isNaN(numCost) && numCost > 0) {
        const markup = ((numVal - numCost) / numCost) * 100;
        setMarkupPercentage(markup.toFixed(2));
    }
};

//  Handle Cost Price Change Calculation (PricingTab.tsx)
export const handleCostPriceChange = (
    value: string,
    sellingPrice: string,
    markupPercentage: string,
    setCostPrice: (val: string) => void,
    setMarkupPercentage: (val: string) => void
) => {
    setCostPrice(value);

    const numVal = Number(value);
    const numSelling = Number(sellingPrice);
    const numMarkup = Number(markupPercentage);

    if (!isNaN(numVal) && !isNaN(numSelling) && numVal > 0) {
        const markup = ((numSelling - numVal) / numVal) * 100;
        setMarkupPercentage(markup.toFixed(2));
    } else if (!isNaN(numSelling) && !isNaN(numMarkup) && numMarkup > 0) {
        const cost = numSelling / (1 + numMarkup / 100);
        setCostPrice(cost.toFixed(2));
    }
};

// Handle Markup Change Calculation  (PricingTab.tsx)
export const handleMarkupChange = (
    value: string,
    sellingPrice: string,
    costPrice: string,
    setSellingPrice: (val: string) => void,
    setCostPrice: (val: string) => void,
    setMarkupPercentage: (val: string) => void
) => {
    setMarkupPercentage(value);

    const numVal = Number(value);
    const numSelling = Number(sellingPrice);
    const numCost = Number(costPrice);

    if (!isNaN(numVal) && !isNaN(numCost) && numCost > 0) {
        const selling = numCost * (1 + numVal / 100);
        setSellingPrice(selling.toFixed(2));
    } else if (!isNaN(numVal) && !isNaN(numSelling) && numVal > 0) {
        const cost = numSelling / (1 + numVal / 100);
        setCostPrice(cost.toFixed(2));
    }
};

// Edit Inventory Handler (EditInventoryScreen.tsx)
export const editInventory = async (
    data: z.infer<typeof addItemSchema>,
    inventoryId: string,
    router: { back: () => void },
    showToast: (success: boolean, message: string) => void
) => {
    try {

        const { displayImage, otherImages, ...itemDataWithoutImages } = data;

        const allImages: FormImage[] = [
            ...(displayImage ? [displayImage] : []),
            ...(otherImages ?? []),
        ];

        const newImages = allImages.filter(img => img.new && !img.removed);
        const unchangedImages = allImages.filter(img => !img.new && !img.removed);

        const uploadedImages: OutgoingImage[] = await Promise.all(
            newImages.map(async (img) => {
                const publicUrl = await uploadImageToSupabase(img.uri, "inventory");
                if (!publicUrl) throw new Error("Image upload failed");
                return { url: publicUrl, isDisplayImage: img.isDisplayImage };
            })
        );

        const keptImages: OutgoingImage[] = unchangedImages.map(img => ({
            id: img.id, // keep ID so backend knows it’s an existing one
            url: img.uri,
            isDisplayImage: img.isDisplayImage,
        }));

        // ✅ Only send `images`, no `removeImages`
        await updateInventoryItem(
            {
                ...itemDataWithoutImages,
                images: [...keptImages, ...uploadedImages],
            },
            inventoryId
        );

        showToast(true, "Item updated successfully!");
        router.back();
    } catch (error: any) {
        console.error("Error saving item:", error);
        if (error.response) {
            showToast(false, error.response.data.message || "Failed to update item.");
        } else {
            showToast(false, "Failed to update item. Please try again.");
        }
    }
};

// Pick a single image for display/thumbnail (ImagesTab.tsx)
export const pickImage = async (onChange: (uri: string | null) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
        onChange(result.assets[0].uri);
    }
};

// Pick multiple images for additional images (ImagesTab.tsx)
export const pickMultipleImages = async (
    value: string[],
    onChange: (newArray: string[]) => void
) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Permission to access media library is required!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
        const newUris = result.assets.map((asset: { uri: string }) => asset.uri);
        onChange([...(value || []), ...newUris]);
    }
};