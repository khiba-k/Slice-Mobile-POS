import { create } from "zustand";

export interface UserProfile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    idNumber: string;
    primaryPhoneNum: string;
    secondaryPhoneNum?: string;
    storeName: string;
    industry: string;
    location: string;
    district: string;
    country: string;
    isOwner: boolean;
    createdAt: string;
    updatedAt: string;
}

interface UserState {
    email: string | null;
    profile: UserProfile | null;
    setUser: (email: string, profile: UserProfile) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    email: null,
    profile: null,
    setUser: (email, profile) => set({ email, profile }),
    clearUser: () => set({ email: null, profile: null }),
}));
