// store/EditItemStore.ts
import { InventoryItem } from "@/lib/requests/inventory.requests";
import { create } from "zustand";

interface EditItemState {
    clickedItem: InventoryItem | null;
    setClickedItem: (item: InventoryItem | null) => void;
    reset: () => void;
}

// (DiscardModal.tsx, EditItemStore.ts)
export const useEditItemStore = create<EditItemState>((set) => ({
    clickedItem: null,
    setClickedItem: (item) => set({ clickedItem: item }),
    reset: () => set({ clickedItem: null }),
}));