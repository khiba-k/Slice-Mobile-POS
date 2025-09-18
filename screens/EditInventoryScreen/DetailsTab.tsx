import { ItemTypeDepartmentNamePair } from '@/lib/requests/inventory.requests';
import { useUserStore } from '@/store/useUserStore';
import { styles } from '@/styles/AddInventoryScreen.styles';
import { getItemTypesDepartmentPairs } from '@/utils/EditInventoryScreen.utils';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface DetailsTabProps {
    control: any;
    errors: any;
    lowStockEnabled: boolean;
    setLowStockEnabled: (val: boolean) => void;
    watch: any;
    setValue: any;
    selectedDepartment: string;
    setSelectedDepartment: (val: string) => void;
    selectedItemType: string;
    setSelectedItemType: (val: string) => void;
}

const DetailsTab: React.FC<DetailsTabProps> = ({
    control,
    errors,
    lowStockEnabled,
    setLowStockEnabled,
    watch,
    setValue,
    selectedDepartment,
    setSelectedDepartment,
    selectedItemType,
    setSelectedItemType,
}) => {
    const [isAddingItemType, setIsAddingItemType] = useState(false);
    const [isAddingDepartment, setIsAddingDepartment] = useState(false);
    const [isAddingUnitType, setIsAddingUnitType] = useState(false);
    const [isLoadingItemDepartmentsPairs, setIsLoadingItemDepartmentsPairs] = useState(false);
    const [departments, setDepartments] = useState<ItemTypeDepartmentNamePair[]>([]);
    const [itemTypes, setItemTypes] = useState<string[]>([]);

    const { store } = useUserStore();
    const defaultUnitTypes = ["mg", "g", "kg", "mℓ", "ℓ", "cm", "mm", "hr", "packet", "box"];

    // Load item types and departments
    useEffect(() => {
        setIsLoadingItemDepartmentsPairs(true);
        const loadData = async () => {
            try {
                await getItemTypesDepartmentPairs({
                    store,
                    setDepartments,
                    setItemTypes,
                });
            } catch (err) {
                console.error('Error loading item types/departments', err);
            }
        };
        setIsLoadingItemDepartmentsPairs(false);
        loadData();
    }, [store]);

    // Filtered departments memoized
    const filteredDepartments = useMemo(() => {
        return departments.filter(dep =>
            selectedItemType ? dep.itemType === selectedItemType : true
        );
    }, [departments, selectedItemType]);

    const SmallButton: React.FC<{ label: string; onPress: () => void; disabled: boolean }> = ({ label, onPress, disabled }) => (
        <TouchableOpacity onPress={onPress} style={styles.smallButton}
            disabled={disabled}
        >
            <Text style={styles.smallButtonText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.tabContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.header}><Text style={{ color: "#FF700A", fontSize: 16 }}>Details</Text></View>
            {/* Item Type */}
            <View style={styles.fieldView}>
                {errors.itemType && <Text style={styles.error}>{errors.itemType.message}</Text>}
                <Text style={styles.label}>Item Type <Text style={styles.required}>*</Text></Text>
                {isAddingItemType ? (
                    <View style={styles.row2}>
                        <TextInput
                            value={selectedItemType}
                            style={[styles.input, { flex: 1, height: 40, marginBottom: 0 }]}
                            onChangeText={(value) => {
                                setSelectedItemType(value);
                                setValue('itemType', value, { shouldValidate: true });
                            }}
                        />
                        <SmallButton label="x" onPress={() => setIsAddingItemType(false)} disabled={false} />
                    </View>
                ) : (
                    <View style={styles.row}>
                        <Controller
                            control={control}
                            name="itemType"
                            render={({ field: { onChange } }) => (
                                <View style={styles.pickerCard}>
                                    <Picker
                                        style={{ flex: 1 }}
                                        selectedValue={selectedItemType}
                                        onValueChange={(value) => {
                                            setSelectedItemType(value);
                                            setSelectedDepartment('');
                                            onChange(value);
                                        }}
                                        enabled={!isLoadingItemDepartmentsPairs}
                                    >
                                        <Picker.Item label="All Item Types (e.g. Inventory, Services, etc.)" value="" />
                                        {itemTypes.map(type => (
                                            <Picker.Item key={type} label={type} value={type} />
                                        ))}
                                    </Picker>
                                </View>
                            )}
                        />
                        <SmallButton label="+" onPress={() => setIsAddingItemType(true)} disabled={isLoadingItemDepartmentsPairs} />
                    </View>
                )}
            </View>

            {/* Department */}
            <View style={styles.fieldView}>
                {errors.departmentName && <Text style={styles.error}>{errors.departmentName.message}</Text>}
                <Text style={styles.label}>Department <Text style={styles.required}>*</Text></Text>
                {(isAddingDepartment || isAddingItemType) ? (
                    <View style={styles.row2}>
                        <TextInput
                            value={selectedDepartment}
                            style={[styles.input, { flex: 1, height: 40, marginBottom: 0 }]}
                            onChangeText={(value) => {
                                setSelectedDepartment(value);
                                setValue('departmentName', value, { shouldValidate: true });
                            }}
                        />
                        {!isAddingItemType && <SmallButton label="x" onPress={() => setIsAddingDepartment(false)} disabled={false} />}
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
                                        enabled={!isLoadingItemDepartmentsPairs}
                                    >
                                        <Picker.Item label="All Departments" value="" />
                                        {filteredDepartments.map(dep => (
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
                        <SmallButton label="+" onPress={() => setIsAddingDepartment(true)} disabled={isLoadingItemDepartmentsPairs} />
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
                        <TextInput
                            style={[styles.input, { height: 80 }]}
                            multiline
                            onChangeText={onChange}
                            value={value}
                        />
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
                            onChangeText={val => setValue('unitType', val)}
                        />
                        <SmallButton label="x" onPress={() => setIsAddingUnitType(false)} disabled={false} />
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
                        <SmallButton label="+" onPress={() => setIsAddingUnitType(true)} disabled={false} />
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
                            onChangeText={text => onChange(text === '' ? 0 : Number(text))}
                            value={value?.toString() || '0'}
                        />
                    )}
                />
            </View>

            {/* Low Stock Toggle */}
            <View style={styles.fieldView}>
                <View style={styles.row}>
                    <Text style={styles.label}>Enable Low Stock Alert</Text>
                    <Switch value={lowStockEnabled} onValueChange={setLowStockEnabled} />
                </View>
            </View>

            {lowStockEnabled && (
                <View style={styles.fieldView}>
                    <Text style={styles.label}>Alert Quantity</Text>
                    <Controller
                        control={control}
                        name="lowStockAlertQty"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                onChangeText={text => onChange(text === '' ? 0 : Number(text))}
                                value={value?.toString() || '0'}
                            />
                        )}
                    />
                </View>
            )}
        </ScrollView>
    );
};

export default DetailsTab;
