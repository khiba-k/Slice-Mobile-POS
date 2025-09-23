import { CreateSaleInput } from "@/screens/AddSaleScreen/AddSaleScreen";
import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

export enum SaleStatus {
    DRAFT = "DRAFT",
    COMPLETED = "COMPLETED",
    REVERSED = "REVERSED",
}

export enum PaymentMethod {
    CASH = "CASH",
    MPESA = "MPESA",
    ECOCASH = "ECOCASH",
    CARD = "CARD",
}

export interface SaleItem {
    id: string;
    saleId: string;
    itemId: string | null;
    itemName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

//   Sale Interface (sales.tsx, sales.utils.ts, SalesScreen.tsx, RenderSales.tsx)
export interface Sale {
    id: string;
    name: string | null;
    saleNumber: string;
    storeId: string;
    cashierId: string | null;
    cashierName: string;
    paymentMethod: PaymentMethod;
    subtotal: number;
    discountAmount: number;
    total: number;
    status: SaleStatus;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    saleItems: SaleItem[];
}

// Pagination data (sales.tsx, sales.utils.ts, SalesScreen.tsx)
export interface PaginationMeta {
    page: number;
    take: number;
    totalSales: number;
    totalPages: number;
    hasNextPage: boolean;
}

export interface CompletedSalesResponse {
    sales: Sale[];
    meta: PaginationMeta;
}

interface GetCompletedSalesParams {
    storeId: string;
    page?: number;
}

// Fet ch Completed Sales (sales.utils.ts)
export async function fetchCompletedSales({
    storeId,
    page = 1,
}: GetCompletedSalesParams) {
    try {
        const query = new URLSearchParams();
        if (page) query.append("page", page.toString());

        let url = `${backendUrl}/api/sale/get/${storeId}/complete`;
        const queryString = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await axios.get(url);

        return response.data.data;
    } catch (error: any) {
        console.error("[Fetch Completed Sales Error]", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch completed sales");
    }
}

// Fetch Draft Sales (sales.utils.ts)
export async function fetchDraftSales({
    storeId,
    page = 1,
}: GetCompletedSalesParams) {
    try {
        const query = new URLSearchParams();
        if (page) query.append("page", page.toString());

        let url = `${backendUrl}/api/sale/get/${storeId}/draft`;
        const queryString = query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }

        const response = await axios.get(url);

        return response.data.data;
    } catch (error: any) {
        console.error("[Fetch Completed Sales Error]", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch completed sales");
    }
}

// Fetch Inventory for Sales (AddSalesScreen.utils.ts)
export async function fetchInventoryForSales({
    storeId,
}: { storeId: string }) {
    try {

        const response = await axios.get(`${backendUrl}/api/sale/inventory/${storeId}`);
        return response.data.data;
    } catch (error: any) {
        console.error("[Fetch Completed Sales Error]", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch completed sales");
    }
}

// Submit Sale(AddSaleScreen.tsx)
export async function submitSale(data: CreateSaleInput) {
    try {
        const { storeId, ...saleData } = data;

        const response = await axios.post(`${backendUrl}/api/sale/add/${storeId}`, saleData);
        return response.data.data;
    } catch (error: any) {
        console.error("[Fetch Completed Sales Error]", error);
        throw new Error(error?.response?.data?.message || "Failed to log new sale");
    }
}