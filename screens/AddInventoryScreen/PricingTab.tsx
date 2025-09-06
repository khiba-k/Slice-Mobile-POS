import { styles } from '@/styles/AddInventoryScreen.styles';
import React from 'react';
import { ScrollView, Text } from 'react-native';

const PricingTab = ({
    control,
}: {
    control: any;
}) => {
    return (
        <ScrollView style={styles.tabContainer}>
            <Text>Details Tab (Under Construction)</Text>
            {/* Selling Price */}
            {/* <Text style={styles.label}>Selling Price</Text>
            <Controller
                control={control}
                name="sellingPrice"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={text => onChange(Number(text))}
                        value={value?.toString()}
                    />
                )}
            /> */}

            {/* Cost Price */}
            {/* <Text style={styles.label}>Cost Price</Text>
            <Controller
                control={control}
                name="costPrice"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={text => onChange(Number(text))}
                        value={value?.toString()}
                    />
                )}
            /> */}

            {/* Markup % */}
            {/* <Text style={styles.label}>Markup %</Text>
            <Controller
                control={control}
                name="markupPercentage"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={text => onChange(Number(text))}
                        value={value?.toString()}
                    />
                )}
            /> */}
        </ScrollView>
    )
}

export default PricingTab
