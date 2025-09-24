import InventoryInsightsSkeleton from "@/components/shared/InventoryInsightsSkeleton";
import { getInventoryInsights } from "@/lib/requests/insights.requests";
import { InventoryItem } from "@/store/useSaleInventoryStore";
import { useUserStore } from "@/store/useUserStore";
import { styles } from "@/styles/InsightsScreen.styles";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import InventoryChart from "./InventoryChart";
import InventoryInsightsSearch from "./InventorySearch";
import TotalCards from "./TotalCards";

type InventoryDayInsight = {
    day: string;
    money: number;
    units: number;
};

type InventoryInsights = {
    month: InventoryDayInsight[];
    week: InventoryDayInsight[];
    totalMoneyEarned: number;
    totalUnitsSold: number;
};

const InventoryInsights: React.FC = () => {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
    const [insightData, setInsightData] = useState<InventoryInsights | null>(null);
    const [loading, setLoading] = useState(false);
    const { store } = useUserStore();

    const handleSelectItem = async (item: InventoryItem) => {
        setSelectedItem(item);
        try {
            setLoading(true);
            const inventoryInsights = await getInventoryInsights(store!.id, item.id);
            if (inventoryInsights.totalMoneyEarned === 0 && inventoryInsights.totalUnitsSold === 0) {
                setInsightData(null);
                return;
            }
            setInsightData(inventoryInsights);
        } catch (error) {
            console.log("Error fetching Inventory Insights", error);
            setInsightData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ maxHeight: 100 }}>
                <InventoryInsightsSearch onSelectItem={handleSelectItem} />
            </View>
            {
                loading ?
                    (<InventoryInsightsSkeleton />) :
                    <ScrollView
                        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
                        contentContainerStyle={{
                            paddingHorizontal: 6,
                            paddingTop: 16,
                            paddingBottom: 32,
                            flexGrow: 1
                        }}
                        showsVerticalScrollIndicator={true}
                    >
                        {
                            selectedItem &&
                            (<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                                {selectedItem?.images && selectedItem.images.length > 0 ? (
                                    <Image
                                        source={{ uri: selectedItem.images[0].url }}
                                        style={styles.itemImage}
                                    />
                                ) : (
                                    <View style={styles.imagePlaceholder} />
                                )}
                                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10, marginRight: 20 }}>
                                    <Text style={styles.itemName}>{selectedItem?.name}</Text>
                                    <Text style={styles.itemNumber}><Text style={{ fontWeight: "400" }}>Item#</Text> {selectedItem?.itemNumber}</Text>
                                </View>
                                <View style={{ alignItems: "flex-end" }}>
                                    <Text style={styles.price}>{selectedItem?.sellingPrice && !selectedItem.sellingPrice.toString().includes('.')
                                        ? `${selectedItem.sellingPrice}.00`
                                        : selectedItem?.sellingPrice
                                    }
                                        {selectedItem?.unitSize ? (` /${selectedItem.unitSize}`) : ''}
                                        {selectedItem?.unitSize ? (` ${selectedItem.unitType}`) : ''}
                                    </Text>
                                    <Text >
                                        {selectedItem?.qtyAvailable}{' '}
                                        Left
                                    </Text>
                                </View>
                            </View>)}

                        {insightData && (
                            <>
                                {/* Totals */}
                                <TotalCards
                                    totalUnitsSold={insightData.totalUnitsSold}
                                    totalMoneyEarned={insightData.totalMoneyEarned}
                                />

                                {/* Weekly Units Sold */}
                                <InventoryChart
                                    title="Weekly Units Sold"
                                    data={insightData.week}
                                    yKey="units"
                                />

                                {/* Monthly Units Sold */}
                                <InventoryChart
                                    title="Monthly Units Sold"
                                    data={insightData.month}
                                    yKey="units"
                                />
                            </>
                        )}
                    </ScrollView>}
        </View>
    );
};

export default InventoryInsights;