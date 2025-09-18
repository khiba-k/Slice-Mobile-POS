import { InventoryItem } from '@/lib/requests/inventory.requests'
import { styles } from '@/styles/InventoryScreen.styles'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const RenderInventoryItem = ({ item, onLongPress, onPress }:
    {
        item: InventoryItem, onLongPress: () => void;
        onPress: () => void;
    }) => {
    const displayImage = item.images?.find(img => img.isDisplayImage === true);

    return (
        <View>
            <TouchableOpacity
                onLongPress={() => (
                    onLongPress()
                )}
                onPress={() => onPress()}
                style={styles.tableRow}
                activeOpacity={0.4}
            >
                {/* Image */}
                {displayImage ? (
                    <Image
                        source={{ uri: displayImage.url }}
                        style={styles.itemImage}
                        onError={() => console.log('Display image failed to load')}
                    />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )}
                {/* Info */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10, marginRight: 20 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemNumber}><Text style={{ fontWeight: "400" }}>Item#</Text> {item.itemNumber}</Text>
                </View>

                {/* Price & Stock */}
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.price}>M {item.sellingPrice}.00
                        {item.unitSize ? (` /${item.unitSize}`) : ''}
                        {item.unitSize ? (` ${item.unitType}`) : ''}
                    </Text>
                    <Text style={styles.stock}>{item.qtyAvailable} Left</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default RenderInventoryItem
