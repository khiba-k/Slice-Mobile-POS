import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        paddingTop: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
    },
    actionButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F8F9FA',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    headerText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#6C757D',
        textAlign: 'center',
    },
    salesList: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        alignItems: "center",
        justifyContent: "space-between",
    },
    orderNumber: {
        flex: 1,
        fontSize: 14,
        fontWeight: '300',
        color: '#A16B45',
    },
    price: {
        flex: 1,
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        textAlign: 'right',
    },
    customerName: {
        flex: 1,
        fontSize: 16,
        color: '#1C120D',
        fontWeight: '500',
    },
    date: {
        flex: 1,
        fontSize: 14,
        color: '#6C757D',
        textAlign: 'center',
    },
})