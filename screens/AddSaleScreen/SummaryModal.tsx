import { SalesItemType } from "@/utils/AddSalesScreen.utils";
import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    onSelectPayment: (method: 'cash' | 'mpesa' | 'ecocash' | 'card') => void;
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

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "flex-end",
                }}
            >
                <View
                    style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                        Sale Summary
                    </Text>

                    {/* Sale Name */}
                    <TextInput
                        placeholder="Sale Name (optional)"
                        value={saleName}
                        onChangeText={setSaleName}
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 6,
                            padding: 8,
                            marginBottom: 12,
                        }}
                    />

                    {/* Subtotal */}
                    <Text>Subtotal: M {subtotal.toFixed(2)}</Text>

                    {/* Discount */}
                    <Text>Discount: M {discountAmount.toFixed(2)} ({discountPercent.toFixed(2)}%)</Text>

                    {/* Total */}
                    <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 8 }}>
                        Total: M {total.toFixed(2)}
                    </Text>

                    {/* Sale Items */}
                    <View style={{ marginTop: 12 }}>
                        {saleItems.map((item) => (
                            <Text key={item.id}>
                                {item.name} x {item.quantity} = M {item.totalPrice.toFixed(2)}
                            </Text>
                        ))}
                    </View>

                    {/* Payment Method Heading */}
                    <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 }}>
                        Payment Method
                    </Text>

                    {/* Payment buttons horizontally stacked */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {['cash', 'mpesa', 'ecocash', 'card'].map((method, i) => (
                            <TouchableOpacity
                                key={method}
                                style={{
                                    flex: 1,
                                    padding: 12,
                                    backgroundColor: ["#007bff", "#ffc107", "#28a745", "#6c757d"][i],
                                    borderRadius: 8,
                                    marginRight: i < 3 ? 8 : 0,
                                }}
                                onPress={() => onSelectPayment(method as any)}
                            >
                                <Text style={{ color: "#fff", textAlign: "center" }}>
                                    {method.toUpperCase()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Close button */}
                    <TouchableOpacity
                        style={{ marginTop: 12, alignItems: "center" }}
                        onPress={onClose}
                    >
                        <Text style={{ color: "red" }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SummaryModal;
