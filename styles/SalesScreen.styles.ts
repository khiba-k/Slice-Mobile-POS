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
    clearSearchBtn: {
        // borderLeftWidth: 1,
        // borderLeftColor: '#C7C7CC',
        paddingLeft: 8,
    },
    actionButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inventoryList: {
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        alignItems: "center",
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F2F2F7',
    },
    imagePlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#F2F2F7',
        borderRadius: 8,
    },
    itemName: {
        fontSize: 16,
        color: '#1C120D',
        fontWeight: '500',
    },
    itemNumber: {
        fontSize: 14,
        fontWeight: '300',
        color: '#A16B45',
    },
    price: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
    },
    stock: {
        fontSize: 13,
        color: '#6C757D',
        fontWeight: '400',
    },
    loadMoreContainer: {
        borderWidth: 1,
        borderColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadMoreButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginVertical: 16,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadMoreButtonDisabled: {
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadMoreText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 8,
    },
    allLoadedText: {
        color: '#666666',
        fontSize: 14,
        fontStyle: 'italic',
    },
    footerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
