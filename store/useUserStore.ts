import { create } from "zustand";

export interface StoreProfile {
    id: string;
    name: string;
    industry: string;
    location: string;
    district: string;
    country: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    idNumber: string;
    primaryPhoneNum: string;
    secondaryPhoneNum?: string;
    isOwner: boolean;
    storeId: string;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    profile: UserProfile | null;
    store: StoreProfile | null;
    setUserAndStore: (user: UserProfile, store: StoreProfile) => void;
    clearUser: () => void;
}

// User Data Store (OnboardingForm.tsx, OnboardingScreen.tsx, InventoryScreen.tsx)
export const useUserStore = create<UserState>((set) => ({
    profile: null,
    store: null,
    setUserAndStore: (user, store) => set({ profile: user, store }),
    clearUser: () => set({ profile: null, store: null }),
}));
