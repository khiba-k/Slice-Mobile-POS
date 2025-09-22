import { SalesItemType } from "@/utils/AddSalesScreen.utils";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface SummaryFooterProps {
    saleItems: SalesItemType[];
    onProceed: (summary: {
        subtotal: number;
        discount: number;
        discountPercent: number;
        total: number;
    }) => void;
    setDiscountPercent: React.Dispatch<React.SetStateAction<number>>;
    setDiscountValue: React.Dispatch<React.SetStateAction<number>>;
    discountPercent: number;
    discountValue: number;
    subtotal: number;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({
    saleItems,
    onProceed,
    setDiscountPercent,
    setDiscountValue,
    discountPercent,
    discountValue,
    subtotal,
}) => {
    // Keep discount fields in sync
    const handlePercentChange = (text: string) => {
        const percent = parseFloat(text) || 0;
        setDiscountPercent(percent);
        setDiscountValue((subtotal * percent) / 100);
    };

    const handleValueChange = (text: string) => {
        const value = parseFloat(text) || 0;
        setDiscountValue(value);
        setDiscountPercent(subtotal > 0 ? (value / subtotal) * 100 : 0);
    };

    const total = subtotal - discountValue;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={80}
        >
            <View
                style={{
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderColor: "#eee",
                    padding: 16,
                }}
            >
                {/* Subtotal */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 8,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>Subtotal</Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        M {subtotal.toFixed(2)}
                    </Text>
                </View>

                {/* Discount Inputs */}
                <View style={{ flexDirection: "row", marginBottom: 8 }}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={{ fontSize: 14, color: "#666" }}>Discount %</Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 6,
                                padding: 8,
                                marginTop: 4,
                            }}
                            keyboardType="numeric"
                            value={discountPercent.toFixed(2)}
                            onChangeText={handlePercentChange}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, color: "#666" }}>Discount (M)</Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 6,
                                padding: 8,
                                marginTop: 4,
                            }}
                            keyboardType="numeric"
                            value={discountValue.toFixed(2)}
                            onChangeText={handleValueChange}
                        />
                    </View>
                </View>

                {/* Total */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 12,
                    }}
                >
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>Total</Text>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                        M {total.toFixed(2)}
                    </Text>
                </View>

                {/* Proceed Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#007bff",
                        padding: 14,
                        borderRadius: 8,
                        alignItems: "center",
                        marginBottom: 8,
                    }}
                    onPress={() =>
                        onProceed({
                            subtotal,
                            discount: discountValue,
                            discountPercent,
                            total,
                        })
                    }
                >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        Proceed with Sale
                    </Text>
                </TouchableOpacity>

                {/* Draft Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: "#6c757d",
                        padding: 14,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                    onPress={() =>
                        onProceed({
                            subtotal,
                            discount: discountValue,
                            discountPercent,
                            total,
                        })
                    }
                >
                    <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                        Save as Draft
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default SummaryFooter;
