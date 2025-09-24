import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    bodyContainer: {
        height: "100%",
        padding: 16
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
    // --- Sale Item Styles ---
    saleItemContainer: {
        borderBottomWidth: 1,
        borderColor: "#eee",
        paddingVertical: 10,
        marginBottom: 10,
    },
    saleItemTopRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 4,
    },
    saleItemMiddleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    itemNamePrice: {
        marginLeft: 12,
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: "600",
    },
    itemSellingPrice: {
        fontSize: 14,
        color: "#555",
    },
    saleItemBottomRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    itemAvailable: {
        fontSize: 12,
        color: "green",
    },
    itemTotalPrice: {
        fontSize: 14,
        fontWeight: "600",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    qtyBtn: {
        padding: 4,
    },
    qtyInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        width: 50,
        height: 40,
        textAlign: "center",
        fontSize: 16,
        paddingVertical: 4,
        marginHorizontal: 6,
        color: "#000",
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
    summaryFooterContainer: {
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#eee",
        padding: 8,
    },

    chevronToggle: {
        alignSelf: "center",
        padding: 4,
    },

    summaryContent: {
        paddingTop: 8,
    },

    rowSpaceBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },

    subtotalText: {
        fontSize: 16,
        fontWeight: "600",
    },

    discountRow: {
        flexDirection: "row",
        marginBottom: 8,
    },

    discountInputContainer: {
        flex: 1,
        marginRight: 8,
    },

    discountLabel: {
        fontSize: 14,
        color: "#666",
    },

    discountInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 8,
        marginTop: 4,
    },

    totalText: {
        fontSize: 18,
        fontWeight: "700",
    },

    proceedButton: {
        backgroundColor: "#FF700A",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 8,
    },

    proceedButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },

    draftButton: {
        backgroundColor: "#6c757d",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
    },

    draftButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: "#fff",
        padding: 20,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        maxHeight: "90%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 12,
        color: "#FF700A",
    },
    saleNameInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 8,
        marginBottom: 12,
    },
    receiptRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    receiptLabel: {
        fontSize: 14,
        color: "#333",
    },
    receiptValue: {
        fontSize: 14,
        color: "#333",
    },
    itemsContainer: {
        marginTop: 12,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 8,
    },
    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
    },
    paymentButton: {
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 8,
    },
    paymentButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    closeButton: {
        marginTop: 12,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#8E8E93",
        fontSize: 16,
        fontWeight: "600",
    },
})

export default styles;