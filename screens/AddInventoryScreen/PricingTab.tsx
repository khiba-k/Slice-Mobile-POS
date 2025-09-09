import { styles } from '@/styles/AddInventoryScreen.styles';
import { handleCostPriceChange, handleMarkupChange, handleSellingPriceChange } from '@/utils/AddInventoryScreen.utils';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';

const PricingTab = ({
    control,
    errors
}: {
    control: any;
    errors: any
}) => {
    const [sellingPrice, setSellingPrice] = useState<string>('');
    const [costPrice, setCostPrice] = useState<string>('');
    const [markupPercentage, setMarkupPercentage] = useState<string>('');

    return (
        <ScrollView style={styles.tabContainer}>
            <View style={styles.fieldView}>
                {errors.sellingPrice && <Text style={styles.error}>{errors.sellingPrice.message}</Text>}
                <Text style={styles.label}>Selling Price<Text style={styles.required}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={sellingPrice}
                    onChangeText={text => handleSellingPriceChange(text
                        , costPrice, setSellingPrice, setMarkupPercentage
                    )}
                />
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.label}>Cost Price</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={costPrice}
                    onChangeText={text => handleCostPriceChange(text
                        , sellingPrice, markupPercentage, setCostPrice, setMarkupPercentage
                    )}
                />
            </View>

            <View style={styles.fieldView}>
                <Text style={styles.label}>Markup %</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={markupPercentage}
                    onChangeText={text => handleMarkupChange(text
                        , sellingPrice, costPrice, setSellingPrice, setCostPrice, setMarkupPercentage
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default PricingTab
