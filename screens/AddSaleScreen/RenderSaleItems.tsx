import { SalesItemType } from "@/utils/AddSalesScreen.utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface RenderSaleItemsProps {
    saleItems: SalesItemType[];
    setSaleItems: React.Dispatch<React.SetStateAction<SalesItemType[]>>;
}

const RenderSaleItems: React.FC<RenderSaleItemsProps> = ({
    saleItems,
    setSaleItems,
}) => {
    const handleRemove = (id: string) => {
        setSaleItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleQtyChange = (id: string, newQty: number) => {
        if (newQty < 1) return;

        setSaleItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    let updatedQtyAvailable = item.qtyAvailable + item.quantity - newQty;

                    if (updatedQtyAvailable < 0) {
                        // Prevent overselling
                        return item;
                    }

                    return {
                        ...item,
                        quantity: newQty,
                        totalPrice: item.sellingPrice * newQty,
                        qtyAvailable: updatedQtyAvailable,
                    };
                }
                return item;
            })
        );
    };

    const renderItem = ({ item }: { item: SalesItemType }) => {
        const unitDisplay =
            item.unitSize && item.unitType
                ? `${item.unitSize} ${item.unitType}`
                : "";

        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: "#eee",
                }}
            >
                {/* Image */}
                {item.images && item.images.length > 0 ? (
                    <Image
                        source={{ uri: item.images[0].url }}
                        style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                    />
                ) : (
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            marginRight: 12,
                            backgroundColor: "#ddd",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Ionicons name="cube-outline" size={20} color="#666" />
                    </View>
                )}

                {/* Name + Price + Availability */}
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
                    <Text style={{ fontSize: 14, color: "#555" }}>
                        M {item.sellingPrice.toFixed(2)}{" "}
                        {unitDisplay ? `/ ${unitDisplay}` : ""}
                    </Text>
                    <Text style={{ fontSize: 12, color: "green" }}>
                        Available: {item.qtyAvailable}
                    </Text>
                </View>

                {/* Quantity controls */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => handleQtyChange(item.id, item.quantity - 1)}
                        style={{ padding: 4 }}
                    >
                        <Ionicons name="chevron-back" size={22} color="black" />
                    </TouchableOpacity>

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            borderRadius: 6,
                            width: 40,
                            height: 30,
                            textAlign: "center",
                            marginHorizontal: 6,
                        }}
                        keyboardType="numeric"
                        value={item.quantity.toString()}
                        onChangeText={(text) => {
                            const num = parseInt(text) || 1;
                            handleQtyChange(item.id, num);
                        }}
                    />

                    <TouchableOpacity
                        onPress={() => handleQtyChange(item.id, item.quantity + 1)}
                        style={{ padding: 4 }}
                    >
                        <Ionicons name="chevron-forward" size={22} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Total Price */}
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                        M {item.totalPrice.toFixed(2)}
                    </Text>
                </View>

                {/* Remove */}
                <TouchableOpacity
                    onPress={() => handleRemove(item.id)}
                    style={{ marginLeft: 10, padding: 4 }}
                >
                    <Ionicons name="close-circle" size={22} color="red" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <FlatList
            data={saleItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        />
    );
};

export default RenderSaleItems;
