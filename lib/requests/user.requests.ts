import { UserData } from "@/utils/OnboardingForm.utils";
import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL; // Adjust the URL as needed

// Get User Profile (OnboardingScreen.tsx)
export const getUser = async (userId: string) => {
    try {
        const response = await axios.get(`${backendUrl}/api/user/get/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}


// Create New User and Store Profile (OnboardingForm.utils.ts)
export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${backendUrl}/api/user/create/owner`, userData);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Server returned an error:", error.response.data);
            throw error.response.data;
        } else {
            console.error("Error creating user:", error.message);
            throw { success: false, message: error.message };
        }
    }
}