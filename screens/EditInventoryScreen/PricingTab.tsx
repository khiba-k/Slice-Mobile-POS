import { styles } from '@/styles/AddInventoryScreen.styles';
import { handleCostPriceChange, handleMarkupChange, handleSellingPriceChange } from '@/utils/EditInventoryScreen.utils';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';

const PricingTab = ({
    control,
    errors,
    watch,
    costPrice,
    sellingPrice,
    markupPercentage,
    setCostPrice,
    setSellingPrice,
    setMarkupPercentage
}: {
    control: any;
    errors: any;
    watch: any;
    costPrice: string;
    sellingPrice: string;
    markupPercentage: string;
    setCostPrice: React.Dispatch<React.SetStateAction<string>>;
    setSellingPrice: React.Dispatch<React.SetStateAction<string>>;
    setMarkupPercentage: React.Dispatch<React.SetStateAction<string>>;
}) => {

    // watch current form values
    const currentSellingPrice = watch('sellingPrice');
    const currentCostPrice = watch('costPrice');
    const currentMarkup = watch('markupPercentage');

    return (
        <ScrollView style={styles.tabContainer}>
            <View style={styles.header}>
                <Text style={{ color: "#FF700A", fontSize: 16 }}>Pricing</Text>
            </View>

            {/* Selling Price */}
            <View style={styles.fieldView}>
                {errors.sellingPrice && <Text style={styles.error}>{errors.sellingPrice.message}</Text>}
                <Text style={styles.label}>Selling Price<Text style={styles.required}>*</Text></Text>
                <Controller
                    control={control}
                    name="sellingPrice"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text =>
                                handleSellingPriceChange(
                                    text,
                                    currentCostPrice,
                                    val => onChange(val),
                                    setMarkupPercentage
                                )
                            }
                        />
                    )}
                />
            </View>

            {/* Cost Price */}
            <View style={styles.fieldView}>
                {errors.costPrice && <Text style={styles.error}>{errors.costPrice.message}</Text>}
                <Text style={styles.label}>Cost Price</Text>
                <Controller
                    control={control}
                    name="costPrice"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text =>
                                handleCostPriceChange(
                                    text,
                                    currentSellingPrice,
                                    currentMarkup,
                                    val => onChange(val),
                                    setMarkupPercentage
                                )
                            }
                        />
                    )}
                />
            </View>

            {/* Markup % */}
            <View style={styles.fieldView}>
                {errors.markupPercentage && <Text style={styles.error}>{errors.markupPercentage.message}</Text>}
                <Text style={styles.label}>Markup %</Text>
                <Controller
                    control={control}
                    name="markupPercentage"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={value}
                            onChangeText={text =>
                                handleMarkupChange(
                                    text,
                                    currentSellingPrice,
                                    currentCostPrice,
                                    setSellingPrice,
                                    setCostPrice,
                                    val => onChange(val)
                                )
                            }
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default PricingTab;
