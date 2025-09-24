import styles from "@/styles/AddSalesScreen.styles";
import { SalesItemType } from "@/utils/AddSalesScreen.utils";
import React from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export interface SummaryModalProps {
    visible: boolean;
    onClose: () => void;
    saleItems: SalesItemType[];
    subtotal: number;
    discountAmount: number;
    discountPercent: number;
    total: number;
    saleName: string;
    setSaleName: React.Dispatch<React.SetStateAction<string>>;
    onSelectPayment: (method: 'CASH' | 'MPESA' | 'ECOCASH' | 'CARD') => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({
    visible,
    onClose,
    saleItems,
    subtotal,
    discountAmount,
    discountPercent,
    total,
    saleName,
    setSaleName,
    onSelectPayment,
}) => {
    if (!visible) return null;

    const paymentMethods: { method: 'CASH' | 'MPESA' | 'ECOCASH' | 'CARD'; color: string }[] = [
        { method: 'CASH', color: '#008000' },
        { method: 'MPESA', color: '#E60000' },
        { method: 'ECOCASH', color: '#0042AD' },
        { method: 'CARD', color: '#007C7F' },
    ];

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>Sale Summary</Text>

                        {/* Sale Name */}
                        <TextInput
                            placeholder="Sale Name (optional)"
                            value={saleName}
                            onChangeText={setSaleName}
                            style={styles.saleNameInput}
                        />

                        {/* Receipt Details */}
                        <View style={styles.receiptRow}>
                            <Text style={styles.receiptLabel}>Subtotal:</Text>
                            <Text style={styles.receiptValue}>M {subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.receiptRow}>
                            <Text style={styles.receiptLabel}>Discount:</Text>
                            <Text style={styles.receiptValue}>
                                M {discountAmount.toFixed(2)} ({discountPercent.toFixed(2)}%)
                            </Text>
                        </View>
                        <View style={[styles.receiptRow, { marginTop: 8 }]}>
                            <Text style={[styles.receiptLabel, { fontWeight: '700' }]}>Total:</Text>
                            <Text style={[styles.receiptValue, { fontWeight: '700' }]}>M {total.toFixed(2)}</Text>
                        </View>

                        {/* Sale Items */}
                        <View style={styles.itemsContainer}>
                            {saleItems.map((item) => (
                                <View key={item.id} style={styles.itemRow}>
                                    <Text>{item.name} x {item.quantity}</Text>
                                    <Text>M {item.totalPrice.toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Payment Methods */}
                        <Text style={styles.paymentTitle}>Payment Method</Text>
                        {paymentMethods.map(({ method, color }) => (
                            <TouchableOpacity
                                key={method}
                                style={[styles.paymentButton, { backgroundColor: color }]}
                                onPress={() => onSelectPayment(method)}
                            >
                                <Text style={styles.paymentButtonText}>{method}</Text>
                            </TouchableOpacity>
                        ))}

                        {/* Close button */}
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Text style={styles.closeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default SummaryModal;
