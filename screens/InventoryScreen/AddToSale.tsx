import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddToSale = ({
    showAddToSale,
    setShowAddToSale,
    onAddNewSale,
    onAddDraftSale,
}: {
    showAddToSale: boolean;
    setShowAddToSale: (value: boolean) => void;
    onAddNewSale?: () => void;
    onAddDraftSale?: () => void;
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
                        <Text style={styles.title}>Add to Sale</Text>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                                setShowAddToSale(false);
                                onAddNewSale?.();
                            }}
                        >
                            <Text style={styles.actionText}>Add to New Sale</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => {
                                setShowAddToSale(false);
                                onAddDraftSale?.();
                            }}
                        >
                            <Text style={styles.actionText}>Add to Draft Sale</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: "#eee" }]}
                            onPress={() => setShowAddToSale(false)}
                        >
                            <Text style={[styles.actionText, { color: "#555" }]}>Cancel</Text>
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
        width: "90%",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 20,
    },
    actionButton: {
        width: "100%",
        paddingVertical: 14,
        marginVertical: 6,
        backgroundColor: "#007bff",
        borderRadius: 8,
        alignItems: "center",
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
