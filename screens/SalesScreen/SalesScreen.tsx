import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import { styles } from '@/styles/SalesScreen.styles';

const SalesScreen = () => {
    const [searchText, setSearchText] = useState('');

    // Sample sales data
    const salesData = [
        {
            id: '1',
            orderNumber: 'ORD-001',
            price: 450.00,
            customerName: 'John Doe',
            date: '2024-08-29'
        },
        {
            id: '2',
            orderNumber: 'ORD-002',
            price: 230.00,
            customerName: null,
            date: '2024-08-28'
        },
        {
            id: '3',
            orderNumber: 'ORD-003',
            price: 780.00,
            customerName: 'Jane Smith',
            date: '2024-08-28'
        },
        {
            id: '4',
            orderNumber: 'ORD-004',
            price: 120.00,
            customerName: null,
            date: '2024-08-27'
        },
        {
            id: '5',
            orderNumber: 'ORD-005',
            price: 650.00,
            customerName: 'Mike Johnson',
            date: '2024-08-27'
        },
        {
            id: '6',
            orderNumber: 'ORD-006',
            price: 340.00,
            customerName: null,
            date: '2024-08-26'
        },
    ];

    const handleSort = () => {
        console.log('Sort pressed');
    };

    const handleFilter = () => {
        console.log('Filter pressed');
    };

    const renderSaleItem = ({ item }: { item: { id: string; orderNumber: string; price: Float; customerName: string | null; date: string; } }) => (
        <View style={styles.tableRow}>
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.customerName}>{item.customerName && "Customer:"} {item.customerName || ''}</Text>
                <Text style={styles.orderNumber}>
                    <Text style={{ fontWeight: "400" }}>Order#</Text> {item.orderNumber}
                </Text>
            </View>
            <Text style={styles.price}>M {item.price}.00</Text>
            {/* <Text style={styles.customerName}>
                {item.customerName || '-'}
            </Text> */}
            {/* <Text style={styles.date}>{item.date}</Text> */}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Search Bar and Action Buttons */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search sales..."
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#8E8E93"
                    />
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handleSort}>
                    <Ionicons name="swap-vertical" size={24} color="#FF700A" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleFilter}>
                    <Ionicons name="filter" size={24} color="#FF700A" />
                </TouchableOpacity>
            </View>

            {/* Table Header */}
            {/* <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Order #</Text>
                <Text style={styles.headerText}>Price</Text>
                <Text style={styles.headerText}>Customer</Text>
                <Text style={styles.headerText}>Date</Text>
            </View> */}

            {/* Sales List */}
            <FlatList
                data={salesData}
                renderItem={renderSaleItem}
                keyExtractor={(item) => item.id}
                style={styles.salesList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default SalesScreen

