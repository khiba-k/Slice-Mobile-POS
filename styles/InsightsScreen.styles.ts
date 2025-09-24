import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        paddingTop: 16,
        // alignItems: 'center',
        // flexGrow: 1,
        paddingBottom: 32
    },
    typesTabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        backgroundColor: '#F2F2F7',
        borderRadius: 5,
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
    typesTabsBtn: {
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 5,
        width: '50%',
    },
    typesTabsBtnText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8E8E93'
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
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

    // TotalCards styles
    totalCardsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    card: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#f4f4f4",
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        color: "#555",
    },
    value: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 5,
    },
    // InventorySearch styles
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
    suggestionBox: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        backgroundColor: "#fff",
        maxHeight: 300,
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    suggestionHeader: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#f9f9f9",
        borderBottomColor: '#E1E1E6'
    },
    suggestionHeading: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 14,
        color: "#333",
    },
    suggestionRow: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    suggestionCell: {
        flex: 1,
        fontSize: 14,
        color: "#000",
    },
    noResultsRow: {
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    noResultsText: {
        color: "#999",
        fontStyle: "italic",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
})