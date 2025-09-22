import { fetchCompletedSales, fetchDraftSales, PaginationMeta, Sale } from '@/lib/requests/sales.requests';
import { StoreProfile } from '@/store/useUserStore';

interface FetchSalesParams {
    store: StoreProfile | null;
    searchText?: string;
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>;
    setIsLoadingSales: (loading: boolean) => void;
    page?: number;
    setPaginationMeta: (meta: PaginationMeta) => void;
    isLoadMore: boolean;
    setIsLoadingMore?: (loading: boolean) => void;
    status?: 'COMPLETED' | 'REVERSED' | 'DRAFT';
}

// Fetch Inventory (inventory.tsx)
export const fetchSales = async ({
    store,
    searchText,
    page,
    setSales,
    setIsLoadingSales,
    setPaginationMeta,
    isLoadMore,
    setIsLoadingMore,
    status = 'COMPLETED',
}: FetchSalesParams) => {
    if (!store) {
        console.error('Store is null or undefined');
        return;
    }

    if (!isLoadMore) {
        setIsLoadingSales(true);
    }

    try {
        let response;
        if (status === 'COMPLETED') {
            response = await fetchCompletedSales({
                storeId: store.id,
                page: page,
            });

        }

        if (status === 'DRAFT') {
            response = await fetchDraftSales({
                storeId: store.id,
                page: page,
            });

        }

        const data: Sale[] = response.sales || [];
        const meta = response.meta || {
            page: 1,
            take: 14,
            totalSales: 0,
            totalPages: 0,
            hasNextPage: false,
        };

        // Update pagination metadata
        setPaginationMeta(meta);

        // Handle inventory items
        if (isLoadMore) {
            // Append new items to existing inventory
            setSales(prevSales => [...prevSales, ...data]);
        } else {
            // Replace inventory with new items
            setSales(data);
        }

    } catch (error) {
        console.error('Error fetching inventory:', error);
    } finally {
        if (isLoadMore) {
            setIsLoadingMore?.(false);
        } else {
            setIsLoadingSales(false);
        }
    }
};