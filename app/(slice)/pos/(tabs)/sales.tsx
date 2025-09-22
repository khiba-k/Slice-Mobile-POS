import FabMenu from '@/components/shared/FabMenu';
import { PaginationMeta, Sale } from '@/lib/requests/sales.requests';
import SalesScreen from '@/screens/SalesScreen/SalesScreen';
import { useSaleInventoryStore } from '@/store/useSaleInventoryStore';
import { useUserStore } from '@/store/useUserStore';
import { fetchInventory } from '@/utils/AddSalesScreen.utils';
import { fetchSales } from '@/utils/sales.utils';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const index = () => {
  const [searchText, setSearchText] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);
  const { store } = useUserStore();
  const [isLoadingSales, setIsLoadingSales] = useState(false);
  const [visible, setVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [status, setStatus] = useState<'COMPLETED' | 'REVERSED' | 'DRAFT'>('COMPLETED');
  const { setInventory, items } = useSaleInventoryStore();
  const [paginationMeta, setPaginationMeta] = useState<PaginationMeta>({
    page: 1,
    take: 14,
    totalSales: 0,
    totalPages: 0,
    hasNextPage: false,
  });

  useFocusEffect(
    useCallback(() => {
      setCurrentPage(1);
      fetchSales(
        {
          store: store,
          searchText: searchText,
          setSales: setSales,
          setIsLoadingSales: setIsLoadingSales,
          setPaginationMeta: setPaginationMeta,
          page: 1,
          isLoadMore: false,
          status: status,
        }
      );
    }, [status])
  );

  useEffect(() => {
    fetchInventory({storeId: store!.id, setInventory: setInventory,
      items: items,
    });
  }, [])

  // Handle Search
  // const handleSearch = () => {
  //   setCurrentPage(1);
  //   fetchInventory(
  //     {
  //       store: store,
  //       searchText: searchText,
  //       selectedDepartment: selectedDepartment,
  //       selectedItemType: selectedItemType,
  //       setInventory: setInventory,
  //       setDepartments: setDepartments,
  //       setItemTypes: setItemTypes,
  //       setIsLoadingInventory: setIsLoadingInventory,
  //       setPaginationMeta: setPaginationMeta,
  //       page: 1,
  //       isLoadMore: false,
  //     })
  // }



  // Clear Text Search
  // const clearSearch = () => {
  //   setSearchText('')
  //   setCurrentPage(1);
  //   fetchInventory(
  //     {
  //       store: store,
  //       searchText: '',
  //       selectedDepartment: selectedDepartment,
  //       selectedItemType: selectedItemType,
  //       setInventory: setInventory,
  //       setDepartments: setDepartments,
  //       setItemTypes: setItemTypes,
  //       setIsLoadingInventory: setIsLoadingInventory,
  //       page: 1,
  //       setPaginationMeta: setPaginationMeta,
  //       isLoadMore: false,
  //     })
  // }

  // Load More Handler
  const loadMoreSales = () => {
    if (paginationMeta.hasNextPage && !isLoadingMore && !isLoadingSales) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setIsLoadingMore(true);

      fetchSales({
        store: store,
        searchText: searchText,
        page: nextPage,
        setSales: setSales,
        setIsLoadingSales: setIsLoadingSales,
        setPaginationMeta: setPaginationMeta,
        isLoadMore: true,
        setIsLoadingMore: setIsLoadingMore,
        status: status,
      });
    }
  };
  return (
    <View style={styles.container}>
      <SalesScreen
        searchText={searchText}
        setSearchText={setSearchText}
        sales={sales}
        isLoadingSales={isLoadingSales}
        // handleSearch={handleSearch}
        visible={visible}
        setVisible={setVisible}
        // clearSearch={clearSearch}
        loadMoreSales={loadMoreSales}
        isLoadingMore={isLoadingMore}
        paginationMeta={paginationMeta}
        salesStatus={status}
        setSalesStatus={setStatus}
      />
      <FabMenu />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFAF7",
  }
})