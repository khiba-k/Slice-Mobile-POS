import { styles } from '@/styles/AddInventoryScreen.styles';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, Switch, Text, TextInput, View } from 'react-native';


const DetailsTab = (
    {
        control,
        errors,
        itemTypeDepartments,
        unitTypes,
        lowStockEnabled,
        setLowStockEnabled,
        watch,
        setValue
    }: {
        control: any;
        errors: any;
        itemTypeDepartments: { itemType: string; departmentName: string }[];
        unitTypes: { name: string }[];
        lowStockEnabled: boolean;
        setLowStockEnabled: (val: boolean) => void;
        watch: any;
        setValue: any;
    }
) => {
    return (
        <ScrollView style={styles.tabContainer}>
            <View>
                {/* Item Type */}
                {errors.itemType && <Text style={styles.error}>{errors.itemType.message}</Text>}
                <Text style={styles.label}>Item Type <Text style={styles.required}>*</Text></Text>
                <Controller
                    control={control}
                    name="itemType"
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={(val) => {
                                onChange(val);
                                setValue('departmentName', '');
                            }}
                        >
                            <Picker.Item label="Select Item Type" value="" />
                            {[...new Set(itemTypeDepartments.map(i => i.itemType))].map(type => (
                                <Picker.Item key={type} label={type} value={type} />
                            ))}
                        </Picker>
                    )}
                />
            </View>
            {/* Department */}
            <Text style={styles.label}>Department <Text style={styles.required}>*</Text></Text>
            <Controller
                control={control}
                name="departmentName"
                render={({ field: { onChange, value } }) => (
                    <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                    >
                        <Picker.Item label="Select Department" value="" />
                        {itemTypeDepartments
                            .filter(dep => !watch('itemType') || dep.itemType === watch('itemType'))
                            .map(dep => (
                                <Picker.Item
                                    key={`${dep.itemType}-${dep.departmentName}`}
                                    label={dep.departmentName}
                                    value={dep.departmentName}
                                />
                            ))}
                    </Picker>
                )}
            />
            {errors.departmentName && <Text style={styles.error}>{errors.departmentName.message}</Text>}

            {/* Name */}
            <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} onChangeText={onChange} value={value} />
                )}
            />
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

            {/* Description */}
            <Text style={styles.label}>Description</Text>
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={[styles.input, { height: 80 }]} multiline onChangeText={onChange} value={value} />
                )}
            />

            {/* Unit Size */}
            <Text style={styles.label}>Unit Size</Text>
            <Controller
                control={control}
                name="unitSize"
                render={({ field: { onChange, value } }) => (
                    <TextInput style={styles.input} onChangeText={onChange} value={value} />
                )}
            />

            {/* Unit Type */}
            <Text style={styles.label}>Unit Type</Text>
            <Controller
                control={control}
                name="unitType"
                render={({ field: { onChange, value } }) => (
                    <Picker selectedValue={value} onValueChange={onChange}>
                        <Picker.Item label="Select Unit Type" value="" />
                        {unitTypes.map(u => <Picker.Item key={u.name} label={u.name} value={u.name} />)}
                    </Picker>
                )}
            />

            {/* Quantity */}
            <Text style={styles.label}>Quantity Available <Text style={styles.required}>*</Text></Text>
            <Controller
                control={control}
                name="qtyAvailable"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={text => onChange(Number(text))}
                        value={value?.toString()}
                    />
                )}
            />
            {errors.qtyAvailable && <Text style={styles.error}>{errors.qtyAvailable.message}</Text>}

            {/* Low Stock Toggle */}
            <View style={styles.row}>
                <Text style={styles.label}>Enable Low Stock Alert</Text>
                <Switch
                    value={lowStockEnabled}
                    onValueChange={(val) => setLowStockEnabled(val)}
                />
            </View>

            {lowStockEnabled && (
                <>
                    <Text style={styles.label}>Low Stock Quantity</Text>
                    <Controller
                        control={control}
                        name="lowStockAlertQty"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onChangeText={text => onChange(Number(text))}
                                value={value?.toString()}
                            />
                        )}
                    />
                </>
            )}
        </ScrollView>
    )
}

export default DetailsTab
