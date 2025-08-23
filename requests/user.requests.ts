import axios from "axios";

const backendUrl = "http://192.168.10.69:3000"; // Adjust the URL as needed

export const getUser = async (userId: string) => {
    try {
        const response = await axios.get(`${backendUrl}/api/user/get/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}