import { styles } from '@/styles/InsightsScreen.styles';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import InventoryInsights from './InventoryInsights';
import SalesInsights from './SalesInsights';

const InsightsScreen = ({
    type,
    setType
}: {
    type: 'Inventory' | 'Sales';
    setType: (type: 'Inventory' | 'Sales') => void;
}) => {
    return (
        <View style={[styles.container, { flex: 1 }]}>
            {/* Insights Tabs */}
            <View style={styles.typesTabs}>
                <TouchableOpacity onPress={() => { setType("Inventory") }}
                    style={[styles.typesTabsBtn, type === "Inventory" && { backgroundColor: "#FFFFFF" }]}>
                    <Text style={[styles.typesTabsBtnText, type === "Inventory" && { color: "#FF700A" }]}>Inventory</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setType("Sales") }}
                    style={[styles.typesTabsBtn, type === "Sales" && { backgroundColor: "#FFFFFF" }]}>
                    <Text style={[styles.typesTabsBtnText, type === "Sales" && { color: "#FF700A" }]}>Sales</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {type === "Inventory" ?
                    <InventoryInsights /> :
                    <SalesInsights />}
            </View>
        </View>
    )
}

export default InsightsScreen