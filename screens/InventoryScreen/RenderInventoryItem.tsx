import { InventoryItem } from '@/lib/requests/inventory.requests'
import { styles } from '@/styles/InventoryScreen.styles'
import React from 'react'
import { Image, Text, View } from 'react-native'

const RenderInventoryItem = ({ item }: { item: InventoryItem }) => {
    return (
        <View style={styles.tableRow}>
            {/* Image */}
            {item.images ? (
                <Image source={{ uri: item.images[0] }} style={styles.itemImage} />
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
        </View>
    )
}

export default RenderInventoryItem
