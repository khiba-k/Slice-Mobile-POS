import { create } from "zustand";

export interface InventoryItem {
  id: string;
  itemNumber: string;
  name: string;
  qtyAvailable: number;
  sellingPrice: number;
  unitSize?: string | null;
  unitType?: string | null;
  images?: { url: string, isDisplayImage: true }[];
}

interface InventorySaleState {
  items: InventoryItem[];

  // actions
  setInventory: (items: InventoryItem[]) => void;
  addItem: (item: InventoryItem) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  removeItem: (id: string) => void;
  reset: () => void;
}

// Zustand store for managing sale inventory(sales.tsx, AddSalesScreen.tsx)
export const useSaleInventoryStore = create<InventorySaleState>((set) => ({
  items: [],

  setInventory: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  updateItem: (id, updates) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  reset: () => set({ items: [] }),
}));
