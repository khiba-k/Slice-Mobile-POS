import { addInventoryItem, getInventoryFilters, InventoryFilters } from '@/lib/requests/inventory.requests';
import { StoreProfile } from '@/store/useUserStore';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import { uploadImageToSupabase } from './supabase.storage';

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

// Add Inventory Handler (AddInventoryScreen.tsx)
export const addInventory = async (
  data: z.infer<typeof addItemSchema>,
  store: StoreProfile | null,
  router: { back: () => void },
  showToast: (success: boolean, message: string) => void
) => {
  try {
    const { displayImage, otherImages, ...itemDataWithoutImages } = data;

    // 1. Build array of images
    const imagesToUpload = [
      ...(displayImage ? [{ uri: displayImage, isDisplayImage: true }] : []),
      ...(otherImages?.map((uri: string) => ({ uri, isDisplayImage: false })) ?? []),
    ];


    // 2. Upload each image to Supabase and collect URLs
    const uploadedImages = await Promise.all(
      imagesToUpload.map(async (img) => {
        const publicUrl = await uploadImageToSupabase(img.uri, "inventory");
        return { url: publicUrl, isDisplayImage: img.isDisplayImage };
      })
    );

    // 3. Send item + images in one request
    await addInventoryItem(
      { ...itemDataWithoutImages, images: uploadedImages },
      store!.id
    );

    showToast(true, "Item added successfully!");
    router.back();
  } catch (error: any) {
    console.error("Error saving item:", error);
    if (error.response) {
      showToast(false, error.response.data.message || "Failed to add item.");
    }
    else {
      showToast(false, 'Failed to add item. Please try again.');
    }

  }
}

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