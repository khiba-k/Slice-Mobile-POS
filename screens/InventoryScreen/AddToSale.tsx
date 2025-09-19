import { InventoryItem } from "@/lib/requests/inventory.requests";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddToSale = ({
    showAddToSale,
    setShowAddToSale,
    onAddNewSale,
    onAddDraftSale,
    item,
}: {
    showAddToSale: boolean;
    setShowAddToSale: (value: boolean) => void;
    onAddNewSale?: () => void;
    onAddDraftSale?: () => void;
    item: InventoryItem | null;
}) => {
    return (
        <View>
            <Modal
                visible={showAddToSale}
                transparent
                animationType="fade"
                onRequestClose={() => setShowAddToSale(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalBox}>
                        {/* X button at top right */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowAddToSale(false)}
                        >
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>

                        <Text style={styles.title}>Add <Text style={{fontSize: 14, color: "red"}}>#{item?.itemNumber}</Text> to Sale</Text>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#FF700A" }]}
                            onPress={() => {
                                setShowAddToSale(false);
                                onAddNewSale?.();
                            }}
                        >
                            <Text style={[styles.actionText, { color: "#FF700A" }]}>New Sale</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: "white", borderWidth: 1, borderColor: "purple" }]}
                            onPress={() => {
                                setShowAddToSale(false);
                                onAddDraftSale?.();
                            }}
                        >
                            <Text style={[styles.actionText, { color: "purple" }]}>Draft Sale</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AddToSale;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    modalBox: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        width: "80%",
        alignItems: "center",
        position: "relative",
    },
    closeButton: {
        position: "absolute",
        top: 15,
        right: 15,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
    closeText: {
        fontSize: 16,
        color: "#555",
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 20,
        marginTop: 10,
    },
    actionButton: {
        width: "100%",
        paddingVertical: 10,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
});