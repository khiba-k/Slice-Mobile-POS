import { UserData } from "@/utils/OnboardingForm.utils";
import axios from "axios";

const backendUrl = "http://192.168.10.69:3000"; // Adjust the URL as needed

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export interface UserDataResponse extends UserData {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export const getUser = async (userId: string) => {
    try {
        const response = await axios.get(`${backendUrl}/api/user/get/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}

export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${backendUrl}/api/user/create`, userData);
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