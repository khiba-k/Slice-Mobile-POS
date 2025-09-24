import styles from "@/styles/AddSalesScreen.styles";
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
            <View style={styles.saleItemContainer}>
                {/* Top row: Remove button */}
                <View style={styles.saleItemTopRow}>
                    <TouchableOpacity onPress={() => handleRemove(item.id)}>
                        <Ionicons name="close-circle" size={22} color="#8E8E8E" />
                    </TouchableOpacity>
                </View>

                {/* Second row: Image + Name + Selling Price */}
                <View style={styles.saleItemMiddleRow}>
                    {item.images && item.images.length > 0 ? (
                        <Image
                            source={{ uri: item.images[0].url }}
                            style={styles.itemImage}
                        />
                    ) : (
                        <View style={styles.imagePlaceholder} />
                    )}
                    <View style={styles.itemNamePrice}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemSellingPrice}>
                            M {item.sellingPrice.toFixed(2)}
                            {unitDisplay ? ` / ${unitDisplay}` : ""}
                        </Text>
                    </View>
                </View>

                {/* Third row: Available, Total Price, Quantity */}
                <View style={styles.saleItemBottomRow}>
                    <Text style={styles.itemAvailable}>
                        Available: {item.qtyAvailable - 1}
                    </Text>

                    <Text style={styles.itemTotalPrice}>
                        M {item.totalPrice.toFixed(2)}
                    </Text>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            onPress={() => handleQtyChange(item.id, item.quantity - 1)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="chevron-back" size={22} color="black" />
                        </TouchableOpacity>

                        <TextInput
                            style={styles.qtyInput}
                            keyboardType="numeric"
                            value={item.quantity.toString()}
                            onChangeText={(text) => {
                                const num = parseInt(text) || 1;
                                handleQtyChange(item.id, num);
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => handleQtyChange(item.id, item.quantity + 1)}
                            style={styles.qtyBtn}
                        >
                            <Ionicons name="chevron-forward" size={22} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
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
