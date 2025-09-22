import { Sale } from '@/lib/requests/sales.requests'
import { styles } from '@/styles/InventoryScreen.styles'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const RenderSales = ({ sale, onLongPress, onPress }:
    {
        sale: Sale, onLongPress: () => void;
        onPress: () => void;
    }) => {

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
                {/* {displayImage ? (
                    <Image
                        source={{ uri: displayImage.url }}
                        style={styles.itemImage}
                        onError={() => console.log('Display image failed to load')}
                    />
                ) : (
                    <View style={styles.imagePlaceholder} />
                )} */}
                {/* Info */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10, marginRight: 20 }}>
                    <Text style={styles.itemName}>{sale.name ?? " - "}</Text>
                    <Text style={styles.itemNumber}><Text style={{ fontWeight: "400" }}>Sale#</Text> {sale.saleNumber}</Text>
                </View>

                {/* Price & Stock */}
                <View style={{ alignItems: "flex-end" }}>
                    <Text style={styles.price}>
                        M {Number(sale.total).toFixed(2)}
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default RenderSales
