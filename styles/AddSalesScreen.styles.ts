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
})

export default styles;