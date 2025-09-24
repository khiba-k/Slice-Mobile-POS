import styles from "@/styles/AddSalesScreen.styles";
import { SalesItemType } from "@/utils/AddSalesScreen.utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
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
    onProceed: () => void;
    setDiscountPercent: React.Dispatch<React.SetStateAction<number>>;
    setDiscountValue: React.Dispatch<React.SetStateAction<number>>;
    discountPercent: number;
    discountValue: number;
    subtotal: number;
    handleSubmit: (
        paymentMethod?: 'CASH' | 'MPESA' | 'ECOCASH' | 'CARD',
        forceStatus?: 'DRAFT' | 'COMPLETED'
    ) => Promise<void>;
    status: 'DRAFT' | 'COMPLETED';
    setStatus: (status: 'DRAFT' | 'COMPLETED') => void;
}

const SummaryFooter: React.FC<SummaryFooterProps> = ({
    setDiscountPercent,
    setDiscountValue,
    discountPercent,
    discountValue,
    subtotal,
    handleSubmit,
    setStatus,
    onProceed
}) => {
    const [collapsed, setCollapsed] = useState(true);

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
            <View style={styles.summaryFooterContainer}>
                {/* Toggle Chevron */}
                <TouchableOpacity
                    style={styles.chevronToggle}
                    onPress={() => setCollapsed(!collapsed)}
                >
                    <Ionicons
                        name={collapsed ? "chevron-up" : "chevron-down"}
                        size={32}
                        color={collapsed ? "#FF700A" : "black"}
                    />
                </TouchableOpacity>

                {!collapsed && (
                    <View style={styles.summaryContent}>
                        {/* Subtotal */}
                        <View style={styles.rowSpaceBetween}>
                            <Text style={styles.subtotalText}>Subtotal</Text>
                            <Text style={styles.subtotalText}>M {subtotal.toFixed(2)}</Text>
                        </View>

                        {/* Discount Inputs */}
                        <View style={styles.discountRow}>
                            <View style={styles.discountInputContainer}>
                                <Text style={styles.discountLabel}>Discount %</Text>
                                <TextInput
                                    style={styles.discountInput}
                                    keyboardType="numeric"
                                    value={discountPercent.toFixed(2)}
                                    onChangeText={handlePercentChange}
                                />
                            </View>
                            <View style={styles.discountInputContainer}>
                                <Text style={styles.discountLabel}>Discount (M)</Text>
                                <TextInput
                                    style={styles.discountInput}
                                    keyboardType="numeric"
                                    value={discountValue.toFixed(2)}
                                    onChangeText={handleValueChange}
                                />
                            </View>
                        </View>

                        {/* Total */}
                        <View style={[styles.rowSpaceBetween, { marginBottom: 12 }]}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={styles.totalText}>M {total.toFixed(2)}</Text>
                        </View>

                        {/* Buttons */}
                        <TouchableOpacity
                            style={styles.proceedButton}
                            onPress={onProceed}
                        >
                            <Text style={styles.proceedButtonText}>Proceed with Sale</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.draftButton}
                            onPress={() => {
                                setStatus("DRAFT");
                                handleSubmit(undefined, "DRAFT");
                            }}
                        >
                            <Text style={styles.draftButtonText}>Save as Draft</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default SummaryFooter;
