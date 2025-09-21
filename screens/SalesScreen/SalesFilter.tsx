import { ItemTypeDepartmentNamePair } from '@/lib/requests/inventory.requests';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SalesFilter = (
    {
        visible,
        setVisible,
        applyFilters,
        setSelectedDepartment,
        selectedItemType,
        setSelectedItemType,
        selectedDepartment,
        departments,
        itemTypes
    }: {
        departments: ItemTypeDepartmentNamePair[];
        itemTypes: string[];
        selectedDepartment: string;
        setSelectedDepartment: (dep: string) => void;
        selectedItemType: string;
        setSelectedItemType: (type: string) => void;
        visible: boolean;
        setVisible: (vis: boolean) => void;
        applyFilters: (selectedItemType: string, selectedDepartment: string) => void;
    }
) => {

    return (
        <View>
            {/* Filter Button */}
            <TouchableOpacity style={styles.actionButton} onPress={() => setVisible(true)}>
                <Ionicons name="filter" size={24} color="#FF700A" />
            </TouchableOpacity>

            {/* Filter Modal */}
            <Modal
                transparent
                visible={visible}
                animationType="slide"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filter Inventory</Text>

                        {/* Item Type Picker */}
                        <Text style={styles.label}>Item Type</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedItemType}
                                onValueChange={(value) => {
                                    setSelectedItemType(value);
                                    setSelectedDepartment(""); // reset department when type changes
                                }}
                            >
                                <Picker.Item label="All Item Types" value={''} />
                                {itemTypes.map((type) => (
                                    <Picker.Item key={type} label={type} value={type} />
                                ))}
                            </Picker>
                        </View>

                        {/* Department Picker */}
                        <Text style={styles.label}>Department</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedDepartment}
                                onValueChange={(value) => setSelectedDepartment(value)}
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

                        {/* Action Buttons */}
                        <View style={styles.actionButtonsWrapper}>
                            <Pressable onPress={() => setVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => applyFilters(
                                selectedItemType ? selectedItemType : '',
                                selectedDepartment ? selectedDepartment : ''
                            )}>
                                <Text style={styles.applyButtonText}>Apply</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default SalesFilter;

const styles = StyleSheet.create({
    actionButton: {
        width: 44,
        height: 44,
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
        fontWeight: '500',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
    },
    actionButtonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
    },
    applyButtonText: {
        color: '#FF700A',
        fontWeight: '600',
        fontSize: 16,
    },
});

