import { ItemTypeDepartmentNamePair } from '@/lib/requests/inventory.requests';
import { styles } from '@/styles/AddInventoryScreen.styles';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

const DetailsTab = (
    {
        control,
        errors,
        itemTypes,
        departments,
        setSelectedDepartment,
        selectedItemType,
        setSelectedItemType,
        selectedDepartment,
        lowStockEnabled,
        setLowStockEnabled,
        watch,
        setValue
    }: {
        control: any;
        errors: any;
        lowStockEnabled: boolean;
        setLowStockEnabled: (val: boolean) => void;
        watch: any;
        setValue: any;
        itemTypes: string[];
        departments: ItemTypeDepartmentNamePair[],
        selectedDepartment: string;
        setSelectedDepartment: (dep: string) => void;
        selectedItemType: string;
        setSelectedItemType: (type: string) => void;
    }
) => {
    const [isAddingItemType, setIsAddingItemType] = useState(false);
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);
    const [isAddingUnitType, setIsAddingUnitType] = useState(false);
    const defaultUnitTypes = ["mg", "g", "kg", "mℓ", "ℓ", "cm", "mm", "hr", "packet", "box"];

    const SmallButton = ({ label, onPress }: { label: string; onPress: () => void }) => (
        <TouchableOpacity onPress={onPress} style={styles.smallButton}>
            <Text style={styles.smallButtonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.tabContainer}>
            {/* Item Type  */}
            <View style={styles.fieldView}>
                <Text style={styles.label}>Item Type <Text style={styles.required}>*</Text></Text>
                {isAddingItemType ? (
                    <View style={styles.row2}>
                        <TextInput
                            style={[styles.input, { flex: 1, height: 40, marginBottom: 0 }]}
                            placeholder="Enter new Item Type"
                            value={selectedItemType}
                            onChangeText={(val) => setSelectedItemType(val)}
                        />

                        <SmallButton label="x" onPress={() => setIsAddingItemType(false)} />
                    </View>
                ) : (
                    <View style={styles.row}>
                        <Controller
                            control={control}
                            name="itemType"
                            render={({ field: { onChange } }) => (
                                <View style={styles.pickerCard}>
                                    <Picker
                                        style={{ flex: 1, }}
                                        selectedValue={selectedItemType}
                                        onValueChange={(value) => {
                                            setSelectedItemType(value);
                                            setSelectedDepartment("");
                                            onChange(value);
                                        }}
                                    >
                                        <Picker.Item label="All Item Types (e.g. Inventory, Services, etc.)" value={''} />
                                        {itemTypes.map((type) => (
                                            <Picker.Item key={type} label={type} value={type} />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        <SmallButton label="+" onPress={() => setIsAddingItemType(true)} />
                    </View>
                )}
            </View>

            {/* Department */}
            <View style={styles.fieldView}>
                <Text style={styles.label}>Department <Text style={styles.required}>*</Text></Text>
                {(isAddingDepartment || isAddingItemType) ? (
                    <View style={styles.row2}>
                        <TextInput
                            style={[styles.input, { flex: 1, height: 40, marginBottom: 0 }]}
                            placeholder="Enter new Department"
                            value={selectedDepartment}
                            onChangeText={(val) => setSelectedDepartment(val)}
                        />
                        {!isAddingItemType &&
                            (<SmallButton label="x" onPress={() => setIsAddingDepartment(false)} />)}
                    </View>
                ) : (
                    <View style={styles.row2}>
                        <Controller
                            control={control}
                            name="departmentName"
                            render={({ field: { onChange } }) => (
                                <View style={styles.pickerCard}>
                                    <Picker
                                        style={{ flex: 1 }}
                                        selectedValue={selectedDepartment}
                                        onValueChange={(value) => {
                                            setSelectedDepartment(value);
                                            onChange(value);
                                        }}
                                    >
                                        <Picker.Item label="All Departments" value={''} />
                                        {departments
                                            .filter((dep) =>
                                                selectedItemType ? dep.itemType === selectedItemType : true
                                            )
                                            .map((dep) => (
                                                <Picker.Item
                                                    key={`${dep.itemType}-${dep.departmentName}`}
                                                    label={dep.departmentName}
                                                    value={dep.departmentName}
                                                />
                                            ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        <SmallButton label="+" onPress={() => setIsAddingDepartment(true)} />
                    </View>
                )}
            </View>

            {/* Name */}
            <View style={styles.fieldView}>
                {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
                <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} onChangeText={onChange} value={value} />
                    )}
                />
            </View>

            {/* Description */}
            <View style={styles.fieldView}>
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={[styles.input, { height: 80 }]} multiline onChangeText={onChange} value={value} />
                    )}
                />
            </View>

            {/* Unit Type */}
            <View style={styles.fieldView}>
                <Text style={styles.label}>Unit Type</Text>
                {isAddingUnitType ? (
                    <View style={styles.row2}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter custom Unit Type"
                            onChangeText={(val) => setValue("unitType", val)}
                        />
                        <SmallButton label="x" onPress={() => setIsAddingUnitType(false)} />
                    </View>
                ) : (
                    <View style={styles.row}>
                        <Controller
                            control={control}
                            name="unitType"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.pickerCard}>
                                    <Picker style={{ flex: 1 }} selectedValue={value} onValueChange={onChange}>
                                        <Picker.Item label="Select Unit Type (e.g. mg, ℓ, packet)" value="" />
                                        {defaultUnitTypes.map(u => (
                                            <Picker.Item key={u} label={u} value={u} />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        <SmallButton label="+" onPress={() => setIsAddingUnitType(true)} />
                    </View>
                )}
            </View>

            {/* Unit Size */}
            <View style={styles.fieldView}>
                <Text style={styles.label}>Unit Size</Text>
                <Controller
                    control={control}
                    name="unitSize"
                    render={({ field: { onChange, value } }) => (
                        <TextInput style={styles.input} onChangeText={onChange} value={value} />
                    )}
                />
            </View>

            {/* Quantity */}
            <View style={styles.fieldView}>
                {errors.qtyAvailable && <Text style={styles.error}>{errors.qtyAvailable.message}</Text>}
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
            </View>

            {/* Low Stock Toggle */}
            <View style={styles.fieldView}>
                <View style={styles.row}>
                    <Text style={styles.label}>Enable Low Stock Alert</Text>
                    <Switch
                        value={lowStockEnabled}
                        onValueChange={(val) => setLowStockEnabled(val)}
                    />
                </View>
            </View>
            {lowStockEnabled && (
                <View style={styles.fieldView}>
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
                </View>
            )}
        </ScrollView>
    )
};

export default DetailsTab;