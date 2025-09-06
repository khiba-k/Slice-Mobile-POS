import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterDisplay = (
    {
        selectedItemType,
        setSelectedItemType,
        selectedDepartment,
        setSelectedDepartment,
        handleApplyFilters,
    }: {
        selectedDepartment: string;
        setSelectedDepartment: (dep: string) => void;
        selectedItemType: string;
        setSelectedItemType: (type: string) => void;
        handleApplyFilters: (itemType: string, department: string) => void
    }
) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 2, marginBottom: 8, gap: 8 }}>
            {/* Item Type Filter */}
            {selectedItemType && (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFE5CC',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 16,
                    }}
                    onPress={() => {
                        setSelectedItemType(''); // clear item type
                        handleApplyFilters('', selectedDepartment); // call your filter function
                    }}
                >
                    <Text style={{ color: '#FF700A', fontWeight: '500', marginRight: 6 }}>
                        {selectedItemType}
                    </Text>
                    <Text style={{ color: '#FF700A', fontWeight: '600' }}>×</Text>
                </TouchableOpacity>
            )}

            {/* Department Filter */}
            {selectedDepartment && (
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#CCE5FF',
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 16,
                    }}
                    onPress={() => {
                        setSelectedDepartment(''); // clear department
                        handleApplyFilters(selectedItemType, ''); // call your filter function
                    }}
                >
                    <Text style={{ color: '#007BFF', fontWeight: '500', marginRight: 6 }}>
                        {selectedDepartment}
                    </Text>
                    <Text style={{ color: '#007BFF', fontWeight: '600' }}>×</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default FilterDisplay

const styles = StyleSheet.create({})